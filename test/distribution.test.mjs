import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
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
        assert.equal(existsSync(resolve(_bundle, 'scripts/check-docs.mjs')), false);
        const _destination = resolve(_temporary, 'client/skills');
        const _args = [resolve(_bundle, 'scripts/install.mjs'), '--destination', _destination];
        const _installed = spawnSync(process.execPath, _args, { cwd: _temporary, encoding: 'utf8' });
        assert.equal(_installed.status, 0, _installed.stderr);
        for (const name of ['jaml']) {
            assert.deepEqual(checkResources(resolve(_destination, name)).issues, []);
            assert.ok(existsSync(resolve(_destination, name, 'references/Theme/tokens.md')));
        }
        const _learned = resolve(_destination, 'jaml/LEARNED.md');
        writeFileSync(_learned, 'A verified user correction.\n');
        writeFileSync(resolve(_destination, 'jaml/obsolete-resource.md'), 'stale');
        const _updated = spawnSync(process.execPath, _args, { cwd: _temporary, encoding: 'utf8' });
        assert.equal(_updated.status, 0, _updated.stderr);
        assert.equal(readFileSync(_learned, 'utf8'), 'A verified user correction.\n');
        assert.equal(existsSync(resolve(_destination, 'jaml/obsolete-resource.md')), false);
    } finally { rmSync(_temporary, { recursive: true, force: true }); }
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
    } finally { rmSync(_temporary, { recursive: true, force: true }); }
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
        } finally { rmSync(_temporary, { recursive: true, force: true }); }
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
    } finally { rmSync(_temporary, { recursive: true, force: true }); }
});
