import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { compose, contract, loadCatalog, lookup } from '../jaml/scripts/catalog.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const cli = resolve(root, 'jaml/scripts/catalog.mjs');
const catalog = await loadCatalog();
const run = (...args) => execFileSync(process.execPath, [cli, ...args], { encoding: 'utf8', cwd: tmpdir() });
const cases = [
    ['style', 'size.fullsize'],
    ['style', 'check.underscore'],
    ['style', 'layout.grid'],
    ['plugin', 'interact.droppable'],
    ['style', 'interact.movable'],
    ['style', 'table.fixedrowheight'],
    ['style', 'interact.sortable']
];

function argumentRows(output) {
    return Object.fromEntries(
        output.split('\n').flatMap((line) => {
            const _match = /^(?:\* )?([^:]+): (\{.*\})$/.exec(line);
            return _match ? [[_match[1], JSON.parse(_match[2])]] : [];
        })
    );
}

test('composition retains all mixed prose, exact argument semantics and order for required cases in both locales', () => {
    for (const [kind, path] of cases) {
        for (const locale of ['en', 'zh']) {
            const _result = lookup(catalog, kind, path, locale);
            const _output = compose(catalog, kind, path, locale);
            assert.ok(_output.startsWith(_result.id + '\n'));
            assert.ok(_output.includes('Framework: ' + catalog.pin.frameworkVersion));
            assert.ok(_output.includes('locale: ' + locale));
            assert.ok(_output.includes('Catalog: ' + catalog.pin.catalogDigest));
            assert.ok(_output.includes('references/API/' + _result.reference));
            assert.ok(_output.includes('no default does not mean required'));
            for (const [field, value] of Object.entries(_result.profile)) {
                if (!['args', 'documentationFormat'].includes(field)) {
                    assert.ok(_output.includes(field + ': ' + (typeof value === 'string' ? value : JSON.stringify(value))), path + ':' + field);
                }
            }
            const _rows = argumentRows(_output);
            assert.deepEqual(Object.keys(_rows), Object.keys(_result.profile.args), path);
            for (const [key, arg] of Object.entries(_result.profile.args)) {
                const _expected = { ...arg };
                if (path === 'layout.grid' && key === 'size') {
                    assert.equal(arg.comment, arg.desc);
                    delete _expected.comment;
                    assert.ok(_output.includes('Merged identical desc/comment: size.'));
                }
                assert.deepEqual(_rows[key], _expected, path + ':' + key);
            }
        }
    }
});

test('focus marks requested arguments without suppressing dependencies, order or public selection behavior', () => {
    for (const locale of ['en', 'zh']) {
        const _ordinary = compose(catalog, 'style', 'check.underscore', locale);
        const _focused = compose(catalog, 'style', 'check.underscore', locale, ['glow', 'width']);
        assert.deepEqual(argumentRows(_focused), argumentRows(_ordinary));
        assert.ok(_focused.includes('\n* width: '));
        assert.ok(_focused.includes('\n* glow: '));
        assert.ok(_focused.indexOf('* width:') < _focused.indexOf('* glow:'));
        assert.ok(_focused.includes('others retained for dependencies'));
    }
    const _profile = lookup(catalog, 'style', 'check.underscore').profile;
    const _output = run('compose', 'style', 'check.underscore', '--args', 'width,glow');
    for (const field of ['behavior', 'prerequisites', 'composition', 'caveats']) {
        assert.ok(_output.includes(_profile[field]));
    }
    assert.match(_output, /does not implement tabs keyboard navigation/);
    assert.match(_output, /hide the existing locator when none is checked/);
    assert.match(_output, /delay is used before the first locator is created/);
});

test('known failures, no-fit, state ownership and open-contract uncertainty stay visible without expansion', () => {
    const _table = run('compose', 'style', 'table.fixedrowheight');
    assert.match(_table, /supported animation name string or false/);
    assert.match(_table, /current animation callback calls string methods on a truthy value/);
    assert.match(_table, /Expanded detail rows disable the fixed virtual path/);
    const _drop = run('compose', 'plugin', 'interact.droppable');
    assert.match(_drop, /[Nn]on-function accept values currently fall back to accepting drags/);
    assert.match(_drop, /not a file importer or a security boundary/);
    assert.match(_drop, /Unplug removes the drop-zone registration; document drag listeners remain shared/);
    assert.match(run('compose', 'style', 'interact.sortable'), /does not persist the application model/);
    const _open = run('compose', 'style', 'interact.movable');
    assert.match(_open, /argumentSource: jam.makeMovable/);
    assert.match(_open, /argument inference is incomplete/);
    assert.match(_open, /Retrieve the argumentSource owner before supplying forwarded fields/);
    assert.match(_open, /hosts: \["HTMLElement"\]/);
    assert.match(_open, /examples: \["intent-interact-movable"\]/);
    assert.match(_open, /this view loads no fixtures/);
    assert.match(_open, /Unmount, style teardown or host destruction/);
    assert.match(_open, /does not restore previous coordinates/);
});

