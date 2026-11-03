import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { generateSkillDocMap } from '../scripts/skill-doc-map.mjs';

const index = `# Element index
## Elements
| Type | Class | Doc |
| --- | --- | --- |
| \`controlgroup\` | \`Group\` | [group](./control-group.md) |
| \`input\` | \`Input\` | [input](./input.md) |
| \`range\` | — | _(extends input)_ |
## Representers
| Type | Class | Description |
| --- | --- | --- |
| \`code\` | — | [input](./input.md) |
| [\`vanilla\`](vanilla.md) | — | HTML primitive |
| \`data\` | — | [shared data](../JAML/state.md#shared) |
| \`hr\` | — | Horizontal rule |
## Common API
| \`not-a-type\` | — | [not indexed](./absent.md) |
`;
const skill = '# Skill\n\nKeep introduction.\n\n<!-- generated-element-doc-map:start -->\n\n<!-- generated-element-doc-map:end -->\n\nKeep contract.\n';

function fixture(t) {
    const _root = mkdtempSync(resolve(tmpdir(), 'jaml-skill-doc-map-'));
    t.after(() => rmSync(_root, { recursive: true, force: true }));
    for (const [path, text] of Object.entries({
        'jaml/SKILL.md': skill,
        'wiki/JAM-UI/JAM-UI.md': index,
        'wiki/JAM-UI/control-group.md': '# Group\n',
        'wiki/JAM-UI/input.md': '# Input\n',
        'wiki/JAM-UI/vanilla.md': '# Vanilla\n',
        'wiki/JAML/state.md': '# State\n\n## Shared\n'
    })) {
        const _file = resolve(_root, path);
        mkdirSync(dirname(_file), { recursive: true });
        writeFileSync(_file, text);
    }
    return _root;
}

test('projects actual index links and shared owners without inferring filenames or changing surrounding guidance', (t) => {
    const _root = fixture(t);
    assert.deepEqual(generateSkillDocMap(_root), { types: 7, destinations: 6, changed: true });
    const _result = readFileSync(resolve(_root, 'jaml/SKILL.md'), 'utf8');
    assert.ok(_result.startsWith('# Skill\n\nKeep introduction.\n\n'));
    assert.ok(_result.endsWith('\n\nKeep contract.\n'));
    for (const link of ['[`controlgroup`](references/JAM-UI/control-group.md)', '[`input`, `code`](references/JAM-UI/input.md)', '[`range`](references/JAM-UI/JAM-UI.md#elements)', '[`vanilla`](references/JAM-UI/vanilla.md)', '[`data`](references/JAML/state.md#shared)', '[`hr`](references/JAM-UI/JAM-UI.md#representers)']) {
        assert.ok(_result.includes(link), link);
    }
    assert.ok(!_result.includes('not-a-type'));
    assert.equal(generateSkillDocMap(_root, { check: true }).changed, false);
    assert.equal(generateSkillDocMap(_root).changed, false);
});

test('an index owner change fails freshness without mutation until regeneration follows the new link', (t) => {
    const _root = fixture(t);
    generateSkillDocMap(_root);
    const _file = resolve(_root, 'jaml/SKILL.md');
    const _before = readFileSync(_file, 'utf8');
    writeFileSync(resolve(_root, 'wiki/JAM-UI/controls.md'), '# Controls\n');
    writeFileSync(resolve(_root, 'wiki/JAM-UI/JAM-UI.md'), index.replace('./control-group.md', './controls.md'));
    assert.throws(() => generateSkillDocMap(_root, { check: true }), /Stale skill documentation map/);
    assert.equal(readFileSync(_file, 'utf8'), _before);
    generateSkillDocMap(_root);
    assert.ok(readFileSync(_file, 'utf8').includes('[`controlgroup`](references/JAM-UI/controls.md)'));
    assert.equal(generateSkillDocMap(_root, { check: true }).changed, false);
});

test('invalid, missing or ambiguous index owners and malformed markers fail without changing the skill', async (t) => {
    for (const [name, change, error] of [
        ['duplicate type', (text) => text.replace('`range`', '`input`'), /Duplicate indexed element/],
        ['missing section', (text) => text.replace('## Representers', '## Other'), /Missing or empty element index section/],
        ['duplicate section', (text) => text + '\n## Elements\n', /Duplicate element index section/],
        ['malformed row', (text) => text.replace('| `range` |', '| range |'), /Unrecognized element index row/],
        ['ambiguous owner', (text) => text.replace('[input](./input.md)', '[input](./input.md) and [group](./control-group.md)'), /Ambiguous documentation owner/],
        ['missing file', (text) => text.replace('./input.md', './absent.md'), /ENOENT/],
        ['outside wiki', (text) => text.replace('./input.md', '../../jaml/SKILL.md'), /inside wiki/],
        ['external link', (text) => text.replace('./input.md', 'https://example.test/input.md'), /local documentation link/]
    ]) {
        await t.test(name, (t) => {
            const _root = fixture(t);
            writeFileSync(resolve(_root, 'wiki/JAM-UI/JAM-UI.md'), change(index));
            assert.throws(() => generateSkillDocMap(_root), error);
            assert.equal(readFileSync(resolve(_root, 'jaml/SKILL.md'), 'utf8'), skill);
        });
    }
    await t.test('symlink outside wiki', (t) => {
        const _root = fixture(t);
        rmSync(resolve(_root, 'wiki/JAM-UI/input.md'));
        symlinkSync(resolve(_root, 'jaml/SKILL.md'), resolve(_root, 'wiki/JAM-UI/input.md'));
        assert.throws(() => generateSkillDocMap(_root), /inside wiki/);
        assert.equal(readFileSync(resolve(_root, 'jaml/SKILL.md'), 'utf8'), skill);
    });
    for (const text of [skill.replace('<!-- generated-element-doc-map:start -->', ''), skill + '<!-- generated-element-doc-map:end -->', skill.replace('generated-element-doc-map:start', 'generated-element-doc-map:end').replace('generated-element-doc-map:end -->\n\nKeep', 'generated-element-doc-map:start -->\n\nKeep')]) {
        await t.test('malformed markers', (t) => {
            const _root = fixture(t);
            writeFileSync(resolve(_root, 'jaml/SKILL.md'), text);
            assert.throws(() => generateSkillDocMap(_root), /one ordered pair/);
            assert.equal(readFileSync(resolve(_root, 'jaml/SKILL.md'), 'utf8'), text);
        });
    }
});
