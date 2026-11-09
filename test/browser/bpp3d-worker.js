import { initialize } from "/dist/browser.js";
import { checkPacking3d } from "./bpp3d.js";

self.onmessage = async event => {
    try { await initialize(); self.postMessage(checkPacking3d(event.data)); }
    catch (error) { self.postMessage({ error: String(error) }); }
};
