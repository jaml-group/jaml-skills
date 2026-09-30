# ECharts styles

<!-- Generated from native authoring; do not edit. -->

[中文](echarts.zh.md)

<a id="entry-echarts"></a>

Base ECharts styles

Provide the default ECharts plot layout for chart elements.

Applies the grid style. Chart elements also apply the style matching their chart type; this root does not select a series type.

Use on a CashewChart-derived chart with ECharts available and a measurable host size.

The chart builds options on redraw, awaits registered chart functions, resolves theme-backed ECharts values, and submits a replacement option to ECharts. The element disposes its ECharts instance on disconnect.

Set the chart type and data on the element, then compose chart, axis, legend and tooltip styles.

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

Text color on ECharts graphics

Choose contrasting text for eligible labels drawn inside colored chart items.

Preserves explicit label colors, checks visibility and inside placement, and assigns contrast text from item or palette colors. For colorBy=data without explicit data it builds item objects from the dataset.

Requires a chart palette and compatible series/data objects; eligible chart types and inside placements are selected by the implementation.

It can materialize series.data. Tree traversal stops at a node whose merged label is ineligible. A missing series label on the non-item path can reach an unguarded position read for default-visible chart types; do not claim universal automatic label safety.

Sets automatic contrast colors for visible labels rendered inside colored chart shapes. Explicit label colors are preserved. For data-colored series, the style follows each item's resolved color and recurses through hierarchical `children` data.

This treatment applies to supported inside-label positions and chart types.

### `echarts.coordSysLayer`

<a id="entry-echarts-coordsyslayer"></a>

Add a coordinate system layer

Create an offset decorative copy of chart geometry.

After a repaint and configured delay, clones all non-layer series into silent, unlabeled layers. All-pie charts shift centers; other charts duplicate the first grid and axes and bind copied series to them.

Requires nonempty series and palette; the pie path reads the first dataset value column, while the Cartesian path needs grid, xAxis and yAxis.

The asynchronous chart function is awaited before setOption; the function itself does not cancel its repaint/delay work when configuration changes.

Use for all-pie or ordinary Cartesian charts. Mixed/polar/geo layouts are not handled separately. String positions are interpreted numerically as percentages. Cartesian encode is rebuilt as x=0, y=series index+1.

Positional order: `colors` → `z` → `offsetX` → `offsetY` → `shadow` → `shadowColor` → `shadowBlur` → `shadowOffsetX` → `shadowOffsetY` → `border` → `borderColor` → `borderWidth` → `borderType` → `borderCap` → `borderJoin` → `borderMiterLimit` → `opacity` → `tuner` → `delay`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `colors` | `array` | Not supplied | Color set |
| `z` | `number` | `0` | z |
| `offsetX` | `number` | Not supplied | Horizontal offset |
| `offsetY` | `number` | Not supplied | Vertical offset |
| `shadow` | `dictionaryOrString` | Not supplied | Shadow |
| `shadowColor` | `dictionaryOrString` | Not supplied | Shadow color |
| `shadowBlur` | `number` | Not supplied | Shadow blur |
| `shadowOffsetX` | `number` | Not supplied | Horizontal shadow offset |
| `shadowOffsetY` | `number` | Not supplied | Vertical shadow offset |
| `border` | `string` | Not supplied | Border<br>Options: `none` |
| `borderColor` | `dictionaryOrString` | Not supplied | Border color |
| `borderWidth` | `numberOrString` | Not supplied | Border width |
| `borderType` | `string` | Not supplied | Border type |
| `borderCap` | `string` | Not supplied | Border cap type |
| `borderJoin` | `string` | Not supplied | Border join type |
| `borderMiterLimit` | `number` | Not supplied | Border miter limit |
| `opacity` | `number` | Not supplied | Opacity |
| `tuner` | `functionOrString` | Not supplied | Color tuner |
| `delay` | `number` | `50` | Delay |

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

Bar chart

Configure the standard bar-chart axes and series options.

Composes y-axis headroom, category x-axis, tooltip and shortened value labels, then maps bar dimensions, gaps, background and stacking arguments onto series.

Select the bar chart type on the chart element; this style does not set series.type.

Use itemStyle, label, hover and bg children for bar appearance. Dataset-transforming decorative presets impose additional data assumptions.

Positional order: `minHeight` → `width` → `minWidth` → `maxWidth` → `minAngle` → `gap` → `colorBy` → `showBackground` → `stack` → `stackStrategy`.

| Argument | Type | Contract |
| --- | --- | --- |
| `minHeight` | `number` | Minimum bar height<br>`{"optKey":"barMinHeight"}` |
| `width` | `numberOrString` | Bar width<br>`{"optKey":"barWidth"}` |
| `minWidth` | `number` | Minimum bar width<br>`{"optKey":"barMinWidth"}` |
| `maxWidth` | `number` | Maximum bar width<br>`{"optKey":"barMaxWidth"}` |
| `minAngle` | `number` | Minimum bar angle<br>`{"optKey":"barMinAngle"}` |
| `gap` | `string` | Gap between bars<br>`{"optKey":"barGap"}` |
| `colorBy` | `string` | Coloring strategy<br>Options: `series`, `data`<br>`{"optKey":"colorBy"}` |
| `showBackground` | `boolean` | Show background<br>`{"optKey":"showBackground"}` |
| `stack` | `string` | Stacking |
| `stackStrategy` | `string` | Stacking strategy |

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

Line chart

Configure a smooth Cartesian line chart.

Defaults to a smooth line with hidden circle symbols, category x-axis without boundary gap, value y-axis headroom and axis-triggered tooltip, then merges declared series options.

Select line as the element chart type; the style does not create data or change series.type.

Use symbol to show points, jagged to remove smoothing, areaStyle for a fill and markLine/markPoint for annotations.

The basic tooltip call passes pointer, which is not a tooltip argument; set the type argument on echarts.tooltip.pointer explicitly for a crosshair.

Positional order: `step` → `smooth` → `sampling` → `selectMode` → `stack` → `stackStrategy` → `silent`.

| Argument | Type | Contract |
| --- | --- | --- |
| `step` | `booleanOrString` | Use stepped lines |
| `smooth` | `boolean` | Smooth lines |
| `sampling` | `string` | Downsampling strategy |
| `selectMode` | `booleanOrString` | Selection mode |
| `stack` | `string` | Stacking |
| `stackStrategy` | `string` | Stacking strategy |
| `silent` | `boolean` | Ignore mouse events |

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

Pie chart

Configure pie-series geometry and layout.

Adds the basic tooltip style and maps declared pie arguments onto series; itemStyle, label and emphasis are separate child styles.

Select pie as the chart type or supply pie series separately.

The source forwards selectOffset and persentPrecision literally; it does not correct these spellings to other ECharts option keys. The inherited tooltip defaults to axis trigger; use tooltip.itemTrigger for item-triggered pie tooltips.

Positional order: `selectOffset` → `clockwise` → `startAngle` → `endAngle` → `minAngle` → `padAngle` → `minShowLabelAngle` → `avoidLabelOverlap` → `roseType` → `width` → `height` → `stillShowZeroSum` → `persentPrecision` → `cursor` → `center` → `radius` → `left` → `top` → `right` → `bottom`.

| Argument | Type | Contract |
| --- | --- | --- |
| `selectOffset` | `number` | Selected slice offset |
| `clockwise` | `boolean` | Arrange clockwise |
| `startAngle` | `number` | Start angle |
| `endAngle` | `number` | End angle |
| `minAngle` | `number` | Minimum angle |
| `padAngle` | `number` | Gap angle |
| `minShowLabelAngle` | `number` | Minimum angle for showing labels |
| `avoidLabelOverlap` | `boolean` | Avoid overlapping labels |
| `roseType` | `string` | Rose chart type<br>Options: `radius`, `area` |
| `width` | `numberOrString` | Width |
| `height` | `numberOrString` | Height |
| `stillShowZeroSum` | `boolean` | Show the pie when the total is zero |
| `persentPrecision` | `number` | Percentage precision |
| `cursor` | `string` | Cursor style |
| `center` | `array` | Center position |
| `radius` | `array` | Radius |
| `left` | `numberOrString` | Left spacing |
| `top` | `numberOrString` | Top spacing |
| `right` | `numberOrString` | Right spacing |
| `bottom` | `numberOrString` | Bottom spacing |

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

Radar chart

Convert a header-row dataset into radar series.

Uses first-column row names as indicators and each value column as one radar series value array; defaults the radar coordinate shape to circle.

Requires dataset[0].source with a header row and a matching series for each value column.

Replaces radar.indicator and each series.data during draw. Use echarts.Radar for raw coordinate configuration without this conversion.

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

Map

Style the foreground regions in the MedlarMap pipeline.

Initializes foreground and label defaults if absent, then merges map-layer options into defaultOption.top. It returns without effect on non-MedlarMap elements.

Requires MedlarMap with its region/map loading pipeline.

This mutates defaultOption; teardown removes plugin bookkeeping but does not restore the previous defaults.

Use background for context regions, state for the highlighted boundary and layer for additional decorative geography.

Positional order: `colors` → `z` → `offsetX` → `offsetY` → `shadow` → `shadowColor` → `shadowBlur` → `shadowOffsetX` → `shadowOffsetY` → `border` → `borderColor` → `borderWidth` → `borderType` → `borderCap` → `borderJoin` → `borderMiterLimit` → `opacity` → `tuner` → `showLabel` → `label` → `hover`.

| Argument | Type | Contract |
| --- | --- | --- |
| `colors` | `array` | Color set |
| `z` | `number` | z |
| `offsetX` | `number` | Horizontal map offset |
| `offsetY` | `number` | Vertical map offset |
| `shadow` | `dictionaryOrString` | Shadow |
| `shadowColor` | `dictionaryOrString` | Shadow color |
| `shadowBlur` | `number` | Shadow blur |
| `shadowOffsetX` | `number` | Horizontal shadow offset |
| `shadowOffsetY` | `number` | Vertical shadow offset |
| `border` | `string` | Border<br>Options: `none` |
| `borderColor` | `dictionaryOrString` | Border color |
| `borderWidth` | `numberOrString` | Border width |
| `borderType` | `string` | Border type |
| `borderCap` | `string` | Border cap type |
| `borderJoin` | `string` | Border join type |
| `borderMiterLimit` | `number` | Border miter limit |
| `opacity` | `number` | Opacity |
| `tuner` | `functionOrString` | Color tuner |
| `showLabel` | `boolean` | Show foreground labels |
| `label` | `dictionary` | Foreground labels |
| `hover` | `dictionary` | Highlight effect |

Geographic map chart. `Styles.echarts.map()` updates the foreground map defaults; it does not create another geo layer.

Positive offsets move the map right or down. Individual shadow fields override the corresponding shared shadow fields. JavaScript tuner callbacks receive each normalized `chroma.Color`.

Map offsets are converted through each ECharts geo coordinate system, so they remain pixel-based after zooming or resizing.
Either `showLabel: false` or `label.show: false` hides the corresponding labels. The global deferred-shadow precedence rules also apply to `label.textShadow`.

#### `echarts.map.background`

<a id="entry-echarts-map-background"></a>

Map background

Style the contextual background layer of a MedlarMap.

Initializes and merges layer and label options into defaultOption.background; non-MedlarMap elements are ignored.

Requires MedlarMap and its background-region rendering path.

Teardown removes plugin data but does not restore the previously merged background defaults.

Positional order: `colors` → `z` → `offsetX` → `offsetY` → `shadow` → `shadowColor` → `shadowBlur` → `shadowOffsetX` → `shadowOffsetY` → `border` → `borderColor` → `borderWidth` → `borderType` → `borderCap` → `borderJoin` → `borderMiterLimit` → `opacity` → `tuner` → `showLabel` → `label`.

| Argument | Type | Contract |
| --- | --- | --- |
| `colors` | `array` | Color set |
| `z` | `number` | z |
| `offsetX` | `number` | Horizontal map offset |
| `offsetY` | `number` | Vertical map offset |
| `shadow` | `dictionaryOrString` | Shadow |
| `shadowColor` | `dictionaryOrString` | Shadow color |
| `shadowBlur` | `number` | Shadow blur |
| `shadowOffsetX` | `number` | Horizontal shadow offset |
| `shadowOffsetY` | `number` | Vertical shadow offset |
| `border` | `string` | Border<br>Options: `none` |
| `borderColor` | `dictionaryOrString` | Border color |
| `borderWidth` | `numberOrString` | Border width |
| `borderType` | `string` | Border type |
| `borderCap` | `string` | Border cap type |
| `borderJoin` | `string` | Border join type |
| `borderMiterLimit` | `number` | Border miter limit |
| `opacity` | `number` | Opacity |
| `tuner` | `functionOrString` | Color tuner |
| `showLabel` | `boolean` | Show labels |
| `label` | `dictionary` | Label |

Styles the existing background layer with the same offset, palette, shadow, border, and opacity arguments as the foreground map. When omitted, `colors` is a ten-step low-chroma blue-gray ramp and `opacity` is `0.045`. Background colors are rendered with the `none` tuner; the foreground `tuner` argument is not applied to this layer.

Background labels support the same `show` and `textShadow` forms as foreground labels.

#### `echarts.map.layer`

<a id="entry-echarts-map-layer"></a>

Add an intermediate layer

Append a decorative geography layer to MedlarMap.

Builds a silent geo layer from the base geography and colored regions; merge optionally unions the colored regions into one registered geography before appending it.

Requires MedlarMap with a base geo layer; merge also requires its registered GeoJSON.

No layer is appended when merge cannot obtain geometry. Layer offsets belong to the map alignment pipeline, not CSS translation.

Positional order: `merge` → `colors` → `z` → `offsetX` → `offsetY` → `shadow` → `shadowColor` → `shadowBlur` → `shadowOffsetX` → `shadowOffsetY` → `border` → `borderColor` → `borderWidth` → `borderType` → `borderCap` → `borderJoin` → `borderMiterLimit` → `opacity` → `tuner`.

| Argument | Type | Contract |
| --- | --- | --- |
| `merge` | `boolean` | Merge |
| `colors` | `array` | Color set |
| `z` | `number` | z |
| `offsetX` | `number` | Horizontal map offset |
| `offsetY` | `number` | Vertical map offset |
| `shadow` | `dictionaryOrString` | Shadow |
| `shadowColor` | `dictionaryOrString` | Shadow color |
| `shadowBlur` | `number` | Shadow blur |
| `shadowOffsetX` | `number` | Horizontal shadow offset |
| `shadowOffsetY` | `number` | Vertical shadow offset |
| `border` | `string` | Border<br>Options: `none` |
| `borderColor` | `dictionaryOrString` | Border color |
| `borderWidth` | `numberOrString` | Border width |
| `borderType` | `string` | Border type |
| `borderCap` | `string` | Border cap type |
| `borderJoin` | `string` | Border join type |
| `borderMiterLimit` | `number` | Border miter limit |
| `opacity` | `number` | Opacity |
| `tuner` | `functionOrString` | Color tuner |

Creates an explicit replicated geo layer at render time.

Merged geometry is cached per source map and sorted region set. The layer uses the foreground map styling family, excluding `showLabel`, `label` and `hover`.

#### `echarts.map.layer.image`

<a id="entry-echarts-map-layer-image"></a>

Image layer

Fill colored map regions with an image pattern.

Loads the image asynchronously and appends a pattern-filled geo layer. Repeat defaults to repeat; useZoom defaults true only for no-repeat.

Requires MedlarMap, a nonempty image source, loaded base geography and nonzero chart/image dimensions.

The draw function awaits image loading before adding the layer; loaded canvases are cached by source.

Image offsets shift the pattern by chart-height units and are not forwarded as geometry offsets. Scaling uses the chart height when useZoom is enabled. Image-load failures propagate after logging.

Positional order: `image` → `repeat` → `colors` → `z` → `offsetX` → `offsetY` → `shadow` → `shadowColor` → `shadowBlur` → `shadowOffsetX` → `shadowOffsetY` → `border` → `borderColor` → `borderWidth` → `borderType` → `borderCap` → `borderJoin` → `borderMiterLimit` → `opacity` → `tuner` → `scaleX` → `scaleY` → `zlevel` → `useZoom`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `image` | `string` | Not supplied | Image<br>Shorthand |
| `repeat` | `string` | `repeat` | Repeat<br>Options: `repeat`, `repeat-x`, `repeat-y`, `no-repeat` |
| `colors` | `array` | Not supplied | Color set |
| `z` | `number` | Not supplied | z |
| `offsetX` | `number` | `0` | Horizontal image offset as a proportion of the map size<br>Editor hints (not runtime limits): `{"step":0.01}` |
| `offsetY` | `number` | `0` | Vertical image offset as a proportion of the map size<br>Editor hints (not runtime limits): `{"step":0.01}` |
| `shadow` | `dictionaryOrString` | Not supplied | Shadow |
| `shadowColor` | `dictionaryOrString` | Not supplied | Shadow color |
| `shadowBlur` | `number` | Not supplied | Shadow blur |
| `shadowOffsetX` | `number` | Not supplied | Horizontal shadow offset |
| `shadowOffsetY` | `number` | Not supplied | Vertical shadow offset |
| `border` | `string` | Not supplied | Border<br>Options: `none` |
| `borderColor` | `dictionaryOrString` | Not supplied | Border color |
| `borderWidth` | `numberOrString` | Not supplied | Border width |
| `borderType` | `string` | Not supplied | Border type |
| `borderCap` | `string` | Not supplied | Border cap type |
| `borderJoin` | `string` | Not supplied | Border join type |
| `borderMiterLimit` | `number` | Not supplied | Border miter limit |
| `opacity` | `number` | Not supplied | Opacity |
| `tuner` | `functionOrString` | Not supplied | Color tuner |
| `scaleX` | `number` | `1` | Horizontal image scale factor<br>Editor hints (not runtime limits): `{"min":0.01}` |
| `scaleY` | `number` | `1` | Vertical image scale factor<br>Editor hints (not runtime limits): `{"min":0.01}` |
| `zlevel` | `number` | `1` | zlevel |
| `useZoom` | `boolean` | Not supplied | Use scaling |

Creates a raster-image geo layer. The image is loaded asynchronously, cached by source across map instances, and decoded into a canvas pattern before the current draw continues. SVG sources are rejected; use PNG, JPEG, WebP, or another browser-decodable raster format.

Image offsets are fractions of map height, not pixels. Individual shadow fields override the corresponding shared shadow fields.

With `useZoom: true`, the image is initially normalized so its height matches the chart, then `scaleX` and `scaleY` are applied; the layer retains the configured map zoom and bounds. With `useZoom: false`, the pattern starts at its intrinsic canvas size, the layer zoom is fixed at `1`, and its bounding coordinates are scaled to the focused map frame. This makes the default mode suitable for repeating textures. Image layers keep their relative center and zoom synchronized with the other map geos during roam. A zoom-coupled image layer is rebuilt on chart resize so its chart-relative pattern stays aligned.

The shared style schema also exposes `colors` and `tuner`, but the raster pattern supplies its own area color and is not a tunable color palette; leave both unset for image layers.

#### `echarts.map.layer.imageSet`

<a id="entry-echarts-map-layer-imageset"></a>

Region image set

Choose an image-layer configuration for each map region.

On regionchange looks up images by the current region identifier, accepts an object with an image source, and registers an owned draw task to load and append the layer.

Requires MedlarMap and a dictionary of region identifiers to image-layer configuration objects.

Bare string values are ignored. Missing entries do not add a new task. The style responds to regionchange rather than immediately applying the current region on attachment.

Positional order: `images`.

| Argument | Type | Contract |
| --- | --- | --- |
| `images` | `dictionary` | Map region names to image layer configurations<br>Shorthand |

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

Map pseudo-3D effect

Simulate map depth with offset 2D geography layers.

Configures the foreground and composes bottom and middle layers with separate color, opacity, offset, border and shadow settings. Layer merging defaults on when that layer has an explicit color.

Requires the MedlarMap base geography and layer pipeline.

This is layered 2D geometry, not ECharts-GL extrusion. Use mergeMid/mergeBottom explicitly when regional boundaries should be retained despite a uniform color.

Positional order: `borderColor` → `borderWidth` → `color` → `colorEmphasis` → `colorMid` → `borderColorMid` → `borderWidthMid` → `opacityMid` → `offsetXMid` → `offsetYMid` → `mergeMid` → `shadowMid` → `colorBottom` → `borderColorBottom` → `borderWidthBottom` → `opacityBottom` → `offsetXBottom` → `offsetYBottom` → `mergeBottom` → `shadowBottom`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `borderColor` | `dictionaryOrString` | Not supplied | Border color |
| `borderWidth` | `number` | Not supplied | Border width |
| `color` | `dictionaryOrString` | Not supplied | Map color |
| `colorEmphasis` | `dictionaryOrString` | Not supplied | Map emphasis color |
| `colorMid` | `dictionaryOrString` | Not supplied | Primary depth layer color |
| `borderColorMid` | `dictionaryOrString` | Not supplied | Primary depth layer border color |
| `borderWidthMid` | `number` | Not supplied | Primary depth layer border width |
| `opacityMid` | `number` | `0.4` | Primary depth layer opacity |
| `offsetXMid` | `number` | Not supplied | Primary depth layer horizontal offset |
| `offsetYMid` | `number` | Runtime-determined (number) | Primary depth layer vertical offset |
| `mergeMid` | `boolean` | Not supplied | Merge the primary depth layer |
| `shadowMid` | `dictionaryOrString` | `{}` | Primary depth layer shadow color |
| `colorBottom` | `dictionaryOrString` | Not supplied | Secondary depth layer color |
| `borderColorBottom` | `dictionaryOrString` | Not supplied | Secondary depth layer border color |
| `borderWidthBottom` | `number` | Not supplied | Secondary depth layer border width |
| `opacityBottom` | `number` | `0.2` | Secondary depth layer opacity |
| `offsetXBottom` | `number` | Not supplied | Secondary depth layer horizontal offset |
| `offsetYBottom` | `number` | Runtime-determined (number) | Secondary depth layer vertical offset |
| `mergeBottom` | `boolean` | Not supplied | Merge the secondary depth layer |
| `shadowBottom` | `dictionaryOrString` | `{}` | Secondary depth layer shadow color |

