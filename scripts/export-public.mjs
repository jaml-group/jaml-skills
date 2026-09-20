import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { checkResources, filesUnder, sha256 } from './resources.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const report = checkResources(root);
if (report.issues.length) { throw new Error(report.issues.join('\n')); }
const output = resolve(root, 'dist');
const staging = resolve(output, '.public-source');
const snapshot = resolve(staging, 'jaml-skills');
rmSync(snapshot, { recursive: true, force: true });
mkdirSync(snapshot, { recursive: true });
for (const file of filesUnder(root)) {
    const _destination = resolve(snapshot, relative(root, file));
    mkdirSync(dirname(_destination), { recursive: true });
    writeFileSync(_destination, readFileSync(file));
}
const check = checkResources(snapshot);
if (check.issues.length) { throw new Error(check.issues.join('\n')); }
const archive = resolve(output, 'jaml-skills-public-source.tgz');
const result = spawnSync('tar', ['-czf', archive, '-C', staging, 'jaml-skills'], { encoding: 'utf8', env: { ...process.env, COPYFILE_DISABLE: '1' } });
if (result.status !== 0) { throw new Error(result.stderr || 'tar failed'); }
console.log(JSON.stringify({ file: archive, sha256: sha256(archive), files: filesUnder(snapshot).length }, null, 2));
