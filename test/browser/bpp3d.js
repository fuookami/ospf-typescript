import { Bpp3dOneRoundExecution, PackingContext } from "/dist/bpp3d.js";
import { HttpClient } from "/dist/browser.js";

export function checkPacking3d(fixture) {
    if (fixture) {
        const context = PackingContext.fromArtifact(fixture.source), report = context.readExecutionReport(fixture.reportJson);
        const summary = report.summary(), packing = report.packing(), independent = report.packing();
        const output = { summary, stages: report.stages(), sameText: report.toJson() === fixture.reportJson,
            sourceFingerprint: report.source().fingerprint, pools: Array.from({ length: summary.stageCount }, (_, index) => report.stagePoolJson(index)),
            children: Array.from({ length: summary.stageCount }, (_, index) => report.stageReportJson(index) ?? null),
            pastEnd: report.stageJson(0xffff_ffff) === undefined, packingJson: packing?.toJson() ?? null,
            // 半径条目必须与报告正文一致：空时为空对象，非空时每个数值键可解析。
            // Radius entries must agree with the report text: an empty object when absent, and parseable numbers when present.
            radius: report.continuousRadius(),
            radiusKeys: Object.keys(report.continuousRadius()).every(key => typeof key === "string") };
        context.dispose(); report.dispose();
        output.independentPackingJson = independent?.toJson() ?? null;
        independent?.dispose(); packing?.dispose();
        return output;
    }
    const q = (value, unit = "m") => ({ value, unit });
    const source = { items: [{ id: "a", name: "A", width: q(1), height: q(1), depth: q(1), weight: q(500, "g"), amount: 2n, orientations: ["upright"] }],
        bins: [{ id: "bin", typeCode: "box", width: q(2), height: q(1), depth: q(1), capacity: q(1, "kg"), isMain: true }],
        initialLayers: [{ id: "layer", binId: "bin", depth: q(1), placements: [
            { itemId: "a", position: { x: q(0), y: q(0), z: q(0) }, orientation: "upright" },
            { itemId: "a", position: { x: q(1), y: q(0), z: q(0) }, orientation: "upright" },
        ] }] };
    const context = new PackingContext(source), artifact = context.toArtifact(), copy = PackingContext.fromArtifact(artifact);
    context.dispose();
    const packing = copy.packLayers([{ binId: "bin", layerId: "layer" }]);
    const result = { sameText: copy.toJson() === artifact.modelJson, fingerprint: artifact.fingerprint, amount: copy.problem().items[0].amount.toString(),
        packedBin: packing.bins[0].binId, packedCount: packing.bins[0].placements.length };
    try { copy.readExecutionReport("{"); } catch (error) { result.invalidReport = error.code; }
    try { copy.packLayers([]); } catch (error) { result.invalidPlan = error.code; }
    copy.dispose();
    try { copy.problem(); } catch (error) { result.disposed = error.code; }
    try { PackingContext.fromArtifact({ ...artifact, fingerprint: "foreign" }); } catch (error) { result.forged = error.code; }
    // 轴感知圆柱在浏览器 WASM 内保真，越界半径与未知形状被拒绝（不按方形近似）。 / Axis-aware cylinders stay intact in browser WASM, and out-of-range radii or unknown shapes are rejected without square approximations.
    const drum = () => ({ items: [{ id: "drum", name: "Drum", width: q(1), height: q(1), depth: q(1), weight: q(500, "g"), amount: 1n,
            orientations: ["upright"], shape: { kind: "cylinder", axis: "y", radius: q(0.5) } }],
        bins: [{ id: "drumBin", typeCode: "cylinder-bin", width: q(2), height: q(1), depth: q(1), capacity: q(1, "kg"), isMain: true }],
        initialLayers: [{ id: "drumLayer", binId: "drumBin", depth: q(1), placements: [{ itemId: "drum", position: { x: q(0), y: q(0), z: q(0) }, orientation: "upright" }] }] });
    const cylinder = new PackingContext(drum()), cylinderArtifact = cylinder.toArtifact();
    result.cylinderShape = cylinder.problem().items[0].shape;
    result.cylinderFingerprintDiffers = cylinderArtifact.fingerprint !== artifact.fingerprint;
    cylinder.dispose();
    const tooWide = drum(); tooWide.items[0].shape = { kind: "cylinder", axis: "y", radius: q(0.6) };
    try { new PackingContext(tooWide); } catch (error) { result.cylinderRadius = error.code; }
    const unknown = drum(); unknown.items[0].shape = { kind: "prism" };
    try { new PackingContext(unknown); } catch (error) { result.cylinderShapeUnknown = error.code; }
    return result;
}

/** 经显式 HTTP 宿主执行原单轮流程，并在 WASM 内复验报告 / Run the original one-round flow through an explicit HTTP host and revalidate its report in WASM. */
export async function solvePacking3dHttp({ url, token }) {
    const q = (value, unit = "m") => ({ value, unit });
    const context = new PackingContext({
        items: [{ id: "item", name: "Item", width: q(1), height: q(1), depth: q(1), weight: q(500, "g"), amount: 2n, orientations: ["upright"] }],
        bins: [{ id: "one", typeCode: "type", width: q(1), height: q(1), depth: q(1), capacity: q(1, "kg"), isMain: true },
            { id: "two", typeCode: "type", width: q(1), height: q(1), depth: q(1), capacity: q(1, "kg"), isMain: true }],
        initialLayers: [{ id: "layer", binId: "one", depth: q(1), placements: [{ itemId: "item", position: { x: q(0), y: q(0), z: q(0) }, orientation: "upright" }] }],
    });
    const source = context.toArtifact(); context.dispose();
    const client = new HttpClient({ baseUrl: url, token }), fixtures = [];
    for (const configuration of [{ backend: "scip" }, { backend: "scip", reportLimit: 1 }, { backend: "scip", maxPlacements: 1 }]) {
        let progress = 0;
        const job = await new Bpp3dOneRoundExecution(client, configuration).solve(source, { timeLimitMs: 30_000, pollIntervalMs: 5, onProgress() { progress++; } });
        try { fixtures.push({ source, reportJson: job.reportJson, progress }); }
        finally { await client.release(job.id); }
    }
    return fixtures;
}
