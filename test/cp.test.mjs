import assert from "node:assert/strict";
import test from "node:test";
import {
    initialize, IntegerDomain, ConstraintProgrammingModel, ConstraintProgrammingSnapshot,
    ConstraintActivityAnalyzer, ConstraintActivityReport, MetaModel,
} from "../dist/node.js";

await initialize();
const high = 9007199254740993n;
const min = -(1n << 63n), max = (1n << 63n) - 1n;
const invalid = { code: "InvalidInput" };

test("CP domains preserve i64 bounds, sparse membership and full-domain cardinality", () => {
    const full = IntegerDomain.range(min, max);
    assert.equal(full.lower(), min);
    assert.equal(full.upper(), max);
    assert.equal(full.cardinality(), 1n << 64n);
    const sparse = IntegerDomain.values([high + 2n, high, high]);
    assert.equal(sparse.cardinality(), 2n);
    assert.equal(sparse.contains(high + 1n), false);
    assert.equal(sparse.contains(high + 2n), true);
    for (const value of [min - 1n, max + 1n, 1, NaN]) {
        assert.throws(() => IntegerDomain.range(value, max), invalid);
        assert.throws(() => IntegerDomain.values([value]), invalid);
        assert.throws(() => sparse.contains(value), invalid);
    }
    assert.throws(() => IntegerDomain.values([]), invalid);
    assert.throws(() => IntegerDomain.range(2n, 1n), invalid);
    full.dispose(); sparse.dispose();
    assert.throws(() => sparse.lower(), { code: "Disposed" });
});

test("CP exact expressions, atomic registration and independent canonical snapshots", () => {
    const model = new ConstraintProgrammingModel("exact", "sdk-cp-tests");
    const domain = IntegerDomain.range(high, high + 5n);
    const z = model.addVariable("z", domain);
    domain.dispose();
    const bool = IntegerDomain.boolean();
    const a = model.addVariable("a", bool);
    const expr = model.integerExpression([[z, 1n]], 3n);
    assert.equal(expr.evaluate([high, 1n]), high + 3n);
    assert.throws(() => expr.evaluate([high]), invalid);
    assert.throws(() => expr.evaluate([max + 1n, 1n]), invalid);
    assert.throws(() => expr.mul(max), invalid);
    const relation = expr.ge(high + 3n);
    model.addConstraint(relation, { id: "minimum", group: "limits", origin: "sdk" });
    model.setObjective(expr);
    const snapshot = model.freeze();
    assert.deepEqual(snapshot.variableIds(), ["a", "z"]);
    assert.equal(snapshot.objectiveValue([1n, high]), high + 3n);
    snapshot.validateAssignment(new BigInt64Array([1n, high]));
    assert.throws(() => snapshot.validateAssignment([high, 1n]), invalid);
    const json = snapshot.toJson();
    assert.match(json, /9007199254740993/);
    assert.throws(() => model.addVariable("z", bool), invalid);
    assert.throws(() => model.addConstraint(relation, { id: "minimum" }), invalid);
    assert.throws(() => model.setObjective(expr, "minimize", ""), invalid);
    assert.equal(model.freeze().toJson(), json);
    model.clearObjective();
    assert.equal(model.freeze().objectiveValue([1n, high]), undefined);
    assert.equal(snapshot.toJson(), json);
    model.dispose();
    assert.throws(() => expr.evaluate([high, 1n]), { code: "Disposed" });
    assert.throws(() => z.toExpression(), { code: "Disposed" });
    snapshot.validateAssignment([1n, high]);
    const restored = ConstraintProgrammingSnapshot.fromJson(json);
    assert.equal(restored.toJson(), json);
    const artifact = snapshot.toArtifact();
    const copy = ConstraintProgrammingSnapshot.fromArtifact(artifact);
    assert.equal(copy.fingerprint(), snapshot.fingerprint());
    assert.throws(() => ConstraintProgrammingSnapshot.fromArtifact({ ...artifact, fingerprint: "wrong" }), { code: "FingerprintMismatch" });
    for (const corrupt of [json + " ", json.replace("9007199254740993", "9007199254740994"), json.replace('"1.0"', '"99.0"')]) {
        assert.throws(() => ConstraintProgrammingSnapshot.fromJson(corrupt), invalid);
    }
    for (const value of [bool, expr, relation, snapshot, restored, copy]) value.dispose();
    assert.throws(() => snapshot.toJson(), { code: "Disposed" });
});

