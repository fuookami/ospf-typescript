# ospf-wasm

[English](README.md) | 简体中文

## 职责

`ospf-typescript` 是独立 TypeScript SDK 仓库，发布 npm 包 **`ospf-wasm`**。Rust 仓库负责 WASM/N-API 底层绑定、模型协议、原生求解和领域算法；SDK 负责公共 API、加载、HTTP 传输和集成测试，不重写算法。

当前为初始 0.1 版本，尚未完成整库覆盖。已开放错误与协议类型、Decimal/Rational、动态行优先数组、基础运行时物理量、线性/二次对象建模及模型交换、Token/LinearExpressionSymbol/QuadraticExpressionSymbol 句柄、精确 CP 约束工厂/快照与活动性分析、按优先级排序并分组的候选漏斗（无对偶证据，只会给出 Tier C/Unclassified），以及 Gurobi/SCIP 的 HTTP/Node 原生 LP/MIP/QP/MIQP/QCP 及有条件 CP 求解门面。默认规则 BPP1D 与 CSP1D 计算、原生执行和报告读取，以及 BPP2D 原生执行与源／报告校验、CSP2D 原生执行及源／列／报告校验已通过独立子路径开放。BPP3D 开放长方体与轴感知圆柱源校验、物理方案回放、经 HTTP/Node 的有界单轮原生执行，以及其版本化执行报告的 Rust reader；圆柱另可给出离散半径候选（`min`/`max`/`step`，按原 CSV 路径展开并受横截面约束），供原圆装箱层生成器使用；源另可给出包属性子集（`allow_mixed_loading`、`max_stack_layers`、`tags`，与 CSV 路径物化项一致）；连续半径组件另可给出 `objective` 目标策略（`none` 或带权 `minimizeRadiusSquared`）；执行报告另透出原流程的 `continuous_radius_*` 条目（`ExecutionReport.continuousRadius()`）；另可声明连续半径组件（原型带单位边界＋业务权重函数），final 模型会注册真实半径／半径平方／PWL 变量，缺权重函数或零系数在边界即报错。Gantt 活动调度开放有限候选源校验、显式方案复验、经 HTTP/Node 的原生单 MILP 执行及源绑定执行报告 reader。共享 BPP 稀疏装载可接受可选的舱位一维区间或二维矩形（两者互斥），由原几何守卫／原二维离散装载工厂仅对同空间严格重叠补出互斥边（贴边与跨空间不算冲突）；它还通过 `ospf-wasm/bpp` 开放默认规则可移植建模、方案复验及原生线性报告读取，现另开放原普通 MILP application 与类型化最小化成本，连续资源 Benders 亦已接入，分区对象生命周期已开放，原生根节点分区 application 已单独接入，branch-and-price 仍未绑定。其他领域框架、CP 高级会话与其他符号特化尚未导出。

## 安装与初始化

`ospf-wasm/framework` 还已开放原生串行/并行线性组合编排及绑定源模型的聚合报告读取；已另行开放固定连续追索 Benders；已开放同源投影列生成策略；其余 Benders 和完整领域流程仍待接入。

Node 22+，仅 ESM。发布后的包使用：

```typescript
import { initialize, MetaModel, HttpClient, SCIPSolver, summarizeReport } from 'ospf-wasm';

await initialize();
const model = new MetaModel('example');
const x = model.addVariable('x', { lowerBound: 0, upperBound: 10 });
model.setLinearObjective([[x, 1]], 'maximize');
model.addLinearConstraint({ name: 'capacity', terms: [[x, 1]], relation: 'le', rhs: 4 });

const client = new HttpClient({ baseUrl: 'http://127.0.0.1:8787', token: '<宿主凭据>' });
const result = await new SCIPSolver(client).solveLinear(model.toLinearTriadModel());
console.log(summarizeReport(result.reportJson!));
await client.release(result.id);
model.dispose();
```

浏览器使用同一主入口的 browser 条件，默认加载打包在底层包中的 WASM；也可显式传入初始化资源。Node 从包内读取字节，不对 file URL 使用 fetch。各 Worker 独立初始化。

Node 本地求解需要额外安装匹配版本的 `ospf-node-bindings`：

```typescript
import { NodeClient } from 'ospf-wasm/native';
const client = await NodeClient.create();
```

本地绑定不会静默切换 HTTP。浏览器无法加载 Gurobi/SCIP 原生 DLL；即使选择了 TS 求解门面，其执行仍在原生宿主。

Node 或 HTTP 宿主加载的 SCIP 共享运行时必须与构建该原生程序或绑定时使用的头文件版本完全一致，包括补丁版本。已加载但版本不一致时，求解前返回 `ENVIRONMENT` 错误；库缺失或不兼容时可能在加载阶段失败。能力查询只表示编译了哪些功能，不保证运行时可用。

## Public API 与边界

对象型线性建模也可以直接用于同一个 `MetaModel`：

```typescript
const expressionModel = new MetaModel('expressions');
const variable = expressionModel.addVariable('x', { lowerBound: 0, upperBound: 10 });
const objective = expressionModel.linearExpression([[variable, 2]]);
const lhs = objective.add(3);
const capacity = lhs.le(11); // 2*x + 3 <= 11
expressionModel.setLinearObjective(objective, 'maximize');
expressionModel.addInequality(capacity, 'expression-capacity');
const value = lhs.evaluate(new Float64Array([4])); // 11，必须包含模型全部变量
for (const object of [objective, lhs, capacity]) object.dispose();
expressionModel.dispose();
```

`variable.toLinear()` 创建单位系数表达式。`add/sub` 接受同模型的 `Linear` 或 number，`mul(number)` 缩放，`neg` 取负；每次返回新的 WASM 对象。`le/ge/eq` 接受有限 number 或同模型表达式。

`linear.mul(otherLinear)` 返回 Rust `Quadratic`，`linear.toQuadratic()` 无损提升。二次式 `add/sub` 接受同模型 Quadratic/Linear 或 number，`mul/neg` 仅做标量缩放；`linearCoefficients()` 返回稠密副本，`quadraticTerms()` 返回排序的 TypedArray 副本（`rows`、`columns`、`coefficients`）。每项表示 `coefficient*x[row]*x[column]`，交叉项只存一次，无隐含二倍因子，不是 Hessian。`evaluate` 要求当前完整变量顺序，`tryToLinear` 仅在所有二次项消去后降阶，否则报错，不丢弃系数，也不会隐式生成三次或四次式。

二次式 `le/ge/eq` 创建快照，通过 `addInequality` 注册。`setQuadraticObjective` 接受 Quadratic/Linear，`toQuadraticTetradModel()` 导出无损模型，交给 `solveQuadratic()` 执行。约束真正注册到 Rust MetaModel；目标的线性部分交给 MetaModel，Q 在 Rust 四角模型编译边界写入，不修改 core 原有泛型线性子目标契约。切换为 `setLinearObjective` 会清空 Q，线性导出拒绝二次约束或非零 Q，不静默丢弃。codec 检查往返指纹一致性，拒绝无法保留的元数据；非零目标常数仍明确不支持。

普通线性与二次导出另会检查 core 指纹未覆盖的实际求解器变量类型；无法无损保留时明确拒绝，不返回无效模型。带非零约束多项式常数的原始 Rust 二次模型也被拒绝，因为移到右端可能因舍入丢失；WASM 关系在注册前已归一化常数。显式 compiled-linear 子模型路径使用独立 codec，不会自动回退。

```typescript
const qmodel = new MetaModel('qcp');
const qx = qmodel.addVariable('x', { lowerBound: 0, upperBound: 10 });
const qlinear = qx.toLinear();
const square = qlinear.mul(qlinear);
const qcapacity = square.le(4);
qmodel.addInequality(qcapacity, 'quadratic-capacity');
qmodel.setQuadraticObjective(qlinear, 'maximize');
const qresult = await new SCIPSolver(client).solveQuadratic(qmodel.toQuadraticTetradModel());
console.log(summarizeReport(qresult.reportJson!)); // x 约为 2
await client.release(qresult.id);
for (const value of [qlinear, square, qcapacity, qmodel]) value.dispose();
```

SCIP 二次执行需要 native `scip-quadratic` 和对应的链接/runtime feature，Gurobi 使用已选定的版本 feature。`solveQuadratic` 检查宿主声明的 `quadratic` 能力后，显式发送 `modelKind: 'quadratic'`；旧版仅支持线性的宿主会被拒绝，不静默降阶。进度、取消与报告复用线性任务生命周期。浏览器 HTTP 调用的实际求解仍在原生端。

- 子路径：`base`、`math`、`multiarray`、`quantities`、`core`、`framework`、`bpp`、`bpp1d`、`bpp2d`、`bpp3d`、`csp1d`、`csp2d`、`geometry2d`、`gantt`、仅 Node 的 `native`。
Decimal/Rational 接受无损字符串或 bigint，支持精确加／减／乘／取负／比较／零判定；`Rational` 另有精确除法并拒绝零除数，`Decimal` 除法因一般不精确而未开放。
- `Decimal`/`Rational` 从文本或 bigint 构造，计算在 Rust 中完成；精确对象不要先转为 number。
- `MultiArray` 接受 shape 和 Float64Array，当前仅行优先，输入输出均复制，并开放形状读取、二维矩阵乘、一维点积、二维转置、方阵迹（复用原 Rust einsum）全局/单轴/多轴求和与前缀和（复用原 Rust FastSum，被求和的轴会消失，越界轴在边界拒绝），以及一维外积、任意轴缩并（委托原通用 einsum 执行器，并与矩阵乘/点积对照验证）与形状重排（沿用原截断/补零语义）；`Quantity` 当前支持 m/km/cm/dm/mm、in/ft/yd 及其平方单位（含 dm^2）、体积 m³/L（1 L = 0.001 m³）、s/min/h、kg/g/t/lb，并可在同量纲内相加、相减、比较，按无量纲因子缩放，乘除时由原单位代数合并量纲（`L^2`、`L·T^-1`），跨量纲比较直接拒绝；合并后的单位可能不在固定词表内，`symbol()` 可能为空串，此时以 `dimension()` 为准。
- `MetaModel` 变量仅在所属模型有效，其整数建模限精确 f64 范围；独立 CP builder 使用完整精确 i64。命名选项展开成位置参数的入口（变量区间与 CP 区间）都会拒绝未知字段，拼错字段不会静默改变语义。
- `Linear` 和 `LinearInequality` 也由 Rust 检查模型归属，模型释放后全部失效；关系捕获快照，原表达式释放不影响它和已注册的约束。后续新增变量时，求值输入必须包含这些变量，系数副本按当前变量数量补零。
- 约束常数移到右端并检查溢出；非零目标常数暂报 `Unsupported`，不会静默丢弃。
- 原始模型与报告 JSON 保持字符串，不解析再编码；`summarizeReport` 由 Rust 校验并返回 f64 摘要，同时给出 `hasOptimalityProof`／`relativeGap`／`absoluteGap`／`nodes`／`solveTimeMs`，让调用方自行判断结论强度而不是只看目标值。
- WASM 对象显式 `dispose()`；释放后调用报 `Disposed`。结束后显式 `client.release(id)` 释放原生任务存储。
- 提交前检查 `AbortSignal`，能力查询成功期间取消也不会创建新任务，但不会中断正在进行的能力查询。取得任务 ID 后，取消会唤醒轮询等待，在下次状态查询前请求后端合作取消并等待真实报告；不会中断正在进行的传输请求。若取消响应已是终态，校验任务身份和指纹后直接使用，无需额外轮询；运行中响应可提供更新的进度。取得任务 ID 后的错误携带 `jobId`，可查询、取消并释放任务。如果提交响应丢失，任务可能已启动但客户端不知道 ID；当前宿主没有任务列表或幂等提交接口。
- 已开放内置原生串行线性组合策略；其他列生成策略、其余 Benders 和其他多轮领域策略仍待接入；固定连续追索另见专节，不把任意 TS 闭包序列化到 Rust。

`variable.token()` 和 `model.tokens()` 返回持久 Rust MetaModel 中真实 token 的独立句柄。`id()` 为 bigint，在本模型/实例内稳定，但不是可跨 HTTP 或进程复用的身份。`model.addLinearSymbol(name, expression)` 和 `model.addQuadraticSymbol(name, expression)` 分别注册真正的 Rust 线性与二次表达式符号；对应的 `toLinear()` 和 `toQuadratic()` 将当前符号保留为后续注册的直接依赖，`dependencyIds()` 返回 BigUint64Array 副本。两者共享名称空间并在 Rust 中求值；同名符号及跨模型引用被拒绝，释放句柄不注销注册。

`model.setVariableRange(x, { lowerBound, upperBound })` 替换变量范围，同时保留 token 身份及先前导出的模型。连续／整数变量省略端点表示无界，二元变量省略端点分别默认为 0、1；整数边界仍限于 f64 精确整数范围。创建变量和更新范围均拒绝 null 或非数字边界，不会静默转换。更新成功清除显式赋值；非法范围或跨模型引用不会改变模型和原赋值。

