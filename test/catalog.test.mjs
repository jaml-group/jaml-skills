import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { posix, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { hash, inspectPublicData, loadCatalog, lookup } from '../scripts/authoring/catalog.mjs';
import { generateReferences, renderReferences } from '../scripts/catalog-reference.mjs';
import { projectGuides } from '../scripts/family-guides.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const catalog = await loadCatalog(resolve(root, 'scripts/authoring/catalog'));
const projections = new WeakMap();
function entryText(sample, kind, path, locale = 'en') {
    if (!projections.has(sample)) {
        projections.set(sample, new Map());
    }
    const _locales = projections.get(sample);
    if (!_locales.has(locale)) {
        _locales.set(locale, projectGuides(sample, locale));
    }
    const _projection = _locales.get(locale);
    const _target = _projection.targets.get(kind + ':' + path);
    assert.ok(_target, kind + ':' + path);
    const _source = _projection.files.get(_target.file);
    const _entry = _source.split(`<a id="${_target.anchor}"></a>`)[1];
    assert.ok(_entry, _target.file + '#' + _target.anchor);
    return _entry.split('<a id="entry-')[0];
}

function contractText(sample, kind, path, locale) {
    const _entry = entryText(sample, kind, path, locale);
    const _projection = projections.get(sample).get(locale);
    const _target = _projection.targets.get(kind + ':' + path);
    const _visited = new Set();
    const _expand = (text, file) => {
        let _result = text;
        for (const match of text.matchAll(/^(?:Common arguments|公共参数): \[[^\]]+\]\(([^)]+)\)\./gm)) {
            const [relative, anchor] = match[1].split('#');
            const _file = relative ? posix.normalize(posix.join(posix.dirname(file), relative)) : file;
            const _identity = _file + '#' + anchor;
            assert.ok(!_visited.has(_identity), 'Shared argument cycle: ' + _identity);
            _visited.add(_identity);
            const _source = _projection.files.get(_file);
            assert.ok(_source, 'Missing shared argument page: ' + _file);
            const _section = _source.split(`<a id="${anchor}"></a>`)[1];
            assert.ok(_section, 'Missing shared argument anchor: ' + _identity);
            _result += '\n' + _expand(_section.split('<a id="')[0], _file);
        }
        return _result;
    };
    return _expand(_entry, _target.file);
}

test('every exported path preserves runtime values and source argument order in both languages', () => {
    for (const locale of ['en', 'zh']) {
        const _view = catalog.reader.resolveAuthoringManifests(catalog.metadata, locale);
        const _projection = projectGuides(catalog, locale);
        assert.equal(_projection.targets.size, catalog.entries.length);
        for (const entry of catalog.entries) {
            const _kind = entry.kind === 'style' ? 'styles' : 'plugins';
            const _raw = catalog.metadata[_kind].schemaTable[entry.schemaRef];
            const _resolved = _view[_kind].argSchemas[entry.path];
            const _target = _projection.targets.get(entry.kind + ':' + entry.path);
            assert.ok(_projection.files.has(_target.file), entry.id);
            assert.deepEqual(Object.keys(_resolved.args), Object.keys(_raw.args), entry.id);
            for (const [key, value] of Object.entries(_raw)) {
                if (key !== 'args' && !catalog.authoringFields.includes(key)) {
                    assert.deepEqual(_resolved[key], value, entry.id + ':' + key);
                }
            }
            for (const [key, arg] of Object.entries(_raw.args)) {
                for (const [field, value] of Object.entries(arg)) {
                    if (!['desc', 'comment', 'options'].includes(field)) {
                        assert.deepEqual(_resolved.args[key][field], value, entry.id + ':' + key + '.' + field);
                    }
                }
                if (!arg.options) {
                    continue;
                }
                assert.equal(_resolved.args[key].options.length, arg.options.length);
                for (const [index, option] of arg.options.entries()) {
                    const _localized = _resolved.args[key].options[index];
                    if (option && typeof option === 'object') {
                        for (const [field, value] of Object.entries(option)) {
                            if (!['name', 'desc'].includes(field)) {
                                assert.deepEqual(_localized[field], value);
                            }
                        }
                    } else {
                        assert.deepEqual(_localized, option);
                    }
                }
            }
        }
    }
});

