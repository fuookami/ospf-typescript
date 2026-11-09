import assert from "node:assert/strict";
import test from "node:test";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { initialize } from "../dist/node.js";
import { DiscreteLoadingContext, DiscreteLoadingReport } from "../dist/bpp.js";

function problem() {
    return { items: [{ id: "a", weight: { value: 1000, unit: "g" }, required: true, fixedPositionId: null }],
        positions: [{ id: "p", maxCount: 18_446_744_073_709_551_615n, maxWeight: { value: 1, unit: "kg" }, fixedOccupied: false, enabled: true },
            { id: "q", maxCount: 1n, maxWeight: { value: 0, unit: "kg" }, fixedOccupied: false, enabled: true }],
        allowedAssignments: [{ itemId: "a", positionId: "p" }], conflicts: [], layoutGroups: [], weightUnit: "kg" };
}
const solution = () => ({ assignments: { a: "p" }, occupiedPositions: ["p", "q"], selectedLayouts: {} });

test("explicit 1D intervals add only strict overlaps as conflict cliques", async () => {
    await initialize();
    const base = problem();
    const withIntervals = { ...base, conflicts: [], intervals: [
        { id: "p", spaceId: "deck", start: { value: 0, unit: "m" }, end: { value: 2, unit: "m" } },
        { id: "q", spaceId: "deck", start: { value: 1, unit: "m" }, end: { value: 3, unit: "m" } },
    ] };
    const context = new DiscreteLoadingContext(withIntervals);
    assert.deepEqual(context.conflictCliques(), [["p", "q"]]);
    context.dispose();
    // 贴边（终点恰等于起点）不生成边 / Touching intervals (end equals start) create no edge.
    const touching = { ...base, conflicts: [], intervals: [
        { id: "p", spaceId: "deck", start: { value: 0, unit: "m" }, end: { value: 2, unit: "m" } },
        { id: "q", spaceId: "deck", start: { value: 2, unit: "m" }, end: { value: 3, unit: "m" } },
    ] };
    const clean = new DiscreteLoadingContext(touching);
    assert.deepEqual(clean.conflictCliques(), []);
    clean.dispose();
    // 跨空间同坐标不生成边；未知舱位拒绝。
    // Identical coordinates in separate spaces create no edge, and an unknown position is rejected.
    const separate = new DiscreteLoadingContext({ ...base, conflicts: [], intervals: [
        { id: "p", spaceId: "deck-a", start: { value: 0, unit: "m" }, end: { value: 2, unit: "m" } },
        { id: "q", spaceId: "deck-b", start: { value: 1, unit: "m" }, end: { value: 3, unit: "m" } },
    ] });
    assert.deepEqual(separate.conflictCliques(), []);
    separate.dispose();
    assert.throws(() => new DiscreteLoadingContext({ ...base, intervals: [
        { id: "zz", spaceId: "deck", start: { value: 0, unit: "m" }, end: { value: 1, unit: "m" } },
    ] }), { code: "InvalidInput" });
});

