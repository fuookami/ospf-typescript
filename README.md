# ospf-wasm

English | [简体中文](README_ch.md)

## Responsibility

This independent TypeScript SDK repository publishes **`ospf-wasm`**. The Rust repository owns computations, modeling, codecs, wasm-bindgen/N-API bindings and native execution. The SDK owns public APIs, module loading, HTTP transport and integration tests, without reimplementing algorithms.

This is an initial 0.1 implementation, not full library coverage. Available APIs include errors/protocol types, Decimal/Rational, row-major arrays, selected runtime quantities, linear/quadratic MetaModel modeling and exchange, Token/LinearExpressionSymbol/QuadraticExpressionSymbol handles, exact CP constraint factories/snapshots/activity analysis, a candidate funnel that priority-ranks and groups constraints while assigning only Tier C/Unclassified (no dual evidence is exposed), and native Gurobi/SCIP LP/MIP/QP/MIQP/QCP/conditional CP facades. Default-rule BPP1D and CSP1D calculations, native execution and report readers, plus BPP2D native execution and source/report validation and CSP2D native execution and source/column/report validation, are available through separate subpaths. BPP3D exposes cuboid and axis-aware cylinder source validation, physical plan replay, bounded one-round native execution over HTTP/Node and a Rust report reader for its versioned execution report; cylinders accept discrete `radius_candidates` (`min`/`max`/`step`) that drive the original circle-packing layer generator; sources also accept a `package_attributes` subset (`allow_mixed_loading`, `max_stack_layers`, `tags`) and an optional continuous-radius `objective` policy (`none` or a weighted `minimizeRadiusSquared`); execution reports also surface the original flow's `continuous_radius_*` entries through `ExecutionReport.continuousRadius()`; it also accepts a `radiusComponent` declaration (prototypes with unit-bearing bounds plus business weight functions), so the final model registers real radius, radius-squared and PWL variables, while a missing weight function or zero coefficient fails at the boundary. Gantt activity scheduling exposes finite-candidate source validation, explicit-plan replay against the native rules, native single-MILP execution over HTTP/Node and a source-bound execution-report reader. Shared BPP sparse loading accepts optional per-position 1D intervals or 2D rectangles (never both) and derives conflict edges for strict same-space overlaps only, using the original 2D discrete-loading factory for rectangles (touching edges and separate spaces create none); it also exposes portable default-rule modeling, solution validation and native linear report reading through `ospf-wasm/bpp`; the original ordinary-MILP application and typed minimizing costs are also available, with continuous-resource Benders as well; partition lifecycle primitives are available; the original native root-partition application is available separately; branch-and-price remains unbound. Other domain frameworks, advanced CP sessions and other symbol specializations are not yet bound.

## Usage

Native serial/parallel linear framework composition and source-bound aggregate report reading are also available through `ospf-wasm/framework`; fixed-continuous-recourse Benders is available as a native strategy; a source-projected column-generation strategy is also available; other Benders variants and full domain workflows remain unbound.

Node 22+, ESM only. The main entry selects browser or Node loading automatically.

```typescript
import { initialize, MetaModel, HttpClient, SCIPSolver, summarizeReport } from 'ospf-wasm';

await initialize();
const model = new MetaModel('example');
const x = model.addVariable('x', { lowerBound: 0, upperBound: 10 });
model.setLinearObjective([[x, 1]], 'maximize');
model.addLinearConstraint({ name: 'capacity', terms: [[x, 1]], relation: 'le', rhs: 4 });
const client = new HttpClient({ baseUrl: 'http://127.0.0.1:8787', token: '<host credential>' });
const result = await new SCIPSolver(client).solveLinear(model.toLinearTriadModel());
console.log(summarizeReport(result.reportJson!));
await client.release(result.id);
model.dispose();
```

For local Node execution, install the exact optional `ospf-node-bindings` package and create `NodeClient` from `ospf-wasm/native`. No automatic HTTP fallback occurs. Browser WASM cannot load native Gurobi/SCIP DLLs.

The SCIP shared runtime loaded by Node or the HTTP host must exactly match the SCIP headers used to build that native executable or binding, including the patch version. A loaded version mismatch fails with `ENVIRONMENT` before solving; a missing or incompatible library can fail during loading. Reported capabilities describe compiled features, not runtime availability.

## Public API and Boundaries

`model.linearExpression([[x, 2]], 3)` and `x.toLinear()` create immutable Rust `Linear` objects. Use `add/sub` with another same-model expression or a number, `mul(number)` for scaling, and `neg`. `le/ge/eq` capture a `LinearInequality` snapshot; register it with `model.addInequality(relation, name)`. `setLinearObjective` accepts either the existing term array or a `Linear`. Dispose every result. Arithmetic, simplification, constant normalization and evaluation run in Rust, not TypeScript.

`linear.mul(otherLinear)` returns a Rust `Quadratic`; `linear.toQuadratic()` promotes without changing its value. Quadratic `add/sub` accept a same-model Quadratic/Linear or number; `mul/neg` scale only. `linearCoefficients()` returns a dense copy, while `quadraticTerms()` returns sorted copied TypedArrays (`rows`, `columns`, `coefficients`), each encoding `coefficient*x[row]*x[column]` once, not a Hessian or an implicitly doubled symmetric matrix. `evaluate` uses the full current variable order. `tryToLinear` rejects remaining quadratic terms instead of discarding them. No cubic/quartic promotion is implied.

Quadratic `le/ge/eq` produce snapshots registered by `addInequality`. `setQuadraticObjective` accepts Quadratic/Linear, and `toQuadraticTetradModel()` exports a lossless artifact for `solveQuadratic()`. Constraints register in Rust MetaModel; the objective's Q is applied at the Rust tetrad compilation boundary, without changing core's generic linear sub-objective contract. Replacing the objective with `setLinearObjective` clears Q. Linear export rejects quadratic constraints or nonzero Q rather than dropping them. The codec checks round-trip fingerprints and rejects metadata it cannot preserve. Nonzero objective constants remain unsupported.

Ordinary linear and quadratic exports additionally verify actual solver variable types, which are not covered by the core fingerprint, and reject unsupported loss rather than returning an invalid artifact. Raw Rust quadratic models with nonzero constraint polynomial constants are rejected because shifting them can round them away; WASM relations normalize constants before registration. Explicit compiled-linear child-model paths use a separate codec; there is no automatic fallback.

```typescript
const qmodel = new MetaModel('qcp');
const qx = qmodel.addVariable('x', { lowerBound: 0, upperBound: 10 });
const qlinear = qx.toLinear();
const square = qlinear.mul(qlinear);
const qcapacity = square.le(4);
qmodel.addInequality(qcapacity, 'quadratic-capacity');
qmodel.setQuadraticObjective(qlinear, 'maximize');
const qresult = await new SCIPSolver(client).solveQuadratic(qmodel.toQuadraticTetradModel());
console.log(summarizeReport(qresult.reportJson!)); // x approximately 2
await client.release(qresult.id);
for (const value of [qlinear, square, qcapacity, qmodel]) value.dispose();
```

SCIP quadratic execution requires native `scip-quadratic` plus its linking/runtime feature; Gurobi uses its selected version feature. `solveQuadratic` checks the host's `quadratic` capability before explicitly sending `modelKind: 'quadratic'`. Older linear-only hosts are rejected, not silently downgraded. Progress, cancellation and report handling share the linear lifecycle. All real solving stays native, including browser HTTP calls.

Both Rust and the SDK enforce model ownership. Disposing the model invalidates its expressions and relations; disposing the original expression does not invalidate captured or registered constraints. `evaluate(Float64Array)` requires all current variables in model order, including later additions. Nonzero objective constants remain explicitly `Unsupported` because the current exchange model cannot retain them.

`x.token()` and `model.tokens()` return independent handles into the persistent Rust MetaModel. Token `id()` is a stable bigint within that model/instance, not a portable HTTP identity. `model.addLinearSymbol(name, expression)` and `model.addQuadraticSymbol(name, expression)` register real Rust linear and quadratic expression symbols. Their `toLinear()` and `toQuadratic()` methods preserve the current symbol as a direct dependency for subsequent registration, and `dependencyIds()` returns a BigUint64Array copy. Both share one name namespace and evaluate in Rust. Disposing a symbol handle does not unregister it; duplicate names and cross-model references are rejected.

`model.setVariableRange(x, { lowerBound, upperBound })` replaces the bounds while retaining the token identity and already-exported artifacts. Omitted continuous/integer endpoints are unbounded; omitted binary endpoints default to 0/1. Integer bounds use the exact f64 range. Variable creation and range updates reject null or non-number bounds instead of coercing them. Success clears explicit assignments, while invalid ranges and cross-model references leave them unchanged.

`model.setSolution(Float64Array)` binds an explicit assignment after shape, finite-value, bound and integrality checks; it is not a feasibility or optimality certificate. Invalid assignments preserve previous values; successful structural changes clear them. Token `result()` and symbol `evaluateSolution()` return undefined when their required assignment is absent. `clearSolution()` removes assignments explicitly. Dispose each handle separately; disposing the model invalidates all associated handles.

Subpaths: `base`, `math`, `multiarray`, `quantities`, `core`, `framework`, `bpp`, `bpp1d`, `bpp2d`, `bpp3d`, `csp1d`, `csp2d`, `gantt`, `geometry2d`, and Node-only `native`. Decimal/Rational accept lossless strings or bigint and support exact add/subtract/multiply/negate/compare/zero tests; `Rational` also divides exactly and rejects a zero divisor, while `Decimal` division stays unexposed because it is generally inexact. Arrays copy TypedArray data and expose `shape()`, 2D `matmul`, 1D `dot`, 2D `transpose` and square `trace` through the original Rust einsum kernel, `sumAll`, `sumAxis`, `sumAxes` and `cumsumAxis` through the original FastSum kernel, plus 1D `outer`, general axis `contract` (delegating to the original generic einsum engine and cross-checked against `matmul` and `dot`) and `reshape` (original truncate/zero-fill semantics); mismatched dimensions and axes are rejected at the boundary. Runtime units currently include m/km/cm/dm/mm, in/ft/yd, their square units (including dm^2), s/min/h and kg/g/t/lb; quantities add, subtract and compare within one dimension, scale by a dimensionless factor, multiply and divide with dimensions merged through the original unit algebra, and reject cross-dimension comparisons instead of comparing raw numbers; a merged unit may have no vocabulary entry, so `symbol()` can be empty and `dimension()` is authoritative. Variables belong to their owning model. Named options that expand into positional arguments (variable ranges and CP intervals) reject unknown fields, and unknown variable options are rejected instead of being silently ignored. A nonzero `mipGap` tuning value can really stop SCIP early: with a 0.99 limit the solver terminates with `GAP_LIMIT`, a remaining gap and no optimality proof. MetaModel integers use the exact f64 range; the separate CP API uses exact signed i64.

### Exact CP Snapshots

```typescript
import { ConstraintProgrammingModel, IntegerDomain, ConstraintActivityAnalyzer } from 'ospf-wasm/core';
const cp = new ConstraintProgrammingModel('exact', 'example');
const domain = IntegerDomain.range(9007199254740993n, 9007199254740999n);
const x = cp.addVariable('x', domain);
const expression = x.toExpression();
const limit = expression.le(9007199254740995n);
cp.addConstraint(limit, { id: 'capacity' });
cp.setObjective(expression);
const snapshot = cp.freeze();
cp.dispose(); // independent snapshot remains valid
console.log(snapshot.variableIds()); // canonical stable-ID order, not registration order
snapshot.validateAssignment([9007199254740993n]);
const report = new ConstraintActivityAnalyzer().analyzeCp(snapshot, [9007199254740996n]);
console.log(report.status('capacity'), report.integerLhs('capacity')); // VIOLATED, exact bigint
const canonicalText = snapshot.toJson(); // retain as text; never JSON.parse/re-encode
for (const value of [domain, expression, limit, snapshot, report]) value.dispose();
```

Initialize WASM before using the CP API. The builder reuses real Rust AST/validation and preserves its previous state on failed registration. Factories cover the current core AST constraint families: integer affine relations, Boolean combinations, implication/reification, expression all-different, Element, allowed/forbidden tables, no-overlap, Cumulative, Circuit, Automaton and Reservoir. This is not every public core operation or unrestricted solver support. Native CP solving uses the conditional exact-lowering entry described below. Domains preserve sparse values, i64 min/max and bigint cardinality. Inputs use bigint or BigInt64Array; ordinary bigint arrays are range-checked before conversion. Values already wrapped in caller-created BigInt64Array cannot be recovered. Expression evaluation follows builder registration order; snapshot methods follow `variableIds()` order. `intervalValuesJson` validates assignments, omits absent intervals and keeps exact interval values in text.

