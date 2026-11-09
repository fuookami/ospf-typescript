import assert from "node:assert/strict";
import test from "node:test";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { initialize } from "../dist/node.js";
import { PackingContext, Bpp2dReport, Bpp2dColumnGeneration } from "../dist/bpp2d.js";

function problem() {
    return { items: [{ id: "a", name: "A", shape: { kind: "rectangle", width: { value: 100, unit: "cm" }, height: { value: 1, unit: "m" } }, allowRotate: false, generationCount: 3n }],
        sheets: [{ id: "s", geometry: { width: { value: 2, unit: "m" }, height: { value: 1, unit: "m" } }, isMain: true }],
        demands: [{ kind: "count", itemId: "a", count: 3n, upperBound: null }], initialLayers: [], kerf: { value: 0, unit: "m" },
        objective: { sheetAreaWeight: 1, sheetAmountWeight: 0.000001, sheetTypeCostWeight: 0, sheetTypeCosts: {}, rmpAreaCoefficient: 1 } };
}

function client(capabilities = ["bpp2d", "bpp2dColumnGeneration"], backendCapabilities = ["linear", "mip"]) {
    const requests = [], view = { id: "job", protocolVersion: 1, fingerprint: "source", status: "completed", reportJson: "opaque report", progressJson: null, error: null };
    return { requests, capabilities: async () => ({ protocolVersion: 1, backends: [
        { id: "bpp2d", compiled: true, capabilities, warnings: [] }, { id: "scip", compiled: true, capabilities: backendCapabilities, warnings: [] },
    ] }), submit: async request => { requests.push(request); return view; }, get: async () => view, cancel: async () => view, release: async () => {} };
}

test("BPP2D native configuration is bounded, explicit and rejects callbacks or unsupported rules", () => {
    for (const configuration of [{}, null, { backend: "fake" }, { backend: "scip", pricing() {} }, { backend: "scip", iterationLimit: 65 },
        { backend: "scip", iterationLimit: -1 }, { backend: "scip", candidatesPerIteration: 0 }, { backend: "scip", poolLimit: 513 },
        { backend: "scip", reportLimit: NaN }, { backend: "scip", generators: [] }, { backend: "scip", generators: ["pattern", "pattern"] },
        { backend: "scip", generators: ["custom"] }, { backend: "scip", finalMilpEnabled: null }, { backend: "scip", reducedCostTolerance: Infinity },
        { backend: "scip", reducedCostTolerance: 0.5 }, { backend: "scip", massLimit: 10 }]) {
        assert.throws(() => new Bpp2dColumnGeneration(client(), configuration), { code: "InvalidInput" });
    }
    assert.doesNotThrow(() => new Bpp2dColumnGeneration(client(), { backend: "scip", iterationLimit: 0, finalMilpEnabled: false }));
});

test("BPP2D facade snapshots generated-contract configuration and never downgrades the model kind", async () => {
    const transport = client(), configuration = { backend: "scip", generators: ["pattern", "history"], iterationLimit: 0, poolLimit: 10 };
    const solver = new Bpp2dColumnGeneration(transport, configuration); configuration.generators[0] = "custom"; configuration.poolLimit = 500;
    const source = { modelJson: "opaque source", fingerprint: "source" };
    await solver.solve(source, { timeLimitMs: 100 });
    const request = transport.requests[0]; assert.equal(request.solver, "bpp2d"); assert.equal(request.modelKind, "bpp2d");
    assert.deepEqual(request.bpp2dOptions.generators, ["pattern", "history"]); assert.equal(request.bpp2dOptions.poolLimit, 10); assert.equal(request.bpp2dOptions.iterationLimit, 0);
    assert.equal(request.timeLimitMs, 100); request.bpp2dOptions.generators[0] = "custom";
    await solver.solve(source); assert.equal(transport.requests[1].bpp2dOptions.generators[0], "pattern");
});

