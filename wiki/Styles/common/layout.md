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

Auto-fill grid — columns auto-wrap based on available width.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layout.autogrid`.

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["layout.autogrid(repeat:3;width:10rem)"]
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

Auto-aligns child items with consistent spacing. Stacks vertically. If the container is a `wrapper`, also applies `alignlabel` for form-like label alignment.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layout.autoalign`.

Use `afterAlign` for work that depends on completed alignment.

```json jaml-playground
[
    {
        "type": "wrapper",
        "cap": "Form",
        "styles": ["layout.autoalign"],
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

> **Form pattern:** For forms, use `layout.autoalign` + `layout.alignlabel` together on the form wrapper. `autoalign` stacks fields vertically, `alignlabel` aligns their labels.

### `layout.autoheight`

Auto-sets element height via `jam-autoheight` attribute. No args.

### `layout.takeupspace`

Fills remaining space in a flex/grid layout via `layout-takeupspace` class. No args.

### `layout.odd`

Targets odd-indexed children with `.odd` class. No args.

### `layout.even`

Targets even-indexed children with `.even` class. No args.

### `layout.labelAtTop`

Places the label above the content instead of inline via `child-label-attop` class. No args.

```json jaml-playground
[
    {
        "type": "input",
        "cap": "Name",
        "styles": ["layout.labelAtTop"]
    }
]
```

### `layout.able`

Configurable card layout via a config object.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layout.able`.

### `layout.overflow`

Overflow control with animation-aware delay.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layout.overflow`.

Keep the overflow animation delay at least as long as the child animation duration.

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
  styles: ['layout.autoalign'],
  components: [
    { type: 'input', cap: 'Name', defaultValue: '' },
    { type: 'input', cap: 'Email', defaultValue: '' },
    { type: 'button-cta', cap: 'Submit' }
  ]
}
```
