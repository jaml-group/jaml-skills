# shortcuts

**Class:** `SafouShortcuts` · **Type:** `"shortcuts"` · **Extends:** `PapayaPopup`

`SafouShortcuts` displays a button-group popup anchored to a target. For hover actions in JAML, attach `Plugins.shortcut({ selector, optionsGetter })` to the container that owns the targets. The plugin owns its popup and removes its host listener and popup when unplugged.

| Trigger | Show delay | Arrow | Animation                          |
| ------- | ---------- | ----- | ---------------------------------- |
| `hover` | `200ms`    | None  | `fade-in 100ms` / `fade-out 100ms` |

The button group is created lazily and reused between shows. Options come from `optionsGetter(target)` on each show.

---

## JAML usage

```javascript jaml-playground
export default {
    type: 'container',
    plugins: [
        Plugins.shortcut({
            selector: 'jam-card',
            optionsGetter: (target) => [
                { name: 'View', onclick: () => nutmeg.info(target.cap) },
                { name: 'Copy title', onclick: () => jam.copy2Clipboard(target.cap) }
            ]
        })
    ],
    components: [
        {
            type: 'card',
            cap: 'Project Alpha',
            components: [{ type: 'label', cap: 'Hover over this card for actions.' }]
        }
    ]
};
```

Use a JavaScript options provider when actions need functions or target-specific data. The element-level `shortcuts` param stores JSON metadata; it does not by itself attach the hover plugin, and function-valued fields are not preserved by that serialization.

---

## `ElementOption` fields for shortcuts

| Field     | Type            | Description                              |
| --------- | --------------- | ---------------------------------------- |
| `name`    | `string`        | Button label                             |
| `icon`    | `string`        | Button icon                              |
| `onclick` | `Function`      | Click handler (receives the click event) |
| `color`   | `ColorType`     | Button accent color                      |
| `styles`  | `StyleOption[]` | Styles for the button                    |
| `tip`     | `string`        | Tooltip text                             |
| `hide`    | `boolean`       | Hide this shortcut button                |

---

## Instance API

`SafouShortcuts` inherits the [popup API](popup.md). Use an instance when the application supplies its own trigger and lifetime.

### `shortcuts.optionsGetter(target)`

Return the `ElementOption[]` for the current target. For a fixed list, return the same array from this provider. Assigning `shortcuts.options` does not populate the group.

```javascript
const actions = [
    { name: 'Edit', onclick: () => console.log('edit') },
    { name: 'Delete', onclick: () => console.log('delete') }
];
const shortcuts = new jam.SafouShortcuts({ optionsGetter: () => actions });
```

### `shortcuts.show(target)`

Accepts an `HTMLElement` or mouse event and refreshes the button group from `optionsGetter`. Call `hide()` to dismiss and `destroy()` when the owner is released.

The following helper requires an existing target element. It returns the cleanup function that the target's owner must call when disposing it. Explicit event listeners are kept here so cleanup can remove them.

```javascript
function attachShortcuts(target) {
    const shortcuts = new jam.SafouShortcuts({
        optionsGetter: () => [{ name: 'Inspect', onclick: () => console.log(target) }]
    });
    const show = () => shortcuts.show(target);
    const hide = () => shortcuts.hide();
    target.addEventListener('mouseenter', show);
    target.addEventListener('mouseleave', hide);

    return () => {
        target.removeEventListener('mouseenter', show);
        target.removeEventListener('mouseleave', hide);
        shortcuts.destroy();
    };
}
```

---

## Dynamic target actions

```javascript jaml-playground
export default {
    type: 'container',
    vars: {
        projects: ['Alpha', 'Beta', 'Gamma']
    },
    plugins: [
        Plugins.shortcut({
            selector: 'jam-label',
            optionsGetter: (target) => [{ name: `Open ${target.cap}`, onclick: () => nutmeg.info(target.cap) }]
        })
    ],
    components: [{ type: 'label', buildFor: 'project in projects', cap: '{{project}}' }]
};
```

---

## Notes

-   `removeOnHiding: false` keeps the popup available between shows. It still needs an owner that destroys it.
-   Shortcuts popups are exclusive: showing one dismisses another shortcuts popup.
-   The [shortcut plugin guide](../Plugins/shortcut.md) covers the built-in search preset. That preset supplies its own provider; use the base plugin above for application actions.
