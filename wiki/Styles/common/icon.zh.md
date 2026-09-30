# common.icon

<!-- Generated from native authoring; do not edit. -->

[English](icon.md)

`Styles.icon.*` -- icon customization using Font Awesome, emoji, or other icon sets.

---

## Common arguments

<a id="common-args-icon-solid"></a>

位置参数顺序: `color` → `strokeWidth` → `strokeColor` → `size`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `color` | `string` | `hsl(var(--jam-ac-h), var(--jam-ac-s), calc(var(--jam-ac-l) + 10%))` | 颜色<br>支持简写 |
| `strokeWidth` | `string` | `0.0625rem` | 描边 |
| `strokeColor` | `string` | `hsl(0, 0%, calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 20))` | 描边颜色 |
| `size` | `string` | 未提供 | 大小 |

## Variants

### `icon.solid`

<a id="entry-icon-solid"></a>

实心

使用 solid 呈现方式渲染图标。

在首次应用及 iconslotchange 时，将仅含单个文本节点的图标节点替换为 i 元素，附上指定的字体/形状类和样式变量；移除时恢复保存的文本。

需要原生 icon 插槽，且内容为简单文本。基于字体的变体需要对应的图标字体或资源。

已有的复杂图标标记保持原样；此样式不会下载缺失的图标资源。

位置参数顺序: `color` → `strokeWidth` → `strokeColor` → `size`.

