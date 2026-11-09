import { CuttingContext, Csp2dReport, Csp2dColumnGeneration } from "/dist/csp2d.js";
import { HttpClient } from "/dist/browser.js";

export async function solveCutting2dHttp({ url, token }) {
    const q = value => ({ value, unit: "m" }), size = (width, height) => ({ width: q(width), height: q(height) });
    const context = new CuttingContext({ products: [{ id: "a", name: "A", geometry: size(1, 1), allowRotate: false }],
        materials: [{ id: "s", name: "S", shape: { kind: "sheet", geometry: size(4, 2) }, availableBatches: 10n, process: "freeform", maxSegmentHeight: null,
            products: [{ productId: "a", count: 4n }] }], demands: [{ kind: "count", productId: "a", count: 3n, upperBound: 4n }],
        initialColumns: [], kerf: q(0), objective: { areaWeight: 1, wasteWeight: 0, heightWeight: 0, usageWeight: 0 } });
    const source = context.toArtifact(); context.dispose();
    const client = new HttpClient({ baseUrl: url, token }), fixtures = [];
    for (const configuration of [{ backend: "scip" }, { backend: "scip", reportLimit: 1 }, { backend: "scip", finalIntegerEnabled: false }]) {
        let progress = 0;
        const job = await new Csp2dColumnGeneration(client, configuration).solve(source, { timeLimitMs: 10_000, pollIntervalMs: 5, onProgress() { progress++; } });
        try { fixtures.push({ source, reportJson: job.reportJson, progress }); }
        finally { await client.release(job.id); }
    }
    return fixtures;
}

export function checkCutting2dReport(fixture) {
    const context = CuttingContext.fromArtifact(fixture.source), report = context.readExecutionReport(fixture.reportJson);
    const direct = Csp2dReport.fromJson(fixture.reportJson, fixture.source); context.dispose();
    const summary = report.summary(), stages = report.stages(), columns = report.columns(), iterations = report.iterations();
    const raw = stages.map((_, index) => report.stageReportJson(index));
    const production = report.production(), productionJson = production?.toJson() ?? null;
    const sameText = report.toJson() === fixture.reportJson && direct.toJson() === fixture.reportJson;
    const pastEnd = report.stageJson(stages.length) === undefined && report.stageReportJson(stages.length) === undefined;
    report.dispose(); direct.dispose();
    const independentProductionJson = production?.toJson() ?? null;
    const counts = production ? Array.from(production.producedCounts(), ([id, value]) => [id, value.toString()]) : null;
    const batches = production ? Array.from(production.materialBatches(), ([id, value]) => [id, value.toString()]) : null;
    production?.dispose();
    return { summary, stages, columns, iterations, raw, sameText, pastEnd, productionJson, independentProductionJson, counts, batches };
}

export function checkCutting2d() {
    const q = value => ({ value, unit: "m" }), size = (width, height) => ({ width: q(width), height: q(height) });
    const region = (x, width) => ({ origin: { x: q(x), y: q(0) }, size: size(width, 1) });
    const column = { id: "seed", materialId: "s", region: region(0, 2), placements: [0, 1].map(x => ({ shape: { kind: "rectangle", ...size(1, 1) },
        position: { x: q(x), y: q(0) }, rotated: false, itemId: "a" })), cutTree: { nodes: [
        { kind: "leaf", region: region(0, 1), productId: "a" }, { kind: "leaf", region: region(1, 1), productId: "a" },
        { kind: "cut", region: region(0, 2), orientation: "vertical", position: q(1), stage: 1, lower: 0, upper: 1 }] } };
    const context = new CuttingContext({ products: [{ id: "a", name: "A", geometry: size(1, 1), allowRotate: false }],
        materials: [{ id: "s", name: "S", shape: { kind: "sheet", geometry: size(4, 2) }, availableBatches: 10n, process: "guillotineTwoStage", maxSegmentHeight: null,
            products: [{ productId: "a", count: 4n }] }], demands: [{ kind: "count", productId: "a", count: 9_007_199_254_740_991n, upperBound: null }],
        initialColumns: [column], kerf: q(0), objective: { areaWeight: 1, wasteWeight: 0, heightWeight: 0, usageWeight: 0 } });
    const artifact = context.toArtifact(), copy = CuttingContext.fromArtifact(artifact); context.dispose();
    copy.validateColumns([column]); const roundtrip = copy.toJson() === artifact.modelJson;
    column.cutTree.nodes[0].productId = null;
    let invalidLeaf; try { copy.validateColumns([column]); } catch (error) { invalidLeaf = error.code; }
    copy.dispose(); return { roundtrip, exact: artifact.modelJson.includes('"count":"9007199254740991"'), invalidLeaf };
}
