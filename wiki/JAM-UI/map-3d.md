# map3d

**Class:** `MulberryMap` · **Type:** `"map3d"` · **Extends:** `AbstractElement`

Declare `type: 'map3d'`. Map 3D mounts as `<jam-map3d>`. Use `jam-map3d` in CSS and DOM selectors.

Use `map3d` to render a local elevation surface or a set of geographic slabs. Deploy the `jam-map-3d.mjs` companion module alongside the Jam-UI browser runtime. Serve your own terrain assets at URLs the browser can fetch. The examples use `/assets/terrain/` as an application-owned URL prefix.

| Scene            | Resources                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Simple terrain   | A `dem` GeoTIFF. Add `landCover` for optional land-cover colors.                                                                                       |
| Regional terrain | A `dem` GeoTIFF and a `mapJSON` FeatureCollection. Add `backgroundDem` for a separate shared relief crop and a normal map for optional surface detail. |

## Options

Both scenes use the map's regular element styles and `components`. Use a direct child with `coord` to place it geographically and set its [label placement](#geographic-label-placement). Use `slot: 'layer'` for screen-space controls such as a camera toolbar.

| Option                                                 | Scope    | Default and behavior                                                                                                                                                                      |
| ------------------------------------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dem`                                                  | Both     | Required URL of the primary elevation GeoTIFF.                                                                                                                                            |
| `mapJSON`                                              | Regional | A URL or inline FeatureCollection of named WGS84 polygons. Supplying it selects the regional scene.                                                                                       |
| `customAreas`                                          | Regional | `[]`. Names from `properties.name` that identify the featured regions.                                                                                                                    |
| `landCover`                                            | Simple   | Optional class raster URL for the surface colors.                                                                                                                                         |
| `backgroundGeoJSON`                                    | Simple   | A URL or inline FeatureCollection of named WGS84 polygons around the primary crop.                                                                                                        |
| `backgroundDem`                                        | Both     | Optional broader relief URL. In regional mode it defaults to `dem`. In simple terrain it supplies relief for `backgroundGeoJSON`.                                                         |
| `backgroundMode`                                       | Both     | `'flat'`, `'solid'`, `'wireframe'`, or `'contours'`. Default `'flat'`. Simple terrain uses these modes when it has background geography.                                                  |
| `contours`, `contourOptions`                           | Both     | `contours: true` selects contours for the whole map. Configure the [contour layers](#contour-layers-and-opacity) with `contourOptions`.                                                   |
| `connections`, `customCoords`, `scenery`, `lineOption` | Regional | Connections and saved geographic positions. See [connections and labels](#connections-and-labels).                                                                                        |
| `terrainScale`                                         | Regional | `43`, limited to 1–80. Vertical scale for the shared relief.                                                                                                                              |
| `slabThickness`                                        | Regional | Normalized slab base thickness from `0` to `1`. The default `0.31` gives a `1rem` base at the initial viewport fit.                                                                       |
| `slabOpacity`                                          | Regional | Override [slab opacity](#contour-layers-and-opacity) separately for colored and grayed regions.                                                                                           |
| `elevationShading`                                     | Both     | `true`. Apply tint by elevation.                                                                                                                                                          |
| `viewMode`                                             | Regional | `'map'` or `'globe'`. Default `'map'`.                                                                                                                                                    |
| `initialCamera`                                        | Both     | A preset name or [camera pose](#initial-camera) for the first terrain frame and for `resetCamera()`.                                                                                      |
| `showGrid`                                             | Regional | `true`. Show the regional grid.                                                                                                                                                           |
| `showWorldBorders`, `worldBorders`, `worldDetails`     | Regional | `showWorldBorders` defaults to `false`. Supply optional world context URLs as described in [assemble a regional map](#assemble-a-regional-map).                                           |
| `spacing`                                              | Simple   | `78`, limited to 0–100. Controls layer separation.                                                                                                                                        |
| `playing`                                              | Both     | Omit to follow reduced-motion preferences. Use `true`, `false`, or `'auto'` for [orbit control](#camera-readiness-and-events). On simple terrain this option also controls the dot sweep. |
| `depthOfField`                                         | Both     | Default `false`. Use `true`, `'auto'`, or a [focus options dictionary](#camera-readiness-and-events).                                                                                     |
| `indicatorRenderer`                                    | Both     | `'auto'` lets the renderer choose HTML-in-canvas where supported, with DOM fallback. Set `'dom'` to force DOM overlays.                                                                   |
| `cameraLabel`                                          | Both     | Accessible instruction text for the focusable camera canvas. The default describes rotation and zoom keys.                                                                                |

The first viewport fit calibrates the slab's vertical dimensions. Later fits and zoom scale the relief and base together while preserving the calibrated shape.

Builds with regional focus, automatic coloring, or power objects additionally support these options.

| Option     | Scope    | Default and behavior                                                                                                                                                                                                                                              |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `silent`   | Regional | `false`. Set `true` to suppress pointer region navigation and hover while keeping camera controls and programmatic focus.                                                                                                                                         |
| `coloring` | Both     | `'adjacency'` assigns automatic fills using neighboring regions. `'legacy'` uses the previous palette assignment. The default automatic palette starts with the first five swatch colors. [`coloringConflicts`](map.md#params) reports unresolved neighbor pairs. |
| `objects`  | Both     | `[]`. Each entry supplies a `model`, a WGS84 `coord`, and optional clockwise-degree `heading`, `scale` (default `1`), and `minZoom` (default `0`, relative to the fitted view).                                                                                   |

Object model names are `cooling-tower`, `smokestacks`, `wind-turbine`, `solar-array`, `dam`, `pylon`, `utility-pole`, `substation`, and `battery-storage`. The map skips unknown or unplaceable entries. Replacing `objects` updates the live scene. Regional equipment and conductor motion use their own clock and honor reduced motion independently of `playing`.

## Camera, readiness, and events

### Initial camera

Set `initialCamera` on the map definition to frame the first terrain draw. Serve the [elevation GeoTIFF](#prepare-an-elevation-geotiff) at the URL below. This example sets `playing: false` to keep the opening view still.

```json
{
    "type": "map3d",
    "dem": "/assets/terrain/dem.tif",
    "initialCamera": { "preset": "showcase", "pitch": 32.5, "zoom": 1.4, "bearing": 15 },
    "playing": false,
    "styles": ["load.spinner"],
    "style": { "height": "24rem" }
}
```

Use `'showcase'`, `'top-down'`, or `'low-angle'` on its own, or supply `{ preset?, pitch?, zoom?, bearing? }` to override individual values. Omitted values come from the chosen preset, which defaults to `'showcase'`. Numeric fields accept finite values, including fractions.

-   `pitch` is in degrees from directly overhead. Each scene applies its orbit limits. Globe caps pitch at the fitted geography's horizon.
-   `zoom` is relative to the geographic fit. `1` uses the fitted scale. Regional Map and Globe clamp zoom to 0.75–3, and a simple DEM clamps it to 0.65–4.
-   `bearing` is in degrees clockwise from geographic north. On a UTM crop, north follows the local meridian at the fitted target.

The fit determines the center. Assigning `initialCamera` on a mounted map sets the pose for the next terrain mount and the next no-argument `resetCamera()`.

### Terrain loading and readiness

Map3D tracks loading and readiness independently of presentation. Apply [`load.spinner`](../Styles/load.md#entry-load-spinner) or [`load.progress`](../Styles/load.md#entry-load-progress) in `styles` to display its loading state.

The initial terrain load and explicit `reloadTerrain()` calls keep terrain loading active until the first successful draw to the live canvas. A map that starts in a collapsed panel stays pending until its canvas can draw. Use `onterrainready()` for work that needs the rendered terrain, including camera and elevation calls. A successful `reloadTerrain()` completes at the same first-frame boundary. Handle failures with `onterrainerror(error)`, which receives an `Error`, and call `reloadTerrain()` to retry the current sources. Optional land cover, material textures, and progressive contours can finish after readiness.

Listen for `terrainloadstart` in the map's `on` dictionary to observe when terrain starts contributing to the loading indicator. The current locale supplies captions for the active stage. During source processing the caption names the next outstanding source and gives the count processed so far. An elevation raster reused for the background counts once.

| Stage              | English                                            | 中文                                   |
| ------------------ | -------------------------------------------------- | -------------------------------------- |
| Renderer startup   | Loading the 3D renderer…                           | 正在加载三维渲染器…                    |
| Source processing  | Loading terrain elevation… (1/3 sources processed) | 正在加载地形高程数据…（已处理 1/3 项） |
| Scene construction | Building the terrain scene…                        | 正在构建地形场景…                      |
| First draw         | Drawing the first frame…                           | 正在绘制首帧…                          |

An application caption set with `setLoadingText(text)` takes precedence. Call `setLoadingText()` to show the current terrain caption again. The application can keep its own loading contribution active after terrain settles.

### Camera controls and other events

| Public API                        | Behavior                                                                                                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `resetCamera()`                   | Restore the overview with the current `initialCamera`, or the showcase view when it is omitted.                                                                          |
| `resetCamera(pose)`               | Frame the loaded overview immediately with the supplied preset or pose for this call.                                                                                    |
| `fitRegions()`                    | Frame the loaded regions and pause orbit on a regional map.                                                                                                              |
| `sampleElevation(coord)`          | Read elevation in meters at `[longitude, latitude]`.                                                                                                                     |
| `locateCoordinate(coord)`         | Read elevation and move the map's pin to the coordinate.                                                                                                                 |
| `focusRegion(name)`               | On a build with regional focus, focus a featured region from the overview. Returns `false` for an unavailable move. Use the overview to move between featured regions.   |
| `returnToOverview()`              | End regional focus, restore the overview's saved zoom, and carry the current bearing and pitch within the overview's limits. Returns `false` if already in the overview. |
| `regionNames` and `focusedRegion` | On a build with regional focus, read the overview's featured names and the active name. The overview has `focusedRegion === undefined`.                                  |

Regional focus keeps the loaded terrain and changes which routes and labels are active. `onregionclick({ name, adcode })` reports the clicked region. `onregionchange({ region, previousRegion })` reports a focus change, using `undefined` for the overview. Call `returnToOverview()` before focusing another region. The map canvas supports arrow-key rotation and zoom with plus and minus.

Set `onindicatorrendererchange(renderer)` to observe a change to `'html-in-canvas'` or `'dom'`. Use `on: { terrainmotionchange(event) { /* ... */ } }` to receive the effective playing state as a boolean in `event.detail`.

With `playing: 'auto'`, camera rotation pauses while the user rotates the view or interacts with a model callout. On a regional map, hovering a colored slab, colored label or route tag also pauses rotation. Orbit resumes after about two idle seconds. Zoom can continue during orbit.

Use `depthOfField: true` for a clear range of 0.6, or set `{ clearRange: 0.8 }` to choose the sharp portion of the visible depth. The range accepts values from 0 to 1. Use `'auto'` or `{ mode: 'auto', clearRange: 0.8 }` to enable blur when zoomed to at least 1.5× the fit or when the camera is within 30° of the horizon. A small threshold band keeps the effect steady as the camera moves. Click or tap terrain, or focus a model anchor with the keyboard, to select the optical subject. Auto retains the selected point when blur temporarily disengages. Set `depthOfField: false` to clear the selection.

## Prepare an elevation GeoTIFF

Start with a bare-earth DEM in meters, such as a [USGS 3DEP elevation product](https://www.usgs.gov/3d-elevation-program/about-3dep-products-services). Mosaic tiles as needed and crop to the area of interest. Export a north-up, single-band GeoTIFF with a tiepoint and pixel scale. Float32 preserves signed elevations, including depths below sea level if your source contains bathymetry. Use the source's actual NoData metadata and retain its dataset attribution.

-   **Simple terrain** accepts WGS84 geographic (EPSG:4326) or WGS84 UTM and either PixelIsArea or PixelIsPoint. Keep at least two samples along each axis and at most 1,048,576 total. The crop must contain a valid, finite elevation at every sample.
-   **Regional terrain** uses EPSG:4326 PixelIsArea and at least two samples along each axis. Give the primary `dem` enough margin that its sample centers enclose the featured regions. The optional `backgroundDem` is usually coarser and covers the broader area that needs relief in Solid and Wireframe. When omitted, the primary DEM supplies both roles. The regional sampler can interpolate past isolated NoData values. An entirely missing sample neighborhood is rendered at zero elevation.

For a single-band source, replace `WEST SOUTH EAST NORTH` with the crop bounds in WGS84 degrees. Choose output dimensions for the area and detail you need. The example uses 768 columns and 512 rows. [GDAL `gdalwarp`](https://gdal.org/en/stable/programs/gdalwarp.html)

```sh
gdalwarp -of GTiff -t_srs EPSG:4326 -te WEST SOUTH EAST NORTH \
  -ts 768 512 -r bilinear -ot Float32 dem-source.tif dem.tif
