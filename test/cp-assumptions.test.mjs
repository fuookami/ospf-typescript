import assert from "node:assert/strict";
import test from "node:test";
import { initialize, IntegerDomain, ConstraintProgrammingModel, ConstraintProgrammingSnapshot } from "../dist/node.js";
import { SCIPSolver } from "../dist/framework.js";

await initialize();
const high = 9007199254740993n;
const invalid = { code: "InvalidInput" }, disposed = { code: "Disposed" };
const release = (...objects) => objects.forEach(object => object.dispose());

test("all assumption forms derive immutable exact snapshots using stable IDs after builder disposal", () => {
    const model = new ConstraintProgrammingModel("assumption-forms");
    const bool = IntegerDomain.boolean(), domain = IntegerDomain.range(high, high + 3n), sparse = IntegerDomain.values([high, high + 2n]);
    model.addVariable("b", bool); model.addVariable("x", domain);
    const source = model.freeze(), original = source.toJson();
    release(model, bool, domain);
    const assumptions = [
        { kind: "literal", variableId: "b" },
        { kind: "equal", variableId: "x", value: high },
        { kind: "lowerBound", variableId: "x", value: high },
        { kind: "upperBound", variableId: "x", value: high + 2n },
        { kind: "sparseDomain", variableId: "x", domain: sparse },
    ];
    const derived = source.withAssumptions(assumptions);
    const reordered = source.withAssumptions([...assumptions].reverse());
    assert.equal(derived.toJson(), reordered.toJson());
    assert.notEqual(derived.fingerprint(), source.fingerprint());
    assert.equal(source.toJson(), original);
    source.validateAssignment([0n, high + 1n]);
    derived.validateAssignment([1n, high]);
    for (const values of [[0n, high], [1n, high + 1n], [1n, high + 2n]]) assert.throws(() => derived.validateAssignment(values), invalid);
    const noop = source.withAssumptions([]);
    assert.equal(noop.toJson(), original);
    const negated = source.withAssumptions([{ kind: "literal", variableId: "b", negated: true }]);
    negated.validateAssignment([0n, high]);
    assert.throws(() => negated.validateAssignment([1n, high]), invalid);
    const imported = ConstraintProgrammingSnapshot.fromArtifact(derived.toArtifact());
    assert.equal(imported.toJson(), derived.toJson());
    release(source, sparse, derived);
    imported.validateAssignment([1n, high]);
    assert.equal(imported.analyzeMipLowering().status, "inexact");
    release(reordered, noop, negated, imported);
});

test("invalid assumption sets preserve source and reject unknown IDs, duplicates, non-subsets and inexact JS inputs", () => {
    const model = new ConstraintProgrammingModel("assumption-failures");
    const domain = IntegerDomain.values([0n, 2n]), broad = IntegerDomain.range(0n, 2n), outside = IntegerDomain.values([3n]);
    model.addVariable("x", domain);
    const source = model.freeze(), original = source.toJson();
    const equal = { kind: "equal", variableId: "x", value: 0n };
    for (const assumptions of [
        [{ ...equal, variableId: "missing" }], [equal, equal], [{ ...equal, value: 1n }],
        [{ kind: "literal", variableId: "x" }], [{ kind: "lowerBound", variableId: "x", value: 3n }],
        [{ kind: "upperBound", variableId: "x", value: -1n }],
        [{ kind: "sparseDomain", variableId: "x", domain: broad }],
        [{ kind: "sparseDomain", variableId: "x", domain: outside }],
        [{ ...equal, value: 2 ** 53 }], [{ ...equal, value: 1n << 63n }],
        [{ kind: "literal", variableId: "x", negated: "true" }],
        [{ ...equal, kind: "notAnAssumption" }], [{ ...equal, variableId: 0 }],
    ]) {
        assert.throws(() => source.withAssumptions(assumptions), invalid);
        assert.equal(source.toJson(), original);
    }
    broad.dispose();
    assert.throws(() => source.withAssumptions([{ kind: "sparseDomain", variableId: "x", domain: broad }]), disposed);
    const good = source.withAssumptions([equal]);
    good.validateAssignment([0n]);
    release(source);
    assert.throws(() => source.withAssumptions([]), disposed);
    assert.throws(() => source.analyzeMipLowering(), disposed);
    release(model, domain, outside, good);
});

