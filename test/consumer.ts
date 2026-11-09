import {
    initialize, Decimal, Rational, MetaModel, HttpClient, SCIPSolver,
    type ModelArtifact, type ReportSummary, type QuadraticTerms, type VariableRange, Linear, LinearExpressionSymbol, LinearInequality, Quadratic, QuadraticExpressionSymbol, QuadraticInequality, Token, summarizeReport,
} from "ospf-wasm";
import { NodeClient } from "ospf-wasm/native";
import { ColumnGenerationAlgorithm, ColumnGenerationReport, type ColumnGenerationOptions, type ColumnGenerationSummary, CombinatorialReport, FixedRecourseAlgorithm, FixedRecourseReport, ParallelCombinatorialLinearSolver, SerialCombinatorialLinearSolver, type ConstraintProgrammingSolveOptions, type FixedRecourseOptions, type FixedRecourseSummary, type ParallelCombinatorialMode, type ParallelLinearOptions, type SerialLinearOptions } from "ospf-wasm/framework";
import { Quantity } from "ospf-wasm/quantities";
import { PackingContext, PackingResult, Bpp1dMilp, Bpp1dColumnGeneration, Bpp1dReport, type PackingProblem, type PackingKpi, type Bpp1dSummary } from "ospf-wasm/bpp1d";
import { MultiArray } from "ospf-wasm/multiarray";
import { DiscreteLoadingApplicationReport, DiscreteLoadingApplicationService, DiscreteLoadingBendersApplicationService, DiscreteLoadingBendersReport, DiscreteLoadingContext, DiscreteLoadingReport, type DiscreteLoadingBendersOptions, type BppLoadingOptions, type LoadingObjective, type LoadingResource, type LoadingResourceResult, type DiscreteLoadingProblem, type DiscreteLoadingSolution, type LoadingPosition } from "ospf-wasm/bpp";
import { Geometry2d, type PackingShape2, type Box2Geometry, type QuantityPoint2, type Placement2, type ShapeMetrics } from "ospf-wasm/geometry2d";
import { CuttingContext, Csp1dMilp, Csp1dColumnGeneration, Csp1dReport, type Csp1dOptions, type Csp1dExecutionSummary, type CuttingProblem, type CuttingPlanUsage, type ProductionResult, type PatternGenerationOptions, type ProductionReport, type ProductionReportSummary } from "ospf-wasm/csp1d";
import { CuttingContext as CuttingContext2d, Csp2dReport, Csp2dColumnGeneration, type Csp2dOptions, type CuttingProblem as CuttingProblem2d, type CutTree, type Csp2dExecutionSummary, type Usage as CuttingUsage2d } from "ospf-wasm/csp2d";
import {
    IntegerDomain, ConstraintProgrammingModel, ConstraintProgrammingSnapshot, ConstraintProgrammingReport, ConstraintActivityAnalyzer,
    type IntegerVariable, type IntegerExpression, type ActivityStatus, type ReificationDirection, type AutomatonOptions, type ReservoirOptions,
    type ConstraintProgrammingAssumption, type MipLoweringAnalysis,
} from "ospf-wasm/core";

