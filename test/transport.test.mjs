import assert from "node:assert/strict";
import { getEventListeners } from "node:events";
import test from "node:test";
import { HttpClient, SCIPSolver, SerialCombinatorialLinearSolver } from "../dist/framework.js";

const capabilities = { protocolVersion: 1, backends: [{ id: "scip", compiled: true, capabilities: ["linear"], warnings: [] }] };
const artifact = { modelJson: "lossless", fingerprint: "expected" };
const running = { protocolVersion: 1, id: "1", fingerprint: "expected", status: "running", reportJson: null, progressJson: null, error: null };

test("cancellation during capability lookup never submits a native job", async () => {
    const start = [
        (client, options) => new SCIPSolver(client).solveLinear(artifact, options),
        (client, options) => new SCIPSolver(client).solveQuadratic(artifact, options),
        (client, options) => new SCIPSolver(client).solveConstraintProgramming(artifact, options),
        (client, options) => new SerialCombinatorialLinearSolver(client, { backends: ["scip"] }).solveLinear(artifact, options),
    ];
    for (const solve of start) {
        const controller = new AbortController();
        let release, notify, submissions = 0, cancellations = 0;
        const gate = new Promise(resolve => { release = resolve; });
        const entered = new Promise(resolve => { notify = resolve; });
        const client = {
            async capabilities() {
                notify(); await gate;
                return { protocolVersion: 1, backends: [
                    { ...capabilities.backends[0], capabilities: ["linear", "quadratic", "cpExactLowering", "cpObjectiveConstant"] },
                    { id: "serial-linear", compiled: true, capabilities: ["serialLinear"], warnings: [] },
                ] };
            },
            async submit() { submissions++; return { ...running, status: "completed", reportJson: "unexpected" }; },
            async cancel() { cancellations++; return running; },
        };
        const result = solve(client, { signal: controller.signal });
        await entered; controller.abort(); release();
        await assert.rejects(result, { code: "Aborted" });
        assert.equal(submissions, 0);
        assert.equal(cancellations, 0);
    }
});

test("quadratic submission requires explicit capability and sends an explicit model kind", async () => {
    let submitted = false;
    const client = {
        async capabilities() { return capabilities; },
        async submit(request) {
            submitted = true;
            assert.equal(request.modelKind, "quadratic");
            return { ...running, status: "completed", reportJson: "quadratic-report" };
        },
        async get() { return running; }, async cancel() { return running; }, async release() {},
    };
    await assert.rejects(new SCIPSolver(client).solveQuadratic(artifact), { code: "UnsupportedCapability" });
    assert.equal(submitted, false);
    client.capabilities = async () => ({ ...capabilities, backends: [{ ...capabilities.backends[0], capabilities: ["linear", "quadratic"] }] });
    assert.equal((await new SCIPSolver(client).solveQuadratic(artifact)).reportJson, "quadratic-report");
    assert.equal(submitted, true);
});

test("CP requires exact-lowering capability and never falls back to a linear request", async () => {
    let submitted = false;
    const client = {
        async capabilities() { return capabilities; },
        async submit(request) {
            submitted = true;
            assert.equal(request.modelKind, "cp");
            return { ...running, status: "completed", reportJson: "exact-cp-report" };
        },
        async get() { return running; }, async cancel() { return running; }, async release() {},
    };
    await assert.rejects(new SCIPSolver(client).solveConstraintProgramming(artifact), { code: "UnsupportedCapability" });
    assert.equal(submitted, false);
    client.capabilities = async () => ({ ...capabilities, backends: [{ ...capabilities.backends[0], capabilities: ["cpExactLowering", "cpObjectiveConstant"] }] });
    assert.equal((await new SCIPSolver(client).solveConstraintProgramming(artifact)).reportJson, "exact-cp-report");
});

test("CP cancellation preserves the real report and terminal progress", async () => {
    const controller = new AbortController(), progress = [];
    let cancelled = 0;
    const client = {
        async capabilities() { return { ...capabilities, backends: [{ ...capabilities.backends[0], capabilities: ["cpExactLowering", "cpObjectiveConstant"] }] }; },
        async submit(request) { assert.equal(request.modelKind, "cp"); controller.abort(); return running; },
        async cancel() { cancelled++; return running; },
        async get() { return { ...running, status: "completed", reportJson: "actual-cp-report", progressJson: "cp-terminal" }; },
        async release() {},
    };
    const result = await new SCIPSolver(client).solveConstraintProgramming(artifact, { signal: controller.signal, pollIntervalMs: 1, onProgress: value => progress.push(value) });
    assert.equal(result.reportJson, "actual-cp-report");
    assert.equal(cancelled, 1);
    assert.deepEqual(progress, ["cp-terminal"]);
});

