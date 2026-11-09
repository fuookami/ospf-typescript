import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const [wasmArgument, nativeArgument] = process.argv.slice(2);
if (!wasmArgument || !nativeArgument) throw new Error("usage: node scripts/test-packages.mjs <wasm.tgz> <native.tgz>");
const wasm = resolve(wasmArgument);
const native = resolve(nativeArgument);
const cache = join(root, ".cache");
mkdirSync(cache, { recursive: true });
const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error("run through npm run test:packages -- <wasm.tgz> <native.tgz>");
const run = (args, options = {}) => execFileSync(process.execPath, [npmCli, ...args], { cwd: root, stdio: "inherit", ...options });
run(["run", "build"]);
const output = run(["pack", "--ignore-scripts", "--json", "--pack-destination", ".cache"], { stdio: ["ignore", "pipe", "inherit"] });
const [packed] = JSON.parse(output.toString());
const consumer = mkdtempSync(join(cache, "consumer-"));
writeFileSync(join(consumer, "package.json"), JSON.stringify({ name: "ospf-consumer-test", private: true, type: "module" }));
run(["install", "--ignore-scripts", "--package-lock=false", "--no-audit", "--prefix", consumer, wasm, native, join(cache, packed.filename)]);
copyFileSync(join(root, "test/consumer.mjs"), join(consumer, "consumer.test.mjs"));
copyFileSync(join(root, "test/consumer.ts"), join(consumer, "consumer.ts"));
writeFileSync(join(consumer, "tsconfig.json"), JSON.stringify({
    compilerOptions: { noEmit: true, strict: true, target: "ES2022", module: "NodeNext", moduleResolution: "NodeNext", lib: ["ES2022", "DOM"], types: [] },
    files: ["consumer.ts"],
}));
for (const compiler of ["typescript", "typescript-min"]) {
    execFileSync(process.execPath, [join(root, `node_modules/${compiler}/bin/tsc`), "--project", "tsconfig.json"], { cwd: consumer, stdio: "inherit" });
}
execFileSync(process.execPath, ["--test", "consumer.test.mjs"], { cwd: consumer, stdio: "inherit", env: process.env });
