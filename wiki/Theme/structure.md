# Theme Structure

Do not hardcode the parent package or workspace folder in theme architecture. A user may place a theme folder wherever their project needs it.

Use the theme name as the folder root:

```text
src/ref.mjs
src/[theme]/
├── index.mjs
├── recipes.mjs
├── styles/
│   ├── [stylize].scss
│   └── ...
├── tokens/
│   ├── sys.mjs
│   ├── cmpt.mjs
│   └── chart.mjs
└── swatches/
    ├── [swatch].mjs
    └── ...
```

## `index.mjs`

`index.mjs` is the main theme module. It owns the theme declaration, imports stylesheet recipes, imports theme tokens, and composes swatches.

It must export the theme option as the module default. Theme loaders expect the default export to be a plain object compatible with `new Theme(option)`.

```js
import indexStyle from './styles/index.scss';
import { chart } from './tokens/chart.mjs';
import { cmpt } from './tokens/cmpt.mjs';
import { darkSys, sys } from './tokens/sys.mjs';

export default {
    name: 'Example',
    styles: {
        'document.header': [Styles.stylesheet(indexStyle)],
        button: ['hover.withbg']
    },
    swatches: [
        {
            name: 'Blue',
            accentColor: 'hsl(210, 90%, 52%)',
            colorSet: ['hsl(210, 90%, 52%)', 'hsl(174, 72%, 42%)', 'hsl(262, 70%, 62%)'],
            tokens: { sys, cmpt, chart, dark: { sys: darkSys } }
        }
    ]
};
```

`recipes.mjs` is intentionally not imported into the runtime theme option above. Design tools, validators, and import/export scripts may import it directly when they need design-time recipe path metadata. Recipe paths compile into full CSS stylesheets before runtime.

`styles` entries use the same selector-to-style-array grammar as an element's `descStyles` dictionary. They are attached globally when the theme is applied and use attachment order for priority; Jam-UI does not add a theme-class wrapper. They may mix complete imported stylesheets and runtime style plugins. Use `Styles.stylesheet(importedStyle)` for integrated SCSS. Use normal style/plugin entries when the theme needs behavior that CSS alone cannot express.

Only selector keys in the JavaScript `styles` object and element `descStyles` receive simple selector refinement. Imported SCSS does not: write literal runtime selectors such as `.jam-list-style[jam-variant='legend'] > .jam-item-style`, never the `list-legend > item` dictionary shorthand.

When the theme package build uses `src/*/index.mjs` as input, each theme folder builds directly to `[theme].mjs`. Do not add a redundant top-level `src/[theme].mjs` wrapper.

## `styles/`

`styles/` contains complete SCSS stylesheets for the theme.

Keep files flat under `styles/`. Name files by the main runtime role they cover:

```text
styles/header.scss
styles/sidebar.scss
styles/main.scss
styles/panel.scss
styles/popup.scss
```

Prefer one integrated stylesheet per role key at build time.

Keep `index.scss` unwrapped and use the role-driven selector structure described in [Stylesheets](stylesheets.md). Keep recipes role-driven; a role may be refined by a stable `jam-variant` value. `body`, JAML elements, and built-in plugin roles remain available as framework-owned roots or refinements, followed by nested connectors and framework states. Theme-local custom properties are allowed; project-dependent custom classes are not.

## `tokens/`

`tokens/` contains theme-local runtime token decisions:

```text
tokens/sys.mjs
tokens/cmpt.mjs
tokens/chart.mjs
```

`ref` is a plain, project-scope authoring foundation, not a theme-local runtime token module. Import it into `sys.mjs`, `cmpt.mjs`, `chart.mjs`, or build tooling where its values are resolved. Do not import it into `index.mjs` for swatch registration.

`sys` is theme/swatch semantic. Keep it under the theme unless the project intentionally shares one semantic system across multiple themes.