Snapshots survive source builder mutation/disposal; expressions and constraints do not. Canonical imports validate schema, identity, fingerprint and digest; artifact imports also check the outer fingerprint. Activity reports are independently owned and schema-validated. `analyzeLinear` accepts a fingerprint-checked linear artifact and Float64Array candidate. Integer evidence getters preserve exact bigint, but slack, normalized and bound metrics remain core f64. Activity analysis is not IIS, conflict extraction, sensitivity or re-solving. AST import/factory coverage is not a promise of unrestricted CP solver support.

`allDifferent`, table columns, Circuit and Automaton accept variables or integer expressions. `element({ index, values, target })` keeps exact constant values and requires the entire index domain to fit. `implication(literal, constraint)` and `reification(literal, constraint, direction)` capture the consequent AST; directions are `equivalent`, `impliedByLiteral`, `impliesLiteral`. A literal is a variable or `{ variable, negated }`. Table rows retain zero-column semantics and must match column width, with at most 1,048,576 rows at the binding boundary. Native lowering has its own smaller budgets. Temporary expression batches are freed internally on both success and failure.

`addInterval({ id, start, duration, end, presence })` accepts a bigint or owned nonnegative integer variable as duration, and an optional positive/negative literal as presence. Use `IntegerDomain.boolean()` for presence variables. `cumulative(tasks, capacity)` uses `{ interval, demand }` tasks with fixed bigint demands/capacity. `automaton(expressions, options)` accepts signed i32 state numbers and exact bigint transition labels; numbers are checked before Int32Array creation (already-wrapped caller arrays cannot be repaired). `reservoir({ events, initialLevel, minimumLevel, maximumLevel })` accepts `{ time, levelChange }` expressions and aggregates simultaneous changes in Rust.

```typescript
const global = new ConstraintProgrammingModel('element-and-reification');
const indexDomain = IntegerDomain.boolean();
const valueDomain = IntegerDomain.values([2n, 4n]);
const index = global.addVariable('index', indexDomain);
const value = global.addVariable('value', valueDomain);
const output = value.toExpression();
const selected = output.eq(4n);
const element = global.element({ index, values: [2n, 4n], target: value });
const reified = global.reification(index, selected);
global.addConstraint(element, { id: 'element' });
global.addConstraint(reified, { id: 'reification' });
const globalSnapshot = global.freeze();
globalSnapshot.validateAssignment([1n, 4n]); // variableIds(): index, value
for (const object of [indexDomain, valueDomain, output, selected, element, reified, globalSnapshot, global]) object.dispose();
```

Model/report JSON remains opaque text across transports. `summarizeReport` validates reports in Rust and returns `hasOptimalityProof`, `relativeGap`, `absoluteGap`, `nodes` and `solveTimeMs` alongside the objective and values, so callers judge the strength of the conclusion instead of inferring it. Explicitly `dispose()` WASM objects and `release(id)` terminal native jobs. An `AbortSignal` checked before submission prevents a new job, including when it is aborted during a successful capability lookup; it does not interrupt that lookup itself. Once a job ID is received, cancellation wakes the poll delay and requests cooperative backend cancellation before the next status request, then waits for the actual report. It does not interrupt an in-flight transport request. If the cancellation response is already terminal, the SDK validates its job identity and fingerprint and uses it without an extra poll; a running response can deliver new progress. Errors after the job ID is received retain `jobId` for recovery. If a submission response is lost, the job may have started without the client knowing its ID; the current host has no job-list or idempotent-submission endpoint. Each Worker initializes its own WASM instance.

### Native CP Solving

Immutable assumption snapshots and default MIP-lowering preflight are available after WASM initialization:

```typescript
const assumptionModel = new ConstraintProgrammingModel('assumptions');
const assumptionDomain = IntegerDomain.range(0n, 4n);
assumptionModel.addVariable('x', assumptionDomain);
const baseSnapshot = assumptionModel.freeze();
const restricted = baseSnapshot.withAssumptions([
    { kind: 'lowerBound', variableId: 'x', value: 2n },
    { kind: 'upperBound', variableId: 'x', value: 3n },
]);
const analysis = restricted.analyzeMipLowering();
if (analysis.status === 'lowered') console.log(analysis.fingerprint, analysis.generatedConstraints);
if (analysis.status === 'inexact') console.log(analysis.field, analysis.value); // lossless text
// Submit restricted.toArtifact(); import its report using restricted, not baseSnapshot.
for (const object of [restricted, baseSnapshot, assumptionDomain, assumptionModel]) object.dispose();
```

`withAssumptions` also supports `equal`, `literal` (optional `negated`) and `sparseDomain` (an `IntegerDomain`). IDs explicitly address stable variables in the receiving snapshot; builder handles are not accepted. The source remains unchanged; the derived object survives source disposal. Rust validates duplicate identities, domains and values with the existing core implementation. Contradictory but individually valid assumptions form an infeasible model. This does not create an incremental session or assumption-aware conflict diagnostic.

`analyzeMipLowering` synchronously constructs and drops the complete execution MIP under core defaults. A nonzero objective constant contributes a fixed auxiliary column to its statistics and budgets. The Rust-generated `MipLoweringAnalysis` type distinguishes `lowered`, `unsupported`, `inexact`, `budgetExceeded` and `invalid`. Only the first lowering failure is returned. No solver is invoked; success is not a feasibility proof, backend support/readiness check or solve guarantee. Preflight has no cancellation/custom-budget option; Cumulative remains disabled by default.

After initialization, use an explicit HTTP or Node client. Native backend descriptors must advertise `cpExactLowering`; the SDK sends `modelKind: 'cp'` and never silently submits it as linear.

```typescript
import { SCIPSolver, HttpClient } from 'ospf-wasm';
import { ConstraintProgrammingModel, ConstraintProgrammingReport, IntegerDomain } from 'ospf-wasm/core';
const model = new ConstraintProgrammingModel('native-cp');
const domain = IntegerDomain.range(0n, 4n);
const x = model.addVariable('x', domain);
const objective = x.toExpression();
model.setObjective(objective, 'maximize');
const snapshot = model.freeze();
const client = new HttpClient({ baseUrl: 'http://127.0.0.1:8787', token: '<host credential>' });
const job = await new SCIPSolver(client).solveConstraintProgramming(snapshot.toArtifact());
const report = ConstraintProgrammingReport.fromJson(job.reportJson!, snapshot);
console.log(report.problemStatus(), report.values(), report.objectiveValue()); // FEASIBLE, BigInt64Array [4n], 4n
await client.release(job.id);
for (const value of [model, domain, objective, snapshot, report]) value.dispose();
```

`GurobiSolver` exposes the same method. Both backends reuse Rust's conditional strict finite MIP lowering, not native CP engines. Full i64 snapshot support does not mean every i64 model is solvable through a floating MIP backend. Unsupported constructs, inexact conversion and core lowering-budget limits fail explicitly (`UNSUPPORTED` / `NUMERICAL`); no rounding or constraint dropping occurs. CP objective constants are retained, unlike the current MetaModel exchange limitation. Time limits cover backend solving, not an interruptible deadline for codec/lowering. Persistent sessions, native assumption parameters, assumption-conflict shrinking and custom lowering budgets remain unbound; assumption-restricted snapshots can be submitted as ordinary CP models.

For a nonzero CP objective constant, execution includes a fixed auxiliary column so backend objectives, bounds, gaps and progress include it; that column is absent from the source report. For every objective, including zero-constant objectives, the absolute constant plus the sum of absolute coefficient/domain bounds must fit within `2^53`, a conservative check that may reject cancelling terms. Against a host without `cpObjectiveConstant`, the SDK uses the initialized WASM codec to reject nonzero constants and runs the complete current default-budget MIP preflight before submitting zero-constant snapshots. This synchronous preflight can also reject unsupported or over-budget models and cannot be interrupted. Old SDK versions do not enforce this check.

New native runtimes advertise `intermediateProgress` for compiled SCIP and Gurobi. Direct solver jobs can publish intermediate snapshots with indeterminate percentage, throttled to 100 ms by default; they may include an incumbent, bound and gap when available. The final report remains authoritative. Older hosts without the capability do not promise intermediate snapshots. Polling observes only the latest snapshot, so short solves and individual iterations can be missed.

CP-specific `ConstraintProgrammingSolveOptions` add `nodeLimit`, `solutionLimit`, `solutionHint` and `requestConflict`. Limits are unsigned 32-bit integers; zero returns core's immediate NODE_LIMIT/SOLUTION_LIMIT report without searching. A complete feasible hint may then supply an incumbent, which is not a backend-solving claim. Hints use `ReadonlyMap<string, bigint>` with snapshot stable IDs; Rust-generated DTOs carry canonical decimal i64 text (maximum 100000 entries), rejecting duplicates/invalid encoding. Core validates domains/IDs and source feasibility of complete hints; partial hints initialize source variables only, not generated auxiliaries. Backend adoption is not guaranteed.

For example, pass `{ nodeLimit: 10000, solutionHint: new Map([['x', 2n]]), requestConflict: true }` to the existing native CP call. Explicit CP configuration requires the host's additional `cpSolveOptions` capability; older hosts are rejected before submission, without silently dropping settings. The default path omits `cpOptions` entirely.

`requestConflict` requests whole-submitted-model evidence through Rust core. It is not IIS or assumption-aware conflict shrinking and does not promise irreducibility. Verified-proof gates and authoritative-evidence preservation remain in core; missing proof produces UNAVAILABLE diagnostics. Read original evidence using `report.infeasibilityEvidenceJson()`, issue codes using `diagnosticIssueCodes()` and string extensions using `diagnosticExtension(key)`, without parsing the full exact-numeric report.

Circuit, Automaton and Reservoir currently remain unsupported by native lowering, despite WASM factory/source-validation support. Cumulative lowering stays disabled under core defaults. Neither HTTP nor N-API silently enables or ignores those constraints. Element, tables, reification and variable-duration/negated-presence intervals have real SCIP/Gurobi acceptance tests.

Reports remain raw `SolveReport<i64>` text. Import checks source fingerprint, canonical/stable assignment, original feasibility and exact objective in Rust, not an independent proof of optimality. Use `ConstraintProgrammingReport` for exact values/objective/bound rather than the f64-oriented `summarizeReport`. It owns independent data, returns copied BigInt64Array values and survives snapshot disposal. Infeasibility, limits and cancellation retain unified-report semantics; polling/progress/AbortSignal/release follow the existing job lifecycle.

## Native Serial Framework Orchestration

Use an explicitly configured HTTP or Node client to invoke Rust's existing `SerialCombinatorialLinearSolver`. This example assumes WASM is initialized and `client` has been created:

```typescript
import { MetaModel } from 'ospf-wasm/core';
import { CombinatorialReport, SerialCombinatorialLinearSolver } from 'ospf-wasm/framework';
const model = new MetaModel('serial-example');
const x = model.addVariable('x', { type: 'binary' });
model.setLinearObjective([[x, 1]], 'maximize');
const artifact = model.toLinearTriadModel();
model.dispose();
const solver = new SerialCombinatorialLinearSolver(client, {
    backends: ['scip'], // Or explicitly ['scip', 'gurobi']; both must be compiled.
    fallbackPolicy: 'stopOnCertifiedTerminal',
});
const job = await solver.solveLinear(artifact);
const aggregate = CombinatorialReport.fromJson(job.reportJson!, artifact);
console.log(aggregate.summary(), aggregate.selectedAttemptId(), aggregate.selectionReason());
for (const id of aggregate.attemptIds()) console.log(aggregate.attemptJson(id));
await client.release(job.id);
aggregate.dispose();
```

Configuration types are Rust-generated; the explicit backend order is nonempty, distinct and independently copied. The host must advertise serial-linear/serialLinear support. The default stops at the first incumbent or certified mathematical terminal. continueOnTerminal continues after certified infeasibility/unboundedness, but an incumbent, cancellation, interruption or timeout still stops the chain. Time limits apply per backend solve, not as an end-to-end workflow deadline. Progress is the latest child snapshot, not overall percentage; polling/cancellation/release and the bounded single-active-job executor remain unchanged.

This entry's reportJson is CombinatorialSolveReport text and must first be read with CombinatorialReport. summary/reportJson expose the final unified report/summary; attemptJson retains original traces (errors and terminal summaries, not complete child reports). selectedAttemptId/selectionReason preserve selection identity/rationale. Exact u64 time metadata bypasses JS-number re-encoding. Rust validates aggregate/attempt contracts, source fingerprint and solution shape, not independent feasibility/optimality. Reports own independent data and need disposal. Runtime/license failures remain attempt diagnostics; no usable result yields the core UNKNOWN/BACKEND_FAILURE aggregate.