`model.setSolution(Float64Array)` 检查完整 shape、有限值、范围及整数性后显式赋值，**不是可行性或最优性证明**。非法赋值保留旧值，成功的结构修改清除赋值；`clearSolution()` 显式清除。`token.result()` 与 `symbol.evaluateSolution()` 在所需赋值缺失时返回 undefined。每个句柄分别释放；模型释放后全部关联句柄失效。

## 精确 CP 快照与活动性分析

初始化 WASM 后，可从 `ospf-wasm/core` 使用真实 Rust CP builder，与 f64 `MetaModel` 分离：

```typescript
import { ConstraintProgrammingModel, IntegerDomain, ConstraintActivityAnalyzer } from 'ospf-wasm/core';
const cp = new ConstraintProgrammingModel('exact', 'example');
const domain = IntegerDomain.range(9007199254740993n, 9007199254740999n);
const x = cp.addVariable('x', domain);
const expression = x.toExpression();
const limit = expression.le(9007199254740995n);
cp.addConstraint(limit, { id: 'capacity' });
cp.setObjective(expression);
const snapshot = cp.freeze();
cp.dispose(); // 独立快照仍然有效
console.log(snapshot.variableIds()); // canonical 稳定 ID 顺序，不一定是注册顺序
snapshot.validateAssignment([9007199254740993n]);
const report = new ConstraintActivityAnalyzer().analyzeCp(snapshot, [9007199254740996n]);
console.log(report.status('capacity'), report.integerLhs('capacity')); // VIOLATED、精确 bigint
const canonicalText = snapshot.toJson(); // 保持文本，不能 JSON.parse 后重新编码
for (const value of [domain, expression, limit, snapshot, report]) value.dispose();
```

工厂覆盖当前 core AST 的全部约束族：整数仿射关系、布尔组合、implication/reification、表达式 allDifferent、Element、允许/禁止赋值表、noOverlap、Cumulative、Circuit、Automaton、Reservoir，**不代表 core 全部 public 操作或无限制 CP 求解引擎**。注册失败保持 builder 原状态。域保留稀疏值、完整 i64 上下界与 bigint 基数；输入用 bigint/BigInt64Array，普通 bigint 数组在创建 TypedArray 前检查范围，调用者已创建并截断的 BigInt64Array 无法恢复。表达式求值用注册顺序，快照赋值用 `variableIds()` 顺序。`intervalValuesJson` 验证赋值、忽略 absent 区间，并用文本保留精确区间值。

快照独立于源模型后续修改/释放；表达式和约束仍受模型生命周期限制，每个 WASM 对象分别释放。canonical 导入校验 schema、身份、指纹、摘要；artifact 导入额外校验外层指纹。导入/工厂覆盖不等于原生降维全部支持。

`allDifferent`、表列、Circuit 后继与 Automaton 输入接受变量或整数表达式。`element({ index, values, target })` 保留精确常量，整个索引域必须落在表内。`implication(literal, constraint)` 与 `reification(literal, constraint, direction)` 捕获后件 AST，方向为 equivalent/impliedByLiteral/impliesLiteral；literal 接受变量或 `{ variable, negated }`。表行宽必须匹配表达式列，保留空表/零列元组语义，绑定侧最多 1,048,576 行；原生降维预算更小且独立。临时表达式容器在成功/失败路径均由 SDK 释放。

`addInterval` 的 duration 接受 bigint 或所属的非负整数变量，presence 接受正/负布尔文字；presence 变量使用 `IntegerDomain.boolean()`。`cumulative(tasks, capacity)` 的任务为 `{ interval, demand }`，需求/容量为固定 bigint。`automaton(expressions, options)` 使用 i32 状态 number 与精确 bigint 标签，创建 Int32Array 前检查范围（调用者已截断的数组无法恢复）。`reservoir({ events, initialLevel, minimumLevel, maximumLevel })` 接受 `{ time, levelChange }` 表达式，由 Rust 聚合同时间变化。

```typescript
const global = new ConstraintProgrammingModel('element-and-reification');
const indexDomain = IntegerDomain.boolean();
const valueDomain = IntegerDomain.values([2n, 4n]);
const index = global.addVariable('index', indexDomain);
const value = global.addVariable('value', valueDomain);
const output = value.toExpression();
const selected = output.eq(4n);
const element = global.element({ index, values: [2n, 4n], target: value });
const reified = global.reification(index, selected);
global.addConstraint(element, { id: 'element' });
global.addConstraint(reified, { id: 'reification' });
const globalSnapshot = global.freeze();
globalSnapshot.validateAssignment([1n, 4n]); // variableIds(): index, value
for (const object of [indexDomain, valueDomain, output, selected, element, reified, globalSnapshot, global]) object.dispose();
```

活动性报告独立持有并校验 schema。`analyzeLinear` 支持指纹校验后的线性 artifact 与 Float64Array 候选赋值。`integerLhs/integerRhs` 为整数关系保留精确 bigint；slack、归一化与变量边界指标仍为 core f64，不宣称全精确。活动性分析不是 IIS、冲突提取、敏感性或再求解。候选漏斗同样只做排序与分组：在没有对偶证据时不声称任何分层，短名单按优先级补足。

## 原生 CP 求解

WASM 初始化后，可派生不可变 assumptions 快照并预检默认 MIP 降维：

```typescript
const assumptionModel = new ConstraintProgrammingModel('assumptions');
const assumptionDomain = IntegerDomain.range(0n, 4n);
assumptionModel.addVariable('x', assumptionDomain);
const baseSnapshot = assumptionModel.freeze();
const restricted = baseSnapshot.withAssumptions([
    { kind: 'lowerBound', variableId: 'x', value: 2n },
    { kind: 'upperBound', variableId: 'x', value: 3n },
]);
const analysis = restricted.analyzeMipLowering();
if (analysis.status === 'lowered') console.log(analysis.fingerprint, analysis.generatedConstraints);
if (analysis.status === 'inexact') console.log(analysis.field, analysis.value); // 无损文本
// 提交 restricted.toArtifact()；使用 restricted 而非 baseSnapshot 导入其报告。
for (const object of [restricted, baseSnapshot, assumptionDomain, assumptionModel]) object.dispose();
```

`withAssumptions` 还支持 equal、literal（可选 negated）和 sparseDomain（IntegerDomain）。ID 显式指向接收快照的稳定变量，不接受 builder 句柄。源快照不变，派生对象在源释放后仍有效。重复身份、域和值均由现有 Rust core 校验。相互矛盾但单独有效的假设保留为不可行模型，不会被忽略。这不是增量 session 或 assumption-aware conflict 诊断。

`analyzeMipLowering` 在 core 默认预算下同步创建并释放完整执行 MIP；非零目标常数的固定辅助列计入统计和预算。Rust 生成的 `MipLoweringAnalysis` 区分 lowered、unsupported、inexact、budgetExceeded、invalid，只返回首个降维失败。它不调用求解器；成功不证明可行性、不查询后端支持/运行就绪状态，也不保证求解成功。预检没有取消或自定义预算选项，Cumulative 仍默认关闭。

初始化后，通过显式 HTTP 或 Node 客户端执行。宿主必须声明 `cpExactLowering`；SDK 显式提交 `modelKind: 'cp'`，不静默回退为线性。

```typescript
import { SCIPSolver, HttpClient } from 'ospf-wasm';
import { ConstraintProgrammingModel, ConstraintProgrammingReport, IntegerDomain } from 'ospf-wasm/core';
const model = new ConstraintProgrammingModel('native-cp');
const domain = IntegerDomain.range(0n, 4n);
const x = model.addVariable('x', domain);
const objective = x.toExpression();
model.setObjective(objective, 'maximize');
const snapshot = model.freeze();
const client = new HttpClient({ baseUrl: 'http://127.0.0.1:8787', token: '<host credential>' });
const job = await new SCIPSolver(client).solveConstraintProgramming(snapshot.toArtifact());
const report = ConstraintProgrammingReport.fromJson(job.reportJson!, snapshot);
console.log(report.problemStatus(), report.values(), report.objectiveValue()); // FEASIBLE、BigInt64Array [4n]、4n
await client.release(job.id);
for (const value of [model, domain, objective, snapshot, report]) value.dispose();
```

`GurobiSolver` 提供同名方法。两者均复用 Rust 有条件的严格有限 MIP 降维，**不是 native CP 引擎**。完整 i64 快照支持不意味着任意 i64 模型均能跨过浮点 MIP 边界。未支持结构、不精确转换及 core 降维预算超限明确失败（`UNSUPPORTED` / `NUMERICAL`），不舍入或丢约束。CP 保留精确目标常数，不受当前 MetaModel 交换限制。时间限制覆盖后端求解，不是 codec/降维全过程的可中断截止时间。持久会话、原生 assumptions 参数、assumption conflict shrinking 和自定义降维预算尚未绑定；assumptions 派生快照可作为普通 CP 模型提交。

非零 CP 目标常数通过固定辅助列进入实际求解，使后端目标、界、gap 和进度包含常数；源报告不包含该列。所有 CP 目标（包括零常数）的常数绝对值与各系数／变量域贡献绝对值上界之和必须不超过 `2^53`；这一保守检查可能拒绝互相抵消的项。面对未声明 `cpObjectiveConstant` 的旧宿主，SDK 使用已初始化的 WASM codec 拒绝非零常数，并在提交零常数快照前执行当前默认预算下的完整 MIP 预检。此同步预检也可能拒绝其他未支持或超预算模型，且不可中断。旧版 SDK 不执行此检查。

新的原生运行时为已编译的 SCIP 和 Gurobi 声明 `intermediateProgress`。直接提交的求解任务可以发布百分比不确定的中间快照，默认按 100 毫秒节流；可用时包含当前解目标、界和 gap，最终报告仍为权威结果。未声明该能力的旧宿主不保证中间快照。轮询只能观察最新快照，因此可能错过短任务和部分迭代。

CP 专用 `ConstraintProgrammingSolveOptions` 增加 nodeLimit、solutionLimit、solutionHint、requestConflict。上限接受 u32，零按 core 语义立即返回 NODE_LIMIT/SOLUTION_LIMIT，不进行搜索；此时完整可行 hint 可以作为 incumbent 返回，但不代表后端实际求解。提示使用快照稳定 ID 到 bigint 的 ReadonlyMap；Rust 生成的 DTO 以 canonical i64 十进制文本传值（最多 100000 项），拒绝重复 ID 和非法编码。core 验证 ID/域及完整 hint 的源可行性；部分 hint 只初始化源变量，不填充辅助变量，也不保证后端采用。

例如在既有原生 CP 调用中传入 `{ nodeLimit: 10000, solutionHint: new Map([['x', 2n]]), requestConflict: true }`。显式配置需要宿主额外声明 `cpSolveOptions`；旧宿主在提交前被拒绝，不会静默丢弃参数。无配置的默认路径不发送 cpOptions 字段。

requestConflict 通过 Rust core 请求整个提交模型的证据，不是 IIS 或 assumption-aware 删除收缩，不保证不可约。证据仍经过 core 证明 gate 并保留已有权威证据，无有效证明则返回 UNAVAILABLE 诊断。通过 `report.infeasibilityEvidenceJson()` 读取原始证据、`diagnosticIssueCodes()` 读取问题码、`diagnosticExtension(key)` 读取字符串扩展，无需解析包含精确整数的整份报告。

Circuit、Automaton、Reservoir 虽能在 WASM 建模和源赋值验证，但原生降维当前不支持；Cumulative 降维按 core 默认关闭。HTTP/N-API 均不静默开启或忽略这些约束。Element、表、重化、变量时长/负 presence 区间具有真实 SCIP/Gurobi 验收。

报告保持原始 `SolveReport<i64>` 文本；导入时由 Rust 复验源指纹、canonical/稳定 ID 赋值、原 CP 可行性及精确目标，不代表独立证明最优性。精确值/目标/typed 界使用 `ConstraintProgrammingReport` 读取，不使用 f64 `summarizeReport`。报告独立持有数据，values 返回 BigInt64Array 副本，快照释放后仍有效。不可行、限时、取消沿用统一报告语义；轮询、进度、AbortSignal 和 release 复用现有任务生命周期。

## 原生 framework 串行编排

使用显式配置的 HTTP 或 Node 客户端，调用 Rust 已有 `SerialCombinatorialLinearSolver`。以下示例假设已初始化 WASM，并已创建 `client`：

```typescript
import { MetaModel } from 'ospf-wasm/core';
import { CombinatorialReport, SerialCombinatorialLinearSolver } from 'ospf-wasm/framework';
const model = new MetaModel('serial-example');
const x = model.addVariable('x', { type: 'binary' });
model.setLinearObjective([[x, 1]], 'maximize');
const artifact = model.toLinearTriadModel();
model.dispose();
const solver = new SerialCombinatorialLinearSolver(client, {
    backends: ['scip'], // 可显式配置 ['scip', 'gurobi']；两者都必须已编译
    fallbackPolicy: 'stopOnCertifiedTerminal',
});
const job = await solver.solveLinear(artifact);
const aggregate = CombinatorialReport.fromJson(job.reportJson!, artifact);
console.log(aggregate.summary(), aggregate.selectedAttemptId(), aggregate.selectionReason());
for (const id of aggregate.attemptIds()) console.log(aggregate.attemptJson(id));
await client.release(job.id);
aggregate.dispose();
```

