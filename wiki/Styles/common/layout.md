# common.layout

`Styles.layout.*` — CSS layout properties and layout helpers.

---

## Variants

### `layout`

Base layout properties.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layout`.

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["layout(display:flex;gap:1rem)"]
    }
]
```

### `layout.basic`

Adds `jam-layout` CSS class for basic layout styling. No args.

### `layout.grid`

CSS grid with explicit row/column counts.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layout.grid`.

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["layout.grid(rows:2;cols:3;gap:0.5rem)"]
    }
]
```

### `layout.autogrid`

Auto-fill grid — columns auto-wrap based on available width. A numeric `repeat` selects a fixed column count instead.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layout.autogrid`.

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["layout.autogrid(width:10rem)"]
    }
]
```

### `layout.gridpos`

Position a child within a parent grid.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layout.gridpos`.

### `layout.gridsize`

Set grid child size via row/column span.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layout.gridsize`.

### `layout.flex`

Flexbox container. Combines flex and align args.

Accepts all args from [flex](./flex.md) and [align](./align.md).

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["layout.flex(direction:row;gap:1rem;alignItems:center)"]
    }
]
```

### `layout.autoalign`

Measures wrapped rows and assigns shared grid tracks. Compose `layout.alignlabel` explicitly when field labels should align; use `layout.flex(direction:column)` for vertical stacking.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layout.autoalign`.

Use `afterAlign` for work that depends on completed alignment.

```json jaml-playground
[
    {
        "type": "wrapper",
        "cap": "Form",
        "styles": ["layout.autoalign", "layout.alignlabel"],
        "components": [
            { "type": "input", "cap": "Name" },
            { "type": "input", "cap": "Email" }
        ]
    }
]
```

### `layout.alignlabel`

Aligns labels with form inputs for consistent left edges. Listens to `resize` events and adjusts label widths.

No args.

> **Form pattern:** For forms, use `layout.autoalign` + `layout.alignlabel` together on the form wrapper. `autoalign` measures wrapped rows and assigns shared grid tracks; `alignlabel` aligns their labels. Choose `layout.flex` with an explicit column direction when vertical stacking is the requirement.

### `layout.autoheight`

Adds `jam-autoheight`. When a resize gesture ends, the native resize helper resets the resized element’s height to `auto` if the element or a descendant has this marker. It does not continuously measure content.

### `layout.takeupspace`

Adds the legacy `jam-layout-takeupspace` marker. It does not implement remaining-space sizing in this baseline; use explicit flex/grid sizing.

### `layout.odd`

Styles descendants whose existing `jam-pos` markers contain `odd`. It does not create those render-position markers.

### `layout.even`

Styles descendants whose existing `jam-pos` markers contain `even`. It does not create those render-position markers.

### `layout.labelAtTop`

Adds the legacy `jam-child-label-attop` marker without a native positioning consumer in this baseline. Apply `label.atTop` to the actual native field elements.

```json jaml-playground
[
    {
        "type": "input",
        "cap": "Name",
        "styles": ["label.atTop"]
    }
]
```

### `layout.able`

Configurable card layout via a config object.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layout.able`.

### `layout.overflow`

Overflow control with animation-aware delay.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layout.overflow`.

`animaDelay` starts after a bubbling `animationend`, rather than measuring the animation from mount. Mount adds temporary clipping; each end event restarts the delay. Teardown removes its listeners and any clipping marker it introduced, preserves a pre-existing marker, and makes queued debounce work inert. Without an end event clipping can remain while the style is active.

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["layout.overflow(hidden)", "layout.overflow(animaDelay:400)"]
    }
]
```

### `layout.keep.size`

Persists element size across re-renders. Sub-variants:

-   **`layout.keep.height`** — persist height only
-   **`layout.keep.width`** — persist width only

No args.

### `layout.navigator`

Responsive navigation helper. When a child `jam-buttongroup` overflows vertically, it moves the group into a popup opened by a burger button. When space returns, the group is restored inline.

No args.

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["layout.navigator", "css(height:3rem;overflow:hidden)"],
        "components": [
            {
                "type": "buttongroup-radio",
                "data": [
                    { "name": "Overview", "value": "overview" },
                    { "name": "Reports", "value": "reports" },
                    { "name": "Settings", "value": "settings" }
                ]
            }
        ]
    }
]
```

### `layout.subgrid`

Marks a container as a subgrid list and sets the number of subgrid columns.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layout.subgrid`.

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["layout.subgrid(3)"],
        "components": [
            { "type": "label", "cap": "A" },
            { "type": "label", "cap": "B" },
            { "type": "label", "cap": "C" }
        ]
    }
]
```

---

## Usage

```javascript jaml-playground
export default {
  type: 'wrapper',
  cap: 'Form',
  styles: ['layout.autoalign', 'layout.alignlabel'],
  components: [
    { type: 'input', cap: 'Name', defaultValue: '' },
    { type: 'input', cap: 'Email', defaultValue: '' },
    { type: 'button-cta', cap: 'Submit' }
  ]
}
```
