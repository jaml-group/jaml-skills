# `Plugins.shortcut`

<!-- Generated from native authoring; do not edit. -->

[中文](shortcut.zh.md)

<a id="entry-shortcut"></a>

Action shortcuts

Offer application-defined actions on a hovered surface or from a button.

Pass an object to Plugins.shortcut({ selector, triggerSelector?, optionsGetter, container?, allowOverflow?, class? }). selector matches the hovered surface. triggerSelector optionally matches a native or Jam-UI button whose activation opens the same popup. optionsGetter(target) receives the hovered surface or the activated button and returns the action ElementOption array. container resolves the popup host. Without an options provider no popup is created.

A direct trigger uses the button's native activation with mouse, Enter, Space or touch. Focus moves to the first enabled action. Escape or a completed command returns focus to the trigger when focus is still inside the popup and the trigger is available. Keep providers and actions application-owned and encode external query values. Unplug removes the owned listeners and popup.

```javascript jaml-playground
export default {
    type: 'container',
    plugins: [
        Plugins.shortcut({
            selector: '.jam-option',
            optionsGetter: (target) => [
                {
                    name: 'Search DuckDuckGo',
                    onclick: () => window.open(`https://duckduckgo.com/?q=${encodeURIComponent(target.textContent ?? '')}`, '_blank', 'noopener,noreferrer')
                }
            ]
        })
    ],
    components: [
        {
            type: 'radio',
            cap: 'Search target',
            data: [
                { name: 'JAM-UI', value: 'jam-ui' },
                { name: 'JavaScript', value: 'js' }
            ]
        }
    ]
};
```

---

## `shortcut.search`

<a id="entry-shortcut-search"></a>

Search

Offer web-search actions for hovered text.

On matching target mouseenter, shows built-in Baidu/Bing/Google options whose clicks open searches for the target text.

Provide selector and the referenced icon assets.

Unplug removes the host listener and destroys the popup.

The preset keeps its built-in search actions even when optionsGetter is supplied. Search text is interpolated without URL encoding; use Plugins.shortcut({ selector, optionsGetter }) for custom actions and encoded queries.

Positional order: `selector` → `optionsGetter` → `container` → `allowOverflow` → `class`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `selector` | `string` | Not supplied | Selector for elements that show search shortcuts. |
| `optionsGetter` | `function` | Not supplied | Declared for compatibility; cannot replace this preset’s built-in provider. Use Plugins.shortcut for custom actions. |
| `container` | `functionOrString` | Not supplied | Popup container resolver. |
| `allowOverflow` | `boolean` | `false` | Allow popup overflow. |
| `class` | `string` | Not supplied | Popup CSS class. |

Shows a search-engine shortcut popup when hovering over elements matching a selector. By default it provides Baidu, Bing, and Google search buttons that open the selected text in a new tab.

The shortcut provider contract is `optionsGetter(target) => ElementOption[]`. The current `shortcut.search` preset supplies its own provider, which takes precedence over a caller-provided `optionsGetter`; that option cannot currently replace the preset’s search entries.

```javascript jaml-playground
export default {
    type: 'container',
    plugins: ["shortcut.search({selector:'.jam-option'})"],
    components: [
        { type: 'label', cap: 'Select a scientist to search:' },
        {
            type: 'radio',
            cap: 'Scientists',
            data: [
                { name: 'Albert Einstein', value: 'einstein' },
                { name: 'Isaac Newton', value: 'newton' },
                { name: 'Niels Bohr', value: 'bohr' }
            ]
        }
    ]
};
```
