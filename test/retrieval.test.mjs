import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { contract, loadCatalog, lookup } from '../jaml/scripts/catalog.mjs';
import { readReference, referenceSections, selectSection } from '../jaml/scripts/references.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const cli = resolve(root, 'jaml/scripts/catalog.mjs');
const catalog = await loadCatalog(resolve(root, 'jaml/catalog'));
const run = (...args) => execFileSync(process.execPath, [cli, ...args], { encoding: 'utf8', cwd: tmpdir() });

test('known contract retains every profile and argument fact without broad selection', () => {
    for (const [kind, path] of [
        ['style', 'check.underscore'],
        ['style', 'interact.sortable'],
        ['style', 'layer.combo.spinner.reddit'],
        ['style', 'sync.width'],
        ['plugin', 'popup.title']
    ]) {
        for (const locale of ['en', 'zh']) {
            const _profile = lookup(catalog, kind, path, locale).profile;
            const _output = contract(catalog, kind, path, locale);
            for (const [field, value] of Object.entries(_profile)) {
                if (field === 'args') {
                    for (const [key, arg] of Object.entries(value)) {
                        assert.ok(_output.includes(key + ': ' + JSON.stringify(arg)), path + ':' + key);
                    }
                } else {
                    assert.ok(_output.includes(field + ': ' + (typeof value === 'string' ? value : JSON.stringify(value))), path + ':' + field);
                }
            }
            assert.ok(_output.includes(catalog.pin.frameworkVersion));
            assert.ok(_output.includes(catalog.pin.schemaDigest));
            assert.ok(_output.includes(catalog.pin.catalogDigest));
            assert.ok(_output.includes('locale: ' + locale));
        }
    }
    const _output = run('contract', 'style', 'button.pill');
    assert.ok(!_output.includes('Selection and hover'));
    assert.ok(!_output.includes('Maintain'));
});

test('focused arguments retain cross-argument defaults, constraints, ownership and uncertainty', () => {
    const _output = run('contract', 'style', 'interact.sortable', '--args', 'handle,change');
    const _profile = lookup(catalog, 'style', 'interact.sortable').profile;
    for (const [key, arg] of Object.entries(_profile.args)) {
        assert.ok(_output.includes(key + ': ' + JSON.stringify(arg)), key);
    }
    for (const field of ['prerequisites', 'composition', 'caveats']) {
        assert.ok(_output.includes(_profile[field]));
    }
    assert.ok(_output.includes('does not persist the application model'));
    assert.ok(_output.includes('no default does not mean required'));
    assert.ok(_output.includes('Other arguments (dependency context retained)'));
    assert.throws(() => contract(catalog, 'style', 'interact.sortable', 'en', ['notAnArg']), /Unknown/);
});

test('open forwarding and locale/alias identity remain explicit', () => {
    const _output = run('contract', 'style', 'interact.movable', '--locale', 'zh');
    assert.ok(_output.includes('argumentContract: passthrough'));
    assert.ok(_output.includes('argumentSource: jam.makeMovable'));
    assert.ok(_output.includes('field inference is incomplete'));
    assert.ok(_output.includes('locale: zh'));
    const _alias = contract(catalog, 'style', 'stylize.bento');
    assert.ok(_alias.includes('@jam/jam-ui/style/stylize.bento → @jam/jam-ui/style/group.bento'));
    assert.throws(() => contract(catalog, 'style', 'interact.movable', 'en', ['handle']), /open contracts require/);
});

test('choose supplies one decision topic and no-fit limits, then exact contracts', () => {
    const _topics = JSON.parse(run('choose'));
    assert.ok(_topics.entries.some((entry) => entry.anchor === 'selection-and-hover'));
    const _choice = run('choose', 'selection-and-hover');
    assert.ok(_choice.includes('complete tabs interaction'));
    assert.ok(_choice.includes('keyboard navigation, tab/panel semantics and panel switching'));
    assert.ok(!_choice.includes('## Charts and data transformations'));
    assert.ok(_choice.includes('other sections omitted'));
    const _selected = run('contract', 'style', 'check.underscore');
    assert.ok(_selected.includes('It does not implement tabs keyboard navigation'));
    const _missing = spawnSync(process.execPath, [cli, 'contract', 'style', 'complete.tabs'], { encoding: 'utf8' });
    assert.notEqual(_missing.status, 0);
    assert.match(_missing.stderr, /Unknown catalog path/);
    assert.equal(_missing.stdout, '');
});

