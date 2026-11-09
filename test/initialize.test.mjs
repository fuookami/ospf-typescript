import assert from "node:assert/strict";
import test from "node:test";
import { initialize, Decimal } from "../dist/node.js";

test("failed initialization can be retried with the packaged module", async () => {
    await assert.rejects(initialize({ module_or_path: new Uint8Array([0]) }), { code: "ExecutionFailure" });
    assert.throws(() => new Decimal("1"), { code: "NotInitialized" });
    await initialize();
    const value = new Decimal("1");
    assert.equal(value.toString(), "1");
    value.dispose();
});
