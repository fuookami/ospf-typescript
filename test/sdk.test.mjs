import assert from "node:assert/strict";
import test from "node:test";
import { Decimal, Rational, MetaModel, MultiArray, Quantity, initialize, OspfError } from "../dist/node.js";

test("explicit initialization, exact numbers and disposal", async () => {
    assert.throws(() => new Decimal("1"), { code: "NotInitialized" });
    await Promise.all([initialize(), initialize()]);
    const a = new Decimal("9007199254740993.1");
    const b = new Decimal("0.2");
    const c = a.add(b);
    assert.equal(c.toString(), "9007199254740993.3");
    const r = new Rational(9007199254740993n, 3n);
    assert.equal(r.toString(), "3002399751580331");
    assert.throws(() => new Rational(1n, 0n), { code: "InvalidInput" });
    assert.throws(() => new Decimal(2 ** 53), { code: "InvalidInput" });
    assert.throws(() => new Rational(2 ** 53), { code: "InvalidInput" });
    // 精确减法／取负／比较／零判定；不经过浮点，也不把 "0.00" 与 0 判成不同数。
    // Exact subtraction, negation, comparison and zero tests without floats, and without treating "0.00" as a different number from 0.
    const tenth = new Decimal("0.1"), fifth = new Decimal("0.2");
    assert.equal(tenth.add(fifth).toString(), "0.3");
    assert.equal(new Decimal("1.5").sub(new Decimal("0.25")).toString(), "1.25");
    assert.equal(new Decimal("2").neg().toString(), "-2");
    assert.equal(new Decimal("1.0").compare(new Decimal("1.00")), 0);
    assert.equal(new Decimal("-3").compare(new Decimal("2")), -1);
    assert.equal(new Decimal("7").compare(new Decimal("2.5")), 1);
    assert.equal(new Decimal("0.00").isZero(), true);
    assert.equal(new Decimal("0.0001").isZero(), false);
    const third = new Rational(1n, 3n), sixth = new Rational(1n, 6n);
    assert.equal(third.sub(sixth).toString(), "1/6");
    assert.equal(third.div(sixth).toString(), "2");
    assert.equal(third.neg().toString(), "-1/3");
    assert.equal(third.compare(sixth), 1);
    assert.equal(new Rational(2n, 4n).compare(new Rational(1n, 2n)), 0);
    assert.equal(new Rational(0n, 5n).isZero(), true);
    assert.throws(() => third.div(new Rational(0n, 7n)), /zero divisor/);
    for (const value of [tenth, fifth, third, sixth]) value.dispose();
    for (const value of [a, b, c, r]) value.dispose();
    assert.throws(() => a.toString(), { code: "Disposed" });
    a.dispose();
});

test("MetaModel exports a lossless Rust model and validates ownership", async () => {
    await initialize();
    const model = new MetaModel("sdk-model");
    const x = model.addVariable("x", { lowerBound: 0 });
    const y = model.addVariable("y", { type: "binary" });
    model.setLinearObjective([[x, 2], [y, 1]], "maximize");
    model.addLinearConstraint({ name: "capacity", terms: [[x, 1], [y, 1]], relation: "le", rhs: 4 });
    const artifact = model.toLinearTriadModel();
    assert.match(artifact.fingerprint, /^[0-9a-f]{64}$/);
    assert.match(artifact.modelJson, /Infinity/);
    const other = new MetaModel("other");
    assert.throws(() => other.setLinearObjective([[x, 1]]), { code: "InvalidReference" });
    assert.throws(() => model.setLinearObjective([[x, NaN]]), { code: "InvalidInput" });
    assert.throws(() => model.addVariable("bad", { type: "integer", upperBound: 2 ** 53 }), { code: "InvalidInput" });
    assert.throws(() => model.addVariable("bad", { lowerBound: 2, upperBound: 1 }), OspfError);
    model.dispose();
    assert.throws(() => model.toLinearTriadModel(), { code: "Disposed" });
    other.dispose();
});