gdalinfo -mm -stats dem.tif
```

Check the CRS, raster type (`AREA_OR_POINT=Area` for the regional scene), dimensions, single band, north-up transform, extent and NoData. For PixelIsArea, the first and last sample centers are half a pixel inside the footprint. Check coverage at those centers and inspect the valid-data mask, especially near coasts or source tile seams. [GDAL `gdalinfo`](https://gdal.org/en/stable/programs/gdalinfo.html) · [GeoTIFF raster types](https://gdal.org/en/stable/drivers/raster/gtiff.html)

For the regional example below, repeat the preparation for the broader extent at `-ts 512 384` and save it as `dem-shared.tif`. This explicit shared crop provides the sample grid for both the regional relief and the normal-map bake.

## Prepare a land-cover GeoTIFF

Download the single-band **Map** product for the area of interest and keep its integer class codes. Crop to north-up EPSG:4326 and use nearest-neighbor resampling. The example uses zero for uncovered output. Pick an extent and resolution that fit your use case and keep at most 1,048,576 land-cover samples. [ESA WorldCover 2021 data access](https://esa-worldcover.org/en/data-access) · [GDAL `gdalwarp`](https://gdal.org/en/stable/programs/gdalwarp.html)

```sh
gdalwarp -of GTiff -t_srs EPSG:4326 -te WEST SOUTH EAST NORTH \
  -ts 768 512 -r near -ovr NONE -ot Byte -dstnodata 0 \
  worldcover-map.tif land-cover.tif
