import type { DiscreteLoadingApplicationReport as ApplicationBinding, DiscreteLoadingBendersReport as BendersBinding, DiscreteLoadingContext as ContextBinding, DiscreteLoadingResult as ResultBinding, DiscreteLoadingReport as ReportBinding } from "ospf-wasm-bindings";
import type { BppLoadingProblem, BppLoadingPosition, BppLoadingSolution, BppLoadingResult, PhysicalQuantity } from "ospf-wasm-bindings/protocol";
import type { BridgeError, FixedRecourseSummary, ModelArtifact, ReportSummary } from "./base.js";
import { invoke, OspfError } from "./base.js";
import { wasm } from "./runtime.js";
export { DiscreteLoadingApplicationService, DiscreteLoadingBendersApplicationService, PartitionColumnGenerationApplicationService } from "./framework.js";
export type { DiscreteLoadingBendersOptions, PartitionColumnGenerationOptions } from "./framework.js";
export type { BppLoadingOptions, BppLoadingBendersOptions, BppLoadingSourceFinishingOptions, BppLoadingCertificationEvidence } from "./base.js";
export type { BppLoadingObjective as LoadingObjective, BppLoadingLayoutCost as LoadingLayoutCost } from "ospf-wasm-bindings/protocol";
export type { BppLoadingResource as LoadingResource, BppLoadingResourceResult as LoadingResourceResult } from "ospf-wasm-bindings/protocol";
import type { BppLoadingObjective, BppLoadingResource, BppLoadingResourceResult } from "ospf-wasm-bindings/protocol";
import type { PartitionLoadingContext as PartitionBinding, PartitionLoadingMaster as MasterBinding, PartitionLoadingPricing as PricingBinding, PartitionLoadingBatch as BatchBinding } from "ospf-wasm-bindings";
import type { PartitionColumnGenerationReport as PartitionReportBinding } from "ospf-wasm-bindings";
import type { BppLoadingPartitionCall, BppLoadingPartitionSummary } from "ospf-wasm-bindings/protocol";
export type { BppLoadingPartitionCall as PartitionColumnGenerationCall, BppLoadingPartitionSummary as PartitionColumnGenerationSummary } from "ospf-wasm-bindings/protocol";
import type { BppLoadingPartitionColumn, BppLoadingPartitionColumnInput, BppLoadingPartitionMasterOptions, BppLoadingPartitionOptions, BppLoadingPartitionDecision, BppLoadingPartitionGlobalBinding, BppLoadingPartitionPricingResult } from "ospf-wasm-bindings/protocol";
export type { BppLoadingPartition as LoadingPartition, BppLoadingPartitionDecision as PartitionLoadingDecision, BppLoadingPartitionGlobalBinding as PartitionLoadingGlobalBinding } from "ospf-wasm-bindings/protocol";
export type PartitionLoadingOptions = Omit<BppLoadingPartitionOptions, "refinableResources"> & Partial<Pick<BppLoadingPartitionOptions, "refinableResources">>;

export type PartitionLoadingMasterOptions = Partial<BppLoadingPartitionMasterOptions>;
export interface PartitionLoadingColumnInput extends Omit<BppLoadingPartitionColumnInput, "decisions"> { decisions: ReadonlyMap<string, number>; }
export interface PartitionLoadingColumn extends Omit<BppLoadingPartitionColumn, "cargoUsage" | "counts" | "decisions"> {
    decisions: ReadonlyMap<string, number>;
    cargoUsage: ReadonlyMap<string, bigint>;
    counts: ReadonlyMap<string, bigint>;
}
export interface PartitionLoadingPricingResult extends Omit<BppLoadingPartitionPricingResult, "decisions"> { decisions: ReadonlyMap<string, number> | undefined; }

export type { BppLoadingItem as LoadingItem, BppLoadingAssignment as AssignmentKey, BppLoadingConflict as PositionConflict,
    BppLoadingLayout as LoadingLayout, BppLoadingLayoutGroup as LayoutSelectionGroup, BppLoadingSolution as DiscreteLoadingSolution } from "ospf-wasm-bindings/protocol";

