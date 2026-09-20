# interact

`Styles.interact.*` — interaction behaviors applied to any element.

---

## Variants

### `interact.movable`
Makes the element draggable via `DamsonDragNDrop`. Use `handle` to restrict the drag start area; `contain` constrains movement to the parent bounds.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `contain` | `boolean` | Constrain movement within parent bounds | Default: `false` |
| `useTransform` | `boolean` | Use CSS `transform` instead of `top`/`left` for positioning | Default: `true` |

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Drag me",
        "styles": ["interact.movable(contain:true)"]
    },
    {
        "type": "card",
        "cap": "Free drag",
        "styles": ["interact.movable"]
    }
]
```

### `interact.resizable`
Makes the element resizable by edge and corner drag handles.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `horizontalOnly` | `boolean` | Only allow horizontal resize | Default: `false` |
| `verticalOnly` | `boolean` | Only allow vertical resize | Default: `false` |
| `contain` | `boolean` | Constrain resize within parent bounds | Default: `false` |

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Resize me",
        "styles": ["interact.resizable"]
    },
    {
        "type": "card",
        "cap": "Horizontal only",
        "styles": ["interact.resizable(horizontalOnly:true;contain:true)"]
    }
]
```

### `interact.expandable`
Adds an expand/collapse toggle between this element and its adjacent sibling. Expands to 100% in the given direction, shrinking the sibling. Persists state in `localStorage` (by element `id`). Requires the element to have an `id`.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `direction` | `string` | Which side the panel expands toward | Default: `'left'`. Options: `'top'`, `'right'`, `'bottom'`, `'left'` |
| `default` | `string` | Default size when not expanded | Defaults to the element's current percentage size |
| `resizeThreshold` | `number` | Auto-expand when sibling size drops below this threshold (px) | Default: `50` |
| `button` | `boolean \| dictionary` | Show toggle button. Pass a dictionary to configure button styles | Default: `true` |
| `saveState` | `boolean` | Persist expanded/collapsed state to localStorage | Default: `false`. Requires an `id` when enabled |
| `resizable` | `boolean \| dictionary` | Make the expandable edge resizable | Default: `true` |

```json jaml-playground
[
    {
        "type": "container",
        "id": "sidebar",
        "styles": ["interact.expandable(direction:right;default:30%)"],
        "components": [{ "type": "label", "cap": "Expandable sidebar" }]
    }
]
```

### `interact.closable`
Adds a close (&times;) button. Double-clicking the icon slot also triggers close.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `callback` | `function` | Called on close. Receives the element | Default: removes the nearest `.jam-closable` ancestor |

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Close me",
        "styles": ["interact.closable"],
        "components": [{ "type": "label", "cap": "Click the X or double-click the icon" }]
    }
]
```

### `interact.resettable`
Adds a reset button that restores the element's `defaultValue`. Requires the element to implement `IResettable`. No args.

```json jaml-playground
[
    {
        "type": "input",
        "cap": "Edit then reset",
        "styles": ["interact.resettable"]
    }
]
```

### `interact.clearable`
Adds a clear button that sets the element's value to `null`. Requires the element to implement `IClearable`. No args.

```json jaml-playground
[
    {
        "type": "input",
        "cap": "Type then clear",
        "styles": ["interact.clearable"]
    }
]
```

### `interact.removable`
Adds the `jam-removable` CSS class and a remove button. The button stops event propagation and calls the `onremove` callback (if provided).

| Arg | Type | Description | Notes |
|---|---|---|---|
| `onremove` | `function` | Called when the remove button is clicked. Return `false` to prevent removal | — |

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Removable item",
        "styles": ["interact.removable(onremove:function(el) { console.log('removing', el) })"]
    }
]
```

