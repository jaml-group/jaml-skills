# ECharts styles

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
}
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

Shorthand for passing series-level ECharts options. Wraps the argument in `{ series: [option] }`.

### Deferred chart shorthands

Chart options retain theme-token wrappers until the final option is built for `setOption()`. The following shorthands work recursively in raw ECharts options and in every compatible chart style:

| Shorthand | Accepted value | Native ECharts result | Notes |
|---|---|---|---|
| `shadow` | `{color, blur, offsetX, offsetY}`, theme shadow token, or `'none'` | `shadowColor`, `shadowBlur`, `shadowOffsetX`, `shadowOffsetY` | Explicit native fields override a normal shorthand; `'none'` is an absolute reset |
| `textShadow` | `{color, blur, offsetX, offsetY}`, theme text-shadow token, or `'none'` | `textShadowColor`, `textShadowBlur`, `textShadowOffsetX`, `textShadowOffsetY` | Arbitrary CSS shadow strings are not parsed |
| `border` | `'none'` only | Transparent border with zero width | Border dictionaries and border tokens are not supported |
| `textBorder` | `'none'` only | Transparent text border with zero width | Border dictionaries and border tokens are not supported |

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

Sets automatic contrast colors for visible labels rendered inside colored chart shapes. Explicit label colors are preserved. For data-colored series, the style follows each item's resolved color and recurses through hierarchical `children` data.

| Arg | Type | Description | Notes |
|---|---|---|---|
| — | — | No arguments | Applies to supported inside-label positions and chart types |

### `echarts.coordSysLayer`

Copies the current series into a silent, label-free presentation layer behind the original chart. Cartesian charts receive a cloned grid and hidden axes; all-pie charts receive cloned series with shifted centers. Offsets are measured in pixels.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `colors` | `array` | Layer palette | Defaults to the chart palette |
| `z` | `number` | Layer z order | Default: `0` |
| `offsetX`, `offsetY` | `number` | Horizontal and vertical layer offset | Pixels |
| `shadow` | `dictionary \| string` | Shadow shorthand | Theme shadow token or dictionary |
| `shadowColor` | `dictionary \| string` | Shadow color | Overrides `shadow.color` |
| `shadowBlur` | `number` | Shadow blur | Overrides `shadow.blur` |
| `shadowOffsetX`, `shadowOffsetY` | `number` | Shadow offsets | Override the shorthand offsets |
| `border` | `string` | Border shorthand | Supports `'none'` |
| `borderColor` | `dictionary \| string` | Border color | |
| `borderWidth` | `number \| string` | Border width | |
| `borderType`, `borderCap`, `borderJoin` | `string` | Border shape properties | |
| `borderMiterLimit` | `number` | Border miter limit | |
| `opacity` | `number` | Layer opacity | |
| `tuner` | `function \| string` | Tune the layer palette | Accepts the standard color-set tuner forms |
| `delay` | `number` | Delay before measuring chart geometry | Default: `50` ms |

```javascript jaml-playground
export default {
  type: 'chart-bar',
  data: [
    ['Quarter', 'Sales'],
    ['Q1', 120],
    ['Q2', 200]
  ],
  styles: [
    'echarts.bar',
    Styles.echarts.coordSysLayer({ offsetX: 6, offsetY: 6, opacity: 0.35 }),
    'css(height:15rem;width:22rem)'
  ]
}
```

---

## Chart styles

### `echarts.bar`

Bar chart. Args: `minHeight`, `width`, `minWidth`, `maxWidth`, `minAngle`, `gap`, `colorBy`, `showBackground`, `stack`, `stackStrategy`.

**Variants:**