await initialize();
function checkVariableRangeTypes(model: MetaModel, variable: import("ospf-wasm/core").Variable): void {
    const bounds: VariableRange = { lowerBound: -2, upperBound: 3 };
    model.setVariableRange(variable, bounds);
    // @ts-expect-error
    model.setVariableRange(variable, { lowerBound: "3" });
    // @ts-expect-error
    model.addVariable("invalid", { upperBound: "3" });
}
void checkVariableRangeTypes;
async function checkPartitionApplicationTypes(source: ModelArtifact, client: import("ospf-wasm/framework").ExecutionClient): Promise<void> {
    const { PartitionColumnGenerationApplicationService, PartitionColumnGenerationReport } = await import("ospf-wasm/bpp");
    const configuration: import("ospf-wasm/bpp").PartitionColumnGenerationOptions = { backend: "scip", partition: { partitions: [{ id: "whole", positionIds: ["p"] }] }, reportLimit: 32, sourceMilpFinishing: { reserveTimeMs: 1000 } };
    const job = await new PartitionColumnGenerationApplicationService(client, configuration).solve(source);
    if (job.reportJson) {
        const report = PartitionColumnGenerationReport.fromJson(job.reportJson, source);
        const summary: import("ospf-wasm/bpp").PartitionColumnGenerationSummary = report.executionSummary();
        const calls: readonly import("ospf-wasm/bpp").PartitionColumnGenerationCall[] = report.calls();
        const final: string | undefined = report.finalReportJson(), refined: string | undefined = report.refinementReportJson();
        const failure: import("ospf-wasm/base").BridgeError | undefined = report.accelerationError(); console.log(summary, calls, report.summary(), final, refined, failure);
        const certification: string | undefined = report.certificationReportJson(), application: string = report.applicationReportJson();
        const certificationFailure: import("ospf-wasm/base").BridgeError | undefined = report.certificationError();
        const processed: boolean = report.sourceFinishingPresent(), invoked: boolean = report.sourceFinishingInvoked();
        console.log(certification, application, report.accelerationApplicationReportJson(), certificationFailure, processed, invoked);
        report.solution()?.dispose(); report.dispose();
    }
    await client.release(job.id);
    // 配置不能携带运行时代码或未注册策略。 / Configuration cannot contain runtime code or unregistered strategies.
    // @ts-expect-error
    new PartitionColumnGenerationApplicationService(client, { ...configuration, callback() {} });
    // @ts-expect-error
    new PartitionColumnGenerationApplicationService(client, { ...configuration, benders: {} });
    // @ts-expect-error
    new PartitionColumnGenerationApplicationService(client, { ...configuration, sourceMilpFinishing: { reserveTimeMs: 1n } });
}
void checkPartitionApplicationTypes;
async function checkPartitionTypes(source: ModelArtifact, client: import("ospf-wasm/framework").ExecutionClient): Promise<void> {
    const { PartitionLoadingContext, PartitionLoadingBatch } = await import("ospf-wasm/bpp");
    const options: import("ospf-wasm/bpp").PartitionLoadingOptions = { partitions: [{ id: "left", positionIds: ["a"] }] };
    const context = new PartitionLoadingContext(source, options), master = context.master(), solver = new SCIPSolver(client);
    const job = await solver.solveCompiledLinear(master.toModel());
    if (job.reportJson) {
        const summary: ReportSummary = context.acceptLpReport(master, job.reportJson), pricing = context.pricing(master, "left");
        const decisions: ReadonlyMap<string, number> = new Map(context.decisions().map(decision => [decision.id, 0]));
        const batch = new PartitionLoadingBatch(); batch.add(pricing, [decisions]); context.addPricedBatch(master, batch);
        console.log(summary, pricing.objectiveConstant(), pricing.reducedCost(decisions)); batch.dispose(); pricing.dispose();
    }
    const integer = context.master({ integer: true, refineResources: true });
    const vector: Float64Array = context.sourceValues(integer, new Float64Array()); console.log(vector, integer.globalBindings());
    // 完整决策必须使用 Map，完整求解向量必须使用 Float64Array。 / Complete decisions require Map; complete solver vectors require Float64Array.
    // @ts-expect-error
    context.addColumns([{ partitionId: "left", decisions: { x: 1 } }]);
    // @ts-expect-error
    context.sourceValues(integer, [1]);
    // @ts-expect-error
    new PartitionLoadingContext(source, { ...options, callback() {} });
    context.dispose(); master.dispose(); integer.dispose(); await client.release(job.id);
}
void checkPartitionTypes;
async function checkLoadingApplicationTypes(problem: DiscreteLoadingProblem, client: import("ospf-wasm/framework").ExecutionClient): Promise<void> {
    const objective: LoadingObjective = { itemCosts: { a: -5 }, positionCosts: { p: 1 }, layoutCosts: [] };
    const configuration: BppLoadingOptions = { backend: "scip" };
    const context = new DiscreteLoadingContext(problem, objective), source = context.toArtifact();
    const model: ModelArtifact = context.toApplicationModel();
    const job = await new DiscreteLoadingApplicationService(client, configuration).solve(source);
    if (job.reportJson) {
        const report = DiscreteLoadingApplicationReport.fromJson(job.reportJson, source), summary: ReportSummary = report.summary();
        const registered: boolean = report.registrationPresent(); const raw: string = report.solverReportJson();
        const result = report.solution(); const count: bigint | undefined = result?.loadedCount();
        console.log(model, summary, registered, raw, count); result?.dispose(); report.dispose();
    }
    context.dispose(); await client.release(job.id);
    // 原 application 不接受任意 TS 扩展或静默线性降级。 / The original application rejects arbitrary TS extensions and silent linear downgrade.
    // @ts-expect-error
    new DiscreteLoadingApplicationService(client, { backend: "scip", callback() {} });
    // @ts-expect-error
    new DiscreteLoadingApplicationService(client, configuration).solveLinear(source);
}
void checkLoadingApplicationTypes;
function checkLoadingResourceTypes(problem: DiscreteLoadingProblem, plan: DiscreteLoadingSolution): void {
    const resource: LoadingResource = { id: "ballast", positionId: "p", minimumWeight: { value: 0, unit: "kg" }, maximumWeight: { value: 1, unit: "kg" }, minimumPerLoadedWeight: 0.5, costPerWeight: 2 };
    const context = new DiscreteLoadingContext(problem, undefined, [resource]);
    const weights = new Map([["ballast", { value: 500, unit: "g" as const }]]);
    const values: Float64Array = context.solutionValues(plan, weights), result = context.verifySolution(plan, weights);
    const resources: LoadingResourceResult | undefined = result.resources(); console.log(values, resources); result.dispose(); context.dispose();
    // 资源重量不能以无单位 number 或普通对象替代。 / Resource weights cannot be replaced by unitless numbers or plain objects.
    // @ts-expect-error
    context.solutionValues(plan, new Map([["ballast", 0.5]]));
    // @ts-expect-error
    context.verifySolution(plan, { ballast: { value: 0.5, unit: "kg" } });
}
void checkLoadingResourceTypes;
async function checkLoadingBendersTypes(source: ModelArtifact, client: import("ospf-wasm/framework").ExecutionClient): Promise<void> {
    const finishing: import("ospf-wasm/bpp").BppLoadingSourceFinishingOptions = { reserveTimeMs: 1000 };
    const configuration: DiscreteLoadingBendersOptions = { backend: "scip", recourseResources: ["ballast"], fallbackToMilp: true, sourceMilpFinishing: finishing };
    const service = new DiscreteLoadingBendersApplicationService(client, configuration), job = await service.solve(source);
    if (job.reportJson) {
        const report = DiscreteLoadingBendersReport.fromJson(job.reportJson, source), plan = report.solution();
        const summary: import("ospf-wasm/framework").FixedRecourseSummary | undefined = report.decompositionSummary();
        const child: string | undefined = report.decompositionReportJson(), used: boolean = report.fallbackUsed();
        const actual: string | undefined = report.certificationReportJson();
        const error: import("ospf-wasm/base").BridgeError | undefined = report.certificationError();
        const present: boolean = report.sourceFinishingPresent(), invoked: boolean = report.sourceFinishingInvoked();
        console.log(summary, child, used, report.decompositionError(), plan?.resources(), actual, error, present, invoked, report.accelerationApplicationReportJson()); report.dispose(); plan?.dispose();
    }
    await client.release(job.id);
    // 资源身份不是裸 token；回退与扩展不得使用函数。 / Resource identities are not raw tokens; fallback and extensions cannot be callbacks.
    // @ts-expect-error
    new DiscreteLoadingBendersApplicationService(client, { backend: "scip", recourseResources: [1n] });
    // @ts-expect-error
    new DiscreteLoadingBendersApplicationService(client, { backend: "scip", recourseResources: ["ballast"], fallbackToMilp() {} });
    // 收尾仅接受生成的预算 DTO。 / Finishing only accepts the generated budget DTO.
    // @ts-expect-error
    new DiscreteLoadingBendersApplicationService(client, { backend: "scip", recourseResources: ["ballast"], sourceMilpFinishing: { reserveTimeMs: 1n } });
    // @ts-expect-error
    new DiscreteLoadingBendersApplicationService(client, { backend: "scip", recourseResources: ["ballast"], sourceMilpFinishing: { reserveTimeMs: 1000, solve() {} } });
}
void checkLoadingBendersTypes;
function readLoading(text: string, source: ModelArtifact): void {
    const report = DiscreteLoadingReport.fromJson(text, source), result = report.solution();
    const counts: ReadonlyMap<string, bigint> | undefined = result?.positionCounts();
    const position: LoadingPosition = { id: "p", maxCount: 18_446_744_073_709_551_615n, maxWeight: { value: 1, unit: "kg" }, fixedOccupied: true, enabled: false };
    const input: DiscreteLoadingProblem = { items: [], positions: [position], allowedAssignments: [], conflicts: [], layoutGroups: [], weightUnit: "kg" };
    const context = new DiscreteLoadingContext(input), plan: DiscreteLoadingSolution = { assignments: {}, occupiedPositions: ["p"], selectedLayouts: {} };
    const values: Float64Array = context.solutionValues(plan); context.extractSolution(values).dispose(); context.verifySolution(plan).dispose();
    const linear: ModelArtifact = context.toLinearTriadModel(); console.log(counts, linear, report.summary(), result?.solution());
    // 精确容量不接受 number，TypedArray 形状不能以普通数组代替。 / Exact capacities reject number; ordinary arrays cannot replace TypedArray vectors.
    // @ts-expect-error
    position.maxCount = 9007199254740993;
    // @ts-expect-error
    context.extractSolution([1]);
    // @ts-expect-error
    new DiscreteLoadingContext({ ...input, callback() {} });
    result?.dispose(); report.dispose(); context.dispose();
}
void readLoading;
const cutting2dProblem: CuttingProblem2d = {
    products: [{ id: "a", name: "A", geometry: { width: { value: 1, unit: "m" }, height: { value: 1, unit: "m" } }, allowRotate: false }],
    materials: [{ id: "s", name: "S", shape: { kind: "sheet", geometry: { width: { value: 4, unit: "m" }, height: { value: 2, unit: "m" } } },
        availableBatches: 10n, process: "freeform", maxSegmentHeight: null, products: [{ productId: "a", count: 4n }] }],
    demands: [{ kind: "count", productId: "a", count: 3n, upperBound: null }], initialColumns: [], kerf: { value: 0, unit: "m" },
    objective: { areaWeight: 1, wasteWeight: 0, heightWeight: 0, usageWeight: 0 },
};
const cutting2d = new CuttingContext2d(cutting2dProblem), cutting2dArtifact: ModelArtifact = cutting2d.toArtifact();
cutting2d.validateColumns([]); cutting2d.dispose(); CuttingContext2d.fromArtifact(cutting2dArtifact).dispose();
// 件数只接受 bigint，不手抄生成协议字段。 / Counts require bigint; generated protocol fields are not manually copied.
// @ts-expect-error
cutting2dProblem.materials[0].availableBatches = 10;
// @ts-expect-error
const invalidCutTree: CutTree = { nodes: [{ kind: "cut", orientation: "diagonal" }] };
console.log(invalidCutTree);
function readCutting2d(text: string, source: ModelArtifact): void {
    const report = Csp2dReport.fromJson(text, source), production = report.production();
    const summary: Csp2dExecutionSummary = report.summary();
    const counts: ReadonlyMap<string, bigint> | undefined = production?.producedCounts();
    const usages: CuttingUsage2d[] | undefined = production?.usages();
    console.log(summary, counts, usages, production?.coilHeights(), production?.materialBatches(), report.stageReportJson(0));
    // 报告必须以无损原文导入。 / Reports must be imported as lossless original text.
    // @ts-expect-error
    Csp2dReport.fromJson({ stages: [] }, source);
    production?.dispose(); report.dispose();
}
void readCutting2d;
async function executeCutting2d(client: import("ospf-wasm/framework").ExecutionClient): Promise<void> {
    const configuration: Csp2dOptions = { backend: "scip", generators: ["shelf"], finalIntegerEnabled: true, reportLimit: 128 };
    const solver = new Csp2dColumnGeneration(client, configuration);
    const job: import("ospf-wasm/base").JobView = await solver.solve(cutting2dArtifact);
    console.log(job.reportJson);
    // 领域策略拒绝任意回调、未注册生成器和线性降级。 / Domain strategies reject arbitrary callbacks, unregistered generators and linear downgrades.
    // @ts-expect-error
    new Csp2dColumnGeneration(client, { ...configuration, pricing() {} });
    // @ts-expect-error
    new Csp2dColumnGeneration(client, { backend: "scip", generators: ["custom"] });
    // @ts-expect-error
    solver.solveLinear(cutting2dArtifact);
}
void executeCutting2d;
const geometry = new Geometry2d("cm");
const geometryShape: PackingShape2 = { kind: "rectangle", width: { value: 2, unit: "m" }, height: { value: 3000, unit: "mm" } };
const geometryPoint: QuantityPoint2 = { x: { value: 0, unit: "m" }, y: { value: 0, unit: "m" } };
const geometryBounds: Box2Geometry = { shape: geometryShape, position: geometryPoint };
const geometryPlacement: Placement2 = { ...geometryBounds, rotated: false, itemId: null };
const geometryMetrics: ShapeMetrics = geometry.shapeMetrics(geometryShape);
const geometryPairs: Uint32Array = geometry.overlapPairs([geometryBounds]);
console.log(geometryMetrics.area, geometryPairs, geometry.inflatedByPlacement(geometryPlacement, { value: 0.1, unit: "m" }));
const areaQuantity = new Quantity(geometryMetrics.area.value, geometryMetrics.area.unit), areaMeters = areaQuantity.toUnit("m^2");
areaMeters.dispose(); areaQuantity.dispose(); geometry.dispose();
// 几何结构只消费 Rust 生成的判别联合和显式物理量 / Geometry consumes only Rust-generated discriminated unions and explicit quantities.
// @ts-expect-error
geometry.shape({ kind: "triangle", width: { value: 1, unit: "m" } });
// @ts-expect-error
geometry.shape({ kind: "circle", radius: 1 });
// @ts-expect-error
geometry.candidateShapes(geometryShape, "true");
// @ts-expect-error
geometry.overlapPairs(new Float64Array([1, 2]));
const cp = new ConstraintProgrammingModel("type-contract-cp");
const domain = IntegerDomain.range(9007199254740993n, 9007199254740999n);
const cpVariable: IntegerVariable = cp.addVariable("x", domain);
const cpExpression: IntegerExpression = cpVariable.toExpression();
cp.addConstraint(cpExpression.le(9007199254740995n), { id: "limit" });
const snapshot: ConstraintProgrammingSnapshot = cp.freeze();
const assumptions: readonly ConstraintProgrammingAssumption[] = [{ kind: "equal", variableId: "x", value: 9007199254740993n }];
const restricted = snapshot.withAssumptions(assumptions);
const preflight: MipLoweringAnalysis = restricted.analyzeMipLowering();
if (preflight.status === "lowered") console.log(preflight.sourceVariables, preflight.fingerprint);
if (preflight.status === "inexact") { const originalValue: string = preflight.value; console.log(originalValue); }
restricted.dispose();
// 精确假设和稳定 ID 不接受隐式转换 / Exact assumptions and stable IDs reject implicit conversion.
// @ts-expect-error
snapshot.withAssumptions([{ kind: "equal", variableId: "x", value: 1 }]);
// @ts-expect-error
snapshot.withAssumptions([{ kind: "equal", variableId: cpVariable, value: 1n }]);
const activity = new ConstraintActivityAnalyzer().analyzeCp(snapshot, [9007199254740993n]);
const status: ActivityStatus = activity.status("limit");
const exact: bigint | undefined = activity.integerLhs("limit");
console.log(status, exact);
const cpZero = cp.integerExpression();
const direction: ReificationDirection = "impliesLiteral";
const automatonOptions: AutomatonOptions = { initialState: 0, finalStates: [1], transitions: [{ fromState: 0, value: 9007199254740993n, toState: 1 }] };
const reservoirOptions: ReservoirOptions = { events: [{ time: cpZero, levelChange: cpExpression }], initialLevel: 0n, minimumLevel: 0n, maximumLevel: 9007199254740999n };
const cpGlobals = [
    cp.allDifferent([cpExpression, cpVariable]), cp.element({ index: cpZero, values: [9007199254740993n], target: cpVariable }),
    cp.allowedAssignments([cpVariable], [[9007199254740993n]]), cp.forbiddenAssignments([cpVariable], []),
    cp.automaton([cpVariable], automatonOptions), cp.reservoir(reservoirOptions), cp.circuit([cpZero]),
];
console.log(direction);
// 精确表与可变区间时长不接受隐式浮点数 / Exact tables and variable interval durations reject implicit floating values.
// @ts-expect-error
cp.allowedAssignments([cpVariable], [[1]]);
// @ts-expect-error
cp.addInterval({ id: "invalid", start: cpZero, end: cpExpression, duration: 1 });
// @ts-expect-error
cp.automaton([cpVariable], { ...automatonOptions, initialState: 1n });
for (const value of [...cpGlobals, cpZero]) value.dispose();
// 精确 CP 不接受 number 或浮点表达式 / Exact CP accepts neither numbers nor floating expressions.
// @ts-expect-error
IntegerDomain.range(1, 2);
// @ts-expect-error
snapshot.validateAssignment(new Float64Array([1]));
// @ts-expect-error
cpExpression.mul(2);
for (const value of [domain, cpExpression, snapshot, activity, cp]) value.dispose();
const model = new MetaModel("type-contract");
const x = model.addVariable("x", { type: "binary" });
model.setLinearObjective([[x, 1]], "maximize");
const expression: Linear = x.toLinear();
const quadratic: Quadratic = expression.mul(expression);
const scalarProduct: Linear = expression.mul(2);
const quadraticTerms: QuadraticTerms = quadratic.quadraticTerms();
console.log(quadratic.evaluate(new Float64Array([1])), quadraticTerms);
const qrelation: QuadraticInequality = quadratic.le(1);
model.addInequality(qrelation, "qcapacity");
model.setQuadraticObjective(quadratic);
const qartifact: ModelArtifact = model.toQuadraticTetradModel();
console.log(qartifact.fingerprint);
const quadraticSymbol: QuadraticExpressionSymbol = model.addQuadraticSymbol("x-squared", quadratic);
const quadraticReference: Quadratic = quadraticSymbol.toQuadratic();
const quadraticDependencies: BigUint64Array = quadraticSymbol.dependencyIds();
const quadraticValue: number | undefined = quadraticSymbol.evaluateSolution();
console.log(quadraticDependencies, quadraticValue);
// 二次符号要求显式二次表达式 / Quadratic symbols require an explicit quadratic expression.
// @ts-expect-error
model.addQuadraticSymbol("linear-not-quadratic", expression);
quadraticReference.dispose(); quadraticSymbol.dispose();
qrelation.dispose();
// 二次式只允许标量乘法，不隐式提升为四次式 / Quadratic multiplication accepts scalars, not implicit quartic promotion.
// @ts-expect-error
quadratic.mul(quadratic);
// 二次式不能冒充已支持的线性目标 / Quadratic expressions cannot masquerade as supported linear objectives.
// @ts-expect-error
model.setLinearObjective(quadratic);
quadratic.dispose(); scalarProduct.dispose();
const token: Token = x.token();
const identity: bigint = token.id();
const symbol: LinearExpressionSymbol = model.addLinearSymbol("x-value", expression);
const dependencies: BigUint64Array = symbol.dependencyIds();
model.setSolution(new Float64Array([1]));
const evaluated: number | undefined = symbol.evaluateSolution();
console.log(identity, dependencies, evaluated);
token.dispose(); symbol.dispose();
const relation: LinearInequality = expression.le(1);
model.addInequality(relation, "capacity");
model.setLinearObjective(expression);
expression.evaluate(new Float64Array([1]));
expression.dispose(); relation.dispose();
// 表达式不接受精确整数的隐式浮点转换 / Expressions do not implicitly convert bigint into f64.
// @ts-expect-error
expression.mul(1n);
// 关系只能由同模型表达式工厂创建 / Relations can only be created through scoped expression factories.
// @ts-expect-error
new LinearInequality();
const artifact: ModelArtifact = model.toLinearTriadModel();
const client = new HttpClient({ baseUrl: "http://localhost:8787", token: "credential" });
const serialConfiguration: SerialLinearOptions = { backends: ["scip", "gurobi"], fallbackPolicy: "continueOnTerminal" };
const serialSolver = new SerialCombinatorialLinearSolver(client, serialConfiguration);
const serialJob = await serialSolver.solveLinear(artifact);
if (serialJob.reportJson) {
    const aggregate = CombinatorialReport.fromJson(serialJob.reportJson, artifact);
    const selectedId: string | undefined = aggregate.selectedAttemptId();
    const selectedReport: ReportSummary = aggregate.summary();
    for (const id of aggregate.attemptIds()) console.log(aggregate.attemptJson(id));
    console.log(selectedId, selectedReport, aggregate.reportJson(), aggregate.selectionReason());
    aggregate.dispose();
}
// framework 只接受显式预置策略配置，不序列化任意 TS 回调 / Framework accepts explicit built-in strategy configuration, not arbitrary TS callbacks.
// @ts-expect-error
new SerialCombinatorialLinearSolver(client, { backends: ["fake"] });
// @ts-expect-error
serialSolver.solveQuadratic(artifact);
const mode: ParallelCombinatorialMode = "best";
const parallelConfiguration: ParallelLinearOptions = { backends: ["scip"], mode };
const parallelSolver = new ParallelCombinatorialLinearSolver(client, parallelConfiguration);
await parallelSolver.solveLinear(artifact, { pollIntervalMs: 10 });
// @ts-expect-error
new ParallelCombinatorialLinearSolver(client, { backends: ["scip"], mode: "fastest" });
// @ts-expect-error
parallelSolver.solveQuadratic(artifact);
const recourseOptions: FixedRecourseOptions = { backend: "scip", stages: [{ variableIndex: 0, stage: "master" }] };
const recourseAlgorithm = new FixedRecourseAlgorithm(client, recourseOptions);
const recourseJob = await recourseAlgorithm.solveLinear(artifact);
if (recourseJob.reportJson) {
    const recourseReport = FixedRecourseReport.fromJson(recourseJob.reportJson, artifact);
    const result: FixedRecourseSummary = recourseReport.summary();
    console.log(result.stop, result.values, result.bestBound, recourseReport.masterReportJson());
    recourseReport.dispose();
}
// @ts-expect-error
new FixedRecourseAlgorithm(client, { backend: "scip", stages: [{ variableIndex: 0, stage: "integerRecourse" }] });
// @ts-expect-error
recourseAlgorithm.solveQuadratic(artifact);
const solver = new SCIPSolver(client);
const cpJob = await solver.solveConstraintProgramming(snapshot.toArtifact());
const executionOptions: ConstraintProgrammingSolveOptions = { nodeLimit: 0, solutionLimit: 0, requestConflict: true, solutionHint: new Map([["x", 9007199254740993n]]) };
await solver.solveConstraintProgramming(snapshot.toArtifact(), executionOptions);
// 整数提示不允许浮点值，CP 参数不进入线性求解入口 / Integer hints reject floating values, and CP options do not enter the linear solve API.
// @ts-expect-error
await solver.solveConstraintProgramming(snapshot.toArtifact(), { solutionHint: new Map([["x", 1]]) });
// @ts-expect-error
await solver.solveLinear(snapshot.toArtifact(), { nodeLimit: 1 });
if (cpJob.reportJson) {
    const cpReport: ConstraintProgrammingReport = ConstraintProgrammingReport.fromJson(cpJob.reportJson, snapshot);
    const integerValues: BigInt64Array = cpReport.values();
    const integerObjective: bigint | undefined = cpReport.objectiveValue();
    console.log(integerValues, integerObjective);
    cpReport.dispose();
}
const result = await solver.solveLinear(artifact);
if (result.reportJson) {
    const report: ReportSummary = summarizeReport(result.reportJson);
    console.log(report.objectiveValue);
}
await NodeClient.create();
new Decimal("9007199254740993");
new Rational(9007199254740993n, 3n);
new Quantity(1, "m");
new Quantity(1, "kg");
const packingInput: PackingProblem = {
    items: [{ id: "a", length: { value: 1, unit: "cm" }, weight: { value: 10, unit: "g" }, amount: 1n, materials: new Map([["steel", 9007199254740993n]]) }],
    binTypes: [{ id: "bin", length: { value: 1, unit: "m" }, maxWeight: { value: 1, unit: "kg" }, cost: 1, inventory: null }],
    spacing: { value: 0, unit: "mm" }, lengthUnit: "cm", weightUnit: "kg", objective: "binCount",
};
const packingContext = new PackingContext(packingInput), packingArtifact: ModelArtifact = packingContext.toArtifact();
const physical: PackingResult = packingContext.pack([{ pattern: { binTypeId: "bin", amounts: new Map([["a", 1n]]) }, count: 1n }]);
const packingKpi: PackingKpi = physical.kpi(); const binCount: bigint = packingKpi.binCount;
console.log(binCount, physical.materials()); physical.dispose(); packingContext.dispose();
for (const PackingSolver of [Bpp1dMilp, Bpp1dColumnGeneration]) {
    const packingJob = await new PackingSolver(client, { backend: "scip", generation: { maxPatterns: 100 } }).solve(packingArtifact);
    if (packingJob.reportJson) { const report = Bpp1dReport.fromJson(packingJob.reportJson, packingArtifact); const summary: Bpp1dSummary = report.summary(); console.log(summary.globallyOptimal); report.dispose(); }
}
// 精确数量不接受 number，扩展必须在宿主预注册 / Exact counts reject number; extensions must be registered on the host.
// @ts-expect-error
packingContext.pack([{ pattern: { binTypeId: "bin", amounts: new Map([["a", 1]]) }, count: 1n }]);
// @ts-expect-error
new Bpp1dMilp(client, { backend: "scip", callback() {} });
new MultiArray([1], new Float64Array([1]));
// 精确数值不接受 number / Exact numeric constructors do not accept number.
// @ts-expect-error
new Decimal(9007199254740993);
// 单位必须属于明确开放的集合 / Units must belong to the explicitly exposed set.
// @ts-expect-error
new Quantity(1, "unsupported");

