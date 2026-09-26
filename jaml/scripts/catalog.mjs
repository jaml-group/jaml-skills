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
    const _localized = catalog.reader.resolveAuthoringManifests(catalog.metadata, locale);
    return { ..._entry, locale: _localized.locale, catalogDigest: catalog.pin.catalogDigest, schemaDigest: catalog.pin.schemaDigest, profile: _localized[kind === 'style' ? 'styles' : 'plugins'].argSchemas[path], reference: profilePath(_entry, _localized.locale) };
}

async function main(args) {
    const _localeAt = args.indexOf('--locale');
    const _locale = _localeAt >= 0 ? args.splice(_localeAt, 2)[1] : 'en';
    const [_command, _kind, _path = ''] = args;
    if (!['show', 'list'].includes(_command) || !['style', 'plugin'].includes(_kind) || args.length > 3 || !['en', 'zh'].includes(_locale)) {
        throw new Error('Usage: catalog.mjs show|list style|plugin PATH_OR_PREFIX [--locale en|zh]');
    }
    const _catalog = await loadCatalog();
    if (_command === 'list') {
        console.log(JSON.stringify({ catalogDigest: _catalog.pin.catalogDigest, entries: _catalog.entries.filter((entry) => entry.kind === _kind && entry.path.startsWith(_path)).map((entry) => ({ ...entry, reference: profilePath(entry, _locale) })) }, null, 2));
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
