# common.text

<!-- Generated from native authoring; do not edit. -->

[English](text.md)

`Styles.text.*` -- font and text styling.

---

## Variants

### `text`

<a id="entry-text"></a>

字体族

为路径选中的目标配置字体排版。

映射字体、字号、字重、样式、装饰、间距、阴影、对齐、换行、行高、选择、缩进、光标和前景色字段；icon 路径使用自己的字体和阴影键。

字体排版选择 text，盒对齐选择 layout 或 align；包装元素需要保留几何结构时，针对插槽内容设置样式。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `font` → `size` → `weight` → `style` → `decoration` → `spacing` → `shadow` → `align` → `whitespace` → `lineheight` → `userselect` → `indent` → `caretColor` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `font` | `string` | 字体族<br>支持简写<br>`{"cssKey":"fontFamily"}` |
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

Applies font and text CSS properties to an element.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Hello',
        styles: ['text(size:1.5rem;weight:bold;color:var(--jam-ac-color))']
    }
];
```

### `number`

<a id="entry-text-number"></a>

数字

使用所选预设改善数字文本的外观。

text.digit 在当前字体中启用等高和等宽数字。text.number 改为选择 DINPro、略大的字号和粗字重。

digit 需要当前字体支持数字变体；number 要呈现预期字形，需要可用的 DINPro。

这些预设不解析或格式化数值，number 也不是 digit 的别名。

Number-specific font styling (DINPro, bold, 1.025em).

### `time`

<a id="entry-text-time"></a>

时间

应用适合时间类文字的紧凑等宽排版。

设置通用等宽字体、略大的字号、粗体字重和收紧的字间距。

这只控制排版；不格式化值，也不更新时钟。

Monospace time display styling (monospace, bold, 1.1em, tighter letter spacing).

### `digit`

<a id="entry-text-digit"></a>

数字

使用所选预设改善数字文本的外观。

text.digit 在当前字体中启用等高和等宽数字。text.number 改为选择 DINPro、略大的字号和粗字重。

digit 需要当前字体支持数字变体；number 要呈现预期字形，需要可用的 DINPro。

这些预设不解析或格式化数值，number 也不是 digit 的别名。

Uses lining, tabular numerals so digits share a stable width. No args.

### `ui`

<a id="entry-text-ui"></a>

界面字体

使用主题的 UI 字体族。

在选定目标上使用 sys.typography.fontFamily.ui 设置 font-family。

适用于普通界面文本；等宽字体或数字变体需求分别使用 text.mono 或 text.digit。

这些样式仅作用于局部。可复用的配色和尺寸体系由主题变量管理；应用预设不会重新定义主题。

Uses the active theme's `--jam-typography-font-family-ui` font family. No args.

### `mono`

<a id="entry-text-mono"></a>

等宽字体

选择浏览器通用等宽字体族。

根 text.mono 扩展应用 text，将 font 设置为 monospace。

嵌套的 text.mono 预设使用主题等宽字体令牌；此根扩展不遵循该令牌。

At the root, `text.mono` sets the CSS generic `monospace` font family.

### Contextual text presets

Nested common-text namespaces such as `cap.text` and `value.text` expose token-backed presets. Their `.mono` path uses `--jam-typography-font-family-mono`, and `.size.xxs`, `.size.xs`, `.size.s`, `.size.m`, `.size.l`, `.size.xl`, `.size.xxl`, `.size.3xl`, and `.size.4xl` use the matching `--jam-typography-font-size-*` token.

The root API is intentionally different: `text.size` is the single-value atom, not a preset namespace. Use `text.size(value:xs)` or `text(size:xs)` at the root; `text.size.xs` is only available under a contextual common-text namespace such as `cap.text.size.xs`.

### Individual property atoms

Each `text` arg is also available as a standalone style. For example:

-   `text.font(value:monospace)` -- sets font family
-   `text.size(value:1.5rem)` or `text.size(value:xs)` -- sets font size
-   `text.weight(value:bold)` -- sets font weight
-   `text.style(value:italic)` -- sets font style
-   `text.decoration(value:underline)` -- sets text decoration
-   `text.spacing(value:0.1em)` -- sets letter spacing
-   `text.shadow(value:1px 1px 2px black)` -- sets text shadow
-   `text.align(value:center)` -- sets text alignment
-   `text.whitespace(value:nowrap)` -- sets white-space handling
-   `text.lineheight(value:1.5)` -- sets line height
-   `text.userselect(value:none)` -- sets user select
-   `text.indent(value:2em)` -- sets text indent
-   `text.caretColor(value:red)` -- sets caret color
-   `text.color(value:red)` -- sets text color

Each atom variant accepts a single `value` argument.

## `text.font`

<a id="entry-text-font"></a>

字体族

将 `value` 写入 `font-family`。

需要同时配置多个相关属性时，使用更完整的 text 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 字体族 |

## `text.size`

<a id="entry-text-size"></a>

大小

将 `value` 写入 `font-size`。

需要同时配置多个相关属性时，使用更完整的 text 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 大小 |

## `text.align`

<a id="entry-text-align"></a>

对齐

将 `value` 写入 `text-align`。

需要同时配置多个相关属性时，使用更完整的 text 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 对齐 |

## `text.color`

<a id="entry-text-color"></a>

文本颜色

将 `value` 写入 `color`。

需要同时配置多个相关属性时，使用更完整的 text 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 文本颜色 |

## `text.style`

<a id="entry-text-style"></a>

样式

将 `value` 写入 `font-style`。

需要同时配置多个相关属性时，使用更完整的 text 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 样式 |

## `text.indent`

<a id="entry-text-indent"></a>

缩进

将 `value` 写入 `text-indent`。

需要同时配置多个相关属性时，使用更完整的 text 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 缩进 |

## `text.shadow`

<a id="entry-text-shadow"></a>

阴影

将 `value` 写入 `text-shadow`。

需要同时配置多个相关属性时，使用更完整的 text 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 阴影 |

## `text.weight`

<a id="entry-text-weight"></a>

字重

将 `value` 写入 `font-weight`。

需要同时配置多个相关属性时，使用更完整的 text 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 字重 |

## `text.spacing`

<a id="entry-text-spacing"></a>

间距

将 `value` 写入 `letter-spacing`。

需要同时配置多个相关属性时，使用更完整的 text 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 间距 |

## `text.caretColor`

<a id="entry-text-caretcolor"></a>

光标颜色

将 `value` 写入 `caret-color`。

需要同时配置多个相关属性时，使用更完整的 text 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 光标颜色 |

## `text.decoration`

<a id="entry-text-decoration"></a>

装饰

将 `value` 写入 `text-decoration`。

需要同时配置多个相关属性时，使用更完整的 text 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 装饰 |

## `text.lineheight`

<a id="entry-text-lineheight"></a>

行高

将 `value` 写入 `line-height`。

需要同时配置多个相关属性时，使用更完整的 text 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 行高 |

## `text.userselect`

<a id="entry-text-userselect"></a>

用户选择

将 `value` 写入 `user-select`。

需要同时配置多个相关属性时，使用更完整的 text 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 用户选择 |

## `text.whitespace`

<a id="entry-text-whitespace"></a>

空白处理

将 `value` 写入 `white-space`。

需要同时配置多个相关属性时，使用更完整的 text 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 空白处理 |