test("BPP2D requires domain, algorithm and explicit native LP/MIP capabilities before submission", async () => {
    const source = { modelJson: "opaque source", fingerprint: "source" };
    for (const [transport, code] of [[client([]), "UnsupportedCapability"], [client(["bpp2d"]), "UnsupportedCapability"],
        [client(undefined, ["linear"]), "BackendNotCompiled"], [client(undefined, []), "BackendNotCompiled"]]) {
        await assert.rejects(new Bpp2dColumnGeneration(transport, { backend: "scip" }).solve(source), { code }); assert.equal(transport.requests.length, 0);
    }
    const controller = new AbortController(); controller.abort(); const transport = client();
    await assert.rejects(new Bpp2dColumnGeneration(transport, { backend: "scip" }).solve(source, { signal: controller.signal }), { code: "Aborted" });
    assert.equal(transport.requests.length, 0);
});

test("BPP2D portable source validation uses generated contracts, exact input counts and independent artifacts", async () => {
    await initialize();
    const context = new PackingContext(problem()), artifact = context.toArtifact(), restored = PackingContext.fromArtifact(artifact);
    assert.equal(restored.toJson(), context.toJson()); context.validateLayers([]); context.dispose(); context.dispose();
    assert.throws(() => context.toArtifact(), { code: "Disposed" }); assert.equal(restored.toArtifact().fingerprint, artifact.fingerprint); restored.dispose();
    assert.throws(() => PackingContext.fromArtifact({ ...artifact, fingerprint: "foreign" }), { code: "FingerprintMismatch" });
    for (const value of [3, -1n, 9007199254740992n, "3"]) {
        const input = problem(); input.demands[0].count = value;
        assert.throws(() => new PackingContext(input), { code: "InvalidInput" });
    }
    for (const mutate of [input => input.items[0].generationCount = 4097n, input => input.items[0].generationCount = 1,
        input => input.kerf.value = NaN, input => input.kerf.unit = "s", input => input.callback = () => {},
        input => input.demands[0].upperBound = 2n, input => input.items.push(input.items[0]), input => input.demands[0].itemId = "foreign"]) {
        const input = problem(); mutate(input); assert.throws(() => new PackingContext(input), { code: "InvalidInput" });
    }
});

test("BPP2D real native reports revalidate all stages on WASM and retain precise raw counters and independent production", { skip: !process.env.OSPF_BPP2D_FIXTURE_DIR }, async () => {
    await initialize();
    const directory = process.env.OSPF_BPP2D_FIXTURE_DIR;
    const files = (await readdir(directory)).filter(name => /^bpp2d-execution-(scip|gurobi)\.json$/.test(name));
    assert.ok(files.length > 0);
    for (const file of files) {
        for (const fixture of JSON.parse(await readFile(join(directory, file), "utf8"))) {
            const wire = JSON.parse(fixture.reportJson);
            if (wire.stages.length) wire.stages[0].solverReportJson = wire.stages[0].solverReportJson.replace(/"nodes":(?:null|\d+)/g, '"nodes":18446744073709551615');
            const text = JSON.stringify(wire), context = PackingContext.fromArtifact(fixture.source), report = context.readExecutionReport(text);
            const restored = Bpp2dReport.fromJson(text, fixture.source);
            assert.equal(report.toJson(), text); assert.equal(restored.toJson(), text);
            assert.deepEqual(restored.summary(), report.summary()); restored.dispose();
            const summary = report.summary(); assert.equal(summary.candidateComplete, false); assert.equal(summary.columnCount, report.columns().length);
            assert.equal(report.stages().length, summary.stageCount); assert.equal(report.iterations().length, summary.iterationCount);
            assert.equal(report.stageJson(0xffff_ffff), undefined); assert.equal(report.stageReportJson(summary.stageCount), undefined);
            for (const index of [-1, 0.5, NaN, Infinity, 0x1_0000_0000]) assert.throws(() => report.stageJson(index), { code: "InvalidInput" });
            for (let index = 0; index < summary.stageCount; index++) {
                assert.equal(report.stageReportJson(index), wire.stages[index].solverReportJson);
                assert.deepEqual(JSON.parse(report.stageJson(index)).model, wire.stages[index].model);
            }
            if (summary.stageCount) assert.match(report.stageReportJson(0), /"nodes":18446744073709551615/);
            const production = report.production(), copy = report.production(), packing = report.packing();
            assert.equal(packing !== undefined, production !== undefined);
            if (packing) {
                assert.equal(packing.sourceFingerprint(), fixture.source.fingerprint);
                assert.equal(packing.sheetCount(), [...production.sheetCounts().values()].reduce((sum, count) => sum + count, 0n));
                for (const [id, count] of packing.materialCounts()) assert.equal(count, production.producedCounts().get(id));
                assert.deepEqual(packing.consumedArea(), production.consumedArea());
                assert.deepEqual(packing.patterns().map(pattern => pattern.usage), production.usages());
            }
            assert.equal(production?.toJson() ?? null, fixture.productionJson); context.dispose(); report.dispose(); production?.dispose();
            assert.throws(() => report.summary(), { code: "Disposed" }); assert.equal(copy?.toJson() ?? null, fixture.productionJson);
            if (copy) { assert.equal(typeof copy.producedCounts().get("a"), "bigint"); assert.equal(copy.consumedArea().unit, "m^2"); copy.dispose(); }
            if (packing) { assert.equal(typeof packing.itemCount(), "bigint"); packing.dispose(); packing.dispose(); assert.throws(() => packing.patterns(), { code: "Disposed" }); }
            const bad = { ...wire, finalStage: 0xffff_ffff };
            assert.throws(() => Bpp2dReport.fromJson(JSON.stringify(bad), fixture.source), { code: "InvalidInput" });
        }
    }
});