Builds a foreground map plus middle and bottom replicated layers.

Supplying a middle or bottom color enables merging for that layer unless its merge setting is explicit.

#### `echarts.map.dense`

<a id="entry-echarts-map-dense"></a>

Density classification

Classify map-child density after repositioning.

On mount creates DurianDense with a pixel-resolved gap and listens for childreposition; each event computes configured density classes, attributes or variables.

Unplug removes the childreposition listener and plugin data.

The listener is event-driven and this style does not perform an immediate compute at mount.

Positional order: `gap` → `classMap` → `asAttr` → `asVar`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `gap` | `numberOrString` | `20` | Spacing threshold for considering elements dense, including units<br>Unit: `px` |
| `classMap` | `dictionary` | Runtime-determined (object) | Map density ranges to class names, such as { "dense-low": [0.1, 0.5], "dense-high": [0.5, 999] } |
| `asAttr` | `boolean` | `false` | Expose density as the jam-density attribute |
| `asVar` | `boolean` | `false` | Expose density as the --jam-density CSS variable |

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

Grid

Set Cartesian plot bounds and label containment.

Writes grid placement and dimensions; containLabel defaults true and grid background visibility defaults false.

Use the border and shadow children when showing a grid background. Grid geometry is independent of series label placement.

Positional order: `left` → `top` → `right` → `bottom` → `containLabel` → `width` → `height` → `show` → `backgroundColor`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `left` | `numberOrString` | `3%` | Left spacing |
| `top` | `numberOrString` | `8%` | Top spacing |
| `right` | `numberOrString` | `4%` | Right spacing |
| `bottom` | `numberOrString` | `2%` | Bottom spacing |
| `containLabel` | `boolean` | `true` | Include axis labels |
| `width` | `numberOrString` | Not supplied | Width |
| `height` | `numberOrString` | Not supplied | Height |
| `show` | `boolean` | `false` | Show |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |

Chart grid (plot area). Args: `left`, `top`, `right`, `bottom`, `containLabel`, `width`, `height`, `show`, `backgroundColor`. Sub-styles: `border`, `shadow`, `showBorder`.

### `echarts.title`

<a id="entry-echarts-title"></a>

Title

Configure chart title and subtitle content and placement.

Writes the title option, including text, links, alignment, visibility, background and margins; title and subtitle have separate textStyle owners.

Use title.textStyle and title.subtextStyle for typography, and position for layout.

Positional order: `text` → `link` → `target` → `subtext` → `sublink` → `subtarget` → `textAlign` → `textVerticalAlign` → `itemGap` → `triggerEvent` → `show` → `padding` → `backgroundColor` → `left` → `top` → `right` → `bottom`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `text` | `string` | Not supplied | Title text |
| `link` | `string` | Not supplied | Link |
| `target` | `string` | Not supplied | Link target |
| `subtext` | `string` | Not supplied | Subtitle text |
| `sublink` | `string` | Not supplied | Subtitle link |
| `subtarget` | `string` | Not supplied | Subtitle link target |
| `textAlign` | `string` | Not supplied | Overall horizontal alignment |
| `textVerticalAlign` | `string` | Not supplied | Overall vertical alignment |
| `itemGap` | `number` | Not supplied | Spacing between title and subtitle |
| `triggerEvent` | `boolean` | Not supplied | Trigger events |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `left` | `numberOrString` | `center` | Left spacing |
| `top` | `numberOrString` | Not supplied | Top spacing |
| `right` | `numberOrString` | Not supplied | Right spacing |
| `bottom` | `numberOrString` | Not supplied | Bottom spacing |

Chart title. Args: `text`, `link`, `target`, `subtext`, `padding`, `backgroundColor`, `show`, `left`, `top`, `right`, `bottom`. Sub-styles: `border`, `shadow`, `textStyle`, `subtextStyle`, `hide`, `center`, `position`, `titleFont`, `subtitleFont`.

### `echarts.axis`

<a id="entry-echarts-axis"></a>

Axes

Create the standard Cartesian axis type pairing.

Writes category xAxis and value yAxis. Child styles configure axis details or choose the inverse pairing.

The declared xType argument is not read by this implementation; set the type argument on echarts.axis.x to choose another type.

Positional order: `xType`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `xType` | `string` | `category` | X axis type |

Cartesian axis configuration. Access as `axis.x` or `axis.y`. For polar axes, use explicit `Styles.eopts({ option: { radiusAxis: { type: 'value' }, angleAxis: { type: 'category' } } })`. The legacy `axis.radiusAxis` and `axis.angleAxis` helpers do not implement the following full builder contract in this baseline.

Cartesian args: `type`, `name`, `nameLocation`, `nameGap`, `nameRotate`, `offset`, `inverse`, `min`, `max`, `scale`, `splitNumber`, `minInterval`, `maxInterval`, `interval`, `logBase`, `startValue`, `triggerEvent`, `boundaryGap`, `show`, `position`, `silent`.

**Variants:** `axis.hide`, `axis.flipXY`, `axis.hideLine`, `axis.hideLabel`, `axis.hideTick`, `axis.hideSplitLine`, `axis.stripy.horizontal`, `axis.stripy.vertial`, `axis.polar`, `axis.shortenValueLabel`, `axis.rotateAxisLabel`, `axis.xAxisType`, `axis.yAxisType`, `axis.angleAxis`, `axis.radiusAxis`, `axis.xLabelFont`, `axis.yLabelFont`, `axis.yAxisName`, `axis.showYSplit`.

`axis.stripy.horizontal` accepts `tickcolor` to set the horizontal stripe axis-tick color; when omitted, it leaves the normal chart-theme tick color in control. `axis.stripy.vertial` has no arguments.

`axis.y` defaults to a value axis positioned on the left.

### `echarts.tooltip`

<a id="entry-echarts-tooltip"></a>

Tooltip

Configure chart tooltips.

Writes tooltip triggering, display, formatting and positioning options, defaulting to axis trigger and confine=true; child styles configure the box, typography and axis pointer.

Use itemTrigger for per-item tooltips and pointer for crosshair/line/shadow configuration. The hide child removes the tooltip option.

Positional order: `trigger` → `showContent` → `triggerOn` → `alwaysShowContent` → `showDelay` → `hideDelay` → `enterable` → `confine` → `renderMode` → `appendToBody` → `formatter` → `position` → `backgroundColor` → `padding` → `show`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `trigger` | `string` | `axis` | Trigger type<br>Options: `item`, `axis` |
| `showContent` | `boolean` | Not supplied | Show tooltip content |
| `triggerOn` | `string` | Not supplied | Trigger condition |
| `alwaysShowContent` | `boolean` | Not supplied | Always show |
| `showDelay` | `number` | Not supplied | Tooltip show delay |
| `hideDelay` | `number` | Not supplied | Tooltip hide delay |
| `enterable` | `boolean` | Not supplied | Allow the pointer to enter the tooltip |
| `confine` | `boolean` | `true` | Confine to the chart area |
| `renderMode` | `string` | Not supplied | Render mode |
| `appendToBody` | `boolean` | Not supplied | Append to body |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `position` | `arrayOrString` | Not supplied | Position |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `padding` | `array` | Not supplied | Padding |
| `show` | `boolean` | Not supplied | Show |

Tooltip config. Args: `trigger` (item/axis/none), `showContent`, `triggerOn`, `showDelay`, `hideDelay`, `enterable`, `confine`, `formatter`, `position`, `backgroundColor`, `padding`, `show`. Sub-styles: `border`, `shadow`, `textStyle`, `pointer`, `hide`, `itemTrigger`, `tooltipFont`, `restricted`.

### `echarts.legend`

<a id="entry-echarts-legend"></a>

Legend

Configure the chart legend.

Writes legend layout, item dimensions, visibility, names and selection options; exposes text, item, line, border and shadow styling.

Use position and orient for layout. Custom data controls displayed entries and should match the intended series or item names.

Positional order: `type` → `height` → `width` → `orient` → `align` → `itemGap` → `itemWidth` → `itemHeight` → `selectedMode` → `inactiveColor` → `inactiveBorderColor` → `icon` → `data` → `show` → `padding` → `backgroundColor` → `formatter` → `left` → `top` → `right` → `bottom`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `type` | `string` | Not supplied | Legend type |
| `height` | `number` | Not supplied | Legend height |
| `width` | `number` | Not supplied | Legend width |
| `orient` | `string` | Not supplied | Legend orientation |
| `align` | `string` | Not supplied | Legend alignment |
| `itemGap` | `number` | Not supplied | Legend item spacing |
| `itemWidth` | `number` | Runtime-determined (number) | Legend width |
| `itemHeight` | `number` | Runtime-determined (number) | Legend height |
| `selectedMode` | `string` | Not supplied | Legend selection mode |
| `inactiveColor` | `string` | Not supplied | Inactive legend color |
| `inactiveBorderColor` | `string` | Not supplied | Inactive legend border color |
| `icon` | `string` | Not supplied | Legend icon |
| `data` | `array` | Not supplied | Legend data |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `left` | `numberOrString` | `center` | Left spacing |
| `top` | `numberOrString` | Not supplied | Top spacing |
| `right` | `numberOrString` | Not supplied | Right spacing |
| `bottom` | `numberOrString` | Not supplied | Bottom spacing |

Legend config. Args: `type`, `height`, `width`, `orient`, `align`, `itemGap`, `itemWidth`, `itemHeight`, `selectedMode`, `inactiveColor`, `icon`, `data`, `show`, `padding`, `backgroundColor`, `formatter`, `left`, `top`, `right`, `bottom`. Sub-styles: `border`, `shadow`, `itemStyle`, `lineStyle`, `textStyle`, `hide`, `orient`, `position`, `legendFont`.

### `echarts.label`

<a id="entry-echarts-label"></a>

Label configuration

Format the path-selected general, geographic or calendar label.

Writes alignment, visibility, formatter, rich text, dimensions, padding, background and opacity at that label owner; exposes border, shadow and textStyle children.

echarts.label writes the top-level label option; calendar day/month/year labels and geo labels have their own owners. Use series label styles for a series-specific label contract.

Positional order: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `align` | `string` | Not supplied | Horizontal text alignment |
| `verticalAlign` | `string` | Not supplied | Vertical text alignment |
| `rotate` | `number` | Not supplied | Rotation angle |
| `width` | `number` | Not supplied | Text width |
| `height` | `number` | Not supplied | Text height |
| `rich` | `dictionary` | Not supplied | Rich text |
| `lineHeight` | `number` | Not supplied | Line height |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `opacity` | `number` | Not supplied | Opacity |

Label config. Args: `align`, `verticalAlign`, `rotate`, `width`, `height`, `rich`, `lineHeight`, `backgroundColor`, `show`, `padding`, `formatter`, `opacity`. Sub-style: `hide`.

### `echarts.visualMap`

<a id="entry-echarts-visualmap"></a>

Visual mapping

Configure a visual mapping option for chart data.

Writes visualMap bounds, selected range, dimension/series selection and display settings; show defaults false.

Provide the intended series and data dimension separately; this does not derive bounds from the dataset.

outRange and hoverlink are forwarded literally rather than normalized to ECharts outOfRange/hoverLink. The argument factory also passes the imported override function instead of its argsOverrides parameter; no inferred override support is claimed.

Positional order: `type` → `min` → `max` → `range` → `inRange` → `outRange` → `calculable` → `realtime` → `inverse` → `precision` → `itemWidth` → `itemHeight` → `align` → `text` → `textGap` → `hoverlink` → `dimension` → `seriesIndex` → `unboundedRange` → `show` → `left` → `top` → `right` → `bottom`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `type` | `string` | Not supplied | Type |
| `min` | `number` | Not supplied | Minimum value |
| `max` | `number` | Not supplied | Maximum value |
| `range` | `array` | Not supplied | Value range selected by the handles |
| `inRange` | `dictionary` | Not supplied | In range |
| `outRange` | `dictionary` | Not supplied | Out of range |
| `calculable` | `boolean` | Not supplied | Show draggable handles |
| `realtime` | `boolean` | Not supplied | Update in real time |
| `inverse` | `boolean` | Not supplied | Reverse |
| `precision` | `number` | Not supplied | Precision |
| `itemWidth` | `number` | Not supplied | Graphic width |
| `itemHeight` | `number` | Not supplied | Graphic height |
| `align` | `string` | Not supplied | Alignment |
| `text` | `array` | Not supplied | Text at both ends |
| `textGap` | `number` | Not supplied | Text spacing |
| `hoverlink` | `boolean` | Not supplied | Hover linking |
| `dimension` | `number` | Not supplied | Mapping dimension |
| `seriesIndex` | `number` | Not supplied | Mapped series |
| `unboundedRange` | `boolean` | Not supplied | Allow an unbounded range |
| `show` | `boolean` | `false` | Show |
| `left` | `numberOrString` | Not supplied | Left spacing |
| `top` | `numberOrString` | Not supplied | Top spacing |
| `right` | `numberOrString` | Not supplied | Right spacing |
| `bottom` | `numberOrString` | Not supplied | Bottom spacing |

Visual map (color gradient legend).

### `echarts.geo`

<a id="entry-echarts-geo"></a>

Geographic coordinate system

Configure the geographic coordinate-system owner.

Writes geo options for map identity, navigation and layout, with separate region labels, itemStyle and emphasis children.

The named map must already be registered with ECharts; this style does not load geography.

Use MedlarMap and echarts.map for the framework region/layer pipeline; this is the lower-level geo option helper.

Positional order: `map` → `roam` → `center` → `aspectScale` → `boundingCoords` → `zoom` → `nameMap` → `nameProperty` → `selectMode` → `layoutCenter` → `layoutSize` → `show` → `left` → `top` → `right` → `bottom` → `silent`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `map` | `string` | Not supplied | Map type |
| `roam` | `booleanOrString` | Not supplied | Enable zooming and panning |
| `center` | `array` | Not supplied | Map center |
| `aspectScale` | `number` | Not supplied | Aspect ratio |
| `boundingCoords` | `array` | Not supplied | Longitude and latitude of the upper-left and lower-right map corners |
| `zoom` | `number` | Not supplied | Zoom factor |
| `nameMap` | `dictionary` | Not supplied | Custom map names |
| `nameProperty` | `string` | Not supplied | Custom name property |
| `selectMode` | `booleanOrNumber` | Not supplied | Selection mode |
| `layoutCenter` | `array` | Not supplied | Layout center |
| `layoutSize` | `number` | Not supplied | Layout size |
| `show` | `boolean` | `true` | Show |
| `left` | `numberOrString` | Not supplied | Left spacing |
| `top` | `numberOrString` | Not supplied | Top spacing |
| `right` | `numberOrString` | Not supplied | Right spacing |
| `bottom` | `numberOrString` | Not supplied | Bottom spacing |
| `silent` | `boolean` | Not supplied | Ignore mouse events |

Geographic coordinate system. Args: `map`, `roam`, `center`, `aspectScale`, `zoom`, `silent`, `show`, `left`, `top`, `right`, `bottom`. Sub-styles: `label`, `itemStyle`, `hover`.

### `echarts.calendar`

<a id="entry-echarts-calendar"></a>

Calendar coordinate system

Configure a calendar coordinate system.

Writes calendar range, dimensions, orientation, cell size and placement; child styles control date labels, cell items and split lines.

Provide a compatible series and date data separately; this style does not convert arbitrary tabular data into dates.

Positional order: `zlevel` → `z` → `width` → `height` → `range` → `cellSize` → `orient` → `left` → `top` → `right` → `bottom` → `silent`.

| Argument | Type | Contract |
| --- | --- | --- |
| `zlevel` | `number` | Layer order |
| `z` | `number` | Layer order |
| `width` | `numberOrString` | Width |
| `height` | `numberOrString` | Height |
| `range` | `arrayOrString` | Range |
| `cellSize` | `array` | Cell size |
| `orient` | `string` | Orientation |
| `left` | `numberOrString` | Left spacing |
| `top` | `numberOrString` | Top spacing |
| `right` | `numberOrString` | Right spacing |
| `bottom` | `numberOrString` | Bottom spacing |
| `silent` | `boolean` | Ignore mouse events |

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

Radar coordinate system

Configure the radar coordinate system independently of radar data conversion.

Writes the radar option, including indicators, center, radius and shape. Its children configure axis names, axis lines, labels, ticks and split regions.

Use echarts.radar for header-row dataset conversion; use echarts.Radar to customize the resulting coordinate system. Case is significant.

Positional order: `zlevel` → `z` → `center` → `radius` → `startAngle` → `nameGap` → `splitNumber` → `shape` → `scale` → `triggerEvent` → `indicator` → `silent`.

| Argument | Type | Contract |
| --- | --- | --- |
| `zlevel` | `number` | Layer order |
| `z` | `number` | Layer order |
| `center` | `array` | Center |
| `radius` | `arrayOrString` | Radius |
| `startAngle` | `number` | Start angle |
| `nameGap` | `number` | Name gap |
| `splitNumber` | `number` | Number of splits |
| `shape` | `string` | Radar shape |
| `scale` | `boolean` | Scale independently of zero |
| `triggerEvent` | `boolean` | Trigger events on axis labels |
| `indicator` | `array` | Radar indicator configuration |
| `silent` | `boolean` | Ignore mouse events |

## `echarts.animation`

<a id="entry-echarts-animation"></a>

Animation

Stagger series animation by item index.

Sets animationType and animationEasing and computes animationDelay as the item index multiplied by delay.

This does not enable every ECharts animation capability or configure update animation separately.

Positional order: `delay` → `type` → `easing`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `delay` | `number` | `100` | Delay |
| `type` | `string` | `scale` | Type |
| `easing` | `string` | `elasticOut` | Easing |

## `echarts.axis.x`

<a id="entry-echarts-axis-x"></a>

Axis configuration

Configure an individual Cartesian axis.

Writes the selected xAxis or yAxis; x defaults to category at the bottom, while y defaults to value at the left.

Use child styles for the axis name, labels, pointer, baseline, ticks and split regions.

Applying these styles also applies their defaults; choose the full axis path when changing only one axis.

Positional order: `type` → `name` → `nameLocation` → `nameGap` → `nameRotate` → `offset` → `inverse` → `min` → `max` → `scale` → `splitNumber` → `minInterval` → `maxInterval` → `interval` → `logBase` → `startValue` → `triggerEvent` → `boundaryGap` → `show` → `position` → `silent`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `type` | `string` | `category` | Type |
| `name` | `string` | Not supplied | Name |
| `nameLocation` | `string` | `end` | Name position |
| `nameGap` | `number` | Not supplied | Distance between name and axis |
| `nameRotate` | `number` | Not supplied | Name rotation angle |
| `offset` | `number` | Not supplied | Offset |
| `inverse` | `boolean` | Not supplied | Inverse axis |
| `min` | `number` | Not supplied | Minimum value |
| `max` | `number` | Not supplied | Maximum value |
| `scale` | `boolean` | Not supplied | Scale independently of zero |
| `splitNumber` | `number` | Not supplied | Number of splits |
| `minInterval` | `number` | Not supplied | Minimum interval |
| `maxInterval` | `number` | Not supplied | Maximum interval |
| `interval` | `number` | Not supplied | Interval |
| `logBase` | `number` | Not supplied | Logarithmic axis base |
| `startValue` | `number` | Not supplied | Starting tick value |
| `triggerEvent` | `boolean` | Not supplied | Trigger events on labels |
| `boundaryGap` | `booleanOrArray` | Not supplied | Boundary gap strategy |
| `show` | `boolean` | `true` | Show |
| `position` | `arrayOrString` | `bottom` | Position |
| `silent` | `boolean` | Not supplied | Ignore mouse events |

## `echarts.axis.y`

<a id="entry-echarts-axis-y"></a>

Axis configuration

Configure an individual Cartesian axis.

Writes the selected xAxis or yAxis; x defaults to category at the bottom, while y defaults to value at the left.

Use child styles for the axis name, labels, pointer, baseline, ticks and split regions.

Applying these styles also applies their defaults; choose the full axis path when changing only one axis.

Positional order: `type` → `name` → `nameLocation` → `nameGap` → `nameRotate` → `offset` → `inverse` → `min` → `max` → `scale` → `splitNumber` → `minInterval` → `maxInterval` → `interval` → `logBase` → `startValue` → `triggerEvent` → `boundaryGap` → `show` → `position` → `silent`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `type` | `string` | `value` | Type |
| `name` | `string` | Not supplied | Name |
| `nameLocation` | `string` | `end` | Name position |
| `nameGap` | `number` | Not supplied | Distance between name and axis |
| `nameRotate` | `number` | Not supplied | Name rotation angle |
| `offset` | `number` | Not supplied | Offset |
| `inverse` | `boolean` | Not supplied | Inverse axis |
| `min` | `number` | Not supplied | Minimum value |
| `max` | `number` | Not supplied | Maximum value |
| `scale` | `boolean` | Not supplied | Scale independently of zero |
| `splitNumber` | `number` | Not supplied | Number of splits |
| `minInterval` | `number` | Not supplied | Minimum interval |
| `maxInterval` | `number` | Not supplied | Maximum interval |
| `interval` | `number` | Not supplied | Interval |
| `logBase` | `number` | Not supplied | Logarithmic axis base |
| `startValue` | `number` | Not supplied | Starting tick value |
| `triggerEvent` | `boolean` | Not supplied | Trigger events on labels |
| `boundaryGap` | `booleanOrArray` | Not supplied | Boundary gap strategy |
| `show` | `boolean` | `true` | Show |
| `position` | `arrayOrString` | `left` | Position |
| `silent` | `boolean` | Not supplied | Ignore mouse events |

## `echarts.bar.bg`

