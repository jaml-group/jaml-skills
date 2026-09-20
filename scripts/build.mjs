import { createHash } from 'node:crypto';
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { checkResources, filesUnder, sha256 } from './resources.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const source = JSON.parse(readFileSync(resolve(root, 'compatibility.json'), 'utf8'));
const output = resolve(root, 'dist');
// Keep generated skill copies out of recursive client discovery.
const staging = resolve(output, '.build');
const bundle = resolve(staging, 'package');
const skills = ['jaml'];
const sourceCheck = checkResources(root);
if (sourceCheck.issues.length) { throw new Error(sourceCheck.issues.join('\n')); }

rmSync(bundle, { recursive: true, force: true });
mkdirSync(bundle, { recursive: true });
for (const name of skills) {
    const _target = resolve(bundle, 'skills', name);
    const _source = resolve(root, name);
    for (const file of filesUnder(_source, root)) {
        const _destination = resolve(_target, relative(_source, file));
        mkdirSync(dirname(_destination), { recursive: true });
        writeFileSync(_destination, readFileSync(file));
    }
    writeFileSync(resolve(_target, 'version.json'), JSON.stringify({
        name, distribution: pkg.name, version: pkg.version, framework: source.framework
    }, null, 2) + '\n');
}
cpSync(resolve(root, 'LICENSE'), resolve(bundle, 'LICENSE'));
mkdirSync(resolve(bundle, 'scripts'));
for (const name of ['install.mjs', 'resources.mjs']) {
    cpSync(resolve(root, 'scripts', name), resolve(bundle, 'scripts', name));
}
writeFileSync(resolve(bundle, 'package.json'), JSON.stringify({ name: pkg.name, version: pkg.version, type: 'module', private: true }, null, 2) + '\n');
const check = checkResources(bundle);
if (check.issues.length) { throw new Error(check.issues.join('\n')); }
const manifest = {
    name: pkg.name, version: pkg.version, framework: source.framework,
    skills: Object.fromEntries(skills.map((name) => [name, 'skills/' + name])),
    wiki: 'skills/jaml/references',
    inventory: Object.fromEntries(filesUnder(bundle).map((file) => [relative(bundle, file).replaceAll('\\', '/'), sha256(file)]))
};
writeFileSync(resolve(bundle, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
const filename = 'jam-skills-' + pkg.version + '.tgz';
const packed = spawnSync('tar', ['-czf', resolve(output, filename), '-C', staging, 'package'], { encoding: 'utf8', env: { ...process.env, COPYFILE_DISABLE: '1' } });
if (packed.status !== 0) { throw new Error(packed.stderr || 'tar failed'); }
const artifact = {
    name: pkg.name, version: pkg.version, file: filename,
    integrity: 'sha512-' + createHash('sha512').update(readFileSync(resolve(output, filename))).digest('base64'),
    framework: source.framework
};
writeFileSync(resolve(output, 'artifact.json'), JSON.stringify(artifact, null, 2) + '\n');
console.log(JSON.stringify(artifact, null, 2));
