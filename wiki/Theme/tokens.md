# Theme Tokens

JAML theme authoring uses a project-scope primitive foundation, registration layers, a hybrid runtime token projection, and a deferred chart recipe:

```text
ref (authoring only)
  -> sys
  -> cmpt
  -> chart
  -> swatch registration { sys, cmpt, chart?, light? | dark? }
  -> active resolved layers { sys, cmpt, chart?, light?, dark? }
  -> runtime Tokens { ...sys, cmpt, chart }
```

Design-time recipe paths may live beside token modules for validation, import, export, and design tooling, but they are not token paths such as `recipe.foo.bar`. Recipes are handoff/import-export paths that compile into full CSS stylesheets before runtime.

`ref` is plain source data. Theme modules may use it while constructing `sys`, `cmpt`, `chart`, or generated stylesheet declarations, but it must be resolved before registration. Do not put `ref` in `swatch.tokens`, expose `Tokens.ref`, call `tokenize(ref, 'ref')`, or emit `--jam-ref-*` custom properties.

Use this split:

| Need                                                | Put it in       |
| --------------------------------------------------- | --------------- |
| Stable authoring primitive foundation               | `ref`           |
| Theme/swatch semantic decision                      | `sys`           |
| Reused or calculated basic component value          | `cmpt`          |
| Design handoff path that compiles to stylesheet CSS | recipe metadata |
| Deferred chart-library option recipe                | `chart`         |

## Built-In Runtime Baseline

Jam-UI registers built-in `{ sys, cmpt, chart }` token layers when `initTheme()` runs, before it loads or applies a theme. The runtime projects `sys` at the top level and keeps component and chart values under `Tokens.cmpt` and `Tokens.chart`. Therefore paths such as `Tokens.space.xl`, `Tokens.border.width.m`, `Tokens.cmpt.gridline.color`, and `Tokens.chart.textStyle.color` are available during normal app rendering and after a theme is unapplied. `Tokens.sys`, `Tokens.ref`, `Tokens.light`, and `Tokens.dark` do not exist.