const columnOptions: ColumnGenerationOptions = { backend: "scip", blocks: [{ id: "block", variableIndices: [0] }], columnLimit: 100 };
const columnJob = await new ColumnGenerationAlgorithm(client, columnOptions).solveLinear(artifact);
if (columnJob.reportJson) {
    const report = ColumnGenerationReport.fromJson(columnJob.reportJson, artifact);
    const summary: ColumnGenerationSummary = report.summary(); console.log(summary.pricingConverged, report.finalReportJson()); report.dispose();
}
// 不自动把 TS 回调转换成 Rust 策略 / Do not automatically convert TS callbacks into Rust strategies.
// @ts-expect-error
new ColumnGenerationAlgorithm(client, { ...columnOptions, pricing() {} });

const cuttingInput: CuttingProblem = {
    products: [{ id: "p", name: "p", width: [{ value: 30, unit: "mm" }] }],
    materials: [{ id: "m", name: "m", widthRange: { lowerBound: { value: 0, unit: "cm" }, upperBound: { value: 10, unit: "cm" } }, machineId: null, availableBatches: null }],
    machines: [], demands: [{ productId: "p", mode: "roll", count: 5n }], lengthUnit: "cm",
};
const cutting = new CuttingContext(cuttingInput), generation: PatternGenerationOptions = { generator: "nSame", maxPlans: 128 };
const cuttingCandidates = cutting.generatePatterns(generation);
const cuttingUsage: CuttingPlanUsage = { plan: cuttingCandidates.plans()[2]!, count: 2n };
const production: ProductionResult = cutting.verifyUsages([cuttingUsage]);
const produced: ReadonlyMap<string, bigint> = production.produced();
console.log(produced, cutting.toArtifact());
function readCuttingReport(text: string): void {
    const report: ProductionReport = cutting.readProductionReport(text);
    const summary: ProductionReportSummary = report.summary();
    const result: ProductionResult | undefined = report.production();
    console.log(summary.restrictedOptimal, summary.candidateComplete, report.solverReportJson(), result?.batchCount());
    result?.dispose(); report.dispose();
}
void readCuttingReport;
const cuttingOptions: Omit<Csp1dOptions, "algorithm"> = { backend: "scip", generation: { maxPlans: 1 }, poolLimit: 128 };
for (const Solver of [Csp1dMilp, Csp1dColumnGeneration]) {
    const job = await new Solver(client, cuttingOptions).solve(cutting.toArtifact());
    if (job.reportJson) {
        const report = Csp1dReport.fromJson(job.reportJson, cutting.toArtifact()); const summary: Csp1dExecutionSummary = report.summary();
        const result: ProductionResult | undefined = report.production(); console.log(summary.stop, report.traceJson(), report.stageReportJson(0));
        result?.dispose(); report.integerReport()?.dispose(); report.dispose();
    }
}
// 任意 TS 回调和模型类型降级均不开放 / Arbitrary TS callbacks and model-kind downgrade are not exposed.
// @ts-expect-error
new Csp1dColumnGeneration(client, { backend: "scip", pricing() {} });
// @ts-expect-error
new Csp1dMilp(client, cuttingOptions).solveLinear(cutting.toArtifact());
// 无损报告不接受已被 JS JSON 解析的对象 / Lossless reports reject objects already parsed by JS JSON.
// @ts-expect-error
cutting.readProductionReport({ child: {} });
production.dispose(); cuttingCandidates.dispose(); cutting.dispose();
// 精确次数不允许 number，未绑定算法与 TS 回调明确拒绝 / Exact counts reject number; unbound algorithms and TS callbacks are rejected.
// @ts-expect-error
cutting.verifyUsages([{ ...cuttingUsage, count: 2 }]);
// @ts-expect-error
cutting.generatePatterns({ generator: "dfs" });
// @ts-expect-error
cutting.generatePatterns({ callback() {} });

