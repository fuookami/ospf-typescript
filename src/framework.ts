import type { ColumnGenerationReport as ColumnGenerationBinding } from "ospf-wasm-bindings";
import type { ColumnGenerationOptions, ColumnGenerationSummary } from "./base.js";
import type { CombinatorialReport as ReportBinding, FixedRecourseReport as FixedRecourseBinding } from "ospf-wasm-bindings";
import type { BackendDescriptor, ConstraintProgrammingOptions, FixedRecourseOptions, FixedRecourseSummary, HostCapabilities, JobView, MipLoweringAnalysis, ModelArtifact, ModelKind, NativeBackend, ParallelLinearOptions, ReportSummary, SerialLinearOptions, SolveRequest } from "./base.js";
import { OspfError, boundaryError, invoke } from "./base.js";
import { wasm } from "./runtime.js";
import type { Bpp1dOptions, Bpp2dOptions, Bpp3dOptions, BppLoadingBendersOptions, BppLoadingOptions, Csp1dOptions, Csp2dOptions, GanttActivityOptions } from "./base.js";
export type { ColumnGenerationBlock, ColumnGenerationOptions, ColumnGenerationStop, ColumnGenerationSummary } from "./base.js";
export type { NativeBackend, ParallelCombinatorialMode, ParallelLinearOptions, SerialFallbackPolicy, SerialLinearOptions } from "./base.js";
export type { FixedRecourseOptions, FixedRecourseStage, FixedRecourseStop, FixedRecourseSummary, StagedVariable } from "./base.js";

/** HTTP 与 N-API 的共同异步边界 / Shared asynchronous HTTP and N-API boundary. */
export interface ExecutionClient {
    capabilities(): Promise<HostCapabilities>;
    submit(request: SolveRequest): Promise<JobView>;
    get(id: string): Promise<JobView>;
    cancel(id: string): Promise<JobView>;
    release(id: string): Promise<void>;
}

export interface HttpClientOptions {
    baseUrl: string;
    token: string;
    fetch?: typeof globalThis.fetch;
    timeoutMs?: number;
}

function protocol<T extends { protocolVersion: number }>(value: T): T {
    if (typeof value !== "object" || value === null) throw new OspfError("ProtocolFailure", "host returned a non-object response");
    if (value.protocolVersion !== 1) throw new OspfError("UnsupportedProtocolVersion", "unsupported host protocol");
    return value;
}

/** 浏览器与 Node 共用的非阻塞客户端 / Nonblocking client shared by browsers and Node. */
export class HttpClient implements ExecutionClient {
    private readonly base: string;
    private readonly transport: typeof globalThis.fetch;
    private readonly timeout: number;
    constructor(private readonly options: HttpClientOptions) {
        const url = new URL(options.baseUrl);
        if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.search || url.hash) {
            throw new OspfError("InvalidConfiguration", "expected an HTTP(S) base URL without credentials, query or fragment");
        }
        if (!options.token) throw new OspfError("InvalidConfiguration", "token is required");
        this.base = options.baseUrl.replace(/\/$/, "");
        this.transport = (options.fetch ?? globalThis.fetch).bind(globalThis);
        this.timeout = options.timeoutMs ?? 30_000;
        if (!Number.isInteger(this.timeout) || this.timeout <= 0) throw new OspfError("InvalidConfiguration", "timeout must be positive");
    }

    private async request<T>(path: string, method = "GET", body?: unknown): Promise<T> {
        let response: Response;
        try {
            response = await this.transport(`${this.base}/ospf/v1${path}`, {
                method, headers: { Authorization: `Bearer ${this.options.token}`, "Content-Type": "application/json" },
                ...(body === undefined ? {} : { body: JSON.stringify(body) }),
                signal: AbortSignal.timeout(this.timeout), redirect: "error",
            });
        } catch (error) { throw new OspfError("TransportFailure", "host request failed", { cause: error }); }
        if (response.status === 204) return undefined as T;
        let value: unknown;
        try { value = await response.json(); }
        catch (error) { throw new OspfError("ProtocolFailure", "host returned invalid JSON", { cause: error }); }
        if (!response.ok) {
            if (typeof value === "object" && value !== null && "code" in value && "message" in value
                && typeof value.code === "string" && typeof value.message === "string") {
                throw new OspfError(value.code, value.message);
            }
            throw new OspfError("HttpFailure", `host returned HTTP ${response.status}`);
        }
        return value as T;
    }

    async capabilities(): Promise<HostCapabilities> { return protocol(await this.request<HostCapabilities>("/capabilities")); }
    async submit(request: SolveRequest): Promise<JobView> { return protocol(await this.request<JobView>("/jobs", "POST", request)); }
    async get(id: string): Promise<JobView> { return protocol(await this.request<JobView>(`/jobs/${encodeURIComponent(id)}`)); }
    async cancel(id: string): Promise<JobView> { return protocol(await this.request<JobView>(`/jobs/${encodeURIComponent(id)}/cancel`, "POST")); }
    async release(id: string): Promise<void> { await this.request<void>(`/jobs/${encodeURIComponent(id)}`, "DELETE"); }
}

export interface SolveOptions {
    timeLimitMs?: number;
    /** 仅限直接 scip／gurobi 入口的后端性能调优；领域与框架策略自带配置 / Backend performance tuning for direct scip/gurobi entries only; domain and framework strategies carry their own configuration. */
    tuning?: SolverTuning;
    pollIntervalMs?: number;
    /** 提交前阻止新任务；提交后请求合作取消并等待报告 / Prevent submission beforehand; request cooperative cancellation and await the report afterward. */
    signal?: AbortSignal;
    onProgress?: (progressJson: string) => void;
}

/** 后端调优开关；`mipGap` 非零时求解可能以 `GapLimit` 结束且不携带最优性证明 / Backend tuning switches; a nonzero `mipGap` may end in `GapLimit` without an optimality proof. */
export interface SolverTuning { threads?: number; seed?: number; mipGap?: number }

/** 原生 CP 参数使用 Rust 生成契约，精确提示以 bigint 门面承接 / Native CP options use the Rust-generated contract with a bigint hint facade. */
export interface ConstraintProgrammingSolveOptions extends SolveOptions, Omit<ConstraintProgrammingOptions, "solutionHint"> {
    solutionHint?: ReadonlyMap<string, bigint>;
}

/** 显式客户端的原生求解门面 / Native solver facade with an explicit execution client. */
class ExecutionSolver<B extends string> {
    constructor(readonly backend: B, readonly client: ExecutionClient) {}

    async descriptor(): Promise<BackendDescriptor> {
        const capabilities = protocol(await this.client.capabilities());
        const backend = capabilities.backends.find(b => b.id === this.backend);
        if (!backend) throw new OspfError("UnsupportedBackend", `${this.backend} is not recognized by the host`);
        return backend;
    }

