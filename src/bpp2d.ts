import type { Bpp2dPackingContext as ContextBinding, Bpp2dExecutionReportResult as ReportBinding, Bpp2dProductionResult as ProductionBinding, Bpp2dPackingResult as PackingBinding } from "ospf-wasm-bindings";
import type { Bpp2dItem, Bpp2dDemand, Bpp2dProblem, Bpp2dLayer, Bpp2dExecutionSummary, Bpp2dStageSummary, Bpp2dPricingIteration, Bpp2dProduction, Bpp2dUsage,
    Bpp2dPacking, Bpp2dPackedPattern } from "ospf-wasm-bindings/protocol";
import type { ModelArtifact, PhysicalQuantity } from "./base.js";
import { invoke, OspfError } from "./base.js";
import { wasm } from "./runtime.js";

export type { Bpp2dSheetType as SheetType, Bpp2dLayer as Layer, Bpp2dObjective as Objective, Bpp2dStageKind as StageKind,
    Bpp2dGeneratorKind as GeneratorKind, Bpp2dExecutionStop as ExecutionStop, Bpp2dExecutionSummary as ExecutionSummary,
    Bpp2dStageSummary as StageSummary, Bpp2dPricingIteration as PricingIteration,
    Bpp2dRenderPlacement as RenderPlacement, Bpp2dRenderSheet as RenderSheet } from "ospf-wasm-bindings/protocol";
export type { Bpp2dOptions } from "./base.js";
export { Bpp2dColumnGeneration } from "./framework.js";

export interface Item extends Omit<Bpp2dItem, "generationCount"> { generationCount: bigint; }
export type CountDemand = Omit<Extract<Bpp2dDemand, { kind: "count" }>, "count" | "upperBound"> & { count: bigint; upperBound: bigint | null };
export type AreaDemand = Extract<Bpp2dDemand, { kind: "area" }>;
export type Demand = CountDemand | AreaDemand;
export interface PackingProblem extends Omit<Bpp2dProblem, "items" | "sheets" | "demands" | "initialLayers"> {
    items: readonly Item[];
    sheets: readonly Bpp2dProblem["sheets"][number][];
    demands: readonly Demand[];
    initialLayers: readonly Bpp2dLayer[];
}
export interface Usage extends Omit<Bpp2dUsage, "count"> { count: bigint; }
export interface PackedPattern extends Omit<Bpp2dPackedPattern, "usage"> { usage: Usage; }

function count(value: bigint): string {
    if (typeof value !== "bigint" || value < 0n || value > 9_007_199_254_740_991n) {
        throw new OspfError("InvalidInput", "current BPP2D f64 domain requires bigint counts in [0, 2^53 - 1]; larger counts are rejected, never rounded");
    }
    return value.toString();
}

function json(value: unknown): string {
    try { return JSON.stringify(value, (_key, item: unknown) => {
        if ((typeof item === "number" && !Number.isFinite(item)) || typeof item === "function"
            || typeof item === "symbol" || typeof item === "bigint") throw new TypeError("expected finite contract values without callbacks, symbols or unencoded bigint");
        return item;
    }); }
    catch (error) { throw new OspfError("InvalidInput", "BPP2D input cannot be encoded as a contract DTO", { cause: error }); }
}

let wrapReport: (value: ReportBinding) => Bpp2dReport;
let wrapProduction: (value: ProductionBinding) => ProductionResult;
let wrapPacking: (value: PackingBinding) => PackingResult;

