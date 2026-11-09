import { HttpClient } from "/dist/browser.js";
import { CuttingContext, Csp1dMilp, Csp1dColumnGeneration } from "/dist/csp1d.js";

export function checkCutting() {
    const context = new CuttingContext({
        products: [{ id: "p", name: "product", width: [{ value: 30, unit: "mm" }] }],
        materials: [{ id: "m", name: "material", widthRange: { lowerBound: { value: 0, unit: "m" }, upperBound: { value: 10, unit: "cm" } }, machineId: null, availableBatches: null }],
        machines: [], demands: [{ productId: "p", mode: "sheet", count: 5n }], lengthUnit: "cm",
    });
    const artifact = context.toArtifact(), restored = CuttingContext.fromArtifact(artifact);
    const candidates = context.generatePatterns(), limited = context.generatePatterns({ maxPlans: 1 });
    const plan = { id: "plan", materialId: "m", slices: [{ productId: "p", width: { value: 0.03, unit: "m" }, amount: 3n }] };
    context.validatePlan(plan);
    const production = context.verifyUsages([{ plan, count: 9_007_199_254_740_991n }]);
    const roundtrip = restored.toJson() === context.toJson();
    context.dispose(); restored.dispose();
    const output = { roundtrip, candidates: candidates.plans().length, complete: candidates.candidateComplete(),
        truncated: limited.truncated(), produced: production.produced().get("p").toString(), unit: production.usedWidth().unit };
    for (const value of [candidates, limited, production]) value.dispose();
    return output;
}

export function checkCuttingReport(fixture) {
    const context = CuttingContext.fromArtifact(fixture.source), report = context.readProductionReport(fixture.reportJson);
    const production = report.production(), duplicate = report.production();
    const summary = report.summary(), sameText = report.toJson() === fixture.reportJson;
    const raw = report.solverReportJson();
    context.dispose(); report.dispose(); production?.dispose();
    const output = { summary, sameText, raw, productionJson: duplicate?.toJson() ?? null };
    duplicate?.dispose();
    return output;
}

export function checkCuttingExecution(fixture) {
    const context = CuttingContext.fromArtifact(fixture.source), report = context.readExecutionReport(fixture.reportJson);
    const summary = report.summary(), integer = report.integerReport(), production = report.production(), duplicate = integer?.production();
    const output = { summary, sameText: report.toJson() === fixture.reportJson, trace: report.traceJson(),
        stages: Array.from({ length: summary.stageCount }, (_, index) => ({ model: report.stageJson(index), raw: report.stageReportJson(index) })),
        pastEnd: report.stageJson(summary.stageCount) === undefined, productionJson: production?.toJson() ?? null };
    context.dispose(); report.dispose(); integer?.dispose(); production?.dispose();
    output.independentProductionJson = duplicate?.toJson() ?? null; duplicate?.dispose();
    return output;
}

export async function solveCuttingHttp({ url, token }) {
    const context = new CuttingContext({ products: [{ id: "p", name: "product", width: [{ value: 30, unit: "mm" }] }],
        materials: [{ id: "m", name: "material", widthRange: { lowerBound: { value: 0, unit: "cm" }, upperBound: { value: 10, unit: "cm" } }, machineId: null, availableBatches: 3n }],
        machines: [], demands: [{ productId: "p", mode: "roll", count: 5n }], lengthUnit: "cm" });
    const source = context.toArtifact(); context.dispose();
    const client = new HttpClient({ baseUrl: url, token }), fixtures = [];
    for (const Solver of [Csp1dMilp, Csp1dColumnGeneration]) {
        let progress = 0;
        const job = await new Solver(client, { backend: "scip", generation: Solver === Csp1dColumnGeneration ? { maxPlans: 1 } : {} })
            .solve(source, { timeLimitMs: 10_000, pollIntervalMs: 5, onProgress() { progress++; } });
        try { fixtures.push({ source, reportJson: job.reportJson, execution: true, progress }); }
        finally { await client.release(job.id); }
    }
    return fixtures;
}