<a id="entry-echarts-bar-bg"></a>

Background style

Style the background behind bars.

Writes series.backgroundStyle fill and opacity with border and shadow children.

Enable bar.showBackground separately; styling the background does not turn it on.

Positional order: `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.bar.tz`

<a id="entry-echarts-bar-tz"></a>

NiceStyle

Apply the rounded gradient bar presentation preset.

Composes the basic bar, rounded item borders, dashed y split lines, legend, tooltip and a padded grid, and attempts to install a fixed gradient palette.

The preset picks barWidth/barGap/barMinHeight from a profile whose public keys are width/gap/minHeight, and passes fontSize to a size-based helper. Its palette array enters a one-field color profile declared functionOrString, which can stringify the array; do not promise a usable gradient palette. Prefer explicit bar, textStyle and palette configuration.

Positional order: `radius` → `itemWidth` → `itemHeight` → `top`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `radius` | `array` | Runtime-determined (number) | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `itemWidth` | `number` | Runtime-determined (number) | Legend width |
| `itemHeight` | `number` | Runtime-determined (number) | Legend height |
| `top` | `numberOrString` | Runtime-determined (number) | Top spacing |

## `echarts.pie.tz`

<a id="entry-echarts-pie-tz"></a>

Ring with gaps

Apply the separated-ring pie preset.

Configures radii, center and segment padding, hides normal labels in the center and supplies a rich formatter based on the first two dataset dimensions; enables emphasis labels.

Use a pie series with category/value dimensions matching the formatter.

The default radius array is emitted as supplied by the preset. The emphasis textStyle call uses fontSize instead of the helper size argument; set label typography explicitly when needed.

Positional order: `radius` → `center` → `padAngle`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `radius` | `array` | `["100%","85%"]` | Radius |
| `center` | `array` | `["50%","50%"]` | Center position |
| `padAngle` | `number` | `5` | Gap angle |

## `echarts.axis.xxx`

<a id="entry-echarts-axis-xxx"></a>

Axis configuration

Use a value x axis.

Reuses echarts.axis.x with type=value, including that axis helper defaults.

Positional order: `nameLocation` → `show` → `position` → `type`.

| Argument | Contract |
| --- | --- |
| `nameLocation` | Captured x-axis preset axis-name placement.<br>This prebuilt style captures nameLocation=end and writes it to xAxis.nameLocation. It is not a parameterized factory; use echarts.axis.x with the nameLocation argument to customize this setting. |
| `show` | Captured x-axis preset axis visibility.<br>This prebuilt style captures show=true and writes it to xAxis.show. It is not a parameterized factory; use echarts.axis.x with the show argument to customize this setting. |
| `position` | Captured x-axis preset axis-side placement.<br>This prebuilt style captures position=bottom and writes it to xAxis.position. It is not a parameterized factory; use echarts.axis.x with the position argument to customize this setting. |
| `type` | Captured x-axis preset axis scale type.<br>This prebuilt style captures type=value and writes it to xAxis.type. It is not a parameterized factory; use echarts.axis.x with the type argument to customize this setting. |

## `echarts.axis.yyy`

<a id="entry-echarts-axis-yyy"></a>

Axis configuration

Use a category y axis.

Reuses echarts.axis.y with type=category, including that axis helper defaults.

Positional order: `nameLocation` → `show` → `position` → `type`.

| Argument | Contract |
| --- | --- |
| `nameLocation` | Captured y-axis preset axis-name placement.<br>This prebuilt style captures nameLocation=end and writes it to yAxis.nameLocation. It is not a parameterized factory; use echarts.axis.y with the nameLocation argument to customize this setting. |
| `show` | Captured y-axis preset axis visibility.<br>This prebuilt style captures show=true and writes it to yAxis.show. It is not a parameterized factory; use echarts.axis.y with the show argument to customize this setting. |
| `position` | Captured y-axis preset axis-side placement.<br>This prebuilt style captures position=left and writes it to yAxis.position. It is not a parameterized factory; use echarts.axis.y with the position argument to customize this setting. |
| `type` | Captured y-axis preset axis scale type.<br>This prebuilt style captures type=category and writes it to yAxis.type. It is not a parameterized factory; use echarts.axis.y with the type argument to customize this setting. |

## `echarts.pie.ring`

<a id="entry-echarts-pie-ring"></a>

Use a ring layout with a central emphasis label.

Removes labelLine and roseType, sets ring radii, hides the normal central label, enables a bold emphasis label and centers the title.

Supply title text separately and apply explicit geometry afterward if a different center or radius is needed.

## `echarts.axis.hide`

<a id="entry-echarts-axis-hide"></a>

Hide

Hide existing coordinate axes.

Checks the current config option for x, y, angle and radius axes and sets show=false only for those already present.

Apply after configuring axes. Use hideLine/hideLabel or explicit child visibility when only part of an axis should disappear.

## `echarts.bar.hover`

<a id="entry-echarts-bar-hover"></a>

Highlight effect

Configure the emphasis state of the selected series, mark or geo owner.

Writes the path-selected emphasis options and exposes label and itemStyle children; the line-series variant also has an emphasis lineStyle child.

focused is emitted literally as focused, not remapped to focus. Do not promise ECharts focus behavior from that argument alone.

Positional order: `disabled` → `focused` → `blurScope`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | Disabled |
| `focused` | `string` | Not supplied | Focus effect<br>Options: `none`, `self`, `series` |
| `blurScope` | `string` | Not supplied | Fade scope |

## `echarts.bar.label`

<a id="entry-echarts-bar-label"></a>

Label configuration

Place and format series or emphasis labels.

Extends common label formatting with distance, offset, minimum margin and position, then writes the selected series/emphasis label owner.

Use the parent hover style for emphasis activation; use label.textStyle only when its emitted nested textStyle shape fits the target ECharts version.

Positional order: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `distance` → `offset` → `minMargin` → `position`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `align` | `string` | Not supplied | Horizontal text alignment |
| `verticalAlign` | `string` | Not supplied | Vertical text alignment |
| `rotate` | `number` | Not supplied | Rotation angle |
| `width` | `number` | Not supplied | Text width |
| `height` | `number` | Not supplied | Text height |
| `rich` | `dictionary` | Not supplied | Rich text |
| `lineHeight` | `number` | Not supplied | Line height |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `opacity` | `number` | Not supplied | Opacity |
| `distance` | `number` | Not supplied | Distance between text and symbol |
| `offset` | `array` | Not supplied | Text offset |
| `minMargin` | `number` | Not supplied | Minimum label margin |
| `position` | `arrayOrString` | Not supplied | Position |

## `echarts.geo.hover`

<a id="entry-echarts-geo-hover"></a>

Highlight effect

Configure the emphasis state of the selected series, mark or geo owner.

Writes the path-selected emphasis options and exposes label and itemStyle children; the line-series variant also has an emphasis lineStyle child.

focused is emitted literally as focused, not remapped to focus. Do not promise ECharts focus behavior from that argument alone.

Positional order: `disabled` → `focused` → `blurScope`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | Disabled |
| `focused` | `string` | Not supplied | Focus effect<br>Options: `none`, `self`, `series` |
| `blurScope` | `string` | Not supplied | Fade scope |

## `echarts.geo.label`

<a id="entry-echarts-geo-label"></a>

Label configuration

Format the path-selected general, geographic or calendar label.

Writes alignment, visibility, formatter, rich text, dimensions, padding, background and opacity at that label owner; exposes border, shadow and textStyle children.

echarts.label writes the top-level label option; calendar day/month/year labels and geo labels have their own owners. Use series label styles for a series-specific label contract.

Positional order: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `align` | `string` | Not supplied | Horizontal text alignment |
| `verticalAlign` | `string` | Not supplied | Vertical text alignment |
| `rotate` | `number` | Not supplied | Rotation angle |
| `width` | `number` | Not supplied | Text width |
| `height` | `number` | Not supplied | Text height |
| `rich` | `dictionary` | Not supplied | Rich text |
| `lineHeight` | `number` | Not supplied | Line height |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `opacity` | `number` | Not supplied | Opacity |

## `echarts.map.state`

<a id="entry-echarts-map-state"></a>

Top-level regions

Apply the preset boundary treatment to the highlighted map region.

Replaces defaultOption.state with an itemStyle using a thin border and zero shadow blur; non-MedlarMap elements are ignored.

Teardown removes plugin data without restoring the previous state defaults.

## `echarts.pie.hover`

<a id="entry-echarts-pie-hover"></a>

Highlight effect

Configure pie emphasis and its scale effect.

Writes series.emphasis, extending the shared emphasis profile with scale and scaleSize, and exposes emphasis labels and item styling.

The shared focused argument remains literally focused; use explicit ECharts options when a verified focus property is required.

Positional order: `disabled` → `focused` → `blurScope` → `scale` → `scaleSize`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | Disabled |
| `focused` | `string` | Not supplied | Focus effect<br>Options: `none`, `self`, `series` |
| `blurScope` | `string` | Not supplied | Fade scope |
| `scale` | `boolean` | Not supplied | Enable scaling |
| `scaleSize` | `number` | Not supplied | Scale size |

## `echarts.pie.label`

<a id="entry-echarts-pie-label"></a>

Label configuration

Place and format series or emphasis labels.

Extends common label formatting with distance, offset, minimum margin and position, then writes the selected series/emphasis label owner.

Use the parent hover style for emphasis activation; use label.textStyle only when its emitted nested textStyle shape fits the target ECharts version.

Positional order: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `distance` → `offset` → `minMargin` → `position`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `align` | `string` | Not supplied | Horizontal text alignment |
| `verticalAlign` | `string` | Not supplied | Vertical text alignment |
| `rotate` | `number` | Not supplied | Rotation angle |
| `width` | `number` | Not supplied | Text width |
| `height` | `number` | Not supplied | Text height |
| `rich` | `dictionary` | Not supplied | Rich text |
| `lineHeight` | `number` | Not supplied | Line height |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `opacity` | `number` | Not supplied | Opacity |
| `distance` | `number` | Not supplied | Distance between text and symbol |
| `offset` | `array` | Not supplied | Text offset |
| `minMargin` | `number` | Not supplied | Minimum label margin |
| `position` | `arrayOrString` | Not supplied | Position |

## `echarts.Radar.max`

<a id="entry-echarts-radar-max"></a>

Radar coordinate system maximum configuration

Apply one maximum value to every existing radar indicator.

Assigns the supplied argument directly to each radar indicator max. The shared argument normalizer preserves scalar input when the style has no argument profile.

Requires a radar option with an indicator array already built.

Pass the maximum as a scalar, not an object containing a max key. Requires an existing indicator array; the helper does not derive maxima from data.

## `echarts.axis.polar`

<a id="entry-echarts-axis-polar"></a>

Polar coordinates

Convert a configured series to polar coordinates.

Deletes Cartesian axes, creates a value angleAxis and category radiusAxis with a centered polar layout, and sets series.coordinateSystem to polar.

This replaces coordinate-system options; combine only with series supported by ECharts polar coordinates and supply suitable data.

## `echarts.bar.flipXY`

<a id="entry-echarts-bar-flipxy"></a>

Swap X and Y axes

Swap the current axis pairing and move bar labels inside.

Enables series labels at insideLeft, then swaps type and data through axis.flipXY.

Requires an existing Cartesian or polar axis pair.

A default category-x/value-y pairing becomes horizontal; the inverse pairing becomes vertical. Polar axis swapping does not create a Cartesian chart.

## `echarts.label.hide`

<a id="entry-echarts-label-hide"></a>

Hide

Hide general and series labels.

Writes show=false for both the top-level label option and the shared series label option.

## `echarts.line.hover`

<a id="entry-echarts-line-hover"></a>

Highlight effect

Configure the emphasis state of the selected series, mark or geo owner.

Writes the path-selected emphasis options and exposes label and itemStyle children; the line-series variant also has an emphasis lineStyle child.

focused is emitted literally as focused, not remapped to focus. Do not promise ECharts focus behavior from that argument alone.

Positional order: `disabled` → `focused` → `blurScope`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | Disabled |
| `focused` | `string` | Not supplied | Focus effect<br>Options: `none`, `self`, `series` |
| `blurScope` | `string` | Not supplied | Fade scope |

## `echarts.line.label`

<a id="entry-echarts-line-label"></a>

Label configuration

Place and format series or emphasis labels.

Extends common label formatting with distance, offset, minimum margin and position, then writes the selected series/emphasis label owner.

Use the parent hover style for emphasis activation; use label.textStyle only when its emitted nested textStyle shape fits the target ECharts version.

Positional order: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `distance` → `offset` → `minMargin` → `position`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `align` | `string` | Not supplied | Horizontal text alignment |
| `verticalAlign` | `string` | Not supplied | Vertical text alignment |
| `rotate` | `number` | Not supplied | Rotation angle |
| `width` | `number` | Not supplied | Text width |
| `height` | `number` | Not supplied | Text height |
| `rich` | `dictionary` | Not supplied | Rich text |
| `lineHeight` | `number` | Not supplied | Line height |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `opacity` | `number` | Not supplied | Opacity |
| `distance` | `number` | Not supplied | Distance between text and symbol |
| `offset` | `array` | Not supplied | Text offset |
| `minMargin` | `number` | Not supplied | Minimum label margin |
| `position` | `arrayOrString` | Not supplied | Position |

## `echarts.line.parts`

<a id="entry-echarts-line-parts"></a>

Split the Y-axis into regions

Expand the y-axis range around the first dataset value column.

Reads column one, sets min=(3*minimum-maximum)/2 and max=(3*maximum-minimum)/2, and divides twice the data range by part for the rounded interval.

Requires a nonempty numeric header-row dataset and a yAxis object.

Only the first value column is considered. Constant/empty data and zero or invalid part are not guarded; this is not automatic scaling for every series.

Positional order: `part`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `part` | `Type` | `5` | Number of regions |

## `echarts.pie.shadow`

<a id="entry-echarts-pie-shadow"></a>

Shadow

Add a theme-default shadow to every pie item style.

At draw time merges the large theme shadow and any explicit shadow fields into every series.itemStyle.

This function visits every current series; it does not filter by series type.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.Radar.line`

<a id="entry-echarts-radar-line"></a>

Axis line configuration

Show or decorate the chosen axis baseline.

Writes axisLine visibility and endpoint-symbol properties, with a lineStyle child for the stroke. It does not control the grid split lines.

Use the matching tick and splitLine siblings to control those independently.

Positional order: `show` → `symbol` → `size` → `offset`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `show` | `boolean` | `true` | Show |
| `symbol` | `string` | Not supplied | Marker symbol<br>`{"optKey":"symbol"}` |
| `size` | `functionOrAny` | Not supplied | Marker symbol size<br>`{"optKey":"symbolSize"}` |
| `offset` | `array` | Not supplied | Marker symbol offset<br>`{"optKey":"symbolOffset"}` |

## `echarts.Radar.tick`

<a id="entry-echarts-radar-tick"></a>

Axis tick configuration

Control tick marks on the chosen axis.

Writes visibility, tick length, custom positions, interval, alignment and inside placement; the lineStyle child controls tick strokes.

Positional order: `length` → `customValues` → `alignWithLabel` → `interval` → `inside` → `show`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `length` | `number` | Not supplied | Tick length |
| `customValues` | `array` | Not supplied | Custom tick positions |
| `alignWithLabel` | `boolean` | Not supplied | Align ticks with labels |
| `interval` | `number` | Not supplied | Tick interval |
| `inside` | `boolean` | Not supplied | Place ticks inside |
| `show` | `boolean` | `true` | Show |

## `echarts.title.hide`

<a id="entry-echarts-title-hide"></a>

Hide

Hide the chart title.

Writes title.show=false while retaining other title options.

## `echarts.axis.flipXY`

<a id="entry-echarts-axis-flipxy"></a>

Swap X and Y axes

Swap type and data between an existing axis pair.

Exchanges only type and data for x/y or angle/radius axes, preferring Cartesian axes when both pairs exist.

Does not transpose the dataset or swap axis styling and bounds.

## `echarts.grid.border`

<a id="entry-echarts-grid-border"></a>

Border

Outline a grid or tooltip box.

Maps border color, width and type to the chosen owner, omitting radius, dash offset, cap, join and miter-limit arguments.

The grid may also need show=true. This variant intentionally exposes fewer fields than item and label borders.

Positional order: `color` → `width` → `type` → `border`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |

## `echarts.grid.shadow`

<a id="entry-echarts-grid-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.legend.hide`

<a id="entry-echarts-legend-hide"></a>

Hide

Remove the chart legend option.

Emits the deletion marker for legend during option merging.

This removes the option rather than only changing legend.show.

## `echarts.line.jagged`

<a id="entry-echarts-line-jagged"></a>

Straight line segments

Remove the smooth-line preset.

Emits a deletion marker for series.smooth so the merged option no longer requests smoothing.

Apply after the basic line style when angular connections are wanted.

## `echarts.line.symbol`

<a id="entry-echarts-line-symbol"></a>

Marker symbol

Configure line-series point symbols.

Maps symbol, show, size, offset and rotate to series symbol fields; show defaults true.

Use this after the basic line style to reveal symbols hidden by that preset.

Positional order: `symbol` → `show` → `size` → `offset` → `rotate`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `symbol` | `string` | Not supplied | Marker symbol<br>`{"optKey":"symbol"}` |
| `show` | `boolean` | `true` | Show marker symbols<br>`{"optKey":"showSymbol"}` |
| `size` | `functionOrAny` | Not supplied | Marker symbol size<br>`{"optKey":"symbolSize"}` |
| `offset` | `array` | Not supplied | Marker symbol offset<br>`{"optKey":"symbolOffset"}` |
| `rotate` | `functionOrAny` | Not supplied | Symbol rotation<br>`{"optKey":"symbolRotate"}` |

## `echarts.Radar.label`

<a id="entry-echarts-radar-label"></a>

Label configuration

Configure tick labels on the chosen Cartesian or radar axis.

Extends label formatting with interval, edge-label visibility, overlap handling and custom values; writes the corresponding axisLabel owner.

Use the line and tick siblings for axis strokes and tick marks; use the axis-name style for the axis title.

insideLabel is forwarded literally; this helper does not remap it to inside.

Positional order: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `interval` → `insideLabel` → `margin` → `showMinLabel` → `showMaxLabel` → `alignMinLabel` → `alignMaxLabel` → `hideOverlap` → `customValues`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `align` | `string` | Not supplied | Horizontal text alignment |
| `verticalAlign` | `string` | Not supplied | Vertical text alignment |
| `rotate` | `number` | Not supplied | Rotation angle |
| `width` | `number` | Not supplied | Text width |
| `height` | `number` | Not supplied | Text height |
| `rich` | `dictionary` | Not supplied | Rich text |
| `lineHeight` | `number` | Not supplied | Line height |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `opacity` | `number` | Not supplied | Opacity |
| `interval` | `number` | Not supplied | Label interval |
| `insideLabel` | `boolean` | Not supplied | Place labels inside |
| `margin` | `number` | Not supplied | Distance between labels and axis |
| `showMinLabel` | `boolean` | Not supplied | Show the minimum label |
| `showMaxLabel` | `boolean` | Not supplied | Show the maximum label |
| `alignMinLabel` | `string` | Not supplied | Minimum tick label alignment |
| `alignMaxLabel` | `string` | Not supplied | Maximum tick label alignment |
| `hideOverlap` | `boolean` | Not supplied | Hide overlapping labels |
| `customValues` | `array` | Not supplied | Custom label positions |

## `echarts.shadow.item`

<a id="entry-echarts-shadow-item"></a>

Apply a uniform native shadow to series items.

Writes series.itemStyle shadow offset, blur and color directly, with rem-based defaults.

Use itemStyle.shadow for theme-backed shadow dictionaries and pie.shadow for its theme-default all-series preset.

Positional order: `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `offsetX` | `number` | Runtime-determined (number) | X offset |
| `offsetY` | `number` | Runtime-determined (number) | Y offset |
| `blur` | `number` | Runtime-determined (number) | Blur |
| `color` | `string` | `hsla(0, 0%, 0%, 0.15)` | Color |

## `echarts.bar.stackBar`

<a id="entry-echarts-bar-stackbar"></a>

Stacked bar chart

Render separated stacked segments with a remaining-capacity fill.

Computes the largest row total, inserts transparent interval columns and series, appends a remaining column, sets a header-derived legend and enables a decal on the remainder.

Requires a nonempty header-row numeric dataset with matching bar series.

Replaces dataset source, series, legend and aria options. interval is a divisor of the largest total, not a time interval; zero or invalid divisors are not guarded.

Positional order: `interval` → `radius`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `interval` | `number` | `120` | Stack gap divisor |
| `radius` | `array` | `[7,7,7,7]` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |

## `echarts.label.border`

<a id="entry-echarts-label-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.label.shadow`

<a id="entry-echarts-label-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.line.avgAMax`

<a id="entry-echarts-line-avgamax"></a>

Average line and maximum value

Mark a line series average and maximum together.

Composes an average mark line without symbols and a circular maximum mark point, hiding both annotation labels.

Use the separate markLine and markPoint children when independent labels or annotation data are required.

Positional order: `size`.

| Argument | Type | Contract |
| --- | --- | --- |
| `size` | `functionOrAny` | Marker symbol size<br>`{"optKey":"symbolSize"}` |

## `echarts.pie.position`

<a id="entry-echarts-pie-position"></a>

Position

Set pie center and inner/outer radii together.

Maps innerR and outerR into series.radius and cX/cY into series.center, with percentage-string defaults.

A nonzero inner radius produces a ring; use explicit values when composing with ring or other presets that also write radii.

Positional order: `innerR` → `outerR` → `cX` → `cY`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `innerR` | `string` | `0%` | Inner radius |
| `outerR` | `string` | `75%` | Outer radius |
| `cX` | `string` | `50%` | X-axis |
| `cY` | `string` | `50%` | Y-axis |

## `echarts.pie.roseType`