export interface LoadingPosition extends Omit<BppLoadingPosition, "maxCount"> { maxCount: bigint; }
export interface DiscreteLoadingProblem extends Omit<BppLoadingProblem, "items" | "positions" | "allowedAssignments" | "conflicts" | "layoutGroups"> {
    items: readonly BppLoadingProblem["items"][number][];
    positions: readonly LoadingPosition[];
    allowedAssignments: readonly BppLoadingProblem["allowedAssignments"][number][];
    conflicts: readonly BppLoadingProblem["conflicts"][number][];
    layoutGroups: readonly BppLoadingProblem["layoutGroups"][number][];
}

function count(value: bigint): string {
    if (typeof value !== "bigint" || value < 1n || value > 18_446_744_073_709_551_615n) throw new OspfError("InvalidInput", "BPP loading maxCount requires bigint in [1, 2^64 - 1]");
    return value.toString();
}

function json(value: unknown): string {
    try { return JSON.stringify(value, (_key, item: unknown) => {
        if (item === undefined || (typeof item === "number" && !Number.isFinite(item)) || typeof item === "function"
            || typeof item === "symbol" || typeof item === "bigint") throw new TypeError("expected finite DTO values without undefined, callbacks, symbols or unencoded bigint");
        return item;
    }); }
    catch (error) { throw new OspfError("InvalidInput", "BPP loading input cannot be encoded as a contract DTO", { cause: error }); }
}

let wrapResult: (value: ResultBinding) => DiscreteLoadingResult;
let wrapReport: (value: ReportBinding) => DiscreteLoadingReport;

