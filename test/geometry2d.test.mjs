import assert from "node:assert/strict";
import test from "node:test";
import { initialize } from "../dist/node.js";
import { Quantity } from "../dist/quantities.js";
import { Geometry2d } from "../dist/geometry2d.js";

await initialize();
const q = (value, unit = "m") => ({ value, unit });
const point = (x, y) => ({ x: q(x), y: q(y) });
const rectangle = (width, height) => ({ kind: "rectangle", width: q(width), height: q(height) });
const bounds = (x, y) => ({ shape: rectangle(2, 3), position: point(x, y) });
const near = (value, expected) => assert.ok(Math.abs(value - expected) <= 1e-10 * Math.max(1, Math.abs(expected)), `${value} != ${expected}`);

test("countFitting reuses the original kernel and keeps its zero semantics", async () => {
    await initialize();
    const geometry = new Geometry2d("cm");
    // 100 cm 容器能放 3 个 30 cm 单元，余 10 cm；换算到不同单位后结果不变。
    // A 100 cm container fits three 30 cm cells with 10 cm left over, and unit conversion does not change it.
    assert.equal(geometry.countFitting({ value: 30, unit: "cm" }, { value: 100, unit: "cm" }), 3);
    assert.equal(geometry.countFitting({ value: 300, unit: "mm" }, { value: 1, unit: "m" }), 3);
    // 单元非正或容器更小时按原内核返回 0，而不是报错或抛异常。
    // A non-positive cell or a smaller container returns 0 exactly as the original kernel does, without failing.
    assert.equal(geometry.countFitting({ value: 0, unit: "cm" }, { value: 100, unit: "cm" }), 0);
    assert.equal(geometry.countFitting({ value: 120, unit: "cm" }, { value: 100, unit: "cm" }), 0);
    // 面积单位作为"单元尺寸"仍由 Rust 量纲检查拒绝。
    // An area unit used as a cell size is still rejected by the Rust dimension check.
    assert.throws(() => geometry.countFitting({ value: 1, unit: "cm^2" }, { value: 100, unit: "cm" }), { code: "InvalidInput" });
    geometry.dispose();
});

test("shared 2D geometry delegates mixed-unit shapes, area dimensions and candidates to Rust", () => {
    const geometry = new Geometry2d("cm"), shape = { kind: "rectangle", width: q(2000, "mm"), height: q(0.003, "km") };
    assert.equal(geometry.lengthUnit(), "cm");
    const metrics = geometry.shapeMetrics(shape); near(metrics.width.value, 200); near(metrics.height.value, 300);
    near(metrics.area.value, 60_000); assert.equal(metrics.area.unit, "cm^2"); assert.deepEqual(metrics.area, metrics.boundingArea);
    const candidates = geometry.candidateShapes(shape); assert.equal(candidates.length, 2); assert.equal(candidates[1].rotated, true);
    near(candidates[1].shape.width.value, 300);
    assert.deepEqual(geometry.rotated(geometry.rotated(shape)), geometry.shape(shape));
    assert.equal(geometry.candidateShapes(rectangle(2, 2)).length, 1); assert.equal(geometry.candidateShapes(shape, false).length, 1);
    const circle = { kind: "circle", radius: q(2) }, circleMetrics = geometry.shapeMetrics(circle);
    near(circleMetrics.area.value, 40_000 * Math.PI); near(circleMetrics.boundingArea.value, 160_000);
    assert.equal(geometry.candidateShapes(circle).length, 1);
    const area = new Quantity(circleMetrics.area.value, circleMetrics.area.unit), converted = area.toUnit("m^2");
    near(converted.value(), 4 * Math.PI); assert.throws(() => area.toUnit("m"), { code: "InvalidInput" });
    geometry.dispose(); area.dispose(); converted.dispose();
    assert.equal(metrics.area.unit, "cm^2"); assert.equal(candidates.length, 2);
});

