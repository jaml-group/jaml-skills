# layer.chart

`Styles.layer.chart` — ECharts integration layer. Renders a chart as a background or overlay layer.

---

## Args

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.chart`.

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
