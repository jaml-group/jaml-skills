# stylize

<!-- Generated from native authoring; do not edit. -->

[English](stylize.md)

## `stylize.bento`

<a id="entry-stylize-bento"></a>

Bento 模块

为分组中的子项提供独立的块状表面。

添加 bento-group 类，并将内边距、边框、背景和阴影变量传给分组样式表。

可配合原生 grid 或 flex 布局；此样式提供表面外观，不提供数据或导航。

当前 borderRadius 赋值使用了拼写错误的变量；依赖该覆盖值前需验证其效果。

位置参数顺序: `padding` → `borderStyle` → `borderColor` → `borderRadius` → `backgroundColor` → `backgroundImage` → `boxShadow`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `padding` | `numberOrString` | 内边距<br>Unit: `rem` |
| `borderStyle` | `string` | 边框样式<br>选项: `solid`, `dashed`, `dotted` |
| `borderColor` | `string` | 边框颜色 |
| `borderRadius` | `numberOrString` | 边框圆角<br>Unit: `rem` |
| `backgroundColor` | `string` | 背景颜色 |
| `backgroundImage` | `string` | 背景图片 |
| `boxShadow` | `string` | 阴影 |

## `stylize.oddeven`

<a id="entry-stylize-oddeven"></a>

奇偶交替

在已渲染的分组中交替使用不同表面。

应用奇偶背景变量，并在尺寸变化时重新计算渲染位置标记。

表格单元格可使用 table.stripy；此预设装饰分组子项。

位置参数顺序: `padding` → `borderRadius` → `odd` → `even`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `padding` | `numberOrString` | 内边距<br>Unit: `rem` |
| `borderRadius` | `numberOrString` | 边框圆角<br>Unit: `rem` |
| `odd` | `string` | 奇数 |
| `even` | `string` | 偶数 |

## `stylize.gridline`

<a id="entry-stylize-gridline"></a>

网格线

在分组子项周围绘制相连的网格边框。

应用 gridline 变量，并在尺寸变化时重新计算用于内外边框的渲染位置标记。

子项需已完成布局；grid 或 flex 定位需另行选择。

位置参数顺序: `padding` → `width` → `style` → `rowStyle` → `rowWidth` → `colWidth` → `colStyle` → `color` → `radius` → `backgroundColor` → `outerWidth` → `outerColor` → `outerRadius` → `outerStyle`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `padding` | `numberOrString` | 内边距<br>Unit: `rem` |
| `width` | `numberOrString` | 宽度<br>Unit: `px` |
| `style` | `string` | 样式<br>选项: `solid`, `dashed`, `dotted` |
| `rowStyle` | `string` | 行样式<br>选项: `solid`, `dashed`, `dotted` |
| `rowWidth` | `numberOrString` | 行分隔线宽度<br>Unit: `px` |
| `colWidth` | `numberOrString` | 列<br>Unit: `px` |
| `colStyle` | `string` | 列样式<br>选项: `solid`, `dashed`, `dotted` |
| `color` | `string` | 颜色 |
| `radius` | `numberOrString` | 圆角<br>Unit: `rem` |
| `backgroundColor` | `string` | 背景颜色 |
| `outerWidth` | `numberOrString` | 外框<br>Unit: `px` |
| `outerColor` | `string` | 外框颜色 |
| `outerRadius` | `numberOrString` | 外框圆角<br>Unit: `rem` |
| `outerStyle` | `string` | 外框样式<br>选项: `solid`, `dashed`, `dotted` |

## `stylize.minimalism`

<a id="entry-stylize-minimalism"></a>

分割

使用原生分隔线分隔分组的直接子内容。

在符合条件的直接子项之前维护分隔线元素，随子项增删及方向变化同步更新。图层子项和分隔线子项被排除。

通过宿主上的共享所有权保留一组分隔线；最后一个所有者移除时，会断开观察并销毁所拥有的分隔线。

绘制单元格边框可使用 group.gridline；divider 会创建实际的子元素。

位置参数顺序: `padding` → `direction` → `length` → `width` → `color` → `opacity`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `padding` | `numberOrString` | 未提供 | 内边距<br>Unit: `rem` |
| `direction` | `string` | `horizontal` | 方向<br>支持简写<br>选项: `horizontal`, `vertical` |
| `length` | `numberOrString` | 未提供 | 大小 |
| `width` | `numberOrString` | 未提供 | 宽度 |
| `color` | `string` | 未提供 | 颜色 |
| `opacity` | `number` | 未提供 | 透明度 |
