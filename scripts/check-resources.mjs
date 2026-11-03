import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateReferences } from './catalog-reference.mjs';
import { checkResources } from './resources.mjs';
import { generateSkillDocMap } from './skill-doc-map.mjs';

const root = process.argv[2] ? resolve(process.argv[2]) : fileURLToPath(new URL('..', import.meta.url));
await generateReferences(root, { check: true });
generateSkillDocMap(root, { check: true });
const report = checkResources(root);
console.log(JSON.stringify(report, null, 2));
if (report.issues.length) {
    process.exitCode = 1;
}
