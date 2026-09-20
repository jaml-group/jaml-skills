# layer.chart

`Styles.layer.chart` — ECharts integration layer. Renders a chart as a background or overlay layer.

---

## Args

| Arg | Type | Description | Notes |
|---|---|---|---|
| `type` | `string` | Chart type | Options: `'line'`, `'pie'`, `'bar'`, `'scatter'`, `'radar'`, `'tree'`, `'treemap'`, `'sunburst'`, `'boxplot'`, `'candlestick'`, `'heatmap'`, `'map'`, `'parallel'`, `'sankey'`, `'funnel'`, `'gauge'`, `'pictorialBar'`, `'themeRiver'`, `'custom'` |
| `data` | `array` | Chart data | — |
| `dataUrl` | `string` | Remote data URL to fetch chart data from | — |
| `styles` | `array` | Chart-specific style options | Default: `[]` |
| `width` | `string` | Chart width | Default: `'100%'` |
| `height` | `string` | Chart height | Default: `'100%'` |
| `aspectRatio` | `string` | Chart aspect ratio (overrides width when set) | — |
| `alignSelf` | `string` | Cross-axis self-alignment | Options: `'stretch'`, `'center'`, `'baseline'`, `'flex-end'`, `'flex-start'` |
| `alignItems` | `string` | Cross-axis children alignment | Options: `'stretch'`, `'center'`, `'baseline'`, `'flex-end'`, `'flex-start'` |
| `justifyContent` | `string` | Main-axis space distribution | Options: `'flex-start'`, `'center'`, `'flex-end'`, `'space-between'`, `'space-around'`, `'space-evenly'` |
| `align` | `string` | Shorthand alignment | Options: e.g. `'center-middle'`, `'left-top'`, `'right-bottom'` |

Standard layer args also apply: `zIndex`, `opacity`, `mask`, `filter`, `padding`, `borderRadius`, `entryAnimation`, `exitAnimation`, etc.

```json jaml-playground
[
    {
        "type": "indicator",
        "cap": "Line chart",
        "styles": ["layer.chart(type:line;data:[{name:'Trend',data:[120,200,150,80,70,110,130]}];width:100%;height:100%)"]
    },
    {
        "type": "indicator",
        "cap": "Pie chart",
        "styles": ["layer.chart(type:pie;data:[{name:'Share',data:[{value:40,name:'A'},{value:30,name:'B'},{value:30,name:'C'}]}])"]
    }
]
```
