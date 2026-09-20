# Theme Color

Theme colors belong in `sys.color`. They should use semantic families and decorators, not static palette refs.

Do not model semantic colors as:

```javascript
ref.color.blue[500];
ref.color.gray[900];
```

Use JAML adaptive color builders so colors follow accent color, color set, swatch, and dark/light adaptation.

For detailed function behavior, edge cases, and broader color API usage, read [Color System](../color.md). This page only defines the theme-token shape.

## Families

The recommended full-theme color vocabulary uses these `sys.color` families:

```text
primary
secondary
tertiary
quaternary
surface
neutral
outline
tint
elevated
fg
on
```

Add a domain-specific family only when the product needs a durable semantic role. Do not use `sys.color` as a static palette bucket; the built-in chart theme builder takes its series palette from the active JAML color set.

Family meanings:

-   `primary`, `secondary`, `tertiary`, `quaternary`: accent sequence colors for primary action, secondary action, highlighted information, selected states, and decorative hierarchy.
-   `surface`: layered container backgrounds for page, main, tile, card, panel, popup, modal, and floating surfaces.
-   `neutral`: non-emotional filled treatments such as neutral backgrounds, weak fills, disabled fills, and low-emphasis areas.
-   `outline`: neutral borders, outlines, separators, and other structural edge marks.
-   `tint`: transparent accent-tinted fills for selected or supporting UI.
-   `elevated`: transparent elevation fills and hover layers.
-   `fg`: normal foreground text and icons.
-   `on`: contrast foreground text and icons placed on filled or colored backgrounds.

`surface.lowest` is the application canvas. Apply it to `.jam-app-style` only; do not repeat it on `.jam-main-style`. Main content should inherit the app canvas unless it intentionally creates a higher surface.

## Token Usage Guide

The `sys.color` names describe usage, state, and visual weight. They are not a generic light-to-dark palette. Theme authors may change their hue, saturation, lightness, and alpha, but each token must keep the semantic job below.

### Filled and edge ladders

Filled color families use a three-level interaction ladder:

| Decorator | Intended use |
| --------- | ------------ |
| `default` | Resting filled background. For an accent family, this is the colored background; for `neutral`, it is the normal non-accent fill. |
| `strong` | Hover background for the same filled treatment. |
| `heavy` | Active or pressed background for the same filled treatment. It may also provide the firm edge for a selected filled state. |

Neutral structural edges use the separate `outline` family:

| Token | Intended use |
| ----- | ------------ |
| `outline.subtle` | Most visible low-intensity border or outline, especially around a tinted, elevated, or otherwise weak background. |
| `outline.muted` | Quieter border, separator, or structural mark than `outline.subtle`. |
| `outline.faint` | Least-intense border, separator, or decorative structural mark. |

Treat `default` → `strong` → `heavy` as one interaction-state set, and `outline.subtle` → `outline.muted` → `outline.faint` as a descending neutral edge-emphasis set. Accent families may additionally supply their own `subtle`, `muted`, and `faint` edge colors. Do not pick these tokens merely because one happens to look lighter or darker in the current theme.

### Recommended full-theme contract

This is the recommended authoring contract for a theme that wants every filled-state and edge-emphasis level. It is richer than Jam-UI's built-in compatibility baseline, so a consumer must not assume the optional accent-family edge keys exist unless its theme supplies them.

| Family | Recommended tokens | Intended use |
| ------ | --------------- | ------------ |
| `primary` | `default`, `strong`, `heavy`, `subtle`, `muted`, `faint`, `film`, `veil`, `mask` | Main accent fills, states, edges, and reusable accent overlays. |
| `secondary`, `tertiary`, `quaternary` | `default`, `strong`, `heavy`, `subtle`, `muted`, `faint` | The same filled-state and edge ladder for the remaining color-set entries. |
| `neutral` | `default`, `strong`, `heavy`, `film`, `veil`, `mask` | Non-accent controls, filled states, and neutral overlays. |
| `outline` | `subtle`, `muted`, `faint` | Neutral borders, outlines, separators, and structural marks. |
| `tint` | `default`, `strong`, `heavy` | Translucent accent-tinted resting, hover, and active backgrounds. |
| `elevated` | `default`, `strong`, `heavy` | Translucent elevation resting, hover, and active layers. |
| `surface` | `lowest`, `lower`, `default`, `higher`, `highest`, `alter`, `alterHover` | Structural surfaces ordered by relative elevation, plus alternate transparent/hover surfaces. |
| `fg` | `strong`, `default`, `subtle`, `muted`, `faint`, `primary`, `secondary`, `tertiary`, `quaternary` | Neutral emphasis hierarchy and colored foregrounds on ordinary surfaces. |
| `on` | `primary`, `secondary`, `tertiary`, `quaternary` | Contrast foregrounds on the corresponding filled accent background. |

