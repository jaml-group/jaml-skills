# common.color

<!-- Generated from native authoring; do not edit. -->

[中文](color.zh.md)

`Styles.color.*` — semantic foreground colors and HSL color adjustments.

---

## Variants

### `color`

<a id="entry-color"></a>

Color

Set foreground color for the target selected by the path.

Forwards color and optional channel arguments through the path-dependent styling method.

Use semantic color presets for theme-following foreground roles; color.accent at the root has a separate color-profile contract.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand<br>`{"cssKey":"color"}` |

Adjusts an element's color via hue shift, saturation, lightness, and alpha multipliers.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Tinted',
        styles: ['color(h:30;s:1.2;l:1.1)']
    }
];
```

### Semantic foreground presets

These no-argument paths set `color` from the active theme rather than binding the element to a literal color.

| Path               | Color token                 | Description                    |
| ------------------ | --------------------------- | ------------------------------ |
| `color.default`    | `--jam-color-fg-default`    | Default foreground             |
| `color.strong`     | `--jam-color-fg-strong`     | Strong foreground              |
| `color.subtle`     | `--jam-color-fg-subtle`     | Subtle foreground              |
| `color.muted`      | `--jam-color-fg-muted`      | Muted foreground               |
| `color.faint`      | `--jam-color-fg-faint`      | Faint foreground               |
| `color.primary`    | `--jam-color-fg-primary`    | Primary semantic foreground    |
| `color.secondary`  | `--jam-color-fg-secondary`  | Secondary semantic foreground  |
| `color.tertiary`   | `--jam-color-fg-tertiary`   | Tertiary semantic foreground   |
| `color.quaternary` | `--jam-color-fg-quaternary` | Quaternary semantic foreground |

`color.primary`, `color.secondary`, `color.tertiary`, and `color.quaternary` also add the `.jam-colored` marker so parent role recipes do not overwrite the explicit semantic foreground.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Theme-aware emphasis',
        styles: ['color.strong']
    }
];
```

### Contrast foreground presets

The `color.on.*` namespace supplies foregrounds designed for the matching colored background. These are distinct from `color.primary|secondary|tertiary|quaternary`, which use the `fg.*` family on ordinary surfaces. `color.on` itself is a namespace and is not callable.

| Path                  | Color token                 | Intended background     |
| --------------------- | --------------------------- | ----------------------- |
| `color.on.primary`    | `--jam-color-on-primary`    | `background.primary`    |
| `color.on.secondary`  | `--jam-color-on-secondary`  | `background.secondary`  |
| `color.on.tertiary`   | `--jam-color-on-tertiary`   | `background.tertiary`   |
| `color.on.quaternary` | `--jam-color-on-quaternary` | `background.quaternary` |

These dotted names are native style paths. Inside compact CSS, use the corresponding undotted values: `css(color:onprimary)`, `css(color:onsecondary)`, `css(color:ontertiary)`, and `css(color:onquaternary)`.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['background.primary', 'color.on.primary'],
        components: [{ type: 'label', cap: 'On primary' }]
    }
];
```

### `accent`

<a id="entry-color-accent"></a>

Accent color

Set a local accent for a component or plain host.

Uses the supplied color or generates one from the accent arguments; sets AbstractElement.color or applies accent variables directly, and clears that accent on removal.

Prefer semantic theme colors for shared meaning; use a registered palette when the accent comes from reusable business data.

Positional order: `color` → `h` → `s` → `l` → `temp` → `bias` → `seq`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `color` | `string` | Not supplied | Color<br>Shorthand |
| `h` | `number` | Not supplied | Hue |
| `s` | `number` | Not supplied | Saturation |
| `l` | `number` | Not supplied | Lightness |
| `temp` | `string` | Not supplied | Color temperature<br>Options: `warm` — Warm colors, `cool` — Cool colors |
| `bias` | `number` | Not supplied | Offset |
| `seq` | `boolean` | `false` | Sequence |

Sets the accent color on an element (supports AbstractElement color system).

```javascript jaml-playground
export default [
    {
        type: 'button',
        cap: 'Accented',
        styles: ['color.accent(color:#ff6600)']
    }
];
```

### `syncWithMap`

<a id="entry-color-syncwithmap"></a>

Synchronize with map color

Match a map annotation accent to its containing region.

Finds the nearest jam-map, waits for draw readiness, resolves jam-coord against geo regions and applies that region areaColor without transparency.

Requires a map ancestor, a matching region name and an areaColor.

Unmount, style teardown or host destruction invalidates pending draw-readiness work and removes the accent only if this setup applied one. If the style remains installed, remount performs a fresh lookup.

This is a mount-time lookup, not a subscription to later map recoloring.

After draw readiness resolves on the nearest parent `jam-map`, matches the element’s `jam-coord` to a region and applies its `itemStyle.areaColor` at full opacity. This is a lookup for each mount, not a subscription to recoloring. Unmount or teardown invalidates pending readiness work and removes the accent only if this setup applied one. No args.

### `valueMap`

<a id="entry-color-valuemap"></a>

Value mapping

Encode a numeric value as an accent along a color scale.

On valuechange and initial application, normalizes the host value against valueRange and evaluates a Chroma scale built from colorRange in the selected mode.

Supply numeric values and a nonzero range; keep the color palette meaningful for the data.

Positional order: `valueRange` → `colorRange` → `mode`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `valueRange` | `array` | `[0,100]` | Value range |
| `colorRange` | `array` | `["red","green"]` | Color range |
| `mode` | `string` | `lch` | Mode<br>Options: `rgb`, `lch`, `hsl`, `lab`, `lrgb` |

Maps input values to colors on a scale.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Mapped',
        styles: ['color.valueMap(valueRange:[0,100];colorRange:[red,green];mode:lch)']
    }
];
```

