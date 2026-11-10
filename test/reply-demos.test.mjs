import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { readReplyDemos } from '../scripts/read-reply-demos.mjs';

function demo(name, header = 'text jamll-content', body = "{ type: 'label', cap: 'Cue' }", cue = 'Show a label.') {
    const _outer = '````';
    const _inner = '```';
    return `## ${name}\n\n<!-- reply-demo:${name} -->\n\n${cue}\n\n${_outer}text\n${_inner}${header}\n${body}\n${_inner}\n${_outer}`;
}

function readCatalog(t, text) {
    const _root = mkdtempSync(join(tmpdir(), 'jaml-reply-demos-'));
    t.after(() => rmSync(_root, { recursive: true, force: true }));
    mkdirSync(join(_root, 'JAML'));
    writeFileSync(join(_root, 'JAML', 'reply-demos.md'), `# Reply demos\n\n${text}\n`);
    return readReplyDemos(_root);
}

test('reply demos retain catalog order, cue, exact header and body indentation', (t) => {
    const _body = "{ type: 'container' }\n    { type: 'label', cap: 'Nested' }";
    const _module = "export default { type: 'label' };";
    const _text = [demo('nested', 'text jamll-content', _body), demo('module', 'javascript jaml-content', _module)].join('\n\n').replaceAll('\n', '\r\n');
    assert.deepEqual(readCatalog(t, _text), [
        { name: 'nested', cue: 'Show a label.', header: 'text jamll-content', body: _body },
        { name: 'module', cue: 'Show a label.', header: 'javascript jaml-content', body: _module }
    ]);
});

test('reply demo reader rejects duplicate names, unsupported headers and malformed sections', (t) => {
    const _one = demo('metric');
    assert.throws(() => readCatalog(t, `${_one}\n\n${_one}`), /Duplicate reply demo metric/);
    assert.throws(() => readCatalog(t, demo('metric', 'json jamll-content')), /Unsupported reply demo fence/);
    assert.throws(() => readCatalog(t, demo('metric', 'text jamll-content', '  ')), /Malformed cue or fence body/);
    assert.throws(() => readCatalog(t, demo('metric', 'text jamll-content', undefined, '  ')), /Malformed cue or fence body/);
    assert.throws(() => readCatalog(t, `${_one.slice(0, -4)}\n\n${demo('valid')}`), /Malformed cue or fence body/);
    assert.throws(() => readCatalog(t, `${_one}\n\n<!-- reply-demo:unknown -->`), /Malformed reply demo section/);
});
