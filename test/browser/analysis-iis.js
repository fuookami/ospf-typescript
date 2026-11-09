import { LinearIisReport } from "/dist/core.js";

// 浏览器里同样的 IIS 报告 reader：只读文本并校验自洽性，绝不计算 IIS（那需要 Gurobi 原生后端）。
// The same IIS report reader in the browser: it only reads text and validates self-consistency, and never computes an
// IIS, which needs the native Gurobi backend.
export function checkIisReader() {
    const text = JSON.stringify({ algorithm: "deletion",
        constraintIds: ["linear-constraint:8#m:1#0:13#at_least_five:0#", "linear-constraint:8#m:1#1:11#at_most_one:0#"],
        lowerBoundVariables: [], upperBoundVariables: [], originalConstraintCount: 2, originalVariableCount: 1 });
    const parsed = LinearIisReport.fromJson(text);
    const output = {
        algorithm: parsed.algorithm(),
        count: parsed.constraintIds().length,
        first: parsed.constraintIds()[0].endsWith("13#at_least_five:0#"),
        order: parsed.constraintIds()[1].endsWith("11#at_most_one:0#"),
        verbatim: parsed.toJson() === text,
        constraints: parsed.originalConstraintCount(),
        variables: parsed.originalVariableCount(),
        lower: parsed.lowerBoundVariables().length,
        upper: parsed.upperBoundVariables().length,
        // 子系统不得大于原模型：三条约束配两条上限必须被拒。
        // A subsystem may not exceed its model: three constraints against a limit of two must fail.
        rejectsOversized: (() => { try { LinearIisReport.fromJson(JSON.stringify({ ...JSON.parse(text),
            constraintIds: [...JSON.parse(text).constraintIds, "x"] })); return false; } catch (error) { return error.code === "InvalidInput"; } })(),
        // 空身份与重复身份同样拒绝。 / Empty and repeated identities are rejected too.
        rejectsEmpty: (() => { try { LinearIisReport.fromJson(JSON.stringify({ ...JSON.parse(text), constraintIds: ["a", ""] })); return false; }
            catch (error) { return error.code === "InvalidInput"; } })(),
        rejectsDuplicate: (() => { try { LinearIisReport.fromJson(JSON.stringify({ ...JSON.parse(text), constraintIds: ["a", "a"] })); return false; }
            catch (error) { return error.code === "InvalidInput"; } })(),
    };
    parsed.dispose();
    output.disposedRejects = (() => { try { parsed.toJson(); return false; } catch (error) { return error.code === "Disposed"; } })();
    return output;
}
