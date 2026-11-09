import assert from "node:assert/strict";
import test from "node:test";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { initialize } from "../dist/node.js";
import { CuttingContext, Csp2dReport, Csp2dColumnGeneration } from "../dist/csp2d.js";

const meters = value => ({ value, unit: "m" });
const size = (width, height) => ({ width: meters(width), height: meters(height) });
const region = (x, width) => ({ origin: { x: meters(x), y: meters(0) }, size: size(width, 1) });

function problem() {
    return { products: [{ id: "a", name: "A", geometry: { width: { value: 100, unit: "cm" }, height: meters(1) }, allowRotate: false }],
        materials: [{ id: "s", name: "S", shape: { kind: "sheet", geometry: size(4, 2) }, availableBatches: 10n, process: "freeform", maxSegmentHeight: null,
            products: [{ productId: "a", count: 4n }] }], demands: [{ kind: "count", productId: "a", count: 3n, upperBound: null }], initialColumns: [], kerf: meters(0),
        objective: { areaWeight: 1, wasteWeight: 0, heightWeight: 0, usageWeight: 0 } };
}

function column() {
    return { id: "seed", materialId: "s", region: region(0, 2), placements: [0, 1].map(x => ({ shape: { kind: "rectangle", ...size(1, 1) },
        position: { x: meters(x), y: meters(0) }, rotated: false, itemId: "a" })), cutTree: null };
}

function client(capabilities = ["csp2d", "csp2dColumnGeneration"], backendCapabilities = ["linear", "mip"]) {
    const requests = [], view = { id: "job", protocolVersion: 1, fingerprint: "source", status: "completed", reportJson: "opaque report", progressJson: null, error: null };
    return { requests, capabilities: async () => ({ protocolVersion: 1, backends: [
        { id: "csp2d", compiled: true, capabilities, warnings: [] }, { id: "scip", compiled: true, capabilities: backendCapabilities, warnings: [] },
    ] }), submit: async request => { requests.push(request); return view; }, get: async () => view, cancel: async () => view, release: async () => {} };
}

test("CSP2D native configuration is bounded, explicit and rejects callbacks or unsupported rules", () => {
    for (const configuration of [{}, null, { backend: "fake" }, { backend: "scip", pricing() {} }, { backend: "scip", iterationLimit: 65 },
        { backend: "scip", iterationLimit: -1 }, { backend: "scip", candidatesPerIteration: 0 }, { backend: "scip", poolLimit: 513 },
        { backend: "scip", reportLimit: NaN }, { backend: "scip", generators: [] }, { backend: "scip", generators: ["shelf", "shelf"] },
        { backend: "scip", generators: ["custom"] }, { backend: "scip", finalIntegerEnabled: null }, { backend: "scip", reducedCostTolerance: Infinity },
        { backend: "scip", reducedCostTolerance: 0.5 }, { backend: "scip", massLimit: 10 }]) {
        assert.throws(() => new Csp2dColumnGeneration(client(), configuration), { code: "InvalidInput" });
    }
    assert.doesNotThrow(() => new Csp2dColumnGeneration(client(), { backend: "scip", iterationLimit: 0, finalIntegerEnabled: false }));
});

test("CSP2D facade snapshots generated-contract configuration and never downgrades the model kind", async () => {
    const transport = client(), configuration = { backend: "scip", generators: ["shelf"], iterationLimit: 0, poolLimit: 10 };
    const solver = new Csp2dColumnGeneration(transport, configuration); configuration.generators[0] = "custom"; configuration.poolLimit = 500;
    const source = { modelJson: "opaque source", fingerprint: "source" };
    await solver.solve(source, { timeLimitMs: 100 });
    const request = transport.requests[0]; assert.equal(request.solver, "csp2d"); assert.equal(request.modelKind, "csp2d");
    assert.deepEqual(request.csp2dOptions.generators, ["shelf"]); assert.equal(request.csp2dOptions.poolLimit, 10); assert.equal(request.csp2dOptions.iterationLimit, 0);
    assert.equal(request.timeLimitMs, 100); request.csp2dOptions.generators[0] = "custom";
    await solver.solve(source); assert.equal(transport.requests[1].csp2dOptions.generators[0], "shelf");
});

test("CSP2D requires domain, algorithm and explicit native LP/MIP capabilities before submission", async () => {
    const source = { modelJson: "opaque source", fingerprint: "source" };
    for (const [transport, code] of [[client([]), "UnsupportedCapability"], [client(["csp2d"]), "UnsupportedCapability"],
        [client(undefined, ["linear"]), "BackendNotCompiled"], [client(undefined, []), "BackendNotCompiled"]]) {
        await assert.rejects(new Csp2dColumnGeneration(transport, { backend: "scip" }).solve(source), { code }); assert.equal(transport.requests.length, 0);
    }
    const controller = new AbortController(); controller.abort(); const transport = client();
    await assert.rejects(new Csp2dColumnGeneration(transport, { backend: "scip" }).solve(source, { signal: controller.signal }), { code: "Aborted" });
    assert.equal(transport.requests.length, 0);
});

