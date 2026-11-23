# map

**Class:** `MedlarMap` · **Type:** `"map"` · **Extends:** `CashewChart`

A geographic map chart built on ECharts with drill-down, coordinate-aware children, editable connection routes, and custom coordinate overrides. It loads a map profile through `MedlarMap.loader` and supports custom GeoJSON through `mapJSON`.

For a 3D terrain surface or regional slabs, use [`map3d` and prepare your own terrain assets](map-3d.md).

## Host prerequisites

A `map` needs ECharts plus geographic data supplied by the host. The framework does not ship a China profile, a default loader module, or regional GeoJSON assets. Choose one data source when constructing the map:

-   `loader: '/maps/profile-loader.mjs'`: a host-served ES module whose default export is a constructible map loader accepting the active map. It supplies profiles, coordinates, region resolution and drill relationships. Serve every GeoJSON file that loader requests.
-   `mapJSON: '/maps/site.json'`: a host-served GeoJSON FeatureCollection with a `.json` URL for a custom map. Feature names must match the names used by `data` and coordinate-aware children. This path uses the built-in GeoJSON loader and does not fetch the default loader module.

With neither param, the runtime requests `defaultLoader.mjs` beneath `MedlarMap.jsonPath` (initially `assets/mapProfile/`). That is an integration convention, not a bundled resource. A missing module or GeoJSON response is a host setup error; select a data source before composing the map.

The regional examples below are integration snippets for a host with a China profile installed; they are not self-contained playground demos. That profile uses names such as `"江苏"` and `"南京"` without administrative suffixes. Other profiles define their own names and identifiers.

---

## JAML usage