test('only documented numeric tuner hints are deferred; constraints, raw values and unfamiliar metadata survive', () => {
    const _metadata = structuredClone(catalog.metadata);
    const _entry = catalog.entries.find((entry) => entry.kind === 'style' && entry.path === 'layout.grid');
    const _profile = _metadata.styles.schemaTable[_entry.schemaRef];
    Object.assign(_profile, {
        documentationFormat: 'future-format',
        appearance: 'Accessible control remains caller-owned.',
        comment: 'Ordering differs from the alternate variant.',
        extraObligation: { requiredIntegration: 'future-owner' },
        args: {
            amount: { type: 'number', default: 0, min: -2, max: 4, step: 0.5, tuner: { min: 0, max: 1, step: 0.1 }, desc: 'Amount', comment: 'Amount', dependsOn: ['mode'] },
            mode: { type: 'any', default: false, options: [false, null, { value: { mode: 'bounded' }, name: 'Bounded', comment: 'Needs amount' }], desc: 'Mode', comment: 'Must keep amount in bounds.', tuner: { min: 0, obligation: 'Never lose this unfamiliar metadata' } },
            blank: { type: 'any', default: null, tuner: {}, desc: '', comment: '' },
            opaque: { type: 'any', defaultMetadata: { kind: 'opaque', valueType: 'function' }, tuner: { step: 'dynamic' } }
        }
    });
    const _sample = { ...catalog, metadata: _metadata, entries: [...catalog.reader.catalogEntries(_metadata)] };
    const _output = compose(_sample, 'style', _entry.path);
    const _rows = argumentRows(_output);
    assert.deepEqual(_rows.amount, { type: 'number', default: 0, min: -2, max: 4, step: 0.5, desc: 'Amount', dependsOn: ['mode'] });
    for (const key of ['mode', 'blank', 'opaque']) {
        assert.deepEqual(_rows[key], _profile.args[key]);
    }
    for (const key of ['documentationFormat', 'appearance', 'comment', 'extraObligation']) {
        assert.ok(_output.includes(key + ': ' + (typeof _profile[key] === 'string' ? _profile[key] : JSON.stringify(_profile[key]))));
    }
    assert.match(_output, /Deferred tuner UI hints: amount \(not runtime constraints; show to expand\)\./);
    assert.match(_output, /Merged identical desc\/comment: amount\./);
    assert.deepEqual(_profile.args.amount.tuner, { min: 0, max: 1, step: 0.1 }, 'Projection does not mutate source');
    assert.ok(contract(_sample, 'style', _entry.path).includes('"tuner":{"min":0,"max":1,"step":0.1}'));
    assert.match(compose(catalog, 'style', 'layer.background'), /Deferred tuner UI hints: opacity \(not runtime constraints; show to expand\)\./);
    assert.ok(!compose(catalog, 'style', 'size.fullsize').includes('Deferred tuner'));
});

test('composition uses selective publisher resolution and preserves aliases and legacy translation modes', () => {
    for (const format of ['messages', 'translations', undefined]) {
        const _metadata = structuredClone(catalog.metadata);
        const _entry = catalog.entries.find((entry) => entry.kind === 'style' && entry.path === 'stylize.bento');
        const _schema = { ...(format ? { documentationFormat: format } : {}), desc: format === 'messages' ? 'compose.title' : '@tr(compose.title)', comment: 'Literal context', args: { value: { type: 'string', default: '@tr(compose.title)', desc: format === 'messages' ? 'compose.title' : '@tr(compose.title)' } } };
        _metadata.styles.schemaTable[_entry.schemaRef] = _schema;
        _metadata.catalog.messages.en['compose.title'] = 'Fallback caption';
        const _reader = {
            ...catalog.reader,
            resolveAuthoringManifests(manifests, locale) {
                assert.equal(manifests.catalog, _metadata.catalog);
                assert.equal(manifests.plugins, undefined);
                assert.deepEqual(Object.keys(manifests.styles.argSchemas), ['stylize.bento']);
                return catalog.reader.resolveAuthoringManifests(manifests, locale);
            }
        };
        const _sample = { ...catalog, metadata: _metadata, reader: _reader, entries: [...catalog.reader.catalogEntries(_metadata)] };
        const _output = compose(_sample, 'style', 'stylize.bento', 'zh');
        assert.match(_output, /stylize.bento → @jam\/jam-ui\/style\/group.bento/);
        assert.ok(_output.includes('desc: Fallback caption'));
        assert.deepEqual(argumentRows(_output).value, { type: 'string', default: '@tr(compose.title)', desc: 'Fallback caption' });
        assert.ok(_output.includes('format: ' + (format ?? 'legacy')));
    }
});

test('invalid paths, arguments, locales and controls fail visibly without partial output', () => {
    for (const args of [
        ['compose', 'style', 'complete.tabs'],
        ['compose', 'style', 'check.underscore', '--args', 'notAnArg'],
        ['compose', 'style', 'check.underscore', '--args', ','],
        ['compose', 'style', 'interact.movable', '--args', 'handle'],
        ['compose', 'style', 'size.fullsize', '--locale', 'fr'],
        ['compose', 'style', 'layout.grid', '--all']
    ]) {
        const _result = spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8' });
        assert.notEqual(_result.status, 0, args.join(' '));
        assert.equal(_result.stdout, '');
        assert.ok(_result.stderr.length);
    }
    assert.throws(() => compose(catalog, 'style', 'check.underscore', 'en', []), /Unknown or empty argument selection/);
});
