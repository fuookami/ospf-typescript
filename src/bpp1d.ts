import type { Bpp1dPackingContext as ContextBinding, Bpp1dPackingResult as PackingBinding, Bpp1dPatternGenerationResult as PatternsBinding, Bpp1dReport as ReportBinding } from "ospf-wasm-bindings";
import type { Bpp1dItem, Bpp1dBinType, Bpp1dProblem, Bpp1dPattern, Bpp1dUsage, Bpp1dGenerationOptions, Bpp1dPatterns, Bpp1dPacking, Bpp1dKpi, Bpp1dPlan, Bpp1dRenderSchema, Bpp1dCsvOptions } from "ospf-wasm-bindings/protocol";
import type { Bpp1dCsvOptions as CsvOptions } from "ospf-wasm-bindings/protocol";
import type { ModelArtifact, Bpp1dSummary } from "./base.js";
import { invoke, OspfError } from "./base.js";
import type { UnitSymbol } from "./quantities.js";
import { wasm } from "./runtime.js";

export { Bpp1dMilp, Bpp1dColumnGeneration } from "./framework.js";
export type { Bpp1dOptions, Bpp1dAlgorithm, Bpp1dSummary, PhysicalQuantity } from "./base.js";
export type { UnitSymbol } from "./quantities.js";
export type { Bpp1dCsvOptions as CsvOptions } from "ospf-wasm-bindings/protocol";
export type { Bpp1dRenderSchema as RenderSchema, Bpp1dRenderBin as RenderBin, Bpp1dRenderItem as RenderItem } from "ospf-wasm-bindings/protocol";
export type { Bpp1dGenerationOptions as PatternGenerationOptions, Bpp1dPlan as PackingPlan, Bpp1dPlacement as Placement, Bpp1dFreeInterval as FreeInterval } from "ospf-wasm-bindings/protocol";

export interface Item extends Omit<Bpp1dItem, "amount" | "materials"> { amount: bigint; materials: ReadonlyMap<string, bigint>; }
export interface BinType extends Omit<Bpp1dBinType, "inventory"> { inventory: bigint | null; }
export interface PackingProblem extends Omit<Bpp1dProblem, "items" | "binTypes"> { items: readonly Item[]; binTypes: readonly BinType[]; }
export interface PackingPattern extends Omit<Bpp1dPattern, "amounts"> { amounts: ReadonlyMap<string, bigint>; }
export interface PatternUsage extends Omit<Bpp1dUsage, "pattern" | "count"> { pattern: PackingPattern; count: bigint; }
export interface PackingKpi extends Omit<Bpp1dKpi, "binCount" | "itemCount"> { binCount: bigint; itemCount: bigint; }

function count(value: bigint): string {
    if (typeof value !== "bigint" || value < 0n || value > 0xffff_ffff_ffff_ffffn) throw new OspfError("InvalidInput", "expected a bigint in the u64 range");
    return value.toString();
}

function counts(values: ReadonlyMap<string, bigint>): Record<string, string> {
    if (!(values instanceof Map)) throw new OspfError("InvalidInput", "exact counts must be a Map");
    return Object.fromEntries([...values].map(([id, value]) => {
        if (typeof id !== "string") throw new OspfError("InvalidInput", "exact-count identities must be strings");
        return [id, count(value)];
    }));
}

function pattern(value: PackingPattern): Bpp1dPattern { return { ...value, amounts: counts(value.amounts) }; }
function usages(values: readonly PatternUsage[]): string { return JSON.stringify(values.map(value => ({ ...value, pattern: pattern(value.pattern), count: count(value.count) }))); }

let wrapPatterns: (value: PatternsBinding) => PatternGenerationResult;
let wrapPacking: (value: PackingBinding) => PackingResult;

