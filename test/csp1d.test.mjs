import assert from "node:assert/strict";
import test from "node:test";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { initialize } from "../dist/node.js";
import { CuttingContext } from "../dist/csp1d.js";

function problem() {
    return { products: [{ id: "p", name: "product", width: [{ value: 30, unit: "mm" }] }],
        materials: [{ id: "m", name: "material", widthRange: { lowerBound: { value: 0, unit: "m" }, upperBound: { value: 10, unit: "cm" } }, machineId: "mc", availableBatches: 3n }],
        machines: [{ id: "mc", name: "machine", widthRange: null, maxBatchCount: 3n }],
        demands: [{ productId: "p", mode: "roll", count: 5n }], lengthUnit: "cm" };
}
function usage() { return { plan: { id: "plan", materialId: "m", slices: [{ productId: "p", width: { value: 0.03, unit: "m" }, amount: 3n }] }, count: 2n }; }

test("CSP1D Rust units, bounded original candidates and independent production survive context disposal", async () => {
    await initialize();
    const context = new CuttingContext(problem()), artifact = context.toArtifact();
    const restored = CuttingContext.fromArtifact(artifact), generated = context.generatePatterns(), truncated = context.generatePatterns({ maxPlans: 1 });
    assert.equal(restored.toJson(), context.toJson()); assert.equal(generated.plans().length, 3);
    assert.equal(generated.candidateComplete(), false); assert.equal(generated.truncated(), false); assert.equal(truncated.truncated(), true);
    assert.ok(generated.visitedNodes() > 0n); assert.equal(generated.generatedCandidates(), 3n);
    context.validatePlan(usage().plan);
    const result = context.verifyUsages([usage()]);
    assert.equal(result.batchCount(), 2n); assert.equal(result.produced().get("p"), 6n);
    assert.equal(result.materialBatches().get("m"), 2n); assert.equal(result.machineBatches().get("mc"), 2n);
    assert.deepEqual(result.usedWidth(), { value: 18, unit: "cm" }); assert.deepEqual(result.trimWidth(), { value: 2, unit: "cm" });
    const verified = context.verifyUsages(result.usages()); assert.equal(verified.toJson(), result.toJson());
    const copy = generated.plans(); copy[0].slices[0].amount = 64n; assert.equal(generated.plans()[0].slices[0].amount, 1n);
    context.dispose(); context.dispose(); assert.throws(() => context.toJson(), { code: "Disposed" });
    assert.equal(result.produced().get("p"), 6n); assert.equal(generated.plans().length, 3);
    for (const value of [restored, generated, truncated, result, verified]) { value.dispose(); value.dispose(); }
    assert.throws(() => result.toJson(), { code: "Disposed" }); assert.throws(() => generated.plans(), { code: "Disposed" });
    assert.throws(() => CuttingContext.fromArtifact({ ...artifact, fingerprint: "foreign" }), { code: "FingerprintMismatch" });
    assert.throws(() => CuttingContext.fromArtifact({ ...artifact, modelJson: artifact.modelJson.replace('"schemaVersion":"1.0"', '"schemaVersion":"2.0"') }), { code: "UnsupportedProtocolVersion" });
});

test("CSP1D exact output beyond 2^53 never passes JSON number; unsafe input is explicitly rejected", async () => {
    await initialize();
    const input = problem(); input.demands[0].mode = "sheet"; input.materials[0].availableBatches = null; input.machines[0].maxBatchCount = null;
    const context = new CuttingContext(input), value = usage(); value.count = 9_007_199_254_740_991n;
    const result = context.verifyUsages([value]); assert.equal(result.produced().get("p"), 27_021_597_764_222_973n);
    assert.match(result.toJson(), /"27021597764222973"/); result.dispose(); context.dispose();
    for (const count of [1, -1n, 9_007_199_254_740_992n, 0xffff_ffff_ffff_ffffn]) {
        const invalid = problem(); invalid.demands[0].count = count;
        assert.throws(() => new CuttingContext(invalid), { code: "InvalidInput" });
    }
});