test("CSP2D source validation keeps generated contracts, bigint counts and independent artifact lifetimes", async () => {
    await initialize();
    const input = problem(); input.demands[0].count = 9_007_199_254_740_991n; input.initialColumns = [column(), column()];
    const context = new CuttingContext(input), artifact = context.toArtifact(), restored = CuttingContext.fromArtifact(artifact);
    assert.match(artifact.modelJson, /"count":"9007199254740991"/); assert.equal(JSON.parse(artifact.modelJson).problem.initialColumns.length, 2);
    assert.equal(restored.toJson(), context.toJson()); context.dispose(); context.dispose();
    assert.throws(() => context.toArtifact(), { code: "Disposed" }); assert.throws(() => context.validateColumns([]), { code: "Disposed" });
    restored.validateColumns([column()]); restored.dispose();
    assert.throws(() => CuttingContext.fromArtifact({ ...artifact, fingerprint: "foreign" }), { code: "FingerprintMismatch" });
    assert.throws(() => CuttingContext.fromArtifact({ ...artifact, modelJson: `${artifact.modelJson} ` }), { code: "FingerprintMismatch" });
    assert.throws(() => CuttingContext.fromArtifact({ ...artifact, modelJson: artifact.modelJson.replace('"1.0"', '"2.0"') }), { code: "UnsupportedProtocolVersion" });
});

test("CSP2D source rejects unsafe numbers, invalid rules, units and cross-catalog references without coercion", async () => {
    await initialize();
    for (const value of [3, -1n, 9_007_199_254_740_992n, "3"]) {
        const input = problem(); input.demands[0].count = value;
        assert.throws(() => new CuttingContext(input), { code: "InvalidInput" });
    }
    for (const change of [input => input.materials[0].products[0].count = 4097n, input => input.materials[0].availableBatches = 0n,
        input => input.kerf.value = NaN, input => input.kerf.unit = "s", input => input.callback = () => {}, input => input.extra = undefined,
        input => input.demands[0].upperBound = 2n, input => input.products.push(input.products[0]), input => input.demands[0].productId = "foreign",
        input => input.materials[0].products[0].productId = "foreign", input => input.materials[0].maxSegmentHeight = meters(1)]) {
        const input = problem(); change(input); assert.throws(() => new CuttingContext(input), { code: "InvalidInput" });
    }
    const context = new CuttingContext(problem());
    for (const change of [value => value.materialId = "foreign", value => value.placements[0].rotated = true, value => value.placements[0].itemId = "foreign",
        value => value.placements[1].position.x = meters(0.5), value => value.region.size.width = meters(0.5), value => value.placements[0].shape.width.value = Infinity]) {
        const value = column(); change(value); assert.throws(() => context.validateColumns([value]), { code: "InvalidInput" });
    }
    context.dispose();
});

test("CSP2D flat cut trees require physical part leaves, strict postorder and actual split/stage consistency", async () => {
    await initialize(); const input = problem(); input.materials[0].process = "guillotineTwoStage";
    const value = column(); value.cutTree = { nodes: [{ kind: "leaf", region: region(0, 1), productId: "a" }, { kind: "leaf", region: region(1, 1), productId: "a" },
        { kind: "cut", region: region(0, 2), orientation: "vertical", position: meters(1), stage: 1, lower: 0, upper: 1 }] };
    input.initialColumns = [value]; const context = new CuttingContext(input); context.validateColumns([value]);
    for (const change of [tree => tree.nodes[2].lower = 2, tree => tree.nodes[2].upper = 0, tree => tree.nodes[0].productId = null,
        tree => tree.nodes[0].region.origin.x = meters(1e-10), tree => tree.nodes[2].stage = 2,
        tree => tree.nodes.push({ kind: "leaf", region: region(0, 2), productId: null })]) {
        const changed = structuredClone(value); change(changed.cutTree); assert.throws(() => context.validateColumns([changed]), { code: "InvalidInput" });
    }
    context.dispose();
});

test("CSP2D readers reject parsed reports, invalid text and released source contexts explicitly", async () => {
    await initialize(); const context = new CuttingContext(problem()), source = context.toArtifact();
    assert.throws(() => context.readExecutionReport({ stages: [] }), { code: "InvalidInput" });
    assert.throws(() => Csp2dReport.fromJson({ stages: [] }, source), { code: "InvalidInput" });
    assert.throws(() => context.readExecutionReport("{}"), { code: "InvalidInput" });
    assert.throws(() => Csp2dReport.fromJson(" ".repeat(8 * 1024 * 1024 + 1), source), { code: "PayloadTooLarge" });
    context.dispose(); assert.throws(() => context.readExecutionReport("{}"), { code: "Disposed" });
});

