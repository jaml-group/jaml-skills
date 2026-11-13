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

## `layer.glow`

<a id="entry-layer-glow"></a>

Glow edge

Light a shaped surface's edge from both sides, as a neon rim.

Adds a full-size, pointer-transparent layer at zIndex 0. The outer layer applies drop-shadow(offsetX offsetY blur color) after any common filter and dropShadow effects. The default inner spans clip the fill (transparent by default) to the shape and the stroke (accent by default) to the ring. A custom content value replaces both spans.

Give the host position:relative. Use Styles.shape(...) or Styles.shape.chamfer(...) to publish --jam-shape, or pass shape directly. A chamfer also publishes --jam-shape-ring. Pass ring to supply your own stroke outline.

Pair with Styles.shape.chamfer for cut-corner panels. The host carries no filter, so a backdrop layer clipped to var(--jam-shape) with backdrop-filter keeps blurring what lies behind the host.

Keep the host and edge layer unclipped for an exterior glow. On a free shape with no ring, the glow comes only from the painted fill. The default transparent fill leaves the effect invisible.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `shape` → `ring` → `fill` → `stroke` → `color` → `blur` → `offsetX` → `offsetY`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `zIndex` | `number` | `0` |  |
| `dropShadow` | `boolean` | `false` |  |
| `boxShadow` | `string` | Not supplied |  |
| `mask` | `string` | Not supplied |  |
| `filter` | `string` | Not supplied |  |
| `padding` | `string` | Not supplied |  |
| `borderRadius` | `string` | Not supplied |  |
| `transform` | `string` | Not supplied |  |
| `border` | `string` | Not supplied |  |
| `clipPath` | `string` | Not supplied |  |
| `animation` | `string` | Not supplied |  |
| `opacity` | `number` | Not supplied |  |
| `css` | `dictionaryOrString` | Not supplied |  |
| `depth` | `number` | Not supplied |  |
| `class` | `string` | Not supplied |  |
| `attrs` | `dictionary` | Not supplied |  |
| `rotateX` | `number` | Not supplied |  |
| `rotateY` | `number` | Not supplied |  |
| `translateY` | `numberOrString` | Not supplied |  |
| `slot` | `string` | Not supplied |  |
| `content` | `any` | `<span class="jam-edge-fill" style="position:absolute;inset:0;clip-path:var(--jam-edge-shape);background:var(--jam-edge-fill)"></span><span class="jam-edge-ring" style="position:absolute;inset:0;clip-path:var(--jam-edge-ring);background:var(--jam-edge-stroke)"></span>` |  |
| `entryAnimation` | `string` | `fade-in 200ms ease-in-out both` |  |
| `exitAnimation` | `string` | `fade-out 200ms ease-in-out both` |  |
| `shape` | `string` | `var(--jam-shape, none)` | Shape: the clip-path the fill follows; defaults to the host's --jam-shape |
| `ring` | `string` | `var(--jam-shape-ring, polygon(0 0, 0 0, 0 0))` | Ring: the clip-path the stroke follows; defaults to the host's --jam-shape-ring |
| `fill` | `string` | `transparent` | Fill color inside the shape |
| `stroke` | `string` | `var(--jam-ac-color)` | Stroke color of the ring |
| `color` | `string` | `hsla(var(--jam-ac-h), var(--jam-ac-s), var(--jam-ac-l), 0.45)` | Glow or shadow color |
| `blur` | `string` | `0.5rem` | Blur radius of the glow or shadow |
| `offsetX` | `string` | `0rem` | Horizontal shadow offset |
| `offsetY` | `string` | `0rem` | Vertical shadow offset |

## `layer.shade`

<a id="entry-layer-shade"></a>

Shaped shadow

Cast a soft shadow from a shaped surface, such as a blob modal or a cut-corner card.

Adds a full-size, pointer-transparent layer at zIndex -1. The outer layer applies drop-shadow(offsetX offsetY blur color) after any common filter and dropShadow effects. The default inner spans paint the shape with fill (the surface color by default) and draw the ring with an optional stroke. A custom content value replaces both spans.

Give the host position:relative. Use Styles.shape(...) or Styles.shape.chamfer(...) to publish --jam-shape, or pass shape directly. A chamfer also publishes --jam-shape-ring. Pass ring to supply your own stroke outline.

Use with Styles.shape({ path, box: true }) for a shape that scales with the host, or with Styles.shape.chamfer. Leave the host unclipped so the shadow outside the shape stays visible.

Keep the host and edge layer unclipped for an exterior shadow. On a free shape with no ring, shade paints a filled silhouette and casts the shadow from that fill.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `shape` → `ring` → `fill` → `stroke` → `color` → `blur` → `offsetX` → `offsetY`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `zIndex` | `number` | `-1` |  |
| `dropShadow` | `boolean` | `false` |  |
| `boxShadow` | `string` | Not supplied |  |
| `mask` | `string` | Not supplied |  |
| `filter` | `string` | Not supplied |  |
| `padding` | `string` | Not supplied |  |
| `borderRadius` | `string` | Not supplied |  |
| `transform` | `string` | Not supplied |  |
| `border` | `string` | Not supplied |  |
| `clipPath` | `string` | Not supplied |  |
| `animation` | `string` | Not supplied |  |
| `opacity` | `number` | Not supplied |  |
| `css` | `dictionaryOrString` | Not supplied |  |
| `depth` | `number` | Not supplied |  |
| `class` | `string` | Not supplied |  |
| `attrs` | `dictionary` | Not supplied |  |
| `rotateX` | `number` | Not supplied |  |
| `rotateY` | `number` | Not supplied |  |
| `translateY` | `numberOrString` | Not supplied |  |
| `slot` | `string` | Not supplied |  |
| `content` | `any` | `<span class="jam-edge-fill" style="position:absolute;inset:0;clip-path:var(--jam-edge-shape);background:var(--jam-edge-fill)"></span><span class="jam-edge-ring" style="position:absolute;inset:0;clip-path:var(--jam-edge-ring);background:var(--jam-edge-stroke)"></span>` |  |
| `entryAnimation` | `string` | `fade-in 200ms ease-in-out both` |  |
| `exitAnimation` | `string` | `fade-out 200ms ease-in-out both` |  |
| `shape` | `string` | `var(--jam-shape, none)` | Shape: the clip-path the fill follows; defaults to the host's --jam-shape |
| `ring` | `string` | `var(--jam-shape-ring, polygon(0 0, 0 0, 0 0))` | Ring: the clip-path the stroke follows; defaults to the host's --jam-shape-ring |
| `fill` | `string` | `var(--jam-color-surface-default)` | Fill color inside the shape |
| `stroke` | `string` | `transparent` | Stroke color of the ring |
| `color` | `string` | `hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 0.5), 10%, calc(var(--jam-lumi-a-base) + var(--jam-lumi-a-dev) * 24))` | Glow or shadow color |
| `blur` | `string` | `1rem` | Blur radius of the glow or shadow |
| `offsetX` | `string` | `0rem` | Horizontal shadow offset |
| `offsetY` | `string` | `0.375rem` | Vertical shadow offset |

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
