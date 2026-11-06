# button style variants

<!-- Generated from native authoring; do not edit. -->

[中文](button-style.zh.md)

## `button.colorOnly`

<a id="entry-button-coloronly"></a>

Color-only button interaction

Opt-in class removes background, shadow and visible border in idle, hover, active and focus states. Foreground changes from the default text token to the primary foreground token on interaction. Compose with button-ghost; other ghost buttons are unchanged.

**Element:** `jam-button` · **Type:** `element`

---

## Slots

| Slot   | Type    | Description                 |
| ------ | ------- | --------------------------- |
| `icon` | slotted | Icon content                |
| `cap`  | slotted | Button label (default slot) |

---

## Style variants

### Ghost button

Use the `button-ghost` element type for a transparent button.

```javascript jaml-playground
export default [
    {
        type: 'button-ghost',
        cap: 'Ghost'
    }
];
```

### `button.cta`

<a id="entry-button-cta"></a>

CTA

Apply the legacy cta button marker.

Adds only the cta class; it does not set the button type.

For the supported cta button variant, select the native button type explicitly. This marker alone does not establish that variant or its action.

This legacy style adds a class only. Select the native `button-cta` type for the call-to-action variant; bind the action separately.

```javascript jaml-playground
export default [
    {
        type: 'button-cta',
        cap: 'Submit'
    }
];
```

### `button.close`

<a id="entry-button-close"></a>

Close

Give a button the conventional close action glyph.

Adds the close-btn class; button-role CSS draws the times glyph and hides the normal icon slot on jam-button.

Presentation only: bind the actual action separately; the style does not implement the operation.

Close button (X icon style). No args.

```javascript jaml-playground
export default [
    {
        type: 'button',
        icon: '✕',
        styles: ['button.close']
    }
];
```

### `button.reset`

<a id="entry-button-reset"></a>

Reset

Give a button the conventional reset action glyph.

Adds the reset-btn class; button-role CSS draws the undo glyph and hides the normal icon slot on jam-button.

Presentation only: bind the actual action separately; the style does not implement the operation.

Reset button style. No args.

```javascript jaml-playground
export default [
    {
        type: 'button',
        cap: 'Reset',
        styles: ['button.reset']
    }
];
```

### `button.add`

<a id="entry-button-add"></a>

Add

Give a button the conventional add action glyph.

Adds the add-btn class; button-role CSS draws the plus glyph and hides the normal icon slot on jam-button.

Presentation only: bind the actual action separately; the style does not implement the operation.

Add / create button with plus icon styling. No args.

```javascript jaml-playground
export default [
    {
        type: 'button',
        icon: '+',
        cap: 'Add',
        styles: ['button.add']
    }
];
```

### `button.check`

<a id="entry-button-check"></a>

Check

Give a button the conventional check action glyph.

Adds the check-btn class; button-role CSS draws the check glyph and hides the normal icon slot on jam-button.

Presentation only: bind the actual action separately; the style does not implement the operation.

Check / confirm button with checkmark styling. No args.

```javascript jaml-playground
export default [
    {
        type: 'button',
        icon: '✓',
        cap: 'Confirm',
        styles: ['button.check']
    }
];
```

### `button.vertical`

<a id="entry-button-vertical"></a>

Vertical

Select the vertical variant implemented by the target component.

Adds jam-vertical. Badge, button, button group, indicator, options, and progress styles each interpret it in their own component layout.

Use the matching component path and component structure.

A shared class does not imply equal geometry or a generic rotation; progress orientation and stacked caption/value layouts are distinct uses.

Vertical layout — stacks icon above the label. No args.

```javascript jaml-playground
export default [
    {
        type: 'button',
        icon: '⬆',
        cap: 'Upload',
        styles: ['button.vertical']
    }
];
```

### `button.pill`

<a id="entry-button-pill"></a>

Pill

Use a pill-shaped native button.

Adds pill styling with a large border radius while retaining the button behavior.

Pill / rounded capsule shape. No args.

```javascript jaml-playground
export default [
    {
        type: 'button',
        cap: 'Pill',
        styles: ['button.pill']
    }
];
```

### `button.fab`

<a id="entry-button-fab"></a>

FAB

Apply the legacy fab button marker.

Adds only the fab class; it does not set the button type.

For the supported fab button variant, select the native button type explicitly. This marker alone does not establish that variant or its action.

This legacy style adds a class only. Use the native `button-fab` type for the floating-action presentation and `button.round` when a circular shape is required.

```javascript jaml-playground
export default [
    {
        type: 'button-fab',
        icon: '✏',
        cap: 'Edit',
        styles: ['button.round']
    }
];
```

### `button.link`

<a id="entry-button-link"></a>

Link

Apply the legacy link button marker.

Adds only the link class; it does not set the button type.