## Native Parallel Framework Orchestration

The same explicit client supports Rust's actual parallel linear solver:

```typescript
import { ParallelCombinatorialLinearSolver } from 'ospf-wasm/framework';
const parallel = new ParallelCombinatorialLinearSolver(client, {
    backends: ['scip', 'gurobi'], // Both must be compiled and runtime-ready.
    mode: 'best',
});
const parallelJob = await parallel.solveLinear(artifact, { timeLimitMs: 15000 });
const parallelReport = CombinatorialReport.fromJson(parallelJob.reportJson!, artifact);
console.log(parallelReport.summary(), parallelReport.selectedAttemptId());
await client.release(parallelJob.id);
parallelReport.dispose();
```

The host must advertise parallel-linear/parallelLinear. Rust-generated `ParallelLinearOptions` accept a nonempty distinct ordered backend list (up to two). Omitted mode uses Rust's best default: wait for all workers, choose by model objective direction, and break ties by configuration order; without incumbents retain the first certified mathematical terminal. first accepts the first selectable report, requests cooperative cancellation of other workers, and **still waits for every worker to finish**; it promises neither immediate return nor global optimality. Loser cancellation does not cancel the parent. Every attempt remains in the aggregate, including backend/license failures and cancelled losers.

Concurrency is internal to the single active native job; it does not allow multiple jobs. Limits apply per backend solve, not as end-to-end deadlines. Child progress may interleave; only JobView.status marks job completion after joining workers. HTTP/N-API use the same engine, external cancellation, release and CombinatorialReport reader. Serial/parallel/CP configuration cannot be mixed, and no native worker or Node module enters WASM or the browser dependency graph.

These are native serial/parallel linear composition entries, not column generation, other Benders variants or complete domain workflows. Arbitrary TS callbacks cannot become Rust traits.

## Native Fixed-Continuous-Recourse Benders

`FixedRecourseAlgorithm(client, configuration)` invokes the actual Rust framework algorithm through `fixed-recourse` / `fixedRecourse`, using an explicitly selected `scip` or `gurobi` backend. Only linear source artifacts are accepted. `FixedRecourseOptions`, stages, stop reasons and summary types are generated from Rust. This is one built-in strategy, not arbitrary Benders, column generation or domain-pipeline registration.

`stages` uses source exchange column indices, never process-local token IDs. Explicit continuous recourse is required for nonzero-cost recourse variables: omitted stages retain Rust's default of keeping integers and nonzero-cost variables in the master. Integer recourse and unsupported partitions fail explicitly. The existing Rust partition/certificate/cut machinery is reused; missing certificates may be recovered within the remaining budget, invalid existing certificates are not replaced, and there is no full-MILP fallback. A bounded recourse box may be needed to seed a finite master bound; unsupported cases remain `unsupported`.

`timeLimitMs` is the algorithm's total solve budget, including master, subproblem and certificate recovery solves, each receiving the remaining time. Codec/partition initialization precedes that budget and is not an interruptible end-to-end deadline. Progress remains raw latest child progress, not an overall percentage. HTTP and N-API share the bounded single-active-job lifecycle and cooperative cancellation. Partition errors can occur after submission; SDK errors retain `jobId` so the failed job can be released.

`FixedRecourseReport.fromJson(job.reportJson, artifact)` owns independent Rust data. `summary()` exposes the actual stop, complete source-order incumbent, source-direction objective/best bound, iteration/cut counts, native terminal status/reason and retained backend error. For maximization the best bound is an upper bound. Iteration/time/cancellation stops can retain an incumbent; they are not fabricated success. `masterReportJson()` and `subproblemReportJson()` retain the last actual child reports as exact text, including their own proofs/identities; certificate-recovery terminal metadata is retained separately. They are **not** a unified source-model SolveReport or an independent source optimality certificate. Import validates schema, source fingerprint, full assignment/domain, objective, bound consistency, counters and core child-report invariants; it does not replay cuts to prove the bound. Release jobs and dispose reports separately.

Portable Rust report readers explicitly use `u64` metadata counters (statistics, provenance and iteration traces); native execution APIs keep their default `usize`. Exact integers, including counts above 2^53 and through u64::MAX, remain report text, not JS JSON numbers. Only the generated safe summary is parsed by the SDK.

```typescript
import { FixedRecourseAlgorithm, FixedRecourseReport } from 'ospf-wasm/framework';
const algorithm = new FixedRecourseAlgorithm(client, {
    backend: 'scip',
    stages: [{ variableIndex: 1, stage: 'continuousRecourse' }],
    iterationLimit: 128,
});
const bendersJob = await algorithm.solveLinear(artifact, { timeLimitMs: 15000 });
const bendersReport = FixedRecourseReport.fromJson(bendersJob.reportJson!, artifact);
console.log(bendersReport.summary());
await client.release(bendersJob.id);
bendersReport.dispose();
```

## Development and Validation

Build low-level tarballs using the Rust repository's `scripts/build-wasm-bindings.ps1` and optionally `scripts/build-node-bindings.ps1 -Features scip-bundled,scip-quadratic`. Both scripts use Cargo's configured target directory for their build outputs and tarballs. If that directory is on another drive, the Node script briefly stages its generated binding files under the Rust workspace `target/npm` because of an upstream CLI path limitation, then moves them to the configured target. Install the tarballs for local development; production dependencies remain exact published versions, never sibling source paths. Generated binding declarations require TypeScript 5.2 or later.

```powershell
npm test
npx playwright install chromium
npm run test:browser
npm run test:browser:bundle
```

The bundle test runs the real browser and Worker against Vite production output. Set `OSPF_E2E_GUROBI=1` to enable both HTTP and N-API Gurobi acceptance tests; both native components must be built with the matching feature and have access to the runtime and license.

Set `OSPF_E2E_URL` and `OSPF_TOKEN` to enable real HTTP solver tests. Node integration tests require a real SCIP-enabled native package; absent optional environments are explicitly skipped. Gurobi requires its own runtime/license gate.

Set `OSPF_E2E_PROGRESS=1` for the larger real SCIP fixture that waits for an intermediate snapshot and then requests cancellation. The HTTP case also requires `OSPF_E2E_URL` and `OSPF_TOKEN`.

The default Node test suite also checks disconnect and cancellation races over actual loopback TCP against a fake HTTP server. These failure-path contract tests do not replace real host or browser HTTP solver acceptance.

Use `npm run test:packages -- <wasm.tgz> <native.tgz>` to install the actual SDK and bindings into an isolated consumer directory and test public package exports and N-API independently of optional-peer installation behavior. Its ES2022 type check disables inherited ambient types, so a parent `@types/node` installation cannot conceal declaration problems. Add the ABI-matching SCIP runtime `bin` to PATH first. For bundled builds, use the `scip_install/bin` downloaded by scip-sys under the Rust target directory, not another version's same-named DLL.

## Release

SDK 0.1.0 pins low-level package 0.1.0 and bridge protocol major 1. Release Rust binding packages first, validate SDK integrations, then publish the SDK. Workflows produce candidates and do not automatically publish. Initial native platform support is Windows x64; shared-runtime packaging must be verified independently.

Generated declarations, glue, WASM, native binaries, tarballs, dist and test evidence are not Git sources. See the Rust repository's `docs/typescript-bridge.md` for the full coverage matrix and HTTP contract.

## License

[MIT](LICENSE).

### Native Source-Projected Column Generation

`ColumnGenerationAlgorithm(client, { backend, blocks })` invokes the native `column-generation` / `columnGeneration` strategy. `ColumnGenerationOptions`, block definitions, stop reasons and summaries are generated from Rust. Blocks explicitly map distinct source exchange column indices; unmapped variables remain global. Each block is a local configuration with exactly one selected column, **not** an unbounded multiplicity pattern master for arbitrary packing domains. Blank/duplicate blocks, repeated/unknown variables and arbitrary callbacks are rejected. Limits: 256 blocks, 100000 mapped variables, 10000 RMP rounds/columns; defaults are 128 rounds, 10000 columns and tolerance 1e-7.

The actual Rust `ProjectedColumnGeneration` uses `ColumnProjection` throughout: empty-pool artificial-variable Phase I (no big M), independently validated optimal RMP LP certificates and row mappings, local pricing models with original bounds/integrality/local rows, one improving column per block/round, atomic batch addition, dual invalidation/rebuild, then a restricted integer master and complete source-assignment validation. Cross-block/global rows enter local pricing only through duals. Pricing masters omit column upper bounds already implied by convexity, avoiding spurious negative reduced costs from redundant bound duals; existing ordinary master defaults remain unchanged. SCIP uses its explicit LP-subproblem preset to retain usable duals.

`timeLimitMs` is a total solve budget including RMP, pricing and final; each child gets the remaining time. Source codec/decision initialization precedes this budget, and compilation is not preemptible. Without an explicit limit Rust uses 60 seconds. Progress is the latest raw child snapshot, not an overall percentage. HTTP/N-API share cancellation, job storage and release; errors after receiving the job ID retain `jobId`. No source-MILP fallback, implicit backend substitution or TS-to-trait conversion occurs.

`ColumnGenerationReport.fromJson(job.reportJson, artifact)` validates schemas, source identity, counters, source-domain full assignments/objective and core child-report contracts. `summary()` distinguishes Phase I completion, Phase II pricing convergence, limits/stalls and actual child termination; infeasibility/unboundedness remains in child reports and is not fabricated into a source proof. `masterReportJson()`, `pricingReportJson()` and `finalReportJson()` retain the last actual reports with u64 metadata as lossless text; `pricingBlock` identifies the last pricing block. The final solve is **only over generated columns**: even completed pricing and an optimal restricted integer master do not establish global source-MILP optimality, and restricted infeasibility does not prove source infeasibility. There is deliberately no source `bestBound` or source SolveReport proof. Iteration/column limits may still finalize a feasible current pool after Phase I; time/cancellation do not start a new final solve, but retain a validated incumbent if returned by an already running final solve. Dispose reports separately from releasing jobs.

This does not expose arbitrary context/pipeline registration, dynamic column-removal policies, branch-and-price or all domain workflows. Those remain subsequent implementation work, not silently emulated SDK functionality.

```typescript
import { ColumnGenerationAlgorithm, ColumnGenerationReport } from 'ospf-wasm/framework';
const algorithm = new ColumnGenerationAlgorithm(client, {
    backend: 'scip',
    blocks: [{ id: 'a', variableIndices: [0] }, { id: 'b', variableIndices: [1] }],
});
const columnJob = await algorithm.solveLinear(artifact, { timeLimitMs: 15000 });
const columnReport = ColumnGenerationReport.fromJson(columnJob.reportJson!, artifact);
console.log(columnReport.summary());
await client.release(columnJob.id);
columnReport.dispose();
```

### One-Dimensional Packing

`ospf-wasm/bpp1d` exposes `PackingContext`, `PatternGenerationResult`, `PackingResult`, `Bpp1dMilp`, `Bpp1dColumnGeneration` and `Bpp1dReport`. Initialize WASM in each browser, Worker or Node realm first. These objects reuse the existing Rust quantity adapters, domain validation, candidate search, packing/KPI extraction and shared MetaModel/context/pipeline registration; the SDK does not implement packing or optimization algorithms.

```typescript
import { initialize, HttpClient } from 'ospf-wasm';
import { PackingContext, Bpp1dMilp, Bpp1dReport } from 'ospf-wasm/bpp1d';

await initialize();
const context = new PackingContext({
    items: [{ id: 'part', length: { value: 40, unit: 'mm' },
        weight: { value: 100, unit: 'g' }, amount: 2n,
        materials: new Map([['steel', 3n]]) }],
    binTypes: [{ id: 'stock', length: { value: 10, unit: 'cm' },
        maxWeight: { value: 1, unit: 'kg' }, cost: 2, inventory: null }],
    spacing: { value: 1, unit: 'cm' },
    lengthUnit: 'cm', weightUnit: 'kg', objective: 'binCount',
});
const generated = context.generatePatterns({ maxPatterns: 1000, maxNodes: 10000 });
console.log(generated.complete(), generated.patterns());
const artifact = context.toArtifact(); // canonical Rust text + problem fingerprint
context.dispose(); generated.dispose();

const client = new HttpClient({ baseUrl: 'http://127.0.0.1:8787', token: '<host-token>' });
const job = await new Bpp1dMilp(client, { backend: 'scip' }).solve(artifact);
const report = Bpp1dReport.fromJson(job.reportJson!, artifact);
const packing = report.packing();
console.log(report.summary(), packing?.kpi(), packing?.materials());
await client.release(job.id); report.dispose(); packing?.dispose();
```

