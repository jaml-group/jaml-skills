# extra

<!-- Generated from native authoring; do not edit. -->

[English](extra.md)

## `extra.text`

<a id="entry-extra-text"></a>

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

## `extra.color`

<a id="entry-extra-color"></a>

说明见 [`color`](common/color.zh.md#entry-color)。

位置参数顺序: `h` → `s` → `l` → `a` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `h` | `numberOrString` | 色相 |
| `s` | `numberOrString` | 饱和度 |
| `l` | `numberOrString` | 亮度 |
| `a` | `numberOrString` | 透明度 |
| `color` | `string` | 颜色<br>支持简写 |

## `extra.inline`

<a id="entry-extra-inline"></a>

行内布局

使选中的目标使用框架的内联外观。

为路径选中的目标添加 jam-inline。

所选组件或目标的样式表必须实现 inline 类。

这是类名约定，不是无条件的内联显示声明。

## `extra.text.mono`

<a id="entry-extra-text-mono"></a>

等宽字体

为路径选中的目标使用主题的等宽字体族。

嵌套的 text.mono 预设选择 sys.typography.fontFamily.mono。

根路径 text.mono 扩展改为使用通用的 monospace 字体族。这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `extra.color.accent`

<a id="entry-extra-color-accent"></a>

强调色

根据路径选择强调的前景色或强调色前景。

color.strong 使用 strong 前景色变量；嵌套的 color.accent 使用 primary 前景色变量，并添加 colored 类。

两者是不同的角色。根路径 color.accent 具有独立的颜色配置行为，不属于此共享预设组。

## `extra.background.tint`

<a id="entry-extra-background-tint"></a>

染色

根据 sys.color.tint.default 设置 background-color。

将填充与适合该表面的前景色角色配合使用。根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `extra.text.size.l`

<a id="entry-extra-text-size-l"></a>

大

text.size.l 使用 l 字号变量。

## `extra.text.size.m`

<a id="entry-extra-text-size-m"></a>

中等

text.size.m 使用 m 字号变量。

## `extra.text.size.s`

<a id="entry-extra-text-size-s"></a>

小

text.size.s 使用 s 字号变量。

## `extra.text.size.xl`

<a id="entry-extra-text-size-xl"></a>

极大

text.size.xl 使用 xl 字号变量。

## `extra.text.size.xs`

<a id="entry-extra-text-size-xs"></a>

极小

text.size.xs 使用 xs 字号变量。

## `extra.text.size.3xl`

<a id="entry-extra-text-size-3xl"></a>

三倍特大

将主题的 3xl 字号应用于选中的内容。

根据 sys.typography.fontSize.3xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `extra.text.size.4xl`

<a id="entry-extra-text-size-4xl"></a>

四倍特大

将主题的 4xl 字号应用于选中的内容。

根据 sys.typography.fontSize.4xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `extra.text.size.xxl`

<a id="entry-extra-text-size-xxl"></a>

超大

text.size.xxl 使用 xxl 字号变量。

## `extra.text.size.xxs`

<a id="entry-extra-text-size-xxs"></a>

超小

text.size.xxs 使用 xxs 字号变量。