配置类型由 Rust 生成，后端顺序非空、不重复并独立复制；宿主必须声明 serial-linear/serialLinear 能力。默认策略在首个 incumbent 或有可靠证明的数学终态停止；continueOnTerminal 在可靠不可行/无界后继续，但有 incumbent、取消、中断、超时仍停止。时间限制针对单次 backend solve，不是整条编排的端到端 deadline。进度是最近子求解器的原始快照，不代表整体百分比；任务仍遵循轮询、取消、release 和有界单活动执行。

此入口的 reportJson 是 CombinatorialSolveReport 文本，必须先用 CombinatorialReport 读取；summary/reportJson 返回最终统一报告/摘要。attemptJson 保留完整原始轨迹（错误和终态摘要，而非每次完整报告）、selectedAttemptId/selectionReason 保留选择依据，u64 时间元数据不经 JS number 重编码。Rust 校验 aggregate/attempt 契约、源模型指纹和解 shape，不独立证明可行性/最优性。报告独立持有数据，需单独 dispose。运行时/许可证错误保留为 attempt 诊断；全无可用结果时沿用 UNKNOWN/BACKEND_FAILURE 聚合报告。

## 原生 framework 并行编排

相同的显式客户端支持 Rust 实际并行线性求解器：

```typescript
import { ParallelCombinatorialLinearSolver } from 'ospf-wasm/framework';
const parallel = new ParallelCombinatorialLinearSolver(client, {
    backends: ['scip', 'gurobi'], // 两者均须已编译且具备运行时条件。
    mode: 'best',
});
const parallelJob = await parallel.solveLinear(artifact, { timeLimitMs: 15000 });
const parallelReport = CombinatorialReport.fromJson(parallelJob.reportJson!, artifact);
console.log(parallelReport.summary(), parallelReport.selectedAttemptId());
await client.release(parallelJob.id);
parallelReport.dispose();
```

宿主须声明 parallel-linear/parallelLinear。Rust 生成的 ParallelLinearOptions 接受显式、有序、非空且不重复的后端列表（最多两个）。省略 mode 使用 Rust 默认 best：等待全部 worker，按源模型目标方向选择，平局按配置顺序；无 incumbent 时保留首个有可靠证明的数学终态。first 接受首个可选报告，合作式取消其他 worker，**仍等待每个 worker 完成**，不保证立即返回或全局最优。取消 loser 不取消父任务。全部 attempt 保留，包括运行时/许可证失败和取消的 loser。

并发仅限单个原生活动任务内部，不允许多个任务同时执行。时间限制针对每个后端求解，不是端到端 deadline。子进度可能交错；仅 JobView.status 标记全部 worker 回收后的任务终态。HTTP/N-API 共用执行器、外部取消、release 与 CombinatorialReport 读取。串行/并行/CP 配置不能混用；WASM 和浏览器依赖图不加载原生 worker 或 Node 模块。

这些是原生串行/并行线性组合的真实入口，不是列生成、其余 Benders 或完整领域流程，也不支持将任意 TS 回调转换为 Rust trait。

## 原生固定连续追索 Benders

`FixedRecourseAlgorithm(client, configuration)` 通过 `fixed-recourse` / `fixedRecourse` 调用实际 Rust framework 算法，显式选择 `scip` 或 `gurobi`，只接受线性源模型。`FixedRecourseOptions`、阶段、停止原因和摘要类型由 Rust 生成。这是一条内置策略，不代表任意 Benders、列生成或领域 pipeline 注册已完成。

`stages` 使用源交换模型的列索引，不传进程内 token ID。非零成本的连续追索变量须显式声明：省略时沿用 Rust 默认规则，整数及非零目标变量留在 master。整数追索及不支持的划分明确失败。分区、证书及割均复用既有 Rust 实现；可在剩余预算内恢复缺失证书，不替换无效的已有证据，也不回退为完整 MILP。初始化有限主问题界可能需要有界追索盒；不支持的情况保留 `unsupported`。

`timeLimitMs` 是算法求解总预算，包含 master、subproblem 与证书恢复，每次后端接收剩余时间。codec/partition 初始化在计时前完成，不是可中断的端到端 deadline。进度仍是最近子求解器的原始快照，不代表整体百分比。HTTP/N-API 共用有界单活动任务和合作式取消。划分错误可能发生在创建任务之后；SDK 错误保留 `jobId`，便于释放失败任务。

`FixedRecourseReport.fromJson(job.reportJson, artifact)` 独立持有 Rust 数据。`summary()` 暴露实际 stop、源列顺序的完整 incumbent、源方向目标/最优界、轮数/割数、原生终态状态/原因及保留的后端错误；最大化时最优界为上界。迭代/时间/取消终态可保留 incumbent，不伪造成功。`masterReportJson()` / `subproblemReportJson()` 以精确文本保留最后真实子报告及其自身证明/身份，证书恢复终态另存于摘要。它们**不是**源模型统一 SolveReport，也不是独立源模型最优性证书。导入复验 schema、源指纹、完整赋值/域、目标、界一致性、计数及 core 子报告不变量，不重放割以证明 bound。任务 release 与报告 dispose 相互独立。

可移植 Rust 报告读取器显式使用 `u64` 元数据计数（统计、来源及迭代轨迹）；原生执行 API 保持默认 `usize`。超过 2^53、直至 u64::MAX 的整数继续以报告文本保留，不经过 JS JSON number；SDK 只解析生成的安全摘要。

```typescript
import { FixedRecourseAlgorithm, FixedRecourseReport } from 'ospf-wasm/framework';
const algorithm = new FixedRecourseAlgorithm(client, {
    backend: 'scip',
    stages: [{ variableIndex: 1, stage: 'continuousRecourse' }],
    iterationLimit: 128,
});
const bendersJob = await algorithm.solveLinear(artifact, { timeLimitMs: 15000 });
const bendersReport = FixedRecourseReport.fromJson(bendersJob.reportJson!, artifact);
console.log(bendersReport.summary());
await client.release(bendersJob.id);
bendersReport.dispose();
```

## 本地开发与验证

先在 Rust 仓库运行 `scripts/build-wasm-bindings.ps1`，需要 native 集成时再运行 `scripts/build-node-bindings.ps1 -Features scip-bundled,scip-quadratic`。两个脚本均使用 Cargo 配置的 target 目录保存构建产物与 tarball；当 target 位于其他盘符时，受上游 CLI 路径限制，Node 脚本会短暂地在 Rust 仓库 `target/npm` 下暂存生成的绑定文件，然后移入配置的 target。生成的绑定声明要求 TypeScript 5.2 及以上。开发时安装生成的 tarball，示例路径不是正式依赖：

```powershell
npm install --no-save --package-lock=false D:/workspace/ospf/ospf-rust/target/npm/ospf-wasm-bindings-0.1.0.tgz
npm test
npm run test:packages -- D:/workspace/ospf/ospf-rust/target/npm/ospf-wasm-bindings-0.1.0.tgz D:/workspace/ospf/ospf-rust/target/npm/ospf-node-bindings-0.1.0.tgz
npx playwright install chromium
npm run test:browser
npm run test:browser:bundle
```

HTTP 真实后端测试通过 `OSPF_E2E_URL` 和 `OSPF_TOKEN` 启用；未配置时会明确 skip。安装 native 包后，Node 集成测试要求真实 SCIP 编译能力，不使用 fake 冒充。Gurobi 需要单独安装运行时与许可证。

设置 `OSPF_E2E_PROGRESS=1` 可启用规模较大的真实 SCIP 验收：等待中间快照后请求取消。HTTP 用例还需配置 `OSPF_E2E_URL` 和 `OSPF_TOKEN`。

默认 Node 测试还通过真实 loopback TCP 和 fake HTTP 服务验证断链及取消竞争；这些失败路径契约测试不替代真实宿主或浏览器 HTTP 求解验收。

`test:browser:bundle` 另外对 Vite 生产产物运行浏览器及 Worker 测试，验证 WASM 资源路径和不含 Node 原生依赖的入口。设置 `OSPF_E2E_GUROBI=1` 可启用隔离消费测试中的 Gurobi HTTP/N-API 双通路验收，宿主和扩展均须编译匹配的 Gurobi feature。

`test:packages` 创建隔离的消费者安装目录，验证真正的 npm 包入口和 N-API，而不依赖 SDK 仓库自身的可选 peer 安装行为。ES2022 类型检查禁用继承的环境类型，避免上级 `@types/node` 掩盖声明问题。运行前必须把**与构建 ABI 匹配**的 SCIP runtime `bin` 加入 PATH；bundled 构建使用的 runtime 位于 Rust `target` 下 scip-sys 的 `scip_install/bin`，不能拿其他版本的同名 DLL 替代。

## 发布与兼容

SDK 精确依赖底层包 0.1.0，桥接协议主版本为 1；拒绝不支持的主版本。发布顺序：底层包 → SDK 集成验收 → 主包。当前构建不会自动发布 npm。Native 初期平台为 Windows x64，依赖的原生运行库需独立验收。

`dist`、node_modules、生成声明、WASM、原生二进制、tarball、截图及测试报告不提交 Git。

## 相关模块

- Rust 工作区：`ospf-rust`，完整覆盖矩阵见其 `docs/typescript-bridge_ch.md`。
- [许可证](LICENSE)

### 原生同源投影列生成

`ColumnGenerationAlgorithm(client, { backend, blocks })` 调用原生 `column-generation` / `columnGeneration` 策略，配置、块、停止原因和摘要由 Rust 生成。块显式映射不同的源交换列索引，未映射变量保留为全局变量。每块表示恰选一列的局部配置，**不是**任意装箱领域可无限重复选图案的主问题。空白/重复块、重复/未知变量和任意回调明确拒绝。上限为 256 块、100000 个映射变量、10000 轮 RMP/列；默认 128 轮、10000 列、容差 1e-7。

实际 Rust `ProjectedColumnGeneration` 全程复用 `ColumnProjection`：空池人工变量 Phase I（无大 M）、独立校验 RMP 最优 LP 证书和行映射、保留源边界/整数性/局部行的原生定价、每块每轮最多一列、整批加列、旧对偶失效与重建，最后求受限整数主问题并复核完整源赋值。跨块/全局行仅通过对偶进入局部目标。定价主问题去除凸性已隐含的列上界，避免冗余上界对偶造成重复负检验数；原有普通 master 默认不变。SCIP 显式使用 LP 子问题预设以保留可用对偶。

`timeLimitMs` 是包含 RMP、定价和 final 的总求解预算，各子求解接收剩余时间；源 codec/决策映射初始化在计时之前，编译过程不可抢占。省略时 Rust 默认 60 秒。进度为最近子求解器原始快照，不代表整体百分比。HTTP/N-API 共用取消、任务存储和释放，取得任务 ID 后的错误保留 `jobId`。无完整源 MILP 回退、隐式后端替换或 TS 回调到 trait 的转换。

`ColumnGenerationReport.fromJson(job.reportJson, artifact)` 复验 schema、源身份、计数、完整原域赋值/目标及 core 子报告契约。`summary()` 区分 Phase I 完成、Phase II 定价收敛、限制/停滞和实际子问题终态；不可行/无界保留在子报告，不伪造成源证明。`masterReportJson()` / `pricingReportJson()` / `finalReportJson()` 以无损文本保留最后真实报告及 u64 元数据，`pricingBlock` 标识最后定价块。final **仅使用已生成列**：定价收敛和受限整数最优都不证明源 MILP 全局最优，受限不可行也不证明源不可行；因此不暴露源 `bestBound` 或伪造源 SolveReport 证明。迭代/列数耗尽后若 Phase I 已完成，仍可求当前池的 final；超时/取消不启动新的 final，但已运行 final 返回的有效 incumbent 继续保留。报告 dispose 与任务 release 独立。

任意 context/pipeline 注册、动态删列策略、branch-and-price 和完整领域流程仍待后续接入，不由 SDK 隐式模拟。

```typescript
import { ColumnGenerationAlgorithm, ColumnGenerationReport } from 'ospf-wasm/framework';
const algorithm = new ColumnGenerationAlgorithm(client, {
    backend: 'scip',
    blocks: [{ id: 'a', variableIndices: [0] }, { id: 'b', variableIndices: [1] }],
});
const columnJob = await algorithm.solveLinear(artifact, { timeLimitMs: 15000 });
const columnReport = ColumnGenerationReport.fromJson(columnJob.reportJson!, artifact);
console.log(columnReport.summary());
await client.release(columnJob.id);
columnReport.dispose();
```

### 一维装箱

`ospf-wasm/bpp1d` 提供 `PackingContext`、`PatternGenerationResult`、`PackingResult`、`Bpp1dMilp`、`Bpp1dColumnGeneration` 与 `Bpp1dReport`。每个浏览器、Worker 或 Node realm 先初始化 WASM。所有单位归一、候选搜索、物理装箱/KPI 及 MetaModel/context/pipeline 装配复用现有 Rust 实现，SDK 不重写装箱或优化算法。

