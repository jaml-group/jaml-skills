# JAML skills

The `jaml` skill designs, builds, refactors, validates, explains and debugs Jam-UI applications and themes.

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

## Knowledge maintenance

Framework knowledge maintenance lives with the private Jam-UI source in its repository-local `jamldoc` and `jaml-knowledge` skills. This public repository distributes the consuming `jaml` skill. Reading and using its references requires no private source access or maintenance-skill installation.

## Reference and compatibility

Read the [style index](wiki/Styles/index.md) or [plugin index](wiki/Plugins/index.md), then the selected family guide. The guide keeps behavior, argument meaning, defaults, constraints, shared prerequisites and examples together. For ambiguous intent, start with [Choose native capabilities](wiki/choosing-native-capabilities.md). Expand related sections only when they affect the task; a selected argument still depends on the rest of its contract.

The [reference map](wiki/index.md) routes to language, elements, styles, plugins, themes and utilities. Generated family guides combine runtime facts with authored knowledge; other curated pages retain their own ownership. `jaml/references` points to `wiki/` within this repository, and installers copy those references into the installed skill. Read the Markdown directly with normal file tools or use a scoped text search to locate the relevant heading. Missing facts remain unknown; forwarding behavior requires the named owner's contract.

[Compatibility metadata](compatibility.json) records the framework baseline. Skill distribution versions are independent of framework versions. The current artifact is a development version, not a new framework release. Verify behavior against your installed runtime when versions differ.

JAML expressions, handlers and plugins are executable application code. Follow the [content trust guidance](wiki/index.md#trust-and-application-data) when handling external input.

## Check and package

Node.js 22+ and `tar` are required for repository tooling.

```sh
npm run check
npm test
npm run build
```

The versioned archive under `dist/` includes the complete `jaml` authoring skill, its Markdown references, example assets, license/provenance notices and content inventory. Trusted authoring inputs and generation tools stay in the repository. Build, check and source-export commands reject stale generated references. No application workspace modules are loaded. `dist/artifact.json` records its SHA-512 integrity. Generated content lives under `dist/.build/` so recursive skill discovery ignores it.

For an explicit offline destination after building:

```sh
node scripts/install.mjs --destination /path/to/client/skills --skill jaml
```

The archive installer accepts only `jaml`; private framework maintenance skills are not part of this distribution. This repository installer preserves installed `LEARNED.md` and refuses unknown distributions or newer versions. Those protections describe this installer, not the third-party skills CLI. Resource and packaging checks do not establish runtime correctness; check meaningful interactions in your application.

## Refresh the generated reference

Maintainers import an explicitly trusted publisher export, then regenerate and check:

```sh
npm run catalog:import -- /path/to/public-export
npm run catalog:generate
npm run catalog:check
```

Use `--frozen` with the import only after the producer freezes that exact artifact. Import verifies the publisher file inventory and byte hashes. Trusted generation inputs live under `scripts/authoring/`, outside the installed skill. Generation uses the supplied runtime facts and authored content without loading modules from a consuming application. Correct generated guidance at its source, regenerate it and verify the affected family and its links.

Ordinary users need no framework checkout, extraction or network access to read the installed references. For example, open `<skill-root>/references/Styles/common/layout.md` for layout or follow `<skill-root>/references/Plugins/index.md` to the relevant plugin guide. English and Chinese views preserve executable names, argument order and option values. Examples and behavior claims still require meaningful runtime verification when used against a different framework baseline.

The [MIT license](LICENSE) covers authored documentation, examples and repository tooling. Trusted generation dependencies retain the publisher's [MIT license](scripts/authoring/catalog/LICENSE) and [provenance notice](scripts/authoring/catalog/NOTICE.md); their artifact manifest records checksums.

## Linked local documentation builds

Register this checkout with `npm link`, then link `@jam/skills` from the consuming Jam-UI checkout. The local consumer reads `wiki/`, `LICENSE` and `compatibility.json` directly; editing documentation does not require `npm run build` or copying a vendor archive before the next consumer build. This package link is separate from agent skill-folder links. In an existing dependency tree, preview npm's changes before linking and avoid unrelated dependency rewrites.

Jam-UI requires `node_modules/@jam/skills` to link to this source checkout in every build environment. A missing or broken link raises a setup error; there is no lock/vendor/cache fallback. CI and release setup must provide a reviewed documentation revision and link it before building. Final outputs copy public wiki assets, so shipped packages do not depend on that local link. The maintenance skill remains outside consumer artifacts and MCP output.
