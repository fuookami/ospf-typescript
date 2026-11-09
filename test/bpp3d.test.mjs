import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync, readdirSync } from "node:fs";
import { initialize } from "../dist/node.js";
import { ExecutionReport, PackingContext } from "../dist/bpp3d.js";
import { Bpp3dOneRoundExecution, HttpClient } from "../dist/framework.js";

const quantity = (value, unit = "m") => ({ value, unit });
function problem() {
    return {
        items: [{ id: "item", name: "Item", width: quantity(100, "cm"), height: quantity(1), depth: quantity(1),
            weight: quantity(500, "g"), amount: 2n, orientations: ["upright", "side"] }],
        bins: [{ id: "bin-1", typeCode: "type", width: quantity(2), height: quantity(1), depth: quantity(1), capacity: quantity(1, "kg"), isMain: true }],
        initialLayers: [{ id: "layer", binId: "bin-1", depth: quantity(1), placements: [
            { itemId: "item", position: { x: quantity(0), y: quantity(0), z: quantity(0) }, orientation: "upright" },
            { itemId: "item", position: { x: quantity(1), y: quantity(0), z: quantity(0) }, orientation: "upright" },
        ] }],
    };
}

test("BPP3D discrete radius candidates expand like the original CSV path", async () => {
    await initialize();
    const meter = value => ({ value, unit: "m" });
    const drum = candidates => ({ items: [{ id: "drum", name: "Drum", width: meter(1.8), height: meter(1.0), depth: meter(1.8),
        weight: { value: 0.5, unit: "kg" }, amount: 2n, orientations: ["upright"],
        // 枚举变体字段沿用 Rust 字段名 `radius_candidates`，不随枚举的 rename_all 变成 camelCase。
        // Enum variant fields keep the Rust field name `radius_candidates`; the enum's rename_all does not apply.
        shape: { kind: "cylinder", axis: "y", radius: meter(0.5), ...(candidates ? { radius_candidates: candidates } : {}) } }],
        bins: [{ id: "bin", typeCode: "type", width: meter(3), height: meter(2), depth: meter(3), capacity: { value: 2, unit: "kg" }, isMain: true }],
        initialLayers: [{ id: "layer", binId: "bin", depth: meter(1.8), placements: [
            { itemId: "drum", position: { x: meter(0.2), y: meter(0), z: meter(0) }, orientation: "upright" },
            { itemId: "drum", position: { x: meter(1.0), y: meter(0), z: meter(0.8) }, orientation: "upright" }] }] });
    const candidates = (min, max, step) => ({ min: meter(min), max: meter(max), step: meter(step) });
    // 0.3..=0.5 步长 0.1 展开为三个候选，且无损往返到源问题。
    // 0.3..=0.5 by 0.1 expands to three candidates and roundtrips losslessly into the source problem.
    const context = new PackingContext(drum(candidates(0.3, 0.5, 0.1)));
    const roundtripped = context.problem().items[0].shape;
    assert.deepEqual(roundtripped.radius_candidates, candidates(0.3, 0.5, 0.1));
    context.dispose();
    // 未给出候选时不出现该字段；倒序、非正步长与超过横截面都必须拒绝。
    // Without candidates the field is absent; inverted bounds, non-positive steps and oversized radii must fail.
    const plain = new PackingContext(drum(null));
    assert.equal(plain.problem().items[0].shape.radius_candidates, undefined);
    plain.dispose();
    for (const invalid of [candidates(0.5, 0.3, 0.1), candidates(0.3, 0.5, 0), candidates(0.3, 0.5, -0.1), candidates(0.3, 1.2, 0.1)]) {
        assert.throws(() => new PackingContext(drum(invalid)), { code: "InvalidInput" }, JSON.stringify(invalid));
    }
});

