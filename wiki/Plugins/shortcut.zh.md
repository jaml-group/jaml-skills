# `Plugins.shortcut`

<!-- Generated from native authoring; do not edit. -->

[English](shortcut.md)

<a id="entry-shortcut"></a>

悬停快捷操作

为悬停目标提供应用定义的操作。

向 Plugins.shortcut({ selector, optionsGetter, container?, allowOverflow?, class? }) 传入对象。optionsGetter(target) 返回操作的 ElementOption 数组；selector 匹配悬停目标，container 解析弹出层宿主。没有选项提供函数时不会创建弹出层。

这是悬停操作弹出层，不是键盘快捷键注册。选项提供函数和操作由应用拥有；外部查询值应编码。卸载插件会移除宿主监听器并销毁其弹出层。

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

搜索

为悬停文字提供网页搜索操作。

匹配目标触发 mouseenter 时，显示内置的 Baidu、Bing 和 Google 选项；点击会搜索目标文字。

提供 selector 和引用的图标资源。

卸载时移除宿主监听器并销毁弹出层。

即使传入 optionsGetter，此预设仍保留内置搜索操作。搜索文本直接插入 URL 而不编码；自定义操作和编码查询应使用 Plugins.shortcut({ selector, optionsGetter })。

位置参数顺序: `selector` → `optionsGetter` → `container` → `allowOverflow` → `class`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `selector` | `string` | 未提供 | 显示搜索快捷键的元素选择器。 |
| `optionsGetter` | `function` | 未提供 | 兼容性声明参数，不能替换此预设的内置提供函数。自定义操作应使用 Plugins.shortcut。 |
| `container` | `functionOrString` | 未提供 | 弹出层容器解析函数。 |
| `allowOverflow` | `boolean` | `false` | 允许弹出层溢出。 |
| `class` | `string` | 未提供 | 弹出层 CSS 类名。 |

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