test("2D point/vector arithmetic, y-before-x ordering, translation and closed sheet boundaries", () => {
    const geometry = new Geometry2d(), offset = { x: q(100, "cm"), y: q(-2000, "mm") };
    assert.deepEqual(geometry.vector(offset), point(1, -2));
    assert.deepEqual(geometry.addPoint(point(2, 3), offset), point(3, 1));
    assert.deepEqual(geometry.subPoint(point(2, 3), offset), point(1, 5));
    assert.deepEqual(geometry.addVectors(point(2, 3), offset), point(3, 1));
    assert.deepEqual(geometry.subVectors(point(2, 3), offset), point(1, 5));
    assert.equal(geometry.comparePoints(point(100, 0), point(-100, 1)), -1);
    assert.equal(geometry.comparePoints(point(2, 1), point(1, 1)), 1);
    const first = bounds(-1, -2), sheet = { width: q(2), height: q(3) };
    assert.deepEqual(geometry.boxMetrics(first), { min: point(-1, -2), max: point(1, 1) });
    assert.equal(geometry.contains(first, point(1, 1)), true); assert.equal(geometry.contains(first, point(1.01, 1)), false);
    assert.equal(geometry.overlapped(first, bounds(1, -2)), false); assert.equal(geometry.overlapped(first, bounds(0.5, -2)), true);
    assert.deepEqual(geometry.translated(first, point(1, 2)), bounds(0, 0)); assert.deepEqual(geometry.at(first, point(0, 0)), bounds(0, 0));
    assert.deepEqual(geometry.originBox(sheet), bounds(0, 0));
    assert.equal(geometry.containsBox(bounds(0, 0), bounds(0, 0)), true);
    assert.equal(geometry.insideSheet(bounds(0, 0), sheet), true); assert.equal(geometry.insideSheet(first, sheet), false);
    geometry.dispose();
});

test("all exposed square units retain original Rust area conversion and addition", () => {
    const square = new Quantity(1, "m^2");
    for (const [unit, expected] of [["m^2", 1], ["km^2", 1e-6], ["cm^2", 10000], ["mm^2", 1000000]]) {
        const converted = square.toUnit(unit); near(converted.value(), expected); assert.equal(converted.toDto().unit, unit); converted.dispose();
    }
    const centimeters = new Quantity(10000, "cm^2"), total = square.add(centimeters);
    near(total.value(), 2); assert.equal(total.toDto().unit, "m^2");
    square.dispose(); centimeters.dispose(); total.dispose();
});

test("circle boxes remain conservative and kerf retains original lower-left origin and metadata", () => {
    const geometry = new Geometry2d(), circle = { kind: "circle", radius: q(1) };
    const first = { shape: circle, position: point(0, 0) }, diagonal = { shape: circle, position: point(1.5, 1.5) };
    assert.equal(geometry.overlapped(first, diagonal), true); assert.equal(geometry.contains(first, point(0, 0)), true);
    assert.equal(geometry.overlapped(first, { ...first, position: point(2, 0) }), false);
    // 外接方重叠但圆盘实际分离：圆心距 sqrt(1.5²+1.5²)≈2.121 > 2r=2。
    // The enclosing squares overlap while the disks are actually apart: the centre distance is sqrt(1.5²+1.5²)≈2.121 > 2r=2.
    assert.equal(geometry.diskOverlaps(first, diagonal), false);
    assert.equal(geometry.diskOverlaps(first, { ...first, position: point(1, 1) }), true);
    // 相切圆盘不算相交；非圆一侧返回 null 而不是按外接方冒充。
    // Tangent disks do not intersect, and a non-circular side returns null instead of faking it with the enclosing square.
    assert.equal(geometry.diskOverlaps(first, { ...first, position: point(2, 0) }), false);
    assert.equal(geometry.diskOverlaps(first, bounds(0, 0)), null);
    assert.deepEqual(geometry.centre(first), point(1, 1));
    assert.equal(geometry.centre(bounds(0, 0)), null);
    const placement = { ...bounds(-2, 1), rotated: true, itemId: "part" };
    const inflated = geometry.inflatedByPlacement(placement, q(50, "cm"));
    assert.deepEqual(inflated.position, placement.position); assert.deepEqual(inflated.shape, rectangle(2.5, 3.5));
    assert.equal(inflated.itemId, "part"); assert.equal(inflated.rotated, true);
    assert.deepEqual(geometry.placement(placement), placement); assert.deepEqual(geometry.pitchOf(placement.shape, q(0.5)), point(2.5, 3.5));
    assert.deepEqual(geometry.inflatedByShape(placement.shape, q(0)), placement.shape);
    assert.deepEqual(geometry.inflatedByShape(circle, q(0.5)), { kind: "circle", radius: q(1.25) });
    geometry.dispose(); assert.deepEqual(inflated.shape, rectangle(2.5, 3.5));
});

