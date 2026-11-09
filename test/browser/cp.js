import { ConstraintProgrammingModel, IntegerDomain, ConstraintActivityAnalyzer } from '/dist/browser.js';

export function checkCp() {
    const high = 9007199254740993n;
    const domain = IntegerDomain.range(high, high + 5n);
    const model = new ConstraintProgrammingModel('portable-cp', 'browser-tests');
    const x = model.addVariable('x', domain);
    const expression = x.toExpression();
    const relation = expression.le(high);
    model.addConstraint(relation, { id: 'limit' });
    model.setObjective(expression);
    const snapshot = model.freeze();
    const report = new ConstraintActivityAnalyzer().analyzeCp(snapshot, [high + 1n]);
    model.dispose();
    snapshot.validateAssignment([high]);
    const result = {
        exact: snapshot.objectiveValue([high]).toString(),
        evidence: report.integerRhs('limit').toString(),
        violated: report.status('limit') === 'VIOLATED',
        raw: snapshot.toJson().includes(high.toString()),
        global: checkGlobalCp(),
        advanced: checkAdvancedCp(snapshot, high),
        // 候选漏斗在浏览器里同样只做排序与分组；无对偶证据时不得出现 A/B。
        // The candidate funnel only ranks and groups in the browser too; Tier A/B cannot appear without dual evidence.
        funnel: (() => {
            const funnel = report.candidateFunnel({ candidateLimit: 1 });
            return { dual: funnel.hasDualEvidence, tierA: funnel.tierA, tierB: funnel.tierB, shortlist: funnel.shortlist.length, top: funnel.candidates[0]?.constraintId };
        })(),
    };
    for (const value of [domain, expression, relation, snapshot, report]) value.dispose();
    return result;
}

function checkAdvancedCp(snapshot, high) {
    const assumed = snapshot.withAssumptions([{ kind: 'equal', variableId: 'x', value: high }]);
    assumed.validateAssignment([high]);
    if (assumed.fingerprint() === snapshot.fingerprint() || assumed.analyzeMipLowering().status !== 'inexact') throw new Error('exact assumptions or preflight failed');
    const model = new ConstraintProgrammingModel('portable-lowering');
    const domain = IntegerDomain.boolean(); model.addVariable('b', domain);
    const source = model.freeze(), derived = source.withAssumptions([{ kind: 'literal', variableId: 'b', negated: true }]);
    const analysis = derived.analyzeMipLowering();
    if (analysis.status !== 'lowered' || analysis.fingerprint !== derived.fingerprint() || analysis.sourceVariables !== 1) throw new Error('portable lowering failed');
    for (const object of [assumed, model, domain, source, derived]) object.dispose();
    return true;
}

function checkGlobalCp() {
    const model = new ConstraintProgrammingModel('portable-global-cp');
    const bool = IntegerDomain.boolean(), exact = IntegerDomain.values([9007199254740993n, 9007199254740995n]);
    const i = model.addVariable('i', bool), v = model.addVariable('v', exact);
    const value = v.toExpression(), relation = value.eq(9007199254740995n);
    const zero = model.integerExpression(), one = model.integerExpression([], 1n), minusOne = model.integerExpression([], -1n);
    const interval = model.addInterval({ id: 'task', start: zero, end: one, duration: i, presence: { variable: i, negated: false } });
    const constraints = [
        model.element({ index: i, values: [9007199254740993n, 9007199254740995n], target: v }),
        model.allowedAssignments([i, v], [[0n, 9007199254740993n], [1n, 9007199254740995n]]),
        model.forbiddenAssignments([i, v], [[0n, 9007199254740993n]]),
        model.implication(i, relation), model.reification(i, relation), model.allDifferent([i, value]),
        model.circuit([zero]), model.cumulative([{ interval, demand: 1n }], 1n),
        model.automaton([i], { initialState: 0, finalStates: [1], transitions: [{ fromState: 0, value: 1n, toState: 1 }] }),
        model.reservoir({ events: [{ time: zero, levelChange: one }, { time: zero, levelChange: minusOne }], initialLevel: 0n, minimumLevel: 0n, maximumLevel: 1n }),
    ];
    for (const [index, constraint] of constraints.entries()) model.addConstraint(constraint, { id: `constraint-${index}` });
    const snapshot = model.freeze();
    model.dispose();
    snapshot.validateAssignment([1n, 9007199254740995n]);
    for (const object of [bool, exact, value, relation, zero, one, minusOne, ...constraints, snapshot]) object.dispose();
    return true;
}
