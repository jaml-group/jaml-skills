# auto

`Styles.auto.*` — automatic behaviors triggered on mount or data change.

---

## Variants

### `auto.badge`

Auto-replaces `[cap:value]` text patterns in the element's text content with inline `<jam-badge>` elements. The text before `sep` becomes the `cap` slot and the text after it becomes the `value` slot. Walks the DOM tree and replaces matching text nodes.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style auto.badge`.

```json jaml-playground
[
    {
        "type": "label",
        "cap": "[status:active] [priority:high]",
        "styles": ["auto.badge"]
    },
    {
        "type": "label",
        "cap": "[status:active] [priority:high]",
        "styles": ["auto.badge(sep:':';dir:vertical)"]
    }
]
```

### `auto.adjustFont`

Auto-scales font size so text fits within the container without overflow. Listens to resize events (and custom triggers) and adjusts incrementally.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style auto.adjustFont`.

Height adjustment compensates for line-height and font vertical alignment.

```json jaml-playground
[
    {
        "type": "label",
        "cap": "This text will auto-scale to fit inside the container",
        "styles": ["auto.adjustFont(min:8;max:32)", "css(width:15rem;overflow:hidden)"]
    }
]
```

### `auto.focus`

Auto-focuses the element on mount. Manages a focus stack — when this element unmounts, focus returns to the previous element in the stack. If `selection` is provided, selects the matching portion of the value.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style auto.focus`.

```json jaml-playground
[
    {
        "type": "input",
        "cap": "Focused on mount",
        "value": "Select this word please",
        "styles": ["auto.focus(selection:/this/)"]
    },
    {
        "type": "input",
        "cap": "Focused, no selection",
        "styles": ["auto.focus"]
    }
]
```

### `auto.moveAlong`

Makes the element follow another element's screen position. Uses `MelonMove` for smooth animation. Toggles `jam-at-front` class when passing certain angles for z-index management.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style auto.moveAlong`.

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["css(position:relative)"],
        "components": [
            { "type": "label", "cap": "Reference", "id": "ref" },
            {
                "type": "label",
                "cap": "Following",
                "styles": ["auto.moveAlong(target:#ref)"]
            }
        ]
    }
]
```

### `auto.scrollAlong`

Synchronizes the scroll position of two elements. When the target scrolls, the scroll target mirrors its scroll percentage.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style auto.scrollAlong`.

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["css(display:flex;gap:1rem)"],
        "components": [
            {
                "type": "container",
                "id": "source-scroll",
                "styles": ["css(height:10rem;overflow-y:auto)", "css(width:50%)"],
                "components": [{ "type": "label", "cap": "Scroll here\n\nLine 1\nLine 2\nLine 3\nLine 4\nLine 5" }]
            },
            {
                "type": "container",
                "styles": ["auto.scrollAlong(target:#source-scroll)", "css(height:10rem;overflow-y:auto)", "css(width:50%)"],
                "components": [{ "type": "label", "cap": "Mirrored scroll\n\nLine A\nLine B\nLine C\nLine D\nLine E" }]
            }
        ]
    }
]
```

### `auto.hideIf.empty`

Auto-hides the element when its `data` is empty or null. Listens to `optionchange` events. For option-based elements (`AbstractOptionElement`). No args.

```json jaml-playground
[
    {
        "type": "select",
        "cap": "Items",
        "styles": ["auto.hideIf.empty"],
        "data": []
    }
]
```

### `auto.hideIf.valueIs0`

Auto-hides the element when its `value` is `0` or `null`. Listens to `valuechange` events. For input elements (`AbstractInputElement`). No args.

```json jaml-playground
[
    {
        "type": "input",
        "cap": "Enter 0 to hide",
        "styles": ["auto.hideIf.valueIs0"]
    }
]
```

### `auto.keepScrollPosition`

Persists and restores the scroll position of an element across page loads using `miso` (sessionStorage).

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style auto.keepScrollPosition`.

> **Note:** The element must have an `id` attribute for the storage key.

```json jaml-playground
[
    {
        "type": "container",
        "id": "scrollable-list",
        "styles": ["auto.keepScrollPosition", "css(height:20rem;overflow-y:auto)"],
        "components": [{ "type": "label", "cap": "Scroll position remembered" }]
    }
]
```

### `auto.colored`

Auto-applies accent color tint to the element. **Requires a `color` param** on the element — without it, nothing visible happens.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style auto.colored`.

The element's `color` parameter supplies the tint source.

```json jaml-playground
[
    {
        "type": "button",
        "cap": "Tinted",
        "color": "blue",
        "styles": ["auto.colored"]
    },
    {
        "type": "card",
        "cap": "Colored card",
        "styles": ["auto.colored"]
    }
]
```

---

## Usage

```javascript jaml-playground
export default {
  type: 'select',
  cap: 'Items',
  styles: ['auto.hideIf.empty'],
  data: []
}
```