test('translations preserve option values, fallback and canonical identities', () => {
    const _english = lookup(catalog, 'style', 'layout.application', 'en');
    const _chinese = lookup(catalog, 'style', 'layout.application', 'zh');
    assert.equal(_english.profile.desc, 'Bounded application layout');
    assert.equal(_chinese.profile.desc, '有界应用布局');
    assert.deepEqual(
        _english.profile.args.scroll.options.map((option) => option.value),
        _chinese.profile.args.scroll.options.map((option) => option.value)
    );
    assert.notDeepEqual(
        _english.profile.args.scroll.options.map((option) => option.name),
        _chinese.profile.args.scroll.options.map((option) => option.name)
    );
    const _messages = structuredClone(catalog.metadata.catalog);
    const _key = 'style.layout.application.desc';
    delete _messages.messages.zh[_key];
    const _translator = catalog.reader.createAuthoringTranslator(_messages, 'zh');
    assert.equal(_translator.core.hasTranslation('zh', _key), false);
    assert.equal(_translator.translate(_key), _messages.messages.en[_key]);
    assert.deepEqual(lookup(catalog, 'style', 'stylize.bento').profile, lookup(catalog, 'style', 'group.bento').profile);
    assert.equal(lookup(catalog, 'style', 'stylize.bento').canonicalId, '@jam/jam-ui/style/group.bento');
    assert.throws(() => lookup(catalog, 'style', 'not-an-exported-path'), /Unknown catalog path/);
});

test('literal prose, explicit translations and compatibility keys retain distinct semantics', () => {
    const _entry = catalog.entries.find((entry) => entry.kind === 'style' && entry.path === 'layout.application');
    for (const format of ['translations', undefined]) {
        const _metadata = structuredClone(catalog.metadata);
        Object.assign(_metadata.catalog.messages.en, { 'fixture.title': 'Title', 'fixture.named': 'Hello {who}', 'fixture.position': '{0}: {1}', 'fixture.fallback': 'Fallback only' });
        Object.assign(_metadata.catalog.messages.zh, { 'fixture.title': '标题', 'fixture.named': '你好 {who}', 'fixture.position': '{0}：{1}' });
        const _schema = {
            ...(format ? { documentationFormat: format } : {}),
            desc: 'fixture.title',
            comment: '@tr(fixture.named, {who: "Ada"})',
            purpose: '@tr(fixture.title)',
            behavior: '@tr(fixture.position, "Ada", 2)',
            appearance: '',
            lifecycle: '@tr(fixture.fallback)',
            caveats: '@tr(fixture.missing)',
            hosts: ['@tr(fixture.title)'],
            args: {
                mode: {
                    type: 'string',
                    default: '@tr(fixture.title)',
                    desc: '@tr(fixture.title)',
                    comment: 'fixture.title',
                    options: [
                        { value: '@tr(fixture.title)', name: '@tr(fixture.title)', desc: 'Runtime option description' },
                        { value: false, name: 'fixture.title' }
                    ]
                }
            }
        };
        _metadata.styles.schemaTable[_entry.schemaRef] = _schema;
        const _sample = { ...catalog, metadata: _metadata, entries: [...catalog.reader.catalogEntries(_metadata)] };
        for (const locale of ['en', 'zh']) {
            const _profile = lookup(_sample, 'style', _entry.path, locale).profile;
            const _title = locale === 'zh' ? '标题' : 'Title';
            assert.equal(_profile.desc, 'fixture.title');
            assert.equal(_profile.comment, locale === 'zh' ? '你好 Ada' : 'Hello Ada');
            assert.equal(_profile.purpose, _title);
            assert.equal(_profile.behavior, locale === 'zh' ? 'Ada：2' : 'Ada: 2');
            assert.equal(_profile.appearance, '');
            assert.equal(_profile.lifecycle, 'Fallback only');
            assert.equal(_profile.caveats, 'fixture.missing');
            assert.deepEqual(_profile.hosts, _schema.hosts);
            assert.equal(_profile.args.mode.desc, _title);
            assert.equal(_profile.args.mode.comment, 'fixture.title');
            assert.equal(_profile.args.mode.default, '@tr(fixture.title)');
            assert.deepEqual(_profile.args.mode.options, [
                { value: '@tr(fixture.title)', name: _title, desc: 'Runtime option description' },
                { value: false, name: 'fixture.title' }
            ]);
            const _page = entryText(_sample, 'style', _entry.path, locale);
            for (const field of ['desc', 'comment', 'purpose', 'behavior', 'lifecycle', 'caveats']) {
                assert.ok(_page.includes(_profile[field]), format + ':' + locale + ':' + field);
            }
            assert.ok(_page.includes('Runtime option description'));
            assert.ok(!_page.includes('undefined'));
        }
    }
});

