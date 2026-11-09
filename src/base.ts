export type {
    BppLoadingOptions, BppLoadingBendersOptions, BppLoadingSourceFinishingOptions, BppLoadingCertificationEvidence,
    BppLoadingPartitionExecutionOptions, BppLoadingPartitionCall, BppLoadingPartitionSummary,
    BackendDescriptor, BridgeError, HostCapabilities, JobStatus, JobView,
    ModelArtifact, ModelKind, SolveRequest, ReportSummary, ConstraintOptions, ActivityOptions, ActivityStatus, MipLoweringAnalysis,
    ConstraintProgrammingOptions, IntegerSolutionHint,
    NativeBackend, SerialFallbackPolicy, SerialLinearOptions,
    ParallelCombinatorialMode, ParallelLinearOptions,
    ColumnGenerationBlock, ColumnGenerationOptions, ColumnGenerationStop, ColumnGenerationSummary,
    FixedRecourseOptions, FixedRecourseStage, FixedRecourseStop, FixedRecourseSummary, StagedVariable,
    QuantityUnit, PhysicalQuantity, Bpp1dOptions, Bpp1dAlgorithm, Bpp1dSummary,
    Bpp2dOptions, Bpp2dExecutionSummary, Bpp3dOptions, Bpp3dExecutionSummary, GanttActivityOptions,
    Csp2dOptions, Csp2dExecutionSummary,
    Csp1dOptions, Csp1dAlgorithm, Csp1dBusinessStatus, Csp1dExecutionStop, Csp1dExecutionSummary,
} from "ospf-wasm-bindings/protocol";

/** 统一边界错误 / Unified boundary error. */
export class OspfError extends Error {
    /** 提交后的失败保留任务 ID，便于恢复和释放 / Retain the submitted job ID for recovery and release. */
    jobId?: string;
    constructor(readonly code: string, message: string, options?: ErrorOptions) {
        super(message, options);
        this.name = "OspfError";
    }
}

/** 保留 Rust 错误码 / Preserve Rust error codes. */
export function boundaryError(error: unknown): OspfError {
    if (error instanceof OspfError) return error;
    const message = error instanceof Error ? error.message : String(error);
    try {
        const parsed: unknown = JSON.parse(message);
        if (typeof parsed === "object" && parsed !== null && "code" in parsed && "message" in parsed
            && typeof parsed.code === "string" && typeof parsed.message === "string") {
            return new OspfError(parsed.code, parsed.message, { cause: error });
        }
    } catch { /* 非协议错误保留原始原因 / Preserve the original cause for non-protocol errors. */ }
    return new OspfError("ExecutionFailure", message, { cause: error });
}

/** 归一化同步 Rust 错误 / Normalize synchronous Rust errors. */
export function invoke<T>(operation: () => T): T {
    try { return operation(); } catch (error) { throw boundaryError(error); }
}
