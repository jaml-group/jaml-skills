# with

<!-- Generated from native authoring; do not edit. -->

[中文](with.zh.md)

## `with.tint`

<a id="entry-with-tint"></a>

Tint

Give a supported host the theme tint surface treatment.

Adds jam-bg-tint; the stylesheet supplies the matching surface and foreground and adapts compatible button or tag states.

The background trait rules target hosts marked with jam or slot attributes.

Use this paired surface treatment when both foreground and background should coordinate; use a background preset for a fill alone.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `with.accent`

<a id="entry-with-accent"></a>

Accent color

Apply the primary foreground, accent surface, or accent-context text treatment named by the full path.

color.primary sets the primary foreground token and colored class; with.accent adds the accent-background class, which supplies a surface and matching foreground on supported hosts; on.accent applies accent-context text variables.

Use color.primary for foreground emphasis, with.accent for a filled control or surface, and on.accent when content sits on an existing accent surface.

These paths share metadata but are not interchangeable and do not redefine theme tokens.

## `with.elevation`

<a id="entry-with-elevation"></a>

Elevation

Give a supported host the theme elevated surface treatment.

Adds jam-bg-elevated; the stylesheet supplies the matching surface and foreground and adapts compatible button or tag states.

The background trait rules target hosts marked with jam or slot attributes.

Use this paired surface treatment when both foreground and background should coordinate; use a background preset for a fill alone.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.
