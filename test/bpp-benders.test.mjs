import assert from "node:assert/strict";
import test from "node:test";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { initialize } from "../dist/node.js";
import { DiscreteLoadingBendersApplicationService, DiscreteLoadingBendersReport, DiscreteLoadingContext } from "../dist/bpp.js";

function client(capabilities = ["bppLoading", "bppLoadingBenders"]) {
    const requests = [], view = { protocolVersion: 1, id: "job", fingerprint: "source", status: "completed", reportJson: "opaque report", progressJson: null, error: null };
    return { requests, capabilities: async () => ({ protocolVersion: 1, backends: [
        { id: "bpp-loading", compiled: true, capabilities, warnings: [] }, { id: "scip", compiled: true, capabilities: ["linear", "mip"], warnings: [] },
    ] }), submit: async request => { requests.push(request); return view; }, get: async () => view, cancel: async () => view, release: async () => {} };
}

test("shared BPP Benders requires explicit resources and capability, snapshots options and never falls back silently", async () => {
    for (const configuration of [undefined, null, {}, { backend: "custom", recourseResources: ["ballast"] }, { backend: "scip", recourseResources: [] },
        { backend: "scip", recourseResources: ["ballast", "ballast"] }, { backend: "scip", recourseResources: [1] },
        { backend: "scip", recourseResources: ["ballast"], iterationLimit: 0 }, { backend: "scip", recourseResources: ["ballast"], iterationLimit: 10001 },
        { backend: "scip", recourseResources: ["ballast"], fallbackToMilp: 1 }, { backend: "scip", recourseResources: ["ballast"], callback() {} }]) {
        assert.throws(() => new DiscreteLoadingBendersApplicationService(client(), configuration), { code: "InvalidInput" });
    }
    const transport = client(), configuration = { backend: "scip", recourseResources: ["ballast"], iterationLimit: 3, fallbackToMilp: true };
    const service = new DiscreteLoadingBendersApplicationService(transport, configuration), source = { modelJson: "opaque", fingerprint: "source" };
    configuration.recourseResources[0] = "mutated"; configuration.iterationLimit = 100;
    await service.solve(source); assert.equal(transport.requests[0].modelKind, "bppLoading"); assert.equal(transport.requests[0].solver, "bpp-loading");
    assert.deepEqual(transport.requests[0].bppLoadingOptions, { backend: "scip", benders: { recourseResources: ["ballast"], iterationLimit: 3, fallbackToMilp: true } });
    transport.requests[0].bppLoadingOptions.benders.recourseResources.push("foreign"); await service.solve(source);
    assert.deepEqual(transport.requests[1].bppLoadingOptions.benders.recourseResources, ["ballast"]);
    for (const capabilities of [["bppLoading", "bppLoadingMilp"], ["bppLoadingBenders"], []]) {
        const transport = client(capabilities);
        await assert.rejects(new DiscreteLoadingBendersApplicationService(transport, { backend: "scip", recourseResources: ["ballast"] }).solve(source), { code: "UnsupportedCapability" });
        assert.equal(transport.requests.length, 0);
    }
});

test("shared BPP Benders readers retain real cuts, fallback proofs, exact child text and independent resources", { skip: !process.env.OSPF_BPP_LOADING_FIXTURE_DIR }, async () => {
    await initialize(); const directory = process.env.OSPF_BPP_LOADING_FIXTURE_DIR;
    const files = (await readdir(directory)).filter(name => /^bpp-benders-(scip|gurobi)\.json$/.test(name)); assert.ok(files.length > 0);
    let sawCuts = false, sawFallback = false, sawInfeasibleChild = false;
    for (const file of files) for (const fixture of JSON.parse(await readFile(join(directory, file), "utf8"))) {
        const context = DiscreteLoadingContext.fromArtifact(fixture.source); assert.deepEqual(context.toApplicationModel(), fixture.model);
        const envelope = JSON.parse(fixture.bendersReportJson);
        if (envelope.decompositionReportJson) {
            const decomposition = JSON.parse(envelope.decompositionReportJson);
            for (const key of ["masterReportJson", "subproblemReportJson"]) if (decomposition[key]) decomposition[key] = decomposition[key].replace(/"nodes":(?:null|\d+)/g, '"nodes":18446744073709551615');
            envelope.decompositionReportJson = JSON.stringify(decomposition);
        }
        const text = JSON.stringify(envelope), report = context.readBendersReport(text), direct = DiscreteLoadingBendersReport.fromJson(text, fixture.source);
        assert.equal(report.toJson(), text); assert.equal(direct.toJson(), text); assert.equal(report.applicationReportJson(), envelope.applicationReportJson);
        assert.equal(report.decompositionReportJson() ?? null, envelope.decompositionReportJson); assert.equal(report.fallbackReportJson() ?? null, envelope.fallbackReportJson);
        const summary = report.decompositionSummary(); if (summary?.optimalityCuts > 0) sawCuts = true;
        if (summary?.terminalProblemStatus === "INFEASIBLE") { sawInfeasibleChild = true; assert.equal(report.summary().problemStatus, "UNKNOWN"); }
        if (report.fallbackUsed()) { sawFallback = true; assert.ok(report.fallbackReportJson()); }
        else assert.equal(JSON.parse(report.solverReportJson()).proof, null);
        assert.equal(report.sourceFingerprint(), fixture.source.fingerprint); const plan = report.solution();
        context.dispose(); direct.dispose(); report.dispose(); assert.equal(plan?.toJson() ?? null, fixture.resultJson); plan?.dispose();
        assert.throws(() => report.summary(), { code: "Disposed" });
        assert.throws(() => DiscreteLoadingBendersReport.fromJson(text, { ...fixture.source, fingerprint: "foreign" }), { code: "FingerprintMismatch" });
        if (envelope.decompositionReportJson) {
            envelope.decompositionReportJson = null;
            assert.throws(() => DiscreteLoadingBendersReport.fromJson(JSON.stringify(envelope), fixture.source), { code: "InvalidInput" });
        }
    }
    assert.ok(sawCuts && sawFallback && sawInfeasibleChild);
});

