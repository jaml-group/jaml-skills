import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { checkResources, filesUnder } from '../scripts/resources.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const build = spawnSync(process.execPath, [resolve(root, 'scripts/build.mjs')], { encoding: 'utf8' });
assert.equal(build.status, 0, build.stderr);

test('artifact installs independently and preserves learned corrections on replacement', () => {
    const _temporary = mkdtempSync(resolve(tmpdir(), 'jam-skill-install-'));
    try {
        const _bundle = resolve(_temporary, 'package');
        const _artifact = JSON.parse(readFileSync(resolve(root, 'dist/artifact.json'), 'utf8'));
        const _unpacked = spawnSync('tar', ['-xzf', resolve(root, 'dist', _artifact.file), '-C', _temporary], { encoding: 'utf8' });
        assert.equal(_unpacked.status, 0, _unpacked.stderr);
        assert.deepEqual(Object.keys(JSON.parse(readFileSync(resolve(_bundle, 'manifest.json'), 'utf8')).skills), ['jaml']);
        assert.equal(existsSync(resolve(_bundle, 'skills/jaml-knowledge')), false);
        assert.equal(existsSync(resolve(_bundle, 'scripts/check-docs.mjs')), false);
        const _destination = resolve(_temporary, 'client/skills');
        const _args = [resolve(_bundle, 'scripts/install.mjs'), '--destination', _destination];
        const _installed = spawnSync(process.execPath, _args, { cwd: _temporary, encoding: 'utf8' });
        assert.equal(_installed.status, 0, _installed.stderr);
        for (const name of ['jaml']) {
            assert.deepEqual(checkResources(resolve(_destination, name)).issues, []);
            assert.ok(existsSync(resolve(_destination, name, 'references/Theme/tokens.md')));
        }
        assert.equal(existsSync(resolve(_destination, 'jaml-knowledge')), false, 'Default install remains jaml-only');
        const _lookup = spawnSync(process.execPath, [resolve(_destination, 'jaml/scripts/catalog.mjs'), 'show', 'style', 'layout.application', '--locale', 'zh'], { cwd: _temporary, encoding: 'utf8' });
        assert.equal(_lookup.status, 0, _lookup.stderr);
        const _profile = JSON.parse(_lookup.stdout);
        const _manifest = JSON.parse(readFileSync(resolve(_bundle, 'manifest.json'), 'utf8'));
        assert.equal(_profile.catalogDigest, _manifest.catalog.digest);
        assert.equal(_profile.schemaDigest, _manifest.catalog.schemaDigest);
        assert.equal(_profile.profile.desc, '有界应用布局');
        assert.ok(existsSync(resolve(_destination, 'jaml/references/API', _profile.reference)));
        for (const [args, expected] of [
            [['contract', 'style', 'interact.sortable', '--args', 'change'], 'does not persist the application model'],
            [['compose', 'style', 'interact.sortable', '--args', 'change'], 'does not persist the application model'],
            [['compose', 'style', 'table.fixedrowheight'], 'current animation callback calls string methods on a truthy value'],
            [['choose', 'selection-and-hover'], 'complete tabs interaction'],
            [['read', 'Styles/check.md#checkunderscore'], 'native element owns selection']
        ]) {
            const _focused = spawnSync(process.execPath, [resolve(_destination, 'jaml/scripts/catalog.mjs'), ...args], { cwd: _temporary, encoding: 'utf8' });
            assert.equal(_focused.status, 0, _focused.stderr);
            assert.ok(_focused.stdout.includes(expected));
        }

        const _runInstalled = (...args) => {
            const _result = spawnSync(process.execPath, [resolve(_destination, 'jaml/scripts/catalog.mjs'), ...args], { cwd: _temporary, encoding: 'utf8' });
            assert.equal(_result.status, 0, _result.stderr);
            return _result.stdout;
        };
        const _choice = _runInstalled('choose', 'selection-and-hover');
        assert.equal(_choice, _runInstalled('read', 'choosing-native-capabilities.md#selection-and-hover'));
        const _recommendation = _choice.match(/`((?:compose|contract|show) style PATH --locale en)`/)?.[1];
        assert.equal(_recommendation, 'compose style PATH --locale en');
        const _composed = _runInstalled(..._recommendation.split(' ').map((argument) => (argument === 'PATH' ? 'check.underscore' : argument)));
        assert.ok(_composed.includes('Use an option host exposing checked items'));
        assert.ok(_composed.includes('It does not implement tabs keyboard navigation'));
        const _apiGuide = _runInstalled('read', 'API/index.md#find-any-exported-path');
        assert.ok(_apiGuide.includes('Use compose for ordinary composition'));
        assert.ok(_apiGuide.includes('compose plugin interact.droppable --locale zh'));

        assert.equal(readFileSync(resolve(_destination, 'jaml/catalog/LICENSE'), 'utf8'), readFileSync(resolve(root, 'jaml/catalog/LICENSE'), 'utf8'));
        const _learned = resolve(_destination, 'jaml/LEARNED.md');
        writeFileSync(_learned, 'A verified user correction.\n');
        writeFileSync(resolve(_destination, 'jaml/obsolete-resource.md'), 'stale');
        const _updated = spawnSync(process.execPath, _args, { cwd: _temporary, encoding: 'utf8' });
        assert.equal(_updated.status, 0, _updated.stderr);
        assert.equal(readFileSync(_learned, 'utf8'), 'A verified user correction.\n');
        assert.equal(existsSync(resolve(_destination, 'jaml/obsolete-resource.md')), false);
    } finally {
        rmSync(_temporary, { recursive: true, force: true });
    }
});