test("contradictory but individually valid assumptions remain an infeasible model, not an ignored restriction", () => {
    const model = new ConstraintProgrammingModel("contradictory");
    const domain = IntegerDomain.boolean(); model.addVariable("b", domain);
    const source = model.freeze(), derived = source.withAssumptions([
        { kind: "literal", variableId: "b" }, { kind: "literal", variableId: "b", negated: true },
    ]);
    for (const value of [0n, 1n]) assert.throws(() => derived.validateAssignment([value]), invalid);
    assert.equal(derived.analyzeMipLowering().status, "lowered");
    release(model, domain, source, derived);
});

test("MIP preflight returns exact source counts and lossless numeric failures without mutating the snapshot", () => {
    const model = new ConstraintProgrammingModel("preflight");
    const domain = IntegerDomain.range(0n, 2n), x = model.addVariable("x", domain);
    const expression = x.toExpression(), constraint = expression.ge(1n);
    model.addConstraint(constraint, { id: "minimum" });
    const snapshot = model.freeze(), original = snapshot.toJson();
    const result = snapshot.analyzeMipLowering();
    assert.deepEqual(result, { status: "lowered", fingerprint: snapshot.fingerprint(), sourceVariables: 1, auxiliaryVariables: 1,
        sourceConstraints: 1, generatedConstraints: 4, booleanAuxiliaries: 1, tableTuples: 0 });
    assert.equal(snapshot.toJson(), original);
    const exact = new ConstraintProgrammingModel("inexact"), exactDomain = IntegerDomain.values([high]);
    exact.addVariable("x", exactDomain);
    const exactSnapshot = exact.freeze(), failure = exactSnapshot.analyzeMipLowering();
    assert.equal(failure.status, "inexact");
    assert.equal(failure.value, high.toString());
    assert.equal(typeof failure.field, "string");
    release(model, domain, expression, constraint, snapshot, exact, exactDomain, exactSnapshot);
});

test("MIP preflight counts constant columns and rejects inexact objective sums", () => {
    for (const constant of [7n, 9007199254740992n]) {
        const model = new ConstraintProgrammingModel("constant-preflight"), domain = IntegerDomain.boolean();
        const x = model.addVariable("x", domain), expression = model.integerExpression([[x, 1n]], constant);
        model.setObjective(expression);
        const snapshot = model.freeze(), analysis = snapshot.analyzeMipLowering();
        if (constant === 7n) {
            assert.equal(analysis.status, "lowered");
            assert.equal(analysis.auxiliaryVariables, 3);
        } else {
            assert.deepEqual(analysis, { status: "inexact", field: "objective.absoluteTermBounds", value: "9007199254740993" });
        }
        release(model, domain, expression, snapshot);
    }
    const model = new ConstraintProgrammingModel("zero-constant-inexact"), domain = IntegerDomain.range(1n, 1n);
    const x = model.addVariable("x", domain), y = model.addVariable("y", domain);
    const expression = model.integerExpression([[x, 9007199254740992n], [y, 1n]], 0n);
    model.setObjective(expression, "maximize");
    const snapshot = model.freeze();
    assert.deepEqual(snapshot.analyzeMipLowering(), { status: "inexact", field: "objective.absoluteTermBounds", value: "9007199254740993" });
    const exact = model.integerExpression([[x, 9007199254740992n]], 0n);
    model.setObjective(exact, "maximize");
    const boundary = model.freeze();
    assert.equal(boundary.analyzeMipLowering().status, "lowered");
    release(exact, boundary);
    release(model, domain, expression, snapshot);
});

