# Layer styles

<!-- Generated from native authoring; do not edit. -->

[中文](layer.zh.md)

Layer styles append children to the host element, usually with `slot="layer"`, and project them through its shadow layer slot. Geometry and stacking depend on the variant and `zIndex`; the slot alone does not place every layer behind foreground content.

---

## How layers work

Layer nodes belong to the host's light DOM; the shadow slot controls where they are projected. Choose a background, overlay, border or other layer according to the effect and its stacking contract.

Background-layer example:

```
┌─────────────────────────────┐
│  <slot name="layer">         │  ← layer DOM nodes render here
│    [spinner / canvas / ...]  │
│  </slot>                     │
│                              │
│  main content                │  ← cap, icon, value, children
│  (renders on top)            │
└─────────────────────────────┘
```

---

## Rules

### 1. Host needs non-static positioning

Most layer elements are **absolute-positioned**. The host element must have a positioned context — `position: relative` (recommended) or `position: absolute`. Without it, the layer collapses to `0×0` or positions against an unintended ancestor.

```json
{
  "type": "wrapper",
  "styles": [
    "css(position:relative;width:20rem;height:10rem)",
    "layer.canvas.particles(countRange:[20,40])"
  ]
}
```

### 2. Order: size first, layer last

For layers that measure the host when applied, establish sizing and spacing first. This is useful composition order, not a universal ordering requirement:

```
['css(width:20rem;height:20rem)', 'layer.spinner.wave']
```

Set the intended host dimensions explicitly when the effect needs a stable drawing area.

### 3. Keep structural and decorative intent clear

A readable composition can group structural styles before decorative layers and interaction styles. This ordering does not determine paint order; the layer variant and its stacking properties do:

```
recommended order:
  size / padding / margin  →  layout  →  colors / backgrounds  →  layer  →  interact
```

### 4. Square target for circular effects

Use equal `width` and `height` for circular spinner effects when a round result is intended. Scroller patterns can use rectangular hosts:

```json
{ "styles": ["css(width:10rem;height:10rem)", "layer.spinner.wave"] }
```

---

## Layer reference

Layer styles and loading guidance:

| Group               | Doc                           | Description                                                   |
| ------------------- | ----------------------------- | ------------------------------------------------------------- |
| `layer.spinner.*`   | [spinner](./spinner.md)       | Animated spinner/loader effects                               |
| `layer.scroller.*`  | [scroller](./scroller.md)     | Auto-scrolling background patterns                            |
| `layer.canvas.*`    | [canvas](./canvas.md)         | Canvas particle system                                        |
| `layer.follower.*`  | [follower](./follower.md)     | Cursor-following decorative effects (spotlight, glow, shadow) |
| Loading indicators  | [loader](./loader.md)         | Use public spinner layers; the application owns loading state |
| `layer.glare.*`     | [glare](./glare.md)           | Light glare and reflections                                   |
| `layer.watermark.*` | [watermark](./watermark.md)   | Watermark and icon overlays                                   |
| `layer.ribbon.*`    | [ribbon](./ribbon.md)         | Corner ribbon decorations                                     |
| `layer.combo.*`     | [combo](./combo.md)           | Composite spinner/masked combos                               |
| `layer.chart`       | [chart](./chart.md)           | ECharts integration layer                                     |
| `layer.background`  | [background](./background.md) | Background layer                                              |
| `layer.border`      | [border](./border.md)         | Border layer                                                  |
| `layer.css`         | [css](./css.md)               | Arbitrary CSS layer                                           |
| `layer.crosshair`   | [crosshair](./crosshair.md)   | Crosshair locator anchored to the host                        |
| `layer.overlay`     | [overlay](./overlay.md)       | Content overlay layer                                         |

## `layer.progress`

<a id="entry-layer-progress"></a>

Progress layer

Show actual progress as a translucent fill over a host.

Creates a native progress element in the layer slot with the configured value and indeterminate mode. The base form uses the configured inset to cover the host. A vertical style can change the fill direction.

Provide a host with usable geometry and update value or indeterminate from application state. Values follow the progress element contract: numeric fractions or percentage strings.

Stores the created progress child and destroys it on plugin teardown, clearing both host and child plugin data.

Use for measured or indeterminate progress tied to application work; choose decorative spinner layers when no progress value is represented. styles customizes the created progress child.

The layer does not discover pending work or update its own value. Indeterminate mode preserves the stored value for use when determinate mode resumes.

Positional order: `value` → `indeterminate` → `vertical` → `inset` → `opacity` → `color` → `styles`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `value` | `numberOrString` | `0` | Progress |
| `indeterminate` | `boolean` | `false` | Indeterminate progress |
| `vertical` | `boolean` | `false` | Vertical |
| `inset` | `string` | `0` | Inset |
| `opacity` | `number` | `0.25` | Opacity |
| `color` | `string` | Not supplied | Color |
| `styles` | `array` | `[]` | Progress bar styles |

## `layer.progress.bar`

<a id="entry-layer-progress-bar"></a>

Bottom progress bar

Show actual progress as a thin bar along the bottom of a host.

Creates a native progress element in the layer slot with the configured value and indeterminate mode. The bar form sets a fixed height and bottom alignment. A vertical style can change the fill direction.

Provide a host with usable geometry and update value or indeterminate from application state. Values follow the progress element contract: numeric fractions or percentage strings.

Stores the created progress child and destroys it on plugin teardown, clearing both host and child plugin data.

Use for measured or indeterminate progress tied to application work; choose decorative spinner layers when no progress value is represented. styles customizes the created progress child.

The layer does not discover pending work or update its own value. Indeterminate mode preserves the stored value for use when determinate mode resumes.

Positional order: `value` → `indeterminate` → `vertical` → `inset` → `opacity` → `color` → `styles` → `height`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `value` | `numberOrString` | `0` | Progress |
| `indeterminate` | `boolean` | `false` | Indeterminate progress |
| `vertical` | `boolean` | `false` | Vertical |
| `inset` | `string` | `0` | Inset |
| `opacity` | `number` | `1` | Opacity |
| `color` | `string` | Not supplied | Color |
| `styles` | `array` | `[]` | Progress bar styles |
| `height` | `string` | `0.25rem` | Height |
