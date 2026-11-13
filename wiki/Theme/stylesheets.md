# Theme Stylesheets

Theme stylesheets express selector logic and styling recipes. They are attached when a theme is applied and intentionally remain unwrapped so their specificity stays aligned with the framework stylesheet.

In a theme file, the `styles` section is not only for raw CSS. It registers global style entries, and each entry may contain normal style plugins:

-   `Styles.stylesheet(importedScss)` for complete static CSS/SCSS output.
-   `Styles.css(...)`, `Styles.rule(...)`, style strings, or custom style objects for normal CSS style work.
-   style plugins that add classes, layers, runtime listeners, measurements, animation helpers, or other JavaScript behavior.

The theme’s `styles` object and an element’s `descStyles` share the selector syntax. Each selector key scopes its registered styles. Use the reserved `document.header` entry for a complete document-level stylesheet. Theme-owned registrations are removed when that theme is unapplied, and attachment order controls cascade priority; a theme-root selector is not added.

Selector refinement stops at that JavaScript dictionary boundary:

| Location             | Authoring selector                                        | Behavior                                                                              |
| -------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `index.mjs` `styles` | `list-legend > item`                                      | `refineSelector()` produces `.jam-list-style[jam-variant="legend"] > .jam-item-style` |
| element `descStyles` | `list-legend > item`                                      | `refineSelector()` produces the same selector relative to the owning element          |
| `index.scss`         | `.jam-list-style[jam-variant='legend'] > .jam-item-style` | Sass compiles ordinary SCSS; Jam-UI does not refine selector shorthand                |

Do not write `list-legend > item` in SCSS expecting Jam-UI expansion. Sass emits it unchanged as ordinary type selectors.

### Style entry forms

Nested objects in the theme’s `styles` map define selectors. In each selector’s array, use a registered style path string or a constructed style such as `Styles.layer.background(args)`. Theme arrays also accept two plain object forms. A `{ method, args }` entry calls the registered style factory named by `method` with `args`. A CSS declaration dictionary such as `{ position: 'relative' }` becomes `Styles.css(...)`. For an anonymous plugin-backed style, pass the style returned by `Styles.style({ desc, plugins })()`.

