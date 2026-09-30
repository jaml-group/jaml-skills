import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import * as reader from '../scripts/authoring/catalog/authoringView.mjs';
import { authoringFields } from '../scripts/authoring/catalog/catalogSchema.mjs';
import { argumentTable } from '../scripts/animation-guide.mjs';
import { projectGuides } from '../scripts/family-guides.mjs';

const tr = (key) => `@tr(fixture.${key})`;
const source = (name) => `export default { div: { text: '${name}' } };`;
const example = (name) => ({ source: source(name), assets: {} });
const localFile = (file, locale) => file.replace(/\.md$/, locale === 'zh' ? '.zh.md' : '.md');
const count = (text, fragment) => text.split(fragment).length - 1;
const manifest = (argSchemas = {}, guides = {}) => ({ knownPaths: Object.keys(argSchemas), argSchemas, guides });
function fixture(styles, translations = {}, plugins = manifest()) {
    return { reader, authoringFields, metadata: { styles, plugins, catalog: { messages: { en: Object.fromEntries(Object.keys(translations).map((key) => ['fixture.' + key, 'EN ' + key])), zh: Object.fromEntries(Object.keys(translations).map((key) => ['fixture.' + key, '中文 ' + key])) } } } };
}
function entry(page, path) {
    const _anchor = `<a id="entry-${path.replaceAll('.', '-')}"></a>`;
    assert.equal(count(page, _anchor), 1, path);
    return page.split(_anchor)[1].split('<a id="entry-')[0];
}
function sharedFixture() {
    const _args = {
        width: { type: 'number', default: 8, desc: tr('width') },
        mode: { type: 'string', default: 'slow', options: [{ value: 'slow', name: tr('baseCaption') }], desc: tr('mode') },
        removed: { type: 'boolean', default: false },
        stable: { type: 'string', default: 'retained', desc: tr('stable') }
    };
    const _externalArgs = { radius: { type: 'number', default: 5, unit: 'px', desc: tr('radius') } };
    return fixture(
        manifest(
            {
                'panel.base': { desc: tr('base'), args: structuredClone(_args) },
                'panel.same': { desc: tr('same'), args: { mode: structuredClone(_args.mode), width: structuredClone(_args.width), stable: structuredClone(_args.stable), removed: structuredClone(_args.removed) } },
                'panel.changed': { desc: tr('changed'), args: { stable: structuredClone(_args.stable), width: { ..._args.width, default: 12 }, mode: { ..._args.mode, options: [{ value: 'slow', name: tr('changedCaption') }] }, added: { type: 'number', default: 3 } } },
                'shared.base': { desc: tr('externalBase'), args: _externalArgs },
                'remote.variant': { desc: tr('externalVariant'), args: structuredClone(_externalArgs) }
            },
            {
                panel: {
                    group: true,
                    guide: {
                        file: 'Styles/panel.md',
                        title: tr('title'),
                        commonArgs: 'panel.base',
                        body: tr('rootBody'),
                        table: { headers: [tr('column')], rows: [[tr('cell')], ['left|right'], ['first\nsecond']] },
                        examples: [{ source: source('root'), assets: { 'Styles/examples/shared.mjs': 'export const shared = 1;\n' } }],
                        sections: [
                            { title: 'Base', include: 'panel.base' },
                            { title: 'Same', include: 'panel.same', body: tr('sameBody'), examples: [example('same')] },
                            { title: 'Changed', include: 'panel.changed' }
                        ]
                    }
                },
                'panel.same': { argsFrom: 'panel.base' },
                'panel.changed': { argsFrom: 'panel.base' },
                shared: { group: true, guide: { title: 'Shared', file: 'Styles/shared/base.md', sections: [{ title: 'Base', include: 'shared.base' }] } },
                remote: { group: true, guide: { title: 'Remote', file: 'Styles/remote/variant.md', sections: [{ title: 'Variant', include: 'remote.variant' }] } },
                'remote.variant': { argsFrom: 'shared.base' }
            }
        ),
        Object.fromEntries(['width', 'baseCaption', 'mode', 'stable', 'radius', 'base', 'same', 'changed', 'changedCaption', 'externalBase', 'externalVariant', 'title', 'rootBody', 'column', 'cell', 'sameBody'].map((key) => [key, true]))
    );
}

