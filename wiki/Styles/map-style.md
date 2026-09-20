# map

`Styles.map.*` -- ECharts geo/map element extending chart.

---

## Element styling

### Automatic base behavior

The element installs its internal base style automatically. Use public styles for appearance; no `_basic` entry is needed in authored JAML.

Waits for chart readiness and calls ECharts `resize()`. On an actual resize event, it redraws when `redrawOnResize` is true or the map has a fixed image fill. Otherwise it reapplies map offsets and repositions all child elements. Applied automatically on element creation. No args.

```json jaml-playground
[
    {
        "type": "map",
        "cap": "Map Region",
        "styles": ["css(height:18rem;width:24rem)"],
        "components": []
    }
]
```
