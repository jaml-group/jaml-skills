# Theme Structure

Do not hardcode the parent package or workspace folder in theme architecture. A user may place a theme folder wherever their project needs it.

Use the theme name as the folder root:

```text
src/[theme]/
├── index.mjs          default-exported theme option
├── styles/
│   └── index.scss     the complete theme stylesheet
├── assets/            optional theme-owned resources
│   ├── fonts/
│   ├── images/
│   ├── scripts/       explicitly imported ES module helpers
│   └── i18n/           theme and swatch labels
└── tokens/
    ├── sys.mjs        complete sys, plus an optional sparse mode branch
    ├── cmpt.mjs       overrides of supported component seams
    └── chart.mjs      optional ECharts overrides
```

Add these only when the theme needs them: `swatches/[swatch].mjs` for large swatch declarations, `recipes.mjs` for design-tool recipe metadata, and a project-scope `src/ref.mjs` primitive foundation shared by several themes.

## Minimal Theme Module

This complete module is a working starting point. Every later decision refines one of these files.

`tokens/sys.mjs` merges the exported baseline so the registered `sys` is complete, and keeps mode exceptions in a sparse branch:

```js
import { hslToken as hsl, lumiOPart as lumiO, merge, px2RemToken as rem, sysLit, tokenize } from '@jam/jam-ui';

export const sys = tokenize(
    merge(sysLit, {
        typography: { fontFamily: { ui: '"Inter", system-ui, sans-serif' } },
        border: { radius: { s: rem(4), m: rem(6), l: rem(8) } },
        color: {
            surface: {
                lowest: hsl(215, 0.12, lumiO(48)),
                lower: hsl(215, 0.1, lumiO(47)),
                default: hsl(215, 0.08, lumiO(46)),
                higher: hsl(215, 0.08, lumiO(45)),
                highest: hsl(215, 0.08, lumiO(44))
            }
        }
    })
);

export const darkSys = tokenize({
    color: {
        surface: { lowest: hsl(215, 0.16, lumiO(48)) }
    }
});
```

`tokens/cmpt.mjs` overrides only supported seams and carries `sys` references:

```js
import { tokenize } from '@jam/jam-ui';
import { sys } from './sys.mjs';

export const cmpt = tokenize({
    button: { borderRadius: sys.border.radius.s },
    input: { focus: { outlineColor: sys.color.primary.default } }
});
```

`styles/index.scss` holds unwrapped recipes on framework selectors:

```scss
body {
    font-family: var(--jam-typography-font-family-ui);
}

.jam-app-style {
    background-color: var(--jam-color-surface-lowest);
}

.jam-card-style,
.jam-tile-style {
    background-color: var(--jam-color-surface-default);
    border-radius: var(--jam-border-radius-l);
}
```

`index.mjs` assembles the theme declaration, stylesheet, styles, swatches and tokens through explicit recipe imports. Keep import-time translation registration out of this module. The first swatch carries the token buckets, and later swatches inherit them.

```js
import indexStyle from './styles/index.scss';
import { cmpt } from './tokens/cmpt.mjs';
import { darkSys, sys } from './tokens/sys.mjs';

export default {
    name: 'Harbor',
    author: 'Example',
    styles: {
        'document.header': [Styles.stylesheet(indexStyle)]
    },
    swatches: [
        {
            name: 'Harbor Blue',
            accentColor: 'hsl(211 65% 43%)',
            colorSet: ['hsl(211 65% 43%)', 'hsl(163 43% 40%)', 'hsl(31 70% 48%)', 'hsl(285 35% 54%)'],
            tokens: { sys, cmpt, dark: { sys: darkSys } }
        },
        {
            name: 'Harbor Moss',
            accentColor: 'hsl(150 40% 36%)',
            colorSet: ['hsl(150 40% 36%)', 'hsl(211 55% 48%)', 'hsl(36 66% 47%)', 'hsl(305 33% 51%)']
        }
    ]
};
```

In Jam-UI 2.0.0 and later the page font follows `sys.typography.fontFamily.ui`; the explicit `body` rule above keeps the same result on earlier runtimes.

## `index.mjs`

`index.mjs` is the recipe entry point. It assembles the theme option, swatches, tokens, styles and explicit recipe imports.

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

