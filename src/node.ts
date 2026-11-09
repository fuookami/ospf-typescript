import { readFile } from "node:fs/promises";
import { initialize as initializeBindings } from "./runtime.js";
import type { InitializeInput } from "./runtime.js";
export * from "./index.js";
export type { InitializeInput } from "./runtime.js";

/** Node 从包内读取 WASM，避免对 file: URL 使用 fetch / Read packaged WASM without fetching a file: URL. */
export async function initialize(input?: InitializeInput): Promise<void> {
    const source = input ?? { module_or_path: await readFile(new URL("./index_bg.wasm", import.meta.resolve("ospf-wasm-bindings"))) };
    await initializeBindings(source);
}