### `stateMap`

<a id="entry-color-statemap"></a>

State mapping

Map discrete element states to accent colors.

On statechange and initial application, applies the adjusted color when the current state is a key in colors.

An unmapped state leaves the current accent unchanged. The harmony argument is declared but not read by this callback.

Positional order: `colors` → `harmony`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `colors` | `dictionary` | Not supplied | Color mapping<br>Shorthand |
| `harmony` | `boolean` | `true` | Color harmony |

Maps element state to accent colors.

```javascript jaml-playground
export default {
    type: 'indicator',
    cap: 'Score',
    value: 72,
    valueStates: {
        pass: 'value >= 60',
        failed: 'value < 60'
    },
    styles: ["color.stateMap({colors:{pass:'green',failed:'red'}})"]
};
```

`valueStates` derives `pass` or `failed`; `color.stateMap` listens for that state and applies the corresponding accent color. Define every reachable state in the color map so an unmapped state does not retain the previous accent.

## `color.faint`

<a id="entry-color-faint"></a>

Faint color

Use the theme faint foreground role.

Sets color from sys.color.fg.faint.

Use foreground roles with an appropriate surface; a foreground preset does not paint its background.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `color.muted`

<a id="entry-color-muted"></a>

Muted color

Use the theme muted foreground role.

Sets color from sys.color.fg.muted.

Use foreground roles with an appropriate surface; a foreground preset does not paint its background.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `color.strong`

<a id="entry-color-strong"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `color.subtle`

<a id="entry-color-subtle"></a>

Secondary color

Choose a subdued foreground or secondary semantic foreground according to the path.

color.subtle uses the subtle foreground token; color.secondary uses the secondary foreground token and adds the colored class.

Use subtle for a foreground emphasis level and secondary for a semantic color role; they are not aliases.

## `color.default`

<a id="entry-color-default"></a>

Default color

Use the theme default foreground role.

Sets color from sys.color.fg.default.

Use foreground roles with an appropriate surface; a foreground preset does not paint its background.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `color.primary`

<a id="entry-color-primary"></a>

Accent color

Apply the primary foreground, accent surface, or accent-context text treatment named by the full path.

color.primary sets the primary foreground token and colored class; with.accent adds the accent-background class, which supplies a surface and matching foreground on supported hosts; on.accent applies accent-context text variables.

Use color.primary for foreground emphasis, with.accent for a filled control or surface, and on.accent when content sits on an existing accent surface.

These paths share metadata but are not interchangeable and do not redefine theme tokens.

## `color.tertiary`

<a id="entry-color-tertiary"></a>

Tertiary color

Use the theme tertiary foreground role.

Sets color from sys.color.fg.tertiary and adds the colored class.

Use foreground roles with an appropriate surface; a foreground preset does not paint its background.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `color.secondary`

<a id="entry-color-secondary"></a>

Secondary color

Choose a subdued foreground or secondary semantic foreground according to the path.

color.subtle uses the subtle foreground token; color.secondary uses the secondary foreground token and adds the colored class.

Use subtle for a foreground emphasis level and secondary for a semantic color role; they are not aliases.

## `color.quaternary`

<a id="entry-color-quaternary"></a>

Quaternary color

Use the theme quaternary foreground role.

Sets color from sys.color.fg.quaternary and adds the colored class.

Use foreground roles with an appropriate surface; a foreground preset does not paint its background.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `color.on.primary`

<a id="entry-color-on-primary"></a>

Foreground color on primary

Choose a foreground intended for the primary surface role.

Sets color from sys.color.on.primary.

Pair with background.primary or an equivalent theme role; this foreground preset does not create that surface.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `color.on.tertiary`

<a id="entry-color-on-tertiary"></a>

Foreground color on tertiary

Choose a foreground intended for the tertiary surface role.

Sets color from sys.color.on.tertiary.

Pair with background.tertiary or an equivalent theme role; this foreground preset does not create that surface.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `color.on.secondary`

<a id="entry-color-on-secondary"></a>

Foreground color on secondary

Choose a foreground intended for the secondary surface role.

Sets color from sys.color.on.secondary.

Pair with background.secondary or an equivalent theme role; this foreground preset does not create that surface.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `color.on.quaternary`

<a id="entry-color-on-quaternary"></a>

Foreground color on quaternary

Choose a foreground intended for the quaternary surface role.

Sets color from sys.color.on.quaternary.

Pair with background.quaternary or an equivalent theme role; this foreground preset does not create that surface.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.
