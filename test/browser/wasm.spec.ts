import { test, expect } from "@playwright/test";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import type { Csp1dExecutionSummary, ProductionReportSummary } from "../../src/csp1d.js";
import type { ExecutionSummary as Bpp2dExecutionSummary } from "../../src/bpp2d.js";
import type { Csp2dExecutionSummary } from "../../src/csp2d.js";

type LoadingReadResult = { sameText: boolean; sameModel: boolean; sourceFingerprint: string; resultJson: string | null; independentResultJson: string | null; sourceFinishingPresent: boolean; sourceFinishingInvoked: boolean; accelerationApplicationReportJson: string; certificationReportJson: string | null };
type LoadingWindow = { checkLoading(fixture: unknown): Promise<{ main: LoadingReadResult; fromWorker: LoadingReadResult }> };

test("browser and module worker validate BPP3D physical sources and share canonical fingerprints", async ({ page }) => {
    await page.goto("/test/browser/index.html");
    await page.waitForFunction(() => typeof (window as unknown as { checkPacking3d?: unknown }).checkPacking3d === "function");
    const result = await page.evaluate(() => (window as unknown as { checkPacking3d(): Promise<{ main: { sameText: boolean; fingerprint: string; amount: string; disposed: string; forged: string }; fromWorker: unknown }> }).checkPacking3d());
    expect(result.main).toEqual(result.fromWorker);
    expect(result.main).toMatchObject({ sameText: true, amount: "2", packedBin: "bin", packedCount: 2, invalidPlan: "InvalidInput", disposed: "Disposed", forged: "FingerprintMismatch", invalidReport: "InvalidInput",
        cylinderShape: { kind: "cylinder", axis: "y", radius: { value: 0.5, unit: "m" } }, cylinderFingerprintDiffers: true, cylinderRadius: "InvalidInput", cylinderShapeUnknown: "InvalidInput" });
    expect(result.main.fingerprint.length).toBeGreaterThan(0);
});

test("browser and module worker consume actual HTTP BPP3D one-round execution reports", async ({ page }) => {
    test.skip(!process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN, "requires an explicitly configured native host");
    await page.goto("/test/browser/index.html");
    await page.waitForFunction(() => typeof (window as unknown as { solvePacking3dHttp?: unknown }).solvePacking3dHttp === "function");
    const results = await page.evaluate(async connection => {
        type Fixture = { progress: number };
        type Read = { summary: { completed: boolean; hasPacking: boolean; candidateComplete: boolean }; stages: { hasIncumbent: boolean }[];
            packingJson: string | null; independentPackingJson: string | null; fromWorker?: Read };
        const api = window as unknown as { solvePacking3dHttp: (connection: { url: string; token: string }) => Promise<Fixture[]>;
            checkPacking3d: (fixture: Fixture) => Promise<{ main: Read; fromWorker: Read }> };
        const results = [];
        for (const fixture of await api.solvePacking3dHttp(connection)) results.push({ progress: fixture.progress, ...await api.checkPacking3d(fixture) });
        return results;
    }, { url: process.env.OSPF_E2E_URL!, token: process.env.OSPF_TOKEN! });
    expect(results).toHaveLength(3);
    for (const result of results) {
        expect(result.progress).toBeGreaterThan(0); expect(result.fromWorker).toEqual(result.main);
        expect(result.main.summary.candidateComplete).toBe(false);
        expect(result.main.independentPackingJson).toBe(result.main.packingJson);
    }
    expect(results[0].main.summary.completed).toBe(true);
    expect(JSON.parse(results[0].main.packingJson!).bins).toHaveLength(2);
    expect(results[1].main.summary.completed).toBe(false); expect(results[1].main.packingJson).toBeNull();
    expect(results[2].main.summary.completed).toBe(false); expect(results[2].main.stages[2].hasIncumbent).toBe(true);
    expect(results[2].main.packingJson).toBeNull();
});

test("browser and module worker validate Gantt activity sources and explicit plans without native dependencies", async ({ page }) => {
    await page.goto("/test/browser/index.html");
    await page.waitForFunction(() => typeof (window as unknown as { checkGanttActivity?: unknown }).checkGanttActivity === "function");
    const result = await page.evaluate(() => (window as unknown as { checkGanttActivity: (fixture?: unknown) => Promise<{ main: unknown; fromWorker: unknown }> }).checkGanttActivity());
    const expected = { sameText: true, choices: 2, activities: 1, modes: 1, horizonStart: "2026-01-01T00:00:00Z", cost: { value: 2, unit: "kg" },
        placements: 1, reservation: "machine", undeclared: "InvalidInput", invalidReport: "InvalidInput", disposed: "Disposed" };
    expect(result.main).toMatchObject(expected);
    expect(result.fromWorker).toMatchObject(expected);
});

test("browser and module worker revalidate real Gantt activity execution reports", async ({ page }) => {
    test.skip(!process.env.OSPF_GANTT_ACTIVITY_FIXTURE_DIR, "requires explicit real Rust-backend report evidence");
    const directory = process.env.OSPF_GANTT_ACTIVITY_FIXTURE_DIR!;
    const files = (await readdir(directory)).filter(name => /^gantt-activity-execution-(scip|gurobi)\.json$/.test(name));
    expect(files.length).toBeGreaterThan(0);
    await page.goto("/test/browser/index.html");
    await page.waitForFunction(() => typeof (window as unknown as { checkGanttActivity?: unknown }).checkGanttActivity === "function");
    for (const file of files) {
        for (const fixture of JSON.parse(await readFile(join(directory, file), "utf8"))) {
            const result = await page.evaluate(fixture => (window as unknown as { checkGanttActivity: (fixture: unknown) => Promise<{
                main: { summary: { hasSchedule: boolean; solverModelOnly: boolean; objectiveValue: number | null }; sameText: boolean; sourceFingerprint: string;
                    placementCount: number; candidateCount: number; cost: { value: number; unit: string }; replayCost: { value: number; unit: string };
                    replayPlacements: number; replayCandidates: number; cancelledCount: number }; fromWorker: unknown }> }).checkGanttActivity(fixture), fixture);
            expect(result.fromWorker).toEqual(result.main);
            expect(result.main.summary.hasSchedule).toBe(true);
            expect(result.main.summary.solverModelOnly).toBe(false);
            expect(result.main.summary.objectiveValue).toBe(result.main.cost.value);
            expect(result.main.sameText).toBe(true);
            expect(result.main.sourceFingerprint).toBe(fixture.source.fingerprint);
            expect(result.main.placementCount).toBeGreaterThan(0);
            expect(result.main.replayPlacements).toBe(result.main.placementCount);
            expect(result.main.replayCost).toEqual(result.main.cost);
            expect(result.main.replayCandidates).toBe(result.main.candidateCount);
            expect(result.main.cancelledCount).toBe(0);
        }
    }
});