For the supported link button variant, select the native button type explicitly. This marker alone does not establish that variant or its action.

This legacy style adds a class only. Use the native `button-link` type for link presentation; navigation or command handling remains explicit.

```javascript jaml-playground
export default [
    {
        type: 'button-link',
        cap: 'Learn more'
    }
];
```

### `button.blended`

<a id="entry-button-blended"></a>

Blended

Use a subdued button surface that blends with its surroundings.

Sets button background, hover and active color variables through the blended class.

Use with a native button and its existing click handler.

Blended button style. No args.

```javascript jaml-playground
export default [
    {
        type: 'button',
        cap: 'Blended',
        styles: ['button.blended']
    }
];
```

### `button.round`

<a id="entry-button-round"></a>

Circular

Use a circular button for a compact icon action.

Adds a 1:1 aspect ratio, circular radius and non-growing flex sizing.

Use a button-role host and supply an accessible action label.

Round button shape. No args.

```javascript jaml-playground
export default [
    {
        type: 'button',
        icon: 'plus',
        styles: ['button.round']
    }
];
```

---

## Usage

```javascript jaml-playground
export default {
    type: 'wrapper',
    stylize: 'actions',
    styles: ['layout.flex'],
    components: [
        { type: 'button-cta', cap: 'Primary' },
        { type: 'button-ghost', cap: 'Ghost' },
        { type: 'button-link', cap: 'Link' }
    ]
};
```

## `button.grid`

<a id="entry-button-grid"></a>

