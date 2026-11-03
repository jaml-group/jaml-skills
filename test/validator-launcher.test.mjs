import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import test from 'node:test';

function fixture(t) {
    const _root = mkdtempSync(join(tmpdir(), 'jaml-skill-validator-'));
    t.after(() => rmSync(_root, { recursive: true, force: true }));
    const _launcher = join(_root, 'skill/scripts/validate.mjs');
    mkdirSync(dirname(_launcher), { recursive: true });
    copyFileSync(new URL('../jaml/scripts/validate.mjs', import.meta.url), _launcher);
    return { root: _root, launcher: _launcher };
}

for (const [name, entry] of [
    ['@jam/jaml-language-core', 'src/cli/index.mjs'],
    ['@jam/jaml-playground-mcp', 'bundle/language-core/src/cli/index.mjs']
]) {
    test(`launcher resolves installed ${name} and preserves input, arguments and exit status`, (t) => {
        const { root, launcher } = fixture(t);
        const _package = join(root, 'node_modules', name);
        const _cli = join(_package, entry);
        mkdirSync(dirname(_cli), { recursive: true });
        writeFileSync(join(_package, 'package.json'), JSON.stringify({ name, type: 'module' }));
        writeFileSync(_cli, "import {readFileSync} from 'node:fs'; console.log(JSON.stringify({args:process.argv.slice(2),input:readFileSync(0,'utf8')})); process.exitCode=7;");
        const _result = spawnSync(process.execPath, [launcher, '-', '--format', 'jamll'], { cwd: root, input: '{type:"label"}', encoding: 'utf8' });
        assert.equal(_result.status, 7, _result.stderr);
        assert.deepEqual(JSON.parse(_result.stdout), { args: ['validate', '-', '--format', 'jamll'], input: '{type:"label"}' });
    });
}

test('missing engine is explicit and cannot produce a passed validation', (t) => {
    const { root, launcher } = fixture(t);
    const _result = spawnSync(process.execPath, [launcher, '-'], { cwd: root, input: '{}', encoding: 'utf8' });
    assert.equal(_result.status, 2);
    assert.equal(_result.stdout, '');
    assert.match(_result.stderr, /validator unavailable.*No validation ran/);
});
