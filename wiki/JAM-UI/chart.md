# chart

**Class:** `CashewChart` · **Type:** `"chart"` · **Extends:** `AbstractOptionElement`

An ECharts-powered chart element. The `type` second part maps directly to the ECharts series type. Use composite shorthand like `"chart-bar"`, `"chart-line"`, `"chart-pie"`, `"chart-radar"`, `"chart-scatter"`, etc.

---

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

| Param | Type | Description |
|---|---|---|
| `data` | `any[][] \| Dictionary[]` | Chart data. Two formats: **dataset** (array of arrays, first row = headers) for multi-series; **series objects** (`{name, data: [...]}`) for single series |
| `option` | `Dictionary` | Complete ECharts option object. For new users migrating from raw ECharts — wraps the object into the chart's config (non-series keys → `option`, `series` key → series config). Sets `data = []` to trigger redraw |
| `chartOption` | `Dictionary` | Read-only — the resolved ECharts option object. Set via styles or the `option` param |
| `colorSet` | `ColorType[]` | Color palette for the chart series. Auto-generated from accent color |
| `tuner` | `ColorTuner \| (color: chroma.Color) => chroma.Color \| null` | Immutably tunes each original `colorSet` entry before the chart option is drawn. Presets: `none`, `dopamine`, `neon`, `pastel`, `jewel`, `morandi` |
| `redrawOnResize` | `boolean` | When `true`, redraws the full chart after an observed resize; otherwise only resizes the ECharts instance. Default `false` |

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
  "styles": [
    "css(height:15rem;width:20rem)",
    "echarts.legend",
    "echarts.axis.x(name:Month;nameLocation:center)",
    "echarts.axis.y(name:Sales)",
    "echarts.bar.itemStyle.border(radius:[4,4,0,0])"
  ],
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
      yAxis: { name: 'Revenue (USD)' }
    }),
    // Series config: each key matches a data object's `name`
    Styles.eseries({
      Revenue: { type: 'bar', barMaxWidth: 32, itemStyle: { borderRadius: [6, 6, 0, 0] } },
      Cost: { type: 'line', smooth: true }
    })
  ],
  // Data stays independent — change freely without touching styles
  data: [
    { name: 'Revenue', data: [120, 200, 150, 280] },
    { name: 'Cost', data: [80, 95, 110, 130] }
  ]
}
```

**How it works:** `eseries({Revenue: {...}, Cost: {...}})` registers named series templates. Each object in `data` with a matching `name` gets its config merged in. The `Revenue` data object becomes a bar series with rounded corners; `Cost` becomes a smooth line.

### Named series data format

When using `eseries` with named keys, use the series-object data format:

```javascript
data: [
  { name: 'Revenue', data: [120, 200, 150] },   // merges with eseries.Revenue
  { name: 'Cost', data: [80, 95, 110] }          // merges with eseries.Cost
]
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
      xAxis: { type: 'value', name: 'Day', nameLocation: 'end', max: 30,
               splitLine: { lineStyle: { type: 'dashed' } } },
      yAxis: { type: 'category', inverse: true,
               data: ['Planning', 'Design', 'Development', 'Testing', 'Deployment'] }
    }),
    Styles.eseries({
      // Invisible spacer — shifts each bar to its start position
      offset: { stack: 'gantt', silent: true,
                itemStyle: { color: 'transparent', borderColor: 'transparent' } },
      // Actual task bar — renders the duration
      Task: { stack: 'gantt', barMaxWidth: 28,
              label: { show: true, position: 'insideLeft', formatter: function(p) { return p.value + 'd' } } }
    })
  ],
  data: [
    { name: 'offset', data: [0, 3, 7, 18, 25] },
    { name: 'Task', data: [3, 4, 11, 7, 5] }
  ]
}
```

### Complete ECharts option (migration from raw ECharts)

If you're new to JAML and have an existing ECharts option object, use the `option` param. **Set `type` to `"chart"` only** — no subtype. The subtype (e.g. `chart-bar`, `chart-line`) would force a specific series type, which conflicts with a complete option where `series[].type` is already defined in the option itself. It accepts a complete ECharts option and routes everything correctly — non-series keys go to `chartOption`, the `series` key becomes series config, and data is cleared to trigger a fresh redraw:

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
    series: [
      { name: 'Sales', type: 'line', data: [120, 200, 150] }
    ]
  }
}
```

> **Note:** Using `eopts` directly for complete ECharts options is **not recommended**. If you must, set `data: []` — otherwise the chart won't trigger a redraw. The `option` param handles this automatically and is the proper migration path.

### Programmatic manipulation via `efuncs`

Run a function right before `setOption()` to modify the chart option programmatically:

```javascript
Styles.efuncs((chart, args) => {
  chart.chartOption.series[0].markLine = {
    data: [{ type: 'average', name: 'Avg' }]
  }
})
```

---

## Event hooks

| Hook | Signature | Description |
|---|---|---|
| `onchartclick` | `(params) => void` | ECharts `click` event |
| `onchartdblclick` | `(params) => void` | ECharts `dblclick` event |
| `onchartmouseover` | `(params) => void` | ECharts `mouseover` event |
| `onchartmouseout` | `(params) => void` | ECharts `mouseout` event |
| `onchartgeoroam` | `(params) => void` | ECharts `georoam` event (map charts) |

Each hook also fires a corresponding event on the element: `chartclick`, `chartdblclick`, `chartmouseover`, `chartmouseout`, `chartgeoroam`.

---

## Instance properties and methods

| Member | Description |
|---|---|
| `chart.chart` | Access the raw ECharts instance |
| `chart.redraw()` | Re-render the chart (debounced at 50ms) |
| `chart.reinit()` | Dispose and re-initialize the ECharts instance |
| `chart.chartReady` | `Promise<void>` that resolves after the first draw |
| `chart.addDrawTask(callback)` | Register an identified `EChartsFunctionCallback` to run before `setOption()`. Normally supplied by `Styles.efuncs`. |
| `chart.removeDrawTask(callbackOrId)` | Remove a registered draw task by callback or plugin id. |

---

## Static setup

```javascript
// The ECharts library must be loaded globally before using charts
// e.g. <script src="echarts.min.js"></script>

// Charts use the adaptive built-in theme by default. Optional: merge custom overrides.
CashewChart.themeBuilder = (el) => jam.buildEchartsTheme(el, myThemeOverrides)

// Debounce interval (default 50ms)
CashewChart.debounce = 100
```

---

## Examples

### Bar chart with axis styling

```json jaml-playground
{
  "type": "chart-bar",
  "cap": "Monthly Sales",
  "styles": [
    "css(height:15rem;width:22rem)",
    "echarts.legend",
    "echarts.axis.x(name:Month;nameLocation:center)",
    "echarts.axis.y(name:Revenue;nameLocation:end)",
    "echarts.bar.itemStyle.border(radius:[4,4,0,0])"
  ],
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
  "styles": [
    "css(height:15rem;width:22rem)",
    "echarts.line(smooth:true)",
    "echarts.line.areaStyle",
    "echarts.line.gradientBg",
    "echarts.axis.stripy.horizontal"
  ],
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
  "styles": [
    "css(height:15rem;width:22rem)",
    "echarts.legend",
    "echarts.pie.ring",
    "echarts.pie.label(show:true)"
  ],
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
  "styles": [
    "css(height:18rem;width:22rem)",
    "echarts.legend",
    "echarts.Radar(shape:circle)"
  ],
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
