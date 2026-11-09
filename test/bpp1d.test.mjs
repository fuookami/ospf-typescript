import assert from "node:assert/strict";
import test from "node:test";
import { initialize } from "../dist/node.js";
import { Quantity } from "../dist/quantities.js";
import { PackingContext, Bpp1dMilp, Bpp1dColumnGeneration, Bpp1dReport } from "../dist/bpp1d.js";

function problem() {
    return { items: [
        { id: "a", length: { value: 40, unit: "mm" }, weight: { value: 100, unit: "g" }, amount: 2n, materials: new Map([["steel", 3n]]) },
        { id: "b", length: { value: 0.02, unit: "m" }, weight: { value: 0.1, unit: "kg" }, amount: 1n, materials: new Map([["steel", 1n]]) },
    ], binTypes: [{ id: "bin", length: { value: 10, unit: "cm" }, maxWeight: { value: 1, unit: "kg" }, cost: 2, inventory: 2n }],
        spacing: { value: 0, unit: "mm" }, lengthUnit: "cm", weightUnit: "kg", objective: "binCount" };
}
const usages = [{ pattern: { binTypeId: "bin", amounts: new Map([["a", 2n], ["b", 1n]]) }, count: 1n }];

test("BPP1D normalizes dimensions, bounds generation and owns independent physical results", async () => {
    await initialize();
    const context = new PackingContext(problem()), artifact = context.toArtifact();
    const roundtrip = PackingContext.fromArtifact(artifact);
    assert.equal(roundtrip.toJson(), context.toJson());
    const generated = context.generatePatterns(), truncated = context.generatePatterns({ maxPatterns: 1, maxNodes: 1 });
    assert.equal(generated.complete(), true); assert.equal(truncated.complete(), false);
    assert.ok(generated.patterns().some(pattern => pattern.amounts.get("a") === 2n && pattern.amounts.get("b") === 1n));
    context.validatePattern(usages[0].pattern); context.verifyUsages(usages);
    const result = context.pack(usages), verified = context.verifyPlans(result.plans());
    assert.equal(verified.toJson(), result.toJson());
    assert.equal(result.materials().get("steel"), 7n);
    assert.deepEqual(result.kpi(), { binCount: 1n, itemCount: 3n, consumedLength: { value: 10, unit: "cm" }, remnantLength: { value: 0, unit: "cm" }, utilization: 1, cost: 2 });
    assert.equal(result.objective(), 1);
    const plans = result.plans(); plans[0].placements[0].length.value = 3;
    assert.throws(() => context.verifyPlans(plans), { code: "InvalidInput" });
    const overlap = result.plans(); overlap[0].placements[1].start.value = 0;
    assert.throws(() => context.verifyPlans(overlap), { code: "InvalidInput" });
    assert.throws(() => context.pack(usages, 2), { code: "InvalidInput" });
    assert.throws(() => context.pack(usages, 0x1_0000_0001), { code: "InvalidInput" });
    assert.throws(() => context.verifyUsages([...usages, ...usages]), { code: "InvalidInput" });
    // 渲染在原域复核放置后按展示单位换算；渲染数值不是精度或最优性证据，非法单位必须拒绝。
    // Rendering revalidates placements in the domain before converting display units; rendered numbers are not precision or optimality evidence, and an illegal unit is rejected.
    const rendered = context.render(result.plans(), "mm");
    assert.equal(rendered.lengthUnit, "mm");
    assert.equal(rendered.bins.length, 1);
    assert.equal(rendered.bins[0].length, 100);
    assert.equal(rendered.bins[0].binTypeId, "bin");
    assert.deepEqual(rendered.bins[0].items.map(item => [item.itemId, item.start, item.length]), [["a", 0, 40], ["a", 40, 40], ["b", 80, 20]]);
    assert.equal(rendered.utilization, 1);
    assert.throws(() => context.render(result.plans(), "kg"), { code: "InvalidInput" });
    assert.throws(() => context.render(plans, "cm"), { code: "InvalidInput" });
    context.dispose(); context.dispose();
    assert.equal(generated.complete(), true); assert.equal(result.kpi().itemCount, 3n);
    assert.throws(() => context.toJson(), { code: "Disposed" });
    for (const value of [roundtrip, generated, truncated, result, verified]) { value.dispose(); value.dispose(); }
    assert.throws(() => result.plans(), { code: "Disposed" });
    assert.throws(() => generated.complete(), { code: "Disposed" });
    assert.throws(() => PackingContext.fromArtifact({ ...artifact, fingerprint: "wrong" }), { code: "FingerprintMismatch" });
});