test("older CP hosts receive only snapshots without objective constants", async () => {
    let submissions = 0, supportsConstant = false;
    const client = {
        async capabilities() { return { protocolVersion: 1, backends: [{ id: "scip", compiled: true,
            capabilities: ["cpExactLowering", ...(supportsConstant ? ["cpObjectiveConstant"] : [])], warnings: [] }] }; },
        async submit(request) { submissions++; return { protocolVersion: 1, id: "job", fingerprint: request.model.fingerprint,
            status: "completed", reportJson: "report", progressJson: null, error: null }; },
    };
    const model = new ConstraintProgrammingModel("old-host"), domain = IntegerDomain.boolean();
    const x = model.addVariable("x", domain), zero = model.integerExpression([[x, 1n]], 0n);
    model.setObjective(zero);
    const withoutConstant = model.freeze();
    const nonzero = model.integerExpression([[x, 1n]], 7n);
    model.setObjective(nonzero);
    const withConstant = model.freeze(), solver = new SCIPSolver(client);
    await assert.rejects(solver.solveConstraintProgramming(withConstant.toArtifact()), { code: "UnsupportedCapability" });
    assert.equal(submissions, 0);
    const bad = { ...withoutConstant.toArtifact(), fingerprint: "wrong" };
    await assert.rejects(solver.solveConstraintProgramming(bad), { code: "FingerprintMismatch" });
    assert.equal(submissions, 0);
    await solver.solveConstraintProgramming(withoutConstant.toArtifact());
    assert.equal(submissions, 1);
    const inexactModel = new ConstraintProgrammingModel("old-host-inexact"), one = IntegerDomain.range(1n, 1n);
    const x1 = inexactModel.addVariable("x", one), y1 = inexactModel.addVariable("y", one);
    const inexactExpression = inexactModel.integerExpression([[x1, 9007199254740992n], [y1, 1n]], 0n);
    inexactModel.setObjective(inexactExpression, "maximize");
    const inexact = inexactModel.freeze();
    await assert.rejects(solver.solveConstraintProgramming(inexact.toArtifact()), { code: "UnsupportedCapability" });
    assert.equal(submissions, 1);
    supportsConstant = true;
    await solver.solveConstraintProgramming(withConstant.toArtifact());
    assert.equal(submissions, 2);
    release(model, domain, zero, nonzero, withoutConstant, withConstant, inexactModel, one, inexactExpression, inexact);
});

test("MIP preflight retains default-disabled formulations and table budgets as structured outcomes", () => {
    const model = new ConstraintProgrammingModel("unsupported");
    const zero = model.integerExpression(), constraint = model.circuit([zero]);
    model.addConstraint(constraint, { id: "circuit" });
    const snapshot = model.freeze();
    assert.deepEqual(snapshot.analyzeMipLowering(), { status: "unsupported", constraint: "circuit", feature: "circuit" });
    const cumulative = new ConstraintProgrammingModel("disabled-cumulative"), start = cumulative.integerExpression(), end = cumulative.integerExpression([], 1n);
    const interval = cumulative.addInterval({ id: "task", start, end, duration: 1n });
    const capacity = cumulative.cumulative([{ interval, demand: 1n }], 1n);
    cumulative.addConstraint(capacity, { id: "capacity" });
    const cumulativeSnapshot = cumulative.freeze();
    cumulativeSnapshot.validateAssignment([]);
    assert.deepEqual(cumulativeSnapshot.analyzeMipLowering(), { status: "unsupported", constraint: "capacity", feature: "cumulative" });
    const tableModel = new ConstraintProgrammingModel("table-budget"), domain = IntegerDomain.range(0n, 10000n);
    const x = tableModel.addVariable("x", domain);
    const table = tableModel.allowedAssignments([x], Array.from({ length: 10001 }, (_, index) => [BigInt(index)]));
    tableModel.addConstraint(table, { id: "table" });
    const tableSnapshot = tableModel.freeze(), result = tableSnapshot.analyzeMipLowering();
    assert.equal(result.status, "budgetExceeded");
    assert.equal(result.limit, 10000);
    assert.equal(result.actual, 10001);
    assert.equal(typeof result.resource, "string");
    tableSnapshot.validateAssignment([10000n]);
    release(model, zero, constraint, snapshot, cumulative, start, end, capacity, cumulativeSnapshot, tableModel, domain, table, tableSnapshot);
});
