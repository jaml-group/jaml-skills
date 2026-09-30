import { isDeepStrictEqual } from 'node:util';

const cell = (value) => String(value).replaceAll('|', '\\|').replaceAll('\n', '<br>');
const code = (value) => '`' + cell(typeof value === 'string' ? value : JSON.stringify(value)) + '`';
const labels = {
    en: {
        type: 'Type',
        default: 'Default',
        detail: 'Contract',
        args: 'Argument',
        absent: 'Not supplied',
        opaque: 'Runtime-determined',
        order: 'Positional order',
        added: 'Additions and overrides',
        excluded: 'Not inherited',
        common: 'Common arguments',
        options: 'Options',
        group: 'Group only; not callable.'
    },
    zh: {
        type: '类型',
        default: '默认值',
        detail: '契约',
        args: '参数',
        absent: '未提供',
        opaque: '运行时决定',
        order: '位置参数顺序',
        added: '新增与覆盖',
        excluded: '未继承',
        common: '公共参数',
        options: '选项',
        group: '仅为分组，不可调用。'
    }
};
const anchor = (path) => path.toLowerCase().replaceAll('.', '');

export function argumentTable(args, locale) {
    const _labels = labels[locale];
    const _entries = Object.entries(args);
    const _rows = _entries.map(([name, arg]) => {
        const _details = [arg.desc, arg.comment, arg.unit ? `Unit: ${code(arg.unit)}` : '', arg.shorthand ? (locale === 'zh' ? '支持简写' : 'Shorthand') : ''];
        if (arg.options?.length) {
            _details.push(
                `${_labels.options}: ${arg.options
                    .map((option) =>
                        option && typeof option === 'object'
                            ? [
                                  option.valueMetadata ? _labels.opaque + ' (' + option.valueMetadata.valueType + ')' : code('value' in option ? option.value : option),
                                  option.name,
                                  option.desc,
                                  option.description,
                                  ...Object.entries(option)
                                      .filter(([key]) => !['value', 'valueMetadata', 'name', 'desc', 'description'].includes(key))
                                      .map(([key, value]) => key + ': ' + code(value))
                              ]
                                  .filter(Boolean)
                                  .join(' — ')
                            : code(option)
                    )
                    .join(', ')}`
            );
        }
        const _constraints = Object.fromEntries(Object.entries(arg).filter(([key]) => !['type', 'default', 'defaultMetadata', 'desc', 'comment', 'unit', 'shorthand', 'options', 'tuner'].includes(key)));
        if (Object.keys(_constraints).length) {
            _details.push(code(_constraints));
        }
        if (arg.tuner) {
            _details.push(`${locale === 'zh' ? '编辑提示（非运行时限制）' : 'Editor hints (not runtime limits)'}: ${code(arg.tuner)}`);
        }
        return [code(name), code(arg.type ?? _labels.absent), arg.defaultMetadata ? _labels.opaque + ' (' + arg.defaultMetadata.valueType + ')' : Object.hasOwn(arg, 'default') ? code(arg.default) : _labels.absent, _details.filter(Boolean).map(cell).join('<br>')];
    });
    const _columns = [0, ...(_entries.some(([, arg]) => arg.type !== undefined) ? [1] : []), ...(_entries.some(([, arg]) => Object.hasOwn(arg, 'default') || arg.defaultMetadata) ? [2] : []), ...(_rows.some((row) => row[3]) ? [3] : [])];
    const _header = [_labels.args, _labels.type, _labels.default, _labels.detail];
    const _row = (values) => '| ' + _columns.map((column) => values[column]).join(' | ') + ' |';
    return [_row(_header), _row(_header.map(() => '---')), ..._rows.map(_row)].join('\n');
}

/** Compare complete resolved arguments; sharing never changes positional order. */
export function argumentLines(args, locale, shared) {
    const _labels = labels[locale];
    const _lines = [];
    if (Object.keys(args).length) {
        _lines.push(`${_labels.order}: ${Object.keys(args).map(code).join(' → ')}.`, '');
    }
    const _base = shared?.args ?? {};
    const _changes = Object.fromEntries(Object.entries(args).filter(([key, arg]) => !isDeepStrictEqual(arg, _base[key])));
    if (shared) {
        _lines.push(`${_labels.common}: [${shared.path}](${shared.link}).`, '');
    }
    const _excluded = Object.keys(_base).filter((key) => !Object.hasOwn(args, key));
    if (_excluded.length) {
        _lines.push(`${_labels.excluded}: ${_excluded.map(code).join(', ')}.`, '');
    }
    if (Object.keys(_changes).length) {
        if (shared) {
            _lines.push(`${_labels.added}:`, '');
        }
        _lines.push(argumentTable(_changes, locale), '');
    }
    return _lines;
}