test("BPP3D radius component declaration reaches the source artifact and is validated", async () => {
    await initialize();
    const meter = value => ({ value, unit: "m" });
    const base = () => ({ items: [
        { id: "drum", name: "Drum", width: meter(1.8), height: meter(1.0), depth: meter(1.8), weight: { value: 0.5, unit: "kg" },
          amount: 2n, orientations: ["upright"], shape: { kind: "cylinder", axis: "y", radius: meter(0.5) } },
    ], bins: [{ id: "bin", typeCode: "type", width: meter(3), height: meter(2), depth: meter(3), capacity: { value: 5, unit: "kg" }, isMain: true }],
        initialLayers: [{ id: "layer", binId: "bin", depth: meter(1.8), placements: [
            { itemId: "drum", position: { x: meter(0.2), y: meter(0), z: meter(0) }, orientation: "upright" },
            { itemId: "drum", position: { x: meter(1.0), y: meter(0), z: meter(0.8) }, orientation: "upright" }] }] });
    const prototype = (overrides = {}) => ({ itemId: "drum", source: "weight", axis: "y", lowerBound: meter(0.4), upperBound: meter(0.9), ...overrides });
    const functions = () => [{ key: "weight", intercept: 0, radiusSquaredCoefficient: 1, objectiveWeight: 1 }];
    // 合法声明进入源工件，指纹随之改变；同一内容必须稳定。
    // A valid declaration reaches the source artifact and changes the fingerprint deterministically.
    const plain = new PackingContext(base()).toArtifact();
    const withRadius = new PackingContext({ ...base(), radiusComponent: { prototypes: [prototype()], weightFunctions: functions() } }).toArtifact();
    assert.notEqual(withRadius.fingerprint, plain.fingerprint);
    assert.equal(new PackingContext({ ...base(), radiusComponent: { prototypes: [prototype()], weightFunctions: functions() } }).toArtifact().fingerprint, withRadius.fingerprint);
    // 长方体物品、轴不一致、未知物品、上下界颠倒、空列表都必须拒绝。
    // Cuboid items, wrong axes, unknown items, inverted bounds and empty lists must all be rejected.
    // 权重函数是必需的：缺失、系数为零、重复键都必须在边界报错。
    // Weight functions are mandatory: missing entries, zero coefficients and duplicate keys must fail at the boundary.
    for (const invalid of [{ prototypes: [prototype({ itemId: "ghost" })], weightFunctions: functions() },
        { prototypes: [prototype({ axis: "z" })], weightFunctions: functions() },
        { prototypes: [prototype({ lowerBound: meter(0.9), upperBound: meter(0.4) })], weightFunctions: functions() },
        { prototypes: [], weightFunctions: functions() },
        { prototypes: [prototype()], weightFunctions: [] },
        { prototypes: [prototype()], weightFunctions: [{ key: "weight", intercept: 0, radiusSquaredCoefficient: 0, objectiveWeight: 1 }] },
        { prototypes: [prototype()], weightFunctions: [...functions(), ...functions()] }]) {
        assert.throws(() => new PackingContext({ ...base(), radiusComponent: invalid }), { code: "InvalidInput" }, JSON.stringify(invalid));
    }
    // 目标策略：缺省、显式 none、带权重三者指纹互不相同，零权重与非有限权重必须拒绝。
    // Objective policy: absence, explicit none and a weighted variant all fingerprint differently, while zero and
    // non-finite weights must be rejected.
    const declaring = objective => ({ ...base(), radiusComponent: { prototypes: [prototype()], weightFunctions: functions(), ...(objective === undefined ? {} : { objective }) } });
    const fingerprints = [declaring(undefined), declaring("none"), declaring({ minimizeRadiusSquared: { weight: 2.5 } })].map(value => new PackingContext(value).toArtifact().fingerprint);
    assert.equal(new Set(fingerprints).size, 3);
    for (const weight of [0, Number.NaN]) assert.throws(() => new PackingContext(declaring({ minimizeRadiusSquared: { weight } })), { code: "InvalidInput" });
    // 未知策略名必须拒绝，不能被静默忽略。 / Unknown policy names must be rejected, never silently ignored.
    assert.throws(() => new PackingContext(declaring("maximize")), { code: "InvalidInput" });
});

test("BPP3D source roundtrips lossless counts, independent DTOs, fingerprints and disposal", async () => {
    await initialize();
    const input = problem(), context = new PackingContext(input), artifact = context.toArtifact();
    input.items[0].amount = 3n;
    const restored = PackingContext.fromArtifact(artifact);
    assert.equal(restored.toJson(), context.toJson());
    assert.equal(restored.problem().items[0].amount, 2n);
    assert.match(artifact.modelJson, /"amount":"2"/);
    const copy = context.problem(); copy.items[0].amount = 7n;
    assert.equal(context.problem().items[0].amount, 2n);
    context.dispose(); context.dispose();
    assert.throws(() => context.problem(), { code: "Disposed" });
    assert.equal(restored.toArtifact().fingerprint, artifact.fingerprint);
    restored.dispose();
    assert.throws(() => PackingContext.fromArtifact({ ...artifact, fingerprint: "foreign" }), { code: "FingerprintMismatch" });
    assert.throws(() => PackingContext.fromArtifact({ ...artifact, modelJson: `${artifact.modelJson} ` }), { code: "FingerprintMismatch" });
    assert.throws(() => PackingContext.fromArtifact({ ...artifact, modelJson: artifact.modelJson.replace('"schemaVersion":"1.0"', '"schemaVersion":"2.0"') }), { code: "UnsupportedProtocolVersion" });
});

test("BPP3D source rejects invalid units, unsafe counts, unsupported rules and physical traces", async () => {
    await initialize();
    for (const amount of [2, "2", 0n, -1n, 100001n, 9007199254740993n]) {
        const input = problem(); input.items[0].amount = amount;
        assert.throws(() => new PackingContext(input), { code: "InvalidInput" });
    }
    for (const mutate of [
        input => { input.items[0].weight.unit = "m"; },
        input => { input.bins[0].capacity.unit = "s"; },
        input => { input.items[0].width.value = NaN; },
        input => { input.items[0].width.value = 0; },
        input => { input.items[0].shape = { kind: "cylinder" }; },
        input => { input.rules = { custom: true }; },
        input => { input.callback = () => {}; },
        input => { input.items[0].orientations.push("side"); },
        input => { input.items.push({ ...input.items[0] }); },
        input => { input.initialLayers[0].binId = "foreign"; },
        input => { input.initialLayers[0].placements[0].itemId = "foreign"; },
        input => { input.initialLayers[0].placements[1].position.x.value = 0.5; },
        input => { input.initialLayers[0].placements[1].position.x.value = 2; },
        input => { input.initialLayers[0].placements[0].orientation = "lie"; },
        input => { input.bins[0].capacity.value = 0.9; },
    ]) {
        const input = problem(); mutate(input);
        assert.throws(() => new PackingContext(input), { code: "InvalidInput" });
    }
});

