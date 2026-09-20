# common.layout

`Styles.layout.*` — CSS layout properties and layout helpers.

---

## Variants

### `layout`
Base layout properties.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `display` | `string` | CSS display value | `flex`, `grid`, `block`, `inline`, `none` |
| `position` | `string` | CSS position value | `relative`, `absolute`, `fixed`, `sticky` |
| `order` | `number` | Flex/grid item order | — |
| `overflow` | `string` | CSS overflow | `hidden`, `auto`, `scroll`, `visible` |
| `gap` | `number \| string` | Gap between children | — |
| `zIndex` | `number` | Stacking order | — |
| `boxSizing` | `string` | Box model | `border-box`, `content-box` |
| `transform` | `string` | CSS transform | — |
| `transition` | `string` | CSS transition | — |

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

| Arg | Type | Description | Notes |
|---|---|---|---|
| `rows` | `number \| string` | Row count or template | — |
| `cols` | `number \| string` | Column count or template | — |
| `gap` | `number \| string` | Grid gap | — |
| `padding` | `number \| string` | Grid padding | — |
| `size` | `array` | Shorthand `[rows, cols]` | Shorthand arg |
| `withHeader` | `boolean` | Add header-aware grid class | Default: `false` |

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

| Arg | Type | Description | Notes |
|---|---|---|---|
| `repeat` | `number \| string` | Repeat pattern | Default: `'auto-fill'` |
| `withHeader` | `boolean` | Add header-aware grid class | Default: `false` |
| `width` | `string` | Column width | From `sizeArgs` |
| `height` | `string` | Row height | From `sizeArgs` |
| `minWidth` | `string` | Minimum column width | From `sizeArgs` |
| `maxWidth` | `string` | Maximum column width | From `sizeArgs` |

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

| Arg | Type | Description | Notes |
|---|---|---|---|
| `left` | `number \| string` | Column start position | — |
| `top` | `number \| string` | Row start position | — |
| `width` | `number \| string` | Column span | — |
| `height` | `number \| string` | Row span | — |

### `layout.gridsize`
Set grid child size via row/column span.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `width` | `number \| string` | Column span | Default: `1` |
| `height` | `number \| string` | Row span | Default: `1` |

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

| Arg | Type | Description | Notes |
|---|---|---|---|
| `afterAlign` | `function \| string` | Callback after alignment completes | Shorthand arg |
| `scaledRows` | `boolean` | Scale rows to fill available space | Default: `true` |

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

| Arg | Type | Description | Notes |
|---|---|---|---|
| `config` | `object` | Layout config `{ size: [cols, rows], gap, cards: [...] }` | — |

### `layout.overflow`
Overflow control with animation-aware delay.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `all` | `string` | Shorthand for both x and y | Options: `auto`, `hidden`, `visible`, `scroll`, `clip` |
| `x` | `string` | Horizontal overflow | Default: `'auto'`. Same options as `all` |
| `y` | `string` | Vertical overflow | Default: `'auto'`. Same options as `all` |
| `animaDelay` | `number` | Delay before showing overflow (ms) | Should be ≥ child animation duration |

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

- **`layout.keep.height`** — persist height only
- **`layout.keep.width`** — persist width only

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

| Arg | Type | Description | Notes |
|---|---|---|---|
| `cols` | `number` | Number of subgrid columns | Shorthand |

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