// BPP2D 原生执行与可移植报告／装箱结果使用同一源身份。 / BPP2D native execution and portable report/packing results share source identity.
const packing2d = await import("ospf-wasm/bpp2d");
function readPacking2d(text: string, source: import("ospf-wasm/base").ModelArtifact): void {
    const report = packing2d.Bpp2dReport.fromJson(text, source);
    const production = report.production();
    const counts: ReadonlyMap<string, bigint> | undefined = production?.producedCounts();
    const packed = report.packing();
    const patterns: import("ospf-wasm/bpp2d").PackedPattern[] | undefined = packed?.patterns();
    const render: import("ospf-wasm/bpp2d").RenderSheet | undefined = patterns?.[0]?.render;
    const sheetCount: bigint | undefined = packed?.sheetCount();
    console.log(render, sheetCount); packed?.dispose();
    console.log(counts, report.stages(), report.iterations()); production?.dispose(); report.dispose();
}
void readPacking2d;
const packing2dOptions: import("ospf-wasm/bpp2d").Bpp2dOptions = { backend: "scip", generators: ["blockLocal", "pattern"], reportLimit: 128 };
const packing2dJob = await new packing2d.Bpp2dColumnGeneration(client, packing2dOptions).solve(artifact);
console.log(packing2dJob.reportJson);
// 领域入口不接受任意定价回调或线性降级。 / Domain entry points reject arbitrary pricing callbacks and linear downgrades.
// @ts-expect-error
new packing2d.Bpp2dColumnGeneration(client, { backend: "scip", pricing() {} });
// @ts-expect-error
new packing2d.Bpp2dColumnGeneration(client, packing2dOptions).solveLinear(artifact);
const packing2dCount: import("ospf-wasm/bpp2d").CountDemand = { kind: "count", itemId: "a", count: 3n, upperBound: null };
// 精确件数不接受 number。 / Exact piece counts reject number.
// @ts-expect-error
packing2dCount.count = 3;