```json
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

| Param                | Type                                                                    | Default                                          | Description                                                                                                                                                                          |
| -------------------- | ----------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `region`             | `string`                                                                | `''`                                             | Current map region name. The example China profile uses names without suffix: `"江苏"`, `"南京"`, `"鼓楼"`. Setting it resolves and synchronizes `adcode` after the loader is ready. |
| `adcode`             | `string \| number`                                                      | `''`                                             | Current map region identifier. Setting it resolves and synchronizes `region` through `MapLoader.getProfileByAdcode()`.                                                               |
| `topLevel`           | `string`                                                                | `'level1'`                                       | Highest loader level that click drill-up can reach. The built-in GeoJSON loader uses `level1` and `level2`; custom loaders define their profiles.                                    |
| `roam`               | `boolean`                                                               | `false`                                          | Enable panning and zooming.                                                                                                                                                          |
| `click2Drill`        | `boolean`                                                               | `true`                                           | Click a region to drill down; click background to drill up.                                                                                                                          |
| `highlightTogether`  | `boolean`                                                               | `false`                                          | Cross-highlight linked regions together when one is hovered.                                                                                                                         |
| `silent`             | `boolean`                                                               | `false`                                          | Disable region interaction and drill handlers. Roaming remains available when `roam` is enabled.                                                                                     |
| `showBackground`     | `boolean`                                                               | `false`                                          | Render the replicated background geo and its optional scatter labels.                                                                                                                |
| `connections`        | `MapConnection[]`                                                       | `[]`                                             | Connection definitions with unique `id`, `from`, and `to` labels.                                                                                                                    |
| `lineOption`         | `Omit<MapConnection, 'id' \| 'from' \| 'to' \| 'midpoints' \| 'state'>` | `{}`                                             | Shared line defaults merged beneath each connection.                                                                                                                                 |
| `gap`                | `number \| string`                                                      | `0`                                              | Separation between parallel auto-routed connections. Strings are converted to pixels in the map container.                                                                           |
| `editMode`           | `boolean`                                                               | `false`                                          | Enable draggable labels, endpoints, midpoints, route editing, snap control, and coordinate export controls.                                                                          |
| `scenery`            | `string`                                                                | `''`                                             | Optional coordinate-override context below the current region.                                                                                                                       |
| `customCoords`       | `{ connections; labels }`                                               | `{ connections: {}, labels: {} }`                | Read or apply exported connection and label coordinate overrides.                                                                                                                    |
| `labelPlacement`     | `'anchored'` \| `'callout'`                                             | `'anchored'`                                     | Place direct geographic items at their anchors or automatically offset eligible `item-ghost` labels with leaders.                                                                    |
| `coloring`           | `'adjacency'` \| `'legacy'`                                             | `'adjacency'`                                    | Assign automatic fills to separate regions with shared borders. `legacy` uses the previous palette assignment.                                                                       |
| `colored`            | `any[]`                                                                 | `[]`                                             | Regions highlighted in the current view. Auto-populated based on `region`.                                                                                                           |
| `grayed`             | `any[]`                                                                 | `[]`                                             | Regions shown for geographic context. Their palette can use any hue. Auto-populated as the complement of `colored`.                                                                  |
| `customAreas`        | `string[]`                                                              | `[]`                                             | Custom area names grouped into the `comboArea` region when loading `mapJSON`.                                                                                                        |
| `sizeFactor`         | `number`                                                                | `rem(0.2)`                                       | Scale map label and shadow styling.                                                                                                                                                  |
| `conf`               | `Dictionary`                                                            | `{}`                                             | Override map display config: `zoom`, `center`.                                                                                                                                       |
| `onregionchange`     | `(profile) => void`                                                     | —                                                | Receives the active region profile after region preparation (including drilling). No previous-profile argument is supplied.                                                          |
| `onconnectionchange` | `(change: MapConnectionChange) => void`                                 | —                                                | Fired after an edited connection is committed.                                                                                                                                       |
| `oncoordchange`      | `(change: MapCoordinateChange) => void`                                 | —                                                | Fired after an edited label coordinate is committed.                                                                                                                                 |
| `mapName`            | `string`                                                                | `''`                                             | Optional registration and loader cache name for a custom GeoJSON source. Use a distinct name for each GeoJSON and `customAreas` combination.                                         |
| `mapJSON`            | `string` (setter)                                                       | —                                                | Load a custom GeoJSON URL. Sets `customData = true` and fetches + registers the map data.                                                                                            |
| `loader`             | `string` (setter)                                                       | `defaultLoader.mjs` beneath `MedlarMap.jsonPath` | Load a map-loader module. Its default export must be a constructible loader class accepting the active `MedlarMap` instance.                                                         |

**Data format:** `{name, value}` objects where `name` matches names in the selected loader or GeoJSON. The `value` is used for the color scale.

On builds with adjacency coloring, the automatic palette uses the first five swatch colors by default. A nonempty authored foreground palette supplies its own slot count. Geo option colors take precedence over `Styles.echarts.map({ colors })`, and explicit region styles and data-driven fills keep their assignments. Context geography keeps its background palette. On a mounted map, read `coloringConflicts` for the named neighbor pairs that still receive the same automatic paint. Only neighbors that share a border segment participate.

**Styling:** Map inherits all ECharts styling from CashewChart. Use `Styles.echarts.*` styles, `Styles.eopts` for raw options, or `Styles.efuncs` for programmatic manipulation. See [echarts styles](../Styles/echarts.md).

Set `variant: 'standard'` to select the active theme’s [standard map recipe](../Theme/authoring.md#standard-map-recipe). [`Styles.echarts.map`](../Styles/echarts.md#entry-echarts-map) controls colored region fills and built-in name ink. Use `Styles.echarts.map.background({ colors, opacity })` with `showBackground: true` to style grayed regions. [`Styles.echarts.map.layer`](../Styles/echarts.md#entry-echarts-map-layer) adds separately styled geography.

Direct coordinate-aware map children use `stylize: 'item'`. The `map > item` parent context covers labels and related overlays without introducing a separate map-only role. Map recipes may refine the item with native variants such as `colored`, `grayed`, `external`, and `line`; `stylize: 'item-line'` is the compact form of `stylize: 'item'` plus `variant: 'line'`. Use `variant: 'autohide'` for an authored coordinate child that stays hidden until map editing exposes it.

On builds with automatic callouts, set `labelPlacement: 'callout'` and use direct children with `stylize: 'item-ghost'`. A numeric `coord` or a saved name coordinate supplies the anchor. With an unsaved GeoJSON name, Medlar uses the area's centroid when available and falls back to the profile position. The map moves labels only where they fit, and each unplaced label stays anchored. Editing pauses automatic placement. An explicit `jam-map-callout` on the child, such as `attrs: { 'jam-map-callout': 'elbow' }`, selects the authored placement instead.

```json
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

