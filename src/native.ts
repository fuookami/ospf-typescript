import { createRequire } from "node:module";
import type { HostCapabilities, JobView, SolveRequest } from "./base.js";
import { boundaryError, OspfError } from "./base.js";
import type { ExecutionClient } from "./framework.js";

interface Binding {
    capabilities(): string;
    submit(request: string): Promise<string>;
    get(id: string): string;
    cancel(id: string): string;
    release(id: string): void;
}

/** 显式加载可选原生包，不回退 HTTP / Explicitly load the optional native package without HTTP fallback. */
export class NodeClient implements ExecutionClient {
    private constructor(private readonly binding: Binding) {}

    static async create(): Promise<NodeClient> {
        try {
            const module: unknown = createRequire(import.meta.url)("ospf-node-bindings");
            if (typeof module !== "object" || module === null || !("NativeClient" in module) || typeof module.NativeClient !== "function") {
                throw new OspfError("NativeBindingUnavailable", "invalid native binding package");
            }
            const client = new NodeClient(new (module.NativeClient as new () => Binding)());
            await client.capabilities();
            return client;
        } catch (error) {
            if (error instanceof OspfError) throw error;
            throw new OspfError("NativeBindingUnavailable", "install the matching ospf-node-bindings platform package", { cause: error });
        }
    }

    private async read<T extends { protocolVersion: number }>(operation: () => string | Promise<string>): Promise<T> {
        try {
            const value = JSON.parse(await operation()) as T;
            if (value.protocolVersion !== 1) throw new OspfError("UnsupportedProtocolVersion", "unsupported native protocol");
            return value;
        } catch (error) { throw boundaryError(error); }
    }

    capabilities(): Promise<HostCapabilities> { return this.read(() => this.binding.capabilities()); }
    submit(request: SolveRequest): Promise<JobView> { return this.read(() => this.binding.submit(JSON.stringify(request))); }
    get(id: string): Promise<JobView> { return this.read(() => this.binding.get(id)); }
    cancel(id: string): Promise<JobView> { return this.read(() => this.binding.cancel(id)); }
    async release(id: string): Promise<void> {
        try { this.binding.release(id); } catch (error) { throw boundaryError(error); }
    }
}