// BPP3D 源的需求保持 bigint，不开放未接入的领域策略或原生求解。 / BPP3D source demand remains bigint; unbound strategies and native solving stay unavailable.
const gantt = await import("ospf-wasm/gantt");
const activityProblem: import("ospf-wasm/gantt").Problem = { horizon: { start: "2026-01-01T00:00:00Z", end: "2026-01-02T00:00:00Z" }, costUnit: "kg",
    resources: [{ id: "machine", capacity: { value: 1, unit: "kg" }, unavailableTimes: [], capacities: [] }],
    activities: [{ id: "job", modes: [{ id: "run", durationSeconds: 3600n, starts: ["2026-01-01T01:00:00Z"],
        resources: [{ resource: "machine", quantity: { value: 1, unit: "kg" }, fromSeconds: 0n }], cost: { value: 2, unit: "kg" } }] }], dependencies: [] };
const activityContext = new gantt.ActivityContext(activityProblem);
const activitySummary: import("ospf-wasm/gantt").SourceSummary = activityContext.sourceSummary();
const activityReplay: import("ospf-wasm/gantt").Schedule = activityContext.replay({ selections: [{ task: "job", mode: "run", start: "2026-01-01T01:00:00Z" }] }).schedule;
const activityStrategy = new gantt.GanttActivitySolver(new HttpClient({ baseUrl: "http://127.0.0.1:1", token: "x" }), { backend: "scip" });
const activityReport: import("ospf-wasm/gantt").ExecutionSummary = gantt.ExecutionReport.fromJson(
    JSON.stringify({ sourceFingerprint: activityContext.toArtifact().fingerprint, problemStatus: "Feasible", terminationReason: "COMPLETED",
        objectiveValue: 2, solverModelOnly: false, schedule: activityReplay, failure: null }), activityContext.toArtifact()).summary();
activityContext.dispose();
void [activitySummary.choiceCount, activityReplay.cost.unit, activityStrategy, activityReport.hasSchedule];
const packing3d = await import("ospf-wasm/bpp3d");
const item3d: import("ospf-wasm/bpp3d").Item = { id: "a", name: "A", width: { value: 1, unit: "m" }, height: { value: 1, unit: "m" },
    depth: { value: 1, unit: "m" }, weight: { value: 1, unit: "kg" }, amount: 2n, orientations: ["upright"] };
// @ts-expect-error
item3d.amount = 2;
// @ts-expect-error
item3d.orientations = ["custom"];
const source3d = new packing3d.PackingContext({ items: [item3d], bins: [], initialLayers: [] });
const amount3d: bigint = source3d.problem().items[0].amount;
const assignment3d: import("ospf-wasm/bpp3d").Assignment = { binId: "bin", layerId: "layer" };
const plan3d: import("ospf-wasm/bpp3d").Packing = source3d.packLayers([assignment3d]);
console.log(plan3d.bins[0].placements[0].position.x.value);
console.log(amount3d, source3d.toArtifact()); source3d.dispose();
// @ts-expect-error
new packing3d.PackingContext({ items: [item3d], bins: [], initialLayers: [], strategy() {} });
