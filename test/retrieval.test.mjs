import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { loadCatalog } from '../scripts/authoring/catalog.mjs';
import { projectGuides } from '../scripts/family-guides.mjs';
import { checkResources } from '../scripts/resources.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const catalog = await loadCatalog();
const anchors = (source) => {
    const _text = source.replace(/^([`~]{3,})[^\n]*\n[\s\S]*?^\1\s*$/gm, '');
    const _seen = new Map();
    const _anchors = new Set([..._text.matchAll(/(?:id|name)=["']([^"']+)["']/g)].map((match) => match[1]));
    for (const match of _text.matchAll(/^#{1,6}\s+(.+)$/gm)) {
        const _slug = match[1]
            .replace(/<[^>]*>/g, '')
            .toLowerCase()
            .replace(/[^\p{L}\p{N}_\-\s]/gu, '')
            .replace(/\s/g, '-');
        const _count = _seen.get(_slug) ?? 0;
        _seen.set(_slug, _count + 1);
        _anchors.add(_slug + (_count ? '-' + _count : ''));
    }
    return _anchors;
};

test('every exported capability has a direct localized page and a real entry anchor', () => {
    for (const locale of ['en', 'zh']) {
        const _projection = projectGuides(catalog, locale);
        assert.equal(_projection.targets.size, catalog.entries.length);
        const _pageAnchors = new Map([..._projection.files].filter(([file]) => file.endsWith('.md')).map(([file, source]) => [file, anchors(source)]));
        for (const entry of catalog.entries) {
            const _target = _projection.targets.get(entry.kind + ':' + entry.path);
            assert.ok(_target, entry.id);
            assert.ok(_target.path);
            assert.match(_target.file, /^(Styles|Plugins)\/.+\.md$/);
            assert.equal(_target.file.endsWith('.zh.md'), locale === 'zh');
            assert.ok(_pageAnchors.get(_target.file).has(_target.anchor), entry.id + ' → ' + _target.file + '#' + _target.anchor);
        }
    }
});

test('incoming public anchors remain usable and all local documentation links resolve', () => {
    const _anchors = [
        ['Styles/check.md', 'checkunderscore'],
        ['Styles/styles.md', 'custom-style-methods'],
        ['Styles/styles.md', 'style-ownership-and-composition'],
        ['Styles/styles.md', 'mount-and-shared-application-lifetime'],
        ['JAML/component.md', 'props-as-reactive-aliases'],
        ['JAML/component.md', 'one-caller-owned-record-per-cc-instance'],
        ['JAML/component.md', 'theme-panel-composition-and-readiness'],
        ['choosing-native-capabilities.md', 'selection-and-hover']
    ];
    for (const [file, anchor] of _anchors) {
        assert.ok(anchors(readFileSync(resolve(root, 'wiki', file), 'utf8')).has(anchor), file + '#' + anchor);
    }
    assert.deepEqual(checkResources(resolve(root, 'wiki')).issues, []);
});

test('selection guidance retains prerequisites and supported alternatives without reader commands', () => {
    const _choice = readFileSync(resolve(root, 'wiki/choosing-native-capabilities.md'), 'utf8');
    assert.match(_choice, /complete tabs interaction/);
    assert.match(_choice, /keyboard navigation, tab\/panel semantics and panel switching/);
    assert.match(_choice, /Keep selection state with the native option owner/);
    assert.doesNotMatch(_choice, /scripts\/catalog\.mjs|`(?:compose|contract|show) style PATH/);
    assert.equal(existsSync(resolve(root, 'jaml/scripts/catalog.mjs')), false);
    assert.equal(existsSync(resolve(root, 'jaml/scripts/references.mjs')), false);
    assert.equal(existsSync(resolve(root, 'wiki/API')), false);
});