test('non-animation sharing renders common rows once and retains each variant order and complete option differences', () => {
    const _catalog = sharedFixture();
    const _before = structuredClone(_catalog.metadata);
    for (const locale of ['en', 'zh']) {
        const _projection = projectGuides(_catalog, locale);
        const _page = _projection.files.get(localFile('Styles/panel.md', locale));
        const _view = reader.resolveAuthoringManifests(_catalog.metadata, locale).styles;
        const _baseArgs = _view.argSchemas['panel.base'].args;
        assert.equal(count(_page, argumentTable(_baseArgs, locale)), 1);
        assert.equal(count(_page, '| `stable` |'), 1, 'An unchanged argument must not repeat in variants');
        const _same = entry(_page, 'panel.same');
        assert.match(_same, /`mode` → `width` → `stable` → `removed`/);
        assert.match(_same, /\[panel.base\]\(#common-args-panel-base\)/);
        assert.doesNotMatch(_same, /^\| /m, 'An identical reordered contract uses the shared table');
        const _changed = entry(_page, 'panel.changed');
        assert.match(_changed, /`stable` → `width` → `mode` → `added`/);
        assert.match(_changed, locale === 'zh' ? /未继承: `removed`/ : /Not inherited: `removed`/);
        assert.match(_changed, locale === 'zh' ? /新增与覆盖/ : /Additions and overrides/);
        assert.match(_changed, /^\| `width` .*`12`/m);
        assert.match(_changed, /^\| `added` .*`3`/m);
        assert.doesNotMatch(_changed, /^\| `stable` /m);
        assert.ok(_changed.includes(_view.argSchemas['panel.changed'].args.mode.options[0].name));
        assert.ok(!_changed.includes(_baseArgs.mode.options[0].name));
        assert.equal(_view.argSchemas['panel.changed'].args.mode.options[0].value, _baseArgs.mode.options[0].value, 'The caption-only change must still produce an override');
        assert.deepEqual(
            [..._projection.targets.keys()].sort(),
            Object.keys(_catalog.metadata.styles.argSchemas)
                .map((path) => 'style:' + path)
                .sort()
        );
    }
    assert.deepEqual(_catalog.metadata, _before);
});

test('shared argument links resolve to the owning same-page or relative cross-page contract in both locales', () => {
    const _catalog = sharedFixture();
    for (const locale of ['en', 'zh']) {
        const _projection = projectGuides(_catalog, locale);
        const _panel = _projection.files.get(localFile('Styles/panel.md', locale));
        assert.match(entry(_panel, 'panel.base'), /\[panel.base\]\(#common-args-panel-base\)/);
        assert.equal(count(_panel, '<a id="common-args-panel-base"></a>'), 1);
        const _external = _projection.files.get(localFile('Styles/remote/variant.md', locale));
        const _baseFile = localFile('Styles/shared/base.md', locale);
        const _link = `../shared/${locale === 'zh' ? 'base.zh.md' : 'base.md'}#entry-shared-base`;
        assert.ok(entry(_external, 'remote.variant').includes(`[shared.base](${_link})`));
        assert.doesNotMatch(entry(_external, 'remote.variant'), /^\| /m);
        assert.equal(count(_projection.files.get(_baseFile), '<a id="entry-shared-base"></a>'), 1);
        assert.match(_projection.files.get(_baseFile), /^\| `radius` /m);
    }
});

test('root guide common arguments, localized body, table and examples use the same supported outline fields', () => {
    const _catalog = sharedFixture();
    for (const locale of ['en', 'zh']) {
        const _projection = projectGuides(_catalog, locale);
        const _page = _projection.files.get(localFile('Styles/panel.md', locale));
        const _prefix = locale === 'zh' ? '中文 ' : 'EN ';
        for (const key of ['title', 'rootBody', 'column', 'cell']) {
            assert.ok(_page.includes(_prefix + key), key);
        }
        assert.match(_page, /\| left\\\|right \|/);
        assert.match(_page, /\| first<br>second \|/);
        assert.equal(count(_page, source('root')), 1);
        assert.ok(_page.indexOf(_prefix + 'rootBody') < _page.indexOf('| ' + _prefix + 'column'));
        assert.ok(_page.indexOf('| ' + _prefix + 'column') < _page.indexOf(source('root')));
        assert.ok(_page.indexOf(source('root')) < _page.indexOf('<a id="entry-panel-base"'));
        const _same = entry(_page, 'panel.same');
        assert.ok(_same.indexOf(_prefix + 'sameBody') < _same.indexOf(source('same')));
        assert.equal(count(_same, source('same')), 1);
        assert.equal(_projection.files.get('Styles/examples/shared.mjs'), 'export const shared = 1;\n');
    }
});

function nestedFixture() {
    return fixture(
        manifest(
            {
                'future.branch.first': { desc: tr('first'), args: {} },
                'future.branch.second': { desc: tr('second'), prerequisites: tr('secondPrerequisite'), caveats: tr('secondCaveat'), args: {} },
                'future.leaf': { desc: tr('leaf'), args: {} }
            },
            {
                future: {
                    group: true,
                    purpose: tr('rootPurpose'),
                    prerequisites: tr('rootPrerequisite'),
                    lifecycle: tr('rootCleanup'),
                    guide: {
                        title: 'Future guide',
                        file: 'Styles/future.md',
                        body: tr('futureBody'),
                        sections: [
                            {
                                title: 'Branch',
                                include: 'future.branch',
                                body: tr('branchSectionBody'),
                                examples: [example('branch-section')],
                                sections: [
                                    { title: 'First', include: 'future.branch.first' },
                                    { title: 'Second', include: 'future.branch.second' }
                                ]
                            },
                            { title: 'Leaf', include: 'future.leaf' }
                        ]
                    }
                },
                'future.branch': {
                    group: true,
                    prerequisites: tr('branchPrerequisite'),
                    caveats: tr('branchCaveat'),
                    guide: { body: tr('branchBody'), examples: [example('branch-owner')], sections: [{ title: 'Deferred outline', body: 'Do not recursively expand this outline.' }] }
                },
                'future.branch.first': { guide: { body: tr('firstBody'), examples: [example('first')] } },
                'future.branch.second': { guide: { body: tr('secondBody'), examples: [example('second')] } },
                'future.leaf': { guide: { body: tr('leafBody'), examples: [example('leaf')] } }
            }
        ),
        Object.fromEntries(['first', 'second', 'secondPrerequisite', 'secondCaveat', 'leaf', 'rootPurpose', 'rootPrerequisite', 'rootCleanup', 'futureBody', 'branchSectionBody', 'branchPrerequisite', 'branchCaveat', 'branchBody', 'firstBody', 'secondBody', 'leafBody'].map((key) => [key, true]))
    );
}

test('future nested groups keep actual ancestor context, local overrides and examples without becoming callable', () => {
    const _catalog = nestedFixture();
    for (const locale of ['en', 'zh']) {
        const _projection = projectGuides(_catalog, locale);
        const _page = _projection.files.get(localFile('Styles/future.md', locale));
        const _prefix = locale === 'zh' ? '中文 ' : 'EN ';
        const _resolved = reader.resolveAuthoringManifests(_catalog.metadata, locale).styles.argSchemas;
        assert.equal(_resolved['future.branch.first'].prerequisites, _prefix + 'branchPrerequisite');
        assert.equal(_resolved['future.branch.first'].lifecycle, _prefix + 'rootCleanup');
        assert.equal(_resolved['future.branch.second'].prerequisites, _prefix + 'secondPrerequisite');
        assert.equal(_resolved['future.leaf'].prerequisites, _prefix + 'rootPrerequisite');
        for (const key of ['rootPurpose', 'rootPrerequisite', 'rootCleanup', 'branchPrerequisite', 'branchCaveat']) {
            assert.equal(count(_page, _prefix + key), 1, key + ' belongs to its group');
        }
        assert.ok(_page.indexOf(_prefix + 'branchPrerequisite') < _page.indexOf('<a id="entry-future-branch-first"'));
        const _first = entry(_page, 'future.branch.first');
        const _second = entry(_page, 'future.branch.second');
        const _leaf = entry(_page, 'future.leaf');
        assert.ok(_first.includes(_prefix + 'firstBody'));
        assert.ok(_first.includes(source('first')));
        assert.ok(!_first.includes(_prefix + 'secondPrerequisite'));
        assert.ok(_second.includes(_prefix + 'secondPrerequisite'));
        assert.ok(_second.includes(_prefix + 'secondCaveat'));
        assert.ok(_second.indexOf(_prefix + 'secondBody') < _second.indexOf(source('second')));
        assert.ok(!_leaf.includes(_prefix + 'branchPrerequisite'));
        assert.ok(!_leaf.includes(_prefix + 'secondPrerequisite'));
        assert.ok(_leaf.includes(source('leaf')));
        for (const name of ['branch-owner', 'branch-section']) {
            assert.equal(count(_page, source(name)), 1);
            assert.ok(_page.indexOf(_prefix + 'branchBody') < _page.indexOf(source(name)));
            assert.ok(_page.indexOf(source(name)) < _page.indexOf('<a id="entry-future-branch-first"'));
        }
        assert.doesNotMatch(_page, /Do not recursively expand/);
        assert.equal(_projection.targets.has('style:future'), false);
        assert.equal(_projection.targets.has('style:future.branch'), false);
        assert.equal(_projection.targets.size, 3);
        assert.doesNotMatch(_page, /id="entry-future(?:-branch)?"/);
    }
});

const outlineNodes = (node) => [node, ...(node.sections ?? []).flatMap(outlineNodes)];
test('published check, hover, icon and follower metadata declares and projects shared argument references', () => {
    const _metadata = JSON.parse(readFileSync(new URL('../scripts/authoring/catalog/catalog.json', import.meta.url), 'utf8'));
    const _owners = [
        ['check', 'check.frame'],
        ['hover', 'hover.frame'],
        ['icon', 'icon.solid'],
        ['layer.follower', 'layer.follower.spotlight']
    ];
    const _needed = new Set();
    for (const [owner, base] of _owners) {
        const _guide = _metadata.styles.guides[owner].guide;
        assert.ok(
            outlineNodes(_guide).some((node) => node.commonArgs === base),
            owner
        );
        for (const node of outlineNodes(_guide)) {
            for (const path of [node.include, node.commonArgs]) {
                if (path) {
                    _needed.add(path);
                }
            }
        }
    }
    for (const path of _needed) {
        const _base = _metadata.styles.guides[path]?.argsFrom;
        if (_base) {
            _needed.add(_base);
        }
    }
    const _ownerPaths = new Set(_owners.map(([owner]) => owner));
    const _guides = Object.fromEntries(
        Object.entries(_metadata.styles.guides)
            .filter(([path]) => _needed.has(path) || [..._needed].some((entry) => entry.startsWith(path + '.')) || _ownerPaths.has(path))
            .map(([path, guide]) => {
                const _guide = structuredClone(guide);
                if (_guide.guide?.file && !_ownerPaths.has(path)) {
                    delete _guide.guide;
                }
                return [path, _guide];
            })
    );
    const _schemas = Object.fromEntries([..._needed].filter((path) => Object.hasOwn(_metadata.styles.argSchemaRefs, path)).map((path) => [path, _metadata.styles.schemaTable[_metadata.styles.argSchemaRefs[path]]]));
    const _catalog = { reader, authoringFields, metadata: { catalog: _metadata.catalog, styles: manifest(_schemas, _guides), plugins: manifest() } };
    assert.ok(Object.keys(_schemas).length < 100, 'Regression uses a bounded real-metadata slice');
    for (const locale of ['en', 'zh']) {
        const _projection = projectGuides(_catalog, locale);
        const _view = reader.resolveAuthoringManifests(_catalog.metadata, locale).styles;
        for (const [owner, base] of _owners) {
            const _file = localFile(_view.guides[owner].guide.file, locale);
            const _page = _projection.files.get(_file);
            assert.equal(count(_page, argumentTable(_view.argSchemas[base].args, locale)), 1, _file);
            assert.ok(count(_page, `](#common-args-${base.replaceAll('.', '-')})`) > 1, _file + ' variants use the shared table');
            const _variants = Object.entries(_view.guides).filter(([path, guide]) => path.startsWith(owner + '.') && guide.argsFrom === base);
            assert.ok(_variants.length > 0, owner + ' explicit sharing');
            for (const [path] of _variants) {
                const _args = Object.keys(_view.argSchemas[path].args);
                assert.ok(entry(_page, path).includes(_args.map((key) => '`' + key + '`').join(' → ')), path);
            }
        }
    }
});
