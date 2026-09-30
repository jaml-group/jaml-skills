import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { loadCatalog, lookup } from '../scripts/authoring/catalog.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const catalog = await loadCatalog();
const cases = [
    ['style', 'check.underscore'],
    ['style', 'layout.application'],
    ['style', 'stylize.bento'],
    ['style', 'group.bento'],
    ['style', 'interact.sortable'],
    ['plugin', 'interact.droppable'],
    ['plugin', 'i18n']
];

test('exact lookup never reads unrelated schemas and keeps the full publisher translation context', () => {
    for (const [kind, path] of cases) {
        const _entry = catalog.entries.find((entry) => entry.kind === kind && entry.path === path);
        const _kind = kind === 'style' ? 'styles' : 'plugins';
        const _other = kind === 'style' ? 'plugins' : 'styles';
        const _raw = catalog.metadata[_kind].schemaTable[_entry.schemaRef];
        const _schemaTable = new Proxy(catalog.metadata[_kind].schemaTable, {
            get(target, key) {
                assert.equal(key, String(_entry.schemaRef), 'Only the selected schema may be read');
                return target[key];
            }
        });
        const _metadata = { ...catalog.metadata, [_kind]: { ...catalog.metadata[_kind], schemaTable: _schemaTable } };
        Object.defineProperty(_metadata, _other, {
            get() {
                assert.fail('Unrelated manifest must not be read');
            }
        });
        let _calls = 0;
        const _reader = {
            ...catalog.reader,
            resolveAuthoringManifests(manifests, locale) {
                _calls++;
                assert.equal(manifests.catalog, catalog.metadata.catalog);
                assert.deepEqual(Object.keys(manifests[_kind].argSchemas), [path]);
                assert.equal(manifests[_kind].argSchemas[path], _raw);
                assert.equal(manifests[_other], undefined);
                return catalog.reader.resolveAuthoringManifests(manifests, locale);
            }
        };
        const _sample = { ...catalog, metadata: _metadata, reader: _reader };
        for (const locale of ['en', 'zh']) {
            assert.deepEqual(lookup(_sample, kind, path, locale), lookup(catalog, kind, path, locale));
        }
        assert.equal(_calls, 2);
        assert.throws(() => lookup(_sample, kind, 'unknown.path'), /Unknown catalog path/);
        assert.equal(_calls, 2, 'Unknown paths fail before resolution');
    }
});

test('maintainer lookup matches complete publisher resolution in both locales', () => {
    for (const locale of ['en', 'zh']) {
        const _full = catalog.reader.resolveAuthoringManifests(catalog.metadata, locale);
        for (const [kind, path] of cases) {
            assert.deepEqual(lookup(catalog, kind, path, locale).profile, _full[kind === 'style' ? 'styles' : 'plugins'].argSchemas[path], kind + ':' + path + ':' + locale);
        }
    }
});

test('exact lookups preserve publisher translation errors and do not cache stale profiles or messages', () => {
    const _metadata = structuredClone(catalog.metadata);
    const _entry = catalog.entries.find((entry) => entry.kind === 'style' && entry.path === 'layout.application');
    const _schema = _metadata.styles.schemaTable[_entry.schemaRef];
    const _sample = { ...catalog, metadata: _metadata };
    _schema.desc = '@tr(lookup.fallback)';
    _metadata.catalog.messages.en['lookup.fallback'] = 'First fallback';
    assert.equal(lookup(_sample, 'style', _entry.path, 'zh').profile.desc, 'First fallback');
    _metadata.catalog.messages.en['lookup.fallback'] = 'Updated fallback';
    assert.equal(lookup(_sample, 'style', _entry.path, 'zh').profile.desc, 'Updated fallback');
    _schema.desc = 'Literal replacement';
    assert.equal(lookup(_sample, 'style', _entry.path, 'zh').profile.desc, 'Literal replacement');
    _schema.desc = '@tr(lookup.named, {who: {{person}}})';
    assert.throws(() => lookup(_sample, 'style', _entry.path), /component binding context/);
    _schema.desc = '@tr(lookup.named, @tr(lookup.other))';
    assert.throws(() => lookup(_sample, 'style', _entry.path), /Nested @tr wrappers/);
});

test('exact retrieval still rejects tampering outside the requested schema during catalog loading', async () => {
    const _temporary = mkdtempSync(resolve(tmpdir(), 'jaml-lookup-integrity-'));
    try {
        cpSync(resolve(root, 'scripts/authoring/catalog'), _temporary, { recursive: true });
        const _file = resolve(_temporary, 'catalog.json');
        const _metadata = JSON.parse(readFileSync(_file, 'utf8'));
        const _unrelated = _metadata.plugins.argSchemaRefs['interact.droppable'];
        _metadata.plugins.schemaTable[_unrelated].desc = 'Tampered unrelated schema';
        writeFileSync(_file, JSON.stringify(_metadata));
        await assert.rejects(async () => lookup(await loadCatalog(_temporary), 'style', 'check.underscore'), /Catalog integrity mismatch: catalog.json/);
    } finally {
        rmSync(_temporary, { recursive: true, force: true });
    }
});