test("explicit 2D rectangles add only exact same-space overlaps as conflict cliques", async () => {
    await initialize();
    const base = problem();
    const rect = (id, spaceId, x, y, width, height) => ({ id, spaceId, x: { value: x, unit: "m" }, y: { value: y, unit: "m" },
        width: { value: width, unit: "m" }, height: { value: height, unit: "m" } });
    const overlapping = new DiscreteLoadingContext({ ...base, conflicts: [],
        rectangles: [rect("p", "deck", 0, 0, 2, 2), rect("q", "deck", 1, 1, 2, 2)] });
    assert.deepEqual(overlapping.conflictCliques(), [["p", "q"]]);
    overlapping.dispose();
    // 共边不算冲突；跨空间同坐标也不算。 / Edge contact and separate spaces never conflict.
    const touching = new DiscreteLoadingContext({ ...base, conflicts: [],
        rectangles: [rect("p", "deck", 0, 0, 2, 2), rect("q", "deck", 2, 0, 1, 1)] });
    assert.deepEqual(touching.conflictCliques(), []);
    touching.dispose();
    const separate = new DiscreteLoadingContext({ ...base, conflicts: [],
        rectangles: [rect("p", "deck-a", 0, 0, 2, 2), rect("q", "deck-b", 1, 1, 2, 2)] });
    assert.deepEqual(separate.conflictCliques(), []);
    separate.dispose();
    // 每个舱位必须恰好一个矩形；退化尺寸与混用区间都要拒绝。
    // Exactly one rectangle per position is required; degenerate extents and mixed intervals must be rejected.
    assert.throws(() => new DiscreteLoadingContext({ ...base, rectangles: [rect("p", "deck", 0, 0, 2, 2)] }), { code: "InvalidInput" });
    assert.throws(() => new DiscreteLoadingContext({ ...base,
        rectangles: [rect("p", "deck", 0, 0, 0, 2), rect("q", "deck", 1, 1, 2, 2)] }), { code: "InvalidInput" });
    assert.throws(() => new DiscreteLoadingContext({ ...base,
        rectangles: [rect("p", "deck", 0, 0, 2, 2), rect("q", "deck", 1, 1, 2, 2)],
        intervals: [{ id: "p", spaceId: "deck", start: { value: 0, unit: "m" }, end: { value: 1, unit: "m" } }] }), { code: "InvalidInput" });
});

test("shared BPP registers original sparse models, preserves full u64 counts and owns source snapshots", async () => {
    await initialize(); const input = problem(), context = new DiscreteLoadingContext(input);
    const source = context.toArtifact(), model = context.toLinearTriadModel(); input.positions[0].maxCount = 1n; input.items[0].weight.value = 99999;
    assert.match(source.modelJson, /18446744073709551615/); assert.notEqual(source.fingerprint, model.fingerprint);
    const restored = DiscreteLoadingContext.fromArtifact(source); assert.deepEqual(restored.toLinearTriadModel(), model);
    const equivalent = problem(); equivalent.items[0].id = "aa"; equivalent.allowedAssignments[0].itemId = "aa";
    const renamed = new DiscreteLoadingContext(equivalent);
    assert.notEqual(renamed.toLinearTriadModel().fingerprint, model.fingerprint); renamed.dispose();
    assert.equal(JSON.parse(model.modelJson).variables.length, 3); assert.deepEqual(context.conflictCliques(), []);
    context.dispose(); assert.throws(() => context.toArtifact(), { code: "Disposed" });
    const result = restored.verifySolution(solution()); restored.dispose(); assert.equal(result.loadedCount(), 1n);
    assert.deepEqual(result.loadedWeight(), { value: 1, unit: "kg" }); assert.deepEqual(result.positionCounts(), new Map([["p", 1n], ["q", 0n]]));
    assert.equal(result.sourceFingerprint(), source.fingerprint); result.dispose(); result.dispose(); assert.throws(() => result.solution(), { code: "Disposed" });
    assert.throws(() => DiscreteLoadingContext.fromArtifact({ ...source, fingerprint: "foreign" }), { code: "FingerprintMismatch" });
});

test("shared BPP exact counts and mass dimensions reject coercion, callbacks, overflow and underflow", async () => {
    await initialize();
    for (const value of [1, "1", 0n, -1n, 18_446_744_073_709_551_616n]) {
        const input = problem(); input.positions[0].maxCount = value; assert.throws(() => new DiscreteLoadingContext(input), { code: "InvalidInput" });
    }
    for (const change of [input => input.items[0].weight.unit = "m", input => input.items[0].weight.value = Number.MIN_VALUE,
        input => input.items[0].weight.value = NaN, input => input.callback = () => {}, input => input.extra = undefined,
        input => input.allowedAssignments.push(input.allowedAssignments[0]), input => input.positions[1].id = "p",
        input => input.allowedAssignments[0].positionId = "foreign", input => input.weightUnit = "s"]) {
        const input = problem(); change(input); assert.throws(() => new DiscreteLoadingContext(input), { code: "InvalidInput" });
    }
});

