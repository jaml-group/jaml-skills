# JAML skills

A JAML skill for designing, building, refactoring, validating, explaining and debugging Jam-UI applications and themes.

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

## Reference and compatibility

The [reference map](wiki/index.md) routes to language, elements, styles, plugins, themes and utilities. `wiki/` is the editable owner; `jaml/references` points to it within this repository. Installers copy the references into the installed skill. Read only the topics needed for the task.

[Compatibility metadata](compatibility.json) records the framework baseline. Skill distribution versions are independent of framework versions. The current artifact is a development version, not a new framework release. Verify behavior against your installed runtime when versions differ.

JAML expressions, handlers and plugins are executable application code. Follow the [content trust guidance](wiki/index.md#trust-and-application-data) when handling external input.

## Check and package

Node.js 22+ and `tar` are required for repository tooling.

```sh
npm run check
npm test
npm run build
```

The versioned archive under `dist/` includes a complete `jaml` skill, MIT license and content inventory. `dist/artifact.json` records its SHA-512 integrity. Generated content lives under `dist/.build/` so recursive skill discovery ignores it.

For an explicit offline destination after building:

```sh
node scripts/install.mjs --destination /path/to/client/skills --skill jaml
```

This repository installer preserves installed `LEARNED.md` and refuses unknown distributions or newer versions. Those protections describe this installer, not the third-party skills CLI. Resource and packaging checks do not establish runtime correctness; check meaningful interactions in your application.

The [MIT license](LICENSE) covers this repository and its examples. No framework implementation is included.