test("BPP3D permits repeated consistent bin types as separate candidates", async () => {
    await initialize();
    const input = problem(); input.bins.push({ ...input.bins[0], id: "bin-2", width: quantity(200, "cm") });
    const context = new PackingContext(input);
    assert.equal(context.problem().bins.length, 2); context.dispose();
    input.bins[1].capacity = quantity(2, "kg");
    assert.throws(() => new PackingContext(input), { code: "InvalidInput" });
});

test("BPP3D sources carry axis-aware cylinder geometry without bounding-square fakes", async () => {
    await initialize();
    const source = () => ({ items: [{ id: "drum", name: "Drum", width: { value: 1, unit: "m" }, height: { value: 1, unit: "m" }, depth: { value: 1, unit: "m" },
            weight: { value: 500, unit: "g" }, amount: 2n, orientations: ["upright"], shape: { kind: "cylinder", axis: "y", radius: { value: 0.5, unit: "m" } } }],
        bins: [{ id: "bin", typeCode: "box", width: { value: 2, unit: "m" }, height: { value: 1, unit: "m" }, depth: { value: 1, unit: "m" },
            capacity: { value: 1, unit: "kg" }, isMain: true }],
        initialLayers: [{ id: "layer", binId: "bin", depth: { value: 1, unit: "m" }, placements: [
            { itemId: "drum", position: { x: { value: 0, unit: "m" }, y: { value: 0, unit: "m" }, z: { value: 0, unit: "m" } }, orientation: "upright" },
            { itemId: "drum", position: { x: { value: 1, unit: "m" }, y: { value: 0, unit: "m" }, z: { value: 0, unit: "m" } }, orientation: "upright" }] }] });
    const context = new PackingContext(source()), artifact = context.toArtifact();
    assert.deepEqual(context.problem().items[0].shape, { kind: "cylinder", axis: "y", radius: { value: 0.5, unit: "m" } });
    const copy = PackingContext.fromArtifact(artifact);
    assert.equal(copy.toJson(), artifact.modelJson);
    // 半径超出横截面或未知形状必须被拒绝，而不是被当作方形容器静默接受。
    // A radius beyond the cross-section or an unknown shape must be rejected instead of silently accepted as a square container.
    const tooWide = source(); tooWide.items[0].shape = { kind: "cylinder", axis: "y", radius: { value: 0.7, unit: "m" } };
    assert.throws(() => new PackingContext(tooWide), { code: "InvalidInput" });
    const unknown = source(); unknown.items[0].shape = { kind: "prism" };
    assert.throws(() => new PackingContext(unknown), { code: "InvalidInput" });
    context.dispose(); copy.dispose();
});

test("BPP3D replays exact multi-layer and cross-bin plans without claiming a solve", async () => {
    await initialize();
    const input = problem(); input.items[0].amount = 4n; input.bins[0].depth = quantity(2); input.bins[0].capacity = quantity(2, "kg");
    input.bins.push({ ...input.bins[0], id: "bin-2" });
    input.initialLayers.push({ ...structuredClone(input.initialLayers[0]), id: "layer-2" });
    const context = new PackingContext(input), artifact = context.toArtifact();
    const packed = context.packLayers([{ binId: "bin-1", layerId: "layer-2" }, { binId: "bin-1", layerId: "layer" }]);
    assert.equal(packed.sourceFingerprint, artifact.fingerprint);
    assert.equal(packed.bins[0].binId, "bin-1");
    assert.deepEqual(packed.bins[0].placements.map(item => item.position.z.value), [0, 0, 1, 1]);
    const across = context.packLayers([{ binId: "bin-2", layerId: "layer" }, { binId: "bin-1", layerId: "layer" }]);
    assert.deepEqual(across.bins.map(bin => bin.binId), ["bin-1", "bin-2"]);
    for (const plan of [[], [{ binId: "bin-1", layerId: "layer" }], [{ binId: "other", layerId: "layer" }],
        [{ binId: "bin-1", layerId: "layer" }, { binId: "bin-1", layerId: "layer" }],
        [{ binId: "bin-1", layerId: "layer", extra: true }, { binId: "bin-2", layerId: "layer" }],
        Array.from({ length: 4097 }, () => ({ binId: "bin-1", layerId: "layer" })), null]) {
        assert.throws(() => context.packLayers(plan), { code: "InvalidInput" });
    }
    context.dispose();
    assert.equal(packed.bins[0].placements.length, 4);
    assert.throws(() => context.packLayers([]), { code: "Disposed" });

    for (const [property, value] of [["capacity", quantity(1, "kg")], ["depth", quantity(1)]]) {
        const invalid = structuredClone(input);
        for (const bin of invalid.bins) bin[property] = value;
        const checked = new PackingContext(invalid);
        assert.throws(() => checked.packLayers([{ binId: "bin-1", layerId: "layer" }, { binId: "bin-1", layerId: "layer-2" }]), { code: "InvalidInput" });
        checked.dispose();
    }
});

