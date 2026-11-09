import assert from "node:assert/strict";
import test from "node:test";
import {
    initialize, IntegerDomain, ConstraintProgrammingModel, ConstraintProgrammingSnapshot, ConstraintActivityAnalyzer,
} from "../dist/node.js";

await initialize();
const invalid = { code: "InvalidInput" };
const foreign = { code: "InvalidReference" };
const disposed = { code: "Disposed" };
const high = 9007199254740993n;
const release = (...objects) => objects.forEach(object => object.dispose());
function unchanged(model, operation) {
    const before = model.freeze();
    assert.throws(operation, invalid);
    const after = model.freeze();
    assert.equal(after.toJson(), before.toJson());
    release(before, after);
}

test("implication and all reification directions preserve original truth tables and AST lifetimes", () => {
    for (const direction of ["implication", "equivalent", "impliedByLiteral", "impliesLiteral"]) {
        for (const negated of [false, true]) {
            const model = new ConstraintProgrammingModel(`reification-${direction}-${negated}`);
            const domain = IntegerDomain.boolean();
            const b = model.addVariable("b", domain), x = model.addVariable("x", domain);
            const expression = x.toExpression(), original = expression.eq(1n);
            const literal = { variable: b, negated };
            const constraint = direction === "implication" ? model.implication(literal, original) : model.reification(literal, original, direction);
            release(expression, original);
            model.addConstraint(constraint, { id: "relation" });
            const snapshot = model.freeze();
            for (const bv of [0n, 1n]) for (const xv of [0n, 1n]) {
                const truth = negated ? bv === 0n : bv === 1n;
                const satisfied = direction === "equivalent" ? truth === (xv === 1n) : direction === "impliesLiteral" ? xv === 0n || truth : !truth || xv === 1n;
                if (satisfied) snapshot.validateAssignment([bv, xv]);
                else assert.throws(() => snapshot.validateAssignment([bv, xv]), invalid);
            }
            const imported = ConstraintProgrammingSnapshot.fromJson(snapshot.toJson());
            assert.equal(imported.toJson(), snapshot.toJson());
            release(domain, constraint, snapshot, imported, model);
        }
    }
});

test("expression all-different and Element retain exact values beyond 2^53", () => {
    const model = new ConstraintProgrammingModel("global-expressions");
    const indexDomain = IntegerDomain.range(0n, 1n), exact = IntegerDomain.values([high, high + 2n]);
    const i = model.addVariable("i", indexDomain), value = model.addVariable("v", exact);
    const target = value.toExpression(), shifted = target.add(1n);
    const element = model.element({ index: i, values: new BigInt64Array([high, high + 2n]), target });
    const different = model.allDifferent([shifted, value]);
    model.addConstraint(element, { id: "element" });
    model.addConstraint(different, { id: "different" });
    release(target, shifted);
    const snapshot = model.freeze();
    snapshot.validateAssignment([0n, high]);
    snapshot.validateAssignment([1n, high + 2n]);
    assert.throws(() => snapshot.validateAssignment([0n, high + 2n]), invalid);
    assert.match(snapshot.toJson(), /9007199254740993/);
    assert.throws(() => model.element({ index: i, values: [1n << 63n], target: value }), invalid);
    const empty = model.element({ index: i, values: [], target: value });
    unchanged(model, () => model.addConstraint(empty, { id: "invalid" }));
    const report = new ConstraintActivityAnalyzer().analyzeCp(snapshot, [0n, high]);
    assert.equal(report.status("different"), "ACTIVE");
    assert.equal(report.slack("different"), 0);
    release(indexDomain, exact, element, different, empty, snapshot, report, model);
});