test("CP execution options require an explicit host capability and preserve exact hint text", async () => {
    let submitted = 0;
    const client = {
        async capabilities() { return { ...capabilities, backends: [{ ...capabilities.backends[0], capabilities: ["cpExactLowering", "cpObjectiveConstant"] }] }; },
        async submit(request) {
            submitted++;
            assert.equal(request.modelKind, "cp");
            assert.deepEqual(request.cpOptions, { nodeLimit: 0, solutionLimit: 0, requestConflict: true,
                solutionHint: [{ variableId: "x", value: "9007199254740993" }, { variableId: "y", value: "-9223372036854775808" }] });
            return { ...running, status: "completed", reportJson: "exact-cp-report" };
        },
        async get() { return running; }, async cancel() { return running; }, async release() {},
    };
    const options = { nodeLimit: 0, solutionLimit: 0, requestConflict: true, solutionHint: new Map([["x", 9007199254740993n], ["y", -(1n << 63n)]]) };
    await assert.rejects(new SCIPSolver(client).solveConstraintProgramming(artifact, options), { code: "UnsupportedCapability" });
    assert.equal(submitted, 0);
    client.capabilities = async () => ({ ...capabilities, backends: [{ ...capabilities.backends[0], capabilities: ["cpExactLowering", "cpSolveOptions", "cpObjectiveConstant"] }] });
    assert.equal((await new SCIPSolver(client).solveConstraintProgramming(artifact, options)).reportJson, "exact-cp-report");
    assert.equal(submitted, 1);
});

test("invalid CP limits, hint numbers and conflict flags fail before submission", async () => {
    const client = { async capabilities() { throw new Error("invalid options must fail before capability lookup"); } };
    for (const options of [
        { nodeLimit: -1 }, { nodeLimit: 1.5 }, { nodeLimit: 4294967296 }, { solutionLimit: NaN }, { solutionLimit: Infinity },
        { requestConflict: "true" }, { solutionHint: null }, { solutionHint: {} },
        { solutionHint: new Map([["x", 9007199254740993]]) }, { solutionHint: new Map([["x", 1n << 63n]]) },
        { solutionHint: new Map([["", 1n]]) }, { solutionHint: new Map([[1, 1n]]) },
    ]) await assert.rejects(new SCIPSolver(client).solveConstraintProgramming(artifact, options), { code: "InvalidInput" });
});

test("quadratic cancellation waits for the backend report and terminal progress", async () => {
    const controller = new AbortController();
    let cancelled = 0;
    const progress = [];
    const client = {
        async capabilities() { return { ...capabilities, backends: [{ ...capabilities.backends[0], capabilities: ["quadratic"] }] }; },
        async submit(request) {
            assert.equal(request.modelKind, "quadratic");
            controller.abort();
            return { ...running, progressJson: "quadratic-start" };
        },
        async cancel() { cancelled++; return running; },
        async get() { return { ...running, status: "completed", reportJson: "actual-quadratic-report", progressJson: "quadratic-terminal" }; },
        async release() {},
    };
    const result = await new SCIPSolver(client).solveQuadratic(artifact, { signal: controller.signal, pollIntervalMs: 1, onProgress: value => progress.push(value) });
    assert.equal(cancelled, 1);
    assert.equal(result.reportJson, "actual-quadratic-report");
    assert.deepEqual(progress, ["quadratic-start", "quadratic-terminal"]);
});

test("HTTP authorization, schema and structured errors", async () => {
    let received;
    const client = new HttpClient({ baseUrl: "http://localhost:8787", token: "secret", fetch: async (url, options) => {
        received = { url, options };
        return Response.json(capabilities);
    } });
    assert.deepEqual(await client.capabilities(), capabilities);
    assert.equal(received.url, "http://localhost:8787/ospf/v1/capabilities");
    assert.equal(received.options.headers.Authorization, "Bearer secret");
    const incompatible = new HttpClient({ baseUrl: "http://localhost", token: "s", fetch: async () => Response.json({ protocolVersion: 2 }) });
    await assert.rejects(incompatible.capabilities(), { code: "UnsupportedProtocolVersion" });
    const unauthorized = new HttpClient({ baseUrl: "http://localhost", token: "s", fetch: async () => Response.json({ code: "Unauthorized", message: "bad token" }, { status: 401 }) });
    await assert.rejects(unauthorized.capabilities(), { code: "Unauthorized" });
});

