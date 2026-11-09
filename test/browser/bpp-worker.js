import { initialize } from "/dist/browser.js";
import { checkLoading } from "./bpp.js";

self.onmessage = async event => {
    try { await initialize(); self.postMessage(checkLoading(event.data)); }
    catch (error) { self.postMessage({ error: String(error) }); }
};
