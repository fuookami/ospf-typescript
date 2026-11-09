import assert from "node:assert/strict";
import test from "node:test";
import { ColumnGenerationAlgorithm, CombinatorialReport, LinearSolver, ParallelCombinatorialLinearSolver, SerialCombinatorialLinearSolver } from "../dist/framework.js";
import { initialize, MetaModel } from "../dist/node.js";

const artifact = { modelJson: "opaque-linear-model", fingerprint: "source" };
const running = { protocolVersion: 1, id: "serial-job", fingerprint: "source", status: "running", reportJson: null, progressJson: null, error: null };
const capabilities = { protocolVersion: 1, backends: [
    { id: "scip", compiled: true, capabilities: ["linear"], warnings: [] },
    { id: "gurobi", compiled: true, capabilities: ["linear"], warnings: [] },
    { id: "serial-linear", compiled: true, capabilities: ["serialLinear"], warnings: [] },
    { id: "parallel-linear", compiled: true, capabilities: ["parallelLinear"], warnings: [] },
] };

test("serial framework configuration is explicit, distinct and captured independently of caller mutation", async () => {
    for (const configuration of [null, { backends: [] }, { backends: ["scip", "scip"] }, { backends: ["unknown"] }, { backends: ["scip"], fallbackPolicy: "customCallback" }, { backends: ["scip"], callback: () => {} }]) {
        assert.throws(() => new SerialCombinatorialLinearSolver({}, configuration), { code: "InvalidInput" });
    }
    const configuration = { backends: ["scip", "gurobi"], fallbackPolicy: "continueOnTerminal" };
    const client = {
        async capabilities() { return capabilities; },
        async submit(request) {
            assert.equal(request.solver, "serial-linear");
            assert.equal(request.cpOptions, undefined);
            assert.equal(request.modelKind, undefined);
            assert.deepEqual(request.serialOptions, { backends: ["scip", "gurobi"], fallbackPolicy: "continueOnTerminal" });
            return { ...running, status: "completed", reportJson: "original-aggregate-report" };
        },
    };
    const solver = new SerialCombinatorialLinearSolver(client, configuration);
    configuration.backends.reverse(); configuration.fallbackPolicy = "stopOnCertifiedTerminal";
    assert.equal((await solver.descriptor()).id, "serial-linear");
    assert.equal((await solver.solveLinear(artifact)).reportJson, "original-aggregate-report");
});

test("parallel framework configuration is bounded, typed and independent of caller mutation", async () => {
    for (const configuration of [null, { backends: [] }, { backends: ["scip", "scip"] }, { backends: ["unknown"] }, { backends: ["scip"], mode: "fastest" }, { backends: ["scip"], fallbackPolicy: "continueOnTerminal" }]) {
        assert.throws(() => new ParallelCombinatorialLinearSolver({}, configuration), { code: "InvalidInput" });
    }
    const configuration = { backends: ["scip", "gurobi"], mode: "first" };
    const client = {
        async capabilities() { return capabilities; },
        async submit(request) {
            assert.equal(request.solver, "parallel-linear");
            assert.equal(request.serialOptions, undefined);
            assert.equal(request.cpOptions, undefined);
            assert.deepEqual(request.parallelOptions, { backends: ["scip", "gurobi"], mode: "first" });
            return { ...running, status: "completed", reportJson: "parallel-aggregate" };
        },
    };
    const solver = new ParallelCombinatorialLinearSolver(client, configuration);
    configuration.backends.reverse(); configuration.mode = "best";
    assert.equal((await solver.descriptor()).id, "parallel-linear");
    assert.equal((await solver.solveLinear(artifact)).reportJson, "parallel-aggregate");
});

test("parallel orchestration capability and every configured backend are required before submission", async () => {
    let current = { ...capabilities, backends: capabilities.backends.map(backend => backend.id === "parallel-linear" ? { ...backend, capabilities: [] } : backend) };
    let submitted = false;
    const client = { async capabilities() { return current; }, async submit() { submitted = true; throw new Error("must not submit"); } };
    const solver = new ParallelCombinatorialLinearSolver(client, { backends: ["scip", "gurobi"] });
    await assert.rejects(solver.solveLinear(artifact), { code: "UnsupportedCapability" });
    current = { ...capabilities, backends: capabilities.backends.map(backend => backend.id === "gurobi" ? { ...backend, compiled: false } : backend) };
    await assert.rejects(solver.solveLinear(artifact), { code: "BackendNotCompiled" });
    assert.equal(submitted, false);
});

test("parallel mode omission remains omitted for the Rust Best default", async () => {
    const client = { async capabilities() { return capabilities; }, async submit(request) {
        assert.deepEqual(request.parallelOptions, { backends: ["scip"] });
        return { ...running, status: "completed", reportJson: "default-best" };
    } };
    assert.equal((await new ParallelCombinatorialLinearSolver(client, { backends: ["scip"] }).solveLinear(artifact)).reportJson, "default-best");
});

