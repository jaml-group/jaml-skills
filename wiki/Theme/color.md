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

| Decorator | Intended use                                                                                                                      |
| --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `default` | Resting filled background. For an accent family, this is the colored background; for `neutral`, it is the normal non-accent fill. |
| `strong`  | Hover background for the same filled treatment.                                                                                   |
| `heavy`   | Active or pressed background for the same filled treatment. It may also provide the firm edge for a selected filled state.        |

Neutral structural edges use the separate `outline` family:

| Token            | Intended use                                                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| `outline.subtle` | Most visible low-intensity border or outline, especially around a tinted, elevated, or otherwise weak background. |
| `outline.muted`  | Quieter border, separator, or structural mark than `outline.subtle`.                                              |
| `outline.faint`  | Least-intense border, separator, or decorative structural mark.                                                   |

Treat `default` → `strong` → `heavy` as one interaction-state set, and `outline.subtle` → `outline.muted` → `outline.faint` as a descending neutral edge-emphasis set. Accent families may additionally supply their own `subtle`, `muted`, and `faint` edge colors. Do not pick these tokens merely because one happens to look lighter or darker in the current theme.

### Recommended full-theme contract

This is the recommended authoring contract for a theme that wants every filled-state and edge-emphasis level. It is richer than Jam-UI's built-in compatibility baseline, so a consumer must not assume the optional accent-family edge keys exist unless its theme supplies them.

| Family                                | Recommended tokens                                                                                | Intended use                                                                              |
| ------------------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `primary`                             | `default`, `strong`, `heavy`, `subtle`, `muted`, `faint`, `film`, `veil`, `mask`                  | Main accent fills, states, edges, and reusable accent overlays.                           |
| `secondary`, `tertiary`, `quaternary` | `default`, `strong`, `heavy`, `subtle`, `muted`, `faint`                                          | The same filled-state and edge ladder for the remaining color-set entries.                |
| `neutral`                             | `default`, `strong`, `heavy`, `film`, `veil`, `mask`                                              | Non-accent controls, filled states, and neutral overlays.                                 |
| `outline`                             | `subtle`, `muted`, `faint`                                                                        | Neutral borders, outlines, separators, and structural marks.                              |
| `tint`                                | `default`, `strong`, `heavy`                                                                      | Translucent accent-tinted resting, hover, and active backgrounds.                         |
| `elevated`                            | `default`, `strong`, `heavy`, `subtle`                                                            | Translucent elevation resting, hover, active, and faint alternate layers.                 |
| `surface`                             | `lowest`, `lower`, `default`, `higher`, `highest`, `alter`                                        | Structural surfaces ordered by relative elevation, plus an alternate transparent surface. |
| `fg`                                  | `strong`, `default`, `subtle`, `muted`, `faint`, `primary`, `secondary`, `tertiary`, `quaternary` | Neutral emphasis hierarchy and colored foregrounds on ordinary surfaces.                  |
| `on`                                  | `primary`, `secondary`, `tertiary`, `quaternary`                                                  | Contrast foregrounds on the corresponding filled accent background.                       |

### Built-in compatibility baseline