test("CSP1D enforces original width/machine constraints, exact stock and references without fake solving", async () => {
    await initialize();
    const context = new CuttingContext(problem());
    for (const usages of [[], [usage(), usage()], [{ ...usage(), count: 1n }], [{ ...usage(), count: 4n }]]) {
        assert.throws(() => context.verifyUsages(usages), { code: "InvalidInput" });
    }
    for (const mutate of [value => value.plan.materialId = "foreign", value => value.plan.slices[0].amount = 4n,
        value => value.plan.slices[0].width.value = 0.04, value => value.plan.slices[0].width.unit = "s",
        value => value.plan.slices[0].productId = "foreign", value => value.plan.slices.push(value.plan.slices[0])]) {
        const value = usage(); mutate(value); assert.throws(() => context.verifyUsages([value]), { code: "InvalidInput" });
    }
    for (const options of [{ maxPlans: 0 }, { maxPlans: 513 }, { maxKnives: 65 }, { callback: true }, { generator: "dfs" }]) {
        assert.throws(() => context.generatePatterns(options), { code: "InvalidInput" });
    }
    for (const options of [{ maxPlans: NaN }, { maxPlans: Infinity }, { maxPlans: 1.5 }, { maxKnives: -Infinity }, { callback() {} }, { generator: Symbol("simple") }]) {
        assert.throws(() => context.generatePatterns(options), { code: "InvalidInput" });
    }
    const simple = context.generatePatterns({ generator: "simple" }); assert.equal(simple.plans()[0].slices[0].amount, 1n); simple.dispose(); context.dispose();
    for (const mutate of [value => value.products[0].width[0].unit = "kg", value => value.lengthUnit = "s", value => value.materials[0].machineId = "foreign",
        value => value.products.push(value.products[0]), value => value.demands[0].mode = "weight",
        // 空配规列表是合法状态，不能作为非法输入；换成同名冲突才真正非法。
        // An empty costar list is legal and must not be treated as invalid; a shadowed product id is the real violation.
        value => value.costars = [{ id: "p", name: "costar", width: [{ value: 20, unit: "mm" }] }]]) {
        const invalid = problem(); mutate(invalid); assert.throws(() => new CuttingContext(invalid), { code: "InvalidInput" });
    }
});

test("CSP1D exact verification rejects one missing piece at the safe boundary and u64 aggregate overflow", async () => {
    await initialize();
    const input = problem(); input.materials[0].availableBatches = null; input.machines[0].maxBatchCount = null;
    input.demands[0].count = 9_007_199_254_740_991n;
    const context = new CuttingContext(input), value = usage();
    value.plan.slices[0].amount = 1n; value.count = input.demands[0].count - 1n;
    assert.throws(() => context.verifyUsages([value]), { code: "InvalidInput", message: /exact demand is unmet/ });
    context.dispose();
    input.products[0].width = Array.from({ length: 8 }, (_, i) => ({ value: (i + 1) / 10, unit: "mm" })); input.demands[0].count = 1n;
    input.materials = Array.from({ length: 5 }, (_, i) => ({ ...input.materials[0], id: `m${i}` }));
    const overflow = new CuttingContext(input);
    const usages = Array.from({ length: 33 }, (_, i) => ({ plan: { id: `plan-${i}`, materialId: `m${Math.floor(i / 8)}`,
        slices: [{ productId: "p", width: input.products[0].width[i % 8], amount: 64n }] }, count: 9_007_199_254_740_991n }));
    assert.throws(() => overflow.verifyUsages(usages), { code: "InvalidInput", message: /overflow/ }); overflow.dispose();
});

test("CSP1D source-bound report reader rejects invalid text, unsupported schema and parsed objects", async () => {
    await initialize();
    const context = new CuttingContext(problem());
    for (const text of ["{}", "null", "not-json"]) assert.throws(() => context.readProductionReport(text), { code: "InvalidInput" });
    assert.throws(() => context.readProductionReport({}), { code: "InvalidInput" });
    assert.throws(() => context.readProductionReport(" ".repeat(8 * 1024 * 1024 + 1)), { code: "PayloadTooLarge" });
    context.dispose(); assert.throws(() => context.readProductionReport("{}"), { code: "Disposed" });
});

