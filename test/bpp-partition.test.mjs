import assert from "node:assert/strict";
import test from "node:test";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { initialize } from "../dist/node.js";
import { SCIPSolver } from "../dist/framework.js";
import { DiscreteLoadingContext, PartitionLoadingContext, PartitionLoadingBatch } from "../dist/bpp.js";
import { summarizeReport } from "../dist/core.js";

await initialize();

function source() {
    return new DiscreteLoadingContext({ items: [{ id: "cargo", weight: { value: 1000, unit: "g" }, required: false, fixedPositionId: null }],
        positions: ["a", "b"].map(id => ({ id, maxCount: 18_446_744_073_709_551_615n, maxWeight: { value: 2, unit: "kg" }, fixedOccupied: false, enabled: true })),
        allowedAssignments: ["a", "b"].map(positionId => ({ itemId: "cargo", positionId })), conflicts: [], layoutGroups: [], weightUnit: "kg" },
    { itemCosts: { cargo: -5 }, positionCosts: { a: 1, b: 1 }, layoutCosts: [] },
    [{ id: "ballast", positionId: "a", minimumWeight: { value: 0, unit: "kg" }, maximumWeight: { value: 1, unit: "kg" }, minimumPerLoadedWeight: 0.5, costPerWeight: 2 }]);
}

const options = () => ({ partitions: [{ id: "left", positionIds: ["a"] }, { id: "right", positionIds: ["b"] }], refinableResources: ["ballast"] });
function decisions(context, partitionId, loaded, resource = 1) {
    return new Map(context.decisions().filter(decision => decision.partitionId === partitionId).map(decision => [decision.id, decision.role === "resource" ? resource : Number(loaded)]));
}
function selected(master) {
    const indices = [...master.columnIndices().values(), ...master.globalBindings().map(binding => binding.masterIndex)];
    const values = new Float64Array(Math.max(-1, ...indices) + 1);
    for (const index of master.columnIndices().values()) values[index] = 1;
    return values;
}

test("partition ownership is exhaustive, explicit and independent of the source context lifetime", () => {
    const original = source(), artifact = original.toArtifact(), configured = options(), context = original.partition(configured);
    original.dispose(); configured.partitions[0].positionIds.length = 0;
    assert.deepEqual(context.options(), options()); assert.deepEqual(context.toArtifact(), artifact); assert.equal(context.decisions().length, 5);
    const noRefinement = new PartitionLoadingContext(artifact, { partitions: options().partitions });
    assert.deepEqual(noRefinement.options().refinableResources, []); noRefinement.dispose();
    const resource = context.decisions().find(decision => decision.role === "resource"); assert.equal(resource.partitionId, "left"); assert.equal(resource.resourceId, "ballast");
    for (const invalid of [{ partitions: [] }, { ...options(), refinableResources: ["missing"] }, { ...options(), refinableResources: ["ballast", "ballast"] },
        { ...options(), callback() {} }, { ...options(), partitions: [{ id: "left", positionIds: ["a", "b"] }, { id: "right", positionIds: ["b"] }] }]) {
        assert.throws(() => new PartitionLoadingContext(artifact, invalid), { code: "InvalidInput" });
    }
    context.dispose(); assert.throws(() => context.decisions(), { code: "Disposed" });
});

test("partition batches are atomic, resource completion freezes profiles and stale or foreign masters are rejected", () => {
    const original = source(), artifact = original.toArtifact(), context = original.partition(options()); original.dispose();
    context.addColumns([ { partitionId: "left", decisions: decisions(context, "left", true) }, { partitionId: "right", decisions: decisions(context, "right", false, 0) } ]);
    const master = context.master({ integer: true, refineResources: true }), values = selected(master), resource = context.decisions().find(decision => decision.resourceId === "ballast");
    const binding = master.globalBindings().find(binding => binding.sourceIndex === resource.variableIndex); values[binding.masterIndex] = 0.5;
    const plan = context.extractSolution(master, values); assert.equal(plan.loadedCount(), 1n); assert.equal(plan.resources().weights.ballast.value, 0.5);
    const before = context.columns(); assert.equal(before[0].counts.get("a"), 1n); assert.equal(before[0].weights.a.unit, "kg");
    assert.throws(() => context.addColumns([{ partitionId: "left", decisions: decisions(context, "left", false, 0) }, { partitionId: "right", decisions: new Map() }]), { code: "InvalidInput" });
    assert.deepEqual(context.columns(), before); context.sourceValues(master, values);
    const foreign = new PartitionLoadingContext(artifact, options()); assert.throws(() => foreign.sourceValues(master, values), { code: "InvalidInput" }); foreign.dispose();
    assert.throws(() => context.sourceValues(master, []), { code: "InvalidInput" });
    assert.throws(() => context.addColumns([{ partitionId: "left", decisions: new Map([[resource.id, Infinity]]) }]), { code: "InvalidInput" });
    context.materializeCompletedResources(master, values); assert.equal(context.columns().length, 3); assert.throws(() => context.sourceValues(master, values), { code: "InvalidInput" });
    const finalMaster = context.master({ integer: true }); assert.equal(finalMaster.globalBindings().length, 0);
    const finalValues = new Float64Array(finalMaster.columnIndices().size);
    for (const column of context.columns()) if (column.partitionId === "right" || column.decisions.get(resource.id) === 0.5) finalValues[finalMaster.columnIndices().get(column.id)] = 1;
    const finalPlan = context.extractSolution(finalMaster, finalValues); assert.equal(finalPlan.loadedCount(), 1n);
    context.dispose(); assert.ok(master.toModel().fingerprint); master.dispose(); finalMaster.dispose(); assert.equal(plan.resources().weights.ballast.value, 0.5); plan.dispose(); finalPlan.dispose();
    assert.throws(() => master.toModel(), { code: "Disposed" });
});