test("browser and module worker revalidate real BPP3D one-round reports and strict packing", async ({ page }) => {
    test.skip(!process.env.OSPF_BPP3D_FIXTURE_DIR, "requires explicit real Rust-backend report evidence");
    const directory = process.env.OSPF_BPP3D_FIXTURE_DIR!;
    const files = (await readdir(directory)).filter(name => /^bpp3d-execution-(scip|gurobi)\.json$/.test(name));
    expect(files.length).toBeGreaterThan(0);
    await page.goto("/test/browser/index.html");
    await page.waitForFunction(() => typeof (window as unknown as { checkPacking3d?: unknown }).checkPacking3d === "function");
    for (const file of files) {
        for (const fixture of JSON.parse(await readFile(join(directory, file), "utf8"))) {
            const result = await page.evaluate(fixture => {
                type Read = { summary: { completed: boolean; hasPacking: boolean; stageCount: number; candidateComplete: boolean }; stages: unknown[];
                    sameText: boolean; sourceFingerprint: string; pools: string[]; children: (string | null)[]; pastEnd: boolean; packingJson: string | null; independentPackingJson: string | null;
                    radius: Record<string, string>; radiusKeys: boolean };
                return (window as unknown as { checkPacking3d: (fixture: unknown) => Promise<{ main: Read; fromWorker: Read }> }).checkPacking3d(fixture);
            }, fixture);
            expect(result.fromWorker).toEqual(result.main);
            expect(result.main.sameText).toBe(true); expect(result.main.pastEnd).toBe(true);
            expect(result.main.summary.candidateComplete).toBe(false);
            expect(result.main.summary.stageCount).toBe(result.main.stages.length);
            if (result.main.summary.completed) expect(result.main.summary.generatedCount).toBeGreaterThan(0);
            expect(result.main.sourceFingerprint).toBe(fixture.source.fingerprint);
            expect(result.main.packingJson).toBe(fixture.packingJson);
            expect(result.main.independentPackingJson).toBe(result.main.packingJson);
            expect(result.main.pools[0]).toContain(fixture.source.fingerprint);
            expect(result.main.radiusKeys).toBe(true);
            // 无半径组件的源不应凭空出现半径条目。 / Sources without a radius component must not report radius entries.
            if (!fixture.source.modelJson.includes("radiusComponent")) expect(result.main.radius).toEqual({});
            for (const pool of result.main.pools) expect(typeof pool).toBe("string");
            if (result.main.packingJson) expect(JSON.parse(result.main.packingJson).sourceFingerprint).toBe(fixture.source.fingerprint);
        }
    }
});

test("browser and module worker interrupt the poll delay for cancellation", async ({ page }) => {
    await page.goto("/test/browser/index.html");
    await page.waitForFunction(() => typeof (window as unknown as { checkCancellation?: unknown }).checkCancellation === "function");
    const result = await page.evaluate(() => (window as unknown as { checkCancellation(): Promise<unknown> }).checkCancellation());
    const expected = { calls: ["cancel"], progress: ["started", "terminal"], reportJson: "actual" };
    expect(result).toEqual({ main: expected, fromWorker: expected });
});

test("browser and module worker replay original partition children, budgets and complete-source finishing without clocks", async ({ page }) => {
    test.skip(!process.env.OSPF_BPP_LOADING_FIXTURE_DIR, "requires real original partition application evidence");
    const directory = process.env.OSPF_BPP_LOADING_FIXTURE_DIR!;
    const files = (await readdir(directory)).filter(name => /^bpp-partition-(application|finishing)-(scip|gurobi)\.json$/.test(name)); expect(files.length).toBeGreaterThan(0);
    expect(files.some(name => name.startsWith("bpp-partition-finishing-"))).toBe(true);
    await page.goto("/test/browser/index.html"); await page.waitForFunction(() => typeof (window as unknown as LoadingWindow).checkLoading === "function");
    for (const file of files) for (const fixture of JSON.parse(await readFile(join(directory, file), "utf8"))) {
        const envelope = JSON.parse(fixture.partitionReportJson);
        for (const call of envelope.calls) if (call.reportJson) call.reportJson = call.reportJson.replace(/"nodes":(?:null|\d+)/g, '"nodes":18446744073709551615');
        if (envelope.certification?.reportJson) {
            envelope.certification.reportJson = envelope.certification.reportJson.replace(/"nodes":(?:null|\d+)/g, '"nodes":18446744073709551615');
            const selected = JSON.parse(envelope.applicationReportJson);
            selected.reportJson = selected.reportJson.replace(/"nodes":(?:null|\d+)/g, '"nodes":18446744073709551615'); envelope.applicationReportJson = JSON.stringify(selected);
        }
        fixture.partitionReportJson = JSON.stringify(envelope);
        const result = await page.evaluate(fixture => {
            type Read = { sameText: boolean; calls: unknown[]; resultJson: string | null; independentResultJson: string | null; sourceFingerprint: string; solverReportJson: string;
                executionSummary: { refinementCallIndex: number | null; finalCallIndex: number | null }; refinementReportJson: string | null; finalReportJson: string | null; accelerationError: unknown;
                applicationReportJson: string; accelerationApplicationReportJson: string; certificationReportJson: string | null; certificationError: unknown; sourceFinishingPresent: boolean; sourceFinishingInvoked: boolean };
            return (window as unknown as { checkLoading(fixture: unknown): Promise<{ main: Read; fromWorker: Read }> }).checkLoading(fixture);
        }, fixture);
        expect(result.main).toEqual(result.fromWorker); expect(result.main.sameText).toBe(true); expect(result.main.calls).toEqual(envelope.calls);
        expect(result.main.resultJson).toBe(fixture.resultJson); expect(result.main.independentResultJson).toBe(fixture.resultJson);
        expect(result.main.sourceFingerprint).toBe(fixture.source.fingerprint);
        expect(result.main.applicationReportJson).toBe(envelope.applicationReportJson);
        expect(result.main.accelerationApplicationReportJson).toBe(envelope.certification?.previousApplicationReportJson ?? envelope.applicationReportJson);
        expect(JSON.parse(JSON.parse(result.main.accelerationApplicationReportJson).reportJson).proof).toBeNull();
        expect(result.main.certificationReportJson).toBe(envelope.certification?.reportJson ?? null);
        expect(result.main.certificationError).toEqual(envelope.certification?.error ?? null);
        expect(result.main.sourceFinishingPresent).toBe(envelope.certification !== undefined);
        expect(result.main.sourceFinishingInvoked).toBe(Boolean(envelope.certification?.reportJson || envelope.certification?.error));
        const execution = result.main.executionSummary;
        expect(result.main.refinementReportJson).toBe(execution.refinementCallIndex === null ? null : envelope.calls[execution.refinementCallIndex].reportJson);
        expect(result.main.finalReportJson).toBe(execution.finalCallIndex === null ? null : envelope.calls[execution.finalCallIndex].reportJson);
        expect(result.main.accelerationError).toEqual(envelope.calls.at(-1)?.error ?? null);
    }
});

test("browser and module worker preserve actual partition LP identities, pricing epochs and independent resource-completed plans", async ({ page }) => {
    test.skip(!process.env.OSPF_BPP_LOADING_FIXTURE_DIR, "requires real Rust partition evidence");
    const directory = process.env.OSPF_BPP_LOADING_FIXTURE_DIR!;
    const files = (await readdir(directory)).filter(name => /^bpp-partition-(scip|gurobi)\.json$/.test(name)); expect(files.length).toBeGreaterThan(0);
    await page.goto("/test/browser/index.html"); await page.waitForFunction(() => typeof (window as unknown as LoadingWindow).checkLoading === "function");
    for (const file of files) {
        const fixture = JSON.parse(await readFile(join(directory, file), "utf8"));
        const result = await page.evaluate(fixture => {
            type Read = { sameText: boolean; sameModel: boolean; resultJson: string; independentResultJson: string; disposedCode: string };
            return (window as unknown as { checkLoading(fixture: unknown): Promise<{ main: Read; fromWorker: Read }> }).checkLoading(fixture);
        }, fixture);
        expect(result.main).toEqual(result.fromWorker);
        expect(result.main).toEqual({ sameText: true, sameModel: true, resultJson: fixture.resultJson, independentResultJson: fixture.resultJson, disposedCode: "Disposed" });
    }
});

