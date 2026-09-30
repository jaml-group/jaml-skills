import { posix } from 'node:path';
import { argumentLines, renderFamilyGuides } from './animation-guide.mjs';

const code = (value) => '`' + String(value).replaceAll('`', '\\`') + '`';
const entryAnchor = (path) => 'entry-' + path.toLowerCase().replaceAll('.', '-');
const localFile = (file, locale) => (locale === 'zh' ? file.replace(/\.md$/, '.zh.md') : file);
const isAnimation = (kind, path) => kind === 'style' && (path === 'animation' || path.startsWith('animation.'));
const commonAnchor = (path) => 'common-args-' + path.toLowerCase().replaceAll('.', '-');
const nodes = (node) => [node, ...(node?.sections ?? []).flatMap(nodes)];
const entries = (node) => [...(node?.include ? [node.include] : []), ...(node?.sections ?? []).flatMap(entries)];
const rank = (a, b) => a.split('.').length - b.split('.').length || a.length - b.length || a.localeCompare(b);

/** Every discovered path projects to an exact resolved contract, without copying contextual inventories. */
export function projectGuides(catalog, locale = 'en') {
    const _view = catalog.reader.resolveAuthoringManifests(catalog.metadata, locale);
    const _files = new Map([...renderFamilyGuides(catalog)].filter(([name]) => !name.endsWith('.md') || name.endsWith('.zh.md') === (locale === 'zh')));
    const _targets = new Map();
    const _pages = new Map();
    for (const [kind, manifest] of [
        ['style', _view.styles],
        ['plugin', _view.plugins]
    ]) {
        const _directory = kind === 'style' ? 'Styles' : 'Plugins';
        const _owners = Object.entries(manifest.guides ?? {}).filter(([, record]) => record.guide?.file);
        const _declared = new Map();
        for (const [owner, record] of _owners) {
            const _file = localFile(record.guide.file, locale);
            if (_pages.has(_file)) {
                throw new Error('Multiple guide owners: ' + _file);
            }
            const _guide = structuredClone(record.guide);
            _pages.set(_file, {
                kind,
                owner,
                guide: _guide,
                manifest,
                additions: []
            });
            for (const path of entries(_guide)) {
                if (!manifest.argSchemas[path] && !manifest.guides?.[path]?.group) {
                    throw new Error('Unknown guide entry: ' + kind + ':' + path);
                }
                if (manifest.argSchemas[path] && !_declared.has(path)) {
                    _declared.set(path, _file);
                }
            }
        }
        const _profiles = new Map();
        for (const path of manifest.knownPaths) {
            if (isAnimation(kind, path)) {
                _targets.set(kind + ':' + path, {
                    file: localFile('Styles/animation.md', locale),
                    anchor: entryAnchor(path),
                    path
                });
                continue;
            }
            // Resolved context, captions, runtime values and argument order all participate.
            const _signature = JSON.stringify(manifest.argSchemas[path]);
            if (!_profiles.has(_signature)) {
                _profiles.set(_signature, []);
            }
            _profiles.get(_signature).push(path);
        }
        for (const paths of _profiles.values()) {
            const _paths = new Set(paths);
            const _seeds = new Set(paths.filter((path) => _declared.has(path) || !path.split('.').some((_, index, parts) => index > 0 && _paths.has(parts.slice(index).join('.')))));
            const _seedTargets = new Map();
            for (const seed of _seeds) {
                let _file = _declared.get(seed);
                if (!_file) {
                    const _owner = _owners.filter(([owner]) => seed === owner || seed.startsWith(owner + '.')).sort(([a], [b]) => b.length - a.length)[0];
                    _file = localFile(_owner?.[1].guide.file ?? `${_directory}/${seed.split('.')[0]}.md`, locale);
                    if (!_pages.has(_file)) {
                        _pages.set(_file, { kind, owner: seed.split('.')[0], manifest, guide: { title: seed.split('.')[0], sections: [] }, additions: [] });
                    }
                    _pages.get(_file).additions.push(seed);
                }
                _seedTargets.set(seed, { file: _file, anchor: entryAnchor(seed), path: seed });
            }
            for (const path of paths) {
                const _parts = path.split('.');
                const _seed = _parts.map((_, index) => _parts.slice(index).join('.')).find((suffix) => _seeds.has(suffix));
                if (!_seed) {
                    throw new Error('Missing contextual projection: ' + path);
                }
                _targets.set(kind + ':' + path, _seedTargets.get(_seed));
            }
        }
    }

    for (const [file, page] of _pages) {
        const { kind, owner, guide, manifest } = page;
        const _lines = ['# ' + guide.title, '', '<!-- Generated from native authoring; do not edit. -->', '', locale === 'zh' ? `[English](${posix.basename(file).replace('.zh.md', '.md')})` : `[中文](${posix.basename(file).replace('.md', '.zh.md')})`, ''];
        const _seen = new Set();
        const _common = new Map(
            nodes(guide)
                .filter((node) => node.commonArgs)
                .map((node) => [node.commonArgs, commonAnchor(node.commonArgs)])
        );
        const _sharedArguments = (path) => {
            const _basePath = _common.has(path) ? path : manifest.guides?.[path]?.argsFrom;
            if (!_basePath) {
                return undefined;
            }
            const _args = manifest.argSchemas[_basePath]?.args;
            const _target = _targets.get(kind + ':' + _basePath);
            if (!_args || !_target) {
                throw new Error('Unknown shared argument profile: ' + _basePath);
            }
            const _link = _common.has(_basePath) ? '#' + _common.get(_basePath) : (file === _target.file ? '' : posix.relative(posix.dirname(file), _target.file)) + '#' + _target.anchor;
            return { path: _basePath, args: _args, link: _link };
        };
        const _prose = (schema, inherited = {}) => {
            const _printed = new Set();
            for (const field of catalog.authoringFields) {
                const _value = schema[field];
                if (_value && _value !== inherited[field] && !_printed.has(_value)) {
                    _lines.push(_value, '');
                    _printed.add(_value);
                }
            }
        };
        const _examples = (examples = []) => {
            for (const example of examples) {
                _lines.push('```javascript jaml-playground', example.source.trimEnd(), '```', '');
                for (const [name, source] of Object.entries(example.assets ?? {})) {
                    if (_files.has(name) && _files.get(name) !== source) {
                        throw new Error('Conflicting example asset ' + name);
                    }
                    _files.set(name, source);
                }
            }
        };
        const _contract = (path, inherited = {}) => {
            if (_seen.has(path)) {
                return;
            }
            _seen.add(path);
            const _schema = manifest.argSchemas[path];
            _lines.push(`<a id="${entryAnchor(path)}"></a>`, '');
            _prose(_schema, inherited);
            if (_schema.argumentContract === 'passthrough') {
                _lines.push(locale === 'zh' ? `参数转发至 ${code(_schema.argumentSource)}；未声明字段的类型、默认值和补全尚不可用。空参数表不表示拒绝参数。` : `Arguments are forwarded to ${code(_schema.argumentSource)}. Undeclared fields have no inferred types, defaults or completion; an empty argument table does not reject arguments.`, '');
            }
            _lines.push(...argumentLines(_schema.args ?? {}, locale, _sharedArguments(path)));
            const _extras = Object.fromEntries(Object.entries(_schema).filter(([key]) => ![...catalog.authoringFields, 'args', 'hosts', 'states', 'examples', 'documentationFormat', 'argumentContract', 'argumentSource', 'allowUnknown'].includes(key)));
            if (Object.keys(_extras).length) {
                _lines.push(code(JSON.stringify(_extras)), '');
            }
            for (const key of ['hosts', 'states']) {
                if (_schema[key]?.length) {
                    _lines.push(`${key}: ${_schema[key].map(code).join(', ')}.`, '');
                }
            }
            if (_schema.examples?.length) {
                _lines.push(locale === 'zh' ? '开发示例需在提供对应场景的匹配版本 Playground 中打开：' : 'Developer examples require a matching Playground that serves these fixtures:', '', ..._schema.examples.map((name) => '- ' + code(/^[a-zA-Z0-9_-]+$/.test(name) ? '#/testground?jaml=' + name : name)), '');
            }
        };
        const _section = (section, level = 2, inherited = {}) => {
            if (section.title) {
                _lines.push('#'.repeat(Math.min(level, 6)) + ' ' + section.title, '');
            }
            const _entry = section.include ? manifest.guides?.[section.include] : undefined;
            let _shared = inherited;
            if (_entry?.group) {
                _prose(_entry, inherited);
                _shared = { ...inherited, ...Object.fromEntries(catalog.reader.authoringContextFields.filter((key) => _entry[key] !== undefined).map((key) => [key, _entry[key]])) };
            } else if (section.include) {
                _contract(section.include, inherited);
            }
            if (section.include !== owner && _entry?.guide?.body) {
                _lines.push(_entry.guide.body, '');
            }
            if (section.commonArgs) {
                const _args = manifest.argSchemas[section.commonArgs]?.args;
                if (!_args) {
                    throw new Error('Unknown shared argument profile: ' + section.commonArgs);
                }
                _lines.push(`<a id="${commonAnchor(section.commonArgs)}"></a>`, '', ...argumentLines(_args, locale));
            }
            if (section.body) {
                _lines.push(section.body, '');
            }
            if (section.table) {
                const _cell = (value) => String(value).replaceAll('|', '\\|').replaceAll('\n', '<br>');
                const _row = (values) => '| ' + values.map(_cell).join(' | ') + ' |';
                _lines.push(_row(section.table.headers), _row(section.table.headers.map(() => '---')), ...section.table.rows.map(_row), '');
            }
            if (section.include !== owner) {
                _examples(_entry?.guide?.examples);
            }
            _examples(section.examples);
            for (const child of section.sections ?? []) {
                _section(child, section.title ? level + 1 : level, _shared);
            }
        };
        const _group = manifest.guides?.[owner];
        if (_group?.group) {
            _prose(_group);
        }
        // Root and nested outlines support the same guide fields.
        _section({ ...guide, title: undefined }, 2, _group?.group ? _group : {});
        for (const path of page.additions.sort(rank)) {
            _lines.push('## ' + code(path), '');
            _contract(path, _group?.group ? _group : {});
        }
        _files.set(file, _lines.join('\n').trimEnd() + '\n');
    }
    for (const [kind, directory] of [
        ['style', 'Styles'],
        ['plugin', 'Plugins']
    ]) {
        const _lines = ['# ' + (locale === 'zh' ? (directory === 'Styles' ? '样式参考' : '插件参考') : directory === 'Styles' ? 'Style reference' : 'Plugin reference'), '', locale === 'zh' ? '选择所属主题，再阅读具体条目的参数、前提和清理要求。' : 'Choose the owning topic, then read the entry’s arguments, prerequisites and cleanup requirements.', ''];
        const _links = new Map();
        for (const [key, target] of _targets) {
            if (key.startsWith(kind + ':')) {
                _links.set(target.file, posix.relative(directory, target.file));
            }
        }
        for (const [file, link] of [..._links].sort(([a], [b]) => a.localeCompare(b))) {
            _lines.push(`- [${file.replace(directory + '/', '').replace(/(?:\.zh)?\.md$/, '')}](${link})`);
        }
        if (kind === 'style') {
            _lines.push('', locale === 'zh' ? '上下文路径在相应元素或插槽内应用共享样式；先阅读元素/插槽的宿主要求，再阅读相应公共样式。根 text.mono 与上下文 cap.text.mono 的行为不同，分别见文本参考。' : 'Contextual paths apply shared styles within an element or slot. Read the host/slot contract before its common-style contract. Root text.mono and contextual cap.text.mono have distinct behavior; see the text guide.', '', '[Style composition](styles.md#style-ownership-and-composition).');
        }
        _files.set(localFile(directory + '/index.md', locale), _lines.join('\n') + '\n');
    }
    return { files: _files, targets: _targets };
}

export function renderAllGuides(catalog) {
    const _files = renderFamilyGuides(catalog);
    for (const locale of ['en', 'zh']) {
        for (const [name, source] of projectGuides(catalog, locale).files) {
            if (_files.has(name) && _files.get(name) !== source) {
                throw new Error('Duplicate generated output: ' + name);
            }
            _files.set(name, source);
        }
    }
    return _files;
}
