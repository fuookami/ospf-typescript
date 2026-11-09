import type { Geometry2d as GeometryBinding } from "ospf-wasm-bindings";
import type {
    Geometry2dPoint, Geometry2dShape, Geometry2dBox, Geometry2dPlacement, Geometry2dSheet,
    Geometry2dShapeMetrics, Geometry2dBoxMetrics, Geometry2dShapeCandidate, QuantityUnit, PhysicalQuantity,
} from "ospf-wasm-bindings/protocol";
import { invoke, OspfError } from "./base.js";
import { wasm } from "./runtime.js";

export type {
    Geometry2dPoint as QuantityPoint2, Geometry2dPoint as QuantityVector2, Geometry2dShape as PackingShape2,
    Geometry2dBox as Box2Geometry, Geometry2dPlacement as Placement2, Geometry2dSheet as Sheet2Shape,
    Geometry2dSheet as Sheet2Geometry, Geometry2dShapeMetrics as ShapeMetrics, Geometry2dBoxMetrics as BoxMetrics,
    Geometry2dShapeCandidate as Shape2Candidate, PhysicalQuantity,
} from "ospf-wasm-bindings/protocol";

function json(value: unknown): string {
    try {
        const text = JSON.stringify(value, (_key, item: unknown) => {
            if ((typeof item === "number" && !Number.isFinite(item)) || typeof item === "undefined" || typeof item === "function"
                || typeof item === "symbol" || typeof item === "bigint") throw new TypeError("expected finite geometry contract values");
            return item;
        });
        if (text === undefined) throw new TypeError("expected a geometry DTO");
        return text;
    } catch (cause) { throw new OspfError("InvalidInput", "geometry2d input cannot be encoded as a contract DTO", { cause }); }
}

