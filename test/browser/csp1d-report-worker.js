import { initialize } from "/dist/browser.js";
import { checkCuttingReport, checkCuttingExecution } from "./csp1d.js";

self.onmessage = async event => {
    try { await initialize(); self.postMessage(event.data.execution ? checkCuttingExecution(event.data) : checkCuttingReport(event.data)); }
    catch (error) { self.postMessage({ error: String(error) }); }
};
