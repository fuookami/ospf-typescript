import { checkCancellation } from './cancellation.js';

checkCancellation().then(result => postMessage(result), error => postMessage({ error: String(error) }));
