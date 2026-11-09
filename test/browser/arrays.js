import { MultiArray } from "/dist/multiarray.js";

// 数组归约/外积/缩并/重排必须在浏览器与 Worker 中给出与 Node 相同的数值。
// Array reductions, outer products, contraction and reshape must give the same numbers as Node in the browser too.
export function checkArrays() {
    const cube = new MultiArray([2, 2, 2], new Float64Array([1, 2, 3, 4, 5, 6, 7, 8]));
    const axis = cube.sumAxis(0);
    const left = new MultiArray([2, 3], new Float64Array([1, 2, 3, 4, 5, 6]));
    const right = new MultiArray([3, 2], new Float64Array([7, 8, 9, 10, 11, 12]));
    const outer = new MultiArray([2], new Float64Array([1, 2])).outer(new MultiArray([2], new Float64Array([3, 4])));
    const contracted = left.contract(1, right, 0);
    const reshaped = new MultiArray([2, 2], new Float64Array([1, 2, 3, 4])).reshape([4]);
    const padded = new MultiArray([2], new Float64Array([5, 6])).reshape([3]);
    const output = { sumAll: cube.sumAll(), axis: Array.from(axis.values()), axisShape: Array.from(axis.shape),
        outer: Array.from(outer.values()), contract: Array.from(contracted.values()),
        reshape: Array.from(reshaped.values()), padded: Array.from(padded.values()) };
    for (const value of [cube, axis, left, right, outer, contracted, reshaped, padded]) value.dispose();
    return output;
}