test("browser explicitly executes native shared BPP Benders over HTTP and revalidates it in a Worker", async ({ page }) => {
    test.skip(!process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN, "requires an explicitly configured native HTTP host");
    await page.goto("/test/browser/index.html"); await page.waitForFunction(() => typeof (window as unknown as { solveLoadingBendersHttp?: unknown }).solveLoadingBendersHttp === "function");
    const fixture = await page.evaluate(config => (window as unknown as { solveLoadingBendersHttp(config: { url: string; token: string }): Promise<unknown> }).solveLoadingBendersHttp(config),
        { url: process.env.OSPF_E2E_URL!, token: process.env.OSPF_TOKEN! });
    const output = await page.evaluate(fixture => (window as unknown as LoadingWindow).checkLoading(fixture), fixture);
    for (const result of [output.main, output.fromWorker]) { expect(result.sameText).toBe(true); expect(result.sameModel).toBe(true); expect(result.resultJson).not.toBeNull(); }
});

test("browser and module worker read actual shared BPP Benders cuts and fresh fallback without proof promotion", async ({ page }) => {
    test.skip(!process.env.OSPF_BPP_LOADING_FIXTURE_DIR, "requires real Rust Benders evidence");
    const files = (await readdir(process.env.OSPF_BPP_LOADING_FIXTURE_DIR!)).filter(name => /^bpp-(benders|finishing)-(scip|gurobi)\.json$/.test(name)); expect(files.length).toBeGreaterThan(0);
    await page.goto("/test/browser/index.html"); await page.waitForFunction(() => typeof (window as unknown as { checkLoading?: unknown }).checkLoading === "function");
    for (const file of files) for (const fixture of JSON.parse(await readFile(join(process.env.OSPF_BPP_LOADING_FIXTURE_DIR!, file), "utf8"))) {
        const output = await page.evaluate(fixture => (window as unknown as LoadingWindow).checkLoading(fixture), fixture);
        for (const result of [output.main, output.fromWorker]) {
            expect(result.sameText).toBe(true); expect(result.sameModel).toBe(true); expect(result.sourceFingerprint).toBe(fixture.source.fingerprint);
            expect(result.resultJson).toBe(fixture.resultJson); expect(result.independentResultJson).toBe(fixture.resultJson);
            const envelope = JSON.parse(fixture.bendersReportJson), evidence = envelope.certification;
            expect(result.sourceFinishingPresent).toBe(evidence !== undefined);
            expect(result.sourceFinishingInvoked).toBe(Boolean(evidence && (evidence.reportJson || evidence.error)));
            expect(result.accelerationApplicationReportJson).toBe(evidence?.previousApplicationReportJson ?? envelope.applicationReportJson);
            expect(result.certificationReportJson).toBe(evidence?.reportJson ?? null);
        }
    }
});

test("browser and module worker read real original BPP application objectives and source-bound reports", async ({ page }) => {
    test.skip(!process.env.OSPF_BPP_LOADING_FIXTURE_DIR, "requires real Rust application evidence");
    const directory = process.env.OSPF_BPP_LOADING_FIXTURE_DIR!;
    const files = (await readdir(directory)).filter(name => /^bpp-application-(?:resources-)?(scip|gurobi)\.json$/.test(name)); expect(files.length).toBeGreaterThan(0);
    await page.goto("/test/browser/index.html"); await page.waitForFunction(() => typeof (window as any).checkLoading === "function");
    for (const file of files) for (const fixture of JSON.parse(await readFile(join(directory, file), "utf8"))) {
        const result = await page.evaluate(fixture => (window as any).checkLoading(fixture), fixture);
        for (const output of [result.main, result.fromWorker]) {
            expect(output.sameText).toBe(true); expect(output.sameModel).toBe(true); expect(output.sourceFingerprint).toBe(fixture.source.fingerprint);
            expect(output.resultJson).toBe(fixture.resultJson); expect(output.independentResultJson).toBe(fixture.resultJson);
        }
    }
});

test("browser and module worker invoke original BPP application through explicit HTTP", async ({ page }) => {
    test.skip(!process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN, "requires an explicit native host");
    await page.goto("/test/browser/index.html"); await page.waitForFunction(() => typeof (window as any).solveLoadingApplicationHttp === "function");
    const fixture = await page.evaluate(configuration => (window as any).solveLoadingApplicationHttp(configuration), { url: process.env.OSPF_E2E_URL!, token: process.env.OSPF_TOKEN! });
    const result = await page.evaluate(fixture => (window as any).checkLoading(fixture), fixture);
    for (const output of [result.main, result.fromWorker]) {
        expect(output.sameText).toBe(true); expect(output.sameModel).toBe(true); expect(output.summary.objectiveValue).toBe(-4);
        expect(JSON.parse(output.resultJson).loadedCount).toBe("1");
    }
});

test("browser and module worker register shared BPP sparse models with full u64 counts and independent plans", async ({ page }) => {
    await page.goto("/test/browser/index.html");
    await page.waitForFunction(() => typeof (window as unknown as { checkLoading?: unknown }).checkLoading === "function");
    const result = await page.evaluate(() => (window as unknown as { checkLoading: () => Promise<unknown> }).checkLoading());
    const expected = { stableModel: true, fullU64: true, values: [1, 1, 1], loadedCount: "1", loadedWeight: { value: 1, unit: "kg" },
        solution: { assignments: { a: "p" }, occupiedPositions: ["p", "q"], selectedLayouts: {} }, missingResourceCode: "InvalidInput",
        resources: { weights: { ballast: { value: 0.5, unit: "kg" } }, positionTotalWeights: { p: { value: 1.5, unit: "kg" }, q: { value: 0, unit: "kg" } }, totalWeight: { value: 1.5, unit: "kg" } } };
    expect(result).toEqual({ main: expected, fromWorker: expected });
});

test("browser and module worker revalidate real shared BPP model reports without native dependencies", async ({ page }) => {
    test.skip(!process.env.OSPF_BPP_LOADING_FIXTURE_DIR, "requires explicit real Rust-backend loading-model evidence");
    const directory = process.env.OSPF_BPP_LOADING_FIXTURE_DIR!;
    const files = (await readdir(directory)).filter(name => /^bpp-loading-(scip|gurobi)\.json$/.test(name)); expect(files.length).toBeGreaterThan(0);
    await page.goto("/test/browser/index.html");
    await page.waitForFunction(() => typeof (window as unknown as { checkLoading?: unknown }).checkLoading === "function");
    for (const file of files) for (const fixture of JSON.parse(await readFile(join(directory, file), "utf8"))) {
        fixture.reportJson = fixture.reportJson.replace(/"nodes":(?:null|\d+)/g, '"nodes":18446744073709551615');
        const result = await page.evaluate(fixture => {
            type Read = { sameText: boolean; sameModel: boolean; sourceFingerprint: string; resultJson: string | null; independentResultJson: string | null };
            return (window as unknown as { checkLoading: (fixture: unknown) => Promise<{ main: Read; fromWorker: Read }> }).checkLoading(fixture);
        }, fixture);
        expect(result.main).toEqual(result.fromWorker); expect(result.main.sameText).toBe(true); expect(result.main.sameModel).toBe(true);
        expect(result.main.sourceFingerprint).toBe(fixture.source.fingerprint); expect(result.main.resultJson).toBe(fixture.resultJson);
        expect(result.main.independentResultJson).toBe(fixture.resultJson);
    }
});

