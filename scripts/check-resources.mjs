import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { checkResources } from './resources.mjs';
import { generateReferences } from './catalog-reference.mjs';

const root = process.argv[2] ? resolve(process.argv[2]) : fileURLToPath(new URL('..', import.meta.url));
await generateReferences(root, { check: true });
const report = checkResources(root);
console.log(JSON.stringify(report, null, 2));
if (report.issues.length) {
    process.exitCode = 1;
}
