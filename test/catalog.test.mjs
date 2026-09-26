import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { hash, inspectPublicData, loadCatalog, lookup, profilePath } from '../jaml/scripts/catalog.mjs';
import { generateReferences, renderReferences } from '../scripts/catalog-reference.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const catalog = await loadCatalog(resolve(root, 'jaml/catalog'));

test('every exported path maps to a generated profile with identical runtime values and source order in both languages', () => {
    const _files = renderReferences(catalog);
    const _index = JSON.parse(_files.get('index.json'));
    assert.equal(
        _index.profiles.reduce((count, profile) => count + profile.paths, 0),
        catalog.entries.length
    );
    assert.equal(_index.catalogDigest, catalog.metadata.catalog.digest);
    assert.equal(_index.schemaDigest, catalog.metadata.catalog.schemaDigest);
    assert.equal(_index.aliases.length, catalog.entries.filter((entry) => entry.id !== entry.canonicalId).length);
    for (const locale of ['en', 'zh']) {
        const _view = catalog.reader.resolveAuthoringManifests(catalog.metadata, locale);
        for (const entry of catalog.entries) {
            const _kind = entry.kind === 'style' ? 'styles' : 'plugins';
            const _raw = catalog.metadata[_kind].schemaTable[entry.schemaRef];
            const _resolved = _view[_kind].argSchemas[entry.path];
            assert.ok(_files.has(profilePath(entry, locale)), entry.id);
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

test('shared translation resolves prose and option labels while fallback and canonical identities stay intact', () => {
    const _english = lookup(catalog, 'style', 'layout.application', 'en');
    const _chinese = lookup(catalog, 'style', 'layout.application', 'zh');
    assert.equal(_english.profile.desc, 'Bounded application layout');
    assert.equal(_chinese.profile.desc, '有界应用布局');
    const _enOptions = _english.profile.args.scroll.options;
    const _zhOptions = _chinese.profile.args.scroll.options;
    assert.deepEqual(
        _enOptions.map((option) => option.value),
        _zhOptions.map((option) => option.value)
    );
    assert.notDeepEqual(
        _enOptions.map((option) => option.name),
        _zhOptions.map((option) => option.name)
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

test('mixed literal and explicit translation prose renders through the shared reader in current and legacy schemas', () => {
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
        const _files = renderReferences(_sample);
        for (const locale of ['en', 'zh']) {
            const _result = lookup(_sample, 'style', _entry.path, locale);
            const _profile = _result.profile;
            const _title = locale === 'zh' ? '标题' : 'Title';
            assert.equal(_result.format, format ?? 'legacy');
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
            const _page = _files.get(profilePath(_entry, locale));
            assert.ok(_page.includes(_profile.comment));
            assert.ok(_page.includes(_profile.behavior));
            assert.ok(_page.includes(locale === 'zh' ? '显式 @tr(...) 引用' : 'explicit @tr(...) references'));
            assert.ok(!_page.includes('undefined'));
        }
        assert.ok(_files.get('index.md').includes('does not automatically discover external catalogs'));
    }
});

test('compatibility messages artifacts still resolve bare keys and render the compatibility label', () => {
    const _metadata = structuredClone(catalog.metadata);
    const _entry = catalog.entries.find((entry) => entry.kind === 'style' && entry.path === 'layout.application');
    _metadata.styles.schemaTable[_entry.schemaRef] = { documentationFormat: 'messages', desc: 'style.layout.application.desc', args: { mode: { desc: 'style.layout.application.desc', options: [{ value: 'raw-value', name: 'style.layout.application.desc' }] } } };
    const _sample = { ...catalog, metadata: _metadata, entries: [...catalog.reader.catalogEntries(_metadata)] };
    const _files = renderReferences(_sample);
    for (const locale of ['en', 'zh']) {
        const _result = lookup(_sample, 'style', _entry.path, locale);
        const _expected = _metadata.catalog.messages[locale]['style.layout.application.desc'];
        assert.equal(_result.format, 'messages');
        assert.equal(_result.profile.desc, _expected);
        assert.equal(_result.profile.args.mode.desc, _expected);
        assert.deepEqual(_result.profile.args.mode.options, [{ value: 'raw-value', name: _expected }]);
        const _page = _files.get(profilePath(_entry, locale));
        assert.ok(_page.includes(_expected));
        assert.ok(_page.includes(locale === 'zh' ? '兼容消息键元数据' : 'Compatibility message-key metadata'));
    }
});

test('offline translation rejects binding context and invalid wrappers through the publisher reader', () => {
    const _metadata = structuredClone(catalog.metadata);
    const _entry = catalog.entries.find((entry) => entry.kind === 'style' && entry.path === 'layout.application');
    const _schema = _metadata.styles.schemaTable[_entry.schemaRef];
    _schema.desc = '@tr(fixture.named, {who: {{person}}})';
    assert.throws(() => renderReferences({ ...catalog, metadata: _metadata }), /component binding context/);
    _schema.desc = '@tr(fixture.named, @tr(fixture.other))';
    assert.throws(() => renderReferences({ ...catalog, metadata: _metadata }), /Nested @tr wrappers/);
});

test('native source documentation retains locator inputs and localized captions without changing option values', () => {
    const _files = renderReferences(catalog);
    for (const locale of ['en', 'zh']) {
        for (const path of ['check.frame', 'check.shade', 'check.underscore', 'check.pipe', 'hover.frame', 'hover.shade', 'hover.crosshair', 'layer.crosshair', 'table.hovermarker']) {
            const _result = lookup(catalog, 'style', path, locale);
            assert.equal(_result.profile.args.width.desc, '边框宽度', path);
            assert.equal(_result.profile.args.radius.comment, 'auto:自动适配元素;数值表示半径,单位是px', path);
            const _page = _files.get(profilePath(_result, locale));
            assert.ok(_page.includes('边框宽度'), path);
            assert.ok(_page.includes('auto:自动适配元素;数值表示半径,单位是px'), path);
        }
        for (const role of ['frame', 'shade', 'underscore', 'pipe']) {
            const _result = lookup(catalog, 'style', 'check.' + role, locale);
            assert.equal(_result.profile.desc, catalog.metadata.catalog.messages[locale]['native.check.' + role + '.desc']);
            assert.ok(_files.get(profilePath(_result, locale)).includes(_result.profile.desc));
        }
        const _i18n = lookup(catalog, 'plugin', 'i18n', locale);
        assert.equal(_i18n.profile.desc, locale === 'zh' ? '加载翻译目录' : 'Load translation catalogs');
        assert.equal(_i18n.profile.args.file.desc, locale === 'zh' ? '翻译目录' : 'Translation catalogs');
        assert.equal(_i18n.profile.args.file.default, 'common');
        assert.equal(_i18n.profile.args.file.shorthand, true);
        assert.ok(_files.get(profilePath(_i18n, locale)).includes(_i18n.profile.args.file.desc));
        const _table = lookup(catalog, 'style', 'table.hovermarker', locale);
        assert.deepEqual(
            _table.profile.args.type.options.map((option) => option.value),
            ['row', 'column', 'td']
        );
        assert.deepEqual(
            _table.profile.args.type.options.map((option) => option.name),
            locale === 'zh' ? ['行', '列', '单元格'] : ['Row', 'Column', 'Cell']
        );
        const _page = _files.get(profilePath(_table, locale));
        for (const option of _table.profile.args.type.options) {
            assert.ok(_page.includes('`' + JSON.stringify(option.value) + '` | ' + option.name));
        }
    }
});

test('tuner hints retain source values and are labeled as UI guidance separately from runtime constraints', () => {
    const _files = renderReferences(catalog);
    let _hinted = 0;
    for (const locale of ['en', 'zh']) {
        const _view = catalog.reader.resolveAuthoringManifests(catalog.metadata, locale);
        for (const entry of catalog.entries) {
            const _kind = entry.kind === 'style' ? 'styles' : 'plugins';
            const _schema = catalog.metadata[_kind].schemaTable[entry.schemaRef];
            const _profile = _view[_kind].argSchemas[entry.path];
            const _hints = Object.entries(_schema.args).filter(([, arg]) => Object.hasOwn(arg, 'tuner'));
            const _page = _files.get(profilePath(entry, locale));
            const _note = locale === 'zh' ? '不是运行时校验约束' : 'not runtime validation constraints';
            assert.equal(_page.includes(_note), _hints.length > 0, entry.path);
            for (const [key, arg] of _hints) {
                _hinted++;
                assert.deepEqual(_profile.args[key].tuner, arg.tuner);
                assert.ok(_page.includes(JSON.stringify(arg.tuner)));
                for (const field of ['min', 'max', 'step']) {
                    assert.equal(Object.hasOwn(_profile.args[key], field), Object.hasOwn(arg, field));
                }
            }
        }
    }
    assert.ok(_hinted > 0);
    for (const path of ['layer.css', 'layer.progress', 'layer.progress.bar']) {
        assert.equal(lookup(catalog, 'style', path).profile.args.opacity.tuner, undefined, path);
    }
    const _metadata = structuredClone(catalog.metadata);
    const _entry = catalog.entries.find((entry) => entry.kind === 'style' && entry.path === 'layer.background');
    _metadata.styles.schemaTable[_entry.schemaRef].args.opacity.tuner = { min: 0, max: 1, step: 0.2 };
    const _fixture = { ...catalog, metadata: _metadata };
    const _page = renderReferences(_fixture).get(profilePath(_entry));
    assert.ok(_page.includes('"tuner":{"min":0,"max":1,"step":0.2}'));
    assert.ok(_page.includes('not runtime validation constraints'));
    const _arg = lookup(_fixture, 'style', _entry.path).profile.args.opacity;
    assert.equal(Object.hasOwn(_arg, 'min'), false);
    assert.equal(Object.hasOwn(_arg, 'max'), false);
});

test('generated tables include raw defaults, option order, constraints and explicit missing/legacy coverage', () => {
    const _files = renderReferences(catalog);
    const _entry = catalog.entries.find((entry) => entry.path === 'layout.application' && entry.kind === 'style');
    const _page = _files.get(profilePath(_entry));
    const _schema = lookup(catalog, 'style', 'layout.application').profile;
    assert.ok(_page.includes('`' + JSON.stringify(_schema.args.frame.default) + '`'));
    const _options = _page.split('### scroll')[1];
    assert.ok(_options.indexOf('"content"') < _options.indexOf('"regions"'));
    assert.ok(_page.includes('Content scrolls'));
    assert.ok(_files.get(profilePath(_entry, 'zh')).includes('内容滚动'));
    assert.ok(_files.get('index.md').includes(`**${catalog.metadata.catalog.coverage.compatibility} paths**`));
    assert.ok(_files.get('index.md').includes('Plain prose stays literal'));
    assert.ok(_files.get('index.json').includes('missingFields'));
});

test('rendered tables preserve raw objects, wrapped objects, null and opaque values in both languages', () => {
    const _metadata = structuredClone(catalog.metadata);
    const _entry = catalog.entries.find((entry) => entry.path === 'layout.application' && entry.kind === 'style');
    const _rawObject = { mode: 'compact', name: 'literal runtime name', desc: 'literal runtime payload' };
    const _legacyRecord = { name: 'legacy name', desc: 'legacy description' };
    _metadata.styles.schemaTable[_entry.schemaRef].args = {
        mode: { type: 'any', defaultMetadata: { kind: 'opaque', valueType: 'function' }, options: [_rawObject, { value: { mode: 'wide' }, name: 'Object wrapper' }, _legacyRecord, null, { valueMetadata: { kind: 'opaque', valueType: 'object' } }, { value: 'later', name: 'Later option' }] }
    };
    _metadata.catalog.coverage.translations.zh.fallback = ['fixture.fallback'];
    _metadata.catalog.coverage.translations.zh.missing = ['fixture.missing'];
    const _files = renderReferences({ ...catalog, metadata: _metadata });
    for (const locale of ['en', 'zh']) {
        const _page = _files.get(profilePath(_entry, locale));
        const _rows = _page.split('\n').filter((line) => /^\| \d+ \|/.test(line));
        assert.equal(_rows.length, 6);
        assert.equal(_rows[0], '| 0 | `' + JSON.stringify(_rawObject) + '` | — | — | — |');
        assert.equal(_rows[1], '| 1 | `{"mode":"wide"}` | Object wrapper | — | — |');
        assert.equal(_rows[2], '| 2 | `' + JSON.stringify(_legacyRecord) + '` | — | — | — |');
        assert.equal(_rows[3], '| 3 | `null` | — | — | — |');
        const _opaque = locale === 'zh' ? '运行时决定 / 不透明值' : 'Runtime-determined / opaque';
        assert.ok(_rows[4].includes(_opaque + ' (object)'));
        assert.equal(_rows[5], '| 5 | `"later"` | Later option | — | — |');
        assert.ok(_page.includes(_opaque + ' (function)'));
        assert.ok(!_page.includes('`undefined`'));
    }
    assert.ok(_files.get('index.md').includes('Fallback keys | Missing keys'));
    assert.ok(_files.get('index.md').includes('fixture.fallback | fixture.missing'));
});

test('open forwarding contracts identify their public owner without inventing argument fields', () => {
    for (const [kind, path, owner, guide] of [
        ['style', 'interact.movable', 'jam.makeMovable', 'Styles/interact.md'],
        ['style', 'interact.resizable', 'jam.makeResizable', 'Styles/interact.md'],
        ['plugin', 'router', 'jam.AbstractRouter', 'Plugins/router.md'],
        ['plugin', 'subRouter', 'jam.AbstractRouter', 'Plugins/router.md']
    ]) {
        const _actual = lookup(catalog, kind, path).profile;
        assert.equal(_actual.argumentContract, 'passthrough');
        assert.equal(_actual.argumentSource, owner);
        assert.equal(_actual.allowUnknown, true);
        assert.deepEqual(_actual.args, {});
        const _metadata = structuredClone(catalog.metadata);
        const _entry = catalog.entries.find((entry) => entry.kind === kind && entry.path === path);
        const _schema = _metadata[kind === 'style' ? 'styles' : 'plugins'].schemaTable[_entry.schemaRef];
        Object.assign(_schema, { args: {}, argumentContract: 'passthrough', argumentSource: owner, allowUnknown: true });
        const _files = renderReferences({ ...catalog, metadata: _metadata });
        for (const locale of ['en', 'zh']) {
            const _page = _files.get(profilePath(_entry, locale));
            assert.ok(_page.includes(owner));
            assert.ok(_page.includes('../../../' + guide));
            assert.ok(_page.includes(locale === 'zh' ? '开放参数契约' : 'open contract'));
            assert.ok(!_page.includes(locale === 'zh' ? '未声明参数。' : 'No arguments declared.'));
            assert.ok(!_page.includes(locale === 'zh' ? '| 参数 | 类型 |' : '| Argument | Type |'));
        }
    }
});

test('source example references preserve IDs, host/state metadata and routes across locales without executing fixtures', () => {
    const _files = renderReferences(catalog);
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
            const _page = _files.get(profilePath(entry, locale));
            for (const field of ['examples', 'hosts', 'states']) {
                assert.deepEqual(_profile[field], _schema[field]);
            }
            for (const example of _schema.examples) {
                _fixtureIds.add(example);
                assert.match(example, /^[a-zA-Z0-9_-]+$/);
                assert.ok(_page.includes(`\`${example}\` — \`#/testground?jaml=${example}\``));
            }
            assert.ok(_page.includes(locale === 'zh' ? '不包含或执行示例代码' : 'does not include or execute fixture code'));
            assert.ok(!_page.includes('](#/testground'), 'Wiki hash links are not testground navigation links');
        }
    }
    assert.ok(_fixtureIds.size > 0, 'Pinned source must supply example references');
    const _metadata = structuredClone(catalog.metadata);
    const _entry = catalog.entries.find((entry) => entry.kind === 'style' && entry.path === 'layout.application');
    _metadata.styles.schemaTable[_entry.schemaRef].examples = ['../outside', 'https://example.invalid/run', 'name?run=1'];
    const _invalidPage = renderReferences({ ...catalog, metadata: _metadata }).get(profilePath(_entry));
    assert.ok(!_invalidPage.includes('#/testground?jaml='));
    for (const example of _metadata.styles.schemaTable[_entry.schemaRef].examples) {
        assert.ok(_invalidPage.includes(JSON.stringify(example)));
    }
});

test('generation is deterministic and freshness rejects modified or extra generated files', async () => {
    assert.deepEqual(renderReferences(catalog), renderReferences(catalog));
    const _temporary = mkdtempSync(resolve(tmpdir(), 'jaml-catalog-freshness-'));
    try {
        cpSync(resolve(root, 'jaml/catalog'), resolve(_temporary, 'jaml/catalog'), { recursive: true });
        await generateReferences(_temporary);
        await generateReferences(_temporary, { check: true });
        const _guide = resolve(_temporary, 'wiki/guide.md');
        writeFileSync(_guide, 'Catalog lookup: `style layout.application`.\n');
        await generateReferences(_temporary, { check: true });
        writeFileSync(_guide, 'Catalog lookup: `style unknown-path`.\n');
        await assert.rejects(generateReferences(_temporary, { check: true }), /Unknown guide catalog lookup/);
        rmSync(_guide);
        const _target = resolve(_temporary, 'wiki/API/index.md');
        writeFileSync(_target, readFileSync(_target, 'utf8') + '\nhand edit\n');
        await assert.rejects(generateReferences(_temporary, { check: true }), /Generated catalog is stale/);
        await generateReferences(_temporary);
        writeFileSync(resolve(_temporary, 'wiki/API/obsolete.md'), 'old');
        await assert.rejects(generateReferences(_temporary, { check: true }), /inventory is stale/);
    } finally {
        rmSync(_temporary, { recursive: true, force: true });
    }
});

test('pinned readers reject altered code before import and shared verifier rejects stale signed catalog claims', async () => {
    const _temporary = mkdtempSync(resolve(tmpdir(), 'jaml-catalog-integrity-'));
    try {
        cpSync(resolve(root, 'jaml/catalog'), _temporary, { recursive: true });
        const _reader = resolve(_temporary, 'authoringView.mjs');
        writeFileSync(_reader, readFileSync(_reader, 'utf8') + '\nglobalThis.catalogShouldNotExecute = true;\n');
        await assert.rejects(loadCatalog(_temporary), /Catalog integrity mismatch/);
        assert.equal(globalThis.catalogShouldNotExecute, undefined);
        cpSync(resolve(root, 'jaml/catalog'), _temporary, { recursive: true });
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

test('only public manifests are accepted; consumers do not gain framework registries or source signatures', () => {
    assert.throws(() => inspectPublicData({ ...catalog.metadata, registries: {} }), /Unsupported public/);
    const _private = structuredClone(catalog.metadata);
    _private.styles.sourceSignature = 'private-source';
    assert.throws(() => inspectPublicData(_private), /Unsupported public/);
});