test("allowed and forbidden expression tables validate rows without widening or bigint wrapping", () => {
    const model = new ConstraintProgrammingModel("tables");
    const domain = IntegerDomain.range(0n, 2n);
    const x = model.addVariable("x", domain), y = model.addVariable("y", domain);
    const expression = model.integerExpression([[x, 1n]], 1n);
    const allowed = model.allowedAssignments([expression, y], [[1n, 2n], new BigInt64Array([2n, 1n])]);
    const forbidden = model.forbiddenAssignments([expression, y], [[2n, 1n]]);
    model.addConstraint(allowed, { id: "allowed" });
    model.addConstraint(forbidden, { id: "forbidden" });
    expression.dispose();
    const snapshot = model.freeze();
    snapshot.validateAssignment([0n, 2n]);
    assert.throws(() => snapshot.validateAssignment([1n, 1n]), invalid);
    assert.throws(() => snapshot.validateAssignment([0n, 0n]), invalid);
    assert.throws(() => model.allowedAssignments([x, y], [[1n]]), invalid);
    assert.throws(() => model.allowedAssignments([x], [[1n << 63n]]), invalid);
    assert.throws(() => model.forbiddenAssignments([x], [[1]]), invalid);
    release(domain, allowed, forbidden, snapshot, model);

    for (const [allowedTable, tuples, accepted] of [[true, [[]], true], [true, [], false], [false, [[]], false], [false, [], true]]) {
        const empty = new ConstraintProgrammingModel("zero-column-table");
        const constraint = allowedTable ? empty.allowedAssignments([], tuples) : empty.forbiddenAssignments([], tuples);
        empty.addConstraint(constraint, { id: "table" });
        const snapshot = empty.freeze();
        if (accepted) snapshot.validateAssignment([]);
        else assert.throws(() => snapshot.validateAssignment([]), invalid);
        release(constraint, snapshot, empty);
    }
});

test("Circuit rejects disconnected subtours and retains source successor semantics", () => {
    const model = new ConstraintProgrammingModel("circuit");
    const domain = IntegerDomain.range(0n, 2n);
    const successors = ["a", "b", "c"].map(id => model.addVariable(id, domain));
    const constraint = model.circuit(successors);
    model.addConstraint(constraint, { id: "tour" });
    const snapshot = model.freeze();
    snapshot.validateAssignment([1n, 2n, 0n]);
    assert.throws(() => snapshot.validateAssignment([1n, 0n, 2n]), invalid);
    assert.throws(() => snapshot.validateAssignment([0n, 1n, 2n]), invalid);
    const empty = model.circuit([]);
    unchanged(model, () => model.addConstraint(empty, { id: "empty" }));
    release(domain, constraint, snapshot, empty, model);
});

test("Automaton keeps exact i64 labels and checks i32 state boundaries before TypedArray conversion", () => {
    const model = new ConstraintProgrammingModel("automaton");
    const domain = IntegerDomain.values([high, high + 1n]);
    const a = model.addVariable("a", domain), b = model.addVariable("b", domain);
    const zero = -2147483648, one = 2147483647;
    const options = {
        initialState: zero, finalStates: new Int32Array([zero]),
        transitions: [
            { fromState: zero, value: high, toState: zero }, { fromState: zero, value: high + 1n, toState: one },
            { fromState: one, value: high, toState: one }, { fromState: one, value: high + 1n, toState: zero },
        ],
    };
    const constraint = model.automaton([a, b], options);
    model.addConstraint(constraint, { id: "parity" });
    const snapshot = model.freeze();
    snapshot.validateAssignment([high, high]);
    snapshot.validateAssignment([high + 1n, high + 1n]);
    assert.throws(() => snapshot.validateAssignment([high, high + 1n]), invalid);
    for (const bad of [-2147483649, 2147483648, NaN, Infinity, 0.5]) {
        assert.throws(() => model.automaton([a], { ...options, initialState: bad }), invalid);
        assert.throws(() => model.automaton([a], { ...options, finalStates: [bad] }), invalid);
        assert.throws(() => model.automaton([a], { ...options, transitions: [{ fromState: bad, value: high, toState: zero }] }), invalid);
    }
    const duplicate = model.automaton([a], { ...options, transitions: [options.transitions[0], options.transitions[0]] });
    unchanged(model, () => model.addConstraint(duplicate, { id: "invalid" }));
    assert.throws(() => model.automaton([a], { ...options, transitions: [{ fromState: zero, value: 1n << 63n, toState: zero }] }), invalid);
    release(domain, constraint, snapshot, duplicate, model);
});

