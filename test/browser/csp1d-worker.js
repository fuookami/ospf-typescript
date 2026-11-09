import { initialize } from "/dist/browser.js";
import { checkCutting } from "./csp1d.js";

try {
    await initialize();
    self.postMessage(checkCutting());
} catch (error) { self.postMessage({ error: String(error) }); }