    protected async solve(model: ModelArtifact, options: SolveOptions, kind: ModelKind, execution: Pick<SolveRequest, "cpOptions" | "serialOptions" | "parallelOptions" | "fixedRecourseOptions" | "columnGenerationOptions" | "bpp1dOptions" | "bpp2dOptions" | "bpp3dOptions" | "ganttActivityOptions" | "csp1dOptions" | "csp2dOptions" | "bppLoadingOptions"> = {}): Promise<JobView> {
        const interval = options.pollIntervalMs ?? 100;
        if (!Number.isFinite(interval) || interval < 1 || interval > 60_000) throw new OspfError("InvalidInput", "invalid poll interval");
        if (options.timeLimitMs !== undefined && (!Number.isInteger(options.timeLimitMs) || options.timeLimitMs < 1 || options.timeLimitMs > 0xffff_ffff)) {
            throw new OspfError("InvalidInput", "invalid time limit");
        }
        const tuning = options.tuning;
        if (tuning !== undefined) {
            if (typeof tuning !== "object" || tuning === null || Object.keys(tuning).some(key => key !== "threads" && key !== "seed" && key !== "mipGap")
                || (tuning.threads === undefined && tuning.seed === undefined && tuning.mipGap === undefined)
                || (tuning.threads !== undefined && (!Number.isInteger(tuning.threads) || tuning.threads < 1 || tuning.threads > 64))
                || (tuning.seed !== undefined && !Number.isInteger(tuning.seed))
                || (tuning.mipGap !== undefined && (!Number.isFinite(tuning.mipGap) || tuning.mipGap < 0 || tuning.mipGap >= 1))) throw new OspfError("InvalidInput", "invalid solver tuning");
            // 与 Rust 侧规则一致：策略选项各自持有配置，只有直接后端入口接受调优 / Mirrors the Rust rule: strategy options own their configuration, so only direct backend entries accept tuning.
            const strategies = ["serialOptions", "parallelOptions", "fixedRecourseOptions", "columnGenerationOptions", "bpp1dOptions", "bpp2dOptions", "bpp3dOptions", "csp1dOptions", "csp2dOptions", "bppLoadingOptions", "ganttActivityOptions"];
            if (strategies.some(key => (execution as Record<string, unknown>)[key] !== undefined)) {
                throw new OspfError("InvalidInput", "solver tuning is accepted only by direct scip/gurobi entries without strategy options");
            }
        }
        if (options.signal?.aborted) throw new OspfError("Aborted", "solve aborted before submission");
        const capabilities = protocol(await this.client.capabilities());
        if (options.signal?.aborted) throw new OspfError("Aborted", "solve aborted before submission");
        if (!capabilities.backends.some(b => b.id === this.backend && b.compiled)) {
            throw new OspfError("BackendNotCompiled", `${this.backend} is not compiled into the native host`);
        }
        const requiredCapability = kind === "cp" ? "cpExactLowering" : kind;
        if (kind !== "linear" && !capabilities.backends.some(b => b.id === this.backend && b.capabilities.includes(requiredCapability))) {
            throw new OspfError("UnsupportedCapability", `${this.backend} does not advertise ${requiredCapability} support`);
        }
        if (execution.cpOptions && !capabilities.backends.some(b => b.id === this.backend && b.capabilities.includes("cpSolveOptions"))) {
            throw new OspfError("UnsupportedCapability", `${this.backend} does not advertise cpSolveOptions support`);
        }
        if (kind === "cp" && !capabilities.backends.some(b => b.id === this.backend && b.capabilities.includes("cpObjectiveConstant"))) {
            invoke(() => {
                const snapshot = wasm().ConstraintProgrammingSnapshot.fromArtifact(JSON.stringify(model));
                try {
                    if (snapshot.hasObjectiveConstant()) throw new OspfError("UnsupportedCapability", `${this.backend} does not advertise cpObjectiveConstant support`);
                    const analysis = JSON.parse(snapshot.analyzeMipLowering()) as MipLoweringAnalysis;
                    if (analysis.status !== "lowered") throw new OspfError("UnsupportedCapability", `${this.backend} does not advertise safe CP objective bounds and the model failed current MIP preflight`);
                } finally { snapshot.free(); }
            });
        }
        if (execution.bppLoadingOptions) {
            const required = execution.bppLoadingOptions.partition ? "bppLoadingPartitionColumnGeneration" : execution.bppLoadingOptions.benders ? "bppLoadingBenders" : "bppLoadingMilp";
            if (!capabilities.backends.some(b => b.id === this.backend && b.capabilities.includes(required))) throw new OspfError("UnsupportedCapability", `host does not advertise ${required} support`);
            if (execution.bppLoadingOptions.benders?.sourceMilpFinishing && !capabilities.backends.some(b => b.id === this.backend && b.capabilities.includes("bppLoadingSourceFinishing"))) {
                throw new OspfError("UnsupportedCapability", "host does not advertise bppLoadingSourceFinishing support");
            }
            if (execution.bppLoadingOptions.partition?.sourceMilpFinishing && !capabilities.backends.some(b => b.id === this.backend && b.capabilities.includes("bppLoadingPartitionSourceFinishing"))) {
                throw new OspfError("UnsupportedCapability", "host does not advertise bppLoadingPartitionSourceFinishing support");
            }
            const backend = execution.bppLoadingOptions.backend;
            if (!capabilities.backends.some(b => b.id === backend && b.compiled && b.capabilities.includes("linear") && b.capabilities.includes("mip"))) throw new OspfError("BackendNotCompiled", `${backend} is not available for the shared BPP application`);
        }
        const composition = execution.serialOptions ?? execution.parallelOptions;
        if (composition) {
            const required = execution.serialOptions ? "serialLinear" : "parallelLinear";
            if (!capabilities.backends.some(b => b.id === this.backend && b.capabilities.includes(required))) throw new OspfError("UnsupportedCapability", `host does not advertise ${required} support`);
            for (const backend of composition.backends) {
                if (!capabilities.backends.some(b => b.id === backend && b.compiled && b.capabilities.includes("linear"))) throw new OspfError("BackendNotCompiled", `${backend} is not available for native linear composition`);
            }
        }
        if (execution.fixedRecourseOptions) {
            if (!capabilities.backends.some(b => b.id === this.backend && b.capabilities.includes("fixedRecourse"))) throw new OspfError("UnsupportedCapability", "host does not advertise fixedRecourse support");
            const backend = execution.fixedRecourseOptions.backend;
            if (!capabilities.backends.some(b => b.id === backend && b.compiled && b.capabilities.includes("linear"))) throw new OspfError("BackendNotCompiled", `${backend} is not available for fixed continuous recourse`);
        }
        if (execution.columnGenerationOptions) {
            if (!capabilities.backends.some(b => b.id === this.backend && b.capabilities.includes("columnGeneration"))) throw new OspfError("UnsupportedCapability", "host does not advertise columnGeneration support");
            const backend = execution.columnGenerationOptions.backend;
            if (!capabilities.backends.some(b => b.id === backend && b.compiled && b.capabilities.includes("linear"))) throw new OspfError("BackendNotCompiled", `${backend} is not available for column generation`);
        }
        if (execution.bpp1dOptions) {
            const required = execution.bpp1dOptions.algorithm === "milp" ? "bpp1dMilp" : "bpp1dColumnGeneration";
            if (!capabilities.backends.some(b => b.id === this.backend && b.capabilities.includes(required))) throw new OspfError("UnsupportedCapability", `host does not advertise ${required} support`);
            const backend = execution.bpp1dOptions.backend;
            if (!capabilities.backends.some(b => b.id === backend && b.compiled && b.capabilities.includes("linear"))) throw new OspfError("BackendNotCompiled", `${backend} is not available for BPP1D`);
        }
        if (execution.csp1dOptions) {
            const required = execution.csp1dOptions.algorithm === "milp" ? "csp1dMilp" : "csp1dColumnGeneration";
            if (!capabilities.backends.some(b => b.id === this.backend && b.capabilities.includes(required))) throw new OspfError("UnsupportedCapability", `host does not advertise ${required} support`);
            const backend = execution.csp1dOptions.backend;
            if (!capabilities.backends.some(b => b.id === backend && b.compiled && b.capabilities.includes("linear") && b.capabilities.includes("mip"))) throw new OspfError("BackendNotCompiled", `${backend} is not available for CSP1D LP/MILP execution`);
        }
        if (execution.bpp2dOptions) {
            if (!capabilities.backends.some(b => b.id === this.backend && b.capabilities.includes("bpp2dColumnGeneration"))) throw new OspfError("UnsupportedCapability", "host does not advertise bpp2dColumnGeneration support");
            const backend = execution.bpp2dOptions.backend;
            if (!capabilities.backends.some(b => b.id === backend && b.compiled && b.capabilities.includes("linear") && b.capabilities.includes("mip"))) throw new OspfError("BackendNotCompiled", `${backend} is not available for BPP2D LP/MILP execution`);
        }
        if (execution.bpp3dOptions) {
            if (!capabilities.backends.some(b => b.id === this.backend && b.capabilities.includes("bpp3dOneRoundExecution"))) throw new OspfError("UnsupportedCapability", "host does not advertise bpp3dOneRoundExecution support");
            const backend = execution.bpp3dOptions.backend;
            if (!capabilities.backends.some(b => b.id === backend && b.compiled && b.capabilities.includes("linear") && b.capabilities.includes("mip"))) throw new OspfError("BackendNotCompiled", `${backend} is not available for BPP3D LP/MILP execution`);
        }
        if (execution.ganttActivityOptions) {
            if (!capabilities.backends.some(b => b.id === this.backend && b.capabilities.includes("ganttActivity"))) throw new OspfError("UnsupportedCapability", "host does not advertise ganttActivity support");
            const backend = execution.ganttActivityOptions.backend;
            if (!capabilities.backends.some(b => b.id === backend && b.compiled && b.capabilities.includes("linear") && b.capabilities.includes("mip"))) throw new OspfError("BackendNotCompiled", `${backend} is not available for Gantt activity MILP execution`);
        }
        if (execution.csp2dOptions) {
            if (!capabilities.backends.some(b => b.id === this.backend && b.capabilities.includes("csp2dColumnGeneration"))) throw new OspfError("UnsupportedCapability", "host does not advertise csp2dColumnGeneration support");
            const backend = execution.csp2dOptions.backend;
            if (!capabilities.backends.some(b => b.id === backend && b.compiled && b.capabilities.includes("linear") && b.capabilities.includes("mip"))) throw new OspfError("BackendNotCompiled", `${backend} is not available for CSP2D LP/integer execution`);
        }
        if (options.signal?.aborted) throw new OspfError("Aborted", "solve aborted before submission");
        let view = protocol(await this.client.submit({
            protocolVersion: 1, solver: this.backend, model, timeLimitMs: options.timeLimitMs ?? null,
            ...(kind !== "linear" ? { modelKind: kind } : {}),
            ...(tuning ? { tuningOptions: { ...(tuning.threads !== undefined ? { threads: tuning.threads } : {}), ...(tuning.seed !== undefined ? { seed: tuning.seed } : {}), ...(tuning.mipGap !== undefined ? { mipGap: tuning.mipGap } : {}) } } : {}),
            ...execution,
        }));
        const jobId = view.id;
        if (typeof jobId !== "string" || !jobId) throw new OspfError("ProtocolFailure", "host returned an invalid job identity");
        let cancelled = false;
        let lastProgress: string | null = null;
        try {
            while (true) {
                if (view.id !== jobId) throw new OspfError("ProtocolFailure", "job identity changed while polling");
                if (view.fingerprint !== model.fingerprint) throw new OspfError("FingerprintMismatch", "job belongs to a different model");
                if (view.progressJson !== null && view.progressJson !== lastProgress) {
                    if (typeof view.progressJson !== "string") throw new OspfError("ProtocolFailure", "invalid progress payload");
                    lastProgress = view.progressJson;
                    options.onProgress?.(view.progressJson);
                }
                if (view.status === "failed") throw new OspfError(view.error?.code ?? "SolverFailure", view.error?.message ?? "native solve failed");
                if (view.status === "completed") {
                    if (typeof view.reportJson !== "string" || !view.reportJson) throw new OspfError("ProtocolFailure", "completed job has no report");
                    return view;
                }
                if (view.status !== "running") throw new OspfError("ProtocolFailure", "unknown job status");
                if (options.signal?.aborted && !cancelled) {
                    view = protocol(await this.client.cancel(view.id));
                    cancelled = true;
                    continue;
                }
                const signal = cancelled ? undefined : options.signal;
                await new Promise<void>(resolve => {
                    const done = () => { clearTimeout(timer); signal?.removeEventListener("abort", done); resolve(); };
                    const timer = setTimeout(done, interval);
                    signal?.addEventListener("abort", done, { once: true });
                    if (signal?.aborted) done();
                });
                if (signal?.aborted) continue;
                view = protocol(await this.client.get(jobId));
            }
        } catch (cause) {
            if (view.status === "running" && !cancelled) {
                try { await this.client.cancel(jobId); } catch { /* 不覆盖首个错误 / Do not overwrite the original error. */ }
            }
            const error = boundaryError(cause);
            error.jobId = jobId;
            throw error;
        }
    }
}