gdalinfo -mm -stats land-cover.tif
```

The land-cover crop may differ from the DEM in extent and resolution. Simple terrain looks up the nearest class at each DEM vertex. Supported WorldCover class codes are 10, 20, 30, 40, 50, 60, 70, 80, 90, and 100. NoData, other classes (including 95 for moss and lichen), and areas beyond the crop retain the ordinary terrain material. Land cover supplies surface colors while the DEM supplies heights. Regional scenes use their GeoJSON boundaries and terrain materials.

Serve the two prepared files and give the map a visible height.

```json
{
    "type": "map3d",
    "dem": "/assets/terrain/dem.tif",
    "landCover": "/assets/terrain/land-cover.tif",
    "style": { "height": "24rem" }
}
```

## Bake optional normal-map detail

Bake fine surface detail from a higher-resolution DEM against the mesh built from the exact coarse raster and sample grid used by the renderer. Match its elevation multiplier and projection scale. In a regional map, the target is the shared relief from `backgroundDem`, or from `dem` when shared relief uses that crop. Keep the coarse mesh and fine source aligned. Save the result as tangent-space RGB PNG normal data and keep the source and bake settings so you can reproduce it.

If you have the Jam-UI normal-map baker, run it with Node.js 22.2 or newer in a checkout with its dependencies installed. Set `BAKER` to your local script path and use a fresh output basename in an existing directory. Give the coarse raster a valid elevation at each mesh sample. The example matches a regular regional mesh at `terrainScale: 43`, including its slope-normal multiplier and sea-level clamp. Replace `FRAME_LATITUDE` with the latitude at the center of your regional frame, including any route coordinates that extend the frame. The optional 30° tilt cap limits how far the baked normals turn away from the mesh.

```sh
BAKER=/path/to/bake-dem-normal-map.mjs
node "$BAKER" --help
node "$BAKER" --fine dem-fine.tif --coarse dem-shared.tif \
  --out detail-normal.png --mesh --exaggeration 43 --normal-exaggeration 2 \
  --projection-latitude FRAME_LATITUDE --clamp-sea-level --max-normal-tilt 30
