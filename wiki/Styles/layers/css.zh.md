# layer.css

<!-- Generated from native authoring; do not edit. -->

[English](css.md)

`Styles.layer.css` — arbitrary CSS layer. Wraps `common/css` options in a layer context.

Applies CSS to a generated child. The style does not supply full-size geometry: position the host, then give the child its own position and bounds. Use for custom backgrounds, borders, masks, or other CSS decoration.

---

## Args

<a id="entry-layer-css"></a>

CSS 样式

内置图层外观不适用时创建自定义辅助图层。

创建图层，并通过通用 CSS 样式插件将 CSS 属性或解析后的 cssText 应用于该图层。

使用具有可用几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠取决于宿主及所选变体。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

使用 CSS 定义新图层的几何和外观；内置几何设置适用时，使用专用的背景、边框或其他图层变体。

CSS 属于所创建的图层，而不是宿主。此通用路径本身不提供背景或边框变体的全尺寸几何设置。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `display` → `position` → `width` → `height` → `minWidth` → `minHeight` → `maxWidth` → `maxHeight` → `paddingTop` → `paddingRight` → `paddingBottom` → `paddingLeft` → `margin` → `marginTop` → `marginRight` → `marginBottom` → `marginLeft` → `gap` → `color` → `background` → `backgroundColor` → `overflow` → `transition` → `whiteSpace` → `setProperty` → `removeProperty` → `getPropertyValue` → `selector` → `method` → `direct` → `cssText`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `zIndex` | `string` | 应用样式的目标的 CSS 堆叠顺序，受其堆叠上下文约束。 |
| `padding` | `string` | CSS 内边距简写，接受一至四个边的值。 |
| `borderRadius` | `string` | 应用样式的目标的 CSS 圆角；接受受支持的圆角令牌或 CSS 圆角值。 |
| `transform` | `string` | 应用于目标的 CSS transform，例如 translate、rotate 或 scale。 |
| `border` | `string` | CSS 边框宽度、样式和颜色的简写；受支持的边框令牌根据属性上下文解析。 |
| `opacity` | `string` | 应用样式的目标及其已渲染内容的 CSS 不透明度，范围从透明到不透明。 |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |
| `display` | `string` | 应用样式的目标的 CSS display 模式，例如 block、flex、grid 或 none。 |
| `position` | `string` | 应用样式的目标的 CSS 定位模式，例如 relative、absolute、fixed 或 sticky。 |
| `width` | `string` | 应用样式的目标的 CSS 宽度；使用 CSS 长度、百分比或受支持的尺寸关键字。 |
| `height` | `string` | 应用样式的目标的 CSS 高度；使用 CSS 长度、百分比或受支持的尺寸关键字。 |
| `minWidth` | `string` | 应用样式的目标的 CSS 最小宽度约束。 |
| `minHeight` | `string` | 应用样式的目标的 CSS 最小高度约束。 |
| `maxWidth` | `string` | 应用样式的目标的 CSS 最大宽度约束。 |
| `maxHeight` | `string` | 应用样式的目标的 CSS 最大高度约束。 |
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
| `overflow` | `string` | 应用样式的目标之外的内容的 CSS 溢出行为；使用一个值，或分别指定水平和垂直值。 |
| `transition` | `string` | 描述属性、持续时间、时间函数和延迟的 CSS transition 简写。 |
| `whiteSpace` | `string` | 应用样式的目标内的 CSS 空白和换行处理。 |
| `setProperty` | `string` | 来自样式声明方法的兼容入口 setProperty。它不是 CSS 声明或可调用的 JAML 操作；不要将其作为样式参数传入。 |
| `removeProperty` | `string` | 来自样式声明方法的兼容入口 removeProperty。它不是 CSS 声明或可调用的 JAML 操作；不要将其作为样式参数传入。 |
| `getPropertyValue` | `string` | 来自样式声明方法的兼容入口 getPropertyValue。它不是 CSS 声明或可调用的 JAML 操作；不要将其作为样式参数传入。 |
| `selector` | `string` | 选择器<br>默认根据样式路径自动创建。 |
| `method` | `string` | 应用方式<br>默认根据样式路径自动选择。<br>选项: `vars` — vars — 变量 — valueOrigin: `name`, `rule` — rule — 规则 — valueOrigin: `name`, `props` — props — 属性 — valueOrigin: `name` |
| `direct` | `boolean` | 仅作用于直接孩子<br>子元素选择器默认匹配直接子元素；有效 direct 值为 false 时，匹配所有后代元素。 |
| `cssText` | `functionOrString` | CSS 内容<br>可以是字符串，也可以是返回字典或字符串的函数。<br>支持简写 |

All CSS properties are also accepted as individual args (background, color, margin, padding, etc.).

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['css(position:relative)', 'layer.css(position:absolute;inset:0;display:block;pointer-events:none;background:linear-gradient(45deg,hsl(0 100% 50%),hsl(240 100% 50%));opacity:0.5)'],
        components: [{ type: 'label', cap: 'Gradient overlay' }]
    },
    {
        type: 'card',
        styles: ['css(position:relative)', 'layer.css(position:absolute;inset:0;display:block;pointer-events:none;background:hsl(0 0% 0% / 0.2);backdropFilter:blur(5px);borderRadius:inherit)'],
        components: [{ type: 'label', cap: 'Blur overlay' }]
    }
];
```