test("CSP2D portable report readers revalidate complete real SCIP and Gurobi executions and independent production", { skip: !process.env.OSPF_CSP2D_FIXTURE_DIR }, async () => {
    await initialize(); const directory = process.env.OSPF_CSP2D_FIXTURE_DIR;
    const files = (await readdir(directory)).filter(name => /^csp2d-execution-(scip|gurobi)\.json$/.test(name)); assert.ok(files.length > 0);
    for (const file of files) {
        for (const fixture of JSON.parse(await readFile(join(directory, file), "utf8"))) {
            const context = CuttingContext.fromArtifact(fixture.source), report = context.readExecutionReport(fixture.reportJson);
            const direct = Csp2dReport.fromJson(fixture.reportJson, fixture.source); context.dispose();
            const summary = report.summary(), wire = JSON.parse(fixture.reportJson);
            assert.equal(report.toJson(), fixture.reportJson); assert.equal(direct.toJson(), report.toJson()); direct.dispose();
            assert.equal(summary.candidateComplete, false); assert.equal(summary.columnCount, wire.columns.length);
            assert.equal(summary.stageCount, wire.stages.length); assert.equal(report.stages().length, wire.stages.length);
            assert.deepEqual(report.iterations(), wire.iterations); assert.equal(report.columns().length, wire.columns.length);
            for (let index = 0; index < wire.stages.length; index++) {
                assert.equal(report.stageReportJson(index), wire.stages[index].solverReportJson);
                assert.deepEqual(JSON.parse(report.stageJson(index)).model, wire.stages[index].model);
            }
            assert.equal(report.stageJson(wire.stages.length), undefined); assert.equal(report.stageReportJson(wire.stages.length), undefined);
            for (const invalid of [-1, 0.5, 0x1_0000_0000, NaN]) assert.throws(() => report.stageJson(invalid), { code: "InvalidInput" });
            const production = report.production(); report.dispose(); assert.throws(() => report.summary(), { code: "Disposed" });
            if (fixture.productionJson === null) { assert.equal(production, undefined); continue; }
            assert.equal(production.toJson(), fixture.productionJson);
            const expected = JSON.parse(fixture.productionJson);
            assert.deepEqual(production.usages(), expected.usages.map(usage => ({ ...usage, count: BigInt(usage.count) })));
            assert.deepEqual(production.producedCounts(), new Map(Object.entries(expected.producedCounts).map(([id, value]) => [id, BigInt(value)])));
            assert.deepEqual(production.materialBatches(), new Map(Object.entries(expected.materialBatches).map(([id, value]) => [id, BigInt(value)])));
            assert.deepEqual(production.producedAreas(), new Map(Object.entries(expected.producedAreas)));
            assert.deepEqual(production.coilHeights(), new Map(Object.entries(expected.coilHeights)));
            assert.deepEqual(production.consumedArea(), expected.consumedArea); assert.deepEqual(production.wasteArea(), expected.wasteArea);
            assert.equal(production.objectiveValue(), expected.objectiveValue); production.dispose(); production.dispose();
            assert.throws(() => production.toJson(), { code: "Disposed" });
        }
    }
});

test("CSP2D import rejects source, actual-report, column and pricing forgeries while preserving exact raw u64", { skip: !process.env.OSPF_CSP2D_FIXTURE_DIR }, async () => {
    await initialize(); const directory = process.env.OSPF_CSP2D_FIXTURE_DIR;
    const file = (await readdir(directory)).find(name => /^csp2d-execution-(scip|gurobi)\.json$/.test(name)); assert.ok(file);
    const [fixture] = JSON.parse(await readFile(join(directory, file), "utf8")); const wire = JSON.parse(fixture.reportJson);
    wire.stages[0].solverReportJson = wire.stages[0].solverReportJson.replace(/"nodes":(?:null|\d+)/g, '"nodes":18446744073709551615');
    const report = Csp2dReport.fromJson(JSON.stringify(wire), fixture.source);
    assert.match(report.stageReportJson(0), /18446744073709551615/); report.dispose();
    assert.throws(() => Csp2dReport.fromJson(fixture.reportJson, { ...fixture.source, fingerprint: "foreign" }), { code: "FingerprintMismatch" });
    for (const change of [wire => wire.sourceFingerprint = "foreign", wire => wire.schemaVersion = "2.0", wire => wire.finalStage = 0xffff_ffff,
        wire => wire.columns[0].materialId = "foreign", wire => wire.iterations[0].addedColumns[0].reducedCost = 0,
        wire => { const report = JSON.parse(wire.stages[0].solverReportJson); report.fingerprints.model = null; wire.stages[0].solverReportJson = JSON.stringify(report); }]) {
        const value = JSON.parse(fixture.reportJson); change(value); assert.throws(() => Csp2dReport.fromJson(JSON.stringify(value), fixture.source));
    }
});
