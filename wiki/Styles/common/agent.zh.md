# common.agent

<!-- Generated from native authoring; do not edit. -->

[English](agent.md)

`Styles.agent.*` — styles targeting the element's internal agent (the native HTML element backing a custom input).

---

## Variants

### `agent.background`

<a id="entry-agent-background"></a>

背景

通过组件的 agent 样式通道配置背景图像和颜色。

在宿主上写入由路径派生的 CSS 自定义属性，由组件样式表将这些属性应用于内部 agent。

使用内部 agent 样式表会使用对应变量的组件。

内部部分需要此变量通道之外的直接 CSS 时，使用带有显式 CSS 规则的 agent.css。

这是局部变量覆盖，不是主题定义，也不保证每个宿主都提供 agent。

位置参数顺序: `image` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `image` | `arrayOrString` | 图片<br>`{"cssKey":"backgroundImage"}` |
| `color` | `string` | 背景色<br>`{"cssKey":"backgroundColor"}` |

Sets the background of the internal agent element.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Styled',
        styles: ['agent.background(color:transparent)']
    }
];
```

### `agent.border`

<a id="entry-agent-border"></a>

边框

通过组件的 agent 样式通道配置边框宽度、样式、圆角和颜色。

在宿主上写入由路径派生的 CSS 自定义属性，由组件样式表将这些属性应用于内部 agent。

使用内部 agent 样式表会使用对应变量的组件。

内部部分需要此变量通道之外的直接 CSS 时，使用带有显式 CSS 规则的 agent.css。

这是局部变量覆盖，不是主题定义，也不保证每个宿主都提供 agent。

位置参数顺序: `color` → `radius` → `style` → `width`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"cssKey":"borderColor"}` |
| `radius` | `string` | 圆角半径<br>`{"cssKey":"borderRadius"}` |
| `style` | `string` | 边框样式<br>选项: `none` — 无, `solid` — 实线, `dashed` — 虚线, `dotted` — 点线, `double` — 双线, `groove` — 3D 凹槽, `ridge` — 3D 凸脊, `inset` — 3D 内嵌, `outset` — 3D 外凸<br>`{"cssKey":"borderStyle"}` |
| `width` | `string` | 边框宽度<br>`{"cssKey":"borderWidth"}` |

Sets the border of the internal agent element.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Styled',
        styles: ['agent.border(width:1px;style:solid;color:#ccc;radius:4px)']
    }
];
```

### `agent.size`

<a id="entry-agent-size"></a>

尺寸

通过组件的 agent 样式通道配置宽度、高度和最小尺寸。

在宿主上写入由路径派生的 CSS 自定义属性，由组件样式表将这些属性应用于内部 agent。

使用内部 agent 样式表会使用对应变量的组件。

内部部分需要此变量通道之外的直接 CSS 时，使用带有显式 CSS 规则的 agent.css。

这是局部变量覆盖，不是主题定义，也不保证每个宿主都提供 agent。

位置参数顺序: `height` → `minHeight` → `width` → `minWidth`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `height` | `string` | 高度<br>`{"cssKey":"height"}` |
| `minHeight` | `string` | 最小高度<br>`{"cssKey":"minHeight"}` |
| `width` | `string` | 宽度<br>`{"cssKey":"width"}` |
| `minWidth` | `string` | 最小宽度<br>`{"cssKey":"minWidth"}` |

Sets the size of the internal agent element.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Styled',
        styles: ['agent.size(width:100%;height:2.5rem)']
    }
];
```

### `agent.padding`

<a id="entry-agent-padding"></a>

内边距

通过组件的 agent 样式通道配置内部间距。

在宿主上写入由路径派生的 CSS 自定义属性，由组件样式表将这些属性应用于内部 agent。

使用内部 agent 样式表会使用对应变量的组件。

内部部分需要此变量通道之外的直接 CSS 时，使用带有显式 CSS 规则的 agent.css。

