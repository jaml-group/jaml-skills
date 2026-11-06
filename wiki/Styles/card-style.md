# card style variants

<!-- Generated from native authoring; do not edit. -->

[中文](card-style.zh.md)

**Element:** `jam-card` · **Type:** `container`

---

## Slots

| Slot         | Type    | Description                            |
| ------------ | ------- | -------------------------------------- |
| `icon`       | slotted | Icon content                           |
| `cap`        | slotted | Title label text                       |
| `label` slot | slot    | The `<slot name="label">` element      |
| `body` slot  | slot    | The `<slot class="body">` default slot |

---

## Style variants

### `card.floating`

<a id="entry-card-floating"></a>

Floating card

Compose a floating card with window-like controls.

Combines floating positioning, size/bias, label-handle movement, contained resizing, close and zoom controls. Click-to-front controls stacking.

Use a card with its normal label slot inside a suitable positioned parent.

Card content and application state remain in the component; the preset supplies presentation and window interactions.

Closing removes the host by default. This preset does not establish a focus trap or an application-level dialog result contract.

Positional order: `top` → `left` → `bias` → `width` → `minWidth` → `maxWidth` → `height` → `minHeight` → `maxHeight` → `size`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `top` | `string` | Not supplied | Top |
| `left` | `string` | Not supplied | Left |
| `bias` | `number` | `30` | Offset |
| `width` | `string` | Not supplied | Width<br>`{"cssKey":"width"}` |
| `minWidth` | `string` | `200` | Minimum width<br>`{"cssKey":"minWidth"}` |
| `maxWidth` | `string` | Not supplied | Maximum width<br>`{"cssKey":"maxWidth"}` |
| `height` | `string` | Not supplied | Height<br>`{"cssKey":"height"}` |
| `minHeight` | `string` | `200` | Minimum height<br>`{"cssKey":"minHeight"}` |
| `maxHeight` | `string` | Not supplied | Maximum height<br>`{"cssKey":"maxHeight"}` |
| `size` | `string` | Not supplied | Dimensions<br>Shorthand |

Floating card — movable, resizable, closable, zoomable, click-to-front panel. The card can be dragged by its label slot, resized from any edge, closed via the close button, and brought to front on click.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Floating Panel',
        styles: ['card.floating(width:300px;height:200px)'],
        components: [
            { type: 'label', cap: 'Drag by the title bar' },
            { type: 'label', cap: 'Resize from edges' }
        ]
    },
    {
        type: 'card',
        cap: 'Centered Float',
        styles: ['card.floating(top:10%;left:50%;width:400px;height:150px)'],
        components: [{ type: 'label', cap: 'Positioned card' }]
    }
];
```

### `card.modal`

<a id="entry-card-modal"></a>

Modal card

Compose a modal card with window-like controls.

Combines floating positioning, size/bias, label-handle movement, contained resizing, close and zoom controls. Mount brings it to the front and applies parent-level modal prevention; unmount, style teardown or host destruction releases that modal ownership.

Use a card with its normal label slot inside a suitable positioned parent.

Card content and application state remain in the component; the preset supplies presentation and window interactions.

Closing removes the host by default. This preset does not establish a focus trap or an application-level dialog result contract.

Positional order: `top` → `left` → `bias` → `width` → `minWidth` → `maxWidth` → `height` → `minHeight` → `maxHeight` → `size` → `prevent`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `top` | `string` | Not supplied | Top |
| `left` | `string` | Not supplied | Left |
| `bias` | `number` | `30` | Offset |
| `width` | `string` | Not supplied | Width<br>`{"cssKey":"width"}` |
| `minWidth` | `string` | `200` | Minimum width<br>`{"cssKey":"minWidth"}` |
| `maxWidth` | `string` | Not supplied | Maximum width<br>`{"cssKey":"maxWidth"}` |
| `height` | `string` | Not supplied | Height<br>`{"cssKey":"height"}` |
| `minHeight` | `string` | `200` | Minimum height<br>`{"cssKey":"minHeight"}` |
| `maxHeight` | `string` | Not supplied | Maximum height<br>`{"cssKey":"maxHeight"}` |
| `size` | `string` | Not supplied | Dimensions<br>Shorthand |
| `prevent` | `enum` | `close` | Block interaction<br>Options: `close`, `click` |

Managed modal card — movable, resizable, closable, zoomable, and inserted at the front of its parent's modal stack. It accepts the same `top`, `left`, `bias`, and size arguments as `card.floating`. Only the frontmost managed modal has enabled extra controls; trying a disabled control shakes the current front modal.

```javascript jaml-playground
export default {
    type: 'card',
    cap: 'Modal Panel',
    styles: ['card.modal(width:24rem;height:14rem;bias:24)'],
    components: [{ type: 'label', cap: 'Managed modal content' }]
};
```

---

## Usage

```javascript jaml-playground
export default {
    type: 'card',
    cap: 'Floating Panel',
    styles: ['card.floating(width:300px;height:200px)'],
    components: [{ type: 'label', cap: 'Content here' }]
};
```

## `card.grid`

<a id="entry-card-grid"></a>

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

## `card.text`

<a id="entry-card-text"></a>

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

## `card.color`

<a id="entry-card-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `card.inline`

<a id="entry-card-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `card.icon.text`

<a id="entry-card-icon-text"></a>

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

## `card.text.mono`

<a id="entry-card-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family.

## `card.color.accent`

<a id="entry-card-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `card.bodyslot.text`

<a id="entry-card-bodyslot-text"></a>

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

## `card.bodyslot.color`

<a id="entry-card-bodyslot-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `card.capslot.layout`

<a id="entry-card-capslot-layout"></a>

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

## `card.background.tint`

<a id="entry-card-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `card.bodyslot.inline`

<a id="entry-card-bodyslot-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `card.bodyslot.layout`

<a id="entry-card-bodyslot-layout"></a>

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

## `card.iconslot.layout`

<a id="entry-card-iconslot-layout"></a>

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

## `card.labelslot.layout`

<a id="entry-card-labelslot-layout"></a>

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

## `card.text.size.l`

<a id="entry-card-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `card.text.size.m`

<a id="entry-card-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `card.text.size.s`

<a id="entry-card-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `card.text.size.xl`

<a id="entry-card-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `card.text.size.xs`

<a id="entry-card-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `card.text.size.3xl`

<a id="entry-card-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `card.text.size.4xl`

<a id="entry-card-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `card.text.size.xxl`

<a id="entry-card-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `card.text.size.xxs`

<a id="entry-card-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `card.bodyslot.text.mono`

<a id="entry-card-bodyslot-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family.

## `card.bodyslot.color.accent`

<a id="entry-card-bodyslot-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `card.bodyslot.background.tint`

<a id="entry-card-bodyslot-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `card.bodyslot.text.size.l`

<a id="entry-card-bodyslot-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `card.bodyslot.text.size.m`

<a id="entry-card-bodyslot-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `card.bodyslot.text.size.s`

<a id="entry-card-bodyslot-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `card.bodyslot.text.size.xl`

<a id="entry-card-bodyslot-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `card.bodyslot.text.size.xs`

<a id="entry-card-bodyslot-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `card.bodyslot.text.size.3xl`

<a id="entry-card-bodyslot-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `card.bodyslot.text.size.4xl`

<a id="entry-card-bodyslot-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `card.bodyslot.text.size.xxl`

<a id="entry-card-bodyslot-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `card.bodyslot.text.size.xxs`

<a id="entry-card-bodyslot-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.