`Item.amount`, per-piece `materials`, bin `inventory`, pattern `amounts`, usage `count` and result count/material accessors use `bigint` and Maps. Rust-generated wire contracts carry canonical u64 decimal strings; negative, out-of-range and number counts are rejected. `verifyUsages` checks full exact demand and inventory without expansion, including u64 counts above 2^53. This does **not** promise that a floating native solver can optimize every such input: existing exact scalar-conversion gates still apply. Dimensions/finite values are checked at runtime, not by a Rust-like TS type guarantee. Lengths/masses normalize to `lengthUnit`/`weightUnit`; `Quantity` also supports `kg`/`g` and `toDto()`.

Portable `validatePattern`, `verifyUsages`, `pack` and `verifyPlans` are real domain operations, not solvers. Spacing applies only between adjacent pieces; mass, capacity, exact demand, stock, overlaps, forged dimensions and checked material totals are validated by Rust. `pack` and `verifyPlans` return independent physical results. `plans`/`freeIntervals` are copied generated DTOs in the normalized length unit. KPIs include actual bin/item counts, consumed length, **tail-only** remnant length, net-length utilization and actual cost independent of the chosen objective (`binCount`, `consumedLength`, `cost`). Context/result/candidate/report lifetimes are independent; every Rust-owned object needs its own `dispose()`.

Budgets are explicit: at most 1000 item types, 128 bin types, 10000 candidate patterns, 100000 search nodes, and 100000 expanded pieces/bins. Default candidate budgets are 10000/100000; default expansion is 100000. Generation exposes `complete: false` on truncation, never silently exhaustive. Input/artifact/report text is limited to 8 MiB. Native iteration and columns-per-iteration defaults are 32 (maximum 10000); tolerance is finite in [0, 0.5), default 1e-7. Only default, host-registered policies are exposed. Bound today: strict CSV import, the renderer adapter and native tail optimization. Still unbound: BPP1D discrete loading, caller-supplied policies/contexts/pipelines and arbitrary TS callbacks.

Native execution requires `bpp1d` plus `bpp1dMilp` or `bpp1dColumnGeneration` capabilities, and the explicitly selected compiled backend. `modelKind: 'bpp1d'` and `bpp1dOptions` are exclusive to `solver: 'bpp1d'`; they cannot mix with CP/framework options. Both HTTP and N-API use the same single-active-job executor, cooperative cancellation/progress/release and Rust domain workflow. Native `timeLimitMs` covers bounded generation/seeds, LP rounds and final with remaining per-child budgets; the default is 60 seconds. Codec initialization and non-preemptible generation/compilation mean this is not a hard end-to-end deadline. Generic no-incumbent, proof-free pre-cancelled child reports acquire only their actual submitted child's missing mapping/fingerprint at the native boundary; conflicting existing identities are not overwritten.

`Bpp1dColumnGeneration` is the original BPP1D **finite-pool column-activation** workflow: seeds, screened LPs with verified duals, activation, then a final integer solve over the full current seed/generated pool. It is not the source-projected `ColumnGenerationAlgorithm`, arbitrary DW pricing, or branch-and-price. A pricing iteration limit can still be followed by a complete-pool final. `candidateComplete`, `pricingConverged`, `globallyOptimal` and `globallyInfeasible` retain the actual Rust default-rule proof scope: truncated candidates never establish a global packing claim. Global flags require complete candidates and actual corresponding native evidence, not merely a feasible plan or compiled backend.

`Bpp1dReport.fromJson` rechecks schema 1.0, canonical problem/fingerprint, core report contracts, full physical placements, material totals, KPIs and objective consistency. It does not rerun exhaustive candidate search to independently certify the native global flags. `solverReportJson()` preserves the actual candidate model's identity/proof and exact u64 metadata as raw text; it is not relabeled as a unified source packing report. Only safe generated summary/DTO fields are parsed in JS. `packing()` returns a fresh independent result; releasing jobs or disposing the report does not free that result. The additive protocol stays major 1, but older hosts without advertised BPP1D capabilities are rejected before submission.

### Shared Two-Dimensional Geometry

`ospf-wasm/geometry2d` exposes a `Geometry2d` f64 context and Rust-generated DTO types with natural names: `QuantityPoint2`, `QuantityVector2`, `PackingShape2`, `Box2Geometry`, `Placement2`, `Sheet2Shape`/`Sheet2Geometry`, `Shape2Candidate`. Initialize WASM in each browser/Worker/Node realm. Geometry calculations stay in the shared Rust kernel used by BPP2D/CSP2D, not in TS.

```typescript
import { initialize } from 'ospf-wasm';
import { Geometry2d, type PackingShape2, type Box2Geometry } from 'ospf-wasm/geometry2d';

await initialize();
const geometry = new Geometry2d('cm');
const shape: PackingShape2 = {
    kind: 'rectangle', width: { value: 2, unit: 'm' }, height: { value: 3000, unit: 'mm' },
};
const box: Box2Geometry = {
    shape, position: { x: { value: 0, unit: 'm' }, y: { value: 0, unit: 'm' } },
};
console.log(geometry.shapeMetrics(shape)); // area approximately 60000 cm^2
console.log(geometry.candidateShapes(shape));
const pairs = geometry.overlapPairs([box, box]); // Uint32Array [0, 1]
geometry.dispose();
console.log(pairs); // independent copied data
```

Point/vector arithmetic, y-before-x ordering, rotation/candidates, actual/bounding areas, pitch, kerf inflation, box translation/relocation/bounds and point/box/sheet containment call the original Rust APIs. Mixed m/km/cm/mm normalize internally to Meter; output uses the context unit and corresponding `m^2`/`km^2`/`cm^2`/`mm^2` area units. `Quantity` also supports these square units, including dimension-safe conversion/addition, and `countFitting(cell, container)` reports how many cells fit along one direction with the original kernel's zero-for-non-positive semantics. `rotated` is placement metadata: supply the already oriented shape, with no implicit second rotation.

**Box predicates are not exact circle collision/containment**: circles use enclosing squares, shared bounding-box edges do not overlap, and box boundaries count as inside. Diagonally disjoint disks may still have overlapping squares, so use `diskOverlaps` (exact centre-distance test, tangency not intersecting, `null` for non-circular boxes) and `centre()` when the answer must be exact. `inflatedByPlacement` retains the original lower-left coordinate and metadata, not the centre; `inflatedByShape` increases rectangle width/height or circle diameter by spacing. This preserves existing kernel behavior rather than silently changing BPP2D/CSP2D geometry.

Inputs require finite compatible lengths, positive extents and nonnegative spacing. Invalid/unknown fields, overflow/underflow and bounds collapsed at coordinate precision are rejected. Text inputs are limited to 8 MiB; non-null itemId uses 1..1024 UTF-8 bytes. Strict f64 comparisons retain floating-point rounding, with no added tolerance. `overlapPairs` accepts at most 512 boxes and returns **every** overlapping index pair as interleaved u32 values (i,j, i<j, input order), never a truncated result. DTOs/arrays are independent copies reusable across contexts; only contexts need disposal. Other quantity utilities and arbitrary precision specializations remain unbound; BPP2D/CSP2D have the explicit native execution entries documented next.

Rust-side BPP2D preparation includes shared MetaModel registration and an explicit report-driven backend, plus `solve_bpp2d_column_generation`: normalized-deficit Phase I recovery, certified whole-sheet-area LP pricing and same-backend final MILP. The default-rule workflow validates observed layouts against source catalog/rotation/kerf policies, retains the complete pool and actual child models/reports, and shares time/progress/cancellation plus iteration/pool/report limits. Existing generators remain heuristic (`candidate_complete` is always false); restricted optimality/infeasibility is never promoted globally. Nonzero mass/load rules and extra-rule pricing corrections are not supported by that loop. The source-bound execution codec and portable SDK validation/report-reader subpath are now available as documented next; BPP2D HTTP/N-API execution facades now share the native engine; bounded compressed packing/rendering also delegates to the original Rust services. The legacy closure-based flow is not presented as actual native solver execution.

### Shared BPP Sparse Loading

`ospf-wasm/bpp` exposes `DiscreteLoadingContext`, `DiscreteLoadingResult`, `DiscreteLoadingReport` and
Rust-generated `DiscreteLoadingProblem` / `DiscreteLoadingSolution` DTO types. It registers original Rust
sparse assignments, true count/weight capacities, whole-position occupancy, non-transitive conflict edges
and explicit layout choices. Items are independent identities, not multiplicities. No Cartesian product,
transitive conflict closure, geometry test or TypeScript loading algorithm is introduced.

```typescript
import { initialize } from 'ospf-wasm';
import { HttpClient, SCIPSolver } from 'ospf-wasm/framework';
import { DiscreteLoadingContext } from 'ospf-wasm/bpp';
await initialize();
const loading = new DiscreteLoadingContext({
    items: [{ id: 'cargo', weight: { value: 1000, unit: 'g' }, required: true, fixedPositionId: 'hold' }],
    positions: [{ id: 'hold', maxCount: 18_446_744_073_709_551_615n,
        maxWeight: { value: 1, unit: 'kg' }, fixedOccupied: false, enabled: false }],
    allowedAssignments: [{ itemId: 'cargo', positionId: 'hold' }],
    conflicts: [], layoutGroups: [], weightUnit: 'kg',
});
const client = new HttpClient({ baseUrl: 'http://127.0.0.1:8080', token });
const job = await new SCIPSolver(client).solveLinear(loading.toLinearTriadModel());
try {
    const report = loading.readReport(job.reportJson!);
    const plan = report.solution();
    report.dispose();
    try { console.log(plan?.solution(), plan?.loadedCount(), plan?.loadedWeight()); }
    finally { plan?.dispose(); }
} finally { loading.dispose(); await client.release(job.id); }
```

Node can explicitly use `NodeClient` from `ospf-wasm/native` instead; it is never loaded by browser entries.
Without an objective, `toLinearTriadModel()` exports a **zero-objective feasibility MILP**, not a maximum-loading optimizer.
The ordinary Rust application service is available separately below. Optional items need not be chosen. Fixed cargo remains legal in a disabled
position; positive cargo and fixed occupancy require whole occupancy, while empty reservations are permitted.
`maxCount` accepts positive bigint through 2^64-1 without rounding; Rust tightens model coefficients by actual
sparse adjacency. Weights normalize through original quantities conversion to explicit kg/g and reject
negative/nonfinite values or conversion overflow/underflow. Verification uses the original 1e-7 model-unit tolerance.

`toArtifact` / `fromArtifact` preserve canonical schema-1.0 source text and digest. That digest enters actual
registered names, so reports cannot be transplanted between identity-distinct but mathematically equal
sources. `[0,0]` / `[1,1]` fixed binary bounds survive model exchange. `solutionValues(plan)` returns an
independent full Float64Array; `verifySolution(plan)` and `extractSolution(values)` jointly validate original
model rows/bounds/integrality and domain rules. Results expose `solution`, `sourceFingerprint`, bigint
`loadedCount` / `positionCounts`, and unit-bearing `loadedWeight` / `positionWeights`, surviving context disposal.
`readReport` / independent `DiscreteLoadingReport.fromJson(text, source)` preserve raw report text and u64
counters, require the actual exported-model identity and validate every incumbent before exposing a plan.
No incumbent means undefined, never fabricated zero production. Native pre-cancel identity binding only
fills missing metadata at the authenticated submission boundary; it never overwrites identities or issues proofs.

Limits: 512 items, 128 positions, 4096 assignments, 2048 conflict edges, 64 layout groups, 512 layouts total,
4096 layout-position memberships and 8 MiB each for source text/execution model. Duplicate/reversed edges,
duplicate assignments/members, invalid references and unknown fields fail explicitly. This does **not** bind
arbitrary business extensions, arbitrary additional weight expressions, partition/column-generation/completion
workflows or BPP3D geometry. Domain extension callbacks are not automatically serialized into Rust traits.
`OSPF_BPP_LOADING_FIXTURE_DIR` enables real SCIP/Gurobi reader evidence in SDK/browser/Worker/isolated-package
tests. Standalone HTTP tests remain explicitly gated on a configured host, separate from in-process route tests.

#### Ordinary Loading Application

The optional second constructor argument is a Rust-generated `LoadingObjective`:
`{ itemCosts: { cargo: -5 }, positionCosts: { hold: 1 }, layoutCosts: [] }`.
Costs are finite, dimensionless minimizing coefficients; negative values reward selection. Occupancy costs include
empty reservations. Layout costs use `{ groupId, layoutId, cost }`. Unknown identities and duplicate layout terms
are rejected. Costs are registered through the original context's transactional `register_with`, never TS matrices.
The canonical source includes the objective; omitting it retains the earlier source encoding and zero objective.

