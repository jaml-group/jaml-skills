# chart

**Class:** `CashewChart` · **Type:** `"chart"` · **Extends:** `AbstractOptionElement`

An ECharts-powered chart element. The `type` second part maps directly to the ECharts series type. Use composite shorthand like `"chart-bar"`, `"chart-line"`, `"chart-pie"`, `"chart-radar"`, `"chart-scatter"`, etc.

---

## Runtime prerequisite

Load the ECharts browser library before mounting chart elements. The chart reads `globalThis.echarts` from its own browsing context; a library loaded only in a parent window does not supply an iframe's runtime. An opaque or sandboxed host must provide the library inside that frame under its existing script policy. Chart data/options do not install the library or grant network access. Give the element nonzero dimensions and verify an initialized chart instance after mounting.

## Sizing and resize

Give the chart a nonzero height and a usable containing width. `width: '100%'` fills its containing layout, not necessarily the page. Give a full-width dashboard root an explicit width; keep a compact artifact content-sized when that is intended. Canvas resizing does not choose the parent's layout policy.

The current development runtime automatically resizes the chart after initial readiness, on framework `resize` notifications, and when its plotting container changes content-box size. This includes CSS-only parent resizing, caption wrapping and hidden-content reveal. Observation belongs to the chart style and is cleaned up with it; ordinary chart definitions need no additional observer, repeated resize calls or delayed repair. Older runtimes that only support explicit layout notifications require their layout owner to publish those notifications; see [resize observation and layout notification](JAM-UI.md#resize-observation-and-layout-notification).

`redrawOnResize: true` additionally rebuilds chart options after an explicit resize notification or an observed dimension change. It does not enable observation: automatic canvas sizing already works without it. The initial stable callback only resizes; unchanged passive notifications do not redraw. Detached, disposed and zero-sized charts are skipped, and visible size changes resume sizing through the existing lifecycle. When investigating a layout problem, compare the containing layout, chart host, plotting container and canvas rather than adding offsets or changing chart data.

## Automatic grid and legend layout

Automatic grid defaults follow the completed series coordinate systems, including mixed charts; they are not limited to bar/line. Explicit non-Cartesian overrides do not acquire a grid. Automatic grid does not create axes; supply any axes not already provided by the selected chart style. See [grid defaults, opt-out and layout limits](../Styles/echarts.md#echartsgrid) before customizing legend spacing.

The default `containLabel: true` accounts for tick labels, not axis-title clearance. When adding an axis `name`, reserve space with `echarts.grid` on the side where the title appears. End-position Y names need top space; end-position X names need right space for the usual left/bottom axes. Other positions and centered names need corresponding margins and, where needed, a suitable `nameGap`. See [named-axis layout](../Styles/echarts.md#named-axis-with-location). Example margins are starting values; check the actual titles, fonts and chart size.

For charts without a grid or radar placement owner, `echarts.legend` places one visible horizontal legend at a `0.5rem` top inset when both vertical offsets are unset or `auto`. Explicit offsets, horizontal alignment, responsive media and multiple legends retain their own placement. Radar and active grid policies retain ownership. Use `echarts.legend.position` for explicit placement; a Cartesian grid is unnecessary just to move a non-Cartesian legend.

## Bar corners

`chart-bar` rounds exposed bar ends with the theme's `sys.border.radius.xs`. An end stays square where it rests on a visible baseline or a visible stack neighbour, so a stack rounds its outer end and a segment floating above an invisible offset rounds both ends. For the standard axis configuration, the baseline counts as visible when the category axis line or the value axis gridlines show; hiding both rounds both ends of each unstacked bar. This is a visibility heuristic, not geometric contact detection: offset axes, gridlines missing zero and axis clipping are not resolved. Hiding an outer stack series through the legend does not recalculate the newly exposed end. A series `itemStyle.borderRadius` takes precedence, for example `echarts.bar.itemStyle.border([4, 4, 0, 0])`. Bar series in a chart of another type keep their own styling. Stacked or negative bars carry per-item data, so formatters and chart events should read `params.value` and `params.name`; `params.data` is an item object for those series. Corners stay on the positive end, and stacks stay square, when series share a dataset in a layout that cannot be remapped safely, such as candlestick beside bars, several series on a time axis or row-based series. Per-item corner inference supports header-first column datasets. An explicit `sourceHeader: false` preserves the dataset and its `encode` mappings without sign- or stack-specific corner inference; `sourceHeader: true` explicitly identifies a header row.

## JAML usage

```json jaml-playground
{
    "type": "chart-bar",
    "cap": "Monthly Sales",
    "styles": ["css(height:15rem;width:20rem)"],
    "data": [
        ["Month", "Sales"],
        ["Jan", 120],
        ["Feb", 200],
        ["Mar", 150],
        ["Apr", 280]
    ]
}
```

---

## Params

Inherits all params from [AbstractOptionElement](./JAM-UI.md#section-3--abstractoptionelement).

| Param            | Type                                                          | Description                                                                                                                                                                                                                                             |
| ---------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`           | `any[][] \| Dictionary[]`                                     | Chart data. Two formats: **dataset** (array of arrays, first row = headers) for multi-series; **series objects** (`{name, data: [...]}`) for single series                                                                                              |
| `option`         | `Dictionary`                                                  | Complete ECharts option object. For new users migrating from raw ECharts — wraps the object into the chart's config (non-series keys → `option`, `series` key → series config). Sets `data = []` to trigger redraw                                      |
| `chartOption`    | `Dictionary`                                                  | Read-only — the resolved ECharts option object. Set via styles or the `option` param                                                                                                                                                                    |
| `colorSet`       | `ColorType[]`                                                 | Color palette for the chart series. Auto-generated from accent color                                                                                                                                                                                    |
| `tuner`          | `ColorTuner \| (color: chroma.Color) => chroma.Color \| null` | Immutably tunes each original `colorSet` entry before the chart option is drawn. Presets: `none`, `dopamine`, `neon`, `pastel`, `jewel`, `morandi`                                                                                                      |
| `redrawOnResize` | `boolean`                                                     | When `true`, also redraws after an explicit framework resize or an observed plotting-container dimension change; unchanged passive notifications are skipped. Does not enable observation. Default `false`; see [sizing and resize](#sizing-and-resize) |

**Available chart types (second part of composite `type`):** bar, line, pie, scatter, radar, gauge, funnel, k (candlestick), heatmap, treemap, tree, wordCloud, parallel, sankey, boxplot, graph, lines, themeRiver, map, map3d, custom. The second part becomes the ECharts `series.type`.

When both the `cap` and `icon` slots are empty, the chart automatically switches to a headerless layout so the chart body fills the host. Adding or removing either slot updates the layout.

JSON/JAML uses a preset name:

```json jaml-playground
{
    "type": "chart-pie",
    "tuner": "pastel",
    "styles": ["css(height:15rem;width:22rem)"],
    "data": [
        ["Item", "Share"],
        ["A", 40],
        ["B", 60]
    ]
}
```

JavaScript may supply a callback. The callback receives each original `chroma.Color`; its return values form a new `ColorSet`, leaving the input set unchanged. See [Color tuning](../color.md#color-tuning).

---

## Data formats

### Dataset format (recommended for multi-series)

First row = column headers. Subsequent rows = data. Supported when ALL rows are arrays:

```json jaml-playground
{
    "type": "chart-line",
    "cap": "Revenue vs Cost",
    "styles": ["css(height:15rem;width:20rem)"],
    "data": [
        ["Month", "Revenue", "Cost"],
        ["Jan", 12000, 8000],
        ["Feb", 15000, 9500],
        ["Mar", 18000, 11000],
        ["Apr", 22000, 13000]
    ]
}
```

### Series object format

Each object becomes a separate ECharts series. The `name` field becomes the series name, and additional fields (`data`, `type`, etc.) are passed through to ECharts:

```json jaml-playground
{
    "type": "chart-line",
    "cap": "Trend",
    "styles": ["css(height:15rem;width:20rem)"],
    "data": [
        { "name": "Revenue", "type": "line", "data": [120, 200, 150, 280] },
        { "name": "Cost", "type": "bar", "data": [80, 95, 110, 130] }
    ]
}
```

---

## ECharts styling

Chart styling is done through the `styles` array — NOT through a `config` param. Style plugins build the final ECharts option object. Use pre-built styles (`echarts.axis`, `echarts.legend`, etc.) where available, then `eopts` + `eseries` for everything else.

### Basic components

```json jaml-playground
{
    "type": "chart-bar",
    "cap": "Styled Bar",
    "styles": ["css(height:15rem;width:20rem)", "echarts.legend", "echarts.grid(top:3rem;right:4rem;containLabel:true)", "echarts.axis.x(name:Month;nameLocation:end)", "echarts.axis.y(name:Sales;nameLocation:end)", "echarts.bar.itemStyle.border(radius:[4,4,0,0])"],
    "data": [
        ["Month", "Sales"],
        ["Jan", 120],
        ["Feb", 200],
        ["Mar", 150]
    ]
}
```

### Method 1: `eopts` + `eseries` (separate option and series config)

Use `eopts` for non-series ECharts options (tooltip, grid, axes) and `eseries` for series-level config. **Data is kept separate** — each data object's `name` links it to the matching series config key:

```javascript jaml-playground
export default {
    type: 'chart-bar',
    cap: 'Sales',
    styles: [
        'css(height:15rem;width:22rem)',
        // Non-series options: axes, grid, tooltip
        Styles.eopts({
            tooltip: { trigger: 'axis' },
            grid: { top: '3rem', left: '3rem', containLabel: true },
            yAxis: { name: 'Revenue (USD)', nameLocation: 'end' }
        }),
        // Series config: each key matches a data object's `name`
        Styles.eseries({
            Revenue: {
                type: 'bar',
                barMaxWidth: 32,
                itemStyle: { borderRadius: [6, 6, 0, 0] }
            },
            Cost: { type: 'line', smooth: true }
        })
    ],
    // Data stays independent — change freely without touching styles
    data: [
        { name: 'Revenue', data: [120, 200, 150, 280] },
        { name: 'Cost', data: [80, 95, 110, 130] }
    ]
};
```

**How it works:** `eseries({Revenue: {...}, Cost: {...}})` registers named series templates. Each object in `data` with a matching `name` gets its config merged in. The `Revenue` data object becomes a bar series with rounded corners; `Cost` becomes a smooth line.

### Named series data format

When using `eseries` with named keys, use the series-object data format:

```javascript
data: [
    { name: 'Revenue', data: [120, 200, 150] }, // merges with eseries.Revenue
    { name: 'Cost', data: [80, 95, 110] } // merges with eseries.Cost
];
```

Each object's `name` must match a key in `eseries`. The `data` array inside each object is the actual ECharts series data.

### Real example: Gantt chart

Uses `eseries` to define two stacked series (`offset` for invisible spacing, `Task` for visible bars), plus `eopts` for axes configuration:

```javascript jaml-playground
export default {
    type: 'chart-bar',
    cap: 'Project Schedule',
    styles: [
        'css(height:24rem;width:44rem)',
        Styles.eopts({
            grid: { left: '14%', right: '5%', top: '8%', bottom: '8%' },
            xAxis: {
                type: 'value',
                name: 'Day',
                nameLocation: 'end',
                max: 30,
                splitLine: { lineStyle: { type: 'dashed' } }
            },
            yAxis: {
                type: 'category',
                inverse: true,
                data: ['Planning', 'Design', 'Development', 'Testing', 'Deployment']
            }
        }),
        Styles.eseries({
            // Invisible spacer — shifts each bar to its start position
            offset: {
                stack: 'gantt',
                silent: true,
                itemStyle: { color: 'transparent', borderColor: 'transparent' }
            },
            // Actual task bar — renders the duration
            Task: {
                stack: 'gantt',
                barMaxWidth: 28,
                label: {
                    show: true,
                    position: 'insideLeft',
                    formatter: function (p) {
                        return p.value + 'd';
                    }
                }
            }
        })
    ],
    data: [
        { name: 'offset', data: [0, 3, 7, 18, 25] },
        { name: 'Task', data: [3, 4, 11, 7, 5] }
    ]
};
```

### Complete ECharts option (migration from raw ECharts)

For an existing ECharts option object, use the `option` param and include `type` on each series. Plain `"chart"` is a clear choice for mixed series; a subtype does not override explicit `series[].type` in a complete option. Non-series keys become chart configuration, `series` supplies the series configuration, and `data` is cleared so those explicit series can render:

```javascript jaml-playground
export default {
    type: 'chart',
    cap: 'Custom Chart',
    styles: ['css(height:15rem;width:22rem)'],
    option: {
        // Put everything here — exactly like a raw ECharts option
        tooltip: { trigger: 'axis' },
        grid: { top: '10%', bottom: '10%' },
        xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar'] },
        yAxis: { type: 'value' },
        series: [{ name: 'Sales', type: 'line', data: [120, 200, 150] }]
    }
};
```

> **Note:** Using `eopts` directly for complete ECharts options is **not recommended**. If you must, set `data: []` — otherwise the chart won't trigger a redraw. The `option` param handles this automatically and is the proper migration path.

### Programmatic manipulation via `efuncs`

Run a function right before `setOption()` to modify the chart option programmatically:

```javascript
Styles.efuncs((chart, args) => {
    chart.chartOption.series[0].markLine = {
        data: [{ type: 'average', name: 'Avg' }]
    };
});
```

---

## Event hooks

| Hook               | Signature          | Description                          |
| ------------------ | ------------------ | ------------------------------------ |
| `onchartclick`     | `(params) => void` | ECharts `click` event                |
| `onchartdblclick`  | `(params) => void` | ECharts `dblclick` event             |
| `onchartmouseover` | `(params) => void` | ECharts `mouseover` event            |
| `onchartmouseout`  | `(params) => void` | ECharts `mouseout` event             |
| `onchartgeoroam`   | `(params) => void` | ECharts `georoam` event (map charts) |

Each hook also fires a corresponding event on the element: `chartclick`, `chartdblclick`, `chartmouseover`, `chartmouseout`, `chartgeoroam`.

---

## Instance properties and methods

| Member                               | Description                                                                                                         |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `chart.chart`                        | Access the raw ECharts instance                                                                                     |
| `chart.redraw()`                     | Re-render the chart (debounced at 50ms)                                                                             |
| `chart.reinit()`                     | Dispose and re-initialize the ECharts instance                                                                      |
| `chart.chartReady`                   | `Promise<void>` that resolves after the first draw                                                                  |
| `chart.addDrawTask(callback)`        | Register an identified `EChartsFunctionCallback` to run before `setOption()`. Normally supplied by `Styles.efuncs`. |
| `chart.removeDrawTask(callbackOrId)` | Remove a registered draw task by callback or plugin id.                                                             |

---

## Static setup

```javascript
// The ECharts library must be loaded globally before using charts
// e.g. <script src="echarts.min.js"></script>

// Charts use the adaptive built-in theme by default. Optional: merge custom overrides.
CashewChart.themeBuilder = (el) => jam.buildEchartsTheme(el, myThemeOverrides);

// Debounce interval (default 50ms)
CashewChart.debounce = 100;
```

---

## Examples

### Choose a chart for a reply

Each chart type already applies its `basic` style, so these records list only what they add. Each also has one line of detail under the chart, a label child with `slot: 'layer'`: the range and a one-line summary taken from the data, or how to read the chart, such as "smaller is better".

Compare several series over time:

<!-- generated-reply-demo:trend:start -->

````text
```text jamll
{ type: 'chart-line', cap: 'Visits by channel', style: { width: '100%', height: '16rem' }, styles: ['echarts.legend', 'echarts.line.symbol(show:true)'], data: [['Month', 'Search', 'Direct'], ['Jan', 120, 80], ['Feb', 132, 90], ['Mar', 158, 96], ['Apr', 171, 104]] }
    { type: 'label', cap: 'Jan–Apr: Search rose from 120 to 171, Direct from 80 to 104', slot: 'layer', styles: ['cap.sub(0.5)'] }
```
````

<!-- generated-reply-demo:trend:end -->

Show one series with its area:

<!-- generated-reply-demo:singleTrend:start -->

````text
```text jamll
{ type: 'chart-line', cap: 'Revenue', style: { width: '100%', height: '16rem' }, styles: ['echarts.line.gradientBg', 'echarts.line.symbol(show:true)'], data: [['Month', 'Revenue'], ['Jan', 42], ['Feb', 48], ['Mar', 45], ['Apr', 57]] }
    { type: 'label', cap: 'Jan–Apr: up from 42 to 57, with a dip in March', slot: 'layer', styles: ['cap.sub(0.5)'] }
```
````

<!-- generated-reply-demo:singleTrend:end -->

Show parts of a total. Each stack rounds its outer end:

<!-- generated-reply-demo:stacked:start -->

````text
```text jamll
{ type: 'chart-bar', cap: 'Output by source', style: { width: '100%', height: '16rem' }, styles: ['echarts.legend', 'echarts.bar(stack:output;maxWidth:28)'], data: [['Quarter', 'Solar', 'Wind'], ['Q1', 30, 44], ['Q2', 52, 38], ['Q3', 61, 29], ['Q4', 34, 47]] }
    { type: 'label', cap: 'Solar peaks in Q3 at 61; wind in Q4 at 47', slot: 'layer', styles: ['cap.sub(0.5)'] }
```
````

<!-- generated-reply-demo:stacked:end -->

Point out the highest value:

<!-- generated-reply-demo:leader:start -->

````text
```text jamll
{ type: 'chart-bar', cap: 'Sales by store', style: { width: '100%', height: '16rem' }, styles: ['echarts.bar(maxWidth:28)', 'echarts.bar.maxHightLight', 'echarts.bar.label(show:true;position:top)'], data: [['Store', 'Sales'], ['Elm', 42], ['Oak', 68], ['Pine', 51], ['Ash', 37]] }
    { type: 'label', cap: 'Oak leads with 68, 17 ahead of Pine', slot: 'layer', styles: ['cap.sub(0.5)'] }
```
````

<!-- generated-reply-demo:leader:end -->

Compare a benchmark where smaller is better. List the slowest first, so the best sits on top, and say so in the detail line:

<!-- generated-reply-demo:ranked:start -->

````text
```text jamll
{ type: 'chart-bar', cap: 'Page load time', style: { width: '100%', height: '16rem' }, styles: ['echarts.bar(maxWidth:20)', 'echarts.bar.flipXY', 'echarts.bar.label(show:true;position:right)'], data: [['Page', 'Load time'], ['Checkout', 1380], ['Search', 1140], ['Product', 960], ['Home', 820]] }
    { type: 'label', cap: 'Load time in ms, smaller is better', slot: 'layer', styles: ['cap.sub(0.5)'] }
```
````

<!-- generated-reply-demo:ranked:end -->

Show shares of a whole. A pie has no value axis, so put the numbers beside it: an inline indicator group in the `layer` slot, each dot coloured with the slice's palette entry (`ac0`, `ac1`, …), takes the place of slice labels:

<!-- generated-reply-demo:ring:start -->

````text
```text jamll
{ type: 'chart-pie', cap: 'Traffic share', style: { width: '100%', height: '16rem' }, styles: ['echarts.tooltip(trigger:item)', 'echarts.pie.ring', 'echarts.pie.position(innerR:45%;outerR:70%;cX:35%)'], data: [['Source', 'Share'], ['Search', 46], ['Direct', 31], ['Referral', 23]] }
    { type: 'container', slot: 'layer', styles: ['layout.flex(direction:column)', 'css(gap:xs;position:absolute;right:15%;top:50%;transform:translateY(-50%))'], childStyles: ['indicator.inline', 'value.color.primary', 'css(width:9rem)'] }
        { type: 'indicator-percent', icon: '●', cap: 'Search', value: 0.46, styles: ['indicator.icon.text(color:ac0)'] }
        { type: 'indicator-percent', icon: '●', cap: 'Direct', value: 0.31, styles: ['indicator.icon.text(color:ac1)'] }
        { type: 'indicator-percent', icon: '●', cap: 'Referral', value: 0.23, styles: ['indicator.icon.text(color:ac2)'] }
    { type: 'label', cap: 'Search brings almost half of all visits', slot: 'layer', styles: ['cap.sub(0.5)'] }
```
````

<!-- generated-reply-demo:ring:end -->

### Bar chart with axis styling

```json jaml-playground
{
    "type": "chart-bar",
    "cap": "Monthly Sales",
    "styles": ["css(height:15rem;width:22rem)", "echarts.legend", "echarts.grid(top:3rem;right:4rem;containLabel:true)", "echarts.axis.x(name:Month;nameLocation:end)", "echarts.axis.y(name:Revenue;nameLocation:end)", "echarts.bar.itemStyle.border(radius:[4,4,0,0])"],
    "data": [
        ["Month", "Sales", "Returns"],
        ["Jan", 120, 15],
        ["Feb", 200, 22],
        ["Mar", 150, 18],
        ["Apr", 280, 30]
    ]
}
```

### Line chart with smooth curves

```json jaml-playground
{
    "type": "chart-line",
    "cap": "Trend",
    "styles": ["css(height:15rem;width:22rem)", "echarts.line(smooth:true)", "echarts.line.areaStyle", "echarts.line.gradientBg", "echarts.axis.stripy.horizontal"],
    "data": [
        ["Quarter", "Revenue", "Cost"],
        ["Q1", 12000, 8000],
        ["Q2", 15000, 9500],
        ["Q3", 18000, 11000],
        ["Q4", 22000, 13000]
    ]
}
```

### Pie chart

Pie data uses the dataset format (first row = name + value columns):

```json jaml-playground
{
    "type": "chart-pie",
    "cap": "Market Share",
    "styles": ["css(height:15rem;width:22rem)", "echarts.legend", "echarts.pie.ring", "echarts.pie.label(show:true)"],
    "data": [
        ["Product", "Share"],
        ["Product A", 40],
        ["Product B", 35],
        ["Product C", 25]
    ]
}
```

### Radar chart

```json jaml-playground
{
    "type": "chart-radar",
    "cap": "Skills",
    "styles": ["css(height:18rem;width:22rem)", "echarts.legend", "echarts.legend.position(top:0.5rem;left:center)", "echarts.Radar(shape:circle)"],
    "data": [
        ["Skill", "Team A", "Team B"],
        ["Speed", 87, 80],
        ["Power", 82, 89],
        ["Accuracy", 95, 76],
        ["Defense", 74, 90],
        ["Agility", 88, 80]
    ]
}
```
