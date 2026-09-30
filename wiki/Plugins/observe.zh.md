# `Plugins.observe`

<!-- Generated from native authoring; do not edit. -->

[English](observe.md)

---

## `observe.child`

<a id="entry-observe-child"></a>

观察直接子节点变化

响应后续直接子节点的添加和移除，而不接管子节点界面。

仅观察 childList。默认过滤器只接受 HTMLElement 节点。childAdded/childRemoved 回调接收单个节点，this 指向该节点；childChanged 接收过滤后的数组，this 指向根元素。

自身不产生视觉内容；回调可以更新应用外观。

使用支持 MutationObserver 的 DOM 宿主，并提供适合所接收节点的回调。

接入时保存 MutationObserver；移除时断开观察器并清除插件数据。

自定义 filter 会替换默认过滤器，必须能够处理任意节点。若需处理现有子节点，请自行扫描；插件初始不会枚举子节点，也不观察后代或属性变化。

回调按每条变更记录触发；changed 可能收到空数组，filter 可能重复执行。不要将其视为子树观察或自动子节点生命周期管理。

位置参数顺序: `childAdded` → `childRemoved` → `childChanged` → `filter`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `childAdded` | `function` | 子节点添加回调 |
| `childRemoved` | `function` | 子节点移除回调 |
| `childChanged` | `function` | 节点增删集合变化回调 |
| `filter` | `function` | 观察节点过滤函数 |

hosts: `HTMLElement`.

states: `childList`.

开发示例需在提供对应场景的匹配版本 Playground 中打开：

- `#/testground?jaml=intent-observe-child`

Observes direct child elements being added or removed using `MutationObserver`. It does not watch nested descendants: `observeChild()` uses `{ childList: true }` without `subtree`. For content whose descendants render asynchronously, use a lifecycle-owned observer with `subtree: true` when the direct-child contract is insufficient; disconnect it when unplugged.

`childAdded(child)` and `childRemoved(child)` receive the changed element. `childChanged(addedNodes, removedNodes)` receives both arrays. The node filter controls which mutations are observed; without a custom filter, only HTML elements are accepted.

The child-change callback receives arrays of added and removed nodes.

```javascript jaml-playground
export default {
    type: 'container',
    plugins: [
        Plugins.observe.child({
            childAdded: (el) => nutmeg.info(`Child added: ${el.tagName}`),
            childRemoved: (el) => nutmeg.warn(`Child removed: ${el.tagName}`)
        })
    ],
    components: [{ type: 'button', cap: 'Add child', onclick: 'this.parentElement.appendChild(document.createElement("div"))' }]
};
```

---

## `observe.intersection`

<a id="entry-observe-intersection"></a>

交叉观察

观察滚动区域或根区域内子元素的可见性。

观察现有的直接子节点及后续子节点变更，并在交叉状态变化时调用 showing 或 hiding。自定义 adding 和 removing 回调接收观察器，并接管 observe 或 unobserve 的责任。

卸载时断开交叉观察器和变更观察器。

filter 应用于变更观察，不应用于 root.children 的初始枚举。此插件报告可见性；本身不延迟渲染或获取内容。

位置参数顺序: `showing` → `hiding` → `adding` → `removing` → `option` → `filter`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `showing` | `function` | 显示回调 |
| `hiding` | `function` | 隐藏回调 |
| `adding` | `function` | 添加回调 |
| `removing` | `function` | 移除回调 |
| `option` | `dictionary` | IntersectionObserver 选项 |
| `filter` | `function` | 节点过滤器 |

Observes child elements entering or leaving the viewport using `IntersectionObserver`. Automatically observes new children as they are added via an internal `MutationObserver`.

`showing(child)` and `hiding(child)` receive the affected element. Custom `adding(child, observer)` and `removing(child, observer)` hooks receive the child and the `IntersectionObserver` and own its registration. The node filter selects observed mutations; without a custom filter, only HTML elements are accepted.

Without custom adding/removing callbacks, the plugin observes added elements and unobserves removed elements.

```javascript jaml-playground
export default {
    type: 'container',
    styles: ['css(height:20rem;overflow-y:auto)'],
    plugins: [
        Plugins.observe.intersection({
            showing: (el) => (el.style.opacity = '1'),
            hiding: (el) => (el.style.opacity = '0.3'),
            option: { threshold: 0.5 }
        })
    ],
    components: [
        { type: 'wrapper', cap: 'Item 1', styles: ['css(height:10rem)'] },
        { type: 'wrapper', cap: 'Item 2', styles: ['css(height:10rem)'] },
        { type: 'wrapper', cap: 'Item 3', styles: ['css(height:10rem)'] },
        { type: 'wrapper', cap: 'Item 4', styles: ['css(height:10rem)'] }
    ]
};
```