```typescript
import { DiscreteLoadingApplicationService } from 'ospf-wasm/bpp';
// Use a live loading context and an explicit HTTP or Node client.
const source = loading.toArtifact();
const applicationJob = await new DiscreteLoadingApplicationService(client, { backend: 'scip' }).solve(source);
try {
    const applicationReport = loading.readApplicationReport(applicationJob.reportJson!);
    const plan = applicationReport.solution();
    try { console.log(applicationReport.summary(), plan?.solution()); }
    finally { plan?.dispose(); applicationReport.dispose(); }
} finally { await client.release(applicationJob.id); }
```

This invokes the original `DiscreteLoadingApplicationService` in the shared native worker. Protocol-1 submissions
require `solver: 'bpp-loading'`, `modelKind: 'bppLoading'` and exclusive `bppLoadingOptions: { backend }`.
Clients require advertised `bppLoading`/`bppLoadingMilp` and the selected backend's LP/MIP capabilities.
The factory and solve share the original 60-second default or explicit time budget, progress, cancellation and release.
Bounded validation/codec work is not a hard interruptible deadline. No automatic solver or transport fallback occurs.

`toApplicationModel()` exposes the actual snapshot-compiled model. It has a different identity/row mapping from
the mechanism-based `toLinearTriadModel()`; application reports are never relabeled as the latter. Original limits
now use explicit stable row IDs, while default context namespaces still isolate independent registrations.
`DiscreteLoadingApplicationReport.fromJson(text, source)` and `readApplicationReport` verify the actual model,
full incumbent, minimizing objective and original domain plan. `solverReportJson()` retains exact original counters.
Pre-factory cancellation/time-limit reports retain `registrationPresent() === false`, no fabricated model identity,
no proof and no empty plan. Full registration and real backend reports remain separately distinguishable.
Application reports and each returned plan are independently disposable. Arbitrary domain extensions remain
unbound; partition lifecycle primitives and the original native root application are documented separately.

#### Continuous Additional Weight

`new DiscreteLoadingContext(problem, objective?, resources?)` also accepts generated `LoadingResource[]`.
When present, provide 1..128 unique resources, at most one per known position:

```typescript
import { DiscreteLoadingContext, type LoadingResource } from 'ospf-wasm/bpp';
const resource: LoadingResource = {
    id: 'ballast', positionId: 'p',
    minimumWeight: { value: 0, unit: 'kg' }, maximumWeight: { value: 1000, unit: 'g' },
    minimumPerLoadedWeight: 0.5, costPerWeight: 2,
};
const loading = new DiscreteLoadingContext(problem, undefined, [resource]);
const source = loading.toArtifact(); // retain the resource-bearing source for native execution
const weights = new Map([['ballast', { value: 500, unit: 'g' as const }]]);
const values = loading.solutionValues(plan, weights);
const result = loading.verifySolution(plan, weights);
console.log(result.resources()); // weights, positionTotalWeights, totalWeight
result.dispose(); loading.dispose();
```

The ratio is dimensionless and nonnegative. Finite minimizing `costPerWeight` is per **model** weight unit
(`problem.weightUnit`), not the bound's unit; changing kg to g does not automatically rescale costs. Negative
costs are allowed with finite variable bounds. Rust registers continuous variables and coupling rows and uses
the original context for true capacity and whole occupancy. With resources, every plan must include all explicit
resource weights; omitted/unknown resources, wrong units, invalid bounds, ratios or capacity fail rather than
being filled with guessed values. `extractSolution` and both report readers revalidate the complete vector too.
Resource definitions enter the source fingerprint, including identity. `loadedWeight`/`positionWeights` remain
cargo-only; `resources()` returns independent, model-unit DTOs with inclusive totals. Resource-free source and
result encoding remain unchanged. The same ordinary native application supports these resources through
explicit HTTP/Node clients. Resource modeling itself does not run decomposition; see shared BPP Benders below. Arbitrary TS callbacks remain unsupported.

#### Shared BPP Benders

```typescript
import { DiscreteLoadingBendersApplicationService, DiscreteLoadingBendersReport } from 'ospf-wasm/bpp';
const service = new DiscreteLoadingBendersApplicationService(client, {
    backend: 'scip', recourseResources: ['ballast'], iterationLimit: 128,
    recoverMissingCertificates: true, fallbackToMilp: false,
});
const job = await service.solve(source, { timeLimitMs: 10_000 });
try {
    const report = DiscreteLoadingBendersReport.fromJson(job.reportJson!, source);
    try {
        console.log(report.summary(), report.decompositionSummary(), report.fallbackUsed());
        const plan = report.solution();
        try { console.log(plan?.resources()); } finally { plan?.dispose(); }
    } finally { report.dispose(); }
} finally { await client.release(job.id); }
```

The source must declare every selected continuous resource. Select 1..128 unique resource IDs; iterations are
1..10000, default 128. The SDK requires `bppLoadingBenders` and the explicit native backend's LP/MIP support.
HTTP and Node use the same original Rust application, certificate/cut validation, total budget, progress and
cooperative cancellation. Missing-certificate recovery defaults on; invalid existing certificates are not replaced.
Fresh-equivalent-source MILP fallback is **opt-in**, never triggered after convergence/cancellation/time limits.
Nonzero-cost resources are explicitly staged as recourse; this is not an all-binary model relabeled Benders.

`readBendersReport` also reads through a live context. Complete source/resource incumbents are revalidated;
decomposition values retain initial-snapshot identities even after a fresh fallback. Merged source reports remain
proof-free `FEASIBLE` even on convergence, and `UNKNOWN` without an incumbent. Master infeasibility is not a
full-source proof. Actual full-source fallback reports retain their own proofs; `decompositionReportJson()` and
`fallbackReportJson()` keep original child text separate, including exact u64 metadata. `decompositionError()`
retains recoverable failures. Readers check incumbent/bound consistency but do not independently replay every
cut, certify bounds or authenticate external solver provenance. Outer text is limited to 64 MiB + 4 KiB;
application/fixed-recourse/fallback limits remain 16 MiB + 1 KiB/8 MiB/8 MiB. Dispose each report and returned
plan separately. Branch-and-price and arbitrary domain callbacks remain unbound.

### CSP2D Source, Execution And Reports

`ospf-wasm/csp2d` exposes `CuttingContext` and Rust-generated source/column contracts. Initialize WASM
explicitly in each browser, Worker or Node realm. This entry delegates source catalogs, unit normalization,
MetaModel registration and physical column validation to Rust; it **does not generate columns or solve**.

```typescript
import { initialize } from 'ospf-wasm';
import { CuttingContext, type CuttingProblem } from 'ospf-wasm/csp2d';

await initialize();
const m = (value: number) => ({ value, unit: 'm' as const });
const problem: CuttingProblem = {
  products: [{ id: 'part', name: 'Part', geometry: { width: m(1), height: m(1) }, allowRotate: false }],
  materials: [{ id: 'sheet', name: 'Sheet', shape: { kind: 'sheet', geometry: { width: m(4), height: m(2) } },
    availableBatches: 10n, process: 'freeform', maxSegmentHeight: null,
    products: [{ productId: 'part', count: 4n }] }],
  demands: [{ kind: 'count', productId: 'part', count: 3n, upperBound: null }],
  initialColumns: [], kerf: m(0),
  objective: { areaWeight: 1, wasteWeight: 0, heightWeight: 0, usageWeight: 0 },
};
const context = new CuttingContext(problem);
const restored = CuttingContext.fromArtifact(context.toArtifact());
context.dispose();
restored.validateColumns([]); // validates columns only, not demand satisfaction
restored.dispose();
```

Count inputs use bigint within 0..2^53-1; larger values fail rather than round. Stock must be positive,
and positive generation hints total at most 4096 per material; these hints are not demand or usage caps.
Count and unit-bearing area demands remain separate, including hard upper bounds. Source artifacts keep
canonical original text, schema 1.0 and a domain-separated fingerprint. `toJson()` returns this text
without JS numeric re-encoding. Restored contexts are independently disposable; after disposal calls fail
with `Disposed`. No source artifact authenticates external provenance.

Limits: 64 products, 16 materials, 128 demands, 256 initial columns; validation pools allow 512 columns
and 4096 total placements. Source/column text is limited to 8 MiB; the outer source artifact permits
16 MiB + 1 KiB for JSON re-escaping, without relaxing the 8 MiB inner source limit. Guillotine trees are flat postorder `nodes`, rooted
at the last node: cuts reference two distinct earlier nodes, each used once; no cycles, sharing or orphan
nodes. Each tree allows 4096 nodes/depth 128, with 65536 nodes across a pool. Product leaves must match
physical placements, source rotation and kerf/process rules; legacy shelf trees without finished-part
leaves fail explicitly. Length/area normalization uses meters/square meters and strict f64 predicates.

Every pattern use consumes one material batch, including coils; coil length bounds a single segment,
not a shared multi-segment roll budget. Region-based consumption may be a partial sheet. Source/column
validation does not establish feasible production or global optimality. `Csp2dColumnGeneration` executes
the original Rust native workflow through an explicitly selected HTTP or Node client, never inside browser WASM.
No implicit transport fallback or arbitrary JS pricing callback is supported.

```typescript
import { Csp2dColumnGeneration, Csp2dReport } from 'ospf-wasm/csp2d';
import { HttpClient } from 'ospf-wasm/framework';
const client = new HttpClient({ baseUrl: 'http://127.0.0.1:8080', token });
// Node alternative: explicitly create NodeClient from 'ospf-wasm/native'.
const job = await new Csp2dColumnGeneration(client, {
    backend: 'scip', generators: ['shelf'], finalIntegerEnabled: true, reportLimit: 196,
}).solve(sourceArtifact, { timeLimitMs: 60_000, onProgress: text => console.log(text) });
try {
    const report = Csp2dReport.fromJson(job.reportJson!, sourceArtifact);
    try { console.log(report.summary()); } finally { report.dispose(); }
} finally { await client.release(job.id); }
```

The facade snapshots configuration and requires `csp2d` / `csp2dColumnGeneration` plus the chosen backend's
LP/MIP capabilities before submission. HTTP/N-API share one bounded native engine; polling, cancellation,
progress and job release follow the common framework contract. The original child reports remain lossless
text, including non-feasible/timeout/cancelled results; no successful substitute is manufactured.

`CuttingContext.readExecutionReport(reportText)` and `Csp2dReport.fromJson(reportText, sourceArtifact)`
revalidate complete native executions through WASM, including actual child model/report identities,
source mathematics, hard count/area caps and stock rows, LP/infeasibility certificates, Phase I recovery
using original-unit deficits, and recomputed accepted reduced costs. They do not rerun native generators
or authenticate external solver provenance. Restricted-pool optimality/infeasibility never becomes a
source-wide conclusion; `candidateComplete` is always false.

```typescript
import { Csp2dReport } from 'ospf-wasm/csp2d';
// These lossless artifacts come from the Rust native workflow, not a TS solver placeholder.
const report = Csp2dReport.fromJson(reportText, sourceArtifact);
console.log(report.summary(), report.stages(), report.iterations(), report.columns());
const production = report.production();
report.dispose();
console.log(production?.producedCounts(), production?.materialBatches(), production?.consumedArea());
production?.dispose();
```

`toJson()` and `stageReportJson(index)` preserve original exact metadata as text; `stageJson(index)`
retains the actual model artifact and child report. Unsigned indices past the end return undefined;
negative, fractional and overflowing indices fail. Only a revalidated final integer incumbent yields an
independently disposable `ProductionResult`, outliving contexts/reports. `usages`, `producedCounts` and
`materialBatches` expose bigint; Rust uses checked u128 sums and exact demand/stock rechecks, so total
production may exceed 2^53 without rounding. `producedAreas`, `consumedArea`, `wasteArea` and `coilHeights`
retain units (m^2 or m); waste includes kerf strips, and coil heights are not a shared roll-length budget.
`objectiveValue` is the revalidated final objective. No final incumbent means undefined, not zero production.

Reports are limited to 8 MiB; generated Rust configuration bounds batches/candidates/pool/reports to
64/512/512/1024 (defaults 8/128/512/196), with only the original shelf strategy registered. An explicit
`OSPF_CSP2D_FIXTURE_DIR` enables real-SCIP/Gurobi SDK, Worker and isolated-package reader acceptance;
evidence stays ignored and is not a package/build dependency. Strict legacy guillotine limitations remain.
Real SCIP/Gurobi execution is tested through the shared engine, authenticated in-process HTTP routes and
isolated N-API packages. Standalone browser HTTP tests require explicit `OSPF_E2E_URL` / `OSPF_TOKEN` and
are skipped without a configured host; they are not replaced by fake-backend or route tests.

