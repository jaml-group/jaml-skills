# `Plugins.shortcut`

<!-- Generated from native authoring; do not edit. -->

[English](shortcut.md)

<a id="entry-shortcut"></a>

快捷键

标识基础悬停快捷操作插件。

仅在存在选项提供器时创建 shortcuts 弹出层；导出的基础入口没有定义提供器或声明参数结构。

这不是键盘快捷键注册 API。使用受支持的已配置扩展，或使用 shortcut.search 获取其特定的内置行为。

---

## `shortcut.search`

<a id="entry-shortcut-search"></a>

搜索

为悬停文字提供网页搜索操作。

匹配目标触发 mouseenter 时，显示内置的 Baidu、Bing 和 Google 选项；点击会搜索目标文字。

提供 selector 和引用的图标资源。

卸载时移除宿主监听器并销毁弹出层。

构造器中的内置提供器优先于声明的 optionsGetter 参数。搜索文字直接插入而未进行 URL 编码；需要不同或更稳健的查询行为时使用自定义注册插件。

位置参数顺序: `selector` → `optionsGetter` → `container` → `allowOverflow` → `class`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `selector` | `string` | 未提供 | 显示搜索快捷键的元素选择器。 |
| `optionsGetter` | `function` | 未提供 | 自定义快捷键选项提供函数。 |
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
