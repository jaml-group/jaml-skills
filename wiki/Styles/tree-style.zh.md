# tree styles

<!-- Generated from native authoring; do not edit. -->

[English](tree-style.md)

`Styles.tree.*` styles the [tree element](../JAM-UI/tree.md). Trees use the table theme tokens and hide the table header by default.

## Variants

| Style | Description |
|---|---|
| `tree.stretchrow` | Stretch node rows |
| `tree.stripy` | Alternating node backgrounds |
| `tree.gridline` | Grid lines and outline |
| `tree.bento` | Spaced rounded rows |
| `tree.fixednodeheight` | Fixed-height node rows with virtual scrolling |
| `tree.hovermarker` | Hover outline |
| `tree.hoverhighlight` | Hover background |
| `tree.td.*` / `tree.tdslot.*` | Node-cell and body-slot styles |

These variants share arguments with their [table equivalents](./table-style.md); `fixednodeheight` corresponds to `table.fixedrowheight`.

```javascript jaml-playground
export default {
    type: 'tree-checkbox',
    styles: ['tree.stripy', 'tree.gridline', 'tree.fixednodeheight(height:2.5rem)'],
    data: [
        {
            id: 'plant',
            name: 'Plant',
            children: [
                { id: 'pump', name: 'Pump' },
                { id: 'valve', name: 'Valve' }
            ]
        }
    ]
};
```

## `tree.grid`

<a id="entry-tree-grid"></a>

网格

为路径选中的目标配置网格相关参数。

将 templateColumns、templateRows、autoColumns、autoRows 和 templateAreas 映射到对应的 CSS 网格属性；gap 保持为 gap，area 使用 gridArea，除非所属路径覆盖其 CSS 键。

另行在网格容器上设置 display:grid，例如使用 css(display:grid)。使用 grid.area 显式指定网格项的行列位置。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `templateColumns` → `templateRows` → `autoColumns` → `autoRows` → `templateAreas` → `gap` → `area`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `templateColumns` | `string` | 列模板 |
| `templateRows` | `string` | 行模板 |
| `autoColumns` | `string` | 自动列 |
| `autoRows` | `string` | 自动行 |
| `templateAreas` | `string` | 模板区域 |
| `gap` | `string` | 间隙 |
| `area` | `string` | 网格区域<br>`{"cssKey":"gridArea"}` |

## `tree.text`

<a id="entry-tree-text"></a>

字体族

为路径选中的目标配置字体排版。

映射字体、字号、字重、样式、装饰、间距、阴影、对齐、换行、行高、选择、缩进、光标和前景色字段；icon 路径使用自己的字体和阴影键。

字体排版选择 text，盒对齐选择 layout 或 align；包装元素需要保留几何结构时，针对插槽内容设置样式。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `font` → `size` → `weight` → `style` → `decoration` → `spacing` → `shadow` → `align` → `whitespace` → `lineheight` → `userselect` → `indent` → `caretColor` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `font` | `string` | 字体族<br>`{"cssKey":"fontFamily"}` |
| `size` | `string` | 大小<br>`{"cssKey":"fontSize"}` |
| `weight` | `string` | 字重<br>选项: `normal` — 正常, `bold` — 粗体<br>`{"cssKey":"fontWeight"}` |
| `style` | `string` | 样式<br>选项: `normal` — 正常, `italic` — 斜体<br>`{"cssKey":"fontStyle"}` |
| `decoration` | `string` | 装饰<br>选项: `none` — 无, `underline` — 下划线<br>`{"cssKey":"textDecoration"}` |
| `spacing` | `string` | 间距<br>`{"cssKey":"letterSpacing"}` |
| `shadow` | `string` | 阴影<br>`{"cssKey":"textShadow"}` |
| `align` | `string` | 对齐<br>选项: `left` — 左对齐, `center` — 居中, `right` — 右对齐<br>`{"cssKey":"textAlign"}` |
| `whitespace` | `string` | 空白处理<br>选项: `normal` — 正常, `nowrap` — 不换行, `pre` — 保留空白<br>`{"cssKey":"whiteSpace"}` |
| `lineheight` | `string` | 行高<br>选项: `normal` — 正常, `1` — 紧凑, `1.5` — 松散<br>`{"cssKey":"lineHeight"}` |
| `userselect` | `string` | 用户选择<br>选项: `auto` — 自动, `none` — 无<br>`{"cssKey":"userSelect"}` |
| `indent` | `string` | 缩进<br>`{"cssKey":"textIndent"}` |
| `caretColor` | `string` | 光标颜色<br>`{"cssKey":"caretColor"}` |
| `color` | `string` | 文本颜色<br>`{"cssKey":"color"}` |