<a id="entry-echarts-pie-rosetype"></a>

Choose a rose-pie encoding.

Writes series.roseType from type, defaulting to radius and offering radius or area.

Use with a pie series. Applying pie.ring removes roseType during option merging.

Positional order: `type`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `type` | `string` | `radius` | Rose chart type<br>Options: `radius`, `area` |

## `echarts.title.border`

<a id="entry-echarts-title-border"></a>

Border

Outline the title or legend container.

Writes the selected title/legend border fields including radius; omits cap, join, miter limit and dash offset.

Use textStyle.stroke for glyph outlines and itemStyle.border for legend-marker outlines.

Positional order: `color` → `width` → `type` → `radius` → `border`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |

## `echarts.title.center`

<a id="entry-echarts-title-center"></a>

Centered

Center the title over the chart.

Sets title top and left to center and z to 10, also emitting a title-level fontSize value.

Used by pie.ring for central content; set title.text separately.

The preset emits fontSize at title level rather than title.textStyle; configure title typography through textStyle.

## `echarts.title.shadow`

<a id="entry-echarts-title-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.tooltip.hide`

<a id="entry-echarts-tooltip-hide"></a>

Hide

Remove the tooltip option.

Emits the deletion marker for tooltip during option merging.

## `echarts.axis.hideLine`

<a id="entry-echarts-axis-hideline"></a>

Hide axis baselines.

A scalar axis-name string selects that axis; with no string selector, the helper emits optional axisLine show=false options for x, y, angle, and radius axes.

Use a single axis-name string for selection. Arrays or objects are not unpacked as axis selectors; with no scalar string they fall back to all four axis families.

## `echarts.axis.hideTick`

<a id="entry-echarts-axis-hidetick"></a>

Hide axis ticks.

A scalar axis-name string selects that axis; with no string selector, the helper emits optional axisTick show=false options for x, y, angle, and radius axes.

Use a single axis-name string for selection. Arrays or objects are not unpacked as axis selectors; with no scalar string they fall back to all four axis families.

## `echarts.bar.itemStyle`

<a id="entry-echarts-bar-itemstyle"></a>

Item style

Style the selected chart item, map region, legend marker or emphasis item.

Writes color and opacity to the path-selected itemStyle, with border and shadow children for the same owner.

Choose the full path for normal versus emphasis state. Series item styling and geo or calendar styling affect different owners.

Positional order: `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.geo.itemStyle`

<a id="entry-echarts-geo-itemstyle"></a>

Item style

Style the selected chart item, map region, legend marker or emphasis item.

Writes color and opacity to the path-selected itemStyle, with border and shadow children for the same owner.

Choose the full path for normal versus emphasis state. Series item styling and geo or calendar styling affect different owners.

Positional order: `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.legend.border`

<a id="entry-echarts-legend-border"></a>

Border

Outline the title or legend container.

Writes the selected title/legend border fields including radius; omits cap, join, miter limit and dash offset.

Use textStyle.stroke for glyph outlines and itemStyle.border for legend-marker outlines.

Positional order: `color` → `width` → `type` → `radius` → `border`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |

## `echarts.legend.orient`

<a id="entry-echarts-legend-orient"></a>

Orientation

Choose legend arrangement direction.

Writes legend.orient, defaulting to horizontal.

Positional order: `orient`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `orient` | `string` | `horizontal` | Orientation |

## `echarts.legend.shadow`

<a id="entry-echarts-legend-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.line.markLine`

<a id="entry-echarts-line-markline"></a>

Mark line

Add reference-line annotations to series.

Writes markLine data, symbols, precision and silent behavior; children style its label, stroke, emphasis and animation.

Use avg for an average annotation or x/y for a reference at a given axis value.

Positional order: `precision` → `data` → `silent` → `symbol` → `size`.

| Argument | Type | Contract |
| --- | --- | --- |
| `precision` | `number` | Precision |
| `data` | `array` | Data<br>Shorthand |
| `silent` | `boolean` | Ignore mouse events |
| `symbol` | `string` | Marker symbol<br>`{"optKey":"symbol"}` |
| `size` | `functionOrAny` | Marker symbol size<br>`{"optKey":"symbolSize"}` |

## `echarts.pie.itemStyle`

<a id="entry-echarts-pie-itemstyle"></a>

Item style

Style the selected chart item, map region, legend marker or emphasis item.

Writes color and opacity to the path-selected itemStyle, with border and shadow children for the same owner.

Choose the full path for normal versus emphasis state. Series item styling and geo or calendar styling affect different owners.

Positional order: `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.axis.angleAxis`

<a id="entry-echarts-axis-angleaxis"></a>

Identify the legacy angleAxis type helper.

Its single callback parameter is assigned to angleAxis.type, but the option plugin calls callbacks with the host element first.

A usable type-argument mapping is not established. Prefer explicit x/y axis type arguments or raw polar options. radiusAxis also overrides the earlier full radius-axis builder export.

## `echarts.axis.hideLabel`

<a id="entry-echarts-axis-hidelabel"></a>

Hide axis labels.

A scalar axis-name string selects that axis; with no string selector, the helper emits optional axisLabel show=false options for x, y, angle, and radius axes.

Use a single axis-name string for selection. Arrays or objects are not unpacked as axis selectors; with no scalar string they fall back to all four axis families.

## `echarts.axis.xAxisType`

<a id="entry-echarts-axis-xaxistype"></a>

Identify the legacy xAxis type helper.

Its single callback parameter is assigned to xAxis.type, but the option plugin calls callbacks with the host element first.

A usable type-argument mapping is not established. Prefer explicit x/y axis type arguments or raw polar options. radiusAxis also overrides the earlier full radius-axis builder export.

## `echarts.axis.yAxisName`

<a id="entry-echarts-axis-yaxisname"></a>

Add a preset y-axis title.

Writes yAxis.name and nameLocation, plus a right-aligned, weighted nameTextStyle with fixed padding and nameGap.

This also emits fontSize as a percentage string. Use y.nameStyle and y.nameStyle.textStyle for explicit supported styling.

Positional order: `name` → `position` → `align` → `vertial` → `color` → `family`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `name` | `string` | Not supplied | Name |
| `position` | `string` | `end` | Position |
| `align` | `string` | `right` | Alignment |
| `vertial` | `string` | `top` | Vertical alignment |
| `color` | `string` | Not supplied | Color |
| `family` | `string` | `sans-serif , Arial` | Font family |

## `echarts.axis.yAxisType`

<a id="entry-echarts-axis-yaxistype"></a>

Identify the legacy yAxis type helper.

Its single callback parameter is assigned to yAxis.type, but the option plugin calls callbacks with the host element first.

A usable type-argument mapping is not established. Prefer explicit x/y axis type arguments or raw polar options. radiusAxis also overrides the earlier full radius-axis builder export.

## `echarts.bar.gradientBg`

<a id="entry-echarts-bar-gradientbg"></a>

Fill bars with palette-derived vertical gradients.

For every current series, merges an itemStyle color gradient derived from its palette entry, adjusting saturation, lightness and hue.

Requires a palette entry for each series.

The callback does not filter series types; despite the name it changes itemStyle, not backgroundStyle.

## `echarts.line.animation`

<a id="entry-echarts-line-animation"></a>

Animation

Control line-series entry animation.

Maps enabled state, delay, duration and easing onto series animation fields, with a default duration of 3000 milliseconds and no type argument.

Positional order: `animation` → `delay` → `duration` → `easing`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `animation` | `boolean` | `true` | Enable animation<br>`{"optKey":"animation"}` |
| `delay` | `number` | Not supplied | Animation delay<br>`{"optKey":"animationDelay"}` |
| `duration` | `number` | `3000` | Animation duration<br>`{"optKey":"animationDuration"}` |
| `easing` | `string` | Not supplied | Animation easing<br>Options: `linear`, `quadraticIn`, `quadraticOut`<br>`{"optKey":"animationEasing"}` |

## `echarts.line.areaStyle`

<a id="entry-echarts-line-areastyle"></a>

Area style

Fill the area under a line series.

Writes series.areaStyle color, opacity and orient, with a shadow child.

Use line.lineStyle for the stroke and gradientBg for the palette-derived fill preset; this helper does not change series data.

Positional order: `color` → `opacity` → `orient`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |
| `orient` | `numberOrString` | Origin position |

## `echarts.line.bigSymbol`

<a id="entry-echarts-line-bigsymbol"></a>

Large icon

Emphasize line-series point symbols.

Applies symbol settings with a large circular default and hides the y axis and x baseline/ticks.

The declared smooth argument is not forwarded to the line-series option here; set the smooth argument on echarts.line separately.

Positional order: `symbol` → `size` → `show` → `smooth`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `symbol` | `string` | `circle` | Marker symbol<br>`{"optKey":"symbol"}` |
| `size` | `functionOrAny` | Runtime-determined (number) | Marker symbol size<br>Shorthand<br>`{"optKey":"symbolSize"}` |
| `show` | `boolean` | `true` | Show marker symbols<br>`{"optKey":"showSymbol"}` |
| `smooth` | `boolean` | Not supplied | Smooth lines |

## `echarts.line.itemStyle`

<a id="entry-echarts-line-itemstyle"></a>

Item style

Style the selected chart item, map region, legend marker or emphasis item.

Writes color and opacity to the path-selected itemStyle, with border and shadow children for the same owner.

Choose the full path for normal versus emphasis state. Series item styling and geo or calendar styling affect different owners.

Positional order: `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.line.lineStyle`

<a id="entry-echarts-line-linestyle"></a>

Line style

Style an existing chart, axis, tick, pointer or split-line stroke.

Writes line color, width, dash pattern, caps, joins and opacity at the path-selected lineStyle owner; exposes a shadow child. echarts.line.lineStyle supplies a dashed default.

This does not enable hidden parent lines or create data. A series line, emphasis line and coordinate-system line retain different owners.

Positional order: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `width` | `number` | Not supplied | Line width |
| `type` | `string` | `dashed` | Line type |
| `dashOffset` | `number` | Not supplied | Dash offset |
| `cap` | `string` | Not supplied | Line cap type |
| `join` | `string` | Not supplied | Line join type |
| `miterLimit` | `number` | Not supplied | Miter limit ratio |
| `color` | `functionOrString` | Not supplied | Color |
| `opacity` | `number` | Not supplied | Opacity |

## `echarts.line.markPoint`

<a id="entry-echarts-line-markpoint"></a>

Mark point

Add point annotations to series.

Writes markPoint data, symbol settings and silent behavior, with label, itemStyle, emphasis and animation children.

Use max/min for built-in extrema or provide data for custom annotations.

Positional order: `data` → `silent` → `symbol` → `size` → `offset` → `rotate`.

| Argument | Type | Contract |
| --- | --- | --- |
| `data` | `array` | Data<br>Shorthand |
| `silent` | `boolean` | Ignore mouse events |
| `symbol` | `string` | Marker symbol<br>`{"optKey":"symbol"}` |
| `size` | `functionOrAny` | Marker symbol size<br>`{"optKey":"symbolSize"}` |
| `offset` | `array` | Marker symbol offset<br>`{"optKey":"symbolOffset"}` |
| `rotate` | `functionOrAny` | Symbol rotation<br>`{"optKey":"symbolRotate"}` |

## `echarts.Radar.axisName`

<a id="entry-echarts-radar-axisname"></a>

Radar indicator name configuration

Format radar indicator names.

Writes radar.axisName, including visibility, formatter, rich text and box dimensions; border, shadow and textStyle children affect the same axis-name owner.

Positional order: `width` → `height` → `rich` → `lineHeight` → `padding` → `backgroundColor` → `show` → `formatter`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `width` | `number` | Not supplied | Name width |
| `height` | `number` | Not supplied | Name height |
| `rich` | `dictionary` | Not supplied | Rich text |
| `lineHeight` | `number` | Not supplied | Line height |
| `padding` | `array` | Not supplied | Padding |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `show` | `boolean` | `true` | Show |
| `formatter` | `functionOrString` | Not supplied | Formatter |

## `echarts.title.position`

<a id="entry-echarts-title-position"></a>

Title position

Place the chart title.

Writes all four title margins and padding through the position helper; title padding defaults to a top inset of 10.

Positional order: `top` → `left` → `bottom` → `right` → `padding`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `top` | `string` | `auto` | Top spacing |
| `left` | `string` | `auto` | Left spacing |
| `bottom` | `string` | `auto` | Bottom spacing |
| `right` | `string` | `auto` | Right spacing |
| `padding` | `array` | `[10,0,0,0]` | Padding |

## `echarts.tooltip.border`

<a id="entry-echarts-tooltip-border"></a>

Border

Outline a grid or tooltip box.

Maps border color, width and type to the chosen owner, omitting radius, dash offset, cap, join and miter-limit arguments.

The grid may also need show=true. This variant intentionally exposes fewer fields than item and label borders.

Positional order: `color` → `width` → `type` → `border`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |

## `echarts.tooltip.shadow`

<a id="entry-echarts-tooltip-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.animation.scale`

<a id="entry-echarts-animation-scale"></a>

Scale

Apply the elastic scale animation preset.

Composes echarts.animation with scale type and elasticOut easing, retaining its index-based delay.

## `echarts.axis.radiusAxis`

<a id="entry-echarts-axis-radiusaxis"></a>

Identify the legacy radiusAxis type helper.

Its single callback parameter is assigned to radiusAxis.type, but the option plugin calls callbacks with the host element first.

A usable type-argument mapping is not established. Prefer explicit x/y axis type arguments or raw polar options. radiusAxis also overrides the earlier full radius-axis builder export.

## `echarts.axis.showYSplit`

<a id="entry-echarts-axis-showysplit"></a>

Show alternating y-axis bands with split lines.

Enables yAxis splitArea at every interval and yAxis splitLine with a solid stroke; assigns the supplied band colors.

lineColor is emitted as splitLine.lineStyle.borderColor rather than color. Set the color argument on echarts.axis.y.splitLine.lineStyle for the mapped stroke color.

Positional order: `color` → `lineColor`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `array` | Color |
| `lineColor` | `arrayOrString` | Border color |

## `echarts.axis.xLabelFont`

<a id="entry-echarts-axis-xlabelfont"></a>

X axis label font

Set x-axis label typography with the legacy font helper.

Writes fontStyle, fontWeight, fontFamily and fontSize directly into xAxis.axisLabel, defaulting size to 0.8rem converted to pixels.

Positional order: `style` → `weight` → `family` → `size`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `style` | `string` | `normal` | Style |
| `weight` | `string` | `normal` | Font weight |
| `family` | `string` | `sans-serif, Arial` | Font family |
| `size` | `number` | Runtime-determined (number) | Size |

## `echarts.axis.yLabelFont`

<a id="entry-echarts-axis-ylabelfont"></a>

Y axis label font

Set y-axis label typography with the legacy font helper.

Writes fontStyle, fontWeight, fontFamily and fontSize directly into yAxis.axisLabel, defaulting size to 0.8rem converted to pixels.

Positional order: `style` → `weight` → `family` → `size`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `style` | `string` | `normal` | Style |
| `weight` | `string` | `normal` | Font weight |
| `family` | `string` | `sans-serif, Arial` | Font family |
| `size` | `number` | Runtime-determined (number) | Size |

## `echarts.bar.floatingBar`

<a id="entry-echarts-bar-floatingbar"></a>

Floating bar chart

Display bars floating around the rounded average.

For a header-row dataset with exactly two columns, replaces the dataset with invisible offset and visible value columns stacked together; optionally marks extrema and hides both axes.

Requires dataset[0].source, exactly two header columns, numeric values and existing Cartesian axes.

It replaces series and tooltip configuration. Each lower offset is rounded-average minus half the value; unsupported column counts return without this transformation.

Positional order: `show` → `size` → `offset` → `iconColor` → `labelColor`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `show` | `boolean` | `true` | Show marker symbols<br>`{"optKey":"showSymbol"}` |
| `size` | `functionOrAny` | Runtime-determined (number) | Marker symbol size<br>`{"optKey":"symbolSize"}` |
| `offset` | `array` | `["0%","100%"]` | Marker symbol offset<br>`{"optKey":"symbolOffset"}` |
| `iconColor` | `string` | `hsl(0,0%,100%)` | Marker symbol color |
| `labelColor` | `string` | `blue` | Symbol label color |

## `echarts.grid.showBorder`

<a id="entry-echarts-grid-showborder"></a>

Show border

Show the plot frame while hiding axis baseline strokes.

Enables grid.show, sets grid.borderWidth and makes x/y axis-line colors transparent.

The color argument is emitted as grid.color, not grid.borderColor; set the color argument on echarts.grid.border for the mapped frame color. This also modifies both Cartesian axis lines.

Positional order: `color` → `borderWidth`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `color` | `string` | Not supplied | Border color |
| `borderWidth` | `number` | `1` | Border width |

## `echarts.label.textStyle`

<a id="entry-echarts-label-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.legend.position`

<a id="entry-echarts-legend-position"></a>

Position

Place the legend within the chart.

Writes top, left, bottom, right and padding together; unspecified sides default to auto.

Applying the helper also writes its defaults; set all positioning values that should be retained.

Positional order: `top` → `left` → `bottom` → `right` → `padding`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `top` | `string` | `auto` | Top |
| `left` | `string` | `auto` | Left |
| `bottom` | `string` | `auto` | Bottom |
| `right` | `string` | `auto` | Right |
| `padding` | `array` | `[0,0,0,0]` | Padding |

## `echarts.line.gradientBg`

<a id="entry-echarts-line-gradientbg"></a>

Fill line areas with palette-derived fading gradients.

Assigns each series an areaStyle gradient fading toward the current light/dark background direction.

Requires matching series palette entries.

Replaces each series areaStyle object and does not filter the series type.

## `echarts.Radar.splitArea`

<a id="entry-echarts-radar-splitarea"></a>

Split area style

Show radar split-area bands.

Writes radar.splitArea.show and exposes areaStyle for the band fill.

Combine with Radar.splitLine for boundaries between bands.

Positional order: `show`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `show` | `boolean` | `true` | Show |

## `echarts.Radar.splitLine`

<a id="entry-echarts-radar-splitline"></a>

Split lines

Control split-line visibility for radar or calendar coordinates.

Writes show to radar.splitLine or calendar.splitLine and exposes the matching lineStyle child.

Use the owner-specific child for stroke appearance; data-series lines are separate.

Positional order: `show`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `show` | `boolean` | `true` | Show |

## `echarts.title.textStyle`

<a id="entry-echarts-title-textstyle"></a>

Text style

Configure title, subtitle or tooltip typography.

Writes font properties, overflow behavior, line height and dimensions to the selected textStyle/subtextStyle owner, with glyph-border and text-shadow children.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color` → `lineHeight` → `width` → `height`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |
| `lineHeight` | `number` | Text line height |
| `width` | `number` | Text width |
| `height` | `number` | Text height |

## `echarts.title.titleFont`

<a id="entry-echarts-title-titlefont"></a>

Title font

Set title typography with the legacy font helper.

Writes fontStyle, fontWeight, fontFamily and fontSize into title.textStyle.

Positional order: `style` → `weight` → `family` → `size`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `style` | `string` | `normal` | Style |
| `weight` | `string` | `normal` | Font weight |
| `family` | `string` | `sans-serif, Arial` | Font family |
| `size` | `number` | Runtime-determined (number) | Size |

## `echarts.tooltip.pointer`

<a id="entry-echarts-tooltip-pointer"></a>

Axis pointer configuration

Configure a tooltip or axis pointer.

Writes the corresponding axisPointer option and provides label, lineStyle, shadowStyle and handle children.

Use tooltip.pointer for tooltip-owned pointer behavior and x/y.pointer for an individual axis; select the pointer type on the parent.

Positional order: `type` → `snap` → `z` → `triggerEmphasis` → `triggerTooltip` → `value` → `status` → `show`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `type` | `string` | Not supplied | Type |
| `snap` | `boolean` | Not supplied | Snap automatically |
| `z` | `number` | Not supplied | Layer order |
| `triggerEmphasis` | `boolean` | Not supplied | Trigger highlighting |
| `triggerTooltip` | `boolean` | Not supplied | Trigger tooltip |
| `value` | `string` | Not supplied | Default handle value |
| `status` | `string` | Not supplied | Pointer status |
| `show` | `boolean` | `true` | Show |

## `echarts.legend.itemStyle`

<a id="entry-echarts-legend-itemstyle"></a>

Item style

Style the selected chart item, map region, legend marker or emphasis item.

Writes color and opacity to the path-selected itemStyle, with border and shadow children for the same owner.

Choose the full path for normal versus emphasis state. Series item styling and geo or calendar styling affect different owners.

Positional order: `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.legend.lineStyle`

<a id="entry-echarts-legend-linestyle"></a>

Line style

Style legend line markers.

Writes legend.lineStyle with line stroke options plus inactive color and inactive border color; exposes shadow styling.

Use legend.itemStyle for filled markers and legend.textStyle for captions.

Positional order: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity` → `inactiveColor` → `inactiveBorderColor`.

| Argument | Type | Contract |
| --- | --- | --- |
| `width` | `number` | Line width |
| `type` | `string` | Line type |
| `dashOffset` | `number` | Dash offset |
| `cap` | `string` | Line cap type |
| `join` | `string` | Line join type |
| `miterLimit` | `number` | Miter limit ratio |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |
| `inactiveColor` | `string` | Inactive legend color |
| `inactiveBorderColor` | `string` | Inactive legend border color |

## `echarts.legend.textStyle`

<a id="entry-echarts-legend-textstyle"></a>

Text style

Style legend captions.

