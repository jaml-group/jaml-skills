import assert from 'node:assert/strict';
import test from 'node:test';
import { loadCatalog, lookup } from '../scripts/authoring/catalog.mjs';
import { projectGuides } from '../scripts/family-guides.mjs';

const catalog = await loadCatalog();
const cases = [
    ['style', 'size.fullsize'],
    ['style', 'check.underscore'],
    ['style', 'layout.grid'],
    ['plugin', 'interact.droppable'],
    ['style', 'interact.movable'],
    ['style', 'table.fixedrowheight'],
    ['style', 'interact.sortable']
];
function section(projection, kind, path) {
    const _target = projection.targets.get(kind + ':' + path);
    assert.ok(_target, kind + ':' + path);
    const _source = projection.files.get(_target.file);
    const _content = _source.split(`<a id="${_target.anchor}"></a>`)[1];
    assert.ok(_content, _target.file + '#' + _target.anchor);
    return _source.split('<a id="entry-')[0] + _content.split('<a id="entry-')[0];
}

test('direct entry documentation retains prose and complete argument dependency order in both locales', () => {
    for (const locale of ['en', 'zh']) {
        const _projection = projectGuides(catalog, locale);
        for (const [kind, path] of cases) {
            const _profile = lookup(catalog, kind, path, locale).profile;
            const _output = section(_projection, kind, path);
            const _page = _projection.files.get(_projection.targets.get(kind + ':' + path).file);
            for (const field of catalog.authoringFields) {
                if (_profile[field]) {
                    assert.ok(_page.includes(_profile[field]), path + ':' + field);
                }
            }
            const _args = Object.keys(_profile.args);
            if (_args.length) {
                assert.ok(_output.includes(_args.map((key) => '`' + key + '`').join(' → ')), path + ' argument order');
                for (const [key, arg] of Object.entries(_profile.args)) {
                    for (const field of ['desc', 'comment']) {
                        if (arg[field]) {
                            assert.ok(_output.includes(arg[field].replaceAll('|', '\\|').replaceAll('\n', '<br>')), path + ':' + key + ':' + field);
                        }
                    }
                }
            }
        }
    }
});

test('known limitations, state ownership and open-contract uncertainty remain alongside their entries', () => {
    const _projection = projectGuides(catalog);
    const _check = section(_projection, 'style', 'check.underscore');
    assert.match(_check, /does not implement tabs keyboard navigation/);
    assert.match(_check, /hide the existing locator when none is checked/);
    assert.match(_check, /delay is used before the first locator is created/);
    const _table = section(_projection, 'style', 'table.fixedrowheight');
    assert.match(_table, /supported animation name string or false/);
    assert.match(_table, /current animation callback calls string methods on a truthy value/);
    assert.match(_table, /Expanded detail rows disable the fixed virtual path/);
    const _drop = section(_projection, 'plugin', 'interact.droppable');
    assert.match(_drop, /[Nn]on-function accept values currently fall back to accepting drags/);
    assert.match(_drop, /not a file importer or a security boundary/);
    assert.match(_drop, /Unplug removes the drop-zone registration; document drag listeners remain shared/);
    assert.match(section(_projection, 'style', 'interact.sortable'), /does not persist the application model/);
    const _open = section(_projection, 'style', 'interact.movable');
    assert.match(_open, /jam.makeMovable/);
    assert.match(_open, /no inferred types, defaults or completion/);
    assert.match(_open, /HTMLElement/);
    assert.match(_open, /intent-interact-movable/);
    assert.match(_open, /Unmount, style teardown or host destruction/);
    assert.match(_open, /does not restore previous coordinates/);
});