test("shared BPP uses complete copied TypedArray vectors and independently validates reservations and assignments", async () => {
    await initialize(); const context = new DiscreteLoadingContext(problem()), plan = solution();
    const values = context.solutionValues(plan); assert.ok(values instanceof Float64Array); assert.deepEqual([...values], [1, 1, 1]);
    const result = context.extractSolution(values), copy = result.solution(); copy.assignments.a = "q";
    assert.equal(result.solution().assignments.a, "p"); values[0] = 0;
    assert.throws(() => context.extractSolution(values), { code: "InvalidInput" }); assert.deepEqual([...context.solutionValues(plan)], [1, 1, 1]);
    for (const values of [[], [1], new Float64Array([1]), new Float64Array([1, 1, 1, 1]), new Float64Array([0.5, 1, 1]), new Float64Array([NaN, 1, 1])]) {
        assert.throws(() => context.extractSolution(values), { code: "InvalidInput" });
    }
    for (const change of [plan => delete plan.assignments.a, plan => plan.occupiedPositions.push("p"), plan => plan.assignments.a = "q", plan => plan.occupiedPositions = ["q"]]) {
        const plan = solution(); change(plan); assert.throws(() => context.verifySolution(plan), { code: "InvalidInput" });
    }
    context.dispose(); assert.equal(result.loadedCount(), 1n); result.dispose();
});

test("shared BPP original edge cover is non-transitive and explicit layouts retain original semantics", async () => {
    await initialize(); const input = problem(); input.items = []; input.allowedAssignments = [];
    input.positions.push({ ...input.positions[1], id: "r" }); input.conflicts = [{ first: "p", second: "q" }, { first: "q", second: "r" }];
    input.layoutGroups = [{ id: "g", positionIds: ["p", "q", "r"], layouts: [{ id: "outer", positionIds: ["p", "r"] }, { id: "middle", positionIds: ["q"] }] }];
    const context = new DiscreteLoadingContext(input);
    assert.ok(context.conflictCliques().every(clique => !(clique.includes("p") && clique.includes("r"))));
    const plan = { assignments: {}, occupiedPositions: ["p", "r"], selectedLayouts: { g: "outer" } };
    context.verifySolution(plan).dispose();
    assert.throws(() => context.verifySolution({ ...plan, selectedLayouts: { g: "middle" } }), { code: "InvalidInput" });
    assert.throws(() => context.verifySolution({ ...plan, occupiedPositions: ["p", "q"] }), { code: "InvalidInput" }); context.dispose();
});

test("shared BPP real native model reports retain raw u64 metadata and independently revalidate source plans", { skip: !process.env.OSPF_BPP_LOADING_FIXTURE_DIR }, async () => {
    await initialize(); const directory = process.env.OSPF_BPP_LOADING_FIXTURE_DIR;
    const files = (await readdir(directory)).filter(name => /^bpp-loading-(scip|gurobi)\.json$/.test(name)); assert.ok(files.length > 0);
    for (const file of files) for (const fixture of JSON.parse(await readFile(join(directory, file), "utf8"))) {
        const context = DiscreteLoadingContext.fromArtifact(fixture.source); assert.deepEqual(context.toLinearTriadModel(), fixture.model);
        const text = fixture.reportJson.replace(/"nodes":(?:null|\d+)/g, '"nodes":18446744073709551615');
        const report = context.readReport(text), direct = DiscreteLoadingReport.fromJson(text, fixture.source); context.dispose();
        assert.equal(report.toJson(), text); assert.equal(direct.toJson(), text); direct.dispose();
        assert.equal(report.sourceFingerprint(), fixture.source.fingerprint);
        const plan = report.solution(), copy = report.solution(); report.dispose(); plan?.dispose();
        assert.equal(copy?.toJson() ?? null, fixture.resultJson); copy?.dispose();
        const bad = text.replace(/"fingerprints":\{"model":\{[^{}]*\}/, '"fingerprints":{"model":null');
        assert.notEqual(bad, text);
        assert.throws(() => DiscreteLoadingReport.fromJson(bad, fixture.source), { code: "FingerprintMismatch" });
    }
});