公共参数: [icon.solid](#common-args-icon-solid).

Customizes the icon appearance on an element with an icon slot.

`icon` is a style namespace; select a rendering style such as `icon.solid` or `icon.emoji`.

```javascript jaml-playground
export default [
    {
        type: 'label',
        icon: 'star',
        cap: 'Starred',
        styles: ['icon.solid(size:1.5rem;color:gold)']
    }
];
```

### `emoji`

<a id="entry-icon-emoji"></a>

表情符号

使用 emoji 呈现方式渲染图标。

在首次应用及 iconslotchange 时，将仅含单个文本节点的图标节点替换为 i 元素，附上指定的字体/形状类和样式变量；移除时恢复保存的文本。

需要原生 icon 插槽，且内容为简单文本。基于字体的变体需要对应的图标字体或资源。

已有的复杂图标标记保持原样；此样式不会下载缺失的图标资源。

位置参数顺序: `color` → `strokeWidth` → `strokeColor` → `size`.

公共参数: [icon.solid](#common-args-icon-solid).

Renders the icon as an emoji character. Same args as `icon.solid`.

### `light`

<a id="entry-icon-light"></a>

细体

使用 light 呈现方式渲染图标。

在首次应用及 iconslotchange 时，将仅含单个文本节点的图标节点替换为 i 元素，附上指定的字体/形状类和样式变量；移除时恢复保存的文本。

需要原生 icon 插槽，且内容为简单文本。基于字体的变体需要对应的图标字体或资源。

已有的复杂图标标记保持原样；此样式不会下载缺失的图标资源。

位置参数顺序: `color` → `strokeWidth` → `strokeColor` → `size`.

公共参数: [icon.solid](#common-args-icon-solid).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `strokeWidth` | `string` | `0px` | 描边 |

Thin icon style using Font Awesome Light (fal). Same args as `icon.solid` but `strokeWidth` defaults to `0px`.

### `regular`

<a id="entry-icon-regular"></a>

常规

使用 regular 呈现方式渲染图标。

在首次应用及 iconslotchange 时，将仅含单个文本节点的图标节点替换为 i 元素，附上指定的字体/形状类和样式变量；移除时恢复保存的文本。

需要原生 icon 插槽，且内容为简单文本。基于字体的变体需要对应的图标字体或资源。

已有的复杂图标标记保持原样；此样式不会下载缺失的图标资源。

位置参数顺序: `color` → `strokeWidth` → `strokeColor` → `size`.

公共参数: [icon.solid](#common-args-icon-solid).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `strokeWidth` | `string` | `0px` | 描边 |

Regular icon style using Font Awesome Regular (far). Same args as `icon.solid` but `strokeWidth` defaults to `0px`.

### `duotone`

<a id="entry-icon-duotone"></a>

双色调

使用 duotone 呈现方式渲染图标。

在首次应用及 iconslotchange 时，将仅含单个文本节点的图标节点替换为 i 元素，附上指定的字体/形状类和样式变量；移除时恢复保存的文本。

需要原生 icon 插槽，且内容为简单文本。基于字体的变体需要对应的图标字体或资源。

已有的复杂图标标记保持原样；此样式不会下载缺失的图标资源。

位置参数顺序: `color` → `strokeWidth` → `strokeColor` → `size` → `color2`.

公共参数: [icon.solid](#common-args-icon-solid).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `color2` | `string` | `hsl(0, 0%, calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 44))` | 辅色 |

Dual-tone icon style using Font Awesome Duotone (fad). Same args as `icon.solid`, plus:

### `solid`

Solid icon style using Font Awesome Solid (fas). Same args as `icon.solid`.

### `brand`

<a id="entry-icon-brand"></a>

品牌

使用 brand 呈现方式渲染图标。

在首次应用及 iconslotchange 时，将仅含单个文本节点的图标节点替换为 i 元素，附上指定的字体/形状类和样式变量；移除时恢复保存的文本。

需要原生 icon 插槽，且内容为简单文本。基于字体的变体需要对应的图标字体或资源。

已有的复杂图标标记保持原样；此样式不会下载缺失的图标资源。

位置参数顺序: `color` → `strokeWidth` → `strokeColor` → `size`.

公共参数: [icon.solid](#common-args-icon-solid).

Brand icon style using Font Awesome Brand (fab). Same args as `icon.solid`.

### `chars`

<a id="entry-icon-chars"></a>

字符

使用 chars 呈现方式渲染图标。

在首次应用及 iconslotchange 时，将仅含单个文本节点的图标节点替换为 i 元素，附上指定的字体/形状类和样式变量；移除时恢复保存的文本。

需要原生 icon 插槽，且内容为简单文本。基于字体的变体需要对应的图标字体或资源。

已有的复杂图标标记保持原样；此样式不会下载缺失的图标资源。

位置参数顺序: `color` → `strokeWidth` → `strokeColor` → `size`.

公共参数: [icon.solid](#common-args-icon-solid).

Renders icon text as plain characters instead of converting it to a Font Awesome class. Same args as `icon.solid`.

### `withbg`

<a id="entry-icon-withbg"></a>

带背景

为已渲染的图标添加背景。

找到 icon 插槽中的第一个 i 元素，应用背景变量和装饰类；拔除时移除这些添加的内容。

需在创建 i 元素的图标渲染器之后组合使用；此样式不创建图标本身。

位置参数顺序: `radius` → `bg`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `radius` | `string` | `0.55em` | 圆角 |
| `bg` | `string` | `radial-gradient(hsla(0,0%,100%,0.33), hsla(0,0%,0%,0.15)) 50% 100% / 300% 200% hsl(var(--jam-ac-h), var(--jam-ac-s), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 38))` | 背景颜色 |

Icon with a background behind it.

### `withborder`

<a id="entry-icon-withborder"></a>

带边框

为已渲染的图标添加边框。

找到 icon 插槽中的第一个 i 元素，应用边框变量和装饰类；拔除时移除这些添加的内容。

需在创建 i 元素的图标渲染器之后组合使用；此样式不创建图标本身。

位置参数顺序: `radius` → `borderWidth` → `borderColor`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `radius` | `string` | `1em` | 圆角 |
| `borderWidth` | `string` | `0.125rem` | 边框宽度 |
| `borderColor` | `string` | `currentColor` | 边框颜色 |

Icon with a border around it.

### `bar`

<a id="entry-icon-bar"></a>

条

在 icon 插槽中使用简单的条形。

为宿主添加 shaped-icon 类，并向 icon 插槽追加带有条形图标类的 span。

适用于几何标记已足够的场景；语义文本需通过宿主标题或无障碍标签提供。

Creates a shaped icon bar by inserting a `span.jam-icon-bar` into the icon slot.

### `dot`

<a id="entry-icon-dot"></a>

点

在 icon 插槽中使用简单的圆点。

为宿主添加 shaped-icon 类，并向 icon 插槽追加带有圆点图标类的 span。

适用于几何标记已足够的场景；语义文本需通过宿主标题或无障碍标签提供。

Creates a shaped icon dot by inserting a `span.jam-icon-dot` into the icon slot.

### `square`

<a id="entry-icon-square"></a>

方形

在 icon 插槽中使用简单的方形。

为宿主添加 shaped-icon 类，并向 icon 插槽追加带有方形图标类的 span。

适用于几何标记已足够的场景；语义文本需通过宿主标题或无障碍标签提供。

Creates a shaped square icon by inserting a `span.jam-icon-square` into the icon slot. The square is `0.875em` on each side and uses the theme's extra-small border radius. No args.

### `arrow`

<a id="entry-icon-arrow"></a>

箭头

显示由值或状态驱动的紧凑方向图标。

追加几何箭头。输入元素的数值在 valuechange 时决定上下方向；其他宿主在 statechange 时使用 stateDirections。

autoDirection 虽已声明，但不决定所走分支，分支由宿主类型决定。清理所需的回调事件名未被保存，因此反复替换样式可能残留监听器。

位置参数顺序: `direction` → `autoDirection` → `stateDirections`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `direction` | `string` | `up` | 方向 |
| `autoDirection` | `string` | `value` | 自动方向<br>选项: `value`, `state` |
| `stateDirections` | `dictionary` | `{"expanded":"down","default":"right"}` | 按状态指定方向 |

Creates a shaped arrow icon. Numeric input value changes point it down for negative values and up otherwise. Other elements use their `state` to choose a direction.



## `icon.text`

<a id="entry-icon-text"></a>

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

## `icon.color`

<a id="entry-icon-color"></a>

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

## `icon.inline`

<a id="entry-icon-inline"></a>

行内布局

使选中的目标使用框架的内联外观。

为路径选中的目标添加 jam-inline。

所选组件或目标的样式表必须实现 inline 类。

这是类名约定，不是无条件的内联显示声明。

## `icon.text.mono`

<a id="entry-icon-text-mono"></a>

等宽字体

为路径选中的目标使用主题的等宽字体族。

嵌套的 text.mono 预设选择 sys.typography.fontFamily.mono。

根路径 text.mono 扩展改为使用通用的 monospace 字体族。这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `icon.color.accent`

<a id="entry-icon-color-accent"></a>

强调色

根据路径选择强调的前景色或强调色前景。

color.strong 使用 strong 前景色变量；嵌套的 color.accent 使用 primary 前景色变量，并添加 colored 类。

两者是不同的角色。根路径 color.accent 具有独立的颜色配置行为，不属于此共享预设组。

## `icon.background.tint`

<a id="entry-icon-background-tint"></a>

染色

根据 sys.color.tint.default 设置 background-color。

将填充与适合该表面的前景色角色配合使用。根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `icon.text.size.l`

<a id="entry-icon-text-size-l"></a>

大

gap.l、margin.l 和 padding.l 使用 l 间距变量；text.size.l 使用 l 字号变量；border.l 只设置边框宽度；shadow.l 和 shadow.primary.l 设置盒阴影。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `icon.text.size.m`

<a id="entry-icon-text-size-m"></a>

中等

gap.m、margin.m 和 padding.m 使用 m 间距变量；text.size.m 使用 m 字号变量；border.m 只设置边框宽度；shadow.m 和 shadow.primary.m 设置盒阴影；shadow.text.m 和 shadow.text.primary.m 设置文本阴影；border.default 设置 xs 宽度的实线 surface-default 边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `icon.text.size.s`

<a id="entry-icon-text-size-s"></a>

小

gap.s、margin.s 和 padding.s 使用 s 间距变量；text.size.s 使用 s 字号变量；border.s 只设置边框宽度；shadow.s 和 shadow.primary.s 设置盒阴影；shadow.text.s 和 shadow.text.primary.s 设置文本阴影；border.faint 和 border.muted 设置 xs 宽度的实线轮廓角色边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `icon.text.size.xl`

<a id="entry-icon-text-size-xl"></a>

极大

gap.xl、margin.xl 和 padding.xl 使用 xl 间距变量；text.size.xl 使用 xl 字号变量；border.xl 只设置边框宽度；shadow.xl 和 shadow.primary.xl 设置盒阴影。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `icon.text.size.xs`

<a id="entry-icon-text-size-xs"></a>

极小

gap.xs、margin.xs 和 padding.xs 使用 xs 间距变量；text.size.xs 使用 xs 字号变量；border.xs 只设置边框宽度；shadow.xs 和 shadow.primary.xs 设置盒阴影；shadow.text.xs 和 shadow.text.primary.xs 设置文本阴影；border.subtle 设置 xs 宽度的实线 outline-subtle 边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `icon.text.size.3xl`

<a id="entry-icon-text-size-3xl"></a>

三倍特大

将主题的 3xl 字号应用于选中的内容。

根据 sys.typography.fontSize.3xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `icon.text.size.4xl`

<a id="entry-icon-text-size-4xl"></a>

四倍特大

将主题的 4xl 字号应用于选中的内容。

根据 sys.typography.fontSize.4xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `icon.text.size.xxl`

<a id="entry-icon-text-size-xxl"></a>

超大

gap.xxl、margin.xxl 和 padding.xxl 使用 xxl 间距变量；text.size.xxl 使用 xxl 字号变量。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `icon.text.size.xxs`

<a id="entry-icon-text-size-xxs"></a>

超小

gap.xxs、margin.xxs 和 padding.xxs 使用 xxs 间距变量；text.size.xxs 使用 xxs 字号变量。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。
