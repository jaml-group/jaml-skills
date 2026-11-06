# container style variants

<!-- Generated from native authoring; do not edit. -->

[中文](container-style.zh.md)

**Element:** `jam-container` · **Type:** `container`

Container inherits layout and grid basics — `display`, `position`, `gap`, `gridTemplateColumns`, `gridTemplateRows`, `gridAutoColumns`, `gridAutoRows`, `gridTemplateAreas`, `gridArea`.

---

## Style variants

### `container.innershadow`

<a id="entry-container-innershadow"></a>

Inner shadow

Give a container or wrapper an inset surface.

Applies an accent-derived border, a token border radius and an inset shadow.

Inner shadow border effect — adds an inset box-shadow and border to the container. No args.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['container.innershadow'],
        components: [{ type: 'label', cap: 'Inner shadow container' }]
    }
];
```

### `container.childcount`

<a id="entry-container-childcount"></a>

Child count

Expose child-count state for container decoration.

On childchange, counts all direct element children, writes child-count and toggles jam-empty.

The count includes decorative/slotted children; it is not the number of application records and is not initialized by a separate mount callback.

Tracks child count automatically — sets a `child-count` attribute on the element and adds a `jam-empty` class when there are no children. No args.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['container.childcount'],
        components: [
            { type: 'label', cap: 'Item 1' },
            { type: 'label', cap: 'Item 2' }
        ]
    },
    {
        type: 'container',
        styles: ['container.childcount'],
        components: []
    }
];
```

---

## Usage

```javascript jaml-playground
export default {
    type: 'container',
    styles: ['container.innershadow', 'container.childcount'],
    components: [
        { type: 'label', cap: 'Item 1' },
        { type: 'label', cap: 'Item 2' }
    ]
};
```

## `container.grid`

<a id="entry-container-grid"></a>

Notes: [`grid`](common/grid.md#entry-grid).

Positional order: `templateColumns` → `templateRows` → `autoColumns` → `autoRows` → `templateAreas` → `gap` → `area`.

| Argument | Type | Contract |
| --- | --- | --- |
| `templateColumns` | `string` | Column template<br>`{"cssKey":"gridTemplateColumns"}` |
| `templateRows` | `string` | Row template<br>`{"cssKey":"gridTemplateRows"}` |
| `autoColumns` | `string` | Automatic columns<br>`{"cssKey":"gridAutoColumns"}` |
| `autoRows` | `string` | Automatic rows<br>`{"cssKey":"gridAutoRows"}` |
| `templateAreas` | `string` | Template areas<br>`{"cssKey":"gridTemplateAreas"}` |
| `gap` | `string` | Gap |
| `area` | `string` | Grid area<br>`{"cssKey":"gridArea"}` |

## `container.text`

<a id="entry-container-text"></a>

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

## `container.color`

<a id="entry-container-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `container.inline`

<a id="entry-container-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `container.layout`

<a id="entry-container-layout"></a>

Notes: [`layout`](common/layout.md#entry-layout).

Positional order: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| Argument | Type | Contract |
| --- | --- | --- |
| `display` | `string` | Display mode<br>`{"cssKey":"display"}` |
| `position` | `string` | Position<br>`{"cssKey":"position"}` |
| `order` | `number` | Order<br>`{"cssKey":"order"}` |
| `overflow` | `string` | Overflow<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | Gap<br>`{"cssKey":"gap"}` |
| `zIndex` | `number` | Layer order<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | Box sizing<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | Transform<br>`{"cssKey":"transform"}` |
| `transition` | `string` | Transition<br>`{"cssKey":"transition"}` |

## `container.text.mono`

<a id="entry-container-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family.

## `container.color.accent`

<a id="entry-container-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `container.background.tint`

<a id="entry-container-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `container.text.size.l`

<a id="entry-container-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `container.text.size.m`

<a id="entry-container-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `container.text.size.s`

<a id="entry-container-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `container.text.size.xl`

<a id="entry-container-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `container.text.size.xs`

<a id="entry-container-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `container.text.size.3xl`

<a id="entry-container-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `container.text.size.4xl`

<a id="entry-container-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `container.text.size.xxl`

<a id="entry-container-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `container.text.size.xxs`

<a id="entry-container-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.