Notes: [`grid`](common/grid.md#entry-grid).

Positional order: `templateColumns` → `templateRows` → `autoColumns` → `autoRows` → `templateAreas` → `gap` → `area`.

| Argument | Type | Contract |
| --- | --- | --- |
| `templateColumns` | `string` | Column template |
| `templateRows` | `string` | Row template |
| `autoColumns` | `string` | Automatic columns |
| `autoRows` | `string` | Automatic rows |
| `templateAreas` | `string` | Template areas |
| `gap` | `string` | Gap |
| `area` | `string` | Grid area<br>`{"cssKey":"gridArea"}` |

## `button.text`

<a id="entry-button-text"></a>

Notes: [`text`](common/text.md#entry-text).

Positional order: `font` → `size` → `weight` → `style` → `decoration` → `spacing` → `shadow` → `align` → `whitespace` → `lineheight` → `userselect` → `indent` → `caretColor` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `font` | `string` | Font family<br>`{"cssKey":"fontFamily"}` |
| `size` | `string` | Size<br>`{"cssKey":"fontSize"}` |
| `weight` | `string` | Font weight<br>Options: `normal` — Normal, `bold` — Bold<br>`{"cssKey":"fontWeight"}` |
| `style` | `string` | Style<br>Options: `normal` — Normal, `italic` — Italic<br>`{"cssKey":"fontStyle"}` |
| `decoration` | `string` | Decoration<br>Options: `none` — None, `underline` — Underline<br>`{"cssKey":"textDecoration"}` |
| `spacing` | `string` | Gap<br>`{"cssKey":"letterSpacing"}` |
| `shadow` | `string` | Shadow<br>`{"cssKey":"textShadow"}` |
| `align` | `string` | Alignment<br>Options: `left` — Left aligned, `center` — Center, `right` — Right aligned<br>`{"cssKey":"textAlign"}` |
| `whitespace` | `string` | Whitespace<br>Options: `normal` — Normal, `nowrap` — No wrapping, `pre` — Preserve whitespace<br>`{"cssKey":"whiteSpace"}` |
| `lineheight` | `string` | Line height<br>Options: `normal` — Normal, `1` — Compact, `1.5` — Loose<br>`{"cssKey":"lineHeight"}` |
| `userselect` | `string` | User selection<br>Options: `auto` — Automatic, `none` — None<br>`{"cssKey":"userSelect"}` |
| `indent` | `string` | Indent<br>`{"cssKey":"textIndent"}` |
| `caretColor` | `string` | Caret color<br>`{"cssKey":"caretColor"}` |
| `color` | `string` | Text color<br>`{"cssKey":"color"}` |

## `button.color`

<a id="entry-button-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `button.inline`

<a id="entry-button-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `button.icon.text`

<a id="entry-button-icon-text"></a>

Notes: [`text`](common/text.md#entry-text).

Positional order: `font` → `size` → `weight` → `style` → `decoration` → `spacing` → `shadow` → `align` → `whitespace` → `lineheight` → `userselect` → `indent` → `caretColor` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `font` | `string` | Font family |
| `size` | `string` | Size<br>`{"cssKey":"fontSize"}` |
| `weight` | `string` | Font weight<br>Options: `normal` — Normal, `bold` — Bold<br>`{"cssKey":"fontWeight"}` |
| `style` | `string` | Style<br>Options: `normal` — Normal, `italic` — Italic<br>`{"cssKey":"fontStyle"}` |
| `decoration` | `string` | Decoration<br>Options: `none` — None, `underline` — Underline<br>`{"cssKey":"textDecoration"}` |
| `spacing` | `string` | Gap<br>`{"cssKey":"letterSpacing"}` |
| `shadow` | `string` | Shadow |
| `align` | `string` | Alignment<br>Options: `left` — Left aligned, `center` — Center, `right` — Right aligned<br>`{"cssKey":"textAlign"}` |
| `whitespace` | `string` | Whitespace<br>Options: `normal` — Normal, `nowrap` — No wrapping, `pre` — Preserve whitespace<br>`{"cssKey":"whiteSpace"}` |
| `lineheight` | `string` | Line height<br>Options: `normal` — Normal, `1` — Compact, `1.5` — Loose<br>`{"cssKey":"lineHeight"}` |
| `userselect` | `string` | User selection<br>Options: `auto` — Automatic, `none` — None<br>`{"cssKey":"userSelect"}` |
| `indent` | `string` | Indent<br>`{"cssKey":"textIndent"}` |
| `caretColor` | `string` | Caret color<br>`{"cssKey":"caretColor"}` |
| `color` | `string` | Text color |

## `button.text.mono`

<a id="entry-button-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family.

## `button.color.accent`

<a id="entry-button-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `button.capslot.layout`

<a id="entry-button-capslot-layout"></a>

Notes: [`layout`](common/layout.md#entry-layout).

Positional order: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| Argument | Type | Contract |
| --- | --- | --- |
| `display` | `string` | Display mode<br>`{"cssKey":"display"}` |
| `position` | `string` | Position<br>`{"cssKey":"position"}` |
| `order` | `number` | Order<br>`{"cssKey":"order"}` |
| `overflow` | `string` | Overflow<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | Gap |
| `zIndex` | `number` | Layer order<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | Box sizing<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | Transform<br>`{"cssKey":"transform"}` |
| `transition` | `string` | Transition<br>`{"cssKey":"transition"}` |

## `button.background.tint`

<a id="entry-button-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `button.iconslot.layout`

<a id="entry-button-iconslot-layout"></a>

Notes: [`layout`](common/layout.md#entry-layout).

Positional order: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| Argument | Type | Contract |
| --- | --- | --- |
| `display` | `string` | Display mode<br>`{"cssKey":"display"}` |
| `position` | `string` | Position<br>`{"cssKey":"position"}` |
| `order` | `number` | Order<br>`{"cssKey":"order"}` |
| `overflow` | `string` | Overflow<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | Gap |
| `zIndex` | `number` | Layer order<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | Box sizing<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | Transform<br>`{"cssKey":"transform"}` |
| `transition` | `string` | Transition<br>`{"cssKey":"transition"}` |

## `button.extraslot.layout`

<a id="entry-button-extraslot-layout"></a>

Notes: [`layout`](common/layout.md#entry-layout).

Positional order: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| Argument | Type | Contract |
| --- | --- | --- |
| `display` | `string` | Display mode<br>`{"cssKey":"display"}` |
| `position` | `string` | Position<br>`{"cssKey":"position"}` |
| `order` | `number` | Order<br>`{"cssKey":"order"}` |
| `overflow` | `string` | Overflow<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | Gap |
| `zIndex` | `number` | Layer order<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | Box sizing<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | Transform<br>`{"cssKey":"transform"}` |
| `transition` | `string` | Transition<br>`{"cssKey":"transition"}` |

## `button.labelslot.layout`

<a id="entry-button-labelslot-layout"></a>

Notes: [`layout`](common/layout.md#entry-layout).

Positional order: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| Argument | Type | Contract |
| --- | --- | --- |
| `display` | `string` | Display mode<br>`{"cssKey":"display"}` |
| `position` | `string` | Position<br>`{"cssKey":"position"}` |
| `order` | `number` | Order<br>`{"cssKey":"order"}` |
| `overflow` | `string` | Overflow<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | Gap |
| `zIndex` | `number` | Layer order<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | Box sizing<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | Transform<br>`{"cssKey":"transform"}` |
| `transition` | `string` | Transition<br>`{"cssKey":"transition"}` |

## `button.text.size.l`

<a id="entry-button-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `button.text.size.m`

<a id="entry-button-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `button.text.size.s`

<a id="entry-button-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `button.text.size.xl`

<a id="entry-button-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `button.text.size.xs`

<a id="entry-button-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `button.text.size.3xl`

<a id="entry-button-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `button.text.size.4xl`

<a id="entry-button-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `button.text.size.xxl`

<a id="entry-button-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `button.text.size.xxs`

<a id="entry-button-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.