- **`bar.flipXY`** — swap X and Y axes (horizontal bars). No args.
- **`bar.gradientBg`** — gradient fill per bar series. No args.
- **`bar.votageLevelColor`** — color a single-series bar chart by resolving each category label through the Jam color registry. Args: `gradient` (default `false`) fades each resolved color toward transparency. The current API spelling is `votageLevelColor`.
- **`bar.tz`** — pre-styled bar with gradient colors, dashed splits, rounded corners. Args: `barWidth`, `barGap`, `barMinHeight`, `radius`, `itemWidth`, `itemHeight`, `top`.
- **`bar.floatingBar`** — floating bar with mark points. Args: `show`, `size`, `offset`, `iconColor`, `labelColor`.
- **`bar.maxHightLight`** — highlight max value per series, dim others. Args: `opacity` (default 0.3 for dimmed).
- **`bar.singleSwitchStyle`** — toggle-style single bar. Args: `color`, `width`, `radius`, `bgColor`.
- **`bar.stackBar`** — stacked bar with interval spacers. Args: `interval`, `radius`.
- **`bar.itemStyle`** — item color, opacity, border, shadow.
- **`bar.label`** — label config with distance, offset, position.
- **`bar.hover`** — emphasis state with label and itemStyle sub-styles.

```json jaml-playground
[
    {
        "type": "chart-bar",
        "data": [
            ["Quarter", "Sales"],
            ["Q1", 120],
            ["Q2", 200]
        ],
        "styles": ["echarts.bar", "echarts.bar.tz", "echarts.bar(width:60%;gap:20%)", "css(height:15rem;width:22rem)"]
    },
    {
        "type": "chart-bar",
        "data": [
            ["Category", "Count"],
            ["A", 80],
            ["B", 120]
        ],
        "styles": ["echarts.bar.flipXY", "echarts.bar.gradientBg", "css(height:15rem;width:22rem)"]
    }
]
```

### `echarts.line`

Line chart. Args: `step`, `smooth`, `sampling`, `selectMode`, `stack`, `stackStrategy`, `silent`.

**Variants:**

- **`line.jagged`** — disable smooth (sharp angles). No args.
- **`line.gradientBg`** — gradient area fill. No args.
- **`line.symbol`** — symbol config. Args: `symbol`, `show`, `size`, `offset`, `rotate`.
- **`line.lineStyle`** — line style. Args: `width`, `type` (solid/dashed/dotted), `dashOffset`, `color`, `opacity`, `shadow`.
- **`line.areaStyle`** — area fill under the line. Args: `color`, `opacity`, `shadow`, `orient`.
- **`line.markLine`** — mark lines (average, min, max, custom). Args: `precision`, `data`, `silent`, `symbol`, `size`. Sub-styles: `label`, `lineStyle`, `hover`, `animation`, `avg`, `x`, `y`.
- **`line.markPoint`** — mark points. Args: `data`, `silent`, `symbol`, `size`. Sub-styles: `label`, `itemStyle`, `hover`, `animation`, `min`, `max`.
- **`line.animation`** — animation config. Args: `animation`, `delay`, `duration`, `type`, `easing`.
- **`line.parts`** — Y-axis region partitioning. Args: `part` (number of regions, default 5).
- **`line.avgAMax`** — adds average markLine and max markPoint. Args: `size`.
- **`line.bigSymbol`** — large symbols for sparse data. Args: `symbol`, `size`, `show`, `smooth`.
- **`line.itemStyle`**, **`line.label`**, **`line.hover`** — standard styling sub-variants.

```json jaml-playground
[
    {
        "type": "chart-line",
        "data": [
            ["Day", "Value"],
            ["Mon", 120], ["Tue", 200], ["Wed", 150], ["Thu", 80]
        ],
        "styles": ["echarts.line(smooth:true)", "echarts.line.areaStyle", "echarts.line.gradientBg", "css(height:15rem;width:22rem)"]
    },
    {
        "type": "chart-line",
        "data": [
            ["Day", "Value"],
            ["Mon", 50], ["Tue", 120], ["Wed", 90]
        ],
        "styles": ["echarts.line.markLine.avg", "echarts.line.markPoint.max", "css(height:15rem;width:22rem)"]
    }
]
```

### `echarts.pie`

Pie chart. Args: `selectOffset`, `clockwise`, `startAngle`, `endAngle`, `minAngle`, `padAngle`, `roseType`, `width`, `height`, `center`, `radius`, `persentPrecision`.

**Variants:**

