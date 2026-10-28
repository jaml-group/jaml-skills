import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { loadCatalog, lookup } from '../scripts/authoring/catalog.mjs';

const catalog = await loadCatalog();
const read = (path) => readFileSync(new URL('../wiki/' + path, import.meta.url), 'utf8');

for (const locale of ['en', 'zh']) {
    test(`folding contracts remain available in focused ${locale} metadata and guides`, () => {
        const parent = lookup(catalog, 'style', 'layout.accordion', locale).profile;
        const child = lookup(catalog, 'style', 'interact.foldable', locale).profile;
        const paired = lookup(catalog, 'style', 'interact.expandable', locale).profile;
        const suffix = locale === 'en' ? '' : '.zh';
        const layout = read(`Styles/common/layout${suffix}.md`);
        const interact = read(`Styles/interact${suffix}.md`);
        for (const key of ['prerequisites', 'lifecycle', 'composition', 'caveats']) {
            assert.ok(parent[key] && layout.includes(parent[key]));
            assert.ok(child[key] && interact.includes(child[key]));
        }
        for (const term of ['element.foldable.fold()', 'unfold()', 'toggle()', 'foldchange', 'foldresize', 'CSS']) assert.ok(child.behavior.includes(term));
        for (const term of ['default', 'saveState', 'resizeThreshold', 'foldable']) assert.ok(paired.caveats.includes(term));
        assert.match(layout, /id: 'folding-example'/);
        assert.match(layout, /foldSize: '2rem'/);
        assert.match(layout, /closest\('#folding-example'\)/);
        assert.match(child.lifecycle, /inert/);
        assert.match(paired.prerequisites, /saveState:true/);
        assert.match(paired.prerequisites, /id/);
        if (locale === 'en') assert.match(paired.prerequisites, /including inside accordion where storage handling is bypassed/);
    });
}

test('choice guidance reaches native owners and keeps the rail outside the inert host', () => {
    const chooser = read('choosing-native-capabilities.md');
    for (const term of ['entry-layout-accordion', 'entry-interact-foldable', 'entry-interact-expandable', 'drawer-and-previewer.md#retained-drawers', 'outside the folded navigation host']) assert.ok(chooser.includes(term));
});