/** 原共享 BPP 约束的独立注册，不在 TS 重建规则，不在 WASM 求解 / Independent original shared BPP constraint registration, without TS rule reimplementation or WASM solving. */
export class DiscreteLoadingContext {
    private value: ContextBinding | undefined;
    constructor(problem: DiscreteLoadingProblem, objective?: BppLoadingObjective, resources?: readonly BppLoadingResource[]) {
        if (typeof problem !== "object" || problem === null || !Array.isArray(problem.items) || !Array.isArray(problem.positions)
            || !Array.isArray(problem.allowedAssignments) || !Array.isArray(problem.conflicts) || !Array.isArray(problem.layoutGroups)) throw new OspfError("InvalidInput", "expected explicit BPP loading source arrays");
        const positions: readonly LoadingPosition[] = problem.positions;
        const wire = { ...problem, items: [...problem.items], allowedAssignments: [...problem.allowedAssignments], conflicts: [...problem.conflicts], layoutGroups: [...problem.layoutGroups],
            positions: positions.map(position => {
                if (typeof position !== "object" || position === null) throw new OspfError("InvalidInput", "expected a BPP loading position DTO");
                return { ...position, maxCount: count(position.maxCount) };
            }),
        } satisfies BppLoadingProblem;
        this.value = invoke(() => resources !== undefined ? wasm().DiscreteLoadingContext.withResources(json(wire), json(objective ?? null), json(resources))
            : objective === undefined ? new (wasm().DiscreteLoadingContext)(json(wire)) : wasm().DiscreteLoadingContext.withObjective(json(wire), json(objective)));
    }
    private raw(): ContextBinding {
        if (!this.value) throw new OspfError("Disposed", "BPP loading context has been disposed");
        return this.value;
    }
    static fromArtifact(artifact: ModelArtifact): DiscreteLoadingContext {
        return invoke(() => {
            const result = Object.create(DiscreteLoadingContext.prototype) as DiscreteLoadingContext;
            result.value = wasm().DiscreteLoadingContext.fromArtifact(json(artifact));
            return result;
        });
    }
    toArtifact(): ModelArtifact { return invoke(() => JSON.parse(this.raw().toArtifactJson()) as ModelArtifact); }
    toJson(): string { return this.toArtifact().modelJson; }
    /** 原 MetaModel 编译的 MILP，省略成本时为零目标；不是分区／Benders 门面 / Original MetaModel MILP with a zero objective when costs are omitted; not a partition/Benders facade. */
    toLinearTriadModel(): ModelArtifact { return invoke(() => JSON.parse(this.raw().toLinearTriadModelJson()) as ModelArtifact); }
    /** 原 application 的 snapshot 编译模型；报告不会重标记为 mechanism 导出身份 / Original application snapshot-compiled model; its reports are never relabeled as mechanism-export identities. */
    toApplicationModel(): ModelArtifact { return invoke(() => JSON.parse(this.raw().toApplicationModelJson()) as ModelArtifact); }
    conflictCliques(): string[][] { return invoke(() => JSON.parse(this.raw().conflictCliquesJson()) as string[][]); }
    /** 声明资源时必须提供每个资源的重量，不猜测缺失的值 / Declared resources require an explicit weight for each resource, without guessed values. */
    solutionValues(solution: BppLoadingSolution, resources?: ReadonlyMap<string, PhysicalQuantity>): Float64Array {
        return invoke(() => resources === undefined ? this.raw().solutionValues(json(solution)) : this.raw().solutionValuesWithResources(json(solution), resourceWeights(resources)));
    }
    verifySolution(solution: BppLoadingSolution, resources?: ReadonlyMap<string, PhysicalQuantity>): DiscreteLoadingResult {
        return invoke(() => wrapResult(resources === undefined ? this.raw().verifySolution(json(solution)) : this.raw().verifySolutionWithResources(json(solution), resourceWeights(resources))));
    }
    extractSolution(values: Float64Array): DiscreteLoadingResult {
        if (!(values instanceof Float64Array)) throw new OspfError("InvalidInput", "expected a full Float64Array in exported model order");
        return invoke(() => wrapResult(this.raw().extractSolution(values)));
    }
    /** 同时复验实际模型身份、原报告及领域约束；不修补指纹、不认证外部 solver 来源 / Joint actual-model identity, original-report and domain validation, without fingerprint repair or external solver provenance authentication. */
    readReport(text: string): DiscreteLoadingReport {
        if (typeof text !== "string") throw new OspfError("InvalidInput", "expected lossless original BPP loading report text");
        return invoke(() => wrapReport(this.raw().readReport(text)));
    }
    readApplicationReport(text: string): DiscreteLoadingApplicationReport {
        return DiscreteLoadingApplicationReport.fromJson(text, this.toArtifact());
    }
    readBendersReport(text: string): DiscreteLoadingBendersReport { return DiscreteLoadingBendersReport.fromJson(text, this.toArtifact()); }
    /** 独立重建原分区会话，不借用本 context 的生命周期 / Independently rebuild an original partition session without borrowing this context's lifetime. */
    partition(options: PartitionLoadingOptions): PartitionLoadingContext { return new PartitionLoadingContext(this.toArtifact(), options); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 原 Benders 分解及回退证据，不将子报告提升为源最优证明 / Original Benders decomposition and fallback evidence, without promoting child reports into source optimality proof. */
export class DiscreteLoadingBendersReport {
    private constructor(private value: BendersBinding | undefined) {}
    private raw(): BendersBinding {
        if (!this.value) throw new OspfError("Disposed", "BPP Benders report has been disposed");
        return this.value;
    }
    static fromJson(text: string, source: ModelArtifact): DiscreteLoadingBendersReport {
        if (typeof text !== "string") throw new OspfError("InvalidInput", "expected lossless original BPP Benders report text");
        return invoke(() => new DiscreteLoadingBendersReport(wasm().DiscreteLoadingBendersReport.fromJson(text, json(source))));
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    applicationReportJson(): string { return invoke(() => this.raw().applicationReportJson()); }
    /** 收尾前的原始加速报告，未收尾时与最终 application 相同 / Original pre-finishing accelerator report, equal to the final application when finishing is absent. */
    accelerationApplicationReportJson(): string { return invoke(() => this.raw().accelerationApplicationReportJson()); }
    certificationReportJson(): string | undefined { return invoke(() => this.raw().certificationReportJson()); }
    certificationError(): BridgeError | undefined { return invoke(() => { const value = this.raw().certificationErrorJson(); return value === undefined ? undefined : JSON.parse(value) as BridgeError; }); }
    sourceFinishingPresent(): boolean { return invoke(() => this.raw().sourceFinishingPresent()); }
    sourceFinishingInvoked(): boolean { return invoke(() => this.raw().sourceFinishingInvoked()); }
    solverReportJson(): string { return invoke(() => this.raw().solverReportJson()); }
    decompositionReportJson(): string | undefined { return invoke(() => this.raw().decompositionReportJson()); }
    fallbackReportJson(): string | undefined { return invoke(() => this.raw().fallbackReportJson()); }
    summary(): ReportSummary { return invoke(() => JSON.parse(this.raw().summaryJson()) as ReportSummary); }
    decompositionSummary(): FixedRecourseSummary | undefined { return invoke(() => { const value = this.raw().decompositionSummaryJson(); return value === undefined ? undefined : JSON.parse(value) as FixedRecourseSummary; }); }
    decompositionError(): BridgeError | undefined { return invoke(() => { const value = this.raw().decompositionErrorJson(); return value === undefined ? undefined : JSON.parse(value) as BridgeError; }); }
    sourceFingerprint(): string { return invoke(() => this.raw().sourceFingerprint()); }
    fallbackUsed(): boolean { return invoke(() => this.raw().fallbackUsed()); }
    solution(): DiscreteLoadingResult | undefined { return invoke(() => { const value = this.raw().solution(); return value === undefined ? undefined : wrapResult(value); }); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 原 application 的源绑定报告；前置终态不虚构模型身份、求解调用或空方案 / Source-bound original application report, without fabricating model identity, solver calls or empty plans for pre-solve terminals. */
export class DiscreteLoadingApplicationReport {
    private constructor(private value: ApplicationBinding | undefined) {}
    private raw(): ApplicationBinding {
        if (!this.value) throw new OspfError("Disposed", "BPP loading application report has been disposed");
        return this.value;
    }
    static fromJson(text: string, source: ModelArtifact): DiscreteLoadingApplicationReport {
        if (typeof text !== "string") throw new OspfError("InvalidInput", "expected lossless original BPP application report text");
        return invoke(() => new DiscreteLoadingApplicationReport(wasm().DiscreteLoadingApplicationReport.fromJson(text, json(source))));
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    solverReportJson(): string { return invoke(() => this.raw().solverReportJson()); }
    summary(): ReportSummary { return invoke(() => JSON.parse(this.raw().summaryJson()) as ReportSummary); }
    sourceFingerprint(): string { return invoke(() => this.raw().sourceFingerprint()); }
    registrationPresent(): boolean { return invoke(() => this.raw().registrationPresent()); }
    solution(): DiscreteLoadingResult | undefined { return invoke(() => { const value = this.raw().solution(); return value === undefined ? undefined : wrapResult(value); }); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 独立已验证方案，件数使用 bigint，重量保留模型单位 / Independent validated plan with bigint counts and explicit model weight units. */
export class DiscreteLoadingResult {
    private constructor(private value: ResultBinding | undefined) {}
    static { wrapResult = value => new DiscreteLoadingResult(value); }
    toJson(): string {
        if (!this.value) throw new OspfError("Disposed", "BPP loading result has been disposed");
        return invoke(() => this.value!.toJson());
    }
    private data(): BppLoadingResult { return JSON.parse(this.toJson()) as BppLoadingResult; }
    sourceFingerprint(): string { return this.data().sourceFingerprint; }
    solution(): BppLoadingSolution { return this.data().solution; }
    loadedCount(): bigint { return BigInt(this.data().loadedCount); }
    loadedWeight(): PhysicalQuantity { return this.data().loadedWeight; }
    positionCounts(): ReadonlyMap<string, bigint> { return new Map(Object.entries(this.data().positionCounts).map(([id, value]) => [id, BigInt(value!)])); }
    positionWeights(): ReadonlyMap<string, PhysicalQuantity> { return new Map(Object.entries(this.data().positionWeights).map(([id, value]) => [id, value!])); }
    /** 货物重量口径不变；此结果另列附加重量及含资源总量 / Cargo weight semantics remain unchanged; this separately exposes additional weights and inclusive totals. */
    resources(): BppLoadingResourceResult | undefined { return this.data().resources ?? undefined; }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

function resourceWeights(resources: ReadonlyMap<string, PhysicalQuantity>): string {
    if (!(resources instanceof Map) || [...resources.keys()].some(id => typeof id !== "string")) throw new OspfError("InvalidInput", "expected a Map of resource identities to explicit physical weights");
    return json(Object.fromEntries(resources));
}

/** 独立报告原文与实际 incumbent 的复验方案；无解时不生成零方案 / Independent original report and validated actual-incumbent plan, never a fabricated zero plan when absent. */
export class DiscreteLoadingReport {
    private constructor(private value: ReportBinding | undefined) {}
    static { wrapReport = value => new DiscreteLoadingReport(value); }
    private raw(): ReportBinding {
        if (!this.value) throw new OspfError("Disposed", "BPP loading report has been disposed");
        return this.value;
    }
    static fromJson(text: string, source: ModelArtifact): DiscreteLoadingReport {
        if (typeof text !== "string") throw new OspfError("InvalidInput", "expected lossless original BPP loading report text");
        return invoke(() => wrapReport(wasm().DiscreteLoadingReport.fromJson(text, json(source))));
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    summary(): ReportSummary { return invoke(() => JSON.parse(this.raw().summaryJson()) as ReportSummary); }
    sourceFingerprint(): string { return invoke(() => this.raw().sourceFingerprint()); }
    solution(): DiscreteLoadingResult | undefined { return invoke(() => { const value = this.raw().solution(); return value === undefined ? undefined : wrapResult(value); }); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

function decisionValues(values: ReadonlyMap<string, number>): Record<string, number> {
    if (!(values instanceof Map) || [...values].some(([id, value]) => typeof id !== "string" || typeof value !== "number" || !Number.isFinite(value))) {
        throw new OspfError("InvalidInput", "expected a Map of decision identities to finite model-unit numbers");
    }
    return Object.fromEntries(values);
}

function vector(values: Float64Array): void {
    if (!(values instanceof Float64Array)) throw new OspfError("InvalidInput", "expected a complete Float64Array in this master model order");
}

let wrapMaster: (value: MasterBinding) => PartitionLoadingMaster;
let rawMaster: (value: PartitionLoadingMaster) => MasterBinding;
let wrapPricing: (value: PricingBinding) => PartitionLoadingPricing;
let rawPricing: (value: PartitionLoadingPricing) => PricingBinding;
let rawBatch: (value: PartitionLoadingBatch) => BatchBinding;

/** 原 Rust 分区列池与资源补全生命周期，不运行 solver、不把受限最优提升为源证明 / Original Rust partition pool and resource-completion lifecycle, without solving or promoting restricted optima into source proofs. */
export class PartitionLoadingContext {
    private value: PartitionBinding | undefined;
    constructor(source: ModelArtifact, options: PartitionLoadingOptions) {
        this.value = invoke(() => new (wasm().PartitionLoadingContext)(json(source), json(options)));
    }
    private raw(): PartitionBinding {
        if (!this.value) throw new OspfError("Disposed", "partition loading context has been disposed");
        return this.value;
    }
    toArtifact(): ModelArtifact { return invoke(() => JSON.parse(this.raw().toArtifactJson()) as ModelArtifact); }
    options(): BppLoadingPartitionOptions { return invoke(() => JSON.parse(this.raw().optionsJson()) as BppLoadingPartitionOptions); }
    decisions(): readonly BppLoadingPartitionDecision[] { return invoke(() => JSON.parse(this.raw().decisionsJson()) as BppLoadingPartitionDecision[]); }
    columns(): readonly PartitionLoadingColumn[] {
        return invoke(() => (JSON.parse(this.raw().columnsJson()) as BppLoadingPartitionColumn[]).map(column => ({ ...column,
            decisions: new Map(Object.entries(column.decisions).map(([id, value]) => [id, value!])),
            cargoUsage: new Map(Object.entries(column.cargoUsage).map(([id, value]) => [id, BigInt(value!)])),
            counts: new Map(Object.entries(column.counts).map(([id, value]) => [id, BigInt(value!)])),
        })));
    }
    addColumns(columns: readonly PartitionLoadingColumnInput[]): void {
        if (!Array.isArray(columns) || columns.some(column => typeof column !== "object" || column === null)) throw new OspfError("InvalidInput", "expected an array of complete partition columns");
        const input = columns.map(column => ({ ...column, decisions: decisionValues(column.decisions) }));
        invoke(() => this.raw().addColumns(json(input)));
    }
    removeColumns(ids: readonly string[]): void { invoke(() => this.raw().removeColumns(json(ids))); }
    /** 重建会使旧注册失效；目标常数与 backend 模型分开保留 / Rebuilding invalidates old registrations; objective constants remain separate from the backend model. */
    master(options: PartitionLoadingMasterOptions = {}): PartitionLoadingMaster { return invoke(() => wrapMaster(this.raw().master(json(options)))); }
    acceptLpReport(master: PartitionLoadingMaster, text: string): ReportSummary {
        if (typeof text !== "string") throw new OspfError("InvalidInput", "expected lossless complete LP report text, never bare duals");
        return invoke(() => JSON.parse(this.raw().acceptLpReport(rawMaster(master), text)) as ReportSummary);
    }
    seedPricing(partitionId: string, phaseOne = true): PartitionLoadingPricing {
        if (typeof partitionId !== "string" || typeof phaseOne !== "boolean") throw new OspfError("InvalidInput", "expected a partition identity and boolean phase flag");
        return invoke(() => wrapPricing(this.raw().seedPricing(partitionId, phaseOne)));
    }
    pricing(master: PartitionLoadingMaster, partitionId: string, phaseOne = false): PartitionLoadingPricing {
        if (typeof partitionId !== "string" || typeof phaseOne !== "boolean") throw new OspfError("InvalidInput", "expected a partition identity and boolean phase flag");
        return invoke(() => wrapPricing(this.raw().pricing(rawMaster(master), partitionId, phaseOne)));
    }
    addPricedBatch(master: PartitionLoadingMaster, batch: PartitionLoadingBatch): void { invoke(() => this.raw().addPricedBatch(rawMaster(master), rawBatch(batch))); }
    sourceValues(master: PartitionLoadingMaster, values: Float64Array): Float64Array { vector(values); return invoke(() => this.raw().sourceValues(rawMaster(master), values)); }
    extractSolution(master: PartitionLoadingMaster, values: Float64Array): DiscreteLoadingResult { vector(values); return invoke(() => wrapResult(this.raw().extractSolution(rawMaster(master), values))); }
    materializeCompletedResources(master: PartitionLoadingMaster, values: Float64Array): void { vector(values); invoke(() => this.raw().materializeCompletedResources(rawMaster(master), values)); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 独立主问题快照；持有旧对象不代表列池版本仍有效 / Independent master snapshot; retaining an old object does not imply its pool revision is still valid. */
export class PartitionLoadingMaster {
    private constructor(private value: MasterBinding | undefined) {}
    static { wrapMaster = value => new PartitionLoadingMaster(value); rawMaster = value => value.raw(); }
    private raw(): MasterBinding {
        if (!this.value) throw new OspfError("Disposed", "partition loading master has been disposed");
        return this.value;
    }
    toModel(): ModelArtifact { return invoke(() => JSON.parse(this.raw().toModelJson()) as ModelArtifact); }
    objectiveConstant(): number { return invoke(() => this.raw().objectiveConstant()); }
    columnIndices(): ReadonlyMap<string, number> { return invoke(() => new Map(Object.entries(JSON.parse(this.raw().columnIndicesJson()) as Record<string, number>))); }
    globalBindings(): readonly BppLoadingPartitionGlobalBinding[] { return invoke(() => JSON.parse(this.raw().globalBindingsJson()) as BppLoadingPartitionGlobalBinding[]); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 只读定价快照；检验数不代表全局证明或当前 epoch 有效 / Read-only pricing snapshot; reduced costs imply neither global proof nor current epoch validity. */
export class PartitionLoadingPricing {
    private constructor(private value: PricingBinding | undefined) {}
    static { wrapPricing = value => new PartitionLoadingPricing(value); rawPricing = value => value.raw(); }
    private raw(): PricingBinding {
        if (!this.value) throw new OspfError("Disposed", "partition loading pricing has been disposed");
        return this.value;
    }
    toModel(): ModelArtifact { return invoke(() => JSON.parse(this.raw().toModelJson()) as ModelArtifact); }
    objectiveConstant(): number { return invoke(() => this.raw().objectiveConstant()); }
    partitionId(): string { return invoke(() => this.raw().partitionId()); }
    reducedCost(values: ReadonlyMap<string, number>): number { return invoke(() => this.raw().reducedCost(json(decisionValues(values)))); }
    readReport(text: string): PartitionLoadingPricingResult {
        if (typeof text !== "string") throw new OspfError("InvalidInput", "expected lossless original pricing report text");
        return invoke(() => { const result = JSON.parse(this.raw().readReportJson(text)) as BppLoadingPartitionPricingResult;
            return { ...result, decisions: result.decisions === null ? undefined : new Map(Object.entries(result.decisions).map(([id, value]) => [id, value!])) }; });
    }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 同轮批次拥有请求副本；原请求释放不影响批次，失效 epoch 仍明确拒绝 / A round batch owns request copies; disposing original requests does not affect it, while stale epochs remain rejected. */
export class PartitionLoadingBatch {
    private value: BatchBinding | undefined;
    static { rawBatch = value => value.raw(); }
    constructor() { this.value = invoke(() => new (wasm().PartitionLoadingBatch)()); }
    private raw(): BatchBinding {
        if (!this.value) throw new OspfError("Disposed", "partition loading batch has been disposed");
        return this.value;
    }
    add(pricing: PartitionLoadingPricing, columns: readonly ReadonlyMap<string, number>[]): void {
        if (!Array.isArray(columns)) throw new OspfError("InvalidInput", "expected an array of complete pricing decision Maps");
        invoke(() => this.raw().add(rawPricing(pricing), json(columns.map(decisionValues))));
    }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 原 Rust service 无时钟重放验证；保留实际子证据，不提升受限证明 / Clock-free replay validation by the original Rust service, retaining actual child evidence without promoting restricted proofs. */
export class PartitionColumnGenerationReport {
    private constructor(private value: PartitionReportBinding | undefined) {}
    private raw(): PartitionReportBinding {
        if (!this.value) throw new OspfError("Disposed", "partition column-generation report has been disposed");
        return this.value;
    }
    static fromJson(text: string, source: ModelArtifact): PartitionColumnGenerationReport {
        if (typeof text !== "string") throw new OspfError("InvalidInput", "expected lossless original partition report text");
        return invoke(() => new PartitionColumnGenerationReport(wasm().PartitionColumnGenerationReport.fromJson(text, json(source))));
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    summary(): ReportSummary { return invoke(() => JSON.parse(this.raw().summaryJson()) as ReportSummary); }
    executionSummary(): BppLoadingPartitionSummary { return invoke(() => JSON.parse(this.raw().executionSummaryJson()) as BppLoadingPartitionSummary); }
    calls(): readonly BppLoadingPartitionCall[] { return invoke(() => JSON.parse(this.raw().callsJson()) as BppLoadingPartitionCall[]); }
    solverReportJson(): string { return invoke(() => this.raw().solverReportJson()); }
    refinementReportJson(): string | undefined { return invoke(() => this.raw().refinementReportJson()); }
    finalReportJson(): string | undefined { return invoke(() => this.raw().finalReportJson()); }
    applicationReportJson(): string { return invoke(() => this.raw().applicationReportJson()); }
    accelerationApplicationReportJson(): string { return invoke(() => this.raw().accelerationApplicationReportJson()); }
    certificationReportJson(): string | undefined { return invoke(() => this.raw().certificationReportJson()); }
    certificationError(): BridgeError | undefined { return invoke(() => { const text = this.raw().certificationErrorJson(); return text === undefined ? undefined : JSON.parse(text) as BridgeError; }); }
    sourceFinishingPresent(): boolean { return invoke(() => this.raw().sourceFinishingPresent()); }
    sourceFinishingInvoked(): boolean { return invoke(() => this.raw().sourceFinishingInvoked()); }
    accelerationError(): BridgeError | undefined { return invoke(() => { const text = this.raw().accelerationErrorJson(); return text === undefined ? undefined : JSON.parse(text) as BridgeError; }); }
    sourceFingerprint(): string { return invoke(() => this.raw().sourceFingerprint()); }
    solution(): DiscreteLoadingResult | undefined { return invoke(() => { const value = this.raw().solution(); return value === undefined ? undefined : wrapResult(value); }); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}
