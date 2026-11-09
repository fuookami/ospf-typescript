import type {
    ConstraintProgrammingConstraint as ConstraintBinding, ConstraintProgrammingModel as ModelBinding,
    ConstraintProgrammingSnapshot as SnapshotBinding, IntegerDomain as DomainBinding,
    IntegerExpression as ExpressionBinding, ConstraintActivityReport as ActivityBinding,
    ConstraintProgrammingReport as ReportBinding,
    IntegerExpressions as ExpressionsBinding,
} from "ospf-wasm-bindings";
import type { ActivityOptions, ActivityStatus, ConstraintOptions, MipLoweringAnalysis, ModelArtifact } from "./base.js";
import type { AnalysisCandidateFunnel as CandidateFunnel, AnalysisFunnelOptions as CandidateFunnelOptions } from "ospf-wasm-bindings/protocol";
import { invoke, OspfError } from "./base.js";
import { rejectUnknownOptions } from "./core.js";
import { wasm } from "./runtime.js";

const minimumInteger = -(1n << 63n);
const maximumInteger = (1n << 63n) - 1n;

function integer(value: bigint): string {
    if (typeof value !== "bigint" || value < minimumInteger || value > maximumInteger) throw new OspfError("InvalidInput", "expected a bigint in the signed i64 range");
    return value.toString();
}

function integers(values: readonly bigint[] | BigInt64Array): BigInt64Array {
    for (const value of values) integer(value);
    return values instanceof BigInt64Array ? values : new BigInt64Array(values);
}

function state(value: number): number {
    if (!Number.isInteger(value) || value < -2147483648 || value > 2147483647) throw new OspfError("InvalidInput", "automaton states must be signed i32 integers");
    return value;
}

let wrapExpression: (value: ExpressionBinding) => IntegerExpression;
let readExpression: (value: IntegerExpression) => ExpressionBinding;
let wrapConstraint: (value: ConstraintBinding) => ConstraintProgrammingConstraint;
let readConstraint: (value: ConstraintProgrammingConstraint) => ConstraintBinding;
let wrapSnapshot: (value: SnapshotBinding) => ConstraintProgrammingSnapshot;
let readSnapshot: (value: ConstraintProgrammingSnapshot) => SnapshotBinding;
let wrapActivity: (value: ActivityBinding) => ConstraintActivityReport;
let readDomain: (value: IntegerDomain) => DomainBinding;

/** 独立精确整数域；加入模型时复制 / Independent exact integer domain, copied when registered in a model. */
export class IntegerDomain {
    private constructor(private value: DomainBinding | undefined) {}
    static range(lower: bigint, upper: bigint): IntegerDomain { return invoke(() => new IntegerDomain(wasm().IntegerDomain.range(integer(lower), integer(upper)))); }
    static values(values: readonly bigint[] | BigInt64Array): IntegerDomain { return invoke(() => new IntegerDomain(wasm().IntegerDomain.values(integers(values)))); }
    static boolean(): IntegerDomain { return invoke(() => new IntegerDomain(wasm().IntegerDomain.boolean())); }
    private raw(): DomainBinding {
        if (!this.value) throw new OspfError("Disposed", "integer domain has been disposed");
        return this.value;
    }
    lower(): bigint { return invoke(() => this.raw().lower()); }
    upper(): bigint { return invoke(() => this.raw().upper()); }
    cardinality(): bigint { return invoke(() => BigInt(this.raw().cardinality())); }
    contains(value: bigint): boolean { return invoke(() => this.raw().contains(integer(value))); }
    dispose(): void { this.value?.free(); this.value = undefined; }
    static { readDomain = value => value.raw(); }
}