## `tree.bento`

<a id="entry-tree-bento"></a>

便当式表格

以瓷砖般的间距分隔表格或树单元格。

添加 bento，并写入原生表格样式使用的 margin 和 radius 变量。

此版本的公开参数拼写为 borderRaidus；调用时保留该拼写。

位置参数顺序: `margin` → `borderRaidus`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `margin` | `numberOrString` | `var(--jam-space-xs)` | 外边距<br>Unit: `rem` |
| `borderRaidus` | `numberOrString` | `var(--jam-border-radius-s)` | 圆角<br>Unit: `rem` |

## `tree.color`

<a id="entry-tree-color"></a>

颜色

为路径选中的目标设置前景色。

通过依赖路径的样式方式转发 color 和可选的颜色通道参数。

使用语义化颜色预设实现随主题变化的前景色角色；根路径 color.accent 具有独立的颜色配置契约。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `h` → `s` → `l` → `a` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `h` | `numberOrString` | 色相 |
| `s` | `numberOrString` | 饱和度 |
| `l` | `numberOrString` | 亮度 |
| `a` | `numberOrString` | 透明度 |
| `color` | `string` | 颜色<br>支持简写 |

## `tree.inline`

<a id="entry-tree-inline"></a>

行内布局

使选中的目标使用框架的内联外观。

为路径选中的目标添加 jam-inline。

所选组件或目标的样式表必须实现 inline 类。

这是类名约定，不是无条件的内联显示声明。

## `tree.stripy`

<a id="entry-tree-stripy"></a>

斑马纹

为表格或树应用交替行表面。

添加 stripy，并公开独立的奇偶单元格背景变量。

位置参数顺序: `odd` → `even`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `odd` | `string` | 奇数行背景 |
| `even` | `string` | 偶数行背景 |

## `tree.gridline`

<a id="entry-tree-gridline"></a>

网格线

在表格或树单元格周围绘制行列边框。

通过原生表格 CSS 应用 gridline、neck 处理以及独立的内外边框变量。

分隔瓷砖使用 bento，交替行表面使用 stripy；此预设不改变数据模型。

位置参数顺序: `rowWidth` → `colWidth` → `color` → `outlineWidth` → `outlineColor` → `neck`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `rowWidth` | `numberOrString` | 未提供 | 行分隔线宽度<br>Unit: `px` |
| `colWidth` | `numberOrString` | 未提供 | 列<br>Unit: `px` |
| `color` | `string` | 未提供 | 颜色 |
| `outlineWidth` | `numberOrString` | 未提供 | 外框<br>Unit: `px` |
| `outlineColor` | `string` | 未提供 | 外框颜色 |
| `neck` | `string` | `small` | 连接颈部<br>选项: `auto`, `small`, `none` |

## `tree.stretchrow`

<a id="entry-tree-stretchrow"></a>

拉伸行

在 body 布局内拉伸原生表格或树的行。

添加 stretch-row，供原生表格模板的行尺寸规则使用。

这是尺寸设置，不是固定高度虚拟化；需要虚拟化时选择 fixedrowheight 或 fixednodeheight。

## `tree.hovermarker`

<a id="entry-tree-hovermarker"></a>

悬停标记

为树添加移动的悬停标记。

跟踪原生单元格，并显示水平轴、垂直轴或单元格边框定位标记；离开时清除标记和悬停坐标。

需要原生表格或树的 body 及单元格元数据。

移除时分离悬停监听器，并移除拥有的定位标记。

视觉悬停标记不会选择行，也不会持久保存当前单元格。

