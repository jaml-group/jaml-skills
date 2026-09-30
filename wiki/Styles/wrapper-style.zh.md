# wrapper

<!-- Generated from native authoring; do not edit. -->

[English](wrapper-style.md)

`Styles.wrapper.*` -- generic container elements that compose layouts with children.

Wrapper inherits all container layout/grid basics plus `container.innershadow` and `container.childcount`.

---

## Variants

### `wrapper.vertical`

<a id="entry-wrapper-vertical"></a>

垂直布局

纵向堆叠 wrapper 内容。

添加 vertical，将原生 wrapper 的 flex 方向切换为 column。

需要更详细的放置约束时使用 layout.flex 或网格。

Arranges children in a vertical column layout instead of the default horizontal flow.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['wrapper.vertical'],
        components: [
            { type: 'label', cap: 'Item 1' },
            { type: 'label', cap: 'Item 2' },
            { type: 'label', cap: 'Item 3' }
        ]
    }
];
```

### `wrapper.wraplabel`

<a id="entry-wrapper-wraplabel"></a>

带标签包装

围绕标题为 wrapper 分组加框。

添加 wrap-label；group 角色的 wrapper CSS 绘制轮廓，并在标题和图标内容后使用 wrapper 背景。

需要具有 group 样式和标题内容的 wrapper。

Wraps children with a label that sits at the top or around the wrapper boundary.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        cap: 'Settings',
        styles: ['wrapper.wraplabel'],
        components: [
            { type: 'switch', cap: 'Enable notifications' },
            { type: 'switch', cap: 'Dark mode' }
        ]
    }
];
```

### `wrapper.dividelabel`

<a id="entry-wrapper-dividelabel"></a>

带标签分割

用分隔线将 wrapper 标题与内容分开。

添加 divide-label；group 角色的 wrapper CSS 在标题下方绘制分隔线，并定位 extra 插槽。

需要具有 group 样式和标题内容的 wrapper。

