# css / state-prefixed CSS

<!-- Generated from native authoring; do not edit. -->

[English](css.md)

<a id="entry-css"></a>

CSS 样式

应用没有更具体原生样式辅助函数的 CSS，包括显式限定作用范围的规则。

接受属性字典或 cssText；函数形式的 cssText 接收宿主，并返回字典或声明字符串。显式提供 state、selector 或 direct 参数时使用规则方式；否则由路径选择方式，最终回退为内联属性。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

vars 写入由路径派生的自定义属性，需要对应的使用方。规则定位及直接子元素匹配与直接内联定位不同；不要根据组件前缀推断其作用于全部后代。

位置参数顺序: `display` → `position` → `width` → `height` → `minWidth` → `minHeight` → `maxWidth` → `maxHeight` → `padding` → `paddingTop` → `paddingRight` → `paddingBottom` → `paddingLeft` → `margin` → `marginTop` → `marginRight` → `marginBottom` → `marginLeft` → `gap` → `color` → `background` → `backgroundColor` → `border` → `borderRadius` → `opacity` → `overflow` → `transform` → `transition` → `whiteSpace` → `zIndex` → `setProperty` → `removeProperty` → `getPropertyValue` → `selector` → `method` → `direct` → `cssText`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `display` | `string` | 应用样式的目标的 CSS display 模式，例如 block、flex、grid 或 none。 |
| `position` | `string` | 应用样式的目标的 CSS 定位模式，例如 relative、absolute、fixed 或 sticky。 |
| `width` | `string` | 应用样式的目标的 CSS 宽度；使用 CSS 长度、百分比或受支持的尺寸关键字。 |
| `height` | `string` | 应用样式的目标的 CSS 高度；使用 CSS 长度、百分比或受支持的尺寸关键字。 |
| `minWidth` | `string` | 应用样式的目标的 CSS 最小宽度约束。 |
| `minHeight` | `string` | 应用样式的目标的 CSS 最小高度约束。 |
| `maxWidth` | `string` | 应用样式的目标的 CSS 最大宽度约束。 |
| `maxHeight` | `string` | 应用样式的目标的 CSS 最大高度约束。 |
| `padding` | `string` | CSS 内边距简写，接受一至四个边的值。 |
| `paddingTop` | `string` | 顶部边缘的 CSS 内边距。 |
| `paddingRight` | `string` | 右侧边缘的 CSS 内边距。 |
| `paddingBottom` | `string` | 底部边缘的 CSS 内边距。 |
| `paddingLeft` | `string` | 左侧边缘的 CSS 内边距。 |
| `margin` | `string` | CSS 外边距简写，接受一至四个边的值。 |
| `marginTop` | `string` | 顶部边缘的 CSS 外边距。 |
| `marginRight` | `string` | 右侧边缘的 CSS 外边距。 |
| `marginBottom` | `string` | 底部边缘的 CSS 外边距。 |
| `marginLeft` | `string` | 左侧边缘的 CSS 外边距。 |
| `gap` | `string` | 网格或 flex 项之间的 CSS 间距；一个值设置两个轴，两个值依次设置行间距和列间距。 |
| `color` | `string` | 应用样式的目标的 CSS 前景颜色；使用颜色值或受支持的前景令牌。 |
| `background` | `string` | 应用样式的目标的 CSS 背景简写，包括受支持的填充令牌或显式图像和颜色。 |
| `backgroundColor` | `string` | 应用样式的目标的 CSS 背景颜色；使用颜色值或受支持的填充令牌。 |
| `border` | `string` | CSS 边框宽度、样式和颜色的简写；受支持的边框令牌根据属性上下文解析。 |
| `borderRadius` | `string` | 应用样式的目标的 CSS 圆角；接受受支持的圆角令牌或 CSS 圆角值。 |
| `opacity` | `string` | 应用样式的目标及其已渲染内容的 CSS 不透明度，范围从透明到不透明。 |
| `overflow` | `string` | 应用样式的目标之外的内容的 CSS 溢出行为；使用一个值，或分别指定水平和垂直值。 |
| `transform` | `string` | 应用于目标的 CSS transform，例如 translate、rotate 或 scale。 |
| `transition` | `string` | 描述属性、持续时间、时间函数和延迟的 CSS transition 简写。 |
| `whiteSpace` | `string` | 应用样式的目标内的 CSS 空白和换行处理。 |
| `zIndex` | `string` | 应用样式的目标的 CSS 堆叠顺序，受其堆叠上下文约束。 |
| `setProperty` | `string` | 来自样式声明方法的兼容入口 setProperty。它不是 CSS 声明或可调用的 JAML 操作；不要将其作为样式参数传入。 |
| `removeProperty` | `string` | 来自样式声明方法的兼容入口 removeProperty。它不是 CSS 声明或可调用的 JAML 操作；不要将其作为样式参数传入。 |
| `getPropertyValue` | `string` | 来自样式声明方法的兼容入口 getPropertyValue。它不是 CSS 声明或可调用的 JAML 操作；不要将其作为样式参数传入。 |
| `selector` | `string` | 选择器<br>默认根据样式路径自动创建。 |
| `method` | `string` | 应用方式<br>默认根据样式路径自动选择。<br>选项: `vars` — vars — 变量 — valueOrigin: `name`, `rule` — rule — 规则 — valueOrigin: `name`, `props` — props — 属性 — valueOrigin: `name` |
| `direct` | `boolean` | 仅作用于直接孩子<br>子元素选择器默认匹配直接子元素；有效 direct 值为 false 时，匹配所有后代元素。 |
| `cssText` | `functionOrString` | CSS 内容<br>可以是字符串，也可以是返回字典或字符串的函数。<br>支持简写 |

