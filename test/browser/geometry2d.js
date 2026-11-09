import { Geometry2d } from "/dist/geometry2d.js";
import { Quantity } from "/dist/quantities.js";

export function checkGeometry2d() {
    const geometry = new Geometry2d("cm");
    const shape = { kind: "rectangle", width: { value: 2, unit: "m" }, height: { value: 3000, unit: "mm" } };
    const position = { x: { value: 0, unit: "cm" }, y: { value: 0, unit: "cm" } }, box = { shape, position };
    const metrics = geometry.shapeMetrics(shape), origin = geometry.originBox({ width: shape.width, height: shape.height });
    const circle = geometry.shapeMetrics({ kind: "circle", radius: { value: 1, unit: "m" } });
    const area = new Quantity(metrics.area.value, metrics.area.unit), converted = area.toUnit("m^2");
    const candidates = geometry.candidateShapes(shape), pairs = geometry.overlapPairs([box, box]);
    const inflated = geometry.inflatedByPlacement({ ...box, rotated: true, itemId: "part" }, { value: 50, unit: "cm" });
    const output = { area: converted.value(), areaUnit: metrics.area.unit, orientations: candidates.length,
        pairs: [...pairs], typed: pairs instanceof Uint32Array, inside: geometry.insideSheet(box, { width: shape.width, height: shape.height }),
        origin: geometry.containsBox(origin, box), anchor: inflated.position.x.value === 0,
        circle: Math.abs(circle.area.value - Math.PI * 10000) < 1e-8 };
    // 新开放能力在浏览器里同样可用：精确圆盘、量纲乘除、数组归约/外积/缩并/重排。
    // Newly exposed capabilities must work in the browser too: exact disks, dimension algebra, reductions,
    // outer products, contraction and reshape.
    const disk = geometry.originBox({ width: { value: 1, unit: "m" }, height: { value: 1, unit: "m" } });
    const circleBox = { shape: { kind: "circle", radius: { value: 0.5, unit: "m" } }, position: { x: { value: 0, unit: "m" }, y: { value: 0, unit: "m" } } };
    const nearBox = { shape: circleBox.shape, position: { x: { value: 0.6, unit: "m" }, y: { value: 0, unit: "m" } } };
    const farBox = { shape: circleBox.shape, position: { x: { value: 1.4, unit: "m" }, y: { value: 0, unit: "m" } } };
    const dimensionProduct = new Quantity(2, "m").mul(new Quantity(3, "m"));
    // 半径各 0.5、圆心相距 0.6 时相交，相距 1.4 时不相交。 / Radius 0.5 each: centres 0.6 apart overlap, 1.4 apart do not.
    output.disk = geometry.diskOverlaps(circleBox, nearBox) === true && geometry.diskOverlaps(circleBox, farBox) === false;
    output.dimension = dimensionProduct.value() === 6 && dimensionProduct.dimension() === "L^2";
    // 体积单位在浏览器 WASM 内同样可用：1 L 与 1 m³ 同为 L^3，且与面积不可相加。
    // Volume units also work in browser WASM: 1 L and 1 m³ are both L^3 and never add to areas.
    const liter = new Quantity(1, "L"), cubicMeter = new Quantity(1, "m^3"), square = new Quantity(1, "m^2");
    output.volume = liter.dimension() === "L^3" && cubicMeter.dimension() === "L^3";
    try { cubicMeter.add(square); output.volumeRejectsArea = false; } catch (error) { output.volumeRejectsArea = error.code === "InvalidInput"; }
    for (const value of [liter, cubicMeter, square]) value.dispose();
    // 一维容纳数量沿用原内核：非正或容器更小时返回 0。
    // The 1D fitting count keeps the original kernel: non-positive cells or a smaller container return 0.
    output.fitting = geometry.countFitting({ value: 30, unit: "cm" }, { value: 100, unit: "cm" }) === 3
        && geometry.countFitting({ value: 0, unit: "cm" }, { value: 100, unit: "cm" }) === 0;
    dimensionProduct.dispose();
    geometry.dispose(); area.dispose(); converted.dispose(); pairs[0] = 99;
    return output;
}
