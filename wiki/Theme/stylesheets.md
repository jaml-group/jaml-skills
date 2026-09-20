# Theme Stylesheets

Theme stylesheets express selector logic and styling recipes. They are attached when a theme is applied and intentionally remain unwrapped so their specificity stays aligned with the framework stylesheet.

In a theme file, the `styles` section is not only for raw CSS. It registers global style entries, and each entry may contain normal style plugins:

-   `Styles.stylesheet(importedScss)` for complete static CSS/SCSS output.
-   `Styles.css(...)`, `Styles.rule(...)`, style strings, or custom style objects for normal CSS style work.
-   style plugins that add classes, layers, runtime listeners, measurements, animation helpers, or other JavaScript behavior.

The `styles` object uses the same selector-to-style-array grammar as an element's `descStyles` dictionary, but at theme scope. At runtime, `Theme.buildStyles()` parses each entry, then `Theme.apply()` passes the parsed map through `registerGlobalStyle(this.styles, '')`. Theme attachment order controls cascade priority; a theme-root selector is not added.

Selector refinement stops at that JavaScript dictionary boundary:

| Location | Authoring selector | Behavior |
|---|---|---|
| `index.mjs` `styles` | `list-legend > item` | `refineSelector()` produces `.jam-list-style[jam-variant="legend"] > .jam-item-style` |
| element `descStyles` | `list-legend > item` | `refineSelector()` produces the same selector relative to the owning element |
| `index.scss` | `.jam-list-style[jam-variant='legend'] > .jam-item-style` | Sass compiles ordinary SCSS; Jam-UI does not refine selector shorthand |

Do not write `list-legend > item` in SCSS expecting Jam-UI expansion. Sass emits it unchanged as ordinary type selectors.

Nested objects are interpreted as nested selectors. Array values are interpreted as `StyleOption[]`. Plain objects inside an array become `Styles.css(...)`; `{ method, args }` objects call the named style method; strings and style plugin objects are parsed through the normal style runtime.

Every `Theme` starts with Jam-UI's small built-in baseline map; its own `styles` object replaces an entry with the same selector key. When no theme is selected, that baseline map is registered globally. Treat it as an overrideable implementation default, not as a catalogue of stable theme recipes: its selectors and treatments may evolve with the framework.

## Variant Selectors

`variant` is a native element param. Its numeric or descriptive value is serialized into `jam-variant`. The compact JAML form `stylize: 'list-legend'` is equivalent to `stylize: 'list', variant: 'legend'` and emits `class="jam-list-style" jam-variant="legend"`.

In attached SCSS, write the literal runtime selector:

```scss
.jam-list-style {
    &[jam-variant='legend'] > .jam-item-style {
        color: var(--jam-color-fg-subtle);
    }
}
```

In `index.mjs`, use the compact selector-to-plugin form:

```js
styles: {
    'list-legend > item': ['hover.withbg']
}
```

`refineSelector()` compiles that `index.mjs` key to `.jam-list-style[jam-variant="legend"] > .jam-item-style`. It does not process the attached SCSS. Both authoring forms remain role-driven and introduce no custom class. Use a stable descriptive value when it makes the alternate purpose clearer; use a number when it is the clearer contract. Do not use a variant to hide project-specific domain identity inside a reusable theme.

When a theme needs to change a baseline recipe, declare the exact same selector key in its `styles` object. Do not make a theme depend on an undocumented baseline recipe; author its required role and variant selectors explicitly instead.

