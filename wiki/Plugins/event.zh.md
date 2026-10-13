# `Plugins.event`

<!-- Generated from native authoring; do not edit. -->

[English](event.md)

---

## `event.scrollProgress`

<a id="entry-event-scrollprogress"></a>

滚动进度

通过消息器发布滚动位置和当前章节。

沿 direction 指定的轴发布比例进度和锚点，默认 y，水平滚动使用 x。updateAttr:true 时还复用滚动观察器，将四个物理溢出方向写入插件宿主，支持 overflow.css 和 overflow.direction.css，无需额外添加 interact.scrollWatcher。默认不发布属性。同一目标的订阅者共享一个滚动监听器和一组观察器。

使用可测量的滚动目标。宿主组件具有消息器时，插件复用其 broker；否则解析命名 broker，默认使用 mango，并在需要时创建该 broker。

卸载时释放共享目标订阅、已发布的键和拥有的消息器；启用属性发布时按所有权规则恢复属性，原有 scrolled 类保留既定卸载行为。其他订阅者仍可继续观察同一目标。

锚点发布值是 DOM 元素，且仅在找到锚点时发布；此插件不渲染进度指示器。 进度使用原始轴偏移，因此 RTL、反向起点或弹性越界可能产生 0–1 以外的值。锚点偏移顺序不对反向起点归一化；溢出方向标记独立进行归一化。

位置参数顺序: `key` → `broker` → `target` → `throttle` → `anchorSelector` → `gap` → `direction` → `updateAttr`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `key` | `string` | 未提供 | 事件key |
| `broker` | `string` | 未提供 | 消息代理 |
| `target` | `any` | 未提供 | 目标 |
| `throttle` | `number` | `20` | 节流 |
| `anchorSelector` | `string` | 未提供 | 锚点选择器 |
| `gap` | `number` | `50` | 间隙 |
| `direction` | `string` | `y` | 进度和锚点轴（默认 y）<br>选项: `x`, `y` |
| `updateAttr` | `boolean` | `false` | 在宿主上发布溢出状态（默认 false） |

Publishes fractional scroll progress along `direction: 'y'` by default; use `'x'` for horizontal progress and anchor tracking. Progress retains the raw selected-axis offset divided by its scrollable extent: it is normally 0–1, but negative-origin or elastic scrolling can produce values outside that range. Anchor lookup retains the existing offset-based calculation on the selected axis; reversed-origin anchor ordering is not normalized.

Progress is broadcast on a messenger key derived from the element's identity, and the last above anchor (if `anchorSelector` is set) is broadcast on a companion `-anchor` key. Both keys are cleaned up on unplug.

With `updateAttr: true` (default `false`), the plugin also publishes attributes through its watcher subscription: it measures `target` and publishes `jam-overflow` direction tokens on the plugin host. All four physical edges are published regardless of `direction`; that option selects only progress and anchor coordinates, so `overflow.css(...)` and `overflow.left/right/top/bottom.css(...)` work without adding a second watcher. State refreshes on scrolling and observed layout/content changes; progress broadcasts keep their existing scroll-event throttle. The event plugin, `interact.scrollWatcher` and table progress share one scroll listener per target. Unplug releases its subscription and attribute ownership, restoring the preceding overflow attribute when applicable.

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