test('compatibility message-key artifacts still resolve bare prose and option labels', () => {
    const _metadata = structuredClone(catalog.metadata);
    const _entry = catalog.entries.find((entry) => entry.kind === 'style' && entry.path === 'layout.application');
    _metadata.styles.schemaTable[_entry.schemaRef] = {
        documentationFormat: 'messages',
        desc: 'style.layout.application.desc',
        args: { mode: { desc: 'style.layout.application.desc', options: [{ value: 'raw-value', name: 'style.layout.application.desc' }] } }
    };
    const _sample = { ...catalog, metadata: _metadata, entries: [...catalog.reader.catalogEntries(_metadata)] };
    for (const locale of ['en', 'zh']) {
        const _result = lookup(_sample, 'style', _entry.path, locale);
        const _expected = _metadata.catalog.messages[locale]['style.layout.application.desc'];
        assert.equal(_result.profile.desc, _expected);
        assert.equal(_result.profile.args.mode.desc, _expected);
        assert.deepEqual(_result.profile.args.mode.options, [{ value: 'raw-value', name: _expected }]);
        assert.ok(entryText(_sample, 'style', _entry.path, locale).includes(_expected));
    }
});

test('offline projection rejects binding context and invalid translation wrappers', () => {
    const _metadata = structuredClone(catalog.metadata);
    const _entry = catalog.entries.find((entry) => entry.kind === 'style' && entry.path === 'layout.application');
    const _schema = _metadata.styles.schemaTable[_entry.schemaRef];
    _schema.desc = '@tr(fixture.named, {who: {{person}}})';
    assert.throws(() => renderReferences({ ...catalog, metadata: _metadata }), /component binding context/);
    _schema.desc = '@tr(fixture.named, @tr(fixture.other))';
    assert.throws(() => renderReferences({ ...catalog, metadata: _metadata }), /Nested @tr wrappers/);
});

test('locator inputs and localized captions remain distinct from option values', () => {
    for (const locale of ['en', 'zh']) {
        for (const path of ['check.frame', 'check.shade', 'check.underscore', 'check.pipe', 'hover.frame', 'hover.shade', 'hover.crosshair', 'layer.crosshair', 'table.hovermarker']) {
            const _profile = lookup(catalog, 'style', path, locale).profile;
            const _radiusComment = locale === 'zh' ? 'auto：自动适配元素；数值表示半径，单位为 px。' : 'auto: fit the element automatically; a numeric value specifies the radius in px.';
            assert.equal(_profile.args.radius.comment, _radiusComment, path);
            const _page = contractText(catalog, 'style', path, locale);
            assert.ok(_page.includes(_profile.args.width.desc), path);
            assert.ok(_page.includes(_radiusComment), path);
        }
        const _i18n = lookup(catalog, 'plugin', 'i18n', locale).profile;
        assert.equal(_i18n.desc, locale === 'zh' ? '加载翻译目录' : 'Load translation catalogs');
        assert.equal(_i18n.args.file.default, 'common');
        assert.equal(_i18n.args.file.shorthand, true);
        assert.ok(entryText(catalog, 'plugin', 'i18n', locale).includes(_i18n.args.file.desc));
        const _table = lookup(catalog, 'style', 'table.hovermarker', locale).profile;
        assert.deepEqual(
            _table.args.type.options.map((option) => option.value),
            ['row', 'column', 'td']
        );
        assert.deepEqual(
            _table.args.type.options.map((option) => option.name),
            locale === 'zh' ? ['行', '列', '单元格'] : ['Row', 'Column', 'Cell']
        );
        const _page = entryText(catalog, 'style', 'table.hovermarker', locale);
        for (const option of _table.args.type.options) {
            assert.ok(_page.includes(option.name));
        }
    }
});