test("source finishing reserves the same total budget, snapshots nested configuration and gates old hosts", async () => {
    const source = { modelJson: "opaque", fingerprint: "source" };
    for (const finishing of [null, [], {}, { reserveTimeMs: 0 }, { reserveTimeMs: -1 }, { reserveTimeMs: 1.5 }, { reserveTimeMs: 2 ** 32 }, { reserveTimeMs: 1, callback() {} }]) {
        assert.throws(() => new DiscreteLoadingBendersApplicationService(client(), { backend: "scip", recourseResources: ["ballast"], sourceMilpFinishing: finishing }), { code: "InvalidInput" });
    }
    const configuration = { backend: "scip", recourseResources: ["ballast"], sourceMilpFinishing: { reserveTimeMs: 1000 } };
    const transport = client(["bppLoading", "bppLoadingBenders", "bppLoadingSourceFinishing"]);
    const service = new DiscreteLoadingBendersApplicationService(transport, configuration);
    configuration.sourceMilpFinishing.reserveTimeMs = 5000;
    for (const timeLimitMs of [999, 1000]) await assert.rejects(service.solve(source, { timeLimitMs }), { code: "InvalidInput" });
    assert.equal(transport.requests.length, 0);
    await service.solve(source, { timeLimitMs: 2000 });
    assert.deepEqual(transport.requests[0].bppLoadingOptions.benders.sourceMilpFinishing, { reserveTimeMs: 1000 });
    transport.requests[0].bppLoadingOptions.benders.sourceMilpFinishing.reserveTimeMs = 1500;
    await service.solve(source); assert.equal(transport.requests[1].bppLoadingOptions.benders.sourceMilpFinishing.reserveTimeMs, 1000);
    await assert.rejects(new DiscreteLoadingBendersApplicationService(client(), { ...configuration, sourceMilpFinishing: { reserveTimeMs: 1000 } }).solve(source), { code: "UnsupportedCapability" });
});

test("source finishing readers preserve accelerator evidence and original full-source proof texts", { skip: !process.env.OSPF_BPP_LOADING_FIXTURE_DIR }, async () => {
    await initialize(); const directory = process.env.OSPF_BPP_LOADING_FIXTURE_DIR;
    const files = (await readdir(directory)).filter(name => /^bpp-finishing-(scip|gurobi)\.json$/.test(name)); assert.ok(files.length > 0);
    let sawInvoked = false, sawExistingProof = false, sawInfeasible = false;
    for (const file of files) for (const fixture of JSON.parse(await readFile(join(directory, file), "utf8"))) {
        const envelope = JSON.parse(fixture.bendersReportJson), evidence = envelope.certification;
        assert.ok(evidence);
        if (evidence.reportJson) evidence.reportJson = evidence.reportJson.replace(/"nodes":(?:null|\d+)/g, '"nodes":18446744073709551615');
        if (evidence.reportJson) {
            const application = JSON.parse(envelope.applicationReportJson); application.reportJson = evidence.reportJson;
            envelope.applicationReportJson = JSON.stringify(application);
        }
        const text = JSON.stringify(envelope), report = DiscreteLoadingBendersReport.fromJson(text, fixture.source), plan = report.solution();
        assert.equal(report.toJson(), text); assert.equal(report.sourceFinishingPresent(), true);
        assert.equal(report.accelerationApplicationReportJson(), evidence.previousApplicationReportJson);
        assert.equal(report.certificationReportJson() ?? null, evidence.reportJson); assert.equal(report.certificationError() ?? null, evidence.error);
        assert.equal(report.sourceFinishingInvoked(), evidence.reportJson !== null || evidence.error !== null);
        if (evidence.reportJson) { sawInvoked = true; assert.match(report.certificationReportJson(), /18446744073709551615/); }
        if (report.fallbackUsed()) { sawExistingProof = true; assert.equal(report.sourceFinishingInvoked(), false); }
        if (report.summary().problemStatus === "INFEASIBLE") sawInfeasible = true;
        report.dispose(); assert.equal(plan?.toJson() ?? null, fixture.resultJson); plan?.dispose();
        assert.throws(() => report.certificationReportJson(), { code: "Disposed" });
        delete envelope.options.sourceMilpFinishing;
        assert.throws(() => DiscreteLoadingBendersReport.fromJson(JSON.stringify(envelope), fixture.source), { code: "InvalidInput" });
    }
    assert.ok(sawInvoked && sawExistingProof && sawInfeasible);
});