The built-in `sysLit` exports this color baseline. Theme authoring must merge its overrides into the complete `sysLit` tree before calling `tokenize()`; swatch registration does not automatically merge `sys`. See the [token module contract](tokens.md#token-module-contract).

| Family                                | Built-in keys                                                                                     |
| ------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `primary`                             | `default`, `strong`, `heavy`, `subtle`, `film`, `veil`, `mask`                                    |
| `secondary`, `tertiary`, `quaternary` | `default`, `strong`, `heavy`, `subtle`                                                            |
| `neutral`                             | `default`, `strong`, `heavy`, `film`, `veil`, `mask`                                              |
| `outline`                             | `subtle`, `muted`, `faint`                                                                        |
| `tint`                                | `default`, `strong`, `heavy`                                                                      |
| `elevated`                            | `default`, `strong`, `heavy`, `subtle`                                                            |
| `surface`                             | `lowest`, `lower`, `default`, `higher`, `highest`, `alter`                                        |
| `fg`                                  | `strong`, `default`, `subtle`, `muted`, `faint`, `primary`, `secondary`, `tertiary`, `quaternary` |
| `on`                                  | `primary`, `secondary`, `tertiary`, `quaternary`                                                  |
| Direct color leaf                     | `transparent`                                                                                     |

The authoring override dictionary may omit keys supplied by `sysLit`, but the final registered `sys` must include them. The richer accent-family `muted` and `faint` keys above are theme-authored extensions, not built-in guarantees.

### Primary translucency

`primary` and `neutral` provide three fixed-alpha overlays for layering color without inventing component-owned alpha values:

| Token                          | Alpha  | Use                                    |
| ------------------------------ | ------ | -------------------------------------- |
| `primary.film`, `neutral.film` | `0.15` | Light wash                             |
| `primary.veil`, `neutral.veil` | `0.3`  | Noticeable selected or supporting fill |
| `primary.mask`, `neutral.mask` | `0.5`  | Strong overlay or obscuring layer      |

### Translucent state backgrounds

`tint` and `elevated` use the three interaction-state decorators without the edge ladder:

| Token              | Intended use                                         |
| ------------------ | ---------------------------------------------------- |
| `tint.default`     | Resting translucent accent-tinted background.        |
| `tint.strong`      | Hover state for the tint treatment.                  |
| `tint.heavy`       | Active or pressed state for the tint treatment.      |
| `elevated.default` | Resting translucent elevation layer.                 |
| `elevated.strong`  | Hover state for the elevation treatment.             |
| `elevated.heavy`   | Active or pressed state for the elevation treatment. |
| `elevated.subtle`  | Faint layer, such as the hover of an alternate row.  |

A theme may intentionally give hover and active the same value, but it should still provide both semantic state slots.

### Filled button state backgrounds

When a theme replaces a filled button's background, use opaque colors (alpha `1`) for its resting, hover and active states. The native hover/active recipe replaces `background-color`; it does not layer that color over the resting fill. Substituting a translucent `elevated.*` color can therefore expose an accented parent and change the button's apparent color.

For a shared neutral palette, customize `sys.color.neutral.default`, `strong` and `heavy`: the default `cmpt.button.backgroundColor`, `cmpt.button.hover.backgroundColor` and `cmpt.button.active.backgroundColor` consume them respectively. Those three neutral colors are opaque in the built-in baseline; check the resolved alpha of theme overrides in both light and dark modes. For a button-specific treatment, override those existing component tokens with opaque state colors instead. Neutral `film`, `veil` and `mask` remain translucent overlay choices.

Intentionally transparent ghost, blended and overlay treatments keep their transparency contract. The opaque rule applies when replacing a filled surface, not to every button subtype or state layer. Verify the resulting states on ordinary and accented parents so transparency is deliberate.

### Surface elevation

Use the five-level elevation ladder only for `surface`:

```text
lowest
lower
default
higher
highest
alter
```

Meanings:

-   `lowest`: application canvas; apply it to `app` only and let `main` inherit it
-   `lower`: low, recessed, or embedded structural surface
-   `default`: ordinary contained surface
-   `higher`: raised or hovered surface
-   `highest`: topmost floating, dialog, or callout surface
-   `alter`: alternate surface, transparent in the built-in baseline; striped groups pair it with `elevated.subtle` on hover

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

| Token                                                        | Intended use                                                                                                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `fg.strong`                                                  | Highest-emphasis headings, key values, and icons.                                                                                           |
| `fg.default`                                                 | Normal body text and default icons.                                                                                                         |
| `fg.subtle`                                                  | Secondary labels and supporting text.                                                                                                       |
| `fg.muted`                                                   | Tertiary metadata, placeholders, and de-emphasized icons.                                                                                   |
| `fg.faint`                                                   | Least-emphasis, disabled-like, or decorative foreground.                                                                                    |
| `fg.primary`, `fg.secondary`, `fg.tertiary`, `fg.quaternary` | Colored foregrounds derived from the color-set sequence. Use them on ordinary surfaces, not as contrast text on the matching filled accent. |

For readable primary-accented text or icons on an ordinary surface, use `color: var(--jam-color-fg-primary)`. This includes inline references, accent-colored labels and links. `--jam-color-primary-default` is an accent fill token; using it directly as a text color can lose contrast. Apply the same distinction to secondary, tertiary and quaternary accents. Supporting text can use `--jam-color-fg-muted`.

```css
.accent-reference {
    color: var(--jam-color-fg-primary);
}
```

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

## Lumi Levels And Mode Strategy

`lumiO(level, bias?)` is the lightness component that lets one token serve both modes: `4.5% + 2% × level` in light mode and `106.5% − 2% × level` in dark mode. Low levels sit next to the foreground; high levels sit next to the canvas. The [Color System](../color.md#the-lumi-system) owns the formulas and the related `lumiL`, `lumiA` and `acLumiO` helpers.

### Baseline level map

The built-in `sys.color` uses these levels. Start from the same bands so contrast relationships survive in both modes:

| Tokens                                 | Expression                    | Light mode            | Dark mode             |
| -------------------------------------- | ----------------------------- | --------------------- | --------------------- |
| `fg.strong` / `default` / `subtle`     | `lumiO(1)` / `(7)` / `(12)`   | 6.5% / 18.5% / 28.5%  | 100%¹ / 92.5% / 82.5% |
| `fg.muted` / `faint`                   | `lumiO(19)` / `(27)`          | 42.5% / 58.5%         | 68.5% / 52.5%         |
| `tint.*` (alpha 0.15–0.3)²             | `lumiO(28)`                   | 60.5%                 | 50.5%                 |
| `outline.subtle` / `muted` / `faint`   | `lumiO(35)` / `(39)` / `(43)` | 74.5% / 82.5% / 90.5% | 36.5% / 28.5% / 20.5% |
| `surface.highest` … `lowest`           | `lumiO(44)` … `(48)`          | 92.5% … 100%¹         | 18.5% … 10.5%         |
| `neutral.default` / `strong` / `heavy` | `lumiO(46…44, '3%')`          | 99.5% / 97.5% / 95.5% | 17.5% / 19.5% / 21.5% |

¹ CSS clamps the computed 104.5% and 100.5% to 100%. ² `tint.strong` adds a `0.07` bias.

Surfaces use `surfaceToken(level)`, an accent-hued neutral at 1.5% of the accent's saturation, or `hslToken(hue, saturation, lumiO(level))` for a theme-chosen tint. Shadow alpha uses `lumiA(level)`, which is stronger in dark mode. Foregrounds on a filled accent use `acLumiO(level)`, which orients against the fill's own darkness instead of the page mode.

### Choosing levels and bias

-   Keep levels as integers and move a token along its band by changing the level.
-   A bias is an absolute lightness offset with the same sign in both modes. `lumiO(46, 0.02)` is 2% lighter in both modes, which is nearer the canvas in light mode and nearer the foreground in dark mode. Use a bias for a small, mode-neutral nudge. Write it as a number fraction (`0.02`) or a signed percentage (`'+2%'`, `'-3%'`; an unsigned `'3%'` adds); these forms are equivalent. Keep biases additive so CSS colors and chart values resolve the same lightness.
-   When a value must move in the same semantic direction in both modes, change its level. When a value's relationship genuinely differs by mode, put that path in the sparse mode branch.
-   The baseline `fg` levels assume a near-white light canvas. When the theme's canvas sits lower (a tinted or mid-light body at levels around 42–46), move `fg.muted` and `fg.faint` to lower levels and recheck 4.5:1 text contrast against the actual canvas in both modes.

### Swatch colors across modes

A swatch's `accentColor` and `colorSet` are authored for light mode unless the swatch sets `darkMode: true`. In the opposite mode the runtime derives a counterpart by shifting OKLCH lightness: 0.18 for the accent and 0.09 for color-set entries. A light-authored color becomes darker in dark mode; a dark-authored color (`darkMode: true`) becomes lighter in light mode. The shift is clamped, so an already bright dark-authored color can reach white and lose its hue. Author sources at mid lightness, check accent fills and their `on.*` foregrounds in both modes, and check each swatch separately: at equal lightness a saturated green or yellow is far more luminous than a blue.

A design whose look depends on exact lightness in both modes can take only hue and saturation from the swatch and give lightness to lumi, for example `acToken(1, 1, lumiOPart(level))`, so the swatch shift does not apply to those tokens.

### Semantic status colors

`success`, `warn`, `error` and `info` (and their aliases `pass`, `warning`, `danger`, `fail`, `normal`) are derived from the active color set rather than fixed values. `success`, `warn` and `error` start from hue anchors 150°, 48° and 0°; when a color-set entry lies within 15° of an anchor, its hue is used instead. Their lightness and chroma follow the first color-set entry. `info` is the first entry's lightness at a quarter of its chroma, at hue 210°. To steer status colors, include color-set entries near those anchors; in a single-hue palette, separate statuses with treatment as well as color.

Colored text such as `fg.primary` and colored tags and indicator values comes from a readable variant the runtime derives from each color (`--jam-ac-text`, `--jam-ac-text-01` …). It is not a token: tune colored text in theme recipes through `fg.*` and `colorTextToken(level)`, and choose swatch colors that keep the derived variant readable on the theme's canvas.

### Mode strategy

1. Author one adaptive `sys` tree with lumi expressions. This is the normal case and serves both modes.
2. Add a single sparse `dark` or `light` branch for the paths whose relationship changes by mode, as described in [Mode-Specific Overrides](./tokens.md#mode-specific-overrides). A theme whose identity is designed for one mode usually authors its root for that mode and lists its exceptions in the other branch.
3. Use fixed literal colors only for values that must stay identical in both modes, such as a white gloss highlight over an accent fill. Check them against both modes' surfaces. `on.*` foregrounds orient against the fill, not a gloss layered over it, so keep gloss stops translucent and confirm text contrast against the gloss's lightest stop in both modes; add a text shadow from `textShadow.onPrimary` when a bright stop sits behind text.
4. Set `swatch.darkMode` only when a swatch should also request a body mode.

## Context And Ownership Rules

Theme color is selected by usage and background context, not by element or role identity. This restriction includes borders, outlines, and separators as well as text, icons, and fills.

Use this order:

1. Tune the semantic `sys.color` families. This should cover most of a theme.
2. Override an existing component seam only when the native recipe consumes it. Table/header colors and the [filled button state backgrounds](#filled-button-state-backgrounds) have existing seams; checked-state customization must still cover its intended subtype/state matrix.
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
