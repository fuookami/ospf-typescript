import { DiscreteLoadingApplicationReport, DiscreteLoadingApplicationService, DiscreteLoadingBendersApplicationService, DiscreteLoadingBendersReport, DiscreteLoadingContext, DiscreteLoadingReport, PartitionLoadingContext, PartitionLoadingBatch, PartitionColumnGenerationReport } from "/dist/bpp.js";
import { HttpClient, SCIPSolver, summarizeReport } from "/dist/browser.js";

function problem() {
    return { items: [{ id: "a", weight: { value: 1000, unit: "g" }, required: true, fixedPositionId: null }],
        positions: [{ id: "p", maxCount: 18_446_744_073_709_551_615n, maxWeight: { value: 1, unit: "kg" }, fixedOccupied: false, enabled: true },
            { id: "q", maxCount: 1n, maxWeight: { value: 0, unit: "kg" }, fixedOccupied: false, enabled: true }],
        allowedAssignments: [{ itemId: "a", positionId: "p" }], conflicts: [], layoutGroups: [], weightUnit: "kg" };
}

export function checkLoading(fixture) {
    if (fixture?.partitionReportJson) {
        const report = PartitionColumnGenerationReport.fromJson(fixture.partitionReportJson, fixture.source), plan = report.solution();
        const result = { sameText: report.toJson() === fixture.partitionReportJson, calls: report.calls(), summary: report.summary(), executionSummary: report.executionSummary(),
            sourceFingerprint: report.sourceFingerprint(), resultJson: plan?.toJson() ?? null, solverReportJson: report.solverReportJson(),
            applicationReportJson: report.applicationReportJson(), accelerationApplicationReportJson: report.accelerationApplicationReportJson(),
            certificationReportJson: report.certificationReportJson() ?? null, certificationError: report.certificationError() ?? null,
            sourceFinishingPresent: report.sourceFinishingPresent(), sourceFinishingInvoked: report.sourceFinishingInvoked(),
            refinementReportJson: report.refinementReportJson() ?? null, finalReportJson: report.finalReportJson() ?? null, accelerationError: report.accelerationError() ?? null };
        report.dispose(); result.independentResultJson = plan?.toJson() ?? null; plan?.dispose(); return result;
    }
    if (fixture?.stages) return checkPartition(fixture);
    if (fixture?.bendersReportJson) {
        const context = DiscreteLoadingContext.fromArtifact(fixture.source), report = context.readBendersReport(fixture.bendersReportJson);
        const direct = DiscreteLoadingBendersReport.fromJson(fixture.bendersReportJson, fixture.source), plan = report.solution();
        const output = { sourceFingerprint: report.sourceFingerprint(), sameText: report.toJson() === fixture.bendersReportJson && direct.toJson() === fixture.bendersReportJson,
            sameModel: JSON.stringify(context.toApplicationModel()) === JSON.stringify(fixture.model), summary: report.summary(), decompositionSummary: report.decompositionSummary(),
            fallbackUsed: report.fallbackUsed(), sourceFinishingPresent: report.sourceFinishingPresent(), sourceFinishingInvoked: report.sourceFinishingInvoked(),
            accelerationApplicationReportJson: report.accelerationApplicationReportJson(), certificationReportJson: report.certificationReportJson() ?? null, resultJson: plan?.toJson() ?? null };
        context.dispose(); report.dispose(); direct.dispose(); output.independentResultJson = plan?.toJson() ?? null; plan?.dispose(); return output;
    }
    if (fixture?.applicationReportJson) {
        const context = DiscreteLoadingContext.fromArtifact(fixture.source), report = context.readApplicationReport(fixture.applicationReportJson);
        const direct = DiscreteLoadingApplicationReport.fromJson(fixture.applicationReportJson, fixture.source), plan = report.solution();
        const output = { sourceFingerprint: report.sourceFingerprint(), sameText: report.toJson() === fixture.applicationReportJson && direct.toJson() === fixture.applicationReportJson,
            sameModel: JSON.stringify(context.toApplicationModel()) === JSON.stringify(fixture.model), summary: report.summary(),
            registrationPresent: report.registrationPresent(), resultJson: plan?.toJson() ?? null };
        context.dispose(); report.dispose(); direct.dispose(); output.independentResultJson = plan?.toJson() ?? null; plan?.dispose(); return output;
    }
    if (!fixture) {
        const context = new DiscreteLoadingContext(problem()), source = context.toArtifact(), model = context.toLinearTriadModel();
        const restored = DiscreteLoadingContext.fromArtifact(source), plan = { assignments: { a: "p" }, occupiedPositions: ["p", "q"], selectedLayouts: {} };
        const values = restored.solutionValues(plan), result = context.extractSolution(values);
        const stableModel = JSON.stringify(model) === JSON.stringify(restored.toLinearTriadModel());
        context.dispose(); restored.dispose();
        const resourceProblem = problem(); resourceProblem.positions[0].maxWeight.value = 2;
        const resourceContext = new DiscreteLoadingContext(resourceProblem, undefined, [{ id: "ballast", positionId: "p", minimumWeight: { value: 0, unit: "kg" },
            maximumWeight: { value: 1, unit: "kg" }, minimumPerLoadedWeight: 0.5, costPerWeight: 2 }]);
        let missingResourceCode; try { resourceContext.solutionValues(plan); } catch (error) { missingResourceCode = error.code; }
        const resourceResult = resourceContext.verifySolution(plan, new Map([["ballast", { value: 500, unit: "g" }]])); resourceContext.dispose();
        const output = { stableModel, fullU64: source.modelJson.includes("18446744073709551615"), values: [...values],
            loadedCount: result.loadedCount().toString(), loadedWeight: result.loadedWeight(), solution: result.solution(), missingResourceCode, resources: resourceResult.resources() };
        result.dispose(); resourceResult.dispose(); return output;
    }
    const context = DiscreteLoadingContext.fromArtifact(fixture.source), report = context.readReport(fixture.reportJson);
    const direct = DiscreteLoadingReport.fromJson(fixture.reportJson, fixture.source), plan = report.solution();
    const output = { sourceFingerprint: report.sourceFingerprint(), sameText: report.toJson() === fixture.reportJson && direct.toJson() === fixture.reportJson,
        sameModel: JSON.stringify(context.toLinearTriadModel()) === JSON.stringify(fixture.model), summary: report.summary(), resultJson: plan?.toJson() ?? null };
    context.dispose(); report.dispose(); direct.dispose(); output.independentResultJson = plan?.toJson() ?? null; plan?.dispose(); return output;
}