test("2D overlap batches return complete independent Uint32Array pairs and bound total work", () => {
    const geometry = new Geometry2d(), values = [bounds(0, 0), bounds(2, 0), bounds(1, 1)];
    const pairs = geometry.overlapPairs(values); assert.ok(pairs instanceof Uint32Array); assert.deepEqual([...pairs], [0, 2, 1, 2]);
    pairs[0] = 99; assert.deepEqual([...geometry.overlapPairs(values)], [0, 2, 1, 2]);
    const complete = geometry.overlapPairs(Array.from({ length: 512 }, () => bounds(0, 0)));
    assert.equal(complete.length, 512 * 511); assert.deepEqual([...complete.slice(-2)], [510, 511]);
    assert.throws(() => geometry.overlapPairs(Array.from({ length: 513 }, () => bounds(0, 0))), { code: "PayloadTooLarge" });
    assert.deepEqual([...geometry.overlapPairs([])], []);
    assert.throws(() => geometry.overlapPairs([{ ...bounds(0, 0), position: point(NaN, 0) }]), { code: "InvalidInput" });
    geometry.dispose(); assert.equal(complete.length, 512 * 511);
});

test("geometry DTOs reject nonfinite/unknown fields, dimension errors, overflow/underflow and disposed contexts", () => {
    for (const unit of ["s", "kg", "m^2", "invalid", null]) assert.throws(() => new Geometry2d(unit), { code: "InvalidInput" });
    const geometry = new Geometry2d();
    for (const value of [NaN, Infinity, -Infinity, 0, -1, 1e200, 1e-200]) assert.throws(() => geometry.shape(rectangle(value, value)), { code: "InvalidInput" });
    for (const value of [null, { kind: "triangle" }, { ...rectangle(1, 1), radius: q(1) }, { ...rectangle(1, 1), callback() {} }, { ...rectangle(1, 1), unused: undefined }]) {
        assert.throws(() => geometry.shape(value), { code: "InvalidInput" });
    }
    assert.throws(() => geometry.point({ x: q(1, "s"), y: q(0) }), { code: "InvalidInput" });
    assert.throws(() => geometry.point({ x: q(Number.MIN_VALUE, "mm"), y: q(0) }), { code: "InvalidInput" });
    assert.throws(() => geometry.bounds(bounds(1e200, 0)), { code: "InvalidInput" });
    assert.throws(() => geometry.addPoint(point(Number.MAX_VALUE, 0), point(Number.MAX_VALUE, 0)), { code: "InvalidInput" });
    for (const spacing of [q(-1), q(1, "kg"), q(1, "m^2")]) assert.throws(() => geometry.pitchOf(rectangle(2, 3), spacing), { code: "InvalidInput" });
    assert.throws(() => geometry.candidateShapes(rectangle(2, 3), "true"), { code: "InvalidInput" });
    assert.throws(() => geometry.placement({ ...bounds(0, 0), rotated: false, itemId: "x".repeat(1025) }), { code: "InvalidInput" });
    const data = geometry.bounds(bounds(0, 0)); geometry.dispose(); geometry.dispose();
    assert.throws(() => geometry.shape(rectangle(2, 3)), { code: "Disposed" });
    assert.throws(() => geometry.overlapPairs([data]), { code: "Disposed" });
    const other = new Geometry2d("cm"); near(other.boxMetrics(data).max.x.value, 200); other.dispose();
});