```typescript
import { initialize, HttpClient } from 'ospf-wasm';
import { PackingContext, Bpp1dMilp, Bpp1dReport } from 'ospf-wasm/bpp1d';

await initialize();
const context = new PackingContext({
    items: [{ id: 'part', length: { value: 40, unit: 'mm' },
        weight: { value: 100, unit: 'g' }, amount: 2n,
        materials: new Map([['steel', 3n]]) }],
    binTypes: [{ id: 'stock', length: { value: 10, unit: 'cm' },
        maxWeight: { value: 1, unit: 'kg' }, cost: 2, inventory: null }],
    spacing: { value: 1, unit: 'cm' },
    lengthUnit: 'cm', weightUnit: 'kg', objective: 'binCount',
});
const generated = context.generatePatterns({ maxPatterns: 1000, maxNodes: 10000 });
console.log(generated.complete(), generated.patterns());
const artifact = context.toArtifact(); // Rust canonical 文本及问题指纹 / Rust canonical text and problem fingerprint
context.dispose(); generated.dispose();

const client = new HttpClient({ baseUrl: 'http://127.0.0.1:8787', token: '<宿主凭据>' });
const job = await new Bpp1dMilp(client, { backend: 'scip' }).solve(artifact);
const report = Bpp1dReport.fromJson(job.reportJson!, artifact);
const packing = report.packing();
console.log(report.summary(), packing?.kpi(), packing?.materials());
await client.release(job.id); report.dispose(); packing?.dispose();
```

物品需求、每件物料、库存、模式件数、模式使用次数及结果数量使用 `bigint` / Map。Rust 生成的 wire 契约使用 canonical u64 十进制文本，拒绝负数、越界和 number。`verifyUsages` 不展开物理件数，能精确复验超过 2^53 直到 u64 上限的需求/库存；不因此承诺浮点原生求解器可求解所有大整数问题，原有精确转换门禁仍保留。长度/质量归一至指定单位；量纲及有限值由 Rust 运行时验证，不宣称 TS 拥有 Rust 编译期保证。通用 `Quantity` 新增 `kg`/`g` 与 `toDto()`。

`validatePattern`、`verifyUsages`、`pack`、`verifyPlans` 是真实纯计算领域操作，不是求解器。间距仅在相邻件之间，无尾间距；容量、质量、精确需求、库存、重叠、伪尺寸及物料整数溢出由 Rust 复验。`plans`/`freeIntervals` 为归一长度单位的生成 DTO 副本；KPI 包含箱数/件数、消耗长度、**仅尾余**长度、净长利用率及与目标口径无关的实际成本。目标可选 `binCount`、`consumedLength`、`cost`。context、候选、结果、报告独立拥有 Rust 数据，均须分别 `dispose()`，释放 parent 不使结果失效。

边界：最多 1000 物品种类、128 箱型、10000 候选、100000 搜索节点、100000 展开件数/箱数。默认候选预算 10000/100000，默认展开 100000。搜索截断明确返回 `complete: false`，不能视为穷尽。输入、artifact 和报告文本限制 8 MiB。原生定价轮数及每轮列数默认 32、最大 10000；容差为有限 [0, 0.5)，默认 1e-7。首批只开放宿主预注册默认规则。已绑定：严格 CSV 导入、renderer 适配器、原生尾箱优化。尚未绑定：BPP1D 离散装载、自行提供 policy/context/pipeline、任意 TS 回调。原生 BPP1D 执行支持 `tailWindow`，只重排最后 N 个箱；一旦排样被改动就收回全局最优性主张。`PackingContext.fromCsv(itemsText, binsText, options)` 可直接读入两张严格 CSV（表头必须闭合、空库存表示无限），产物与 JSON 构造等价。渲染已通过 `Bpp1dPackingContext.render(plans, unit)` 接入原域适配器：先在原域复核完整放置，再按展示单位输出 `Bpp1dRenderSchema`，这些数值不是精度或最优性证据。

原生执行必须具备 `bpp1d` 及 `bpp1dMilp` / `bpp1dColumnGeneration` 能力，并显式选择已编译后端。`modelKind: 'bpp1d'` 与 `bpp1dOptions` 只能配合 `solver: 'bpp1d'`，不能混入 CP/其他 framework 选项。HTTP 和 N-API 复用单活动任务、合作取消、进度和释放机制。`timeLimitMs` 覆盖有界生成/seeds、LP 与 final，各子求解使用剩余预算，默认 60 秒；codec 初始化及不可抢占的生成/编译使其不是严格的端到端硬截止。后端通用预取消报告可能缺少模型信息，只在无 incumbent、无 proof 的取消/中断报告上补实际提交子模型的缺失 mapping/指纹，不覆盖冲突身份、不新增证明。

`Bpp1dColumnGeneration` 是原 Rust BPP1D 的**有限池列激活**：seeds、有效 LP 对偶、列激活、完整当前 seeds/候选池 final 整数求解。它不是同源投影 `ColumnGenerationAlgorithm`、任意 DW 定价或 branch-and-price。定价轮数用尽仍可能执行完整池 final；候选完备性、有限池定价收敛、全局最优/不可行严格保留 Rust 的证明范围。截断候选不能宣称全局装箱结论；全局标记要求默认规则、完备候选及对应真实原生证据，不能仅靠可行物理方案或编译通过。

`Bpp1dReport.fromJson` 复验 schema 1.0、canonical 问题/指纹、core 报告契约、完整物理坐标、物料、KPI 及目标一致性；不独立重跑完备搜索以证明全局标记。`solverReportJson()` 保留实际候选模型的指纹/证明及原始 u64 文本，不改写成统一源装箱报告；JS 仅解析安全生成摘要/DTO。`packing()` 每次返回新独立结果，须与任务释放和报告销毁分开管理。协议仍为加性主版本 1，但旧宿主没有能力声明时在提交前明确拒绝。

### 共享二维几何

`ospf-wasm/geometry2d` 提供 `Geometry2d` f64 context 及 Rust 生成的自然 DTO 类型：`QuantityPoint2`、`QuantityVector2`、`PackingShape2`、`Box2Geometry`、`Placement2`、`Sheet2Shape`/`Sheet2Geometry`、`Shape2Candidate`。浏览器、Worker、Node 各 realm 独立初始化 WASM，所有计算调用 BPP2D/CSP2D 共用的原 Rust 几何内核，不在 TS 重写。

```typescript
import { initialize } from 'ospf-wasm';
import { Geometry2d, type PackingShape2, type Box2Geometry } from 'ospf-wasm/geometry2d';

await initialize();
const geometry = new Geometry2d('cm');
const shape: PackingShape2 = {
    kind: 'rectangle', width: { value: 2, unit: 'm' }, height: { value: 3000, unit: 'mm' },
};
const box: Box2Geometry = {
    shape, position: { x: { value: 0, unit: 'm' }, y: { value: 0, unit: 'm' } },
};
console.log(geometry.shapeMetrics(shape)); // area 约为 60000 cm^2 / area approximately 60000 cm^2
console.log(geometry.candidateShapes(shape));
const pairs = geometry.overlapPairs([box, box]); // Uint32Array [0, 1]
geometry.dispose();
console.log(pairs); // 独立副本 / independent copied data
```

点/向量加减、先 y 后 x 排序、旋转/候选、实际/包围面积、节距、刀缝膨胀、盒平移/重定位/边界以及点/盒/板材包含均委托原 Rust API。m/km/cm/mm 可混用，内部归一至 Meter；输出采用 context 单位及对应 `m^2`/`km^2`/`cm^2`/`mm^2` 面积单位。`Quantity` 同步支持这些平方单位及量纲安全的转换/加法。`countFitting(cell, container)` 给出一个方向能容纳多少单元，沿用原内核在非正单元或容器更小时返回 0 的语义。`rotated` 仅是放置元数据，shape 应已体现实际朝向，不隐式再次旋转。

**盒判定不是精确圆盘碰撞/包含**：圆使用外接正方形，包围盒贴边不重叠、闭区间边界视为在内；斜向分离的圆盘，其外接方形仍可能重叠。需要精确结论时用 `diskOverlaps`（圆心距对半径之和，相切不算相交，非圆返回 `null`）与 `centre()`。`inflatedByPlacement` 保留原左下角与元数据，不是中心不变；`inflatedByShape` 将矩形宽高或圆直径增加 spacing。绑定保留现有内核行为，不悄悄改变 BPP2D/CSP2D 几何口径。

输入要求有限且量纲兼容、尺寸为正、间距非负。非法/未知字段、数值溢出/下溢和坐标精度导致边界塌缩明确拒绝。文本限 8 MiB，非 null 的 itemId 限 1..1024 UTF-8 字节。保留 f64 严格比较与舍入影响，不暗加容差。`overlapPairs` 最多接受 512 盒，返回**全部**重叠索引对的交错 u32 值（i,j，i<j，按输入顺序），不截断。DTO/数组是独立副本，可跨 context 使用，仅 context 需要 dispose。其他量值工具及高精度特化仍未导出；BPP2D／CSP2D 已有下节的显式原生执行入口。

Rust 侧 BPP2D 已有共享 MetaModel 注册及显式报告驱动后端，新增 `solve_bpp2d_column_generation`：归一化短缺 Phase I 恢复、认证整板面积 LP 定价及同后端 final MILP。默认规则流程校验观察排布的源目录／旋转／刀缝，保留完整池及实际子模型／报告，共享总时间／进度／取消和迭代／池／报告预算。原生成器仍为启发式（`candidate_complete` 始终为 false），不把受限最优／不可行提升为全局结论；此循环暂不支持非零质量／承重及附加规则定价修正。源绑定执行 codec 和可移植 SDK 源／报告校验入口现已开放，见下一节；HTTP／N-API 共用原生执行器，有界压缩装箱／渲染也已委托原 Rust 服务；旧闭包流程不被当作真实原生求解执行。

### 共享 BPP 稀疏装载

`ospf-wasm/bpp` 提供 `DiscreteLoadingContext`、`DiscreteLoadingResult`、`DiscreteLoadingReport`，以及 Rust 生成的
`DiscreteLoadingProblem`／`DiscreteLoadingSolution` DTO 类型。原 Rust context 注册稀疏分配、真实件数／重量容量、
整体占位、非传递互斥边及显式布局。货物是独立身份，不是数量倍数；不补全笛卡尔积、不推导传递冲突、不在 TS 写
装载算法，也不做三维几何判断。

```typescript
import { initialize } from 'ospf-wasm';
import { HttpClient, SCIPSolver } from 'ospf-wasm/framework';
import { DiscreteLoadingContext } from 'ospf-wasm/bpp';
await initialize();
const loading = new DiscreteLoadingContext({
    items: [{ id: 'cargo', weight: { value: 1000, unit: 'g' }, required: true, fixedPositionId: 'hold' }],
    positions: [{ id: 'hold', maxCount: 18_446_744_073_709_551_615n,
        maxWeight: { value: 1, unit: 'kg' }, fixedOccupied: false, enabled: false }],
    allowedAssignments: [{ itemId: 'cargo', positionId: 'hold' }],
    conflicts: [], layoutGroups: [], weightUnit: 'kg',
});
const client = new HttpClient({ baseUrl: 'http://127.0.0.1:8080', token });
const job = await new SCIPSolver(client).solveLinear(loading.toLinearTriadModel());
try {
    const report = loading.readReport(job.reportJson!);
    const plan = report.solution();
    report.dispose();
    try { console.log(plan?.solution(), plan?.loadedCount(), plan?.loadedWeight()); }
    finally { plan?.dispose(); }
} finally { loading.dispose(); await client.release(job.id); }
```

Node 可显式换用 `ospf-wasm/native` 的 `NodeClient`，浏览器入口不会加载它。未指定业务成本时，`toLinearTriadModel()` 导出**零目标
可行性 MILP**，不是最大装载优化器，不能保证选中可选货物；普通 Rust application 另见下节。禁用舱位仍可保留合法固定货物；
装载货物及外部固定占用要求整体占位，但允许空预留。`maxCount` 接受 1..2^64-1 的 bigint，不舍入；Rust 按实际稀疏
邻接数收紧模型系数。重量通过原 quantities 转为显式 kg／g，负值、非有限值及换算溢出／下溢拒绝。复验沿用原模型
单位下的 1e-7 容差。

`toArtifact`／`fromArtifact` 保留 schema 1.0 canonical 源原文与摘要。源摘要进入实际注册名称，数学相同但货物身份
不同的源也不能互换原报告。模型交换保留 `[0,0]`／`[1,1]` 固定二元边界。`solutionValues(plan)` 返回独立完整
Float64Array；`verifySolution(plan)`／`extractSolution(values)` 同时复验原模型行、边界、整数性和领域规则。结果的
`solution`、`sourceFingerprint`、bigint `loadedCount`／`positionCounts` 及带单位 `loadedWeight`／`positionWeights`
均独立于 context 生命周期。`readReport`／独立 `DiscreteLoadingReport.fromJson(text, source)` 保留原报告及精确 u64
元数据，要求实际导出模型身份并复验 incumbent。没有 incumbent 返回 undefined，不虚构零方案。原生预取消身份仅在
认证提交边界补齐缺少的元数据，不覆盖已有身份或签发证明。

