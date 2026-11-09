import assert from "node:assert/strict";
import test from "node:test";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { initialize, MetaModel, SCIPSolver, GurobiSolver, HttpClient, summarizeReport } from "ospf-wasm";
import { NodeClient } from "ospf-wasm/native";
import { ColumnGenerationAlgorithm, ColumnGenerationReport, CombinatorialReport, FixedRecourseAlgorithm, FixedRecourseReport, ParallelCombinatorialLinearSolver, SerialCombinatorialLinearSolver } from "ospf-wasm/framework";
import { ConstraintProgrammingModel, ConstraintProgrammingReport, IntegerDomain, ConstraintActivityAnalyzer } from "ospf-wasm/core";
import { PackingContext, Bpp1dMilp, Bpp1dColumnGeneration, Bpp1dReport } from "ospf-wasm/bpp1d";
import { CuttingContext, Csp1dMilp, Csp1dColumnGeneration, Csp1dReport } from "ospf-wasm/csp1d";
import { Geometry2d } from "ospf-wasm/geometry2d";
import { DiscreteLoadingApplicationReport, DiscreteLoadingApplicationService, DiscreteLoadingBendersApplicationService, DiscreteLoadingBendersReport, DiscreteLoadingContext, DiscreteLoadingReport, PartitionLoadingContext, PartitionLoadingBatch, PartitionColumnGenerationApplicationService, PartitionColumnGenerationReport } from "ospf-wasm/bpp";
import { PackingContext as PackingContext2d, Bpp2dColumnGeneration, Bpp2dReport } from "ospf-wasm/bpp2d";
import { CuttingContext as CuttingContext2d, Csp2dReport, Csp2dColumnGeneration } from "ospf-wasm/csp2d";
import { Bpp3dOneRoundExecution, ExecutionReport, PackingContext as PackingContext3d } from "ospf-wasm/bpp3d";
import { ActivityContext, ExecutionReport as GanttExecutionReport, GanttActivitySolver } from "ospf-wasm/gantt";

test("packaged BPP3D source uses Rust trace validation and lossless bigint counts", async () => {
    await initialize();
    const q = (value, unit = "m") => ({ value, unit });
    const source = { items: [{ id: "a", name: "A", width: q(1), height: q(1), depth: q(1), weight: q(500, "g"), amount: 2n, orientations: ["upright"] }],
        bins: [{ id: "bin", typeCode: "box", width: q(1), height: q(1), depth: q(1), capacity: q(1, "kg"), isMain: true }],
        initialLayers: [{ id: "one", binId: "bin", depth: q(1), placements: [{ itemId: "a", position: { x: q(0), y: q(0), z: q(0) }, orientation: "upright" }] }] };
    source.bins.push({ ...source.bins[0], id: "bin-2" });
    const context = new PackingContext3d(source), artifact = context.toArtifact(), copy = PackingContext3d.fromArtifact(artifact);
    context.dispose(); assert.equal(copy.problem().items[0].amount, 2n); assert.equal(copy.toJson(), artifact.modelJson);
    assert.deepEqual(copy.packLayers([{ binId: "bin-2", layerId: "one" }, { binId: "bin", layerId: "one" }]).bins.map(bin => bin.binId), ["bin", "bin-2"]);
    copy.dispose();
    source.initialLayers[0].placements.push(source.initialLayers[0].placements[0]);
    assert.throws(() => new PackingContext3d(source), { code: "InvalidInput" });
});

test("packaged solver does not submit when cancelled during capability lookup", async () => {
    const controller = new AbortController();
    let submitted = false;
    const client = {
        async capabilities() {
            controller.abort();
            return { protocolVersion: 1, backends: [{ id: "scip", compiled: true, capabilities: ["linear"], warnings: [] }] };
        },
        async submit() { submitted = true; throw new Error("must not submit"); },
    };
    await assert.rejects(new SCIPSolver(client).solveLinear({ modelJson: "opaque", fingerprint: "source" }, { signal: controller.signal }), { code: "Aborted" });
    assert.equal(submitted, false);
});

test("packaged solver retains a terminal cancellation response without another poll", async () => {
    const controller = new AbortController(), progress = [];
    const running = { protocolVersion: 1, id: "1", fingerprint: "source", status: "running", reportJson: null, progressJson: null, error: null };
    const client = {
        async capabilities() { return { protocolVersion: 1, backends: [{ id: "scip", compiled: true, capabilities: ["linear"], warnings: [] }] }; },
        async submit() { controller.abort(); return running; },
        async cancel() { return { ...running, status: "completed", reportJson: "report", progressJson: "terminal" }; },
        async get() { throw new Error("a terminal cancellation response must not be polled again"); },
    };
    const result = await new SCIPSolver(client).solveLinear({ modelJson: "opaque", fingerprint: "source" }, { signal: controller.signal, onProgress: value => progress.push(value) });
    assert.equal(result.reportJson, "report");
    assert.deepEqual(progress, ["terminal"]);
});

test("packaged Node exposes Rust quadratic symbols with direct dependencies", async () => {
    await initialize();
    const model = new MetaModel("packaged-quadratic-symbol");
    const x = model.addVariable("x");
    const expression = model.linearExpression([[x, 2]], 1);
    const linear = model.addLinearSymbol("linear", expression);
    const reference = linear.toLinear();
    const square = reference.mul(reference);
    const symbol = model.addQuadraticSymbol("square", square);
    assert.deepEqual([...symbol.dependencyIds()], [linear.id()]);
    model.setSolution(new Float64Array([2]));
    assert.equal(symbol.evaluateSolution(), 25);
    const quadratic = symbol.toQuadratic();
    const relation = quadratic.le(25);
    model.addInequality(relation, "capacity");
    assert.ok(model.toQuadraticTetradModel().fingerprint);
    for (const object of [expression, linear, reference, square, symbol, quadratic, relation, model]) object.dispose();
});

async function solvePartitionApplication(client, backend) {
    await initialize();
    const context = new DiscreteLoadingContext({ items: [{ id: "cargo", weight: { value: 1000, unit: "g" }, required: false, fixedPositionId: null }],
        positions: ["a", "b"].map(id => ({ id, maxCount: 18_446_744_073_709_551_615n, maxWeight: { value: 2, unit: "kg" }, fixedOccupied: false, enabled: true })),
        allowedAssignments: ["a", "b"].map(positionId => ({ itemId: "cargo", positionId })), conflicts: [], layoutGroups: [], weightUnit: "kg" },
        { itemCosts: { cargo: -5 }, positionCosts: { a: 1, b: 1 }, layoutCosts: [] },
        [{ id: "ballast", positionId: "a", minimumWeight: { value: 0, unit: "kg" }, maximumWeight: { value: 1, unit: "kg" }, minimumPerLoadedWeight: 0.5, costPerWeight: 2 }]);
    const source = context.toArtifact(); context.dispose();
    const configuration = { backend, partition: { partitions: [{ id: "left", positionIds: ["a"] }, { id: "right", positionIds: ["b"] }], refinableResources: ["ballast"] } };
    for (const [iterationLimit, finishing] of [[1, false], [64, false], [1, true], [64, true]]) {
        let progress = 0;
        const job = await new PartitionColumnGenerationApplicationService(client, { ...configuration, iterationLimit,
            ...(finishing ? { sourceMilpFinishing: { reserveTimeMs: 1000 } } : {}) }).solve(source, { pollIntervalMs: 1, timeLimitMs: 10_000, onProgress() { progress++; } });
        try {
            const report = PartitionColumnGenerationReport.fromJson(job.reportJson, source), plan = report.solution();
            assert.equal(report.toJson(), job.reportJson); assert.equal(report.sourceFingerprint(), source.fingerprint);
            assert.equal(JSON.parse(JSON.parse(report.accelerationApplicationReportJson()).reportJson).proof, null);
            assert.equal(report.sourceFinishingPresent(), finishing); assert.equal(report.sourceFinishingInvoked(), finishing);
            if (finishing) { assert.ok(report.certificationReportJson()); assert.ok(JSON.parse(report.solverReportJson()).proof); assert.equal(report.summary().objectiveValue, -4); }
            else { assert.equal(report.certificationReportJson(), undefined); assert.equal(JSON.parse(report.solverReportJson()).proof, null); }
            const calls = report.calls(), execution = report.executionSummary();
            assert.ok(calls.length > 0); assert.ok(execution.rootColumnCount > 0); assert.ok(progress > 0);
            assert.notEqual(execution.refinementCallIndex, null); assert.notEqual(execution.finalCallIndex, null);
            assert.equal(report.refinementReportJson(), calls[execution.refinementCallIndex].reportJson);
            assert.equal(report.finalReportJson(), calls[execution.finalCallIndex].reportJson);
            assert.equal(report.accelerationError(), undefined); report.dispose();
            assert.ok(plan); plan.dispose(); assert.equal((await client.cancel(job.id)).reportJson, job.reportJson);
        } finally { await client.release(job.id); }
    }
    for (const finishing of [false, true]) {
        let failedJob;
        await assert.rejects(new PartitionColumnGenerationApplicationService(client, { ...configuration, reportLimit: 1,
            ...(finishing ? { sourceMilpFinishing: { reserveTimeMs: 1000 } } : {}) }).solve(source), error => {
            assert.equal(error.code, "UNSUPPORTED"); assert.ok(error.jobId); failedJob = error.jobId; return true;
        });
        await client.release(failedJob);
    }
}

