# `Plugins.shortcut`

<!-- Generated from native authoring; do not edit. -->

[中文](shortcut.zh.md)

<a id="entry-shortcut"></a>

Hover action shortcuts

Offer application-defined actions for a hovered target.

Pass an object to Plugins.shortcut({ selector, optionsGetter, container?, allowOverflow?, class? }). optionsGetter(target) returns the action ElementOption array. selector matches the hovered target; container resolves the popup host. Without an options provider no popup is created.

This is a hover action popup, not keyboard-shortcut registration. Keep the provider and actions application-owned, encode external query values, and unplug to remove the host listener and destroy the owned popup.

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