/** 源目录、几何及模型校验委托 Rust；此入口不生成列或求解 / Delegate source-catalog, geometry and model validation to Rust; this entry neither generates columns nor solves. */
export class PackingContext {
    private value: ContextBinding | undefined;
    constructor(problem: PackingProblem) {
        if (typeof problem !== "object" || problem === null || !Array.isArray(problem.items) || !Array.isArray(problem.sheets)
            || !Array.isArray(problem.demands) || !Array.isArray(problem.initialLayers)) throw new OspfError("InvalidInput", "expected a BPP2D problem with item/sheet/demand/initial-layer arrays");
        const wire = { ...problem, sheets: [...problem.sheets], initialLayers: [...problem.initialLayers],
            items: problem.items.map(item => {
                if (typeof item !== "object" || item === null) throw new OspfError("InvalidInput", "expected an item DTO");
                return { ...item, generationCount: count(item.generationCount) };
            }),
            demands: problem.demands.map(demand => {
                if (typeof demand !== "object" || demand === null) throw new OspfError("InvalidInput", "expected a demand DTO");
                return demand.kind === "count" ? { ...demand, count: count(demand.count), upperBound: demand.upperBound === null ? null : count(demand.upperBound) } : demand;
            }),
        } satisfies Bpp2dProblem;
        this.value = invoke(() => new (wasm().Bpp2dPackingContext)(json(wire)));
    }
    private raw(): ContextBinding {
        if (!this.value) throw new OspfError("Disposed", "BPP2D context has been disposed");
        return this.value;
    }
    static fromArtifact(artifact: ModelArtifact): PackingContext {
        return invoke(() => {
            const result = Object.create(PackingContext.prototype) as PackingContext;
            result.value = wasm().Bpp2dPackingContext.fromArtifact(json(artifact));
            return result;
        });
    }
    toArtifact(): ModelArtifact { return invoke(() => JSON.parse(this.raw().toArtifactJson()) as ModelArtifact); }
    toJson(): string { return this.toArtifact().modelJson; }
    validateLayers(layers: readonly Bpp2dLayer[]): void {
        if (!Array.isArray(layers)) throw new OspfError("InvalidInput", "expected a BPP2D layer array");
        invoke(() => this.raw().validateLayers(json(layers)));
    }
    /** 每个输入层仅装箱一次，不代表需求满足或求解证明；独立装箱预算超限会报错 / Pack each input layer once, not a demand-satisfaction or solve proof; exceeding independent packing budgets is an error. */
    packLayers(layers: readonly Bpp2dLayer[]): PackingResult {
        if (!Array.isArray(layers)) throw new OspfError("InvalidInput", "expected a BPP2D layer array");
        return invoke(() => wrapPacking(this.raw().packLayers(json(layers))));
    }
    /** 完整阶段、原模型、认证对偶和定价轨迹只在 Rust 内复验 / Revalidate complete stages, actual models, certified duals and pricing traces only in Rust. */
    readExecutionReport(text: string): Bpp2dReport {
        if (typeof text !== "string") throw new OspfError("InvalidInput", "expected lossless BPP2D execution-report text");
        return invoke(() => wrapReport(this.raw().readExecutionReport(text)));
    }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 独立源绑定报告；受限池结论不升级为全局证明，原报告精确元数据保留文本 / Independent source-bound report; restricted-pool conclusions never become global proofs and exact raw metadata remains text. */
export class Bpp2dReport {
    private constructor(private value: ReportBinding | undefined) {}
    static { wrapReport = value => new Bpp2dReport(value); }
    private raw(): ReportBinding {
        if (!this.value) throw new OspfError("Disposed", "BPP2D report has been disposed");
        return this.value;
    }
    static fromJson(text: string, source: ModelArtifact): Bpp2dReport {
        if (typeof text !== "string") throw new OspfError("InvalidInput", "expected lossless BPP2D execution-report text");
        return invoke(() => wrapReport(wasm().Bpp2dExecutionReportResult.fromJson(text, json(source))));
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    summary(): Bpp2dExecutionSummary { return invoke(() => JSON.parse(this.raw().summaryJson()) as Bpp2dExecutionSummary); }
    stages(): Bpp2dStageSummary[] { return invoke(() => JSON.parse(this.raw().stagesJson()) as Bpp2dStageSummary[]); }
    columns(): Bpp2dLayer[] { return invoke(() => JSON.parse(this.raw().columnsJson()) as Bpp2dLayer[]); }
    iterations(): Bpp2dPricingIteration[] { return invoke(() => JSON.parse(this.raw().iterationsJson()) as Bpp2dPricingIteration[]); }
    private index(index: number): number {
        if (!Number.isInteger(index) || index < 0 || index > 0xffff_ffff) throw new OspfError("InvalidInput", "expected an unsigned stage index");
        return index;
    }
    /** 内部模型及报告仍是无损文本，不应直接用 JS JSON.parse 解析其数值 / Inner model/report data remains lossless text; do not directly parse its numbers with JS JSON.parse. */
    stageJson(index: number): string | undefined { return invoke(() => this.raw().stageJson(this.index(index))); }
    stageReportJson(index: number): string | undefined { return invoke(() => this.raw().stageReportJson(this.index(index))); }
    production(): ProductionResult | undefined { return invoke(() => { const value = this.raw().production(); return value === undefined ? undefined : wrapProduction(value); }); }
    /** 仅 final 整数生产可导出，压缩份数不展开，结果独立于报告生命周期 / Available only from final integer production; copies stay compressed and the result outlives its report. */
    packing(): PackingResult | undefined { return invoke(() => { const value = this.raw().packing(); return value === undefined ? undefined : wrapPacking(value); }); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 原 Rust 装箱器与渲染适配的独立副本，不在 TS 重新计算几何或算法 / Independent copy from the original Rust packer/render adapter, without reimplementing geometry or algorithms in TS. */
export class PackingResult {
    private constructor(private value: PackingBinding | undefined) {}
    static { wrapPacking = value => new PackingResult(value); }
    toJson(): string {
        if (!this.value) throw new OspfError("Disposed", "BPP2D packing has been disposed");
        return invoke(() => this.value!.toJson());
    }
    private data(): Bpp2dPacking { return JSON.parse(this.toJson()) as Bpp2dPacking; }
    sourceFingerprint(): string { return this.data().sourceFingerprint; }
    patterns(): PackedPattern[] { return this.data().patterns.map(pattern => ({ ...pattern, usage: { ...pattern.usage, count: BigInt(pattern.usage.count) } })); }
    /** 默认成品物品 ID 的稀疏映射，零产出键省略 / Sparse default finished-item ID map, omitting zero-output keys. */
    materialCounts(): ReadonlyMap<string, bigint> { return new Map(Object.entries(this.data().materialCounts).map(([id, value]) => [id, BigInt(value!)])); }
    sheetCount(): bigint { return BigInt(this.data().sheetCount); }
    itemCount(): bigint { return BigInt(this.data().itemCount); }
    consumedArea(): PhysicalQuantity { return this.data().consumedArea; }
    occupiedArea(): PhysicalQuantity { return this.data().occupiedArea; }
    remnantArea(): PhysicalQuantity { return this.data().remnantArea; }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 仅从 final 整数 incumbent 导出的独立生产副本，不展开大量板材 / Independent production copy derived only from the final integer incumbent, without expanding large sheet counts. */
export class ProductionResult {
    private constructor(private value: ProductionBinding | undefined) {}
    static { wrapProduction = value => new ProductionResult(value); }
    toJson(): string {
        if (!this.value) throw new OspfError("Disposed", "BPP2D production has been disposed");
        return invoke(() => this.value!.toJson());
    }
    private data(): Bpp2dProduction { return JSON.parse(this.toJson()) as Bpp2dProduction; }
    usages(): Usage[] { return this.data().usages.map(usage => ({ ...usage, count: BigInt(usage.count) })); }
    producedCounts(): ReadonlyMap<string, bigint> { return new Map(Object.entries(this.data().producedCounts).map(([id, value]) => [id, BigInt(value!)])); }
    producedAreas(): ReadonlyMap<string, PhysicalQuantity> { return new Map(Object.entries(this.data().producedAreas).map(([id, value]) => [id, value!])); }
    sheetCounts(): ReadonlyMap<string, bigint> { return new Map(Object.entries(this.data().sheetCounts).map(([id, value]) => [id, BigInt(value!)])); }
    consumedArea(): PhysicalQuantity { return this.data().consumedArea; }
    objectiveValue(): number { return this.data().objectiveValue; }
    dispose(): void { this.value?.free(); this.value = undefined; }
}
