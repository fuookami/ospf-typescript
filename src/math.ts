import type { Decimal as DecimalBinding, Rational as RationalBinding } from "ospf-wasm-bindings";
import { invoke, OspfError } from "./base.js";
import { wasm } from "./runtime.js";

function exactText(value: string | bigint): string {
    if (typeof value !== "string" && typeof value !== "bigint") {
        throw new OspfError("InvalidInput", "exact numeric values must be strings or bigint");
    }
    return String(value);
}

/** 显式释放的 Rust 数值对象 / Explicitly disposable Rust numeric object. */
abstract class Numeric<T extends { free(): void; toString(): string }> {
    protected value: T | undefined;
    constructor(value: T) { this.value = value; }
    protected raw(): T {
        if (!this.value) throw new OspfError("Disposed", "numeric object has been disposed");
        return this.value;
    }
    toString(): string { return invoke(() => this.raw().toString()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 精确十进制，不接受会提前丢失精度的 number / Exact decimal; numbers are not accepted. */
export class Decimal extends Numeric<DecimalBinding> {
    constructor(value: string | bigint) { super(invoke(() => new (wasm().Decimal)(exactText(value)))); }
    private static wrap(value: DecimalBinding): Decimal {
        const result = Object.create(Decimal.prototype) as Decimal;
        result.value = value;
        return result;
    }
    add(other: Decimal): Decimal { return invoke(() => Decimal.wrap(this.raw().add(other.raw()))); }
    mul(other: Decimal): Decimal { return invoke(() => Decimal.wrap(this.raw().mul(other.raw()))); }
    /** 精确相减 / Subtract exactly. */
    sub(other: Decimal): Decimal { return invoke(() => Decimal.wrap(this.raw().sub(other.raw()))); }
    /** 精确取负 / Negate exactly. */
    neg(): Decimal { return invoke(() => Decimal.wrap(this.raw().neg())); }
    /** 精确比较，返回 -1／0／1；不经浮点 / Exact comparison returning -1/0/1 without floats. */
    compare(other: Decimal): -1 | 0 | 1 { return invoke(() => this.raw().compare(other.raw())) as -1 | 0 | 1; }
    isZero(): boolean { return invoke(() => this.raw().isZero()); }
}

/** 精确有理数 / Exact rational number. */
export class Rational extends Numeric<RationalBinding> {
    constructor(numerator: string | bigint, denominator: string | bigint = 1n) {
        super(invoke(() => new (wasm().Rational)(exactText(numerator), exactText(denominator))));
    }
    private static wrap(value: RationalBinding): Rational {
        const result = Object.create(Rational.prototype) as Rational;
        result.value = value;
        return result;
    }
    add(other: Rational): Rational { return invoke(() => Rational.wrap(this.raw().add(other.raw()))); }
    mul(other: Rational): Rational { return invoke(() => Rational.wrap(this.raw().mul(other.raw()))); }
    /** 精确相减 / Subtract exactly. */
    sub(other: Rational): Rational { return invoke(() => Rational.wrap(this.raw().sub(other.raw()))); }
    /** 精确相除；零除数由 Rust 拒绝 / Divide exactly; Rust rejects a zero divisor instead of fabricating infinity. */
    div(other: Rational): Rational { return invoke(() => Rational.wrap(this.raw().div(other.raw()))); }
    /** 精确取负 / Negate exactly. */
    neg(): Rational { return invoke(() => Rational.wrap(this.raw().neg())); }
    /** 精确比较，返回 -1／0／1；不经浮点 / Exact comparison returning -1/0/1 without floats. */
    compare(other: Rational): -1 | 0 | 1 { return invoke(() => this.raw().compare(other.raw())) as -1 | 0 | 1; }
    isZero(): boolean { return invoke(() => this.raw().isZero()); }
}