Writes legend.textStyle typography, line height, width, height and padding, with glyph stroke and text-shadow children.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color` → `lineHeight` → `width` → `height` → `padding`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |
| `lineHeight` | `number` | Text line height |
| `width` | `number` | Text width |
| `height` | `number` | Text height |
| `padding` | `array` | Padding |

## `echarts.pie.doubleCircle`

<a id="entry-echarts-pie-doublecircle"></a>

Double ring chart

Render two segmented concentric progress rings.

Replaces data of the first two series with nominal 48-part rings and fixes their radii; the active counts use source[1][1]/source[2][1] and source[1][2]/source[2][1].

Requires a header-row dataset with at least two value columns, both referenced data rows, two pie series, two palette colors and a valid nonzero denominator.

Ratios are not clamped: values above the denominator may generate more than 48 active segments. The top argument is not forwarded. This is a specific two-value display, not an arbitrary nested-pie builder.

Positional order: `top`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `top` | `numberOrString` | `2%` | Top spacing |

## `echarts.bar.maxHightLight`

<a id="entry-echarts-bar-maxhightlight"></a>

Highlight the maximum value

Emphasize maximum values within each bar series.

Converts each dataset value column to per-item data, fades other items to the configured opacity and preserves the palette color for tied maxima; also hides y axis and x baseline/ticks.

Requires a header-row dataset, palette entries, matching series and an xAxis object.

The maximum accumulator starts at -1, so an all-negative column below -1 is not highlighted correctly. Opacity outside zero through one falls back to 0.2.

Positional order: `opacity`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `opacity` | `number` | `0.2` | Dimmed color opacity<br>Shorthand |

## `echarts.calendar.dayLabel`

<a id="entry-echarts-calendar-daylabel"></a>

Label configuration

Format the path-selected general, geographic or calendar label.

Writes alignment, visibility, formatter, rich text, dimensions, padding, background and opacity at that label owner; exposes border, shadow and textStyle children.

echarts.label writes the top-level label option; calendar day/month/year labels and geo labels have their own owners. Use series label styles for a series-specific label contract.

Positional order: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `align` | `string` | Not supplied | Horizontal text alignment |
| `verticalAlign` | `string` | Not supplied | Vertical text alignment |
| `rotate` | `number` | Not supplied | Rotation angle |
| `width` | `number` | Not supplied | Text width |
| `height` | `number` | Not supplied | Text height |
| `rich` | `dictionary` | Not supplied | Rich text |
| `lineHeight` | `number` | Not supplied | Line height |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `opacity` | `number` | Not supplied | Opacity |

## `echarts.legend.legendFont`

<a id="entry-echarts-legend-legendfont"></a>

Legend font

Set legend typography with the legacy font helper.

Writes fontStyle, fontWeight, fontFamily and fontSize into legend.textStyle.

Positional order: `style` → `weight` → `family` → `size`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `style` | `string` | `normal` | Style |
| `weight` | `string` | `normal` | Font weight |
| `family` | `string` | `sans-serif, Arial` | Font family |
| `size` | `number` | Runtime-determined (number) | Size |

## `echarts.tooltip.textStyle`

<a id="entry-echarts-tooltip-textstyle"></a>

Text style

Configure title, subtitle or tooltip typography.

Writes font properties, overflow behavior, line height and dimensions to the selected textStyle/subtextStyle owner, with glyph-border and text-shadow children.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color` → `lineHeight` → `width` → `height`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |
| `lineHeight` | `number` | Text line height |
| `width` | `number` | Text width |
| `height` | `number` | Text height |

## `echarts.axis.hideSplitLine`

<a id="entry-echarts-axis-hidesplitline"></a>

Hide axis split lines.

A scalar axis-name string selects that axis; with no string selector, the helper emits optional splitLine show=false options for x, y, angle, and radius axes.

Use a single axis-name string for selection. Arrays or objects are not unpacked as axis selectors; with no scalar string they fall back to all four axis families.

## `echarts.calendar.itemStyle`

<a id="entry-echarts-calendar-itemstyle"></a>

Item style

Style the selected chart item, map region, legend marker or emphasis item.

Writes color and opacity to the path-selected itemStyle, with border and shadow children for the same owner.

Choose the full path for normal versus emphasis state. Series item styling and geo or calendar styling affect different owners.

Positional order: `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.calendar.splitLine`

<a id="entry-echarts-calendar-splitline"></a>

Split lines

Control split-line visibility for radar or calendar coordinates.

Writes show to radar.splitLine or calendar.splitLine and exposes the matching lineStyle child.

Use the owner-specific child for stroke appearance; data-series lines are separate.

Positional order: `show`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `show` | `boolean` | `true` | Show |

## `echarts.calendar.yearLabel`

<a id="entry-echarts-calendar-yearlabel"></a>

Label configuration

Format the path-selected general, geographic or calendar label.

Writes alignment, visibility, formatter, rich text, dimensions, padding, background and opacity at that label owner; exposes border, shadow and textStyle children.

echarts.label writes the top-level label option; calendar day/month/year labels and geo labels have their own owners. Use series label styles for a series-specific label contract.

Positional order: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `align` | `string` | Not supplied | Horizontal text alignment |
| `verticalAlign` | `string` | Not supplied | Vertical text alignment |
| `rotate` | `number` | Not supplied | Rotation angle |
| `width` | `number` | Not supplied | Text width |
| `height` | `number` | Not supplied | Text height |
| `rich` | `dictionary` | Not supplied | Rich text |
| `lineHeight` | `number` | Not supplied | Line height |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `opacity` | `number` | Not supplied | Opacity |

## `echarts.title.subtextStyle`

<a id="entry-echarts-title-subtextstyle"></a>

Text style

Configure title, subtitle or tooltip typography.

Writes font properties, overflow behavior, line height and dimensions to the selected textStyle/subtextStyle owner, with glyph-border and text-shadow children.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color` → `lineHeight` → `width` → `height`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |
| `lineHeight` | `number` | Text line height |
| `width` | `number` | Text width |
| `height` | `number` | Text height |

## `echarts.title.subtitleFont`

<a id="entry-echarts-title-subtitlefont"></a>

Subtitle font

Identify the legacy subtitle-font helper and its current limitation.

The helper writes font fields under title[副标题字体], rather than title.subtextStyle.

Do not rely on this helper for subtitle typography; use echarts.title.subtextStyle. The mismatched output key is preserved here, not repaired by metadata.

Positional order: `style` → `weight` → `family` → `size`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `style` | `string` | `normal` | Style |
| `weight` | `string` | `normal` | Font weight |
| `family` | `string` | `sans-serif, Arial` | Font family |
| `size` | `number` | Runtime-determined (number) | Size |

## `echarts.tooltip.restricted`

<a id="entry-echarts-tooltip-restricted"></a>

Keep tooltip placement confined to the chart.

Writes tooltip.confine=true without changing its content or trigger.

## `echarts.calendar.monthLabel`

<a id="entry-echarts-calendar-monthlabel"></a>

Label configuration

Format the path-selected general, geographic or calendar label.

Writes alignment, visibility, formatter, rich text, dimensions, padding, background and opacity at that label owner; exposes border, shadow and textStyle children.

echarts.label writes the top-level label option; calendar day/month/year labels and geo labels have their own owners. Use series label styles for a series-specific label contract.

Positional order: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `align` | `string` | Not supplied | Horizontal text alignment |
| `verticalAlign` | `string` | Not supplied | Vertical text alignment |
| `rotate` | `number` | Not supplied | Rotation angle |
| `width` | `number` | Not supplied | Text width |
| `height` | `number` | Not supplied | Text height |
| `rich` | `dictionary` | Not supplied | Rich text |
| `lineHeight` | `number` | Not supplied | Line height |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `opacity` | `number` | Not supplied | Opacity |

## `echarts.pie.electronicScale`

<a id="entry-echarts-pie-electronicscale"></a>

Electronic scale

Render a segmented semicircular progress scale with a pointer.

Uses source[1][1]/source[2][1] to compute an angle, replaces the first series with 24 equal segments and appends a background pie and a silent polar scatter pointer.

Requires the two referenced numeric dataset values, a nonzero denominator, a pie series and a palette color.

The angle is reduced modulo 180, so a full ratio wraps to zero rather than stopping at the end. Ratios are not validated or clamped. This replaces coordinate options and series presentation and hides tooltip content.

Positional order: `iconSize` → `pointerSize`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `iconSize` | `array` | `[10,20]` | Icon size<br>Shorthand |
| `pointerSize` | `array` | `[5,10]` | Pointer size<br>Shorthand |

## `echarts.tooltip.itemTrigger`

<a id="entry-echarts-tooltip-itemtrigger"></a>

Show tooltips for individual data items.

Composes the basic tooltip helper with trigger=item, retaining its other defaults such as confinement.

## `echarts.tooltip.tooltipFont`

<a id="entry-echarts-tooltip-tooltipfont"></a>

Tooltip font

Identify the legacy tooltip-font helper and its current limitation.

The helper writes font fields under a top-level 字体.textStyle object rather than tooltip.textStyle.

Use echarts.tooltip.textStyle for tooltip typography. The top-legend array entry 2 aliases this same legacy helper.

Positional order: `style` → `weight` → `family` → `size`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `style` | `string` | `normal` | Style |
| `weight` | `string` | `normal` | Font weight |
| `family` | `string` | `sans-serif, Arial` | Font family |
| `size` | `number` | Runtime-determined (number) | Size |

## `echarts.axis.rotateAxisLabel`

<a id="entry-echarts-axis-rotateaxislabel"></a>

Identify the legacy axis-label rotation helper.

The callback compares its first parameter with x/y, although the option plugin supplies the host element in that position.

Do not promise positional rotation behavior. Set the rotate argument on echarts.axis.x.label or echarts.axis.y.label.

## `echarts.bar.votageLevelColor`

<a id="entry-echarts-bar-votagelevelcolor"></a>

Color by voltage level

Color one bar series from category names.

Only when exactly one series exists, reads dataset rows into explicit name/value items and derives each item color from its category name, optionally using a fading gradient.

Requires a header-row dataset whose first column contains resolvable color names or framework color identities and whose second column is numeric.

The exported spelling is votageLevelColor. It does not enforce a voltage domain, and multiple series skip the transformation.

Positional order: `gradient`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `gradient` | `boolean` | `false` | Use a gradient<br>Shorthand |

## `echarts.bar.singleSwitchStyle`

<a id="entry-echarts-bar-singleswitchstyle"></a>

Switch-like style for a single series

Place a full-height background bar behind a single value column.

For at most two header columns, appends a bg column computed from the maximum, clones the first series behind it, overlaps bars and disables background tooltip/emphasis.

Provide a header-row dataset with one numeric value column and existing first bar series.

Mutates the dataset in place and appends a series; positive maxima are assumed by the logarithmic rounding formula. Wider datasets skip the background transformation.

Positional order: `color` → `width` → `radius` → `bgColor`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `color` | `string` | `hsl(0,0%,100%)` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | `5` | Border width<br>`{"optKey":"borderWidth"}` |
| `radius` | `array` | `[15,15,15,15]` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `bgColor` | `string` | `lightgray` | Background color |

## `echarts.title.subtitlePostion`

<a id="entry-echarts-title-subtitlepostion"></a>

Subtitle position

Set the spacing between title and subtitle.

Writes title.itemGap, defaulting to 10.

The exported spelling is subtitlePostion; this sets the gap rather than independent subtitle coordinates.

Positional order: `itemGap`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `itemGap` | `number` | `10` | Gap |

## `echarts.axis.shortenValueLabel`

<a id="entry-echarts-axis-shortenvaluelabel"></a>

Abbreviate the first value axis with thousands notation.

Finds the first value axis among x, y, angle and radius; values at least 1000 are rounded to whole thousands with a K suffix.

Replaces that axis label formatter. Negative values and values below 1000 are returned unchanged.

## `echarts.axis.x.line`

<a id="entry-echarts-axis-x-line"></a>

Axis line configuration

Show or decorate the chosen axis baseline.

Writes axisLine visibility and endpoint-symbol properties, with a lineStyle child for the stroke. It does not control the grid split lines.

Use the matching tick and splitLine siblings to control those independently.

Positional order: `show` → `symbol` → `size` → `offset`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `show` | `boolean` | `true` | Show |
| `symbol` | `string` | Not supplied | Marker symbol<br>`{"optKey":"symbol"}` |
| `size` | `functionOrAny` | Not supplied | Marker symbol size<br>`{"optKey":"symbolSize"}` |
| `offset` | `array` | Not supplied | Marker symbol offset<br>`{"optKey":"symbolOffset"}` |

## `echarts.axis.x.tick`

<a id="entry-echarts-axis-x-tick"></a>

Axis tick configuration

Control tick marks on the chosen axis.

Writes visibility, tick length, custom positions, interval, alignment and inside placement; the lineStyle child controls tick strokes.

Positional order: `length` → `customValues` → `alignWithLabel` → `interval` → `inside` → `show`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `length` | `number` | Not supplied | Tick length |
| `customValues` | `array` | Not supplied | Custom tick positions |
| `alignWithLabel` | `boolean` | Not supplied | Align ticks with labels |
| `interval` | `number` | Not supplied | Tick interval |
| `inside` | `boolean` | Not supplied | Place ticks inside |
| `show` | `boolean` | `true` | Show |

## `echarts.axis.y.line`

<a id="entry-echarts-axis-y-line"></a>

Axis line configuration

Show or decorate the chosen axis baseline.

Writes axisLine visibility and endpoint-symbol properties, with a lineStyle child for the stroke. It does not control the grid split lines.

Use the matching tick and splitLine siblings to control those independently.

Positional order: `show` → `symbol` → `size` → `offset`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `show` | `boolean` | `true` | Show |
| `symbol` | `string` | Not supplied | Marker symbol<br>`{"optKey":"symbol"}` |
| `size` | `functionOrAny` | Not supplied | Marker symbol size<br>`{"optKey":"symbolSize"}` |
| `offset` | `array` | Not supplied | Marker symbol offset<br>`{"optKey":"symbolOffset"}` |

## `echarts.axis.y.tick`

<a id="entry-echarts-axis-y-tick"></a>

Axis tick configuration

Control tick marks on the chosen axis.

Writes visibility, tick length, custom positions, interval, alignment and inside placement; the lineStyle child controls tick strokes.

Positional order: `length` → `customValues` → `alignWithLabel` → `interval` → `inside` → `show`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `length` | `number` | Not supplied | Tick length |
| `customValues` | `array` | Not supplied | Custom tick positions |
| `alignWithLabel` | `boolean` | Not supplied | Align ticks with labels |
| `interval` | `number` | Not supplied | Tick interval |
| `inside` | `boolean` | Not supplied | Place ticks inside |
| `show` | `boolean` | `true` | Show |

## `echarts.axis.x.label`

<a id="entry-echarts-axis-x-label"></a>

Label configuration

Configure tick labels on the chosen Cartesian or radar axis.

Extends label formatting with interval, edge-label visibility, overlap handling and custom values; writes the corresponding axisLabel owner.

Use the line and tick siblings for axis strokes and tick marks; use the axis-name style for the axis title.

insideLabel is forwarded literally; this helper does not remap it to inside.

Positional order: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `interval` → `insideLabel` → `margin` → `showMinLabel` → `showMaxLabel` → `alignMinLabel` → `alignMaxLabel` → `hideOverlap` → `customValues`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `align` | `string` | Not supplied | Horizontal text alignment |
| `verticalAlign` | `string` | Not supplied | Vertical text alignment |
| `rotate` | `number` | Not supplied | Rotation angle |
| `width` | `number` | Not supplied | Text width |
| `height` | `number` | Not supplied | Text height |
| `rich` | `dictionary` | Not supplied | Rich text |
| `lineHeight` | `number` | Not supplied | Line height |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `opacity` | `number` | Not supplied | Opacity |
| `interval` | `number` | Not supplied | Label interval |
| `insideLabel` | `boolean` | Not supplied | Place labels inside |
| `margin` | `number` | Not supplied | Distance between labels and axis |
| `showMinLabel` | `boolean` | Not supplied | Show the minimum label |
| `showMaxLabel` | `boolean` | Not supplied | Show the maximum label |
| `alignMinLabel` | `string` | Not supplied | Minimum tick label alignment |
| `alignMaxLabel` | `string` | Not supplied | Maximum tick label alignment |
| `hideOverlap` | `boolean` | Not supplied | Hide overlapping labels |
| `customValues` | `array` | Not supplied | Custom label positions |

## `echarts.axis.y.label`

<a id="entry-echarts-axis-y-label"></a>

Label configuration

Configure tick labels on the chosen Cartesian or radar axis.

Extends label formatting with interval, edge-label visibility, overlap handling and custom values; writes the corresponding axisLabel owner.

Use the line and tick siblings for axis strokes and tick marks; use the axis-name style for the axis title.

insideLabel is forwarded literally; this helper does not remap it to inside.

Positional order: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `interval` → `insideLabel` → `margin` → `showMinLabel` → `showMaxLabel` → `alignMinLabel` → `alignMaxLabel` → `hideOverlap` → `customValues`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `align` | `string` | Not supplied | Horizontal text alignment |
| `verticalAlign` | `string` | Not supplied | Vertical text alignment |
| `rotate` | `number` | Not supplied | Rotation angle |
| `width` | `number` | Not supplied | Text width |
| `height` | `number` | Not supplied | Text height |
| `rich` | `dictionary` | Not supplied | Rich text |
| `lineHeight` | `number` | Not supplied | Line height |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `opacity` | `number` | Not supplied | Opacity |
| `interval` | `number` | Not supplied | Label interval |
| `insideLabel` | `boolean` | Not supplied | Place labels inside |
| `margin` | `number` | Not supplied | Distance between labels and axis |
| `showMinLabel` | `boolean` | Not supplied | Show the minimum label |
| `showMaxLabel` | `boolean` | Not supplied | Show the maximum label |
| `alignMinLabel` | `string` | Not supplied | Minimum tick label alignment |
| `alignMaxLabel` | `string` | Not supplied | Maximum tick label alignment |
| `hideOverlap` | `boolean` | Not supplied | Hide overlapping labels |
| `customValues` | `array` | Not supplied | Custom label positions |

## `echarts.bar.bg.border`

<a id="entry-echarts-bar-bg-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.bar.bg.shadow`

<a id="entry-echarts-bar-bg-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.x.pointer`

<a id="entry-echarts-axis-x-pointer"></a>

Axis pointer configuration

Configure a tooltip or axis pointer.

Writes the corresponding axisPointer option and provides label, lineStyle, shadowStyle and handle children.

Use tooltip.pointer for tooltip-owned pointer behavior and x/y.pointer for an individual axis; select the pointer type on the parent.

Positional order: `type` → `snap` → `z` → `triggerEmphasis` → `triggerTooltip` → `value` → `status` → `show`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `type` | `string` | Not supplied | Type |
| `snap` | `boolean` | Not supplied | Snap automatically |
| `z` | `number` | Not supplied | Layer order |
| `triggerEmphasis` | `boolean` | Not supplied | Trigger highlighting |
| `triggerTooltip` | `boolean` | Not supplied | Trigger tooltip |
| `value` | `string` | Not supplied | Default handle value |
| `status` | `string` | Not supplied | Pointer status |
| `show` | `boolean` | `true` | Show |

## `echarts.axis.y.pointer`

<a id="entry-echarts-axis-y-pointer"></a>

Axis pointer configuration

Configure a tooltip or axis pointer.

Writes the corresponding axisPointer option and provides label, lineStyle, shadowStyle and handle children.

Use tooltip.pointer for tooltip-owned pointer behavior and x/y.pointer for an individual axis; select the pointer type on the parent.

Positional order: `type` → `snap` → `z` → `triggerEmphasis` → `triggerTooltip` → `value` → `status` → `show`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `type` | `string` | Not supplied | Type |
| `snap` | `boolean` | Not supplied | Snap automatically |
| `z` | `number` | Not supplied | Layer order |
| `triggerEmphasis` | `boolean` | Not supplied | Trigger highlighting |
| `triggerTooltip` | `boolean` | Not supplied | Trigger tooltip |
| `value` | `string` | Not supplied | Default handle value |
| `status` | `string` | Not supplied | Pointer status |
| `show` | `boolean` | `true` | Show |

## `echarts.bar.hover.label`

<a id="entry-echarts-bar-hover-label"></a>

Label configuration

Place and format series or emphasis labels.

Extends common label formatting with distance, offset, minimum margin and position, then writes the selected series/emphasis label owner.

Use the parent hover style for emphasis activation; use label.textStyle only when its emitted nested textStyle shape fits the target ECharts version.

Positional order: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `distance` → `offset` → `minMargin` → `position`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `align` | `string` | Not supplied | Horizontal text alignment |
| `verticalAlign` | `string` | Not supplied | Vertical text alignment |
| `rotate` | `number` | Not supplied | Rotation angle |
| `width` | `number` | Not supplied | Text width |
| `height` | `number` | Not supplied | Text height |
| `rich` | `dictionary` | Not supplied | Rich text |
| `lineHeight` | `number` | Not supplied | Line height |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `opacity` | `number` | Not supplied | Opacity |
| `distance` | `number` | Not supplied | Distance between text and symbol |
| `offset` | `array` | Not supplied | Text offset |
| `minMargin` | `number` | Not supplied | Minimum label margin |
| `position` | `arrayOrString` | Not supplied | Position |

## `echarts.geo.hover.label`

<a id="entry-echarts-geo-hover-label"></a>

Label configuration

Place and format series or emphasis labels.

Extends common label formatting with distance, offset, minimum margin and position, then writes the selected series/emphasis label owner.

Use the parent hover style for emphasis activation; use label.textStyle only when its emitted nested textStyle shape fits the target ECharts version.

Positional order: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `distance` → `offset` → `minMargin` → `position`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `align` | `string` | Not supplied | Horizontal text alignment |
| `verticalAlign` | `string` | Not supplied | Vertical text alignment |
| `rotate` | `number` | Not supplied | Rotation angle |
| `width` | `number` | Not supplied | Text width |
| `height` | `number` | Not supplied | Text height |
| `rich` | `dictionary` | Not supplied | Rich text |
| `lineHeight` | `number` | Not supplied | Line height |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `opacity` | `number` | Not supplied | Opacity |
| `distance` | `number` | Not supplied | Distance between text and symbol |
| `offset` | `array` | Not supplied | Text offset |
| `minMargin` | `number` | Not supplied | Minimum label margin |
| `position` | `arrayOrString` | Not supplied | Position |

