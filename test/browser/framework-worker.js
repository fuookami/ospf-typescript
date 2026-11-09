import { initialize, CombinatorialReport } from '/dist/browser.js';

self.onmessage = async ({ data }) => {
    try {
        await initialize();
        const report = CombinatorialReport.fromJson(data.reportJson, data.artifact);
        self.postMessage({ summary: report.summary(), attempts: report.attemptIds().length, selected: !!report.selectedAttemptId() });
        report.dispose();
    } catch (error) { self.postMessage({ error: String(error) }); }
};