test('constraints, UI hints, raw options and unfamiliar metadata survive family projection without mutating the source', () => {
    const _metadata = structuredClone(catalog.metadata);
    const _entry = catalog.entries.find((entry) => entry.kind === 'style' && entry.path === 'layout.grid');
    const _profile = _metadata.styles.schemaTable[_entry.schemaRef];
    Object.assign(_profile, {
        appearance: 'Accessible control remains caller-owned.',
        comment: 'Ordering differs from the alternate variant.',
        extraObligation: { requiredIntegration: 'future-owner' },
        args: {
            amount: { type: 'number', default: 0, min: -2, max: 4, step: 0.5, tuner: { min: 0, max: 1, step: 0.1 }, desc: 'Amount', dependsOn: ['mode'] },
            mode: { type: 'any', default: false, options: [false, null, { value: { mode: 'bounded' }, name: 'Bounded', comment: 'Needs amount' }], desc: 'Mode', tuner: { min: 0, obligation: 'Never lose this unfamiliar metadata' } },
            blank: { type: 'any', default: null, tuner: {}, desc: '', comment: '' },
            opaque: { type: 'any', defaultMetadata: { kind: 'opaque', valueType: 'function' }, tuner: { step: 'dynamic' } }
        }
    });
    const _before = structuredClone(_metadata);
    const _sample = { ...catalog, metadata: _metadata, entries: [...catalog.reader.catalogEntries(_metadata)] };
    for (const locale of ['en', 'zh']) {
        const _output = section(projectGuides(_sample, locale), 'style', _entry.path);
        for (const token of ['future-owner', 'Accessible control remains caller-owned.', 'Ordering differs from the alternate variant.', '"min":-2', '"max":4', '"step":0.5', '"dependsOn":["mode"]', '"min":0', '"max":1', '"step":0.1', 'false', 'null', 'bounded', 'Bounded', 'Needs amount', 'Never lose this unfamiliar metadata', 'dynamic', 'function']) {
            assert.ok(_output.includes(token), token);
        }
        assert.match(_output, locale === 'zh' ? /非运行时/ : /not runtime/);
    }
    assert.deepEqual(_metadata, _before);
});

test('aliases share a target only when their complete resolved contracts agree', () => {
    for (const locale of ['en', 'zh']) {
        const _projection = projectGuides(catalog, locale);
        const _view = catalog.reader.resolveAuthoringManifests(catalog.metadata, locale);
        for (const [key, target] of _projection.targets) {
            const [kind, path] = key.split(':');
            const _schemas = _view[kind === 'style' ? 'styles' : 'plugins'].argSchemas;
            assert.deepEqual(_schemas[path], _schemas[target.path], key);
        }
        const _root = _projection.targets.get('style:text.mono');
        const _contextual = _projection.targets.get('style:cap.text.mono');
        assert.ok(_root);
        assert.ok(_contextual);
        assert.notEqual(_root.file + '#' + _root.anchor, _contextual.file + '#' + _contextual.anchor);
    }
});

test('metadata-owned guides keep runnable examples and their assets in source reading order', () => {
    const _examples = (guide) => [...(guide.examples ?? []), ...(guide.sections ?? []).flatMap(_examples)];
    let _count = 0;
    for (const locale of ['en', 'zh']) {
        const _projection = projectGuides(catalog, locale);
        const _view = catalog.reader.resolveAuthoringManifests(catalog.metadata, locale);
        for (const manifest of [_view.styles, _view.plugins]) {
            for (const record of Object.values(manifest.guides ?? {})) {
                const _guide = record.guide;
                if (!_guide?.file) {
                    continue;
                }
                const _file = locale === 'zh' ? _guide.file.replace(/\.md$/, '.zh.md') : _guide.file;
                const _page = _projection.files.get(_file);
                assert.ok(_page, _file);
                let _previous = -1;
                for (const example of _examples(_guide)) {
                    const _index = _page.indexOf(example.source.trimEnd(), _previous + 1);
                    assert.ok(_index > _previous, _file + ' example order');
                    _previous = _index;
                    _count++;
                    for (const [file, source] of Object.entries(example.assets ?? {})) {
                        assert.equal(_projection.files.get(file), source, file);
                    }
                }
            }
        }
    }
    assert.ok(_count > 0, 'Metadata-owned family guides must retain runnable examples');
});
