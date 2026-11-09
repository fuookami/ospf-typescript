import type { Quantity as QuantityBinding } from "ospf-wasm-bindings";
import { invoke, OspfError } from "./base.js";
import { wasm } from "./runtime.js";
import type { QuantityUnit, PhysicalQuantity } from "./base.js";

export type UnitSymbol = QuantityUnit;
export type { PhysicalQuantity } from "./base.js";

/** 有限数值的运行时物理量 / Runtime quantity with finite numeric values. */
export class Quantity {
    private binding: QuantityBinding | undefined;
    constructor(value: number, symbol: UnitSymbol) { this.binding = invoke(() => new (wasm().Quantity)(value, symbol)); }
    private raw(): QuantityBinding {
        if (!this.binding) throw new OspfError("Disposed", "quantity has been disposed");
        return this.binding;
    }
    private static wrap(binding: QuantityBinding): Quantity {
        const result = Object.create(Quantity.prototype) as Quantity;
        result.binding = binding;
        return result;
    }
    value(): number { return invoke(() => this.raw().value()); }
    /** 单位符号；量纲合并得到的单位可能没有词表条目而返回空串，此时请用 `dimension()` / Unit symbol; a unit produced by dimension algebra may return an empty string, in which case use `dimension()`. */
    symbol(): string { return invoke(() => this.raw().symbol()); }
    /** 量纲符号，例如 L、L^2、L/T / Dimension symbol such as L, L^2 or L/T. */
    dimension(): string { return invoke(() => this.raw().dimension()); }
    toDto(): PhysicalQuantity { return { value: this.value(), unit: this.symbol() as UnitSymbol }; }
    toUnit(symbol: UnitSymbol): Quantity { return invoke(() => Quantity.wrap(this.raw().toUnit(symbol))); }
    add(other: Quantity): Quantity { return invoke(() => Quantity.wrap(this.raw().add(other.raw()))); }
    /** 同量纲相减 / Subtract quantities of the same dimension. */
    sub(other: Quantity): Quantity { return invoke(() => Quantity.wrap(this.raw().sub(other.raw()))); }
    /** 无量纲标量缩放，单位不变 / Scale by a dimensionless scalar, keeping the unit. */
    scale(factor: number): Quantity { return invoke(() => Quantity.wrap(this.raw().scale(factor))); }
    /** 物理量相乘，量纲按原单位代数合并（如 m × m = m^2）/ Multiply quantities, combining dimensions through the original unit algebra. */
    mul(other: Quantity): Quantity { return invoke(() => Quantity.wrap(this.raw().mul(other.raw()))); }
    /** 物理量相除，量纲按原单位代数合并；零除数拒绝 / Divide quantities, combining dimensions; a zero divisor is rejected. */
    div(other: Quantity): Quantity { return invoke(() => Quantity.wrap(this.raw().div(other.raw()))); }
    /** 同量纲比较，返回 -1／0／1；跨量纲抛错而不是静默按数值比较 / Same-dimension comparison returning -1/0/1; cross-dimension throws instead of silently comparing raw numbers. */
    compare(other: Quantity): -1 | 0 | 1 { return invoke(() => this.raw().compare(other.raw())) as -1 | 0 | 1; }
    dispose(): void { this.binding?.free(); this.binding = undefined; }
}