/** 原生预注册一维装箱规则，配置不可携带 JS 回调 / Native registered BPP1D rules; configuration cannot carry JS callbacks. */
class Bpp1dSolver extends ExecutionSolver<"bpp1d"> {
    private readonly configuration: Bpp1dOptions;
    constructor(client: ExecutionClient, configuration: Omit<Bpp1dOptions, "algorithm">, algorithm: Bpp1dOptions["algorithm"]) {
        super("bpp1d", client);
        if (typeof configuration !== "object" || configuration === null || (configuration.backend !== "scip" && configuration.backend !== "gurobi")) throw new OspfError("InvalidInput", "an explicit BPP1D native backend is required");
        const fields: ReadonlyArray<keyof Omit<Bpp1dOptions, "algorithm">> = ["backend", "generation", "iterationLimit", "columnsPerIteration", "expansionLimit", "tolerance", "tailWindow"];
        if (Object.keys(configuration).some(key => !fields.some(field => field === key))) throw new OspfError("InvalidInput", "unsupported BPP1D configuration field");
        for (const [value, maximum] of [[configuration.iterationLimit, 10_000], [configuration.columnsPerIteration, 10_000], [configuration.expansionLimit, 100_000]] as const) {
            if (value !== undefined && (!Number.isInteger(value) || value < 1 || value > maximum)) throw new OspfError("InvalidInput", "invalid BPP1D work budget");
        }
        if (configuration.tolerance !== undefined && (!Number.isFinite(configuration.tolerance) || configuration.tolerance < 0 || configuration.tolerance >= 0.5)) throw new OspfError("InvalidInput", "invalid BPP1D tolerance");
        if (configuration.tailWindow !== undefined && (!Number.isInteger(configuration.tailWindow) || configuration.tailWindow < 1 || configuration.tailWindow > 1000)) throw new OspfError("InvalidInput", "invalid BPP1D tail window");
        const generation = configuration.generation;
        if (generation !== undefined) {
            if (typeof generation !== "object" || generation === null || Object.keys(generation).some(key => key !== "maxPatterns" && key !== "maxNodes")) throw new OspfError("InvalidInput", "invalid BPP1D generation options");
            for (const [value, maximum] of [[generation.maxPatterns, 10_000], [generation.maxNodes, 100_000]] as const) {
                if (value !== undefined && (!Number.isInteger(value) || value < 1 || value > maximum)) throw new OspfError("InvalidInput", "invalid BPP1D generation budget");
            }
        }
        this.configuration = { ...configuration, ...(generation !== undefined ? { generation: { ...generation } } : {}), algorithm };
    }
    async solve(problem: ModelArtifact, options: SolveOptions = {}): Promise<JobView> {
        return super.solve(problem, options, "bpp1d", { bpp1dOptions: { ...this.configuration, ...(this.configuration.generation ? { generation: { ...this.configuration.generation } } : {}) } });
    }
}

