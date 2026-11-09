import { initialize, ColumnGenerationReport } from '/dist/browser.js';

self.onmessage = async ({ data }) => {
    try {
        await initialize();
        const report = ColumnGenerationReport.fromJson(data.reportJson, data.artifact);
        self.postMessage({ summary: report.summary(), hasMaster: !!report.masterReportJson(), hasPricing: !!report.pricingReportJson(), hasFinal: !!report.finalReportJson() });
        report.dispose();
    } catch (error) { self.postMessage({ error: String(error) }); }
};
