import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCatalog } from './authoring/catalog.mjs';
import { renderAllGuides } from './family-guides.mjs';
import { filesUnder } from './resources.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
export const renderReferences = renderAllGuides;

export async function generateReferences(repository = root, { check = false } = {}) {
    const _catalog = await loadCatalog(resolve(repository, 'scripts/authoring/catalog'));
    const _files = renderReferences(_catalog);
    for (const [name, source] of _files) {
        const _file = resolve(repository, 'wiki', name);
        if (check) {
            if (!existsSync(_file) || readFileSync(_file, 'utf8') !== source) {
                throw new Error('Generated family guide is stale: ' + name);
            }
        } else {
            mkdirSync(dirname(_file), { recursive: true });
            writeFileSync(_file, source);
        }
    }
    if (check) {
        for (const file of filesUnder(resolve(repository, 'wiki'))) {
            if (file.endsWith('.md') && /<!-- Generated (?:from native authoring|by catalog:generate)/.test(readFileSync(file, 'utf8')) && !_files.has(relative(resolve(repository, 'wiki'), file))) {
                throw new Error('Unexpected generated guide: ' + relative(repository, file));
            }
        }
    }
    return {
        frameworkVersion: _catalog.pin.frameworkVersion,
        catalogDigest: _catalog.pin.catalogDigest,
        schemaDigest: _catalog.pin.schemaDigest
    };
}

if (process.argv[1] && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
    console.log(
        JSON.stringify(
            await generateReferences(root, {
                check: process.argv.includes('--check')
            }),
            null,
            2
        )
    );
}