这是局部变量覆盖，不是主题定义，也不保证每个宿主都提供 agent。

位置参数顺序: `padding`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `padding` | `string` | 内边距<br>支持简写<br>`{"cssKey":"padding"}` |

Sets the padding of the internal agent element.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Styled',
        styles: ['agent.padding(padding:0.5rem 0.75rem)']
    }
];
```

### `agent.margin`

<a id="entry-agent-margin"></a>

外边距

通过组件的 agent 样式通道配置外部间距。

在宿主上写入由路径派生的 CSS 自定义属性，由组件样式表将这些属性应用于内部 agent。

使用内部 agent 样式表会使用对应变量的组件。

内部部分需要此变量通道之外的直接 CSS 时，使用带有显式 CSS 规则的 agent.css。

这是局部变量覆盖，不是主题定义，也不保证每个宿主都提供 agent。

位置参数顺序: `margin`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `margin` | `string` | 外边距<br>支持简写<br>`{"cssKey":"margin"}` |

Sets the margin of the internal agent element.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Styled',
        styles: ['agent.margin(margin:1rem 0 2rem)']
    }
];
```

### `agent.text`

<a id="entry-agent-text"></a>

文本

通过组件的 agent 样式通道配置字体族、字号、字重、行高和前景色。

在宿主上写入由路径派生的 CSS 自定义属性，由组件样式表将这些属性应用于内部 agent。

使用内部 agent 样式表会使用对应变量的组件。

内部部分需要此变量通道之外的直接 CSS 时，使用带有显式 CSS 规则的 agent.css。

这是局部变量覆盖，不是主题定义，也不保证每个宿主都提供 agent。

位置参数顺序: `font` → `size` → `weight` → `color` → `lineheight`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `font` | `string` | 字体族<br>`{"cssKey":"fontFamily"}` |
| `size` | `string` | 大小<br>`{"cssKey":"fontSize"}` |
| `weight` | `string` | 字重<br>选项: `normal` — 正常, `bold` — 粗体<br>`{"cssKey":"fontWeight"}` |
| `color` | `string` | 文本颜色<br>`{"cssKey":"color"}` |
| `lineheight` | `string` | 行高<br>选项: `normal` — 正常, `1` — 紧凑, `1.5` — 松散<br>`{"cssKey":"lineHeight"}` |

Sets the text styling of the internal agent element.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Styled',
        styles: ['agent.text(size:1.2rem)']
    }
];
```

### `agent.outline`

<a id="entry-agent-outline"></a>

轮廓

通过组件的 agent 样式通道配置轮廓宽度、样式和颜色。

在宿主上写入由路径派生的 CSS 自定义属性，由组件样式表将这些属性应用于内部 agent。

使用内部 agent 样式表会使用对应变量的组件。

内部部分需要此变量通道之外的直接 CSS 时，使用带有显式 CSS 规则的 agent.css。

这是局部变量覆盖，不是主题定义，也不保证每个宿主都提供 agent。

位置参数顺序: `width` → `style` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `width` | `string` | 轮廓宽度<br>`{"cssKey":"outlineWidth"}` |
| `style` | `string` | 轮廓样式<br>选项: `none` — 无, `solid` — 实线, `dashed` — 虚线, `dotted` — 点线, `double` — 双线, `groove` — 3D 凹槽, `ridge` — 3D 凸脊, `inset` — 3D 内嵌, `outset` — 3D 外凸<br>`{"cssKey":"outlineStyle"}` |
| `color` | `string` | 轮廓颜色<br>`{"cssKey":"outlineColor"}` |

Sets the outline of the internal agent element.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Styled',
        styles: ['agent.outline(width:2px;style:solid;color:var(--jam-ac-color))']
    }
];
```

### `agent.css`

<a id="entry-agent-css"></a>

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

Applies arbitrary CSS to the internal agent element. Accepts any CSS key-value pairs.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Styled',
        styles: ['agent.css(opacity:0.9;transition:all 0.2s)']
    }
];
```