test("BPP1D CSV tables build the same context as JSON and keep the strict schema", async () => {
    await initialize();
    const items = "id,length,weight,amount\na,4,0.1,2\nb,2,0.1,1\n";
    const bins = "id,length,max_weight,cost,inventory\nbin,10,1,2,2\n";
    const options = { lengthUnit: "cm", weightUnit: "kg", spacing: { value: 0, unit: "mm" }, objective: "binCount" };
    const context = PackingContext.fromCsv(items, bins, options);
    // CSV 没有物料列，因此与等价 JSON（同样无物料、单位归一后数值相同）比对指纹与排样。
    // CSV has no material column, so compare against the equivalent JSON without materials, whose normalized values match.
    const equivalent = { items: [
        { id: "a", length: { value: 4, unit: "cm" }, weight: { value: 0.1, unit: "kg" }, amount: 2n, materials: new Map() },
        { id: "b", length: { value: 2, unit: "cm" }, weight: { value: 0.1, unit: "kg" }, amount: 1n, materials: new Map() },
    ], binTypes: [{ id: "bin", length: { value: 10, unit: "cm" }, maxWeight: { value: 1, unit: "kg" }, cost: 2, inventory: 2n }],
        spacing: { value: 0, unit: "cm" }, lengthUnit: "cm", weightUnit: "kg", objective: "binCount" };
    const fromJson = new PackingContext(equivalent);
    assert.equal(context.toArtifact().fingerprint, fromJson.toArtifact().fingerprint);
    const usages = [{ pattern: { binTypeId: "bin", amounts: new Map([["a", 2n], ["b", 1n]]) }, count: 1n }];
    assert.equal(context.pack(usages).toJson(), fromJson.pack(usages).toJson());
    fromJson.dispose();
    // 闭合表头与严格解析：多列、缺列、未闭合引号、非数字都必须失败。
    // Closed schema and strict parsing: extra columns, missing columns, unclosed quotes and non-numeric cells must all fail.
    const bad = [
        [items.replace("amount\n", "amount,extra\n"), bins],
        ["id,length,weight\na,4,0.1\n", bins],
        ['id,length,weight,amount\n"a,4,0.1,2\n', bins],
        [items.replace("a,4,", "a,four,"), bins],
    ];
    for (const [itemText, binText] of bad) assert.throws(() => PackingContext.fromCsv(itemText, binText, options), { code: "InvalidInput" });
    // 空库存表示无限，与 JSON 的 null 等价 / An empty inventory means unlimited, equivalent to JSON null.
    const unlimited = PackingContext.fromCsv(items, "id,length,max_weight,cost,inventory\nbin,10,1,2,\n", options).toJson();
    assert.match(unlimited, /"inventory":null/);
    // 只有表头的空物品表不是错误：JSON 路径同样接受空问题，两条路径必须一致。
    // A header-only items table is not an error: the JSON path also accepts an empty problem, so both must agree.
    const emptyCsv = PackingContext.fromCsv("id,length,weight,amount\n", bins, options);
    const emptyJson = new PackingContext({ ...equivalent, items: [] });
    assert.equal(emptyCsv.toArtifact().fingerprint, emptyJson.toArtifact().fingerprint);
    emptyCsv.dispose(); emptyJson.dispose();
    // 非文本输入在边界拒绝 / Non-text input is rejected at the boundary.
    assert.throws(() => PackingContext.fromCsv(null, bins, options), { code: "InvalidInput" });
    context.dispose();
});

