export const authoringFields = ['desc', 'comment', 'purpose', 'behavior', 'appearance', 'prerequisites', 'lifecycle', 'composition', 'caveats'];
export const authoringContextFields = authoringFields.filter((field) => !['desc', 'behavior'].includes(field));

export function* catalogEntries(metadata) {
    for (const [kind, manifest] of [
        ['style', metadata.styles],
        ['plugin', metadata.plugins]
    ]) {
        for (const path of manifest.knownPaths) {
            const _schemaRef = manifest.argSchemaRefs[path];
            const _schema = manifest.schemaTable[_schemaRef];
            const _documented = Boolean(_schema.argumentContract !== 'passthrough' && _schema.desc && _schema.purpose && _schema.behavior && Object.values(_schema.args ?? {}).every((arg) => arg.desc));
            yield {
                id: `@jam/jam-ui/${kind}/${path}`,
                kind,
                path,
                canonicalId: `@jam/jam-ui/${kind}/${manifest.aliases?.[path] ?? path}`,
                schemaRef: _schemaRef,
                format: ['messages', 'translations'].includes(_schema.documentationFormat) ? _schema.documentationFormat : 'legacy',
                knowledge: _documented ? 'documented' : _schema.desc ? 'partial' : 'undocumented'
            };
        }
    }
}
