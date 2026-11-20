# map-3d

**Class:** `MulberryMap` · **Type:** `"map-3d"` · **Extends:** `AbstractElement`

Use `map-3d` to render a local elevation surface or a set of geographic slabs. Deploy the `jam-map-3d.mjs` companion module alongside the Jam-UI browser runtime. Serve your own terrain assets at URLs the browser can fetch. The examples use `/assets/terrain/` as an application-owned URL prefix.

| Scene            | Resources                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Simple terrain   | A `dem` GeoTIFF. Add `landCover` for optional land-cover colors.                                                                                       |
| Regional terrain | A `dem` GeoTIFF and a `mapJSON` FeatureCollection. Add `backgroundDem` for a separate shared relief crop and a normal map for optional surface detail. |

## Options

Both scenes use the map's regular element styles and `components`. Use a direct child with `coord` to place it geographically. Use `slot: 'layer'` for screen-space controls such as a camera toolbar.

| Option                                                 | Scope    | Default and behavior                                                                                                                                                                                          |
| ------------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dem`                                                  | Both     | Required URL of the primary elevation GeoTIFF.                                                                                                                                                                |
| `mapJSON`                                              | Regional | A URL or inline FeatureCollection of named WGS84 polygons. Supplying it selects the regional scene.                                                                                                           |
| `customAreas`                                          | Regional | `[]`. Names from `properties.name` that identify the featured regions.                                                                                                                                        |
| `landCover`                                            | Simple   | Optional class raster URL for the surface colors.                                                                                                                                                             |
| `backgroundGeoJSON`                                    | Simple   | A URL or inline FeatureCollection of named WGS84 polygons around the primary crop.                                                                                                                            |
| `backgroundDem`                                        | Both     | Optional broader relief URL. In regional mode it defaults to `dem`. In simple terrain it supplies relief for `backgroundGeoJSON`.                                                                             |
| `backgroundMode`                                       | Both     | `'flat'`, `'solid'`, or `'wireframe'`. Default `'flat'`. Solid fills the shared relief. Wireframe traces it above the flat context. Simple terrain uses these modes when it has background geography.         |
| `connections`, `customCoords`, `scenery`, `lineOption` | Regional | Connections and saved geographic positions. See [connections and labels](#connections-and-labels).                                                                                                            |
| `terrainScale`                                         | Regional | `43`, limited to 1–80. Vertical scale for the shared relief.                                                                                                                                                  |
| `slabThickness`                                        | Regional | `0.31`, limited to 0–1 scene units. Base thickness of the slab.                                                                                                                                               |
| `elevationShading`                                     | Both     | `true`. Apply tint by elevation.                                                                                                                                                                              |
| `viewMode`                                             | Regional | `'map'` or `'globe'`. Default `'map'`.                                                                                                                                                                        |
| `showGrid`                                             | Regional | `true`. Show the regional grid.                                                                                                                                                                               |
| `showWorldBorders`, `worldBorders`, `worldDetails`     | Regional | `showWorldBorders` defaults to `false`. Supply optional world context URLs as described in [assemble a regional map](#assemble-a-regional-map).                                                               |
| `spacing`                                              | Simple   | `78`, limited to 0–100. Controls layer separation.                                                                                                                                                            |
| `playing`                                              | Both     | Omit to follow the browser's reduced-motion preference, or set `true` or `false` to control motion explicitly. In regional mode this controls camera orbit. In simple terrain it also controls the dot sweep. |
| `indicatorRenderer`                                    | Both     | `'auto'` lets the renderer choose HTML-in-canvas where supported, with DOM fallback. Set `'dom'` to force DOM overlays.                                                                                       |
| `cameraLabel`                                          | Both     | Accessible instruction text for the focusable camera canvas. The default describes rotation and zoom keys.                                                                                                    |

Builds with regional focus, automatic coloring, or power objects additionally support these options.

| Option              | Scope    | Default and behavior                                                                                                                                                                                                                                              |
| ------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `silent`            | Regional | `false`. Set `true` to suppress pointer region navigation and hover while keeping camera controls and programmatic focus.                                                                                                                                         |
| `autoHideRouteTags` | Regional | `true`. Geographic labels reserve space first, then nearer tags take precedence over overlapping farther tags. Set `false` to keep overlapping tags at their route anchors. The viewport and Globe horizon still govern visibility.                               |
| `coloring`          | Both     | `'adjacency'` assigns automatic fills using neighboring regions. `'legacy'` uses the previous palette assignment. The default automatic palette starts with the first five swatch colors. [`coloringConflicts`](map.md#params) reports unresolved neighbor pairs. |
| `objects`           | Both     | `[]`. Each entry supplies a `model`, a WGS84 `coord`, and optional clockwise-degree `heading`, `scale` (default `1`), and `minZoom` (default `0`, relative to the fitted view).                                                                                   |

Object model names are `cooling-tower`, `smokestacks`, `wind-turbine`, `solar-array`, `dam`, `pylon`, `utility-pole`, `substation`, and `battery-storage`. The map skips unknown or unplaceable entries. Replacing `objects` updates the live scene. Regional equipment and conductor motion use their own clock and honor reduced motion independently of `playing`.

## Camera, readiness, and events

Call camera and elevation methods after `onterrainready()`. `onterrainerror(error)` receives an `Error`. Optional land cover and normal textures may finish later. Call `reloadTerrain()` to retry the current source. Set `onindicatorrendererchange(renderer)` to observe a change to `'html-in-canvas'` or `'dom'`. Use `on: { terrainmotionchange(event) { /* ... */ } }` to receive the effective playing state as a boolean in `event.detail`.

| Public API                        | Behavior                                                                                                                                                               |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `resetCamera()`                   | Restore the default view. Builds with camera presets accept `'showcase'`, `'top-down'`, or `'low-angle'` on a regional map.                                            |
| `fitRegions()`                    | Frame the loaded regions and pause orbit on a regional map.                                                                                                            |
| `sampleElevation(coord)`          | Read elevation in meters at `[longitude, latitude]`.                                                                                                                   |
| `locateCoordinate(coord)`         | Read elevation and move the map's pin to the coordinate.                                                                                                               |
| `focusRegion(name)`               | On a build with regional focus, focus a featured region from the overview. Returns `false` for an unavailable move. Use the overview to move between featured regions. |
| `regionNames` and `focusedRegion` | On a build with regional focus, read the overview's featured names and the active name. The overview has `focusedRegion === undefined`.                                |

Regional focus keeps the loaded terrain and changes which routes and labels are active. `onregionclick({ name, adcode })` reports the clicked region. `onregionchange({ region, previousRegion })` reports a focus change, using `undefined` for the overview. Call `resetCamera()` or `fitRegions()` to return to the overview and restore its routes and labels before focusing another region. The map canvas supports arrow-key rotation and zoom with plus and minus.

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
    "type": "map-3d",
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
    type: 'map-3d',
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

For a reading, add a direct `indicator` with `coord` set to a place key and bind its value to app data. A `label` with `coord` set to the connection ID becomes a route tag. Use separate place names and route IDs to keep them unambiguous. A numeric `[longitude, latitude]` also anchors a direct geographic child and is the coordinate form for simple terrain. Use `attrs: { 'jam-map-3d-callout': '' }` to add a leader to a geographic label. `attrs: { 'jam-map-3d-background-label': '' }` gives an authored context label the background treatment.

On builds with generated endpoint labels, active routes can supply background and external labels. A matching authored geographic label supplies its own contents. A saved coordinate or region center controls the anchor when available, and the rendered endpoint supplies the fallback. For world labels from a separate asset, use `worldDetails`.

For builds with overhead routes, `overhead: true` places a utility pole at each endpoint and a pylon at each midpoint. The saved route therefore also defines the support positions. The rendered spans follow a polyline with sag and terrain clearance. `animation: true` follows the connection's `state`, while `'default'` and `'reverse'` explicitly select flow direction. `false` disables the flow.

## Regional appearance

Use the [terrain material plugin](../Plugins/terrainMaterial.md#entry-terrainmaterial) for `normalMap` and `normalMapMetadata`. On builds with regional appearance plugins, `variant: 'standard'` lets a supporting theme supply the finish and strokes. Use `jam-map-3d[jam-variant="standard"]` as the theme selector. Author a local finish when a single map needs its own treatment.

| Plugin option                              | Behavior                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `terrainMaterial({ finish })`              | Choose `'matte'`, `'alabaster'`, `'gloss'`, `'gemstone'`, `'jello'`, `'clay'`, or `'wireframe'`.                                                                                                                                                                                                                                           |
| `surface`, `side`                          | Override `roughness`, `metalness`, `transmission`, `opacity`, optical `thickness`, `ior`, `clearcoat`, `reflectionStrength`, `faceted`, or `wireframeOpacity` on the named surface. `surface.normalStrength` controls featured normal-map strength. Zero detaches the featured texture.                                                    |
| `bottom`, `bevel`                          | Set `bottom.opacity`, or give `bevel.featured` and `bevel.background` a `scope` (`'off'`, `'perimeter'`, or `'slab'`), `topRadius`, `bottomRadius`, or `flatOnly`. Radii are fractions of slab thickness. Bottom beveling applies in Flat. `bottomRadius: 'auto'` copies the top radius when the scene has no unfeatured background slabs. |
| `colors`, `context`, `elevationHighlight`  | `colors` maps region names to color values. `context` can set `color` and `opacity` on unfeatured geography. `elevationHighlight` adjusts the high-elevation tint.                                                                                                                                                                         |
| `terrainStrokes({ outline, route, grid })` | Each stroke accepts `color` and `opacity`. `outline.width` is a numeric rem amount that defaults to `0.0625`. `outline.color: 'featured'` follows the region's featured paint.                                                                                                                                                             |
| `terrainLabels({ roles })`                 | Style the map-owned wrappers by role. Roles are `reading`, `endpoint`, `route`, `background`, `callout`, and `label`. Supply CSS strings for `background`, `color`, `border`, `border-radius`, `padding`, `box-shadow`, `backdrop-filter`, or `font-family`.                                                                               |

Each appearance plugin updates its part of the mounted map. Removing it restores the last remaining owner or the map default. Normal texture ownership is independent of the finish. Wrapper styles can supply inherited ink to authored children, which keep their own component styles. Use `indicatorRenderer: 'dom'` for a backdrop filter that samples the map behind a label.

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
    type: 'map-3d',
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
        connections: { 'basin-link': { startPoint: [-113.4, 38.5], midpoints: [[-111.95, 38.8]], endPoint: [-110.6, 38.5] } }
    },
    components: [
        { type: 'indicator', id: 'basin-reading', stylize: 'item', coord: 'North Basin', cap: 'North Basin', value: '{{basinReading}}', unit: 'MW', style: plate },
        { type: 'label', id: 'basin-route-tag', stylize: 'item-line', coord: 'basin-link', cap: 'Basin link', style: plate }
    ]
};
```
