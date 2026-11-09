import type { Csp2dCuttingContext as ContextBinding, Csp2dExecutionReportResult as ReportBinding, Csp2dProductionResult as ProductionBinding } from "ospf-wasm-bindings";
import type { Csp2dProblem, Csp2dMaterial, Csp2dGenerationProduct, Csp2dDemand, Csp2dColumn, Csp2dProduction, Csp2dUsage,
    Csp2dExecutionSummary, Csp2dStageSummary, Csp2dPricingIteration, PhysicalQuantity } from "ospf-wasm-bindings/protocol";
import type { ModelArtifact } from "./base.js";
import { invoke, OspfError } from "./base.js";
import { wasm } from "./runtime.js";

export type { Csp2dProduct as Product, Csp2dMaterialShape as MaterialShape, Csp2dCuttingProcess as CuttingProcess,
    Csp2dRegion as Region, Csp2dColumn as Column, Csp2dCutNode as CutNode, Csp2dCutTree as CutTree,
    Csp2dCutOrientation as CutOrientation, Csp2dObjective as Objective } from "ospf-wasm-bindings/protocol";
export type { Csp2dExecutionSummary, Csp2dStageSummary, Csp2dPricingIteration, Csp2dExecutionStop } from "ospf-wasm-bindings/protocol";
export type { Csp2dOptions } from "./base.js";
export { Csp2dColumnGeneration } from "./framework.js";
export interface Usage extends Omit<Csp2dUsage, "count"> { count: bigint; }

export interface GenerationProduct extends Omit<Csp2dGenerationProduct, "count"> { count: bigint; }
export interface Material extends Omit<Csp2dMaterial, "availableBatches" | "products"> {
    availableBatches: bigint;
    products: readonly GenerationProduct[];
}
export type CountDemand = Omit<Extract<Csp2dDemand, { kind: "count" }>, "count" | "upperBound"> & { count: bigint; upperBound: bigint | null };
export type AreaDemand = Extract<Csp2dDemand, { kind: "area" }>;
export type Demand = CountDemand | AreaDemand;
export interface CuttingProblem extends Omit<Csp2dProblem, "products" | "materials" | "demands" | "initialColumns"> {
    products: readonly Csp2dProblem["products"][number][];
    materials: readonly Material[];
    demands: readonly Demand[];
    initialColumns: readonly Csp2dColumn[];
}

function count(value: bigint): string {
    if (typeof value !== "bigint" || value < 0n || value > 9_007_199_254_740_991n) {
        throw new OspfError("InvalidInput", "current CSP2D f64 domain requires bigint counts in [0, 2^53 - 1]; larger counts are rejected, never rounded");
    }
    return value.toString();
}

function json(value: unknown): string {
    try { return JSON.stringify(value, (_key, item: unknown) => {
        if (item === undefined || (typeof item === "number" && !Number.isFinite(item)) || typeof item === "function"
            || typeof item === "symbol" || typeof item === "bigint") throw new TypeError("expected finite contract values without undefined, callbacks, symbols or unencoded bigint");
        return item;
    }); }
    catch (error) { throw new OspfError("InvalidInput", "CSP2D input cannot be encoded as a contract DTO", { cause: error }); }
}

let wrapReport: (value: ReportBinding) => Csp2dReport;
let wrapProduction: (value: ProductionBinding) => ProductionResult;

