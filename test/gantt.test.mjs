import assert from "node:assert/strict";
import test from "node:test";
import { initialize } from "../dist/node.js";
import { ActivityContext, ExecutionReport, GanttActivitySolver } from "../dist/gantt.js";
import { HttpClient } from "../dist/framework.js";

const problem = () => ({
    horizon: { start: "2026-01-01T00:00:00Z", end: "2026-01-02T00:00:00Z" },
    costUnit: "kg",
    resources: [{ id: "machine", capacity: { value: 1, unit: "kg" }, unavailableTimes: [], capacities: [] }],
    activities: [
        { id: "job", modes: [{ id: "run", durationSeconds: 3600, starts: ["2026-01-01T01:00:00Z", "2026-01-01T02:00:00Z"],
            resources: [{ resource: "machine", quantity: { value: 1, unit: "kg" }, fromSeconds: 0 }], cost: { value: 2, unit: "kg" } }] },
        { id: "job-2", modes: [{ id: "run", durationSeconds: 3600, starts: ["2026-01-01T01:00:00Z", "2026-01-01T02:00:00Z"],
            resources: [{ resource: "machine", quantity: { value: 1, unit: "kg" }, fromSeconds: 0 }], cost: { value: 2, unit: "kg" } }] },
    ],
    dependencies: [],
});
const selection = (task, start) => ({ task, mode: "run", start });

test("Gantt activity sources roundtrip with finite candidate expansion and exact counts", async () => {
    await initialize();
    const context = new ActivityContext(problem());
    const artifact = context.toArtifact(), summary = context.sourceSummary();
    assert.equal(artifact.modelJson, context.toJson());
    assert.equal(artifact.fingerprint, summary.sourceFingerprint);
    assert.deepEqual({ activities: summary.activityCount, modes: summary.modeCount, choices: summary.choiceCount,
        resources: summary.resourceCount, dependencies: summary.dependencyCount }, { activities: 2, modes: 2, choices: 4, resources: 1, dependencies: 0 });
    assert.equal(summary.horizonStart, "2026-01-01T00:00:00Z");
    const copy = ActivityContext.fromArtifact(artifact), restored = copy.problem();
    assert.deepEqual({ horizon: restored.horizon, costUnit: restored.costUnit, activities: restored.activities.map(activity => activity.id),
        starts: restored.activities[0].modes[0].starts, cost: restored.activities[0].modes[0].cost,
        capacity: restored.resources[0].capacity, dependencies: restored.dependencies.length },
        { horizon: problem().horizon, costUnit: "kg", activities: ["job", "job-2"], starts: problem().activities[0].modes[0].starts,
            cost: { value: 2, unit: "kg" }, capacity: { value: 1, unit: "kg" }, dependencies: 0 });
    assert.equal(copy.toJson(), artifact.modelJson);
    context.dispose(); copy.dispose();
    assert.throws(() => context.toJson(), { code: "Disposed" });
    assert.throws(() => ActivityContext.fromArtifact({ ...artifact, fingerprint: "foreign" }), { code: "FingerprintMismatch" });
});

test("Gantt activity plan replay revalidates native rules and exact cost", async () => {
    await initialize();
    const context = new ActivityContext(problem());
    const report = context.replay({ selections: [selection("job", "2026-01-01T01:00:00Z"), selection("job-2", "2026-01-01T02:00:00Z")] }).schedule;
    assert.equal(report.placements.length, 2);
    assert.equal(report.cancelled.length, 0);
    assert.equal(report.candidateCount, 4);
    assert.deepEqual(report.cost, { value: 4, unit: "kg" });
    assert.deepEqual(report.placements[0].reservations[0], { resource: "machine", start: "2026-01-01T01:00:00Z", end: "2026-01-01T02:00:00Z", quantity: { value: 1, unit: "kg" } });
    // 同机重叠、必做缺项、未声明候选与重复任务都必须被拒绝。 / Overlap on one machine, a missing mandatory activity, undeclared candidates and duplicate tasks must all be rejected.
    assert.throws(() => context.replay({ selections: [selection("job", "2026-01-01T01:00:00Z"), selection("job-2", "2026-01-01T01:30:00Z")] }), { code: "InvalidInput" });
    assert.throws(() => context.replay({ selections: [selection("job", "2026-01-01T01:00:00Z")] }), { code: "InvalidInput" });
    assert.throws(() => context.replay({ selections: [selection("job", "2026-01-01T05:00:00Z")] }), { code: "InvalidInput" });
    assert.throws(() => context.replay({ selections: [selection("job", "2026-01-01T01:00:00Z"), selection("job", "2026-01-01T02:00:00Z")] }), { code: "InvalidInput" });
    context.dispose();
});