上限为 512 件货物、128 舱位、4096 分配、2048 冲突、64 布局组、合计 512 布局及 4096 布局舱位成员；源文本和
执行模型各限 8 MiB。重复／反向冲突、重复分配／成员、非法引用及未知字段明确拒绝。任意业务扩展、任意附加重量表达式、
branch-and-price 仍未绑定（BPP3D 单轮原生执行已通过 `Bpp3dOneRoundExecution` 开放）；分区生命周期／资源补全基础对象另已开放，不自动把 TS 回调序列化成 Rust trait。
`OSPF_BPP_LOADING_FIXTURE_DIR` 启用真实 SCIP/Gurobi 的 SDK／浏览器／Worker／隔离包 reader 验收。独立 HTTP 测试
须显式配置宿主，与 in-process 路由测试分开记录。

#### 普通装载 Application

构造函数可选第二参数采用 Rust 生成的 `LoadingObjective`：
`{ itemCosts: { cargo: -5 }, positionCosts: { hold: 1 }, layoutCosts: [] }`。
成本是有限、无量纲的最小化系数，负值表示奖励；占位成本也适用于空预留。布局成本使用
`{ groupId, layoutId, cost }`，未知身份及重复布局项拒绝。成本通过原 context 的事务性 `register_with`
注册，不在 TS 拼矩阵。canonical 源包含成本；省略成本保持原有源编码与零目标。

```typescript
import { DiscreteLoadingApplicationService } from 'ospf-wasm/bpp';
// 使用尚未释放的 loading context 和显式 HTTP 或 Node client。
const source = loading.toArtifact();
const applicationJob = await new DiscreteLoadingApplicationService(client, { backend: 'scip' }).solve(source);
try {
    const applicationReport = loading.readApplicationReport(applicationJob.reportJson!);
    const plan = applicationReport.solution();
    try { console.log(applicationReport.summary(), plan?.solution()); }
    finally { plan?.dispose(); applicationReport.dispose(); }
} finally { await client.release(applicationJob.id); }
```

执行端在共享 worker 中调用原 `DiscreteLoadingApplicationService`。协议主版本仍为 1，显式要求
`solver: 'bpp-loading'`、`modelKind: 'bppLoading'` 和独占的 `bppLoadingOptions: { backend }`。
客户端检查 `bppLoading`／`bppLoadingMilp` 及所选后端 LP／MIP 能力；工厂与求解共享原默认 60 秒或显式总预算，
复用进度、合作取消与释放，不自动回退后端或传输。有界输入复验／codec 并非可抢占的硬截止。

`toApplicationModel()` 导出实际 snapshot 编译模型，与 mechanism 路径 `toLinearTriadModel()` 的身份／行映射不同，
application 报告不会被重标记为后者。原默认约束改用显式稳定行 ID；默认 context 命名空间仍隔离独立注册。
`DiscreteLoadingApplicationReport.fromJson(text, source)`／`readApplicationReport` 复验实际模型、完整 incumbent、
最小化目标及原领域方案；`solverReportJson()` 保留精确计数器原文。工厂前取消／时限报告保留
`registrationPresent() === false`，不伪造实际模型身份、证明或零方案，与实际完整注册及后端报告明确区分。
报告和每份返回方案独立释放。branch-and-price 及任意领域扩展仍未绑定，普通 MILP 不代表这些能力已覆盖。

#### 连续附加重量

`new DiscreteLoadingContext(problem, objective?, resources?)` 第三参数接受 Rust 生成的 `LoadingResource[]`。
提供时限 1..128 个唯一资源，每个已知舱位至多一个：

```typescript
import { DiscreteLoadingContext, type LoadingResource } from 'ospf-wasm/bpp';
const resource: LoadingResource = {
    id: 'ballast', positionId: 'p',
    minimumWeight: { value: 0, unit: 'kg' }, maximumWeight: { value: 1000, unit: 'g' },
    minimumPerLoadedWeight: 0.5, costPerWeight: 2,
};
const loading = new DiscreteLoadingContext(problem, undefined, [resource]);
const source = loading.toArtifact(); // 保留含资源的源，供原生执行使用
const weights = new Map([['ballast', { value: 500, unit: 'g' as const }]]);
const values = loading.solutionValues(plan, weights);
const result = loading.verifySolution(plan, weights);
console.log(result.resources()); // weights、positionTotalWeights、totalWeight
result.dispose(); loading.dispose();
```

比例无量纲且非负，有限最小化 `costPerWeight` 按**模型**重量单位 `problem.weightUnit` 计价，不按边界单位；
从 kg 改为 g 不自动换算成本。允许负成本，但变量始终有有限边界。Rust 注册连续变量与装载比例约束，原 context
复用真实容量和整体占位联动。有资源的方案必须显式提供全部资源重量；缺失／未知资源、错误单位、边界／比例／容量违规
明确拒绝，不猜测零值或最优值。完整向量提取和两个报告 reader 同样复验连续量。资源定义及身份进入源指纹。
`loadedWeight`／`positionWeights` 仍仅计货物；`resources()` 返回模型单位的独立 DTO 副本及含资源总量。
无资源时源及结果编码保持不变。同一原普通 application 可通过显式 HTTP／Node 客户端执行资源模型。
资源建模本身不运行分解；共享 BPP Benders 见下节。任意 TS 回调仍不开放。

#### 共享 BPP Benders

```typescript
import { DiscreteLoadingBendersApplicationService, DiscreteLoadingBendersReport } from 'ospf-wasm/bpp';
const service = new DiscreteLoadingBendersApplicationService(client, {
    backend: 'scip', recourseResources: ['ballast'], iterationLimit: 128,
    recoverMissingCertificates: true, fallbackToMilp: false,
});
const job = await service.solve(source, { timeLimitMs: 10_000 });
try {
    const report = DiscreteLoadingBendersReport.fromJson(job.reportJson!, source);
    try {
        console.log(report.summary(), report.decompositionSummary(), report.fallbackUsed());
        const plan = report.solution();
        try { console.log(plan?.resources()); } finally { plan?.dispose(); }
    } finally { report.dispose(); }
} finally { await client.release(job.id); }
```

源必须声明所有追索资源，选择 1..128 个唯一资源身份；迭代限 1..10000，默认 128。SDK 要求
`bppLoadingBenders` 和显式原生后端的 LP／MIP 能力。HTTP 与 Node 共用原 Rust application、证书／割校验、
总预算、进度及合作取消；默认恢复缺失证书，不替换已有无效证据。全新等价源普通 MILP 回退必须**显式开启**，
收敛／取消／时限后不启动。非零成本资源也按显式配置进入真实连续追索，不是全二元模型换名 Benders。

也可通过 context 的 `readBendersReport` 读取。完整源／资源方案经过复验，即使回退创建全新会话，分解值仍按初始
snapshot 身份解释。合并源报告即使分解收敛仍为无证明的 `FEASIBLE`，无 incumbent 为 `UNKNOWN`，master
不可行不升级为完整源证明。实际完整源 fallback 可保留自己的证明；`decompositionReportJson()` 和
`fallbackReportJson()` 独立保留原子文本及精确 u64 元数据，`decompositionError()` 保留可恢复失败。
reader 检查 incumbent／bound 一致性，但不独立重放全部割、认证 bound 或外部 solver 来源。外层文本限
64 MiB + 4 KiB，application／固定追索／fallback 分别保持 16 MiB + 1 KiB／8 MiB／8 MiB。
报告和每份结果独立释放。branch-and-price 和任意领域回调仍未绑定。

### CSP2D 源、原生执行与报告

`ospf-wasm/csp2d` 提供 `CuttingContext` 与 Rust 生成的源／列契约。浏览器、Worker、Node 各 realm
显式初始化 WASM；目录、单位转换、MetaModel 注册及物理列校验均调用原 Rust，**不生成列，不执行求解**。

```typescript
import { initialize } from 'ospf-wasm';
import { CuttingContext, type CuttingProblem } from 'ospf-wasm/csp2d';

await initialize();
const m = (value: number) => ({ value, unit: 'm' as const });
const problem: CuttingProblem = {
  products: [{ id: 'part', name: 'Part', geometry: { width: m(1), height: m(1) }, allowRotate: false }],
  materials: [{ id: 'sheet', name: 'Sheet', shape: { kind: 'sheet', geometry: { width: m(4), height: m(2) } },
    availableBatches: 10n, process: 'freeform', maxSegmentHeight: null,
    products: [{ productId: 'part', count: 4n }] }],
  demands: [{ kind: 'count', productId: 'part', count: 3n, upperBound: null }],
  initialColumns: [], kerf: m(0),
  objective: { areaWeight: 1, wasteWeight: 0, heightWeight: 0, usageWeight: 0 },
};
const context = new CuttingContext(problem);
const restored = CuttingContext.fromArtifact(context.toArtifact());
context.dispose();
restored.validateColumns([]); // 仅校验列，不代表满足需求
restored.dispose();
```

件数使用 0..2^53-1 的 bigint，超范围明确拒绝，不舍入。库存必须为正，每物料的正生成提示合计最多 4096；
提示不是模型需求或使用量上界。件数／带单位面积需求及各自硬上界保持独立。源封装采用 schema 1.0、canonical
原文和领域分离指纹；`toJson()` 保留原文，不经 JS 数值解析重编码。恢复的 context 独立释放，释放后调用报
`Disposed`；源指纹不认证外部来源。

资源限制：64 产品、16 物料、128 需求、256 初始列，校验池最多 512 列及总计 4096 放置，源／列文本限 8 MiB。
源封装外层允许 16 MiB + 1 KiB 以容纳 JSON 再转义，内部源文本仍限 8 MiB。
断头台切树为平坦后序 `nodes`，末项为根；每刀引用两个不同的先前节点，各只能使用一次，禁止循环、共享与游离节点。
每树限 4096 节点、深度 128，整池限 65536 节点。成品叶子必须与实际放置、源旋转及刀缝／工艺一致；缺少匹配
成品叶子的旧 shelf 树明确拒绝，不自动修复。归一化使用米／平方米，保持原 f64 严格物理判定。

每次图案使用消耗一个物料批次，卷材亦如此；卷长约束单段，不是多段共享卷长预算。消费面积按原 region，可能为
部分板材。源／列校验不证明生产量满足需求或全局最优。`Csp2dColumnGeneration` 通过显式选择的 HTTP 或 Node
客户端执行原 Rust 原生流程，**不在浏览器 WASM 内求解**。不支持隐式传输回退或任意 JS 定价回调。

```typescript
import { Csp2dColumnGeneration, Csp2dReport } from 'ospf-wasm/csp2d';
import { HttpClient } from 'ospf-wasm/framework';
const client = new HttpClient({ baseUrl: 'http://127.0.0.1:8080', token });
// Node 替代路径：显式创建 'ospf-wasm/native' 的 NodeClient。
const job = await new Csp2dColumnGeneration(client, {
    backend: 'scip', generators: ['shelf'], finalIntegerEnabled: true, reportLimit: 196,
}).solve(sourceArtifact, { timeLimitMs: 60_000, onProgress: text => console.log(text) });
try {
    const report = Csp2dReport.fromJson(job.reportJson!, sourceArtifact);
    try { console.log(report.summary()); } finally { report.dispose(); }
} finally { await client.release(job.id); }
```

门面快照配置，提交前要求 `csp2d`／`csp2dColumnGeneration` 和所选后端的 LP/MIP 能力。HTTP／N-API 共用有界
原生执行器，轮询、进度、取消与任务释放遵循 framework 共同契约。子报告保留无损文本，包括不可行／超时／取消，
不生成成功替代结果。

`CuttingContext.readExecutionReport(reportText)` 与 `Csp2dReport.fromJson(reportText, sourceArtifact)` 已通过
WASM 复验完整原生执行：实际子模型／报告身份、源数学、件数／面积硬上界及库存、LP／不可行证书、按原单位短缺
判断的 Phase I 恢复、已接纳列实算检验数。reader 不执行原生生成器，不认证外部求解器来源，受限池最优／不可行
不提升为源问题结论，`candidateComplete` 始终 false。

```typescript
import { Csp2dReport } from 'ospf-wasm/csp2d';
// 无损源与报告来自 Rust 原生流程，不是 TS 求解占位函数。
const report = Csp2dReport.fromJson(reportText, sourceArtifact);
console.log(report.summary(), report.stages(), report.iterations(), report.columns());
const production = report.production();
report.dispose();
console.log(production?.producedCounts(), production?.materialBatches(), production?.consumedArea());
production?.dispose();
```

`toJson()`／`stageReportJson(index)` 原样保留精确元数据文本，`stageJson(index)` 保留实际模型封装与原子报告；
无符号索引超过末尾返回 undefined，负数、小数及溢出索引明确拒绝。`ProductionResult` 仅来自复验后的 final 整数
incumbent，独立于 context／report 生命周期。`usages`、`producedCounts`、`materialBatches` 返回 bigint，Rust 使用
checked u128 汇总并精确重查需求／库存，允许总产出超过 2^53 而不舍入。`producedAreas`、`consumedArea`、`wasteArea`、
`coilHeights` 保留 m^2／m 单位；净余料含刀缝带，卷段高不是共享卷长预算。`objectiveValue` 为复验后的 final 目标。
没有 final incumbent 时返回 undefined，不伪造零产出。

