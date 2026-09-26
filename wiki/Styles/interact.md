# interact

`Styles.interact.*` — interaction behaviors applied to any element.

---

## Variants

### `interact.movable`

Makes the element draggable via `DamsonDragNDrop`. Use `handle` to restrict the drag start area; `contain` constrains movement to the parent bounds.

Arguments are forwarded to `jam.makeMovable` through an open contract. [Generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style interact.movable`. Field-level completion and inferred types/defaults are not yet available; the empty runtime profile does not reject forwarded options.

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

Arguments are forwarded to `jam.makeResizable` through an open contract. [Generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style interact.resizable`. Field-level completion and inferred types/defaults are not yet available; the empty runtime profile does not reject forwarded options.

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style interact.expandable`.

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style interact.closable`.

The close callback receives the styled element. Without a custom callback, closing removes its nearest `.jam-closable` ancestor.

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style interact.removable`.

The remove-button callback runs with the styled host as `this` and no positional arguments. Return `false` from `onremove` to cancel removal.

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style interact.virtualScroll`.

Provide `getChildrenByRow(container, row)` to supply a row’s children and `getRowNum(container)` to report the total row count.

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style interact.scrollWatcher`.

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style interact.zoomable`.

The zoom callback receives `(element, gap)`. Without a custom callback, it toggles CSS zoom with a FLIP animation.

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style interact.panNZoom`.

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style interact.sortable`.

Omit `group` to keep items within their container. Live placement moves the placeholder; deferred placement commits on release. The change callback receives `{ item, from, to, oldIndex, newIndex, fromItems, toItems }`; transfers notify both containers.

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
