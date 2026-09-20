# map

**Class:** `MedlarMap` · **Type:** `"map"` · **Extends:** `CashewChart`

A geographic map chart built on ECharts with drill-down, coordinate-aware children, editable connection routes, and custom coordinate overrides. It loads a map profile through `MedlarMap.loader` and supports custom GeoJSON through `mapJSON`.

> **Important:** For the default China profile, region names are Chinese without administrative suffixes — use `"江苏"` not `"江苏省"`, `"南京"` not `"南京市"`.

---

## JAML usage

```json jaml-playground
{
  "type": "map",
  "cap": "Jiangsu Population",
  "region": "江苏",
  "styles": ["css(height:25rem;width:35rem)"],
  "data": [
    { "name": "南京", "value": 949 },
    { "name": "苏州", "value": 1291 },
    { "name": "无锡", "value": 749 }
  ]
}
```

---

## Params

Inherits all params from [CashewChart](./chart.md) (which extends [AbstractOptionElement](./JAM-UI.md#section-3--abstractoptionelement)).

| Param | Type | Default | Description |
|---|---|---|---|
| `region` | `string` | `''` | Current map region name. Default profile uses Chinese names without suffix: `"江苏"`, `"南京"`, `"鼓楼"`. Setting it resolves and synchronizes `adcode` after the loader is ready. |
| `adcode` | `string \| number` | `''` | Current map region identifier. Setting it resolves and synchronizes `region` through `MapLoader.getProfileByAdcode()`. |
| `topLevel` | `string` | `'level1'` | Highest loader level that click drill-up can reach. Default loader levels are `level1` and `level2`. |
| `roam` | `boolean` | `false` | Enable panning and zooming. |
| `click2Drill` | `boolean` | `true` | Click a region to drill down; click background to drill up. |
| `highlightTogether` | `boolean` | `false` | Cross-highlight linked regions together when one is hovered. |
| `silent` | `boolean` | `false` | Disable region interaction and drill handlers. Roaming remains available when `roam` is enabled. |
| `showBackground` | `boolean` | `false` | Render the replicated background geo and its optional scatter labels. |
| `connections` | `MapConnection[]` | `[]` | Connection definitions with unique `id`, `from`, and `to` labels. |
| `lineOption` | `Omit<MapConnection, 'id' \| 'from' \| 'to' \| 'midpoints' \| 'state'>` | `{}` | Shared line defaults merged beneath each connection. |
| `gap` | `number \| string` | `0` | Separation between parallel auto-routed connections. Strings are converted to pixels in the map container. |
| `editMode` | `boolean` | `false` | Enable draggable labels, endpoints, midpoints, route editing, snap control, and coordinate export controls. |
| `scenery` | `string` | `''` | Optional coordinate-override context below the current region. |
| `customCoords` | `{ connections; labels }` | `{ connections: {}, labels: {} }` | Read or apply exported connection and label coordinate overrides. |
| `colored` | `any[]` | `[]` | Regions to highlight with color. Auto-populated based on `region`. |
| `grayed` | `any[]` | `[]` | Regions to render in gray. Auto-populated as complement of `colored`. |
| `customAreas` | `string[]` | `[]` | Custom area names grouped into the `comboArea` region when loading `mapJSON`. |
| `sizeFactor` | `number` | `rem(0.2)` | Scale map label and shadow styling. |
| `conf` | `Dictionary` | `{}` | Override map display config: `zoom`, `center`. |
| `onregionchange` | `(value, oldValue) => void` | — | Fired when the active region changes (drill in/out). |
| `onconnectionchange` | `(change: MapConnectionChange) => void` | — | Fired after an edited connection is committed. |
| `oncoordchange` | `(change: MapCoordinateChange) => void` | — | Fired after an edited label coordinate is committed. |
| `mapJSON` | `string` (setter) | — | Load a custom GeoJSON URL. Sets `customData = true` and fetches + registers the map data. |
| `loader` | `string` (setter) | `MedlarMap.jsonPath + '/defaultLoader.mjs'` | Load a map-loader module. Its default export must be a constructible loader class accepting the active `MedlarMap` instance. |

**Data format:** `{name, value}` objects where `name` matches region names (Chinese, without administrative suffix). The `value` is used for the color scale.

**Styling:** Map inherits all ECharts styling from CashewChart. Use `Styles.echarts.*` styles, `Styles.eopts` for raw options, or `Styles.efuncs` for programmatic manipulation. See [echarts styles](../Styles/echarts.md).

Direct coordinate-aware map children use `stylize: 'item'`. The `map > item` parent context covers labels and related overlays without introducing a separate map-only role. Map recipes may refine the item with native variants such as `colored`, `grayed`, `external`, and `line`; `stylize: 'item-line'` is the compact form of `stylize: 'item'` plus `variant: 'line'`. Use `variant: 'autohide'` for an authored coordinate child that stays hidden until map editing exposes it.

```json jaml-playground
{
  "type": "map",
  "region": "江苏",
  "styles": ["css(height:20rem;width:30rem)"],
  "components": [
    {
      "type": "indicator",
      "stylize": "item",
      "coord": "南京",
      "cap": "Nanjing"
    }
  ]
}
```

---

## Instance methods

| Method | Description |
|---|---|
| `map.geoToPos(coord)` | Convert geographic coordinates `[lng, lat]` or region name to pixel position on the map. |
| `map.posToGeo(position)` | Convert a pixel position or `{ x, y }` into `[lng, lat]`. |
| `map.resolveGeoCoord(coord)` | Resolve a coordinate tuple, profile name, or active custom override to `[lng, lat]`. |
| `map.isCoordVisible(coord)` | Return whether a coordinate is inside the current chart viewport. |
| `map.calculatePos(el)` | Position a child element on the map based on its `jam-coord` attribute (geo coords or region name). |
| `map.switchRegion()` | Re-render the map for the current `region`. Call after changing `region`. |
| `map.repositionAllChild()` | Recalculate positions of all children with `jam-coord` attributes. |
| `map.updateConnection(id, patch)` | Patch a connection, redraw it, and return whether the id and result are valid. |
| `map.getConnectionLayout(id, at?)` | Return upright position/rotation metadata along a connection. Default `at` is `0.5`. |
| `map.updateCustomizedPos(coord, value, region?, scenery?)` | Store a label override and return its context-qualified key. |
| `map.downloadCustomCoords(filename?)` | Download and return the current `{ connections, labels }` override document. |

## Connections and coordinate editing

`MapConnection` extends the [line options](../Plugins/line.md#lineoption) that are meaningful on a map and adds:

```ts
interface MapConnection {
  id: string;
  from: string;
  to: string;
  midpoints?: [number, number][];
  state?: 'default' | 'reverse';
}
```

`from` and `to` use the same profile names or custom coordinate keys accepted by `jam-coord`. A connection-level option overrides `lineOption`; map connections default to `path: 'polyline'`. `state: 'reverse'` reverses dash animation and swaps start/end symbol presentation without changing the authored identifiers.

```javascript jaml-playground
export default {
  type: 'map',
  region: '江苏',
  styles: ['css(height:25rem;width:35rem)'],
  gap: '1rem',
  lineOption: {
    width: 4,
    path: 'smooth',
    endTangent: 'path',
    endSymbol: 'arrow'
  },
  connections: [
    { id: 'nanjing-suzhou', from: '南京', to: '苏州' },
    { id: 'nanjing-wuxi', from: '南京', to: '无锡', animation: true }
  ]
};
```

Set `editMode: true` to adjust labels, connection endpoints, and midpoints in the rendered map. Committed connection edits emit a `MapConnectionChange` with `id`, `connection`, `startPoint`, `endPoint`, and a `reason` of `endpoint-move`, `midpoint-add`, `midpoint-move`, `midpoint-remove`, or `route-move`. Label edits emit `MapCoordinateChange` with the resolved key and old/new coordinates.

A child whose `coord` equals a connection id is attached to that route's middle layout. It follows the route position and upright rotation, highlights the line on hover, receives `state: 'reverse'` when applicable, and exposes `jam-flipped` when its visual orientation was corrected.

Custom coordinate keys are resolved from most specific to least specific: `<name>@<region>@<scenery>`, `<name>@<region>`, then `<name>`. The `customCoords` document keeps connection route overrides under `connections` and label overrides under `labels`, so the result of `downloadCustomCoords()` can be loaded back directly.

---

## Static configuration

Configure once before any map renders:

```javascript
MedlarMap.jsonPath = 'assets/mapProfile/'          // base path for GeoJSON files
MedlarMap.customizedPos = {}                        // custom position overrides
```

### Static properties

| Property | Type | Description |
|---|---|---|
| `MedlarMap.jsonPath` | `string` | Base URL path for GeoJSON files. Default `'assets/mapProfile/'`. |
| `MedlarMap.customizedPos` | `Dictionary` | Override default region positions by name. |
| `MedlarMap.extraNameMap` | `Dictionary` | Additional name-to-adcode mappings for custom regions. |
| `MedlarMap.allAreas` | `Dictionary` | Pre-loaded area lists by level (`state`, `region`, `province`, `city`, `district`). |
| `MedlarMap.levelMap` | `Dictionary` | Map level hierarchy mapping. |
| `MedlarMap.loaderMap` | `Dictionary` | Cached custom `MapLoader` instances keyed by map name. |
| `MapLoader.SCALE_FACTOR` | `number` | Fallback region-fit zoom multiplier. Defaults to `0.93`; used when neither `conf.zoom` nor the region profile supplies a zoom. |

### Custom loader contract

A custom loader module must default-export a class instantiated as `new Loader(map)`. Keep name and identifier lookup distinct: `getProfileByName(name)` resolves authored region names, while `getProfileByAdcode(adcode)` resolves identifiers used by drill-down, drawing, coloring, and coordinate lookup. `prepareRegion(adcode)` and `buildOptionConfig(adcode, conf)` receive the current identifier.

`buildOptionConfig(adcode, conf)` may return `frame` and `parentFrame` as `[[minLng, minLat], [maxLng, maxLat]]`. `frame` describes the focused region; `parentFrame` describes the full source map and supplies the geo bounding coordinates used to keep replicated and image layers aligned.

---

## Events

| Event | Description |
|---|---|
| `regionchange` | Fired when the map region changes (drill in/out). Same timing as `onregionchange` hook. |
| `connectionchange` | Fired after a connection edit is committed. Same detail as `onconnectionchange`. |
| `coordchange` | Fired after a label coordinate edit is committed. Same detail as `oncoordchange`. |
| `chartclick` | ECharts click event (inherited from CashewChart). |

---

## Examples

### Jiangsu province with city data

```json jaml-playground
{
  "type": "map",
  "cap": "Jiangsu Population",
  "region": "江苏",
  "styles": ["css(height:25rem;width:35rem)"],
  "data": [
    { "name": "南京", "value": 949 },
    { "name": "苏州", "value": 1291 },
    { "name": "无锡", "value": 749 },
    { "name": "徐州", "value": 902 },
    { "name": "常州", "value": 536 },
    { "name": "南通", "value": 772 },
    { "name": "连云港", "value": 460 },
    { "name": "淮安", "value": 455 },
    { "name": "盐城", "value": 668 },
    { "name": "扬州", "value": 458 },
    { "name": "镇江", "value": 321 },
    { "name": "泰州", "value": 450 },
    { "name": "宿迁", "value": 498 }
  ]
}
```

### Drill-down: province → city

Click a city to drill down to its districts. Click background to drill back up:

```javascript jaml-playground
export default {
  type: 'map',
  styles: ['css(height:25rem;width:35rem)'],
  region: '江苏',
  topLevel: 'level1',
  click2Drill: true,
  data: [
    { name: '南京', value: 949 },
    { name: '苏州', value: 1291 },
    { name: '无锡', value: 749 }
  ],
  onregionchange: function(region) {
    nutmeg.info('Drilled to: ' + region.name)
  }
}
```

### Positioning child elements on the map

Children with `jam-coord` attributes are auto-positioned at their geographic coordinates. Use `buildFor` to generate one indicator per data item:

```javascript jaml-playground
export default {
  type: 'map',
  region: '江苏',
  styles: ['css(height:25rem;width:35rem)', 'animation.entry.fadein'],
  childStyles: [
    'background.crystal',
    'css(borderRadius:1rem;boxShadow:0rem 0.5rem 0.5rem -0.5rem black;width:8rem;padding:0.4rem 0.8rem)',
    'animation.entry.feather'
  ],
  components: [
    {
      type: 'indicator',
      buildFor: 'i in data',
      stylize: 'item',
      icon: '👤',
      unit: '万',
      cap: '{{i.name}}',
      value: '{{i.value}}',
      coord: '{{i.name}}'
    }
  ],
  vars: {
    data: [
      { name: '南京', value: 949 },
      { name: '苏州', value: 1291 },
      { name: '无锡', value: 749 },
      { name: '徐州', value: 902 },
      { name: '常州', value: 536 }
    ]
  }
}
```

---

## Notes

- **Region names must be in Chinese without administrative suffixes** — `"江苏"` not `"江苏省"`, `"南京"` not `"南京市"`, `"鼓楼"` not `"鼓楼区"`.
- GeoJSON files are loaded from `MedlarMap.jsonPath` on first access for each region. The path should contain files named by region adcode (e.g. `100000.json` for China, `320100.json` for Nanjing).
- Setting `region` triggers `switchRegion()` which loads GeoJSON, calculates center/zoom, and redraws the chart.
- When `click2Drill` is enabled, clicking a colored region drills down and clicking the background drills up.
- During roaming, replicated and image geo layers stay synchronized and children with `jam-coord` are repositioned. A drag gesture suppresses drill-click handling until roaming settles.
- Custom GeoJSON maps can be loaded with `mapJSON`. When `customAreas` is present, the initial focused region becomes `comboArea`.