for (const backend of ["scip", "gurobi"]) {
    test(`packaged Node ${backend} executes original partition application, budgets and resource completion`, { skip: backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1" }, async () => solvePartitionApplication(await NodeClient.create(), backend));
    test(`packaged HTTP ${backend} executes original partition application, budgets and resource completion`, { skip: !process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN || (backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1") }, async () => solvePartitionApplication(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), backend));
}

async function solvePartition(client, backend) {
    await initialize();
    const source = new DiscreteLoadingContext({ items: [{ id: "cargo", weight: { value: 1000, unit: "g" }, required: false, fixedPositionId: null }],
        positions: ["a", "b"].map(id => ({ id, maxCount: 18_446_744_073_709_551_615n, maxWeight: { value: 2, unit: "kg" }, fixedOccupied: false, enabled: true })),
        allowedAssignments: ["a", "b"].map(positionId => ({ itemId: "cargo", positionId })), conflicts: [], layoutGroups: [], weightUnit: "kg" },
        { itemCosts: { cargo: -5 }, positionCosts: { a: 1, b: 1 }, layoutCosts: [] },
        [{ id: "ballast", positionId: "a", minimumWeight: { value: 0, unit: "kg" }, maximumWeight: { value: 1, unit: "kg" }, minimumPerLoadedWeight: 0.5, costPerWeight: 2 }]);
    const context = source.partition({ partitions: [{ id: "left", positionIds: ["a"] }, { id: "right", positionIds: ["b"] }], refinableResources: ["ballast"] }); source.dispose();
    context.addColumns(["left", "right"].map(partitionId => ({ partitionId, decisions: new Map(context.decisions().filter(decision => decision.partitionId === partitionId).map(decision => [decision.id, Number(partitionId === "left")])) })));
    const solver = backend === "scip" ? new SCIPSolver(client) : new GurobiSolver(client);
    async function execute(model) {
        let progress = 0;
        const job = await solver.solveCompiledLinear(model, { timeLimitMs: 10_000, pollIntervalMs: 1, onProgress() { progress++; } });
        try {
            assert.equal(job.status, "completed"); assert.equal(job.fingerprint, model.fingerprint); assert.ok(progress > 0); assert.ok(job.reportJson);
            assert.equal((await client.cancel(job.id)).reportJson, job.reportJson); return job.reportJson;
        } finally { await client.release(job.id); }
    }
    const master = context.master(); context.acceptLpReport(master, await execute(master.toModel()));
    const batch = new PartitionLoadingBatch();
    for (const id of ["left", "right"]) {
        const pricing = context.pricing(master, id), text = await execute(pricing.toModel()), result = pricing.readReport(text);
        assert.equal(result.reportJson, text); assert.ok(result.optimal); assert.ok(result.decisions);
        assert.ok(Math.abs(result.reducedCost - pricing.reducedCost(result.decisions)) < 1e-7);
        batch.add(pricing, [result.decisions]); pricing.dispose();
    }
    context.addPricedBatch(master, batch); assert.throws(() => context.addPricedBatch(master, batch), { code: "InvalidInput" }); master.dispose(); batch.dispose();
    const refinement = context.master({ integer: true, refineResources: true }), refined = summarizeReport(await execute(refinement.toModel()));
    context.materializeCompletedResources(refinement, new Float64Array(refined.values)); refinement.dispose();
    const finalMaster = context.master({ integer: true }), final = summarizeReport(await execute(finalMaster.toModel()));
    const plan = context.extractSolution(finalMaster, new Float64Array(final.values)); context.dispose(); finalMaster.dispose();
    assert.equal(plan.loadedCount(), 1n); assert.ok(final.objectiveValue >= -4 - 1e-7 && final.objectiveValue <= -2 + 1e-7); plan.dispose();
}

for (const backend of ["scip", "gurobi"]) {
    test(`packaged Node ${backend} executes actual partition LP, pricing and resource-completed restricted final`, { skip: backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1" }, async () => solvePartition(await NodeClient.create(), backend));
    test(`packaged HTTP ${backend} executes actual partition LP, pricing and resource-completed restricted final`, { skip: !process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN || (backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1") }, async () => solvePartition(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), backend));
}

test("isolated npm partition objects reconstruct actual compiled child artifacts without rewriting report identity", { skip: !process.env.OSPF_BPP_LOADING_FIXTURE_DIR }, async () => {
    await initialize(); const directory = process.env.OSPF_BPP_LOADING_FIXTURE_DIR;
    const files = (await readdir(directory)).filter(name => /^bpp-partition-(scip|gurobi)\.json$/.test(name)); assert.ok(files.length);
    for (const file of files) {
        const fixture = JSON.parse(await readFile(join(directory, file), "utf8")), context = new PartitionLoadingContext(fixture.source, fixture.options);
        context.addColumns(fixture.seed.map(column => ({ ...column, decisions: new Map(Object.entries(column.decisions)) })));
        const master = context.master(); assert.deepEqual(master.toModel(), fixture.stages[0].model); context.acceptLpReport(master, fixture.stages[0].reportJson);
        const batch = new PartitionLoadingBatch();
        for (const stage of fixture.stages.slice(1, 3)) {
            const pricing = context.pricing(master, stage.kind); assert.deepEqual(pricing.toModel(), stage.model);
            const result = pricing.readReport(stage.reportJson); assert.equal(result.reportJson, stage.reportJson); batch.add(pricing, result.decisions ? [result.decisions] : []); pricing.dispose();
        }
        context.addPricedBatch(master, batch); batch.dispose(); master.dispose();
        const refinement = context.master({ integer: true, refineResources: true }); assert.deepEqual(refinement.toModel(), fixture.stages[3].model);
        context.materializeCompletedResources(refinement, new Float64Array(summarizeReport(fixture.stages[3].reportJson).values)); refinement.dispose();
        const final = context.master({ integer: true }); assert.deepEqual(final.toModel(), fixture.stages[4].model);
        const plan = context.extractSolution(final, new Float64Array(summarizeReport(fixture.stages[4].reportJson).values)); context.dispose(); final.dispose();
        assert.equal(plan.toJson(), fixture.resultJson); plan.dispose();
    }
});

async function solveLoading(client, backend) {
    await initialize();
    for (const feasible of [true, false]) {
        const context = new DiscreteLoadingContext({ items: [{ id: "a", weight: { value: 1000, unit: "g" }, required: true, fixedPositionId: feasible ? "p" : null }],
            positions: [{ id: "p", maxCount: 18_446_744_073_709_551_615n, maxWeight: { value: 1, unit: "kg" }, fixedOccupied: false, enabled: feasible ? false : true }],
            allowedAssignments: feasible ? [{ itemId: "a", positionId: "p" }] : [], conflicts: [], layoutGroups: [], weightUnit: "kg" });
        const source = context.toArtifact(), model = context.toLinearTriadModel(); context.dispose();
        let progress = 0;
        const Solver = backend === "scip" ? SCIPSolver : GurobiSolver;
        const job = await new Solver(client).solveLinear(model, { timeLimitMs: 10_000, pollIntervalMs: 1, onProgress() { progress++; } });
        try {
            const report = DiscreteLoadingReport.fromJson(job.reportJson, source), result = report.solution();
            assert.equal(report.sourceFingerprint(), source.fingerprint); assert.equal(report.toJson(), job.reportJson); report.dispose();
            try {
                assert.ok(progress > 0); assert.equal(result !== undefined, feasible);
                if (result) { assert.equal(result.loadedCount(), 1n); assert.deepEqual(result.loadedWeight(), { value: 1, unit: "kg" }); assert.equal(result.solution().assignments.a, "p"); }
                assert.equal((await client.cancel(job.id)).reportJson, job.reportJson);
            } finally { result?.dispose(); }
        } finally { await client.release(job.id); }
    }
}

for (const backend of ["scip", "gurobi"]) {
    test(`packaged Node ${backend} solves original shared BPP loading models with exact fixed binary bounds`, { skip: backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1" }, async () => solveLoading(await NodeClient.create(), backend));
    test(`packaged HTTP ${backend} solves original shared BPP loading models with exact fixed binary bounds`, { skip: !process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN || (backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1") }, async () => solveLoading(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), backend));
}

test("isolated npm shared BPP readers retain actual model/report identity and independent plans", { skip: !process.env.OSPF_BPP_LOADING_FIXTURE_DIR }, async () => {
    await initialize(); const directory = process.env.OSPF_BPP_LOADING_FIXTURE_DIR;
    const files = (await readdir(directory)).filter(name => /^bpp-loading-(scip|gurobi)\.json$/.test(name)); assert.ok(files.length > 0);
    for (const file of files) for (const fixture of JSON.parse(await readFile(join(directory, file), "utf8"))) {
        const context = DiscreteLoadingContext.fromArtifact(fixture.source); assert.deepEqual(context.toLinearTriadModel(), fixture.model);
        const report = context.readReport(fixture.reportJson), result = report.solution(); context.dispose(); report.dispose();
        assert.equal(result?.toJson() ?? null, fixture.resultJson); result?.dispose();
    }
});

async function solveLoadingApplication(client, backend) {
    await initialize();
    for (const [feasible, resources] of [[true, false], [false, false], [true, true]]) {
        const context = new DiscreteLoadingContext({ items: [{ id: "a", weight: { value: 1, unit: "kg" }, required: !feasible, fixedPositionId: null }],
            positions: [{ id: "p", maxCount: 18_446_744_073_709_551_615n, maxWeight: { value: resources ? 2 : 1, unit: "kg" }, fixedOccupied: false, enabled: true }],
            allowedAssignments: feasible ? [{ itemId: "a", positionId: "p" }] : [], conflicts: [], layoutGroups: [], weightUnit: "kg" },
            { itemCosts: { a: -5 }, positionCosts: { p: 1 }, layoutCosts: [] }, resources ? [{ id: "ballast", positionId: "p",
                minimumWeight: { value: 0, unit: "kg" }, maximumWeight: { value: 1000, unit: "g" }, minimumPerLoadedWeight: 0.5, costPerWeight: 2 }] : undefined);
        const source = context.toArtifact(); context.dispose(); let progress = 0;
        const job = await new DiscreteLoadingApplicationService(client, { backend }).solve(source, { timeLimitMs: 10_000, pollIntervalMs: 1, onProgress() { progress++; } });
        try {
            const report = DiscreteLoadingApplicationReport.fromJson(job.reportJson, source), plan = report.solution();
            assert.equal(report.toJson(), job.reportJson); assert.equal(report.sourceFingerprint(), source.fingerprint); assert.ok(report.registrationPresent());
            if (feasible) assert.ok(Math.abs(report.summary().objectiveValue - (resources ? -3 : -4)) < 1e-7);
            else assert.equal(report.summary().objectiveValue, null);
            if (!feasible) assert.equal(report.summary().problemStatus, "INFEASIBLE");
            report.dispose(); assert.equal(plan !== undefined, feasible); if (plan) {
                assert.equal(plan.loadedCount(), 1n);
                if (resources) assert.ok(Math.abs(plan.resources().totalWeight.value - 1.5) < 1e-7);
                else assert.equal(plan.resources(), undefined);
                plan.dispose();
            }
            assert.ok(progress > 0); assert.equal((await client.cancel(job.id)).reportJson, job.reportJson);
        } finally { await client.release(job.id); }
    }
}

async function solveLoadingBenders(client, backend, finishing = false) {
    await initialize();
    for (const fallback of [false, true]) {
        const context = new DiscreteLoadingContext({ items: [{ id: "a", weight: { value: 1, unit: "kg" }, required: false, fixedPositionId: null }],
            positions: [{ id: "p", maxCount: 1n, maxWeight: { value: 2, unit: "kg" }, fixedOccupied: false, enabled: true }],
            allowedAssignments: [{ itemId: "a", positionId: "p" }], conflicts: [], layoutGroups: [], weightUnit: "kg" },
            { itemCosts: { a: -5 }, positionCosts: { p: 1 }, layoutCosts: [] }, [{ id: "ballast", positionId: "p", minimumWeight: { value: 0, unit: "kg" },
                maximumWeight: { value: 1000, unit: "g" }, minimumPerLoadedWeight: 0.5, costPerWeight: 2 }]);
        const source = context.toArtifact(); context.dispose(); let progress = 0;
        const service = new DiscreteLoadingBendersApplicationService(client, { backend, recourseResources: ["ballast"], iterationLimit: fallback ? 1 : 128, fallbackToMilp: fallback,
            ...(finishing ? { sourceMilpFinishing: { reserveTimeMs: 3000 } } : {}) });
        const job = await service.solve(source, { timeLimitMs: 10_000, pollIntervalMs: 1, onProgress() { progress++; } });
        try {
            const report = DiscreteLoadingBendersReport.fromJson(job.reportJson, source), plan = report.solution();
            assert.equal(report.toJson(), job.reportJson); assert.equal(report.fallbackUsed(), fallback);
            assert.equal(report.decompositionSummary().stop, fallback ? "iterationLimit" : "converged");
            if (!fallback) { assert.ok(report.decompositionSummary().optimalityCuts > 0); assert.equal(JSON.parse(report.accelerationApplicationReportJson()).reportJson === report.solverReportJson(), !finishing);
                if (!finishing) assert.equal(JSON.parse(report.solverReportJson()).proof, null); }
            else assert.ok(report.fallbackReportJson());
            assert.equal(report.sourceFinishingPresent(), finishing); assert.equal(report.sourceFinishingInvoked(), finishing && !fallback);
            if (finishing) { assert.ok(JSON.parse(report.solverReportJson()).proof); if (!fallback) assert.equal(report.certificationReportJson(), report.solverReportJson()); }
            assert.ok(Math.abs(report.summary().objectiveValue + 3) < 1e-7); report.dispose();
            assert.equal(plan.loadedCount(), 1n); assert.ok(Math.abs(plan.resources().totalWeight.value - 1.5) < 1e-7); plan.dispose();
            assert.ok(progress > 0); assert.equal((await client.cancel(job.id)).reportJson, job.reportJson);
        } finally { await client.release(job.id); }
    }
}

for (const backend of ["scip", "gurobi"]) {
    test(`packaged Node ${backend} finishes Benders on the complete source with original proof`, { skip: backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1" }, async () => solveLoadingBenders(await NodeClient.create(), backend, true));
    test(`packaged HTTP ${backend} finishes Benders on the complete source with original proof`, { skip: !process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN || (backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1") }, async () => solveLoadingBenders(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), backend, true));
}

for (const backend of ["scip", "gurobi"]) {
    test(`packaged Node ${backend} executes original shared BPP Benders resources, cuts and explicit fallback`, { skip: backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1" }, async () => solveLoadingBenders(await NodeClient.create(), backend));
    test(`packaged HTTP ${backend} executes original shared BPP Benders resources, cuts and explicit fallback`, { skip: !process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN || (backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1") }, async () => solveLoadingBenders(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), backend));
}

for (const backend of ["scip", "gurobi"]) {
    test(`packaged Node ${backend} executes original shared BPP application and business costs`, { skip: backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1" }, async () => solveLoadingApplication(await NodeClient.create(), backend));
    test(`packaged HTTP ${backend} executes original shared BPP application and business costs`, { skip: !process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN || (backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1") }, async () => solveLoadingApplication(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), backend));
}

test("packaged shared BPP application report readers retain independent actual native plans", { skip: !process.env.OSPF_BPP_LOADING_FIXTURE_DIR }, async () => {
    await initialize(); const directory = process.env.OSPF_BPP_LOADING_FIXTURE_DIR;
    const files = (await readdir(directory)).filter(name => /^bpp-application-(?:resources-)?(scip|gurobi)\.json$/.test(name)); assert.ok(files.length > 0);
    for (const file of files) for (const fixture of JSON.parse(await readFile(join(directory, file), "utf8"))) {
        const context = DiscreteLoadingContext.fromArtifact(fixture.source); assert.deepEqual(context.toApplicationModel(), fixture.model);
        const report = context.readApplicationReport(fixture.applicationReportJson), plan = report.solution(); context.dispose(); report.dispose();
        assert.equal(plan?.toJson() ?? null, fixture.resultJson); plan?.dispose();
    }
});

async function solveCutting2d(client, backend) {
    await initialize();
    const context = new CuttingContext2d({ products: [{ id: "a", name: "A", geometry: { width: { value: 1, unit: "m" }, height: { value: 1, unit: "m" } }, allowRotate: false }],
        materials: [{ id: "s", name: "S", shape: { kind: "sheet", geometry: { width: { value: 4, unit: "m" }, height: { value: 2, unit: "m" } } },
            availableBatches: 10n, process: "freeform", maxSegmentHeight: null, products: [{ productId: "a", count: 4n }] }],
        demands: [{ kind: "count", productId: "a", count: 3n, upperBound: 4n }], initialColumns: [], kerf: { value: 0, unit: "m" },
        objective: { areaWeight: 1, wasteWeight: 0, heightWeight: 0, usageWeight: 0 } });
    const source = context.toArtifact(); context.dispose();
    for (const configuration of [{ backend }, { backend, reportLimit: 1 }, { backend, finalIntegerEnabled: false }]) {
        let progress = 0;
        const job = await new Csp2dColumnGeneration(client, configuration).solve(source, { timeLimitMs: 10_000, pollIntervalMs: 1, onProgress() { progress++; } });
        try {
            const report = Csp2dReport.fromJson(job.reportJson, source), production = report.production(), summary = report.summary();
            try {
                assert.equal(job.status, "completed"); assert.equal(summary.candidateComplete, false); assert.ok(progress > 0);
                if (configuration.reportLimit) { assert.equal(summary.stop, "reportLimit"); assert.equal(production, undefined); }
                else if (configuration.finalIntegerEnabled === false) { assert.equal(summary.integer, null); assert.equal(production, undefined); }
                else { assert.equal(production.producedCounts().get("a"), 4n); assert.equal(production.materialBatches().get("s"), 1n); assert.equal(summary.integer.restrictedOptimal, true); }
                assert.equal((await client.cancel(job.id)).reportJson, job.reportJson);
            } finally { production?.dispose(); report.dispose(); }
        } finally { await client.release(job.id); }
        await assert.rejects(client.get(job.id), { code: "NotFound" });
    }
    const controller = new AbortController();
    const job = await new Csp2dColumnGeneration(client, { backend }).solve(source,
        { pollIntervalMs: 1, signal: controller.signal, onProgress() { controller.abort(); } });
    try {
        const report = Csp2dReport.fromJson(job.reportJson, source);
        try { assert.equal(report.summary().candidateComplete, false); assert.equal((await client.cancel(job.id)).reportJson, job.reportJson); }
        finally { report.dispose(); }
    } finally { await client.release(job.id); }
    await assert.rejects(client.submit({ protocolVersion: 1, solver: "csp2d", modelKind: "csp2d", model: { ...source, fingerprint: "foreign" }, timeLimitMs: null, csp2dOptions: { backend } }), { code: "FingerprintMismatch" });
}

for (const backend of ["scip", "gurobi"]) {
    test(`packaged Node ${backend} executes real CSP2D pricing/final, budgets and cancellation`, { skip: backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1" }, async () => solveCutting2d(await NodeClient.create(), backend));
    test(`packaged HTTP ${backend} executes real CSP2D pricing/final, budgets and cancellation`, { skip: !process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN || (backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1") }, async () => solveCutting2d(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), backend));
}

test("isolated npm CSP2D report reader revalidates real executions without depending on native CSP2D transports", { skip: !process.env.OSPF_CSP2D_FIXTURE_DIR }, async () => {
    await initialize(); const directory = process.env.OSPF_CSP2D_FIXTURE_DIR;
    const files = (await readdir(directory)).filter(name => /^csp2d-execution-(scip|gurobi)\.json$/.test(name)); assert.ok(files.length > 0);
    for (const file of files) for (const fixture of JSON.parse(await readFile(join(directory, file), "utf8"))) {
        const context = CuttingContext2d.fromArtifact(fixture.source), report = context.readExecutionReport(fixture.reportJson);
        const direct = Csp2dReport.fromJson(fixture.reportJson, fixture.source); context.dispose();
        assert.equal(direct.toJson(), report.toJson()); direct.dispose();
        assert.equal(report.summary().candidateComplete, false); assert.equal(report.toJson(), fixture.reportJson);
        const production = report.production(); report.dispose();
        assert.equal(production?.toJson() ?? null, fixture.productionJson);
        if (production) { assert.ok([...production.producedCounts().values()].every(value => typeof value === "bigint")); production.dispose(); }
    }
});

test("isolated npm consumer loads CSP2D source validation with exact counts and independent artifacts", async () => {
    await initialize();
    const context = new CuttingContext2d({ products: [{ id: "a", name: "A", geometry: { width: { value: 1, unit: "m" }, height: { value: 1, unit: "m" } }, allowRotate: false }],
        materials: [{ id: "s", name: "S", shape: { kind: "sheet", geometry: { width: { value: 4, unit: "m" }, height: { value: 2, unit: "m" } } },
            availableBatches: 10n, process: "freeform", maxSegmentHeight: null, products: [{ productId: "a", count: 4n }] }],
        demands: [{ kind: "count", productId: "a", count: 9_007_199_254_740_991n, upperBound: null }], initialColumns: [], kerf: { value: 0, unit: "m" },
        objective: { areaWeight: 1, wasteWeight: 0, heightWeight: 0, usageWeight: 0 } });
    const artifact = context.toArtifact(), restored = CuttingContext2d.fromArtifact(artifact); context.dispose();
    restored.validateColumns([]); assert.equal(restored.toJson(), artifact.modelJson); assert.match(artifact.modelJson, /"count":"9007199254740991"/);
    restored.dispose(); assert.throws(() => restored.toJson(), { code: "Disposed" });
});

async function solvePacking2d(client, backend) {
    await initialize();
    const context = new PackingContext2d({ items: [{ id: "a", name: "A", shape: { kind: "rectangle", width: { value: 100, unit: "cm" }, height: { value: 1, unit: "m" } }, allowRotate: false, generationCount: 3n }],
        sheets: [{ id: "s", geometry: { width: { value: 2, unit: "m" }, height: { value: 1, unit: "m" } }, isMain: true }],
        demands: [{ kind: "count", itemId: "a", count: 3n, upperBound: 4n }], initialLayers: [], kerf: { value: 0, unit: "m" },
        objective: { sheetAreaWeight: 1, sheetAmountWeight: 0.000001, sheetTypeCostWeight: 0, sheetTypeCosts: {}, rmpAreaCoefficient: 1 } });
    const source = context.toArtifact(); context.dispose();
    for (const configuration of [{ backend }, { backend, reportLimit: 1 }, { backend, finalMilpEnabled: false }]) {
        let progress = 0;
        const job = await new Bpp2dColumnGeneration(client, configuration).solve(source, { pollIntervalMs: 1, timeLimitMs: 10_000, onProgress() { progress++; } });
        try {
            const report = Bpp2dReport.fromJson(job.reportJson, source), production = report.production(), packing = report.packing(), summary = report.summary();
            try {
                assert.equal(job.status, "completed"); assert.equal(summary.candidateComplete, false); assert.ok(progress > 0);
                if (configuration.reportLimit) { assert.equal(summary.stop, "reportLimit"); assert.equal(production, undefined); }
                else if (configuration.finalMilpEnabled === false) { assert.equal(summary.integer, null); assert.equal(production, undefined); }
                else { assert.equal(production.producedCounts().get("a"), 4n); assert.equal(production.sheetCounts().get("s"), 2n); assert.equal(summary.integer.restrictedOptimal, true);
                    assert.equal(packing.itemCount(), 4n); assert.equal(packing.sheetCount(), 2n); assert.equal(packing.materialCounts().get("a"), 4n);
                    assert.equal(packing.patterns().length, 1); assert.equal(packing.patterns()[0].usage.count, 2n); }
                assert.equal(packing !== undefined, production !== undefined);
                const retained = await client.cancel(job.id); assert.equal(retained.reportJson, job.reportJson);
            } finally { report.dispose(); production?.dispose(); packing?.dispose(); }
        } finally { await client.release(job.id); }
        await assert.rejects(client.get(job.id), { code: "NotFound" });
    }
}

for (const backend of ["scip", "gurobi"]) {
    test(`packaged Node ${backend} executes real BPP2D Phase I/pricing/final with independent source reports`, { skip: backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1" }, async () => {
        await solvePacking2d(await NodeClient.create(), backend);
    });
    test(`packaged HTTP ${backend} executes real BPP2D Phase I/pricing/final with independent source reports`, { skip: !process.env.OSPF_E2E_URL || (backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1") }, async () => {
        await solvePacking2d(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), backend);
    });
}

test("packaged BPP2D subpath consumes generated contracts and revalidates source artifacts", { skip: !process.env.OSPF_BPP2D_FIXTURE_DIR }, async () => {
    await initialize();
    const directory = process.env.OSPF_BPP2D_FIXTURE_DIR;
    const files = (await readdir(directory)).filter(name => /^bpp2d-execution-(scip|gurobi)\.json$/.test(name));
    assert.ok(files.length > 0);
    for (const file of files) {
        for (const fixture of JSON.parse(await readFile(join(directory, file), "utf8"))) {
            const context = PackingContext2d.fromArtifact(fixture.source), report = context.readExecutionReport(fixture.reportJson), production = report.production(), packing = report.packing();
            assert.equal(report.toJson(), fixture.reportJson); assert.equal(report.summary().candidateComplete, false);
            context.dispose(); report.dispose(); assert.equal(production?.toJson() ?? null, fixture.productionJson); production?.dispose();
            if (packing) { assert.equal(packing.sourceFingerprint(), fixture.source.fingerprint); assert.equal(typeof packing.itemCount(), "bigint"); packing.dispose(); }
        }
    }
});

test("packaged shared 2D geometry keeps area units, kernel box semantics and independent typed batches", async () => {
    await initialize();
    const geometry = new Geometry2d("cm"), shape = { kind: "rectangle", width: { value: 2, unit: "m" }, height: { value: 3000, unit: "mm" } };
    const metrics = geometry.shapeMetrics(shape), box = { shape, position: { x: { value: 0, unit: "m" }, y: { value: 0, unit: "m" } } };
    assert.ok(Math.abs(metrics.area.value - 60000) < 1e-8); assert.equal(metrics.area.unit, "cm^2");
    assert.equal(geometry.candidateShapes(shape).length, 2);
    assert.equal(geometry.insideSheet(box, { width: shape.width, height: shape.height }), true);
    const pairs = geometry.overlapPairs([box, box]); assert.ok(pairs instanceof Uint32Array); assert.deepEqual([...pairs], [0, 1]);
    geometry.dispose(); assert.deepEqual([...pairs], [0, 1]); assert.throws(() => geometry.shape(shape), { code: "Disposed" });
});

async function solveCutting(client, backend) {
    await initialize();
    const context = new CuttingContext({ products: [{ id: "p", name: "p", width: [{ value: 30, unit: "mm" }] }],
        materials: [{ id: "m", name: "m", widthRange: { lowerBound: { value: 0, unit: "cm" }, upperBound: { value: 10, unit: "cm" } }, machineId: null, availableBatches: 3n }],
        machines: [], demands: [{ productId: "p", mode: "roll", count: 5n }], lengthUnit: "cm" });
    const source = context.toArtifact(); context.dispose();
    for (const Solver of [Csp1dMilp, Csp1dColumnGeneration]) {
        const generation = Solver === Csp1dColumnGeneration ? { maxPlans: 1 } : {};
        let progress = 0;
        const job = await new Solver(client, { backend, generation }).solve(source, { pollIntervalMs: 1, onProgress() { progress++; } });
        assert.equal(job.status, "completed"); assert.ok(progress > 0, "real child progress must reach the SDK");
        const report = Csp1dReport.fromJson(job.reportJson, source), summary = report.summary(), production = report.production(), integer = report.integerReport();
        assert.equal(summary.businessStatus, "feasible"); assert.equal(summary.candidateComplete, false); assert.equal(summary.integer.restrictedOptimal, true);
        assert.equal(production.batchCount(), 2n); assert.equal(production.produced().get("p"), 6n);
        const integerProduction = integer.production();
        assert.ok(report.stageReportJson(summary.stageCount - 1)); assert.equal(integerProduction.batchCount(), 2n); integerProduction.dispose();
        if (Solver === Csp1dColumnGeneration) { assert.ok(summary.stageCount > 2); assert.ok(summary.columnCount > 1); }
        await client.release(job.id); report.dispose(); integer.dispose(); assert.equal(production.batchCount(), 2n); production.dispose();
    }
    const limited = await new Csp1dColumnGeneration(client, { backend, generation: { maxPlans: 1 }, poolLimit: 1 }).solve(source, { pollIntervalMs: 1 });
    const restricted = Csp1dReport.fromJson(limited.reportJson, source);
    assert.equal(restricted.summary().businessStatus, "failed"); assert.equal(restricted.production(), undefined); assert.equal(restricted.summary().candidateComplete, false);
    assert.equal(restricted.summary().integer.restrictedInfeasible, true); await client.release(limited.id); restricted.dispose();
    const controller = new AbortController();
    const job = await new Csp1dColumnGeneration(client, { backend, generation: { maxPlans: 1 } }).solve(source,
        { pollIntervalMs: 1, signal: controller.signal, onProgress() { controller.abort(); } });
    const cancelled = Csp1dReport.fromJson(job.reportJson, source);
    assert.ok(["completed", "cancelled"].includes(cancelled.summary().stop)); await client.release(job.id); cancelled.dispose();
}

for (const backend of ["scip", "gurobi"]) {
    test(`packaged Node ${backend} executes CSP1D LP/pricing/final with source-bound complete reports`, { skip: backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1" }, async () => solveCutting(await NodeClient.create(), backend));
    test(`packaged HTTP ${backend} executes CSP1D LP/pricing/final with source-bound complete reports`, { skip: !process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN || (backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1") }, async () => solveCutting(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), backend));
}

test("packaged CSP1D report reader matches real Rust-backend extraction without a native runtime dependency", { skip: !process.env.OSPF_CSP1D_FIXTURE_DIR }, async () => {
    await initialize();
    const directory = process.env.OSPF_CSP1D_FIXTURE_DIR;
    const files = (await readdir(directory)).filter(name => /^csp1d-(scip|gurobi)\.json$/.test(name)); assert.ok(files.length > 0);
    for (const file of files) {
        for (const fixture of JSON.parse(await readFile(join(directory, file), "utf8"))) {
            const context = CuttingContext.fromArtifact(fixture.source), report = context.readProductionReport(fixture.reportJson);
            const production = report.production(); context.dispose();
            assert.equal(report.toJson(), fixture.reportJson); assert.equal(report.summary().candidateComplete, false);
            assert.equal(report.solverReportJson(), JSON.parse(fixture.reportJson).child.solverReportJson);
            report.dispose(); assert.equal(production?.toJson() ?? null, fixture.productionJson); production?.dispose();
        }
    }
});

test("packaged CSP1D subpath delegates quantities/candidates/exact totals to real Rust WASM", async () => {
    await initialize();
    const context = new CuttingContext({
        products: [{ id: "p", name: "p", width: [{ value: 30, unit: "mm" }] }],
        materials: [{ id: "m", name: "m", widthRange: { lowerBound: { value: 0, unit: "cm" }, upperBound: { value: 10, unit: "cm" } }, machineId: null, availableBatches: null }],
        machines: [], demands: [{ productId: "p", mode: "sheet", count: 5n }], lengthUnit: "cm",
    });
    const restored = CuttingContext.fromArtifact(context.toArtifact()), candidates = restored.generatePatterns();
    const result = context.verifyUsages([{ plan: candidates.plans()[2], count: 9_007_199_254_740_991n }]);
    context.dispose(); restored.dispose();
    assert.equal(candidates.candidateComplete(), false); assert.equal(candidates.plans().length, 3);
    assert.equal(result.produced().get("p"), 27_021_597_764_222_973n); assert.equal(result.usedWidth().unit, "cm");
    result.dispose(); candidates.dispose();
});

test("packaged core exports preserve CP canonical text and exact activity evidence", async () => {
    await initialize();
    const model = new ConstraintProgrammingModel("packaged-cp"), high = 9007199254740993n;
    const domain = IntegerDomain.range(high, high + 5n);
    const variable = model.addVariable("x", domain), expression = variable.toExpression();
    const constraint = expression.le(high);
    model.addConstraint(constraint, { id: "limit" });
    const snapshot = model.freeze();
    const report = new ConstraintActivityAnalyzer().analyzeCp(snapshot, [high + 1n]);
    assert.equal(report.integerRhs("limit"), high);
    assert.equal(report.status("limit"), "VIOLATED");
    assert.match(snapshot.toJson(), /9007199254740993/);
    model.dispose();
    snapshot.validateAssignment([high]);
    for (const value of [domain, expression, constraint, snapshot, report]) value.dispose();
});

function packingProblem() {
    return { items: [
        { id: "a", length: { value: 40, unit: "mm" }, weight: { value: 100, unit: "g" }, amount: 2n, materials: new Map([["steel", 3n]]) },
        { id: "b", length: { value: 0.02, unit: "m" }, weight: { value: 0.1, unit: "kg" }, amount: 1n, materials: new Map([["steel", 1n]]) },
    ], binTypes: [{ id: "bin", length: { value: 10, unit: "cm" }, maxWeight: { value: 1, unit: "kg" }, cost: 2, inventory: 2n }],
        spacing: { value: 0, unit: "mm" }, lengthUnit: "cm", weightUnit: "kg", objective: "binCount" };
}

async function solvePackingCases(client, backend) {
    await initialize();
    for (const Solver of [Bpp1dMilp, Bpp1dColumnGeneration]) {
        for (const kind of ["normal", "spacing", "infeasible", "truncated", "cost", "length"]) {
            const input = packingProblem();
            if (kind === "spacing" || kind === "infeasible") input.spacing = { value: 1, unit: "cm" };
            if (kind === "infeasible") input.binTypes[0].inventory = 1n;
            if (kind === "cost") input.objective = "cost";
            if (kind === "length") input.objective = "consumedLength";
            const context = new PackingContext(input), artifact = context.toArtifact(); context.dispose();
            const events = [], job = await new Solver(client, { backend, ...(kind === "truncated" ? { generation: { maxPatterns: 1, maxNodes: 1 } } : {}) })
                .solve(artifact, { timeLimitMs: 15000, pollIntervalMs: 2, onProgress: json => events.push(json) });
            const report = Bpp1dReport.fromJson(job.reportJson, artifact), summary = report.summary(), packing = report.packing();
            assert.equal(summary.algorithm, Solver === Bpp1dMilp ? "milp" : "columnGeneration");
            assert.ok(events.length > 0);
            if (kind === "infeasible") {
                assert.equal(summary.globallyInfeasible, true); assert.equal(summary.problemStatus, "INFEASIBLE"); assert.equal(packing, undefined);
            } else if (kind === "truncated") {
                assert.equal(summary.candidateComplete, false); assert.equal(summary.globallyOptimal, false); assert.equal(summary.globallyInfeasible, false);
                const corrupted = JSON.parse(report.toJson()); corrupted.summary.globallyOptimal = true;
                assert.throws(() => Bpp1dReport.fromJson(JSON.stringify(corrupted), artifact), { code: "InvalidInput" });
            } else {
                assert.equal(summary.globallyOptimal, true); assert.equal(summary.candidateComplete, true);
                assert.equal(summary.objectiveValue, kind === "spacing" ? 2 : kind === "cost" ? 2 : kind === "length" ? 10 : 1);
                assert.equal(packing.kpi().itemCount, 3n); assert.equal(packing.kpi().binCount, kind === "spacing" ? 2n : 1n);
                assert.equal(packing.materials().get("steel"), 7n);
                const source = PackingContext.fromArtifact(artifact), checked = source.verifyPlans(packing.plans());
                assert.equal(checked.toJson(), packing.toJson()); checked.dispose(); source.dispose();
                const corrupted = JSON.parse(report.toJson()); corrupted.packing.kpi.itemCount = "4";
                assert.throws(() => Bpp1dReport.fromJson(JSON.stringify(corrupted), artifact), { code: "InvalidInput" });
                corrupted.packing.kpi.itemCount = "3"; corrupted.packing.plans[0].placements[0].length.value = 99;
                assert.throws(() => Bpp1dReport.fromJson(JSON.stringify(corrupted), artifact), { code: "InvalidInput" });
                const objectiveMismatch = JSON.parse(report.toJson()); objectiveMismatch.summary.objectiveValue += 1;
                assert.throws(() => Bpp1dReport.fromJson(JSON.stringify(objectiveMismatch), artifact), { code: "InvalidInput" });
            }
            const badVersion = JSON.parse(report.toJson()); badVersion.schemaVersion = "2.0";
            assert.throws(() => Bpp1dReport.fromJson(JSON.stringify(badVersion), artifact), { code: "UnsupportedProtocolVersion" });
            assert.throws(() => Bpp1dReport.fromJson(report.toJson(), { ...artifact, fingerprint: "foreign" }), { code: "FingerprintMismatch" });
            const preciseChild = report.solverReportJson().replace(/"nodes":(?:null|\d+)/g, '"nodes":18446744073709551615');
            const precise = report.toJson().replace(/"solverReportJson":"(?:\\.|[^"\\])*"/, () => `"solverReportJson":${JSON.stringify(preciseChild)}`);
            const restored = Bpp1dReport.fromJson(precise, artifact);
            assert.match(restored.solverReportJson(), /"nodes":18446744073709551615/);
            assert.deepEqual(restored.summary(), summary); restored.dispose();
            await client.release(job.id); report.dispose();
            assert.throws(() => report.summary(), { code: "Disposed" });
            if (packing) { assert.equal(packing.kpi().itemCount, 3n); packing.dispose(); }
        }
        const context = new PackingContext(packingProblem()), artifact = context.toArtifact(); context.dispose();
        const controller = new AbortController();
        const cancelling = { capabilities: () => client.capabilities(), async submit(request) { const view = await client.submit(request); controller.abort(); return view; },
            get: id => client.get(id), cancel: id => client.cancel(id), release: id => client.release(id) };
        const job = await new Solver(cancelling, { backend }).solve(artifact, { signal: controller.signal, pollIntervalMs: 1 });
        const report = Bpp1dReport.fromJson(job.reportJson, artifact);
        assert.ok(["CANCELLED", "COMPLETED"].includes(report.summary().terminationReason));
        await client.release(job.id); report.dispose();
        const limited = await new Solver(client, { backend }).solve(artifact, { timeLimitMs: 1, pollIntervalMs: 1 });
        const limitedReport = Bpp1dReport.fromJson(limited.reportJson, artifact);
        assert.ok(["TIME_LIMIT", "COMPLETED"].includes(limitedReport.summary().terminationReason));
        await client.release(limited.id); limitedReport.dispose();
    }
}

test("packaged Node SCIP executes physical BPP1D MILP and finite-pool column generation", async () => { await solvePackingCases(await NodeClient.create(), "scip"); });
test("packaged Node Gurobi executes physical BPP1D MILP and finite-pool column generation", { skip: process.env.OSPF_E2E_GUROBI !== "1" }, async () => { await solvePackingCases(await NodeClient.create(), "gurobi"); });
test("packaged HTTP SCIP executes physical BPP1D MILP and finite-pool column generation", { skip: !process.env.OSPF_E2E_URL }, async () => { await solvePackingCases(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), "scip"); });
test("packaged HTTP Gurobi executes physical BPP1D MILP and finite-pool column generation", { skip: !process.env.OSPF_E2E_URL || process.env.OSPF_E2E_GUROBI !== "1" }, async () => { await solvePackingCases(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), "gurobi"); });

async function solve(client, Solver = SCIPSolver) {
    await initialize();
    const model = new MetaModel("packaged-consumer");
    const x = model.addVariable("x", { lowerBound: 0, upperBound: 10 });
    const y = model.addVariable("y", { type: "binary" });
    const objective = model.linearExpression([[x, 1], [y, 1]]);
    const quadratic = objective.mul(objective);
    const lhs = objective.add(3);
    const symbol = model.addLinearSymbol("capacity-value", lhs);
    const reference = symbol.toLinear();
    const capacity = reference.le(7);
    const token = x.token();
    const id = token.id();
    model.setLinearObjective(objective, "maximize");
    model.addInequality(capacity, "capacity");
    for (const value of [objective, lhs, reference, capacity]) value.dispose();
    const result = await new Solver(client).solveLinear(model.toLinearTriadModel());
    const report = summarizeReport(result.reportJson);
    assert.equal(report.objectiveValue, 4);
    assert.equal(report.values.reduce((a, b) => a + b, 0), 4);
    model.setSolution(new Float64Array(report.values));
    assert.equal(symbol.evaluateSolution(), 7);
    assert.equal(token.result(), report.values[0]);
    assert.equal(token.id(), id);
    assert.equal(quadratic.evaluate(new Float64Array(report.values)), 16);
    await client.release(result.id);
    token.dispose(); symbol.dispose(); quadratic.dispose(); model.dispose();
}

test("public npm ESM entry and Node N-API execute a real SCIP MIP", async () => {
    await solve(await NodeClient.create());
});

async function observeSolverProgress(client, Solver, backend, attemptId) {
    await initialize();
    const capabilities = await client.capabilities();
    assert.ok(capabilities.backends.find(item => item.id === backend)?.capabilities.includes("intermediateProgress"));
    const model = new MetaModel("packaged-live-progress");
    const variables = Array.from({ length: 300 }, (_, index) => model.addVariable(`x${index}`, { type: "binary" }));
    let seed = 92871;
    const next = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return 1 + seed % 100; };
    model.setLinearObjective(variables.map(variable => [variable, next()]), "maximize");
    for (let row = 0; row < 25; row++) {
        const terms = variables.map(variable => [variable, next()]);
        const rhs = Math.floor(terms.reduce((sum, [, value]) => sum + value, 0) * 0.35);
        model.addLinearConstraint({ name: `row${row}`, terms, relation: "le", rhs });
    }
    const artifact = model.toLinearTriadModel();
    model.dispose();
    const controller = new AbortController(), observed = [];
    const result = await new Solver(client).solveLinear(artifact, {
        timeLimitMs: 5000, pollIntervalMs: 1, signal: controller.signal,
        onProgress(value) {
            const snapshot = JSON.parse(value);
            if (!snapshot.terminal && snapshot.stageProgress === "INDETERMINATE") {
                observed.push(snapshot);
                controller.abort();
            }
        },
    });
    try {
        assert.ok(observed.length > 0);
        assert.ok(observed.every(snapshot => snapshot.attemptId === attemptId &&
            (snapshot.bestBound == null || Math.abs(snapshot.bestBound) < 1e20)));
        assert.ok(result.reportJson);
    } finally { await client.release(result.id); }
}

test("packaged Node SCIP forwards intermediate progress and cancellation", { skip: process.env.OSPF_E2E_PROGRESS !== "1" }, async () => observeSolverProgress(await NodeClient.create(), SCIPSolver, "scip", "SCIP"));
test("packaged HTTP SCIP forwards intermediate progress and cancellation", { skip: process.env.OSPF_E2E_PROGRESS !== "1" || !process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN }, async () => observeSolverProgress(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), SCIPSolver, "scip", "SCIP"));
test("packaged Node Gurobi forwards intermediate progress and cancellation", { skip: process.env.OSPF_E2E_PROGRESS !== "1" || process.env.OSPF_E2E_GUROBI !== "1" }, async () => observeSolverProgress(await NodeClient.create(), GurobiSolver, "gurobi", "Gurobi"));
test("packaged HTTP Gurobi forwards intermediate progress and cancellation", { skip: process.env.OSPF_E2E_PROGRESS !== "1" || process.env.OSPF_E2E_GUROBI !== "1" || !process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN }, async () => observeSolverProgress(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), GurobiSolver, "gurobi", "Gurobi"));

async function solveUpdatedBounds(client) {
    await initialize();
    const model = new MetaModel("packaged-updated-bounds");
    const x = model.addVariable("x", { lowerBound: 0, upperBound: 10 });
    const token = x.token();
    model.setLinearObjective([[x, 1]], "maximize");
    const before = model.toLinearTriadModel();
    model.setVariableRange(x, { lowerBound: 1, upperBound: 3 });
    assert.equal(token.upperBound(), 3);
    const artifact = model.toLinearTriadModel();
    assert.notEqual(artifact.fingerprint, before.fingerprint);
    try {
        for (const [input, expected] of [[before, 10], [artifact, 3]]) {
            const result = await new SCIPSolver(client).solveLinear(input);
            try {
                const report = summarizeReport(result.reportJson);
                assert.equal(report.objectiveValue, expected);
                assert.deepEqual(report.values, [expected]);
            } finally { await client.release(result.id); }
        }
    } finally { token.dispose(); model.dispose(); }
}

test("packaged Node SCIP solves the updated variable bounds", async () => solveUpdatedBounds(await NodeClient.create()));
test("packaged HTTP SCIP solves the updated variable bounds", { skip: !process.env.OSPF_E2E_URL }, async () => solveUpdatedBounds(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN })));

async function cancelAfterActualCompletion(client) {
    await initialize();
    const model = new MetaModel("packaged-cancel-race"), controller = new AbortController(), progress = [];
    let submittedId;
    try {
        const x = model.addVariable("x", { lowerBound: 0, upperBound: 4 });
        model.setLinearObjective([[x, 1]], "maximize");
        const observing = {
            capabilities: () => client.capabilities(),
            async submit(request) { const view = await client.submit(request); submittedId = view.id; controller.abort(); return view; },
            async cancel(id) {
                const deadline = Date.now() + 15_000;
                while ((await client.get(id)).status === "running") {
                    assert.ok(Date.now() < deadline, "native solver did not finish");
                    await new Promise(resolve => setTimeout(resolve, 5));
                }
                return client.cancel(id);
            },
            async get() { throw new Error("terminal cancellation response must not be polled again"); },
        };
        const result = await new SCIPSolver(observing).solveLinear(model.toLinearTriadModel(), { signal: controller.signal, onProgress: value => progress.push(JSON.parse(value)) });
        assert.equal(result.status, "completed");
        assert.equal(summarizeReport(result.reportJson).objectiveValue, 4);
        assert.ok(progress.some(value => value.terminal === true));
    } finally {
        try { if (submittedId) await client.release(submittedId); }
        finally { model.dispose(); }
    }
}

test("packaged Node SCIP retains an already-completed cancellation response", async () => cancelAfterActualCompletion(await NodeClient.create()));
test("packaged HTTP SCIP retains an already-completed cancellation response", { skip: !process.env.OSPF_E2E_URL }, async () => cancelAfterActualCompletion(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN })));

test("packaged Node SCIP receives cancellation during the poll delay", async () => {
    await initialize();
    const client = await NodeClient.create(), controller = new AbortController(), calls = [];
    const model = new MetaModel("packaged-cancel-delay");
    let submittedId;
    try {
        const x = model.addVariable("x", { lowerBound: 0, upperBound: 4 });
        model.setLinearObjective([[x, 1]], "maximize");
        const observing = {
            capabilities: () => client.capabilities(),
            async submit(request) { const view = await client.submit(request); submittedId = view.id; return { ...view, progressJson: "test-started" }; },
            async cancel(id) { calls.push("cancel"); return client.cancel(id); },
            async get(id) { calls.push("get"); return client.get(id); },
        };
        const result = await new SCIPSolver(observing).solveLinear(model.toLinearTriadModel(), {
            signal: controller.signal, pollIntervalMs: 250,
            onProgress(value) { if (value === "test-started") setTimeout(() => controller.abort(), 0); },
        });
        assert.equal(calls[0], "cancel");
        assert.equal(calls.filter(call => call === "cancel").length, 1);
        assert.equal(result.status, "completed");
        assert.ok(result.reportJson);
    } finally {
        try { if (submittedId) await client.release(submittedId); }
        finally { model.dispose(); }
    }
});

test("native boundary preserves protocol, validation and lifecycle errors", async () => {
    const client = await NodeClient.create();
    await assert.rejects(client.submit({}), { code: "InvalidInput" });
    await assert.rejects(client.submit({ protocolVersion: 2, solver: "scip", model: { modelJson: "{}", fingerprint: "invalid" }, timeLimitMs: null }), { code: "UnsupportedProtocolVersion" });
    await assert.rejects(client.get("missing"), { code: "NotFound" });
});

test("real infeasible and unbounded LPs remain normal reports", async () => {
    await initialize();
    const client = await NodeClient.create();
    for (const infeasible of [true, false]) {
        const model = new MetaModel(infeasible ? "infeasible-lp" : "unbounded-lp");
        const x = model.addVariable("x", { lowerBound: 0, ...(infeasible ? { upperBound: 1 } : {}) });
        model.setLinearObjective([[x, 1]], "maximize");
        if (infeasible) model.addLinearConstraint({ name: "contradiction", terms: [[x, 1]], relation: "ge", rhs: 2 });
        const result = await new SCIPSolver(client).solveLinear(model.toLinearTriadModel());
        assert.equal(result.status, "completed");
        assert.equal(summarizeReport(result.reportJson).problemStatus, infeasible ? "INFEASIBLE" : "UNBOUNDED");
        await client.release(result.id);
        model.dispose();
    }
});

test("public npm Gurobi facade executes a real native MIP", { skip: process.env.OSPF_E2E_GUROBI !== "1" }, async () => {
    await solve(await NodeClient.create(), GurobiSolver);
});

test("public npm ESM entry and HTTP execute a real SCIP MIP", { skip: !process.env.OSPF_E2E_URL }, async () => {
    await solve(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }));
});

test("public npm HTTP Gurobi facade executes a real MIP", { skip: !process.env.OSPF_E2E_URL || process.env.OSPF_E2E_GUROBI !== "1" }, async () => {
    await solve(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), GurobiSolver);
});

async function solveQuadraticCases(client, Solver) {
    await initialize();
    const solver = new Solver(client);
    assert.ok((await solver.descriptor()).capabilities.includes("quadratic"));
    for (const kind of ["qp", "miqp", "qcp", "infeasible-qcp"]) {
        const model = new MetaModel(`packaged-${solver.backend}-${kind}`);
        const x = model.addVariable("x", { type: kind === "miqp" ? "integer" : "continuous", lowerBound: kind === "infeasible-qcp" ? 2 : 0, upperBound: 5 });
        const linear = x.toLinear();
        const owned = [linear];
        if (kind === "qp") {
            const y = model.addVariable("y", { lowerBound: 0, upperBound: 5 });
            const sum = model.linearExpression([[x, 1], [y, 1]]);
            const square = sum.mul(sum);
            const penalty = sum.mul(6);
            const objective = square.sub(penalty);
            model.setQuadraticObjective(objective);
            owned.push(sum, square, penalty, objective);
        } else if (kind === "miqp") {
            const y = model.addVariable("y", { type: "binary" });
            const square = linear.mul(linear);
            const penalty = model.linearExpression([[x, 4], [y, 1]]);
            const objective = square.sub(penalty);
            model.setQuadraticObjective(objective);
            owned.push(square, penalty, objective);
        } else {
            const square = linear.mul(linear);
            const shifted = square.add(3);
            const capacity = shifted.le(kind === "infeasible-qcp" ? 4 : 7);
            model.addInequality(capacity, "quadratic-capacity");
            model.setLinearObjective(linear, "maximize");
            owned.push(square, shifted, capacity);
        }
        const artifact = model.toQuadraticTetradModel();
        const events = [];
        const result = await solver.solveQuadratic(artifact, { onProgress: event => events.push(event), timeLimitMs: 15_000, pollIntervalMs: 10 });
        const report = summarizeReport(result.reportJson);
        await client.release(result.id);
        assert.equal(result.status, "completed");
        assert.ok(events.length > 0);
        if (kind === "infeasible-qcp") {
            assert.equal(report.problemStatus, "INFEASIBLE");
        } else {
            const expected = kind === "qp" ? -9 : kind === "miqp" ? -5 : 2;
            assert.ok(Math.abs(report.objectiveValue - expected) < 1e-5, `${kind}: ${report.objectiveValue} != ${expected}`);
            if (kind === "qp") {
                const sum = report.values[0] + report.values[1];
                // 平坦最优点的变量偏差为目标误差的平方根 / Near a flat optimum, primal deviation scales with the square root of objective error.
                assert.ok(Math.abs(sum - 3) < 1e-3, `QP primal sum: ${sum}`);
                assert.ok(Math.abs(sum * sum - 6 * sum - report.objectiveValue) < 1e-5);
            }
            if (kind === "miqp") assert.deepEqual(report.values, [2, 1]);
            model.setSolution(new Float64Array(report.values));
        }
        for (const value of owned) value.dispose();
        model.dispose();
    }
    const invalid = new MetaModel("quadratic-boundary");
    invalid.addVariable("x", { lowerBound: 0, upperBound: 1 });
    const artifact = invalid.toQuadraticTetradModel();
    await assert.rejects(client.submit({ protocolVersion: 1, solver: solver.backend, model: { ...artifact, fingerprint: "wrong" }, modelKind: "quadratic", timeLimitMs: null }), { code: "FingerprintMismatch" });
    await assert.rejects(client.submit({ protocolVersion: 1, solver: solver.backend, model: artifact, timeLimitMs: null }), { code: "InvalidInput" });
    invalid.dispose();
}

test("packaged Node SCIP solves real QP, MIQP, QCP and infeasible QCP", async () => {
    await solveQuadraticCases(await NodeClient.create(), SCIPSolver);
});
test("packaged Node Gurobi solves real QP, MIQP, QCP and infeasible QCP", { skip: process.env.OSPF_E2E_GUROBI !== "1" }, async () => {
    await solveQuadraticCases(await NodeClient.create(), GurobiSolver);
});
test("packaged HTTP SCIP solves real QP, MIQP, QCP and infeasible QCP", { skip: !process.env.OSPF_E2E_URL }, async () => {
    await solveQuadraticCases(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), SCIPSolver);
});
test("packaged HTTP Gurobi solves real QP, MIQP, QCP and infeasible QCP", { skip: !process.env.OSPF_E2E_URL || process.env.OSPF_E2E_GUROBI !== "1" }, async () => {
    await solveQuadraticCases(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), GurobiSolver);
});

async function solveCpCases(client, Solver) {
    await initialize();
    const solver = new Solver(client);
    assert.ok((await solver.descriptor()).capabilities.includes("cpExactLowering"));
    for (const infeasible of [false, true]) {
        const model = new ConstraintProgrammingModel(`native-cp-${infeasible}`, "consumer-cp");
        const domain = IntegerDomain.values([0n, 2n, 4n]), bool = IntegerDomain.boolean();
        const z = model.addVariable("z", domain), a = model.addVariable("a", bool);
        const objective = model.integerExpression([[z, 1n], [a, 1n]], 7n);
        const expression = z.toExpression(), limit = expression.le(infeasible ? -1n : 2n);
        const enabled = model.booleanConstraint("literal", [{ variable: a }]);
        const different = model.allDifferent([z, a]);
        model.addConstraint(limit, { id: "limit" });
        model.addConstraint(enabled, { id: "enabled" });
        model.addConstraint(different, { id: "different" });
        model.setObjective(objective, "maximize");
        const snapshot = model.freeze(), artifact = snapshot.toArtifact(), events = [];
        model.dispose();
        const job = await solver.solveConstraintProgramming(artifact, { pollIntervalMs: 5, timeLimitMs: 15000, onProgress: json => events.push(json) });
        const report = ConstraintProgrammingReport.fromJson(job.reportJson, snapshot);
        assert.equal(job.status, "completed");
        assert.ok(events.length > 0);
        assert.equal(report.problemStatus(), infeasible ? "INFEASIBLE" : "FEASIBLE");
        assert.equal(report.hasSolution(), !infeasible);
        assert.deepEqual(report.variableIds(), ["a", "z"]);
        if (infeasible) {
            assert.deepEqual([...report.values()], []);
            assert.equal(report.value("z"), undefined);
            assert.equal(report.objectiveValue(), undefined);
        } else {
            assert.deepEqual([...report.values()], [1n, 2n]);
            assert.equal(report.objectiveValue(), 10n);
            assert.equal(report.bestBound(), 10n);
            const terminal = events.map(event => JSON.parse(event)).find(progress => progress.terminal);
            assert.equal(terminal?.objectiveValue, 10);
            assert.equal(terminal?.bestBound, 10);
            assert.equal(terminal?.relativeGap, 0);
            assert.equal(report.value("z"), 2n);
            const values = report.values(); values.fill(99n);
            assert.deepEqual([...report.values()], [1n, 2n]);
            const json = report.toJson();
            const precise = json.replace(/"nodes":(?:null|\d+)/g, '"nodes":18446744073709551615');
            const copy = ConstraintProgrammingReport.fromJson(precise, snapshot);
            assert.match(copy.toJson(), /"nodes":18446744073709551615/);
            assert.equal(copy.objectiveValue(), 10n);
            copy.dispose();
            const parsed = JSON.parse(json);
            parsed.solution.objective = 11;
            assert.throws(() => ConstraintProgrammingReport.fromJson(JSON.stringify(parsed), snapshot), { code: "InvalidInput" });
        }
        await client.release(job.id);
        snapshot.dispose();
        assert.equal(report.hasSolution(), !infeasible);
        for (const value of [domain, bool, objective, expression, limit, enabled, different, report]) value.dispose();
    }
    const schedule = new ConstraintProgrammingModel("cp-schedule");
    const time = IntegerDomain.range(0n, 6n), presence = IntegerDomain.boolean();
    const a = schedule.addVariable("a", time), b = schedule.addVariable("b", time), p = schedule.addVariable("p", presence);
    const startA = a.toExpression(), startB = b.toExpression(), endA = startA.add(2n), endB = startB.add(2n);
    const first = schedule.addInterval({ id: "first", start: startA, end: endA, duration: 2n });
    const second = schedule.addInterval({ id: "second", start: startB, end: endB, duration: 2n, presence: p });
    const present = schedule.booleanConstraint("literal", [{ variable: p }]);
    schedule.addConstraint(present, { id: "present" });
    const noOverlap = schedule.noOverlap([first, second]);
    schedule.addConstraint(noOverlap, { id: "no-overlap" });
    // 无目标的 satisfaction 不伪造整数目标 / Satisfaction without an objective must not invent an integer objective.
    const scheduleSnapshot = schedule.freeze();
    const scheduled = await solver.solveConstraintProgramming(scheduleSnapshot.toArtifact(), { pollIntervalMs: 5 });
    const scheduleReport = ConstraintProgrammingReport.fromJson(scheduled.reportJson, scheduleSnapshot);
    assert.equal(scheduleReport.problemStatus(), "FEASIBLE");
    assert.equal(scheduleReport.objectiveValue(), undefined);
    scheduleSnapshot.validateAssignment(scheduleReport.values());
    assert.match(scheduleSnapshot.intervalValuesJson(scheduleReport.values()), /"second"/);
    await client.release(scheduled.id);
    const controller = new AbortController();
    const cancellingClient = {
        capabilities: () => client.capabilities(),
        async submit(request) { const view = await client.submit(request); controller.abort(); return view; },
        get: id => client.get(id), cancel: id => client.cancel(id), release: id => client.release(id),
    };
    const raced = await new Solver(cancellingClient).solveConstraintProgramming(scheduleSnapshot.toArtifact(), { signal: controller.signal, pollIntervalMs: 1 });
    const raceReport = ConstraintProgrammingReport.fromJson(raced.reportJson, scheduleSnapshot);
    assert.ok(["COMPLETED", "CANCELLED", "INTERRUPTED"].includes(raceReport.terminationReason()));
    await client.release(raced.id);
    raceReport.dispose();
    const aborted = new AbortController();
    aborted.abort();
    await assert.rejects(solver.solveConstraintProgramming(scheduleSnapshot.toArtifact(), { signal: aborted.signal }), { code: "Aborted" });
    for (const value of [schedule, time, presence, startA, startB, endA, endB, present, noOverlap, scheduleSnapshot, scheduleReport]) value.dispose();

    const model = new ConstraintProgrammingModel("inexact-lowering");
    const domain = IntegerDomain.range(9007199254740993n, 9007199254740995n);
    model.addVariable("x", domain);
    const snapshot = model.freeze();
    const artifact = snapshot.toArtifact();
    await assert.rejects(client.submit({ protocolVersion: 1, solver: solver.backend, modelKind: "cp", model: { ...artifact, fingerprint: "wrong" }, timeLimitMs: null }), { code: "FingerprintMismatch" });
    let failed;
    try { await solver.solveConstraintProgramming(artifact, { pollIntervalMs: 5 }); assert.fail("inexact lowering must not succeed"); }
    catch (error) { failed = error; }
    assert.equal(failed.code, "NUMERICAL");
    assert.ok(failed.jobId);
    await client.release(failed.jobId);
    for (const value of [model, domain, snapshot]) value.dispose();

    const total = new ConstraintProgrammingModel("inexact-zero-constant"), one = IntegerDomain.range(1n, 1n);
    const x = total.addVariable("x", one), y = total.addVariable("y", one);
    const objective = total.integerExpression([[x, 9007199254740992n], [y, 1n]], 0n);
    total.setObjective(objective, "maximize");
    const totalSnapshot = total.freeze();
    assert.equal(totalSnapshot.analyzeMipLowering().status, "inexact");
    try { await solver.solveConstraintProgramming(totalSnapshot.toArtifact(), { pollIntervalMs: 5 }); assert.fail("inexact objective must not succeed"); }
    catch (error) { failed = error; }
    assert.equal(failed.code, "NUMERICAL");
    assert.ok(failed.jobId);
    await client.release(failed.jobId);
    for (const value of [total, one, objective, totalSnapshot]) value.dispose();
}

test("packaged Node SCIP solves CP through exact finite lowering", async () => {
    await solveCpCases(await NodeClient.create(), SCIPSolver);
});
test("packaged Node Gurobi solves CP through exact finite lowering", { skip: process.env.OSPF_E2E_GUROBI !== "1" }, async () => {
    await solveCpCases(await NodeClient.create(), GurobiSolver);
});
test("packaged HTTP SCIP solves CP through exact finite lowering", { skip: !process.env.OSPF_E2E_URL }, async () => {
    await solveCpCases(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), SCIPSolver);
});
test("packaged HTTP Gurobi solves CP through exact finite lowering", { skip: !process.env.OSPF_E2E_URL || process.env.OSPF_E2E_GUROBI !== "1" }, async () => {
    await solveCpCases(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), GurobiSolver);
});

async function solveGlobalCpCases(client, Solver) {
    await initialize();
    const solver = new Solver(client), model = new ConstraintProgrammingModel("native-global-cp");
    const bool = IntegerDomain.boolean(), values = IntegerDomain.values([2n, 4n]);
    const b = model.addVariable("b", bool), i = model.addVariable("i", bool), t = model.addVariable("t", values);
    const index = i.toExpression(), target = t.toExpression(), one = model.integerExpression([], 1n), zero = model.integerExpression(), two = model.integerExpression([], 2n);
    const relation = index.eq(1n);
    const constraints = [
        model.element({ index: i, values: [2n, 4n], target: t }),
        model.allowedAssignments([i, t], [new BigInt64Array([0n, 2n]), [1n, 4n]]),
        model.forbiddenAssignments([i, t], [[0n, 2n]]),
        model.reification(b, relation), model.implication({ variable: b, negated: true }, relation), model.allDifferent([index, target]),
    ];
    const optional = model.addInterval({ id: "optional", start: zero, end: one, duration: i, presence: { variable: b, negated: true } });
    const mandatory = model.addInterval({ id: "mandatory", start: zero, end: two, duration: 2n });
    constraints.push(model.noOverlap([optional, mandatory]));
    for (const [index, constraint] of constraints.entries()) model.addConstraint(constraint, { id: `constraint-${index}` });
    const objective = target.add(1n);
    model.setObjective(objective, "maximize");
    const snapshot = model.freeze();
    const job = await solver.solveConstraintProgramming(snapshot.toArtifact(), { pollIntervalMs: 5 });
    const report = ConstraintProgrammingReport.fromJson(job.reportJson, snapshot);
    assert.equal(report.problemStatus(), "FEASIBLE");
    assert.deepEqual([...report.values()], [1n, 1n, 4n]);
    assert.equal(report.objectiveValue(), 5n);
    assert.doesNotMatch(snapshot.intervalValuesJson(report.values()), /"optional"/);
    await client.release(job.id);
    for (const object of [bool, values, index, target, one, zero, two, relation, ...constraints, objective, snapshot, report, model]) object.dispose();

    for (const kind of ["circuit", "automaton", "reservoir", "cumulative"]) {
        const model = new ConstraintProgrammingModel(`unsupported-${kind}`), bool = IntegerDomain.boolean();
        const x = model.addVariable("x", bool), zero = model.integerExpression(), one = model.integerExpression([], 1n);
        const interval = model.addInterval({ id: "task", start: zero, duration: 1n, end: one });
        const constraint = kind === "circuit" ? model.circuit([zero])
            : kind === "automaton" ? model.automaton([x], { initialState: 0, finalStates: [0], transitions: [{ fromState: 0, value: 0n, toState: 0 }] })
            : kind === "reservoir" ? model.reservoir({ events: [{ time: zero, levelChange: one }], initialLevel: 0n, minimumLevel: 0n, maximumLevel: 1n })
            : model.cumulative([{ interval, demand: 1n }], 1n);
        model.addConstraint(constraint, { id: kind });
        const snapshot = model.freeze();
        snapshot.validateAssignment([0n]);
        assert.deepEqual(snapshot.analyzeMipLowering(), { status: "unsupported", constraint: kind, feature: kind });
        let failure;
        try { await solver.solveConstraintProgramming(snapshot.toArtifact(), { pollIntervalMs: 5 }); }
        catch (error) { failure = error; }
        assert.equal(failure?.code, "UNSUPPORTED", `${kind} must not be silently ignored or enabled outside core defaults`);
        assert.ok(failure.jobId);
        await client.release(failure.jobId);
        for (const object of [bool, zero, one, constraint, snapshot, model]) object.dispose();
    }
}

test("packaged Node SCIP preserves global CP factories and rejects unsupported lowering", async () => {
    await solveGlobalCpCases(await NodeClient.create(), SCIPSolver);
});
test("packaged Node Gurobi preserves global CP factories and rejects unsupported lowering", { skip: process.env.OSPF_E2E_GUROBI !== "1" }, async () => {
    await solveGlobalCpCases(await NodeClient.create(), GurobiSolver);
});
test("packaged HTTP SCIP preserves global CP factories and rejects unsupported lowering", { skip: !process.env.OSPF_E2E_URL }, async () => {
    await solveGlobalCpCases(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), SCIPSolver);
});
test("packaged HTTP Gurobi preserves global CP factories and rejects unsupported lowering", { skip: !process.env.OSPF_E2E_URL || process.env.OSPF_E2E_GUROBI !== "1" }, async () => {
    await solveGlobalCpCases(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), GurobiSolver);
});

async function solveAssumptionCases(client, Solver) {
    await initialize();
    const model = new ConstraintProgrammingModel("native-cp-assumptions");
    const bool = IntegerDomain.boolean(), domain = IntegerDomain.values([0n, 2n, 4n]), sparse = IntegerDomain.values([0n, 2n]);
    model.addVariable("b", bool); const x = model.addVariable("x", domain);
    const objective = model.integerExpression([[x, 1n]], 7n);
    model.setObjective(objective, "maximize");
    const source = model.freeze(), original = source.toJson(), solver = new Solver(client);
    for (const object of [model, bool, domain, objective]) object.dispose();
    for (const infeasible of [false, true]) {
        const assumptions = [
            { kind: "literal", variableId: "b" }, { kind: "equal", variableId: "x", value: 2n },
            { kind: "lowerBound", variableId: "x", value: 2n }, { kind: "upperBound", variableId: "x", value: 2n },
            { kind: "sparseDomain", variableId: "x", domain: sparse },
        ];
        if (infeasible) assumptions.push({ kind: "literal", variableId: "b", negated: true });
        const snapshot = source.withAssumptions(assumptions);
        const analysis = snapshot.analyzeMipLowering();
        assert.equal(analysis.status, "lowered");
        assert.equal(analysis.fingerprint, snapshot.fingerprint());
        const job = await solver.solveConstraintProgramming(snapshot.toArtifact(), { pollIntervalMs: 5, timeLimitMs: 15000 });
        const report = ConstraintProgrammingReport.fromJson(job.reportJson, snapshot);
        assert.equal(report.problemStatus(), infeasible ? "INFEASIBLE" : "FEASIBLE");
        assert.equal(report.hasSolution(), !infeasible);
        assert.throws(() => ConstraintProgrammingReport.fromJson(job.reportJson, source), { code: "FingerprintMismatch" });
        if (!infeasible) {
            assert.deepEqual([...report.values()], [1n, 2n]);
            assert.equal(report.objectiveValue(), 9n);
            snapshot.validateAssignment(report.values());
        }
        assert.equal(source.toJson(), original);
        source.validateAssignment([0n, 4n]);
        await client.release(job.id);
        snapshot.dispose(); report.dispose();
    }
    source.dispose(); sparse.dispose();
}

test("packaged Node SCIP solves immutable CP assumption snapshots", async () => {
    await solveAssumptionCases(await NodeClient.create(), SCIPSolver);
});
test("packaged Node Gurobi solves immutable CP assumption snapshots", { skip: process.env.OSPF_E2E_GUROBI !== "1" }, async () => {
    await solveAssumptionCases(await NodeClient.create(), GurobiSolver);
});
test("packaged HTTP SCIP solves immutable CP assumption snapshots", { skip: !process.env.OSPF_E2E_URL }, async () => {
    await solveAssumptionCases(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), SCIPSolver);
});
test("packaged HTTP Gurobi solves immutable CP assumption snapshots", { skip: !process.env.OSPF_E2E_URL || process.env.OSPF_E2E_GUROBI !== "1" }, async () => {
    await solveAssumptionCases(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), GurobiSolver);
});

async function solveCpOptionsCases(client, Solver) {
    await initialize();
    const solver = new Solver(client);
    assert.ok((await solver.descriptor()).capabilities.includes("cpSolveOptions"));
    const model = new ConstraintProgrammingModel("cp-options"), domain = IntegerDomain.range(0n, 4n), bool = IntegerDomain.boolean();
    model.addVariable("b", bool); const x = model.addVariable("x", domain);
    const expression = x.toExpression(), limit = expression.le(3n), objective = expression.add(7n);
    model.addConstraint(limit, { id: "limit" }); model.setObjective(objective, "maximize");
    const snapshot = model.freeze();
    for (const [options, termination, expectedObjective] of [
        [{ solutionHint: new Map([["x", 2n]]), nodeLimit: 100000, solutionLimit: 100000 }, "COMPLETED", 10n],
        [{ solutionHint: new Map([["b", 1n], ["x", 2n]]), nodeLimit: 0 }, "NODE_LIMIT", 9n],
        [{ solutionHint: new Map([["b", 1n], ["x", 2n]]), solutionLimit: 0 }, "SOLUTION_LIMIT", 9n],
        [{ nodeLimit: 0, requestConflict: true }, "NODE_LIMIT", undefined],
    ]) {
        const job = await solver.solveConstraintProgramming(snapshot.toArtifact(), { ...options, pollIntervalMs: 5 });
        const report = ConstraintProgrammingReport.fromJson(job.reportJson, snapshot);
        assert.equal(report.terminationReason(), termination);
        assert.equal(report.objectiveValue(), expectedObjective);
        if (termination === "COMPLETED") assert.equal(report.diagnosticExtension("cp.mip.hint.sourceVariables"), "1");
        if (report.hasSolution()) snapshot.validateAssignment(report.values());
        if (options.requestConflict) {
            assert.ok(report.diagnosticIssueCodes().includes("CpConflictDiagnosticsUnavailable"));
            assert.equal(JSON.parse(report.infeasibilityEvidenceJson()).source, "UNAVAILABLE");
        }
        assert.equal(report.diagnosticExtension("nonexistent"), undefined);
        await client.release(job.id); report.dispose();
        assert.throws(() => report.diagnosticIssueCodes(), { code: "Disposed" });
    }
    for (const hint of [new Map([["missing", 1n]]), new Map([["x", 5n]]), new Map([["b", 1n], ["x", 4n]])]) {
        let failure;
        try { await solver.solveConstraintProgramming(snapshot.toArtifact(), { solutionHint: hint, pollIntervalMs: 5 }); }
        catch (error) { failure = error; }
        assert.equal(failure?.code, "MODELING");
        assert.ok(failure.jobId);
        await client.release(failure.jobId);
    }
    const contradiction = snapshot.withAssumptions([{ kind: "literal", variableId: "b" }, { kind: "literal", variableId: "b", negated: true }]);
    const job = await solver.solveConstraintProgramming(contradiction.toArtifact(), { requestConflict: true, pollIntervalMs: 5 });
    const report = ConstraintProgrammingReport.fromJson(job.reportJson, contradiction), evidence = JSON.parse(report.infeasibilityEvidenceJson());
    assert.equal(report.problemStatus(), "INFEASIBLE");
    assert.equal(evidence.source, "REBUILD_VERIFICATION");
    assert.equal(evidence.completeness, "COMPLETE");
    assert.equal(evidence.minimality, "NOT_CHECKED");
    assert.ok(evidence.members.some(member => "constraint" in member));
    await client.release(job.id);
    for (const object of [model, domain, bool, expression, limit, objective, snapshot, contradiction, report]) object.dispose();

    const exactModel = new ConstraintProgrammingModel("exact-limited-hint"), exactDomain = IntegerDomain.values([9007199254740993n]);
    exactModel.addVariable("x", exactDomain);
    const exactSnapshot = exactModel.freeze();
    // 零节点只复验完整 hint，不宣称超出 f64 边界的实际后端求解 / A zero-node limit only verifies the complete hint, not backend solving beyond f64.
    const exactJob = await solver.solveConstraintProgramming(exactSnapshot.toArtifact(), { nodeLimit: 0, solutionHint: new Map([["x", 9007199254740993n]]), pollIntervalMs: 5 });
    const exactReport = ConstraintProgrammingReport.fromJson(exactJob.reportJson, exactSnapshot);
    assert.equal(exactReport.terminationReason(), "NODE_LIMIT");
    assert.equal(exactReport.value("x"), 9007199254740993n);
    await client.release(exactJob.id);
    for (const object of [exactModel, exactDomain, exactSnapshot, exactReport]) object.dispose();
}

test("packaged Node SCIP preserves CP hints, limits and verified conflict diagnostics", async () => {
    await solveCpOptionsCases(await NodeClient.create(), SCIPSolver);
});
test("packaged Node Gurobi preserves CP hints, limits and verified conflict diagnostics", { skip: process.env.OSPF_E2E_GUROBI !== "1" }, async () => {
    await solveCpOptionsCases(await NodeClient.create(), GurobiSolver);
});
test("packaged HTTP SCIP preserves CP hints, limits and verified conflict diagnostics", { skip: !process.env.OSPF_E2E_URL }, async () => {
    await solveCpOptionsCases(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), SCIPSolver);
});
test("packaged HTTP Gurobi preserves CP hints, limits and verified conflict diagnostics", { skip: !process.env.OSPF_E2E_URL || process.env.OSPF_E2E_GUROBI !== "1" }, async () => {
    await solveCpOptionsCases(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), GurobiSolver);
});

async function solveSerialCases(client) {
    await initialize();
    const backends = process.env.OSPF_E2E_GUROBI === "1" ? ["scip", "gurobi"] : ["scip"];
    for (const kind of ["feasible", "infeasible", "unbounded"]) for (const policy of ["stopOnCertifiedTerminal", "continueOnTerminal"]) {
        const model = new MetaModel(`serial-${kind}-${policy}`);
        const x = model.addVariable("x", { type: kind === "unbounded" ? "continuous" : "integer", lowerBound: 0, upperBound: kind === "unbounded" ? Infinity : 4 });
        model.setLinearObjective([[x, 1]], "maximize");
        if (kind === "infeasible") model.addLinearConstraint({ name: "contradiction", terms: [[x, 1]], relation: "ge", rhs: 5 });
        const artifact = model.toLinearTriadModel(), events = [];
        model.dispose();
        const solver = new SerialCombinatorialLinearSolver(client, { backends, fallbackPolicy: policy });
        assert.ok((await solver.descriptor()).capabilities.includes("serialLinear"));
        const job = await solver.solveLinear(artifact, { pollIntervalMs: 5, timeLimitMs: 15000, onProgress: json => events.push(json) });
        assert.equal(job.status, "completed");
        const report = CombinatorialReport.fromJson(job.reportJson, artifact), ids = report.attemptIds();
        assert.equal(ids.length, kind === "feasible" || policy === "stopOnCertifiedTerminal" ? 1 : backends.length);
        assert.equal(report.selectedAttemptId(), ids[0]);
        assert.ok(report.selectionReason());
        assert.ok(events.length > 0);
        assert.equal(report.summary().problemStatus, kind === "feasible" ? "FEASIBLE" : kind === "infeasible" ? "INFEASIBLE" : "UNBOUNDED");
        if (kind === "feasible") { assert.equal(report.summary().objectiveValue, 4); assert.deepEqual(report.summary().values, [4]); }
        assert.deepEqual(summarizeReport(report.reportJson()), report.summary());
        for (const [index, id] of ids.entries()) assert.ok(id.includes(backends[index]));
        assert.throws(() => report.attemptJson("unknown"), { code: "InvalidInput" });
        assert.throws(() => CombinatorialReport.fromJson(job.reportJson, { ...artifact, fingerprint: "wrong" }), { code: "FingerprintMismatch" });
        const parsed = JSON.parse(report.toJson());
        parsed.selectedAttemptId = "not-an-executed-attempt";
        assert.throws(() => CombinatorialReport.fromJson(JSON.stringify(parsed), artifact), { code: "InvalidInput" });
        const precise = report.toJson().replace(/"nodes":(?:null|\d+)/g, '"nodes":18446744073709551615')
            .replace(/"threadCount":(?:null|\d+)/g, '"threadCount":18446744073709551615').replace(/"startedAtEpochMs":\d+/g, '"startedAtEpochMs":18446744073709551614')
            .replace(/"completedAtEpochMs":\d+/g, '"completedAtEpochMs":18446744073709551615');
        const restored = CombinatorialReport.fromJson(precise, artifact);
        assert.match(restored.toJson(), /18446744073709551615/);
        assert.match(restored.reportJson(), /"nodes":18446744073709551615/);
        assert.match(restored.attemptJson(ids[0]), /"threadCount":18446744073709551615/);
        assert.match(restored.attemptJson(ids[0]), /18446744073709551615/);
        await client.release(job.id);
        report.dispose();
        assert.throws(() => report.summary(), { code: "Disposed" });
        assert.equal(restored.summary().problemStatus, kind === "feasible" ? "FEASIBLE" : kind === "infeasible" ? "INFEASIBLE" : "UNBOUNDED");
        restored.dispose();
    }
    const model = new MetaModel("serial-cancel-race"), x = model.addVariable("x", { type: "binary" });
    model.setLinearObjective([[x, 1]], "maximize"); const artifact = model.toLinearTriadModel(); model.dispose();
    const controller = new AbortController();
    const cancelling = { capabilities: () => client.capabilities(),
        async submit(request) { const view = await client.submit(request); controller.abort(); return view; },
        get: id => client.get(id), cancel: id => client.cancel(id), release: id => client.release(id) };
    const job = await new SerialCombinatorialLinearSolver(cancelling, { backends }).solveLinear(artifact, { signal: controller.signal, pollIntervalMs: 1 });
    const report = CombinatorialReport.fromJson(job.reportJson, artifact);
    assert.ok(["COMPLETED", "CANCELLED", "INTERRUPTED"].includes(report.summary().terminationReason));
    await client.release(job.id); report.dispose();
}

test("packaged Node executes real Rust framework serial composition and retains attempt metadata", async () => {
    await solveSerialCases(await NodeClient.create());
});
test("packaged HTTP executes real Rust framework serial composition and retains attempt metadata", { skip: !process.env.OSPF_E2E_URL }, async () => {
    await solveSerialCases(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }));
});

async function solveParallelCases(client) {
    await initialize();
    const backends = process.env.OSPF_E2E_GUROBI === "1" ? ["scip", "gurobi"] : ["scip"];
    for (const mode of ["first", "best"]) for (const kind of ["feasible", "infeasible", "unbounded"]) {
        const model = new MetaModel(`parallel-${mode}-${kind}`);
        const x = model.addVariable("x", { type: kind === "unbounded" ? "continuous" : "integer", lowerBound: 0, upperBound: kind === "unbounded" ? Infinity : 4 });
        model.setLinearObjective([[x, 1]], "maximize");
        if (kind === "infeasible") model.addLinearConstraint({ name: "contradiction", terms: [[x, 1]], relation: "ge", rhs: 5 });
        const artifact = model.toLinearTriadModel(), events = [];
        model.dispose();
        const solver = new ParallelCombinatorialLinearSolver(client, { backends, mode });
        assert.ok((await solver.descriptor()).capabilities.includes("parallelLinear"));
        const job = await solver.solveLinear(artifact, { pollIntervalMs: 5, timeLimitMs: 15000, onProgress: json => events.push(json) });
        const report = CombinatorialReport.fromJson(job.reportJson, artifact), ids = report.attemptIds();
        assert.equal(ids.length, backends.length);
        assert.ok(ids.includes(report.selectedAttemptId()));
        assert.ok(report.selectionReason());
        for (const [index, id] of ids.entries()) assert.ok(id.includes(backends[index]));
        assert.ok(events.length > 0);
        assert.equal(report.summary().problemStatus, kind === "feasible" ? "FEASIBLE" : kind === "infeasible" ? "INFEASIBLE" : "UNBOUNDED");
        if (kind === "feasible") { assert.equal(report.summary().objectiveValue, 4); assert.deepEqual(report.summary().values, [4]); }
        if (mode === "best") assert.equal(report.selectedAttemptId(), ids[0]);
        const copy = CombinatorialReport.fromJson(report.toJson(), artifact);
        assert.deepEqual(copy.summary(), report.summary());
        await client.release(job.id); report.dispose(); copy.dispose();
    }
    const model = new MetaModel("parallel-cancel-race"), x = model.addVariable("x", { type: "binary" });
    model.setLinearObjective([[x, 1]], "maximize"); const artifact = model.toLinearTriadModel(); model.dispose();
    const controller = new AbortController();
    const cancelling = { capabilities: () => client.capabilities(),
        async submit(request) { const view = await client.submit(request); controller.abort(); return view; },
        get: id => client.get(id), cancel: id => client.cancel(id), release: id => client.release(id) };
    const job = await new ParallelCombinatorialLinearSolver(cancelling, { backends, mode: "best" }).solveLinear(artifact, { signal: controller.signal, pollIntervalMs: 1 });
    const report = CombinatorialReport.fromJson(job.reportJson, artifact);
    assert.ok(["COMPLETED", "CANCELLED", "INTERRUPTED"].includes(report.summary().terminationReason));
    await client.release(job.id); report.dispose();
}

test("packaged Node executes real Rust framework parallel First/Best composition", async () => {
    await solveParallelCases(await NodeClient.create());
});
test("packaged HTTP executes real Rust framework parallel First/Best composition", { skip: !process.env.OSPF_E2E_URL }, async () => {
    await solveParallelCases(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }));
});

async function solveFixedRecourseCases(client, backend) {
    await initialize();
    for (const kind of ["optimality", "feasibility", "maximize", "limited", "infeasible"]) {
        const model = new MetaModel(`benders-${backend}-${kind}`), x = model.addVariable("x", { type: "binary" });
        const y = model.addVariable("y", { lowerBound: 0, upperBound: kind === "feasibility" ? 0 : 2 });
        model.setLinearObjective([[x, 0.5], [y, kind === "feasibility" ? 0 : 1]], kind === "maximize" ? "maximize" : "minimize");
        model.addLinearConstraint({ name: "coupling", terms: [[x, 1], [y, 1]], relation: "ge", rhs: kind === "infeasible" ? 4 : 1 });
        const artifact = model.toLinearTriadModel(); model.dispose();
        const algorithm = new FixedRecourseAlgorithm(client, { backend, stages: [{ variableIndex: 1, stage: "continuousRecourse" }], ...(kind === "limited" ? { iterationLimit: 1 } : {}) });
        assert.ok((await algorithm.descriptor()).capabilities.includes("fixedRecourse"));
        const events = [];
        const job = await algorithm.solveLinear(artifact, { timeLimitMs: 15000, pollIntervalMs: 5, onProgress: json => events.push(json) });
        const report = FixedRecourseReport.fromJson(job.reportJson, artifact), summary = report.summary();
        assert.equal(summary.stop, kind === "limited" ? "iterationLimit" : kind === "infeasible" ? "masterTermination" : "converged");
        assert.ok(events.length > 0);
        assert.ok(summary.iterations > 0 && summary.iterations <= 2);
        assert.ok(report.masterReportJson()); assert.ok(report.subproblemReportJson());
        assert.equal(summary.backendError, null);
        if (kind === "infeasible") {
            assert.equal(summary.terminalProblemStatus, "INFEASIBLE");
            assert.equal(summary.terminalTerminationReason, "COMPLETED");
            assert.equal(summary.objectiveValue, null); assert.deepEqual(summary.values, []);
        } else {
            const objective = kind === "maximize" ? 2.5 : kind === "limited" ? 1 : 0.5;
            assert.equal(summary.objectiveValue, objective);
            assert.equal(summary.bestBound, kind === "limited" ? -0 : objective);
            assert.equal(summary.values.length, 2);
            assert.ok(summary.values[0] + summary.values[1] >= 1 - 1e-7);
            if (kind === "optimality" || kind === "limited") assert.ok(summary.optimalityCuts > 0);
            if (kind === "feasibility") assert.ok(summary.feasibilityCuts > 0);
            if (kind !== "limited") {
                const directJob = await new (backend === "scip" ? SCIPSolver : GurobiSolver)(client).solveLinear(artifact, { pollIntervalMs: 5 });
                assert.ok(Math.abs(summarizeReport(directJob.reportJson).objectiveValue - objective) < 1e-7);
                await client.release(directJob.id);
            }
        }
        assert.throws(() => FixedRecourseReport.fromJson(job.reportJson, { ...artifact, fingerprint: "foreign-source" }), { code: "FingerprintMismatch" });
        if (summary.objectiveValue !== null) {
            const corrupted = JSON.parse(report.toJson()); corrupted.summary.values = [0, 0];
            assert.throws(() => FixedRecourseReport.fromJson(JSON.stringify(corrupted), artifact), { code: "InvalidInput" });
        }
        const preciseChild = report.masterReportJson().replace(/"randomSeed":(?:null|\d+)/g, '"randomSeed":18446744073709551615')
            .replace(/"nodes":(?:null|\d+)/g, '"nodes":18446744073709551615');
        // 只替换子报告文本，避免 JS 重编码摘要时丢失负零。 / Replace only child text so JS does not erase signed zero in the summary.
        const precise = report.toJson().replace(/"masterReportJson":"(?:\\.|[^"\\])*"/, () => `"masterReportJson":${JSON.stringify(preciseChild)}`);
        const restored = FixedRecourseReport.fromJson(precise, artifact);
        assert.match(restored.masterReportJson(), /18446744073709551615/);
        assert.match(restored.masterReportJson(), /"nodes":18446744073709551615/);
        assert.match(restored.masterReportJson(), /"randomSeed":18446744073709551615/);
        assert.deepEqual(restored.summary(), summary);
        await client.release(job.id); report.dispose();
        assert.throws(() => report.summary(), { code: "Disposed" });
        assert.deepEqual(restored.summary(), summary); restored.dispose();
    }
    const model = new MetaModel(`benders-invalid-${backend}`), x = model.addVariable("x", { type: "binary" });
    model.setLinearObjective([[x, 1]], "minimize"); const artifact = model.toLinearTriadModel(); model.dispose();
    for (const [index, code] of [[0, "MODELING"], [99, "InvalidInput"]]) {
        let failure;
        try { await new FixedRecourseAlgorithm(client, { backend, stages: [{ variableIndex: index, stage: "continuousRecourse" }] }).solveLinear(artifact, { pollIntervalMs: 1 }); }
        catch (error) { failure = error; }
        assert.equal(failure?.code, code); assert.ok(failure.jobId); await client.release(failure.jobId);
    }
    const unsupported = new MetaModel("benders-no-box-bound"), free = unsupported.addVariable("free");
    unsupported.setLinearObjective([[free, 1]], "minimize");
    const unsupportedArtifact = unsupported.toLinearTriadModel(); unsupported.dispose();
    let unsupportedError;
    try { await new FixedRecourseAlgorithm(client, { backend, stages: [{ variableIndex: 0, stage: "continuousRecourse" }] }).solveLinear(unsupportedArtifact, { pollIntervalMs: 1 }); }
    catch (error) { unsupportedError = error; }
    assert.equal(unsupportedError?.code, "UNSUPPORTED"); assert.ok(unsupportedError.jobId); await client.release(unsupportedError.jobId);
    const controller = new AbortController();
    const cancelling = { capabilities: () => client.capabilities(),
        async submit(request) { const view = await client.submit(request); controller.abort(); return view; },
        get: id => client.get(id), cancel: id => client.cancel(id), release: id => client.release(id) };
    const job = await new FixedRecourseAlgorithm(cancelling, { backend }).solveLinear(artifact, { signal: controller.signal, pollIntervalMs: 1 });
    const report = FixedRecourseReport.fromJson(job.reportJson, artifact);
    assert.ok(["converged", "cancelled"].includes(report.summary().stop));
    await client.release(job.id); report.dispose();
}

test("packaged Node SCIP executes fixed-recourse Benders with real optimality and feasibility cuts", async () => {
    await solveFixedRecourseCases(await NodeClient.create(), "scip");
});
test("packaged Node Gurobi executes fixed-recourse Benders with real optimality and feasibility cuts", { skip: process.env.OSPF_E2E_GUROBI !== "1" }, async () => {
    await solveFixedRecourseCases(await NodeClient.create(), "gurobi");
});
test("packaged HTTP SCIP executes fixed-recourse Benders with real optimality and feasibility cuts", { skip: !process.env.OSPF_E2E_URL }, async () => {
    await solveFixedRecourseCases(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), "scip");
});
test("packaged HTTP Gurobi executes fixed-recourse Benders with real optimality and feasibility cuts", { skip: !process.env.OSPF_E2E_URL || process.env.OSPF_E2E_GUROBI !== "1" }, async () => {
    await solveFixedRecourseCases(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), "gurobi");
});


async function solveColumnGenerationCases(client, backend) {
    await initialize();
    for (const kind of ["minimize", "maximize", "global", "infeasible", "limited", "capacity"]) {
        const model = new MetaModel(`column-generation-${backend}-${kind}`);
        const x = model.addVariable("x", { type: "binary" }), y = model.addVariable("y", kind === "global" ? { lowerBound: 0, upperBound: 1 } : { type: "binary" });
        model.addLinearConstraint({ name: "coupling", terms: [[x, 1], [y, 1]], relation: "ge", rhs: kind === "infeasible" ? 3 : 1 });
        model.setLinearObjective([[x, 1], [y, 2]], kind === "maximize" ? "maximize" : "minimize");
        const artifact = model.toLinearTriadModel(); model.dispose();
        const events = [], options = { backend, blocks: kind === "global" ? [{ id: "a", variableIndices: [0] }] : [{ id: "a", variableIndices: [0] }, { id: "b", variableIndices: [1] }],
            ...(kind === "limited" ? { iterationLimit: 1 } : {}), ...(kind === "capacity" ? { columnLimit: 1 } : {}) };
        const job = await new ColumnGenerationAlgorithm(client, options).solveLinear(artifact, { pollIntervalMs: 5, timeLimitMs: 15000, onProgress: json => events.push(json) });
        const report = ColumnGenerationReport.fromJson(job.reportJson, artifact), summary = report.summary();
        assert.ok(events.length > 0); assert.ok(summary.iterations > 0); assert.ok(summary.pricingCalls > 0);
        if (kind === "infeasible") { assert.equal(summary.stop, "phaseOneStall"); assert.equal(summary.phaseOneComplete, false); assert.equal(summary.objectiveValue, null); assert.equal(report.finalReportJson(), undefined); }
        else if (kind === "limited" || kind === "capacity") { assert.equal(summary.stop, kind === "limited" ? "iterationLimit" : "columnLimit"); assert.equal(summary.pricingConverged, false); assert.equal(summary.objectiveValue, null); }
        else {
            assert.equal(summary.stop, "completed"); assert.equal(summary.phaseOneComplete, true); assert.equal(summary.pricingConverged, true);
            assert.equal(summary.objectiveValue, kind === "maximize" ? 3 : 1); assert.equal(summary.values.length, 2);
            assert.ok(summary.columnCount >= options.blocks.length); assert.ok(report.finalReportJson());
            assert.notEqual(JSON.parse(report.finalReportJson()).fingerprints.model.value, artifact.fingerprint);
            const direct = await new (backend === "scip" ? SCIPSolver : GurobiSolver)(client).solveLinear(artifact, { pollIntervalMs: 5 });
            assert.equal(summarizeReport(direct.reportJson).objectiveValue, summary.objectiveValue); await client.release(direct.id);
            const damaged = JSON.parse(report.toJson()); damaged.summary.values = [0, 0];
            assert.throws(() => ColumnGenerationReport.fromJson(JSON.stringify(damaged), artifact), { code: "InvalidInput" });
        }
        assert.equal("bestBound" in summary, false);
        assert.throws(() => ColumnGenerationReport.fromJson(job.reportJson, { ...artifact, fingerprint: "foreign" }), { code: "FingerprintMismatch" });
        const preciseChild = report.masterReportJson().replace(/"nodes":(?:null|\d+)/g, '\"nodes\":18446744073709551615');
        const precise = report.toJson().replace(/"masterReportJson":"(?:\\.|[^"\\])*"/, () => `"masterReportJson":${JSON.stringify(preciseChild)}`);
        const restored = ColumnGenerationReport.fromJson(precise, artifact);
        assert.match(restored.masterReportJson(), /"nodes":18446744073709551615/); assert.deepEqual(restored.summary(), summary);
        await client.release(job.id); report.dispose(); assert.throws(() => report.summary(), { code: "Disposed" }); restored.dispose();
    }
    const unbounded = new MetaModel("unbounded-local-pricing"), free = unbounded.addVariable("x", { lowerBound: 0 });
    unbounded.setLinearObjective([[free, -1]], "minimize"); const unboundedArtifact = unbounded.toLinearTriadModel(); unbounded.dispose();
    const unboundedJob = await new ColumnGenerationAlgorithm(client, { backend, blocks: [{ id: "a", variableIndices: [0] }] }).solveLinear(unboundedArtifact, { pollIntervalMs: 1 });
    const unboundedReport = ColumnGenerationReport.fromJson(unboundedJob.reportJson, unboundedArtifact);
    assert.equal(unboundedReport.summary().stop, "pricingTermination"); assert.equal(unboundedReport.summary().pricingConverged, false);
    assert.equal(unboundedReport.finalReportJson(), undefined);
    assert.ok(["UNBOUNDED", "INFEASIBLE_OR_UNBOUNDED"].includes(JSON.parse(unboundedReport.pricingReportJson()).problemStatus));
    await client.release(unboundedJob.id); unboundedReport.dispose();
    const model = new MetaModel("column-generation-invalid-index"), x = model.addVariable("x", { type: "binary" });
    model.setLinearObjective([[x, 1]], "minimize"); const artifact = model.toLinearTriadModel(); model.dispose();
    let failure;
    try { await new ColumnGenerationAlgorithm(client, { backend, blocks: [{ id: "a", variableIndices: [99] }] }).solveLinear(artifact, { pollIntervalMs: 1 }); } catch (error) { failure = error; }
    assert.equal(failure?.code, "InvalidInput"); assert.ok(failure.jobId); await client.release(failure.jobId);
    const controller = new AbortController();
    const job = await new ColumnGenerationAlgorithm(client, { backend, blocks: [{ id: "a", variableIndices: [0] }] }).solveLinear(artifact, { signal: controller.signal, pollIntervalMs: 1, onProgress() { controller.abort(); } });
    const report = ColumnGenerationReport.fromJson(job.reportJson, artifact);
    assert.ok(["cancelled", "completed"].includes(report.summary().stop)); await client.release(job.id); report.dispose();
}

for (const backend of ["scip", "gurobi"]) {
    test(`packaged Node ${backend} executes source-projected Phase I, pricing and restricted integer final`, { skip: backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1" }, async () => solveColumnGenerationCases(await NodeClient.create(), backend));
    test(`packaged HTTP ${backend} executes source-projected Phase I, pricing and restricted integer final`, { skip: !process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN || (backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1") }, async () => solveColumnGenerationCases(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), backend));
}

async function solvePacking3d(client, backend) {
    await initialize();
    const q = (value, unit = "m") => ({ value, unit });
    const context = new PackingContext3d({
        items: [{ id: "item", name: "Item", width: q(1), height: q(1), depth: q(1), weight: q(500, "g"), amount: 2n, orientations: ["upright"] }],
        bins: [{ id: "one", typeCode: "type", width: q(1), height: q(1), depth: q(1), capacity: q(1, "kg"), isMain: true },
            { id: "two", typeCode: "type", width: q(1), height: q(1), depth: q(1), capacity: q(1, "kg"), isMain: true }],
        initialLayers: [{ id: "layer", binId: "one", depth: q(1), placements: [{ itemId: "item", position: { x: q(0), y: q(0), z: q(0) }, orientation: "upright" }] }],
    });
    const source = context.toArtifact(); context.dispose();
    for (const configuration of [{ backend }, { backend, generators: ["block"] }, { backend, reportLimit: 1 }, { backend, maxPlacements: 1 }]) {
        let progress = 0;
        const job = await new Bpp3dOneRoundExecution(client, configuration).solve(source, { pollIntervalMs: 1, timeLimitMs: 30_000, onProgress() { progress++; } });
        try {
            const report = ExecutionReport.fromJson(job.reportJson, source), summary = report.summary(), stages = report.stages(), packing = report.packing();
            try {
                assert.equal(job.status, "completed"); assert.equal(summary.candidateComplete, false); assert.ok(progress > 0);
                assert.ok(report.stagePoolJson(0).length > 0); assert.equal(report.stagePoolJson(summary.stageCount), undefined);
                if (configuration.reportLimit) { assert.equal(summary.completed, false); assert.equal(summary.stageCount, 2);
                    assert.equal(report.stageReportJson(1), undefined); assert.equal(packing, undefined); }
                else if (configuration.maxPlacements) { assert.equal(summary.completed, false); assert.equal(stages[2].hasIncumbent, true);
                    assert.equal(packing, undefined); }
                else { assert.equal(summary.completed, true); assert.equal(summary.stageCount, 3); assert.equal(stages[0].restrictedOptimal, true);
                    assert.ok(summary.generatedCount >= 1); assert.ok(stages[1].columnCount > stages[0].columnCount);
                    assert.equal(packing.sourceFingerprint(), source.fingerprint); assert.equal(packing.bins().length, 2);
                    assert.equal(report.stagePoolJson(1), report.stagePoolJson(2)); }
                const retained = await client.cancel(job.id); assert.equal(retained.reportJson, job.reportJson);
            } finally { report.dispose(); packing?.dispose(); }
        } finally { await client.release(job.id); }
        await assert.rejects(client.get(job.id), { code: "NotFound" });
    }
}

for (const backend of ["scip", "gurobi"]) {
    test(`packaged Node ${backend} executes real BPP3D one-round reports with strict packing`, { skip: backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1" }, async () => {
        await solvePacking3d(await NodeClient.create(), backend);
    });
    test(`packaged HTTP ${backend} executes real BPP3D one-round reports with strict packing`, { skip: !process.env.OSPF_E2E_URL || (backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1") }, async () => {
        await solvePacking3d(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), backend);
    });
}

async function solveGanttActivity(client, backend) {
    await initialize();
    const problem = () => ({ horizon: { start: "2026-01-01T00:00:00Z", end: "2026-01-02T00:00:00Z" }, costUnit: "kg",
        resources: [{ id: "machine", capacity: { value: 1, unit: "kg" }, unavailableTimes: [], capacities: [] }],
        activities: [
            { id: "job", modes: [{ id: "run", durationSeconds: 3600, starts: ["2026-01-01T01:00:00Z", "2026-01-01T02:00:00Z"],
                resources: [{ resource: "machine", quantity: { value: 1, unit: "kg" }, fromSeconds: 0 }], cost: { value: 2, unit: "kg" } }] },
            { id: "job-2", modes: [{ id: "run", durationSeconds: 3600, starts: ["2026-01-01T01:00:00Z", "2026-01-01T02:00:00Z"],
                resources: [{ resource: "machine", quantity: { value: 1, unit: "kg" }, fromSeconds: 0 }], cost: { value: 2, unit: "kg" } }] },
        ],
        dependencies: [] });
    const context = new ActivityContext(problem()), artifact = context.toArtifact(), summary = context.sourceSummary();
    assert.equal(summary.choiceCount, 4); assert.equal(summary.activityCount, 2);
    assert.equal(context.toJson(), artifact.modelJson);
    context.dispose();
    const replay = new ActivityContext(problem()).replay({ selections: [{ task: "job", mode: "run", start: "2026-01-01T01:00:00Z" },
        { task: "job-2", mode: "run", start: "2026-01-01T02:00:00Z" }] });
    assert.equal(replay.schedule.placements.length, 2); assert.deepEqual(replay.schedule.cost, { value: 4, unit: "kg" });
    let progress = 0;
    const job = await new GanttActivitySolver(client, { backend }).solve(artifact, { pollIntervalMs: 1, timeLimitMs: 30_000, onProgress() { progress++; } });
    try {
        const report = GanttExecutionReport.fromJson(job.reportJson, artifact), result = report.summary(), schedule = report.schedule();
        assert.equal(job.status, "completed"); assert.ok(progress > 0);
        assert.equal(result.solverModelOnly, false); assert.equal(result.hasSchedule, true); assert.equal(result.failure ?? null, null);
        assert.ok(result.problemStatus.length > 0 && result.terminationReason.length > 0);
        assert.equal(schedule.placements.length, 2); assert.deepEqual(schedule.cost, { value: 4, unit: "kg" }); assert.equal(schedule.candidateCount, 4);
        assert.equal(result.objectiveValue, schedule.cost.value);
        const retained = await client.cancel(job.id); assert.equal(retained.reportJson, job.reportJson);
        report.dispose();
    } finally { await client.release(job.id); }
    await assert.rejects(client.get(job.id), { code: "NotFound" });
}

for (const backend of ["scip", "gurobi"]) {
    test(`packaged Node ${backend} executes real Gantt activity MILPs with revalidated placements`, { skip: backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1" }, async () => {
        await solveGanttActivity(await NodeClient.create(), backend);
    });
    test(`packaged HTTP ${backend} executes real Gantt activity MILPs with revalidated placements`, { skip: !process.env.OSPF_E2E_URL || (backend === "gurobi" && process.env.OSPF_E2E_GUROBI !== "1") }, async () => {
        await solveGanttActivity(new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN }), backend);
    });
}
