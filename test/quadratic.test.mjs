import test from "node:test";
import assert from "node:assert/strict";
import { initialize, MetaModel, Linear, Quadratic } from "../dist/node.js";

test("Rust quadratic products preserve constants, cross terms and numeric semantics", async () => {
    await initialize();
    const model = new MetaModel("quadratic");
    const x = model.addVariable("x");
    const y = model.addVariable("y");
    const a = model.linearExpression([[x, 1]], 2);
    const b = model.linearExpression([[y, 3]], 4);
    const product = a.mul(b);
    const reverse = b.mul(a);
    assert.ok(product instanceof Quadratic);
    assert.equal(product.constant(), 8);
    assert.deepEqual([...product.linearCoefficients()], [4, 6]);
    assert.deepEqual(product.quadraticTerms(), { rows: new Uint32Array([0]), columns: new Uint32Array([1]), coefficients: new Float64Array([3]) });
    assert.equal(product.evaluate(new Float64Array([2, 5])), 76);
    const sum = product.add(reverse);
    assert.deepEqual([...sum.quadraticTerms().coefficients], [6]);
    const cancelled = product.sub(reverse);
    const linear = cancelled.tryToLinear();
    assert.ok(linear instanceof Linear);
    assert.deepEqual([...linear.coefficients()], [0, 0]);
    assert.equal(linear.constant(), 0);
    assert.throws(() => product.tryToLinear(), { code: "Unsupported" });
    const shifted = product.add(a);
    assert.deepEqual([...shifted.linearCoefficients()], [5, 6]);
    assert.equal(shifted.constant(), 10);
    const scaled = product.mul(2);
    const negated = scaled.neg();
    const offset = negated.sub(3);
    assert.equal(offset.evaluate(new Float64Array([2, 5])), -155);
    const square = a.mul(a);
    assert.deepEqual([...square.quadraticTerms().rows], [0]);
    assert.deepEqual([...square.quadraticTerms().columns], [0]);
    assert.equal(square.evaluate(new Float64Array([2, 5])), 16);
    const terms = product.quadraticTerms();
    terms.rows.fill(99); terms.columns.fill(99); terms.coefficients.fill(99);
    assert.equal(product.evaluate(new Float64Array([2, 5])), 76);
    model.addVariable("later");
    assert.deepEqual([...product.linearCoefficients()], [4, 6, 0]);
    assert.throws(() => product.evaluate(new Float64Array([2, 5])), { code: "InvalidInput" });
    assert.equal(product.evaluate(new Float64Array([2, 5, 0])), 76);
    for (const object of [a, b, product, reverse, sum, cancelled, linear, shifted, scaled, negated, offset, square, model]) object.dispose();
});

test("quadratic scope, lifecycle, overflow and lossless linear demotion are explicit", async () => {
    await initialize();
    const model = new MetaModel("scope");
    const other = new MetaModel("scope");
    const x = model.addVariable("x");
    const foreign = other.addVariable("x").toLinear();
    const expression = x.toLinear();
    const square = expression.mul(expression);
    const foreignSquare = foreign.mul(foreign);
    assert.throws(() => expression.mul(foreign), { code: "InvalidReference" });
    assert.throws(() => square.add(foreign), { code: "InvalidReference" });
    assert.throws(() => square.sub(foreignSquare), { code: "InvalidReference" });
    for (const values of [new Float64Array(), new Float64Array([NaN]), new Float64Array([Infinity]), new Float64Array([Number.MAX_VALUE])]) {
        assert.throws(() => square.evaluate(values), { code: "InvalidInput" });
    }
    assert.throws(() => square.mul(NaN), { code: "InvalidInput" });
    assert.throws(() => square.add(Infinity), { code: "InvalidInput" });
    const huge = square.mul(Number.MAX_VALUE);
    assert.throws(() => huge.mul(2), { code: "InvalidInput" });
    assert.throws(() => huge.add(huge), { code: "InvalidInput" });
    const promoted = expression.toQuadratic();
    const demoted = promoted.tryToLinear();
    assert.deepEqual([...demoted.coefficients()], [1]);
    const symbol = model.addLinearSymbol("original", expression);
    const reference = symbol.toLinear();
    const qref = reference.toQuadratic();
    const lref = qref.tryToLinear();
    const derived = model.addLinearSymbol("derived", lref);
    assert.deepEqual([...derived.dependencyIds()], [symbol.id()]);
    expression.dispose();
    assert.equal(square.evaluate(new Float64Array([2])), 4);
    model.dispose();
    assert.throws(() => square.constant(), { code: "Disposed" });
    assert.throws(() => square.quadraticTerms(), { code: "Disposed" });
    promoted.dispose(); promoted.dispose();
    assert.throws(() => promoted.tryToLinear(), { code: "Disposed" });
    for (const object of [foreign, square, foreignSquare, huge, demoted, symbol, reference, qref, lref, derived, other]) object.dispose();
});

test("quadratic sparse coefficients use polynomial, not Hessian, cross-term factors", async () => {
    await initialize();
    const model = new MetaModel("cross-term-factors");
    const x = model.addVariable("x");
    const y = model.addVariable("y");
    const sum = model.linearExpression([[x, 1], [y, 1]]);
    const square = sum.mul(sum);
    assert.deepEqual(square.quadraticTerms(), {
        rows: new Uint32Array([0, 0, 1]), columns: new Uint32Array([0, 1, 1]), coefficients: new Float64Array([1, 2, 1]),
    });
    for (const values of [[0, 0], [1, -1], [-2, 3], [0.5, 1.5]]) {
        assert.equal(square.evaluate(new Float64Array(values)), (values[0] + values[1]) ** 2);
    }
    const zero = square.mul(0);
    const linear = zero.tryToLinear();
    assert.deepEqual([...zero.quadraticTerms().coefficients], []);
    assert.deepEqual([...linear.coefficients()], [0, 0]);
    for (const object of [sum, square, zero, linear, model]) object.dispose();
});