/** The outline orders existing capabilities; the runtime remains their inventory. */
export function renderFamilyGuides(catalog) {
    const _files = new Map();
    for (const locale of ['en', 'zh']) {
        const _labels = labels[locale];
        const _view = catalog.reader.resolveAuthoringManifests(catalog.metadata, locale).styles;
        const _root = _view.guides?.animation;
        if (!_root) {
            continue;
        }
        const _commonSection = _root.guide.sections.find((section) => section.commonArgs);
        const _commonPath = _commonSection.commonArgs;
        const _commonAnchor = _commonSection.title.toLowerCase().replaceAll(' ', '-');
        const _lines = ['# animation', '', '<!-- Generated by catalog:generate; do not edit. -->', '', locale === 'en' ? '[中文](animation.zh.md)' : '[English](animation.md)', '', _root.guide.body, ''];
        const _seen = new Set();
        const _prose = (schema, inherited = {}) => {
            for (const field of catalog.authoringFields) {
                if (schema[field] && schema[field] !== inherited[field]) {
                    _lines.push(schema[field], '');
                }
            }
        };
        const _examples = (examples = []) => {
            for (const example of examples) {
                _lines.push('```javascript jaml-playground', example.source.trimEnd(), '```', '');
                for (const [name, source] of Object.entries(example.assets)) {
                    if (_files.has(name) && _files.get(name) !== source) {
                        throw new Error(`Conflicting example asset ${name}`);
                    }
                    _files.set(name, source);
                }
            }
        };
        const _callable = (path, inherited) => {
            if (_seen.has(path)) {
                throw new Error(`Repeated animation guide entry ${path}`);
            }
            _seen.add(path);
            const _schema = _view.argSchemas[path];
            _lines.push('<a id="entry-' + path.toLowerCase().replaceAll('.', '-') + '"></a>', '');
            _prose(_schema, inherited);
            const _basePath = path === _commonPath ? _commonPath : _view.guides[path]?.argsFrom;
            _lines.push(
                ...argumentLines(
                    _schema.args,
                    locale,
                    _basePath
                        ? {
                              path: _basePath,
                              args: _view.argSchemas[_basePath].args,
                              link: '#' + (_basePath === _commonPath ? _commonAnchor : anchor(_basePath))
                          }
                        : undefined
                )
            );
        };
        const _section = (section, level = 2, inherited = {}) => {
            const _entry = section.include ? _view.guides[section.include] : undefined;
            const _title = section.title ?? (_entry?.group ? _entry.desc : code(section.include));
            _lines.push(`${'#'.repeat(level)} ${_title}`, '');
            let _shared = inherited;
            if (section.include) {
                if (_entry?.group) {
                    const _own = Object.fromEntries(catalog.authoringFields.filter((key) => key !== 'desc' && _entry[key] !== undefined).map((key) => [key, _entry[key]]));
                    _prose(_own, inherited);
                    _shared = {
                        ...inherited,
                        ...Object.fromEntries(catalog.reader.authoringContextFields.filter((key) => _entry[key] !== undefined).map((key) => [key, _entry[key]]))
                    };
                } else {
                    _callable(section.include, inherited);
                }
                // Including a capability does not recursively expand its page outline.
                if (section.include !== 'animation' && _entry?.guide?.body) {
                    _lines.push(_entry.guide.body, '');
                }
            }
            if (section.table) {
                const _row = (cells) => '| ' + cells.map(cell).join(' | ') + ' |';
                _lines.push(_row(section.table.headers), _row(section.table.headers.map(() => '---')), ...section.table.rows.map(_row), '');
            }
            if (section.body) {
                _lines.push(section.body, '');
            }
            if (section.commonArgs) {
                const _args = _view.argSchemas[section.commonArgs].args;
                _lines.push(`${_labels.order}: ${Object.keys(_args).map(code).join(' → ')}.`, '', argumentTable(_args, locale), '');
            }
            _examples(_entry?.guide?.examples);
            for (const child of section.sections ?? []) {
                _section(child, level + 1, _shared);
            }
            _examples(section.examples);
        };
        for (const section of _root.guide.sections) {
            _section(section);
        }
        const _missing = _view.knownPaths.filter((path) => (path === 'animation' || path.startsWith('animation.')) && !_seen.has(path));
        if (_missing.length) {
            throw new Error(`Animation guide omits runtime entries: ${_missing.join(', ')}`);
        }
        _files.set(locale === 'en' ? 'Styles/animation.md' : 'Styles/animation.zh.md', _lines.join('\n'));
    }
    return _files;
}