位置参数顺序: `type` → `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `type` | `string` | `row` | 标记类型<br>选项: `row`, `column`, `td` |
| `size` | `number` | 未提供 | 继承的十字定位器尺寸，单位为像素；值为零时根据目标几何推导尺寸。树悬停标记使用行列箭头或单元格边框，其原生样式不使用此角标尺寸设置。 |
| `width` | `numberOrString` | `auto` | 单元格边框的轮廓宽度。auto 读取目标边框宽度，最小为 2 像素。行列箭头标记不使用此宽度设置。 |
| `bias` | `number` | `0` | 定位器边缘相对于目标边界的偏移，单位为像素。 |
| `glow` | `number` | `0` | 定位器光晕模糊半径，单位为像素。大于零的值启用光晕；零则禁用光晕。 |
| `radius` | `numberOrString` | `auto` | 定位器圆角半径；auto 读取目标圆角。 |
| `delay` | `number` | `0` | 更新悬停标记前的延迟，单位为毫秒；后续 show 会取消待执行的延迟更新。 |
| `breathe` | `boolean` | `false` | 标记更新时启动继承的定位器呼吸计时器。其原生呼吸动画仅为十字定位器实现，因此不会使此样式的行列箭头或单元格边框产生动画。 |
| `container` | `any` | 未提供 | 请求使用的定位器容器。此标记初始化自身的表格 wrapper，其优先级高于此参数。 |
| `clipTarget` | `any` | 未提供 | 定位器没有内置裁剪目标时使用的可选裁剪目标。行和单元格标记使用表格 body。 |
| `easing` | `string` | 未提供 | 定位器移动和几何过渡使用的时间函数。 |
| `duration` | `number` | 未提供 | 定位器移动和几何过渡的持续时间，单位为毫秒。 |

## `tree.hoverhighlight`

<a id="entry-tree-hoverhighlight"></a>

悬停高亮

高亮指针下的行，并可同时高亮其列。

将原生单元格元数据跟踪到 hoveringRow 和 hoveringCol，并设置悬停和激活颜色变量；离开宿主时清除跟踪位置。

使用带有行列元数据的原生表格或树单元格。

这是悬停反馈，不是行选择或键盘导航。

位置参数顺序: `color` → `active` → `overlay` → `column`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `color` | `string` | `hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 0.15), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 5), 0.025)` | 颜色<br>支持简写 |
| `active` | `string` | 未提供 | 激活颜色 |
| `overlay` | `boolean` | `true` | 覆盖 |
| `column` | `boolean` | `false` | 列也高亮 |

## `tree.fixednodeheight`

<a id="entry-tree-fixednodeheight"></a>

固定节点高度

虚拟化固定高度的树行。

通过 SaigonScroll 使用原生树行提供器和 body 滚动插槽；预留行高，并可为已挂载单元格添加动画。展开的详情行会禁用固定虚拟路径。

需要有界的 body 视口和稳定的已配置行高。

使用受支持的动画名称字符串或 false；当前动画回调会对真值调用字符串方法。可变高度详情不使用相同的固定行虚拟化路径。

位置参数顺序: `scrollTarget` → `height` → `throttle` → `padding` → `getChildrenByRow` → `getRowNum` → `animation` → `easing` → `duration` → `tileduration` → `tilerandom` → `defaultDirection`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `scrollTarget` | `string` | 未提供 | 滚动目标 |
| `height` | `numberOrString` | `2.5` | 行高<br>Unit: `rem`<br>支持简写 |
| `throttle` | `number` | 未提供 | 节流 |
| `padding` | `number` | 未提供 | 额外渲染行数 |
| `getChildrenByRow` | `function` | 未提供 | 获取子元素 |
| `getRowNum` | `function` | 未提供 | 获取行数 |
| `animation` | `booleanOrString` | `fade-in-` | 动画 |
| `easing` | `string` | `ease` | 缓动<br>选项: `linear`, `ease`, `easeIn`, `easeOut`, `easeInOut`, `boing`, `urging`, `bouncing`, `decelerate`, `accelerate`, `smooth`, `sine`, `sineIn`, `sineOut`, `sineInOut`, `crisp`, `overshoot`, `runup`, `quartOut`, `velvet`, `gear`, `plateau` |
| `duration` | `number` | `400` | 动画时长<br>Unit: `ms` |
| `tileduration` | `number` | `0` | 砖块式动画时长 |
| `tilerandom` | `boolean` | `false` | 砖块随机排列 |
| `defaultDirection` | `string` | `up` | 默认方向<br>选项: `up`, `down`, `right`, `left` |

## `tree.td.text`

<a id="entry-tree-td-text"></a>

字体族

为路径选中的目标配置字体排版。

映射字体、字号、字重、样式、装饰、间距、阴影、对齐、换行、行高、选择、缩进、光标和前景色字段；icon 路径使用自己的字体和阴影键。

字体排版选择 text，盒对齐选择 layout 或 align；包装元素需要保留几何结构时，针对插槽内容设置样式。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `font` → `size` → `weight` → `style` → `decoration` → `spacing` → `shadow` → `align` → `whitespace` → `lineheight` → `userselect` → `indent` → `caretColor` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `font` | `string` | 字体族<br>`{"cssKey":"fontFamily"}` |
| `size` | `string` | 大小<br>`{"cssKey":"fontSize"}` |
| `weight` | `string` | 字重<br>选项: `normal` — 正常, `bold` — 粗体<br>`{"cssKey":"fontWeight"}` |
| `style` | `string` | 样式<br>选项: `normal` — 正常, `italic` — 斜体<br>`{"cssKey":"fontStyle"}` |
| `decoration` | `string` | 装饰<br>选项: `none` — 无, `underline` — 下划线<br>`{"cssKey":"textDecoration"}` |
| `spacing` | `string` | 间距<br>`{"cssKey":"letterSpacing"}` |
| `shadow` | `string` | 阴影<br>`{"cssKey":"textShadow"}` |
| `align` | `string` | 对齐<br>选项: `left` — 左对齐, `center` — 居中, `right` — 右对齐<br>`{"cssKey":"textAlign"}` |
| `whitespace` | `string` | 空白处理<br>选项: `normal` — 正常, `nowrap` — 不换行, `pre` — 保留空白<br>`{"cssKey":"whiteSpace"}` |
| `lineheight` | `string` | 行高<br>选项: `normal` — 正常, `1` — 紧凑, `1.5` — 松散<br>`{"cssKey":"lineHeight"}` |
| `userselect` | `string` | 用户选择<br>选项: `auto` — 自动, `none` — 无<br>`{"cssKey":"userSelect"}` |
| `indent` | `string` | 缩进<br>`{"cssKey":"textIndent"}` |
| `caretColor` | `string` | 光标颜色<br>`{"cssKey":"caretColor"}` |
| `color` | `string` | 文本颜色<br>`{"cssKey":"color"}` |

## `tree.td.color`

<a id="entry-tree-td-color"></a>

颜色

为路径选中的目标设置前景色。

通过依赖路径的样式方式转发 color 和可选的颜色通道参数。

使用语义化颜色预设实现随主题变化的前景色角色；根路径 color.accent 具有独立的颜色配置契约。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `h` → `s` → `l` → `a` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `h` | `numberOrString` | 色相 |
| `s` | `numberOrString` | 饱和度 |
| `l` | `numberOrString` | 亮度 |
| `a` | `numberOrString` | 透明度 |
| `color` | `string` | 颜色<br>支持简写 |

## `tree.icon.text`

<a id="entry-tree-icon-text"></a>

字体族

为路径选中的目标配置字体排版。

映射字体、字号、字重、样式、装饰、间距、阴影、对齐、换行、行高、选择、缩进、光标和前景色字段；icon 路径使用自己的字体和阴影键。

字体排版选择 text，盒对齐选择 layout 或 align；包装元素需要保留几何结构时，针对插槽内容设置样式。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `font` → `size` → `weight` → `style` → `decoration` → `spacing` → `shadow` → `align` → `whitespace` → `lineheight` → `userselect` → `indent` → `caretColor` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `font` | `string` | 字体族 |
| `size` | `string` | 大小<br>`{"cssKey":"fontSize"}` |
| `weight` | `string` | 字重<br>选项: `normal` — 正常, `bold` — 粗体<br>`{"cssKey":"fontWeight"}` |
| `style` | `string` | 样式<br>选项: `normal` — 正常, `italic` — 斜体<br>`{"cssKey":"fontStyle"}` |
| `decoration` | `string` | 装饰<br>选项: `none` — 无, `underline` — 下划线<br>`{"cssKey":"textDecoration"}` |
| `spacing` | `string` | 间距<br>`{"cssKey":"letterSpacing"}` |
| `shadow` | `string` | 阴影 |
| `align` | `string` | 对齐<br>选项: `left` — 左对齐, `center` — 居中, `right` — 右对齐<br>`{"cssKey":"textAlign"}` |
| `whitespace` | `string` | 空白处理<br>选项: `normal` — 正常, `nowrap` — 不换行, `pre` — 保留空白<br>`{"cssKey":"whiteSpace"}` |
| `lineheight` | `string` | 行高<br>选项: `normal` — 正常, `1` — 紧凑, `1.5` — 松散<br>`{"cssKey":"lineHeight"}` |
| `userselect` | `string` | 用户选择<br>选项: `auto` — 自动, `none` — 无<br>`{"cssKey":"userSelect"}` |
| `indent` | `string` | 缩进<br>`{"cssKey":"textIndent"}` |
| `caretColor` | `string` | 光标颜色<br>`{"cssKey":"caretColor"}` |
| `color` | `string` | 文本颜色 |

## `tree.td.inline`

<a id="entry-tree-td-inline"></a>

行内布局

使选中的目标使用框架的内联外观。

为路径选中的目标添加 jam-inline。

所选组件或目标的样式表必须实现 inline 类。

这是类名约定，不是无条件的内联显示声明。

## `tree.text.mono`

<a id="entry-tree-text-mono"></a>

等宽字体

为路径选中的目标使用主题的等宽字体族。

嵌套的 text.mono 预设选择 sys.typography.fontFamily.mono。

根路径 text.mono 扩展改为使用通用的 monospace 字体族。这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `tree.tdslot.text`

<a id="entry-tree-tdslot-text"></a>

字体族

为路径选中的目标配置字体排版。

映射字体、字号、字重、样式、装饰、间距、阴影、对齐、换行、行高、选择、缩进、光标和前景色字段；icon 路径使用自己的字体和阴影键。

字体排版选择 text，盒对齐选择 layout 或 align；包装元素需要保留几何结构时，针对插槽内容设置样式。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `font` → `size` → `weight` → `style` → `decoration` → `spacing` → `shadow` → `align` → `whitespace` → `lineheight` → `userselect` → `indent` → `caretColor` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `font` | `string` | 字体族<br>`{"cssKey":"fontFamily"}` |
| `size` | `string` | 大小<br>`{"cssKey":"fontSize"}` |
| `weight` | `string` | 字重<br>选项: `normal` — 正常, `bold` — 粗体<br>`{"cssKey":"fontWeight"}` |
| `style` | `string` | 样式<br>选项: `normal` — 正常, `italic` — 斜体<br>`{"cssKey":"fontStyle"}` |
| `decoration` | `string` | 装饰<br>选项: `none` — 无, `underline` — 下划线<br>`{"cssKey":"textDecoration"}` |
| `spacing` | `string` | 间距<br>`{"cssKey":"letterSpacing"}` |
| `shadow` | `string` | 阴影<br>`{"cssKey":"textShadow"}` |
| `align` | `string` | 对齐<br>选项: `left` — 左对齐, `center` — 居中, `right` — 右对齐<br>`{"cssKey":"textAlign"}` |
| `whitespace` | `string` | 空白处理<br>选项: `normal` — 正常, `nowrap` — 不换行, `pre` — 保留空白<br>`{"cssKey":"whiteSpace"}` |
| `lineheight` | `string` | 行高<br>选项: `normal` — 正常, `1` — 紧凑, `1.5` — 松散<br>`{"cssKey":"lineHeight"}` |
| `userselect` | `string` | 用户选择<br>选项: `auto` — 自动, `none` — 无<br>`{"cssKey":"userSelect"}` |
| `indent` | `string` | 缩进<br>`{"cssKey":"textIndent"}` |
| `caretColor` | `string` | 光标颜色<br>`{"cssKey":"caretColor"}` |
| `color` | `string` | 文本颜色<br>`{"cssKey":"color"}` |

## `tree.color.accent`

<a id="entry-tree-color-accent"></a>

强调色

根据路径选择强调的前景色或强调色前景。

color.strong 使用 strong 前景色变量；嵌套的 color.accent 使用 primary 前景色变量，并添加 colored 类。

两者是不同的角色。根路径 color.accent 具有独立的颜色配置行为，不属于此共享预设组。

## `tree.tdslot.color`

<a id="entry-tree-tdslot-color"></a>

颜色

为路径选中的目标设置前景色。

通过依赖路径的样式方式转发 color 和可选的颜色通道参数。

使用语义化颜色预设实现随主题变化的前景色角色；根路径 color.accent 具有独立的颜色配置契约。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `h` → `s` → `l` → `a` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `h` | `numberOrString` | 色相 |
| `s` | `numberOrString` | 饱和度 |
| `l` | `numberOrString` | 亮度 |
| `a` | `numberOrString` | 透明度 |
| `color` | `string` | 颜色<br>支持简写 |

## `tree.tdslot.inline`

<a id="entry-tree-tdslot-inline"></a>

行内布局

使选中的目标使用框架的内联外观。

为路径选中的目标添加 jam-inline。

所选组件或目标的样式表必须实现 inline 类。

这是类名约定，不是无条件的内联显示声明。

## `tree.tdslot.layout`

<a id="entry-tree-tdslot-layout"></a>

布局

调整布局属性，不切换到专门的布局预设。

按提供的参数设置 display、position、order、overflow、gap、堆叠、盒尺寸计算、transform 和 transition。

专门的布局契约使用 layout.grid 或 layout.flex；应与移动或滚动管理者协调 transform 和 overflow。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `display` | `string` | 显示方式<br>`{"cssKey":"display"}` |
| `position` | `string` | 位置<br>`{"cssKey":"position"}` |
| `order` | `number` | 排序<br>`{"cssKey":"order"}` |
| `overflow` | `string` | 溢出<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | 间隙 |
| `zIndex` | `number` | 层级<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | 盒模型<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | 变换<br>`{"cssKey":"transform"}` |
| `transition` | `string` | 过渡<br>`{"cssKey":"transition"}` |

## `tree.capslot.layout`

<a id="entry-tree-capslot-layout"></a>

布局

调整布局属性，不切换到专门的布局预设。

按提供的参数设置 display、position、order、overflow、gap、堆叠、盒尺寸计算、transform 和 transition。

专门的布局契约使用 layout.grid 或 layout.flex；应与移动或滚动管理者协调 transform 和 overflow。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `display` | `string` | 显示方式<br>`{"cssKey":"display"}` |
| `position` | `string` | 位置<br>`{"cssKey":"position"}` |
| `order` | `number` | 排序<br>`{"cssKey":"order"}` |
| `overflow` | `string` | 溢出<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | 间隙 |
| `zIndex` | `number` | 层级<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | 盒模型<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | 变换<br>`{"cssKey":"transform"}` |
| `transition` | `string` | 过渡<br>`{"cssKey":"transition"}` |

## `tree.background.tint`

<a id="entry-tree-background-tint"></a>

染色

根据 sys.color.tint.default 设置 background-color。

将填充与适合该表面的前景色角色配合使用。根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `tree.iconslot.layout`

<a id="entry-tree-iconslot-layout"></a>

布局

调整布局属性，不切换到专门的布局预设。

按提供的参数设置 display、position、order、overflow、gap、堆叠、盒尺寸计算、transform 和 transition。

专门的布局契约使用 layout.grid 或 layout.flex；应与移动或滚动管理者协调 transform 和 overflow。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `display` | `string` | 显示方式<br>`{"cssKey":"display"}` |
| `position` | `string` | 位置<br>`{"cssKey":"position"}` |
| `order` | `number` | 排序<br>`{"cssKey":"order"}` |
| `overflow` | `string` | 溢出<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | 间隙 |
| `zIndex` | `number` | 层级<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | 盒模型<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | 变换<br>`{"cssKey":"transform"}` |
| `transition` | `string` | 过渡<br>`{"cssKey":"transition"}` |

## `tree.extraslot.layout`

<a id="entry-tree-extraslot-layout"></a>

布局

调整布局属性，不切换到专门的布局预设。

按提供的参数设置 display、position、order、overflow、gap、堆叠、盒尺寸计算、transform 和 transition。

专门的布局契约使用 layout.grid 或 layout.flex；应与移动或滚动管理者协调 transform 和 overflow。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `display` | `string` | 显示方式<br>`{"cssKey":"display"}` |
| `position` | `string` | 位置<br>`{"cssKey":"position"}` |
| `order` | `number` | 排序<br>`{"cssKey":"order"}` |
| `overflow` | `string` | 溢出<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | 间隙 |
| `zIndex` | `number` | 层级<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | 盒模型<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | 变换<br>`{"cssKey":"transform"}` |
| `transition` | `string` | 过渡<br>`{"cssKey":"transition"}` |

## `tree.labelslot.layout`

<a id="entry-tree-labelslot-layout"></a>

布局

调整布局属性，不切换到专门的布局预设。

按提供的参数设置 display、position、order、overflow、gap、堆叠、盒尺寸计算、transform 和 transition。

专门的布局契约使用 layout.grid 或 layout.flex；应与移动或滚动管理者协调 transform 和 overflow。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `display` | `string` | 显示方式<br>`{"cssKey":"display"}` |
| `position` | `string` | 位置<br>`{"cssKey":"position"}` |
| `order` | `number` | 排序<br>`{"cssKey":"order"}` |
| `overflow` | `string` | 溢出<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | 间隙 |
| `zIndex` | `number` | 层级<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | 盒模型<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | 变换<br>`{"cssKey":"transform"}` |
| `transition` | `string` | 过渡<br>`{"cssKey":"transition"}` |

## `tree.text.size.l`

<a id="entry-tree-text-size-l"></a>

大

gap.l、margin.l 和 padding.l 使用 l 间距变量；text.size.l 使用 l 字号变量；border.l 只设置边框宽度；shadow.l 和 shadow.primary.l 设置盒阴影。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `tree.text.size.m`

<a id="entry-tree-text-size-m"></a>

中等

gap.m、margin.m 和 padding.m 使用 m 间距变量；text.size.m 使用 m 字号变量；border.m 只设置边框宽度；shadow.m 和 shadow.primary.m 设置盒阴影；shadow.text.m 和 shadow.text.primary.m 设置文本阴影；border.default 设置 xs 宽度的实线 surface-default 边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `tree.text.size.s`

<a id="entry-tree-text-size-s"></a>

小

gap.s、margin.s 和 padding.s 使用 s 间距变量；text.size.s 使用 s 字号变量；border.s 只设置边框宽度；shadow.s 和 shadow.primary.s 设置盒阴影；shadow.text.s 和 shadow.text.primary.s 设置文本阴影；border.faint 和 border.muted 设置 xs 宽度的实线轮廓角色边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `tree.td.text.mono`

<a id="entry-tree-td-text-mono"></a>

等宽字体

为路径选中的目标使用主题的等宽字体族。

嵌套的 text.mono 预设选择 sys.typography.fontFamily.mono。

根路径 text.mono 扩展改为使用通用的 monospace 字体族。这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `tree.text.size.xl`

<a id="entry-tree-text-size-xl"></a>

极大

gap.xl、margin.xl 和 padding.xl 使用 xl 间距变量；text.size.xl 使用 xl 字号变量；border.xl 只设置边框宽度；shadow.xl 和 shadow.primary.xl 设置盒阴影。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `tree.text.size.xs`

<a id="entry-tree-text-size-xs"></a>

极小

gap.xs、margin.xs 和 padding.xs 使用 xs 间距变量；text.size.xs 使用 xs 字号变量；border.xs 只设置边框宽度；shadow.xs 和 shadow.primary.xs 设置盒阴影；shadow.text.xs 和 shadow.text.primary.xs 设置文本阴影；border.subtle 设置 xs 宽度的实线 outline-subtle 边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `tree.text.size.3xl`

<a id="entry-tree-text-size-3xl"></a>

三倍特大

将主题的 3xl 字号应用于选中的内容。

根据 sys.typography.fontSize.3xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `tree.text.size.4xl`

<a id="entry-tree-text-size-4xl"></a>

四倍特大

将主题的 4xl 字号应用于选中的内容。

根据 sys.typography.fontSize.4xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `tree.text.size.xxl`

<a id="entry-tree-text-size-xxl"></a>

超大

gap.xxl、margin.xxl 和 padding.xxl 使用 xxl 间距变量；text.size.xxl 使用 xxl 字号变量。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `tree.text.size.xxs`

<a id="entry-tree-text-size-xxs"></a>

超小

gap.xxs、margin.xxs 和 padding.xxs 使用 xxs 间距变量；text.size.xxs 使用 xxs 字号变量。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `tree.td.color.accent`

<a id="entry-tree-td-color-accent"></a>

强调色

根据路径选择强调的前景色或强调色前景。

color.strong 使用 strong 前景色变量；嵌套的 color.accent 使用 primary 前景色变量，并添加 colored 类。

两者是不同的角色。根路径 color.accent 具有独立的颜色配置行为，不属于此共享预设组。

## `tree.tdslot.text.mono`

<a id="entry-tree-tdslot-text-mono"></a>

等宽字体

为路径选中的目标使用主题的等宽字体族。

嵌套的 text.mono 预设选择 sys.typography.fontFamily.mono。

根路径 text.mono 扩展改为使用通用的 monospace 字体族。这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `tree.td.background.tint`

<a id="entry-tree-td-background-tint"></a>

染色

根据 sys.color.tint.default 设置 background-color。

将填充与适合该表面的前景色角色配合使用。根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `tree.tdslot.color.accent`

<a id="entry-tree-tdslot-color-accent"></a>

强调色

根据路径选择强调的前景色或强调色前景。

color.strong 使用 strong 前景色变量；嵌套的 color.accent 使用 primary 前景色变量，并添加 colored 类。

两者是不同的角色。根路径 color.accent 具有独立的颜色配置行为，不属于此共享预设组。

## `tree.tdslot.background.tint`

<a id="entry-tree-tdslot-background-tint"></a>

染色

根据 sys.color.tint.default 设置 background-color。

将填充与适合该表面的前景色角色配合使用。根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `tree.td.text.size.l`

<a id="entry-tree-td-text-size-l"></a>

大

gap.l、margin.l 和 padding.l 使用 l 间距变量；text.size.l 使用 l 字号变量；border.l 只设置边框宽度；shadow.l 和 shadow.primary.l 设置盒阴影。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `tree.td.text.size.m`

<a id="entry-tree-td-text-size-m"></a>

中等

gap.m、margin.m 和 padding.m 使用 m 间距变量；text.size.m 使用 m 字号变量；border.m 只设置边框宽度；shadow.m 和 shadow.primary.m 设置盒阴影；shadow.text.m 和 shadow.text.primary.m 设置文本阴影；border.default 设置 xs 宽度的实线 surface-default 边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `tree.td.text.size.s`

<a id="entry-tree-td-text-size-s"></a>

小

gap.s、margin.s 和 padding.s 使用 s 间距变量；text.size.s 使用 s 字号变量；border.s 只设置边框宽度；shadow.s 和 shadow.primary.s 设置盒阴影；shadow.text.s 和 shadow.text.primary.s 设置文本阴影；border.faint 和 border.muted 设置 xs 宽度的实线轮廓角色边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `tree.td.text.size.xl`

<a id="entry-tree-td-text-size-xl"></a>

极大

gap.xl、margin.xl 和 padding.xl 使用 xl 间距变量；text.size.xl 使用 xl 字号变量；border.xl 只设置边框宽度；shadow.xl 和 shadow.primary.xl 设置盒阴影。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `tree.td.text.size.xs`

<a id="entry-tree-td-text-size-xs"></a>

极小

gap.xs、margin.xs 和 padding.xs 使用 xs 间距变量；text.size.xs 使用 xs 字号变量；border.xs 只设置边框宽度；shadow.xs 和 shadow.primary.xs 设置盒阴影；shadow.text.xs 和 shadow.text.primary.xs 设置文本阴影；border.subtle 设置 xs 宽度的实线 outline-subtle 边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `tree.td.text.size.3xl`

<a id="entry-tree-td-text-size-3xl"></a>

三倍特大

将主题的 3xl 字号应用于选中的内容。

根据 sys.typography.fontSize.3xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `tree.td.text.size.4xl`

<a id="entry-tree-td-text-size-4xl"></a>

四倍特大

将主题的 4xl 字号应用于选中的内容。

根据 sys.typography.fontSize.4xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `tree.td.text.size.xxl`

<a id="entry-tree-td-text-size-xxl"></a>

超大

gap.xxl、margin.xxl 和 padding.xxl 使用 xxl 间距变量；text.size.xxl 使用 xxl 字号变量。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `tree.td.text.size.xxs`

<a id="entry-tree-td-text-size-xxs"></a>

超小

gap.xxs、margin.xxs 和 padding.xxs 使用 xxs 间距变量；text.size.xxs 使用 xxs 字号变量。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `tree.tdslot.text.size.l`

<a id="entry-tree-tdslot-text-size-l"></a>

大

gap.l、margin.l 和 padding.l 使用 l 间距变量；text.size.l 使用 l 字号变量；border.l 只设置边框宽度；shadow.l 和 shadow.primary.l 设置盒阴影。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `tree.tdslot.text.size.m`

<a id="entry-tree-tdslot-text-size-m"></a>

中等

gap.m、margin.m 和 padding.m 使用 m 间距变量；text.size.m 使用 m 字号变量；border.m 只设置边框宽度；shadow.m 和 shadow.primary.m 设置盒阴影；shadow.text.m 和 shadow.text.primary.m 设置文本阴影；border.default 设置 xs 宽度的实线 surface-default 边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `tree.tdslot.text.size.s`

<a id="entry-tree-tdslot-text-size-s"></a>

小

gap.s、margin.s 和 padding.s 使用 s 间距变量；text.size.s 使用 s 字号变量；border.s 只设置边框宽度；shadow.s 和 shadow.primary.s 设置盒阴影；shadow.text.s 和 shadow.text.primary.s 设置文本阴影；border.faint 和 border.muted 设置 xs 宽度的实线轮廓角色边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `tree.tdslot.text.size.xl`

<a id="entry-tree-tdslot-text-size-xl"></a>

极大

gap.xl、margin.xl 和 padding.xl 使用 xl 间距变量；text.size.xl 使用 xl 字号变量；border.xl 只设置边框宽度；shadow.xl 和 shadow.primary.xl 设置盒阴影。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `tree.tdslot.text.size.xs`

<a id="entry-tree-tdslot-text-size-xs"></a>

极小

gap.xs、margin.xs 和 padding.xs 使用 xs 间距变量；text.size.xs 使用 xs 字号变量；border.xs 只设置边框宽度；shadow.xs 和 shadow.primary.xs 设置盒阴影；shadow.text.xs 和 shadow.text.primary.xs 设置文本阴影；border.subtle 设置 xs 宽度的实线 outline-subtle 边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `tree.tdslot.text.size.3xl`

<a id="entry-tree-tdslot-text-size-3xl"></a>

三倍特大

将主题的 3xl 字号应用于选中的内容。

根据 sys.typography.fontSize.3xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `tree.tdslot.text.size.4xl`

<a id="entry-tree-tdslot-text-size-4xl"></a>

四倍特大

将主题的 4xl 字号应用于选中的内容。

根据 sys.typography.fontSize.4xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `tree.tdslot.text.size.xxl`

<a id="entry-tree-tdslot-text-size-xxl"></a>

超大

gap.xxl、margin.xxl 和 padding.xxl 使用 xxl 间距变量；text.size.xxl 使用 xxl 字号变量。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `tree.tdslot.text.size.xxs`

<a id="entry-tree-tdslot-text-size-xxs"></a>

超小

gap.xxs、margin.xxs 和 padding.xxs 使用 xxs 间距变量；text.size.xxs 使用 xxs 字号变量。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。