报告限 8 MiB；Rust 生成配置将批次／候选／列池／报告限制为 64／512／512／1024，默认 8／128／512／196，目前只
预注册原 shelf 策略。显式设置 `OSPF_CSP2D_FIXTURE_DIR` 可启用真实 SCIP/Gurobi 的 SDK／Worker／隔离包 reader 验收，
证据留在忽略目录，不成为包或构建依赖。严格旧断头台树限制不变。
真实 SCIP/Gurobi 已通过共享执行器、认证 in-process HTTP 路由及隔离 N-API 包验收。独立浏览器 HTTP 测试须显式
配置 `OSPF_E2E_URL`／`OSPF_TOKEN`，无宿主时跳过，不用 fake 或路由测试替代其验收。

### BPP3D 可移植源

`ospf-wasm/bpp3d` 目前校验长方体与轴感知圆柱源及显式物理方案，不提交求解任务。浏览器、Worker、Node 各 realm 需分别初始化 WASM；DTO 来自 Rust 生成的契约，TS 不实现装箱算法。

```typescript
import { initialize } from 'ospf-wasm';
import { PackingContext } from 'ospf-wasm/bpp3d';

await initialize();
const m = (value: number) => ({ value, unit: 'm' as const });
const source = new PackingContext({
  items: [{ id: 'a', name: 'A', width: m(1), height: m(1), depth: m(1),
    weight: { value: 500, unit: 'g' }, amount: 2n, orientations: ['upright'] }],
  bins: [{ id: 'bin', typeCode: 'box', width: m(2), height: m(1), depth: m(1),
    capacity: { value: 1, unit: 'kg' }, isMain: true }],
  initialLayers: [{ id: 'layer', binId: 'bin', depth: m(1), placements: [
    { itemId: 'a', position: { x: m(0), y: m(0), z: m(0) }, orientation: 'upright' },
    { itemId: 'a', position: { x: m(1), y: m(0), z: m(0) }, orientation: 'upright' },
  ] }],
});
const artifact = source.toArtifact(); // 无损文本和源指纹
const restored = PackingContext.fromArtifact(artifact);
console.log(restored.problem().items[0].amount); // 2n
const packing = restored.packLayers([{ binId: 'bin', layerId: 'layer' }]);
console.log(packing.bins[0].placements); // 已校验的米制绝对坐标
source.dispose(); restored.dispose();
```

Rust 对每个初始层执行原领域严格几何回放，并检查单层重量、允许朝向、坐标、边界及重叠；源校验本身不证明完整需求满足或认证来源。`packLayers` 对显式源层／箱分配检查多箱多层、叠加深度、几何、总载重及精确分组需求；按源箱和源层顺序输出，同一层可复用于不同箱，同箱重复分配会被拒绝。它返回绑定源指纹的独立绝对坐标副本，不生成列、不调用求解器，也不证明最优。方案最多 4096 个分配及展开物品，文本限 8 MiB。源最多 64 个物品、64 个独立候选箱、256 层，每层 256 放置、总计 4096 放置；正需求总量不超过 100000，源文本限 8 MiB。相同箱型编码的归一化尺寸、容量和主箱标记必须一致。所有放置须有单件坐标；圆柱以“对齐轴 + 半径”声明，轴向长度取自对应尺寸，并由原几何守卫按真实圆形足迹（而非外接方框）判定；自定义策略及其他未绑定规则明确拒绝。长度归一为米，质量先检查量纲并归一为千克；原领域将千克数值放在 `Meter` 参数化字段中，内部并无编译期质量单位保证。`problem()` 返回独立副本，每个 context 都须释放。`readExecutionReport` 在 WASM 内复验完整单轮报告，`ExecutionReport`／`PackingResult` 提供独立拥有的结果；`Bpp3dOneRoundExecution` 通过显式 HTTP 或 Node 客户端执行同一原生流程，**不在浏览器 WASM 内求解**。

```typescript
import { HttpClient } from 'ospf-wasm/framework';
import { Bpp3dOneRoundExecution, ExecutionReport } from 'ospf-wasm/bpp3d';

const client = new HttpClient({ baseUrl: url, token });
const job = await new Bpp3dOneRoundExecution(client, { backend: 'scip', generators: ['block', 'blLocal'], maxPlacements: 4096 })
  .solve(artifact, { timeLimitMs: 30_000 });
const report = ExecutionReport.fromJson(job.reportJson!, artifact);
const summary = report.summary(); // completed／failure／candidateComplete=false
const packed = report.packing();   // 仅在严格分组物理回放成功后存在
report.stageReportJson(0);         // 原始子报告文本，未接受报告时不存在
report.dispose(); packed?.dispose();
```

报告保留实际初始 RMP、刷新 RMP、final 子模型与原报告以及两份列池；解码器重建每个子阶段，要求初始前缀处于迭代 0、刷新池处于迭代 1、final 池逐字相同，每次最优 LP 声明都要精确对偶证书，严格分组物理回放成功后才交出装箱。真实失败（final 无 incumbent、final 认证不可行、analysis 失败、报告或展开预算耗尽、取消）都保留证据与原失败文本，由 `completed`／`failure` 表达。报告限三阶段、展开 100000 个放置、8 MiB。`generators` 可选 1..7 个不重复的已注册策略（`block`、`blLocal`、`blGlobal`、`circlePacking`、`pattern`、`pile`、`historical`），缺省为去除历史层重放的原标准链（其重复且无物理 trace 的列会被严格 final 拒绝）。生成器来源从不重放，因此 `candidateComplete` 恒为 false。

### Gantt 活动调度

`ospf-wasm/gantt` 提供 `ActivityContext`（源校验、候选展开、方案复验、执行报告 reader）与 `GanttActivitySolver`（经显式 HTTP 或 Node 客户端执行原生单 MILP，**不在浏览器 WASM 内求解**）。

```typescript
import { initialize } from 'ospf-wasm';
import { HttpClient } from 'ospf-wasm/framework';
import { ActivityContext, ExecutionReport, GanttActivitySolver } from 'ospf-wasm/gantt';

await initialize();
const context = new ActivityContext({ horizon: { start: '2026-01-01T00:00:00Z', end: '2026-01-02T00:00:00Z' }, costUnit: 'kg',
  resources: [{ id: 'machine', capacity: { value: 1, unit: 'kg' }, unavailableTimes: [], capacities: [] }],
  activities: [{ id: 'job', modes: [{ id: 'run', durationSeconds: 3600, starts: ['2026-01-01T01:00:00Z'],
    resources: [{ resource: 'machine', quantity: { value: 1, unit: 'kg' }, fromSeconds: 0 }], cost: { value: 2, unit: 'kg' } }] }],
  dependencies: [] });
const artifact = context.toArtifact();
context.replay({ selections: [{ task: 'job', mode: 'run', start: '2026-01-01T01:00:00Z' }] }); // 原域规则复验
const job = await new GanttActivitySolver(new HttpClient({ baseUrl: url, token }), { backend: 'scip' }).solve(artifact);
const report = ExecutionReport.fromJson(job.reportJson!, artifact);
report.summary();  // problemStatus／terminationReason／objectiveValue／solverModelOnly／failure
report.schedule(); // 仅当 incumbent 通过原域复验时存在
```

时间使用 RFC 3339 文本，单位只接受固定词汇（m/km/cm/mm/s/min/h/kg/g/面积），不加载任意策略回调。报告只有通过 `ActivityPreparation::validate` 独立复验的 incumbent 才携带分配；基线、执行事实、附加业务行、物料流与求解器证明均不在该范围内。

### BPP2D 源、原生执行与报告

`ospf-wasm/bpp2d` 提供 `PackingContext`、`Bpp2dReport` 和独立拥有的 `ProductionResult`／`PackingResult`。源／排布校验、完整执行报告 reader 与有界装箱通过 WASM 运行；`Bpp2dColumnGeneration` 通过显式 HTTP 或 Node 客户端执行原流程，**不在浏览器 WASM 内求解**。浏览器／Worker／Node 各 realm 显式初始化 WASM，类型来自 Rust 包，不在 TS 实现装箱或定价算法。

```typescript
import { initialize } from 'ospf-wasm';
import { PackingContext } from 'ospf-wasm/bpp2d';
await initialize();
// sourceArtifact/reportText 是 Rust 生成的无损源与执行封装。
const context = PackingContext.fromArtifact(sourceArtifact);
const report = context.readExecutionReport(reportText);
const summary = report.summary(); // candidateComplete 始终为 false
const rawChild = report.stageReportJson(0); // 精确 u64 元数据保留文本
const production = report.production(); // 没有 final 整数 incumbent 则为 undefined
context.dispose(); report.dispose();
console.log(summary.stop, rawChild, production?.producedCounts()); // bigint 件数
production?.dispose();
```

构造输入包含源物品／板材／需求／初始列、带长度单位刀缝及显式默认规则目标。件数需求及上界使用 0..2^53-1 的 bigint，生成件数另限 4096；面积需求带平方单位。Rust 归一为米／平方米，校验源引用、形状、旋转、刀缝、包围尺寸、需求上下界及目标系数。源最多 64 物品、16 板材、128 需求、256 初始列，完整池最多 512 列、总计 4096 放置；开放生成输入另保守限制板材／单件包围面积比不超过 4096，文本限 8 MiB。非零质量／承重、自定义规则定价修正及任意 TS 回调仍不支持。圆保留原外接方形几何语义，不是精确圆盘碰撞。

reader 检查 canonical 源身份、初始前缀（含重复位置）、生成列唯一性、实际子模型／原报告、认证 LP 对偶／不可行证明及 Phase I→RMP→定价→final 生命周期，在 Rust 中重算接纳列检验数。受限最优／不可行不提升为全局结论，数学一致性不是来源认证。生产量只从复验后的 final 整数 incumbent 派生，允许保留 final 取消／限时报告中的可行解；件数／板数用 checked u128 汇总后在 TS 转 bigint，面积仍为有限 number 物理量。context、报告及每份生产副本分别 dispose，返回 DTO／Map 均为独立副本。原子报告数值不能经 JS JSON 解析后再编码。也可通过 `Bpp2dReport.fromJson(text, source)` 独立读取。可选 `OSPF_BPP2D_FIXTURE_DIR` 向 Node／浏览器／Worker／隔离包验收提供 ignored 的真实 SCIP/Gurobi 证据，不是正式发布依赖。

#### 显式 BPP2D 原生执行

`Bpp2dColumnGeneration(client, { backend })` 使用 `solver: bpp2d`、`modelKind: bpp2d` 及独占 `bpp2dOptions`，客户端要求宿主具备 `bpp2d`／`bpp2dColumnGeneration` 和选定原生线性／MIP 后端能力。宿主调用显式传 `HttpClient`，本地调用按需安装可选原生包并传 `ospf-wasm/native` 的 `NodeClient`；不自动回退 HTTP，不把任意 JS 回调转为 Rust 策略，浏览器依赖图不加载 Node 内置模块或原生扩展。

```typescript
import { HttpClient } from 'ospf-wasm';
import { Bpp2dColumnGeneration, Bpp2dReport } from 'ospf-wasm/bpp2d';
const client = new HttpClient({ baseUrl: hostUrl, token });
const job = await new Bpp2dColumnGeneration(client, {
  backend: 'scip', iterationLimit: 8, poolLimit: 128,
  generators: ['blockLocal', 'pattern'],
}).solve(sourceArtifact, { timeLimitMs: 10_000, signal, onProgress: console.log });
try {
  if (job.reportJson === null) throw new Error('缺少原生报告');
  const report = Bpp2dReport.fromJson(job.reportJson, sourceArtifact);
  try { console.log(report.summary(), report.stages()); }
  finally { report.dispose(); }
} finally { await client.release(job.id); }
```

默认 8 个定价批次、每批观察 128 候选、池 512、196 子报告、启用 final MILP、检验数容差 1e-6，范围依次为 0..64、1..512、1..512、1..1024 及容差 [0,0.5)。可选生成链由 1..8 个不同预注册种类组成并保留顺序，省略使用原完整默认链。报告／时间／取消预算耗尽不强制启动 final，禁用 final 不将 LP 解变成物理产出。final 取消／限时报告中的 incumbent 通过原模型及源校验后仍保留；已完成子报告赢得迟到取消竞争时，不改写身份或终止原因。进度是原子求解进度，不是总体百分比。取得任务 ID 后的传输／回调失败保留任务 ID 以便恢复，终态任务与报告／生产对象分别释放。Rust 进程内认证路由测试覆盖 HTTP 执行；独立 SDK HTTP／浏览器宿主测试需要显式配置宿主，缺省跳过而不计为通过。

#### 压缩装箱与类型化渲染

`context.packLayers(layers)` 将每个输入层装箱一次，不声称满足源需求。`report.packing()` 只从复验后的 final 整数 incumbent 派生，否则返回 `undefined`。两者通过 WASM 调用原 Rust `Packer`、`FreeSpaceAnalyzer` 和 `PackingRendererAdapter`，不在 TS 实现算法或运行原生求解器。

