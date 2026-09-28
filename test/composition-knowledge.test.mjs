import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const cli = fileURLToPath(new URL('../jaml/scripts/catalog.mjs', import.meta.url));
const cases = JSON.parse(readFileSync(new URL('./fixtures/composition-cases.json', import.meta.url), 'utf8'));
const read = (path) => execFileSync(process.execPath, [cli, 'read', path], { cwd: tmpdir(), encoding: 'utf8' });

test('composition eval cases retain portable focused retrieval paths', () => {
    assert.deepEqual(
        cases.map((entry) => entry.id),
        ['A', 'B', 'C', 'D', 'E', 'F']
    );
    for (const entry of cases) {
        assert.ok(entry.prompt && entry.expect.length >= 2);
        for (const path of entry.retrieve) {
            assert.ok(read(path).length > 100, `${entry.id}: ${path}`);
        }
    }
});

test('selection retrieval starts with native visibility and retains optional styling and tabs limits', () => {
    const choice = read('choosing-native-capabilities.md#selection-and-hover');
    assert.match(choice, /already presents checked state visually/);
    assert.match(choice, /optional visual treatment/);
    assert.match(choice, /keyboard navigation, tab\/panel semantics and panel switching/);
    assert.doesNotMatch(choice, /Apply one check marker|styles: \['check\.underscore'\]/);
    assert.doesNotMatch(choice, /## Runtime and shared data/);
});

test('shared-data and refresh contracts remain reachable without loading the entire guide', () => {
    const shared = read('JAML/state-and-data.md#shared-data-owner');
    assert.match(shared, /valueKey: 'salesData'/);
    assert.match(shared, /dataWatcher: 'salesData'/);
    assert.match(shared, /salesData\.map/);
    assert.match(shared, /broker scope/);
    assert.doesNotMatch(shared, /## Request sharing and cache limits/);
    const requests = read('JAML/state-and-data.md#request-sharing-and-cache-limits');
    assert.match(requests, /400 ms after the originating request finishes/);
    assert.match(requests, /not guaranteed to share a backend call/);
    assert.match(requests, /HTTP method and headers are not part/);
    const refresh = read('JAML/state-and-data.md#refresh-unchanged-logical-arguments');
    assert.match(refresh, /not reserved JAML refresh APIs/);
    assert.match(refresh, /forcing a new backend call are different/);
});