The `styles` map shares selector syntax with element `descStyles`. See [theme style entry forms](./stylesheets.md#style-entry-forms) for the theme’s array values. Styles attach globally in recipe order when the theme is applied. Use `Styles.stylesheet(importedStyle)` for integrated SCSS or the [stylesheet resolver](#theme-assets) for a stylesheet that uses packaged media. Use native style recipes for runtime behavior.

Only selector keys in the JavaScript `styles` object and element `descStyles` receive simple selector refinement. Imported SCSS does not: write literal runtime selectors such as `.jam-list-style[jam-variant='legend'] > .jam-item-style`, never the `list-legend > item` dictionary shorthand.

When the theme package build uses `src/*/index.mjs` as input, each theme folder builds directly to `[theme].mjs`. Do not add a redundant top-level `src/[theme].mjs` wrapper.

## `styles/`

`styles/index.scss` is the complete stylesheet registered under `document.header`. When it grows, split it into flat partials named by the main runtime role they cover and `@use` them from `index.scss`, so the build still produces one integrated stylesheet:

```text
styles/index.scss
styles/sidebar.scss
styles/popup.scss
```

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

From `src/[theme]/tokens/*.mjs`, import the shared foundation two levels above:

```js
import { ref } from '../../ref.mjs';
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

## Theme assets

Keep theme-owned fonts in `assets/fonts/`, images in `assets/images/`, ES module helpers in `assets/scripts/`, and labels in `assets/i18n/`. The build treats `assets/scripts/` as source and bundles helpers through explicit imports from their recipes. Theme discovery loads the built theme modules.

A packaged theme can declare `styles: ({ asset, stylesheet }) => ({ ... })`. `asset('images/texture.webp')` returns the URL of that file inside the delivered theme's asset directory. Pass it to a native recipe that accepts an image URL, such as the [standard map image layer](authoring.md#standard-map-recipe). `stylesheet(css)` rebases `url('../assets/...')` references in imported CSS against the delivered theme module. Browsers request fonts and images when the stylesheet or recipe uses them.

### Use a packaged font and image

In the [minimal theme module](#minimal-theme-module), set `sys.typography.fontFamily.ui` to `'"Harbor Sans", system-ui, sans-serif'`. Add `assets/fonts/harbor-sans.woff2` and this rule to `styles/index.scss`:

```scss
@font-face {
    font-family: 'Harbor Sans';
    src: url('../assets/fonts/harbor-sans.woff2') format('woff2');
    font-display: swap;
}
```

Add `assets/images/texture.webp` and set the default-exported theme option's `styles` field to the `styles` function below. Reuse the stylesheet import from the minimal module.

```js
import indexStyle from './styles/index.scss';

const styles = ({ asset, stylesheet }) => ({
    'document.header': [Styles.stylesheet(stylesheet(indexStyle))],
    'main > tile': [Styles.css({ backgroundImage: `url("${asset('images/texture.webp')}")` })]
});
```

### Theme and swatch labels

Author `assets/i18n/en.json`, `zh.json`, and any additional dictionaries named for their canonical locale tags. Each dictionary can supply a display `name` and `swatches` keyed by the theme's stable swatch IDs. For the minimal theme, `assets/i18n/en.json` could contain:

```json
{
    "name": "Harbor Workshop",
    "swatches": {
        "Harbor Blue": "Deep Water",
        "Harbor Moss": "Tidal Moss"
    }
}
```

Keep theme and swatch IDs stable for saved selections. For example, the built-in theme with ID `Strand` displays as `Slate Relay` in English. Labels are scoped to the owning theme, so two themes can use the same swatch ID. Keep picker actions and other shared controls in Jam-UI's framework translations.

The build advertises available locale dictionaries and embeds the English fallback. Each label resolves through the active locale, its parent tags, the configured fallback chain, then packaged English and finally the stable ID. Advertised dictionaries load asynchronously for registered themes, including inactive ones, and the open picker updates as labels arrive. `jam.themeReady` covers theme initialization independently of locale and media requests. Legacy themes without label assets use shared translation lookup.

Use `jam.getThemeLabel(themeId)` to read a theme's current display name. Use `jam.getThemeLabel(swatchId, 'swatch', themeId)` to read a swatch label from that theme. Omitting the owner in swatch lookup uses the current theme. Keep the stable IDs when saving or applying a selection.

## Build And Discovery

The theme build emits a flat browser ES module for each theme and the assets alongside it:

```text
dist/
├── themes.json
├── harbor.mjs
└── harbor/
    └── assets/
        ├── fonts/harbor-sans.woff2
        ├── images/texture.webp
        └── i18n/{en,zh}.json
```

Each compiled module is a browser ES module whose default export is the theme option. The build produces it as follows:

-   Imports from `@jam/jam-ui` resolve to the runtime's `jam` global (for example `jam.tokenize`, `jam.merge`, `jam.sysLit`), so the module carries no copy of the framework.
-   `Styles` is a runtime global and is used directly.
-   The SCSS import compiles to a CSS string that `Styles.stylesheet(...)` receives.

Use the asset-aware theme build for the [packaged asset example](#use-a-packaged-font-and-image). For a standalone module with an object-valued `styles` map, you can map the `@jam/jam-ui` external to the global `jam` and compile SCSS to an inline CSS string, or write the module by hand with those globals and a CSS string.

Keep the flat module and its `[theme]/assets/` directory together when relocating a build, along with the catalog and any shared chunks. The theme watcher discovers added and removed themes and assets. After a rebuild, check the served files and catalog, then reload the full page to load the updated modules.

For automatic discovery, the build generates a `themes.json` index beside the compiled theme modules. It is a JSON array with one entry per module. The runtime reads each entry's `name` as the module file name.

```json
[{ "name": "harbor.mjs" }, { "name": "studio.mjs" }]
```

A development server may generate this file as a directory listing with extra fields such as `type`, `mtime` and `size`; the runtime reads only `name`.

At runtime, `initThemes()` reads `${Theme.assetsPath}/themes.json`, loads each indexed module from the same directory, and registers its default export as a theme. `Theme.assetsPath` defaults to `assets/themes`; embedded hosts may set it before `jam.themeReady` starts when their assets use another base URI.

`Theme.reload()` reloads the current page by default. A host that owns navigation or webview lifecycle may replace this static method while preserving the same no-argument contract used by `switchTheme()`.

For authors, the practical flow is:

```text
create src/[theme]/index.mjs
build themes package
serve/copy dist assets
runtime discovers assets/themes/[theme].mjs through assets/themes/themes.json
```
