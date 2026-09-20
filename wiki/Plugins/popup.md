# `Plugins.popup`

Popup plugins attach tooltip, help, or floating-tip popups to element subtrees. They listen for mouse events on matching child selectors and show a `PapayaPopup` instance.

---

## `popup.tip`

Shows a tooltip popup on hover when the cursor enters an element with a `jam-tip` attribute (configurable via `tipAttr`). Supports sub-tips: when hovering over a child with a `jam-sub-tip` attribute, the popup content updates without closing.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `tipAttr` | `string` | Attribute name to read tooltip content from | Default: `'jam-tip'` |
| `subTip` | `boolean` | Enable sub-tip handling | — |
| `subTipAttr` | `string` | Attribute name for sub-tip content | Default: `'jam-sub-tip'` |
| `selector` | `string` | CSS selector for elements with tooltips | Default: `'[jam-tip]'` |
| `content` | `string \| Function` | Static tooltip content (overrides attribute reading) | — |
| `showDelay` | `number` | Delay in ms before showing | — |
| `hideDelay` | `number` | Delay in ms before hiding | — |
| `type` | `string` | Popup profile type | Default: `PopupType.tip` |
| `onshow` | `Function` | Called when popup shows | Receives event detail |
| `dynamic` | `boolean` | Keep popup content and position dynamic | — |
| `position` | `string` | Popup position | — |
| `bias` | `number \| string` | Popup position bias | — |
| `snapTo` | `string` | Target used for popup snapping | Options: `cursor`, `target` |
| `autoFlip` | `boolean` | Allow automatic position flipping | — |

```json jaml-playground
{
  "type": "container",
  "plugins": ["popup.tip(subTip:true;showDelay:200)"],
  "components": [
    {
      "type": "checkbox",
      "cap": "Admin",
      "tip": "Grants full system access.",
      "data": [
        { "name": "read", "value": 1, "tip": "View content" },
        { "name": "write", "value": 2, "tip": "Edit content" },
        { "name": "delete", "value": 3, "tip": "Remove content" }
      ]
    }
  ]
}
```

---

## `popup.floatingTip`

A floating tooltip variant that follows the cursor. No arrow. Type defaults to `PopupType.floatingTip`. Accepts all the same args as `popup.tip`.

```javascript jaml-playground
export default {
  type: 'container',
  plugins: [
    Plugins.popup.floatingTip({ showDelay: 100 })
  ],
  components: [
    {
      type: 'indicator',
      cap: 'Hover me',
      value: 42,
      tip: 'This tip follows your cursor'
    }
  ]
}
```

---

## `popup.title`

Replaces native HTML `title` attributes with styled popups. Intercepts `mouseenter` on child elements, reads their `title` attribute, clears it temporarily, and shows a styled popup instead. Restores the `title` on mouseleave.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `showDelay` | `number` | Delay before showing | Default: `2000` (longer than tip for less intrusive feel) |

```javascript jaml-playground
export default {
  type: 'container',
  plugins: ['popup.title'],
  components: [
    {
      type: 'button',
      cap: 'Save',
      title: 'Save all changes to the server (Ctrl+S)'
    }
  ]
}
```

---

## `popup.helper`

Shows help content on click. Listens for clicks on `[jam-help] > [slot="cap"]` elements and displays the `jam-help` attribute content in a popup. Accepts additional `PapayaPopup` configuration args.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `showDelay` | `number` | Delay in ms before showing | — |
| `hideDelay` | `number` | Delay in ms before hiding | — |
| `position` | `string` | Popup position | — |
| `bias` | `number \| string` | Popup position bias | — |
| `autoFlip` | `boolean` | Allow automatic position flipping | — |
| `container` | `string \| Function` | Popup container resolver | — |

```json jaml-playground
{
  "type": "input",
  "cap": "API Key",
  "help": "Your API key can be found in the dashboard under Settings → API Keys. Keep it secret!",
  "plugins": ["popup.helper"]
}
```

---

## Dynamic tooltip

A tooltip that updates its content on `mousemove`, snaps to cursor, and stays at a fixed position:

```javascript jaml-playground
export default {
  type: 'container',
  styles: ['size.fullsize', 'background.grid(gap:3rem;width:0.1rem)'],
  tip: 'move cursor',
  onmousemove(e) {
    document.getElementById('jam-popup-tip')?.setContent(
      jame({
        type: 'indicator',
        value: `X: ${e.pageX}, Y: ${e.pageY}`,
        style: { whiteSpace: 'nowrap' }
      })
    );
  },
  plugins: [
    Plugins.popup.tip({
      dynamic: true,
      position: 'bottom-right',
      bias: jam.rem(1),
      snapTo: 'cursor',
      autoFlip: false
    })
  ]
};
```