test('UI tuner hints retain their source values without becoming runtime constraints', () => {
    let _hinted = 0;
    const _view = catalog.reader.resolveAuthoringManifests(catalog.metadata, 'en');
    for (const entry of catalog.entries) {
        const _schema = catalog.metadata[entry.kind === 'style' ? 'styles' : 'plugins'].schemaTable[entry.schemaRef];
        const _profile = _view[entry.kind === 'style' ? 'styles' : 'plugins'].argSchemas[entry.path];
        for (const [key, arg] of Object.entries(_schema.args)) {
            if (Object.hasOwn(arg, 'tuner')) {
                _hinted++;
                assert.deepEqual(_profile.args[key].tuner, arg.tuner);
                for (const field of ['min', 'max', 'step']) {
                    assert.equal(Object.hasOwn(_profile.args[key], field), Object.hasOwn(arg, field));
                }
            }
        }
    }
    assert.ok(_hinted > 0);
    for (const locale of ['en', 'zh']) {
        const _page = contractText(catalog, 'style', 'layer.background', locale);
        assert.ok(_page.includes(JSON.stringify(lookup(catalog, 'style', 'layer.background', locale).profile.args.opacity.tuner)));
        assert.match(_page, locale === 'zh' ? /非运行时/ : /not runtime/);
    }
    for (const path of ['layer.css', 'layer.progress', 'layer.progress.bar']) {
        assert.equal(lookup(catalog, 'style', path).profile.args.opacity.tuner, undefined, path);
    }
});

test('raw defaults and option ordering remain visible in localized family pages', () => {
    for (const locale of ['en', 'zh']) {
        const _schema = lookup(catalog, 'style', 'layout.application', locale).profile;
        const _page = entryText(catalog, 'style', 'layout.application', locale);
        assert.ok(_page.includes(JSON.stringify(_schema.args.frame.default)));
        const _row = _page.split('\n').find((line) => line.startsWith('| `scroll` |'));
        assert.ok(_row.indexOf('content') < _row.indexOf('regions'));
        assert.ok(_row.includes(locale === 'zh' ? '内容滚动' : 'Content scrolls'));
    }
});

