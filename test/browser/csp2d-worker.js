import { initialize } from "/dist/browser.js";
import { checkCutting2d, checkCutting2dReport } from "./csp2d.js";

self.onmessage = async event => {
    try { await initialize(); self.postMessage(event.data === null ? checkCutting2d() : checkCutting2dReport(event.data)); }
    catch (error) { self.postMessage({ error: String(error) }); }
};