| Method                                                     | Description                                                                                         |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `map.geoToPos(coord)`                                      | Convert geographic coordinates `[lng, lat]` or region name to pixel position on the map.            |
| `map.posToGeo(position)`                                   | Convert a pixel position or `{ x, y }` into `[lng, lat]`.                                           |
| `map.resolveGeoCoord(coord)`                               | Resolve a coordinate tuple, profile name, or active custom override to `[lng, lat]`.                |
| `map.isCoordVisible(coord)`                                | Return whether a coordinate is inside the current chart viewport.                                   |
| `map.calculatePos(el)`                                     | Position a child element on the map based on its `jam-coord` attribute (geo coords or region name). |
| `map.switchRegion()`                                       | Re-render the map for the current `region`. Call after changing `region`.                           |
| `map.repositionAllChild()`                                 | Recalculate positions of all children with `jam-coord` attributes.                                  |
| `map.updateConnection(id, patch)`                          | Patch a connection, redraw it, and return whether the id and result are valid.                      |
| `map.getConnectionLayout(id, at?)`                         | Return upright position/rotation metadata along a connection. Default `at` is `0.5`.                |
| `map.updateCustomizedPos(coord, value, region?, scenery?)` | Store a label override and return its context-qualified key.                                        |
| `map.downloadCustomCoords(filename?)`                      | Download and return the current `{ connections, labels }` override document.                        |

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

Use place names in `from` and `to`. Medlar resolves each name through the loaded geography and saved coordinates. At least one endpoint must be featured for the route to appear. A connection-level option overrides `lineOption`. The default route uses `path: 'polyline'`. `state: 'reverse'` reverses dash animation and swaps start/end symbol presentation while keeping the authored identifiers.

```javascript
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

### Saved coordinates and label data

Pass both `labels` and `connections` in `customCoords`. `labels` maps place or label keys to `[longitude, latitude]`. Each entry under `connections` uses the connection ID and contains `midpoints`, plus optional `startPoint` and `endPoint` coordinates. Use `midpoints: []` to save a route with no intermediate points. Saved route points take precedence over the base route. `downloadCustomCoords()` exports this same shape.

For a place key or connection ID, the map looks up `<key>@<region>@<scenery>`, then `<key>@<region>`, then `<key>`. In Medlar, applying `customCoords.labels` replaces the saved label positions shared by connected maps. The connection overrides apply to the receiving map. Use one complete label dictionary when several maps share positions.

An authored `label` or `indicator` can use a place name or a `[longitude, latitude]` pair as its `coord`. Keep captions and reading values in the child or its bound data. For active routes, Medlar generates missing endpoint labels and reuses an authored child with the same coordinate key. In-map endpoints use the place key. An out-of-map place can receive a pair key such as `North Basin-Relay Station`, with `-from` or `-to` if both ends need distinct external keys. An offscreen external label can be drawn beside its peer using a temporary display position while the saved coordinates stay as authored.

To serve the arrays and overrides separately, use `connectionsURL` and `customCoordsURL`. Use a per-key URL inside `vars` to fetch reading values alongside local defaults. [Parameter URL suffixes](../JAML/jaml-format.md#param-suffixes--keysuffix)

### Regional readings and route tags

Serve the [synthetic basin GeoJSON](examples/basin-regions.json) at `/assets/terrain/basin-regions.json`. The saved label coordinate places a reading above the route. The connection override sets the route's endpoints and midpoint. The tag follows the route because its `coord` matches the connection's `id`.

```javascript
const plate = {
    backgroundColor: 'var(--jam-color-surface-default)',
    color: 'var(--jam-color-fg-default)',
    inlineSize: 'max-content',
    padding: '0.25rem 0.5rem',
    borderRadius: 'var(--jam-border-radius-s)'
};

