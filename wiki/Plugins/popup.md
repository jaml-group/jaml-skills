# `Plugins.popup`

Popup plugins attach tooltip, help, or floating-tip popups to element subtrees. They listen for mouse events on matching child selectors and show a `PapayaPopup` instance.

---

## `popup.tip`

Shows a tooltip popup on hover when the cursor enters an element with a `jam-tip` attribute (configurable via `tipAttr`). Sub-tip replacement is enabled when `subTip` is omitted or true; `subTip:false` disables it. A sub-tip target with a `jam-sub-tip` attribute updates an already showing main popup without closing it. Returning to the main target restores its original content. Matching tests the event target itself, so a nested label or icon does not inherit a matching ancestor’s tip automatically.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `plugin popup.tip`.

The show callback receives the event detail.

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

Replaces a target’s native `title` tooltip with a framework popup. It temporarily suppresses the title and restores it on leave, target unmount, target switch or plugin removal. A newer nonempty title or a removed title attribute is preserved. An external assignment of the same empty title cannot be distinguished from the plugin’s suppression.

Removing the plugin detaches its listeners and destroys its popup, including pending display. Repeated application does not duplicate listeners. Use `popup.tip` for explicit tip content and provide keyboard/focus-accessible help when the product requires it.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `plugin popup.title`.

```javascript jaml-playground
export default {
  type: 'container',
  plugins: ['popup.title(showDelay:200)'],
  components: [
    {
      type: 'button',
      cap: 'Save',
      attrs: { title: 'Save all changes to the server (Ctrl+S)' }
    }
  ]
}
```

---

## `popup.helper`

Shows help content on click. Listens for clicks on `[jam-help] > [slot="cap"]` elements and displays the `jam-help` attribute content in a popup. Accepts additional `PapayaPopup` configuration args.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `plugin popup.helper`.

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