/** 所有领域计算委托 Rust，精确数量不经 JS number / All domain computation delegates to Rust; exact counts bypass JS number. */
export class PackingContext {
    private value: ContextBinding | undefined;
    /** 从两张严格 CSV 构造：表头必须闭合，空库存表示无限；与 JSON 构造等价 / Build from two strict CSV tables; the header must be closed and an empty inventory means unlimited stock. */
    static fromCsv(itemsText: string, binsText: string, options: CsvOptions): PackingContext {
        for (const text of [itemsText, binsText]) if (typeof text !== "string") throw new OspfError("InvalidInput", "CSV input must be text");
        return invoke(() => {
            const result = Object.create(PackingContext.prototype) as PackingContext;
            result.value = wasm().Bpp1dPackingContext.fromCsv(itemsText, binsText, JSON.stringify(options));
            return result;
        });
    }
    constructor(problem: PackingProblem) {
        this.value = invoke(() => new (wasm().Bpp1dPackingContext)(JSON.stringify({ ...problem,
            items: problem.items.map(item => ({ ...item, amount: count(item.amount), materials: counts(item.materials) })),
            binTypes: problem.binTypes.map(bin => ({ ...bin, inventory: bin.inventory === null ? null : count(bin.inventory) })),
        } satisfies Bpp1dProblem)));
    }
    private raw(): ContextBinding {
        if (!this.value) throw new OspfError("Disposed", "packing context has been disposed");
        return this.value;
    }
    static fromArtifact(artifact: ModelArtifact): PackingContext {
        return invoke(() => {
            const result = Object.create(PackingContext.prototype) as PackingContext;
            result.value = wasm().Bpp1dPackingContext.fromArtifact(JSON.stringify(artifact));
            return result;
        });
    }
    toArtifact(): ModelArtifact { return invoke(() => JSON.parse(this.raw().toArtifactJson()) as ModelArtifact); }
    toJson(): string { return this.toArtifact().modelJson; }
    generatePatterns(options: Bpp1dGenerationOptions = {}): PatternGenerationResult { return invoke(() => wrapPatterns(this.raw().generatePatterns(JSON.stringify(options)))); }
    validatePattern(value: PackingPattern): void { invoke(() => this.raw().validatePattern(JSON.stringify(pattern(value)))); }
    verifyUsages(values: readonly PatternUsage[]): void { invoke(() => this.raw().verifyUsages(usages(values))); }
    pack(values: readonly PatternUsage[], expansionLimit = 100_000): PackingResult {
        if (!Number.isInteger(expansionLimit) || expansionLimit < 1 || expansionLimit > 100_000) throw new OspfError("InvalidInput", "expansion limit must be in [1, 100000]");
        return invoke(() => wrapPacking(this.raw().pack(usages(values), expansionLimit)));
    }
    verifyPlans(plans: readonly Bpp1dPlan[]): PackingResult { return invoke(() => wrapPacking(this.raw().verifyPlans(JSON.stringify(plans)))); }
    /** 用原域渲染适配器生成展示方案；展示单位下的数值不是精度或最优性证据 / Render through the original domain adapter; display-unit numbers are never precision or optimality evidence. */
    render(plans: readonly Bpp1dPlan[], unit: UnitSymbol): Bpp1dRenderSchema {
        return invoke(() => JSON.parse(this.raw().render(JSON.stringify(plans), unit)) as Bpp1dRenderSchema);
    }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 独立候选结果，可在 context 释放后读取 / Independent candidate result readable after context disposal. */
export class PatternGenerationResult {
    private constructor(private value: PatternsBinding | undefined) {}
    static { wrapPatterns = value => new PatternGenerationResult(value); }
    private data(): Bpp1dPatterns {
        if (!this.value) throw new OspfError("Disposed", "pattern generation result has been disposed");
        return invoke(() => JSON.parse(this.value!.toJson()) as Bpp1dPatterns);
    }
    patterns(): PackingPattern[] { return this.data().patterns.map(value => ({ ...value, amounts: new Map(Object.entries(value.amounts).map(([id, count]) => [id, BigInt(count!)])) })); }
    complete(): boolean { return this.data().complete; }
    visitedNodes(): number { return this.data().visitedNodes; }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** Rust 验证的物理结果，所有访问均为独立副本 / Rust-validated physical result; all reads return independent copies. */
export class PackingResult {
    private constructor(private value: PackingBinding | undefined) {}
    static { wrapPacking = value => new PackingResult(value); }
    toJson(): string {
        if (!this.value) throw new OspfError("Disposed", "packing result has been disposed");
        return invoke(() => this.value!.toJson());
    }
    private data(): Bpp1dPacking { return JSON.parse(this.toJson()) as Bpp1dPacking; }
    plans(): Bpp1dPacking["plans"] { return this.data().plans; }
    freeIntervals(): Bpp1dPacking["freeIntervals"] { return this.data().freeIntervals; }
    materials(): ReadonlyMap<string, bigint> { return new Map(Object.entries(this.data().materials).map(([id, value]) => [id, BigInt(value!)])); }
    objective(): number { return this.data().objective; }
    kpi(): PackingKpi { const value = this.data().kpi; return { ...value, binCount: BigInt(value.binCount), itemCount: BigInt(value.itemCount) }; }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 原始子报告不经 JS JSON 数值解码；物理结果独立复验 / Original child reports bypass JS numeric decoding; physical results are independently revalidated. */
export class Bpp1dReport {
    private constructor(private value: ReportBinding | undefined) {}
    private raw(): ReportBinding {
        if (!this.value) throw new OspfError("Disposed", "BPP1D report has been disposed");
        return this.value;
    }
    static fromJson(json: string, artifact: ModelArtifact): Bpp1dReport { return invoke(() => new Bpp1dReport(wasm().Bpp1dReport.fromJson(json, JSON.stringify(artifact)))); }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    summary(): Bpp1dSummary { return invoke(() => JSON.parse(this.raw().summaryJson()) as Bpp1dSummary); }
    solverReportJson(): string { return invoke(() => this.raw().solverReportJson()); }
    packing(): PackingResult | undefined { return invoke(() => { const value = this.raw().packing(); return value ? wrapPacking(value) : undefined; }); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}