test("TypedArray shape validation and isolated copies", async () => {
    await initialize();
    const input = new Float64Array([1, 2, 3, 4]);
    const array = new MultiArray([2, 2], input);
    input[0] = 99;
    assert.equal(array.get(0), 1);
    const copy = array.values();
    copy[0] = 88;
    assert.equal(array.get(0), 1);
    assert.throws(() => array.get(-1), { code: "InvalidInput" });
    assert.throws(() => array.get(4), { code: "InvalidInput" });
    assert.throws(() => new MultiArray([3], new Float64Array(2)), { code: "InvalidInput" });
    assert.throws(() => new MultiArray([0, 0xffff_ffff, 0xffff_ffff], new Float64Array()), { code: "InvalidInput" });
    const empty = new MultiArray([0], new Float64Array());
    assert.equal(empty.values().length, 0);
    assert.throws(() => empty.get(0), { code: "InvalidInput" });
    empty.dispose();
    // 未知变量选项必须报错，而不是静默变成无界连续变量。
    // Unknown variable options must fail instead of silently becoming unbounded continuous variables.
    assert.throws(() => new MetaModel("typo").addVariable("x", { kind: "binary" }), { code: "InvalidInput" });
    assert.throws(() => new MetaModel("typo").addVariable("x", { type: "binary", lower_bound: 0 }), { code: "InvalidInput" });
    // 矩阵运算复用 Rust einsum；形状不合法必须在边界拒绝，而不是 panic 或返回垃圾。
    // Matrix operations reuse Rust einsum; an illegal shape must be rejected at the boundary instead of panicking or returning garbage.
    const left = new MultiArray([2, 3], new Float64Array([1, 2, 3, 4, 5, 6]));
    const right = new MultiArray([3, 2], new Float64Array([7, 8, 9, 10, 11, 12]));
    const product = left.matmul(right);
    assert.deepEqual(Array.from(product.shape), [2, 2]);
    assert.deepEqual(Array.from(product.values()), [58, 64, 139, 154]);
    const transposed = left.transpose();
    assert.deepEqual(Array.from(transposed.shape), [3, 2]);
    assert.deepEqual(Array.from(transposed.values()), [1, 4, 2, 5, 3, 6]);
    const vector = new MultiArray([3], new Float64Array([1, 2, 3]));
    const otherVector = new MultiArray([3], new Float64Array([4, 5, 6]));
    assert.equal(vector.dot(otherVector), 32);
    const square = new MultiArray([2, 2], new Float64Array([1, 2, 3, 4]));
    assert.equal(square.trace(), 5);
    // 维度不匹配一律拒绝 / Dimension mismatches are rejected.
    assert.throws(() => left.matmul(left), { code: "InvalidInput" });
    assert.throws(() => vector.dot(otherVector) && new MultiArray([2], new Float64Array([1, 2])).dot(vector), { code: "InvalidInput" });
    assert.throws(() => vector.transpose(), { code: "InvalidInput" });
    assert.throws(() => vector.trace(), { code: "InvalidInput" });
    const emptyProduct = new MultiArray([0, 2], new Float64Array());
    assert.deepEqual(Array.from(emptyProduct.matmul(new MultiArray([2, 3], new Float64Array([1, 2, 3, 4, 5, 6]))).shape), [0, 3]);
    // 归约复用原 Rust FastSum：轴被消去，空维仍保留。
    // Reductions reuse the original Rust FastSum: summed axes disappear while empty dimensions survive.
    const cube = new MultiArray([2, 2, 2], new Float64Array([1, 2, 3, 4, 5, 6, 7, 8]));
    assert.equal(cube.sumAll(), 36);
    const axisSum = cube.sumAxis(0);
    assert.deepEqual(Array.from(axisSum.shape), [2, 2]);
    assert.deepEqual(Array.from(axisSum.values()), [6, 8, 10, 12]);
    const bothAxes = cube.sumAxes([0, 2]);
    assert.deepEqual(Array.from(bothAxes.shape), [2]);
    assert.deepEqual(Array.from(bothAxes.values()), [14, 22]);
    const prefix = new MultiArray([2, 3], new Float64Array([1, 2, 3, 4, 5, 6])).cumsumAxis(1);
    assert.deepEqual(Array.from(prefix.values()), [1, 3, 6, 4, 9, 15]);
    // 外积、缩并与重排同样复用原 einsum；reshape 沿用原语义（截断/补零）而不是报错。
    // Outer product, contraction and reshape also reuse the original einsum; reshape keeps the original
    // truncate/zero-fill semantics instead of failing.
    const column = new MultiArray([2], new Float64Array([3, 4]));
    const outerProduct = new MultiArray([2], new Float64Array([1, 2])).outer(column);
    assert.deepEqual(Array.from(outerProduct.shape), [2, 2]);
    assert.deepEqual(Array.from(outerProduct.values()), [3, 4, 6, 8]);
    // 缩并已按真实语义实现并与 matmul 对照，二维情形必须给出同一个结果。
    // Contraction is now implemented for real and checked against matmul, so the 2D case must agree.
    const contracted = left.contract(1, right, 0);
    assert.deepEqual(Array.from(contracted.shape), [2, 2]);
    assert.deepEqual(Array.from(contracted.values()), [58, 64, 139, 154]);
    assert.throws(() => left.contract(0, right, 0), { code: "InvalidInput" });
    assert.throws(() => left.contract(5, right, 0), { code: "InvalidInput" });
    const reshaped = new MultiArray([2, 2], new Float64Array([1, 2, 3, 4])).reshape([4]);
    assert.deepEqual(Array.from(reshaped.shape), [4]);
    assert.deepEqual(Array.from(reshaped.values()), [1, 2, 3, 4]);
    const padded = new MultiArray([2], new Float64Array([5, 6])).reshape([3]);
    assert.deepEqual(Array.from(padded.values()), [5, 6, 0]);
    for (const value of [column, outerProduct, contracted, reshaped, padded]) value.dispose();
    assert.throws(() => cube.sumAxis(3), { code: "InvalidInput" });
    assert.throws(() => cube.cumsumAxis(5), { code: "InvalidInput" });
    for (const value of [left, right, product, transposed, vector, otherVector, square, emptyProduct, cube, axisSum, bothAxes, prefix]) value.dispose();
    array.dispose();
});