test("pricing snapshots own their lifetime and reject bare duals or expired seed requests", () => {
    const original = source(), context = original.partition(options()); original.dispose();
    const seed = context.seedPricing("left", false); assert.equal(seed.partitionId(), "left");
    assert.equal(seed.reducedCost(decisions(context, "left", true, 0.5)), -3);
    assert.throws(() => seed.reducedCost(new Map()), { code: "InvalidInput" });
    const batch = new PartitionLoadingBatch(); batch.add(seed, [decisions(context, "left", true, 0.5)]); seed.dispose();
    const master = context.master({ phaseOne: true });
    assert.throws(() => context.acceptLpReport(master, { dual: [] }), { code: "InvalidInput" });
    assert.throws(() => context.pricing(master, "left", true), { code: "InvalidInput" });
    assert.throws(() => context.addPricedBatch(master, batch), { code: "InvalidInput" });
    const pricing = context.seedPricing("right"); context.dispose(); assert.ok(pricing.toModel().fingerprint);
    assert.throws(() => seed.toModel(), { code: "Disposed" }); pricing.dispose(); master.dispose(); batch.dispose(); assert.throws(() => batch.add(pricing, []), { code: "Disposed" });
});

test("compiled child execution requires an explicit capability and never downgrades to ordinary linear", async () => {
    const requests = [], view = { protocolVersion: 1, id: "job", fingerprint: "x", status: "completed", reportJson: "raw", error: null, progressJson: null };
    let capabilities = ["linear"];
    const client = { capabilities: async () => ({ protocolVersion: 1, backends: [{ id: "scip", compiled: true, capabilities, warnings: [] }] }),
        submit: async request => { requests.push(request); return view; }, get: async () => view, cancel: async () => view, release: async () => {} };
    const solver = new SCIPSolver(client);
    await assert.rejects(solver.solveCompiledLinear({ modelJson: "opaque", fingerprint: "x" }), { code: "UnsupportedCapability" }); assert.equal(requests.length, 0);
    capabilities = ["linear", "compiledLinear"]; await solver.solveCompiledLinear({ modelJson: "opaque", fingerprint: "x" }); assert.equal(requests[0].modelKind, "compiledLinear");
});

test("portable partition objects revalidate real compiled LP, local pricing and resource completion reports", { skip: !process.env.OSPF_BPP_LOADING_FIXTURE_DIR }, async () => {
    const directory = process.env.OSPF_BPP_LOADING_FIXTURE_DIR, files = (await readdir(directory)).filter(name => /^bpp-partition-(scip|gurobi)\.json$/.test(name)); assert.ok(files.length);
    for (const file of files) {
        const fixture = JSON.parse(await readFile(join(directory, file), "utf8")), context = new PartitionLoadingContext(fixture.source, fixture.options);
        context.addColumns(fixture.seed.map(column => ({ ...column, decisions: new Map(Object.entries(column.decisions)) })));
        const master = context.master(), lp = fixture.stages[0]; assert.deepEqual(master.toModel(), lp.model); context.acceptLpReport(master, lp.reportJson);
        const batch = new PartitionLoadingBatch();
        for (const stage of fixture.stages.slice(1, 3)) {
            const pricing = context.pricing(master, stage.kind), text = stage.reportJson.replace(/"nodes":(?:null|\d+)/g, '"nodes":18446744073709551615');
            assert.deepEqual(pricing.toModel(), stage.model); const read = pricing.readReport(text); assert.equal(read.reportJson, text); assert.ok(read.optimal);
            batch.add(pricing, read.decisions ? [read.decisions] : []); pricing.dispose();
        }
        context.addPricedBatch(master, batch); batch.dispose(); master.dispose();
        const refinement = context.master({ integer: true, refineResources: true }), refineStage = fixture.stages[3]; assert.deepEqual(refinement.toModel(), refineStage.model);
        context.materializeCompletedResources(refinement, new Float64Array(summarizeReport(refineStage.reportJson).values)); refinement.dispose();
        const finalMaster = context.master({ integer: true }), finalStage = fixture.stages[4]; assert.deepEqual(finalMaster.toModel(), finalStage.model);
        const plan = context.extractSolution(finalMaster, new Float64Array(summarizeReport(finalStage.reportJson).values)); context.dispose(); finalMaster.dispose();
        assert.equal(plan.toJson(), fixture.resultJson); plan.dispose();
    }
});