test("CP Boolean and all-different semantics retain model ownership", () => {
    const bool = IntegerDomain.boolean();
    const model = new ConstraintProgrammingModel("boolean");
    const a = model.addVariable("a", bool), b = model.addVariable("b", bool);
    const one = model.booleanConstraint("exactlyOne", [{ variable: a }, { variable: b }]);
    const different = model.allDifferent([a, b]);
    model.addConstraint(one, { id: "one" });
    model.addConstraint(different, { id: "different" });
    const snapshot = model.freeze();
    snapshot.validateAssignment([0n, 1n]);
    assert.throws(() => snapshot.validateAssignment([1n, 1n]), invalid);
    const other = new ConstraintProgrammingModel("other");
    const foreign = other.addVariable("a", bool);
    assert.throws(() => model.allDifferent([foreign]), { code: "InvalidReference" });
    assert.throws(() => other.addConstraint(one, { id: "foreign" }), { code: "InvalidReference" });
    const aexpr = a.toExpression(), foreignExpr = foreign.toExpression();
    assert.throws(() => aexpr.add(foreignExpr), { code: "InvalidReference" });
    for (const value of [bool, one, different, snapshot, model, other, aexpr, foreignExpr]) value.dispose();
});

test("all Boolean factories and negated literals match Rust source semantics", () => {
    const bool = IntegerDomain.boolean();
    const cases = [
        ["literal", [false], [[0n, false], [1n, true]]],
        ["and", [false, true], [[0n, 0n, false], [1n, 0n, true], [1n, 1n, false]]],
        ["or", [false, false], [[0n, 0n, false], [1n, 0n, true], [1n, 1n, true]]],
        ["xor", [false, false], [[0n, 0n, false], [1n, 0n, true], [1n, 1n, false]]],
        ["atMostOne", [false, false], [[0n, 0n, true], [1n, 0n, true], [1n, 1n, false]]],
        ["exactlyOne", [false, false], [[0n, 0n, false], [1n, 0n, true], [1n, 1n, false]]],
    ];
    for (const [operation, negations, assignments] of cases) {
        const model = new ConstraintProgrammingModel(`boolean-${operation}`);
        const variables = negations.map((_, index) => model.addVariable(`v${index}`, bool));
        const constraint = model.booleanConstraint(operation, variables.map((variable, index) => ({ variable, negated: negations[index] })));
        model.addConstraint(constraint, { id: "boolean" });
        const snapshot = model.freeze();
        for (const assignment of assignments) {
            const values = assignment.slice(0, -1), expected = assignment.at(-1);
            if (expected) snapshot.validateAssignment(values);
            else assert.throws(() => snapshot.validateAssignment(values), invalid);
        }
        for (const value of [constraint, snapshot, model]) value.dispose();
    }
    bool.dispose();
});

test("invalid CP Boolean registration and forged references do not mutate the builder", () => {
    const model = new ConstraintProgrammingModel("atomic");
    const domain = IntegerDomain.range(0n, 2n), bool = IntegerDomain.boolean();
    const nonBoolean = model.addVariable("non-boolean", domain);
    const before = model.freeze(), json = before.toJson();
    const constraint = model.booleanConstraint("literal", [{ variable: nonBoolean }]);
    assert.throws(() => model.addConstraint(constraint, { id: "invalid" }), invalid);
    assert.throws(() => model.integerExpression([[{ ...nonBoolean }, 1n]]), { code: "InvalidReference" });
    const after = model.freeze();
    assert.equal(after.toJson(), json);
    const added = model.addVariable("valid", bool);
    assert.equal(added.index, 1);
    for (const value of [domain, bool, constraint, before, after, model]) value.dispose();
});

test("named CP options reject unknown fields instead of silently changing semantics", () => {
    const model = new ConstraintProgrammingModel("typo-options");
    const bool = IntegerDomain.boolean(), variable = model.addVariable("b", bool);
    const zero = model.integerExpression(), one = model.integerExpression([], 1n);
    // 拼错 presence 会让可选区间静默变成必选，必须报错。/ A misspelled `presence` would silently make the interval mandatory.
    assert.throws(() => model.addInterval({ id: "t", start: zero, end: one, duration: 1n, presents: { variable, negated: false } }), { code: "InvalidInput" });
    assert.throws(() => model.addInterval({ id: "t", start: zero, end: one, durations: 1n }), { code: "InvalidInput" });
    // 正确写法仍然可用 / The correct shape still works.
    const interval = model.addInterval({ id: "t", start: zero, end: one, duration: 1n });
    assert.ok(interval);
    for (const value of [bool, zero, one]) value.dispose();
    model.dispose();
});