test("Rust quantity conversion and dimension checks", async () => {
    await initialize();
    const length = new Quantity(1, "m");
    const converted = length.toUnit("mm");
    assert.equal(converted.value(), 1000);
    const time = new Quantity(1, "s");
    assert.throws(() => length.add(time), { code: "InvalidInput" });
    assert.throws(() => length.toUnit("s"), { code: "InvalidInput" });
    // 减法按量纲换算后保留左侧单位；缩放是无量纲标量；跨量纲比较必须拒绝而不是按数值比。
    // Subtraction converts within one dimension and keeps the left unit; scaling takes a dimensionless scalar; cross-dimension comparison is rejected instead of comparing raw numbers.
    const shorter = new Quantity(50, "cm");
    const difference = length.sub(shorter);
    assert.equal(difference.value(), 0.5);
    assert.equal(difference.symbol(), "m");
    assert.throws(() => length.sub(time), { code: "InvalidInput" });
    assert.equal(length.scale(2.5).value(), 2.5);
    assert.equal(length.scale(0).value(), 0);
    assert.throws(() => length.scale(Number.NaN), { code: "InvalidInput" });
    assert.equal(length.compare(shorter), 1);
    assert.equal(new Quantity(100, "cm").compare(length), 0);
    assert.equal(shorter.compare(length), -1);
    assert.throws(() => length.compare(time), { code: "InvalidInput" });
    // 量纲乘积/商由原单位代数合并：m × m = m^2，m ÷ s = m/s；零除数拒绝。
    // Dimension products/quotients come from the original unit algebra: m × m = m^2 and m ÷ s = m/s; a zero divisor is rejected.
    const area = length.mul(shorter);
    assert.equal(area.value(), 50);
    // 合并后的单位不一定有词表条目：symbol 可能为空串，量纲才是可靠依据。
    // A combined unit does not necessarily have a vocabulary entry: symbol may be empty, and the dimension is authoritative.
    assert.equal(area.dimension(), "L^2");
    const speed = length.div(time);
    assert.equal(speed.value(), 1);
    assert.equal(speed.dimension(), "L·T^-1");
    const squareMeter = new Quantity(2, "m").mul(new Quantity(3, "m"));
    assert.equal(squareMeter.value(), 6);
    assert.equal(squareMeter.dimension(), "L^2");
    squareMeter.dispose();
    assert.throws(() => length.div(new Quantity(0, "s")), { code: "InvalidInput" });
    // 新增单位沿用领域内置定义换算，符号与定义一致。
    // The added units convert through the original domain definitions and keep their declared symbols.
    const inch = new Quantity(1, "in").toUnit("cm");
    assert.ok(Math.abs(inch.value() - 2.54) < 1e-12);
    assert.equal(inch.symbol(), "cm");
    const tonne = new Quantity(1, "t").toUnit("kg");
    assert.equal(tonne.value(), 1000);
    const pound = new Quantity(1, "lb").toUnit("kg");
    assert.ok(Math.abs(pound.value() - 0.45359237) < 1e-15);
    assert.equal(new Quantity(1, "yd").symbol(), "yd");
    assert.equal(new Quantity(1, "dm^2").symbol(), "dm^2");
    // 新单位同样受量纲限制，不能跨量纲转换 / The new units obey the same dimension rules.
    assert.throws(() => new Quantity(1, "lb").toUnit("m"), { code: "InvalidInput" });
    assert.throws(() => new Quantity(1, "in").toUnit("dm^2"), { code: "InvalidInput" });
    inch.dispose(); tonne.dispose(); pound.dispose();
    area.dispose(); speed.dispose();
    shorter.dispose(); difference.dispose();
});

test("volume units convert through the original definitions and reject other dimensions", async () => {
    await initialize();
    // 1 L = 0.001 m³，1 m³ = 1000 L；体积与长度、面积、质量都不可互换。
    // 1 L = 0.001 m³ and 1 m³ = 1000 L; volume never interchanges with length, area or mass.
    const liter = new Quantity(1, "L");
    assert.equal(liter.value(), 1);
    assert.equal(liter.dimension(), "L^3");
    const cubic = new Quantity(1, "m^3");
    assert.equal(cubic.value(), 1);
    assert.equal(cubic.dimension(), "L^3");
    // 同量纲相加减；跨量纲必须拒绝。
    // Same-dimension addition works and cross-dimension arithmetic is rejected.
    assert.throws(() => new Quantity(1, "m^3").add(new Quantity(1, "m^2")), { code: "InvalidInput" });
    assert.throws(() => new Quantity(1, "L").add(new Quantity(1, "kg")), { code: "InvalidInput" });
    const product = new Quantity(2, "m").mul(new Quantity(3, "m^2"));
    assert.equal(product.value(), 6);
    assert.equal(product.dimension(), "L^3");
    for (const value of [liter, cubic, product]) value.dispose();
});