test("BPP3D execution reports reject malformed text and never claim an unverified round", async () => {
    await initialize();
    const context = new PackingContext(problem());
    for (const text of ["", "{", "null", "{}", JSON.stringify({ schemaVersion: "2.0" })]) {
        assert.throws(() => context.readExecutionReport(text), { code: "InvalidInput" });
    }
    assert.throws(() => context.readExecutionReport(undefined), { code: "InvalidInput" });
    assert.throws(() => ExecutionReport.fromJson("{}", context.toArtifact()), { code: "InvalidInput" });
    context.dispose();
});

test("BPP3D package attributes reach the source and are validated at the boundary", async () => {
    await initialize();
    const meter = value => ({ value, unit: "m" });
    const base = attributes => ({ items: [{ id: "item", name: "Item", width: meter(1), height: meter(1), depth: meter(1),
        weight: { value: 0.5, unit: "kg" }, amount: 2n, orientations: ["upright"] }],
        bins: [{ id: "bin", typeCode: "type", width: meter(2), height: meter(1), depth: meter(1), capacity: { value: 2, unit: "kg" }, isMain: true }],
        initialLayers: [{ id: "layer", binId: "bin", depth: meter(1), placements: [
            { itemId: "item", position: { x: meter(0), y: meter(0), z: meter(0) }, orientation: "upright" },
            { itemId: "item", position: { x: meter(1), y: meter(0), z: meter(0) }, orientation: "upright" }] }],
        ...(attributes ? { packageAttributes: attributes } : {}) });
    // 声明无损往返，且未声明的其它包属性不会被偷偷启用。
    // The declaration roundtrips losslessly and no other package rule is silently enabled.
    const context = new PackingContext(base([{ itemId: "item", maxStackLayers: 2, tags: ["fragile"] }]));
    const roundtripped = context.problem().packageAttributes;
    assert.deepEqual(roundtripped, [{ itemId: "item", maxStackLayers: 2, tags: ["fragile"] }]);
    context.dispose();
    // 空列表被省略，回读为 undefined 而不是空数组——按实际序列化行为断言。
    // An empty list is omitted and reads back as undefined rather than an empty array.
    const plain = new PackingContext(base(null));
    assert.equal(plain.problem().packageAttributes, undefined);
    plain.dispose();
    // 未知物品、重复条目、零层数与空标签都必须拒绝。
    // Unknown items, duplicate entries, zero layers and empty tags must all be rejected.
    for (const invalid of [[{ itemId: "ghost" }], [{ itemId: "item" }, { itemId: "item" }],
        [{ itemId: "item", maxStackLayers: 0 }], [{ itemId: "item", tags: [""] }]]) {
        assert.throws(() => new PackingContext(base(invalid)), { code: "InvalidInput" }, JSON.stringify(invalid));
    }
});