test("browser and module worker validate shared BPP models solved over explicit native HTTP", async ({ page }) => {
    test.skip(!process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN, "requires an explicitly configured native host");
    await page.goto("/test/browser/index.html");
    await page.waitForFunction(() => typeof (window as unknown as { solveLoadingHttp?: unknown }).solveLoadingHttp === "function");
    const results = await page.evaluate(async connection => {
        type Fixture = { progress: number };
        type Read = { sameText: boolean; resultJson: string | null; independentResultJson: string | null };
        const api = window as unknown as { solveLoadingHttp: (connection: { url: string; token: string }) => Promise<Fixture[]>;
            checkLoading: (fixture: Fixture) => Promise<{ main: Read; fromWorker: Read }> };
        const results = [];
        for (const fixture of await api.solveLoadingHttp(connection)) results.push({ progress: fixture.progress, ...await api.checkLoading(fixture) });
        return results;
    }, { url: process.env.OSPF_E2E_URL!, token: process.env.OSPF_TOKEN! });
    expect(results).toHaveLength(2);
    for (const result of results) { expect(result.main).toEqual(result.fromWorker); expect(result.main.sameText).toBe(true); expect(result.progress).toBeGreaterThan(0); }
    expect(JSON.parse(results[0].main.resultJson!).loadedCount).toBe("1"); expect(results[1].main.resultJson).toBeNull();
});

test("browser and module worker revalidate complete real CSP2D workflows and independent production without native dependencies", async ({ page }) => {
    test.skip(!process.env.OSPF_CSP2D_FIXTURE_DIR, "requires explicit real Rust-backend CSP2D report evidence");
    const directory = process.env.OSPF_CSP2D_FIXTURE_DIR!;
    const files = (await readdir(directory)).filter(name => /^csp2d-execution-(scip|gurobi)\.json$/.test(name)); expect(files.length).toBeGreaterThan(0);
    await page.goto("/test/browser/index.html");
    await page.waitForFunction(() => typeof (window as unknown as { checkCutting2dReport?: unknown }).checkCutting2dReport === "function");
    for (const file of files) {
        for (const fixture of JSON.parse(await readFile(join(directory, file), "utf8"))) {
            const wire = JSON.parse(fixture.reportJson);
            for (const stage of wire.stages) stage.solverReportJson = stage.solverReportJson.replace(/"nodes":(?:null|\d+)/g, '"nodes":18446744073709551615');
            const result = await page.evaluate(async fixture => {
                type Read = { summary: Csp2dExecutionSummary; sameText: boolean; pastEnd: boolean; raw: string[];
                    productionJson: string | null; independentProductionJson: string | null; columns: unknown[]; iterations: unknown[] };
                return (window as unknown as { checkCutting2dReport: (fixture: unknown) => Promise<{ main: Read; fromWorker: Read }> }).checkCutting2dReport(fixture);
            }, { ...fixture, reportJson: JSON.stringify(wire) });
            expect(result.main).toEqual(result.fromWorker); expect(result.main.sameText).toBe(true); expect(result.main.pastEnd).toBe(true);
            expect(result.main.summary.candidateComplete).toBe(false); expect(result.main.summary.stageCount).toBe(wire.stages.length);
            expect(result.main.columns).toHaveLength(wire.columns.length); expect(result.main.iterations).toEqual(wire.iterations);
            expect(result.main.productionJson).toBe(fixture.productionJson); expect(result.main.independentProductionJson).toBe(fixture.productionJson);
            for (let index = 0; index < wire.stages.length; index++) { expect(result.main.raw[index]).toBe(wire.stages[index].solverReportJson); expect(result.main.raw[index]).toContain('"nodes":18446744073709551615'); }
        }
    }
});

test("browser and module worker validate CSP2D source catalogs and flat cut trees without native dependencies", async ({ page }) => {
    await page.goto("/test/browser/index.html");
    await page.waitForFunction(() => typeof (window as unknown as { checkCutting2d?: unknown }).checkCutting2d === "function");
    const result = await page.evaluate(() => (window as unknown as { checkCutting2d: () => Promise<unknown> }).checkCutting2d());
    const expected = { roundtrip: true, exact: true, invalidLeaf: "InvalidInput" };
    expect(result).toEqual({ main: expected, fromWorker: expected });
});

test("browser and module worker consume actual HTTP CSP2D Phase I/pricing/final and budget reports", async ({ page }) => {
    test.skip(!process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN, "requires an explicitly configured native host");
    await page.goto("/test/browser/index.html");
    await page.waitForFunction(() => typeof (window as unknown as { solveCutting2dHttp?: unknown }).solveCutting2dHttp === "function");
    const results = await page.evaluate(async connection => {
        type Fixture = { progress: number };
        type Read = { summary: Csp2dExecutionSummary; productionJson: string | null; independentProductionJson: string | null };
        const api = window as unknown as { solveCutting2dHttp: (connection: { url: string; token: string }) => Promise<Fixture[]>;
            checkCutting2dReport: (fixture: Fixture) => Promise<{ main: Read; fromWorker: Read }> };
        const results = [];
        for (const fixture of await api.solveCutting2dHttp(connection)) results.push({ progress: fixture.progress, ...await api.checkCutting2dReport(fixture) });
        return results;
    }, { url: process.env.OSPF_E2E_URL!, token: process.env.OSPF_TOKEN! });
    expect(results).toHaveLength(3);
    for (const result of results) {
        expect(result.progress).toBeGreaterThan(0); expect(result.main).toEqual(result.fromWorker);
        expect(result.main.summary.candidateComplete).toBe(false); expect(result.main.independentProductionJson).toBe(result.main.productionJson);
    }
    expect(JSON.parse(results[0].main.productionJson!).producedCounts.a).toBe("4");
    expect(results[0].main.summary.integer?.restrictedOptimal).toBe(true);
    expect(results[1].main.summary.stop).toBe("reportLimit"); expect(results[1].main.productionJson).toBeNull();
    expect(results[2].main.summary.integer).toBeNull(); expect(results[2].main.productionJson).toBeNull();
});

test("browser and module worker consume actual HTTP BPP2D Phase I/pricing/final and budget reports", async ({ page }) => {
    test.skip(!process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN, "requires an explicitly configured native host");
    await page.goto("/test/browser/index.html");
    await page.waitForFunction(() => typeof (window as unknown as { solvePacking2dHttp?: unknown }).solvePacking2dHttp === "function");
    const results = await page.evaluate(async connection => {
        type Fixture = { progress: number };
        type Read = { summary: Bpp2dExecutionSummary; productionJson: string | null; independentProductionJson: string | null };
        const api = window as unknown as { solvePacking2dHttp: (connection: { url: string; token: string }) => Promise<Fixture[]>;
            checkPacking2d: (fixture: Fixture) => Promise<{ main: Read; fromWorker: Read }> };
        const results = [];
        for (const fixture of await api.solvePacking2dHttp(connection)) results.push({ progress: fixture.progress, ...await api.checkPacking2d(fixture) });
        return results;
    }, { url: process.env.OSPF_E2E_URL!, token: process.env.OSPF_TOKEN! });
    expect(results).toHaveLength(3);
    for (const result of results) {
        expect(result.progress).toBeGreaterThan(0); expect(result.main).toEqual(result.fromWorker);
        expect(result.main.summary.candidateComplete).toBe(false); expect(result.main.independentProductionJson).toBe(result.main.productionJson);
    }
    expect(JSON.parse(results[0].main.productionJson!).producedCounts.a).toBe("4");
    expect(results[0].main.summary.integer?.restrictedOptimal).toBe(true);
    expect(results[1].main.summary.stop).toBe("reportLimit"); expect(results[1].main.productionJson).toBeNull();
    expect(results[2].main.summary.integer).toBeNull(); expect(results[2].main.productionJson).toBeNull();
});

