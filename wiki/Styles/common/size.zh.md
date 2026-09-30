# common.size

<!-- Generated from native authoring; do not edit. -->

[English](size.md)

`Styles.size.*` -- element sizing.

---

## Variants

### `size`

<a id="entry-size"></a>

尺寸

设置目标尺寸以及最小或最大限制。

size 简写只有一个值时同时提供宽度和高度；两个值时依次提供宽度和高度，并覆盖单独的 width 和 height 参数。

需要明确边界时使用显式尺寸；百分比尺寸仍取决于容器布局。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `width` → `minWidth` → `maxWidth` → `height` → `minHeight` → `maxHeight` → `size`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `width` | `string` | 宽度<br>`{"cssKey":"width"}` |
| `minWidth` | `string` | 最小宽度<br>`{"cssKey":"minWidth"}` |
| `maxWidth` | `string` | 最大宽度<br>`{"cssKey":"maxWidth"}` |
| `height` | `string` | 高度<br>`{"cssKey":"height"}` |
| `minHeight` | `string` | 最小高度<br>`{"cssKey":"minHeight"}` |
| `maxHeight` | `string` | 最大高度<br>`{"cssKey":"maxHeight"}` |
| `size` | `string` | 尺寸<br>支持简写 |

Sets element width, height, and related dimension properties.

The size shorthand overrides individual width and height values.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['size(width:300px;height:200px)']
    }
];
```

### `fullscreen`

<a id="entry-size-fullscreen"></a>

全屏

将 height 设置为 100vh，width 设置为 100vw。

视口尺寸不会添加固定定位，也不会移除周围布局间距。

Sets the element to 100vw &times; 100vh (full viewport).

### `fullsize`

<a id="entry-size-fullsize"></a>

全尺寸

将 width 和 height 设置为 100%。

两个百分比尺寸均依赖包含布局。

Sets the element to 100% width &times; 100% height of its parent.

### `fullheight`

<a id="entry-size-fullheight"></a>

全高度

将 height 设置为 100%。

需要能够解析百分比高度的包含布局。

Sets the element height to 100% of its parent.

### `fullwidth`

<a id="entry-size-fullwidth"></a>

全宽度

将 width 设置为 100%。

百分比宽度遵循包含布局；它不建立高度。

Sets the element width to 100% of its parent.

### `square`

<a id="entry-size-square"></a>

正方形

将 aspect-ratio 设置为 1 / 1。

提供可用尺寸或布局约束；显式宽高可以覆盖首选比例。

Sets aspect ratio to 1:1.
