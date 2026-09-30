# theme

<!-- Generated from native authoring; do not edit. -->

[中文](theme.zh.md)

## `theme.dark`

<a id="entry-theme-dark"></a>

Dark mode

Force a local dark color-scheme context.

Applies dark luminosity, color-scheme, and color-profile adjustment to the host and compatible descendants.

Light and dark styles share local ownership tracking. Removing the newest owner restores the remaining owner, or the prior local mode/current inherited mode and prior inline color-scheme declaration with its priority. Removing an older owner leaves the newer one active. Distinguishable external mode or inline color-scheme changes are preserved; an external mode takeover retires obsolete owners.

Use for a local mode boundary; theme tokens remain the reusable source of palette and scale values.

Same-value external writes cannot be distinguished from the style’s own values. Cleanup retains the shared document luminance sheet and uses existing teardown for a newly owned shadow context; it does not establish complete isolation between all luminance contexts.

## `theme.light`

<a id="entry-theme-light"></a>

Light mode

Force a local light color-scheme context.

Applies light luminosity, color-scheme, and color-profile adjustment to the host and compatible descendants.

Light and dark styles share local ownership tracking. Removing the newest owner restores the remaining owner, or the prior local mode/current inherited mode and prior inline color-scheme declaration with its priority. Removing an older owner leaves the newer one active. Distinguishable external mode or inline color-scheme changes are preserved; an external mode takeover retires obsolete owners.

Same-value external writes cannot be distinguished from the style’s own values. Cleanup retains the shared document luminance sheet and uses existing teardown for a newly owned shadow context; it does not establish complete isolation between all luminance contexts.