## `echarts.line.markLine.x`

<a id="entry-echarts-line-markline-x"></a>

X-axis mark line

Add a reference line at an x-axis value.

Writes one markLine item with xAxis and optional yValue/caption metadata, then formats the label from those values.

y is label metadata, not a second endpoint. A zero y value is omitted from the extra label text because the formatter uses a truthiness check.

Positional order: `x` → `y` → `cap` → `position` → `rotate`.

| Argument | Type | Contract |
| --- | --- | --- |
| `x` | `string` | X value |
| `y` | `number` | Y value |
| `cap` | `string` | Additional text description |
| `position` | `arrayOrString` | Position |
| `rotate` | `number` | Rotation angle |

## `echarts.line.markLine.y`

<a id="entry-echarts-line-markline-y"></a>

Y-axis mark line

Add a reference line at a y-axis value.

Writes one markLine item with yAxis and optional caption metadata, formatting the label from the value and caption.

Positional order: `y` → `cap` → `position` → `rotate`.

| Argument | Type | Contract |
| --- | --- | --- |
| `y` | `number` | Y value |
| `cap` | `string` | Additional text description |
| `position` | `arrayOrString` | Position |
| `rotate` | `number` | Rotation angle |

## `echarts.pie.hover.label`

<a id="entry-echarts-pie-hover-label"></a>

Label configuration

Place and format series or emphasis labels.

Extends common label formatting with distance, offset, minimum margin and position, then writes the selected series/emphasis label owner.

Use the parent hover style for emphasis activation; use label.textStyle only when its emitted nested textStyle shape fits the target ECharts version.

Positional order: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `distance` → `offset` → `minMargin` → `position`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `align` | `string` | Not supplied | Horizontal text alignment |
| `verticalAlign` | `string` | Not supplied | Vertical text alignment |
| `rotate` | `number` | Not supplied | Rotation angle |
| `width` | `number` | Not supplied | Text width |
| `height` | `number` | Not supplied | Text height |
| `rich` | `dictionary` | Not supplied | Rich text |
| `lineHeight` | `number` | Not supplied | Line height |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `opacity` | `number` | Not supplied | Opacity |
| `distance` | `number` | Not supplied | Distance between text and symbol |
| `offset` | `array` | Not supplied | Text offset |
| `minMargin` | `number` | Not supplied | Minimum label margin |
| `position` | `arrayOrString` | Not supplied | Position |

## `echarts.axis.x.nameStyle`

<a id="entry-echarts-axis-x-namestyle"></a>

Axis name style

Style an axis-name box.

Writes alignment, dimensions, line height, background, opacity and padding into the selected axis nameTextStyle. Typography, border and shadow children target the same owner.

Set the axis name on echarts.axis.x or y; this child does not supply the title text.

Positional order: `align` → `verticalAlign` → `width` → `height` → `lineHeight` → `backgroundColor` → `opacity` → `padding`.

| Argument | Type | Contract |
| --- | --- | --- |
| `align` | `string` | Horizontal text alignment |
| `verticalAlign` | `string` | Vertical text alignment |
| `width` | `number` | Text width |
| `height` | `number` | Text height |
| `lineHeight` | `number` | Line height |
| `backgroundColor` | `functionOrString` | Background color |
| `opacity` | `number` | Opacity |
| `padding` | `array` | Padding |

## `echarts.axis.x.splitArea`

<a id="entry-echarts-axis-x-splitarea"></a>

Split area style

Show split-area bands on one Cartesian axis.

Writes the selected axis splitArea visibility and interval; the areaStyle child controls its fill.

Combine with splitLine when both fill bands and boundaries are wanted.

Positional order: `show` → `interval`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `show` | `boolean` | `true` | Show |
| `interval` | `number` | Not supplied | Split area display interval |

## `echarts.axis.x.splitLine`

<a id="entry-echarts-axis-x-splitline"></a>

Split lines

Show grid split lines on one Cartesian axis.

Writes the selected axis splitLine visibility and interval; its lineStyle child controls the stroke.

Use axis.line for the baseline instead of grid lines.

Positional order: `show` → `interval`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `show` | `boolean` | `true` | Show |
| `interval` | `number` | Not supplied | Split line display interval |

## `echarts.axis.y.nameStyle`

<a id="entry-echarts-axis-y-namestyle"></a>

Axis name style

Style an axis-name box.

Writes alignment, dimensions, line height, background, opacity and padding into the selected axis nameTextStyle. Typography, border and shadow children target the same owner.

Set the axis name on echarts.axis.x or y; this child does not supply the title text.

Positional order: `align` → `verticalAlign` → `width` → `height` → `lineHeight` → `backgroundColor` → `opacity` → `padding`.

| Argument | Type | Contract |
| --- | --- | --- |
| `align` | `string` | Horizontal text alignment |
| `verticalAlign` | `string` | Vertical text alignment |
| `width` | `number` | Text width |
| `height` | `number` | Text height |
| `lineHeight` | `number` | Line height |
| `backgroundColor` | `functionOrString` | Background color |
| `opacity` | `number` | Opacity |
| `padding` | `array` | Padding |

## `echarts.axis.y.splitArea`

<a id="entry-echarts-axis-y-splitarea"></a>

Split area style

Show split-area bands on one Cartesian axis.

Writes the selected axis splitArea visibility and interval; the areaStyle child controls its fill.

Combine with splitLine when both fill bands and boundaries are wanted.

Positional order: `show` → `interval`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `show` | `boolean` | `true` | Show |
| `interval` | `number` | Not supplied | Split area display interval |

## `echarts.axis.y.splitLine`

<a id="entry-echarts-axis-y-splitline"></a>

Split lines

Show grid split lines on one Cartesian axis.

Writes the selected axis splitLine visibility and interval; its lineStyle child controls the stroke.

Use axis.line for the baseline instead of grid lines.

Positional order: `show` → `interval`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `show` | `boolean` | `true` | Show |
| `interval` | `number` | Not supplied | Split line display interval |

## `echarts.bar.label.border`

<a id="entry-echarts-bar-label-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.bar.label.shadow`

<a id="entry-echarts-bar-label-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.geo.label.border`

<a id="entry-echarts-geo-label-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.geo.label.shadow`

<a id="entry-echarts-geo-label-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.line.hover.label`

<a id="entry-echarts-line-hover-label"></a>

Label configuration

Place and format series or emphasis labels.

Extends common label formatting with distance, offset, minimum margin and position, then writes the selected series/emphasis label owner.

Use the parent hover style for emphasis activation; use label.textStyle only when its emitted nested textStyle shape fits the target ECharts version.

Positional order: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `distance` → `offset` → `minMargin` → `position`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `align` | `string` | Not supplied | Horizontal text alignment |
| `verticalAlign` | `string` | Not supplied | Vertical text alignment |
| `rotate` | `number` | Not supplied | Rotation angle |
| `width` | `number` | Not supplied | Text width |
| `height` | `number` | Not supplied | Text height |
| `rich` | `dictionary` | Not supplied | Rich text |
| `lineHeight` | `number` | Not supplied | Line height |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `opacity` | `number` | Not supplied | Opacity |
| `distance` | `number` | Not supplied | Distance between text and symbol |
| `offset` | `array` | Not supplied | Text offset |
| `minMargin` | `number` | Not supplied | Minimum label margin |
| `position` | `arrayOrString` | Not supplied | Position |

## `echarts.pie.label.border`

<a id="entry-echarts-pie-label-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.pie.label.shadow`

<a id="entry-echarts-pie-label-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.line.label.border`

<a id="entry-echarts-line-label-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.line.label.shadow`

<a id="entry-echarts-line-label-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.line.markLine.avg`

<a id="entry-echarts-line-markline-avg"></a>

Add an average reference line.

Sets markLine data to a named average annotation and formats its label as name plus value; position and rotation configure the label.

The annotation name is fixed in the implementation; use markLine.data for custom naming or multiple references.

Positional order: `position` → `rotate`.

| Argument | Type | Contract |
| --- | --- | --- |
| `position` | `arrayOrString` | Position |
| `rotate` | `number` | Rotation angle |

## `echarts.line.markPoint.max`

<a id="entry-echarts-line-markpoint-max"></a>

Maximum value

Mark the series maximum.

Writes one markPoint item with type max and a fixed name, with configurable symbol and symbol size.

Positional order: `symbol` → `size`.

| Argument | Type | Contract |
| --- | --- | --- |
| `symbol` | `string` | Marker symbol<br>Shorthand<br>`{"optKey":"symbol"}` |
| `size` | `functionOrAny` | Marker symbol size<br>`{"optKey":"symbolSize"}` |

## `echarts.line.markPoint.min`

<a id="entry-echarts-line-markpoint-min"></a>

Minimum value

Mark the series minimum.

Writes one markPoint item with type min and a fixed name, with configurable symbol and symbol size.

Positional order: `symbol` → `size`.

| Argument | Type | Contract |
| --- | --- | --- |
| `symbol` | `string` | Marker symbol<br>Shorthand<br>`{"optKey":"symbol"}` |
| `size` | `functionOrAny` | Marker symbol size<br>`{"optKey":"symbolSize"}` |

## `echarts.Radar.label.border`

<a id="entry-echarts-radar-label-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.Radar.label.shadow`

<a id="entry-echarts-radar-label-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.stripy.vertial`

<a id="entry-echarts-axis-stripy-vertial"></a>

Vertical zebra stripes

Add vertical background bands to Cartesian charts.

Hides y-axis split lines and enables xAxis.splitArea with interval zero.

The exported spelling is vertial. This does not independently set x-axis tick or baseline visibility.

## `echarts.bar.hover.itemStyle`

<a id="entry-echarts-bar-hover-itemstyle"></a>

Item style

Style the selected chart item, map region, legend marker or emphasis item.

Writes color and opacity to the path-selected itemStyle, with border and shadow children for the same owner.

Choose the full path for normal versus emphasis state. Series item styling and geo or calendar styling affect different owners.

Positional order: `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.bar.label.textStyle`

<a id="entry-echarts-bar-label-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.geo.hover.itemStyle`

<a id="entry-echarts-geo-hover-itemstyle"></a>

Item style

Style the selected chart item, map region, legend marker or emphasis item.

Writes color and opacity to the path-selected itemStyle, with border and shadow children for the same owner.

Choose the full path for normal versus emphasis state. Series item styling and geo or calendar styling affect different owners.

Positional order: `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.geo.label.textStyle`

<a id="entry-echarts-geo-label-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.line.markLine.hover`

<a id="entry-echarts-line-markline-hover"></a>

Highlight effect

Configure the emphasis state of the selected series, mark or geo owner.

Writes the path-selected emphasis options and exposes label and itemStyle children; the line-series variant also has an emphasis lineStyle child.

focused is emitted literally as focused, not remapped to focus. Do not promise ECharts focus behavior from that argument alone.

Positional order: `disabled` → `focused` → `blurScope`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | Disabled |
| `focused` | `string` | Not supplied | Focus effect<br>Options: `none`, `self`, `series` |
| `blurScope` | `string` | Not supplied | Fade scope |

## `echarts.line.markLine.label`

<a id="entry-echarts-line-markline-label"></a>

Label configuration

Format mark-line or mark-point labels.

Writes the chosen annotation label with ordinary label formatting, distance and position, plus border, shadow and typography children.

Positional order: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `distance` → `position`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `align` | `string` | Not supplied | Horizontal text alignment |
| `verticalAlign` | `string` | Not supplied | Vertical text alignment |
| `rotate` | `number` | Not supplied | Rotation angle |
| `width` | `number` | Not supplied | Text width |
| `height` | `number` | Not supplied | Text height |
| `rich` | `dictionary` | Not supplied | Rich text |
| `lineHeight` | `number` | Not supplied | Line height |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `opacity` | `number` | Not supplied | Opacity |
| `distance` | `number` | Not supplied | Distance between text and symbol |
| `position` | `arrayOrString` | Not supplied | Position |

## `echarts.pie.hover.itemStyle`

<a id="entry-echarts-pie-hover-itemstyle"></a>

Item style

Style the selected chart item, map region, legend marker or emphasis item.

Writes color and opacity to the path-selected itemStyle, with border and shadow children for the same owner.

Choose the full path for normal versus emphasis state. Series item styling and geo or calendar styling affect different owners.

Positional order: `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.pie.label.textStyle`

<a id="entry-echarts-pie-label-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.bar.itemStyle.border`

<a id="entry-echarts-bar-itemstyle-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.bar.itemStyle.shadow`

<a id="entry-echarts-bar-itemstyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.geo.itemStyle.border`

<a id="entry-echarts-geo-itemstyle-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.geo.itemStyle.shadow`

<a id="entry-echarts-geo-itemstyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.line.hover.itemStyle`

<a id="entry-echarts-line-hover-itemstyle"></a>

Item style

Style the selected chart item, map region, legend marker or emphasis item.

Writes color and opacity to the path-selected itemStyle, with border and shadow children for the same owner.

Choose the full path for normal versus emphasis state. Series item styling and geo or calendar styling affect different owners.

Positional order: `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.line.hover.lineStyle`

<a id="entry-echarts-line-hover-linestyle"></a>

Line style

Style an existing chart, axis, tick, pointer or split-line stroke.

Writes line color, width, dash pattern, caps, joins and opacity at the path-selected lineStyle owner; exposes a shadow child. echarts.line.lineStyle supplies a dashed default.

This does not enable hidden parent lines or create data. A series line, emphasis line and coordinate-system line retain different owners.

Positional order: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `width` | `number` | Line width |
| `type` | `string` | Line type |
| `dashOffset` | `number` | Dash offset |
| `cap` | `string` | Line cap type |
| `join` | `string` | Line join type |
| `miterLimit` | `number` | Miter limit ratio |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.line.label.textStyle`

<a id="entry-echarts-line-label-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.line.markPoint.hover`

<a id="entry-echarts-line-markpoint-hover"></a>

Highlight effect

Configure the emphasis state of the selected series, mark or geo owner.

Writes the path-selected emphasis options and exposes label and itemStyle children; the line-series variant also has an emphasis lineStyle child.

focused is emitted literally as focused, not remapped to focus. Do not promise ECharts focus behavior from that argument alone.

Positional order: `disabled` → `focused` → `blurScope`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | Disabled |
| `focused` | `string` | Not supplied | Focus effect<br>Options: `none`, `self`, `series` |
| `blurScope` | `string` | Not supplied | Fade scope |

## `echarts.line.markPoint.label`

<a id="entry-echarts-line-markpoint-label"></a>

Label configuration

Format mark-line or mark-point labels.

Writes the chosen annotation label with ordinary label formatting, distance and position, plus border, shadow and typography children.

Positional order: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `distance` → `position`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `align` | `string` | Not supplied | Horizontal text alignment |
| `verticalAlign` | `string` | Not supplied | Vertical text alignment |
| `rotate` | `number` | Not supplied | Rotation angle |
| `width` | `number` | Not supplied | Text width |
| `height` | `number` | Not supplied | Text height |
| `rich` | `dictionary` | Not supplied | Rich text |
| `lineHeight` | `number` | Not supplied | Line height |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `opacity` | `number` | Not supplied | Opacity |
| `distance` | `number` | Not supplied | Distance between text and symbol |
| `position` | `arrayOrString` | Not supplied | Position |

## `echarts.pie.itemStyle.border`

<a id="entry-echarts-pie-itemstyle-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.pie.itemStyle.shadow`

<a id="entry-echarts-pie-itemstyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.Radar.line.lineStyle`

<a id="entry-echarts-radar-line-linestyle"></a>

Line style

Style an existing chart, axis, tick, pointer or split-line stroke.

Writes line color, width, dash pattern, caps, joins and opacity at the path-selected lineStyle owner; exposes a shadow child. echarts.line.lineStyle supplies a dashed default.

This does not enable hidden parent lines or create data. A series line, emphasis line and coordinate-system line retain different owners.

Positional order: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `width` | `number` | Line width |
| `type` | `string` | Line type |
| `dashOffset` | `number` | Dash offset |
| `cap` | `string` | Line cap type |
| `join` | `string` | Line join type |
| `miterLimit` | `number` | Miter limit ratio |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.Radar.tick.lineStyle`

<a id="entry-echarts-radar-tick-linestyle"></a>

Line style

Style an existing chart, axis, tick, pointer or split-line stroke.

Writes line color, width, dash pattern, caps, joins and opacity at the path-selected lineStyle owner; exposes a shadow child. echarts.line.lineStyle supplies a dashed default.

This does not enable hidden parent lines or create data. A series line, emphasis line and coordinate-system line retain different owners.

Positional order: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `width` | `number` | Line width |
| `type` | `string` | Line type |
| `dashOffset` | `number` | Dash offset |
| `cap` | `string` | Line cap type |
| `join` | `string` | Line join type |
| `miterLimit` | `number` | Miter limit ratio |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.line.areaStyle.shadow`

<a id="entry-echarts-line-areastyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.line.itemStyle.border`

<a id="entry-echarts-line-itemstyle-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.line.itemStyle.shadow`

<a id="entry-echarts-line-itemstyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.line.lineStyle.shadow`

<a id="entry-echarts-line-linestyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.Radar.axisName.border`

<a id="entry-echarts-radar-axisname-border"></a>

Border

Outline the box around an axis name.

Maps border arguments onto radar.axisName or xAxis/yAxis.nameTextStyle according to the selected path. This variant omits cap, join and miter-limit controls.

Use the textStyle.stroke child to outline glyphs instead of the surrounding name box.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |

## `echarts.Radar.axisName.shadow`

<a id="entry-echarts-radar-axisname-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.Radar.label.textStyle`

<a id="entry-echarts-radar-label-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.tooltip.pointer.label`

<a id="entry-echarts-tooltip-pointer-label"></a>

Label configuration

Format the value label attached to a pointer.

Writes the pointer label, extending ordinary label options with precision and margin. Border, shadow and textStyle are separate children.

Positional order: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `precision` → `margin`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `align` | `string` | Not supplied | Horizontal text alignment |
| `verticalAlign` | `string` | Not supplied | Vertical text alignment |
| `rotate` | `number` | Not supplied | Rotation angle |
| `width` | `number` | Not supplied | Text width |
| `height` | `number` | Not supplied | Text height |
| `rich` | `dictionary` | Not supplied | Rich text |
| `lineHeight` | `number` | Not supplied | Line height |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `opacity` | `number` | Not supplied | Opacity |
| `precision` | `numberOrString` | Not supplied | Precision |
| `margin` | `number` | Not supplied | Distance between labels and axis |

## `echarts.axis.stripy.horizontal`

<a id="entry-echarts-axis-stripy-horizontal"></a>

Horizontal zebra stripes

Add horizontal background bands to Cartesian charts.

Shows y-axis ticks and baseline, hides y split lines and enables y splitArea at every interval; tickcolor sets the tick stroke color.

Positional order: `tickcolor`.

| Argument | Type | Contract |
| --- | --- | --- |
| `tickcolor` | `string` | Tick line color |

## `echarts.label.textStyle.shadow`

<a id="entry-echarts-label-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.label.textStyle.stroke`

<a id="entry-echarts-label-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.title.textStyle.shadow`

<a id="entry-echarts-title-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.title.textStyle.stroke`

<a id="entry-echarts-title-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.tooltip.pointer.handle`

<a id="entry-echarts-tooltip-pointer-handle"></a>

Pointer handle configuration

Configure the draggable pointer handle appearance.

Writes the selected axisPointer.handle visibility, icon, size, margin, throttle and color, with a shadow child.

Requires an applicable axis pointer; it does not supply chart data or a coordinate system.

Positional order: `icon` → `size` → `margin` → `throttle` → `show` → `color`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `icon` | `any` | Not supplied | Icon |
| `size` | `number` | Not supplied | Icon size |
| `margin` | `number` | Not supplied | Distance between handle and axis |
| `throttle` | `number` | Not supplied | View update interval |
| `show` | `boolean` | `true` | Show |
| `color` | `functionOrString` | Not supplied | Color |

## `echarts.tooltip.pointer.shadow`

<a id="entry-echarts-tooltip-pointer-shadow"></a>

Shadow

Style the shadow-type pointer band.

Writes shadow fields into the selected axisPointer.shadowStyle owner.

Choose a shadow pointer type separately; this helper does not set the band fill color or enable the pointer.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.legend.itemStyle.border`

<a id="entry-echarts-legend-itemstyle-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.legend.itemStyle.shadow`

<a id="entry-echarts-legend-itemstyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.legend.lineStyle.shadow`

<a id="entry-echarts-legend-linestyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.legend.textStyle.shadow`

<a id="entry-echarts-legend-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.legend.textStyle.stroke`

<a id="entry-echarts-legend-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.line.markLine.animation`

<a id="entry-echarts-line-markline-animation"></a>

Animation

Control animation for a mark-line or mark-point annotation.

Writes animation enabled, delay, duration and easing at the chosen annotation owner.

The type profile misspells optKey as optKet, so type is emitted literally instead of animationType; do not promise that mapping.

Positional order: `animation` → `delay` → `duration` → `type` → `easing`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `animation` | `boolean` | `true` | Enable animation<br>`{"optKey":"animation"}` |
| `delay` | `number` | Not supplied | Animation delay<br>`{"optKey":"animationDelay"}` |
| `duration` | `number` | Not supplied | Animation duration<br>`{"optKey":"animationDuration"}` |
| `type` | `string` | Not supplied | Animation type<br>Options: `expansion`, `scale` |
| `easing` | `string` | Not supplied | Animation easing<br>Options: `linear`, `quadraticIn`, `quadraticOut`<br>`{"optKey":"animationEasing"}` |

## `echarts.line.markLine.lineStyle`

<a id="entry-echarts-line-markline-linestyle"></a>

Line style

Style mark-line reference strokes.

