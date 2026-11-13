# shape

<!-- Generated from native authoring; do not edit. -->

[中文](shape.zh.md)

## `shape`

<a id="entry-shape"></a>

Shape

Define one outline for a surface, so its fill, edges and shadows follow the same shape.

Publishes the outline as --jam-shape on the host. In the element's own styles, box:true scales SVG path data (M, L, H, V, C, S, Q, T, A, Z, absolute or relative) from 0–1 units to the host's size and updates the outline on resize. The host is clipped only with clip:true.

Read the outline with layer.glow or layer.shade, or with clip-path: var(--jam-shape) on a backdrop layer. Leaving the host unclipped keeps focus rings, crosshair brackets and edge layers whole. In theme recipes, use a CSS clip-path value with box:false or use Styles.shape.chamfer.

A free shape publishes `--jam-shape` and clears any inherited ring. `layer.glow` follows any painted fill, and `layer.shade` paints a filled silhouette. Without `box`, a `path()` value uses absolute pixels.

Positional order: `path` → `box` → `clip`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `path` | `string` | Not supplied | Outline: any clip-path value, or bare SVG path data in 0–1 units when box is true<br>Shorthand |
| `box` | `boolean` | `false` | Use 0–1 box units (objectBoundingBox) to follow the host's size in local styles |
| `clip` | `boolean` | `false` | Also clip the host to the shape |

## `shape.chamfer`

<a id="entry-shape-chamfer"></a>

Chamfer shape

Define a cut-corner outline for a surface’s fill, stroke and glow.

Publishes --jam-shape, a polygon with 45° cuts on the chosen corners, and --jam-shape-ring, an even-odd polygon of the given width that follows the outline. The ring's diagonal edges keep the same stroke width as its straight edges. The host is clipped only with clip:true.

Pair with layer.glow for a lit rim, or layer.shade for a cast shadow, and clip a translucent backdrop layer to var(--jam-shape) for glass. Use clip:true for compact controls whose own paint should follow the cut.

With clip:true, an outline focus ring outside the box is clipped; draw focus inside the cut with an inset outline-offset or an edge layer.

Positional order: `corners` → `cut` → `width` → `clip`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `corners` | `string` | `tl tr br bl` | Cut corners: space-separated tl, tr, br and bl; all four by default |
| `cut` | `string` | `0.625rem` | Cut size along each edge |
| `width` | `string` | `var(--jam-border-width-xs)` | Stroke width of the published ring |
| `clip` | `boolean` | `false` | Also clip the host to the shape |