Shows a label with a visual divider line separating it from the content.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        cap: 'Account',
        styles: ['wrapper.dividelabel'],
        components: [
            { type: 'label', cap: 'Profile settings' },
            { type: 'label', cap: 'Security' }
        ]
    }
];
```

### `wrapper.buttonwrapper`

<a id="entry-wrapper-buttonwrapper"></a>

按钮包装器

应用旧有的 wrapper 按钮分组标记。

添加 buttonwrapper。

未发现此标记的专用原生选择器。需要已验证的结果时，使用语义 wrapper 角色和显式分组或布局样式；此标记不创建列表语义或选择行为。

Legacy class marker without a dedicated native layout rule in this baseline. For an action bar, use an `actions` role wrapper and an explicit flex layout; handlers own the commands.

### `wrapper.pill`

<a id="entry-wrapper-pill"></a>

圆角按钮组

应用旧有的 wrapper 胶囊分组标记。

添加 pill-container；pill 还会在尺寸变化时请求渲染位置标记。

未发现此标记的专用原生选择器。需要已验证的结果时，使用语义 wrapper 角色和显式分组或布局样式；此标记不创建列表语义或选择行为。

Adds a legacy class and recalculates child render-position markers on resize. It does not implement selection or guarantee a pill appearance. Use a native radio button group for a single-selection segmented control, then choose its presentation.

### `wrapper.list`

<a id="entry-wrapper-list"></a>

列表容器

应用旧有的 wrapper 列表标记。

添加 list。

未发现此标记的专用原生选择器。需要已验证的结果时，使用语义 wrapper 角色和显式分组或布局样式；此标记不创建列表语义或选择行为。

Legacy class marker; it does not create list semantics or bullet markers in this baseline. Use the list role for a semantic region and `element.list` for native document-item presentation.

### `wrapper.orderedList`

<a id="entry-wrapper-orderedlist"></a>

有序列表容器

应用旧有的 wrapper 有序列表标记。

添加 ordered-list。

未发现此标记的专用原生选择器。需要已验证的结果时，使用语义 wrapper 角色和显式分组或布局样式；此标记不创建列表语义或选择行为。

Legacy class marker; it does not automatically number children. Compose native `element.list` items with explicit order values when document numbering is required.

## `wrapper.grid`

<a id="entry-wrapper-grid"></a>

网格

为路径选中的目标配置网格相关参数。

将 templateColumns、templateRows、autoColumns、autoRows 和 templateAreas 映射到对应的 CSS 网格属性；gap 保持为 gap，area 使用 gridArea，除非所属路径覆盖其 CSS 键。

另行在网格容器上设置 display:grid，例如使用 css(display:grid)。使用 grid.area 显式指定网格项的行列位置。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `templateColumns` → `templateRows` → `autoColumns` → `autoRows` → `templateAreas` → `gap` → `area`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `templateColumns` | `string` | 列模板<br>`{"cssKey":"gridTemplateColumns"}` |
| `templateRows` | `string` | 行模板<br>`{"cssKey":"gridTemplateRows"}` |
| `autoColumns` | `string` | 自动列<br>`{"cssKey":"gridAutoColumns"}` |
| `autoRows` | `string` | 自动行<br>`{"cssKey":"gridAutoRows"}` |
| `templateAreas` | `string` | 模板区域<br>`{"cssKey":"gridTemplateAreas"}` |
| `gap` | `string` | 间隙 |
| `area` | `string` | 网格区域<br>`{"cssKey":"gridArea"}` |

## `wrapper.text`

<a id="entry-wrapper-text"></a>

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

## `wrapper.color`

<a id="entry-wrapper-color"></a>

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

## `wrapper.inline`

<a id="entry-wrapper-inline"></a>

行内布局

使选中的目标使用框架的内联外观。

为路径选中的目标添加 jam-inline。

所选组件或目标的样式表必须实现 inline 类。

这是类名约定，不是无条件的内联显示声明。

## `wrapper.layout`

<a id="entry-wrapper-layout"></a>

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
| `gap` | `numberOrString` | 间隙<br>`{"cssKey":"gap"}` |
| `zIndex` | `number` | 层级<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | 盒模型<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | 变换<br>`{"cssKey":"transform"}` |
| `transition` | `string` | 过渡<br>`{"cssKey":"transition"}` |

## `wrapper.childcount`

<a id="entry-wrapper-childcount"></a>

子元素数量

暴露子项数量状态，用于容器装饰。

在 childchange 时统计所有直接元素子项，写入 child-count，并切换 jam-empty。

计数包含装饰性子项和插槽子项；不等于应用记录数，也不会由单独的挂载回调初始化。

## `wrapper.innershadow`

<a id="entry-wrapper-innershadow"></a>

内阴影

为容器或包装器提供内凹表面。

应用由强调色派生的边框、主题圆角和内阴影。

## `wrapper.text.mono`

<a id="entry-wrapper-text-mono"></a>

等宽字体

为路径选中的目标使用主题的等宽字体族。

嵌套的 text.mono 预设选择 sys.typography.fontFamily.mono。

根路径 text.mono 扩展改为使用通用的 monospace 字体族。这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `wrapper.color.accent`

<a id="entry-wrapper-color-accent"></a>

强调色

根据路径选择强调的前景色或强调色前景。

color.strong 使用 strong 前景色变量；嵌套的 color.accent 使用 primary 前景色变量，并添加 colored 类。

两者是不同的角色。根路径 color.accent 具有独立的颜色配置行为，不属于此共享预设组。

## `wrapper.background.tint`

<a id="entry-wrapper-background-tint"></a>

染色

根据 sys.color.tint.default 设置 background-color。

将填充与适合该表面的前景色角色配合使用。根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `wrapper.text.size.l`

<a id="entry-wrapper-text-size-l"></a>

大

gap.l、margin.l 和 padding.l 使用 l 间距变量；text.size.l 使用 l 字号变量；border.l 只设置边框宽度；shadow.l 和 shadow.primary.l 设置盒阴影。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `wrapper.text.size.m`

<a id="entry-wrapper-text-size-m"></a>

中等

gap.m、margin.m 和 padding.m 使用 m 间距变量；text.size.m 使用 m 字号变量；border.m 只设置边框宽度；shadow.m 和 shadow.primary.m 设置盒阴影；shadow.text.m 和 shadow.text.primary.m 设置文本阴影；border.default 设置 xs 宽度的实线 surface-default 边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `wrapper.text.size.s`

<a id="entry-wrapper-text-size-s"></a>

小

gap.s、margin.s 和 padding.s 使用 s 间距变量；text.size.s 使用 s 字号变量；border.s 只设置边框宽度；shadow.s 和 shadow.primary.s 设置盒阴影；shadow.text.s 和 shadow.text.primary.s 设置文本阴影；border.faint 和 border.muted 设置 xs 宽度的实线轮廓角色边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `wrapper.text.size.xl`

<a id="entry-wrapper-text-size-xl"></a>

极大

gap.xl、margin.xl 和 padding.xl 使用 xl 间距变量；text.size.xl 使用 xl 字号变量；border.xl 只设置边框宽度；shadow.xl 和 shadow.primary.xl 设置盒阴影。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `wrapper.text.size.xs`

<a id="entry-wrapper-text-size-xs"></a>

极小

gap.xs、margin.xs 和 padding.xs 使用 xs 间距变量；text.size.xs 使用 xs 字号变量；border.xs 只设置边框宽度；shadow.xs 和 shadow.primary.xs 设置盒阴影；shadow.text.xs 和 shadow.text.primary.xs 设置文本阴影；border.subtle 设置 xs 宽度的实线 outline-subtle 边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `wrapper.text.size.3xl`

<a id="entry-wrapper-text-size-3xl"></a>

三倍特大

将主题的 3xl 字号应用于选中的内容。

根据 sys.typography.fontSize.3xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `wrapper.text.size.4xl`

<a id="entry-wrapper-text-size-4xl"></a>

四倍特大

将主题的 4xl 字号应用于选中的内容。

根据 sys.typography.fontSize.4xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `wrapper.text.size.xxl`

<a id="entry-wrapper-text-size-xxl"></a>

超大

gap.xxl、margin.xxl 和 padding.xxl 使用 xxl 间距变量；text.size.xxl 使用 xxl 字号变量。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `wrapper.text.size.xxs`

<a id="entry-wrapper-text-size-xxs"></a>

超小

gap.xxs、margin.xxs 和 padding.xxs 使用 xxs 间距变量；text.size.xxs 使用 xxs 字号变量。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。
