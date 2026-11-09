import { initialize } from "/dist/browser.js";
import { checkGanttActivity } from "./gantt.js";

self.onmessage = async event => {
    try { await initialize(); self.postMessage(checkGanttActivity(event.data)); }
    catch (error) { self.postMessage({ error: String(error) }); }
};
