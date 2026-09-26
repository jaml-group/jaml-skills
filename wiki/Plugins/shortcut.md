# `Plugins.shortcut`

---

## `shortcut.search`

Shows a search-engine shortcut popup when hovering over elements matching a selector. By default it provides Baidu, Bing, and Google search buttons that open the selected text in a new tab.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `plugin shortcut.search`.

The shortcut provider contract is `optionsGetter(target) => ElementOption[]`. The current `shortcut.search` preset supplies its own provider, which takes precedence over a caller-provided `optionsGetter`; that option cannot currently replace the preset’s search entries.

```json jaml-playground
{
  "type": "container",
  "plugins": ["shortcut.search({selector:'.jam-option'})"],
  "components": [
    { "type": "label", "cap": "Select a scientist to search:" },
    {
      "type": "radio",
      "cap": "Scientists",
      "data": [
        { "name": "Albert Einstein", "value": "einstein" },
        { "name": "Isaac Newton", "value": "newton" },
        { "name": "Niels Bohr", "value": "bohr" }
      ]
    }
  ]
}
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
    { "type": "radio", "cap": "Search target", "data": [
      { "name": "JAM-UI", "value": "jam-ui" },
      { "name": "JavaScript", "value": "js" }
    ]}
  ]
}
```