test("CSP1D real SCIP/Gurobi integer reports derive matching independent production in WASM", { skip: !process.env.OSPF_CSP1D_FIXTURE_DIR }, async () => {
    await initialize();
    const directory = process.env.OSPF_CSP1D_FIXTURE_DIR;
    const files = (await readdir(directory)).filter(name => /^csp1d-(scip|gurobi)\.json$/.test(name));
    assert.ok(files.length > 0, "explicit fixture directory must contain real Rust-backend evidence");
    for (const file of files) {
        const fixtures = JSON.parse(await readFile(join(directory, file), "utf8")); assert.equal(fixtures.length, 4);
        for (const fixture of fixtures) {
            const context = CuttingContext.fromArtifact(fixture.source), report = context.readProductionReport(fixture.reportJson);
            assert.equal(report.toJson(), fixture.reportJson);
            const wire = JSON.parse(fixture.reportJson);
            assert.equal(report.solverReportJson(), wire.child.solverReportJson);
            const summary = report.summary();
            assert.equal(summary.sourceFingerprint, fixture.source.fingerprint); assert.equal(summary.candidateComplete, false);
            assert.equal(summary.hasProduction, fixture.productionJson !== null);
            summary.sourceFingerprint = "tampered"; assert.equal(report.summary().sourceFingerprint, fixture.source.fingerprint);
            wire.schemaVersion = "2.0";
            assert.throws(() => context.readProductionReport(JSON.stringify(wire)), { code: "UnsupportedProtocolVersion" });
            wire.schemaVersion = "1.0";
            wire.child.solverReportJson = wire.child.solverReportJson.replace(/"nodes":(?:null|\d+)/g, '"nodes":18446744073709551615');
            const exact = context.readProductionReport(JSON.stringify(wire));
            assert.match(exact.solverReportJson(), /"nodes":18446744073709551615/);
            assert.deepEqual(exact.summary(), report.summary()); exact.dispose();
            const first = report.production(), second = report.production();
            if (fixture.productionJson !== null) {
                assert.equal(first.toJson(), fixture.productionJson); assert.equal(second.toJson(), fixture.productionJson);
                assert.equal(first.batchCount(), 2n); assert.equal(first.produced().get("p"), 6n);
                assert.equal(report.summary().restrictedOptimal, true);
            } else {
                assert.equal(first, undefined); assert.equal(second, undefined); assert.equal(report.summary().restrictedInfeasible, true);
            }
            wire.sourceFingerprint = "foreign";
            assert.throws(() => context.readProductionReport(JSON.stringify(wire)), { code: "FingerprintMismatch" });
            wire.sourceFingerprint = fixture.source.fingerprint; wire.plans.pop();
            assert.throws(() => context.readProductionReport(JSON.stringify(wire)), { code: "InvalidInput" });
            context.dispose(); first?.dispose(); report.dispose(); report.dispose();
            assert.throws(() => report.summary(), { code: "Disposed" }); assert.throws(() => report.production(), { code: "Disposed" });
            assert.throws(() => report.toJson(), { code: "Disposed" }); assert.throws(() => report.solverReportJson(), { code: "Disposed" });
            assert.equal(second?.toJson() ?? null, fixture.productionJson); second?.dispose();
        }
    }
});

test("costars reach the native problem but no default generator consumes them", async () => {
    await initialize();
    const mm = value => ({ value, unit: "mm" });
    const build = costars => ({ products: [{ id: "p", name: "product", width: [mm(30)] }],
        materials: [{ id: "m", name: "material", widthRange: { lowerBound: { value: 0, unit: "m" }, upperBound: { value: 100, unit: "mm" } },
            machineId: "mc", availableBatches: 3n }],
        machines: [{ id: "mc", name: "machine", widthRange: null, maxBatchCount: 3n }],
        demands: [{ productId: "p", mode: "roll", count: 5n }],
        ...(costars ? { costars } : {}), lengthUnit: "mm" });
    // 如实记录当前能力：配规能进源问题与方案编解码，但原 `CostarFiller` 在领域内没有调用方，
    // 因此默认生成器不会产出配规切片。测试钉住这个事实，避免文档夸大成"已支持配规生成"。
    // Record the actual capability: costars reach the source problem and plan codecs, but the original `CostarFiller`
    // has no in-domain caller, so default generators never emit costar slices. This test pins the fact so docs cannot
    // overstate support.
    const withCostar = new CuttingContext(build([{ id: "c", name: "costar", width: [mm(30)] }])).generatePatterns();
    const sliceIds = withCostar.plans().flatMap(plan => plan.slices.map(slice => slice.costarId ?? slice.productId));
    assert.ok(sliceIds.every(id => id === "p"), `default generators must not emit costar slices, got ${JSON.stringify(sliceIds)}`);
    // 但配规声明本身必须无损往返，并且能被方案显式引用。
    // The declaration itself must still roundtrip losslessly and stay referable from an explicit plan.
    const context = new CuttingContext(build([{ id: "c", name: "costar", width: [mm(30)] }]));
    assert.deepEqual(JSON.parse(context.toJson()).problem.costars, [{ id: "c", name: "costar", width: [mm(30)] }]);
    assert.doesNotThrow(() => context.validatePlan({ id: "plan", materialId: "m", slices: [
        { costarId: "c", width: mm(30), amount: 1n }, { productId: "p", width: mm(30), amount: 2n }] }));
    context.dispose(); withCostar.dispose();
});

