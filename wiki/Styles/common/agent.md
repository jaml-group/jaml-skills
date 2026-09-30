# common.agent

<!-- Generated from native authoring; do not edit. -->

[中文](agent.zh.md)

`Styles.agent.*` — styles targeting the element's internal agent (the native HTML element backing a custom input).

---

## Variants

### `agent.background`

<a id="entry-agent-background"></a>

Background

Configure background image and color through the component agent styling channel.

Writes path-derived CSS custom properties on the host, leaving the component stylesheet to consume them for its internal agent.

Use a component whose internal agent stylesheet consumes the corresponding variables.

Use agent.css with an explicit CSS rule when the internal part needs direct CSS beyond this variable channel.

This is a local variable override, not a theme definition or a promise that every host exposes an agent.

Positional order: `image` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `image` | `arrayOrString` | Image<br>`{"cssKey":"backgroundImage"}` |
| `color` | `string` | Background color<br>`{"cssKey":"backgroundColor"}` |

Sets the background of the internal agent element.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Styled',
        styles: ['agent.background(color:transparent)']
    }
];
```

### `agent.border`

<a id="entry-agent-border"></a>

Border

Configure border width, style, radius, and color through the component agent styling channel.

Writes path-derived CSS custom properties on the host, leaving the component stylesheet to consume them for its internal agent.

Use a component whose internal agent stylesheet consumes the corresponding variables.

Use agent.css with an explicit CSS rule when the internal part needs direct CSS beyond this variable channel.

This is a local variable override, not a theme definition or a promise that every host exposes an agent.

Positional order: `color` → `radius` → `style` → `width`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Border color<br>`{"cssKey":"borderColor"}` |
| `radius` | `string` | Border radius<br>`{"cssKey":"borderRadius"}` |
| `style` | `string` | Border style<br>Options: `none` — None, `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted, `double` — Double, `groove` — 3D groove, `ridge` — 3D ridge, `inset` — 3D inset, `outset` — 3D outset<br>`{"cssKey":"borderStyle"}` |
| `width` | `string` | Border width<br>`{"cssKey":"borderWidth"}` |

Sets the border of the internal agent element.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Styled',
        styles: ['agent.border(width:1px;style:solid;color:#ccc;radius:4px)']
    }
];
```

### `agent.size`

<a id="entry-agent-size"></a>

Dimensions

Configure width, height, and minimum dimensions through the component agent styling channel.

Writes path-derived CSS custom properties on the host, leaving the component stylesheet to consume them for its internal agent.

Use a component whose internal agent stylesheet consumes the corresponding variables.

Use agent.css with an explicit CSS rule when the internal part needs direct CSS beyond this variable channel.

This is a local variable override, not a theme definition or a promise that every host exposes an agent.

Positional order: `height` → `minHeight` → `width` → `minWidth`.

| Argument | Type | Contract |
| --- | --- | --- |
| `height` | `string` | Height<br>`{"cssKey":"height"}` |
| `minHeight` | `string` | Minimum height<br>`{"cssKey":"minHeight"}` |
| `width` | `string` | Width<br>`{"cssKey":"width"}` |
| `minWidth` | `string` | Minimum width<br>`{"cssKey":"minWidth"}` |

Sets the size of the internal agent element.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Styled',
        styles: ['agent.size(width:100%;height:2.5rem)']
    }
];
```

### `agent.padding`

<a id="entry-agent-padding"></a>

Padding

Configure inner spacing through the component agent styling channel.

Writes path-derived CSS custom properties on the host, leaving the component stylesheet to consume them for its internal agent.

Use a component whose internal agent stylesheet consumes the corresponding variables.

Use agent.css with an explicit CSS rule when the internal part needs direct CSS beyond this variable channel.

This is a local variable override, not a theme definition or a promise that every host exposes an agent.

Positional order: `padding`.

| Argument | Type | Contract |
| --- | --- | --- |
| `padding` | `string` | Padding<br>Shorthand<br>`{"cssKey":"padding"}` |

