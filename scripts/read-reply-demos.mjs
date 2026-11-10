import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const catalogPath = 'JAML/reply-demos.md';
const headerPattern = /^(?:text jamll|(?:json|javascript) jaml)-(?:content|artifact|playground)$/;

/** Read the authored cues and exact fence bodies as data, in catalog order. */
export function readReplyDemos(wikiRoot) {
    const _source = readFileSync(join(wikiRoot, catalogPath), 'utf8').replace(/\r\n?/g, '\n');
    const _firstSection = _source.search(/^## /m);
    if (_firstSection < 0 || /<!--\s*reply-demo\b/i.test(_source.slice(0, _firstSection))) {
        throw new Error(`Expected reply demo sections in ${catalogPath}.`);
    }

    const _section = /## [^\n]+\n\n<!-- reply-demo:([a-z][A-Za-z0-9-]*) -->\n\n([^\n]+)\n\n\x60{4}text\n\x60{3}([^\n]+)\n([\s\S]*?)\n\x60{3}\n\x60{4}(?=\n|$)/y;
    const _names = new Set();
    const _demos = [];
    _section.lastIndex = _firstSection;
    while (_section.lastIndex < _source.length) {
        const _start = _section.lastIndex;
        const _match = _section.exec(_source);
        if (!_match) {
            throw new Error(`Malformed reply demo section at ${catalogPath}:${_source.slice(0, _start).split('\n').length}.`);
        }
        const [, name, cue, header, body] = _match;
        if (_names.has(name)) {
            throw new Error(`Duplicate reply demo ${name} in ${catalogPath}.`);
        }
        if (!headerPattern.test(header)) {
            throw new Error(`Unsupported reply demo fence for ${name} in ${catalogPath}: ${header}.`);
        }
        if (!cue.trim() || !body.trim() || /^ {0,3}\x60{3}/m.test(body)) {
            throw new Error(`Malformed cue or fence body for reply demo ${name} in ${catalogPath}.`);
        }
        _names.add(name);
        _demos.push({ name, cue, header, body });
        while (_source[_section.lastIndex] === '\n') {
            _section.lastIndex++;
        }
    }
    return _demos;
}