Writes the markLine lineStyle and extends the common line-stroke profile with curveness.

Positional order: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity` → `curveness`.

| Argument | Type | Contract |
| --- | --- | --- |
| `width` | `number` | Line width |
| `type` | `string` | Line type |
| `dashOffset` | `number` | Dash offset |
| `cap` | `string` | Line cap type |
| `join` | `string` | Line join type |
| `miterLimit` | `number` | Miter limit ratio |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |
| `curveness` | `number` | Curvature |

## `echarts.calendar.dayLabel.border`

<a id="entry-echarts-calendar-daylabel-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.calendar.dayLabel.shadow`

<a id="entry-echarts-calendar-daylabel-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.line.markPoint.animation`

<a id="entry-echarts-line-markpoint-animation"></a>

Animation

Control animation for a mark-line or mark-point annotation.

Writes animation enabled, delay, duration and easing at the chosen annotation owner.

The type profile misspells optKey as optKet, so type is emitted literally instead of animationType; do not promise that mapping.

Positional order: `animation` → `delay` → `duration` → `type` → `easing`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `animation` | `boolean` | `true` | Enable animation<br>`{"optKey":"animation"}` |
| `delay` | `number` | Not supplied | Animation delay<br>`{"optKey":"animationDelay"}` |
| `duration` | `number` | Not supplied | Animation duration<br>`{"optKey":"animationDuration"}` |
| `type` | `string` | Not supplied | Animation type<br>Options: `expansion`, `scale` |
| `easing` | `string` | Not supplied | Animation easing<br>Options: `linear`, `quadraticIn`, `quadraticOut`<br>`{"optKey":"animationEasing"}` |

## `echarts.line.markPoint.itemStyle`

<a id="entry-echarts-line-markpoint-itemstyle"></a>

Item style

Style the selected chart item, map region, legend marker or emphasis item.

Writes color and opacity to the path-selected itemStyle, with border and shadow children for the same owner.

Choose the full path for normal versus emphasis state. Series item styling and geo or calendar styling affect different owners.

Positional order: `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.Radar.axisName.textStyle`

<a id="entry-echarts-radar-axisname-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.tooltip.textStyle.shadow`

<a id="entry-echarts-tooltip-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.tooltip.textStyle.stroke`

<a id="entry-echarts-tooltip-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.calendar.itemStyle.border`

<a id="entry-echarts-calendar-itemstyle-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.calendar.itemStyle.shadow`

<a id="entry-echarts-calendar-itemstyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.calendar.yearLabel.border`

<a id="entry-echarts-calendar-yearlabel-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.calendar.yearLabel.shadow`

<a id="entry-echarts-calendar-yearlabel-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.Radar.splitArea.areaStyle`

<a id="entry-echarts-radar-splitarea-areastyle"></a>

Area style

Style coordinate-system split-area fills.

Writes fill color and opacity to the selected splitArea.areaStyle and exposes its shadow child.

Enable the parent splitArea separately; this is coordinate-system band styling, not a series area fill.

Positional order: `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.Radar.splitLine.lineStyle`

<a id="entry-echarts-radar-splitline-linestyle"></a>

Line style

Style an existing chart, axis, tick, pointer or split-line stroke.

Writes line color, width, dash pattern, caps, joins and opacity at the path-selected lineStyle owner; exposes a shadow child. echarts.line.lineStyle supplies a dashed default.

This does not enable hidden parent lines or create data. A series line, emphasis line and coordinate-system line retain different owners.

Positional order: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `width` | `number` | Line width |
| `type` | `string` | Line type |
| `dashOffset` | `number` | Dash offset |
| `cap` | `string` | Line cap type |
| `join` | `string` | Line join type |
| `miterLimit` | `number` | Miter limit ratio |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.title.subtextStyle.shadow`

<a id="entry-echarts-title-subtextstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.title.subtextStyle.stroke`

<a id="entry-echarts-title-subtextstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.tooltip.pointer.lineStyle`

<a id="entry-echarts-tooltip-pointer-linestyle"></a>

Line style

Style an existing chart, axis, tick, pointer or split-line stroke.

Writes line color, width, dash pattern, caps, joins and opacity at the path-selected lineStyle owner; exposes a shadow child. echarts.line.lineStyle supplies a dashed default.

This does not enable hidden parent lines or create data. A series line, emphasis line and coordinate-system line retain different owners.

Positional order: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `width` | `number` | Line width |
| `type` | `string` | Line type |
| `dashOffset` | `number` | Dash offset |
| `cap` | `string` | Line cap type |
| `join` | `string` | Line join type |
| `miterLimit` | `number` | Miter limit ratio |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.calendar.monthLabel.border`

<a id="entry-echarts-calendar-monthlabel-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.calendar.monthLabel.shadow`

<a id="entry-echarts-calendar-monthlabel-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.calendar.dayLabel.textStyle`

<a id="entry-echarts-calendar-daylabel-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.calendar.splitLine.lineStyle`

<a id="entry-echarts-calendar-splitline-linestyle"></a>

Line style

Style an existing chart, axis, tick, pointer or split-line stroke.

Writes line color, width, dash pattern, caps, joins and opacity at the path-selected lineStyle owner; exposes a shadow child. echarts.line.lineStyle supplies a dashed default.

This does not enable hidden parent lines or create data. A series line, emphasis line and coordinate-system line retain different owners.

Positional order: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `width` | `number` | Line width |
| `type` | `string` | Line type |
| `dashOffset` | `number` | Dash offset |
| `cap` | `string` | Line cap type |
| `join` | `string` | Line join type |
| `miterLimit` | `number` | Miter limit ratio |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.calendar.yearLabel.textStyle`

<a id="entry-echarts-calendar-yearlabel-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.calendar.monthLabel.textStyle`

<a id="entry-echarts-calendar-monthlabel-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.line.horizontalWithTopLegend.0`

<a id="entry-echarts-line-horizontalwithtoplegend-0"></a>

Title position

Place the title in the top-centered chart preset.

This array entry is title.position configured with top=top and left=center; it changes title positioning only.

Prefer the named title.position helper over a numeric array-entry path.

Positional order: `bottom` → `right` → `padding` → `top` → `left`.

| Argument | Contract |
| --- | --- |
| `bottom` | Captured title bottom placement.<br>This array entry is a prebuilt style that captures bottom=auto and writes title.bottom. Use echarts.title.position with the bottom argument to customize it; the numeric entry is not a parameterized factory. |
| `right` | Captured title right placement.<br>This array entry is a prebuilt style that captures right=auto and writes title.right. Use echarts.title.position with the right argument to customize it; the numeric entry is not a parameterized factory. |
| `padding` | Captured title inner padding.<br>This array entry is a prebuilt style that captures padding=[10, 0, 0, 0] and writes title.padding. Use echarts.title.position with the padding argument to customize it; the numeric entry is not a parameterized factory. |
| `top` | Captured title top placement.<br>This array entry is a prebuilt style that captures top=top and writes title.top. Use echarts.title.position with the top argument to customize it; the numeric entry is not a parameterized factory. |
| `left` | Captured title left placement.<br>This array entry is a prebuilt style that captures left=center and writes title.left. Use echarts.title.position with the left argument to customize it; the numeric entry is not a parameterized factory. |

## `echarts.line.horizontalWithTopLegend.1`

<a id="entry-echarts-line-horizontalwithtoplegend-1"></a>

Title font

Set title typography with the legacy font helper.

Writes fontStyle, fontWeight, fontFamily and fontSize into title.textStyle.

Positional order: `style` → `weight` → `family` → `size`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `style` | `string` | `normal` | Style |
| `weight` | `string` | `normal` | Font weight |
| `family` | `string` | `sans-serif, Arial` | Font family |
| `size` | `number` | Runtime-determined (number) | Size |

## `echarts.line.horizontalWithTopLegend.2`

<a id="entry-echarts-line-horizontalwithtoplegend-2"></a>

Tooltip font

Identify the legacy tooltip-font helper and its current limitation.

The helper writes font fields under a top-level 字体.textStyle object rather than tooltip.textStyle.

Use echarts.tooltip.textStyle for tooltip typography. The top-legend array entry 2 aliases this same legacy helper.

Positional order: `style` → `weight` → `family` → `size`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `style` | `string` | `normal` | Style |
| `weight` | `string` | `normal` | Font weight |
| `family` | `string` | `sans-serif, Arial` | Font family |
| `size` | `number` | Runtime-determined (number) | Size |

## `echarts.line.horizontalWithTopLegend.3`

<a id="entry-echarts-line-horizontalwithtoplegend-3"></a>

Keep tooltip placement confined to the chart.

Writes tooltip.confine=true without changing its content or trigger.

## `echarts.line.horizontalWithTopLegend.4`

<a id="entry-echarts-line-horizontalwithtoplegend-4"></a>

Position

Place the legend near the top of the chart preset.

This array entry is legend.position with top 15%, centered horizontally and horizontal padding of 5.

Prefer the named legend.position helper over a numeric array-entry path.

Positional order: `bottom` → `right` → `top` → `left` → `padding`.

| Argument | Contract |
| --- | --- |
| `bottom` | Captured legend bottom placement.<br>This array entry is a prebuilt style that captures bottom=auto and writes legend.bottom. Use echarts.legend.position with the bottom argument to customize it; the numeric entry is not a parameterized factory. |
| `right` | Captured legend right placement.<br>This array entry is a prebuilt style that captures right=auto and writes legend.right. Use echarts.legend.position with the right argument to customize it; the numeric entry is not a parameterized factory. |
| `top` | Captured legend top placement.<br>This array entry is a prebuilt style that captures top=15% and writes legend.top. Use echarts.legend.position with the top argument to customize it; the numeric entry is not a parameterized factory. |
| `left` | Captured legend left placement.<br>This array entry is a prebuilt style that captures left=center and writes legend.left. Use echarts.legend.position with the left argument to customize it; the numeric entry is not a parameterized factory. |
| `padding` | Captured legend inner padding.<br>This array entry is a prebuilt style that captures padding=[0, 5, 0, 5] and writes legend.padding. Use echarts.legend.position with the padding argument to customize it; the numeric entry is not a parameterized factory. |

## `echarts.line.horizontalWithTopLegend.5`

<a id="entry-echarts-line-horizontalwithtoplegend-5"></a>

Legend font

Set legend typography with the legacy font helper.

Writes fontStyle, fontWeight, fontFamily and fontSize into legend.textStyle.

Positional order: `style` → `weight` → `family` → `size`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `style` | `string` | `normal` | Style |
| `weight` | `string` | `normal` | Font weight |
| `family` | `string` | `sans-serif, Arial` | Font family |
| `size` | `number` | Runtime-determined (number) | Size |

## `echarts.line.horizontalWithTopLegend.6`

<a id="entry-echarts-line-horizontalwithtoplegend-6"></a>

X axis label font

Set the x-axis font in the top-legend preset.

This array entry applies axis.xLabelFont with size 10.

Prefer the named x-axis typography helper over a numeric array-entry path.

Positional order: `style` → `weight` → `family` → `size`.

| Argument | Contract |
| --- | --- |
| `style` | Captured x-axis label font style.<br>This prebuilt style captures style=normal and writes xAxis.axisLabel.fontStyle. Use echarts.axis.xLabelFont with the style argument to customize it; the numeric entry is not a parameterized factory. |
| `weight` | Captured x-axis label font weight.<br>This prebuilt style captures weight=normal and writes xAxis.axisLabel.fontWeight. Use echarts.axis.xLabelFont with the weight argument to customize it; the numeric entry is not a parameterized factory. |
| `family` | Captured x-axis label font family.<br>This prebuilt style captures family=sans-serif, Arial and writes xAxis.axisLabel.fontFamily. Use echarts.axis.xLabelFont with the family argument to customize it; the numeric entry is not a parameterized factory. |
| `size` | Captured x-axis label font size.<br>This prebuilt style captures size=10 and writes xAxis.axisLabel.fontSize. Use echarts.axis.xLabelFont with the size argument to customize it; the numeric entry is not a parameterized factory. |

## `echarts.line.horizontalWithTopLegend.7`

<a id="entry-echarts-line-horizontalwithtoplegend-7"></a>

Y axis label font

Set the y-axis font in the top-legend preset.

This array entry applies axis.yLabelFont with size 10.

Prefer the named y-axis typography helper over a numeric array-entry path.

Positional order: `style` → `weight` → `family` → `size`.

| Argument | Contract |
| --- | --- |
| `style` | Captured y-axis label font style.<br>This prebuilt style captures style=normal and writes yAxis.axisLabel.fontStyle. Use echarts.axis.yLabelFont with the style argument to customize it; the numeric entry is not a parameterized factory. |
| `weight` | Captured y-axis label font weight.<br>This prebuilt style captures weight=normal and writes yAxis.axisLabel.fontWeight. Use echarts.axis.yLabelFont with the weight argument to customize it; the numeric entry is not a parameterized factory. |
| `family` | Captured y-axis label font family.<br>This prebuilt style captures family=sans-serif, Arial and writes yAxis.axisLabel.fontFamily. Use echarts.axis.yLabelFont with the family argument to customize it; the numeric entry is not a parameterized factory. |
| `size` | Captured y-axis label font size.<br>This prebuilt style captures size=10 and writes yAxis.axisLabel.fontSize. Use echarts.axis.yLabelFont with the size argument to customize it; the numeric entry is not a parameterized factory. |

## `echarts.axis.x.label.border`

<a id="entry-echarts-axis-x-label-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.axis.x.label.shadow`

<a id="entry-echarts-axis-x-label-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.y.label.border`

<a id="entry-echarts-axis-y-label-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.axis.y.label.shadow`

<a id="entry-echarts-axis-y-label-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.x.pointer.label`

<a id="entry-echarts-axis-x-pointer-label"></a>

Label configuration

Format the value label attached to a pointer.

Writes the pointer label, extending ordinary label options with precision and margin. Border, shadow and textStyle are separate children.

Positional order: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `precision` → `margin`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `align` | `string` | Not supplied | Horizontal text alignment |
| `verticalAlign` | `string` | Not supplied | Vertical text alignment |
| `rotate` | `number` | Not supplied | Rotation angle |
| `width` | `number` | Not supplied | Text width |
| `height` | `number` | Not supplied | Text height |
| `rich` | `dictionary` | Not supplied | Rich text |
| `lineHeight` | `number` | Not supplied | Line height |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `opacity` | `number` | Not supplied | Opacity |
| `precision` | `numberOrString` | Not supplied | Precision |
| `margin` | `number` | Not supplied | Distance between labels and axis |

## `echarts.axis.y.pointer.label`

<a id="entry-echarts-axis-y-pointer-label"></a>

Label configuration

Format the value label attached to a pointer.

Writes the pointer label, extending ordinary label options with precision and margin. Border, shadow and textStyle are separate children.

Positional order: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `precision` → `margin`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `align` | `string` | Not supplied | Horizontal text alignment |
| `verticalAlign` | `string` | Not supplied | Vertical text alignment |
| `rotate` | `number` | Not supplied | Rotation angle |
| `width` | `number` | Not supplied | Text width |
| `height` | `number` | Not supplied | Text height |
| `rich` | `dictionary` | Not supplied | Rich text |
| `lineHeight` | `number` | Not supplied | Line height |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `opacity` | `number` | Not supplied | Opacity |
| `precision` | `numberOrString` | Not supplied | Precision |
| `margin` | `number` | Not supplied | Distance between labels and axis |

## `echarts.axis.x.line.lineStyle`

<a id="entry-echarts-axis-x-line-linestyle"></a>

Line style

Style an existing chart, axis, tick, pointer or split-line stroke.

Writes line color, width, dash pattern, caps, joins and opacity at the path-selected lineStyle owner; exposes a shadow child. echarts.line.lineStyle supplies a dashed default.

This does not enable hidden parent lines or create data. A series line, emphasis line and coordinate-system line retain different owners.

Positional order: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `width` | `number` | Line width |
| `type` | `string` | Line type |
| `dashOffset` | `number` | Dash offset |
| `cap` | `string` | Line cap type |
| `join` | `string` | Line join type |
| `miterLimit` | `number` | Miter limit ratio |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.axis.x.pointer.handle`

<a id="entry-echarts-axis-x-pointer-handle"></a>

Pointer handle configuration

Configure the draggable pointer handle appearance.

Writes the selected axisPointer.handle visibility, icon, size, margin, throttle and color, with a shadow child.

Requires an applicable axis pointer; it does not supply chart data or a coordinate system.

Positional order: `icon` → `size` → `margin` → `throttle` → `show` → `color`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `icon` | `any` | Not supplied | Icon |
| `size` | `number` | Not supplied | Icon size |
| `margin` | `number` | Not supplied | Distance between handle and axis |
| `throttle` | `number` | Not supplied | View update interval |
| `show` | `boolean` | `true` | Show |
| `color` | `functionOrString` | Not supplied | Color |

## `echarts.axis.x.pointer.shadow`

<a id="entry-echarts-axis-x-pointer-shadow"></a>

Shadow

Style the shadow-type pointer band.

Writes shadow fields into the selected axisPointer.shadowStyle owner.

Choose a shadow pointer type separately; this helper does not set the band fill color or enable the pointer.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.x.tick.lineStyle`

<a id="entry-echarts-axis-x-tick-linestyle"></a>

Line style

Style an existing chart, axis, tick, pointer or split-line stroke.

Writes line color, width, dash pattern, caps, joins and opacity at the path-selected lineStyle owner; exposes a shadow child. echarts.line.lineStyle supplies a dashed default.

This does not enable hidden parent lines or create data. A series line, emphasis line and coordinate-system line retain different owners.

Positional order: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `width` | `number` | Line width |
| `type` | `string` | Line type |
| `dashOffset` | `number` | Dash offset |
| `cap` | `string` | Line cap type |
| `join` | `string` | Line join type |
| `miterLimit` | `number` | Miter limit ratio |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.axis.y.line.lineStyle`

<a id="entry-echarts-axis-y-line-linestyle"></a>

Line style

Style an existing chart, axis, tick, pointer or split-line stroke.

Writes line color, width, dash pattern, caps, joins and opacity at the path-selected lineStyle owner; exposes a shadow child. echarts.line.lineStyle supplies a dashed default.

This does not enable hidden parent lines or create data. A series line, emphasis line and coordinate-system line retain different owners.

Positional order: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `width` | `number` | Line width |
| `type` | `string` | Line type |
| `dashOffset` | `number` | Dash offset |
| `cap` | `string` | Line cap type |
| `join` | `string` | Line join type |
| `miterLimit` | `number` | Miter limit ratio |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.axis.y.pointer.handle`

<a id="entry-echarts-axis-y-pointer-handle"></a>

Pointer handle configuration

Configure the draggable pointer handle appearance.

Writes the selected axisPointer.handle visibility, icon, size, margin, throttle and color, with a shadow child.

Requires an applicable axis pointer; it does not supply chart data or a coordinate system.

Positional order: `icon` → `size` → `margin` → `throttle` → `show` → `color`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `icon` | `any` | Not supplied | Icon |
| `size` | `number` | Not supplied | Icon size |
| `margin` | `number` | Not supplied | Distance between handle and axis |
| `throttle` | `number` | Not supplied | View update interval |
| `show` | `boolean` | `true` | Show |
| `color` | `functionOrString` | Not supplied | Color |

## `echarts.axis.y.pointer.shadow`

<a id="entry-echarts-axis-y-pointer-shadow"></a>

Shadow

Style the shadow-type pointer band.

Writes shadow fields into the selected axisPointer.shadowStyle owner.

Choose a shadow pointer type separately; this helper does not set the band fill color or enable the pointer.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.y.tick.lineStyle`

<a id="entry-echarts-axis-y-tick-linestyle"></a>

Line style

Style an existing chart, axis, tick, pointer or split-line stroke.

Writes line color, width, dash pattern, caps, joins and opacity at the path-selected lineStyle owner; exposes a shadow child. echarts.line.lineStyle supplies a dashed default.

This does not enable hidden parent lines or create data. A series line, emphasis line and coordinate-system line retain different owners.

Positional order: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `width` | `number` | Line width |
| `type` | `string` | Line type |
| `dashOffset` | `number` | Dash offset |
| `cap` | `string` | Line cap type |
| `join` | `string` | Line join type |
| `miterLimit` | `number` | Miter limit ratio |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.axis.x.label.textStyle`

<a id="entry-echarts-axis-x-label-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.axis.y.label.textStyle`

<a id="entry-echarts-axis-y-label-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.bar.hover.label.border`

<a id="entry-echarts-bar-hover-label-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.bar.hover.label.shadow`

<a id="entry-echarts-bar-hover-label-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.geo.hover.label.border`

<a id="entry-echarts-geo-hover-label-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.geo.hover.label.shadow`

<a id="entry-echarts-geo-hover-label-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.pie.hover.label.border`

<a id="entry-echarts-pie-hover-label-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.pie.hover.label.shadow`

<a id="entry-echarts-pie-hover-label-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.x.nameStyle.border`

<a id="entry-echarts-axis-x-namestyle-border"></a>

Border

Outline the box around an axis name.

Maps border arguments onto radar.axisName or xAxis/yAxis.nameTextStyle according to the selected path. This variant omits cap, join and miter-limit controls.

Use the textStyle.stroke child to outline glyphs instead of the surrounding name box.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |

## `echarts.axis.x.nameStyle.shadow`

<a id="entry-echarts-axis-x-namestyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.y.nameStyle.border`

<a id="entry-echarts-axis-y-namestyle-border"></a>

Border

Outline the box around an axis name.

Maps border arguments onto radar.axisName or xAxis/yAxis.nameTextStyle according to the selected path. This variant omits cap, join and miter-limit controls.

Use the textStyle.stroke child to outline glyphs instead of the surrounding name box.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |

## `echarts.axis.y.nameStyle.shadow`

<a id="entry-echarts-axis-y-namestyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.line.hover.label.border`

<a id="entry-echarts-line-hover-label-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.line.hover.label.shadow`