```

The baker writes the PNG and a sibling JSON sidecar. For the regional path, use a geographic WGS84 coarse crop so the sidecar has `crs: 'EPSG:4326'`. The loader also expects `normalSpace: 'tangent'`, `flipY: true` and finite `bounds: [west, south, east, north]` enclosing the shared DEM sample centers. The texture's footprint and orientation must agree with those values.

With another baking tool, use the same shared mesh as the tangent-space target, UV-map it to the texture's geographic extent, and export a north-up, tangent-space PNG and a sidecar with those fields. For example, Blender can project normal detail from a higher-resolution mesh to a UV-mapped lower-resolution mesh. [Blender render baking](https://docs.blender.org/manual/en/5.0/render/cycles/baking.html)

## Assemble a regional map

Serve `mapJSON` as a WGS84 GeoJSON `FeatureCollection` of named `Polygon` or `MultiPolygon` features. Set `customAreas` to the `properties.name` values of the featured regions. This example assumes the delivered GeoJSON has a feature named `North Basin`, `dem.tif` covers that region, and `dem-shared.tif` supplies the shared surface used for the bake.

```javascript
export default {
    type: 'map3d',
    dem: '/assets/terrain/dem.tif',
    backgroundDem: '/assets/terrain/dem-shared.tif',
    mapJSON: '/assets/terrain/regions.geojson',
    customAreas: ['North Basin'],
    backgroundMode: 'solid',
    terrainScale: 43,
    style: { height: '24rem' },
    plugins: [
        Plugins.terrainMaterial({
            normalMap: '/assets/terrain/detail-normal.png',
            normalMapMetadata: '/assets/terrain/detail-normal.json'
        })
    ]
};
```

Regional normal detail appears on shared relief in Solid and on featured regions in Wireframe. A simple scene uses only `normalMap` and maps it across the DEM's full sample-center extent. A missing or incompatible texture leaves the regular terrain material in use. Elevation shading controls tint independently. [Terrain material plugin](../Plugins/terrainMaterial.md#entry-terrainmaterial)

For broader context, `worldBorders` accepts a URL for a GeoJSON `MultiLineString` of country outlines. Set `showWorldBorders` to show them. `worldDetails` can supply `admin1` outline lines and `labels.admin0` and `labels.admin1` records of `[name, longitude, latitude, rank]`. Keep routes, positions and readings in application-owned resources. JAML URL suffixes can load those separately. [Parameter URL suffixes](../JAML/jaml-format.md#param-suffixes--keysuffix)

## Connections and labels

Regional maps accept the [shared connection records](map.md#connections-and-coordinate-editing). Give each record a unique `id` and place names in `from` and `to`. Per-connection values take precedence over `lineOption`. Route geometry follows the ordered endpoints and midpoints and uses `path`, `tension`, `lengthFactor`, and `angleFactor` when supplied. A route requires two resolved endpoints. When features are selected, at least one endpoint must be featured. With regional focus, the visible routes and their tags follow the focused region.

Use the [saved-coordinate shape](map.md#saved-coordinates-and-label-data) with both `labels` and `connections`. `labels` maps names to `[longitude, latitude]`. Saved route entries require a `midpoints` array and can override either endpoint. Mulberry looks for a scoped key with `comboArea` when it has featured regions and `singleMap` otherwise. For example, a scenery can supply `North Basin@comboArea@survey`, followed by `North Basin@comboArea` and the unqualified name. With no saved place coordinate, a loaded region name uses its center. `connectionsURL` and `customCoordsURL` load these JSON values into the matching properties. Pass the raster URLs directly to `dem`, `backgroundDem`, and `landCover`.

For a reading, add a direct `indicator` with `coord` set to a place key and bind its value to app data. A `label` with `coord` set to the connection ID becomes a route tag. Use separate place names and route IDs to keep them unambiguous. A numeric `[longitude, latitude]` also anchors a direct geographic child and is the coordinate form for simple terrain. `attrs: { 'jam-map-3d-background-label': '' }` gives an authored context label the background treatment.

On builds with generated endpoint labels, active routes can supply background and external labels. A matching authored geographic label supplies its own contents. A saved coordinate or region center controls the anchor when available, and the rendered endpoint supplies the fallback. For world labels from a separate asset, use `worldDetails`.

Active regional labels and route tags may overlap. A quiet background region name is eligible on Globe at camera zoom `1.5` and above. Focusing a region still determines which routes and endpoint names are active.

Country and province names from `worldDetails` stay in the DOM and fade near the Globe horizon in both renderer modes. Grayed terrain can hide a whole label or route tag. Four of five samples must be blocked to hide it and four must be clear to show it again. A hidden callout takes its leader with it.

With HTML-in-canvas rendering, featured terrain can also cover individual pixels of a reading, route tag, background or external label, or callout leader. A featured face at 40% opacity leaves 60% of the label visible where that face is in front. The exposed part keeps its original strength. Opaque covered pixels yield pointer input to the exposed control underneath or the map. A forwarded event has `isTrusted === false`. Select `indicatorRenderer: 'dom'` for whole-label visibility using grayed terrain and opaque featured faces. This whole-label rule also applies to the country and province names in either mode.

For builds with overhead routes, `overhead: true` places a utility pole at each endpoint and a pylon at each midpoint. The saved route therefore also defines the support positions. The rendered spans follow a polyline with sag and terrain clearance. `animation: true` follows the connection's `state`, while `'default'` and `'reverse'` explicitly select flow direction. `false` disables the flow.

## Geographic label placement

On builds with adjustable geographic labels, set `jam-map-3d-label-placement` in the `attrs` of a direct child with a geographic `coord`. These modes work on simple terrain and in regional Map and Globe views.

| Placement  | Behavior                                                                                                                                                       |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `anchored` | Centers the label on its projected terrain anchor.                                                                                                             |
| `lifted`   | Places the bottom of the label above its projected terrain anchor.                                                                                             |
| `callout`  | Keeps the leader endpoint on the terrain anchor and offsets the label. The renderer looks for room for the card inside the viewport and around nearby content. |

Set `jam-map-3d-label-lift` to a nonnegative rem length. Lifted defaults to `2.5rem` and explicit Callout defaults to `1.25rem`. Both measure from the projected terrain anchor to the bottom of the card at the fitted camera. The distance scales with manual zoom and recalibrates when the camera fits a new view. Unitless values still represent scene distances. A value of zero places the card bottom at the anchor if it fits.

On regional callouts, set `jam-map-3d-callout-gap` on the label to control the horizontal span. The default is `2.5rem`. Use a rem length or a unitless number in rem. This distance also scales from the fitted view. Available viewport space and controls can shorten the span. The leader meets the vertical midpoint of the facing card edge and bends halfway across the span. Set `--jam-map-callout-radius` on the map to round the elbow. Island uses `0.375rem`. Use `0rem` for a sharp elbow.

An explicit placement takes precedence over the shorthand `attrs: { 'jam-map-3d-callout': '' }`, which selects `callout` by presence and preserves the legacy Simple terrain layout when lift is omitted. With neither explicit placement nor the shorthand, a geographic label uses `anchored`, even when a lift is supplied. Lift applies only to `lifted` and `callout`. Background names, route tags and [model-anchored labels](#model-anchors) keep their own placement rules.

Use explicit `lifted` for featured readings that should sit above the terrain. The card's bottom center aligns with the projected lifted point, subject to viewport fitting, and the reading's sphere marker keeps its terrain position.

Both attributes can follow bound variables. Set a variable to an empty string to clear its bound setting. In this example, edit the label's `placement` and `lift` to change the callout. Serve the [basin DEM](examples/basin-dem.tif) at the URL shown.

```javascript
export default {
    type: 'map3d',
    dem: '/assets/terrain/basin-dem.tif',
    playing: false,
    indicatorRenderer: 'dom',
    style: { height: '24rem' },
    components: [
        {
            type: 'label',
            cap: 'North Basin',
            coord: [-113.2, 39.45],
            style: {
                backgroundColor: 'var(--jam-color-surface-default)',
                color: 'var(--jam-color-fg-default)',
                padding: '0.25rem 0.5rem',
                borderRadius: 'var(--jam-border-radius-s)'
            },
            vars: { placement: 'callout', lift: '1.25rem' },
            attrs: {
                'jam-map-3d-label-placement': '{{placement}}',
                'jam-map-3d-label-lift': '{{lift}}'
            }
        }
    ]
};
```

### Model anchors

An authored geographic label or indicator can place a visible marker at its `coord`. Omit `anchor` or use `anchor: { model: 'sphere' }` for the default sphere resting on the sampled terrain. Its center is one radius above the surface. The geographic callout leader meets that center. An ordinary Lychee endpoint at the same coordinate in a regional map also meets the center. Use `anchor: 'none'` for the caption alone. A model uses the same names as `objects`. Set `zoomWithMap: true` to scale the marker with the terrain and `animation: false` to hold its pose. With `hover: 'callout'`, hovering, keyboard focus, or tapping reveals the label and leader.

Add this label to the `components` of the [regional example](#assemble-a-regional-map). The region name provides its coordinate. Use a longitude and latitude pair on simple terrain.

```javascript
{
    type: 'label',
    cap: 'Wind survey',
    coord: 'North Basin',
    anchor: { model: 'wind-turbine', zoomWithMap: true, animation: false, hover: 'callout' }
}
```

## Regional appearance

Use the [terrain material plugin](../Plugins/terrainMaterial.md#entry-terrainmaterial) for `normalMap` and `normalMapMetadata`. On builds with regional appearance plugins, `variant: 'standard'` lets a supporting theme supply the finish and strokes. Use `jam-map3d[jam-variant="standard"]` as the theme selector. Author a local finish when a single map needs its own treatment.

| Plugin option                              | Behavior                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `terrainMaterial({ finish })`              | Choose `'matte'`, `'alabaster'`, `'gloss'`, `'gemstone'`, `'jello'`, `'clay'`, `'wireframe'`, or `'contours'`.                                                                                                                                                                                                                                                                                                                                                                                |
| `surface`, `side`                          | Override `roughness`, `metalness`, `transmission`, `opacity`, optical `thickness`, `ior`, `clearcoat`, `reflectionStrength`, `faceted`, or `wireframeOpacity` on the named surface. `surface.normalStrength` controls featured normal-map strength. Zero detaches the featured texture. On regional maps, `surface.smoothing` blends the original relief (`0`, default) with fully smoothed relief (`1`). It changes the displayed terrain while elevation readings still use the source DEM. |
| `bottom`, `bevel`                          | Set `bottom.opacity`, or give `bevel.colored` and `bevel.grayed` a `scope` (`'off'`, `'perimeter'`, or `'slab'`), `topRadius`, `bottomRadius`, or `flatOnly`. Radii are fractions of slab thickness. Bottom beveling applies in Flat. `bottomRadius: 'auto'` copies the top radius when the scene has no unfeatured background slabs.                                                                                                                                                         |
| `colors`, `tuner`                          | Give the colored regions an ordered palette of resolvable solid colors or color tokens and an optional named tuner or callback. Palette alpha multiplies slab opacity.                                                                                                                                                                                                                                                                                                                        |
| `grayed`                                   | Give grayed regions an ordered `colors` palette or a single `color`, an optional `tuner`, and separate `opacity`. Adjust paint and opacity for Solid and Wireframe independently.                                                                                                                                                                                                                                                                                                             |
| `elevationHighlight`                       | Adjust the high-elevation tint.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `terrainStrokes({ outline, route, grid })` | Each stroke accepts `color` and `opacity`. `outline.width` is a numeric rem amount that defaults to `0.0625`. `outline.color: 'colored'` follows the region's colored paint. `route.width` is the full fitted tube diameter, given as a number in rem or a rem string. The default is `0.1875rem`. Zero hides the tube and ordinary endpoint dots while keeping the connection.                                                                                                               |
| `terrainLabels({ roles })`                 | Style map label wrappers with `colored`, `grayed`, `external`, `line` (route tag), `ghost`, or `label`. Callout styles can overlay the label role. Use CSS strings for `background`, `color`, `border`, `border-radius`, `padding`, `box-shadow`, `backdrop-filter`, and `font-family`.                                                                                                                                                                                                       |

The active coloring method assigns palette slots in both [Medlar](map.md) and Mulberry. On Mulberry, the grayed palette supplies the Flat fill, Solid relief, and the fill under Wireframe. Supply distinct grayed shades for visible variation across regions.

Each appearance plugin updates its part of the mounted map. Local material settings compose over the active theme. Removing a local setting exposes the active theme value. Normal texture ownership is independent of the finish. Use `stylize: 'item'` for native coordinate labels. Mulberry updates colored, grayed, or external variants on focus changes. Theme recipes can share the `item-colored`, `item-grayed`, `item-external`, and `item-line` hooks with Medlar. `color.syncWithMap` follows the active region paint. Placement remains independently selectable. Use `indicatorRenderer: 'dom'` for a backdrop filter that samples the map behind a label.

### Migrate appearance options

Replace region-keyed palettes with ordered arrays in `colors` or `grayed.colors`. Mulberry assigns array slots according to `coloring`. In `terrainLabels({ roles })`, migrate `reading` to `colored`, `route` to `line`, and `background` to `grayed`. An old `endpoint` label uses `grayed` when it belongs to a context region or `external` when it lies outside the displayed geography. Use `callout` to add a placement-specific treatment over the label's role.

### Contour layers and opacity

Contours draw open horizontal sections through the terrain. Choose `finish: 'contours'` in `terrainMaterial` for the main terrain. Use `backgroundMode: 'contours'` or `grayed: { finish: 'contours' }` for the background. Set `contours: true` to enable both.

Set `contourOptions.colored` and `contourOptions.grayed` independently. Each role defaults to a stroke with no fill. Set `stroke: false` to hide its lines. Set `fill` to `'none'`, `'solid'`, or a pattern dictionary with `shape: 'circle' | 'hexagon' | 'square'`. Choose `layerCount: 'auto'` for elevation-based spacing or an integer from 1 through 128 to control the number of evenly spaced cuts. A single cut shows the underside. Set `smoothness` from 0 to 100. It defaults to 10.

On a regional map, `slabOpacity.colored` and `slabOpacity.grayed` each accept `overall` and `fill: { top, sidewall, bottom }`. Use numbers from 0 to 1. A value of `0` makes that part transparent. Omit a fill value or set it to `'auto'` to use the material default. Palette alpha still applies. On contours, `sidewall` controls stroke opacity. Fill opacity blends from `bottom` at the lowest sheet to `top` at the highest. A single sheet uses `bottom`.

Apply these properties to the [regional map example](#assemble-a-regional-map). Keep any normal-map options in the same material recipe if you still use them in other finishes.

```javascript
{
    backgroundMode: 'contours',
    plugins: [Plugins.terrainMaterial({ finish: 'contours' })],
    contourOptions: {
        layerCount: 12,
        colored: { stroke: true, fill: 'solid' },
        grayed: { stroke: true, fill: 'none' }
    },
    slabOpacity: {
        colored: { overall: 0.8, fill: { top: 0.6, sidewall: 'auto', bottom: 0 } },
        grayed: { fill: { sidewall: 0.4 } }
    }
}
```

## Regional readings and route tags

Serve the [synthetic basin GeoJSON](examples/basin-regions.json) and [basin DEM](examples/basin-dem.tif) at the URLs below. The files are shared with the [Medlar example](map.md#regional-readings-and-route-tags). The reading uses a saved place coordinate. The route tag follows the connection with the matching ID.

```javascript
const plate = {
    backgroundColor: 'var(--jam-color-surface-default)',
    color: 'var(--jam-color-fg-default)',
    padding: '0.25rem 0.5rem',
    borderRadius: 'var(--jam-border-radius-s)'
};

