import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";
import { initialize, MetaModel, SCIPSolver, HttpClient, summarizeReport } from "../dist/node.js";
import { Bpp1dMilp, PackingContext } from "../dist/bpp1d.js";
import { NodeClient } from "../dist/native.js";

function sample() {
    const model = new MetaModel("native-integration");
    const x = model.addVariable("x", { lowerBound: 0, upperBound: 10 });
    model.setLinearObjective([[x, 1]], "maximize");
    model.addLinearConstraint({ name: "capacity", terms: [[x, 1]], relation: "le", rhs: 4 });
    const artifact = model.toLinearTriadModel();
    model.dispose();
    return artifact;
}

let installed = false;
try { createRequire(import.meta.url).resolve("ospf-node-bindings"); installed = true; } catch {}

test("Node N-API real SCIP solve", { skip: !installed }, async () => {
    await initialize();
    const client = await NodeClient.create();
    const caps = await client.capabilities();
    if (!caps.backends.some(b => b.id === "scip" && b.compiled)) throw new Error("SCIP is required for this integration gate");
    const result = await new SCIPSolver(client).solveLinear(sample());
    assert.equal(result.status, "completed");
    const report = summarizeReport(result.reportJson);
    assert.equal(report.objectiveValue, 4);
    assert.deepEqual(report.values, [4]);
    // 摘要必须让人能自己判断结论强度，而不是只看到一个目标值。
    // The summary must let callers judge the strength of the conclusion instead of only showing an objective value.
    assert.equal(report.hasOptimalityProof, true);
    assert.equal(report.terminationReason, "COMPLETED");
    assert.equal(typeof report.solveTimeMs, "number");
    assert.ok(report.solveTimeMs >= 0);
    assert.equal(typeof report.relativeGap === "number" || report.relativeGap === null, true);
    await client.release(result.id);
    await assert.rejects(client.get(result.id), { code: "NotFound" });
});

function knapsack(seed, items) {
    let state = seed;
    const next = () => { state = (state * 1103515245 + 12345) % 2147483648; return state / 2147483648; };
    const model = new MetaModel(`gap-${seed}`), vars = [];
    for (let index = 0; index < items; index += 1) vars.push(model.addVariable(`x${index}`, { type: "binary" }));
    for (let row = 0; row < 10; row += 1) {
        model.addLinearConstraint({ name: `cap${row}`, terms: vars.map((handle, index) => [handle, Math.floor(1 + next() * 997) * (index + row + 3) % 1009 + 1]), relation: "le", rhs: 3000 + row * 337 });
    }
    model.setLinearObjective(vars.map((handle, index) => [handle, Math.floor(1000 + next() * 9000) % 10007 + 1]), "maximize");
    const artifact = model.toLinearTriadModel();
    model.dispose();
    return artifact;
}

test("HTTP real SCIP honours a nonzero gap limit and withdraws the optimality proof", { skip: !process.env.OSPF_E2E_URL }, async () => {
    await initialize();
    const client = new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN });
    const artifact = knapsack(7, 400);
    const limited = await new SCIPSolver(client).solveLinear(artifact, { tuning: { mipGap: 0.99 } });
    const summary = summarizeReport(limited.reportJson);
    // 间隙上限必须真的让求解提前收工：GAP_LIMIT、停止时仍有间隙、且不携带最优性证明。
    // The gap limit must actually stop the solve early: GAP_LIMIT, a remaining gap and no optimality proof.
    assert.equal(limited.status, "completed");
    assert.equal(summary.terminationReason, "GAP_LIMIT");
    assert.equal(summary.hasOptimalityProof, false);
    assert.equal(typeof summary.relativeGap, "number");
    assert.ok(summary.relativeGap > 0 && summary.relativeGap < 0.99, `gap ${summary.relativeGap}`);
    assert.equal(typeof summary.objectiveValue, "number");
    // 严格模型（间隙 0）必须关闭间隙并给出证明 / A strict gap of 0 must close the gap and carry a proof.
    const exact = await new SCIPSolver(client).solveLinear(artifact, { tuning: { mipGap: 0 } });
    const exactSummary = summarizeReport(exact.reportJson);
    assert.equal(exactSummary.terminationReason, "COMPLETED");
    assert.equal(exactSummary.hasOptimalityProof, true);
    // 提前收工不可能好于最优解 / An early stop can never beat the optimum.
    assert.ok(summary.objectiveValue <= exactSummary.objectiveValue + 1e-6);
    await client.release(limited.id); await client.release(exact.id);
});

