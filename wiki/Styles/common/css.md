# css / state-prefixed CSS

<!-- Generated from native authoring; do not edit. -->

[中文](css.zh.md)

<a id="entry-css"></a>

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

Inline CSS styles with pseudo-class/state scoped variants. Each is a standalone function — they are **not** nested under `css`.

## Variants

-   **`css(key:val;...)`** — always applied to the element
-   **`hover(key:val;...)`** — applied on `:hover`
-   **`visited(key:val;...)`** — declared compatibility helper without a `:visited` mapping in this baseline; use an explicit selector
-   **`active(key:val;...)`** — applied on `:active`
-   **`focus(key:val;...)`** — applied on `:focus`
-   **`disabled(key:val;...)`** — scoped to `:disabled`
-   **`checked(key:val;...)`** — scoped to the framework `.jam-checked` class
-   **`indeterminate(key:val;...)`** — scoped to the framework `.jam-indeterminate` class
-   **`before(key:val;...)`** — applied to `::before` pseudo-element
-   **`after(key:val;...)`** — applied to `::after` pseudo-element

Each accepts arbitrary CSS key-value pairs in semicolon format. Raw CSS values and explicit `var(...)` references remain valid.

## State overrides and `method:rule`

Plain `css(...)` applies declarations as inline styles. State-prefixed variants such as `hover(...)`, `active(...)`, and `focus(...)` use scoped stylesheet rules. If both set the same CSS property, the inline declaration wins and the state value will not appear.

Set `method:rule` on the base `css(...)` style when a state needs to override the same property. This routes the base declaration through a scoped rule as well, allowing the state selector to win normally. `method` is routing metadata and is not emitted as a CSS property.

```javascript jaml-playground
export default {
    type: 'button',
    cap: 'Hover me',
    styles: ['css(method:rule;background-color:primary;color:onprimary)', 'hover(background-color:secondary;color:onsecondary)']
};
```

## Property-aware token values

For supported properties, a bare top-level value can name a design-system token. Resolution depends on the CSS property, so the same word can have the correct meaning in each declaration. For example, `xs` is spacing in `padding` and border width in `border`, while `primary` is a default fill in `background`, a foreground in `color`, and a subtle edge color in `border`.

| CSS context                                                                                          | Accepted values                                                                                             | Resolution                                                                |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `padding*`, `margin*`, `gap`, `row-gap`, `column-gap`, `grid-gap`, `grid-row-gap`, `grid-column-gap` | `xxs`, `xs`, `s`, `m`, `l`, `xl`, `xxl`                                                                     | `--jam-space-*`                                                           |
| `border-radius` and corner radius properties                                                         | `xxs`, `xs`, `s`, `m`, `l`, `xl`, `xxl`                                                                     | `--jam-border-radius-*`                                                   |
| Border side shorthands and widths, `outline`, `column-rule`                                          | `xxs`, `xs`, `s`, `m`, `l`, `xl`, `xxl`                                                                     | `--jam-border-width-*`                                                    |
| `font-size`                                                                                          | `xxs`, `xs`, `s`, `m`, `l`, `xl`, `xxl`, `3xl`, `4xl`                                                       | `--jam-typography-font-size-*`                                            |
| `background`, `background-color`                                                                     | `primary`, `secondary`, `tertiary`, `quaternary`, `neutral`, `tint`, `elevated`                             | Matching `--jam-color-*-default`                                          |
| `background`, `background-color`                                                                     | `lowest`, `lower`, `default`, `higher`, `highest`                                                           | Matching `--jam-color-surface-*`                                          |
| `color`                                                                                              | `default`, `strong`, `subtle`, `muted`, `faint`, `accent`, `primary`, `secondary`, `tertiary`, `quaternary` | Matching `--jam-color-fg-*`; `accent` aliases `primary`                   |
| `color`                                                                                              | `onprimary`, `onsecondary`, `ontertiary`, `onquaternary`                                                    | Matching `--jam-color-on-*`                                               |
| Border side shorthands and edge-color properties                                                     | `primary`, `secondary`, `tertiary`, `quaternary`                                                            | Matching `--jam-color-*-subtle`                                           |
| Border side shorthands and edge-color properties                                                     | `subtle`, `muted`, `faint`                                                                                  | Matching `--jam-color-outline-*`                                          |
| Border side shorthands and edge-color properties                                                     | `lowest`, `lower`, `default`, `higher`, `highest`                                                           | Matching `--jam-color-surface-*`                                          |
| Token segments in `box-shadow`                                                                       | `xs`, `s`, `m`, `l`, `xl`, `xxl`; `primary.xs` / `primary-xs` through `primary.xl` / `primary-xl`           | Matching `--jam-shadow-*`, including compound comma-separated values      |
| Token segments in `text-shadow`                                                                      | `xs`, `s`, `m`; `primary.xs` / `primary-xs` through `primary.m` / `primary-m`                               | Matching `--jam-text-shadow-*`, including compound comma-separated values |
| Single token argument in `filter: drop-shadow(...)`                                                  | Box-shadow values above                                                                                     | Matching `--jam-shadow-*`                                                 |

The compact on-color values intentionally omit the dot. Use `onprimary` inside `css(color:...)`; `color.on.primary` is the separate native style path.

Resolution occurs before the existing color shorthands, so property semantics win: `border:solid xs primary` uses `--jam-color-primary-subtle`, not a calculated accent color. Lowercase `ac`, `onac`, `lumitext(N)`, and `colortext`/`colortext[n]`, CSS named colors, semantic color-set names, and registered custom colors continue to work in color-capable declarations.

Replacement applies to the native singular `style` param (string or dictionary), `css(...)`, every state-prefixed CSS style, `Styles.props(...)`, scoped rule dictionaries, and dictionary-form `Styles.stylesheet({...})`. Dictionary replacement is recursive, so token values inside nested selector declarations in `Styles.stylesheet({...})` are resolved too. Bare values inside `calc(...)`, gradients, `var(...)`, URLs, and quoted content are left unchanged. The one function exception is `filter: drop-shadow(token)`, where a recognized single shadow token is resolved. Use an explicit `var(--jam-...)` reference for other values inside functions.

Compound shadows preserve the surrounding CSS while replacing recognized segments, for example `box-shadow: xs inset, primary-xl` and `filter: blur(2px) drop-shadow(primary.xl)`.

A stylesheet string is already compiled CSS and is not parsed for these shorthands. In particular, theme SCSS imported as `Styles.stylesheet(indexStyle)` must use explicit `var(--jam-...)` references. Use the dictionary form only when runtime property-aware replacement is intended.

## Usage

```javascript jaml-playground
export default {
    type: 'button',
    cap: 'Interactive',
    styles: ['css(padding:xs s;border:solid xs primary;background:tint)', 'hover(transform:scale(1.05))', 'active(transform:scale(0.95))']
};
```

The first declaration resolves `padding` to `--jam-space-xs` and `--jam-space-s`, the border width to `--jam-border-width-xs`, the border color to `--jam-color-primary-subtle`, and the background to `--jam-color-tint-default`. For a strongly colored fill, pair contexts explicitly: `css(background:primary;color:onprimary)`.
