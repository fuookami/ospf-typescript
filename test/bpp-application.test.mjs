import assert from "node:assert/strict";
import test from "node:test";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { initialize } from "../dist/node.js";
import { DiscreteLoadingApplicationReport, DiscreteLoadingApplicationService, DiscreteLoadingContext } from "../dist/bpp.js";

function client(capabilities = ["bppLoading", "bppLoadingMilp"], backendCapabilities = ["linear", "mip"]) {
    const requests = [], view = { id: "job", protocolVersion: 1, fingerprint: "source", status: "completed", reportJson: "opaque report", progressJson: null, error: null };
    return { requests, capabilities: async () => ({ protocolVersion: 1, backends: [
        { id: "bpp-loading", compiled: true, capabilities, warnings: [] }, { id: "scip", compiled: true, capabilities: backendCapabilities, warnings: [] },
    ] }), submit: async request => { requests.push(request); return view; }, get: async () => view, cancel: async () => view, release: async () => {} };
}

test("shared BPP application requires explicit backend configuration without callbacks or silent transport fallback", async () => {
    for (const configuration of [undefined, null, {}, { backend: "custom" }, { backend: "scip", callback() {} }, { backend: "scip", algorithm: "benders" }]) {
        assert.throws(() => new DiscreteLoadingApplicationService(client(), configuration), { code: "InvalidInput" });
    }
    const transport = client(), configuration = { backend: "scip" }, solver = new DiscreteLoadingApplicationService(transport, configuration);
    configuration.backend = "gurobi"; const source = { modelJson: "opaque source", fingerprint: "source" };
    await solver.solve(source, { timeLimitMs: 100 });
    assert.equal(transport.requests[0].solver, "bpp-loading"); assert.equal(transport.requests[0].modelKind, "bppLoading");
    assert.deepEqual(transport.requests[0].bppLoadingOptions, { backend: "scip" }); assert.equal(transport.requests[0].timeLimitMs, 100);
    transport.requests[0].bppLoadingOptions.backend = "gurobi"; await solver.solve(source);
    assert.equal(transport.requests[1].bppLoadingOptions.backend, "scip");
    for (const [transport, code] of [[client([]), "UnsupportedCapability"], [client(["bppLoading"]), "UnsupportedCapability"],
        [client(undefined, ["linear"]), "BackendNotCompiled"], [client(undefined, []), "BackendNotCompiled"]]) {
        await assert.rejects(new DiscreteLoadingApplicationService(transport, { backend: "scip" }).solve(source), { code });
        assert.equal(transport.requests.length, 0);
    }
    const controller = new AbortController(); controller.abort();
    await assert.rejects(solver.solve(source, { signal: controller.signal }), { code: "Aborted" });
});

test("shared BPP objectives register in original Rust, retain source identity and reject invalid business references", async () => {
    await initialize();
    const problem = { items: [{ id: "a", weight: { value: 1, unit: "kg" }, required: false, fixedPositionId: null }],
        positions: [{ id: "p", maxCount: 18_446_744_073_709_551_615n, maxWeight: { value: 1, unit: "kg" }, fixedOccupied: false, enabled: true }],
        allowedAssignments: [{ itemId: "a", positionId: "p" }], conflicts: [], layoutGroups: [], weightUnit: "kg" };
    const objective = { itemCosts: { a: -5 }, positionCosts: { p: 1 }, layoutCosts: [] };
    const context = new DiscreteLoadingContext(problem, objective), plain = new DiscreteLoadingContext(problem), source = context.toArtifact();
    objective.itemCosts.a = 0; assert.notEqual(source.fingerprint, plain.toArtifact().fingerprint); plain.dispose();
    assert.match(context.toJson(), /"a":-5/); const restored = DiscreteLoadingContext.fromArtifact(source);
    assert.deepEqual(restored.toApplicationModel(), context.toApplicationModel());
    assert.notEqual(context.toApplicationModel().fingerprint, context.toLinearTriadModel().fingerprint);
    assert.ok(JSON.parse(context.toApplicationModel().modelJson).objective.cells.some(cell => cell.coefficient === -5));
    for (const invalid of [{ ...objective, itemCosts: { foreign: -5 } }, { ...objective, itemCosts: { a: Infinity } },
        { ...objective, positionCosts: { foreign: 1 } }, { ...objective, layoutCosts: [{ groupId: "missing", layoutId: "missing", cost: 1 }] },
        { ...objective, callback() {} }, { ...objective, extra: undefined }]) {
        assert.throws(() => new DiscreteLoadingContext(problem, invalid), { code: "InvalidInput" });
    }
    context.dispose(); restored.dispose();
});

