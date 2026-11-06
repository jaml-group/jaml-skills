# buttongroup style variants

<!-- Generated from native authoring; do not edit. -->

[中文](buttongroup-style.zh.md)

**Element:** `jam-buttongroup` · **Type:** `element`

---

## Slots

| Slot     | Type    | Description                               |
| -------- | ------- | ----------------------------------------- |
| `option` | slotted | Individual button options (`.jam-option`) |

---

## Style variants

### `buttongroup.tilted`

<a id="entry-buttongroup-tilted"></a>

Tilted buttons

Give a button group tilted navigation-like shapes.

Adds tilted styling to child buttons, including side treatment and a minimum width.

This style does not route pages, manage selection or collapse overflowing navigation. Use layout.navigator separately when its host requirements fit.

Tilted / navigation tab style — buttons have angled edges. No args.

```javascript jaml-playground
export default [
    {
        type: 'buttongroup-radio',
        cap: 'Tabs',
        styles: ['buttongroup.tilted'],
        data: [
            { name: 'Tab 1', value: 'tab1' },
            { name: 'Tab 2', value: 'tab2' },
            { name: 'Tab 3', value: 'tab3' }
        ]
    }
];
```

### `buttongroup.equalwidth`

<a id="entry-buttongroup-equalwidth"></a>

Equal width

Align button-group options using the checkbox option-alignment preset.

Delegates to checkbox.alignoption and forwards the requested minimum width.

This controls option layout; selection mode still belongs to the buttongroup type.

Positional order: `width`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `width` | `string` | `6.25rem` | Minimum width |

Equal-width buttons — each option takes the same amount of space.

```javascript jaml-playground
export default [
    {
        type: 'buttongroup-radio',
        cap: 'Equal',
        styles: ['buttongroup.equalwidth(width:8rem)'],
        data: [
            { name: 'Small', value: 'small' },
            { name: 'Medium', value: 'medium' },
            { name: 'Large', value: 'large' }
        ]
    }
];
```

### `buttongroup.vertical`

<a id="entry-buttongroup-vertical"></a>

Vertical

Select the vertical variant implemented by the target component.

Adds jam-vertical. Badge, button, button group, indicator, options, and progress styles each interpret it in their own component layout.

Use the matching component path and component structure.

A shared class does not imply equal geometry or a generic rotation; progress orientation and stacked caption/value layouts are distinct uses.

Vertical layout — stacks buttons top-to-bottom. No args.

```javascript jaml-playground
export default [
    {
        type: 'buttongroup-radio',
        cap: 'Vertical',
        styles: ['buttongroup.vertical'],
        data: [
            { name: 'Option A', value: 'a' },
            { name: 'Option B', value: 'b' }
        ]
    }
];
```

### `buttongroup.stripy`

<a id="entry-buttongroup-stripy"></a>

Striped

Distinguish alternating buttons in a group.

Applies an elevated background variable to even child buttons and state transitions.

Zebra striping — alternating row background colors for readability. No args.

```javascript jaml-playground
export default [
    {
        type: 'buttongroup-radio',
        cap: 'Stripy',
        styles: ['buttongroup.stripy'],
        data: [
            { name: 'Item 1', value: '1' },
            { name: 'Item 2', value: '2' },
            { name: 'Item 3', value: '3' }
        ]
    }
];
```

---

## Usage

```javascript jaml-playground
export default {
    type: 'buttongroup-radio',
    cap: 'Tabs',
    styles: ['buttongroup.tilted', 'buttongroup.equalwidth'],
    data: [
        { name: 'Tab 1', value: 'tab1' },
        { name: 'Tab 2', value: 'tab2' }
    ]
};
```

## `buttongroup.grid`

<a id="entry-buttongroup-grid"></a>

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

## `buttongroup.text`

<a id="entry-buttongroup-text"></a>

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

## `buttongroup.color`

<a id="entry-buttongroup-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `buttongroup.inline`

<a id="entry-buttongroup-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `buttongroup.icon.text`

<a id="entry-buttongroup-icon-text"></a>

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

## `buttongroup.text.mono`

<a id="entry-buttongroup-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family.

## `buttongroup.color.accent`

<a id="entry-buttongroup-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `buttongroup.capslot.layout`

<a id="entry-buttongroup-capslot-layout"></a>

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

## `buttongroup.background.tint`

<a id="entry-buttongroup-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `buttongroup.buttonslot.text`

<a id="entry-buttongroup-buttonslot-text"></a>

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

## `buttongroup.iconslot.layout`

<a id="entry-buttongroup-iconslot-layout"></a>

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

## `buttongroup.buttonslot.color`

<a id="entry-buttongroup-buttonslot-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `buttongroup.extraslot.layout`

<a id="entry-buttongroup-extraslot-layout"></a>

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

## `buttongroup.labelslot.layout`

<a id="entry-buttongroup-labelslot-layout"></a>

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

## `buttongroup.buttonslot.inline`

<a id="entry-buttongroup-buttonslot-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `buttongroup.buttonslot.layout`

<a id="entry-buttongroup-buttonslot-layout"></a>

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

## `buttongroup.text.size.l`

<a id="entry-buttongroup-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `buttongroup.text.size.m`

<a id="entry-buttongroup-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `buttongroup.text.size.s`

<a id="entry-buttongroup-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `buttongroup.text.size.xl`

<a id="entry-buttongroup-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `buttongroup.text.size.xs`

<a id="entry-buttongroup-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `buttongroup.text.size.3xl`

<a id="entry-buttongroup-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `buttongroup.text.size.4xl`

<a id="entry-buttongroup-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `buttongroup.text.size.xxl`

<a id="entry-buttongroup-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `buttongroup.text.size.xxs`

<a id="entry-buttongroup-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `buttongroup.buttonslot.text.mono`

<a id="entry-buttongroup-buttonslot-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family.

## `buttongroup.buttonslot.color.accent`

<a id="entry-buttongroup-buttonslot-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `buttongroup.buttonslot.background.tint`

<a id="entry-buttongroup-buttonslot-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `buttongroup.buttonslot.text.size.l`

<a id="entry-buttongroup-buttonslot-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `buttongroup.buttonslot.text.size.m`

<a id="entry-buttongroup-buttonslot-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `buttongroup.buttonslot.text.size.s`

<a id="entry-buttongroup-buttonslot-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `buttongroup.buttonslot.text.size.xl`

<a id="entry-buttongroup-buttonslot-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `buttongroup.buttonslot.text.size.xs`

<a id="entry-buttongroup-buttonslot-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `buttongroup.buttonslot.text.size.3xl`

<a id="entry-buttongroup-buttonslot-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `buttongroup.buttonslot.text.size.4xl`

<a id="entry-buttongroup-buttonslot-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `buttongroup.buttonslot.text.size.xxl`

<a id="entry-buttongroup-buttonslot-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `buttongroup.buttonslot.text.size.xxs`

<a id="entry-buttongroup-buttonslot-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.