test("browser and module worker validate portable BPP2D sources without native dependencies", async ({ page }) => {
    await page.goto("/test/browser/index.html");
    await page.waitForFunction(() => typeof (window as unknown as { checkPacking2d?: unknown }).checkPacking2d === "function");
    const result = await page.evaluate(() => (window as unknown as { checkPacking2d: () => Promise<unknown> }).checkPacking2d());
    const expected = { roundtrip: true, packedItems: "1", remnant: { value: 1, unit: "m^2" }, loadingOrder: 0 };
    expect(result).toEqual({ main: expected, fromWorker: expected });
});

test("browser and module worker revalidate real BPP2D workflows and independently owned production", async ({ page }) => {
    test.skip(!process.env.OSPF_BPP2D_FIXTURE_DIR, "requires explicit real Rust-backend report evidence");
    const directory = process.env.OSPF_BPP2D_FIXTURE_DIR!;
    const files = (await readdir(directory)).filter(name => /^bpp2d-execution-(scip|gurobi)\.json$/.test(name));
    expect(files.length).toBeGreaterThan(0);
    await page.goto("/test/browser/index.html");
    await page.waitForFunction(() => typeof (window as unknown as { checkPacking2d?: unknown }).checkPacking2d === "function");
    for (const file of files) {
        for (const fixture of JSON.parse(await readFile(join(directory, file), "utf8"))) {
            const result = await page.evaluate(fixture => {
                type Read = { summary: Bpp2dExecutionSummary; sameText: boolean; pastEnd: boolean; productionJson: string | null; independentProductionJson: string | null; packingJson: string | null };
                return (window as unknown as { checkPacking2d: (fixture: unknown) => Promise<{ main: Read; fromWorker: Read }> }).checkPacking2d(fixture);
            }, fixture);
            expect(result.fromWorker).toEqual(result.main); expect(result.main.sameText).toBe(true); expect(result.main.pastEnd).toBe(true);
            expect(result.main.summary.candidateComplete).toBe(false); expect(result.main.productionJson).toBe(fixture.productionJson);
            expect(result.main.independentProductionJson).toBe(fixture.productionJson);
            expect(result.main.packingJson !== null).toBe(fixture.productionJson !== null);
            if (result.main.packingJson) {
                const packed = JSON.parse(result.main.packingJson);
                expect(packed.sourceFingerprint).toBe(fixture.source.fingerprint);
                expect(packed.materialCounts.a ?? "0").toBe(JSON.parse(fixture.productionJson).producedCounts.a);
            }
        }
    }
});

test("browser and module worker consume actual HTTP CSP1D MILP and pricing workflows", async ({ page }) => {
    test.skip(!process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN, "requires an explicitly configured native host");
    await page.goto("/test/browser/index.html");
    await page.waitForFunction(() => typeof (window as unknown as { solveCuttingHttp?: unknown }).solveCuttingHttp === "function");
    const results = await page.evaluate(async connection => {
        type Read = { summary: Csp1dExecutionSummary; productionJson: string; independentProductionJson: string };
        type Fixture = { execution: boolean; progress: number };
        const api = window as unknown as { solveCuttingHttp: (connection: { url: string; token: string }) => Promise<Fixture[]>;
            checkCuttingReport: (fixture: Fixture) => Promise<{ main: Read; fromWorker: Read }> };
        const results = [];
        for (const fixture of await api.solveCuttingHttp(connection)) {
            results.push({ progress: fixture.progress, ...await api.checkCuttingReport(fixture) });
        }
        return results;
    }, { url: process.env.OSPF_E2E_URL!, token: process.env.OSPF_TOKEN! });
    expect(results).toHaveLength(2);
    for (const result of results) {
        expect(result.progress).toBeGreaterThan(0); expect(result.fromWorker).toEqual(result.main);
        expect(result.main.summary.businessStatus).toBe("feasible"); expect(result.main.summary.candidateComplete).toBe(false);
        expect(result.main.summary.integer?.restrictedOptimal).toBe(true);
        expect(result.main.independentProductionJson).toBe(result.main.productionJson);
        expect(JSON.parse(result.main.productionJson).batchCount).toBe("2");
        expect(JSON.parse(result.main.productionJson).produced.p).toBe("6");
    }
    expect(results[1].main.summary.stageCount).toBeGreaterThan(2);
    expect(results[1].main.summary.columnCount).toBeGreaterThan(1);
});

test("browser and module worker revalidate complete real CSP1D workflows without native dependencies", async ({ page }) => {
    test.skip(!process.env.OSPF_CSP1D_FIXTURE_DIR, "requires explicit real Rust-backend report evidence");
    const directory = process.env.OSPF_CSP1D_FIXTURE_DIR!;
    const files = (await readdir(directory)).filter(name => /^csp1d-execution-(scip|gurobi)\.json$/.test(name));
    expect(files.length).toBeGreaterThan(0);
    await page.goto("/test/browser/index.html");
    await page.waitForFunction(() => typeof (window as unknown as { checkCuttingReport?: unknown }).checkCuttingReport === "function");
    for (const file of files) {
        for (const fixture of JSON.parse(await readFile(join(directory, file), "utf8"))) {
            const wire = JSON.parse(fixture.reportJson);
            wire.stages[0].solverReportJson = wire.stages[0].solverReportJson.replace(/"nodes":(?:null|\d+)/g, '"nodes":18446744073709551615');
            const reportJson = JSON.stringify(wire);
            const result = await page.evaluate(async fixture => {
                type Read = { summary: Csp1dExecutionSummary; sameText: boolean; trace: string; pastEnd: boolean;
                    stages: { model: string; raw: string }[]; productionJson: string | null; independentProductionJson: string | null };
                return (window as unknown as { checkCuttingReport: (fixture: unknown) => Promise<{ main: Read; fromWorker: Read }> }).checkCuttingReport(fixture);
            }, { ...fixture, reportJson, execution: true });
            expect(result.fromWorker).toEqual(result.main);
            expect(result.main.sameText).toBe(true); expect(result.main.pastEnd).toBe(true);
            expect(result.main.summary.candidateComplete).toBe(false); expect(result.main.trace).toBe(wire.traceJson);
            expect(result.main.productionJson).toBe(fixture.productionJson); expect(result.main.independentProductionJson).toBe(fixture.productionJson);
            expect(result.main.stages).toHaveLength(wire.stages.length);
            for (let index = 0; index < wire.stages.length; index++) {
                expect(result.main.stages[index].raw).toBe(wire.stages[index].solverReportJson);
                expect(JSON.parse(result.main.stages[index].model).model).toEqual(wire.stages[index].model);
            }
            expect(result.main.stages[0].raw).toContain('"nodes":18446744073709551615');
        }
    }
});

