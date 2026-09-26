# JAML skills

Two complementary skills: `jaml` designs, builds, refactors, validates, explains and debugs Jam-UI applications and themes; `jaml-knowledge` builds and maintains source-grounded resources for choosing and composing JAML registry capabilities.

Start with native elements and existing styles/plugins, semantic roles and theme tokens. Add reusable builders, components, styles and plugins when a requirement needs an extension. Project refactoring and theme refactoring have separate workflows.

## Install

With Node.js and npm available, install through the [skills CLI](https://github.com/vercel-labs/skills):

```sh
npx skills add jaml-group/jaml-skills --skill jaml
```

For Codex specifically:

```sh
npx skills add jaml-group/jaml-skills --skill jaml --agent codex
```

Add `--global` to install for your user instead of the current project. Restart or reload your agent if the new skill does not appear. The skill includes its reference pages; no Jam-UI source checkout or sibling repository is required. An application still needs a compatible Jam-UI runtime; installing the skill does not install that runtime or change its license.

Examples: “Use jaml to design an app with theme roles and tokens”, “Refactor this page to reuse native elements”, or “Validate this JAML and explain the plugin choices”.

## Knowledge maintenance skill

[jaml-knowledge](jaml-knowledge/SKILL.md) is shared methodology for plugins, styles, CCs, usages, suffixes, builders and other discovered registries. Documentation callers load its installed name or the actual file in an explicitly located authoritative checkout. It is self-contained and does not require the `jaml` catalog for discovery; using it against private implementations still requires authorized source access.

Before this addition is published, install from an explicitly located local checkout with the skills CLI:

```sh
npx skills add /path/to/jaml-skills --skill jaml-knowledge --agent codex
```

After publication, the repository install command can select `--skill jaml-knowledge`. Installing `jaml` alone does not automatically install this optional maintenance skill. Reload the agent's skill catalog after installation.

## Reference and compatibility

The [generated style/plugin catalog](wiki/API/index.md) owns exported API facts, with English and Chinese views from one pinned metadata digest. The [reference map](wiki/index.md) routes to language, elements, styles, plugins, themes and utilities. Hand-authored pages provide usage and composition guidance; their older argument tables are not a second source of truth. `wiki/` owns those guides; `wiki/API/` is generated and must not be edited by hand. `jaml/catalog/` pins the public metadata and shared reader; `jaml/references` points to it within this repository. Installers copy the references into the installed skill. Read only the topics needed for the task.

[Compatibility metadata](compatibility.json) records the framework baseline. Skill distribution versions are independent of framework versions. The current artifact is a development version, not a new framework release. Verify behavior against your installed runtime when versions differ.

JAML expressions, handlers and plugins are executable application code. Follow the [content trust guidance](wiki/index.md#trust-and-application-data) when handling external input.

## Check and package

Node.js 22+ and `tar` are required for repository tooling.

```sh
npm run check
npm test
npm run build
```

The versioned archive under `dist/` includes the complete `jaml` and `jaml-knowledge` skills, license/provenance notices, the pinned offline catalog reader and content inventory. Build, check and source-export commands reject stale generated catalog files. No application workspace modules are loaded. `dist/artifact.json` records its SHA-512 integrity. Generated content lives under `dist/.build/` so recursive skill discovery ignores it.

For an explicit offline destination after building:

```sh
node scripts/install.mjs --destination /path/to/client/skills --skill jaml
node scripts/install.mjs --destination /path/to/client/skills --skill jaml-knowledge
```

With no `--skill`, the repository installer continues to select only `jaml`. This repository installer preserves installed `LEARNED.md` and refuses unknown distributions or newer versions. Those protections describe this installer, not the third-party skills CLI. Resource and packaging checks do not establish runtime correctness; check meaningful interactions in your application.

## Refresh the generated reference

Maintainers import an explicitly trusted publisher export, then regenerate and check:

```sh
npm run catalog:import -- /path/to/public-export
npm run catalog:generate
npm run catalog:check
```

Use `--frozen` with the import only after the producer freezes that exact artifact. Import verifies the publisher file inventory and byte hashes; generation uses its shared identity, schema and i18n reader. It does not run code from a consuming project. Ordinary users need no framework checkout, extraction or network access to read the installed catalog:

```sh
node <skill-root>/scripts/catalog.mjs show style layout.application --locale zh
node <skill-root>/scripts/catalog.mjs list plugin
```

Generated pages cover every exported path via shared schemas, including aliases and generated variants. The [catalog index](wiki/API/index.md) explains literal prose, explicit translation references, legacy message-key compatibility and knowledge coverage; coverage does not claim that all behaviors or translations are documented. Check the catalog digest when comparing with editor metadata. Guide-only behavior details still require verified source/runtime evidence.

The [MIT license](LICENSE) covers authored documentation, examples and repository tooling. The narrow generated catalog reader and synchronous i18n engine include framework-derived code under the publisher's [MIT license](jaml/catalog/LICENSE), preserved byte-for-byte with the export. See [the provenance notice](jaml/catalog/NOTICE.md) and the license declaration and checksums in `jaml/catalog/artifact.json`.
