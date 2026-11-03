#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

// Resolve a declared installation; never download an engine or copy its rules.
let cli;
for (const base of [join(process.cwd(), 'package.json'), import.meta.url]) {
    const _require = createRequire(base);
    for (const [name, relative] of [
        ['@jam/jaml-language-core', 'src/cli/index.mjs'],
        ['@jam/jaml-playground-mcp', 'bundle/language-core/src/cli/index.mjs']
    ]) {
        try {
            const _candidate = join(dirname(_require.resolve(`${name}/package.json`)), relative);
            if (existsSync(_candidate)) {
                cli = _candidate;
                break;
            }
        } catch (error) {
            if (error.code !== 'MODULE_NOT_FOUND') {
                throw error;
            }
        }
    }
    if (cli) {
        break;
    }
}
if (!cli) {
    console.error('JAML validator unavailable: install a compatible @jam/jaml-language-core or bundled @jam/jaml-playground-mcp in the project or alongside this skill. No validation ran.');
    process.exitCode = 2;
} else {
    const _result = spawnSync(process.execPath, [cli, 'validate', ...process.argv.slice(2)], { stdio: 'inherit' });
    if (_result.error || _result.signal) {
        console.error(_result.error?.message ?? `JAML validator terminated by ${_result.signal}.`);
    }
    process.exitCode = _result.status ?? 2;
}
