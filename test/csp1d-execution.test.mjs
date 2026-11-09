import assert from "node:assert/strict";
import test from "node:test";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { initialize } from "../dist/node.js";
import { CuttingContext, Csp1dMilp, Csp1dColumnGeneration, Csp1dReport } from "../dist/csp1d.js";

const artifact = { modelJson: "opaque source text", fingerprint: "source" };
function client(capabilities = ["csp1d", "csp1dMilp", "csp1dColumnGeneration"], backendCompiled = true) {
    const requests = [];
    const view = { id: "job", protocolVersion: 1, fingerprint: "source", status: "completed", reportJson: "opaque report", progressJson: null, error: null };
    return { requests, capabilities: async () => ({ protocolVersion: 1, backends: [
        { id: "csp1d", compiled: true, capabilities, warnings: [] }, { id: "scip", compiled: backendCompiled, capabilities: ["linear", "mip"], warnings: [] },
    ] }), submit: async request => { requests.push(request); return view; }, get: async () => view, cancel: async () => view, release: async () => {} };
}

test("CSP1D native facades require explicit bounded host rules and never accept callbacks", () => {
    for (const Solver of [Csp1dMilp, Csp1dColumnGeneration]) {
        for (const configuration of [{}, { backend: "fake" }, { backend: "scip", callback() {} }, { backend: "scip", iterationLimit: 65 },
            { backend: "scip", poolLimit: 1 }, { backend: "scip", generation: { maxPlans: 0 } }, { backend: "scip", generation: { generator: "dfs" } },
            { backend: "scip", generation: { maxKnives: 65 } }, { backend: "scip", generation: { callback() {} } }, { backend: "scip", columnsPerIteration: NaN }]) {
            assert.throws(() => new Solver(client(), configuration), { code: "InvalidInput" });
        }
    }
});

test("CSP1D native facades snapshot typed configuration, modelKind and selected algorithm", async () => {
    for (const [Solver, algorithm] of [[Csp1dMilp, "milp"], [Csp1dColumnGeneration, "columnGeneration"]]) {
        const transport = client(), options = { backend: "scip", generation: { generator: "nSame", maxPlans: 1, maxKnives: 3 }, poolLimit: 10, iterationLimit: 4 };
        const solver = new Solver(transport, options); options.generation.maxPlans = 500; options.poolLimit = 1;
        const job = await solver.solve(artifact, { timeLimitMs: 100 }); assert.equal(job.status, "completed");
        const request = transport.requests[0]; assert.equal(request.solver, "csp1d"); assert.equal(request.modelKind, "csp1d");
        assert.equal(request.csp1dOptions.algorithm, algorithm); assert.equal(request.csp1dOptions.generation.maxPlans, 1); assert.equal(request.csp1dOptions.poolLimit, 10);
        request.csp1dOptions.generation.maxPlans = 99; await solver.solve(artifact); assert.equal(transport.requests[1].csp1dOptions.generation.maxPlans, 1);
    }
});

test("CSP1D requires domain, algorithm and selected native backend capabilities without fallback", async () => {
    await assert.rejects(new Csp1dMilp(client([]), { backend: "scip" }).solve(artifact), { code: "UnsupportedCapability" });
    await assert.rejects(new Csp1dColumnGeneration(client(["csp1d", "csp1dMilp"]), { backend: "scip" }).solve(artifact), { code: "UnsupportedCapability" });
    await assert.rejects(new Csp1dMilp(client(undefined, false), { backend: "scip" }).solve(artifact), { code: "BackendNotCompiled" });
    const controller = new AbortController(); controller.abort(); const transport = client();
    await assert.rejects(new Csp1dMilp(transport, { backend: "scip" }).solve(artifact, { signal: controller.signal }), { code: "Aborted" });
    assert.equal(transport.requests.length, 0);
});

test("CSP1D complete workflow readers retain raw stages/trace and independent integer/production objects", { skip: !process.env.OSPF_CSP1D_FIXTURE_DIR }, async () => {
    await initialize();
    const directory = process.env.OSPF_CSP1D_FIXTURE_DIR;
    const files = (await readdir(directory)).filter(name => /^csp1d-execution-(scip|gurobi)\.json$/.test(name)); assert.ok(files.length > 0);
    for (const file of files) {
        for (const fixture of JSON.parse(await readFile(join(directory, file), "utf8"))) {
            const context = CuttingContext.fromArtifact(fixture.source), report = context.readExecutionReport(fixture.reportJson);
            const copy = Csp1dReport.fromJson(report.toJson(), fixture.source), wire = JSON.parse(fixture.reportJson), summary = report.summary();
            assert.deepEqual(copy.summary(), summary); assert.equal(report.traceJson(), wire.traceJson); assert.equal(summary.candidateComplete, false);
            assert.equal(summary.stageCount, wire.stages.length); assert.equal(summary.columnCount, wire.plans.length);
            for (let index = 0; index < summary.stageCount; index++) {
                assert.equal(report.stageReportJson(index), wire.stages[index].solverReportJson);
                assert.equal(JSON.parse(report.stageJson(index)).model.modelJson, wire.stages[index].model.modelJson);
            }
            assert.equal(report.stageJson(summary.stageCount), undefined); assert.equal(report.stageReportJson(summary.stageCount), undefined);
            for (const index of [-1, 0.5, NaN, 2 ** 32]) assert.throws(() => report.stageJson(index), { code: "InvalidInput" });
            const production = report.production(), integer = report.integerReport(), duplicate = integer?.production();
            assert.equal(production?.toJson() ?? null, fixture.productionJson); assert.equal(duplicate?.toJson() ?? null, fixture.productionJson);
            wire.stages[0].solverReportJson = wire.stages[0].solverReportJson.replace(/"nodes":(?:null|\d+)/g, '"nodes":18446744073709551615');
            const precise = Csp1dReport.fromJson(JSON.stringify(wire), fixture.source);
            assert.match(precise.stageReportJson(0), /"nodes":18446744073709551615/); assert.deepEqual(precise.summary(), summary); precise.dispose();
            assert.throws(() => Csp1dReport.fromJson(fixture.reportJson, { ...fixture.source, fingerprint: "foreign" }), { code: "FingerprintMismatch" });
            context.dispose(); report.dispose(); copy.dispose(); integer?.dispose(); production?.dispose();
            assert.equal(duplicate?.toJson() ?? null, fixture.productionJson); duplicate?.dispose();
            assert.throws(() => report.traceJson(), { code: "Disposed" }); assert.throws(() => report.production(), { code: "Disposed" });
            assert.throws(() => report.integerReport(), { code: "Disposed" });
        }
    }
});