function checkPartition(fixture) {
    const context = new PartitionLoadingContext(fixture.source, fixture.options), matches = [];
    context.addColumns(fixture.seed.map(column => ({ ...column, decisions: new Map(Object.entries(column.decisions)) })));
    const master = context.master(), lp = fixture.stages[0];
    matches.push(JSON.stringify(master.toModel()) === JSON.stringify(lp.model)); context.acceptLpReport(master, lp.reportJson);
    const batch = new PartitionLoadingBatch(); let sameText = true;
    for (const stage of fixture.stages.slice(1, 3)) {
        const pricing = context.pricing(master, stage.kind), text = stage.reportJson.replace(/"nodes":(?:null|\d+)/g, '"nodes":18446744073709551615');
        matches.push(JSON.stringify(pricing.toModel()) === JSON.stringify(stage.model));
        const result = pricing.readReport(text); sameText &&= result.reportJson === text;
        batch.add(pricing, result.decisions ? [result.decisions] : []); pricing.dispose();
    }
    context.addPricedBatch(master, batch); batch.dispose(); master.dispose();
    const refinement = context.master({ integer: true, refineResources: true }), refined = fixture.stages[3];
    matches.push(JSON.stringify(refinement.toModel()) === JSON.stringify(refined.model));
    context.materializeCompletedResources(refinement, new Float64Array(summarizeReport(refined.reportJson).values)); refinement.dispose();
    const finalMaster = context.master({ integer: true }), final = fixture.stages[4];
    matches.push(JSON.stringify(finalMaster.toModel()) === JSON.stringify(final.model));
    const plan = context.extractSolution(finalMaster, new Float64Array(summarizeReport(final.reportJson).values)), resultJson = plan.toJson();
    context.dispose(); finalMaster.dispose();
    let disposedCode; try { context.columns(); } catch (error) { disposedCode = error.code; }
    const independentResultJson = plan.toJson(); plan.dispose();
    return { sameText, sameModel: matches.every(Boolean), resultJson, independentResultJson, disposedCode };
}

export async function solveLoadingHttp({ url, token }) {
    const fixtures = [], client = new HttpClient({ baseUrl: url, token });
    for (const feasible of [true, false]) {
        const input = problem(); if (!feasible) input.allowedAssignments = [];
        const context = new DiscreteLoadingContext(input), source = context.toArtifact(), model = context.toLinearTriadModel(); context.dispose();
        let progress = 0;
        const job = await new SCIPSolver(client).solveLinear(model, { pollIntervalMs: 5, timeLimitMs: 10_000, onProgress() { progress++; } });
        try { fixtures.push({ source, model, reportJson: job.reportJson, progress }); }
        finally { await client.release(job.id); }
    }
    return fixtures;
}

export async function solveLoadingApplicationHttp({ url, token }) {
    const client = new HttpClient({ baseUrl: url, token }), input = problem(); input.items[0].required = false;
    const context = new DiscreteLoadingContext(input, { itemCosts: { a: -5 }, positionCosts: { p: 1, q: 1 }, layoutCosts: [] });
    const source = context.toArtifact(), model = context.toApplicationModel(); context.dispose();
    const job = await new DiscreteLoadingApplicationService(client, { backend: "scip" }).solve(source, { pollIntervalMs: 5, timeLimitMs: 10_000 });
    try { return { source, model, applicationReportJson: job.reportJson }; }
    finally { await client.release(job.id); }
}

export async function solveLoadingBendersHttp({ url, token }) {
    const client = new HttpClient({ baseUrl: url, token }), input = problem(); input.items[0].required = false; input.positions[0].maxWeight.value = 2;
    const context = new DiscreteLoadingContext(input, { itemCosts: { a: -5 }, positionCosts: { p: 1 }, layoutCosts: [] },
        [{ id: "ballast", positionId: "p", minimumWeight: { value: 0, unit: "kg" }, maximumWeight: { value: 1000, unit: "g" }, minimumPerLoadedWeight: 0.5, costPerWeight: 2 }]);
    const source = context.toArtifact(), model = context.toApplicationModel(); context.dispose();
    const job = await new DiscreteLoadingBendersApplicationService(client, { backend: "scip", recourseResources: ["ballast"] }).solve(source, { pollIntervalMs: 5, timeLimitMs: 10_000 });
    try { return { source, model, bendersReportJson: job.reportJson }; }
    finally { await client.release(job.id); }
}