export default {
    type: 'map',
    id: 'basin-map-2d',
    variant: 'standard',
    mapJSON: '/assets/terrain/basin-regions.json',
    customAreas: ['North Basin', 'East Shelf'],
    click2Drill: false,
    styles: [Styles.echarts.map({ showLabel: false })],
    style: { height: 'clamp(14rem, 60vw, 24rem)' },
    vars: { basinReading: 12 },
    lineOption: { color: 'var(--jam-color-fg-default)' },
    connections: [{ id: 'basin-link', from: 'North Basin', to: 'East Shelf' }],
    customCoords: {
        labels: { 'North Basin': [-113.2, 39.45] },
        connections: { 'basin-link': { startPoint: [-113.4, 38.5], midpoints: [[-111.95, 38.8]], endPoint: [-110.6, 38.5] } }
    },
    components: [
        { type: 'indicator', id: 'basin-reading', stylize: 'item', coord: 'North Basin', cap: 'North Basin', value: '{{basinReading}}', unit: 'MW', style: plate },
        { type: 'label', id: 'basin-route-tag', stylize: 'item-line', coord: 'basin-link', cap: 'Basin link', style: plate }
    ]
};
```

The same data can be used in the [regional 3D example](map-3d.md#regional-readings-and-route-tags).

---

## Static configuration

Configure once before any map renders:

```javascript
MedlarMap.jsonPath = 'assets/mapProfile/'; // base path for GeoJSON files
MedlarMap.customizedPos = {}; // custom position overrides
```

### Static properties

| Property                  | Type         | Description                                                                                                                    |
| ------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `MedlarMap.jsonPath`      | `string`     | Base URL path for GeoJSON files. Default `'assets/mapProfile/'`.                                                               |
| `MedlarMap.customizedPos` | `Dictionary` | Override default region positions by name.                                                                                     |
| `MedlarMap.extraNameMap`  | `Dictionary` | Additional name-to-adcode mappings for custom regions.                                                                         |
| `MedlarMap.allAreas`      | `Dictionary` | Pre-loaded area lists by level (`state`, `region`, `province`, `city`, `district`).                                            |
| `MedlarMap.levelMap`      | `Dictionary` | Map level hierarchy mapping.                                                                                                   |
| `MedlarMap.loaderMap`     | `Dictionary` | Cached custom `MapLoader` instances keyed by map name.                                                                         |
| `MapLoader.SCALE_FACTOR`  | `number`     | Fallback region-fit zoom multiplier. Defaults to `0.93`; used when neither `conf.zoom` nor the region profile supplies a zoom. |

### Custom loader contract

A custom loader module must default-export a class instantiated as `new Loader(map)`. Keep name and identifier lookup distinct: `getProfileByName(name)` resolves authored region names, while `getProfileByAdcode(adcode)` resolves identifiers used by drill-down, drawing, coloring, and coordinate lookup. `prepareRegion(adcode)` and `buildOptionConfig(adcode, conf)` receive the current identifier.

`buildOptionConfig(adcode, conf)` may return `frame` and `parentFrame` as `[[minLng, minLat], [maxLng, maxLat]]`. `frame` describes the focused region; `parentFrame` describes the full source map and supplies the geo bounding coordinates used to keep replicated and image layers aligned.

---

## Events

| Event              | Description                                                                             |
| ------------------ | --------------------------------------------------------------------------------------- |
| `regionchange`     | Fired when the map region changes (drill in/out). Same timing as `onregionchange` hook. |
| `connectionchange` | Fired after a connection edit is committed. Same detail as `onconnectionchange`.        |
| `coordchange`      | Fired after a label coordinate edit is committed. Same detail as `oncoordchange`.       |
| `chartclick`       | ECharts click event (inherited from CashewChart).                                       |

---

## Examples

### Jiangsu province with city data

```json
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

```javascript
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
    onregionchange: function (region) {
        nutmeg.info('Drilled to: ' + region.name);
    }
};
```

### Positioning child elements on the map

Children with `jam-coord` attributes are auto-positioned at their geographic coordinates. Use `buildFor` to generate one indicator per data item:

```javascript
export default {
    type: 'map',
    region: '江苏',
    styles: ['css(height:25rem;width:35rem)', 'animation.entry.fadein'],
    childStyles: ['background.crystal', 'css(borderRadius:1rem;boxShadow:0rem 0.5rem 0.5rem -0.5rem black;width:8rem;padding:0.4rem 0.8rem)', 'animation.entry.feather'],
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
};
```

---

## Notes

-   Region names and identifiers belong to the supplied profile. The China-profile examples use `"江苏"`, `"南京"` and `"鼓楼"`; these are not universal naming requirements.
-   GeoJSON request locations and file naming follow the supplied loader. Adcode-named files such as `100000.json` and `320100.json` are a China-profile convention, not a requirement for custom GeoJSON.
-   After changing `region` or `adcode` programmatically, call and await `switchRegion()` to prepare the selected region and redraw. Initialization and built-in drill interactions perform that switch themselves.
-   When `click2Drill` is enabled, clicking a colored region drills down and clicking the background drills up.
-   During roaming, replicated and image geo layers stay synchronized and children with `jam-coord` are repositioned. A drag gesture suppresses drill-click handling until roaming settles.
-   Custom GeoJSON maps can be loaded with `mapJSON`. When `customAreas` is present, the initial focused region becomes `comboArea`.