### BPP3D Portable Source

`ospf-wasm/bpp3d` validates cuboid and axis-aware cylinder sources and explicit physical plans, not solver jobs. Initialize WASM separately in each browser, Worker or Node realm. DTOs come from the Rust-generated contract; there is no TS packing implementation.

```typescript
import { initialize } from 'ospf-wasm';
import { PackingContext } from 'ospf-wasm/bpp3d';

await initialize();
const m = (value: number) => ({ value, unit: 'm' as const });
const source = new PackingContext({
  items: [{ id: 'a', name: 'A', width: m(1), height: m(1), depth: m(1),
    weight: { value: 500, unit: 'g' }, amount: 2n, orientations: ['upright'] }],
  bins: [{ id: 'bin', typeCode: 'box', width: m(2), height: m(1), depth: m(1),
    capacity: { value: 1, unit: 'kg' }, isMain: true }],
  initialLayers: [{ id: 'layer', binId: 'bin', depth: m(1), placements: [
    { itemId: 'a', position: { x: m(0), y: m(0), z: m(0) }, orientation: 'upright' },
    { itemId: 'a', position: { x: m(1), y: m(0), z: m(0) }, orientation: 'upright' },
  ] }],
});
const artifact = source.toArtifact(); // lossless text and source fingerprint
const restored = PackingContext.fromArtifact(artifact);
console.log(restored.problem().items[0].amount); // 2n
const packing = restored.packLayers([{ binId: 'bin', layerId: 'layer' }]);
console.log(packing.bins[0].placements); // validated absolute coordinates in meters
source.dispose(); restored.dispose();
```

Rust replays every initial layer through the original strict geometry adapter and checks per-layer weight, allowed orientation, coordinates, bounds and overlap. Source validation alone does not prove complete demand satisfaction or authenticate provenance. `packLayers` checks explicit source-layer/bin assignments across all bins, including combined depth, geometry, weight and exact grouped demand. It orders bins and layers as in the source, permits layer reuse across different bins, rejects duplicate bin/layer assignments, and returns independent, source-bound absolute coordinates. It does not generate columns, run a solver or claim optimality. Plans allow at most 4096 assignments and expanded placements and 8 MiB of text. The source is limited to 64 items, 64 distinct candidate-bin instances, 256 layers, 256 placements per layer and 4096 total placements; total positive demand is at most 100000 and source text at most 8 MiB. Identical bin type codes must have identical normalized dimensions, capacity and main flag. All placements have explicit coordinates. Cylinders are supported through axis-aware geometry: an item declares its alignment axis and radius, derives its axial length from the matching dimension and is checked against real circular footprints rather than bounding squares. Custom strategies and other unbound rules are rejected. Lengths are normalized to meters, and mass is dimension-checked and normalized to kilograms; the original domain stores kilogram values in `Meter`-parameterized fields and therefore does not have internal compile-time mass safety. `problem()` returns independent copies, and each context requires disposal. `readExecutionReport` revalidates the complete one-round report in WASM, and `ExecutionReport` / `PackingResult` give independently owned results; `Bpp3dOneRoundExecution` runs the same native flow through an explicit HTTP or Node client and never inside browser WASM.

```typescript
import { HttpClient } from 'ospf-wasm/framework';
import { Bpp3dOneRoundExecution, ExecutionReport } from 'ospf-wasm/bpp3d';

const client = new HttpClient({ baseUrl: url, token });
const job = await new Bpp3dOneRoundExecution(client, { backend: 'scip', generators: ['block', 'blLocal'], maxPlacements: 4096 })
  .solve(artifact, { timeLimitMs: 30_000 });
const report = ExecutionReport.fromJson(job.reportJson!, artifact);
const summary = report.summary(); // completed / failure / candidateComplete=false
const packed = report.packing();   // only after strict grouped physical replay succeeded
report.stageReportJson(0);         // original child report text, absent when none was accepted
report.dispose(); packed?.dispose();
```

The report keeps the actual initial-RMP, refreshed-RMP and final child models and original reports plus both pools; the decoder re-derives every child, requires iteration 0 on the source initial prefix, iteration 1 on the refreshed pool, a verbatim final pool, an exact dual certificate for every optimal-LP claim, and a strict grouped physical replay before exposing packing. Failures (no final incumbent, certified-infeasible final, analysis failure, exhausted report or expansion budget, cancellation) keep the real evidence and the original failure text in `completed`/`failure`. Reports are limited to three stages, 100000 expanded placements and 8 MiB. `generators` selects 1..7 distinct registered strategies (`block`, `blLocal`, `blGlobal`, `circlePacking`, `pattern`, `pile`, `historical`) and defaults to the original standard chain without the history replay, whose duplicate trace-free columns a strict final must reject. Generator provenance is never replayed, so `candidateComplete` is always false.

### Gantt Activity Scheduling

`ospf-wasm/gantt` exposes `ActivityContext` (source validation, candidate expansion, plan replay and an execution-report reader) and `GanttActivitySolver` (native single-MILP execution through an explicit HTTP or Node client, never inside browser WASM).

```typescript
import { initialize } from 'ospf-wasm';
import { HttpClient } from 'ospf-wasm/framework';
import { ActivityContext, ExecutionReport, GanttActivitySolver } from 'ospf-wasm/gantt';

await initialize();
const context = new ActivityContext({ horizon: { start: '2026-01-01T00:00:00Z', end: '2026-01-02T00:00:00Z' }, costUnit: 'kg',
  resources: [{ id: 'machine', capacity: { value: 1, unit: 'kg' }, unavailableTimes: [], capacities: [] }],
  activities: [{ id: 'job', modes: [{ id: 'run', durationSeconds: 3600n, starts: ['2026-01-01T01:00:00Z'],
    resources: [{ resource: 'machine', quantity: { value: 1, unit: 'kg' }, fromSeconds: 0n }], cost: { value: 2, unit: 'kg' } }] }],
  dependencies: [] });
const artifact = context.toArtifact();
context.replay({ selections: [{ task: 'job', mode: 'run', start: '2026-01-01T01:00:00Z' }] }); // native-rule replay
const job = await new GanttActivitySolver(new HttpClient({ baseUrl: url, token }), { backend: 'scip' }).solve(artifact);
const report = ExecutionReport.fromJson(job.reportJson!, artifact);
report.summary();  // problemStatus / terminationReason / objectiveValue / solverModelOnly / failure
report.schedule(); // present only after the incumbent passes native revalidation
```

Times use RFC 3339 text and quantities accept only a fixed vocabulary (m/km/cm/dm/mm/in/ft/yd, t/lb, s/min/h, kg/g, m³/L and their square units); no arbitrary policy callbacks are loaded. Only incumbents that pass `ActivityPreparation::validate` carry placements; baselines, execution facts, additional business rows, material flows and solver proofs remain out of scope.

### BPP2D Source, Execution And Reports

`ospf-wasm/bpp2d` exposes `PackingContext`, `Bpp2dReport` and independently owned `ProductionResult` / `PackingResult`. Source/layout validation and complete execution-report readers run through WASM; `Bpp2dColumnGeneration` runs the original workflow through an explicitly selected HTTP or Node client, **never inside browser WASM**. Initialize WASM explicitly in each browser/Worker/Node realm. Types derive from the Rust package; no TS packing/pricing algorithm is implemented.

```typescript
import { initialize } from 'ospf-wasm';
import { PackingContext } from 'ospf-wasm/bpp2d';
await initialize();
// sourceArtifact/reportText are lossless artifacts produced by Rust.
const context = PackingContext.fromArtifact(sourceArtifact);
const report = context.readExecutionReport(reportText);
const summary = report.summary(); // candidateComplete is always false
const rawChild = report.stageReportJson(0); // exact u64 metadata stays text
const production = report.production(); // undefined without a final integer incumbent
context.dispose(); report.dispose();
console.log(summary.stop, rawChild, production?.producedCounts()); // bigint counts
production?.dispose();
```

Constructors accept source items/sheets/demands/initial layers, length-bearing kerf and an explicit default-rule objective. Count demands/upper bounds use bigint within 0..2^53-1; generator counts are limited to 4096. Area demands carry squared units. Rust normalizes to meters/square meters and validates source references, shapes, rotation, kerf, envelopes, demand bounds and objective coefficients. Sources allow at most 64 items, 16 sheets, 128 demands and 256 initial columns; complete pools allow 512 columns and 4096 total placements. Exposed generation inputs also conservatively limit sheet/item bounding-area ratios to 4096. Text artifacts are limited to 8 MiB. Nonzero mass/load, custom-rule pricing corrections and arbitrary callbacks remain unsupported. Native BPP1D execution accepts `tailWindow`, which re-solves only the last N bins and withdraws the global optimality claim whenever the packing actually changes. `PackingContext.fromCsv(itemsText, binsText, options)` imports two strict CSV tables (closed schema header, empty inventory means unlimited) into the same context as JSON construction. `Bpp1dPackingContext.render(plans, unit)` revalidates complete placements in the domain and returns a display-unit `Bpp1dRenderSchema`, never precision or optimality evidence. Circles retain original bounding-square geometry, not exact disk collision.

The reader checks canonical source identity, initial-pool prefix (including duplicates), generated-column uniqueness, actual child models/raw reports, certified LP duals/infeasibility proofs and the Phase I/RMP/pricing/final lifecycle. Accepted reduced costs are recomputed in Rust. Restricted optimality/infeasibility never becomes a global claim; consistency does not authenticate provenance. Production comes only from a revalidated final integer incumbent, including feasible cancelled/timed-out final reports. Checked u128 totals become bigint in TS; areas remain finite number quantities. Context/report/each production copy require separate disposal. Returned DTOs/Maps are independent copies. Raw child numbers must not be round-tripped through JS JSON parsing. `Bpp2dReport.fromJson(text, source)` also supports independent reading. Optional `OSPF_BPP2D_FIXTURE_DIR` supplies ignored real SCIP/Gurobi report evidence to Node/browser/Worker/isolated-package acceptance, never a release dependency.

#### Explicit Native BPP2D Execution

`Bpp2dColumnGeneration(client, { backend })` uses `solver: bpp2d`, `modelKind: bpp2d` and exclusive `bpp2dOptions`. The client requires `bpp2d`/`bpp2dColumnGeneration` plus the chosen compiled native linear/MIP backend. Select `HttpClient` explicitly for a host, or install the optional native package and pass `NodeClient` from `ospf-wasm/native`. No HTTP fallback or arbitrary JS-to-Rust strategy conversion occurs; Node built-ins/native extensions stay out of the browser graph.

```typescript
import { HttpClient } from 'ospf-wasm';
import { Bpp2dColumnGeneration, Bpp2dReport } from 'ospf-wasm/bpp2d';
const client = new HttpClient({ baseUrl: hostUrl, token });
const job = await new Bpp2dColumnGeneration(client, {
  backend: 'scip', iterationLimit: 8, poolLimit: 128,
  generators: ['blockLocal', 'pattern'],
}).solve(sourceArtifact, { timeLimitMs: 10_000, signal, onProgress: console.log });
try {
  if (job.reportJson === null) throw new Error('missing native report');
  const report = Bpp2dReport.fromJson(job.reportJson, sourceArtifact);
  try { console.log(report.summary(), report.stages()); }
  finally { report.dispose(); }
} finally { await client.release(job.id); }
```

Defaults are 8 pricing batches, 128 observed candidates/batch, pool 512, 196 child reports, final MILP enabled and reduced-cost tolerance 1e-6. Bounds are respectively 0..64, 1..512, 1..512, 1..1024 and tolerance [0,0.5). Optional generator chains contain 1..8 distinct registered kinds and retain order; omitted chains use the original complete default chain. Hard report/time/cancellation stops never force a final solve; disabled final execution never turns an LP incumbent into physical production. A timed-out/cancelled final incumbent remains valid if its original report/source validation passes. Completed child reports win late-cancellation races without rewriting their identity or terminal reason. Progress is raw child progress, not an overall percentage. Transport/callback failures after receiving the job ID retain it for recovery; release completed jobs and dispose reader/production objects separately. Rust in-process authenticated-route tests cover HTTP execution; independent SDK HTTP/browser-host tests require an explicitly configured host and are skipped when absent.

#### Compressed Packing And Typed Rendering

`context.packLayers(layers)` packs each input layer once, without claiming source-demand satisfaction. `report.packing()` derives only from a revalidated final integer incumbent (otherwise `undefined`). Both call the original Rust `Packer`, `FreeSpaceAnalyzer` and `PackingRendererAdapter` through WASM, not TS algorithms or native solvers.

