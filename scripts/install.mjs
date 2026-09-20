import { cpSync, existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkResources, verifyInventory } from './resources.mjs';

function option(name) {
    const _index = process.argv.indexOf(name);
    if (_index < 0) { return undefined; }
    const _value = process.argv[_index + 1];
    if (!_value || _value.startsWith('--')) { throw new Error(name + ' requires a value'); }
    return _value;
}

function compareVersions(left, right) {
    const _pattern = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$/;
    const _left = left?.match(_pattern);
    const _right = right?.match(_pattern);
    if (!_left || !_right) { throw new Error('Cannot compare skill versions: ' + left + ', ' + right); }
    for (let i = 1; i <= 3; i++) {
        if (+_left[i] !== +_right[i]) { return +_left[i] > +_right[i] ? 1 : -1; }
    }
    if (_left[4] === _right[4]) { return 0; }
    if (!_left[4] || !_right[4]) { return _left[4] ? -1 : 1; }
    const _a = _left[4].split('.');
    const _b = _right[4].split('.');
    for (let i = 0; i < Math.max(_a.length, _b.length); i++) {
        if (_a[i] === _b[i]) { continue; }
        if (_a[i] === undefined || _b[i] === undefined) { return _a[i] === undefined ? -1 : 1; }
        const _an = /^\d+$/.test(_a[i]);
        const _bn = /^\d+$/.test(_b[i]);
        if (_an !== _bn) { return _an ? -1 : 1; }
        return (_an ? +_a[i] > +_b[i] : _a[i] > _b[i]) ? 1 : -1;
    }
    return 0;
}

const root = fileURLToPath(new URL('..', import.meta.url));
const bundle = resolve(option('--bundle') ?? (existsSync(resolve(root, 'manifest.json')) ? root : resolve(root, 'dist/.build/package')));
const destinationArg = option('--destination');
if (!destinationArg) { throw new Error('Specify --destination with the client skill directory.'); }
const destination = resolve(destinationArg);
const manifest = JSON.parse(readFileSync(resolve(bundle, 'manifest.json'), 'utf8'));
verifyInventory(bundle, manifest.inventory);
const selected = option('--skill');
const names = selected ? [selected] : ['jaml'];
for (const name of names) {
    if (!['jaml'].includes(name) || manifest.skills[name] !== 'skills/' + name) { throw new Error('Unknown skill: ' + name); }
    const _check = checkResources(resolve(bundle, manifest.skills[name]));
    if (_check.issues.length) { throw new Error(_check.issues.join('\n')); }
    const _target = resolve(destination, name);
    if (lstatSync(_target, { throwIfNoEntry: false })) {
        const _skill = resolve(_target, 'SKILL.md');
        if (!existsSync(_skill) || !readFileSync(_skill, 'utf8').split('\n---')[0].includes('name: ' + name + '\n')) {
            throw new Error('Destination is not the expected skill: ' + _target);
        }
        const _metadata = resolve(_target, 'version.json');
        if (existsSync(_metadata)) {
            const _previous = JSON.parse(readFileSync(_metadata, 'utf8'));
            if (_previous.distribution && _previous.distribution !== manifest.name) { throw new Error('Unknown skill distribution: ' + _previous.distribution); }
            if (!_previous.distribution && _previous.version && compareVersions(_previous.version, manifest.framework.version) > 0) {
                throw new Error('Refusing to replace a newer legacy framework skill: ' + _previous.version);
            }
            if (_previous.distribution === manifest.name && _previous.version && compareVersions(_previous.version, manifest.version) > 0) {
                throw new Error('Refusing to downgrade newer skill: ' + name + '@' + _previous.version);
            }
        }
    }
}
mkdirSync(destination, { recursive: true });
for (const name of names) {
    const _target = resolve(destination, name);
    const _temporary = mkdtempSync(resolve(destination, '.' + name + '-'));
    const _replacement = resolve(_temporary, name);
    const _backup = resolve(_temporary, 'previous');
    try {
        cpSync(resolve(bundle, manifest.skills[name]), _replacement, { recursive: true });
        const _learned = resolve(_target, 'LEARNED.md');
        if (existsSync(_learned)) { writeFileSync(resolve(_replacement, 'LEARNED.md'), readFileSync(_learned)); }
        if (existsSync(_target)) { renameSync(_target, _backup); }
        try { renameSync(_replacement, _target); }
        catch (error) {
            if (existsSync(_backup)) { renameSync(_backup, _target); }
            throw error;
        }
    } finally { rmSync(_temporary, { recursive: true, force: true }); }
    console.log('Installed ' + name + '@' + manifest.version + ' at ' + _target);
}
