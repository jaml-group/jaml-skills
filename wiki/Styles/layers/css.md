# layer.css

<!-- Generated from native authoring; do not edit. -->

[中文](css.zh.md)

`Styles.layer.css` — arbitrary CSS layer. Wraps `common/css` options in a layer context.

Applies CSS to a generated child. The style does not supply full-size geometry: position the host, then give the child its own position and bounds. Use for custom backgrounds, borders, masks, or other CSS decoration.

---

## Args

<a id="entry-layer-css"></a>

CSS styles

Create a custom auxiliary layer when a built-in layer appearance does not fit.

Creates a layer and applies CSS properties or parsed cssText to it using the common CSS style plugin.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Use CSS to define the new layer geometry and appearance; use a dedicated background, border or other layer variant when its built-in geometry is appropriate.

The CSS belongs to the created layer, not the host. This generic path does not itself supply the full-size geometry of the background or border variants.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `display` → `position` → `width` → `height` → `minWidth` → `minHeight` → `maxWidth` → `maxHeight` → `paddingTop` → `paddingRight` → `paddingBottom` → `paddingLeft` → `margin` → `marginTop` → `marginRight` → `marginBottom` → `marginLeft` → `gap` → `color` → `background` → `backgroundColor` → `overflow` → `transition` → `whiteSpace` → `setProperty` → `removeProperty` → `getPropertyValue` → `selector` → `method` → `direct` → `cssText`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `zIndex` | `string` | CSS stacking order for the styled target, subject to its stacking context. |
| `padding` | `string` | CSS inner spacing shorthand, accepting one to four side values. |
| `borderRadius` | `string` | CSS corner rounding for the styled target; accepts supported radius tokens or CSS radius values. |
| `transform` | `string` | CSS transform applied to the styled target, such as translate, rotate or scale. |
| `border` | `string` | CSS border shorthand for width, style and color; supported border tokens are resolved by property context. |
| `opacity` | `string` | CSS opacity of the styled target and its rendered contents, from transparent to opaque. |
| `class` | `string` | Class |
| `content` | `any` | Content |
| `display` | `string` | CSS display mode for the styled target, such as block, flex, grid or none. |
| `position` | `string` | CSS positioning mode for the styled target, such as relative, absolute, fixed or sticky. |
| `width` | `string` | CSS width of the styled target; use a CSS length, percentage or supported sizing keyword. |
| `height` | `string` | CSS height of the styled target; use a CSS length, percentage or supported sizing keyword. |
| `minWidth` | `string` | CSS minimum width constraint for the styled target. |
| `minHeight` | `string` | CSS minimum height constraint for the styled target. |
| `maxWidth` | `string` | CSS maximum width constraint for the styled target. |
| `maxHeight` | `string` | CSS maximum height constraint for the styled target. |
| `paddingTop` | `string` | CSS inner spacing at the top edge. |
| `paddingRight` | `string` | CSS inner spacing at the right edge. |
| `paddingBottom` | `string` | CSS inner spacing at the bottom edge. |
| `paddingLeft` | `string` | CSS inner spacing at the left edge. |
| `margin` | `string` | CSS outer spacing shorthand, accepting one to four side values. |
| `marginTop` | `string` | CSS outer spacing at the top edge. |
| `marginRight` | `string` | CSS outer spacing at the right edge. |
| `marginBottom` | `string` | CSS outer spacing at the bottom edge. |
| `marginLeft` | `string` | CSS outer spacing at the left edge. |
| `gap` | `string` | CSS spacing between grid or flex items; one value sets both axes and two values set row then column spacing. |
| `color` | `string` | CSS foreground color of the styled target; use a color value or a supported foreground token. |
| `background` | `string` | CSS background shorthand for the styled target, including supported fill tokens or explicit images and colors. |
| `backgroundColor` | `string` | CSS background color of the styled target; use a color value or supported fill token. |
| `overflow` | `string` | CSS overflow behavior for content outside the styled target; use one value or separate horizontal and vertical values. |
| `transition` | `string` | CSS transition shorthand describing properties, duration, timing function and delay. |
| `whiteSpace` | `string` | CSS handling of whitespace and line wrapping in the styled target. |
| `setProperty` | `string` | Compatibility entry named setProperty from a style declaration method. It is not a CSS declaration or a callable JAML operation; do not pass it as a style argument. |
| `removeProperty` | `string` | Compatibility entry named removeProperty from a style declaration method. It is not a CSS declaration or a callable JAML operation; do not pass it as a style argument. |
| `getPropertyValue` | `string` | Compatibility entry named getPropertyValue from a style declaration method. It is not a CSS declaration or a callable JAML operation; do not pass it as a style argument. |
| `selector` | `string` | Selector<br>Automatically created from the style path by default. |
| `method` | `string` | Application method<br>Automatically selected from the style path by default.<br>Options: `vars` — vars — Variables — valueOrigin: `name`, `rule` — rule — Rules — valueOrigin: `name`, `props` — props — Properties — valueOrigin: `name` |
| `direct` | `boolean` | Direct children only<br>Child selectors use direct children unless the effective direct value is false, which selects descendants. |
| `cssText` | `functionOrString` | CSS content<br>A string or a function returning a dictionary or string.<br>Shorthand |

All CSS properties are also accepted as individual args (background, color, margin, padding, etc.).

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['css(position:relative)', 'layer.css(position:absolute;inset:0;display:block;pointer-events:none;background:linear-gradient(45deg,hsl(0 100% 50%),hsl(240 100% 50%));opacity:0.5)'],
        components: [{ type: 'label', cap: 'Gradient overlay' }]
    },
    {
        type: 'card',
        styles: ['css(position:relative)', 'layer.css(position:absolute;inset:0;display:block;pointer-events:none;background:hsl(0 0% 0% / 0.2);backdropFilter:blur(5px);borderRadius:inherit)'],
        components: [{ type: 'label', cap: 'Blur overlay' }]
    }
];
```
