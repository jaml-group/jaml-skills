# visited

<!-- Generated from native authoring; do not edit. -->

[English](visited.md)

## `visited`

<a id="entry-visited"></a>

已访问样式

为样式路径选定的目标应用 visited 状态的 CSS。

工厂将状态名称传给共享的选择器构建器。

根据目标选择宿主、插槽内容或插槽包装器路径；插槽包装器与分配给它的内容是不同目标。

当前状态映射不将 visited 转换为 :visited。需要该浏览器伪类时，通过 css 提供显式的 :visited 选择器。

位置参数顺序: `display` → `position` → `width` → `height` → `minWidth` → `minHeight` → `maxWidth` → `maxHeight` → `padding` → `paddingTop` → `paddingRight` → `paddingBottom` → `paddingLeft` → `margin` → `marginTop` → `marginRight` → `marginBottom` → `marginLeft` → `gap` → `color` → `background` → `backgroundColor` → `border` → `borderRadius` → `opacity` → `overflow` → `transform` → `transition` → `whiteSpace` → `zIndex` → `setProperty` → `removeProperty` → `getPropertyValue` → `selector` → `method` → `direct` → `cssText` → `state`.

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
| `state` | `string` | 状态<br>选项: `hover` — 悬停, `active` — 激活, `focus` — 聚焦, `disabled` — 禁用, `visited` — 已访问, `checked` — 选中, `indeterminate` — 不确定状态, `before` — before 伪元素, `after` — after 伪元素 |