- **`pie.roseType`** — rose/nightingale chart. Args: `type` (`'radius'` / `'area'`).
- **`pie.ring`** — donut/ring chart. No args.
- **`pie.shadow`** — shadow on slices. Args: `shadow` (theme token or `'none'`), `offsetX`, `offsetY`, `blur`, `color`. Uses the large theme shadow when called without arguments.
- **`pie.position`** — radius and center positioning. Args: `innerR`, `outerR`, `cX`, `cY`.
- **`pie.tz`** — styled ring with center label. Args: `radius`, `center`, `padAngle`.
- **`pie.doubleCircle`** — double-ring chart with segment coloring. Args: `top`.
- **`pie.electronicScale`** — electronic scale/gauge using pie+polar. Args: `iconSize`, `pointerSize`.
- **`pie.itemStyle`**, **`pie.label`**, **`pie.hover`** — standard styling sub-variants.

```json jaml-playground
[
    {
        "type": "chart-pie",
        "data": [
            ["Category", "Value"],
            ["A", 40],
            ["B", 30],
            ["C", 30]
        ],
        "styles": ["echarts.pie", "echarts.pie.ring", "echarts.pie.tz", "css(height:15rem;width:22rem)"]
    },
    {
        "type": "chart-pie",
        "data": [
            ["Item", "Share"],
            ["X", 60],
            ["Y", 40]
        ],
        "styles": ["echarts.pie.roseType(type:area)", "css(height:15rem;width:22rem)"]
    }
]
```

### `echarts.radar`

Radar chart. No extended variants — the basic style handles indicator/series transformation and uses `Radar({ shape: 'circle' })` as a plugin. Use `eopts` for customization.

```json jaml-playground
[
    {
        "type": "chart-radar",
        "data": [
            ["Skill", "Team A", "Team B"],
            ["Speed", 87, 80],
            ["Power", 82, 89],
            ["Accuracy", 95, 76],
            ["Defense", 74, 90],
            ["Agility", 88, 80]
        ],
        "styles": ["echarts.radar", "css(height:18rem;width:22rem)"]
    }
]
```

### `echarts.map`

Geographic map chart. `Styles.echarts.map()` updates the foreground map defaults; it does not create another geo layer.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `colors` | array | Foreground region palette | |
| `tuner` | string \| function | Tune the region palette before use | Presets: `none`, `dopamine`, `neon`, `pastel`, `jewel`, `morandi`; JavaScript callbacks receive each normalized `chroma.Color` |
| `z` | number | Foreground z order | |
| `offsetX`, `offsetY` | number | Foreground pixel offsets | Positive values move the map right / down; defaults to `0` |
| `shadow` | dictionary \| token \| `'none'` | Map shadow shorthand | `{color, blur, offsetX, offsetY}` or a theme shadow token |
| `shadowColor` | string \| dictionary | Map shadow color | Overrides `shadow.color` |
| `shadowBlur` | number | Map shadow blur | Overrides `shadow.blur` |
| `shadowOffsetX`, `shadowOffsetY` | number | Map shadow offsets | Override `shadow.offsetX` / `shadow.offsetY` |
| `border` | `'none'` | Remove the region border | Absolute reset |
| `borderColor` | string \| dictionary | Region border color | |
| `borderWidth` | number \| string | Region border width | |
| `borderType` | string | Region border type | |
| `borderCap`, `borderJoin` | string | Region border cap and join | |
| `borderMiterLimit` | number | Region border miter limit | |
| `opacity` | number | Region opacity | |
| `showLabel` | boolean | Show foreground scatter labels | Visible when omitted |
| `label` | dictionary | Foreground scatter-label style | Supports `show` and `textShadow: {color, blur, offsetX, offsetY}` |
| `hover` | dictionary | Region emphasis style | |

Map offsets are converted through each ECharts geo coordinate system, so they remain pixel-based after zooming or resizing.
Either `showLabel: false` or `label.show: false` hides the corresponding labels. The global deferred-shadow precedence rules also apply to `label.textShadow`.

#### `echarts.map.background`

Styles the existing background layer with the same offset, palette, shadow, border, and opacity arguments as the foreground map. When omitted, `colors` is a ten-step low-chroma blue-gray ramp and `opacity` is `0.045`. Background colors are rendered with the `none` tuner; the foreground `tuner` argument is not applied to this layer.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `colors` | array | Background region palette | Default: ten-step ramp from `hsl(210, 15%, 15%)` to `hsl(210, 15%, 75%)` |
| `opacity` | number | Background region opacity | Default: `0.045` |
| `showLabel` | boolean | Show background scatter labels | Visible when omitted |
| `label` | dictionary | Background scatter-label style | Supports the same `show` and `textShadow` forms as the foreground label |
| Remaining foreground map styling args except `tuner`, `showLabel`, `label`, and `hover` | same as map | Background-layer styling | |