/** 有界候选 MILP，真实求解仅在原生端 / Bounded-candidate MILP; actual solving is native-only. */
export class Bpp1dMilp extends Bpp1dSolver {
    constructor(client: ExecutionClient, configuration: Omit<Bpp1dOptions, "algorithm">) { super(client, configuration, "milp"); }
}

/** 有限池列激活，final 使用完整当前候选池，不是通用 DW 定价 / Finite-pool activation with full-current-pool final, not generic DW pricing. */
export class Bpp1dColumnGeneration extends Bpp1dSolver {
    constructor(client: ExecutionClient, configuration: Omit<Bpp1dOptions, "algorithm">) { super(client, configuration, "columnGeneration"); }
}

/** 原生 CSP1D 默认规则，显式选择客户端和后端；不回退启发式 / Native CSP1D default rules with explicit client/backend selection and no heuristic fallback. */
class Csp1dSolver extends ExecutionSolver<"csp1d"> {
    private readonly configuration: Csp1dOptions;
    constructor(client: ExecutionClient, configuration: Omit<Csp1dOptions, "algorithm">, algorithm: Csp1dOptions["algorithm"]) {
        super("csp1d", client);
        const fields: ReadonlyArray<keyof Omit<Csp1dOptions, "algorithm">> = ["backend", "generation", "iterationLimit", "columnsPerIteration", "poolLimit"];
        if (typeof configuration !== "object" || configuration === null || (configuration.backend !== "scip" && configuration.backend !== "gurobi")
            || Object.keys(configuration).some(key => !fields.some(field => key === field))) throw new OspfError("InvalidInput", "an explicit bounded CSP1D native configuration is required");
        for (const [value, maximum] of [[configuration.iterationLimit, 64], [configuration.columnsPerIteration, 512], [configuration.poolLimit, 512]] as const) {
            if (value !== undefined && (!Number.isInteger(value) || value < 1 || value > maximum)) throw new OspfError("InvalidInput", "invalid CSP1D work budget");
        }
        const generation = configuration.generation;
        if (generation !== undefined) {
            if (typeof generation !== "object" || generation === null || Object.keys(generation).some(key => !["generator", "maxPlans", "maxKnives"].includes(key))
                || (generation.generator !== undefined && generation.generator !== "simple" && generation.generator !== "nSame")) throw new OspfError("InvalidInput", "invalid CSP1D candidate strategy");
            for (const [value, maximum] of [[generation.maxPlans, 512], [generation.maxKnives, 64]] as const) {
                if (value !== undefined && (!Number.isInteger(value) || value < 1 || value > maximum)) throw new OspfError("InvalidInput", "invalid CSP1D generation budget");
            }
        }
        if ((generation?.maxPlans ?? 128) > (configuration.poolLimit ?? 512)) throw new OspfError("InvalidInput", "CSP1D initial candidate budget exceeds poolLimit");
        this.configuration = { ...configuration, ...(generation !== undefined ? { generation: { ...generation } } : {}), algorithm };
    }
    async solve(problem: ModelArtifact, options: SolveOptions = {}): Promise<JobView> {
        return super.solve(problem, options, "csp1d", { csp1dOptions: { ...this.configuration, ...(this.configuration.generation ? { generation: { ...this.configuration.generation } } : {}) } });
    }
}

/** 原领域有界候选整数模型，仅在所选原生端求解 / Original bounded-candidate integer model, solved only on the selected native endpoint. */
export class Csp1dMilp extends Csp1dSolver {
    constructor(client: ExecutionClient, configuration: Omit<Csp1dOptions, "algorithm">) { super(client, configuration, "milp"); }
}

/** 原 LP、受限定价与最终整数流程；池内收敛不是全局证明 / Original LP, restricted pricing and final-integer workflow; pool convergence is not a global proof. */
export class Csp1dColumnGeneration extends Csp1dSolver {
    constructor(client: ExecutionClient, configuration: Omit<Csp1dOptions, "algorithm">) { super(client, configuration, "columnGeneration"); }
}

/** 原生 BPP2D Phase I、认证 LP 定价与 final MILP；仅接受预注册策略，不提供浏览器求解或隐式回退 / Native BPP2D Phase I, certified LP pricing and final MILP with preregistered strategies only, never browser solving or implicit fallback. */
export class Bpp2dColumnGeneration extends ExecutionSolver<"bpp2d"> {
    private readonly configuration: Bpp2dOptions;
    constructor(client: ExecutionClient, configuration: Bpp2dOptions) {
        super("bpp2d", client);
        const fields: ReadonlyArray<keyof Bpp2dOptions> = ["backend", "generators", "iterationLimit", "candidatesPerIteration", "poolLimit", "finalMilpEnabled", "reducedCostTolerance", "reportLimit"];
        if (typeof configuration !== "object" || configuration === null || (configuration.backend !== "scip" && configuration.backend !== "gurobi")
            || Object.keys(configuration).some(key => !fields.some(field => key === field))) throw new OspfError("InvalidInput", "an explicit bounded BPP2D native configuration is required");
        for (const [value, minimum, maximum] of [[configuration.iterationLimit, 0, 64], [configuration.candidatesPerIteration, 1, 512],
            [configuration.poolLimit, 1, 512], [configuration.reportLimit, 1, 1024]] as const) {
            if (value !== undefined && (!Number.isInteger(value) || value < minimum || value > maximum)) throw new OspfError("InvalidInput", "invalid BPP2D work budget");
        }
        if (configuration.finalMilpEnabled !== undefined && typeof configuration.finalMilpEnabled !== "boolean") throw new OspfError("InvalidInput", "expected a boolean BPP2D final flag");
        if (configuration.reducedCostTolerance !== undefined && (!Number.isFinite(configuration.reducedCostTolerance) || configuration.reducedCostTolerance < 0 || configuration.reducedCostTolerance >= 0.5)) throw new OspfError("InvalidInput", "invalid BPP2D reduced-cost tolerance");
        const generators = configuration.generators;
        const registered: NonNullable<Bpp2dOptions["generators"]> = ["blockLocal", "blockGlobal", "spaceSplit", "bla", "pattern", "circleGrid", "mixedShape", "history"];
        if (generators !== undefined && (!Array.isArray(generators) || generators.length < 1 || generators.length > 8 || new Set(generators).size !== generators.length
            || generators.some(generator => !registered.includes(generator)))) throw new OspfError("InvalidInput", "expected 1..8 distinct registered BPP2D generators");
        this.configuration = { ...configuration, ...(generators !== undefined ? { generators: [...generators] } : {}) };
    }
    async solve(problem: ModelArtifact, options: SolveOptions = {}): Promise<JobView> {
        return super.solve(problem, options, "bpp2d", { bpp2dOptions: { ...this.configuration, ...(this.configuration.generators ? { generators: [...this.configuration.generators] } : {}) } });
    }
}

