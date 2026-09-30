# ECharts styles

<!-- Generated from native authoring; do not edit. -->

[English](echarts.md)

<a id="entry-echarts"></a>

ECharts 基础样式

为图表元素提供默认的 ECharts 绘图区布局。

应用 grid 样式。图表元素还会应用与其图表类型匹配的样式；此根样式不选择系列类型。

用于派生自 CashewChart 的图表，需要可用的 ECharts 和可测量的宿主尺寸。

图表在重绘时构建选项，等待已注册的图表函数完成，解析基于主题的 ECharts 值，再向 ECharts 提交替换选项。元素断开连接时销毁其 ECharts 实例。

在元素上设置图表类型和数据，然后组合图表、坐标轴、图例和提示框样式。

`Styles.echarts.*` — chart and component styles for ECharts integration. Chart styles are applied via the `styles` array like any other JAML style. For deep customization, use `eopts` and `efuncs` to pass raw ECharts option objects.

---

## Architecture

Styles are layered: **builders** (arg factories) → **comboBuilders** (composed options) → **components** (grid, axis, tooltip, etc.) → **charts** (bar, line, pie, radar, map). Users primarily interact with the chart and component layers. Builders and comboBuilders are internal.

---

## Raw ECharts options

### `eopts(option)`

Pass non-series ECharts option objects (tooltip, grid, axes, legend, etc.). Merged into the chart's option before `setOption()`. For series-level config, use `eseries()` with named keys.

`eopts()` normally wraps an ordinary ECharts dictionary in `{ option: dictionary }`. Top-level `option`, `data`, and `dataZoom` are treated as Jam-UI chart-config keys and skip that automatic wrapper. When `dataZoom` is combined with axes, grid, tooltip, ARIA, or other ECharts fields, wrap the complete payload explicitly:

```javascript
Styles.eopts({
  option: {
    dataZoom: [{ type: 'inside' }],
    xAxis: { type: 'category' },
    grid: { bottom: 48 },
    tooltip: { trigger: 'axis' },
    aria: { enabled: true }
  }
})
```

```javascript jaml-playground
export default {
    type: 'chart-bar',
    data: [
        ['Quarter', 'Sales'],
        ['Q1', 120],
        ['Q2', 200]
    ],
    styles: [
        'css(height:15rem;width:22rem)',
        'echarts.bar',
        Styles.eopts({
            tooltip: { trigger: 'axis' },
            grid: { top: '10%', bottom: '10%' }
        })
    ]
};
```

In string format:

```json
"eopts({tooltip:{trigger:'axis'},grid:{top:'10%'}})"
```