test('raw objects, wrapped objects, null, opaque values and option metadata survive projection', () => {
    const _metadata = structuredClone(catalog.metadata);
    const _entry = catalog.entries.find((entry) => entry.path === 'layout.application' && entry.kind === 'style');
    const _rawObject = { mode: 'compact', name: 'literal runtime name', desc: 'literal runtime payload' };
    const _legacyRecord = { name: 'legacy name', desc: 'legacy description' };
    _metadata.styles.schemaTable[_entry.schemaRef].args = {
        mode: { type: 'any', defaultMetadata: { kind: 'opaque', valueType: 'function' }, options: [_rawObject, { value: { mode: 'wide' }, name: 'Object wrapper', desc: 'Wrapper caption', requires: 'owner' }, _legacyRecord, null, { valueMetadata: { kind: 'opaque', valueType: 'object' } }, { value: 'later', name: 'Later option' }] },
        numeric: { type: 'any', defaultMetadata: { kind: 'opaque', valueType: 'number' } }
    };
    for (const locale of ['en', 'zh']) {
        const _page = entryText({ ...catalog, metadata: _metadata }, 'style', _entry.path, locale);
        for (const token of [JSON.stringify(_rawObject), '{"mode":"wide"}', 'Object wrapper', 'Wrapper caption', 'requires', 'owner', JSON.stringify(_legacyRecord), 'null', 'object', 'function', 'Later option']) {
            assert.ok(_page.includes(token), locale + ':' + token);
        }
        assert.ok(_page.indexOf('compact') < _page.indexOf('wide'));
        assert.ok(_page.indexOf('wide') < _page.indexOf('legacy name'));
        assert.ok(_page.indexOf('legacy name') < _page.indexOf('Later option'));
        assert.ok(!_page.includes('`undefined`'));
        const _numeric = _page.split('\n').find((line) => line.startsWith('| `numeric` |'));
        assert.match(_numeric, /number/);
        assert.doesNotMatch(_numeric, /function/);
    }
});

test('open forwarding identifies the owner and retains uncertainty without inventing arguments', () => {
    for (const [kind, path, owner] of [
        ['style', 'interact.movable', 'jam.makeMovable'],
        ['style', 'interact.resizable', 'jam.makeResizable'],
        ['plugin', 'router', 'jam.AbstractRouter'],
        ['plugin', 'subRouter', 'jam.AbstractRouter']
    ]) {
        const _actual = lookup(catalog, kind, path).profile;
        assert.equal(_actual.argumentContract, 'passthrough');
        assert.equal(_actual.argumentSource, owner);
        assert.equal(_actual.allowUnknown, true);
        assert.deepEqual(_actual.args, {});
        for (const locale of ['en', 'zh']) {
            const _page = entryText(catalog, kind, path, locale);
            assert.ok(_page.includes(owner));
            assert.match(_page, locale === 'zh' ? /未声明字段.*类型、默认值和补全尚不可用/ : /Undeclared fields have no inferred types, defaults or completion/);
            assert.ok(!_page.includes(locale === 'zh' ? '| 参数 | 类型 |' : '| Argument | Type |'));
        }
    }
});

test('source fixture references retain IDs and metadata while invalid IDs remain inert', () => {
    const _seen = new Set();
    const _fixtureIds = new Set();
    for (const entry of catalog.entries) {
        const _key = `${entry.kind}/${entry.schemaRef}`;
        if (_seen.has(_key)) {
            continue;
        }
        _seen.add(_key);
        const _schema = catalog.metadata[entry.kind === 'style' ? 'styles' : 'plugins'].schemaTable[entry.schemaRef];
        if (!_schema.examples?.length) {
            continue;
        }
        for (const locale of ['en', 'zh']) {
            const _profile = lookup(catalog, entry.kind, entry.path, locale).profile;
            const _page = entryText(catalog, entry.kind, entry.path, locale);
            for (const field of ['examples', 'hosts', 'states']) {
                assert.deepEqual(_profile[field], _schema[field]);
            }
            for (const example of _schema.examples) {
                _fixtureIds.add(example);
                assert.match(example, /^[a-zA-Z0-9_-]+$/);
                assert.ok(_page.includes(`#/testground?jaml=${example}`));
            }
            assert.ok(!_page.includes('](#/testground'), 'Wiki hash links are not testground navigation links');
        }
    }
    assert.ok(_fixtureIds.size > 0);
    const _metadata = structuredClone(catalog.metadata);
    const _entry = catalog.entries.find((entry) => entry.kind === 'style' && entry.path === 'layout.application');
    _metadata.styles.schemaTable[_entry.schemaRef].examples = ['../outside', 'https://example.invalid/run', 'name?run=1'];
    const _page = entryText({ ...catalog, metadata: _metadata }, 'style', _entry.path);
    assert.ok(!_page.includes('#/testground?jaml='));
    for (const example of _metadata.styles.schemaTable[_entry.schemaRef].examples) {
        assert.ok(_page.includes(example));
    }
});

