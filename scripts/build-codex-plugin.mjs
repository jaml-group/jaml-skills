import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { checkResources, filesUnder } from './resources.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const { values } = parseArgs({ options: { vsix: { type: 'string' }, out: { type: 'string' } } });
if (!values.vsix || !values.out) {
    throw new Error('Use --vsix <JAML 2.0.0-beta.1 VSIX> --out <new marketplace directory>.');
}

const archive = resolve(values.vsix);
const archiveHash = createHash('sha256').update(readFileSync(archive)).digest('hex');
if (archiveHash !== '50649c817e550d4a0b919249be63b6ca6449fde00640bfe9881af2ae21438fa0') {
    throw new Error('Use the pinned JAML 2.0.0-beta.1 package from Open VSX.');
}

function readVsixEntry(entry) {
    return execFileSync('unzip', ['-p', archive, entry], { maxBuffer: 4 * 1024 * 1024 });
}

const browserBuild = readVsixEntry('extension/resources/jam-ui.js');
const license = readVsixEntry('extension/LICENSE.txt').toString('utf8').trim();
const thirdPartyNotices = readFileSync(resolve(root, 'codex/THIRD-PARTY-NOTICES.txt'), 'utf8');
const masks = JSON.parse(readFileSync(resolve(root, 'codex/runtime-icon-replacements.json'), 'utf8'));
const replacements = new Map(masks.map((mask) => [mask.sourceSha256, { ...mask, matched: 0 }]));

// The published browser build discovers theme packs automatically. Provide an
// empty manifest here so the visualization uses built-in styling without I/O.
// Substitute only the exact masks listed in the release's asset inventory.
const themeManifestRequest = 'o=yield Ob(`${e}/themes.json`).catch((()=>{}))';
const runtime = browserBuild
    .toString('utf8')
    .replace(themeManifestRequest, 'o=[]')
    .replace(/data:image\/svg\+xml;charset=utf-8,[^"\n]*?%3C\/svg%3E/g, (url) => {
        const replacement = replacements.get(createHash('sha256').update(url).digest('hex'));
        if (!replacement) {
            return url;
        }
        replacement.matched++;
        return replacement.replacementDataUrl;
    })
    .replace(/\r?\n\/\/# sourceMappingURL=[^\r\n]*\r?\n?$/, '\n');
if (runtime.includes(themeManifestRequest) || !browserBuild.includes(themeManifestRequest)) {
    throw new Error('The pinned theme bootstrap could not be adapted.');
}
for (const { icon, occurrences, matched } of replacements.values()) {
    if (matched !== occurrences) {
        throw new Error(`The pinned ${icon} mask matched ${matched} times instead of ${occurrences}.`);
    }
}
const output = resolve(values.out);
const plugin = resolve(output, 'plugins/jaml-codex');
mkdirSync(output);
mkdirSync(resolve(plugin, 'skills'), { recursive: true });
cpSync(resolve(root, 'codex/plugin.json'), resolve(plugin, 'plugin.json'));
cpSync(resolve(root, 'codex/skills/jaml-codex'), resolve(plugin, 'skills/jaml-codex'), { recursive: true });
cpSync(resolve(root, 'LICENSE'), resolve(plugin, 'LICENSE'));

const skillSource = resolve(root, 'jaml');
const skillTarget = resolve(plugin, 'skills/jaml');
for (const file of filesUnder(skillSource, root)) {
    const destination = resolve(skillTarget, relative(skillSource, file));
    mkdirSync(dirname(destination), { recursive: true });
    cpSync(file, destination, { dereference: true });
}

const assets = resolve(plugin, 'skills/jaml-codex/assets');
mkdirSync(assets);
writeFileSync(resolve(assets, 'jam-ui.js'), runtime);
writeFileSync(resolve(assets, 'NOTICE.txt'), license + '\n\n' + thirdPartyNotices);

const { issues } = checkResources(plugin);
if (issues.length) {
    throw new Error(issues.join('\n'));
}

const marketplace = {
    name: 'jaml-group',
    interface: { displayName: 'jaml-group' },
    plugins: [
        {
            name: 'jaml-codex',
            source: { source: 'local', path: './plugins/jaml-codex' },
            policy: { installation: 'AVAILABLE', authentication: 'ON_INSTALL' },
            category: 'Productivity'
        }
    ]
};
const catalog = resolve(output, '.agents/plugins/marketplace.json');
mkdirSync(dirname(catalog), { recursive: true });
writeFileSync(catalog, JSON.stringify(marketplace, null, 4) + '\n');
console.log(output);
