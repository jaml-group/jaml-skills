# `Plugins.interact`

<!-- Generated from native authoring; do not edit. -->

[English](interact-plugins.md)

---

## `interact.draggable`

<a id="entry-interact-draggable"></a>

可拖拽

使用原生 HTML 拖放，从宿主或匹配的后代元素传递数据。

启用浏览器拖拽，并将 data 回调返回的真值写为 application/json。使用 selector 时，会为现有匹配后代启用拖拽；对每个 beforechildadd 事件，仅检查第一个子元素，并在匹配时为其启用拖拽。

提供浏览器拖拽源，以及返回预期载荷的 data 回调。通过 selector 发现后续子元素依赖宿主触发 beforechildadd。

与 interact.droppable 配合传递数据。移动宿主位置使用 interact.movable 样式；调整同级项顺序使用 interact.sortable。

不会改变布局坐标或更新集合顺序。宿主已启用 draggable 时，接入操作不会改动它。撤销会清除 draggable 状态，但辅助方法不会移除先前注册的拖拽监听器。

位置参数顺序: `data` → `selector` → `dragstart` → `dragend`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `data` | `function` | 数据 |
| `selector` | `string` | 选择器 |
| `dragstart` | `function` | 拖拽开始 |
| `dragend` | `function` | 拖拽结束 |

Makes an element a drag source for HTML5 native drag-and-drop. If a `selector` is provided, child elements matching it become draggable instead.

A selector makes matching children draggable instead of the host element.

```javascript jaml-playground
export default {
    type: 'wrapper',
    cap: 'Drag Source',
    styles: ['css(padding:1rem)'],
    plugins: [
        Plugins.interact.draggable({
            data: () => ({ id: 'item-1', name: 'Widget' })
        })
    ],
    components: [{ type: 'badge', cap: 'Drag me', icon: '↕' }]
};
```

---

## `interact.droppable`

<a id="entry-interact-droppable"></a>

放置目标

使用浏览器原生放置目标接收数据并运行应用处理函数。

注册放置区域，并为接受的拖拽显示幕层提示。在该幕层上放下时，将从 application/json 或 text/plain 解码的数据交给 dataHandler；handler 接收放置事件，其 data 属性提供该载荷。

使用有可见目标的浏览器放置流程。accept 在 dragenter 时接收 DragEvent，决定是否显示提示幕层；它不是载荷校验器，也不是 drop 时的二次授权检查。当前非函数 accept 值会回退为接受拖拽。

与 interact.draggable 配合传递应用内数据，其 data 回调返回记录，由拖拽助手负责序列化。由 dataHandler 校验接收的载荷并更新应用状态。服务端校验、授权和持久化仍由应用及后端负责；调整同级项顺序使用 sortable。

它不是文件导入器，也不是安全边界。不会自动移动节点、持久化数据或提供键盘拖放。移除插件会注销放置区域；文档拖拽监听器仍为共享监听器。

位置参数顺序: `dataHandler` → `handler` → `accept` → `prompt`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `dataHandler` | `function` | (data: any) => void；普通函数的 this 是放置区域元素。在提示幕层上放下后，接收解码的 application/json 数据，否则读取 text/plain。使用前应校验载荷结构。 |
| `handler` | `function` | (event: DragEvent & { data: any }) => void；普通函数的 this 是放置区域元素。在 dataHandler 之后执行，event.data 提供解码后的载荷。 |
| `accept` | `functionOrAny` | (event: DragEvent) => boolean；普通函数的 this 是放置区域元素。在 dragenter 阶段检查 event.dataTransfer 的类型，此参数不是解码后的载荷。省略或传入非函数值（包括 MIME 数组和 false）均接受所有拖拽。 |
| `prompt` | `string` | 提示 |

Makes an element a drop target for HTML5 native drag-and-drop.

`accept(event)` inspects a `DragEvent` during `dragenter` to decide whether to show the drop curtain. `dataHandler(data)` receives decoded data after a drop on that curtain; `handler(event)` then receives the event with decoded `event.data`. Normal functions receive the drop-zone element as `this`. MIME arrays, `false` and other non-function `accept` values currently accept all drags; use a function for filtering. The acceptance prompt is not an authorization boundary or a second payload check at drop time.

The producer returns an object; the draggable helper serializes it. This example permits JSON drag types and validates the decoded record before changing app state. The second source is deliberately rejected by the payload handler even though its MIME type is accepted. Server-side validation, authorization and persistence remain separate application responsibilities.

```javascript jaml-playground
export default {
    type: 'container',
    vars: { received: 'Nothing received' },
    components: [
        {
            type: 'button',
            cap: 'Drag valid item',
            plugins: [Plugins.interact.draggable({ data: () => ({ kind: 'item', id: 'item-1' }) })]
        },
        {
            type: 'button',
            cap: 'Drag invalid item',
            plugins: [Plugins.interact.draggable({ data: () => ({ kind: 'other' }) })]
        },
        {
            type: 'container',
            cap: 'Drop here',
            styles: ['css(padding:2rem;border:2px dashed hsl(0 0% 65%);border-radius:1rem)'],
            plugins: [
                Plugins.interact.droppable({
                    accept(event) {
                        return Array.from(event.dataTransfer?.types ?? []).includes('application/json');
                    },
                    dataHandler(data) {
                        if (data?.kind !== 'item' || typeof data.id !== 'string') {
                            return;
                        }
                        this.vars.received = data.id;
                    }
                })
            ]
        },
        { type: 'label', cap: '{{received}}' }
    ]
};
```
