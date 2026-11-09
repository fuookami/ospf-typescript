import assert from "node:assert/strict";
import test from "node:test";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { initialize } from "../dist/node.js";
import { PartitionColumnGenerationApplicationService, PartitionColumnGenerationReport } from "../dist/bpp.js";

const configuration = () => ({ backend: "scip", partition: { partitions: [{ id: "whole", positionIds: ["p"] }] } });
test("original partition application snapshots generated configuration and rejects unsupported hosts without downgrade", async () => {
    const requests = [], view = { protocolVersion: 1, id: "job", fingerprint: "source", status: "completed", reportJson: "raw", error: null, progressJson: null };
    let capabilities = ["bppLoading", "bppLoadingMilp"];
    const client = { capabilities: async () => ({ protocolVersion: 1, backends: [{ id: "bpp-loading", compiled: true, capabilities, warnings: [] }, { id: "scip", compiled: true, capabilities: ["linear", "mip"], warnings: [] }] }),
        submit: async request => { requests.push(request); return view; }, get: async () => view, cancel: async () => view, release: async () => {} };
    const configured = configuration(), service = new PartitionColumnGenerationApplicationService(client, configured), source = { modelJson: "opaque", fingerprint: "source" };
    configured.partition.partitions[0].positionIds.push("foreign");
    await assert.rejects(service.solve(source), { code: "UnsupportedCapability" }); assert.equal(requests.length, 0);
    capabilities = ["bppLoading", "bppLoadingPartitionColumnGeneration"]; await service.solve(source);
    assert.equal(requests[0].modelKind, "bppLoading"); assert.equal(requests[0].solver, "bpp-loading");
    assert.deepEqual(requests[0].bppLoadingOptions.partition.partition, { partitions: [{ id: "whole", positionIds: ["p"] }], refinableResources: [] });
    requests[0].bppLoadingOptions.partition.partition.partitions.length = 0; await service.solve(source); assert.equal(requests[1].bppLoadingOptions.partition.partition.partitions.length, 1);
    const reservation = { reserveTimeMs: 100 }, finishing = new PartitionColumnGenerationApplicationService(client, { ...configuration(), sourceMilpFinishing: reservation });
    reservation.reserveTimeMs = 999;
    await assert.rejects(finishing.solve(source), { code: "UnsupportedCapability" }); assert.equal(requests.length, 2);
    capabilities.push("bppLoadingPartitionSourceFinishing"); await finishing.solve(source);
    assert.deepEqual(requests.at(-1).bppLoadingOptions.partition.sourceMilpFinishing, { reserveTimeMs: 100 });
    requests.at(-1).bppLoadingOptions.partition.sourceMilpFinishing.reserveTimeMs = 1; await finishing.solve(source);
    assert.equal(requests.at(-1).bppLoadingOptions.partition.sourceMilpFinishing.reserveTimeMs, 100);
    await assert.rejects(finishing.solve(source, { timeLimitMs: 100 }), { code: "InvalidInput" });
    for (const invalid of [{ ...configuration(), benders: {} }, { ...configuration(), reportLimit: 0 }, { ...configuration(), iterationLimit: 65 },
        { ...configuration(), partition: { ...configuration().partition, callback() {} } }, { ...configuration(), partition: { partitions: [{ id: "whole", positionIds: [1n] }] } },
        ...[null, { reserveTimeMs: 0 }, { reserveTimeMs: 1n }, { reserveTimeMs: 1, callback() {} }].map(sourceMilpFinishing => ({ ...configuration(), sourceMilpFinishing }))]) {
        assert.throws(() => new PartitionColumnGenerationApplicationService(client, invalid), { code: "InvalidInput" });
    }
});