/** 变量身份属于 builder；快照赋值使用自身的 canonical 顺序 / Variables belong to their builder; snapshots use their own canonical assignment order. */
export interface IntegerVariable {
    readonly index: number;
    readonly stableId: string;
    toExpression(): IntegerExpression;
}
export interface IntervalVariable { readonly index: number; readonly id: string; }
export type IntegerTerms = ReadonlyArray<readonly [IntegerVariable, bigint]>;
export type IntegerExpressionInput = IntegerVariable | IntegerExpression;
export interface BooleanLiteral { readonly variable: IntegerVariable; readonly negated?: boolean; }
export type BooleanOperation = "literal" | "and" | "or" | "xor" | "atMostOne" | "exactlyOne";
export type ReificationDirection = "equivalent" | "impliedByLiteral" | "impliesLiteral";
export interface IntervalOptions {
    id: string;
    start: IntegerExpression;
    duration: bigint | IntegerVariable;
    end: IntegerExpression;
    presence?: IntegerVariable | BooleanLiteral;
}
export interface CumulativeTask { readonly interval: IntervalVariable; readonly demand: bigint; }
export interface AutomatonTransition { readonly fromState: number; readonly value: bigint; readonly toState: number; }
export interface AutomatonOptions {
    readonly initialState: number;
    readonly finalStates: readonly number[] | Int32Array;
    readonly transitions: readonly AutomatonTransition[];
}
export interface ReservoirEvent { readonly time: IntegerExpressionInput; readonly levelChange: IntegerExpressionInput; }
export interface ReservoirOptions {
    readonly events: readonly ReservoirEvent[];
    readonly initialLevel: bigint;
    readonly minimumLevel: bigint;
    readonly maximumLevel: bigint;
}

/** ID 显式引用接收快照的稳定变量，不接受 builder 变量句柄 / IDs explicitly address stable variables in the receiving snapshot, not builder handles. */
export type ConstraintProgrammingAssumption =
    | { readonly kind: "literal"; readonly variableId: string; readonly negated?: boolean }
    | { readonly kind: "equal" | "lowerBound" | "upperBound"; readonly variableId: string; readonly value: bigint }
    | { readonly kind: "sparseDomain"; readonly variableId: string; readonly domain: IntegerDomain };