Sets the padding of the internal agent element.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Styled',
        styles: ['agent.padding(padding:0.5rem 0.75rem)']
    }
];
```

### `agent.margin`

<a id="entry-agent-margin"></a>

Margin

Configure outer spacing through the component agent styling channel.

Writes path-derived CSS custom properties on the host, leaving the component stylesheet to consume them for its internal agent.

Use a component whose internal agent stylesheet consumes the corresponding variables.

Use agent.css with an explicit CSS rule when the internal part needs direct CSS beyond this variable channel.

This is a local variable override, not a theme definition or a promise that every host exposes an agent.

Positional order: `margin`.

| Argument | Type | Contract |
| --- | --- | --- |
| `margin` | `string` | Margin<br>Shorthand<br>`{"cssKey":"margin"}` |

Sets the margin of the internal agent element.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Styled',
        styles: ['agent.margin(margin:1rem 0 2rem)']
    }
];
```

### `agent.text`

<a id="entry-agent-text"></a>

Text

Configure font family, size, weight, line height, and foreground color through the component agent styling channel.

Writes path-derived CSS custom properties on the host, leaving the component stylesheet to consume them for its internal agent.

Use a component whose internal agent stylesheet consumes the corresponding variables.

Use agent.css with an explicit CSS rule when the internal part needs direct CSS beyond this variable channel.

This is a local variable override, not a theme definition or a promise that every host exposes an agent.

Positional order: `font` → `size` → `weight` → `color` → `lineheight`.

| Argument | Type | Contract |
| --- | --- | --- |
| `font` | `string` | Font family<br>`{"cssKey":"fontFamily"}` |
| `size` | `string` | Size<br>`{"cssKey":"fontSize"}` |
| `weight` | `string` | Font weight<br>Options: `normal` — Normal, `bold` — Bold<br>`{"cssKey":"fontWeight"}` |
| `color` | `string` | Text color<br>`{"cssKey":"color"}` |
| `lineheight` | `string` | Line height<br>Options: `normal` — Normal, `1` — Compact, `1.5` — Loose<br>`{"cssKey":"lineHeight"}` |

Sets the text styling of the internal agent element.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Styled',
        styles: ['agent.text(size:1.2rem)']
    }
];
```

### `agent.outline`

<a id="entry-agent-outline"></a>

Outline

Configure outline width, style, and color through the component agent styling channel.

Writes path-derived CSS custom properties on the host, leaving the component stylesheet to consume them for its internal agent.

Use a component whose internal agent stylesheet consumes the corresponding variables.

Use agent.css with an explicit CSS rule when the internal part needs direct CSS beyond this variable channel.

This is a local variable override, not a theme definition or a promise that every host exposes an agent.

Positional order: `width` → `style` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `width` | `string` | Outline width<br>`{"cssKey":"outlineWidth"}` |
| `style` | `string` | Outline style<br>Options: `none` — None, `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted, `double` — Double, `groove` — 3D groove, `ridge` — 3D ridge, `inset` — 3D inset, `outset` — 3D outset<br>`{"cssKey":"outlineStyle"}` |
| `color` | `string` | Outline color<br>`{"cssKey":"outlineColor"}` |

Sets the outline of the internal agent element.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Styled',
        styles: ['agent.outline(width:2px;style:solid;color:var(--jam-ac-color))']
    }
];
```

### `agent.css`

<a id="entry-agent-css"></a>

CSS styles

Apply CSS that has no more specific native style helper, including explicitly scoped rules.

Accepts a property dictionary or cssText; callable cssText receives the host and returns a dictionary or declaration string. Explicit state, selector, or direct arguments select rule application; otherwise the path chooses the method, falling back to inline properties.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

vars writes path-derived custom properties and requires a matching consumer. Rule targeting and direct-child matching are different from direct inline targeting; do not infer descendant-wide behavior from a component prefix.

Positional order: `display` → `position` → `width` → `height` → `minWidth` → `minHeight` → `maxWidth` → `maxHeight` → `padding` → `paddingTop` → `paddingRight` → `paddingBottom` → `paddingLeft` → `margin` → `marginTop` → `marginRight` → `marginBottom` → `marginLeft` → `gap` → `color` → `background` → `backgroundColor` → `border` → `borderRadius` → `opacity` → `overflow` → `transform` → `transition` → `whiteSpace` → `zIndex` → `setProperty` → `removeProperty` → `getPropertyValue` → `selector` → `method` → `direct` → `cssText`.

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

Applies arbitrary CSS to the internal agent element. Accepts any CSS key-value pairs.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Styled',
        styles: ['agent.css(opacity:0.9;transition:all 0.2s)']
    }
];
```
