# element style variants

<!-- Generated from native authoring; do not edit. -->

[English](element-style.md)

**Element:** `jam-element` · **Type:** `element`

Element (`EndiveElement`) is a generic container used for representers (`divider`, `hr`, `vr`, `data`, `placeholder`). Minimal style variants.

---

## Style variants

### `element.placeholder`

<a id="entry-element-placeholder"></a>

占位符

隐藏元素，同时保留其布局空间。

将 visibility 设为 hidden，保留元素的布局盒。

适用于需要保持周围布局稳定的场景；条件渲染或通过 display 隐藏元素有不同的用途。

Placeholder visibility — hides the element by default (sets `visibility: hidden`). Useful for representers that should not be visible. No args.

```javascript jaml-playground
export default [
    {
        type: 'element-divider',
        styles: ['element.placeholder']
    }
];
```

### `element.header`

<a id="entry-element-header"></a>

标题

将元素呈现为文档标题。

添加 header 及对应标题级别的类，供元素文档样式表使用。

此样式只提供视觉外观，不会将 DOM 标签改为具有标题语义的标签。

位置参数顺序: `level`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `level` | `number` | `1` | 标题级别 |

Heading-style layout.

```javascript jaml-playground
export default [
    {
        type: 'element',
        value: 'Section title',
        styles: ['element.header(level:2)']
    }
];
```

### `element.para`

<a id="entry-element-para"></a>

段落

在 JAML 中呈现文档段落。

添加 para 类和对应缩进级别的类，用于文档样式。

内容需另行提供；此样式不将文本解析为文档结构。

位置参数顺序: `indent`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `indent` | `number` | `0` | 缩进 |

Paragraph text layout.

```javascript jaml-playground
export default [
    {
        type: 'element',
        value: 'Paragraph copy with an indent.',
        styles: ['element.para(indent:1)']
    }
];
```

### `element.quote`

<a id="entry-element-quote"></a>

引用

在 JAML 中呈现文档引用。

添加 quote 类和对应缩进级别的类，用于文档样式。

内容需另行提供；此样式不将文本解析为文档结构。

位置参数顺序: `indent`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `indent` | `number` | `0` | 缩进 |

Blockquote style.

```javascript jaml-playground
export default [
    {
        type: 'element',
        value: 'A quoted sentence.',
        styles: ['element.quote(indent:1)']
    }
];
```

### `element.list`

<a id="entry-element-list"></a>

列表

呈现列表项或简单的任务项。

添加缩进和列表类，以及可选的序号标记。启用 todo 时，在内容前插入由 checked 初始化的 Jam-UI checkbox 开关，并通过 clickWith 转发宿主的点击。

列表数据和持久化由调用方负责；此样式不解析 Markdown，也不维护任务模型。

位置参数顺序: `indent` → `order` → `todo` → `checked`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `indent` | `number` | `0` | 缩进 |
| `order` | `number` | 未提供 | 有序列表 |
| `todo` | `boolean` | `false` | 待办 |
| `checked` | `boolean` | `false` | 已完成 |

List item with optional order number or todo checkbox.

```javascript jaml-playground
export default [
    {
        type: 'element',
        value: 'Buy groceries',
        styles: ['element.list(todo:true;checked:false)']
    }
];
```

### `element.image`

<a id="entry-element-image"></a>

图片

向元素中插入图片。

根据 src 和 alt 创建 img，将其追加到宿主中，并在移除样式时移除该图片。

用 alt 描述图片含义，并通过常规样式设置外围元素的尺寸。

位置参数顺序: `src` → `alt`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `src` | `string` | 地址 |
| `alt` | `string` | 替代文本 |

Image display — renders an `<img>` element inside the element.

```javascript jaml-playground
export default [
    {
        type: 'element',
        styles: ['element.image(src:https://via.placeholder.com/200;alt:Placeholder image)']
    }
];
```

---

## Usage

Element (`EndiveElement`) is a generic container used for representers (`divider`, `hr`, `vr`, `data`, `placeholder`). Minimal style variants.

## `element.grid`

<a id="entry-element-grid"></a>

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

## `element.text`

<a id="entry-element-text"></a>

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

## `element.color`

<a id="entry-element-color"></a>

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

## `element.inline`

<a id="entry-element-inline"></a>

