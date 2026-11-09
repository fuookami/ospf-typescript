import { PackingContext } from "/dist/bpp1d.js";

export function checkPacking() {
    const context = new PackingContext({
        items: [{ id: "a", length: { value: 40, unit: "mm" }, weight: { value: 100, unit: "g" }, amount: 2n, materials: new Map([["steel", 9007199254740993n]]) }],
        binTypes: [{ id: "bin", length: { value: 10, unit: "cm" }, maxWeight: { value: 1, unit: "kg" }, cost: 2, inventory: null }],
        spacing: { value: 1, unit: "cm" }, lengthUnit: "cm", weightUnit: "kg", objective: "binCount",
    });
    const generated = context.generatePatterns(), result = context.pack([{ pattern: { binTypeId: "bin", amounts: new Map([["a", 2n]]) }, count: 1n }]);
    // 渲染必须在释放上下文之前完成 / Rendering must happen before the context is disposed.
    const rendered = context.render(result.plans(), "mm");
    const artifact = context.toArtifact(); context.dispose();
    const output = { complete: generated.complete(), objective: result.objective(), materials: result.materials().get("steel").toString(),
        remnant: result.kpi().remnantLength.value, renderUnit: rendered.lengthUnit, renderBinLength: rendered.bins[0].length,
        renderItems: rendered.bins[0].items.map(item => [item.itemId, item.start, item.length]), renderUtilization: rendered.utilization };
    generated.dispose(); result.dispose(); return { output, artifact };
}
