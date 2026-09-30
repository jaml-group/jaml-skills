# `Plugins.shortcut`

<!-- Generated from native authoring; do not edit. -->

[中文](shortcut.zh.md)

<a id="entry-shortcut"></a>

Keyboard shortcuts

Identify the base hover-shortcut plugin.

Creates a shortcuts popup only when an options provider exists; the bare exported entry defines no provider or declared argument schema.

This is not a keyboard-shortcut registration API. Use a supported configured extension or shortcut.search for its specific built-in behavior.

---

## `shortcut.search`

<a id="entry-shortcut-search"></a>

Search

Offer web-search actions for hovered text.

On matching target mouseenter, shows built-in Baidu/Bing/Google options whose clicks open searches for the target text.

Provide selector and the referenced icon assets.

Unplug removes the host listener and destroys the popup.

The built-in provider wins over the declared optionsGetter argument in the constructor. Search text is interpolated without URL encoding; use a custom registered plugin for different or robust query behavior.

Positional order: `selector` → `optionsGetter` → `container` → `allowOverflow` → `class`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `selector` | `string` | Not supplied | Selector for elements that show search shortcuts. |
| `optionsGetter` | `function` | Not supplied | Custom shortcut option provider. |
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

```javascript jaml-playground
export default {
    type: 'container',
    plugins: [
        Plugins.shortcut.search({
            selector: '.jam-option',
            optionsGetter: (target) => [
                {
                    name: '',
                    icon: '<img src="https://duckduckgo.com/favicon.ico"/>',
                    onclick: () => window.open(`https://duckduckgo.com/?q=${target.textContent}`)
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
