import { authoringContextFields, authoringFields } from './catalogSchema.mjs';
import { I18nCore, canonicalLocale, hasTranslationBindings, isTranslationWrapper, parseTranslationExpression } from './generated/sharedI18n.mjs';
export { authoringContextFields, catalogEntries } from './catalogSchema.mjs';

export function createAuthoringTranslator(catalog, locale = 'en') {
    const _locale = canonicalLocale(locale);
    const _core = new I18nCore({ fallbackLocale: 'en' });
    for (const [language, messages] of Object.entries(catalog?.messages ?? {})) {
        _core.registerTranslations(language, messages);
    }
    return { locale: _locale, core: _core, translate: (key, args = []) => _core.translate(key, args.length === 1 && args[0] && typeof args[0] === 'object' && !Array.isArray(args[0]) ? args[0] : args, _locale) };
}

export function resolveAuthoringText(value, translate, format) {
    if (typeof value !== 'string') {
        return value;
    }
    if (format === 'messages') {
        return translate(value);
    }
    if (!isTranslationWrapper(value)) {
        return value;
    }
    const _expression = parseTranslationExpression(value);
    if (hasTranslationBindings(_expression)) {
        throw new TypeError('Authoring translation requires a component binding context');
    }
    return translate(_expression.key, _expression.args);
}

function resolveSchema(schema, translate) {
    const _resolve = (value, fields) => {
        const _result = { ...value };
        for (const field of fields) {
            if (typeof _result[field] === 'string') {
                _result[field] = resolveAuthoringText(_result[field], translate, schema.documentationFormat);
            }
        }
        return _result;
    };
    const _result = _resolve(schema, authoringFields);
    _result.args = Object.fromEntries(
        Object.entries(schema.args ?? {}).map(([key, arg]) => {
            const _arg = _resolve(arg, ['desc', 'comment']);
            if (arg.options) {
                _arg.options = arg.options.map((option) => (option && typeof option === 'object' && ('value' in option || option.valueMetadata) ? _resolve(option, option.valueOrigin === 'name' ? ['name', 'desc', 'description'] : ['name']) : option));
            }
            return [key, _arg];
        })
    );
    return _result;
}

export function resolveAuthoringManifests(manifests, locale = 'en') {
    const { translate, locale: resolvedLocale } = createAuthoringTranslator(manifests.catalog, locale);
    const _resolveGuide = (guide) => ({
        ...guide,
        ...Object.fromEntries(['title', 'body'].filter((key) => guide[key] !== undefined).map((key) => [key, resolveAuthoringText(guide[key], translate, 'translations')])),
        ...(guide.table ? { table: { headers: guide.table.headers.map((cell) => resolveAuthoringText(cell, translate, 'translations')), rows: guide.table.rows.map((row) => row.map((cell) => resolveAuthoringText(cell, translate, 'translations'))) } } : {}),
        ...(guide.sections ? { sections: guide.sections.map(_resolveGuide) } : {})
    });
    const _manifest = (manifest) => {
        if (!manifest) {
            return manifest;
        }
        const _schemas = manifest.argSchemas ?? Object.fromEntries(Object.entries(manifest.argSchemaRefs ?? {}).map(([path, index]) => [path, manifest.schemaTable[index]]));
        const _guides = Object.fromEntries(
            Object.entries(manifest.guides ?? {}).map(([path, entry]) => {
                const _entry = resolveSchema({ ...entry, documentationFormat: 'translations' }, translate);
                delete _entry.args;
                if (entry.guide) {
                    _entry.guide = _resolveGuide(entry.guide);
                }
                return [path, _entry];
            })
        );
        const _withGroupContext = (path, schema) => {
            const _context = {};
            const _parts = path.split('.');
            // Only actual ancestor groups supply context; callable parents and
            // outline placement do not broaden a variant's own contract.
            for (let depth = 1; depth < _parts.length; depth++) {
                const _group = _guides[_parts.slice(0, depth).join('.')];
                if (_group?.group) {
                    for (const field of authoringContextFields) {
                        if (_group[field] !== undefined) {
                            _context[field] = _group[field];
                        }
                    }
                }
            }
            return { ..._context, ...resolveSchema(schema, translate) };
        };
        return { ...manifest, ...(manifest.guides ? { guides: _guides } : {}), argSchemas: Object.fromEntries(Object.entries(_schemas).map(([path, schema]) => [path, _withGroupContext(path, schema)])) };
    };
    return { ...manifests, locale: resolvedLocale, styles: _manifest(manifests.styles), plugins: _manifest(manifests.plugins) };
}

export function createCatalogInspector(metadata, locale = 'en') {
    const _view = resolveAuthoringManifests(metadata, locale);
    return (kind, path) => (kind === 'style' ? _view.styles : _view.plugins)?.argSchemas?.[path];
}