test("partition source finishing retains the original root replay and exact fresh-source evidence without promoting restricted proofs", { skip: !process.env.OSPF_BPP_LOADING_FIXTURE_DIR }, async () => {
    await initialize(); const directory = process.env.OSPF_BPP_LOADING_FIXTURE_DIR;
    const files = (await readdir(directory)).filter(file => /^bpp-partition-finishing-(scip|gurobi)\.json$/.test(file)); assert.ok(files.length);
    const exactCounters = text => text.replace(/"nodes":(?:null|\d+)/g, '"nodes":18446744073709551615');
    for (const file of files) for (const fixture of JSON.parse(await readFile(join(directory, file), "utf8"))) {
        const envelope = JSON.parse(fixture.partitionReportJson), evidence = envelope.certification;
        for (const call of envelope.calls) if (call.reportJson) call.reportJson = exactCounters(call.reportJson);
        if (evidence.reportJson) {
            evidence.reportJson = exactCounters(evidence.reportJson);
            const selected = JSON.parse(envelope.applicationReportJson); selected.reportJson = exactCounters(selected.reportJson); envelope.applicationReportJson = JSON.stringify(selected);
        }
        const text = JSON.stringify(envelope), report = PartitionColumnGenerationReport.fromJson(text, fixture.source), plan = report.solution();
        assert.equal(report.toJson(), text); assert.equal(report.applicationReportJson(), envelope.applicationReportJson);
        assert.equal(report.accelerationApplicationReportJson(), evidence.previousApplicationReportJson);
        assert.equal(report.certificationReportJson(), evidence.reportJson ?? undefined); assert.deepEqual(report.certificationError(), evidence.error ?? undefined);
        assert.equal(report.sourceFinishingPresent(), true); assert.equal(report.sourceFinishingInvoked(), Boolean(evidence.reportJson || evidence.error));
        assert.deepEqual(report.calls(), envelope.calls);
        assert.equal(JSON.parse(JSON.parse(evidence.previousApplicationReportJson).reportJson).proof, null);
        const expectedPlan = fixture.resultJson; report.dispose(); assert.equal(plan?.toJson() ?? null, expectedPlan); plan?.dispose();
        assert.throws(() => report.certificationReportJson(), { code: "Disposed" });
        for (const variant of [0, 1, 2]) {
            const changed = structuredClone(envelope);
            if (variant === 0) delete changed.options.sourceMilpFinishing;
            else if (variant === 1) changed.options.sourceMilpFinishing.reserveTimeMs = changed.timeLimitMs;
            else changed.certification.error = { code: "InvalidInput", message: "not a recoverable finishing error" };
            assert.throws(() => PartitionColumnGenerationReport.fromJson(JSON.stringify(changed), fixture.source));
        }
    }
});

test("partition application readers replay actual native children and budgets, retain u64 text and independent source plans", { skip: !process.env.OSPF_BPP_LOADING_FIXTURE_DIR }, async () => {
    await initialize(); const directory = process.env.OSPF_BPP_LOADING_FIXTURE_DIR;
    const files = (await readdir(directory)).filter(file => /^bpp-partition-application-(scip|gurobi)\.json$/.test(file)); assert.ok(files.length);
    for (const file of files) for (const fixture of JSON.parse(await readFile(join(directory, file), "utf8"))) {
        const envelope = JSON.parse(fixture.partitionReportJson);
        for (const call of envelope.calls) if (call.reportJson) call.reportJson = call.reportJson.replace(/"nodes":(?:null|\d+)/g, '"nodes":18446744073709551615');
        const text = JSON.stringify(envelope), report = PartitionColumnGenerationReport.fromJson(text, fixture.source), plan = report.solution();
        assert.equal(report.toJson(), text); assert.equal(report.sourceFingerprint(), fixture.source.fingerprint);
        assert.deepEqual(report.calls(), envelope.calls); assert.equal(JSON.parse(report.solverReportJson()).proof, null);
        const execution = report.executionSummary();
        assert.equal(report.refinementReportJson(), execution.refinementCallIndex === null ? undefined : envelope.calls[execution.refinementCallIndex].reportJson);
        assert.equal(report.finalReportJson(), execution.finalCallIndex === null ? undefined : envelope.calls[execution.finalCallIndex].reportJson);
        assert.deepEqual(report.accelerationError(), envelope.calls.at(-1)?.error ?? undefined);
        const traceLength = execution.trace.length;
        assert.ok(execution.trace.every(step => Number.isFinite(step.objective)));
        const copiedCalls = report.calls(); copiedCalls.length = 0;
        execution.trace.length = 0;
        assert.deepEqual(report.calls(), envelope.calls);
        assert.equal(report.executionSummary().trace.length, traceLength);
        assert.equal(JSON.parse(report.solverReportJson()).statistics.bestBound, null);
        report.dispose(); assert.equal(plan?.toJson() ?? null, fixture.resultJson); plan?.dispose();
        for (const read of [() => report.calls(), () => report.refinementReportJson(), () => report.finalReportJson(), () => report.accelerationError()]) assert.throws(read, { code: "Disposed" });
        for (const variant of [0, 1, 2]) {
            const changed = structuredClone(envelope);
            if (variant === 0) changed.sourceFingerprint = "foreign";
            else if (variant === 1) changed.observations.push(changed.observations[0]);
            else changed.observations[0].remainingNanos = "01";
            assert.throws(() => PartitionColumnGenerationReport.fromJson(JSON.stringify(changed), fixture.source));
        }
    }
});