<a id="entry-echarts-line-hover-label-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.x.pointer.lineStyle`

<a id="entry-echarts-axis-x-pointer-linestyle"></a>

Line style

Style an existing chart, axis, tick, pointer or split-line stroke.

Writes line color, width, dash pattern, caps, joins and opacity at the path-selected lineStyle owner; exposes a shadow child. echarts.line.lineStyle supplies a dashed default.

This does not enable hidden parent lines or create data. A series line, emphasis line and coordinate-system line retain different owners.

Positional order: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `width` | `number` | Line width |
| `type` | `string` | Line type |
| `dashOffset` | `number` | Dash offset |
| `cap` | `string` | Line cap type |
| `join` | `string` | Line join type |
| `miterLimit` | `number` | Miter limit ratio |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.axis.y.pointer.lineStyle`

<a id="entry-echarts-axis-y-pointer-linestyle"></a>

Line style

Style an existing chart, axis, tick, pointer or split-line stroke.

Writes line color, width, dash pattern, caps, joins and opacity at the path-selected lineStyle owner; exposes a shadow child. echarts.line.lineStyle supplies a dashed default.

This does not enable hidden parent lines or create data. A series line, emphasis line and coordinate-system line retain different owners.

Positional order: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `width` | `number` | Line width |
| `type` | `string` | Line type |
| `dashOffset` | `number` | Dash offset |
| `cap` | `string` | Line cap type |
| `join` | `string` | Line join type |
| `miterLimit` | `number` | Miter limit ratio |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.bar.hover.label.textStyle`

<a id="entry-echarts-bar-hover-label-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.geo.hover.label.textStyle`

<a id="entry-echarts-geo-hover-label-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.line.markLine.hover.label`

<a id="entry-echarts-line-markline-hover-label"></a>

Label configuration

Place and format series or emphasis labels.

Extends common label formatting with distance, offset, minimum margin and position, then writes the selected series/emphasis label owner.

Use the parent hover style for emphasis activation; use label.textStyle only when its emitted nested textStyle shape fits the target ECharts version.

Positional order: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `distance` → `offset` → `minMargin` → `position`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `align` | `string` | Not supplied | Horizontal text alignment |
| `verticalAlign` | `string` | Not supplied | Vertical text alignment |
| `rotate` | `number` | Not supplied | Rotation angle |
| `width` | `number` | Not supplied | Text width |
| `height` | `number` | Not supplied | Text height |
| `rich` | `dictionary` | Not supplied | Rich text |
| `lineHeight` | `number` | Not supplied | Line height |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `opacity` | `number` | Not supplied | Opacity |
| `distance` | `number` | Not supplied | Distance between text and symbol |
| `offset` | `array` | Not supplied | Text offset |
| `minMargin` | `number` | Not supplied | Minimum label margin |
| `position` | `arrayOrString` | Not supplied | Position |

## `echarts.pie.hover.label.textStyle`

<a id="entry-echarts-pie-hover-label-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.axis.x.nameStyle.textStyle`

<a id="entry-echarts-axis-x-namestyle-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.axis.x.splitArea.areaStyle`

<a id="entry-echarts-axis-x-splitarea-areastyle"></a>

Area style

Style coordinate-system split-area fills.

Writes fill color and opacity to the selected splitArea.areaStyle and exposes its shadow child.

Enable the parent splitArea separately; this is coordinate-system band styling, not a series area fill.

Positional order: `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.axis.x.splitLine.lineStyle`

<a id="entry-echarts-axis-x-splitline-linestyle"></a>

Line style

Style an existing chart, axis, tick, pointer or split-line stroke.

Writes line color, width, dash pattern, caps, joins and opacity at the path-selected lineStyle owner; exposes a shadow child. echarts.line.lineStyle supplies a dashed default.

This does not enable hidden parent lines or create data. A series line, emphasis line and coordinate-system line retain different owners.

Positional order: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `width` | `number` | Line width |
| `type` | `string` | Line type |
| `dashOffset` | `number` | Dash offset |
| `cap` | `string` | Line cap type |
| `join` | `string` | Line join type |
| `miterLimit` | `number` | Miter limit ratio |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.axis.y.nameStyle.textStyle`

<a id="entry-echarts-axis-y-namestyle-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.axis.y.splitArea.areaStyle`

<a id="entry-echarts-axis-y-splitarea-areastyle"></a>

Area style

Style coordinate-system split-area fills.

Writes fill color and opacity to the selected splitArea.areaStyle and exposes its shadow child.

Enable the parent splitArea separately; this is coordinate-system band styling, not a series area fill.

Positional order: `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.axis.y.splitLine.lineStyle`

<a id="entry-echarts-axis-y-splitline-linestyle"></a>

Line style

Style an existing chart, axis, tick, pointer or split-line stroke.

Writes line color, width, dash pattern, caps, joins and opacity at the path-selected lineStyle owner; exposes a shadow child. echarts.line.lineStyle supplies a dashed default.

This does not enable hidden parent lines or create data. A series line, emphasis line and coordinate-system line retain different owners.

Positional order: `width` → `type` → `dashOffset` → `cap` → `join` → `miterLimit` → `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `width` | `number` | Line width |
| `type` | `string` | Line type |
| `dashOffset` | `number` | Dash offset |
| `cap` | `string` | Line cap type |
| `join` | `string` | Line join type |
| `miterLimit` | `number` | Miter limit ratio |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.bar.hover.itemStyle.border`

<a id="entry-echarts-bar-hover-itemstyle-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.bar.hover.itemStyle.shadow`

<a id="entry-echarts-bar-hover-itemstyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.bar.label.textStyle.shadow`

<a id="entry-echarts-bar-label-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.bar.label.textStyle.stroke`

<a id="entry-echarts-bar-label-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.geo.hover.itemStyle.border`

<a id="entry-echarts-geo-hover-itemstyle-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.geo.hover.itemStyle.shadow`

<a id="entry-echarts-geo-hover-itemstyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.geo.label.textStyle.shadow`

<a id="entry-echarts-geo-label-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.geo.label.textStyle.stroke`

<a id="entry-echarts-geo-label-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.line.hover.label.textStyle`

<a id="entry-echarts-line-hover-label-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.line.markLine.label.border`

<a id="entry-echarts-line-markline-label-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.line.markLine.label.shadow`

<a id="entry-echarts-line-markline-label-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.line.markPoint.hover.label`

<a id="entry-echarts-line-markpoint-hover-label"></a>

Label configuration

Place and format series or emphasis labels.

Extends common label formatting with distance, offset, minimum margin and position, then writes the selected series/emphasis label owner.

Use the parent hover style for emphasis activation; use label.textStyle only when its emitted nested textStyle shape fits the target ECharts version.

Positional order: `align` → `verticalAlign` → `rotate` → `width` → `height` → `rich` → `lineHeight` → `backgroundColor` → `show` → `padding` → `formatter` → `opacity` → `distance` → `offset` → `minMargin` → `position`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `align` | `string` | Not supplied | Horizontal text alignment |
| `verticalAlign` | `string` | Not supplied | Vertical text alignment |
| `rotate` | `number` | Not supplied | Rotation angle |
| `width` | `number` | Not supplied | Text width |
| `height` | `number` | Not supplied | Text height |
| `rich` | `dictionary` | Not supplied | Rich text |
| `lineHeight` | `number` | Not supplied | Line height |
| `backgroundColor` | `functionOrString` | Not supplied | Background color |
| `show` | `boolean` | `true` | Show |
| `padding` | `array` | Not supplied | Padding |
| `formatter` | `functionOrString` | Not supplied | Formatter |
| `opacity` | `number` | Not supplied | Opacity |
| `distance` | `number` | Not supplied | Distance between text and symbol |
| `offset` | `array` | Not supplied | Text offset |
| `minMargin` | `number` | Not supplied | Minimum label margin |
| `position` | `arrayOrString` | Not supplied | Position |

## `echarts.pie.hover.itemStyle.border`

<a id="entry-echarts-pie-hover-itemstyle-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.pie.hover.itemStyle.shadow`

<a id="entry-echarts-pie-hover-itemstyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.pie.label.textStyle.shadow`

<a id="entry-echarts-pie-label-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.pie.label.textStyle.stroke`

<a id="entry-echarts-pie-label-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.line.hover.itemStyle.border`

<a id="entry-echarts-line-hover-itemstyle-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.line.hover.itemStyle.shadow`

<a id="entry-echarts-line-hover-itemstyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.line.hover.lineStyle.shadow`

<a id="entry-echarts-line-hover-linestyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.line.label.textStyle.shadow`

<a id="entry-echarts-line-label-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.line.label.textStyle.stroke`

<a id="entry-echarts-line-label-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.line.markPoint.label.border`

<a id="entry-echarts-line-markpoint-label-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.line.markPoint.label.shadow`

<a id="entry-echarts-line-markpoint-label-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.Radar.line.lineStyle.shadow`

<a id="entry-echarts-radar-line-linestyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.Radar.tick.lineStyle.shadow`

<a id="entry-echarts-radar-tick-linestyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.Radar.label.textStyle.shadow`

<a id="entry-echarts-radar-label-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.Radar.label.textStyle.stroke`

<a id="entry-echarts-radar-label-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.tooltip.pointer.label.border`

<a id="entry-echarts-tooltip-pointer-label-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.tooltip.pointer.label.shadow`

<a id="entry-echarts-tooltip-pointer-label-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.line.markLine.hover.itemStyle`

<a id="entry-echarts-line-markline-hover-itemstyle"></a>

Item style

Style the selected chart item, map region, legend marker or emphasis item.

Writes color and opacity to the path-selected itemStyle, with border and shadow children for the same owner.

Choose the full path for normal versus emphasis state. Series item styling and geo or calendar styling affect different owners.

Positional order: `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.line.markLine.label.textStyle`

<a id="entry-echarts-line-markline-label-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.tooltip.pointer.handle.shadow`

<a id="entry-echarts-tooltip-pointer-handle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.line.markLine.lineStyle.shadow`

<a id="entry-echarts-line-markline-linestyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.line.markPoint.hover.itemStyle`

<a id="entry-echarts-line-markpoint-hover-itemstyle"></a>

Item style

Style the selected chart item, map region, legend marker or emphasis item.

Writes color and opacity to the path-selected itemStyle, with border and shadow children for the same owner.

Choose the full path for normal versus emphasis state. Series item styling and geo or calendar styling affect different owners.

Positional order: `color` → `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `functionOrString` | Color |
| `opacity` | `number` | Opacity |

## `echarts.line.markPoint.label.textStyle`

<a id="entry-echarts-line-markpoint-label-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.line.markPoint.itemStyle.border`

<a id="entry-echarts-line-markpoint-itemstyle-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.line.markPoint.itemStyle.shadow`

<a id="entry-echarts-line-markpoint-itemstyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.Radar.axisName.textStyle.shadow`

<a id="entry-echarts-radar-axisname-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.Radar.axisName.textStyle.stroke`

<a id="entry-echarts-radar-axisname-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.tooltip.pointer.label.textStyle`

<a id="entry-echarts-tooltip-pointer-label-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.Radar.splitArea.areaStyle.shadow`

<a id="entry-echarts-radar-splitarea-areastyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.Radar.splitLine.lineStyle.shadow`

<a id="entry-echarts-radar-splitline-linestyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.tooltip.pointer.lineStyle.shadow`

<a id="entry-echarts-tooltip-pointer-linestyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.calendar.dayLabel.textStyle.shadow`

<a id="entry-echarts-calendar-daylabel-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.calendar.dayLabel.textStyle.stroke`

<a id="entry-echarts-calendar-daylabel-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.calendar.splitLine.lineStyle.shadow`

<a id="entry-echarts-calendar-splitline-linestyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.calendar.yearLabel.textStyle.shadow`

<a id="entry-echarts-calendar-yearlabel-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.calendar.yearLabel.textStyle.stroke`

<a id="entry-echarts-calendar-yearlabel-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.calendar.monthLabel.textStyle.shadow`

<a id="entry-echarts-calendar-monthlabel-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.calendar.monthLabel.textStyle.stroke`

<a id="entry-echarts-calendar-monthlabel-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.axis.x.pointer.label.border`

<a id="entry-echarts-axis-x-pointer-label-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.axis.x.pointer.label.shadow`

<a id="entry-echarts-axis-x-pointer-label-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.y.pointer.label.border`

<a id="entry-echarts-axis-y-pointer-label-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.axis.y.pointer.label.shadow`

<a id="entry-echarts-axis-y-pointer-label-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.x.line.lineStyle.shadow`

<a id="entry-echarts-axis-x-line-linestyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.x.pointer.handle.shadow`

<a id="entry-echarts-axis-x-pointer-handle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.x.tick.lineStyle.shadow`

<a id="entry-echarts-axis-x-tick-linestyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.y.line.lineStyle.shadow`

<a id="entry-echarts-axis-y-line-linestyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.y.pointer.handle.shadow`

<a id="entry-echarts-axis-y-pointer-handle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.y.tick.lineStyle.shadow`

<a id="entry-echarts-axis-y-tick-linestyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.x.label.textStyle.shadow`

<a id="entry-echarts-axis-x-label-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.axis.x.label.textStyle.stroke`

<a id="entry-echarts-axis-x-label-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.axis.y.label.textStyle.shadow`

<a id="entry-echarts-axis-y-label-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.axis.y.label.textStyle.stroke`

<a id="entry-echarts-axis-y-label-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.axis.x.pointer.label.textStyle`

<a id="entry-echarts-axis-x-pointer-label-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.axis.y.pointer.label.textStyle`

<a id="entry-echarts-axis-y-pointer-label-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.axis.x.pointer.lineStyle.shadow`

<a id="entry-echarts-axis-x-pointer-linestyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.y.pointer.lineStyle.shadow`

<a id="entry-echarts-axis-y-pointer-linestyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.bar.hover.label.textStyle.shadow`

<a id="entry-echarts-bar-hover-label-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.bar.hover.label.textStyle.stroke`

<a id="entry-echarts-bar-hover-label-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.geo.hover.label.textStyle.shadow`

<a id="entry-echarts-geo-hover-label-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.geo.hover.label.textStyle.stroke`

<a id="entry-echarts-geo-hover-label-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.line.markLine.hover.label.border`

<a id="entry-echarts-line-markline-hover-label-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.line.markLine.hover.label.shadow`

<a id="entry-echarts-line-markline-hover-label-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.pie.hover.label.textStyle.shadow`

<a id="entry-echarts-pie-hover-label-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.pie.hover.label.textStyle.stroke`

<a id="entry-echarts-pie-hover-label-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.axis.x.nameStyle.textStyle.shadow`

<a id="entry-echarts-axis-x-namestyle-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.axis.x.nameStyle.textStyle.stroke`

<a id="entry-echarts-axis-x-namestyle-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.axis.x.splitArea.areaStyle.shadow`

<a id="entry-echarts-axis-x-splitarea-areastyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.x.splitLine.lineStyle.shadow`

<a id="entry-echarts-axis-x-splitline-linestyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.y.nameStyle.textStyle.shadow`

<a id="entry-echarts-axis-y-namestyle-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.axis.y.nameStyle.textStyle.stroke`

<a id="entry-echarts-axis-y-namestyle-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.axis.y.splitArea.areaStyle.shadow`

<a id="entry-echarts-axis-y-splitarea-areastyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.axis.y.splitLine.lineStyle.shadow`

<a id="entry-echarts-axis-y-splitline-linestyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.line.hover.label.textStyle.shadow`

<a id="entry-echarts-line-hover-label-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.line.hover.label.textStyle.stroke`

<a id="entry-echarts-line-hover-label-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.line.markPoint.hover.label.border`

<a id="entry-echarts-line-markpoint-hover-label-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.line.markPoint.hover.label.shadow`

<a id="entry-echarts-line-markpoint-hover-label-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.line.markLine.hover.label.textStyle`

<a id="entry-echarts-line-markline-hover-label-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.line.markLine.hover.itemStyle.border`

<a id="entry-echarts-line-markline-hover-itemstyle-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.line.markLine.hover.itemStyle.shadow`

<a id="entry-echarts-line-markline-hover-itemstyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.line.markLine.label.textStyle.shadow`

<a id="entry-echarts-line-markline-label-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.line.markLine.label.textStyle.stroke`

<a id="entry-echarts-line-markline-label-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.line.markPoint.hover.label.textStyle`

<a id="entry-echarts-line-markpoint-hover-label-textstyle"></a>

Text style

Control typography at the label or name owner selected by the full path.

Maps style, weight, font and size to fontStyle, fontWeight, fontFamily and fontSize. Axis-name styles target the name object directly; label-derived textStyle children target a nested textStyle object.

Combine with the parent label formatter and rich text; use stroke and shadow children for glyph decoration.

These helpers preserve the emitted ECharts nesting; they do not normalize legacy nested label.textStyle into flattened label properties.

Positional order: `overflow` → `ellipsis` → `style` → `weight` → `font` → `size` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `overflow` | `string` | Text overflow |
| `ellipsis` | `string` | Text truncation suffix |
| `style` | `string` | Font style<br>`{"optKey":"fontStyle"}` |
| `weight` | `numberOrString` | Font weight<br>`{"optKey":"fontWeight"}` |
| `font` | `string` | Font family<br>`{"optKey":"fontFamily"}` |
| `size` | `number` | Font size<br>`{"optKey":"fontSize"}` |
| `color` | `functionOrString` | Color |

## `echarts.line.markPoint.hover.itemStyle.border`

<a id="entry-echarts-line-markpoint-hover-itemstyle-border"></a>

Border

Outline the selected label box or chart item.

Writes border-prefixed properties at the owner selected by the full path, with a separate radius array shorthand and none reset.

Label border affects its box; itemStyle/backgroundStyle border affects the shape. Use textStyle.stroke for glyph outlines.

A shared argument shape does not make a label box and a series item the same owner; their ECharts rendering semantics differ.

Positional order: `color` → `width` → `type` → `radius` → `border` → `dashOffset` → `cap` → `join` → `miterLimit`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"borderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"borderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"borderType"}` |
| `radius` | `array` | Corner radius<br>Shorthand<br>`{"optKey":"borderRadius"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"border"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"borderDashOffset"}` |
| `cap` | `string` | Line cap<br>`{"optKey":"borderCap"}` |
| `join` | `string` | Line join<br>`{"optKey":"borderJoin"}` |
| `miterLimit` | `number` | Miter limit<br>`{"optKey":"borderMiterLimit"}` |

## `echarts.line.markPoint.hover.itemStyle.shadow`

<a id="entry-echarts-line-markpoint-hover-itemstyle-shadow"></a>

Shadow

Add a shadow to the selected visual box, item, line or fill.

Writes shadow fields at the path-selected owner; theme-backed values are expanded against the chart before setOption.

Choose the full owner path; label-box shadows and glyph text shadows are separate.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"shadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"shadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"shadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"shadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"shadowColor"}` |

## `echarts.line.markPoint.label.textStyle.shadow`

<a id="entry-echarts-line-markpoint-label-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.line.markPoint.label.textStyle.stroke`

<a id="entry-echarts-line-markpoint-label-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.tooltip.pointer.label.textStyle.shadow`

<a id="entry-echarts-tooltip-pointer-label-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.tooltip.pointer.label.textStyle.stroke`

<a id="entry-echarts-tooltip-pointer-label-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.axis.x.pointer.label.textStyle.shadow`

<a id="entry-echarts-axis-x-pointer-label-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.axis.x.pointer.label.textStyle.stroke`

<a id="entry-echarts-axis-x-pointer-label-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.axis.y.pointer.label.textStyle.shadow`

<a id="entry-echarts-axis-y-pointer-label-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.axis.y.pointer.label.textStyle.stroke`

<a id="entry-echarts-axis-y-pointer-label-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.line.markLine.hover.label.textStyle.shadow`

<a id="entry-echarts-line-markline-hover-label-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.line.markLine.hover.label.textStyle.stroke`

<a id="entry-echarts-line-markline-hover-label-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |

## `echarts.line.markPoint.hover.label.textStyle.shadow`

<a id="entry-echarts-line-markpoint-hover-label-textstyle-shadow"></a>

Shadow

Add a shadow to text glyphs.

Maps shorthand and explicit values to textShadow fields at the selected text owner; theme values are resolved before chart submission.

Explicit text-shadow fields win over dictionary values; none resets the text shadow. Nested label textStyle paths retain that nesting.

Positional order: `shadow` → `offsetX` → `offsetY` → `blur` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `dictionaryOrString` | Shadow<br>Shorthand<br>`{"optKey":"textShadow"}` |
| `offsetX` | `number` | Shadow X offset<br>`{"optKey":"textShadowOffsetX"}` |
| `offsetY` | `number` | Shadow Y offset<br>`{"optKey":"textShadowOffsetY"}` |
| `blur` | `number` | Shadow blur<br>`{"optKey":"textShadowBlur"}` |
| `color` | `string` | Shadow color<br>`{"optKey":"textShadowColor"}` |

## `echarts.line.markPoint.hover.label.textStyle.stroke`

<a id="entry-echarts-line-markpoint-hover-label-textstyle-stroke"></a>

Border

Outline text glyphs at the selected typography owner.

Prefixes border output keys with text, producing textBorderColor, textBorderWidth, textBorderType and textBorderDashOffset; cap, join, miter limit and radius are omitted.

Use the parent border style for a box outline. textBorder none resets glyph-border fields when the chart cooks options.

Positional order: `color` → `width` → `type` → `border` → `dashOffset`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"optKey":"textBorderColor"}` |
| `width` | `number` | Border width<br>`{"optKey":"textBorderWidth"}` |
| `type` | `string` | Border type<br>Options: `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted<br>`{"optKey":"textBorderType"}` |
| `border` | `string` | Border<br>Shorthand<br>Options: `none`<br>`{"optKey":"textBorder"}` |
| `dashOffset` | `number` | Dash offset<br>`{"optKey":"textBorderDashOffset"}` |
