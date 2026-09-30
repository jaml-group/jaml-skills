# on

<!-- Generated from native authoring; do not edit. -->

[中文](on.zh.md)

## `on.dark`

<a id="entry-on-dark"></a>

On dark

Adapt foreground roles for content on an existing dark surface.

Adds jam-on-dark, updates text color variables through the corresponding text combo, and selects the default foreground.

Use when the surrounding surface already exists; use theme mode styles when the local color scheme itself should change.

This is a text-context trait and does not paint a surface or switch the theme mode.

## `on.light`

<a id="entry-on-light"></a>

On light

Adapt foreground roles for content on an existing light surface.

Adds jam-on-light, updates text color variables through the corresponding text combo, and selects the default foreground.

Use when the surrounding surface already exists; use theme mode styles when the local color scheme itself should change.

This is a text-context trait and does not paint a surface or switch the theme mode.

## `on.accent`

<a id="entry-on-accent"></a>

Accent color

Apply the primary foreground, accent surface, or accent-context text treatment named by the full path.

color.primary sets the primary foreground token and colored class; with.accent adds the accent-background class, which supplies a surface and matching foreground on supported hosts; on.accent applies accent-context text variables.

Use color.primary for foreground emphasis, with.accent for a filled control or surface, and on.accent when content sits on an existing accent surface.

These paths share metadata but are not interchangeable and do not redefine theme tokens.
