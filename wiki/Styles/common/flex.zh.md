# common.flex

<!-- Generated from native authoring; do not edit. -->

[English](flex.md)

`Styles.flex.*` — flexbox container properties.

---

## Variants

### `flex`

<a id="entry-flex"></a>

Flex

配置 Flex 布局参与方式、方向、换行和间距。

设置 flex、flex-wrap、flex-direction 和 gap，不建立 display:flex。

目标需要成为 Flex 容器时，使用 layout.flex；flex 本身也包含针对布局项的 flex 简写。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `flex` → `wrap` → `direction` → `gap`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `flex` | `string` | 弹性<br>flex 属性是 flex-grow、flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto；后两个属性可省略。<br>支持简写<br>`{"cssKey":"flex"}` |
| `wrap` | `string` | 换行<br>flex-wrap 属性控制 flex 容器采用单行还是多行，以及多行的换行方式。<br>选项: `nowrap` — 不换行, `wrap` — 换行, `wrap-reverse` — 换行反转<br>`{"cssKey":"flexWrap"}` |
| `direction` | `string` | 方向<br>flex-direction 属性决定主轴方向，也就是项目的排列方向。<br>选项: `row` — 水平, `row-reverse` — 水平反转, `column` — 垂直, `column-reverse` — 垂直反转<br>`{"cssKey":"flexDirection"}` |
| `gap` | `string` | 间距<br>gap 属性设置弹性布局项目之间的间距。<br>`{"cssKey":"gap"}` |

Sets flexbox layout properties on a container element.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['flex(direction:row;gap:1rem)'],
        components: [
            { type: 'label', cap: 'Item 1' },
            { type: 'label', cap: 'Item 2' }
        ]
    }
];
```

For managed divider elements between flex children, combine `flex(...)` with [`group.divider`](../group.md#groupdivider). The former `flex.seperator` variant has been removed.
