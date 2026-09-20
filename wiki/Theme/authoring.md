# Theme Authoring

Use this checklist when designing or reviewing a JAML theme.

## Four Governing Rules

### 1. Use Tokens For Theme-Adaptive Values

Whenever a new design or a replacement for an existing style must adapt to the active theme, consume a runtime token instead of copying a literal theme value:

- In JavaScript, use the flat `sys` runtime path directly, such as `Tokens.space.xs`, `Tokens.border.radius.m`, or `Tokens.color.surface.lower`; component and chart layers use `Tokens.cmpt.*` and `Tokens.chart.*`.
- In CSS or SCSS, use the emitted custom property, such as `var(--jam-space-xs)`, `var(--jam-border-radius-m)`, or `var(--jam-color-surface-lower)`.
- In the singular JAML `style` property, token-aware compact CSS, or style dictionaries, use a property-aware shorthand such as `style: 'padding:xs;gap:xs;box-shadow:xl'`, `css(padding:xs;gap:xs;box-shadow:xl)`, or `{ padding: 'xs', gap: 'xs', boxShadow: 'xl' }`.

Property-aware replacement follows [supported property-aware values](../Styles/common/css.md#property-aware-token-values). It runs for an element's singular JAML `style`, `Styles.css(...)`, state-prefixed CSS styles, `Styles.props(...)`, and dictionary-form `Styles.stylesheet({...})`. It does not parse a compiled stylesheet string passed as `Styles.stylesheet(indexStyle)`, so theme SCSS must use `var(--jam-...)` directly.

Literal values remain appropriate for mechanics that are not theme decisions, such as `display`, positioning, grid structure, transforms, and signature geometry that deliberately has no semantic token.

### 2. Keep Theme Selectors Semantic

Selectors in a theme's `index.scss` must be limited to the framework vocabulary:

- `body`
- runtime `stylize` role classes such as `.jam-app-style`, `.jam-sidebar-style`, and `.jam-tile-style`
- role variants such as `.jam-list-style[jam-variant='legend']`, which remain specializations of the `list` role
- JAML element selectors such as `jam-table`
- built-in style-plugin classes from the rule below
- combinations of those selectors connected and refined through nesting, combinators, framework attributes, slots, parts, and states

Theme-local custom properties are allowed. Project-dependent custom classes such as `.dashboard-card` or `.customer-summary` are not: they couple a reusable theme to one application. When one framework role needs a stable alternate recipe, use its native `variant` hook instead of inventing a class.

`index.scss` is ordinary SCSS and does not run Jam-UI's simple selector refinement. Write framework classes, attributes, and element tags literally. A key such as `list-legend > item` is shorthand only inside the theme's `index.mjs` `styles` object or an element's `descStyles`; Sass emits that text unchanged.

### 3. Keep `index.scss` Unwrapped And Low-Specificity

Do not wrap a theme stylesheet in `.jam-theme-[name]`. Jam-UI controls precedence by attaching the active theme stylesheet at theme-application time.

For selector shape and specificity, start from `body`, framework roles, elements, or built-in plugin roles, then express relationships through nesting and connectors. Do not add a theme-root selector merely to raise specificity.

```scss
body {
    --jam-example-panel-edge: var(--jam-color-outline-muted);
}

.jam-sidebar-style > .jam-title-style {
    border-color: var(--jam-example-panel-edge);
}

.jam-list-style {
    &[jam-variant='legend'] > .jam-item-style {
        color: var(--jam-color-fg-subtle);
    }
}

jam-table > .jam-td {
    padding: var(--jam-space-s);
}
```

### 4. Prefer Built-In Style Plugins

Use the framework's reusable style contracts before creating a new selector or utility class:

- surface treatments: [`with.accent`, `with.tint`, `with.elevation`](../Styles/common/trait.md#with)
- caption roles: [`cap.main`, `cap.sub`](../Styles/common/cap.md#caption-role-presets)
- value roles: [`value.major`, `value.main`, `value.sub`, `value.minor`](../Styles/common/value.md#value-role-presets)
- child-group layouts: [`group.bento`, `group.gridline`, `group.stripy`, `group.divider`](../Styles/group.md)

Attach these plugins directly in JAML or through the theme's `styles` map. Theme SCSS may tune their framework-owned roles, but it must not recreate their classes, child management, or runtime behavior under a project-specific name.

## 1. Name Page Stylize Values

Select roles using [Stylize's common choices](./stylize.md#common-choices). That page owns role definitions and parent-child responsibility. Sketch the smallest composition that expresses the content hierarchy; use the existing role and variant vocabulary before proposing a framework addition.

Check [runtime coverage](./stylize.md#runtime-contract) before relying on a role for layout. Add the public layout or group style needed by the composition.

## 2. Sketch Stylesheet Recipes

Write role and parent-child behavior as stylesheet recipes first.

```scss
.jam-sidebar-style {
    > .jam-button-style {
        background: transparent;
    }
}
```

Promote only theme/swatch-changing semantic values into `sys`. Keep local recipe mechanics in the stylesheet.

Define the base role recipe first. When the same role needs a stable alternate style, use a descriptive or numeric `variant`. Page JAML may use either the explicit pair `stylize: 'list', variant: 'legend'` or its compact equivalent `stylize: 'list-legend'`.

In `index.mjs`, the compact role-variant selector can attach normal style plugins:

```js
styles: {
    list: [Styles.group.divider],
    'list-legend > item': ['hover.withbg']
}
```

Only this JavaScript `styles` dictionary runs `refineSelector()`: `list-legend > item` becomes `.jam-list-style[jam-variant="legend"] > .jam-item-style`, the same selector written literally in the SCSS recipe above. Do not copy the shorthand key into `index.scss`. This is still role-driven: `legend` specializes `list`; it does not create a `legend` class or a project-specific role. Keep every variant value stable and selector-friendly, and keep the base role useful without it.

## 3. Build `ref`

Keep `ref` boring:

- one numeric `space` scale shared by padding, margin, and gap recipes
- numeric `border.radius` and `border.width` scales
- absolute `shadow.x|y|blur` geometry and font-relative `shadow.relX|relY|relBlur` geometry
- typography scales
- line styles
- geometry constants
- non-theme primitive numbers

Do not put semantic color palettes in `ref`.

If a design spec provides primitive color scales, treat them as source material for adaptive color functions or project-specific migration, not as the default JAML `ref` model.

Export `ref` as plain authoring data. Consume it while building `sys`, `cmpt`, `chart`, or generated stylesheet declarations; do not tokenize it, register it in a swatch, or emit a runtime `ref` custom-property namespace.

## 4. Build `sys`

Put theme/swatch semantic decisions in `sys`:

- `color`
- `space`
- `border.radius`
- `border.width`
- `density`
- `typography`
- `height`
- `opacity`
- `border.style`
- `shadow`
- `textShadow`
- `motion`
- `timing`

For `sys.color`, use adaptive color builders and consult [Color System](../color.md) for exact function usage.

Build `shadow` and `textShadow` as complete `shadowToken(...)` values in `sys.mjs`. Include `none`, normal scales, primary scales where needed, and `onPrimary` text shadows for foregrounds rendered on primary backgrounds. Do not reassemble private shadow-part variables in SCSS.

When a semantic value needs a different literal token in one body mode, follow [Mode-Specific Overrides](./tokens.md#mode-specific-overrides). The matching fallback path must exist in the registered root.

## 5. Define Minimal `cmpt`

Use `cmpt` for basic role/element component tokens that are reused, referenced elsewhere, or needed for calculation:

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

Table subparts such as `thead`, `tbody`, `th`, and `td` stay nested under `table`. Do not mirror every component property into `cmpt`. The child-group styles expose `bento`, `gridline`, `stripy`, and `divider` values because their native style plugins consume those seams; their selector and child-management behavior still belongs to the style recipes.

Do not add `cap` or `value` token trees. The native roles are `cap.main|sub` and `value.major|main|sub|minor`; theme them as complete optical recipes in `index.scss`.

## 6. Apply Role And Color Contracts

Before adding signature styling, enforce these invariants:

- `group`, `field`, and `actions` own child arrangement and `gap`; `section` or another content owner carries inset spacing.
- Color choices are semantic and contextual, including borders. Tune `sys.color` before adding element-specific declarations.
- A primary background always pairs with `on.primary` foreground.
- `surface.lowest` belongs on `app` only; do not also apply it to `main`.
- Selection leaves the foreground untouched and uses only an optional translucent background.
- Checked styling either covers the complete button/switch subtype matrix or targets one narrow role through `.jam-checked`.
- Font family and weight are free theme choices, but caption/value size, weight, line height, letter spacing, opacity, and foreground context are tuned together.

If the supported tokens cannot express an intentional signature treatment, write the complete recipe in `index.scss` using the selector and specificity rules above.

## 7. Define Recipe Paths

Use recipe paths for design-time declarative style paths that should be validated, imported, exported, or shown in design tooling:

```text
button.default.backgroundColor
button.default.hover.backgroundColor
button.backgroundColor
button-withacbg.backgroundColor
tile.table.td-odd.backgroundColor
```

Normal recipe paths end with a camelCase CSS property. Figma-split composite paths may end with approved parts such as `gradient.color1`, `shadow.blur`, or `textShadow.x`. Path segments are resolved as nodes, element `type` values, `CSSStates`, slots, parts, or fixed composite parts. A node may include a predefined `-[trait]`; traits cannot stand alone. Use [Recipe](./recipe.md) as the source of truth for import/export grammar.

Use external component variable inventories as a checklist, not a target shape. If a listed value is shared semantic meaning, put it in `sys`. If it is a reused or calculated basic component value, put it in `cmpt`. If it is a concrete style path, keep it only as design-time recipe metadata for validation/import/export. Import must compile the path into full stylesheet CSS with selectors and values resolved to `sys`, minimal `cmpt`, literals derived from authoring `ref`, or generated stylesheet output.

## 8. Build `chart`

Define only the declarative ECharts overrides that should be merged into the framework's adaptive chart theme builder. Use `sys` token references for semantic values and authoring `ref` values for stable primitives. The chart recipe is cooked against the chart element immediately before it is registered or consumed by ECharts.

Do not invent a parallel chart color system or repeat the swatch palette in `chart`. The runtime builder takes its series palette from the active JAML color set and rebuilds against the chart element when light/dark mode, accent color, color set, or swatch changes.

`chart` has no `light` or `dark` branch. Keep mode-sensitive chart values adaptive through `sys` token references and runtime color builders.

## 9. Compose Swatches

Construct a complete `sys` using [Token Module Contract](./tokens.md#token-module-contract), then register it in the first swatch with the needed overrides:

```js
tokens: {
    sys,
    cmpt,
    chart,
    dark: { sys: darkSys }
}
```

Later swatches inherit omitted token buckets from the first swatch. Follow [Swatch Inheritance](./tokens.md#swatch-inheritance) when replacing a bucket or authoring a new mode branch.

`swatch.darkMode` and `tokens.dark` are different contracts. `swatch.darkMode` requests the preferred body mode when that swatch is selected; `tokens.light` or `tokens.dark` supplies values for a mode. The active branch is projected into flat `Tokens.*` access and body-global CSS variables before a preferred mode switch. Theme and style consumers never read `Tokens.light.*` or `Tokens.dark.*`.

Use swatches for meaningful variations. Do not create a swatch just to compensate for a color that could be adaptive through `lumiO`.

## Theme-Complete Checklist

A theme is reasonably complete when it has intentional coverage for these areas:

- app shell: `app`, `header`, `footer`, `sidebar`, `nav`, `main`
- surfaces: `panel`, `popup`, `modal`, `tile`, `card`
- content composition: `section`, `group`, `list`, `item`; `item` also identifies coordinate-owned peer children under a map or calendar
- commands and forms: `toolbar`, `form`, `field`, `actions`
- role ownership: `group`, `field`, and `actions` arrange children; `section` owns a cohesive content region
- peer collections: `list > item` for repeated content, `map > item` for geographic coordinates, and `calendar > item` for date coordinates
- style variants: the default role works without one, and supported `jam-variant` selectors are explicit
- common elements without custom `stylize`: button, input, label, indicator, card, popup, options/select, switch, table
- adaptive values: runtime tokens or supported property-aware shorthands, with no duplicated theme literals
- stylesheet boundary: unwrapped low-specificity selectors aligned with `basic.scss`, with no project-dependent custom classes
- built-in plugins: surface, optical-role, and child-group contracts reused before custom selectors
- key states where relevant: `hover`, `active`, `focus`, `disabled`, `checked`, `indeterminate`
- surface/foreground pairing: app owns `surface.lowest`; primary backgrounds use `on.primary`
- selection: translucent background only, no foreground override
- checked subtypes: complete matrix or one deliberately scoped `.jam-checked` recipe
- optical roles: both cap levels and all four value levels are coherent combinations
- chart defaults: text, axis, grid, legend, tooltip, plus the adaptive color-set palette
- swatches: accent/color-set variants, optional mode-specific token exceptions, optional per-swatch dark mode intent
- demo coverage: a small page showing structural stylize values, common elements, and at least one chart

## Review Questions

- Is this name a role or a visual recipe?
- Is this truly an alternate style of the same role, and is its numeric or descriptive `variant` stable, meaningful, and selector-friendly?
- Does this token vary by theme or swatch?
- If this value varies by theme or swatch, is it in `sys`?
- Is this CSS selector logic instead of a token?
- Does every theme-adaptive declaration consume `Tokens.*`, `var(--jam-*)`, or a supported property-aware shorthand?
- Is this selector part of the framework vocabulary, and is it as low-specificity as the equivalent `basic.scss` selector?
- Is the stylesheet unwrapped and free of project-dependent custom classes?
- Does a built-in surface, cap/value, or group plugin already own this behavior?
- Is this design-spec variable a useful semantic idea, or just a Figma naming artifact?
- Is this `ref` value resolved before runtime registration?
- Is this `cmpt` token reused, referenced elsewhere, or needed for calculation?
- Is this one of the supported `cmpt` seams, or should it stay in `index.scss`?
- Does each light/dark mode token have the same root fallback path, and is only one mode branch authored?
- Is `swatch.darkMode` being used only as a preferred body mode rather than as a token-value bucket?
- Does the composition follow [role ownership](./stylize.md#content-composition-values), with explicit layout where the base recipe needs it?
- Does every primary background set an `on.primary` foreground?
- Is `surface.lowest` applied only to `app`?
- Does selection preserve its foreground?
- Is checked styling complete across subtypes or deliberately scoped?
- Are cap/value typography dimensions tuned as a combination rather than one property at a time?
- Is this recipe path design-time metadata rather than runtime CSS?
- Does this recipe path declare traits only as `-[trait]` on a node?
- Does this recipe path end with a real camelCase CSS property or an approved Figma-split composite part?
- Does the theme still look acceptable when an element has no custom `stylize` and only its element type?
