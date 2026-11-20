---
name: jaml-codex
description: Render a JAML reply as a live view in the Codex desktop conversation. Use when the user invokes JAML for Codex or asks to render a reply inline with JAML.
---

# JAML for Codex

Read the packaged `../jaml/SKILL.md` and follow its reply workflow to choose native elements. Use a matching demo from that workflow when it fits. Express the result as a self-contained JavaScript module that default-exports a JAML definition or array. When converting a JAMLL demo, nest child records in the parent’s `components` array and translate `|` rows to the owning element’s native JAML data shape. For example, tags use `data: [{ name: 'Billing', value: 'Billing' }]`.

The view mounts once inside the Codex Visualize sandbox. Use native model bindings and local UI actions. Treat supplied text as data. Use the packaged wiki for composition patterns. Check the components, options and helpers you use against the bundled Jam-UI 2.0.0-beta.1 runtime. Choose standalone demos that run with the core browser bundle. ECharts, Map 3D and registered app modules require a host that provides their dependencies. Load AGUI guidance when the host explicitly offers its state and response API. This adapter exposes local JAML state only.

When Visualize is available, write the module to a local `.mjs` file. Choose an unused, lowercase-hyphenated HTML path in the chat's writable visualization directory. Run the bundled [presenter](scripts/render.mjs) with Node.js:

```sh
node /absolute/plugin/skills/jaml-codex/scripts/render.mjs --input /absolute/view.mjs --output /absolute/visualizations/view.html
```

The helper prints the inline reference. Put that reference on its own line in the final reply. When Visualize is unavailable, give the user the answer in Markdown and explain that inline rendering requires Visualize in Codex desktop. Follow the user's requested format if they ask for the JAML source.
