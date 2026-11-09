import { initialize } from "/dist/browser.js";
import { checkPacking2d } from "./bpp2d.js";

self.onmessage = async event => {
    try { await initialize(); self.postMessage(checkPacking2d(event.data)); }
    catch (error) { self.postMessage({ error: String(error) }); }
};
