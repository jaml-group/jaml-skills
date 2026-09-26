import { createHash } from 'node:crypto';

import { authoringFields, catalogEntries } from './catalogSchema.mjs';
import { I18nCore, hasTranslationBindings, isTranslationWrapper, parseTranslationExpression } from './generated/sharedI18n.mjs';
export { authoringFields } from './catalogSchema.mjs';

export function messageReferences(schema) {
    const _refs = [];
    const _add = (profile, fields, path) => {
        for (const field of fields) {
            if (profile?.[field] !== undefined) {
                if (typeof profile[field] !== 'string' || (schema.documentationFormat === 'messages' && !profile[field])) {
                    if (!schema.documentationFormat) {
                        continue;
                    }
                    throw new Error(`Authoring field ${path}.${field} must be a nonempty string`);
                }
                if (schema.documentationFormat === 'messages') {
                    _refs.push({ field: `${path}.${field}`, key: profile[field] });
                } else if (isTranslationWrapper(profile[field])) {
                    const _expression = parseTranslationExpression(profile[field]);
                    if (hasTranslationBindings(_expression)) {
                        throw new TypeError(`Authoring field ${path}.${field} requires a component binding context`);
                    }
                    _refs.push({ field: `${path}.${field}`, ..._expression });
                }
            }
        }
    };
    _add(schema, authoringFields, 'definition');
    for (const [key, arg] of Object.entries(schema.args ?? {})) {
        _add(arg, ['desc', 'comment'], `args.${key}`);
        for (const [index, option] of (arg.options ?? []).entries()) {
            if (option && typeof option === 'object') {
                _add(option, option.valueOrigin === 'name' ? ['name', 'desc', 'description'] : ['name'], `args.${key}.options.${index}`);
            }
        }
    }
    return _refs;
}

function runtimeSchema(schema) {
    const _result = { ...schema, args: {} };
    for (const field of [...authoringFields, 'hosts', 'states', 'examples', 'documentationFormat']) {
        delete _result[field];
    }
    for (const [key, arg] of Object.entries(schema.args ?? {})) {
        const { desc, comment, tuner, min, max, step, ..._arg } = arg;
        if (_arg.options) {
            _arg.options = _arg.options.map((option) => {
                if (option && typeof option === 'object' && ('value' in option || option.valueMetadata)) {
                    const { name, ..._option } = option;
                    if (_option.valueOrigin === 'name') {
                        delete _option.desc;
                        delete _option.description;
                    }
                    return Object.hasOwn(_option, 'value') && Object.keys(_option).length === 1 ? _option.value : _option;
                }
                return option;
            });
        }
        _result.args[key] = _arg;
    }
    return _result;
}

export function catalogDigest(value) {
    return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

export function buildAuthoringCatalog(styles, plugins, messages, frameworkVersion, declaredLicense = 'unknown', I18nImplementation = I18nCore) {
    const _keys = new Set();
    const _runtime = [];
    const _coverage = { total: 0, migrated: 0, compatibility: 0, documented: 0, partial: 0, undocumented: 0, translations: {} };
    for (const entry of catalogEntries({ styles, plugins })) {
        const _manifest = entry.kind === 'style' ? styles : plugins;
        const _schema = _manifest.schemaTable[entry.schemaRef];
        const _migrated = entry.format !== 'legacy';
        const _refs = messageReferences(_schema);
        _refs.forEach(({ key }) => _keys.add(key));
        _runtime.push([entry.kind, entry.path, runtimeSchema(_schema)]);
        _coverage.total++;
        _coverage[_migrated ? 'migrated' : 'compatibility']++;
        _coverage[entry.knowledge]++;
    }
    const _messages = {};
    const _i18n = new I18nImplementation({ fallbackLocale: 'en' });
    for (const [locale, catalog] of Object.entries(messages)) {
        _i18n.registerTranslations(locale, catalog);
    }
    for (const locale of Object.keys(messages).sort()) {
        _messages[locale] = {};
        const _missing = [];
        const _fallback = [];
        let _translated = 0;
        for (const key of [..._keys].sort()) {
            if (typeof messages[locale][key] === 'string') {
                _messages[locale][key] = messages[locale][key];
                _translated++;
            } else if (_i18n.resolve(key, locale)) {
                _fallback.push(key);
            } else {
                _missing.push(key);
            }
        }
        _coverage.translations[locale] = { translated: _translated, fallback: _fallback, missing: _missing };
    }
    const _catalog = { formatVersion: 1, frameworkVersion, declaredLicense, messages: _messages, coverage: _coverage, schemaDigest: catalogDigest(_runtime) };
    return { ..._catalog, digest: catalogDigest({ styles, plugins, catalog: _catalog }) };
}

export function publicAuthoringArtifact(metadata) {
    if (!metadata.catalog) {
        throw new Error('Authoring catalog is unavailable; regenerate bundled metadata');
    }
    return { styles: metadata.styles, plugins: metadata.plugins, catalog: metadata.catalog };
}

export function verifyAuthoringArtifact(metadata) {
    if (metadata?.catalog?.formatVersion !== 1 || !metadata.styles || !metadata.plugins) {
        throw new Error('Unsupported authoring catalog format');
    }
    const { digest, ..._catalog } = metadata.catalog;
    if (digest !== catalogDigest({ styles: metadata.styles, plugins: metadata.plugins, catalog: _catalog })) {
        throw new Error('Authoring catalog digest mismatch');
    }
    const _ids = new Set();
    for (const entry of catalogEntries(metadata)) {
        if (_ids.has(entry.id)) {
            throw new Error(`Duplicate authoring identity ${entry.id}`);
        }
        _ids.add(entry.id);
    }
    if (_ids.size !== metadata.catalog.coverage.total) {
        throw new Error('Authoring inventory coverage mismatch');
    }
    return metadata.catalog.digest;
}
