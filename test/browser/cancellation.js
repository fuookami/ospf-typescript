import { SCIPSolver } from '/dist/browser.js';

export async function checkCancellation() {
    const controller = new AbortController(), calls = [], progress = [];
    const running = { protocolVersion: 1, id: '1', fingerprint: 'expected', status: 'running', reportJson: null, progressJson: 'started', error: null };
    const client = {
        async capabilities() { return { protocolVersion: 1, backends: [{ id: 'scip', compiled: true, capabilities: ['linear'], warnings: [] }] }; },
        async submit() { return running; },
        async get() { calls.push('get'); return { ...running, status: 'completed', reportJson: 'unexpected' }; },
        async cancel() { calls.push('cancel'); return { ...running, status: 'completed', reportJson: 'actual', progressJson: 'terminal' }; },
    };
    const result = await new SCIPSolver(client).solveLinear({ modelJson: 'lossless', fingerprint: 'expected' }, {
        signal: controller.signal, pollIntervalMs: 250, onProgress(value) {
            progress.push(value);
            if (value === 'started') setTimeout(() => controller.abort(), 0);
        },
    });
    return { calls, progress, reportJson: result.reportJson };
}