#### `echarts.map.layer`

Creates an explicit replicated geo layer at render time.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `merge` | boolean | Merge the currently colored regions into one geometry | Cached per source map and sorted region set |
| All foreground map styling args except `showLabel`, `label`, and `hover` | same as map | Layer styling | Colors default to the map element's active color set |

#### `echarts.map.layer.image`

Creates a raster-image geo layer. The image is loaded asynchronously, cached by source across map instances, and decoded into a canvas pattern before the current draw continues. SVG sources are rejected; use PNG, JPEG, WebP, or another browser-decodable raster format.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `image` | string | Raster image source | Required; shorthand argument |
| `repeat` | string | Pattern repetition | `repeat`, `repeat-x`, `repeat-y`, or `no-repeat`; default: `repeat` |
| `z` | number | Geo-layer z order | |
| `zlevel` | number | ECharts canvas layer | Default: `1` |
| `offsetX`, `offsetY` | number | Pattern offset relative to map size | Fractions of map height, not pixels; default: `0` |
| `scaleX`, `scaleY` | number | Horizontal and vertical scale multipliers | Default: `1`; minimum: `0.01` |
| `useZoom` | boolean | Couple pattern scale and geo bounds to map zoom | Defaults to `true` for `no-repeat` and `false` for repeating patterns |
| `shadow` | dictionary \| token \| `'none'` | Layer shadow shorthand | `{color, blur, offsetX, offsetY}` or a theme shadow token |
| `shadowColor` | string \| dictionary | Layer shadow color | Overrides `shadow.color` |
| `shadowBlur` | number | Layer shadow blur | Overrides `shadow.blur` |
| `shadowOffsetX`, `shadowOffsetY` | number | Layer shadow offsets | Override `shadow.offsetX` / `shadow.offsetY` |
| `border` | `'none'` | Remove the region border | Absolute reset |
| `borderColor` | string \| dictionary | Region border color | |
| `borderWidth` | number \| string | Region border width | |
| `borderType` | string | Region border type | |
| `borderCap`, `borderJoin` | string | Region border cap and join | |
| `borderMiterLimit` | number | Region border miter limit | |
| `opacity` | number | Image-layer opacity | |

With `useZoom: true`, the image is initially normalized so its height matches the chart, then `scaleX` and `scaleY` are applied; the layer retains the configured map zoom and bounds. With `useZoom: false`, the pattern starts at its intrinsic canvas size, the layer zoom is fixed at `1`, and its bounding coordinates are scaled to the focused map frame. This makes the default mode suitable for repeating textures. Image layers keep their relative center and zoom synchronized with the other map geos during roam. A zoom-coupled image layer is rebuilt on chart resize so its chart-relative pattern stays aligned.

The shared style schema also exposes `colors` and `tuner`, but the raster pattern supplies its own area color and is not a tunable color palette; leave both unset for image layers.

