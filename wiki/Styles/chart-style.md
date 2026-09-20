# chart style variants

**Element:** `jam-chart` · **Type:** `element`

The chart is an ECharts-based element.

---

## Element styling

### Automatic base behavior

The element installs its internal base style automatically. Use public styles for appearance; no `_basic` entry is needed in authored JAML.

Waits for chart readiness and calls ECharts `resize()`. On an actual resize event, it also calls `redraw()` when the element's `redrawOnResize` property is true; the initial stable callback has no event and only resizes the chart. No args.

```json jaml-playground
[
    {
        "type": "chart-pie",
        "cap": "Revenue",
        "styles": ["css(height:18rem;width:24rem)"],
        "data": [
            ["Product", "Revenue"],
            ["Product A", 4500],
            ["Product B", 2500],
            ["Product C", 3000]
        ]
    }
]
```

---

## Usage

```javascript jaml-playground
export default {
  type: 'chart-pie',
  cap: 'Revenue',
  styles: ['css(height:18rem;width:24rem)'],
  data: [
    ['Product', 'Revenue'],
    ['Product A', 4500],
    ['Product B', 2500]
  ]
}
```
