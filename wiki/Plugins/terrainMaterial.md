# terrainMaterial

<!-- Generated from native authoring; do not edit. -->

[中文](terrainMaterial.zh.md)

## `terrainMaterial`

<a id="entry-terrainmaterial"></a>

Set a regional terrain finish and add optional tangent-space normal detail.

A simple map maps the image to the full DEM sample-center extent. A regional map uses the image on shared relief surfaces in Solid mode and on colored regions in Wireframe mode. The optional JSON sidecar aligns the image to the shared relief. Elevation shading controls tint independently.

Apply to a map3d with a DEM. If you supply a normal map, bake it against the grid and elevation scale used by that terrain.

The image loads independently of terrain readiness. If the image is missing or invalid, the terrain keeps its finish without the normal detail. Removing the plugin releases its material request.

Positional order: `normalMap` → `normalMapMetadata` → `finish` → `surface` → `side` → `bottom` → `bevel` → `colors` → `tuner` → `grayed` → `context` → `elevationHighlight`.

| Argument | Type | Contract |
| --- | --- | --- |
| `normalMap` | `string` | URL of a north-up tangent-space normal image. |
| `normalMapMetadata` | `string` | Optional JSON sidecar URL for a regional map. Set crs to EPSG:4326, normalSpace to tangent, and flipY to true. Set bounds to [west, south, east, north] in longitude and latitude so they cover the shared relief DEM sample centers. |
| `finish` | `string` | Colored terrain finish. Contours builds the shape from stacked elevation lines with open gaps. Regional maps also offer matte, alabaster, gloss, gemstone, jello, clay and wireframe. Select contours in the map's backgroundMode for background relief. Supplied surface, side, bottom and bevel settings override the preset defaults. |
| `surface` | `dictionary` | Set smoothing from 0 (original relief, the default) to 1 (fully smoothed relief) on regional maps. For example, 0.5 blends the two heights halfway. Set faceted independently for per-face shading. Grounded objects and routes follow the displayed shape in Map and Globe. Elevation readings use the source data. |
| `side` | `dictionary` |  |
| `bottom` | `dictionary` | Colored slab bottom style for a regional map. Set opacity from 0 to 1. Palette alpha still applies. |
| `bevel` | `dictionary` | Set colored or grayed bevel defaults. Each layer can set scope to off, perimeter, or slab, set topRadius and bottomRadius as fractions of base thickness, and set flatOnly. The bottom bevel is drawn in Flat mode. |
| `colors` | `array` | Ordered palette of resolvable solid colors or color tokens for colored regions. The active coloring method assigns the paints. Palette alpha multiplies slab opacity. |
| `tuner` | `functionOrString` | Named color tuner or color callback for the colored palette, with the same contract as Styles.echarts.map. |
| `grayed` | `dictionary` | Set an ordered palette of resolvable solid colors or color tokens, an optional tuner and overall opacity for grayed regions. A single color can be supplied as color. Solid and wireframe settings control their mode-specific paint and opacity. |
| `context` | `dictionary` |  |
| `elevationHighlight` | `number` |  |
