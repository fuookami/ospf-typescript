import { initialize } from "/dist/browser.js";
import { Bpp1dReport } from "/dist/bpp1d.js";
import { checkPacking } from "./bpp1d.js";

self.onmessage = async event => {
    try {
        await initialize();
        const report = Bpp1dReport.fromJson(event.data.reportJson, event.data.artifact), packing = report.packing();
        const summary = report.summary(); report.dispose();
        self.postMessage({ summary, itemCount: packing.kpi().itemCount.toString() }); packing.dispose();
    } catch (error) { self.postMessage({ error: String(error) }); }
};
await initialize();
self.postMessage(checkPacking().output);