```typescript
const packed = report.packing();
try {
    console.log(packed?.sheetCount(), packed?.itemCount(), packed?.materialCounts());
    for (const pattern of packed?.patterns() ?? []) {
        console.log(pattern.usage.columnIndex, pattern.usage.count);
        console.log(pattern.render.placements, pattern.remnants);
    }
} finally { packed?.dispose(); }
```

每个 `PackingResult` 独立释放，可在 context／报告／生产副本销毁后继续读取；DTO／Map 是副本。排布保留完整池索引及精确 bigint 份数，不展开海量板材；总量由 checked u128 累计后转 bigint，可超过 2^53。默认成品物料键沿用物品 ID，不代表原料／供应商／质量模型已接通。渲染放置保留输入位置和实际朝向，附带米制长度、从零起稳定装载顺序，面积为平方米；这里输出类型化数据，不提供 SVG／Canvas UI。

装箱另限每个选中排布 128 放置、保守余料工作量 `sum((2*n+1)*(n+1)) <= 65536`、输出 8 MiB。超限抛出 `PayloadTooLarge`，不截断、不使已有生产或报告数据失效；报告池仍限 512 列／4096 放置。圆形实际占用为圆面积，几何／余料使用外接方形；余料保留原分析器 1e-9 切片容差，未扣除刀缝损耗。因此余料面积不一定等于整板减实际占用，不是可回收库存保证或切割工艺证明。非默认规则、尾板优化及离散装载仍未绑定。

### 一维分切可移植子集

`ospf-wasm/csp1d` 提供 `CuttingContext`、`PatternGenerationResult`、`ProductionResult`，支持浏览器、模块 Worker 和 Node ESM，每个 realm 独立初始化 WASM。类型来自 Rust 生成契约；单位、原 Simple/N-Same 生成器、需求贡献和 context/MetaModel 校验均在 Rust 执行，不在 TS 重写算法。

```typescript
import { initialize } from 'ospf-wasm';
import { CuttingContext } from 'ospf-wasm/csp1d';

await initialize();
const cutting = new CuttingContext({
    products: [{ id: 'p', name: '产品', width: [{ value: 30, unit: 'mm' }] }],
    materials: [{ id: 'm', name: '物料', widthRange: {
        lowerBound: { value: 0, unit: 'cm' }, upperBound: { value: 10, unit: 'cm' },
    }, machineId: null, availableBatches: 3n }],
    machines: [], demands: [{ productId: 'p', mode: 'roll', count: 5n }], lengthUnit: 'cm',
});
const candidates = cutting.generatePatterns({ generator: 'nSame', maxPlans: 128, maxKnives: 16 });
const production = cutting.verifyUsages([{ plan: {
    id: 'plan', materialId: 'm', slices: [{ productId: 'p', width: { value: 0.03, unit: 'm' }, amount: 3n }],
}, count: 2n }]);
const artifact = cutting.toArtifact();
const restored = CuttingContext.fromArtifact(artifact);
cutting.dispose(); restored.dispose();
console.log(production.produced().get('p'), production.trimWidth());
console.log(candidates.truncated(), candidates.candidateComplete());
production.dispose(); candidates.dispose();
```

当前开放 Roll/Sheet 离散需求、静态产品幅宽和默认物料/设备幅宽/批次数规则。长度通过 Rust 运行时量纲检查归一到 `lengthUnit`。输入计数为 bigint/canonical 十进制文本，但受现有 f64 领域限制为 [0, 2^53-1]；需求、切片份数、使用次数必须为正。更大输入明确拒绝、不舍入。checked-u64 合计产量/批次数可超过 2^53，并保持 bigint/Map；宽度仍为 f64。`verifyUsages` 不逐件展开，完整复验源需求、库存和设备批次数；它不是求解器或最优性证书。`validatePlan` 仅验证单方案，不证明完整需求已满足。

候选默认原 N-Same（保留各份数），也可显式选 `simple`。两者都是受限生成器：即使 `truncated()` 为 false，**candidateComplete() 始终为 false**。原统计计数以 bigint 返回。方案数默认/最大 128/512，刀数默认/最大 16/64，Simple 固定单刀。最多 64 产品/需求、16 物料/设备、每产品 8 幅宽、512 用量、每方案 64 组切片/刀、8 MiB 文本。源 ID 为 1..128 ASCII 字母/数字/下划线/点/短横线，方案 ID 同字符集最多 512 字节。重复方案/内容/切片和外部引用明确拒绝、不合并。artifact 使用 Rust canonical schema 1.0 文本及源问题指纹，导入时再次校验。

context、候选、生产结果各自拥有独立 Rust 内存，分别 dispose；返回方案、用量和 Map 均为独立副本。二次组合编排可经 `modelKind: quadraticOrchestration` 使用（多后端串行/并行 + 显式选结果策略，每个后端一个 attempt）。带时间窗车辆路径可经 `modelKind: vrp` 使用（分支定价求解，`VrpReport` 按停靠点顺序交付路线，含每站时刻与累计负载）。韧性规划可经 `modelKind: networkResilience` 使用（显式故障场景 + 连通要求，`NetworkResilienceReport` 把实际最坏费用与求解上包络分开）。运输分配可经 `modelKind: networkAllocation` 使用（共享配额 + 枢纽建设，`AllocationReport` 按请求-服务对给出运输量）。网络结构可经 `modelKind: networkStructure` 使用（根树 + 设施归属，不注册商品流）。网络建设可经 `modelKind: networkDesign` 使用，`NetworkDesignReport` 把建设费与运行费分开交付。广义流可经 `modelKind: networkGeneralizedFlow` 使用，`GeneralizedFlowReport` 把弧结果（投入/产出/产率损耗/费用）与节点残差分开保留。原 `network-scheduling` 的多商品最小费用流可经 `modelKind: networkFlow` 使用，`NetworkFlowReport` 保留领域解（流量、弃供、缺货与四项费用分项）不折叠。多后端扫描复用 framework `ExperimentRunner`（`modelKind: linearSweep`，`LinearSweepReport` 按 case ID 稳定排序、每 case 恰好一个结论）。`CertifiedPricingDuals.verify(artifact, reportJson)` 会对照真实模型复核最优 LP 证书，并按稳定约束身份返回对偶；缺失对偶绝不补 0。固定整数 LP 敏感性可经原生 `modelKind: linearSensitivity` 使用（需给出可行 incumbent），并配 `LocalConstraintSensitivityReport` reader，文本由原 core `validate` 复核。LP 解池可经原生 `modelKind: linearSolutionPool` 使用（SCIP 与 Gurobi 后端），并配只读 `LinearSolutionPoolReport` reader（只校验自洽性，不认证最优性）。只读的 `LinearIisReport` 在 Rust/WASM 内校验原生 IIS 报告文本（只做自洽性校验，不计算 IIS——那需要 Gurobi 后端）。配规（Costar）可声明并无损编解码、也可在显式方案中引用，但原 `CostarFiller` 在领域内无调用方，默认生成器不产出配规切片。原生 CSP1D 执行和完整流程报告已开放，见下一节。`weight` 重量口径需求按声明的产品长度与单位重量换算；动态长度、yield/waste/length/capacity/switch 规则和任意 TS 回调尚未绑定，不隐式回退原生求解、不伪造全局证明。

`context.readProductionReport(text)` 读取 Rust `encode_csp1d_production_report` 输出的源绑定整数阶段封装。它复验完整候选池（含零使用列）、源 context、实际子模型的数学/类型/边界/目标，以及未改写的原始报告身份。生产量从真实报告向量导出，不接受载荷附带的独立产出声明。`ProductionReport` 独立拥有数据，`summary()` 返回 Rust 生成的 `ProductionReportSummary`；`toJson()` 与 `solverReportJson()` 保持原始文本，每次 `production()` 返回独立可释放的 `ProductionResult`，无 incumbent 时返回 undefined。报告需单独 dispose；原始报告 u64 元数据不能经 JS number 解析再编码。`restrictedOptimal`/`restrictedInfeasible` 仅作用于当前池，`candidateComplete` 始终 false，数学一致性不是来源认证。此同步 WASM reader 不运行原生求解器，也不提供完整列生成 trace。

开发验收可显式指定 `OSPF_CSP1D_FIXTURE_DIR`：Rust 原生集成测试向该目录输出 ignored 的真实 SCIP/Gurobi 整数报告，SDK Node/浏览器/Worker/隔离包测试读取它们，不依赖相邻 checkout 或在 TS 重建报告字段。这些仅为测试证据，不是入库夹具或正式发布依赖。

### 原生一维分切执行

`Csp1dMilp` 与 `Csp1dColumnGeneration` 通过显式 HTTP 或 Node 客户端调用真实 Rust 领域 service。要求宿主声明对应领域能力，并显式选择已编译的线性/MIP 后端。WASM 只做建模/计算/报告读取，不执行 Gurobi 或 SCIP。

```typescript
import { NodeClient } from 'ospf-wasm/native';
import { Csp1dColumnGeneration, Csp1dReport } from 'ospf-wasm/csp1d';

const client = await NodeClient.create();
const solver = new Csp1dColumnGeneration(client, {
    backend: 'scip', generation: { maxPlans: 1 },
    poolLimit: 512, iterationLimit: 8, columnsPerIteration: 64,
});
const job = await solver.solve(artifact, { timeLimitMs: 10_000, pollIntervalMs: 10 });
try {
    const report = Csp1dReport.fromJson(job.reportJson!, artifact);
    try {
        console.log(report.summary(), report.traceJson());
        const result = report.production();
        try { console.log(result?.batchCount(), result?.produced()); }
        finally { result?.dispose(); }
    } finally { report.dispose(); }
} finally { await client.release(job.id); }
```

调用原生 HTTP 宿主时，显式改用 `new HttpClient({ baseUrl, token })`；Node 扩展按需安装，不静默回退 HTTP。`artifact` 是上一示例独立保存的源封装。取得任务 ID 后的错误保留 `jobId`，用于释放失败任务。取消使用 `AbortSignal`；进度回调接收最近子求解原始快照，不是整体百分比。

初始候选默认 128；定价复用选定 Simple/N-Same 策略/刀数，受 `poolLimit` 限制（默认/最大 512，不能小于初始 maxPlans）。迭代默认 8、最大 64；每轮接纳列默认 64、最大 512。原生总预算默认 60 秒，覆盖生成与子求解；有界生成/编译不能硬抢占，codec 初始化不是端到端硬截止。Phase I 将短缺变量接入原需求行，使用每条需求自身的 Roll/Sheet 单位，真实后端可从不可行初始池经受限定价恢复。旧 Rust 默认仍是启发式，SDK 门面不会回退到该实现。

`cutting.readExecutionReport(text)` 与 `Csp1dReport.fromJson(text, source)` 复验 schema 1.0、源身份、预算/池/trace 计数、阶段顺序及实际子报告；最终生产复用源绑定整数验证器。完整封装限 8 MiB；`summary()` 为生成的安全契约。`traceJson()`、`stageJson(i)`、`stageReportJson(i)` 保留原 canonical trace、实际编译子模型/阶段封装和含精确 u64 计数的原始子报告，不应经 JS number 解析再编码。阶段越界返回 undefined。每次 `integerReport()` / `production()` 返回新独立对象或 undefined，分别 dispose，与任务 release 和 context/report dispose 相互独立。

业务状态、执行停止与受限子问题证明分开保留。无初始候选、后端失败、受限不可行、取消、超时不伪造产出。`candidateComplete` 始终 false，定价成功与 final 池内最优/不可行不能证明无限制源 CSP 的全局最优/不可行。trace 遥测与数学一致性不是来源认证或独立重放的全局证书。

### Benders 后的完整源 MILP 收尾

显式设置 `sourceMilpFinishing: { reserveTimeMs: 3000 }`，在**同一个** `timeLimitMs` 总预算中预留完整源求解时间，
不是追加时限。预留量为正 u32 毫秒，严格小于总预算（省略总预算时为 60000 ms）。省略该配置保持原行为。
SDK 同时要求宿主声明 `bppLoadingSourceFinishing`，旧宿主在提交前明确拒绝，不静默降级。

```typescript
const solver = new DiscreteLoadingBendersApplicationService(client, {
    backend: 'scip', recourseResources: ['ballast'], iterationLimit: 1,
    sourceMilpFinishing: { reserveTimeMs: 3000 },
});
const job = await solver.solve(source, { timeLimitMs: 10000 });
try {
    const report = DiscreteLoadingBendersReport.fromJson(job.reportJson!, source);
    try {
        console.log(report.summary(), report.sourceFinishingInvoked());
        console.log(report.accelerationApplicationReportJson(), report.certificationReportJson());
        console.log(report.certificationError());
        const plan = report.solution();
        try { console.log(plan?.resources()); } finally { plan?.dispose(); }
    } finally { report.dispose(); }
} finally { await client.release(job.id); }
```