/** 带显式单位的 f64 几何门面，所有计算复用原 Rust 内核 / Unit-explicit f64 geometry facade, with every calculation reusing the original Rust kernel. */
export class Geometry2d {
    private value: GeometryBinding | undefined;
    constructor(lengthUnit: QuantityUnit = "m") {
        if (typeof lengthUnit !== "string") throw new OspfError("InvalidInput", "expected a geometry length unit");
        this.value = invoke(() => new (wasm().Geometry2d)(lengthUnit));
    }
    private raw(): GeometryBinding {
        if (!this.value) throw new OspfError("Disposed", "geometry2d context has been disposed");
        return this.value;
    }
    private read<T>(operation: (binding: GeometryBinding) => string): T { return invoke(() => JSON.parse(operation(this.raw())) as T); }
    lengthUnit(): QuantityUnit { return this.read(binding => binding.lengthUnitJson()); }
    point(value: Geometry2dPoint): Geometry2dPoint { return this.read(binding => binding.point(json(value))); }
    vector(value: Geometry2dPoint): Geometry2dPoint { return this.point(value); }
    addPoint(point: Geometry2dPoint, offset: Geometry2dPoint): Geometry2dPoint { return this.read(binding => binding.addPoint(json(point), json(offset))); }
    subPoint(point: Geometry2dPoint, offset: Geometry2dPoint): Geometry2dPoint { return this.read(binding => binding.subPoint(json(point), json(offset))); }
    addVectors(first: Geometry2dPoint, second: Geometry2dPoint): Geometry2dPoint { return this.read(binding => binding.addVectors(json(first), json(second))); }
    subVectors(first: Geometry2dPoint, second: Geometry2dPoint): Geometry2dPoint { return this.read(binding => binding.subVectors(json(first), json(second))); }
    /** 先 y 后 x，返回 -1/0/1 / Compare y before x, returning -1/0/1. */
    comparePoints(first: Geometry2dPoint, second: Geometry2dPoint): number { return invoke(() => this.raw().comparePoints(json(first), json(second))); }
    shape(value: Geometry2dShape): Geometry2dShape { return this.read(binding => binding.shape(json(value))); }
    rotated(value: Geometry2dShape): Geometry2dShape { return this.read(binding => binding.rotated(json(value))); }
    candidateShapes(value: Geometry2dShape, allowRotate = true): Geometry2dShapeCandidate[] {
        if (typeof allowRotate !== "boolean") throw new OspfError("InvalidInput", "allowRotate must be boolean");
        return this.read(binding => binding.candidateShapes(json(value), allowRotate));
    }
    inflatedByShape(value: Geometry2dShape, spacing: PhysicalQuantity): Geometry2dShape { return this.read(binding => binding.inflatedByShape(json(value), json(spacing))); }
    pitchOf(value: Geometry2dShape, spacing: PhysicalQuantity): Geometry2dPoint { return this.read(binding => binding.pitchOf(json(value), json(spacing))); }
    shapeMetrics(value: Geometry2dShape): Geometry2dShapeMetrics { return this.read(binding => binding.shapeMetrics(json(value))); }
    bounds(value: Geometry2dBox): Geometry2dBox { return this.read(binding => binding.bounds(json(value))); }
    boxMetrics(value: Geometry2dBox): Geometry2dBoxMetrics { return this.read(binding => binding.boxMetrics(json(value))); }
    /** 闭区间包围盒包含；圆使用外接正方形，不是精确圆盘包含 / Closed bounding-box containment; circles use enclosing squares, not exact disks. */
    contains(bounds: Geometry2dBox, point: Geometry2dPoint): boolean { return invoke(() => this.raw().contains(json(bounds), json(point))); }
    containsBox(first: Geometry2dBox, second: Geometry2dBox): boolean { return invoke(() => this.raw().containsBox(json(first), json(second))); }
    /** 原包围盒内部重叠，贴边不重叠；圆不是精确碰撞测试 / Original interior box overlap excludes shared edges; circles do not receive exact collision tests. */
    overlapped(first: Geometry2dBox, second: Geometry2dBox): boolean { return invoke(() => this.raw().overlapped(json(first), json(second))); }
    /** 精确圆盘相交；任一侧非圆返回 null，不按外接方冒充 / Exact disk intersection; null when either side is not a circle rather than faking it with the enclosing square. */
    /** 沿一个方向能容纳多少个单元；非正尺寸按原内核返回 0 / How many cells fit along one direction; non-positive sizes return 0 as in the original kernel. */
    countFitting(cell: PhysicalQuantity, container: PhysicalQuantity): number {
        return invoke(() => this.raw().countFitting(json(cell), json(container)));
    }
    diskOverlaps(first: Geometry2dBox, second: Geometry2dBox): boolean | null {
        const value = invoke(() => this.raw().diskOverlaps(json(first), json(second)));
        return value === undefined || value === null ? null : value;
    }
    /** 圆心，仅对圆形盒有效 / Circle centre, valid only for circular boxes. */
    centre(value: Geometry2dBox): Geometry2dPoint | null {
        const point = invoke(() => this.raw().centre(json(value)));
        return point === null || point === undefined ? null : JSON.parse(point) as Geometry2dPoint;
    }
    translated(bounds: Geometry2dBox, offset: Geometry2dPoint): Geometry2dBox { return this.read(binding => binding.translated(json(bounds), json(offset))); }
    at(bounds: Geometry2dBox, position: Geometry2dPoint): Geometry2dBox { return this.read(binding => binding.at(json(bounds), json(position))); }
    originBox(sheet: Geometry2dSheet): Geometry2dBox { return this.read(binding => binding.originBox(json(sheet))); }
    insideSheet(bounds: Geometry2dBox, sheet: Geometry2dSheet): boolean { return invoke(() => this.raw().insideSheet(json(bounds), json(sheet))); }
    /** rotated 是元数据，shape 必须已为实际朝向 / rotated is metadata; shape must already have its physical orientation. */
    placement(value: Geometry2dPlacement): Geometry2dPlacement { return this.read(binding => binding.placement(json(value))); }
    /** 原实现保持左下角，不是中心不变的膨胀 / Original implementation preserves the lower-left corner, not centred inflation. */
    inflatedByPlacement(value: Geometry2dPlacement, spacing: PhysicalQuantity): Geometry2dPlacement { return this.read(binding => binding.inflatedByPlacement(json(value), json(spacing))); }
    /** 全部重叠对的交错索引副本；最多 512 盒，不截断 / Copied interleaved indices of every overlap pair; at most 512 boxes, without truncation. */
    overlapPairs(values: readonly Geometry2dBox[]): Uint32Array {
        if (!Array.isArray(values)) throw new OspfError("InvalidInput", "expected a geometry2d box array");
        if (values.length > 512) throw new OspfError("PayloadTooLarge", "geometry2d overlapPairs exceeds 512 boxes");
        return invoke(() => this.raw().overlapPairs(json(values)));
    }
    dispose(): void { this.value?.free(); this.value = undefined; }
}