test("BPP3D execution reports surface the original continuous-radius entries", { skip: !process.env.OSPF_E2E_URL }, async () => {
    await initialize();
    const client = new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN });
    const meter = value => ({ value, unit: "m" });
    const build = (radius, objective) => new PackingContext({ items: [
        { id: "drum", name: "Drum", width: meter(1.8), height: meter(1.0), depth: meter(1.8), weight: { value: 0.5, unit: "kg" },
          amount: 2n, orientations: ["upright"], shape: { kind: "cylinder", axis: "y", radius: meter(0.5) } },
        { id: "box", name: "Box", width: meter(1), height: meter(1), depth: meter(1), weight: { value: 0.5, unit: "kg" },
          amount: 1n, orientations: ["upright"] }],
        bins: [{ id: "bin", typeCode: "type", width: meter(3), height: meter(2), depth: meter(3), capacity: { value: 10, unit: "kg" }, isMain: true }],
        initialLayers: [{ id: "layer", binId: "bin", depth: meter(1.8), placements: [
            { itemId: "drum", position: { x: meter(0.2), y: meter(0), z: meter(0) }, orientation: "upright" },
            { itemId: "drum", position: { x: meter(1.0), y: meter(0), z: meter(0.8) }, orientation: "upright" },
            { itemId: "box", position: { x: meter(2.0), y: meter(0), z: meter(0) }, orientation: "upright" }] }],
        ...(radius ? { radiusComponent: { prototypes: [{ itemId: "drum", source: "weight", axis: "y", lowerBound: meter(0.4), upperBound: meter(0.9) }],
            weightFunctions: [{ key: "weight", intercept: 0, radiusSquaredCoefficient: 1, objectiveWeight: 1 }],
            ...(objective === undefined ? {} : { objective }) } } : {}) }).toArtifact();
    const read = async artifact => {
        const view = await new Bpp3dOneRoundExecution(client, { backend: "scip" }).solve(artifact);
        return PackingContext.fromArtifact(artifact).readExecutionReport(view.reportJson);
    };
    // 无半径源：条目为空，报告仍可复验。 / Without a radius component the entries stay empty and the report still revalidates.
    const plain = await read(build(false));
    assert.deepEqual(plain.continuousRadius(), {});
    // 有半径源：条目含选中数量与每个变量的半径/平方/分段，且都来自原流程 info 的逐字副本。
    // With a radius component the entries carry the selected count and each variable's radius/squared/segment, verbatim
    // from the original flow info.
    const withRadius = await read(build(true));
    const entries = withRadius.continuousRadius();
    assert.equal(entries.continuous_radius_selected_count, "1");
    // 实际键名由领域 `solution_info_key` 生成，形如 `continuous_radius_selected_<var>`。
    // The real keys come from the domain's `solution_info_key` and look like `continuous_radius_selected_<var>`.
    assert.ok(entries.continuous_radius_selected_r_drum_weight, "expected the selected radius entry");
    assert.ok(entries.continuous_radius_selected_radius_squared_r_drum_weight, "expected the radius-squared entry");
    assert.ok(entries.continuous_radius_selected_segment_r_drum_weight, "expected the PWL segment entry");
    assert.equal(entries.continuous_radius_prototype_count, "1");
    assert.equal(entries.continuous_radius_objective_policy, "minimize_radius_squared");
    assert.equal(withRadius.summary().completed, true);
    // 显式目标策略必须真的改到原领域并出现在报告里；权重变体保持默认策略名。
    // An explicit objective policy must really reach the original domain and show up in the report; the weighted
    // variant keeps the same policy name.
    const withoutObjective = await read(build(true, "none"));
    assert.equal(withoutObjective.continuousRadius().continuous_radius_objective_policy, "none");
    assert.equal(withoutObjective.summary().completed, true);
    const weighted = await read(build(true, { minimizeRadiusSquared: { weight: 2.5 } }));
    assert.equal(weighted.continuousRadius().continuous_radius_objective_policy, "minimize_radius_squared");
    assert.equal(weighted.summary().completed, true);
});

test("BPP3D radius sources share the common budget and cancellation path", { skip: !process.env.OSPF_E2E_URL }, async () => {
    await initialize();
    const client = new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN });
    const meter = value => ({ value, unit: "m" });
    const source = new PackingContext({ items: [{ id: "drum", name: "Drum", width: meter(1.8), height: meter(1.0), depth: meter(1.8),
        weight: { value: 0.5, unit: "kg" }, amount: 2n, orientations: ["upright"],
        shape: { kind: "cylinder", axis: "y", radius: meter(0.5) } },
        { id: "box", name: "Box", width: meter(1), height: meter(1), depth: meter(1), weight: { value: 0.5, unit: "kg" },
          amount: 1n, orientations: ["upright"] }],
        bins: [{ id: "bin", typeCode: "type", width: meter(3), height: meter(2), depth: meter(3), capacity: { value: 10, unit: "kg" }, isMain: true }],
        initialLayers: [{ id: "layer", binId: "bin", depth: meter(1.8), placements: [
            { itemId: "drum", position: { x: meter(0.2), y: meter(0), z: meter(0) }, orientation: "upright" },
            { itemId: "drum", position: { x: meter(1.0), y: meter(0), z: meter(0.8) }, orientation: "upright" },
            { itemId: "box", position: { x: meter(2.0), y: meter(0), z: meter(0) }, orientation: "upright" }] }],
        radiusComponent: { prototypes: [{ itemId: "drum", source: "weight", axis: "y", lowerBound: meter(0.4), upperBound: meter(0.9) }],
            weightFunctions: [{ key: "weight", intercept: 0, radiusSquaredCoefficient: 1, objectiveWeight: 1 }] } }).toArtifact();
    // 取消在提交后立刻触发，作业必须以取消结束而不是继续跑完；这证明半径源走的是同一套取消路径。
    // Cancelling right after submission must end the job as cancelled instead of running to completion, proving radius
    // sources share the same cancellation path.
    const controller = new AbortController();
    const running = new Bpp3dOneRoundExecution(client, { backend: "scip" }).solve(source, { signal: controller.signal });
    // 等作业真正提交后再中止，才能覆盖提交后的合作取消路径；提交前中止只会得到 `Aborted`。
    // Abort only after the job was actually submitted, otherwise the pre-submission path returns `Aborted`.
    await new Promise(resolve => setTimeout(resolve, 30));
    controller.abort();
    const view = await running.catch(error => { assert.ok(["Cancelled", "Aborted"].includes(error.code), error.code); return null; });
    if (view !== null) assert.ok(["cancelled", "completed"].includes(view.status), view.status);
    // 极小时间预算也必须以真实终止原因结束，而不是无限等待。
    // A tiny time budget must end with a real termination reason rather than hanging.
    const bounded = await new Bpp3dOneRoundExecution(client, { backend: "scip" }).solve(source, { timeLimitMs: 1 });
    const report = JSON.parse(bounded.reportJson);
    assert.ok(["completed", "failed"].includes(bounded.status) || bounded.status === "cancelled", bounded.status);
    if (bounded.status === "completed") assert.ok(Array.isArray(report.stages) && report.stages.length >= 1);
});

