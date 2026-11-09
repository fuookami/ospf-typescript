import { ActivityContext, ExecutionReport } from "/dist/gantt.js";

/** 无 fixture 时构造本地源并验证往返、候选展开与方案复验。 / Without a fixture, build a local source and verify roundtrip, candidate expansion and plan replay. */
export function checkGanttActivity(fixture) {
    if (fixture) {
        const context = ActivityContext.fromArtifact(fixture.source), report = context.readExecutionReport(fixture.reportJson);
        const summary = report.summary(), schedule = report.schedule();
        const plan = { selections: schedule.placements.map(placement => ({ task: placement.task, mode: placement.mode, start: placement.start })) };
        const replay = context.replay(plan);
        const output = { summary, sameText: report.toJson() === fixture.reportJson, sourceFingerprint: report.source().fingerprint,
            placementCount: schedule.placements.length, candidateCount: schedule.candidateCount, cost: schedule.cost,
            replayCost: replay.schedule.cost, replayPlacements: replay.schedule.placements.length,
            replayCandidates: replay.schedule.candidateCount, cancelledCount: schedule.cancelled.length };
        context.dispose(); report.dispose();
        return output;
    }
    const source = { horizon: { start: "2026-01-01T00:00:00Z", end: "2026-01-02T00:00:00Z" }, costUnit: "kg",
        resources: [{ id: "machine", capacity: { value: 1, unit: "kg" }, unavailableTimes: [], capacities: [] }],
        activities: [{ id: "job", modes: [{ id: "run", durationSeconds: 3600, starts: ["2026-01-01T01:00:00Z", "2026-01-01T02:00:00Z"],
            resources: [{ resource: "machine", quantity: { value: 1, unit: "kg" }, fromSeconds: 0 }], cost: { value: 2, unit: "kg" } }] }],
        dependencies: [] };
    const context = new ActivityContext(source), artifact = context.toArtifact(), summary = context.sourceSummary();
    const result = { sameText: context.toJson() === artifact.modelJson, fingerprint: artifact.fingerprint,
        choices: summary.choiceCount, activities: summary.activityCount, modes: summary.modeCount, horizonStart: summary.horizonStart };
    const copy = ActivityContext.fromArtifact(artifact);
    const replay = copy.replay({ selections: [{ task: "job", mode: "run", start: "2026-01-01T01:00:00Z" }] });
    result.cost = replay.schedule.cost; result.placements = replay.schedule.placements.length;
    result.reservation = replay.schedule.placements[0].reservations[0].resource;
    try { copy.replay({ selections: [{ task: "job", mode: "run", start: "2026-01-01T05:00:00Z" }] }); } catch (error) { result.undeclared = error.code; }
    try { copy.readExecutionReport("{"); } catch (error) { result.invalidReport = error.code; }
    context.dispose(); copy.dispose();
    try { context.toJson(); } catch (error) { result.disposed = error.code; }
    return result;
}