/** 原 BPP3D 单轮原生执行（初始 RMP、原生成器加列、刷新 RMP、final 与严格物理回放）；显式客户端，不在 TS 重写编排或生成器 / Original BPP3D one-round native execution (initial RMP, original generator, refreshed RMP, final and strict physical replay) with an explicit client, without TS orchestration or generator reimplementation. */
export class Bpp3dOneRoundExecution extends ExecutionSolver<"bpp3d"> {
    private readonly configuration: Bpp3dOptions;
    constructor(client: ExecutionClient, configuration: Bpp3dOptions) {
        super("bpp3d", client);
        const fields: ReadonlyArray<keyof Bpp3dOptions> = ["backend", "generators", "reportLimit", "maxPlacements"];
        if (typeof configuration !== "object" || configuration === null || (configuration.backend !== "scip" && configuration.backend !== "gurobi")
            || Object.keys(configuration).some(key => !fields.some(field => key === field))) throw new OspfError("InvalidInput", "an explicit bounded BPP3D native configuration is required");
        for (const [value, minimum, maximum] of [[configuration.reportLimit, 1, 1024], [configuration.maxPlacements, 1, 100_000]] as const) {
            if (value !== undefined && (!Number.isInteger(value) || value < minimum || value > maximum)) throw new OspfError("InvalidInput", "invalid BPP3D work budget");
        }
        const generators = configuration.generators;
        const registered: NonNullable<Bpp3dOptions["generators"]> = ["block", "blLocal", "blGlobal", "circlePacking", "pattern", "pile", "historical"];
        if (generators !== undefined && (!Array.isArray(generators) || generators.length < 1 || generators.length > 7 || new Set(generators).size !== generators.length
            || generators.some(generator => !registered.includes(generator)))) throw new OspfError("InvalidInput", "expected 1..7 distinct registered BPP3D generators");
        this.configuration = { ...configuration, ...(generators !== undefined ? { generators: [...generators] } : {}) };
    }
    async solve(problem: ModelArtifact, options: SolveOptions = {}): Promise<JobView> {
        return super.solve(problem, options, "bpp3d", { bpp3dOptions: { ...this.configuration, ...(this.configuration.generators ? { generators: [...this.configuration.generators] } : {}) } });
    }
}

/** 原 Gantt 活动调度单 MILP；显式客户端，不在 TS 重写候选展开、复验或回退 / Original single-MILP Gantt activity scheduling with an explicit client, without TS candidate expansion, revalidation or fallback reimplementation. */
export class GanttActivitySolver extends ExecutionSolver<"gantt-activity"> {
    private readonly configuration: GanttActivityOptions;
    constructor(client: ExecutionClient, configuration: GanttActivityOptions) {
        super("gantt-activity", client);
        if (typeof configuration !== "object" || configuration === null || (configuration.backend !== "scip" && configuration.backend !== "gurobi")
            || Object.keys(configuration).some(key => key !== "backend")) throw new OspfError("InvalidInput", "an explicit Gantt activity native backend is required");
        this.configuration = { backend: configuration.backend };
    }
    async solve(problem: ModelArtifact, options: SolveOptions = {}): Promise<JobView> {
        return super.solve(problem, options, "ganttActivity", { ganttActivityOptions: { ...this.configuration } });
    }
}

/** 原共享 BPP 普通 MILP application；显式客户端，不在 TS 重写编排或自动回退 / Original shared BPP ordinary MILP application with an explicit client, without TS orchestration reimplementation or automatic fallback. */
export class DiscreteLoadingApplicationService extends ExecutionSolver<"bpp-loading"> {
    private readonly configuration: Pick<BppLoadingOptions, "backend">;
    constructor(client: ExecutionClient, configuration: Pick<BppLoadingOptions, "backend">) {
        super("bpp-loading", client);
        if (typeof configuration !== "object" || configuration === null || !["scip", "gurobi"].includes(configuration.backend)
            || Object.keys(configuration).some(key => key !== "backend")) throw new OspfError("InvalidInput", "expected an explicit shared BPP native backend without callbacks or unknown options");
        this.configuration = { backend: configuration.backend };
    }
    async solve(source: ModelArtifact, options: SolveOptions = {}): Promise<JobView> {
        return super.solve(source, options, "bppLoading", { bppLoadingOptions: { ...this.configuration } });
    }
}

/** 生成配置的分区门面，允许省略资源补全白名单 / Generated partition configuration facade with an optional resource-completion whitelist. */
export type PartitionColumnGenerationOptions = Omit<import("ospf-wasm-bindings/protocol").BppLoadingPartitionExecutionOptions, "partition"> & {
    backend: NativeBackend;
    partition: import("./bpp.js").PartitionLoadingOptions;
};

/** 原生原分区 application；TS 不运行列生成或自动选择 HTTP / Original native partition application; TS neither runs CG nor automatically selects HTTP. */
export class PartitionColumnGenerationApplicationService extends ExecutionSolver<"bpp-loading"> {
    private readonly configuration: import("ospf-wasm-bindings/protocol").BppLoadingPartitionExecutionOptions;
    private readonly nativeBackend: NativeBackend;
    constructor(client: ExecutionClient, configuration: PartitionColumnGenerationOptions) {
        super("bpp-loading", client);
        const fields = ["backend", "partition", "iterationLimit", "columnLimit", "completionColumnLimit", "reportLimit", "sourceMilpFinishing"];
        if (typeof configuration !== "object" || configuration === null || !["scip", "gurobi"].includes(configuration.backend)
            || Object.keys(configuration).some(key => !fields.includes(key))) throw new OspfError("InvalidInput", "expected an explicit partition native backend and bounded configuration");
        for (const [value, minimum, maximum] of [[configuration.iterationLimit, 1, 64], [configuration.columnLimit, 1, 4096],
            [configuration.completionColumnLimit, 0, 128], [configuration.reportLimit, 1, 1024]] as const) {
            if (value !== undefined && (!Number.isInteger(value) || value < minimum || value > maximum)) throw new OspfError("InvalidInput", "invalid partition work budget");
        }
        const partition = configuration.partition;
        if (typeof partition !== "object" || partition === null || Object.keys(partition).some(key => !["partitions", "refinableResources"].includes(key))
            || !Array.isArray(partition.partitions) || partition.partitions.length < 1 || partition.partitions.length > 128
            || partition.partitions.some(block => typeof block !== "object" || block === null || Object.keys(block).some(key => !["id", "positionIds"].includes(key))
                || typeof block.id !== "string" || !block.id.trim() || !Array.isArray(block.positionIds) || block.positionIds.length < 1 || block.positionIds.some(id => typeof id !== "string" || !id.trim()))
            || (partition.refinableResources !== undefined && (!Array.isArray(partition.refinableResources) || partition.refinableResources.some(id => typeof id !== "string" || !id.trim())))) {
            throw new OspfError("InvalidInput", "expected explicit typed partition ownership and resource identities, never callbacks or raw tokens");
        }
        const finishing = configuration.sourceMilpFinishing;
        if (finishing !== undefined && (typeof finishing !== "object" || finishing === null || Array.isArray(finishing)
            || Object.keys(finishing).some(key => key !== "reserveTimeMs") || !Number.isInteger(finishing.reserveTimeMs)
            || finishing.reserveTimeMs < 1 || finishing.reserveTimeMs > 0xffff_ffff)) throw new OspfError("InvalidInput", "expected a positive bounded partition source finishing reservation without callbacks");
        this.nativeBackend = configuration.backend;
        this.configuration = { ...(configuration.iterationLimit !== undefined ? { iterationLimit: configuration.iterationLimit } : {}),
            ...(configuration.columnLimit !== undefined ? { columnLimit: configuration.columnLimit } : {}),
            ...(configuration.completionColumnLimit !== undefined ? { completionColumnLimit: configuration.completionColumnLimit } : {}),
            ...(configuration.reportLimit !== undefined ? { reportLimit: configuration.reportLimit } : {}),
            ...(finishing !== undefined ? { sourceMilpFinishing: { reserveTimeMs: finishing.reserveTimeMs } } : {}),
            partition: { partitions: partition.partitions.map(block => ({ id: block.id, positionIds: [...block.positionIds] })), refinableResources: [...(partition.refinableResources ?? [])] } };
    }
    async solve(source: ModelArtifact, options: SolveOptions = {}): Promise<JobView> {
        const configured = this.configuration;
        if (configured.sourceMilpFinishing && configured.sourceMilpFinishing.reserveTimeMs >= (options.timeLimitMs ?? 60_000)) {
            throw new OspfError("InvalidInput", "partition source finishing reservation must be strictly below the same total time limit");
        }
        return super.solve(source, options, "bppLoading", { bppLoadingOptions: { backend: this.nativeBackend, partition: { ...configured,
            ...(configured.sourceMilpFinishing ? { sourceMilpFinishing: { ...configured.sourceMilpFinishing } } : {}),
            partition: { partitions: configured.partition.partitions.map(block => ({ ...block, positionIds: [...block.positionIds] })), refinableResources: [...configured.partition.refinableResources] } } } });
    }
}