/** 精确整数仿射表达式，所有计算在 Rust / Exact integer affine expression with all computation in Rust. */
export class IntegerExpression {
    private constructor(private value: ExpressionBinding | undefined) {}
    static { wrapExpression = value => new IntegerExpression(value); readExpression = value => value.raw(); }
    private raw(): ExpressionBinding {
        if (!this.value) throw new OspfError("Disposed", "integer expression has been disposed");
        return this.value;
    }
    add(value: IntegerExpression | bigint): IntegerExpression {
        return invoke(() => wrapExpression(typeof value === "bigint" ? this.raw().offset(integer(value)) : this.raw().add(readExpression(value))));
    }
    mul(value: bigint): IntegerExpression { return invoke(() => wrapExpression(this.raw().mul(integer(value)))); }
    evaluate(values: readonly bigint[] | BigInt64Array): bigint { return invoke(() => this.raw().evaluate(integers(values))); }
    private compare(relation: string, rhs: bigint): ConstraintProgrammingConstraint { return invoke(() => wrapConstraint(this.raw().compare(relation, integer(rhs)))); }
    le(rhs: bigint): ConstraintProgrammingConstraint { return this.compare("le", rhs); }
    ge(rhs: bigint): ConstraintProgrammingConstraint { return this.compare("ge", rhs); }
    eq(rhs: bigint): ConstraintProgrammingConstraint { return this.compare("eq", rhs); }
    ne(rhs: bigint): ConstraintProgrammingConstraint { return this.compare("ne", rhs); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 关系是独立 AST 快照，但仍受 builder 的模型身份和释放规则约束 / Independent AST snapshot subject to builder ownership and disposal. */
export class ConstraintProgrammingConstraint {
    private constructor(private value: ConstraintBinding | undefined) {}
    static {
        wrapConstraint = value => new ConstraintProgrammingConstraint(value);
        readConstraint = value => {
            if (!value.value) throw new OspfError("Disposed", "CP constraint has been disposed");
            return value.value;
        };
    }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 真实 Rust 精确 CP builder，不是 f64 MetaModel 的别名 / Real Rust exact CP builder, not an alias of f64 MetaModel. */
export class ConstraintProgrammingModel {
    private value: ModelBinding | undefined;
    private readonly variables = new WeakSet<IntegerVariable>();
    private readonly intervals = new WeakSet<IntervalVariable>();
    constructor(readonly name: string, readonly identityNamespace = "model-local") {
        this.value = invoke(() => new (wasm().ConstraintProgrammingModel)(name, identityNamespace));
    }
    private raw(): ModelBinding {
        if (!this.value) throw new OspfError("Disposed", "CP model has been disposed");
        return this.value;
    }
    private index(variable: IntegerVariable): number {
        this.raw();
        if (!this.variables.has(variable)) throw new OspfError("InvalidReference", "CP variable belongs to another model");
        return variable.index;
    }
    private intervalIndex(interval: IntervalVariable): number {
        this.raw();
        if (!this.intervals.has(interval)) throw new OspfError("InvalidReference", "CP interval belongs to another model");
        return interval.index;
    }
    private literal(value: IntegerVariable | BooleanLiteral): { index: number; negated: boolean } {
        const literal = "variable" in value ? value : { variable: value };
        if (literal.negated !== undefined && typeof literal.negated !== "boolean") throw new OspfError("InvalidInput", "literal negation must be Boolean");
        return { index: this.index(literal.variable), negated: literal.negated ?? false };
    }
    private withExpression<T>(value: IntegerExpressionInput, operation: (expression: ExpressionBinding) => T): T {
        if (value instanceof IntegerExpression) return operation(readExpression(value));
        const expression = this.integerExpression([[value, 1n]]);
        try { return operation(readExpression(expression)); }
        finally { expression.dispose(); }
    }
    private withExpressions<T>(values: readonly IntegerExpressionInput[], operation: (expressions: ExpressionsBinding) => T): T {
        const expressions = this.raw().expressions();
        try {
            for (const value of values) this.withExpression(value, expression => expressions.push(expression));
            return operation(expressions);
        } finally { expressions.free(); }
    }
    addVariable(stableId: string, domain: IntegerDomain): IntegerVariable {
        const index = invoke(() => this.raw().addVariable(stableId, readDomain(domain)));
        const variable: IntegerVariable = Object.freeze({ index, stableId, toExpression: () => this.integerExpression([[variable, 1n]]) });
        this.variables.add(variable);
        return variable;
    }
    integerExpression(terms: IntegerTerms = [], constant = 0n): IntegerExpression {
        this.raw();
        const indices = new Uint32Array(terms.map(([variable]) => this.index(variable)));
        const coefficients = integers(terms.map(([, coefficient]) => coefficient));
        return invoke(() => wrapExpression(this.raw().expression(indices, coefficients, integer(constant))));
    }
    addConstraint(constraint: ConstraintProgrammingConstraint, options: ConstraintOptions): void {
        invoke(() => this.raw().addConstraint(readConstraint(constraint), JSON.stringify(options)));
    }
    setObjective(expression: IntegerExpression, category: "minimize" | "maximize" = "minimize", id = "objective"): void {
        if (category !== "minimize" && category !== "maximize") throw new OspfError("InvalidInput", "unknown objective category");
        invoke(() => this.raw().setObjective(readExpression(expression), id, category === "maximize"));
    }
    clearObjective(): void { invoke(() => this.raw().clearObjective()); }
    allDifferent(expressions: readonly IntegerExpressionInput[]): ConstraintProgrammingConstraint {
        return invoke(() => this.withExpressions(expressions, batch => wrapConstraint(this.raw().allDifferentExpressions(batch))));
    }
    booleanConstraint(operation: BooleanOperation, literals: readonly BooleanLiteral[]): ConstraintProgrammingConstraint {
        this.raw();
        const indices = new Uint32Array(literals.map(literal => this.index(literal.variable)));
        const negated = new Uint8Array(literals.map(literal => literal.negated ? 1 : 0));
        return invoke(() => wrapConstraint(this.raw().booleanConstraint(indices, negated, operation)));
    }
    implication(enforcement: IntegerVariable | BooleanLiteral, constraint: ConstraintProgrammingConstraint): ConstraintProgrammingConstraint {
        const literal = this.literal(enforcement);
        return invoke(() => wrapConstraint(this.raw().implication(literal.index, literal.negated, readConstraint(constraint))));
    }
    reification(literal: IntegerVariable | BooleanLiteral, constraint: ConstraintProgrammingConstraint, direction: ReificationDirection = "equivalent"): ConstraintProgrammingConstraint {
        const input = this.literal(literal);
        return invoke(() => wrapConstraint(this.raw().reification(input.index, input.negated, readConstraint(constraint), direction)));
    }
    element(input: { index: IntegerExpressionInput; values: readonly bigint[] | BigInt64Array; target: IntegerExpressionInput }): ConstraintProgrammingConstraint {
        return invoke(() => this.withExpression(input.index, index => this.withExpression(input.target, target => wrapConstraint(this.raw().element(index, integers(input.values), target)))));
    }
    private assignmentTable(expressions: readonly IntegerExpressionInput[], tuples: readonly (readonly bigint[] | BigInt64Array)[], allowed: boolean): ConstraintProgrammingConstraint {
        if (tuples.length > 1048576 || tuples.some(tuple => tuple.length !== expressions.length)) throw new OspfError("InvalidInput", "invalid CP table shape or row budget");
        const values = integers(tuples.flatMap(tuple => [...tuple]));
        return invoke(() => this.withExpressions(expressions, batch => wrapConstraint(this.raw().assignmentTable(batch, values, tuples.length, allowed))));
    }
    allowedAssignments(expressions: readonly IntegerExpressionInput[], tuples: readonly (readonly bigint[] | BigInt64Array)[]): ConstraintProgrammingConstraint {
        return this.assignmentTable(expressions, tuples, true);
    }
    forbiddenAssignments(expressions: readonly IntegerExpressionInput[], tuples: readonly (readonly bigint[] | BigInt64Array)[]): ConstraintProgrammingConstraint {
        return this.assignmentTable(expressions, tuples, false);
    }
    addInterval(input: IntervalOptions): IntervalVariable {
        // 命名选项在这里展开成位置参数，未知字段必须拒绝；否则拼错 presence 会让可选区间静默变成必选。
        // Named options expand into positional arguments here, so unknown fields must be rejected; otherwise a
        // misspelled `presence` silently turns an optional interval into a mandatory one.
        rejectUnknownOptions(input, ["id", "start", "end", "duration", "presence"], "interval");
        const presence = input.presence === undefined ? undefined : this.literal(input.presence);
        let duration: number | undefined;
        let fixed: string;
        if (typeof input.duration === "bigint") fixed = integer(input.duration);
        else {
            if (typeof input.duration !== "object" || input.duration === null) throw new OspfError("InvalidInput", "duration must be a bigint or an owned integer variable");
            duration = this.index(input.duration);
            fixed = "";
        }
        const index = invoke(() => this.raw().addGeneralInterval(input.id, readExpression(input.start), fixed, duration, readExpression(input.end), presence?.index, presence?.negated ?? false));
        const interval = Object.freeze({ index, id: input.id });
        this.intervals.add(interval);
        return interval;
    }
    noOverlap(intervals: readonly IntervalVariable[]): ConstraintProgrammingConstraint {
        this.raw();
        const indices = new Uint32Array(intervals.map(interval => this.intervalIndex(interval)));
        return invoke(() => wrapConstraint(this.raw().noOverlap(indices)));
    }
    cumulative(tasks: readonly CumulativeTask[], capacity: bigint): ConstraintProgrammingConstraint {
        const indices = new Uint32Array(tasks.map(task => this.intervalIndex(task.interval)));
        const demands = integers(tasks.map(task => task.demand));
        return invoke(() => wrapConstraint(this.raw().cumulative(indices, demands, integer(capacity))));
    }
    circuit(successors: readonly IntegerExpressionInput[]): ConstraintProgrammingConstraint {
        return invoke(() => this.withExpressions(successors, batch => wrapConstraint(this.raw().circuit(batch))));
    }
    automaton(expressions: readonly IntegerExpressionInput[], options: AutomatonOptions): ConstraintProgrammingConstraint {
        const initial = state(options.initialState), final = new Int32Array([...options.finalStates].map(state));
        const from = new Int32Array(options.transitions.map(transition => state(transition.fromState)));
        const to = new Int32Array(options.transitions.map(transition => state(transition.toState)));
        const values = integers(options.transitions.map(transition => transition.value));
        return invoke(() => this.withExpressions(expressions, batch => wrapConstraint(this.raw().automaton(batch, initial, final, from, values, to))));
    }
    reservoir(options: ReservoirOptions): ConstraintProgrammingConstraint {
        return invoke(() => this.withExpressions(options.events.map(event => event.time), times =>
            this.withExpressions(options.events.map(event => event.levelChange), changes =>
                wrapConstraint(this.raw().reservoir(times, changes, integer(options.initialLevel), integer(options.minimumLevel), integer(options.maximumLevel))))));
    }
    freeze(): ConstraintProgrammingSnapshot { return invoke(() => wrapSnapshot(this.raw().freeze())); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 独立不可变快照；builder 释放或修改后仍有效 / Independent immutable snapshot, valid after builder mutation or disposal. */
export class ConstraintProgrammingSnapshot {
    private constructor(private value: SnapshotBinding | undefined) {}
    static { wrapSnapshot = value => new ConstraintProgrammingSnapshot(value); readSnapshot = value => value.raw(); }
    private raw(): SnapshotBinding {
        if (!this.value) throw new OspfError("Disposed", "CP snapshot has been disposed");
        return this.value;
    }
    static fromJson(json: string): ConstraintProgrammingSnapshot { return invoke(() => wrapSnapshot(wasm().ConstraintProgrammingSnapshot.fromJson(json))); }
    static fromArtifact(artifact: ModelArtifact): ConstraintProgrammingSnapshot { return invoke(() => wrapSnapshot(wasm().ConstraintProgrammingSnapshot.fromArtifact(JSON.stringify(artifact)))); }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    toArtifact(): ModelArtifact { return invoke(() => JSON.parse(this.raw().toArtifact()) as ModelArtifact); }
    fingerprint(): string { return invoke(() => this.raw().fingerprint()); }
    variableIds(): string[] { return invoke(() => this.raw().variableIds()); }
    /** 复制并收紧快照；不创建持久求解会话，不修改源对象 / Copy and restrict a snapshot; no persistent solve session or source mutation. */
    withAssumptions(assumptions: readonly ConstraintProgrammingAssumption[]): ConstraintProgrammingSnapshot {
        return invoke(() => {
            const batch = this.raw().assumptions();
            try {
                for (const assumption of assumptions) {
                    if (typeof assumption.variableId !== "string") throw new OspfError("InvalidInput", "assumption variableId must be a snapshot stable-ID string");
                    switch (assumption.kind) {
                        case "literal":
                            if (assumption.negated !== undefined && typeof assumption.negated !== "boolean") throw new OspfError("InvalidInput", "literal negation must be boolean");
                            batch.literal(assumption.variableId, assumption.negated ?? false);
                            break;
                        case "equal": batch.equal(assumption.variableId, integer(assumption.value)); break;
                        case "lowerBound": batch.lowerBound(assumption.variableId, integer(assumption.value)); break;
                        case "upperBound": batch.upperBound(assumption.variableId, integer(assumption.value)); break;
                        case "sparseDomain": batch.sparseDomain(assumption.variableId, readDomain(assumption.domain)); break;
                        default: throw new OspfError("InvalidInput", "unsupported CP assumption kind");
                    }
                }
                return wrapSnapshot(batch.freeze());
            } finally { batch.free(); }
        });
    }
    /** 同步完整降维预检，使用 core 默认预算；不是求解或可行性分析 / Synchronous whole-model lowering using core default budgets, not solving or feasibility analysis. */
    analyzeMipLowering(): MipLoweringAnalysis { return invoke(() => JSON.parse(this.raw().analyzeMipLowering()) as MipLoweringAnalysis); }
    validateAssignment(values: readonly bigint[] | BigInt64Array): void { invoke(() => this.raw().validateAssignment(integers(values))); }
    objectiveValue(values: readonly bigint[] | BigInt64Array): bigint | undefined { return invoke(() => this.raw().objectiveValue(integers(values))); }
    intervalValuesJson(values: readonly bigint[] | BigInt64Array): string { return invoke(() => this.raw().intervalValuesJson(integers(values))); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 精确原生 CP 统一报告，导入时在 Rust 复验源模型 / Exact native CP unified report, source-verified in Rust on import. */
export class ConstraintProgrammingReport {
    private constructor(private binding: ReportBinding | undefined) {}
    private raw(): ReportBinding {
        if (!this.binding) throw new OspfError("Disposed", "CP report has been disposed");
        return this.binding;
    }
    static fromJson(json: string, snapshot: ConstraintProgrammingSnapshot): ConstraintProgrammingReport {
        return invoke(() => new ConstraintProgrammingReport(wasm().ConstraintProgrammingReport.fromJson(json, readSnapshot(snapshot))));
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    variableIds(): string[] { return invoke(() => this.raw().variableIds()); }
    values(): BigInt64Array { return invoke(() => this.raw().values()); }
    value(stableId: string): bigint | undefined { return invoke(() => this.raw().value(stableId)); }
    objectiveValue(): bigint | undefined { return invoke(() => this.raw().objectiveValue()); }
    bestBound(): bigint | undefined { return invoke(() => this.raw().bestBound()); }
    hasSolution(): boolean { return invoke(() => this.raw().hasSolution()); }
    diagnosticExtension(key: string): string | undefined { return invoke(() => this.raw().diagnosticExtension(key)); }
    diagnosticIssueCodes(): string[] { return invoke(() => this.raw().diagnosticIssueCodes()); }
    /** 原始统一证据文本；是否可用、完整或最小以证据自身标记为准 / Raw unified evidence text; availability, completeness and minimality follow its own markers. */
    infeasibilityEvidenceJson(): string | undefined { return invoke(() => this.raw().infeasibilityEvidenceJson()); }
    problemStatus(): string { return invoke(() => this.raw().problemStatus()); }
    terminationReason(): string { return invoke(() => this.raw().terminationReason()); }
    dispose(): void { this.binding?.free(); this.binding = undefined; }
}

/** 保留精确整数证据的活动性报告；slack 仍为 core 的 f64 指标 / Activity report retaining exact integer evidence; slack remains a core f64 metric. */
export class ConstraintActivityReport {
    private constructor(private value: ActivityBinding | undefined) {}
    /** 候选漏斗：把大量约束压成按优先级排序的短名单；此处无对偶证据，只会出现 Tier C 与 Unclassified / Candidate funnel reducing many constraints to a priority-ordered shortlist; without dual evidence only Tier C and Unclassified can appear. */
    candidateFunnel(options: CandidateFunnelOptions = {}): CandidateFunnel {
        return invoke(() => JSON.parse(this.raw().candidateFunnel(JSON.stringify(options))) as CandidateFunnel);
    }
    static { wrapActivity = value => new ConstraintActivityReport(value); }
    private raw(): ActivityBinding {
        if (!this.value) throw new OspfError("Disposed", "activity report has been disposed");
        return this.value;
    }
    static fromJson(json: string): ConstraintActivityReport { return invoke(() => wrapActivity(wasm().ConstraintActivityReport.fromJson(json))); }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    constraintIds(): string[] { return invoke(() => this.raw().constraintIds()); }
    status(id: string): ActivityStatus { return invoke(() => this.raw().status(id) as ActivityStatus); }
    slack(id: string): number | undefined { return invoke(() => this.raw().slack(id)); }
    satisfied(id: string): boolean | undefined { return invoke(() => this.raw().satisfied(id)); }
    integerLhs(id: string): bigint | undefined { return invoke(() => this.raw().integerLhs(id)); }
    integerRhs(id: string): bigint | undefined { return invoke(() => this.raw().integerRhs(id)); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 可移植的原始约束活动性分析，不是 IIS、冲突提取或再求解 / Portable source-constraint activity analysis, not IIS, conflict extraction or re-solving. */
export class ConstraintActivityAnalyzer {
    constructor(readonly options: ActivityOptions = {}) {}
    private config(): string {
        for (const value of [this.options.tolerance, this.options.nearlyActiveTolerance, this.options.relativeTolerance]) {
            if (value !== undefined && !Number.isFinite(value)) throw new OspfError("InvalidInput", "activity tolerances must be finite");
        }
        return JSON.stringify(this.options);
    }
    analyzeCp(snapshot: ConstraintProgrammingSnapshot, values: readonly bigint[] | BigInt64Array): ConstraintActivityReport {
        return invoke(() => wrapActivity(wasm().ConstraintActivityReport.analyzeCp(readSnapshot(snapshot), integers(values), this.config())));
    }
    analyzeLinear(model: ModelArtifact, values: Float64Array): ConstraintActivityReport {
        return invoke(() => wrapActivity(wasm().ConstraintActivityReport.analyzeLinear(JSON.stringify(model), values, this.config())));
    }
}