test("browser and module worker revalidate real CSP1D integer child reports against their source pools", async ({ page }) => {
    test.skip(!process.env.OSPF_CSP1D_FIXTURE_DIR, "requires explicit real Rust-backend report evidence");
    const directory = process.env.OSPF_CSP1D_FIXTURE_DIR!;
    const files = (await readdir(directory)).filter(name => /^csp1d-(scip|gurobi)\.json$/.test(name));
    expect(files.length).toBeGreaterThan(0);
    await page.goto("/test/browser/index.html");
    await page.waitForFunction(() => typeof (window as unknown as { checkCuttingReport?: unknown }).checkCuttingReport === "function");
    for (const file of files) {
        const fixtures = JSON.parse(await readFile(join(directory, file), "utf8"));
        for (const fixture of fixtures) {
            const result = await page.evaluate(async fixture => {
                type Read = { summary: ProductionReportSummary; sameText: boolean; raw: string; productionJson: string | null };
                return (window as unknown as { checkCuttingReport: (fixture: unknown) => Promise<{ main: Read; fromWorker: Read }> }).checkCuttingReport(fixture);
            }, fixture);
            expect(result.fromWorker).toEqual(result.main);
            expect(result.main.sameText).toBe(true); expect(result.main.productionJson).toBe(fixture.productionJson);
            expect(result.main.raw).toBe(JSON.parse(fixture.reportJson).child.solverReportJson);
            expect(result.main.summary.candidateComplete).toBe(false);
        }
    }
});

test("browser and module worker load real WASM without Node dependencies", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto("/test/browser/index.html");
    await expect.poll(() => page.evaluate(() => (window as unknown as { result?: { decimal: string } }).result?.decimal)).toBe("9007199254740993.3");
    await expect.poll(() => page.evaluate(() => (window as unknown as { result?: { linear: number } }).result?.linear)).toBe(5);
    expect(await page.evaluate(() => {
        const result = (window as unknown as { result: { symbol: number; token: number; rangeUpper: number; stableId: boolean; quadratic: number; quadraticSymbol: number; quadraticDependency: boolean; quadraticModel: boolean } }).result;
        return [result.symbol, result.token, result.rangeUpper, result.stableId, result.quadratic, result.quadraticSymbol, result.quadraticDependency, result.quadraticModel];
    })).toEqual([5, 1, 2, true, 25, 25, true, true]);
    const cp = { exact: "9007199254740993", evidence: "9007199254740993", violated: true, raw: true, global: true, advanced: true,
        funnel: { dual: false, tierA: 0, tierB: 0, shortlist: 1, top: "limit" } };
    expect(await page.evaluate(() => (window as unknown as { result: { cp: object } }).result.cp)).toEqual(cp);
    // IIS 报告 reader 在浏览器里同样只做自洽性校验，且拒绝越界/空/重复身份。
    // The IIS report reader in the browser also only validates self-consistency and rejects oversized, empty or
    // repeated identities.
    expect(await page.evaluate(() => (window as unknown as { result: { iis: object } }).result.iis)).toEqual({
        algorithm: "deletion", count: 2, first: true, order: true, verbatim: true, constraints: 2, variables: 1, lower: 0, upper: 0,
        rejectsOversized: true, rejectsEmpty: true, rejectsDuplicate: true, disposedRejects: true });
    await expect.poll(() => page.evaluate(() => (window as unknown as { workerResult?: object }).workerResult)).toEqual({ rational: "3002399751580331", linear: 8, quadratic: 64, quadraticSymbol: 64, quadraticDependency: true, quadraticModel: true, symbol: 8, token: 2, rangeUpper: 3, dependency: true, cp });
    expect(errors).toEqual([]);
    const packing = { complete: true, objective: 1, materials: "18014398509481986", remnant: 1,
        renderUnit: "mm", renderBinLength: 100, renderItems: [["a", 0, 40], ["a", 50, 40]], renderUtilization: 0.8 };
    expect(await page.evaluate(() => (window as unknown as { bppResult: object }).bppResult)).toEqual(packing);
    await expect.poll(() => page.evaluate(() => (window as unknown as { bppWorkerResult: object }).bppWorkerResult)).toEqual(packing);
    const cutting = { roundtrip: true, candidates: 3, complete: false, truncated: true, produced: "27021597764222973", unit: "cm" };
    expect(await page.evaluate(() => (window as unknown as { cspResult: object }).cspResult)).toEqual(cutting);
    await expect.poll(() => page.evaluate(() => (window as unknown as { cspWorkerResult: object }).cspWorkerResult)).toEqual(cutting);
    const geometry = { area: 6, areaUnit: "cm^2", orientations: 2, pairs: [0, 1], typed: true, inside: true, origin: true, anchor: true, circle: true,
        disk: true, dimension: true, fitting: true, volume: true, volumeRejectsArea: true };
    expect(await page.evaluate(() => (window as unknown as { geometryResult: object }).geometryResult)).toEqual(geometry);
    await expect.poll(() => page.evaluate(() => (window as unknown as { geometryWorkerResult: object }).geometryWorkerResult)).toEqual(geometry);
    // 数组新能力在浏览器里与 Node 侧数值一致 / The new array capabilities match the Node-side numbers in the browser.
    const arrays = { sumAll: 36, axis: [6, 8, 10, 12], axisShape: [2, 2], outer: [3, 4, 6, 8],
        contract: [58, 64, 139, 154], reshape: [1, 2, 3, 4], padded: [5, 6, 0] };
    expect(await page.evaluate(() => (window as unknown as { arrayResult?: object }).arrayResult)).toEqual(arrays);
    expect(errors).toEqual([]);
});

test("browser BPP1D physical artifacts invoke native MILP and finite-pool execution with Worker report readers", async ({ page }) => {
    test.skip(!process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN, "requires a BPP1D native host");
    await page.goto("/test/browser/index.html");
    const results = await page.evaluate(async ({ url, token }) => {
        const sdk = await import("/dist/browser.js"), bpp = await import("/dist/bpp1d.js"); await sdk.initialize();
        const { checkPacking } = await import("/test/browser/bpp1d.js"); const { artifact } = checkPacking();
        const client = new sdk.HttpClient({ baseUrl: url, token }), results = [];
        for (const Solver of [bpp.Bpp1dMilp, bpp.Bpp1dColumnGeneration]) {
            const job = await new Solver(client, { backend: "scip" }).solve(artifact, { pollIntervalMs: 5 });
            const report = bpp.Bpp1dReport.fromJson(job.reportJson, artifact), summary = report.summary(); report.dispose();
            const worker = new Worker("/test/browser/bpp1d-worker.js", { type: "module" });
            const fromWorker = await new Promise((resolve, reject) => { worker.onerror = event => reject(new Error(event.message)); worker.onmessage = event => { if (event.data.error) reject(new Error(event.data.error)); else if (event.data.summary) resolve(event.data); }; worker.postMessage({ artifact, reportJson: job.reportJson }); });
            worker.terminate(); await client.release(job.id); results.push({ summary, fromWorker });
        }
        return results;
    }, { url: process.env.OSPF_E2E_URL!, token: process.env.OSPF_TOKEN! });
    for (const result of results) {
        expect(result.summary.globallyOptimal).toBe(true); expect(result.summary.objectiveValue).toBe(1);
        expect(result.fromWorker).toEqual({ summary: result.summary, itemCount: "2" });
    }
    // 渲染在浏览器与 Worker 内都必须走原域适配器，给出同一份展示数据。
    // Rendering must go through the original domain adapter in both the browser and the worker.
    const rendered = await page.evaluate(async () => {
        const sdk = await import("/dist/browser.js"); await sdk.initialize();
        const { checkPacking } = await import("/test/browser/bpp1d.js");
        return checkPacking().output;
    });
    expect(rendered.renderUnit).toBe("mm");
    expect(rendered.renderBinLength).toBe(100);
    expect(rendered.renderItems).toEqual([["a", 0, 40], ["a", 50, 40]]);
    expect(rendered.renderUtilization).toBeCloseTo(0.8, 10);
});