/** 生成的 Benders 策略与显式后端，不接受 TS trait 回调 / Generated Benders strategy with an explicit backend, without TS trait callbacks. */
export interface DiscreteLoadingBendersOptions extends BppLoadingBendersOptions { backend: NativeBackend; }

/** 原共享 BPP 的真实连续资源追索；回退必须显式开启 / Actual continuous-resource recourse in original shared BPP; fallback must be explicitly enabled. */
export class DiscreteLoadingBendersApplicationService extends ExecutionSolver<"bpp-loading"> {
    private readonly configuration: BppLoadingBendersOptions;
    private readonly nativeBackend: NativeBackend;
    constructor(client: ExecutionClient, configuration: DiscreteLoadingBendersOptions) {
        super("bpp-loading", client);
        const fields: readonly string[] = ["backend", "recourseResources", "iterationLimit", "recoverMissingCertificates", "fallbackToMilp", "sourceMilpFinishing"];
        if (typeof configuration !== "object" || configuration === null || !["scip", "gurobi"].includes(configuration.backend)
            || Object.keys(configuration).some(key => !fields.includes(key))) throw new OspfError("InvalidInput", "expected explicit BPP Benders resource configuration without callbacks");
        const resources = configuration.recourseResources;
        if (!Array.isArray(resources) || resources.length < 1 || resources.length > 128 || new Set(resources).size !== resources.length
            || resources.some(id => typeof id !== "string" || id.trim().length === 0)) throw new OspfError("InvalidInput", "expected 1..128 unique recourse resource identities");
        if (configuration.iterationLimit !== undefined && (!Number.isInteger(configuration.iterationLimit) || configuration.iterationLimit < 1 || configuration.iterationLimit > 10_000)) throw new OspfError("InvalidInput", "invalid BPP Benders iteration limit");
        for (const value of [configuration.recoverMissingCertificates, configuration.fallbackToMilp]) {
            if (value !== undefined && typeof value !== "boolean") throw new OspfError("InvalidInput", "expected boolean BPP Benders strategy flags");
        }
        const finishing = configuration.sourceMilpFinishing;
        if (finishing !== undefined && (typeof finishing !== "object" || finishing === null || Array.isArray(finishing)
            || Object.keys(finishing).some(key => key !== "reserveTimeMs") || !Number.isInteger(finishing.reserveTimeMs)
            || finishing.reserveTimeMs < 1 || finishing.reserveTimeMs > 0xffff_ffff)) throw new OspfError("InvalidInput", "expected a positive bounded source MILP finishing reservation without callbacks");
        this.nativeBackend = configuration.backend;
        this.configuration = { recourseResources: [...resources],
            ...(configuration.iterationLimit !== undefined ? { iterationLimit: configuration.iterationLimit } : {}),
            ...(configuration.recoverMissingCertificates !== undefined ? { recoverMissingCertificates: configuration.recoverMissingCertificates } : {}),
            ...(configuration.fallbackToMilp !== undefined ? { fallbackToMilp: configuration.fallbackToMilp } : {}),
            ...(finishing !== undefined ? { sourceMilpFinishing: { reserveTimeMs: finishing.reserveTimeMs } } : {}),
        };
    }
    async solve(source: ModelArtifact, options: SolveOptions = {}): Promise<JobView> {
        const finishing = this.configuration.sourceMilpFinishing;
        if (finishing && finishing.reserveTimeMs >= (options.timeLimitMs ?? 60_000)) throw new OspfError("InvalidInput", "source MILP finishing reservation must be strictly below the same total time limit");
        return super.solve(source, options, "bppLoading", { bppLoadingOptions: { backend: this.nativeBackend,
            benders: { ...this.configuration, recourseResources: [...this.configuration.recourseResources],
                ...(finishing ? { sourceMilpFinishing: { ...finishing } } : {}) } } });
    }
}

/** 原生 CSP2D Phase I、认证 LP 定价与 final MILP；仅接受预注册策略，不提供浏览器求解或隐式回退 / Native CSP2D Phase I, certified LP pricing and final MILP with preregistered strategies only, never browser solving or implicit fallback. */
export class Csp2dColumnGeneration extends ExecutionSolver<"csp2d"> {
    private readonly configuration: Csp2dOptions;
    constructor(client: ExecutionClient, configuration: Csp2dOptions) {
        super("csp2d", client);
        const fields: ReadonlyArray<keyof Csp2dOptions> = ["backend", "generators", "iterationLimit", "candidatesPerIteration", "poolLimit", "finalIntegerEnabled", "reducedCostTolerance", "reportLimit"];
        if (typeof configuration !== "object" || configuration === null || (configuration.backend !== "scip" && configuration.backend !== "gurobi")
            || Object.keys(configuration).some(key => !fields.some(field => key === field))) throw new OspfError("InvalidInput", "an explicit bounded CSP2D native configuration is required");
        for (const [value, minimum, maximum] of [[configuration.iterationLimit, 0, 64], [configuration.candidatesPerIteration, 1, 512],
            [configuration.poolLimit, 1, 512], [configuration.reportLimit, 1, 1024]] as const) {
            if (value !== undefined && (!Number.isInteger(value) || value < minimum || value > maximum)) throw new OspfError("InvalidInput", "invalid CSP2D work budget");
        }
        if (configuration.finalIntegerEnabled !== undefined && typeof configuration.finalIntegerEnabled !== "boolean") throw new OspfError("InvalidInput", "expected a boolean CSP2D final flag");
        if (configuration.reducedCostTolerance !== undefined && (!Number.isFinite(configuration.reducedCostTolerance) || configuration.reducedCostTolerance < 0 || configuration.reducedCostTolerance >= 0.5)) throw new OspfError("InvalidInput", "invalid CSP2D reduced-cost tolerance");
        const generators = configuration.generators;
        const registered: NonNullable<Csp2dOptions["generators"]> = ["shelf"];
        if (generators !== undefined && (!Array.isArray(generators) || generators.length < 1 || generators.length > 1 || new Set(generators).size !== generators.length
            || generators.some(generator => !registered.includes(generator)))) throw new OspfError("InvalidInput", "expected exactly one registered CSP2D shelf generator");
        this.configuration = { ...configuration, ...(generators !== undefined ? { generators: [...generators] } : {}) };
    }
    async solve(problem: ModelArtifact, options: SolveOptions = {}): Promise<JobView> {
        return super.solve(problem, options, "csp2d", { csp2dOptions: { ...this.configuration, ...(this.configuration.generators ? { generators: [...this.configuration.generators] } : {}) } });
    }
}

/** 单原生后端的线性门面 / Linear facade for one native backend. */
export class LinearSolver extends ExecutionSolver<NativeBackend> {
    constructor(backend: NativeBackend, client: ExecutionClient) { super(backend, client); }
    async solveLinear(model: ModelArtifact, options: SolveOptions = {}): Promise<JobView> { return this.solve(model, options, "linear"); }
    /** 显式原编译子模型 codec；不重注册或重标记 LP 松弛身份 / Explicit original compiled-child codec, without reregistering or relabeling LP relaxation identity. */
    async solveCompiledLinear(model: ModelArtifact, options: SolveOptions = {}): Promise<JobView> { return this.solve(model, options, "compiledLinear"); }
}

