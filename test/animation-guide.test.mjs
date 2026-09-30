import assert from 'node:assert/strict';
import test from 'node:test';
import { loadCatalog, lookup } from '../scripts/authoring/catalog.mjs';
import { renderFamilyGuides } from '../scripts/animation-guide.mjs';
import { renderReferences } from '../scripts/catalog-reference.mjs';

const guideExamples = (guide) => [...(guide?.examples ?? []), ...(guide?.sections ?? []).flatMap(guideExamples)];
const catalog = await loadCatalog();

test('animation guides carry runtime contracts, both locales, source functions and packaged imports', () => {
    const _files = renderFamilyGuides(catalog);
    for (const name of ['Styles/animation.md', 'Styles/animation.zh.md']) {
        const _source = _files.get(name);
        assert.ok(_source);
        assert.doesNotMatch(_source, /@tr\(|native\.|Catalog digest|Knowledge:|Missing prose/);
        assert.match(_source, /duration.*easing.*delay.*fill.*origin.*triggerSelector.*beforeApply.*direction/);
        assert.match(_source, /seq\(50,400\)/);
        assert.match(_source, /await import\(/);
        assert.match(_source, /onunmount\(\)/);
        assert.match(_source, /\(el, args\)/);
    }
    assert.match(_files.get('Styles/examples/animation/cards.mjs'), /export function card/);
    assert.equal((_files.get('Styles/animation.md').match(/Unit: `ms`/g) ?? []).length, 5);
    for (const example of Object.entries(catalog.metadata.styles.guides)
        .filter(([path]) => path === 'animation' || path.startsWith('animation.'))
        .flatMap(([, entry]) => guideExamples(entry.guide))) {
        assert.ok(_files.get('Styles/animation.md').includes(example.source.trimEnd()));
        for (const [name, source] of Object.entries(example.assets)) {
            assert.equal(_files.get(name), source);
        }
    }
    assert.deepEqual(renderFamilyGuides(catalog), _files);
});

test('local description edits leave unrelated generated pages byte-identical', () => {
    const _before = renderReferences(catalog);
    const _metadata = structuredClone(catalog.metadata);
    _metadata.catalog.messages.en['style.animation.entry.fadein.desc'] = 'Changed fade description';
    const _changed = { ...catalog, metadata: _metadata, pin: { ...catalog.pin, catalogDigest: 'different-global-digest' } };
    const _after = renderReferences(_changed);
    const _changedPages = [..._before].filter(([name, source]) => source !== _after.get(name)).map(([name]) => name);
    assert.deepEqual(_changedPages, ['Styles/animation.md']);
    const _guides = renderFamilyGuides(catalog);
    const _newGuides = renderFamilyGuides(_changed);
    assert.notEqual(_guides.get('Styles/animation.md'), _newGuides.get('Styles/animation.md'));
    assert.equal(_guides.get('Styles/animation.zh.md'), _newGuides.get('Styles/animation.zh.md'));
});

test('explicit sharing displays runtime additions, overrides and exclusions without inventing facts', () => {
    const _metadata = structuredClone(catalog.metadata);
    _metadata.styles.guides['animation.flipchild'] = { argsFrom: 'animation' };
    const _source = renderFamilyGuides({ ...catalog, metadata: _metadata }).get('Styles/animation.md');
    const _section = _source.split('## `animation.flipchild`')[1].split('## `animation.intersectionBlocker`')[0];
    assert.match(_section, /Not inherited: `composite`, `iterations`, `keyframes`/);
    assert.match(_section, /Additions and overrides/);
    assert.match(_section, /beforeEvents/);
    assert.match(_section, /duration.*easing.*delay/);
});

test('animation guide keeps original reading order and runnable examples beside their entries', () => {
    const _source = renderFamilyGuides(catalog).get('Styles/animation.md');
    const _headings = ['## Common animation args', '## `delay` and `duration` helpers', '## Generic animation', '## Easing names', '## Entry animations', '### `animation.entry.fadein`', '### `animation.entry.appear`', '### `animation.entry.genie`', '### `animation.entry.zoom`', '### `animation.entry.feather`', '### `animation.entry.squeeze`', '### Directional slides', '### Directional flips', '## Exit animations', '## `animation.flipchild`', '## `animation.intersectionBlocker`', '## Usage', '## FLIP animation', '## Built-in popup keyframes'];
    let _previous = -1;
    for (const heading of _headings) {
        const _index = _source.indexOf(heading, _previous + 1);
        assert.ok(_index > _previous, heading);
        _previous = _index;
    }
    for (const path of ['animation', 'animation.entry.fadein', 'animation.entry.appear', 'animation.entry.genie', 'animation.entry.zoom', 'animation.entry.feather', 'animation.entry.squeeze', 'animation.exit.fadeout', 'animation.exit.disappear', 'animation.exit.genie', 'animation.exit.blurnout', 'animation.exit.zoom', 'animation.exit.squeeze', 'animation.flipchild', 'animation.intersectionBlocker']) {
        const _section = _source.split('`' + path + '`\n')[1].split(/\n#{2,4} /)[0];
        assert.match(_section, /```javascript jaml-playground/, path);
    }
    assert.match(_source, /offset \+ index \* per/);
    assert.match(_source, /random\(25\).*25–125/);
    assert.match(_source, /\| `expand-bottom` \| Show/);
    assert.match(_source, /for \(let index = 0; index < 12; index\+\+\)/);
    assert.doesNotMatch(_source, /## Runnable examples|## Composition examples/);
});

test('outline references cannot silently omit or duplicate runtime animation entries', () => {
    const _metadata = structuredClone(catalog.metadata);
    const _sections = _metadata.styles.guides.animation.guide.sections;
    _sections.push({ include: 'animation.flipchild' });
    assert.throws(() => renderFamilyGuides({ ...catalog, metadata: _metadata }), /Repeated animation guide entry/);
    _sections.pop();
    const _entry = _sections.find((section) => section.include === 'animation.entry');
    _entry.sections.shift();
    assert.throws(() => renderFamilyGuides({ ...catalog, metadata: _metadata }), /omits runtime entries: animation.entry.fadein/);
});

test('actual group edits render once while variant-only changes remain local in both locales', () => {
    const _baseline = renderFamilyGuides(catalog);
    const _groupChange = structuredClone(catalog.metadata);
    const _variantChange = structuredClone(catalog.metadata);
    const _group = _groupChange.styles.guides['animation.entry'];
    const _variant = _variantChange.styles.schemaTable[_variantChange.styles.argSchemaRefs['animation.entry.fadein']];
    for (const [owner, prefix] of [
        [_group, 'group'],
        [_variant, 'variant']
    ]) {
        owner.prerequisites = `@tr(literal.${prefix}Prerequisite)`;
        owner.caveats = `@tr(literal.${prefix}Caveat)`;
    }
    for (const locale of ['en', 'zh']) {
        Object.assign(_groupChange.catalog.messages[locale], { 'literal.groupPrerequisite': `${locale} GROUP prerequisite`, 'literal.groupCaveat': `${locale} GROUP caveat` });
        Object.assign(_variantChange.catalog.messages[locale], { 'literal.variantPrerequisite': `${locale} VARIANT prerequisite`, 'literal.variantCaveat': `${locale} VARIANT caveat` });
    }
    const _groupGuides = renderFamilyGuides({ ...catalog, metadata: _groupChange });
    const _variantGuides = renderFamilyGuides({ ...catalog, metadata: _variantChange });
    for (const locale of ['en', 'zh']) {
        const _name = `Styles/animation${locale === 'zh' ? '.zh' : ''}.md`;
        const _title = locale === 'en' ? 'Entry animations' : '入场动画';
        const _intro = (source) => source.split(`## ${_title}\n`)[1].split('### ')[0];
        const _fade = (source) => source.split('### `animation.entry.fadein`\n')[1].split('### ')[0];
        for (const field of ['prerequisite', 'caveat']) {
            const _groupText = `${locale} GROUP ${field}`;
            const _variantText = `${locale} VARIANT ${field}`;
            assert.ok(_intro(_groupGuides.get(_name)).includes(_groupText));
            assert.equal(_groupGuides.get(_name).split(_groupText).length - 1, 1);
            assert.equal(_intro(_variantGuides.get(_name)), _intro(_baseline.get(_name)));
            assert.ok(_fade(_variantGuides.get(_name)).includes(_variantText));
            assert.equal(_variantGuides.get(_name).split(_variantText).length - 1, 1);
        }
    }
});

test('unrelated nested groups own their prose without animation-specific fallback', () => {
    const _metadata = structuredClone(catalog.metadata);
    Object.assign(_metadata.styles.guides, {
        garden: { group: true, desc: 'Garden', purpose: '@tr(literal.gardenPurpose)', prerequisites: '@tr(literal.gardenPrerequisite)', lifecycle: '@tr(literal.gardenCleanup)' },
        'garden.flower': { group: true, desc: 'Flowers', prerequisites: '@tr(literal.flowerPrerequisite)', caveats: '@tr(literal.flowerCaveat)' }
    });
    for (const path of ['garden.flower.open', 'garden.leaf']) {
        _metadata.styles.argSchemaRefs[path] = _metadata.styles.schemaTable.length;
        _metadata.styles.schemaTable.push({ desc: path, args: {} });
        _metadata.styles.knownPaths.push(path);
    }
    _metadata.styles.guides.animation.guide.sections.push({ include: 'garden', sections: [{ include: 'garden.flower', sections: [{ include: 'garden.flower.open' }] }, { include: 'garden.leaf' }] });
    for (const locale of ['en', 'zh']) {
        for (const key of ['gardenPurpose', 'gardenPrerequisite', 'gardenCleanup', 'flowerPrerequisite', 'flowerCaveat']) {
            _metadata.catalog.messages[locale]['literal.' + key] = locale + ' ' + key;
        }
    }
    const _guides = renderFamilyGuides({ ...catalog, metadata: _metadata });
    for (const locale of ['en', 'zh']) {
        const _source = _guides.get(`Styles/animation${locale === 'zh' ? '.zh' : ''}.md`).split('## Garden\n')[1];
        const _parent = _source.split('### Flowers\n')[0];
        const _nested = _source.split('### Flowers\n')[1].split('#### ')[0];
        for (const key of ['gardenPurpose', 'gardenPrerequisite', 'gardenCleanup']) {
            assert.ok(_parent.includes(locale + ' ' + key));
            assert.equal(_source.split(locale + ' ' + key).length - 1, 1);
        }
        for (const key of ['flowerPrerequisite', 'flowerCaveat']) {
            assert.ok(_nested.includes(locale + ' ' + key));
            assert.equal(_source.split(locale + ' ' + key).length - 1, 1);
        }
        assert.doesNotMatch(_source, /framework animated|fadeout|动画隐藏/);
    }
});

test('focused lookup retains group prerequisites and lifecycle without raw child duplication', () => {
    for (const locale of ['en', 'zh']) {
        const _view = catalog.reader.resolveAuthoringManifests(catalog.metadata, locale).styles;
        for (const path of ['animation.entry.fromleft', 'animation.exit.toleft']) {
            const _group = _view.guides[path.slice(0, path.lastIndexOf('.'))];
            const _profile = lookup(catalog, 'style', path, locale).profile;
            assert.equal(_profile.prerequisites, _group.prerequisites);
            assert.equal(_profile.lifecycle, _group.lifecycle);
            assert.equal(_profile.caveats, _group.caveats);
        }
    }
});