test("cancel waits for actual native terminal report", async () => {
    const controller = new AbortController();
    let cancellation = 0;
    const client = {
        async capabilities() { return capabilities; },
        async submit() { controller.abort(); return running; },
        async cancel() { cancellation++; return running; },
        async get() { return { ...running, status: "completed", reportJson: "native-cancellation-report" }; },
        async release() {},
    };
    const result = await new SCIPSolver(client).solveLinear(artifact, { signal: controller.signal, pollIntervalMs: 1 });
    assert.equal(cancellation, 1);
    assert.equal(result.reportJson, "native-cancellation-report");
});

test("abort during the poll delay requests cancellation without an extra status request", async () => {
    const start = [
        (client, options) => new SCIPSolver(client).solveLinear(artifact, options),
        (client, options) => new SCIPSolver(client).solveQuadratic(artifact, options),
        (client, options) => new SCIPSolver(client).solveConstraintProgramming(artifact, options),
        (client, options) => new SerialCombinatorialLinearSolver(client, { backends: ["scip"] }).solveLinear(artifact, options),
    ];
    for (const solve of start) {
        const controller = new AbortController(), calls = [], progress = [];
        let notify;
        const waiting = new Promise(resolve => { notify = resolve; });
        const client = {
            async capabilities() { return { protocolVersion: 1, backends: [
                { ...capabilities.backends[0], capabilities: ["linear", "quadratic", "cpExactLowering", "cpObjectiveConstant"] },
                { id: "serial-linear", compiled: true, capabilities: ["serialLinear"], warnings: [] },
            ] }; },
            async submit() { return { ...running, progressJson: "started" }; },
            async cancel() { calls.push("cancel"); return { ...running, status: "completed", reportJson: "actual-report", progressJson: "terminal" }; },
            async get() { calls.push("get"); return { ...running, status: "completed", reportJson: "unexpected-report" }; },
        };
        const solving = solve(client, { signal: controller.signal, pollIntervalMs: 250, onProgress: value => {
            progress.push(value);
            if (value === "started") notify();
        } });
        await waiting;
        controller.abort();
        await new Promise(resolve => setImmediate(resolve));
        assert.deepEqual(calls, ["cancel"]);
        const result = await solving;
        assert.equal(result.reportJson, "actual-report");
        assert.deepEqual(progress, ["started", "terminal"]);
        assert.equal(getEventListeners(controller.signal, "abort").length, 0);
    }
});

test("poll waits remove the abort listener before status requests and on failure", async () => {
    const controller = new AbortController();
    const client = {
        async capabilities() { return capabilities; },
        async submit() { return running; },
        async get() {
            assert.equal(getEventListeners(controller.signal, "abort").length, 0);
            throw new Error("status failed");
        },
        async cancel() { return running; },
    };
    await assert.rejects(new SCIPSolver(client).solveLinear(artifact, { signal: controller.signal, pollIntervalMs: 1 }), { jobId: "1" });
    assert.equal(getEventListeners(controller.signal, "abort").length, 0);
});

test("a still-running cancellation response preserves updated progress", async () => {
    const controller = new AbortController(), progress = [];
    const client = {
        async capabilities() { return capabilities; },
        async submit() { controller.abort(); return { ...running, progressJson: "started" }; },
        async cancel() { return { ...running, progressJson: "cancelling" }; },
        async get() { return { ...running, status: "completed", reportJson: "report", progressJson: "terminal" }; },
    };
    const result = await new SCIPSolver(client).solveLinear(artifact, { signal: controller.signal, pollIntervalMs: 1, onProgress: value => progress.push(value) });
    assert.equal(result.reportJson, "report");
    assert.deepEqual(progress, ["started", "cancelling", "terminal"]);
});

test("completion racing with cancellation retains the actual report", async () => {
    for (const completesDuringSubmission of [true, false]) {
        const controller = new AbortController();
        let cancellations = 0;
        const completed = { ...running, status: "completed", reportJson: "actual-completed-report" };
        const client = {
            async capabilities() { return capabilities; },
            async submit() {
                if (completesDuringSubmission) { controller.abort(); return completed; }
                return running;
            },
            async get() { controller.abort(); return completed; },
            async cancel() { cancellations++; return running; },
        };
        const result = await new SCIPSolver(client).solveLinear(artifact, { signal: controller.signal, pollIntervalMs: 1 });
        assert.equal(result.reportJson, "actual-completed-report");
        assert.equal(cancellations, 0);
    }
});