```typescript
const packed = report.packing();
try {
    console.log(packed?.sheetCount(), packed?.itemCount(), packed?.materialCounts());
    for (const pattern of packed?.patterns() ?? []) {
        console.log(pattern.usage.columnIndex, pattern.usage.count);
        console.log(pattern.render.placements, pattern.remnants);
    }
} finally { packed?.dispose(); }
```

Each `PackingResult` is independently disposable and survives its context/report/production. DTOs/Maps are copied. Patterns retain full-pool indices and exact bigint multiplicities without expanding sheets; totals use checked u128 before bigint conversion, including counts beyond 2^53. Original finished-material keys are item IDs, not a raw-material/supplier/mass model. Render placements preserve input positions and carry actual orientation, meters, and stable zero-based loading order; areas use square meters. Rendering data is typed, not an SVG/Canvas UI.

Packing has separate limits: 128 placements per selected pattern, aggregate conservative remnant-work budget `sum((2*n+1)*(n+1)) <= 65536`, and 8 MiB output. Exceeding them throws `PayloadTooLarge`, without truncation or invalidating already-read production/report data. Report pool limits remain 512 columns/4096 placements. Circle occupancy uses actual disk area while geometry/remnants use enclosing squares; remnants retain the original 1e-9 slicing tolerance and do not deduct kerf loss. Thus remnant area is not necessarily whole-sheet minus occupied area, a reclaimable-stock guarantee or a cutting-process certificate. Nondefault rules, tail-sheet optimization and discrete loading remain unbound.

### Portable One-Dimensional Cutting Stock

`ospf-wasm/csp1d` exposes `CuttingContext`, `PatternGenerationResult` and `ProductionResult` for browser, module Worker and Node ESM. Initialize WASM in each realm. Types derive from Rust-generated contracts; quantities, original Simple/N-Same generation, demand contributions and context/MetaModel validation all run in Rust, not TS.

```typescript
import { initialize } from 'ospf-wasm';
import { CuttingContext } from 'ospf-wasm/csp1d';

await initialize();
const cutting = new CuttingContext({
    products: [{ id: 'p', name: 'product', width: [{ value: 30, unit: 'mm' }] }],
    materials: [{ id: 'm', name: 'material', widthRange: {
        lowerBound: { value: 0, unit: 'cm' }, upperBound: { value: 10, unit: 'cm' },
    }, machineId: null, availableBatches: 3n }],
    machines: [], demands: [{ productId: 'p', mode: 'roll', count: 5n }], lengthUnit: 'cm',
});
const candidates = cutting.generatePatterns({ generator: 'nSame', maxPlans: 128, maxKnives: 16 });
const production = cutting.verifyUsages([{ plan: {
    id: 'plan', materialId: 'm', slices: [{ productId: 'p', width: { value: 0.03, unit: 'm' }, amount: 3n }],
}, count: 2n }]);
const artifact = cutting.toArtifact();
const restored = CuttingContext.fromArtifact(artifact);
cutting.dispose(); restored.dispose();
console.log(production.produced().get('p'), production.trimWidth());
console.log(candidates.truncated(), candidates.candidateComplete());
production.dispose(); candidates.dispose();
```

This subset exposes Roll/Sheet discrete demands, static product widths and default material/machine width/batch rules. Lengths normalize to `lengthUnit` through Rust runtime dimension checks. Input counts use bigint/canonical decimal text, but are restricted to [0, 2^53-1] by the current f64 domain; demand, slice and usage counts must be positive. Unsafe counts are rejected, never rounded. Independent checked-u64 aggregate production/batch totals can exceed 2^53 and stay bigint/Map; widths remain f64. `verifyUsages` validates complete source demand, inventory and machine batch limits without expanding individual pieces; it is not a solver or an optimality certificate. `validatePlan` checks one source-bound plan but does not certify the full demand.

Generation defaults to original N-Same with all amounts, or explicit `simple`. Both are restricted generators: **candidateComplete() always returns false**, even when `truncated()` is false. Statistics retain the original counters as bigint. Defaults/maxima are 128/512 plans and 16/64 knives; Simple always uses one knife. Limits are 64 products/demands, 16 materials/machines, 8 widths per product, 512 usages, 64 slice groups/knives per plan and 8 MiB text. Source IDs use 1..128 ASCII letters/digits/underscore/dot/hyphen; plan IDs use the same alphabet up to 512 bytes. Duplicate plans/content/slices and foreign references are rejected, not merged. Artifacts use canonical Rust schema-1.0 text and a source-problem fingerprint, checked again on import.

Contexts, candidates and production results own independent Rust allocations; dispose each. Returned plans, usages and Maps are independent copies. Native CSP1D execution and complete workflow reports are available as described next. Quadratic orchestration is reachable through `modelKind: quadraticOrchestration` (several quadratic backends serially or in parallel, with an explicit result-selection policy and one attempt reported per backend). Vehicle routing with time windows is reachable through `modelKind: vrp` (solved by branch and price; `VrpReport` delivers routes in stop order with per-stop instants and accumulated load). Resilience planning is reachable through `modelKind: networkResilience` (explicit failure scenarios plus connectivity requirements; `NetworkResilienceReport` keeps the realized worst cost apart from the solver epigraph). Transportation allocation is reachable through `modelKind: networkAllocation` (shared quotas plus hub construction, with `AllocationReport` giving shipped amounts per request-service pair). Network structure is reachable through `modelKind: networkStructure` (rooted tree plus facility ownership, no commodity flows). Network design is reachable through `modelKind: networkDesign`, with `NetworkDesignReport` keeping construction cost and operating cost separate. Generalized flow is reachable through `modelKind: networkGeneralizedFlow`, with `GeneralizedFlowReport` keeping arc results (input/output/yield loss/cost) and node residuals apart. Network flow from the original `network-scheduling` crate is reachable through `modelKind: networkFlow`, and `NetworkFlowReport` keeps the domain solution (flows, spills, shortages and four cost components) instead of collapsing it. A multi-backend sweep reuses the framework `ExperimentRunner` through `modelKind: linearSweep` (`LinearSweepReport` gives one verdict per case, sorted by case ID). `CertifiedPricingDuals.verify(artifact, reportJson)` re-checks an optimal LP report against the actual model and returns duals keyed by stable constraint IDs; it never invents a missing dual. A fixed-integer LP sensitivity entry is bound natively through `modelKind: linearSensitivity` (it needs a feasible incumbent), with a `LocalConstraintSensitivityReport` reader whose text the original core `validate` re-checks. An LP solution pool is reachable natively through `modelKind: linearSolutionPool` on the SCIP and Gurobi backends, with a read-only `LinearSolutionPoolReport` reader (it validates self-consistency and never certifies optimality). A read-only `LinearIisReport` reader validates native IIS report text in Rust/WASM (self-consistency only; it never computes an IIS, which needs the Gurobi backend). Costars are declarable, roundtrip losslessly and stay referable from explicit plans, but the original `CostarFiller` has no in-domain caller, so default generators emit no costar slices. The `weight` demand basis converts through declared product length and unit weight; dynamic lengths, yield/waste/length/capacity/switch rules and arbitrary TS callbacks remain unbound. No native fallback or global proof is fabricated.

`context.readProductionReport(text)` reads a source-bound integer-stage artifact emitted by Rust's `encode_csp1d_production_report`. It revalidates the complete pool (including unused columns), source context, actual child mathematics/types/bounds/objective and unchanged raw report identity. Production is derived from the actual report vector, never accepted as an independent payload claim. The `ProductionReport` owns independent data; `summary()` returns a Rust-generated `ProductionReportSummary`, `toJson()` and `solverReportJson()` retain original text, and each `production()` returns an independently disposable `ProductionResult` or undefined without an incumbent. Dispose reports separately. Raw report u64 metadata must not be round-tripped through JS numbers. `restrictedOptimal`/`restrictedInfeasible` apply only to the current pool, `candidateComplete` is always false, and mathematical consistency is not provenance authentication. This synchronous WASM reader does not execute a native solver or expose a complete column-generation trace.

Development acceptance can supply `OSPF_CSP1D_FIXTURE_DIR` explicitly: Rust native integration tests emit ignored real-SCIP/Gurobi integer reports there, and SDK Node/browser/Worker/isolated-package tests consume them without requiring a neighboring checkout or rebuilding report fields in TS. These are test evidence, not committed fixtures or release dependencies.

### Native Cutting-Stock Execution

`Csp1dMilp` and `Csp1dColumnGeneration` reuse Rust's actual domain services through an explicit HTTP or Node client. They require the corresponding advertised domain capability and an explicitly selected compiled linear/MIP backend. WASM provides modeling/calculation/report readers, never Gurobi or SCIP execution.

```typescript
import { NodeClient } from 'ospf-wasm/native';
import { Csp1dColumnGeneration, Csp1dReport } from 'ospf-wasm/csp1d';

const client = await NodeClient.create();
const solver = new Csp1dColumnGeneration(client, {
    backend: 'scip', generation: { maxPlans: 1 },
    poolLimit: 512, iterationLimit: 8, columnsPerIteration: 64,
});
const job = await solver.solve(artifact, { timeLimitMs: 10_000, pollIntervalMs: 10 });
try {
    const report = Csp1dReport.fromJson(job.reportJson!, artifact);
    try {
        console.log(report.summary(), report.traceJson());
        const result = report.production();
        try { console.log(result?.batchCount(), result?.produced()); }
        finally { result?.dispose(); }
    } finally { report.dispose(); }
} finally { await client.release(job.id); }
```

Use `new HttpClient({ baseUrl, token })` instead for the explicitly configured native host; Node bindings are optional and never silently replaced by HTTP. The `artifact` is the independent source from the preceding example. Errors after receiving the job ID retain `jobId` for releasing failed jobs. Cancellation uses `AbortSignal`; progress callbacks receive latest raw child progress, not overall percentages.

Initial generation defaults to 128 plans; pricing reuses the selected Simple/N-Same strategy/knife count within `poolLimit` (default/maximum 512, at least initial maxPlans). Iterations default to 8 (maximum 64); admitted columns per round default to 64 (maximum 512). One total native budget defaults to 60 seconds and covers generation and child solves; bounded generation/compilation is not preemptible, and codec setup is not an end-to-end hard deadline. Phase I uses deficits on the original demand rows with each demand's own Roll/Sheet unit; real backends can recover an infeasible initial pool through restricted pricing. Legacy Rust defaults remain heuristic; SDK facades never use them as a fallback.

`cutting.readExecutionReport(text)` and `Csp1dReport.fromJson(text, source)` validate schema 1.0, source identity, budgets/pool/trace counts, stage order and actual child reports; final production is revalidated by the source-bound integer reader. The complete envelope is limited to 8 MiB. `summary()` is a generated safe contract. `traceJson()`, `stageJson(i)` and `stageReportJson(i)` retain original canonical trace, actual compiled model/child artifact and raw child text with exact u64 counters; do not parse/re-encode these through JS numbers. Out-of-range stage indices return undefined. Each `integerReport()` / `production()` call returns a fresh independent object or undefined. Dispose them separately from reports/contexts and release jobs separately.

Business status, execution stop and restricted child proof are separate. No initial candidates, backend failures, restricted infeasibility, cancellation and time limits do not fabricate production. `candidateComplete` is always false, so successful pricing and final-pool optimality/infeasibility do not prove unrestricted source CSP optimality/infeasibility. Trace telemetry and mathematical consistency are not provenance authentication or independently replayed global certificates.

### Complete-Source MILP Finishing After Benders

Set `sourceMilpFinishing: { reserveTimeMs: 3000 }` explicitly to reserve full-source solve time from the **same**
`timeLimitMs` total, not add another deadline. The reservation is a positive u32 number of milliseconds strictly
below the total (60000 ms when omitted). Omitting finishing preserves existing behavior. The SDK also requires
`bppLoadingSourceFinishing`; old hosts are rejected before submission, without silent downgrade.

```typescript
const solver = new DiscreteLoadingBendersApplicationService(client, {
    backend: 'scip', recourseResources: ['ballast'], iterationLimit: 1,
    sourceMilpFinishing: { reserveTimeMs: 3000 },
});
const job = await solver.solve(source, { timeLimitMs: 10000 });
try {
    const report = DiscreteLoadingBendersReport.fromJson(job.reportJson!, source);
    try {
        console.log(report.summary(), report.sourceFinishingInvoked());
        console.log(report.accelerationApplicationReportJson(), report.certificationReportJson());
        console.log(report.certificationError());
        const plan = report.solution();
        try { console.log(plan?.resources()); } finally { plan?.dispose(); }
    } finally { report.dispose(); }
} finally { await client.release(job.id); }
```