test("BPP1D checks exact bigint counts without expansion or JSON number coercion", async () => {
    await initialize();
    const input = problem(); input.items = [input.items[0]]; input.items[0].amount = 0xffff_ffff_ffff_ffffn; input.items[0].materials.clear(); input.binTypes[0].inventory = null;
    const context = new PackingContext(input), usage = [{ pattern: { binTypeId: "bin", amounts: new Map([["a", 1n]]) }, count: input.items[0].amount }];
    context.verifyUsages(usage);
    assert.match(context.toJson(), /18446744073709551615/);
    assert.throws(() => context.pack(usage), { code: "InvalidInput" });
    context.dispose();
    for (const amount of [1, -1n, 0x1_0000_0000_0000_0000n]) { input.items[0].amount = amount; assert.throws(() => new PackingContext(input), { code: "InvalidInput" }); }
    input.items[0].amount = 1n; input.items[0].materials.set(1, 1n);
    assert.throws(() => new PackingContext(input), { code: "InvalidInput" }); input.items[0].materials.clear();
    input.items[0].amount = 1n; input.items[0].materials.set("steel", 9007199254740993n);
    const exact = new PackingContext(input), result = exact.pack([{ ...usage[0], count: 1n }]);
    assert.equal(result.materials().get("steel"), 9007199254740993n); result.dispose(); exact.dispose();
});

test("BPP1D preserves spacing, capacity, units and rejects invalid options", async () => {
    await initialize();
    const input = problem(); input.spacing = { value: 1, unit: "cm" };
    const context = new PackingContext(input);
    assert.throws(() => context.validatePattern(usages[0].pattern), { code: "InvalidInput" });
    for (const options of [{ maxPatterns: 0 }, { maxNodes: 100001 }, { callback: true }]) assert.throws(() => context.generatePatterns(options), { code: "InvalidInput" });
    context.dispose(); input.weightUnit = "s";
    assert.throws(() => new PackingContext(input), { code: "InvalidInput" });
    const quantity = new Quantity(500, "g"), converted = quantity.toUnit("kg");
    assert.deepEqual(converted.toDto(), { value: 0.5, unit: "kg" });
    assert.throws(() => quantity.toUnit("cm"), { code: "InvalidInput" }); quantity.dispose(); converted.dispose();
});

test("BPP1D execution requires explicit registered capabilities and snapshots bounded configuration", async () => {
    const capabilities = { protocolVersion: 1, backends: [
        { id: "bpp1d", compiled: true, capabilities: ["bpp1d", "bpp1dMilp", "bpp1dColumnGeneration"], warnings: [] },
        { id: "scip", compiled: true, capabilities: ["linear"], warnings: [] },
    ] };
    for (const Solver of [Bpp1dMilp, Bpp1dColumnGeneration]) {
        for (const value of [null, {}, { backend: "other" }, { backend: "scip", algorithm: "milp" }, { backend: "scip", callback() {} }, { backend: "scip", iterationLimit: 0 }, { backend: "scip", generation: { maxNodes: 100001 } }]) assert.throws(() => new Solver({}, value), { code: "InvalidInput" });
        const configuration = { backend: "scip", generation: { maxPatterns: 3 } };
        const client = { async capabilities() { return capabilities; }, async submit(request) {
            assert.equal(request.modelKind, "bpp1d"); assert.equal(request.solver, "bpp1d"); assert.equal(request.bpp1dOptions.generation.maxPatterns, 3);
            assert.equal(request.bpp1dOptions.algorithm, Solver === Bpp1dMilp ? "milp" : "columnGeneration");
            return { protocolVersion: 1, id: "job", fingerprint: "source", status: "completed", reportJson: "raw", progressJson: null, error: null };
        } };
        const solver = new Solver(client, configuration); configuration.generation.maxPatterns = 99;
        assert.equal((await solver.solve({ modelJson: "opaque", fingerprint: "source" })).reportJson, "raw");
        await assert.rejects(new Solver({ async capabilities() { return { ...capabilities, backends: [capabilities.backends[0]] }; } }, { backend: "scip" }).solve({ modelJson: "opaque", fingerprint: "source" }), { code: "BackendNotCompiled" });
        await assert.rejects(new Solver({ async capabilities() { return { ...capabilities, backends: capabilities.backends.map(value => ({ ...value, capabilities: value.id === "bpp1d" ? ["bpp1d"] : value.capabilities })) }; } }, { backend: "scip" }).solve({ modelJson: "opaque", fingerprint: "source" }), { code: "UnsupportedCapability" });
    }
    await initialize(); const context = new PackingContext(problem()), artifact = context.toArtifact(); context.dispose();
    assert.throws(() => Bpp1dReport.fromJson("{}", artifact), { code: "InvalidInput" });
    assert.throws(() => Bpp1dReport.fromJson("x".repeat(8 * 1024 * 1024 + 1), artifact), { code: "PayloadTooLarge" });
});