/** 实际编排在原生 Rust framework 执行，不接受可序列化 JS 回调 / Actual orchestration runs in native Rust framework, not serialized JS callbacks. */
export class SerialCombinatorialLinearSolver extends ExecutionSolver<"serial-linear"> {
    private readonly configuration: SerialLinearOptions;
    constructor(client: ExecutionClient, configuration: SerialLinearOptions) {
        super("serial-linear", client);
        if (typeof configuration !== "object" || configuration === null || !Array.isArray(configuration.backends) || configuration.backends.length < 1 || configuration.backends.length > 2
            || new Set(configuration.backends).size !== configuration.backends.length
            || configuration.backends.some(backend => backend !== "scip" && backend !== "gurobi")) throw new OspfError("InvalidInput", "serial backends must be a nonempty distinct list of scip and/or gurobi");
        if (configuration.fallbackPolicy !== undefined && configuration.fallbackPolicy !== "stopOnCertifiedTerminal" && configuration.fallbackPolicy !== "continueOnTerminal") throw new OspfError("InvalidInput", "unsupported serial fallback policy");
        const fields: ReadonlyArray<keyof SerialLinearOptions> = ["backends", "fallbackPolicy"];
        if (Object.keys(configuration).some(key => !fields.some(field => field === key))) throw new OspfError("InvalidInput", "unsupported serial strategy configuration field");
        this.configuration = { backends: [...configuration.backends], ...(configuration.fallbackPolicy !== undefined ? { fallbackPolicy: configuration.fallbackPolicy } : {}) };
    }
    async solveLinear(model: ModelArtifact, options: SolveOptions = {}): Promise<JobView> {
        return this.solve(model, options, "linear", { serialOptions: { ...this.configuration, backends: [...this.configuration.backends] } });
    }
}

/** 原生 Rust 并行组合，First 合作取消其余 worker 后仍等待回收 / Native Rust parallel composition; First cooperatively cancels other workers and still joins them. */
export class ParallelCombinatorialLinearSolver extends ExecutionSolver<"parallel-linear"> {
    private readonly configuration: ParallelLinearOptions;
    constructor(client: ExecutionClient, configuration: ParallelLinearOptions) {
        super("parallel-linear", client);
        if (typeof configuration !== "object" || configuration === null || !Array.isArray(configuration.backends) || configuration.backends.length < 1 || configuration.backends.length > 2
            || new Set(configuration.backends).size !== configuration.backends.length
            || configuration.backends.some(backend => backend !== "scip" && backend !== "gurobi")) throw new OspfError("InvalidInput", "parallel backends must be a nonempty distinct list of scip and/or gurobi");
        if (configuration.mode !== undefined && configuration.mode !== "first" && configuration.mode !== "best") throw new OspfError("InvalidInput", "unsupported parallel composition mode");
        const fields: ReadonlyArray<keyof ParallelLinearOptions> = ["backends", "mode"];
        if (Object.keys(configuration).some(key => !fields.some(field => field === key))) throw new OspfError("InvalidInput", "unsupported parallel strategy configuration field");
        this.configuration = { backends: [...configuration.backends], ...(configuration.mode !== undefined ? { mode: configuration.mode } : {}) };
    }
    async solveLinear(model: ModelArtifact, options: SolveOptions = {}): Promise<JobView> {
        return this.solve(model, options, "linear", { parallelOptions: { ...this.configuration, backends: [...this.configuration.backends] } });
    }
}