test("Gantt activity execution reports stay source-bound and reject contradictory evidence", async () => {
    await initialize();
    const context = new ActivityContext(problem()), artifact = context.toArtifact();
    const schedule = context.replay({ selections: [selection("job", "2026-01-01T01:00:00Z"), selection("job-2", "2026-01-01T02:00:00Z")] }).schedule;
    const report = { sourceFingerprint: artifact.fingerprint, problemStatus: "Feasible", terminationReason: "COMPLETED",
        objectiveValue: 4, solverModelOnly: false, schedule, failure: null };
    const text = JSON.stringify(report), decoded = ExecutionReport.fromJson(text, artifact);
    assert.equal(decoded.toJson(), text);
    assert.deepEqual(decoded.summary(), { problemStatus: "Feasible", terminationReason: "COMPLETED", objectiveValue: 4, solverModelOnly: false, hasSchedule: true, failure: null });
    assert.deepEqual(decoded.schedule(), schedule);
    decoded.dispose();
    assert.throws(() => ExecutionReport.fromJson(JSON.stringify({ ...report, sourceFingerprint: "foreign" }), artifact), { code: "FingerprintMismatch" });
    assert.throws(() => ExecutionReport.fromJson(JSON.stringify({ ...report, failure: "rejected" }), artifact), { code: "InvalidInput" });
    assert.throws(() => ExecutionReport.fromJson(JSON.stringify({ ...report, problemStatus: "Infeasible" }), artifact), { code: "InvalidInput" });
    const terminal = { sourceFingerprint: artifact.fingerprint, problemStatus: "Unknown", terminationReason: "CANCELLED", objectiveValue: null, solverModelOnly: false, schedule: null, failure: null };
    const cancelled = ExecutionReport.fromJson(JSON.stringify(terminal), artifact);
    assert.equal(cancelled.schedule(), undefined);
    assert.equal(cancelled.summary().hasSchedule, false);
    cancelled.dispose();
    context.dispose();
});

test("Gantt activity strategy validates its backend, capability and forwarded request", async () => {
    await initialize();
    const artifact = { modelJson: "{}", fingerprint: "expected" };
    const running = { protocolVersion: 1, id: "1", fingerprint: "expected", status: "running", reportJson: null, progressJson: null, error: null };
    const backend = { id: "scip", compiled: true, capabilities: ["linear", "mip"], warnings: [] };
    let host = { protocolVersion: 1, backends: [backend, { id: "gantt-activity", compiled: true, capabilities: ["ganttActivity"], warnings: [] }] };
    let request;
    const client = {
        async capabilities() { return host; },
        async submit(value) { request = value; return { ...running, status: "completed", reportJson: "gantt-report" }; },
        async get() { return running; }, async cancel() { return running; }, async release() {},
    };
    for (const configuration of [null, { backend: "cplex" }, { backend: "scip", timeLimit: 1 }, {}]) {
        assert.throws(() => new GanttActivitySolver(client, configuration), { code: "InvalidInput" });
    }
    const solver = new GanttActivitySolver(client, { backend: "scip" });
    assert.equal((await solver.solve(artifact)).reportJson, "gantt-report");
    assert.equal(request.solver, "gantt-activity"); assert.equal(request.modelKind, "ganttActivity");
    assert.deepEqual(request.ganttActivityOptions, { backend: "scip" });
    host = { ...host, backends: [backend, { ...host.backends[1], capabilities: [] }] };
    await assert.rejects(solver.solve(artifact), { code: "UnsupportedCapability" });
    host = { ...host, backends: [backend, { ...host.backends[1], compiled: false, capabilities: ["ganttActivity"] }] };
    await assert.rejects(solver.solve(artifact), { code: "BackendNotCompiled" });
});

test("Gantt activity solves run over an explicit HTTP host and deliver revalidated placements", { skip: !process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN }, async () => {
    await initialize();
    const context = new ActivityContext(problem()), artifact = context.toArtifact();
    context.dispose();
    const client = new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN });
    let progress = 0;
    const job = await new GanttActivitySolver(client, { backend: "scip" })
        .solve(artifact, { timeLimitMs: 30_000, pollIntervalMs: 5, onProgress() { progress += 1; } });
    try {
        const report = ExecutionReport.fromJson(job.reportJson, artifact);
        const summary = report.summary(), schedule = report.schedule();
        assert.equal(summary.solverModelOnly, false);
        assert.equal(summary.hasSchedule, true);
        assert.ok(summary.problemStatus.length > 0 && summary.terminationReason.length > 0);
        assert.equal(summary.objectiveValue, 4);
        assert.equal(schedule.placements.length, 2);
        assert.deepEqual(schedule.cost, { value: 4, unit: "kg" });
        assert.equal(schedule.candidateCount, 4);
        report.dispose();
        assert.ok(progress >= 1);
    } finally { await client.release(job.id); }
});
