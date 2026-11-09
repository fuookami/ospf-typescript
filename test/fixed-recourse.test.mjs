import assert from "node:assert/strict";
import test from "node:test";
import { initialize, MetaModel } from "../dist/node.js";
import { FixedRecourseAlgorithm, FixedRecourseReport } from "../dist/framework.js";

const artifact = { modelJson: "opaque-source", fingerprint: "source" };
const capabilities = { protocolVersion: 1, backends: [
    { id: "fixed-recourse", compiled: true, capabilities: ["fixedRecourse"], warnings: [] },
    { id: "scip", compiled: true, capabilities: ["linear"], warnings: [] },
] };
const completed = { protocolVersion: 1, id: "benders", fingerprint: "source", status: "completed", reportJson: "fixed-recourse-native-text", progressJson: null, error: null };

test("fixed recourse accepts only typed bounded host strategy configuration", () => {
    for (const configuration of [null, {}, { backend: "unknown" }, { backend: "scip", callback() {} }, { backend: "scip", iterationLimit: 0 }, { backend: "scip", iterationLimit: 10001 },
        { backend: "scip", tolerance: NaN }, { backend: "scip", tolerance: 0.5 }, { backend: "scip", recoverMissingCertificates: 1 },
        { backend: "scip", stages: [null] }, { backend: "scip", stages: [{ variableIndex: -1, stage: "master" }] },
        { backend: "scip", stages: [{ variableIndex: 0, stage: "master" }, { variableIndex: 0, stage: "continuousRecourse" }] },
        { backend: "scip", stages: [{ variableIndex: 0, stage: "custom" }] }]) {
        assert.throws(() => new FixedRecourseAlgorithm({}, configuration), { code: "InvalidInput" });
    }
});

test("fixed recourse snapshots stages and submits only its generated protocol options", async () => {
    const configuration = { backend: "scip", stages: [{ variableIndex: 1, stage: "continuousRecourse" }], iterationLimit: 10, tolerance: 1e-7, recoverMissingCertificates: false };
    const captured = structuredClone(configuration);
    const client = { async capabilities() { return capabilities; }, async submit(request) {
        assert.equal(request.solver, "fixed-recourse");
        assert.equal(request.serialOptions, undefined); assert.equal(request.parallelOptions, undefined); assert.equal(request.cpOptions, undefined);
        assert.deepEqual(request.fixedRecourseOptions, captured);
        assert.equal(request.timeLimitMs, 1000);
        return completed;
    } };
    const algorithm = new FixedRecourseAlgorithm(client, configuration);
    configuration.backend = "gurobi"; configuration.stages[0].variableIndex = 99;
    assert.equal((await algorithm.descriptor()).id, "fixed-recourse");
    assert.equal((await algorithm.solveLinear(artifact, { timeLimitMs: 1000 })).reportJson, completed.reportJson);
});

test("fixed recourse rejects unsupported hosts and missing explicit native backends before submission", async () => {
    let current = { ...capabilities, backends: capabilities.backends.map(backend => backend.id === "fixed-recourse" ? { ...backend, capabilities: [] } : backend) };
    let submitted = false;
    const client = { async capabilities() { return current; }, async submit() { submitted = true; throw new Error("not submitted"); } };
    const algorithm = new FixedRecourseAlgorithm(client, { backend: "scip" });
    await assert.rejects(algorithm.solveLinear(artifact), { code: "UnsupportedCapability" });
    current = { ...capabilities, backends: capabilities.backends.map(backend => backend.id === "scip" ? { ...backend, compiled: false } : backend) };
    await assert.rejects(algorithm.solveLinear(artifact), { code: "BackendNotCompiled" });
    assert.equal(submitted, false);
});

test("fixed recourse report reader validates its schema and bounds opaque payloads", async () => {
    await initialize();
    const model = new MetaModel("fixed-recourse-reader"), source = model.toLinearTriadModel(); model.dispose();
    assert.throws(() => FixedRecourseReport.fromJson("{}", source), { code: "InvalidInput" });
    const oversized = "x".repeat(8 * 1024 * 1024 + 1);
    assert.throws(() => FixedRecourseReport.fromJson(oversized, source), { code: "PayloadTooLarge" });
});
