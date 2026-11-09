import { PackingContext, Bpp2dColumnGeneration } from "/dist/bpp2d.js";
import { HttpClient } from "/dist/browser.js";

export function checkPacking2d(fixture) {
    if (!fixture) {
        const context = new PackingContext({ items: [{ id: "a", name: "A", shape: { kind: "rectangle", width: { value: 100, unit: "cm" }, height: { value: 1, unit: "m" } }, allowRotate: false, generationCount: 3n }],
            sheets: [{ id: "s", geometry: { width: { value: 2, unit: "m" }, height: { value: 1, unit: "m" } }, isMain: true }],
            demands: [{ kind: "count", itemId: "a", count: 3n, upperBound: null }], initialLayers: [], kerf: { value: 0, unit: "m" },
            objective: { sheetAreaWeight: 1, sheetAmountWeight: 0.000001, sheetTypeCostWeight: 0, sheetTypeCosts: {}, rmpAreaCoefficient: 1 } });
        const artifact = context.toArtifact(), copy = PackingContext.fromArtifact(artifact);
        const packed = context.packLayers([{ sheetId: "s", envelope: { width: { value: 1, unit: "m" }, height: { value: 1, unit: "m" } },
            placements: [{ shape: { kind: "rectangle", width: { value: 1, unit: "m" }, height: { value: 1, unit: "m" } },
                position: { x: { value: 0, unit: "m" }, y: { value: 0, unit: "m" } }, rotated: false, itemId: "a" }] }]);
        context.validateLayers([]); context.dispose();
        const roundtrip = copy.toArtifact().modelJson === artifact.modelJson; copy.dispose();
        const result = { roundtrip, packedItems: packed.itemCount().toString(), remnant: packed.remnantArea(), loadingOrder: packed.patterns()[0].render.placements[0].loadingOrder };
        packed.dispose(); return result;
    }
    const context = PackingContext.fromArtifact(fixture.source), report = context.readExecutionReport(fixture.reportJson);
    const summary = report.summary(), production = report.production(), copy = report.production(), packing = report.packing();
    const output = { summary, sameText: report.toJson() === fixture.reportJson, stages: report.stages(), columns: report.columns(), iterations: report.iterations(),
        raw: Array.from({ length: summary.stageCount }, (_, index) => report.stageReportJson(index)),
        pastEnd: report.stageJson(0xffff_ffff) === undefined, productionJson: production?.toJson() ?? null };
    context.dispose(); report.dispose(); production?.dispose();
    output.independentProductionJson = copy?.toJson() ?? null; copy?.dispose();
    output.packingJson = packing?.toJson() ?? null; packing?.dispose();
    return output;
}

export async function solvePacking2dHttp({ url, token }) {
    const context = new PackingContext({ items: [{ id: "a", name: "A", shape: { kind: "rectangle", width: { value: 1, unit: "m" }, height: { value: 1, unit: "m" } }, allowRotate: false, generationCount: 3n }],
        sheets: [{ id: "s", geometry: { width: { value: 2, unit: "m" }, height: { value: 1, unit: "m" } }, isMain: true }],
        demands: [{ kind: "count", itemId: "a", count: 3n, upperBound: 4n }], initialLayers: [], kerf: { value: 0, unit: "m" },
        objective: { sheetAreaWeight: 1, sheetAmountWeight: 0.000001, sheetTypeCostWeight: 0, sheetTypeCosts: {}, rmpAreaCoefficient: 1 } });
    const source = context.toArtifact(); context.dispose();
    const client = new HttpClient({ baseUrl: url, token }), fixtures = [];
    for (const configuration of [{ backend: "scip" }, { backend: "scip", reportLimit: 1 }, { backend: "scip", finalMilpEnabled: false }]) {
        let progress = 0;
        const job = await new Bpp2dColumnGeneration(client, configuration).solve(source, { timeLimitMs: 10_000, pollIntervalMs: 5, onProgress() { progress++; } });
        try { fixtures.push({ source, reportJson: job.reportJson, progress }); }
        finally { await client.release(job.id); }
    }
    return fixtures;
}
