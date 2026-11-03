import { readFileSync, realpathSync, statSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const startMarker = '<!-- generated-element-doc-map:start -->';
const endMarker = '<!-- generated-element-doc-map:end -->';
const indexPath = 'JAM-UI/JAM-UI.md';
const sections = new Map([
    ['Elements', 'elements'],
    ['Representers', 'representers']
]);

function inside(directory, file) {
    const _relative = relative(directory, file);
    return _relative !== '..' && !_relative.startsWith('..' + sep) && !isAbsolute(_relative);
}

function documentTarget(wiki, link) {
    if (/^[a-z][a-z\d+.-]*:|^\/|\?/i.test(link)) {
        throw new Error('Element index requires a local documentation link: ' + link);
    }
    const [_path, ...fragments] = link.split('#');
    const _file = resolve(wiki, dirname(indexPath), _path || 'JAM-UI.md');
    if (!inside(wiki, _file) || !inside(realpathSync(wiki), realpathSync(_file)) || !statSync(_file).isFile()) {
        throw new Error('Element index link must name a file inside wiki: ' + link);
    }
    return 'references/' + relative(wiki, _file).split(sep).join('/') + (fragments.length ? '#' + fragments.join('#') : '');
}

function renderMap(repository) {
    const _wiki = resolve(repository, 'wiki');
    const _source = readFileSync(resolve(_wiki, indexPath), 'utf8');
    const _seenSections = new Set();
    const _types = new Set();
    const _groups = new Map();
    const _counts = new Map();
    let _section;
    for (const line of _source.split(/\r?\n/)) {
        const _heading = line.match(/^## (.+?)\s*$/);
        if (_heading) {
            _section = sections.get(_heading[1]);
            if (_section) {
                if (_seenSections.has(_section)) {
                    throw new Error('Duplicate element index section: ' + _heading[1]);
                }
                _seenSections.add(_section);
                _counts.set(_section, 0);
            }
            continue;
        }
        if (!_section || !line.startsWith('|')) {
            continue;
        }
        const _cells = line
            .split('|')
            .slice(1, -1)
            .map((cell) => cell.trim());
        if (_cells[0] === 'Type' || _cells.every((cell) => /^:?-+:?$/.test(cell))) {
            continue;
        }
        const _type = _cells[0]?.match(/^`([^`]+)`$|^\[`([^`]+)`\]\([^)]+\)$/);
        if (_cells.length !== 3 || !_type) {
            throw new Error('Unrecognized element index row: ' + line);
        }
        const _name = _type[1] || _type[2];
        if (_types.has(_name)) {
            throw new Error('Duplicate indexed element: ' + _name);
        }
        _types.add(_name);
        _counts.set(_section, _counts.get(_section) + 1);
        const _links = [...new Set([...(_cells[0] + ' ' + _cells[2]).matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => documentTarget(_wiki, match[1])))];
        if (_links.length > 1) {
            throw new Error('Ambiguous documentation owner for indexed element: ' + _name);
        }
        const _target = _links[0] || 'references/' + indexPath + '#' + _section;
        if (!_groups.has(_target)) {
            _groups.set(_target, []);
        }
        _groups.get(_target).push(_name);
    }
    for (const [section, anchor] of sections) {
        if (!_counts.get(anchor)) {
            throw new Error('Missing or empty element index section: ' + section);
        }
    }
    const _links = [..._groups].map(([target, names]) => '[' + names.map((name) => '`' + name + '`').join(', ') + '](' + target + ')');
    const _lines = [];
    for (let index = 0; index < _links.length; index += 4) {
        _lines.push('-   ' + _links.slice(index, index + 4).join(' · '));
    }
    return { text: startMarker + '\n\n' + _lines.join('\n') + '\n\n' + endMarker, types: _types.size, destinations: _groups.size };
}

export function generateSkillDocMap(repository = root, { check = false } = {}) {
    const _file = resolve(repository, 'jaml/SKILL.md');
    const _source = readFileSync(_file, 'utf8');
    if (_source.split(startMarker).length !== 2 || _source.split(endMarker).length !== 2 || _source.indexOf(endMarker) < _source.indexOf(startMarker)) {
        throw new Error('SKILL.md requires one ordered pair of element documentation map markers');
    }
    const _map = renderMap(repository);
    const _next = _source.slice(0, _source.indexOf(startMarker)) + _map.text + _source.slice(_source.indexOf(endMarker) + endMarker.length);
    if (_next !== _source) {
        if (check) {
            throw new Error('Stale skill documentation map; run npm run skill-map:generate');
        }
        writeFileSync(_file, _next);
    }
    return { types: _map.types, destinations: _map.destinations, changed: _next !== _source };
}

if (process.argv[1] && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
    console.log(JSON.stringify(generateSkillDocMap(root, { check: process.argv.includes('--check') }), null, 2));
}