test('rich show remains byte-compatible and complete guide explanations remain reachable', () => {
    assert.equal(run('show', 'style', 'check.underscore', '--locale', 'zh'), JSON.stringify(lookup(catalog, 'style', 'check.underscore', 'zh'), null, 2) + '\n');
    const _guide = readReference('Styles/check.md');
    const _full = run('read', 'Styles/check.md');
    assert.ok(_full.endsWith(_guide.text.trimEnd() + '\n'));
    const _headings = JSON.parse(run('sections', 'Styles/check.md'));
    assert.ok(_headings.entries.some((entry) => entry.anchor === 'checkunderscore'));
    const _focused = run('read', 'Styles/check.md#checkunderscore');
    assert.ok(_focused.includes('### `check.underscore`'));
    assert.ok(_focused.includes('native element owns selection'));
    assert.ok(!_focused.includes('### `check.pipe`'));
});

test('section retrieval retains ancestor introductions, subtree and exact examples without sibling leakage', () => {
    const _text = '# Guide\n\nShared prerequisite.\n\n## A\n\nOwner constraint.\n\n### Detail\n\n```md\n## not a heading\n```\n\n#### Child\nChild body.\n\n### Detail\nOther body.\n\n## B\nSibling.\n';
    const _sections = referenceSections(_text);
    assert.deepEqual(
        referenceSections(_text.replaceAll('\n', '\r\n')).map((section) => section.anchor),
        _sections.map((section) => section.anchor)
    );
    assert.deepEqual(
        _sections.map((section) => section.anchor),
        ['guide', 'a', 'detail', 'child', 'detail-1', 'b']
    );
    const _view = selectSection({ name: 'fixture.md', text: _text }, 'detail');
    assert.ok(_view.text.includes('Shared prerequisite.'));
    assert.ok(_view.text.includes('Owner constraint.'));
    assert.ok(_view.text.includes('## not a heading'));
    assert.ok(_view.text.includes('Child body.'));
    assert.ok(!_view.text.includes('Other body.'));
    assert.ok(!_view.text.includes('Sibling.'));
    assert.deepEqual(_view.ancestorContext, ['guide', 'a']);
    assert.throws(() => selectSection({ name: 'fixture.md', text: _text }, 'missing'), /Unknown section/);
});

test('reference retrieval rejects traversal and external resource links', () => {
    const _temporary = mkdtempSync(resolve(tmpdir(), 'jaml-reader-'));
    try {
        const _outside = resolve(_temporary, 'private.md');
        writeFileSync(_outside, 'private');
        symlinkSync(_outside, resolve(_temporary, 'linked.md'));
        assert.throws(() => readReference('../private.md', _temporary), /relative Markdown/);
        assert.throws(() => readReference(_outside, _temporary), /relative Markdown/);
        // An installed reference root may itself be linked; a nested link outside it cannot escape.
        const _root = resolve(root, 'jaml/references');
        assert.ok(readReference('Styles/check.md', _root).text.startsWith('# check'));
        const _nested = resolve(_temporary, 'references');
        symlinkSync(resolve(root, 'wiki'), _nested);
        assert.throws(() => readReference('references/Styles/check.md', _temporary), /escapes/);
    } finally {
        rmSync(_temporary, { recursive: true, force: true });
    }
});

test('discovery is bounded, navigable, complete across pages and rejects malformed controls', () => {
    const _first = JSON.parse(run('list', 'style', 'layout.', '--limit', '2'));
    const _next = JSON.parse(run('list', 'style', 'layout.', '--limit', '2', '--offset', String(_first.nextOffset)));
    assert.equal(_first.entries.length, 2);
    assert.equal(_next.offset, 2);
    assert.ok(_first.total > 4);
    const _expected = catalog.entries.filter((entry) => entry.kind === 'style' && entry.path.startsWith('layout.'));
    assert.deepEqual(
        [..._first.entries, ..._next.entries].map((entry) => entry.path),
        _expected.slice(0, 4).map((entry) => entry.path)
    );
    const _all = JSON.parse(run('list', 'plugin', '--all'));
    assert.equal(_all.entries.length, _all.total);
    assert.equal(_all.nextOffset, null);
    for (const _args of [
        ['list', 'style', '--limit', '0'],
        ['list', 'style', '--offset', '-1'],
        ['read', 'Styles/check.md#missing'],
        ['show', 'style', 'check.frame', '--locale', 'fr'],
        ['choose', '--all']
    ]) {
        const _result = spawnSync(process.execPath, [cli, ..._args], { encoding: 'utf8' });
        assert.notEqual(_result.status, 0, _args.join(' '));
        assert.equal(_result.stdout, '');
    }
});
