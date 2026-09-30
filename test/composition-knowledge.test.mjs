import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const cases = JSON.parse(readFileSync(new URL('./fixtures/composition-cases.json', import.meta.url), 'utf8'));
function read(path) {
    const [file, anchor] = path.split('#');
    const _text = readFileSync(new URL(`../jaml/references/${file}`, import.meta.url), 'utf8');
    if (!anchor) {
        return _text;
    }
    const _headings = [..._text.matchAll(/^(#{1,6}) +(.+)$/gm)];
    const _index = _headings.findIndex(
        (heading) =>
            heading[2]
                .toLowerCase()
                .replace(/[^\w -]/g, '')
                .replace(/ /g, '-') === anchor
    );
    assert.notEqual(_index, -1, path);
    const _heading = _headings[_index];
    const _end = _headings.slice(_index + 1).find((heading) => heading[1].length <= _heading[1].length)?.index ?? _text.length;
    return _text.slice(_heading.index, _end);
}

test('composition cases resolve direct Markdown files and focused sections', () => {
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

test('direct retrieval keeps permissive event control and deliberate dataset ownership', () => {
    const _selection = read('JAML/state-and-data.md#selection-and-content');
    assert.match(_selection, /an `onclick` handler may call a documented method/);
    const _requests = read('JAML/state-and-data.md#request-sharing-and-cache-limits');
    assert.match(_requests, /use a shared `data` owner for a shared logical dataset/);
    assert.match(_requests, /conditional request sharing/);
});