On current `main`, a swatch supplies the complete active `sys` tree. `setRuntimeTokens()` spreads that tree directly onto `Tokens`; it deep-merges only `cmpt` and `chart` over their built-in layers. Build a complete `sys` in the authoring module by merging exported `sysLit` with your changes before `tokenize()`, as shown in [Token Module Contract](#token-module-contract). A sparse `sys` registration can leave JavaScript consumers such as `Tokens.color` undefined even while the built-in CSS variables remain available.

`Theme.currTokenLayers` exposes the selected swatch's resolved registration layers. Its `sys` and `cmpt` contain the selected mode overrides, while optional `light` and `dark` hold generated sparse pairs. It is not a complete built-in fallback view. Unapplying a theme restores the built-in `Tokens` projection and clears these inspection layers to an empty object; `Theme.currTokenDarkMode` becomes `undefined`. Use `Tokens` for normal active values.

The exported TypeScript shapes preserve the registration/runtime distinction:

| Type                  | Shape                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| `ThemeModeTokens`     | Partial `{ sys: Dictionary; cmpt: Dictionary }` mode override                                     |
| `ThemeTokens`         | Optional root layers and optional `light` / `dark`; runtime rejects both modes together |
| `ResolvedThemeTokens` | Active `{ sys; cmpt; chart }` roots plus optional generated sparse `{ light; dark }` pairs        |
| `Tokens`              | Hybrid `{ ...sys; cmpt; chart }` runtime dictionary exposed as `globalThis.Tokens`               |

Built-in token literals are available through the documented theme exports. Token wrappers retain `.value`; wrappers made from adaptive builders also expose `.build(el)` for cooked runtime values. The ECharts theme builder consumes those builders so light/dark mode, accent color, color set, and swatch changes resolve against the chart element.

## Consuming Tokens

| Consumer | Use | Resolution |
|---|---|---|
| JavaScript style/module code | `Tokens.space.s`, `Tokens.border.radius.m`, `Tokens.cmpt.gridline.color` | System paths are flat; component paths keep `cmpt` |
| CSS/SCSS | `var(--jam-space-s)`, `var(--jam-border-radius-m)` | Browser resolves the emitted custom property |
| JAML `style` / `css(...)` | `padding:s;gap:s;border-radius:m` | Supported property-aware shorthands resolve to token variables |
| Element-aware runtime value | An adaptive token wrapper's `.build(el)` | Adaptive functions resolve against that element |
| ECharts recipe | `chart` overrides and token wrappers | The chart builder cooks values using the chart's mode and palette |

Read [property-aware CSS values](../Styles/common/css.md#property-aware-token-values) for the exact shorthand coverage. Raw stylesheet strings do not run that replacement. Keep token access at the point of consumption when a later swatch or global mode change should be observed: the runtime replaces `globalThis.Tokens` when applying a new active projection.

```json jaml-playground
{
    "type": "card",
    "stylize": "tile",
    "cap": "Token-backed spacing",
    "style": "padding:m;gap:s;border-radius:l",
    "components": [{ "type": "label", "cap": "The active swatch supplies these values." }]
}
```

## Mode-Specific Overrides

A theme may author one sparse `light` or `dark` override inside a swatch's tokens. Never author both; Jam-UI throws when both branches are present:

```js
import { shadowToken, tokenize } from '@jam/jam-ui';

const darkSysLit = {
    shadow: {
        s: shadowToken('0rem', '0.125rem', '0.5rem', 'hsl(210 80% 20% / 0.33)')
    }
};
const darkSys = tokenize(darkSysLit);

const tokens = {
    sys,
    cmpt,
    chart,
    dark: { sys: darkSys }
};
```

The registered root `sys` and `cmpt` buckets supply the fallback for the opposite mode. If `dark` is authored, Jam-UI finds each matching path in that registered root and stores that value in the generated sparse `light` branch; authoring `light` generates the matching `dark` fallback. Resolution order is:

```text
author-built complete root -> selected light/dark override
```

Mode branches are exact-path subsets of the root `sys` and `cmpt` layers. A branch cannot introduce a new token path, and `chart` is not supported inside `light` or `dark`. The fallback must exist in the registered root; normalization does not look it up in the built-in tree. During swatch normalization, unsupported mode roots and mode leaves without a primitive or token-wrapper fallback at the same path are discarded. Jam-UI emits one `lime.warn` that lists the discarded paths for that swatch.

Only the body-global mode selects these pairs. Applying light/dark mode to a nested element does not replace global runtime tokens or rebuild the theme token stylesheet. When the body mode changes, Jam-UI synchronously rebuilds `Theme.currTokenLayers`, replaces `globalThis.Tokens`, and emits CSS variables from the selected root `sys` and `cmpt` values. `tokens2StyleSheet()` never emits the stored `light` or `dark` branches.

`chart` remains a single declarative root and is not mode-paired. Its adaptive values continue to resolve against the chart element when the chart theme is built.

## `ref`

`ref` is the stable authoring primitive foundation. It is project-scope, not theme-local, and is never a runtime token bucket.

Put in `ref`:

-   numeric scales
-   shared `space`, `border.radius`, and `border.width` geometry scales
-   opacity, type, and font scales
-   absolute shadow primitives under `shadow.x`, `shadow.y`, and `shadow.blur`
-   font-relative shadow primitives under `shadow.relX`, `shadow.relY`, and `shadow.relBlur`
-   non-color geometry constants, such as gradient angles, z-index values, and elevation numbers
-   minimal literal CSS constants when needed, such as `transparent`, `currentColor`, `none`, border styles, and font family names

Do not put in `ref`:

-   page roles, such as sidebar or panel
-   product or domain decisions
-   theme-specific semantic decisions
-   visual recipes
-   static semantic color palettes such as `blue[500]`, `gray[900]`, or `red[400]`

Good:

```js
const ref = {
    space: {
        2: '0.125rem',
        4: '0.25rem',
        8: '0.5rem',
        12: '0.75rem'
    },
    gradient: {
        angle: {
            horizontal: '90deg',
            vertical: '180deg',
            diagonal: '135deg'
        }
    },
    shadow: {
        x: { 0: '0rem', 3: '0.1875rem', 5: '0.3125rem' },
        y: { 0: '0rem', 1: '0.0625rem', 3: '0.1875rem' },
        blur: { 0: '0rem', 2: '0.125rem', 16: '1rem' },
        relX: { 0: '0em', 1: '0.0625em', 3: '0.1875em' },
        relY: { 0: '0em', 1: '0.0625em', 3: '0.1875em' },
        relBlur: { 0: '0em', 2: '0.125em', 4: '0.25em' }
    },
    border: {
        style: {
            solid: 'solid',
            dashed: 'dashed',
            none: 'none'
        },
        radius: {
            2: '0.125rem',
            4: '0.25rem',
            8: '0.5rem',
            12: '0.75rem'
        },
        width: {
            1: '0.0625rem',
            2: '0.125rem',
            4: '0.25rem'
        }
    }
};
```

Export this object as plain data. Runtime modules consume its values while constructing their own literal dictionaries; `ref` itself is neither tokenized nor registered.

## `sys`

`sys` is the theme/swatch semantic decision layer. It answers questions like:

```text
What does this theme consider primary surface, normal text, weak border, dangerous state, dense spacing?
```

Put in `sys`:

-   semantic color decisions
-   semantic space, border radius/width/style, density, typography, shadow, text-shadow, motion, timing, and opacity decisions
-   theme-wide state decisions
-   values derived from custom or business colors

Do not put in `sys`:

-   component parts such as card title or input helper
-   parent-child recipes such as sidebar button hover
-   values that never change by theme or swatch
-   direct page layout recipes

Recommended non-color `sys` groups:

```text
space
border.radius
border.width
border.style
height
opacity
typography.fontSize
typography.lineHeight
typography.fontFamily
typography.fontWeight
shadow
textShadow
motion
timing
density
```

Use design-system inventories as vocabulary, then adapt them to JAML object paths. For example, a Figma-style `size_padding_s` becomes `sys.space.s`, while its reference primitive is `ref.space[8]`.

Keep the distinction between categories:

-   `space`: the shared semantic scale consumed by padding, margin, gap, and compact layout recipes. Those CSS properties remain different layout responsibilities even though they share one scale.
-   `border.radius`: corner shape decisions.
-   `border.width`: stroke thickness decisions.
-   `height`: fixed or baseline control heights.
-   `typography`: font size, line height, font family, and font weight.
-   `opacity`: semantic transparency levels.
-   `border.style`: reusable stroke styles such as solid, dashed, or none.
-   `shadow`: complete theme-specific box-shadow values built from absolute ref geometry and shadow colors.
-   `textShadow`: complete font-relative text-shadow values, including `primary` and `onPrimary` families when the foreground context needs them.
-   `motion`: interaction duration decisions such as fast, default, and slow.
-   `timing`: named easing curves exposed as complete CSS timing-function values.

The built-in baseline provides `typography.fontSize` keys `xxs`, `xs`, `s`, `m`, `l`, `xl`, `xxl`, `3xl`, and `4xl`; `typography.fontWeight` keys `regular`, `medium`, `semibold`, and `bold`; and `typography.lineHeight` keys `tight`, `default`, and `loose`. Its `timing` keys mirror the named curves in [TimingBeziers](../Plugins/animation.md#timingbeziers--named-easing-curves).

Build shadows in `sys.mjs`, not by reassembling private `x`/`y`/`blur` variables in SCSS:

```js
import { shadowToken } from '@jam/jam-ui';

const shadow = {
    none: 'none',
    s: shadowToken(ref.shadow.x[0], ref.shadow.y[2], ref.shadow.blur[5], ref.shadow.color[10]),
    primary: {
        s: shadowToken(ref.shadow.x[0], ref.shadow.y[2], ref.shadow.blur[5], ref.shadow.color.primary[15])
    }
};
```

`shadowToken(offsetX, offsetY, blur, color, inset?)` also accepts a spread value before `color`. `inset: true` is retained in the CSS string; its boxed `.build(el)` returns `{ offsetX, offsetY, blur, spread?, color }` with numeric pixel geometry for chart cooking.

`gradientToken(type, arg, ...stops)` accepts `'linear'` with a CSS angle, or `'radial'` with a CSS radial-gradient descriptor. Each stop may be a color/token or `[color, offset]`. The result is a CSS gradient value whose `.build(el)` method returns the corresponding ECharts gradient object.

`unitToken(value, unit, modifier?)` creates a boxed unit value for authoring token literals. `px2RemToken(value)` and `px2EmToken(value)` are the 16px-base conversions used by the built-in token modules.

### CSS variable emission

`tokenize()` returns CSS-variable references for `sys` and `cmpt`. Authoring `ref` values are already resolved into those runtime values and never receive a CSS-variable namespace:

| Token path                     | CSS variable                      |
| ------------------------------ | --------------------------------- |
| `sys.space.s`                  | `--jam-space-s`                   |
| `sys.border.radius.m`          | `--jam-border-radius-m`           |
| `sys.border.width.m`           | `--jam-border-width-m`            |
| `sys.timing.ease`              | `--jam-timing-ease`               |
| `sys.color.primary.default`    | `--jam-color-primary-default`     |
| `sys.shadow.m`                 | `--jam-shadow-m`                  |
| `sys.textShadow.onPrimary.s`   | `--jam-text-shadow-on-primary-s`  |
| `cmpt.button.boxShadow`        | `--jam-button-box-shadow`          |
| `cmpt.table.thead.backgroundColor` | `--jam-table-thead-background-color` |
| `cmpt.stripy.odd.backgroundColor` | `--jam-stripy-odd-background-color` |
| `cmpt.divider.width`           | `--jam-divider-width`              |

Do not add `size` or `sys` to the emitted CSS variable name. Use `s`, `m`, and `l` for semantic size-scale keys, never `sm`, `md`, or `lg`. Authoring `ref` geometry keeps numeric physical keys; semantic shadow combinations belong to `sys` or `cmpt`. See [Theme Color](color.md) for the sys color families and state vocabulary.

`tokens2StyleSheet()` scopes component variables to the framework selectors that own them instead of emitting every variable on `body`:

| Component token root | Emission selector |
|---|---|
| `button` | `.jam-button-style, .jam-tag-style, jam-input[type="code"]` |
| `bslot` | `jam-calendar` |
| `table` | `jam-table` |
| `checked` | `.jam-button-style, jam-switch` |
| `bento`, `gridline`, `stripy`, `divider` | Their corresponding `.jam-*-group` class |

Adaptive `sys` color, shadow, and gradient color-stop tokens are emitted on `.jam-lumi, .jam-colorprofile`; other `sys` values use the supplied root selector.

## `cmpt`

`cmpt` is the minimal, framework-backed component-token allow-list for basic role/element styling. A `cmpt` token represents a component-owned value already consumed by a native recipe or another calculation.

Keep `cmpt` small. Override an existing seam only when the value is reused, referenced elsewhere, or needed in another expression such as `calc()`. Do not mirror every possible button, input, label, or table property into `cmpt`; one-off imported design values should compile into stylesheet recipes.

When one runtime token depends on another, carry the token reference instead of spelling its emitted CSS custom property. For component geometry sourced from `ref`, pass the plain authoring value, such as `borderWidth: ref.border.width[2]`; tokenizing `cmpt` resolves that value into the component custom property. Never embed a nonexistent `var(--jam-ref-border-width-2)` reference.

Use `cmpt` for basic element or role-level values:

```text
input.borderRadius
button.boxShadow
table.thead.borderColor
table.thead.backgroundColor
table.th.padding
bento.backgroundImage
gridline.color
gridline.radius
stripy.odd.backgroundColor
divider.width
```

Table subparts are nested under `table`, including `table.gridline`, `table.thead`, `table.tbody`, `table.th`, and `table.td`; they are not separate runtime roots. The child-group styles expose `bento`, `gridline`, `stripy`, and `divider` seams because their style plugins consume those theme values and may override them locally with explicit args. Their selector and child-management behavior remains in the native style recipes rather than in tokens.

`cmpt.divided` and `Tokens.divided` were renamed to `cmpt.divider` and `Tokens.cmpt.divider`; there is no compatibility alias. The emitted custom properties use the `--jam-divider-*` prefix.

Do not add `cap` or `value` component-token trees. Use the native `cap.main|sub` and `value.major|main|sub|minor` role classes, then tune each role as a complete optical recipe in the theme stylesheet.

Do not use `cmpt` for parent-child context, broad selector logic, layout recipes, or design handoff paths:

```text
sidebar.nav.button.hover.icon.color
tile.table.td-odd.backgroundColor
main.collection.gridTemplateColumns
```

Those belong in recipe paths and imported stylesheets.

## Recipe Paths

Recipe paths are declarative style paths used by design and development tooling for import/export. They document, validate, import, and export where a design value lands in generated theme CSS. They are not runtime token layers and not CSS custom properties.

For the full design/engineering handoff contract, see [Recipe](./recipe.md).

Component inventories from design specs are useful as coverage checklists. Do not create theoretical recipe paths. Export only paths that exist in a design spec or theme import, and import only paths that map to a real selector/state/slot/property target. Design-facing recipe values may point to runtime `sys`/minimal `cmpt` tokens or authoring `ref` paths; importers must resolve `ref` values before runtime, while generated stylesheet mechanics stay in importer output.

Use this compact mental grammar:

```text
node[.node-or-type-or-state*].cssProperty
node[.node-or-type-or-state*].compositeProperty.part
```

Rules:

-   `node` is a role, element, slot, part, or predefined child target used by the importer. Role nodes come from `stylize` and compile to `.jam-[stylize]-style`; element nodes use the tag name without `jam-`, such as `indicator` for `jam-indicator`. When a role and element share a name, the role node wins, so `button` compiles to `.jam-button-style`. A node may include a predefined `-[trait]`, such as `button-withacbg` or `td-odd`.
-   `type` is an enumerable element `type` value, such as `default`, `ghost`, `range`, or `checkbox`.
-   `state` is a supported `CSSStates` key such as `hover`, `active`, `focus`, `disabled`, `indeterminate`, or `checked`.
-   normal recipe paths end with a real CSS property name in camelCase.
-   Figma-split composite paths may end with approved parts: `gradient.type`, `gradient.color1`, `gradient.color2`, `shadow.x`, `shadow.y`, `shadow.blur`, `shadow.spread`, `shadow.inset`, `textShadow.x`, `textShadow.y`, or `textShadow.blur`.
-   do not split CSS properties into nested aliases such as `background.color`; use `backgroundColor`.
-   ambiguous segments must fail validation instead of being guessed.

Good:

```text
button.default.backgroundColor
button.default.hover.backgroundColor
button.backgroundColor
button-withacbg.backgroundColor
tile.table.td-odd.backgroundColor
card.gradient.color1
card.shadow.blur
```

These are recipe paths. Their values may point at `sys`:

```json
{
    "button.default.hover.backgroundColor": "sys.color.primary.film"
}
```

The importer compiles that mapping into a full stylesheet. Do not emit runtime variables such as `--jam-recipe-button-default-hover-background-color`.

Example:

```text
button.default.hover.backgroundColor
```

can compile to:

```scss
.jam-button-style:not([type]):hover {
    background-color: var(--jam-color-primary-film);
}
```

Bad:

```text
button.selected.fontWeight
button.loading.fontWeight
button.withacbg.backgroundColor
background.color
```

The first two use unsupported states. The third uses a standalone trait; write the trait on the node as `button-withacbg.backgroundColor`. The last one is nested property syntax; use `backgroundColor`.

## `chart`

`chart` contains declarative theme-specific overrides for the built-in ECharts theme builder. The builder runs for each chart element when ECharts initializes, resolves the current light/dark and accent profile, then deep-merges these overrides.

Use `chart` for:

-   ECharts theme override shape
-   axis, grid, legend, and tooltip defaults
-   chart text colors, split lines, mark geometry, and typography

Do not duplicate `sys` semantics in `chart`. Pull text, axis, and surface decisions from `sys`. The built-in builder owns the palette and derives it from the chart element's active JAML color set, so normal theme overrides should not declare a static `color` array.

The built-in chart tree and overrides are merged before adaptive leaves are cooked against the chart element. This keeps `lumiO`/`acLumiO` colors, local color profiles, swatches, and theme changes aligned with the live chart:

```js
const chart = {
    textStyle: {
        color: sys.color.fg.default
    },
    axisPointer: {
        lineStyle: {
            color: sys.color.outline.subtle
        }
    },
    tooltip: {
        backgroundColor: sys.color.surface.highest,
        borderColor: sys.color.outline.muted
    }
};
```

Keep the override dictionary declarative. The framework's runtime `buildEchartsTheme(el, overrides)` builder deep-merges the override over the built-in chart layer and cooks the result for that chart element.

The exported lower-level `cookEchartsValue(value, el?, key?)` resolves token wrappers, token builders, CSS `var()`/`calc()` color expressions, `chroma.Color` values, and standalone `rem`/`px` lengths. It recursively cooks arrays and plain dictionaries, then expands the `shadow`, `textShadow`, `border: 'none'`, and `textBorder: 'none'` shorthands into ECharts option fields.

## Token Module Contract

The authoring foundation exports plain source data:

```js
const ref = { space: { unit: 4 } };

export { ref };
```

Do not call `tokenize()` for `ref`.

Runtime token modules should export both the literal object and the tokenized object when possible:

```js
import { sysLit as builtIn, merge, tokenize } from '@jam/jam-ui';

const sysLit = merge(builtIn, { space: { s: '0.5rem' } });
const sys = tokenize(sysLit);

export { sys, sysLit };
```

Naming:

```text
xxxLit = literal/source runtime-token dictionary
xxx    = tokenized runtime token API
```

Use `xxxLit` for authoring, merging, deriving, and inspecting raw token structure.

Use `xxx` in theme styles and swatches when CSS variable references, `.value`, runtime swatch lookup, or token builders are needed.

`cmpt.mjs` should follow this contract when the theme exposes component tokens. Keep it minimal; prefer stylesheet recipes for one-off imported values.

Register a complete `sys` and any needed `cmpt` / `chart` overrides in the first swatch, with an optional mutually exclusive `light: { sys?, cmpt? }` or `dark: { sys?, cmpt? }` sparse override. `chart` is optional, remains a plain declarative override dictionary, and does not participate in mode pairing.

`recipes.mjs`, when present, sits outside the runtime token contract. Keep it as a design-time style-path contract for validation and import/export tooling. It may export a literal path map, schema, or helper data, but it must compile into full stylesheet CSS instead of runtime token CSS.

The `cmpt.table` token scope also applies to `jam-tree`, whose nodes share the table cell rendering and styling model.

## Swatch Inheritance

Later swatches inherit omitted root buckets from the first swatch. A supplied bucket replaces that first-swatch bucket before mode normalization; merge explicitly when a later swatch changes only a few `sys` leaves. Runtime projection then follows [Built-In Runtime Baseline](#built-in-runtime-baseline): registered `sys` must be complete, while `cmpt` and `chart` receive built-in merges.

A later swatch that omits both `light` and `dark` inherits the first swatch's normalized mode branch. Supplying either branch replaces the inherited branch entirely and removes the opposite branch. Never supply both. Pairing still uses the resulting registered roots, as described in [Mode-Specific Overrides](#mode-specific-overrides).
