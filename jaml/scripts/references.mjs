import { createHash } from 'node:crypto';
import { readFileSync, realpathSync } from 'node:fs';
import { isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const referencesRoot = fileURLToPath(new URL('../references', import.meta.url));
export const chooser = 'choosing-native-capabilities.md';
export const readerCommand = 'node ' + "'" + fileURLToPath(new URL('./catalog.mjs', import.meta.url)).replaceAll("'", "'\\''") + "'";

export function readReference(name, root = referencesRoot) {
    if (!name || isAbsolute(name) || name.split(/[\\/]/).includes('..') || !name.endsWith('.md')) {
        throw new Error('Use a relative Markdown path within references, such as Styles/interact.md');
    }
    // Accept the prefix copied from skill links, still relative to this root.
    name = name.replace(/^references\//, '');
    const _root = realpathSync(root);
    let _path;
    try {
        _path = realpathSync(resolve(root, name));
    } catch (error) {
        if (error.code !== 'ENOENT' && error.code !== 'ENOTDIR') {
            throw error;
        }
        throw new Error('Reference not found: ' + name + '. Paths are relative to the installed references directory, independent of cwd; for example: ' + readerCommand + ' read Styles/check.md');
    }
    const _relative = relative(_root, _path);
    if (_relative.startsWith('..') || isAbsolute(_relative)) {
        throw new Error('Reference escapes the installed reference boundary');
    }
    const _text = readFileSync(_path, 'utf8');
    return { name, text: _text, sha256: createHash('sha256').update(_text).digest('hex') };
}

// Index headings outside fenced examples; retain source text rather than a second guide.
export function referenceSections(text) {
    const _headings = [];
    const _seen = new Map();
    let _fence;
    let _offset = 0;
    for (const line of text.match(/[^\n]*\n|[^\n]+$/g) ?? []) {
        const _line = line.replace(/\r?\n$/, '');
        const _marker = _line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
        if (_fence) {
            if (_marker && _marker[1][0] === _fence[0] && _marker[1].length >= _fence.length && !_marker[2].trim()) {
                _fence = undefined;
            }
        } else if (_marker) {
            _fence = _marker[1];
        } else {
            const _heading = _line.match(/^ {0,3}(#{1,6})\s+(.+?)\s*#*\s*$/);
            if (_heading) {
                const _title = _heading[2];
                const _base = _title
                    .replace(/<[^>]*>/g, '')
                    .toLowerCase()
                    .replace(/[^\p{L}\p{N}_\-\s]/gu, '')
                    .replace(/\s/g, '-');
                const _count = _seen.get(_base) ?? 0;
                _seen.set(_base, _count + 1);
                _headings.push({ heading: _title, anchor: _base + (_count ? '-' + _count : ''), level: _heading[1].length, start: _offset });
            }
        }
        _offset += line.length;
    }
    return _headings.map((heading, index) => ({ ...heading, introEnd: _headings[index + 1]?.start ?? text.length, end: _headings.slice(index + 1).find((next) => next.level <= heading.level)?.start ?? text.length }));
}

export function selectSection(reference, anchor) {
    const _sections = referenceSections(reference.text);
    const _selected = _sections.find((section) => section.anchor === anchor);
    if (!_selected) {
        const _normalized = anchor.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase();
        const _suggestions = _sections
            .filter((section) => {
                const _candidate = section.anchor.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase();
                return _candidate === _normalized || (_normalized.length >= 3 && (_candidate.includes(_normalized) || _normalized.includes(_candidate)));
            })
            .slice(0, 3);
        const _hint = _suggestions.length ? ' Nearby anchors: ' + _suggestions.map((section) => reference.name + '#' + section.anchor).join(', ') + '.' : '';
        throw new Error('Unknown section: ' + anchor + '.' + _hint + ' Use ' + readerCommand + ' sections ' + reference.name + ' to discover exact anchors.');
    }
    const _ancestors = [];
    for (const section of _sections) {
        if (section.start >= _selected.start) {
            break;
        }
        if (section.end > _selected.start && section.level < _selected.level) {
            _ancestors.push(section);
        }
    }
    const _preambleEnd = _sections[0]?.start ?? 0;
    const _context = reference.text.slice(0, _preambleEnd) + _ancestors.map((section) => reference.text.slice(section.start, section.introEnd)).join('');
    return { ...reference, anchor, text: _context + reference.text.slice(_selected.start, _selected.end), ancestorContext: _ancestors.map((section) => section.anchor), omittedSections: _sections.filter((section) => !_ancestors.includes(section) && (section.start < _selected.start || section.start >= _selected.end)).length };
}

export function referenceOutput(reference, anchor) {
    const _view = anchor ? selectSection(reference, anchor) : reference;
    return [`Reference: ${reference.name}${anchor ? '#' + anchor : ''} · SHA256: ${reference.sha256}`, anchor ? `Scope: selected subtree plus ancestor introductions; ${_view.omittedSections} other sections omitted. Follow relevant linked contracts; this is not the whole guide.` : 'Scope: complete guide, including explanations and examples.', `Expand: ${readerCommand} sections ${reference.name} | ${readerCommand} read ${reference.name}`, '', _view.text.trimEnd()].join('\n');
}
