# checkbox

<!-- Generated from native authoring; do not edit. -->

[中文](checkbox.zh.md)

## `checkbox.checkmark`

<a id="entry-checkbox-checkmark"></a>

Selection marker

Apply the legacy checkbox checkmark marker.

Adds the checkmark class; it does not change the checked value.

No dedicated checkmark selector was found in the current native stylesheet. Do not rely on this marker alone for visible feedback; use the native checkbox type.

## `checkbox.alignoption`

<a id="entry-checkbox-alignoption"></a>

Grid

Arrange checkbox/options content into aligned columns.

Adds alignoption and writes the minimum option width used by the auto-fit option grid.

Choose option value/selection behavior separately.

Positional order: `width`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `width` | `string` | `10rem` | Minimum width |