For the base grammar, see [Scoped style params](../Styles/styles.md#scoped-style-params) and [JAML scoped style variants](../JAML/jaml-format.md#styles).

This is intentional. Some theme behavior can be expressed as static CSS; some behavior needs JAML's style/plugin runtime.

Use stylesheets for:

-   role selectors
-   parent-child role selectors
-   layout CSS
-   display and alignment behavior
-   structural CSS that should not be tokenized
-   visual recipes such as ghost, solid, compact, or card-like behavior
-   complete optical recipes for `cap` and `value` roles
-   signature theme treatments that existing `sys`/`cmpt` seams cannot express
-   part and slot selectors
-   CSS state selectors

Use runtime tokens only for `sys`, minimal `cmpt`, and chart-derived values. Authoring `ref` may feed generated declarations, but its values must be resolved before runtime and must not appear as `--jam-ref-*` custom properties. Recipe paths are design-time style addresses; import tooling should compile them into selectors and declarations before runtime.

## Selector Boundary And Specificity

Theme recipes are role-driven and may refine a role with `jam-variant`. The remaining allowed selectors are framework-owned:

- `body`
- framework `stylize` role classes such as `.jam-app-style`, `.jam-sidebar-style`, or `.jam-tile-style`
- JAML elements such as `jam-table`
- framework-owned classes emitted by built-in style plugins

Connect and refine those selectors through normal nesting, combinators, framework attributes, slots, parts, and states. Keep the resulting chain no more specific than the equivalent base recipe.

Do not wrap the file in `.jam-theme-[name]`, and do not target project-dependent classes such as `.dashboard-card` or `.customer-summary`. Parser support for an arbitrary class does not make it part of the reusable theme contract. Theme-local CSS custom properties are allowed when a recipe needs an internal composition value.

```scss
body {
    --jam-example-edge: var(--jam-color-outline-muted);
}

.jam-sidebar-style > .jam-title-style {
    border-color: var(--jam-example-edge);
}

jam-table > .jam-td {
    padding: var(--jam-space-s);
}
```

## Complete Stylesheets

`Styles.stylesheet(importedStyle)` appends a complete stylesheet to `document.head`. It is not scoped to the style key that references it.

Keep the imported theme stylesheet unwrapped. Jam-UI attaches the compiled CSS when the theme is applied, so attachment time—not a theme-root selector—controls priority. The imported string does not pass through `refineSelector()`; use the literal role selectors described above.

```scss
.jam-sidebar-style {
    background: var(--jam-color-surface-lower);

    > .jam-button-style {
        background: transparent;
        color: var(--jam-color-fg-subtle);

        &:hover {
            background: var(--jam-color-neutral-strong);
            color: var(--jam-color-fg-default);
        }
    }
}
```

Compiled stylesheet strings do not support shorthand token replacement. Use explicit `var(--jam-...)` references in SCSS. Property-aware shorthand replacement is available in an element's singular JAML `style`, `Styles.css(...)`, `Styles.props(...)`, and dictionary-form `Styles.stylesheet({...})`; see [Property-aware token values](../Styles/common/css.md#property-aware-token-values).

## Static CSS vs Runtime Style Plugins

Use imported SCSS when the behavior is pure CSS:

-   selectors
-   layout recipes
-   pseudo-classes and pseudo-elements
-   media queries
-   keyframes
-   static visual recipes

Use style plugins in the theme `styles` section when runtime behavior is needed:

-   adding/removing classes
-   creating layers or helper DOM
-   measuring or reacting to resize/scroll/mouse state
-   applying animation or interaction helpers
-   setting element/plugin options that cannot be represented as static CSS

Example:

```js
import appStyle from './styles/app.scss';

export default {
    name: 'Example',
    styles: {
        'document.header': [Styles.stylesheet(appStyle)],
        button: [
            Styles.css({
                borderRadius: 'var(--jam-border-radius-m)'
            }),
            'hover.withbg'
        ],
        tile: ['interact.resizable']
    }
};
```

`document.header` is only a convenient style key for attaching the complete stylesheet. `button` and `tile` are style keys that apply style plugins when matching elements resolve external theme styles.

Think of this as a theme-level `descStyles` map: each key is a selector, and each value is the same `StyleOption[]` grammar used by normal JAML element styles.

## Reuse Built-In Style Recipes

Prefer built-in style plugins when they already own the semantic treatment or runtime behavior:

| Purpose | Built-in paths |
|---|---|
| Surface treatment | `with.accent`, `with.tint`, `with.elevation` |
| Caption hierarchy | `cap.main`, `cap.sub` |
| Value hierarchy | `value.major`, `value.main`, `value.sub`, `value.minor` |
| Child-group layout | `group.bento`, `group.gridline`, `group.stripy`, `group.divider` |

Attach them in JAML or the theme `styles` map. A theme may tune the framework-owned selectors they emit, but it should not reproduce their classes, child management, or runtime behavior in a project-specific selector.

## Group Related Rules

Put parent-child role selectors related to a role in the same file.

Good:

```text
styles/sidebar.scss
```

contains:

```scss
.jam-sidebar-style {
    background: var(--jam-color-surface-lower);

    > .jam-button-style {
        background: transparent;
        color: var(--jam-color-fg-subtle);
    }
}
```

Avoid splitting this into `sidebar.scss` and `sidebar-button.scss` unless a concrete build/tooling need appears.

## Compose Role Ownership

Follow [the role ownership contract](./stylize.md#content-composition-values) when choosing the selector that owns spacing. The example below applies theme spacing to those owners; it is a theme recipe, not a claim that every base role already sets these declarations. Shared density values come from [system tokens](./tokens.md#sys), while group-plugin values use their existing [component seams](./tokens.md#cmpt).

```scss
.jam-group-style,
.jam-actions-style,
.jam-field-style {
    gap: var(--jam-space-s);
}

.jam-section-style {
    padding: var(--jam-space-s);
}
```

## Keep Color Contextual

Choose colors by usage and background, including border colors. Tune `sys.color` first; do not assign a signature color merely because an element is a sidebar, card, label, or border.

Two surface invariants are mandatory:

-   `surface.lowest` belongs on `.jam-app-style`, not `.jam-main-style`.
-   A `primary` background must set its foreground to `on.primary` in the same recipe.

```scss
.jam-app-style {
    background-color: var(--jam-color-surface-lowest);
}

.jam-sidebar-style > .jam-title-style {
    background-color: var(--jam-color-primary-default);
    color: var(--jam-color-on-primary);
}
```

## Selection And Checked States

Do not set a selection foreground. CodeMirror and other embedded editors must keep their syntax colors. When needed, override only the selection background with a translucent token such as `sys.color.primary.veil`; otherwise leave selection alone.

Checked styling must be complete or deliberately narrow. Either cover the full button and switch subtype matrix, including ghost and outline subtypes, or scope `.jam-checked` beneath one owning role. Do not broadly restyle generic buttons and then leave their subtypes inconsistent.

## Optical Role Recipes

Do not add `text.header1` through `text.header6`. The native role vocabulary is already complete: two caption levels and four value levels.

Treat size, weight, line height, letter spacing, opacity, and contextual foreground as one optical decision. Font family and weight remain free theme choices, but tune them together with the rest of the role instead of changing each dimension in isolation.

```scss
.jam-cap-main > [slot='cap'] {
    font-size: 1em;
    font-weight: var(--jam-typography-font-weight-bold);
    line-height: var(--jam-typography-line-height-tight);
    opacity: 1;
}

.jam-value-major > [slot='value'] {
    font-size: 2.25em;
    font-weight: var(--jam-typography-font-weight-bold);
    line-height: var(--jam-typography-line-height-tight);
    opacity: 1;
}
```

Implement all `cap.main|sub` and `value.major|main|sub|minor` roles when a theme departs from the native optical recipe.

## Signature Recipe Escape Hatch

The token boundaries are an exhaustive default, not a ban on a theme's identity. If existing `sys` and supported `cmpt` seams cannot express an intentional signature style, keep the complete treatment in the theme's `index.scss`. Keep it unwrapped, within the selector boundary above, group related declarations together, and use semantic tokens wherever they still fit.

## Recipes Stay In Stylesheets

Good:

```scss
.jam-app-style {
    background: var(--jam-color-surface-lowest);
}

.jam-main-style {
    padding: var(--jam-space-l);

    > .jam-list-style {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
        gap: var(--jam-space-l);
    }
}
```

Bad:

```js
const recipePaths = {
    'main.list.display': 'grid',
    'main.list.gridTemplateColumns': 'repeat(auto-fit, minmax(18rem, 1fr))'
};
```

Those are layout recipe declarations. Keep them in the stylesheet. If a value needs to vary across themes or swatches, introduce a `sys` token and have the stylesheet recipe consume `sys`; do not preserve the recipe path as a runtime variable.

## Index Usage

In `index.mjs`, a user may technically attach several imported stylesheets to the same role key, but using build-time integration to combine them into one stylesheet is recommended.

```js
import integratedStyle from './styles/index.scss';

export default {
    name: 'Example',
    styles: {
        'document.header': [Styles.stylesheet(integratedStyle)]
    }
};
```

`document.header` is a pseudo-role key used to attach the complete stylesheet. The stylesheet itself is appended globally, without a theme wrapper, when the theme is applied.
