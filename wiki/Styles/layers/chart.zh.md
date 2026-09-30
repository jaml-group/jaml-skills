# layer.chart

<!-- Generated from native authoring; do not edit. -->

[English](chart.md)

`Styles.layer.chart` — ECharts integration layer. Renders a chart as a background or overlay layer.

---

## Args

<a id="entry-layer-chart"></a>

图表图层

在宿主内容后嵌入小型装饰图表。

在图层中创建所请求类型的图表，并传递 data、dataUrl 和图表样式；随后追加紧凑网格以及隐藏坐标轴、分割线、提示框、图例、标题和标签的样式。

提供受支持的图表类型及其数据，加载框架图表运行时，并为宿主提供可用尺寸。指定 aspectRatio 会清除默认图层宽度，使高度能够决定其尺寸。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

通过图层自身的参数或 css 配置该图层。再次应用图层样式会创建另一个子节点，而不是更新第一个图层。

追加的隐藏图表附属元素样式位于调用方样式之后，且图层不接收指针事件。交互式数据探索应使用独立图表元素。

位置参数顺序: `type` → `data` → `dataUrl` → `styles` → `width` → `height` → `aspectRatio` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `alignSelf` → `alignItems` → `alignContent` → `justifySelf` → `justifyItems` → `justifyContent` → `align`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `type` | `string` | 未提供 | 图表类型<br>选项: `line`, `pie`, `bar`, `scatter`, `radar`, `tree`, `treemap`, `sunburst`, `boxplot`, `candlestick`, `heatmap`, `map`, `parallel`, `sankey`, `funnel`, `gauge`, `pictorialBar`, `themeRiver`, `custom` |
| `data` | `array` | 未提供 | 数据 |
| `dataUrl` | `string` | 未提供 | 数据地址 |
| `styles` | `array` | `[]` | 样式 |
| `width` | `string` | `100%` | 宽度 |
| `height` | `string` | `100%` | 高度 |
| `aspectRatio` | `string` | 未提供 | 宽高比 |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `alignSelf` | `string` | 未提供 | 自身交叉轴对齐<br>align-self 覆盖单个元素的 align-items 对齐设置。在 Grid 中，使元素在其网格区域内对齐；在 Flexbox 中，使元素沿交叉轴（垂直于 flex 排列方向的轴）对齐。<br>选项: `stretch` — 拉伸, `center` — 居中, `baseline` — 基线, `flex-end` — 结束, `flex-start` — 起始<br>`{"cssKey":"alignSelf"}` |
| `alignItems` | `string` | 未提供 | 子元素交叉轴对齐<br>align-items 为直接子元素统一设置默认的 align-self。在 Flexbox 中控制交叉轴对齐；在 Grid 中控制元素在各自网格区域内的块轴对齐。<br>选项: `stretch` — 拉伸, `center` — 居中, `baseline` — 基线, `flex-end` — 结束, `flex-start` — 起始<br>`{"cssKey":"alignItems"}` |
| `alignContent` | `string` | 未提供 | 内容空间分配（align-content）<br>align-content 沿 Flexbox 的交叉轴分配各行之间及周围的空间，或沿 Grid 的块轴分配各轨道之间及周围的空间。<br>选项: `flex-start` — 起始, `center` — 居中, `flex-end` — 结束, `space-between` — 两端间隔, `space-around` — 环绕间隔, `space-evenly` — 均匀间隔<br>`{"cssKey":"alignContent"}` |
| `justifySelf` | `string` | 未提供 | 自身主轴对齐<br>justify-self 设置单个盒子在布局容器中相应轴上的对齐方式。<br>选项: `stretch` — 拉伸, `center` — 居中, `baseline` — 基线, `flex-end` — 结束, `flex-start` — 起始<br>`{"cssKey":"justifySelf"}` |
| `justifyItems` | `string` | 未提供 | 子元素主轴对齐<br>justify-items 为各元素设置默认的 justify-self，使元素沿相应轴在各自盒子内对齐。<br>选项: `stretch` — 拉伸, `center` — 居中, `baseline` — 基线, `flex-end` — 结束, `flex-start` — 起始<br>`{"cssKey":"justifyItems"}` |
| `justifyContent` | `string` | 未提供 | 主轴内容空间分配<br>justify-content 沿 Flex 容器的主轴或 Grid 容器的行轴，分配元素之间及周围的空间。<br>选项: `flex-start` — 起始, `center` — 居中, `flex-end` — 结束, `space-between` — 两端间隔, `space-around` — 环绕间隔, `space-evenly` — 均匀间隔<br>`{"cssKey":"justifyContent"}` |
| `align` | `string` | 未提供 | 对齐<br>align 是同时设置 align-items 和 align-content 的简写。<br>支持简写<br>选项: `left-top` — 左上, `center-top` — 中上, `right-top` — 右上, `left-middle` — 左中, `center-middle` — 居中, `right-middle` — 右中, `left-bottom` — 左下, `center-bottom` — 中下, `right-bottom` — 右下, `around-top` — 环绕间隔，上对齐, `around-middle` — 环绕间隔，中对齐, `around-bottom` — 环绕间隔，下对齐, `evenly-top` — 均匀间隔，上对齐, `evenly-middle` — 均匀间隔，中对齐, `evenly-bottom` — 均匀间隔，下对齐, `between-top` — 两端间隔，上对齐, `between-middle` — 两端间隔，中对齐, `between-bottom` — 两端间隔，下对齐 |

Standard layer args also apply: `zIndex`, `opacity`, `mask`, `filter`, `padding`, `borderRadius`, `entryAnimation`, `exitAnimation`, etc.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Line chart',
        styles: ["layer.chart(type:line;data:[{name:'Trend',data:[120,200,150,80,70,110,130]}];width:100%;height:100%)"]
    },
    {
        type: 'indicator',
        cap: 'Pie chart',
        styles: ["layer.chart(type:pie;data:[{name:'Share',data:[{value:40,name:'A'},{value:30,name:'B'},{value:30,name:'C'}]}])"]
    }
];
```