### `interact.scrollX`
Converts vertical mouse wheel input to horizontal scrolling via `scrollBy({ left, behavior: 'smooth' })`. No args.

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["interact.scrollX", "css(overflow-x:auto;whiteSpace:nowrap;width:20rem)"],
        "components": [
            { "type": "label", "cap": "Item 1" },
            { "type": "label", "cap": "Item 2" },
            { "type": "label", "cap": "Item 3" },
            { "type": "label", "cap": "Item 4" },
            { "type": "label", "cap": "Item 5" }
        ]
    }
]
```

### `interact.virtualScroll`
Virtual scrolling for large lists using `SaigonScroll`. Renders only visible rows for performance.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `height` | `number \| string` | Row height | Default: `2.5`, unit: `rem` |
| `scrollTarget` | `string` | CSS selector for the scrollable container | Defaults to the element itself |
| `throttle` | `number` | Scroll event throttle | Default: `10`, unit: `ms` |
| `padding` | `number` | Extra padding pixels above and below the visible area | Default: `0` |
| `getChildrenByRow` | `function` | Returns child elements for a given row index | Required |
| `getRowNum` | `function` | Returns the total number of rows | Required |

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["interact.virtualScroll(height:3;throttle:16)", "css(height:20rem)"]
    }
]
```

### `interact.scrollWatcher`

Toggles CSS classes on the host element based on the scroll position of a target element. Adds `jam-x-scrolled` when scrolled horizontally and `jam-y-scrolled` when scrolled vertically. Use with `descStyles` to apply visual treatments to scrolled states.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `clazz` | `string` | Reserved class argument | Default: `'jam-scrolled'` |
| `delay` | `number` | Delay before binding scroll listener | Default: `100`. Unit: `ms` |
| `target` | `string` | CSS selector for the scrollable target | Defaults to the element itself |

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["interact.scrollWatcher", "css(overflow:auto;width:20rem;height:8rem)"],
        "components": [
            {
                "type": "label",
                "cap": "Scrollable content",
                "styles": ["css(display:block;width:32rem;height:14rem)"]
            }
        ]
    }
]
```

### `interact.zoomable`
Adds a zoom-in button. Double-clicking the label slot toggles zoom via `positionFlip`.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `callback` | `function` | Called on zoom. Receives `(element, gap)` | Default: toggles CSS zoom with a flip animation |
| `gap` | `number \| string` | Zoom margin | Default: `0`, unit: `px` |

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Zoom me",
        "styles": ["interact.zoomable(gap:16)"]
    }
]
```

### `interact.panNZoom`
Pan via drag + cursor-aware zoom via mouse wheel using `PearPanNZoom`.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `minScale` | `number` | Minimum zoom scale | Default: `0.5` |
| `maxScale` | `number` | Maximum zoom scale | Default: `5` |
| `scaleStep` | `number` | Zoom increment per wheel tick | Default: `0.01` |

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["interact.panNZoom(minScale:0.25;maxScale:10;scaleStep:0.02)", "css(width:30rem;height:20rem;overflow:hidden)"],
        "components": [{ "type": "label", "cap": "Drag to pan, scroll to zoom" }]
    }
]
```

---

## Usage

```javascript jaml-playground
export default {
  type: 'card',
  cap: 'Movable Panel',
  styles: ['interact.movable', 'interact.resizable', 'interact.closable'],
  components: [
    { type: 'label', cap: 'Drag me by the title' }
  ]
}
```

## `interact.sortable`

Reorders matching direct children by dragging. Containers with the same nonempty `group` accept transfers. The plugin changes DOM order; persist application data in `change` when needed.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `selector` | `string` | Sortable direct children | Default: `*` |
| `group` | `string` | Shared cross-container group | Omit to keep items within their container |
| `placement` | `string` | Preview placement | `live` (default) moves the placeholder; `deferred` commits placement on release |
| `handle` | `string` | Drag-handle selector | Optional |
| `avoid` | `string` | Descendants that cannot initiate dragging | Defaults to buttons, inputs, textareas, selects, links, editable content, and close buttons |
| `overlap` | `number` | Area-overlap threshold from 0 to 1 | Omit to use the dragged center |
| `scroll` | `boolean` | Scroll near container edges | Default: `true` |
| `scrollMargin` | `number` | Edge scroll region in px | Default: `48` |
| `scrollSpeed` | `number` | Maximum edge scroll speed in px/s | Default: `600` |
| `change` | `function` | Called after a changed order is committed | Receives `{ item, from, to, oldIndex, newIndex, fromItems, toItems }`; transfers notify both containers |

```json jaml-playground
{
  "type": "wrapper",
  "styles": ["interact.sortable", "animation.flipchild(duration:200)"],
  "components": [
    { "type": "label", "cap": "Drag: Planning" },
    { "type": "label", "cap": "Drag: Building" },
    { "type": "label", "cap": "Drag: Checking" }
  ]
}
```
