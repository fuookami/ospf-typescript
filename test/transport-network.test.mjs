import assert from "node:assert/strict";
import { createServer } from "node:http";
import test from "node:test";
import { HttpClient, SCIPSolver } from "../dist/framework.js";

const capabilities = { protocolVersion: 1, backends: [{ id: "scip", compiled: true, capabilities: ["linear"], warnings: [] }] };
const artifact = { modelJson: "lossless", fingerprint: "expected" };
const running = { protocolVersion: 1, id: "1", fingerprint: "expected", status: "running", reportJson: null, progressJson: null, error: null };

async function listen(t, handler) {
    const server = createServer(handler);
    await new Promise((resolve, reject) => server.once("error", reject).listen(0, "127.0.0.1", resolve));
    t.after(() => new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve())));
    return `http://127.0.0.1:${server.address().port}`;
}

function send(response, status, value) {
    response.writeHead(status, { "Content-Type": "application/json", Connection: "close" });
    response.end(JSON.stringify(value));
}

test("real HTTP connection failure preserves the job identity and original error", async t => {
    const requests = [];
    const url = await listen(t, (request, response) => {
        requests.push({ method: request.method, path: request.url, authorization: request.headers.authorization });
        if (request.url === "/ospf/v1/capabilities") return send(response, 200, capabilities);
        if (request.url === "/ospf/v1/jobs") return send(response, 202, running);
        if (request.url === "/ospf/v1/jobs/1/cancel") return send(response, 503, { code: "CancellationUnavailable", message: "cancel failed" });
        request.socket.destroy();
    });
    const client = new HttpClient({ baseUrl: url, token: "network-test", timeoutMs: 3000 });
    await assert.rejects(new SCIPSolver(client).solveLinear(artifact, { pollIntervalMs: 1 }), { code: "TransportFailure", jobId: "1" });
    assert.ok(requests.some(request => request.path === "/ospf/v1/jobs/1" && request.method === "GET"));
    assert.ok(requests.some(request => request.path === "/ospf/v1/jobs/1/cancel" && request.method === "POST"));
    assert.ok(requests.every(request => request.authorization === "Bearer network-test"));
});

test("HTTP polling preserves intermediate progress text", async t => {
    const intermediate = '{"attemptId":"SCIP","stageProgress":"INDETERMINATE","bestBound":150,"terminal":false}';
    let polls = 0;
    const url = await listen(t, (request, response) => {
        if (request.url === "/ospf/v1/capabilities") return send(response, 200, capabilities);
        if (request.url === "/ospf/v1/jobs") return send(response, 202, { ...running, progressJson: "started" });
        if (request.url === "/ospf/v1/jobs/1") return send(response, 200, ++polls === 1
            ? { ...running, progressJson: intermediate }
            : { ...running, status: "completed", reportJson: "report", progressJson: "terminal" });
        return send(response, 404, { code: "NotFound", message: "unknown path" });
    });
    const progress = [];
    const client = new HttpClient({ baseUrl: url, token: "network-test", timeoutMs: 3000 });
    const result = await new SCIPSolver(client).solveLinear(artifact, { pollIntervalMs: 1, onProgress: value => progress.push(value) });
    assert.equal(result.reportJson, "report");
    assert.deepEqual(progress, ["started", intermediate, "terminal"]);
});

test("HTTP cancellation racing with completion retains the report and terminal progress", async t => {
    const requests = [];
    const completed = { ...running, status: "completed", reportJson: "original-report", progressJson: "terminal" };
    const url = await listen(t, (request, response) => {
        requests.push(`${request.method} ${request.url}`);
        if (request.url === "/ospf/v1/capabilities") return send(response, 200, capabilities);
        if (request.url === "/ospf/v1/jobs") return send(response, 202, { ...running, progressJson: "started" });
        if (request.url === "/ospf/v1/jobs/1/cancel") return send(response, 200, completed);
        if (request.url === "/ospf/v1/jobs/1") return request.socket.destroy();
        return send(response, 404, { code: "NotFound", message: "unknown path" });
    });
    const client = new HttpClient({ baseUrl: url, token: "network-test", timeoutMs: 3000 });
    const controller = new AbortController(), progress = [];
    const result = await new SCIPSolver(client).solveLinear(artifact, { signal: controller.signal, pollIntervalMs: 1, onProgress: value => {
        progress.push(value);
        if (value === "started") controller.abort();
    } });
    assert.equal(result.reportJson, "original-report");
    assert.deepEqual(progress, ["started", "terminal"]);
    assert.equal(requests.filter(request => request === "POST /ospf/v1/jobs/1/cancel").length, 1);
    assert.ok(!requests.includes("GET /ospf/v1/jobs/1"));
});

test("HTTP abort interrupts the poll delay before fetching another status", async t => {
    const requests = [];
    const completed = { ...running, status: "completed", reportJson: "actual-report", progressJson: "terminal" };
    const url = await listen(t, (request, response) => {
        requests.push(`${request.method} ${request.url}`);
        if (request.url === "/ospf/v1/capabilities") return send(response, 200, capabilities);
        if (request.url === "/ospf/v1/jobs") return send(response, 202, { ...running, progressJson: "started" });
        if (request.url === "/ospf/v1/jobs/1/cancel") return send(response, 200, completed);
        if (request.url === "/ospf/v1/jobs/1") return send(response, 200, { ...completed, reportJson: "unexpected-report" });
        return send(response, 404, { code: "NotFound", message: "unknown path" });
    });
    const client = new HttpClient({ baseUrl: url, token: "network-test", timeoutMs: 3000 });
    const controller = new AbortController(), progress = [];
    const result = await new SCIPSolver(client).solveLinear(artifact, { signal: controller.signal, pollIntervalMs: 250, onProgress: value => {
        progress.push(value);
        if (value === "started") setTimeout(() => controller.abort(), 0);
    } });
    assert.equal(result.reportJson, "actual-report");
    assert.deepEqual(progress, ["started", "terminal"]);
    assert.equal(requests.filter(request => request === "POST /ospf/v1/jobs/1/cancel").length, 1);
    assert.ok(!requests.includes("GET /ospf/v1/jobs/1"));
});

test("HTTP completion already in flight wins over a later abort", async t => {
    const requests = [], controller = new AbortController();
    const completed = { ...running, status: "completed", reportJson: "completed-report", progressJson: "terminal" };
    const url = await listen(t, (request, response) => {
        requests.push(`${request.method} ${request.url}`);
        if (request.url === "/ospf/v1/capabilities") return send(response, 200, capabilities);
        if (request.url === "/ospf/v1/jobs") return send(response, 202, running);
        if (request.url === "/ospf/v1/jobs/1") { controller.abort(); return send(response, 200, completed); }
        return send(response, 404, { code: "NotFound", message: "unknown path" });
    });
    const client = new HttpClient({ baseUrl: url, token: "network-test", timeoutMs: 3000 });
    const result = await new SCIPSolver(client).solveLinear(artifact, { signal: controller.signal, pollIntervalMs: 1 });
    assert.equal(result.reportJson, "completed-report");
    assert.ok(!requests.includes("POST /ospf/v1/jobs/1/cancel"));
});
