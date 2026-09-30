# disabled

<!-- Generated from native authoring; do not edit. -->

[中文](disabled.zh.md)

## `disabled`

<a id="entry-disabled"></a>

Disabled styles

Apply CSS for the disabled state of the target selected by the style path.

The style uses a rule selector ending in :disabled; it changes presentation and does not activate the state.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `display` → `position` → `width` → `height` → `minWidth` → `minHeight` → `maxWidth` → `maxHeight` → `padding` → `paddingTop` → `paddingRight` → `paddingBottom` → `paddingLeft` → `margin` → `marginTop` → `marginRight` → `marginBottom` → `marginLeft` → `gap` → `color` → `background` → `backgroundColor` → `border` → `borderRadius` → `opacity` → `overflow` → `transform` → `transition` → `whiteSpace` → `zIndex` → `setProperty` → `removeProperty` → `getPropertyValue` → `selector` → `method` → `direct` → `cssText` → `state`.

| Argument | Type | Contract |
| --- | --- | --- |
| `display` | `string` | CSS display mode for the styled target, such as block, flex, grid or none. |
| `position` | `string` | CSS positioning mode for the styled target, such as relative, absolute, fixed or sticky. |
| `width` | `string` | CSS width of the styled target; use a CSS length, percentage or supported sizing keyword. |
| `height` | `string` | CSS height of the styled target; use a CSS length, percentage or supported sizing keyword. |
| `minWidth` | `string` | CSS minimum width constraint for the styled target. |
| `minHeight` | `string` | CSS minimum height constraint for the styled target. |
| `maxWidth` | `string` | CSS maximum width constraint for the styled target. |
| `maxHeight` | `string` | CSS maximum height constraint for the styled target. |
| `padding` | `string` | CSS inner spacing shorthand, accepting one to four side values. |
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
| `border` | `string` | CSS border shorthand for width, style and color; supported border tokens are resolved by property context. |
| `borderRadius` | `string` | CSS corner rounding for the styled target; accepts supported radius tokens or CSS radius values. |
| `opacity` | `string` | CSS opacity of the styled target and its rendered contents, from transparent to opaque. |
| `overflow` | `string` | CSS overflow behavior for content outside the styled target; use one value or separate horizontal and vertical values. |
| `transform` | `string` | CSS transform applied to the styled target, such as translate, rotate or scale. |
| `transition` | `string` | CSS transition shorthand describing properties, duration, timing function and delay. |
| `whiteSpace` | `string` | CSS handling of whitespace and line wrapping in the styled target. |
| `zIndex` | `string` | CSS stacking order for the styled target, subject to its stacking context. |
| `setProperty` | `string` | Compatibility entry named setProperty from a style declaration method. It is not a CSS declaration or a callable JAML operation; do not pass it as a style argument. |
| `removeProperty` | `string` | Compatibility entry named removeProperty from a style declaration method. It is not a CSS declaration or a callable JAML operation; do not pass it as a style argument. |
| `getPropertyValue` | `string` | Compatibility entry named getPropertyValue from a style declaration method. It is not a CSS declaration or a callable JAML operation; do not pass it as a style argument. |
| `selector` | `string` | Selector<br>Automatically created from the style path by default. |
| `method` | `string` | Application method<br>Automatically selected from the style path by default.<br>Options: `vars` — vars — Variables — valueOrigin: `name`, `rule` — rule — Rules — valueOrigin: `name`, `props` — props — Properties — valueOrigin: `name` |
| `direct` | `boolean` | Direct children only<br>Child selectors use direct children unless the effective direct value is false, which selects descendants. |
| `cssText` | `functionOrString` | CSS content<br>A string or a function returning a dictionary or string.<br>Shorthand |
| `state` | `string` | State<br>Options: `hover` — Hover, `active` — Active, `focus` — Focus, `disabled` — Disabled, `visited` — Visited, `checked` — Checked, `indeterminate` — Indeterminate, `before` — before pseudo-element, `after` — after pseudo-element |