Inline CSS styles with pseudo-class/state scoped variants. Each is a standalone function — they are **not** nested under `css`.

## Variants

-   **`css(key:val;...)`** — always applied to the element
-   **`hover(key:val;...)`** — applied on `:hover`
-   **`visited(key:val;...)`** — declared compatibility helper without a `:visited` mapping in this baseline; use an explicit selector
-   **`active(key:val;...)`** — applied on `:active`
-   **`focus(key:val;...)`** — applied on `:focus`
-   **`disabled(key:val;...)`** — scoped to `:disabled`
-   **`checked(key:val;...)`** — scoped to the framework `.jam-checked` class
-   **`indeterminate(key:val;...)`** — scoped to the framework `.jam-indeterminate` class
-   **`before(key:val;...)`** — applied to `::before` pseudo-element
-   **`after(key:val;...)`** — applied to `::after` pseudo-element

Each accepts arbitrary CSS key-value pairs in semicolon format. Raw CSS values and explicit `var(...)` references remain valid.

## State overrides and `method:rule`

Plain `css(...)` applies declarations as inline styles. State-prefixed variants such as `hover(...)`, `active(...)`, and `focus(...)` use scoped stylesheet rules. If both set the same CSS property, the inline declaration wins and the state value will not appear.

Set `method:rule` on the base `css(...)` style when a state needs to override the same property. This routes the base declaration through a scoped rule as well, allowing the state selector to win normally. `method` is routing metadata and is not emitted as a CSS property.

```javascript jaml-playground
export default {
    type: 'button',
    cap: 'Hover me',
    styles: ['css(method:rule;background-color:primary;color:onprimary)', 'hover(background-color:secondary;color:onsecondary)']
};
```

## Property-aware token values

For supported properties, a bare top-level value can name a design-system token. Resolution depends on the CSS property, so the same word can have the correct meaning in each declaration. For example, `xs` is spacing in `padding` and border width in `border`, while `primary` is a default fill in `background`, a foreground in `color`, and a subtle edge color in `border`.