test("BPP3D maxStackLayers really limits native block stacking", { skip: !process.env.OSPF_E2E_URL }, async () => {
    await initialize();
    const client = new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN });
    const meter = value => ({ value, unit: "m" });
    const solve = async attributes => {
        const source = new PackingContext({ items: [{ id: "item", name: "Item", width: meter(1), height: meter(0.5), depth: meter(1),
            weight: { value: 0.5, unit: "kg" }, amount: 4n, orientations: ["upright"] }],
            bins: [{ id: "bin", typeCode: "type", width: meter(2), height: meter(2), depth: meter(2), capacity: { value: 10, unit: "kg" }, isMain: true }],
            initialLayers: [{ id: "layer", binId: "bin", depth: meter(1), placements: [
                { itemId: "item", position: { x: meter(0), y: meter(0), z: meter(0) }, orientation: "upright" },
                { itemId: "item", position: { x: meter(1), y: meter(0), z: meter(0) }, orientation: "upright" }] }],
            ...(attributes ? { packageAttributes: attributes } : {}) }).toArtifact();
        const view = await new Bpp3dOneRoundExecution(client, { backend: "scip", generators: ["block"] }).solve(source);
        return JSON.parse(view.reportJson);
    };
    // `max_stack_layers` 由原块生成器读取，因此把上限压到 1 时生成的列不应比不设限更高。
    // The original block generator reads `max_stack_layers`, so capping it at 1 must not yield taller columns than the
    // uncapped run.
    const uncapped = await solve(null), capped = await solve([{ itemId: "item", maxStackLayers: 1 }]);
    assert.equal(capped.failure, undefined);
    assert.deepEqual(capped.stages.map(stage => stage.kind), uncapped.stages.map(stage => stage.kind));
    const height = report => Math.max(...report.stages.flatMap(stage => (stage.generated ?? []).flatMap(column =>
        (column.blocks ?? []).map(block => block.ny))));
    assert.ok(height(capped) <= height(uncapped), `capped ${height(capped)} > uncapped ${height(uncapped)}`);
});

test("BPP3D discrete radius candidates drive native circle-packing layer generation", { skip: !process.env.OSPF_E2E_URL }, async () => {
    await initialize();
    const client = new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN });
    const meter = value => ({ value, unit: "m" });
    const solve = async candidates => {
        const source = new PackingContext({ items: [{ id: "drum", name: "Drum", width: meter(1.8), height: meter(1.0), depth: meter(1.8),
            weight: { value: 0.5, unit: "kg" }, amount: 2n, orientations: ["upright"],
            shape: { kind: "cylinder", axis: "y", radius: meter(0.5), ...(candidates ? { radius_candidates: candidates } : {}) } }],
            bins: [{ id: "bin", typeCode: "type", width: meter(3), height: meter(2), depth: meter(3), capacity: { value: 2, unit: "kg" }, isMain: true }],
            initialLayers: [{ id: "layer", binId: "bin", depth: meter(1.8), placements: [
                { itemId: "drum", position: { x: meter(0.2), y: meter(0), z: meter(0) }, orientation: "upright" },
                { itemId: "drum", position: { x: meter(1.0), y: meter(0), z: meter(0.8) }, orientation: "upright" }] }] }).toArtifact();
        const view = await new Bpp3dOneRoundExecution(client, { backend: "scip", generators: ["circlePacking"] }).solve(source);
        return JSON.parse(view.reportJson);
    };
    // 圆装箱生成器只接受圆柱；有候选与无候选都必须产出同一套合法阶段，且流程不失败。
    // The circle-packing generator only accepts cylinders; with or without candidates both must produce the same legal
    // stages and must not fail.
    const plain = await solve(null), withCandidates = await solve({ min: meter(0.3), max: meter(0.5), step: meter(0.1) });
    assert.deepEqual(plain.stages.map(stage => stage.kind), withCandidates.stages.map(stage => stage.kind));
    assert.equal(withCandidates.failure, undefined);
});

