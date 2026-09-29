import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { compose, contract, loadCatalog, lookup } from '../jaml/scripts/catalog.mjs';

const catalog = await loadCatalog();
const cli = fileURLToPath(new URL('../jaml/scripts/catalog.mjs', import.meta.url));
const read = (path) => execFileSync(process.execPath, [cli, 'read', path], { cwd: tmpdir(), encoding: 'utf8' });

test('drop callback inputs and non-function acceptance survive compact, full and localized lookup', () => {
    for (const locale of ['en', 'zh']) {
        const profile = lookup(catalog, 'plugin', 'interact.droppable', locale).profile;
        for (const render of [compose, contract]) {
            const output = render(catalog, 'plugin', 'interact.droppable', locale);
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
    }
});

test('one underscore lookup supplies hosts, units, positional order and computed-default meaning', () => {
    for (const locale of ['en', 'zh']) {
        const profile = lookup(catalog, 'style', 'check.underscore', locale).profile;
        const output = compose(catalog, 'style', 'check.underscore', locale);
        for (const host of ['radio', 'checkbox', 'buttongroup-radio', 'buttongroup-checkbox']) {
            assert.ok(output.includes(host));
        }
        assert.match(output, /check.underscore\(width:3;glow:5\)/);
        assert.match(output, /defaultMetadata/);
        assert.match(profile.args.width.desc, /0.25 rem/);
        assert.match(profile.args.width.desc, /px/);
        assert.match(profile.args.glow.desc, /px/);
        assert.deepEqual(Object.keys(profile.args), ['size', 'width', 'bias', 'glow', 'radius', 'delay', 'breathe', 'container', 'clipTarget', 'easing', 'duration', 'css']);
    }
});

test('record and shared-style ownership have focused consumer paths', () => {
    assert.match(read('JAML/component.md#props-as-reactive-aliases'), /#one-caller-owned-record-per-cc-instance/);
    assert.match(read('Styles/styles.md#custom-style-methods'), /#mount-and-shared-application-lifetime/);
    const record = read('JAML/component.md#one-caller-owned-record-per-cc-instance');
    assert.match(record, /this.shared.record.name = 'Renamed'/);
    assert.match(record, /this.shared.record = \{/);
    assert.match(record, /record: '{{left}}'/);
    assert.match(record, /record: '{{right}}'/);
    assert.match(record, /Literal primitive props remain writable/);
    assert.doesNotMatch(record, /### CC Definitions/);
    const lifecycle = read('Styles/styles.md#mount-and-shared-application-lifetime');
    assert.match(lifecycle, /same plugin instance on the same host/);
    assert.match(lifecycle, /no second setup/);
    assert.match(lifecycle, /Final owner releases/);
    assert.match(lifecycle, /not every DOM detach/);
});

test('theme composition and styling ownership stay reachable with prerequisites', () => {
    const theme = read('JAML/component.md#theme-panel-composition-and-readiness');
    assert.match(theme, /build: true/);
    assert.match(theme, /DOMContentLoaded/);
    assert.match(theme, /await `jam.themeReady`/);
    assert.match(theme, /jam-darkmode@milo/);
    assert.match(theme, /standalone-application-root/);
    assert.match(theme, /embedded-application-hosts/);
    const styles = read('Styles/styles.md#style-ownership-and-composition');
    assert.match(styles, /editor-owned DOM keeps a scoped adapter/);
    assert.match(styles, /click targets and focus/);
    assert.match(styles, /Token substitution alone/);
    const skill = readFileSync(new URL('../jaml/SKILL.md', import.meta.url), 'utf8');
    assert.match(skill, /specific unresolved fact/);
    assert.match(skill, /gap report before executable code/);
    assert.match(skill, /does not require a whole-catalog search/);
});