test("CP intervals enforce no-overlap, optional presence and exact interval text", () => {
    const model = new ConstraintProgrammingModel("schedule");
    const domain = IntegerDomain.range(high, high + 10n), bool = IntegerDomain.boolean();
    const a = model.addVariable("a", domain), b = model.addVariable("b", domain), p = model.addVariable("p", bool);
    const startA = a.toExpression(), endA = startA.add(2n);
    const startB = b.toExpression(), endB = startB.add(2n);
    const first = model.addInterval({ id: "first", start: startA, duration: 2n, end: endA });
    const second = model.addInterval({ id: "second", start: startB, duration: 2n, end: endB, presence: p });
    const noOverlap = model.noOverlap([first, second]);
    model.addConstraint(noOverlap, { id: "no-overlap" });
    const snapshot = model.freeze();
    snapshot.validateAssignment([high, high + 2n, 1n]);
    assert.throws(() => snapshot.validateAssignment([high, high + 1n, 1n]), invalid);
    snapshot.validateAssignment([high, high, 0n]);
    const intervals = snapshot.intervalValuesJson([high, high, 0n]);
    assert.match(intervals, /9007199254740993/);
    assert.match(intervals, /"first"/);
    assert.doesNotMatch(intervals, /"second"/);
    assert.throws(() => model.addInterval({ id: "first", start: startA, duration: 2n, end: endA }), invalid);
    assert.equal(model.freeze().toJson(), snapshot.toJson());
    for (const value of [domain, bool, startA, endA, startB, endB, noOverlap, snapshot, model]) value.dispose();
});

test("CP activity permits violations while preserving exact integer evidence", () => {
    const model = new ConstraintProgrammingModel("diagnostics");
    const domain = IntegerDomain.range(high, high + 5n);
    const x = model.addVariable("x", domain), expression = x.toExpression();
    const constraint = expression.le(high);
    model.addConstraint(constraint, { id: "capacity" });
    const snapshot = model.freeze(), analyzer = new ConstraintActivityAnalyzer();
    const report = analyzer.analyzeCp(snapshot, [high + 1n]);
    assert.deepEqual(report.constraintIds(), ["capacity"]);
    assert.equal(report.status("capacity"), "VIOLATED");
    assert.equal(report.satisfied("capacity"), false);
    assert.equal(report.integerLhs("capacity"), high + 1n);
    assert.equal(report.integerRhs("capacity"), high);
    const json = report.toJson();
    assert.match(json, /9007199254740993/);
    const restored = ConstraintActivityReport.fromJson(json);
    assert.equal(restored.integerRhs("capacity"), high);
    assert.throws(() => report.status("unknown"), invalid);
    for (const options of [{ tolerance: NaN }, { relativeTolerance: Infinity }, { tolerance: -1 }, { tolerance: 1, nearlyActiveTolerance: 0 }]) {
        assert.throws(() => new ConstraintActivityAnalyzer(options).analyzeCp(snapshot, [high]), invalid);
    }
    assert.throws(() => analyzer.analyzeCp(snapshot, []), invalid);
    assert.throws(() => ConstraintActivityReport.fromJson(json.replace('"1.0"', '"99.0"')), invalid);
    model.dispose(); snapshot.dispose();
    assert.equal(report.integerRhs("capacity"), high);
    for (const value of [domain, expression, constraint, report, restored]) value.dispose();
    assert.throws(() => report.toJson(), { code: "Disposed" });
});

test("linear activity verifies model fingerprints and candidate shapes without a solver", () => {
    const model = new MetaModel("linear-diagnostics");
    const x = model.addVariable("x", { lowerBound: 0, upperBound: 10 });
    model.addLinearConstraint({ name: "limit", terms: [[x, 1]], relation: "le", rhs: 4 });
    const artifact = model.toLinearTriadModel(), analyzer = new ConstraintActivityAnalyzer();
    const report = analyzer.analyzeLinear(artifact, new Float64Array([5]));
    const [id] = report.constraintIds();
    assert.equal(report.status(id), "VIOLATED");
    assert.equal(report.integerLhs(id), undefined);
    assert.equal(report.slack(id), -1);
    assert.throws(() => analyzer.analyzeLinear({ ...artifact, fingerprint: "wrong" }, new Float64Array([5])), { code: "FingerprintMismatch" });
    assert.throws(() => analyzer.analyzeLinear(artifact, new Float64Array()), invalid);
    assert.throws(() => analyzer.analyzeLinear(artifact, new Float64Array([NaN])), invalid);
    // 候选漏斗只做排序与分组，不伪造分层：没有对偶证据时不得出现 Tier A/B。
    // The funnel only ranks and groups; it never fabricates tiers, so Tier A/B cannot appear without dual evidence.
    const funnel = report.candidateFunnel();
    assert.equal(funnel.hasDualEvidence, false);
    assert.equal(funnel.tierA, 0);
    assert.equal(funnel.tierB, 0);
    assert.equal(funnel.candidates.length, 1);
    assert.equal(funnel.candidates[0].constraintId, id);
    assert.equal(funnel.candidates[0].priority, 0);
    assert.ok(["tierC", "unclassified"].includes(funnel.candidates[0].tier));
    assert.deepEqual(funnel.shortlist, [id]);
    assert.equal(report.candidateFunnel({ candidateLimit: 1 }).shortlist.length, 1);
    assert.throws(() => report.candidateFunnel({ candidateLimit: 0 }), invalid);
    assert.throws(() => report.candidateFunnel({ candidateLimit: 1025 }), invalid);
    assert.throws(() => report.candidateFunnel({ dualThreshold: -1 }), invalid);
    report.dispose(); model.dispose();
});
