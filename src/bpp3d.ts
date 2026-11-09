import type { Bpp3dPackingContext as ContextBinding, Bpp3dExecutionReportResult as ReportBinding, Bpp3dPackingResult as PackingBinding } from "ospf-wasm-bindings";
import type { Bpp3dAssignment, Bpp3dExecutionStageSummary, Bpp3dExecutionSummary, Bpp3dItem, Bpp3dPacking, Bpp3dProblem } from "ospf-wasm-bindings/protocol";
import type { ModelArtifact } from "./base.js";
import { invoke, OspfError } from "./base.js";
import { wasm } from "./runtime.js";

export type { Bpp3dGeneratorKind as GeneratorKind, Bpp3dOrientation as Orientation, Bpp3dPoint as Point, Bpp3dBin as Bin,
    Bpp3dPlacement as Placement, Bpp3dLayer as Layer, Bpp3dAssignment as Assignment,
    Bpp3dPackedBin as PackedBin, Bpp3dPacking as Packing } from "ospf-wasm-bindings/protocol";
export type { Bpp3dExecutionStageKind as StageKind, Bpp3dExecutionStageSummary as StageSummary,
    Bpp3dExecutionSummary as ExecutionSummary } from "ospf-wasm-bindings/protocol";
export type { Bpp3dOptions } from "./base.js";
export { Bpp3dOneRoundExecution } from "./framework.js";

export interface Item extends Omit<Bpp3dItem, "amount"> { amount: bigint; }
export interface PackingProblem extends Omit<Bpp3dProblem, "items" | "bins" | "initialLayers"> {
    items: readonly Item[];
    bins: readonly Bpp3dProblem["bins"][number][];
    initialLayers: readonly Bpp3dProblem["initialLayers"][number][];
}

function count(value: bigint): string {
    if (typeof value !== "bigint" || value < 1n || value > 100_000n) throw new OspfError("InvalidInput", "BPP3D demand must be bigint within [1, 100000]");
    return value.toString();
}

function json(value: unknown): string {
    try { return JSON.stringify(value, (_key, item: unknown) => {
        if ((typeof item === "number" && !Number.isFinite(item)) || typeof item === "function" || typeof item === "symbol"
            || typeof item === "bigint" || typeof item === "undefined") throw new TypeError("expected finite contract values without callbacks, symbols, undefined or unencoded bigint");
        return item;
    }); }
    catch (error) { throw new OspfError("InvalidInput", "BPP3D input cannot be encoded as a contract DTO", { cause: error }); }
}

let wrapReport: (value: ReportBinding) => ExecutionReport;
let wrapPacking: (value: PackingBinding) => PackingResult;

