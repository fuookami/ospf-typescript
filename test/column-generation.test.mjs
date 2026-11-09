import assert from "node:assert/strict";
import test from "node:test";
import { initialize, MetaModel } from "../dist/node.js";
import { ColumnGenerationAlgorithm, ColumnGenerationReport } from "../dist/framework.js";

const artifact = { modelJson: "opaque", fingerprint: "source" };
const configuration = { backend: "scip", blocks: [{ id: "block", variableIndices: [0] }] };
const capabilities = { protocolVersion: 1, backends: [
    { id: "column-generation", compiled: true, capabilities: ["columnGeneration"], warnings: [] },
    { id: "scip", compiled: true, capabilities: ["linear"], warnings: [] },
] };

test("column generation accepts only bounded typed source partitions", () => {
    for (const value of [null, {}, { ...configuration, backend: "unknown" }, { ...configuration, pricing() {} },
        { ...configuration, blocks: [] }, { ...configuration, iterationLimit: 0 }, { ...configuration, columnLimit: 10001 }, { ...configuration, tolerance: NaN },
        { ...configuration, blocks: [{ id: "block", variableIndices: [0, 0] }] }, { ...configuration, blocks: [{ id: "block", variableIndices: [0] }, { id: "other", variableIndices: [0] }] },
        { ...configuration, blocks: [{ id: "block", variableIndices: [-1] }] }, { ...configuration, blocks: [{ id: " ", variableIndices: [0] }] },
        { ...configuration, blocks: [{ id: "block", variableIndices: [0], callback() {} }] }]) {
        assert.throws(() => new ColumnGenerationAlgorithm({}, value), { code: "InvalidInput" });
    }
});

test("column generation snapshots nested blocks and uses generated request options", async () => {
    const input = structuredClone(configuration), expected = structuredClone(input);
    const client = { async capabilities() { return capabilities; }, async submit(request) {
        assert.equal(request.solver, "column-generation"); assert.deepEqual(request.columnGenerationOptions, expected);
        assert.equal(request.fixedRecourseOptions, undefined);
        return { protocolVersion: 1, id: "job", fingerprint: "source", status: "completed", reportJson: "raw", progressJson: null, error: null };
    } };
    const algorithm = new ColumnGenerationAlgorithm(client, input); input.blocks[0].variableIndices[0] = 99;
    assert.equal((await algorithm.solveLinear(artifact)).reportJson, "raw");
});

test("column generation rejects missing capabilities and never silently substitutes a backend", async () => {
    let current = { ...capabilities, backends: capabilities.backends.map(backend => ({ ...backend, capabilities: [] })) };
    const client = { async capabilities() { return current; }, async submit() { assert.fail("must not submit"); } };
    const algorithm = new ColumnGenerationAlgorithm(client, configuration);
    await assert.rejects(algorithm.solveLinear(artifact), { code: "UnsupportedCapability" });
    current = { ...capabilities, backends: capabilities.backends.filter(backend => backend.id !== "scip") };
    await assert.rejects(algorithm.solveLinear(artifact), { code: "BackendNotCompiled" });
});

test("column-generation report import is bounded and requires a real source-bound envelope", async () => {
    await initialize();
    const model = new MetaModel("column-generation-reader"), artifact = model.toLinearTriadModel(); model.dispose();
    assert.throws(() => ColumnGenerationReport.fromJson("{}", artifact), { code: "InvalidInput" });
    assert.throws(() => ColumnGenerationReport.fromJson("x".repeat(8 * 1024 * 1024 + 1), artifact), { code: "PayloadTooLarge" });
});