test("HTTP real SCIP BPP1D tail window only re-arranges the tail and withdraws optimality", { skip: !process.env.OSPF_E2E_URL }, async () => {
    await initialize();
    const client = new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN });
    const problem = { items: [
        { id: "a", length: { value: 60, unit: "cm" }, weight: { value: 0.1, unit: "kg" }, amount: 4n, materials: new Map() },
        { id: "b", length: { value: 30, unit: "cm" }, weight: { value: 0.1, unit: "kg" }, amount: 4n, materials: new Map() },
    ], binTypes: [{ id: "bin", length: { value: 100, unit: "cm" }, maxWeight: { value: 10, unit: "kg" }, cost: 1, inventory: null }],
        spacing: { value: 0, unit: "cm" }, lengthUnit: "cm", weightUnit: "kg", objective: "binCount" };
    const artifact = new PackingContext(problem).toArtifact();
    const plain = await new Bpp1dMilp(client, { backend: "scip" }).solve(artifact);
    const tailed = await new Bpp1dMilp(client, { backend: "scip", tailWindow: 2 }).solve(artifact);
    assert.equal(tailed.status, "completed");
    const plainReport = JSON.parse(plain.reportJson), tailedReport = JSON.parse(tailed.reportJson);
    assert.equal(plainReport.summary.tailWindow, null);
    assert.equal(tailedReport.summary.tailWindow, 2);
    assert.equal(plainReport.summary.tailOptimized, false);
    // 目标不得因尾箱优化变差 / The objective must not get worse through tail optimization.
    assert.ok(tailedReport.summary.objectiveValue <= plainReport.summary.objectiveValue + 1e-9);
    // 排样被改动时不得再主张全局最优 / A changed packing must not claim global optimality.
    if (tailedReport.summary.tailOptimized) assert.equal(tailedReport.summary.globallyOptimal, false);
    // 只重排尾部：前缀箱必须逐字一致 / Only the tail moves: prefix bins must match exactly.
    const prefix = plainReport.packing.plans.length - 2;
    assert.ok(prefix > 0);
    for (let index = 0; index < prefix; index += 1) {
        assert.deepEqual(tailedReport.packing.plans[index], plainReport.packing.plans[index]);
    }
    // 越界窗口在 SDK 边界就被拒绝 / An out-of-range window is rejected at the SDK boundary.
    assert.throws(() => new Bpp1dMilp(client, { backend: "scip", tailWindow: 0 }), { code: "InvalidInput" });
    assert.throws(() => new Bpp1dMilp(client, { backend: "scip", tailWindow: 1001 }), { code: "InvalidInput" });
    await client.release(plain.id); await client.release(tailed.id);
});

test("HTTP real SCIP solve", { skip: !process.env.OSPF_E2E_URL }, async () => {
    await initialize();
    const client = new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN });
    const result = await new SCIPSolver(client).solveLinear(sample());
    assert.equal(summarizeReport(result.reportJson).objectiveValue, 4);
    await client.release(result.id);
});

test("HTTP real SCIP solve honours solver tuning without changing the optimum", { skip: !process.env.OSPF_E2E_URL }, async () => {
    await initialize();
    const client = new HttpClient({ baseUrl: process.env.OSPF_E2E_URL, token: process.env.OSPF_TOKEN });
    const artifact = sample();
    const plain = await new SCIPSolver(client).solveLinear(artifact);
    const plainObjective = summarizeReport(plain.reportJson).objectiveValue;
    await client.release(plain.id);
    for (const tuning of [{ threads: 1 }, { seed: 7 }, { threads: 2, seed: 3, mipGap: 0 }, { mipGap: 0.5 }]) {
        const tuned = await new SCIPSolver(client).solveLinear(artifact, { tuning });
        const report = summarizeReport(tuned.reportJson);
        assert.equal(tuned.status, "completed");
        // 调优不改变模型或预算；间隙为 0 时必须与默认最优值一致，非零间隙只允许更差或相等。 / Tuning changes neither model nor budgets; a zero gap must match the default optimum and a nonzero gap may only be equal or worse.
        if (tuning.mipGap === undefined || tuning.mipGap === 0) assert.equal(report.objectiveValue, plainObjective, JSON.stringify(tuning));
        else assert.ok(report.objectiveValue <= plainObjective, JSON.stringify(tuning));
        await client.release(tuned.id);
    }
    // 两后端交集的上界 64 必须被真实宿主接受（SCIP 的 lp/threads 上限即 64）。 / The shared upper bound of 64 must be accepted by the real host, which is SCIP's own lp/threads cap.
    const domestic = await new SCIPSolver(client).solveLinear(artifact, { tuning: { threads: 64 } });
    assert.equal(domestic.status, "completed");
    await client.release(domestic.id);
});