test("costars enter CSP1D sources and slices without contributing demand", async () => {
    await initialize();
    const mm = value => ({ value, unit: "mm" });
    const base = costars => ({ products: [{ id: "p", name: "product", width: [mm(30)] }],
        materials: [{ id: "m", name: "material", widthRange: { lowerBound: { value: 0, unit: "m" }, upperBound: { value: 100, unit: "mm" } },
            machineId: "mc", availableBatches: 3n }],
        machines: [{ id: "mc", name: "machine", widthRange: null, maxBatchCount: 3n }],
        demands: [{ productId: "p", mode: "roll", count: 5n }],
        ...(costars ? { costars } : {}), lengthUnit: "mm" });
    // 配规声明无损往返，且与产品身份互斥。 / Costar declarations roundtrip losslessly and never shadow product ids.
    const context = new CuttingContext(base([{ id: "c", name: "costar", width: [mm(20)] }]));
    assert.deepEqual(JSON.parse(context.toJson()).problem.costars, [{ id: "c", name: "costar", width: [mm(20)] }]);
    context.dispose();
    const plain = new CuttingContext(base(null));
    assert.equal(JSON.parse(plain.toJson()).problem.costars, undefined);
    plain.dispose();
    // 与产品同名、未知身份、重复身份与非法宽度都必须拒绝。
    // Shadowing a product id, duplicates and invalid widths must all be rejected.
    for (const invalid of [[{ id: "p", name: "costar", width: [mm(20)] }], [{ id: "c", name: "costar", width: [mm(20)] }, { id: "c", name: "costar", width: [mm(20)] }],
        [{ id: "c", name: "costar", width: [mm(0)] }], [{ id: "c", name: "costar", width: [] }]]) {
        assert.throws(() => new CuttingContext(base(invalid)), { code: "InvalidInput" }, JSON.stringify(invalid));
    }
});

test("weight-based demand converts from declared product geometry", async () => {
    await initialize();
    const mm = value => ({ value, unit: "mm" });
    const base = changes => ({ products: [{ id: "p", name: "product", width: [mm(30)], ...changes }],
        materials: [{ id: "m", name: "material", widthRange: { lowerBound: { value: 0, unit: "m" }, upperBound: { value: 100, unit: "mm" } },
            machineId: "mc", availableBatches: 3n }],
        machines: [{ id: "mc", name: "machine", widthRange: null, maxBatchCount: 3n }],
        demands: [{ productId: "p", mode: "weight", count: 5n }], lengthUnit: "mm" });
    // 声明长度与单位重量后，重量口径需求可正常构造。 / With declared geometry the weight basis is constructible.
    const context = new CuttingContext(base({ length: mm(1000), unitWeight: { value: 500, unit: "g" } }));
    assert.equal(JSON.parse(context.toJson()).problem.demands[0].mode, "weight");
    context.dispose();
    // 缺长度或缺单位重量必须拒绝，不能静默当成 0。 / Missing geometry must fail rather than silently becoming zero.
    assert.throws(() => new CuttingContext(base({ unitWeight: { value: 500, unit: "g" } })), { code: "InvalidInput" });
    assert.throws(() => new CuttingContext(base({ length: mm(1000) })), { code: "InvalidInput" });
    // 负单位重量同样拒绝。 / A negative unit weight is rejected too.
    assert.throws(() => new CuttingContext(base({ length: mm(1000), unitWeight: { value: -1, unit: "g" } })), { code: "InvalidInput" });
});