#### `echarts.map.layer.imageSet`

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
}
```

#### `echarts.map.fake3D`

Builds a foreground map plus middle and bottom replicated layers.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `color` | string \| dictionary | Foreground region color | |
| `borderColor` | string \| dictionary | Foreground border color | |
| `borderWidth` | number | Foreground border width | |
| `colorEmphasis` | string \| dictionary | Foreground emphasis color | |
| `colorMid` | string \| dictionary | Middle-layer color | Supplying it enables merging unless `mergeMid` is set explicitly |
| `borderColorMid` | string \| dictionary | Middle-layer border color | |
| `borderWidthMid` | number | Middle-layer border width | |
| `opacityMid` | number | Middle-layer opacity | Default: `0.4` |
| `offsetXMid` | number | Middle-layer horizontal offset | Pixels |
| `offsetYMid` | number | Middle-layer vertical offset | Default: `6 * jam.rem(0.2)` pixels |
| `mergeMid` | boolean | Merge colored regions for the middle layer | Defaults to whether `colorMid` is supplied |
| `shadowMid` | string \| dictionary | Middle-layer shadow | Default: `{}` |
| `colorBottom` | string \| dictionary | Bottom-layer color | Supplying it enables merging unless `mergeBottom` is set explicitly |
| `borderColorBottom` | string \| dictionary | Bottom-layer border color | |
| `borderWidthBottom` | number | Bottom-layer border width | |
| `opacityBottom` | number | Bottom-layer opacity | Default: `0.2` |
| `offsetXBottom` | number | Bottom-layer horizontal offset | Pixels |
| `offsetYBottom` | number | Bottom-layer vertical offset | Default: `8 * jam.rem(0.2)` pixels |
| `mergeBottom` | boolean | Merge colored regions for the bottom layer | Defaults to whether `colorBottom` is supplied |
| `shadowBottom` | string \| dictionary | Bottom-layer shadow | Default: `{}` |

#### `echarts.map.dense`

Computes density for map children with `jam-coord` after `childreposition`.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `gap` | number \| string | Dense-distance threshold | Defaults to `20px` |
| `classMap` | dictionary | Density ranges mapped to class names | |
| `asAttr` | boolean | Emit density as attributes | Defaults to `false` |
| `asVar` | boolean | Emit density as variables | Defaults to `false` |

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
}
```

---

## Component styles

Components are used inside chart styles to configure sub-elements. Reference them when using `eopts` for fine-grained control.

### `echarts.grid`

Chart grid (plot area). Args: `left`, `top`, `right`, `bottom`, `containLabel`, `width`, `height`, `show`, `backgroundColor`. Sub-styles: `border`, `shadow`, `showBorder`.

### `echarts.title`

Chart title. Args: `text`, `link`, `target`, `subtext`, `padding`, `backgroundColor`, `show`, `left`, `top`, `right`, `bottom`. Sub-styles: `border`, `shadow`, `textStyle`, `subtextStyle`, `hide`, `center`, `position`, `titleFont`, `subtitleFont`.

### `echarts.axis`

Axis configuration (x, y, radius). Access as `axis.x`, `axis.y`, or `axis.radiusAxis`. Args: `type`, `name`, `nameLocation`, `nameGap`, `nameRotate`, `offset`, `inverse`, `min`, `max`, `scale`, `splitNumber`, `minInterval`, `maxInterval`, `interval`, `logBase`, `startValue`, `triggerEvent`, `boundaryGap`, `show`, `position`, `silent`.

**Variants:** `axis.hide`, `axis.flipXY`, `axis.hideLine`, `axis.hideLabel`, `axis.hideTick`, `axis.hideSplitLine`, `axis.stripy.horizontal`, `axis.stripy.vertial`, `axis.polar`, `axis.shortenValueLabel`, `axis.rotateAxisLabel`, `axis.xAxisType`, `axis.yAxisType`, `axis.angleAxis`, `axis.radiusAxis`, `axis.xLabelFont`, `axis.yLabelFont`, `axis.yAxisName`, `axis.showYSplit`.

`axis.stripy.horizontal` accepts `tickcolor` to set the horizontal stripe axis-tick color; when omitted, it leaves the normal chart-theme tick color in control. `axis.stripy.vertial` has no arguments.

`axis.y` defaults to a value axis positioned on the left.

### `echarts.tooltip`

Tooltip config. Args: `trigger` (item/axis/none), `showContent`, `triggerOn`, `showDelay`, `hideDelay`, `enterable`, `confine`, `formatter`, `position`, `backgroundColor`, `padding`, `show`. Sub-styles: `border`, `shadow`, `textStyle`, `pointer`, `hide`, `itemTrigger`, `tooltipFont`, `restricted`.

### `echarts.legend`

Legend config. Args: `type`, `height`, `width`, `orient`, `align`, `itemGap`, `itemWidth`, `itemHeight`, `selectedMode`, `inactiveColor`, `icon`, `data`, `show`, `padding`, `backgroundColor`, `formatter`, `left`, `top`, `right`, `bottom`. Sub-styles: `border`, `shadow`, `itemStyle`, `lineStyle`, `textStyle`, `hide`, `orient`, `position`, `legendFont`.

### `echarts.label`