| CSS context                                                                                          | Accepted values                                                                                             | Resolution                                                                |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `padding*`, `margin*`, `gap`, `row-gap`, `column-gap`, `grid-gap`, `grid-row-gap`, `grid-column-gap` | `xxs`, `xs`, `s`, `m`, `l`, `xl`, `xxl`                                                                     | `--jam-space-*`                                                           |
| `border-radius` and corner radius properties                                                         | `xxs`, `xs`, `s`, `m`, `l`, `xl`, `xxl`                                                                     | `--jam-border-radius-*`                                                   |
| Border side shorthands and widths, `outline`, `column-rule`                                          | `xxs`, `xs`, `s`, `m`, `l`, `xl`, `xxl`                                                                     | `--jam-border-width-*`                                                    |
| `font-size`                                                                                          | `xxs`, `xs`, `s`, `m`, `l`, `xl`, `xxl`, `3xl`, `4xl`                                                       | `--jam-typography-font-size-*`                                            |
| `background`, `background-color`                                                                     | `primary`, `secondary`, `tertiary`, `quaternary`, `neutral`, `tint`, `elevated`                             | Matching `--jam-color-*-default`                                          |
| `background`, `background-color`                                                                     | `lowest`, `lower`, `default`, `higher`, `highest`                                                           | Matching `--jam-color-surface-*`                                          |
| `color`                                                                                              | `default`, `strong`, `subtle`, `muted`, `faint`, `accent`, `primary`, `secondary`, `tertiary`, `quaternary` | Matching `--jam-color-fg-*`; `accent` aliases `primary`                   |
| `color`                                                                                              | `onprimary`, `onsecondary`, `ontertiary`, `onquaternary`                                                    | Matching `--jam-color-on-*`                                               |
| Border side shorthands and edge-color properties                                                     | `primary`, `secondary`, `tertiary`, `quaternary`                                                            | Matching `--jam-color-*-subtle`                                           |
| Border side shorthands and edge-color properties                                                     | `subtle`, `muted`, `faint`                                                                                  | Matching `--jam-color-outline-*`                                          |
| Border side shorthands and edge-color properties                                                     | `lowest`, `lower`, `default`, `higher`, `highest`                                                           | Matching `--jam-color-surface-*`                                          |
| Token segments in `box-shadow`                                                                       | `xs`, `s`, `m`, `l`, `xl`, `xxl`; `primary.xs` / `primary-xs` through `primary.xl` / `primary-xl`           | Matching `--jam-shadow-*`, including compound comma-separated values      |
| Token segments in `text-shadow`                                                                      | `xs`, `s`, `m`; `primary.xs` / `primary-xs` through `primary.m` / `primary-m`                               | Matching `--jam-text-shadow-*`, including compound comma-separated values |
| Single token argument in `filter: drop-shadow(...)`                                                  | Box-shadow values above                                                                                     | Matching `--jam-shadow-*`                                                 |

The compact on-color values intentionally omit the dot. Use `onprimary` inside `css(color:...)`; `color.on.primary` is the separate native style path.

Resolution occurs before the existing color shorthands, so property semantics win: `border:solid xs primary` uses `--jam-color-primary-subtle`, not a calculated accent color. Lowercase `ac`, `onac`, `lumitext(N)`, and `colortext`/`colortext[n]`, CSS named colors, semantic color-set names, and registered custom colors continue to work in color-capable declarations.

Replacement applies to the native singular `style` param (string or dictionary), `css(...)`, every state-prefixed CSS style, `Styles.props(...)`, scoped rule dictionaries, and dictionary-form `Styles.stylesheet({...})`. Dictionary replacement is recursive, so token values inside nested selector declarations in `Styles.stylesheet({...})` are resolved too. Bare values inside `calc(...)`, gradients, `var(...)`, URLs, and quoted content are left unchanged. The one function exception is `filter: drop-shadow(token)`, where a recognized single shadow token is resolved. Use an explicit `var(--jam-...)` reference for other values inside functions.

Compound shadows preserve the surrounding CSS while replacing recognized segments, for example `box-shadow: xs inset, primary-xl` and `filter: blur(2px) drop-shadow(primary.xl)`.

A stylesheet string is already compiled CSS and is not parsed for these shorthands. In particular, theme SCSS imported as `Styles.stylesheet(indexStyle)` must use explicit `var(--jam-...)` references. Use the dictionary form only when runtime property-aware replacement is intended.

## Usage

```javascript jaml-playground
export default {
    type: 'button',
    cap: 'Interactive',
    styles: ['css(padding:xs s;border:solid xs primary;background:tint)', 'hover(transform:scale(1.05))', 'active(transform:scale(0.95))']
};
```

The first declaration resolves `padding` to `--jam-space-xs` and `--jam-space-s`, the border width to `--jam-border-width-xs`, the border color to `--jam-color-primary-subtle`, and the background to `--jam-color-tint-default`. For a strongly colored fill, pair contexts explicitly: `css(background:primary;color:onprimary)`.