test("shared BPP continuous resources preserve model-unit costs, explicit weights and independently owned results", async () => {
    await initialize();
    const problem = { items: [{ id: "a", weight: { value: 1000, unit: "g" }, required: true, fixedPositionId: null }],
        positions: [{ id: "p", maxCount: 18_446_744_073_709_551_615n, maxWeight: { value: 2, unit: "kg" }, fixedOccupied: false, enabled: true }],
        allowedAssignments: [{ itemId: "a", positionId: "p" }], conflicts: [], layoutGroups: [], weightUnit: "kg" };
    const resource = { id: "ballast", positionId: "p", minimumWeight: { value: 0, unit: "kg" }, maximumWeight: { value: 1000, unit: "g" }, minimumPerLoadedWeight: 0.5, costPerWeight: 2 };
    const context = new DiscreteLoadingContext(problem, undefined, [resource]), source = context.toArtifact();
    const restored = DiscreteLoadingContext.fromArtifact(source), plan = { assignments: { a: "p" }, occupiedPositions: ["p"], selectedLayouts: {} };
    assert.deepEqual(context.toApplicationModel(), restored.toApplicationModel());
    resource.costPerWeight = 100; assert.match(context.toJson(), /"costPerWeight":2/);
    assert.throws(() => context.solutionValues(plan), { code: "InvalidInput" }); assert.throws(() => context.verifySolution(plan), { code: "InvalidInput" });
    const weights = new Map([["ballast", { value: 500, unit: "g" }]]), values = context.solutionValues(plan, weights);
    assert.deepEqual([...values], [1, 1, 0.5]); const result = context.verifySolution(plan, weights), extracted = restored.extractSolution(values);
    assert.equal(result.toJson(), extracted.toJson()); extracted.dispose();
    for (const invalid of [new Map(), new Map([["other", { value: 0.5, unit: "kg" }]]), new Map([["ballast", { value: 0.49, unit: "kg" }]]),
        new Map([["ballast", { value: 2, unit: "kg" }]]), new Map([["ballast", { value: 0.5, unit: "m" }]]), new Map([["ballast", { value: Infinity, unit: "kg" }]]),
        { ballast: { value: 0.5, unit: "kg" } }, new Map([[1, { value: 0.5, unit: "kg" }]])]) {
        assert.throws(() => context.verifySolution(plan, invalid), { code: "InvalidInput" });
    }
    for (const invalid of [[], [resource, resource], [{ ...resource, positionId: "unknown" }], [{ ...resource, callback() {} }], [{ ...resource, costPerWeight: NaN }]]) {
        assert.throws(() => new DiscreteLoadingContext(problem, undefined, invalid), { code: "InvalidInput" });
    }
    context.dispose(); restored.dispose(); assert.equal(result.loadedCount(), 1n); assert.deepEqual(result.loadedWeight(), { value: 1, unit: "kg" });
    assert.deepEqual(result.resources(), { weights: { ballast: { value: 0.5, unit: "kg" } }, positionTotalWeights: { p: { value: 1.5, unit: "kg" } }, totalWeight: { value: 1.5, unit: "kg" } });
    const copy = result.resources(); copy.weights.ballast.value = 99; assert.equal(result.resources().weights.ballast.value, 0.5);
    result.dispose(); assert.throws(() => result.resources(), { code: "Disposed" });
    const plain = new DiscreteLoadingContext(problem), plainResult = plain.verifySolution(plan); assert.equal(plainResult.resources(), undefined); plainResult.dispose(); plain.dispose();
});

test("shared BPP application readers consume real original backend reports, exact metadata and independent results", { skip: !process.env.OSPF_BPP_LOADING_FIXTURE_DIR }, async () => {
    await initialize(); const directory = process.env.OSPF_BPP_LOADING_FIXTURE_DIR;
    const files = (await readdir(directory)).filter(name => /^bpp-application-(?:resources-)?(scip|gurobi)\.json$/.test(name)); assert.ok(files.length > 0);
    for (const file of files) for (const fixture of JSON.parse(await readFile(join(directory, file), "utf8"))) {
        const context = DiscreteLoadingContext.fromArtifact(fixture.source);
        assert.deepEqual(context.toApplicationModel(), fixture.model);
        const wire = JSON.parse(fixture.applicationReportJson); wire.reportJson = wire.reportJson.replace(/"nodes":(?:null|\d+)/g, '"nodes":18446744073709551615');
        const text = JSON.stringify(wire), report = context.readApplicationReport(text), direct = DiscreteLoadingApplicationReport.fromJson(text, fixture.source);
        assert.equal(report.toJson(), text); assert.equal(direct.toJson(), text); assert.equal(report.solverReportJson(), wire.reportJson);
        assert.equal(report.sourceFingerprint(), fixture.source.fingerprint); const plan = report.solution(), copy = report.solution();
        direct.dispose(); context.dispose(); report.dispose(); plan?.dispose(); assert.equal(copy?.toJson() ?? null, fixture.resultJson); copy?.dispose();
        assert.throws(() => report.summary(), { code: "Disposed" });
        assert.throws(() => DiscreteLoadingApplicationReport.fromJson(text, { ...fixture.source, fingerprint: "foreign" }), { code: "FingerprintMismatch" });
        if (wire.registrationPresent) {
            wire.reportJson = wire.reportJson.replace(/"fingerprints":\{"model":\{[^{}]*\}/, '"fingerprints":{"model":null');
            assert.throws(() => DiscreteLoadingApplicationReport.fromJson(JSON.stringify(wire), fixture.source), { code: "FingerprintMismatch" });
        }
    }
});