/** 源目录和单层物理 trace 委托 Rust 校验；不执行求解 / Delegate source and individual-layer physical traces to Rust; never execute a solver. */
export class PackingContext {
    private value: ContextBinding | undefined;
    constructor(problem: PackingProblem) {
        if (typeof problem !== "object" || problem === null || !Array.isArray(problem.items) || !Array.isArray(problem.bins)
            || !Array.isArray(problem.initialLayers)) throw new OspfError("InvalidInput", "expected a BPP3D problem with item, bin and initial-layer arrays");
        const wire = { ...problem, bins: [...problem.bins], initialLayers: [...problem.initialLayers], items: problem.items.map(item => {
            if (typeof item !== "object" || item === null) throw new OspfError("InvalidInput", "expected a BPP3D item DTO");
            return { ...item, amount: count(item.amount) };
        }) } satisfies Bpp3dProblem;
        this.value = invoke(() => new (wasm().Bpp3dPackingContext)(json(wire)));
    }
    private raw(): ContextBinding {
        if (!this.value) throw new OspfError("Disposed", "BPP3D context has been disposed");
        return this.value;
    }
    static fromArtifact(artifact: ModelArtifact): PackingContext {
        return invoke(() => {
            const result = Object.create(PackingContext.prototype) as PackingContext;
            result.value = wasm().Bpp3dPackingContext.fromArtifact(json(artifact));
            return result;
        });
    }
    toArtifact(): ModelArtifact { return invoke(() => JSON.parse(this.raw().toArtifactJson()) as ModelArtifact); }
    toJson(): string { return this.toArtifact().modelJson; }
    problem(): PackingProblem {
        const wire = invoke(() => JSON.parse(this.raw().problemJson()) as Bpp3dProblem);
        return { ...wire, items: wire.items.map(item => ({ ...item, amount: BigInt(item.amount) })) };
    }
    /** 严格复验完整源层方案；结果不代表求解或最优性 / Strictly revalidate complete source-layer assignments, without claiming a solve or optimality. */
    packLayers(assignments: readonly Bpp3dAssignment[]): Bpp3dPacking {
        const value = this.raw();
        if (!Array.isArray(assignments) || assignments.length > 4096) throw new OspfError("InvalidInput", "BPP3D plans require at most 4096 assignments");
        return invoke(() => JSON.parse(value.packLayersJson(json(assignments))) as Bpp3dPacking);
    }
    /** 完整单轮阶段、原模型、原报告与严格物理回放只在 Rust 内复验 / Revalidate complete one-round stages, actual models, original reports and strict physical replay only in Rust. */
    readExecutionReport(text: string): ExecutionReport {
        if (typeof text !== "string") throw new OspfError("InvalidInput", "expected lossless BPP3D execution-report text");
        return invoke(() => wrapReport(this.raw().readExecutionReport(text)));
    }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 独立源绑定单轮报告；启发式生成与受限池结论不升级为源问题证明 / Independent source-bound one-round report; heuristic generation and restricted-pool conclusions never become source-problem proofs. */
export class ExecutionReport {
    private constructor(private value: ReportBinding | undefined) {}
    static { wrapReport = value => new ExecutionReport(value); }
    private raw(): ReportBinding {
        if (!this.value) throw new OspfError("Disposed", "BPP3D execution report has been disposed");
        return this.value;
    }
    static fromJson(text: string, source: ModelArtifact): ExecutionReport {
        if (typeof text !== "string") throw new OspfError("InvalidInput", "expected lossless BPP3D execution-report text");
        return invoke(() => wrapReport(wasm().Bpp3dExecutionReportResult.fromJson(text, json(source))));
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    summary(): Bpp3dExecutionSummary { return invoke(() => JSON.parse(this.raw().summaryJson()) as Bpp3dExecutionSummary); }
    /** 原流程结果 info 中的连续半径条目（选中数量、每变量半径/平方/分段、诊断）；无半径源时为空对象。
     * Continuous-radius entries from the original flow info (selected count, per-variable radius/squared/segment and
     * diagnostics); an empty object for sources without one. */
    continuousRadius(): Readonly<Record<string, string>> { return invoke(() => JSON.parse(this.raw().continuousRadiusJson()) as Record<string, string>); }
    stages(): Bpp3dExecutionStageSummary[] { return invoke(() => JSON.parse(this.raw().stagesJson()) as Bpp3dExecutionStageSummary[]); }
    private index(index: number): number {
        if (!Number.isInteger(index) || index < 0 || index > 0xffff_ffff) throw new OspfError("InvalidInput", "expected an unsigned stage index");
        return index;
    }
    /** 阶段封装仍是文本，含实际模型与完整原报告 / The stage envelope remains text holding the actual model and complete raw report. */
    stageJson(index: number): string | undefined { return invoke(() => this.raw().stageJson(this.index(index))); }
    /** 该阶段实际求解所用的源绑定列池文本 / Source-bound pool text actually solved by this stage. */
    stagePoolJson(index: number): string | undefined { return invoke(() => this.raw().stagePoolJson(this.index(index))); }
    /** 原始子报告文本；后端未接受报告时不存在 / Raw child-report text, absent when the backend accepted none. */
    stageReportJson(index: number): string | undefined { return invoke(() => this.raw().stageReportJson(this.index(index))); }
    /** 仅严格物理回放成功时存在，结果独立于报告生命周期 / Present only after strict physical replay succeeds; the result outlives its report. */
    packing(): PackingResult | undefined { return invoke(() => { const value = this.raw().packing(); return value === undefined ? undefined : wrapPacking(value); }); }
    /** 该报告的源封装，可用于另一次独立复验 / Source artifact of this report, reusable for an independent revalidation. */
    source(): ModelArtifact { return invoke(() => JSON.parse(this.raw().sourceJson()) as ModelArtifact); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 独立米制装箱副本，不在 TS 重新计算几何 / Independent meter-based packing copy, without reimplementing geometry in TS. */
export class PackingResult {
    private constructor(private value: PackingBinding | undefined) {}
    static { wrapPacking = value => new PackingResult(value); }
    toJson(): string {
        if (!this.value) throw new OspfError("Disposed", "BPP3D packing has been disposed");
        return invoke(() => this.value!.toJson());
    }
    packing(): Bpp3dPacking { return JSON.parse(this.toJson()) as Bpp3dPacking; }
    sourceFingerprint(): string { return this.packing().sourceFingerprint; }
    bins(): Bpp3dPacking["bins"] { return this.packing().bins; }
    dispose(): void { this.value?.free(); this.value = undefined; }
}