test("terminal cancellation responses retain identity checks and failure codes", async () => {
    for (const [response, expected] of [
        [{ ...running, id: "other", status: "completed", reportJson: "report" }, "ProtocolFailure"],
        [{ ...running, fingerprint: "other", status: "completed", reportJson: "report" }, "FingerprintMismatch"],
        [{ ...running, status: "failed", error: { code: "LICENSE", message: "missing license" } }, "LICENSE"],
    ]) {
        const controller = new AbortController();
        let polls = 0;
        const client = {
            async capabilities() { return capabilities; },
            async submit() { controller.abort(); return running; },
            async cancel() { return response; },
            async get() { polls++; return { ...running, status: "completed", reportJson: "unexpected" }; },
        };
        await assert.rejects(new SCIPSolver(client).solveLinear(artifact, { signal: controller.signal, pollIntervalMs: 1 }), { code: expected, jobId: "1" });
        assert.equal(polls, 0);
    }
});

test("wrong identity and backend failures remain explicit", async () => {
    const client = {
        async capabilities() { return capabilities; },
        async submit() { return { ...running, fingerprint: "wrong" }; },
        async get() { return running; }, async cancel() { return running; }, async release() {},
    };
    await assert.rejects(new SCIPSolver(client).solveLinear(artifact), { code: "FingerprintMismatch" });
    client.submit = async () => ({ ...running, status: "failed", error: { code: "LICENSE", message: "missing license" } });
    await assert.rejects(new SCIPSolver(client).solveLinear(artifact), { code: "LICENSE" });
    client.capabilities = async () => ({ ...capabilities, backends: [] });
    await assert.rejects(new SCIPSolver(client).solveLinear(artifact), { code: "BackendNotCompiled" });
});

test("progress includes terminal events and callback errors retain the job identity", async () => {
    let cancelled = 0;
    const client = {
        async capabilities() { return capabilities; },
        async submit() { return { ...running, progressJson: "start" }; },
        async get() { return { ...running, status: "completed", reportJson: "report", progressJson: "terminal" }; },
        async cancel() { cancelled++; return running; }, async release() {},
    };
    const progress = [];
    await new SCIPSolver(client).solveLinear(artifact, { pollIntervalMs: 1, onProgress: p => progress.push(p) });
    assert.deepEqual(progress, ["start", "terminal"]);
    await assert.rejects(new SCIPSolver(client).solveLinear(artifact, { onProgress: () => { throw new Error("callback failed"); } }), { jobId: "1" });
    assert.equal(cancelled, 1);
});

test("polling forwards intermediate solver snapshots without rewriting them", async () => {
    const intermediate = '{"attemptId":"SCIP","stage":"SOLVING","stageProgress":"INDETERMINATE","objectiveValue":137,"bestBound":150,"terminal":false}';
    let polls = 0;
    const client = {
        async capabilities() { return capabilities; },
        async submit() { return { ...running, progressJson: "start" }; },
        async get() {
            return ++polls === 1
                ? { ...running, progressJson: intermediate }
                : { ...running, status: "completed", reportJson: "report", progressJson: "terminal" };
        },
        async cancel() { return running; }, async release() {},
    };
    const progress = [];
    const result = await new SCIPSolver(client).solveLinear(artifact, { pollIntervalMs: 1, onProgress: value => progress.push(value) });
    assert.equal(result.reportJson, "report");
    assert.deepEqual(progress, ["start", intermediate, "terminal"]);
});

test("host disconnect retains the submitted job and the first transport failure", async () => {
    let failedRequests = 0;
    const client = new HttpClient({ baseUrl: "http://localhost:8787", token: "secret", fetch: async url => {
        if (url.endsWith("/capabilities")) return Response.json(capabilities);
        if (url.endsWith("/jobs")) return Response.json(running, { status: 202 });
        failedRequests++;
        throw new TypeError("host exited");
    } });
    await assert.rejects(new SCIPSolver(client).solveLinear(artifact, { pollIntervalMs: 1 }), { code: "TransportFailure", jobId: "1" });
    assert.equal(failedRequests, 2);
});
