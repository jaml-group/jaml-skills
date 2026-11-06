# list

<!-- Generated from native authoring; do not edit. -->

[English](list.md)

## `list.grid`

<a id="entry-list-grid"></a>

说明见 [`grid`](common/grid.zh.md#entry-grid)。

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

## `list.text`

<a id="entry-list-text"></a>

说明见 [`text`](common/text.zh.md#entry-text)。

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

## `list.bento`

<a id="entry-list-bento"></a>

便当式表格

以瓷砖般的间距分隔表格或树单元格。

添加 bento，并写入原生表格样式使用的 margin 和 radius 变量。

此版本的公开参数拼写为 borderRaidus；调用时保留该拼写。

位置参数顺序: `margin` → `borderRaidus`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `margin` | `numberOrString` | `var(--jam-space-xs)` | 外边距<br>Unit: `rem` |
| `borderRaidus` | `numberOrString` | `var(--jam-border-radius-s)` | 圆角<br>Unit: `rem` |

## `list.color`

<a id="entry-list-color"></a>

说明见 [`color`](common/color.zh.md#entry-color)。

位置参数顺序: `h` → `s` → `l` → `a` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `h` | `numberOrString` | 色相 |
| `s` | `numberOrString` | 饱和度 |
| `l` | `numberOrString` | 亮度 |
| `a` | `numberOrString` | 透明度 |
| `color` | `string` | 颜色<br>支持简写 |

## `list.thead`

<a id="entry-list-thead"></a>

表头样式

定制原生表头表面。

应用表头图像和/或由颜色派生的背景、前景及悬停和激活变量。

符合设计意图时，优先使用基于令牌的 accent、tint 或 elevated 表头预设。

位置参数顺序: `color` → `image`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 颜色 |
| `image` | `string` | 背景图片 |

## `list.inline`

<a id="entry-list-inline"></a>

行内布局

使选中的目标使用框架的内联外观。

为路径选中的目标添加 jam-inline。

所选组件或目标的样式表必须实现 inline 类。

这是类名约定，不是无条件的内联显示声明。

## `list.stripy`

<a id="entry-list-stripy"></a>

斑马纹

为表格或树应用交替行表面。

添加 stripy，并公开独立的奇偶单元格背景变量。

位置参数顺序: `odd` → `even`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `odd` | `string` | 奇数行背景 |
| `even` | `string` | 偶数行背景 |

## `list.compact`

<a id="entry-list-compact"></a>

紧凑列表

在需要快速浏览的列表中容纳更多简短记录。

收紧行间距，保留任务行的操作区域，并允许较长的标签换行。

## `list.ordered`

<a id="entry-list-ordered"></a>

有序列表

按列表顺序为记录编号。

在各项旁显示编号。

## `list.gridline`

<a id="entry-list-gridline"></a>

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

## `list.headless`

<a id="entry-list-headless"></a>

无表头

在视觉上隐藏表头。

添加 hide-thead；原生表格样式表隐藏 thead 插槽，同时保留列定义和表格数据。neck 插槽仍然可见。

移除可见标题时，确保列的含义仍可被无障碍访问。

## `list.markdown`

<a id="entry-list-markdown"></a>

Markdown

使用表格的 Markdown 展示。

添加 markdown，供原生表格 Markdown 样式表使用。

这不会将任意 Markdown 解析为表格数据；请提供常规的原生表格模型。

## `list.showrownum`

<a id="entry-list-showrownum"></a>

自动表格序号

在原生表格行旁显示行序号标记。

添加 show-rownum、所选的 pill、plain 或 stroke 变体以及可选的标记内边距。

这些是显示顺序编号，不是稳定的记录身份。

位置参数顺序: `padding` → `style`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `padding` | `numberOrString` | 未提供 | 左边距<br>Unit: `em` |
| `style` | `string` | `pill` | 样式<br>选项: `pill` — 药丸, `plain` — 朴素, `stroke` — 描边 |

## `list.stretchrow`

<a id="entry-list-stretchrow"></a>

拉伸行

在 body 布局内拉伸原生表格或树的行。

添加 stretch-row，供原生表格模板的行尺寸规则使用。

这是尺寸设置，不是固定高度虚拟化；需要虚拟化时选择 fixedrowheight 或 fixednodeheight。

## `list.autopercent`

<a id="entry-list-autopercent"></a>

表格百分比

自动为名称表示百分比的列选择进度单元格。

样式激活时，如有需要先等待 theadsset 就绪，然后使用 matcher 测试当前表头标题，并将匹配的表头单元格类型改为 progress。

这会修改表头类型，不转换值。它不订阅后续 theadsset 事件，因此仅重建表头不会再次执行转换。

位置参数顺序: `matcher`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `matcher` | `string` | `(占比\|百分比\|%)` | 匹配器 |

## `list.hovermarker`

<a id="entry-list-hovermarker"></a>

悬停标记

为表格添加移动的悬停标记。

跟踪原生单元格，并显示水平轴、垂直轴或单元格边框定位标记；离开时清除标记和悬停坐标。

需要原生表格或树的 body 及单元格元数据。

移除时分离悬停监听器，并移除拥有的定位标记。

视觉悬停标记不会选择行，也不会持久保存当前单元格。

位置参数顺序: `type` → `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `type` | `string` | `row` | 标记类型<br>选项: `row` — 行, `column` — 列, `td` — 单元格 |
| `size` | `number` | 未提供 | 大小 |
| `width` | `numberOrString` | `auto` | 边框宽度 |
| `bias` | `number` | `0` | 边框距离 |
| `glow` | `number` | `0` | 发光 |
| `radius` | `numberOrString` | `auto` | 圆角半径<br>auto：自动适配元素；数值表示半径，单位为 px。 |
| `delay` | `number` | `0` | 延迟 |
| `breathe` | `boolean` | `false` | 呼吸 |
| `container` | `any` | 未提供 | 容器 |
| `clipTarget` | `any` | 未提供 | 裁剪目标 |
| `easing` | `string` | 未提供 | 动画缓动 |
| `duration` | `number` | 未提供 | 动画时长 |

## `list.xscrollable`

<a id="entry-list-xscrollable"></a>

可横向滚动

横向滚动较宽的原生表格，同时保持表头对齐。

添加 x-scrollable，将冻结列数量传递给表格，并联动表头和 body 的横向滚动。

使用具有列和受约束视口的原生表格；此样式依赖其表头和 body 插槽。

位置参数顺序: `freezeLeft` → `freezeRight`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `freezeLeft` | `number` | 冻结左列 |
| `freezeRight` | `number` | 冻结右列 |

## `list.showpageinfo`

<a id="entry-list-showpageinfo"></a>

显示页面信息

标识保留的页信息入口。

当前入口的插件列表为空，不生成页信息。

不要将其作为可用的分页或状态功能。请根据表格分页状态显式组合页信息。

## `list.fixedrowheight`

<a id="entry-list-fixedrowheight"></a>

固定行高

虚拟化固定高度的表格行。

通过 SaigonScroll 使用原生表格行提供器和 body 滚动插槽；预留行高，并可为已挂载单元格添加动画。展开的详情行会禁用固定虚拟路径。

需要有界的 body 视口和稳定的已配置行高。

将 animation 设为受支持的动画名称字符串或 false；不支持 true。展开的详情高度可变时会暂停固定行虚拟化。

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

## `list.hoverhighlight`

<a id="entry-list-hoverhighlight"></a>

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

## `list.showscrollprogress`

<a id="entry-list-showscrollprogress"></a>

滚动进度

用细表格进度条显示 body 滚动位置。

在表格 neck 中创建原生 progress 元素，并根据 body 插槽的滚动进度更新它；移除时释放进度条和监听器。

显示的是滚动位置，不是数据加载或分页完成情况。

位置参数顺序: `height` → `color`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `height` | `numberOrString` | `0.1` | 高度<br>Unit: `rem` |
| `color` | `string` | 未提供 | 颜色 |

## `list.td.text`

<a id="entry-list-td-text"></a>

说明见 [`text`](common/text.zh.md#entry-text)。

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

## `list.th.text`

<a id="entry-list-th-text"></a>

说明见 [`text`](common/text.zh.md#entry-text)。

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

## `list.td.color`

<a id="entry-list-td-color"></a>

说明见 [`color`](common/color.zh.md#entry-color)。

位置参数顺序: `h` → `s` → `l` → `a` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `h` | `numberOrString` | 色相 |
| `s` | `numberOrString` | 饱和度 |
| `l` | `numberOrString` | 亮度 |
| `a` | `numberOrString` | 透明度 |
| `color` | `string` | 颜色<br>支持简写 |

## `list.th.color`

<a id="entry-list-th-color"></a>

说明见 [`color`](common/color.zh.md#entry-color)。

位置参数顺序: `h` → `s` → `l` → `a` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `h` | `numberOrString` | 色相 |
| `s` | `numberOrString` | 饱和度 |
| `l` | `numberOrString` | 亮度 |
| `a` | `numberOrString` | 透明度 |
| `color` | `string` | 颜色<br>支持简写 |

## `list.icon.text`

<a id="entry-list-icon-text"></a>

说明见 [`text`](common/text.zh.md#entry-text)。

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

## `list.td.inline`

<a id="entry-list-td-inline"></a>

行内布局

使选中的目标使用框架的内联外观。

为路径选中的目标添加 jam-inline。

所选组件或目标的样式表必须实现 inline 类。

这是类名约定，不是无条件的内联显示声明。

## `list.th.inline`

<a id="entry-list-th-inline"></a>

行内布局

使选中的目标使用框架的内联外观。

为路径选中的目标添加 jam-inline。

所选组件或目标的样式表必须实现 inline 类。

这是类名约定，不是无条件的内联显示声明。

## `list.thead.hide`

<a id="entry-list-thead-hide"></a>

隐藏表头

在视觉上隐藏表头。

添加 hide-thead；原生表格样式表隐藏 thead 插槽，同时保留列定义和表格数据。neck 插槽仍然可见。

移除可见标题时，确保列的含义仍可被无障碍访问。

## `list.thead.tint`

<a id="entry-list-thead-tint"></a>

表头色调

为表头使用 tint 语义表面。

添加 tint 表头类；原生 CSS 设置其正常、悬停和激活的主题令牌颜色。

## `list.tdslot.text`

<a id="entry-list-tdslot-text"></a>

说明见 [`text`](common/text.zh.md#entry-text)。

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

## `list.thslot.text`

<a id="entry-list-thslot-text"></a>

说明见 [`text`](common/text.zh.md#entry-text)。

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

## `list.color.accent`

<a id="entry-list-color-accent"></a>

强调色

根据路径选择强调的前景色或强调色前景。

color.strong 使用 strong 前景色变量；嵌套的 color.accent 使用 primary 前景色变量，并添加 colored 类。

两者是不同的角色。根路径 color.accent 具有独立的颜色配置行为，不属于此共享预设组。

## `list.tdslot.color`

<a id="entry-list-tdslot-color"></a>

说明见 [`color`](common/color.zh.md#entry-color)。

位置参数顺序: `h` → `s` → `l` → `a` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `h` | `numberOrString` | 色相 |
| `s` | `numberOrString` | 饱和度 |
| `l` | `numberOrString` | 亮度 |
| `a` | `numberOrString` | 透明度 |
| `color` | `string` | 颜色<br>支持简写 |

## `list.thead.accent`

<a id="entry-list-thead-accent"></a>

表头主题色

为表头使用 accent 语义表面。

添加 accent 表头类；原生 CSS 设置其正常、悬停和激活的主题令牌颜色。

## `list.thslot.color`

<a id="entry-list-thslot-color"></a>

说明见 [`color`](common/color.zh.md#entry-color)。

位置参数顺序: `h` → `s` → `l` → `a` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `h` | `numberOrString` | 色相 |
| `s` | `numberOrString` | 饱和度 |
| `l` | `numberOrString` | 亮度 |
| `a` | `numberOrString` | 透明度 |
| `color` | `string` | 颜色<br>支持简写 |

## `list.tdslot.inline`

<a id="entry-list-tdslot-inline"></a>

行内布局

使选中的目标使用框架的内联外观。

为路径选中的目标添加 jam-inline。

所选组件或目标的样式表必须实现 inline 类。

这是类名约定，不是无条件的内联显示声明。

## `list.tdslot.layout`

<a id="entry-list-tdslot-layout"></a>

说明见 [`layout`](common/layout.zh.md#entry-layout)。

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

## `list.thslot.inline`

<a id="entry-list-thslot-inline"></a>

行内布局

使选中的目标使用框架的内联外观。

为路径选中的目标添加 jam-inline。

所选组件或目标的样式表必须实现 inline 类。

这是类名约定，不是无条件的内联显示声明。

## `list.thslot.layout`

<a id="entry-list-thslot-layout"></a>

说明见 [`layout`](common/layout.zh.md#entry-layout)。

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

## `list.capslot.layout`

<a id="entry-list-capslot-layout"></a>

说明见 [`layout`](common/layout.zh.md#entry-layout)。

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

## `list.thead.elevated`

<a id="entry-list-thead-elevated"></a>

表头提升

为表头使用 elevated 语义表面。

添加 elevated 表头类；原生 CSS 设置其正常、悬停和激活的主题令牌颜色。

## `list.background.tint`

<a id="entry-list-background-tint"></a>

染色

根据 sys.color.tint.default 设置 background-color。

将填充与适合该表面的前景色角色配合使用。根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `list.iconslot.layout`

<a id="entry-list-iconslot-layout"></a>

说明见 [`layout`](common/layout.zh.md#entry-layout)。

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

## `list.sortbutton.text`

<a id="entry-list-sortbutton-text"></a>

说明见 [`text`](common/text.zh.md#entry-text)。

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

## `list.extraslot.layout`

<a id="entry-list-extraslot-layout"></a>

说明见 [`layout`](common/layout.zh.md#entry-layout)。

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

## `list.labelslot.layout`

<a id="entry-list-labelslot-layout"></a>

说明见 [`layout`](common/layout.zh.md#entry-layout)。

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

## `list.sortbutton.color`

<a id="entry-list-sortbutton-color"></a>

说明见 [`color`](common/color.zh.md#entry-color)。

位置参数顺序: `h` → `s` → `l` → `a` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `h` | `numberOrString` | 色相 |
| `s` | `numberOrString` | 饱和度 |
| `l` | `numberOrString` | 亮度 |
| `a` | `numberOrString` | 透明度 |
| `color` | `string` | 颜色<br>支持简写 |

## `list.sortbutton.inline`

<a id="entry-list-sortbutton-inline"></a>

行内布局

使选中的目标使用框架的内联外观。

为路径选中的目标添加 jam-inline。

所选组件或目标的样式表必须实现 inline 类。

这是类名约定，不是无条件的内联显示声明。

## `list.text.size.l`

<a id="entry-list-text-size-l"></a>

大

text.size.l 使用 l 字号变量。

## `list.text.size.m`

<a id="entry-list-text-size-m"></a>

中等

text.size.m 使用 m 字号变量。

## `list.text.size.s`

<a id="entry-list-text-size-s"></a>

小

text.size.s 使用 s 字号变量。

## `list.text.size.xl`

<a id="entry-list-text-size-xl"></a>

极大

text.size.xl 使用 xl 字号变量。

## `list.text.size.xs`

<a id="entry-list-text-size-xs"></a>

极小

text.size.xs 使用 xs 字号变量。

## `list.text.size.3xl`

<a id="entry-list-text-size-3xl"></a>

三倍特大

将主题的 3xl 字号应用于选中的内容。

根据 sys.typography.fontSize.3xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `list.text.size.4xl`

<a id="entry-list-text-size-4xl"></a>

四倍特大

将主题的 4xl 字号应用于选中的内容。

根据 sys.typography.fontSize.4xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `list.text.size.xxl`

<a id="entry-list-text-size-xxl"></a>

超大

text.size.xxl 使用 xxl 字号变量。

## `list.text.size.xxs`

<a id="entry-list-text-size-xxs"></a>

超小

text.size.xxs 使用 xxs 字号变量。

## `list.td.color.accent`

<a id="entry-list-td-color-accent"></a>

强调色

根据路径选择强调的前景色或强调色前景。

color.strong 使用 strong 前景色变量；嵌套的 color.accent 使用 primary 前景色变量，并添加 colored 类。

两者是不同的角色。根路径 color.accent 具有独立的颜色配置行为，不属于此共享预设组。

## `list.th.color.accent`

<a id="entry-list-th-color-accent"></a>

强调色

根据路径选择强调的前景色或强调色前景。

color.strong 使用 strong 前景色变量；嵌套的 color.accent 使用 primary 前景色变量，并添加 colored 类。

两者是不同的角色。根路径 color.accent 具有独立的颜色配置行为，不属于此共享预设组。

## `list.td.background.tint`

<a id="entry-list-td-background-tint"></a>

染色

根据 sys.color.tint.default 设置 background-color。

将填充与适合该表面的前景色角色配合使用。根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `list.th.background.tint`

<a id="entry-list-th-background-tint"></a>

染色

根据 sys.color.tint.default 设置 background-color。

将填充与适合该表面的前景色角色配合使用。根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `list.tdslot.color.accent`

<a id="entry-list-tdslot-color-accent"></a>

强调色

根据路径选择强调的前景色或强调色前景。

color.strong 使用 strong 前景色变量；嵌套的 color.accent 使用 primary 前景色变量，并添加 colored 类。

两者是不同的角色。根路径 color.accent 具有独立的颜色配置行为，不属于此共享预设组。

## `list.thslot.color.accent`

<a id="entry-list-thslot-color-accent"></a>

强调色

根据路径选择强调的前景色或强调色前景。

color.strong 使用 strong 前景色变量；嵌套的 color.accent 使用 primary 前景色变量，并添加 colored 类。

两者是不同的角色。根路径 color.accent 具有独立的颜色配置行为，不属于此共享预设组。

## `list.tdslot.background.tint`

<a id="entry-list-tdslot-background-tint"></a>

染色

根据 sys.color.tint.default 设置 background-color。

将填充与适合该表面的前景色角色配合使用。根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `list.thslot.background.tint`

<a id="entry-list-thslot-background-tint"></a>

染色

根据 sys.color.tint.default 设置 background-color。

将填充与适合该表面的前景色角色配合使用。根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `list.sortbutton.color.accent`

<a id="entry-list-sortbutton-color-accent"></a>

强调色

根据路径选择强调的前景色或强调色前景。

color.strong 使用 strong 前景色变量；嵌套的 color.accent 使用 primary 前景色变量，并添加 colored 类。

两者是不同的角色。根路径 color.accent 具有独立的颜色配置行为，不属于此共享预设组。

## `list.sortbutton.background.tint`

<a id="entry-list-sortbutton-background-tint"></a>

染色

根据 sys.color.tint.default 设置 background-color。

将填充与适合该表面的前景色角色配合使用。根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `list.td.text.size.l`

<a id="entry-list-td-text-size-l"></a>

大

text.size.l 使用 l 字号变量。

## `list.td.text.size.m`

<a id="entry-list-td-text-size-m"></a>

中等

text.size.m 使用 m 字号变量。

## `list.td.text.size.s`

<a id="entry-list-td-text-size-s"></a>

小

text.size.s 使用 s 字号变量。

## `list.th.text.size.l`

<a id="entry-list-th-text-size-l"></a>

大

text.size.l 使用 l 字号变量。

## `list.th.text.size.m`

<a id="entry-list-th-text-size-m"></a>

中等

text.size.m 使用 m 字号变量。

## `list.th.text.size.s`

<a id="entry-list-th-text-size-s"></a>

小

text.size.s 使用 s 字号变量。

## `list.td.text.size.xl`

<a id="entry-list-td-text-size-xl"></a>

极大

text.size.xl 使用 xl 字号变量。

## `list.td.text.size.xs`

<a id="entry-list-td-text-size-xs"></a>

极小

text.size.xs 使用 xs 字号变量。

## `list.th.text.size.xl`

<a id="entry-list-th-text-size-xl"></a>

极大

text.size.xl 使用 xl 字号变量。

## `list.th.text.size.xs`

<a id="entry-list-th-text-size-xs"></a>

极小

text.size.xs 使用 xs 字号变量。

## `list.td.text.size.3xl`

<a id="entry-list-td-text-size-3xl"></a>

三倍特大

将主题的 3xl 字号应用于选中的内容。

根据 sys.typography.fontSize.3xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `list.td.text.size.4xl`

<a id="entry-list-td-text-size-4xl"></a>

四倍特大

将主题的 4xl 字号应用于选中的内容。

根据 sys.typography.fontSize.4xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `list.td.text.size.xxl`

<a id="entry-list-td-text-size-xxl"></a>

超大

text.size.xxl 使用 xxl 字号变量。

## `list.td.text.size.xxs`

<a id="entry-list-td-text-size-xxs"></a>

超小

text.size.xxs 使用 xxs 字号变量。

## `list.th.text.size.3xl`

<a id="entry-list-th-text-size-3xl"></a>

三倍特大

将主题的 3xl 字号应用于选中的内容。

根据 sys.typography.fontSize.3xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `list.th.text.size.4xl`

<a id="entry-list-th-text-size-4xl"></a>

四倍特大

将主题的 4xl 字号应用于选中的内容。

根据 sys.typography.fontSize.4xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `list.th.text.size.xxl`

<a id="entry-list-th-text-size-xxl"></a>

超大

text.size.xxl 使用 xxl 字号变量。

## `list.th.text.size.xxs`

<a id="entry-list-th-text-size-xxs"></a>

超小

text.size.xxs 使用 xxs 字号变量。

## `list.tdslot.text.size.l`

<a id="entry-list-tdslot-text-size-l"></a>

大

text.size.l 使用 l 字号变量。

## `list.tdslot.text.size.m`

<a id="entry-list-tdslot-text-size-m"></a>

中等

text.size.m 使用 m 字号变量。

## `list.tdslot.text.size.s`

<a id="entry-list-tdslot-text-size-s"></a>

小

text.size.s 使用 s 字号变量。

## `list.thslot.text.size.l`

<a id="entry-list-thslot-text-size-l"></a>

大

text.size.l 使用 l 字号变量。

## `list.thslot.text.size.m`

<a id="entry-list-thslot-text-size-m"></a>

中等

text.size.m 使用 m 字号变量。

## `list.thslot.text.size.s`

<a id="entry-list-thslot-text-size-s"></a>

小

text.size.s 使用 s 字号变量。

## `list.tdslot.text.size.xl`

<a id="entry-list-tdslot-text-size-xl"></a>

极大

text.size.xl 使用 xl 字号变量。

## `list.tdslot.text.size.xs`

<a id="entry-list-tdslot-text-size-xs"></a>

极小

text.size.xs 使用 xs 字号变量。

## `list.thslot.text.size.xl`

<a id="entry-list-thslot-text-size-xl"></a>

极大

text.size.xl 使用 xl 字号变量。

## `list.thslot.text.size.xs`

<a id="entry-list-thslot-text-size-xs"></a>

极小

text.size.xs 使用 xs 字号变量。

## `list.tdslot.text.size.3xl`

<a id="entry-list-tdslot-text-size-3xl"></a>

三倍特大

将主题的 3xl 字号应用于选中的内容。

根据 sys.typography.fontSize.3xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `list.tdslot.text.size.4xl`

<a id="entry-list-tdslot-text-size-4xl"></a>

四倍特大

将主题的 4xl 字号应用于选中的内容。

根据 sys.typography.fontSize.4xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `list.tdslot.text.size.xxl`

<a id="entry-list-tdslot-text-size-xxl"></a>

超大

text.size.xxl 使用 xxl 字号变量。

## `list.tdslot.text.size.xxs`

<a id="entry-list-tdslot-text-size-xxs"></a>

超小

text.size.xxs 使用 xxs 字号变量。

## `list.thslot.text.size.3xl`

<a id="entry-list-thslot-text-size-3xl"></a>

三倍特大

将主题的 3xl 字号应用于选中的内容。

根据 sys.typography.fontSize.3xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `list.thslot.text.size.4xl`

<a id="entry-list-thslot-text-size-4xl"></a>

四倍特大

将主题的 4xl 字号应用于选中的内容。

根据 sys.typography.fontSize.4xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `list.thslot.text.size.xxl`

<a id="entry-list-thslot-text-size-xxl"></a>

超大

text.size.xxl 使用 xxl 字号变量。

## `list.thslot.text.size.xxs`

<a id="entry-list-thslot-text-size-xxs"></a>

超小

text.size.xxs 使用 xxs 字号变量。

## `list.sortbutton.text.size.l`

<a id="entry-list-sortbutton-text-size-l"></a>

大

text.size.l 使用 l 字号变量。

## `list.sortbutton.text.size.m`

<a id="entry-list-sortbutton-text-size-m"></a>

中等

text.size.m 使用 m 字号变量。

## `list.sortbutton.text.size.s`

<a id="entry-list-sortbutton-text-size-s"></a>

小

text.size.s 使用 s 字号变量。

## `list.sortbutton.text.size.xl`

<a id="entry-list-sortbutton-text-size-xl"></a>

极大

text.size.xl 使用 xl 字号变量。

## `list.sortbutton.text.size.xs`

<a id="entry-list-sortbutton-text-size-xs"></a>

极小

text.size.xs 使用 xs 字号变量。

## `list.sortbutton.text.size.3xl`

<a id="entry-list-sortbutton-text-size-3xl"></a>

三倍特大

将主题的 3xl 字号应用于选中的内容。

根据 sys.typography.fontSize.3xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `list.sortbutton.text.size.4xl`

<a id="entry-list-sortbutton-text-size-4xl"></a>

四倍特大

将主题的 4xl 字号应用于选中的内容。

根据 sys.typography.fontSize.4xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `list.sortbutton.text.size.xxl`

<a id="entry-list-sortbutton-text-size-xxl"></a>

超大

text.size.xxl 使用 xxl 字号变量。

## `list.sortbutton.text.size.xxs`

<a id="entry-list-sortbutton-text-size-xxs"></a>

超小

text.size.xxs 使用 xxs 字号变量。
