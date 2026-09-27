# Layer styles

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
