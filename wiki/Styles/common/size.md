# common.size

<!-- Generated from native authoring; do not edit. -->

[中文](size.zh.md)

`Styles.size.*` -- element sizing.

---

## Variants

### `size`

<a id="entry-size"></a>

Dimensions

Set target dimensions and minimum or maximum constraints.

A one-value size shorthand supplies both width and height; two values supply width then height and override the separate width and height arguments.

Use explicit dimensions when bounds matter; percentage dimensions still depend on the containing layout.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `width` → `minWidth` → `maxWidth` → `height` → `minHeight` → `maxHeight` → `size`.

| Argument | Type | Contract |
| --- | --- | --- |
| `width` | `string` | Width<br>`{"cssKey":"width"}` |
| `minWidth` | `string` | Minimum width<br>`{"cssKey":"minWidth"}` |
| `maxWidth` | `string` | Maximum width<br>`{"cssKey":"maxWidth"}` |
| `height` | `string` | Height<br>`{"cssKey":"height"}` |
| `minHeight` | `string` | Minimum height<br>`{"cssKey":"minHeight"}` |
| `maxHeight` | `string` | Maximum height<br>`{"cssKey":"maxHeight"}` |
| `size` | `string` | Dimensions<br>Shorthand |

Sets element width, height, and related dimension properties.

The size shorthand overrides individual width and height values.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['size(width:300px;height:200px)']
    }
];
```

### `fullscreen`

<a id="entry-size-fullscreen"></a>

Full screen

Sets height to 100vh and width to 100vw.

Viewport dimensions do not add fixed positioning or remove surrounding layout spacing.

Sets the element to 100vw &times; 100vh (full viewport).

### `fullsize`

<a id="entry-size-fullsize"></a>

Full size

Sets width and height to 100%.

Both percentage dimensions depend on the containing layout.

Sets the element to 100% width &times; 100% height of its parent.

### `fullheight`

<a id="entry-size-fullheight"></a>

Full height

Sets height to 100%.

Requires a containing layout that resolves percentage height.

Sets the element height to 100% of its parent.

### `fullwidth`

<a id="entry-size-fullwidth"></a>

Full width

Sets width to 100%.

Percentage width follows the containing layout; it does not establish height.

Sets the element width to 100% of its parent.

### `square`

<a id="entry-size-square"></a>

Square

Sets aspect-ratio to 1 / 1.

Provide a usable dimension or layout constraint; explicit width and height can override the preferred ratio.

Sets aspect ratio to 1:1.