/** 独立的 Rust 聚合报告；原始轨迹文本不经 JS JSON 解析 / Independent Rust aggregate report; original trace text bypasses JS JSON parsing. */
export class CombinatorialReport {
    private constructor(private value: ReportBinding | undefined) {}
    private raw(): ReportBinding {
        if (!this.value) throw new OspfError("Disposed", "combinatorial report has been disposed");
        return this.value;
    }
    static fromJson(json: string, model: ModelArtifact): CombinatorialReport {
        return invoke(() => new CombinatorialReport(wasm().CombinatorialReport.fromJson(json, JSON.stringify(model))));
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    reportJson(): string { return invoke(() => this.raw().reportJson()); }
    summary(): ReportSummary { return invoke(() => JSON.parse(wasm().summarizeReport(this.raw().reportJson())) as ReportSummary); }
    attemptIds(): string[] { return invoke(() => this.raw().attemptIds()); }
    attemptJson(id: string): string { return invoke(() => this.raw().attemptJson(id)); }
    selectedAttemptId(): string | undefined { return invoke(() => this.raw().selectedAttemptId()); }
    selectionReason(): string | undefined { return invoke(() => this.raw().selectionReason()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 直接调用原生 Rust 固定连续追索 Benders；不隐式回退 MILP / Invoke native Rust fixed-continuous-recourse Benders without implicit MILP fallback. */
export class FixedRecourseAlgorithm extends ExecutionSolver<"fixed-recourse"> {
    private readonly configuration: FixedRecourseOptions;
    constructor(client: ExecutionClient, configuration: FixedRecourseOptions) {
        super("fixed-recourse", client);
        if (typeof configuration !== "object" || configuration === null || (configuration.backend !== "scip" && configuration.backend !== "gurobi")) throw new OspfError("InvalidInput", "an explicit native fixed-recourse backend is required");
        const fields: ReadonlyArray<keyof FixedRecourseOptions> = ["backend", "stages", "iterationLimit", "tolerance", "recoverMissingCertificates"];
        if (Object.keys(configuration).some(key => !fields.some(field => field === key))) throw new OspfError("InvalidInput", "unsupported fixed-recourse strategy configuration field");
        if (configuration.iterationLimit !== undefined && (!Number.isInteger(configuration.iterationLimit) || configuration.iterationLimit < 1 || configuration.iterationLimit > 10_000)) throw new OspfError("InvalidInput", "fixed-recourse iteration limit must be in [1, 10000]");
        if (configuration.tolerance !== undefined && (!Number.isFinite(configuration.tolerance) || configuration.tolerance <= 0 || configuration.tolerance >= 0.5)) throw new OspfError("InvalidInput", "invalid fixed-recourse tolerance");
        if (configuration.recoverMissingCertificates !== undefined && typeof configuration.recoverMissingCertificates !== "boolean") throw new OspfError("InvalidInput", "recoverMissingCertificates must be boolean");
        if (configuration.stages !== undefined) {
            if (!Array.isArray(configuration.stages)) throw new OspfError("InvalidInput", "stages must be an array");
            if (configuration.stages.length > 100_000) throw new OspfError("PayloadTooLarge", "too many staged variables");
            const seen = new Set<number>();
            for (const entry of configuration.stages) {
                if (typeof entry !== "object" || entry === null || !Number.isInteger(entry.variableIndex) || entry.variableIndex < 0 || entry.variableIndex > 0xffff_ffff
                    || (entry.stage !== "master" && entry.stage !== "continuousRecourse") || Object.keys(entry).some(key => key !== "variableIndex" && key !== "stage") || seen.has(entry.variableIndex)) throw new OspfError("InvalidInput", "invalid or duplicate staged source variable");
                seen.add(entry.variableIndex);
            }
        }
        this.configuration = { ...configuration, ...(configuration.stages !== undefined ? { stages: configuration.stages.map(entry => ({ ...entry })) } : {}) };
    }
    async solveLinear(model: ModelArtifact, options: SolveOptions = {}): Promise<JobView> {
        return this.solve(model, options, "linear", { fixedRecourseOptions: { ...this.configuration, ...(this.configuration.stages !== undefined ? { stages: this.configuration.stages.map(entry => ({ ...entry })) } : {}) } });
    }
}

/** 源模型校验后的固定追索报告，不把子问题证明重新标记为源证明 / Source-validated fixed-recourse report, without relabeling child proofs as source proofs. */
export class FixedRecourseReport {
    private constructor(private value: FixedRecourseBinding | undefined) {}
    private raw(): FixedRecourseBinding {
        if (!this.value) throw new OspfError("Disposed", "fixed-recourse report has been disposed");
        return this.value;
    }
    static fromJson(json: string, model: ModelArtifact): FixedRecourseReport {
        return invoke(() => new FixedRecourseReport(wasm().FixedRecourseReport.fromJson(json, JSON.stringify(model))));
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    summary(): FixedRecourseSummary { return invoke(() => JSON.parse(this.raw().summaryJson()) as FixedRecourseSummary); }
    masterReportJson(): string | undefined { return invoke(() => this.raw().masterReportJson()); }
    subproblemReportJson(): string | undefined { return invoke(() => this.raw().subproblemReportJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}

/** 复用同一生命周期的二次原生门面 / Quadratic native facade reusing the same job lifecycle. */
export class QuadraticSolver extends LinearSolver {
    async solveQuadratic(model: ModelArtifact, options: SolveOptions = {}): Promise<JobView> {
        return this.solve(model, options, "quadratic");
    }
}

/** 精确有限 MIP 降维的 CP 门面，不是浏览器或 native CP 引擎 / CP facade using exact finite MIP lowering, not a browser or native CP engine. */
export class ConstraintProgrammingSolver extends QuadraticSolver {
    async solveConstraintProgramming(model: ModelArtifact, options: ConstraintProgrammingSolveOptions = {}): Promise<JobView> {
        for (const value of [options.nodeLimit, options.solutionLimit]) {
            if (value !== undefined && (!Number.isInteger(value) || value < 0 || value > 0xffff_ffff)) throw new OspfError("InvalidInput", "CP limits must be unsigned 32-bit integers");
        }
        if (options.requestConflict !== undefined && typeof options.requestConflict !== "boolean") throw new OspfError("InvalidInput", "requestConflict must be boolean");
        let solutionHint: ConstraintProgrammingOptions["solutionHint"];
        if (options.solutionHint !== undefined) {
            if (typeof options.solutionHint !== "object" || options.solutionHint === null || typeof options.solutionHint[Symbol.iterator] !== "function") throw new OspfError("InvalidInput", "solutionHint must be a readonly map of stable IDs to bigint values");
            solutionHint = [];
            for (const [variableId, value] of options.solutionHint) {
                if (solutionHint.length >= 100_000) throw new OspfError("PayloadTooLarge", "CP solution hint exceeds 100000 entries");
                if (typeof variableId !== "string" || !variableId || typeof value !== "bigint" || value < -(1n << 63n) || value > (1n << 63n) - 1n) {
                    throw new OspfError("InvalidInput", "CP solution hints require stable-ID strings and signed i64 bigint values");
                }
                solutionHint.push({ variableId, value: value.toString() });
            }
        }
        const configured = [options.nodeLimit, options.solutionLimit, options.requestConflict, solutionHint].some(value => value !== undefined);
        const cpOptions: ConstraintProgrammingOptions | undefined = configured ? {
            ...(options.nodeLimit !== undefined ? { nodeLimit: options.nodeLimit } : {}),
            ...(options.solutionLimit !== undefined ? { solutionLimit: options.solutionLimit } : {}),
            ...(options.requestConflict !== undefined ? { requestConflict: options.requestConflict } : {}),
            ...(solutionHint !== undefined ? { solutionHint } : {}),
        } : undefined;
        return this.solve(model, options, "cp", cpOptions ? { cpOptions } : {});
    }
}

/** SCIP 原生门面 / SCIP native facade. */
export class SCIPSolver extends ConstraintProgrammingSolver {
    constructor(client: ExecutionClient) { super("scip", client); }
}

/** Gurobi 原生门面 / Gurobi native facade. */
export class GurobiSolver extends ConstraintProgrammingSolver {
    constructor(client: ExecutionClient) { super("gurobi", client); }
}

/** Rust 同源列生成策略；最后只求受限整数主问题 / Rust source-projected column generation; final solve is only a restricted integer master. */
export class ColumnGenerationAlgorithm extends ExecutionSolver<"column-generation"> {
    private readonly configuration: ColumnGenerationOptions;
    constructor(client: ExecutionClient, configuration: ColumnGenerationOptions) {
        super("column-generation", client);
        if (typeof configuration !== "object" || configuration === null || (configuration.backend !== "scip" && configuration.backend !== "gurobi")
            || Object.keys(configuration).some(key => !["backend", "blocks", "iterationLimit", "columnLimit", "tolerance"].includes(key))
            || !Array.isArray(configuration.blocks) || configuration.blocks.length < 1 || configuration.blocks.length > 256
            || (configuration.iterationLimit !== undefined && (!Number.isInteger(configuration.iterationLimit) || configuration.iterationLimit < 1 || configuration.iterationLimit > 10000))
            || (configuration.columnLimit !== undefined && (!Number.isInteger(configuration.columnLimit) || configuration.columnLimit < 1 || configuration.columnLimit > 10000))
            || (configuration.tolerance !== undefined && (!Number.isFinite(configuration.tolerance) || configuration.tolerance <= 0 || configuration.tolerance >= 0.5))) throw new OspfError("InvalidInput", "invalid column-generation configuration");
        const names = new Set<string>(), indices = new Set<number>();
        for (const block of configuration.blocks) {
            if (typeof block !== "object" || block === null || typeof block.id !== "string" || !block.id.trim() || new TextEncoder().encode(block.id).length > 256 || names.has(block.id)
                || Object.keys(block).some(key => key !== "id" && key !== "variableIndices") || !Array.isArray(block.variableIndices) || block.variableIndices.length < 1) throw new OspfError("InvalidInput", "invalid column-generation block");
            names.add(block.id);
            for (const index of block.variableIndices) {
                if (!Number.isInteger(index) || index < 0 || index > 0xffff_ffff || indices.has(index)) throw new OspfError("InvalidInput", "invalid or duplicate source variable index");
                indices.add(index);
                if (indices.size > 100000) throw new OspfError("PayloadTooLarge", "too many column-generation source variables");
            }
        }
        this.configuration = { ...configuration, blocks: configuration.blocks.map(block => ({ ...block, variableIndices: [...block.variableIndices] })) };
    }
    async solveLinear(model: ModelArtifact, options: SolveOptions = {}): Promise<JobView> {
        return this.solve(model, options, "linear", { columnGenerationOptions: { ...this.configuration, blocks: this.configuration.blocks.map(block => ({ ...block, variableIndices: [...block.variableIndices] })) } });
    }
}

/** 原域完整赋值已复验；子报告保持文本，不提升受限主问题证明 / Source assignments are verified; child reports remain text without promoting restricted-master proofs. */
export class ColumnGenerationReport {
    private constructor(private value: ColumnGenerationBinding | undefined) {}
    private raw(): ColumnGenerationBinding {
        if (!this.value) throw new OspfError("Disposed", "column-generation report has been disposed");
        return this.value;
    }
    static fromJson(json: string, model: ModelArtifact): ColumnGenerationReport {
        return invoke(() => new ColumnGenerationReport(wasm().ColumnGenerationReport.fromJson(json, JSON.stringify(model))));
    }
    toJson(): string { return invoke(() => this.raw().toJson()); }
    summary(): ColumnGenerationSummary { return invoke(() => JSON.parse(this.raw().summaryJson()) as ColumnGenerationSummary); }
    masterReportJson(): string | undefined { return invoke(() => this.raw().masterReportJson()); }
    pricingReportJson(): string | undefined { return invoke(() => this.raw().pricingReportJson()); }
    finalReportJson(): string | undefined { return invoke(() => this.raw().finalReportJson()); }
    dispose(): void { this.value?.free(); this.value = undefined; }
}