test('generation is deterministic and freshness rejects hand edits and obsolete generated pages', async () => {
    assert.deepEqual(renderReferences(catalog), renderReferences(catalog));
    const _temporary = mkdtempSync(resolve(tmpdir(), 'jaml-family-freshness-'));
    try {
        cpSync(resolve(root, 'scripts/authoring/catalog'), resolve(_temporary, 'scripts/authoring/catalog'), { recursive: true });
        await generateReferences(_temporary);
        await generateReferences(_temporary, { check: true });
        const _guide = resolve(_temporary, 'wiki/curated.md');
        writeFileSync(_guide, '# Curated guide\n\nPreserved unrelated prose.\n');
        await generateReferences(_temporary, { check: true });
        const _target = resolve(_temporary, 'wiki/Styles/check.md');
        writeFileSync(_target, readFileSync(_target, 'utf8') + '\nhand edit\n');
        await assert.rejects(generateReferences(_temporary, { check: true }), /stale/);
        await generateReferences(_temporary);
        assert.equal(readFileSync(_guide, 'utf8'), '# Curated guide\n\nPreserved unrelated prose.\n');
        writeFileSync(resolve(_temporary, 'wiki/Styles/obsolete.md'), '# Obsolete\n\n<!-- Generated from native authoring; do not edit. -->\n');
        await assert.rejects(generateReferences(_temporary, { check: true }), /Unexpected generated guide/);
    } finally {
        rmSync(_temporary, { recursive: true, force: true });
    }
});

test('pinned publisher code is verified before import and signed data rejects stale claims', async () => {
    const _temporary = mkdtempSync(resolve(tmpdir(), 'jaml-catalog-integrity-'));
    try {
        cpSync(resolve(root, 'scripts/authoring/catalog'), _temporary, { recursive: true });
        const _reader = resolve(_temporary, 'authoringView.mjs');
        writeFileSync(_reader, readFileSync(_reader, 'utf8') + '\nglobalThis.catalogShouldNotExecute = true;\n');
        await assert.rejects(loadCatalog(_temporary), /Catalog integrity mismatch/);
        assert.equal(globalThis.catalogShouldNotExecute, undefined);
        cpSync(resolve(root, 'scripts/authoring/catalog'), _temporary, { recursive: true });
        const _dataFile = resolve(_temporary, 'catalog.json');
        const _data = JSON.parse(readFileSync(_dataFile, 'utf8'));
        _data.catalog.messages.en['style.layout.application.desc'] = 'changed';
        writeFileSync(_dataFile, JSON.stringify(_data));
        const _pinFile = resolve(_temporary, 'pin.json');
        const _artifactFile = resolve(_temporary, 'artifact.json');
        const _pin = JSON.parse(readFileSync(_pinFile, 'utf8'));
        const _artifact = JSON.parse(readFileSync(_artifactFile, 'utf8'));
        _pin.files['catalog.json'] = _artifact.files['catalog.json'] = hash(readFileSync(_dataFile));
        writeFileSync(_artifactFile, JSON.stringify(_artifact));
        _pin.files['artifact.json'] = hash(readFileSync(_artifactFile));
        writeFileSync(_pinFile, JSON.stringify(_pin));
        await assert.rejects(loadCatalog(_temporary), /catalog digest mismatch/);
    } finally {
        rmSync(_temporary, { recursive: true, force: true });
    }
});

test('public data rejects framework registries, private paths and source signatures', () => {
    assert.throws(() => inspectPublicData({ ...catalog.metadata, registries: {} }), /Unsupported public/);
    const _private = structuredClone(catalog.metadata);
    _private.styles.sourceSignature = 'private-source';
    assert.throws(() => inspectPublicData(_private), /Unsupported public/);
    const _path = structuredClone(catalog.metadata);
    _path.styles.schemaTable[0].desc = '/Users/private/source';
    assert.throws(() => inspectPublicData(_path), /Private provenance/);
});