test("BPP3D radius component registers real radius variables in the native final model", { skip: !process.env.OSPF_E2E_URL }, async () => {
    await initialize();
    const client = new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN });
    const meter = value => ({ value, unit: "m" });
    const problem = radius => ({ items: [
        { id: "drum", name: "Drum", width: meter(1.8), height: meter(1.0), depth: meter(1.8), weight: { value: 0.5, unit: "kg" },
          amount: 2n, orientations: ["upright"], shape: { kind: "cylinder", axis: "y", radius: meter(0.5) } },
        { id: "box", name: "Box", width: meter(1), height: meter(1), depth: meter(1), weight: { value: 0.5, unit: "kg" },
          amount: 1n, orientations: ["upright"] },
    ], bins: [{ id: "bin", typeCode: "type", width: meter(3), height: meter(2), depth: meter(3), capacity: { value: 10, unit: "kg" }, isMain: true }],
        initialLayers: [{ id: "layer", binId: "bin", depth: meter(1.8), placements: [
            { itemId: "drum", position: { x: meter(0.2), y: meter(0), z: meter(0) }, orientation: "upright" },
            { itemId: "drum", position: { x: meter(1.0), y: meter(0), z: meter(0.8) }, orientation: "upright" },
            { itemId: "box", position: { x: meter(2.0), y: meter(0), z: meter(0) }, orientation: "upright" }] }],
        ...(radius ? { radiusComponent: { prototypes: [{ itemId: "drum", source: "weight", axis: "y", lowerBound: meter(0.4), upperBound: meter(0.9) }],
            weightFunctions: [{ key: "weight", intercept: 0, radiusSquaredCoefficient: 1, objectiveWeight: 1 }] } } : {}) });
    const solve = async source => {
        const view = await new Bpp3dOneRoundExecution(client, { backend: "scip" }).solve(new PackingContext(source).toArtifact());
        return { view, report: JSON.parse(view.reportJson) };
    };
    // 不带组件时报告里不应出现半径变量；带组件时 final 阶段必须注册真实半径与 PWL 变量且流程不失败。
    // Without the component no radius variable appears; with it the final stage must register real radius and PWL
    // variables and the flow must not fail.
    const baseline = await solve(problem(false));
    assert.equal(baseline.report.stages.at(-1).kind, "final");
    assert.doesNotMatch(baseline.view.reportJson, /r_drum_weight/);
    const withRadius = await solve(problem(true));
    assert.equal(withRadius.report.stages.at(-1).kind, "final");
    assert.equal(withRadius.report.failure, undefined);
    for (const name of ["r_drum_weight_radius", "r_drum_weight_radius_squared", "r_drum_weight_seg_"]) {
        assert.match(withRadius.view.reportJson, new RegExp(name), `expected ${name} in the final model`);
    }
});

test("BPP3D real native one-round reports revalidate lifecycle stages and expose strict packing", { skip: !process.env.OSPF_BPP3D_FIXTURE_DIR }, async () => {
    await initialize();
    const directory = process.env.OSPF_BPP3D_FIXTURE_DIR;
    const files = readdirSync(directory).filter(name => name.startsWith("bpp3d-execution-") && name.endsWith(".json"));
    assert.ok(files.length >= 1, "expected native BPP3D execution fixtures");
    let packed = 0, retracted = 0;
    for (const name of files) {
        for (const fixture of JSON.parse(readFileSync(`${directory}/${name}`, "utf8"))) {
            const text = fixture.reportJson, source = fixture.source;
            const context = PackingContext.fromArtifact(source), report = context.readExecutionReport(text);
            const summary = report.summary(), stages = report.stages();
            assert.equal(summary.candidateComplete, false);
            assert.equal(summary.sourceFingerprint, source.fingerprint);
            assert.equal(summary.stageCount, stages.length);
            assert.ok(stages.length >= 1 && stages.length <= 3);
            assert.equal(summary.finalStage === null || summary.finalStage === undefined, stages.length < 3);
            assert.equal(summary.completed, summary.failure === null || summary.failure === undefined);
            assert.match(report.stagePoolJson(0), /sourceFingerprint/);
            assert.equal(report.stagePoolJson(stages.length), undefined);
            for (let index = 0; index < stages.length; index += 1) {
                const hasChild = report.stageReportJson(index) !== undefined;
                assert.equal(hasChild, stages[index].problemStatus !== null && stages[index].problemStatus !== undefined);
                assert.ok(report.stageJson(index).length > 0);
            }
            if (stages.length === 3) assert.equal(report.stagePoolJson(1), report.stagePoolJson(2));
            const restored = ExecutionReport.fromJson(text, source);
            assert.equal(restored.toJson(), text);
            assert.equal(restored.source().fingerprint, source.fingerprint);
            const packing = report.packing();
            if (fixture.packingJson === null) {
                assert.equal(packing, undefined);
                assert.equal(summary.hasPacking, false);
                retracted += 1;
            } else {
                assert.equal(packing.toJson(), fixture.packingJson);
                assert.equal(summary.hasPacking, true);
                assert.equal(packing.sourceFingerprint(), source.fingerprint);
                assert.ok(packing.bins().length >= 1);
                packed += 1;
            }
            // 独立所有权：报告释放后装箱仍可用 / Independent ownership: packing survives its report.
            report.dispose();
            if (packing) assert.ok(packing.toJson().length > 0);
            assert.throws(() => report.summary(), { code: "Disposed" });
            packing?.dispose();
            if (packing) assert.throws(() => packing.toJson(), { code: "Disposed" });

            assert.throws(() => ExecutionReport.fromJson(text, { ...source, fingerprint: "foreign" }), { code: "FingerprintMismatch" });
            const wire = JSON.parse(text);
            assert.throws(() => ExecutionReport.fromJson(JSON.stringify({ ...wire, sourceFingerprint: "foreign" }), source), { code: "FingerprintMismatch" });
            assert.throws(() => ExecutionReport.fromJson(JSON.stringify({ ...wire, replayLimit: 0 }), source), { code: "InvalidInput" });
            if (wire.stages.length > 1) assert.throws(() => ExecutionReport.fromJson(JSON.stringify({ ...wire, stages: [...wire.stages].reverse() }), source), { code: "InvalidInput" });
            assert.throws(() => ExecutionReport.fromJson(JSON.stringify({ ...wire, extra: true }), source), { code: "InvalidInput" });
            assert.throws(() => ExecutionReport.fromJson(JSON.stringify({ ...wire, stages: wire.stages.slice(0, -1).concat(wire.stages.slice(0, -1)) }), source), { code: "InvalidInput" });
            restored.dispose();
            context.dispose();
        }
    }
    assert.ok(packed >= 1, "expected at least one strictly packed round");
    assert.ok(retracted >= 1, "expected at least one retained-but-unpacked round");
});

