import { createHash } from 'node:crypto';
import { lstatSync, readFileSync, realpathSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const skillRoot = fileURLToPath(new URL('..', import.meta.url));
export const publicFiles = ['catalog.json', 'authoringView.mjs', 'authoringCatalog.mjs', 'catalogSchema.mjs', 'generated/sharedI18n.mjs', 'LICENSE'];
export const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');

export function inspectPublicData(data) {
    if (Object.keys(data).sort().join(',') !== 'catalog,plugins,styles' || data.catalog?.formatVersion !== 1) {
        throw new Error('Unsupported public catalog envelope');
    }
    const _manifestFields = new Set(['version', 'source', 'roots', 'knownPaths', 'functionRoots', 'slotRoots', 'alwaysValidPatterns', 'schemaTable', 'argSchemaRefs', 'aliases']);
    for (const kind of ['styles', 'plugins']) {
        const _manifest = data[kind];
        if (Object.keys(_manifest).some((key) => !_manifestFields.has(key)) || !Array.isArray(_manifest.knownPaths) || !Array.isArray(_manifest.schemaTable)) {
            throw new Error('Unsupported public manifest: ' + kind);
        }
        for (const path of _manifest.knownPaths) {
            const _ref = _manifest.argSchemaRefs[path];
            if (!Number.isInteger(_ref) || !_manifest.schemaTable[_ref]) {
                throw new Error('Missing schema: ' + kind + ':' + path);
            }
        }
    }
    const _serialized = JSON.stringify(data);
    if (/\/Users\/|codex:\/\/threads\/|packages\/(?:jam-ui|jaml-language-core)\/src\/|"(?:registries|sourceSignature|extractorSignature)"\s*:/.test(_serialized)) {
        throw new Error('Private provenance is not public catalog data');
    }
    return data;
}

// Only this pinned, publisher-exported reader is loaded. Never import an app's
// modules or run extraction from the consumer's current working directory.
export async function loadCatalog(directory = resolve(skillRoot, 'catalog')) {
    const _pin = JSON.parse(readFileSync(resolve(directory, 'pin.json'), 'utf8'));
    const _files = [...publicFiles, 'artifact.json'];
    if (
        _pin.formatVersion !== 1 ||
        Object.keys(_pin.files ?? {})
            .sort()
            .join(',') !== _files.sort().join(',')
    ) {
        throw new Error('Unsupported catalog pin');
    }
    for (const name of _files) {
        const _file = resolve(directory, name);
        if (lstatSync(_file).isSymbolicLink() || hash(readFileSync(_file)) !== _pin.files[name]) {
            throw new Error('Catalog integrity mismatch: ' + name);
        }
    }
    const _metadata = inspectPublicData(JSON.parse(readFileSync(resolve(directory, 'catalog.json'), 'utf8')));
    const _artifact = JSON.parse(readFileSync(resolve(directory, 'artifact.json'), 'utf8'));
    if (_artifact.catalogDigest !== _pin.catalogDigest || _artifact.schemaDigest !== _pin.schemaDigest || publicFiles.some((name) => _artifact.files[name] !== _pin.files[name])) {
        throw new Error('Publisher artifact does not match its pin');
    }
    if (_metadata.catalog.digest !== _pin.catalogDigest || _metadata.catalog.schemaDigest !== _pin.schemaDigest || _metadata.catalog.frameworkVersion !== _pin.frameworkVersion) {
        throw new Error('Catalog identity does not match its pin');
    }
    const _reader = await import(pathToFileURL(resolve(directory, 'authoringView.mjs')).href);
    const { verifyAuthoringArtifact } = await import(pathToFileURL(resolve(directory, 'authoringCatalog.mjs')).href);
    verifyAuthoringArtifact(_metadata);
    const { authoringFields } = await import(pathToFileURL(resolve(directory, 'catalogSchema.mjs')).href);
    const _entries = [..._reader.catalogEntries(_metadata)];
    if (_entries.length !== _metadata.catalog.coverage.total) {
        throw new Error('Catalog coverage does not match its complete inventory');
    }
    return { metadata: _metadata, reader: _reader, authoringFields, entries: _entries, pin: _pin };
}

export function profilePath(entry, locale = 'en') {
    if (!['en', 'zh'].includes(locale)) {
        throw new Error('Generated references support en and zh');
    }
    return `${locale}/${entry.kind}/${entry.schemaRef}.md`;
}

export function lookup(catalog, kind, path, locale = 'en') {
    const _entry = catalog.entries.find((entry) => entry.kind === kind && entry.path === path);
    if (!_entry) {
        throw new Error(`Unknown catalog path: ${kind}:${path}`);
    }
    const _kind = kind === 'style' ? 'styles' : 'plugins';
    // Resolve one profile through the publisher reader with its full translation context.
    const _localized = catalog.reader.resolveAuthoringManifests({ catalog: catalog.metadata.catalog, [_kind]: { argSchemas: { [path]: catalog.metadata[_kind].schemaTable[_entry.schemaRef] } } }, locale);
    return { ..._entry, locale: _localized.locale, catalogDigest: catalog.pin.catalogDigest, schemaDigest: catalog.pin.schemaDigest, profile: _localized[_kind].argSchemas[path], reference: profilePath(_entry, _localized.locale) };
}

export function contract(catalog, kind, path, locale = 'en', selectedArgs) {
    const _result = lookup(catalog, kind, path, locale);
    const _schema = _result.profile;
    const _args = Object.entries(_schema.args ?? {});
    const _selected = selectedArgs === undefined ? undefined : new Set(selectedArgs);
    if (_selected && (!_selected.size || [..._selected].some((key) => !Object.hasOwn(_schema.args ?? {}, key)))) {
        throw new Error('Unknown or empty argument selection. Read contract ' + kind + ' ' + path + ' for the current argument names; open contracts require their owning reference.');
    }
    const _lines = [`${_result.id}${_result.canonicalId !== _result.id ? ' → ' + _result.canonicalId : ''}`, `Framework: ${catalog.pin.frameworkVersion} · locale: ${_result.locale} · knowledge: ${_result.knowledge} · format: ${_result.format}`, `Catalog: ${_result.catalogDigest} · schema: ${_result.schemaDigest}`, 'Scope: complete profile and argument context; no fields omitted. Missing facts remain unknown; no default does not mean required. Tuner hints are not runtime constraints.', ''];
    for (const [field, value] of Object.entries(_schema)) {
        if (field !== 'args') {
            _lines.push(field + ': ' + (typeof value === 'string' ? value : JSON.stringify(value)));
        }
    }
    if (_schema.argumentContract === 'passthrough') {
        _lines.push('Open forwarding contract: field inference is incomplete, not an empty accepted-argument list. Retrieve the argumentSource owner before composing.');
    }
    _lines.push('', 'Argument order: ' + (_args.map(([key]) => key).join(', ') || '(none cataloged)'));
    const _groups = _selected
        ? [
              ['Selected arguments', _args.filter(([key]) => _selected.has(key))],
              ['Other arguments (dependency context retained)', _args.filter(([key]) => !_selected.has(key))]
          ]
        : [['Arguments', _args]];
    for (const [title, args] of _groups) {
        if (args.length) {
            _lines.push(title + ':', ...args.map(([key, value]) => key + ': ' + JSON.stringify(value)));
        }
    }
    _lines.push('', `Expand: catalog.mjs show ${kind} ${path} --locale ${_result.locale} | references/API/${_result.reference}`);
    return _lines.join('\n');
}

const usage = `Usage:
  catalog.mjs contract|show style|plugin PATH [--locale en|zh]
  catalog.mjs contract style|plugin PATH --args NAME,NAME [--locale en|zh]
  catalog.mjs list style|plugin [PREFIX] [--limit 20] [--offset 0] [--locale en|zh] [--all]
  catalog.mjs choose [SECTION_ANCHOR]
  catalog.mjs sections FILE.md [--limit 20] [--offset 0]
  catalog.mjs read FILE.md[#SECTION_ANCHOR]
Contract is lossless; --args focuses named arguments but retains cross-argument context.
Choose lists topics or reads one topic; read keeps ancestor introductions with a section.
Show preserves the complete structured profile. List is paged; --all explicitly expands it.`;

function parseOptions(args) {
    const _positionals = [];
    const _options = {};
    for (let index = 0; index < args.length; index++) {
        const _value = args[index];
        if (!_value.startsWith('--')) {
            _positionals.push(_value);
            continue;
        }
        if (!['--locale', '--args', '--limit', '--offset', '--all'].includes(_value) || Object.hasOwn(_options, _value)) {
            throw new Error(usage);
        }
        if (_value === '--all') {
            _options[_value] = true;
        } else {
            const _next = args[++index];
            if (!_next || _next.startsWith('--')) {
                throw new Error(usage);
            }
            _options[_value] = _next;
        }
    }
    return { positionals: _positionals, options: _options };
}

function page(items, options) {
    const _limit = options['--limit'] ?? '20';
    const _offset = options['--offset'] ?? '0';
    if (!/^\d+$/.test(_limit) || !/^\d+$/.test(_offset) || +_limit < 1 || +_limit > 100 || !Number.isSafeInteger(+_offset) || (options['--all'] && (options['--limit'] || options['--offset']))) {
        throw new Error('Use --limit 1..100 and a nonnegative safe --offset; --all is a separate explicit expansion.');
    }
    const _end = options['--all'] ? items.length : +_offset + +_limit;
    return { total: items.length, offset: +_offset, limit: options['--all'] ? items.length : +_limit, nextOffset: _end < items.length ? _end : null, entries: items.slice(+_offset, _end) };
}

async function main(args) {
    if (args.length === 1 && args[0] === '--help') {
        console.log(usage);
        return;
    }
    const { positionals, options } = parseOptions(args);
    const [_command, _kind, _path = ''] = positionals;
    const _allowed = {
        show: ['--locale'],
        contract: ['--locale', '--args'],
        list: ['--locale', '--limit', '--offset', '--all'],
        choose: [],
        sections: ['--limit', '--offset'],
        read: []
    };
    if (!_allowed[_command] || Object.keys(options).some((key) => !_allowed[_command].includes(key))) {
        throw new Error(usage);
    }
    if (['choose', 'sections', 'read'].includes(_command)) {
        if (positionals.length > 2 || (_command !== 'choose' && !_kind)) {
            throw new Error(usage);
        }
        const { chooser, readReference, referenceSections, referenceOutput } = await import('./references.mjs');
        if (_command === 'read' || (_command === 'choose' && _kind)) {
            const [_name, _anchor, ..._extra] = (_command === 'choose' ? chooser + '#' + _kind : _kind).split('#');
            if (_extra.length || _anchor === '') {
                throw new Error(usage);
            }
            console.log(referenceOutput(readReference(_name), _anchor));
        } else {
            const _reference = readReference(_command === 'choose' ? chooser : _kind);
            const _sections = referenceSections(_reference.text)
                .filter((section) => _command !== 'choose' || section.level === 2)
                .map(({ heading, anchor, level }) => ({ heading, anchor, level }));
            const _page = page(_sections, options);
            console.log(JSON.stringify({ reference: _reference.name, sha256: _reference.sha256, scope: 'Headings only; retrieve a section before making a choice.', ..._page, read: _command === 'choose' ? 'catalog.mjs choose SECTION_ANCHOR' : 'catalog.mjs read ' + _reference.name + '#SECTION_ANCHOR' }, null, 2));
        }
        return;
    }
    const _locale = options['--locale'] ?? 'en';
    if (!['style', 'plugin'].includes(_kind) || positionals.length > 3 || !['en', 'zh'].includes(_locale) || (_command !== 'list' && !_path)) {
        throw new Error(usage);
    }
    const _catalog = await loadCatalog();
    if (_command === 'list') {
        const _matches = _catalog.entries.filter((entry) => entry.kind === _kind && entry.path.startsWith(_path)).map((entry) => ({ ...entry, reference: profilePath(entry, _locale) }));
        console.log(JSON.stringify({ catalogDigest: _catalog.pin.catalogDigest, schemaDigest: _catalog.pin.schemaDigest, frameworkVersion: _catalog.pin.frameworkVersion, locale: _locale, ...page(_matches, options), scope: 'Identity discovery only; retrieve exact contracts before composing. Continue with --offset nextOffset, narrow PREFIX, or explicitly use --all.' }, null, 2));
    } else if (_command === 'contract') {
        console.log(contract(_catalog, _kind, _path, _locale, options['--args']?.split(',')));
    } else {
        console.log(JSON.stringify(lookup(_catalog, _kind, _path, _locale), null, 2));
    }
}

if (process.argv[1] && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
    main(process.argv.slice(2)).catch((error) => {
        console.error(error.message);
        process.exitCode = 1;
    });
}