> **Complete option migration:** For users new to JAML with an existing ECharts option object, use the `option` param on the chart element instead. It accepts the full ECharts option and handles the `option`/`series` split, data clearing, and redraw automatically. See [chart.md](../JAM-UI/chart.md#complete-echarts-option-migration-from-raw-echarts). Using `eopts` for a complete option is not recommended — you must set `data: []` manually or the chart won't redraw.

### `efuncs(fn)`

Run a function right before `setOption()`. Receives `(el: CashewChart, args: PluginArgs)`. Use to programmatically modify the ECharts option object.

Use a normal function when the callback needs the `EChartsFunctionPlugin` instance as `this`; an arrow function keeps its lexical `this`. The plugin installs one stable bound wrapper in the chart function list and reuses it when applied again. On unplug, that wrapper and any config-merge copies tagged to the same plugin are removed from `chart.config.functions`.

```javascript
Styles.efuncs((chart, args) => {
  chart.chartOption.series[0].markLine = {
    data: [{ type: 'average', name: 'Avg' }]
  }
})
```

### `eseries(option)`

Passes a Jam-UI chart configuration dictionary with an empty `option` member. Use `Styles.eseries({ series: { smooth: true } })` for shared series settings, or `Styles.eseries({ Revenue: { smooth: true } })` for a named series. It does not wrap arbitrary options in a one-element series array.

### Deferred chart shorthands

Chart options retain theme-token wrappers until the final option is built for `setOption()`. The following shorthands work recursively in raw ECharts options and in every compatible chart style:

| Shorthand    | Accepted value                                                          | Native ECharts result                                                         | Notes                                                                             |
| ------------ | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `shadow`     | `{color, blur, offsetX, offsetY}`, theme shadow token, or `'none'`      | `shadowColor`, `shadowBlur`, `shadowOffsetX`, `shadowOffsetY`                 | Explicit native fields override a normal shorthand; `'none'` is an absolute reset |
| `textShadow` | `{color, blur, offsetX, offsetY}`, theme text-shadow token, or `'none'` | `textShadowColor`, `textShadowBlur`, `textShadowOffsetX`, `textShadowOffsetY` | Arbitrary CSS shadow strings are not parsed                                       |
| `border`     | `'none'` only                                                           | Transparent border with zero width                                            | Border dictionaries and border tokens are not supported                           |
| `textBorder` | `'none'` only                                                           | Transparent text border with zero width                                       | Border dictionaries and border tokens are not supported                           |

Raw native boolean `shadow` values are preserved for ECharts-GL light options.

Nested style builders accept the corresponding scalar shorthand while preserving their separated arguments:

```javascript
Styles.echarts.bar.itemStyle.shadow(Tokens.shadow.m)
Styles.echarts.bar.label.textStyle.shadow(Tokens.textShadow.s)
Styles.echarts.bar.itemStyle.border('none')
Styles.echarts.bar.itemStyle.border([4, 4, 0, 0]) // Existing border-radius shorthand
```

---

## Cross-chart styles

### `echarts.labelOnColor`

<a id="entry-echarts-labeloncolor"></a>

echarts图形上的文本颜色

为绘制在有色图表项内部的适用标签选择对比文字颜色。

保留显式标签颜色，检查可见性和内部位置，并根据图形项或配色颜色设置对比文字颜色。colorBy=data 且无显式 data 时，从数据集构建图形项对象。

需要图表配色及兼容的系列或数据对象；实现会选择适用的图表类型和内部位置。

可能生成 series.data。树遍历遇到合并后标签不适用的节点时停止。非逐项路径缺少系列标签时，默认显示标签的图表类型可能访问未经防护的 position；不要声称能普遍保证自动标签处理安全。

Sets automatic contrast colors for visible labels rendered inside colored chart shapes. Explicit label colors are preserved. For data-colored series, the style follows each item's resolved color and recurses through hierarchical `children` data.

This treatment applies to supported inside-label positions and chart types.

### `echarts.coordSysLayer`

<a id="entry-echarts-coordsyslayer"></a>

添加坐标系级别的层

创建偏移后的图表几何装饰副本。

等待一次重绘及配置的延迟后，将所有非图层系列克隆为不响应事件且无标签的图层。全饼图场景偏移中心；其他图表复制第一个 grid 和坐标轴，并将副本系列绑定到它们。

需要非空系列和配色；饼图路径读取数据集的第一个数值列，笛卡尔路径需要 grid、xAxis 和 yAxis。

setOption 前会等待异步图表函数；配置变化时，函数本身不会取消其重绘或延迟工作。

用于全饼图或普通笛卡尔图表。混合、极坐标和地理布局不会被分别处理。字符串位置按数值百分比解释。笛卡尔 encode 被重建为 x=0、y=系列索引+1。

位置参数顺序: `colors` → `z` → `offsetX` → `offsetY` → `shadow` → `shadowColor` → `shadowBlur` → `shadowOffsetX` → `shadowOffsetY` → `border` → `borderColor` → `borderWidth` → `borderType` → `borderCap` → `borderJoin` → `borderMiterLimit` → `opacity` → `tuner` → `delay`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `colors` | `array` | 未提供 | 颜色集 |
| `z` | `number` | `0` | z |
| `offsetX` | `number` | 未提供 | 水平偏移量 |
| `offsetY` | `number` | 未提供 | 垂直偏移量 |
| `shadow` | `dictionaryOrString` | 未提供 | 阴影 |
| `shadowColor` | `dictionaryOrString` | 未提供 | 阴影颜色 |
| `shadowBlur` | `number` | 未提供 | 阴影模糊度 |
| `shadowOffsetX` | `number` | 未提供 | 阴影水平偏移量 |
| `shadowOffsetY` | `number` | 未提供 | 阴影垂直偏移量 |
| `border` | `string` | 未提供 | 边框<br>选项: `none` |
| `borderColor` | `dictionaryOrString` | 未提供 | 边框颜色 |
| `borderWidth` | `numberOrString` | 未提供 | 边框宽度 |
| `borderType` | `string` | 未提供 | 边框类型 |
| `borderCap` | `string` | 未提供 | 边框端点类型 |
| `borderJoin` | `string` | 未提供 | 边框连接类型 |
| `borderMiterLimit` | `number` | 未提供 | 边框斜接限制 |
| `opacity` | `number` | 未提供 | 透明度 |
| `tuner` | `functionOrString` | 未提供 | 颜色调整器 |
| `delay` | `number` | `50` | 延迟 |

Copies the current series into a silent, label-free presentation layer behind the original chart. Cartesian charts receive a cloned grid and hidden axes; all-pie charts receive cloned series with shifted centers. Offsets are measured in pixels.

Individual shadow fields override the corresponding fields of the shared shadow value. The tuner accepts the standard color-set tuner forms.

```javascript jaml-playground
export default {
    type: 'chart-bar',
    data: [
        ['Quarter', 'Sales'],
        ['Q1', 120],
        ['Q2', 200]
    ],
    styles: ['echarts.bar', Styles.echarts.coordSysLayer({ offsetX: 6, offsetY: 6, opacity: 0.35 }), 'css(height:15rem;width:22rem)']
};
```

---

## Chart styles

### `echarts.bar`

<a id="entry-echarts-bar"></a>

柱状图

配置标准柱状图坐标轴和系列选项。

组合 y 轴顶部余量、category x 轴、提示框和缩写数值标签，再将柱形尺寸、间距、背景和堆叠参数映射到系列。

在图表元素上选择 bar 图表类型；此样式不设置 series.type。

柱形外观使用 itemStyle、label、hover 和 bg 子样式。会转换数据集的装饰预设有额外的数据假设。

位置参数顺序: `minHeight` → `width` → `minWidth` → `maxWidth` → `minAngle` → `gap` → `colorBy` → `showBackground` → `stack` → `stackStrategy`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `minHeight` | `number` | 柱图最小高度<br>`{"optKey":"barMinHeight"}` |
| `width` | `numberOrString` | 柱图宽度<br>`{"optKey":"barWidth"}` |
| `minWidth` | `number` | 柱图最小宽度<br>`{"optKey":"barMinWidth"}` |
| `maxWidth` | `number` | 柱图最大宽度<br>`{"optKey":"barMaxWidth"}` |
| `minAngle` | `number` | 柱图最小角度<br>`{"optKey":"barMinAngle"}` |
| `gap` | `string` | 柱间距离<br>`{"optKey":"barGap"}` |
| `colorBy` | `string` | 着色方案<br>选项: `series`, `data`<br>`{"optKey":"colorBy"}` |
| `showBackground` | `boolean` | 是否显示背景<br>`{"optKey":"showBackground"}` |
| `stack` | `string` | 堆叠 |
| `stackStrategy` | `string` | 堆叠策略 |

Bar chart. Args: `minHeight`, `width`, `minWidth`, `maxWidth`, `minAngle`, `gap`, `colorBy`, `showBackground`, `stack`, `stackStrategy`.

**Variants:**

-   **`bar.flipXY`** — swaps the existing Cartesian or polar axis type/data pairing and moves bar labels inside. A default category-x/value-y chart becomes horizontal; the inverse pairing becomes vertical. No args.
-   **`bar.gradientBg`** — gradient fill per bar series. No args.
-   **`bar.votageLevelColor`** — color a single-series bar chart by resolving each category label through the Jam color registry. Args: `gradient` (default `false`) fades each resolved color toward transparency. The current API spelling is `votageLevelColor`.
-   **`bar.tz`** — legacy composite bar preset. Its `barWidth`, `barGap`, and `barMinHeight` names do not match the base bar argument keys in this baseline. Set `width`, `gap`, and `minHeight` on `echarts.bar` separately. Prefer explicit bar, border, split-line, legend and grid styles when these settings must be predictable.
-   **`bar.floatingBar`** — floating bar with mark points. Args: `show`, `size`, `offset`, `iconColor`, `labelColor`.
-   **`bar.maxHightLight`** — highlight max value per series, dim others. Args: `opacity` (default 0.3 for dimmed).
-   **`bar.singleSwitchStyle`** — toggle-style single bar. Args: `color`, `width`, `radius`, `bgColor`.
-   **`bar.stackBar`** — stacked bar with interval spacers. Args: `interval`, `radius`.
-   **`bar.itemStyle`** — item color, opacity, border, shadow.
-   **`bar.label`** — label config with distance, offset, position.
-   **`bar.hover`** — emphasis state with label and itemStyle sub-styles.

```javascript jaml-playground
export default [
    {
        type: 'chart-bar',
        data: [
            ['Quarter', 'Sales'],
            ['Q1', 120],
            ['Q2', 200]
        ],
        styles: ['echarts.bar', 'echarts.bar.tz', 'echarts.bar(width:60%;gap:20%)', 'css(height:15rem;width:22rem)']
    },
    {
        type: 'chart-bar',
        data: [
            ['Category', 'Count'],
            ['A', 80],
            ['B', 120]
        ],
        styles: ['echarts.bar.flipXY', 'echarts.bar.gradientBg', 'css(height:15rem;width:22rem)']
    }
];
```

### `echarts.line`

<a id="entry-echarts-line"></a>

曲线

配置平滑的笛卡尔折线图。

默认为平滑折线，隐藏圆形标记，category x 轴无边界留白，value y 轴保留顶部余量，提示框由坐标轴触发，再合并声明的系列选项。

将元素图表类型选为 line；此样式不创建数据，也不改变 series.type。

显示数据点使用 symbol，移除平滑使用 jagged，填充使用 areaStyle，标注使用 markLine/markPoint。

基础提示框调用传入了 pointer，但它不是提示框参数；要显示十字线，应在 echarts.tooltip.pointer 上显式设置 type 参数。

位置参数顺序: `step` → `smooth` → `sampling` → `selectMode` → `stack` → `stackStrategy` → `silent`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `step` | `booleanOrString` | 是否为阶梯图 |
| `smooth` | `boolean` | 是否平滑曲线 |
| `sampling` | `string` | 降采样策略 |
| `selectMode` | `booleanOrString` | 选中模式 |
| `stack` | `string` | 堆叠 |
| `stackStrategy` | `string` | 堆叠策略 |
| `silent` | `boolean` | 是否不响应鼠标事件 |

Line chart. Args: `step`, `smooth`, `sampling`, `selectMode`, `stack`, `stackStrategy`, `silent`.

**Variants:**

-   **`line.jagged`** — disable smooth (sharp angles). No args.
-   **`line.gradientBg`** — gradient area fill. No args.
-   **`line.symbol`** — symbol config. Args: `symbol`, `show`, `size`, `offset`, `rotate`.
-   **`line.lineStyle`** — line style. Args: `width`, `type` (solid/dashed/dotted), `dashOffset`, `color`, `opacity`, `shadow`.
-   **`line.areaStyle`** — area fill under the line. Args: `color`, `opacity`, `shadow`, `orient`.
-   **`line.markLine`** — mark lines (average, min, max, custom). Args: `precision`, `data`, `silent`, `symbol`, `size`. Sub-styles: `label`, `lineStyle`, `hover`, `animation`, `avg`, `x`, `y`.
-   **`line.markPoint`** — mark points. Args: `data`, `silent`, `symbol`, `size`. Sub-styles: `label`, `itemStyle`, `hover`, `animation`, `min`, `max`.
-   **`line.animation`** — animation config. Args: `animation`, `delay`, `duration`, `easing`.
-   **`line.parts`** — Y-axis region partitioning. Args: `part` (number of regions, default 5).
-   **`line.avgAMax`** — adds average markLine and max markPoint. Args: `size`.
-   **`line.bigSymbol`** — large symbols for sparse data. Args: `symbol`, `size`, `show`. Its declared `smooth` argument is not forwarded; set `smooth` on `echarts.line` separately.
-   **`line.itemStyle`**, **`line.label`**, **`line.hover`** — standard styling sub-variants.

```javascript jaml-playground
export default [
    {
        type: 'chart-line',
        data: [
            ['Day', 'Value'],
            ['Mon', 120],
            ['Tue', 200],
            ['Wed', 150],
            ['Thu', 80]
        ],
        styles: ['echarts.line(smooth:true)', 'echarts.line.areaStyle', 'echarts.line.gradientBg', 'css(height:15rem;width:22rem)']
    },
    {
        type: 'chart-line',
        data: [
            ['Day', 'Value'],
            ['Mon', 50],
            ['Tue', 120],
            ['Wed', 90]
        ],
        styles: ['echarts.line.markLine.avg', 'echarts.line.markPoint.max', 'css(height:15rem;width:22rem)']
    }
];
```

### `echarts.pie`

<a id="entry-echarts-pie"></a>

饼图

配置饼图系列的几何和布局。

添加基本提示框样式，并将声明的饼图参数映射到系列；itemStyle、label 和 emphasis 为独立子样式。

选择 pie 图表类型，或另行提供 pie 系列。

源码按原名传递 selectOffset 和 persentPrecision，不将拼写修正为其他 ECharts 选项键。继承的提示框默认由 axis 触发；逐项触发的饼图提示框使用 tooltip.itemTrigger。

位置参数顺序: `selectOffset` → `clockwise` → `startAngle` → `endAngle` → `minAngle` → `padAngle` → `minShowLabelAngle` → `avoidLabelOverlap` → `roseType` → `width` → `height` → `stillShowZeroSum` → `persentPrecision` → `cursor` → `center` → `radius` → `left` → `top` → `right` → `bottom`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `selectOffset` | `number` | 选中偏移 |
| `clockwise` | `boolean` | 是否顺时针排列 |
| `startAngle` | `number` | 起始角度 |
| `endAngle` | `number` | 结束角度 |
| `minAngle` | `number` | 最小角度 |
| `padAngle` | `number` | 间隔角度 |
| `minShowLabelAngle` | `number` | 显示标签的最小角度 |
| `avoidLabelOverlap` | `boolean` | 是否避免标签重叠 |
| `roseType` | `string` | 玫瑰图类型<br>选项: `radius`, `area` |
| `width` | `numberOrString` | 宽度 |
| `height` | `numberOrString` | 高度 |
| `stillShowZeroSum` | `boolean` | 是否显示总和为 0 的饼图 |
| `persentPrecision` | `number` | 百分比精度 |
| `cursor` | `string` | 光标样式 |
| `center` | `array` | 中心位置 |
| `radius` | `array` | 半径 |
| `left` | `numberOrString` | 左边距 |
| `top` | `numberOrString` | 上边距 |
| `right` | `numberOrString` | 右边距 |
| `bottom` | `numberOrString` | 下边距 |

Pie chart. Args: `selectOffset`, `clockwise`, `startAngle`, `endAngle`, `minAngle`, `padAngle`, `roseType`, `width`, `height`, `center`, `radius`, `persentPrecision`.

**Variants:**

-   **`pie.roseType`** — rose/nightingale chart. Args: `type` (`'radius'` / `'area'`).
-   **`pie.ring`** — donut/ring chart. No args.
-   **`pie.shadow`** — shadow on slices. Args: `shadow` (theme token or `'none'`), `offsetX`, `offsetY`, `blur`, `color`. Uses the large theme shadow when called without arguments.
-   **`pie.position`** — radius and center positioning. Args: `innerR`, `outerR`, `cX`, `cY`.
-   **`pie.tz`** — styled ring with center label. Args: `radius`, `center`, `padAngle`.
-   **`pie.doubleCircle`** — double-ring chart with segment coloring. Args: `top`.
-   **`pie.electronicScale`** — electronic scale/gauge using pie+polar. Args: `iconSize`, `pointerSize`.
-   **`pie.itemStyle`**, **`pie.label`**, **`pie.hover`** — standard styling sub-variants.

```javascript jaml-playground
export default [
    {
        type: 'chart-pie',
        data: [
            ['Category', 'Value'],
            ['A', 40],
            ['B', 30],
            ['C', 30]
        ],
        styles: ['echarts.pie', 'echarts.pie.ring', 'echarts.pie.tz', 'css(height:15rem;width:22rem)']
    },
    {
        type: 'chart-pie',
        data: [
            ['Item', 'Share'],
            ['X', 60],
            ['Y', 40]
        ],
        styles: ['echarts.pie.roseType(type:area)', 'css(height:15rem;width:22rem)']
    }
];
```

### `echarts.radar`

<a id="entry-echarts-radar"></a>

雷达图

将带表头数据集转换为雷达系列。

将首列行名称用作指示器，将每个数值列用作一个雷达系列的值数组；雷达坐标形状默认为 circle。

需要具有表头行的 dataset[0].source，并为每个数值列提供匹配的系列。

绘制时替换 radar.indicator 和每个 series.data。不需要此转换而仅配置原始坐标时，使用 echarts.Radar。

Radar chart. No extended variants — the basic style handles indicator/series transformation and uses `Radar({ shape: 'circle' })` as a plugin. Use `eopts` for customization.

```javascript jaml-playground
export default [
    {
        type: 'chart-radar',
        data: [
            ['Skill', 'Team A', 'Team B'],
            ['Speed', 87, 80],
            ['Power', 82, 89],
            ['Accuracy', 95, 76],
            ['Defense', 74, 90],
            ['Agility', 88, 80]
        ],
        styles: ['echarts.radar', 'css(height:18rem;width:22rem)']
    }
];
```

### `echarts.map`

<a id="entry-echarts-map"></a>

地图

设置 MedlarMap 流程中前景区域的样式。

不存在前景和标签默认值时进行初始化，再将地图图层选项合并到 defaultOption.top。非 MedlarMap 元素直接返回，不产生效果。

需要 MedlarMap 及其区域和地图加载流程。

此样式修改 defaultOption；清理移除插件记录，但不恢复原有默认值。

背景区域使用 background，高亮边界使用 state，额外装饰地理图层使用 layer。

位置参数顺序: `colors` → `z` → `offsetX` → `offsetY` → `shadow` → `shadowColor` → `shadowBlur` → `shadowOffsetX` → `shadowOffsetY` → `border` → `borderColor` → `borderWidth` → `borderType` → `borderCap` → `borderJoin` → `borderMiterLimit` → `opacity` → `tuner` → `showLabel` → `label` → `hover`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `colors` | `array` | 颜色集 |
| `z` | `number` | z |
| `offsetX` | `number` | 地图水平偏移量 |
| `offsetY` | `number` | 地图垂直偏移量 |
| `shadow` | `dictionaryOrString` | 阴影 |
| `shadowColor` | `dictionaryOrString` | 阴影颜色 |
| `shadowBlur` | `number` | 阴影模糊度 |
| `shadowOffsetX` | `number` | 阴影水平偏移量 |
| `shadowOffsetY` | `number` | 阴影垂直偏移量 |
| `border` | `string` | 边框<br>选项: `none` |
| `borderColor` | `dictionaryOrString` | 边框颜色 |
| `borderWidth` | `numberOrString` | 边框宽度 |
| `borderType` | `string` | 边框类型 |
| `borderCap` | `string` | 边框端点类型 |
| `borderJoin` | `string` | 边框连接类型 |
| `borderMiterLimit` | `number` | 边框斜接限制 |
| `opacity` | `number` | 透明度 |
| `tuner` | `functionOrString` | 颜色调整器 |
| `showLabel` | `boolean` | 是否显示前景标签 |
| `label` | `dictionary` | 前景标签 |
| `hover` | `dictionary` | 高亮效果 |

Geographic map chart. `Styles.echarts.map()` updates the foreground map defaults; it does not create another geo layer.

Positive offsets move the map right or down. Individual shadow fields override the corresponding shared shadow fields. JavaScript tuner callbacks receive each normalized `chroma.Color`.

Map offsets are converted through each ECharts geo coordinate system, so they remain pixel-based after zooming or resizing.
Either `showLabel: false` or `label.show: false` hides the corresponding labels. The global deferred-shadow precedence rules also apply to `label.textShadow`.

#### `echarts.map.background`

<a id="entry-echarts-map-background"></a>

地图背景

设置 MedlarMap 上下文背景图层的样式。

初始化并将图层和标签选项合并到 defaultOption.background；忽略非 MedlarMap 元素。

需要 MedlarMap 及其背景区域渲染路径。

清理移除插件数据，但不恢复之前合并的背景默认值。

位置参数顺序: `colors` → `z` → `offsetX` → `offsetY` → `shadow` → `shadowColor` → `shadowBlur` → `shadowOffsetX` → `shadowOffsetY` → `border` → `borderColor` → `borderWidth` → `borderType` → `borderCap` → `borderJoin` → `borderMiterLimit` → `opacity` → `tuner` → `showLabel` → `label`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `colors` | `array` | 颜色集 |
| `z` | `number` | z |
| `offsetX` | `number` | 地图水平偏移量 |
| `offsetY` | `number` | 地图垂直偏移量 |
| `shadow` | `dictionaryOrString` | 阴影 |
| `shadowColor` | `dictionaryOrString` | 阴影颜色 |
| `shadowBlur` | `number` | 阴影模糊度 |
| `shadowOffsetX` | `number` | 阴影水平偏移量 |
| `shadowOffsetY` | `number` | 阴影垂直偏移量 |
| `border` | `string` | 边框<br>选项: `none` |
| `borderColor` | `dictionaryOrString` | 边框颜色 |
| `borderWidth` | `numberOrString` | 边框宽度 |
| `borderType` | `string` | 边框类型 |
| `borderCap` | `string` | 边框端点类型 |
| `borderJoin` | `string` | 边框连接类型 |
| `borderMiterLimit` | `number` | 边框斜接限制 |
| `opacity` | `number` | 透明度 |
| `tuner` | `functionOrString` | 颜色调整器 |
| `showLabel` | `boolean` | 是否显示标签 |
| `label` | `dictionary` | 标签 |

Styles the existing background layer with the same offset, palette, shadow, border, and opacity arguments as the foreground map. When omitted, `colors` is a ten-step low-chroma blue-gray ramp and `opacity` is `0.045`. Background colors are rendered with the `none` tuner; the foreground `tuner` argument is not applied to this layer.

Background labels support the same `show` and `textShadow` forms as foreground labels.

#### `echarts.map.layer`

<a id="entry-echarts-map-layer"></a>

添加中间层

为 MedlarMap 追加装饰地理图层。

根据基础地理数据和有色区域构建不响应事件的 geo 图层；启用 merge 时，可先将有色区域合并为一个已注册的地理数据，再追加该图层。

需要具有基础 geo 图层的 MedlarMap；merge 还需要其已注册的 GeoJSON。

merge 无法获得几何数据时，不追加图层。图层偏移属于地图对齐流程，不是 CSS 平移。

位置参数顺序: `merge` → `colors` → `z` → `offsetX` → `offsetY` → `shadow` → `shadowColor` → `shadowBlur` → `shadowOffsetX` → `shadowOffsetY` → `border` → `borderColor` → `borderWidth` → `borderType` → `borderCap` → `borderJoin` → `borderMiterLimit` → `opacity` → `tuner`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `merge` | `boolean` | 是否合并 |
| `colors` | `array` | 颜色集 |
| `z` | `number` | z |
| `offsetX` | `number` | 地图水平偏移量 |
| `offsetY` | `number` | 地图垂直偏移量 |
| `shadow` | `dictionaryOrString` | 阴影 |
| `shadowColor` | `dictionaryOrString` | 阴影颜色 |
| `shadowBlur` | `number` | 阴影模糊度 |
| `shadowOffsetX` | `number` | 阴影水平偏移量 |
| `shadowOffsetY` | `number` | 阴影垂直偏移量 |
| `border` | `string` | 边框<br>选项: `none` |
| `borderColor` | `dictionaryOrString` | 边框颜色 |
| `borderWidth` | `numberOrString` | 边框宽度 |
| `borderType` | `string` | 边框类型 |
| `borderCap` | `string` | 边框端点类型 |
| `borderJoin` | `string` | 边框连接类型 |
| `borderMiterLimit` | `number` | 边框斜接限制 |
| `opacity` | `number` | 透明度 |
| `tuner` | `functionOrString` | 颜色调整器 |

Creates an explicit replicated geo layer at render time.

Merged geometry is cached per source map and sorted region set. The layer uses the foreground map styling family, excluding `showLabel`, `label` and `hover`.

#### `echarts.map.layer.image`

<a id="entry-echarts-map-layer-image"></a>

图片图层

用图像图案填充有色地图区域。

异步加载图像，并追加由图案填充的 geo 图层。重复方式默认为 repeat；仅当 no-repeat 时 useZoom 默认为 true。

需要 MedlarMap、非空图像来源、已加载的基础地理数据，以及非零的图表和图像尺寸。

draw 函数等待图像加载后再添加图层；已加载的画布按来源缓存。

图像偏移按图表高度为单位移动图案，不作为几何偏移传递。启用 useZoom 时根据图表高度缩放。图像加载失败会在记录日志后向上传播。

位置参数顺序: `image` → `repeat` → `colors` → `z` → `offsetX` → `offsetY` → `shadow` → `shadowColor` → `shadowBlur` → `shadowOffsetX` → `shadowOffsetY` → `border` → `borderColor` → `borderWidth` → `borderType` → `borderCap` → `borderJoin` → `borderMiterLimit` → `opacity` → `tuner` → `scaleX` → `scaleY` → `zlevel` → `useZoom`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `image` | `string` | 未提供 | 图片<br>支持简写 |
| `repeat` | `string` | `repeat` | 是否重复<br>选项: `repeat`, `repeat-x`, `repeat-y`, `no-repeat` |
| `colors` | `array` | 未提供 | 颜色集 |
| `z` | `number` | 未提供 | z |
| `offsetX` | `number` | `0` | 图片相对地图尺寸的水平偏移比例<br>编辑提示（非运行时限制）: `{"step":0.01}` |
| `offsetY` | `number` | `0` | 图片相对地图尺寸的垂直偏移比例<br>编辑提示（非运行时限制）: `{"step":0.01}` |
| `shadow` | `dictionaryOrString` | 未提供 | 阴影 |
| `shadowColor` | `dictionaryOrString` | 未提供 | 阴影颜色 |
| `shadowBlur` | `number` | 未提供 | 阴影模糊度 |
| `shadowOffsetX` | `number` | 未提供 | 阴影水平偏移量 |
| `shadowOffsetY` | `number` | 未提供 | 阴影垂直偏移量 |
| `border` | `string` | 未提供 | 边框<br>选项: `none` |
| `borderColor` | `dictionaryOrString` | 未提供 | 边框颜色 |
| `borderWidth` | `numberOrString` | 未提供 | 边框宽度 |
| `borderType` | `string` | 未提供 | 边框类型 |
| `borderCap` | `string` | 未提供 | 边框端点类型 |
| `borderJoin` | `string` | 未提供 | 边框连接类型 |
| `borderMiterLimit` | `number` | 未提供 | 边框斜接限制 |
| `opacity` | `number` | 未提供 | 透明度 |
| `tuner` | `functionOrString` | 未提供 | 颜色调整器 |
| `scaleX` | `number` | `1` | 图片水平缩放倍数<br>编辑提示（非运行时限制）: `{"min":0.01}` |
| `scaleY` | `number` | `1` | 图片垂直缩放倍数<br>编辑提示（非运行时限制）: `{"min":0.01}` |
| `zlevel` | `number` | `1` | zlevel |
| `useZoom` | `boolean` | 未提供 | 是否使用缩放 |

Creates a raster-image geo layer. The image is loaded asynchronously, cached by source across map instances, and decoded into a canvas pattern before the current draw continues. SVG sources are rejected; use PNG, JPEG, WebP, or another browser-decodable raster format.

Image offsets are fractions of map height, not pixels. Individual shadow fields override the corresponding shared shadow fields.

With `useZoom: true`, the image is initially normalized so its height matches the chart, then `scaleX` and `scaleY` are applied; the layer retains the configured map zoom and bounds. With `useZoom: false`, the pattern starts at its intrinsic canvas size, the layer zoom is fixed at `1`, and its bounding coordinates are scaled to the focused map frame. This makes the default mode suitable for repeating textures. Image layers keep their relative center and zoom synchronized with the other map geos during roam. A zoom-coupled image layer is rebuilt on chart resize so its chart-relative pattern stays aligned.

The shared style schema also exposes `colors` and `tuner`, but the raster pattern supplies its own area color and is not a tunable color palette; leave both unset for image layers.

#### `echarts.map.layer.imageSet`

<a id="entry-echarts-map-layer-imageset"></a>

区域图片集

为每个地图区域选择图像图层配置。

在 regionchange 时根据当前区域标识查找 images，接受含图像来源的对象，并注册所拥有的 draw 任务来加载和追加图层。

需要 MedlarMap，以及将区域标识映射到图像图层配置对象的字典。

忽略裸字符串值。缺失条目不添加新任务。此样式响应 regionchange，不在附加时立即应用当前区域。

位置参数顺序: `images`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `images` | `dictionary` | 区域名到图片图层配置的映射<br>支持简写 |

Selects an image layer from an `images` dictionary keyed by map region. On `regionchange`, it registers an identified draw task for the selected entry; that task awaits the shared source cache and appends the layer during redraw. Each entry uses the same options and defaults as `echarts.map.layer.image`, including independent `offsetX`, `offsetY`, `scaleX`, and `scaleY` values. A region without an entry has no image layer.

```javascript
Styles.echarts.map.layer.imageSet({
  images: {
    江苏: { image: 'assets/images/jiangsu.png', offsetX: 0.02, offsetY: -0.1, scaleX: 1.1, scaleY: 0.9 },
    浙江: { image: 'assets/images/zhejiang.png', offsetX: -0.03, offsetY: 0.04, scaleX: 0.95, scaleY: 1.05 }
  }
})
```

```javascript jaml-playground
export default {
    type: 'map',
    region: '江苏',
    data: [
        { name: '南京', value: 949 },
        { name: '苏州', value: 1291 },
        { name: '无锡', value: 749 }
    ],
    styles: [
        Styles.echarts.map.layer.image({
            image: 'assets/images/mountain.png',
            repeat: 'repeat',
            opacity: 0.5,
            offsetX: 0.03,
            offsetY: -0.17,
            scaleX: 1.06,
            scaleY: 1.06,
            useZoom: false,
            zlevel: -3
        }),
        'css(height:20rem;width:30rem)'
    ]
};
```

#### `echarts.map.fake3D`

<a id="entry-echarts-map-fake3d"></a>

地图伪 3D 效果

通过偏移的二维地理图层模拟地图纵深。

配置前景，并组合颜色、透明度、偏移、边框和阴影设置各自独立的底部和中间图层。图层具有显式颜色时，默认开启图层合并。

需要 MedlarMap 的基础地理数据及图层流程。

这是分层的二维几何，不是 ECharts-GL 挤出。即使颜色统一也要保留区域边界时，显式使用 mergeMid/mergeBottom。

位置参数顺序: `borderColor` → `borderWidth` → `color` → `colorEmphasis` → `colorMid` → `borderColorMid` → `borderWidthMid` → `opacityMid` → `offsetXMid` → `offsetYMid` → `mergeMid` → `shadowMid` → `colorBottom` → `borderColorBottom` → `borderWidthBottom` → `opacityBottom` → `offsetXBottom` → `offsetYBottom` → `mergeBottom` → `shadowBottom`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `borderColor` | `dictionaryOrString` | 未提供 | 边框颜色 |
| `borderWidth` | `number` | 未提供 | 边框宽度 |
| `color` | `dictionaryOrString` | 未提供 | 地图颜色 |
| `colorEmphasis` | `dictionaryOrString` | 未提供 | 地图强调颜色 |
| `colorMid` | `dictionaryOrString` | 未提供 | 主立体图层颜色 |
| `borderColorMid` | `dictionaryOrString` | 未提供 | 主立体图层边框颜色 |
| `borderWidthMid` | `number` | 未提供 | 主立体图层边框宽度 |
| `opacityMid` | `number` | `0.4` | 主立体图层透明度 |
| `offsetXMid` | `number` | 未提供 | 主立体图层水平偏移量 |
| `offsetYMid` | `number` | 运行时决定 (number) | 主立体图层垂直偏移量 |
| `mergeMid` | `boolean` | 未提供 | 是否合并主立体图层 |
| `shadowMid` | `dictionaryOrString` | `{}` | 主立体图层阴影颜色 |
| `colorBottom` | `dictionaryOrString` | 未提供 | 次立体图层颜色 |
| `borderColorBottom` | `dictionaryOrString` | 未提供 | 次立体图层边框颜色 |
| `borderWidthBottom` | `number` | 未提供 | 次立体图层边框宽度 |
| `opacityBottom` | `number` | `0.2` | 次立体图层透明度 |
| `offsetXBottom` | `number` | 未提供 | 次立体图层水平偏移量 |
| `offsetYBottom` | `number` | 运行时决定 (number) | 次立体图层垂直偏移量 |
| `mergeBottom` | `boolean` | 未提供 | 是否合并次立体图层 |
| `shadowBottom` | `dictionaryOrString` | `{}` | 次立体图层阴影颜色 |

Builds a foreground map plus middle and bottom replicated layers.

Supplying a middle or bottom color enables merging for that layer unless its merge setting is explicit.

#### `echarts.map.dense`

<a id="entry-echarts-map-dense"></a>

密度分类

在重新定位后分类地图子项的密度。

挂载时使用解析为像素的 gap 创建 DurianDense，并监听 childreposition；每次事件计算配置的密度类、属性或变量。

拔除时移除 childreposition 监听器和插件数据。

监听器由事件驱动，此样式不在挂载时立即计算。

位置参数顺序: `gap` → `classMap` → `asAttr` → `asVar`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `gap` | `numberOrString` | `20` | 判断元素是否密集的间距阈值，带单位<br>Unit: `px` |
| `classMap` | `dictionary` | 运行时决定 (object) | 密度范围到类名的映射，如 { "dense-low": [0.1, 0.5], "dense-high": [0.5, 999] } |
| `asAttr` | `boolean` | `false` | 是否将密度输出为 jam-density 属性 |
| `asVar` | `boolean` | `false` | 是否将密度输出为 --jam-density CSS 变量 |

Computes density for map children with `jam-coord` after `childreposition`.

```javascript jaml-playground
export default {
    type: 'map',
    region: '江苏',
    showBackground: true,
    data: [
        { name: '南京', value: 949 },
        { name: '苏州', value: 1291 },
        { name: '无锡', value: 749 }
    ],
    styles: [
        Styles.echarts.map({
            showLabel: true,
            label: {
                color: 'white',
                fontSize: 12,
                textShadow: { color: 'rgba(0, 0, 0, 0.45)', blur: 4, offsetY: 1 }
            },
            borderColor: 'primary',
            borderWidth: 1
        }),
        Styles.echarts.map.background({
            showLabel: true,
            label: {
                color: 'fg',
                fontSize: 10,
                textShadow: { color: 'rgba(255, 255, 255, 0.35)', blur: 2 }
            }
        }),
        Styles.echarts.map.layer({
            merge: true,
            offsetY: 8,
            colors: ['primary'],
            shadow: { color: 'rgba(0, 0, 0, 0.35)', blur: 8 }
        }),
        'css(height:20rem;width:30rem)'
    ]
};
```

---

## Component styles

Components are used inside chart styles to configure sub-elements. Reference them when using `eopts` for fine-grained control.

### `echarts.grid`

<a id="entry-echarts-grid"></a>

网格

设置笛卡尔绘图区边界及标签包含方式。

写入 grid 的位置和尺寸；containLabel 默认为 true，网格背景可见性默认为 false。

显示网格背景时使用 border 和 shadow 子样式。网格几何与系列标签定位相互独立。

位置参数顺序: `left` → `top` → `right` → `bottom` → `containLabel` → `width` → `height` → `show` → `backgroundColor`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `left` | `numberOrString` | `3%` | 左边距 |
| `top` | `numberOrString` | `8%` | 上边距 |
| `right` | `numberOrString` | `4%` | 右边距 |
| `bottom` | `numberOrString` | `2%` | 下边距 |
| `containLabel` | `boolean` | `true` | 是否包含坐标轴刻度标签 |
| `width` | `numberOrString` | 未提供 | 宽度 |
| `height` | `numberOrString` | 未提供 | 高度 |
| `show` | `boolean` | `false` | 显示 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |

Chart grid (plot area). Args: `left`, `top`, `right`, `bottom`, `containLabel`, `width`, `height`, `show`, `backgroundColor`. Sub-styles: `border`, `shadow`, `showBorder`.

### `echarts.title`

<a id="entry-echarts-title"></a>

标题

配置图表标题和副标题的内容与位置。

写入 title 选项，包括文本、链接、对齐、可见性、背景和外边距；标题与副标题各有独立的 textStyle 所有者。

字体使用 title.textStyle 和 title.subtextStyle，布局使用 position。

位置参数顺序: `text` → `link` → `target` → `subtext` → `sublink` → `subtarget` → `textAlign` → `textVerticalAlign` → `itemGap` → `triggerEvent` → `show` → `padding` → `backgroundColor` → `left` → `top` → `right` → `bottom`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `text` | `string` | 未提供 | 标题文本 |
| `link` | `string` | 未提供 | 链接 |
| `target` | `string` | 未提供 | 链接打开方式 |
| `subtext` | `string` | 未提供 | 副标题文本 |
| `sublink` | `string` | 未提供 | 副标题链接 |
| `subtarget` | `string` | 未提供 | 副标题链接打开方式 |
| `textAlign` | `string` | 未提供 | 整体水平对齐 |
| `textVerticalAlign` | `string` | 未提供 | 整体垂直对齐 |
| `itemGap` | `number` | 未提供 | 标题副标题间距 |
| `triggerEvent` | `boolean` | 未提供 | 是否触发事件 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `left` | `numberOrString` | `center` | 左边距 |
| `top` | `numberOrString` | 未提供 | 上边距 |
| `right` | `numberOrString` | 未提供 | 右边距 |
| `bottom` | `numberOrString` | 未提供 | 下边距 |

Chart title. Args: `text`, `link`, `target`, `subtext`, `padding`, `backgroundColor`, `show`, `left`, `top`, `right`, `bottom`. Sub-styles: `border`, `shadow`, `textStyle`, `subtextStyle`, `hide`, `center`, `position`, `titleFont`, `subtitleFont`.

### `echarts.axis`

<a id="entry-echarts-axis"></a>

坐标轴

创建标准的笛卡尔坐标轴类型配对。

写入 category 类型 xAxis 和 value 类型 yAxis。子样式配置轴细节或选择相反的配对。

当前实现不会读取已声明的 xType 参数；应在 echarts.axis.x 上设置 type 参数来选择其他类型。

位置参数顺序: `xType`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `xType` | `string` | `category` | X 轴类型 |

Cartesian axis configuration. Access as `axis.x` or `axis.y`. For polar axes, use explicit `Styles.eopts({ option: { radiusAxis: { type: 'value' }, angleAxis: { type: 'category' } } })`. The legacy `axis.radiusAxis` and `axis.angleAxis` helpers do not implement the following full builder contract in this baseline.

Cartesian args: `type`, `name`, `nameLocation`, `nameGap`, `nameRotate`, `offset`, `inverse`, `min`, `max`, `scale`, `splitNumber`, `minInterval`, `maxInterval`, `interval`, `logBase`, `startValue`, `triggerEvent`, `boundaryGap`, `show`, `position`, `silent`.

**Variants:** `axis.hide`, `axis.flipXY`, `axis.hideLine`, `axis.hideLabel`, `axis.hideTick`, `axis.hideSplitLine`, `axis.stripy.horizontal`, `axis.stripy.vertial`, `axis.polar`, `axis.shortenValueLabel`, `axis.rotateAxisLabel`, `axis.xAxisType`, `axis.yAxisType`, `axis.angleAxis`, `axis.radiusAxis`, `axis.xLabelFont`, `axis.yLabelFont`, `axis.yAxisName`, `axis.showYSplit`.

`axis.stripy.horizontal` accepts `tickcolor` to set the horizontal stripe axis-tick color; when omitted, it leaves the normal chart-theme tick color in control. `axis.stripy.vertial` has no arguments.

`axis.y` defaults to a value axis positioned on the left.

### `echarts.tooltip`

<a id="entry-echarts-tooltip"></a>

提示框

配置图表提示框。

写入提示框的触发、显示、格式化和定位选项，默认使用 axis 触发且 confine=true；子样式配置提示框外观、字体和坐标轴指示器。

使用 itemTrigger 显示单个数据项的提示框，使用 pointer 配置十字线、直线或阴影指示器。hide 子样式会移除 tooltip 选项。

位置参数顺序: `trigger` → `showContent` → `triggerOn` → `alwaysShowContent` → `showDelay` → `hideDelay` → `enterable` → `confine` → `renderMode` → `appendToBody` → `formatter` → `position` → `backgroundColor` → `padding` → `show`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `trigger` | `string` | `axis` | 触发类型<br>选项: `item`, `axis` |
| `showContent` | `boolean` | 未提供 | 是否显示浮层 |
| `triggerOn` | `string` | 未提供 | 触发条件 |
| `alwaysShowContent` | `boolean` | 未提供 | 是否总是显示 |
| `showDelay` | `number` | 未提供 | 浮层显示延迟 |
| `hideDelay` | `number` | 未提供 | 浮层隐藏延迟 |
| `enterable` | `boolean` | 未提供 | 鼠标是否可进入浮层 |
| `confine` | `boolean` | `true` | 是否限制在图表区域内 |
| `renderMode` | `string` | 未提供 | 渲染模式 |
| `appendToBody` | `boolean` | 未提供 | 是否添加到body |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `position` | `arrayOrString` | 未提供 | 位置 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `padding` | `array` | 未提供 | 内边距 |
| `show` | `boolean` | 未提供 | 显示 |

Tooltip config. Args: `trigger` (item/axis/none), `showContent`, `triggerOn`, `showDelay`, `hideDelay`, `enterable`, `confine`, `formatter`, `position`, `backgroundColor`, `padding`, `show`. Sub-styles: `border`, `shadow`, `textStyle`, `pointer`, `hide`, `itemTrigger`, `tooltipFont`, `restricted`.

### `echarts.legend`

<a id="entry-echarts-legend"></a>

图例

配置图表图例。

写入图例布局、图形项尺寸、可见性、名称和选择选项；提供文字、图形项、线条、边框和阴影样式。

布局使用 position 和 orient。自定义 data 控制显示项，应与目标系列或图形项名称匹配。

位置参数顺序: `type` → `height` → `width` → `orient` → `align` → `itemGap` → `itemWidth` → `itemHeight` → `selectedMode` → `inactiveColor` → `inactiveBorderColor` → `icon` → `data` → `show` → `padding` → `backgroundColor` → `formatter` → `left` → `top` → `right` → `bottom`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `type` | `string` | 未提供 | 图例类型 |
| `height` | `number` | 未提供 | 图例高度 |
| `width` | `number` | 未提供 | 图例宽度 |
| `orient` | `string` | 未提供 | 图例朝向 |
| `align` | `string` | 未提供 | 图例对齐 |
| `itemGap` | `number` | 未提供 | 图例间隔 |
| `itemWidth` | `number` | 运行时决定 (number) | 图例宽度 |
| `itemHeight` | `number` | 运行时决定 (number) | 图例高度 |
| `selectedMode` | `string` | 未提供 | 图例选中模式 |
| `inactiveColor` | `string` | 未提供 | 图例未选中颜色 |
| `inactiveBorderColor` | `string` | 未提供 | 图例未选中边框颜色 |
| `icon` | `string` | 未提供 | 图例图标 |
| `data` | `array` | 未提供 | 图例数据 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `left` | `numberOrString` | `center` | 左边距 |
| `top` | `numberOrString` | 未提供 | 上边距 |
| `right` | `numberOrString` | 未提供 | 右边距 |
| `bottom` | `numberOrString` | 未提供 | 下边距 |

Legend config. Args: `type`, `height`, `width`, `orient`, `align`, `itemGap`, `itemWidth`, `itemHeight`, `selectedMode`, `inactiveColor`, `icon`, `data`, `show`, `padding`, `backgroundColor`, `formatter`, `left`, `top`, `right`, `bottom`. Sub-styles: `border`, `shadow`, `itemStyle`, `lineStyle`, `textStyle`, `hide`, `orient`, `position`, `legendFont`.

### `echarts.label`

<a id="entry-echarts-label"></a>

标签配置

格式化路径选定的通用、地理或日历标签。

在该标签所有者上写入对齐、可见性、formatter、富文本、尺寸、内边距、背景和透明度；提供 border、shadow 和 textStyle 子样式。

echarts.label 写入顶层 label 选项；calendar 日/月/年标签和 geo 标签各有其所有者。系列专用标签契约使用系列标签样式。

位置参数顺序: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `align` | `string` | 未提供 | 文字水平对齐 |
| `verticalAlign` | `string` | 未提供 | 文字垂直对齐 |
| `rotate` | `number` | 未提供 | 旋转角度 |
| `width` | `number` | 未提供 | 文本显示宽度 |
| `height` | `number` | 未提供 | 文本显示高度 |
| `rich` | `dictionary` | 未提供 | 富文本 |
| `lineHeight` | `number` | 未提供 | 行高 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `opacity` | `number` | 未提供 | 透明度 |

Label config. Args: `align`, `verticalAlign`, `rotate`, `width`, `height`, `rich`, `lineHeight`, `backgroundColor`, `show`, `padding`, `formatter`, `opacity`. Sub-style: `hide`.

### `echarts.visualMap`

<a id="entry-echarts-visualmap"></a>

视觉映射

为图表数据配置视觉映射选项。

写入 visualMap 的边界、选中范围、维度/系列选择和显示设置；show 默认为 false。

需单独指定目标系列和数据维度；它不会从数据集推导边界。

outRange 和 hoverlink 按原名称直接传递，不会转换为 ECharts 的 outOfRange/hoverLink。参数工厂还传入了导入的 override 函数，而非自身的 argsOverrides 参数；因此不声称支持未经证实的参数覆盖行为。

位置参数顺序: `type` → `min` → `max` → `range` → `inRange` → `outRange` → `calculable` → `realtime` → `inverse` → `precision` → `itemWidth` → `itemHeight` → `align` → `text` → `textGap` → `hoverlink` → `dimension` → `seriesIndex` → `unboundedRange` → `show` → `left` → `top` → `right` → `bottom`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `type` | `string` | 未提供 | 类型 |
| `min` | `number` | 未提供 | 最小值 |
| `max` | `number` | 未提供 | 最大值 |
| `range` | `array` | 未提供 | 手柄选中的数值范围 |
| `inRange` | `dictionary` | 未提供 | 范围内 |
| `outRange` | `dictionary` | 未提供 | 范围外 |
| `calculable` | `boolean` | 未提供 | 是否显示拖拽的手柄 |
| `realtime` | `boolean` | 未提供 | 是否实时更新 |
| `inverse` | `boolean` | 未提供 | 是否反转 |
| `precision` | `number` | 未提供 | 精度 |
| `itemWidth` | `number` | 未提供 | 图形宽度 |
| `itemHeight` | `number` | 未提供 | 图形高度 |
| `align` | `string` | 未提供 | 对齐方式 |
| `text` | `array` | 未提供 | 两端文本 |
| `textGap` | `number` | 未提供 | 文本间距 |
| `hoverlink` | `boolean` | 未提供 | 悬停联动 |
| `dimension` | `number` | 未提供 | 映射维度 |
| `seriesIndex` | `number` | 未提供 | 映射系列 |
| `unboundedRange` | `boolean` | 未提供 | 是否允许无界范围 |
| `show` | `boolean` | `false` | 显示 |
| `left` | `numberOrString` | 未提供 | 左边距 |
| `top` | `numberOrString` | 未提供 | 上边距 |
| `right` | `numberOrString` | 未提供 | 右边距 |
| `bottom` | `numberOrString` | 未提供 | 下边距 |

Visual map (color gradient legend).

### `echarts.geo`

<a id="entry-echarts-geo"></a>

地理坐标系

配置地理坐标系所有者。

写入地图标识、导航和布局的 geo 选项，并提供独立的区域 label、itemStyle 和 emphasis 子样式。

指定名称的地图必须已向 ECharts 注册；此样式不加载地理数据。

框架区域和图层流程使用 MedlarMap 和 echarts.map；此样式是更底层的 geo 选项辅助样式。

位置参数顺序: `map` → `roam` → `center` → `aspectScale` → `boundingCoords` → `zoom` → `nameMap` → `nameProperty` → `selectMode` → `layoutCenter` → `layoutSize` → `show` → `left` → `top` → `right` → `bottom` → `silent`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `map` | `string` | 未提供 | 地图类型 |
| `roam` | `booleanOrString` | 未提供 | 是否开启缩放和平移 |
| `center` | `array` | 未提供 | 地图中心点 |
| `aspectScale` | `number` | 未提供 | 长宽比 |
| `boundingCoords` | `array` | 未提供 | 地图左上角和右下角的经纬度 |
| `zoom` | `number` | 未提供 | 缩放比例 |
| `nameMap` | `dictionary` | 未提供 | 自定义地图名称映射 |
| `nameProperty` | `string` | 未提供 | 自定义名称属性 |
| `selectMode` | `booleanOrNumber` | 未提供 | 选中模式 |
| `layoutCenter` | `array` | 未提供 | 布局中心 |
| `layoutSize` | `number` | 未提供 | 布局大小 |
| `show` | `boolean` | `true` | 显示 |
| `left` | `numberOrString` | 未提供 | 左边距 |
| `top` | `numberOrString` | 未提供 | 上边距 |
| `right` | `numberOrString` | 未提供 | 右边距 |
| `bottom` | `numberOrString` | 未提供 | 下边距 |
| `silent` | `boolean` | 未提供 | 是否不响应鼠标事件 |

Geographic coordinate system. Args: `map`, `roam`, `center`, `aspectScale`, `zoom`, `silent`, `show`, `left`, `top`, `right`, `bottom`. Sub-styles: `label`, `itemStyle`, `hover`.

### `echarts.calendar`

<a id="entry-echarts-calendar"></a>

日历坐标系

配置日历坐标系。

写入 calendar 的范围、尺寸、方向、单元格尺寸和位置；子样式控制日期标签、单元格图形项和分割线。

兼容的系列和日期数据需另行提供；此样式不将任意表格数据转换为日期。

位置参数顺序: `zlevel` → `z` → `width` → `height` → `range` → `cellSize` → `orient` → `left` → `top` → `right` → `bottom` → `silent`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `zlevel` | `number` | 层级 |
| `z` | `number` | 层级 |
| `width` | `numberOrString` | 宽度 |
| `height` | `numberOrString` | 高度 |
| `range` | `arrayOrString` | 范围 |
| `cellSize` | `array` | 单元格大小 |
| `orient` | `string` | 布局方向 |
| `left` | `numberOrString` | 左边距 |
| `top` | `numberOrString` | 上边距 |
| `right` | `numberOrString` | 右边距 |
| `bottom` | `numberOrString` | 下边距 |
| `silent` | `boolean` | 是否不响应鼠标事件 |

Calendar coordinate system. Args: `width`, `height`, `range`, `cellSize`, `orient`, `left`, `top`, `right`, `bottom`, `silent`. Sub-styles: `splitLine`, `itemStyle`, `dayLabel`, `monthLabel`, `yearLabel`.

### Raw ECharts `dataZoom`

`echarts.dataZoom` is not exported in this compatibility baseline. Use `Styles.eopts({ option: { dataZoom: [...] } })`; top-level Jam-UI chart config `dataZoom` is not projected into the final ECharts option.

---

## Utility styles

-   **`echarts.shadow`** — shadow config. Sub-style: `shadow.item` (offsetX, offsetY, blur, color).
-   **`echarts.animation`** — shared series animation type, easing and index-based delay. Args: `delay`, `type`, `easing`. Sub-style: `animation.scale`.

---

## Themes

Each chart initializes with an adaptive ECharts appearance theme built for that chart element. It takes the series palette from the active JAML color set and resolves `sys` tokens for shared typography, titles, axes and axis pointers, grids, line and radar drawing, candlesticks, graph styling, calendar marks, toolbox icons, legends, tooltips, timelines, and mark-point labels. Theme-authored `Tokens.chart` values are cooked against the element and deep-merged over that base.

Treat this layer as an appearance baseline. Data, visibility, layout, interaction, and chart behavior remain owned by the chart's explicit styles and ECharts options.

Both mode styles restore the remaining style owner or prior local/current inherited context when removed. They preserve distinguishable external mode and inline `color-scheme` changes, including priority. Same-value external writes are indistinguishable. Their cleanup preserves the shared document luminance sheet; it does not completely isolate every luminance context.

-   **`theme.light`** — force light mode on the chart element.
-   **`theme.dark`** — force dark mode on the chart element.

```javascript jaml-playground
export default [
    {
        type: 'chart-pie',
        data: [
            ['Item', 'Share'],
            ['A', 40],
            ['B', 60]
        ],
        styles: ['theme.dark', 'echarts.pie', 'echarts.pie.ring', 'css(height:15rem;width:22rem)']
    }
];
```

---

## Usage pattern

```javascript jaml-playground
export default {
    type: 'chart-bar',
    cap: 'Sales',
    styles: [
        'css(height:15rem;width:22rem)',
        'echarts.bar.tz',
        'echarts.bar(width:50%;gap:30%)',
        Styles.eopts({
            grid: { top: '15%', bottom: '10%', left: '5%', right: '5%' },
            yAxis: { name: 'Revenue (USD)' }
        }),
        Styles.efuncs((chart, args) => {
            chart.chartOption.series[0].emphasis = {
                itemStyle: { shadowBlur: 10, shadowColor: 'hsl(0 0% 0% / 0.5)' }
            };
        })
    ],
    data: [
        ['Month', 'Revenue'],
        ['Jan', 12000],
        ['Feb', 15000],
        ['Mar', 18000]
    ]
};
```

---

## Real-world patterns

This section documents patterns extracted from real usage in demo files and internal chart presets. Each example shows the JavaScript function-call form (`Styles.echarts.*`) alongside the equivalent JAML string form.

### Axis label alignment

Align X-axis category labels:

```javascript
Styles.echarts.axis.x.label({ align: 'center' })
```

```json
"echarts.axis.x.label(align:center)"
```

Maps to `xAxis.axisLabel.align = 'center'`.

### Hide axis ticks

Hide ticks on the X-axis (keeps axis line and labels visible):

```javascript
Styles.echarts.axis.x.tick({ show: false })
```

```json
"echarts.axis.x.tick(show:false)"
```

Maps to `xAxis.axisTick.show = false`. Also available as the component variant `axis.hideTick`.

### Axis line styling

Style the X-axis line color:

```javascript
Styles.echarts.axis.x.line.lineStyle({ color: '#ccc' })
```

```json
"echarts.axis.x.line.lineStyle(color:#ccc)"
```

The `lineStyle` sub-style is available on both `axis.x.line` and `axis.y.line`. Supports all line style args: `width`, `type` (solid/dashed/dotted), `color`, `opacity`, `dashOffset`, `cap`, `join`, `miterLimit`.

Maps to `xAxis.axisLine.lineStyle.color = '#ccc'`.

### Dashed split lines

Use dashed horizontal grid lines on the Y-axis (used internally by `bar.tz`):

```javascript
Styles.echarts.axis.y.splitLine.lineStyle({ type: 'dashed' })
```

```json
"echarts.axis.y.splitLine.lineStyle(type:dashed)"
```

Maps to `yAxis.splitLine.lineStyle.type = 'dashed'`. Available on both axis x and y.

### Named axis with location

Set an axis name and position it at the end:

```javascript
Styles.echarts.axis.y({ name: 'MW', nameLocation: 'end' })
```

```json
"echarts.axis.y(name:MW;nameLocation:end)"
```

Maps to `yAxis.name = 'MW'` and `yAxis.nameLocation = 'end'`. Both `name` and `nameLocation` are args on the base axis style.

Axis names sit outside the plot area and the default grid margins can clip them. Whenever an axis has a `name`, reserve enough space on the corresponding `top`, `right`, `bottom`, or `left` side with `echarts.grid`; the required side depends on the axis position and `nameLocation`.

```javascript
Styles.echarts.grid({ top: '12%', left: '12%', right: '6%', bottom: '10%', containLabel: true })
Styles.echarts.axis.y({ name: 'MW', nameLocation: 'end' })

// The same rule applies to raw ECharts options.
Styles.eopts({
  grid: { top: '12%', left: '12%', right: '6%', bottom: '10%', containLabel: true },
  yAxis: { name: 'MW', nameLocation: 'end' }
})
```

```json
[
  "echarts.grid(top:12%;left:12%;right:6%;bottom:10%;containLabel:true)",
  "echarts.axis.y(name:MW;nameLocation:end)"
]
```

### Axis name styling

Style the axis name text with alignment and padding:

```javascript
Styles.echarts.axis.y.nameStyle({
  align: 'right',
  padding: [0, 8, 0, 0]
})
```

```json
"echarts.axis.y.nameStyle(align:right;padding:[0,8,0,0])"
```

Available on both `axis.x.nameStyle` and `axis.y.nameStyle`. The `nameStyle` sub-style supports `align`, `verticalAlign`, `width`, `height`, `lineHeight`, `padding`, `backgroundColor`, `opacity`, plus `border`, `shadow`, and `textStyle` sub-sub-styles.

Maps to `yAxis.nameTextStyle.align = 'right'` and `yAxis.nameTextStyle.padding = [0, 8, 0, 0]`.

### Legend positioning

Position the legend using shorthand offset args:

```javascript
Styles.echarts.legend.position({ right: '5%', top: '15%' })
```

```json
"echarts.legend.position(right:5%;top:15%)"
```

The `legend.position` sub-style accepts `top`, `left`, `bottom`, `right`, and `padding`.

### Per-side bar border radius

Apply individual corner radii to bars. The `border` sub-style on `bar.itemStyle` accepts a shorthand array mapped to `borderRadius`:

```javascript
Styles.echarts.bar.itemStyle.border([4, 4, 4, 4])
// Equivalent to: border({ radius: [4, 4, 4, 4] })
```

```json
"echarts.bar.itemStyle.border(radius:[4,4,4,4])"
```

Maps to `series.itemStyle.borderRadius = [4, 4, 4, 4]`. Also available on `pie.itemStyle.border`.

### Pie with array radius (ring)

Pass a two-element array to `radius` to create a ring/donut chart directly without the `pie.ring` variant:

```javascript
Styles.echarts.pie({ radius: ['40%', '75%'] })
```

```json
"echarts.pie(radius:['40%','75%'])"
```

Maps to `series.radius = ['40%', '75%']`. The string path form supports the same args as the JS form: `radius`, `center`, `startAngle`, `endAngle`, `roseType`, `padAngle`, etc.

### Grid with positional args

The `grid` component accepts its top-level margin args positionally (left, top, right, bottom, containLabel):

```javascript
Styles.echarts.grid(2, 2, 2, 2, false)
// Equivalent to: grid({ left: 2, top: 2, right: 2, bottom: 2, containLabel: false })
```

```json
"echarts.grid(left:2;top:2;right:2;bottom:2;containLabel:false)"
```

Named-arg equivalent:

```javascript
Styles.echarts.grid({
  left: 2,
  top: 2,
  right: 2,
  bottom: 2,
  containLabel: false
})
```

### Line chart function-call form

The basic `echarts.line` style supports function-call arguments. While the string-path form `echarts.line(smooth:true)` is common, the JavaScript function-call form gives you type checking and IDE autocompletion:

```javascript
Styles.echarts.line({ smooth: false })
```

This is equivalent to the string path:

```json
"echarts.line(smooth:false)"
```

Since the base `line` style defaults `smooth: true`, calling with `smooth: false` produces a jagged line (same effect as `line.jagged`). All `lineArgs` are supported: `step`, `smooth`, `sampling`, `selectMode`, `stack`, `stackStrategy`, `silent`.

### Composite examples

#### Bar chart with axis name, styled split lines, and legend position

```javascript
Styles.echarts.bar,
Styles.echarts.axis.y({ name: 'MW', nameLocation: 'end' }),
Styles.echarts.axis.y.nameStyle({ align: 'right', padding: [0, 8, 0, 0] }),
Styles.echarts.axis.y.splitLine.lineStyle({ type: 'dashed' }),
Styles.echarts.legend.position({ right: '5%' })
```

In JAML string form:

```json
[
    "echarts.bar",
    "echarts.axis.y(name:MW;nameLocation:end)",
    "echarts.axis.y.nameStyle(align:right;padding:[0,8,0,0])",
    "echarts.axis.y.splitLine.lineStyle(type:dashed)",
    "echarts.legend.position(right:5%)"
]
```

#### Line chart with grid and hidden ticks

```javascript
Styles.echarts.line({ smooth: false }),
Styles.echarts.grid(3, 5, 3, 5, true),
Styles.echarts.axis.x.tick({ show: false }),
Styles.echarts.axis.x.line.lineStyle({ color: '#eee' })
```

#### Pie ring with per-item border radius

```javascript
Styles.echarts.pie({ radius: ['40%', '75%'] }),
Styles.echarts.pie.itemStyle.border([4, 4, 4, 4])
```

#### Line chart with full axis styling

Style configuration for a line chart with named Y-axis, dashed split lines, centered X labels, hidden X ticks, and positioned legend:

```javascript
Styles.echarts.line({ smooth: false }),
Styles.echarts.axis.y.splitLine.lineStyle({ type: 'dashed' }),
Styles.echarts.axis.y({ name: 'MW', nameLocation: 'end' }),
Styles.echarts.axis.y.nameStyle({ align: 'right', padding: [0, 5, 0, 0] }),
Styles.echarts.axis.x.label({ align: 'center' }),
Styles.echarts.axis.x.tick({ show: false }),
Styles.echarts.axis.x.line.lineStyle({ color: 'hsl(0,0%,50%)' }),
Styles.echarts.legend.position({ right: '5%' })
```

In JAML string form:

```json
[
    "echarts.line(smooth:false)",
    "echarts.axis.y.splitLine.lineStyle(type:dashed)",
    "echarts.axis.y(name:MW;nameLocation:end)",
    "echarts.axis.y.nameStyle(align:right;padding:[0,5,0,0])",
    "echarts.axis.x.label(align:center)",
    "echarts.axis.x.tick(show:false)",
    "echarts.axis.x.line.lineStyle(color:hsl(0,0%,50%))",
    "echarts.legend.position(right:5%)"
]
```

## `echarts.Radar`

<a id="entry-echarts-radar"></a>

雷达坐标系

单独配置雷达坐标系，不进行雷达数据转换。

写入 radar 选项，包括指示器、中心、半径和形状。子样式配置轴名称、轴线、标签、刻度和分割区域。

带表头数据集的转换使用 echarts.radar；定制转换后的坐标系使用 echarts.Radar。大小写有区别。

位置参数顺序: `zlevel` → `z` → `center` → `radius` → `startAngle` → `nameGap` → `splitNumber` → `shape` → `scale` → `triggerEvent` → `indicator` → `silent`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `zlevel` | `number` | 层级 |
| `z` | `number` | 层级 |
| `center` | `array` | 中心点 |
| `radius` | `arrayOrString` | 半径 |
| `startAngle` | `number` | 起始角度 |
| `nameGap` | `number` | 名称间距 |
| `splitNumber` | `number` | 分割段数 |
| `shape` | `string` | 雷达图形状 |
| `scale` | `boolean` | 缩放范围不强制包含零 |
| `triggerEvent` | `boolean` | 轴标签是否触发事件 |
| `indicator` | `array` | 雷达图指示器配置项 |
| `silent` | `boolean` | 是否不响应鼠标事件 |

## `echarts.animation`

<a id="entry-echarts-animation"></a>

动画

按数据项索引错开系列动画。

设置 animationType 和 animationEasing，并将 animationDelay 计算为数据项索引乘以 delay。

此样式不启用全部 ECharts 动画能力，也不单独配置更新动画。

位置参数顺序: `delay` → `type` → `easing`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `delay` | `number` | `100` | 延迟 |
| `type` | `string` | `scale` | 类型 |
| `easing` | `string` | `elasticOut` | 缓动 |

## `echarts.axis.x`

<a id="entry-echarts-axis-x"></a>

坐标轴配置

配置单个笛卡尔坐标轴。

写入选定的 xAxis 或 yAxis；x 默认为底部的 category 轴，y 默认为左侧的 value 轴。

通过子样式设置轴名称、标签、指示器、基线、刻度和分割区域。

应用这些样式时也会应用其默认值；仅改变一个轴时，选择完整的轴路径。

位置参数顺序: `type` → `name` → `nameLocation` → `nameGap` → `nameRotate` → `offset` → `inverse` → `min` → `max` → `scale` → `splitNumber` → `minInterval` → `maxInterval` → `interval` → `logBase` → `startValue` → `triggerEvent` → `boundaryGap` → `show` → `position` → `silent`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `type` | `string` | `category` | 类型 |
| `name` | `string` | 未提供 | 名称 |
| `nameLocation` | `string` | `end` | 名称位置 |
| `nameGap` | `number` | 未提供 | 名称与轴线的距离 |
| `nameRotate` | `number` | 未提供 | 名称旋转角度 |
| `offset` | `number` | 未提供 | 偏移 |
| `inverse` | `boolean` | 未提供 | 反转坐标轴 |
| `min` | `number` | 未提供 | 最小值 |
| `max` | `number` | 未提供 | 最大值 |
| `scale` | `boolean` | 未提供 | 缩放范围不强制包含零 |
| `splitNumber` | `number` | 未提供 | 分割段数 |
| `minInterval` | `number` | 未提供 | 最小间隔 |
| `maxInterval` | `number` | 未提供 | 最大间隔 |
| `interval` | `number` | 未提供 | 间隔 |
| `logBase` | `number` | 未提供 | 对数轴的底数 |
| `startValue` | `number` | 未提供 | 起始刻度值 |
| `triggerEvent` | `boolean` | 未提供 | 标签是否触发事件 |
| `boundaryGap` | `booleanOrArray` | 未提供 | 留白策略 |
| `show` | `boolean` | `true` | 显示 |
| `position` | `arrayOrString` | `bottom` | 位置 |
| `silent` | `boolean` | 未提供 | 是否不响应鼠标事件 |

## `echarts.axis.y`

<a id="entry-echarts-axis-y"></a>

坐标轴配置

配置单个笛卡尔坐标轴。

写入选定的 xAxis 或 yAxis；x 默认为底部的 category 轴，y 默认为左侧的 value 轴。

通过子样式设置轴名称、标签、指示器、基线、刻度和分割区域。

应用这些样式时也会应用其默认值；仅改变一个轴时，选择完整的轴路径。

位置参数顺序: `type` → `name` → `nameLocation` → `nameGap` → `nameRotate` → `offset` → `inverse` → `min` → `max` → `scale` → `splitNumber` → `minInterval` → `maxInterval` → `interval` → `logBase` → `startValue` → `triggerEvent` → `boundaryGap` → `show` → `position` → `silent`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `type` | `string` | `value` | 类型 |
| `name` | `string` | 未提供 | 名称 |
| `nameLocation` | `string` | `end` | 名称位置 |
| `nameGap` | `number` | 未提供 | 名称与轴线的距离 |
| `nameRotate` | `number` | 未提供 | 名称旋转角度 |
| `offset` | `number` | 未提供 | 偏移 |
| `inverse` | `boolean` | 未提供 | 反转坐标轴 |
| `min` | `number` | 未提供 | 最小值 |
| `max` | `number` | 未提供 | 最大值 |
| `scale` | `boolean` | 未提供 | 缩放范围不强制包含零 |
| `splitNumber` | `number` | 未提供 | 分割段数 |
| `minInterval` | `number` | 未提供 | 最小间隔 |
| `maxInterval` | `number` | 未提供 | 最大间隔 |
| `interval` | `number` | 未提供 | 间隔 |
| `logBase` | `number` | 未提供 | 对数轴的底数 |
| `startValue` | `number` | 未提供 | 起始刻度值 |
| `triggerEvent` | `boolean` | 未提供 | 标签是否触发事件 |
| `boundaryGap` | `booleanOrArray` | 未提供 | 留白策略 |
| `show` | `boolean` | `true` | 显示 |
| `position` | `arrayOrString` | `left` | 位置 |
| `silent` | `boolean` | 未提供 | 是否不响应鼠标事件 |

## `echarts.bar.bg`

<a id="entry-echarts-bar-bg"></a>

背景样式

设置柱形背后背景的样式。

写入 series.backgroundStyle 的填充和透明度，并提供 border 和 shadow 子样式。

bar.showBackground 需另行启用；设置背景样式不会显示背景。

位置参数顺序: `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.bar.tz`

<a id="entry-echarts-bar-tz"></a>

NiceStyle

应用圆角渐变柱形呈现预设。

组合基本柱形、圆角图形项边框、y 分割虚线、图例、提示框和带内边距的网格，并尝试安装固定的渐变配色。

预设从公开键为 width/gap/minHeight 的定义中选取 barWidth/barGap/barMinHeight，并向使用 size 的辅助样式传入 fontSize。其配色数组进入仅含一个字段、声明为 functionOrString 的 color 定义，可能被字符串化；不要承诺可用的渐变配色。优先显式配置 bar、textStyle 和配色。

位置参数顺序: `radius` → `itemWidth` → `itemHeight` → `top`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `radius` | `array` | 运行时决定 (number) | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `itemWidth` | `number` | 运行时决定 (number) | 图例宽度 |
| `itemHeight` | `number` | 运行时决定 (number) | 图例高度 |
| `top` | `numberOrString` | 运行时决定 (number) | 上边距 |

## `echarts.pie.tz`

<a id="entry-echarts-pie-tz"></a>

带间隔的圆环

应用分离圆环饼图预设。

配置半径、中心和分段间距，在中心隐藏常规标签，并提供基于数据集前两维的富文本 formatter；启用强调状态标签。

使用类目和值维度与 formatter 匹配的饼图系列。

按预设原样输出默认 radius 数组。强调状态 textStyle 调用使用了 fontSize，而非辅助样式的 size 参数；需要时显式设置标签字体。

位置参数顺序: `radius` → `center` → `padAngle`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `radius` | `array` | `["100%","85%"]` | 半径 |
| `center` | `array` | `["50%","50%"]` | 中心位置 |
| `padAngle` | `number` | `5` | 间隔角度 |

## `echarts.axis.xxx`

<a id="entry-echarts-axis-xxx"></a>

坐标轴配置

使用数值 x 轴。

以 type=value 复用 echarts.axis.x，包括该轴辅助样式的默认值。

位置参数顺序: `nameLocation` → `show` → `position` → `type`.

| 参数 | 契约 |
| --- | --- |
| `nameLocation` | x 轴预设捕获的轴名称位置。<br>此预构建样式捕获 nameLocation=end，并将其写入 xAxis.nameLocation。它不是参数化工厂；使用 echarts.axis.x 的 nameLocation 参数定制此设置。 |
| `show` | x 轴预设捕获的轴可见性。<br>此预构建样式捕获 show=true，并将其写入 xAxis.show。它不是参数化工厂；使用 echarts.axis.x 的 show 参数定制此设置。 |
| `position` | x 轴预设捕获的轴所在侧的位置。<br>此预构建样式捕获 position=bottom，并将其写入 xAxis.position。它不是参数化工厂；使用 echarts.axis.x 的 position 参数定制此设置。 |
| `type` | x 轴预设捕获的轴刻度类型。<br>此预构建样式捕获 type=value，并将其写入 xAxis.type。它不是参数化工厂；使用 echarts.axis.x 的 type 参数定制此设置。 |

## `echarts.axis.yyy`

<a id="entry-echarts-axis-yyy"></a>

坐标轴配置

使用类目 y 轴。

以 type=category 复用 echarts.axis.y，包括该轴辅助样式的默认值。

位置参数顺序: `nameLocation` → `show` → `position` → `type`.

| 参数 | 契约 |
| --- | --- |
| `nameLocation` | y 轴预设捕获的轴名称位置。<br>此预构建样式捕获 nameLocation=end，并将其写入 yAxis.nameLocation。它不是参数化工厂；使用 echarts.axis.y 的 nameLocation 参数定制此设置。 |
| `show` | y 轴预设捕获的轴可见性。<br>此预构建样式捕获 show=true，并将其写入 yAxis.show。它不是参数化工厂；使用 echarts.axis.y 的 show 参数定制此设置。 |
| `position` | y 轴预设捕获的轴所在侧的位置。<br>此预构建样式捕获 position=left，并将其写入 yAxis.position。它不是参数化工厂；使用 echarts.axis.y 的 position 参数定制此设置。 |
| `type` | y 轴预设捕获的轴刻度类型。<br>此预构建样式捕获 type=category，并将其写入 yAxis.type。它不是参数化工厂；使用 echarts.axis.y 的 type 参数定制此设置。 |

## `echarts.pie.ring`

<a id="entry-echarts-pie-ring"></a>

使用中央带强调状态标签的环形布局。

移除 labelLine 和 roseType，设置环形半径，隐藏常规中央标签，启用粗体强调状态标签，并将标题居中。

标题文本需另行提供；需要其他中心或半径时，在此之后应用显式几何设置。

## `echarts.axis.hide`

<a id="entry-echarts-axis-hide"></a>

隐藏

隐藏已有坐标轴。

检查当前 config 的 x、y、angle 和 radius 轴选项，只将已存在的轴设为 show=false。

在配置轴之后应用。只需隐藏轴的一部分时，使用 hideLine/hideLabel 或显式的子部分可见性设置。

## `echarts.bar.hover`

<a id="entry-echarts-bar-hover"></a>

高亮效果

配置选定系列、标注或 geo 所有者的强调状态。

写入路径选定的 emphasis 选项，并提供 label 和 itemStyle 子样式；折线系列变体还提供 emphasis lineStyle 子样式。

focused 按原名输出为 focused，不映射为 focus。不要仅凭该参数承诺 ECharts 聚焦行为。

位置参数顺序: `disabled` → `focused` → `blurScope`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `focused` | `string` | 未提供 | 聚焦效果<br>选项: `none`, `self`, `series` |
| `blurScope` | `string` | 未提供 | 淡出范围 |

## `echarts.bar.label`

<a id="entry-echarts-bar-label"></a>

标签配置

定位并格式化系列或强调状态标签。

在通用标签格式上扩展 distance、offset、最小边距和 position，再写入选定的系列或强调状态 label 所有者。

强调状态启用使用父级 hover 样式；仅当输出的嵌套 textStyle 结构适配目标 ECharts 版本时，使用 label.textStyle。

位置参数顺序: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `distance` → `offset` → `minMargin` → `position`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `align` | `string` | 未提供 | 文字水平对齐 |
| `verticalAlign` | `string` | 未提供 | 文字垂直对齐 |
| `rotate` | `number` | 未提供 | 旋转角度 |
| `width` | `number` | 未提供 | 文本显示宽度 |
| `height` | `number` | 未提供 | 文本显示高度 |
| `rich` | `dictionary` | 未提供 | 富文本 |
| `lineHeight` | `number` | 未提供 | 行高 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `opacity` | `number` | 未提供 | 透明度 |
| `distance` | `number` | 未提供 | 文本与图形的距离 |
| `offset` | `array` | 未提供 | 文本偏移 |
| `minMargin` | `number` | 未提供 | 标签最小边距 |
| `position` | `arrayOrString` | 未提供 | 位置 |

## `echarts.geo.hover`

<a id="entry-echarts-geo-hover"></a>

高亮效果

配置选定系列、标注或 geo 所有者的强调状态。

写入路径选定的 emphasis 选项，并提供 label 和 itemStyle 子样式；折线系列变体还提供 emphasis lineStyle 子样式。

focused 按原名输出为 focused，不映射为 focus。不要仅凭该参数承诺 ECharts 聚焦行为。

位置参数顺序: `disabled` → `focused` → `blurScope`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `focused` | `string` | 未提供 | 聚焦效果<br>选项: `none`, `self`, `series` |
| `blurScope` | `string` | 未提供 | 淡出范围 |

## `echarts.geo.label`

<a id="entry-echarts-geo-label"></a>

标签配置

格式化路径选定的通用、地理或日历标签。

在该标签所有者上写入对齐、可见性、formatter、富文本、尺寸、内边距、背景和透明度；提供 border、shadow 和 textStyle 子样式。

echarts.label 写入顶层 label 选项；calendar 日/月/年标签和 geo 标签各有其所有者。系列专用标签契约使用系列标签样式。

位置参数顺序: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `align` | `string` | 未提供 | 文字水平对齐 |
| `verticalAlign` | `string` | 未提供 | 文字垂直对齐 |
| `rotate` | `number` | 未提供 | 旋转角度 |
| `width` | `number` | 未提供 | 文本显示宽度 |
| `height` | `number` | 未提供 | 文本显示高度 |
| `rich` | `dictionary` | 未提供 | 富文本 |
| `lineHeight` | `number` | 未提供 | 行高 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `opacity` | `number` | 未提供 | 透明度 |

## `echarts.map.state`

<a id="entry-echarts-map-state"></a>

最高层级区域

为高亮地图区域应用预设的边界效果。

将 defaultOption.state 替换为使用细边框和零阴影模糊的 itemStyle；忽略非 MedlarMap 元素。

清理移除插件数据，不恢复之前的状态默认值。

## `echarts.pie.hover`

<a id="entry-echarts-pie-hover"></a>

高亮效果

配置饼图强调状态及其缩放效果。

写入 series.emphasis，在共享强调状态定义上扩展 scale 和 scaleSize，并提供强调状态标签和图形项样式。

共享的 focused 参数仍按原名输出；需要已验证的 focus 属性时，使用显式 ECharts 选项。

位置参数顺序: `disabled` → `focused` → `blurScope` → `scale` → `scaleSize`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `focused` | `string` | 未提供 | 聚焦效果<br>选项: `none`, `self`, `series` |
| `blurScope` | `string` | 未提供 | 淡出范围 |
| `scale` | `boolean` | 未提供 | 开启缩放 |
| `scaleSize` | `number` | 未提供 | 缩放大小 |

## `echarts.pie.label`

<a id="entry-echarts-pie-label"></a>

标签配置

定位并格式化系列或强调状态标签。

在通用标签格式上扩展 distance、offset、最小边距和 position，再写入选定的系列或强调状态 label 所有者。

强调状态启用使用父级 hover 样式；仅当输出的嵌套 textStyle 结构适配目标 ECharts 版本时，使用 label.textStyle。

位置参数顺序: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `distance` → `offset` → `minMargin` → `position`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `align` | `string` | 未提供 | 文字水平对齐 |
| `verticalAlign` | `string` | 未提供 | 文字垂直对齐 |
| `rotate` | `number` | 未提供 | 旋转角度 |
| `width` | `number` | 未提供 | 文本显示宽度 |
| `height` | `number` | 未提供 | 文本显示高度 |
| `rich` | `dictionary` | 未提供 | 富文本 |
| `lineHeight` | `number` | 未提供 | 行高 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `opacity` | `number` | 未提供 | 透明度 |
| `distance` | `number` | 未提供 | 文本与图形的距离 |
| `offset` | `array` | 未提供 | 文本偏移 |
| `minMargin` | `number` | 未提供 | 标签最小边距 |
| `position` | `arrayOrString` | 未提供 | 位置 |

## `echarts.Radar.max`

<a id="entry-echarts-radar-max"></a>

雷达坐标系最大值配置

为每个已有雷达指示器应用同一个最大值。

将提供的参数直接赋给每个雷达指示器的 max。样式没有参数定义时，共享参数归一化器保留标量输入。

需要已构建 indicator 数组的 radar 选项。

将最大值作为标量传入，而不是含有 max 键的对象。需要已有指示器数组；此辅助样式不从数据推导最大值。

## `echarts.axis.polar`

<a id="entry-echarts-axis-polar"></a>

极坐标

将已配置的系列转换为极坐标。

删除笛卡尔坐标轴，创建 value 类型 angleAxis 和 category 类型 radiusAxis，采用居中的 polar 布局，并将 series.coordinateSystem 设为 polar。

此样式替换坐标系选项；仅与 ECharts 极坐标支持的系列组合，并提供适用的数据。

## `echarts.bar.flipXY`

<a id="entry-echarts-bar-flipxy"></a>

反转XY轴

交换当前的坐标轴配对，并将条形标签移到内部。

在 insideLeft 启用系列标签，然后通过 axis.flipXY 交换 type 和 data。

需要已有的一对笛卡尔坐标轴或极坐标轴。

默认的 x 类目轴/y 数值轴配对会变为横向，反向配对会变为纵向。交换极坐标轴不会创建直角坐标系图表。

## `echarts.label.hide`

<a id="entry-echarts-label-hide"></a>

隐藏

隐藏通用标签和系列标签。

将顶层 label 选项和共享的系列 label 选项都设为 show=false。

## `echarts.line.hover`

<a id="entry-echarts-line-hover"></a>

高亮效果

配置选定系列、标注或 geo 所有者的强调状态。

写入路径选定的 emphasis 选项，并提供 label 和 itemStyle 子样式；折线系列变体还提供 emphasis lineStyle 子样式。

focused 按原名输出为 focused，不映射为 focus。不要仅凭该参数承诺 ECharts 聚焦行为。

位置参数顺序: `disabled` → `focused` → `blurScope`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `focused` | `string` | 未提供 | 聚焦效果<br>选项: `none`, `self`, `series` |
| `blurScope` | `string` | 未提供 | 淡出范围 |

## `echarts.line.label`

<a id="entry-echarts-line-label"></a>

标签配置

定位并格式化系列或强调状态标签。

在通用标签格式上扩展 distance、offset、最小边距和 position，再写入选定的系列或强调状态 label 所有者。

强调状态启用使用父级 hover 样式；仅当输出的嵌套 textStyle 结构适配目标 ECharts 版本时，使用 label.textStyle。

位置参数顺序: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `distance` → `offset` → `minMargin` → `position`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `align` | `string` | 未提供 | 文字水平对齐 |
| `verticalAlign` | `string` | 未提供 | 文字垂直对齐 |
| `rotate` | `number` | 未提供 | 旋转角度 |
| `width` | `number` | 未提供 | 文本显示宽度 |
| `height` | `number` | 未提供 | 文本显示高度 |
| `rich` | `dictionary` | 未提供 | 富文本 |
| `lineHeight` | `number` | 未提供 | 行高 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `opacity` | `number` | 未提供 | 透明度 |
| `distance` | `number` | 未提供 | 文本与图形的距离 |
| `offset` | `array` | 未提供 | 文本偏移 |
| `minMargin` | `number` | 未提供 | 标签最小边距 |
| `position` | `arrayOrString` | 未提供 | 位置 |

## `echarts.line.parts`

<a id="entry-echarts-line-parts"></a>

y轴区域切割

扩展第一个数据集数值列周围的 y 轴范围。

读取索引为一的列，设置 min=(3*minimum-maximum)/2 和 max=(3*maximum-minimum)/2，并将两倍的数据范围除以 part 作为舍入后的 interval。

需要非空的带表头数值数据集，以及 yAxis 对象。

仅考虑第一个数值列。没有防护常量数据、空数据以及零值或无效 part；不是为所有系列自动缩放。

位置参数顺序: `part`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `part` | `Type` | `5` | 区域数 |

## `echarts.pie.shadow`

<a id="entry-echarts-pie-shadow"></a>

阴影

为每个饼图项样式添加主题默认阴影。

绘制时将主题的大号阴影和显式阴影字段合并到每个 series.itemStyle。

此函数遍历当前所有系列；不按系列类型筛选。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.Radar.line`

<a id="entry-echarts-radar-line"></a>

轴线配置

显示或装饰选定的坐标轴基线。

写入 axisLine 的可见性和端点符号属性，并提供 lineStyle 子样式设置线条。不控制网格分割线。

使用匹配的同级 tick 和 splitLine 分别控制刻度与分割线。

位置参数顺序: `show` → `symbol` → `size` → `offset`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `show` | `boolean` | `true` | 显示 |
| `symbol` | `string` | 未提供 | 标记图形<br>`{"optKey":"symbol"}` |
| `size` | `functionOrAny` | 未提供 | 标记图形大小<br>`{"optKey":"symbolSize"}` |
| `offset` | `array` | 未提供 | 标记图形偏移<br>`{"optKey":"symbolOffset"}` |

## `echarts.Radar.tick`

<a id="entry-echarts-radar-tick"></a>

坐标轴刻度配置

控制选定坐标轴上的刻度。

写入可见性、刻度长度、自定义位置、interval、对齐和内侧位置；lineStyle 子样式控制刻度线条。

位置参数顺序: `length` → `customValues` → `alignWithLabel` → `interval` → `inside` → `show`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `length` | `number` | 未提供 | 刻度长度 |
| `customValues` | `array` | 未提供 | 自定义显示刻度的位置 |
| `alignWithLabel` | `boolean` | 未提供 | 刻度线与标签对齐 |
| `interval` | `number` | 未提供 | 刻度间隔 |
| `inside` | `boolean` | 未提供 | 刻度线是否朝内 |
| `show` | `boolean` | `true` | 显示 |

## `echarts.title.hide`

<a id="entry-echarts-title-hide"></a>

隐藏

隐藏图表标题。

写入 title.show=false，同时保留其他标题选项。

## `echarts.axis.flipXY`

<a id="entry-echarts-axis-flipxy"></a>

反转XY轴

在已有的一对坐标轴间交换类型和数据。

仅交换 x/y 或 angle/radius 轴的 type 和 data；两对坐标轴均存在时优先使用笛卡尔坐标轴。

不转置数据集，也不交换坐标轴样式和范围。

## `echarts.grid.border`

<a id="entry-echarts-grid-border"></a>

边框

为网格或提示框盒绘制边框。

将边框颜色、宽度和类型映射到选定所有者，省略圆角、虚线偏移、端点、连接点和斜接限制参数。

网格可能还需设置 show=true。此变体有意比图形项和标签边框暴露更少的字段。

位置参数顺序: `color` → `width` → `type` → `border`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |

## `echarts.grid.shadow`

<a id="entry-echarts-grid-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.legend.hide`

<a id="entry-echarts-legend-hide"></a>

隐藏

移除图表图例选项。

在选项合并时为 legend 发出删除标记。

此样式移除选项，而非仅改变 legend.show。

## `echarts.line.jagged`

<a id="entry-echarts-line-jagged"></a>

直线折线

移除平滑折线预设。

为 series.smooth 输出删除标记，使合并后的选项不再要求平滑。

需要折角连接时，在基本折线样式之后应用。

## `echarts.line.symbol`

<a id="entry-echarts-line-symbol"></a>

标记图形

配置折线系列的数据点符号。

将 symbol、show、size、offset 和 rotate 映射到系列符号字段；show 默认为 true。

在基本折线样式之后使用，以显示该预设隐藏的符号。

位置参数顺序: `symbol` → `show` → `size` → `offset` → `rotate`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `symbol` | `string` | 未提供 | 标记图形<br>`{"optKey":"symbol"}` |
| `show` | `boolean` | `true` | 是否显示标记图形<br>`{"optKey":"showSymbol"}` |
| `size` | `functionOrAny` | 未提供 | 标记图形大小<br>`{"optKey":"symbolSize"}` |
| `offset` | `array` | 未提供 | 标记图形偏移<br>`{"optKey":"symbolOffset"}` |
| `rotate` | `functionOrAny` | 未提供 | 标记图形旋转<br>`{"optKey":"symbolRotate"}` |

## `echarts.Radar.label`

<a id="entry-echarts-radar-label"></a>

标签配置

配置选定的笛卡尔坐标轴或雷达轴上的刻度标签。

在标签格式基础上扩展 interval、边缘标签可见性、重叠处理和自定义值；写入对应的 axisLabel 所有者。

轴线和刻度使用同级的 line 和 tick；轴标题使用轴名称样式。

insideLabel 按原名传递；此辅助样式不将其映射为 inside。

位置参数顺序: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `interval` → `insideLabel` → `margin` → `showMinLabel` → `showMaxLabel` → `alignMinLabel` → `alignMaxLabel` → `hideOverlap` → `customValues`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `align` | `string` | 未提供 | 文字水平对齐 |
| `verticalAlign` | `string` | 未提供 | 文字垂直对齐 |
| `rotate` | `number` | 未提供 | 旋转角度 |
| `width` | `number` | 未提供 | 文本显示宽度 |
| `height` | `number` | 未提供 | 文本显示高度 |
| `rich` | `dictionary` | 未提供 | 富文本 |
| `lineHeight` | `number` | 未提供 | 行高 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `opacity` | `number` | 未提供 | 透明度 |
| `interval` | `number` | 未提供 | 标签间隔 |
| `insideLabel` | `boolean` | 未提供 | 标签是否朝内 |
| `margin` | `number` | 未提供 | 标签与轴线的距离 |
| `showMinLabel` | `boolean` | 未提供 | 是否显示最小标签 |
| `showMaxLabel` | `boolean` | 未提供 | 是否显示最大标签 |
| `alignMinLabel` | `string` | 未提供 | 最小刻度标签对齐方式 |
| `alignMaxLabel` | `string` | 未提供 | 最大刻度标签对齐方式 |
| `hideOverlap` | `boolean` | 未提供 | 是否隐藏重叠的标签 |
| `customValues` | `array` | 未提供 | 自定义标签位置 |

## `echarts.shadow.item`

<a id="entry-echarts-shadow-item"></a>

为系列项应用统一的原生阴影。

直接写入 series.itemStyle 的阴影偏移、模糊和颜色，默认值基于 rem。

基于主题的阴影字典使用 itemStyle.shadow；为所有系列应用主题默认阴影的预设使用 pie.shadow。

位置参数顺序: `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `offsetX` | `number` | 运行时决定 (number) | X 偏移 |
| `offsetY` | `number` | 运行时决定 (number) | Y 偏移 |
| `blur` | `number` | 运行时决定 (number) | 模糊 |
| `color` | `string` | `hsla(0, 0%, 0%, 0.15)` | 颜色 |

## `echarts.bar.stackBar`

<a id="entry-echarts-bar-stackbar"></a>

堆叠柱状图

渲染分隔的堆叠段，并填充剩余容量。

计算最大的行总和，插入透明的间隔列及系列，追加剩余值列，设置由表头派生的图例，并为剩余部分启用 decal。

需要非空的带表头数值数据集和匹配的柱状系列。

替换数据集 source、series、legend 和 aria 选项。interval 是最大总和的除数，不是时间间隔；没有防护零值或无效除数。

位置参数顺序: `interval` → `radius`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `interval` | `number` | `120` | 堆叠间隙除数 |
| `radius` | `array` | `[7,7,7,7]` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |

## `echarts.label.border`

<a id="entry-echarts-label-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.label.shadow`

<a id="entry-echarts-label-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.line.avgAMax`

<a id="entry-echarts-line-avgamax"></a>

平均线和最大值

同时标记折线系列的平均值和最大值。

组合无符号的平均值标注线与圆形最大值标注点，并隐藏两者的标注标签。

需要独立标签或标注数据时，使用单独的 markLine 和 markPoint 子样式。

位置参数顺序: `size`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `size` | `functionOrAny` | 标记图形大小<br>`{"optKey":"symbolSize"}` |

## `echarts.pie.position`

<a id="entry-echarts-pie-position"></a>

位置

同时设置饼图中心及内外半径。

将 innerR 和 outerR 映射到 series.radius，将 cX/cY 映射到 series.center，默认值为百分比字符串。

非零内半径产生环形；与 ring 或其他同样写入半径的预设组合时，使用显式值。

位置参数顺序: `innerR` → `outerR` → `cX` → `cY`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `innerR` | `string` | `0%` | 内半径 |
| `outerR` | `string` | `75%` | 外半径 |
| `cX` | `string` | `50%` | X 轴 |
| `cY` | `string` | `50%` | Y 轴 |

## `echarts.pie.roseType`

<a id="entry-echarts-pie-rosetype"></a>

选择玫瑰饼图编码方式。

根据 type 写入 series.roseType，默认为 radius，可选 radius 或 area。

与饼图系列配合使用。应用 pie.ring 时会在选项合并过程中移除 roseType。

位置参数顺序: `type`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `type` | `string` | `radius` | 玫瑰图类型<br>选项: `radius`, `area` |

## `echarts.title.border`

<a id="entry-echarts-title-border"></a>

边框

为标题或图例容器绘制边框。

写入选定 title/legend 的边框字段，包括圆角；省略端点、连接点、斜接限制和虚线偏移。

字形描边使用 textStyle.stroke，图例标记描边使用 itemStyle.border。

位置参数顺序: `color` → `width` → `type` → `radius` → `border`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |

## `echarts.title.center`

<a id="entry-echarts-title-center"></a>

居中

将标题居中放置在图表上方。

将 title 的 top 和 left 设为 center、z 设为 10，同时输出 title 层级的 fontSize 值。

pie.ring 用它显示中心内容；title.text 需单独设置。

该预设在 title 层级输出 fontSize，而非 title.textStyle；应通过 textStyle 配置标题字体样式。

## `echarts.title.shadow`

<a id="entry-echarts-title-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.tooltip.hide`

<a id="entry-echarts-tooltip-hide"></a>

隐藏

移除提示框选项。

在选项合并时为 tooltip 发出删除标记。

## `echarts.axis.hideLine`

<a id="entry-echarts-axis-hideline"></a>

隐藏坐标轴基线。

用单个坐标轴名称字符串选择该轴；没有字符串选择器时，辅助函数会为 x、y、angle 和 radius 轴输出可选的 axisLine show=false 选项。

使用单个坐标轴名称字符串进行选择。数组或对象不会被展开为轴选择器；没有单个字符串时，会回退到全部四类坐标轴。

## `echarts.axis.hideTick`

<a id="entry-echarts-axis-hidetick"></a>

隐藏坐标轴刻度。

用单个坐标轴名称字符串选择该轴；没有字符串选择器时，辅助函数会为 x、y、angle 和 radius 轴输出可选的 axisTick show=false 选项。

使用单个坐标轴名称字符串进行选择。数组或对象不会被展开为轴选择器；没有单个字符串时，会回退到全部四类坐标轴。

## `echarts.bar.itemStyle`

<a id="entry-echarts-bar-itemstyle"></a>

图形样式

设置选定图表项、地图区域、图例标记或强调状态项的样式。

将 color 和 opacity 写入路径选定的 itemStyle，并为同一所有者提供 border 和 shadow 子样式。

常规状态与强调状态需选择完整路径。系列项样式与 geo 或 calendar 样式作用于不同所有者。

位置参数顺序: `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.geo.itemStyle`

<a id="entry-echarts-geo-itemstyle"></a>

图形样式

设置选定图表项、地图区域、图例标记或强调状态项的样式。

将 color 和 opacity 写入路径选定的 itemStyle，并为同一所有者提供 border 和 shadow 子样式。

常规状态与强调状态需选择完整路径。系列项样式与 geo 或 calendar 样式作用于不同所有者。

位置参数顺序: `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.legend.border`

<a id="entry-echarts-legend-border"></a>

边框

为标题或图例容器绘制边框。

写入选定 title/legend 的边框字段，包括圆角；省略端点、连接点、斜接限制和虚线偏移。

字形描边使用 textStyle.stroke，图例标记描边使用 itemStyle.border。

位置参数顺序: `color` → `width` → `type` → `radius` → `border`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |

## `echarts.legend.orient`

<a id="entry-echarts-legend-orient"></a>

朝向

选择图例排列方向。

写入 legend.orient，默认为 horizontal。

位置参数顺序: `orient`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `orient` | `string` | `horizontal` | 朝向 |

## `echarts.legend.shadow`

<a id="entry-echarts-legend-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.line.markLine`

<a id="entry-echarts-line-markline"></a>

标线

为系列添加参考线标注。

写入 markLine 的 data、symbols、precision 和 silent 行为；子样式设置标签、线条、强调状态和动画。

平均值标注使用 avg；指定轴值处的参考线使用 x/y。

位置参数顺序: `precision` → `data` → `silent` → `symbol` → `size`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `precision` | `number` | 精度 |
| `data` | `array` | 数据<br>支持简写 |
| `silent` | `boolean` | 是否不响应鼠标事件 |
| `symbol` | `string` | 标记图形<br>`{"optKey":"symbol"}` |
| `size` | `functionOrAny` | 标记图形大小<br>`{"optKey":"symbolSize"}` |

## `echarts.pie.itemStyle`

<a id="entry-echarts-pie-itemstyle"></a>

图形样式

设置选定图表项、地图区域、图例标记或强调状态项的样式。

将 color 和 opacity 写入路径选定的 itemStyle，并为同一所有者提供 border 和 shadow 子样式。

常规状态与强调状态需选择完整路径。系列项样式与 geo 或 calendar 样式作用于不同所有者。

位置参数顺序: `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.axis.angleAxis`

<a id="entry-echarts-axis-angleaxis"></a>

标识旧版 angleAxis 类型辅助样式。

其唯一回调参数被赋给 angleAxis.type，但选项插件调用回调时首先传入宿主元素。

尚未建立可用的类型参数映射。优先使用显式 x/y 轴类型参数或原始极坐标选项。radiusAxis 还覆盖了先前完整的半径轴构建器导出。

## `echarts.axis.hideLabel`

<a id="entry-echarts-axis-hidelabel"></a>

隐藏坐标轴标签。

用单个坐标轴名称字符串选择该轴；没有字符串选择器时，辅助函数会为 x、y、angle 和 radius 轴输出可选的 axisLabel show=false 选项。

使用单个坐标轴名称字符串进行选择。数组或对象不会被展开为轴选择器；没有单个字符串时，会回退到全部四类坐标轴。

## `echarts.axis.xAxisType`

<a id="entry-echarts-axis-xaxistype"></a>

标识旧版 xAxis 类型辅助样式。

其唯一回调参数被赋给 xAxis.type，但选项插件调用回调时首先传入宿主元素。

尚未建立可用的类型参数映射。优先使用显式 x/y 轴类型参数或原始极坐标选项。radiusAxis 还覆盖了先前完整的半径轴构建器导出。

## `echarts.axis.yAxisName`

<a id="entry-echarts-axis-yaxisname"></a>

添加预设的 y 轴标题。

写入 yAxis.name 和 nameLocation，并设置右对齐、指定字重、固定内边距和 nameGap 的 nameTextStyle。

此样式还将 fontSize 输出为百分比字符串。显式的受支持样式使用 y.nameStyle 和 y.nameStyle.textStyle。

位置参数顺序: `name` → `position` → `align` → `vertial` → `color` → `family`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `name` | `string` | 未提供 | 名称 |
| `position` | `string` | `end` | 位置 |
| `align` | `string` | `right` | 对齐 |
| `vertial` | `string` | `top` | 垂直对齐 |
| `color` | `string` | 未提供 | 颜色 |
| `family` | `string` | `sans-serif , Arial` | 字体族 |

## `echarts.axis.yAxisType`

<a id="entry-echarts-axis-yaxistype"></a>

标识旧版 yAxis 类型辅助样式。

其唯一回调参数被赋给 yAxis.type，但选项插件调用回调时首先传入宿主元素。

尚未建立可用的类型参数映射。优先使用显式 x/y 轴类型参数或原始极坐标选项。radiusAxis 还覆盖了先前完整的半径轴构建器导出。

## `echarts.bar.gradientBg`

<a id="entry-echarts-bar-gradientbg"></a>

用由配色派生的垂直渐变填充柱形。

为每个当前系列合并由其配色项派生的 itemStyle 颜色渐变，并调整饱和度、明度和色相。

每个系列都需要对应的配色项。

回调不筛选系列类型；尽管名称如此，它修改的是 itemStyle，而非 backgroundStyle。

## `echarts.line.animation`

<a id="entry-echarts-line-animation"></a>

动画

控制折线系列的入场动画。

将启用状态、delay、duration 和 easing 映射到系列动画字段，默认时长为 3000 毫秒，无 type 参数。

位置参数顺序: `animation` → `delay` → `duration` → `easing`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `animation` | `boolean` | `true` | 开启动画<br>`{"optKey":"animation"}` |
| `delay` | `number` | 未提供 | 动画延迟<br>`{"optKey":"animationDelay"}` |
| `duration` | `number` | `3000` | 动画时长<br>`{"optKey":"animationDuration"}` |
| `easing` | `string` | 未提供 | 动画缓动<br>选项: `linear`, `quadraticIn`, `quadraticOut`<br>`{"optKey":"animationEasing"}` |

## `echarts.line.areaStyle`

<a id="entry-echarts-line-areastyle"></a>

区域样式

填充折线系列下方的区域。

写入 series.areaStyle 的 color、opacity 和 orient，并提供 shadow 子样式。

线条使用 line.lineStyle，由配色派生的填充预设使用 gradientBg；此辅助样式不改变系列数据。

位置参数顺序: `color` → `opacity` → `orient`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |
| `orient` | `numberOrString` | 起始位置 |

## `echarts.line.bigSymbol`

<a id="entry-echarts-line-bigsymbol"></a>

大图标

强调折线系列的数据点符号。

应用符号设置，默认为大圆形，并隐藏 y 轴及 x 基线和刻度。

此处已声明的 smooth 参数不会传递到折线系列选项；应另行在 echarts.line 上设置 smooth 参数。

位置参数顺序: `symbol` → `size` → `show` → `smooth`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `symbol` | `string` | `circle` | 标记图形<br>`{"optKey":"symbol"}` |
| `size` | `functionOrAny` | 运行时决定 (number) | 标记图形大小<br>支持简写<br>`{"optKey":"symbolSize"}` |
| `show` | `boolean` | `true` | 是否显示标记图形<br>`{"optKey":"showSymbol"}` |
| `smooth` | `boolean` | 未提供 | 是否平滑曲线 |

## `echarts.line.itemStyle`

<a id="entry-echarts-line-itemstyle"></a>

图形样式

设置选定图表项、地图区域、图例标记或强调状态项的样式。

将 color 和 opacity 写入路径选定的 itemStyle，并为同一所有者提供 border 和 shadow 子样式。

常规状态与强调状态需选择完整路径。系列项样式与 geo 或 calendar 样式作用于不同所有者。

位置参数顺序: `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.line.lineStyle`

<a id="entry-echarts-line-linestyle"></a>

线样式

为已有图表、轴线、刻度、指示器或分割线设置线条样式。

在路径选定的 lineStyle 所有者上写入线条颜色、宽度、虚线模式、端点、连接点和透明度；提供 shadow 子样式。echarts.line.lineStyle 提供虚线默认值。

此样式不启用被隐藏的父级线条，也不创建数据。系列线、强调状态线和坐标系线仍有不同的所有者。

位置参数顺序: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `width` | `number` | 未提供 | 线宽 |
| `type` | `string` | `dashed` | 线类型 |
| `dashOffset` | `number` | 未提供 | 虚线偏移 |
| `cap` | `string` | 未提供 | 线端点类型 |
| `join` | `string` | 未提供 | 线连接类型 |
| `miterLimit` | `number` | 未提供 | 斜接面限制比例 |
| `color` | `functionOrString` | 未提供 | 颜色 |
| `opacity` | `number` | 未提供 | 透明度 |

## `echarts.line.markPoint`

<a id="entry-echarts-line-markpoint"></a>

标记点

为系列添加点标注。

写入 markPoint 的 data、符号设置和 silent 行为，并提供 label、itemStyle、emphasis 和 animation 子样式。

内置极值使用 max/min；自定义标注可提供 data。

位置参数顺序: `data` → `silent` → `symbol` → `size` → `offset` → `rotate`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `data` | `array` | 数据<br>支持简写 |
| `silent` | `boolean` | 是否不响应鼠标事件 |
| `symbol` | `string` | 标记图形<br>`{"optKey":"symbol"}` |
| `size` | `functionOrAny` | 标记图形大小<br>`{"optKey":"symbolSize"}` |
| `offset` | `array` | 标记图形偏移<br>`{"optKey":"symbolOffset"}` |
| `rotate` | `functionOrAny` | 标记图形旋转<br>`{"optKey":"symbolRotate"}` |

## `echarts.Radar.axisName`

<a id="entry-echarts-radar-axisname"></a>

雷达坐标系指示器名称配置

格式化雷达指示器名称。

写入 radar.axisName，包括可见性、formatter、富文本和盒尺寸；border、shadow 和 textStyle 子样式作用于同一个轴名称所有者。

位置参数顺序: `width` → `height` → `rich` → `lineHeight` → `padding` → `backgroundColor` → `show` → `formatter`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `width` | `number` | 未提供 | 名称宽度 |
| `height` | `number` | 未提供 | 名称高度 |
| `rich` | `dictionary` | 未提供 | 富文本 |
| `lineHeight` | `number` | 未提供 | 行高 |
| `padding` | `array` | 未提供 | 内边距 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `show` | `boolean` | `true` | 显示 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |

## `echarts.title.position`

<a id="entry-echarts-title-position"></a>

标题位置

设置图表标题的位置。

通过位置辅助函数写入标题四边的位置值和 padding；标题 padding 默认为顶部内边距 10。

位置参数顺序: `top` → `left` → `bottom` → `right` → `padding`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `top` | `string` | `auto` | 上边距 |
| `left` | `string` | `auto` | 左边距 |
| `bottom` | `string` | `auto` | 下边距 |
| `right` | `string` | `auto` | 右边距 |
| `padding` | `array` | `[10,0,0,0]` | 内边距 |

## `echarts.tooltip.border`

<a id="entry-echarts-tooltip-border"></a>

边框

为网格或提示框盒绘制边框。

将边框颜色、宽度和类型映射到选定所有者，省略圆角、虚线偏移、端点、连接点和斜接限制参数。

网格可能还需设置 show=true。此变体有意比图形项和标签边框暴露更少的字段。

位置参数顺序: `color` → `width` → `type` → `border`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |

## `echarts.tooltip.shadow`

<a id="entry-echarts-tooltip-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.animation.scale`

<a id="entry-echarts-animation-scale"></a>

缩放

应用弹性缩放动画预设。

将 echarts.animation 与 scale 类型和 elasticOut 缓动组合，保留按索引计算的延迟。

## `echarts.axis.radiusAxis`

<a id="entry-echarts-axis-radiusaxis"></a>

标识旧版 radiusAxis 类型辅助样式。

其唯一回调参数被赋给 radiusAxis.type，但选项插件调用回调时首先传入宿主元素。

尚未建立可用的类型参数映射。优先使用显式 x/y 轴类型参数或原始极坐标选项。radiusAxis 还覆盖了先前完整的半径轴构建器导出。

## `echarts.axis.showYSplit`

<a id="entry-echarts-axis-showysplit"></a>

显示带分割线的交替 y 轴区域带。

在每个间隔启用 yAxis splitArea，以实线启用 yAxis splitLine，并赋予提供的区域带颜色。

lineColor 被输出为 splitLine.lineStyle.borderColor，而非 color。要设置映射后的描边颜色，应在 echarts.axis.y.splitLine.lineStyle 上设置 color 参数。

位置参数顺序: `color` → `lineColor`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `array` | 颜色 |
| `lineColor` | `arrayOrString` | 边框颜色 |

## `echarts.axis.xLabelFont`

<a id="entry-echarts-axis-xlabelfont"></a>

X 轴标签字体

使用旧版字体辅助样式设置 x 轴标签字体。

将 fontStyle、fontWeight、fontFamily 和 fontSize 直接写入 xAxis.axisLabel，默认尺寸为转换成像素的 0.8rem。

位置参数顺序: `style` → `weight` → `family` → `size`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `style` | `string` | `normal` | 样式 |
| `weight` | `string` | `normal` | 字重 |
| `family` | `string` | `sans-serif, Arial` | 字体族 |
| `size` | `number` | 运行时决定 (number) | 大小 |

## `echarts.axis.yLabelFont`

<a id="entry-echarts-axis-ylabelfont"></a>

Y 轴标签字体

使用旧版字体辅助样式设置 y 轴标签字体。

将 fontStyle、fontWeight、fontFamily 和 fontSize 直接写入 yAxis.axisLabel，默认尺寸为转换成像素的 0.8rem。

位置参数顺序: `style` → `weight` → `family` → `size`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `style` | `string` | `normal` | 样式 |
| `weight` | `string` | `normal` | 字重 |
| `family` | `string` | `sans-serif, Arial` | 字体族 |
| `size` | `number` | 运行时决定 (number) | 大小 |

## `echarts.bar.floatingBar`

<a id="entry-echarts-bar-floatingbar"></a>

悬浮柱状图

显示围绕舍入后的平均值悬浮的柱形。

对于恰有两列的带表头数据集，将数据集替换为堆叠在一起的不可见偏移列和可见数值列；可选标记极值，并隐藏两个轴。

需要 dataset[0].source、恰有两列表头、数值和已有的笛卡尔坐标轴。

此样式替换系列和提示框配置。每个下侧偏移为舍入后的平均值减去该值的一半；列数不受支持时，不执行此转换。

位置参数顺序: `show` → `size` → `offset` → `iconColor` → `labelColor`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `show` | `boolean` | `true` | 是否显示标记图形<br>`{"optKey":"showSymbol"}` |
| `size` | `functionOrAny` | 运行时决定 (number) | 标记图形大小<br>`{"optKey":"symbolSize"}` |
| `offset` | `array` | `["0%","100%"]` | 标记图形偏移<br>`{"optKey":"symbolOffset"}` |
| `iconColor` | `string` | `hsl(0,0%,100%)` | 标记图形颜色 |
| `labelColor` | `string` | `blue` | 图形标签颜色 |

## `echarts.grid.showBorder`

<a id="entry-echarts-grid-showborder"></a>

显示边框

显示绘图区边框，同时隐藏坐标轴基线。

启用 grid.show，设置 grid.borderWidth，并将 x/y 坐标轴线颜色设为透明。

color 参数被输出为 grid.color，而非 grid.borderColor；要设置映射后的外框颜色，应在 echarts.grid.border 上设置 color 参数。此样式还会修改两条直角坐标轴的轴线。

位置参数顺序: `color` → `borderWidth`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `color` | `string` | 未提供 | 边框颜色 |
| `borderWidth` | `number` | `1` | 边框宽度 |

## `echarts.label.textStyle`

<a id="entry-echarts-label-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.legend.position`

<a id="entry-echarts-legend-position"></a>

位置

将图例放置在图表内。

同时写入 top、left、bottom、right 和 padding；未指定的边默认为 auto。

应用辅助样式时也会写入其默认值；需设置所有希望保留的定位值。

位置参数顺序: `top` → `left` → `bottom` → `right` → `padding`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `top` | `string` | `auto` | 上 |
| `left` | `string` | `auto` | 左 |
| `bottom` | `string` | `auto` | 下 |
| `right` | `string` | `auto` | 右 |
| `padding` | `array` | `[0,0,0,0]` | 内边距 |

## `echarts.line.gradientBg`

<a id="entry-echarts-line-gradientbg"></a>

用由配色派生的渐隐渐变填充折线区域。

为每个系列赋予 areaStyle 渐变，渐隐方向取决于当前亮色或暗色背景。

需要与系列匹配的配色项。

替换每个系列的 areaStyle 对象，不筛选系列类型。

## `echarts.Radar.splitArea`

<a id="entry-echarts-radar-splitarea"></a>

分割区域样式

显示雷达分割区域带。

写入 radar.splitArea.show，并提供 areaStyle 设置带状填充。

配合 Radar.splitLine 绘制带状区域间的边界。

位置参数顺序: `show`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `show` | `boolean` | `true` | 显示 |

## `echarts.Radar.splitLine`

<a id="entry-echarts-radar-splitline"></a>

分割线

控制雷达或日历坐标系分割线的可见性。

将 show 写入 radar.splitLine 或 calendar.splitLine，并提供匹配的 lineStyle 子样式。

使用对应所有者的子样式控制线条外观；数据系列线是独立的。

位置参数顺序: `show`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `show` | `boolean` | `true` | 显示 |

## `echarts.title.textStyle`

<a id="entry-echarts-title-textstyle"></a>

文本样式

配置标题、副标题或提示框的字体样式。

将字体属性、溢出行为、行高和尺寸写入选定的 textStyle/subtextStyle 配置对象，并提供文字描边和文字阴影子样式。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color` → `lineHeight` → `width` → `height`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |
| `lineHeight` | `number` | 文本行高 |
| `width` | `number` | 文本宽度 |
| `height` | `number` | 文本高度 |

## `echarts.title.titleFont`

<a id="entry-echarts-title-titlefont"></a>

标题字体

通过旧版字体辅助函数设置标题字体样式。

将 fontStyle、fontWeight、fontFamily 和 fontSize 写入 title.textStyle。

位置参数顺序: `style` → `weight` → `family` → `size`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `style` | `string` | `normal` | 样式 |
| `weight` | `string` | `normal` | 字重 |
| `family` | `string` | `sans-serif, Arial` | 字体族 |
| `size` | `number` | 运行时决定 (number) | 大小 |

## `echarts.tooltip.pointer`

<a id="entry-echarts-tooltip-pointer"></a>

坐标轴指示器配置项

配置提示框或坐标轴指示器。

写入对应的 axisPointer 选项，并提供 label、lineStyle、shadowStyle 和 handle 子样式。

提示框拥有的指示器行为使用 tooltip.pointer；单个轴使用 x/y.pointer。指示器类型在父级选择。

位置参数顺序: `type` → `snap` → `z` → `triggerEmphasis` → `triggerTooltip` → `value` → `status` → `show`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `type` | `string` | 未提供 | 类型 |
| `snap` | `boolean` | 未提供 | 是否自动吸附 |
| `z` | `number` | 未提供 | 层级 |
| `triggerEmphasis` | `boolean` | 未提供 | 是否触发高亮 |
| `triggerTooltip` | `boolean` | 未提供 | 是否触发提示框 |
| `value` | `string` | 未提供 | handle 默认值 |
| `status` | `string` | 未提供 | 指示器状态 |
| `show` | `boolean` | `true` | 显示 |

## `echarts.legend.itemStyle`

<a id="entry-echarts-legend-itemstyle"></a>

图形样式

设置选定图表项、地图区域、图例标记或强调状态项的样式。

将 color 和 opacity 写入路径选定的 itemStyle，并为同一所有者提供 border 和 shadow 子样式。

常规状态与强调状态需选择完整路径。系列项样式与 geo 或 calendar 样式作用于不同所有者。

位置参数顺序: `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.legend.lineStyle`

<a id="entry-echarts-legend-linestyle"></a>

线样式

设置图例线条标记样式。

写入 legend.lineStyle，包含线条选项以及未激活颜色和未激活边框颜色；提供阴影样式。

填充标记使用 legend.itemStyle，标题文字使用 legend.textStyle。

位置参数顺序: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity` → `inactiveColor` → `inactiveBorderColor`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `width` | `number` | 线宽 |
| `type` | `string` | 线类型 |
| `dashOffset` | `number` | 虚线偏移 |
| `cap` | `string` | 线端点类型 |
| `join` | `string` | 线连接类型 |
| `miterLimit` | `number` | 斜接面限制比例 |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |
| `inactiveColor` | `string` | 图例未选中颜色 |
| `inactiveBorderColor` | `string` | 图例未选中边框颜色 |

## `echarts.legend.textStyle`

<a id="entry-echarts-legend-textstyle"></a>

文本样式

设置图例标题文字样式。

写入 legend.textStyle 的字体、行高、宽度、高度和内边距，并提供字形描边和文字阴影子样式。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color` → `lineHeight` → `width` → `height` → `padding`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |
| `lineHeight` | `number` | 文本行高 |
| `width` | `number` | 文本宽度 |
| `height` | `number` | 文本高度 |
| `padding` | `array` | 内边距 |

## `echarts.pie.doubleCircle`

<a id="entry-echarts-pie-doublecircle"></a>

双圆环图

渲染两条分段的同心进度环。

将前两个系列的数据替换为名义上各分 48 段的环，并固定半径；激活段数使用 source[1][1]/source[2][1] 和 source[1][2]/source[2][1]。

需要至少包含两个数值列的带表头数据集、引用的两个数据行、两个饼图系列、两个配色颜色，以及有效且非零的分母。

比值不钳制：分子大于分母时可能生成超过 48 个激活段。top 参数不传递。此样式是特定的双值显示，不是任意嵌套饼图构建器。

位置参数顺序: `top`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `top` | `numberOrString` | `2%` | 上边距 |

## `echarts.bar.maxHightLight`

<a id="entry-echarts-bar-maxhightlight"></a>

最大值高亮

强调每个柱状系列中的最大值。

将数据集的每个数值列转换为逐项数据，使其他项淡化至配置的透明度，并为并列最大值保留配色；同时隐藏 y 轴和 x 基线及刻度。

需要带表头数据集、配色项、匹配的系列和 xAxis 对象。

最大值累积变量从 -1 开始，因此整列数值均小于 -1 时无法正确高亮。透明度超出零到一的范围时回退为 0.2。

位置参数顺序: `opacity`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `opacity` | `number` | `0.2` | 灰显颜色透明度<br>支持简写 |

## `echarts.calendar.dayLabel`

<a id="entry-echarts-calendar-daylabel"></a>

标签配置

格式化路径选定的通用、地理或日历标签。

在该标签所有者上写入对齐、可见性、formatter、富文本、尺寸、内边距、背景和透明度；提供 border、shadow 和 textStyle 子样式。

echarts.label 写入顶层 label 选项；calendar 日/月/年标签和 geo 标签各有其所有者。系列专用标签契约使用系列标签样式。

位置参数顺序: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `align` | `string` | 未提供 | 文字水平对齐 |
| `verticalAlign` | `string` | 未提供 | 文字垂直对齐 |
| `rotate` | `number` | 未提供 | 旋转角度 |
| `width` | `number` | 未提供 | 文本显示宽度 |
| `height` | `number` | 未提供 | 文本显示高度 |
| `rich` | `dictionary` | 未提供 | 富文本 |
| `lineHeight` | `number` | 未提供 | 行高 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `opacity` | `number` | 未提供 | 透明度 |

## `echarts.legend.legendFont`

<a id="entry-echarts-legend-legendfont"></a>

图例字体

使用旧版字体辅助样式设置图例字体。

将 fontStyle、fontWeight、fontFamily 和 fontSize 写入 legend.textStyle。

位置参数顺序: `style` → `weight` → `family` → `size`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `style` | `string` | `normal` | 样式 |
| `weight` | `string` | `normal` | 字重 |
| `family` | `string` | `sans-serif, Arial` | 字体族 |
| `size` | `number` | 运行时决定 (number) | 大小 |

## `echarts.tooltip.textStyle`

<a id="entry-echarts-tooltip-textstyle"></a>

文本样式

配置标题、副标题或提示框的字体样式。

将字体属性、溢出行为、行高和尺寸写入选定的 textStyle/subtextStyle 配置对象，并提供文字描边和文字阴影子样式。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color` → `lineHeight` → `width` → `height`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |
| `lineHeight` | `number` | 文本行高 |
| `width` | `number` | 文本宽度 |
| `height` | `number` | 文本高度 |

## `echarts.axis.hideSplitLine`

<a id="entry-echarts-axis-hidesplitline"></a>

隐藏坐标轴分割线。

用单个坐标轴名称字符串选择该轴；没有字符串选择器时，辅助函数会为 x、y、angle 和 radius 轴输出可选的 splitLine show=false 选项。

使用单个坐标轴名称字符串进行选择。数组或对象不会被展开为轴选择器；没有单个字符串时，会回退到全部四类坐标轴。

## `echarts.calendar.itemStyle`

<a id="entry-echarts-calendar-itemstyle"></a>

图形样式

设置选定图表项、地图区域、图例标记或强调状态项的样式。

将 color 和 opacity 写入路径选定的 itemStyle，并为同一所有者提供 border 和 shadow 子样式。

常规状态与强调状态需选择完整路径。系列项样式与 geo 或 calendar 样式作用于不同所有者。

位置参数顺序: `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.calendar.splitLine`

<a id="entry-echarts-calendar-splitline"></a>

分割线

控制雷达或日历坐标系分割线的可见性。

将 show 写入 radar.splitLine 或 calendar.splitLine，并提供匹配的 lineStyle 子样式。

使用对应所有者的子样式控制线条外观；数据系列线是独立的。

位置参数顺序: `show`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `show` | `boolean` | `true` | 显示 |

## `echarts.calendar.yearLabel`

<a id="entry-echarts-calendar-yearlabel"></a>

标签配置

格式化路径选定的通用、地理或日历标签。

在该标签所有者上写入对齐、可见性、formatter、富文本、尺寸、内边距、背景和透明度；提供 border、shadow 和 textStyle 子样式。

echarts.label 写入顶层 label 选项；calendar 日/月/年标签和 geo 标签各有其所有者。系列专用标签契约使用系列标签样式。

位置参数顺序: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `align` | `string` | 未提供 | 文字水平对齐 |
| `verticalAlign` | `string` | 未提供 | 文字垂直对齐 |
| `rotate` | `number` | 未提供 | 旋转角度 |
| `width` | `number` | 未提供 | 文本显示宽度 |
| `height` | `number` | 未提供 | 文本显示高度 |
| `rich` | `dictionary` | 未提供 | 富文本 |
| `lineHeight` | `number` | 未提供 | 行高 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `opacity` | `number` | 未提供 | 透明度 |

## `echarts.title.subtextStyle`

<a id="entry-echarts-title-subtextstyle"></a>

文本样式

配置标题、副标题或提示框的字体样式。

将字体属性、溢出行为、行高和尺寸写入选定的 textStyle/subtextStyle 配置对象，并提供文字描边和文字阴影子样式。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color` → `lineHeight` → `width` → `height`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |
| `lineHeight` | `number` | 文本行高 |
| `width` | `number` | 文本宽度 |
| `height` | `number` | 文本高度 |

## `echarts.title.subtitleFont`

<a id="entry-echarts-title-subtitlefont"></a>

副标题字体

说明旧版副标题字体辅助函数及其当前限制。

该辅助函数将字体字段写入 title[副标题字体]，而非 title.subtextStyle。

不要依赖此辅助函数设置副标题字体；应使用 echarts.title.subtextStyle。此处保留实际不匹配的输出键，元数据不会修复它。

位置参数顺序: `style` → `weight` → `family` → `size`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `style` | `string` | `normal` | 样式 |
| `weight` | `string` | `normal` | 字重 |
| `family` | `string` | `sans-serif, Arial` | 字体族 |
| `size` | `number` | 运行时决定 (number) | 大小 |

## `echarts.tooltip.restricted`

<a id="entry-echarts-tooltip-restricted"></a>

将提示框位置限制在图表内。

写入 tooltip.confine=true，不改变其内容或触发方式。

## `echarts.calendar.monthLabel`

<a id="entry-echarts-calendar-monthlabel"></a>

标签配置

格式化路径选定的通用、地理或日历标签。

在该标签所有者上写入对齐、可见性、formatter、富文本、尺寸、内边距、背景和透明度；提供 border、shadow 和 textStyle 子样式。

echarts.label 写入顶层 label 选项；calendar 日/月/年标签和 geo 标签各有其所有者。系列专用标签契约使用系列标签样式。

位置参数顺序: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `align` | `string` | 未提供 | 文字水平对齐 |
| `verticalAlign` | `string` | 未提供 | 文字垂直对齐 |
| `rotate` | `number` | 未提供 | 旋转角度 |
| `width` | `number` | 未提供 | 文本显示宽度 |
| `height` | `number` | 未提供 | 文本显示高度 |
| `rich` | `dictionary` | 未提供 | 富文本 |
| `lineHeight` | `number` | 未提供 | 行高 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `opacity` | `number` | 未提供 | 透明度 |

## `echarts.pie.electronicScale`

<a id="entry-echarts-pie-electronicscale"></a>

电子秤

渲染带指针的分段半圆进度刻度。

用 source[1][1]/source[2][1] 计算角度，将第一个系列替换为 24 个等分段，并追加背景饼图和不响应事件的极坐标散点指针。

需要引用的两个数值数据项、非零分母、一个饼图系列和一个配色颜色。

角度对 180 取模，所以完整比值会回到零，而不是停在末端。比值不验证，也不钳制。此样式替换坐标选项和系列呈现，并隐藏提示框内容。

位置参数顺序: `iconSize` → `pointerSize`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `iconSize` | `array` | `[10,20]` | 图标大小<br>支持简写 |
| `pointerSize` | `array` | `[5,10]` | 指针大小<br>支持简写 |

## `echarts.tooltip.itemTrigger`

<a id="entry-echarts-tooltip-itemtrigger"></a>

为单个数据项显示提示框。

将基本提示框辅助样式与 trigger=item 组合，保留限制在图表内等其他默认设置。

## `echarts.tooltip.tooltipFont`

<a id="entry-echarts-tooltip-tooltipfont"></a>

提示框字体

说明旧版提示框字体辅助函数及其当前限制。

该辅助函数将字体字段写入顶层的 字体.textStyle 对象，而非 tooltip.textStyle。

应使用 echarts.tooltip.textStyle 设置提示框字体。顶部图例数组的索引 2 也是同一旧版辅助函数的别名。

位置参数顺序: `style` → `weight` → `family` → `size`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `style` | `string` | `normal` | 样式 |
| `weight` | `string` | `normal` | 字重 |
| `family` | `string` | `sans-serif, Arial` | 字体族 |
| `size` | `number` | 运行时决定 (number) | 大小 |

## `echarts.axis.rotateAxisLabel`

<a id="entry-echarts-axis-rotateaxislabel"></a>

标识旧版坐标轴标签旋转辅助样式。

回调将其首个参数与 x/y 比较，但选项插件在该位置提供的是宿主元素。

不要承诺按位置参数指定的旋转行为。应在 echarts.axis.x.label 或 echarts.axis.y.label 上设置 rotate 参数。

## `echarts.bar.votageLevelColor`

<a id="entry-echarts-bar-votagelevelcolor"></a>

电压等级着色

根据类目名称为单个柱状系列着色。

仅在恰有一个系列时，将数据集行读为显式的 name/value 项，再从各项类目名称派生颜色，可选使用渐隐渐变。

需要带表头数据集，第一列为可解析的颜色名称或框架颜色标识，第二列为数值。

导出的拼写为 votageLevelColor。此样式不强制电压领域语义；多个系列时跳过转换。

位置参数顺序: `gradient`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `gradient` | `boolean` | `false` | 是否使用渐变<br>支持简写 |

## `echarts.bar.singleSwitchStyle`

<a id="entry-echarts-bar-singleswitchstyle"></a>

单系列类似开关的样式

在单个数值列后放置全高背景柱形。

表头不超过两列时，追加根据最大值计算的 bg 列，将第一个系列克隆到其后，使柱形重叠，并禁用背景提示框和强调状态。

提供包含一个数值列的带表头数据集，以及已有的第一个柱状系列。

就地修改数据集并追加系列；对数舍入公式假设最大值为正数。列数更多的数据集跳过背景转换。

位置参数顺序: `color` → `width` → `radius` → `bgColor`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `color` | `string` | `hsl(0,0%,100%)` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | `5` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `radius` | `array` | `[15,15,15,15]` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `bgColor` | `string` | `lightgray` | 背景颜色 |

## `echarts.title.subtitlePostion`

<a id="entry-echarts-title-subtitlepostion"></a>

副标题位置

设置标题与副标题之间的间距。

写入 title.itemGap，默认值为 10。

导出的名称拼写为 subtitlePostion；它设置的是间距，而非副标题的独立坐标。

位置参数顺序: `itemGap`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `itemGap` | `number` | `10` | 间距 |

## `echarts.axis.shortenValueLabel`

<a id="entry-echarts-axis-shortenvaluelabel"></a>

以千为单位缩写第一个数值轴。

在 x、y、angle 和 radius 中找到第一个 value 轴；不小于 1000 的值四舍五入为整数千，并添加 K 后缀。

替换该轴的标签 formatter。负数和小于 1000 的值保持原样。

## `echarts.axis.x.line`

<a id="entry-echarts-axis-x-line"></a>

轴线配置

显示或装饰选定的坐标轴基线。

写入 axisLine 的可见性和端点符号属性，并提供 lineStyle 子样式设置线条。不控制网格分割线。

使用匹配的同级 tick 和 splitLine 分别控制刻度与分割线。

位置参数顺序: `show` → `symbol` → `size` → `offset`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `show` | `boolean` | `true` | 显示 |
| `symbol` | `string` | 未提供 | 标记图形<br>`{"optKey":"symbol"}` |
| `size` | `functionOrAny` | 未提供 | 标记图形大小<br>`{"optKey":"symbolSize"}` |
| `offset` | `array` | 未提供 | 标记图形偏移<br>`{"optKey":"symbolOffset"}` |

## `echarts.axis.x.tick`

<a id="entry-echarts-axis-x-tick"></a>

坐标轴刻度配置

控制选定坐标轴上的刻度。

写入可见性、刻度长度、自定义位置、interval、对齐和内侧位置；lineStyle 子样式控制刻度线条。

位置参数顺序: `length` → `customValues` → `alignWithLabel` → `interval` → `inside` → `show`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `length` | `number` | 未提供 | 刻度长度 |
| `customValues` | `array` | 未提供 | 自定义显示刻度的位置 |
| `alignWithLabel` | `boolean` | 未提供 | 刻度线与标签对齐 |
| `interval` | `number` | 未提供 | 刻度间隔 |
| `inside` | `boolean` | 未提供 | 刻度线是否朝内 |
| `show` | `boolean` | `true` | 显示 |

## `echarts.axis.y.line`

<a id="entry-echarts-axis-y-line"></a>

轴线配置

显示或装饰选定的坐标轴基线。

写入 axisLine 的可见性和端点符号属性，并提供 lineStyle 子样式设置线条。不控制网格分割线。

使用匹配的同级 tick 和 splitLine 分别控制刻度与分割线。

位置参数顺序: `show` → `symbol` → `size` → `offset`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `show` | `boolean` | `true` | 显示 |
| `symbol` | `string` | 未提供 | 标记图形<br>`{"optKey":"symbol"}` |
| `size` | `functionOrAny` | 未提供 | 标记图形大小<br>`{"optKey":"symbolSize"}` |
| `offset` | `array` | 未提供 | 标记图形偏移<br>`{"optKey":"symbolOffset"}` |

## `echarts.axis.y.tick`

<a id="entry-echarts-axis-y-tick"></a>

坐标轴刻度配置

控制选定坐标轴上的刻度。

写入可见性、刻度长度、自定义位置、interval、对齐和内侧位置；lineStyle 子样式控制刻度线条。

位置参数顺序: `length` → `customValues` → `alignWithLabel` → `interval` → `inside` → `show`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `length` | `number` | 未提供 | 刻度长度 |
| `customValues` | `array` | 未提供 | 自定义显示刻度的位置 |
| `alignWithLabel` | `boolean` | 未提供 | 刻度线与标签对齐 |
| `interval` | `number` | 未提供 | 刻度间隔 |
| `inside` | `boolean` | 未提供 | 刻度线是否朝内 |
| `show` | `boolean` | `true` | 显示 |

## `echarts.axis.x.label`

<a id="entry-echarts-axis-x-label"></a>

标签配置

配置选定的笛卡尔坐标轴或雷达轴上的刻度标签。

在标签格式基础上扩展 interval、边缘标签可见性、重叠处理和自定义值；写入对应的 axisLabel 所有者。

轴线和刻度使用同级的 line 和 tick；轴标题使用轴名称样式。

insideLabel 按原名传递；此辅助样式不将其映射为 inside。

位置参数顺序: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `interval` → `insideLabel` → `margin` → `showMinLabel` → `showMaxLabel` → `alignMinLabel` → `alignMaxLabel` → `hideOverlap` → `customValues`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `align` | `string` | 未提供 | 文字水平对齐 |
| `verticalAlign` | `string` | 未提供 | 文字垂直对齐 |
| `rotate` | `number` | 未提供 | 旋转角度 |
| `width` | `number` | 未提供 | 文本显示宽度 |
| `height` | `number` | 未提供 | 文本显示高度 |
| `rich` | `dictionary` | 未提供 | 富文本 |
| `lineHeight` | `number` | 未提供 | 行高 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `opacity` | `number` | 未提供 | 透明度 |
| `interval` | `number` | 未提供 | 标签间隔 |
| `insideLabel` | `boolean` | 未提供 | 标签是否朝内 |
| `margin` | `number` | 未提供 | 标签与轴线的距离 |
| `showMinLabel` | `boolean` | 未提供 | 是否显示最小标签 |
| `showMaxLabel` | `boolean` | 未提供 | 是否显示最大标签 |
| `alignMinLabel` | `string` | 未提供 | 最小刻度标签对齐方式 |
| `alignMaxLabel` | `string` | 未提供 | 最大刻度标签对齐方式 |
| `hideOverlap` | `boolean` | 未提供 | 是否隐藏重叠的标签 |
| `customValues` | `array` | 未提供 | 自定义标签位置 |

## `echarts.axis.y.label`

<a id="entry-echarts-axis-y-label"></a>

标签配置

配置选定的笛卡尔坐标轴或雷达轴上的刻度标签。

在标签格式基础上扩展 interval、边缘标签可见性、重叠处理和自定义值；写入对应的 axisLabel 所有者。

轴线和刻度使用同级的 line 和 tick；轴标题使用轴名称样式。

insideLabel 按原名传递；此辅助样式不将其映射为 inside。

位置参数顺序: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `interval` → `insideLabel` → `margin` → `showMinLabel` → `showMaxLabel` → `alignMinLabel` → `alignMaxLabel` → `hideOverlap` → `customValues`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `align` | `string` | 未提供 | 文字水平对齐 |
| `verticalAlign` | `string` | 未提供 | 文字垂直对齐 |
| `rotate` | `number` | 未提供 | 旋转角度 |
| `width` | `number` | 未提供 | 文本显示宽度 |
| `height` | `number` | 未提供 | 文本显示高度 |
| `rich` | `dictionary` | 未提供 | 富文本 |
| `lineHeight` | `number` | 未提供 | 行高 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `opacity` | `number` | 未提供 | 透明度 |
| `interval` | `number` | 未提供 | 标签间隔 |
| `insideLabel` | `boolean` | 未提供 | 标签是否朝内 |
| `margin` | `number` | 未提供 | 标签与轴线的距离 |
| `showMinLabel` | `boolean` | 未提供 | 是否显示最小标签 |
| `showMaxLabel` | `boolean` | 未提供 | 是否显示最大标签 |
| `alignMinLabel` | `string` | 未提供 | 最小刻度标签对齐方式 |
| `alignMaxLabel` | `string` | 未提供 | 最大刻度标签对齐方式 |
| `hideOverlap` | `boolean` | 未提供 | 是否隐藏重叠的标签 |
| `customValues` | `array` | 未提供 | 自定义标签位置 |

## `echarts.bar.bg.border`

<a id="entry-echarts-bar-bg-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.bar.bg.shadow`

<a id="entry-echarts-bar-bg-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.x.pointer`

<a id="entry-echarts-axis-x-pointer"></a>

坐标轴指示器配置项

配置提示框或坐标轴指示器。

写入对应的 axisPointer 选项，并提供 label、lineStyle、shadowStyle 和 handle 子样式。

提示框拥有的指示器行为使用 tooltip.pointer；单个轴使用 x/y.pointer。指示器类型在父级选择。

位置参数顺序: `type` → `snap` → `z` → `triggerEmphasis` → `triggerTooltip` → `value` → `status` → `show`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `type` | `string` | 未提供 | 类型 |
| `snap` | `boolean` | 未提供 | 是否自动吸附 |
| `z` | `number` | 未提供 | 层级 |
| `triggerEmphasis` | `boolean` | 未提供 | 是否触发高亮 |
| `triggerTooltip` | `boolean` | 未提供 | 是否触发提示框 |
| `value` | `string` | 未提供 | handle 默认值 |
| `status` | `string` | 未提供 | 指示器状态 |
| `show` | `boolean` | `true` | 显示 |

## `echarts.axis.y.pointer`

<a id="entry-echarts-axis-y-pointer"></a>

坐标轴指示器配置项

配置提示框或坐标轴指示器。

写入对应的 axisPointer 选项，并提供 label、lineStyle、shadowStyle 和 handle 子样式。

提示框拥有的指示器行为使用 tooltip.pointer；单个轴使用 x/y.pointer。指示器类型在父级选择。

位置参数顺序: `type` → `snap` → `z` → `triggerEmphasis` → `triggerTooltip` → `value` → `status` → `show`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `type` | `string` | 未提供 | 类型 |
| `snap` | `boolean` | 未提供 | 是否自动吸附 |
| `z` | `number` | 未提供 | 层级 |
| `triggerEmphasis` | `boolean` | 未提供 | 是否触发高亮 |
| `triggerTooltip` | `boolean` | 未提供 | 是否触发提示框 |
| `value` | `string` | 未提供 | handle 默认值 |
| `status` | `string` | 未提供 | 指示器状态 |
| `show` | `boolean` | `true` | 显示 |

## `echarts.bar.hover.label`

<a id="entry-echarts-bar-hover-label"></a>

标签配置

定位并格式化系列或强调状态标签。

在通用标签格式上扩展 distance、offset、最小边距和 position，再写入选定的系列或强调状态 label 所有者。

强调状态启用使用父级 hover 样式；仅当输出的嵌套 textStyle 结构适配目标 ECharts 版本时，使用 label.textStyle。

位置参数顺序: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `distance` → `offset` → `minMargin` → `position`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `align` | `string` | 未提供 | 文字水平对齐 |
| `verticalAlign` | `string` | 未提供 | 文字垂直对齐 |
| `rotate` | `number` | 未提供 | 旋转角度 |
| `width` | `number` | 未提供 | 文本显示宽度 |
| `height` | `number` | 未提供 | 文本显示高度 |
| `rich` | `dictionary` | 未提供 | 富文本 |
| `lineHeight` | `number` | 未提供 | 行高 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `opacity` | `number` | 未提供 | 透明度 |
| `distance` | `number` | 未提供 | 文本与图形的距离 |
| `offset` | `array` | 未提供 | 文本偏移 |
| `minMargin` | `number` | 未提供 | 标签最小边距 |
| `position` | `arrayOrString` | 未提供 | 位置 |

## `echarts.geo.hover.label`

<a id="entry-echarts-geo-hover-label"></a>

标签配置

定位并格式化系列或强调状态标签。

在通用标签格式上扩展 distance、offset、最小边距和 position，再写入选定的系列或强调状态 label 所有者。

强调状态启用使用父级 hover 样式；仅当输出的嵌套 textStyle 结构适配目标 ECharts 版本时，使用 label.textStyle。

位置参数顺序: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `distance` → `offset` → `minMargin` → `position`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `align` | `string` | 未提供 | 文字水平对齐 |
| `verticalAlign` | `string` | 未提供 | 文字垂直对齐 |
| `rotate` | `number` | 未提供 | 旋转角度 |
| `width` | `number` | 未提供 | 文本显示宽度 |
| `height` | `number` | 未提供 | 文本显示高度 |
| `rich` | `dictionary` | 未提供 | 富文本 |
| `lineHeight` | `number` | 未提供 | 行高 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `opacity` | `number` | 未提供 | 透明度 |
| `distance` | `number` | 未提供 | 文本与图形的距离 |
| `offset` | `array` | 未提供 | 文本偏移 |
| `minMargin` | `number` | 未提供 | 标签最小边距 |
| `position` | `arrayOrString` | 未提供 | 位置 |

## `echarts.line.markLine.x`

<a id="entry-echarts-line-markline-x"></a>

X 轴标线

在 x 轴值处添加参考线。

写入一个含 xAxis 及可选 yValue/标题元数据的 markLine 项，再根据这些值格式化标签。

y 是标签元数据，不是第二个端点。由于 formatter 使用真值检查，零值 y 不加入额外标签文本。

位置参数顺序: `x` → `y` → `cap` → `position` → `rotate`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `x` | `string` | X 值 |
| `y` | `number` | Y 值 |
| `cap` | `string` | 额外文本描述 |
| `position` | `arrayOrString` | 位置 |
| `rotate` | `number` | 旋转角度 |

## `echarts.line.markLine.y`

<a id="entry-echarts-line-markline-y"></a>

Y 轴标线

在 y 轴值处添加参考线。

写入一个含 yAxis 及可选标题元数据的 markLine 项，再根据值和标题格式化标签。

位置参数顺序: `y` → `cap` → `position` → `rotate`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `y` | `number` | Y 值 |
| `cap` | `string` | 额外文本描述 |
| `position` | `arrayOrString` | 位置 |
| `rotate` | `number` | 旋转角度 |

## `echarts.pie.hover.label`

<a id="entry-echarts-pie-hover-label"></a>

标签配置

定位并格式化系列或强调状态标签。

在通用标签格式上扩展 distance、offset、最小边距和 position，再写入选定的系列或强调状态 label 所有者。

强调状态启用使用父级 hover 样式；仅当输出的嵌套 textStyle 结构适配目标 ECharts 版本时，使用 label.textStyle。

位置参数顺序: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `distance` → `offset` → `minMargin` → `position`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `align` | `string` | 未提供 | 文字水平对齐 |
| `verticalAlign` | `string` | 未提供 | 文字垂直对齐 |
| `rotate` | `number` | 未提供 | 旋转角度 |
| `width` | `number` | 未提供 | 文本显示宽度 |
| `height` | `number` | 未提供 | 文本显示高度 |
| `rich` | `dictionary` | 未提供 | 富文本 |
| `lineHeight` | `number` | 未提供 | 行高 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `opacity` | `number` | 未提供 | 透明度 |
| `distance` | `number` | 未提供 | 文本与图形的距离 |
| `offset` | `array` | 未提供 | 文本偏移 |
| `minMargin` | `number` | 未提供 | 标签最小边距 |
| `position` | `arrayOrString` | 未提供 | 位置 |

## `echarts.axis.x.nameStyle`

<a id="entry-echarts-axis-x-namestyle"></a>

轴名称样式

为轴名称盒设置样式。

将对齐、尺寸、行高、背景、透明度和内边距写入选定轴的 nameTextStyle。字体、边框和阴影子样式作用于同一所有者。

在 echarts.axis.x 或 y 上设置轴名称；此子样式不提供标题文本。

位置参数顺序: `align` → `verticalAlign` → `width` → `height` → `lineHeight` → `backgroundColor` → `opacity` → `padding`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `align` | `string` | 文字水平对齐 |
| `verticalAlign` | `string` | 文字垂直对齐 |
| `width` | `number` | 文本显示宽度 |
| `height` | `number` | 文本显示高度 |
| `lineHeight` | `number` | 行高 |
| `backgroundColor` | `functionOrString` | 背景色 |
| `opacity` | `number` | 透明度 |
| `padding` | `array` | 内边距 |

## `echarts.axis.x.splitArea`

<a id="entry-echarts-axis-x-splitarea"></a>

分割区域样式

在一个笛卡尔坐标轴上显示分割区域带。

写入选定轴 splitArea 的可见性和 interval；areaStyle 子样式控制填充。

同时需要填充区域带和边界时，与 splitLine 组合。

位置参数顺序: `show` → `interval`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `show` | `boolean` | `true` | 显示 |
| `interval` | `number` | 未提供 | 分割区域显示间隔 |

## `echarts.axis.x.splitLine`

<a id="entry-echarts-axis-x-splitline"></a>

分割线

在一个笛卡尔坐标轴上显示网格分割线。

写入选定轴 splitLine 的可见性和 interval；lineStyle 子样式控制线条。

坐标轴基线使用 axis.line，而非网格线。

位置参数顺序: `show` → `interval`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `show` | `boolean` | `true` | 显示 |
| `interval` | `number` | 未提供 | 分割线显示间隔 |

## `echarts.axis.y.nameStyle`

<a id="entry-echarts-axis-y-namestyle"></a>

轴名称样式

为轴名称盒设置样式。

将对齐、尺寸、行高、背景、透明度和内边距写入选定轴的 nameTextStyle。字体、边框和阴影子样式作用于同一所有者。

在 echarts.axis.x 或 y 上设置轴名称；此子样式不提供标题文本。

位置参数顺序: `align` → `verticalAlign` → `width` → `height` → `lineHeight` → `backgroundColor` → `opacity` → `padding`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `align` | `string` | 文字水平对齐 |
| `verticalAlign` | `string` | 文字垂直对齐 |
| `width` | `number` | 文本显示宽度 |
| `height` | `number` | 文本显示高度 |
| `lineHeight` | `number` | 行高 |
| `backgroundColor` | `functionOrString` | 背景色 |
| `opacity` | `number` | 透明度 |
| `padding` | `array` | 内边距 |

## `echarts.axis.y.splitArea`

<a id="entry-echarts-axis-y-splitarea"></a>

分割区域样式

在一个笛卡尔坐标轴上显示分割区域带。

写入选定轴 splitArea 的可见性和 interval；areaStyle 子样式控制填充。

同时需要填充区域带和边界时，与 splitLine 组合。

位置参数顺序: `show` → `interval`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `show` | `boolean` | `true` | 显示 |
| `interval` | `number` | 未提供 | 分割区域显示间隔 |

## `echarts.axis.y.splitLine`

<a id="entry-echarts-axis-y-splitline"></a>

分割线

在一个笛卡尔坐标轴上显示网格分割线。

写入选定轴 splitLine 的可见性和 interval；lineStyle 子样式控制线条。

坐标轴基线使用 axis.line，而非网格线。

位置参数顺序: `show` → `interval`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `show` | `boolean` | `true` | 显示 |
| `interval` | `number` | 未提供 | 分割线显示间隔 |

## `echarts.bar.label.border`

<a id="entry-echarts-bar-label-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.bar.label.shadow`

<a id="entry-echarts-bar-label-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.geo.label.border`

<a id="entry-echarts-geo-label-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.geo.label.shadow`

<a id="entry-echarts-geo-label-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.line.hover.label`

<a id="entry-echarts-line-hover-label"></a>

标签配置

定位并格式化系列或强调状态标签。

在通用标签格式上扩展 distance、offset、最小边距和 position，再写入选定的系列或强调状态 label 所有者。

强调状态启用使用父级 hover 样式；仅当输出的嵌套 textStyle 结构适配目标 ECharts 版本时，使用 label.textStyle。

位置参数顺序: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `distance` → `offset` → `minMargin` → `position`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `align` | `string` | 未提供 | 文字水平对齐 |
| `verticalAlign` | `string` | 未提供 | 文字垂直对齐 |
| `rotate` | `number` | 未提供 | 旋转角度 |
| `width` | `number` | 未提供 | 文本显示宽度 |
| `height` | `number` | 未提供 | 文本显示高度 |
| `rich` | `dictionary` | 未提供 | 富文本 |
| `lineHeight` | `number` | 未提供 | 行高 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `opacity` | `number` | 未提供 | 透明度 |
| `distance` | `number` | 未提供 | 文本与图形的距离 |
| `offset` | `array` | 未提供 | 文本偏移 |
| `minMargin` | `number` | 未提供 | 标签最小边距 |
| `position` | `arrayOrString` | 未提供 | 位置 |

## `echarts.pie.label.border`

<a id="entry-echarts-pie-label-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.pie.label.shadow`

<a id="entry-echarts-pie-label-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.line.label.border`

<a id="entry-echarts-line-label-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.line.label.shadow`

<a id="entry-echarts-line-label-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.line.markLine.avg`

<a id="entry-echarts-line-markline-avg"></a>

添加平均值参考线。

将 markLine data 设为具名平均值标注，将标签格式化为名称和值；position 和 rotation 配置标签。

实现中固定了标注名称；自定义名称或多个参考值使用 markLine.data。

位置参数顺序: `position` → `rotate`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `position` | `arrayOrString` | 位置 |
| `rotate` | `number` | 旋转角度 |

## `echarts.line.markPoint.max`

<a id="entry-echarts-line-markpoint-max"></a>

最大值

标记系列最大值。

写入一个 type 为 max、名称固定的 markPoint 项，符号及符号尺寸可配置。

位置参数顺序: `symbol` → `size`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `symbol` | `string` | 标记图形<br>支持简写<br>`{"optKey":"symbol"}` |
| `size` | `functionOrAny` | 标记图形大小<br>`{"optKey":"symbolSize"}` |

## `echarts.line.markPoint.min`

<a id="entry-echarts-line-markpoint-min"></a>

最小值

标记系列最小值。

写入一个 type 为 min、名称固定的 markPoint 项，符号及符号尺寸可配置。

位置参数顺序: `symbol` → `size`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `symbol` | `string` | 标记图形<br>支持简写<br>`{"optKey":"symbol"}` |
| `size` | `functionOrAny` | 标记图形大小<br>`{"optKey":"symbolSize"}` |

## `echarts.Radar.label.border`

<a id="entry-echarts-radar-label-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.Radar.label.shadow`

<a id="entry-echarts-radar-label-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.stripy.vertial`

<a id="entry-echarts-axis-stripy-vertial"></a>

垂直斑马纹

为笛卡尔图表添加垂直背景区域带。

隐藏 y 轴分割线，并以 interval 为零启用 xAxis.splitArea。

导出的拼写为 vertial。此样式不单独设置 x 轴刻度或基线的可见性。

## `echarts.bar.hover.itemStyle`

<a id="entry-echarts-bar-hover-itemstyle"></a>

图形样式

设置选定图表项、地图区域、图例标记或强调状态项的样式。

将 color 和 opacity 写入路径选定的 itemStyle，并为同一所有者提供 border 和 shadow 子样式。

常规状态与强调状态需选择完整路径。系列项样式与 geo 或 calendar 样式作用于不同所有者。

位置参数顺序: `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.bar.label.textStyle`

<a id="entry-echarts-bar-label-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.geo.hover.itemStyle`

<a id="entry-echarts-geo-hover-itemstyle"></a>

图形样式

设置选定图表项、地图区域、图例标记或强调状态项的样式。

将 color 和 opacity 写入路径选定的 itemStyle，并为同一所有者提供 border 和 shadow 子样式。

常规状态与强调状态需选择完整路径。系列项样式与 geo 或 calendar 样式作用于不同所有者。

位置参数顺序: `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.geo.label.textStyle`

<a id="entry-echarts-geo-label-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.line.markLine.hover`

<a id="entry-echarts-line-markline-hover"></a>

高亮效果

配置选定系列、标注或 geo 所有者的强调状态。

写入路径选定的 emphasis 选项，并提供 label 和 itemStyle 子样式；折线系列变体还提供 emphasis lineStyle 子样式。

focused 按原名输出为 focused，不映射为 focus。不要仅凭该参数承诺 ECharts 聚焦行为。

位置参数顺序: `disabled` → `focused` → `blurScope`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `focused` | `string` | 未提供 | 聚焦效果<br>选项: `none`, `self`, `series` |
| `blurScope` | `string` | 未提供 | 淡出范围 |

## `echarts.line.markLine.label`

<a id="entry-echarts-line-markline-label"></a>

标签配置

格式化标注线或标注点标签。

按选定标注写入常规标签格式、distance 和 position，并提供 border、shadow 和字体子样式。

位置参数顺序: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `distance` → `position`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `align` | `string` | 未提供 | 文字水平对齐 |
| `verticalAlign` | `string` | 未提供 | 文字垂直对齐 |
| `rotate` | `number` | 未提供 | 旋转角度 |
| `width` | `number` | 未提供 | 文本显示宽度 |
| `height` | `number` | 未提供 | 文本显示高度 |
| `rich` | `dictionary` | 未提供 | 富文本 |
| `lineHeight` | `number` | 未提供 | 行高 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `opacity` | `number` | 未提供 | 透明度 |
| `distance` | `number` | 未提供 | 文本与图形的距离 |
| `position` | `arrayOrString` | 未提供 | 位置 |

## `echarts.pie.hover.itemStyle`

<a id="entry-echarts-pie-hover-itemstyle"></a>

图形样式

设置选定图表项、地图区域、图例标记或强调状态项的样式。

将 color 和 opacity 写入路径选定的 itemStyle，并为同一所有者提供 border 和 shadow 子样式。

常规状态与强调状态需选择完整路径。系列项样式与 geo 或 calendar 样式作用于不同所有者。

位置参数顺序: `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.pie.label.textStyle`

<a id="entry-echarts-pie-label-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.bar.itemStyle.border`

<a id="entry-echarts-bar-itemstyle-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.bar.itemStyle.shadow`

<a id="entry-echarts-bar-itemstyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.geo.itemStyle.border`

<a id="entry-echarts-geo-itemstyle-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.geo.itemStyle.shadow`

<a id="entry-echarts-geo-itemstyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.line.hover.itemStyle`

<a id="entry-echarts-line-hover-itemstyle"></a>

图形样式

设置选定图表项、地图区域、图例标记或强调状态项的样式。

将 color 和 opacity 写入路径选定的 itemStyle，并为同一所有者提供 border 和 shadow 子样式。

常规状态与强调状态需选择完整路径。系列项样式与 geo 或 calendar 样式作用于不同所有者。

位置参数顺序: `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.line.hover.lineStyle`

<a id="entry-echarts-line-hover-linestyle"></a>

线样式

为已有图表、轴线、刻度、指示器或分割线设置线条样式。

在路径选定的 lineStyle 所有者上写入线条颜色、宽度、虚线模式、端点、连接点和透明度；提供 shadow 子样式。echarts.line.lineStyle 提供虚线默认值。

此样式不启用被隐藏的父级线条，也不创建数据。系列线、强调状态线和坐标系线仍有不同的所有者。

位置参数顺序: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `width` | `number` | 线宽 |
| `type` | `string` | 线类型 |
| `dashOffset` | `number` | 虚线偏移 |
| `cap` | `string` | 线端点类型 |
| `join` | `string` | 线连接类型 |
| `miterLimit` | `number` | 斜接面限制比例 |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.line.label.textStyle`

<a id="entry-echarts-line-label-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.line.markPoint.hover`

<a id="entry-echarts-line-markpoint-hover"></a>

高亮效果

配置选定系列、标注或 geo 所有者的强调状态。

写入路径选定的 emphasis 选项，并提供 label 和 itemStyle 子样式；折线系列变体还提供 emphasis lineStyle 子样式。

focused 按原名输出为 focused，不映射为 focus。不要仅凭该参数承诺 ECharts 聚焦行为。

位置参数顺序: `disabled` → `focused` → `blurScope`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `focused` | `string` | 未提供 | 聚焦效果<br>选项: `none`, `self`, `series` |
| `blurScope` | `string` | 未提供 | 淡出范围 |

## `echarts.line.markPoint.label`

<a id="entry-echarts-line-markpoint-label"></a>

标签配置

格式化标注线或标注点标签。

按选定标注写入常规标签格式、distance 和 position，并提供 border、shadow 和字体子样式。

位置参数顺序: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `distance` → `position`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `align` | `string` | 未提供 | 文字水平对齐 |
| `verticalAlign` | `string` | 未提供 | 文字垂直对齐 |
| `rotate` | `number` | 未提供 | 旋转角度 |
| `width` | `number` | 未提供 | 文本显示宽度 |
| `height` | `number` | 未提供 | 文本显示高度 |
| `rich` | `dictionary` | 未提供 | 富文本 |
| `lineHeight` | `number` | 未提供 | 行高 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `opacity` | `number` | 未提供 | 透明度 |
| `distance` | `number` | 未提供 | 文本与图形的距离 |
| `position` | `arrayOrString` | 未提供 | 位置 |

## `echarts.pie.itemStyle.border`

<a id="entry-echarts-pie-itemstyle-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.pie.itemStyle.shadow`

<a id="entry-echarts-pie-itemstyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.Radar.line.lineStyle`

<a id="entry-echarts-radar-line-linestyle"></a>

线样式

为已有图表、轴线、刻度、指示器或分割线设置线条样式。

在路径选定的 lineStyle 所有者上写入线条颜色、宽度、虚线模式、端点、连接点和透明度；提供 shadow 子样式。echarts.line.lineStyle 提供虚线默认值。

此样式不启用被隐藏的父级线条，也不创建数据。系列线、强调状态线和坐标系线仍有不同的所有者。

位置参数顺序: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `width` | `number` | 线宽 |
| `type` | `string` | 线类型 |
| `dashOffset` | `number` | 虚线偏移 |
| `cap` | `string` | 线端点类型 |
| `join` | `string` | 线连接类型 |
| `miterLimit` | `number` | 斜接面限制比例 |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.Radar.tick.lineStyle`

<a id="entry-echarts-radar-tick-linestyle"></a>

线样式

为已有图表、轴线、刻度、指示器或分割线设置线条样式。

在路径选定的 lineStyle 所有者上写入线条颜色、宽度、虚线模式、端点、连接点和透明度；提供 shadow 子样式。echarts.line.lineStyle 提供虚线默认值。

此样式不启用被隐藏的父级线条，也不创建数据。系列线、强调状态线和坐标系线仍有不同的所有者。

位置参数顺序: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `width` | `number` | 线宽 |
| `type` | `string` | 线类型 |
| `dashOffset` | `number` | 虚线偏移 |
| `cap` | `string` | 线端点类型 |
| `join` | `string` | 线连接类型 |
| `miterLimit` | `number` | 斜接面限制比例 |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.line.areaStyle.shadow`

<a id="entry-echarts-line-areastyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.line.itemStyle.border`

<a id="entry-echarts-line-itemstyle-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.line.itemStyle.shadow`

<a id="entry-echarts-line-itemstyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.line.lineStyle.shadow`

<a id="entry-echarts-line-linestyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.Radar.axisName.border`

<a id="entry-echarts-radar-axisname-border"></a>

边框

为轴名称周围的盒绘制边框。

根据所选路径，将边框参数映射到 radar.axisName 或 xAxis/yAxis.nameTextStyle。此变体省略 cap、join 和斜接限制控件。

文字描边使用 textStyle.stroke 子样式，而不是名称外围盒的边框。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |

## `echarts.Radar.axisName.shadow`

<a id="entry-echarts-radar-axisname-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.Radar.label.textStyle`

<a id="entry-echarts-radar-label-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.tooltip.pointer.label`

<a id="entry-echarts-tooltip-pointer-label"></a>

标签配置

格式化指示器附带的值标签。

写入指示器 label，在常规标签选项上扩展 precision 和 margin。border、shadow 和 textStyle 是独立的子样式。

位置参数顺序: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `precision` → `margin`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `align` | `string` | 未提供 | 文字水平对齐 |
| `verticalAlign` | `string` | 未提供 | 文字垂直对齐 |
| `rotate` | `number` | 未提供 | 旋转角度 |
| `width` | `number` | 未提供 | 文本显示宽度 |
| `height` | `number` | 未提供 | 文本显示高度 |
| `rich` | `dictionary` | 未提供 | 富文本 |
| `lineHeight` | `number` | 未提供 | 行高 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `opacity` | `number` | 未提供 | 透明度 |
| `precision` | `numberOrString` | 未提供 | 精度 |
| `margin` | `number` | 未提供 | 标签与轴线的距离 |

## `echarts.axis.stripy.horizontal`

<a id="entry-echarts-axis-stripy-horizontal"></a>

水平斑马纹

为笛卡尔图表添加水平背景区域带。

显示 y 轴刻度和基线，隐藏 y 分割线，在每个间隔启用 y splitArea；tickcolor 设置刻度线颜色。

位置参数顺序: `tickcolor`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `tickcolor` | `string` | 刻度线颜色 |

## `echarts.label.textStyle.shadow`

<a id="entry-echarts-label-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.label.textStyle.stroke`

<a id="entry-echarts-label-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.title.textStyle.shadow`

<a id="entry-echarts-title-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.title.textStyle.stroke`

<a id="entry-echarts-title-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.tooltip.pointer.handle`

<a id="entry-echarts-tooltip-pointer-handle"></a>

指示器手柄配置

配置可拖动指示器手柄的外观。

写入选定 axisPointer.handle 的可见性、icon、size、margin、throttle 和 color，并提供 shadow 子样式。

需要适用的坐标轴指示器；不提供图表数据或坐标系。

位置参数顺序: `icon` → `size` → `margin` → `throttle` → `show` → `color`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `icon` | `any` | 未提供 | 图标 |
| `size` | `number` | 未提供 | 图标大小 |
| `margin` | `number` | 未提供 | 手柄与轴的距离 |
| `throttle` | `number` | 未提供 | 视图更新间隔 |
| `show` | `boolean` | `true` | 显示 |
| `color` | `functionOrString` | 未提供 | 颜色 |

## `echarts.tooltip.pointer.shadow`

<a id="entry-echarts-tooltip-pointer-shadow"></a>

阴影

为 shadow 类型的指示器带设置样式。

将阴影字段写入选定的 axisPointer.shadowStyle 所有者。

指示器的 shadow 类型需另行选择；此辅助样式不设置带状填充颜色，也不启用指示器。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.legend.itemStyle.border`

<a id="entry-echarts-legend-itemstyle-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.legend.itemStyle.shadow`

<a id="entry-echarts-legend-itemstyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.legend.lineStyle.shadow`

<a id="entry-echarts-legend-linestyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.legend.textStyle.shadow`

<a id="entry-echarts-legend-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.legend.textStyle.stroke`

<a id="entry-echarts-legend-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.line.markLine.animation`

<a id="entry-echarts-line-markline-animation"></a>

动画

控制标注线或标注点的动画。

在选定标注所有者上写入动画启用状态、delay、duration 和 easing。

type 定义将 optKey 错拼为 optKet，因此 type 按原名输出，不转换为 animationType；不要承诺该映射。

位置参数顺序: `animation` → `delay` → `duration` → `type` → `easing`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `animation` | `boolean` | `true` | 开启动画<br>`{"optKey":"animation"}` |
| `delay` | `number` | 未提供 | 动画延迟<br>`{"optKey":"animationDelay"}` |
| `duration` | `number` | 未提供 | 动画时长<br>`{"optKey":"animationDuration"}` |
| `type` | `string` | 未提供 | 动画类型<br>选项: `expansion`, `scale` |
| `easing` | `string` | 未提供 | 动画缓动<br>选项: `linear`, `quadraticIn`, `quadraticOut`<br>`{"optKey":"animationEasing"}` |

## `echarts.line.markLine.lineStyle`

<a id="entry-echarts-line-markline-linestyle"></a>

线样式

设置 mark-line 参考线样式。

写入 markLine lineStyle，并用 curveness 扩展通用线条定义。

位置参数顺序: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity` → `curveness`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `width` | `number` | 线宽 |
| `type` | `string` | 线类型 |
| `dashOffset` | `number` | 虚线偏移 |
| `cap` | `string` | 线端点类型 |
| `join` | `string` | 线连接类型 |
| `miterLimit` | `number` | 斜接面限制比例 |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |
| `curveness` | `number` | 曲率 |

## `echarts.calendar.dayLabel.border`

<a id="entry-echarts-calendar-daylabel-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.calendar.dayLabel.shadow`

<a id="entry-echarts-calendar-daylabel-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.line.markPoint.animation`

<a id="entry-echarts-line-markpoint-animation"></a>

动画

控制标注线或标注点的动画。

在选定标注所有者上写入动画启用状态、delay、duration 和 easing。

type 定义将 optKey 错拼为 optKet，因此 type 按原名输出，不转换为 animationType；不要承诺该映射。

位置参数顺序: `animation` → `delay` → `duration` → `type` → `easing`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `animation` | `boolean` | `true` | 开启动画<br>`{"optKey":"animation"}` |
| `delay` | `number` | 未提供 | 动画延迟<br>`{"optKey":"animationDelay"}` |
| `duration` | `number` | 未提供 | 动画时长<br>`{"optKey":"animationDuration"}` |
| `type` | `string` | 未提供 | 动画类型<br>选项: `expansion`, `scale` |
| `easing` | `string` | 未提供 | 动画缓动<br>选项: `linear`, `quadraticIn`, `quadraticOut`<br>`{"optKey":"animationEasing"}` |

## `echarts.line.markPoint.itemStyle`

<a id="entry-echarts-line-markpoint-itemstyle"></a>

图形样式

设置选定图表项、地图区域、图例标记或强调状态项的样式。

将 color 和 opacity 写入路径选定的 itemStyle，并为同一所有者提供 border 和 shadow 子样式。

常规状态与强调状态需选择完整路径。系列项样式与 geo 或 calendar 样式作用于不同所有者。

位置参数顺序: `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.Radar.axisName.textStyle`

<a id="entry-echarts-radar-axisname-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.tooltip.textStyle.shadow`

<a id="entry-echarts-tooltip-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.tooltip.textStyle.stroke`

<a id="entry-echarts-tooltip-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.calendar.itemStyle.border`

<a id="entry-echarts-calendar-itemstyle-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.calendar.itemStyle.shadow`

<a id="entry-echarts-calendar-itemstyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.calendar.yearLabel.border`

<a id="entry-echarts-calendar-yearlabel-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.calendar.yearLabel.shadow`

<a id="entry-echarts-calendar-yearlabel-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.Radar.splitArea.areaStyle`

<a id="entry-echarts-radar-splitarea-areastyle"></a>

区域样式

设置坐标系分割区域的填充样式。

将填充颜色和透明度写入选定的 splitArea.areaStyle，并提供 shadow 子样式。

父级 splitArea 需另行启用；这是坐标系带状区域样式，不是系列区域填充。

位置参数顺序: `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.Radar.splitLine.lineStyle`

<a id="entry-echarts-radar-splitline-linestyle"></a>

线样式

为已有图表、轴线、刻度、指示器或分割线设置线条样式。

在路径选定的 lineStyle 所有者上写入线条颜色、宽度、虚线模式、端点、连接点和透明度；提供 shadow 子样式。echarts.line.lineStyle 提供虚线默认值。

此样式不启用被隐藏的父级线条，也不创建数据。系列线、强调状态线和坐标系线仍有不同的所有者。

位置参数顺序: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `width` | `number` | 线宽 |
| `type` | `string` | 线类型 |
| `dashOffset` | `number` | 虚线偏移 |
| `cap` | `string` | 线端点类型 |
| `join` | `string` | 线连接类型 |
| `miterLimit` | `number` | 斜接面限制比例 |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.title.subtextStyle.shadow`

<a id="entry-echarts-title-subtextstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.title.subtextStyle.stroke`

<a id="entry-echarts-title-subtextstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.tooltip.pointer.lineStyle`

<a id="entry-echarts-tooltip-pointer-linestyle"></a>

线样式

为已有图表、轴线、刻度、指示器或分割线设置线条样式。

在路径选定的 lineStyle 所有者上写入线条颜色、宽度、虚线模式、端点、连接点和透明度；提供 shadow 子样式。echarts.line.lineStyle 提供虚线默认值。

此样式不启用被隐藏的父级线条，也不创建数据。系列线、强调状态线和坐标系线仍有不同的所有者。

位置参数顺序: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `width` | `number` | 线宽 |
| `type` | `string` | 线类型 |
| `dashOffset` | `number` | 虚线偏移 |
| `cap` | `string` | 线端点类型 |
| `join` | `string` | 线连接类型 |
| `miterLimit` | `number` | 斜接面限制比例 |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.calendar.monthLabel.border`

<a id="entry-echarts-calendar-monthlabel-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.calendar.monthLabel.shadow`

<a id="entry-echarts-calendar-monthlabel-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.calendar.dayLabel.textStyle`

<a id="entry-echarts-calendar-daylabel-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.calendar.splitLine.lineStyle`

<a id="entry-echarts-calendar-splitline-linestyle"></a>

线样式

为已有图表、轴线、刻度、指示器或分割线设置线条样式。

在路径选定的 lineStyle 所有者上写入线条颜色、宽度、虚线模式、端点、连接点和透明度；提供 shadow 子样式。echarts.line.lineStyle 提供虚线默认值。

此样式不启用被隐藏的父级线条，也不创建数据。系列线、强调状态线和坐标系线仍有不同的所有者。

位置参数顺序: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `width` | `number` | 线宽 |
| `type` | `string` | 线类型 |
| `dashOffset` | `number` | 虚线偏移 |
| `cap` | `string` | 线端点类型 |
| `join` | `string` | 线连接类型 |
| `miterLimit` | `number` | 斜接面限制比例 |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.calendar.yearLabel.textStyle`

<a id="entry-echarts-calendar-yearlabel-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.calendar.monthLabel.textStyle`

<a id="entry-echarts-calendar-monthlabel-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.line.horizontalWithTopLegend.0`

<a id="entry-echarts-line-horizontalwithtoplegend-0"></a>

标题位置

在顶部居中的图表预设中放置标题。

此数组项为设置 top=top、left=center 的 title.position；仅改变标题位置。

优先使用具名 title.position 辅助样式，而非数字数组项路径。

位置参数顺序: `bottom` → `right` → `padding` → `top` → `left`.

| 参数 | 契约 |
| --- | --- |
| `bottom` | 捕获的标题底部位置。<br>此数组入口是预构建样式，捕获 bottom=auto 并写入 title.bottom。使用 echarts.title.position 的 bottom 参数定制它；该数字入口不是参数化工厂。 |
| `right` | 捕获的标题右侧位置。<br>此数组入口是预构建样式，捕获 right=auto 并写入 title.right。使用 echarts.title.position 的 right 参数定制它；该数字入口不是参数化工厂。 |
| `padding` | 捕获的标题内边距。<br>此数组入口是预构建样式，捕获 padding=[10, 0, 0, 0] 并写入 title.padding。使用 echarts.title.position 的 padding 参数定制它；该数字入口不是参数化工厂。 |
| `top` | 捕获的标题顶部位置。<br>此数组入口是预构建样式，捕获 top=top 并写入 title.top。使用 echarts.title.position 的 top 参数定制它；该数字入口不是参数化工厂。 |
| `left` | 捕获的标题左侧位置。<br>此数组入口是预构建样式，捕获 left=center 并写入 title.left。使用 echarts.title.position 的 left 参数定制它；该数字入口不是参数化工厂。 |

## `echarts.line.horizontalWithTopLegend.1`

<a id="entry-echarts-line-horizontalwithtoplegend-1"></a>

标题字体

通过旧版字体辅助函数设置标题字体样式。

将 fontStyle、fontWeight、fontFamily 和 fontSize 写入 title.textStyle。

位置参数顺序: `style` → `weight` → `family` → `size`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `style` | `string` | `normal` | 样式 |
| `weight` | `string` | `normal` | 字重 |
| `family` | `string` | `sans-serif, Arial` | 字体族 |
| `size` | `number` | 运行时决定 (number) | 大小 |

## `echarts.line.horizontalWithTopLegend.2`

<a id="entry-echarts-line-horizontalwithtoplegend-2"></a>

提示框字体

说明旧版提示框字体辅助函数及其当前限制。

该辅助函数将字体字段写入顶层的 字体.textStyle 对象，而非 tooltip.textStyle。

应使用 echarts.tooltip.textStyle 设置提示框字体。顶部图例数组的索引 2 也是同一旧版辅助函数的别名。

位置参数顺序: `style` → `weight` → `family` → `size`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `style` | `string` | `normal` | 样式 |
| `weight` | `string` | `normal` | 字重 |
| `family` | `string` | `sans-serif, Arial` | 字体族 |
| `size` | `number` | 运行时决定 (number) | 大小 |

## `echarts.line.horizontalWithTopLegend.3`

<a id="entry-echarts-line-horizontalwithtoplegend-3"></a>

将提示框位置限制在图表内。

写入 tooltip.confine=true，不改变其内容或触发方式。

## `echarts.line.horizontalWithTopLegend.4`

<a id="entry-echarts-line-horizontalwithtoplegend-4"></a>

位置

将图例放置在图表预设的顶部附近。

此数组项为 legend.position，top 为 15%，水平居中，水平内边距为 5。

优先使用具名 legend.position 辅助样式，而非数字数组项路径。

位置参数顺序: `bottom` → `right` → `top` → `left` → `padding`.

| 参数 | 契约 |
| --- | --- |
| `bottom` | 捕获的图例底部位置。<br>此数组入口是预构建样式，捕获 bottom=auto 并写入 legend.bottom。使用 echarts.legend.position 的 bottom 参数定制它；该数字入口不是参数化工厂。 |
| `right` | 捕获的图例右侧位置。<br>此数组入口是预构建样式，捕获 right=auto 并写入 legend.right。使用 echarts.legend.position 的 right 参数定制它；该数字入口不是参数化工厂。 |
| `top` | 捕获的图例顶部位置。<br>此数组入口是预构建样式，捕获 top=15% 并写入 legend.top。使用 echarts.legend.position 的 top 参数定制它；该数字入口不是参数化工厂。 |
| `left` | 捕获的图例左侧位置。<br>此数组入口是预构建样式，捕获 left=center 并写入 legend.left。使用 echarts.legend.position 的 left 参数定制它；该数字入口不是参数化工厂。 |
| `padding` | 捕获的图例内边距。<br>此数组入口是预构建样式，捕获 padding=[0, 5, 0, 5] 并写入 legend.padding。使用 echarts.legend.position 的 padding 参数定制它；该数字入口不是参数化工厂。 |

## `echarts.line.horizontalWithTopLegend.5`

<a id="entry-echarts-line-horizontalwithtoplegend-5"></a>

图例字体

使用旧版字体辅助样式设置图例字体。

将 fontStyle、fontWeight、fontFamily 和 fontSize 写入 legend.textStyle。

位置参数顺序: `style` → `weight` → `family` → `size`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `style` | `string` | `normal` | 样式 |
| `weight` | `string` | `normal` | 字重 |
| `family` | `string` | `sans-serif, Arial` | 字体族 |
| `size` | `number` | 运行时决定 (number) | 大小 |

## `echarts.line.horizontalWithTopLegend.6`

<a id="entry-echarts-line-horizontalwithtoplegend-6"></a>

X 轴标签字体

设置顶部图例预设中的 x 轴字体。

此数组项以 size 为 10 应用 axis.xLabelFont。

优先使用具名 x 轴字体辅助样式，而非数字数组项路径。

位置参数顺序: `style` → `weight` → `family` → `size`.

| 参数 | 契约 |
| --- | --- |
| `style` | 捕获的 x 轴标签字体样式。<br>此预构建样式捕获 style=normal 并写入 xAxis.axisLabel.fontStyle。使用 echarts.axis.xLabelFont 的 style 参数定制它；该数字入口不是参数化工厂。 |
| `weight` | 捕获的 x 轴标签字重。<br>此预构建样式捕获 weight=normal 并写入 xAxis.axisLabel.fontWeight。使用 echarts.axis.xLabelFont 的 weight 参数定制它；该数字入口不是参数化工厂。 |
| `family` | 捕获的 x 轴标签字体族。<br>此预构建样式捕获 family=sans-serif, Arial 并写入 xAxis.axisLabel.fontFamily。使用 echarts.axis.xLabelFont 的 family 参数定制它；该数字入口不是参数化工厂。 |
| `size` | 捕获的 x 轴标签字号。<br>此预构建样式捕获 size=10 并写入 xAxis.axisLabel.fontSize。使用 echarts.axis.xLabelFont 的 size 参数定制它；该数字入口不是参数化工厂。 |

## `echarts.line.horizontalWithTopLegend.7`

<a id="entry-echarts-line-horizontalwithtoplegend-7"></a>

Y 轴标签字体

设置顶部图例预设中的 y 轴字体。

此数组项以 size 为 10 应用 axis.yLabelFont。

优先使用具名 y 轴字体辅助样式，而非数字数组项路径。

位置参数顺序: `style` → `weight` → `family` → `size`.

| 参数 | 契约 |
| --- | --- |
| `style` | 捕获的 y 轴标签字体样式。<br>此预构建样式捕获 style=normal 并写入 yAxis.axisLabel.fontStyle。使用 echarts.axis.yLabelFont 的 style 参数定制它；该数字入口不是参数化工厂。 |
| `weight` | 捕获的 y 轴标签字重。<br>此预构建样式捕获 weight=normal 并写入 yAxis.axisLabel.fontWeight。使用 echarts.axis.yLabelFont 的 weight 参数定制它；该数字入口不是参数化工厂。 |
| `family` | 捕获的 y 轴标签字体族。<br>此预构建样式捕获 family=sans-serif, Arial 并写入 yAxis.axisLabel.fontFamily。使用 echarts.axis.yLabelFont 的 family 参数定制它；该数字入口不是参数化工厂。 |
| `size` | 捕获的 y 轴标签字号。<br>此预构建样式捕获 size=10 并写入 yAxis.axisLabel.fontSize。使用 echarts.axis.yLabelFont 的 size 参数定制它；该数字入口不是参数化工厂。 |

## `echarts.axis.x.label.border`

<a id="entry-echarts-axis-x-label-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.axis.x.label.shadow`

<a id="entry-echarts-axis-x-label-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.y.label.border`

<a id="entry-echarts-axis-y-label-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.axis.y.label.shadow`

<a id="entry-echarts-axis-y-label-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.x.pointer.label`

<a id="entry-echarts-axis-x-pointer-label"></a>

标签配置

格式化指示器附带的值标签。

写入指示器 label，在常规标签选项上扩展 precision 和 margin。border、shadow 和 textStyle 是独立的子样式。

位置参数顺序: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `precision` → `margin`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `align` | `string` | 未提供 | 文字水平对齐 |
| `verticalAlign` | `string` | 未提供 | 文字垂直对齐 |
| `rotate` | `number` | 未提供 | 旋转角度 |
| `width` | `number` | 未提供 | 文本显示宽度 |
| `height` | `number` | 未提供 | 文本显示高度 |
| `rich` | `dictionary` | 未提供 | 富文本 |
| `lineHeight` | `number` | 未提供 | 行高 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `opacity` | `number` | 未提供 | 透明度 |
| `precision` | `numberOrString` | 未提供 | 精度 |
| `margin` | `number` | 未提供 | 标签与轴线的距离 |

## `echarts.axis.y.pointer.label`

<a id="entry-echarts-axis-y-pointer-label"></a>

标签配置

格式化指示器附带的值标签。

写入指示器 label，在常规标签选项上扩展 precision 和 margin。border、shadow 和 textStyle 是独立的子样式。

位置参数顺序: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `precision` → `margin`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `align` | `string` | 未提供 | 文字水平对齐 |
| `verticalAlign` | `string` | 未提供 | 文字垂直对齐 |
| `rotate` | `number` | 未提供 | 旋转角度 |
| `width` | `number` | 未提供 | 文本显示宽度 |
| `height` | `number` | 未提供 | 文本显示高度 |
| `rich` | `dictionary` | 未提供 | 富文本 |
| `lineHeight` | `number` | 未提供 | 行高 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `opacity` | `number` | 未提供 | 透明度 |
| `precision` | `numberOrString` | 未提供 | 精度 |
| `margin` | `number` | 未提供 | 标签与轴线的距离 |

## `echarts.axis.x.line.lineStyle`

<a id="entry-echarts-axis-x-line-linestyle"></a>

线样式

为已有图表、轴线、刻度、指示器或分割线设置线条样式。

在路径选定的 lineStyle 所有者上写入线条颜色、宽度、虚线模式、端点、连接点和透明度；提供 shadow 子样式。echarts.line.lineStyle 提供虚线默认值。

此样式不启用被隐藏的父级线条，也不创建数据。系列线、强调状态线和坐标系线仍有不同的所有者。

位置参数顺序: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `width` | `number` | 线宽 |
| `type` | `string` | 线类型 |
| `dashOffset` | `number` | 虚线偏移 |
| `cap` | `string` | 线端点类型 |
| `join` | `string` | 线连接类型 |
| `miterLimit` | `number` | 斜接面限制比例 |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.axis.x.pointer.handle`

<a id="entry-echarts-axis-x-pointer-handle"></a>

指示器手柄配置

配置可拖动指示器手柄的外观。

写入选定 axisPointer.handle 的可见性、icon、size、margin、throttle 和 color，并提供 shadow 子样式。

需要适用的坐标轴指示器；不提供图表数据或坐标系。

位置参数顺序: `icon` → `size` → `margin` → `throttle` → `show` → `color`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `icon` | `any` | 未提供 | 图标 |
| `size` | `number` | 未提供 | 图标大小 |
| `margin` | `number` | 未提供 | 手柄与轴的距离 |
| `throttle` | `number` | 未提供 | 视图更新间隔 |
| `show` | `boolean` | `true` | 显示 |
| `color` | `functionOrString` | 未提供 | 颜色 |

## `echarts.axis.x.pointer.shadow`

<a id="entry-echarts-axis-x-pointer-shadow"></a>

阴影

为 shadow 类型的指示器带设置样式。

将阴影字段写入选定的 axisPointer.shadowStyle 所有者。

指示器的 shadow 类型需另行选择；此辅助样式不设置带状填充颜色，也不启用指示器。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.x.tick.lineStyle`

<a id="entry-echarts-axis-x-tick-linestyle"></a>

线样式

为已有图表、轴线、刻度、指示器或分割线设置线条样式。

在路径选定的 lineStyle 所有者上写入线条颜色、宽度、虚线模式、端点、连接点和透明度；提供 shadow 子样式。echarts.line.lineStyle 提供虚线默认值。

此样式不启用被隐藏的父级线条，也不创建数据。系列线、强调状态线和坐标系线仍有不同的所有者。

位置参数顺序: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `width` | `number` | 线宽 |
| `type` | `string` | 线类型 |
| `dashOffset` | `number` | 虚线偏移 |
| `cap` | `string` | 线端点类型 |
| `join` | `string` | 线连接类型 |
| `miterLimit` | `number` | 斜接面限制比例 |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.axis.y.line.lineStyle`

<a id="entry-echarts-axis-y-line-linestyle"></a>

线样式

为已有图表、轴线、刻度、指示器或分割线设置线条样式。

在路径选定的 lineStyle 所有者上写入线条颜色、宽度、虚线模式、端点、连接点和透明度；提供 shadow 子样式。echarts.line.lineStyle 提供虚线默认值。

此样式不启用被隐藏的父级线条，也不创建数据。系列线、强调状态线和坐标系线仍有不同的所有者。

位置参数顺序: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `width` | `number` | 线宽 |
| `type` | `string` | 线类型 |
| `dashOffset` | `number` | 虚线偏移 |
| `cap` | `string` | 线端点类型 |
| `join` | `string` | 线连接类型 |
| `miterLimit` | `number` | 斜接面限制比例 |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.axis.y.pointer.handle`

<a id="entry-echarts-axis-y-pointer-handle"></a>

指示器手柄配置

配置可拖动指示器手柄的外观。

写入选定 axisPointer.handle 的可见性、icon、size、margin、throttle 和 color，并提供 shadow 子样式。

需要适用的坐标轴指示器；不提供图表数据或坐标系。

位置参数顺序: `icon` → `size` → `margin` → `throttle` → `show` → `color`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `icon` | `any` | 未提供 | 图标 |
| `size` | `number` | 未提供 | 图标大小 |
| `margin` | `number` | 未提供 | 手柄与轴的距离 |
| `throttle` | `number` | 未提供 | 视图更新间隔 |
| `show` | `boolean` | `true` | 显示 |
| `color` | `functionOrString` | 未提供 | 颜色 |

## `echarts.axis.y.pointer.shadow`

<a id="entry-echarts-axis-y-pointer-shadow"></a>

阴影

为 shadow 类型的指示器带设置样式。

将阴影字段写入选定的 axisPointer.shadowStyle 所有者。

指示器的 shadow 类型需另行选择；此辅助样式不设置带状填充颜色，也不启用指示器。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.y.tick.lineStyle`

<a id="entry-echarts-axis-y-tick-linestyle"></a>

线样式

为已有图表、轴线、刻度、指示器或分割线设置线条样式。

在路径选定的 lineStyle 所有者上写入线条颜色、宽度、虚线模式、端点、连接点和透明度；提供 shadow 子样式。echarts.line.lineStyle 提供虚线默认值。

此样式不启用被隐藏的父级线条，也不创建数据。系列线、强调状态线和坐标系线仍有不同的所有者。

位置参数顺序: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `width` | `number` | 线宽 |
| `type` | `string` | 线类型 |
| `dashOffset` | `number` | 虚线偏移 |
| `cap` | `string` | 线端点类型 |
| `join` | `string` | 线连接类型 |
| `miterLimit` | `number` | 斜接面限制比例 |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.axis.x.label.textStyle`

<a id="entry-echarts-axis-x-label-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.axis.y.label.textStyle`

<a id="entry-echarts-axis-y-label-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.bar.hover.label.border`

<a id="entry-echarts-bar-hover-label-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.bar.hover.label.shadow`

<a id="entry-echarts-bar-hover-label-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.geo.hover.label.border`

<a id="entry-echarts-geo-hover-label-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.geo.hover.label.shadow`

<a id="entry-echarts-geo-hover-label-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.pie.hover.label.border`

<a id="entry-echarts-pie-hover-label-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.pie.hover.label.shadow`

<a id="entry-echarts-pie-hover-label-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.x.nameStyle.border`

<a id="entry-echarts-axis-x-namestyle-border"></a>

边框

为轴名称周围的盒绘制边框。

根据所选路径，将边框参数映射到 radar.axisName 或 xAxis/yAxis.nameTextStyle。此变体省略 cap、join 和斜接限制控件。

文字描边使用 textStyle.stroke 子样式，而不是名称外围盒的边框。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |

## `echarts.axis.x.nameStyle.shadow`

<a id="entry-echarts-axis-x-namestyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.y.nameStyle.border`

<a id="entry-echarts-axis-y-namestyle-border"></a>

边框

为轴名称周围的盒绘制边框。

根据所选路径，将边框参数映射到 radar.axisName 或 xAxis/yAxis.nameTextStyle。此变体省略 cap、join 和斜接限制控件。

文字描边使用 textStyle.stroke 子样式，而不是名称外围盒的边框。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |

## `echarts.axis.y.nameStyle.shadow`

<a id="entry-echarts-axis-y-namestyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.line.hover.label.border`

<a id="entry-echarts-line-hover-label-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.line.hover.label.shadow`

<a id="entry-echarts-line-hover-label-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.x.pointer.lineStyle`

<a id="entry-echarts-axis-x-pointer-linestyle"></a>

线样式

为已有图表、轴线、刻度、指示器或分割线设置线条样式。

在路径选定的 lineStyle 所有者上写入线条颜色、宽度、虚线模式、端点、连接点和透明度；提供 shadow 子样式。echarts.line.lineStyle 提供虚线默认值。

此样式不启用被隐藏的父级线条，也不创建数据。系列线、强调状态线和坐标系线仍有不同的所有者。

位置参数顺序: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `width` | `number` | 线宽 |
| `type` | `string` | 线类型 |
| `dashOffset` | `number` | 虚线偏移 |
| `cap` | `string` | 线端点类型 |
| `join` | `string` | 线连接类型 |
| `miterLimit` | `number` | 斜接面限制比例 |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.axis.y.pointer.lineStyle`

<a id="entry-echarts-axis-y-pointer-linestyle"></a>

线样式

为已有图表、轴线、刻度、指示器或分割线设置线条样式。

在路径选定的 lineStyle 所有者上写入线条颜色、宽度、虚线模式、端点、连接点和透明度；提供 shadow 子样式。echarts.line.lineStyle 提供虚线默认值。

此样式不启用被隐藏的父级线条，也不创建数据。系列线、强调状态线和坐标系线仍有不同的所有者。

位置参数顺序: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `width` | `number` | 线宽 |
| `type` | `string` | 线类型 |
| `dashOffset` | `number` | 虚线偏移 |
| `cap` | `string` | 线端点类型 |
| `join` | `string` | 线连接类型 |
| `miterLimit` | `number` | 斜接面限制比例 |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.bar.hover.label.textStyle`

<a id="entry-echarts-bar-hover-label-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.geo.hover.label.textStyle`

<a id="entry-echarts-geo-hover-label-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.line.markLine.hover.label`

<a id="entry-echarts-line-markline-hover-label"></a>

标签配置

定位并格式化系列或强调状态标签。

在通用标签格式上扩展 distance、offset、最小边距和 position，再写入选定的系列或强调状态 label 所有者。

强调状态启用使用父级 hover 样式；仅当输出的嵌套 textStyle 结构适配目标 ECharts 版本时，使用 label.textStyle。

位置参数顺序: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `distance` → `offset` → `minMargin` → `position`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `align` | `string` | 未提供 | 文字水平对齐 |
| `verticalAlign` | `string` | 未提供 | 文字垂直对齐 |
| `rotate` | `number` | 未提供 | 旋转角度 |
| `width` | `number` | 未提供 | 文本显示宽度 |
| `height` | `number` | 未提供 | 文本显示高度 |
| `rich` | `dictionary` | 未提供 | 富文本 |
| `lineHeight` | `number` | 未提供 | 行高 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `opacity` | `number` | 未提供 | 透明度 |
| `distance` | `number` | 未提供 | 文本与图形的距离 |
| `offset` | `array` | 未提供 | 文本偏移 |
| `minMargin` | `number` | 未提供 | 标签最小边距 |
| `position` | `arrayOrString` | 未提供 | 位置 |

## `echarts.pie.hover.label.textStyle`

<a id="entry-echarts-pie-hover-label-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.axis.x.nameStyle.textStyle`

<a id="entry-echarts-axis-x-namestyle-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.axis.x.splitArea.areaStyle`

<a id="entry-echarts-axis-x-splitarea-areastyle"></a>

区域样式

设置坐标系分割区域的填充样式。

将填充颜色和透明度写入选定的 splitArea.areaStyle，并提供 shadow 子样式。

父级 splitArea 需另行启用；这是坐标系带状区域样式，不是系列区域填充。

位置参数顺序: `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.axis.x.splitLine.lineStyle`

<a id="entry-echarts-axis-x-splitline-linestyle"></a>

线样式

为已有图表、轴线、刻度、指示器或分割线设置线条样式。

在路径选定的 lineStyle 所有者上写入线条颜色、宽度、虚线模式、端点、连接点和透明度；提供 shadow 子样式。echarts.line.lineStyle 提供虚线默认值。

此样式不启用被隐藏的父级线条，也不创建数据。系列线、强调状态线和坐标系线仍有不同的所有者。

位置参数顺序: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `width` | `number` | 线宽 |
| `type` | `string` | 线类型 |
| `dashOffset` | `number` | 虚线偏移 |
| `cap` | `string` | 线端点类型 |
| `join` | `string` | 线连接类型 |
| `miterLimit` | `number` | 斜接面限制比例 |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.axis.y.nameStyle.textStyle`

<a id="entry-echarts-axis-y-namestyle-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.axis.y.splitArea.areaStyle`

<a id="entry-echarts-axis-y-splitarea-areastyle"></a>

区域样式

设置坐标系分割区域的填充样式。

将填充颜色和透明度写入选定的 splitArea.areaStyle，并提供 shadow 子样式。

父级 splitArea 需另行启用；这是坐标系带状区域样式，不是系列区域填充。

位置参数顺序: `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.axis.y.splitLine.lineStyle`

<a id="entry-echarts-axis-y-splitline-linestyle"></a>

线样式

为已有图表、轴线、刻度、指示器或分割线设置线条样式。

在路径选定的 lineStyle 所有者上写入线条颜色、宽度、虚线模式、端点、连接点和透明度；提供 shadow 子样式。echarts.line.lineStyle 提供虚线默认值。

此样式不启用被隐藏的父级线条，也不创建数据。系列线、强调状态线和坐标系线仍有不同的所有者。

位置参数顺序: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `width` | `number` | 线宽 |
| `type` | `string` | 线类型 |
| `dashOffset` | `number` | 虚线偏移 |
| `cap` | `string` | 线端点类型 |
| `join` | `string` | 线连接类型 |
| `miterLimit` | `number` | 斜接面限制比例 |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.bar.hover.itemStyle.border`

<a id="entry-echarts-bar-hover-itemstyle-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.bar.hover.itemStyle.shadow`

<a id="entry-echarts-bar-hover-itemstyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.bar.label.textStyle.shadow`

<a id="entry-echarts-bar-label-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.bar.label.textStyle.stroke`

<a id="entry-echarts-bar-label-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.geo.hover.itemStyle.border`

<a id="entry-echarts-geo-hover-itemstyle-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.geo.hover.itemStyle.shadow`

<a id="entry-echarts-geo-hover-itemstyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.geo.label.textStyle.shadow`

<a id="entry-echarts-geo-label-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.geo.label.textStyle.stroke`

<a id="entry-echarts-geo-label-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.line.hover.label.textStyle`

<a id="entry-echarts-line-hover-label-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.line.markLine.label.border`

<a id="entry-echarts-line-markline-label-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.line.markLine.label.shadow`

<a id="entry-echarts-line-markline-label-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.line.markPoint.hover.label`

<a id="entry-echarts-line-markpoint-hover-label"></a>

标签配置

定位并格式化系列或强调状态标签。

在通用标签格式上扩展 distance、offset、最小边距和 position，再写入选定的系列或强调状态 label 所有者。

强调状态启用使用父级 hover 样式；仅当输出的嵌套 textStyle 结构适配目标 ECharts 版本时，使用 label.textStyle。

位置参数顺序: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `distance` → `offset` → `minMargin` → `position`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `align` | `string` | 未提供 | 文字水平对齐 |
| `verticalAlign` | `string` | 未提供 | 文字垂直对齐 |
| `rotate` | `number` | 未提供 | 旋转角度 |
| `width` | `number` | 未提供 | 文本显示宽度 |
| `height` | `number` | 未提供 | 文本显示高度 |
| `rich` | `dictionary` | 未提供 | 富文本 |
| `lineHeight` | `number` | 未提供 | 行高 |
| `backgroundColor` | `functionOrString` | 未提供 | 背景色 |
| `show` | `boolean` | `true` | 显示 |
| `padding` | `array` | 未提供 | 内边距 |
| `formatter` | `functionOrString` | 未提供 | 格式化器 |
| `opacity` | `number` | 未提供 | 透明度 |
| `distance` | `number` | 未提供 | 文本与图形的距离 |
| `offset` | `array` | 未提供 | 文本偏移 |
| `minMargin` | `number` | 未提供 | 标签最小边距 |
| `position` | `arrayOrString` | 未提供 | 位置 |

## `echarts.pie.hover.itemStyle.border`

<a id="entry-echarts-pie-hover-itemstyle-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.pie.hover.itemStyle.shadow`

<a id="entry-echarts-pie-hover-itemstyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.pie.label.textStyle.shadow`

<a id="entry-echarts-pie-label-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.pie.label.textStyle.stroke`

<a id="entry-echarts-pie-label-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.line.hover.itemStyle.border`

<a id="entry-echarts-line-hover-itemstyle-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.line.hover.itemStyle.shadow`

<a id="entry-echarts-line-hover-itemstyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.line.hover.lineStyle.shadow`

<a id="entry-echarts-line-hover-linestyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.line.label.textStyle.shadow`

<a id="entry-echarts-line-label-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.line.label.textStyle.stroke`

<a id="entry-echarts-line-label-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.line.markPoint.label.border`

<a id="entry-echarts-line-markpoint-label-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.line.markPoint.label.shadow`

<a id="entry-echarts-line-markpoint-label-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.Radar.line.lineStyle.shadow`

<a id="entry-echarts-radar-line-linestyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.Radar.tick.lineStyle.shadow`

<a id="entry-echarts-radar-tick-linestyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.Radar.label.textStyle.shadow`

<a id="entry-echarts-radar-label-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.Radar.label.textStyle.stroke`

<a id="entry-echarts-radar-label-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.tooltip.pointer.label.border`

<a id="entry-echarts-tooltip-pointer-label-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.tooltip.pointer.label.shadow`

<a id="entry-echarts-tooltip-pointer-label-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.line.markLine.hover.itemStyle`

<a id="entry-echarts-line-markline-hover-itemstyle"></a>

图形样式

设置选定图表项、地图区域、图例标记或强调状态项的样式。

将 color 和 opacity 写入路径选定的 itemStyle，并为同一所有者提供 border 和 shadow 子样式。

常规状态与强调状态需选择完整路径。系列项样式与 geo 或 calendar 样式作用于不同所有者。

位置参数顺序: `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.line.markLine.label.textStyle`

<a id="entry-echarts-line-markline-label-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.tooltip.pointer.handle.shadow`

<a id="entry-echarts-tooltip-pointer-handle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.line.markLine.lineStyle.shadow`

<a id="entry-echarts-line-markline-linestyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.line.markPoint.hover.itemStyle`

<a id="entry-echarts-line-markpoint-hover-itemstyle"></a>

图形样式

设置选定图表项、地图区域、图例标记或强调状态项的样式。

将 color 和 opacity 写入路径选定的 itemStyle，并为同一所有者提供 border 和 shadow 子样式。

常规状态与强调状态需选择完整路径。系列项样式与 geo 或 calendar 样式作用于不同所有者。

位置参数顺序: `color` → `opacity`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `functionOrString` | 颜色 |
| `opacity` | `number` | 透明度 |

## `echarts.line.markPoint.label.textStyle`

<a id="entry-echarts-line-markpoint-label-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.line.markPoint.itemStyle.border`

<a id="entry-echarts-line-markpoint-itemstyle-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.line.markPoint.itemStyle.shadow`

<a id="entry-echarts-line-markpoint-itemstyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.Radar.axisName.textStyle.shadow`

<a id="entry-echarts-radar-axisname-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.Radar.axisName.textStyle.stroke`

<a id="entry-echarts-radar-axisname-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.tooltip.pointer.label.textStyle`

<a id="entry-echarts-tooltip-pointer-label-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.Radar.splitArea.areaStyle.shadow`

<a id="entry-echarts-radar-splitarea-areastyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.Radar.splitLine.lineStyle.shadow`

<a id="entry-echarts-radar-splitline-linestyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.tooltip.pointer.lineStyle.shadow`

<a id="entry-echarts-tooltip-pointer-linestyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.calendar.dayLabel.textStyle.shadow`

<a id="entry-echarts-calendar-daylabel-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.calendar.dayLabel.textStyle.stroke`

<a id="entry-echarts-calendar-daylabel-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.calendar.splitLine.lineStyle.shadow`

<a id="entry-echarts-calendar-splitline-linestyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.calendar.yearLabel.textStyle.shadow`

<a id="entry-echarts-calendar-yearlabel-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.calendar.yearLabel.textStyle.stroke`

<a id="entry-echarts-calendar-yearlabel-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.calendar.monthLabel.textStyle.shadow`

<a id="entry-echarts-calendar-monthlabel-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.calendar.monthLabel.textStyle.stroke`

<a id="entry-echarts-calendar-monthlabel-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.axis.x.pointer.label.border`

<a id="entry-echarts-axis-x-pointer-label-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.axis.x.pointer.label.shadow`

<a id="entry-echarts-axis-x-pointer-label-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.y.pointer.label.border`

<a id="entry-echarts-axis-y-pointer-label-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.axis.y.pointer.label.shadow`

<a id="entry-echarts-axis-y-pointer-label-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.x.line.lineStyle.shadow`

<a id="entry-echarts-axis-x-line-linestyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.x.pointer.handle.shadow`

<a id="entry-echarts-axis-x-pointer-handle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.x.tick.lineStyle.shadow`

<a id="entry-echarts-axis-x-tick-linestyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.y.line.lineStyle.shadow`

<a id="entry-echarts-axis-y-line-linestyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.y.pointer.handle.shadow`

<a id="entry-echarts-axis-y-pointer-handle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.y.tick.lineStyle.shadow`

<a id="entry-echarts-axis-y-tick-linestyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.x.label.textStyle.shadow`

<a id="entry-echarts-axis-x-label-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.axis.x.label.textStyle.stroke`

<a id="entry-echarts-axis-x-label-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.axis.y.label.textStyle.shadow`

<a id="entry-echarts-axis-y-label-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.axis.y.label.textStyle.stroke`

<a id="entry-echarts-axis-y-label-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.axis.x.pointer.label.textStyle`

<a id="entry-echarts-axis-x-pointer-label-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.axis.y.pointer.label.textStyle`

<a id="entry-echarts-axis-y-pointer-label-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.axis.x.pointer.lineStyle.shadow`

<a id="entry-echarts-axis-x-pointer-linestyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.y.pointer.lineStyle.shadow`

<a id="entry-echarts-axis-y-pointer-linestyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.bar.hover.label.textStyle.shadow`

<a id="entry-echarts-bar-hover-label-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.bar.hover.label.textStyle.stroke`

<a id="entry-echarts-bar-hover-label-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.geo.hover.label.textStyle.shadow`

<a id="entry-echarts-geo-hover-label-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.geo.hover.label.textStyle.stroke`

<a id="entry-echarts-geo-hover-label-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.line.markLine.hover.label.border`

<a id="entry-echarts-line-markline-hover-label-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.line.markLine.hover.label.shadow`

<a id="entry-echarts-line-markline-hover-label-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.pie.hover.label.textStyle.shadow`

<a id="entry-echarts-pie-hover-label-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.pie.hover.label.textStyle.stroke`

<a id="entry-echarts-pie-hover-label-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.axis.x.nameStyle.textStyle.shadow`

<a id="entry-echarts-axis-x-namestyle-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.axis.x.nameStyle.textStyle.stroke`

<a id="entry-echarts-axis-x-namestyle-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.axis.x.splitArea.areaStyle.shadow`

<a id="entry-echarts-axis-x-splitarea-areastyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.x.splitLine.lineStyle.shadow`

<a id="entry-echarts-axis-x-splitline-linestyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.y.nameStyle.textStyle.shadow`

<a id="entry-echarts-axis-y-namestyle-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.axis.y.nameStyle.textStyle.stroke`

<a id="entry-echarts-axis-y-namestyle-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.axis.y.splitArea.areaStyle.shadow`

<a id="entry-echarts-axis-y-splitarea-areastyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.y.splitLine.lineStyle.shadow`

<a id="entry-echarts-axis-y-splitline-linestyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.line.hover.label.textStyle.shadow`

<a id="entry-echarts-line-hover-label-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.line.hover.label.textStyle.stroke`

<a id="entry-echarts-line-hover-label-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.line.markPoint.hover.label.border`

<a id="entry-echarts-line-markpoint-hover-label-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.line.markPoint.hover.label.shadow`

<a id="entry-echarts-line-markpoint-hover-label-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.line.markLine.hover.label.textStyle`

<a id="entry-echarts-line-markline-hover-label-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.line.markLine.hover.itemStyle.border`

<a id="entry-echarts-line-markline-hover-itemstyle-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.line.markLine.hover.itemStyle.shadow`

<a id="entry-echarts-line-markline-hover-itemstyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.line.markLine.label.textStyle.shadow`

<a id="entry-echarts-line-markline-label-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.line.markLine.label.textStyle.stroke`

<a id="entry-echarts-line-markline-label-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.line.markPoint.hover.label.textStyle`

<a id="entry-echarts-line-markpoint-hover-label-textstyle"></a>

文本样式

控制完整路径选定的标签或名称所有者的字体样式。

将 style、weight、font 和 size 映射为 fontStyle、fontWeight、fontFamily 和 fontSize。轴名称样式直接作用于名称对象；标签派生的 textStyle 子样式作用于嵌套 textStyle 对象。

可配合父级标签 formatter 和富文本；字形装饰使用 stroke 和 shadow 子样式。

这些辅助样式保留输出的 ECharts 嵌套结构；不会将旧版嵌套 label.textStyle 归一化为平铺的 label 属性。

位置参数顺序: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `overflow` | `string` | 文字溢出 |
| `ellipsis` | `string` | 文字截断后缀 |
| `style` | `string` | 字体风格<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | 字体粗细<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | 字体族<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | 字体大小<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | 颜色 |

## `echarts.line.markPoint.hover.itemStyle.border`

<a id="entry-echarts-line-markpoint-hover-itemstyle-border"></a>

边框

为选定的标签盒或图表项绘制边框。

在完整路径选定的所有者上写入带 border 前缀的属性，并提供独立的圆角数组简写和 none 重置。

label border 影响标签盒；itemStyle/backgroundStyle border 影响图形。字形描边使用 textStyle.stroke。

共享参数形状不代表标签盒与系列项有同一所有者；两者的 ECharts 渲染语义不同。

位置参数顺序: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"borderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"borderType"}` |
| `radius` | `array` | 圆角<br>支持简写<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | 线端点类型<br>`{"optKey":"borderCap"}` |
| `join` | `string` | 线连接类型<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | 斜接限制<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.line.markPoint.hover.itemStyle.shadow`

<a id="entry-echarts-line-markpoint-hover-itemstyle-shadow"></a>

阴影

为选定的可视盒、图形项、线条或填充添加阴影。

在路径选定的所有者上写入阴影字段；setOption 前针对图表展开基于主题的值。

选择完整的所有者路径；标签盒阴影与字形文字阴影是独立的。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"shadowColor"}` |

## `echarts.line.markPoint.label.textStyle.shadow`

<a id="entry-echarts-line-markpoint-label-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.line.markPoint.label.textStyle.stroke`

<a id="entry-echarts-line-markpoint-label-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.tooltip.pointer.label.textStyle.shadow`

<a id="entry-echarts-tooltip-pointer-label-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.tooltip.pointer.label.textStyle.stroke`

<a id="entry-echarts-tooltip-pointer-label-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.axis.x.pointer.label.textStyle.shadow`

<a id="entry-echarts-axis-x-pointer-label-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.axis.x.pointer.label.textStyle.stroke`

<a id="entry-echarts-axis-x-pointer-label-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.axis.y.pointer.label.textStyle.shadow`

<a id="entry-echarts-axis-y-pointer-label-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.axis.y.pointer.label.textStyle.stroke`

<a id="entry-echarts-axis-y-pointer-label-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.line.markLine.hover.label.textStyle.shadow`

<a id="entry-echarts-line-markline-hover-label-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.line.markLine.hover.label.textStyle.stroke`

<a id="entry-echarts-line-markline-hover-label-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.line.markPoint.hover.label.textStyle.shadow`

<a id="entry-echarts-line-markpoint-hover-label-textstyle-shadow"></a>

阴影

为文字字形添加阴影。

在选定的文本所有者上将简写和显式值映射到 textShadow 字段；提交图表前解析主题值。

显式文字阴影字段优先于字典值；none 重置文字阴影。嵌套的 label textStyle 路径保留该嵌套结构。

位置参数顺序: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | 阴影<br>支持简写<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | 阴影X轴偏移量<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | 阴影Y轴偏移量<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | 阴影模糊度<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | 阴影颜色<br>`{"optKey":"textShadowColor"}` |

## `echarts.line.markPoint.hover.label.textStyle.stroke`

<a id="entry-echarts-line-markpoint-hover-label-textstyle-stroke"></a>

边框

在选定的字体样式所有者上为文字字形描边。

为边框输出键添加 text 前缀，生成 textBorderColor、textBorderWidth、textBorderType 和 textBorderDashOffset；省略 cap、join、斜接限制和圆角。

盒边框使用父级 border 样式。图表处理选项时，textBorder 的 none 值会重置字形边框字段。

位置参数顺序: `color` → `width` → `type` → `border` → `dashOffset`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `color` | `string` | 边框颜色<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | 边框宽度<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | 边框类型<br>选项: `solid` — 实线, `dashed` — 虚线, `dotted` — 点线<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | 边框<br>支持简写<br>选项: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | 虚线偏移<br>`{"optKey":"textBorderDashOffset"}` |
