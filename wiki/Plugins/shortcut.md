# `Plugins.shortcut`

---

## `shortcut.search`

Shows a search-engine shortcut popup when hovering over elements matching a selector. By default it provides Baidu, Bing, and Google search buttons that open the selected text in a new tab.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `selector` | `string` | CSS selector for elements to attach search shortcuts to | Required |
| `optionsGetter` | `(target: HTMLElement) => ElementOption[]` | Custom search engine options | Default: built-in Baidu/Bing/Google engines |
| `container` | `string \| Function` | Popup container resolver | — |
| `allowOverflow` | `boolean` | Allow popup to overflow container | Default: `false` |
| `class` | `string` | CSS class added to the popup | — |

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