`cmpt.mjs` is the minimal, framework-backed component-token allow-list. Keep it when the theme overrides a supported reused or calculated basic role/element value. Do not preserve one-off imported design values as component tokens or add theme-private top-level seams; follow the supported list in [Tokens](./tokens.md#cmpt).

Keep mode-specific exports such as `darkSys` beside their root token module. Follow [Token Module Contract](./tokens.md#token-module-contract) to construct the complete root `sys`, and [Mode-Specific Overrides](./tokens.md#mode-specific-overrides) for sparse paired overrides. Do not create a mode-specific `chart` module.

`chart.mjs` exports a declarative ECharts override dictionary. The runtime chart builder supplies the adaptive base theme and active JAML color-set palette, then resolves and merges these overrides for each chart element. Do not export a prebuilt light/dark theme or duplicate swatch colors here.

Recipe metadata is design-time metadata. Keep it outside the runtime token set when the theme needs style-path validation, import/export, or design-tool integration. Do not convert recipe paths into runtime stylesheet variables, and do not include them as a swatch override bucket.

A multi-theme package can use this layout for its shared foundation:

```text
src/ref.mjs
src/[theme]/recipes.mjs
src/[theme]/tokens/sys.mjs
src/[theme]/tokens/cmpt.mjs
src/[theme]/tokens/chart.mjs
```

Then import it from the authoring modules that consume it:

```js
import { ref } from '../ref.mjs';
```

Do not call `tokenize(ref, 'ref')` or create `[theme]/tokens/ref.mjs`. Export `ref` as plain data outside the runtime token folder so its values compile into `sys`, `cmpt`, `chart`, or generated stylesheet output before registration.

Do not create a special `default` theme that all future themes must import. Shared foundations belong in project-scope authoring modules, not in an inherited theme folder.

## `swatches/`

`swatches/` contains swatch declarations when they are too large to keep in `index.mjs`.

Keep swatch declarations in `index.mjs` when they are short. Move them into `swatches/[swatch].mjs` when they are large, numerous, or easier to maintain independently.

```js
export default {
    name: 'Blue',
    accentColor: 'hsl(210, 90%, 52%)',
    colorSet: ['hsl(210, 90%, 52%)', 'hsl(174, 72%, 42%)', 'hsl(262, 70%, 62%)'],
    tokens: { sys, cmpt, chart, dark: { sys: darkSys } }
};
```

Use swatches for meaningful accent/color-set variants. Do not create default `Light` and `Dark` swatches just to represent mode.

Use `lumiO` for normal light/dark adaptation. Use `tokens.light` or `tokens.dark` only when a token needs a different value in that mode. Add a swatch `darkMode` key only when that specific accent/color-set variant should prefer a body mode; it selects the mode but does not define token values.

## Swatch Overrides

In a theme, `swatch.accentColor`, `swatch.colorSet`, and `swatch.colorScheme` are the canonical way to describe the swatch's color profile. `swatch.darkMode` is optional and should be used only for a swatch that intentionally controls mode.

The first swatch supplies the token buckets inherited by later swatches. Register a complete `sys` there; use [Token Module Contract](./tokens.md#token-module-contract) for module construction and [Swatch Inheritance](./tokens.md#swatch-inheritance) for bucket replacement and mode inheritance.

At runtime, `swatch.darkMode` is only the preferred body mode for that swatch. Jam-UI resolves the active token branch for that target mode before applying the mode change. Body mode changes rebuild the active global token projection; nested element mode changes do not.

Runtime user settings may override swatch color behavior. If the app/user has already set an accent color, color set, color scheme, or dark mode preference, theme switching may preserve that runtime preference instead of blindly applying the swatch value.

For JAML examples, set `jam.darkMode`, `jam.accolor`, or color-set settings only when the requested example specifically calls for a dark mode, accent color, or color set. Do not force these globals in unrelated examples.

## Build And Discovery

A folder-theme build can emit one module per theme:

```text
src/*/index.mjs -> dist/[theme].mjs
```

For automatic discovery, emit a `themes.json` index beside the compiled theme modules.

At runtime, `initThemes()` reads `${Theme.assetsPath}/themes.json`, loads each indexed module from the same directory, and registers its default export with `new Theme(option)`. `Theme.assetsPath` defaults to `assets/themes`; embedded hosts may set it before `jam.themeReady` starts when their assets use another base URI.

`Theme.reload()` reloads the current page by default. A host that owns navigation or webview lifecycle may replace this static method while preserving the same no-argument contract used by `switchTheme()`.

For authors, the practical flow is:

```text
create src/[theme]/index.mjs
build themes package
serve/copy dist assets
runtime discovers assets/themes/[theme].mjs through assets/themes/themes.json
```