Rust 调用原 `DiscreteLoadingCertificationService`，独立重建等价完整源注册，仅复制已验证向量作为 warm start；
初始构造、加速、回退和中间 codec 工作消耗同一预算，收尾收到剩余时间。加速阶段在注册前耗尽自身预算时，
预留量仍可创建真实普通完整源求解，不伪造旧注册。构造／编译不可硬抢占，输出复验也不属于可抢占后端时限。
已验证完整源最优／终态证明优先原样保留，即使此时取消或预算耗尽，也不重复启动收尾。
旧取消／中断不启动新后端；收尾无解、非最优且更差或可恢复失败不丢弃已有方案。
保留旧方案时复用原 Rust 转换重建审计、gap 和 proof-free 边界，不搬用旧 trace、对偶或解池。

`summary()`、`solution()`、`applicationReportJson()`、`solverReportJson()` 返回最终选择结果；
`accelerationApplicationReportJson()` 保留收尾前的原 application 文本；`certificationReportJson()` 保存实际收尾 core 原报告，
即使其方案未被选择也保留。`certificationError()` 为实际可恢复错误；`sourceFinishingPresent()` 表示有收尾阶段记录，
`sourceFinishingInvoked()` 只在实际后端产生报告或错误时为 true，不能混同。旧报告的加速 getter 返回原 application。
加速报告的证明边界不变，源证明只能来自真实完整源回退／收尾报告。导入复验数学与选择一致性，**不认证外部 solver 来源**。

可选 `certification` 保留旧原子文本，协议主版本仍为 1；原子 core／收尾报告各限 8 MiB，application 各限 16 MiB + 1 KiB。
有收尾证据的外层响应限 128 MiB + 8 KiB；无收尾证据仍为 64 MiB + 4 KiB。HTTP 默认请求体 9 MiB 限制不变，
不把大旧报告重新上传。精确 u64 元数据保持文本，不经 JS number 解析再编码。
该入口不等于branch-and-price、自定义策略或 BPP3D 已绑定。

## 共享 BPP 分区生命周期基础对象

`ospf-wasm/bpp` 开放 `PartitionLoadingContext`、`PartitionLoadingMaster`、
`PartitionLoadingPricing` 和 `PartitionLoadingBatch`。`source.partition(options)` 独立拥有原领域注册，
释放源 context 不影响它。显式分区必须让所有源舱位恰归属一次；已声明资源自动跟随舱位归属，
`refinableResources` 是可省略的资源身份白名单，不接受裸 token 或回调。

`decisions()` 给出实际局部决策目录。`addColumns` 接受完整有限 `ReadonlyMap<string, number>`，
缺失决策不补零，整批验证通过后才修改列池。`columns()` 保留 bigint 货物／件数及源模型重量单位。
`removeColumns` 原子删除，列身份不复用。重建 master 或成功改变列池会使旧注册／定价 epoch 失效；
原子加列失败不改变旧注册。`acceptLpReport` 复用原完整最优 LP 证书、实际模型身份、mapping 和对偶门禁，
报告门禁失败会撤销旧价格；同一报告重验也不能复活旧请求。裸对偶数组不能代替完整报告。
批次拥有请求副本，`addPricedBatch` 在同一当前 epoch 原子提交所有分区候选。实际改变列池后旧 epoch 失效；空操作或全部去重而未改变列池时沿用原 Rust 的 epoch 保持语义。

master／pricing 的 `toModel()` 返回**不透明 compiled-linear 封装**，不是普通线性 codec：LP 松弛可能保留
原 token 类型，而实际求解类型变为连续变量。必须使用显式 `SCIPSolver.solveCompiledLinear`／
`GurobiSolver.solveCompiledLinear`，要求所选后端声明 `compiledLinear`；旧宿主明确拒绝，
不回退普通 linear、HTTP 或其他后端。Rust 原 compiled-model codec 保留实际类型及元数据。
`ModelArtifact.fingerprint`／`JobView.fingerprint` 是传输内容摘要；原 core 报告保留自身实际模型指纹，
二者有意不同，不可重标记为同一身份。原 master／pricing 行在注册时使用稳定身份而非进程内计数器，确保独立重建的实际子模型身份一致。`objectiveConstant()` 与后端 `c*x` 分开保存，不能塞进未修改的子报告。
pricing 的 `readReport` 验证完整实际局部模型（含原布局辅助变量），保留原报告文本及 u64 大计数，
返回局部决策及包含凸性价格常数的检验数。`reducedCost` 只是只读快照计算，不证明请求仍是当前 epoch。

```typescript
const partition = source.partition({
    partitions: [{ id: 'left', positionIds: ['a'] }, { id: 'right', positionIds: ['b'] }],
    refinableResources: ['ballast'],
});
// seedColumns 为已验证的完整分区 Map 向量。 / Validated complete per-partition Map vectors.
partition.addColumns(seedColumns);
const master = partition.master();
const job = await new SCIPSolver(client).solveCompiledLinear(master.toModel());
try {
    partition.acceptLpReport(master, job.reportJson!);
    const pricing = partition.pricing(master, 'left');
    try { console.log(pricing.toModel(), pricing.objectiveConstant()); }
    finally { pricing.dispose(); }
} finally { await client.release(job.id); master.dispose(); partition.dispose(); }
```

`master({ integer: true, refineResources: true })` 仅释放白名单连续资源，其他离散轮廓保持冻结。
`sourceValues`／`extractSolution` 必须使用完整 Float64Array，拒绝 LP／人工变量方案，并复验完整源模型与领域。
`materializeCompletedResources` 原子物化补全轮廓并使旧 master 失效，之后需重建整数 master。
返回物理方案、master／pricing 快照均独立释放；旧快照仍可读不表示可用于新会话。

限制：1..128 分区，池最多 4096 列／262144 决策项，每次直接加列最多 512 输入；
定价批次最多 128 分区／512 候选／262144 决策项。容量保守按已有加全部输入计算，重复列去重前也占预算。
文本 DTO／compiled 封装内部载荷限 8 MiB，池计数受限不保证 `columns()` 序列化必能放入该预算，超限 getter 明确失败。
源外层封装允许 16 MiB + 1 KiB；HTTP 请求体仍限 9 MiB。进度、取消、任务释放复用原生执行器。

这些基础对象本身不运行算法；原 `PartitionColumnGenerationApplicationService` 已由下述原生门面单独接入。
两个入口均不提供完整源 MILP 最优证明、branch-and-price 或 BPP3D。
一次定价及最优受限 final 不能证明完整源最优／不可行。真实 SCIP/Gurobi 验收这些基础对象；
WASM／浏览器／Worker／隔离 npm 包重建实际子模型与资源补全方案。独立 HTTP 未配置时记 skip，
不能冒充通过；认证的进程内 HTTP 验收单独执行。

## 原生根节点分区 Application

`ospf-wasm/bpp` 与 `framework` 导出 `PartitionColumnGenerationApplicationService`，
显式使用 HTTP 或 Node 客户端执行原 Rust service，不在 TS 运行迭代。请求为 `bpp-loading`／`bppLoading`
及独占 `bppLoadingOptions.partition`，与 Benders 互斥。SDK 要求 `bppLoadingPartitionColumnGeneration`
及所选原生 LP/MIP 后端能力；旧宿主明确拒绝，不回退普通 MILP、WASM、HTTP 或其他后端。

```typescript
import { PartitionColumnGenerationApplicationService, PartitionColumnGenerationReport } from 'ospf-wasm/bpp';
const service = new PartitionColumnGenerationApplicationService(client, {
    backend: 'scip',
    partition: { partitions: [{ id: 'left', positionIds: ['a'] }, { id: 'right', positionIds: ['b'] }],
        refinableResources: ['ballast'] },
    iterationLimit: 64, columnLimit: 512, completionColumnLimit: 128, reportLimit: 256,
    sourceMilpFinishing: { reserveTimeMs: 2000 },
});
const job = await service.solve(sourceArtifact, { timeLimitMs: 10_000 });
try {
    const report = PartitionColumnGenerationReport.fromJson(job.reportJson!, sourceArtifact);
    try {
        console.log(report.summary(), report.executionSummary(), report.refinementReportJson(), report.finalReportJson());
        const plan = report.solution();
        try { console.log(plan?.solution(), plan?.resources()); } finally { plan?.dispose(); }
    } finally { report.dispose(); }
} finally { await client.release(job.id); }
```

原流程按分区生成种子、执行 Phase I／根 LP／定价整轮原子提交、可选资源补全及轮廓物化，最后求无人工变量的
受限整数 final。SCIP 使用既有 LP 子问题预设以保留认证对偶；所有子求解接收剩余时间及同一取消句柄。
进度仍为最近子求解器快照，不代表整体百分比。worker 源注册、模型构造及子求解消耗同一总预算，
前置验证和后置编码／重放不是可硬中断的端到端截止。

`PartitionColumnGenerationReport` 使用预算观察与原子报告重放同一 Rust service，**不读取时钟或执行后端**。
逐次核对实际 compiled 子模型、完整 LP 证书、局部及完整源方案、目标、控制流顺序、单调剩余时限／取消观察和最终源选择。
`calls()` 保留有序实际模型、原报告文本及 u64 大计数；`executionSummary()` 派生根收敛、根／补全列数、
原轨迹及实际 refinement／final 调用索引。独立 getter 保留两个终态原报告，`accelerationError()` 保留已有源方案后的
真实可恢复错误。这是数学与控制流一致性验证，不认证外部 solver 来源。

根阶段派生源报告始终无 proof。`COMPLETED` 可能仅表示受限 final 完成，不能代替 `lpConverged`，也不能忽略根迭代预算。
根 LP 收敛、受限最优／不可行均不能提升为完整源 MILP 最优／不可行，更不是 branch-and-price。
原 service 在 final 错误或取消后可保留已验证资源补全方案；加速预算已终止时不新启根阶段后端。方案独立释放。
显式预留完整源收尾见下一节，任意 trait 回调仍未接入（BPP3D 单轮原生执行已通过 `Bpp3dOneRoundExecution` 开放）。

默认／范围：64 根轮数（1..64）、512 根列（分区数..4096）、128 补全新增列（0..128，有可补全资源时至少容纳每分区一列）、
256 子求解（1..1024）。子报告预算耗尽按原错误恢复语义处理：无已验证源方案时任务明确失败，不伪造成功报告；
最多额外记录一次预算保护错误调用。每份子模型／报告限 8 MiB，累计成功子文本限 32 MiB，预算观察最多 16384，
外层封装限 128 MiB + 8 KiB；HTTP 请求仍限 9 MiB。真实 SCIP/Gurobi、进程内认证 HTTP、隔离 npm／N-API、
浏览器与 module Worker 分开验收；独立 HTTP 未显式配置时记 skip，不算通过。

### 分区加速后的可选完整源收尾

在分区 application 配置 `sourceMilpFinishing: { reserveTimeMs: 2000 }` 显式启用。正预留量必须严格小于
`timeLimitMs`（默认总预算 60000 毫秒），从根阶段预算扣除，不追加到任务时限。SDK 另要求
`bppLoadingPartitionSourceFinishing` 能力。根 application 成功返回后，原生端复用
`DiscreteLoadingCertificationService`，通过全新等价完整源模型收尾，只将已验证完整数值向量作为 warm start。
根注册前超时可在预留预算内调用原普通源 service；先前取消／中断不新启收尾。若原根流程发生无法生成有效
application 结果的错误，任务仍明确失败；此选项不是任意加速错误的隐式重试或回退。

原根重放仍独立且无证明。`accelerationApplicationReportJson()` 保留其完整源报告原文；
`applicationReportJson()`／`solverReportJson()` 返回最终选定源结果。`certificationReportJson()` 与
`certificationError()` 保留真实完整源后端证据和精确 u64 元数据。`sourceFinishingPresent()` 表示已处理收尾阶段
（含前置停止），`sourceFinishingInvoked()` 则要求实际报告或可恢复后端错误。`calls()`、根轨迹、refinement／final
索引及 `accelerationError()` 始终只描述加速阶段。独立完整源调用不占根子调用次数／累计文本额度，单份报告仍限
8 MiB，并受同一外层封装及总时限约束。

可移植 reader 先重放根 service，再复用共享认证门禁，核对源身份、完整方案／目标、实际报告选择、保留较好旧方案
及审计／gap／证明重建。只有真实完整源报告能保留自己的源证明；无解／较差的未完成候选和可恢复收尾错误保留已验证
旧方案，矛盾的不可行／最优声明被拒绝。即使最终保留旧方案，真实认证原文也不丢弃。这验证数学与证据一致性，
不认证外部 solver 来源，也不等于完整 branch-and-price。

`SolveRequest.tuningOptions` 通过直接 `scip`／`gurobi` 入口的 `SolveOptions.tuning` 开放：`threads`（1..=64，SCIP 与 Gurobi 的共享上界）、`seed` 与 `mipGap`（0 ≤ gap < 1）。非零间隙可能以 `GapLimit` 终止，此时报告为 `Feasible` 且不携带最优性证明（已用真 SCIP 观测：400 变量随机多约束背包在 `mipGap: 0.99` 下以 `GAP_LIMIT` 结束、1 个节点、保留间隙、无证明；同源 `mipGap: 0` 完成并带证明）。领域与框架策略各自持有预算，携带调优即被拒绝。
