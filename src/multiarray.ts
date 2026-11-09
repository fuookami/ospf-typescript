import type { MultiArray as ArrayBinding } from "ospf-wasm-bindings";
import { invoke, OspfError } from "./base.js";
import { wasm } from "./runtime.js";

/** 行优先数组，跨边界返回独立副本 / Row-major array with independent copies across the boundary. */
export class MultiArray {
    private value: ArrayBinding | undefined;
    readonly shape: ReadonlyArray<number>;
    constructor(shape: ReadonlyArray<number>, values: Float64Array) {
        if (shape.some(v => !Number.isInteger(v) || v < 0 || v > 0xffff_ffff)) {
            throw new OspfError("InvalidInput", "shape dimensions must be unsigned 32-bit integers");
        }
        this.shape = Object.freeze([...shape]);
        this.value = invoke(() => new (wasm().MultiArray)(new Uint32Array(shape), values));
    }
    private raw(): ArrayBinding {
        if (!this.value) throw new OspfError("Disposed", "array has been disposed");
        return this.value;
    }
    values(): Float64Array { return invoke(() => this.raw().values()); }
    get(index: number): number {
        if (!Number.isInteger(index) || index < 0 || index > 0xffff_ffff) throw new OspfError("InvalidInput", "invalid array index");
        return invoke(() => this.raw().get(index));
    }
    /** 二维矩阵乘法，复用 Rust einsum / 2D matrix product reusing Rust einsum. */
    matmul(other: MultiArray): MultiArray { return invoke(() => MultiArray.wrap(this.raw().matmul(other.raw()))); }
    /** 一维点积 / 1D dot product. */
    dot(other: MultiArray): number { return invoke(() => this.raw().dot(other.raw())); }
    /** 二维转置 / 2D transpose. */
    transpose(): MultiArray { return invoke(() => MultiArray.wrap(this.raw().transpose())); }
    /** 方阵迹 / Square-matrix trace. */
    trace(): number { return invoke(() => this.raw().trace()); }
    /** 两个一维向量的外积 / Outer product of two 1D vectors. */
    outer(other: MultiArray): MultiArray { return invoke(() => MultiArray.wrap(this.raw().outer(other.raw()))); }
    /** 沿指定轴缩并两个张量；缩并轴长度必须相等 / Contract two tensors along the given axes, which must have equal length. */
    contract(axis: number, other: MultiArray, otherAxis: number): MultiArray {
        return invoke(() => MultiArray.wrap(this.raw().contract(axis, other.raw(), otherAxis)));
    }
    /** 重排形状，沿用原 reshape 语义：元素不足截断、超出补零 / Reinterpret the shape with the original reshape semantics: truncate or zero-fill. */
    reshape(shape: readonly number[]): MultiArray { return invoke(() => MultiArray.wrap(this.raw().reshape(new Uint32Array(shape)))); }
    /** 全局求和 / Sum every element. */
    sumAll(): number { return invoke(() => this.raw().sumAll()); }
    /** 沿一个轴求和，该轴被消去 / Sum along one axis, removing it. */
    sumAxis(axis: number): MultiArray { return invoke(() => MultiArray.wrap(this.raw().sumAxis(axis))); }
    /** 沿多个轴求和，这些轴被消去 / Sum along several axes, removing them. */
    sumAxes(axes: readonly number[]): MultiArray { return invoke(() => MultiArray.wrap(this.raw().sumAxes(new Uint32Array(axes)))); }
    /** 沿一个轴的前缀和 / Prefix sum along one axis. */
    cumsumAxis(axis: number): MultiArray { return invoke(() => MultiArray.wrap(this.raw().cumsumAxis(axis))); }
    private static wrap(binding: ArrayBinding): MultiArray {
        const result = Object.create(MultiArray.prototype) as MultiArray;
        result.value = binding;
        const shape: number[] = Array.from(invoke(() => binding.shape()) as Uint32Array);
        (result as { shape: ReadonlyArray<number> }).shape = Object.freeze(shape);
        return result;
    }
    dispose(): void { this.value?.free(); this.value = undefined; }
}
