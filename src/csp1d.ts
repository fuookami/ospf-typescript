import type { Csp1dCuttingContext as ContextBinding, Csp1dPatternGenerationResult as PatternsBinding, Csp1dProductionResult as ProductionBinding, Csp1dProductionReportResult as ReportBinding, Csp1dExecutionReportResult as ExecutionBinding } from "ospf-wasm-bindings";
import type { Csp1dProduct, Csp1dMaterial, Csp1dMachine, Csp1dDemand, Csp1dProblem, Csp1dSlice, Csp1dPattern, Csp1dUsage, Csp1dPatterns, Csp1dProduction, Csp1dGenerationOptions, Csp1dProductionReportSummary } from "ospf-wasm-bindings/protocol";
import type { ModelArtifact, PhysicalQuantity, Csp1dExecutionSummary } from "./base.js";
import { invoke, OspfError } from "./base.js";
import { wasm } from "./runtime.js";

export type { Csp1dDemandMode as DemandMode, Csp1dGeneratorKind as GeneratorKind, Csp1dGenerationOptions as PatternGenerationOptions, Csp1dWidthRange as WidthRange } from "ospf-wasm-bindings/protocol";
export type { PhysicalQuantity } from "./base.js";
export type { Csp1dProductionReportSummary as ProductionReportSummary, Csp1dStageKind as StageKind } from "ospf-wasm-bindings/protocol";
export type { Csp1dOptions, Csp1dAlgorithm, Csp1dBusinessStatus, Csp1dExecutionStop, Csp1dExecutionSummary } from "./base.js";
export { Csp1dMilp, Csp1dColumnGeneration } from "./framework.js";

export interface Product extends Omit<Csp1dProduct, "width"> { width: readonly PhysicalQuantity[]; }
export interface Material extends Omit<Csp1dMaterial, "availableBatches"> { availableBatches: bigint | null; }
export interface Machine extends Omit<Csp1dMachine, "maxBatchCount"> { maxBatchCount: bigint | null; }
export interface ProductDemand extends Omit<Csp1dDemand, "count"> { count: bigint; }
export interface CuttingProblem extends Omit<Csp1dProblem, "products" | "materials" | "machines" | "demands"> {
    products: readonly Product[];
    materials: readonly Material[];
    machines: readonly Machine[];
    demands: readonly ProductDemand[];
}
export interface CuttingPlanSlice extends Omit<Csp1dSlice, "amount"> { amount: bigint; }
export interface CuttingPlan extends Omit<Csp1dPattern, "slices"> { slices: readonly CuttingPlanSlice[]; }
export interface CuttingPlanUsage extends Omit<Csp1dUsage, "plan" | "count"> { plan: CuttingPlan; count: bigint; }

function count(value: bigint): string {
    if (typeof value !== "bigint" || value < 0n || value > 9_007_199_254_740_991n) {
        throw new OspfError("InvalidInput", "current CSP1D f64 domain requires bigint counts in [0, 2^53 - 1]; larger counts are rejected, never rounded");
    }
    return value.toString();
}

function encodePlan(value: CuttingPlan): Csp1dPattern {
    if (typeof value !== "object" || value === null || !Array.isArray(value.slices)) throw new OspfError("InvalidInput", "expected a cutting plan with slices");
    return { ...value, slices: value.slices.map(slice => {
        if (typeof slice !== "object" || slice === null) throw new OspfError("InvalidInput", "expected a cutting plan slice");
        return { ...slice, amount: count(slice.amount) };
    }) };
}

function decodePlan(value: Csp1dPattern): CuttingPlan { return { ...value, slices: value.slices.map(slice => ({ ...slice, amount: BigInt(slice.amount) })) }; }

function json(value: unknown): string {
    try { return JSON.stringify(value, (_key, item: unknown) => {
        if ((typeof item === "number" && !Number.isFinite(item)) || typeof item === "function"
            || typeof item === "symbol" || typeof item === "bigint") throw new TypeError("expected finite contract values without callbacks, symbols or unencoded bigint");
        return item;
    }); }
    catch (error) { throw new OspfError("InvalidInput", "CSP1D input cannot be encoded as a contract DTO", { cause: error }); }
}

let wrapPatterns: (value: PatternsBinding) => PatternGenerationResult;
let wrapProduction: (value: ProductionBinding) => ProductionResult;
let wrapReport: (value: ReportBinding) => ProductionReport;
let wrapExecution: (value: ExecutionBinding) => Csp1dReport;