test("BPP3D one-round strategy validates bounded budgets and requires an advertised capability", async () => {
    await initialize();
    const artifact = { modelJson: "{}", fingerprint: "expected" };
    const running = { protocolVersion: 1, id: "1", fingerprint: "expected", status: "running", reportJson: null, progressJson: null, error: null };
    const backend = { id: "scip", compiled: true, capabilities: ["linear", "mip"], warnings: [] };
    let host = { protocolVersion: 1, backends: [backend, { id: "bpp3d", compiled: true, capabilities: ["bpp3d", "bpp3dOneRoundExecution"], warnings: [] }] };
    let request;
    const client = {
        async capabilities() { return host; },
        async submit(value) { request = value; return { ...running, status: "completed", reportJson: "round-report" }; },
        async get() { return running; }, async cancel() { return running; }, async release() {},
    };
    for (const configuration of [null, { backend: "cplex" }, { backend: "scip", reportLimit: 0 }, { backend: "scip", reportLimit: 1025 },
        { backend: "scip", maxPlacements: 0 }, { backend: "scip", maxPlacements: 100_001 }, { backend: "scip", callback() {} },
        { backend: "scip", generators: [] }, { backend: "scip", generators: ["block", "block"] }, { backend: "scip", generators: ["unknown"] },
        { backend: "scip", generators: ["block", "blLocal", "blGlobal", "circlePacking", "pattern", "pile", "historical", "block"] }]) {
        assert.throws(() => new Bpp3dOneRoundExecution(client, configuration), { code: "InvalidInput" });
    }
    const execution = new Bpp3dOneRoundExecution(client, { backend: "scip", generators: ["block", "blLocal"], reportLimit: 4, maxPlacements: 4096 });
    assert.equal((await execution.solve(artifact)).reportJson, "round-report");
    assert.equal(request.solver, "bpp3d"); assert.equal(request.modelKind, "bpp3d");
    assert.deepEqual(request.bpp3dOptions, { backend: "scip", generators: ["block", "blLocal"], reportLimit: 4, maxPlacements: 4096 });
    host = { ...host, backends: [backend, { ...host.backends[1], capabilities: ["bpp3d"] }] };
    await assert.rejects(execution.solve(artifact), { code: "UnsupportedCapability" });
    host = { ...host, backends: [backend, { ...host.backends[1], compiled: false, capabilities: ["bpp3d", "bpp3dOneRoundExecution"] }] };
    await assert.rejects(execution.solve(artifact), { code: "BackendNotCompiled" });
});

test("BPP3D one-round flow runs over an explicit HTTP host and revalidates in WASM", { skip: !process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN }, async () => {
    await initialize();
    const client = new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN });
    const source = new PackingContext({
        items: [{ id: "item", name: "Item", width: { value: 1, unit: "m" }, height: { value: 1, unit: "m" }, depth: { value: 1, unit: "m" },
            weight: { value: 500, unit: "g" }, amount: 2n, orientations: ["upright"] }],
        bins: [{ id: "one", typeCode: "type", width: { value: 1, unit: "m" }, height: { value: 1, unit: "m" }, depth: { value: 1, unit: "m" }, capacity: { value: 1, unit: "kg" }, isMain: true },
            { id: "two", typeCode: "type", width: { value: 1, unit: "m" }, height: { value: 1, unit: "m" }, depth: { value: 1, unit: "m" }, capacity: { value: 1, unit: "kg" }, isMain: true }],
        initialLayers: [{ id: "layer", binId: "one", depth: { value: 1, unit: "m" },
            placements: [{ itemId: "item", position: { x: { value: 0, unit: "m" }, y: { value: 0, unit: "m" }, z: { value: 0, unit: "m" } }, orientation: "upright" }] }],
    });
    const artifact = source.toArtifact(); source.dispose();
    let progress = 0;
    const job = await new Bpp3dOneRoundExecution(client, { backend: "scip" })
        .solve(artifact, { timeLimitMs: 30_000, pollIntervalMs: 5, onProgress() { progress += 1; } });
    try {
        const report = ExecutionReport.fromJson(job.reportJson, artifact);
        const summary = report.summary();
        assert.equal(summary.candidateComplete, false);
        assert.equal(summary.completed, true);
        assert.equal(summary.stageCount, 3);
        const packing = report.packing();
        assert.ok(packing.bins().length >= 1);
        assert.equal(packing.sourceFingerprint(), artifact.fingerprint);
        packing.dispose(); report.dispose();
        assert.ok(progress >= 1);
    } finally { await client.release(job.id); }
});