test('consumer installer rejects the maintenance skill without changing existing agent skills', () => {
    const _temporary = mkdtempSync(resolve(tmpdir(), 'jam-knowledge-boundary-'));
    try {
        const _destination = resolve(_temporary, 'skills');
        mkdirSync(resolve(_destination, 'jaml-knowledge'), { recursive: true });
        const _existing = resolve(_destination, 'jaml-knowledge/SKILL.md');
        writeFileSync(_existing, 'User maintenance skill');
        const _result = spawnSync(process.execPath, [resolve(root, 'scripts/install.mjs'), '--destination', _destination, '--skill', 'jaml-knowledge'], { cwd: _temporary, encoding: 'utf8' });
        assert.notEqual(_result.status, 0);
        assert.match(_result.stderr, /Unknown skill: jaml-knowledge/);
        assert.equal(readFileSync(_existing, 'utf8'), 'User maintenance skill');
        assert.equal(existsSync(resolve(_destination, 'jaml')), false);
    } finally {
        rmSync(_temporary, { recursive: true, force: true });
    }
});

test('modified artifact is rejected before an installed skill is changed', () => {
    const _temporary = mkdtempSync(resolve(tmpdir(), 'jam-skill-integrity-'));
    try {
        const _bundle = resolve(_temporary, 'package');
        cpSync(resolve(root, 'dist/.build/package'), _bundle, { recursive: true });
        writeFileSync(resolve(_bundle, 'skills/jaml/SKILL.md'), 'tampered');
        const _destination = resolve(_temporary, 'skills');
        const _result = spawnSync(process.execPath, [resolve(_bundle, 'scripts/install.mjs'), '--destination', _destination], { encoding: 'utf8' });
        assert.notEqual(_result.status, 0);
        assert.match(_result.stderr, /Invalid artifact resource/);
        assert.equal(existsSync(_destination), false);
    } finally {
        rmSync(_temporary, { recursive: true, force: true });
    }
});

for (const metadata of [
    { name: 'jaml', distribution: '@jam/skills', version: '99.0.0' },
    { name: 'jaml', distribution: 'another-distribution', version: '1.0.0' },
    { name: 'jaml', version: '99.0.0' }
]) {
    test('installer preserves incompatible or newer installation: ' + JSON.stringify(metadata), () => {
        const _temporary = mkdtempSync(resolve(tmpdir(), 'jam-skill-preserve-'));
        try {
            const _destination = resolve(_temporary, 'skills');
            cpSync(resolve(root, 'dist/.build/package/skills/jaml'), resolve(_destination, 'jaml'), { recursive: true });
            const _version = resolve(_destination, 'jaml/version.json');
            const _original = JSON.stringify(metadata);
            writeFileSync(_version, _original);
            const _result = spawnSync(process.execPath, [resolve(root, 'scripts/install.mjs'), '--skill', 'jaml', '--destination', _destination], { encoding: 'utf8' });
            assert.notEqual(_result.status, 0);
            assert.equal(readFileSync(_version, 'utf8'), _original);
        } finally {
            rmSync(_temporary, { recursive: true, force: true });
        }
    });
}

// A linked reference must never smuggle files from another repository into a package.
test('resource collection rejects directory and file links outside its boundary', () => {
    const _temporary = mkdtempSync(resolve(tmpdir(), 'jam-skill-boundary-'));
    try {
        const _source = resolve(_temporary, 'source');
        cpSync(resolve(root, 'jaml'), _source, { recursive: true, dereference: true });
        const _private = resolve(_temporary, 'private.txt');
        writeFileSync(_private, 'private fixture');
        symlinkSync(_private, resolve(_source, 'leaked.txt'));
        assert.throws(() => filesUnder(_source), /External resource link/);
        rmSync(resolve(_source, 'leaked.txt'));
        symlinkSync(_temporary, resolve(_source, 'outside'));
        assert.throws(() => filesUnder(_source), /External resource link/);
    } finally {
        rmSync(_temporary, { recursive: true, force: true });
    }
});

test('resource collection excludes cloud-sync staging files at every depth', () => {
    const _temporary = mkdtempSync(resolve(tmpdir(), 'jam-skill-sync-junk-'));
    try {
        for (const directory of ['.tmp.driveupload', 'references/.tmp.driveupload']) {
            mkdirSync(resolve(_temporary, directory), { recursive: true });
            writeFileSync(resolve(_temporary, directory, 'pending'), 'temporary upload');
        }
        const _resource = resolve(_temporary, 'references/guide.md');
        writeFileSync(_resource, '# Reference');
        assert.deepEqual(filesUnder(_temporary), [_resource]);
    } finally {
        rmSync(_temporary, { recursive: true, force: true });
    }
});
