import { lstatSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { publicFiles, inspectPublicData, hash } from './authoring/catalog.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const source = process.argv[2];
if (!source || source.startsWith('--') || process.argv.slice(3).some((arg) => arg !== '--frozen')) {
    throw new Error('Usage: import-catalog.mjs TRUSTED_PUBLIC_EXPORT_DIRECTORY [--frozen]');
}
const metadata = inspectPublicData(JSON.parse(readFileSync(resolve(source, 'catalog.json'), 'utf8')));
const artifact = JSON.parse(readFileSync(resolve(source, 'artifact.json'), 'utf8'));
if (
    artifact.formatVersion !== 1 ||
    Object.keys(artifact.files ?? {})
        .sort()
        .join(',') !== [...publicFiles].sort().join(',') ||
    artifact.catalogDigest !== metadata.catalog.digest ||
    artifact.schemaDigest !== metadata.catalog.schemaDigest ||
    artifact.frameworkVersion !== metadata.catalog.frameworkVersion
) {
    throw new Error('Publisher artifact identity is inconsistent');
}
const files = Object.fromEntries(
    [...publicFiles, 'artifact.json'].map((name) => {
        const _file = resolve(source, name);
        if (!lstatSync(_file).isFile() || lstatSync(_file).isSymbolicLink()) {
            throw new Error('Expected publisher export file: ' + name);
        }
        const _bytes = readFileSync(_file);
        if (name !== 'artifact.json' && hash(_bytes) !== artifact.files[name]) {
            throw new Error('Publisher artifact hash mismatch: ' + name);
        }
        return [name, _bytes];
    })
);
// The explicit maintainer import trusts this publisher export after all of its
// bytes are checked. No modules from a consuming app are imported.
const { verifyAuthoringArtifact } = await import(pathToFileURL(resolve(source, 'authoringCatalog.mjs')).href);
verifyAuthoringArtifact(metadata);
const destination = resolve(root, 'scripts/authoring/catalog');
for (const [name, bytes] of Object.entries(files)) {
    const _file = resolve(destination, name);
    mkdirSync(dirname(_file), { recursive: true });
    writeFileSync(_file, bytes);
}
writeFileSync(resolve(destination, 'pin.json'), JSON.stringify({ formatVersion: 1, frameworkVersion: metadata.catalog.frameworkVersion, catalogDigest: metadata.catalog.digest, schemaDigest: metadata.catalog.schemaDigest, status: process.argv.includes('--frozen') ? 'frozen' : 'provisional', files: Object.fromEntries(Object.entries(files).map(([name, bytes]) => [name, hash(bytes)])) }, null, 2) + '\n');
console.log(JSON.stringify({ catalogDigest: metadata.catalog.digest, files: Object.keys(files).length, status: process.argv.includes('--frozen') ? 'frozen' : 'provisional' }, null, 2));