Label config. Args: `align`, `verticalAlign`, `rotate`, `width`, `height`, `rich`, `lineHeight`, `backgroundColor`, `show`, `padding`, `formatter`, `opacity`. Sub-style: `hide`.

### `echarts.visualMap`

Visual map (color gradient legend).

| Arg | Type | Description | Notes |
|---|---|---|---|
| `type` | string | Visual-map type | |
| `min`, `max` | number | Mapped value bounds | |
| `range` | array | Current handle range | |
| `inRange` | dictionary | Visual encoding inside the selected range | |
| `outRange` | dictionary | Visual encoding outside the selected range | |
| `calculable` | boolean | Show draggable handles | |
| `realtime` | boolean | Update while handles are dragged | |
| `inverse` | boolean | Reverse the visual map | |
| `precision` | number | Display precision | |
| `itemWidth`, `itemHeight` | number | Visual-map item dimensions | |
| `align` | string | Text/handle alignment | |
| `text` | array | Labels at the two ends | |
| `textGap` | number | Gap between text and the visual item | |
| `hoverlink` | boolean | Link hover state to chart data | |
| `dimension` | number | Data dimension to map | |
| `seriesIndex` | number | Series to map | |
| `unboundedRange` | boolean | Permit an unbounded selected range | |
| `show` | boolean | Show the visual map | Default: `false` |
| `left`, `top`, `right`, `bottom` | string \| number | Component position | |

### `echarts.geo`

Geographic coordinate system. Args: `map`, `roam`, `center`, `aspectScale`, `zoom`, `silent`, `show`, `left`, `top`, `right`, `bottom`. Sub-styles: `label`, `itemStyle`, `hover`.

### `echarts.calendar`

Calendar coordinate system. Args: `width`, `height`, `range`, `cellSize`, `orient`, `left`, `top`, `right`, `bottom`, `silent`. Sub-styles: `splitLine`, `itemStyle`, `dayLabel`, `monthLabel`, `yearLabel`.

### `echarts.dataZoom`

Data zoom component. Args: `type`, `showDetaile` (current API spelling), `orient`, `show`, `left`, `top`, `right`, `bottom`.

The current built-in style emits top-level chart config that `CashewChart` does not project into the final ECharts option. Until that runtime path is implemented, use the explicit `Styles.eopts({ option: { dataZoom: [...] } })` form above.

---

## Utility styles

- **`echarts.shadow`** — shadow config. Sub-style: `shadow.item` (offsetX, offsetY, blur, color).
- **`echarts.animation`** — animation config. Args: `animation`, `delay`, `duration`, `type`, `easing`. Sub-style: `animation.scale`.

---

## Themes

Each chart initializes with an adaptive ECharts appearance theme built for that chart element. It takes the series palette from the active JAML color set and resolves `sys` tokens for shared typography, titles, axes and axis pointers, grids, line and radar drawing, candlesticks, graph styling, calendar marks, toolbox icons, legends, tooltips, timelines, and mark-point labels. Theme-authored `Tokens.chart` values are cooked against the element and deep-merged over that base.

Treat this layer as an appearance baseline. Data, visibility, layout, interaction, and chart behavior remain owned by the chart's explicit styles and ECharts options.

- **`theme.light`** — force light mode on the chart element.
- **`theme.dark`** — force dark mode on the chart element.

```json jaml-playground
[
    {
        "type": "chart-pie",
        "data": [
            ["Item", "Share"],
            ["A", 40],
            ["B", 60]
        ],
        "styles": ["theme.dark", "echarts.pie", "echarts.pie.ring", "css(height:15rem;width:22rem)"]
    }
]
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
      }
    })
  ],
  data: [
    ['Month', 'Revenue'],
    ['Jan', 12000],
    ['Feb', 15000],
    ['Mar', 18000]
  ]
}
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
Styles.echarts.pie({ radius: ['0%', '100%'] })
```

```json
"echarts.pie(radius:['0%','100%'])"
```

Maps to `series.radius = ['0%', '100%']`. The string path form supports the same args as the JS form: `radius`, `center`, `startAngle`, `endAngle`, `roseType`, `padAngle`, etc.

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
Styles.echarts.pie({ radius: ['0%', '100%'] }),
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
