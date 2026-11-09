import type { GanttActivityContext as ContextBinding, GanttActivityExecutionReportResult as ReportBinding } from "ospf-wasm-bindings";
import type {
    GanttActivityPlan, GanttActivityProblem, GanttActivityReplayReport,
    GanttActivitySchedule, GanttActivitySourceSummary,
} from "ospf-wasm-bindings/protocol";
import type { ModelArtifact } from "./base.js";
import { OspfError, invoke } from "./base.js";
import { wasm } from "./runtime.js";

export type {
    GanttActivityEndpoint as Endpoint, GanttActivityPresence as Presence, GanttTimeRange as TimeRange,
    GanttActivityResourceUse as ResourceUse, GanttActivityMode as Mode, GanttActivity as Activity,
    GanttActivityCapacity as Capacity, GanttActivityResource as Resource, GanttActivityDependency as Dependency,
    GanttActivityProblem as Problem, GanttActivitySelection as Selection, GanttActivityPlan as Plan,
    GanttActivityReservation as Reservation, GanttActivityPlacement as Placement, GanttActivitySchedule as Schedule,
    GanttActivityReplayReport as ReplayReport, GanttActivitySourceSummary as SourceSummary,
} from "ospf-wasm-bindings/protocol";
export type { GanttActivityOptions } from "./base.js";

/** 执行摘要子集，分配通过 schedule() 单独读取 / Execution-summary subset; placements are read separately through schedule(). */
export interface ExecutionSummary {
    problemStatus: string;
    terminationReason: string;
    objectiveValue?: number | null;
    solverModelOnly: boolean;
    hasSchedule: boolean;
    failure?: string | null;
}
export { GanttActivitySolver } from "./framework.js";

function json(value: unknown): string {
    try { return JSON.stringify(value); }
    catch (error) { throw new OspfError("InvalidInput", "Gantt activity input cannot be encoded as a contract DTO", { cause: error }); }
}

let wrapReport: (value: ReportBinding) => ExecutionReport;

/** 源校验、候选展开与显式方案复验委托 Rust；不在 WASM 求解 / Delegate source validation, candidate expansion and explicit-plan replay to Rust; never solve in WASM. */
export class ActivityContext {
    private value: ContextBinding | undefined;
    constructor(problem: GanttActivityProblem) {
        if (typeof problem !== "object" || problem === null || !Array.isArray(problem.activities) || !Array.isArray(problem.resources)
            || !Array.isArray(problem.dependencies)) throw new OspfError("InvalidInput", "expected a Gantt activity problem with activity, resource and dependency arrays");
        this.value = invoke(() => new (wasm().GanttActivityContext)(json(problem)));
    }
    private raw(): ContextBinding {
        if (!this.value) throw new OspfError("Disposed", "Gantt activity context has been disposed");
        return this.value;
    }
    static fromArtifact(artifact: ModelArtifact): ActivityContext {
        return invoke(() => {
            const result = Object.create(ActivityContext.prototype) as ActivityContext;
            result.value = wasm().GanttActivityContext.fromArtifact(json(artifact));
            return result;
        });
    }
    toArtifact(): ModelArtifact { return invoke(() => JSON.parse(this.raw().toArtifactJson()) as ModelArtifact); }
    toJson(): string { return this.toArtifact().modelJson; }
    problem(): GanttActivityProblem { return invoke(() => JSON.parse(this.raw().problemJson()) as GanttActivityProblem); }
    /** 展开完整有限候选并返回计数摘要，不是求解结果 / Expand complete finite candidates into a count summary, not a solve result. */
    sourceSummary(): GanttActivitySourceSummary { return invoke(() => JSON.parse(this.raw().sourceSummaryJson()) as GanttActivitySourceSummary); }
    /** 复验显式方案的完整候选、原域规则与库存轨迹 / Revalidate an explicit plan's complete choices, native rules and inventory trails. */
    replay(plan: GanttActivityPlan): GanttActivityReplayReport {
        if (typeof plan !== "object" || plan === null || !Array.isArray(plan.selections)) throw new OspfError("InvalidInput", "expected a Gantt activity plan with a selection array");
        return invoke(() => JSON.parse(this.raw().replayJson(json(plan))) as GanttActivityReplayReport);
    }
    /** 原生执行报告只在 Rust 内复验；结果独立于 context 生命周期 / Native execution reports are revalidated only in Rust, independently of the context lifetime. */
    readExecutionReport(text: string): ExecutionReport {
        if (typeof text !== "string") throw new OspfError("InvalidInput", "expected lossless Gantt activity execution-report text");
        return invoke(() => wrapReport(this.raw().readExecutionReport(text)));
    }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

export { ActivityContext as GanttActivityContext };

/** 独立源绑定执行报告；incumbent 已通过原域复验不等于源问题最优 / Independent source-bound execution report; a revalidated incumbent is not source-wide optimality. */
export class ExecutionReport {
    private constructor(private value: ReportBinding | undefined) {}
    static { wrapReport = value => new ExecutionReport(value); }
    private raw(): ReportBinding {
        if (!this.value) throw new OspfError("Disposed", "Gantt activity execution report has been disposed");
        return this.value;
    }
    static fromJson(text: string, source: ModelArtifact): ExecutionReport {
        return invoke(() => {
            const result = Object.create(ExecutionReport.prototype) as ExecutionReport;
            result.value = wasm().GanttActivityExecutionReportResult.fromJson(text, json(source));
            return result;
        });
    }
    toJson(): string { return this.raw().toJson(); }
    summary(): ExecutionSummary { return invoke(() => JSON.parse(this.raw().summaryJson()) as ExecutionSummary); }
    schedule(): GanttActivitySchedule | undefined {
        const text = this.raw().scheduleJson();
        return text === undefined ? undefined : invoke(() => JSON.parse(text) as GanttActivitySchedule);
    }
    source(): ModelArtifact { return invoke(() => JSON.parse(this.raw().sourceJson()) as ModelArtifact); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}