test("variable-duration intervals, negative presence and Cumulative reuse core scheduling semantics", () => {
    const model = new ConstraintProgrammingModel("cumulative");
    const time = IntegerDomain.range(0n, 6n), duration = IntegerDomain.range(0n, 2n), bool = IntegerDomain.boolean();
    const d = model.addVariable("d", duration), e = model.addVariable("e", time), p = model.addVariable("p", bool), s = model.addVariable("s", duration);
    const start = s.toExpression(), end = e.toExpression();
    const fixedStart = model.integerExpression([], 1n), fixedEnd = model.integerExpression([], 3n);
    const variable = model.addInterval({ id: "variable", start, end, duration: d, presence: { variable: p, negated: true } });
    const fixed = model.addInterval({ id: "fixed", start: fixedStart, end: fixedEnd, duration: 2n });
    const tasks = [{ interval: variable, demand: 2n }, { interval: fixed, demand: 2n }];
    const cumulative = model.cumulative(tasks, 3n);
    model.addConstraint(cumulative, { id: "capacity" });
    const snapshot = model.freeze();
    snapshot.validateAssignment([0n, 1n, 0n, 1n]);
    snapshot.validateAssignment([2n, 0n, 1n, 2n]);
    assert.throws(() => snapshot.validateAssignment([2n, 2n, 0n, 0n]), invalid);
    assert.throws(() => snapshot.validateAssignment([2n, 1n, 0n, 0n]), invalid);
    assert.doesNotMatch(snapshot.intervalValuesJson([2n, 0n, 1n, 2n]), /"variable"/);
    const negative = model.cumulative(tasks, -1n), duplicate = model.cumulative([tasks[0], tasks[0]], 3n);
    unchanged(model, () => model.addConstraint(negative, { id: "negative" }));
    unchanged(model, () => model.addConstraint(duplicate, { id: "duplicate" }));
    release(time, duration, bool, start, end, fixedStart, fixedEnd, cumulative, snapshot, negative, duplicate, model);
});

test("Reservoir aggregates simultaneous events before checking exact level bounds", () => {
    const model = new ConstraintProgrammingModel("reservoir");
    const time = IntegerDomain.range(0n, 1n);
    const a = model.addVariable("a", time), b = model.addVariable("b", time);
    const up = model.integerExpression([], 2n), down = model.integerExpression([], -2n);
    const options = { events: [{ time: a, levelChange: up }, { time: b, levelChange: down }], initialLevel: high, minimumLevel: high, maximumLevel: high + 1n };
    const reservoir = model.reservoir(options);
    model.addConstraint(reservoir, { id: "level" });
    release(up, down);
    const snapshot = model.freeze();
    snapshot.validateAssignment([0n, 0n]);
    snapshot.validateAssignment([1n, 1n]);
    assert.throws(() => snapshot.validateAssignment([0n, 1n]), invalid);
    assert.throws(() => snapshot.validateAssignment([1n, 0n]), invalid);
    const zero = model.integerExpression();
    const bad = model.reservoir({ events: [{ time: a, levelChange: zero }], initialLevel: 1n, minimumLevel: 2n, maximumLevel: 3n });
    unchanged(model, () => model.addConstraint(bad, { id: "bad" }));
    const empty = model.reservoir({ ...options, events: [] });
    unchanged(model, () => model.addConstraint(empty, { id: "empty" }));
    release(time, reservoir, snapshot, zero, bad, empty, model);
});

test("new CP factories reject foreign model objects and disposed expression batches", () => {
    const model = new ConstraintProgrammingModel("owner"), other = new ConstraintProgrammingModel("other");
    const domain = IntegerDomain.boolean();
    const x = model.addVariable("x", domain), y = other.addVariable("x", domain);
    const expression = x.toExpression(), foreignExpression = y.toExpression(), relation = expression.eq(0n);
    assert.throws(() => model.allDifferent([foreignExpression]), foreign);
    assert.throws(() => model.allowedAssignments([y], [[0n]]), foreign);
    assert.throws(() => model.element({ index: x, values: [0n, 1n], target: foreignExpression }), foreign);
    assert.throws(() => model.implication(y, relation), foreign);
    assert.throws(() => other.reification(y, relation), foreign);
    assert.throws(() => model.circuit([foreignExpression]), foreign);
    assert.throws(() => model.reservoir({ events: [{ time: x, levelChange: foreignExpression }], initialLevel: 0n, minimumLevel: 0n, maximumLevel: 1n }), foreign);
    assert.throws(() => model.addInterval({ id: "foreign-duration", start: expression, end: expression, duration: y }), foreign);
    expression.dispose();
    assert.throws(() => model.allDifferent([expression]), disposed);
    const valid = model.allDifferent([x]);
    model.addConstraint(valid, { id: "valid-after-error" });
    model.dispose();
    assert.throws(() => model.circuit([x]), disposed);
    release(other, domain, foreignExpression, relation, valid);
});
