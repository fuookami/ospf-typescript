import type {
    Linear as LinearBinding, LinearExpressionSymbol as SymbolBinding, LinearInequality as InequalityBinding,
    MetaModel as ModelBinding, Quadratic as QuadraticBinding, QuadraticExpressionSymbol as QuadraticSymbolBinding,
    QuadraticInequality as QuadraticInequalityBinding, Token as TokenBinding, LinearIisReport as IisBinding,
    LinearSolutionPoolReport as PoolBinding, LocalConstraintSensitivityReport as SensitivityBinding,
    CertifiedPricingDuals as PricingBinding, LinearSweepReport as SweepBinding, NetworkFlowReport as FlowBinding, GeneralizedFlowReport as GeneralizedBinding, NetworkDesignReport as DesignBinding, NetworkStructureReport as StructureBinding, AllocationReport as AllocationBinding, NetworkResilienceReport as ResilienceBinding, VrpReport as VrpBinding, QuadraticOrchestrationReport as OrchestrationBinding, IndexedRegistrationReport as RegistrationBinding, LinearColumnCertificate as ColumnCertificateBinding, HeartBeatSnapshot as HeartBeatBinding, ResponseEnvelope as EnvelopeBinding, LinearLifecycleReport as LifecycleBinding, QueryPlanReport as QueryPlanBinding, BendersMasterReport as BendersBinding, BendersSubReport as BendersSubBinding, LogicBasedBendersPlanReport as LogicBasedBendersPlanBinding, RemoteArtifactReport as RemoteArtifactBinding, ConflictExplanationSummary as ConflictSummaryBinding, CandidateFunnelReport as CandidateFunnelBinding, EffectivenessReport as EffectivenessBinding, CriticalAnalysisReport as CriticalAnalysisBinding, RelaxationReport as RelaxationBinding, FixedIntegerLpReport as FixedIntegerBinding, PerturbationVerification as PerturbationBinding, TargetVerification as TargetBinding, MultiTargetReportSummary as MultiTargetBinding, CriticalityProfileReport as CriticalityBinding, HyperHeuristicConfigReport as HyperHeuristicBinding, RewardPolicyReport as RewardPolicyBinding, CheckpointReport as CheckpointBinding, LinearMappingReport as LinearMappingBinding, LbbResumeIdentityReport as LbbResumeBinding, CpCheckpointReport as CpCheckpointBinding, BendersMetricsReport as BendersMetricsBinding, BendersCutReport as BendersCutBinding, SymbolConditionReport as SymbolConditionBinding, SymbolLinearizationReport as SymbolLinearizationBinding, SymbolCoreRelationsReport as SymbolCoreRelationsBinding, HeuristicScheduleReport as HeuristicScheduleBinding, QTableReport as QTableBinding, MasterCutEncodingReport as MasterCutEncodingBinding, AnalysisGroupAggregateReport as AnalysisGroupAggregateBinding, PredicateFieldResolutionReport as PredicateFieldResolutionBinding, PredicateFieldFilterReport as PredicateFieldFilterBinding, ModelConfigurationReport as ModelConfigurationBinding, CacheKeyIdentityReport as CacheKeyIdentityBinding, CacheKeyAddressReport as CacheKeyAddressBinding, FlattenCacheReport as FlattenCacheBinding, UpdateAssignmentReport as UpdateAssignmentBinding, BooleanScopeReport as BooleanScopeBinding, UnsupportedPredicateReport as UnsupportedPredicateBinding, RepositoryCallReport as RepositoryCallBinding, FunctionUsageReport as FunctionUsageBinding, InputDomainReport as InputDomainBinding, NativeWriteReport as NativeWriteBinding, ElasticModelReport as ElasticModelBinding, CombineStatusReport as CombineStatusBinding, NumberTextReport as NumberTextBinding, BigMPolicyReport as BigMPolicyBinding, ConditionalSemanticsReport as ConditionalSemanticsBinding, SearchBudgetReport as SearchBudgetBinding, PredicateSchemaReport as PredicateSchemaBinding, SortByReport as SortByBinding, VariableKindDomainReport as VariableKindDomainBinding, CriticalAssemblyReport as CriticalAssemblyBinding, FlattenIdentityReport as FlattenIdentityBinding, MasterCutReport as MasterCutBinding, BooleanFoldReport as BooleanFoldBinding, FieldResolutionReport as FieldResolutionBinding, ScalarFunctionReport as ScalarFunctionBinding, PolynomialLiftReport as PolynomialLiftBinding, BoundedNoGoodReport as BoundedNoGoodBinding, EffectivenessAggregateReport as EffectivenessAggregateBinding, AssumptionBindingReport as AssumptionBindingBinding, TierClassificationReport as TierClassificationBinding, PolarityReport as PolarityBinding, MonomialReport as MonomialBinding, MaterializeReport as MaterializeBinding, BackendFeaturesReport as BackendFeaturesBinding, CanonicalMonomialReport as CanonicalMonomialBinding, ExpressionKeyReport as ExpressionKeyBinding, EncodingLabelReport as EncodingLabelBinding, ActivityBandReport as ActivityBandBinding, EvidenceReport as EvidenceBinding, ActivityReportVerdict as ActivityReportBinding, AuxiliaryDomainReport as AuxiliaryDomainBinding, BindingAssignmentReport as BindingAssignmentBinding, SourceIdentityReport as SourceIdentityBinding, CutValidityReport as CutValidityBinding, AssignmentCompositionReport as AssignmentCompositionBinding, DumpOptionsReport as DumpOptionsBinding, NativeWriteScopeReport as NativeWriteScopeBinding, WriterRegistryReport as WriterRegistryBinding, ShortlistReport as ShortlistBinding, LazyInitReport as LazyInitBinding, DumpBatchReport as DumpBatchBinding, QuadraticElasticReport as QuadraticElasticBinding, StableValueReport as StableValueBinding, MasterAssignmentReport as MasterAssignmentBinding, SparseTriadReport as SparseTriadBinding, MatrixRowsReport as MatrixRowsBinding, PolynomialProbeReport as PolynomialProbeBinding, ModelViewReport as ModelViewBinding, AnalysisOptionsReport as AnalysisOptionsBinding, CapabilityMatrixReport as CapabilityMatrixBinding, CpSupportMergeReport as CpSupportMergeBinding, SubproblemResultReport as SubproblemResultBinding, NoGoodOracleReport as NoGoodOracleBinding, CpModelBuildReport as CpModelBuildBinding, SnapshotGateReport as SnapshotGateBinding, ConstraintCanonReport as ConstraintCanonBinding, AssignmentEvalReport as AssignmentEvalBinding, ExpressionBoundsReport as ExpressionBoundsBinding, DomainProbeReport as DomainProbeBinding, IdentityWrapReport as IdentityWrapBinding, ContainerProbeReport as ContainerProbeBinding, ActivationSetReport as ActivationSetBinding, TierSelectionReport as TierSelectionBinding, EvidenceRemapReport as EvidenceRemapBinding, DominanceReport as DominanceBinding, DispersionReport as DispersionBinding, ReferencePointsReport as ReferencePointsBinding, ArchiveReport as ArchiveBinding, ConstraintRankingReport as ConstraintRankingBinding, PriorityReport as PriorityBinding, PopulationConfigReport as PopulationConfigBinding, BoundaryReport as BoundaryBinding, AcceptanceReport as AcceptanceBinding, RankingProbeReport as RankingProbeBinding, TopologyReport as TopologyBinding, MigrationReport as MigrationBinding, ArchiveProbeReport as ArchiveProbeBinding, PiecewiseReport as PiecewiseBinding, DiversityReport as DiversityBinding, SolutionStatusReport as SolutionStatusBinding, FunnelReport as FunnelBinding, EffectivenessProbeReport as EffectivenessProbeBinding, CriticalReportVerdict as CriticalReportBinding, GroupSummaryReport as GroupSummaryBinding, BandProbeReport as BandProbeBinding, EvidenceProbeReport as EvidenceProbeBinding, ProofProbeReport as ProofProbeBinding, GapProbeReport as GapProbeBinding, DiagnosticsProbeReport as DiagnosticsProbeBinding, FingerprintProbeReport as FingerprintProbeBinding, BlockingSetReport as BlockingSetBinding, CorrectionProbeReport as CorrectionProbeBinding, SensitivityProbeReport as SensitivityProbeBinding, FunnelProbeReport as FunnelProbeBinding, EffectivenessRankingReport as EffectivenessRankingBinding, PersistenceSortProbeReport as PersistenceSortBinding, PersistenceSchemaReport as PersistenceSchemaBinding, PredicateScopeReport as PredicateScopeBinding, NativeTerminalProofReport as NativeTerminalProofBinding, NativeLoweringReport as NativeLoweringBinding, SolveValueReport as SolveValueBinding, SelectionReport as SelectionBinding, NonStationaryReport as NonStationaryBinding, TrainingSplitReport as TrainingSplitBinding, AcceptanceRecoveryReport as AcceptanceRecoveryBinding, HypervolumeReport as HypervolumeBinding, OperatorCapabilityReport as OperatorCapabilityBinding, ScheduleLogReport as ScheduleLogBinding, FieldFilterReport as FieldFilterBinding, AssignmentReport as AssignmentBinding, SortPlanReport as SortPlanBinding, PipelinePlanReport as PipelinePlanBinding,
} from "ospf-wasm-bindings";
import type { ModelArtifact, ReportSummary } from "./base.js";
import { invoke, OspfError } from "./base.js";
import { wasm } from "./runtime.js";
export {
    ConstraintProgrammingModel, ConstraintProgrammingSnapshot, ConstraintProgrammingConstraint, ConstraintProgrammingReport,
    IntegerDomain, IntegerExpression, ConstraintActivityAnalyzer, ConstraintActivityReport,
} from "./cp.js";
export type { IntegerVariable, IntegerTerms, IntervalVariable, BooleanLiteral, BooleanOperation } from "./cp.js";
export type { IntegerExpressionInput, ReificationDirection, IntervalOptions, CumulativeTask, AutomatonTransition, AutomatonOptions, ReservoirEvent, ReservoirOptions } from "./cp.js";
export type { ConstraintProgrammingAssumption } from "./cp.js";
export type { ConstraintOptions, ActivityOptions, ActivityStatus, MipLoweringAnalysis } from "./base.js";

/** 无损报告由 Rust 校验后读取 f64 摘要 / Read an f64 summary after validating the lossless report in Rust. */
export function summarizeReport(reportJson: string): ReportSummary {
    return invoke(() => JSON.parse(wasm().summarizeReport(reportJson)) as ReportSummary);
}

/** IIS 算法，与原 core 的两种过滤一致 / IIS algorithm matching the two original core filters. */
export type LinearIisAlgorithm = "elastic" | "deletion";

/**
 * 不可约不可行子系统（IIS）报告的独立句柄：只读取原生端产出的文本，
 * 由 Rust 校验自洽性（子系统不得大于原模型、身份非空且不重复）。
 * 本类不计算 IIS——那需要带 Gurobi 后端的原生执行。
 * Independent handle for an irreducible infeasible subsystem (IIS) report: it only reads text produced by a native
 * host and lets Rust validate self-consistency (a subsystem may not exceed its model, and identities must be non-empty
 * and unique). This class never computes an IIS; that requires native execution with the Gurobi backend.
 */
export class LinearIisReport {
    private constructor(private value: IisBinding | undefined) {}
    /** 解析并校验报告文本 / Parse and validate report text. */
    static fromJson(json: string): LinearIisReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected IIS report text");
        return invoke(() => new LinearIisReport(wasm().LinearIisReport.fromJson(json)));
    }
    private raw(): IisBinding {
        if (!this.value) throw new OspfError("Disposed", "IIS report has been disposed");
        return this.value;
    }
    /** 实际使用的算法 / Algorithm actually used. */
    algorithm(): LinearIisAlgorithm { return invoke(() => this.raw().algorithm() as LinearIisAlgorithm); }
    /** 子系统内的稳定约束身份 / Stable constraint identities inside the subsystem. */
    constraintIds(): string[] { return invoke(() => this.raw().constraintIds()); }
    /** 取到下界的稳定变量身份 / Stable variables whose lower bound is inside the subsystem. */
    lowerBoundVariables(): string[] { return invoke(() => this.raw().lowerBoundVariables()); }
    /** 取到上界的稳定变量身份 / Stable variables whose upper bound is inside the subsystem. */
    upperBoundVariables(): string[] { return invoke(() => this.raw().upperBoundVariables()); }
    /** 原模型约束总数 / Original model constraint count. */
    originalConstraintCount(): number { return invoke(() => this.raw().originalConstraintCount()); }
    /** 原模型变量总数 / Original model variable count. */
    originalVariableCount(): number { return invoke(() => this.raw().originalVariableCount()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 线性解池报告的独立句柄：只读取原生端产出的文本，由 Rust 校验自洽性
 * （向量长度与身份数一致、数值有限、身份非空且不重复、至少两个解）。
 * 本类不求解、不重算，也不认证最优性——解池按原 core 语义可以包含次优解。
 * Independent handle for a linear solution-pool report: it only reads text produced by a native host and lets Rust
 * validate self-consistency (vector lengths match the identity count, values are finite, identities are non-empty and
 * unique, and at least two solutions exist). It never solves, recomputes or certifies optimality—a pool may
 * legitimately contain suboptimal members.
 */
export class LinearSolutionPoolReport {
    private constructor(private value: PoolBinding | undefined) {}
    /** 解析并校验报告文本 / Parse and validate report text. */
    static fromJson(json: string): LinearSolutionPoolReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected solution pool report text");
        return invoke(() => new LinearSolutionPoolReport(wasm().LinearSolutionPoolReport.fromJson(json)));
    }
    private raw(): PoolBinding {
        if (!this.value) throw new OspfError("Disposed", "solution pool report has been disposed");
        return this.value;
    }
    /** 模型指纹，报告只对自己的模型有效 / Model fingerprint; the report is valid only for its own model. */
    modelFingerprint(): string { return invoke(() => this.raw().modelFingerprint()); }
    /** 按解向量顺序排列的稳定变量身份 / Stable variable identities in solution-vector order. */
    variableIds(): string[] { return invoke(() => this.raw().variableIds()); }
    /** 解数量 / Solution count. */
    count(): number { return invoke(() => this.raw().count()); }
    /** 第 `index` 个解的完整向量 / The complete vector of solution `index`. */
    solution(index: number): Float64Array { return invoke(() => this.raw().solution(index)); }
    /**  incumbent 目标值（若有）/ Incumbent objective when present. */
    bestObjective(): number | undefined { return invoke(() => this.raw().bestObjective()); }
    /** Rust 归一化后的无损文本（f64 写成 `2.0` 而不是输入里的 `2`）/ Lossless text as Rust normalizes it (f64 becomes `2.0`). */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 固定整数 LP 局部有效性（敏感性）报告的独立句柄：文本在 Rust 内反序列化并调用原 core 的
 * `validate`，因此调用方拿到的是已校验过的结论。本类不求解，也不填充任何缺失证据。
 * Independent handle for a fixed-integer LP local-effectiveness (sensitivity) report: the text is deserialized inside
 * Rust and validated by the original core `validate`, so callers receive an already-validated conclusion. This class
 * never solves and never fills in missing evidence.
 */
export class LocalConstraintSensitivityReport {
    private constructor(private value: SensitivityBinding | undefined) {}
    /** 解析并校验报告文本 / Parse and validate report text. */
    static fromJson(json: string): LocalConstraintSensitivityReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected sensitivity report text");
        return invoke(() => new LocalConstraintSensitivityReport(wasm().LocalConstraintSensitivityReport.fromJson(json)));
    }
    private raw(): SensitivityBinding {
        if (!this.value) throw new OspfError("Disposed", "sensitivity report has been disposed");
        return this.value;
    }
    /** 报告 schema 版本 / Report schema version. */
    schemaVersion(): string { return invoke(() => this.raw().schemaVersion()); }
    /** baseline 目标值 / Baseline objective value. */
    baselineObjective(): number { return invoke(() => this.raw().baselineObjective()); }
    /** 固定整数变量数量 / Fixed integer variable count. */
    fixedIntegerCount(): number { return invoke(() => this.raw().fixedIntegerCount()); }
    /** 被分析的原始约束稳定身份 / Stable identities of the analyzed original constraints. */
    constraintIds(): string[] { return invoke(() => this.raw().constraintIds()); }
    /** Rust 归一化后的无损文本 / Lossless text as Rust normalizes it. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 认证 LP 定价对偶：由真实线性模型 + 最优 LP 报告在 Rust 内复核指纹、维度、primal/dual 可行性与目标一致性后给出。
 * 裸对偶、缺失对偶或非有限值都会被拒绝，本类从不补 0。
 * Certified LP pricing duals: Rust re-checks the fingerprint, dimensions, primal/dual feasibility and objective
 * agreement of a real linear model against an optimal LP report. Raw or missing duals and non-finite values are
 * rejected, and this class never fills in zeroes.
 */
export class CertifiedPricingDuals {
    private constructor(private value: PricingBinding | undefined) {}
    /** 用模型工件与报告文本构造认证对偶 / Build certified duals from a model artifact and report text. */
    static verify(artifact: ModelArtifact, reportJson: string): CertifiedPricingDuals {
        if (typeof artifact !== "object" || artifact === null) throw new OspfError("InvalidInput", "expected a model artifact");
        if (typeof reportJson !== "string") throw new OspfError("InvalidInput", "expected pricing report text");
        return invoke(() => new CertifiedPricingDuals(wasm().CertifiedPricingDuals.verify(JSON.stringify(artifact), reportJson)));
    }
    private raw(): PricingBinding {
        if (!this.value) throw new OspfError("Disposed", "certified pricing duals have been disposed");
        return this.value;
    }
    /** 认证模型指纹 / Certified model fingerprint. */
    modelFingerprint(): string { return invoke(() => this.raw().modelFingerprint()); }
    /** 稳定约束身份，按原模型行顺序 / Stable constraint identities in original model row order. */
    constraintIds(): string[] { return invoke(() => this.raw().constraintIds()); }
    /** 认证对偶，与 `constraintIds()` 一一对应 / Certified duals aligned with `constraintIds()`. */
    duals(): Float64Array { return invoke(() => this.raw().duals()); }
    /** 指定约束的认证对偶 / Certified dual of one constraint. */
    dual(constraintId: string): number {
        if (typeof constraintId !== "string" || constraintId.length === 0) throw new OspfError("InvalidInput", "expected a constraint identity");
        return invoke(() => this.raw().dual(constraintId));
    }
    /** Rust 归一化后的无损文本 / Lossless text as Rust normalizes it. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 多后端扫描报告的独立句柄：同一模型在一组后端/预算下的逐 case 结果，按 case ID 稳定排序。
 * 每个 case 恰好一个结论——要么求解摘要，要么错误码；reader 只校验这条不变量，
 * 不重算、不认证最优性。
 * Independent handle for a multi-backend sweep report: per-case results of one model under a set of backends and
 * budgets, sorted stably by case ID. Every case carries exactly one verdict—either a solve summary or an error code.
 * The reader only enforces that invariant; it never recomputes or certifies optimality.
 */
export class LinearSweepReport {
    private constructor(private value: SweepBinding | undefined) {}
    /** 解析并校验报告文本 / Parse and validate report text. */
    static fromJson(json: string): LinearSweepReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected sweep report text");
        return invoke(() => new LinearSweepReport(wasm().LinearSweepReport.fromJson(json)));
    }
    private raw(): SweepBinding {
        if (!this.value) throw new OspfError("Disposed", "sweep report has been disposed");
        return this.value;
    }
    /** 被扫描的模型指纹 / Fingerprint of the swept model. */
    modelFingerprint(): string { return invoke(() => this.raw().modelFingerprint()); }
    /** case 数量 / Number of cases. */
    count(): number { return invoke(() => this.raw().count()); }
    /** 按 case ID 排序的 case 列表 / Case IDs in sorted order. */
    caseIds(): string[] { return invoke(() => this.raw().caseIds()); }
    /** 该 case 是否拿到求解摘要 / Whether the case carries a solve summary. */
    hasSummary(caseId: string): boolean { return invoke(() => this.raw().hasSummary(this.caseId(caseId))); }
    /** 该 case 的错误码；成功时为 undefined / The case error code; undefined on success. */
    errorCode(caseId: string): string | undefined { return invoke(() => this.raw().errorCode(this.caseId(caseId))); }
    /** 该 case 的目标值 / Objective of the case. */
    objectiveValue(caseId: string): number | undefined { return invoke(() => this.raw().objectiveValue(this.caseId(caseId))); }
    /** 该 case 是否携带已验证最优性证明 / Whether the case carries a verified optimality proof. */
    hasOptimalityProof(caseId: string): boolean { return invoke(() => this.raw().hasOptimalityProof(this.caseId(caseId))); }
    /** Rust 归一化后的无损文本 / Lossless text as Rust normalizes it. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
    private caseId(caseId: string): string {
        if (typeof caseId !== "string" || caseId.length === 0) throw new OspfError("InvalidInput", "expected a sweep case ID");
        return caseId;
    }
}

/**
 * 网络流（原 `network-scheduling` 多商品最小费用流）报告的独立句柄。
 * 解按原领域结构给出：流量、弃供、缺货、共享资源与四项费用分项，不折叠成单一总费用；
 * 摘要与解的一致性（有最优性证明就必须有解）由 Rust 侧复核。
 * Independent handle for a network-flow report (the original `network-scheduling` multi-commodity min-cost flow).
 * The solution keeps the domain structure—flows, spills, shortages, shared resources and four cost components—rather
 * than collapsing into one total, and Rust re-checks that a claimed optimality proof comes with a solution.
 */
export class NetworkFlowReport {
    private constructor(private value: FlowBinding | undefined) {}
    /** 解析并校验报告文本 / Parse and validate report text. */
    static fromJson(json: string): NetworkFlowReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected network flow report text");
        return invoke(() => new NetworkFlowReport(wasm().NetworkFlowReport.fromJson(json)));
    }
    private raw(): FlowBinding {
        if (!this.value) throw new OspfError("Disposed", "network flow report has been disposed");
        return this.value;
    }
    /** 问题结论 / Problem conclusion. */
    problemStatus(): string { return invoke(() => this.raw().problemStatus()); }
    /** 目标值 / Objective value. */
    objectiveValue(): number | undefined { return invoke(() => this.raw().objectiveValue()); }
    /** 是否携带已验证最优性证明 / Whether a verified optimality proof is attached. */
    hasOptimalityProof(): boolean { return invoke(() => this.raw().hasOptimalityProof()); }
    /** 是否有领域解 / Whether a domain solution is present. */
    hasSolution(): boolean { return invoke(() => this.raw().hasSolution()); }
    /** 总费用 / Total cost. */
    totalCost(): number | undefined { return invoke(() => this.raw().totalCost()); }
    /** 费用分项：运行、弃供、缺货、总计 / Cost components: operating, spill, shortage, total. */
    costComponents(): Float64Array { return invoke(() => this.raw().costComponents()); }
    /** 流的条数 / Number of flows. */
    flowCount(): number { return invoke(() => this.raw().flowCount()); }
    /** 第 `index` 条流量 / Flow `index`. */
    flow(index: number): { commodity: string; arc: string; amount: number; unit: string } {
        return invoke(() => {
            const [commodity, arc, amount] = this.raw().flow(index);
            return { commodity, arc, amount, unit: this.raw().flowUnit(index) };
        });
    }
    /** Rust 归一化后的无损文本 / Lossless text as Rust normalizes it. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 广义流（原 `network-scheduling` 带产率与单位转换的最小费用流）报告的独立句柄。
 * 弧结果（投入／产出／产率损耗／费用）与节点结果（实际净供给／残差）分开保留，
 * 产率损耗不被抹平；摘要与解的一致性由 Rust 侧复核。
 * Independent handle for a generalized-flow report (the original `network-scheduling` min-cost flow with production
 * yield and unit conversion). Arc results (input/output/yield loss/cost) and node results (actual net supply/residual)
 * are kept separate and the yield loss is never flattened away; Rust re-checks summary/solution consistency.
 */
export class GeneralizedFlowReport {
    private constructor(private value: GeneralizedBinding | undefined) {}
    /** 解析并校验报告文本 / Parse and validate report text. */
    static fromJson(json: string): GeneralizedFlowReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected generalized flow report text");
        return invoke(() => new GeneralizedFlowReport(wasm().GeneralizedFlowReport.fromJson(json)));
    }
    private raw(): GeneralizedBinding {
        if (!this.value) throw new OspfError("Disposed", "generalized flow report has been disposed");
        return this.value;
    }
    /** 问题结论 / Problem conclusion. */
    problemStatus(): string { return invoke(() => this.raw().problemStatus()); }
    /** 目标值 / Objective value. */
    objectiveValue(): number | undefined { return invoke(() => this.raw().objectiveValue()); }
    /** 是否携带已验证最优性证明 / Whether a verified optimality proof is attached. */
    hasOptimalityProof(): boolean { return invoke(() => this.raw().hasOptimalityProof()); }
    /** 是否有领域解 / Whether a domain solution is present. */
    hasSolution(): boolean { return invoke(() => this.raw().hasSolution()); }
    /** 总费用 / Total cost. */
    totalCost(): number | undefined { return invoke(() => this.raw().totalCost()); }
    /** 弧结果数量 / Number of arc results. */
    arcCount(): number { return invoke(() => this.raw().arcCount()); }
    /** 第 `index` 条弧的结果 / Result of arc `index`. */
    arc(index: number): { id: string; input: number; output: number; yieldLoss: number; cost: number } {
        return invoke(() => {
            const [id, input, output, yieldLoss, cost] = this.raw().arc(index);
            return { id, input, output, yieldLoss, cost };
        });
    }
    /** 节点结果数量 / Number of node results. */
    nodeCount(): number { return invoke(() => this.raw().nodeCount()); }
    /** 第 `index` 个节点的结果 / Result of node `index`. */
    node(index: number): { id: string; actualNetSupply: number; residual: number } {
        return invoke(() => {
            const [id, actualNetSupply, residual] = this.raw().node(index);
            return { id, actualNetSupply, residual };
        });
    }
    /** Rust 归一化后的无损文本 / Lossless text as Rust normalizes it. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 网络建设（原 `network-scheduling` 共享建设选择 + 名义流）报告的独立句柄。
 * 建设选择、建设费用、名义流与总费用一起给出；任一项缺失时相关访问器报错，不静默补值。
 * Independent handle for a network-design report (the original `network-scheduling` shared construction choices plus
 * nominal flow). Construction choices, construction cost, nominal flow and total cost are delivered together; a
 * missing part makes its accessor fail instead of being silently filled in.
 */
export class NetworkDesignReport {
    private constructor(private value: DesignBinding | undefined) {}
    /** 解析并校验报告文本 / Parse and validate report text. */
    static fromJson(json: string): NetworkDesignReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected network design report text");
        return invoke(() => new NetworkDesignReport(wasm().NetworkDesignReport.fromJson(json)));
    }
    private raw(): DesignBinding {
        if (!this.value) throw new OspfError("Disposed", "network design report has been disposed");
        return this.value;
    }
    /** 问题结论 / Problem conclusion. */
    problemStatus(): string { return invoke(() => this.raw().problemStatus()); }
    /** 目标值 / Objective value. */
    objectiveValue(): number | undefined { return invoke(() => this.raw().objectiveValue()); }
    /** 是否携带已验证最优性证明 / Whether a verified optimality proof is attached. */
    hasOptimalityProof(): boolean { return invoke(() => this.raw().hasOptimalityProof()); }
    /** 是否有领域解 / Whether a domain solution is present. */
    hasSolution(): boolean { return invoke(() => this.raw().hasSolution()); }
    /** 已开设设施，按稳定 ID 排序 / Open facilities sorted by stable ID. */
    openFacilities(): string[] { return invoke(() => this.raw().openFacilities()); }
    /** 选中等级的条数 / Number of selected service levels. */
    serviceLevelCount(): number { return invoke(() => this.raw().serviceLevelCount()); }
    /** 第 `index` 条通道选中的等级 / Selected level of service `index`. */
    serviceLevel(index: number): { arc: string; level: string } {
        return invoke(() => {
            const [arc, level] = this.raw().serviceLevel(index);
            return { arc, level };
        });
    }
    /** 建设费用 / Construction cost. */
    constructionCost(): number { return invoke(() => this.raw().constructionCost()); }
    /** 名义流总费用 / Nominal-flow total cost. */
    operatingCost(): number { return invoke(() => this.raw().operatingCost()); }
    /** 建设加运行的总费用 / Construction plus operating total cost. */
    totalCost(): number { return invoke(() => this.raw().totalCost()); }
    /** 名义流条数 / Number of nominal flows. */
    flowCount(): number { return invoke(() => this.raw().flowCount()); }
    /** Rust 归一化后的无损文本 / Lossless text as Rust normalizes it. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 网络结构（原 `network-scheduling` 根树 + 设施归属）报告的独立句柄。
 * 树弧、连通节点、父弧、建设选择与分区归属一起交付；该领域不注册商品流，因此没有流量访问器。
 * Independent handle for a network-structure report (the original `network-scheduling` rooted tree plus facility
 * ownership). Tree arcs, connected nodes, parent arcs, construction choices and partition ownership are delivered
 * together; this domain registers no commodity flows, so there is no flow accessor.
 */
export class NetworkStructureReport {
    private constructor(private value: StructureBinding | undefined) {}
    /** 解析并校验报告文本 / Parse and validate report text. */
    static fromJson(json: string): NetworkStructureReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected network structure report text");
        return invoke(() => new NetworkStructureReport(wasm().NetworkStructureReport.fromJson(json)));
    }
    private raw(): StructureBinding {
        if (!this.value) throw new OspfError("Disposed", "network structure report has been disposed");
        return this.value;
    }
    /** 问题结论 / Problem conclusion. */
    problemStatus(): string { return invoke(() => this.raw().problemStatus()); }
    /** 目标值 / Objective value. */
    objectiveValue(): number | undefined { return invoke(() => this.raw().objectiveValue()); }
    /** 是否携带已验证最优性证明 / Whether a verified optimality proof is attached. */
    hasOptimalityProof(): boolean { return invoke(() => this.raw().hasOptimalityProof()); }
    /** 是否有领域解 / Whether a domain solution is present. */
    hasSolution(): boolean { return invoke(() => this.raw().hasSolution()); }
    /** 选中的树弧，按稳定 ID 排序 / Selected tree arcs sorted by stable ID. */
    treeArcs(): string[] { return invoke(() => this.raw().treeArcs()); }
    /** 根树中的全部节点 / Every node in the rooted tree. */
    connectedNodes(): string[] { return invoke(() => this.raw().connectedNodes()); }
    /** 父弧数量 / Number of parent arcs. */
    parentArcCount(): number { return invoke(() => this.raw().parentArcCount()); }
    /** 第 `index` 个父弧 / Parent arc `index`. */
    parentArc(index: number): { node: string; arc: string } {
        return invoke(() => {
            const [node, arc] = this.raw().parentArc(index);
            return { node, arc };
        });
    }
    /** 已开设设施，按稳定 ID 排序 / Open facilities sorted by stable ID. */
    openFacilities(): string[] { return invoke(() => this.raw().openFacilities()); }
    /** 分区归属数量 / Number of partition owners. */
    partitionOwnerCount(): number { return invoke(() => this.raw().partitionOwnerCount()); }
    /** 第 `index` 个分区归属 / Partition ownership `index`. */
    partitionOwner(index: number): { partition: string; owner: string } {
        return invoke(() => {
            const [partition, owner] = this.raw().partitionOwner(index);
            return { partition, owner };
        });
    }
    /** 建设费用 / Construction cost. */
    constructionCost(): number { return invoke(() => this.raw().constructionCost()); }
    /** Rust 归一化后的无损文本 / Lossless text as Rust normalizes it. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 分配（原 `network-scheduling` 运输分配 + 共享配额 + 枢纽建设）报告的独立句柄。
 * 运输量按「请求-服务」对给出，不是整数计数；共享配额与枢纽建设一起交付。
 * Independent handle for an allocation report (the original `network-scheduling` transportation allocation with shared
 * quotas and hub construction). Shipped amounts are per request-service pair rather than integer counts, and shared
 * quotas come with hub construction.
 */
export class AllocationReport {
    private constructor(private value: AllocationBinding | undefined) {}
    /** 解析并校验报告文本 / Parse and validate report text. */
    static fromJson(json: string): AllocationReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected allocation report text");
        return invoke(() => new AllocationReport(wasm().AllocationReport.fromJson(json)));
    }
    private raw(): AllocationBinding {
        if (!this.value) throw new OspfError("Disposed", "allocation report has been disposed");
        return this.value;
    }
    /** 问题结论 / Problem conclusion. */
    problemStatus(): string { return invoke(() => this.raw().problemStatus()); }
    /** 目标值 / Objective value. */
    objectiveValue(): number | undefined { return invoke(() => this.raw().objectiveValue()); }
    /** 是否携带已验证最优性证明 / Whether a verified optimality proof is attached. */
    hasOptimalityProof(): boolean { return invoke(() => this.raw().hasOptimalityProof()); }
    /** 是否有领域解 / Whether a domain solution is present. */
    hasSolution(): boolean { return invoke(() => this.raw().hasSolution()); }
    /** 运输条目数量 / Number of shipment entries. */
    shipmentCount(): number { return invoke(() => this.raw().shipmentCount()); }
    /** 第 `index` 条运输 / Shipment `index`. */
    shipment(index: number): { request: string; service: string; amount: number; unit: string } {
        return invoke(() => {
            const [request, service, amount, unit] = this.raw().shipment(index);
            return { request, service, amount, unit };
        });
    }
    /** 已开设枢纽，按稳定 ID 排序 / Open hubs sorted by stable ID. */
    openHubs(): string[] { return invoke(() => this.raw().openHubs()); }
    /** 选中服务等级的条数 / Number of selected service levels. */
    serviceLevelCount(): number { return invoke(() => this.raw().serviceLevelCount()); }
    /** 第 `index` 条服务等级 / Service level `index`. */
    serviceLevel(index: number): { service: string; level: string } {
        return invoke(() => {
            const [service, level] = this.raw().serviceLevel(index);
            return { service, level };
        });
    }
    /** 建设费用 / Construction cost. */
    constructionCost(): number { return invoke(() => this.raw().constructionCost()); }
    /** 运行加建设费用 / Operating-plus-construction cost. */
    totalCost(): number { return invoke(() => this.raw().totalCost()); }
    /** Rust 归一化后的无损文本 / Lossless text as Rust normalizes it. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 韧性（原 `network-scheduling` 显式故障场景 + 连通要求）报告的独立句柄。
 * 场景结果逐个给出，结论不超出显式场景；`worstOperatingCost` 是实际最坏值，
 * `operatingCostEpigraph` 是求解模型的上包络，可行非最优时可能有余量，两者不能混用。
 * Independent handle for a resilience report (the original `network-scheduling` explicit failure scenarios plus
 * connectivity requirements). Scenario results are delivered one by one and conclusions never reach beyond explicit
 * scenarios; `worstOperatingCost` is the realized worst value while `operatingCostEpigraph` is the solver's epigraph,
 * which may carry slack in feasible nonoptimal results—the two must not be conflated.
 */
export class NetworkResilienceReport {
    private constructor(private value: ResilienceBinding | undefined) {}
    /** 解析并校验报告文本 / Parse and validate report text. */
    static fromJson(json: string): NetworkResilienceReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected resilience report text");
        return invoke(() => new NetworkResilienceReport(wasm().NetworkResilienceReport.fromJson(json)));
    }
    private raw(): ResilienceBinding {
        if (!this.value) throw new OspfError("Disposed", "resilience report has been disposed");
        return this.value;
    }
    /** 问题结论 / Problem conclusion. */
    problemStatus(): string { return invoke(() => this.raw().problemStatus()); }
    /** 目标值 / Objective value. */
    objectiveValue(): number | undefined { return invoke(() => this.raw().objectiveValue()); }
    /** 是否携带已验证最优性证明 / Whether a verified optimality proof is attached. */
    hasOptimalityProof(): boolean { return invoke(() => this.raw().hasOptimalityProof()); }
    /** 是否有领域解 / Whether a domain solution is present. */
    hasSolution(): boolean { return invoke(() => this.raw().hasSolution()); }
    /** 场景 ID 列表，含 `nominal` / Scenario IDs, including `nominal`. */
    scenarioIds(): string[] { return invoke(() => this.raw().scenarioIds()); }
    /** 该场景的实际运输总量 / Total shipped amount of one scenario. */
    shippedAmount(scenarioId: string): number { return invoke(() => this.raw().shippedAmount(this.scenario(scenarioId))); }
    /** 该场景的逐弧流量弧 ID / Arc IDs carrying flow in one scenario. */
    scenarioArcs(scenarioId: string): string[] { return invoke(() => this.raw().scenarioArcs(this.scenario(scenarioId))); }
    /** 运行费用最大的场景 / The scenario with the maximum realized operating cost. */
    worstScenario(): string { return invoke(() => this.raw().worstScenario()); }
    /** 实际最大运行费用 / Actual maximum operating cost. */
    worstOperatingCost(): number { return invoke(() => this.raw().worstOperatingCost()); }
    /** 求解模型的费用上包络 / The solver's cost epigraph. */
    operatingCostEpigraph(): number { return invoke(() => this.raw().operatingCostEpigraph()); }
    /** 建设费用 / Construction cost. */
    constructionCost(): number { return invoke(() => this.raw().constructionCost()); }
    /** 建设加实际最坏运行费用 / Construction plus the actual worst operating cost. */
    totalCost(): number { return invoke(() => this.raw().totalCost()); }
    /** 连通要求的辅助流条数 / Number of connectivity-requirement auxiliary flows. */
    connectivityFlowCount(): number { return invoke(() => this.raw().connectivityFlowCount()); }
    /** Rust 归一化后的无损文本 / Lossless text as Rust normalizes it. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
    private scenario(scenarioId: string): string {
        if (typeof scenarioId !== "string" || scenarioId.length === 0) throw new OspfError("InvalidInput", "expected a scenario ID");
        return scenarioId;
    }
}

/**
 * VRP（原 `network-scheduling` 带时间窗车辆路径，分支定价）报告的独立句柄。
 * 路线按停靠点顺序交付，时刻是 RFC 3339 原文；累计负载是到该停靠点为止的车上载重。
 * Independent handle for a VRP report (the original `network-scheduling` vehicle routing with time windows solved by
 * branch and price). Routes are delivered in stop order, instants stay RFC 3339 text, and the accumulated load is the
 * on-board amount up to that stop.
 */
export class VrpReport {
    private constructor(private value: VrpBinding | undefined) {}
    /** 解析并校验报告文本 / Parse and validate report text. */
    static fromJson(json: string): VrpReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected vrp report text");
        return invoke(() => new VrpReport(wasm().VrpReport.fromJson(json)));
    }
    private raw(): VrpBinding {
        if (!this.value) throw new OspfError("Disposed", "vrp report has been disposed");
        return this.value;
    }
    /** 问题结论 / Problem conclusion. */
    problemStatus(): string { return invoke(() => this.raw().problemStatus()); }
    /** 目标值 / Objective value. */
    objectiveValue(): number | undefined { return invoke(() => this.raw().objectiveValue()); }
    /** 是否携带已验证最优性证明 / Whether a verified optimality proof is attached. */
    hasOptimalityProof(): boolean { return invoke(() => this.raw().hasOptimalityProof()); }
    /** 是否有领域解 / Whether a domain solution is present. */
    hasSolution(): boolean { return invoke(() => this.raw().hasSolution()); }
    /** 路线数量 / Number of routes. */
    routeCount(): number { return invoke(() => this.raw().routeCount()); }
    /** 第 `index` 条路线的车辆类型 / Vehicle type of route `index`. */
    routeVehicleType(index: number): string { return invoke(() => this.raw().routeVehicleType(index)); }
    /** 第 `index` 条路线的停靠点数量 / Stop count of route `index`. */
    routeStopCount(index: number): number { return invoke(() => this.raw().routeStopCount(index)); }
    /** 第 `index` 条路线第 `stop` 个停靠点 / Stop `stop` on route `index`. */
    routeStop(index: number, stop: number): { node: string; customer: string | null; arrival: string; serviceStart: string; departure: string } {
        return invoke(() => {
            const [node, customer, arrival, serviceStart, departure] = this.raw().routeStop(index, stop);
            return { node, customer, arrival, serviceStart, departure };
        });
    }
    /** 第 `index` 条路线第 `stop` 个停靠点的累计负载 / Accumulated load at stop `stop` on route `index`. */
    routeStopLoad(index: number, stop: number): number { return invoke(() => this.raw().routeStopLoad(index, stop)); }
    /** 第 `index` 条路线的弧序列 / Arc sequence of route `index`. */
    routeArcs(index: number): string[] { return invoke(() => this.raw().routeArcs(index)); }
    /** 第 `index` 条路线的距离 / Distance of route `index`. */
    routeDistance(index: number): number { return invoke(() => this.raw().routeDistance(index)); }
    /** 第 `index` 条路线的成本 / Cost of route `index`. */
    routeCost(index: number): number { return invoke(() => this.raw().routeCost(index)); }
    /** 总距离 / Total distance. */
    totalDistance(): number { return invoke(() => this.raw().totalDistance()); }
    /** 总成本 / Total cost. */
    totalCost(): number { return invoke(() => this.raw().totalCost()); }
    /** Rust 归一化后的无损文本 / Lossless text as Rust normalizes it. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 二次组合编排（多个已绑定二次后端串行或并行）报告的独立句柄。
 * 每个后端一个 attempt，`attemptOutcome` 声明的结论必须与携带的证据一致；
 * 模型身份由调用方给出的指纹复核，不匹配直接拒绝。
 * Independent handle for a quadratic-orchestration report (several bound quadratic backends solving serially or in
 * parallel). Each backend contributes one attempt, and the outcome reported by `attemptOutcome` must match the evidence
 * it carries; the model identity is rechecked against the caller's fingerprint and a mismatch is refused.
 */
export class QuadraticOrchestrationReport {
    private constructor(private value: OrchestrationBinding | undefined) {}
    /** 解析并校验聚合报告 / Parse and validate the aggregate report. */
    static fromJson(json: string, modelFingerprint: string): QuadraticOrchestrationReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected quadratic orchestration report text");
        if (typeof modelFingerprint !== "string" || modelFingerprint.length === 0) {
            throw new OspfError("InvalidInput", "expected the submitted model fingerprint");
        }
        return invoke(() => new QuadraticOrchestrationReport(
            wasm().QuadraticOrchestrationReport.fromJson(json, modelFingerprint)));
    }
    private raw(): OrchestrationBinding {
        if (!this.value) throw new OspfError("Disposed", "quadratic orchestration report has been disposed");
        return this.value;
    }
    /** attempt 数量 / Number of attempts. */
    attemptCount(): number { return invoke(() => this.raw().attemptCount()); }
    /** 第 `index` 个 attempt 的后端名 / Backend name of attempt `index`. */
    attemptBackend(index: number): string { return invoke(() => this.raw().attemptBackend(index)); }
    /** 第 `index` 个 attempt 的结论类型 / Outcome of attempt `index`. */
    attemptOutcome(index: number): "report" | "failed" | "cancelled" | "notStarted" {
        return invoke(() => this.raw().attemptOutcome(index) as "report" | "failed" | "cancelled" | "notStarted");
    }
    /** 第 `index` 个 attempt 的错误消息；无错误时为 `undefined`。 / Error message of attempt `index`, `undefined` when absent. */
    attemptError(index: number): string | undefined { return invoke(() => this.raw().attemptError(index)); }
    /** 聚合报告的模型指纹 / Model fingerprint of the aggregate report. */
    modelFingerprint(): string { return invoke(() => this.raw().modelFingerprint()); }
    /** 聚合报告的问题结论 / Problem conclusion of the aggregate report. */
    problemStatus(): string { return invoke(() => this.raw().problemStatus()); }
    /** 聚合报告是否携带最优性证明 / Whether the aggregate report carries an optimality proof. */
    hasOptimalityProof(): boolean { return invoke(() => this.raw().hasOptimalityProof()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 键注册结果（对应框架层的 `optional_array`／`appendable_pool`／`indexed_combination`）。
 * 返回的模型工件可直接再提交求解；`retiredKeys` 是保留在模型里但不再给出索引的键。
 * Key-registration result (mirroring the framework's `optional_array`, `appendable_pool` and `indexed_combination`).
 * The returned model artifact can be submitted for solving directly; `retiredKeys` are keys kept in the model without
 * an index.
 */
export class IndexedRegistrationReport {
    private constructor(private value: RegistrationBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): IndexedRegistrationReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected indexed registration report text");
        return invoke(() => new IndexedRegistrationReport(wasm().IndexedRegistrationReport.fromJson(json)));
    }
    private raw(): RegistrationBinding {
        if (!this.value) throw new OspfError("Disposed", "indexed registration report has been disposed");
        return this.value;
    }
    /** 注册后的模型 JSON / The registered model JSON. */
    modelJson(): string { return invoke(() => this.raw().modelJson()); }
    /** 注册后的模型指纹 / The registered model fingerprint. */
    modelFingerprint(): string { return invoke(() => this.raw().modelFingerprint()); }
    /** 注册后的变量总数 / Total variable count after registration. */
    variableCount(): number { return invoke(() => this.raw().variableCount()); }
    /** 映射条目数量 / Number of mapping entries. */
    indexCount(): number { return invoke(() => this.raw().indexCount()); }
    /** 第 `position` 条映射 / Mapping entry `position`. */
    indexEntry(position: number): { key: string; index: number } {
        return invoke(() => {
            const [key, index] = this.raw().indexEntry(position);
            return { key, index };
        });
    }
    /** 按键查索引；未注册返回 `undefined` / Look up an index by key, `undefined` when absent. */
    indexOfKey(key: string): number | undefined {
        if (typeof key !== "string" || key.length === 0) throw new OspfError("InvalidInput", "expected a key");
        return invoke(() => this.raw().indexOfKey(key));
    }
    /** 已退役的键 / Retired keys. */
    retiredKeys(): string[] { return invoke(() => this.raw().retiredKeys()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 列生成批次的证据证书（对应框架层的 `column_generation_batch`）。
 * 两个判定分开给出：空列本身不构成"无改进"证据，只有完整作用域加上独立证据才算。
 * Evidence certificate for a column-generation batch (mirroring the framework's `column_generation_batch`). The two
 * verdicts stay separate: an empty pool alone is not no-improvement evidence; only a full scope plus independent
 * evidence counts.
 */
export class LinearColumnCertificate {
    private constructor(private value: ColumnCertificateBinding | undefined) {}
    /** 解析并校验证书文本 / Parse and validate certificate text. */
    static fromJson(json: string): LinearColumnCertificate {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected column certificate text");
        return invoke(() => new LinearColumnCertificate(wasm().LinearColumnCertificate.fromJson(json)));
    }
    private raw(): ColumnCertificateBinding {
        if (!this.value) throw new OspfError("Disposed", "column certificate has been disposed");
        return this.value;
    }
    /** 是否在声明作用域内被完整搜索 / Whether it was exhaustively searched within its declared scope. */
    certifiesExhaustive(): boolean { return invoke(() => this.raw().certifiesExhaustive()); }
    /** 是否连同无改进证据一起成立 / Whether it also holds with the no-improvement evidence. */
    certifiesNoImprovingColumns(): boolean { return invoke(() => this.raw().certifiesNoImprovingColumns()); }
    /** 被复核的请求身份 / The rechecked request identity. */
    request(): string { return invoke(() => this.raw().request()); }
    /** 被复核的模型版本 / The rechecked model revision. */
    model(): string { return invoke(() => this.raw().model()); }
    /** 被复核的对偶版本 / The rechecked dual revision. */
    dual(): string { return invoke(() => this.raw().dual()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 运行心跳快照（对应框架层的 `running_heart_beat`）。
 * `uptimeMs` 是真实经过的时间，不做取整承诺。
 * Running-heartbeat snapshot (mirroring the framework's `running_heart_beat`). `uptimeMs` is real elapsed time with no
 * rounding promise.
 */
export class HeartBeatSnapshot {
    private constructor(private value: HeartBeatBinding | undefined) {}
    /** 解析并校验快照文本 / Parse and validate snapshot text. */
    static fromJson(json: string): HeartBeatSnapshot {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected heartbeat snapshot text");
        return invoke(() => new HeartBeatSnapshot(wasm().HeartBeatSnapshot.fromJson(json)));
    }
    private raw(): HeartBeatBinding {
        if (!this.value) throw new OspfError("Disposed", "heartbeat snapshot has been disposed");
        return this.value;
    }
    /** 运行时长（毫秒）/ Uptime in milliseconds. */
    uptimeMs(): number { return invoke(() => this.raw().uptimeMs()); }
    /** 心跳计数 / Tick count. */
    tickCount(): number { return invoke(() => this.raw().tickCount()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 通用响应信封（对应框架层的 `network::Response`）。
 * 成功必须带载荷且不带消息，失败必须带消息且不带载荷；桥接只复核，不替调用方补字段。
 * Generic response envelope (mirroring the framework's `network::Response`). Success carries a payload and no message;
 * failure carries a message and no payload. The bridge only rechecks and never fills a field in on the caller's behalf.
 */
export class ResponseEnvelope {
    private constructor(private value: EnvelopeBinding | undefined) {}
    /** 解析并复核信封文本 / Parse and recheck envelope text. */
    static fromJson(json: string): ResponseEnvelope {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected response envelope text");
        return invoke(() => new ResponseEnvelope(wasm().ResponseEnvelope.fromJson(json)));
    }
    private raw(): EnvelopeBinding {
        if (!this.value) throw new OspfError("Disposed", "response envelope has been disposed");
        return this.value;
    }
    /** 是否成功 / Whether the operation succeeded. */
    success(): boolean { return invoke(() => this.raw().success()); }
    /** 消息；成功时为 `undefined` / The message, `undefined` on success. */
    message(): string | undefined { return invoke(() => this.raw().message()); }
    /** 载荷；失败时为 `undefined` / The payload, `undefined` on failure. */
    data(): string | undefined { return invoke(() => this.raw().data()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 动态模型生命周期结果（对应框架层的 `dynamic_lifecycle`）。
 * 列状态按索引升序给出；`fixed` 列仍然可选（固定只收窄范围），`hidden`/`removed` 才退出可选集合。
 * Dynamic-model lifecycle result (mirroring the framework's `dynamic_lifecycle`). Column states come in ascending index
 * order; a `fixed` column stays selectable (fixing only narrows the range), while `hidden` and `removed` leave the
 * selectable set.
 */
export class LinearLifecycleReport {
    private constructor(private value: LifecycleBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): LinearLifecycleReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected linear lifecycle report text");
        return invoke(() => new LinearLifecycleReport(wasm().LinearLifecycleReport.fromJson(json)));
    }
    private raw(): LifecycleBinding {
        if (!this.value) throw new OspfError("Disposed", "linear lifecycle report has been disposed");
        return this.value;
    }
    /** 列数 / Column count. */
    columnCount(): number { return invoke(() => this.raw().columnCount()); }
    /** 第 `column` 列的状态 / State of column `column`. */
    columnState(column: number): "active" | "hidden" | "fixed" | "removed" {
        return invoke(() => this.raw().columnState(column) as "active" | "hidden" | "fixed" | "removed");
    }
    /** 仍可选的列 / Columns that remain selectable. */
    selectableColumns(): number[] { return invoke(() => Array.from(this.raw().selectableColumns())); }
    /** warm-start 列 / Warm-start columns. */
    warmStartColumns(): number[] { return invoke(() => Array.from(this.raw().warmStartColumns())); }
    /** 注入解；未注入时为 `undefined` / The injected solution, `undefined` when absent. */
    solution(): number[] | undefined {
        // `Vec<f64>` 在 WASM 侧是 `Float64Array`，这里转成普通数组以免调用方被类型差异绊住。
        // `Vec<f64>` surfaces as a `Float64Array` through WASM; it is converted here so callers are not tripped by the
        // type difference.
        return invoke(() => {
            const values = this.raw().solution();
            return values === undefined ? undefined : Array.from(values);
        });
    }
    /** flush 次数 / Flush count. */
    flushCount(): number { return invoke(() => this.raw().flushCount()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 关系查询计划校验报告（对应框架层 `persistence::query` 的可移植子集）。
 *
 * 这一层不需要任何数据库：调用方可以在把计划交给任一后端之前，先用同一套规则自检并拿到稳定指纹。
 * 校验不通过时**不会**给出 `canonical()`/`canonicalHash()`——非法计划没有可用的规范化形式。
 *
 * Relational query-plan validation report (the portable subset of the framework's `persistence::query`). This layer
 * needs no database: callers can self-check a plan against the same rules and obtain a stable fingerprint before
 * handing it to any backend. When validation fails, `canonical()`/`canonicalHash()` are absent — an invalid plan has no
 * usable canonical form.
 */
export class QueryPlanReport {
    private constructor(private value: QueryPlanBinding | undefined) {}
    /** 解析并校验报告文本 / Parse and validate report text. */
    static fromJson(json: string): QueryPlanReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected query plan report text");
        return invoke(() => new QueryPlanReport(wasm().QueryPlanReport.fromJson(json)));
    }
    private raw(): QueryPlanBinding {
        if (!this.value) throw new OspfError("Disposed", "query plan report has been disposed");
        return this.value;
    }
    /** 是否通过校验 / Whether validation passed. */
    valid(): boolean { return invoke(() => this.raw().valid()); }
    /** 规范化表示；不通过校验时为 `undefined` / The canonical form, `undefined` when invalid. */
    canonical(): string | undefined { return invoke(() => this.raw().canonical()); }
    /** 规范化指纹；不通过校验时为 `undefined` / The canonical fingerprint, `undefined` when invalid. */
    canonicalHash(): string | undefined { return invoke(() => this.raw().canonicalHash()); }
    /** join 数量 / Join count. */
    joinCount(): number { return invoke(() => this.raw().joinCount()); }
    /** 投影数量 / Projection count. */
    projectionCount(): number { return invoke(() => this.raw().projectionCount()); }
    /** 数据源深度 / Source depth. */
    depth(): number { return invoke(() => this.raw().depth()); }
    /** 违规项数量 / Violation count. */
    violationCount(): number { return invoke(() => this.raw().violationCount()); }
    /** 第 `position` 个违规项 / Violation `position`. */
    violation(position: number): { field: string; reason: string } {
        return invoke(() => {
            const [field, reason] = this.raw().violation(position);
            return { field, reason };
        });
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * Benders 主问题单步结果（对应框架层 `linear_benders_decomposition_solver` 的 master 侧）。
 *
 * 这是**单步**能力：调用方给出模型工件与显式 cuts，桥接返回统一报告。切生成（子问题侧）需要
 * `MechanismModel` 的公开转换，目前不在可移植范围内，所以这里不假装能跑完整循环。
 *
 * Benders master single-step result (the master side of the framework's `linear_benders_decomposition_solver`). This
 * is a **single step**: the caller supplies a model artifact and explicit cuts, and the bridge returns a unified
 * report. Cut generation (the subproblem side) needs a public `MechanismModel` conversion and is not portable yet, so
 * this does not pretend to run a full loop.
 */
export class BendersMasterReport {
    private constructor(private value: BendersBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): BendersMasterReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected benders master report text");
        return invoke(() => new BendersMasterReport(wasm().BendersMasterReport.fromJson(json)));
    }
    private raw(): BendersBinding {
        if (!this.value) throw new OspfError("Disposed", "benders master report has been disposed");
        return this.value;
    }
    /** 内嵌的统一报告文本 / The embedded unified report text. */
    reportJson(): string { return invoke(() => this.raw().reportJson()); }
    /** 已应用的 cut 数量 / The applied cut count. */
    cutCount(): number { return invoke(() => this.raw().cutCount()); }
    /** 内嵌报告的问题结论（如 `FEASIBLE`/`INFEASIBLE`）/ The embedded report's problem status.
     * @returns the status, or `undefined` when the report carries none. */
    problemStatus(): string | undefined { return invoke(() => this.raw().problemStatus()); }
    /** 内嵌报告的终止原因 / The embedded report's termination reason. */
    terminationReason(): string | undefined { return invoke(() => this.raw().terminationReason()); }
    /** 内嵌报告的能否被当作最优 / Whether the embedded report is optimal. */
    isOptimal(): boolean {
        // 不自己重算最优性：只读内嵌报告的证明字段，缺证明一律 false。
        // Optimality is never recomputed here: the embedded report's proof is read directly, and a missing proof is false.
        const report = JSON.parse(this.reportJson());
        const proof = report.proof;
        return Boolean(proof && proof.kind === "OPTIMALITY" && proof.status === "VERIFIED");
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 谓词字段过滤提取结果（对应框架层 `predicate_field_filter`）。
 *
 * 领域实现只有在谓词**能完整分解**成字段条件时才给出结果；否则 `decomposable()` 为 `false` 且没有任何条目。
 * 桥接如实转述这个判定，绝不用近似结果填充——调用方会拿它做部分更新或缓存键。
 *
 * Predicate field-filter extraction result (the framework's `predicate_field_filter`). The domain implementation yields a
 * result only when the predicate **fully decomposes** into field conditions; otherwise `decomposable()` is `false` and
 * no entries are present. The bridge relays that verdict faithfully and never fills it with an approximation, because
 * callers use it for partial updates or cache keys.
 */
export class FieldFilterReport {
    private constructor(private value: FieldFilterBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate report text. */
    static fromJson(json: string): FieldFilterReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected field filter report text");
        return invoke(() => new FieldFilterReport(wasm().FieldFilterReport.fromJson(json)));
    }
    private raw(): FieldFilterBinding {
        if (!this.value) throw new OspfError("Disposed", "field filter report has been disposed");
        return this.value;
    }
    /** 谓词能否完整分解成字段条件 / Whether the predicate decomposes fully into field conditions. */
    decomposable(): boolean { return invoke(() => this.raw().decomposable()); }
    /** 字段条目数量 / Entry count. */
    fieldCount(): number { return invoke(() => this.raw().fieldCount()); }
    /** 第 `position` 个字段名 / The field name of entry `position`. */
    fieldName(position: number): string { return invoke(() => this.raw().fieldName(position)); }
    /** 第 `position` 个字段的过滤条件 / The filter of entry `position`. */
    fieldFilter(position: number): FieldFilter {
        return invoke(() => JSON.parse(this.raw().fieldFilterJson(position)) as FieldFilter);
    }
    /** 按字段名查过滤条件；不存在返回 `undefined` / Look up a filter by field name, `undefined` when absent. */
    filterOfField(field: string): FieldFilter | undefined {
        if (typeof field !== "string" || field.length === 0) throw new OspfError("InvalidInput", "expected a field name");
        return invoke(() => {
            const json = this.raw().filterJsonOfField(field);
            return json === undefined ? undefined : (JSON.parse(json) as FieldFilter);
        });
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 一个字段的过滤条件；缺省的键表示该维度上没有约束。/ One field's filter conditions; an absent key means unconstrained. */
export interface FieldFilter {
    eq?: unknown;
    inValues?: unknown[];
    gt?: unknown;
    ge?: unknown;
    lt?: unknown;
    le?: unknown;
    isNull?: boolean;
}

/**
 * 字段赋值集合判定（对应框架层 `update_assignment`）。
 *
 * 领域实现允许同一字段被赋值多次（`then` 直接追加，语义是「后者覆盖」）。这里如实标出重复字段，
 * **不替调用方挑一个赢家**——静默选一个正是最难查的那类 bug。
 *
 * Field-assignment verdict (the framework's `update_assignment`). The domain allows the same field to be assigned more
 * than once (`then` simply appends, meaning "last one wins"). Duplicated fields are reported here and **no winner is
 * picked for the caller** — silently choosing one is exactly the kind of bug that is hardest to find.
 */
export class AssignmentReport {
    private constructor(private value: AssignmentBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): AssignmentReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected assignment report text");
        return invoke(() => new AssignmentReport(wasm().AssignmentReport.fromJson(json)));
    }
    private raw(): AssignmentBinding {
        if (!this.value) throw new OspfError("Disposed", "assignment report has been disposed");
        return this.value;
    }
    /** 是否为空集合 / Whether the set is empty. */
    isEmpty(): boolean { return invoke(() => this.raw().isEmpty()); }
    /** 赋值条目数量 / Entry count. */
    entryCount(): number { return invoke(() => this.raw().entryCount()); }
    /** 第 `position` 个赋值 / Assignment `position`. */
    entry(position: number): { path: string; kind: "value" | "null"; value?: unknown } {
        return invoke(() => {
            const [path, kind, value] = this.raw().entry(position);
            return { path, kind, value: value === null ? undefined : JSON.parse(value) };
        });
    }
    /** 被重复赋值的字段路径 / Field paths assigned more than once. */
    duplicatePaths(): string[] { return invoke(() => Array.from(this.raw().duplicatePaths())); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 排序空值支持判定（对应框架层 `sort_by` 的 `NullsOrderSupport`）。
 *
 * 注意 `nullsSupported` 回答的是「这个后端能不能表达该排序项的空值排序」，与「有没有声明」是两件事：
 * 在后端标记为 `never` 时它恒为 `false`，但没声明空值排序的项不会因此被拒。
 *
 * Sort null-ordering verdict (the framework's `NullsOrderSupport` in `sort_by`). Note that `nullsSupported` answers
 * "can this backend express null ordering for this item", which is separate from "was one declared": under a `never`
 * backend it is always `false`, yet an item without a declared null ordering is not rejected because of it.
 */
export class SortPlanReport {
    private constructor(private value: SortPlanBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): SortPlanReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected sort plan report text");
        return invoke(() => new SortPlanReport(wasm().SortPlanReport.fromJson(json)));
    }
    private raw(): SortPlanBinding {
        if (!this.value) throw new OspfError("Disposed", "sort plan report has been disposed");
        return this.value;
    }
    /** 整份计划能否被该后端接受 / Whether the whole plan is acceptable. */
    accepted(): boolean { return invoke(() => this.raw().accepted()); }
    /** 排序项数量 / Item count. */
    itemCount(): number { return invoke(() => this.raw().itemCount()); }
    /** 第 `position` 项的判定 / The verdict for item `position`. */
    item(position: number): { path: string; declaresNullsOrder: boolean; nullsSupported: boolean } {
        return invoke(() => {
            const [path, declaresNullsOrder, nullsSupported] = this.raw().item(position);
            return { path, declaresNullsOrder, nullsSupported };
        });
    }
    /** 会被后端拒绝的下标 / Indices the backend would reject. */
    rejectedIndices(): number[] { return invoke(() => Array.from(this.raw().rejectedIndices())); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 管道列表的约束组注册计划（对应框架层 `model/pipeline` 的可移植部分）。
 *
 * `Pipeline::invoke` 是调用方的业务代码（向模型加约束），无法数据化；但 `invoke_all_with_group_registration`
 * 的编排可以：按顺序对每一步，若声明了约束组就先 `ensure_constraint_group`，再 `register`，再 `invoke`。
 * 这里绑定其中的**注册序列**，所以调用方在接上真实管道之前就能看到哪些组会被注册、按什么顺序、有没有冲突。
 *
 * 一个必须知道的行为：领域实现把**任何** `ConstraintConflict` 都当成「已注册」吞掉，于是「同一 id、不同 name」
 * 会被静默接受，并永久保留**第一个**名字。这里不跟着吞，而是把 `conflictCount()` 报出来。
 *
 * Constraint-group registration plan for a pipeline list (the portable part of the framework's `model/pipeline`).
 * `Pipeline::invoke` is caller business code (it adds constraints to a model) and cannot be data-expressed, but the
 * orchestration in `invoke_all_with_group_registration` can: for each step in order, `ensure_constraint_group` when it
 * declares a group, then `register`, then `invoke`. Only the **registration sequence** is bound here, so a caller sees
 * which groups will be registered, in what order, and whether there is a conflict — before wiring real pipelines.
 *
 * One behaviour that must be known: the domain treats **any** `ConstraintConflict` as "already registered" and
 * swallows it, so "same id, different name" is silently accepted and the **first** name wins forever. This class does
 * not swallow it too; it reports it through `conflictCount()`.
 */
export class PipelinePlanReport {
    private constructor(private value: PipelinePlanBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): PipelinePlanReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected pipeline plan report text");
        return invoke(() => new PipelinePlanReport(wasm().PipelinePlanReport.fromJson(json)));
    }
    private raw(): PipelinePlanBinding {
        if (!this.value) throw new OspfError("Disposed", "pipeline plan report has been disposed");
        return this.value;
    }
    /** 步骤数量 / Step count. */
    stepCount(): number { return invoke(() => this.raw().stepCount()); }
    /** 第 `position` 步的判定 / The verdict for step `position`. */
    step(position: number): { name: string; declaresGroup: boolean; registersGroup: boolean; alreadyRegistered: boolean } {
        return invoke(() => {
            const [name, declaresGroup, registersGroup, alreadyRegistered] = this.raw().step(position);
            return { name, declaresGroup, registersGroup, alreadyRegistered };
        });
    }
    /** 真正被注册的约束组数量 / The number of groups actually registered. */
    registeredGroupCount(): number { return invoke(() => this.raw().registeredGroupCount()); }
    /** 第 `position` 个注册组 / Registered group `position`. */
    registeredGroup(position: number): { id: number; name: string } {
        return invoke(() => {
            const [id, name] = this.raw().registeredGroup(position);
            return { id, name };
        });
    }
    /** 同 id 不同名的冲突数量 / The number of id/name conflicts. */
    conflictCount(): number { return invoke(() => this.raw().conflictCount()); }
    /** 第 `position` 个冲突 / Conflict `position`. */
    conflict(position: number): { id: number; firstName: string; laterNames: string[] } {
        return invoke(() => {
            const [id, firstName, count] = this.raw().conflict(position);
            const laterNames: string[] = [];
            for (let index = 0; index < count; index++) {
                laterNames.push(this.raw().conflictLaterName(position, index));
            }
            return { id, firstName, laterNames };
        });
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * Benders 子问题单步结果（对应框架层 `linear_benders_decomposition_solver` 的 sub 侧）。
 *
 * 关键事实：**桥接不生成 cut**。没有 cut 生成上下文时框架侧 `cuts` 永远为空，而 cut 的正确形态属于机理模型
 * （调用方的业务语义）。所以这一步把**对偶值**如实交出来，由调用方用同一套 `bendersCuts` 数据形态在下一轮 master
 * 里给出——完整的 Benders 循环因此完全由 SDK 侧的数据驱动：
 *
 * ```text
 * master(cuts) → fixedColumns + 解 → sub(masterSolution) → duals → 构造 cut → master(cuts + cut) → …
 * ```
 *
 * 固定的列由**位置**决定：无 cut 上下文时框架按列下标逐项固定 `masterSolution`，所以 master 变量必须排在模型的
 * 前若干列，其余列保持自由。
 *
 * Benders subproblem step result (the sub side of the framework's `linear_benders_decomposition_solver`). Key fact:
 * the bridge **does not generate cuts**. Without a cut-generation context the framework's `cuts` is always empty, and
 * the correct cut shape belongs to the mechanism model (caller business semantics). So this step hands the **duals**
 * out faithfully, and the caller supplies them as the same `bendersCuts` data form in the next master round — the full
 * Benders loop is therefore driven entirely by SDK-side data (see the diagram above). The fixed columns are decided
 * **positionally**: without a cut context the framework fixes `masterSolution` entry-by-entry by column index, so the
 * master variables must occupy the leading columns and the rest stay free.
 */
export class BendersSubReport {
    private constructor(private value: BendersSubBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): BendersSubReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected benders sub report text");
        return invoke(() => new BendersSubReport(wasm().BendersSubReport.fromJson(json)));
    }
    private raw(): BendersSubBinding {
        if (!this.value) throw new OspfError("Disposed", "benders sub report has been disposed");
        return this.value;
    }
    /** 子问题结论 / The subproblem verdict. */
    outcome(): "feasible" | "infeasible" { return invoke(() => this.raw().outcome() as "feasible" | "infeasible"); }
    /** 内嵌统一报告文本；没有时 `undefined` / The embedded unified report text, `undefined` when absent. */
    reportJson(): string | undefined { return invoke(() => this.raw().reportJson()); }
    /** 对偶值数量 / Dual count. */
    dualCount(): number { return invoke(() => this.raw().dualCount()); }
    /** 第 `position` 个对偶值 / Dual value `position`. */
    dual(position: number): number { return invoke(() => this.raw().dual(position)); }
    /** 全部对偶值 / All dual values. */
    duals(): number[] {
        return invoke(() => {
            const values: number[] = [];
            const count = this.raw().dualCount();
            for (let position = 0; position < count; position++) values.push(this.raw().dual(position));
            return values;
        });
    }
    /** 固定住的列数 / The number of fixed columns. */
    fixedColumns(): number { return invoke(() => this.raw().fixedColumns()); }
    /** 框架产出的 cut 数量（无上下文时恒为 0）/ The framework's cut count (always 0 without a context). */
    generatedCutCount(): number { return invoke(() => this.raw().generatedCutCount()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * Logic-Based Benders 规划结果（对应框架层 `solver/logic_based_benders` 的可移植部分）。
 *
 * 这里**不**求解，只做三件完全可移植的事：校验请求（master 变量 / cuts / assumptions）、给出
 * `assumptionBindings`（CP 变量 → master 变量），以及——当调用方给了一份 master 报告时——按**稳定 ID** 提取
 * `masterAssignment`。
 *
 * 提取失败不是协议错误：它是「这份报告不足以支撑 assignment」的事实，通过 `assignmentError()` 原样交回。
 * 桥接**绝不**按下标猜一个赋值——那会让调用方拿假的 assignment 去构造 cut。我们自己的 SCIP 报告不带稳定值表，
 * 所以这条路径在实践中经常返回原因而不是赋值，这是诚实的边界，不是缺陷。
 *
 * Logic-Based Benders planning result (the portable part of the framework's `solver/logic_based_benders`). This does
 * **not** solve; it does three fully portable things: validate the request (master variables, cuts, assumptions),
 * expose `assumptionBindings` (CP variable → master variable) and, when the caller supplies a master report, extract
 * `masterAssignment` by **stable ID**. Extraction failure is not a protocol error: it is the fact that the report cannot
 * support an assignment, handed back through `assignmentError()`. The bridge **never** guesses positionally — that
 * would let a caller build a cut from a fake assignment. Our own SCIP reports carry no stable-value table, so in practice
 * this path often returns a reason instead of an assignment; that is an honest boundary, not a defect.
 */
export class LogicBasedBendersPlanReport {
    private constructor(private value: LogicBasedBendersPlanBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): LogicBasedBendersPlanReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected logic-based Benders plan text");
        return invoke(() => new LogicBasedBendersPlanReport(wasm().LogicBasedBendersPlanReport.fromJson(json)));
    }
    private raw(): LogicBasedBendersPlanBinding {
        if (!this.value) throw new OspfError("Disposed", "logic-based Benders plan has been disposed");
        return this.value;
    }
    /** 请求是否通过校验 / Whether the request validated. */
    valid(): boolean { return invoke(() => this.raw().valid()); }
    /** 初始 cut 数量 / The initial cut count. */
    cutCount(): number { return invoke(() => this.raw().cutCount()); }
    /** assumption 数量 / The assumption count. */
    assumptionCount(): number { return invoke(() => this.raw().assumptionCount()); }
    /** 绑定数量 / Binding count. */
    bindingCount(): number { return invoke(() => this.raw().bindingCount()); }
    /** 第 `position` 个绑定 / Binding `position`. */
    binding(position: number): { variable: string; masterVariable: string } {
        return invoke(() => {
            const [variable, masterVariable] = this.raw().binding(position);
            return { variable, masterVariable };
        });
    }
    /** 全部绑定 / All bindings. */
    bindings(): { variable: string; masterVariable: string }[] {
        return invoke(() => {
            const entries: { variable: string; masterVariable: string }[] = [];
            for (let position = 0; position < this.raw().bindingCount(); position++) {
                const [variable, masterVariable] = this.raw().binding(position);
                entries.push({ variable, masterVariable });
            }
            return entries;
        });
    }
    /** assignment 是否可用 / Whether an assignment is available. */
    hasAssignment(): boolean { return invoke(() => this.raw().hasAssignment()); }
    /** assignment 数量 / Assignment entry count. */
    assignmentCount(): number { return invoke(() => this.raw().assignmentCount()); }
    /** 第 `position` 个赋值项 / Assignment entry `position`. */
    assignment(position: number): { variable: string; value: number } {
        return invoke(() => {
            const [variable, value] = this.raw().assignment(position);
            return { variable, value };
        });
    }
    /** assignment 不可用的原因 / Why no assignment is available. */
    assignmentError(): string | undefined { return invoke(() => this.raw().assignmentError()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 远端工件编解码结果（批次 A：`solver/remote` 的**纯数据面**）。
 *
 * 远端求解协议里真正跨进程的是数据：DTO + JSON 往返 + 完整性校验。transport（HTTP/reqwest）不是——那是真边界。
 * 所以这里只做「线格式文本进 → 解码 + 框架完整性校验 → 规范化重编码 + 身份回显」，不需要任何后端特性。
 *
 * 一个实测事实：这份检查点 DTO 自带**整封包完整性摘要**，所以"合法但非规范"活不下来——改一个空白字节就会摘要
 * 失配被拒。因此 `canonical()` 在解码成功时恒为 `true`；它不是冗余字段，而是"重编码结果与输入一致"的持续断言。
 *
 * Remote artifact codec result (batch A: the **pure data surface** of `solver/remote`). What really crosses the process
 * boundary in the remote-solver protocol is data: DTOs, JSON round-trip and integrity validation. The transport
 * (HTTP/reqwest) is not — that is a genuine boundary. So this only does "wire text in → decode + framework integrity
 * validation → canonical re-encode + identity echo", needing no backend feature. One measured fact: this checkpoint DTO
 * carries an **envelope integrity digest**, so "valid but non-canonical" cannot survive — a single whitespace byte breaks
 * the digest and is refused. `canonical()` is therefore always `true` on a successful decode; it is not a redundant field
 * but a standing assertion that the re-encode matches the input.
 */
export class RemoteArtifactReport {
    private constructor(private value: RemoteArtifactBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): RemoteArtifactReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected remote artifact report text");
        return invoke(() => new RemoteArtifactReport(wasm().RemoteArtifactReport.fromJson(json)));
    }
    private raw(): RemoteArtifactBinding {
        if (!this.value) throw new OspfError("Disposed", "remote artifact report has been disposed");
        return this.value;
    }
    /** 工件种类 / The artifact kind. */
    kind(): "checkpointArtifact" | "constraintProgrammingResult" | "constraintProgrammingCheckpoint"
        | "logicBasedBendersCheckpoint" {
        return invoke(() => this.raw().kind() as "checkpointArtifact" | "constraintProgrammingResult"
            | "constraintProgrammingCheckpoint" | "logicBasedBendersCheckpoint");
    }
    /** 实际执行的操作 / The operation that was performed. */
    operation(): "decode" | "resume" { return invoke(() => this.raw().operation() as "decode" | "resume"); }
    /** 检查点 schema 版本 / The checkpoint schema version. */
    schemaVersion(): string { return invoke(() => this.raw().schemaVersion()); }
    /** 求解运行 ID；该种类不携带时 `undefined` / The solve run identity, `undefined` when absent. */
    runId(): string | undefined { return invoke(() => this.raw().runId()); }
    /** attempt ID；该种类不携带时 `undefined` / The attempt identity, `undefined` when absent. */
    attemptId(): string | undefined { return invoke(() => this.raw().attemptId()); }
    /** 是否携带检查点身份 / Whether the artifact carries checkpoint identity. */
    hasCheckpointIdentity(): boolean { return invoke(() => this.raw().hasCheckpointIdentity()); }
    /** 父 attempt ID；根 attempt 为 `undefined` / The parent attempt identity, `undefined` for a root attempt. */
    parentAttemptId(): string | undefined { return invoke(() => this.raw().parentAttemptId()); }
    /** 检查点迭代号；非检查点形态为 `undefined` / The checkpoint iteration, `undefined` for a non-checkpoint shape. */
    iteration(): number | undefined { return invoke(() => this.raw().iteration()); }
    /** 可移植状态字节数；非检查点形态为 `undefined` / The portable state byte count, `undefined` when absent. */
    stateBytes(): number | undefined { return invoke(() => this.raw().stateBytes()); }
    /** 状态摘要（`algorithm:value`）；非检查点形态为 `undefined` / The state digest, `undefined` when absent. */
    stateDigest(): string | undefined { return invoke(() => this.raw().stateDigest()); }
    /** 整封包摘要（`algorithm:value`）；检查点形态为 `undefined` / The envelope digest, `undefined` for checkpoints. */
    digest(): string | undefined { return invoke(() => this.raw().digest()); }
    /** 输入是否已是规范形式 / Whether the input already was canonical. */
    canonical(): boolean { return invoke(() => this.raw().canonical()); }
    /** 规范化后的线格式文本 / The canonical wire text. */
    canonicalPayload(): string { return invoke(() => this.raw().canonicalPayload()); }
    /** 输入字节数 / The input byte count. */
    byteLength(): number { return invoke(() => this.raw().byteLength()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 冲突解释的校验结论与摘要（批次 B：`core/analysis` 的 `ConflictExplanation::validate`）。
 *
 * 这是**纯领域数据校验**，不需要求解器：目标来源必须与目标一致、成员不得重复、不得把目标本身当成员、
 * `irreducible` 必须是「已验证不可达 + 至少一个阻塞成员」、`backgroundBlocking` 必须真的没有任何约束成员。
 * 校验失败是**错误**，原样带出领域原因；不会返回一个"校验未通过"的假成功。
 *
 * Conflict-explanation verification verdict and summary (batch B: `ConflictExplanation::validate` from
 * `core/analysis`). This is **pure domain-data validation** needing no solver: the target source must match the target,
 * members must not repeat, the target itself must not be a member, `irreducible` requires a verified-unreachable target
 * with at least one blocking member, and `backgroundBlocking` must really have no constraint member. A validation
 * failure is an **error** carrying the domain reason verbatim; it never returns a fake "did not validate" success.
 */
export class ConflictExplanationSummary {
    private constructor(private value: ConflictSummaryBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): ConflictExplanationSummary {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected conflict summary text");
        return invoke(() => new ConflictExplanationSummary(wasm().ConflictExplanationSummary.fromJson(json)));
    }
    private raw(): ConflictSummaryBinding {
        if (!this.value) throw new OspfError("Disposed", "conflict summary has been disposed");
        return this.value;
    }
    /** 报告 schema 版本 / The report schema version. */
    schemaVersion(): string { return invoke(() => this.raw().schemaVersion()); }
    /** 聚合结论 / The aggregate conclusion. */
    status(): "reachable" | "unreachable" | "unknown" | "unsupported" {
        return invoke(() => this.raw().status() as "reachable" | "unreachable" | "unknown" | "unsupported");
    }
    /** 有效性 / The validity. */
    validity(): "verified" | "unknown" { return invoke(() => this.raw().validity() as "verified" | "unknown"); }
    /** 最小性 / The minimality. */
    minimality(): "irreducible" | "partial" | "notChecked" {
        return invoke(() => this.raw().minimality() as "irreducible" | "partial" | "notChecked");
    }
    /** 冲突成员数 / The conflict member count. */
    memberCount(): number { return invoke(() => this.raw().memberCount()); }
    /** 约束成员数量 / The constraint-member count. */
    constraintIdCount(): number { return invoke(() => this.raw().constraintIdCount()); }
    /** 第 `position` 个约束稳定 ID / Constraint stable ID `position`. */
    constraintId(position: number): string { return invoke(() => this.raw().constraintId(position)); }
    /** 全部约束稳定 ID / All constraint stable IDs. */
    constraintIds(): string[] {
        return invoke(() => {
            const ids: string[] = [];
            for (let position = 0; position < this.raw().constraintIdCount(); position++) {
                ids.push(this.raw().constraintId(position));
            }
            return ids;
        });
    }
    /** 固定背景证据数 / The fixed-background evidence count. */
    fixedBackgroundCount(): number { return invoke(() => this.raw().fixedBackgroundCount()); }
    /** 删除复验记录数 / The deletion-verification record count. */
    verificationCount(): number { return invoke(() => this.raw().verificationCount()); }
    /** 分组条数 / The group-summary row count. */
    groupCount(): number { return invoke(() => this.raw().groupCount()); }
    /** 第 `position` 组 / Group-summary row `position`. */
    group(position: number): { group: string | undefined; count: number } {
        return invoke(() => {
            const [group, count] = this.raw().group(position);
            return { group: group ?? undefined, count };
        });
    }
    /** 全部分组 / All group-summary rows. */
    groups(): { group: string | undefined; count: number }[] {
        return invoke(() => {
            const rows: { group: string | undefined; count: number }[] = [];
            for (let position = 0; position < this.raw().groupCount(); position++) {
                const [group, count] = this.raw().group(position);
                rows.push({ group: group ?? undefined, count });
            }
            return rows;
        });
    }
    /** 真实求解次数 / The real solve count. */
    resolveCount(): number { return invoke(() => this.raw().resolveCount()); }
    /** 记忆化省下的求解次数 / The number of solves avoided by memoization. */
    memoizedChecks(): number { return invoke(() => this.raw().memoizedChecks()); }
    /** 实际使用的提取层级 / The extraction tier actually used. */
    extractionTier(): string { return invoke(() => this.raw().extractionTier()); }
    /** 阻塞是否仅来自固定背景 / Whether blocking comes only from the fixed background. */
    backgroundBlocking(): boolean { return invoke(() => this.raw().backgroundBlocking()); }
    /** 失败或部分完成的原因 / Why the analysis failed or was partial. */
    unavailableReason(): string | undefined { return invoke(() => this.raw().unavailableReason()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 候选漏斗的校验结论与短名单（批次 B：`CandidateFunnelRanking::{validate,shortlist}`）。
 *
 * 领域规则（纯数据，不需求解器）：优先级必须稠密且与稳定 ID 对齐、不得重复、分层计数必须与候选列表一致、
 * Tier A 必须「有对偶且高于阈值」、Tier B 必须「有对偶且不高于阈值」、Tier C 必须不是 active。
 *
 * 短名单也走领域自己的顺序：先强候选（A/B），名额不足时才按列表顺序补 Tier C 与未分层——所以给一个很大的
 * 上限并不等于「全部候选」，只有上限超过强候选数时后面的候选才会出现。
 *
 * Candidate-funnel verification verdict and shortlist (batch B). Domain rules (pure data, no solver): priorities must
 * be dense and aligned with stable IDs, no duplicates, tier counts must match the candidate list, tier A needs a dual
 * above the threshold, tier B a dual at or below it, and tier C must not be active. The shortlist also follows the
 * domain's own order: strong candidates (A/B) first, and only with spare room does it append tier C and unclassified ones
 * in list order — so a large limit is not the same as "every candidate".
 */
export class CandidateFunnelReport {
    private constructor(private value: CandidateFunnelBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): CandidateFunnelReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected candidate funnel report text");
        return invoke(() => new CandidateFunnelReport(wasm().CandidateFunnelReport.fromJson(json)));
    }
    private raw(): CandidateFunnelBinding {
        if (!this.value) throw new OspfError("Disposed", "candidate funnel report has been disposed");
        return this.value;
    }
    /** 报告 schema 版本 / The report schema version. */
    schemaVersion(): string { return invoke(() => this.raw().schemaVersion()); }
    /** 实际使用的对偶阈值 / The dual threshold actually used. */
    dualThreshold(): number { return invoke(() => this.raw().dualThreshold()); }
    /** 候选总数 / The candidate count. */
    candidateCount(): number { return invoke(() => this.raw().candidateCount()); }
    /** Tier A / B / C 与未分层数量 / Tier A / B / C and unclassified counts. */
    tierA(): number { return invoke(() => this.raw().tierA()); }
    tierB(): number { return invoke(() => this.raw().tierB()); }
    tierC(): number { return invoke(() => this.raw().tierC()); }
    unclassified(): number { return invoke(() => this.raw().unclassified()); }
    /** 请求的短名单上限；未请求时 `undefined` / The requested shortlist limit, `undefined` when absent. */
    shortlistLimit(): number | undefined { return invoke(() => this.raw().shortlistLimit()); }
    /** 短名单条数 / The shortlist length. */
    shortlistCount(): number { return invoke(() => this.raw().shortlistCount()); }
    /** 第 `position` 条短名单 / Shortlist entry `position`. */
    shortlistEntry(position: number): { constraintId: string; tier: "A" | "B" | "C" | "UNCLASSIFIED"; priority: number } {
        return invoke(() => {
            const [constraintId, tier, priority] = this.raw().shortlistEntry(position);
            return { constraintId, tier: tier as "A" | "B" | "C" | "UNCLASSIFIED", priority };
        });
    }
    /** 全部短名单 / The whole shortlist. */
    shortlist(): { constraintId: string; tier: "A" | "B" | "C" | "UNCLASSIFIED"; priority: number }[] {
        return invoke(() => {
            const entries: { constraintId: string; tier: "A" | "B" | "C" | "UNCLASSIFIED"; priority: number }[] = [];
            for (let position = 0; position < this.raw().shortlistCount(); position++) {
                const [constraintId, tier, priority] = this.raw().shortlistEntry(position);
                entries.push({ constraintId, tier: tier as "A" | "B" | "C" | "UNCLASSIFIED", priority });
            }
            return entries;
        });
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 有效性排序的校验结论与投影（批次 B：`EffectivenessRanking::{validate,globally_effective,locally_effective}`）。
 *
 * 两个投影**互不覆盖**，这是领域刻意设计的：`globallyEffectiveIds` 只有「已证明最大改善 > 0」的约束；
 * `locallyEffectiveIds` 只有局部结论为真的约束。**不在全局投影里不代表无关**——单独删除没有收益的约束仍
 * 可能是组合瓶颈的一部分（源码注释明确写了这一点）。所以不要把这些投影当成"重要性排名"。
 *
 * Effectiveness ranking verdict and projections (batch B). The two projections **never overwrite each other**, which is
 * deliberate in the domain: `globallyEffectiveIds` holds only constraints with a proven maximum improvement above zero,
 * and `locallyEffectiveIds` only those whose local verdict is true. **Absence from the global projection does not mean
 * irrelevance** — a constraint whose single removal shows no benefit can still be part of a combined bottleneck (the
 * source comment says so explicitly). Do not read these projections as an importance ranking.
 */
export class EffectivenessReport {
    private constructor(private value: EffectivenessBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): EffectivenessReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected effectiveness report text");
        return invoke(() => new EffectivenessReport(wasm().EffectivenessReport.fromJson(json)));
    }
    private raw(): EffectivenessBinding {
        if (!this.value) throw new OspfError("Disposed", "effectiveness report has been disposed");
        return this.value;
    }
    /** 报告 schema 版本 / The report schema version. */
    schemaVersion(): string { return invoke(() => this.raw().schemaVersion()); }
    /** baseline 目标值 / The baseline objective value. */
    baselineObjective(): number { return invoke(() => this.raw().baselineObjective()); }
    /** 条目总数 / The entry count. */
    entryCount(): number { return invoke(() => this.raw().entryCount()); }
    /** 全局有效投影条数 / The global-projection length. */
    globallyEffectiveCount(): number { return invoke(() => this.raw().globallyEffectiveCount()); }
    /** 第 `position` 个全局有效约束 ID / Globally effective ID `position`. */
    globallyEffectiveId(position: number): string { return invoke(() => this.raw().globallyEffectiveId(position)); }
    /** 全局有效投影 / The global projection. */
    globallyEffectiveIds(): string[] {
        return invoke(() => {
            const ids: string[] = [];
            for (let position = 0; position < this.raw().globallyEffectiveCount(); position++) {
                ids.push(this.raw().globallyEffectiveId(position));
            }
            return ids;
        });
    }
    /** 局部有效投影条数 / The local-projection length. */
    locallyEffectiveCount(): number { return invoke(() => this.raw().locallyEffectiveCount()); }
    /** 第 `position` 个局部有效约束 ID / Locally effective ID `position`. */
    locallyEffectiveId(position: number): string { return invoke(() => this.raw().locallyEffectiveId(position)); }
    /** 局部有效投影 / The local projection. */
    locallyEffectiveIds(): string[] {
        return invoke(() => {
            const ids: string[] = [];
            for (let position = 0; position < this.raw().locallyEffectiveCount(); position++) {
                ids.push(this.raw().locallyEffectiveId(position));
            }
            return ids;
        });
    }
    /** 明细行数 / The detail-row count. */
    rowCount(): number { return invoke(() => this.raw().rowCount()); }
    /** 第 `position` 行明细 / Detail row `position`. */
    row(position: number): { constraintId: string; tier: "A" | "B" | "C" | "UNCLASSIFIED"; status: string;
        globallyEffective: boolean; locallyEffective: boolean; maxImprovement: number | undefined } {
        return invoke(() => {
            const [constraintId, tier, status, globallyEffective, locallyEffective, maxImprovement]
                = this.raw().row(position);
            return { constraintId, tier: tier as "A" | "B" | "C" | "UNCLASSIFIED", status, globallyEffective,
                locallyEffective, maxImprovement: maxImprovement ?? undefined };
        });
    }
    /** 第 `position` 行的未形成结论原因 / The unavailable reason of row `position`. */
    rowUnavailableReason(position: number): string | undefined {
        return invoke(() => this.raw().rowUnavailableReason(position));
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 关键约束总报告的校验结论与阻塞摘要（批次 B：`CriticalConstraintAnalysisReport`）。
 *
 * 这份报告把 baseline → activity → 固定整数 LP → perturbation → target → conflict → MUS 聚合成一个结构。
 * **缺失阶段只表示为"不存在"，绝不推断为"无效"**：`hasStage(...)` 为 `false` 只说明该阶段没跑。
 * `blockingSummary()` 直接返回领域自己写的中英双语措辞——它明确区分三种情况：
 *   1. 冲突分析没跑 → "阻塞分析未执行"，而不是"没有阻塞约束"；
 *   2. 阻塞来自固定背景（变量边界/稀疏域）→ 明确说"不存在约束级最小阻塞集合"；
 *   3. 有约束级最小集合 → 给出成员数与分组。
 *
 * 两条领域红线由 `fromJson` 之前的 Rust 侧强制：报告不得携带 solver 生成物痕迹（`solver_row` 等），
 * 并且"已证明最优"必须有目标值。
 *
 * Aggregate-report verdict and blocking summary (batch B). The report aggregates baseline → activity → fixed-integer LP
 * → perturbation → target → conflict → MUS into one structure. **A missing stage is only "absent" and is never inferred
 * as "ineffective"**: `hasStage(...) === false` only means the stage did not run. `blockingSummary()` returns the domain's
 * own bilingual wording, which distinguishes three cases: the analysis did not run; the blocking comes from the fixed
 * background (so no constraint-level minimal set exists); or a constraint-level minimal set exists with a member count and
 * groups.
 */
export class CriticalAnalysisReport {
    private constructor(private value: CriticalAnalysisBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): CriticalAnalysisReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected critical analysis summary text");
        return invoke(() => new CriticalAnalysisReport(wasm().CriticalAnalysisReport.fromJson(json)));
    }
    private raw(): CriticalAnalysisBinding {
        if (!this.value) throw new OspfError("Disposed", "critical analysis summary has been disposed");
        return this.value;
    }
    /** 报告 schema 版本 / The report schema version. */
    schemaVersion(): string { return invoke(() => this.raw().schemaVersion()); }
    /** 总体结论 / The overall conclusion. */
    status(): "reachable" | "unreachable" | "unknown" | "unsupported" {
        return invoke(() => this.raw().status() as "reachable" | "unreachable" | "unknown" | "unsupported");
    }
    /** 目标身份 / The objective identity. */
    objectiveId(): string { return invoke(() => this.raw().objectiveId()); }
    /** 优化方向 / The optimization direction. */
    sense(): string { return invoke(() => this.raw().sense()); }
    /** baseline 是否已证明最优 / Whether the baseline proved optimality. */
    provenOptimal(): boolean { return invoke(() => this.raw().provenOptimal()); }
    /** 已证明的基线目标值 / The proven baseline objective value. */
    optimalValue(): number | undefined { return invoke(() => this.raw().optimalValue()); }
    /** 某阶段是否存在（`false` 只表示没跑）/ Whether a stage is present (`false` only means it did not run). */
    hasStage(stage: "activity" | "localSensitivity" | "funnel" | "effectiveness" | "target" | "conflict"): boolean {
        return invoke(() => this.raw().hasStage(stage));
    }
    /** 六个阶段的存在性快照 / A snapshot of the six stage-presence flags. */
    stages(): { activity: boolean; localSensitivity: boolean; funnel: boolean; effectiveness: boolean;
        target: boolean; conflict: boolean } {
        const stage = (name: "activity" | "localSensitivity" | "funnel" | "effectiveness" | "target" | "conflict") =>
            invoke(() => this.raw().hasStage(name));
        return { activity: stage("activity"), localSensitivity: stage("localSensitivity"), funnel: stage("funnel"),
            effectiveness: stage("effectiveness"), target: stage("target"), conflict: stage("conflict") };
    }
    /** 是否存在已证明的最小阻塞集合 / Whether a proven minimal blocking set exists. */
    hasMinimalBlockingSet(): boolean { return invoke(() => this.raw().hasMinimalBlockingSet()); }
    /** 业务可读的阻塞摘要（领域原文）/ The domain's own blocking summary. */
    blockingSummary(): string { return invoke(() => this.raw().blockingSummary()); }
    /** 约束组汇总行数 / The group-summary row count. */
    groupSummaryCount(): number { return invoke(() => this.raw().groupSummaryCount()); }
    /** 未完成阶段的原因条数 / The number of unavailable-stage reasons. */
    unavailableReasonCount(): number { return invoke(() => this.raw().unavailableReasonCount()); }
    /** 第 `position` 条未完成原因 / Unavailable reason `position`. */
    unavailableReason(position: number): string { return invoke(() => this.raw().unavailableReason(position)); }
    /** 全部未完成原因 / Every unavailable-stage reason. */
    unavailableReasons(): string[] {
        return invoke(() => {
            const reasons: string[] = [];
            for (let position = 0; position < this.raw().unavailableReasonCount(); position++) {
                reasons.push(this.raw().unavailableReason(position));
            }
            return reasons;
        });
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 从已验证冲突生成的带权松弛建议（批次 B：`correction::relaxation_recommendations_from_conflict`）。
 *
 * 这是纯函数组合：输入一份**已验证**的冲突解释 + 调用方给的业务成本，直接得到按成本升序排列的建议，不重新求解。
 *
 * 三条必须读对的语义：
 * 1. `conflictProven() === false` 时建议数为 0，**这不是错误**——未通过证明门槛（不可达 + 已验证 + 最小性已验证
 *    且非背景阻塞）的冲突本来就不该产出建议。把它当错误会诱导调用方重试或吞掉结论。
 * 2. `planIsCompleteMcs()` **恒为 `false`**：建议来自单个 conflict，不是完整模型范围的 MCS。
 * 3. `planRequiresRevalidation()` **恒为 `true`**：`relaxation` 只是建议幅度，应用后必须由调用方重建模型并重新
 *    验证 target 可达性。
 *
 * 成本表以来源的稳定 ID 为键（形如 `constraint:capacity`），省略的条目用领域默认 `1.0 / 1.0`。
 *
 * Weighted relaxation recommendations from a verified conflict (batch B). A pure-function composition: a **verified**
 * conflict plus caller-supplied business costs yields recommendations ranked by ascending cost, with no re-solve. Three
 * properties must be read correctly: `conflictProven() === false` means zero recommendations and is **not an error**;
 * `planIsCompleteMcs()` is always `false` (a single-conflict plan is never a model-wide MCS); and
 * `planRequiresRevalidation()` is always `true` (the numeric amount is a suggestion that still needs a rebuild and a
 * target re-check). The cost map is keyed by the source's stable ID (such as `constraint:capacity`); absent entries use the
 * domain default of `1.0 / 1.0`.
 */
export class RelaxationReport {
    private constructor(private value: RelaxationBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): RelaxationReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected relaxation report text");
        return invoke(() => new RelaxationReport(wasm().RelaxationReport.fromJson(json)));
    }
    private raw(): RelaxationBinding {
        if (!this.value) throw new OspfError("Disposed", "relaxation report has been disposed");
        return this.value;
    }
    /** 建议条数 / The number of recommendations. */
    planCount(): number { return invoke(() => this.raw().planCount()); }
    /** 冲突是否通过了建议生成的全部证明门槛 / Whether the conflict passed every proof gate. */
    conflictProven(): boolean { return invoke(() => this.raw().conflictProven()); }
    /** 第 `position` 条建议的名次 / The rank of recommendation `position`. */
    planRank(position: number): number { return invoke(() => this.raw().planRank(position)); }
    /** 第 `position` 条建议的带权成本 / The weighted cost of recommendation `position`. */
    planTotalCost(position: number): number { return invoke(() => this.raw().planTotalCost(position)); }
    /** 第 `position` 条建议是否已验证删除最小性 / Whether deletion minimality was verified. */
    planMinimal(position: number): boolean { return invoke(() => this.raw().planMinimal(position)); }
    /** 第 `position` 条建议是否完整模型范围 MCS（恒 `false`）/ Whether it is a model-wide MCS (always `false`). */
    planIsCompleteMcs(position: number): boolean { return invoke(() => this.raw().planIsCompleteMcs(position)); }
    /** 第 `position` 条建议是否仍需复验（恒 `true`）/ Whether it still needs revalidation (always `true`). */
    planRequiresRevalidation(position: number): boolean {
        return invoke(() => this.raw().planRequiresRevalidation(position));
    }
    /** 第 `position` 条建议的来源数量 / The member count of recommendation `position`. */
    planMemberCount(position: number): number { return invoke(() => this.raw().planMemberCount(position)); }
    /** 第 `position` 条建议第 `index` 个来源 / Member `index` of recommendation `position`. */
    planMember(position: number, index: number): { source: string; weight: number; relaxation: number } {
        return invoke(() => {
            const [source, weight, relaxation] = this.raw().planMember(position, index);
            return { source, weight, relaxation };
        });
    }
    /** 第 `position` 条建议的全部来源 / Every member of recommendation `position`. */
    planMembers(position: number): { source: string; weight: number; relaxation: number }[] {
        return invoke(() => {
            const members: { source: string; weight: number; relaxation: number }[] = [];
            for (let index = 0; index < this.raw().planMemberCount(position); index++) {
                const [source, weight, relaxation] = this.raw().planMember(position, index);
                members.push({ source, weight, relaxation });
            }
            return members;
        });
    }
    /** 第 `position` 条建议关联 target 的 `{ objectiveId, relation, value }` / The associated target. */
    planTarget(position: number): { objectiveId: string; relation: string; value: number } {
        return invoke(() => {
            const [objectiveId, relation, value] = this.raw().planTarget(position);
            return { objectiveId, relation, value };
        });
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * 固定整数 LP 局部灵敏度的配置与报告（批次 B：`fixed_integer` 的配置校验 + 报告校验/投影）。
 *
 * 语义要点：
 * 1. 省略配置时用**领域默认容差**（`1e-7` / `1e-9`），不是 SDK 自己编的默认值；
 * 2. `hasDuals()` 只问"有没有对偶"，**不看对偶是否为 0**——`0.0` 的对偶依然算"有"，
 *    所以"有对偶"绝不等于"约束有效"；
 * 3. `duplicateConstraintIds()` 列出重复的约束 ID：领域校验**放行**重复 ID，而按 ID 查表只会拿到第一条，
 *    桥接把这件事变成可见数据而不是替你决定对错。
 *
 * Fixed-integer LP local sensitivity config and report (batch B). Three things to read correctly: an absent config uses the
 * **domain** default tolerances (`1e-7` / `1e-9`), not SDK-invented ones; `hasDuals()` only asks whether a dual exists and
 * **ignores whether it is zero**, so a `0.0` dual still counts and "has duals" never means "constraint is effective"; and
 * `duplicateConstraintIds()` lists repeated constraint IDs, because domain validation **allows** them while a lookup by ID
 * only returns the first — the bridge surfaces that instead of deciding for you.
 */
export class FixedIntegerLpReport {
    private constructor(private value: FixedIntegerBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): FixedIntegerLpReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected fixed-integer report text");
        return invoke(() => new FixedIntegerLpReport(wasm().FixedIntegerLpReport.fromJson(json)));
    }
    private raw(): FixedIntegerBinding {
        if (!this.value) throw new OspfError("Disposed", "fixed-integer report has been disposed");
        return this.value;
    }
    /** 实际生效的整数性容差 / The integrality tolerance in effect. */
    integralityTolerance(): number { return invoke(() => this.raw().integralityTolerance()); }
    /** 实际生效的对偶容差 / The dual tolerance in effect. */
    dualTolerance(): number { return invoke(() => this.raw().dualTolerance()); }
    /** 是否带上了报告 / Whether a report was supplied. */
    hasReport(): boolean { return invoke(() => this.raw().hasReport()); }
    /** 报告 schema 版本 / The report schema version. */
    schemaVersion(): string | undefined { return invoke(() => this.raw().schemaVersion()); }
    /** 灵敏度范围 / The sensitivity scope. */
    scope(): string | undefined { return invoke(() => this.raw().scope()); }
    /** baseline 目标值 / The baseline objective value. */
    baselineObjective(): number | undefined { return invoke(() => this.raw().baselineObjective()); }
    /** 固定整数 LP 目标值 / The fixed-integer LP objective value. */
    lpObjective(): number | undefined { return invoke(() => this.raw().lpObjective()); }
    /** 固定整数变量数量 / The number of fixed integer variables. */
    fixedIntegerCount(): number | undefined { return invoke(() => this.raw().fixedIntegerCount()); }
    /** 整体分析状态 / The overall analysis status. */
    status(): "reachable" | "unreachable" | "unknown" | "unsupported" | undefined {
        return invoke(() => this.raw().status() as "reachable" | "unreachable" | "unknown" | "unsupported" | undefined);
    }
    /** 是否至少有一个可用对偶（不看对偶是否为 0）/ Whether at least one dual exists (zero counts). */
    hasDuals(): boolean { return invoke(() => this.raw().hasDuals()); }
    /** 约束记录数 / The constraint-record count. */
    rowCount(): number { return invoke(() => this.raw().rowCount()); }
    /** 第 `position` 行 / Row `position`. */
    row(position: number): { constraintId: string; status: string; scope: string; hasDual: boolean;
        dualValue: number | undefined; localEffective: boolean | undefined } {
        return invoke(() => {
            const [constraintId, status, scope, hasDual, dualValue, localEffective] = this.raw().row(position);
            return { constraintId, status, scope, hasDual, dualValue: dualValue ?? undefined,
                localEffective: localEffective ?? undefined };
        });
    }
    /** 全部行 / Every row. */
    rows(): { constraintId: string; status: string; scope: string; hasDual: boolean;
        dualValue: number | undefined; localEffective: boolean | undefined }[] {
        return invoke(() => {
            const rows: { constraintId: string; status: string; scope: string; hasDual: boolean;
                dualValue: number | undefined; localEffective: boolean | undefined }[] = [];
            for (let position = 0; position < this.raw().rowCount(); position++) {
                const [constraintId, status, scope, hasDual, dualValue, localEffective] = this.raw().row(position);
                rows.push({ constraintId, status, scope, hasDual, dualValue: dualValue ?? undefined,
                    localEffective: localEffective ?? undefined });
            }
            return rows;
        });
    }
    /** 第 `position` 行是否携带活动性证据 / Whether row `position` carries activity evidence. */
    rowHasActivity(position: number): boolean { return invoke(() => this.raw().rowHasActivity(position)); }
    /** 重复约束 ID 数量 / The number of duplicate constraint identities. */
    duplicateConstraintIdCount(): number { return invoke(() => this.raw().duplicateConstraintIdCount()); }
    /** 第 `position` 个重复约束 ID / Duplicate constraint identity `position`. */
    duplicateConstraintId(position: number): string { return invoke(() => this.raw().duplicateConstraintId(position)); }
    /** 全部重复约束 ID / Every duplicate constraint identity. */
    duplicateConstraintIds(): string[] {
        return invoke(() => {
            const ids: string[] = [];
            for (let position = 0; position < this.raw().duplicateConstraintIdCount(); position++) {
                ids.push(this.raw().duplicateConstraintId(position));
            }
            return ids;
        });
    }
    /** 失败或降级原因 / The failure or downgrade reason. */
    unavailableReason(): string | undefined { return invoke(() => this.raw().unavailableReason()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/**
 * RHS 扰动策略与报告（批次 B：`ConstraintPerturbationPolicy` + `ConstraintPerturbationReport`）。
 *
 * 最容易被误读的一条是**互斥**：显式 `deltas` 与 `adaptive` **必须恰有其一**。两边都给、两边都不给都是错误，
 * 而不是"优先用某个"。（领域两个构造器会各自清空另一半，所以歧义必须在这里就被拒绝，不能靠构造器兜。）
 *
 * 未指定的字段用**领域默认值**：`maxSolves = 32`、`objectiveTolerance = 1e-7`、无时间预算。
 *
 * RHS perturbation policy and report (batch B). The easiest rule to misread is the **exclusivity**: explicit `deltas`
 * and `adaptive` must be exactly one of the two; supplying both or neither is an error, not a silent preference. (Both
 * domain constructors clear the other half, so the ambiguity has to be refused here rather than left to them.)
 * Unspecified fields use the **domain** defaults: 32 solves, a `1e-7` tolerance and no time budget.
 */
export class PerturbationVerification {
    private constructor(private value: PerturbationBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): PerturbationVerification {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected perturbation verification text");
        return invoke(() => new PerturbationVerification(wasm().PerturbationVerification.fromJson(json)));
    }
    private raw(): PerturbationBinding {
        if (!this.value) throw new OspfError("Disposed", "perturbation verification has been disposed");
        return this.value;
    }
    /** 归一化后的模式 / The normalized mode. */
    mode(): "explicit" | "adaptive" { return invoke(() => this.raw().mode() as "explicit" | "adaptive"); }
    /** 显式 delta 条数 / The explicit delta count. */
    deltaCount(): number { return invoke(() => this.raw().deltaCount()); }
    /** 第 `position` 个显式 delta / Explicit delta `position`. */
    delta(position: number): number { return invoke(() => this.raw().delta(position)); }
    /** 全部显式 delta / Every explicit delta. */
    deltas(): number[] {
        return invoke(() => {
            const deltas: number[] = [];
            for (let position = 0; position < this.raw().deltaCount(); position++) {
                deltas.push(this.raw().delta(position));
            }
            return deltas;
        });
    }
    /** 是否执行删除重优化 / Whether the removal reoptimization runs. */
    removalTest(): boolean { return invoke(() => this.raw().removalTest()); }
    /** 实际生效的最大求解次数 / The maximum solve count in effect. */
    maxSolves(): number { return invoke(() => this.raw().maxSolves()); }
    /** 实际生效的时间预算（毫秒）/ The time budget in effect, in milliseconds. */
    timeBudgetMs(): number | undefined {
        // 绑定层的 `u64` 出来是 `bigint`，SDK 统一用 `number` 暴露（毫秒级别不会超出安全整数）。
        // The binding surfaces a `u64` as `bigint`; the SDK exposes `number` (milliseconds never exceed the safe range).
        return invoke(() => {
            const milliseconds = this.raw().timeBudgetMs();
            return milliseconds === undefined ? undefined : Number(milliseconds);
        });
    }
    /** 实际生效的目标改善容差 / The objective-improvement tolerance in effect. */
    objectiveTolerance(): number { return invoke(() => this.raw().objectiveTolerance()); }
    /** 自适应配置 / The adaptive config. */
    adaptiveConfig(): { initialDelta: number; growthFactor: number; maxDelta: number;
        refineThreshold: boolean; refinementTolerance: number } | undefined {
        return invoke(() => {
            const config = this.raw().adaptiveConfig();
            if (!config) return undefined;
            const [initialDelta, growthFactor, maxDelta, refineThreshold, refinementTolerance] = config;
            return { initialDelta, growthFactor, maxDelta, refineThreshold, refinementTolerance };
        });
    }
    /** 是否带报告摘要 / Whether a report summary is present. */
    hasReport(): boolean { return invoke(() => this.raw().hasReport()); }
    /** 报告的约束稳定 ID / The report's stable constraint ID. */
    reportConstraintId(): string | undefined { return invoke(() => this.raw().reportConstraintId()); }
    /** 报告的 baseline 目标值 / The report's baseline objective value. */
    reportBaselineObjective(): number | undefined { return invoke(() => this.raw().reportBaselineObjective()); }
    /** 报告的总体状态 / The report's overall status. */
    reportStatus(): "reachable" | "unreachable" | "unknown" | "unsupported" | undefined {
        return invoke(() => this.raw().reportStatus() as "reachable" | "unreachable" | "unknown" | "unsupported" | undefined);
    }
    /** 报告的求解次数 / The report's solve count. */
    reportSolveCount(): number | undefined { return invoke(() => this.raw().reportSolveCount()); }
    /** 报告的观察条数 / The report's observation count. */
    reportObservationCount(): number | undefined { return invoke(() => this.raw().reportObservationCount()); }
    /** 第 `position` 条观察 / Observation `position`. */
    reportObservation(position: number): { delta: number; perturbedRhs: number; status: string;
        objective: number | undefined; improvement: number | undefined; improved: boolean | undefined;
        objectiveProven: boolean } {
        return invoke(() => {
            const [delta, perturbedRhs, status, objective, improvement, improved, objectiveProven]
                = this.raw().reportObservation(position);
            return { delta, perturbedRhs, status, objective: objective ?? undefined,
                improvement: improvement ?? undefined, improved: improved ?? undefined, objectiveProven };
        });
    }
    /** 全部观察 / Every observation. */
    reportObservations(): { delta: number; perturbedRhs: number; status: string; objective: number | undefined;
        improvement: number | undefined; improved: boolean | undefined; objectiveProven: boolean }[] {
        return invoke(() => {
            const rows: { delta: number; perturbedRhs: number; status: string; objective: number | undefined;
                improvement: number | undefined; improved: boolean | undefined; objectiveProven: boolean }[] = [];
            const count = this.raw().reportObservationCount() ?? 0;
            for (let position = 0; position < count; position++) {
                const [delta, perturbedRhs, status, objective, improvement, improved, objectiveProven]
                    = this.raw().reportObservation(position);
                rows.push({ delta, perturbedRhs, status, objective: objective ?? undefined,
                    improvement: improvement ?? undefined, improved: improved ?? undefined, objectiveProven });
            }
            return rows;
        });
    }
    /** 是否观察到已证明的目标改善 / Whether a proven improvement was observed. */
    reportHasGlobalImprovement(): boolean | undefined {
        return invoke(() => this.raw().reportHasGlobalImprovement());
    }
    /** 是否有删除观察 / Whether a removal observation is present. */
    reportHasRemoval(): boolean | undefined { return invoke(() => this.raw().reportHasRemoval()); }
    /** 删除是否被证明有效 / Whether removal is proven effective. */
    reportRemovalEffective(): boolean | undefined { return invoke(() => this.raw().reportRemovalEffective()); }
    /** 自适应结论的 `kind` / The adaptive outcome `kind`. */
    reportAdaptiveOutcome(): string | undefined { return invoke(() => this.raw().reportAdaptiveOutcome()); }
    /** 最后一次观察的下标 / The index of the last observation. */
    reportLastObservationIndex(): number | undefined {
        return invoke(() => this.raw().reportLastObservationIndex());
    }
    /** 未形成结论的原因 / Why no complete conclusion was formed. */
    reportUnavailableReason(): string | undefined { return invoke(() => this.raw().reportUnavailableReason()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 目标构造方式：绝对边界。 / How to build the target: an absolute bound. */
export interface AbsoluteTargetSpec {
    mode: "absolute";
    objectiveId: string;
    relation: "atLeast" | "atMost";
    value: number;
}
/** 目标构造方式：相对变化 `baseline × (1 + fraction)`。 / A relative change. */
export interface RelativeTargetSpec {
    mode: "relative";
    objectiveId: string;
    relation: "atLeast" | "atMost";
    baseline: number;
    /** `0.05` 表示 5%。 / `0.05` means 5%. */
    fraction: number;
}
/** 目标构造方式：业务单位增量 `baseline + delta`。 / A business-unit delta. */
export interface BusinessUnitTargetSpec {
    mode: "businessUnit";
    objectiveId: string;
    relation: "atLeast" | "atMost";
    baseline: number;
    delta: number;
}
/** 目标构造方式的联合类型 / The target-spec union. */
export type TargetSpec = AbsoluteTargetSpec | RelativeTargetSpec | BusinessUnitTargetSpec;

/**
 * 目标构造与可行性报告（批次 B：`target` 的六种构造器 + `exact_integer_bound` + `TargetFeasibilityReport`）。
 *
 * **本层存在的核心理由**：精确整数边界的规则很容易在 TS 里搬错——
 * `atLeast` 对目标值取 **ceil**、`atMost` 取 **floor**；超出 i64 范围时**没有**整数边界（返回 `undefined`，
 * 这不是错误，而是"无法用整数精确表示"）。负值同样按此规则：`-4.2` 上取整是 `-4`、`-4.8` 下取整是 `-5`。
 *
 * 三种构造模式都在领域里折算成一个绝对目标值：`relative` 是 `baseline × (1 + fraction)`，
 * `businessUnit` 是 `baseline + delta`。
 *
 * **为什么这层必须跨线**：把那三条规则（ceil/floor、i64 范围、三值可达性）搬进 TypeScript 是最容易搬错的
 * 一件事，所以这里直接复用领域实现。
 *
 * Target construction and feasibility (batch B). The reason this layer exists: the exact integer-bound rules are easy to
 * get wrong in TypeScript — `atLeast` **ceils** the target value and `atMost` **floors** it, and beyond the i64 range
 * there is **no** integer bound (`undefined`, which is not an error but means "not exactly representable"). Negatives
 * follow the same rules: `-4.2` ceils to `-4` and `-4.8` floors to `-5`. All three construction modes fold into an
 * absolute value (`baseline × (1 + fraction)` or `baseline + delta`).
 */
export class TargetVerification {
    private constructor(private binding: TargetBinding | undefined) {}
    /** 构造目标并（可选）校验一份可行性报告 / Build a target and optionally verify a feasibility report. */
    static fromJson(json: string): TargetVerification {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected target verification text");
        return invoke(() => new TargetVerification(wasm().TargetVerification.fromJson(json)));
    }
    private raw(): TargetBinding {
        if (!this.binding) throw new OspfError("Disposed", "target verification has been disposed");
        return this.binding;
    }
    /** 目标身份 / The objective identity. */
    objectiveId(): string { return invoke(() => this.raw().objectiveId()); }
    /** 方向 / The direction. */
    relation(): "AtLeast" | "AtMost" { return invoke(() => this.raw().relation() as "AtLeast" | "AtMost"); }
    /** 归一化后的绝对目标值 / The normalized absolute target value. */
    value(): number { return invoke(() => this.raw().value()); }
    /** 稳定 target 身份 / The stable target identity. */
    stableId(): string { return invoke(() => this.raw().stableId()); }
    /** 插入 CP 模型时使用的稳定约束 ID / The stable constraint ID used when inserting into a CP model. */
    constraintId(): string { return invoke(() => this.raw().constraintId()); }
    /** 精确整数边界（超范围为空）/ The exact integer bound (absent when out of range). */
    exactIntegerBound(): number | undefined {
        // 绑定层的 `i64` 出来是 `bigint`，SDK 统一用 `number` 暴露（超出安全整数范围时这里会失真，
        // 但领域在那种情况下本来就不给整数边界）。
        // The binding surfaces an `i64` as `bigint`; the SDK exposes `number`. Values beyond the safe integer range would
        // lose precision here, but the domain does not produce such bounds anyway.
        return invoke(() => {
            const bound = this.raw().exactIntegerBound();
            return bound === undefined ? undefined : Number(bound);
        });
    }
    /** 是否带报告摘要 / Whether a report summary is present. */
    hasReport(): boolean { return invoke(() => this.raw().hasReport()); }
    /** 报告的 schema 版本 / The report's schema version. */
    reportSchemaVersion(): string | undefined { return invoke(() => this.raw().reportSchemaVersion()); }
    /** 报告的结论状态 / The report's conclusion status. */
    reportStatus(): "reachable" | "unreachable" | "unknown" | "unsupported" | undefined {
        return invoke(() => this.raw().reportStatus() as "reachable" | "unreachable" | "unknown" | "unsupported" | undefined);
    }
    /** 三值可达性（未知为 `undefined`，注意与 `false` 区分）/ Ternary reachability (`undefined` is not `false`). */
    reportReachable(): boolean | undefined { return invoke(() => this.raw().reportReachable()); }
    /** 是否有证明 / Whether the conclusion is proven. */
    reportIsProven(): boolean | undefined { return invoke(() => this.raw().reportIsProven()); }
    /** 报告中记录的实际整数边界 / The integer bound recorded in the report. */
    reportEffectiveIntegerBound(): number | undefined {
        return invoke(() => {
            const bound = this.raw().reportEffectiveIntegerBound();
            return bound === undefined ? undefined : Number(bound);
        });
    }
    /** 是否带见证解 / Whether a witness solution is attached. */
    reportHasSolution(): boolean | undefined { return invoke(() => this.raw().reportHasSolution()); }
    /** 浮点兼容目标值 / The floating-point compatibility objective value. */
    reportObjectiveValue(): number | undefined { return invoke(() => this.raw().reportObjectiveValue()); }
    /** 精确目标值 / The exact objective value. */
    reportExactObjective(): number | undefined {
        return invoke(() => {
            const objective = this.raw().reportExactObjective();
            return objective === undefined ? undefined : Number(objective);
        });
    }
    /** 后端证明状态 / The backend proof status. */
    reportProofStatus(): "none" | "claimed" | "verified" | undefined {
        return invoke(() => this.raw().reportProofStatus() as "none" | "claimed" | "verified" | undefined);
    }
    /** 是否确实插入了 target 约束 / Whether a target constraint was actually inserted. */
    reportTargetFixed(): boolean | undefined { return invoke(() => this.raw().reportTargetFixed()); }
    /** 报告自带的 target 来源稳定 ID / The report's own target-source stable ID. */
    reportTargetSourceId(): string | undefined { return invoke(() => this.raw().reportTargetSourceId()); }
    /** 面向诊断的详情 / The diagnostic detail. */
    reportMessage(): string | undefined { return invoke(() => this.raw().reportMessage()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.binding?.free(); this.binding = undefined; }
}

/**
 * 多目标报告与跨目标 criticality（批次 B：`MultiTargetAnalysisReport` 的跨目标重算核对）。
 *
 * 这层不只做字段自洽，而是**把跨目标结论重算一遍再比对**：各结果的 target 身份必须与自己的可行性 / 冲突 /
 * 改进方案一致；没有已验证冲突就不许带建议；`criticalityProfile` 的观察与分类必须能由结果精确重建。
 *
 * 分类规则（领域实现，已跨线）：
 * - 某约束出现在**恰好一个**不可达目标里 → `LOCAL_BOTTLENECK`；
 * - 出现在**多于一个**里 → `PERSISTENT_BOTTLENECK`；
 * - 在所有（多于一个）不可达目标里都出现 → `STRUCTURAL_BOTTLENECK`。
 * 所以同一个约束可以**同时**属于持久与结构两类 —— 不要把三个集合当成互斥的分区。
 *
 * 注意 `resultReachable()` 是三值：`false` 与 `undefined` 不同，未知不能读成不可达。
 *
 * Multi-target report and cross-target criticality (batch B). This layer does not merely check field consistency, it
 * **recomputes the cross-target conclusions and compares**. Classification rules (domain-implemented, now across the
 * wire): a constraint in exactly one unreachable target is `LOCAL_BOTTLENECK`, in more than one is
 * `PERSISTENT_BOTTLENECK`, and in all (more than one) unreachable targets is `STRUCTURAL_BOTTLENECK`. The same constraint
 * can therefore belong to both persistent and structural — do not read the three sets as a mutually exclusive partition.
 * `resultReachable()` is ternary: `false` is not `undefined`, and "unknown" must never be read as unreachable.
 */
export class MultiTargetReportSummary {
    private constructor(private state: MultiTargetBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): MultiTargetReportSummary {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected multi-target summary text");
        return invoke(() => new MultiTargetReportSummary(wasm().MultiTargetReportSummary.fromJson(json)));
    }
    private raw(): MultiTargetBinding {
        if (!this.state) throw new OspfError("Disposed", "multi-target summary has been disposed");
        return this.state;
    }
    /** 报告 schema 版本 / The report schema version. */
    schemaVersion(): string { return invoke(() => this.raw().schemaVersion()); }
    /** 结果条数 / The result count. */
    resultCount(): number { return invoke(() => this.raw().resultCount()); }
    /** 含已验证冲突的结果数 / The number of results with a verified conflict. */
    verifiedConflictCount(): number { return invoke(() => this.raw().verifiedConflictCount()); }
    /** 全部改进方案数 / The total improvement-plan count. */
    planCount(): number { return invoke(() => this.raw().planCount()); }
    /** 已证明不可达的目标数 / The number of proven-unreachable targets. */
    provenTargetCount(): number { return invoke(() => this.raw().provenTargetCount()); }
    /** 被至少一个已验证冲突点名的约束数 / The number of constraints named by at least one verified conflict. */
    classifiedConstraintCount(): number { return invoke(() => this.raw().classifiedConstraintCount()); }
    /** 第 `position` 个结果的目标身份 / The objective identity of result `position`. */
    resultObjectiveId(position: number): string { return invoke(() => this.raw().resultObjectiveId(position)); }
    /** 第 `position` 个结果的方向 / The direction of result `position`. */
    resultRelation(position: number): "AtLeast" | "AtMost" {
        return invoke(() => this.raw().resultRelation(position) as "AtLeast" | "AtMost");
    }
    /** 第 `position` 个结果的目标值 / The target value of result `position`. */
    resultValue(position: number): number { return invoke(() => this.raw().resultValue(position)); }
    /** 第 `position` 个结果的稳定 target 身份 / The stable target identity of result `position`. */
    resultStableId(position: number): string { return invoke(() => this.raw().resultStableId(position)); }
    /** 第 `position` 个结果的可行性状态 / The feasibility status of result `position`. */
    resultStatus(position: number): "reachable" | "unreachable" | "unknown" | "unsupported" {
        return invoke(() => this.raw().resultStatus(position) as "reachable" | "unreachable" | "unknown" | "unsupported");
    }
    /** 第 `position` 个结果的三值可达性 / The ternary reachability of result `position`. */
    resultReachable(position: number): boolean | undefined {
        return invoke(() => this.raw().resultReachable(position));
    }
    /** 第 `position` 个结果是否含已验证冲突 / Whether result `position` has a verified conflict. */
    resultHasVerifiedConflict(position: number): boolean {
        return invoke(() => this.raw().resultHasVerifiedConflict(position));
    }
    /** 第 `position` 个结果的阻塞约束数量 / The blocking-constraint count of result `position`. */
    resultBlockingConstraintCount(position: number): number {
        return invoke(() => this.raw().resultBlockingConstraintCount(position));
    }
    /** 第 `position` 个结果第 `index` 个阻塞约束 / Blocking constraint `index` of result `position`. */
    resultBlockingConstraint(position: number, index: number): string {
        return invoke(() => this.raw().resultBlockingConstraint(position, index));
    }
    /** 第 `position` 个结果的阻塞约束 ID 列表 / The blocking IDs of result `position`. */
    resultBlockingConstraintIds(position: number): string[] {
        return invoke(() => {
            const ids: string[] = [];
            for (let index = 0; index < this.raw().resultBlockingConstraintCount(position); index++) {
                ids.push(this.raw().resultBlockingConstraint(position, index));
            }
            return ids;
        });
    }
    /** 第 `position` 个结果的建议数 / The correction-set count of result `position`. */
    resultCorrectionSetCount(position: number): number {
        return invoke(() => this.raw().resultCorrectionSetCount(position));
    }
    /** 第 `position` 个结果的改进方案数 / The improvement-plan count of result `position`. */
    resultPlanCount(position: number): number { return invoke(() => this.raw().resultPlanCount(position)); }
    /** 第 `position` 个结果最便宜建议的带权成本 / The cheapest recommendation's cost of result `position`. */
    resultCheapestPlanCost(position: number): number | undefined {
        return invoke(() => this.raw().resultCheapestPlanCost(position));
    }
    /** 类别名：`0` 局部、`1` 持续、`2` 结构 / The kind name: 0 local, 1 persistent, 2 structural. */
    bottleneckKind(position: number): "LOCAL_BOTTLENECK" | "PERSISTENT_BOTTLENECK" | "STRUCTURAL_BOTTLENECK" {
        return invoke(() => this.raw().bottleneckKind(position) as
            "LOCAL_BOTTLENECK" | "PERSISTENT_BOTTLENECK" | "STRUCTURAL_BOTTLENECK");
    }
    /** 第 `position` 类瓶颈的约束数 / The constraint count of bottleneck kind `position`. */
    bottleneckCount(position: number): number { return invoke(() => this.raw().bottleneckCount(position)); }
    /** 第 `position` 类瓶颈第 `index` 个约束 / Constraint `index` of bottleneck kind `position`. */
    bottleneckConstraint(position: number, index: number): string {
        return invoke(() => this.raw().bottleneckConstraint(position, index));
    }
    /** 第 `position` 类瓶颈的约束 ID 列表 / The constraint IDs of bottleneck kind `position`. */
    bottleneckConstraintIds(position: number): string[] {
        return invoke(() => {
            const ids: string[] = [];
            for (let index = 0; index < this.raw().bottleneckCount(position); index++) {
                ids.push(this.raw().bottleneckConstraint(position, index));
            }
            return ids;
        });
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条 criticality 观察输入。 / One criticality observation input. */
export interface CriticalityObservationInput {
    objectiveId: string;
    relation: "atLeast" | "atMost";
    value: number;
    status: "reachable" | "unreachable" | "unknown" | "unsupported";
    /** 只有 `status === "unreachable"` 的观察，其 ID 才参与分类。 / Only `unreachable` observations' IDs classify. */
    blockingConstraintIds: string[];
}

/**
 * criticality profile 的独立构造与校验（批次 B：`build_criticality_profile`）。
 *
 * 两条必须读对的语义：
 * 1. **只有 `unreachable` 的观察参与分类**。一条 `reachable` 观察即使带着阻塞约束 ID，也不会出现在任何类别里
 *    ——`observationContributes(i)` 为 `false` 就说明它被忽略了，"我给了 ID"不等于"它被分类了"。
 * 2. **结构瓶颈要求不可达目标多于一个**。只有一个不可达目标时，其中的约束只是局部瓶颈，不会被升格为结构瓶颈。
 *
 * 三类瓶颈**可以重叠**：同一个约束可以既是持久瓶颈又是结构瓶颈。不要当成互斥分区读。
 *
 * Standalone criticality profile build and verification (batch B). Two semantics to read correctly: **only `unreachable`
 * observations take part in classification** (a `reachable` observation with blocking IDs appears in no kind at all, so
 * `observationContributes(i) === false` means it was ignored), and a **structural** bottleneck requires more than one
 * unreachable target (with a single one its constraints stay local). The three kinds **may overlap**: one constraint can be
 * both persistent and structural. Do not read them as a mutually exclusive partition.
 */
export class CriticalityProfileReport {
    private constructor(private state: CriticalityBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): CriticalityProfileReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected criticality report text");
        return invoke(() => new CriticalityProfileReport(wasm().CriticalityProfileReport.fromJson(json)));
    }
    private raw(): CriticalityBinding {
        if (!this.state) throw new OspfError("Disposed", "criticality report has been disposed");
        return this.state;
    }
    /** profile schema 版本 / The profile schema version. */
    schemaVersion(): string { return invoke(() => this.raw().schemaVersion()); }
    /** 观察条数 / The observation count. */
    observationCount(): number { return invoke(() => this.raw().observationCount()); }
    /** 已证明不可达的目标数 / The number of proven-unreachable targets. */
    provenTargetCount(): number { return invoke(() => this.raw().provenTargetCount()); }
    /** 被分类的约束数 / The number of classified constraints. */
    classifiedConstraintCount(): number { return invoke(() => this.raw().classifiedConstraintCount()); }
    /** 第 `position` 条观察的目标身份 / The objective identity of observation `position`. */
    observationObjectiveId(position: number): string {
        return invoke(() => this.raw().observationObjectiveId(position));
    }
    /** 第 `position` 条观察的方向 / The direction of observation `position`. */
    observationRelation(position: number): "AtLeast" | "AtMost" {
        return invoke(() => this.raw().observationRelation(position) as "AtLeast" | "AtMost");
    }
    /** 第 `position` 条观察的目标值 / The target value of observation `position`. */
    observationValue(position: number): number { return invoke(() => this.raw().observationValue(position)); }
    /** 第 `position` 条观察的稳定 target 身份 / The stable target identity of observation `position`. */
    observationStableId(position: number): string {
        return invoke(() => this.raw().observationStableId(position));
    }
    /** 第 `position` 条观察的状态 / The status of observation `position`. */
    observationStatus(position: number): "reachable" | "unreachable" | "unknown" | "unsupported" {
        return invoke(() => this.raw().observationStatus(position) as
            "reachable" | "unreachable" | "unknown" | "unsupported");
    }
    /** 第 `position` 条观察是否参与分类（`false` 表示它的 ID 被忽略了）。
     *  Whether observation `position` takes part in classification (`false` means its IDs were ignored). */
    observationContributes(position: number): boolean {
        return invoke(() => this.raw().observationContributes(position));
    }
    /** 第 `position` 条观察的阻塞约束数 / The blocking-constraint count of observation `position`. */
    observationBlockingCount(position: number): number {
        return invoke(() => this.raw().observationBlockingCount(position));
    }
    /** 第 `position` 条观察第 `index` 个阻塞约束 / Blocking constraint `index` of observation `position`. */
    observationBlockingConstraint(position: number, index: number): string {
        return invoke(() => this.raw().observationBlockingConstraint(position, index));
    }
    /** 第 `position` 条观察的阻塞约束 ID 列表 / The blocking IDs of observation `position`. */
    observationBlockingConstraintIds(position: number): string[] {
        return invoke(() => {
            const ids: string[] = [];
            for (let index = 0; index < this.raw().observationBlockingCount(position); index++) {
                ids.push(this.raw().observationBlockingConstraint(position, index));
            }
            return ids;
        });
    }
    /** 类别名：`0` 局部、`1` 持续、`2` 结构 / The kind name: 0 local, 1 persistent, 2 structural. */
    bottleneckKind(position: number): "LOCAL_BOTTLENECK" | "PERSISTENT_BOTTLENECK" | "STRUCTURAL_BOTTLENECK" {
        return invoke(() => this.raw().bottleneckKind(position) as
            "LOCAL_BOTTLENECK" | "PERSISTENT_BOTTLENECK" | "STRUCTURAL_BOTTLENECK");
    }
    /** 第 `position` 类瓶颈的约束数 / The constraint count of bottleneck kind `position`. */
    bottleneckCount(position: number): number { return invoke(() => this.raw().bottleneckCount(position)); }
    /** 第 `position` 类瓶颈第 `index` 个约束 / Constraint `index` of bottleneck kind `position`. */
    bottleneckConstraint(position: number, index: number): string {
        return invoke(() => this.raw().bottleneckConstraint(position, index));
    }
    /** 第 `position` 类瓶颈的约束 ID 列表 / The constraint IDs of bottleneck kind `position`. */
    bottleneckConstraintIds(position: number): string[] {
        return invoke(() => {
            const ids: string[] = [];
            for (let index = 0; index < this.raw().bottleneckCount(position); index++) {
                ids.push(this.raw().bottleneckConstraint(position, index));
            }
            return ids;
        });
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 超启发式配置校验请求。 / The hyper-heuristic config verification request. */
export interface HyperHeuristicConfigRequest {
    /** 配置文本。 / The configuration text. */
    text: string;
    /** 文本格式；省略为 `json`。 / The text format; `json` when omitted. */
    format?: "json" | "yaml" | "toml";
}

/**
 * 超启发式配置的三格式往返与结构校验（批次 C：`ConfigurationFormats` + `HyperHeuristicConfig::validate`）。
 *
 * 纯文本能力，不需要求解器或组件注册表：把一份 JSON / YAML / TOML 配置文本交进来，严格解码（**拒绝重复键、
 * 拒绝未知字段、拒绝非有限数**）、校验结构，再返回规范化 JSON。三种格式解码到同一个模型，所以
 * `canonicalJson()` 对等价文本是**逐字相同**的，可以当作配置的规范指纹用。
 *
 * 结构规则（全部由领域实现，不在 SDK 里重写）：
 * - `version` 必须为 1；算法列表非空；算法 id 非空、首字符字母数字、其余仅 `[A-Za-z0-9._-]`、且**全局唯一**（含子会话）；
 * - `children` 与 `constraints` **互斥**（有子会话就不能再声明叶会话约束）；
 * - 预算必须**至少有一个**全局停止上限，且片段额度必须为正；
 * - `parallelism` 与两个容量必须为正；
 * - `everyDecisions > 0` 时**必须**启用持久化**并**给出 `checkpointPath`。
 *
 * Three-format config round trip and structural validation (batch C). A pure text capability needing neither a solver nor a
 * component registry: a JSON / YAML / TOML config text is strictly decoded (**duplicate keys, unknown fields and non-finite
 * numbers are refused**), structurally validated, and returned as normalized JSON. All three formats decode into one model,
 * so `canonicalJson()` is **byte-identical** for equivalent texts and works as a config fingerprint. The structural rules
 * live in the domain: version 1, non-empty algorithm list, ids that start alphanumeric, use only `[A-Za-z0-9._-]` and are
 * globally unique (children included); `children` and `constraints` mutually exclusive; at least one global budget stop
 * limit with positive slice allowances; positive parallelism and capacities; and `everyDecisions > 0` requiring both
 * persistence and a checkpoint path.
 */
export class HyperHeuristicConfigReport {
    private constructor(private state: HyperHeuristicBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): HyperHeuristicConfigReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected config report text");
        return invoke(() => new HyperHeuristicConfigReport(wasm().HyperHeuristicConfigReport.fromJson(json)));
    }
    private raw(): HyperHeuristicBinding {
        if (!this.state) throw new OspfError("Disposed", "config report has been disposed");
        return this.state;
    }
    /** 配置版本 / The configuration version. */
    version(): number { return invoke(() => this.raw().version()); }
    /** 问题工厂引用 / The problem-factory reference. */
    problem(): string { return invoke(() => this.raw().problem()); }
    /** 顶层算法选择策略 / The top-level algorithm selection policy. */
    selection(): string { return invoke(() => this.raw().selection()); }
    /** 算法实例数（含子会话）/ The algorithm-instance count (children included). */
    algorithmCount(): number { return invoke(() => this.raw().algorithmCount()); }
    /** 顶层算法行数 / The number of top-level algorithm rows. */
    algorithmRowCount(): number { return invoke(() => this.raw().algorithmRowCount()); }
    /** 第 `position` 个算法 / Algorithm `position`. */
    algorithm(position: number): { id: string; algorithm: string; size: number; childCount: number;
        hasConstraints: boolean; selection: string } {
        return invoke(() => {
            const [id, algorithm, size, childCount, hasConstraints, selection] = this.raw().algorithm(position);
            return { id, algorithm, size, childCount, hasConstraints, selection };
        });
    }
    /** 第 `position` 个算法的算子池条数 / The operator-pool sizes of algorithm `position`. */
    algorithmPools(position: number): { updates: number; mutations: number; neighborhoods: number;
        parameterPools: number } {
        return invoke(() => {
            const [updates, mutations, neighborhoods, parameterPools] = this.raw().algorithmPools(position);
            return { updates, mutations, neighborhoods, parameterPools };
        });
    }
    /** 第 `position` 个算法的模式 / The modes of algorithm `position`. */
    algorithmModes(position: number): { initialization: string; importMode: string } {
        return invoke(() => {
            const [initialization, importMode] = this.raw().algorithmModes(position);
            return { initialization, importMode };
        });
    }
    /** 全局停止上限数量 / The number of global stop limits. */
    budgetGlobalLimitCount(): number { return invoke(() => this.raw().budgetGlobalLimitCount()); }
    /** 全局评估上限 / The global evaluation limit. */
    budgetEvaluations(): number | undefined {
        return invoke(() => {
            const value = this.raw().budgetEvaluations();
            return value === undefined ? undefined : Number(value);
        });
    }
    /** 全局决策上限 / The global decision limit. */
    budgetDecisions(): number | undefined {
        return invoke(() => {
            const value = this.raw().budgetDecisions();
            return value === undefined ? undefined : Number(value);
        });
    }
    /** 全局步数上限 / The global step limit. */
    budgetSteps(): number | undefined {
        return invoke(() => {
            const value = this.raw().budgetSteps();
            return value === undefined ? undefined : Number(value);
        });
    }
    /** 全局时间上限（毫秒）/ The global time limit in milliseconds. */
    budgetTimeMillis(): number | undefined {
        return invoke(() => {
            const value = this.raw().budgetTimeMillis();
            return value === undefined ? undefined : Number(value);
        });
    }
    /** 单片段评估额度 / The per-slice evaluation allowance. */
    budgetSliceEvaluations(): number {
        return invoke(() => Number(this.raw().budgetSliceEvaluations()));
    }
    /** 单片段步数额度 / The per-slice step allowance. */
    budgetSliceSteps(): number {
        return invoke(() => Number(this.raw().budgetSliceSteps()));
    }
    /** 预算分配器 / The budget allocator. */
    budgetAllocator(): string { return invoke(() => this.raw().budgetAllocator()); }
    /** 执行配置 / The execution config. */
    execution(): { mode: string; parallelism: number; seed: number } {
        return invoke(() => {
            const [mode, parallelism, seed] = this.raw().execution();
            return { mode, parallelism, seed };
        });
    }
    /** 记忆配置 / The memory config. */
    memory(): { archiveCapacity: number; workingCapacity: number; acceptance: string; exchange: string } {
        return invoke(() => {
            const [archiveCapacity, workingCapacity, acceptance, exchange] = this.raw().memory();
            return { archiveCapacity, workingCapacity, acceptance, exchange };
        });
    }
    /** 学习配置 / The learning config. */
    learning(): { mode: string; features: string; reward: string; hasTrajectoryPath: boolean } {
        return invoke(() => {
            const [mode, features, reward, hasTrajectoryPath] = this.raw().learning();
            return { mode, features, reward, hasTrajectoryPath };
        });
    }
    /** 持久化配置 / The persistence config. */
    persistence(): { enabled: boolean; hasCheckpointPath: boolean; everyDecisions: number } {
        return invoke(() => {
            const [enabled, hasCheckpointPath, everyDecisions] = this.raw().persistence();
            // 绑定层这里是 `bigint`。 / This arrives as a `bigint` from the binding.
            return { enabled, hasCheckpointPath, everyDecisions: Number(everyDecisions) };
        });
    }
    /** 规范化 JSON（可再次提交校验）/ The normalized JSON (re-submittable for verification). */
    canonicalJson(): string { return invoke(() => this.raw().canonicalJson()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 时间归一化奖励策略输入。 / The time-normalized reward input. */
export interface TimeNormalizedInput {
    /** 最短计费时长（秒），必须有限且为正。 / The minimum charged duration in seconds; finite and positive. */
    epsilonSeconds: number;
}

/** 极值窗口奖励策略输入。 / The extreme-value window input. */
export interface ExtremeValueInput {
    /** 窗口容量，必须非零且不超过 `i32::MAX`。 / The window capacity; non-zero and at most `i32::MAX`. */
    size: number;
}

/** 超体积奖励策略输入。 / The hypervolume reward input. */
export interface HypervolumeConfigInput {
    /** 固定劣参考点；空表示自动校准后冻结。 / The fixed worse reference; empty calibrates then freezes. */
    reference?: number[];
    /** 计算模式；省略为 `exact`。 / The computation mode; `exact` when omitted. */
    mode?: "exact" | "sampled";
    /** 每次调用的几何操作额度。 / The per-call geometry allowance. */
    maxWork: number;
    /** 采样模式样本数。 / The sample count. */
    samples: number;
    /** 共同随机种子；省略为 `1`。 / The common seed; `1` when omitted. */
    seed?: number;
    /** 自动参考点所需有效候选数。 / The candidates required for an automatic reference. */
    calibrationObservations: number;
}

/** 奖励策略校验请求：三个策略都可省略，但至少要给一个。 / Every policy is optional but at least one is required. */
export interface RewardPolicyRequest {
    timeNormalized?: TimeNormalizedInput;
    extremeValue?: ExtremeValueInput;
    hypervolume?: HypervolumeConfigInput;
}

/**
 * 奖励策略构造器的纯校验与可恢复状态（批次 C）。
 *
 * 三个构造器都**不执行任何业务目标**，只校验参数，所以这一层可以完整跨线：
 * - 时间归一化：最短计费时长必须**有限且为正**；
 * - 极值窗口：容量必须**非零且不超过 `i32::MAX`**；
 * - 超体积：参考点每个分量必须**有限**、`maxWork` 非零且不超过 `i64::MAX`、`samples` 与
 *   `calibrationObservations` 非零且不超过 `i32::MAX`。
 *
 * 超体积策略还带一份**真实的可恢复状态**（`hypervolumeStateJson()`）：里面有定格的参考点、自动校准的
 * `minimum`/`maximum` 与定义指纹 `definition`。这份文本是 TS 侧唯一能拿到的、可用于续跑的状态形状。
 * 新建实例的 `measurement` 一定为 `null`、`observations` 一定为 `0`，别指望它已经有测量结论。
 *
 * Pure validation of the three reward-policy constructors plus their restorable state (batch C). None of the three
 * evaluates a business objective, so the whole layer can cross the wire: a finite positive minimum duration, a non-empty
 * window up to `i32::MAX`, and finite reference components with non-zero `maxWork` up to `i64::MAX` and non-zero `samples`
 * / `calibrationObservations` up to `i32::MAX`. The hypervolume policy also carries a **real restorable state** whose text
 * holds the frozen reference, the auto-calibrated envelope and the `definition` fingerprint — the only resumable state
 * shape TypeScript can obtain. A fresh instance always has `measurement === null` and `observations === 0`, so do not
 * expect a measured conclusion yet.
 */
export class RewardPolicyReport {
    private constructor(private state: RewardPolicyBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): RewardPolicyReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected reward policy report text");
        return invoke(() => new RewardPolicyReport(wasm().RewardPolicyReport.fromJson(json)));
    }
    private raw(): RewardPolicyBinding {
        if (!this.state) throw new OspfError("Disposed", "reward policy report has been disposed");
        return this.state;
    }
    /** 已校验的策略个数 / How many policies were validated. */
    validatedCount(): number { return invoke(() => this.raw().validatedCount()); }
    /** 校验通过的最短计费时长 / The validated minimum duration. */
    timeNormalizedEpsilonSeconds(): number | undefined {
        return invoke(() => this.raw().timeNormalizedEpsilonSeconds());
    }
    /** 校验通过的极值窗口容量 / The validated window capacity. */
    extremeValueSize(): number | undefined {
        return invoke(() => {
            const value = this.raw().extremeValueSize();
            // 绑定层这里是 `bigint`。 / This arrives as a `bigint`.
            return value === undefined ? undefined : Number(value);
        });
    }
    /** 是否校验了超体积策略 / Whether the hypervolume policy was validated. */
    hasHypervolume(): boolean { return invoke(() => this.raw().hasHypervolume()); }
    /** 超体积计算模式 / The hypervolume computation mode. */
    hypervolumeMode(): "Exact" | "Sampled" {
        return invoke(() => this.raw().hypervolumeMode() as "Exact" | "Sampled");
    }
    /** 超体积参考点 / The hypervolume reference. */
    hypervolumeReference(): number[] {
        return invoke(() => {
            const components: number[] = [];
            for (let axis = 0; axis < this.raw().hypervolumeReferenceCount(); axis++) {
                components.push(this.raw().hypervolumeReference(axis));
            }
            return components;
        });
    }
    /** 几何操作额度 / The geometry allowance. */
    hypervolumeMaxWork(): number { return invoke(() => Number(this.raw().hypervolumeMaxWork())); }
    /** 样本数 / The sample count. */
    hypervolumeSamples(): number { return invoke(() => this.raw().hypervolumeSamples()); }
    /** 共同随机种子 / The common seed. */
    hypervolumeSeed(): number { return invoke(() => this.raw().hypervolumeSeed()); }
    /** 自动参考点所需候选数 / The candidates required for an automatic reference. */
    hypervolumeCalibrationObservations(): number {
        return invoke(() => this.raw().hypervolumeCalibrationObservations());
    }
    /** 可恢复状态文本（可直接存档，供续跑使用）/ The restorable state text (archivable for resuming). */
    hypervolumeStateJson(): string { return invoke(() => this.raw().hypervolumeStateJson()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 检查点族校验请求。 / The checkpoint-family request. */
export interface CheckpointRequest {
    /** 文档类别：`policy`（策略档案）或 `checkpoint`（完整检查点）。 / The document kind. */
    kind: "policy" | "checkpoint";
    /** 文档文本（JSON）。 / The document text (JSON). */
    text: string;
    /** 是否执行 Kotlin v1 导出审计（只对 `checkpoint` 有效）。 / Whether to run the Kotlin-v1 audit. */
    kotlinV1?: boolean;
}

/**
 * 策略档案与完整检查点的结构校验，以及 Kotlin v1 导出能力审计（批次 C）。
 *
 * 两件事，都不需要求解器：
 * 1. **严格解码 + 版本校验**：两种文档都是 `deny_unknown_fields`，未知字段一律报错；版本必须为 1。解码成功后
 *    会重新编码一次，`canonicalJson()` 证明"读得进、写得出"且稳定——把它再提交一次结果应当逐字相同。
 * 2. **Kotlin v1 导出审计**（`kotlinV1: true`）：问的不是"能不能读"，而是"这份检查点里有没有 Kotlin 2eb7943
 *    存不下的已知状态"。**审计不兼容不是错误**——请求成功，报告给出 `kotlinV1Compatible() === false` 与
 *    `kotlinV1Reason()` 的具体原因。
 *
 * 已知不兼容项（实测逐条）：非平稳选择器策略状态（实测类型名是 `frr-mab` / `choice-function` / `adaptive-pursuit`，
 * 不是字面量 "non-stationary"）、调度重放状态、`previousAction` 重放元数据、自适应奖励
 * （`time-normalized` / `extreme-value` / `dominance` / `hypervolume-delta`）、自适应接受策略
 * （`late` / `record-to-record` / `auto`）、局部更新组件（`pattern-search` / `opposition` / `levy` / `pipeline` /
 * `vnd` / `elite-local` / `mutation-stage` / `neighborhood-stage`）、原生约束状态、显式 `numerics` 数值契约。
 *
 * Structure of policy archives and run checkpoints plus the Kotlin-v1 export audit (batch C). Two solver-free jobs. First,
 * **strict decoding plus version checks**: both documents are `deny_unknown_fields`, versions must be 1, and a successful
 * decode is re-encoded so `canonicalJson()` proves a stable round trip (re-submitting it must be byte-identical). Second,
 * the **Kotlin-v1 audit** (`kotlinV1: true`) asks whether the checkpoint holds known state Kotlin 2eb7943 cannot store.
 * **An incompatible verdict is not an error**: the request succeeds with `kotlinV1Compatible() === false` and a concrete
 * `kotlinV1Reason()`. The measured incompatibilities are non-stationary selector state (the measured type names are the
 * `frr-mab` family, not the literal "non-stationary"), schedule replay state, `previousAction` replay metadata, adaptive
 * rewards, adaptive acceptance, local update components, native constraint state and explicit `numerics` contracts.
 */
export class CheckpointReport {
    private constructor(private state: CheckpointBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): CheckpointReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected checkpoint report text");
        return invoke(() => new CheckpointReport(wasm().CheckpointReport.fromJson(json)));
    }
    private raw(): CheckpointBinding {
        if (!this.state) throw new OspfError("Disposed", "checkpoint report has been disposed");
        return this.state;
    }
    /** 文档类别 / The document kind. */
    kind(): "policy" | "checkpoint" { return invoke(() => this.raw().kind() as "policy" | "checkpoint"); }
    /** 文档版本 / The document version. */
    version(): number { return invoke(() => this.raw().version()); }
    /** 策略格式版本 / The policy format version. */
    policyVersion(): number { return invoke(() => this.raw().policyVersion()); }
    /** 策略根动作数 / The number of actions in the policy root. */
    rootActionCount(): number { return invoke(() => this.raw().rootActionCount()); }
    /** 内层策略的算法作用域数 / The number of algorithm scopes carrying inner policies. */
    operatorScopeCount(): number { return invoke(() => this.raw().operatorScopeCount()); }
    /** 内层策略总数 / The total number of inner policies. */
    operatorPolicyCount(): number { return invoke(() => this.raw().operatorPolicyCount()); }
    /** 特征协议版本 / The feature protocol version. */
    featureVersion(): string { return invoke(() => this.raw().featureVersion()); }
    /** 定义指纹 / The definition fingerprint. */
    definition(): string { return invoke(() => this.raw().definition()); }
    /** 训练元信息条数 / The number of training metadata entries. */
    metadataCount(): number { return invoke(() => this.raw().metadataCount()); }
    /** 是否携带调度重放状态 / Whether schedule replay state is present. */
    hasSchedule(): boolean { return invoke(() => this.raw().hasSchedule()); }
    /** worker 数 / The worker count. */
    workerCount(): number { return invoke(() => this.raw().workerCount()); }
    /** 已消费评估请求 / Consumed evaluation requests. */
    evaluations(): number { return invoke(() => this.raw().evaluations()); }
    /** 已派发序号 / Dispatched sequence. */
    dispatched(): number { return invoke(() => this.raw().dispatched()); }
    /** 已完成决策 / Completed decisions. */
    completed(): number { return invoke(() => this.raw().completed()); }
    /** 完整低层步数 / Complete low-level steps. */
    steps(): number { return invoke(() => this.raw().steps()); }
    /** 真实目标调用次数 / Actual objective calls. */
    objectiveCalls(): number { return invoke(() => this.raw().objectiveCalls()); }
    /** 改善次数 / The improvement count. */
    successes(): number { return invoke(() => this.raw().successes()); }
    /** 已完成轨迹条数 / The number of completed transitions. */
    transitionCount(): number { return invoke(() => this.raw().transitionCount()); }
    /** 全局停滞次数 / Global stagnation. */
    stagnation(): number { return invoke(() => this.raw().stagnation()); }
    /** 失败诊断条数 / The number of failure diagnostics. */
    diagnosticCount(): number { return invoke(() => this.raw().diagnosticCount()); }
    /** 全局可恢复组件状态条数 / The number of global recoverable component states. */
    componentCount(): number { return invoke(() => this.raw().componentCount()); }
    /** 是否执行过 Kotlin v1 审计 / Whether the Kotlin-v1 audit ran. */
    hasKotlinV1Verdict(): boolean { return invoke(() => this.raw().hasKotlinV1Verdict()); }
    /** Kotlin v1 导出是否兼容（未审计时为 `undefined`）/ Whether export is compatible (`undefined` when not audited). */
    kotlinV1Compatible(): boolean | undefined { return invoke(() => this.raw().kotlinV1Compatible()); }
    /** 不兼容原因（仅在 `kotlinV1Compatible() === false` 时存在）。
     *  The incompatibility reason (only when `kotlinV1Compatible() === false`). */
    kotlinV1Reason(): string | undefined { return invoke(() => this.raw().kotlinV1Reason()); }
    /** 解码后重新编码的规范文本（再提交应逐字相同）/ The canonical text (re-submitting it must be byte-identical). */
    canonicalJson(): string { return invoke(() => this.raw().canonicalJson()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 线性模型稳定映射查询请求。 / The stable linear-model mapping request. */
export interface LinearMappingRequest {
    /** 可选：声称的映射（`canonicalJson()` 的文本），校验后必须与重算结果一致。
     *  Optional: a claimed mapping (the text from `canonicalJson()`) that must match the recomputation. */
    claimedMapping?: string;
}

/**
 * 线性模型的稳定 solver 映射（批次 D）。
 *
 * 求解器按**列号 / 行号**索引变量与约束，报告里的证据也用下标指路。这个类就是那本名录：把列号或行号翻回稳定 ID。
 *
 * 稳定 ID 用的是**长度前缀分帧**，实测形如 `linear-variable:5#probe:1#0:1#x`，即 `类别:分段长度#分段`：
 * 变量带模型名 / 列号 / 变量名，约束带模型名 / 行号 / 约束名 / 来源符号，目标带模型名与目标类别。
 *
 * **注意：ID 里带列号与行号**，所以它是"位置的身份"而不是"名字"——同一个变量一旦换了位置 ID 就变了。
 * 想要 ID 在重排后保持不变，只能靠模型名与变量名保持稳定。别把它当成可重排的键。
 *
 * 另外，`claimedJson` 那条路是先由领域证明双射再逐项比较的：把 `canonicalJson()` 原样再提交一次必须通过，
 * 换模型名或交换两个变量都会被拒——这正是"这份映射是不是这个模型的"这个问题的答案。
 *
 * The stable solver mapping of a linear model (batch D). Solvers index variables and constraints by **column and row**, and
 * reports point at evidence by index; this class is the directory that turns an index back into a stable ID. IDs use
 * **length-prefixed framing** (measured: `linear-variable:5#probe:1#0:1#x`, i.e. `kind:len#part`): variables carry the
 * model name, column and variable name, constraints the model name, row, name and source symbol, the objective the model
 * name and category. **The IDs embed the column and row**, so an ID is the identity of a slot, not a name: reordering a
 * variable changes its ID, and only stable model and variable names keep it, so never treat it as a reorder-safe key.
 * The claimed-mapping path proves the bijection in the domain first and then compares item by item, so re-submitting
 * `canonicalJson()` must pass while renaming the model or swapping two variables is refused — which is exactly the answer
 * to "does this mapping belong to this model".
 */
export class LinearMappingReport {
    private constructor(private state: LinearMappingBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): LinearMappingReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected linear mapping report text");
        return invoke(() => new LinearMappingReport(wasm().LinearMappingReport.fromJson(json)));
    }
    private raw(): LinearMappingBinding {
        if (!this.state) throw new OspfError("Disposed", "linear mapping report has been disposed");
        return this.state;
    }
    /** 稳定目标 ID / The stable objective ID. */
    objectiveId(): string { return invoke(() => this.raw().objectiveId()); }
    /** 变量数（等于列数）/ The variable count (equal to the column count). */
    variableCount(): number { return invoke(() => this.raw().variableCount()); }
    /** 约束数（等于行数）/ The constraint count (equal to the row count). */
    constraintCount(): number { return invoke(() => this.raw().constraintCount()); }
    /** 二次约束数（线性模型恒为零）/ The quadratic constraint count (always zero for linear). */
    quadraticConstraintCount(): number { return invoke(() => this.raw().quadraticConstraintCount()); }
    /** 第 `column` 列的稳定变量 ID / The stable variable ID of `column`. */
    variableAtColumn(column: number): string { return invoke(() => this.raw().variableAtColumn(column)); }
    /** 第 `row` 行的稳定约束 ID / The stable constraint ID of `row`. */
    constraintAtRow(row: number): string { return invoke(() => this.raw().constraintAtRow(row)); }
    /** 第 `row` 个二次约束的稳定 ID / The stable quadratic-constraint ID of `row`. */
    quadraticConstraintAtRow(row: number): string {
        return invoke(() => this.raw().quadraticConstraintAtRow(row));
    }
    /** 反查稳定变量 ID 的列号；不在映射里时返回 `undefined`。
     *  Reverse-look up a column; `undefined` when the ID is not in the mapping. */
    columnOfVariable(variableId: string): number | undefined {
        return invoke(() => this.raw().columnOfVariable(variableId));
    }
    /** 反查稳定约束 ID 的行号；不在映射里时返回 `undefined`。
     *  Reverse-look up a row; `undefined` when the ID is not in the mapping. */
    rowOfConstraint(constraintId: string): number | undefined {
        return invoke(() => this.raw().rowOfConstraint(constraintId));
    }
    /** 全部稳定变量 ID（按列顺序）/ Every stable variable ID in column order. */
    variablesByColumn(): string[] {
        return invoke(() => {
            const ids: string[] = [];
            for (let column = 0; column < this.raw().variableCount(); column++) {
                ids.push(this.raw().variableAtColumn(column));
            }
            return ids;
        });
    }
    /** 全部稳定约束 ID（按行顺序）/ Every stable constraint ID in row order. */
    constraintsByRow(): string[] {
        return invoke(() => {
            const ids: string[] = [];
            for (let row = 0; row < this.raw().constraintCount(); row++) {
                ids.push(this.raw().constraintAtRow(row));
            }
            return ids;
        });
    }
    /** 重算映射的规范文本（可作为 `claimedMapping` 再提交，必须逐字一致）。
     *  The canonical mapping text (re-submittable as `claimedMapping`, must match verbatim). */
    canonicalJson(): string { return invoke(() => this.raw().canonicalJson()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个审计指纹。 / One audit fingerprint. */
export interface FingerprintInput {
    /** 指纹 schema 版本；省略为 `1.0`。 / The fingerprint schema version; `1.0` when omitted. */
    schemaVersion?: string;
    /** 摘要算法；省略为 `sha256`。 / The digest algorithm; `sha256` when omitted. */
    algorithm?: string;
    /** 十六进制摘要。 / The hex digest. */
    value: string;
}

/** solver provenance。 / Solver provenance. */
export interface ProvenanceInput {
    solverId: string;
    backendName: string;
    backendVersion?: string;
    pluginVersion?: string;
}

/** 一条取消记录。 / One cancellation record. */
export interface CancellationInput {
    /**
     * 线格式规范代码：`user` / `external` / `callback` / `frameworkLoser` / `remoteStop` / `taskAbort` / `backend`。
     * 词表之外的文本**原样保留**（落到 `Other`），所以对端私有取值也能无损往返。
     * The canonical wire code; any text outside the vocabulary is **preserved verbatim** (it lands in `Other`), so a
     * peer's private value round-trips losslessly.
     */
    origin: string;
    /** 首次取消时间（epoch 毫秒）。 / The first cancellation time in epoch milliseconds. */
    requestedAtEpochMs: number;
    /** 调用方给出的取消原因。 / The caller-supplied cancellation reason. */
    reason?: string;
}

/** Logic-Based Benders 恢复身份预检请求。 / The LBB resume-identity preflight request. */
export interface LbbResumeIdentityRequest {
    runId: string;
    sourceAttemptId: string;
    /** 源 attempt 的父 attempt；**不能等于** `sourceAttemptId`。 / Must **not equal** `sourceAttemptId`. */
    sourceParentAttemptId?: string;
    model: FingerprintInput;
    configuration: FingerprintInput;
    solver: FingerprintInput;
    cpSnapshot: FingerprintInput;
    master: FingerprintInput;
    subproblemFactory: FingerprintInput;
    provenance: ProvenanceInput;
    cancellationChain?: CancellationInput[];
}

/**
 * Logic-Based Benders 恢复身份预检（批次 D）。
 *
 * 恢复一次运行之前，调用方必须能证明"我要恢复的这次运行，就是我手上这份检查点记录的那次"。这个类只做**身份字段**的
 * 预检，不需要重建引擎、也不需要检查点本体：
 *
 * - `runId` 与 `sourceAttemptId` 不能空白；
 * - 父 attempt **不能等于**源 attempt；给了父 attempt 也不能是空白；
 * - provenance 的 `solverId` 与 `backendName` 不能空白；
 * - 六个指纹（model / configuration / solver / cpSnapshot / master / subproblemFactory）的 `schemaVersion`、
 *   `algorithm`、`value` 三段都不能空白，且错误信息**各自点名**是哪个指纹。
 *
 * **一条必须读清的事实**：领域 `validate()` **不检查取消链内容**。所以 `cancellationCount()` 与
 * `cancellationOrigins()` 只是**回显**，它们不构成"取消链与检查点一致"的证明——那属于检查点本体
 * （`validate_resume_identity`）的职责，不是这一层能给的结论。
 *
 * LBB resume-identity preflight (batch D). Before resuming a run the caller must prove that the run being resumed is the
 * one the checkpoint records. This class checks only the **identity fields** and needs neither an engine rebuild nor the
 * checkpoint body: run and source attempt IDs non-blank; the parent attempt **not equal** to the source attempt (and
 * non-blank when present); provenance `solverId` / `backendName` non-blank; and all three parts of all six fingerprints
 * non-blank, with each failure naming its own fingerprint. **One fact must be read clearly**: the domain `validate()` does
 * **not inspect the cancellation chain**, so `cancellationCount()` and `cancellationOrigins()` are only an **echo** and
 * prove nothing about the chain matching the checkpoint — that belongs to the checkpoint body's
 * `validate_resume_identity`, not to this layer.
 */
export class LbbResumeIdentityReport {
    private constructor(private state: LbbResumeBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): LbbResumeIdentityReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected LBB resume identity report text");
        return invoke(() => new LbbResumeIdentityReport(wasm().LbbResumeIdentityReport.fromJson(json)));
    }
    private raw(): LbbResumeBinding {
        if (!this.state) throw new OspfError("Disposed", "LBB resume identity report has been disposed");
        return this.state;
    }
    /** 已校验的运行 ID / The validated run ID. */
    runId(): string { return invoke(() => this.raw().runId()); }
    /** 已校验的源 attempt / The validated source attempt. */
    sourceAttemptId(): string { return invoke(() => this.raw().sourceAttemptId()); }
    /** 已校验的父 attempt / The validated parent attempt. */
    sourceParentAttemptId(): string | undefined { return invoke(() => this.raw().sourceParentAttemptId()); }
    /** 校验过的指纹个数（恒为六）/ How many fingerprints were validated (always six). */
    fingerprintCount(): number { return invoke(() => this.raw().fingerprintCount()); }
    /** 取消链条数（**未参与校验**，只回显）/ The chain length (**not validated**, only echoed). */
    cancellationCount(): number { return invoke(() => this.raw().cancellationCount()); }
    /** 第 `position` 条取消记录的规范来源代码 / The canonical origin code of cancellation `position`. */
    cancellationOrigin(position: number): string { return invoke(() => this.raw().cancellationOrigin(position)); }
    /** 全部取消来源代码 / Every cancellation origin code. */
    cancellationOrigins(): string[] { return invoke(() => this.raw().cancellationOrigins()); }
    /** provenance 的 solver ID / The provenance solver ID. */
    provenanceSolverId(): string { return invoke(() => this.raw().provenanceSolverId()); }
    /** provenance 的 backend 名称 / The provenance backend name. */
    provenanceBackendName(): string { return invoke(() => this.raw().provenanceBackendName()); }
    /** 是否给了 backend 版本 / Whether a backend version is present. */
    hasBackendVersion(): boolean { return invoke(() => this.raw().hasBackendVersion()); }
    /** 是否给了 plugin 版本 / Whether a plugin version is present. */
    hasPluginVersion(): boolean { return invoke(() => this.raw().hasPluginVersion()); }
    /** 请求的规范文本（可再提交，必须逐字一致）/ The canonical request text (re-submittable, must match). */
    canonicalJson(): string { return invoke(() => this.raw().canonicalJson()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** CP 检查点结构校验请求。 / The CP checkpoint structure request. */
export interface CpCheckpointRequest {
    /** portable CP 检查点的**规范** JSON 文本。 / The **canonical** JSON text of the portable CP checkpoint. */
    payload: string;
}

/**
 * Constraint Programming 检查点的结构校验与类型化状态投影（批次 D）。
 *
 * CP 检查点的线格式早已能通过 `runRemote" 那一族往返，但 TS 侧只拿到外层信封的身份（run / attempt / schema），
 * **类型化 state 一直是黑箱**。这个类把 `ConstraintProgrammingCheckpointArtifact::from_json` 解出来的东西投影出来：
 * 引擎标识、恢复级别、迭代号、assumption 数、solution hint 条目数、primitive state 的键、snapshot 的规模与指纹。
 *
 * 由领域实现、桥接不重写的规则（都能从结果里看出来）：
 * - state 的 `schemaVersion` 与 `kind` 必须精确匹配当前版本；`restoreMode` 只允许 `RebuildFromSnapshot`；
 * - `engine` 不能空白；snapshot artifact 自身必须自洽；
 * - assumptions 必须按稳定 ID **严格递增**（既不乱序也不重复）；
 * - **完整 solution hint 必须作为整体赋值复验**——hint 覆盖全部变量时，领域会额外跑值域 + interval + 逐约束的
 *   `validate_assignment`。逐项"变量存在 + 值在域内"是不够的：一个损坏的 incumbent 完全可能每项都合法却违反约束。
 *   这是 TS 侧最不可能自己实现的一条，也是这一层最有价值的部分；
 * - `primitiveState` 的键不能空白；外层 `checkpoint.state` 的规范字节必须与类型化 state 完全一致；
 * - 输入必须是**规范 JSON**（重新编码后逐字节相同），否则拒绝——所以 `canonicalInput()` 实测恒为 `true`。
 *
 * CP checkpoint structure and typed-state projection (batch D). CP checkpoints already round-trip through the remote codec,
 * but TypeScript only ever saw the envelope identity (run / attempt / schema) while the **typed state stayed opaque**. This
 * class projects what `ConstraintProgrammingCheckpointArtifact::from_json` decodes: the engine, restore level, iteration,
 * assumption count, solution-hint size, primitive-state keys, and the snapshot's size and fingerprint. Domain-enforced rules
 * the bridge does not re-implement: exact `schemaVersion` and `kind`, a single allowed `restoreMode`, a non-blank engine, a
 * self-consistent snapshot, assumptions in **strictly increasing** stable-ID order, a **complete solution hint revalidated as
 * a whole assignment** (domains + intervals + every constraint — per-entry domain checks are not enough, since a corrupt
 * incumbent can satisfy every domain while violating a constraint), non-blank primitive-state keys, typed state
 * byte-identical to the envelope's canonical bytes, and **canonical JSON** input or it is refused, so `canonicalInput()` is
 * always `true` in practice.
 */
export class CpCheckpointReport {
    private constructor(private state: CpCheckpointBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): CpCheckpointReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected CP checkpoint report text");
        return invoke(() => new CpCheckpointReport(wasm().CpCheckpointReport.fromJson(json)));
    }
    private raw(): CpCheckpointBinding {
        if (!this.state) throw new OspfError("Disposed", "CP checkpoint report has been disposed");
        return this.state;
    }
    /** 信封 schema 版本 / The envelope schema version. */
    schemaVersion(): string { return invoke(() => this.raw().schemaVersion()); }
    /** 运行 ID / The run ID. */
    runId(): string { return invoke(() => this.raw().runId()); }
    /** attempt ID / The attempt ID. */
    attemptId(): string { return invoke(() => this.raw().attemptId()); }
    /** 父 attempt ID / The parent attempt ID. */
    parentAttemptId(): string | undefined { return invoke(() => this.raw().parentAttemptId()); }
    /** 类型化 state 的 schema 版本 / The typed-state schema version. */
    stateSchemaVersion(): string { return invoke(() => this.raw().stateSchemaVersion()); }
    /** 类型化 state 的种类 / The typed-state kind. */
    stateKind(): string { return invoke(() => this.raw().stateKind()); }
    /** 恢复级别（目前只有 `RebuildFromSnapshot`）/ The restore level. */
    restoreMode(): "RebuildFromSnapshot" {
        return invoke(() => this.raw().restoreMode() as "RebuildFromSnapshot");
    }
    /** 产生 state 的 CP 引擎 / The CP engine that produced the state. */
    engine(): string { return invoke(() => this.raw().engine()); }
    /** 算法迭代号 / The algorithm iteration. */
    iteration(): number { return invoke(() => this.raw().iteration()); }
    /** 重新应用的 assumption 条数 / How many assumptions are reapplied. */
    assumptionCount(): number { return invoke(() => this.raw().assumptionCount()); }
    /** solution hint 的条目数（0 表示没有 hint）/ The solution-hint size (0 means no hint). */
    solutionHintCount(): number { return invoke(() => this.raw().solutionHintCount()); }
    /** primitive state 的键数 / The number of primitive-state keys. */
    primitiveStateCount(): number { return invoke(() => this.raw().primitiveStateCount()); }
    /** 第 `position` 个 primitive-state 键 / Primitive-state key `position`. */
    primitiveStateKey(position: number): string { return invoke(() => this.raw().primitiveStateKey(position)); }
    /** 全部 primitive-state 键（值不外泄）/ Every primitive-state key (values are not exposed). */
    primitiveStateKeys(): string[] { return invoke(() => this.raw().primitiveStateKeys()); }
    /** CP snapshot 的模型指纹值 / The CP snapshot's model fingerprint value. */
    snapshotFingerprint(): string { return invoke(() => this.raw().snapshotFingerprint()); }
    /** CP snapshot 的变量数 / The CP snapshot's variable count. */
    snapshotVariableCount(): number { return invoke(() => this.raw().snapshotVariableCount()); }
    /** CP snapshot 的约束数 / The CP snapshot's constraint count. */
    snapshotConstraintCount(): number { return invoke(() => this.raw().snapshotConstraintCount()); }
    /** 输入是否已是规范 JSON（实测恒为 `true`）/ Whether the input was canonical (always `true` in practice). */
    canonicalInput(): boolean { return invoke(() => this.raw().canonicalInput()); }
    /** 规范化后的载荷文本（可再提交，必须逐字一致）/ The normalized payload (re-submittable, must match). */
    canonicalPayload(): string { return invoke(() => this.raw().canonicalPayload()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** Benders 逐轮快照输入。 / One Benders per-iteration snapshot input. */
export interface BendersSnapshotInput {
    /** 当前轮次（**从 1 开始**）。 / The iteration index (**1-based**). */
    iteration: number;
    /** 当前 master 目标值，必须有限。 / The current master objective; must be finite. */
    masterObj: number;
    /** 当前 master gap，必须有限。 / The current master gap; must be finite. */
    masterGap?: number;
    /** 当前 master 有效下界，必须有限。 / The current master best bound; must be finite. */
    masterBound?: number;
    /** 本轮新增 cut 数。 / Newly added cuts in this iteration. */
    cutsAdded: number;
    /** 截止本轮**累计** cut 数。 / The **cumulative** cut count up to this iteration. */
    totalCuts: number;
    /** 本轮结束时连续无新 cut 轮数。 / Consecutive no-cut iterations at the end of this iteration. */
    noCutIterations: number;
    /** 本轮结束时连续目标停滞轮数。 / Consecutive objective-stall iterations at the end of this iteration. */
    noObjImprovementIterations: number;
    /** 本轮 master attempt 身份，不能空白。 / The master-attempt identity; must not be blank. */
    masterAttemptId: string;
    /** 本轮 subproblem attempt 身份。 / The subproblem-attempt identity. */
    subproblemAttemptId?: string;
    /** 本轮是否给出可供外层使用的有效界。 / Whether this iteration exposes a valid outer bound. */
    boundValid?: boolean;
    /** 本轮证书引用。 / The certificate reference for this iteration. */
    proofReference?: string;
    /** 本轮确定的停止原因（线格式代码）。 / The stop reason determined for this iteration (wire code). */
    stopReason?: string;
}

/** Benders 指标文档。 / The Benders metrics document. */
export interface BendersMetricsRequest {
    executedIterations: number;
    bestSolutionIteration?: number;
    totalCuts: number;
    noCutIterations: number;
    noObjImprovementIterations: number;
    /** 停止原因（线格式代码，见类文档）。 / The stop reason (wire code, see the class docs). */
    stopReason?: string;
    iterationSnapshots?: BendersSnapshotInput[];
}

/**
 * Benders 停止原因、运行时指标与逐轮快照（批次 E）。
 *
 * 在领域里 `BendersStopReason` / `BendersRuntimeMetrics` / `BendersIterationSnapshot` 只有 `Debug + Clone`——**没有 serde**，
 * 所以从来没有一条线格式把它们送到 TS 侧。这一层补上：
 *
 * **停止原因词表**（这套代码是**桥接定义的**，领域没有）：
 * `iterationLimit` / `cutStall` / `objectiveStall` / `masterTermination:<终止原因>` /
 * `subproblemTermination:<终止原因>`。嵌套的 `<终止原因>` 直接用核心自己的 `SCREAMING_SNAKE_CASE` 编码
 * （`COMPLETED` / `TIME_LIMIT` / `NODE_LIMIT` / `CANCELLED` / `INTERRUPTED` / `UNKNOWN` …），不另造一套。
 * `stopReasonVocabulary()` 给出完整词表，可以用来做下拉或校验。
 *
 * **校验规则**（都从字段文档语义直接推出，属**桥接层一致性检查**，领域没有 `validate`）：
 * 快照轮次必须从 1 开始、严格递增、互不重复且不超过已执行轮数；`totalCuts` 必须等于最后一轮的累计值，且等于各轮
 * `cutsAdded` 之和；`bestSolutionIteration` 必须落在已执行轮次内（**不能为 0**）；两个停滞计数不得超过已执行轮数；
 * `masterObj` / `masterGap` / `masterBound` 必须有限——**非有限 `f64` 在 JSON 里会变成 `null`**，所以只能在提交前拒绝。
 *
 * Benders stop reasons, runtime metrics and per-iteration snapshots (batch E). In the domain these three types are only
 * `Debug + Clone` — **no serde** — so no wire format ever carried them to TypeScript. This layer adds the **stop-reason
 * vocabulary** (`iterationLimit` / `cutStall` / `objectiveStall` / `masterTermination:<reason>` /
 * `subproblemTermination:<reason>`; this vocabulary is **defined by the bridge**, and the nested reason uses core's own
 * `SCREAMING_SNAKE_CASE` encoding; `stopReasonVocabulary()` returns the whole set) and the **validation rules**, all derived
 * from the documented field semantics as **bridge-level consistency checks**: snapshots start at one, increase strictly, stay
 * unique and inside the executed count; `totalCuts` equals the last cumulative value and the sum of per-iteration additions;
 * `bestSolutionIteration` lies inside the executed range (**never zero**); both stall counters stay within it; and
 * `masterObj` / `masterGap` / `masterBound` must be finite, since **a non-finite `f64` becomes `null` in JSON** and can
 * therefore only be refused before submission.
 */
export class BendersMetricsReport {
    private constructor(private state: BendersMetricsBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): BendersMetricsReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected benders metrics report text");
        return invoke(() => new BendersMetricsReport(wasm().BendersMetricsReport.fromJson(json)));
    }
    private raw(): BendersMetricsBinding {
        if (!this.state) throw new OspfError("Disposed", "benders metrics report has been disposed");
        return this.state;
    }
    /** 实际执行迭代轮数 / The executed iteration count. */
    executedIterations(): number { return invoke(() => this.raw().executedIterations()); }
    /** 累计新增切割数 / The total number of newly added cuts. */
    totalCuts(): number { return invoke(() => this.raw().totalCuts()); }
    /** 最优可行解出现轮次 / The iteration where the best feasible solution appeared. */
    bestSolutionIteration(): number | undefined { return invoke(() => this.raw().bestSolutionIteration()); }
    /** 结束时连续无新 cut 轮数 / Consecutive no-cut iterations at stop. */
    noCutIterations(): number { return invoke(() => this.raw().noCutIterations()); }
    /** 结束时连续目标改进不足轮数 / Consecutive objective-stall iterations at stop. */
    noObjImprovementIterations(): number { return invoke(() => this.raw().noObjImprovementIterations()); }
    /** 停止原因（线格式代码）/ The stop reason (wire code). */
    stopReason(): string | undefined { return invoke(() => this.raw().stopReason()); }
    /** 停止原因粗分类：`executed` / `cutStall` / `objectiveStall` / `masterTermination` /
     *  `subproblemTermination` / `none`。 / The coarse stop category. */
    stopCategory(): "executed" | "cutStall" | "objectiveStall" | "masterTermination"
        | "subproblemTermination" | "none" {
        return invoke(() => this.raw().stopCategory() as "executed" | "cutStall" | "objectiveStall"
            | "masterTermination" | "subproblemTermination" | "none");
    }
    /** 嵌套的终止原因代码（仅两类 termination 有）/ The nested termination-reason code. */
    nestedTerminationReason(): string | undefined {
        return invoke(() => this.raw().nestedTerminationReason());
    }
    /** 快照条数 / The snapshot count. */
    snapshotCount(): number { return invoke(() => this.raw().snapshotCount()); }
    /** 第 `position` 轮快照 / Snapshot `position`. */
    snapshot(position: number): { iteration: number; cutsAdded: number; totalCuts: number; boundValid: boolean } {
        return invoke(() => {
            const [iteration, cutsAdded, totalCuts, boundValid] = this.raw().snapshot(position);
            return { iteration, cutsAdded, totalCuts, boundValid };
        });
    }
    /** 第 `position` 轮快照的停止原因 / The stop reason of snapshot `position`. */
    snapshotStopReason(position: number): string | undefined {
        return invoke(() => this.raw().snapshotStopReason(position));
    }
    /** 第 `position` 轮快照的 master attempt 身份 / The master attempt of snapshot `position`. */
    snapshotMasterAttemptId(position: number): string {
        return invoke(() => this.raw().snapshotMasterAttemptId(position));
    }
    /** 领域接受的停止原因词表（桥接定义）/ The stop-reason vocabulary (bridge-defined). */
    stopReasonVocabulary(): string[] { return invoke(() => this.raw().stopReasonVocabulary()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条 cut 的系数。 / One cut coefficient. */
export interface BendersCutCoefficient {
    column: number;
    coefficient: number;
}

/** 一条线性 cut 的线格式。 / The wire form of one linear cut. */
export interface BendersCutSpec {
    /** 稳定 cut 名称；非空且不重复。 / Stable cut name; non-blank and unique. */
    name: string;
    /** 稀疏系数。 / Sparse coefficients. */
    coefficients: BendersCutCoefficient[];
    sense: "lessOrEqual" | "greaterOrEqual" | "equal";
    rhs: number;
}

/** 一个二次项。 / One quadratic term. */
export interface BendersQuadraticTerm {
    left: number;
    right: number;
    coefficient: number;
}

/** 一条二次 cut 的线格式：线性部分 + 二次项。 / The wire form of one quadratic cut. */
export interface BendersQuadraticCutSpec {
    name: string;
    linear?: BendersCutCoefficient[];
    quadratic?: BendersQuadraticTerm[];
    sense: "lessOrEqual" | "greaterOrEqual" | "equal";
    rhs: number;
}

/** Benders cut 往返请求。 / The Benders cut round-trip request. */
export interface BendersCutRequest {
    /** 模型的列数；每条 cut 的列索引必须严格小于它。 / The column count; every cut column must be below it. */
    columnCount: number;
    linear?: BendersCutSpec[];
    quadratic?: BendersQuadraticCutSpec[];
}

/**
 * Benders cut 的往返与结构报告（批次 E）。
 *
 * `BendersCutSpec` / `BendersQuadraticCutSpec` 早就能出线，但**框架产出的 cut 只能看到数量**
 * （`BendersSubReport.generatedCutCount`），内容读不回来。这个类把方向反过来：把一份 cut 文档交给领域转换器
 * （`to_linear_cuts` / `to_quadratic_cuts`），再把**领域值投影回同一份线格式**——于是 `canonicalJson()` 与输入逐字比较
 * 就是"我送进去的 cut 就是框架会应用的那条"的证明：没有静默丢弃，也没有重排。
 *
 * 校验全部由领域转换器给出（这里不重写），逐条：
 * - cut 名称不能空白且**不得重复**；
 * - 右端项与每个系数都必须**有限**；
 * - 系数列表不能为空（空 cut 等于没有约束）；
 * - 列索引必须在 `columnCount` 之内——**越界列绝不静默丢弃**，否则 cut 会变成一条看不见的错约束；
 * - 同一条 cut 内**同一列不得重复**（重复说明误用了稀疏表示，拒绝而不是自动累加）；
 * - 二次 cut 另有：列对不得重复，线性部分与二次项不能同时为空。
 *
 * 报告还给出每条 cut 的列跨度（`firstColumn` / `lastColumn`，列数之外为 `undefined`）与全局列覆盖
 * （`distinctColumnCount` / `maxColumn`），便于一眼看出 cut 打在了模型的哪些列上。
 *
 * Benders cut round trip and structure report (batch E). The cut specs already crossed the wire, but **framework-produced
 * cuts were only visible as a count** (`BendersSubReport.generatedCutCount`) with no way to read them back. This class runs the
 * other direction: a cut document goes through the domain converters (`to_linear_cuts` / `to_quadratic_cuts`) and the
 * **domain values are projected back into the same wire format**, so comparing `canonicalJson()` with the input byte for
 * byte proves the cuts sent are the rows the framework will apply: nothing dropped, nothing reordered. All validation comes
 * from the domain converter: non-blank unique names; finite right-hand sides and coefficients; a non-empty coefficient list
 * (an empty cut is no constraint); columns inside `columnCount` — **an out-of-range column is never dropped silently**, as that
 * would make an invisible wrong row; no repeated column inside one cut (refused rather than auto-summed); and for quadratic
 * cuts, no repeated column pair and not both parts empty. The report also gives each cut's column span (`firstColumn` /
 * `lastColumn`, `undefined` outside the columns) and the global coverage (`distinctColumnCount` / `maxColumn`).
 */
export class BendersCutReport {
    private constructor(private state: BendersCutBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): BendersCutReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected benders cut report text");
        return invoke(() => new BendersCutReport(wasm().BendersCutReport.fromJson(json)));
    }
    private raw(): BendersCutBinding {
        if (!this.state) throw new OspfError("Disposed", "benders cut report has been disposed");
        return this.state;
    }
    /** 模型的列数 / The model's column count. */
    columnCount(): number { return invoke(() => this.raw().columnCount()); }
    /** 线性 cut 条数 / The number of linear cuts. */
    linearCutCount(): number { return invoke(() => this.raw().linearCutCount()); }
    /** 二次 cut 条数 / The number of quadratic cuts. */
    quadraticCutCount(): number { return invoke(() => this.raw().quadraticCutCount()); }
    /** 线性系数总条数 / The total number of linear coefficients. */
    linearTermCount(): number { return invoke(() => this.raw().linearTermCount()); }
    /** 二次项总条数 / The total number of quadratic terms. */
    quadraticTermCount(): number { return invoke(() => this.raw().quadraticTermCount()); }
    /** 被引用的不同列数 / The number of distinct columns referenced. */
    distinctColumnCount(): number { return invoke(() => this.raw().distinctColumnCount()); }
    /** 被引用的最大列索引 / The largest referenced column. */
    maxColumn(): number | undefined { return invoke(() => this.raw().maxColumn()); }
    /** 第 `position` 条线性 cut / Linear cut `position`. */
    linearCut(position: number): CutRow { return invoke(() => unpackCut(this.raw().linearCut(position))); }
    /** 第 `position` 条二次 cut / Quadratic cut `position`. */
    quadraticCut(position: number): CutRow {
        return invoke(() => unpackCut(this.raw().quadraticCut(position)));
    }
    /** 第 `position` 条二次 cut 的二次项条数 / The quadratic-term count of quadratic cut `position`. */
    quadraticCutTermCount(position: number): number {
        return invoke(() => this.raw().quadraticCutTermCount(position));
    }
    /** **从领域值重建**的线格式（与输入逐字比较即"无静默丢弃"的证明）。
     *  The wire format rebuilt **from the domain values**. */
    canonicalJson(): string { return invoke(() => this.raw().canonicalJson()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条 cut 的结构投影。 / The structure projection of one cut. */
export interface CutRow {
    name: string;
    sense: "lessOrEqual" | "greaterOrEqual" | "equal";
    linearTerms: number;
    /** 用到的**最小**列索引（无系数时为 `undefined`）。 / The smallest column used. */
    firstColumn: number | undefined;
    /** 用到的**最大**列索引（无系数时为 `undefined`）。 / The largest column used. */
    lastColumn: number | undefined;
    rhs: number;
}

/** 把绑定返回的数组摊成结构体。 / Unpack the array returned by the binding into a struct. */
function unpackCut(raw: unknown[]): CutRow {
    const [name, sense, linearTerms, firstColumn, lastColumn, rhs] = raw;
    return {
        name: name as string,
        sense: sense as CutRow["sense"],
        linearTerms: linearTerms as number,
        firstColumn: firstColumn as number | undefined,
        lastColumn: lastColumn as number | undefined,
        rhs: rhs as number,
    };
}

/** 条件差值的有限范围。 / Finite bounds for a condition difference. */
export interface SymbolConditionBounds {
    lower: number;
    upper: number;
}

/** 条件词汇与参数校验请求。 / The condition vocabulary and parameter-validation request. */
export interface SymbolConditionRequest {
    /** 关系：`greater` / `greaterEqual` / `less` / `lessEqual`。 / The relation. */
    relation: "greater" | "greaterEqual" | "less" | "lessEqual";
    /** 严格边界；必须有限且为正。 / The strict boundary; must be finite and positive. */
    strictBoundary: number;
    /** 条件差值的有限范围。 / Finite bounds for the condition difference. */
    bounds: SymbolConditionBounds;
    /** 待分类的样本差值（可选）。 / Sampled differences to classify (optional). */
    differences?: number[];
}

/**
 * `symbol/functions` 的条件词汇与参数校验（批次 F）。
 *
 * 这一层只做**词汇 + 参数校验**，**不承诺求值**：不求值 `Linear`、不建变量、不生成约束。挑的是
 * `symbol/functions/conditional.rs` 里本来就**不需要模型**的纯数值入口：
 *
 * - `ConditionBounds::validate` —— 范围有限且 `lower <= upper`；
 * - `validate_relation_bounds` —— 另外要求严格边界**有限且为正**，并**拒绝整个范围都落在 `Undefined` 间隔内**的条件：
 *   那种条件永远无法判定，悄悄归类成 `false` 会让调用方以为证明过；
 * - `branch_coverage` —— 有限范围是否把条件**钉死**在单一分支（`coverage` 为 `"true"` / `"false"`，未钉死则 `"undefined"`）；
 * - `classify` —— 单个差值按关系与边界分成三值 `true` / `false` / `undefined`。
 *
 * TS 侧拿到的是**结论**：词汇（四种关系、三种真值）、范围是否合法、是否被钉死、每个样本的三值分类与计数。
 * 三值逻辑的边界规则（`>= boundary` 才是真、`<= 0` 才是假，中间"未定义"）在 TS 里重写一遍几乎必然写错，
 * 所以把判定留在领域、只把结论交出去。
 *
 * The condition vocabulary and parameter validation from `symbol/functions` (batch F). This layer covers only the
 * **vocabulary and parameter validation** and **promises no evaluation**: no `Linear` is evaluated, no variable is created
 * and no constraint is generated. It exposes the purely numeric entry points in `symbol/functions/conditional.rs` that never
 * needed a model: `ConditionBounds::validate` (finite and ordered); `validate_relation_bounds` (also requiring a finite
 * positive strict boundary and **rejecting a range wholly inside the `Undefined` interval**, since such a condition can never
 * be decided and calling it false would let the caller believe it was proven); `branch_coverage` (whether the range **pins**
 * the condition to one branch); and `classify` (three-valued `true` / `false` / `undefined` per difference). TypeScript
 * receives the **verdict** — vocabulary, legality, whether the range is pinned, and the per-sample three-valued
 * classification and counts — because the three-valued boundary rules are almost certainly wrong when rewritten by hand, so
 * the decision stays in the domain and only the conclusion crosses.
 */
export class SymbolConditionReport {
    private constructor(private state: SymbolConditionBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): SymbolConditionReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected symbol condition report text");
        return invoke(() => new SymbolConditionReport(wasm().SymbolConditionReport.fromJson(json)));
    }
    private raw(): SymbolConditionBinding {
        if (!this.state) throw new OspfError("Disposed", "symbol condition report has been disposed");
        return this.state;
    }
    /** 关系（线格式代码）/ The relation (wire code). */
    relation(): SymbolConditionRequest["relation"] {
        return invoke(() => this.raw().relation() as SymbolConditionRequest["relation"]);
    }
    /** 严格边界 / The strict boundary. */
    strictBoundary(): number { return invoke(() => this.raw().strictBoundary()); }
    /** 范围下界 / The range's lower bound. */
    lower(): number { return invoke(() => this.raw().lower()); }
    /** 范围上界 / The range's upper bound. */
    upper(): number { return invoke(() => this.raw().upper()); }
    /** 是否把条件钉死在单一分支 / Whether the range pins the condition. */
    coverage(): "true" | "false" | "undefined" {
        return invoke(() => this.raw().coverage() as "true" | "false" | "undefined");
    }
    /** 范围是否已完全可判定 / Whether the range is fully decidable. */
    decidable(): boolean { return invoke(() => this.raw().decidable()); }
    /** 样本条数 / The sample count. */
    sampleCount(): number { return invoke(() => this.raw().sampleCount()); }
    /** 第 `position` 个样本的差值 / The difference of sample `position`. */
    sampleDifference(position: number): number { return invoke(() => this.raw().sampleDifference(position)); }
    /** 第 `position` 个样本的分类 / The classification of sample `position`. */
    sampleTruth(position: number): "true" | "false" | "undefined" {
        return invoke(() => this.raw().sampleTruth(position) as "true" | "false" | "undefined");
    }
    /** 分类为 `true` 的样本数 / How many samples classify as `true`. */
    trueCount(): number { return invoke(() => this.raw().trueCount()); }
    /** 分类为 `false` 的样本数 / How many samples classify as `false`. */
    falseCount(): number { return invoke(() => this.raw().falseCount()); }
    /** 分类为 `undefined` 的样本数 / How many samples classify as `undefined`. */
    undefinedCount(): number { return invoke(() => this.raw().undefinedCount()); }
    /** 关系词表（四种关系）/ The relation vocabulary. */
    relationVocabulary(): string[] { return invoke(() => this.raw().relationVocabulary()); }
    /** 真值词表（三种真值）/ The truth-value vocabulary. */
    truthVocabulary(): string[] { return invoke(() => this.raw().truthVocabulary()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** big-M 与二值化方法的参数校验请求。 / The big-M and binaryzation-method parameter request. */
export interface SymbolLinearizationRequest {
    /** 调用方想用的 Big-M（缺省时用 `defaultBigM`）。 / The big-M the caller wants (default when omitted). */
    bigM?: number;
    /** 想描述的二值化方法（缺省时给出全部四种）。 / The methods to describe (all four when omitted). */
    methods?: Array<"bigM" | "threshold" | "indicator" | "sos1">;
}

/** 一种二值化方法的机制事实。 / The mechanism facts of one binaryzation method. */
export interface SymbolBinaryzationRow {
    method: "bigM" | "threshold" | "indicator" | "sos1";
    /** 机制层实际使用的等价方法。 / The equivalent method actually used at the mechanism layer. */
    mechanismEquivalent: "bigM" | "threshold";
    /** 这一层是否把请求的方法归一成别的。 / Whether this layer normalises the requested method. */
    normalised: boolean;
    whenTrueRelation: "lessEqual" | "equal" | "greaterEqual";
    whenTrueRhs: number;
    whenFalseRelation: "lessEqual" | "equal" | "greaterEqual";
    whenFalseRhs: number;
    relaxedLowerRhs: number;
    relaxedUpperRhs: number;
}

/**
 * big-M 标定旋钮与二值化方法的参数词汇（批次 F）。
 *
 * 全是**公开且纯标量**的入口：不需要模型、不建变量、不生成约束。
 *
 * - `defaultBigM()` = 1e6，`minBigM()` = **1.0**。下限不是 0：太小的推断界会产生退化约束；
 * - `effectiveBigM()` 是**求解器实际会用的值**：非有限 / 零 / 负数**报错**；正数但低于下限时**被抬到下限**，
 *   此时 `clampedToFloor()` 为 `true`。所以"我给的 M"与"实际用的 M"是两件事，报告把两者都写出来；
 * - **`indicator` 与 `sos1` 在机制层都被归一成 `bigM`**（`normalised` 为 `true`）——调用方以为自己拿到了原生指示器
 *   或 SOS1，其实拿到的是 Big-M。这是最容易误解的一条，也是这一层最值钱的一条；
 * - 每种方法都给出 `whenTrue` / `whenFalse` 的关系与右端项，以及两条松弛行右端项。
 *
 * `minBigM` 与 `BINARYZATION_STRICT_EPSILON`（`f64::EPSILON * 16`）都是数值稳定性相关的经验取值：TS 侧应读这里的
 * 结论，而不是自己拍一组数。
 *
 * The big-M calibration knob and the binaryzation-method vocabulary (batch F): public and purely scalar, needing no model,
 * no variable and no constraint. `defaultBigM()` is 1e6 and `minBigM()` is **1.0** — the floor is not zero, since a
 * too-small inferred bound produces degenerate constraints. `effectiveBigM()` is **the value the solver will use**:
 * non-finite, zero and negative values **fail**, while a positive value below the floor is **raised to it**, in which case
 * `clampedToFloor()` is `true`; "the M I supplied" and "the M actually used" are therefore two different things and the
 * report states both. **`indicator` and `sos1` are both normalised to `bigM` at the mechanism layer** (`normalised` is
 * `true`) — the caller believes it obtained native indicator or SOS1 support but gets big-M, the easiest thing to misread and
 * the most valuable fact here. Each method also reports its `whenTrue` / `whenFalse` relation and right-hand side plus both
 * relaxation right-hand sides. `minBigM` and `BINARYZATION_STRICT_EPSILON` (`f64::EPSILON * 16`) are empirical
 * numerical-stability values, so TypeScript should read this verdict instead of inventing a second set.
 */
export class SymbolLinearizationReport {
    private constructor(private state: SymbolLinearizationBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): SymbolLinearizationReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected symbol linearization report text");
        }
        return invoke(() => new SymbolLinearizationReport(wasm().SymbolLinearizationReport.fromJson(json)));
    }
    private raw(): SymbolLinearizationBinding {
        if (!this.state) throw new OspfError("Disposed", "symbol linearization report has been disposed");
        return this.state;
    }
    /** 默认 Big-M / The default big-M. */
    defaultBigM(): number { return invoke(() => this.raw().defaultBigM()); }
    /** Big-M 的下限（不是 0）/ The big-M floor (not zero). */
    minBigM(): number { return invoke(() => this.raw().minBigM()); }
    /** 调用方给出的 Big-M / The caller's big-M. */
    requestedBigM(): number { return invoke(() => this.raw().requestedBigM()); }
    /** 实际会用的 Big-M / The big-M actually used. */
    effectiveBigM(): number { return invoke(() => this.raw().effectiveBigM()); }
    /** 是否被抬到下限 / Whether it was raised to the floor. */
    clampedToFloor(): boolean { return invoke(() => this.raw().clampedToFloor()); }
    /** 方法词表（四种）/ The method vocabulary. */
    methodVocabulary(): string[] { return invoke(() => this.raw().methodVocabulary()); }
    /** 方法条数 / The method count. */
    methodCount(): number { return invoke(() => this.raw().methodCount()); }
    /** 第 `position` 种方法的机制事实 / The mechanism facts of method `position`. */
    method(position: number): { method: string; mechanismEquivalent: "bigM" | "threshold"; normalised: boolean } {
        return invoke(() => {
            const [method, mechanismEquivalent, normalised] = this.raw().method(position);
            return { method, mechanismEquivalent, normalised } as {
                method: string; mechanismEquivalent: "bigM" | "threshold"; normalised: boolean };
        });
    }
    /** 第 `position` 种方法的 `whenTrue` 右端项 / The when-true right-hand side of method `position`. */
    whenTrueRhs(position: number): number { return invoke(() => this.raw().whenTrueRhs(position)); }
    /** 第 `position` 种方法的 `whenFalse` 右端项 / The when-false right-hand side of method `position`. */
    whenFalseRhs(position: number): number { return invoke(() => this.raw().whenFalseRhs(position)); }
    /** 第 `position` 种方法的两条松弛行右端项 / Both relaxation right-hand sides of method `position`. */
    relaxations(position: number): { lower: number; upper: number } {
        return invoke(() => {
            const rows = this.raw().relaxations(position);
            return { lower: rows[0] as number, upper: rows[1] as number };
        });
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条核心关系 `s REL rhs`。 / One core relation `s REL rhs`. */
export interface SymbolCoreRelation {
    relation: "lessEqual" | "equal" | "greaterEqual";
    rhs: number;
}

/** 关系指示的即时展开。 / The eager expansion of a relational indicator. */
export interface SymbolInequalityRow {
    kind: "lessEqual" | "greaterEqual" | "less" | "greater" | "equal" | "notEqual";
    /** 这一层是否支持（`equal` / `notEqual` 不支持：取假侧是析取）。 / Whether this layer supports it. */
    supported: boolean;
    whenTrue: SymbolCoreRelation | undefined;
    whenFalse: SymbolCoreRelation | undefined;
    relaxedLowerRhs: number | undefined;
    relaxedUpperRhs: number | undefined;
}

/** 一条蕴含耦合指示约束。 / One implication coupling indicator constraint. */
export interface SymbolImplyRow {
    keyedOnPremise: boolean;
    indicatorValue: boolean;
    relation: "lessEqual" | "equal" | "greaterEqual";
    otherCoefficient: number;
    rhs: number;
}

/**
 * `inequality` / `imply` / `if_in` 的即时展开核心关系表（批次 F）。
 *
 * 纯表读取：**不接受参数、不建变量、不生成约束**。三张表：
 *
 * - **关系指示**（6 种里支持 4 种）：非严格 `lessEqual` 取真 `s <= 0`、取假**外扩** ε 得 `s >= ε`；严格 `less` 取真
 *   **内缩** ε 得 `s <= -ε`、取假为非严格 `s >= 0`；`greaterEqual` / `greater` 是镜像。**`equal` 与 `notEqual` 不支持**
 *   （`supported` 为 `false`）：它们的取假侧是**析取**（`s <= -boundary` 或 `s >= boundary`），两条指示约束表达不了。
 *   这是最容易被误以为"应该支持"的一条；
 * - **蕴含耦合**：三条指示约束，前提出发两条、结论出发一条；
 * - **InValues band**：取真时是 `[-tol, tol]` 的**一对**关系，另有 side 列的两个方向；`strictBoundary` 同时是两条松弛的
 *   右端。
 *
 * 容差都是**公开常量**并原样给出：`indicatorTolerance` = 1e-10、`stepEpsilon` = 1e-8、`strictBoundary` =
 * 2·`stepEpsilon`。这些是数值稳定性取值，TS 侧应读这里的结论，而不是自己拍一组。
 *
 * The eager-expansion core relation tables of `inequality`, `imply` and `if_in` (batch F). A pure table read that
 * **takes no parameters, creates no variable and generates no constraint**. Three tables: the relational indicator (four of
 * six kinds supported; non-strict `lessEqual` expands **outward** by ε while strict `less` shrinks **inward** by ε, the two
 * `greater` kinds mirroring them; **`equal` and `notEqual` are unsupported** because their false side is a **disjunction**
 * that two indicator constraints cannot express — the easiest thing to expect to be supported); the implication coupling
 * (three constraints, two keyed on the premise and one on the consequence); and the InValues band (a **pair** of relations
 * for `[-tol, tol]` when true, plus both side directions, with `strictBoundary` also serving as both relaxation right-hand
 * sides). The tolerances are **public constants** reported verbatim — `indicatorTolerance` 1e-10, `stepEpsilon` 1e-8,
 * `strictBoundary` 2·`stepEpsilon` — and are numerical-stability values TypeScript should read rather than invent.
 */
export class SymbolCoreRelationsReport {
    private constructor(private state: SymbolCoreRelationsBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): SymbolCoreRelationsReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected symbol core relations report text");
        }
        return invoke(() => new SymbolCoreRelationsReport(wasm().SymbolCoreRelationsReport.fromJson(json)));
    }
    private raw(): SymbolCoreRelationsBinding {
        if (!this.state) throw new OspfError("Disposed", "symbol core relations report has been disposed");
        return this.state;
    }
    /** 关系种类词表（六种）/ The kind vocabulary.
     *  @returns 六个 `lessEqual` / `greaterEqual` / `less` / `greater` / `equal` / `notEqual` */
    kindVocabulary(): string[] { return invoke(() => this.raw().kindVocabulary()); }
    /** 指示容差（1e-10）/ The indicator tolerance. */
    indicatorTolerance(): number { return invoke(() => this.raw().indicatorTolerance()); }
    /** band 步进容差（1e-8）/ The band step tolerance. */
    stepEpsilon(): number { return invoke(() => this.raw().stepEpsilon()); }
    /** InValues 的严格边界（2·stepEpsilon）/ The InValues strict boundary. */
    strictBoundary(): number { return invoke(() => this.raw().strictBoundary()); }
    /** 支持的关系种类数（实测 4）/ How many kinds are supported. */
    supportedKindCount(): number { return invoke(() => this.raw().supportedKindCount()); }
    /** 关系种类条数 / The number of kind rows. */
    inequalityCount(): number { return invoke(() => this.raw().inequalityCount()); }
    /** 第 `position` 个种类是否支持 / Whether kind `position` is supported. */
    isKindSupported(position: number): boolean { return invoke(() => this.raw().isKindSupported(position)); }
    /** 第 `position` 个种类取真时的核心关系 / The core relation when kind `position` is true. */
    whenTrue(position: number): SymbolCoreRelation | undefined {
        return invoke(() => unpackRelation(this.raw().whenTrue(position)));
    }
    /** 第 `position` 个种类取假时的核心关系 / The core relation when kind `position` is false. */
    whenFalse(position: number): SymbolCoreRelation | undefined {
        return invoke(() => unpackRelation(this.raw().whenFalse(position)));
    }
    /** 第 `position` 个种类的两条松弛右端项 / Both relaxation right-hand sides of kind `position`. */
    relaxations(position: number): { lower: number; upper: number } | undefined {
        return invoke(() => {
            const rows = this.raw().relaxations(position);
            return rows ? { lower: rows[0] as number, upper: rows[1] as number } : undefined;
        });
    }
    /** 蕴含耦合条数（实测 3）/ The coupling row count. */
    implyCount(): number { return invoke(() => this.raw().implyCount()); }
    /** 第 `position` 条耦合约束 / Coupling row `position`. */
    imply(position: number): SymbolImplyRow {
        return invoke(() => {
            const [keyedOnPremise, indicatorValue, relation, otherCoefficient, rhs] = this.raw().imply(position);
            return { keyedOnPremise, indicatorValue, relation, otherCoefficient, rhs } as SymbolImplyRow;
        });
    }
    /** band 取真时一对关系的右端项 / The right-hand sides of the band pair. */
    bandPairRhs(): number[] { return invoke(() => Array.from(this.raw().bandPairRhs())); }
    /** band 取真时一对关系的关系代码 / The relation codes of the band pair. */
    bandPairRelations(): string[] { return invoke(() => this.raw().bandPairRelations()); }
    /** band 的 `[bandTolerance, strictBoundary]` / The band's `[bandTolerance, strictBoundary]`. */
    bandTolerances(): { bandTolerance: number; strictBoundary: number } {
        return invoke(() => {
            const [bandTolerance, strictBoundary] = Array.from(this.raw().bandTolerances());
            return { bandTolerance: bandTolerance as number, strictBoundary: strictBoundary as number };
        });
    }
    /** band 的两条松弛右端项 / Both band relaxation right-hand sides. */
    bandRelaxations(): { lower: number; upper: number } {
        return invoke(() => {
            const [lower, upper] = Array.from(this.raw().bandRelaxations());
            return { lower: lower as number, upper: upper as number };
        });
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 把绑定返回的 `[relation, rhs]` 摊成结构体。 / Unpack the binding's `[relation, rhs]`. */
function unpackRelation(raw: unknown[] | undefined): SymbolCoreRelation | undefined {
    if (!raw) return undefined;
    return { relation: raw[0] as SymbolCoreRelation["relation"], rhs: raw[1] as number };
}

/** 曲线采样的请求。 / The curve-sampling request. */
export interface HeuristicScheduleRequest {
    /** 演化源形态。 / The evolution-source shape. */
    kind: "constant" | "linear" | "geometric" | "exponential" | "jittered";
    /** `constant`：常数值。 / `constant`: the value. */
    value?: number;
    /** `linear`：起始值。 / `linear`: the start value. */
    from?: number;
    /** `linear`：结束值。 / `linear`: the end value. */
    to?: number;
    /** `linear`：迭代上限（`0` 表示恒为 `to`）。 / `linear`: the iteration limit. */
    limit?: number;
    /** `geometric` / `exponential` / `jittered`：初始值。 / The initial value. */
    initial?: number;
    /** `geometric` / `jittered`：公比。 / The common ratio. */
    ratio?: number;
    /** `exponential`：衰减率。 / The decay rate. */
    rate?: number;
    /** `jittered`：抖动幅度。 / The jitter amplitude. */
    amplitude?: number;
    /** 抖动熵源的种子（缺省用领域默认种子 20240521）。 / The jitter entropy seed. */
    seed?: number;
    /** 采样点数（1..=4096）。 / The sample count (1..=4096). */
    samples: number;
}

/**
 * 启发式算子的参数调度曲线采样（批次 G）。
 *
 * 启发式算子里可搬运的一层是**参数演化源**：温度、变异尺度、交叉率这些标量按迭代数变化，公式是纯的、与模型无关。
 * 这一层把曲线采出来——**不绑任何算子**，不建种群、不评估适应度。
 *
 * 五种形态，公式都来自领域实现（这里不重写）：
 * - `constant`：`value`；
 * - `linear`：`from + (to - from) * clamp(i / limit, 0, 1)`，`limit = 0` 时进度直接取 1（恒为 `to`）；
 * - `geometric`：`initial * ratio^i`；
 * - `exponential`：`initial * exp(-rate * i)`；
 * - `jittered`：几何调度 + `amplitude * (2u - 1)` 的对称抖动，`u` 来自**种子化**熵源（与 Kotlin 侧同一个 LCG），
 *   所以同一 seed 得到同一条曲线，可复现也可做前后端比对。
 *
 * 采样点数限制在 1..=4096，这是**信任边界上的限制**；曲线若越出有限范围，直接**拒绝**而不是报一个假区间。
 *
 * Sampling the parameter schedules of heuristic operators (batch G). The portable layer inside a heuristic solver is the
 * **parameter evolution source**: temperature, mutation scale and crossover rate vary with the iteration count and their
 * formulas are pure and model-independent. This layer samples the curve and **binds no operator**: no population is built
 * and no fitness is evaluated. Five shapes, all using the domain's formulas: `constant`; `linear`
 * (`from + (to - from) * clamp(i / limit, 0, 1)`, with `limit = 0` collapsing to `to`); `geometric` (`initial * ratio^i`);
 * `exponential` (`initial * exp(-rate * i)`); and `jittered` (a geometric schedule plus a symmetric `amplitude * (2u - 1)`
 * jitter whose `u` comes from a **seeded** entropy source — the same LCG as the Kotlin side — so one seed yields one
 * reproducible curve that can be compared across the wire). The sample count is capped at 1..=4096, a **trust-boundary**
 * limit, and a curve leaving the finite range is **refused** rather than reported with a fake range.
 */
export class HeuristicScheduleReport {
    private constructor(private state: HeuristicScheduleBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): HeuristicScheduleReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected heuristic schedule report text");
        return invoke(() => new HeuristicScheduleReport(wasm().HeuristicScheduleReport.fromJson(json)));
    }
    private raw(): HeuristicScheduleBinding {
        if (!this.state) throw new OspfError("Disposed", "heuristic schedule report has been disposed");
        return this.state;
    }
    /** 演化源形态 / The shape. */
    kind(): HeuristicScheduleRequest["kind"] {
        return invoke(() => this.raw().kind() as HeuristicScheduleRequest["kind"]);
    }
    /** 实际使用的种子 / The seed actually used. */
    seed(): number { return invoke(() => this.raw().seed()); }
    /** 采样点数 / The sample count. */
    sampleCount(): number { return invoke(() => this.raw().sampleCount()); }
    /** 第 `position` 个采样点的迭代序号 / The iteration index of sample `position`. */
    iteration(position: number): number { return invoke(() => this.raw().iteration(position)); }
    /** 第 `position` 个采样点的值 / The value of sample `position`. */
    value(position: number): number { return invoke(() => this.raw().value(position)); }
    /** 全部采样值（可直接画图）/ Every sampled value (ready for plotting). */
    values(): number[] { return invoke(() => Array.from(this.raw().values())); }
    /** 首个采样值 / The first sampled value. */
    firstValue(): number { return invoke(() => this.raw().firstValue()); }
    /** 最后一个采样值 / The last sampled value. */
    lastValue(): number { return invoke(() => this.raw().lastValue()); }
    /** 最小采样值 / The smallest sampled value. */
    minValue(): number { return invoke(() => this.raw().minValue()); }
    /** 最大采样值 / The largest sampled value. */
    maxValue(): number { return invoke(() => this.raw().maxValue()); }
    /** 是否所有采样值都有限 / Whether every sampled value is finite. */
    allFinite(): boolean { return invoke(() => this.raw().allFinite()); }
    /** 形态词表（五种）/ The shape vocabulary. */
    kindVocabulary(): string[] { return invoke(() => this.raw().kindVocabulary()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一次时序差分转移。 / One temporal-difference transition. */
export interface QTransition {
    state: number;
    action: number;
    /** 即时奖励（必须有限）。 / The immediate reward (must be finite). */
    reward: number;
    nextState: number;
    /** 学习率（必须在 `[0, 1]`）。 / The learning rate (must lie in `[0, 1]`). */
    alpha: number;
    /** 折扣因子（必须在 `[0, 1]`）。 / The discount factor (must lie in `[0, 1]`). */
    gamma: number;
    /** 是否终止转移（目标里的下一状态项取 0）。 / Whether the transition is terminal. */
    terminal?: boolean;
    /** 可动作掩码；参与"下一状态取最大"并被校验不越界。 / The action mask. */
    availableActions?: number[];
}

/** 动作选择器。 / The action selector. */
export interface QSelector {
    kind: "greedy" | "epsilonGreedy";
    /** `epsilonGreedy` 的探索概率（会被夹到 `[0, 1]`）。 / The exploration probability (clamped). */
    epsilon?: number;
    /** 熵源种子（缺省用领域默认种子 20240521）。 / The entropy seed. */
    seed?: number;
}

/** Q 表推演的请求。 / The Q-table replay request. */
export interface QTableRequest {
    stateAmount: number;
    actionAmount: number;
    /** 初始表（行优先铺平）；缺省表示全 0。 / The initial table (row-major, flattened); omitted means zeros. */
    initialValues?: number[];
    transitions?: QTransition[];
    selector?: QSelector;
    /** 要用选择器查询的状态（最多 256 个）。 / The states to query (at most 256). */
    selectionStates?: number[];
}

/**
 * Q 表的编解码与确定性推演（批次 G）。
 *
 * `operator/rl` 里可搬运的一层是 **Q 表本身**：一份「状态 × 动作」的数值矩阵，`snapshot` / `restore` 就是它的编解码，
 * `update` 与动作选择器都是**纯数值函数**。这一层把链走通——**不建 agent、不接观测者、不跑搜索**。
 *
 * 领域规则逐条保留（这里一条不重写）：
 * - `restore` 要求行数 = 状态数、每行长度 = 动作数、**所有值有限**，否则整份拒绝（原子语义，不部分写入）；
 * - `update` 的时序差分目标是**下一状态**的最大动作价值，**不是当前状态的**——实现 Q-learning 时最经典的错；
 * - `terminal = true` 时目标里的下一状态项直接取 0；
 * - `availableActions` 既参与"下一状态取最大"，又被校验为动作下标不越界（掩码是规则，不是注释）；
 * - `alpha` / `gamma` 必须在 `[0, 1]`，`reward` 必须有限，更新结果必须有限（溢出拒绝，不写进一个 `inf`）；
 * - `bestAction` 并列取**最小下标**，空表返回 0；
 * - ε-贪心把 `epsilon` **夹到 `[0, 1]`**，探索时**再抽一个独立随机数**决定位置（不复用同一次掷骰），所以
 *   `epsilon = 0` 就是纯贪心；随机性来自**种子化**熵源，同一种子的选择序列可复现。
 *
 * 规模上限（信任边界）：状态 × 动作 ≤ 4096、转移 ≤ 1024、选择查询 ≤ 256。
 *
 * The Q-table codec and a deterministic replay (batch G). The portable layer inside `operator/rl` is the **Q-table itself** —
 * a numeric state × action matrix whose `snapshot` / `restore` pair is its codec, with `update` and the action selectors being
 * **purely numeric functions** — and this layer walks that chain with **no agent, no observer and no search**. Every domain
 * rule is preserved: `restore` demands the exact shape and **all values finite** or refuses the whole table (atomic, never
 * partial); `update`'s temporal-difference target is the maximum over the **next** state, **not the current one** — the
 * classic Q-learning mistake; `terminal = true` drops the next-state term to zero; `availableActions` both masks that maximum
 * and is validated against the action count (a rule, not a comment); `alpha` and `gamma` must lie in `[0, 1]`, `reward` must
 * be finite and an overflowing update is refused rather than stored as `inf`; `bestAction` breaks ties by **lowest index** and
 * returns 0 for an empty table; and ε-greedy **clamps** `epsilon` to `[0, 1]` and draws a **second independent sample** for the
 * exploration pick, so `epsilon = 0` is plain greedy and a seeded entropy source makes a selection sequence reproducible.
 * Sizes are capped as **trust boundaries**: states × actions ≤ 4096, transitions ≤ 1024, selection queries ≤ 256.
 */
export class QTableReport {
    private constructor(private state: QTableBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): QTableReport {
        if (typeof json !== "string") throw new OspfError("InvalidInput", "expected q table report text");
        return invoke(() => new QTableReport(wasm().QTableReport.fromJson(json)));
    }
    private raw(): QTableBinding {
        if (!this.state) throw new OspfError("Disposed", "q table report has been disposed");
        return this.state;
    }
    /** 状态数量 / The number of states. */
    stateAmount(): number { return invoke(() => this.raw().stateAmount()); }
    /** 动作数量 / The number of actions. */
    actionAmount(): number { return invoke(() => this.raw().actionAmount()); }
    /** 初始表是否由请求给出 / Whether the initial table came from the request. */
    initialSupplied(): boolean { return invoke(() => this.raw().initialSupplied()); }
    /** 转移条数 / The number of transitions. */
    transitionCount(): number { return invoke(() => this.raw().transitionCount()); }
    /** 第 `position` 次转移更新后的 `Q(s, a)` / The updated `Q(s, a)` of transition `position`. */
    transitionUpdatedValue(position: number): number {
        return invoke(() => this.raw().transitionUpdatedValue(position));
    }
    /** 推演结束后的完整表（行优先铺平）/ The final table (row-major, flattened). */
    finalValues(): number[] { return invoke(() => Array.from(this.raw().finalValues())); }
    /** 某一状态的某动作价值 / One action's value in one state. */
    valueOf(state: number, action: number): number { return invoke(() => this.raw().valueOf(state, action)); }
    /** 全部状态的最优动作 / Every state's best action. */
    bestActions(): number[] { return invoke(() => Array.from(this.raw().bestActions())); }
    /** 某一状态的最优动作 / One state's best action. */
    bestAction(state: number): number { return invoke(() => this.raw().bestAction(state)); }
    /** 选择器种类 / The selector kind. */
    selectorKind(): QSelector["kind"] { return invoke(() => this.raw().selectorKind() as QSelector["kind"]); }
    /** 实际使用的种子 / The seed actually used. */
    seed(): number { return invoke(() => this.raw().seed()); }
    /** 选择查询条数 / The number of selection queries. */
    selectionCount(): number { return invoke(() => this.raw().selectionCount()); }
    /** 第 `position` 次查询选中的动作 / The action chosen by selection query `position`. */
    selectionAction(position: number): number { return invoke(() => this.raw().selectionAction(position)); }
    /** 第 `position` 次查询的状态 / The state of selection query `position`. */
    selectionState(position: number): number { return invoke(() => this.raw().selectionState(position)); }
    /** 选择器词表 / The selector vocabulary. */
    selectorVocabulary(): string[] { return invoke(() => this.raw().selectorVocabulary()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个稳定 ID → 整数值的赋值。 / One stable-ID to integer-value assignment. */
export interface MasterAssignmentEntry {
    /** 稳定变量 ID（不能空白）。 / The stable variable ID (must not be blank). */
    id: string;
    /** 被排除的取值。 / The excluded value. */
    value: number;
}

/** bounded-integer no-good 的行。 / A bounded-integer no-good row. */
export interface MasterNoGoodRowSpec {
    kind: "lowerSide" | "upperSide" | "atMostOne" | "requireDifference";
    /** 行引用的稳定变量 ID（`requireDifference` 不需要）。 / The row's stable variable ID. */
    id?: string;
}

/** 一条 master cut 的编码与（可选）验证冲突的请求。 / A master-cut encoding plus an optional verified conflict. */
export interface MasterCutEncodingRequest {
    kind: "linear" | "binaryNoGood" | "boundedIntegerNoGood";
    /** 被排除的赋值。 / The excluded assignment. */
    assignment?: MasterAssignmentEntry[];
    /** 多行族的稳定身份（仅 `boundedIntegerNoGood` 需要）。 / The family identity (multi-row only). */
    familyId?: string;
    /** 当前行（仅 `boundedIntegerNoGood` 需要）。 / The row (multi-row only). */
    row?: MasterNoGoodRowSpec;
    /** 验证冲突：成员稳定 ID 列表。 / The verified conflict's member IDs. */
    conflictMembers?: string[];
    /** 验证冲突的证明引用。 / The verified conflict's proof reference. */
    conflictProofReference?: string;
}

/**
 * master cut 的编码分类与验证冲突子集（续挖 `logic_based_benders`）。
 *
 * 那个文件里 17 个未被引用的类型中，大部分是**证明器接口**（`MasterObjectiveEvaluator`、各 `*Factory`、
 * `LogicBasedBendersCutOracle`）——闭包与工厂，属真边界。真正可数据化的只有两处：
 *
 * - **`MasterCutEncoding`**：一条 master cut 的表达式编码，三型 —— `linear`（普通线性 cut）、`binaryNoGood`
 *   （完整或子集 binary no-good，带被排除的赋值）、`boundedIntegerNoGood`（**有界整数多行** no-good）。最容易误解
 *   的是最后一种：多行 no-good **不是一条 cut**，而是同一 `familyId` 下的一组行，每行一种类型
 *   （`lowerSide` / `upperSide` / `atMostOne` / `requireDifference`）。报告把族与行**分开**给出，并用
 *   `rowVariableIsAssigned` 说明行引用的变量是否确实在被排除的赋值里——那是调用方的语义选择，不在这一层拒绝。
 * - **`VerifiedMasterConflict`**：验证过的 master 冲突子集，**构造器自带校验**——成员集合为空、或证明引用空白，直接
 *   拒绝。这是"我真的验证过这个冲突"与"我只是声称"的分界，值得让 TS 侧也能触发这条拒绝。
 *
 * `canonicalJson()` 是**领域值自己序列化**出来的，所以标签是领域标签（`"Linear"` / `{"BinaryNoGood":…}` /
 * `{"BoundedIntegerNoGood":…}`），不是桥接猜的；跨型混用（线性带赋值、binary 带族、多行缺族或缺行、行变量缺失）
 * 全部拒绝。
 *
 * The master-cut encoding classification and verified conflict subset from `logic_based_benders` (continuation). Most of that
 * file's 17 unreferenced types are **prover interfaces** (closures and factories, a true boundary); only two things are
 * genuinely datafiable. **`MasterCutEncoding`** in three forms — `linear`, `binaryNoGood` with its excluded assignment, and
 * `boundedIntegerNoGood`, a **multi-row** no-good family whose each row is one of `lowerSide` / `upperSide` / `atMostOne` /
 * `requireDifference`. The last is the easiest to misread: a multi-row no-good is **not one cut** but a set of rows under one
 * `familyId`, so the report keeps family and row **apart** and uses `rowVariableIsAssigned` to say whether the row's variable
 * is actually among the excluded assignments — a caller-side semantic choice this layer does not refuse.
 * **`VerifiedMasterConflict`** is the subset whose **constructor validates** and refuses an empty member set or a blank proof
 * reference — the line between "I verified this conflict" and "I merely claim it". `canonicalJson()` is the **domain value's
 * own** serialization, so the tags are the domain's (`"Linear"` / `{"BinaryNoGood":…}` / `{"BoundedIntegerNoGood":…}`), and
 * every cross-kind mix-up (a linear cut with an assignment, a binary no-good with a family, a multi-row without family or row,
 * a row without its variable) is refused.
 */
export class MasterCutEncodingReport {
    private constructor(private state: MasterCutEncodingBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): MasterCutEncodingReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected master cut encoding report text");
        }
        return invoke(() => new MasterCutEncodingReport(wasm().MasterCutEncodingReport.fromJson(json)));
    }
    private raw(): MasterCutEncodingBinding {
        if (!this.state) throw new OspfError("Disposed", "master cut encoding report has been disposed");
        return this.state;
    }
    /** 编码类型 / The encoding kind. */
    kind(): MasterCutEncodingRequest["kind"] {
        return invoke(() => this.raw().kind() as MasterCutEncodingRequest["kind"]);
    }
    /** 被排除赋值的条数 / The number of excluded assignments. */
    assignmentCount(): number { return invoke(() => this.raw().assignmentCount()); }
    /** 第 `position` 个被排除赋值的稳定 ID / The stable ID of assignment `position`. */
    assignmentId(position: number): string { return invoke(() => this.raw().assignmentId(position)); }
    /** 第 `position` 个被排除赋值的取值 / The excluded value of assignment `position`. */
    assignmentValue(position: number): number { return invoke(() => this.raw().assignmentValue(position)); }
    /** 多行族的稳定身份 / The multi-row family identity. */
    familyId(): string | undefined { return invoke(() => this.raw().familyId()); }
    /** 行类型 / The row kind. */
    rowKind(): MasterNoGoodRowSpec["kind"] | undefined {
        return invoke(() => this.raw().rowKind() as MasterNoGoodRowSpec["kind"] | undefined);
    }
    /** 行引用的稳定变量 ID / The row's stable variable ID. */
    rowId(): string | undefined { return invoke(() => this.raw().rowId()); }
    /** 是否是多行族里的一行 / Whether this is one row of a multi-row family. */
    multiRow(): boolean { return invoke(() => this.raw().multiRow()); }
    /** 行变量是否确实在被排除的赋值里 / Whether the row's variable is among the excluded assignments. */
    rowVariableIsAssigned(): boolean | undefined {
        return invoke(() => this.raw().rowVariableIsAssigned());
    }
    /** 验证冲突的成员数 / The verified conflict's member count. */
    conflictMemberCount(): number | undefined { return invoke(() => this.raw().conflictMemberCount()); }
    /** 验证冲突的证明引用 / The verified conflict's proof reference. */
    conflictProofReference(): string | undefined { return invoke(() => this.raw().conflictProofReference()); }
    /** 编码词表（三型）/ The encoding vocabulary. */
    kindVocabulary(): string[] { return invoke(() => this.raw().kindVocabulary()); }
    /** 行类型词表（四型）/ The row vocabulary. */
    rowVocabulary(): string[] { return invoke(() => this.raw().rowVocabulary()); }
    /** **领域值自己序列化**的编码 / The encoding **serialized by the domain value itself**. */
    canonicalJson(): string { return invoke(() => this.raw().canonicalJson()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 跨阶段汇总请求：三份报告的 JSON 文本（都可缺省）。 / The aggregation request. */
export interface AnalysisGroupAggregateRequest {
    /** 约束活动性报告。 / The constraint activity report. */
    activityJson?: string;
    /** 有效性排名。 / The effectiveness ranking. */
    effectivenessJson?: string;
    /** 冲突解释。 / The conflict explanation. */
    conflictJson?: string;
}

/**
 * 跨阶段约束组汇总（续挖 `analysis/pipeline.rs` 的 `summarize_groups`）。
 *
 * `analysis/pipeline.rs` 剩下的 9 个未引用类型里有 7 个是 builder / adapter / pipeline（带生命周期、借 CP 快照，属真边界），
 * 真正可数据化的只有 `AnalysisGroupSummary` 与产出它的 `summarize_groups`。这一层把汇总交出去：
 * **你把已经拿到的那几份报告交进来，换一份跨阶段的组视**。
 *
 * 四条只看签名看不出来的语义（都来自领域实现）：
 * 1. **组的来源有三个**：活动性报告里出现的组、有效性排名里**带改善值**的组、冲突报告里成员所属的组。只被有效性提到
 *    但 `maxImprovement` 为空时，那一组**不会**因此出现；
 * 2. **阻塞计数按活动性报告归组**：冲突报告刻意只保存稳定身份，成员属于哪一组要去活动性报告里查；查不到的成员落进
 *    **未分组**桶（`ungroupedPresent`）——这条防的是"把阻塞算到错的组上"；
 * 3. **`maxImprovement` 取最大而不是最后**，负改善也算"观察到"；
 * 4. **排序是确定性的**：阻塞数降序 → 活跃数降序 → 组名升序；未分组（`undefined`）在 `Option` 序里排 `Some` **之前**。
 *
 * 因此行序可以直接依赖，`orderingRule()` 也把这条规则原样交出来。
 *
 * The cross-stage constraint-group aggregation from `analysis/pipeline.rs` (continuation). Seven of the nine unreferenced
 * types there are builders, adapters and pipelines (lifetime-bound, borrowing a CP snapshot — a true boundary); only
 * `AnalysisGroupSummary` and `summarize_groups` are datafiable. This layer hands over the aggregation: **submit the reports
 * you already have and receive a cross-stage group view**. Four semantics invisible from the signatures: groups materialise
 * from **three** sources, and an effectiveness entry with no improvement value does **not** bring its group into existence;
 * **blocking counts are grouped via the activity report**, so an unknown member falls into the **ungrouped** bucket
 * (`ungroupedPresent`), which prevents attributing blockers to the wrong group; `maxImprovement` takes the **maximum**,
 * negatives included; and the ordering is deterministic (blocking desc, active desc, group name asc) with `undefined`
 * (ungrouped) sorting **before** named groups per the `Option` ordering. Row order is therefore reliable, and
 * `orderingRule()` states the rule verbatim.
 */
export class AnalysisGroupAggregateReport {
    private constructor(private state: AnalysisGroupAggregateBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): AnalysisGroupAggregateReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected analysis group aggregate report text");
        }
        return invoke(() => new AnalysisGroupAggregateReport(wasm().AnalysisGroupAggregateReport.fromJson(json)));
    }
    private raw(): AnalysisGroupAggregateBinding {
        if (!this.state) throw new OspfError("Disposed", "analysis group aggregate report has been disposed");
        return this.state;
    }
    /** 组数 / The number of groups. */
    groupCount(): number { return invoke(() => this.raw().groupCount()); }
    /** 第 `position` 组的名称（未分组时为 `undefined`）/ The name of group `position`. */
    groupName(position: number): string | undefined { return invoke(() => this.raw().groupName(position)); }
    /** 第 `position` 组涉及的实例数 / Involved instances of group `position`. */
    involvedInstances(position: number): number { return invoke(() => this.raw().involvedInstances(position)); }
    /** 第 `position` 组的活跃实例数 / Active instances of group `position`. */
    activeInstances(position: number): number { return invoke(() => this.raw().activeInstances(position)); }
    /** 第 `position` 组的阻塞实例数 / Blocking instances of group `position`. */
    blockingInstances(position: number): number { return invoke(() => this.raw().blockingInstances(position)); }
    /** 第 `position` 组的最大改善 / The largest improvement in group `position`. */
    maxImprovement(position: number): number | undefined {
        return invoke(() => this.raw().maxImprovement(position));
    }
    /** 是否存在未分组桶 / Whether an ungrouped bucket exists. */
    ungroupedPresent(): boolean { return invoke(() => this.raw().ungroupedPresent()); }
    /** 涉及实例总数 / Total involved instances. */
    totalInvolved(): number { return invoke(() => this.raw().totalInvolved()); }
    /** 活跃实例总数 / Total active instances. */
    totalActive(): number { return invoke(() => this.raw().totalActive()); }
    /** 阻塞实例总数 / Total blocking instances. */
    totalBlocking(): number { return invoke(() => this.raw().totalBlocking()); }
    /** 实际参与的报告 / The reports that took part. */
    sources(): string[] { return invoke(() => Array.from(this.raw().sources())); }
    /** 排序规则（可直接依赖行序）/ The ordering rule. */
    orderingRule(): string { return invoke(() => this.raw().orderingRule()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条字段映射。 / One field mapping. */
export interface PredicateFieldMapping {
    /** 领域属性路径（照 DSL 的 `parse` 语义只裁空白）。 / The domain property path (trimmed only). */
    path: string;
    /** 后端字段表示。 / The backend field representation. */
    backendField: string;
}

/** 谓词字段解析请求。 / The predicate field-resolution request. */
export interface PredicateFieldResolutionRequest {
    /** schema 名称（不能空白）。 / The schema name (must not be blank). */
    schemaName: string;
    /** 字段映射。 / The field mappings. */
    mappings?: PredicateFieldMapping[];
    /** 要探测的路径（原文照收，不用先自己 parse）。 / The paths to probe. */
    probes?: string[];
}

/**
 * 谓词字段路径解析与 schema 映射（续挖 `persistence/expression`）。
 *
 * 那个目录 19 个未引用类型里多数是 DSL 构建器与 trait（`BooleanExpressionScope`、`ScalarFunctionDsl`、
 * `RepositoryApi`、`ExpressionRepository`）——造表达式树、跑查询，属真边界。可数据化且真有语义的是两处：
 * `PropertyPath` 的路径词汇，与 `PredicateSchema` / `FieldMapping` 的字段映射（及其四种解析结论）。
 *
 * 两条看签名看不出来的语义：
 * 1. **`parse` 只裁空白，`tryParse` 才校验标识符**。所以 DSL 里 `FieldPath.parse("a b")` 是**接受**的，但它并不是
 *    合法标识符路径；`a..b`（空分段）与 `""` 同理。报告用 `probeTrimmed()` 与 `probeValidIdentifiers()` 把这条
 *    区别摊开——"被接受"与"合法"是两件事。
 * 2. **`PersistenceFieldResolution` 四个变体里 `InvalidConfiguration` 从静态映射到达不了**：它留给运行期配置了坏
 *    resolver 的实现者。所以 `reachableResolutions()` 如实只列 `resolved` / `missing` / `ambiguous` 三种。
 *
 * 同一路径映射到多个**不同**后端字段 → `ambiguous` 并给排好序的候选；重复映射到**同一个**字段不算歧义；
 * `ambiguousPaths()` 单独列出这类路径（桥接级一致性检查）。
 *
 * Predicate field-path resolution and schema mapping (continuation). Most of the nineteen unreferenced types there are DSL
 * builders and traits — a true boundary. Two things are datafiable and semantically real: the `PropertyPath` vocabulary and
 * the `PredicateSchema` / `FieldMapping` table behind `PersistenceFieldResolution`. Two semantics are invisible from the
 * signatures: **`parse` only trims while `tryParse` validates identifiers**, so the DSL's `FieldPath.parse("a b")` is
 * **accepted** yet not a valid identifier path (`a..b` and `""` likewise) — `probeTrimmed()` and
 * `probeValidIdentifiers()` keep "accepted" and "valid" apart; and **`InvalidConfiguration` is unreachable from a static
 * mapping**, so `reachableResolutions()` honestly lists only the three reachable ones. Mapping one path to several
 * **different** backend fields yields `ambiguous` with sorted candidates, repeating the **same** field is not ambiguous, and
 * `ambiguousPaths()` names the former.
 */
export class PredicateFieldResolutionReport {
    private constructor(private state: PredicateFieldResolutionBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): PredicateFieldResolutionReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected predicate field resolution report text");
        }
        return invoke(() => new PredicateFieldResolutionReport(
            wasm().PredicateFieldResolutionReport.fromJson(json)));
    }
    private raw(): PredicateFieldResolutionBinding {
        if (!this.state) throw new OspfError("Disposed", "predicate field resolution report has been disposed");
        return this.state;
    }
    /** schema 名称 / The schema name. */
    schemaName(): string { return invoke(() => this.raw().schemaName()); }
    /** 映射条数 / The number of mappings. */
    mappingCount(): number { return invoke(() => this.raw().mappingCount()); }
    /** 第 `position` 条映射的规范化路径 / The normalized path of mapping `position`. */
    mappingPath(position: number): string { return invoke(() => this.raw().mappingPath(position)); }
    /** 探测条数 / The number of probes. */
    probeCount(): number { return invoke(() => this.raw().probeCount()); }
    /** 第 `position` 条探测的输入原文 / The raw text of probe `position`. */
    probePath(position: number): string { return invoke(() => this.raw().probePath(position)); }
    /** 第 `position` 条探测的 `parse` 结果 / The `parse` result of probe `position`. */
    probeTrimmed(position: number): string { return invoke(() => this.raw().probeTrimmed(position)); }
    /** 第 `position` 条探测是否是合法标识符路径 / Whether probe `position` is a valid identifier path. */
    probeValidIdentifiers(position: number): boolean {
        return invoke(() => this.raw().probeValidIdentifiers(position));
    }
    /** 第 `position` 条探测的分段数 / The segment count of probe `position`. */
    probeDepth(position: number): number { return invoke(() => this.raw().probeDepth(position)); }
    /** 第 `position` 条探测的第 `segment` 段 / Segment `segment` of probe `position`. */
    probeSegment(position: number, segment: number): string {
        return invoke(() => this.raw().probeSegment(position, segment));
    }
    /** 第 `position` 条探测的根分段 / The root segment of probe `position`. */
    probeRoot(position: number): string | undefined { return invoke(() => this.raw().probeRoot(position)); }
    /** 第 `position` 条探测的叶分段 / The leaf segment of probe `position`. */
    probeLeaf(position: number): string | undefined { return invoke(() => this.raw().probeLeaf(position)); }
    /** 第 `position` 条探测的解析结论 / The resolution of probe `position`. */
    probeResolution(position: number): "resolved" | "missing" | "ambiguous" {
        return invoke(() => this.raw().probeResolution(position) as "resolved" | "missing" | "ambiguous");
    }
    /** 第 `position` 条探测解析到的后端字段 / The backend field resolved for probe `position`. */
    probeBackendField(position: number): string | undefined {
        return invoke(() => this.raw().probeBackendField(position));
    }
    /** 第 `position` 条探测的候选数 / The candidate count for probe `position`. */
    probeCandidateCount(position: number): number {
        return invoke(() => this.raw().probeCandidateCount(position));
    }
    /** 第 `position` 条探测的第 `candidate` 个候选 / Candidate `candidate` for probe `position`. */
    probeCandidate(position: number, candidate: number): string {
        return invoke(() => this.raw().probeCandidate(position, candidate));
    }
    /** 歧义路径列表（按字典序）/ The ambiguous paths, sorted. */
    ambiguousPaths(): string[] { return invoke(() => Array.from(this.raw().ambiguousPaths())); }
    /** 本入口能产生的解析结论 / The resolutions this entry can produce. */
    reachableResolutions(): string[] { return invoke(() => Array.from(this.raw().reachableResolutions())); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个过滤值：`kind` 加字面文本。 / One filter value: a `kind` plus its literal text. */
export interface FilterValueSpec {
    kind: "null" | "boolean" | "number" | "string";
    /** 字面文本（`null` 时忽略）。 / The literal text (ignored for `null`). */
    text?: string;
}

/** 一个条件。 / One condition. */
export interface FilterConditionSpec {
    /** 字段路径。 / The field path. */
    path: string;
    /** `eq` / `ne` / `gt` / `ge` / `lt` / `le` / `in` / `isNull` / `isNotNull`。 */
    operator: "eq" | "ne" | "gt" | "ge" | "lt" | "le" | "in" | "isNull" | "isNotNull";
    /** 单值操作数的值。 / The value for a single-value operator. */
    value?: FilterValueSpec;
    /** `in` 的值列表。 / The values for `in`. */
    values?: FilterValueSpec[];
}

/** 提取请求。 / The extraction request. */
export interface PredicateFieldFilterRequest {
    /** `and` / `or`（`or` 用来观察三个提取器的拒绝）。 / `and` or `or`. */
    combinator: "and" | "or";
    /** 条件列表（**不能为空**：领域在空操作数上会 panic）。 / The conditions, which must not be empty. */
    conditions: FilterConditionSpec[];
}

/**
 * 谓词的三级字段过滤提取（续挖 `persistence/expression/predicate_field_filter.rs`）。
 *
 * 同一棵布尔表达式有**三个严格度不同的提取器**，各返回 `Option`：
 *
 * | 提取器 | 接受 | 拒绝 |
 * | --- | --- | --- |
 * | `eqFilters` | `And` 下的 `eq` 比较 | `ne` / 区间 / `in` / `or` |
 * | `eqOrInFilters` | `And` 下的 `eq` 与 `in` | 区间 / `or` |
 * | `fieldFilters` | `eq` / 四向区间 / `in` / `isNull` / `isNotNull` 的 `And` | `ne` / `or` / `not` |
 *
 * 五条只有读实现才知道的行为：
 * 1. **`or` 被三个提取器全部拒绝**（它们只递归 `And`）。`a = 1 or b = 2` 不是"两个过滤"，而是**没有**字段过滤。
 * 2. **重复路径静默覆盖**：`a = 1 and a = 2` 只留下**一个** `a`（后一个值），不报错。`duplicatePaths()` 把这类
 *    路径显式列出来，由调用方决定要不要拒绝。
 * 3. **空条件列表必须在这里就拒绝**：`BooleanExpression::and` / `or` 对空操作数 `assert!` 直接 panic，宿主里就是整进程崩。
 * 4. **`ne` 被 `fieldFilters` 拒绝**，而 `FieldFilter` 根本没有"不等"槽——`ne` 在领域里没有落点。
 * 5. **`eq` 配 `null` 不算等值**：`fieldFilters` 把它折进 `isNull = true` 槽（前两个提取器仍当等值）。
 *
 * 另外：反向比较（`1 < a`）**会被翻转**成 `a > 1` 而不是拒绝——这一条我最初照文档写成"反向提取不到"，读实现才发现错了。
 *
 * The three-level predicate field-filter extraction (continuation). One boolean expression faces **three extractors of
 * increasing leniency**, each returning `Option`: `eqFilters` takes `eq` under `And`; `eqOrInFilters` adds `in`;
 * `fieldFilters` takes `eq` / four interval operators / `in` / `isNull` / `isNotNull`. Five behaviours are only visible in the
 * implementation: **`or` is refused by all three** (so `a = 1 or b = 2` yields *no* field filters at all rather than two);
 * **repeated paths are silently overwritten** down to the latter value with no error, surfaced through `duplicatePaths()`;
 * **an empty condition list must be refused here** because `BooleanExpression::and` / `or` `assert!` on empty operands and a
 * panic takes the host process with it; **`ne` is refused by `fieldFilters`**, which has no inequality slot at all; and
 * **`eq` against `null` is not an equality** — `fieldFilters` folds it into the `isNull = true` slot. Reversed comparisons
 * (`1 < a`) are **flipped** into `a > 1` rather than refused, which contradicts what the documentation first suggested.
 */
export class PredicateFieldFilterReport {
    private constructor(private state: PredicateFieldFilterBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): PredicateFieldFilterReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected predicate field filter report text");
        }
        return invoke(() => new PredicateFieldFilterReport(wasm().PredicateFieldFilterReport.fromJson(json)));
    }
    private raw(): PredicateFieldFilterBinding {
        if (!this.state) throw new OspfError("Disposed", "predicate field filter report has been disposed");
        return this.state;
    }
    /** 条件数 / The number of conditions. */
    conditionCount(): number { return invoke(() => this.raw().conditionCount()); }
    /** `eqFilters` 是否成功 / Whether `eqFilters` succeeded. */
    hasEqFilters(): boolean { return invoke(() => this.raw().hasEqFilters()); }
    /** `eqOrInFilters` 是否成功 / Whether `eqOrInFilters` succeeded. */
    hasEqOrInFilters(): boolean { return invoke(() => this.raw().hasEqOrInFilters()); }
    /** `fieldFilters` 是否成功 / Whether `fieldFilters` succeeded. */
    hasFieldFilters(): boolean { return invoke(() => this.raw().hasFieldFilters()); }
    /** 等值行数 / The number of equality rows. */
    eqFilterCount(): number { return invoke(() => this.raw().eqFilterCount()); }
    /** 第 `position` 个等值行的字段 / The field of equality row `position`. */
    eqFilterField(position: number): string { return invoke(() => this.raw().eqFilterField(position)); }
    /** 第 `position` 个等值行的字面值 / The literal of equality row `position`. */
    eqFilterValue(position: number): string { return invoke(() => this.raw().eqFilterValue(position)); }
    /** 等值或 IN 行数 / The number of eq-or-in rows. */
    eqOrInCount(): number { return invoke(() => this.raw().eqOrInCount()); }
    /** 第 `position` 个 eq-or-in 行的字段 / The field of eq-or-in row `position`. */
    eqOrInField(position: number): string { return invoke(() => this.raw().eqOrInField(position)); }
    /** 第 `position` 个 eq-or-in 行的类型 / The kind of eq-or-in row `position`. */
    eqOrInKind(position: number): "eq" | "in" {
        return invoke(() => this.raw().eqOrInKind(position) as "eq" | "in");
    }
    /** 第 `position` 个 eq-or-in 行的 IN 值数 / The IN value count of eq-or-in row `position`. */
    eqOrInValueCount(position: number): number { return invoke(() => this.raw().eqOrInValueCount(position)); }
    /** 第 `position` 个 eq-or-in 行的第 `item` 个 IN 值 / IN value `item` of eq-or-in row `position`. */
    eqOrInValue(position: number, item: number): string {
        return invoke(() => this.raw().eqOrInValue(position, item));
    }
    /** 字段级行数 / The number of field-filter rows. */
    fieldFilterCount(): number { return invoke(() => this.raw().fieldFilterCount()); }
    /** 第 `position` 个字段级行的字段 / The field of field-filter row `position`. */
    fieldFilterField(position: number): string { return invoke(() => this.raw().fieldFilterField(position)); }
    /** 第 `position` 个字段级行的某个槽（`eq`/`gt`/`ge`/`lt`/`le`）/ Slot `slot` of field-filter row `position`. */
    fieldFilterSlot(position: number, slot: "eq" | "gt" | "ge" | "lt" | "le"): string | undefined {
        return invoke(() => this.raw().fieldFilterSlot(position, slot));
    }
    /** 第 `position` 个字段级行的 IN 值数 / The IN value count of field-filter row `position`. */
    fieldFilterInCount(position: number): number { return invoke(() => this.raw().fieldFilterInCount(position)); }
    /** 第 `position` 个字段级行的空值检查 / The null check of field-filter row `position`. */
    fieldFilterIsNull(position: number): boolean | undefined {
        return invoke(() => this.raw().fieldFilterIsNull(position));
    }
    /** 被拒绝的提取器 / The refused extractors. */
    rejected(): string[] { return invoke(() => Array.from(this.raw().rejected())); }
    /** 重复的字段路径（领域会静默覆盖）/ The duplicated field paths, which the domain silently overwrites. */
    duplicatePaths(): string[] { return invoke(() => Array.from(this.raw().duplicatePaths())); }
    /** 操作符词表 / The operator vocabulary. */
    operatorVocabulary(): string[] { return invoke(() => Array.from(this.raw().operatorVocabulary())); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个构建阶段快照。 / One building-stage snapshot. */
export interface BuildingStatusSpec {
    /** 模型名（不能空白）。 / The model name (must not be blank). */
    modelName: string;
    /** 阶段。 / The stage. */
    stage: "registerTokens" | "registerLinearConstraints" | "registerQuadraticConstraints"
        | "registerSymbols" | "flattenLinearModel" | "flattenQuadraticModel" | "buildObjective";
    /** 已完成数量。 / The amount ready. */
    ready: number;
    /** 总数量。 / The total amount. */
    total: number;
}

/** 配置请求。 / The configuration request. */
export interface ModelConfigurationRequest {
    /** 模型名。 / The model name. */
    name?: string;
    /** 是否启用缓存。 / Whether the cache is enabled. */
    enableCache?: boolean;
    /** 是否启用延迟求值。 / Whether lazy evaluation is enabled. */
    lazyEvaluation?: boolean;
    /** 展开策略。 / The expansion policy. */
    functionExpansionPolicy?: "eager" | "deferredNativeFirst" | "auto";
    /** 是否允许多目标。 / Whether multiple objectives are allowed. */
    multiObjective?: boolean;
    /** 最大子目标数量。 / The maximum sub-objective count. */
    maxSubObjectives?: number;
    /** 要复核的阶段快照。 / The stage snapshots to re-check. */
    statuses?: BuildingStatusSpec[];
}

/**
 * 模型构建阶段与模型配置面（续挖 `model/configuration.rs` + `model/status.rs`）。
 *
 * `model/` 里 23 个未引用类型大半是缓存键与上下文 trait（`RangeCacheKey`、`ValueCacheContextTrait`、
 * `LazyValueCacheContext`…）以及模型本体（`BasicModel`、6000 行的 `MetaModel`）——运行期状态与构建器，属真边界。
 * 纯配置与阶段才是可数据化的：
 *
 * - **`FunctionExpansionPolicy`** 三型。关键点：**`isDeferred()` 定义为 `!isEager()`**，所以 `auto` 落在 deferred
 *   一侧，不是"第三种中间态"。`policyIsEager()` / `policyIsDeferred()` 恒互为反。
 * - **配置默认值照 `Default` 实现实测**（不是照文档抄）：`enableCache = true`、`lazyEvaluation = true`、
 *   `multiObjective = true`、`maxSubObjectives = 100`、`name` 为空。`namespace`（模型名）会被裁空白。
 * - **七阶段**按领域声明顺序给出（`registerTokens` → … → `buildObjective`）。
 * - **两件领域从不校验的事**：`ModelBuildingStatus::new` 接受 `ready > total`（进度 > 1）也接受 `total = 0`
 *   （除法无意义）。这一层**不替它拒**，而是标 `statusProgressKind(i)`（`empty` / `partial` / `complete` /
 *   `overflow`）并用 `statusTotalIsZero(i)` 说明后者；`total = 0` 时进度给 `undefined` 而不是编个 `0`。
 *
 * The model-building stages and the model configuration surface (continuation). Most of the 23 unreferenced types are cache
 * keys and context traits or the model bodies (`BasicModel`, the 6000-line `MetaModel`) — runtime state and builders, a true
 * boundary. Pure configuration and stages are the datafiable part: **`FunctionExpansionPolicy`** in three forms where
 * **`isDeferred()` is defined as `!isEager()`**, so `auto` sits on the deferred side rather than being a third middle state;
 * the configuration **defaults measured from the `Default` implementations** (`enableCache`, `lazyEvaluation`,
 * `multiObjective` all `true`, `maxSubObjectives` `100`, an empty name); the seven stages in domain order; and **two things
 * the domain never validates** — `ModelBuildingStatus::new` accepts `ready > total` (progress above 1) and `total = 0` (a
 * meaningless division). This layer does not refuse them: it labels them through `statusProgressKind(i)` (`empty` / `partial`
 * / `complete` / `overflow`) plus `statusTotalIsZero(i)`, and reports `undefined` progress for `total = 0` rather than
 * inventing a zero.
 */
export class ModelConfigurationReport {
    private constructor(private state: ModelConfigurationBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): ModelConfigurationReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected model configuration report text");
        }
        return invoke(() => new ModelConfigurationReport(wasm().ModelConfigurationReport.fromJson(json)));
    }
    private raw(): ModelConfigurationBinding {
        if (!this.state) throw new OspfError("Disposed", "model configuration report has been disposed");
        return this.state;
    }
    /** 模型名 / The model name. */
    name(): string { return invoke(() => this.raw().name()); }
    /** 是否启用缓存 / Whether the cache is enabled. */
    enableCache(): boolean { return invoke(() => this.raw().enableCache()); }
    /** 是否启用延迟求值 / Whether lazy evaluation is enabled. */
    lazyEvaluation(): boolean { return invoke(() => this.raw().lazyEvaluation()); }
    /** 展开策略 / The expansion policy. */
    functionExpansionPolicy(): "eager" | "deferredNativeFirst" | "auto" {
        return invoke(() => this.raw().functionExpansionPolicy() as "eager" | "deferredNativeFirst" | "auto");
    }
    /** 该策略是否在建模阶段展开 / Whether that policy expands during building. */
    policyIsEager(): boolean { return invoke(() => this.raw().policyIsEager()); }
    /** 该策略是否保留结构（`auto` 也算）/ Whether it defers (`auto` included). */
    policyIsDeferred(): boolean { return invoke(() => this.raw().policyIsDeferred()); }
    /** 是否允许多目标 / Whether multiple objectives are allowed. */
    multiObjective(): boolean { return invoke(() => this.raw().multiObjective()); }
    /** 最大子目标数量 / The maximum sub-objective count. */
    maxSubObjectives(): number { return invoke(() => this.raw().maxSubObjectives()); }
    /** 阶段词表（七阶段，按领域顺序）/ The stage vocabulary. */
    stageVocabulary(): string[] { return invoke(() => Array.from(this.raw().stageVocabulary())); }
    /** 策略词表 / The policy vocabulary. */
    policyVocabulary(): string[] { return invoke(() => Array.from(this.raw().policyVocabulary())); }
    /** 快照条数 / The number of snapshots. */
    statusCount(): number { return invoke(() => this.raw().statusCount()); }
    /** 第 `position` 条快照的阶段 / The stage of snapshot `position`. */
    statusStage(position: number): string { return invoke(() => this.raw().statusStage(position)); }
    /** 第 `position` 条快照的阶段序号 / The stage index of snapshot `position`. */
    statusStageIndex(position: number): number { return invoke(() => this.raw().statusStageIndex(position)); }
    /** 第 `position` 条快照的进度标签 / The progress label of snapshot `position`. */
    statusProgressKind(position: number): "empty" | "partial" | "complete" | "overflow" {
        return invoke(() => this.raw().statusProgressKind(position) as
            "empty" | "partial" | "complete" | "overflow");
    }
    /** 第 `position` 条快照的进度 / The progress of snapshot `position`. */
    statusProgress(position: number): number | undefined {
        return invoke(() => this.raw().statusProgress(position));
    }
    /** 第 `position` 条快照的总数是否为零 / Whether snapshot `position` has a zero total. */
    statusTotalIsZero(position: number): boolean {
        return invoke(() => this.raw().statusTotalIsZero(position));
    }
    /** 默认最大子目标数量 / The default maximum sub-objective count. */
    defaultsMaxSubObjectives(): number { return invoke(() => this.raw().defaultsMaxSubObjectives()); }
    /** 默认展开策略 / The default expansion policy. */
    defaultsFunctionExpansionPolicy(): string {
        return invoke(() => this.raw().defaultsFunctionExpansionPolicy());
    }
    /** 默认是否启用缓存 / The default cache flag. */
    defaultsEnableCache(): boolean { return invoke(() => this.raw().defaultsEnableCache()); }
    /** 默认是否启用延迟求值 / The default lazy-evaluation flag. */
    defaultsLazyEvaluation(): boolean { return invoke(() => this.raw().defaultsLazyEvaluation()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个求值缓存键。 / One value-cache key. */
export interface ValueKeySpec {
    kind: "polynomial" | "intermediateSymbol" | "objective";
    objectId: number;
}

/** 一个范围缓存键。 / One range-cache key. */
export interface RangeKeySpec {
    objectId: number;
}

/** 一条回放操作。 / One replayed operation. */
export interface CacheOperationSpec {
    operation: "set" | "get" | "getOrCompute" | "clear" | "clearObject" | "len";
    /** 求值缓存键（`range = false` 时用）。 / The value-cache key. */
    valueKey?: ValueKeySpec;
    /** 范围缓存键（`range = true` 时用）。 / The range-cache key. */
    rangeKey?: RangeKeySpec;
    /** `set` / `getOrCompute` 写入的值。 / The value written by `set` / `getOrCompute`. */
    value?: number;
    /** 作用在哪一个缓存上。 / Which cache the operation targets. */
    range?: boolean;
}

/** 回放请求。 / The replay request. */
export interface CacheKeyIdentityRequest {
    /** 要比较身份的一组求值缓存键。 / The value-cache keys whose identity is compared. */
    valueKeys?: ValueKeySpec[];
    /** 要比较身份的一组范围缓存键。 / The range-cache keys whose identity is compared. */
    rangeKeys?: RangeKeySpec[];
    /** 操作序列。 / The operation log. */
    operations?: CacheOperationSpec[];
}

/**
 * 求值缓存与范围缓存的键身份及上下文语义（续挖 `model/value_cache.rs` + `model/range_cache.rs`）。
 *
 * 两个缓存长得几乎一样，但**键不一样**，这个不对称是这一层的核心：
 *
 * - **`ValueCacheKey { kind, objectId }`**：三型 + 对象 ID。同一个数字 ID 在 `polynomial` / `intermediateSymbol` /
 *   `objective` 下是**三个不同的键**，互不覆盖。
 * - **`RangeCacheKey { objectId }`**：**只有对象 ID**。所以范围缓存里**没有任何 kind 可以区分**——同一个数字 ID
 *   无论当作多项式地址还是符号 ID，都落进同一个槽。`sameIdCollidesInRangeCache()` 就是这么来的。
 *
 * 桥接不重写任何缓存逻辑：`get` / `set` / `getOrCompute` / `clear` / `clearObject` / `len` 全是 trait 的**默认方法**，
 * 这一层只提供 `VecTokenList` 支撑的上下文并回放操作序列。两条只有读实现才知道的行为：
 * 1. **`getOrCompute` 命中时不调用计算器**（`entry().or_insert_with`）——`operationComputed(i)` 给出证据；
 * 2. **`clearObject` 返回布尔**，是"删除是否命中"的唯一信号。
 *
 * 键身份用**上三角等值矩阵**给出（`valueEqualRow(i)` / `rangeEqualRow(i)`，返回 `0`/`1` 的数组），
 * 这样"哪些键相等"可以逐对断言，而不是只看总数。
 *
 * The value- and range-cache key identity (continuation). The two caches look almost identical, but their **keys differ**, and
 * that asymmetry is the core: **`ValueCacheKey { kind, objectId }`** carries three kinds plus an object ID, so one numeric ID
 * under `polynomial` / `intermediateSymbol` / `objective` is **three distinct keys** that never overwrite each other; while
 * **`RangeCacheKey { objectId }`** carries **only the ID**, so the range cache has **no kind to distinguish** and one numeric
 * ID lands in one slot whatever it means — which is what `sameIdCollidesInRangeCache()` reports. The bridge rewrites no cache
 * logic: every operation is a trait **default method**, and this layer only supplies a `VecTokenList`-backed context and
 * replays the log. Two behaviours come straight from the implementation: **`getOrCompute` does not call the computer on a
 * hit** (`operationComputed(i)` is the evidence), and **`clearObject` returns a boolean**, the only signal that a removal hit.
 * Key identity is exposed as an **upper-triangular equality matrix** (`valueEqualRow(i)` / `rangeEqualRow(i)` returning `0`/`1`
 * arrays), so equality is assertable pair by pair rather than only as a total.
 */
export class CacheKeyIdentityReport {
    private constructor(private state: CacheKeyIdentityBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): CacheKeyIdentityReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected cache key identity report text");
        }
        return invoke(() => new CacheKeyIdentityReport(wasm().CacheKeyIdentityReport.fromJson(json)));
    }
    private raw(): CacheKeyIdentityBinding {
        if (!this.state) throw new OspfError("Disposed", "cache key identity report has been disposed");
        return this.state;
    }
    /** 求值缓存去重后的键数 / The distinct value-key count. */
    valueDistinct(): number { return invoke(() => this.raw().valueDistinct()); }
    /** 范围缓存去重后的键数 / The distinct range-key count. */
    rangeDistinct(): number { return invoke(() => this.raw().rangeDistinct()); }
    /** 求值键是否含 kind / Whether the value key includes the kind. */
    valueKeyIncludesKind(): boolean { return invoke(() => this.raw().valueKeyIncludesKind()); }
    /** 范围键是否含 kind / Whether the range key includes a kind. */
    rangeKeyIncludesKind(): boolean { return invoke(() => this.raw().rangeKeyIncludesKind()); }
    /** 不同 kind 是否把键分开 / Whether kinds keep value keys apart. */
    kindsSeparateValueKeys(): boolean { return invoke(() => this.raw().kindsSeparateValueKeys()); }
    /** 同一 ID 在范围缓存是否撞到一起 / Whether one ID collides in the range cache. */
    sameIdCollidesInRangeCache(): boolean { return invoke(() => this.raw().sameIdCollidesInRangeCache()); }
    /** 求值键相等矩阵的第 `row` 行（`1` 表示相等）/ Row `row` of the value-key equality matrix. */
    valueEqualRow(row: number): number[] { return invoke(() => Array.from(this.raw().valueEqualRow(row))); }
    /** 范围键相等矩阵的第 `row` 行 / Row `row` of the range-key equality matrix. */
    rangeEqualRow(row: number): number[] { return invoke(() => Array.from(this.raw().rangeEqualRow(row))); }
    /** 回放条数 / The number of replayed operations. */
    operationCount(): number { return invoke(() => this.raw().operationCount()); }
    /** 第 `position` 条回放的操作名 / The operation name of row `position`. */
    operationName(position: number): string { return invoke(() => this.raw().operationName(position)); }
    /** 第 `position` 条回放作用在哪个缓存 / The cache targeted by row `position`. */
    operationCache(position: number): "value" | "range" {
        return invoke(() => this.raw().operationCache(position) as "value" | "range");
    }
    /** 第 `position` 条回放的返回值 / The returned value of row `position`. */
    operationResult(position: number): number | undefined {
        return invoke(() => this.raw().operationResult(position));
    }
    /** 第 `position` 条回放是否清到了东西 / Whether row `position` removed anything. */
    operationRemoved(position: number): boolean | undefined {
        return invoke(() => this.raw().operationRemoved(position));
    }
    /** 第 `position` 条回放后的缓存长度 / The cache length after row `position`. */
    operationLength(position: number): number { return invoke(() => this.raw().operationLength(position)); }
    /** 第 `position` 条回放是否真的计算了 / Whether row `position` actually computed. */
    operationComputed(position: number): boolean | undefined {
        return invoke(() => this.raw().operationComputed(position));
    }
    /** 求值缓存种类词表 / The value-cache kind vocabulary. */
    kindVocabulary(): string[] { return invoke(() => Array.from(this.raw().kindVocabulary())); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一组用相等值构造的对象。 / A group of objects built from equal values. */
export interface EqualValueGroup {
    /** 该组每个对象携带的值。 / The value every object in the group carries. */
    value: number;
    /** 造几个对象（至少 1）。 / How many objects to build (at least one). */
    count: number;
}

/** 缓存键身份请求。 / The cache-key identity request. */
export interface CacheKeyAddressRequest {
    /** 用相等值构造的 `Arc` 组。 / The `Arc` groups built from equal values. */
    arcGroups?: EqualValueGroup[];
    /** 用相等值构造的 `Box` 组。 / The `Box` groups built from equal values. */
    boxGroups?: EqualValueGroup[];
    /** 直接构造的原始地址。 / The raw addresses to construct directly. */
    rawAddresses?: number[];
}

/**
 * 平展缓存键的身份是**地址**而不是值（续挖 `model/flatten/cache_key.rs`）。
 *
 * `CacheKey { value: u64 }` 的值来自 `Arc::as_ptr` / `&T as *const T as u64`——**它是内存地址**。所以：
 *
 * 1. **同一个 `Arc` 取两次 → 同一个键**；
 * 2. **两个值相等的 `Arc` → 两个不同的键**。`Arc::new(42)` 两次得到的键不等——这是最容易想当然搞错的一点：
 *    缓存身份是**指针相同**，不是 `==` 成立（`distinctArcsDistinctKeys()` 就是这条的实测）；
 * 3. **两个值相等的 `Box` 同理**；
 * 4. **`rawAddress(0)` 是合法的**：地址空间里 0 可表示，所以"空键"与真键在类型层分不开；
 * 5. **已知上限（刻意不修）**：地址会被复用——一个 `Box` 释放后，新分配的 `Box` **可能**落在同一地址，于是旧键
 *    命中新对象。`addressReuseHazard()` 如实标注，`cacheableRequirement()` 给出实现者必须保证的事
 *    （"对象在其键被使用期间必须保持地址稳定"）。
 *
 * 第 5 条是真实的工程天花板：地址键换来 O(1) 身份判定，代价是**生命周期约束**。这条不能靠改桥接消除。
 *
 * The flatten cache key's identity is an **address**, not a value (continuation). `CacheKey { value: u64 }` comes from
 * `Arc::as_ptr` / `&T as *const T as u64`, so the same `Arc` yields the same key while **two `Arc`s with equal values yield
 * two different keys** — cache identity is pointer identity, not `==` (what `distinctArcsDistinctKeys()` measures), and `Box`
 * behaves identically. `rawAddress(0)` is legal because zero is representable, so an "empty" key cannot be told apart at the
 * type level. The known ceiling, deliberately unfixed, is **address reuse**: a freed `Box`'s address may be handed to a new
 * allocation and a stale key will hit a new object — `addressReuseHazard()` labels it and `cacheableRequirement()` states what
 * implementors must guarantee. It is a real engineering ceiling: address keys buy O(1) identity at the price of a lifetime
 * constraint that no bridge change can remove.
 */
export class CacheKeyAddressReport {
    private constructor(private state: CacheKeyAddressBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): CacheKeyAddressReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected cache key address report text");
        }
        return invoke(() => new CacheKeyAddressReport(wasm().CacheKeyAddressReport.fromJson(json)));
    }
    private raw(): CacheKeyAddressBinding {
        if (!this.state) throw new OspfError("Disposed", "cache key address report has been disposed");
        return this.state;
    }
    /** `Arc` 组数 / The number of `Arc` groups. */
    arcGroupCount(): number { return invoke(() => this.raw().arcGroupCount()); }
    /** 第 `group` 组的 `Arc` 键数 / The key count of `Arc` group `group`. */
    arcKeyCount(group: number): number { return invoke(() => this.raw().arcKeyCount(group)); }
    /** 第 `group` 组第 `position` 个 `Arc` 键 / Key `position` of `Arc` group `group`. */
    arcKey(group: number, position: number): number { return invoke(() => this.raw().arcKey(group, position)); }
    /** `Box` 组数 / The number of `Box` groups. */
    boxGroupCount(): number { return invoke(() => this.raw().boxGroupCount()); }
    /** 第 `group` 组第 `position` 个 `Box` 键 / Key `position` of `Box` group `group`. */
    boxKey(group: number, position: number): number { return invoke(() => this.raw().boxKey(group, position)); }
    /** 原始地址条数 / The number of raw addresses. */
    rawCount(): number { return invoke(() => this.raw().rawCount()); }
    /** 第 `position` 个原始地址 / Raw address `position`. */
    rawAddress(position: number): number { return invoke(() => this.raw().rawAddress(position)); }
    /** 同一个 `Arc` 取两次是否同键 / Whether one `Arc` twice yields one key. */
    sameArcSameKey(): boolean { return invoke(() => this.raw().sameArcSameKey()); }
    /** 同一个 `Box` 取两次是否同键 / Whether one `Box` twice yields one key. */
    sameBoxSameKey(): boolean { return invoke(() => this.raw().sameBoxSameKey()); }
    /** 值相同的不同 `Arc` 是否给出不同键 / Whether equal-valued distinct `Arc`s differ. */
    distinctArcsDistinctKeys(): boolean { return invoke(() => this.raw().distinctArcsDistinctKeys()); }
    /** 值相同的不同 `Box` 是否给出不同键 / Whether equal-valued distinct `Box`s differ. */
    distinctBoxesDistinctKeys(): boolean { return invoke(() => this.raw().distinctBoxesDistinctKeys()); }
    /** 身份是否是地址而不是值 / Whether identity is the address rather than the value. */
    addressIdentity(): boolean { return invoke(() => this.raw().addressIdentity()); }
    /** `from_raw(0)` 是否被接受 / Whether `from_raw(0)` is accepted. */
    zeroAddressIsRepresentable(): boolean { return invoke(() => this.raw().zeroAddressIsRepresentable()); }
    /** 地址复用隐患 / The address-reuse hazard. */
    addressReuseHazard(): boolean { return invoke(() => this.raw().addressReuseHazard()); }
    /** `Cacheable` 对实现者的要求 / What `Cacheable` demands of implementors. */
    cacheableRequirement(): string { return invoke(() => this.raw().cacheableRequirement()); }
    /** 原始地址上限（`2^53 - 1`，JS 安全整数）/ The raw-address ceiling (the JS safe integer). */
    rawAddressCeiling(): number { return invoke(() => this.raw().rawAddressCeiling()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个符号的定义。 / A symbol definition. */
export interface FlattenSymbolSpec {
    /** 唯一标识符（`flattenCached` 的缓存键）。 / The unique identifier (the `flattenCached` key). */
    identifier: number;
    /** 平展结果。 / The flatten result. */
    value: number;
    /** 依赖的其他符号标识符。 / The dependent symbol identifiers. */
    dependencies?: number[];
}

/** 一条缓存操作。 / One cache operation. */
export interface FlattenCacheOperation {
    operation: "flattenCached" | "flattenForce" | "areDependenciesCached" | "clearDependencyCaches"
        | "clearPolynomial" | "clearSymbol" | "clearMonomial" | "clearItems" | "clear"
        | "cacheSize" | "isCacheEmpty";
    /** 参与该操作的符号。 / The symbol the operation works on. */
    symbol?: FlattenSymbolSpec;
    /** 参与该操作的标识符。 / The identifiers the operation works on. */
    identifiers?: number[];
}

/** 平展缓存请求。 / The flatten-cache request. */
export interface FlattenCacheRequest {
    /** 操作序列。 / The operation log. */
    operations?: FlattenCacheOperation[];
}

/**
 * 平展缓存的三条路径（续挖 `model/flatten/flatten_context.rs` + `flattenable.rs`）。
 *
 * `flatten_context` / `flattenable` 一共 11 个未引用类型，但它们不是 11 个独立的东西：`FlattenContextTrait` 的
 * **默认方法**就是全部语义。这一层把它们变成可断言的事实：
 *
 * | 路径 | 实测行为 |
 * | --- | --- |
 * | `flattenCached` | 命中直接返回缓存，**不调用 flatten**；未命中则平展并写入 |
 * | `flattenForce` | **总是**重新平展并**覆盖**缓存（后续 `flattenCached` 看到新值） |
 * | `clearPolynomial` / `clearSymbol` / `clearMonomial` | 返回"是否清到了"，三张缓存**各管各的** |
 * | `areDependenciesCached` | 只有**全部**依赖在多项式缓存里才为真 |
 * | `clearDependencyCaches` | 逐个 `clearPolynomial`，其他缓存不动 |
 * | `cacheSize` / `isCacheEmpty` | 三张缓存之和 / 三者皆空 |
 *
 * 三条最容易踩的坑：
 * 1. **`flattenCached` 用 `identifier` 当键**。两个对象只要标识符相同就**共用同一个槽**——第二个拿到第一个的缓存值，
 *    而 `flatten` 根本不会被调用（`operationFlattened(i)` 给出证据）。这是"标识符必须唯一"的真实后果。
 * 2. **`flattenForce` 之后缓存是新值**：它先算再写，是"覆盖缓存"而不是"跳过缓存"。
 * 3. **`clearPolynomial` 不影响 symbol / monomial 缓存**：只清一张不会让另两张变空。
 *
 * `flattenCalls()` 是总平展次数的独立计数，`operationFlattened(i)` 是逐条的——两者必须一致，所以"命中不发算"
 * 这件事可以逐条断言而不只是看总数。
 *
 * The three paths through the flatten cache (continuation). The eleven unreferenced types there are not eleven independent
 * things: the **default methods** of `FlattenContextTrait` are the whole semantics. `flattenCached` returns the cached value
 * **without calling flatten** on a hit; `flattenForce` **always** re-flattens and **overwrites**; the three `clear_*` methods
 * report whether they hit and leave the other two caches alone; `areDependenciesCached` needs **every** dependency in the
 * polynomial cache; `clearDependencyCaches` clears exactly those. Three traps: **`flattenCached` keys on `identifier`**, so two
 * objects sharing one **share a slot** and the second reads the first's value with flatten never running (evidence via
 * `operationFlattened(i)`) — the real consequence of "identifiers must be unique"; **after `flattenForce` the cache holds the
 * new value**, since it computes then writes rather than skipping; and **`clearPolynomial` leaves the symbol and monomial
 * caches untouched**. `flattenCalls()` is an independent total and `operationFlattened(i)` is per-row, so "a hit does not
 * compute" is assertable row by row rather than only in aggregate.
 */
export class FlattenCacheReport {
    private constructor(private state: FlattenCacheBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): FlattenCacheReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected flatten cache report text");
        }
        return invoke(() => new FlattenCacheReport(wasm().FlattenCacheReport.fromJson(json)));
    }
    private raw(): FlattenCacheBinding {
        if (!this.state) throw new OspfError("Disposed", "flatten cache report has been disposed");
        return this.state;
    }
    /** 操作条数 / The number of operations. */
    operationCount(): number { return invoke(() => this.raw().operationCount()); }
    /** 第 `position` 条操作名 / The operation name of row `position`. */
    operationName(position: number): string { return invoke(() => this.raw().operationName(position)); }
    /** 第 `position` 条返回的多项式 / The polynomial returned by row `position`. */
    operationValue(position: number): number | undefined {
        return invoke(() => this.raw().operationValue(position));
    }
    /** 第 `position` 条的真值结论 / The boolean verdict of row `position`. */
    operationFlag(position: number): boolean | undefined {
        return invoke(() => this.raw().operationFlag(position));
    }
    /** 第 `position` 条是否清到了 / Whether row `position` cleared anything. */
    operationRemoved(position: number): boolean | undefined {
        return invoke(() => this.raw().operationRemoved(position));
    }
    /** 第 `position` 条报告的缓存总数 / The cache size reported by row `position`. */
    operationCacheSize(position: number): number | undefined {
        return invoke(() => this.raw().operationCacheSize(position));
    }
    /** 第 `position` 条是否真的平展了 / Whether row `position` actually flattened. */
    operationFlattened(position: number): boolean | undefined {
        return invoke(() => this.raw().operationFlattened(position));
    }
    /** 第 `position` 条之后的缓存总数 / The total cache size after row `position`. */
    operationLengthAfter(position: number): number { return invoke(() => this.raw().operationLengthAfter(position)); }
    /** 第 `position` 条之后的多项式缓存大小 / The polynomial cache size after row `position`. */
    operationPolynomialsAfter(position: number): number {
        return invoke(() => this.raw().operationPolynomialsAfter(position));
    }
    /** 最终缓存总数 / The final total cache size. */
    finalCacheSize(): number { return invoke(() => this.raw().finalCacheSize()); }
    /** 最终是否为空 / Whether the cache ends empty. */
    finalIsEmpty(): boolean { return invoke(() => this.raw().finalIsEmpty()); }
    /** `flatten` 的总调用次数 / The total number of `flatten` calls. */
    flattenCalls(): number { return invoke(() => this.raw().flattenCalls()); }
    /** 操作词表 / The operation vocabulary. */
    operationVocabulary(): string[] { return invoke(() => Array.from(this.raw().operationVocabulary())); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个字面值。 / One literal value. */
export interface UpdateAssignmentValue {
    kind: "null" | "boolean" | "number" | "string";
    /** 字面文本（`null` 时忽略）。 / The literal text (ignored for `null`). */
    text?: string;
}

/** 表达式项。 / One expression term. */
export interface AssignmentExpressionSpec {
    /** `reference`（读另一字段）/ `constant`（字面值）/ `add`（两项相加）。 */
    kind: "reference" | "constant" | "add";
    /** `reference` 的路径。 / The `reference` path. */
    path?: string;
    /** `constant` 的值。 / The `constant` value. */
    value?: UpdateAssignmentValue;
    /** `add` 的两个操作数。 / The two operands of `add`. */
    operands?: AssignmentExpressionSpec[];
}

/** 一条赋值。 / One assignment. */
export interface UpdateAssignmentSpec {
    /** 目标字段路径（不能空白）。 / The target field path (must not be blank). */
    path: string;
    kind: "setValue" | "setNull" | "setExpression";
    /** `setValue` 的值。 / The value for `setValue`. */
    value?: UpdateAssignmentValue;
    /** `setExpression` 的表达式。 / The expression for `setExpression`. */
    expression?: AssignmentExpressionSpec;
}

/** 一组赋值。 / One group of assignments. */
export interface AssignmentGroup {
    /** 组名（只用于报告）。 / The group name (reporting only). */
    name: string;
    /** 组内赋值（按顺序）。 / The assignments, in order. */
    assignments?: UpdateAssignmentSpec[];
}

/** 赋值组合请求。 / The assignment-composition request. */
export interface UpdateAssignmentRequest {
    /** 要按顺序 `then` 起来的若干组。 / The groups combined through `then`, in order. */
    groups?: AssignmentGroup[];
}

/**
 * 更新赋值的三型与组合语义（续挖 `persistence/expression/update_assignment.rs`）。
 *
 * 那四个未引用类型是同一件事的三个变体加一个容器，都**没有 serde**，所以线格式由这一层定义，但语义一条不重写：
 * 全部走领域构造器（`UpdateAssignments::empty()` 起手，`then` / `thenSet` / `thenSetNull` / `thenSetExpr` 叠加）。
 *
 * 五条可断言的事实：
 * 1. **三型各有载荷**：`setValue` 带值、`setNull` 不带值、`setExpression` 带表达式；`itemPath(i)` 对三型都返回目标路径。
 * 2. **`then` 按顺序拼接，不排序、不去重**。组合顺序就是**执行顺序**——对"先读后写"的赋值是语义而不是风格。
 * 3. **同一路径重复赋值，领域不拒**：`items` 里会有两条，谁生效由后端决定。所以 `duplicatePaths()` 只**列出**，
 *    不替它拒。
 * 4. **`setNull` 与 `setValue(null)` 不是同一个东西**：前者是 `SetNull` 变体、后者是 `SetValue(ExpressionValue::Null)`，
 *    后端可能映射成不同的语句。这一层不合并它们。
 * 5. **空集合合法**：`isEmpty()` 为真，`then` 一个空组不改变任何东西。
 *
 * The three update-assignment kinds and how they compose (continuation). Those four types are three variants plus a container,
 * none with serde, so the wire format belongs to this layer while no semantics are rewritten: everything goes through the
 * domain constructors (`UpdateAssignments::empty()` then `then` / `thenSet` / `thenSetNull` / `thenSetExpr`). Five facts:
 * each kind carries its own payload and `itemPath(i)` names the target for all three; **`then` concatenates in order without
 * sorting or deduplicating**, so composition order is execution order — a semantic property for read-then-write assignments;
 * **assigning one path twice is not refused**, the container just holds two items and the backend decides, so
 * `duplicatePaths()` only **lists** them; **`setNull` and `setValue(null)` are not the same thing** (`SetNull` versus
 * `SetValue(ExpressionValue::Null)`, possibly different backend statements) and this layer never merges them; and an empty set
 * is legal, with `then` of an empty group changing nothing.
 */
export class UpdateAssignmentReport {
    private constructor(private state: UpdateAssignmentBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): UpdateAssignmentReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected update assignment report text");
        }
        return invoke(() => new UpdateAssignmentReport(wasm().UpdateAssignmentReport.fromJson(json)));
    }
    private raw(): UpdateAssignmentBinding {
        if (!this.state) throw new OspfError("Disposed", "update assignment report has been disposed");
        return this.state;
    }
    /** 组数 / The number of groups. */
    groupCount(): number { return invoke(() => this.raw().groupCount()); }
    /** 合并后的条数 / The number of items in the combined set. */
    itemCount(): number { return invoke(() => this.raw().itemCount()); }
    /** 合并是否为空 / Whether the combined set is empty. */
    isEmpty(): boolean { return invoke(() => this.raw().isEmpty()); }
    /** 第 `position` 条的目标路径 / The target path of item `position`. */
    itemPath(position: number): string { return invoke(() => this.raw().itemPath(position)); }
    /** 第 `position` 条的赋值类型 / The kind of item `position`. */
    itemKind(position: number): "setValue" | "setNull" | "setExpression" {
        return invoke(() => this.raw().itemKind(position) as "setValue" | "setNull" | "setExpression");
    }
    /** 第 `position` 条的值或表达式文本 / The payload text of item `position`. */
    itemPayload(position: number): string | undefined { return invoke(() => this.raw().itemPayload(position)); }
    /** 第 `position` 条所属组 / The owning group of item `position`. */
    itemGroup(position: number): string { return invoke(() => this.raw().itemGroup(position)); }
    /** 合并后的路径序列（顺序即执行顺序）/ The combined path sequence. */
    paths(): string[] { return invoke(() => Array.from(this.raw().paths())); }
    /** 重复路径（领域不拒，只列出）/ The duplicate paths. */
    duplicatePaths(): string[] { return invoke(() => Array.from(this.raw().duplicatePaths())); }
    /** 第 `position` 组的条数 / The item count of group `position`. */
    groupSize(position: number): number { return invoke(() => this.raw().groupSize(position)); }
    /** 赋值类型词表 / The kind vocabulary. */
    kindVocabulary(): string[] { return invoke(() => Array.from(this.raw().kindVocabulary())); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个字面值。 / One literal value. */
export interface ScopeValue {
    kind: "null" | "boolean" | "number" | "string";
    /** 字面文本（`null` 时忽略）。 / The literal text (ignored for `null`). */
    text?: string;
}

/** 一次收集。 / One collection step. */
export interface ScopeStep {
    collector: "eq" | "ne" | "gt" | "ge" | "lt" | "le" | "in" | "notIn" | "isNull" | "isNotNull";
    /** 字段路径。 / The field path. */
    path: string;
    /** 单值操作数的值。 / The value for a single-value collector. */
    value?: ScopeValue;
    /** `in` / `notIn` 的值列表。 / The values for `in` / `notIn`. */
    values?: ScopeValue[];
}

/** 作用域请求。 / The scope request. */
export interface BooleanScopeRequest {
    /** 收集步骤（按顺序）。 / The collection steps, in order. */
    steps?: ScopeStep[];
    /** `and` 或 `or`。 / `and` or `or`. */
    build: "and" | "or";
}

/**
 * 布尔表达式作用域的收集与组合语义（续挖 `persistence/expression/boolean_expression_dsl.rs`）。
 *
 * `BooleanExpressionScope` 是个很薄的门面：每个收集器**先把表达式塞进作用域、再把它返回**，最后 `build_and` /
 * `build_or` 一次性组合。看着没什么，但三条实测语义决定空集合与单集合的行为，很容易被想当然搞错：
 *
 * 1. **空作用域的组合有恒等元**：`build_and` 对零个表达式给出 `Constant(True)`，`build_or` 给出 `Constant(False)`。
 *    "没有条件"在两个方向上含义**正好相反**——把两者混同会让"无条件过滤"变成"全拒绝"。
 *    `emptyAndShape()` / `emptyOrShape()` 把这对恒等元直接交出来。
 * 2. **单个表达式不会被包一层**：恰好一个操作数时直接返回那个表达式，不出现 `And([x])` / `Or([x])`
 *    （`singleIsWrapped()` 恒为 `false`）。所以"结果形状"能反推作用域里有几条。
 * 3. **实测纠正：`notIn` 不是 `Not(In(...))`**，而是 `In { negated: true }` —— 取反是 **节点自带的标志**。
 *    所以 `stepShape(i)` 会给出 `inNegated` 而不是 `not`；这一条只读 DSL 的方法名会判错。
 *
 * `stepShape(i)` 是每一步**返回值**的形状（`comparison` / `in` / `inNegated` / `nullCheck` / `and` / `or`），
 * 所以"某个收集器到底产出什么节点"可以直接断言，而不必靠猜。
 *
 * How the boolean-expression scope collects and combines (continuation). The scope is a thin facade: every collector
 * **pushes the expression and returns it**, then the builder combines once. Three measured semantics decide the empty and
 * single cases: **an empty scope has identity elements** — `build_and` over zero expressions yields `Constant(True)` and
 * `build_or` yields `Constant(False)`, so "no conditions" means **opposite** things in the two directions (conflating them
 * turns "unfiltered" into "reject everything"), exposed through `emptyAndShape()` / `emptyOrShape()`; **a single expression is
 * never wrapped**, both builders return it directly rather than `And([x])` / `Or([x])` (`singleIsWrapped()` is always false),
 * so the shape reveals the item count; and **a measured correction: `notIn` is not `Not(In(...))`** but
 * `In { negated: true }` — negation is a **flag on the node**, so `stepShape(i)` reports `inNegated`, which reading the DSL's
 * method names alone would get wrong. Every step's returned shape is reported, so "what node does this collector produce" is
 * directly assertable instead of guessed.
 */
export class BooleanScopeReport {
    private constructor(private state: BooleanScopeBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): BooleanScopeReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected boolean scope report text");
        }
        return invoke(() => new BooleanScopeReport(wasm().BooleanScopeReport.fromJson(json)));
    }
    private raw(): BooleanScopeBinding {
        if (!this.state) throw new OspfError("Disposed", "boolean scope report has been disposed");
        return this.state;
    }
    /** 收集步骤数 / The number of collection steps. */
    stepCount(): number { return invoke(() => this.raw().stepCount()); }
    /** 组合方向 / The combine direction. */
    build(): "and" | "or" { return invoke(() => this.raw().build() as "and" | "or"); }
    /** 组合后的形状 / The combined shape. */
    shape(): string { return invoke(() => this.raw().shape()); }
    /** 组合后的操作数个数 / The combined operand count. */
    operandCount(): number { return invoke(() => this.raw().operandCount()); }
    /** 组合结果是否是恒真常量 / Whether the result is the constant true. */
    isConstantTrue(): boolean { return invoke(() => this.raw().isConstantTrue()); }
    /** 组合结果是否是恒假常量 / Whether the result is the constant false. */
    isConstantFalse(): boolean { return invoke(() => this.raw().isConstantFalse()); }
    /** 第 `position` 步的收集器名 / The collector name of step `position`. */
    stepCollector(position: number): string { return invoke(() => this.raw().stepCollector(position)); }
    /** 第 `position` 步返回表达式的形状 / The shape returned by step `position`. */
    stepShape(position: number): string { return invoke(() => this.raw().stepShape(position)); }
    /** 第 `position` 步返回表达式的操作数个数 / The operand count returned by step `position`. */
    stepOperandCount(position: number): number { return invoke(() => this.raw().stepOperandCount(position)); }
    /** 空作用域在 `and` 下的形状（恒真）/ The shape of an empty scope under `and`. */
    emptyAndShape(): string { return invoke(() => this.raw().emptyAndShape()); }
    /** 空作用域在 `or` 下的形状（恒假）/ The shape of an empty scope under `or`. */
    emptyOrShape(): string { return invoke(() => this.raw().emptyOrShape()); }
    /** 单表达式是否被包了一层 / Whether a single expression gets wrapped. */
    singleIsWrapped(): boolean { return invoke(() => this.raw().singleIsWrapped()); }
    /** 收集器词表 / The collector vocabulary. */
    collectorVocabulary(): string[] { return invoke(() => Array.from(this.raw().collectorVocabulary())); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个注解。 / One annotation. */
export interface AnnotationSpec {
    /** 注解键。 / The annotation key. */
    key: string;
    /** 注解值。 / The annotation value. */
    value: string;
}

/** 策略请求。 / The policy request. */
export interface UnsupportedPredicateRequest {
    /** `alwaysFalse` / `failFast` / `clientFilter` / `ignore` / `error` / `default`。 */
    policies?: Array<"alwaysFalse" | "failFast" | "clientFilter" | "ignore" | "error" | "default">;
    /** 注解列表（不去重、不排序）。 / The annotations (no deduplication, no sorting). */
    annotations?: AnnotationSpec[];
}

/**
 * 不支持谓词策略的三型与谓词注解的键值面
 * （续挖 `persistence/expression/unsupported_predicate_policy.rs` + `predicate_annotations.rs`）。
 *
 * 两个文件加起来 50 行，但策略那个不是可以略过的枚举。四条实测事实：
 *
 * 1. **默认是 `AlwaysFalse`**：不选策略时，无法下推的谓词翻译成**恒假**——"查不到任何行"，而不是报错。这是安全默认
 *    （宁可少给数据），但它意味着**静默降级**；要靠 `policyFailFast(i)` 才发现自己没配。
 * 2. **`ignore` / `error` 是常量别名，不是新变体**：`IGNORE === AlwaysFalse`、`ERROR === FailFast`。
 *    变体总数**恒为 3**（`variantVocabulary()`），两个旧名字归一（`aliasResolvesTo(i)`），别指望它们有独立行为。
 * 3. **`clientFilter` 两边都不做**：`policyFailFast` 与 `policyAlwaysFalse` **都为假**。它是唯一的"既不报错也不主动
 *    改写成恒假"的策略——语义留白，调用方自己决定怎么处理（`neutralPolicies()` 直接给出）。
 * 4. **谓词注解就是键值对，不去重也不排序**：同一个 `key` 出现两次就留两条（`annotationKeys()` 原序）。
 *    所以 `duplicateKeys()` 只**列出**，不替调用方去重——去重会偷偷改掉人家给的东西。
 *
 * The three unsupported-predicate policies and the annotation key/value surface (continuation). Fifty lines total, but the
 * policy is not a throwaway enum. Four measured facts: the **default is `AlwaysFalse`**, so an unsupported predicate becomes
 * always-false — "no rows" rather than an error, a safe default that nonetheless **degrades silently**, which
 * `policyFailFast(i)` is how you notice you never configured it; **`ignore` / `error` are constant aliases, not new variants**
 * (`IGNORE === AlwaysFalse`, `ERROR === FailFast`), so the variant count is fixed at three and the old names normalise rather
 * than gaining behaviour of their own; **`clientFilter` does neither**, false on both flags — the one policy that neither errors
 * nor rewrites, leaving the semantics to the caller (`neutralPolicies()` reports it); and **annotations are plain key/value
 * pairs with no deduplication or sorting**, so a repeated key stays twice and `duplicateKeys()` only **lists** them, because
 * deduplicating would quietly change what the caller handed in.
 */
export class UnsupportedPredicateReport {
    private constructor(private state: UnsupportedPredicateBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): UnsupportedPredicateReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected unsupported predicate report text");
        }
        return invoke(() => new UnsupportedPredicateReport(wasm().UnsupportedPredicateReport.fromJson(json)));
    }
    private raw(): UnsupportedPredicateBinding {
        if (!this.state) throw new OspfError("Disposed", "unsupported predicate report has been disposed");
        return this.state;
    }
    /** 默认策略的变体名 / The default policy's variant name. */
    defaultPolicy(): string { return invoke(() => this.raw().defaultPolicy()); }
    /** 变体词表（恒为三项）/ The variant vocabulary. */
    variantVocabulary(): string[] { return invoke(() => Array.from(this.raw().variantVocabulary())); }
    /** 策略条数 / The number of policies. */
    policyCount(): number { return invoke(() => this.raw().policyCount()); }
    /** 第 `position` 条的输入名 / The name as given for row `position`. */
    policyName(position: number): string { return invoke(() => this.raw().policyName(position)); }
    /** 第 `position` 条解析到的变体 / The resolved variant of row `position`. */
    policyResolved(position: number): string { return invoke(() => this.raw().policyResolved(position)); }
    /** 第 `position` 条是否快失败 / Whether row `position` fails fast. */
    policyFailFast(position: number): boolean { return invoke(() => this.raw().policyFailFast(position)); }
    /** 第 `position` 条是否改写为恒假 / Whether row `position` becomes always-false. */
    policyAlwaysFalse(position: number): boolean { return invoke(() => this.raw().policyAlwaysFalse(position)); }
    /** 第 `position` 条是否是默认策略 / Whether row `position` is the default. */
    policyIsDefault(position: number): boolean { return invoke(() => this.raw().policyIsDefault(position)); }
    /** 别名个数 / The number of aliases. */
    aliasCount(): number { return invoke(() => this.raw().aliasCount()); }
    /** 第 `position` 个别名的旧名 / The old name of alias `position`. */
    aliasName(position: number): string { return invoke(() => this.raw().aliasName(position)); }
    /** 第 `position` 个别名归一到的变体 / The variant alias `position` normalises to. */
    aliasResolvesTo(position: number): string { return invoke(() => this.raw().aliasResolvesTo(position)); }
    /** 「既不失败也不改写」的策略名 / The policies that neither fail nor rewrite. */
    neutralPolicies(): string[] { return invoke(() => Array.from(this.raw().neutralPolicies())); }
    /** 注解条数 / The annotation count. */
    annotationCount(): number { return invoke(() => this.raw().annotationCount()); }
    /** 注解的键序列（原序）/ The key sequence. */
    annotationKeys(): string[] { return invoke(() => Array.from(this.raw().annotationKeys())); }
    /** 重复的注解键 / The duplicate annotation keys. */
    duplicateKeys(): string[] { return invoke(() => Array.from(this.raw().duplicateKeys())); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 仓储走向请求。 / The repository-routing request. */
export interface RepositoryCallRequest {
    /** `count()` 报的数（**故意与 `rows` 无关**）。 / What `count()` reports (**deliberately unrelated** to `rows`). */
    count: number;
    /** `find_with_options` 的行（**故意与 `count` 无关**）。 / The rows `find_with_options` returns. */
    rows?: string[];
    /** 后端显式上限（`undefined` 表示默认查询，不截断）。 / An explicit backend cap. */
    limit?: number;
    /** 让后端在必须方法里失败。 / Make the required methods fail. */
    fail?: string;
    /** `find` / `findWithOptions` / `count` / `exists` / `update` / `delete`。 */
    operations?: string[];
}

/**
 * 表达式仓储两个默认方法的真实走向（续挖 `persistence/expression/repository_api.rs`）。
 *
 * `ExpressionRepository` 只要求实现四个方法（`findWithOptions` / `count` / `update` / `delete`），另外两个是默认实现。
 * 默认实现的**走向**才是重点，因为它决定了后端写错时会发生什么：
 *
 * 1. **`find` 就是"用默认选项调 `findWithOptions`"**。`RepositoryQuery::default()` 的 `limit` / `offset` / `sortBy`
 *    **全是 `undefined`**——没有上限、没有偏移、没有排序，它会**把全部命中行交出去**。所以"默认查询有隐含上限"是
 *    想当然；上限只能由后端自己加，而一旦后端加了，`find` 就会静默截断（`defaultQueryHasLimit()` 恒为 `false`）。
 * 2. **`exists` 走 `count`，不碰 `find`**。所以自相矛盾的后端（`count()` 说 0、`find()` 却给出行）在 `exists` 眼里
 *    就是"不存在"（`existsContradictsFind()` 为 `true`）。这不是缺陷而是定义：`exists` 的可信度取决于 `count`。
 * 3. **错误原样穿透**：两个默认方法都是 `?` 转发，不包装、不吞错，`Self::Error` 从必须方法直接冒出来。
 * 4. **`RepositoryApi` 是空标记 trait**：零方法、零约束，一行 `impl` 接上，不带任何行为（`markerIsEmpty()`）。
 *
 * Where the expression repository's two default methods really go (continuation). `ExpressionRepository` requires four
 * methods only; the defaults decide what happens when a backend is written wrong. **`find` is `findWithOptions` with default
 * options**, and `RepositoryQuery::default()` leaves `limit` / `offset` / `sortBy` **all undefined**, so it **hands back every
 * matching row** — "the default query has an implicit limit" is an assumption, and if a backend adds one `find` truncates
 * silently (`defaultQueryHasLimit()` is always false). **`exists` goes through `count` and never touches `find`**, so a
 * self-contradictory backend is "absent" as far as `exists` is concerned (`existsContradictsFind()` is true) — by definition,
 * not defect: `exists` is only as trustworthy as `count`. **Errors pass through untouched**, both defaults using `?`.
 * And **`RepositoryApi` is an empty marker trait**, connecting with a one-line impl and carrying no behaviour.
 */
export class RepositoryCallReport {
    private constructor(private state: RepositoryCallBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): RepositoryCallReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected repository call report text");
        }
        return invoke(() => new RepositoryCallReport(wasm().RepositoryCallReport.fromJson(json)));
    }
    private raw(): RepositoryCallBinding {
        if (!this.state) throw new OspfError("Disposed", "repository call report has been disposed");
        return this.state;
    }
    /** 调用条数 / The number of calls. */
    callCount(): number { return invoke(() => this.raw().callCount()); }
    /** 第 `position` 条的操作名 / The operation name of call `position`. */
    callOperation(position: number): string { return invoke(() => this.raw().callOperation(position)); }
    /** 第 `position` 条返回的行数 / The row count returned by call `position`. */
    callRowCount(position: number): number | undefined {
        return invoke(() => this.raw().callRowCount(position));
    }
    /** 第 `position` 条返回的计数 / The count returned by call `position`. */
    callCountValue(position: number): number | undefined {
        return invoke(() => this.raw().callCountValue(position));
    }
    /** 第 `position` 条返回的真值 / The boolean verdict of call `position`. */
    callFlag(position: number): boolean | undefined { return invoke(() => this.raw().callFlag(position)); }
    /** 第 `position` 条是否出错 / Whether call `position` errored. */
    callErrored(position: number): boolean { return invoke(() => this.raw().callErrored(position)); }
    /** 第 `position` 条的错误文本 / The error text of call `position`. */
    callError(position: number): string | undefined { return invoke(() => this.raw().callError(position)); }
    /** 默认查询是否带上限 / Whether the default query carries a cap. */
    defaultQueryHasLimit(): boolean { return invoke(() => this.raw().defaultQueryHasLimit()); }
    /** `exists` 是否与 `find` 矛盾 / Whether `exists` contradicts `find`. */
    existsContradictsFind(): boolean { return invoke(() => this.raw().existsContradictsFind()); }
    /** 空标记 trait 是否零方法可实现 / Whether the marker trait needs zero methods. */
    markerIsEmpty(): boolean { return invoke(() => this.raw().markerIsEmpty()); }
    /** 操作词表 / The operation vocabulary. */
    operationVocabulary(): string[] { return invoke(() => Array.from(this.raw().operationVocabulary())); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一组标志。 / One set of flags. */
export interface UsageFlags {
    /** 结果列是否进入目标函数。 / Whether the result column enters the objective. */
    inObjective?: boolean;
    /** 结果列是否进入非本函数的约束行。 / Whether the result enters a row that is not this function's own. */
    inConstraint?: boolean;
    /** 结果列是否被其它中间符号当作输入。 / Whether another symbol consumes the result as input. */
    nestedAsInput?: boolean;
    /** 辅助列是否被外部引用。 / Whether a helper column is referenced externally. */
    externallyReferenced?: boolean;
    /** 结果列是否已被固定。 / Whether the result column is already fixed. */
    resultIsFixed?: boolean;
}

/** 用例请求。 / The case request. */
export interface FunctionUsageRequest {
    /** 要看的标志组合。 / The flag combinations to inspect. */
    cases?: UsageFlags[];
}

/**
 * 函数符号使用语境的四个派生判定（续挖 `model/intermediate/function_usage.rs`）。
 *
 * 五个布尔标志加四个派生判定，**公式互不相同**，差别正是全部要点——把 `inObjective` 当成"结果必须保留"是
 * 最容易犯的错：
 *
 * | 派生判定 | 公式 |
 * | --- | --- |
 * | `caseRequiresReferenceableResult(i)` | `inConstraint 或 nestedAsInput`（**不含 `inObjective`**） |
 * | `caseHelpersAreExclusive(i)` | `!externallyReferenced`（**与结果列无关**） |
 * | `caseResultIsConsumed(i)` | `inObjective 或 inConstraint 或 nestedAsInput` |
 * | `caseForbidsNativeWrite(i)` | `resultIsFixed`（**只看这一个**） |
 *
 * 四条实测关系：
 * 1. **结果只进目标时不要求"结果可被引用"**：`resultIsConsumed` 为真而 `requiresReferenceableResult` 为**假**
 *    ——只作用于目标的快捷原生接口能替代 `y = f(x)` 关系。全格 32 种组合里这样的组合**有 4 种**
 *    （另两个标志自由），`consumedButNotReferenceable()` 直接给出这个数。
 * 2. **要求可被引用蕴含被消费**，反之不然（上一条就是反例）。`requiresImpliesConsumed()` 在 32 格上恒真。
 * 3. **禁止原生写入只由 `resultIsFixed` 决定**：其余四个标志怎么组合都不禁止（`forbidsEqualsFixed()` 恒真）。
 *    "结果被固定"与"结果需要被别的行引用"是**两个不同方向**的约束，可以同时成立 → 必须回退。
 * 4. **辅助列独占与另外四个标志完全独立**（`exclusiveEqualsNotReferenced()` 恒真）：它只说辅助列没被外部引用。
 *
 * reader 会对每一条用例**独立重算四个公式**，不信报告自己声明的布尔——所以这四条关系是可验证的，不是自说自话。
 *
 * The four derived predicates of the function-usage summary (continuation). Five flags plus four predicates whose
 * **formulas differ**, and that difference is the point: treating `inObjective` as "the result must be kept" is the easy
 * mistake. **An objective-only result does not require a referenceable result** (`resultIsConsumed` true while
 * `requiresReferenceableResult` is **false**), since an objective-only native shortcut replaces the `y = f(x)` relation —
 * **four** of the 32 combinations look like that (the other two flags are free), which
 * `consumedButNotReferenceable()` reports. **Requiring implies consumed** but not the other way round
 * (`requiresImpliesConsumed()` holds on all 32). **Forbidding a native write follows `resultIsFixed` alone**
 * (`forbidsEqualsFixed()` holds), because "the result is fixed" and "the result must stay referenceable" are constraints in
 * **different** directions that can hold together, forcing the fallback. And **helper exclusivity is independent of the
 * other four** (`exclusiveEqualsNotReferenced()` holds), saying only that no external row touches the helpers. The reader
 * **recomputes all four formulas per case** rather than trusting the report's own booleans, so these relations are verifiable
 * rather than self-asserted.
 */
export class FunctionUsageReport {
    private constructor(private state: FunctionUsageBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): FunctionUsageReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected function usage report text");
        }
        return invoke(() => new FunctionUsageReport(wasm().FunctionUsageReport.fromJson(json)));
    }
    private raw(): FunctionUsageBinding {
        if (!this.state) throw new OspfError("Disposed", "function usage report has been disposed");
        return this.state;
    }
    /** 用例数 / The number of requested cases. */
    caseCount(): number { return invoke(() => this.raw().caseCount()); }
    /** 第 `position` 条是否进目标 / Whether case `position` enters the objective. */
    caseInObjective(position: number): boolean { return invoke(() => this.raw().caseInObjective(position)); }
    /** 第 `position` 条是否进约束 / Whether case `position` enters a constraint row. */
    caseInConstraint(position: number): boolean { return invoke(() => this.raw().caseInConstraint(position)); }
    /** 第 `position` 条是否被嵌套 / Whether case `position` is nested. */
    caseNestedAsInput(position: number): boolean { return invoke(() => this.raw().caseNestedAsInput(position)); }
    /** 第 `position` 条的辅助列是否被外部引用 / Whether case `position` has externally referenced helpers. */
    caseExternallyReferenced(position: number): boolean {
        return invoke(() => this.raw().caseExternallyReferenced(position));
    }
    /** 第 `position` 条的结果是否被固定 / Whether case `position` has a fixed result. */
    caseResultIsFixed(position: number): boolean { return invoke(() => this.raw().caseResultIsFixed(position)); }
    /** 第 `position` 条是否要求可被引用 / Whether case `position` requires a referenceable result. */
    caseRequiresReferenceableResult(position: number): boolean {
        return invoke(() => this.raw().caseRequiresReferenceableResult(position));
    }
    /** 第 `position` 条的辅助列是否独占 / Whether case `position` has exclusive helpers. */
    caseHelpersAreExclusive(position: number): boolean {
        return invoke(() => this.raw().caseHelpersAreExclusive(position));
    }
    /** 第 `position` 条的结果是否被消费 / Whether case `position` has a consumed result. */
    caseResultIsConsumed(position: number): boolean {
        return invoke(() => this.raw().caseResultIsConsumed(position));
    }
    /** 第 `position` 条是否禁止原生写入 / Whether case `position` forbids a native write. */
    caseForbidsNativeWrite(position: number): boolean {
        return invoke(() => this.raw().caseForbidsNativeWrite(position));
    }
    /** 全格组合数 / The full grid size. */
    gridSize(): number { return invoke(() => this.raw().gridSize()); }
    /** 被消费但不要求可被引用的组合数 / The combos consumed but not referenceable. */
    consumedButNotReferenceable(): number { return invoke(() => this.raw().consumedButNotReferenceable()); }
    /** 要求可被引用的组合数 / The combos requiring a referenceable result. */
    referenceableCount(): number { return invoke(() => this.raw().referenceableCount()); }
    /** 禁止原生写入的组合数 / The combos forbidding a native write. */
    forbiddenCount(): number { return invoke(() => this.raw().forbiddenCount()); }
    /** 辅助列独占的组合数 / The combos whose helpers are exclusive. */
    exclusiveCount(): number { return invoke(() => this.raw().exclusiveCount()); }
    /** 既要求可被引用又禁止原生写入的组合数 / The combos that both require and forbid. */
    referenceableAndForbidden(): number { return invoke(() => this.raw().referenceableAndForbidden()); }
    /** 要求可被引用是否蕴含被消费 / Whether requiring implies consumed. */
    requiresImpliesConsumed(): boolean { return invoke(() => this.raw().requiresImpliesConsumed()); }
    /** 禁止原生写入是否等价于结果被固定 / Whether forbidding equals fixed. */
    forbidsEqualsFixed(): boolean { return invoke(() => this.raw().forbidsEqualsFixed()); }
    /** 辅助列独占是否等价于未被外部引用 / Whether exclusive equals not-referenced. */
    exclusiveEqualsNotReferenced(): boolean { return invoke(() => this.raw().exclusiveEqualsNotReferenced()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个字面浮点（JSON 放不下 `NaN` / `inf`，所以走文本）。 / A literal float. */
export interface FloatSpec {
    kind: "number" | "nan" | "inf" | "negInf";
    /** 数值文本（`number` 时使用）。 / The numeric text (used when `kind` is `number`). */
    text?: string;
}

/** 一个区间。 / One interval. */
export interface DomainSpec {
    lower: FloatSpec;
    upper: FloatSpec;
}

/** 一对区间。 / A pair of intervals. */
export interface DomainPairSpec {
    left: DomainSpec;
    right: DomainSpec;
}

/** 区间代数请求。 / The interval-algebra request. */
export interface InputDomainRequest {
    /** 要构造的区间（走 `new`，会报错）。 / The intervals to build via `new` (which can fail). */
    domains?: DomainSpec[];
    /** 要比较的区间对。 / The interval pairs to compare. */
    pairs?: DomainPairSpec[];
    /** 要取指纹的浮点。 / The floats to fingerprint. */
    floats?: FloatSpec[];
}

/**
 * 输入域证明的区间代数与浮点指纹（续挖 `model/intermediate/deferred_function.rs`）。
 *
 * 两件可以脱离求解器独立验证的东西，各带一组容易被想当然的边界。
 *
 * **`InputDomainProof`（区间代数）**
 * 1. **`new` 只拒两种**：非有限边界（`NaN` / `±inf`）与 `lower > upper`。`lower === upper` **是合法的退化点**，
 *    所以 `[2, 2]` 是个真证明（`domainDegenerate(i)`）。
 * 2. **`fromOptionalBounds` 把 `new` 的错误吞掉**：任一侧缺失、非有限或顺序颠倒都只给 `undefined`
 *    （`domainOptionalProof(i)`），调用方分不出"没给"和"给错了"——以为它会报错是这里最容易踩的坑。
 * 3. **`intersect` 的空判定是 `lower > upper`**，所以**端点相接**（`[1,2] ∩ [2,3]`）得到的是**退化点** `[2,2]`
 *    而不是空（`pairIntersectionIsPoint(i)` 为真）。"没有交集"与"交集是一个点"必须分开。
 * 4. **`isContainedIn` 自反**，端点相接算包含：`[2,2] ⊂ [1,2]` 为真。
 *
 * **`fingerprintFloat`（指纹）**
 * 5. **指纹的相等关系与数值的相等关系是两套**：`0 === -0` 但指纹**不同**（格式里有符号位，`zeroSignsDiffer()`）；
 *    两个 `NaN` **不相等**而指纹**相同**（都归到 `"nan"`，不看载荷，`nanFingerprintStable()`）。
 * 6. **非有限值各有一个固定标记**：`"nan"` / `"inf"` / `"-inf"`，与任何有限值的指纹都不可能碰撞。
 * 7. **有限值的格式是 `{:.17e}`**：小数点后 17 位（共 18 位有效数字），实测 `1` → `"1.00000000000000000e0"`。
 *
 * The input-domain proof's interval algebra and the float fingerprint (continuation). Two things verifiable without a solver,
 * each with edges that are easy to assume wrong. **`new` rejects only two things** — non-finite bounds and
 * `lower > upper` — so `lower === upper` **is a legal degenerate point** (`domainDegenerate(i)`). **`fromOptionalBounds`
 * swallows `new`'s error**, returning `undefined` for a missing side, a non-finite bound or a reversed pair
 * (`domainOptionalProof(i)`), so the caller cannot tell "not given" from "given wrong" — expecting it to report is the trap.
 * **`intersect` calls emptiness `lower > upper`**, so **touching endpoints** yield the **degenerate point** rather than empty
 * (`pairIntersectionIsPoint(i)`): "no overlap" and "overlap at one point" must stay distinct. **`isContainedIn` is reflexive**
 * and counts touching endpoints. On the fingerprint side **its equality differs from numeric equality**: `0 === -0` yet their
 * fingerprints **differ** (`zeroSignsDiffer()`) while two `NaN`s **differ** numerically and share `"nan"`
 * (`nanFingerprintStable()`); the three non-finite markers cannot collide with a finite fingerprint, which uses `{:.17e}` —
 * seventeen digits after the point, eighteen significant, so `1` renders as `"1.00000000000000000e0"`.
 */
export class InputDomainReport {
    private constructor(private state: InputDomainBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): InputDomainReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected input domain report text");
        }
        return invoke(() => new InputDomainReport(wasm().InputDomainReport.fromJson(json)));
    }
    private raw(): InputDomainBinding {
        if (!this.state) throw new OspfError("Disposed", "input domain report has been disposed");
        return this.state;
    }
    /** 区间条数 / The number of intervals. */
    domainCount(): number { return invoke(() => this.raw().domainCount()); }
    /** 第 `position` 个区间是否构造成功 / Whether interval `position` was built. */
    domainOk(position: number): boolean { return invoke(() => this.raw().domainOk(position)); }
    /** 第 `position` 个区间的下界 / The lower bound of interval `position`. */
    domainLower(position: number): number | undefined { return invoke(() => this.raw().domainLower(position)); }
    /** 第 `position` 个区间的上界 / The upper bound of interval `position`. */
    domainUpper(position: number): number | undefined { return invoke(() => this.raw().domainUpper(position)); }
    /** 第 `position` 个区间是否退化成一个点 / Whether interval `position` is a single point. */
    domainDegenerate(position: number): boolean { return invoke(() => this.raw().domainDegenerate(position)); }
    /** 第 `position` 个区间是否有可选证明 / Whether interval `position` has an optional proof. */
    domainOptionalProof(position: number): boolean { return invoke(() => this.raw().domainOptionalProof(position)); }
    /** 第 `position` 个区间的错误文本 / The error text of interval `position`. */
    domainError(position: number): string | undefined { return invoke(() => this.raw().domainError(position)); }
    /** 区间对条数 / The number of pairs. */
    pairCount(): number { return invoke(() => this.raw().pairCount()); }
    /** 第 `position` 对是否有交集 / Whether pair `position` overlaps. */
    pairHasIntersection(position: number): boolean { return invoke(() => this.raw().pairHasIntersection(position)); }
    /** 第 `position` 对的交集是否是一个点 / Whether pair `position` overlaps at a single point. */
    pairIntersectionIsPoint(position: number): boolean {
        return invoke(() => this.raw().pairIntersectionIsPoint(position));
    }
    /** 第 `position` 对交集的下界 / The intersection's lower bound. */
    pairIntersectionLower(position: number): number | undefined {
        return invoke(() => this.raw().pairIntersectionLower(position));
    }
    /** 第 `position` 对交集的上界 / The intersection's upper bound. */
    pairIntersectionUpper(position: number): number | undefined {
        return invoke(() => this.raw().pairIntersectionUpper(position));
    }
    /** 第 `position` 对里左是否被右包含 / Whether the left is inside the right. */
    pairLeftInRight(position: number): boolean { return invoke(() => this.raw().pairLeftInRight(position)); }
    /** 第 `position` 对里右是否被左包含 / Whether the right is inside the left. */
    pairRightInLeft(position: number): boolean { return invoke(() => this.raw().pairRightInLeft(position)); }
    /** 第 `position` 对里左是否自含 / Whether the left contains itself. */
    pairLeftReflexive(position: number): boolean { return invoke(() => this.raw().pairLeftReflexive(position)); }
    /** 指纹条数 / The number of fingerprints. */
    floatCount(): number { return invoke(() => this.raw().floatCount()); }
    /** 第 `position` 个指纹的输入描述 / The input description of fingerprint `position`. */
    floatInput(position: number): string { return invoke(() => this.raw().floatInput(position)); }
    /** 第 `position` 个指纹 / Fingerprint `position`. */
    floatFingerprint(position: number): string { return invoke(() => this.raw().floatFingerprint(position)); }
    /** `0` 与 `-0` 的指纹是否不同 / Whether `0` and `-0` fingerprint differently. */
    zeroSignsDiffer(): boolean { return invoke(() => this.raw().zeroSignsDiffer()); }
    /** 两个 `NaN` 的指纹是否相同 / Whether two `NaN`s share a fingerprint. */
    nanFingerprintStable(): boolean { return invoke(() => this.raw().nanFingerprintStable()); }
    /** 非有限标记是否互不相同 / Whether the non-finite markers differ. */
    markersAreDistinct(): boolean { return invoke(() => this.raw().markersAreDistinct()); }
    /** `fromOptionalBounds` 是否吞掉错误 / Whether the optional constructor swallows errors. */
    optionalSwallowsErrors(): boolean { return invoke(() => this.raw().optionalSwallowsErrors()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一次指纹校验。 / One fingerprint check. */
export interface FingerprintCase {
    /** 原生写入记录里带的指纹（`undefined` 表示没带）。 / The fingerprint in the record. */
    recorded?: string;
    /** 当前结构给出的指纹（`undefined` 表示不给）。 / The structure's fingerprint. */
    current?: string;
}

/** 一次绑定构造。 / One binding construction. */
export interface BindingSpec {
    sourceSymbolId: number;
    resultGroup: number;
    resultIndex: number;
    /** 辅助列（`[组号, 组内序号]`）。 / The helper columns as `[group, index]` pairs. */
    helpers?: Array<[number, number]>;
}

/** 一对区间。 / A pair of intervals. */
export interface ProofPair {
    proposedLower: number;
    proposedUpper: number;
    recordedLower: number;
    recordedUpper: number;
}

/** 指纹与域证明请求。 / The fingerprint-and-proof request. */
export interface NativeWriteRequest {
    cases?: FingerprintCase[];
    bindings?: BindingSpec[];
    proofs?: ProofPair[];
}

/**
 * 原生写入指纹校验的两侧语义与"只可收紧"的域证明
 * （续挖 `model/intermediate/deferred_function.rs`）。三件互相咬合的东西：
 *
 * **1. 指纹校验是**成对**判定，不是单侧判定。**
 * 只有"记录侧有指纹且结构侧也有指纹且两者相等"才算通过（`caseAccepted(i)`）；四种组合里另外三种全**失败**，
 * 其中包括**只缺一侧**的两种（`caseReason(i)` 给出 `structureOffersNone` / `recordLost` / `bothAbsent`）。
 * 把"没指纹"当成通过会让指纹彻底失去意义，所以缺一侧就是不一致。
 *
 * **2. 两个默认方法都返回 `undefined`。**
 * 一个只实现必需方法的结构既不给使用语境绑定、也不给指纹（`bareStructureHasFingerprint()` /
 * `bareStructureHasBinding()` 都为 `false`），于是任何带指纹的记录对它都校验失败。这是**保守的默认值**：
 * 新增结构不会"默认通过"校验。
 *
 * **3. 域证明只可收紧、不可扩大、不可丢失。**
 * `widenedPrefix()` / `lostPrefix()` 就是这两条拒绝的领域文案前缀；方向由包含关系表达——收紧允许、持平允许、
 * 扩大拒绝（`proofWidened(i)`）。丢掉证明既不能声称 Big-M 来自域推断，也不能靠"没有证明"混过第 1 条。
 *
 * 另外：`StructureUsageBinding::new` **不检查**结果列是否混进辅助列、也**不去重**（`bindingResultAlsoHelper(i)` /
 * `bindingDuplicateHelpers(i)` 如实报告）。这不是疏漏，是这一层不该替调用方改写数据。
 *
 * The two-sided semantics of the native-write fingerprint check and the tighten-only domain proof (continuation). Three
 * interlocking things. **The check is pairwise**: only "recorded present, current present, equal" passes
 * (`caseAccepted(i)`), while the other three combinations fail — including the two lacking just one side
 * (`caseReason(i)` reports `structureOffersNone` / `recordLost` / `bothAbsent`) — since treating "no fingerprint" as a pass
 * would make fingerprints meaningless. **Both default methods return `undefined`**: a structure implementing only the
 * required methods offers neither (`bareStructureHasFingerprint()` / `bareStructureHasBinding()` are false), so any record
 * with a fingerprint fails against it — a **conservative default**, never an accidental pass. **The proof may be tightened
 * but never widened or dropped**: `widenedPrefix()` / `lostPrefix()` are the domain's refusal prefixes, and the direction
 * shows through containment — tighten and unchanged pass, widening is refused (`proofWidened(i)`). Separately,
 * `StructureUsageBinding::new` **does not police** a result column among the helpers and **does not deduplicate**
 * (`bindingResultAlsoHelper(i)` / `bindingDuplicateHelpers(i)` report it) — not an oversight: this layer must not rewrite the
 * caller's data.
 */
export class NativeWriteReport {
    private constructor(private state: NativeWriteBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): NativeWriteReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected native write report text");
        }
        return invoke(() => new NativeWriteReport(wasm().NativeWriteReport.fromJson(json)));
    }
    private raw(): NativeWriteBinding {
        if (!this.state) throw new OspfError("Disposed", "native write report has been disposed");
        return this.state;
    }
    /** 指纹校验条数 / The number of fingerprint checks. */
    caseCount(): number { return invoke(() => this.raw().caseCount()); }
    /** 第 `position` 条记录侧是否有指纹 / Whether check `position` has a recorded fingerprint. */
    caseHasRecorded(position: number): boolean { return invoke(() => this.raw().caseHasRecorded(position)); }
    /** 第 `position` 条结构侧是否给指纹 / Whether the structure offers one. */
    caseHasCurrent(position: number): boolean { return invoke(() => this.raw().caseHasCurrent(position)); }
    /** 第 `position` 条是否通过 / Whether check `position` passes. */
    caseAccepted(position: number): boolean { return invoke(() => this.raw().caseAccepted(position)); }
    /** 第 `position` 条的原因分类 / The reason classification of check `position`. */
    caseReason(position: number): string { return invoke(() => this.raw().caseReason(position)); }
    /** 绑定条数 / The number of bindings. */
    bindingCount(): number { return invoke(() => this.raw().bindingCount()); }
    /** 第 `position` 条绑定的来源符号 ID / The source symbol ID of binding `position`. */
    bindingSourceSymbolId(position: number): number {
        return invoke(() => this.raw().bindingSourceSymbolId(position));
    }
    /** 第 `position` 条绑定的结果列是否混进辅助列 / Whether the result is also a helper. */
    bindingResultAlsoHelper(position: number): boolean {
        return invoke(() => this.raw().bindingResultAlsoHelper(position));
    }
    /** 第 `position` 条绑定的辅助列条数 / The helper count of binding `position`. */
    bindingHelperCount(position: number): number { return invoke(() => this.raw().bindingHelperCount(position)); }
    /** 第 `position` 条绑定里重复的辅助列数 / The duplicate helper count. */
    bindingDuplicateHelpers(position: number): number {
        return invoke(() => this.raw().bindingDuplicateHelpers(position));
    }
    /** 域证明条数 / The number of proof checks. */
    proofCount(): number { return invoke(() => this.raw().proofCount()); }
    /** 第 `position` 条域证明是否允许 / Whether proof `position` is allowed. */
    proofAllowed(position: number): boolean { return invoke(() => this.raw().proofAllowed(position)); }
    /** 第 `position` 条域证明是否是扩大 / Whether proof `position` widens. */
    proofWidened(position: number): boolean { return invoke(() => this.raw().proofWidened(position)); }
    /** 第 `position` 条域证明是否没变 / Whether proof `position` is unchanged. */
    proofUnchanged(position: number): boolean { return invoke(() => this.raw().proofUnchanged(position)); }
    /** 第 `position` 条域证明的拒绝前缀 / The refusal prefix of proof `position`. */
    proofRefusal(position: number): string | undefined { return invoke(() => this.raw().proofRefusal(position)); }
    /** 两侧都缺指纹时是否通过 / Whether both-missing passes. */
    bothAbsentPasses(): boolean { return invoke(() => this.raw().bothAbsentPasses()); }
    /** 只缺一侧时是否通过 / Whether one-missing passes. */
    oneAbsentPasses(): boolean { return invoke(() => this.raw().oneAbsentPasses()); }
    /** 裸结构是否给指纹 / Whether a bare structure offers a fingerprint. */
    bareStructureHasFingerprint(): boolean { return invoke(() => this.raw().bareStructureHasFingerprint()); }
    /** 裸结构是否给使用语境绑定 / Whether a bare structure offers a usage binding. */
    bareStructureHasBinding(): boolean { return invoke(() => this.raw().bareStructureHasBinding()); }
    /** `widened` 拒绝的文案前缀 / The widened refusal prefix. */
    widenedPrefix(): string { return invoke(() => this.raw().widenedPrefix()); }
    /** `lost` 拒绝的文案前缀 / The lost refusal prefix. */
    lostPrefix(): string { return invoke(() => this.raw().lostPrefix()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个变量。 / One variable. */
export interface ModelVariableSpec {
    name: string;
    /** 组号（同组共享 `group_id`）。 / The group id. */
    group: number;
    kind: "continuous" | "binary" | "integer" | "percentage";
    lower: number;
    upper: number;
    /** 目标系数。 / The objective coefficient. */
    cost: number;
}

/** 一行约束。 / One constraint row. */
export interface ModelRowSpec {
    /** 系数（`[列索引, 系数]`）。 / The coefficients as `[column, value]`. */
    coefficients?: Array<[number, number]>;
    rhs: number;
}

/** 模型与变换请求。 / The model-and-transform request. */
export interface ElasticModelRequest {
    name: string;
    variables?: ModelVariableSpec[];
    rows?: ModelRowSpec[];
    category: "min" | "max";
    /** 弹性化的罚项（**不校验**）；不给则用领域的默认值。 / The penalty (**never validated**). */
    penalty?: number;
}

/**
 * 线性模型的三个纯变换（续挖 `model/intermediate/linear_triad_model.rs` + `elastic.rs`）。
 *
 * `elastic` 构建器看起来只是"给个罚项"，但 `LinearTriadModel::elastic` 的实测行为有四条，其中两条容易搞错：
 *
 * 1. **每条约束只加一个松弛变量**（不是两侧各一个），`[0, +∞)`、连续，行系数 `-1.0`。所以"弹性化"只放松
 *    `<=` 方向；要把等式两侧都放松得自己再补。
 * 2. **目标系数直接推入 `penalty`**：它是**目标函数里松弛变量的单价**，和 `c` 里其它系数同量级才合适。
 * 3. **目标方向被强制改成 `min`**，哪怕原来是 `max`（`categoryForcedToMinimum()`）。`feasibility()` 同理。
 *    放松后的模型必须最小化违反量，但**原模型是最大化时语义已经被改掉了**，调用方必须知道。
 * 4. **`penalty` 不做任何校验**：`-1` 与 `0` 都能通过（`negativePenaltyRefused()` / `zeroPenaltyRefused()` 都为
 *    `false`），而负罚项会让求解器**主动违反约束**。构建器不替你判断罚项是否合理。
 *
 * 另外 `linearRelaxed()` 是一张死板的映射表（`relaxationBefore(i)` → `relaxationAfter(i)`）：`binary → percentage`
 * （**界没丢**，不是 `continuous`）、`integer → continuous`、其余不变。
 *
 * Three pure transforms of the linear model (continuation). The elastic builder looks like "just pass a penalty", but
 * `LinearTriadModel::elastic` has four measured behaviours, two easy to get wrong. **One slack per constraint**, not one per
 * side, `[0, +∞)`, continuous, row coefficient `-1.0`, so elasticizing relaxes only the `<=` direction. **The penalty is
 * pushed straight into the objective** as the unit price of a slack in `c`, so it belongs on the same scale as the other
 * coefficients. **The direction is forced to `min`** even when it was `max` (`categoryForcedToMinimum()`), and `feasibility()`
 * does the same — the relaxed model must minimize violation, but on a maximization model the **semantics have changed** and the
 * caller has to know. And **the penalty is never validated**: `-1` and `0` both pass (`negativePenaltyRefused()` /
 * `zeroPenaltyRefused()` are `false`), while a negative penalty makes the solver **seek violations**. Finally
 * `linearRelaxed()` is a fixed map (`relaxationBefore(i)` to `relaxationAfter(i)`): `binary` to the **still-bounded**
 * `percentage`, `integer` to `continuous`, everything else unchanged.
 */
export class ElasticModelReport {
    private constructor(private state: ElasticModelBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): ElasticModelReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected elastic model report text");
        }
        return invoke(() => new ElasticModelReport(wasm().ElasticModelReport.fromJson(json)));
    }
    private raw(): ElasticModelBinding {
        if (!this.state) throw new OspfError("Disposed", "elastic model report has been disposed");
        return this.state;
    }
    /** 变换条数 / The number of transforms. */
    transformCount(): number { return invoke(() => this.raw().transformCount()); }
    /** 第 `position` 个变换的名字 / The name of transform `position`. */
    transformName(position: number): string { return invoke(() => this.raw().transformName(position)); }
    /** 第 `position` 个变换后的变量数 / The variable count. */
    transformVariables(position: number): number { return invoke(() => this.raw().transformVariables(position)); }
    /** 第 `position` 个变换后的约束数 / The constraint count. */
    transformConstraints(position: number): number { return invoke(() => this.raw().transformConstraints(position)); }
    /** 第 `position` 个变换后的目标系数个数 / The objective length. */
    transformObjectiveLength(position: number): number {
        return invoke(() => this.raw().transformObjectiveLength(position));
    }
    /** 第 `position` 个变换后的目标方向 / The objective direction. */
    transformCategory(position: number): "min" | "max" {
        return invoke(() => this.raw().transformCategory(position) as "min" | "max");
    }
    /** 第 `position` 个变换后的目标是否全零 / Whether the objective is all zero. */
    transformObjectiveIsZero(position: number): boolean {
        return invoke(() => this.raw().transformObjectiveIsZero(position));
    }
    /** 第 `position` 个变换后的变量类型序列 / The variable kinds. */
    transformKinds(position: number): string[] {
        return invoke(() => Array.from(this.raw().transformKinds(position)));
    }
    /** 松弛变量条数 / The number of slacks. */
    slackCount(): number { return invoke(() => this.raw().slackCount()); }
    /** 第 `position` 个松弛变量的列索引 / The column index of slack `position`. */
    slackIndex(position: number): number { return invoke(() => this.raw().slackIndex(position)); }
    /** 第 `position` 个松弛变量的名字 / The name of slack `position`. */
    slackName(position: number): string { return invoke(() => this.raw().slackName(position)); }
    /** 第 `position` 个松弛变量的下界 / The lower bound of slack `position`. */
    slackLower(position: number): number { return invoke(() => this.raw().slackLower(position)); }
    /** 第 `position` 个松弛变量的上界是否为正无穷 / Whether slack `position` is unbounded above. */
    slackUpperIsInfinite(position: number): boolean {
        return invoke(() => this.raw().slackUpperIsInfinite(position));
    }
    /** 第 `position` 个松弛变量的行系数 / The row coefficient of slack `position`. */
    slackRowCoefficient(position: number): number | undefined {
        return invoke(() => this.raw().slackRowCoefficient(position));
    }
    /** 第 `position` 个松弛变量的目标系数 / The objective coefficient of slack `position`. */
    slackObjectiveCoefficient(position: number): number {
        return invoke(() => this.raw().slackObjectiveCoefficient(position));
    }
    /** 每条约束新增的松弛变量数 / The slacks added per constraint. */
    slacksPerConstraint(): number { return invoke(() => this.raw().slacksPerConstraint()); }
    /** 目标方向是否被强制成 `min` / Whether the direction was forced to `min`. */
    categoryForcedToMinimum(): boolean { return invoke(() => this.raw().categoryForcedToMinimum()); }
    /** 负罚项是否被拒 / Whether a negative penalty was refused. */
    negativePenaltyRefused(): boolean { return invoke(() => this.raw().negativePenaltyRefused()); }
    /** 零罚项是否被拒 / Whether a zero penalty was refused. */
    zeroPenaltyRefused(): boolean { return invoke(() => this.raw().zeroPenaltyRefused()); }
    /** 松弛映射条数 / The number of relaxation pairs. */
    relaxationCount(): number { return invoke(() => this.raw().relaxationCount()); }
    /** 第 `position` 对松弛映射的来源类型 / The source kind of pair `position`. */
    relaxationBefore(position: number): string { return invoke(() => this.raw().relaxationBefore(position)); }
    /** 第 `position` 对松弛映射的目标类型 / The target kind of pair `position`. */
    relaxationAfter(position: number): string { return invoke(() => this.raw().relaxationAfter(position)); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 合并请求。 / The merge request. */
export interface CombineStatusRequest {
    /** 要折叠的序列（从第一个开始，逐个与后续合并）。 / The sequence to fold. */
    sequence?: Array<"reachable" | "unreachable" | "unknown" | "unsupported">;
}

/**
 * 分析状态的合并是一个四元格（续挖 `analysis/pipeline.rs` 的 `combine_status`）。
 *
 * 只有 12 行的函数，但它是整个报告"状态收敛"的唯一规则，四条性质可以**穷举**验证：
 *
 * 1. **`undefined` 是恒等元**：一个"没有新结论"的步骤不会动状态（`noneIsIdentity()`）。
 * 2. **合并取 `rank` 更小者**（悲观优先）：`reachable(3) > unreachable(2) > unknown(1) > unsupported(0)`。
 *    所以 **`reachable` 是最弱的状态**（`reachableIsWeakest()`）——遇到任何别的状态都被换掉。
 * 3. **`unsupported` 是最强势的坏消息**：rank 最低，一旦出现就**压住一切**，包括 `unknown`
 *    （`unsupportedDominates()`）。这反直觉：直觉上"未知"比"不支持"更不确定，但合并不按确定性排，按 rank 排。
 *    所以 `unknownBeatsUnsupported()` 恒为 `false`。
 * 4. **`undefined` 之外三条代数律都成立**：交换、结合、幂等，所以"一串状态折叠起来"与顺序无关
 *    （`commutative()` / `associative()` / `idempotent()`）——这也是报告能分块累积、最后再合并的原因。
 *    **但 `undefined` 破坏交换律**：它只能当右侧恒等元。
 *
 * `folded()` 是把整串折叠到底的结果，`traceStep(i)` 是每一步之后的状态，所以"哪一步把状态压下去了"能直接定位。
 *
 * Combining analysis statuses forms a four-element lattice (continuation). Twelve lines, but the single rule behind the
 * report's status convergence, and its four properties are exhaustively checkable. **`undefined` is the identity**
 * (`noneIsIdentity()`). **The merge keeps the smaller `rank`** — pessimistic first: `reachable(3) > unreachable(2) >
 * unknown(1) > unsupported(0)` — which makes **`reachable` the weakest** (`reachableIsWeakest()`), replaced by anything else.
 * **`unsupported` is the strongest bad news**: rank 0, so it **overrides everything**, `unknown` included
 * (`unsupportedDominates()`); counter-intuitive, since "unknown" feels less certain than "unsupported", but the merge orders by
 * rank, not confidence — hence `unknownBeatsUnsupported()` is always `false`. And **the three laws hold off `undefined`**:
 * commutative, associative, idempotent, so folding a sequence is order-independent, which is why the report accumulates in
 * blocks and merges at the end — though **`undefined` does break commutativity**, since it only works as the right-hand
 * identity. `folded()` is the fully folded status and `traceStep(i)` the status after each step, so "which step pushed the
 * status down" is directly locatable.
 */
export class CombineStatusReport {
    private constructor(private state: CombineStatusBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): CombineStatusReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected combine status report text");
        }
        return invoke(() => new CombineStatusReport(wasm().CombineStatusReport.fromJson(json)));
    }
    private raw(): CombineStatusBinding {
        if (!this.state) throw new OspfError("Disposed", "combine status report has been disposed");
        return this.state;
    }
    /** 状态词表（按 rank 降序）/ The status vocabulary. */
    vocabulary(): string[] { return invoke(() => Array.from(this.raw().vocabulary())); }
    /** 全表格数 / The number of table cells. */
    cellCount(): number { return invoke(() => this.raw().cellCount()); }
    /** 第 `position` 格的左侧状态 / The left status of cell `position`. */
    cellCurrent(position: number): string { return invoke(() => this.raw().cellCurrent(position)); }
    /** 第 `position` 格的右侧状态 / The right status of cell `position`. */
    cellNext(position: number): string { return invoke(() => this.raw().cellNext(position)); }
    /** 第 `position` 格的合并结果 / The combined status of cell `position`. */
    cellCombined(position: number): string { return invoke(() => this.raw().cellCombined(position)); }
    /** 折叠结果 / The folded status. */
    folded(): string { return invoke(() => this.raw().folded()); }
    /** 折叠过程条数 / The number of fold steps. */
    traceLength(): number { return invoke(() => this.raw().traceLength()); }
    /** 第 `position` 步之后的状态 / The status after fold step `position`. */
    traceStep(position: number): string { return invoke(() => this.raw().traceStep(position)); }
    /** `undefined` 是否是恒等元 / Whether `undefined` is the identity. */
    noneIsIdentity(): boolean { return invoke(() => this.raw().noneIsIdentity()); }
    /** 是否可交换 / Whether the merge commutes. */
    commutative(): boolean { return invoke(() => this.raw().commutative()); }
    /** 是否结合 / Whether the merge is associative. */
    associative(): boolean { return invoke(() => this.raw().associative()); }
    /** 是否幂等 / Whether the merge is idempotent. */
    idempotent(): boolean { return invoke(() => this.raw().idempotent()); }
    /** `unsupported` 是否压住一切 / Whether `unsupported` overrides everything. */
    unsupportedDominates(): boolean { return invoke(() => this.raw().unsupportedDominates()); }
    /** `reachable` 是否被一切换掉 / Whether `reachable` loses to everything. */
    reachableIsWeakest(): boolean { return invoke(() => this.raw().reachableIsWeakest()); }
    /** `unknown` 是否压住 `unsupported` / Whether `unknown` overrides `unsupported`. */
    unknownBeatsUnsupported(): boolean { return invoke(() => this.raw().unknownBeatsUnsupported()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个字面浮点（JSON 放不下 `NaN` / `inf`）。 / A literal float. */
export interface TextFloatSpec {
    kind: "number" | "nan" | "inf" | "negInf";
    /** 数值文本（`number` 时使用）。 / The numeric text (used when `kind` is `number`). */
    text?: string;
}

/** 编解码请求。 / The codec request. */
export interface NumberTextRequest {
    floats?: TextFloatSpec[];
    /** 一个向量（走 `NumberVectorCodec`）。 / One vector through `NumberVectorCodec`. */
    vector?: TextFloatSpec[];
    /** 一个矩阵（走 `NumberMatrixCodec`）。 / One matrix through `NumberMatrixCodec`. */
    matrix?: TextFloatSpec[][];
    /** 一个原生矩阵（走 `RawNumberMatrixCodec`）。 / One matrix through `RawNumberMatrixCodec`. */
    rawMatrix?: TextFloatSpec[][];
}

/**
 * 数值文本的 Kotlin 兼容格式与它的单向性（续挖 `solver/heuristic/session/codecs.rs`）。
 *
 * 这套编解码器存在的理由是**跨语言快照可互读**：Kotlin 侧 `Double.toString()` 的文本必须逐字复现。所以
 * `formatNumber` 不是随便的 `Display`，它带着一整组边界：
 *
 * 1. **整数值补 `.0`**：`1` → `"1.0"`（`integral()`）。
 * 2. **科学计数法门槛 `[1e-3, 1e7)` 左闭右开**：`1e-3` **在内** → `"0.001"`；`1e7` **在外** → `"1.0E7"`
 *    （`boundaryLower()` / `boundaryUpper()`）。差一个量级就换形状。
 * 3. **指数用大写 `E`、尾数补 `.0`**：`1e300` → `"1.0E300"`。
 * 4. **`-0.0` 的文本保留符号**：`"-0.0"`（数值上 `-0.0 === 0.0`，只能看文本，`negativeZero()`）。
 * 5. **非有限值是单向的**：`formatNumber` 对 `NaN`/`±inf` 走 `f64::to_string()`（`"NaN"` / `"inf"` / `"-inf"`），
 *    而 `parseNumber` **过滤非有限**。所以它的输出**不总能读回**——只有有限值往返（`nanRoundTrips()` 恒为 `false`）。
 *    注意 Rust 的 `"inf"` 也不是 Kotlin 的 `"Infinity"`。
 * 6. **`RawNumberMatrixCodec` 刻意不对称**：编码出 **JSON 数字**，解码却**同时接受数字与字符串**（"容忍历史快照"），
 *    所以 `rawAcceptsLegacyStrings()` 恒为 `true`——解码比编码宽，不是 bug。
 *
 * 另外 `json::numbers` 用 `Number::from_f64(..).unwrap_or(0)`，**非有限值直接变成 0**（`numbersDegradesNonFinite()`）。
 *
 * The Kotlin-compatible number text and how one-way it is (continuation). The codecs exist so snapshots stay readable across
 * languages, so `formatNumber` is not a casual `Display`. **Integral values get `.0`** (`integral()`). **The scientific
 * threshold `[1e-3, 1e7)` is half-open**: `1e-3` is **inside** (`"0.001"`) while `1e7` is **outside** (`"1.0E7"`) —
 * `boundaryLower()` / `boundaryUpper()`. **Uppercase `E` with a `.0` mantissa** (`1e300` → `"1.0E300"`). **`-0.0` keeps its
 * sign in text** (`negativeZero()`), which only the text shows since `-0.0 === 0.0`. **Non-finite values are one-way**:
 * `formatNumber` delegates them to `f64::to_string()` while `parseNumber` filters non-finite out, so the output **cannot always
 * be read back** — only finite values round-trip (`nanRoundTrips()` is always `false`) — and Rust's `"inf"` is not Kotlin's
 * `"Infinity"` either. Finally **`RawNumberMatrixCodec` is deliberately asymmetric**: it emits **JSON numbers** but decodes
 * **both numbers and strings** to tolerate older snapshots, so `rawAcceptsLegacyStrings()` is always `true` — a wider decoder,
 * not a bug. Separately `json::numbers` goes through `Number::from_f64(..).unwrap_or(0)`, so **non-finite becomes zero**
 * (`numbersDegradesNonFinite()`).
 */
export class NumberTextReport {
    private constructor(private state: NumberTextBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): NumberTextReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected number text report text");
        }
        return invoke(() => new NumberTextReport(wasm().NumberTextReport.fromJson(json)));
    }
    private raw(): NumberTextBinding {
        if (!this.state) throw new OspfError("Disposed", "number text report has been disposed");
        return this.state;
    }
    /** 数值条数 / The number of values. */
    floatCount(): number { return invoke(() => this.raw().floatCount()); }
    /** 第 `position` 个数值的输入描述 / The input description of value `position`. */
    floatInput(position: number): string { return invoke(() => this.raw().floatInput(position)); }
    /** 第 `position` 个数值的格式化文本 / The formatted text of value `position`. */
    floatFormatted(position: number): string { return invoke(() => this.raw().floatFormatted(position)); }
    /** 第 `position` 个数值能否读回 / Whether value `position` can be read back. */
    floatReparsed(position: number): boolean { return invoke(() => this.raw().floatReparsed(position)); }
    /** 第 `position` 个数值是否往返成功 / Whether value `position` round-trips. */
    floatRoundTrips(position: number): boolean { return invoke(() => this.raw().floatRoundTrips(position)); }
    /** 第 `position` 个数值能否被编解码器接受 / Whether the codec encodes value `position`. */
    floatCodecEncodes(position: number): boolean {
        return invoke(() => this.raw().floatCodecEncodes(position));
    }
    /** 向量的编码文本 / The encoded vector text. */
    vectorJson(): string { return invoke(() => this.raw().vectorJson()); }
    /** 向量是否往返成功 / Whether the vector round-trips. */
    vectorRoundTrips(): boolean { return invoke(() => this.raw().vectorRoundTrips()); }
    /** 矩阵的编码文本 / The encoded matrix text. */
    matrixJson(): string { return invoke(() => this.raw().matrixJson()); }
    /** 矩阵是否往返成功 / Whether the matrix round-trips. */
    matrixRoundTrips(): boolean { return invoke(() => this.raw().matrixRoundTrips()); }
    /** 原生矩阵的编码文本 / The raw matrix's encoded text. */
    rawJson(): string { return invoke(() => this.raw().rawJson()); }
    /** 原生矩阵是否往返成功 / Whether the raw matrix round-trips. */
    rawRoundTrips(): boolean { return invoke(() => this.raw().rawRoundTrips()); }
    /** 原生矩阵能否读回字符串历史快照 / Whether the raw decoder accepts legacy strings. */
    rawAcceptsLegacyStrings(): boolean { return invoke(() => this.raw().rawAcceptsLegacyStrings()); }
    /** `json::numbers` 是否降级非有限值 / Whether `json::numbers` degrades non-finite values. */
    numbersDegradesNonFinite(): boolean { return invoke(() => this.raw().numbersDegradesNonFinite()); }
    /** `1e-3` 的文本 / The text of `1e-3`. */
    boundaryLower(): string { return invoke(() => this.raw().boundaryLower()); }
    /** `1e7` 的文本 / The text of `1e7`. */
    boundaryUpper(): string { return invoke(() => this.raw().boundaryUpper()); }
    /** `1` 的文本 / The text of `1`. */
    integral(): string { return invoke(() => this.raw().integral()); }
    /** `-0.0` 的文本 / The text of `-0.0`. */
    negativeZero(): string { return invoke(() => this.raw().negativeZero()); }
    /** `NaN` 的文本 / The text of `NaN`. */
    nanText(): string { return invoke(() => this.raw().nanText()); }
    /** `NaN` 能否读回 / Whether `NaN` can be read back. */
    nanRoundTrips(): boolean { return invoke(() => this.raw().nanRoundTrips()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 多项式字面量。 / A polynomial literal. */
export interface BigMPolynomialSpec {
    /** 项（`[列索引, 系数]`）。 / The terms as `[column, coefficient]`. */
    terms?: Array<[number, number]>;
    /** 常数项（留在左端）。 / The constant, kept on the left-hand side. */
    constant: number;
}

/** Big-M 请求。 / The Big-M request. */
export interface BigMPolicyRequest {
    /** 要过一遍校验的字面量（`"NaN"` / `"inf"` 也接受）。 / Literals to push through the check. */
    probes?: string[];
    polynomial: BigMPolynomialSpec;
    indicatorIndex: number;
    /** `M`（会被夹紧到 `>= 1`）。 / The M, clamped up to `1`. */
    bigM: number;
    namePrefix: string;
}

/**
 * Big-M 的两段式校验与三个指示约束构造器的落地形状（续挖 `symbol/functions/big_m.rs`）。
 *
 * 这一层看起来只是"给个 M"，但有两个陷阱：
 *
 * 1. **拒绝与夹紧同时存在**：`!finite` 或 `<= 0` 报错，但 **`0 < m < 1` 被静默抬到 `1`**。
 *    `0.001` 不是被拒，而是**被改写**——传"几乎不惩罚"拿到的是 `1`，且毫无提示
 *    （`smallPositiveIsClamped()` / `zeroIsRefused()`）。
 * 2. **三个构造器的落地形状并不一致**：
 *    - `positive`：两条的指示系数都是 **`-M`**；`_ub: <= 0`、`_lb: >= EPSILON - M`。
 *      "严格大于"只落到 **`f64::EPSILON`**（≈2.2e-16），不是任何可配容差。
 *    - `nonnegative`：指示系数 **`-M`**；`_ub: <= 0`、`_lb: >= -M`。
 *    - `negative`：指示系数 **`+M`**（符号反了）；`_lb: >= 0`、`_ub: <= M - EPSILON`。
 *    - **产出顺序也不一致**：前两个先 `_ub` 后 `_lb`，`negative` 先 `_lb` 后 `_ub`（`ordersDiffer()`）。
 *      对"按下标取第 0 条"的消费方，这是真陷阱。
 * 3. 常数项**留在左端**（`rowLhsConstant(i)`），没有挪到 `rhs`。任何"把 lhs 常数搬到右边"的规范化都要自己做。
 *
 * The two-stage Big-M check and the shape the indicator builders emit (continuation). It looks like "just pass an M", with two
 * traps. **Refusal and clamping coexist**: `!finite` or `<= 0` is an error, but **`0 < m < 1` is silently raised to `1`**, so
 * `0.001` is not refused, it is **rewritten** with no signal (`smallPositiveIsClamped()` / `zeroIsRefused()`). And **the three
 * builders disagree**: `positive` puts **`-M`** on the indicator in both rows (`_ub: <= 0`, `_lb: >= EPSILON - M`), collapsing
 * "strictly greater" to **`f64::EPSILON`**, not a configurable tolerance; `nonnegative` uses **`-M`** (`_ub: <= 0`, `_lb: >= -M`);
 * `negative` uses **`+M`** with `_lb: >= 0` and `_ub: <= M - EPSILON`; and **the emission order differs** too — the first two
 * emit `_ub` first, `negative` emits `_lb` first (`ordersDiffer()`), a real trap for index-based consumers. The constant stays
 * **on the left** (`rowLhsConstant(i)`), so any canonicalisation that moves it must be done by the caller.
 */
export class BigMPolicyReport {
    private constructor(private state: BigMPolicyBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): BigMPolicyReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected big M report text");
        }
        return invoke(() => new BigMPolicyReport(wasm().BigMPolicyReport.fromJson(json)));
    }
    private raw(): BigMPolicyBinding {
        if (!this.state) throw new OspfError("Disposed", "big M report has been disposed");
        return this.state;
    }
    /** 默认 M / The default M. */
    defaultBigM(): number { return invoke(() => this.raw().defaultBigM()); }
    /** 最小 M / The minimum M. */
    minBigM(): number { return invoke(() => this.raw().minBigM()); }
    /** 探测条数 / The number of probes. */
    probeCount(): number { return invoke(() => this.raw().probeCount()); }
    /** 第 `position` 个探测的输入 / The input of probe `position`. */
    probeInput(position: number): string { return invoke(() => this.raw().probeInput(position)); }
    /** 第 `position` 个探测是否被接受 / Whether probe `position` was accepted. */
    probeAccepted(position: number): boolean { return invoke(() => this.raw().probeAccepted(position)); }
    /** 第 `position` 个探测的实际值 / The value actually used for probe `position`. */
    probeValue(position: number): number | undefined { return invoke(() => this.raw().probeValue(position)); }
    /** 第 `position` 个探测是否被夹紧 / Whether probe `position` was clamped. */
    probeClamped(position: number): boolean { return invoke(() => this.raw().probeClamped(position)); }
    /** 第 `position` 个探测的错误文本 / The error text of probe `position`. */
    probeError(position: number): string | undefined { return invoke(() => this.raw().probeError(position)); }
    /** 行数 / The number of rows. */
    rowCount(): number { return invoke(() => this.raw().rowCount()); }
    /** 第 `position` 行的构造器 / The builder of row `position`. */
    rowBuilder(position: number): string { return invoke(() => this.raw().rowBuilder(position)); }
    /** 第 `position` 行的名字 / The name of row `position`. */
    rowName(position: number): string { return invoke(() => this.raw().rowName(position)); }
    /** 第 `position` 行的关系 / The relation of row `position`. */
    rowComparison(position: number): string { return invoke(() => this.raw().rowComparison(position)); }
    /** 第 `position` 行的右端常数 / The right-hand side of row `position`. */
    rowRhs(position: number): number { return invoke(() => this.raw().rowRhs(position)); }
    /** 第 `position` 行的左端常数 / The left-hand constant of row `position`. */
    rowLhsConstant(position: number): number { return invoke(() => this.raw().rowLhsConstant(position)); }
    /** 第 `position` 行的指示系数 / The indicator coefficient of row `position`. */
    rowIndicatorCoefficient(position: number): number {
        return invoke(() => this.raw().rowIndicatorCoefficient(position));
    }
    /** 第 `position` 行的基础项（`"列,系数"`）。 / The base terms of row `position`. */
    rowTerms(position: number): string[] { return invoke(() => Array.from(this.raw().rowTerms(position))); }
    /** 每个构造器都恰好两行 / Whether each builder emits two rows. */
    twoRowsEach(): boolean { return invoke(() => this.raw().twoRowsEach()); }
    /** 小正数被夹紧 / Whether a small positive is clamped. */
    smallPositiveIsClamped(): boolean { return invoke(() => this.raw().smallPositiveIsClamped()); }
    /** 零被拒 / Whether zero is refused. */
    zeroIsRefused(): boolean { return invoke(() => this.raw().zeroIsRefused()); }
    /** 严格性就是机器 epsilon / Whether strictness is the machine epsilon. */
    strictnessIsMachineEpsilon(): boolean {
        return invoke(() => this.raw().strictnessIsMachineEpsilon());
    }
    /** `negative` 是否翻转指示符号 / Whether `negative` flips the indicator sign. */
    negativeFlipsIndicatorSign(): boolean {
        return invoke(() => this.raw().negativeFlipsIndicatorSign());
    }
    /** 产出顺序是否不一致 / Whether the emission orders differ. */
    ordersDiffer(): boolean { return invoke(() => this.raw().ordersDiffer()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 条件多项式字面量。 / A condition polynomial literal. */
export interface ConditionPolynomialSpec {
    terms?: Array<[number, number]>;
    constant: number;
}

/** 条件界。 / The condition bounds. */
export interface ConditionBoundsSpec {
    lower: number;
    upper: number;
}

/** 三值请求。 / The three-valued request. */
export interface ConditionalSemanticsRequest {
    condition: ConditionPolynomialSpec;
    /** 声明的界（用于 `branch_coverage`）。 / The declared bounds. */
    bounds: ConditionBoundsSpec;
    /** 严格边界（必须有限且为正）。 / The strict boundary (finite and positive). */
    strictBoundary: number;
    /** 调用方符号名（不给则走自动命名）。 / The caller symbol name (auto-named when absent). */
    name?: string;
    /** 要分类的条件差值。 / The condition differences to classify. */
    probes?: number[];
    /** 可分性探测的界（每条关系各跑一遍）。 / Bounds to probe per relation. */
    boundProbes?: ConditionBoundsSpec[];
}

/**
 * 条件的三值语义与 `if_` / `if_legacy` 两条入口的类型分叉（续挖 `symbol/functions/semantic.rs`）。
 *
 * `semantic.rs` 六个入口看起来是同一件事的别名，实测是**两条互不兼容的路**：
 *
 * 1. **`if_` / `ifNamed` 返回条件指示函数**：带关系 + 严格边界 + 界，**三值**（真/假/**不可判定**）。
 *    结果变量 `<符号名>_if`、条件指示变量 `<符号名>_if_nz`。注意 **`if_` 不接调用方名字**，自动名是
 *    `conditional_indicator_<id>`；只有 `ifNamed` 才用你的名字。
 * 2. **`ifLegacy` / `ifNamedLegacy` 返回阈值二值化**：**阈值被钉死成 `0`**，这条路上根本没有关系与严格边界的概念。
 *    它是**被限制过的**便利入口，不是"另一种写法"。
 * 3. **`legacyIf` / `legacyIfNamed` 是纯别名**：形状完全一致，但**每次调用都新分配符号 ID 与变量组**——
 *    "等价"不等于"同一个对象"（`aliasSameShape` 真、`aliasSameIdentity` 假）。
 *
 * 三值语义的两条最容易踩：
 *
 * 4. **不可判定窗口随关系翻转**：`greater` / `lessEqual` 是 `[0, b]`，`greaterEqual` / `less` 是 `[-b, 0]`。
 *    也就是**非严格关系照样留一段死区，只是挪到了另一侧**——以为 `>=` 没有死区是错的。
 * 5. **界完全落在窗口里才被拒**：判据是"严格内缩"，所以**贴着端点**（`greater` 时 `lower === 0`）是**接受**的。
 *    半开拒绝，不是接触即拒。
 *
 * `undefined` 的二值化结果是**无值**（`relationClassificationBinary` 返回 `undefined`），不是 `0`——把它当 0
 * 会把"不可判定"当成"假"。`relationCoverage(i)` 回答声明的界能否证明条件恒真/恒假；恒定时急切展开会塌成定值行。
 *
 * The three-valued semantics and the type split between `if_` and `if_legacy` (continuation). The six entries in
 * `semantic.rs` look like aliases of one thing but are **two incompatible paths**. **`if_` / `ifNamed` return the conditional
 * indicator** with a relation, a strict boundary and bounds — **three-valued** (true / false / **undecidable**), naming the
 * result `<symbol>_if` and the indicator `<symbol>_if_nz`; note **`if_` takes no caller name** and auto-names as
 * `conditional_indicator_<id>`, while only `ifNamed` uses yours. **`ifLegacy` / `ifNamedLegacy` return threshold binaryzation**
 * with **the threshold pinned to `0`** and no notion of a relation at all — a **restricted** convenience entry, not another
 * spelling. **`legacyIf` / `legacyIfNamed` are pure aliases**: identical in shape but **allocating a fresh symbol id and
 * variable group per call**, so "equivalent" is not "the same object" (`aliasSameShape` true, `aliasSameIdentity` false). Two
 * easy mistakes in the three-valued rules: **the undecidable window flips with the relation** — `[0, b]` for
 * `greater`/`lessEqual`, `[-b, 0]` for `greaterEqual`/`less` — so **a non-strict relation still leaves a dead band, just on
 * the other side**; and **bounds are refused only when strictly inside the window**, so **touching an endpoint is accepted**
 * (a half-open refusal). The binary result of `undefined` is **absent**, not `0` — treating it as `0` silently reads
 * "undecidable" as "false". `relationCoverage(i)` answers whether the declared bounds prove the condition constantly
 * true/false; when constant, eager expansion collapses to fixed-value rows.
 */
export class ConditionalSemanticsReport {
    private constructor(private state: ConditionalSemanticsBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): ConditionalSemanticsReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected conditional semantics report text");
        }
        return invoke(() => new ConditionalSemanticsReport(
            wasm().ConditionalSemanticsReport.fromJson(json)));
    }
    private raw(): ConditionalSemanticsBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "conditional semantics report has been disposed");
        }
        return this.state;
    }
    /** 严格边界 / The strict boundary. */
    strictBoundary(): number { return invoke(() => this.raw().strictBoundary()); }
    /** 关系条数 / The number of relations. */
    relationCount(): number { return invoke(() => this.raw().relationCount()); }
    /** 第 `position` 种关系的名字 / The name of relation `position`. */
    relationName(position: number): string { return invoke(() => this.raw().relationName(position)); }
    /** 第 `position` 种关系的窗口下端 / The window's lower end. */
    relationUndefinedLower(position: number): number {
        return invoke(() => this.raw().relationUndefinedLower(position));
    }
    /** 第 `position` 种关系的窗口上端 / The window's upper end. */
    relationUndefinedUpper(position: number): number {
        return invoke(() => this.raw().relationUndefinedUpper(position));
    }
    /** 第 `position` 种关系的分类条数 / The number of classifications. */
    relationClassificationCount(position: number): number {
        return invoke(() => this.raw().relationClassificationCount(position));
    }
    /** 第 `position` 种关系第 `cell` 个分类的差值 / The difference of classification `cell`. */
    relationClassificationDifference(position: number, cell: number): number {
        return invoke(() => this.raw().relationClassificationDifference(position, cell));
    }
    /** 第 `position` 种关系第 `cell` 个分类的三值 / The truth value of classification `cell`. */
    relationClassificationTruth(position: number, cell: number): "true" | "false" | "undefined" {
        return invoke(() =>
            (this.raw().relationClassificationTruth(position, cell) as "true" | "false" | "undefined"));
    }
    /** 第 `position` 种关系第 `cell` 个分类的二值结果（**不可判定时无值**）。 
     *  The binary result of classification `cell` (**absent when undecidable**). */
    relationClassificationBinary(position: number, cell: number): number | undefined {
        return invoke(() => this.raw().relationClassificationBinary(position, cell));
    }
    /** 第 `position` 种关系证明的常量真值 / The constant truth relation `position` proves. */
    relationCoverage(position: number): "true" | "false" | undefined {
        return invoke(() => (this.raw().relationCoverage(position) as "true" | "false" | undefined));
    }
    /** 界探测条数 / The number of bounds probes. */
    boundsProbeCount(): number { return invoke(() => this.raw().boundsProbeCount()); }
    /** 第 `position` 个界探测的关系 / The relation of bounds probe `position`. */
    boundsProbeRelation(position: number): string {
        return invoke(() => this.raw().boundsProbeRelation(position));
    }
    /** 第 `position` 个界探测的下界 / The lower bound of probe `position`. */
    boundsProbeLower(position: number): number { return invoke(() => this.raw().boundsProbeLower(position)); }
    /** 第 `position` 个界探测的上界 / The upper bound of probe `position`. */
    boundsProbeUpper(position: number): number { return invoke(() => this.raw().boundsProbeUpper(position)); }
    /** 第 `position` 个界探测是否被接受 / Whether probe `position` was accepted. */
    boundsProbeAccepted(position: number): boolean {
        return invoke(() => this.raw().boundsProbeAccepted(position));
    }
    /** 第 `position` 个界探测的错误文本 / The error text of probe `position`. */
    boundsProbeReason(position: number): string | undefined {
        return invoke(() => this.raw().boundsProbeReason(position));
    }
    /** 入口条数 / The number of entries. */
    entryCount(): number { return invoke(() => this.raw().entryCount()); }
    /** 第 `position` 个入口的名字 / The name of entry `position`. */
    entryName(position: number): string { return invoke(() => this.raw().entryName(position)); }
    /** 第 `position` 个入口的类型 / The kind of entry `position`. */
    entryKind(position: number): "conditionalIndicator" | "thresholdBinaryzation" {
        return invoke(() =>
            (this.raw().entryKind(position) as "conditionalIndicator" | "thresholdBinaryzation"));
    }
    /** 第 `position` 个入口的结果变量名 / The result variable name. */
    entryResultVariable(position: number): string {
        return invoke(() => this.raw().entryResultVariable(position));
    }
    /** 第 `position` 个入口的指示变量名 / The indicator variable name. */
    entryIndicatorVariable(position: number): string | undefined {
        return invoke(() => this.raw().entryIndicatorVariable(position));
    }
    /** 第 `position` 个入口的阈值 / The threshold of entry `position`. */
    entryThreshold(position: number): number | undefined {
        return invoke(() => this.raw().entryThreshold(position));
    }
    /** 第 `position` 个入口的方法 / The method of entry `position`. */
    entryMethod(position: number): string | undefined {
        return invoke(() => this.raw().entryMethod(position));
    }
    /** 第 `position` 个入口的变量组 ID / The variable group id of entry `position`. */
    entryGroupId(position: number): number { return invoke(() => this.raw().entryGroupId(position)); }
    /** 别名对条数 / The number of alias pairs. */
    aliasCount(): number { return invoke(() => this.raw().aliasCount()); }
    /** 第 `position` 对别名的说明 / The pair description of alias `position`. */
    aliasPair(position: number): string { return invoke(() => this.raw().aliasPair(position)); }
    /** 第 `position` 对别名的形状是否一致 / Whether alias `position` agrees in shape. */
    aliasSameShape(position: number): boolean { return invoke(() => this.raw().aliasSameShape(position)); }
    /** 第 `position` 对别名是否同一个对象 / Whether alias `position` is the same object. */
    aliasSameIdentity(position: number): boolean {
        return invoke(() => this.raw().aliasSameIdentity(position));
    }
    /** 不可判定窗口随关系翻转 / Whether the window flips with the relation. */
    windowFlipsWithRelation(): boolean { return invoke(() => this.raw().windowFlipsWithRelation()); }
    /** 贴着端点被接受 / Whether touching an endpoint is accepted. */
    touchingEndpointIsAccepted(): boolean { return invoke(() => this.raw().touchingEndpointIsAccepted()); }
    /** 界完全落在窗口内被拒 / Whether bounds inside the window are refused. */
    interiorIsRefused(): boolean { return invoke(() => this.raw().interiorIsRefused()); }
    /** 不可判定没有二值结果 / Whether undecidable carries no binary result. */
    undefinedHasNoBinary(): boolean { return invoke(() => this.raw().undefinedHasNoBinary()); }
    /** `ifLegacy` 的阈值恒为 0 / Whether the legacy threshold is always zero. */
    legacyThresholdIsZero(): boolean { return invoke(() => this.raw().legacyThresholdIsZero()); }
    /** 别名形状一致但不是同一个对象 / Whether aliases agree in shape but not identity. */
    aliasesAreNotShared(): boolean { return invoke(() => this.raw().aliasesAreNotShared()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 预算请求。 / The budget request. */
export interface SearchBudgetRequest {
    limit: number;
    used?: number;
    objectiveCalls?: number;
    evaluations: number;
    /** 步数额度（**不参与准入**）。 / The step allowance (**does not gate admission**). */
    steps?: number;
    grandchildEvaluations?: number;
    claims: number;
    grandchildClaims?: number;
    randomState: number;
    randomDraws: number;
    splitId: string;
}

/**
 * 评估预算的嵌套计费契约与随机流的可恢复性（续挖 `solver/heuristic/session/budget.rs`）。
 *
 * 这段代码的作用是"子任务不能超支外层配额"，但有三条规定不在字面上：
 *
 * 1. **只有成功才消费**：片段先本地加一，再向父级（或无父时向全局）申请，**父级拒绝时把本地计数减回去**
 *    （`parentRefusalRollsBack()`）。所以"本地够、父级不够"不会留下脏计数。
 * 2. **`steps` 不参与准入**：准入只看 `evaluations` 与时间；`steps = 0` 的片段照样能领评估
 *    （`stepsDoNotGateAdmission()`）。把步数上限当评估上限会读错。
 * 3. **`denied` 一旦置位就永久为真**（只置位、从不清零），因为它的用途是**阻止残缺代提交**
 *    （`deniedIsSticky()`）。
 *
 * 还有一条容易漏：**孙片段的领取会消耗父片段的本地额度**，所以**父片段本地额度被自身领满后，孙片段即使全局还有
 * 余量也会被拒**——嵌套是"配额守恒"，不只是记账。`childRemaining()` 是 min(本地剩余, 父级剩余)。
 *
 * 随机流是 SplitMix64：**每个状态都能当快照**（`randomSnapshotState()` → 用同 state 重新 `new` 即可恢复，
 * `randomResumeMatches()`），`split(id)` 派生稳定子流**不消费父流**（`randomSplitMovesParent()` 恒为 `false`），
 * 同种子必同序列。这正是会话恢复不会改变随机序列的原因。
 *
 * The nested accounting contract and the random stream's resumability (continuation). The code exists so a child cannot
 * overspend its parent, but three of its rules are not in the prose. **Only successful claims are consumed**: a slice bumps
 * locally, then asks the parent (or the global when there is none), **rolling back when refused**
 * (`parentRefusalRollsBack()`), so "local room, no parent room" leaves no dirty count. **`steps` does not gate
 * admission** — only `evaluations` and time do, so `steps = 0` still claims (`stepsDoNotGateAdmission()`); reading the step
 * cap as the evaluation cap is wrong. And **`denied` is sticky** — set, never cleared, because it blocks
 * partial-generation commits (`deniedIsSticky()`). One more easy miss: **a grandchild's claim consumes its parent's local
 * allowance**, so **once the parent's own local quota is used up the grandchild is refused even with global room** — the
 * nesting conserves quota, it does not merely record it. `childRemaining()` is min(local, parent). The random stream is
 * SplitMix64 where **every state is a snapshot** (`randomSnapshotState()`, resume with `new(state)`,
 * `randomResumeMatches()`), `split(id)` derives a stable child **without consuming the parent**
 * (`randomSplitMovesParent()` is always `false`), and identical seeds agree — the reason resuming a session never changes
 * the stream.
 */
export class SearchBudgetReport {
    private constructor(private state: SearchBudgetBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): SearchBudgetReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected search budget report text");
        }
        return invoke(() => new SearchBudgetReport(wasm().SearchBudgetReport.fromJson(json)));
    }
    private raw(): SearchBudgetBinding {
        if (!this.state) throw new OspfError("Disposed", "search budget report has been disposed");
        return this.state;
    }
    /** 上限 / The limit. */
    limit(): number { return invoke(() => this.raw().limit()); }
    /** 起始已用 / The starting usage. */
    usedBefore(): number { return invoke(() => this.raw().usedBefore()); }
    /** 申请后的已用（**不含抽干探测**）/ The usage after the claims (**the drain probe excluded**). */
    usedAfter(): number { return invoke(() => this.raw().usedAfter()); }
    /** 申请后的剩余 / The remainder after the claims. */
    remainingAfter(): number { return invoke(() => this.raw().remainingAfter()); }
    /** 目标调用次数 / The objective call count. */
    objectiveCalls(): number { return invoke(() => this.raw().objectiveCalls()); }
    /** 子片段评估额度 / The child's evaluation allowance. */
    childEvaluations(): number { return invoke(() => this.raw().childEvaluations()); }
    /** 子片段步数额度 / The child's step allowance. */
    childSteps(): number { return invoke(() => this.raw().childSteps()); }
    /** 子片段已用 / The child's usage. */
    childUsed(): number { return invoke(() => this.raw().childUsed()); }
    /** 子片段剩余 / The child's remainder. */
    childRemaining(): number { return invoke(() => this.raw().childRemaining()); }
    /** 子片段是否被拒过 / Whether the child was ever denied. */
    childDenied(): boolean { return invoke(() => this.raw().childDenied()); }
    /** 子片段获批次数 / The child's granted claims. */
    childGranted(): number { return invoke(() => this.raw().childGranted()); }
    /** 孙片段评估额度 / The grandchild's evaluation allowance. */
    grandchildEvaluations(): number { return invoke(() => this.raw().grandchildEvaluations()); }
    /** 孙片段已用 / The grandchild's usage. */
    grandchildUsed(): number { return invoke(() => this.raw().grandchildUsed()); }
    /** 孙片段剩余 / The grandchild's remainder. */
    grandchildRemaining(): number { return invoke(() => this.raw().grandchildRemaining()); }
    /** 孙片段是否被拒过 / Whether the grandchild was ever denied. */
    grandchildDenied(): boolean { return invoke(() => this.raw().grandchildDenied()); }
    /** 孙片段获批次数 / The grandchild's granted claims. */
    grandchildGranted(): number { return invoke(() => this.raw().grandchildGranted()); }
    /** 随机流起始状态 / The random stream's starting state. */
    randomStateBefore(): number { return invoke(() => this.raw().randomStateBefore()); }
    /** 抽取到的单位值 / The drawn unit values. */
    randomDraws(): number[] { return invoke(() => Array.from(this.raw().randomDraws())); }
    /** 抽取后的状态 / The state after drawing. */
    randomStateAfter(): number { return invoke(() => this.raw().randomStateAfter()); }
    /** 快照状态 / The snapshot state. */
    randomSnapshotState(): number { return invoke(() => this.raw().randomSnapshotState()); }
    /** 从快照恢复后的抽取 / The draw after resuming. */
    randomResumedDraw(): number { return invoke(() => this.raw().randomResumedDraw()); }
    /** 恢复是否复现最后一次抽取 / Whether the resume reproduces the last draw. */
    randomResumeMatches(): boolean { return invoke(() => this.raw().randomResumeMatches()); }
    /** 派生子流的起始状态 / The derived child stream's starting state. */
    randomSplitState(): number { return invoke(() => this.raw().randomSplitState()); }
    /** `split` 是否消费父流 / Whether `split` consumes the parent. */
    randomSplitMovesParent(): boolean { return invoke(() => this.raw().randomSplitMovesParent()); }
    /** 同种子是否同序列 / Whether identical seeds agree. */
    randomIdenticalSeedsAgree(): boolean { return invoke(() => this.raw().randomIdenticalSeedsAgree()); }
    /** 单位值是否都在 `[0,1)` / Whether every draw is in `[0, 1)`. */
    randomDrawsInUnitInterval(): boolean { return invoke(() => this.raw().randomDrawsInUnitInterval()); }
    /** 全局在额度用尽后停发 / Whether the global stops at its limit. */
    globalStopsAtLimit(): boolean { return invoke(() => this.raw().globalStopsAtLimit()); }
    /** `steps` 不参与准入 / Whether `steps` fails to gate admission. */
    stepsDoNotGateAdmission(): boolean { return invoke(() => this.raw().stepsDoNotGateAdmission()); }
    /** 孙片段消耗计入子片段与全局 / Whether grandchild claims charge both. */
    childChargesParent(): boolean { return invoke(() => this.raw().childChargesParent()); }
    /** 父级拒绝时本地计数回退 / Whether a parent refusal rolls the local count back. */
    parentRefusalRollsBack(): boolean { return invoke(() => this.raw().parentRefusalRollsBack()); }
    /** `denied` 粘性 / Whether `denied` is sticky. */
    deniedIsSticky(): boolean { return invoke(() => this.raw().deniedIsSticky()); }
    /** 剩余取较小值 / Whether the remainder is the stricter of the two. */
    remainingIsMinimum(): boolean { return invoke(() => this.raw().remainingIsMinimum()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条字段注册。 / One field registration. */
export interface SchemaFieldSpec {
    path: string;
    backendField: string;
}

/** 字段映射请求。 / The field-mapping request. */
export interface PredicateSchemaRequest {
    name: string;
    /** 注册的字段（**允许重复**）。 / The registered fields (**duplicates allowed**). */
    fields?: SchemaFieldSpec[];
    probes?: string[];
    /** 用同名字段注册的路径（后端名取 `path.value()`）。 / Paths registered with the same-name helper. */
    sameFieldPaths?: string[];
}

/**
 * 谓词 schema 的字段映射表，以及它两套解析口径的分歧（续挖 `persistence/expression/predicate_schema.rs`）。
 *
 * 只有一个字段列表，却提供**两个**查询口径，而且两者在重复注册时给出**不同**答案：
 *
 * 1. **`resolve(path)` 是先到先得**（`resolveIsFirstWins()`），**`toFieldMap()` 是后到覆盖**
 *    （`mapIsLastWins()`）。同一路径注册两次时，`resolveResolved(i)` 给第一个、`resolveMapped(i)` 给最后一个，
 *    `resolveAgrees(i)` 为 `false` —— 两者**直接矛盾**。
 * 2. **`withField` 不去重**：重复注册是允许的，重不重复只能靠 `duplicatePath(i)` 自己看。
 * 3. **未知路径是静默 `None`**（`unknownIsSilent()`），不报错。这与同一框架里
 *    `ConditionalIndicatorFunction` 的 `index_of` **正相反**：后者对未注册符号**硬报错**（`SymbolNotRegistered`）。
 *    所以把无值当成"没有这个字段"是安全的，把它当成"这个字段值为空"是错的。
 * 4. **`sameFieldBackend(i)` 取 `path.value()`**（去前缀后的路径本体），不是整条原始字符串。
 *
 * The field table and the split between its two lookups (continuation). One field list, **two** lookups, and they disagree on
 * duplicates. **`resolve(path)` is first-wins** (`resolveIsFirstWins()`) while **`toFieldMap()` is last-wins**
 * (`mapIsLastWins()`), so a path registered twice gives the first through `resolveResolved(i)` and the last through
 * `resolveMapped(i)` with `resolveAgrees(i)` false — **a direct contradiction**. **`withField` does not dedupe**, so
 * duplicates are legal and only visible through `duplicatePath(i)`. **An unknown path is a silent `None`**
 * (`unknownIsSilent()`), the exact opposite of `ConditionalIndicatorFunction::index_of`, which hard-errors
 * (`SymbolNotRegistered`); reading the absence as "no such field" is safe, as "the field is null" is not. And
 * `sameFieldBackend(i)` comes from `path.value()`, not the raw string.
 */
export class PredicateSchemaReport {
    private constructor(private state: PredicateSchemaBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): PredicateSchemaReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected predicate schema report text");
        }
        return invoke(() => new PredicateSchemaReport(wasm().PredicateSchemaReport.fromJson(json)));
    }
    private raw(): PredicateSchemaBinding {
        if (!this.state) throw new OspfError("Disposed", "predicate schema report has been disposed");
        return this.state;
    }
    /** schema 名 / The schema name. */
    name(): string { return invoke(() => this.raw().name()); }
    /** 注册条数 / The registration count. */
    fieldCount(): number { return invoke(() => this.raw().fieldCount()); }
    /** 去重后的路径数 / The number of distinct paths. */
    distinctPaths(): number { return invoke(() => this.raw().distinctPaths()); }
    /** 重复路径条数 / The number of duplicated paths. */
    duplicateCount(): number { return invoke(() => this.raw().duplicateCount()); }
    /** 第 `position` 个重复路径 / The duplicated path at `position`. */
    duplicatePath(position: number): string { return invoke(() => this.raw().duplicatePath(position)); }
    /** 探测条数 / The number of probes. */
    resolveCount(): number { return invoke(() => this.raw().resolveCount()); }
    /** 第 `position` 次探测的路径 / The probed path at `position`. */
    resolvePath(position: number): string { return invoke(() => this.raw().resolvePath(position)); }
    /** 第 `position` 次探测 `resolve` 的答案 / What `resolve` says. */
    resolveResolved(position: number): string | undefined {
        return invoke(() => this.raw().resolveResolved(position));
    }
    /** 第 `position` 次探测字段表的答案 / What the field map says. */
    resolveMapped(position: number): string | undefined {
        return invoke(() => this.raw().resolveMapped(position));
    }
    /** 第 `position` 次探测两套口径是否一致 / Whether the two lookups agree. */
    resolveAgrees(position: number): boolean { return invoke(() => this.raw().resolveAgrees(position)); }
    /** 同名字段条数 / The number of same-name registrations. */
    sameFieldCount(): number { return invoke(() => this.raw().sameFieldCount()); }
    /** 第 `position` 条同名字段的原始路径 / The raw path. */
    sameFieldPath(position: number): string { return invoke(() => this.raw().sameFieldPath(position)); }
    /** 第 `position` 条同名字段推导出的后端名 / The derived backend name. */
    sameFieldBackend(position: number): string {
        return invoke(() => this.raw().sameFieldBackend(position));
    }
    /** `resolve` 是先到先得 / Whether `resolve` is first-wins. */
    resolveIsFirstWins(): boolean { return invoke(() => this.raw().resolveIsFirstWins()); }
    /** 字段表是后到覆盖 / Whether the map is last-wins. */
    mapIsLastWins(): boolean { return invoke(() => this.raw().mapIsLastWins()); }
    /** 未知路径静默无值 / Whether an unknown path is silently absent. */
    unknownIsSilent(): boolean { return invoke(() => this.raw().unknownIsSilent()); }
    /** `resolver()` 与 `resolve()` 一致 / Whether `resolver()` agrees with `resolve()`. */
    resolverMatchesResolve(): boolean { return invoke(() => this.raw().resolverMatchesResolve()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个排序项字面量。 / One sort item literal. */
export interface SortItemSpec {
    path: string;
    direction: "asc" | "desc";
    /** `first` / `last` / 不指定。 / `first` / `last` / unspecified. */
    nulls?: "first" | "last";
}

/** 排序请求。 / The sort request. */
export interface SortByRequest {
    left?: SortItemSpec[];
    right?: SortItemSpec[];
    appendAsc?: string[];
    appendDesc?: string[];
    supportProbe?: string;
}

/**
 * 排序描述符的组合代数与"空值排序支持"的 4×2 矩阵（续挖 `persistence/expression/sort_by.rs`）。
 *
 * 有信息量的不是 `SortBy` 本身（就是个 `Vec<SortItem>`），而是两处容易误用：
 *
 * 1. **`NullsOrderSupport` 的 4×2 表里 `Auto` 与 `Always` 的回答完全相同**——都恒为 `true`
 *    （`autoAnswersLikeAlways()`）。也就是 `Auto`（"由后端决定"）**在这个查询里不表示"不知道"**，而是**乐观地
 *    声称支持**。想"先问后端"的调用方拿不到"未知"答案，只能自己额外区分。
 *    另两格：`Never` 恒 `false`；`OnlyAsc` 只看方向（升序支持、降序不支持）。
 * 2. **`then` / `Add` 只拼不整理**（`joinKeepsOrderAndDuplicates()`）：不排序、不去重，重复路径原样留下，
 *    重不重复只能看 `duplicatePath(i)`。`thenEqualsAdd()` 保证 `+` 与 `then` 等价。
 *
 * 另外 `asc` / `desc` 构造的 `nulls` 是**不指定**（第三态，与 `first` / `last` 并列），
 * `defaultsCarryNoNulls()` 恒真——默认值由调用方决定。
 *
 * The composition algebra and the 4×2 null-ordering matrix (continuation). What matters is not `SortBy` itself (a
 * `Vec<SortItem>`) but two easy misuses. **In the four-by-two table `Auto` answers exactly like `Always`** — both constantly
 * `true` (`autoAnswersLikeAlways()`), so `Auto` ("decided by the backend") does **not** mean "unknown" here, it
 * **optimistically claims support**, and a caller that wants to ask the backend first cannot get an "unknown" answer and must
 * distinguish it separately; the other cells are `Never` always `false` and `OnlyAsc` direction-only (ascending yes,
 * descending no). And **`then` / `Add` only concatenate** (`joinKeepsOrderAndDuplicates()`): no sorting, no dedupe, duplicates
 * stay in the list and only `duplicatePath(i)` reveals them, while `thenEqualsAdd()` guarantees `+` matches `then`. Also the
 * `asc` / `desc` constructors leave `nulls` **unspecified** — a genuine third state beside `first` / `last`, with
 * `defaultsCarryNoNulls()` always true — so the caller owns the default.
 */
export class SortByReport {
    private constructor(private state: SortByBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): SortByReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected sort by report text");
        }
        return invoke(() => new SortByReport(wasm().SortByReport.fromJson(json)));
    }
    private raw(): SortByBinding {
        if (!this.state) throw new OspfError("Disposed", "sort by report has been disposed");
        return this.state;
    }
    /** 拼接结果的条数 / The number of joined items. */
    combinedCount(): number { return invoke(() => this.raw().combinedCount()); }
    /** 第 `position` 项的路径 / The path of item `position`. */
    combinedPath(position: number): string { return invoke(() => this.raw().combinedPath(position)); }
    /** 第 `position` 项的方向 / The direction of item `position`. */
    combinedDirection(position: number): "asc" | "desc" {
        return invoke(() => this.raw().combinedDirection(position) as "asc" | "desc");
    }
    /** 第 `position` 项的空值顺序 / The null ordering of item `position`. */
    combinedNulls(position: number): "first" | "last" | undefined {
        return invoke(() => this.raw().combinedNulls(position) as "first" | "last" | undefined);
    }
    /** 追加升序后的条数 / The number of items after appending ascending fields. */
    appendedAscCount(): number { return invoke(() => this.raw().appendedAscCount()); }
    /** 追加升序后第 `position` 项的路径 / The path at `position`. */
    appendedAscPath(position: number): string {
        return invoke(() => this.raw().appendedAscPath(position));
    }
    /** 追加降序后的条数 / The number of items after appending descending fields. */
    appendedDescCount(): number { return invoke(() => this.raw().appendedDescCount()); }
    /** 追加降序后第 `position` 项的方向 / The direction at `position`. */
    appendedDescDirection(position: number): "asc" | "desc" {
        return invoke(() => this.raw().appendedDescDirection(position) as "asc" | "desc");
    }
    /** 支持矩阵行数 / The number of support rows. */
    supportCount(): number { return invoke(() => this.raw().supportCount()); }
    /** 支持矩阵格数 / The number of support cells. */
    supportCells(): number { return invoke(() => this.raw().supportCells()); }
    /** 第 `position` 行的策略名 / The policy of row `position`. */
    supportPolicy(position: number): string { return invoke(() => this.raw().supportPolicy(position)); }
    /** 第 `position` 行对升序的支持 / Support for ascending at `position`. */
    supportAsc(position: number): boolean { return invoke(() => this.raw().supportAsc(position)); }
    /** 第 `position` 行对降序的支持 / Support for descending at `position`. */
    supportDesc(position: number): boolean { return invoke(() => this.raw().supportDesc(position)); }
    /** 重复路径条数 / The number of duplicated paths. */
    duplicateCount(): number { return invoke(() => this.raw().duplicateCount()); }
    /** 第 `position` 个重复路径 / The duplicated path at `position`. */
    duplicatePath(position: number): string { return invoke(() => this.raw().duplicatePath(position)); }
    /** `then` 与 `+` 等价 / Whether `then` and `+` agree. */
    thenEqualsAdd(): boolean { return invoke(() => this.raw().thenEqualsAdd()); }
    /** 拼接只拼不整理 / Whether joining only concatenates. */
    joinKeepsOrderAndDuplicates(): boolean {
        return invoke(() => this.raw().joinKeepsOrderAndDuplicates());
    }
    /** `Auto` 与 `Always` 回答一致 / Whether `Auto` answers like `Always`. */
    autoAnswersLikeAlways(): boolean { return invoke(() => this.raw().autoAnswersLikeAlways()); }
    /** `Never` 恒不支持 / Whether `Never` never supports. */
    neverNeverSupports(): boolean { return invoke(() => this.raw().neverNeverSupports()); }
    /** `OnlyAsc` 只看方向 / Whether `OnlyAsc` looks at the direction only. */
    onlyAscFollowsDirection(): boolean { return invoke(() => this.raw().onlyAscFollowsDirection()); }
    /** 默认不带空值顺序 / Whether the defaults carry no null ordering. */
    defaultsCarryNoNulls(): boolean { return invoke(() => this.raw().defaultsCarryNoNulls()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 定义域请求。 / The domain request. */
export interface VariableKindDomainRequest {
    probes?: number[];
}

/**
 * 变量类型的定义域注册表（续挖 `variable/variable_type.rs` 的八个标记类型）。
 *
 * 八种类型各自回答：`var_type()`（枚举）、`minValue()` / `maxValue()`（可能无界）、`isInteger()`、
 * `isSigned()`，外加 `isValidValue()` 这个取值判定。这张表是所有写入/校验收口的共同依据，而它有三条反直觉的实测：
 *
 * 1. **整数性根本没被 `isValidValue` 校验**：`binary` 的界是 `[0, 1]`，所以 **`0.5` 是合法的 binary 值**
 *    （`integralityIsNotEnforced()`）。`ternary`（`[0,2]`）、`balancedTernary`（`[-1,1]`）、`integer`
 *    同样放行 `0.5`。离散性不在这里执行——把 `isInteger()` 当成"值必须整数"会错。
 * 2. **`percentage` 的上界是 `1`，不是 `100`**（`percentageUpperIsOne()`）：百分比是 0..1 的比例，`100` 非法。
 * 3. **`isSigned()` 与下界是两套信息**（`signednessIsIndependent()`）：`binary` / `ternary` / `percentage`
 *    的 `minValue()` 都是 `0`（不可能为负）**却都声明 `isSigned() === true`**；只有 `uinteger` /
 *    `ucontinuous` 是 `false`。所以"有符号"不是"能取负"。
 *
 * 另外 `integer` / `continuous` 两侧无界，`uinteger` / `ucontinuous` 只有下界 `0`，所以
 * `unboundedKindsAcceptLarge()` 对它们为真，而三个离散类型拒 `1e9`。
 *
 * The variable-type domain registry (continuation). The eight kinds each answer `var_type()`, `minValue()` / `maxValue()`
 * (possibly unbounded), `isInteger()`, `isSigned()` and the `isValidValue()` decision, and the shared table has three
 * counter-intuitive measured facts. **Integrality is not enforced by `isValidValue` at all**: `binary` is bounded by
 * `[0, 1]`, so **`0.5` is a legal binary value** (`integralityIsNotEnforced()`), and `ternary` (`[0,2]`),
 * `balancedTernary` (`[-1,1]`) and `integer` all accept `0.5` too — discreteness is not enforced here, so reading
 * `isInteger()` as "the value must be integral" is wrong. **`percentage` is bounded by `1`, not `100`**
 * (`percentageUpperIsOne()`): a percentage is a 0..1 ratio and `100` is invalid. And **`isSigned()` and the lower bound are
 * independent** (`signednessIsIndependent()`): `binary` / `ternary` / `percentage` all have `minValue() === 0` (they cannot go
 * negative) yet **all declare `isSigned() === true`**; only `uinteger` / `ucontinuous` say `false` — so "signed" is not "can go
 * negative". Also `integer` / `continuous` are unbounded on both sides while `uinteger` / `ucontinuous` only have a zero lower
 * bound, which is why `unboundedKindsAcceptLarge()` holds for them and the three discrete kinds reject `1e9`.
 */
export class VariableKindDomainReport {
    private constructor(private state: VariableKindDomainBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): VariableKindDomainReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected variable kind domain report text");
        }
        return invoke(() => new VariableKindDomainReport(
            wasm().VariableKindDomainReport.fromJson(json)));
    }
    private raw(): VariableKindDomainBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "variable kind domain report has been disposed");
        }
        return this.state;
    }
    /** 探测条数 / The number of probes. */
    probeCount(): number { return invoke(() => this.raw().probeCount()); }
    /** 第 `position` 个探测值 / The probed value at `position`. */
    probe(position: number): number { return invoke(() => this.raw().probe(position)); }
    /** 类型条数 / The number of kinds. */
    kindCount(): number { return invoke(() => this.raw().kindCount()); }
    /** 第 `position` 个类型的名字 / The kind name at `position`. */
    kindName(position: number): string { return invoke(() => this.raw().kindName(position)); }
    /** 第 `position` 个类型的下界 / The lower bound at `position`. */
    kindMin(position: number): number | undefined { return invoke(() => this.raw().kindMin(position)); }
    /** 第 `position` 个类型的上界 / The upper bound at `position`. */
    kindMax(position: number): number | undefined { return invoke(() => this.raw().kindMax(position)); }
    /** 第 `position` 个类型是否是整数类型 / Whether kind `position` is integral. */
    kindIsInteger(position: number): boolean { return invoke(() => this.raw().kindIsInteger(position)); }
    /** 第 `position` 个类型是否声明有符号 / Whether kind `position` declares itself signed. */
    kindIsSigned(position: number): boolean { return invoke(() => this.raw().kindIsSigned(position)); }
    /** 第 `position` 个类型是否接受 `0.5` / Whether kind `position` accepts `0.5`. */
    kindHalfValid(position: number): boolean { return invoke(() => this.raw().kindHalfValid(position)); }
    /** 第 `position` 个类型是否接受 `1e9` / Whether kind `position` accepts `1e9`. */
    kindLargeValid(position: number): boolean { return invoke(() => this.raw().kindLargeValid(position)); }
    /** 第 `position` 个类型第 `probe` 个取值的判定 / The verdict for probe `probe`. */
    kindValidAt(position: number, probe: number): boolean {
        return invoke(() => this.raw().kindValidAt(position, probe));
    }
    /** 枚举与类型名一致 / Whether the enum matches the type name. */
    kindMatchesTypeName(): boolean { return invoke(() => this.raw().kindMatchesTypeName()); }
    /** 有界时 `min <= max` / Whether bounded kinds are ordered. */
    boundsAreOrdered(): boolean { return invoke(() => this.raw().boundsAreOrdered()); }
    /** 整数性没被校验 / Whether integrality is unenforced. */
    integralityIsNotEnforced(): boolean { return invoke(() => this.raw().integralityIsNotEnforced()); }
    /** `percentage` 的上界是 1 / Whether `percentage` is bounded by 1. */
    percentageUpperIsOne(): boolean { return invoke(() => this.raw().percentageUpperIsOne()); }
    /** 无界类型接受大值 / Whether unbounded kinds accept large values. */
    unboundedKindsAcceptLarge(): boolean { return invoke(() => this.raw().unboundedKindsAcceptLarge()); }
    /** 有符号与下界是两套信息 / Whether signedness is independent of the lower bound. */
    signednessIsIndependent(): boolean { return invoke(() => this.raw().signednessIsIndependent()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个聚合场景。 / One aggregation scenario. */
export interface AssemblyCase {
    name: string;
    withBaseline?: boolean;
    provenOptimal?: boolean;
    optimalValue?: number;
    baselineStatus?: "reachable" | "unreachable" | "unknown" | "unsupported";
    perturbationCount?: number;
    perturbationStatus?: "reachable" | "unreachable" | "unknown" | "unsupported";
    noteUnavailable?: string[];
}

/** 聚合请求。 / The aggregation request. */
export interface CriticalAssemblyRequest {
    cases?: AssemblyCase[];
}

/**
 * 临界约束分析报告的聚合规则（续挖 `analysis/pipeline.rs` 的 `CriticalConstraintAnalysisReportBuilder`）。
 *
 * 七段分析（baseline → activity → fixed-integer LP → perturbation → target → conflict → MUS）的产物**不是平铺收集**，
 * `build` 里有四条会改变结论的规则：
 *
 * 1. **baseline 是唯一硬前置**（`baselineIsTheOnlyPrerequisite()`）：没有它直接失败，其余六段都可以缺。
 * 2. **缺 activity 不是"跳过"而是 `Unsupported`**（`missingActivityDegradesToUnsupported()`）：会补一条
 *    `"activity stage was not run"` 并降级总体状态。所以**已证明最优的 baseline + 什么都没跑 ≠ `reachable`**
 *    （`provenOptimalIsNotEnough()`）。
 * 3. **`noteUnavailable` 是粘性的**（`noteUnavailableIsSticky()`）：调一次就置 `hasUnsupportedStage`，之后再给多少
 *    好报告都退不回来；同一理由传两次会**原样记两次**，不合并。
 * 4. **effectiveness 需要已证明的 baseline 目标值**（`effectivenessNeedsProvenObjective()`）：扰动报告齐了但没有
 *    `optimalValue`，整份报告**直接失败**，不会退化成"没有有效性结论"。
 *
 * 总体状态走 `combine_status` 的**最弱环节**（4 元格，见 `CombineStatusReport`），任一阶段 `unknown` / `unsupported`
 * 都会吞掉 `reachable`。注意 `hasFunnel` 蕴含 `hasEffectiveness`（漏斗是排名的前置），反之不成立。
 *
 * The aggregation rules of the critical-constraint analysis report (continuation). The seven stages' outputs are not merely
 * collected: `build` carries four rules that change the conclusion. **The baseline is the only hard prerequisite**
 * (`baselineIsTheOnlyPrerequisite()`); **a missing activity stage is not "skipped" but `unsupported`**
 * (`missingActivityDegradesToUnsupported()`) — it appends `"activity stage was not run"` and degrades the status, so a
 * proven-optimal baseline with nothing else run is **not** `reachable` (`provenOptimalIsNotEnough()`); **`noteUnavailable` is
 * sticky** (`noteUnavailableIsSticky()`) and the same reason passed twice is recorded twice verbatim; and **effectiveness
 * needs the proven baseline objective** (`effectivenessNeedsProvenObjective()`) — perturbations without `optimalValue` fail
 * the whole report rather than degrading to "no effectiveness conclusion". The status is the weakest link through
 * `combine_status`, and note `hasFunnel` implies `hasEffectiveness`, not the other way round.
 */
export class CriticalAssemblyReport {
    private constructor(private state: CriticalAssemblyBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): CriticalAssemblyReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected critical assembly report text");
        }
        return invoke(() => new CriticalAssemblyReport(
            wasm().CriticalAssemblyReport.fromJson(json)));
    }
    private raw(): CriticalAssemblyBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "critical assembly report has been disposed");
        }
        return this.state;
    }
    /** 场景条数 / The number of cases. */
    rowCount(): number { return invoke(() => this.raw().rowCount()); }
    /** 第 `position` 个场景的名字 / The case name at `position`. */
    rowName(position: number): string { return invoke(() => this.raw().rowName(position)); }
    /** 第 `position` 个场景是否建成 / Whether case `position` built. */
    rowBuilt(position: number): boolean { return invoke(() => this.raw().rowBuilt(position)); }
    /** 第 `position` 个场景的失败原因 / The failure reason of case `position`. */
    rowError(position: number): string | undefined {
        return invoke(() => this.raw().rowError(position));
    }
    /** 第 `position` 个场景的总体状态 / The overall status of case `position`. */
    rowStatus(position: number): string | undefined {
        return invoke(() => this.raw().rowStatus(position));
    }
    /** 第 `position` 个场景的 schema 版本 / The schema version of case `position`. */
    rowSchemaVersion(position: number): string | undefined {
        return invoke(() => this.raw().rowSchemaVersion(position));
    }
    /** 第 `position` 个场景的未完成原因条数 / The number of unavailable reasons. */
    rowReasonCount(position: number): number {
        return invoke(() => this.raw().rowReasonCount(position));
    }
    /** 第 `position` 个场景第 `reason` 条未完成原因 / The reason at `reason`. */
    rowReason(position: number, reason: number): string {
        return invoke(() => this.raw().rowReason(position, reason));
    }
    /** 第 `position` 个场景是否带有效性排名 / Whether case `position` carries a ranking. */
    rowHasEffectiveness(position: number): boolean {
        return invoke(() => this.raw().rowHasEffectiveness(position));
    }
    /** 第 `position` 个场景是否带候选漏斗 / Whether case `position` carries a funnel. */
    rowHasFunnel(position: number): boolean { return invoke(() => this.raw().rowHasFunnel(position)); }
    /** baseline 是唯一硬前置 / Whether the baseline is the only hard prerequisite. */
    baselineIsTheOnlyPrerequisite(): boolean {
        return invoke(() => this.raw().baselineIsTheOnlyPrerequisite());
    }
    /** 缺 activity 会降级 / Whether a missing activity degrades to `unsupported`. */
    missingActivityDegradesToUnsupported(): boolean {
        return invoke(() => this.raw().missingActivityDegradesToUnsupported());
    }
    /** `noteUnavailable` 粘性 / Whether `noteUnavailable` is sticky. */
    noteUnavailableIsSticky(): boolean { return invoke(() => this.raw().noteUnavailableIsSticky()); }
    /** effectiveness 需要已证明目标值 / Whether effectiveness needs a proven objective. */
    effectivenessNeedsProvenObjective(): boolean {
        return invoke(() => this.raw().effectivenessNeedsProvenObjective());
    }
    /** 已证明最优也挡不住降级 / Whether a proven baseline cannot outvote a missing stage. */
    provenOptimalIsNotEnough(): boolean { return invoke(() => this.raw().provenOptimalIsNotEnough()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 缓存键身份请求。 / The cache-key identity request. */
export interface FlattenIdentityRequest {
    coefficient: number;
    varIndex: number;
    otherVar: number;
    forgedKey: number;
}

/**
 * 展平缓存键是**内存地址**，不是结构性身份（续挖 `model/flatten` 的 `CacheKey` / `cache_key()`）。
 *
 * `CacheKey` 只有一个 `u64` 字段，三个构造器全部取地址（`fromBox` / `fromArc` / `fromRaw`），而
 * `QuadraticMonomial::cache_key()` 的实现就是内层 `Box` 的地址。四条对调用方有实际后果的结论：
 *
 * 1. **内容相等 ≠ 键相等**（`equalContentGivesDistinctKeys()`）：两个字段完全一样的单项式各有各的 Box，
 *    键必然不同。**键不能当等值判据**。
 * 2. **`clone()` 换新键**（`cloneGetsItsOwnKey()`）：克隆分配新 Box，把键存下来再去查克隆体，查不到。
 * 3. **`fromRaw` 可以伪造**（`fromRawForgesCollisions()`）：任意 `u64` 都能变成键，所以"键相等"只说明地址相同
 *    或被伪造成相同。用 `Map<key, _>` 做缓存时，唯一性来自**分配**而非语义。
 * 4. **按键集合不按内容去重**（`hashsetDoesNotDedupe()`）：内容相同的三个实例占三个位置。
 *
 * 好的一面：一个**未被移动**的实例键稳定（Box 内部地址不随外层移动），所以"一次建模过程内"用它做缓存可行；
 * 但键**不能**跨进程/跨次运行持久化，也不能用来判断两个模型是否等价（`rebuiltPolynomialGetsAFreshKey()` 恒真）。
 *
 * 注意 `firstKey()` / `cloneKey()` / `twinKey()` 返回的是**字符串**：地址是 64 位整数，用 `number` 会丢精度，
 * 而且这些值每次运行都不同，**不能当断言目标**，只能比较彼此是否相等。
 *
 * The flatten cache key is a memory address, not a structural identity (continuation). `CacheKey` has a single `u64`, all
 * three constructors take addresses, and `cache_key()` is literally the inner box's address. **Equal content does not mean
 * equal keys** (`equalContentGivesDistinctKeys()`), so a key cannot serve as an equality test; **`clone()` gets a new key**
 * (`cloneGetsItsOwnKey()`), so a stored key will never find the clone; **`fromRaw` forges keys**
 * (`fromRawForgesCollisions()`), so "equal keys" only means "same or forged address" and a keyed cache bases uniqueness on
 * allocation rather than semantics; and a **key set does not dedupe by content** (`hashsetDoesNotDedupe()`). The good news:
 * an unmoved instance keeps a stable key, so keying a cache within one modeling pass works — but keys cannot persist across
 * processes or runs and cannot decide model equivalence (`rebuiltPolynomialGetsAFreshKey()` is always true). Note the three
 * key accessors return **strings**: an address is a 64-bit integer that `number` would truncate, and the values differ every
 * run, so they must never be assertion targets — only compared against each other.
 */
export class FlattenIdentityReport {
    private constructor(private state: FlattenIdentityBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): FlattenIdentityReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected flatten identity report text");
        }
        return invoke(() => new FlattenIdentityReport(wasm().FlattenIdentityReport.fromJson(json)));
    }
    private raw(): FlattenIdentityBinding {
        if (!this.state) throw new OspfError("Disposed", "flatten identity report has been disposed");
        return this.state;
    }
    /** 本体键（地址字符串） / The original key (an address string). */
    firstKey(): string { return invoke(() => this.raw().firstKey()); }
    /** 克隆体的键 / The clone's key. */
    cloneKey(): string { return invoke(() => this.raw().cloneKey()); }
    /** 独立构造者的键 / The twin's key. */
    twinKey(): string { return invoke(() => this.raw().twinKey()); }
    /** 内容相同但键不同 / Whether equal content gives distinct keys. */
    equalContentGivesDistinctKeys(): boolean {
        return invoke(() => this.raw().equalContentGivesDistinctKeys());
    }
    /** `clone()` 换新键 / Whether `clone()` gets its own key. */
    cloneGetsItsOwnKey(): boolean { return invoke(() => this.raw().cloneGetsItsOwnKey()); }
    /** 内容不同键也不同 / Whether different content gives a different key. */
    differentContentGivesDistinctKeys(): boolean {
        return invoke(() => this.raw().differentContentGivesDistinctKeys());
    }
    /** `fromRaw` 可伪造 / Whether `fromRaw` forges collisions. */
    fromRawForgesCollisions(): boolean { return invoke(() => this.raw().fromRawForgesCollisions()); }
    /** 键集合不按内容去重 / Whether a key set fails to dedupe by content. */
    hashsetDoesNotDedupe(): boolean { return invoke(() => this.raw().hashsetDoesNotDedupe()); }
    /** 重建换新键 / Whether a rebuild gets a fresh key. */
    rebuiltPolynomialGetsAFreshKey(): boolean {
        return invoke(() => this.raw().rebuiltPolynomialGetsAFreshKey());
    }
    /** 单项式是线性项 / Whether the monomial is linear. */
    monomialIsLinear(): boolean { return invoke(() => this.raw().monomialIsLinear()); }
    /** 系数 / The coefficient. */
    coefficient(): number { return invoke(() => this.raw().coefficient()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个 master cut 项。 / One master cut term. */
export interface MasterCutTerm {
    variable: string;
    coefficient: number;
}

/** master cut 请求。 / The master cut request. */
export interface MasterCutRequest {
    id: string;
    /** 稀疏项（**允许同一变量出现多次**）。 / The sparse terms (**duplicates allowed**). */
    terms?: MasterCutTerm[];
    sense: "le" | "ge" | "eq";
    rhs: number;
    proofReference?: string;
    origin?: string;
    reason?: string;
    /** 用 `verified_global` 构造（global + verified + 必须带证明引用）。 / Build through `verified_global`. */
    verifiedGlobal?: boolean;
    normalize?: boolean;
    normalizeTwice?: boolean;
}

/**
 * master cut 的两级不变量与表达式身份（续挖 `solver/logic_based_benders.rs` 的 `MasterCut`）。
 *
 * `MasterCut` 有**两级**校验，而且它们拒绝的东西**不一样**：
 *
 * 1. **`new`（构造）只合并不把关**（`newMergesDuplicates()` / `newKeepsZeros()`）：同一变量出现两次会被累加；
 *    **零系数照样留下**；空白 ID、非有限 `rhs` 都能构造出来。`verifiedGlobal` 只是 `new` 的预填
 *    （`global` + `verified` + `some(证明引用)`）。
 * 2. **`normalize`（规范化）才是真正的校验入口**（`normalizeDropsZeros()` / `normalizeRefusesBlankId()` /
 *    `normalizeRefusesNonFiniteRhs()` / `verifiedNeedsReference()`）：空白 ID、非有限 `rhs`、`verified` 却没带
 *    证明引用，全部在这里拒绝；同时**丢掉零系数**、把证明引用 trim 后把空串变回 `undefined`
 *    （`blankReferenceIsDropped()`）。所以**"构造成功"不等于"能用"**。
 * 3. **`expressionKey()` 是表达式身份，不是 cut 身份**（`expressionKeyIgnoresIdentity()`）：它只拼 `sense` +
 *    `rhs` 位模式 + 每一项的 `名字长度:名字=系数位模式`，**完全忽略** `id` / `origin` / `reason` / `validity` /
 *    `proofStatus`。两个来源不同、理由不同但数学上相同的 cut 得到**同一个 key**——去重按语义、不按出处。
 *
 * 另：`normalize` 是**幂等**的（`normalizeIsIdempotent()` 恒真），`normalizeTwice` 与 `normalize` 结果一致。
 *
 * The two-level invariants of a master cut and its expression identity (continuation). **`new` only merges and does not
 * gate** (`newMergesDuplicates()` / `newKeepsZeros()`): a repeated variable is summed, **zero coefficients survive**, and a
 * blank id or non-finite `rhs` all construct fine, while `verifiedGlobal` is merely a prefilled `new`. **`normalize` is the
 * real gate** (`normalizeDropsZeros()` / `normalizeRefusesBlankId()` / `normalizeRefusesNonFiniteRhs()` /
 * `verifiedNeedsReference()`): blank ids, non-finite `rhs` and `verified` without a reference are refused there, zeros are
 * dropped and a blanked reference becomes `undefined` — so "constructed" does not mean "usable". And **`expressionKey()` is
 * the expression's identity, not the cut's** (`expressionKeyIgnoresIdentity()`): only `sense`, the `rhs` bits and each
 * term's `name-length:name=coefficient-bits` go in, ignoring `id` / `origin` / `reason` / `validity` / `proofStatus`, so
 * mathematically equal cuts from different origins share one key — dedupe by semantics, not provenance. `normalize` is
 * idempotent, so `normalizeTwice` matches `normalize`.
 */
export class MasterCutReport {
    private constructor(private state: MasterCutBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): MasterCutReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected master cut report text");
        }
        return invoke(() => new MasterCutReport(wasm().MasterCutReport.fromJson(json)));
    }
    private raw(): MasterCutBinding {
        if (!this.state) throw new OspfError("Disposed", "master cut report has been disposed");
        return this.state;
    }
    /** 是否规范化过 / Whether `normalize` ran. */
    normalized(): boolean { return invoke(() => this.raw().normalized()); }
    /** cut ID / The cut ID. */
    id(): string { return invoke(() => this.raw().id()); }
    /** 方向 / The sense. */
    sense(): "le" | "ge" | "eq" { return invoke(() => this.raw().sense() as "le" | "ge" | "eq"); }
    /** 右端项 / The right-hand side. */
    rhs(): number { return invoke(() => this.raw().rhs()); }
    /** 项数 / The number of terms. */
    termCount(): number { return invoke(() => this.raw().termCount()); }
    /** 第 `position` 项的变量 ID / The variable ID at `position`. */
    termVariable(position: number): string { return invoke(() => this.raw().termVariable(position)); }
    /** 第 `position` 项的系数 / The coefficient at `position`. */
    termCoefficient(position: number): number {
        return invoke(() => this.raw().termCoefficient(position));
    }
    /** 证明状态 / The proof status. */
    proofStatus(): string { return invoke(() => this.raw().proofStatus()); }
    /** 证明引用 / The proof reference. */
    proofReference(): string | undefined { return invoke(() => this.raw().proofReference()); }
    /** 有效性范围 / The validity scope. */
    validity(): string { return invoke(() => this.raw().validity()); }
    /** 编码类型 / The encoding kind. */
    encoding(): string { return invoke(() => this.raw().encoding()); }
    /** 表达式身份 / The expression identity. */
    expressionKey(): string { return invoke(() => this.raw().expressionKey()); }
    /** `new` 合并同变量 / Whether `new` merges duplicates. */
    newMergesDuplicates(): boolean { return invoke(() => this.raw().newMergesDuplicates()); }
    /** `new` 保留零系数 / Whether `new` keeps zeros. */
    newKeepsZeros(): boolean { return invoke(() => this.raw().newKeepsZeros()); }
    /** `normalize` 丢零系数 / Whether `normalize` drops zeros. */
    normalizeDropsZeros(): boolean { return invoke(() => this.raw().normalizeDropsZeros()); }
    /** `normalize` 拒空白 ID / Whether `normalize` refuses a blank ID. */
    normalizeRefusesBlankId(): boolean { return invoke(() => this.raw().normalizeRefusesBlankId()); }
    /** `normalize` 拒非有限 `rhs` / Whether `normalize` refuses a non-finite `rhs`. */
    normalizeRefusesNonFiniteRhs(): boolean {
        return invoke(() => this.raw().normalizeRefusesNonFiniteRhs());
    }
    /** `verified` 必须带引用 / Whether `verified` needs a reference. */
    verifiedNeedsReference(): boolean { return invoke(() => this.raw().verifiedNeedsReference()); }
    /** 空白引用被丢掉 / Whether a blank reference is dropped. */
    blankReferenceIsDropped(): boolean { return invoke(() => this.raw().blankReferenceIsDropped()); }
    /** 表达式身份忽略出处 / Whether the expression key ignores provenance. */
    expressionKeyIgnoresIdentity(): boolean {
        return invoke(() => this.raw().expressionKeyIgnoresIdentity());
    }
    /** `normalize` 幂等 / Whether `normalize` is idempotent. */
    normalizeIsIdempotent(): boolean { return invoke(() => this.raw().normalizeIsIdempotent()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 布尔作用域折叠请求。 / The scope folding request. */
export interface BooleanFoldRequest {
    /** 先逐条收集的字段名。 / The field names collected one by one. */
    collected?: string[];
    /** 收集后再合并的参数；空表示不调用 `and` / `or`。 / The arguments for `and` / `or`; empty means no call. */
    combined?: string[];
    mode?: "and" | "or";
}

/**
 * 布尔表达式作用域的三条折叠规则（续挖 `persistence/expression/boolean_expression_dsl.rs`）。
 *
 * `BooleanExpressionScope` 是收集器：每个 `eq` / `ne` / `inValues` / `push` 都会**克隆一份**进作用域并返回原表达式，
 * 最后 `buildAnd` / `buildOr` 合成。折叠有三条**不对称**规则：
 *
 * 1. **空作用域不报错，直接给常量**（`emptyScopeIsConstant()`）：`buildAnd` → `constant(true)`、
 *    `buildOr` → `constant(false)`（`emptyAndShape()` / `emptyOrShape()`）。"什么都没加"是真空真，不是错误。
 * 2. **单元素被拆掉外壳**（`singleElementLosesWrapper()`）：`and` / `or` **只在两个以上**时出现，一条表达式
 *    原样返回。所以**不能假设拿到的总是 `and` 节点**——按形状分发会漏掉单条；同理 `and([a])` 这种**单参数**
 *    调用也不产生外壳（`singleArgumentUnwraps()`），结果就是那一项。
 * 3. **`and(...)` / `or(...)` 只折叠"已收集的尾部后缀"**（`trailingSuffixFolds()`）：先移出后缀再合成。
 *    只有参数**正好是作用域末尾几项且顺序一致**时才折叠；顺序不同（`wrongOrderDoesNotFold()`）就不折叠，
 *    作用域里同时留着原项与合成项，`buildAnd` 得到**更深一层**的嵌套。它**不是去重**：夹在中间的同名项照样留下
 *    （`interleavedItemSurvives()`）。
 *
 * The three folding rules of the boolean expression scope (continuation). The scope is a collector: every `eq` / `ne` /
 * `inValues` / `push` **clones** into it and returns the expression, and `buildAnd` / `buildOr` fold it. **An empty scope is
 * not an error** (`emptyScopeIsConstant()`): `buildAnd` → `constant(true)`, `buildOr` → `constant(false)` — "added nothing"
 * is vacuously true. **A single element loses its wrapper** (`singleElementLosesWrapper()`): `and` / `or` only appear with two
 * or more, so a caller must not assume it always receives an `and` node, and a **single-argument** call like `and([a])`
 * produces no wrapper either (`singleArgumentUnwraps()`) — the result is that term. And **`and(...)` / `or(...)` only fold a
 * collected trailing suffix** (`trailingSuffixFolds()`): folding happens only when the arguments are exactly the scope's last
 * items in the same order; a different order (`wrongOrderDoesNotFold()`) leaves both the originals and the combined node, one
 * extra level of nesting. It is **not a dedupe**: an interleaved same-name item survives (`interleavedItemSurvives()`).
 */
export class BooleanFoldReport {
    private constructor(private state: BooleanFoldBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): BooleanFoldReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected boolean fold report text");
        }
        return invoke(() => new BooleanFoldReport(wasm().BooleanFoldReport.fromJson(json)));
    }
    private raw(): BooleanFoldBinding {
        if (!this.state) throw new OspfError("Disposed", "boolean fold report has been disposed");
        return this.state;
    }
    /** 合成结果的形状 / The built shape. */
    shape(): string { return invoke(() => this.raw().shape()); }
    /** 合成结果的节点数 / The built node count. */
    nodeCount(): number { return invoke(() => this.raw().nodeCount()); }
    /** 空 `and` 的形状 / The empty `and` shape. */
    emptyAndShape(): string { return invoke(() => this.raw().emptyAndShape()); }
    /** 空 `or` 的形状 / The empty `or` shape. */
    emptyOrShape(): string { return invoke(() => this.raw().emptyOrShape()); }
    /** 单元素不带外壳 / Whether a single element loses its wrapper. */
    singleElementLosesWrapper(): boolean { return invoke(() => this.raw().singleElementLosesWrapper()); }
    /** 空作用域给常量 / Whether an empty scope yields a constant. */
    emptyScopeIsConstant(): boolean { return invoke(() => this.raw().emptyScopeIsConstant()); }
    /** 尾部后缀被折叠 / Whether a collected trailing suffix folds. */
    trailingSuffixFolds(): boolean { return invoke(() => this.raw().trailingSuffixFolds()); }
    /** 顺序不同就不折叠 / Whether a different order does not fold. */
    wrongOrderDoesNotFold(): boolean { return invoke(() => this.raw().wrongOrderDoesNotFold()); }
    /** 单参数直接就是那一项 / Whether a single argument is the term itself. */
    singleArgumentUnwraps(): boolean { return invoke(() => this.raw().singleArgumentUnwraps()); }
    /** 折叠不是去重 / Whether folding is not a dedupe. */
    interleavedItemSurvives(): boolean { return invoke(() => this.raw().interleavedItemSurvives()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 字段解析请求。 / The field resolution request. */
export interface FieldResolutionRequest {
    path: string;
    /** 命中的后端字段名；空表示不命中。 / The backend field name; blank means no match. */
    backend?: string;
    /** 歧义候选；两个以上才构成歧义。 / Ambiguity candidates; two or more are ambiguous. */
    candidates?: string[];
    /** 解析器配置错误原因；非空即配置非法。 / The configuration error; non-blank means invalid configuration. */
    invalidReason?: string;
}

/**
 * 字段解析的四态词汇与**有损**的兼容桥（续挖 `persistence/expression/persistence_field_resolver.rs`）。
 *
 * 框架给字段解析定义了**四种**结果，并要求实现者只实现详细接口：
 *
 * | 状态 | 含义 |
 * |---|---|
 * | `resolved` | 解析成功，`resolved()` 给出后端字段名 |
 * | `missing` | **字段不存在** |
 * | `ambiguous` | **字段有多个候选**，`candidate(i)` 列出候选 |
 * | `invalidConfiguration` | **解析器自身配置非法**，`reason()` 给出原因 |
 *
 * 结论两条：
 *
 * 1. **四态 → 二态是有损的**：兼容用的可空接口（`nullable()`）把后**三种全部压成 `undefined`**
 *    （`missingCollapses()` / `ambiguousCollapses()` / `invalidConfigurationCollapses()`），因此
 *    `failuresAreIndistinguishable()` 恒真。把 `undefined` 读成"字段没有值"，就会把**配置写错了**当成**字段为空**——
 *    与 `PredicateSchemaReport` 里 `index_of` / `resolve` 那类"同一个对象两套答案"是同一类坑。
 * 2. **闭包式 resolver 天生只有两态**（`closureIsTwoState()`）：`Fn(&str) -> Option<C>` 这个 blanket impl 让闭包
 *    直接成为 resolver，但它**永远报不出** `ambiguous` / `invalidConfiguration`——最方便的那条路信息最少。
 *
 * 另：闭包收到的是 **`path.value()`**（去前缀的路径本体，`closureSees()`），不是整条原始字符串。
 *
 * The four-state field-resolution vocabulary and its lossy compatibility bridge (continuation). The framework defines
 * **four** outcomes and asks implementers to supply the detailed one: `resolved` (with the backend field), `missing`, 
 * `ambiguous` (with candidates) and `invalidConfiguration` (with a reason). **Four states collapse lossily into two**: the
 * nullable compatibility interface (`nullable()`) flattens the last **three into `undefined`**
 * (`missingCollapses()` / `ambiguousCollapses()` / `invalidConfigurationCollapses()`), so
 * `failuresAreIndistinguishable()` is always true — reading `undefined` as "this field has no value" mistakes a broken
 * configuration for an empty field, the same trap as `index_of` versus `resolve` in `PredicateSchemaReport`. And **a closure
 * resolver is two-state by construction** (`closureIsTwoState()`): the `Fn(&str) -> Option<C>` blanket impl makes closures
 * resolvers, yet they can **never** report `ambiguous` or `invalidConfiguration` — the convenient path is the least
 * informative one. Also, closures receive **`path.value()`** (`closureSees()`), the prefix-free path body, not the raw
 * string.
 */
export class FieldResolutionReport {
    private constructor(private state: FieldResolutionBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): FieldResolutionReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected field resolution report text");
        }
        return invoke(() => new FieldResolutionReport(wasm().FieldResolutionReport.fromJson(json)));
    }
    private raw(): FieldResolutionBinding {
        if (!this.state) throw new OspfError("Disposed", "field resolution report has been disposed");
        return this.state;
    }
    /** 状态名（**不叫 `state`**：那是内部的绑定字段名）。 / The state name (**not `state`**: that is the binding field). */
    resolutionState(): "resolved" | "missing" | "ambiguous" | "invalidConfiguration" {
        return invoke(() => this.raw().state() as "resolved" | "missing" | "ambiguous"
            | "invalidConfiguration");
    }
    /** 解析出的字段 / The resolved field. */
    resolved(): string | undefined { return invoke(() => this.raw().resolved()); }
    /** 歧义候选条数 / The number of ambiguous candidates. */
    candidateCount(): number { return invoke(() => this.raw().candidateCount()); }
    /** 第 `position` 个候选 / The candidate at `position`. */
    candidate(position: number): string { return invoke(() => this.raw().candidate(position)); }
    /** 配置错误原因 / The configuration error. */
    reason(): string | undefined { return invoke(() => this.raw().reason()); }
    /** 可空接口的答案 / What the nullable interface says. */
    nullable(): string | undefined { return invoke(() => this.raw().nullable()); }
    /** 闭包 resolver 的答案 / What the closure resolver says. */
    closure(): string | undefined { return invoke(() => this.raw().closure()); }
    /** 闭包看到的路径文本 / The path text the closure receives. */
    closureSees(): string { return invoke(() => this.raw().closureSees()); }
    /** 四态齐全 / Whether all four states exist. */
    fourStatesExist(): boolean { return invoke(() => this.raw().fourStatesExist()); }
    /** `missing` 压成 `undefined` / Whether `missing` collapses. */
    missingCollapses(): boolean { return invoke(() => this.raw().missingCollapses()); }
    /** `ambiguous` 压成 `undefined` / Whether `ambiguous` collapses. */
    ambiguousCollapses(): boolean { return invoke(() => this.raw().ambiguousCollapses()); }
    /** `invalidConfiguration` 压成 `undefined` / Whether `invalidConfiguration` collapses. */
    invalidConfigurationCollapses(): boolean {
        return invoke(() => this.raw().invalidConfigurationCollapses());
    }
    /** 三种失败不可区分 / Whether the three failures are indistinguishable. */
    failuresAreIndistinguishable(): boolean {
        return invoke(() => this.raw().failuresAreIndistinguishable());
    }
    /** 闭包只有两态 / Whether the closure is two-state. */
    closureIsTwoState(): boolean { return invoke(() => this.raw().closureIsTwoState()); }
    /** 闭包收到路径本体 / Whether the closure receives the path body. */
    closureSeesPathValue(): boolean { return invoke(() => this.raw().closureSeesPathValue()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 标量函数词汇请求。 / The scalar function vocabulary request. */
export interface ScalarFunctionRequest {
    /** 用作参数引用的路径。 / The path used as the argument reference. */
    path: string;
    /** 给 `coalesce` 的参数个数。 / The argument count for `coalesce`. */
    coalesceArity?: number;
    /** 直接交给 `scalarFunction` 的名字（**故意不校验**）。 / The raw name (**deliberately unvalidated**). */
    rawName?: string;
    /** 直接交给 `scalarFunction` 的参数个数。 / The raw argument count. */
    rawArity?: number;
}

/**
 * 标量函数词汇表是**约定而不是约束**（续挖 `persistence/expression/scalar_function_dsl.rs`）。
 *
 * 1. **六个名字常量与六个构造器一一对应**（`constantsMatchBuilders()`）：`abs` / `lower` / `upper` / `trim` /
 *    `length` 是**单参**，`coalesce` 是**唯一变参**（`coalesceIsTheOnlyVariadic()`）。`rowConstant(i)` /
 *    `rowName(i)` / `rowArity(i)` 给出六个常量的形状，六个名字互不相同（`namesAreDistinct()`）。
 * 2. **`coalesce` 连零个参数都收**（`coalesceAcceptsNoArguments()`）：没有"至少要有一个参数"这种检查。
 * 3. **`scalarFunction(name, args)` 完全不校验**（`rawNameIsUnvalidated()`）：任意名字（空白、大写、带空格）、
 *    任意参数个数都照收。所以这六个常量是**写给调用方的约定，不是运行期能指望的约束**——写错名字不会有任何报错，
 *    只会在下游后端的函数表里查不到。名字**大小写敏感**（`nameMatchingIsCaseSensitive()`）：`"ABS"` 与
 *    `"abs"` 是两个不同函数，`rawName()` 原样回读，不会被归一化。
 *
 * The scalar function vocabulary is a convention, not a constraint (continuation). **Six name constants map one-to-one onto
 * six builders** (`constantsMatchBuilders()`): `abs` / `lower` / `upper` / `trim` / `length` are unary while `coalesce` is
 * the **only variadic** one (`coalesceIsTheOnlyVariadic()`), with `rowConstant(i)` / `rowName(i)` / `rowArity(i)` describing
 * each and `namesAreDistinct()` holding. **`coalesce` even accepts zero arguments** (`coalesceAcceptsNoArguments()`) — there
 * is no "at least one argument" check. And **`scalarFunction(name, args)` validates nothing** (`rawNameIsUnvalidated()`): any
 * name (blank, uppercase, padded) with any arity is accepted, so the six constants are a **convention for callers, not a
 * runtime constraint** — a misspelled name never errors here, it merely fails to match the backend's function table later,
 * and matching is **case sensitive** (`nameMatchingIsCaseSensitive()`), with `rawName()` echoed back un-normalised.
 */
export class ScalarFunctionReport {
    private constructor(private state: ScalarFunctionBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): ScalarFunctionReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected scalar function report text");
        }
        return invoke(() => new ScalarFunctionReport(wasm().ScalarFunctionReport.fromJson(json)));
    }
    private raw(): ScalarFunctionBinding {
        if (!this.state) throw new OspfError("Disposed", "scalar function report has been disposed");
        return this.state;
    }
    /** 行数 / The number of rows. */
    rowCount(): number { return invoke(() => this.raw().rowCount()); }
    /** 第 `position` 行的常量名 / The constant of row `position`. */
    rowConstant(position: number): string { return invoke(() => this.raw().rowConstant(position)); }
    /** 第 `position` 行的函数名 / The built name of row `position`. */
    rowName(position: number): string { return invoke(() => this.raw().rowName(position)); }
    /** 第 `position` 行的参数个数 / The arity of row `position`. */
    rowArity(position: number): number { return invoke(() => this.raw().rowArity(position)); }
    /** 裸构造器的名字 / The raw constructor's name. */
    rawName(): string { return invoke(() => this.raw().rawName()); }
    /** 裸构造器的参数个数 / The raw constructor's arity. */
    rawArity(): number { return invoke(() => this.raw().rawArity()); }
    /** 常量与构造器一致 / Whether constants match their builders. */
    constantsMatchBuilders(): boolean { return invoke(() => this.raw().constantsMatchBuilders()); }
    /** `coalesce` 是唯一变参 / Whether `coalesce` is the only variadic one. */
    coalesceIsTheOnlyVariadic(): boolean {
        return invoke(() => this.raw().coalesceIsTheOnlyVariadic());
    }
    /** `coalesce` 接受零参 / Whether `coalesce` accepts zero arguments. */
    coalesceAcceptsNoArguments(): boolean {
        return invoke(() => this.raw().coalesceAcceptsNoArguments());
    }
    /** 裸构造器不校验名字 / Whether the raw constructor leaves the name unvalidated. */
    rawNameIsUnvalidated(): boolean { return invoke(() => this.raw().rawNameIsUnvalidated()); }
    /** 名字匹配大小写敏感 / Whether name matching is case sensitive. */
    nameMatchingIsCaseSensitive(): boolean {
        return invoke(() => this.raw().nameMatchingIsCaseSensitive());
    }
    /** 六个名字互不相同 / Whether the six names are distinct. */
    namesAreDistinct(): boolean { return invoke(() => this.raw().namesAreDistinct()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个线性项字面量。 / One linear term literal. */
export interface LinearTermSpec {
    variable: number;
    coefficient: number;
}

/** 一个幂次字面量。 / One power literal. */
export interface PowerSpec {
    variable: number;
    power: number;
}

/** 多项式三态请求。 / The three-state polynomial request. */
export interface PolynomialLiftRequest {
    constant: number;
    /** 线性项（**允许同一变量出现多次**）。 / The linear terms (**duplicates allowed**). */
    terms?: LinearTermSpec[];
    /** 规范化单项式的幂次表。 / The power table of the canonical monomial. */
    powers?: PowerSpec[];
    /** 用来查"不存在的幂次"的变量序号。 / The variable index used to look up an absent power. */
    missingVariable?: number;
}

/**
 * 稀疏多项式三态的升幂契约（续挖 `model/flatten/inner_box.rs` 的 `Linear` / `Quadratic` / `Canonical`）。
 *
 * 展平层有三种稀疏表示，但"能不能升幂"**不对称**：
 *
 * 1. **`Linear → Quadratic` 是完备的**：`fromLinearKeepsConstant()` / `fromLinearKeepsArity()` 恒真，
 *    `quadraticAllLinearKind()` 也恒真——每一项都变成 `kind() == Linear` 的二次单项式（`varIndex2` 为 `null`）。
 * 2. **`Quadratic → Canonical` 没有对应构造器**（`canonicalHasNoLift()`）：`Canonical` 只有 `new` 与
 *    `fromConstant`，没有 `fromLinear` / `fromQuadratic`。所以"线性 → 二次"有现成的桥，
 *    "二次 → 任意次"**必须自己摊平幂次表**。
 * 3. **规范化态的多项式语义靠幂次表**：`canonicalTotalPower()` 是幂之和，而 `missingPowerIsZero()` 说明
 *    **查一个没出现的变量会得到 `0`**——"这个变量没有幂次"与"幂次为 0"在规范化态**不可区分**。
 *
 * 另外：`zeroMatchesConstant()`（`zero(v)` 与 `constant(v)` 形状相同）、`constantOnlyIsEmpty()`（只有常数时
 * `isConstantOnly` 与 `isEmpty` **同时为真**）、`addMonomialDoesNotMerge()`（同一变量加两次就是两个单项式）。
 *
 * The degree-lifting contract of the three sparse polynomial states (continuation). **`Linear → Quadratic` is complete**
 * (`fromLinearKeepsConstant()` / `fromLinearKeepsArity()` / `quadraticAllLinearKind()` all hold — every term becomes a
 * `kind() == Linear` quadratic monomial with `varIndex2` null). **`Quadratic → Canonical` has no constructor**
 * (`canonicalHasNoLift()`): `Canonical` offers only `new` and `fromConstant`, never `fromLinear` / `fromQuadratic`, so lifting
 * past degree two means flattening the power table by hand. And **the canonical state's semantics live in the power table**:
 * `canonicalTotalPower()` is the sum of powers while `missingPowerIsZero()` shows that **an absent variable reads back as
 * `0`**, making "no power" and "power zero" indistinguishable there. Also `zeroMatchesConstant()` (`zero(v)` and
 * `constant(v)` share a shape), `constantOnlyIsEmpty()` (`isConstantOnly` and `isEmpty` are both true with just a constant)
 * and `addMonomialDoesNotMerge()` (the same variable twice yields two monomials).
 */
export class PolynomialLiftReport {
    private constructor(private state: PolynomialLiftBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): PolynomialLiftReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected polynomial lift report text");
        }
        return invoke(() => new PolynomialLiftReport(wasm().PolynomialLiftReport.fromJson(json)));
    }
    private raw(): PolynomialLiftBinding {
        if (!this.state) throw new OspfError("Disposed", "polynomial lift report has been disposed");
        return this.state;
    }
    /** 线性态项数 / The linear arity. */
    linearCount(): number { return invoke(() => this.raw().linearCount()); }
    /** 线性态常数 / The linear constant. */
    linearConstant(): number { return invoke(() => this.raw().linearConstant()); }
    /** 线性态是否只有常数 / Whether the linear state is constant-only. */
    linearIsConstantOnly(): boolean { return invoke(() => this.raw().linearIsConstantOnly()); }
    /** 二次态项数 / The quadratic arity. */
    quadraticCount(): number { return invoke(() => this.raw().quadraticCount()); }
    /** 二次态常数 / The quadratic constant. */
    quadraticConstant(): number { return invoke(() => this.raw().quadraticConstant()); }
    /** 二次态全是线性项 / Whether every quadratic term is linear. */
    quadraticAllLinearKind(): boolean { return invoke(() => this.raw().quadraticAllLinearKind()); }
    /** 规范化态项数 / The canonical arity. */
    canonicalCount(): number { return invoke(() => this.raw().canonicalCount()); }
    /** 规范化态常数 / The canonical constant. */
    canonicalConstant(): number { return invoke(() => this.raw().canonicalConstant()); }
    /** 规范化单项式总幂次 / The canonical monomial's total power. */
    canonicalTotalPower(): number { return invoke(() => this.raw().canonicalTotalPower()); }
    /** 缺失变量的幂次读数 / The absent variable's power read-back. */
    missingPowerIsZero(): number { return invoke(() => this.raw().missingPowerIsZero()); }
    /** 零与常数同形 / Whether zero and constant share a shape. */
    zeroMatchesConstant(): boolean { return invoke(() => this.raw().zeroMatchesConstant()); }
    /** `fromLinear` 保常数 / Whether `fromLinear` keeps the constant. */
    fromLinearKeepsConstant(): boolean { return invoke(() => this.raw().fromLinearKeepsConstant()); }
    /** `fromLinear` 保项数 / Whether `fromLinear` keeps the arity. */
    fromLinearKeepsArity(): boolean { return invoke(() => this.raw().fromLinearKeepsArity()); }
    /** 规范化态没有升幂入口 / Whether the canonical state has no lifting constructor. */
    canonicalHasNoLift(): boolean { return invoke(() => this.raw().canonicalHasNoLift()); }
    /** `addMonomial` 不合并 / Whether `addMonomial` does not merge. */
    addMonomialDoesNotMerge(): boolean { return invoke(() => this.raw().addMonomialDoesNotMerge()); }
    /** 只有常数即空 / Whether a constant-only state is also empty. */
    constantOnlyIsEmpty(): boolean { return invoke(() => this.raw().constantOnlyIsEmpty()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个主问题变量的值域声明。 / The domain declaration of one master variable. */
export interface BoundedNoGoodVariableSpec {
    id: string;
    /** 下界；`binary` 时必须是 0。 / The lower bound; must be 0 for `binary`. */
    lower?: number;
    /** 上界；`binary` 时必须是 1。 / The upper bound; must be 1 for `binary`. */
    upper?: number;
    binary?: boolean;
}

/** 一个变量的整数值。 / One variable's integer value. */
export interface BoundedNoGoodValue {
    id: string;
    value: number;
}

/** 有界整数 no-good 家族请求。 / The bounded-integer no-good family request. */
export interface BoundedNoGoodRequest {
    variables: BoundedNoGoodVariableSpec[];
    /** 要排除的变量取值。 / The excluded assignment. */
    assignment: BoundedNoGoodValue[];
    /** 只对其中这些变量成家族；空表示全部。 / Build the family for these only; empty means all. */
    familyVariables?: string[];
    /** 证明引用。 / The proof reference. */
    proofReference?: string;
}

/**
 * 有界整数 no-good 家族的行数与辅助变量契约（续挖 `solver/logic_based_benders.rs`）。
 *
 * 一次调用产出的不是一个 cut，而是**一个家族**，形状是硬契约：
 *
 * 1. **行数 = 3n + 1**（`rowsAreThreePerVariablePlusOne()`）：每个被排除的变量各出三行
 *    `lowerSide` / `upperSide` / `atMostOne`，最后全家族共用**一条** `requireDifference`。
 *    3 个变量是 10 行，1 个变量是 4 行。
 * 2. **每一行都声明完整的辅助变量集**（`everyRowDeclaresEveryAuxiliary()`）：家族先把 `2n` 个二元辅助变量
 *    （每变量 lower/upper 各一）**冻结**，然后每行都带上**全部** `2n` 个——不是"这行用到谁就声明谁"。
 *    只声明本行用到的会被判 "does not declare its complete auxiliary set"。
 * 3. **`requireDifference` 是唯一不带变量身份的行**（`requireDifferenceHasNoVariable()`），且**排在最后**
 *    （`rowsFollowVariableOrder()`）。按 `(行类型, 变量)` 去重可得 `3n` 个键，加上它才是 `3n + 1`。
 * 4. **家族 ID 与 assignment 必须全家族一致**（`familyIdIsUniform()` / `assignmentIsUniform()`）：
 *    混进别的 family ID 或别的 assignment 会被判 "mixes family identities or assignments"；
 *    空 assignment 直接拒绝。
 *
 * `VerifiedMasterConflict` 是另一半：成员进 `BTreeSet`，所以**重复成员被静默合并**（`conflictMembersDeduplicate()`），
 * 但**空成员集**与**空白证明引用**都会拒绝（`emptyConflictIsRefused()` / `blankProofReferenceIsRefused()`）。
 *
 * The row-count and auxiliary contract of a bounded-integer no-good family (continuation). One call yields a **family**, not
 * a single cut. **Rows = 3n + 1** (`rowsAreThreePerVariablePlusOne()`): each excluded variable gets `lowerSide` /
 * `upperSide` / `atMostOne` and the whole family shares **one** `requireDifference`, so three variables give ten rows and
 * one gives four. **Every row declares the complete auxiliary set** (`everyRowDeclaresEveryAuxiliary()`): the family freezes
 * `2n` binary auxiliaries up front and every row carries **all** of them — declaring only the ones it uses is refused.
 * **`requireDifference` is the only row without a variable identity** (`requireDifferenceHasNoVariable()`) and it comes
 * **last** (`rowsFollowVariableOrder()`). And **the family ID and assignment must agree across the family**
 * (`familyIdIsUniform()` / `assignmentIsUniform()`), with an empty assignment refused outright. `VerifiedMasterConflict` is
 * the other half: members land in a `BTreeSet`, so **duplicates are silently merged** (`conflictMembersDeduplicate()`), while
 * an **empty member set** and a **blank proof reference** are refused.
 */
export class BoundedNoGoodReport {
    private constructor(private state: BoundedNoGoodBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): BoundedNoGoodReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected bounded no-good report text");
        }
        return invoke(() => new BoundedNoGoodReport(wasm().BoundedNoGoodReport.fromJson(json)));
    }
    private raw(): BoundedNoGoodBinding {
        if (!this.state) throw new OspfError("Disposed", "bounded no-good report has been disposed");
        return this.state;
    }
    /** 行数 / The row count. */
    rowCount(): number { return invoke(() => this.raw().rowCount()); }
    /** 第 `position` 行的 cut ID / The cut ID of row `position`. */
    rowId(position: number): string { return invoke(() => this.raw().rowId(position)); }
    /** 第 `position` 行的类型名 / The kind name of row `position`. */
    rowKind(position: number): string { return invoke(() => this.raw().rowKind(position)); }
    /** 第 `position` 行携带的变量 ID / The variable of row `position`. */
    rowVariable(position: number): string | undefined {
        return invoke(() => this.raw().rowVariable(position));
    }
    /** 第 `position` 行的辅助变量条数 / The auxiliary count of row `position`. */
    rowAuxiliaryCount(position: number): number {
        return invoke(() => this.raw().rowAuxiliaryCount(position));
    }
    /** 第 `position` 行的系数条数 / The coefficient count of row `position`. */
    rowCoefficientCount(position: number): number {
        return invoke(() => this.raw().rowCoefficientCount(position));
    }
    /** 第 `position` 行的关系方向 / The sense of row `position`. */
    rowSense(position: number): string { return invoke(() => this.raw().rowSense(position)); }
    /** 家族变量数 / The family variable count. */
    variableCount(): number { return invoke(() => this.raw().variableCount()); }
    /** 家族 ID / The family ID. */
    familyId(): string { return invoke(() => this.raw().familyId()); }
    /** 辅助变量条数 / The auxiliary count. */
    auxiliaryCount(): number { return invoke(() => this.raw().auxiliaryCount()); }
    /** 冲突成员条数 / The number of conflict members. */
    conflictMemberCount(): number { return invoke(() => this.raw().conflictMemberCount()); }
    /** 第 `position` 个冲突成员 / The conflict member at `position`. */
    conflictMember(position: number): string {
        return invoke(() => this.raw().conflictMember(position));
    }
    /** 行数是 3n+1 / Whether the row count is 3n+1. */
    rowsAreThreePerVariablePlusOne(): boolean {
        return invoke(() => this.raw().rowsAreThreePerVariablePlusOne());
    }
    /** 每行声明完整辅助集 / Whether every row declares every auxiliary. */
    everyRowDeclaresEveryAuxiliary(): boolean {
        return invoke(() => this.raw().everyRowDeclaresEveryAuxiliary());
    }
    /** `requireDifference` 不带变量 / Whether `requireDifference` carries no variable. */
    requireDifferenceHasNoVariable(): boolean {
        return invoke(() => this.raw().requireDifferenceHasNoVariable());
    }
    /** 家族 ID 一致 / Whether the family ID is uniform. */
    familyIdIsUniform(): boolean { return invoke(() => this.raw().familyIdIsUniform()); }
    /** assignment 一致 / Whether the assignment is uniform. */
    assignmentIsUniform(): boolean { return invoke(() => this.raw().assignmentIsUniform()); }
    /** 冲突成员去重 / Whether conflict members deduplicate. */
    conflictMembersDeduplicate(): boolean {
        return invoke(() => this.raw().conflictMembersDeduplicate());
    }
    /** 空冲突被拒绝 / Whether an empty conflict is refused. */
    emptyConflictIsRefused(): boolean { return invoke(() => this.raw().emptyConflictIsRefused()); }
    /** 空白证明被拒绝 / Whether a blank proof reference is refused. */
    blankProofReferenceIsRefused(): boolean {
        return invoke(() => this.raw().blankProofReferenceIsRefused());
    }
    /** 行按变量顺序排列 / Whether rows follow the variable order. */
    rowsFollowVariableOrder(): boolean { return invoke(() => this.raw().rowsFollowVariableOrder()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条扰动观察的字面量。 / One perturbation observation literal. */
export interface ObservationSpec {
    delta: number;
    improvement?: number;
    improved?: boolean;
    /** 是否具备最优性证明（**决定是否参与排序**）。 / Whether optimality was proven (**decides participation**). */
    objectiveProven?: boolean;
}

/** 一份扰动报告的字面量。 / One perturbation-report literal. */
export interface PerturbationSpec {
    constraintId: string;
    observations?: ObservationSpec[];
    /** 删除测试是否已证明有效；缺省表示没跑。 / Whether removal was proven effective; absent means it did not run. */
    removalEffective?: boolean;
}

/** 一个漏斗候选的字面量。 / One funnel-candidate literal. */
export interface FunnelCandidateSpec {
    constraintId: string;
    group?: string;
    /** 分层名（`a` / `b` / `c` / `unclassified`）。 / The tier name. */
    tier?: string;
    dualValue?: number;
    localEffective?: boolean;
}

/** 有效性排序的聚合请求。 / The aggregation request. */
export interface EffectivenessAggregateRequest {
    baselineObjective: number;
    dualThreshold?: number;
    funnel?: FunnelCandidateSpec[];
    reports: PerturbationSpec[];
}

/**
 * 有效性排序的**聚合**是纯数据，但"改善"这个词在两层有**两个不同的意思**
 * （续挖 `analysis/pipeline.rs` 的 `build_effectiveness_ranking`）。
 *
 * 1. **只有 `objectiveProven` 的观察才进排序**（`unprovenObservationsAreIgnored()`）：未证明最优的观察即使
 *    `improved: true`，也**既不**贡献 `maxImprovement`、**也不**贡献 `firstEffectiveDelta`。
 *    "看到改善"与"能排序"是两件事。
 * 2. **删除测试的改善不算进 `maxImprovement`**（`removalImprovementIsNotAGain()`）：`maxImprovement` 只从
 *    **扰动观察**里取，而报告自己的 `has_global_improvement()` 会把 `removal.effective === true` 也算成改善。
 *    于是存在一份报告：报告侧为**真**、排序侧为**假**（`theTwoPredicatesCanDisagree()`）——
 *    每行都有 `rowGloballyEffective()` 与 `rowReportHasGlobalImprovement()` 两个字段，`rowPredicatesAgree()`
 *    直接告诉你它们是否一致。**这是本能力最值钱的一条**。
 * 3. **`marginalEffect = maxImprovement / firstEffectiveDelta`，且只在 delta > 0 时成立**
 *    （`marginalEffectNeedsPositiveDelta()`）；`firstEffectiveDelta` 取的是**已证明改善观察里最小的 delta**，
 *    不是第一条出现的（`firstDeltaIsTheSmallest()`）。
 * 4. **排序三段式**：已证明改善降序（`undefined` 排最后，`noneImprovementSortsLast()`）→ |dual| 降序
 *    （`tiesFallBackToAbsoluteDual()`）→ 稳定 ID 升序。缺漏斗候选时该行是 `UNCLASSIFIED`，而**不是**"不重要"
 *    （`missingCandidateIsUnclassified()`）。
 *
 * Aggregating an effectiveness ranking is pure data, yet the word "improvement" means **two different things** on two
 * layers (continuation). **Only `objectiveProven` observations feed the ranking** (`unprovenObservationsAreIgnored()`): an
 * observation without an optimality proof contributes to **neither** `maxImprovement` **nor** `firstEffectiveDelta`, even
 * with `improved: true`, so "saw an improvement" and "can be ranked" differ. **The removal test's improvement never reaches
 * `maxImprovement`** (`removalImprovementIsNotAGain()`): it comes only from **perturbation observations**, while the report's
 * own `has_global_improvement()` counts `removal.effective === true` — so a report can be **true** on the report side and
 * **false** on the ranking side (`theTwoPredicatesCanDisagree()`), which every row exposes as `rowGloballyEffective()`
 * versus `rowReportHasGlobalImprovement()` with `rowPredicatesAgree()` telling you whether they match. Also
 * **`marginalEffect = maxImprovement / firstEffectiveDelta`, only when delta > 0** (`marginalEffectNeedsPositiveDelta()`),
 * with `firstEffectiveDelta` being the **smallest** proven improving delta (`firstDeltaIsTheSmallest()`), and the **three-key
 * sort**: proven gain descending (`undefined` last, `noneImprovementSortsLast()`) → |dual| descending
 * (`tiesFallBackToAbsoluteDual()`) → stable ID ascending, with a missing funnel candidate yielding `UNCLASSIFIED` rather
 * than "unimportant" (`missingCandidateIsUnclassified()`).
 */
export class EffectivenessAggregateReport {
    private constructor(private state: EffectivenessAggregateBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): EffectivenessAggregateReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected effectiveness aggregate report text");
        }
        return invoke(() => new EffectivenessAggregateReport(
            wasm().EffectivenessAggregateReport.fromJson(json)));
    }
    private raw(): EffectivenessAggregateBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "effectiveness aggregate report has been disposed");
        }
        return this.state;
    }
    /** 行数 / The row count. */
    rowCount(): number { return invoke(() => this.raw().rowCount()); }
    /** 第 `position` 行的约束 ID / The constraint of row `position`. */
    rowConstraintId(position: number): string {
        return invoke(() => this.raw().rowConstraintId(position));
    }
    /** 第 `position` 行的分层 / The tier of row `position`. */
    rowTier(position: number): string { return invoke(() => this.raw().rowTier(position)); }
    /** 第 `position` 行的最大改善 / The max improvement of row `position`. */
    rowMaxImprovement(position: number): number | undefined {
        return invoke(() => this.raw().rowMaxImprovement(position));
    }
    /** 第 `position` 行的 first delta / The first delta of row `position`. */
    rowFirstEffectiveDelta(position: number): number | undefined {
        return invoke(() => this.raw().rowFirstEffectiveDelta(position));
    }
    /** 第 `position` 行的边际效应 / The marginal effect of row `position`. */
    rowMarginalEffect(position: number): number | undefined {
        return invoke(() => this.raw().rowMarginalEffect(position));
    }
    /** 第 `position` 行的删除结论 / The removal verdict of row `position`. */
    rowRemovalEffective(position: number): boolean | undefined {
        return invoke(() => this.raw().rowRemovalEffective(position));
    }
    /** 第 `position` 行是否被排序判为全局有效 / Whether the ranking calls row `position` globally effective. */
    rowGloballyEffective(position: number): boolean {
        return invoke(() => this.raw().rowGloballyEffective(position));
    }
    /** 第 `position` 行的报告侧改善判据 / The report-side predicate of row `position`. */
    rowReportHasGlobalImprovement(position: number): boolean {
        return invoke(() => this.raw().rowReportHasGlobalImprovement(position));
    }
    /** 第 `position` 行的两份判据是否一致 / Whether the two predicates agree on row `position`. */
    rowPredicatesAgree(position: number): boolean {
        return invoke(() => this.raw().rowPredicatesAgree(position));
    }
    /** 排序顺序里的第 `position` 个 ID / The ID at `position` in the ranking order. */
    orderAt(position: number): string { return invoke(() => this.raw().orderAt(position)); }
    /** 未证明观察被排除 / Whether unproven observations are excluded. */
    unprovenObservationsAreIgnored(): boolean {
        return invoke(() => this.raw().unprovenObservationsAreIgnored());
    }
    /** 删除改善不算增益 / Whether a removal improvement is not a gain. */
    removalImprovementIsNotAGain(): boolean {
        return invoke(() => this.raw().removalImprovementIsNotAGain());
    }
    /** 两份判据可以不一致 / Whether the two predicates can disagree. */
    theTwoPredicatesCanDisagree(): boolean {
        return invoke(() => this.raw().theTwoPredicatesCanDisagree());
    }
    /** 边际效应需要正 delta / Whether the marginal effect needs a positive delta. */
    marginalEffectNeedsPositiveDelta(): boolean {
        return invoke(() => this.raw().marginalEffectNeedsPositiveDelta());
    }
    /** first delta 取最小 / Whether the first delta is the smallest. */
    firstDeltaIsTheSmallest(): boolean { return invoke(() => this.raw().firstDeltaIsTheSmallest()); }
    /** `undefined` 改善排最后 / Whether `undefined` improvement sorts last. */
    noneImprovementSortsLast(): boolean {
        return invoke(() => this.raw().noneImprovementSortsLast());
    }
    /** 同改善时按 |dual| 降序 / Whether ties fall back to absolute dual. */
    tiesFallBackToAbsoluteDual(): boolean {
        return invoke(() => this.raw().tiesFallBackToAbsoluteDual());
    }
    /** 缺候选不是不重要 / Whether a missing candidate is not "unimportant". */
    missingCandidateIsUnclassified(): boolean {
        return invoke(() => this.raw().missingCandidateIsUnclassified());
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条 CP assumption 的字面量。 / One CP assumption literal. */
export interface AssumptionSpec {
    /** CP 整数变量名（稳定身份）。 / The CP integer variable's stable identity. */
    variable: string;
    /** 形态：`literal` / `equal` / `lowerBound` / `upperBound` / `sparseDomain`。 / The shape. */
    shape: string;
    negated?: boolean;
    /** `equal` / `lowerBound` / `upperBound` 的数值。 / The number. */
    value?: number;
    /** `sparseDomain` 的值域（**会排序去重**，且**不进身份**）。 / The values (**normalised**, **not in the identity**). */
    values?: number[];
}

/** 一条映射。 / One mapping entry. */
export interface AssumptionMappingSpec {
    /** 对应的 assumption 下标。 / The assumption's position. */
    assumption: number;
    /** 映射到的 master 稳定变量。 / The master stable variable. */
    masterVariable: string;
}

/** CP assumption 绑定请求。 / The CP assumption binding request. */
export interface AssumptionBindingRequest {
    assumptions: AssumptionSpec[];
    mappings?: AssumptionMappingSpec[];
    /** 用于 `fromAssumptionIds` 的 assumption 下标。 / The assumption positions for `fromAssumptionIds`. */
    conflictMembers?: number[];
    proofReference?: string;
}

/**
 * CP assumption 的**稳定身份**与主问题绑定的"恰好覆盖一次"契约
 * （续挖 `solver/logic_based_benders.rs` 的 `MasterAssignmentAssumptionBinding` /
 * `VerifiedMasterConflict::from_assumption_ids`）。
 *
 * LBB 在 CP 子问题与主问题之间建立映射，靠的是 assumption 的稳定身份。四条实测：
 *
 * 1. **身份是长度前缀拼接的**（`identityIsLengthPrefixed()`）：前缀是 `literal` / `equal` / `lower-bound` /
 *    `upper-bound` / `sparse-domain`，变量名编码成 `"{len}:{name}"`。所以 `"a:b"` **不会**被读成两段——
 *    名字里的分隔符不构成歧义（`separatorsAreUnambiguous()`）。
 * 2. **`equal` / `lowerBound` / `upperBound` 的身份含数值**（`differentNumbersDoNotCollide()`），`literal` 含极性
 *    （`polarityIsPartOfTheIdentity()`）。
 * 3. **`sparseDomain` 的身份丢掉值域内容**（`sparseDomainIdentityIgnoresValues()`）：身份只有
 *    `sparse-domain/{len}:{name}`。于是 `SparseDomain(x, [1,2])` 与 `SparseDomain(x, [3])` **身份完全相同**
 *    （`differentDomainsCollide()`）——两者一起传会以"重复映射/重复身份"被拒，看起来像重复登记，
 *    实际是两个**不同**的假设。**本能力最值钱的一条**。值域本身会排序去重（`domainValuesAreNormalized()`）。
 * 4. **映射必须恰好覆盖一次**（`mappingMustCoverExactlyOnce()`）：少一个、多一个都拒绝；映射同一
 *    assumption 两次报"mappings must be unique"；assumption 身份重复报"identities must be unique"。
 *
 * The **stable identity** of a CP assumption and the "cover exactly once" master-binding contract (continuation). **The
 * identity is a length-prefixed concatenation** (`identityIsLengthPrefixed()`): the five prefixes plus the variable encoded as
 * `"{len}:{name}"`, so `"a:b"` is never read as two components (`separatorsAreUnambiguous()`). **`equal` / `lowerBound` /
 * `upperBound` include the number** (`differentNumbersDoNotCollide()`) and `literal` includes its polarity
 * (`polarityIsPartOfTheIdentity()`). **`sparseDomain` drops the domain contents** (`sparseDomainIdentityIgnoresValues()`):
 * the identity is only `sparse-domain/{len}:{name}`, so `SparseDomain(x, [1,2])` and `SparseDomain(x, [3])` share an
 * identity (`differentDomainsCollide()`) and passing both is refused as duplicate mapping/identity — it looks like a
 * duplicate registration but is really two **different** assumptions (**this capability's most valuable finding**), while the
 * domain itself is sorted and deduplicated (`domainValuesAreNormalized()`). And **the mapping must cover every assumption
 * exactly once** (`mappingMustCoverExactlyOnce()`): too few or too many are refused, a repeated mapping gives "mappings must
 * be unique" and a repeated identity gives "identities must be unique".
 */
export class AssumptionBindingReport {
    private constructor(private state: AssumptionBindingBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): AssumptionBindingReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected assumption binding report text");
        }
        return invoke(() => new AssumptionBindingReport(
            wasm().AssumptionBindingReport.fromJson(json)));
    }
    private raw(): AssumptionBindingBinding {
        if (!this.state) throw new OspfError("Disposed", "assumption binding report has been disposed");
        return this.state;
    }
    /** assumption 条数 / The assumption count. */
    rowCount(): number { return invoke(() => this.raw().rowCount()); }
    /** 第 `position` 条的稳定身份 / The identity at `position`. */
    rowStableId(position: number): string {
        return invoke(() => this.raw().rowStableId(position));
    }
    /** 第 `position` 条的身份前缀 / The prefix at `position`. */
    rowPrefix(position: number): string { return invoke(() => this.raw().rowPrefix(position)); }
    /** 第 `position` 条的值域条数 / The value count at `position`. */
    rowValueCount(position: number): number {
        return invoke(() => this.raw().rowValueCount(position));
    }
    /** 映射条数 / The mapping count. */
    mappingCount(): number { return invoke(() => this.raw().mappingCount()); }
    /** 第 `position` 条映射的 assumption 身份 / The assumption identity of mapping `position`. */
    mappingAssumption(position: number): string {
        return invoke(() => this.raw().mappingAssumption(position));
    }
    /** 第 `position` 条映射的 master 变量 / The master variable of mapping `position`. */
    mappingMasterVariable(position: number): string {
        return invoke(() => this.raw().mappingMasterVariable(position));
    }
    /** 冲突成员条数 / The conflict member count. */
    conflictMemberCount(): number { return invoke(() => this.raw().conflictMemberCount()); }
    /** 第 `position` 个冲突成员 / The conflict member at `position`. */
    conflictMember(position: number): string {
        return invoke(() => this.raw().conflictMember(position));
    }
    /** 证明引用 / The proof reference. */
    proofReference(): string { return invoke(() => this.raw().proofReference()); }
    /** 身份是长度前缀 / Whether identities are length-prefixed. */
    identityIsLengthPrefixed(): boolean { return invoke(() => this.raw().identityIsLengthPrefixed()); }
    /** 值域不进身份 / Whether domain values stay out of the identity. */
    sparseDomainIdentityIgnoresValues(): boolean {
        return invoke(() => this.raw().sparseDomainIdentityIgnoresValues());
    }
    /** 不同值域碰撞 / Whether different domains collide. */
    differentDomainsCollide(): boolean { return invoke(() => this.raw().differentDomainsCollide()); }
    /** 不同数值不碰撞 / Whether different numbers differ. */
    differentNumbersDoNotCollide(): boolean {
        return invoke(() => this.raw().differentNumbersDoNotCollide());
    }
    /** 极性进身份 / Whether polarity is part of the identity. */
    polarityIsPartOfTheIdentity(): boolean {
        return invoke(() => this.raw().polarityIsPartOfTheIdentity());
    }
    /** 值域排序去重 / Whether domains are sorted and deduplicated. */
    domainValuesAreNormalized(): boolean {
        return invoke(() => this.raw().domainValuesAreNormalized());
    }
    /** 分隔符不构成歧义 / Whether separators cause no ambiguity. */
    separatorsAreUnambiguous(): boolean {
        return invoke(() => this.raw().separatorsAreUnambiguous());
    }
    /** 映射恰好覆盖一次 / Whether the mapping covers exactly once. */
    mappingMustCoverExactlyOnce(): boolean {
        return invoke(() => this.raw().mappingMustCoverExactlyOnce());
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个候选的字面量。 / One candidate literal. */
export interface CandidateSpec {
    constraintId: string;
    /** 活动性名：`active` / `nearlyActive` / `inactive` / `satisfiedWithoutSlackMetric` / `violated` / `unknown`。 */
    activity: string;
    /** 对偶值；缺省表示没有对偶证据。 / The dual value; absent means no dual evidence. */
    dualValue?: number;
}

/** 分层请求。 / The classification request. */
export interface TierClassificationRequest {
    /** 对偶阈值（默认 `1e-9`）。 / The dual threshold (default `1e-9`). */
    dualThreshold?: number;
    candidates: CandidateSpec[];
    /** 短名单名额。 / The shortlist size. */
    shortlistLimit?: number;
}

/**
 * 候选分层的**推导规则**与"降权但不丢弃"的短名单（续挖 `analysis/pipeline.rs` 的 `classify_candidate`）。
 *
 * 1. **活动性单独不够**（`activityWithoutDualIsUnclassified()`）：active / nearly-active 但**没有**对偶证据 → `UNCLASSIFIED`，
 *    **不是** Tier B。"未知对偶"绝不能读成"对偶很小"。
 * 2. **Tier A 与 Tier B 是互补的两半**：有对偶时 `|dual| > threshold` → A，否则（**含恰好相等**）→ B
 *    （`thresholdEqualityIsTierB()`）。跨界用**严格大于**，与 `CandidateFunnelRanking.validate` 的要求严丝合缝。
 * 3. **Tier C 只覆盖两种活动性**：`inactive` 与 `satisfiedWithoutSlackMetric`。**`violated` 不是 Tier C**
 *    （`violatedIsNotTierC()`），`unknown` 也不是（`unknownIsUnclassified()`）。
 * 4. **短名单降权但不丢弃**：先放 A/B，名额还有就补 C/未分层；名额够时**全部返回**
 *    （`shortlistReturnsEverythingWhenWide()`）。所以"没进短名单"永远只表示"这次名额不够"。
 * 5. **线序名与枚举名不一致**（`wireNameDiffersFromLabel()`）：`rowTier()` 给 `A` / `B` / `C` / `UNCLASSIFIED`，
 *    而 `rowTierWire()` 给 `TIER_A` / `TIER_B` / `TIER_C` / `UNCLASSIFIED`。两个字段都在，别混用。
 *
 * How a candidate tier is derived, and the shortlist that deprioritises without dropping (continuation). **Activity alone is
 * not enough** (`activityWithoutDualIsUnclassified()`): an active or nearly-active candidate **without** a dual is
 * `UNCLASSIFIED`, **not** Tier B, so "unknown dual" is never read as "small dual". **Tier A and Tier B are complementary
 * halves**: with a dual, `|dual| > threshold` gives A and everything else — **including equality** — gives B
 * (`thresholdEqualityIsTierB()`), matching `validate` exactly. **Tier C covers only two activity states** — `inactive` and
 * `satisfiedWithoutSlackMetric` — while **`violated` is not Tier C** (`violatedIsNotTierC()`) and `unknown` is not either
 * (`unknownIsUnclassified()`). And **the shortlist deprioritises without dropping**: A/B first, then the rest while slots
 * remain, and with enough slots **everything** returns (`shortlistReturnsEverythingWhenWide()`), so "not in the shortlist"
 * only ever means "no slot this time". Note **the wire name differs from the label** (`wireNameDiffersFromLabel()`):
 * `rowTier()` yields `A` / `B` / `C` / `UNCLASSIFIED` while `rowTierWire()` yields `TIER_A` / `TIER_B` / `TIER_C` /
 * `UNCLASSIFIED` — both are exposed, do not mix them up.
 */
export class TierClassificationReport {
    private constructor(private state: TierClassificationBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): TierClassificationReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected tier classification report text");
        }
        return invoke(() => new TierClassificationReport(
            wasm().TierClassificationReport.fromJson(json)));
    }
    private raw(): TierClassificationBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "tier classification report has been disposed");
        }
        return this.state;
    }
    /** 行数 / The row count. */
    rowCount(): number { return invoke(() => this.raw().rowCount()); }
    /** 第 `position` 行的约束 ID / The constraint of row `position`. */
    rowConstraintId(position: number): string {
        return invoke(() => this.raw().rowConstraintId(position));
    }
    /** 第 `position` 行的活动性 / The activity of row `position`. */
    rowActivity(position: number): string { return invoke(() => this.raw().rowActivity(position)); }
    /** 第 `position` 行的对偶值 / The dual of row `position`. */
    rowDualValue(position: number): number | undefined {
        return invoke(() => this.raw().rowDualValue(position));
    }
    /** 第 `position` 行的分层标签 / The tier label of row `position`. */
    rowTier(position: number): string { return invoke(() => this.raw().rowTier(position)); }
    /** 第 `position` 行的线序名 / The tier wire name of row `position`. */
    rowTierWire(position: number): string { return invoke(() => this.raw().rowTierWire(position)); }
    /** 第 `position` 行是否短名单默认 / Whether row `position` is a shortlist default. */
    rowShortlistDefault(position: number): boolean {
        return invoke(() => this.raw().rowShortlistDefault(position));
    }
    /** 第 `position` 行的优先级 / The priority of row `position`. */
    rowPriority(position: number): number { return invoke(() => this.raw().rowPriority(position)); }
    /** Tier A 计数 / The Tier A count. */
    tierA(): number { return invoke(() => this.raw().tierA()); }
    /** Tier B 计数 / The Tier B count. */
    tierB(): number { return invoke(() => this.raw().tierB()); }
    /** Tier C 计数 / The Tier C count. */
    tierC(): number { return invoke(() => this.raw().tierC()); }
    /** 未分层计数 / The unclassified count. */
    unclassified(): number { return invoke(() => this.raw().unclassified()); }
    /** 短名单条数 / The shortlist size. */
    shortlistCount(): number { return invoke(() => this.raw().shortlistCount()); }
    /** 短名单里的第 `position` 个 ID / The shortlist ID at `position`. */
    shortlistAt(position: number): string { return invoke(() => this.raw().shortlistAt(position)); }
    /** 名额够时返回全部 / Whether a wide shortlist returns everything. */
    shortlistReturnsEverythingWhenWide(): boolean {
        return invoke(() => this.raw().shortlistReturnsEverythingWhenWide());
    }
    /** 短名单先放 A/B / Whether the shortlist prefers defaults. */
    shortlistPrefersDefaults(): boolean { return invoke(() => this.raw().shortlistPrefersDefaults()); }
    /** 活动性没有对偶 → 未分层 / Whether activity without a dual is unclassified. */
    activityWithoutDualIsUnclassified(): boolean {
        return invoke(() => this.raw().activityWithoutDualIsUnclassified());
    }
    /** 阈值等号落在 Tier B / Whether threshold equality is TierB. */
    thresholdEqualityIsTierB(): boolean { return invoke(() => this.raw().thresholdEqualityIsTierB()); }
    /** `violated` 不是 Tier C / Whether `violated` is not TierC. */
    violatedIsNotTierC(): boolean { return invoke(() => this.raw().violatedIsNotTierC()); }
    /** `unknown` 未分层 / Whether `unknown` is unclassified. */
    unknownIsUnclassified(): boolean { return invoke(() => this.raw().unknownIsUnclassified()); }
    /** 未分层不是短名单默认 / Whether unclassified is not a shortlist default. */
    unclassifiedIsNotAShortlistDefault(): boolean {
        return invoke(() => this.raw().unclassifiedIsNotAShortlistDefault());
    }
    /** 线序名与枚举名不同 / Whether the wire name differs from the label. */
    wireNameDiffersFromLabel(): boolean {
        return invoke(() => this.raw().wireNameDiffersFromLabel());
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个二元主问题变量。 / One binary master variable. */
export interface BinaryVariableSpec {
    id: string;
    /** 取值（必须是 0 或 1）。 / The value (must be 0 or 1). */
    value: number;
}

/** 一个整数主问题变量。 / One integer master variable. */
export interface IntegerVariableSpec {
    id: string;
    lower: number;
    upper: number;
    value: number;
}

/** 极性编码请求。 / The polarity-encoding request. */
export interface PolarityRequest {
    binary: BinaryVariableSpec[];
    /** 整数赋值（用于家族三行的闭式）。 / The integer assignment (for the family rows' closed forms). */
    integers?: IntegerVariableSpec[];
    proofReference?: string;
}

/**
 * 二进制 no-good 的极性编码，与有界整数家族三行的**系数/右端项闭式**
 * （续挖 `solver/logic_based_benders.rs` 的 `binary_assignment_no_good` / `MasterCutEncoding::BinaryNoGood`）。
 *
 * 1. **系数就是"取反的位"**（`coefficientsAreTheNegatedBits()`）：`value === 1` → `-1`、`value === 0` → `+1`，
 *    关系方向恒为 `greaterOrEqual`，右端项 = **`1 - 1 的个数`**（`rhsIsOneMinusTheOnes()`）。
 *    三变量全 1 时 rhs 是 **`-2`**（`allOnesRhsIsNegative()`），它表达 `x1+x2+x3 <= 2` —— "排除全 1 点"
 *    在这里是**不等于 3**，不是"不等于某个正数"。
 * 2. **cut ID 是 canonical key 的直接函数**（`idIsAPureFunctionOfTheAssignment()`）：`logic/no-good/{...}`，
 *    只取决于被排除的赋值，与证明引用、来源、原因无关。注意 ID 里的变量名是**转义过的**（非字母数字走十六进制），
 *    所以别拿原名字面量去查 ID。
 * 3. **编码里存完整赋值**（`encodingHoldsEveryVariable()`）：`encodingCount()` 等于系数条数。
 * 4. **边行的右端项就是值域边界**（`sideRowsCarryDomainBounds()`）：`lowerSide` 的 rhs 等于该变量的**上界**、
 *    `upperSide` 的 rhs 等于**下界**；辅助系数分别是 `+m_upper`（`upper - value + 1`）与
 *    `-m_lower`（`-(value + 1 - lower)`）。所以"这一行选了哪一侧"从 rhs 与值域的关系就能读出来。
 * 5. **`atMostOne` 与 `requireDifference` 的系数全是 `1.0`、rhs 都是 `1.0`**（`unitRowsUseRhsOne()`）：
 *    `atMostOne` 只用**两个**辅助（`atMostOneIsAPair()`），`requireDifference` 覆盖**全部 `2n`**
 *    （`requireDifferenceSpansEveryAuxiliary()`）。
 *
 * The polarity encoding of a binary no-good plus the family rows' coefficient/rhs closed forms (continuation). **The
 * coefficients are the negated bits** (`coefficientsAreTheNegatedBits()`): `1` becomes `-1`, `0` becomes `+1`, the sense is
 * always `greaterOrEqual` and the rhs is **`1 - ones`** (`rhsIsOneMinusTheOnes()`), so three ones give **`-2`** — the cut
 * states `x1+x2+x3 <= 2`, meaning "not all ones" rather than "not some positive value" (`allOnesRhsIsNegative()`). **The cut
 * ID is a direct function of the canonical key** (`idIsAPureFunctionOfTheAssignment()`), depending only on the excluded
 * assignment and never on the proof reference, origin or reason — note the names inside the ID are **escaped** (hex for
 * non-alphanumerics), so do not search for a raw variable name. **The encoding stores the complete assignment**
 * (`encodingHoldsEveryVariable()`), with `encodingCount()` equalling the coefficient count. And **a side row's rhs is the
 * domain bound** (`sideRowsCarryDomainBounds()`): `lowerSide`'s rhs is the **upper** bound, `upperSide`'s is the **lower**
 * bound, with auxiliary coefficients `+m_upper` (`upper - value + 1`) and `-m_lower` (`-(value + 1 - lower)`) — so which side
 * a row selects is readable from the rhs. Finally, **`atMostOne` and `requireDifference` use unit coefficients and rhs 1.0**
 * (`unitRowsUseRhsOne()`), differing in scope: `atMostOne` covers **two** auxiliaries (`atMostOneIsAPair()`) while
 * `requireDifference` spans **all `2n`** (`requireDifferenceSpansEveryAuxiliary()`).
 */
export class PolarityReport {
    private constructor(private state: PolarityBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): PolarityReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected polarity report text");
        }
        return invoke(() => new PolarityReport(wasm().PolarityReport.fromJson(json)));
    }
    private raw(): PolarityBinding {
        if (!this.state) throw new OspfError("Disposed", "polarity report has been disposed");
        return this.state;
    }
    /** no-good 的 cut ID / The no-good's cut ID. */
    noGoodId(): string { return invoke(() => this.raw().noGoodId()); }
    /** no-good 的右端项 / The no-good's rhs. */
    noGoodRhs(): number { return invoke(() => this.raw().noGoodRhs()); }
    /** no-good 的关系方向 / The no-good's sense. */
    noGoodSense(): string { return invoke(() => this.raw().noGoodSense()); }
    /** no-good 的系数条数 / The no-good's coefficient count. */
    noGoodTermCount(): number { return invoke(() => this.raw().noGoodTermCount()); }
    /** 第 `position` 个系数的变量 / The variable of term `position`. */
    noGoodTermVariable(position: number): string {
        return invoke(() => this.raw().noGoodTermVariable(position));
    }
    /** 第 `position` 个系数的值 / The coefficient of term `position`. */
    noGoodTermCoefficient(position: number): number {
        return invoke(() => this.raw().noGoodTermCoefficient(position));
    }
    /** 编码里的赋值条数 / The encoding's assignment count. */
    encodingCount(): number { return invoke(() => this.raw().encodingCount()); }
    /** 1 的个数 / The ones count. */
    ones(): number { return invoke(() => this.raw().ones()); }
    /** 家族个数 / The number of families. */
    familyCount(): number { return invoke(() => this.raw().familyCount()); }
    /** 第 `position` 个家族 lower 行的右端项 / The lower row's rhs of family `position`. */
    familyLowerRhs(position: number): number {
        return invoke(() => this.raw().familyLowerRhs(position));
    }
    /** 第 `position` 个家族 upper 行的右端项 / The upper row's rhs of family `position`. */
    familyUpperRhs(position: number): number {
        return invoke(() => this.raw().familyUpperRhs(position));
    }
    /** 第 `position` 个家族 at-most-one 行的右端项 / The at-most-one row's rhs. */
    familyAtMostOneRhs(position: number): number {
        return invoke(() => this.raw().familyAtMostOneRhs(position));
    }
    /** 第 `position` 个家族 at-most-one 行的宽度 / The at-most-one row's width. */
    familyAtMostOneWidth(position: number): number {
        return invoke(() => this.raw().familyAtMostOneWidth(position));
    }
    /** 第 `position` 个家族 require-difference 行的宽度 / The require-difference row's width. */
    familyRequireDifferenceWidth(position: number): number {
        return invoke(() => this.raw().familyRequireDifferenceWidth(position));
    }
    /** 第 `position` 个家族 lower 行各项的变量名 / The lower row's variables of family `position`. */
    familyLowerVariables(position: number): string {
        return invoke(() => this.raw().familyLowerVariables(position));
    }
    /** 第 `position` 个家族 lower 行各项的系数 / The lower row's coefficients of family `position`. */
    familyLowerCoefficients(position: number): string {
        return invoke(() => this.raw().familyLowerCoefficients(position));
    }
    /** 系数是取反的位 / Whether coefficients are the negated bits. */
    coefficientsAreTheNegatedBits(): boolean {
        return invoke(() => this.raw().coefficientsAreTheNegatedBits());
    }
    /** 右端项是 1 减 1 的个数 / Whether the rhs is 1 minus the ones. */
    rhsIsOneMinusTheOnes(): boolean { return invoke(() => this.raw().rhsIsOneMinusTheOnes()); }
    /** 全 1 时右端项为负 / Whether an all-ones assignment gives a negative rhs. */
    allOnesRhsIsNegative(): boolean { return invoke(() => this.raw().allOnesRhsIsNegative()); }
    /** ID 只取决于被排除的赋值 / Whether the ID depends only on the assignment. */
    idIsAPureFunctionOfTheAssignment(): boolean {
        return invoke(() => this.raw().idIsAPureFunctionOfTheAssignment());
    }
    /** 编码里存完整赋值 / Whether the encoding stores the complete assignment. */
    encodingHoldsEveryVariable(): boolean {
        return invoke(() => this.raw().encodingHoldsEveryVariable());
    }
    /** 边行右端项就是值域边界 / Whether a side row's rhs is a domain bound. */
    sideRowsCarryDomainBounds(): boolean {
        return invoke(() => this.raw().sideRowsCarryDomainBounds());
    }
    /** `atMostOne` 只用两个辅助变量 / Whether `atMostOne` uses two auxiliaries. */
    atMostOneIsAPair(): boolean { return invoke(() => this.raw().atMostOneIsAPair()); }
    /** `requireDifference` 覆盖全部 `2n` / Whether `requireDifference` spans all `2n`. */
    requireDifferenceSpansEveryAuxiliary(): boolean {
        return invoke(() => this.raw().requireDifferenceSpansEveryAuxiliary());
    }
    /** 两条无辅助身份的边行都用 rhs 1.0 / Whether both unit rows use rhs 1.0. */
    unitRowsUseRhsOne(): boolean { return invoke(() => this.raw().unitRowsUseRhsOne()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个二次单项式的字面量。 / One quadratic monomial literal. */
export interface MonomialSpec {
    coefficient: number;
    first: number;
    /** 第二个变量序号；缺省表示线性项。 / The second variable index; absent means a linear term. */
    second?: number;
}

/**
 * 二次单项式的 `kind` 是**推导出来的**，且变量次序**不被规范化**
 * （续挖 `model/flatten/inner_box.rs` 的 `QuadraticMonomial` / `QuadraticMonomialKind`）。
 *
 * 1. **`kind()` 不是存下来的字段，而是 `varIndex2 !== undefined` 的推导**（`kindIsDerived()`）：
 *    `newLinear` 不给第二序号 → `linear`；`newQuadratic` 给 → `quadratic`。所以"线性项带第二序号"
 *    这种状态**构造不出来**——`linear` 与 `second === undefined` 是同一件事的两种写法。
 * 2. **不给变量排序**（`indicesAreNotNormalised()`）：`newQuadratic(c, 5, 2)` 原样保留 `first: 5`、`second: 2`。
 *    所以 `x5*x2` 与 `x2*x5` 是**两个不同对象**——`isSquareOnlyWhenEqual()` 只管"两项相等"，
 *    不管"顺序"，比较两项相乘是否同一单项式必须自己规范化次序。
 * 3. **平方是合法的二次项**（`squaresAreQuadratic()`）：`newQuadratic(c, i, i)` 的 kind 是 `quadratic` 而不是 `linear`，
 *    因为判据只看第二序号是否有值。
 * 4. **`cacheKey` 是内层 `Box` 的地址**（沿用第 26 单的结论，这里在**单项式**这一层再确认）：
 *    `keyIsStable()`（同一对象多次取 key 稳定）与 `cloneGetsAFreshKey()`（`Clone` 深拷贝 → **新** key）。
 *
 * A quadratic monomial's `kind` is **derived**, and the variable order is **not normalised** (continuation). **`kind()` is not
 * a stored field but a derivation from `varIndex2 !== undefined`** (`kindIsDerived()`): `newLinear` leaves the second index
 * empty and `newQuadratic` fills it, so "a linear term carrying a second index" cannot be constructed — `linear` and
 * `second === undefined` are the same fact in two spellings. **Indices are not sorted** (`indicesAreNotNormalised()`):
 * `newQuadratic(c, 5, 2)` keeps `first: 5` and `second: 2`, so `x5*x2` and `x2*x5` are **two different objects**, and
 * `isSquareOnlyWhenEqual()` detects equal indices but never order — normalise order yourself before comparing products. **A
 * square is a legitimate quadratic term** (`squaresAreQuadratic()`): `newQuadratic(c, i, i)` reports `quadratic`, not
 * `linear`, because the predicate only asks whether a second index exists. And **`cacheKey` is the inner `Box`'s address**
 * (`keyIsStable()` for repeated reads on one object, `cloneGetsAFreshKey()` because `Clone` deep-copies).
 */
export class MonomialReport {
    private constructor(private state: MonomialBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): MonomialReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected monomial report text");
        }
        return invoke(() => new MonomialReport(wasm().MonomialReport.fromJson(json)));
    }
    private raw(): MonomialBinding {
        if (!this.state) throw new OspfError("Disposed", "monomial report has been disposed");
        return this.state;
    }
    /** 系数 / The coefficient. */
    coefficient(): number { return invoke(() => this.raw().coefficient()); }
    /** 第一个变量序号 / The first variable index. */
    first(): number { return invoke(() => this.raw().first()); }
    /** 第二个变量序号 / The second variable index. */
    second(): number | undefined { return invoke(() => this.raw().second()); }
    /** 推导出的 kind / The derived kind. */
    kind(): "quadratic" | "linear" {
        return invoke(() => this.raw().kind() as "quadratic" | "linear");
    }
    /** 本对象两次取 key 是否相同 / Whether two reads agree. */
    keyIsStable(): boolean { return invoke(() => this.raw().keyIsStable()); }
    /** 克隆是否换 key / Whether a clone gets a fresh key. */
    cloneGetsAFreshKey(): boolean { return invoke(() => this.raw().cloneGetsAFreshKey()); }
    /** kind 是推导的 / Whether the kind is derived. */
    kindIsDerived(): boolean { return invoke(() => this.raw().kindIsDerived()); }
    /** 线性侧从不给第二序号 / Whether the linear side never fills the second index. */
    linearNeverHasASecondIndex(): boolean {
        return invoke(() => this.raw().linearNeverHasASecondIndex());
    }
    /** 序号不给排序 / Whether indices stay unsorted. */
    indicesAreNotNormalised(): boolean { return invoke(() => this.raw().indicesAreNotNormalised()); }
    /** 平方仍是二次项 / Whether a square stays quadratic. */
    squaresAreQuadratic(): boolean { return invoke(() => this.raw().squaresAreQuadratic()); }
    /** 只在两项相等时才算平方 / Whether only equal indices count as a square. */
    isSquareOnlyWhenEqual(): boolean { return invoke(() => this.raw().isSquareOnlyWhenEqual()); }
    /** `fromLinear` 的每一项都不带第二序号 / Whether every `fromLinear` term has no second index. */
    fromLinearHasNoSecondIndex(): boolean {
        return invoke(() => this.raw().fromLinearHasNoSecondIndex());
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个延迟函数结构的字面量。 / One deferred-structure literal. */
export interface StructureSpec {
    name: string;
    /** 物化产出的行数。 / How many rows it produces. */
    rows?: number;
    /** 是否拒绝物化。 / Whether it refuses to materialize. */
    fail?: boolean;
}

/** 物化请求。 / The materialization request. */
export interface MaterializeRequest {
    structures: StructureSpec[];
    /** 要物化的位置（**允许重复与乱序**）。 / The positions to materialize (**duplicates and any order allowed**). */
    indices?: number[];
    /** 是否在成功后再调用一次全量物化（验幂等）。 / Whether to run a full materialization afterwards. */
    repeatAfterSuccess?: boolean;
}

/**
 * 延迟函数物化的**全有或全无**与索引契约
 * （续挖 `model/mechanism/basic_mechanism_model.rs` 的 `resolve_deferred_functions` /
 * `materialize_deferred_functions_at` / `apply_native_lowering`）。
 *
 * 1. **失败不写一行、不移除任何结构**（`failureWritesNothing()`）：`materialize` 返回错误时
 *    `constraintCount()` 与 `pendingCount()` 都**原样不变**。所以"先全部生成再一次性追加"不是风格问题，
 *    而是"失败不留半成品"的唯一实现方式。
 * 2. **索引会排序并去重**（`indicesAreSortedAndDeduplicated()`）：`[2, 0, 2]` 等价于 `[0, 2]`——
 *    **重复索引不是错误**，物化个数按去重后算。
 * 3. **越界是错误**（`outOfRangeIsRefused()`）：`index >= 待物化个数` 直接报 "out of range"，
 *    且不产生任何副作用。
 * 4. **成功后只移除被处理的那些，其余保持原顺序**（`untouchedStructuresKeepTheirOrder()`）：
 *    物化 `[0, 2]` 后剩下原来的第 1、3 个。`oneStructureIsNeverMaterializedTwice()` 保证一次调用里
 *    同一结构不会被物化两次。
 * 5. **`repeatIsANoop()` 要小心读**：成功的**第一次全量**物化会把剩下的结构**真的展开**（行数增加），
 *    只有**列表已空之后再调**才是空操作。所以"幂等"说的是"清空之后"，不是"第二次调用什么都不做"。
 *
 * The all-or-nothing materialization of deferred functions and its index contract (continuation). **A failure writes no row
 * and removes nothing** (`failureWritesNothing()`): both `constraintCount()` and `pendingCount()` stay unchanged when
 * `materialize` errors, so "generate everything then append once" is the only way to avoid a half-built model. **Indices are
 * sorted and deduplicated** (`indicesAreSortedAndDeduplicated()`): `[2, 0, 2]` equals `[0, 2]`, so a **duplicate index is not
 * an error**. **Out of range is an error** (`outOfRangeIsRefused()`), with no side effects. **On success only the handled
 * structures are removed and the rest keep their order** (`untouchedStructuresKeepTheirOrder()`), and
 * `oneStructureIsNeverMaterializedTwice()` holds within one call. Read **`repeatIsANoop()` carefully**: the first *full*
 * pass after a partial one really expands the remaining structures (the row count grows); only a call **after the list is
 * empty** is a no-op — "idempotent" means "once cleared", not "the second call does nothing".
 */
export class MaterializeReport {
    private constructor(private state: MaterializeBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): MaterializeReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected materialize report text");
        }
        return invoke(() => new MaterializeReport(wasm().MaterializeReport.fromJson(json)));
    }
    private raw(): MaterializeBinding {
        if (!this.state) throw new OspfError("Disposed", "materialize report has been disposed");
        return this.state;
    }
    /** 是否成功 / Whether it succeeded. */
    succeeded(): boolean { return invoke(() => this.raw().succeeded()); }
    /** 失败消息 / The failure message. */
    errorMessage(): string | undefined { return invoke(() => this.raw().error()); }
    /** 最终约束行数 / The final row count. */
    constraintCount(): number { return invoke(() => this.raw().constraintCount()); }
    /** 最终待物化结构数 / The final pending count. */
    pendingCount(): number { return invoke(() => this.raw().pendingCount()); }
    /** 剩余结构条数 / The remaining structure count. */
    remainingCount(): number { return invoke(() => this.raw().remainingCount()); }
    /** 第 `position` 个剩余结构名 / The remaining name at `position`. */
    remainingAt(position: number): string { return invoke(() => this.raw().remainingAt(position)); }
    /** 结构条数 / The structure count. */
    traceCount(): number { return invoke(() => this.raw().traceCount()); }
    /** 第 `position` 个结构的物化次数 / Structure `position`'s materialization count. */
    traceCalls(position: number): number { return invoke(() => this.raw().traceCalls(position)); }
    /** 第 `position` 个结构名 / The name of structure `position`. */
    traceName(position: number): string { return invoke(() => this.raw().traceName(position)); }
    /** 失败不写一行 / Whether a failure writes nothing. */
    failureWritesNothing(): boolean { return invoke(() => this.raw().failureWritesNothing()); }
    /** 索引排序去重 / Whether indices are sorted and deduplicated. */
    indicesAreSortedAndDeduplicated(): boolean {
        return invoke(() => this.raw().indicesAreSortedAndDeduplicated());
    }
    /** 越界是错误 / Whether out of range is an error. */
    outOfRangeIsRefused(): boolean { return invoke(() => this.raw().outOfRangeIsRefused()); }
    /** 同一结构不会被物化两次 / Whether one structure is never materialized twice per call. */
    oneStructureIsNeverMaterializedTwice(): boolean {
        return invoke(() => this.raw().oneStructureIsNeverMaterializedTwice());
    }
    /** 未处理的结构保持原顺序 / Whether untouched structures keep their order. */
    untouchedStructuresKeepTheirOrder(): boolean {
        return invoke(() => this.raw().untouchedStructuresKeepTheirOrder());
    }
    /** 重复调用是空操作 / Whether a repeat call is a no-op. */
    repeatIsANoop(): boolean { return invoke(() => this.raw().repeatIsANoop()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 能力快照请求：只给**开着的**开关名。 / The capability request: only the names that are on. */
export interface BackendFeaturesRequest {
    /** 开着的开关名（camelCase 闭集）。 / The names that are on (a camelCase closed vocabulary). */
    enabled?: string[];
}

/**
 * 持久化后端的能力快照——**族开关与方言开关是两个独立层**，`anyEnabled()` 只看族
 * （续挖 `persistence/backend/mod.rs` 的 `PersistenceBackendFeatures`）。
 *
 * 这是**真边界**（DB 驱动），所以这一层只读**纯配置与推导**：不建连接、不执行 SQL。
 *
 * 1. **14 个开关 = 8 个族 + 6 个方言**（`sqlx` / `diesel` 各有 postgres/mysql/sqlite），两层**互相不蕴含**：
 *    `sqlx = true` **不**意味着 `sqlxPostgres = true`（两者是各自独立的 `cfg!`），
 *    反过来方言开着也**不**蕴含族开着（`familyDoesNotImplyItsDialects()`）。
 * 2. **`anyEnabled()` 只读那 8 个族开关**（`anyEnabledReadsOnlyFamilies()`）：6 个方言开关对它完全不可见。
 *    于是"方言开着、族关着"这种自相矛盾的快照会回答 `false`——**方言不启用后端**
 *    （`dialectDoesNotEnableTheFamily()`），这些方言在 `orphans` 里被点名。
 * 3. **`mongodb` / `redis` 是族但没有方言子开关**（`someFamiliesHaveNoDialects()`）：
 *    "族"的集合不是"有方言的族"的集合。
 * 4. **`current()` 是编译期快照**（`currentIsCompileTime()`）：`cfg!` 在编译时求值，运行期恒为常量，
 *    无法在运行期打开任何后端。默认构建下 14 个全关。
 *
 * The persistence backend capability snapshot — **family flags and dialect flags are two independent layers**, and
 * `anyEnabled()` reads only the families (continuation). This is a **true boundary** (DB drivers), so this layer reads
 * **pure configuration and derivation only**: no connection, no SQL. **Fourteen flags are eight families plus six
 * dialects** and the layers never imply each other (`familyDoesNotImplyItsDialects()`): `sqlx = true` does not mean
 * `sqlxPostgres = true`, and a dialect on does not imply its family on. **`anyEnabled()` reads only the eight families**
 * (`anyEnabledReadsOnlyFamilies()`), so a "dialect on, family off" snapshot answers `false` — **a dialect never enables a
 * backend** (`dialectDoesNotEnableTheFamily()`), and those dialects are named in `orphans`. **`mongodb` and `redis` are
 * families without dialect sub-flags** (`someFamiliesHaveNoDialects()`). And **`current()` is a compile-time snapshot**
 * (`currentIsCompileTime()`): `cfg!` is evaluated at compilation time and can never be turned on at run time; in the default
 * build all fourteen are off.
 */
export class BackendFeaturesReport {
    private constructor(private state: BackendFeaturesBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): BackendFeaturesReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected backend features report text");
        }
        return invoke(() => new BackendFeaturesReport(wasm().BackendFeaturesReport.fromJson(json)));
    }
    private raw(): BackendFeaturesBinding {
        if (!this.state) throw new OspfError("Disposed", "backend features report has been disposed");
        return this.state;
    }
    /** 开着的开关个数 / The enabled flag count. */
    enabledCount(): number { return invoke(() => this.raw().enabledCount()); }
    /** 第 `position` 个开着的开关名 / The enabled name at `position`. */
    enabledAt(position: number): string { return invoke(() => this.raw().enabledAt(position)); }
    /** 这个快照的 `anyEnabled()` / This snapshot's `anyEnabled()`. */
    anyEnabled(): boolean { return invoke(() => this.raw().anyEnabled()); }
    /** 族开关个数 / The family flag count. */
    familyCount(): number { return invoke(() => this.raw().familyCount()); }
    /** 方言开关个数 / The dialect flag count. */
    dialectCount(): number { return invoke(() => this.raw().dialectCount()); }
    /** 开着的族个数 / The enabled family count. */
    enabledFamilyCount(): number { return invoke(() => this.raw().enabledFamilyCount()); }
    /** 第 `position` 个开着的族 / The enabled family at `position`. */
    enabledFamilyAt(position: number): string {
        return invoke(() => this.raw().enabledFamilyAt(position));
    }
    /** 孤儿方言个数 / The orphan count. */
    orphanCount(): number { return invoke(() => this.raw().orphanCount()); }
    /** 第 `position` 个孤儿方言 / The orphan at `position`. */
    orphanAt(position: number): string { return invoke(() => this.raw().orphanAt(position)); }
    /** 编译期快照开着的个数 / The compile-time enabled count. */
    currentCount(): number { return invoke(() => this.raw().currentCount()); }
    /** 第 `position` 个编译期开着的开关 / The compile-time enabled name at `position`. */
    currentAt(position: number): string { return invoke(() => this.raw().currentAt(position)); }
    /** 编译期的 `anyEnabled()` / The compile-time `anyEnabled()`. */
    currentAnyEnabled(): boolean { return invoke(() => this.raw().currentAnyEnabled()); }
    /** 方言不启用族 / Whether a dialect never enables its family. */
    dialectDoesNotEnableTheFamily(): boolean {
        return invoke(() => this.raw().dialectDoesNotEnableTheFamily());
    }
    /** `anyEnabled()` 只读族 / Whether `anyEnabled()` reads only the families. */
    anyEnabledReadsOnlyFamilies(): boolean {
        return invoke(() => this.raw().anyEnabledReadsOnlyFamilies());
    }
    /** 族不蕴含自己的方言 / Whether a family never implies its dialects. */
    familyDoesNotImplyItsDialects(): boolean {
        return invoke(() => this.raw().familyDoesNotImplyItsDialects());
    }
    /** 存在没有方言的族 / Whether some families have no dialects. */
    someFamiliesHaveNoDialects(): boolean {
        return invoke(() => this.raw().someFamiliesHaveNoDialects());
    }
    /** `current()` 是编译期常量 / Whether `current()` is a compile-time constant. */
    currentIsCompileTime(): boolean { return invoke(() => this.raw().currentIsCompileTime()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个幂次项的字面量（与 `polynomialLift` 的 `PowerSpec` 区分：那个是升幂用的一元幂次）。 */
/** One power entry literal (distinct from `polynomialLift`'s `PowerSpec`, which is a degree-lift power). */
export interface PowerEntry {
    variable: number;
    /** 幂次（可负、可为 0）。 / The power (may be negative or zero). */
    power: number;
}

/** 标准单项式请求。 / The canonical monomial request. */
export interface CanonicalMonomialRequest {
    coefficient: number;
    powers?: PowerEntry[];
    /** 是否再追加一个幂次表完全相同的项（量"不合并"）。 / Whether to append an identical monomial. */
    appendAgain?: boolean;
}

/**
 * 标准单项式的幂次表：**幂次 0 与"变量不出现"读取上相同、表示上不同**
 * （续挖 `model/flatten/inner_box.rs` 的 `CanonicalMonomial` / `Canonical`）。
 *
 * 1. **`powers` 是 `HashMap<索引, i32>`，`getPower` 对缺席变量读回 `0`**（`absentReadsAsZero()`）——
 *    于是"幂次 0"与"变量不出现"**读取上不可区分**；但表示上可区分（`zeroPowerIsRepresentable()`）：
 *    `{x: 0}` 的 `tableLen` 是 1、不出现的变量则让 `tableLen` 保持 0。
 * 2. **`totalPower()` 只是幂次求和**（`totalPowerIsASum()`）：空表给 `0`、`{x: 0}` 也给 `0`，
 *    所以"总幂次 0"**不能**判断"这是常数"——常数项在 `constant` 字段，不在单项式列表里。
 * 3. **幂次可负、可为 0 且不校验**（`powersAreSignedAndUnvalidated()`）：`{x: -2}` 与 `{x: 0}` 都被原样接受。
 * 4. **`addMonomial` 不合并、不约简**（`addMonomialDoesNotMerge()`）：追加两个幂次表完全相同的单项式后
 *    `appendedCount` 是 2、`appendedCoefficientSum` 是两倍、`appendedTotalPower` 也是两倍。
 * 5. **`newVariable` 是"单变量 1 次"的便捷构造**（`newVariableIsASingleUnitPower()`）：表长恒 1、总幂次 1。
 *
 * The canonical monomial's power table: **"power zero" and "variable absent" read the same yet differ in representation**
 * (continuation). **`powers` is a `HashMap<index, i32>` and `getPower` reads an absent variable as `0`**
 * (`absentReadsAsZero()`), so the two are **indistinguishable on read**, but representation differs
 * (`zeroPowerIsRepresentable()`): `{x: 0}` gives `tableLen` 1 while an absent variable leaves it 0. **`totalPower()` is
 * just a sum** (`totalPowerIsASum()`): an empty table and `{x: 0}` both give `0`, so "total power zero" **cannot** mean "this
 * is a constant" — the constant lives in the `constant` field. **Powers may be negative or zero and are unvalidated**
 * (`powersAreSignedAndUnvalidated()`). **`addMonomial` neither merges nor simplifies**
 * (`addMonomialDoesNotMerge()`): appending an identical power table leaves `appendedCount` 2 with the coefficient sum and the
 * total power both doubled. And **`newVariable` is the single-unit-power convenience**
 * (`newVariableIsASingleUnitPower()`).
 */
export class CanonicalMonomialReport {
    private constructor(private state: CanonicalMonomialBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): CanonicalMonomialReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected canonical monomial report text");
        }
        return invoke(() => new CanonicalMonomialReport(
            wasm().CanonicalMonomialReport.fromJson(json)));
    }
    private raw(): CanonicalMonomialBinding {
        if (!this.state) throw new OspfError("Disposed", "canonical monomial report has been disposed");
        return this.state;
    }
    /** 系数 / The coefficient. */
    coefficient(): number { return invoke(() => this.raw().coefficient()); }
    /** 幂次表长度 / The power table length. */
    tableLen(): number { return invoke(() => this.raw().tableLen()); }
    /** 幂次表条数 / The power entry count. */
    powerCount(): number { return invoke(() => this.raw().powerCount()); }
    /** 第 `position` 个幂次项的变量 / The variable of entry `position`. */
    powerVariable(position: number): number {
        return invoke(() => this.raw().powerVariable(position));
    }
    /** 第 `position` 个幂次项的幂次 / The power of entry `position`. */
    powerOf(position: number): number { return invoke(() => this.raw().powerOf(position)); }
    /** 总幂次 / The total power. */
    totalPower(): number { return invoke(() => this.raw().totalPower()); }
    /** 一个不出现的变量读回的幂次 / What an absent variable reads back as. */
    absentPower(): number { return invoke(() => this.raw().absentPower()); }
    /** 一个幂次为 0 的变量读回的幂次 / What a zero-power variable reads back as. */
    zeroPower(): number { return invoke(() => this.raw().zeroPower()); }
    /** 追加后单项式条数 / The monomial count after the append. */
    appendedCount(): number { return invoke(() => this.raw().appendedCount()); }
    /** 追加后系数之和 / The summed coefficient after the append. */
    appendedCoefficientSum(): number {
        return invoke(() => this.raw().appendedCoefficientSum());
    }
    /** 追加后总幂次 / The total power after the append. */
    appendedTotalPower(): number { return invoke(() => this.raw().appendedTotalPower()); }
    /** 幂次 0 与不出现读取上不可区分 / Whether zero and absent are indistinguishable on read. */
    absentReadsAsZero(): boolean { return invoke(() => this.raw().absentReadsAsZero()); }
    /** 幂次 0 表示上可区分 / Whether a zero power is representable. */
    zeroPowerIsRepresentable(): boolean {
        return invoke(() => this.raw().zeroPowerIsRepresentable());
    }
    /** `totalPower` 只是求和 / Whether `totalPower` is just a sum. */
    totalPowerIsASum(): boolean { return invoke(() => this.raw().totalPowerIsASum()); }
    /** 幂次可负且不校验 / Whether powers may be negative and are unvalidated. */
    powersAreSignedAndUnvalidated(): boolean {
        return invoke(() => this.raw().powersAreSignedAndUnvalidated());
    }
    /** `addMonomial` 不合并 / Whether `addMonomial` does not merge. */
    addMonomialDoesNotMerge(): boolean {
        return invoke(() => this.raw().addMonomialDoesNotMerge());
    }
    /** `newVariable` 是单变量 1 次 / Whether `newVariable` is a single unit power. */
    newVariableIsASingleUnitPower(): boolean {
        return invoke(() => this.raw().newVariableIsASingleUnitPower());
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个系数字面量。 / One coefficient literal. */
export interface KeyTerm {
    variable: string;
    coefficient: number;
}

/** 位模式编码请求。 / The bit-pattern encoding request. */
export interface ExpressionKeyRequest {
    /** 方向：`le` / `ge` / `eq`。 / The sense: `le`, `ge` or `eq`. */
    sense: string;
    rhs: number;
    /** 系数项（**顺序不影响 key**）。 / The terms (**their order does not affect the key**). */
    terms?: KeyTerm[];
    /** 一个额外的右端项，用于量"数值相等但位不同"。 / An extra rhs to measure "equal numerically, different bits". */
    compareRhs?: number;
}

/**
 * `expressionKey()` 的**位模式编码**——它是**位身份**，不是数值身份
 * （续挖 `solver/logic_based_benders.rs` 的 `MasterCut::expression_key`）。
 *
 * 1. **浮点用 `to_bits()` 的定宽十六进制**（`bitPatternIsFixedWidth()`）：`1.0` → `3ff0000000000000`、
 *    `-1.0` → `bff0000000000000`，永远 16 位，不同数值不会因为"位数不同"而撞 key。
 * 2. **于是 `0.0` 与 `-0.0` 数值相等但 key 不同**（`zerosDifferBySign()`）：
 *    `rhs=0000000000000000;` vs `rhs=8000000000000000;`。key 是**位**身份——
 *    `-0.0` 与 `0.0` 在这里是**两个表达式**。
 * 3. **系数按变量 ID 的字典序拼接**（`orderDoesNotMatter()`）：`coefficients` 是 `BTreeMap`，
 *    所以构造时给的项顺序**不**影响 key。
 * 4. **每个变量写成 `{长度}:{id}={位模式};`**（`idIsLengthPrefixed()`）：长度前缀紧接 `:`，
 *    所以 `1:x` 与 `2:xy` 不会互相混淆。
 * 5. **NaN 走同一条位模式路**（`nanPayloadsDiffer()`）：不同 payload 的 NaN 给出**不同** key；
 *    这条只在**未经 `normalize()`** 的 cut 上可达（`normalize()` 拒非有限 rhs/系数）。
 *
 * The **bit-pattern encoding** of `expressionKey()` — a **bit identity**, not a numeric one (continuation). **Floats use
 * `to_bits()` in fixed-width hex** (`bitPatternIsFixedWidth()`), always sixteen digits, so different values never collide by
 * digit count. **Hence `0.0` and `-0.0` are numerically equal yet key differently** (`zerosDifferBySign()`):
 * `rhs=0000000000000000;` versus `rhs=8000000000000000;` — `-0.0` and `0.0` are **two expressions** here. **Coefficients are
 * concatenated in the variable ID's lexicographic order** (`orderDoesNotMatter()`), so construction order is irrelevant.
 * **Each variable is written `{len}:{id}={bits};`** (`idIsLengthPrefixed()`), keeping `1:x` and `2:xy` apart. And **NaN takes
 * the same bit path** (`nanPayloadsDiffer()`): different payloads key differently — reachable only on a cut that has **not**
 * been `normalize()`d.
 */
export class ExpressionKeyReport {
    private constructor(private state: ExpressionKeyBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): ExpressionKeyReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected expression key report text");
        }
        return invoke(() => new ExpressionKeyReport(wasm().ExpressionKeyReport.fromJson(json)));
    }
    private raw(): ExpressionKeyBinding {
        if (!this.state) throw new OspfError("Disposed", "expression key report has been disposed");
        return this.state;
    }
    /** 这个 cut 的 key / This cut's key. */
    key(): string { return invoke(() => this.raw().key()); }
    /** rhs 的位模式 / The rhs bit pattern. */
    rhsBits(): string { return invoke(() => this.raw().rhsBits()); }
    /** 逆序给系数时的 key / The key with the terms reversed. */
    reorderedKey(): string { return invoke(() => this.raw().reorderedKey()); }
    /** 系数位模式条数 / The coefficient pattern count. */
    coefficientBitCount(): number { return invoke(() => this.raw().coefficientBitCount()); }
    /** 第 `position` 个系数位模式 / The coefficient pattern at `position`. */
    coefficientBitsAt(position: number): string {
        return invoke(() => this.raw().coefficientBitsAt(position));
    }
    /** `compareRhs` 的 key / The compare key. */
    compareKey(): string { return invoke(() => this.raw().compareKey()); }
    /** `-0.0` 的 key / The `-0.0` key. */
    negativeZeroKey(): string { return invoke(() => this.raw().negativeZeroKey()); }
    /** `0.0` 的 key / The `0.0` key. */
    positiveZeroKey(): string { return invoke(() => this.raw().positiveZeroKey()); }
    /** 位模式是定宽十六进制 / Whether the bit pattern is fixed-width hex. */
    bitPatternIsFixedWidth(): boolean {
        return invoke(() => this.raw().bitPatternIsFixedWidth());
    }
    /** `0.0` 与 `-0.0` 的 key 不同 / Whether the two zeros key differently. */
    zerosDifferBySign(): boolean { return invoke(() => this.raw().zerosDifferBySign()); }
    /** 项顺序不影响 key / Whether the term order does not matter. */
    orderDoesNotMatter(): boolean { return invoke(() => this.raw().orderDoesNotMatter()); }
    /** 变量写成"长度:id" / Whether a variable is written as `len:id`. */
    idIsLengthPrefixed(): boolean { return invoke(() => this.raw().idIsLengthPrefixed()); }
    /** 不同 NaN payload 的 key 不同 / Whether NaN payloads differ. */
    nanPayloadsDiffer(): boolean { return invoke(() => this.raw().nanPayloadsDiffer()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 赋值里的一个变量。 / One variable inside the assignment. */
export interface EncodingAssignmentRow {
    variable: string;
    value: number;
}

/** 一个系数字面量。 / One coefficient literal. */
export interface EncodingTerm {
    variable: string;
    coefficient: number;
}

/** 编码标签请求。 / The encoding-label request. */
export interface EncodingLabelRequest {
    /** 要**声明**的编码：`linear` / `binaryNoGood` / `boundedIntegerNoGood`。 */
    /** The encoding to **claim**: `linear`, `binaryNoGood` or `boundedIntegerNoGood`. */
    encoding?: string;
    assignment?: EncodingAssignmentRow[];
    /** `boundedIntegerNoGood` 的族 ID（可空白——**没有任何地方校验它**）。 */
    /** The family id (**never validated**). */
    familyId?: string;
    terms?: EncodingTerm[];
    rhs?: number;
}

/**
 * cut 的编码标签是**元数据**
 * （续挖 `solver/logic_based_benders.rs` 的 `MasterCutEncoding`）。
 *
 * 1. **`MasterCut::new` 恒给 `linear`**（`newAlwaysClaimsLinear()`）：要别的编码必须**手动写字段**，
 *    构造函数没有对应参数（`newLabel` 恒为 `"linear"`，`claimedLabel` 才是你声明的那个）。
 * 2. **`expressionKey()` 完全不读 encoding**（`keyIgnoresTheEncoding()`）：两个表达式相同、只有编码不同的 cut
 *    得到**同一个 key**（`keysAgree()` 恒为真）。所以"key 相同"**不**意味着"编码相同"——
 *    按 key 去重会把线性行与二元 no-good 行当成同一个表达式。
 * 3. **`normalize()` 也不校验 encoding**（`normalizeIgnoresTheEncoding()`）：声明成 `boundedIntegerNoGood`
 *    而赋值空、族 ID 只有空格，照样 `Ok`；而且**族 ID 原样保留**（`normalizedFamilyId()` 连空格一起回，
 *    `normalize()` 只 `trim` 证明引用）。编码的**自洽性没有任何地方检查**。
 * 4. **`PartialEq` 读 encoding**（`equalitySeesTheEncoding()`）：id/来源/原因全同、只有编码不同 → **不相等**
 *    （`cutsAreEqual()` 恒等于"声明的是 `linear`"）。于是"相同表达式"在 key 上是同一个、在 `==` 上是两个，
 *    两个判据**必然分歧**。
 *
 * A cut's encoding label is **metadata** (continuation). **`MasterCut::new` always claims `linear`**
 * (`newAlwaysClaimsLinear()`), so any other encoding requires writing the field by hand — `newLabel()` is always `"linear"`
 * and `claimedLabel()` is the one you declared. **`expressionKey()` never reads the encoding**
 * (`keyIgnoresTheEncoding()`): two cuts with identical expressions that differ only in encoding give the **same key**
 * (`keysAgree()` is always true), so "same key" does **not** mean "same encoding". **`normalize()` does not validate the
 * encoding either** (`normalizeIgnoresTheEncoding()`): a `boundedIntegerNoGood` claim with an empty assignment and a
 * whitespace-only family id still passes, and the `family_id` is kept **verbatim** (`normalizedFamilyId()` returns the
 * spaces; only the proof reference is trimmed) — **nothing anywhere checks the encoding's self-consistency**. And
 * **`PartialEq` does read the encoding** (`equalitySeesTheEncoding()`): with id, origin and reason identical and only the
 * encoding differing the cuts are **not equal** (`cutsAreEqual()` is exactly "the claim is `linear`"), so "the same
 * expression" is one thing under the key and two things under `==`.
 */
export class EncodingLabelReport {
    private constructor(private state: EncodingLabelBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): EncodingLabelReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected encoding label report text");
        }
        return invoke(() => new EncodingLabelReport(wasm().EncodingLabelReport.fromJson(json)));
    }
    private raw(): EncodingLabelBinding {
        if (!this.state) throw new OspfError("Disposed", "encoding label report has been disposed");
        return this.state;
    }
    /** `new` 给的编码标签 / The label `new` gives. */
    newLabel(): string { return invoke(() => this.raw().newLabel()); }
    /** 手动声明后的编码标签 / The label after the manual claim. */
    claimedLabel(): string { return invoke(() => this.raw().claimedLabel()); }
    /** 两个 cut 的 key 是否相同 / Whether the two cuts' keys agree. */
    keysAgree(): boolean { return invoke(() => this.raw().keysAgree()); }
    /** 两个 cut 是否 `==` / Whether the two cuts are `==`. */
    cutsAreEqual(): boolean { return invoke(() => this.raw().cutsAreEqual()); }
    /** 声明的编码是否通过了 `normalize()` / Whether the claimed encoding survives `normalize()`. */
    normalizeAccepted(): boolean { return invoke(() => this.raw().normalizeAccepted()); }
    /** `normalize()` 之后的编码标签 / The label after `normalize()`. */
    normalizedLabel(): string { return invoke(() => this.raw().normalizedLabel()); }
    /** `normalize()` 之后的族 ID / The family id after `normalize()`. */
    normalizedFamilyId(): string | undefined {
        return invoke(() => this.raw().normalizedFamilyId());
    }
    /** `new` 恒给线性 / Whether `new` always claims linear. */
    newAlwaysClaimsLinear(): boolean { return invoke(() => this.raw().newAlwaysClaimsLinear()); }
    /** key 不读编码 / Whether the key ignores the encoding. */
    keyIgnoresTheEncoding(): boolean { return invoke(() => this.raw().keyIgnoresTheEncoding()); }
    /** `normalize()` 不校验编码 / Whether `normalize()` does not validate the encoding. */
    normalizeIgnoresTheEncoding(): boolean {
        return invoke(() => this.raw().normalizeIgnoresTheEncoding());
    }
    /** `==` 读编码 / Whether `==` sees the encoding. */
    equalitySeesTheEncoding(): boolean {
        return invoke(() => this.raw().equalitySeesTheEncoding());
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 活动性判定请求。 / The activity classification request. */
export interface ActivityBandRequest {
    tolerance: number;
    nearlyActiveTolerance: number;
    /** 相对容差系数。 / The relative tolerance coefficient. */
    relativeTolerance?: number;
    /** 要判定的 signed slack（**必须有限**：JSON 装不下 NaN/∞）。 */
    /** The signed slacks (**must be finite**: JSON cannot carry NaN or infinity). */
    slacks?: number[];
    /** 伴随的尺度（条数必须与 slacks 相同）。 / The scales (one per slack). */
    scales?: number[];
}

/**
 * 活动性判定的**四条容差带**（续挖 `analysis/activity.rs` 的 `ActivityConfig` / `classify`）。
 *
 * 1. **判定顺序是"先违约、再活动、再接近、最后不活动"**（`orderDecidesTheBoundaries()`）：
 *    `slack < -active` → `VIOLATED`；`|slack| <= active` → `ACTIVE`；`|slack| <= nearly` → `NEARLY_ACTIVE`；
 *    否则 `INACTIVE`。所以恰好 `slack === -active` 是 **`ACTIVE` 而不是违约**——
 *    "负 slack 就是违约"是错的，违约要求**严格**超过容差。
 * 2. **相对容差把 `scale = 0` 也抬高**（`relativeToleranceLiftsZeroScale()`）：
 *    `active = max(tolerance, relativeTolerance * max(|scale|, 1))`，所以 `|scale| < 1` 一律按 `1.0` 算，
 *    相对容差在"尺度为零"时**不是零**。
 * 3. **nearly 容差会被抬到不低于 active**（`nearlyIsLiftedToActive()`）：相对容差把 active 顶上去之后，
 *    `NEARLY_ACTIVE` 那条带子会**消失**（`nearlyActiveToleranceAt()` 与 `activeToleranceAt()` 相等）。
 * 4. **非有限值 → `UNKNOWN`**（`nonFiniteIsUnknown()`），且先判有限性、不看容差。
 *    **但这条路出不了 JSON**：`serde_json` 把 NaN/∞ 写成 `null` 就再也读不回来，
 *    所以请求侧**直接拒绝**非有限输入——成功的一次运行不能产出读不回来的结论。
 * 5. **`withTolerance(t)` 令 nearly 恰为 `10t`**（`withToleranceScalesByTen()`）；`accepted()` 是 `validate()` 的结果。
 *
 * **The four tolerance bands** of activity classification (continuation). **The decision order is violation, active,
 * nearly-active, inactive** (`orderDecidesTheBoundaries()`), so exactly `slack === -active` is **`ACTIVE`, not a violation** —
 * a violation requires **strictly** exceeding the tolerance. **The relative tolerance lifts even `scale = 0`**
 * (`relativeToleranceLiftsZeroScale()`): `active = max(tolerance, relativeTolerance * max(|scale|, 1))`, so the relative
 * tolerance is **not** zero at zero scale. **The nearly tolerance is raised to at least the active one**
 * (`nearlyIsLiftedToActive()`), which makes the `NEARLY_ACTIVE` band **disappear** once the relative tolerance pushes active up.
 * **Non-finite values give `UNKNOWN`** (`nonFiniteIsUnknown()`), checked before the tolerances — **but that path cannot cross
 * JSON** (`serde_json` writes NaN/infinity as `null` and never reads it back), so the request refuses non-finite input outright:
 * a successful run must never produce a verdict nobody can read back. And **`withTolerance(t)` makes nearly exactly `10t`**
 * (`withToleranceScalesByTen()`), while `accepted()` reports `validate()`.
 */
export class ActivityBandReport {
    private constructor(private state: ActivityBandBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): ActivityBandReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected activity band report text");
        }
        return invoke(() => new ActivityBandReport(wasm().ActivityBandReport.fromJson(json)));
    }
    private raw(): ActivityBandBinding {
        if (!this.state) throw new OspfError("Disposed", "activity band report has been disposed");
        return this.state;
    }
    /** 判定条数 / The row count. */
    rowCount(): number { return invoke(() => this.raw().rowCount()); }
    /** 第 `position` 条的 slack / The slack of row `position`. */
    slackAt(position: number): number { return invoke(() => this.raw().slackAt(position)); }
    /** 第 `position` 条的尺度 / The scale of row `position`. */
    scaleAt(position: number): number { return invoke(() => this.raw().scaleAt(position)); }
    /** 第 `position` 条的 active 容差 / The active tolerance of row `position`. */
    activeToleranceAt(position: number): number {
        return invoke(() => this.raw().activeToleranceAt(position));
    }
    /** 第 `position` 条的 nearly 容差 / The nearly tolerance of row `position`. */
    nearlyActiveToleranceAt(position: number): number {
        return invoke(() => this.raw().nearlyActiveToleranceAt(position));
    }
    /** 第 `position` 条的状态 / The status of row `position`. */
    statusAt(position: number): string { return invoke(() => this.raw().statusAt(position)); }
    /** `withTolerance(t)` 给出的 nearly 容差 / The nearly tolerance `withTolerance(t)` gives. */
    scaledNearly(): number { return invoke(() => this.raw().scaledNearly()); }
    /** 配置是否通过 `validate()` / Whether the configuration validates. */
    accepted(): boolean { return invoke(() => this.raw().accepted()); }
    /** 判定顺序决定边界 / Whether the order decides the boundaries. */
    orderDecidesTheBoundaries(): boolean {
        return invoke(() => this.raw().orderDecidesTheBoundaries());
    }
    /** 相对容差抬高零尺度 / Whether the relative tolerance lifts zero scale. */
    relativeToleranceLiftsZeroScale(): boolean {
        return invoke(() => this.raw().relativeToleranceLiftsZeroScale());
    }
    /** nearly 被抬到不低于 active / Whether nearly is lifted to active. */
    nearlyIsLiftedToActive(): boolean {
        return invoke(() => this.raw().nearlyIsLiftedToActive());
    }
    /** 非有限值给出 Unknown / Whether non-finite values give Unknown. */
    nonFiniteIsUnknown(): boolean { return invoke(() => this.raw().nonFiniteIsUnknown()); }
    /** `withTolerance` 按十倍放大 / Whether `withTolerance` scales by ten. */
    withToleranceScalesByTen(): boolean {
        return invoke(() => this.raw().withToleranceScalesByTen());
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条证据的字面量。 / One evidence literal. */
export interface EvidenceSpec {
    /** 证据种类：`linear` / `variableBound` / `integerComparison` / `semantic` / `unknown`。 */
    /** The kind: `linear`, `variableBound`, `integerComparison`, `semantic` or `unknown`. */
    kind: string;
    lhs?: number;
    rhs?: number;
    variable?: string;
    /** `lower` 或 `upper`。 / `lower` or `upper`. */
    side?: string;
    value?: number;
    bound?: number;
    integerLhs?: number;
    integerRhs?: number;
    /** `eq` / `ne` / `le` / `ge`。 / `eq`, `ne`, `le` or `ge`. */
    relation?: string;
    satisfied?: boolean;
    margin?: number;
    reason?: string;
}

/** 证据谓词请求。 / The evidence-predicate request. */
export interface EvidenceSpecRequest {
    evidences: EvidenceSpec[];
}

/**
 * 活动性证据的两个谓词——**`satisfied()` 的 `None` 把三件事混成一个**
 * （续挖 `analysis/activity.rs` 的 `ActivityEvidence`）。
 *
 * 1. **`hasSlackMetric()` 对同一个变体给两个答案**（`sameVariantTwoAnswers()`）：
 *    `semantic` 带 `margin` → `true`，不带 → `false`；`linear` / `variableBound` / `integerComparison` 都是 `true`，
 *    `unknown` 是 `false`。所以"有没有 slack 指标"**只能问谓词**，不能看种类名。
 * 2. **`satisfied()` 只对 `semantic` 给值**（`satisfiedIsNoneForThreeMeanings()`）：
 *    `linear` / `variableBound` / `integerComparison` 也是 `null`，与 `unknown` 的 `null` **无法区分**。
 *    于是 `null` 同时表示"求值失败"与"这类证据根本没有语义满足性"，调用方必须自己按种类再分一次。
 * 3. **`integerComparison` 有 slack 指标却答不出 `satisfied`**（`integerComparisonCannotAnswer()`）：
 *    整数比较语义上可判定，接口只回 `null`——两条谓词对同一变体的**覆盖面不一致**。
 * 4. **`unknown` 的 `reason` 不做任何校验**（`unknownReasonIsUnchecked()`）：空串、纯空格都能构造。
 *
 * The two predicates on activity evidence (continuation). **The same variant answers `hasSlackMetric()` two ways**
 * (`sameVariantTwoAnswers()`): `semantic` with a `margin` is `true`, without one `false`; `linear`, `variableBound` and
 * `integerComparison` are all `true` while `unknown` is `false` — so "does it carry a slack metric" **must** be asked of the
 * predicate, never inferred from the kind. **`satisfied()` only answers for `semantic`**
 * (`satisfiedIsNoneForThreeMeanings()`): `linear`, `variableBound` and `integerComparison` also answer `null`, which is
 * **indistinguishable** from `unknown`'s `null`, so `null` simultaneously means "evaluation failed" and "this kind has no
 * semantic satisfaction" and callers must re-dispatch on the kind. **`integerComparison` carries a slack metric yet cannot
 * answer `satisfied()`** (`integerComparisonCannotAnswer()`), so the two predicates **disagree in coverage**. And
 * **`unknown`'s `reason` validates nothing** (`unknownReasonIsUnchecked()`).
 */
export class EvidenceReport {
    private constructor(private state: EvidenceBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): EvidenceReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected evidence report text");
        }
        return invoke(() => new EvidenceReport(wasm().EvidenceReport.fromJson(json)));
    }
    private raw(): EvidenceBinding {
        if (!this.state) throw new OspfError("Disposed", "evidence report has been disposed");
        return this.state;
    }
    /** 证据条数 / The evidence count. */
    rowCount(): number { return invoke(() => this.raw().rowCount()); }
    /** 第 `position` 条的种类 / The kind of row `position`. */
    kindAt(position: number): string { return invoke(() => this.raw().kindAt(position)); }
    /** 第 `position` 条是否有 slack 指标 / Whether row `position` has a slack metric. */
    hasSlackMetricAt(position: number): boolean {
        return invoke(() => this.raw().hasSlackMetricAt(position));
    }
    /** 第 `position` 条的 `satisfied()`（`undefined` 表示 `None`）。 */
    /** `satisfied()` of row `position` (`undefined` for `None`). */
    satisfiedAt(position: number): boolean | undefined {
        return invoke(() => this.raw().satisfiedAt(position));
    }
    /** 有 slack 指标的证据条数 / How many evidences carry a slack metric. */
    withSlackMetric(): number { return invoke(() => this.raw().withSlackMetric()); }
    /** `satisfied()` 给出值的条数 / How many evidences answer `satisfied()`. */
    withSatisfied(): number { return invoke(() => this.raw().withSatisfied()); }
    /** 同一个变体给两个答案 / Whether one variant answers twice. */
    sameVariantTwoAnswers(): boolean { return invoke(() => this.raw().sameVariantTwoAnswers()); }
    /** `satisfied()` 的 null 混了三种含义 / Whether `satisfied()`'s null conflates three meanings. */
    satisfiedIsNoneForThreeMeanings(): boolean {
        return invoke(() => this.raw().satisfiedIsNoneForThreeMeanings());
    }
    /** 整数比较有 slack 却答不出 satisfied / Whether an integer comparison cannot answer. */
    integerComparisonCannotAnswer(): boolean {
        return invoke(() => this.raw().integerComparisonCannotAnswer());
    }
    /** `unknown` 的原因不校验 / Whether `unknown`'s reason is unchecked. */
    unknownReasonIsUnchecked(): boolean {
        return invoke(() => this.raw().unknownReasonIsUnchecked());
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个状态的计数。 / One status count. */
export interface StatusCountSpec {
    status: string;
    count: number;
}

/** 一个组汇总的字面量。 / One group summary literal. */
export interface GroupSummarySpec {
    /** 组名；`undefined` 表示未分组。 / The group name; `undefined` means ungrouped. */
    group?: string;
    counts?: StatusCountSpec[];
}

/** 一条约束记录的字面量。 / One constraint record literal. */
export interface ConstraintRecordSpec {
    id: string;
    group?: string;
    /** `ACTIVE` / `NEARLY_ACTIVE` / `INACTIVE` / `SATISFIED_WITHOUT_SLACK_METRIC` / `VIOLATED` / `UNKNOWN`。 */
    status: string;
    slack?: number;
    normalizedSlack?: number;
    tolerance?: number;
    satisfied?: boolean;
}

/** 一条变量边界记录的字面量。 / One variable-bound record literal. */
export interface BoundRecordSpec {
    variable: string;
    /** `lower` 或 `upper`。 / `lower` or `upper`. */
    side: string;
    value: number;
    bound: number;
    slack: number;
    normalizedSlack: number;
    tolerance: number;
    satisfied: boolean;
    status: string;
}

/** 活动性报告请求（聚合字段缺省时按记录重算）。 / The report request (aggregates recomputed when absent). */
export interface ActivityReportRequest {
    schemaVersion?: string;
    tolerance?: number;
    nearlyActiveTolerance?: number;
    constraints?: ConstraintRecordSpec[];
    variableBounds?: BoundRecordSpec[];
    summary?: StatusCountSpec[];
    variableBoundSummary?: StatusCountSpec[];
    groups?: GroupSummarySpec[];
}

/**
 * 活动性报告的 `validate()` 是**聚合严查、数值只看有限性**
 * （续挖 `analysis/activity.rs` 的 `ConstraintActivityReport::validate`）。
 *
 * 1. **聚合字段被重算比对**（`aggregatesAreRecomputed()`）：`summary` 必须等于按 `constraints` 重算的计数，
 *    `variableBoundSummary` 同理，`groups` 必须等于按 group 分组的聚合（**含未分组那个 `undefined` 组**）。
 *    改一位计数就报 "summary does not match its records"。
 * 2. **组的条数也被查**（`duplicateGroupsAreRefused()`）：同一个组列两次会被抓到。
 * 3. **数值字段只查有限性、不查彼此关系**（`numbersOnlyCheckFiniteness()`）：`slack` / `normalizedSlack` /
 *    `tolerance` 各自有限就算过——`normalizedSlack` 可以与 `slack` 完全不符。
 * 4. **`status` 不与 `slack`/`tolerance` 交叉校验**（`statusIsNotCrossChecked()`）：声明 `INACTIVE` 而 slack 为 0 也能过。
 * 5. **`satisfied` 也不与 slack 交叉校验**（`satisfiedIsNotCrossChecked()`）：`satisfied: true` 配极负 slack 照样过。
 * 6. **重复 ID / 空白 ID / 空白组 / 空白 `schemaVersion` 被拒**（`identitiesAreChecked()`）。
 *
 * `validate()` of the activity report is **strict about aggregates and only checks finiteness for numbers** (continuation).
 * **Aggregate fields are recomputed and compared** (`aggregatesAreRecomputed()`): `summary` must equal the counts recomputed
 * from `constraints`, `variableBoundSummary` likewise, and `groups` must equal the per-group aggregation **including the
 * `undefined` ungrouped group**; one wrong count reports "summary does not match its records". **The number of groups is
 * checked too** (`duplicateGroupsAreRefused()`). **Numeric fields are only checked for finiteness, never against each other**
 * (`numbersOnlyCheckFiniteness()`): `normalizedSlack` may disagree wildly with `slack`. **`status` is not cross-checked**
 * (`statusIsNotCrossChecked()`): `INACTIVE` with a zero slack passes. **`satisfied` is not cross-checked either**
 * (`satisfiedIsNotCrossChecked()`): `satisfied: true` beside a very negative slack passes. And **duplicate IDs, blank IDs,
 * blank groups and a blank `schemaVersion` are refused** (`identitiesAreChecked()`).
 */
export class ActivityReportVerdict {
    private constructor(private state: ActivityReportBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): ActivityReportVerdict {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected activity report verdict text");
        }
        return invoke(() => new ActivityReportVerdict(
            wasm().ActivityReportVerdict.fromJson(json)));
    }
    private raw(): ActivityReportBinding {
        if (!this.state) throw new OspfError("Disposed", "activity report verdict has been disposed");
        return this.state;
    }
    /** `validate()` 是否通过 / Whether `validate()` passed. */
    accepted(): boolean { return invoke(() => this.raw().accepted()); }
    /** 失败消息 / The failure message. */
    errorMessage(): string | undefined { return invoke(() => this.raw().error()); }
    /** 聚合字段被重算比对 / Whether the aggregates are recomputed. */
    aggregatesAreRecomputed(): boolean { return invoke(() => this.raw().aggregatesAreRecomputed()); }
    /** 重复的组被拒 / Whether duplicate groups are refused. */
    duplicateGroupsAreRefused(): boolean {
        return invoke(() => this.raw().duplicateGroupsAreRefused());
    }
    /** 数值只查有限性 / Whether numbers are only checked for finiteness. */
    numbersOnlyCheckFiniteness(): boolean {
        return invoke(() => this.raw().numbersOnlyCheckFiniteness());
    }
    /** `status` 不交叉校验 / Whether `status` is not cross-checked. */
    statusIsNotCrossChecked(): boolean {
        return invoke(() => this.raw().statusIsNotCrossChecked());
    }
    /** `satisfied` 不交叉校验 / Whether `satisfied` is not cross-checked. */
    satisfiedIsNotCrossChecked(): boolean {
        return invoke(() => this.raw().satisfiedIsNotCrossChecked());
    }
    /** 身份被校验 / Whether identities are checked. */
    identitiesAreChecked(): boolean { return invoke(() => this.raw().identitiesAreChecked()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个辅助变量声明的字面量。 / One auxiliary declaration literal. */
export interface AuxiliarySpec {
    id: string;
    /** `binary` 或 `integer`。 / `binary` or `integer`. */
    kind?: string;
    lower?: number;
    upper?: number;
}

/** 辅助域校验请求。 / The auxiliary-domain request. */
export interface AuxiliaryDomainRequest {
    auxiliaries?: AuxiliarySpec[];
    /** 是否把全部声明放进同一个 cut（量重复 ID）。 / Whether to put every declaration into one cut. */
    together?: boolean;
}

/**
 * 辅助变量的**整数值域校验**——`|界| > 2^53` 一律拒，恰好 `2^53` 放行
 * （续挖 `solver/logic_based_benders.rs` 的 `MasterCut::normalize` → `MasterVariableDomain::validate`）。
 *
 * 校验是 `pub(crate)` 的，所以只能**通过 `normalize()` 观测**。五条实测：
 *
 * 1. **`lower > upper` 被拒**（`invertedBoundsAreRefused()`），消息带上下界原值
 *    （`lower 5 above upper 1`）。恰好相等（单点域）是允许的。
 * 2. **界的绝对值超过 `2^53` 被拒**（`beyondTheExactRangeIsRefused()`）：判据是**严格大于**，
 *    所以 `±2^53`（9007199254740992）恰好**放行**（`twoToThe53Passes()`）、`2^53 + 1` 才被拒。
 *    这是给"`i64` 界转 `f64`"留的天花板：超出后转成 f64 就不再唯一。
 * 3. **`binary` 域不参与这两项校验**（`binaryIsUnchecked()`）：它没有界字段，成员判定恒为 `0..=1`。
 * 4. **空白 ID 被拒**（`blankIdsAreRefused()`），而**重复 ID 是另一条报错**
 *    （`duplicateIdsAreRefused()`，`declares duplicate auxiliary variable`）——两条检查分属不同位置，
 *    而且重复只有"放进同一个 cut"时才出现（逐条各自都能过）。
 * 5. **`normalize()` 原样保留声明**（`normalizeKeepsTheDeclarations()`）：条数、顺序、域都不变。
 *
 * The **integer-domain validation** of auxiliaries (continuation). The check is `pub(crate)`, so it is **only observable through
 * `normalize()`**. **`lower > upper` is refused** (`invertedBoundsAreRefused()`) with both bounds quoted, while an exact
 * single-point domain is allowed. **A bound whose absolute value exceeds `2^53` is refused**
 * (`beyondTheExactRangeIsRefused()`), compared strictly, so `±2^53` **passes** (`twoToThe53Passes()`) and only `2^53 + 1` is
 * refused — the ceiling keeping an `i64` bound uniquely representable as `f64`. **The `binary` domain takes neither check**
 * (`binaryIsUnchecked()`). **A blank ID is refused** (`blankIdsAreRefused()`) while **a duplicate ID raises a different error**
 * (`duplicateIdsAreRefused()`), and a duplicate only shows up when the declarations share one cut (each passes alone). And
 * **`normalize()` keeps the declarations verbatim** (`normalizeKeepsTheDeclarations()`).
 */
export class AuxiliaryDomainReport {
    private constructor(private state: AuxiliaryDomainBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): AuxiliaryDomainReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected auxiliary domain report text");
        }
        return invoke(() => new AuxiliaryDomainReport(
            wasm().AuxiliaryDomainReport.fromJson(json)));
    }
    private raw(): AuxiliaryDomainBinding {
        if (!this.state) throw new OspfError("Disposed", "auxiliary domain report has been disposed");
        return this.state;
    }
    /** 逐条结果条数 / The outcome count. */
    outcomeCount(): number { return invoke(() => this.raw().outcomeCount()); }
    /** 第 `position` 条的 ID / The ID of outcome `position`. */
    idAt(position: number): string { return invoke(() => this.raw().idAt(position)); }
    /** 第 `position` 条是否被接受 / Whether outcome `position` was accepted. */
    acceptedAt(position: number): boolean { return invoke(() => this.raw().acceptedAt(position)); }
    /** 第 `position` 条的失败消息 / The failure message of outcome `position`. */
    errorAt(position: number): string | undefined { return invoke(() => this.raw().errorAt(position)); }
    /** 一次性放全部时是否被接受 / Whether the combined cut was accepted. */
    combinedAccepted(): boolean | undefined { return invoke(() => this.raw().combinedAccepted()); }
    /** 一次性放全部时的失败消息 / The combined failure message. */
    combinedError(): string | undefined { return invoke(() => this.raw().combinedError()); }
    /** `normalize()` 之后保留的条数 / The kept declaration count. */
    keptCount(): number { return invoke(() => this.raw().keptCount()); }
    /** 保留的 ID 条数 / The kept ID count. */
    keptIdCount(): number { return invoke(() => this.raw().keptIdCount()); }
    /** 第 `position` 个保留的 ID / The kept ID at `position`. */
    keptIdAt(position: number): string { return invoke(() => this.raw().keptIdAt(position)); }
    /** 恰好 `2^53` 被放行 / Whether exactly `2^53` passes. */
    twoToThe53Passes(): boolean { return invoke(() => this.raw().twoToThe53Passes()); }
    /** `2^53 + 1` 被拒 / Whether `2^53 + 1` is refused. */
    beyondTheExactRangeIsRefused(): boolean {
        return invoke(() => this.raw().beyondTheExactRangeIsRefused());
    }
    /** 界颠倒被拒 / Whether inverted bounds are refused. */
    invertedBoundsAreRefused(): boolean {
        return invoke(() => this.raw().invertedBoundsAreRefused());
    }
    /** `binary` 域不参与校验 / Whether the `binary` domain is unchecked. */
    binaryIsUnchecked(): boolean { return invoke(() => this.raw().binaryIsUnchecked()); }
    /** 空白 ID 被拒 / Whether blank IDs are refused. */
    blankIdsAreRefused(): boolean { return invoke(() => this.raw().blankIdsAreRefused()); }
    /** 重复 ID 是另一条报错 / Whether a duplicate ID raises a different error. */
    duplicateIdsAreRefused(): boolean { return invoke(() => this.raw().duplicateIdsAreRefused()); }
    /** `normalize()` 原样保留声明 / Whether `normalize()` keeps the declarations verbatim. */
    normalizeKeepsTheDeclarations(): boolean {
        return invoke(() => this.raw().normalizeKeepsTheDeclarations());
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个绑定的字面量（连同要赋的值）。 / One binding literal (together with the value to assign). */
export interface BindingLiteral {
    id: string;
    /** `binary` 或 `integer`。 / `binary` or `integer`. */
    kind?: string;
    lower?: number;
    upper?: number;
    /** 若给出，就为该 ID 赋这个值。 / When present, assign this value to that ID. */
    value?: number;
}

/** 成对契约请求。 / The paired-contract request. */
export interface BindingAssignmentRequest {
    bindings?: BindingLiteral[];
    /** 一个**不被任何绑定覆盖**的额外赋值（量"多给"）。 / An extra assignment **covered by no binding**. */
    extra?: BindingLiteral;
    /** 是否跳过第一个绑定的赋值（量"少给"）。 / Whether to drop the first binding's value. */
    dropOne?: boolean;
}

/**
 * `MasterBinding` 与 `MasterAssignment` 的**成对契约**
 * （续挖 `solver/logic_based_benders.rs`）。第 37 单只在探针里撞到过"必须恰好覆盖"这条报错，
 * 第 47 单量的 `normalize()` 那条路径上的域校验；这一单量**构造函数这一侧**。
 *
 * 1. **`MasterBinding::new` 拒绝空集合**（`emptyBindingIsRefused()`）："requires at least one master binding"——
 *    所以"零个 master 变量"这个状态**构造不出来**。
 * 2. **重复 ID 在 `new` 里就被拒**（`duplicateIsRefusedInNew()`）：比 `normalize()` 那条报错更早、措辞也不同。
 * 3. **域校验在 `new` 里也会跑**（`newValidatesTheDomains()`）：`lower > upper` 与超过 `2^53` 的界同样被拒，
 *    不必等到某条 cut 的 `normalize()`。
 * 4. **`MasterAssignment::new` 要求值集合与绑定集合恰好相等**（`exactCoverageIsRequired()`）：
 *    少一个变量、多一个变量都报 "does not match the stable binding set"——**"多给"与"少给"是同一个错误**
 *    （`shortError()` 与 `extraError()` 的文本完全相等）。
 * 5. **越界与"多给"是两条不同的报错**（`outOfDomainDiffersFromExtra()`）：覆盖对上了才查域，
 *    越界报 "is outside its domain"；`binary` 域按 `0..=1` 判定，所以 `2` 与 `-1` 都算越界。
 * 6. **`ids` 是字典序**（`idsAreLexicographic()`）：内部 `BTreeMap`，与插入顺序无关。
 *
 * The **paired contract** of `MasterBinding` and `MasterAssignment` (continuation). **`MasterBinding::new` refuses an empty
 * set** (`emptyBindingIsRefused()`), so "zero master variables" **cannot be constructed**. **A duplicate ID is refused in
 * `new`** (`duplicateIsRefusedInNew()`), earlier and worded differently than the `normalize()` error. **Domain validation runs
 * in `new` too** (`newValidatesTheDomains()`). **`MasterAssignment::new` requires the value set to exactly equal the binding
 * set** (`exactCoverageIsRequired()`): a missing variable and an extra variable both report "does not match the stable binding
 * set" — **"too few" and "too many" are one error** (`shortError()` and `extraError()` are literally equal). **An
 * out-of-domain value is a different error** (`outOfDomainDiffersFromExtra()`), and a `binary` domain judges by `0..=1`, so
 * both `2` and `-1` are out of domain. And **`ids` are lexicographic** (`idsAreLexicographic()`), independent of insertion
 * order.
 */
export class BindingAssignmentReport {
    private constructor(private state: BindingAssignmentBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): BindingAssignmentReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected binding assignment report text");
        }
        return invoke(() => new BindingAssignmentReport(
            wasm().BindingAssignmentReport.fromJson(json)));
    }
    private raw(): BindingAssignmentBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "binding assignment report has been disposed");
        }
        return this.state;
    }
    /** 绑定集合是否建成 / Whether the binding set was built. */
    bindingAccepted(): boolean { return invoke(() => this.raw().bindingAccepted()); }
    /** 绑定集合的失败消息 / The binding failure message. */
    bindingError(): string | undefined { return invoke(() => this.raw().bindingError()); }
    /** 绑定条数 / The binding count. */
    bindingCount(): number { return invoke(() => this.raw().bindingCount()); }
    /** 绑定 ID 条数 / The ID count. */
    bindingIdCount(): number { return invoke(() => this.raw().bindingIdCount()); }
    /** 第 `position` 个绑定 ID / The binding ID at `position`. */
    bindingIdAt(position: number): string { return invoke(() => this.raw().bindingIdAt(position)); }
    /** 第 `position` 个域字面量 / The domain literal at `position`. */
    domainAt(position: number): string { return invoke(() => this.raw().domainAt(position)); }
    /** 恰好覆盖的赋值是否建成 / Whether the covering assignment was built. */
    assignmentAccepted(): boolean { return invoke(() => this.raw().assignmentAccepted()); }
    /** 赋值的失败消息 / The assignment failure message. */
    assignmentError(): string | undefined { return invoke(() => this.raw().assignmentError()); }
    /** "少给"的结果 / The "too few" result. */
    shortError(): string | undefined { return invoke(() => this.raw().shortError()); }
    /** "多给"的结果 / The "too many" result. */
    extraError(): string | undefined { return invoke(() => this.raw().extraError()); }
    /** 空集合被拒 / Whether an empty set is refused. */
    emptyBindingIsRefused(): boolean { return invoke(() => this.raw().emptyBindingIsRefused()); }
    /** 重复 ID 在 `new` 里被拒 / Whether a duplicate ID is refused in `new`. */
    duplicateIsRefusedInNew(): boolean { return invoke(() => this.raw().duplicateIsRefusedInNew()); }
    /** `new` 也校验域 / Whether `new` validates the domains. */
    newValidatesTheDomains(): boolean { return invoke(() => this.raw().newValidatesTheDomains()); }
    /** 要求恰好覆盖 / Whether exact coverage is required. */
    exactCoverageIsRequired(): boolean { return invoke(() => this.raw().exactCoverageIsRequired()); }
    /** 越界与"多给"是两条报错 / Whether out-of-domain differs from extra. */
    outOfDomainDiffersFromExtra(): boolean {
        return invoke(() => this.raw().outOfDomainDiffersFromExtra());
    }
    /** `ids` 是字典序 / Whether `ids` are lexicographic. */
    idsAreLexicographic(): boolean { return invoke(() => this.raw().idsAreLexicographic()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条来源的字面量。 / One source literal. */
export interface SourceSpec {
    /** `constraint` / `variableLowerBound` / `variableUpperBound` / `variableBound` / `sparseDomain` /
     *  `objectiveTarget`。 */
    kind: string;
    /** 约束或变量 ID。 / The constraint or variable ID. */
    id?: string;
    /** `variableBound` 的侧：`lower` 或 `upper`。 / The side of `variableBound`. */
    side?: string;
    /** 目标 ID。 / The objective ID. */
    objective?: string;
    /** `at-least` 或 `at-most`。 / `at-least` or `at-most`. */
    relation?: string;
    value?: number;
}

/** 来源身份请求。 / The source-identity request. */
export interface SourceIdentityRequest {
    sources?: SourceSpec[];
}

/**
 * `DiagnosticSource` 的六种来源与它们的**身份合并**
 * （续挖 `analysis/mod.rs` 的 `kind()` / `stable_id()` / `validate()` / `as_infeasibility_member()`）。
 *
 * 1. **`kind` 的六个名字是固定词表**（`kindNameAt()` 逐条取）：`constraint` / `variable-lower-bound` /
 *    `variable-upper-bound` / `variable-bound` / `sparse-domain` / `objective-target`。
 * 2. **`stableId` 把"下界"与"带侧边界"合并成同一个 ID**（`stableIdMergesLowerAndBound()`）：
 *    `variableLowerBound{x}` 与 `variableBound{x, side: "lower"}` 都给出 `variable:x:lower`，而 `kind` **不同**——
 *    所以**单看 `stableId` 无法区分来源种类**，只有 `kind` + `stableId` 的复合键才唯一。
 * 3. **目标另用命名空间**（`theTargetIsASeparateNamespace()`）：前缀 `objective-target:`。
 * 4. **目标 ID 里的数值走 `canonicalFloat`**（`targetIdsUseCanonicalFloats()`）：`2` 与 `2.0` 同一个 ID
 *    （整数补 `.0`），`0.1 + 0.2` 与 `0.3` 不同；`-0.0` 与 `0.0` 也本应不同，但 `JSON.stringify(-0) === "0"`，
 *    所以**客户端表示不出来**，只能在 Rust 侧发生。
 * 5. **空白 ID 被拒，约束与变量是两条不同措辞**（`blankIdsAreRefused()`）：`constraint ID must not be blank`
 *    与 `variable ID must not be blank`。
 * 6. **目标不是不可行性证据成员**（`theTargetIsNotAMember()`）：`asInfeasibilityMember()` 对目标返回 `null`，
 *    对其余五种返回有值。
 *
 * 另外一条实测是本层自己的：**单条的构造失败被记录在 `errorAt()` 里、不打断整批**，
 * 只有条数超限（64）才是整体错误。
 *
 * The six `DiagnosticSource` kinds and where their **identities merge** (continuation). **The `kind` names are a fixed
 * vocabulary** (`kindNameAt()`). **`stableId` merges "lower bound" and "sided bound"** (`stableIdMergesLowerAndBound()`): both give
 * `variable:x:lower` while their `kind` **differs**, so **a `stableId` alone cannot tell the kind** and only the
 * `kind` + `stableId` pair is unique. **The target uses its own namespace** (`theTargetIsASeparateNamespace()`). **Target
 * numbers use `canonicalFloat`** (`targetIdsUseCanonicalFloats()`): `2` and `2.0` share one ID, `0.1 + 0.2` and `0.3` differ,
 * and `-0.0` against `0.0` **cannot be expressed by a client** (`JSON.stringify(-0) === "0"`). **Blank IDs are refused with two
 * different messages** (`blankIdsAreRefused()`). **The target is not an infeasibility member** (`theTargetIsNotAMember()`).
 * One more measured fact belongs to this layer: **a per-source build failure is recorded in `errorAt()` instead of aborting the
 * batch**; only the 64-source cap is an overall error.
 */
export class SourceIdentityReport {
    private constructor(private state: SourceIdentityBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): SourceIdentityReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected source identity report text");
        }
        return invoke(() => new SourceIdentityReport(
            wasm().SourceIdentityReport.fromJson(json)));
    }
    private raw(): SourceIdentityBinding {
        if (!this.state) throw new OspfError("Disposed", "source identity report has been disposed");
        return this.state;
    }
    /** 来源条数 / The source count. */
    sourceCount(): number { return invoke(() => this.raw().sourceCount()); }
    /** 第 `position` 条的 `kind` / The `kind` at `position`. */
    kindAt(position: number): string | undefined { return invoke(() => this.raw().kindAt(position)); }
    /** 第 `position` 条的 `stableId` / The `stableId` at `position`. */
    stableIdAt(position: number): string | undefined {
        return invoke(() => this.raw().stableIdAt(position));
    }
    /** 第 `position` 条是否有证据成员 / Whether `position` has an evidence member. */
    memberAt(position: number): boolean | undefined { return invoke(() => this.raw().memberAt(position)); }
    /** 第 `position` 条的错误 / The error at `position`. */
    errorAt(position: number): string | undefined { return invoke(() => this.raw().errorAt(position)); }
    /** 词表条数 / The vocabulary size. */
    kindCount(): number { return invoke(() => this.raw().kindCount()); }
    /** 第 `position` 个词表项 / The vocabulary entry at `position`. */
    kindNameAt(position: number): string { return invoke(() => this.raw().kindNameAt(position)); }
    /** 下界与带侧边界共享同一个 ID / Whether the lower bound and the sided bound share one ID. */
    stableIdMergesLowerAndBound(): boolean {
        return invoke(() => this.raw().stableIdMergesLowerAndBound());
    }
    /** 目标另用命名空间 / Whether the target uses its own namespace. */
    theTargetIsASeparateNamespace(): boolean {
        return invoke(() => this.raw().theTargetIsASeparateNamespace());
    }
    /** 目标数值走 canonical float / Whether target numbers use `canonicalFloat`. */
    targetIdsUseCanonicalFloats(): boolean {
        return invoke(() => this.raw().targetIdsUseCanonicalFloats());
    }
    /** 空白 ID 被拒 / Whether blank IDs are refused. */
    blankIdsAreRefused(): boolean { return invoke(() => this.raw().blankIdsAreRefused()); }
    /** `kind` + `stableId` 才唯一 / Whether only `kind` + `stableId` is unique. */
    theKindCompletesTheId(): boolean { return invoke(() => this.raw().theKindCompletesTheId()); }
    /** 目标不是证据成员 / Whether the target is not an evidence member. */
    theTargetIsNotAMember(): boolean { return invoke(() => this.raw().theTargetIsNotAMember()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条 cut 的声明字面量。 / One cut's declaration literal. */
export interface CutValiditySpec {
    id: string;
    /** `global` 或 `local`。 / `global` or `local`. */
    validity?: string;
    /** `verified` / `claimed` / `none`。 */
    proofStatus?: string;
    proofReference?: string;
    rhs?: number;
}

/** 有效性与证明状态请求（前两条会被互相比较）。 / The validity request (the first two cuts are compared). */
export interface CutValidityRequest {
    cuts?: CutValiditySpec[];
}

/**
 * `MasterCutValidity` 与 `MasterCutProofStatus` 是**声明性字段**
 * （续挖 `solver/logic_based_benders.rs` 的 `MasterCut::normalize` / `expression_key` / `verified_global`）。
 *
 * 1. **`local` 在可达层从不被拒**（`localIsNeverRefused()`）：`new(..., Local, Claimed, ...)` + `normalize()`
 *    都成功。拒 `Local` 的三处闸门都是**私有**求解器函数，所以"局部有效"这个状态**能造出来、能留在集合里**，
 *    只是求解器不会用它。
 * 2. **`normalize()` 原样保留两者**（`normalizeKeepsThem()`）：它只清零系数、trim `proofReference`。
 * 3. **`expressionKey` 完全看不见这两者**（`theKeyIgnoresThem()`）：`global`/`local`、`verified`/`claimed`/`none`
 *    给出**同一个** key——key 只由 sense、rhs 位模式与系数决定。
 * 4. **`==`（`equal()`）看得见它们**：id/origin/reason 全钉住时，改一项就 `sameExpressionKey: true` +
 *    `equal: false`。
 * 5. **`verifiedGlobalPinsThreeFields()`**：`verified_global` 钉住 `global` + `verified` + `Some(reference.trim())`。
 * 6. **`verified` 必须挂非空引用，但引用内容不被校验**（`verifiedRequiresAReference()`）：无引用/空白引用被
 *    `normalize()` 拒绝（`must carry a proof reference`），而 `"x"` 与 `"proof-of-everything"` 一样过——
 *    "已验证"不是纯自称，只是**自称加一根非空字符串**。
 *
 * `MasterCutValidity` and `MasterCutProofStatus` are **declarative fields** (continuation). **`local` is never refused in the
 * reachable layer** (`localIsNeverRefused()`): the three gates that reject it are **private** solver functions, so "locally
 * valid" **can be built and kept**, it is just never used. **`normalize()` keeps both verbatim** (`normalizeKeepsThem()`),
 * clearing only zero coefficients and trimming `proofReference`. **`expressionKey` cannot see either**
 * (`theKeyIgnoresThem()`). **`==` does see them**: with id/origin/reason pinned, flipping one gives `sameExpressionKey: true`
 * with `equal: false`. **`verified_global` pins three fields** (`verifiedGlobalPinsThreeFields()`). And **`verified` requires a
 * non-blank reference whose content is never checked** (`verifiedRequiresAReference()`): `"x"` passes as readily as
 * `"proof-of-everything"` — "verified" is a self-declaration plus one non-empty string.
 */
export class CutValidityReport {
    private constructor(private state: CutValidityBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): CutValidityReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected cut validity report text");
        }
        return invoke(() => new CutValidityReport(wasm().CutValidityReport.fromJson(json)));
    }
    private raw(): CutValidityBinding {
        if (!this.state) throw new OspfError("Disposed", "cut validity report has been disposed");
        return this.state;
    }
    /** cut 条数 / The cut count. */
    cutCount(): number { return invoke(() => this.raw().cutCount()); }
    /** 第 `position` 条是否被接受 / Whether cut `position` was accepted. */
    acceptedAt(position: number): boolean { return invoke(() => this.raw().acceptedAt(position)); }
    /** 第 `position` 条的错误 / The error of cut `position`. */
    errorAt(position: number): string | undefined { return invoke(() => this.raw().errorAt(position)); }
    /** 第 `position` 条的有效性 / The validity of cut `position`. */
    validityAt(position: number): string | undefined {
        return invoke(() => this.raw().validityAt(position));
    }
    /** 第 `position` 条的证明状态 / The proof status of cut `position`. */
    proofStatusAt(position: number): string | undefined {
        return invoke(() => this.raw().proofStatusAt(position));
    }
    /** 第 `position` 条的证明引用 / The proof reference of cut `position`. */
    proofReferenceAt(position: number): string | undefined {
        return invoke(() => this.raw().proofReferenceAt(position));
    }
    /** 第 `position` 条的 `expressionKey` / The `expressionKey` of cut `position`. */
    expressionKeyAt(position: number): string | undefined {
        return invoke(() => this.raw().expressionKeyAt(position));
    }
    /** 前两条的 `expressionKey` 是否相同 / Whether the first two share an `expressionKey`. */
    sameExpressionKey(): boolean | undefined {
        return invoke(() => this.raw().sameExpressionKey());
    }
    /** 前两条是否 `==` / Whether the first two are `==`. */
    equal(): boolean | undefined { return invoke(() => this.raw().equal()); }
    /** `local` 从不被拒 / Whether `local` is never refused. */
    localIsNeverRefused(): boolean { return invoke(() => this.raw().localIsNeverRefused()); }
    /** `normalize()` 原样保留两者 / Whether `normalize()` keeps both verbatim. */
    normalizeKeepsThem(): boolean { return invoke(() => this.raw().normalizeKeepsThem()); }
    /** key 看不见两者 / Whether the key ignores both. */
    theKeyIgnoresThem(): boolean { return invoke(() => this.raw().theKeyIgnoresThem()); }
    /** `==` 看得见两者 / Whether `==` sees both. */
    equalitySeesThem(): boolean { return invoke(() => this.raw().equalitySeesThem()); }
    /** `verifiedGlobal` 钉住三样 / Whether `verifiedGlobal` pins three fields. */
    verifiedGlobalPinsThreeFields(): boolean {
        return invoke(() => this.raw().verifiedGlobalPinsThreeFields());
    }
    /** `verified` 必须有非空引用 / Whether `verified` requires a non-blank reference. */
    verifiedRequiresAReference(): boolean {
        return invoke(() => this.raw().verifiedRequiresAReference());
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 赋值字面量（TS 可直接表达）。 / An assignment literal TS can express. */
export type AssignLiteral =
    | { kind: "null" }
    | { kind: "boolean"; value: boolean }
    | { kind: "number"; value: number }
    | { kind: "text"; value: string };

/** 一步赋值。 / One assignment step. */
export interface AssignStep {
    path: string;
    /** `value` / `null` / `expression`。 */
    kind?: string;
    value?: AssignLiteral;
}

/** 更新赋值组合请求。 / The assignment-composition request. */
export interface AssignmentCompositionRequest {
    steps?: AssignStep[];
    /** 逐条试的路径（量三种校验强度）。 / The paths to try one by one (three strengths). */
    paths?: string[];
    /** `of` 的分段（量不做校验）。 / The segments for `of` (missing validation). */
    segments?: string[];
}

/**
 * 更新赋值集合的组合语义与属性路径的**三种校验强度**
 * （续挖 `persistence/expression/update_assignment.rs` + `math/symbol/expression/property_path.rs`）。
 *
 * 1. **`then` 是 FIFO 追加，`+` 与它等价**（`theOrderIsFifoAndAddMatchesThen()`）。
 * 2. **同一路径不被合并**（`theSamePathIsNotMerged()`）：两条 `x` 都在——"后写覆盖前写"是**执行层**的事。
 * 3. **`{path: "x", kind: "null"}` 与 `{path: "x", kind: "value", value: {kind: "null"}}` 是两个不同变体**
 *    （`nullValueAndSetNullDiffer()`）：`set-null`（值种类 `none`）与 `set-value`（值种类 `null`）**不相等**，
 *    虽然语义上都是置空。
 * 4. **属性路径三种校验强度**（`threeValidationStrengths()`）：`fromNewAt()` **完全不校验**（原样留）、
 *    `fromParseAt()` **只 trim**、`parsedAt()`（`tryParse`）才要求每段都是合法标识符。
 * 5. **`of` 不校验分段**（`ofDoesNotValidateSegments()`）：`["a", "", "b"]` 直接得到 `"a..b"`。
 * 6. **空白路径是"没有分段"**（`aBlankPathHasNoSegments()`）：`parse("   ")` 得到空路径、段向量为空。
 * 7. **标识符判定是 Unicode 的**（`identifiersAreUnicodeAware()`）：`"名字"` 合法，`"1name"`／`"na-me"` 不合法。
 *
 * The combinator semantics of update assignments and the **three validation strengths** of a property path (continuation).
 * **`then` appends FIFO and `+` matches it** (`theOrderIsFifoAndAddMatchesThen()`). **The same path is never merged**
 * (`theSamePathIsNotMerged()`): both `x` entries stay — "last write wins" belongs to the **execution** layer. **A `set-null`
 * step and a `set-value` step carrying the literal `null` are two different variants**
 * (`nullValueAndSetNullDiffer()`): `set-null` (value kind `none`) and `set-value` (value kind `null`) are **not equal**.
 * **Three path validation strengths** (`threeValidationStrengths()`): `fromNewAt()` **validates nothing**, `fromParseAt()`
 * **only trims**, and only `parsedAt()` (`tryParse`) demands valid identifiers per segment. **`of` skips segment validation**
 * (`ofDoesNotValidateSegments()`). **A blank path has no segments** (`aBlankPathHasNoSegments()`). And **identifier rules are
 * Unicode-aware** (`identifiersAreUnicodeAware()`).
 */
export class AssignmentCompositionReport {
    private constructor(private state: AssignmentCompositionBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): AssignmentCompositionReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected assignment composition report text");
        }
        return invoke(() => new AssignmentCompositionReport(
            wasm().AssignmentCompositionReport.fromJson(json)));
    }
    private raw(): AssignmentCompositionBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "assignment composition report has been disposed");
        }
        return this.state;
    }
    /** 赋值项条数 / The assignment-item count. */
    itemCount(): number { return invoke(() => this.raw().itemCount()); }
    /** 第 `position` 条的路径 / The path at `position`. */
    pathAt(position: number): string { return invoke(() => this.raw().pathAt(position)); }
    /** 第 `position` 条的变体 / The variant at `position`. */
    variantAt(position: number): string { return invoke(() => this.raw().variantAt(position)); }
    /** 第 `position` 条的值种类 / The value kind at `position`. */
    valueKindAt(position: number): string { return invoke(() => this.raw().valueKindAt(position)); }
    /** 集合是否为空 / Whether the set is empty. */
    empty(): boolean { return invoke(() => this.raw().empty()); }
    /** 空集合追加空集合之后是否仍为空 / Whether an empty set stays empty. */
    emptyAfterThen(): boolean { return invoke(() => this.raw().emptyAfterThen()); }
    /** 路径条数 / The path count. */
    pathCount(): number { return invoke(() => this.raw().pathCount()); }
    /** 第 `position` 条路径的原文本 / The raw text at `position`. */
    rawAt(position: number): string { return invoke(() => this.raw().rawAt(position)); }
    /** 第 `position` 条路径的 `new` 结果 / The `new` result at `position`. */
    fromNewAt(position: number): string { return invoke(() => this.raw().fromNewAt(position)); }
    /** 第 `position` 条路径的 `parse` 结果 / The `parse` result at `position`. */
    fromParseAt(position: number): string { return invoke(() => this.raw().fromParseAt(position)); }
    /** 第 `position` 条路径的 `tryParse` 是否成功 / Whether `tryParse` succeeded. */
    parsedAt(position: number): boolean { return invoke(() => this.raw().parsedAt(position)); }
    /** 第 `position` 条路径的段数 / The segment count at `position`. */
    segmentCountAt(position: number): number {
        return invoke(() => this.raw().segmentCountAt(position));
    }
    /** 第 `position` 条路径第 `segment` 段 / Segment `segment` at `position`. */
    segmentAt(position: number, segment: number): string {
        return invoke(() => this.raw().segmentAt(position, segment));
    }
    /** `of` 拼出来的路径 / The path `of` produced. */
    ofPath(): string { return invoke(() => this.raw().ofPath()); }
    /** `of` 的段数 / The `of` segment count. */
    ofSegmentCount(): number { return invoke(() => this.raw().ofSegmentCount()); }
    /** `of` 的第 `segment` 段 / Segment `segment` of the `of` path. */
    ofSegmentAt(segment: number): string { return invoke(() => this.raw().ofSegmentAt(segment)); }
    /** 顺序是 FIFO 且 `+` 等价于 `then` / Whether the order is FIFO and `+` matches `then`. */
    theOrderIsFifoAndAddMatchesThen(): boolean {
        return invoke(() => this.raw().theOrderIsFifoAndAddMatchesThen());
    }
    /** 同一路径不被合并 / Whether the same path is left unmerged. */
    theSamePathIsNotMerged(): boolean { return invoke(() => this.raw().theSamePathIsNotMerged()); }
    /** `setNull` 与 `set(_, null)` 不同 / Whether `setNull` and `set(_, null)` differ. */
    nullValueAndSetNullDiffer(): boolean {
        return invoke(() => this.raw().nullValueAndSetNullDiffer());
    }
    /** 三种校验强度 / Whether the three validation strengths hold. */
    threeValidationStrengths(): boolean { return invoke(() => this.raw().threeValidationStrengths()); }
    /** `of` 不校验分段 / Whether `of` skips segment validation. */
    ofDoesNotValidateSegments(): boolean { return invoke(() => this.raw().ofDoesNotValidateSegments()); }
    /** 空白路径没有分段 / Whether a blank path has no segments. */
    aBlankPathHasNoSegments(): boolean { return invoke(() => this.raw().aBlankPathHasNoSegments()); }
    /** 标识符判定是 Unicode 的 / Whether identifier rules are Unicode-aware. */
    identifiersAreUnicodeAware(): boolean {
        return invoke(() => this.raw().identifiersAreUnicodeAware());
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个固定变量。 / One fixed variable. */
export interface FixedVariableSpec {
    index: number;
    value: number;
}

/** 一次转储选项的字面量。 / One dump-options literal. */
export interface DumpOptionsSpec {
    concurrent?: boolean;
    /** `withBounds` 的取值；缺省不动。 / The `withBounds` value; absent leaves it alone. */
    includeBounds?: boolean;
    /** `withForceBounds` 的取值；缺省不动。 / The `withForceBounds` value; absent leaves it alone. */
    forceBounds?: boolean;
    /** 先逐条 `withFixedVariable`。 / The `withFixedVariable` calls, in order. */
    fixedVariables?: FixedVariableSpec[];
    /** 之后一次 `withFixedVariables`（**整表替换**）。 / A single `withFixedVariables` afterwards (**replaces** the map). */
    replacedVariables?: FixedVariableSpec[];
    /** 最后是否 `withoutFixedVariables`。 / Whether `withoutFixedVariables` runs last. */
    clearVariables?: boolean;
}

/**
 * 中间模型的转储选项（续挖 `model/intermediate/lp_export.rs`）。真正导出文件要走 `LPExportableModel` + `fs`，
 * 那是 I/O 边界；`DumpOptions` 与 `ModelFileFormat` 是**纯数据**，而且默认值与建构器语义有明显空档。
 *
 * 1. **默认值是 `{concurrent: false, includeBounds: true, forceBounds: true}`**（`defaultsAreMeasured()`）——
 *    **"强制输出默认边界"默认就是开的**，也就是默认会写更多信息，不是更少。
 * 2. **`withBounds` 与 `withForceBounds` 是两个独立开关**（`theTwoBoundSwitchesAreIndependent()`）：
 *    "不输出边界"同时"强制输出默认边界"这种矛盾组合**完全可表示**，本层不做一致性校验。
 * 3. **`withFixedVariable` 是 map 插入**（`fixedVariableInsertsAreLastWriteWins()`）：同一 index 后来居上。
 * 4. **`withFixedVariables` 是整表替换、不是合并**（`withFixedVariablesReplacesTheWholeMap()`）：
 *    先前 `withFixedVariable` 加的那条会被**丢掉**。
 * 5. **`withoutFixedVariables` 只清 map**（`withoutFixedVariablesClearsOnlyTheMap()`）：三个布尔开关原样保留。
 * 6. **扩展名只有 `lp` 与 `opm` 两个小写值**（`theExtensionsAreLowercase()`），与 `Debug` 里的变体名无关。
 * 7. **`new()` 与 `default()` 相同**（`newEqualsDefault()`）。
 *
 * The intermediate-model dump options (continuation). **The defaults are `{concurrent: false, includeBounds: true,
 * forceBounds: true}`** (`defaultsAreMeasured()`) — forcing default bounds is on by default. **`withBounds` and
 * `withForceBounds` are independent switches** (`theTwoBoundSwitchesAreIndependent()`), so the contradictory pair "do not emit
 * bounds" plus "force default bounds" is representable and never cross-checked here. **`withFixedVariable` is a map insert**
 * (`fixedVariableInsertsAreLastWriteWins()`). **`withFixedVariables` replaces the whole map instead of merging**
 * (`withFixedVariablesReplacesTheWholeMap()`), dropping earlier entries. **`withoutFixedVariables` clears only the map**
 * (`withoutFixedVariablesClearsOnlyTheMap()`). **There are only two lowercase extensions** (`theExtensionsAreLowercase()`).
 * And **`new()` equals `default()`** (`newEqualsDefault()`).
 */
export class DumpOptionsReport {
    private constructor(private state: DumpOptionsBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): DumpOptionsReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected dump options report text");
        }
        return invoke(() => new DumpOptionsReport(wasm().DumpOptionsReport.fromJson(json)));
    }
    private raw(): DumpOptionsBinding {
        if (!this.state) throw new OspfError("Disposed", "dump options report has been disposed");
        return this.state;
    }
    /** 最终 `concurrent` / The final `concurrent`. */
    concurrent(): boolean { return invoke(() => this.raw().concurrent()); }
    /** 最终 `includeBounds` / The final `includeBounds`. */
    includeBounds(): boolean { return invoke(() => this.raw().includeBounds()); }
    /** 最终 `forceBounds` / The final `forceBounds`. */
    forceBounds(): boolean { return invoke(() => this.raw().forceBounds()); }
    /** 固定变量条数 / The fixed-variable count. */
    fixedCount(): number { return invoke(() => this.raw().fixedCount()); }
    /** 固定变量 index 条数 / The fixed index count. */
    fixedIndexCount(): number { return invoke(() => this.raw().fixedIndexCount()); }
    /** 第 `position` 个 index / The index at `position`. */
    fixedIndexAt(position: number): number { return invoke(() => this.raw().fixedIndexAt(position)); }
    /** 第 `position` 个固定值 / The fixed value at `position`. */
    fixedValueAt(position: number): number { return invoke(() => this.raw().fixedValueAt(position)); }
    /** 默认 `concurrent` / The default `concurrent`. */
    defaultConcurrent(): boolean { return invoke(() => this.raw().defaultConcurrent()); }
    /** 默认 `includeBounds` / The default `includeBounds`. */
    defaultIncludeBounds(): boolean { return invoke(() => this.raw().defaultIncludeBounds()); }
    /** 默认 `forceBounds` / The default `forceBounds`. */
    defaultForceBounds(): boolean { return invoke(() => this.raw().defaultForceBounds()); }
    /** 扩展名条数 / The extension count. */
    extensionCount(): number { return invoke(() => this.raw().extensionCount()); }
    /** 第 `position` 个扩展名 / The extension at `position`. */
    extensionAt(position: number): string { return invoke(() => this.raw().extensionAt(position)); }
    /** 默认值就是那三个 / Whether the defaults are exactly those three. */
    theDefaultsAreMeasured(): boolean { return invoke(() => this.raw().theDefaultsAreMeasured()); }
    /** 两个边界开关互相独立 / Whether the two bound switches are independent. */
    theTwoBoundSwitchesAreIndependent(): boolean {
        return invoke(() => this.raw().theTwoBoundSwitchesAreIndependent());
    }
    /** 同 index 后来居上 / Whether the same index is last-write-wins. */
    fixedVariableInsertsAreLastWriteWins(): boolean {
        return invoke(() => this.raw().fixedVariableInsertsAreLastWriteWins());
    }
    /** `withFixedVariables` 整表替换 / Whether `withFixedVariables` replaces the map. */
    withFixedVariablesReplacesTheWholeMap(): boolean {
        return invoke(() => this.raw().withFixedVariablesReplacesTheWholeMap());
    }
    /** `withoutFixedVariables` 只清 map / Whether `withoutFixedVariables` clears only the map. */
    withoutFixedVariablesClearsOnlyTheMap(): boolean {
        return invoke(() => this.raw().withoutFixedVariablesClearsOnlyTheMap());
    }
    /** 扩展名是小写二值 / Whether the extensions are two lowercase values. */
    theExtensionsAreLowercase(): boolean {
        return invoke(() => this.raw().theExtensionsAreLowercase());
    }
    /** `new()` 与 `default()` 相同 / Whether `new()` equals `default()`. */
    newEqualsDefault(): boolean { return invoke(() => this.raw().newEqualsDefault()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条写入记录的字面量。 / One write-record literal. */
export interface WriteRecordSpec {
    writer: string;
    schema: string;
    /** 指纹；缺省表示记录没写指纹。 / The fingerprint; absent means none. */
    fingerprint?: string;
    function?: string;
}

/** 当前结构的字面量。 / The current structure's literal. */
export interface NativeStructureSpec {
    /** 当前结构的指纹；缺省表示没有。 / The fingerprint; absent means none. */
    fingerprint?: string;
    functionName?: string;
}

/** 一个结果的字面量。 / One outcome literal. */
export interface OutcomeSpec {
    /** `native` 或 `fallback`。 */
    kind: string;
    /** `no-writer` / `rejected` / `writer-failed`。 */
    reason?: string;
    message?: string;
}

/** 原生写入面请求。 / The native-write surface request. */
export interface NativeWriteScopeRequest {
    records?: WriteRecordSpec[];
    structure?: NativeStructureSpec;
    outcomes?: OutcomeSpec[];
    /** 报告里的 `nativeWrites`（**不校验**）。 / The report's `nativeWrites` (**not cross-checked**). */
    nativeWrites?: number;
    /** 报告里的 `materializedFallbacks`（**不校验**）。 / The report's `materializedFallbacks` (**not checked**). */
    materializedFallbacks?: number;
}

/**
 * 原生写入记录与 lowering 报告（续挖 `model/intermediate/native_writer.rs` 与
 * `deferred_function.rs::verify_native_write`）。
 *
 * 1. **`isNative()` 与 `requiresFallback()` 精确互补**（`theTwoPredicatesAreComplementary()`）。
 * 2. **空报告两边都是 `false`**（`anEmptyReportSaysNeither()`）：`outcomes` 为空时 `fullyNative()` 是 `false`
 *    （它要求非空），`hasFallbacks()` 也是 `false`——"没事可做"既不算全原生也不算有回退。
 * 3. **`fullyNative()` 只看 `materializedFallbacks == 0`**（`fullyNativeIgnoresTheOutcomes()`）：
 *    `outcomes` 全是 `fallback`、但计数写 `0` 的报告**照样回答 `true`**——两个计数字段是调用方填的，
 *    本层**不校验它们与 `outcomes` 一致**。
 * 4. **`hasFallbacks()` 同样只看计数**（`hasFallbacksIgnoresTheOutcomes()`）。
 * 5. **`NativeWriteRecord::new` 的记录永远匹配不上**（`aFreshRecordNeverMatches()`）：它把指纹留成 `null`，
 *    而匹配要求**两侧都存在且相等**。
 * 6. **指纹两侧缺一不可**（`bothFingerprintsMustBePresent()`）：记录没指纹或当前结构没指纹都 `false`，
 *    所以"没有指纹"与"指纹不同"在结论上**无法区分**。
 * 7. **函数名不参与匹配**（`theFunctionNameIsNotPartOfTheMatch()`）：换 `function` 之后仍匹配；
 *    `FallbackReason` 的三种变体（`no-writer` / `rejected` / `writer-failed`）也因此互不相等。
 *
 * Native write records and the lowering report (continuation). **`isNative()` and `requiresFallback()` are exact complements**
 * (`theTwoPredicatesAreComplementary()`). **An empty report answers neither** (`anEmptyReportSaysNeither()`).
 * **`fullyNative()` reads only `materializedFallbacks == 0`** (`fullyNativeIgnoresTheOutcomes()`): a report whose outcomes are
 * all `fallback` while the counter says `0` **still answers `true`**, because both counters are caller-supplied and **never
 * cross-checked against the outcomes**. **`hasFallbacks()` likewise reads only the counter**
 * (`hasFallbacksIgnoresTheOutcomes()`). **A record made by `NativeWriteRecord::new` never matches**
 * (`aFreshRecordNeverMatches()`): it leaves the fingerprint `null` while matching demands **both sides present and equal**.
 * **Both fingerprints are required** (`bothFingerprintsMustBePresent()`), so "no fingerprint" and "different fingerprint" are
 * **indistinguishable**. And **the function name is not part of the match** (`theFunctionNameIsNotPartOfTheMatch()`).
 */
export class NativeWriteScopeReport {
    private constructor(private state: NativeWriteScopeBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): NativeWriteScopeReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected native write scope report text");
        }
        return invoke(() => new NativeWriteScopeReport(
            wasm().NativeWriteScopeReport.fromJson(json)));
    }
    private raw(): NativeWriteScopeBinding {
        if (!this.state) throw new OspfError("Disposed", "native write scope report has been disposed");
        return this.state;
    }
    /** 记录条数 / The record count. */
    recordCount(): number { return invoke(() => this.raw().recordCount()); }
    /** 第 `position` 条记录是否匹配 / Whether record `position` matches. */
    matchesAt(position: number): boolean { return invoke(() => this.raw().matchesAt(position)); }
    /** 结果条数 / The outcome count. */
    outcomeCount(): number { return invoke(() => this.raw().outcomeCount()); }
    /** 第 `position` 条结果的原因名 / The reason name at `position`. */
    reasonAt(position: number): string | undefined { return invoke(() => this.raw().reasonAt(position)); }
    /** 第 `position` 条是否原生 / Whether outcome `position` is native. */
    isNativeAt(position: number): boolean { return invoke(() => this.raw().isNativeAt(position)); }
    /** 第 `position` 条是否必须物化 fallback / Whether outcome `position` requires the fallback. */
    requiresFallbackAt(position: number): boolean {
        return invoke(() => this.raw().requiresFallbackAt(position));
    }
    /** 报告里的 `isFullyNative()` / The report's `isFullyNative()`. */
    fullyNative(): boolean { return invoke(() => this.raw().fullyNative()); }
    /** 报告里的 `hasFallbacks()` / The report's `hasFallbacks()`. */
    hasFallbacks(): boolean { return invoke(() => this.raw().hasFallbacks()); }
    /** 两个谓词精确互补 / Whether the two predicates are complements. */
    theTwoPredicatesAreComplementary(): boolean {
        return invoke(() => this.raw().theTwoPredicatesAreComplementary());
    }
    /** 空报告两边都是 false / Whether an empty report says neither. */
    anEmptyReportSaysNeither(): boolean { return invoke(() => this.raw().anEmptyReportSaysNeither()); }
    /** `fullyNative()` 只看计数 / Whether `fullyNative()` reads only the counter. */
    fullyNativeIgnoresTheOutcomes(): boolean {
        return invoke(() => this.raw().fullyNativeIgnoresTheOutcomes());
    }
    /** `hasFallbacks()` 只看计数 / Whether `hasFallbacks()` reads only the counter. */
    hasFallbacksIgnoresTheOutcomes(): boolean {
        return invoke(() => this.raw().hasFallbacksIgnoresTheOutcomes());
    }
    /** `new` 的记录永远匹配不上 / Whether a fresh record never matches. */
    aFreshRecordNeverMatches(): boolean { return invoke(() => this.raw().aFreshRecordNeverMatches()); }
    /** 指纹两侧缺一不可 / Whether both fingerprints are required. */
    bothFingerprintsMustBePresent(): boolean {
        return invoke(() => this.raw().bothFingerprintsMustBePresent());
    }
    /** 函数名不参与匹配 / Whether the function name is out of the match. */
    theFunctionNameIsNotPartOfTheMatch(): boolean {
        return invoke(() => this.raw().theFunctionNameIsNotPartOfTheMatch());
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个 writer 的字面量。 / One writer literal. */
export interface WriterSpec {
    name: string;
    /** 它声明支持的函数名。 / The function names it claims. */
    claims?: string[];
    /** `native` / `skip` / `fail` / `short` / `long`。 */
    mode?: string;
}

/** 注册表请求。 / The registry request. */
export interface WriterRegistryRequest {
    writers?: WriterSpec[];
    structures?: string[];
}

/**
 * 原生写入器注册表的**调度契约**（续挖 `model/intermediate/native_writer.rs` 的
 * `NativeFunctionWriterRegistry`）。文档写了六条契约，这里逐条实测：
 *
 * 1. **先注册的 writer 先决定**（`registrationOrderDecides()`）：两个 writer 都声明支持同一结构时，
 *    结果属于**先注册**那个——调度是**顺序优先**，不是"最合适优先"。
 * 2. **被前面决定的结构不再进入后续批次**（`decidedStructuresLeaveTheBatch()`）：后注册者的
 *    `callsAt()` 是 **0**，它一次都没被调用。
 * 3. **没有可处理结构的 writer 被整体跳过**（`anEmptyBatchSkipsTheWriter()`）。
 * 4. **返回条目数与批次大小不符立即失败**（`aLengthMismatchFailsImmediately()`）：消息同时带 writer 名
 *    与"batch sizes must match"，避免静默丢结构。
 * 5. **任一 writer 返回错误就整体失败**（`aWriterErrorPropagates()`），不保留半写状态。
 * 6. **`skip` 不是回退**（`aSkipIsNotAFallback()`）：主动跳过会把结构**交给后续 writer**；
 *    只有遍历结束仍没人认领，才按 `no-writer` 走进通用 fallback。
 * 7. **`names` 按注册序且不去重**（`namesAreInOrderAndNotDeduped()`）：同名可注册两次；空注册表则每个
 *    结构都得到 `no-writer`。
 *
 * The native writer registry's **scheduling contract** (continuation). **The first registered writer decides first**
 * (`registrationOrderDecides()`): scheduling is **order-first**, not best-match-first. **Structures already decided leave the
 * batch** (`decidedStructuresLeaveTheBatch()`): the later writer's `callsAt()` is **0**. **A writer with nothing to handle is
 * skipped** (`anEmptyBatchSkipsTheWriter()`). **An outcome count that differs from the batch size fails immediately**
 * (`aLengthMismatchFailsImmediately()`) with the writer name and "batch sizes must match" in the message. **Any writer error
 * fails the whole call** (`aWriterErrorPropagates()`) with no half-written state. **A `skip` is not a fallback**
 * (`aSkipIsNotAFallback()`): it hands the batch to **later writers**, and only a structure nobody claims ends as `no-writer`.
 * And **`names` keep registration order without dedupe** (`namesAreInOrderAndNotDeduped()`).
 */
export class WriterRegistryReport {
    private constructor(private state: WriterRegistryBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): WriterRegistryReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected writer registry report text");
        }
        return invoke(() => new WriterRegistryReport(wasm().WriterRegistryReport.fromJson(json)));
    }
    private raw(): WriterRegistryBinding {
        if (!this.state) throw new OspfError("Disposed", "writer registry report has been disposed");
        return this.state;
    }
    /** 名字条数 / The name count. */
    nameCount(): number { return invoke(() => this.raw().nameCount()); }
    /** 第 `position` 个名字 / The name at `position`. */
    nameAt(position: number): string { return invoke(() => this.raw().nameAt(position)); }
    /** 第 `position` 个 writer 的调用次数 / The call count at `position`. */
    callsAt(position: number): number { return invoke(() => this.raw().callsAt(position)); }
    /** 去向条数 / The destination count. */
    destinationCount(): number { return invoke(() => this.raw().destinationCount()); }
    /** 第 `position` 条去向的函数名 / The function name at `position`. */
    functionAt(position: number): string { return invoke(() => this.raw().functionAt(position)); }
    /** 第 `position` 条去向的种类 / The destination kind at `position`. */
    destinationKindAt(position: number): string {
        return invoke(() => this.raw().destinationKindAt(position));
    }
    /** 第 `position` 条去向的 writer / The writer at `position`. */
    writerAt(position: number): string | undefined { return invoke(() => this.raw().writerAt(position)); }
    /** 第 `position` 条去向的 fallback 原因 / The fallback reason at `position`. */
    reasonAt(position: number): string | undefined { return invoke(() => this.raw().reasonAt(position)); }
    /** 是否失败 / Whether the call failed. */
    failed(): boolean { return invoke(() => this.raw().failed()); }
    /** 失败消息 / The failure message. */
    errorMessage(): string | undefined { return invoke(() => this.raw().error()); }
    /** 注册表是否为空 / Whether the registry is empty. */
    empty(): boolean { return invoke(() => this.raw().empty()); }
    /** 先注册先决定 / Whether registration order decides. */
    registrationOrderDecides(): boolean { return invoke(() => this.raw().registrationOrderDecides()); }
    /** 已决定的结构离开批次 / Whether decided structures leave the batch. */
    decidedStructuresLeaveTheBatch(): boolean {
        return invoke(() => this.raw().decidedStructuresLeaveTheBatch());
    }
    /** 空批次跳过 writer / Whether an empty batch skips the writer. */
    anEmptyBatchSkipsTheWriter(): boolean {
        return invoke(() => this.raw().anEmptyBatchSkipsTheWriter());
    }
    /** 条数不符立即失败 / Whether a length mismatch fails immediately. */
    aLengthMismatchFailsImmediately(): boolean {
        return invoke(() => this.raw().aLengthMismatchFailsImmediately());
    }
    /** writer 错误向外传播 / Whether a writer error propagates. */
    aWriterErrorPropagates(): boolean { return invoke(() => this.raw().aWriterErrorPropagates()); }
    /** 跳过不是回退 / Whether a skip is not a fallback. */
    aSkipIsNotAFallback(): boolean { return invoke(() => this.raw().aSkipIsNotAFallback()); }
    /** 名字按注册序且不去重 / Whether names keep order without dedupe. */
    namesAreInOrderAndNotDeduped(): boolean {
        return invoke(() => this.raw().namesAreInOrderAndNotDeduped());
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条候选的字面量。 / One candidate literal. */
export interface CandidateEntrySpec {
    id: string;
    /** `A` / `B` / `C` / `UNCLASSIFIED`。 */
    tier?: string;
    /** `ACTIVE` / `NEARLY_ACTIVE` / `INACTIVE` / `SATISFIED_WITHOUT_SLACK_METRIC` / `VIOLATED` / `UNKNOWN`。 */
    activity?: string;
    dualValue?: number;
    slack?: number;
    group?: string;
}

/** 短名单请求。 / The shortlist request. */
export interface ShortlistRequest {
    candidates?: CandidateEntrySpec[];
    limit?: number;
    /** 是否先 `validate()`。 / Whether to call `validate()` first. */
    validate?: boolean;
    dualThreshold?: number;
}

/**
 * 候选漏斗的**昂贵分析短名单**（续挖 `analysis/pipeline.rs` 的 `CandidateFunnelRanking::shortlist`
 * / `validate` / `CandidateTier`）。
 *
 * 1. **只有 `A` 与 `B` 默认进短名单**（`onlyAAndBAreDefault()`）。
 * 2. **低层不是被永久丢弃**（`lowerTiersFillTheRemainingSlots()`）：名额够时 `C` 与 `UNCLASSIFIED`
 *    会被**追加**，只是排在 A/B 之后。
 * 3. **`shortlist(0)` 是空**（`aZeroLimitReturnsNothing()`）。
 * 4. **大名额返回全部，但顺序会变**（`aLargeLimitReturnsEverythingButRegroups()`）：A/B 被**稳定分区**
 *    提到 C/UNCLASSIFIED 之前——所以它虽然不排序，却会重排。
 * 5. **`shortlist()` 从不按 priority 排序**（`theShortlistNeverSorts()`）：它只是"过滤 + 截断 + 分层分组"，
 *    **"优先级"完全靠调用方保证**。
 * 6. **`validate()` 才要求 priority 稠密且等于位置**（`prioritiesMustBeDenseAndPositional()`）：跳号、
 *    乱序、重复 ID 都被拒。所以乱序输入**过不了 `validate()` 但过得了 `shortlist()`**。
 * 7. **分层需要证据**（`tiersRequireEvidence()`）：`A` 的 `|dual|` 必须**严格大于**阈值（等于被拒）、
 *    `B` 必须 `<=` 阈值、`C` 必须**不是 active**——而 `is_active()` 只认 `ACTIVE`，
 *    所以 `NEARLY_ACTIVE` 可以被判成 `C`。
 *
 * The candidate funnel's **shortlist** (continuation). **Only `A` and `B` are defaults** (`onlyAAndBAreDefault()`).
 * **Lower tiers are not dropped** (`lowerTiersFillTheRemainingSlots()`). **`shortlist(0)` is empty**
 * (`aZeroLimitReturnsNothing()`). **A large limit returns everything while changing the order**
 * (`aLargeLimitReturnsEverythingButRegroups()`): A/B are **stably partitioned** ahead of C/UNCLASSIFIED, so although it never
 * sorts, it does regroup. **`shortlist()` never sorts by priority** (`theShortlistNeverSorts()`): it only filters, truncates
 * and groups, so **priority is the caller's responsibility**. **Only `validate()` demands dense positional priorities**
 * (`prioritiesMustBeDenseAndPositional()`), so disordered input **fails `validate()` but passes `shortlist()`**. And **a tier
 * requires evidence** (`tiersRequireEvidence()`): `A` needs `|dual|` strictly above the threshold, `B` at or below it, and `C`
 * **not active** — while `is_active()` accepts only `ACTIVE`, so `NEARLY_ACTIVE` may be classified `C`.
 */
export class ShortlistReport {
    private constructor(private state: ShortlistBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): ShortlistReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected shortlist report text");
        }
        return invoke(() => new ShortlistReport(wasm().ShortlistReport.fromJson(json)));
    }
    private raw(): ShortlistBinding {
        if (!this.state) throw new OspfError("Disposed", "shortlist report has been disposed");
        return this.state;
    }
    /** `validate()` 是否通过（未调用时为 `undefined`）/ Whether `validate()` passed. */
    validated(): boolean | undefined { return invoke(() => this.raw().validated()); }
    /** `validate()` 的失败消息 / The `validate()` failure message. */
    errorMessage(): string | undefined { return invoke(() => this.raw().error()); }
    /** 短名单条数 / The shortlist length. */
    shortlistCount(): number { return invoke(() => this.raw().shortlistCount()); }
    /** 第 `position` 个约束 ID / The constraint ID at `position`. */
    idAt(position: number): string { return invoke(() => this.raw().idAt(position)); }
    /** 第 `position` 个分层名 / The tier name at `position`. */
    tierAt(position: number): string { return invoke(() => this.raw().tierAt(position)); }
    /** 第 `position` 个 priority / The priority at `position`. */
    priorityAt(position: number): number { return invoke(() => this.raw().priorityAt(position)); }
    /** 只有 A/B 默认进短名单 / Whether only A/B are defaults. */
    onlyAAndBAreDefault(): boolean { return invoke(() => this.raw().onlyAAndBAreDefault()); }
    /** 低层填剩余名额 / Whether lower tiers fill the remaining slots. */
    lowerTiersFillTheRemainingSlots(): boolean {
        return invoke(() => this.raw().lowerTiersFillTheRemainingSlots());
    }
    /** `shortlist(0)` 是空 / Whether `shortlist(0)` is empty. */
    aZeroLimitReturnsNothing(): boolean { return invoke(() => this.raw().aZeroLimitReturnsNothing()); }
    /** 大名额返回全部但会分组 / Whether a large limit regroups. */
    aLargeLimitReturnsEverythingButRegroups(): boolean {
        return invoke(() => this.raw().aLargeLimitReturnsEverythingButRegroups());
    }
    /** `shortlist()` 从不按 priority 排序 / Whether `shortlist()` never sorts by priority. */
    theShortlistNeverSorts(): boolean { return invoke(() => this.raw().theShortlistNeverSorts()); }
    /** priority 必须稠密且等于位置 / Whether priorities must be dense and positional. */
    prioritiesMustBeDenseAndPositional(): boolean {
        return invoke(() => this.raw().prioritiesMustBeDenseAndPositional());
    }
    /** 分层需要证据 / Whether a tier requires evidence. */
    tiersRequireEvidence(): boolean { return invoke(() => this.raw().tiersRequireEvidence()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 惰性上下文请求。 / The lazy-context request. */
export interface LazyInitRequest {
    /** 第一次 `init` 的标签。 / The label of the first `init`. */
    first?: number;
    /** 第二次 `init` 的标签。 / The label of the second `init`. */
    second?: number;
    /** 是否在读取之前调用 `init`。 / Whether to call `init` before reading. */
    initialize?: boolean;
}

/**
 * 惰性平展上下文的**初始化语义**（续挖 `model/flatten/lazy_context.rs` 的三个
 * `Lazy*FlattenContext`）。
 *
 * 1. **`init` 先到先得**（`initIsFirstWins()`）：底层是 `OnceLock::set`，**第二次 `init` 被静默忽略**，
 *    不报错、不覆盖、也不告警。
 * 2. **`new()` 与 `Default` 都未初始化**（`newAndDefaultAreUninitialized()`）。
 * 3. **未初始化就调 `token_list()` 会 panic**（`tokenListPanicsBeforeInit()`）：消息是
 *    "FlattenContext not initialized. Call init() first."——**安全入口是 `token_list_ref()`**。
 * 4. **三个惰性上下文（linear / quadratic / canonical）语义一致**（`theThreeContextsShareIt()`）。
 * 5. **只有 linear 能安全读回列表**（`onlyTheLinearContextCanReadTheListBack()`）：`token_list_ref()`
 *    只在 `LazyLinearFlattenContext` 上存在，另两个只能走**会 panic** 的 `token_list()`。
 * 6. **`is_initialized()` 与 `token_list_ref().is_some()` 永远一致**（`theFlagAgreesWithTheReference()`）。
 * 7. **三类缓存首查为空**（`theCachesStartEmpty()`）：上下文不预置任何内容。
 *
 * The lazy flatten context's **initialization semantics** (continuation). **`init` is first-wins** (`initIsFirstWins()`):
 * `OnceLock::set` underneath, so **a second `init` is silently ignored** — no error, no overwrite, no warning. **`new()` and
 * `Default` are both uninitialized** (`newAndDefaultAreUninitialized()`). **Reading `token_list()` before init panics**
 * (`tokenListPanicsBeforeInit()`), with "FlattenContext not initialized. Call init() first." — the **safe entry point is
 * `token_list_ref()`**. **The three lazy contexts share this** (`theThreeContextsShareIt()`). **Only the linear context reads the
 * list back safely** (`onlyTheLinearContextCanReadTheListBack()`). **`is_initialized()` always agrees with
 * `token_list_ref().is_some()`** (`theFlagAgreesWithTheReference()`). And **all three caches start empty**
 * (`theCachesStartEmpty()`).
 */
export class LazyInitReport {
    private constructor(private state: LazyInitBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): LazyInitReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected lazy init report text");
        }
        return invoke(() => new LazyInitReport(wasm().LazyInitReport.fromJson(json)));
    }
    private raw(): LazyInitBinding {
        if (!this.state) throw new OspfError("Disposed", "lazy init report has been disposed");
        return this.state;
    }
    /** 是否 panic / Whether reading panicked. */
    panicked(): boolean { return invoke(() => this.raw().panicked()); }
    /** panic 消息 / The panic message. */
    panicMessage(): string | undefined { return invoke(() => this.raw().panicMessage()); }
    /** 是否已初始化 / Whether the context is initialized. */
    initialized(): boolean { return invoke(() => this.raw().initialized()); }
    /** `token_list_ref()` 的标签 / The label read back. */
    label(): number | undefined { return invoke(() => this.raw().label()); }
    /** 未初始化时引用为 `undefined` / Whether the reference was `undefined`. */
    referenceIsNone(): boolean { return invoke(() => this.raw().referenceIsNone()); }
    /** 第 `position` 类缓存的条数 / The cache count at `position`. */
    cacheCountAt(position: number): number { return invoke(() => this.raw().cacheCountAt(position)); }
    /** `init` 先到先得 / Whether `init` is first-wins. */
    initIsFirstWins(): boolean { return invoke(() => this.raw().initIsFirstWins()); }
    /** `new()`/`Default` 都未初始化 / Whether both start uninitialized. */
    newAndDefaultAreUninitialized(): boolean {
        return invoke(() => this.raw().newAndDefaultAreUninitialized());
    }
    /** 未初始化读 `token_list()` 会 panic / Whether reading before init panics. */
    tokenListPanicsBeforeInit(): boolean { return invoke(() => this.raw().tokenListPanicsBeforeInit()); }
    /** 三个上下文语义一致 / Whether the three contexts share the semantics. */
    theThreeContextsShareIt(): boolean { return invoke(() => this.raw().theThreeContextsShareIt()); }
    /** 只有 linear 能安全读回 / Whether only the linear context reads back safely. */
    onlyTheLinearContextCanReadTheListBack(): boolean {
        return invoke(() => this.raw().onlyTheLinearContextCanReadTheListBack());
    }
    /** 标志与引用一致 / Whether the flag agrees with the reference. */
    theFlagAgreesWithTheReference(): boolean {
        return invoke(() => this.raw().theFlagAgreesWithTheReference());
    }
    /** 三类缓存首查为空 / Whether the three caches start empty. */
    theCachesStartEmpty(): boolean { return invoke(() => this.raw().theCachesStartEmpty()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 批量导出请求。 / The batch export request. */
export interface DumpBatchRequest {
    /** `LP` 或 `OPM`。 / `LP` or `OPM`. */
    format?: string;
    /** 条目数（1..=8）。 / The number of entries (1..=8). */
    count?: number;
    concurrent?: boolean;
    includeBounds?: boolean;
    /** 第二个条目是否指向不存在的目录。 / Whether entry two targets a missing directory. */
    failSecond?: boolean;
}

/**
 * 批量导出的**分派与并发语义**（续挖 `model/intermediate/lp_export.rs` 的
 * `dump_lp_batch` / `dump_opm_batch` / `dump_batch` / `LPExportableModel`）。
 *
 * 1. **`concurrent` 只改调度，不改结果**（`concurrentMatchesSerial()`）：串行与并发写出的文件**逐字节相同**。
 * 2. **单条目永远走串行**（`aSingleEntryIsAlwaysSerial()`）：代码里显式判断 `jobs.len() <= 1`。
 * 3. **`OPM` 完全忽略转储选项**（`opmIgnoresTheDumpOptions()`）：`write_opm` → `to_opm_string()`
 *    **没有 options 参数**。改 `includeBounds` 会改 LP 内容、**不改 OPM 内容**。
 * 4. **错误消息带路径**（`errorsCarryThePath()`）：`failed to dump \`<path>\``。
 * 5. **失败不回滚**（`aFailureLeavesEarlierFilesBehind()`）：前一条已经写下。
 * 6. **并发下错误仍向外传播**（`concurrentErrorsPropagate()`）。
 * 7. **格式与文件后缀无关**（`theFormatIgnoresTheExtension()`）：`LP` 写进 `.opm` 后缀照样是 LP 内容。
 *
 * Batch export's **dispatch and concurrency semantics** (continuation). **`concurrent` only changes scheduling**
 * (`concurrentMatchesSerial()`): serial and concurrent runs write **byte-identical** files. **A single entry is always serial**
 * (`aSingleEntryIsAlwaysSerial()`). **`OPM` ignores the dump options entirely** (`opmIgnoresTheDumpOptions()`):
 * `to_opm_string()` takes **no options parameter**, so changing `includeBounds` changes LP content only. **Error messages
 * carry the path** (`errorsCarryThePath()`). **A failure rolls nothing back** (`aFailureLeavesEarlierFilesBehind()`). **Errors
 * propagate under concurrency too** (`concurrentErrorsPropagate()`). And **the format is independent of the extension**
 * (`theFormatIgnoresTheExtension()`).
 */
export class DumpBatchReport {
    private constructor(private state: DumpBatchBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): DumpBatchReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected dump batch report text");
        }
        return invoke(() => new DumpBatchReport(wasm().DumpBatchReport.fromJson(json)));
    }
    private raw(): DumpBatchBinding {
        if (!this.state) throw new OspfError("Disposed", "dump batch report has been disposed");
        return this.state;
    }
    /** 是否失败 / Whether the batch failed. */
    failed(): boolean { return invoke(() => this.raw().failed()); }
    /** 失败消息 / The failure message. */
    errorMessage(): string | undefined { return invoke(() => this.raw().error()); }
    /** 文件条数 / The file count. */
    fileCount(): number { return invoke(() => this.raw().fileCount()); }
    /** 第 `position` 个文件名 / The file name at `position`. */
    fileNameAt(position: number): string { return invoke(() => this.raw().fileNameAt(position)); }
    /** 第 `position` 个文件的字数 / The file content length at `position`. */
    fileBytesAt(position: number): number { return invoke(() => this.raw().fileBytesAt(position)); }
    /** 第 `position` 个文件的内容 / The file content at `position`. */
    fileContentAt(position: number): string {
        return invoke(() => this.raw().fileContentAt(position));
    }
    /** 失败后仍留下的文件条数 / The leftover count. */
    leftoverCount(): number { return invoke(() => this.raw().leftoverCount()); }
    /** 第 `position` 个残留文件名 / The leftover name at `position`. */
    leftoverAt(position: number): string { return invoke(() => this.raw().leftoverAt(position)); }
    /** `concurrent` 只改调度 / Whether `concurrent` only changes scheduling. */
    concurrentMatchesSerial(): boolean { return invoke(() => this.raw().concurrentMatchesSerial()); }
    /** 单条目永远串行 / Whether a single entry is always serial. */
    aSingleEntryIsAlwaysSerial(): boolean {
        return invoke(() => this.raw().aSingleEntryIsAlwaysSerial());
    }
    /** `OPM` 忽略转储选项 / Whether `OPM` ignores the dump options. */
    opmIgnoresTheDumpOptions(): boolean { return invoke(() => this.raw().opmIgnoresTheDumpOptions()); }
    /** 错误带路径 / Whether errors carry the path. */
    errorsCarryThePath(): boolean { return invoke(() => this.raw().errorsCarryThePath()); }
    /** 失败不回滚 / Whether a failure leaves earlier files. */
    aFailureLeavesEarlierFilesBehind(): boolean {
        return invoke(() => this.raw().aFailureLeavesEarlierFilesBehind());
    }
    /** 并发错误仍传播 / Whether concurrent errors propagate. */
    concurrentErrorsPropagate(): boolean {
        return invoke(() => this.raw().concurrentErrorsPropagate());
    }
    /** 格式与后缀无关 / Whether the format ignores the extension. */
    theFormatIgnoresTheExtension(): boolean {
        return invoke(() => this.raw().theFormatIgnoresTheExtension());
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 弹性构建请求。 / The elastic-builder request. */
export interface QuadraticElasticRequest {
    /** 罚项（缺省用构建器自己的 1000）。 / The penalty (defaults to the builder's own 1000). */
    penalty?: number;
    /** `linear_constraints` 开关。 / The `linear_constraints` switch. */
    linearConstraints?: boolean;
    /** 线性约束行数（1..=4）。 / The number of linear rows (1..=4). */
    rows?: number;
}

/**
 * 二次弹性构建器的**开关语义**（续挖 `model/intermediate/elastic.rs` 的 `QuadraticElasticBuilder`）。
 *
 * 1. **只有线性行被弹性化，每行一个松弛**（`oneSlackPerLinearRow()`）：变量数 = 原变量数 + 行数，
 *    二次约束数不变。
 * 2. **关掉开关就不加任何松弛**（`disablingAddsNoSlack()`）。
 * 3. **关掉开关连目标方向都不动**（`disablingKeepsTheObjectiveCategory()`）：开着时 `objectiveCategory`
 *    被强制成 `Minimum`，关掉时保持原值（例如 `Maximum`）——早退发生在改方向之前。
 * 4. **罚项进目标且后写覆盖**（`thePenaltyIsLastWriteWinsAndEntersTheObjective()`）。
 * 5. **松弛只有负部一侧**（`slacksOnlyHaveTheNegativeSide()`）：每行只加**一个**松弛、系数 `-1.0`、
 *    界 `[0, +inf)`——`>=` 与等式行的另一侧没有松弛，弹性化是**单侧**的。
 * 6. **默认罚项是 1000**（`theDefaultPenaltyIsOneThousand()`）。
 * 7. **关掉开关时 `c` 仍被 resize**（`disablingStillResizesTheObjective()`）：`c.resize` 写在早退之前，
 *    所以人为截短的 `c` 依然被补齐；原模型本身不被修改（`finish()` 在 clone 上做）。
 *
 * The quadratic elastic builder's **switch semantics** (continuation). **Only linear rows are elasticized, one slack per row**
 * (`oneSlackPerLinearRow()`). **Disabling adds no slack** (`disablingAddsNoSlack()`). **Disabling leaves even the objective
 * direction alone** (`disablingKeepsTheObjectiveCategory()`): on, it is forced to `Minimum`; off, it keeps `Maximum`, because
 * the early return precedes the direction change. **The penalty enters the objective and is last-write-wins**
 * (`thePenaltyIsLastWriteWinsAndEntersTheObjective()`). **Slacks only have the negative side**
 * (`slacksOnlyHaveTheNegativeSide()`): one slack per row with coefficient `-1.0` and bounds `[0, +inf)`, so a `>=` or
 * equality row has no slack on the other side and elasticization is **one-sided**. **The default penalty is 1000**
 * (`theDefaultPenaltyIsOneThousand()`). And **`c` is resized even when disabled** (`disablingStillResizesTheObjective()`),
 * while the source model stays untouched.
 */
export class QuadraticElasticReport {
    private constructor(private state: QuadraticElasticBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): QuadraticElasticReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected quadratic elastic report text");
        }
        return invoke(() => new QuadraticElasticReport(wasm().QuadraticElasticReport.fromJson(json)));
    }
    private raw(): QuadraticElasticBinding {
        if (!this.state) throw new OspfError("Disposed", "quadratic elastic report has been disposed");
        return this.state;
    }
    variablesBefore(): number { return invoke(() => this.raw().variablesBefore()); }
    variablesAfter(): number { return invoke(() => this.raw().variablesAfter()); }
    constraintsBefore(): number { return invoke(() => this.raw().constraintsBefore()); }
    constraintsAfter(): number { return invoke(() => this.raw().constraintsAfter()); }
    quadraticConstraints(): number { return invoke(() => this.raw().quadraticConstraints()); }
    /** 目标向量条数 / The objective length. */
    objectiveCount(): number { return invoke(() => this.raw().objectiveCount()); }
    /** 第 `position` 个目标系数 / The objective coefficient at `position`. */
    objectiveAt(position: number): number { return invoke(() => this.raw().objectiveAt(position)); }
    /** 构建后的目标方向 / The direction after building. */
    objectiveCategory(): string { return invoke(() => this.raw().objectiveCategory()); }
    /** 原模型的目标方向 / The source model's direction. */
    sourceObjectiveCategory(): string { return invoke(() => this.raw().sourceObjectiveCategory()); }
    /** 追加变量条数 / The appended variable count. */
    slackCount(): number { return invoke(() => this.raw().slackCount()); }
    /** 第 `position` 个追加变量的 group id / The group ID at `position`. */
    slackGroupAt(position: number): number { return invoke(() => this.raw().slackGroupAt(position)); }
    /** 首行追加的松弛系数 / The appended slack coefficient. */
    slackCoefficient(): number | undefined { return invoke(() => this.raw().slackCoefficient()); }
    /** 每行一个松弛 / Whether each row gets one slack. */
    oneSlackPerLinearRow(): boolean { return invoke(() => this.raw().oneSlackPerLinearRow()); }
    /** 关掉开关不加松弛 / Whether disabling adds no slack. */
    disablingAddsNoSlack(): boolean { return invoke(() => this.raw().disablingAddsNoSlack()); }
    /** 关掉开关连方向都不动 / Whether disabling keeps the direction. */
    disablingKeepsTheObjectiveCategory(): boolean {
        return invoke(() => this.raw().disablingKeepsTheObjectiveCategory());
    }
    /** 罚项进目标且后写覆盖 / Whether the penalty enters the objective. */
    thePenaltyIsLastWriteWinsAndEntersTheObjective(): boolean {
        return invoke(() => this.raw().thePenaltyIsLastWriteWinsAndEntersTheObjective());
    }
    /** 松弛只有负部一侧 / Whether slacks only have the negative side. */
    slacksOnlyHaveTheNegativeSide(): boolean {
        return invoke(() => this.raw().slacksOnlyHaveTheNegativeSide());
    }
    /** 默认罚项是 1000 / Whether the default penalty is 1000. */
    theDefaultPenaltyIsOneThousand(): boolean {
        return invoke(() => this.raw().theDefaultPenaltyIsOneThousand());
    }
    /** 关掉开关时 `c` 仍被 resize / Whether `c` is resized even when disabled. */
    disablingStillResizesTheObjective(): boolean {
        return invoke(() => this.raw().disablingStillResizesTheObjective());
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条稳定值。 / One stable value. */
export interface StableValueEntry {
    id: string;
    value: number;
}

/** 取值请求。 / The value request. */
export interface StableValueRequest {
    stableValues?: StableValueEntry[];
    /** 报告是否携带解。 / Whether the report carries a solution. */
    hasSolution?: boolean;
    /** 请求的 ID（缺省取第一条稳定值）。 / The requested ID. */
    requested?: string;
    /** 绑定里的 ID。 / The IDs in the binding. */
    binding?: string[];
}

/**
 * 稳定 ID 取值器的**契约**（续挖 `solver/logic_based_benders_context.rs` 的
 * `LogicBasedBendersSolutionExtractor::stable_value`）。
 *
 * 1. **先 `validate()` 再查表**（`validateRunsBeforeTheLookup()`）：给一份"不可行却带解"的报告并请求一个
 *    **确实存在**的 ID，拿到的是校验错误而不是那个值。
 * 2. **"没有解"与"没有这个 ID"共用一条消息**（`aMissingSolutionAndAMissingIdShareOneMessage()`）：
 *    两者都是 `solution is missing stable variable <id>`，**调用方无法区分**。
 * 3. **消息带 ID 原文**（`theMessageCarriesTheId()`）。
 * 4. **值原样返回**（`theValueIsReturnedVerbatim()`）：不舍入、不做整性检查——整数绑定上取到 `2.5` 也照给。
 * 5. **`0.0` 不是"缺失"**（`aZeroValueIsStillReturned()`）。
 * 6. **ID 精确匹配**（`idsAreMatchedExactly()`）：`" x"` / `"X"` 都不是 `"x"`，不 trim、不折大小写。
 * 7. **它完全不看绑定**（`itIgnoresTheBinding()`）：绑定外的 ID 只要报告里有值就返回成功——所以
 *    "取值成功"**不证明**该变量属于 master。
 *
 * The stable-ID value extractor's **contract** (continuation). **`validate()` runs before the lookup**
 * (`validateRunsBeforeTheLookup()`): an infeasible report carrying an incumbent answers with the validation error, not the
 * value. **"No solution" and "no such ID" share one message** (`aMissingSolutionAndAMissingIdShareOneMessage()`), so the caller
 * **cannot tell them apart**. **The message carries the ID verbatim** (`theMessageCarriesTheId()`). **The value is returned
 * verbatim** (`theValueIsReturnedVerbatim()`): a `2.5` on an integer binding comes straight back. **`0.0` is not missing**
 * (`aZeroValueIsStillReturned()`). **IDs match exactly** (`idsAreMatchedExactly()`): no trimming and no case folding. And **the
 * binding is never consulted** (`itIgnoresTheBinding()`), so a successful lookup **does not prove** the variable belongs to the
 * master.
 */
export class StableValueReport {
    private constructor(private state: StableValueBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): StableValueReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected stable value report text");
        }
        return invoke(() => new StableValueReport(wasm().StableValueReport.fromJson(json)));
    }
    private raw(): StableValueBinding {
        if (!this.state) throw new OspfError("Disposed", "stable value report has been disposed");
        return this.state;
    }
    /** 取到的值 / The value. */
    value(): number | undefined { return invoke(() => this.raw().value()); }
    /** 失败消息 / The failure message. */
    errorMessage(): string | undefined { return invoke(() => this.raw().error()); }
    /** 请求的 ID / The requested ID. */
    requested(): string | undefined { return invoke(() => this.raw().requested()); }
    /** 先 `validate()` 再查表 / Whether `validate()` runs first. */
    validateRunsBeforeTheLookup(): boolean {
        return invoke(() => this.raw().validateRunsBeforeTheLookup());
    }
    /** 缺解与缺 ID 共用一条消息 / Whether both failures share one message. */
    aMissingSolutionAndAMissingIdShareOneMessage(): boolean {
        return invoke(() => this.raw().aMissingSolutionAndAMissingIdShareOneMessage());
    }
    /** 消息带 ID 原文 / Whether the message carries the ID. */
    theMessageCarriesTheId(): boolean { return invoke(() => this.raw().theMessageCarriesTheId()); }
    /** 值原样返回 / Whether the value is returned verbatim. */
    theValueIsReturnedVerbatim(): boolean {
        return invoke(() => this.raw().theValueIsReturnedVerbatim());
    }
    /** `0.0` 不是缺失 / Whether `0.0` counts as present. */
    aZeroValueIsStillReturned(): boolean {
        return invoke(() => this.raw().aZeroValueIsStillReturned());
    }
    /** ID 精确匹配 / Whether IDs match exactly. */
    idsAreMatchedExactly(): boolean { return invoke(() => this.raw().idsAreMatchedExactly()); }
    /** 它完全不看绑定 / Whether the binding is ignored. */
    itIgnoresTheBinding(): boolean { return invoke(() => this.raw().itIgnoresTheBinding()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一道 master 变量。 / One master variable. */
export interface MasterAssignmentVariableSpec {
    id: string;
    value: number;
    /** `integer` 或 `binary`。 / `integer` or `binary`. */
    domain?: string;
    lower?: number;
    upper?: number;
}

/** 提取请求。 / The extraction request. */
export interface MasterAssignmentRequest {
    variables?: MasterAssignmentVariableSpec[];
    /** `optimal` / `feasible`。 */
    status?: string;
    /** 整性容差（缺省 1e-7，与桥接层一致）。 / The integrality tolerance. */
    tolerance?: number;
}

/**
 * master 赋值提取的**容差与范围**语义（续挖 `solver/logic_based_benders.rs` 的
 * `MasterAssignment::from_report`）。桥接层的 `extractMasterAssignment` 把容差**硬编码成 `1e-7`**，
 * 所以这个入口只有在框架层直接绑才能量到。
 *
 * 1. **只接受最优报告**（`onlyOptimalReportsAreAccepted()`）：可解但无最优证明的 `feasible` 也被拒。
 * 2. **容差必须有限且非负**（`theToleranceMustBeFiniteAndNonNegative()`）。
 * 3. **舍入是 `round()` 的"半数远离零"**（`roundingIsHalfAwayFromZero()`）：`2.5 → 3`、`3.5 → 4`，
 *    而 **`-2.5 → -3`**——既不是银行家舍入，也不是"半上入"。
 * 4. **容差是绝对差**（`theToleranceIsAnAbsoluteDifference()`）：**恰好等于容差通过**，略超即拒。
 * 5. **两道范围闸**（`thereAreTwoRangeGates()`）：`1e19` 撞 `i64` 闸、`1e17`（`> 2^53`）撞精确整数闸，
 *    两者文案不同。
 * 6. **域检查看舍入后的值**（`theDomainCheckSeesTheRoundedValue()`）：域 `0..10` 里 `10.4→10` 通过、
 *    `10.6→11` 被拒。
 * 7. **缺 ID 的文案点名最优报告**（`aMissingIdSaysOptimalMasterReport()`）：
 *    `optimal master report is missing stable variable <id>`。
 *
 * The master-assignment extraction's **tolerance and range** semantics (continuation). The bridge wrapper hard-codes the
 * tolerance to **`1e-7`**, so this entry point is only measurable by binding the framework layer directly. **Only optimal
 * reports are accepted** (`onlyOptimalReportsAreAccepted()`). **The tolerance must be finite and non-negative**
 * (`theToleranceMustBeFiniteAndNonNegative()`). **Rounding is `round()`, half away from zero**
 * (`roundingIsHalfAwayFromZero()`): `2.5 → 3`, `3.5 → 4` and **`-2.5 → -3`** — neither banker's rounding nor half-up. **The
 * tolerance is an absolute difference** (`theToleranceIsAnAbsoluteDifference()`): an exact match passes and a slight excess is
 * refused. **There are two range gates** (`thereAreTwoRangeGates()`): `1e19` hits the `i64` gate while `1e17` (above `2^53`)
 * hits the exact-integer gate. **The domain check sees the rounded value** (`theDomainCheckSeesTheRoundedValue()`). And **a
 * missing ID names the optimal report** (`aMissingIdSaysOptimalMasterReport()`).
 */
export class MasterAssignmentReport {
    private constructor(private state: MasterAssignmentBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): MasterAssignmentReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected master assignment report text");
        }
        return invoke(() => new MasterAssignmentReport(wasm().MasterAssignmentReport.fromJson(json)));
    }
    private raw(): MasterAssignmentBinding {
        if (!this.state) throw new OspfError("Disposed", "master assignment report has been disposed");
        return this.state;
    }
    /** 失败消息 / The failure message. */
    errorMessage(): string | undefined { return invoke(() => this.raw().error()); }
    /** 赋值条数 / The assignment length. */
    assignedCount(): number { return invoke(() => this.raw().assignedCount()); }
    /** 第 `position` 个变量 ID / The variable ID at `position`. */
    idAt(position: number): string { return invoke(() => this.raw().idAt(position)); }
    /** 第 `position` 个值 / The value at `position`. */
    valueAt(position: number): number { return invoke(() => this.raw().valueAt(position)); }
    /** 只接受最优报告 / Whether only optimal reports are accepted. */
    onlyOptimalReportsAreAccepted(): boolean {
        return invoke(() => this.raw().onlyOptimalReportsAreAccepted());
    }
    /** 容差必须有限且非负 / Whether the tolerance must be finite and non-negative. */
    theToleranceMustBeFiniteAndNonNegative(): boolean {
        return invoke(() => this.raw().theToleranceMustBeFiniteAndNonNegative());
    }
    /** 舍入是半数远离零 / Whether rounding is half away from zero. */
    roundingIsHalfAwayFromZero(): boolean {
        return invoke(() => this.raw().roundingIsHalfAwayFromZero());
    }
    /** 容差是绝对差 / Whether the tolerance is an absolute difference. */
    theToleranceIsAnAbsoluteDifference(): boolean {
        return invoke(() => this.raw().theToleranceIsAnAbsoluteDifference());
    }
    /** 两道范围闸 / Whether there are two range gates. */
    thereAreTwoRangeGates(): boolean { return invoke(() => this.raw().thereAreTwoRangeGates()); }
    /** 域检查看舍入后的值 / Whether the domain check sees the rounded value. */
    theDomainCheckSeesTheRoundedValue(): boolean {
        return invoke(() => this.raw().theDomainCheckSeesTheRoundedValue());
    }
    /** 缺 ID 的文案点名最优报告 / Whether a missing ID names the optimal report. */
    aMissingIdSaysOptimalMasterReport(): boolean {
        return invoke(() => this.raw().aMissingIdSaysOptimalMasterReport());
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个稀疏条目。 / One sparse entry. */
export interface SparseEntrySpec {
    index: number;
    value: number;
}

/** 一个界设置。 / One bound assignment. */
export interface SparseBoundsSpec {
    index: number;
    lower: number;
    upper: number;
}

/** 稀疏三角模型探针请求。 / The sparse triad probe request. */
export interface SparseTriadRequest {
    entries?: SparseEntrySpec[];
    /** 是否加两个同 ID 变量。 / Whether to add two variables with the same ID. */
    duplicateVariable?: boolean;
    constraintRows?: number;
    setBounds?: SparseBoundsSpec;
}

/**
 * 稀疏三角模型的**手写语义**（续挖 `model/intermediate/basic_linear_triad_model.rs` 的 `SparseVector` /
 * `BasicLinearTriadModel`）。桥接层一直**用**这两个结构（`compileLinear`、弹性构建器），但从没单独量过它们：
 *
 * 1. **`add` 从不合并、也不剔除零**（`addNeverMergesOrDropsZeros()`）：重复索引与 `0.0` 都原样留在表里，
 *    `entryCount()` 是 **entries 条数**，不是非零元个数。
 * 2. **没有边界的 token 会变成无穷界**（`aTokenWithoutBoundsBecomesInfinite()`）：`addVariable` 用
 *    `lower_bound().unwrap_or(NEG_INFINITY)`，默认拿到 `-inf..inf`。
 * 3. **显式界完全覆盖 token 的界**（`explicitBoundsOverrideTheToken()`）。
 * 4. **重复 ID 只覆盖索引**（`aDuplicateIdOverwritesTheIndexOnly()`）：变量数 +1，但 `firstIndex()` 指向
 *    **后加的那个**——先加的只能按索引访问。
 * 5. **行名默认 `c{行号}`**（`constraintNamesDefaultToC()`）。
 * 6. **`setBounds` 接受空域**（`setBoundsAcceptsAnEmptyDomain()`）：`lb > ub` 不报错，`lowerAt/upperAt`
 *    原样返回 `5` / `1`。
 * 7. **越界 `setBounds` 静默忽略**（`setBoundsOutOfRangeIsSilentlyIgnored()`）：不 panic、不改值，
 *    而 `missingIndex()` 与越界 `getBounds` 都是 `undefined`。
 *
 * 界以**文本**返回（无穷写成 `-inf` / `inf`），因为非有限 `f64` 不能跨 JSON。
 *
 * The sparse triad model's **hand-written semantics** (continuation). **`add` never merges and never drops zeros**
 * (`addNeverMergesOrDropsZeros()`): `entryCount()` counts **entries**, not non-zeros. **A token without bounds becomes
 * unbounded** (`aTokenWithoutBoundsBecomesInfinite()`). **Explicit bounds fully override the token's**
 * (`explicitBoundsOverrideTheToken()`). **A duplicate ID only overwrites the index**
 * (`aDuplicateIdOverwritesTheIndexOnly()`), so the earlier copy is reachable only by index. **Row names default to
 * `c{index}`** (`constraintNamesDefaultToC()`). **`setBounds` accepts an empty domain**
 * (`setBoundsAcceptsAnEmptyDomain()`). And **an out-of-range `setBounds` is silently ignored**
 * (`setBoundsOutOfRangeIsSilentlyIgnored()`), while missed lookups are `undefined`. Bounds come back as **text**
 * (`-inf` / `inf`) because a non-finite `f64` cannot cross JSON.
 */
export class SparseTriadReport {
    private constructor(private state: SparseTriadBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): SparseTriadReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected sparse triad report text");
        }
        return invoke(() => new SparseTriadReport(wasm().SparseTriadReport.fromJson(json)));
    }
    private raw(): SparseTriadBinding {
        if (!this.state) throw new OspfError("Disposed", "sparse triad report has been disposed");
        return this.state;
    }
    /** 稀疏行 entries 条数 / The entry count. */
    entryCount(): number { return invoke(() => this.raw().entryCount()); }
    /** 第 `position` 个 entry 的索引 / The entry index at `position`. */
    entryIndexAt(position: number): number {
        return invoke(() => this.raw().entryIndexAt(position));
    }
    /** 变量数 / The variable count. */
    variables(): number { return invoke(() => this.raw().variables()); }
    /** 行名条数 / The row count. */
    constraintCount(): number { return invoke(() => this.raw().constraintCount()); }
    /** 第 `position` 个行名 / The row name at `position`. */
    constraintNameAt(position: number): string {
        return invoke(() => this.raw().constraintNameAt(position));
    }
    /** 第 `position` 个变量的下界文本 / The lower bound text at `position`. */
    lowerAt(position: number): string { return invoke(() => this.raw().lowerAt(position)); }
    /** 第 `position` 个变量的上界文本 / The upper bound text at `position`. */
    upperAt(position: number): string { return invoke(() => this.raw().upperAt(position)); }
    /** 按 ID 查到的索引 / The index found by ID. */
    firstIndex(): number | undefined { return invoke(() => this.raw().firstIndex()); }
    /** 缺失 ID 的查询结果 / The missing-ID lookup. */
    missingIndex(): number | undefined { return invoke(() => this.raw().missingIndex()); }
    /** `add` 从不合并、也不剔除零 / Whether `add` never merges or drops zeros. */
    addNeverMergesOrDropsZeros(): boolean {
        return invoke(() => this.raw().addNeverMergesOrDropsZeros());
    }
    /** 无边界的 token 变成无穷界 / Whether a boundless token becomes unbounded. */
    aTokenWithoutBoundsBecomesInfinite(): boolean {
        return invoke(() => this.raw().aTokenWithoutBoundsBecomesInfinite());
    }
    /** 显式界覆盖 token 的界 / Whether explicit bounds override the token's. */
    explicitBoundsOverrideTheToken(): boolean {
        return invoke(() => this.raw().explicitBoundsOverrideTheToken());
    }
    /** 重复 ID 只覆盖索引 / Whether a duplicate ID only overwrites the index. */
    aDuplicateIdOverwritesTheIndexOnly(): boolean {
        return invoke(() => this.raw().aDuplicateIdOverwritesTheIndexOnly());
    }
    /** 行名默认 `c{行号}` / Whether row names default to `c{index}`. */
    constraintNamesDefaultToC(): boolean {
        return invoke(() => this.raw().constraintNamesDefaultToC());
    }
    /** `setBounds` 接受空域 / Whether `setBounds` accepts an empty domain. */
    setBoundsAcceptsAnEmptyDomain(): boolean {
        return invoke(() => this.raw().setBoundsAcceptsAnEmptyDomain());
    }
    /** 越界 `setBounds` 静默忽略 / Whether an out-of-range `setBounds` is ignored. */
    setBoundsOutOfRangeIsSilentlyIgnored(): boolean {
        return invoke(() => this.raw().setBoundsOutOfRangeIsSilentlyIgnored());
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个稀疏条目。 / One sparse entry. */
export interface MatrixEntrySpec {
    index: number;
    value: number;
}

/** 一行。 / One row. */
export interface MatrixRowSpec {
    entries?: MatrixEntrySpec[];
}

/** 行与元数据请求。 / The rows-and-metadata request. */
export interface MatrixRowsRequest {
    rows?: MatrixRowSpec[];
    /** 是否走 `addConstraintWithMetadata`。 / Whether to go through `addConstraintWithMetadata`. */
    withMetadata?: boolean;
}

/**
 * 约束行与元数据的**锁步语义**（续挖 `model/intermediate/basic_linear_triad_model.rs` 的 `SparseMatrix` /
 * `add_constraint*` / `clone_constraints`）。
 *
 * 1. **`addRow` 不做任何校验**（`addRowValidatesNothing()`）：不同宽度、重复索引、空行都照收——稀疏矩阵
 *    根本没有"列宽"概念。
 * 2. **`addConstraintWithMetadata` 让八个平行向量同时 +1**（`theEightVectorsMoveTogether()`）。
 * 3. **`numConstraints()` 只读 `b`**（`numConstraintsReadsOnlyB()`）：直接 `A.addRow` 而不 push `b`，
 *    会出现 **`A.rows() > numConstraints()`** 的不一致状态，且**没有任何报错**。
 * 4. **`addConstraint` 只填行名**（`addConstraintOnlyFillsTheName()`）：其余元数据是 `null` / `false` / `0`。
 * 5. **行 entries 原样保留顺序**（`theRowKeepsItsEntryOrder()`）：不排序、不合并。
 * 6. **`getRow` 越界返回 `undefined`**（`getRowIsBoundsChecked()`）。
 * 7. **`cloneConstraints` 是深拷贝**（`cloneConstraintsIsDeep()`）：改克隆里的行不影响原模型。
 *
 * The **lockstep semantics** of constraint rows and metadata (continuation). **`addRow` validates nothing**
 * (`addRowValidatesNothing()`): differing widths, repeated indices and empty rows are accepted. **`addConstraintWithMetadata`
 * moves eight parallel vectors together** (`theEightVectorsMoveTogether()`). **`numConstraints()` reads only `b`**
 * (`numConstraintsReadsOnlyB()`): a raw `A.addRow` leaves **`A.rows() > numConstraints()`** with **no error at all**.
 * **`addConstraint` fills only the row name** (`addConstraintOnlyFillsTheName()`). **A row keeps its entry order**
 * (`theRowKeepsItsEntryOrder()`). **`getRow` is bounds checked** (`getRowIsBoundsChecked()`). And **`cloneConstraints` is a
 * deep copy** (`cloneConstraintsIsDeep()`).
 */
export class MatrixRowsReport {
    private constructor(private state: MatrixRowsBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): MatrixRowsReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected matrix rows report text");
        }
        return invoke(() => new MatrixRowsReport(wasm().MatrixRowsReport.fromJson(json)));
    }
    private raw(): MatrixRowsBinding {
        if (!this.state) throw new OspfError("Disposed", "matrix rows report has been disposed");
        return this.state;
    }
    /** `A.rows()` / `A.rows()`. */
    matrixRows(): number { return invoke(() => this.raw().matrixRows()); }
    /** `numConstraints()` / `numConstraints()`. */
    numConstraints(): number { return invoke(() => this.raw().numConstraints()); }
    /** 第 `position` 个平行向量的长度 / The parallel vector length at `position`. */
    parallelLengthAt(position: number): number {
        return invoke(() => this.raw().parallelLengthAt(position));
    }
    /** 第一行条目条数 / The first row's entry count. */
    firstRowCount(): number { return invoke(() => this.raw().firstRowCount()); }
    /** 第一行第 `position` 个索引 / The first row's index at `position`. */
    firstRowIndexAt(position: number): number {
        return invoke(() => this.raw().firstRowIndexAt(position));
    }
    /** `getRow` 越界返回 `undefined` / Whether `getRow` returned `undefined` out of range. */
    getRowOutOfRangeIsNone(): boolean { return invoke(() => this.raw().getRowOutOfRangeIsNone()); }
    /** `addRow` 不做任何校验 / Whether `addRow` validates nothing. */
    addRowValidatesNothing(): boolean { return invoke(() => this.raw().addRowValidatesNothing()); }
    /** 八个平行向量同时 +1 / Whether the eight vectors move together. */
    theEightVectorsMoveTogether(): boolean {
        return invoke(() => this.raw().theEightVectorsMoveTogether());
    }
    /** `numConstraints` 只读 `b` / Whether `numConstraints` reads only `b`. */
    numConstraintsReadsOnlyB(): boolean {
        return invoke(() => this.raw().numConstraintsReadsOnlyB());
    }
    /** `addConstraint` 只填行名 / Whether `addConstraint` fills only the name. */
    addConstraintOnlyFillsTheName(): boolean {
        return invoke(() => this.raw().addConstraintOnlyFillsTheName());
    }
    /** 行 entries 保持输入顺序 / Whether the row keeps its entry order. */
    theRowKeepsItsEntryOrder(): boolean {
        return invoke(() => this.raw().theRowKeepsItsEntryOrder());
    }
    /** `getRow` 有界检查 / Whether `getRow` is bounds checked. */
    getRowIsBoundsChecked(): boolean { return invoke(() => this.raw().getRowIsBoundsChecked()); }
    /** `cloneConstraints` 是深拷贝 / Whether `cloneConstraints` is deep. */
    cloneConstraintsIsDeep(): boolean { return invoke(() => this.raw().cloneConstraintsIsDeep()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个线性单项式字面量。 / One linear monomial literal. */
export interface PolynomialTermSpec {
    coefficient: number;
    varIndex: number;
}

/** 多项式探针请求。 / The polynomial probe request. */
export interface PolynomialProbeRequest {
    terms?: PolynomialTermSpec[];
    /** 常数项（同时用作 `zero` / `constant` 的参数）。 / The constant term. */
    constant?: number;
    /** 是否覆盖常数项。 / Whether to overwrite the constant term. */
    overwriteConstant?: boolean;
    /** 是否把第一个系数改成这个值。 / Whether to rewrite the first coefficient. */
    rewriteFirstCoefficient?: number;
}

/**
 * 线性/二次多项式的**结构变更语义**（续挖 `model/flatten/inner_box.rs` 的 `Linear` / `Quadratic` /
 * `LinearMonomial`）。
 *
 * 1. **`addMonomial` 纯追加，不合并同变量**（`addMonomialIsPureAppend()`）：同一 `varIndex` 加两次就是
 *    两个条目，`monomialCount()` 为 2。
 * 2. **`zero(z)` 与 `constant(z)` 只差参数名**（`zeroAndConstantAreTheSameShape()`）：两者都是
 *    "零单项式 + 常数项 = 传入值"，所以 `zero(5)` 的常数项是 **`"5"`**，不是 `"0"`。
 * 3. **`isConstantOnly` 与 `isEmpty` 完全同义**（`isConstantOnlyEqualsIsEmpty()`）：都只看单项式列表是否为空，
 *    **不看常数项是否为 0**。
 * 4. **`setConstantTerm` 直接覆盖**（`setConstantTermOverwrites()`）。
 * 5. **`setCoefficient` 就地改系数**（`setCoefficientMutatesInPlace()`）：`varIndex` 不变。
 * 6. **`fromLinear` 逐条搬运并保留顺序与系数**（`fromLinearPreservesOrderAndCoefficients()`）。
 * 7. **`fromLinear` 产出的都是 `Linear` kind**（`fromLinearYieldsLinearKind()`）：`varIndex2` 全为
 *    `undefined`。
 *
 * 系数与常数以**文本**返回（非有限值写成 `nan` / `inf` / `-inf`），因为非有限 `f64` 不能跨 JSON。
 *
 * The **structural mutation semantics** of the linear and quadratic polynomials (continuation). **`addMonomial` is pure
 * append** (`addMonomialIsPureAppend()`). **`zero(z)` and `constant(z)` differ only in the parameter name**
 * (`zeroAndConstantAreTheSameShape()`): both mean "no monomials plus the given constant", so `zero(5)` has **`"5"`** as its
 * constant. **`isConstantOnly` and `isEmpty` are synonyms** (`isConstantOnlyEqualsIsEmpty()`). **`setConstantTerm` overwrites**
 * (`setConstantTermOverwrites()`). **`setCoefficient` mutates in place** (`setCoefficientMutatesInPlace()`). **`fromLinear`
 * keeps order and coefficients** (`fromLinearPreservesOrderAndCoefficients()`). And **`fromLinear` yields `Linear` kinds only**
 * (`fromLinearYieldsLinearKind()`). Coefficients come back as **text** because a non-finite `f64` cannot cross JSON.
 */
export class PolynomialProbeReport {
    private constructor(private state: PolynomialProbeBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): PolynomialProbeReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected polynomial probe report text");
        }
        return invoke(() => new PolynomialProbeReport(wasm().PolynomialProbeReport.fromJson(json)));
    }
    private raw(): PolynomialProbeBinding {
        if (!this.state) throw new OspfError("Disposed", "polynomial probe report has been disposed");
        return this.state;
    }
    /** 单项式条数 / The monomial count. */
    monomialCount(): number { return invoke(() => this.raw().monomialCount()); }
    /** 第 `position` 个单项式的系数文本 / The coefficient text at `position`. */
    coefficientAt(position: number): string { return invoke(() => this.raw().coefficientAt(position)); }
    /** 第 `position` 个单项式的 `varIndex` / The `varIndex` at `position`. */
    varIndexAt(position: number): number { return invoke(() => this.raw().varIndexAt(position)); }
    /** 常数项文本 / The constant term text. */
    constantTerm(): string { return invoke(() => this.raw().constantTerm()); }
    /** `isConstantOnly()` / `isConstantOnly()`. */
    isConstantOnly(): boolean { return invoke(() => this.raw().isConstantOnly()); }
    /** `isEmpty()` / `isEmpty()`. */
    isEmpty(): boolean { return invoke(() => this.raw().isEmpty()); }
    /** `zero(c)` 的常数项文本 / The constant text of `zero(c)`. */
    zeroConstant(): string { return invoke(() => this.raw().zeroConstant()); }
    /** `constant(c)` 的常数项文本 / The constant text of `constant(c)`. */
    constantPolynomialConstant(): string {
        return invoke(() => this.raw().constantPolynomialConstant());
    }
    /** `fromLinear` 后的 kind 名条数 / The lifted kind count. */
    liftedKindCount(): number { return invoke(() => this.raw().liftedKindCount()); }
    /** 第 `position` 个 kind 名 / The kind name at `position`. */
    liftedKindAt(position: number): string { return invoke(() => this.raw().liftedKindAt(position)); }
    /** `addMonomial` 纯追加 / Whether `addMonomial` is pure append. */
    addMonomialIsPureAppend(): boolean { return invoke(() => this.raw().addMonomialIsPureAppend()); }
    /** `zero`/`constant` 同形 / Whether `zero`/`constant` share a shape. */
    zeroAndConstantAreTheSameShape(): boolean {
        return invoke(() => this.raw().zeroAndConstantAreTheSameShape());
    }
    /** `isConstantOnly` 等于 `isEmpty` / Whether the two emptiness flags agree. */
    isConstantOnlyEqualsIsEmpty(): boolean {
        return invoke(() => this.raw().isConstantOnlyEqualsIsEmpty());
    }
    /** `setConstantTerm` 直接覆盖 / Whether `setConstantTerm` overwrites. */
    setConstantTermOverwrites(): boolean {
        return invoke(() => this.raw().setConstantTermOverwrites());
    }
    /** `setCoefficient` 就地改 / Whether `setCoefficient` mutates in place. */
    setCoefficientMutatesInPlace(): boolean {
        return invoke(() => this.raw().setCoefficientMutatesInPlace());
    }
    /** `fromLinear` 保留顺序与系数 / Whether `fromLinear` keeps order and coefficients. */
    fromLinearPreservesOrderAndCoefficients(): boolean {
        return invoke(() => this.raw().fromLinearPreservesOrderAndCoefficients());
    }
    /** `fromLinear` 只产出线性 kind / Whether `fromLinear` yields linear kinds only. */
    fromLinearYieldsLinearKind(): boolean {
        return invoke(() => this.raw().fromLinearYieldsLinearKind());
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 视图探针请求。 / The view probe request. */
export interface ModelViewRequest {
    name?: string;
    /** 变量数（0..=8）。 / The variable count (0..=8). */
    variables?: number;
    /** 线性行数（0..=8）。 / The linear row count (0..=8). */
    rows?: number;
    /** 二次约束数（0..=8）。 / The quadratic constraint count (0..=8). */
    quadraticRows?: number;
    /** 目标向量长度（缺省等于变量数）。 / The objective length. */
    objectiveLength?: number;
    /** 二次目标矩阵行数（缺省等于变量数）。 / The `Q` row count. */
    quadraticObjectiveRows?: number;
    /** `Minimum` 或 `Maximum`。 / The objective direction. */
    direction?: string;
}

/**
 * 两个**只读视图 trait** 的口径（续挖 `model/intermediate/linear_triad_model_view.rs` /
 * `quadratic_tetrad_model_view.rs`）。它们是 Kotlin 对齐的只读投影，桥接层从未用过，但完全脱离求解器：
 *
 * 1. **两个视图的 `name()` 都取 `basic.linear.name`**（`bothViewsReadTheLinearName()`）：二次模型的"名字"
 *    其实是它线性部分的名字。
 * 2. **二次视图的 `numConstraints()` 只数线性行**（`theQuadraticViewCountsLinearRowsOnly()`）：加一条二次约束后
 *    它**不变**，只有 `quadraticQuadraticConstraints()` 变。
 * 3. **目标向量不与变量数对账**（`theObjectiveIsNeverReconciled()`）：截短或加长 `c`，视图照样原样返回。
 * 4. **`objective()` 与 `linearObjective()` 是同一字段**（`objectiveIsTheLinearObjective()`）。
 * 5. **`Q` 的行数也不对账**（`theQuadraticObjectiveIsUnreconciled()`）：空 `Q` 对 3 个变量也照样返回。
 * 6. **视图不给目标方向**（`theViewsDoNotExposeTheDirection()`）：方向只能直接读字段。
 * 7. **视图只读**（`theViewsAreReadOnly()`）：所有方法都是 `&self`。
 *
 * The two **read-only view traits'** conventions (continuation). **Both views' `name()` reads `basic.linear.name`**
 * (`bothViewsReadTheLinearName()`). **The quadratic view's `numConstraints()` counts linear rows only**
 * (`theQuadraticViewCountsLinearRowsOnly()`). **The objective is never reconciled** (`theObjectiveIsNeverReconciled()`).
 * **`objective()` and `linearObjective()` are the same field** (`objectiveIsTheLinearObjective()`). **`Q`'s rows are
 * unreconciled too** (`theQuadraticObjectiveIsUnreconciled()`). **The views do not expose the direction**
 * (`theViewsDoNotExposeTheDirection()`). And **the views are read-only** (`theViewsAreReadOnly()`).
 */
export class ModelViewReport {
    private constructor(private state: ModelViewBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): ModelViewReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected model view report text");
        }
        return invoke(() => new ModelViewReport(wasm().ModelViewReport.fromJson(json)));
    }
    private raw(): ModelViewBinding {
        if (!this.state) throw new OspfError("Disposed", "model view report has been disposed");
        return this.state;
    }
    /** 线性视图的名字 / The name through the linear view. */
    linearName(): string { return invoke(() => this.raw().linearName()); }
    /** 二次视图的名字 / The name through the quadratic view. */
    quadraticName(): string { return invoke(() => this.raw().quadraticName()); }
    linearVariables(): number { return invoke(() => this.raw().linearVariables()); }
    linearConstraints(): number { return invoke(() => this.raw().linearConstraints()); }
    quadraticVariables(): number { return invoke(() => this.raw().quadraticVariables()); }
    quadraticConstraints(): number { return invoke(() => this.raw().quadraticConstraints()); }
    quadraticQuadraticConstraints(): number {
        return invoke(() => this.raw().quadraticQuadraticConstraints());
    }
    /** `objective()` 的条数 / The `objective()` length. */
    objectiveLength(): number { return invoke(() => this.raw().objectiveLength()); }
    /** `linearObjective()` 的条数 / The `linearObjective()` length. */
    linearObjectiveLength(): number { return invoke(() => this.raw().linearObjectiveLength()); }
    /** `quadraticObjective().rows()` / `quadraticObjective().rows()`. */
    quadraticObjectiveRows(): number { return invoke(() => this.raw().quadraticObjectiveRows()); }
    /** 目标方向名 / The direction name. */
    objectiveCategory(): string { return invoke(() => this.raw().objectiveCategory()); }
    /** 两个视图都取线性部分的名字 / Whether both views read the linear name. */
    bothViewsReadTheLinearName(): boolean {
        return invoke(() => this.raw().bothViewsReadTheLinearName());
    }
    /** 二次视图只数线性行 / Whether the quadratic view counts linear rows only. */
    theQuadraticViewCountsLinearRowsOnly(): boolean {
        return invoke(() => this.raw().theQuadraticViewCountsLinearRowsOnly());
    }
    /** 目标向量不对账 / Whether the objective is unreconciled. */
    theObjectiveIsNeverReconciled(): boolean {
        return invoke(() => this.raw().theObjectiveIsNeverReconciled());
    }
    /** 两个目标访问器同字段 / Whether the two objective accessors share a field. */
    objectiveIsTheLinearObjective(): boolean {
        return invoke(() => this.raw().objectiveIsTheLinearObjective());
    }
    /** `Q` 的行数不对账 / Whether `Q`'s rows are unreconciled. */
    theQuadraticObjectiveIsUnreconciled(): boolean {
        return invoke(() => this.raw().theQuadraticObjectiveIsUnreconciled());
    }
    /** 视图不给目标方向 / Whether the views omit the direction. */
    theViewsDoNotExposeTheDirection(): boolean {
        return invoke(() => this.raw().theViewsDoNotExposeTheDirection());
    }
    /** 视图只读 / Whether the views are read-only. */
    theViewsAreReadOnly(): boolean { return invoke(() => this.raw().theViewsAreReadOnly()); }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 分析流水线的阶段配置探针请求。 / The stage-configuration probe request. */
export interface AnalysisOptionsRequest {
    /** funnel 的对偶阈值。 / The funnel's dual threshold. */
    dualThreshold?: number;
    /** funnel 的默认候选上限。 / The funnel's default candidate limit. */
    funnelDefaultLimit?: number;
    /** 流水线自己的候选上限。 / The pipeline's own candidate limit. */
    candidateLimit?: number;
    runFixedInteger?: boolean;
    runPerturbation?: boolean;
    runTargetAnalysis?: boolean;
    runConflictAnalysis?: boolean;
    enumerationLimit?: number;
    requestConflict?: boolean;
    shrinkConflict?: boolean;
    maxConflictResolves?: number;
    /** 扰动显式序列（空数组表示"空"）。 / The explicit deltas (an empty array means "empty"). */
    deltas?: number[];
    /** 是否给自适应策略。 / Whether an adaptive strategy is supplied. */
    adaptive?: boolean;
    maxSolves?: number;
}

/**
 * 分析流水线**阶段配置**的闸门语义（续挖 `analysis/pipeline.rs` 的 `CriticalConstraintAnalysisOptions`
 * 及其五个子配置）。整段不含任何求解器调用，却能决定后续每一段跑不跑：
 *
 * 1. **四个 `run*` 默认全真**（`allFourStageFlagsDefaultTrue()`）。
 * 2. **`candidateLimit` 是**快照**而不是引用**（`theCandidateLimitIsSnapshottedFromTheFunnel()`）：`Default`
 *    把它从 `funnel.defaultCandidateLimit` 拷过来，之后改 `funnel` 不会回头改它。
 * 3. **`candidateLimit = 0` 合法**（`aZeroCandidateLimitIsLegal()`）：`validate()` 根本不看它，按文档就是
 *    "只做筛选"。
 * 4. **四个 `run*` 也从不被校验**（`theFourRunFlagsAreNeverValidated()`）：全关掉照样通过——"一段都不跑的
 *    流水线"是**合法配置**。
 * 5. **`validate()` 按阶段顺序短路**（`validationRunsInStageOrder()`）：funnel 与扰动同时坏时报的是 **funnel**
 *    的文案（见 `orderProbeMessage()`），先修 funnel 才看得见扰动的问题。
 * 6. **流水线与 conflict 阶段各带一套 CP 参数**（`thePipelineAndTheConflictStageCarrySeparateCpOptions()`）：
 *    坏一套不牵连另一套（`conflictOnlyProbeMessage()` 与 `pipelineOnlyProbeMessage()` 各自可独立出现）。
 * 7. **扰动策略要求 `deltas` 与 `adaptive` 恰好二选一**
 *    （`thePerturbationPolicyRequiresExactlyOneSource()`）："两个都空"与"两个都给定"**报同一条文案**。
 *
 * The **stage configuration's** gate semantics (continuation). **All four `run*` flags default true.** **`candidateLimit`
 * is a snapshot, not a reference.** **`candidateLimit = 0` is legal.** **The four `run*` flags are never validated**: a
 * pipeline that runs nothing is a legal configuration. **`validate()` short-circuits in stage order.** **The pipeline and the
 * conflict stage carry separate CP option sets.** And **the perturbation policy demands exactly one of `deltas`/`adaptive`**,
 * where "both empty" and "both given" share one message.
 */
export class AnalysisOptionsReport {
    private constructor(private state: AnalysisOptionsBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): AnalysisOptionsReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected analysis options report text");
        }
        return invoke(() => new AnalysisOptionsReport(wasm().AnalysisOptionsReport.fromJson(json)));
    }
    private raw(): AnalysisOptionsBinding {
        if (!this.state) throw new OspfError("Disposed", "analysis options report has been disposed");
        return this.state;
    }
    /** funnel 阈值读数 / The funnel threshold reading. */
    dualThreshold(): string { return invoke(() => this.raw().dualThreshold()); }
    /** funnel 的默认上限 / The funnel's default limit. */
    funnelDefaultLimit(): number { return invoke(() => this.raw().funnelDefaultLimit()); }
    /** 流水线候选上限 / The pipeline's candidate limit. */
    candidateLimit(): number { return invoke(() => this.raw().candidateLimit()); }
    runFixedInteger(): boolean { return invoke(() => this.raw().runFixedInteger()); }
    runPerturbation(): boolean { return invoke(() => this.raw().runPerturbation()); }
    runTargetAnalysis(): boolean { return invoke(() => this.raw().runTargetAnalysis()); }
    runConflictAnalysis(): boolean { return invoke(() => this.raw().runConflictAnalysis()); }
    /** CP 参数读数 / The CP option readings. */
    enumerationLimit(): number { return invoke(() => this.raw().enumerationLimit()); }
    requestConflict(): boolean { return invoke(() => this.raw().requestConflict()); }
    shrinkConflict(): boolean { return invoke(() => this.raw().shrinkConflict()); }
    maxConflictResolves(): number { return invoke(() => this.raw().maxConflictResolves()); }
    /** 扰动读数 / The perturbation readings. */
    deltaCount(): number { return invoke(() => this.raw().deltaCount()); }
    hasAdaptive(): boolean { return invoke(() => this.raw().hasAdaptive()); }
    maxSolves(): number { return invoke(() => this.raw().maxSolves()); }
    /** 固定整数容差读数 / The fixed-integer tolerance readings. */
    integralityTolerance(): string { return invoke(() => this.raw().integralityTolerance()); }
    dualTolerance(): string { return invoke(() => this.raw().dualTolerance()); }
    /** 这份配置自己的 `validate()` 是否有话要说 / Whether this configuration's `validate()` has something to say. */
    hasValidateMessage(): boolean { return invoke(() => this.raw().hasValidateMessage()); }
    /** `validate()` 的文案（无则空串） / The `validate()` message (empty when accepted). */
    validateMessage(): string { return invoke(() => this.raw().validateMessage()); }
    /** 顺序探针文案 / The order probe message. */
    orderProbeMessage(): string { return invoke(() => this.raw().orderProbeMessage()); }
    /** 只坏 conflict 阶段时的文案 / The message when only the conflict stage is broken. */
    conflictOnlyProbeMessage(): string { return invoke(() => this.raw().conflictOnlyProbeMessage()); }
    /** 只坏流水线时的文案 / The message when only the pipeline is broken. */
    pipelineOnlyProbeMessage(): string { return invoke(() => this.raw().pipelineOnlyProbeMessage()); }
    /** 四个开关默认全真 / Whether all four flags default true. */
    allFourStageFlagsDefaultTrue(): boolean {
        return invoke(() => this.raw().allFourStageFlagsDefaultTrue());
    }
    /** 候选上限是快照 / Whether the limit is a snapshot. */
    theCandidateLimitIsSnapshottedFromTheFunnel(): boolean {
        return invoke(() => this.raw().theCandidateLimitIsSnapshottedFromTheFunnel());
    }
    /** 零候选上限合法 / Whether a zero limit is legal. */
    aZeroCandidateLimitIsLegal(): boolean {
        return invoke(() => this.raw().aZeroCandidateLimitIsLegal());
    }
    /** 四个开关从不被校验 / Whether the four flags are never validated. */
    theFourRunFlagsAreNeverValidated(): boolean {
        return invoke(() => this.raw().theFourRunFlagsAreNeverValidated());
    }
    /** `validate()` 按阶段顺序短路 / Whether validation short-circuits in stage order. */
    validationRunsInStageOrder(): boolean {
        return invoke(() => this.raw().validationRunsInStageOrder());
    }
    /** 两套 CP 参数独立 / Whether the two CP option sets are separate. */
    thePipelineAndTheConflictStageCarrySeparateCpOptions(): boolean {
        return invoke(() => this.raw().thePipelineAndTheConflictStageCarrySeparateCpOptions());
    }
    /** 扰动策略要求恰好一个来源 / Whether the policy demands exactly one source. */
    thePerturbationPolicyRequiresExactlyOneSource(): boolean {
        return invoke(() => this.raw().thePerturbationPolicyRequiresExactlyOneSource());
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 能力矩阵探针请求。 / The capability-matrix probe request. */
export interface CapabilityMatrixRequest {
    /** 支持的模型种类名（`Linear` / `Mip` / `Quadratic` / `Miqp` / `ConstraintProgramming`）。 */
    modelTypes?: string[];
    dual?: boolean;
    warmStart?: boolean;
    exactCpLowering?: boolean;
    nativeAssumptionSolving?: boolean;
    nativeUnsatCore?: boolean;
    fallbackSatisfactionOnly?: boolean;
    /** 显式覆盖：`能力名=级别`（级别为 `Supported` / `Conditional` / `Unsupported`）。 */
    overrides?: string[];
}

/**
 * 能力矩阵的**推断格**（续挖 `analysis/mod.rs` 的 `CapabilityMatrix` / `inferred_support`）。
 * 十三个能力、五个输入的一张纯数据真值表，一个求解器都不用就能全部测到：
 *
 * 1. **空矩阵不是"什么都不支持"**（`anEmptyMatrixClaimsActivitySupport()`）：`activity` 与
 *    `constraint_group_aggregation` 恒 `Supported`；`rhsPerturbation` / `removalTest` / `objectiveTarget` /
 *    `adaptivePerturbation` 在 `modelTypes` 为空时给 `Conditional`。
 * 2. **`fixedIntegerLpSensitivity` 是三态阶梯**（`theFixedIntegerLadderIsThreeTiered()`）：有 `dual` 且
 *    （`Mip` 或 `exactCpLowering`）→ `Supported`；只有 `dual` → `Conditional`；无 `dual` → `Unsupported`。
 * 3. **扰动三兄弟不看 `dual`**（`thePerturbationTrioIgnoresTheDual()`）：只有 `modelTypes` 决定级别。
 * 4. **`adaptivePerturbation` 是 `rhsPerturbation` 的恒等映射**（`adaptiveMirrorsRhsPerturbationExactly()`）。
 * 5. **只有 `assumptionSolving` 与 `conflict` 吃 fallback**
 *    （`onlyTwoCapabilitiesAcceptTheFallback()`）：`nativeUnsatCore` 非原生即 `Unsupported`。
 * 6. **`mus` 先看 `conflict`**（`musIsGatedOnConflict()`）：`conflict` 不可用时 `mus` 一定不可用。
 * 7. **覆盖项只改查询、不改"原生"**（`anOverrideNeverUpgradesTheNativeFlag()`）：`isNative()` 直接读四个布尔
 *    字段，绕过覆盖表。
 * 8. **`supports()` 把 `Conditional` 也算"可用"**（`conditionalCountsAsAvailable()`）：判据是 `!= Unsupported`。
 *
 * The capability matrix's **inference lattice** (continuation). **An empty matrix does not mean "nothing is supported".**
 * **`fixedIntegerLpSensitivity` is a three-tier ladder.** **The perturbation trio ignores the dual.**
 * **`adaptivePerturbation` is an identity map onto `rhsPerturbation`.** **Only `assumptionSolving` and `conflict` accept the
 * fallback.** **`mus` is gated on `conflict`.** **An override never upgrades the native flag.** And **`supports()` treats
 * `Conditional` as available**, since the test is `!= Unsupported`.
 */
export class CapabilityMatrixReport {
    private constructor(private state: CapabilityMatrixBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): CapabilityMatrixReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected capability matrix report text");
        }
        return invoke(() => new CapabilityMatrixReport(wasm().CapabilityMatrixReport.fromJson(json)));
    }
    private raw(): CapabilityMatrixBinding {
        if (!this.state) throw new OspfError("Disposed", "capability matrix report has been disposed");
        return this.state;
    }
    /** 能力条数 / The capability count. */
    rowCount(): number { return invoke(() => this.raw().rowCount()); }
    /** 第 `position` 个能力名 / The capability name at `position`. */
    capabilityAt(position: number): string { return invoke(() => this.raw().capabilityAt(position)); }
    /** 第 `position` 个支持级别 / The support level at `position`. */
    supportAt(position: number): string { return invoke(() => this.raw().supportAt(position)); }
    /** 第 `position` 个 `supports()` 结论 / The `supports()` verdict at `position`. */
    availableAt(position: number): boolean { return invoke(() => this.raw().availableAt(position)); }
    /** 第 `position` 个 `isNative()` 结论 / The `isNative()` verdict at `position`. */
    nativeAt(position: number): boolean { return invoke(() => this.raw().nativeAt(position)); }
    /** 按名字查支持级别（找不到返回空串） / Look a support level up by name (empty when absent). */
    supportOf(capability: string): string { return invoke(() => this.raw().supportOf(capability)); }
    /** `lpDual()` / `lpDual()`. */
    lpDual(): boolean { return invoke(() => this.raw().lpDual()); }
    cpAssumption(): string { return invoke(() => this.raw().cpAssumption()); }
    cpBooleanLogic(): string { return invoke(() => this.raw().cpBooleanLogic()); }
    /** 空矩阵的四条读数 / The four empty-matrix readings. */
    emptyActivity(): string { return invoke(() => this.raw().emptyActivity()); }
    emptyRhsPerturbation(): string { return invoke(() => this.raw().emptyRhsPerturbation()); }
    emptyNativeUnsatCore(): string { return invoke(() => this.raw().emptyNativeUnsatCore()); }
    emptyMus(): string { return invoke(() => this.raw().emptyMus()); }
    /** 空矩阵也敢说支持活动性 / Whether an empty matrix claims activity support. */
    anEmptyMatrixClaimsActivitySupport(): boolean {
        return invoke(() => this.raw().anEmptyMatrixClaimsActivitySupport());
    }
    /** 固定整数灵敏度是三态阶梯 / Whether the ladder is three-tiered. */
    theFixedIntegerLadderIsThreeTiered(): boolean {
        return invoke(() => this.raw().theFixedIntegerLadderIsThreeTiered());
    }
    /** 扰动三兄弟不看 dual / Whether the trio ignores the dual. */
    thePerturbationTrioIgnoresTheDual(): boolean {
        return invoke(() => this.raw().thePerturbationTrioIgnoresTheDual());
    }
    /** 自适应扰动是 RHS 扰动的恒等映射 / Whether adaptive mirrors RHS exactly. */
    adaptiveMirrorsRhsPerturbationExactly(): boolean {
        return invoke(() => this.raw().adaptiveMirrorsRhsPerturbationExactly());
    }
    /** 只有两个能力接受 fallback / Whether only two accept the fallback. */
    onlyTwoCapabilitiesAcceptTheFallback(): boolean {
        return invoke(() => this.raw().onlyTwoCapabilitiesAcceptTheFallback());
    }
    /** Mus 以 Conflict 为前置 / Whether `mus` is gated on `conflict`. */
    musIsGatedOnConflict(): boolean { return invoke(() => this.raw().musIsGatedOnConflict()); }
    /** 覆盖项不提升"原生" / Whether an override never upgrades the native flag. */
    anOverrideNeverUpgradesTheNativeFlag(): boolean {
        return invoke(() => this.raw().anOverrideNeverUpgradesTheNativeFlag());
    }
    /** `Conditional` 也算可用 / Whether `Conditional` counts as available. */
    conditionalCountsAsAvailable(): boolean {
        return invoke(() => this.raw().conditionalCountsAsAvailable());
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条约束的支持等级规格。 / One constraint's support level. */
export interface CpConstraintLevelSpec {
    /** 稳定约束 ID。 / The stable constraint ID. */
    id: string;
    /** 等级名（`Native` / `ExactLowering` / `Conditional` / `Unsupported`）。 / The level name. */
    level: string;
}

/** CP 支持报告合并探针请求。 / The CP-support merge probe request. */
export interface CpSupportMergeRequest {
    constraintLevels?: CpConstraintLevelSpec[];
    satisfaction?: boolean;
    integerObjective?: boolean;
    sparseDomain?: boolean;
    incrementalSession?: boolean;
    assumptions?: boolean;
    solutionHint?: boolean;
    verifiedConflictSeed?: boolean;
    /** descriptor 声明的能力名（`linear` / `mip` / `dual` / `assumption` / `unsat_core` / `socp` 等）。 */
    descriptorCapabilities?: string[];
}

/**
 * CP 支持报告合并进能力矩阵的**推导口径**（续挖 `analysis/mod.rs` 的 `from_constraint_programming_support`）。
 * 第 66 单量的是推断格，这一单量它的入口：一张 `ConstraintProgrammingSupportReport` 加一个
 * `SolverDescriptor` 怎样变成矩阵，全程不含求解器调用：
 *
 * 1. **原生假设只认 descriptor**（`nativeAssumptionSolvingComesFromTheDescriptorOnly()`）：
 *    `assumptions = true` 不会让 `nativeAssumptionSolving` 变真——facade 能力不等于 backend 原生 API。
 * 2. **`fallbackSatisfactionOnly` 就是 `satisfaction`**（`theFallbackFlagIsTheSatisfactionFlag()`）：
 *    于是"能求解 satisfaction"立刻把 `assumptionSolving` 与 `conflict` 推成 `Conditional`。
 * 3. **`exactCpLowering` 是空真**（`exactLoweringIsVacuouslyTrue()`）：`satisfaction && integerObjective`
 *    且约束表**为空**时 `all()` 给真。
 * 4. **一条不是 `ExactLowering` 就整份假**（`oneInexactConstraintKillsTheWholeFlag()`）。
 * 5. **五个特征恒非 `Native`**（`fiveFeaturesAreNeverNative()`）：`booleanLogic` / `sparseDomain` /
 *    `assumption` / `solutionHint` / `conflictCore` 只会是 `Conditional` 或 `Unsupported`；只有
 *    `incrementalSolve` 用 `Native`。
 * 6. **逐约束等级被丢掉**（`perConstraintLevelsNeverEnterTheMatrix()`）：那张表只在算 `exactCpLowering` 时读一次。
 * 7. **`modelTypes` 无条件插 `ConstraintProgramming`**（`theCpModelTypeIsInsertedUnconditionally()`）——
 *    连带效果是 `modelTypes` 永不为空，于是 `mus` 直接落到 `Supported`。
 * 8. **三个能力名被静默忽略**（`threeSolverCapabilitiesAreSilentlyIgnored()`）：`socp` / `native_indicator` /
 *    `native_sos1` 落进 `_ => {}`，一个都不进矩阵。
 *
 * The **derivation rules** that merge a CP support report into the capability matrix (continuation). **Native assumption
 * comes from the descriptor only.** **The fallback flag *is* the satisfaction flag.** **`exactCpLowering` is vacuously
 * true.** **One inexact constraint kills the whole flag.** **Five features are never `Native`.** **Per-constraint levels
 * never enter the matrix.** **The CP model type is inserted unconditionally.** And **three capability names are silently
 * ignored** by the descriptor path.
 */
export class CpSupportMergeReport {
    private constructor(private state: CpSupportMergeBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): CpSupportMergeReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected cp support merge report text");
        }
        return invoke(() => new CpSupportMergeReport(wasm().CpSupportMergeReport.fromJson(json)));
    }
    private raw(): CpSupportMergeBinding {
        if (!this.state) throw new OspfError("Disposed", "cp support merge report has been disposed");
        return this.state;
    }
    /** 词汇表条数 / The vocabulary size. */
    vocabularySize(): number { return invoke(() => this.raw().vocabularySize()); }
    /** 词汇表第 `position` 个名字 / The vocabulary name at `position`. */
    vocabularyAt(position: number): string { return invoke(() => this.raw().vocabularyAt(position)); }
    /** 被合并的特征条数 / The merged-feature count. */
    featureCount(): number { return invoke(() => this.raw().featureCount()); }
    /** 第 `position` 个特征名 / The feature name at `position`. */
    featureAt(position: number): string { return invoke(() => this.raw().featureAt(position)); }
    /** 第 `position` 个特征的级别 / The feature level at `position`. */
    featureSupportAt(position: number): string {
        return invoke(() => this.raw().featureSupportAt(position));
    }
    /** 第 `position` 个特征是否可用 / Whether the feature at `position` is available. */
    featureAvailableAt(position: number): boolean {
        return invoke(() => this.raw().featureAvailableAt(position));
    }
    /** 按名字查特征级别（找不到返回空串） / Look a feature level up by name. */
    featureSupportOf(feature: string): string {
        return invoke(() => this.raw().featureSupportOf(feature));
    }
    /** 矩阵的模型种类名条数 / The model-type count. */
    modelTypeCount(): number { return invoke(() => this.raw().modelTypeCount()); }
    /** 第 `position` 个模型种类名 / The model-type name at `position`. */
    modelTypeAt(position: number): string { return invoke(() => this.raw().modelTypeAt(position)); }
    nativeAssumptionSolving(): boolean {
        return invoke(() => this.raw().nativeAssumptionSolving());
    }
    nativeUnsatCore(): boolean { return invoke(() => this.raw().nativeUnsatCore()); }
    fallbackSatisfactionOnly(): boolean {
        return invoke(() => this.raw().fallbackSatisfactionOnly());
    }
    exactCpLowering(): boolean { return invoke(() => this.raw().exactCpLowering()); }
    dual(): boolean { return invoke(() => this.raw().dual()); }
    /** 合并后几个关键能力的级别 / Key capability levels after the merge. */
    assumptionSolving(): string { return invoke(() => this.raw().assumptionSolving()); }
    conflict(): string { return invoke(() => this.raw().conflict()); }
    mus(): string { return invoke(() => this.raw().mus()); }
    fixedIntegerLpSensitivity(): string {
        return invoke(() => this.raw().fixedIntegerLpSensitivity());
    }
    exactCpLoweringCapability(): string {
        return invoke(() => this.raw().exactCpLoweringCapability());
    }
    /** 原生假设只认 descriptor / Whether native assumption comes from the descriptor only. */
    nativeAssumptionSolvingComesFromTheDescriptorOnly(): boolean {
        return invoke(() => this.raw().nativeAssumptionSolvingComesFromTheDescriptorOnly());
    }
    /** fallback 就是 satisfaction / Whether the fallback flag is the satisfaction flag. */
    theFallbackFlagIsTheSatisfactionFlag(): boolean {
        return invoke(() => this.raw().theFallbackFlagIsTheSatisfactionFlag());
    }
    /** `exactCpLowering` 空真 / Whether the lowering flag is vacuously true. */
    exactLoweringIsVacuouslyTrue(): boolean {
        return invoke(() => this.raw().exactLoweringIsVacuouslyTrue());
    }
    /** 一条不精确就整份假 / Whether one inexact constraint kills the flag. */
    oneInexactConstraintKillsTheWholeFlag(): boolean {
        return invoke(() => this.raw().oneInexactConstraintKillsTheWholeFlag());
    }
    /** 五个特征恒非 Native / Whether five features are never native. */
    fiveFeaturesAreNeverNative(): boolean {
        return invoke(() => this.raw().fiveFeaturesAreNeverNative());
    }
    /** 逐约束等级不进矩阵 / Whether per-constraint levels stay out of the matrix. */
    perConstraintLevelsNeverEnterTheMatrix(): boolean {
        return invoke(() => this.raw().perConstraintLevelsNeverEnterTheMatrix());
    }
    /** CP 模型种类无条件插入 / Whether the CP model type is inserted unconditionally. */
    theCpModelTypeIsInsertedUnconditionally(): boolean {
        return invoke(() => this.raw().theCpModelTypeIsInsertedUnconditionally());
    }
    /** 三个能力名被静默忽略 / Whether three capability names are silently ignored. */
    threeSolverCapabilitiesAreSilentlyIgnored(): boolean {
        return invoke(() => this.raw().threeSolverCapabilitiesAreSilentlyIgnored());
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条稳定变量取值。 / One stable-variable value. */
export interface SubproblemValueSpec {
    id: string;
    value: number;
}

/** CP subproblem 四态结果探针请求。 / The four-state subproblem probe request. */
export interface SubproblemResultRequest {
    /** `feasible` / `feasibleFromSnapshot` / `infeasible` / `infeasibleFromSnapshot` / `incomplete` / `failed`。 */
    variant: string;
    /** 报告状态名（`Feasible` / `Infeasible` / `Unbounded` / `InfeasibleOrUnbounded` / `Unknown`）。 */
    status?: string;
    assignment?: SubproblemValueSpec[];
    withSolution?: boolean;
    withProof?: boolean;
    proofReference?: string;
    /** conflict 成员（空表示不给 conflict）。 / Conflict members (empty means no conflict). */
    conflictMembers?: string[];
    conflictReference?: string;
    incumbentObjective?: number;
    issueCode?: string;
    issueMessage?: string;
}

/**
 * CP subproblem 四态结果的**构造闸门**（续挖 `solver/logic_based_benders.rs` 的
 * `ConstraintProgrammingSubproblemResult`）。六个构造器各自的判据与它们留下的可观测痕迹：
 *
 * 1. **`failed` 从不校验**（`failedNeverValidatesAnything()`）：任意 code / message 都收，且既没有报告
 *    也没有模型指纹。
 * 2. **只有 snapshot 入口发证明**（`onlyTheSnapshotConstructorsIssueProofs()`）：`feasible()` 走完
 *    `assignmentProof` 仍是 `undefined`，于是 `hasModelFingerprint()` 为假；`feasibleFromSnapshot` 才有。
 * 3. **`feasible` 要 `Feasible` 状态**（`feasibleDemandsTheFeasibleStatus()`）：`Unknown` 携带完整 solution
 *    仍被拒。
 * 4. **`infeasible` 要真证书**（`infeasibleDemandsAGenuineCertificate()`）：没 proof 被拒；而"`Unknown` 挂
 *    不可行证明"在**报告层**就被拒，到不了结果层。
 * 5. **冲突引用必须与报告引用逐字相等**（`theConflictReferenceMustMatchTheReport()`）。
 * 6. **`incomplete` 连 `isOptimal()` 都拒**（`incompleteRefusesEvenAnOptimalReport()`）：四个终态全被挡。
 * 7. **incumbent 有两条值域闸门**（`theIncompleteIncumbentHasTwoValueGates()`）：`i64::MIN` 单值被拒、
 *    非有限 objective 被拒；普通负值、`i64::MAX`、`0` 都收。
 * 8. **`feasible` 的 assignment 是报告的副本**（`theFeasibleAssignmentIsACopyOfTheReport()`）：不重算、
 *    顺序由稳定 ID 决定。
 *
 * The **construction gates** of the CP subproblem's four-state result (continuation). **`failed` never validates
 * anything.** **Only the snapshot constructors issue proofs.** **`feasible` demands the `Feasible` status.** **`infeasible`
 * demands a genuine certificate**, and a fake one cannot even be built at the report layer. **The conflict reference must
 * match verbatim.** **`incomplete` refuses even an optimal report.** **The incumbent has two value gates.** And **the
 * feasible assignment is a copy of the report's**, ordered by stable ID.
 */
export class SubproblemResultReport {
    private constructor(private state: SubproblemResultBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): SubproblemResultReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected subproblem result report text");
        }
        return invoke(() => new SubproblemResultReport(wasm().SubproblemResultReport.fromJson(json)));
    }
    private raw(): SubproblemResultBinding {
        if (!this.state) throw new OspfError("Disposed", "subproblem result report has been disposed");
        return this.state;
    }
    /** 走的哪个构造器 / The constructor that was walked. */
    variant(): string { return invoke(() => this.raw().variant()); }
    /** 是否构造成功 / Whether construction succeeded. */
    accepted(): boolean { return invoke(() => this.raw().accepted()); }
    /** 被拒文案（无则空串） / The refusal message (empty when accepted). */
    refusal(): string { return invoke(() => this.raw().refusal()); }
    /** 成功时的状态名（无则空串）。名字用 `stateName` 是因为 `state` 已是私有绑定字段。 
     *  / The state name (empty when refused); `stateName` avoids colliding with the private binding field. */
    stateName(): string { return invoke(() => this.raw().state()); }
    /** assignment 条数（无则 `-1`） / The assignment size (`-1` when absent). */
    assignmentSize(): number { return invoke(() => this.raw().assignmentSize()); }
    /** assignment 的稳定 ID 条数 / The assignment's stable-ID count. */
    assignmentIdCount(): number { return invoke(() => this.raw().assignmentIdCount()); }
    /** 第 `position` 个稳定 ID / The stable ID at `position`. */
    assignmentIdAt(position: number): string {
        return invoke(() => this.raw().assignmentIdAt(position));
    }
    hasModelFingerprint(): boolean { return invoke(() => this.raw().hasModelFingerprint()); }
    hasReport(): boolean { return invoke(() => this.raw().hasReport()); }
    reportStatus(): string { return invoke(() => this.raw().reportStatus()); }
    issueCode(): string { return invoke(() => this.raw().issueCode()); }
    issueMessage(): string { return invoke(() => this.raw().issueMessage()); }
    /** `failed` 从不校验 / Whether `failed` never validates anything. */
    failedNeverValidatesAnything(): boolean {
        return invoke(() => this.raw().failedNeverValidatesAnything());
    }
    /** 只有 snapshot 入口发证明 / Whether only the snapshot constructors issue proofs. */
    onlyTheSnapshotConstructorsIssueProofs(): boolean {
        return invoke(() => this.raw().onlyTheSnapshotConstructorsIssueProofs());
    }
    /** `feasible` 要 `Feasible` 状态 / Whether `feasible` demands the `Feasible` status. */
    feasibleDemandsTheFeasibleStatus(): boolean {
        return invoke(() => this.raw().feasibleDemandsTheFeasibleStatus());
    }
    /** `infeasible` 要真证书 / Whether `infeasible` demands a genuine certificate. */
    infeasibleDemandsAGenuineCertificate(): boolean {
        return invoke(() => this.raw().infeasibleDemandsAGenuineCertificate());
    }
    /** 冲突引用逐字相等 / Whether the conflict reference matches verbatim. */
    theConflictReferenceMustMatchTheReport(): boolean {
        return invoke(() => this.raw().theConflictReferenceMustMatchTheReport());
    }
    /** `incomplete` 连最优都拒 / Whether `incomplete` refuses even an optimal report. */
    incompleteRefusesEvenAnOptimalReport(): boolean {
        return invoke(() => this.raw().incompleteRefusesEvenAnOptimalReport());
    }
    /** incumbent 两条值域闸门 / Whether the incumbent has two value gates. */
    theIncompleteIncumbentHasTwoValueGates(): boolean {
        return invoke(() => this.raw().theIncompleteIncumbentHasTwoValueGates());
    }
    /** assignment 是报告副本 / Whether the assignment is a copy of the report's. */
    theFeasibleAssignmentIsACopyOfTheReport(): boolean {
        return invoke(() => this.raw().theFeasibleAssignmentIsACopyOfTheReport());
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个 master 绑定的字面量。 / One master binding literal. */
export interface OracleBindingLiteral {
    id: string;
    /** `binary` 或 `integer`。 */
    kind?: string;
    lower?: number;
    upper?: number;
}

/** 一个赋值条目（也用来承载系数与行值）。 / One assignment entry (also carries coefficients). */
export interface OracleAssignmentEntry {
    id: string;
    value: number;
}

/** 默认 feasibility no-good oracle 探针请求。 / The no-good oracle probe request. */
export interface NoGoodOracleRequest {
    bindings?: OracleBindingLiteral[];
    assignment?: OracleAssignmentEntry[];
    /** 已验证冲突的成员（空表示不给冲突）。 / Conflict members (empty means no conflict). */
    conflictMembers?: string[];
    conflictReference?: string;
    reportReference?: string;
    /** `plain` 或 `withContext`。 */
    entry?: string;
    contextReference?: string;
    /** `infeasible`（默认）/ `feasible` / `failed`。 */
    resultVariant?: string;
}

/**
 * 默认 feasibility no-good oracle **真正生成出来的 cuts**（续挖 `solver/logic_based_benders.rs` 的
 * `DefaultFeasibilityCutOracle` + `LogicBasedBendersProofContext`）。第 68 单量结果四态，这一单量吃结果的那个
 * oracle：
 *
 * 1. **二进制域只出 1 条 cut**（`binaryDomainsYieldASingleNoGood()`）：`GreaterOrEqual`、`rhs = 1 - ones`，
 *    系数里 1 变 `-1`、0 变 `1`。
 * 2. **有界整数域出 `3n+1` 条**（`integerDomainsYieldThreeRowsPerVariablePlusOne()`）：每变量三行
 *    （`lowerSide` / `upperSide` / `atMostOne`）外加一条全族共享的 `requireDifference`。
 * 3. **每行都声明完整 auxiliary 集合**（`everyRowDeclaresTheWholeAuxiliarySet()`）：整个 family 的 `2n` 个
 *    二进制 auxiliary 逐行全给，不是"用到几个给几个"。
 * 4. **空 conflict 退化成排除整份赋值**（`anEmptyConflictExcludesTheWholeAssignment()`）。
 * 5. **conflict 成员必须都在赋值里**（`aConflictOutsideTheAssignmentIsRefused()`）。
 * 6. **两边都没引用就拒**（`aMissingProofReferenceIsRefused()`）。
 * 7. **context 入口不校验引用来源**（`theContextEntryDoesNotValidateItsReference()`）：同一份 cut，走
 *    `cutsForInfeasible` 拿到已验证引用，走 `cutsForInfeasibleWithContext` 拿到 context 自己那串；但空白引用
 *    仍被 `normalize` 拒。
 * 8. **只有不可行结果能进 oracle**（`onlyAnInfeasibleResultReachesTheOracle()`）；默认的可行入口**总是**空。
 *
 * The cuts the default feasibility no-good oracle **actually emits**. **Binary domains yield a single cut** (`rhs =
 * 1 - ones`, ones negated). **Bounded integers yield `3n+1`** (three rows per variable plus one family-wide
 * `requireDifference`). **Every row declares the whole auxiliary set.** **An empty conflict degrades to the whole
 * assignment.** **Conflict members must lie inside the assignment.** **With no reference on either side the oracle
 * refuses.** **The context entry skips provenance** — same cut, two different references — though a blank one is still
 * refused by `normalize`. And **only an infeasible result reaches the oracle**.
 */
export class NoGoodOracleReport {
    private constructor(private state: NoGoodOracleBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): NoGoodOracleReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected no-good oracle report text");
        }
        return invoke(() => new NoGoodOracleReport(wasm().NoGoodOracleReport.fromJson(json)));
    }
    private raw(): NoGoodOracleBinding {
        if (!this.state) throw new OspfError("Disposed", "no-good oracle report has been disposed");
        return this.state;
    }
    /** 走的哪个入口 / The entry that was walked. */
    entry(): string { return invoke(() => this.raw().entry()); }
    /** 是否生成了 cuts / Whether cuts were produced. */
    accepted(): boolean { return invoke(() => this.raw().accepted()); }
    /** 被拒文案（无则空串） / The refusal message (empty when accepted). */
    refusal(): string { return invoke(() => this.raw().refusal()); }
    /** cut 条数 / The cut count. */
    cutCount(): number { return invoke(() => this.raw().cutCount()); }
    cutIdAt(position: number): string { return invoke(() => this.raw().cutIdAt(position)); }
    cutSenseAt(position: number): string { return invoke(() => this.raw().cutSenseAt(position)); }
    cutRhsAt(position: number): number { return invoke(() => this.raw().cutRhsAt(position)); }
    cutCoefficientCountAt(position: number): number {
        return invoke(() => this.raw().cutCoefficientCountAt(position));
    }
    cutCoefficientIdAt(position: number, index: number): string {
        return invoke(() => this.raw().cutCoefficientIdAt(position, index));
    }
    cutCoefficientValueAt(position: number, index: number): number {
        return invoke(() => this.raw().cutCoefficientValueAt(position, index));
    }
    cutValidityAt(position: number): string { return invoke(() => this.raw().cutValidityAt(position)); }
    cutProofStatusAt(position: number): string {
        return invoke(() => this.raw().cutProofStatusAt(position));
    }
    cutProofReferenceAt(position: number): string {
        return invoke(() => this.raw().cutProofReferenceAt(position));
    }
    cutAuxiliaryCountAt(position: number): number {
        return invoke(() => this.raw().cutAuxiliaryCountAt(position));
    }
    cutEncodingKindAt(position: number): string {
        return invoke(() => this.raw().cutEncodingKindAt(position));
    }
    cutRowKindAt(position: number): string { return invoke(() => this.raw().cutRowKindAt(position)); }
    cutOriginAt(position: number): string { return invoke(() => this.raw().cutOriginAt(position)); }
    /** 证明引用条数 / The proof-reference count. */
    proofReferenceCount(): number { return invoke(() => this.raw().proofReferenceCount()); }
    proofReferenceAt(index: number): string { return invoke(() => this.raw().proofReferenceAt(index)); }
    /** 二进制域只出一条 cut / Whether binary domains yield a single no-good. */
    binaryDomainsYieldASingleNoGood(): boolean {
        return invoke(() => this.raw().binaryDomainsYieldASingleNoGood());
    }
    /** 有界整数域出 3n+1 条 / Whether bounded integers yield `3n+1`. */
    integerDomainsYieldThreeRowsPerVariablePlusOne(): boolean {
        return invoke(() => this.raw().integerDomainsYieldThreeRowsPerVariablePlusOne());
    }
    /** 每行声明完整 auxiliary 集合 / Whether every row declares the whole auxiliary set. */
    everyRowDeclaresTheWholeAuxiliarySet(): boolean {
        return invoke(() => this.raw().everyRowDeclaresTheWholeAuxiliarySet());
    }
    /** 空 conflict 退化为整份赋值 / Whether an empty conflict excludes the whole assignment. */
    anEmptyConflictExcludesTheWholeAssignment(): boolean {
        return invoke(() => this.raw().anEmptyConflictExcludesTheWholeAssignment());
    }
    /** 冲突成员必须在赋值里 / Whether a conflict outside the assignment is refused. */
    aConflictOutsideTheAssignmentIsRefused(): boolean {
        return invoke(() => this.raw().aConflictOutsideTheAssignmentIsRefused());
    }
    /** 没引用就拒 / Whether a missing proof reference is refused. */
    aMissingProofReferenceIsRefused(): boolean {
        return invoke(() => this.raw().aMissingProofReferenceIsRefused());
    }
    /** context 入口不校验引用来源 / Whether the context entry skips provenance. */
    theContextEntryDoesNotValidateItsReference(): boolean {
        return invoke(() => this.raw().theContextEntryDoesNotValidateItsReference());
    }
    /** 只有不可行结果能进 oracle / Whether only an infeasible result reaches the oracle. */
    onlyAnInfeasibleResultReachesTheOracle(): boolean {
        return invoke(() => this.raw().onlyAnInfeasibleResultReachesTheOracle());
    }
    /** 原样文本 / Verbatim text. */
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个 CP 变量的声明。 / One CP variable declaration. */
export interface CpVariableSpec {
    id: string;
    /** 区间下界（与 `upper` 一起用）。 */
    lower?: number;
    upper?: number;
    /** 稀疏值域（给了就忽略 `lower`/`upper`）。 */
    values?: number[];
    /** 与另一个变量共用一个**本地** ID（量"重复本地 ID"）。 */
    shareLocalIdWith?: string;
}

/** 一个 CP 约束的声明。 / One CP constraint declaration. */
export interface CpConstraintSpec {
    id: string;
    variable?: string;
    /** `lessOrEqual` / `greaterOrEqual` / `equal`。 */
    relation?: string;
    rhs?: number;
    group?: string;
    origin?: string;
    name?: string;
}

/** 一个约束组声明。 / One constraint-group declaration. */
export interface CpGroupSpec {
    id: number;
    name: string;
}

/** CP 模型 builder 探针请求。 / The CP model builder probe request. */
export interface CpModelBuildRequest {
    name?: string;
    /** 空串表示**显式置空**身份命名空间。 / An empty string blanks the identity namespace. */
    namespace?: string;
    schemaVersion?: string;
    variables?: CpVariableSpec[];
    constraints?: CpConstraintSpec[];
    /** `maximize` / `minimize`（空表示不设）。 */
    objective?: string;
    objectiveId?: string;
    objectiveVariable?: string;
    clearObjective?: boolean;
    groups?: CpGroupSpec[];
}

/**
 * CP 模型 builder 的**提交闸门**与指纹口径（续挖 `model/constraint_programming/model.rs` 的
 * `ConstraintProgrammingModel` + `freeze`）。前面几十单都在读**已冻结**的 snapshot，这一单量冻结这一步本身：
 *
 * 1. **`new` 自带身份**（`aNewModelAlreadyHasAnIdentity()`）：`model-local` / `1.0`，所以空模型也能冻结；
 *    只有**显式置空**才会在 `freeze` 被拒。
 * 2. **`registerVariable` 两道去重**（`registerVariableRefusesTwoKindsOfDuplicate()`）：重复稳定 ID 与重复
 *    **本地** ID 都拒。
 * 3. **`ConstraintDefinition::new` 把 name 预填成 id**（`aNewConstraintNamesItselfAfterItsId()`），所以默认路径
 *    上不可能出现"无名约束"。
 * 4. **`setObjective` 静默覆盖**（`setObjectiveSilentlyOverwrites()`）：没有"第二个目标"这种错误，只有最后一个。
 * 5. **`freeze` 重绑本地 ID**（`freezeRebindsLocalIdsToCanonicalIndices()`）：快照里的本地 ID 是
 *    `standalone(index)`，**注册顺序被丢弃**，只剩稳定 ID 顺序。
 * 6. **模型名不进指纹**（`theModelNameIsNotInTheFingerprint()`）：只差名字的两个模型指纹相同。
 * 7. **组 id 不许改绑**（`aGroupIdMayNotBeRebound()`）：空白名拒、同 id 换名拒、同 id 同名与不同 id 同名都收。
 * 8. **`freeze` 才是引用完整性闸门**（`freezeIsTheReferenceIntegrityGate()`）：约束或目标引用未注册变量，都在
 *    冻结时被拒；`addConstraint` 自己不查引用。
 *
 * The **commit gates** of the CP model builder and what its fingerprint covers. **`new` already carries an identity**, so
 * an empty model freezes fine and only an explicit blank is refused. **Registration refuses two kinds of duplicate.**
 * **A new constraint names itself after its ID.** **`setObjective` silently overwrites.** **`freeze` rebinds local IDs to
 * canonical indices**, discarding registration order. **The model name is not in the fingerprint.** **A group ID may not be
 * rebound.** And **`freeze` is the reference integrity gate** — a dangling constraint or objective dies there, not at
 * insertion.
 */
export class CpModelBuildReport {
    private constructor(private state: CpModelBuildBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): CpModelBuildReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected CP model build report text");
        }
        return invoke(() => new CpModelBuildReport(wasm().CpModelBuildReport.fromJson(json)));
    }
    private raw(): CpModelBuildBinding {
        if (!this.state) throw new OspfError("Disposed", "CP model build report has been disposed");
        return this.state;
    }
    accepted(): boolean { return invoke(() => this.raw().accepted()); }
    /** 被拒文案（无则空串） / The refusal message (empty when accepted). */
    refusal(): string { return invoke(() => this.raw().refusal()); }
    /** 被拒发生在哪一步 / Which step refused. */
    refusalStage(): string { return invoke(() => this.raw().refusalStage()); }
    /** 冻结后的模型名 / The frozen model's name. */
    modelName(): string { return invoke(() => this.raw().modelName()); }
    namespace(): string { return invoke(() => this.raw().namespace()); }
    schemaVersion(): string { return invoke(() => this.raw().schemaVersion()); }
    /** 快照指纹 / The snapshot fingerprint. */
    fingerprint(): string { return invoke(() => this.raw().fingerprint()); }
    variableCount(): number { return invoke(() => this.raw().variableCount()); }
    variableIdAt(position: number): string { return invoke(() => this.raw().variableIdAt(position)); }
    /** 第 `position` 个**本地**变量 ID（`index:0`）。 / The local variable ID at `position`. */
    variableLocalIdAt(position: number): string {
        return invoke(() => this.raw().variableLocalIdAt(position));
    }
    variableDomainAt(position: number): string {
        return invoke(() => this.raw().variableDomainAt(position));
    }
    constraintCount(): number { return invoke(() => this.raw().constraintCount()); }
    constraintIdAt(position: number): string {
        return invoke(() => this.raw().constraintIdAt(position));
    }
    constraintNameAt(position: number): string {
        return invoke(() => this.raw().constraintNameAt(position));
    }
    objectiveId(): string { return invoke(() => this.raw().objectiveId()); }
    /** `minimum` / `maximum`（无目标时为空串）。 */
    objectiveCategory(): string { return invoke(() => this.raw().objectiveCategory()); }
    groupCount(): number { return invoke(() => this.raw().groupCount()); }
    /** 第 `index` 个组文字（`id:name`）。 / The group text at `index`. */
    groupAt(index: number): string { return invoke(() => this.raw().groupAt(index)); }
    /** `new` 自带身份 / Whether `new` already carries an identity. */
    aNewModelAlreadyHasAnIdentity(): boolean {
        return invoke(() => this.raw().aNewModelAlreadyHasAnIdentity());
    }
    /** 两道去重 / Whether registration refuses two kinds of duplicate. */
    registerVariableRefusesTwoKindsOfDuplicate(): boolean {
        return invoke(() => this.raw().registerVariableRefusesTwoKindsOfDuplicate());
    }
    /** 约束名由 id 预填 / Whether a new constraint names itself after its ID. */
    aNewConstraintNamesItselfAfterItsId(): boolean {
        return invoke(() => this.raw().aNewConstraintNamesItselfAfterItsId());
    }
    /** 目标静默覆盖 / Whether `setObjective` silently overwrites. */
    setObjectiveSilentlyOverwrites(): boolean {
        return invoke(() => this.raw().setObjectiveSilentlyOverwrites());
    }
    /** 本地 ID 被重绑 / Whether `freeze` rebinds local IDs. */
    freezeRebindsLocalIdsToCanonicalIndices(): boolean {
        return invoke(() => this.raw().freezeRebindsLocalIdsToCanonicalIndices());
    }
    /** 模型名不进指纹 / Whether the model name is absent from the fingerprint. */
    theModelNameIsNotInTheFingerprint(): boolean {
        return invoke(() => this.raw().theModelNameIsNotInTheFingerprint());
    }
    /** 组 id 不许改绑 / Whether a group ID may not be rebound. */
    aGroupIdMayNotBeRebound(): boolean {
        return invoke(() => this.raw().aGroupIdMayNotBeRebound());
    }
    /** `freeze` 是引用完整性闸门 / Whether `freeze` is the reference integrity gate. */
    freezeIsTheReferenceIntegrityGate(): boolean {
        return invoke(() => this.raw().freezeIsTheReferenceIntegrityGate());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条快照赋值条目。 / One snapshot assignment entry. */
export interface SnapshotValueSpec {
    id: string;
    value: number;
}

/** CP 快照读侧闸门探针请求。 / The snapshot read-gate probe request. */
export interface SnapshotGateRequest {
    /** 冻结后要施加的篡改（空表示原样）。 */
    mutations?: string[];
    /** `validateHint` 的输入。 */
    hint?: SnapshotValueSpec[];
    /** `objectiveValue` 的输入（空表示不调用）。 */
    evaluation?: SnapshotValueSpec[];
}

/**
 * CP 快照自己的**读侧闸门**（续挖 `model/constraint_programming/snapshot.rs` 的
 * `ConstraintProgrammingSnapshot`）。第 70 单量 builder 的写侧，这一单量读侧：一份快照交回来之后，谁能证明它
 * 没被改过。
 *
 * 1. **已冻结快照上 `validateIdentity` 恒真且幂等**（`aFrozenSnapshotAlwaysValidates()`）。
 * 2. **空白身份是第一道闸门**（`aBlankIdentityIsTheFirstGate()`）：namespace 先于 schema 版本。
 * 3. **顺序检查有两道，前一道遮蔽后一道**（`theCollectionOrderGateShadowsTheSortGate()`）：
 *    `canonicalized()` 的整结构比对排在逐集合单调检查**之前**且自己会排序，所以手工打乱顺序只会撞
 *    `"non-canonical collection order"`，那句 `"not in canonical stable-ID order"` **观察不到**。
 * 4. **模型名不在指纹里，约束名在**（`theModelNameIsOutsideTheFingerprintButConstraintNamesAreInside()`）：
 *    改模型名仍合法；改任一约束名立刻 `"fingerprint does not match canonical content"`。
 * 5. **空白组名在指纹比对之前被拒**（`aBlankGroupNameIsRefusedBeforeTheFingerprint()`）。
 * 6. **`validateHint` 是部分赋值闸门**（`aHintMayCoverLessThanEveryVariable()`）：不要求覆盖全部变量、
 *    不查约束、**空映射恒过**。
 * 7. **`objectiveVariables` 只看目标**（`objectiveVariablesIgnoreConstraints()`）。
 * 8. **artifact codec 三道关**（`theArtifactCodecChecksThreeThings()`）：schema 版本、kind、digest，
 *    且解码后要求输入**逐字节等于**重新编码的结果。
 *
 * The CP snapshot's own **read-side gates**. **`validateIdentity` is always true and idempotent on a frozen snapshot.**
 * **A blank identity is the first gate** (namespace before schema version). **The collection-order gate shadows the sort
 * gate** — `canonicalized()` runs first and sorts, so hand-shuffling only ever hits `"non-canonical collection order"`.
 * **The model name sits outside the fingerprint while constraint names sit inside it.** **A blank group name is refused
 * before the fingerprint comparison.** **`validateHint` is a partial-assignment gate** — an empty map always passes and
 * constraints are never evaluated. **`objectiveVariables` only looks at the objective.** And **the artifact codec checks
 * three things** (schema version, kind, digest) then requires a **byte-for-byte** re-encoding.
 */
export class SnapshotGateReport {
    private constructor(private state: SnapshotGateBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): SnapshotGateReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected snapshot gate report text");
        }
        return invoke(() => new SnapshotGateReport(wasm().SnapshotGateReport.fromJson(json)));
    }
    private raw(): SnapshotGateBinding {
        if (!this.state) throw new OspfError("Disposed", "snapshot gate report has been disposed");
        return this.state;
    }
    /** 施加的篡改条数 / The number of tamperings applied. */
    mutationCount(): number { return invoke(() => this.raw().mutationCount()); }
    mutationAt(index: number): string { return invoke(() => this.raw().mutationAt(index)); }
    identityAccepted(): boolean { return invoke(() => this.raw().identityAccepted()); }
    identityRefusal(): string { return invoke(() => this.raw().identityRefusal()); }
    identityIsIdempotent(): boolean { return invoke(() => this.raw().identityIsIdempotent()); }
    modelName(): string { return invoke(() => this.raw().modelName()); }
    fingerprint(): string { return invoke(() => this.raw().fingerprint()); }
    variableCount(): number { return invoke(() => this.raw().variableCount()); }
    variableIdAt(index: number): string { return invoke(() => this.raw().variableIdAt(index)); }
    constraintCount(): number { return invoke(() => this.raw().constraintCount()); }
    constraintIdAt(index: number): string { return invoke(() => this.raw().constraintIdAt(index)); }
    constraintNameAt(index: number): string {
        return invoke(() => this.raw().constraintNameAt(index));
    }
    groupCount(): number { return invoke(() => this.raw().groupCount()); }
    groupAt(index: number): string { return invoke(() => this.raw().groupAt(index)); }
    /** `validateHint` 是否通过（未调用时为 `undefined`）。 */
    hintAccepted(): boolean | undefined { return invoke(() => this.raw().hintAccepted()); }
    hintRefusal(): string { return invoke(() => this.raw().hintRefusal()); }
    objectiveVariableCount(): number {
        return invoke(() => this.raw().objectiveVariableCount());
    }
    objectiveVariableAt(index: number): string {
        return invoke(() => this.raw().objectiveVariableAt(index));
    }
    /** `objectiveValue` 的读数（未调用时为 `undefined`）。 */
    objectiveValue(): number | undefined { return invoke(() => this.raw().objectiveValue()); }
    objectiveValueRefusal(): string {
        return invoke(() => this.raw().objectiveValueRefusal());
    }
    artifactEncoded(): boolean { return invoke(() => this.raw().artifactEncoded()); }
    artifactDigest(): string { return invoke(() => this.raw().artifactDigest()); }
    artifactRoundTrips(): boolean { return invoke(() => this.raw().artifactRoundTrips()); }
    /** 已冻结快照恒真 / Whether a frozen snapshot always validates. */
    aFrozenSnapshotAlwaysValidates(): boolean {
        return invoke(() => this.raw().aFrozenSnapshotAlwaysValidates());
    }
    /** 空白身份是第一道闸门 / Whether a blank identity is the first gate. */
    aBlankIdentityIsTheFirstGate(): boolean {
        return invoke(() => this.raw().aBlankIdentityIsTheFirstGate());
    }
    /** 顺序闸门遮蔽排序闸门 / Whether the collection-order gate shadows the sort gate. */
    theCollectionOrderGateShadowsTheSortGate(): boolean {
        return invoke(() => this.raw().theCollectionOrderGateShadowsTheSortGate());
    }
    /** 模型名在外、约束名在内 / Whether the model name is out and constraint names are in. */
    theModelNameIsOutsideTheFingerprintButConstraintNamesAreInside(): boolean {
        return invoke(() => this.raw().theModelNameIsOutsideTheFingerprintButConstraintNamesAreInside());
    }
    /** 空白组名先于指纹 / Whether a blank group name precedes the fingerprint. */
    aBlankGroupNameIsRefusedBeforeTheFingerprint(): boolean {
        return invoke(() => this.raw().aBlankGroupNameIsRefusedBeforeTheFingerprint());
    }
    /** hint 可少于全部变量 / Whether a hint may cover less than every variable. */
    aHintMayCoverLessThanEveryVariable(): boolean {
        return invoke(() => this.raw().aHintMayCoverLessThanEveryVariable());
    }
    /** 目标引用变量只看目标 / Whether `objectiveVariables` ignores constraints. */
    objectiveVariablesIgnoreConstraints(): boolean {
        return invoke(() => this.raw().objectiveVariablesIgnoreConstraints());
    }
    /** artifact codec 三道关 / Whether the artifact codec checks three things. */
    theArtifactCodecChecksThreeThings(): boolean {
        return invoke(() => this.raw().theArtifactCodecChecksThreeThings());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条约束的形状声明。 / One constraint shape declaration. */
export interface ConstraintShapeSpec {
    /** `and` / `or` / `xor` / `atMostOne` / `exactlyOne` / `allDifferent` / `allowedAssignments` /
     *  `forbiddenAssignments` / `noOverlap` / `cumulative` / `automaton` / `reservoir` / `circuit` / `integer`。 */
    kind: string;
    items?: string[];
}

/** 约束规范化探针请求。 / The constraint-canonicalization probe request. */
export interface ConstraintCanonRequest {
    constraints?: ConstraintShapeSpec[];
    /** 是否把每条约束的项**反序**（量"排序是否生效"）。 */
    reverseItems?: boolean;
}

/**
 * CP 约束 AST 的**规范化**（续挖 `model/constraint_programming/constraint.rs` 的 `canonicalize`）。
 * 它是 `pub(crate)`，所以只能通过 `freeze()` 观察——这正好是它真正生效的地方。
 *
 * 1. **五个布尔组合子按 `(稳定 ID, 是否取反)` 排序**（`theBooleanCombinatorsSortTheirLiterals()`）：
 *    `and` / `or` / `xor` / `atMostOne` / `exactlyOne`；同一 ID 的 positive 在 negated **之前**，所以
 *    `a` < `!a` < `b`——这是 `(id, negated)` 序，不是字符串序。
 * 2. **`allDifferent` 排表达式，两张表约束只排元组**（`theTableConstraintsSortTuplesNotExpressions()`）：
 *    `expressions` 保持原序——列序就是语义。
 * 3. **`noOverlap` 排区间 ID；`cumulative` 的 demand 次键不可观测**
 *    （`cumulativeSortsByIntervalAndItsDemandTiebreakIsUnreachable()`）——领域禁止同一区间出现两次。
 * 4. **`automaton` 按 `(from, value, to)` 排转移**（`theAutomatonSortsItsTransitionsOnly()`），
 *    `expressions` 与 `finalStates` 不动。
 * 5. **`reservoir` 按事件的规范字节排序**（`theReservoirSortsItsEvents()`）。
 * 6. **`circuit` / `element` / `integer` / `boolean` 一个都不碰**（`theUntouchedVariantsKeepTheirOrder()`）：
 *    落到 `_ => self.clone()`，因为这些变体的顺序**就是**语义。
 * 7. **它从不合并也从不化简**（`itNeverDedupsAndNeverSimplifies()`）：重复 literal 留着、单 literal 的 `and`
 *    仍然是 `and`。
 * 8. **指纹因此对"被排序的变体"顺序不敏感、对"没碰的变体"顺序敏感**
 *    （`theFingerprintIsOrderInsensitiveExactlyWhereSortingHappens()`）。
 *
 * The **normalization** of the CP constraint AST. **The five boolean combinators sort by `(stable ID, negated)`**, so
 * `a` < `!a` < `b` — that is the `(id, negated)` order, not string order. **`allDifferent` sorts expressions while the two
 * table constraints sort only tuples** (column order is the semantics). **`noOverlap` sorts interval IDs; `cumulative`'s
 * demand tiebreaker is unreachable** because the domain forbids a repeated interval. **`automaton` sorts its transitions
 * only.** **`reservoir` sorts its events.** **`circuit`/`element`/`integer`/`boolean` are untouched** because their order
 * *is* the semantics. **It never dedups and never simplifies.** And **the fingerprint is order-insensitive exactly where
 * sorting happens**.
 */
export class ConstraintCanonReport {
    private constructor(private state: ConstraintCanonBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): ConstraintCanonReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected constraint canonicalization report text");
        }
        return invoke(() => new ConstraintCanonReport(wasm().ConstraintCanonReport.fromJson(json)));
    }
    private raw(): ConstraintCanonBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "constraint canonicalization report has been disposed");
        }
        return this.state;
    }
    accepted(): boolean { return invoke(() => this.raw().accepted()); }
    /** 被拒文案（无则空串） / The refusal message (empty when accepted). */
    refusal(): string { return invoke(() => this.raw().refusal()); }
    /** 快照指纹（无则空串） / The snapshot fingerprint. */
    fingerprint(): string { return invoke(() => this.raw().fingerprint()); }
    constraintCount(): number { return invoke(() => this.raw().constraintCount()); }
    constraintIdAt(index: number): string {
        return invoke(() => this.raw().constraintIdAt(index));
    }
    /** 第 `index` 条约束的变体名 / The variant name at `index`. */
    constraintKindAt(index: number): string {
        return invoke(() => this.raw().constraintKindAt(index));
    }
    constraintItemCountAt(index: number): number {
        return invoke(() => this.raw().constraintItemCountAt(index));
    }
    constraintItemAt(index: number, position: number): string {
        return invoke(() => this.raw().constraintItemAt(index, position));
    }
    /** 五个布尔组合子排序 literal / Whether the boolean combinators sort their literals. */
    theBooleanCombinatorsSortTheirLiterals(): boolean {
        return invoke(() => this.raw().theBooleanCombinatorsSortTheirLiterals());
    }
    /** 两张表约束只排元组 / Whether the table constraints sort tuples, not expressions. */
    theTableConstraintsSortTuplesNotExpressions(): boolean {
        return invoke(() => this.raw().theTableConstraintsSortTuplesNotExpressions());
    }
    /** `cumulative` 的 demand 次键不可观测 / Whether the cumulative demand tiebreaker is unreachable. */
    cumulativeSortsByIntervalAndItsDemandTiebreakIsUnreachable(): boolean {
        return invoke(() => this.raw().cumulativeSortsByIntervalAndItsDemandTiebreakIsUnreachable());
    }
    /** `automaton` 只排转移 / Whether the automaton sorts its transitions only. */
    theAutomatonSortsItsTransitionsOnly(): boolean {
        return invoke(() => this.raw().theAutomatonSortsItsTransitionsOnly());
    }
    /** `reservoir` 排事件 / Whether the reservoir sorts its events. */
    theReservoirSortsItsEvents(): boolean {
        return invoke(() => this.raw().theReservoirSortsItsEvents());
    }
    /** 未碰的变体保持原序 / Whether the untouched variants keep their order. */
    theUntouchedVariantsKeepTheirOrder(): boolean {
        return invoke(() => this.raw().theUntouchedVariantsKeepTheirOrder());
    }
    /** 从不合并、从不化简 / Whether it never dedups and never simplifies. */
    itNeverDedupsAndNeverSimplifies(): boolean {
        return invoke(() => this.raw().itNeverDedupsAndNeverSimplifies());
    }
    /** 指纹恰在排序处不敏感 / Whether the fingerprint is order-insensitive exactly where sorting happens. */
    theFingerprintIsOrderInsensitiveExactlyWhereSortingHappens(): boolean {
        return invoke(() => this.raw().theFingerprintIsOrderInsensitiveExactlyWhereSortingHappens());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 赋值求值探针请求（`validateAssignment` 的求值顺序）。 / The assignment-evaluation probe request. */
export interface AssignmentEvalRequest {
    /** `s1` 的取值。 */ s1?: number;
    /** `s2` 的取值。 */ s2?: number;
    /** 固定时长（默认 2）。 */ duration?: number;
    /** presence 变量的取值（`0`/`1`）。 */ presence?: number;
    /** `cumulative` 的容量（默认 5）。 */ capacity?: number;
    /** 额外给一个未注册的变量（量"多给"）。 */ extra?: boolean;
    /** 少给一个变量（量"少给"）。 */ drop?: boolean;
    /** 让 `e1 ≠ s1 + duration`（量区间闸门）。 */ breakEnd?: boolean;
    /** presence 变量的域：`values`（稀疏，默认）或 `range`（区间 `0..=1`）。 */ presenceDomain?: string;
    /** 区间的 presence 是否为 `null`（mandatory）。 */ mandatory?: boolean;
}

/** 一个区间值的读面。 / One interval value's readable face. */
export interface IntervalValueView {
    id: string;
    start: number;
    end: number;
    duration: number;
}

/**
 * `validateAssignment` 的**求值顺序**（续挖 `model/constraint_programming/snapshot.rs`）。
 *
 * 1. **赋值必须恰好覆盖每个变量**（`theAssignmentMustCoverExactlyEveryVariable()`）：少给一个与多给一个报
 *    **同一句** "does not cover every registered variable"。
 * 2. **域检查先于一切区间求值**（`theDomainCheckRunsBeforeAnyInterval()`）：超域值先被拒。
 * 3. **`end` 必须等于 `start + duration`**（`anIntervalEndMustEqualStartPlusDuration()`）：这是**错误**
 *    而不是"不满足"——区间求值失败会让整份赋值非法。
 * 4. **缺席的可选区间被每条约束跳过**（`anAbsentOptionalIntervalIsSkippedByEveryConstraint()`）。
 * 5. **`cumulative` 在每个区间端点测负载**（`cumulativeMeasuresLoadAtEveryBoundary()`）。
 * 6. **违规点名的是规范序里的第一条**（`aViolationNamesTheFirstConstraintInCanonicalIdOrder()`）。
 * 7. **返回值是区间值映射**（`theReturnValueIsTheIntervalValueMap()`）：只含**在场**区间。
 * 8. **presence 变量必须是稀疏布尔域**（`aPresenceVariableMustHaveTheSparseBooleanDomain()`）：区间 `0..=1`
 *    在 `freeze` 就被拒。
 *
 * The **evaluation order** inside `validateAssignment`. **Coverage must be exact** — one too few and one too many share
 * **one** message. **The domain check runs before any interval evaluation.** **`end` must equal `start + duration`**, and a
 * mismatch is an **error** rather than "unsatisfied". **An absent optional interval is skipped by every constraint.**
 * **`cumulative` measures load at every boundary.** **A violation names the first constraint in canonical order.** **The
 * return value is the interval-value map** with entries only for present intervals. And **a presence variable must have
 * the sparse Boolean domain**, refused at freeze when written as the range `0..=1`.
 */
export class AssignmentEvalReport {
    private constructor(private state: AssignmentEvalBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): AssignmentEvalReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected assignment evaluation report text");
        }
        return invoke(() => new AssignmentEvalReport(wasm().AssignmentEvalReport.fromJson(json)));
    }
    private raw(): AssignmentEvalBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "assignment evaluation report has been disposed");
        }
        return this.state;
    }
    accepted(): boolean { return invoke(() => this.raw().accepted()); }
    refusal(): string { return invoke(() => this.raw().refusal()); }
    /** 被拒层：`freeze` / `coverage` / `domain` / `interval` / `constraint`（无则空串）。 */
    refusalLayer(): string { return invoke(() => this.raw().refusalLayer()); }
    intervalCount(): number { return invoke(() => this.raw().intervalCount()); }
    intervalIdAt(index: number): string { return invoke(() => this.raw().intervalIdAt(index)); }
    // `i64` 在 wasm-bindgen 侧是 `bigint`，读面统一收成 `number`。
    // `i64` crosses wasm-bindgen as `bigint`; the readable face narrows it to `number`.
    intervalStartAt(index: number): number {
        return invoke(() => Number(this.raw().intervalStartAt(index)));
    }
    intervalEndAt(index: number): number {
        return invoke(() => Number(this.raw().intervalEndAt(index)));
    }
    intervalDurationAt(index: number): number {
        return invoke(() => Number(this.raw().intervalDurationAt(index)));
    }
    theAssignmentMustCoverExactlyEveryVariable(): boolean {
        return invoke(() => this.raw().theAssignmentMustCoverExactlyEveryVariable());
    }
    theDomainCheckRunsBeforeAnyInterval(): boolean {
        return invoke(() => this.raw().theDomainCheckRunsBeforeAnyInterval());
    }
    anIntervalEndMustEqualStartPlusDuration(): boolean {
        return invoke(() => this.raw().anIntervalEndMustEqualStartPlusDuration());
    }
    anAbsentOptionalIntervalIsSkippedByEveryConstraint(): boolean {
        return invoke(() => this.raw().anAbsentOptionalIntervalIsSkippedByEveryConstraint());
    }
    cumulativeMeasuresLoadAtEveryBoundary(): boolean {
        return invoke(() => this.raw().cumulativeMeasuresLoadAtEveryBoundary());
    }
    aViolationNamesTheFirstConstraintInCanonicalIdOrder(): boolean {
        return invoke(() => this.raw().aViolationNamesTheFirstConstraintInCanonicalIdOrder());
    }
    theReturnValueIsTheIntervalValueMap(): boolean {
        return invoke(() => this.raw().theReturnValueIsTheIntervalValueMap());
    }
    aPresenceVariableMustHaveTheSparseBooleanDomain(): boolean {
        return invoke(() => this.raw().aPresenceVariableMustHaveTheSparseBooleanDomain());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个整数线性项的声明。 / One integer-linear term declaration. */
export interface ExpressionTermSpec {
    id: string;
    /** 整数系数（`0` 会被丢掉）。 */ coefficient: number;
}

/** 一个域的声明：`values` 非空即稀疏域，否则用 `lower`/`upper` 造区间。 */
export interface ExpressionDomainSpec {
    id: string;
    lower?: number;
    upper?: number;
    values?: number[];
}

/** 一条赋值条目。 / One assignment entry. */
export interface AssignmentValueSpec {
    id: string;
    value: number;
}

/** 表达式界探针请求。 / The expression-bounds probe request. */
export interface ExpressionBoundsRequest {
    constant: number;
    terms?: ExpressionTermSpec[];
    domains?: ExpressionDomainSpec[];
    assignment?: AssignmentValueSpec[];
}

/** 一个规范化后的项。 / One normalized term. */
export interface ExpressionTermView {
    id: string;
    coefficient: number;
}

/**
 * `IntegerExpression::bounds` 的**保守界**（续挖 `model/constraint_programming/expression.rs`）。
 *
 * 1. **`linear` 会合并重复稳定变量、丢掉零和项、按稳定 ID 排序**
 *    （`termsAreMergedSortedAndZeroFree()`）——所以 `validate_bindings` 的"零系数"闸门经公开构造器
 *    **不可达**；而"合并"只在**复用同一个变量实例**时才成立，两个独立构造的同名变量会被拒
 *    （"bound to multiple local identities"）。
 * 2. **负系数翻转区间两端**（`aNegativeCoefficientFlipsTheIntervalEnds()`）。
 * 3. **`bounds` 只读域的包络**（`boundsReadOnlyTheDomainHull()`）：稀疏域 `{0,10}` 给出 `[0,10]`，
 *    中间值落在界内却**不可达**。
 * 4. **纯常量表达式从不碰域**（`aConstantOnlyExpressionNeverTouchesADomain()`）。
 * 5. **缺域是错误而不是界**（`aMissingDomainIsAnErrorNotABound()`）。
 * 6. **`i128` 乘法闸门不可达，而 `i64` 导出闸门与累加闸门都可达**
 *    （`theMultiplicationGateIsUnreachableWhileTheOtherTwoAreNot()`）：`i64 × i64 < 2^126 < i128::MAX`，
 *    但单项 `i64::MAX²` 已超出 `i64`，三项之和已超出 `i128`。
 * 7. **`evaluate` 是精确的，而且不看域**（`evaluateIsExactAndNeverConsultsADomain()`）。
 * 8. **界恒包含每一个可达值**（`theBoundsAlwaysContainEveryReachableValue()`）。
 *
 * The **conservative bounds** of `IntegerExpression::bounds`. **`linear` merges duplicate stable variables, drops zero
 * sums and sorts by stable ID**, which makes the zero-coefficient gate **unreachable** through the public constructor —
 * and merging only happens when the **same variable instance** is reused. **A negative coefficient flips the ends.**
 * **The bounds read only the domain hull**: the sparse `{0,10}` yields `[0,10]` and the gap is unreachable. **A
 * constant-only expression never touches a domain.** **A missing domain is an error, not a bound.** **The `i128`
 * multiplication gate is unreachable while the `i64` export and accumulation gates are not.** **`evaluate` is exact and
 * never consults a domain.** And **the bounds always contain every reachable value**.
 */
export class ExpressionBoundsReport {
    private constructor(private state: ExpressionBoundsBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): ExpressionBoundsReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected expression bounds report text");
        }
        return invoke(() => new ExpressionBoundsReport(wasm().ExpressionBoundsReport.fromJson(json)));
    }
    private raw(): ExpressionBoundsBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "expression bounds report has been disposed");
        }
        return this.state;
    }
    accepted(): boolean { return invoke(() => this.raw().accepted()); }
    refusal(): string { return invoke(() => this.raw().refusal()); }
    constant(): number { return invoke(() => Number(this.raw().constant())); }
    termCount(): number { return invoke(() => this.raw().termCount()); }
    termIdAt(index: number): string { return invoke(() => this.raw().termIdAt(index)); }
    termCoefficientAt(index: number): number {
        return invoke(() => Number(this.raw().termCoefficientAt(index)));
    }
    /** 保守下界（无则 `undefined`）。 */ lower(): number | undefined {
        const bound = invoke(() => this.raw().lower());
        return bound === undefined ? undefined : Number(bound);
    }
    /** 保守上界（无则 `undefined`）。 */ upper(): number | undefined {
        const bound = invoke(() => this.raw().upper());
        return bound === undefined ? undefined : Number(bound);
    }
    /** 精确求值结果（无则 `undefined`）。 */ evaluated(): number | undefined {
        const value = invoke(() => this.raw().evaluated());
        return value === undefined ? undefined : Number(value);
    }
    termsAreMergedSortedAndZeroFree(): boolean {
        return invoke(() => this.raw().termsAreMergedSortedAndZeroFree());
    }
    aNegativeCoefficientFlipsTheIntervalEnds(): boolean {
        return invoke(() => this.raw().aNegativeCoefficientFlipsTheIntervalEnds());
    }
    boundsReadOnlyTheDomainHull(): boolean {
        return invoke(() => this.raw().boundsReadOnlyTheDomainHull());
    }
    aConstantOnlyExpressionNeverTouchesADomain(): boolean {
        return invoke(() => this.raw().aConstantOnlyExpressionNeverTouchesADomain());
    }
    aMissingDomainIsAnErrorNotABound(): boolean {
        return invoke(() => this.raw().aMissingDomainIsAnErrorNotABound());
    }
    theMultiplicationGateIsUnreachableWhileTheOtherTwoAreNot(): boolean {
        return invoke(() => this.raw().theMultiplicationGateIsUnreachableWhileTheOtherTwoAreNot());
    }
    evaluateIsExactAndNeverConsultsADomain(): boolean {
        return invoke(() => this.raw().evaluateIsExactAndNeverConsultsADomain());
    }
    theBoundsAlwaysContainEveryReachableValue(): boolean {
        return invoke(() => this.raw().theBoundsAlwaysContainEveryReachableValue());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个域的声明。 / One domain declaration. */
export interface DomainProbeSpec {
    id: string;
    lower?: number;
    upper?: number;
    /** 稀疏取值（非空即稀疏域）。 */ values?: number[];
    /** 是否**绕过构造器**直接搭结构（用来量 `validate`）。 */ raw?: boolean;
}

/** 域取值面探针请求。 / The domain value-surface probe request. */
export interface DomainProbeRequest {
    domains?: DomainProbeSpec[];
    /** 枚举上限（默认 8）。 */ maximumAmount?: number;
    /** 成员判定的探针值。 */ probes?: number[];
}

/** 一个域的读面。 / One domain's readable face. */
export interface DomainView {
    id: string;
    valid: boolean;
    invalidReason?: string;
    kind?: string;
    lower?: number;
    upper?: number;
    /** 基数（十进制字符串；`u128` 不能跨 JSON）。 */ cardinality?: string;
    isBoolean?: boolean;
    enumerated: number[];
    enumerationRefusal?: string;
    contains: boolean[];
}

/**
 * `IntegerDomain` 的**取值面**（续挖 `model/constraint_programming/domain.rs`）。
 *
 * 1. **`values` 在构造时排序并去重，而 `validate` 会拒掉反序列化重新引入的非规范形态**
 *    （`valuesAreSortedAndDedupedAtConstruction()`）：乱序、重复、空表、倒置区间四种都被点名。
 * 2. **区间从不被物化**（`aRangeIsNeverMaterialized()`）：基数纯算术，`[0, 1000000]` 不展开。
 * 3. **整个 `i64` 区间的基数恰好是 `2^64`**（`theFullI64RangeHasAU128Cardinality()`）：`i128` 中间量装得下，
 *    所以不溢出；`usize::MAX` 比它小 1，所以枚举永远够不到它。
 * 4. **`isBoolean` 只认稀疏 `{0,1}`**（`isBooleanAcceptsOnlyTheSparsePair()`）：`Range(0,1)` 不算布尔，
 *    而 `boolean()` 就是那个稀疏对。
 * 5. **枚举闸门是"大于才拒"**（`theEnumerationGateIsExclusiveAtTheBoundary()`）：基数等于上限通过，
 *    多 1 就拒，文案同时报出两个数。
 * 6. **枚举按闭区间从下界走到上界**（`enumerationWalksTheClosedInterval()`）：含两端，且 `upper = i64::MAX`
 *    靠相等收尾而不是溢出。
 * 7. **`contains` 是成员判定而不是包络判定**（`containsIsMembershipNotHull()`）：稀疏域的空洞不被包含。
 * 8. **同一组取值有两种规范字节**（`theSameValueSetHasTwoCanonicalEncodings()`）：`Range(0,1)` 与
 *    `Values([0,1])` 取值相同、指纹不同——域的形态进了指纹。
 *
 * The **value surface** of `IntegerDomain`. **`values` sorts and dedups at construction while `validate` refuses the
 * non-canonical shapes deserialization can reintroduce.** **A range is never materialized.** **The full `i64` range has
 * cardinality exactly `2^64`**, which fits the `i128` intermediate and which `usize` can never reach. **`isBoolean`
 * accepts only the sparse `{0,1}`.** **The enumeration gate refuses only when strictly greater.** **Enumeration walks the
 * closed interval** and terminates at `i64::MAX` by equality rather than overflow. **`contains` is membership, not hull.**
 * And **one value set has two canonical encodings**, so the domain shape enters the fingerprint.
 */
export class DomainProbeReport {
    private constructor(private state: DomainProbeBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): DomainProbeReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected domain surface report text");
        }
        return invoke(() => new DomainProbeReport(wasm().DomainProbeReport.fromJson(json)));
    }
    private raw(): DomainProbeBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "domain surface report has been disposed");
        }
        return this.state;
    }
    domainCount(): number { return invoke(() => this.raw().domainCount()); }
    domainIdAt(index: number): string { return invoke(() => this.raw().domainIdAt(index)); }
    domainValidAt(index: number): boolean { return invoke(() => this.raw().domainValidAt(index)); }
    domainInvalidReasonAt(index: number): string {
        return invoke(() => this.raw().domainInvalidReasonAt(index));
    }
    /** 形态：`range` / `values`（非法域为空串）。 */ domainKindAt(index: number): string {
        return invoke(() => this.raw().domainKindAt(index));
    }
    domainLowerAt(index: number): number {
        return invoke(() => Number(this.raw().domainLowerAt(index)));
    }
    domainUpperAt(index: number): number {
        return invoke(() => Number(this.raw().domainUpperAt(index)));
    }
    /** 基数（十进制串；`u128` 不能跨 JSON）。 */ domainCardinalityAt(index: number): string {
        return invoke(() => this.raw().domainCardinalityAt(index));
    }
    domainIsBooleanAt(index: number): boolean {
        return invoke(() => this.raw().domainIsBooleanAt(index));
    }
    domainEnumeratedCountAt(index: number): number {
        return invoke(() => this.raw().domainEnumeratedCountAt(index));
    }
    domainEnumeratedAt(index: number, position: number): number {
        return invoke(() => Number(this.raw().domainEnumeratedAt(index, position)));
    }
    domainEnumerationRefusalAt(index: number): string {
        return invoke(() => this.raw().domainEnumerationRefusalAt(index));
    }
    domainContainsAt(index: number, position: number): boolean {
        return invoke(() => this.raw().domainContainsAt(index, position));
    }
    valuesAreSortedAndDedupedAtConstruction(): boolean {
        return invoke(() => this.raw().valuesAreSortedAndDedupedAtConstruction());
    }
    aRangeIsNeverMaterialized(): boolean {
        return invoke(() => this.raw().aRangeIsNeverMaterialized());
    }
    theFullI64RangeHasAU128Cardinality(): boolean {
        return invoke(() => this.raw().theFullI64RangeHasAU128Cardinality());
    }
    isBooleanAcceptsOnlyTheSparsePair(): boolean {
        return invoke(() => this.raw().isBooleanAcceptsOnlyTheSparsePair());
    }
    theEnumerationGateIsExclusiveAtTheBoundary(): boolean {
        return invoke(() => this.raw().theEnumerationGateIsExclusiveAtTheBoundary());
    }
    enumerationWalksTheClosedInterval(): boolean {
        return invoke(() => this.raw().enumerationWalksTheClosedInterval());
    }
    containsIsMembershipNotHull(): boolean {
        return invoke(() => this.raw().containsIsMembershipNotHull());
    }
    theSameValueSetHasTwoCanonicalEncodings(): boolean {
        return invoke(() => this.raw().theSameValueSetHasTwoCanonicalEncodings());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个指纹的声明。 / One fingerprint declaration. */
export interface FingerprintSpec {
    schemaVersion?: string;
    algorithm?: string;
    value?: string;
}

/** 身份包装器探针请求。 / The identity-wrapper probe request. */
export interface IdentityWrapRequest {
    master: FingerprintSpec;
    solver: FingerprintSpec;
    factory: FingerprintSpec;
}

/** 一个包装器的读面。 / One wrapper's readable face. */
export interface IdentityWrapView {
    wrapper: string;
    accepted: boolean;
    refusal?: string;
    schemaVersion?: string;
    algorithm?: string;
    value?: string;
    wrapped?: string;
    identityVisible?: boolean;
}

/**
 * LBB 的**身份包装器**（续挖 `solver/logic_based_benders.rs` 的 `IdentifiedMaster` /
 * `IdentifiedSubproblemSolver` / `SnapshotSubproblemFactory`）。
 *
 * 1. **闸门只查"非空白"**（`theGateIsBlankOnly()`）：`schemaVersion` / `algorithm` / `value` 三项
 *    `trim()` 后都非空就通过——`"x"` 这种垃圾也过。
 * 2. **它不查十六进制、不查长度、不查算法词表**
 *    （`theGateChecksNeitherHexNorLengthNorVocabulary()`）：64 位十六进制与 `"z"` 同等通过。
 * 3. **master 与 subproblem 是两种文案**（`theMasterAndSubproblemMessagesDiffer()`）：
 *    "master fingerprint cannot contain blank fields" vs
 *    "subproblem factory fingerprint cannot contain blank fields"。
 * 4. **两个 subproblem 包装器共用一句文案**（`theTwoSubproblemWrappersShareOneMessage()`）。
 * 5. **"空白"是 `trim()` 意义上的**（`blankMeansTrimEmpty()`）：`"  "` 被拒，`" x "` 通过。
 * 6. **存下来的是原样**（`theFingerprintIsStoredVerbatim()`）：`" x "` 取回来仍是 `" x "`，不被修剪。
 * 7. **`intoInner` 原样归还被包装的值**（`intoInnerReturnsTheWrappedValue()`）。
 * 8. **包装把 `null` 变成可见**（`wrappingTurnsNoneIntoSome()`）：裸 solver 的
 *    `subproblemFactoryFingerprint()` 是 `null`，包一层后可见——这正是 checkpoint 恢复能看见身份的原因。
 *
 * The **identity wrappers** of LBB. **The gate is blank-only**: three `trim()`-non-empty fields pass and `"x"` passes
 * too. **It checks neither hex, nor length, nor a vocabulary.** **Master and subproblem use different messages** while
 * **the two subproblem wrappers share one**. **"Blank" means `trim()`-empty.** **The fingerprint is stored verbatim.**
 * **`intoInner` returns the wrapped value.** And **wrapping turns `null` into a visible identity**, which is exactly why
 * checkpoint restore can see one.
 */
export class IdentityWrapReport {
    private constructor(private state: IdentityWrapBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): IdentityWrapReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected identity wrap report text");
        }
        return invoke(() => new IdentityWrapReport(wasm().IdentityWrapReport.fromJson(json)));
    }
    private raw(): IdentityWrapBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "identity wrap report has been disposed");
        }
        return this.state;
    }
    wrapperCount(): number { return invoke(() => this.raw().wrapperCount()); }
    wrapperAt(index: number): string { return invoke(() => this.raw().wrapperAt(index)); }
    wrapperAcceptedAt(index: number): boolean {
        return invoke(() => this.raw().wrapperAcceptedAt(index));
    }
    wrapperRefusalAt(index: number): string {
        return invoke(() => this.raw().wrapperRefusalAt(index));
    }
    wrapperSchemaVersionAt(index: number): string {
        return invoke(() => this.raw().wrapperSchemaVersionAt(index));
    }
    wrapperAlgorithmAt(index: number): string {
        return invoke(() => this.raw().wrapperAlgorithmAt(index));
    }
    wrapperValueAt(index: number): string {
        return invoke(() => this.raw().wrapperValueAt(index));
    }
    wrapperWrappedAt(index: number): string {
        return invoke(() => this.raw().wrapperWrappedAt(index));
    }
    wrapperIdentityVisibleAt(index: number): boolean {
        return invoke(() => this.raw().wrapperIdentityVisibleAt(index));
    }
    theGateIsBlankOnly(): boolean { return invoke(() => this.raw().theGateIsBlankOnly()); }
    theGateChecksNeitherHexNorLengthNorVocabulary(): boolean {
        return invoke(() => this.raw().theGateChecksNeitherHexNorLengthNorVocabulary());
    }
    theMasterAndSubproblemMessagesDiffer(): boolean {
        return invoke(() => this.raw().theMasterAndSubproblemMessagesDiffer());
    }
    theTwoSubproblemWrappersShareOneMessage(): boolean {
        return invoke(() => this.raw().theTwoSubproblemWrappersShareOneMessage());
    }
    blankMeansTrimEmpty(): boolean { return invoke(() => this.raw().blankMeansTrimEmpty()); }
    theFingerprintIsStoredVerbatim(): boolean {
        return invoke(() => this.raw().theFingerprintIsStoredVerbatim());
    }
    intoInnerReturnsTheWrappedValue(): boolean {
        return invoke(() => this.raw().intoInnerReturnsTheWrappedValue());
    }
    wrappingTurnsNoneIntoSome(): boolean {
        return invoke(() => this.raw().wrappingTurnsNoneIntoSome());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个线性项的声明。 / One linear-term declaration. */
export interface ContainerTermSpec {
    coefficient: number;
    varIndex: number;
}

/** 容器面探针请求。 / The container-surface probe request. */
export interface ContainerProbeRequest {
    terms?: ContainerTermSpec[];
    constant: number;
    /** 是否在构造后改常数项（量"改值不改键"）。 */ mutateConstant?: boolean;
    newConstant?: number;
    /** 是否在构造后追加一个项。 */ append?: boolean;
    appended?: ContainerTermSpec;
}

/** 一个容器的读面。 / One container's readable face. */
export interface ContainerView {
    container: string;
    len: number;
    isEmpty: boolean;
    isConstantOnly: boolean;
    constant: number;
    monomialCount: number;
    /** 缓存键是否在改值前后保持不变（未改值时为 `null`）。 */ keyStable?: boolean;
    debugText: string;
}

/**
 * 展平层的**容器面**（续挖 `model/flatten/inner_box.rs` 的 `Linear` / `Quadratic` / `Canonical`）。
 *
 * 1. **`isEmpty()` 与 `isConstantOnly()` 是同一个谓词**
 *    （`isEmptyAndIsConstantOnlyAreOnePredicate()`）：两者都只读 `monomials.isEmpty()`，所以"空"**不是**
 *    "值为零"——常数项 5 的多项式也是"空"。
 * 2. **`len()` 只数单项式，永不数常数项**（`lenCountsMonomialsOnly()`）：`len() === 0` 仍有一个加数。
 * 3. **`zero(v)` 与 `constant(v)` 结构完全相同**（`zeroAndConstantAreTheSameShape()`）：都是"无单项式 +
 *    常数项"，所以 `zero(5)` **不是**零。
 * 4. **改值不改键**（`mutationKeepsTheCacheKey()`）：`setConstantTerm` / `addMonomial` 都在原来的 `Box` 里改，
 *    指针不动——于是缓存键在值变化后**保持不变**。拿地址当键，就必须自己保证缓存期间值不被改。
 * 5. **`addMonomial` 追加不合并**（`addMonomialAppendsWithoutMerging()`）。
 * 6. **三个容器都没有值相等**（`noValueEqualityAnywhere()`）：只 `Debug` + `Clone`，没有 `PartialEq`，
 *    所以"内容相同的两个多项式"在类型层面**不可比较**。
 * 7. **`fromLinear` 保留常数项并把 kind 抬成 `Linear`**
 *    （`fromLinearPreservesTheConstantAndLiftsTheKind()`）。
 * 8. **`clone()` 换键但不换文本**（`cloneChangesTheKeyButNotTheDebug()`）。
 *
 * The **container surface** of the flatten layer. **`isEmpty()` and `isConstantOnly()` are one predicate**, so "empty"
 * is **not** "zero" — a polynomial with constant 5 is "empty". **`len()` never counts the constant term.** **`zero(v)`
 * and `constant(v)` are the same shape**, so `zero(5)` is not zero. **Mutating the value keeps the cache key**, which
 * means address-keyed caching requires the caller to guarantee immutability. **`addMonomial` appends without merging.**
 * **None of the three containers has value equality.** **`fromLinear` preserves the constant and lifts the kind.** And
 * **`clone()` changes the key but not the debug text**.
 */
export class ContainerProbeReport {
    private constructor(private state: ContainerProbeBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): ContainerProbeReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected container surface report text");
        }
        return invoke(() => new ContainerProbeReport(wasm().ContainerProbeReport.fromJson(json)));
    }
    private raw(): ContainerProbeBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "container surface report has been disposed");
        }
        return this.state;
    }
    containerCount(): number { return invoke(() => this.raw().containerCount()); }
    containerAt(index: number): string { return invoke(() => this.raw().containerAt(index)); }
    containerLenAt(index: number): number { return invoke(() => this.raw().containerLenAt(index)); }
    containerIsEmptyAt(index: number): boolean {
        return invoke(() => this.raw().containerIsEmptyAt(index));
    }
    containerIsConstantOnlyAt(index: number): boolean {
        return invoke(() => this.raw().containerIsConstantOnlyAt(index));
    }
    containerConstantAt(index: number): number {
        return invoke(() => this.raw().containerConstantAt(index));
    }
    /** 缓存键是否在改值后保持不变（未改值时为 `null`）。 */
    containerKeyStableAt(index: number): boolean | null {
        const stable = invoke(() => this.raw().containerKeyStableAt(index));
        return stable === undefined ? null : stable;
    }
    containerDebugTextAt(index: number): string {
        return invoke(() => this.raw().containerDebugTextAt(index));
    }
    isEmptyAndIsConstantOnlyAreOnePredicate(): boolean {
        return invoke(() => this.raw().isEmptyAndIsConstantOnlyAreOnePredicate());
    }
    lenCountsMonomialsOnly(): boolean { return invoke(() => this.raw().lenCountsMonomialsOnly()); }
    zeroAndConstantAreTheSameShape(): boolean {
        return invoke(() => this.raw().zeroAndConstantAreTheSameShape());
    }
    mutationKeepsTheCacheKey(): boolean {
        return invoke(() => this.raw().mutationKeepsTheCacheKey());
    }
    addMonomialAppendsWithoutMerging(): boolean {
        return invoke(() => this.raw().addMonomialAppendsWithoutMerging());
    }
    noValueEqualityAnywhere(): boolean { return invoke(() => this.raw().noValueEqualityAnywhere()); }
    fromLinearPreservesTheConstantAndLiftsTheKind(): boolean {
        return invoke(() => this.raw().fromLinearPreservesTheConstantAndLiftsTheKind());
    }
    cloneChangesTheKeyButNotTheDebug(): boolean {
        return invoke(() => this.raw().cloneChangesTheKeyButNotTheDebug());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个变量的声明（激活集合探针用）。 / One variable declaration for the activation-set probe. */
export interface ActivationVariableSpec {
    id: string;
    /** 稀疏取值（非空即稀疏域，否则用 `0..=upper`）。 */ values?: number[];
    upper?: number;
}

/** 一条来源的声明。 / One source declaration. */
export interface ActivationSourceSpec {
    /** `constraint` / `lowerBound` / `upperBound` / `variableBound` / `sparseDomain`。 */
    kind: string;
    id?: string;
    /** `variableBound` 的方向：`lower` / `upper`。 */ side?: string;
}

/** 一次集合操作。 / One set operation. */
export interface ActivationOpSpec {
    source: ActivationSourceSpec;
    /** `activate` / `deactivate` / `insertActivate` / `insertDeactivate`。 */ op: string;
}

/** 激活集合探针请求。 / The activation-set probe request. */
export interface ActivationSetRequest {
    variables?: ActivationVariableSpec[];
    /** 是否给快照加一条约束（默认加）。 */ withConstraint?: boolean;
    /** 是否从快照起手（默认是）。 */ fromSnapshot?: boolean;
    ops?: ActivationOpSpec[];
    probes?: ActivationSourceSpec[];
}

/** 一条记录的读面。 / One record's readable face. */
export interface ActivationRecordView {
    kind: string;
    sourceStableId: string;
    state: string;
    stableId: string;
}

/**
 * 诊断**激活集合**的语义（续挖 `analysis/activation.rs` 的 `DiagnosticActivation` /
 * `ActivationState` / `DiagnosticActivationSet`）。这一单量的是"哪些原始证据参与了这次求解"这套账。
 *
 * 1. **`insert` 覆盖并移位**（`insertOverridesAndReorders()`）：同一来源再次插入时先删旧记录再追加，
 *    所以它既覆盖状态、又把它挪到末尾。
 * 2. **缺席即未激活**（`absenceMeansInactive()`）：`isActive` 只查"有没有一条激活记录"，**不是**
 *    "没有被停用"——从未出现的来源是未激活。
 * 3. **`activateSource` / `deactivateSource` 校验来源，而 `insert` 不校验**
 *    （`theTypedEntryPointsValidateButInsertDoesNot()`）：空白 ID 可以经 `insert` 进集合。
 * 4. **状态进身份**（`theStateEntersTheStableIdentity()`）：`activated:` / `deactivated:` 前缀。
 * 5. **`VariableLowerBound{x}` 与 `VariableBound{x, Lower}` 身份相同但互不相等**
 *    （`twoVariantsShareOneStableIdentity()`）：两者稳定身份都是 `variable:x:lower`，但 `PartialEq` 判不同，
 *    于是 `insert` 会**同时保留两条同身份记录**。本单最值钱的一条。
 * 6. **`toAssumptions` 永不为约束伪造 assumption**（`constraintsNeverBecomeAssumptions()`）。
 * 7. **`activeConstraints` 只收 `Constraint` 来源**（`activeConstraintsOnlyReadsConstraints()`）。
 * 8. **`fromSnapshot` 的激活面由域形态决定**（`fromSnapshotActivatesByDomainShape()`）：每个约束一条、
 *    每个变量上下界两条，稀疏域**额外**一条。
 *
 * The semantics of the diagnostic **activation set**. **`insert` overrides and re-orders.** **Absence means inactive.**
 * **The typed entry points validate while `insert` does not.** **The state enters the identity.** **`VariableLowerBound{x}`
 * and `VariableBound{x, Lower}` share one identity yet are not equal**, so `insert` keeps **two records with the same
 * identity**. **`toAssumptions` never fabricates assumptions for constraints.** **`activeConstraints` only reads
 * constraints.** And **`fromSnapshot`'s surface follows the domain shape**.
 */
export class ActivationSetReport {
    private constructor(private state: ActivationSetBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): ActivationSetReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected activation set report text");
        }
        return invoke(() => new ActivationSetReport(wasm().ActivationSetReport.fromJson(json)));
    }
    private raw(): ActivationSetBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "activation set report has been disposed");
        }
        return this.state;
    }
    len(): number { return invoke(() => this.raw().len()); }
    isEmpty(): boolean { return invoke(() => this.raw().isEmpty()); }
    recordKindAt(index: number): string { return invoke(() => this.raw().recordKindAt(index)); }
    recordSourceStableIdAt(index: number): string {
        return invoke(() => this.raw().recordSourceStableIdAt(index));
    }
    recordStateAt(index: number): string { return invoke(() => this.raw().recordStateAt(index)); }
    recordStableIdAt(index: number): string { return invoke(() => this.raw().recordStableIdAt(index)); }
    activeConstraintCount(): number { return invoke(() => this.raw().activeConstraintCount()); }
    activeConstraintAt(index: number): string {
        return invoke(() => this.raw().activeConstraintAt(index));
    }
    assumptionCount(): number { return invoke(() => this.raw().assumptionCount()); }
    assumptionAt(index: number): string { return invoke(() => this.raw().assumptionAt(index)); }
    probeCount(): number { return invoke(() => this.raw().probeCount()); }
    probeActiveAt(index: number): boolean { return invoke(() => this.raw().probeActiveAt(index)); }
    duplicateStableIdCount(): number { return invoke(() => this.raw().duplicateStableIdCount()); }
    duplicateStableIdAt(index: number): string {
        return invoke(() => this.raw().duplicateStableIdAt(index));
    }
    insertOverridesAndReorders(): boolean {
        return invoke(() => this.raw().insertOverridesAndReorders());
    }
    absenceMeansInactive(): boolean { return invoke(() => this.raw().absenceMeansInactive()); }
    theTypedEntryPointsValidateButInsertDoesNot(): boolean {
        return invoke(() => this.raw().theTypedEntryPointsValidateButInsertDoesNot());
    }
    theStateEntersTheStableIdentity(): boolean {
        return invoke(() => this.raw().theStateEntersTheStableIdentity());
    }
    twoVariantsShareOneStableIdentity(): boolean {
        return invoke(() => this.raw().twoVariantsShareOneStableIdentity());
    }
    constraintsNeverBecomeAssumptions(): boolean {
        return invoke(() => this.raw().constraintsNeverBecomeAssumptions());
    }
    activeConstraintsOnlyReadsConstraints(): boolean {
        return invoke(() => this.raw().activeConstraintsOnlyReadsConstraints());
    }
    fromSnapshotActivatesByDomainShape(): boolean {
        return invoke(() => this.raw().fromSnapshotActivatesByDomainShape());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条能力覆盖的声明（层级选择探针用）。 / One capability-override declaration. */
export interface TierOverrideSpec {
    /** `AnalysisCapability::stable_name()` 的那个词。 */ capability: string;
    /** `supported` / `conditional` / `unsupported`。 */ support: string;
}

/** 层级选择探针请求。 / The tier-selection probe request. */
export interface TierSelectionRequest {
    modelTypes?: string[];
    nativeAssumptionSolving?: boolean;
    nativeUnsatCore?: boolean;
    fallbackSatisfactionOnly?: boolean;
    dual?: boolean;
    exactCpLowering?: boolean;
    overrides?: TierOverrideSpec[];
}

/**
 * 冲突提取的**层级选择**（续挖 `analysis/activation.rs` 的 `ConflictExtractionTier`）。
 *
 * 1. **顺序即优先级**（`theOrderIsThePriority()`）：`native-unsat-core` 先于 `assumption-extraction`，
 *    两者都可用时选前者。
 * 2. **只有 `Supported` 能被选中，`Conditional` 不行**（`onlySupportedIsSelected()`）：判据是
 *    `isNative(..) || support(..) === supported`。
 * 3. **只有 fallback 的后端走 `repeated-solving`**（`aFallbackOnlyBackendLandsOnRepeatedSolving()`）：
 *    `assumptionSolving` 推断出 `conditional` 时不被选中。
 * 4. **覆盖能把 `assumptionSolving` 抬成可选中**（`anOverrideCanUpgradeTheSelection()`）。
 * 5. **覆盖成 `unsupported` 能把 fallback 关掉**（`anOverrideCanDisableTheFallback()`）：
 *    `repeated-solving` 还要求 `support(conflict) !== unsupported`。
 * 6. **`isNative()` 与"选中原生层"会脱钩**（`selectingTheNativeTierDoesNotMakeItNative()`）：把
 *    `nativeUnsatCore` 覆盖成 `supported` 能选中该层，但 `matrix.isNative()` 仍读布尔字段为 `false`。
 * 7. **四个词各有精确谓词**（`theFourTiersHaveExactPredicates()`）。
 * 8. **`asStr` 是四个稳定名**（`theStableNamesAreFourWords()`），与枚举序无关。
 *
 * The conflict-extraction **tier selection**. **The order is the priority.** **Only `supported` can be selected, never
 * `conditional`.** **A fallback-only backend lands on `repeated-solving`.** **An override can upgrade the selection**,
 * and **an override to `unsupported` can disable the fallback**. **Selecting the native tier does not make it native** —
 * `isNative` reads the booleans and bypasses overrides. **The four tiers have exact predicates**, and **`asStr` gives
 * four stable names**.
 */
export class TierSelectionReport {
    private constructor(private state: TierSelectionBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): TierSelectionReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected tier selection report text");
        }
        return invoke(() => new TierSelectionReport(wasm().TierSelectionReport.fromJson(json)));
    }
    private raw(): TierSelectionBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "tier selection report has been disposed");
        }
        return this.state;
    }
    selected(): string { return invoke(() => this.raw().selected()); }
    selectedIsNative(): boolean { return invoke(() => this.raw().selectedIsNative()); }
    selectedIsAvailable(): boolean { return invoke(() => this.raw().selectedIsAvailable()); }
    nativeUnsatCoreFlag(): boolean { return invoke(() => this.raw().nativeUnsatCoreFlag()); }
    nativeUnsatCoreSupport(): string { return invoke(() => this.raw().nativeUnsatCoreSupport()); }
    assumptionSolvingSupport(): string {
        return invoke(() => this.raw().assumptionSolvingSupport());
    }
    conflictSupport(): string { return invoke(() => this.raw().conflictSupport()); }
    theOrderIsThePriority(): boolean { return invoke(() => this.raw().theOrderIsThePriority()); }
    onlySupportedIsSelected(): boolean { return invoke(() => this.raw().onlySupportedIsSelected()); }
    aFallbackOnlyBackendLandsOnRepeatedSolving(): boolean {
        return invoke(() => this.raw().aFallbackOnlyBackendLandsOnRepeatedSolving());
    }
    anOverrideCanUpgradeTheSelection(): boolean {
        return invoke(() => this.raw().anOverrideCanUpgradeTheSelection());
    }
    anOverrideCanDisableTheFallback(): boolean {
        return invoke(() => this.raw().anOverrideCanDisableTheFallback());
    }
    selectingTheNativeTierDoesNotMakeItNative(): boolean {
        return invoke(() => this.raw().selectingTheNativeTierDoesNotMakeItNative());
    }
    theFourTiersHaveExactPredicates(): boolean {
        return invoke(() => this.raw().theFourTiersHaveExactPredicates());
    }
    theStableNamesAreFourWords(): boolean {
        return invoke(() => this.raw().theStableNamesAreFourWords());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个变量的声明（证据回映探针用）。 / One variable declaration for the evidence-remap probe. */
export interface EvidenceSourceVariableSpec {
    id: string;
    /** 稀疏取值（非空即稀疏域）。 */ values?: number[];
    upper?: number;
}

/** 一个额外激活来源的声明。 / One extra active-source declaration. */
export interface EvidenceSourceSpec {
    /** `constraint` / `lowerBound` / `upperBound` / `variableBound` / `sparseDomain` / `objectiveTarget`。 */
    kind: string;
    id?: string;
    /** `variableBound` 的方向：`lower` / `upper`。 */ side?: string;
}

/** 一条后端证据成员的声明。 / One backend-evidence member declaration. */
export interface EvidenceMemberSpec {
    /** `constraint` / `lowerBound` / `upperBound` / `domain` / `interval` / `assumption`。 */
    kind: string;
    /** 成员值（ID 或 assumption 身份）。 */ value: string;
}

/** 证据回映探针请求。 / The evidence-remap probe request. */
export interface EvidenceRemapRequest {
    variables?: EvidenceSourceVariableSpec[];
    withConstraint?: boolean;
    fromSnapshot?: boolean;
    extraSources?: EvidenceSourceSpec[];
    deactivatedSources?: EvidenceSourceSpec[];
    members?: EvidenceMemberSpec[];
}

/** 一个激活来源的读面。 / One active source's readable face. */
export interface EvidenceSourceView {
    kind: string;
    stableId: string;
    /** `kind:value`；缺失表示这一型没有成员。 */ member?: string;
    remapped: boolean;
}

/**
 * 后端证据的**回映**（续挖 `analysis/activation.rs` 的 `remapBackendEvidence` / `sourceOfAssumption`
 * 与 `analysis/mod.rs` 的 `DiagnosticSource::asInfeasibilityMember`）。
 *
 * 1. **`objectiveTarget` 没有证据成员**（`objectiveTargetsHaveNoEvidenceMember()`）：
 *    `asInfeasibilityMember` 对它返回 `None`，所以它永远回映不了。
 * 2. **`interval` 成员永远匹配不上**（`theIntervalMemberCanNeverMatch()`）：枚举里有这一型，
 *    但没有任何 `DiagnosticSource` 映射到它。
 * 3. **成员丢掉稀疏域的内容**（`asMemberDropsTheSparseDomainContent()`）：`sparseDomain` 只映射成
 *    `domain(变量名)`，值域内容不参与匹配。
 * 4. **直接成员无需走 assumption 路径**（`directMembersMatchWithoutTheAssumptionPath()`）。
 * 5. **assumption 路径靠共享身份命中 `variableBound`**（`theAssumptionPathReachesBoundVariants()`）：
 *    `sourceOfAssumption` 从不返回 `variableBound`，但由于第 78 单那条"两种变体共享一个稳定身份"，
 *    `variableBound{x, lower}` 仍能被 `assumption(lower-bound/...)` 回映。本单最值钱的一条。
 * 6. **未知成员被丢弃**（`unknownMembersAreDropped()`）。
 * 7. **停用记录不参与回映**（`deactivatedSourcesAreNeverRemapped()`）。
 * 8. **共享身份的两条记录不合并**（`sharedIdentityRecordsAreNotDeduped()`）：`remapped` 里出现两次。
 *
 * The **remapping of backend evidence**. **`objectiveTarget` has no evidence member**, so it can never be remapped.
 * **The `interval` member can never match** — the variant exists yet no source maps to it. **The member drops the
 * sparse-domain content.** **Direct members match without the assumption path.** **The assumption path reaches
 * `variableBound` through a shared identity** — `sourceOfAssumption` never returns one, yet delivery 78's shared stable
 * identity lets an `assumption` remap it. **Unknown members are dropped.** **Deactivated records never take part.**
 * And **two records with one identity are not deduped**.
 */
export class EvidenceRemapReport {
    private constructor(private state: EvidenceRemapBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): EvidenceRemapReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected evidence remap report text");
        }
        return invoke(() => new EvidenceRemapReport(wasm().EvidenceRemapReport.fromJson(json)));
    }
    private raw(): EvidenceRemapBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "evidence remap report has been disposed");
        }
        return this.state;
    }
    sourceCount(): number { return invoke(() => this.raw().sourceCount()); }
    sourceKindAt(index: number): string { return invoke(() => this.raw().sourceKindAt(index)); }
    sourceStableIdAt(index: number): string {
        return invoke(() => this.raw().sourceStableIdAt(index));
    }
    /** `undefined` 表示这一型没有成员。 / `undefined` means this kind has no member. */
    sourceMemberAt(index: number): string | undefined {
        return invoke(() => this.raw().sourceMemberAt(index));
    }
    sourceRemappedAt(index: number): boolean {
        return invoke(() => this.raw().sourceRemappedAt(index));
    }
    /** 回映条数，**可能多于来源数**（共享身份不合并）。 / The remap count; it may exceed the source count. */
    remappedCount(): number { return invoke(() => this.raw().remappedCount()); }
    remappedAt(index: number): string { return invoke(() => this.raw().remappedAt(index)); }
    assumptionCount(): number { return invoke(() => this.raw().assumptionCount()); }
    assumptionAt(index: number): string { return invoke(() => this.raw().assumptionAt(index)); }
    objectiveTargetsHaveNoEvidenceMember(): boolean {
        return invoke(() => this.raw().objectiveTargetsHaveNoEvidenceMember());
    }
    theIntervalMemberCanNeverMatch(): boolean {
        return invoke(() => this.raw().theIntervalMemberCanNeverMatch());
    }
    asMemberDropsTheSparseDomainContent(): boolean {
        return invoke(() => this.raw().asMemberDropsTheSparseDomainContent());
    }
    directMembersMatchWithoutTheAssumptionPath(): boolean {
        return invoke(() => this.raw().directMembersMatchWithoutTheAssumptionPath());
    }
    theAssumptionPathReachesBoundVariants(): boolean {
        return invoke(() => this.raw().theAssumptionPathReachesBoundVariants());
    }
    unknownMembersAreDropped(): boolean { return invoke(() => this.raw().unknownMembersAreDropped()); }
    deactivatedSourcesAreNeverRemapped(): boolean {
        return invoke(() => this.raw().deactivatedSourcesAreNeverRemapped());
    }
    sharedIdentityRecordsAreNotDeduped(): boolean {
        return invoke(() => this.raw().sharedIdentityRecordsAreNotDeduped());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一对目标向量（支配关系探针用）。 / One pair of objective vectors. */
export interface DominancePairSpec {
    lhs?: number[];
    rhs?: number[];
}

/** 支配关系探针请求。 / The dominance probe request. */
export interface DominanceRequest {
    /** `directions`（逐目标方向）或 `minimization`（全最小化）。 */ mode: string;
    /** `true` 表示最小化。 */ directions?: boolean[];
    /** `minimization` 模式的目标个数。 */ objectiveAmount?: number;
    pairs?: DominancePairSpec[];
    withReverse?: boolean;
}

/** 一对向量的结论。 / One pair's verdict. */
export interface DominancePairView {
    forward: boolean;
    reverse: boolean;
}

/**
 * 多目标优化的**支配关系**（续挖启发式层 `multi_objective/dominance.rs` 的 `Dominance` /
 * `ParetoDominance` / `MinimizationDominance`）。启发式层此前整块没绑过；这是它最底层的偏序判据，
 * 一个求解器、一个算子都不需要。
 *
 * 1. **它是严格偏序**（`theRelationIsAStrictPartialOrder()`）：不自反、不对称、可传递。
 * 2. **方向表短了就截断**（`aShorterDirectionListTruncatesTheComparison()`）：循环走
 *    `0..directions.length`，**多出来的目标维度被静默忽略**——所以"声明了几个方向"决定比几维，
 *    不是向量长度。
 * 3. **方向表长了就一律拒绝**（`aLongerDirectionListRefusesEveryComparison()`）：索引取不到直接 `false`。
 * 4. **`NaN` 被当作"相等"而不是"毒药"**（`nanCountsAsEqualNotAsPoison()`）：`<` 与 `>` 同时为假，
 *    于是既不 better 也不 worse；只要另一维严格更好，带 `NaN` 的向量**照样能支配**。本单最值钱的一条。
 * 5. **无穷按普通数值比较**（`infinitiesCompareNormally()`）。
 * 6. **空方向表永不支配**（`anEmptyDirectionListNeverDominates()`）。
 * 7. **`minimizationDominance` 是纯委托**（`minimizationIsAPureDelegation()`）：与
 *    `paretoDominance.minimization(n)` 逐项相同，内部字段私有、无访问器。
 * 8. **混合方向让两个向量互不可比**（`mixedDirectionsLeaveVectorsIncomparable()`）。
 *
 * 注意：`NaN` / `±inf` **过不了 JSON**（`JSON.stringify` 把它们写成 `null`），所以非有限语义由内部固定
 * 探针量出、只以规则读数跨层；请求侧收到非有限值会被显式拒绝。
 *
 * The **dominance relation** of multi-objective optimisation — the heuristic layer's bottom-most partial order, with no
 * solver and no operator. **The relation is a strict partial order.** **A short direction list truncates** — extra
 * objective axes are silently ignored, so the declared direction count, not the vector length, decides how many axes are
 * compared. **A long direction list refuses everything.** **`NaN` counts as equal rather than as poison**, so a `NaN`
 * vector still dominates when another axis is strictly better. **Infinities compare normally.** **An empty direction list
 * never dominates.** **`minimizationDominance` is a pure delegation** with a private field. And **mixed directions leave
 * vectors incomparable**. `NaN`/`±inf` cannot cross JSON, so their semantics are measured by internal probes and arrive
 * only as the rule readings.
 */
export class DominanceReport {
    private constructor(private state: DominanceBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): DominanceReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected dominance report text");
        }
        return invoke(() => new DominanceReport(wasm().DominanceReport.fromJson(json)));
    }
    private raw(): DominanceBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "dominance report has been disposed");
        }
        return this.state;
    }
    mode(): string { return invoke(() => this.raw().mode()); }
    comparedAxes(): number { return invoke(() => this.raw().comparedAxes()); }
    pairCount(): number { return invoke(() => this.raw().pairCount()); }
    forwardAt(index: number): boolean { return invoke(() => this.raw().forwardAt(index)); }
    reverseAt(index: number): boolean { return invoke(() => this.raw().reverseAt(index)); }
    theRelationIsAStrictPartialOrder(): boolean {
        return invoke(() => this.raw().theRelationIsAStrictPartialOrder());
    }
    aShorterDirectionListTruncatesTheComparison(): boolean {
        return invoke(() => this.raw().aShorterDirectionListTruncatesTheComparison());
    }
    aLongerDirectionListRefusesEveryComparison(): boolean {
        return invoke(() => this.raw().aLongerDirectionListRefusesEveryComparison());
    }
    nanCountsAsEqualNotAsPoison(): boolean {
        return invoke(() => this.raw().nanCountsAsEqualNotAsPoison());
    }
    infinitiesCompareNormally(): boolean {
        return invoke(() => this.raw().infinitiesCompareNormally());
    }
    anEmptyDirectionListNeverDominates(): boolean {
        return invoke(() => this.raw().anEmptyDirectionListNeverDominates());
    }
    minimizationIsAPureDelegation(): boolean {
        return invoke(() => this.raw().minimizationIsAPureDelegation());
    }
    mixedDirectionsLeaveVectorsIncomparable(): boolean {
        return invoke(() => this.raw().mixedDirectionsLeaveVectorsIncomparable());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个拥挤距离读数。 / One crowding reading. */
export interface CrowdingPointView {
    position: number;
    /** 是否为无穷（边界解）。 */ infinite: boolean;
    /** 有限距离；缺失表示无穷。 */ distance?: number;
}

/** 一层前沿。 / One front. */
export interface DispersionFrontView {
    members: number[];
    crowding: CrowdingPointView[];
}

/** 非支配排序与拥挤距离探针请求。 / The non-dominated-sort and crowding probe request. */
export interface DispersionRequest {
    /** `directions` 或 `minimization`。 */ mode: string;
    /** `true` 表示最小化。 */ directions?: boolean[];
    objectiveAmount?: number;
    /** 每个候选的目标向量（必须同维、有限）。 */ points?: number[][];
}

/**
 * NSGA-II 的**非支配排序与拥挤距离**（续挖启发式层 `multi_objective/non_dominated_sort.rs` 的
 * `FastNonDominatedSort` / `CrowdingDistance`）。继承第 81 单的支配关系。
 *
 * 1. **分层是一个划分**（`theFrontsPartitionTheCandidates()`）：所有候选恰好出现一次，不丢不重。
 * 2. **层内保持输入顺序**（`aFrontKeepsTheInputOrder()`）：按升序索引建，**不按"谁更优"排**。
 * 3. **第 0 层就是 Pareto 前沿**（`frontZeroIsTheParetoFront()`）：层内互不支配，层外必被层内支配。
 * 4. **重复点同层**（`duplicatesShareTheFirstFront()`）：完全相同的点互不支配，都留在最前层。
 * 5. **方向表截断会重排分层**（`aTruncatedDirectionListRegroupsTheFronts()`）：第 81 单那条
 *    "方向表短了只比前几维"在这里变成**分层结果不同**。
 * 6. **空种群没有层**（`anEmptyPopulationHasNoFront()`）。
 * 7. **常量轴上边界解照样无穷**（`theCrowdingBoundaryIsInfiniteEvenOnAConstantAxis()`）：边界赋值在
 *    `span <= 0` 的 `continue` **之前**，所以整列相等时首尾仍是 `inf`。本单最值钱的一条。
 * 8. **拥挤距离只按第一个点的维度数走**（`crowdingReadsTheFirstPointForTheAxisCount()`）：
 *    `objectives[0].iter()`——后续点多出来的维度被忽略；反过来会越界 panic，所以边界拒绝参差输入。
 *
 * 注意：拥挤距离的边界值是 `inf`，**过不了 JSON**，所以只以 `infinite` 布尔 + 可选 `distance` 跨层；
 * 请求侧收到非有限值被显式拒绝。
 *
 * The NSGA-II **non-dominated sorting and crowding distance** built on delivery 81's dominance relation.
 * **The layering is a partition.** **A front keeps the input order** and is **never sorted by quality**. **Front 0 is
 * the Pareto front.** **Duplicate points share the first front.** **A truncated direction list re-layers.** **An empty
 * population has no front.** **The crowding boundary is infinite even on a constant axis** because the boundary assignment
 * runs **before** the `span <= 0` `continue` — the most valuable finding here. And **crowding reads the first point for
 * the axis count**, ignoring extra axes on later points, while the mirror case would panic, which is why the boundary
 * refuses ragged input. Crowding boundary values are `inf` and cannot cross JSON, so they arrive as an `infinite` flag plus
 * an optional `distance`.
 */
export class DispersionReport {
    private constructor(private state: DispersionBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): DispersionReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected dispersion report text");
        }
        return invoke(() => new DispersionReport(wasm().DispersionReport.fromJson(json)));
    }
    private raw(): DispersionBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "dispersion report has been disposed");
        }
        return this.state;
    }
    mode(): string { return invoke(() => this.raw().mode()); }
    comparedAxes(): number { return invoke(() => this.raw().comparedAxes()); }
    frontCount(): number { return invoke(() => this.raw().frontCount()); }
    totalMembers(): number { return invoke(() => this.raw().totalMembers()); }
    allCrowdingInfinite(): boolean { return invoke(() => this.raw().allCrowdingInfinite()); }
    memberCountAt(front: number): number { return invoke(() => this.raw().memberCountAt(front)); }
    memberAt(front: number, index: number): number {
        return invoke(() => this.raw().memberAt(front, index));
    }
    crowdingInfiniteAt(front: number, index: number): boolean {
        return invoke(() => this.raw().crowdingInfiniteAt(front, index));
    }
    /** 缺失表示无穷。 / Absent means infinite. */
    crowdingDistanceAt(front: number, index: number): number | undefined {
        return invoke(() => this.raw().crowdingDistanceAt(front, index));
    }
    theFrontsPartitionTheCandidates(): boolean {
        return invoke(() => this.raw().theFrontsPartitionTheCandidates());
    }
    aFrontKeepsTheInputOrder(): boolean { return invoke(() => this.raw().aFrontKeepsTheInputOrder()); }
    frontZeroIsTheParetoFront(): boolean {
        return invoke(() => this.raw().frontZeroIsTheParetoFront());
    }
    duplicatesShareTheFirstFront(): boolean {
        return invoke(() => this.raw().duplicatesShareTheFirstFront());
    }
    aTruncatedDirectionListRegroupsTheFronts(): boolean {
        return invoke(() => this.raw().aTruncatedDirectionListRegroupsTheFronts());
    }
    anEmptyPopulationHasNoFront(): boolean {
        return invoke(() => this.raw().anEmptyPopulationHasNoFront());
    }
    theCrowdingBoundaryIsInfiniteEvenOnAConstantAxis(): boolean {
        return invoke(() => this.raw().theCrowdingBoundaryIsInfiniteEvenOnAConstantAxis());
    }
    crowdingReadsTheFirstPointForTheAxisCount(): boolean {
        return invoke(() => this.raw().crowdingReadsTheFirstPointForTheAxisCount());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一对（目标向量、参考方向）。 / One (objective vector, reference direction) pair. */
export interface ReferencePairSpec {
    objectives?: number[];
    reference?: number[];
}

/** 参考点探针请求。 / The reference-points probe request. */
export interface ReferencePointsRequest {
    /** 目标维度 `m`。 */ objectiveAmount: number;
    /** 每维的分割数。 */ divisions: number;
    pairs?: ReferencePairSpec[];
}

/** 一对的垂直距离读数。 / One pair's perpendicular-distance reading. */
export interface ReferencePairView {
    /** 距离是否为无穷。 */ infinite: boolean;
    /** 有限距离；缺失表示无穷。 */ distance?: number;
}

/**
 * NSGA-III 的**参考点**（续挖启发式层 `multi_objective/reference_points.rs` 的 `ReferencePoints`）。
 * 承接第 81/82 单的偏序与分层。
 *
 * 1. **点数就是单纯形格点数**（`thePointCountFollowsTheSimplexLattice()`）：
 *    `C(divisions + m - 1, m - 1)` —— `(2,4)=5`、`(3,4)=15`、`(2,1)=2`、`(4,2)=10`。
 * 2. **非法维度给空表而不是 panic**（`anIllegalDimensionYieldsAnEmptyList()`）：
 *    `objectiveAmount === 0` 或 `divisions === 0` 一律空表。
 * 3. **一个目标必塌成单位点**（`oneObjectiveCollapsesToTheUnitPoint()`）：`(1, n)` 恒为 `[[1.0]]`。
 * 4. **每个点坐标和为 1**（`everyPointSumsToOneMeasured()`）：`share / divisions` 的构造保证。
 * 5. **顺序按首坐标字典序**（`theOrderIsLexicographicInTheFirstCoordinate()`）：输出顺序确定、可复现。
 * 6. **距离忽略参考方向之外的维度**（`theDistanceIgnoresObjectivesBeyondTheReference()`）。
 * 7. **缺目标或零参考都是无穷**（`aMissingObjectiveOrAZeroReferenceIsInfinite()`）：`get()` 取不到 → `inf`；
 *    参考范数 ≤ 1e-12 → `inf`。
 * 8. **距离对参考方向的尺度不变**（`theDistanceIsInvariantToReferenceScaling()`）：投影按范数归一，
 *    `[1,0]` 与 `[2,0]`、`[100,0]` 同值。
 *
 * 注意：无穷值**过不了 JSON**，所以只以 `infinite` 布尔 + 可选 `distance` 跨层。
 *
 * The NSGA-III **reference points** built on deliveries 81/82. **The point count is the simplex lattice count**
 * `C(divisions + m - 1, m - 1)`. **An illegal dimension yields an empty list instead of a panic.** **One objective
 * collapses to the unit point.** **Every point sums to one.** **The order is lexicographic in the first coordinate.**
 * **The distance ignores objectives past the reference.** **A missing objective or a zero reference is infinite.** And
 * **the distance is invariant to reference scaling**. Infinite values cannot cross JSON, so they arrive as an
 * `infinite` flag plus an optional `distance`.
 */
export class ReferencePointsReport {
    private constructor(private state: ReferencePointsBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): ReferencePointsReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected reference points report text");
        }
        return invoke(() => new ReferencePointsReport(wasm().ReferencePointsReport.fromJson(json)));
    }
    private raw(): ReferencePointsBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "reference points report has been disposed");
        }
        return this.state;
    }
    objectiveAmount(): number { return invoke(() => this.raw().objectiveAmount()); }
    divisions(): number { return invoke(() => this.raw().divisions()); }
    pointCount(): number { return invoke(() => this.raw().pointCount()); }
    axisWidth(): number { return invoke(() => this.raw().axisWidth()); }
    everyPointSumsToOne(): boolean { return invoke(() => this.raw().everyPointSumsToOne()); }
    pointAxisCountAt(point: number): number {
        return invoke(() => this.raw().pointAxisCountAt(point));
    }
    pointCoordinateAt(point: number, axis: number): number {
        return invoke(() => this.raw().pointCoordinateAt(point, axis));
    }
    pairCount(): number { return invoke(() => this.raw().pairCount()); }
    pairInfiniteAt(index: number): boolean {
        return invoke(() => this.raw().pairInfiniteAt(index));
    }
    /** 缺失表示无穷。 / Absent means infinite. */
    pairDistanceAt(index: number): number | undefined {
        return invoke(() => this.raw().pairDistanceAt(index));
    }
    thePointCountFollowsTheSimplexLattice(): boolean {
        return invoke(() => this.raw().thePointCountFollowsTheSimplexLattice());
    }
    anIllegalDimensionYieldsAnEmptyList(): boolean {
        return invoke(() => this.raw().anIllegalDimensionYieldsAnEmptyList());
    }
    oneObjectiveCollapsesToTheUnitPoint(): boolean {
        return invoke(() => this.raw().oneObjectiveCollapsesToTheUnitPoint());
    }
    everyPointSumsToOneMeasured(): boolean {
        return invoke(() => this.raw().everyPointSumsToOneMeasured());
    }
    theOrderIsLexicographicInTheFirstCoordinate(): boolean {
        return invoke(() => this.raw().theOrderIsLexicographicInTheFirstCoordinate());
    }
    theDistanceIgnoresObjectivesBeyondTheReference(): boolean {
        return invoke(() => this.raw().theDistanceIgnoresObjectivesBeyondTheReference());
    }
    aMissingObjectiveOrAZeroReferenceIsInfinite(): boolean {
        return invoke(() => this.raw().aMissingObjectiveOrAZeroReferenceIsInfinite());
    }
    theDistanceIsInvariantToReferenceScaling(): boolean {
        return invoke(() => this.raw().theDistanceIsInvariantToReferenceScaling());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 有界 Pareto 档案探针请求。 / The bounded-archive probe request. */
export interface ArchiveRequest {
    /** 容量（超过就按拥挤距离裁剪）。 */ capacity: number;
    /** `directions` 或 `minimization`。 */ mode: string;
    /** `true` 表示最小化。 */ directions?: boolean[];
    objectiveAmount?: number;
    /** 依次提交的批次。 */ batches?: number[][][];
    /** `batch`（每批一次 offer）或 `single`（每个候选一次 offerOne）。 */ offerMode: string;
}

/**
 * **有界 Pareto 档案**（续挖启发式层 `multi_objective/pareto_archive.rs` 的 `ParetoArchive`）。
 * 同一个文件族里唯一带可变状态的成员。
 *
 * 1. **被支配的候选直接丢弃**（`aDominatedCandidateIsDiscarded()`）：只在既有成员里查支配。
 * 2. **新来的支配谁就淘汰谁**（`aNewcomerEvictsTheMembersItDominates()`）。
 * 3. **重复目标向量先到者胜**（`aDuplicateObjectiveVectorKeepsTheFirstOffer()`）：比较是逐项精确相等，
 *    相等就 `continue`，后到的从不替换先到的。
 * 4. **不可比的候选照样进档案**（`anIncomparableCandidateIsKept()`）。
 * 5. **裁剪会按拥挤距离重排**（`trimReordersTheArchiveByCrowdingDistanceDescending()`）：
 *    先按距离降序（同距离按下标升序）再截断，所以幸存者顺序**不是插入顺序**。本单最值钱的一条。
 * 6. **容量 0 的档案恒空**（`aZeroCapacityArchiveStaysEmpty()`）。
 * 7. **`clear()` 清空**（`clearEmptiesTheArchive()`），清空后还能继续收。
 * 8. **整批只在末尾裁一次、逐个每插一个就裁，两者会分歧**
 *    （`aBatchTrimsOnceWhileOfferOneTrimsPerCandidate()`）：容量 3 的两批用例里整批留下 `[2,4]`、
 *    逐个留下 `[4,2]`；容量不裁时两条路径一致。
 *
 * The **bounded Pareto archive**, the only mutable-state member of that file family. **A dominated candidate is
 * discarded outright.** **A newcomer evicts every member it dominates.** **A duplicate objective vector keeps the first
 * offer.** **An incomparable candidate still enters.** **The trim reorders the archive by crowding distance** before
 * truncating, so the survivor order is **not** the insertion order — the most valuable finding here. **A zero-capacity
 * archive stays empty.** **`clear()` empties it** and it keeps accepting afterwards. And **a batch trims once at the end
 * while singles trim after every insert, so the two can disagree** (with capacity 3 the batch keeps `[2,4]` and the
 * singles keep `[4,2]`), while with no trimming both paths agree.
 */
export class ArchiveReport {
    private constructor(private state: ArchiveBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): ArchiveReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected archive report text");
        }
        return invoke(() => new ArchiveReport(wasm().ArchiveReport.fromJson(json)));
    }
    private raw(): ArchiveBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "archive report has been disposed");
        }
        return this.state;
    }
    capacity(): number { return invoke(() => this.raw().capacity()); }
    offerMode(): string { return invoke(() => this.raw().offerMode()); }
    size(): number { return invoke(() => this.raw().size()); }
    itemAxisCountAt(index: number): number {
        return invoke(() => this.raw().itemAxisCountAt(index));
    }
    itemCoordinateAt(index: number, axis: number): number {
        return invoke(() => this.raw().itemCoordinateAt(index, axis));
    }
    aDominatedCandidateIsDiscarded(): boolean {
        return invoke(() => this.raw().aDominatedCandidateIsDiscarded());
    }
    aNewcomerEvictsTheMembersItDominates(): boolean {
        return invoke(() => this.raw().aNewcomerEvictsTheMembersItDominates());
    }
    aDuplicateObjectiveVectorKeepsTheFirstOffer(): boolean {
        return invoke(() => this.raw().aDuplicateObjectiveVectorKeepsTheFirstOffer());
    }
    anIncomparableCandidateIsKept(): boolean {
        return invoke(() => this.raw().anIncomparableCandidateIsKept());
    }
    trimReordersTheArchiveByCrowdingDistanceDescending(): boolean {
        return invoke(() => this.raw().trimReordersTheArchiveByCrowdingDistanceDescending());
    }
    aZeroCapacityArchiveStaysEmpty(): boolean {
        return invoke(() => this.raw().aZeroCapacityArchiveStaysEmpty());
    }
    clearEmptiesTheArchive(): boolean { return invoke(() => this.raw().clearEmptiesTheArchive()); }
    aBatchTrimsOnceWhileOfferOneTrimsPerCandidate(): boolean {
        return invoke(() => this.raw().aBatchTrimsOnceWhileOfferOneTrimsPerCandidate());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条已计费的约束评估。 / One already-metered constraint assessment. */
export interface RankingAssessmentSpec {
    value: number;
    objective: number;
    violation: number;
}

/** 约束评估排序探针请求。 / The constraint-ranking probe request. */
export interface ConstraintRankingRequest {
    /** `epsilon` 或 `stochastic`。 */ mode: string;
    initialEpsilon?: number;
    horizon?: number;
    exponent?: number;
    step?: number;
    objectiveProbability?: number;
    seed?: number;
    entries?: RankingAssessmentSpec[];
}

/** 排序结果里的一条。 / One ranked entry. */
export interface RankingEntryView {
    value: number;
    objective: number;
    violation: number;
}

/**
 * **约束评估的两种排序**（续挖启发式层 `fitness/constraint_ranking.rs` 的 `ConstraintAssessment` /
 * `EpsilonConstraintEvaluator` / `StochasticRanking`）。
 *
 * 1. **容差内目标说了算**（`withinTheToleranceTheObjectiveDecides()`）：两条都 ≤ epsilon 时比目标，所以
 *    **违约更大但目标更好的条目可以排到违约为零的条目之前**。本单最值钱的一条。
 * 2. **收紧到零才回到违约优先**（`tighteningToZeroRestoresAViolationFirstRanking()`）：
 *    `epsilon = initial * ((1 - step/horizon).clamp(0,1))^exponent`，`step === horizon` 时 `epsilon === 0`。
 * 3. **超过 horizon 与恰好等于 horizon 相同**（`beyondTheHorizonBehavesLikeTheHorizon()`）：`clamp` 把负值截到 0。
 * 4. **违约相等时回落到目标**（`anEqualViolationFallsBackToTheObjective()`）：即使**都**在容差外。
 * 5. **排序是稳定的**（`theSortIsStableSoTiesKeepTheInputOrder()`）。
 * 6. **非法评估在排序前就被拒**（`anInvalidAssessmentIsRefused()`）：违约度为负、目标或违约非有限。
 * 7. **随机排序对同一 seed 可复现**（`theStochasticRankerIsReproducibleForAFixedSeed()`），且报告排序后的
 *    流状态（`randomStateHex()`，仅在随机模式下给出；`u64` 超出 JS 精度，只能以十六进制字符串跨层）。
 * 8. **可行对必按目标比**（`theStochasticRankerComparesFeasiblePairsByObjective()`）：`violation === 0` 的对
 *    **绕过**概率门，`objectiveProbability === 0` 时仍按目标排。
 *
 * The **two rankings over constraint assessments**. **Inside the tolerance the objective decides**, so an entry with a
 * larger violation but a better objective can precede a feasible entry — the most valuable finding here. **Only tightening
 * to zero returns to a violation-first ranking.** **Beyond the horizon behaves like the horizon.** **An equal violation
 * falls back to the objective** even outside the tolerance. **The sort is stable.** **An invalid assessment is refused
 * before ranking.** **The stochastic ranker is reproducible for a fixed seed** and reports the post-ranking stream state.
 * And **feasible pairs are always compared by objective** because the zero-violation bypass skips the probability gate.
 */
export class ConstraintRankingReport {
    private constructor(private state: ConstraintRankingBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): ConstraintRankingReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected constraint ranking report text");
        }
        return invoke(() => new ConstraintRankingReport(
            wasm().ConstraintRankingReport.fromJson(json)));
    }
    private raw(): ConstraintRankingBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "constraint ranking report has been disposed");
        }
        return this.state;
    }
    mode(): string { return invoke(() => this.raw().mode()); }
    rankedCount(): number { return invoke(() => this.raw().rankedCount()); }
    rankedValueAt(index: number): number { return invoke(() => this.raw().rankedValueAt(index)); }
    rankedObjectiveAt(index: number): number {
        return invoke(() => this.raw().rankedObjectiveAt(index));
    }
    rankedViolationAt(index: number): number {
        return invoke(() => this.raw().rankedViolationAt(index));
    }
    /**
     * 随机流状态，**十六进制定长字符串**（`undefined` 表示 `epsilon` 模式）。
     * 状态是 `u64`，超出 JS number 精度，所以只能以字符串跨层。
     *
     * The random-stream state as a fixed-width hex string (`undefined` in epsilon mode); a `u64` exceeds JS number
     * precision, so it can only cross as a string.
     */
    randomStateHex(): string | undefined { return invoke(() => this.raw().randomStateHex()); }
    withinTheToleranceTheObjectiveDecides(): boolean {
        return invoke(() => this.raw().withinTheToleranceTheObjectiveDecides());
    }
    tighteningToZeroRestoresAViolationFirstRanking(): boolean {
        return invoke(() => this.raw().tighteningToZeroRestoresAViolationFirstRanking());
    }
    beyondTheHorizonBehavesLikeTheHorizon(): boolean {
        return invoke(() => this.raw().beyondTheHorizonBehavesLikeTheHorizon());
    }
    anEqualViolationFallsBackToTheObjective(): boolean {
        return invoke(() => this.raw().anEqualViolationFallsBackToTheObjective());
    }
    theSortIsStableSoTiesKeepTheInputOrder(): boolean {
        return invoke(() => this.raw().theSortIsStableSoTiesKeepTheInputOrder());
    }
    anInvalidAssessmentIsRefused(): boolean {
        return invoke(() => this.raw().anInvalidAssessmentIsRefused());
    }
    theStochasticRankerIsReproducibleForAFixedSeed(): boolean {
        return invoke(() => this.raw().theStochasticRankerIsReproducibleForAFixedSeed());
    }
    theStochasticRankerComparesFeasiblePairsByObjective(): boolean {
        return invoke(() => this.raw().theStochasticRankerComparesFeasiblePairsByObjective());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 约束优先级探针请求。 / The constraint-priority probe request. */
export interface PriorityRequest {
    priorities?: number[];
}

/** 一条优先级的读面。 / One priority's readable face. */
export interface PriorityView {
    storage: number;
    /** `none` / `nice-to-have` / `suggested` / `mandatory` / `custom`。 */ variant: string;
    nonNull: boolean;
    /** 规范代表再写回存储值（应等于 `storage`）。 */ canonicalStorage: number;
    variantDebug: string;
}

/**
 * **约束优先级的双层身份**（续挖 `model/basic/constraint_priority.rs` 的 `ConstraintPriority` 与其统计
 * trait）。枚举身份与存储值是两层：
 *
 * 1. **有名阶梯是 `0 / 10 / 50 / 100`**（`theNamedLadderIs01050100()`）：间隔递增（10、40、50）。
 * 2. **存储往返只有一个方向精确**（`theStorageRoundTripIsExactInOneDirection()`）：`From(v).value() === v`
 *    对**每个** `u32` 成立，反方向不成立。
 * 3. **恰好四个存储值有两个表示**（`fourStorageValuesHaveTwoRepresentations()`）：`Custom(0/10/50/100)`
 *    与对应有名变体 `value()` 相同、相等性判不同，于是 `value()` **不是单射**。本单最值钱的一条。
 * 4. **`isNonNull()` 就是"存储值非零"**（`isNonNullIsExactlyANonzeroValue()`）：`Custom(0)` 也算空。
 * 5. **自定义优先级能落在阶梯任何位置**（`customPrioritiesSitAnywhereOnTheLadder()`）：`Custom(7)` 在
 *    `none(0)` 与 `nice-to-have(10)` 之间。
 * 6. **`linearTriadModel` 上的统计纯委托**（`theLinearWrapperDelegatesToTheBasicCount()`）。
 * 7. **统计读的是存储值而不是变体**（`theCountReadsStorageValuesNotVariants()`）。
 * 8. **包装从不改写存储值**（`theWrapperNeverChangesTheStorageValue()`）：含 `Custom(4294967295)`。
 *
 * The **two-layer identity** of a constraint priority. **The named ladder is `0 / 10 / 50 / 100`** with increasing gaps.
 * **The storage round trip is exact in one direction only.** **Exactly four storage values have two representations** —
 * `Custom(0/10/50/100)` share `value()` with the named variants yet differ in equality, so `value()` is **not injective**
 * — the most valuable finding here. **`isNonNull()` is exactly a non-zero storage value**, so `Custom(0)` is null. **Custom
 * priorities sit anywhere on the ladder.** **The `LinearTriadModel` stat is a pure delegation.** **The count reads storage
 * values not variants.** And **the wrapper never rewrites the storage value**.
 */
export class PriorityReport {
    private constructor(private state: PriorityBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): PriorityReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected priority report text");
        }
        return invoke(() => new PriorityReport(wasm().PriorityReport.fromJson(json)));
    }
    private raw(): PriorityBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "priority report has been disposed");
        }
        return this.state;
    }
    entryCount(): number { return invoke(() => this.raw().entryCount()); }
    storageAt(index: number): number { return invoke(() => this.raw().storageAt(index)); }
    variantAt(index: number): string { return invoke(() => this.raw().variantAt(index)); }
    nonNullAt(index: number): boolean { return invoke(() => this.raw().nonNullAt(index)); }
    canonicalStorageAt(index: number): number {
        return invoke(() => this.raw().canonicalStorageAt(index));
    }
    variantDebugAt(index: number): string { return invoke(() => this.raw().variantDebugAt(index)); }
    nonNullCount(): number { return invoke(() => this.raw().nonNullCount()); }
    basicCount(): number { return invoke(() => this.raw().basicCount()); }
    linearCount(): number { return invoke(() => this.raw().linearCount()); }
    theNamedLadderIs01050100(): boolean {
        return invoke(() => this.raw().theNamedLadderIs01050100());
    }
    theStorageRoundTripIsExactInOneDirection(): boolean {
        return invoke(() => this.raw().theStorageRoundTripIsExactInOneDirection());
    }
    fourStorageValuesHaveTwoRepresentations(): boolean {
        return invoke(() => this.raw().fourStorageValuesHaveTwoRepresentations());
    }
    isNonNullIsExactlyANonzeroValue(): boolean {
        return invoke(() => this.raw().isNonNullIsExactlyANonzeroValue());
    }
    customPrioritiesSitAnywhereOnTheLadder(): boolean {
        return invoke(() => this.raw().customPrioritiesSitAnywhereOnTheLadder());
    }
    theLinearWrapperDelegatesToTheBasicCount(): boolean {
        return invoke(() => this.raw().theLinearWrapperDelegatesToTheBasicCount());
    }
    theCountReadsStorageValuesNotVariants(): boolean {
        return invoke(() => this.raw().theCountReadsStorageValuesNotVariants());
    }
    theWrapperNeverChangesTheStorageValue(): boolean {
        return invoke(() => this.raw().theWrapperNeverChangesTheStorageValue());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 种群配置探针请求。 / The population-config probe request. */
export interface PopulationConfigRequest {
    size?: number;
    mutationRate?: number;
    archiveAmount?: number;
    /** 是否走 builder（否则结构体字面量）。 */ useBuilders?: boolean;
    swarmSize?: number;
    migrationPeriod?: number;
}

/** 种群配置探针结论。 / The population-config probe verdict. */
export interface PopulationConfigReportView {
    size: number;
    /** 非有限值以 `undefined` + `mutationRateInfinite` 表达。 */ mutationRate?: number;
    mutationRateInfinite: boolean;
    archiveAmount: number;
    usedBuilders: boolean;
    swarmSize: number;
    swarmHasEvaluator: boolean;
    migrationPeriod: number;
    islandCount: number;
}

/**
 * **种群配置的构造面**（续挖 `composition/population.rs` 的 `PopulationConfig` / `SwarmConfig` /
 * `IslandConfig`）。这一单按"真边界"的约定只绑**纯配置**：算子槽位一律用 crate 自己 `genetic()` 的默认组合
 * 来填，不碰任何算子本体。
 *
 * 1. **构造器的默认值是 `0.1` 与 `1`**（`theConstructorDefaultsArePointOneAndOne()`）。
 * 2. **`withMutationRate` 一点都不校验**（`theMutationRateBuilderValidatesNothing()`）：负数、`NaN`、大于 1 全照收。
 * 3. **`withArchiveAmount` 把 0 抬成 1**（`theArchiveAmountBuilderClampsZeroToOne()`）：0 是**唯一**被改写的值。
 * 4. **`size` 从不被钳制**（`theSizeIsNeverClamped()`）：0 照收。
 * 5. **builder 消费并返回同一个配置**（`theBuilderReturnsTheSameConfig()`）：两个字段的链序无关。
 * 6. **结构体字面量直接绕过那个钳制**（`aStructLiteralBypassesTheClamp()`）：字段全 `pub`，于是
 *    `archiveAmount: 0` 写得出来——`.max(1)` **不是类型不变量，只是 builder 的规矩**。本单最值钱的一条。
 * 7. **`SwarmConfig` 的 `fitnessEvaluator` 默认 `None`**（`theSwarmConfigStartsWithoutAnEvaluator()`）。
 * 8. **`IslandConfig` 没有构造器**（`theIslandConfigHasNoConstructor()`）：只能字面量构造，`migrationPeriod` 不校验。
 *
 * The **configuration surface of population search**, binding **pure configuration only**: every operator slot is filled
 * with the crate's own `genetic()` defaults and no operator body runs. **The constructor defaults to `0.1` and `1`.** **The
 * mutation-rate builder validates nothing.** **The archive builder lifts zero to one**, and zero is the only rewritten
 * value. **`size` is never clamped.** **The builder returns the same config.** **A struct literal bypasses the clamp** —
 * the fields are all `pub`, so the `.max(1)` is **not a type invariant but only a builder habit**; this is the most
 * valuable finding here. **`SwarmConfig` starts without an evaluator.** And **`IslandConfig` has no constructor**.
 */
export class PopulationConfigReport {
    private constructor(private state: PopulationConfigBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): PopulationConfigReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected population config report text");
        }
        return invoke(() => new PopulationConfigReport(
            wasm().PopulationConfigReport.fromJson(json)));
    }
    private raw(): PopulationConfigBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "population config report has been disposed");
        }
        return this.state;
    }
    size(): number { return invoke(() => this.raw().size()); }
    mutationRate(): number | undefined { return invoke(() => this.raw().mutationRate()); }
    mutationRateInfinite(): boolean { return invoke(() => this.raw().mutationRateInfinite()); }
    archiveAmount(): number { return invoke(() => this.raw().archiveAmount()); }
    usedBuilders(): boolean { return invoke(() => this.raw().usedBuilders()); }
    swarmSize(): number { return invoke(() => this.raw().swarmSize()); }
    swarmHasEvaluator(): boolean { return invoke(() => this.raw().swarmHasEvaluator()); }
    migrationPeriod(): number { return invoke(() => this.raw().migrationPeriod()); }
    islandCount(): number { return invoke(() => this.raw().islandCount()); }
    theConstructorDefaultsArePointOneAndOne(): boolean {
        return invoke(() => this.raw().theConstructorDefaultsArePointOneAndOne());
    }
    theMutationRateBuilderValidatesNothing(): boolean {
        return invoke(() => this.raw().theMutationRateBuilderValidatesNothing());
    }
    theArchiveAmountBuilderClampsZeroToOne(): boolean {
        return invoke(() => this.raw().theArchiveAmountBuilderClampsZeroToOne());
    }
    theSizeIsNeverClamped(): boolean { return invoke(() => this.raw().theSizeIsNeverClamped()); }
    theBuilderReturnsTheSameConfig(): boolean {
        return invoke(() => this.raw().theBuilderReturnsTheSameConfig());
    }
    aStructLiteralBypassesTheClamp(): boolean {
        return invoke(() => this.raw().aStructLiteralBypassesTheClamp());
    }
    theSwarmConfigStartsWithoutAnEvaluator(): boolean {
        return invoke(() => this.raw().theSwarmConfigStartsWithoutAnEvaluator());
    }
    theIslandConfigHasNoConstructor(): boolean {
        return invoke(() => this.raw().theIslandConfigHasNoConstructor());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 边界处理探针请求。 / The boundary-handling probe request. */
export interface BoundaryRequest {
    value: number;
    lowerBound: number;
    /** 允许小于下界，此时只有截断会 panic。 */ upperBound: number;
}

/** 边界处理探针结论。 / The boundary-handling probe verdict. */
export interface BoundaryReportView {
    value: number;
    lowerBound: number;
    upperBound: number;
    /** `undefined` 表示截断 panic 了。 */ clamped?: number;
    reflected: number;
    wrapped: number;
    clampPanicked: boolean;
}

/**
 * **三种边界处理的退化路径**（续挖 `heuristic/operator/boundary.rs` 的 `ClampBoundary` /
 * `ReflectBoundary` / `WrapBoundary`）。纯 `f64`，一个求解器都不用：
 *
 * 1. **`NaN` 三路都落到下界**（`nanLandsOnTheLowerBoundForAllThree()`）。
 * 2. **`±∞` 让截断分道扬镳**（`theInfinitiesDivergeBetweenClampAndTheOthers()`）：`+∞` 截断给上界、
 *    反射与环绕给下界；`-∞` 三路都给下界。
 * 3. **区间倒置时只有截断 panic**（`anInvertedRangePanicsOnlyInClamp()`）：`f64::clamp` 断言 `min <= max`，
 *    反射与环绕照旧返下界。本单最值钱的一条。
 * 4. **宽度为零时只有截断给那个值**（`aZeroWidthClampsToTheValueItself()`）。
 * 5. **反射只折一次就镜像**（`reflectionFoldsOnceByMirroring()`）。
 * 6. **反射折 64 期就放弃**（`reflectionGivesUpAfter64Periods()`）：每两期折回两个宽度，64 期上限只够折回
 *    `128` 个宽度，再远就被 `.clamp()` 兜在上界。
 * 7. **环绕用 `rem_euclid`，负偏移从另一侧回来**（`wrapUsesRemEuclid()`）。
 * 8. **环绕把区间当半开区间**（`wrappingTreatsTheIntervalAsHalfOpen()`）：开区间内三路一致，但**正好落在
 *    上界时环绕跳回下界**，而截断与反射停在上界。
 *
 * The **degenerate paths of the three boundary handlers**, pure `f64` with no solver. **`NaN` lands low on all three.**
 * **The infinities split the clamp away from the others.** **Only clamping panics on an inverted range** because
 * `f64::clamp` asserts `min <= max` — the most valuable finding here. **A zero width clamps to the value itself.**
 * **Reflection folds once by mirroring.** **Reflection gives up after 64 periods.** **Wrapping uses `rem_euclid`.**
 * And **wrapping treats the interval as half-open**: inside it all three agree, yet sitting exactly on the upper bound
 * sends wrapping back to the lower bound while clamping and reflection stay put.
 */
export class BoundaryReport {
    private constructor(private state: BoundaryBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): BoundaryReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected boundary report text");
        }
        return invoke(() => new BoundaryReport(wasm().BoundaryReport.fromJson(json)));
    }
    private raw(): BoundaryBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "boundary report has been disposed");
        }
        return this.state;
    }
    value(): number { return invoke(() => this.raw().value()); }
    lowerBound(): number { return invoke(() => this.raw().lowerBound()); }
    upperBound(): number { return invoke(() => this.raw().upperBound()); }
    clamped(): number | undefined { return invoke(() => this.raw().clamped()); }
    reflected(): number { return invoke(() => this.raw().reflected()); }
    wrapped(): number { return invoke(() => this.raw().wrapped()); }
    clampPanicked(): boolean { return invoke(() => this.raw().clampPanicked()); }
    nanLandsOnTheLowerBoundForAllThree(): boolean {
        return invoke(() => this.raw().nanLandsOnTheLowerBoundForAllThree());
    }
    theInfinitiesDivergeBetweenClampAndTheOthers(): boolean {
        return invoke(() => this.raw().theInfinitiesDivergeBetweenClampAndTheOthers());
    }
    anInvertedRangePanicsOnlyInClamp(): boolean {
        return invoke(() => this.raw().anInvertedRangePanicsOnlyInClamp());
    }
    aZeroWidthClampsToTheValueItself(): boolean {
        return invoke(() => this.raw().aZeroWidthClampsToTheValueItself());
    }
    reflectionFoldsOnceByMirroring(): boolean {
        return invoke(() => this.raw().reflectionFoldsOnceByMirroring());
    }
    reflectionGivesUpAfter64Periods(): boolean {
        return invoke(() => this.raw().reflectionGivesUpAfter64Periods());
    }
    wrapUsesRemEuclid(): boolean { return invoke(() => this.raw().wrapUsesRemEuclid()); }
    wrappingTreatsTheIntervalAsHalfOpen(): boolean {
        return invoke(() => this.raw().wrappingTreatsTheIntervalAsHalfOpen());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 接受判据探针请求。 / The acceptance-criterion probe request. */
export interface AcceptanceRequest {
    currentFitness: number;
    candidateFitness: number;
    /** `equal` / `candidateBetter` / `candidateWorse`。 */ tier?: string;
    /** `normal` / `alwaysLess` / `alwaysNone`（可控缺陷的比较器）。 */ comparison?: string;
    temperature?: number;
    samples?: number;
    seed?: number;
}

/** 接受判据探针结论。 / The acceptance-criterion probe verdict. */
export interface AcceptanceReportView {
    ordering: string;
    betterOnly: boolean;
    notWorse: boolean;
    always: boolean;
    metropolisFirst?: boolean;
    metropolisAccepted: number;
}

/**
 * **接受判据的决策面**（续挖 `heuristic/operator/acceptance.rs` 的四个判据）：
 *
 * 1. **`BetterOnlyAcceptance` 只在候选严格更优时接受**（`betterOnlyAcceptsOnlyStrictImprovement()`）。
 * 2. **`NotWorseAcceptance` 连平局一起接受**（`notWorseAcceptsTiesAsWell()`）：两者的差别**只有平局**。
 * 3. **平局由"两个方向都返回更优"判出**（`aTieIsDetectedByBothDirectionsAgreeing()`）：一个**自相矛盾**的
 *    比较器（永远返回更优）读作平局。
 * 4. **`None` 比较也落到平局**（`aNoneComparisonFallsBackToEqual()`）：`NaN` 目标走的是同一条路。
 * 5. **`AlwaysAcceptance` 并不"无条件"**（`alwaysAcceptanceIsNotUnconditional()`）：它只比约束层级，
 *    候选层级更差时**拒绝**。本单最值钱的一条。
 * 6. **`Metropolis` 先按层级结案**（`metropolisSettlesOnTheTierFirst()`）：层级更好就接受、更差就拒绝，
 *    完全不看目标。
 * 7. **温度守卫排在 `delta <= 0` 之前**（`theTemperatureGuardPrecedesTheTieAcceptance()`）：**温度冻住时连
 *    平局都拒绝**，而更优目标在那两层之前就已经返回真。
 * 8. **同 seed 可复现、`Δ` 越大接受越少**（`metropolisIsReproducibleAndShrinksWithDelta()`）。
 *
 * The **decision surface of the acceptance criteria**. **BetterOnly accepts strict improvement only.** **NotWorse
 * accepts ties too**, so they differ **only on ties**. **A tie is detected by both directions claiming to be better**,
 * so a self-contradictory comparator reads as a tie. **A `None` comparison falls back to a tie**, which is the `NaN`
 * path. **`AlwaysAcceptance` is not unconditional** — it only compares constraint tiers — the most valuable finding
 * here. **Metropolis settles on the tier first.** **Its temperature guard precedes the tie acceptance**, so a frozen
 * temperature rejects a tie while strict improvement returns true earlier. And **the draws are reproducible per seed
 * while the acceptance rate shrinks as delta grows**.
 */
export class AcceptanceReport {
    private constructor(private state: AcceptanceBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): AcceptanceReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected acceptance report text");
        }
        return invoke(() => new AcceptanceReport(wasm().AcceptanceReport.fromJson(json)));
    }
    private raw(): AcceptanceBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "acceptance report has been disposed");
        }
        return this.state;
    }
    ordering(): string { return invoke(() => this.raw().ordering()); }
    betterOnly(): boolean { return invoke(() => this.raw().betterOnly()); }
    notWorse(): boolean { return invoke(() => this.raw().notWorse()); }
    always(): boolean { return invoke(() => this.raw().always()); }
    metropolisFirst(): boolean | undefined { return invoke(() => this.raw().metropolisFirst()); }
    metropolisAccepted(): number { return invoke(() => this.raw().metropolisAccepted()); }
    betterOnlyAcceptsOnlyStrictImprovement(): boolean {
        return invoke(() => this.raw().betterOnlyAcceptsOnlyStrictImprovement());
    }
    notWorseAcceptsTiesAsWell(): boolean {
        return invoke(() => this.raw().notWorseAcceptsTiesAsWell());
    }
    aTieIsDetectedByBothDirectionsAgreeing(): boolean {
        return invoke(() => this.raw().aTieIsDetectedByBothDirectionsAgreeing());
    }
    aNoneComparisonFallsBackToEqual(): boolean {
        return invoke(() => this.raw().aNoneComparisonFallsBackToEqual());
    }
    alwaysAcceptanceIsNotUnconditional(): boolean {
        return invoke(() => this.raw().alwaysAcceptanceIsNotUnconditional());
    }
    metropolisSettlesOnTheTierFirst(): boolean {
        return invoke(() => this.raw().metropolisSettlesOnTheTierFirst());
    }
    theTemperatureGuardPrecedesTheTieAcceptance(): boolean {
        return invoke(() => this.raw().theTemperatureGuardPrecedesTheTieAcceptance());
    }
    metropolisIsReproducibleAndShrinksWithDelta(): boolean {
        return invoke(() => this.raw().metropolisIsReproducibleAndShrinksWithDelta());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条排好序的个体（`index` 是请求里的原始位置）。 / One ranked individual. */
export interface RankingItemRow {
    index: number;
    fitness: number;
}

/** 排序算子探针请求。 / The ranking-operator probe request. */
export interface RankingProbeRequest {
    fitnesses?: number[];
    /** `default` / `reverse` / `duplicate` / `drop` / `outOfRange`。 */ rankMode?: string;
}

/**
 * **三个排序算子根本不排序**（续挖 `heuristic/operator/ranking.rs` 的 `ObjectiveRanking` /
 * `ReversedObjectiveRanking` / `IdentityRanking`）：
 *
 * 1. **`ObjectiveRanking` 只委托模型**（`objectiveRankingDelegatesToTheModel()`）：模型把 `rankIndices` 的结果
 *    反过来，它就输出降序——它自己一个比较都不做。本单最值钱的一条。
 * 2. **`ReversedObjectiveRanking` 倒的是并列块**（`reversedRankingFlipsTheTieBlocks()`）：先升序再整体
 *    `reverse()`，并列的三条按**输入顺序的逆序**出现。
 * 3. **默认 `rankIndices` 是稳定排序**（`theDefaultRankIndicesIsStable()`）。
 * 4. **重复下标会被克隆两次**（`aDuplicateIndexIsClonedTwice()`）：输出长度**不必等于输入长度**。
 * 5. **越界下标直接 panic**（`anOutOfRangeIndexPanics()`）：没有边界守卫。
 * 6. **`IdentityRanking` 一次都不碰模型**（`identityRankingNeverTouchesTheModel()`）。
 * 7. **排序返回克隆、输入原封不动**（`rankingReturnsClonesAndLeavesTheInputUntouched()`）。
 * 8. **空与单元素是不动点**（`emptyAndSingleInputsAreFixedPoints()`）。
 *
 * The **three ranking operators do not sort at all**. **`ObjectiveRanking` only delegates to the model** — a model that
 * reverses `rankIndices` makes it emit a descending list without comparing anything, the most valuable finding here.
 * **`ReversedObjectiveRanking` flips the tie blocks** since it ranks ascending and then reverses the whole list. **The
 * default `rankIndices` is a stable sort.** **A duplicate index is cloned twice**, so the output length need not match
 * the input. **An out-of-range index panics.** **`IdentityRanking` never touches the model.** **Ranking returns clones and
 * leaves the input untouched.** And **empty and single inputs are fixed points**.
 */
export class RankingProbeReport {
    private constructor(private state: RankingProbeBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): RankingProbeReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected ranking report text");
        }
        return invoke(() => new RankingProbeReport(wasm().RankingProbeReport.fromJson(json)));
    }
    private raw(): RankingProbeBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "ranking report has been disposed");
        }
        return this.state;
    }
    inputCount(): number { return invoke(() => this.raw().inputCount()); }
    objectiveCount(): number { return invoke(() => this.raw().objectiveCount()); }
    reversedCount(): number { return invoke(() => this.raw().reversedCount()); }
    identityCount(): number { return invoke(() => this.raw().identityCount()); }
    objectiveIndexAt(index: number): number {
        return invoke(() => this.raw().objectiveIndexAt(index));
    }
    objectiveFitnessAt(index: number): number {
        return invoke(() => this.raw().objectiveFitnessAt(index));
    }
    reversedIndexAt(index: number): number {
        return invoke(() => this.raw().reversedIndexAt(index));
    }
    identityIndexAt(index: number): number {
        return invoke(() => this.raw().identityIndexAt(index));
    }
    objectivePanicked(): boolean { return invoke(() => this.raw().objectivePanicked()); }
    objectiveRankingDelegatesToTheModel(): boolean {
        return invoke(() => this.raw().objectiveRankingDelegatesToTheModel());
    }
    reversedRankingFlipsTheTieBlocks(): boolean {
        return invoke(() => this.raw().reversedRankingFlipsTheTieBlocks());
    }
    theDefaultRankIndicesIsStable(): boolean {
        return invoke(() => this.raw().theDefaultRankIndicesIsStable());
    }
    aDuplicateIndexIsClonedTwice(): boolean {
        return invoke(() => this.raw().aDuplicateIndexIsClonedTwice());
    }
    anOutOfRangeIndexPanics(): boolean {
        return invoke(() => this.raw().anOutOfRangeIndexPanics());
    }
    identityRankingNeverTouchesTheModel(): boolean {
        return invoke(() => this.raw().identityRankingNeverTouchesTheModel());
    }
    rankingReturnsClonesAndLeavesTheInputUntouched(): boolean {
        return invoke(() => this.raw().rankingReturnsClonesAndLeavesTheInputUntouched());
    }
    emptyAndSingleInputsAreFixedPoints(): boolean {
        return invoke(() => this.raw().emptyAndSingleInputsAreFixedPoints());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 邻域结构探针请求。 / The topology probe request. */
export interface TopologyRequest {
    /** 允许越界：越界的语义正是本单要量的。 */ index: number;
    size: number;
    radius?: number;
    gridWidth?: number;
    randomAmount?: number;
    seed?: number;
}

/**
 * **五种邻域结构的下标算术**（续挖 `heuristic/operator/topology.rs` 的 `GlobalTopology` /
 * `RingTopology` / `RingKTopology` / `VonNeumannTopology` / `RandomTopology`）。纯整数：
 *
 * 1. **`GlobalTopology` 完全不看 `index`**（`globalTopologyIgnoresTheIndex()`）：`0..size` 全给，`size === 0` 给空。
 * 2. **空种群仍然报出邻居 0**（`anEmptyPopulationStillReportsNeighbourZero()`）：
 *    `index.min(size.saturatingSub(1))` 在 `size === 0` 时下溢成 0，**返回了一个不存在的邻居**。本单最值钱。
 * 3. **两成员的环退化成完全图**（`aTwoMemberRingIsComplete()`）：`[0, 1]` 互为邻居。
 * 4. **k 邻环饱和到整个种群**（`theKRingSaturatesAtTheWholePopulation()`）：半径够大返回全部，半径 0 只有自己。
 * 5. **`RingTopology` 把越界下标原样留下**（`thePlainRingKeepsTheRawIndexWhileTheKRingWrapsIt()`）：
 *    邻居都 `% size` 绕回了，`index` 本身**没绕**；`RingKTopology` 对每个偏移都用 `rem_euclid`。
 * 6. **网格不在边界回卷**（`theGridDoesNotWrapAtTheEdges()`）：第 0 列没有左邻居。
 * 7. **末行不满时会丢掉不存在的邻居**（`aPartialLastRowDropsTheMissingNeighbours()`）。
 * 8. **`RandomTopology` 对同一 seed 可复现，且总把自己放在集合里**
 *    （`theRandomTopologyIsSeededAndKeepsTheIndexInside()`）。
 *
 * The **index arithmetic of the five neighbourhood structures**, pure integers. **`GlobalTopology` ignores the index.**
 * **An empty population still reports neighbour zero** because `index.min(size.saturating_sub(1))` underflows, **handing
 * back a neighbour that does not exist** — the most valuable finding. **A two-member ring is complete.** **The k-ring
 * saturates at the whole population.** **The plain ring keeps a raw out-of-range index** while the k-ring wraps every
 * offset. **The grid does not wrap at the edges.** **A partial last row drops the missing neighbours.** And **the random
 * topology is reproducible per seed and keeps the index inside the set**.
 */
export class TopologyReport {
    private constructor(private state: TopologyBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): TopologyReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected topology report text");
        }
        return invoke(() => new TopologyReport(wasm().TopologyReport.fromJson(json)));
    }
    private raw(): TopologyBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "topology report has been disposed");
        }
        return this.state;
    }
    index(): number { return invoke(() => this.raw().index()); }
    size(): number { return invoke(() => this.raw().size()); }
    globalCount(): number { return invoke(() => this.raw().globalCount()); }
    globalAt(index: number): number { return invoke(() => this.raw().globalAt(index)); }
    ringCount(): number { return invoke(() => this.raw().ringCount()); }
    ringAt(index: number): number { return invoke(() => this.raw().ringAt(index)); }
    ringKCount(): number { return invoke(() => this.raw().ringKCount()); }
    ringKAt(index: number): number { return invoke(() => this.raw().ringKAt(index)); }
    vonNeumannCount(): number { return invoke(() => this.raw().vonNeumannCount()); }
    vonNeumannAt(index: number): number { return invoke(() => this.raw().vonNeumannAt(index)); }
    randomCount(): number { return invoke(() => this.raw().randomCount()); }
    randomAt(index: number): number { return invoke(() => this.raw().randomAt(index)); }
    globalTopologyIgnoresTheIndex(): boolean {
        return invoke(() => this.raw().globalTopologyIgnoresTheIndex());
    }
    anEmptyPopulationStillReportsNeighbourZero(): boolean {
        return invoke(() => this.raw().anEmptyPopulationStillReportsNeighbourZero());
    }
    aTwoMemberRingIsComplete(): boolean {
        return invoke(() => this.raw().aTwoMemberRingIsComplete());
    }
    theKRingSaturatesAtTheWholePopulation(): boolean {
        return invoke(() => this.raw().theKRingSaturatesAtTheWholePopulation());
    }
    thePlainRingKeepsTheRawIndexWhileTheKRingWrapsIt(): boolean {
        return invoke(() => this.raw().thePlainRingKeepsTheRawIndexWhileTheKRingWrapsIt());
    }
    theGridDoesNotWrapAtTheEdges(): boolean {
        return invoke(() => this.raw().theGridDoesNotWrapAtTheEdges());
    }
    aPartialLastRowDropsTheMissingNeighbours(): boolean {
        return invoke(() => this.raw().aPartialLastRowDropsTheMissingNeighbours());
    }
    theRandomTopologyIsSeededAndKeepsTheIndexInside(): boolean {
        return invoke(() => this.raw().theRandomTopologyIsSeededAndKeepsTheIndexInside());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 迁移探针请求。 / The migration probe request. */
export interface MigrationRequest {
    /** 每个岛的适应度列表（空岛写空数组）。 */ islands?: number[][];
    rate?: number;
    amount?: number;
}

/**
 * **两种岛屿迁移的空岛与并列语义**（续挖 `heuristic/operator/migration.rs` 的 `NoMigration` /
 * `RingMigration` / `BestToWorstMigration`）：
 *
 * 1. **单岛永不迁移**（`aSingleIslandIsNeverMigrated()`）：`islands.length < 2` 时两个算子都原样返回。
 * 2. **环形迁移率 0 也照迁一个**（`theRingRateOfZeroStillMigratesOne()`）：`(len * rate) as usize` 之后
 *    还有 `.max(1)`。
 * 3. **环形迁移让每个岛的规模守恒**（`theRingPreservesEveryIslandSize()`）。
 * 4. **送进来的是来源岛的最优几个，掉的是自己最差的几个**
 *    （`theRingMovesTheBestInAndDropsTheWorst()`）。
 * 5. **空岛只让它的后继拿到 0 个**（`anEmptyIslandMerelyStarvesItsSuccessor()`）。
 * 6. **最优与最差并列时一个都不动**（`aBestToWorstTieMigratesNothing()`）：`source === target` 直接返回。
 * 7. **目标岛可能被撑大**（`theBestToWorstTargetCanGrow()`）：迁移量由**来源岛**决定。本单最值钱的一条。
 * 8. **空岛只在优岛到劣岛里"整体拦住"**（`anEmptyIslandBlocksEverythingOnlyInBestToWorst()`）。
 *
 * The **empty-island and tie semantics of the two migrations**. **A single island is never migrated.** **A ring rate of
 * zero still migrates one individual** because of the `.max(1)`. **The ring preserves every island's size.** **It moves
 * the source's best in and drops its own worst.** **An empty island merely starves its successor.** **A tie between the
 * best and worst leaders moves nothing.** **The best-to-worst target can be grown** because the migrant count comes from
 * the source island — the most valuable finding here. And **an empty island blocks everything only in best-to-worst.**
 */
export class MigrationReport {
    private constructor(private state: MigrationBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): MigrationReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected migration report text");
        }
        return invoke(() => new MigrationReport(wasm().MigrationReport.fromJson(json)));
    }
    private raw(): MigrationBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "migration report has been disposed");
        }
        return this.state;
    }
    islandCount(): number { return invoke(() => this.raw().islandCount()); }
    ringSize(island: number): number { return invoke(() => this.raw().ringSize(island)); }
    ringMemberAt(island: number, position: number): number {
        return invoke(() => this.raw().ringMemberAt(island, position));
    }
    bestToWorstSize(island: number): number {
        return invoke(() => this.raw().bestToWorstSize(island));
    }
    bestToWorstMemberAt(island: number, position: number): number {
        return invoke(() => this.raw().bestToWorstMemberAt(island, position));
    }
    aSingleIslandIsNeverMigrated(): boolean {
        return invoke(() => this.raw().aSingleIslandIsNeverMigrated());
    }
    theRingRateOfZeroStillMigratesOne(): boolean {
        return invoke(() => this.raw().theRingRateOfZeroStillMigratesOne());
    }
    theRingPreservesEveryIslandSize(): boolean {
        return invoke(() => this.raw().theRingPreservesEveryIslandSize());
    }
    theRingMovesTheBestInAndDropsTheWorst(): boolean {
        return invoke(() => this.raw().theRingMovesTheBestInAndDropsTheWorst());
    }
    anEmptyIslandMerelyStarvesItsSuccessor(): boolean {
        return invoke(() => this.raw().anEmptyIslandMerelyStarvesItsSuccessor());
    }
    aBestToWorstTieMigratesNothing(): boolean {
        return invoke(() => this.raw().aBestToWorstTieMigratesNothing());
    }
    theBestToWorstTargetCanGrow(): boolean {
        return invoke(() => this.raw().theBestToWorstTargetCanGrow());
    }
    anEmptyIslandBlocksEverythingOnlyInBestToWorst(): boolean {
        return invoke(() => this.raw().anEmptyIslandBlocksEverythingOnlyInBestToWorst());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一轮更新的读数。 / One update round's reading. */
export interface ArchiveStepRow {
    improved: boolean;
    members: number[];
}

/** 档案探针请求。 / The archive probe request. */
export interface ArchiveProbeRequest {
    batches?: number[][];
    amount?: number;
}

/**
 * **档案的"是否改进"旗标说的不是这批候选，而是档案最优**（续挖 `heuristic/operator/archive.rs` 的
 * `BestArchive` / `HistoryBestArchive`）：
 *
 * 1. **首轮必报改进**（`theFirstUpdateAlwaysReportsImprovement()`）：`None → Some` 就是 `true`，
 *    塞进来的是最差的也照样报。
 * 2. **容量 0 的档案把一切吞掉**（`aZeroCapacityArchiveSwallowsEverything()`）：`truncate(0)` 之后永远为空、
 *    旗标永远 `false`——连首轮都不报。
 * 3. **等值候选被存下却不报改进**（`anEqualCandidateIsStoredButNeverReported()`）：内容变长了、旗标说没变。
 *    本单最值钱的一条。
 * 4. **旗标跟踪的是档案最优而不是这批候选**（`theFlagTracksTheArchiveBest()`）：整批更差 → `false`，
 *    有一个更好 → `true`；**更差的候选照样进档案**（只是不报改进）。
 * 5. **并列时先来的排前面**（`aTieKeepsTheOlderEntryFirst()`）：稳定排序 + 候选追加在已有条目之后。
 * 6. **`clear()` 会让旗标重新变真**（`clearResetsTheFlag()`）。
 * 7. **历史最优档案对"这批里任何一个更优"都报改进**（`theHistoryArchiveReportsAnyImprovement()`）。
 * 8. **历史最优档案永不收下等值候选**（`theHistoryArchiveNeverTakesAnEqualCandidate()`）：原个体继续留着。
 *
 * The **"did it improve" flag speaks about the archive's best, not about the batch**. **The first update always reports
 * improvement** because empty-to-non-empty is `true`. **A zero-capacity archive swallows everything.** **An equal
 * candidate is stored without reporting improvement** — the most valuable finding here. **The flag tracks the archive's
 * best**, and **worse candidates are still archived**, they simply report nothing. **A tie keeps the older entry first.**
 * **`clear()` resets the flag.** **The history archive reports any improvement in the batch.** And **it never takes an
 * equal candidate.**
 */
export class ArchiveProbeReport {
    private constructor(private state: ArchiveProbeBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): ArchiveProbeReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected archive report text");
        }
        return invoke(() => new ArchiveProbeReport(wasm().ArchiveProbeReport.fromJson(json)));
    }
    private raw(): ArchiveProbeBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "archive report has been disposed");
        }
        return this.state;
    }
    roundCount(): number { return invoke(() => this.raw().roundCount()); }
    bestImprovedAt(round: number): boolean {
        return invoke(() => this.raw().bestImprovedAt(round));
    }
    bestSizeAt(round: number): number { return invoke(() => this.raw().bestSizeAt(round)); }
    bestMemberAt(round: number, position: number): number {
        return invoke(() => this.raw().bestMemberAt(round, position));
    }
    historyImprovedAt(round: number): boolean {
        return invoke(() => this.raw().historyImprovedAt(round));
    }
    historyMemberAt(round: number): number | undefined {
        return invoke(() => this.raw().historyMemberAt(round));
    }
    theFirstUpdateAlwaysReportsImprovement(): boolean {
        return invoke(() => this.raw().theFirstUpdateAlwaysReportsImprovement());
    }
    aZeroCapacityArchiveSwallowsEverything(): boolean {
        return invoke(() => this.raw().aZeroCapacityArchiveSwallowsEverything());
    }
    anEqualCandidateIsStoredButNeverReported(): boolean {
        return invoke(() => this.raw().anEqualCandidateIsStoredButNeverReported());
    }
    theFlagTracksTheArchiveBest(): boolean {
        return invoke(() => this.raw().theFlagTracksTheArchiveBest());
    }
    aTieKeepsTheOlderEntryFirst(): boolean {
        return invoke(() => this.raw().aTieKeepsTheOlderEntryFirst());
    }
    clearResetsTheFlag(): boolean { return invoke(() => this.raw().clearResetsTheFlag()); }
    theHistoryArchiveReportsAnyImprovement(): boolean {
        return invoke(() => this.raw().theHistoryArchiveReportsAnyImprovement());
    }
    theHistoryArchiveNeverTakesAnEqualCandidate(): boolean {
        return invoke(() => this.raw().theHistoryArchiveNeverTakesAnEqualCandidate());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个断点。 / One breakpoint. */
export interface PiecewisePointSpec {
    x: number;
    y: number;
}

/** 分段线性探针请求。 / The piecewise-linear probe request. */
export interface PiecewiseRequest {
    name?: string;
    points?: PiecewisePointSpec[];
    breakpoints?: number[];
    slopes?: number[];
    intercepts?: number[];
    useSegments?: boolean;
}

/**
 * **分段线性构造器的闸门**（续挖 `symbol/functions/univariate_linear_piecewise.rs` 的 `Point2` / `Segment2` /
 * `UnivariateLinearPiecewiseFunction::new` / `from_segments`）：
 *
 * 1. **至少要两个点**（`atLeastTwoPointsAreRequired()`）：0 与 1 都 panic。
 * 2. **x 必须严格递增**（`theXValuesMustStrictlyAscend()`）：等值与降序都 panic。
 * 3. **坐标必须有限**（`nonFiniteCoordinatesAreRefused()`）。
 * 4. **结果变量的值域是 y 的包络**（`theResultRangeIsTheYEnvelope()`）：`[min y, max y]`。
 * 5. **λ 有 n 个（都在 `[0, 1]`）、选择器有 n-1 个**（`theLambdaAndSelectorCountsFollowThePointCount()`）。
 * 6. **线段数必须正好比断点数少一**（`segmentsMustMatchTheBreakpointCount()`）。
 * 7. **不一致的线段图会被静默改写**（`anInconsistentSegmentGraphIsSilentlyRewritten()`）：每个断点取**右边**那条
 *    线段的斜率与截距，"同一图像"的声明没有校验。本单最值钱的一条。
 * 8. **`Display` 是 `ulp(<名字>)`**（`theDisplayWrapsTheName()`）。
 *
 * The **gates of the piecewise constructor**. **At least two points are required**, and a non-ascending x panics outright.
 * **Coordinates must be finite.** **The result range is the y envelope.** **n lambdas and n−1 selectors** follow the point
 * count. **The segment count must be exactly one less than the breakpoint count.** **An inconsistent segment graph is
 * silently rewritten** because each breakpoint takes the right-hand segment — the most valuable finding here. And
 * **`Display` wraps the name as `ulp(<name>)`.**
 */
export class PiecewiseReport {
    private constructor(private state: PiecewiseBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): PiecewiseReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected piecewise report text");
        }
        return invoke(() => new PiecewiseReport(wasm().PiecewiseReport.fromJson(json)));
    }
    private raw(): PiecewiseBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "piecewise report has been disposed");
        }
        return this.state;
    }
    constructed(): boolean { return invoke(() => this.raw().constructed()); }
    resultLower(): number | undefined { return invoke(() => this.raw().resultLower()); }
    resultUpper(): number | undefined { return invoke(() => this.raw().resultUpper()); }
    lambdaCount(): number { return invoke(() => this.raw().lambdaCount()); }
    selectorCount(): number { return invoke(() => this.raw().selectorCount()); }
    pointCount(): number { return invoke(() => this.raw().pointCount()); }
    pointXAt(index: number): number { return invoke(() => this.raw().pointXAt(index)); }
    pointYAt(index: number): number { return invoke(() => this.raw().pointYAt(index)); }
    displayText(): string { return invoke(() => this.raw().displayText()); }
    atLeastTwoPointsAreRequired(): boolean {
        return invoke(() => this.raw().atLeastTwoPointsAreRequired());
    }
    theXValuesMustStrictlyAscend(): boolean {
        return invoke(() => this.raw().theXValuesMustStrictlyAscend());
    }
    nonFiniteCoordinatesAreRefused(): boolean {
        return invoke(() => this.raw().nonFiniteCoordinatesAreRefused());
    }
    theResultRangeIsTheYEnvelope(): boolean {
        return invoke(() => this.raw().theResultRangeIsTheYEnvelope());
    }
    theLambdaAndSelectorCountsFollowThePointCount(): boolean {
        return invoke(() => this.raw().theLambdaAndSelectorCountsFollowThePointCount());
    }
    segmentsMustMatchTheBreakpointCount(): boolean {
        return invoke(() => this.raw().segmentsMustMatchTheBreakpointCount());
    }
    anInconsistentSegmentGraphIsSilentlyRewritten(): boolean {
        return invoke(() => this.raw().anInconsistentSegmentGraphIsSilentlyRewritten());
    }
    theDisplayWrapsTheName(): boolean {
        return invoke(() => this.raw().theDisplayWrapsTheName());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 多样性探针请求。 / The diversity probe request. */
export interface DiversityRequest {
    /** 每个解按 `order` 位置给出的值；`null` 表示这个键不存在。 */ solutions?: (number | null)[][];
    orderLen?: number;
}

/**
 * **两个多样性度量对"维度"与"缺失值"的回答不一致**（续挖 `heuristic/operator/diversity.rs` 的
 * `MeanPairwiseDistance` / `FractalDimensionDiversity`）：
 *
 * 1. **不到两个解就返回 0**（`theMeanReturnsZeroBelowTwoSolutions()`）。
 * 2. **均值度量的维度取的是第一个解的条目数**（`theMeanTakesItsDimensionFromTheFirstSolution()`）：
 *    `Solution` 是 `HashMap`，`len()` 是键数而不是变量数——同一份几何，键装在不同的解上会读出不同的值。
 * 3. **一个缺值就把均值度量的结果变成 NaN**（`aMissingValuePoisonsTheMean()`，`meanNan()`）：本单最值钱的一条。
 * 4. **完全相同的解读成 0**（`theMeanOfIdenticalSolutionsIsZero()`）。
 * 5. **均值是"距离的均值"不是"平方距离的均值"**（`theMeanAveragesDistancesNotTheirSquares()`）：
 *    `0/3/4` 给 `8/3`，而不是 `26/3`。
 * 6. **分形度量把缺值当成 0**（`theFractalMetricReadsAMissingValueAsZero()`）：与第 3 条正好相反。
 * 7. **分形度量看 `order` 的每一个位置**（`theFractalMetricSeesEveryOrderPosition()`）：它把缺失的键补 0。
 * 8. **两个度量都把退化种群读成 0**（`bothMetricsCollapseADegeneratePopulationToZero()`）：算不出来也压成同一个 0。
 *
 * The two metrics **disagree about dimension and missing values**. **Fewer than two solutions reads zero.** **The mean's
 * dimension is the first solution's entry count**, a `HashMap` key count rather than a variable count. **One missing value
 * turns the mean into NaN** — the most valuable finding here. **Identical solutions read zero.** **The mean averages
 * distances rather than their squares.** **The fractal metric treats a missing value as zero**, the opposite of the mean.
 * **It sees every order position**, padding with zeros. And **both collapse a degenerate population to zero**, where a
 * failed computation is indistinguishable from a real zero.
 */
export class DiversityReport {
    private constructor(private state: DiversityBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): DiversityReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected diversity report text");
        }
        return invoke(() => new DiversityReport(wasm().DiversityReport.fromJson(json)));
    }
    private raw(): DiversityBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "diversity report has been disposed");
        }
        return this.state;
    }
    mean(): number | undefined { return invoke(() => this.raw().mean()); }
    meanNan(): boolean { return invoke(() => this.raw().meanNan()); }
    fractal(): number { return invoke(() => this.raw().fractal()); }
    firstEntryCount(): number { return invoke(() => this.raw().firstEntryCount()); }
    orderLength(): number { return invoke(() => this.raw().orderLength()); }
    theMeanReturnsZeroBelowTwoSolutions(): boolean {
        return invoke(() => this.raw().theMeanReturnsZeroBelowTwoSolutions());
    }
    theMeanTakesItsDimensionFromTheFirstSolution(): boolean {
        return invoke(() => this.raw().theMeanTakesItsDimensionFromTheFirstSolution());
    }
    aMissingValuePoisonsTheMean(): boolean {
        return invoke(() => this.raw().aMissingValuePoisonsTheMean());
    }
    theMeanOfIdenticalSolutionsIsZero(): boolean {
        return invoke(() => this.raw().theMeanOfIdenticalSolutionsIsZero());
    }
    theMeanAveragesDistancesNotTheirSquares(): boolean {
        return invoke(() => this.raw().theMeanAveragesDistancesNotTheirSquares());
    }
    theFractalMetricReadsAMissingValueAsZero(): boolean {
        return invoke(() => this.raw().theFractalMetricReadsAMissingValueAsZero());
    }
    theFractalMetricSeesEveryOrderPosition(): boolean {
        return invoke(() => this.raw().theFractalMetricSeesEveryOrderPosition());
    }
    bothMetricsCollapseADegeneratePopulationToZero(): boolean {
        return invoke(() => this.raw().bothMetricsCollapseADegeneratePopulationToZero());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 带状态解探针请求。 / The status-carrying solution probe request. */
export interface SolutionStatusRequest {
    solution?: number[];
    mode?: string;
    status?: string;
    attachObjective?: boolean;
    objective?: number;
}

/**
 * **带状态解的六个状态与两条判据**（续挖 `model/callback/solution.rs` 的 `SolutionStatus` /
 * `SolutionWithStatus`）：
 *
 * 1. **默认是 `NotSolved` + 空解 + 无目标值**（`theDefaultIsNotSolvedWithAnEmptySolution()`）。
 * 2. **枚举有六个值，默认是 `NotSolved` 而不是 `Unknown`**
 *    （`theStatusEnumHasSixVariantsDefaultingToNotSolved()`）。
 * 3. **只有 `optimal()` 自带目标值**（`onlyTheOptimalConstructorFillsTheObjective()`）。
 * 4. **`with_status` 一定丢掉目标值**（`withStatusDropsTheObjective()`）：要目标值必须再链 `withObjective`。
 * 5. **`is_optimal` 是 `is_feasible` 的真子集**（`optimalIsAStrictSubsetOfFeasible()`）。
 * 6. **`Unbounded` 与 `Unknown` 都不算可行**（`unboundedAndUnknownAreNotFeasible()`）。
 * 7. **`infeasible()` 带的是空解**（`theInfeasibleConstructorCarriesAnEmptySolution()`）。
 * 8. **`with_objective` 不校验状态**（`withObjectiveNeverChecksTheStatus()`）：本单最值钱的一条。
 *
 * **The six statuses and the two predicates of the status-carrying solution.** **The default is `NotSolved`, empty and
 * without an objective.** **Six variants defaulting to `NotSolved` rather than `Unknown`.** **Only `optimal` carries an
 * objective.** **`with_status` always drops it.** **`is_optimal` is a strict subset of `is_feasible`.** **`Unbounded` and
 * `Unknown` are not feasible.** **`infeasible()` carries an empty solution.** And **`with_objective` never checks the
 * status** — the most valuable finding here.
 */
export class SolutionStatusReport {
    private constructor(private state: SolutionStatusBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): SolutionStatusReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected solution status report text");
        }
        return invoke(() => new SolutionStatusReport(wasm().SolutionStatusReport.fromJson(json)));
    }
    private raw(): SolutionStatusBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "solution status report has been disposed");
        }
        return this.state;
    }
    status(): string { return invoke(() => this.raw().status()); }
    isOptimal(): boolean { return invoke(() => this.raw().isOptimal()); }
    isFeasible(): boolean { return invoke(() => this.raw().isFeasible()); }
    solutionLen(): number { return invoke(() => this.raw().solutionLen()); }
    objective(): number | undefined { return invoke(() => this.raw().objective()); }
    theDefaultIsNotSolvedWithAnEmptySolution(): boolean {
        return invoke(() => this.raw().theDefaultIsNotSolvedWithAnEmptySolution());
    }
    theStatusEnumHasSixVariantsDefaultingToNotSolved(): boolean {
        return invoke(() => this.raw().theStatusEnumHasSixVariantsDefaultingToNotSolved());
    }
    onlyTheOptimalConstructorFillsTheObjective(): boolean {
        return invoke(() => this.raw().onlyTheOptimalConstructorFillsTheObjective());
    }
    withStatusDropsTheObjective(): boolean {
        return invoke(() => this.raw().withStatusDropsTheObjective());
    }
    optimalIsAStrictSubsetOfFeasible(): boolean {
        return invoke(() => this.raw().optimalIsAStrictSubsetOfFeasible());
    }
    unboundedAndUnknownAreNotFeasible(): boolean {
        return invoke(() => this.raw().unboundedAndUnknownAreNotFeasible());
    }
    theInfeasibleConstructorCarriesAnEmptySolution(): boolean {
        return invoke(() => this.raw().theInfeasibleConstructorCarriesAnEmptySolution());
    }
    withObjectiveNeverChecksTheStatus(): boolean {
        return invoke(() => this.raw().withObjectiveNeverChecksTheStatus());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条候选的输入。 / One candidate's input. */
export interface FunnelSpec {
    id: string;
    activity: string;
    dual?: number | null;
}

/** 候选漏斗探针请求。 / The funnel probe request. */
export interface FunnelRequest {
    candidates?: FunnelSpec[];
    dualThreshold?: number;
    shortlistLimit?: number;
}

/**
 * **候选漏斗的分层全在"活动性 + 对偶"的组合里**（续挖 `analysis/pipeline.rs` 的 `classify_candidate` /
 * `CandidateFunnelRanking::shortlist`）：
 *
 * 1. **短层名与线上名不一致**（`theShortTierNamesDifferFromTheWireNames()`）：`as_str()` 是 `A`/`B`/`C`/
 *    `UNCLASSIFIED`，序列化是 `TIER_A`/`TIER_B`/`TIER_C`/`UNCLASSIFIED`。
 * 2. **`NearlyActive` 与 `Active` 共用一档**（`nearlyActiveSharesTheActiveBucket()`）。
 * 3. **active 但没有对偶只能是 `Unclassified`**（`anActiveCandidateWithoutADualIsUnclassified()`）：不是 Tier B。
 * 4. **`Inactive` 带巨大对偶也还是 Tier C**（`anInactiveCandidateIsTierCWhateverItsDual()`）。
 * 5. **`NaN` 对偶落进 Tier B**（`aNanDualLandsInTierB()`）：`NaN > 阈值` 为假。本单最值钱的一条。
 * 6. **分类器不校验阈值、配置不校验上限**（`theClassifierIgnoresTheThresholdAndTheConfigTheLimit()`）：
 *    负阈值让 active 一律进 Tier A（做出来的排序会被 `validate()` 拒绝），上限 0 也能通过配置校验。
 * 7. **短名单只按既有顺序取，不重排 tier**（`theShortlistKeepsTheExistingOrder()`）：先 Tier A/B，
 *    名额还有余才补 Tier C/未分层，且永不超过上限。
 * 8. **`Violated` 落到 `Unclassified` 而不是 Tier C**（`aViolatedCandidateIsUnclassified()`）。
 *
 * **The funnel's tiering lives in the activity + dual combination.** **The short tier names differ from the wire names.**
 * **`NearlyActive` shares the active bucket.** **Active without a dual can only be `Unclassified`.** **`Inactive` stays
 * Tier C even with a huge dual.** **A `NaN` dual lands in Tier B** — the most valuable finding here. **The classifier never
 * checks the threshold and the config never checks the limit.** **The shortlist keeps the existing order** rather than
 * re-sorting by tier, and **`Violated` falls through to `Unclassified`**.
 */
export class FunnelReport {
    private constructor(private state: FunnelBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): FunnelReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected funnel report text");
        }
        return invoke(() => new FunnelReport(wasm().FunnelReport.fromJson(json)));
    }
    private raw(): FunnelBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "funnel report has been disposed");
        }
        return this.state;
    }
    candidateCount(): number { return invoke(() => this.raw().candidateCount()); }
    candidateIdAt(index: number): string {
        return invoke(() => this.raw().candidateIdAt(index));
    }
    candidateTierAt(index: number): string {
        return invoke(() => this.raw().candidateTierAt(index));
    }
    candidateWireAt(index: number): string {
        return invoke(() => this.raw().candidateWireAt(index));
    }
    candidateShortlistedAt(index: number): boolean {
        return invoke(() => this.raw().candidateShortlistedAt(index));
    }
    tierACount(): number { return invoke(() => this.raw().tierACount()); }
    tierBCount(): number { return invoke(() => this.raw().tierBCount()); }
    tierCCount(): number { return invoke(() => this.raw().tierCCount()); }
    unclassifiedCount(): number { return invoke(() => this.raw().unclassifiedCount()); }
    shortlistLength(): number { return invoke(() => this.raw().shortlistLength()); }
    shortlistAt(index: number): string { return invoke(() => this.raw().shortlistAt(index)); }
    rankingValid(): boolean { return invoke(() => this.raw().rankingValid()); }
    badCountsRefused(): boolean { return invoke(() => this.raw().badCountsRefused()); }
    theShortTierNamesDifferFromTheWireNames(): boolean {
        return invoke(() => this.raw().theShortTierNamesDifferFromTheWireNames());
    }
    nearlyActiveSharesTheActiveBucket(): boolean {
        return invoke(() => this.raw().nearlyActiveSharesTheActiveBucket());
    }
    anActiveCandidateWithoutADualIsUnclassified(): boolean {
        return invoke(() => this.raw().anActiveCandidateWithoutADualIsUnclassified());
    }
    anInactiveCandidateIsTierCWhateverItsDual(): boolean {
        return invoke(() => this.raw().anInactiveCandidateIsTierCWhateverItsDual());
    }
    aNanDualLandsInTierB(): boolean { return invoke(() => this.raw().aNanDualLandsInTierB()); }
    theClassifierIgnoresTheThresholdAndTheConfigTheLimit(): boolean {
        return invoke(() => this.raw().theClassifierIgnoresTheThresholdAndTheConfigTheLimit());
    }
    theShortlistKeepsTheExistingOrder(): boolean {
        return invoke(() => this.raw().theShortlistKeepsTheExistingOrder());
    }
    aViolatedCandidateIsUnclassified(): boolean {
        return invoke(() => this.raw().aViolatedCandidateIsUnclassified());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条有效性条目的输入。 / One effectiveness entry's input. */
export interface EffectivenessProbeSpec {
    id: string;
    dual?: number | null;
    localEffective?: boolean | null;
    removalEffective?: boolean | null;
    firstEffectiveDelta?: number | null;
    maxImprovement?: number | null;
    marginalEffect?: number | null;
    status?: string;
    unavailableReason?: string | null;
}

/** 有效性排序探针请求。 / The effectiveness-ranking probe request. */
export interface EffectivenessProbeRequest {
    baselineObjective?: number;
    schemaVersion?: string;
    entries?: EffectivenessProbeSpec[];
}

/**
 * **有效性排序的"排序"从不被校验**（续挖 `analysis/pipeline.rs` 的 `EffectivenessEntry` /
 * `EffectivenessRanking`）：
 *
 * 1. **全局有效性要 `maxImprovement > 0`**（`globalEffectivenessNeedsAPositiveImprovement()`）：
 *    `0`、负数、`null` 都是"没有收益"，且**都不报错**。
 * 2. **局部有效只认 `true`**（`localEffectivenessNeedsExactlyTrue()`）：`null` 与 `false` 都不进列表。
 * 3. **顺序从不被校验**（`theOrderOfEntriesIsNeverValidated()`）：文档说"按最大改善降序"，升序排列照样通过。
 *    本单最值钱的一条。
 * 4. **`firstEffectiveDelta` 必须为正**（`theFirstDeltaMustBePositive()`）。
 * 5. **有局部结论必须有对偶**（`aLocalVerdictRequiresADual()`）。
 * 6. **单删结论不能挂在 `Unsupported` 上**（`aRemovalVerdictRequiresASupportedStatus()`）。
 * 7. **`unavailableReason` 与 `status` 之间没有约束**（`theReasonIsNeverTiedToTheStatus()`）。
 * 8. **身份为空或重复会被拒**（`blankAndDuplicateIdentitiesAreRefused()`）。
 *
 * **The effectiveness ranking's "ranking" is never validated.** **Global effectiveness needs a positive improvement**, and
 * zero, negatives and `null` all read as "no benefit" without an error. **Local effectiveness only accepts `true`.** **The
 * order is never validated** — the most valuable finding here. **`firstEffectiveDelta` must be positive.** **A local verdict
 * requires a dual** and **a removal verdict cannot sit under `Unsupported`.** **`unavailableReason` is tied to nothing.**
 * And **blank or duplicate identities are refused.**
 */
export class EffectivenessProbeReport {
    private constructor(private state: EffectivenessProbeBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): EffectivenessProbeReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected effectiveness report text");
        }
        return invoke(() =>
            new EffectivenessProbeReport(wasm().EffectivenessProbeReport.fromJson(json)));
    }
    private raw(): EffectivenessProbeBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "effectiveness report has been disposed");
        }
        return this.state;
    }
    entryCount(): number { return invoke(() => this.raw().entryCount()); }
    entryIdAt(index: number): string { return invoke(() => this.raw().entryIdAt(index)); }
    entryGloballyEffectiveAt(index: number): boolean {
        return invoke(() => this.raw().entryGloballyEffectiveAt(index));
    }
    globallyEffectiveCount(): number {
        return invoke(() => this.raw().globallyEffectiveCount());
    }
    globallyEffectiveAt(index: number): string {
        return invoke(() => this.raw().globallyEffectiveAt(index));
    }
    locallyEffectiveCount(): number {
        return invoke(() => this.raw().locallyEffectiveCount());
    }
    locallyEffectiveAt(index: number): string {
        return invoke(() => this.raw().locallyEffectiveAt(index));
    }
    rankingValid(): boolean { return invoke(() => this.raw().rankingValid()); }
    reversedStillValid(): boolean { return invoke(() => this.raw().reversedStillValid()); }
    globalEffectivenessNeedsAPositiveImprovement(): boolean {
        return invoke(() => this.raw().globalEffectivenessNeedsAPositiveImprovement());
    }
    localEffectivenessNeedsExactlyTrue(): boolean {
        return invoke(() => this.raw().localEffectivenessNeedsExactlyTrue());
    }
    theOrderOfEntriesIsNeverValidated(): boolean {
        return invoke(() => this.raw().theOrderOfEntriesIsNeverValidated());
    }
    theFirstDeltaMustBePositive(): boolean {
        return invoke(() => this.raw().theFirstDeltaMustBePositive());
    }
    aLocalVerdictRequiresADual(): boolean {
        return invoke(() => this.raw().aLocalVerdictRequiresADual());
    }
    aRemovalVerdictRequiresASupportedStatus(): boolean {
        return invoke(() => this.raw().aRemovalVerdictRequiresASupportedStatus());
    }
    theReasonIsNeverTiedToTheStatus(): boolean {
        return invoke(() => this.raw().theReasonIsNeverTiedToTheStatus());
    }
    blankAndDuplicateIdentitiesAreRefused(): boolean {
        return invoke(() => this.raw().blankAndDuplicateIdentitiesAreRefused());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 统一分析报告探针请求。 / The unified-report probe request. */
export interface CriticalReportRequest {
    schemaVersion?: string;
    objectiveId?: string;
    sense?: string;
    status?: string;
    provenOptimal?: boolean;
    optimalValue?: number | null;
    unavailableReasons?: string[];
    injectBrokenFunnel?: boolean;
}

/**
 * **统一分析报告的 `validate()` 不检查"总体结论"**（续挖 `analysis/pipeline.rs` 的
 * `CriticalConstraintAnalysisReport`）：
 *
 * 1. **没有阶段也能带"已证明"的结论通过**（`anEmptyReportWithAProvenStatusStillValidates()`）：
 *    文档那条红线（阶段缺失时不得升格为已证明）**没有实现**。本单最值钱的一条。
 * 2. **`provenOptimal` 必须有目标值**（`aProvenBaselineRequiresAValue()`）。
 * 3. **禁用词扫描读的是整份报告的 `Debug` 文本**（`theForbiddenWordScanReadsEveryString()`）：
 *    调用方自己写的一句理由里带 `solver_row` 就被拒。
 * 4. **空 schema 与空身份被拒**（`blankSchemaAndBaselineFieldsAreRefused()`）。
 * 5. **存在的阶段会被逐个委托校验**（`theReportDelegatesToEachPresentStage()`）。
 * 6. **没有冲突解释就没有最小阻塞集合**（`aMissingConflictReportsNoMinimalBlockingSet()`）。
 * 7. **没有冲突解释时摘要逐字是"未执行"**（`aMissingConflictSummarisesAsNotRun()`，`blockingSummary()`）。
 * 8. **总体状态从不与阶段对照**（`theStatusIsNeverCheckedAgainstTheStages()`）。
 *
 * **The unified analysis report never validates its overall conclusion.** **A report with no stages can still claim a
 * proven conclusion** — the documented red line is not implemented, the most valuable finding here. **A proven baseline
 * requires a value.** **The forbidden-word scan reads the whole report's `Debug` text**, so a caller's own reason
 * mentioning `solver_row` is refused. **Blank schemas and identities are refused.** **Present stages are delegated to.**
 * **No conflict explanation means no minimal blocking set**, and **its summary is literally "not run".** And **the overall
 * status is never checked against the stages.**
 */
export class CriticalReportVerdict {
    private constructor(private state: CriticalReportBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): CriticalReportVerdict {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected critical report verdict text");
        }
        return invoke(() => new CriticalReportVerdict(wasm().CriticalReportVerdict.fromJson(json)));
    }
    private raw(): CriticalReportBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "critical report verdict has been disposed");
        }
        return this.state;
    }
    valid(): boolean { return invoke(() => this.raw().valid()); }
    minimalBlockingSet(): boolean { return invoke(() => this.raw().minimalBlockingSet()); }
    blockingSummary(): string { return invoke(() => this.raw().blockingSummary()); }
    anEmptyReportWithAProvenStatusStillValidates(): boolean {
        return invoke(() => this.raw().anEmptyReportWithAProvenStatusStillValidates());
    }
    aProvenBaselineRequiresAValue(): boolean {
        return invoke(() => this.raw().aProvenBaselineRequiresAValue());
    }
    theForbiddenWordScanReadsEveryString(): boolean {
        return invoke(() => this.raw().theForbiddenWordScanReadsEveryString());
    }
    blankSchemaAndBaselineFieldsAreRefused(): boolean {
        return invoke(() => this.raw().blankSchemaAndBaselineFieldsAreRefused());
    }
    theReportDelegatesToEachPresentStage(): boolean {
        return invoke(() => this.raw().theReportDelegatesToEachPresentStage());
    }
    aMissingConflictReportsNoMinimalBlockingSet(): boolean {
        return invoke(() => this.raw().aMissingConflictReportsNoMinimalBlockingSet());
    }
    aMissingConflictSummarisesAsNotRun(): boolean {
        return invoke(() => this.raw().aMissingConflictSummarisesAsNotRun());
    }
    theStatusIsNeverCheckedAgainstTheStages(): boolean {
        return invoke(() => this.raw().theStatusIsNeverCheckedAgainstTheStages());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条活动性记录。 / One activity record. */
export interface GroupActivitySpec {
    id: string;
    group?: string | null;
    activity: string;
}

/** 一条有效性条目。 / One effectiveness entry. */
export interface GroupEffectivenessSpec {
    id: string;
    group?: string | null;
    maxImprovement?: number | null;
}

/** 组汇总探针请求。 / The group-summary probe request. */
export interface GroupSummaryRequest {
    activity?: GroupActivitySpec[] | null;
    effectiveness?: GroupEffectivenessSpec[] | null;
}

/**
 * **跨阶段组汇总的四条口径**（续挖 `analysis/pipeline.rs` 的 `AnalysisGroupSummary` / `summarize_groups`）：
 *
 * 1. **顺序是阻塞降序 → active 降序 → 组名升序**（`theOrderIsBlockingThenActiveThenName()`）。
 * 2. **并列时未分组先行**（`theUngroupedBucketWinsATie()`）：`Option` 的排序里 `None < Some`，
 *    但 active 更多的组仍排在未分组之前。
 * 3. **没有改善的有效性条目不会建组**（`anEffectivenessWithoutAnImprovementCreatesNoGroup()`）。
 * 4. **`maxImprovement` 取最大值不是求和**（`theMaxImprovementIsAMaximumNotASum()`）。
 * 5. **`activeInstances` 只数 `Active`**（`onlyActiveCountsAsActive()`）：`NearlyActive` 不进这个计数。
 * 6. **只由有效性建出来的组三项计数全为 0**（`anEffectivenessOnlyGroupHasZeroCounts()`）。
 * 7. **只由活动性建出来的组没有改善值**（`anActivityOnlyGroupHasNoImprovement()`）。
 * 8. **三个阶段都缺时汇总为空**（`noStageMeansAnEmptySummary()`）。
 *
 * **The four readings behind the cross-stage group summary.** **The order is blocking then active then name**, and **the
 * ungrouped bucket wins a tie** rather than leading outright. **An effectiveness entry without an improvement creates no
 * group.** **`maxImprovement` is a maximum rather than a sum.** **`activeInstances` counts only `Active`**, so
 * `NearlyActive` is excluded. **An effectiveness-only group carries zero counts.** **An activity-only group has no
 * improvement.** And **no stage at all means an empty summary.**
 */
export class GroupSummaryReport {
    private constructor(private state: GroupSummaryBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): GroupSummaryReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected group summary report text");
        }
        return invoke(() => new GroupSummaryReport(wasm().GroupSummaryReport.fromJson(json)));
    }
    private raw(): GroupSummaryBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "group summary report has been disposed");
        }
        return this.state;
    }
    groupCount(): number { return invoke(() => this.raw().groupCount()); }
    groupAt(index: number): string { return invoke(() => this.raw().groupAt(index)); }
    ungroupedAt(index: number): boolean { return invoke(() => this.raw().ungroupedAt(index)); }
    involvedAt(index: number): number { return invoke(() => this.raw().involvedAt(index)); }
    activeAt(index: number): number { return invoke(() => this.raw().activeAt(index)); }
    blockingAt(index: number): number { return invoke(() => this.raw().blockingAt(index)); }
    maxImprovementAt(index: number): number | undefined {
        return invoke(() => this.raw().maxImprovementAt(index));
    }
    theOrderIsBlockingThenActiveThenName(): boolean {
        return invoke(() => this.raw().theOrderIsBlockingThenActiveThenName());
    }
    theUngroupedBucketWinsATie(): boolean {
        return invoke(() => this.raw().theUngroupedBucketWinsATie());
    }
    anEffectivenessWithoutAnImprovementCreatesNoGroup(): boolean {
        return invoke(() => this.raw().anEffectivenessWithoutAnImprovementCreatesNoGroup());
    }
    theMaxImprovementIsAMaximumNotASum(): boolean {
        return invoke(() => this.raw().theMaxImprovementIsAMaximumNotASum());
    }
    onlyActiveCountsAsActive(): boolean {
        return invoke(() => this.raw().onlyActiveCountsAsActive());
    }
    anEffectivenessOnlyGroupHasZeroCounts(): boolean {
        return invoke(() => this.raw().anEffectivenessOnlyGroupHasZeroCounts());
    }
    anActivityOnlyGroupHasNoImprovement(): boolean {
        return invoke(() => this.raw().anActivityOnlyGroupHasNoImprovement());
    }
    noStageMeansAnEmptySummary(): boolean {
        return invoke(() => this.raw().noStageMeansAnEmptySummary());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个分档探针。 / One banding probe. */
export interface BandProbeSpec {
    slack: number;
    scale: number;
}

/** 活动性分档探针请求。 / The activity-banding probe request. */
export interface BandProbeRequest {
    tolerance?: number;
    nearlyActiveTolerance?: number;
    relativeTolerance?: number;
    probes?: BandProbeSpec[];
    breakSummary?: boolean;
}

/**
 * **活动性分档的边界语义**（续挖 `analysis/activity.rs` 的 `ActivityConfig` /
 * `ConstraintActivityReport::validate`）：
 *
 * 1. **非有限的 slack 或尺度直接给 `Unknown`**（`aNonFiniteSlackOrScaleIsUnknown()`）。
 * 2. **恰好 `-active` 落在 `Active` 档而不是 `Violated`**（`minusTheToleranceIsActiveNotViolated()`）：
 *    `slack < -active` 是严格不等。
 * 3. **越过 active 带才违反**（`beyondTheActiveBandIsViolated()`）；正侧的 nearly 带只细分"未违反"。
 * 4. **尺度放大容差**（`theScaleWidensTheTolerance()`）：`relative * |scale|` 超过绝对容差时取它。
 * 5. **尺度永不缩小容差**（`theScaleNeverShrinksTheTolerance()`）：`|scale|.max(1.0)`。
 * 6. **nearly 档永不低于 active 档**（`theNearlyBandNeverSitsBelowActive()`）：`.max(active)` 让非法配置也能分类，
 *    只是 `configValid()` 为假。
 * 7. **合并计数必须等于重算结果**（`theSummaryMustMatchTheRecords()`）。
 * 8. **组计数必须等于重算结果**（`theGroupSummaryMustMatchTheRecords()`）。
 *
 * **The activity banding edges.** **A non-finite slack or scale yields `Unknown`.** **Exactly `-active` lands in `Active`**
 * rather than `Violated`, because the comparison is strict. **Only beyond the active band is violated.** **The scale widens
 * the tolerance.** **The scale never shrinks it.** **The nearly band never sits below active**, which lets an illegal
 * configuration still classify while `configValid()` stays false. And the report's **merged and per-group counts must both
 * equal a recount.**
 */
export class BandProbeReport {
    private constructor(private state: BandProbeBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): BandProbeReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected banding report text");
        }
        return invoke(() => new BandProbeReport(wasm().BandProbeReport.fromJson(json)));
    }
    private raw(): BandProbeBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "banding report has been disposed");
        }
        return this.state;
    }
    rowCount(): number { return invoke(() => this.raw().rowCount()); }
    statusAt(index: number): string { return invoke(() => this.raw().statusAt(index)); }
    activeToleranceAt(index: number): number {
        return invoke(() => this.raw().activeToleranceAt(index));
    }
    nearlyToleranceAt(index: number): number {
        return invoke(() => this.raw().nearlyToleranceAt(index));
    }
    configValid(): boolean { return invoke(() => this.raw().configValid()); }
    reportValid(): boolean { return invoke(() => this.raw().reportValid()); }
    aNonFiniteSlackOrScaleIsUnknown(): boolean {
        return invoke(() => this.raw().aNonFiniteSlackOrScaleIsUnknown());
    }
    minusTheToleranceIsActiveNotViolated(): boolean {
        return invoke(() => this.raw().minusTheToleranceIsActiveNotViolated());
    }
    beyondTheActiveBandIsViolated(): boolean {
        return invoke(() => this.raw().beyondTheActiveBandIsViolated());
    }
    theScaleWidensTheTolerance(): boolean {
        return invoke(() => this.raw().theScaleWidensTheTolerance());
    }
    theScaleNeverShrinksTheTolerance(): boolean {
        return invoke(() => this.raw().theScaleNeverShrinksTheTolerance());
    }
    theNearlyBandNeverSitsBelowActive(): boolean {
        return invoke(() => this.raw().theNearlyBandNeverSitsBelowActive());
    }
    theSummaryMustMatchTheRecords(): boolean {
        return invoke(() => this.raw().theSummaryMustMatchTheRecords());
    }
    theGroupSummaryMustMatchTheRecords(): boolean {
        return invoke(() => this.raw().theGroupSummaryMustMatchTheRecords());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一份不可行证据的描述。 / The description of one piece of infeasibility evidence. */
export interface InfeasibilityEvidenceSpec {
    source: string;
    reliability?: string | null;
    completeness?: string | null;
    minimality?: string | null;
    constraintIds?: string[];
    members?: string[];
    unavailableReason?: string | null;
}

/** 证据探针请求。 / The evidence probe request. */
export interface EvidenceProbeRequest {
    evidence: InfeasibilityEvidenceSpec;
}

/**
 * **不可行证据的权威性闸门只认来源，不认质量**（续挖 `solver/report/mod.rs` 的 `InfeasibilityEvidence`）：
 *
 * 1. **原生 IIS 与 Farkas 无条件权威**（`nativeAndFarkasAreAuthoritativeWhateverTheirQuality()`）：
 *    连 `HEURISTIC` + `UNAVAILABLE` 都算。
 * 2. **CP 重建必须同时 `EXACT` 与 `COMPLETE`**（`rebuildNeedsBothExactAndComplete()`）：
 *    `RELIABLE` + `COMPLETE` 不权威，`EXACT` + `PARTIAL` 也不权威。
 * 3. **删除过滤与弹性过滤永不权威**（`theFiltersAreNeverAuthoritative()`）。
 * 4. **`UNAVAILABLE` 永不权威**（`theUnavailableSourceIsNeverAuthoritative()`）。
 * 5. **`minimality` 默认 `NOT_CHECKED`**（`minimalityDefaultsToNotChecked()`）。
 * 6. **`constraintIds` 与 `members` 是两套互不推导的集合**（`theTwoMemberSetsNeverDeriveFromEachOther()`）。
 * 7. **`unavailableReason` 与任何状态都不联动**（`theUnavailableReasonIsTiedToNoState()`）。
 * 8. **线上枚举名是 `SCREAMING_SNAKE_CASE`，证据本体是 camelCase**（`theWireNamesAreScreamingSnakeCase()`）。
 *
 * **The authority gate for infeasibility evidence only reads the source, never the quality.** **Native IIS and Farkas are
 * authoritative whatever their quality**, even as `HEURISTIC` plus `UNAVAILABLE`. **A CP rebuild needs both `EXACT` and
 * `COMPLETE`**, since `RELIABLE` is not enough. **The two filters are never authoritative.** **The unavailable source never
 * is either.** **`minimality` defaults to `NOT_CHECKED`.** **The two identity sets never derive from each other.** **The
 * unavailable reason is tied to no state.** And **the wire enum names are SCREAMING_SNAKE_CASE while the evidence body is
 * camelCase.**
 */
export class EvidenceProbeReport {
    private constructor(private state: EvidenceProbeBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): EvidenceProbeReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected evidence report text");
        }
        return invoke(() => new EvidenceProbeReport(wasm().EvidenceProbeReport.fromJson(json)));
    }
    private raw(): EvidenceProbeBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "evidence report has been disposed");
        }
        return this.state;
    }
    authoritative(): boolean { return invoke(() => this.raw().authoritative()); }
    constraintIdCount(): number { return invoke(() => this.raw().constraintIdCount()); }
    memberCount(): number { return invoke(() => this.raw().memberCount()); }
    minimality(): string { return invoke(() => this.raw().minimality()); }
    nativeAndFarkasAreAuthoritativeWhateverTheirQuality(): boolean {
        return invoke(() => this.raw().nativeAndFarkasAreAuthoritativeWhateverTheirQuality());
    }
    rebuildNeedsBothExactAndComplete(): boolean {
        return invoke(() => this.raw().rebuildNeedsBothExactAndComplete());
    }
    theFiltersAreNeverAuthoritative(): boolean {
        return invoke(() => this.raw().theFiltersAreNeverAuthoritative());
    }
    theUnavailableSourceIsNeverAuthoritative(): boolean {
        return invoke(() => this.raw().theUnavailableSourceIsNeverAuthoritative());
    }
    minimalityDefaultsToNotChecked(): boolean {
        return invoke(() => this.raw().minimalityDefaultsToNotChecked());
    }
    theTwoMemberSetsNeverDeriveFromEachOther(): boolean {
        return invoke(() => this.raw().theTwoMemberSetsNeverDeriveFromEachOther());
    }
    theUnavailableReasonIsTiedToNoState(): boolean {
        return invoke(() => this.raw().theUnavailableReasonIsTiedToNoState());
    }
    theWireNamesAreScreamingSnakeCase(): boolean {
        return invoke(() => this.raw().theWireNamesAreScreamingSnakeCase());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一份报告的证明描述。 / The proof description of one report. */
export interface ProofSpec {
    kind?: string | null;
    status?: string | null;
    reliability?: string | null;
    completeness?: string | null;
    problem?: string | null;
    presence?: string | null;
    termination?: string | null;
    hasSolution?: boolean | null;
    dual?: string | null;
}

/** 证明探针请求。 / The proof probe request. */
export interface ProofProbeRequest {
    report: ProofSpec;
}

/**
 * **统一报告把"证明"当成一组互相牵制的合同**（续挖 `solver/report/mod.rs` 的 `SolveReport::validate` /
 * `require_optimal_lp_certificate`）：
 *
 * 1. **四个构造器给出的证明都是 `VERIFIED` + `EXACT` + `COMPLETE`**（`aFreshProofIsVerifiedExactAndComplete()`），
 *    且不带 reference 与 evidence。
 * 2. **已核验的证明必须完整**（`aVerifiedProofMustBeComplete()`）。
 * 3. **已核验的证明必须可靠**（`aVerifiedProofMustBeReliable()`）：`HEURISTIC` / `UNKNOWN` 被拒，`RELIABLE` 可以。
 * 4. **已核验的证明必须以 `Completed` 收尾**（`aVerifiedProofNeedsACompletedTermination()`）；
 *    `CLAIMED` 状态不受这条约束。
 * 5. **状态为 `NONE` 的证明直接被拒**（`aNoneStatusProofIsRefused()`）。
 * 6. **`Optimal` 的 incumbent 需要已核验的最优性证明**（`anOptimalPresenceNeedsAVerifiedOptimalityProof()`）：
 *    `CLAIMED` 不够，类型错也不够，没有 incumbent 也不够。
 * 7. **不可行证明要求不可行的题目状态**（`anInfeasibilityProofNeedsAnInfeasibleStatus()`）。
 * 8. **精确定价闸门要一个非空对偶解**（`theExactPricingGateNeedsANonEmptyDual()`）：
 *    缺对偶、空对偶都被拒 —— 而且**闸门放行蕴含报告合法**（`validate()` 是它的第一步）。
 *
 * **The report treats a proof as a web of mutual contracts.** **All four constructors yield `VERIFIED` plus `EXACT` plus
 * `COMPLETE`.** **A verified proof must be complete**, **must be reliable** (`RELIABLE` is accepted, `HEURISTIC` is not)
 * and **must finish with `Completed`**, which a `CLAIMED` proof is not bound by. **A proof whose status is `NONE` is
 * refused.** **An `Optimal` incumbent needs a verified optimality proof.** **An infeasibility proof demands an infeasible
 * problem status.** And **the exact-pricing gate needs a non-empty dual**, with a passing gate implying a legal report.
 */
export class ProofProbeReport {
    private constructor(private state: ProofProbeBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): ProofProbeReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected proof report text");
        }
        return invoke(() => new ProofProbeReport(wasm().ProofProbeReport.fromJson(json)));
    }
    private raw(): ProofProbeBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "proof report has been disposed");
        }
        return this.state;
    }
    reportValid(): boolean { return invoke(() => this.raw().reportValid()); }
    reportError(): string { return invoke(() => this.raw().reportError()); }
    gateOk(): boolean { return invoke(() => this.raw().gateOk()); }
    gateError(): string { return invoke(() => this.raw().gateError()); }
    aFreshProofIsVerifiedExactAndComplete(): boolean {
        return invoke(() => this.raw().aFreshProofIsVerifiedExactAndComplete());
    }
    aVerifiedProofMustBeComplete(): boolean {
        return invoke(() => this.raw().aVerifiedProofMustBeComplete());
    }
    aVerifiedProofMustBeReliable(): boolean {
        return invoke(() => this.raw().aVerifiedProofMustBeReliable());
    }
    aVerifiedProofNeedsACompletedTermination(): boolean {
        return invoke(() => this.raw().aVerifiedProofNeedsACompletedTermination());
    }
    aNoneStatusProofIsRefused(): boolean {
        return invoke(() => this.raw().aNoneStatusProofIsRefused());
    }
    anOptimalPresenceNeedsAVerifiedOptimalityProof(): boolean {
        return invoke(() => this.raw().anOptimalPresenceNeedsAVerifiedOptimalityProof());
    }
    anInfeasibilityProofNeedsAnInfeasibleStatus(): boolean {
        return invoke(() => this.raw().anInfeasibilityProofNeedsAnInfeasibleStatus());
    }
    theExactPricingGateNeedsANonEmptyDual(): boolean {
        return invoke(() => this.raw().theExactPricingGateNeedsANonEmptyDual());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条逐轮快照的描述。 / The description of one iteration snapshot. */
export interface SnapshotSpec {
    iteration: number;
    stage: string;
    objectiveValue?: number | null;
    bestBound?: number | null;
    relativeGap?: number | null;
    itemsAdded?: number;
    itemsTotal?: number;
}

/** gap 探针请求。 / The gap probe request. */
export interface GapProbeRequest {
    objectiveValue?: number | null;
    bestBoundValue?: number | null;
    absoluteGap?: number | null;
    relativeGap?: number | null;
    snapshots?: SnapshotSpec[];
}

/**
 * **报告里的 gap 是算出来的，不是抄进来的**（续挖 `solver/report/mod.rs` 的 gap 与 trace 两段校验）：
 *
 * 1. **绝对 gap 必须等于 `|incumbent − best_bound|`**（`theAbsoluteGapMustMatchTheIncumbentAndBound()`），
 *    而且**缺任一侧时 gap 不是跳过算术，而是整体不许出现**。
 * 2. **相对 gap 的分母以 1 为地板**（`theRelativeGapFloorsItsDenominatorAtOne()`）：
 *    目标 `0.5` 配下界 `0` → 相对 `0.5`（不设地板会是 `1.0`，被拒）；目标 `0.5` 配下界 `−3` → 绝对与相对都是 `3.5`。
 * 3. **负 gap 被拒**（`aNegativeGapIsRefused()`）。
 * 4. **非有限 gap 被拒**（`aNonFiniteGapIsRefused()`）。
 * 5. **逐轮编号从 1 起且连续**（`theIterationNumbersAreOneBasedAndContiguous()`）。
 * 6. **阶段名不得为空**（`aBlankIterationStageIsRefused()`）。
 * 7. **累计条目数不得下降**（`theCumulativeItemCountNeverDecreases()`）。
 * 8. **每轮 gap 与该轮自己的目标值和下界自洽**（`theSnapshotGapMustMatchItsOwnNumbers()`）。
 *
 * **The report's gap is computed, never copied in.** **The absolute gap must match the incumbent and the bound**, and
 * **a gap is forbidden outright when either side is missing**. **The relative gap floors its denominator at one**, so an
 * objective below one caps the relative gap at the absolute one. **A negative gap is refused.** **A non-finite gap is
 * refused.** **Iteration numbers are one-based and contiguous.** **A blank stage is refused.** **The cumulative item count
 * never decreases.** And **each snapshot's gap must agree with that snapshot's own numbers.**
 */
export class GapProbeReport {
    private constructor(private state: GapProbeBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): GapProbeReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected gap report text");
        }
        return invoke(() => new GapProbeReport(wasm().GapProbeReport.fromJson(json)));
    }
    private raw(): GapProbeBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "gap report has been disposed");
        }
        return this.state;
    }
    reportValid(): boolean { return invoke(() => this.raw().reportValid()); }
    reportError(): string { return invoke(() => this.raw().reportError()); }
    theAbsoluteGapMustMatchTheIncumbentAndBound(): boolean {
        return invoke(() => this.raw().theAbsoluteGapMustMatchTheIncumbentAndBound());
    }
    theRelativeGapFloorsItsDenominatorAtOne(): boolean {
        return invoke(() => this.raw().theRelativeGapFloorsItsDenominatorAtOne());
    }
    aNegativeGapIsRefused(): boolean { return invoke(() => this.raw().aNegativeGapIsRefused()); }
    aNonFiniteGapIsRefused(): boolean {
        return invoke(() => this.raw().aNonFiniteGapIsRefused());
    }
    theIterationNumbersAreOneBasedAndContiguous(): boolean {
        return invoke(() => this.raw().theIterationNumbersAreOneBasedAndContiguous());
    }
    aBlankIterationStageIsRefused(): boolean {
        return invoke(() => this.raw().aBlankIterationStageIsRefused());
    }
    theCumulativeItemCountNeverDecreases(): boolean {
        return invoke(() => this.raw().theCumulativeItemCountNeverDecreases());
    }
    theSnapshotGapMustMatchItsOwnNumbers(): boolean {
        return invoke(() => this.raw().theSnapshotGapMustMatchItsOwnNumbers());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条约束求值的描述。 / The description of one constraint evaluation. */
export interface EvaluationSpec {
    satisfied: boolean;
    violation: number;
}

/** 一条 warning / issue 的描述。 / The description of one warning or issue. */
export interface MessageSpec {
    code: string;
    message: string;
}

/** 诊断探针请求。 / The diagnostics probe request. */
export interface DiagnosticsProbeRequest {
    presence?: string | null;
    hasSolution?: boolean | null;
    typedValue?: boolean | null;
    evaluations?: EvaluationSpec[];
    warnings?: MessageSpec[];
    issues?: MessageSpec[];
}

/**
 * **报告的诊断面完全不受 `validate()` 约束**（续挖 `solver/report/mod.rs` 的 `has_incumbent` /
 * `SolveDiagnostics` / `ConstraintEvaluation`）：
 *
 * 1. **`hasIncumbent()` 只看 `solutionPresence`**（`hasIncumbentReadsOnlyThePresence()`）。
 * 2. **`isOptimal()` 只认 `Optimal`**（`isOptimalReadsOnlyThePresence()`）。
 * 3. **谓词从不校验报告**（`thePredicatesNeverValidateTheReport()`）：`presence: Incumbent` 配
 *    `hasSolution: false` 时谓词仍为真，而 `validate()` 会拒。
 * 4. **`incumbent()` 读 `solution.value`**（`theIncumbentReadsTheTypedValue()`），不是 `objectiveValue`。
 * 5. **诊断面从不被校验**（`theDiagnosticsAreNeverValidated()`）。
 * 6. **`satisfied` 与 `violation` 从不互相校验**（`satisfiedAndViolationAreNeverCrossChecked()`）：
 *    「标记满足却违反一亿」合法。
 * 7. **边界求值的标记也不与上下界校验**（`theBoundEvaluationFlagsAreNeverCrossChecked()`）。
 * 8. **空白 warning / issue 文本被接受**（`blankWarningsAndIssuesAreAccepted()`）。
 *
 * **The report's diagnostic face is not constrained by `validate()` at all.** **The predicates read only the presence**
 * and **never validate the report**, so `hasIncumbent()` can be true with no solution. **`incumbent()` reads the typed
 * value.** **The diagnostics are never validated**, **`satisfied` is never cross-checked against `violation`**, **the bound
 * flags are never cross-checked against the bounds**, and **blank warnings and issues are accepted.**
 */
export class DiagnosticsProbeReport {
    private constructor(private state: DiagnosticsProbeBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): DiagnosticsProbeReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected diagnostics report text");
        }
        return invoke(() => new DiagnosticsProbeReport(
            wasm().DiagnosticsProbeReport.fromJson(json)));
    }
    private raw(): DiagnosticsProbeBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "diagnostics report has been disposed");
        }
        return this.state;
    }
    reportValid(): boolean { return invoke(() => this.raw().reportValid()); }
    reportError(): string { return invoke(() => this.raw().reportError()); }
    hasIncumbent(): boolean { return invoke(() => this.raw().hasIncumbent()); }
    isOptimal(): boolean { return invoke(() => this.raw().isOptimal()); }
    incumbentPresent(): boolean { return invoke(() => this.raw().incumbentPresent()); }
    hasIncumbentReadsOnlyThePresence(): boolean {
        return invoke(() => this.raw().hasIncumbentReadsOnlyThePresence());
    }
    isOptimalReadsOnlyThePresence(): boolean {
        return invoke(() => this.raw().isOptimalReadsOnlyThePresence());
    }
    thePredicatesNeverValidateTheReport(): boolean {
        return invoke(() => this.raw().thePredicatesNeverValidateTheReport());
    }
    theIncumbentReadsTheTypedValue(): boolean {
        return invoke(() => this.raw().theIncumbentReadsTheTypedValue());
    }
    theDiagnosticsAreNeverValidated(): boolean {
        return invoke(() => this.raw().theDiagnosticsAreNeverValidated());
    }
    satisfiedAndViolationAreNeverCrossChecked(): boolean {
        return invoke(() => this.raw().satisfiedAndViolationAreNeverCrossChecked());
    }
    theBoundEvaluationFlagsAreNeverCrossChecked(): boolean {
        return invoke(() => this.raw().theBoundEvaluationFlagsAreNeverCrossChecked());
    }
    blankWarningsAndIssuesAreAccepted(): boolean {
        return invoke(() => this.raw().blankWarningsAndIssuesAreAccepted());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个审计指纹的描述。 / The description of one audit fingerprint. */
export interface AuditFingerprintSpec {
    schemaVersion?: string | null;
    algorithm?: string | null;
    value?: string | null;
}

/** 指纹探针请求。 / The fingerprint probe request. */
export interface FingerprintProbeRequest {
    model?: AuditFingerprintSpec | null;
    expected?: AuditFingerprintSpec | null;
    solverId?: string | null;
    backendName?: string | null;
    deterministic?: boolean | null;
    randomSeed?: number | null;
    schemaVersion?: string | null;
    infeasible?: boolean | null;
}

/**
 * **指纹与 provenance 是纯容器，谁都不校验**（续挖 `solver/report/mod.rs` 的 `SolverProvenance` /
 * `SolveFingerprints` / `AuditFingerprint`）：
 *
 * 1. **`SolverProvenance::default()` 把 solver 与 backend 都写成 `unknown`**（不是空白），其余为空或未知
 *    （`theProvenanceDefaultNamesAnUnknownSolver()`）。
 * 2. **`SolveFingerprints::default()` 三个都是 `None`**（`theFingerprintsDefaultToNothing()`）。
 * 3. **指纹相等是三个字段的结构相等**（`theFingerprintEqualityIsStructural()`）。
 * 4. **比较会读每一个字段**（`theComparisonReadsEveryField()`）：同一个 `value` 配不同 `algorithm` **不相等**。
 * 5. **指纹的 schema 版本从不被检查**（`theFingerprintSchemaVersionIsNeverChecked()`）。
 * 6. **报告没带模型指纹时闸门直接拒**（`aMissingModelFingerprintFailsTheGate()`）。
 * 7. **provenance 从不被校验**（`theProvenanceIsNeverValidated()`）：空白 id、「声明确定性却带随机种子」都通过。
 * 8. **报告 schema 版本从不与常量比对**（`theReportSchemaVersionIsNeverCompared()`）。
 *
 * **The fingerprints and the provenance are pure containers that nobody validates.** **The provenance default names both
 * the solver and the backend `unknown`.** **The fingerprints default to nothing.** **Fingerprint equality is structural**
 * and **reads every field**, so the same value with a different algorithm is not equal. **The fingerprint schema version is
 * never checked.** **A missing model fingerprint fails the gate.** **The provenance is never validated.** And **the
 * report's schema version is never compared with the constant.**
 */
export class FingerprintProbeReport {
    private constructor(private state: FingerprintProbeBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): FingerprintProbeReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected fingerprint report text");
        }
        return invoke(() => new FingerprintProbeReport(
            wasm().FingerprintProbeReport.fromJson(json)));
    }
    private raw(): FingerprintProbeBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "fingerprint report has been disposed");
        }
        return this.state;
    }
    reportValid(): boolean { return invoke(() => this.raw().reportValid()); }
    reportError(): string { return invoke(() => this.raw().reportError()); }
    gateOk(): boolean { return invoke(() => this.raw().gateOk()); }
    gateError(): string { return invoke(() => this.raw().gateError()); }
    theProvenanceDefaultNamesAnUnknownSolver(): boolean {
        return invoke(() => this.raw().theProvenanceDefaultNamesAnUnknownSolver());
    }
    theFingerprintsDefaultToNothing(): boolean {
        return invoke(() => this.raw().theFingerprintsDefaultToNothing());
    }
    theFingerprintEqualityIsStructural(): boolean {
        return invoke(() => this.raw().theFingerprintEqualityIsStructural());
    }
    theComparisonReadsEveryField(): boolean {
        return invoke(() => this.raw().theComparisonReadsEveryField());
    }
    theFingerprintSchemaVersionIsNeverChecked(): boolean {
        return invoke(() => this.raw().theFingerprintSchemaVersionIsNeverChecked());
    }
    aMissingModelFingerprintFailsTheGate(): boolean {
        return invoke(() => this.raw().aMissingModelFingerprintFailsTheGate());
    }
    theProvenanceIsNeverValidated(): boolean {
        return invoke(() => this.raw().theProvenanceIsNeverValidated());
    }
    theReportSchemaVersionIsNeverCompared(): boolean {
        return invoke(() => this.raw().theReportSchemaVersionIsNeverCompared());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条删除复验记录。 / One deletion verification record. */
export interface VerificationSpec {
    id: string;
    status?: string | null;
    removed?: boolean | null;
    retained?: boolean | null;
    targetFixed?: boolean | null;
}

/** 最小阻塞集合探针请求。 / The minimal-blocking-set probe request. */
export interface BlockingSetRequest {
    minimality?: string | null;
    status?: string | null;
    validity?: string | null;
    members?: string[];
    verifications?: VerificationSpec[];
    backgroundBlocking?: boolean | null;
    extractionTier?: string | null;
}

/**
 * **最小阻塞集合的"已证明最小"只读一个字段**（续挖 `analysis/conflict.rs` 的 `MinimalBlockingSet`）：
 *
 * 1. **`verified()` 等价于 `minimality === "Irreducible"`**（`verifiedReadsOnlyTheMinimality()`）。
 * 2. **`is_verified()` 与 `as_solver_minimality()` 是同一套三分**（`theMinimalityThreeWaySplitIsShared()`），
 *    默认 `NotChecked`。
 * 3. **判据不看 `status`**（`verifiedIgnoresTheStatus()`）。
 * 4. **判据不看 `validity`**（`verifiedIgnoresTheValidity()`）。
 * 5. **判据不看复验记录**（`verifiedIgnoresTheVerifications()`）：空记录照样"已证明"。
 * 6. **判据不看成员**（`verifiedIgnoresTheMembers()`）：空成员照样"已证明"。
 * 7. **判据不看背景阻塞与提取层级**（`verifiedIgnoresTheBackgroundAndTheTier()`）。
 * 8. **`isNative()` 只认 `NativeUnsatCore`**（`onlyTheNativeTierIsNative()`）。
 *
 * **The minimal blocking set's "proven minimal" reads a single field.** **`verified()` is exactly `minimality ===
 * "Irreducible"`.** **`is_verified()` and `as_solver_minimality()` share one split**, defaulting to `NotChecked`. **The
 * verdict ignores the status**, **ignores the validity**, **ignores the verification records**, **ignores the members**,
 * and **ignores both the background blocking and the tier**. And **`isNative()` accepts only the native tier.**
 */
export class BlockingSetReport {
    private constructor(private state: BlockingSetBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): BlockingSetReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected blocking set report text");
        }
        return invoke(() => new BlockingSetReport(wasm().BlockingSetReport.fromJson(json)));
    }
    private raw(): BlockingSetBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "blocking set report has been disposed");
        }
        return this.state;
    }
    verified(): boolean { return invoke(() => this.raw().verified()); }
    minimality(): string { return invoke(() => this.raw().minimality()); }
    extractionTier(): string { return invoke(() => this.raw().extractionTier()); }
    nativeTier(): boolean { return invoke(() => this.raw().nativeTier()); }
    verifiedReadsOnlyTheMinimality(): boolean {
        return invoke(() => this.raw().verifiedReadsOnlyTheMinimality());
    }
    theMinimalityThreeWaySplitIsShared(): boolean {
        return invoke(() => this.raw().theMinimalityThreeWaySplitIsShared());
    }
    verifiedIgnoresTheStatus(): boolean {
        return invoke(() => this.raw().verifiedIgnoresTheStatus());
    }
    verifiedIgnoresTheValidity(): boolean {
        return invoke(() => this.raw().verifiedIgnoresTheValidity());
    }
    verifiedIgnoresTheVerifications(): boolean {
        return invoke(() => this.raw().verifiedIgnoresTheVerifications());
    }
    verifiedIgnoresTheMembers(): boolean {
        return invoke(() => this.raw().verifiedIgnoresTheMembers());
    }
    verifiedIgnoresTheBackgroundAndTheTier(): boolean {
        return invoke(() => this.raw().verifiedIgnoresTheBackgroundAndTheTier());
    }
    onlyTheNativeTierIsNative(): boolean {
        return invoke(() => this.raw().onlyTheNativeTierIsNative());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个修正候选的描述。 / The description of one correction candidate. */
export interface CorrectionCandidateSpec {
    id: string;
    weight: number;
    relaxation: number;
}

/** 修正建议探针请求。 / The correction probe request. */
export interface CorrectionProbeRequest {
    maxCandidates?: number;
    maxPlans?: number;
    requirePositiveWeight?: boolean;
    candidates?: CorrectionCandidateSpec[];
    verified?: boolean;
    minimal?: boolean;
}

/**
 * **修正建议是"按成本升序截断"的确定性排序，且从不自称完整 MCS**（续挖 `analysis/correction.rs` 的
 * `weighted_correction_set` / `minimal_correction_set` / `CorrectionSet`）：
 *
 * 1. **按 `weight × relaxation` 升序排**（`theRecommendationSortsByCostAscending()`），并列按稳定 ID。
 * 2. **截断留下最便宜的**（`theTruncationKeepsTheCheapest()`）。
 * 3. **`totalCost` 是乘积之和且必须自洽**（1e-9 内，`theTotalCostIsTheSumOfTheProducts()`）。
 * 4. **带权集合从不 `minimal`**，且 `completeMcs()` 恒假、`requiresRevalidation()` 恒真
 *    （`theWeightedSetIsNeverMinimal()`）。
 * 5. **`minimal` 入口必须显式声明已复验**（`theMinimalSetRequiresTheVerificationClaim()`）。
 * 6. **一旦截断就退回 `minimal = false`**（`theTruncationDropsTheMinimalFlag()`）。
 * 7. **策略的零上限被拒**（`thePolicyRefusesZeroLimits()`）。
 * 8. **权重 ≤ 0 只在策略要求正权重时才被拒**，而松弛幅度为 0 与策略无关地被拒
 *    （`aNonPositiveWeightIsPolicyDependent()`）。
 *
 * 线上成员身份带 `constraint:` 前缀（`DiagnosticSource::stable_id()` 的形态）。
 * The wire member identity carries the `constraint:` prefix, the shape of `DiagnosticSource::stable_id()`.
 *
 * **The correction recommendation is a deterministic ascending-cost truncation that never claims a complete MCS.** **It
 * sorts by cost ascending** with ties by stable id. **The truncation keeps the cheapest.** **`totalCost` is the sum of the
 * products.** **The weighted set is never minimal**, `completeMcs()` is always false and `requiresRevalidation()` always
 * true. **The minimal path demands the verification claim**, and **truncation drops the minimal flag**. **The policy
 * refuses zero limits.** And **a non-positive weight is policy dependent**, while a zero relaxation is refused regardless.
 */
export class CorrectionProbeReport {
    private constructor(private state: CorrectionProbeBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): CorrectionProbeReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected correction report text");
        }
        return invoke(() => new CorrectionProbeReport(
            wasm().CorrectionProbeReport.fromJson(json)));
    }
    private raw(): CorrectionProbeBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "correction report has been disposed");
        }
        return this.state;
    }
    built(): boolean { return invoke(() => this.raw().built()); }
    error(): string { return invoke(() => this.raw().error()); }
    memberCount(): number { return invoke(() => this.raw().memberCount()); }
    memberIdAt(index: number): string { return invoke(() => this.raw().memberIdAt(index)); }
    memberCostAt(index: number): number { return invoke(() => this.raw().memberCostAt(index)); }
    totalCost(): number { return invoke(() => this.raw().totalCost()); }
    minimal(): boolean { return invoke(() => this.raw().minimal()); }
    completeMcs(): boolean { return invoke(() => this.raw().completeMcs()); }
    requiresRevalidation(): boolean { return invoke(() => this.raw().requiresRevalidation()); }
    theRecommendationSortsByCostAscending(): boolean {
        return invoke(() => this.raw().theRecommendationSortsByCostAscending());
    }
    theTruncationKeepsTheCheapest(): boolean {
        return invoke(() => this.raw().theTruncationKeepsTheCheapest());
    }
    theTotalCostIsTheSumOfTheProducts(): boolean {
        return invoke(() => this.raw().theTotalCostIsTheSumOfTheProducts());
    }
    theWeightedSetIsNeverMinimal(): boolean {
        return invoke(() => this.raw().theWeightedSetIsNeverMinimal());
    }
    theMinimalSetRequiresTheVerificationClaim(): boolean {
        return invoke(() => this.raw().theMinimalSetRequiresTheVerificationClaim());
    }
    theTruncationDropsTheMinimalFlag(): boolean {
        return invoke(() => this.raw().theTruncationDropsTheMinimalFlag());
    }
    thePolicyRefusesZeroLimits(): boolean {
        return invoke(() => this.raw().thePolicyRefusesZeroLimits());
    }
    aNonPositiveWeightIsPolicyDependent(): boolean {
        return invoke(() => this.raw().aNonPositiveWeightIsPolicyDependent());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条约束局部灵敏度的描述。 / The description of one constraint's local sensitivity. */
export interface LocalSensitivitySpec {
    id: string;
    /** `none` / `zero` / `one` / `infinite`，缺省为 `one`。 */
    dual?: string | null;
    localEffective?: boolean | null;
}

/** 灵敏度探针请求。 / The sensitivity probe request. */
export interface SensitivityProbeRequest {
    integralityTolerance?: number | null;
    dualTolerance?: number | null;
    schemaVersion?: string | null;
    baselineObjective?: number | null;
    lpObjective?: number | null;
    constraints?: LocalSensitivitySpec[];
    query?: string | null;
}

/**
 * **灵敏度容差没有顺序约束，而"有没有对偶"完全不看容差**（续挖 `analysis/fixed_integer.rs` 的
 * `FixedIntegerLpSensitivityConfig` / `LocalConstraintSensitivityReport` / `SensitivityScope`）：
 *
 * 1. **两个容差必须有限且非负**（`theTolerancesMustBeFiniteAndNonNegative()`），零合法。
 * 2. **容差之间没有顺序约束**（`theTolerancesAreNotOrdered()`）：`integrality < dual` 也合法
 *    —— 与 activity 配置的口径不同。
 * 3. **默认值是 `1e-7` 与 `1e-9`**（`theDefaultsAreTheDocumentedPair()`）。
 * 4. **报告校验覆盖五个字段**（`theReportValidationCoversFiveFields()`）：空 schema、非有限目标值、
 *    空约束 ID、非有限对偶、非有限 LP 目标。
 * 5. **`hasDuals()` 只问有没有 `Some`**（`hasDualsCountsAnySome()`）：**零对偶算有对偶**。
 * 6. **`hasDuals()` 连非有限对偶都算**（`hasDualsIgnoresValidity()`），而 `validate()` 会拒这种报告。
 * 7. **按身份查记录是先到先得**（`theLookupIsFirstWins()`）。
 * 8. **范围名与线上名不一致**（`theScopeNameDiffersFromTheWire()`）：`fixed_integer_incumbent` 对
 *    `FIXED_INTEGER_INCUMBENT`。
 *
 * **The sensitivity tolerances carry no ordering constraint, and "are there duals" ignores them entirely.** **Both
 * tolerances must be finite and non-negative**, zero included, and **they are unordered**. **The defaults are `1e-7` and
 * `1e-9`.** **The report validation covers five fields.** **`hasDuals()` counts any `Some`**, so a zero dual counts, and
 * **it ignores validity**, counting even a non-finite dual that `validate()` refuses. **The lookup is first wins.** And
 * **the scope name differs from the wire name.**
 */
export class SensitivityProbeReport {
    private constructor(private state: SensitivityProbeBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): SensitivityProbeReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected sensitivity report text");
        }
        return invoke(() => new SensitivityProbeReport(
            wasm().SensitivityProbeReport.fromJson(json)));
    }
    private raw(): SensitivityProbeBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "sensitivity report has been disposed");
        }
        return this.state;
    }
    configValid(): boolean { return invoke(() => this.raw().configValid()); }
    configError(): string { return invoke(() => this.raw().configError()); }
    reportValid(): boolean { return invoke(() => this.raw().reportValid()); }
    reportError(): string { return invoke(() => this.raw().reportError()); }
    hasDuals(): boolean { return invoke(() => this.raw().hasDuals()); }
    /** 查询命中的对偶值；`undefined` 表示没有命中或没有对偶。 */
    queryDual(): number | undefined { return invoke(() => this.raw().queryDual()); }
    queryHit(): boolean { return invoke(() => this.raw().queryHit()); }
    theTolerancesMustBeFiniteAndNonNegative(): boolean {
        return invoke(() => this.raw().theTolerancesMustBeFiniteAndNonNegative());
    }
    theTolerancesAreNotOrdered(): boolean {
        return invoke(() => this.raw().theTolerancesAreNotOrdered());
    }
    theDefaultsAreTheDocumentedPair(): boolean {
        return invoke(() => this.raw().theDefaultsAreTheDocumentedPair());
    }
    theReportValidationCoversFiveFields(): boolean {
        return invoke(() => this.raw().theReportValidationCoversFiveFields());
    }
    hasDualsCountsAnySome(): boolean { return invoke(() => this.raw().hasDualsCountsAnySome()); }
    hasDualsIgnoresValidity(): boolean { return invoke(() => this.raw().hasDualsIgnoresValidity()); }
    theLookupIsFirstWins(): boolean { return invoke(() => this.raw().theLookupIsFirstWins()); }
    theScopeNameDiffersFromTheWire(): boolean {
        return invoke(() => this.raw().theScopeNameDiffersFromTheWire());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个候选输入的描述。 / The description of one candidate input. */
export interface FunnelSortCandidateSpec {
    id: string;
    /** `Active` / `NearlyActive` / `Inactive` / `SatisfiedWithoutSlackMetric` / `Violated` / `Unknown`。 */
    status: string;
    group?: string | null;
    dual?: number | null;
}

/** 候选漏斗探针请求。 / The candidate funnel probe request. */
export interface FunnelProbeRequest {
    dualThreshold?: number | null;
    defaultCandidateLimit?: number | null;
    candidates?: FunnelSortCandidateSpec[];
    shortlist?: number | null;
    withSensitivity?: boolean | null;
}

/**
 * **候选漏斗的分层、排序与短名单**（续挖 `analysis/pipeline.rs` 的 `build_candidate_funnel` /
 * `classify_candidate` / `CandidateFunnelRanking`）：
 *
 * 1. **A/B 分界是 `|dual| > threshold`（严格大于）**（`theTierBoundaryIsStrictlyGreaterThanTheThreshold()`）：
 *    正好等于阈值落到 B，负对偶按绝对值。
 * 2. **`Active` 与 `NearlyActive` 同权**（`bothActiveStatesShareTheDualRule()`）。
 * 3. **只有 `Inactive` 与 `SatisfiedWithoutSlackMetric` 到 C**（`onlyTheSlacklessStatesReachTierC()`），
 *    `Violated`/`Unknown` 是未分层。
 * 4. **没有灵敏度报告就没有分层可声称**（`noSensitivityMeansNoTierClaim()`），C 除外。
 * 5. **排序：层级（A<B<C<未分层）→ |dual| 降序 → 身份升序**，`priority` 就是位置
 *    （`theOrderingIsTierThenDualThenIdentity()`）。
 * 6. **短名单先放 A/B**（`theShortlistPreferstheStrongTiers()`），再用 C/未分层补满名额。
 * 7. **`localEffective` 由漏斗自己按阈值重算**（`theLocalEffectivenessIsRecomputedHere()`），不读灵敏度报告。
 * 8. **配置里的 `defaultCandidateLimit` 在漏斗里根本不生效**（`theCandidateLimitIsNotEnforced()`）。
 *
 * **The candidate funnel's tiers, ordering and shortlist.** **The A/B boundary is `|dual| > threshold`, strictly
 * greater**, so exactly the threshold lands in B and a negative dual is judged by magnitude. **`Active` and
 * `NearlyActive` share the rule.** **Only `Inactive` and `SatisfiedWithoutSlackMetric` reach C** while `Violated` and
 * `Unknown` stay unclassified. **Without a sensitivity report no tier may be claimed** apart from C. **The order is tier,
 * then |dual| descending, then identity ascending**, with `priority` equal to the position. **The shortlist takes A/B
 * first** and then fills the remaining slots. **`localEffective` is recomputed here.** And **`defaultCandidateLimit` is not
 * enforced by the funnel at all.**
 */
export class FunnelProbeReport {
    private constructor(private state: FunnelProbeBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): FunnelProbeReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected funnel report text");
        }
        return invoke(() => new FunnelProbeReport(wasm().FunnelProbeReport.fromJson(json)));
    }
    private raw(): FunnelProbeBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "funnel report has been disposed");
        }
        return this.state;
    }
    candidateCount(): number { return invoke(() => this.raw().candidateCount()); }
    candidateIdAt(index: number): string { return invoke(() => this.raw().candidateIdAt(index)); }
    candidateTierAt(index: number): string {
        return invoke(() => this.raw().candidateTierAt(index));
    }
    candidatePriorityAt(index: number): number {
        return invoke(() => this.raw().candidatePriorityAt(index));
    }
    candidateLocalEffectiveAt(index: number): boolean | undefined {
        return invoke(() => this.raw().candidateLocalEffectiveAt(index));
    }
    tierA(): number { return invoke(() => this.raw().tierA()); }
    tierB(): number { return invoke(() => this.raw().tierB()); }
    tierC(): number { return invoke(() => this.raw().tierC()); }
    unclassified(): number { return invoke(() => this.raw().unclassified()); }
    shortlistCount(): number { return invoke(() => this.raw().shortlistCount()); }
    shortlistIdAt(index: number): string {
        return invoke(() => this.raw().shortlistIdAt(index));
    }
    theTierBoundaryIsStrictlyGreaterThanTheThreshold(): boolean {
        return invoke(() => this.raw().theTierBoundaryIsStrictlyGreaterThanTheThreshold());
    }
    bothActiveStatesShareTheDualRule(): boolean {
        return invoke(() => this.raw().bothActiveStatesShareTheDualRule());
    }
    onlyTheSlacklessStatesReachTierC(): boolean {
        return invoke(() => this.raw().onlyTheSlacklessStatesReachTierC());
    }
    noSensitivityMeansNoTierClaim(): boolean {
        return invoke(() => this.raw().noSensitivityMeansNoTierClaim());
    }
    theOrderingIsTierThenDualThenIdentity(): boolean {
        return invoke(() => this.raw().theOrderingIsTierThenDualThenIdentity());
    }
    theShortlistPreferstheStrongTiers(): boolean {
        return invoke(() => this.raw().theShortlistPreferstheStrongTiers());
    }
    theLocalEffectivenessIsRecomputedHere(): boolean {
        return invoke(() => this.raw().theLocalEffectivenessIsRecomputedHere());
    }
    theCandidateLimitIsNotEnforced(): boolean {
        return invoke(() => this.raw().theCandidateLimitIsNotEnforced());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条有效性条目的描述。 / The description of one effectiveness entry. */
export interface EffectivenessEntrySpec {
    id: string;
    dual?: number | null;
    localEffective?: boolean | null;
    removalEffective?: boolean | null;
    firstEffectiveDelta?: number | null;
    maxImprovement?: number | null;
    marginalEffect?: number | null;
    status?: string | null;
}

/** 有效性排序探针请求。 / The effectiveness ranking probe request. */
export interface EffectivenessRankingRequest {
    schemaVersion?: string | null;
    baselineObjective?: number | null;
    entries?: EffectivenessEntrySpec[];
}

/**
 * **有效性排序的两个视角互不蕴含，而且"已排序"只是文档承诺**（续挖 `analysis/pipeline.rs` 的
 * `EffectivenessRanking` / `EffectivenessEntry`）：
 *
 * 1. **全局有效只看 `maxImprovement > 0`**（`globalEffectiveNeedsAStrictlyPositiveImprovement()`）：
 *    `0`、负数、缺失都不算。
 * 2. **两个视角都按原顺序过滤，`validate()` 从不检查排序**
 *    （`theViewsFilterInPlaceAndTheOrderIsUnchecked()`）：乱序的排序照样合法。
 * 3. **局部有效只认恰好 `true`**（`localEffectiveAcceptsExactlyTrue()`）。
 * 4. **两个视角互不蕴含**（`theTwoViewsDoNotImplyEachOther()`）：两个方向都能出现一真一假。
 * 5. **校验拒重复身份、空身份与非有限数值**（`validationRefusesDuplicatesAndNonFiniteValues()`）。
 * 6. **`firstEffectiveDelta` 必须是正数**（`theFirstDeltaMustBePositive()`）：0 也被拒。
 * 7. **`localEffective` 必须有对偶**（`theLocalVerdictRequiresADual()`）。
 * 8. **`removalEffective` 只在 `Unsupported` 时被拒**（`theRemovalVerdictOnlyRejectsUnsupported()`）：
 *    `Unknown` 配 `true` 照样通过。
 *
 * **The effectiveness ranking's two views are mutually non-implying, and "sorted" is only a documentation promise.**
 * **A global verdict needs a strictly positive improvement.** **Both views filter in the original order and the order is
 * never checked.** **A local verdict accepts exactly `true`.** **The two views do not imply each other.** **Validation
 * refuses duplicates and non-finite values.** **The first delta must be positive.** **The local verdict requires a dual.**
 * And **the removal verdict only rejects unsupported statuses.**
 */
export class EffectivenessRankingReport {
    private constructor(private state: EffectivenessRankingBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): EffectivenessRankingReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected effectiveness report text");
        }
        return invoke(() => new EffectivenessRankingReport(
            wasm().EffectivenessRankingReport.fromJson(json)));
    }
    private raw(): EffectivenessRankingBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "effectiveness report has been disposed");
        }
        return this.state;
    }
    rankingValid(): boolean { return invoke(() => this.raw().rankingValid()); }
    rankingError(): string { return invoke(() => this.raw().rankingError()); }
    rowCount(): number { return invoke(() => this.raw().rowCount()); }
    rowIdAt(index: number): string { return invoke(() => this.raw().rowIdAt(index)); }
    rowGlobalEffectiveAt(index: number): boolean {
        return invoke(() => this.raw().rowGlobalEffectiveAt(index));
    }
    rowInLocalViewAt(index: number): boolean {
        return invoke(() => this.raw().rowInLocalViewAt(index));
    }
    globalCount(): number { return invoke(() => this.raw().globalCount()); }
    localCount(): number { return invoke(() => this.raw().localCount()); }
    globalEffectiveNeedsAStrictlyPositiveImprovement(): boolean {
        return invoke(() => this.raw().globalEffectiveNeedsAStrictlyPositiveImprovement());
    }
    theViewsFilterInPlaceAndTheOrderIsUnchecked(): boolean {
        return invoke(() => this.raw().theViewsFilterInPlaceAndTheOrderIsUnchecked());
    }
    localEffectiveAcceptsExactlyTrue(): boolean {
        return invoke(() => this.raw().localEffectiveAcceptsExactlyTrue());
    }
    theTwoViewsDoNotImplyEachOther(): boolean {
        return invoke(() => this.raw().theTwoViewsDoNotImplyEachOther());
    }
    validationRefusesDuplicatesAndNonFiniteValues(): boolean {
        return invoke(() => this.raw().validationRefusesDuplicatesAndNonFiniteValues());
    }
    theFirstDeltaMustBePositive(): boolean {
        return invoke(() => this.raw().theFirstDeltaMustBePositive());
    }
    theLocalVerdictRequiresADual(): boolean {
        return invoke(() => this.raw().theLocalVerdictRequiresADual());
    }
    theRemovalVerdictOnlyRejectsUnsupported(): boolean {
        return invoke(() => this.raw().theRemovalVerdictOnlyRejectsUnsupported());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个排序项的描述。 / The description of one sort item. */
export interface PersistenceSortItemSpec {
    path: string;
    /** `Asc` / `Desc`，缺省为 `Asc`。 */
    direction?: string | null;
    /** `NullsFirst` / `NullsLast`，缺省不打 nulls 标记。 */
    nulls?: string | null;
}

/** 排序描述探针请求。 / The sort descriptor probe request. */
export interface PersistenceSortProbeRequest {
    items?: PersistenceSortItemSpec[];
    probeDirection?: string | null;
}

/**
 * **排序描述是纯追加的构建器，而"空值排序支持"只问方向**（续挖 `persistence/expression/sort_by.rs` 的
 * `SortBy` / `SortItem` / `NullsOrderSupport`）：
 *
 * 1. **`then` 只把新项追加到末尾**（`theThenFamilyAppendsToTheTail()`）。
 * 2. **`then` 不合并同路径项**（`thenDoesNotMergeTheSamePath()`）：同一字段写两次留两条。
 * 3. **`Add` 就是 `then`**（`theAddOperatorIsThen()`）。
 * 4. **空/非空互补**（`emptinessIsComplementary()`）。
 * 5. **`isSupported` 只问方向**（`theSupportTestReadsTheDirectionOnly()`）：`Auto`/`Always` 恒真、`Never`
 *    恒假、`OnlyAsc` 只认 `Asc`。
 * 6. **`isSupported` 完全不看 `nulls`**（`theSupportTestIgnoresTheNullsField()`）：`nulls` 缺省的项也算"支持"。
 * 7. **`*_nulls` 与普通构造只差 `nulls`**（`theNullsConstructorsDifferOnlyByTheNullsField()`）。
 * 8. **`*_many` 保留输入顺序**（`theManyConstructorsKeepTheInputOrder()`）。
 *
 * **The sort descriptor is a pure-append builder, and "null ordering support" asks about the direction alone.** **`then`
 * only appends to the tail** and **never merges same-path items**, while **`Add` is `then`**. **Emptiness is
 * complementary.** **`isSupported` reads the direction only** — `Auto`/`Always` are always true, `Never` always false and
 * `OnlyAsc` accepts `Asc` only — and **it never looks at the `nulls` field**. **The `*_nulls` constructors differ only by
 * the nulls field.** And **the `*_many` constructors keep the input order.**
 */
export class PersistenceSortProbeReport {
    private constructor(private state: PersistenceSortBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): PersistenceSortProbeReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected persistence sort report text");
        }
        return invoke(() => new PersistenceSortProbeReport(
            wasm().PersistenceSortProbeReport.fromJson(json)));
    }
    private raw(): PersistenceSortBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "persistence sort report has been disposed");
        }
        return this.state;
    }
    itemCount(): number { return invoke(() => this.raw().itemCount()); }
    itemPathAt(index: number): string { return invoke(() => this.raw().itemPathAt(index)); }
    itemDirectionAt(index: number): string {
        return invoke(() => this.raw().itemDirectionAt(index));
    }
    itemNullsAt(index: number): string | undefined {
        return invoke(() => this.raw().itemNullsAt(index));
    }
    empty(): boolean { return invoke(() => this.raw().empty()); }
    notEmpty(): boolean { return invoke(() => this.raw().notEmpty()); }
    autoSupported(): boolean { return invoke(() => this.raw().autoSupported()); }
    alwaysSupported(): boolean { return invoke(() => this.raw().alwaysSupported()); }
    neverSupported(): boolean { return invoke(() => this.raw().neverSupported()); }
    onlyAscSupported(): boolean { return invoke(() => this.raw().onlyAscSupported()); }
    theThenFamilyAppendsToTheTail(): boolean {
        return invoke(() => this.raw().theThenFamilyAppendsToTheTail());
    }
    thenDoesNotMergeTheSamePath(): boolean {
        return invoke(() => this.raw().thenDoesNotMergeTheSamePath());
    }
    theAddOperatorIsThen(): boolean { return invoke(() => this.raw().theAddOperatorIsThen()); }
    emptinessIsComplementary(): boolean {
        return invoke(() => this.raw().emptinessIsComplementary());
    }
    theSupportTestReadsTheDirectionOnly(): boolean {
        return invoke(() => this.raw().theSupportTestReadsTheDirectionOnly());
    }
    theSupportTestIgnoresTheNullsField(): boolean {
        return invoke(() => this.raw().theSupportTestIgnoresTheNullsField());
    }
    theNullsConstructorsDifferOnlyByTheNullsField(): boolean {
        return invoke(() => this.raw().theNullsConstructorsDifferOnlyByTheNullsField());
    }
    theManyConstructorsKeepTheInputOrder(): boolean {
        return invoke(() => this.raw().theManyConstructorsKeepTheInputOrder());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条字段映射的描述。 / The description of one field mapping. */
export interface PersistenceFieldSpec {
    path: string;
    /** 后端字段名，缺省走"同名映射"。 / The backend field name; absent means the same-field mapping. */
    backendField?: string | null;
}

/** 谓词 schema 探针请求。 / The predicate schema probe request. */
export interface PersistenceSchemaRequest {
    name?: string | null;
    fields?: PersistenceFieldSpec[];
    queries?: string[];
}

/**
 * **同一张谓词 schema 有两个互相矛盾的查表面**（续挖 `persistence/expression/predicate_schema.rs` 的
 * `PredicateSchema` / `FieldMapping` / `FieldPath`）：
 *
 * 1. **`withField` 按顺序追加**（`theFieldsAppendInOrder()`）。
 * 2. **`resolve()` 先到先得**（`theResolveIsFirstWins()`）。
 * 3. **`toFieldMap()` 后到覆盖**（`theFieldMapIsLastWins()`）—— 同路径写两条时两个面**给出相反答案**。
 * 4. **未登记路径一律 `null`**（`theUnknownPathResolvesToNothing()`），`resolver()` 与 `resolve()` 同款。
 * 5. **同名映射把整条路径文本当后端名**（`theSameFieldMappingRepeatsTheWholePath()`）：
 *    `order.customer.name` → 后端名就是 `order.customer.name`。
 * 6. **`field()` 不校验登记**（`theFieldBuilderNeverChecksRegistration()`）。
 * 7. **`FieldPath.parse` 与构造等价**（`theParseMatchesTheConstructor()`）。
 * 8. **`toFieldMap()` 按路径去重**（`theFieldMapIsDeduplicatedByPath()`）：三条记录、两张表项。
 *
 * **One predicate schema exposes two contradictory lookup faces.** **The fields append in order.** **`resolve()` is first
 * wins** while **`toFieldMap()` is last wins**, so a duplicate path makes the two faces answer oppositely. **An unknown path
 * resolves to nothing** and the resolver matches. **The same-field mapping repeats the whole path** as the backend name.
 * **`field()` never checks registration.** **`FieldPath.parse` matches the constructor.** And **`toFieldMap()` is
 * deduplicated by path.**
 */
export class PersistenceSchemaReport {
    private constructor(private state: PersistenceSchemaBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): PersistenceSchemaReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected persistence schema report text");
        }
        return invoke(() => new PersistenceSchemaReport(
            wasm().PersistenceSchemaReport.fromJson(json)));
    }
    private raw(): PersistenceSchemaBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "persistence schema report has been disposed");
        }
        return this.state;
    }
    name(): string { return invoke(() => this.raw().name()); }
    fieldCount(): number { return invoke(() => this.raw().fieldCount()); }
    mapCount(): number { return invoke(() => this.raw().mapCount()); }
    queryCount(): number { return invoke(() => this.raw().queryCount()); }
    queryPathAt(index: number): string { return invoke(() => this.raw().queryPathAt(index)); }
    queryResolvedAt(index: number): string | undefined {
        return invoke(() => this.raw().queryResolvedAt(index));
    }
    queryResolvedByMapAt(index: number): string | undefined {
        return invoke(() => this.raw().queryResolvedByMapAt(index));
    }
    theFieldsAppendInOrder(): boolean { return invoke(() => this.raw().theFieldsAppendInOrder()); }
    theResolveIsFirstWins(): boolean { return invoke(() => this.raw().theResolveIsFirstWins()); }
    theFieldMapIsLastWins(): boolean { return invoke(() => this.raw().theFieldMapIsLastWins()); }
    theUnknownPathResolvesToNothing(): boolean {
        return invoke(() => this.raw().theUnknownPathResolvesToNothing());
    }
    theSameFieldMappingRepeatsTheWholePath(): boolean {
        return invoke(() => this.raw().theSameFieldMappingRepeatsTheWholePath());
    }
    theFieldBuilderNeverChecksRegistration(): boolean {
        return invoke(() => this.raw().theFieldBuilderNeverChecksRegistration());
    }
    theParseMatchesTheConstructor(): boolean {
        return invoke(() => this.raw().theParseMatchesTheConstructor());
    }
    theFieldMapIsDeduplicatedByPath(): boolean {
        return invoke(() => this.raw().theFieldMapIsDeduplicatedByPath());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条等值谓词的描述。 / The description of one equality predicate. */
export interface PredicateScopeSpec {
    path: string;
    value: string;
}

/** 谓词作用域探针请求。 / The predicate scope probe request. */
export interface PredicateScopeRequest {
    predicates?: PredicateScopeSpec[];
    /** `AlwaysFalse` / `FailFast` / `ClientFilter`，缺省为 `AlwaysFalse`。 */
    policy?: string | null;
}

/**
 * **谓词收集器的空/单项语义，以及"不支持谓词"策略里那个两者皆假的选项**（续挖
 * `persistence/expression/boolean_expression_dsl.rs` 的 `BooleanExpressionScope` 与
 * `unsupported_predicate_policy.rs` 的 `UnsupportedPredicatePolicy`）：
 *
 * 1. **空作用域 `buildAnd()` 是恒真**（`theEmptyConjunctionIsTrue()`）。
 * 2. **空作用域 `buildOr()` 是恒假**（`theEmptyDisjunctionIsFalse()`）。
 * 3. **单项作用域直接返回该项**（`aSingleItemScopeReturnsTheItemItself()`），不包 `And`/`Or`、不退化成常量。
 * 4. **两项以上才真的合并**（`twoOrMoreItemsAreCombined()`）。
 * 5. **builder 返回表达式本身并把副本收进作用域**（`theBuildersReturnAndCollectTheSameExpression()`）；
 *    实测：显式标注类型的 scope 上 `scope.eq(..)` 不可调用，须走 `typed_eq::<T>(..)` + `push(..)`。
 * 6. **`Default` 就是 `new()`**（`theDefaultIsTheEmptyScope()`）。
 * 7. **`FailFast` 是唯一 fail-fast、`AlwaysFalse` 是唯一恒假**（`onlyOnePolicyAnswersEachWay()`）。
 * 8. **`ClientFilter` 两者皆假**，`IGNORE`/`ERROR` 只是别名（`theClientFilterAnswersFalseToBoth()`）。
 *
 * **The predicate collector's empty and single-item semantics, plus the policy option that answers false to both.** **An
 * empty `buildAnd()` is a constant true** and **an empty `buildOr()` a constant false**. **A single item comes back
 * unwrapped**, and **two or more items are combined**. **The builders return their expression and collect a copy**, and one
 * scope can only be built once because `build_*` consumes it. **`Default` is the empty scope.** **Only one policy answers
 * each way**, and **the client filter answers false to both** while the aliases stay aliases.
 */
export class PredicateScopeReport {
    private constructor(private state: PredicateScopeBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): PredicateScopeReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected predicate scope report text");
        }
        return invoke(() => new PredicateScopeReport(
            wasm().PredicateScopeReport.fromJson(json)));
    }
    private raw(): PredicateScopeBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "predicate scope report has been disposed");
        }
        return this.state;
    }
    collected(): number { return invoke(() => this.raw().collected()); }
    andShape(): string { return invoke(() => this.raw().andShape()); }
    orShape(): string { return invoke(() => this.raw().orShape()); }
    andOperands(): number { return invoke(() => this.raw().andOperands()); }
    orOperands(): number { return invoke(() => this.raw().orOperands()); }
    policy(): string { return invoke(() => this.raw().policy()); }
    failsFast(): boolean { return invoke(() => this.raw().failsFast()); }
    alwaysFalse(): boolean { return invoke(() => this.raw().alwaysFalse()); }
    theEmptyConjunctionIsTrue(): boolean {
        return invoke(() => this.raw().theEmptyConjunctionIsTrue());
    }
    theEmptyDisjunctionIsFalse(): boolean {
        return invoke(() => this.raw().theEmptyDisjunctionIsFalse());
    }
    aSingleItemScopeReturnsTheItemItself(): boolean {
        return invoke(() => this.raw().aSingleItemScopeReturnsTheItemItself());
    }
    twoOrMoreItemsAreCombined(): boolean {
        return invoke(() => this.raw().twoOrMoreItemsAreCombined());
    }
    theBuildersReturnAndCollectTheSameExpression(): boolean {
        return invoke(() => this.raw().theBuildersReturnAndCollectTheSameExpression());
    }
    theDefaultIsTheEmptyScope(): boolean {
        return invoke(() => this.raw().theDefaultIsTheEmptyScope());
    }
    onlyOnePolicyAnswersEachWay(): boolean {
        return invoke(() => this.raw().onlyOnePolicyAnswersEachWay());
    }
    theClientFilterAnswersFalseToBoth(): boolean {
        return invoke(() => this.raw().theClientFilterAnswersFalseToBoth());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** native 终态证明探针请求。 / The native terminal proof probe request. */
export interface NativeTerminalProofRequest {
    /** `Optimal` / `Infeasible` / `Unbounded` / `InfeasibleOrUnbounded`。 */
    nativeStatus: string;
    problemStatus?: string | null;
    hasIncumbent?: boolean | null;
    termination?: string | null;
    hasEvidence?: boolean | null;
}

/**
 * **native 终态证明只认"四条件同时成立"的那一种组合，其余一律什么都不写**（续挖 `solver/report` 的
 * `verify_native_terminal_proof`）：
 *
 * 1. **`Optimal` 臂**：`Feasible` + 有 incumbent + `Completed` → 最优性证明 + presence `Optimal`。
 * 2. **`Infeasible` 臂**：`Infeasible` + 无 incumbent + `Completed` → 不可行证明。
 * 3. **旧证据不会被丢弃**（`theOldEvidenceIsCarriedOver()`）：重写证明时把旧 `evidence` 搬过去。
 * 4. **`Unbounded` 臂**写出无界证明（`theUnboundedArmWritesAnUnboundednessProof()`）。
 * 5. **`InfeasibleOrUnbounded` 臂**写出自己的证明。
 * 6. **状态不匹配什么都不写**（`aMismatchedStatusWritesNothing()`）：走 `_ => {}`，不写证明也**不直接报错**，
 *    裁判权在结尾的 `report.validate()`。
 * 7. **终止原因不是 `Completed` 什么都不写**（`aNonCompletedTerminationWritesNothing()`）。
 * 8. **有 incumbent 时三个负向臂都不写**（`anIncumbentBlocksTheNegativeArms()`）。
 *
 * **The native terminal proof only recognises the one combination where four conditions hold at once and writes nothing
 * otherwise.** **The optimal arm writes an optimality proof** and flips the presence to `Optimal`. **The infeasible arm
 * writes an infeasibility proof**, and **the old evidence is carried over** rather than discarded. **The unbounded arm** and
 * **the infeasible-or-unbounded arm** write their own proofs. **A mismatched status writes nothing** — it neither writes a
 * proof nor errors directly, leaving the verdict to `report.validate()`. **A non-completed termination writes nothing.** And
 * **an incumbent blocks the three negative arms.**
 */
export class NativeTerminalProofReport {
    private constructor(private state: NativeTerminalProofBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): NativeTerminalProofReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected native terminal proof report text");
        }
        return invoke(() => new NativeTerminalProofReport(
            wasm().NativeTerminalProofReport.fromJson(json)));
    }
    private raw(): NativeTerminalProofBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "native terminal proof report has been disposed");
        }
        return this.state;
    }
    gateOk(): boolean { return invoke(() => this.raw().gateOk()); }
    gateError(): string { return invoke(() => this.raw().gateError()); }
    proofKind(): string { return invoke(() => this.raw().proofKind()); }
    proofStatus(): string { return invoke(() => this.raw().proofStatus()); }
    solutionPresence(): string { return invoke(() => this.raw().solutionPresence()); }
    evidenceCount(): number { return invoke(() => this.raw().evidenceCount()); }
    theOptimalArmWritesAnOptimalityProof(): boolean {
        return invoke(() => this.raw().theOptimalArmWritesAnOptimalityProof());
    }
    theInfeasibleArmWritesAnInfeasibilityProof(): boolean {
        return invoke(() => this.raw().theInfeasibleArmWritesAnInfeasibilityProof());
    }
    theOldEvidenceIsCarriedOver(): boolean {
        return invoke(() => this.raw().theOldEvidenceIsCarriedOver());
    }
    theUnboundedArmWritesAnUnboundednessProof(): boolean {
        return invoke(() => this.raw().theUnboundedArmWritesAnUnboundednessProof());
    }
    theInfeasibleOrUnboundedArmWritesItsProof(): boolean {
        return invoke(() => this.raw().theInfeasibleOrUnboundedArmWritesItsProof());
    }
    aMismatchedStatusWritesNothing(): boolean {
        return invoke(() => this.raw().aMismatchedStatusWritesNothing());
    }
    aNonCompletedTerminationWritesNothing(): boolean {
        return invoke(() => this.raw().aNonCompletedTerminationWritesNothing());
    }
    anIncumbentBlocksTheNegativeArms(): boolean {
        return invoke(() => this.raw().anIncumbentBlocksTheNegativeArms());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个结构去向的描述。 / The description of one structure's destination. */
export interface NativeOutcomeSpec {
    /** `Native` / `NoWriter` / `Rejected` / `WriterFailed`。 */
    kind: string;
    text?: string | null;
}

/** 原生 lowering 报告探针请求。 / The native lowering report probe request. */
export interface NativeLoweringProbeRequest {
    outcomes?: NativeOutcomeSpec[];
    /** 缺省等于各结果的 fallback 数。 / Defaults to the observed fallback count. */
    materializedFallbacks?: number | null;
    nativeWrites?: number | null;
}

/**
 * **原生 lowering 报告的三个判定各看各的字段，"全原生"与"有退化"既不互补也不自检**（续挖
 * `model/intermediate/native_writer.rs`）：
 *
 * 1. **空报告不是全原生**（`anEmptyReportIsNotFullyNative()`）——`is_fully_native()` 要求 `outcomes` 非空。
 * 2. **空报告也没有退化**（`anEmptyReportHasNoFallbacks()`）。
 * 3. **两个判定不互补**（`theTwoPredicatesAreNotComplementary()`）：空报告两者皆假。
 * 4. **"全原生"只读 `materialized_fallbacks` 计数**（`fullyNativeReadsOnlyTheCounter()`），不数 `outcomes`。
 * 5. **"有退化"也只读计数**（`hasFallbacksReadsOnlyTheCounter()`）。
 * 6. **计数与 `outcomes` 从不交叉核对**（`theCountsAreNeverCrossChecked()`）：`countsAgree()` 只是把矛盾**记下来**。
 * 7. **每个结果的 `isNative()`/`requiresFallback()` 严格互补**。
 * 8. **`FallbackReason` 的相等是结构相等**：`Rejected("x") !== WriterFailed("x")`。
 *
 * **The native lowering report's three predicates each read their own field, and "fully native" and "has fallbacks" are
 * neither complementary nor self-checking.** **An empty report is neither** — `is_fully_native()` demands non-empty
 * `outcomes`. **The two predicates are not complementary.** **"Fully native" reads only the counter** and **so does "has
 * fallbacks"**, because **the counts are never cross-checked** — `countsAgree()` only records the contradiction. **Each
 * outcome's two predicates are complementary**, and **`FallbackReason` equals structurally**, so the two text-carrying
 * variants with the same text stay distinct.
 */
export class NativeLoweringReport {
    private constructor(private state: NativeLoweringBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): NativeLoweringReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected native lowering report text");
        }
        return invoke(() => new NativeLoweringReport(
            wasm().NativeLoweringReport.fromJson(json)));
    }
    private raw(): NativeLoweringBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "native lowering report has been disposed");
        }
        return this.state;
    }
    fullyNative(): boolean { return invoke(() => this.raw().fullyNative()); }
    hasFallbacks(): boolean { return invoke(() => this.raw().hasFallbacks()); }
    outcomeCount(): number { return invoke(() => this.raw().outcomeCount()); }
    nativeOutcomes(): number { return invoke(() => this.raw().nativeOutcomes()); }
    fallbackOutcomes(): number { return invoke(() => this.raw().fallbackOutcomes()); }
    countsAgree(): boolean { return invoke(() => this.raw().countsAgree()); }
    anEmptyReportIsNotFullyNative(): boolean {
        return invoke(() => this.raw().anEmptyReportIsNotFullyNative());
    }
    anEmptyReportHasNoFallbacks(): boolean {
        return invoke(() => this.raw().anEmptyReportHasNoFallbacks());
    }
    theTwoPredicatesAreNotComplementary(): boolean {
        return invoke(() => this.raw().theTwoPredicatesAreNotComplementary());
    }
    fullyNativeReadsOnlyTheCounter(): boolean {
        return invoke(() => this.raw().fullyNativeReadsOnlyTheCounter());
    }
    hasFallbacksReadsOnlyTheCounter(): boolean {
        return invoke(() => this.raw().hasFallbacksReadsOnlyTheCounter());
    }
    theCountsAreNeverCrossChecked(): boolean {
        return invoke(() => this.raw().theCountsAreNeverCrossChecked());
    }
    theTwoOutcomePredicatesAreComplementary(): boolean {
        return invoke(() => this.raw().theTwoOutcomePredicatesAreComplementary());
    }
    theFallbackReasonEqualsStructurally(): boolean {
        return invoke(() => this.raw().theFallbackReasonEqualsStructurally());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 求解值转换探针请求。 / The solve value conversion probe request. */
export interface SolveValueProbeRequest {
    /** 十进制，或 `nan` / `inf` / `-inf`（JSON 载不了非有限，故用文本）。 */
    value: string;
    /** `Strict` / `AllowRounding`，缺省 `Strict`。 */
    policy?: string | null;
}

/**
 * **转换策略只对精确有理数有意义，对 `f64` 本身两种策略完全等价；而上界一律走 `floor` 并硬编码"允许舍入"**（续挖
 * `solver/value/solve_value.rs` 的 `SolveValue`）：
 *
 * 1. **`from_f64_with_policy` 只拒非有限**（`theConverterOnlyRefusesNonFinite()`）：`_policy` 被忽略。
 * 2. **`to_f64_with_policy` 同样只拒非有限**。
 * 3. **两种策略在 `f64` 上等价**（`theTwoPoliciesAgreeOnF64()`）。
 * 4. **默认策略是 `Strict`**。
 * 5. **上界取 `floor` 而不是截断**（`theUpperBoundFloors()`）：2.7 → 2、0.9 → 0。
 * 6. **`-0.0` 不算负数**，给 0。
 * 7. **负数上界报错**（"cannot be negative"）。
 * 8. **`>= 2^63` 报溢出**（"exceeds i64"）；非有限值先被读取拒掉。
 *
 * **The conversion policy only matters for exact rationals — for `f64` itself the two policies are equivalent — and the
 * upper bound floors with rounding hardcoded on.** **Both faces refuse only non-finite values** because the policy is
 * ignored. **The two policies agree on `f64`**, and **the default is strict**. **The bound floors** rather than truncating,
 * **a negative zero is not negative**, **a negative bound is refused**, and **an out-of-range bound overflows** while a
 * non-finite value never reaches the floor because the reader refuses it first.
 */
export class SolveValueReport {
    private constructor(private state: SolveValueBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): SolveValueReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected solve value report text");
        }
        return invoke(() => new SolveValueReport(wasm().SolveValueReport.fromJson(json)));
    }
    private raw(): SolveValueBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "solve value report has been disposed");
        }
        return this.state;
    }
    typeName(): string { return invoke(() => this.raw().typeName()); }
    policy(): string { return invoke(() => this.raw().policy()); }
    fromOk(): boolean { return invoke(() => this.raw().fromOk()); }
    fromError(): string { return invoke(() => this.raw().fromError()); }
    toOk(): boolean { return invoke(() => this.raw().toOk()); }
    toError(): string { return invoke(() => this.raw().toError()); }
    policiesAgree(): boolean { return invoke(() => this.raw().policiesAgree()); }
    upperBoundOk(): boolean { return invoke(() => this.raw().upperBoundOk()); }
    /** 上界的值；未产出时为 `null`。 / The bound, or `null` when none was produced. */
    upperBound(): number | null {
        // wasm-bindgen 把 `Option<i64>` 映射成 `bigint`，这里收窄回 `number`。 
        // wasm-bindgen maps `Option<i64>` to `bigint`, narrowed back to `number` here.
        const bound = invoke(() => this.raw().upperBound());
        if (bound === undefined || bound === null) {
            return null;
        }
        return typeof bound === "bigint" ? Number(bound) : bound;
    }
    upperBoundError(): string { return invoke(() => this.raw().upperBoundError()); }
    theConverterOnlyRefusesNonFinite(): boolean {
        return invoke(() => this.raw().theConverterOnlyRefusesNonFinite());
    }
    theReaderOnlyRefusesNonFinite(): boolean {
        return invoke(() => this.raw().theReaderOnlyRefusesNonFinite());
    }
    theTwoPoliciesAgreeOnF64(): boolean {
        return invoke(() => this.raw().theTwoPoliciesAgreeOnF64());
    }
    theDefaultPolicyIsStrict(): boolean {
        return invoke(() => this.raw().theDefaultPolicyIsStrict());
    }
    theUpperBoundFloors(): boolean { return invoke(() => this.raw().theUpperBoundFloors()); }
    aNegativeZeroIsNotNegative(): boolean {
        return invoke(() => this.raw().aNegativeZeroIsNotNegative());
    }
    aNegativeUpperBoundIsRefused(): boolean {
        return invoke(() => this.raw().aNegativeUpperBoundIsRefused());
    }
    anOutOfRangeUpperBoundOverflows(): boolean {
        return invoke(() => this.raw().anOutOfRangeUpperBoundOverflows());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一次选择请求。 / One selection step. */
export interface SelectionStepSpec {
    state?: number;
    stagnation?: number;
    available?: string[];
}

/** 一次反馈归因。 / One attribution. */
export interface SelectionObservationSpec {
    action: string;
    reward?: number;
    before?: number;
    after?: number;
    available?: string[] | null;
    nextAvailable?: string[] | null;
    terminal?: boolean;
}

/** 选择策略探针请求。 / The selection policy probe request. */
export interface SelectionProbeRequest {
    /** `fixed` / `round-robin` / `stagnation` / `random` / `epsilon-greedy` / `ucb1` / `q-learning`。 */
    policy: string;
    actions: string[];
    learning?: boolean | null;
    epsilon?: number | null;
    alpha?: number | null;
    gamma?: number | null;
    states?: number | null;
    stagnationLimit?: number | null;
    seed?: number | null;
    selects?: SelectionStepSpec[];
    observations?: SelectionObservationSpec[];
}

/**
 * **七种选择 kind 只分五个臂，`fixed` 与 `round-robin` 是同一条臂，累计只发生在三种 kind 上**（续挖
 * `solver/hyper_heuristic/selection.rs` 的 `TabularSelectionPolicy`）：
 *
 * 1. **`fixed` 与 `round-robin` 完全同义**（`theTwoRuleKindsShareOneArm()`）。
 * 2. **规则臂的游标推进成"选中索引 + 1"**（`theRuleCursorAdvancesPastThePick()`）。
 * 3. **`stagnation` 只在非零且为 limit 整数倍时推进**（`stagnationAdvancesOnlyOnANonzeroMultiple()`）。
 * 4. **`ucb1` 学习态先选未观察动作**（`ucb1PrefersUnobservedActions()`）。
 * 5. **`learning === false` 时 `observe` 什么都不学**（`aNonLearningPolicyLearnsNothing()`）。
 * 6. **只有 `q-learning`/`epsilon-greedy`/`ucb1` 累计 `counts`/`sums`**，其余四种只动游标。
 * 7. **`snapshot().table` 只有 `q-learning` 非空**（`onlyQLearningExportsATable()`）。
 * 8. **六类非法定义一律被拒**（未知 kind、重复动作、空动作表、参数出界、状态数为零、容量超限）。
 *
 * **The seven selection kinds split into only five arms, `fixed` and `round-robin` share one, and accumulation happens on
 * three kinds only.** **The two rule kinds are synonymous**, and **the rule cursor advances past the pick**. **Stagnation
 * advances only on a non-zero multiple** of its limit. **`ucb1` prefers unobserved actions**, and **a non-learning policy
 * learns nothing**. **Only three kinds accumulate**, **only `q-learning` exports a table**, and **six illegal definitions are
 * refused**.
 */
export class SelectionReport {
    private constructor(private state: SelectionBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): SelectionReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected selection report text");
        }
        return invoke(() => new SelectionReport(wasm().SelectionReport.fromJson(json)));
    }
    private raw(): SelectionBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "selection report has been disposed");
        }
        return this.state;
    }
    selected(): string[] { return invoke(() => this.raw().selected()); }
    /** 学习修订版本；wasm 走 `f64`，这里取整。 / The revision, integralised. */
    revision(): number { return Math.trunc(invoke(() => this.raw().revision())); }
    // wasm-bindgen 把 `Vec<f64>` 映射成 `Float64Array`，这里摊平成普通数组。 
    // wasm-bindgen maps `Vec<f64>` to `Float64Array`, spread into a plain array here.
    counts(): number[] { return Array.from(invoke(() => this.raw().counts()), Math.trunc); }
    sums(): number[] { return Array.from(invoke(() => this.raw().sums())); }
    tableRows(): number { return invoke(() => this.raw().tableRows()); }
    snapshotKind(): string { return invoke(() => this.raw().snapshotKind()); }
    theTwoRuleKindsShareOneArm(): boolean {
        return invoke(() => this.raw().theTwoRuleKindsShareOneArm());
    }
    theRuleCursorAdvancesPastThePick(): boolean {
        return invoke(() => this.raw().theRuleCursorAdvancesPastThePick());
    }
    stagnationAdvancesOnlyOnANonzeroMultiple(): boolean {
        return invoke(() => this.raw().stagnationAdvancesOnlyOnANonzeroMultiple());
    }
    ucb1PrefersUnobservedActions(): boolean {
        return invoke(() => this.raw().ucb1PrefersUnobservedActions());
    }
    aNonLearningPolicyLearnsNothing(): boolean {
        return invoke(() => this.raw().aNonLearningPolicyLearnsNothing());
    }
    onlyThreeKindsAccumulate(): boolean {
        return invoke(() => this.raw().onlyThreeKindsAccumulate());
    }
    onlyQLearningExportsATable(): boolean {
        return invoke(() => this.raw().onlyQLearningExportsATable());
    }
    sixIllegalDefinitionsAreRefused(): boolean {
        return invoke(() => this.raw().sixIllegalDefinitionsAreRefused());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一次派发。 / One dispatch. */
export interface NonStationarySelectSpec {
    decision?: number;
    available?: string[] | null;
}

/** 一次反馈。 / One feedback. */
export interface NonStationaryObservationSpec {
    action: string;
    decision?: number;
    reward?: number;
    terminal?: boolean;
}

/** 非平稳选择器探针请求。 / The non-stationary selector probe request. */
export interface NonStationaryProbeRequest {
    /** `frr-mab` / `choice-function` / `adaptive-pursuit`。 */
    policy: string;
    actions: string[];
    learning?: boolean | null;
    window?: number | null;
    exploration?: number | null;
    decay?: number | null;
    rate?: number | null;
    minimumProbability?: number | null;
    recencyWeight?: number | null;
    seed?: number | null;
    selects?: NonStationarySelectSpec[];
    observations?: NonStationaryObservationSpec[];
    predecessorOf?: number[];
    discards?: number[];
}

/**
 * **非平稳选择器把"派发时前驱"冻结在待反馈表里、把奖励归一成尺度无关、让三种 kind 各管一套信用账**（续挖
 * `solver/hyper_heuristic/selection/non_stationary.rs` 的 `NonStationarySelector`）：
 *
 * 1. **`frr-mab` 引导按动作规范顺序**（不是掩码顺序）：掩码 `[c, b]` 先给 `b`。
 * 2. **窗口滑过 `window` 丢最旧**。
 * 3. **归一是尺度无关的**：整体放大 100 倍选同一个动作（负奖励照进窗口、权重按 0 计）。
 * 4. **前驱在派发时冻结**（`thePredecessorIsFrozenAtDispatch()`）：乱序完成仍用派发时的前驱。
 * 5. **同一决策在学习态下重复派发直接报错**，`discard` 才放开。
 * 6. **`adaptive-pursuit` 的 `rate === 1` 直接落到目标**（赢家 `1 - floor*(n-1)`、其余 `floor`）。
 * 7. **`terminal` 完成清空前驱**（`aTerminalCompletionClearsThePredecessor()`）。
 * 8. **`learning === false` 时只校验不写**：非法反馈照样报错，但状态一字不动。
 *
 * **The non-stationary selector freezes the dispatch-time predecessor in its pending table, normalises rewards to be
 * scale-invariant, and keeps one credit ledger per kind.** **`frr-mab`'s bootstrap follows the canonical action order** rather
 * than the mask order, and **the window forgets the oldest**. **The normalisation is scale-invariant** — scaling every reward by
 * a hundred picks the same action, with negatives entering the window at zero weight. **The predecessor is frozen at
 * dispatch**, **a pending decision cannot be dispatched twice** until discarded, and **a full-rate pursuit lands on the
 * target**. **A terminal completion clears the predecessor**, and **a non-learning selector validates without writing**.
 */
export class NonStationaryReport {
    private constructor(private state: NonStationaryBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): NonStationaryReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected non-stationary report text");
        }
        return invoke(() => new NonStationaryReport(wasm().NonStationaryReport.fromJson(json)));
    }
    private raw(): NonStationaryBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "non-stationary report has been disposed");
        }
        return this.state;
    }
    selected(): string[] { return invoke(() => this.raw().selected()); }
    revision(): number { return invoke(() => this.raw().revision()); }
    windowLen(): number { return invoke(() => this.raw().windowLen()); }
    clock(): number { return invoke(() => this.raw().clock()); }
    pending(): number { return invoke(() => this.raw().pending()); }
    /** wasm-bindgen 把 `Vec<f64>` 映射成 `Float64Array`，这里摊平。 / Spread into a plain array. */
    probabilities(): number[] { return Array.from(invoke(() => this.raw().probabilities())); }
    /** 前驱列表；空串表示"没有前驱"。 / The predecessors; an empty string means none. */
    predecessors(): string[] { return invoke(() => this.raw().predecessors()); }
    theBootstrapFollowsTheCanonicalOrder(): boolean {
        return invoke(() => this.raw().theBootstrapFollowsTheCanonicalOrder());
    }
    theWindowForgetsTheOldest(): boolean {
        return invoke(() => this.raw().theWindowForgetsTheOldest());
    }
    theScaleMakesRewardsScaleInvariant(): boolean {
        return invoke(() => this.raw().theScaleMakesRewardsScaleInvariant());
    }
    thePredecessorIsFrozenAtDispatch(): boolean {
        return invoke(() => this.raw().thePredecessorIsFrozenAtDispatch());
    }
    aPendingDecisionCannotBeDispatchedTwice(): boolean {
        return invoke(() => this.raw().aPendingDecisionCannotBeDispatchedTwice());
    }
    aFullRatePursuitLandsOnTheFloor(): boolean {
        return invoke(() => this.raw().aFullRatePursuitLandsOnTheFloor());
    }
    aTerminalCompletionClearsThePredecessor(): boolean {
        return invoke(() => this.raw().aTerminalCompletionClearsThePredecessor());
    }
    aNonLearningSelectorValidatesWithoutWriting(): boolean {
        return invoke(() => this.raw().aNonLearningSelectorValidatesWithoutWriting());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一个训练实例的描述。 / The description of one training instance. */
export interface TrainingCaseSpec {
    id: string;
    problem: string;
    version?: number | null;
    parameters?: TrainingParameterSpec[];
}

/** 一个显式参数。 / One explicit parameter. */
export interface TrainingParameterSpec {
    key: string;
    value: string;
}

/** 训练切分探针请求。 / The training split probe request. */
export interface TrainingSplitProbeRequest {
    training?: TrainingCaseSpec[];
    validation?: TrainingCaseSpec[];
    test?: TrainingCaseSpec[];
}

/**
 * **训练切分有三条互不重叠的校验规则，而"同一个问题"是按 `ComponentSpec` 的结构相等判定的**（续挖
 * `solver/hyper_heuristic/learning.rs` 的 `TrainingSplit::validate`）：
 *
 * 1. **空 ID 被拒**（`anEmptyIdIsRefused()`）。
 * 2. **同一集合内重复 ID 被拒**。
 * 3. **跨集合重复 ID 被拒**（`aRepeatedIdAcrossSplitsIsRefused()`）。
 * 4. **训练集为空被拒，验证/测试为空被接受**（`anEmptyTrainingSplitIsRefused()`）。
 * 5. **同一问题跨集合被拒**（`aProblemLeakingAcrossSplitsIsRefused()`）。
 * 6. **同一集合内同一问题重复被接受**（`aRepeatedProblemInsideOneSplitIsAccepted()`）。
 * 7. **问题相等是结构相等**（`theProblemEqualityIsStructural()`）：只差 `version` 或只差一个参数就算不同问题，
 *    因此**不构成泄漏**。
 * 8. **ID 判重先于泄漏判定**（`theIdCheckFiresBeforeTheLeakCheck()`）：同一 id 又跨集合时，先报的是 ID 那条。
 *
 * **The training split validates three non-overlapping things, and "the same problem" is decided by `ComponentSpec`'s
 * structural equality.** **An empty id is refused**, **a repeated id inside one split is refused**, and **a repeated id across
 * splits is refused**. **An empty training split is refused** while an empty validation or test split is accepted. **A leaking
 * problem is refused** and **a repeated problem inside one split is accepted**. **The problem equality is structural**, so a
 * differing version or a single differing parameter is a different problem and not a leak, and **the id check fires before the
 * leak check**.
 */
export class TrainingSplitReport {
    private constructor(private state: TrainingSplitBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): TrainingSplitReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected training split report text");
        }
        return invoke(() => new TrainingSplitReport(
            wasm().TrainingSplitReport.fromJson(json)));
    }
    private raw(): TrainingSplitBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "training split report has been disposed");
        }
        return this.state;
    }
    valid(): boolean { return invoke(() => this.raw().valid()); }
    error(): string { return invoke(() => this.raw().error()); }
    instances(): number { return invoke(() => this.raw().instances()); }
    anEmptyIdIsRefused(): boolean { return invoke(() => this.raw().anEmptyIdIsRefused()); }
    aRepeatedIdInsideOneSplitIsRefused(): boolean {
        return invoke(() => this.raw().aRepeatedIdInsideOneSplitIsRefused());
    }
    aRepeatedIdAcrossSplitsIsRefused(): boolean {
        return invoke(() => this.raw().aRepeatedIdAcrossSplitsIsRefused());
    }
    anEmptyTrainingSplitIsRefused(): boolean {
        return invoke(() => this.raw().anEmptyTrainingSplitIsRefused());
    }
    aProblemLeakingAcrossSplitsIsRefused(): boolean {
        return invoke(() => this.raw().aProblemLeakingAcrossSplitsIsRefused());
    }
    aRepeatedProblemInsideOneSplitIsAccepted(): boolean {
        return invoke(() => this.raw().aRepeatedProblemInsideOneSplitIsAccepted());
    }
    theProblemEqualityIsStructural(): boolean {
        return invoke(() => this.raw().theProblemEqualityIsStructural());
    }
    theIdCheckFiresBeforeTheLeakCheck(): boolean {
        return invoke(() => this.raw().theIdCheckFiresBeforeTheLeakCheck());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 接受准则的定义。 / The acceptance policy definition. */
export interface AcceptanceDefinitionSpec {
    /** `late` / `record-to-record` / `auto`。 */
    policy: string;
    length?: number | null;
    ratio?: number | null;
    horizon?: number | null;
}

/** 对保存态的一处改写。 / One override on the saved state. */
export interface AcceptanceOverrideSpec {
    key: string;
    null?: boolean | null;
    number?: number | null;
    numbers?: number[] | null;
    text?: string | null;
}

/** 接受准则探针请求。 / The acceptance policy probe request. */
export interface AcceptanceRecoveryRequest {
    definition: AcceptanceDefinitionSpec;
    overrides?: AcceptanceOverrideSpec[];
}

/**
 * **三种接受准则各有"定义锁"与"历史锁"两把锁，构造参数的合法区间是硬写的**（续挖 `memory/adaptive.rs`）：
 *
 * 1. **`late` 的 `length` 只在 `(0, i32::MAX]` 内**（`theLateLengthRangeIsHardcoded()`）。
 * 2. **`late` 载入时拒改过的定义**（`theLateDefinitionIsLocked()`）。
 * 3. **`late` 拒越界游标、非空历史长度不符、空历史却游标非零**（`theLateHistoryStaysConsistent()`）。
 * 4. **`record-to-record` 的 ratio 只在 `[0,1]` 内且必须有限**（`theRecordRatioRangeIsHardcoded()`）。
 * 5. **`record-to-record` 的 `|best| <= scale` 且 `clock === 0` 时 `best` 必须为空**。
 * 6. **`auto` 的 `capacity = clamp(sqrt(horizon), 8, 256)`、`span = max(capacity/2, 2)` 都是推导的**。
 * 7. **`auto` 拒 `span` 出 `[2, capacity]`、`improvements > decisions % capacity`**。
 * 8. **`auto` 的历史长度被 `min(decisions, capacity)` 定死**。
 *
 * 报告的 `savedKeys()` 是**框架自己 `save()` 出来的键名**，不是手写的形状。
 *
 * **The three acceptance policies each keep a definition lock and a history lock, and the constructors' legal ranges are
 * hardcoded.** **The late length range is hardcoded**, **the late definition is locked**, and **the late history stays
 * consistent**. **The record ratio range is hardcoded**, and **the record best is bounded by its own scale** while a zero clock
 * keeps `best` empty. **The auto span is derived**, **the auto span and improvements are bounded**, and **the auto history
 * matches its decisions**. The reported keys are the framework's own `save()` output, never a hand-written shape.
 */
export class AcceptanceRecoveryReport {
    private constructor(private state: AcceptanceRecoveryBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): AcceptanceRecoveryReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected acceptance report text");
        }
        return invoke(() => new AcceptanceRecoveryReport(
            wasm().AcceptanceRecoveryReport.fromJson(json)));
    }
    private raw(): AcceptanceRecoveryBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "acceptance report has been disposed");
        }
        return this.state;
    }
    policy(): string { return invoke(() => this.raw().policy()); }
    savedKeys(): string[] { return invoke(() => this.raw().savedKeys()); }
    baselineAccepted(): boolean { return invoke(() => this.raw().baselineAccepted()); }
    historySpan(): number { return invoke(() => this.raw().historySpan()); }
    /** 每处改写是否被接受（1/0 摊平成布尔）。 / Whether each override was accepted. */
    overrideAccepted(): boolean[] {
        return Array.from(invoke(() => this.raw().overrideAccepted()), flag => flag === 1);
    }
    overrideKeys(): string[] { return invoke(() => this.raw().overrideKeys()); }
    overrideErrors(): string[] { return invoke(() => this.raw().overrideErrors()); }
    theLateLengthRangeIsHardcoded(): boolean {
        return invoke(() => this.raw().theLateLengthRangeIsHardcoded());
    }
    theLateDefinitionIsLocked(): boolean {
        return invoke(() => this.raw().theLateDefinitionIsLocked());
    }
    theLateHistoryStaysConsistent(): boolean {
        return invoke(() => this.raw().theLateHistoryStaysConsistent());
    }
    theRecordRatioRangeIsHardcoded(): boolean {
        return invoke(() => this.raw().theRecordRatioRangeIsHardcoded());
    }
    theRecordBestIsBoundedByItsScale(): boolean {
        return invoke(() => this.raw().theRecordBestIsBoundedByItsScale());
    }
    theAutoSpanIsDerived(): boolean { return invoke(() => this.raw().theAutoSpanIsDerived()); }
    theAutoSpanAndImprovementsAreBounded(): boolean {
        return invoke(() => this.raw().theAutoSpanAndImprovementsAreBounded());
    }
    theAutoHistoryMatchesItsDecisions(): boolean {
        return invoke(() => this.raw().theAutoHistoryMatchesItsDecisions());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条坐标。 / One coordinate point. */
export type HypervolumePoint = number[];

/** 一次测量的输入。 / One measurement's input. */
export interface HypervolumeMeasurementSpec {
    reference?: HypervolumePoint[];
    candidates?: HypervolumePoint[];
}

/** 超体积探针请求。 / The hypervolume probe request. */
export interface HypervolumeProbeRequest {
    /** `Exact` / `Sampled`，缺省 `Exact`。 */
    mode?: string | null;
    /** 固定劣参考点；缺省则走自动校准。 */
    reference?: number[];
    maxWork?: number | null;
    samples?: number | null;
    seed?: number | null;
    calibrationObservations?: number | null;
    measurements?: HypervolumeMeasurementSpec[];
}

/**
 * **超体积增量有三段式生命周期，而且"精确"与"采样"各自给出不同的证据**（续挖 `reward.rs` 的
 * `HypervolumeDeltaReward`），坐标一律按**最小化**读（候选必须比档案更小才有增量）：
 *
 * 1. **校准不足时 `delta === 0` 且 `calibrated === false`**。
 * 2. **凑满校准的那一次冻结自动参考点**，`calibrated === true`，`delta` 仍为 0。
 * 3. **`exact` 增量非负且带 `work` 计数**：档案 5×5、候选 0×0、参考点 10×10 → 75。
 * 4. **`sampled` 给 `exact === false` 与标准误/99% Hoeffding 界**（部分覆盖时才非零）。
 * 5. **空候选（最小化下更差）给 `delta === 0`**。
 * 6. **维度不一致与非有限坐标被拒**（作为**行内错误**，不是请求失败）。
 * 7. **`maxWork = 0` / `samples = 0` / `calibrationObservations = 0` 构造即拒**。
 * 8. **失败不覆盖上一次成功的 `lastDelta`**。
 *
 * **The hypervolume increment has a three-phase lifecycle, and "exact" and "sampled" each bring different evidence.** All
 * coordinates read as **minimisation**, so a candidate must be smaller than the archive to gain anything. **An incomplete
 * calibration reports zero and unfrozen**, and **the call that fills it freezes an automatic reference** while still reporting
 * zero. **The exact increment is non-negative and counted**, while **the sampled one carries two uncertainty figures that only
 * turn positive under partial coverage**. **An empty increment is zero**, **bad coordinates are refused as a row error**, **the
 * geometry budget is refused at construction**, and **a failure keeps the last measurement**.
 */
export class HypervolumeReport {
    private constructor(private state: HypervolumeBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): HypervolumeReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected hypervolume report text");
        }
        return invoke(() => new HypervolumeReport(wasm().HypervolumeReport.fromJson(json)));
    }
    private raw(): HypervolumeBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "hypervolume report has been disposed");
        }
        return this.state;
    }
    rowOk(): boolean[] {
        return Array.from(invoke(() => this.raw().rowOk()), flag => flag === 1);
    }
    rowErrors(): string[] { return invoke(() => this.raw().rowErrors()); }
    /** wasm-bindgen 把 `Vec<f64>` 映射成 `Float64Array`，这里摊平。 / Spread into a plain array. */
    rowDeltas(): number[] { return Array.from(invoke(() => this.raw().rowDeltas())); }
    rowExact(): boolean[] {
        return Array.from(invoke(() => this.raw().rowExact()), flag => flag === 1);
    }
    rowStandardErrors(): number[] {
        return Array.from(invoke(() => this.raw().rowStandardErrors()));
    }
    rowWork(): number[] {
        return Array.from(invoke(() => this.raw().rowWork()), Math.trunc);
    }
    rowCalibrated(): boolean[] {
        return Array.from(invoke(() => this.raw().rowCalibrated()), flag => flag === 1);
    }
    lastDelta(): number { return invoke(() => this.raw().lastDelta()); }
    theCalibrationPhaseReportsZeroUncertain(): boolean {
        return invoke(() => this.raw().theCalibrationPhaseReportsZeroUncertain());
    }
    theCalibrationFreezesTheReference(): boolean {
        return invoke(() => this.raw().theCalibrationFreezesTheReference());
    }
    theExactIncrementIsNonnegativeAndCounted(): boolean {
        return invoke(() => this.raw().theExactIncrementIsNonnegativeAndCounted());
    }
    theSampledIncrementCarriesUncertainty(): boolean {
        return invoke(() => this.raw().theSampledIncrementCarriesUncertainty());
    }
    anEmptyIncrementIsZero(): boolean {
        return invoke(() => this.raw().anEmptyIncrementIsZero());
    }
    badCoordinatesAreRefused(): boolean {
        return invoke(() => this.raw().badCoordinatesAreRefused());
    }
    theGeometryBudgetIsHardcoded(): boolean {
        return invoke(() => this.raw().theGeometryBudgetIsHardcoded());
    }
    aFailureKeepsTheLastMeasurement(): boolean {
        return invoke(() => this.raw().aFailureKeepsTheLastMeasurement());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一次注册尝试。 / One registration attempt. */
export interface OperatorRegistrationSpec {
    /** `update` / `mutation` / `neighborhood`。 */
    face: string;
    id: string;
    /** `Continuous` / `Permutation` / `Custom`。 */
    encodings?: string[];
    stateless?: boolean | null;
}

/** 算子能力探针请求。 / The operator capability probe request. */
export interface OperatorCapabilityRequest {
    registrations?: OperatorRegistrationSpec[];
}

/**
 * **算子能力声明的三道门只有两条真的在查，而且"重复编码"是位置判重而不是排序去重**（续挖
 * `operator_registry.rs` 的 `OperatorCapabilities` 与 `register_*_with_capabilities`）：
 *
 * 1. **空 `encodings` 被拒**（"operator capabilities require unique nonempty encodings"）。
 * 2. **非相邻重复也被拒**：判重是"与前缀任一个相同"，`["Custom","Permutation","Custom"]` 也拒。
 * 3. **合法组合真的注册上**。
 * 4. **`stateless` 完全不参与校验**（true/false 都过；真正的无状态声明是实例自己的 `stateless()`）。
 * 5. **空 id 被拒**（"empty or duplicate operator factory ID"）。
 * 6. **重复 id 被拒**。
 * 7. **能力校验先于 id 校验**：同一个 id 又带空编码时，报的是**能力那条**，不是 id 那条。
 * 8. **`update`/`mutation`/`neighborhood` 三个面各管各的能力表**：同一个 id 可以在三个面各注册一次。
 *
 * 注册表没有公开读取口，所以 `acceptedOnFace` / `totalAccepted` 是按**框架自己的 Ok/Err 判定**累计出来的。
 *
 * **Only two of the operator capability declaration's three parts are actually validated, and "duplicate encoding" is a
 * positional check rather than a sorted one.** **An empty encoding list is refused**, **a non-adjacent repeat fails as
 * well**, and **a legal declaration registers**. **The stateless flag takes no part in validation**, **an empty operator id
 * is refused**, and **a duplicate id is refused**. **The capability check precedes the id check**, and **each registration
 * face keeps its own capability table**. The registry exposes no public accessor, so the tallies accumulate the framework's
 * own verdicts.
 */
export class OperatorCapabilityReport {
    private constructor(private state: OperatorCapabilityBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): OperatorCapabilityReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected operator capability report text");
        }
        return invoke(() => new OperatorCapabilityReport(
            wasm().OperatorCapabilityReport.fromJson(json)));
    }
    private raw(): OperatorCapabilityBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "operator capability report has been disposed");
        }
        return this.state;
    }
    rowAccepted(): boolean[] {
        return Array.from(invoke(() => this.raw().rowAccepted()), flag => flag === 1);
    }
    rowErrors(): string[] { return invoke(() => this.raw().rowErrors()); }
    rowFaces(): string[] { return invoke(() => this.raw().rowFaces()); }
    rowIds(): string[] { return invoke(() => this.raw().rowIds()); }
    rowAcceptedOnFace(): number[] {
        return Array.from(invoke(() => this.raw().rowAcceptedOnFace()), Math.trunc);
    }
    rowTotalAccepted(): number[] {
        return Array.from(invoke(() => this.raw().rowTotalAccepted()), Math.trunc);
    }
    anEmptyEncodingListIsRefused(): boolean {
        return invoke(() => this.raw().anEmptyEncodingListIsRefused());
    }
    aNonAdjacentRepeatIsRefused(): boolean {
        return invoke(() => this.raw().aNonAdjacentRepeatIsRefused());
    }
    aLegalDeclarationRegisters(): boolean {
        return invoke(() => this.raw().aLegalDeclarationRegisters());
    }
    theStatelessFlagIsNotValidated(): boolean {
        return invoke(() => this.raw().theStatelessFlagIsNotValidated());
    }
    anEmptyOperatorIdIsRefused(): boolean {
        return invoke(() => this.raw().anEmptyOperatorIdIsRefused());
    }
    aDuplicateOperatorIdIsRefused(): boolean {
        return invoke(() => this.raw().aDuplicateOperatorIdIsRefused());
    }
    theCapabilityCheckPrecedesTheIdCheck(): boolean {
        return invoke(() => this.raw().theCapabilityCheckPrecedesTheIdCheck());
    }
    eachFaceKeepsItsOwnCapabilities(): boolean {
        return invoke(() => this.raw().eachFaceKeepsItsOwnCapabilities());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

/** 一条事件的可选读数。 / One event's optional reading. */
export interface ScheduleEventSpec {
    /** `begin` / `dispatch` / `complete` / `drain` / `yield` / `end`。 */
    kind: string;
    decision?: number | null;
    action?: string | null;
    evaluations?: number | null;
    steps?: number | null;
    random?: number | null;
    available?: string[] | null;
    stopped?: boolean | null;
    failed?: boolean | null;
}

/** 一份待校验的日志。 / One log to validate. */
export interface ScheduleLogSpec {
    version?: number | null;
    configuration?: string | null;
    problem?: string | null;
    /** 显式校验和；缺省则按框架的规范形式重算。 */
    checksum?: string | null;
    events?: ScheduleEventSpec[];
}

/** 调度日志探针请求。 / The schedule log probe request. */
export interface ScheduleLogRequest {
    logs?: ScheduleLogSpec[];
}

/**
 * **调度日志的校验和是先决条件，它之后才是九条顺序规则组成的状态机**（续挖 `schedule.rs` 的
 * `ScheduleLog`）。框架的 `digest()` 是私有的、`persistence::fingerprint` 是 `pub(crate)`，所以本报告里的
 * `rowChecksums()` 是**探针按同一规范形式**（键按 UTF-16 排序、逗号后一个空格）重算的规范 JSON SHA-256；
 * 裁判仍是框架自己的 `validate()`。
 *
 * 1. **身份门**：`version !== 1`、空 `configuration`、空 `problem`、坏 `checksum` 四者都被同一句话拦下。
 * 2. **`begin` 不可重复**，未 `begin` 的 `dispatch` 也拒。
 * 3. **`dispatch` 四个前置**：必须 `advancing`、`decision` 顺序、预算为正、动作在 `available` 里、同动作不在册。
 * 4. **`complete` 必须对上在册的 `(decision, 预留评估, 预留步数)`，且只准 `<=` 预留**（超出即拒）。
 * 5. **`drain` 要 `active` 非空、`yield` 要 `advancing`**。
 * 6. **`end` 要静止（先 `yield`）且两个总数与逐事件累计一致**。
 * 7. **`end` 之后不许再有事件**；未 `end` 的完整日志被拒（"truncated or non-quiescent schedule"）。
 * 8. **事件默认值不上线材**（`decision = 0`、空动作、零预算、`random = 0`、空 `available`、两个 false 全消失）。
 *
 * **The schedule log's checksum is a precondition, and behind it sits a state machine of nine ordering rules.** The framework's
 * `digest()` is private and `persistence::fingerprint` is `pub(crate)`, so the checksums here are recomputed by the probe in the
 * same canonical form (keys sorted by UTF-16, one space after each comma); the judge is still the framework's own `validate()`.
 * **The identity gate comes first**, **the begin is not repeatable**, and **the dispatch preconditions are strict**.
 * **The completion only shrinks its allowance**, **the drain and yield need state**, and **the end totals must reconcile**.
 * **The log must be sealed**, and **the event defaults stay off the wire**.
 */
export class ScheduleLogReport {
    private constructor(private state: ScheduleLogBinding | undefined) {}
    /** 解析并校验结果文本 / Parse and validate result text. */
    static fromJson(json: string): ScheduleLogReport {
        if (typeof json !== "string") {
            throw new OspfError("InvalidInput", "expected schedule log report text");
        }
        return invoke(() => new ScheduleLogReport(wasm().ScheduleLogReport.fromJson(json)));
    }
    private raw(): ScheduleLogBinding {
        if (!this.state) {
            throw new OspfError("Disposed", "schedule log report has been disposed");
        }
        return this.state;
    }
    rowValid(): boolean[] {
        return Array.from(invoke(() => this.raw().rowValid()), flag => flag === 1);
    }
    rowErrors(): string[] { return invoke(() => this.raw().rowErrors()); }
    rowChecksums(): string[] { return invoke(() => this.raw().rowChecksums()); }
    rowDispatched(): number[] {
        return Array.from(invoke(() => this.raw().rowDispatched()), Math.trunc);
    }
    rowEvents(): number[] { return Array.from(invoke(() => this.raw().rowEvents()), Math.trunc); }
    theIdentityGateComesFirst(): boolean {
        return invoke(() => this.raw().theIdentityGateComesFirst());
    }
    theBeginIsNotRepeatable(): boolean {
        return invoke(() => this.raw().theBeginIsNotRepeatable());
    }
    theDispatchPreconditionsAreStrict(): boolean {
        return invoke(() => this.raw().theDispatchPreconditionsAreStrict());
    }
    theCompletionOnlyShrinksItsAllownce(): boolean {
        return invoke(() => this.raw().theCompletionOnlyShrinksItsAllownce());
    }
    theDrainAndYieldNeedState(): boolean {
        return invoke(() => this.raw().theDrainAndYieldNeedState());
    }
    theEndTotalsMustReconcile(): boolean {
        return invoke(() => this.raw().theEndTotalsMustReconcile());
    }
    theLogMustBeSealed(): boolean { return invoke(() => this.raw().theLogMustBeSealed()); }
    theEventDefaultsStayOffTheWire(): boolean {
        return invoke(() => this.raw().theEventDefaultsStayOffTheWire());
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    dispose(): void { this.state?.free(); this.state = undefined; }
}

export type VariableType = "continuous" | "integer" | "binary";
export type ConstraintRelation = "le" | "ge" | "eq";
export interface VariableRange {
    lowerBound?: number;
    upperBound?: number;
}
export interface VariableOptions extends VariableRange {
    type?: VariableType;
}

/** 拒绝未知选项字段：命名选项会被展开成位置参数，拼错字段会静默改变语义 / Reject unknown option fields: named options expand into positional arguments, so a typo silently changes semantics. */
/**
 * 名称必须在 JS 边界校验：把非字符串交给 WASM 会变成 wasm trap，
 * 最终只能报 `ExecutionFailure`，把调用方的普通错误伪装成求解失败。
 * Names must be validated at the JS boundary: handing a non-string to WASM produces a wasm trap and can only surface
 * as `ExecutionFailure`, disguising a plain caller mistake as a solver failure.
 */
export function requireName(name: unknown, subject: string): string {
    if (typeof name !== "string" || name.length === 0) throw new OspfError("InvalidInput", `expected a non-empty ${subject} name`);
    return name;
}

export function rejectUnknownOptions(options: object, allowed: readonly string[], subject: string): void {
    for (const key of Object.keys(options)) {
        if (!allowed.includes(key)) throw new OspfError("InvalidInput", `unsupported ${subject} option '${key}'`);
    }
}

function validateVariableRange(range: VariableRange): void {
    if (range === null || typeof range !== "object" || Array.isArray(range)) throw new OspfError("InvalidInput", "invalid variable range");
    rejectUnknownOptions(range, ["type", "lowerBound", "upperBound"], "variable");
    for (const bound of [range.lowerBound, range.upperBound]) {
        if (bound !== undefined && (typeof bound !== "number" || Number.isNaN(bound))) throw new OspfError("InvalidInput", "invalid variable bound");
    }
}

/** 变量只对所属模型有效 / A variable is valid only in its owning model. */
export interface Variable {
    readonly index: number;
    readonly name: string;
    /** 转为独立表达式；模型释放后失效 / Create an independent expression, invalidated when the model is disposed. */
    toLinear(): Linear;
    /** 获取独立的 Rust token 句柄 / Get an independent Rust token handle. */
    token(): Token;
}

export type LinearTerms = ReadonlyArray<readonly [Variable, number]>;

let wrapLinear: (value: LinearBinding) => Linear;
let readLinear: (value: Linear) => LinearBinding;
let wrapInequality: (value: InequalityBinding) => LinearInequality;
let readInequality: (value: LinearInequality) => InequalityBinding;
let wrapToken: (value: TokenBinding) => Token;
let wrapSymbol: (value: SymbolBinding) => LinearExpressionSymbol;
let wrapQuadraticSymbol: (value: QuadraticSymbolBinding) => QuadraticExpressionSymbol;
let wrapQuadratic: (value: QuadraticBinding) => Quadratic;
let readQuadratic: (value: Quadratic) => QuadraticBinding;
let wrapQuadraticInequality: (value: QuadraticInequalityBinding) => QuadraticInequality;
let readQuadraticInequality: (value: QuadraticInequality) => QuadraticInequalityBinding;

/** 稳定身份的 Rust token；模型变更不会重新生成变量 ID / Rust token with a stable variable identity across model mutations. */
export class Token {
    private constructor(private value: TokenBinding | undefined) {}
    static { wrapToken = value => new Token(value); }

    private raw(): TokenBinding {
        if (!this.value) throw new OspfError("Disposed", "token handle has been disposed");
        return this.value;
    }

    id(): bigint { return invoke(() => this.raw().id()); }
    solverIndex(): number { return invoke(() => this.raw().solverIndex()); }
    name(): string { return invoke(() => this.raw().name()); }
    kind(): VariableType {
        const kind = invoke(() => this.raw().kind());
        if (kind !== "continuous" && kind !== "integer" && kind !== "binary") throw new OspfError("ProtocolFailure", "unsupported token kind");
        return kind;
    }
    lowerBound(): number | undefined { return invoke(() => this.raw().lowerBound()); }
    upperBound(): number | undefined { return invoke(() => this.raw().upperBound()); }
    result(): number | undefined { return invoke(() => this.raw().result()); }
    toLinear(): Linear { return invoke(() => wrapLinear(this.raw().toLinear())); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 已注册的 Rust 线性表达式符号；释放句柄不注销注册 / Registered Rust symbol; disposing its handle does not unregister it. */
export class LinearExpressionSymbol {
    private constructor(private value: SymbolBinding | undefined) {}
    static { wrapSymbol = value => new LinearExpressionSymbol(value); }

    private raw(): SymbolBinding {
        if (!this.value) throw new OspfError("Disposed", "symbol handle has been disposed");
        return this.value;
    }

    id(): bigint { return invoke(() => this.raw().id()); }
    name(): string { return invoke(() => this.raw().name()); }
    dependencyIds(): BigUint64Array { return invoke(() => this.raw().dependencyIds()); }
    toLinear(): Linear { return invoke(() => wrapLinear(this.raw().toLinear())); }
    evaluate(values: Float64Array): number { return invoke(() => this.raw().evaluate(values)); }
    evaluateSolution(): number | undefined { return invoke(() => this.raw().evaluateSolution()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 已注册的 Rust 二次表达式符号；释放句柄不注销注册 / Registered Rust quadratic symbol; disposing its handle does not unregister it. */
export class QuadraticExpressionSymbol {
    private constructor(private value: QuadraticSymbolBinding | undefined) {}
    static { wrapQuadraticSymbol = value => new QuadraticExpressionSymbol(value); }

    private raw(): QuadraticSymbolBinding {
        if (!this.value) throw new OspfError("Disposed", "symbol handle has been disposed");
        return this.value;
    }

    id(): bigint { return invoke(() => this.raw().id()); }
    name(): string { return invoke(() => this.raw().name()); }
    dependencyIds(): BigUint64Array { return invoke(() => this.raw().dependencyIds()); }
    toQuadratic(): Quadratic { return invoke(() => wrapQuadratic(this.raw().toQuadratic())); }
    evaluate(values: Float64Array): number { return invoke(() => this.raw().evaluate(values)); }
    evaluateSolution(): number | undefined { return invoke(() => this.raw().evaluateSolution()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 不可变 Rust 线性多项式；每个运算结果都需要释放 / Immutable Rust linear polynomial; dispose each operation result. */
export class Linear {
    private constructor(private value: LinearBinding | undefined) {}

    static {
        wrapLinear = value => new Linear(value);
        readLinear = value => value.raw();
    }

    private raw(): LinearBinding {
        if (!this.value) throw new OspfError("Disposed", "linear expression has been disposed");
        return this.value;
    }

    add(other: Linear | number): Linear {
        return invoke(() => wrapLinear(typeof other === "number" ? this.raw().offset(other) : this.raw().add(readLinear(other))));
    }

    sub(other: Linear | number): Linear {
        return invoke(() => wrapLinear(typeof other === "number" ? this.raw().offset(-other) : this.raw().sub(readLinear(other))));
    }

    mul(value: number): Linear;
    mul(value: Linear): Quadratic;
    mul(value: number | Linear): Linear | Quadratic {
        if (typeof value !== "number") return invoke(() => wrapQuadratic(this.raw().product(readLinear(value))));
        if (!Number.isFinite(value)) throw new OspfError("InvalidInput", "multiplier must be finite");
        return invoke(() => wrapLinear(this.raw().mul(value)));
    }
    toQuadratic(): Quadratic { return invoke(() => wrapQuadratic(this.raw().toQuadratic())); }
    neg(): Linear { return this.mul(-1); }
    constant(): number { return invoke(() => this.raw().constant()); }
    coefficients(): Float64Array { return invoke(() => this.raw().coefficients()); }
    evaluate(values: Float64Array): number { return invoke(() => this.raw().evaluate(values)); }

    private compare(relation: ConstraintRelation, rhs: Linear | number): LinearInequality {
        if (typeof rhs === "number") return invoke(() => wrapInequality(this.raw().compare(relation, rhs)));
        const difference = this.sub(rhs);
        try { return difference.compare(relation, 0); }
        finally { difference.dispose(); }
    }

    le(rhs: Linear | number): LinearInequality { return this.compare("le", rhs); }
    ge(rhs: Linear | number): LinearInequality { return this.compare("ge", rhs); }
    eq(rhs: Linear | number): LinearInequality { return this.compare("eq", rhs); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 每项为 coefficient*x[row]*x[column]，无隐含二倍因子 / Each term is coefficient*x[row]*x[column], without an implicit factor of two. */
export interface QuadraticTerms {
    readonly rows: Uint32Array;
    readonly columns: Uint32Array;
    readonly coefficients: Float64Array;
}

/** 不可变 Rust 二次多项式，注册与执行仍在 Rust / Immutable Rust quadratic polynomial, with registration and execution in Rust. */
export class Quadratic {
    private constructor(private value: QuadraticBinding | undefined) {}

    static {
        wrapQuadratic = value => new Quadratic(value);
        readQuadratic = value => value.raw();
    }

    private raw(): QuadraticBinding {
        if (!this.value) throw new OspfError("Disposed", "quadratic expression has been disposed");
        return this.value;
    }

    private combine(other: Quadratic | Linear | number, subtract: boolean): Quadratic {
        if (typeof other === "number") return invoke(() => wrapQuadratic(this.raw().offset(subtract ? -other : other)));
        if (other instanceof Linear) {
            const promoted = other.toQuadratic();
            try { return this.combine(promoted, subtract); }
            finally { promoted.dispose(); }
        }
        return invoke(() => {
            const rhs = readQuadratic(other);
            return wrapQuadratic(subtract ? this.raw().sub(rhs) : this.raw().add(rhs));
        });
    }

    add(other: Quadratic | Linear | number): Quadratic { return this.combine(other, false); }
    sub(other: Quadratic | Linear | number): Quadratic { return this.combine(other, true); }
    mul(value: number): Quadratic {
        if (!Number.isFinite(value)) throw new OspfError("InvalidInput", "multiplier must be finite");
        return invoke(() => wrapQuadratic(this.raw().mul(value)));
    }
    neg(): Quadratic { return this.mul(-1); }
    constant(): number { return invoke(() => this.raw().constant()); }
    linearCoefficients(): Float64Array { return invoke(() => this.raw().linearCoefficients()); }
    quadraticTerms(): QuadraticTerms {
        return invoke(() => ({ rows: this.raw().rowIndices(), columns: this.raw().columnIndices(), coefficients: this.raw().quadraticCoefficients() }));
    }
    evaluate(values: Float64Array): number { return invoke(() => this.raw().evaluate(values)); }
    tryToLinear(): Linear { return invoke(() => wrapLinear(this.raw().tryToLinear())); }
    private compare(relation: ConstraintRelation, rhs: Quadratic | Linear | number): QuadraticInequality {
        if (typeof rhs === "number") return invoke(() => wrapQuadraticInequality(this.raw().compare(relation, rhs)));
        const difference = this.sub(rhs);
        try { return difference.compare(relation, 0); }
        finally { difference.dispose(); }
    }
    le(rhs: Quadratic | Linear | number): QuadraticInequality { return this.compare("le", rhs); }
    ge(rhs: Quadratic | Linear | number): QuadraticInequality { return this.compare("ge", rhs); }
    eq(rhs: Quadratic | Linear | number): QuadraticInequality { return this.compare("eq", rhs); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 二次关系持有独立快照，不因原表达式释放而失效 / A quadratic relation owns a snapshot independent of its source expression. */
export class QuadraticInequality {
    private constructor(private value: QuadraticInequalityBinding | undefined) {}
    static {
        wrapQuadraticInequality = value => new QuadraticInequality(value);
        readQuadraticInequality = value => {
            if (!value.value) throw new OspfError("Disposed", "quadratic inequality has been disposed");
            return value.value;
        };
    }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 关系保存表达式快照，注册后可独立释放 / A relation owns an expression snapshot and can be freed after registration. */
export class LinearInequality {
    private constructor(private value: InequalityBinding | undefined) {}

    static {
        wrapInequality = value => new LinearInequality(value);
        readInequality = value => {
            if (!value.value) throw new OspfError("Disposed", "linear inequality has been disposed");
            return value.value;
        };
    }

    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 以 Rust MetaModel 为编译轴心 / Compiles through the Rust MetaModel. */
export class MetaModel {
    private value: ModelBinding | undefined;
    private readonly variables = new WeakSet<Variable>();
    private readonly orderedVariables: Variable[] = [];

    constructor(readonly name: string) { this.value = invoke(() => new (wasm().MetaModel)(name)); }

    private raw(): ModelBinding {
        if (!this.value) throw new OspfError("Disposed", "model has been disposed");
        return this.value;
    }

    addVariable(name: string, options: VariableOptions = {}): Variable {
        this.raw();
        validateVariableRange(options);
        if (options.type !== undefined && options.type !== "continuous" && options.type !== "integer" && options.type !== "binary") {
            throw new OspfError("InvalidInput", "invalid variable type");
        }
        const kind = options.type ?? "continuous";
        const lower = options.lowerBound ?? (kind === "binary" ? 0 : undefined);
        const upper = options.upperBound ?? (kind === "binary" ? 1 : undefined);
        const index = invoke(() => this.raw().addVariable(requireName(name, "variable"), kind, lower, upper));
        const variable: Variable = Object.freeze({
            index, name,
            toLinear: () => this.linearExpression([[variable, 1]]),
            token: () => this.token(variable),
        });
        this.variables.add(variable);
        this.orderedVariables.push(variable);
        return variable;
    }

    token(variable: Variable): Token {
        this.raw();
        if (!this.variables.has(variable)) throw new OspfError("InvalidReference", "variable belongs to another model");
        return invoke(() => wrapToken(this.raw().token(variable.index)));
    }

    /** 替换上下界并清除旧赋值；省略的二元边界默认为 0、1 / Replace bounds and clear assignments; omitted binary bounds default to 0 and 1. */
    setVariableRange(variable: Variable, range: VariableRange): void {
        this.raw();
        if (!this.variables.has(variable)) throw new OspfError("InvalidReference", "variable belongs to another model");
        validateVariableRange(range);
        invoke(() => this.raw().setVariableRange(variable.index, range.lowerBound, range.upperBound));
    }

    tokens(): Token[] { this.raw(); return this.orderedVariables.map(variable => this.token(variable)); }

    addLinearSymbol(name: string, expression: Linear): LinearExpressionSymbol {
        return invoke(() => wrapSymbol(this.raw().addLinearSymbol(requireName(name, "symbol"), readLinear(expression))));
    }

    addQuadraticSymbol(name: string, expression: Quadratic): QuadraticExpressionSymbol {
        return invoke(() => wrapQuadraticSymbol(this.raw().addQuadraticSymbol(requireName(name, "symbol"), readQuadratic(expression))));
    }

    /** 显式赋值只检查范围和整数性，不是可行性或最优性证明 / Explicit assignment checks bounds and integrality, not feasibility or optimality. */
    setSolution(values: Float64Array): void { invoke(() => this.raw().setSolution(values)); }
    clearSolution(): void { invoke(() => this.raw().clearSolution()); }

    /** Rust 合并系数；JS 检查避免 TypedArray 将非法值静默强制转换 / Rust combines terms; JS guards prevent silent TypedArray coercion. */
    linearExpression(terms: LinearTerms = [], constant = 0): Linear {
        this.raw();
        if (!Number.isFinite(constant)) throw new OspfError("InvalidInput", "constant must be finite");
        const indices = new Uint32Array(terms.length);
        const coefficients = new Float64Array(terms.length);
        for (const [index, [variable, coefficient]] of terms.entries()) {
            if (!this.variables.has(variable)) throw new OspfError("InvalidReference", "variable belongs to another model");
            if (!Number.isFinite(coefficient)) throw new OspfError("InvalidInput", "coefficient must be finite");
            indices[index] = variable.index;
            coefficients[index] = coefficient;
        }
        return invoke(() => wrapLinear(this.raw().linearExpression(indices, coefficients, constant)));
    }

    setLinearObjective(terms: LinearTerms | Linear, category: "minimize" | "maximize" = "minimize"): void {
        if (category !== "minimize" && category !== "maximize") throw new OspfError("InvalidInput", "unknown objective category");
        if (terms instanceof Linear) {
            invoke(() => this.raw().setLinearExpressionObjective(readLinear(terms), category === "maximize"));
        } else {
            const expression = this.linearExpression(terms);
            try { this.setLinearObjective(expression, category); }
            finally { expression.dispose(); }
        }
    }

    setQuadraticObjective(expression: Quadratic | Linear, category: "minimize" | "maximize" = "minimize"): void {
        if (category !== "minimize" && category !== "maximize") throw new OspfError("InvalidInput", "unknown objective category");
        if (expression instanceof Linear) {
            const promoted = expression.toQuadratic();
            try { this.setQuadraticObjective(promoted, category); }
            finally { promoted.dispose(); }
        } else {
            invoke(() => this.raw().setQuadraticObjective(readQuadratic(expression), category === "maximize"));
        }
    }

    addInequality(inequality: LinearInequality | QuadraticInequality, name: string): void {
        invoke(() => inequality instanceof QuadraticInequality
            ? this.raw().addQuadraticInequality(readQuadraticInequality(inequality), name)
            : this.raw().addInequality(readInequality(inequality), name));
    }

    addLinearConstraint(input: {
        name: string;
        terms: LinearTerms;
        relation: ConstraintRelation;
        rhs: number;
    }): void {
        const expression = this.linearExpression(input.terms);
        try {
            const inequality = invoke(() => wrapInequality(readLinear(expression).compare(input.relation, input.rhs)));
            try { this.addInequality(inequality, input.name); }
            finally { inequality.dispose(); }
        } finally { expression.dispose(); }
    }

    toLinearTriadModel(): ModelArtifact {
        return invoke(() => JSON.parse(this.raw().toLinearTriadModel()) as ModelArtifact);
    }

    toQuadraticTetradModel(): ModelArtifact {
        return invoke(() => JSON.parse(this.raw().toQuadraticTetradModel()) as ModelArtifact);
    }

    dispose(): void { this.value?.free(); this.value = undefined; }
}
