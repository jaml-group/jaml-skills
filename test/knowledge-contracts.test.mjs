import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { loadCatalog, lookup } from '../scripts/authoring/catalog.mjs';
import { projectGuides } from '../scripts/family-guides.mjs';

const catalog = await loadCatalog();
const read = (path) => readFileSync(new URL('../wiki/' + path, import.meta.url), 'utf8');
const projections = Object.fromEntries(['en', 'zh'].map((locale) => [locale, projectGuides(catalog, locale)]));
function page(kind, path, locale) {
    const _projection = projections[locale];
    const _target = _projection.targets.get(kind + ':' + path);
    assert.ok(_target, kind + ':' + path);
    return _projection.files.get(_target.file);
}

test('drop callback inputs and non-function acceptance survive generated documentation in both locales', () => {
    for (const locale of ['en', 'zh']) {
        const profile = lookup(catalog, 'plugin', 'interact.droppable', locale).profile;
        const output = page('plugin', 'interact.droppable', locale);
        for (const key of ['accept', 'dataHandler', 'handler']) {
            assert.ok(output.includes(profile.args[key].desc));
        }
        assert.match(profile.args.accept.desc, /DragEvent/);
        assert.match(profile.args.accept.desc, /dataTransfer/);
        assert.match(profile.args.accept.desc, /false/);
        assert.match(profile.args.dataHandler.desc, /application\/json/);
        assert.match(profile.args.handler.desc, /event.data/);
        assert.ok(output.includes(profile.prerequisites));
    }
});

test('underscore documentation supplies hosts, units, positional order and computed-default meaning', () => {
    for (const locale of ['en', 'zh']) {
        const profile = lookup(catalog, 'style', 'check.underscore', locale).profile;
        const output = page('style', 'check.underscore', locale);
        for (const host of ['radio', 'checkbox', 'buttongroup-radio', 'buttongroup-checkbox']) {
            assert.ok(output.includes(host));
        }
        assert.match(output, /check.underscore\(width:3;glow:5\)/);
        assert.match(profile.args.width.desc, /0.25 rem/);
        assert.match(profile.args.width.desc, /px/);
        assert.match(profile.args.glow.desc, /px/);
        assert.ok(profile.args.width.defaultMetadata);
        assert.deepEqual(Object.keys(profile.args), ['size', 'width', 'bias', 'glow', 'radius', 'delay', 'breathe', 'container', 'clipTarget', 'easing', 'duration', 'css']);
        assert.ok(
            output.includes(
                Object.keys(profile.args)
                    .map((key) => '`' + key + '`')
                    .join(' → ')
            )
        );
    }
});

test('record and shared-style ownership retain direct consumer links and concrete examples', () => {
    const record = read('JAML/component.md');
    assert.match(record, /#one-caller-owned-record-per-cc-instance/);
    assert.match(record, /this.shared.record.name = 'Renamed'/);
    assert.match(record, /this.shared.record = \{/);
    assert.match(record, /record: '{{left}}'/);
    assert.match(record, /record: '{{right}}'/);
    assert.match(record, /Literal primitive props remain writable/);
    const lifecycle = read('Styles/styles.md');
    assert.match(lifecycle, /#mount-and-shared-application-lifetime/);
    assert.match(lifecycle, /same plugin instance on the same host/);
    assert.match(lifecycle, /no second setup/);
    assert.match(lifecycle, /Final owner releases/);
    assert.match(lifecycle, /not every DOM detach/);
});

test('theme composition and styling ownership stay reachable with prerequisites', () => {
    const theme = read('JAML/component.md');
    assert.match(theme, /build: true/);
    assert.match(theme, /DOMContentLoaded/);
    assert.match(theme, /await `jam.themeReady`/);
    assert.match(theme, /jam-darkmode@milo/);
    assert.match(theme, /standalone-application-root/);
    assert.match(theme, /embedded-application-hosts/);
    const styles = read('Styles/styles.md');
    assert.match(styles, /editor-owned DOM keeps a scoped adapter/);
    assert.match(styles, /click targets and focus/);
    assert.match(styles, /Token substitution alone/);
    const skill = readFileSync(new URL('../jaml/SKILL.md', import.meta.url), 'utf8');
    assert.match(skill, /specific unresolved fact/);
    assert.match(skill, /gap report before executable code/);
    assert.doesNotMatch(skill, /scripts\/catalog\.mjs|references\/API/);
});