Rust uses the original `DiscreteLoadingCertificationService` with a fresh equivalent complete registration,
copying only validated values as a warm start. Initial construction, acceleration, fallback and intermediate codec
work consume the same budget; finishing receives the remaining time. If acceleration exhausts its stage budget
before registration, reserved time can still start a real ordinary full-source solve, without fabricating old
registration. Construction/compilation is not hard-preemptible, nor is output validation part of a preemptible
backend deadline. Existing verified full-source terminal proofs are retained unchanged, even with cancellation
or exhausted budget, without another solve. Prior cancellation/interruption never starts another backend.
Missing, worse nonoptimal or recoverably failed finishing never discards the previous incumbent. Retention uses
the original Rust transformation to rebuild audits, gaps and proof-free boundaries, not old traces, duals or pools.

`summary()`, `solution()`, `applicationReportJson()` and `solverReportJson()` describe the final selection.
`accelerationApplicationReportJson()` retains the previous original application;
`certificationReportJson()` retains the actual finishing core report even when not selected.
`certificationError()` exposes a recoverable finishing error. `sourceFinishingPresent()` means a stage record
exists; `sourceFinishingInvoked()` requires an actual backend report/error, not merely configuration. For old
reports the accelerator getter returns the original application. Accelerator proof boundaries remain unchanged;
source proofs must originate from actual complete-source fallback/finishing. Import revalidates mathematics and
selection consistency, **not external solver provenance**.

Optional `certification` retains raw atomic texts under protocol major 1. Core/finishing texts each retain 8 MiB
limits and application texts 16 MiB + 1 KiB. Envelopes with finishing evidence allow 128 MiB + 8 KiB;
without it the 64 MiB + 4 KiB limit remains. The default HTTP request limit stays 9 MiB; no large previous report
is reuploaded. Exact u64 metadata stays text, never parsed/re-encoded through JS numbers. This is not a binding
for branch-and-price, custom strategies or BPP3D.

## Shared BPP Partition Lifecycle Primitives

`ospf-wasm/bpp` exposes `PartitionLoadingContext`, `PartitionLoadingMaster`,
`PartitionLoadingPricing` and `PartitionLoadingBatch`. `source.partition(options)` creates an
independent owned registration; disposing the source does not invalidate it. Explicit partitions must
cover every source position exactly once. Declared resources follow their position ownership;
`refinableResources` is an optional whitelist of resource IDs, not raw tokens or callbacks.

`decisions()` provides the actual local decision catalog. `addColumns` accepts complete finite
`ReadonlyMap<string, number>` vectors, never fills missing decisions with zero, and validates the
whole batch before mutation. `columns()` retains exact bigint cargo/count metadata and source-model
weight units. `removeColumns` is atomic and column IDs are never reused. Master rebuilds and successful
pool mutations invalidate old registrations/pricing epochs; failed transactional additions do not.
`acceptLpReport` binds prices only after original full optimal-LP certificate, model identity, mapping
and dual validation. Report-gate failures revoke old prices; revalidating the same report does not revive
old requests. Bare dual arrays are not a substitute for a report. A batch owns copied requests, and
`addPricedBatch` commits all blocks atomically against one current epoch. A successful pool change invalidates that epoch; an empty or fully deduplicated no-op preserves the original Rust epoch semantics.

Master/pricing `toModel()` returns an **opaque compiled-linear artifact**, not the ordinary linear codec:
LP relaxation can retain original token types while solver variable types become continuous. Use the
explicit `SCIPSolver.solveCompiledLinear` / `GurobiSolver.solveCompiledLinear` entry. It requires the
backend's `compiledLinear` capability; old hosts are rejected, with no fallback to ordinary linear, HTTP
or another backend. The Rust compiled-model codec preserves actual metadata and relaxed types. Its
transport/content digest is `ModelArtifact.fingerprint` / `JobView.fingerprint`; the raw core report keeps
its own actual model fingerprint. These digests are deliberately different and must not be relabeled. Original master/pricing rows use stable registration IDs, not process-local counters, so independently reconstructed child artifacts retain the same actual identity.
`objectiveConstant()` is separate from backend `c*x`; do not inject it into an unmodified child report.
Pricing `readReport` revalidates the actual full local model including layout auxiliaries, preserves the
original report text/u64 counters, and returns decisions plus reduced cost including the convexity constant.
`reducedCost` is a read-only snapshot computation, not proof that its request is still current.

```typescript
const partition = source.partition({
    partitions: [{ id: 'left', positionIds: ['a'] }, { id: 'right', positionIds: ['b'] }],
    refinableResources: ['ballast'],
});
// seedColumns contains validated complete per-partition Map vectors.
partition.addColumns(seedColumns);
const master = partition.master();
const job = await new SCIPSolver(client).solveCompiledLinear(master.toModel());
try {
    partition.acceptLpReport(master, job.reportJson!);
    const pricing = partition.pricing(master, 'left');
    try { console.log(pricing.toModel(), pricing.objectiveConstant()); }
    finally { pricing.dispose(); }
} finally { await client.release(job.id); master.dispose(); partition.dispose(); }
```

`master({ integer: true, refineResources: true })` releases only whitelisted continuous resources while
freezing discrete profiles. `sourceValues` / `extractSolution` require complete Float64Array vectors,
reject LP/artificial plans and revalidate the complete original model/domain. `materializeCompletedResources`
atomically adds completed profiles and invalidates the old master; rebuild an integer master afterwards.
Returned physical plans and master/pricing snapshots have independent disposal. Retaining a readable old
snapshot never authorizes reuse in a different session.

Bounds: 1..128 partitions, 4096 pooled columns / 262144 decision entries, 512 inputs per add, and
128 blocks / 512 candidates / 262144 entries per pricing batch. Capacity checks conservatively charge
existing plus all submitted columns/entries, including duplicates before deduplication. Text DTOs and
compiled artifact payloads are limited to 8 MiB; a bounded pool does not guarantee `columns()` fits that
serialized budget, and an oversized getter fails explicitly. Source outer wrappers allow 16 MiB + 1 KiB;
the HTTP request limit remains 9 MiB. Progress, cancellation and job release reuse native execution.

These primitives alone do not run the separately bound original `PartitionColumnGenerationApplicationService`.
Neither entry provides a source-MILP optimality proof, branch-and-price or BPP3D. One pricing round and an optimal restricted final do
not establish the complete source optimum or infeasibility. Real SCIP/Gurobi tests cover these primitives;
WASM/browser/Worker/isolated-package readers reconstruct the actual child artifacts and resource-completed
plans. Explicit-host HTTP tests skip when unconfigured; authenticated in-process HTTP tests are separate.

## Original Native Root-Partition Application

`PartitionColumnGenerationApplicationService` is exported through `ospf-wasm/bpp` and `framework`.
It executes the original Rust service, not a TS loop, using the explicitly selected HTTP or Node client.
Requests use `bpp-loading` / `bppLoading` with exclusive `bppLoadingOptions.partition`; Benders cannot
be combined. The SDK requires `bppLoadingPartitionColumnGeneration` and the selected compiled LP/MIP
backend. Old hosts fail capability checks rather than falling back to ordinary MILP, WASM or HTTP.

```typescript
import { PartitionColumnGenerationApplicationService, PartitionColumnGenerationReport } from 'ospf-wasm/bpp';
const service = new PartitionColumnGenerationApplicationService(client, {
    backend: 'scip',
    partition: { partitions: [{ id: 'left', positionIds: ['a'] }, { id: 'right', positionIds: ['b'] }],
        refinableResources: ['ballast'] },
    iterationLimit: 64, columnLimit: 512, completionColumnLimit: 128, reportLimit: 256,
    sourceMilpFinishing: { reserveTimeMs: 2000 },
});
const job = await service.solve(sourceArtifact, { timeLimitMs: 10_000 });
try {
    const report = PartitionColumnGenerationReport.fromJson(job.reportJson!, sourceArtifact);
    try {
        console.log(report.summary(), report.executionSummary(), report.refinementReportJson(), report.finalReportJson());
        const plan = report.solution();
        try { console.log(plan?.solution(), plan?.resources()); } finally { plan?.dispose(); }
    } finally { report.dispose(); }
} finally { await client.release(job.id); }
```

The original flow seeds each block, runs Phase I and root LP/pricing rounds, submits each round atomically,
optionally solves resource completion and materializes its profiles, then solves an artificial-free restricted
integer final. SCIP uses its existing LP-subproblem defaults to retain certified duals. Each child receives
remaining time and the same cancellation handle; latest-child progress is not overall percentage progress.
One native-job budget includes worker source registration and model construction; preflight validation and
post-solve encoding/replay are not an interruptible end-to-end deadline.

`PartitionColumnGenerationReport` reconstructs the same original Rust service with recorded budget
observations and original child reports, **without reading a clock or executing a backend**. It checks exact
compiled child artifacts, full LP certificates, local/complete-source feasibility, objectives, control-flow
order, monotonic remaining-time/cancellation observations and the final source selection. It preserves all
raw child text and u64 counters. `calls()` exposes ordered original evidence; `executionSummary()` derives
root convergence, root/completion counts, trace and actual refinement/final call indices. Separate terminal
getters preserve raw reports, and `accelerationError()` retains the original recoverable failure after a
validated source incumbent. These are consistency checks, not authentication of external solver provenance.

The root-derived source report is always proof-free: `COMPLETED` can describe a completed restricted final even
when `lpConverged` is false or the root iteration budget ended. Restricted infeasibility/optimality and root
LP convergence are **not** source-MILP infeasibility/optimality or branch-and-price. The original service may
retain a resource-completion incumbent after final failure or cancellation; no extra root solve starts after an
accelerator terminal observation. Plans dispose independently. Explicit reserved complete-source finishing is
documented next; arbitrary trait callbacks remain unbound, while BPP3D one-round execution is available through `Bpp3dOneRoundExecution`.

Defaults/ranges: 64 root rounds (1..64), 512 root columns (partition count..4096), 128 additional completion
columns (0..128, at least partition count when resources are refinable), and 256 child solves (1..1024).
Exhausting the child-report guard follows original service error recovery: without a retained source plan the
job fails explicitly; it does not invent a successful report. At most one guard-error call beyond that cap is
recorded. Each model/report payload remains limited to 8 MiB; accumulated successful child text is limited
to 32 MiB, observations to 16384 and the outer envelope to 128 MiB + 8 KiB. HTTP requests remain 9 MiB.
Real SCIP/Gurobi, authenticated in-process HTTP, isolated npm/N-API, browser and module-Worker tests are
separate gates; standalone HTTP is skipped when not explicitly configured.

### Optional Complete-Source Finishing After Partition Acceleration

Set `sourceMilpFinishing: { reserveTimeMs: 2000 }` on the partition application to opt in. The positive
reservation must be strictly below `timeLimitMs` (default total 60000 ms); it is subtracted from the root
budget, never added to the job deadline. The SDK additionally requires `bppLoadingPartitionSourceFinishing`.
After a successful root application result, the native executor reuses `DiscreteLoadingCertificationService`
on a fresh equivalent full source, passing only the validated complete vector as a warm start. Root
pre-registration timeout may use the reserved time through the original ordinary source service. Prior
cancellation/interruption does not start finishing. Root errors that prevent a valid application result still
fail the job explicitly; this option is not an implicit retry or fallback for arbitrary accelerator failures.

The original root replay remains independent and proof-free. `accelerationApplicationReportJson()` preserves
its exact source report; `applicationReportJson()` / `solverReportJson()` expose the final selected source
result. `certificationReportJson()` and `certificationError()` retain the actual full-source backend evidence,
including exact u64 metadata. `sourceFinishingPresent()` distinguishes a processed finishing stage (including
pre-solve stops), while `sourceFinishingInvoked()` requires an actual report or recoverable backend error.
`calls()`, root trace, refinement/final indices and `accelerationError()` still describe the accelerator only.
The separate complete-source call is not charged to the root child-count/text guard and has its own 8 MiB
report limit, within the same outer envelope and time budget.

The portable reader replays the root service and then applies the shared certification gate: source identity,
complete incumbent/objective, actual-report selection, better-old-plan retention and audit/gap/proof rebuilding.
Only an actual complete-source report can contribute its own proof. Empty/worse unfinished candidates and
recoverable finishing errors retain the validated old plan; contradictory infeasibility or claimed optimality
is rejected. Raw certification text is retained even when a better old incumbent is selected. This verifies
mathematical/evidence consistency, not external solver provenance or full branch-and-price.

`SolveRequest.tuningOptions` is exposed through `SolveOptions.tuning` on the direct `scip`/`gurobi` entries: `threads` (1..=64, the shared SCIP/Gurobi bound), `seed` and `mipGap` (0 <= gap < 1). A nonzero gap may terminate with `GapLimit`, which reports `Feasible` and carries no optimality proof. Domain and framework strategies own their budgets and reject tuning.