### Built-in compatibility baseline

The built-in `sysLit` exports this color baseline. Theme authoring must merge its overrides into the complete `sysLit` tree before calling `tokenize()`; swatch registration does not automatically merge `sys`. See the [token module contract](tokens.md#token-module-contract).

| Family | Built-in keys |
|---|---|
| `primary` | `default`, `strong`, `heavy`, `subtle`, `film`, `veil`, `mask` |
| `secondary`, `tertiary`, `quaternary` | `default`, `strong`, `heavy`, `subtle` |
| `neutral` | `default`, `strong`, `heavy`, `film`, `veil`, `mask` |
| `outline` | `subtle`, `muted`, `faint` |
| `tint`, `elevated` | `default`, `strong`, `heavy` |
| `surface` | `lowest`, `lower`, `default`, `higher`, `highest`, `alter`, `alterHover` |
| `fg` | `strong`, `default`, `subtle`, `muted`, `faint`, `primary`, `secondary`, `tertiary`, `quaternary` |
| `on` | `primary`, `secondary`, `tertiary`, `quaternary` |
| Direct color leaf | `transparent` |

The authoring override dictionary may omit keys supplied by `sysLit`, but the final registered `sys` must include them. The richer accent-family `muted` and `faint` keys above are theme-authored extensions, not built-in guarantees.

### Primary translucency

`primary` and `neutral` provide three fixed-alpha overlays for layering color without inventing component-owned alpha values:

| Token          | Alpha  | Use                                      |
| -------------- | ------ | ---------------------------------------- |
| `primary.film`, `neutral.film` | `0.15` | Light wash |
| `primary.veil`, `neutral.veil` | `0.3` | Noticeable selected or supporting fill |
| `primary.mask`, `neutral.mask` | `0.5` | Strong overlay or obscuring layer |

### Translucent state backgrounds

`tint` and `elevated` use the three interaction-state decorators without the edge ladder:

| Token | Intended use |
| ----- | ------------ |
| `tint.default` | Resting translucent accent-tinted background. |
| `tint.strong` | Hover state for the tint treatment. |
| `tint.heavy` | Active or pressed state for the tint treatment. |
| `elevated.default` | Resting translucent elevation layer. |
| `elevated.strong` | Hover state for the elevation treatment. |
| `elevated.heavy` | Active or pressed state for the elevation treatment. |

A theme may intentionally give hover and active the same value, but it should still provide both semantic state slots.

### Surface elevation

Use the five-level elevation ladder only for `surface`:

```text
lowest
lower
default
higher
highest
alter
alterHover
```

Meanings:

-   `lowest`: application canvas; apply it to `app` only and let `main` inherit it
-   `lower`: low, recessed, or embedded structural surface
-   `default`: ordinary contained surface
-   `higher`: raised or hovered surface
-   `highest`: topmost floating, dialog, or callout surface
-   `alter`: alternate surface, transparent in the built-in baseline
-   `alterHover`: hover layer for that alternate surface

This order describes semantic elevation, not a mandatory luminance direction. A theme may make higher surfaces lighter, darker, or more chromatic as long as the layer relationship remains clear.

### Foregrounds

Use `fg` for normal text and icon foregrounds:

```text
fg.strong
fg.default
fg.subtle
fg.muted
fg.faint
fg.primary
fg.secondary
fg.tertiary
fg.quaternary
```

Foreground meanings:

| Token | Intended use |
| ----- | ------------ |
| `fg.strong` | Highest-emphasis headings, key values, and icons. |
| `fg.default` | Normal body text and default icons. |
| `fg.subtle` | Secondary labels and supporting text. |
| `fg.muted` | Tertiary metadata, placeholders, and de-emphasized icons. |
| `fg.faint` | Least-emphasis, disabled-like, or decorative foreground. |
| `fg.primary`, `fg.secondary`, `fg.tertiary`, `fg.quaternary` | Colored foregrounds derived from the color-set sequence. Use them on ordinary surfaces, not as contrast text on the matching filled accent. |

Use `on` for contrast text and icon colors on filled or colored backgrounds:

```text
on.primary
on.secondary
on.tertiary
on.quaternary
```

Each `on.*` token pairs with the corresponding family's `default`, `strong`, and `heavy` filled backgrounds. Do not use `on` as a generic inverse color bucket; use it only when the foreground is placed on the matching colored background and needs contrast.

Choose tokens in this order:

1. Use `surface.*` for opaque structural backgrounds.
2. Use a semantic family's `default` / `strong` / `heavy` set for resting / hover / active filled states.
3. Use `tint.*` for translucent accent states, `elevated.*` for elevation layers, and `primary.film|veil|mask` for reusable fixed-alpha accent overlays.
4. Use `outline.subtle` / `outline.muted` / `outline.faint` for neutral borders and separators from more visible to least visible; use an accent family's edge decorators only for an intentionally colored edge.
5. Use `fg.*` for foreground hierarchy on ordinary surfaces and `on.*` on the corresponding filled accent background.

## Context And Ownership Rules

Theme color is selected by usage and background context, not by element or role identity. This restriction includes borders, outlines, and separators as well as text, icons, and fills.

Use this order:

1. Tune the semantic `sys.color` families. This should cover most of a theme.
2. Override an existing component seam only when the native recipe consumes it. Table/header colors are supported; button and checked color treatments belong together as complete stylesheet recipes.
3. Keep `cap.main|sub` and `value.major|main|sub|minor` as complete optical stylesheet recipes. Their foreground should inherit the owning surface or use an appropriate `fg.*` token; do not create `text.header1` through `text.header6` tokens.
4. If a signature theme treatment still cannot be expressed through existing `sys`/`cmpt` values, write the complete recipe in `index.scss` using the framework selector boundary.

Whenever a primary color is used as a background, set its foreground to `on.primary` in the same recipe:

```scss
.jam-sidebar-style > .jam-title-style {
    background-color: var(--jam-color-primary-default);
    color: var(--jam-color-on-primary);
}
```

Do not partially recolor the generic checked state. Either cover the complete button and switch subtype matrix, including default, ghost, and outline treatments, or target one deliberately narrow role with `.jam-checked` inside its owning selector.

Selection is a background-only theme seam. Do not set a selection foreground: embedded editors such as CodeMirror must preserve syntax colors. If the theme needs a selection treatment, use a translucent background such as `primary.veil`; otherwise leave it untouched.

```javascript
const selection = {
    backgroundColor: sys.color.primary.veil
};
```

## CSS variables

`tokens2StyleSheet()` removes the `sys` path prefix when it emits runtime CSS custom properties. A token path therefore maps directly to its semantic CSS variable:

| Token path                  | CSS variable                  |
| --------------------------- | ----------------------------- |
| `sys.color.primary.default` | `--jam-color-primary-default` |
| `sys.color.primary.film`    | `--jam-color-primary-film`    |
| `sys.color.outline.subtle`  | `--jam-color-outline-subtle`  |
| `sys.color.fg.muted`        | `--jam-color-fg-muted`        |
| `sys.color.on.primary`      | `--jam-color-on-primary`      |

Do not write `--jam-sys-*` variables. Theme color tokens are emitted beneath the active theme's color-profile selectors, so their values follow the selected swatch.

## Example

Consume the exported baseline and override only the semantic decisions your theme changes. This example intentionally defines theme-specific values; it is not a copy of the framework palette.

```javascript
import { sysLit, acToken, tokenize } from '@jam/jam-ui';

const sys = tokenize({
    ...sysLit,
    color: {
        ...sysLit.color,
        primary: {
            ...sysLit.color.primary,
            film: acToken(1, 1, 1, 0.12),
            veil: acToken(1, 1, 1, 0.24)
        }
    }
});
```

Register the complete `sys` tree as described in the [token module contract](tokens.md#token-module-contract).