test("browser HTTP bridge executes a real SCIP solve", async ({ page }) => {
    test.skip(!process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN, "requires a configured native host");
    page.on("console", message => { if (message.type() === "error") console.error(message.text()); });
    page.on("requestfailed", request => console.error(request.failure()?.errorText));
    await page.goto("/test/browser/index.html");
    const objective = await page.evaluate(async ({ url, token }) => {
        const sdk = await import("/dist/browser.js");
        await sdk.initialize();
        const model = new sdk.MetaModel("browser-http");
        const x = model.addVariable("x", { lowerBound: 0, upperBound: 10 });
        const expression = x.toLinear();
        const lhs = expression.add(3);
        const symbol = model.addLinearSymbol("capacity-value", lhs);
        const reference = symbol.toLinear();
        const capacity = reference.le(7);
        const handle = x.token();
        model.setLinearObjective(expression, "maximize");
        model.addInequality(capacity, "capacity");
        for (const value of [expression, lhs, reference, capacity]) value.dispose();
        const client = new sdk.HttpClient({ baseUrl: url, token });
        const result = await new sdk.SCIPSolver(client).solveLinear(model.toLinearTriadModel());
        const report = sdk.summarizeReport(result.reportJson);
        model.setSolution(new Float64Array(report.values));
        const values = { objective: report.objectiveValue, symbol: symbol.evaluateSolution(), token: handle.result() };
        await client.release(result.id);
        model.setVariableRange(x, { lowerBound: 0, upperBound: 3 });
        const updated = await new sdk.SCIPSolver(client).solveLinear(model.toLinearTriadModel());
        const updatedObjective = sdk.summarizeReport(updated.reportJson).objectiveValue;
        await client.release(updated.id);
        symbol.dispose(); handle.dispose();
        model.dispose();
        return { ...values, updatedObjective };
    }, { url: process.env.OSPF_E2E_URL!, token: process.env.OSPF_TOKEN! });
    expect(objective).toEqual({ objective: 4, symbol: 7, token: 4, updatedObjective: 3 });
});

test("browser quadratic modeling executes a real native SCIP QCP over HTTP", async ({ page }) => {
    test.skip(!process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN, "requires a configured quadratic native host");
    await page.goto("/test/browser/index.html");
    const report = await page.evaluate(async ({ url, token }) => {
        const sdk = await import("/dist/browser.js");
        await sdk.initialize();
        const model = new sdk.MetaModel("browser-qcp");
        const x = model.addVariable("x", { lowerBound: 0, upperBound: 10 });
        const linear = x.toLinear();
        const square = linear.mul(linear);
        const constraint = square.le(4);
        model.addInequality(constraint, "quadratic-capacity");
        model.setQuadraticObjective(linear, "maximize");
        const client = new sdk.HttpClient({ baseUrl: url, token });
        const result = await new sdk.SCIPSolver(client).solveQuadratic(model.toQuadraticTetradModel());
        const summary = sdk.summarizeReport(result.reportJson);
        await client.release(result.id);
        for (const value of [linear, square, constraint, model]) value.dispose();
        return summary;
    }, { url: process.env.OSPF_E2E_URL!, token: process.env.OSPF_TOKEN! });
    expect(report.objectiveValue).toBeCloseTo(2, 5);
    expect(report.values[0]).toBeCloseTo(2, 5);
});

test("browser exact CP snapshots execute through native SCIP lowering over HTTP", async ({ page }) => {
    test.skip(!process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN, "requires a configured CP-capable native host");
    await page.goto("/test/browser/index.html");
    const report = await page.evaluate(async ({ url, token }) => {
        const sdk = await import("/dist/browser.js");
        await sdk.initialize();
        const model = new sdk.ConstraintProgrammingModel("browser-cp", "browser-tests");
        const domain = sdk.IntegerDomain.values([0n, 2n, 4n]);
        const x = model.addVariable("x", domain), expression = x.toExpression();
        const constraint = expression.le(3n);
        model.addConstraint(constraint, { id: "limit" });
        const objective = expression.add(7n);
        model.setObjective(objective, "maximize");
        const snapshot = model.freeze();
        model.dispose();
        const client = new sdk.HttpClient({ baseUrl: url, token });
        const solver = new sdk.SCIPSolver(client);
        const job = await solver.solveConstraintProgramming(snapshot.toArtifact(), { solutionHint: new Map([["x", 0n]]), nodeLimit: 100000, solutionLimit: 100000 });
        const result = sdk.ConstraintProgrammingReport.fromJson(job.reportJson, snapshot);
        await client.release(job.id);
        const limitedJob = await solver.solveConstraintProgramming(snapshot.toArtifact(), { nodeLimit: 0, solutionHint: new Map([["x", 0n]]) });
        const limited = sdk.ConstraintProgrammingReport.fromJson(limitedJob.reportJson, snapshot);
        await client.release(limitedJob.id);
        const unsafe = new sdk.ConstraintProgrammingModel("browser-inexact-cp"), one = sdk.IntegerDomain.range(1n, 1n);
        const a = unsafe.addVariable("a", one), b = unsafe.addVariable("b", one);
        const tooLarge = unsafe.integerExpression([[a, 9007199254740992n], [b, 1n]], 0n);
        unsafe.setObjective(tooLarge, "maximize");
        const unsafeSnapshot = unsafe.freeze();
        let failure = "";
        try {
            const unsafeJob = await solver.solveConstraintProgramming(unsafeSnapshot.toArtifact());
            await client.release(unsafeJob.id);
        } catch (error) {
            if (!(error instanceof sdk.OspfError) || !error.jobId) throw error;
            failure = error.code;
            await client.release(error.jobId);
        }
        const answer = { status: result.problemStatus(), values: [...result.values()].map(String), objective: result.objectiveValue().toString(),
            bound: result.bestBound().toString(), hinted: result.diagnosticExtension("cp.mip.hint.sourceVariables"),
            limited: limited.terminationReason(), limitedValue: limited.value("x").toString(), preflight: unsafeSnapshot.analyzeMipLowering().status, failure };
        for (const value of [domain, expression, objective, constraint, snapshot, result, limited, unsafe, one, tooLarge, unsafeSnapshot]) value.dispose();
        return answer;
    }, { url: process.env.OSPF_E2E_URL!, token: process.env.OSPF_TOKEN! });
    expect(report).toEqual({ status: "FEASIBLE", values: ["2"], objective: "9", bound: "9", hinted: "1", limited: "NODE_LIMIT", limitedValue: "0", preflight: "inexact", failure: "NUMERICAL" });
});

