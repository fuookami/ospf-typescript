import * as bindings from "ospf-wasm-bindings";
import { OspfError, boundaryError } from "./base.js";

let ready = false;
let pending: Promise<void> | undefined;
export type InitializeInput = Parameters<typeof bindings.default>[0];

/** 初始化只共享成功的实例，失败后允许重试 / Share successful initialization and allow retry after failure. */
export function initialize(input?: InitializeInput): Promise<void> {
    pending ??= (async () => {
        try {
            await bindings.default(input);
            if (bindings.protocolVersion() !== 1) throw new OspfError("UnsupportedProtocolVersion", "unsupported WASM protocol");
            ready = true;
        } catch (error) {
            pending = undefined;
            throw boundaryError(error);
        }
    })();
    return pending;
}

/** 构造对象前必须初始化 / Initialization is required before constructing objects. */
export function wasm(): typeof bindings {
    if (!ready) throw new OspfError("NotInitialized", "await initialize() before using WASM");
    return bindings;
}
