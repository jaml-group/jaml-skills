import { randomUUID } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { isAbsolute } from 'node:path';
import { parseArgs } from 'node:util';
import { gzipSync } from 'node:zlib';

const { values } = parseArgs({ options: { input: { type: 'string' }, output: { type: 'string' } } });
const { input, output } = values;
if (!input || !output || !isAbsolute(output) || !output.endsWith('.html')) {
    throw new Error('Use --input <JAML module> --output <absolute HTML file>.');
}

const source = await readFile(input, 'utf8');
if (!source.trim()) {
    throw new Error('The JAML module is empty.');
}

const runtime = await readFile(new URL('../assets/jam-ui.js', import.meta.url));
const license = await readFile(new URL('../assets/NOTICE.txt', import.meta.url), 'utf8');
const payload = JSON.stringify({ source, runtime: gzipSync(runtime, { level: 9 }).toString('base64') }).replaceAll('<', '\\u003c');
const id = 'jaml-view-' + randomUUID();
const fragment = `<!--
${license.trim().replaceAll('<', '&lt;').replaceAll('>', '&gt;')}
-->
<div id="${id}"></div>
<script type="application/json" id="${id}-source">${payload}</script>
<script>
(async () => {
    const mount = document.getElementById('${id}');
    const payload = document.getElementById('${id}-source');
    try {
        const { runtime, source } = JSON.parse(payload.textContent);
        payload.remove();
        const bytes = Uint8Array.from(atob(runtime), (char) => char.charCodeAt(0));
        const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
        const script = document.createElement('script');
        script.textContent = await new Response(stream).text();
        document.head.append(script);
        script.remove();

        await jam.themeReady;
        await jam.renderFromString(mount, source, { lang: 'JavaScript' });
    } catch (error) {
        mount.textContent = 'This JAML view could not load.';
        console.error(error);
    }
})();
</script>
`;
if (Buffer.byteLength(fragment) >= 1_000_000) {
    throw new Error('The JAML view and runtime must fit in a visualization under 1 MB.');
}

await writeFile(output, fragment, { flag: 'wx' });
console.log('visualize' + JSON.stringify({ path: output }) + '');