test("browser framework composition runs in the native host and its aggregate report is readable in a Worker", async ({ page }) => {
    test.skip(!process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN, "requires a configured serial-framework native host");
    await page.goto("/test/browser/index.html");
    const result = await page.evaluate(async ({ url, token }) => {
        const sdk = await import("/dist/browser.js");
        await sdk.initialize();
        const model = new sdk.MetaModel("browser-serial-framework");
        const x = model.addVariable("x", { type: "binary" }); model.setLinearObjective([[x, 1]], "maximize");
        const artifact = model.toLinearTriadModel(); model.dispose();
        const client = new sdk.HttpClient({ baseUrl: url, token });
        const solver = new sdk.SerialCombinatorialLinearSolver(client, { backends: ["scip"] });
        const job = await solver.solveLinear(artifact, { pollIntervalMs: 5 });
        const report = sdk.CombinatorialReport.fromJson(job.reportJson, artifact);
        const summary = report.summary();
        const worker = new Worker("/test/browser/framework-worker.js", { type: "module" });
        const fromWorker = await new Promise((resolve, reject) => { worker.onerror = event => reject(new Error(event.message)); worker.onmessage = event => resolve(event.data); worker.postMessage({ artifact, reportJson: report.toJson() }); });
        worker.terminate(); await client.release(job.id); report.dispose();
        return { summary, fromWorker };
    }, { url: process.env.OSPF_E2E_URL!, token: process.env.OSPF_TOKEN! });
    // 摘要允许新增字段（例如上一轮加入的 gap/证明字段），这里只钉住结论部分。
    // The summary may grow new fields (such as the gap/proof fields added last round); pin only the conclusion.
    const summary = { problemStatus: "FEASIBLE", terminationReason: "COMPLETED", objectiveValue: 1, values: [1] };
    expect(result.summary).toMatchObject(summary);
    expect(result.summary.hasOptimalityProof).toBe(true);
    expect(result.fromWorker).toMatchObject({ summary, attempts: 1, selected: true });
});

test("browser parallel First and Best invoke the native framework and retain Worker-readable reports", async ({ page }) => {
    test.skip(!process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN, "requires a configured parallel-framework native host");
    await page.goto("/test/browser/index.html");
    const result = await page.evaluate(async ({ url, token }) => {
        const sdk = await import("/dist/browser.js");
        await sdk.initialize();
        const model = new sdk.MetaModel("browser-parallel-framework");
        const x = model.addVariable("x", { type: "binary" }); model.setLinearObjective([[x, 1]], "maximize");
        const artifact = model.toLinearTriadModel(); model.dispose();
        const client = new sdk.HttpClient({ baseUrl: url, token }), results = [];
        for (const mode of ["first", "best"]) {
            const job = await new sdk.ParallelCombinatorialLinearSolver(client, { backends: ["scip"], mode }).solveLinear(artifact, { pollIntervalMs: 5 });
            const worker = new Worker("/test/browser/framework-worker.js", { type: "module" });
            results.push(await new Promise((resolve, reject) => { worker.onerror = event => reject(new Error(event.message)); worker.onmessage = event => resolve(event.data); worker.postMessage({ artifact, reportJson: job.reportJson }); }));
            worker.terminate(); await client.release(job.id);
        }
        return results;
    }, { url: process.env.OSPF_E2E_URL!, token: process.env.OSPF_TOKEN! });
    const expected = { summary: { problemStatus: "FEASIBLE", terminationReason: "COMPLETED", objectiveValue: 1, values: [1] }, attempts: 1, selected: true };
    expect(result).toHaveLength(2);
    for (const value of result) expect(value).toMatchObject(expected);
});

test("browser models feed native fixed-recourse Benders and Worker readers retain actual cuts and reports", async ({ page }) => {
    test.skip(!process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN, "requires a fixed-recourse native host");
    await page.goto("/test/browser/index.html");
    const result = await page.evaluate(async ({ url, token }) => {
        const sdk = await import("/dist/browser.js"); await sdk.initialize();
        const model = new sdk.MetaModel("browser-fixed-recourse"), x = model.addVariable("x", { type: "binary" });
        const y = model.addVariable("y", { lowerBound: 0, upperBound: 2 });
        model.addLinearConstraint({ name: "coupling", terms: [[x, 1], [y, 1]], relation: "ge", rhs: 1 });
        model.setLinearObjective([[x, 0.5], [y, 1]], "minimize");
        const artifact = model.toLinearTriadModel(); model.dispose();
        const client = new sdk.HttpClient({ baseUrl: url, token });
        const algorithm = new sdk.FixedRecourseAlgorithm(client, { backend: "scip", stages: [{ variableIndex: 1, stage: "continuousRecourse" }] });
        const job = await algorithm.solveLinear(artifact, { pollIntervalMs: 5 });
        const report = sdk.FixedRecourseReport.fromJson(job.reportJson, artifact), summary = report.summary();
        const worker = new Worker("/test/browser/fixed-recourse-worker.js", { type: "module" });
        const fromWorker = await new Promise((resolve, reject) => { worker.onerror = event => reject(new Error(event.message)); worker.onmessage = event => resolve(event.data); worker.postMessage({ artifact, reportJson: report.toJson() }); });
        worker.terminate(); await client.release(job.id); report.dispose();
        return { summary, fromWorker };
    }, { url: process.env.OSPF_E2E_URL!, token: process.env.OSPF_TOKEN! });
    expect(result.summary.stop).toBe("converged");
    expect(result.summary.objectiveValue).toBe(0.5); expect(result.summary.bestBound).toBe(0.5);
    expect(result.summary.optimalityCuts).toBeGreaterThan(0);
    expect(result.fromWorker).toEqual({ summary: result.summary, hasMaster: true, hasSubproblem: true });
});

test("browser column generation runs native Phase I/pricing/final and keeps Worker-readable child reports", async ({ page }) => {
    test.skip(!process.env.OSPF_E2E_URL || !process.env.OSPF_TOKEN, "requires a column-generation native host");
    await page.goto("/test/browser/index.html");
    const result = await page.evaluate(async ({ url, token }) => {
        const sdk = await import("/dist/browser.js"); await sdk.initialize();
        const model = new sdk.MetaModel("browser-column-generation"), x = model.addVariable("x", { type: "binary" }), y = model.addVariable("y", { type: "binary" });
        model.addLinearConstraint({ name: "coupling", terms: [[x, 1], [y, 1]], relation: "ge", rhs: 1 });
        model.setLinearObjective([[x, 1], [y, 2]], "minimize"); const artifact = model.toLinearTriadModel(); model.dispose();
        const client = new sdk.HttpClient({ baseUrl: url, token });
        const algorithm = new sdk.ColumnGenerationAlgorithm(client, { backend: "scip", blocks: [{ id: "a", variableIndices: [0] }, { id: "b", variableIndices: [1] }] });
        const job = await algorithm.solveLinear(artifact, { pollIntervalMs: 5 });
        const report = sdk.ColumnGenerationReport.fromJson(job.reportJson, artifact), summary = report.summary();
        const worker = new Worker("/test/browser/column-generation-worker.js", { type: "module" });
        const fromWorker = await new Promise((resolve, reject) => { worker.onerror = event => reject(new Error(event.message)); worker.onmessage = event => resolve(event.data); worker.postMessage({ artifact, reportJson: report.toJson() }); });
        worker.terminate(); await client.release(job.id); report.dispose(); return { summary, fromWorker };
    }, { url: process.env.OSPF_E2E_URL!, token: process.env.OSPF_TOKEN! });
    expect(result.summary.stop).toBe("completed"); expect(result.summary.phaseOneComplete).toBe(true); expect(result.summary.pricingConverged).toBe(true);
    expect(result.summary.objectiveValue).toBe(1); expect(result.summary.columnCount).toBeGreaterThanOrEqual(2);
    expect(result.fromWorker).toEqual({ summary: result.summary, hasMaster: true, hasPricing: true, hasFinal: true });
});
