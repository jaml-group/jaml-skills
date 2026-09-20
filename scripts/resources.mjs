import { createHash } from 'node:crypto';
import { existsSync, lstatSync, readFileSync, readdirSync, realpathSync } from 'node:fs';
import { dirname, extname, isAbsolute, relative, resolve } from 'node:path';

export function filesUnder(root, boundary = root) {
    const _boundary = realpathSync(boundary);
    function assertContained(path) {
        const _real = realpathSync(path);
        if (_real !== _boundary && !_real.startsWith(_boundary + '/')) { throw new Error('External resource link: ' + path); }
    }
    const _files = [];
    function visit(directory, ancestors = new Set()) {
        assertContained(directory);
        const _real = realpathSync(directory);
        if (ancestors.has(_real)) { throw new Error('Recursive resource link: ' + directory); }
        const _next = new Set([...ancestors, _real]);
        for (const entry of readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
            if (['.git', '.DS_Store', 'node_modules', 'dist'].includes(entry.name)) { continue; }
            const _path = resolve(directory, entry.name);
            if (entry.isDirectory() || entry.isSymbolicLink() && lstatSync(realpathSync(_path)).isDirectory()) { visit(_path, _next); }
            else { assertContained(_path); _files.push(_path); }
        }
    }
    visit(root);
    return _files;
}

export function sha256(file) { return createHash('sha256').update(readFileSync(file)).digest('hex'); }

export function verifyInventory(root, inventory) {
    function inspect(directory) {
        for (const entry of readdirSync(directory, { withFileTypes: true })) {
            const _path = resolve(directory, entry.name);
            const _name = relative(root, _path).replaceAll('\\', '/');
            if (entry.isSymbolicLink()) { throw new Error('Invalid artifact resource: ' + _name); }
            if (entry.isDirectory()) { inspect(_path); }
            else if (_name !== 'manifest.json' && !Object.hasOwn(inventory, _name)) { throw new Error('Unlisted artifact resource: ' + _name); }
        }
    }
    inspect(root);
    for (const [name, hash] of Object.entries(inventory)) {
        const _path = resolve(root, name);
        const _relative = relative(root, _path);
        if (isAbsolute(name) || _relative.startsWith('..') || !existsSync(_path) || lstatSync(_path).isSymbolicLink() || sha256(_path) !== hash) {
            throw new Error('Invalid artifact resource: ' + name);
        }
    }
}

function headings(source) {
    const _slugs = new Set();
    const _seen = new Map();
    for (const match of source.matchAll(/^#{1,6}\s+(.+)$/gm)) {
        let _slug = match[1].replace(/<[^>]*>/g, '').toLowerCase().replace(/[^\p{L}\p{N}_\-\s]/gu, '').replace(/\s/g, '-');
        const _count = _seen.get(_slug) ?? 0;
        _seen.set(_slug, _count + 1);
        if (_count) { _slug += '-' + _count; }
        _slugs.add(_slug);
    }
    for (const match of source.matchAll(/(?:id|name)=["']([^"']+)["']/g)) { _slugs.add(match[1]); }
    return _slugs;
}

export function checkResources(root) {
    const _issues = [];
    const _files = filesUnder(root);
    for (const file of _files.filter((path) => extname(path) === '.md')) {
        const _source = readFileSync(file, 'utf8');
        const _text = _source.replace(/^([`~]{3,})[^\n]*\n[\s\S]*?^\1\s*$/gm, '').replace(/(`+)[\s\S]*?\1(?!`)/g, '');
        for (const match of _text.matchAll(/!?\[[^\]\n]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
            const _href = match[1];
            if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(_href)) { continue; }
            const [_name, _anchor] = _href.split('#');
            const _path = _name ? resolve(dirname(file), decodeURIComponent(_name.split('?')[0])) : file;
            if (!existsSync(_path)) {
                _issues.push(relative(root, file) + ': missing ' + _href);
            } else if (!realpathSync(_path).startsWith(realpathSync(root) + '/') && realpathSync(_path) !== realpathSync(root)) {
                _issues.push(relative(root, file) + ': external local dependency ' + _href);
            } else if (_anchor && extname(_path) === '.md' && !headings(readFileSync(_path, 'utf8')).has(decodeURIComponent(_anchor))) {
                _issues.push(relative(root, file) + ': missing anchor ' + _href);
            }
        }
    }
    return { files: _files.length, issues: _issues };
}
