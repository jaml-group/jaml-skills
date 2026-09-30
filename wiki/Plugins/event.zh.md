# `Plugins.event`

<!-- Generated from native authoring; do not edit. -->

[English](event.md)

---

## `event.scrollProgress`

<a id="entry-event-scrollprogress"></a>

滚动进度

通过消息器发布滚动位置和当前章节。

解析滚动目标，创建消息器，并在派生键下广播比例进度及位于所配置 gap 上方的最后一个锚点。

使用可测量的滚动目标。宿主组件具有消息器时，插件复用其 broker；否则解析命名 broker，默认使用 mango，并在需要时创建该 broker。

卸载时移除监听器、已发布的键和拥有的消息器。

锚点发布值是 DOM 元素，且仅在找到锚点时发布；此插件不渲染进度指示器。

位置参数顺序: `key` → `broker` → `target` → `throttle` → `anchorSelector` → `gap`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `key` | `string` | 未提供 | 事件key |
| `broker` | `string` | 未提供 | 消息代理 |
| `target` | `any` | 未提供 | 目标 |
| `throttle` | `number` | `20` | 节流 |
| `anchorSelector` | `string` | 未提供 | 锚点选择器 |
| `gap` | `number` | `50` | 间隙 |

Tracks the scroll progress of a target element and publishes it to the messenger as a percentage (0–1). Also detects the last visible anchor element above the scroll position.

Progress is broadcast on a messenger key derived from the element's identity, and the last above anchor (if `anchorSelector` is set) is broadcast on a companion `-anchor` key. Both keys are cleaned up on unplug.

```javascript jaml-playground
export default {
    type: 'container',
    styles: ['css(height:20rem;overflow-y:auto)'],
    plugins: [
        Plugins.event.scrollProgress({
            key: 'pageProgress',
            anchorSelector: '.section'
        })
    ],
    components: [
        { type: 'wrapper', cap: 'Section 1', styles: ['css(height:15rem)'], class: 'section' },
        { type: 'wrapper', cap: 'Section 2', styles: ['css(height:15rem)'], class: 'section' },
        { type: 'wrapper', cap: 'Section 3', styles: ['css(height:15rem)'], class: 'section' }
    ]
};
```