行内布局

使选中的目标使用框架的内联外观。

为路径选中的目标添加 jam-inline。

所选组件或目标的样式表必须实现 inline 类。

这是类名约定，不是无条件的内联显示声明。

## `element.icon.text`

<a id="entry-element-icon-text"></a>

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

## `element.text.mono`

<a id="entry-element-text-mono"></a>

等宽字体

为路径选中的目标使用主题的等宽字体族。

嵌套的 text.mono 预设选择 sys.typography.fontFamily.mono。

根路径 text.mono 扩展改为使用通用的 monospace 字体族。这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `element.color.accent`

<a id="entry-element-color-accent"></a>

强调色

根据路径选择强调的前景色或强调色前景。

color.strong 使用 strong 前景色变量；嵌套的 color.accent 使用 primary 前景色变量，并添加 colored 类。

两者是不同的角色。根路径 color.accent 具有独立的颜色配置行为，不属于此共享预设组。

## `element.capslot.layout`

<a id="entry-element-capslot-layout"></a>

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

## `element.background.tint`

<a id="entry-element-background-tint"></a>

染色

根据 sys.color.tint.default 设置 background-color。

将填充与适合该表面的前景色角色配合使用。根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `element.iconslot.layout`

<a id="entry-element-iconslot-layout"></a>

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

## `element.extraslot.layout`

<a id="entry-element-extraslot-layout"></a>

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

## `element.labelslot.layout`

<a id="entry-element-labelslot-layout"></a>

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

## `element.text.size.l`

<a id="entry-element-text-size-l"></a>

大

gap.l、margin.l 和 padding.l 使用 l 间距变量；text.size.l 使用 l 字号变量；border.l 只设置边框宽度；shadow.l 和 shadow.primary.l 设置盒阴影。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `element.text.size.m`

<a id="entry-element-text-size-m"></a>

中等

gap.m、margin.m 和 padding.m 使用 m 间距变量；text.size.m 使用 m 字号变量；border.m 只设置边框宽度；shadow.m 和 shadow.primary.m 设置盒阴影；shadow.text.m 和 shadow.text.primary.m 设置文本阴影；border.default 设置 xs 宽度的实线 surface-default 边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `element.text.size.s`

<a id="entry-element-text-size-s"></a>

小

gap.s、margin.s 和 padding.s 使用 s 间距变量；text.size.s 使用 s 字号变量；border.s 只设置边框宽度；shadow.s 和 shadow.primary.s 设置盒阴影；shadow.text.s 和 shadow.text.primary.s 设置文本阴影；border.faint 和 border.muted 设置 xs 宽度的实线轮廓角色边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `element.text.size.xl`

<a id="entry-element-text-size-xl"></a>

极大

gap.xl、margin.xl 和 padding.xl 使用 xl 间距变量；text.size.xl 使用 xl 字号变量；border.xl 只设置边框宽度；shadow.xl 和 shadow.primary.xl 设置盒阴影。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `element.text.size.xs`

<a id="entry-element-text-size-xs"></a>

极小

gap.xs、margin.xs 和 padding.xs 使用 xs 间距变量；text.size.xs 使用 xs 字号变量；border.xs 只设置边框宽度；shadow.xs 和 shadow.primary.xs 设置盒阴影；shadow.text.xs 和 shadow.text.primary.xs 设置文本阴影；border.subtle 设置 xs 宽度的实线 outline-subtle 边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `element.text.size.3xl`

<a id="entry-element-text-size-3xl"></a>

三倍特大

将主题的 3xl 字号应用于选中的内容。

根据 sys.typography.fontSize.3xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `element.text.size.4xl`

<a id="entry-element-text-size-4xl"></a>

四倍特大

将主题的 4xl 字号应用于选中的内容。

根据 sys.typography.fontSize.4xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `element.text.size.xxl`

<a id="entry-element-text-size-xxl"></a>

超大

gap.xxl、margin.xxl 和 padding.xxl 使用 xxl 间距变量；text.size.xxl 使用 xxl 字号变量。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `element.text.size.xxs`

<a id="entry-element-text-size-xxs"></a>

超小

gap.xxs、margin.xxs 和 padding.xxs 使用 xxs 间距变量；text.size.xxs 使用 xxs 字号变量。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。