test("serial orchestration refuses old hosts and uncompiled configured backends before submission", async () => {
    let current = { ...capabilities, backends: capabilities.backends.map(backend => backend.id === "serial-linear" ? { ...backend, capabilities: [] } : backend) };
    let submitted = false;
    const client = { async capabilities() { return current; }, async submit() { submitted = true; throw new Error("must not submit"); } };
    const solver = new SerialCombinatorialLinearSolver(client, { backends: ["scip", "gurobi"] });
    await assert.rejects(solver.solveLinear(artifact), { code: "UnsupportedCapability" });
    current = { ...capabilities, backends: capabilities.backends.map(backend => backend.id === "gurobi" ? { ...backend, compiled: false } : backend) };
    await assert.rejects(solver.solveLinear(artifact), { code: "BackendNotCompiled" });
    assert.equal(submitted, false);
});

test("serial framework cancellation retains native aggregate text and the actual terminal progress", async () => {
    const controller = new AbortController(), events = [];
    let cancelled = 0;
    const client = {
        async capabilities() { return capabilities; },
        async submit() { controller.abort(); return running; },
        async cancel(id) { assert.equal(id, running.id); cancelled++; return running; },
        async get() { return { ...running, status: "completed", reportJson: "cancelled-aggregate", progressJson: "actual-terminal-progress" }; },
    };
    const solver = new SerialCombinatorialLinearSolver(client, { backends: ["scip"] });
    const report = await solver.solveLinear(artifact, { signal: controller.signal, pollIntervalMs: 1, onProgress: value => events.push(value) });
    assert.equal(report.reportJson, "cancelled-aggregate");
    assert.deepEqual(events, ["actual-terminal-progress"]);
    assert.equal(cancelled, 1);
    await assert.rejects(solver.solveLinear(artifact, { signal: controller.signal }), { code: "Aborted" });
});

test("portable aggregate reader bounds opaque report/model text before expensive decoding", async () => {
    await initialize();
    const model = new MetaModel("aggregate-reader"), artifact = model.toLinearTriadModel(); model.dispose();
    assert.throws(() => CombinatorialReport.fromJson("{}", artifact), { code: "InvalidInput" });
    const oversized = "x".repeat(8 * 1024 * 1024 + 1);
    assert.throws(() => CombinatorialReport.fromJson(oversized, artifact), { code: "PayloadTooLarge" });
    assert.throws(() => CombinatorialReport.fromJson("{}", { ...artifact, modelJson: oversized }), { code: "PayloadTooLarge" });
});

test("solver tuning is bounded, exclusive to direct backend entries and forwarded verbatim", async () => {
    await initialize();
    const running = { protocolVersion: 1, id: "1", fingerprint: "expected", status: "running", reportJson: null, progressJson: null, error: null };
    const backend = { id: "scip", compiled: true, capabilities: ["linear", "mip", "columnGeneration"], warnings: [] };
    let request;
    const client = {
        async capabilities() { return { protocolVersion: 1, backends: [backend, { id: "column-generation", compiled: true, capabilities: ["linear", "mip", "columnGeneration", "column-generation"], warnings: [] }] }; },
        async submit(value) { request = value; return { ...running, status: "completed", reportJson: "{}" }; },
        async get() { return running; }, async cancel() { return running; }, async release() {},
    };
    const artifact = { modelJson: "{}", fingerprint: "expected" }, solver = new LinearSolver("scip", client);
    await solver.solveLinear(artifact, { tuning: { threads: 4, seed: 7 } });
    assert.deepEqual(request.tuningOptions, { threads: 4, seed: 7 });
    assert.equal(request.modelKind, undefined);
    await solver.solveLinear(artifact, { tuning: { seed: -3 } });
    assert.deepEqual(request.tuningOptions, { seed: -3 });
    await solver.solveLinear(artifact, { tuning: { mipGap: 0.25 } });
    assert.deepEqual(request.tuningOptions, { mipGap: 0.25 });
    for (const tuning of [{}, { threads: 0 }, { threads: 1.5 }, { threads: 65 }, { seed: 1.5 }, { mipGap: -0.1 }, { mipGap: 1 }, { mipGap: Number.NaN }, { threads: 2, extra: 1 }, null]) {
        await assert.rejects(solver.solveLinear(artifact, { tuning }), { code: "InvalidInput" });
    }
    // 策略条目自带配置；其调优拒绝在原生端复验（`solver_tuning_is_bounded_and_exclusive_to_direct_backend_entries`）。
    // Strategy entries own their configuration; their tuning rejection is revalidated natively.
});