In a component’s `styles` or `descStyles` arrays, use a style path string or call the factory directly with its argument object. Use `Styles.css(declarations)` for a CSS dictionary in those arrays. The [component style formats](../Styles/styles.md#styleoption-formats) describe the anonymous style object form.

Every `Theme` starts with Jam-UI's small built-in baseline map; its own `styles` object replaces an entry with the same selector key. When no theme is selected, that baseline map is registered globally. Treat it as an overrideable implementation default, not as a catalogue of stable theme recipes: its selectors and treatments may evolve with the framework.

**Default-style policy:** Keep baseline recipes at framework scope. Express theme-specific changes in that theme's `styles` map, preserving the shared defaults for other themes. This applies to every default style entry; quieter animation is one application of the policy.

Replacement uses the **exact same top-level selector key**, before selector refinement, and replaces the **whole entry** rather than merging plugin arrays. Set that key to `[]` to disable the entry, or explicitly list every plugin the theme wants to retain. For example, when the target baseline uses a `tile` entry containing animations and hover treatment, a theme can keep only the hover treatment:

```js
export default {
    styles: {
        tile: ['hover.withbg']
    }
};
```

Using `tile: []` instead contributes no plugins from that entry. Other matching entries, element-local styles and stylesheet CSS still apply. A narrower or different key, such as `'main > tile'`, adds a separate recipe; it does not remove the baseline `tile` entry or any of its plugins. Check the target runtime's baseline keys when replacing one; this example illustrates replacement and does not promise a fixed baseline plugin list.

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

For the base grammar, see [Scoped style params](../Styles/styles.md#scoped-style-params).

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

For [layout-owned shell profiles](./stylize.md#layout-owned-stylize-profiles), the selected layout owns structure, geometry and scrolling. Theme CSS and runtime style plugins must preserve those constraints while applying visual recipes. The layout-CSS guidance above also covers local content arrangement; it does not give a theme ownership of the shell.

Use runtime tokens only for `sys`, minimal `cmpt`, and chart-derived values. Authoring `ref` may feed generated declarations, but its values must be resolved before runtime and must not appear as `--jam-ref-*` custom properties. Recipe paths are design-time style addresses; import tooling should compile them into selectors and declarations before runtime.

## Selector Boundary And Specificity

Theme recipes are role-driven and may refine a role with `jam-variant`. The remaining allowed selectors are framework-owned:

-   `body`
-   framework `stylize` role classes such as `.jam-app-style`, `.jam-sidebar-style`, or `.jam-tile-style`
-   JAML elements such as `jam-table`
-   framework-owned classes emitted by built-in style plugins

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

`Styles.stylesheet(importedStyle)` in a theme’s `document.header` entry attaches a complete document-level stylesheet. Other registration keys scope its element selectors to that key, for both imported strings and dictionary-form sheets. Use `document.header` for a complete theme sheet; registering that same sheet under `button`, for example, changes its selector scope.

Keep the imported theme stylesheet unwrapped. Jam-UI attaches the compiled CSS when the theme is applied, so attachment time—not a theme-root selector—controls priority. The document order is: the framework stylesheet, the built-in token values, then the theme's registered stylesheets, and finally the theme's token values. Styles an application registers after the theme, such as element `descStyles`, follow it and win at equal specificity. A theme rule therefore wins over a framework rule of equal specificity; to override a more specific framework rule, match its specificity rather than adding a wrapper. The imported string does not pass through `refineSelector()`; use the literal role selectors described above.

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

`document.header` is the reserved registration key that keeps a complete stylesheet at document scope. `button` and `tile` are style keys that apply style plugins when matching elements resolve external theme styles.

Each key is a selector. See [style entry forms](#style-entry-forms) for the accepted array entries.

## Reuse Built-In Style Recipes

Prefer built-in style plugins when they already own the semantic treatment or runtime behavior:

| Purpose            | Built-in paths                                                   |
| ------------------ | ---------------------------------------------------------------- |
| Surface treatment  | `with.accent`, `with.tint`, `with.elevation`                     |
| Caption hierarchy  | `cap.main`, `cap.sub`                                            |
| Value hierarchy    | `value.major`, `value.main`, `value.sub`, `value.minor`          |
| Child-group layout | `group.bento`, `group.gridline`, `group.stripy`, `group.divider` |

Attach them in JAML or the theme `styles` map. A theme may tune the framework-owned selectors they emit, but it should not reproduce their classes, child management, or runtime behavior in a project-specific selector.

## Decorative Layers

Decoration that sits on a surface — corner brackets, gloss, stripes, grids, scanlines, glows that follow the pointer — comes from the [layer styles](../Styles/layers/layer.md). A layer is a light-DOM child projected through the host's `layerslot`; it brings its own lifecycle, accent-color sync and cleanup. Choose the layer before reaching for pseudo-elements or stacked background images:

| Effect                             | Layer                                                                                                                                                                                                                                         |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HUD or viewfinder corner brackets  | [`layer.crosshair`](../Styles/layers/crosshair.md): accent brackets with glow that breathe on hover, with `corners` and `ticks` to choose what draws; [`hover.crosshair`](../Styles/hover.md) for one marker that moves to the hovered target |
| Gloss, reflection, metal           | [`layer.glare.*`](../Styles/layers/glare.md): `gloss`, `reflect`, `metal`, `spot`, `light`                                                                                                                                                    |
| Static patterns and gradients      | [`layer.background.*`](../Styles/layers/background.md): `stripy`, `grid`, `chess`, `bubbles`, `gradient.*`, `crystal`, `glassify`                                                                                                             |
| Moving patterns, such as scanlines | [`layer.scroller.*`](../Styles/layers/scroller.md): `stripy`, `grid`, `particles`, `bubbles`, `text`                                                                                                                                          |
| Pointer-following light            | [`layer.follower.*`](../Styles/layers/follower.md): `spotlight`, `edge`, `shadow`                                                                                                                                                             |
| Ribbons and watermarks             | [`layer.ribbon.*`](../Styles/layers/ribbon.md), [`layer.watermark.*`](../Styles/layers/watermark.md)                                                                                                                                          |
| Anything else                      | [`layer.css(...)`](../Styles/layers/css.md) with explicit position, size and `pointerEvents:none`                                                                                                                                             |

Attach layers from the theme `styles` map by role key:

```js
styles: {
    'document.header': [Styles.stylesheet(indexStyle)],
    'main > tile': ['layer.crosshair(glow:6;width:2)'],
    'body > app': ['layer.scroller.stripy']
}
```

-   The theme applies its layers to existing and later-mounted matches, and switching themes removes them with the rest of the theme's recipes.
-   An exact baseline key such as `tile` replaces the baseline entry, including its hover and entry animation; a different key such as `'main > tile'` adds the layer alongside it. See [default-style replacement](#reuse-built-in-style-recipes) above.
-   The host needs a positioned context. Give a static role `position: relative` in the theme stylesheet; a host that is already positioned, such as `app`, works as it is. On a static host the layer measures against an unrelated ancestor.
-   A layer starts at the host’s content position. Give a backdrop the full host with `inset: 0`. In the theme’s `styles` map, the `{ method, args }` entry passes the nested CSS dictionary to the layer factory.

    ```js
    'main > tile': [{ method: 'layer.background', args: { zIndex: -1, css: { inset: '0', clipPath: 'var(--my-clip)' } } }]
    ```

    In a component’s `styles` array, call the factory with the same arguments.

    ```js
    styles: [Styles.layer.background({ zIndex: -1, css: { inset: '0', clipPath: 'var(--my-clip)' } })];
    ```

-   Layers are projected above the host's own background. Put a backdrop behind content with `zIndex:-1` on the layer and `isolation: isolate` on the host; keep overlays click-through with `pointerEvents:none`.
-   A layer is a descendant of its host, so the host’s `clip-path` and `overflow` apply to it. For cut corners, use [`shape.chamfer`](../Styles/shape.md#entry-shape-chamfer), clip the backdrop to `var(--jam-shape)`, and use [`layer.glow`](../Styles/layers/layer.md#entry-layer-glow) for a lit rim or [`layer.shade`](../Styles/layers/layer.md#entry-layer-shade) for a cast shadow. Leave the host unclipped so the edge, focus rings and `layer.crosshair` brackets can extend beyond it. The edge layer owns its filter, which allows a separate backdrop layer to keep its blur. When only some corners are cut, `layer.crosshair(corners:tr bl)` draws brackets on the uncut ones.
-   Color every crosshair from the theme stylesheet with `--jam-locator-color` and `--jam-locator-glow-color`, and set its resting opacity with `--jam-locator-rest-opacity` (0.5 by default), for example on `body`. A `color` or `restOpacity` argument overrides them for one host.
-   Each matched element gets its own layer node. Target a few surfaces (`app`, tiles, cards) rather than every control, and keep animated layers to one or two per page.

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

`document.header` is the reserved registration key for attaching the complete stylesheet without selector scoping. The stylesheet itself is appended globally, without a theme wrapper, when the theme is applied.
