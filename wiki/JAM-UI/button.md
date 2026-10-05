# button

**Class:** `BananaButton` · **Type:** `"button"` · **Extends:** `AbstractElement`

A standard click button with icon and cap slots. Supports keyboard binding, hold-to-repeat, and visual specializations. Use composite types such as `"button-cta"`, `"button-ghost"`, `"button-outline"`, `"button-fab"`, or `"button-link"`.

---

## JAML usage

```json jaml-playground
{
  "type": "button",
  "cap": "Submit",
  "icon": "✓",
  "color": "green"
}
```

---

## Params

Inherits all params from [AbstractElement](./JAM-UI.md).

| Param         | Type                        | Default | Description                                                                                                                  |
| ------------- | --------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `cap`         | `string \| Text \| Element` | —       | Fills the `cap` slot; strings can contain authored HTML. See [literal slot text](./JAM-UI.md#slot-content-and-literal-text). |
| `icon`        | `string`                    | —       | Icon content. Fills the `icon` slot. Can be emoji, text, or icon name.                                                       |
| `bindKey`     | `string`                    | —       | Keyboard shortcut. Pressing the key fires a `click` event.                                                                   |
| `repeat`      | `boolean \| number`         | `0`     | Hold-to-repeat interval in ms. `true` defaults to 50ms.                                                                      |
| `repeatDelay` | `number`                    | `500`   | Delay in ms before repeat starts.                                                                                            |

---

## Slots

| Slot            | Description                |
| --------------- | -------------------------- |
| `icon`          | Icon content (left of cap) |
| `cap` (default) | Button label text          |

---

## Events

| Event   | Description                                                                                                                            |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `click` | Standard DOM click. When triggered via keyboard bind, event detail includes `code`, `key`, `shiftKey`, `ctrlKey`, `altKey`, `metaKey`. |

---

## Focused keyboard activation

In the updated development runtime, a focused button host handles Enter on keydown and Space on release. It ignores browser key-repeat duplication, composition, and Alt/Ctrl/Meta combinations; `repeat` is the separate opt-in hold behavior. Disabled buttons do not activate. Key events originating from a nested input or another nested control are not treated as activation of the button host. Handlers reached before the framework's window-bubble listener can call `preventDefault()` to suppress activation. This is a listener fallback, not a browser-native post-dispatch default action; later window listeners cannot reliably cancel an already-fired click.

Key release clears held state and repetition even when an application handler stops subsequent `keyup` propagation. Blur, disabling or disconnection also clears held state and repetition.

In the current development runtime, native buttons and specializations such as `button-cta` default each missing attribute independently to `role="button"` and `tabindex="0"`. Authored roles and tab indexes are preserved for composite controls. Explicit `none`/`presentation` roles do not receive a default tab stop. Button-group choice wrappers retain button focus and activation because their backing native inputs may be hidden by the theme; this does not establish complete radio-group keyboard or ARIA behavior. `disabled` synchronizes `aria-disabled`, removes the button from sequential tab order and restores its previous index when enabled. The visible caption supplies an accessible name; give icon-only buttons an explicit name with `attrs: { 'aria-label': 'Close' }`. These defaults do not implement complete menu, group navigation or tablist behavior.

Explicit `bindKey` shortcuts are separate: their click is generated on keydown, while keyup removes active state and ends repetition. Ordinary focused activation is not a second shortcut registration. Older 1.6.0 bundles may lack focused activation; verify the consuming runtime and the actual keyboard interaction.

---

## Examples

### Sidebar icons and left-aligned captions

```javascript jaml-playground
export default {
  type: "button-ghost",
  cap: "Chat title",
  styles: [
    "icon.bar",
    "icon.css(width:0.25em;height:1em;aspect-ratio:auto)",
    "align(left-middle)",
    "cap.text(align:left)",
    "css(width:100%)",
  ],
};
```

[Native `icon.bar`](../Styles/common/icon.md#entry-icon-bar) supplies an icon-slot marker without external font assets. Leave `icon` unset when the bar should be the sole icon; the style appends its own content. Button recipes can frame icons as squares; the example's native `icon.css` targets the slot content to preserve a narrow bar. Host [alignment](../Styles/common/align.md) and caption [text alignment](../Styles/common/text.md) are different targets: `align(left-middle)` positions the content, while `cap.text(align:left)` aligns caption lines. Row width and selection state remain separate choices. Use literal slot text for external chat titles as described above.

For font icons, package matching CSS and webfonts in the application and load the CSS with [`jam.addResource`](../utils.md#jamaddresourceurl). Then use a bare icon name and the native variant:

```javascript
await jam.addResource("/assets/fontawesome/css/all.min.css");
const chatsButton = {
  type: "button-ghost",
  icon: "comment",
  cap: "Chats",
  styles: [
    "icon.solid(color:currentColor;strokeWidth:0px)",
    "align(left-middle)",
    "cap.text(align:left)",
  ],
};
```

Choose icons available in the pinned asset version. Font Awesome Free includes Classic Solid/Regular subsets and Brands; Classic Light and Duotone require Pro assets. Preserve the CSS-to-webfont paths when packaging. See [official webfont setup](https://docs.fontawesome.com/web/setup/host-yourself/webfonts) and [package setup](https://docs.fontawesome.com/web/setup/packages). Native icon styles select classes and treatment; they do not download or register icon assets. An icon-name catalog is not a guarantee of Free availability. A loaded stylesheet alone does not prove a glyph rendered: verify the font request and visible icon in the consuming application.

For row commands, use separate native buttons and [contextual action popups](../utils.md#contextual-action-buttons); keep command activation independent of row selection.

### CTA button

```json jaml-playground
{
  "type": "button-cta",
  "cap": "Get Started",
  "icon": "→"
}
```

### Ghost and outline subtypes

```json jaml-playground
{
  "type": "wrapper",
  "styles": ["wrapper.buttonwrapper"],
  "components": [
    { "type": "button-ghost", "cap": "Ghost" },
    { "type": "button-outline", "cap": "Outline" },
    { "type": "button-link", "cap": "Link" },
    { "type": "button-fab", "icon": "✏️" }
  ]
}
```

### Button with keyboard shortcut

```javascript jaml-playground
export default {
  type: "button",
  cap: "Confirm",
  bindKey: "Enter",
  onclick: () => console.log("Enter pressed or clicked"),
};
```

### Disabled with message tooltip

```json jaml-playground
{
  "type": "button",
  "cap": "Delete",
  "disabled": "<b>Deletion is disabled</b> — you do not have permission"
}
```

### Auto-repeat button (hold to increment)

```javascript jaml-playground
export default {
  type: "container",
  vars: { count: 0 },
  components: [
    { type: "indicator", cap: "Count", value: "{{count}}" },
    {
      type: "button",
      icon: "+",
      repeat: 100,
      repeatDelay: 400,
      onclick: function () {
        this.model.vars.count++;
      },
    },
  ],
};
```

---

## Notes

- When `disabled` is set to a string, a popup with that message appears on hover or click.
- `bindKey` activates on keydown; keyup clears `jam-active` and stops repetition. See [focused activation](#focused-keyboard-activation) for the separate button-host behavior.
- `repeat` + `repeatDelay` enable auto-repeat. Useful for increment/decrement buttons.