/** 独立源目录、物理列及模型校验委托 Rust；此入口不生成列或求解 / Independent source-catalog, physical-column and model validation delegates to Rust; this entry neither generates columns nor solves. */
export class CuttingContext {
    private value: ContextBinding | undefined;
    constructor(problem: CuttingProblem) {
        if (typeof problem !== "object" || problem === null || !Array.isArray(problem.products) || !Array.isArray(problem.materials)
            || !Array.isArray(problem.demands) || !Array.isArray(problem.initialColumns)) throw new OspfError("InvalidInput", "expected a CSP2D problem with product/material/demand/initial-column arrays");
        const materials: readonly Material[] = problem.materials, demands: readonly Demand[] = problem.demands;
        const wire = { ...problem, products: [...problem.products], initialColumns: [...problem.initialColumns],
            materials: materials.map(material => {
                if (typeof material !== "object" || material === null || !Array.isArray(material.products)) throw new OspfError("InvalidInput", "expected a material DTO with product generation hints");
                const products: readonly GenerationProduct[] = material.products;
                return { ...material, availableBatches: count(material.availableBatches), products: products.map(product => {
                    if (typeof product !== "object" || product === null) throw new OspfError("InvalidInput", "expected a generation-product DTO");
                    return { ...product, count: count(product.count) };
                }) };
            }),
            demands: demands.map(demand => {
                if (typeof demand !== "object" || demand === null) throw new OspfError("InvalidInput", "expected a demand DTO");
                return demand.kind === "count" ? { ...demand, count: count(demand.count), upperBound: demand.upperBound === null ? null : count(demand.upperBound) } : demand;
            }),
        } satisfies Csp2dProblem;
        this.value = invoke(() => new (wasm().Csp2dCuttingContext)(json(wire)));
    }
    private raw(): ContextBinding {
        if (!this.value) throw new OspfError("Disposed", "CSP2D context has been disposed");
        return this.value;
    }
    static fromArtifact(artifact: ModelArtifact): CuttingContext {
        return invoke(() => {
            const result = Object.create(CuttingContext.prototype) as CuttingContext;
            result.value = wasm().Csp2dCuttingContext.fromArtifact(json(artifact));
            return result;
        });
    }
    toArtifact(): ModelArtifact { return invoke(() => JSON.parse(this.raw().toArtifactJson()) as ModelArtifact); }
    /** 内部源 JSON 保持原文，不经 JS 数值解析重编码 / Keep inner source JSON as original text, without JS numeric parsing/re-encoding. */
    toJson(): string { return this.toArtifact().modelJson; }
    /** 绑定源尺寸、旋转、刀缝和切分树校验，不声明任何用量满足需求 / Validate source dimensions, rotation, kerf and cut trees, without claiming any usage satisfies demand. */
    validateColumns(columns: readonly Csp2dColumn[]): void {
        if (!Array.isArray(columns)) throw new OspfError("InvalidInput", "expected a CSP2D column array");
        invoke(() => this.raw().validateColumns(json(columns)));
    }
    /** 源／全池／实际模型及认证 LP 定价在 Rust 联合复验，报告独立拥有 / Joint source/pool/actual-model/certified-LP pricing revalidation runs in Rust; the report is independently owned. */
    readExecutionReport(text: string): Csp2dReport {
        if (typeof text !== "string") throw new OspfError("InvalidInput", "expected lossless CSP2D execution-report text");
        return invoke(() => wrapReport(this.raw().readExecutionReport(text)));
    }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 独立源绑定报告，受限池结论不提升为全局证明；原始子报告精确元数据保留文本 / Independent source-bound report; restricted-pool conclusions never become global proofs and raw exact metadata stays text. */
export class Csp2dReport {
    private constructor(private value: ReportBinding | undefined) {}
    static { wrapReport = value => new Csp2dReport(value); }
    private raw(): ReportBinding {
        if (!this.value) throw new OspfError("Disposed", "CSP2D report has been disposed");
        return this.value;
    }
    static fromJson(text: string, source: ModelArtifact): Csp2dReport {
        if (typeof text !== "string") throw new OspfError("InvalidInput", "expected lossless CSP2D execution-report text");
        return invoke(() => wrapReport(wasm().Csp2dExecutionReportResult.fromJson(text, json(source))));
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    summary(): Csp2dExecutionSummary { return invoke(() => JSON.parse(this.raw().summaryJson()) as Csp2dExecutionSummary); }
    stages(): Csp2dStageSummary[] { return invoke(() => JSON.parse(this.raw().stagesJson()) as Csp2dStageSummary[]); }
    columns(): Csp2dColumn[] { return invoke(() => JSON.parse(this.raw().columnsJson()) as Csp2dColumn[]); }
    iterations(): Csp2dPricingIteration[] { return invoke(() => JSON.parse(this.raw().iterationsJson()) as Csp2dPricingIteration[]); }
    private index(index: number): number {
        if (!Number.isInteger(index) || index < 0 || index > 0xffff_ffff) throw new OspfError("InvalidInput", "expected an unsigned stage index");
        return index;
    }
    /** 实际模型及报告保持无损文本，不通过 JS number 改写内部精确身份 / Actual models/reports stay lossless text; never rewrite their exact identities through JS number. */
    stageJson(index: number): string | undefined { return invoke(() => this.raw().stageJson(this.index(index))); }
    stageReportJson(index: number): string | undefined { return invoke(() => this.raw().stageReportJson(this.index(index))); }
    production(): ProductionResult | undefined { return invoke(() => { const value = this.raw().production(); return value === undefined ? undefined : wrapProduction(value); }); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 实际 final 整数 incumbent 的独立产出副本，件数和库存不使用浮点累计 / Independent production copy from the actual final integer incumbent; piece counts and stock never accumulate in floating point. */
export class ProductionResult {
    private constructor(private value: ProductionBinding | undefined) {}
    static { wrapProduction = value => new ProductionResult(value); }
    toJson(): string {
        if (!this.value) throw new OspfError("Disposed", "CSP2D production has been disposed");
        return invoke(() => this.value!.toJson());
    }
    private data(): Csp2dProduction { return JSON.parse(this.toJson()) as Csp2dProduction; }
    usages(): Usage[] { return this.data().usages.map(usage => ({ ...usage, count: BigInt(usage.count) })); }
    producedCounts(): ReadonlyMap<string, bigint> { return new Map(Object.entries(this.data().producedCounts).map(([id, value]) => [id, BigInt(value!)])); }
    producedAreas(): ReadonlyMap<string, PhysicalQuantity> { return new Map(Object.entries(this.data().producedAreas).map(([id, value]) => [id, value!])); }
    materialBatches(): ReadonlyMap<string, bigint> { return new Map(Object.entries(this.data().materialBatches).map(([id, value]) => [id, BigInt(value!)])); }
    consumedArea(): PhysicalQuantity { return this.data().consumedArea; }
    wasteArea(): PhysicalQuantity { return this.data().wasteArea; }
    coilHeights(): ReadonlyMap<string, PhysicalQuantity> { return new Map(Object.entries(this.data().coilHeights).map(([id, value]) => [id, value!])); }
    objectiveValue(): number { return this.data().objectiveValue; }
    dispose(): void { this.value?.free(); this.value = undefined; }
}