/** 复用原 Rust CSP1D 物理量、生成与 context 校验；不是浏览器求解器 / Reuse Rust CSP1D quantities, generation and context checks; not a browser solver. */
export class CuttingContext {
    private value: ContextBinding | undefined;
    constructor(problem: CuttingProblem) {
        if (typeof problem !== "object" || problem === null || !Array.isArray(problem.products) || !Array.isArray(problem.materials)
            || !Array.isArray(problem.machines) || !Array.isArray(problem.demands)) throw new OspfError("InvalidInput", "expected a CSP1D problem with product/material/machine/demand arrays");
        const wire = { ...problem, products: problem.products.map(product => {
                if (typeof product !== "object" || product === null || !Array.isArray(product.width)) throw new OspfError("InvalidInput", "expected product width arrays");
                return { ...product, width: [...product.width] };
            }),
            materials: problem.materials.map(material => {
                if (typeof material !== "object" || material === null) throw new OspfError("InvalidInput", "expected a material DTO");
                return { ...material, availableBatches: material.availableBatches === null ? null : count(material.availableBatches) };
            }),
            machines: problem.machines.map(machine => {
                if (typeof machine !== "object" || machine === null) throw new OspfError("InvalidInput", "expected a machine DTO");
                return { ...machine, maxBatchCount: machine.maxBatchCount === null ? null : count(machine.maxBatchCount) };
            }),
            demands: problem.demands.map(demand => {
                if (typeof demand !== "object" || demand === null) throw new OspfError("InvalidInput", "expected a demand DTO");
                return { ...demand, count: count(demand.count) };
            }),
        } satisfies Csp1dProblem;
        this.value = invoke(() => new (wasm().Csp1dCuttingContext)(json(wire)));
    }
    private raw(): ContextBinding {
        if (!this.value) throw new OspfError("Disposed", "cutting context has been disposed");
        return this.value;
    }
    static fromArtifact(artifact: ModelArtifact): CuttingContext {
        return invoke(() => {
            const result = Object.create(CuttingContext.prototype) as CuttingContext;
            result.value = wasm().Csp1dCuttingContext.fromArtifact(json(artifact));
            return result;
        });
    }
    toArtifact(): ModelArtifact { return invoke(() => JSON.parse(this.raw().toArtifactJson()) as ModelArtifact); }
    toJson(): string { return this.toArtifact().modelJson; }
    generatePatterns(options: Csp1dGenerationOptions = {}): PatternGenerationResult { return invoke(() => wrapPatterns(this.raw().generatePatterns(json(options)))); }
    validatePlan(plan: CuttingPlan): void { invoke(() => this.raw().validatePlan(json(encodePlan(plan)))); }
    verifyUsages(usages: readonly CuttingPlanUsage[]): ProductionResult {
        if (!Array.isArray(usages)) throw new OspfError("InvalidInput", "expected cutting plan usages");
        return invoke(() => wrapProduction(this.raw().verifyUsages(json(usages.map(usage => {
            if (typeof usage !== "object" || usage === null) throw new OspfError("InvalidInput", "expected a cutting plan usage");
            return { ...usage, plan: encodePlan(usage.plan), count: count(usage.count) };
        })))));
    }
    /** 校验实际整数子报告与完整源候选池，产出只从实际列导出；不求解或认证来源 / Check an actual integer report and complete source pool, deriving production only from actual columns; no solving or provenance authentication. */
    readProductionReport(reportJson: string): ProductionReport {
        if (typeof reportJson !== "string") throw new OspfError("InvalidInput", "expected lossless CSP1D production report text");
        return invoke(() => wrapReport(this.raw().readProductionReport(reportJson)));
    }
    /** 完整原生阶段与 trace 在 Rust 中复验，不将其数值交给 JS JSON.parse / Revalidate complete native stages and trace in Rust without passing their numbers through JS JSON.parse. */
    readExecutionReport(reportJson: string): Csp1dReport {
        if (typeof reportJson !== "string") throw new OspfError("InvalidInput", "expected lossless CSP1D execution report text");
        return invoke(() => wrapExecution(this.raw().readExecutionReport(reportJson)));
    }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 独立候选结果；截断与不完备状态始终保留 / Independent candidates, always retaining truncation and incompleteness. */
export class PatternGenerationResult {
    private constructor(private value: PatternsBinding | undefined) {}
    static { wrapPatterns = value => new PatternGenerationResult(value); }
    toJson(): string {
        if (!this.value) throw new OspfError("Disposed", "cutting pattern result has been disposed");
        return invoke(() => this.value!.toJson());
    }
    private data(): Csp1dPatterns { return JSON.parse(this.toJson()) as Csp1dPatterns; }
    plans(): CuttingPlan[] { return this.data().plans.map(decodePlan); }
    truncated(): boolean { return this.data().truncated; }
    candidateComplete(): boolean { return this.data().candidateComplete; }
    visitedNodes(): bigint { return BigInt(this.data().visitedNodes); }
    generatedCandidates(): bigint { return BigInt(this.data().generatedCandidates); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 完整源模型与精确整数复验的独立生产结果，不是最优性证明 / Independently owned source-model/exact-count-verified production, not an optimality proof. */
export class ProductionResult {
    private constructor(private value: ProductionBinding | undefined) {}
    static { wrapProduction = value => new ProductionResult(value); }
    toJson(): string {
        if (!this.value) throw new OspfError("Disposed", "cutting production result has been disposed");
        return invoke(() => this.value!.toJson());
    }
    private data(): Csp1dProduction { return JSON.parse(this.toJson()) as Csp1dProduction; }
    usages(): CuttingPlanUsage[] { return this.data().usages.map(usage => ({ ...usage, plan: decodePlan(usage.plan), count: BigInt(usage.count) })); }
    batchCount(): bigint { return BigInt(this.data().batchCount); }
    produced(): ReadonlyMap<string, bigint> { return new Map(Object.entries(this.data().produced).map(([id, value]) => [id, BigInt(value!)])); }
    materialBatches(): ReadonlyMap<string, bigint> { return new Map(Object.entries(this.data().materialBatches).map(([id, value]) => [id, BigInt(value!)])); }
    machineBatches(): ReadonlyMap<string, bigint> { return new Map(Object.entries(this.data().machineBatches).map(([id, value]) => [id, BigInt(value!)])); }
    usedWidth(): PhysicalQuantity { return this.data().usedWidth; }
    trimWidth(): PhysicalQuantity { return this.data().trimWidth; }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 源绑定整数报告，不将候选池最优性提升为全局证明 / Source-bound integer report, never promoting candidate-pool optimality to a global proof. */
export class ProductionReport {
    private constructor(private value: ReportBinding | undefined) {}
    static { wrapReport = value => new ProductionReport(value); }
    private raw(): ReportBinding {
        if (!this.value) throw new OspfError("Disposed", "cutting production report has been disposed");
        return this.value;
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    summary(): Csp1dProductionReportSummary { return invoke(() => JSON.parse(this.raw().summaryJson()) as Csp1dProductionReportSummary); }
    /** 精确 u64 元数据保持原始文本，不应直接交给 JS JSON.parse / Exact u64 metadata remains raw text and should not be passed directly to JS JSON.parse. */
    solverReportJson(): string { return invoke(() => this.raw().solverReportJson()); }
    /** 每次返回独立拥有的生产结果；无 incumbent 时为 undefined / Each call returns independently owned production; undefined without an incumbent. */
    production(): ProductionResult | undefined {
        return invoke(() => { const value = this.raw().production(); return value === undefined ? undefined : wrapProduction(value); });
    }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 原生执行完整报告，阶段、trace、最终整数报告及生产量各自拥有独立副本 / Complete native execution report with independent stage, trace, final-integer and production copies. */
export class Csp1dReport {
    private constructor(private value: ExecutionBinding | undefined) {}
    static { wrapExecution = value => new Csp1dReport(value); }
    private raw(): ExecutionBinding {
        if (!this.value) throw new OspfError("Disposed", "CSP1D execution report has been disposed");
        return this.value;
    }
    static fromJson(text: string, source: ModelArtifact): Csp1dReport {
        if (typeof text !== "string") throw new OspfError("InvalidInput", "expected lossless CSP1D execution report text");
        return invoke(() => wrapExecution(wasm().Csp1dExecutionReportResult.fromJson(text, json(source))));
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    summary(): Csp1dExecutionSummary { return invoke(() => JSON.parse(this.raw().summaryJson()) as Csp1dExecutionSummary); }
    traceJson(): string { return invoke(() => this.raw().traceJson()); }
    private index(index: number): number {
        if (!Number.isInteger(index) || index < 0 || index > 0xffff_ffff) throw new OspfError("InvalidInput", "expected an unsigned stage index");
        return index;
    }
    stageJson(index: number): string | undefined { return invoke(() => this.raw().stageJson(this.index(index))); }
    stageReportJson(index: number): string | undefined { return invoke(() => this.raw().stageReportJson(this.index(index))); }
    integerReport(): ProductionReport | undefined { return invoke(() => { const value = this.raw().integerReport(); return value === undefined ? undefined : wrapReport(value); }); }
    production(): ProductionResult | undefined { return invoke(() => { const value = this.raw().production(); return value === undefined ? undefined : wrapProduction(value); }); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}
