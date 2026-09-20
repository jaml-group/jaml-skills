# Layer styles

Layer styles insert a DOM node into the element's shadow root `<slot name="layer">`. This slot renders **below** the element's own content, so layers act as backgrounds, decorations, or visual effects that sit behind the foreground UI.

---

## How layers work

Each `layer.*` style creates one or more DOM elements and appends them with `slot="layer"`. The element's shadow DOM template includes a `<slot name="layer">` positioned at the stacking bottom. Anything in that slot paints behind the element's text, icons, labels, and interactive children.

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

Layer plugins often need to know the host's dimensions. Always place sizing and spacing styles **before** the layer:

```
correct:   ['css(width:20rem;height:20rem)', 'layer.spinner.wave']
wrong:     ['layer.spinner.wave', 'css(width:20rem;height:20rem)']
```

Similarly, `padding` and `margin` should come before the layer so the layer fills the intended area.

### 3. Put layers at the end of the style stack

Since layers are visual backdrops, they should come after all structural styles (`layout.*`, `size.*`, `padding.*`, `margin.*`) but before interaction styles (`interact.*`, `hover.*`) if those affect the foreground:

```
recommended order:
  size / padding / margin  →  layout  →  colors / backgrounds  →  layer  →  interact
```

### 4. Square target for circular effects

`layer.spinner.*` and `layer.scroller.*` render circular, radial effects. If the host is not square, they stretch into an ellipse. Use equal `width` and `height`:

```json
{ "styles": ["css(width:10rem;height:10rem)", "layer.spinner.wave"] }
```

---

## Layer reference

15 layer style groups:

| Group | Doc | Description |
|---|---|---|
| `layer.spinner.*` | [spinner](./spinner.md) | Animated spinner/loader effects |
| `layer.scroller.*` | [scroller](./scroller.md) | Auto-scrolling background patterns |
| `layer.canvas.*` | [canvas](./canvas.md) | Canvas particle system |
| `layer.follower.*` | [follower](./follower.md) | Cursor-following decorative effects (spotlight, glow, shadow) |
| `layer.loader.*` | [loader](./loader.md) | Full-screen loading overlay |
| `layer.glare.*` | [glare](./glare.md) | Light glare and reflections |
| `layer.watermark.*` | [watermark](./watermark.md) | Watermark and icon overlays |
| `layer.ribbon.*` | [ribbon](./ribbon.md) | Corner ribbon decorations |
| `layer.combo.*` | [combo](./combo.md) | Composite spinner/masked combos |
| `layer.chart` | [chart](./chart.md) | ECharts integration layer |
| `layer.background` | [background](./background.md) | Background layer |
| `layer.border` | [border](./border.md) | Border layer |
| `layer.css` | [css](./css.md) | Arbitrary CSS layer |
| `layer.crosshair` | [crosshair](./crosshair.md) | Mouse-following crosshair |
| `layer.overlay` | [overlay](./overlay.md) | Content overlay layer |