export default {
    type: 'map3d',
    id: 'basin-map-3d',
    mapJSON: '/assets/terrain/basin-regions.json',
    dem: '/assets/terrain/basin-dem.tif',
    customAreas: ['North Basin', 'East Shelf'],
    backgroundMode: 'solid',
    viewMode: 'map',
    playing: false,
    indicatorRenderer: 'dom',
    style: { height: '24rem' },
    vars: { basinReading: 12 },
    connections: [{ id: 'basin-link', from: 'North Basin', to: 'East Shelf' }],
    customCoords: {
        labels: { 'North Basin': [-113.2, 39.45] },
        connections: {
            'basin-link': {
                startPoint: [-113.4, 38.5],
                midpoints: [[-111.95, 38.8]],
                endPoint: [-110.6, 38.5]
            }
        }
    },
    components: [
        {
            type: 'indicator',
            id: 'basin-reading',
            stylize: 'item',
            coord: 'North Basin',
            cap: 'North Basin',
            value: '{{basinReading}}',
            unit: 'MW',
            style: plate,
            attrs: { 'jam-map-3d-label-placement': 'lifted' }
        },
        {
            type: 'label',
            id: 'basin-route-tag',
            stylize: 'item-line',
            coord: 'basin-link',
            cap: 'Basin link',
            style: plate
        }
    ]
};
```
