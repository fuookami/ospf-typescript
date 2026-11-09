import { initialize, FixedRecourseReport } from '/dist/browser.js';

self.onmessage = async ({ data }) => {
    try {
        await initialize();
        const report = FixedRecourseReport.fromJson(data.reportJson, data.artifact);
        self.postMessage({ summary: report.summary(), hasMaster: !!report.masterReportJson(), hasSubproblem: !!report.subproblemReportJson() });
        report.dispose();
    } catch (error) { self.postMessage({ error: String(error) }); }
};