test("BPP2D portable packer/render adapter retains independent layouts, ordering, units and conservative remnants", async () => {
    await initialize();
    const source = problem(), context = new PackingContext(source);
    const shape = { kind: "rectangle", width: { value: 1, unit: "m" }, height: { value: 1, unit: "m" } };
    const placement = x => ({ shape, position: { x: { value: x, unit: "m" }, y: { value: 0, unit: "m" } }, rotated: false, itemId: "a" });
    const columns = [{ sheetId: "s", envelope: source.sheets[0].geometry, placements: [placement(1), placement(0)] }];
    const packed = context.packLayers(columns), second = context.packLayers([{ ...columns[0], placements: [placement(0)] }]);
    const empty = context.packLayers([]); assert.equal(empty.itemCount(), 0n); assert.equal(empty.sheetCount(), 0n); assert.equal(empty.materialCounts().size, 0); empty.dispose();
    assert.equal(packed.sheetCount(), 1n); assert.equal(packed.itemCount(), 2n);
    assert.deepEqual(packed.patterns()[0].render.placements.map(item => item.loadingOrder), [1, 0]);
    assert.equal(packed.patterns()[0].render.loadingRate, 1); assert.equal(packed.patterns()[0].remnants.length, 0);
    assert.deepEqual(second.remnantArea(), { value: 1, unit: "m^2" });
    assert.deepEqual(second.materialCounts(), new Map([["a", 1n]]));
    const changed = second.patterns(); changed[0].render.placements[0].loadingOrder = 77;
    assert.equal(second.patterns()[0].render.placements[0].loadingOrder, 0);
    const bad = structuredClone(columns); bad[0].placements[0].itemId = "foreign";
    assert.throws(() => context.packLayers(bad), { code: "InvalidInput" });
    assert.throws(() => context.packLayers(null), { code: "InvalidInput" });
    context.dispose(); assert.throws(() => context.packLayers([]), { code: "Disposed" });
    assert.equal(second.itemCount(), 1n); packed.dispose(); second.dispose();
    assert.throws(() => packed.toJson(), { code: "Disposed" });
});

test("BPP2D independent packing budgets reject without truncating or invalidating source and other results", async () => {
    await initialize();
    const source = problem(); source.sheets[0].geometry.width.value = 129;
    const context = new PackingContext(source), artifact = context.toArtifact();
    const layer = { sheetId: "s", envelope: source.sheets[0].geometry, placements: Array.from({ length: 129 }, (_, index) => ({
        shape: { kind: "rectangle", width: { value: 1, unit: "m" }, height: { value: 1, unit: "m" } },
        position: { x: { value: index, unit: "m" }, y: { value: 0, unit: "m" } }, rotated: false, itemId: "a",
    })) };
    context.validateLayers([layer]);
    const packed = context.packLayers([{ ...layer, placements: layer.placements.slice(0, 1) }]);
    assert.throws(() => context.packLayers([layer]), { code: "PayloadTooLarge" });
    assert.deepEqual(context.toArtifact(), artifact); assert.equal(packed.itemCount(), 1n);
    context.dispose(); assert.equal(packed.remnantArea().value, 128); packed.dispose();
});
