# element style variants

<!-- Generated from native authoring; do not edit. -->

[中文](element-style.zh.md)

**Element:** `jam-element` · **Type:** `element`

Element (`EndiveElement`) is a generic container used for representers (`divider`, `hr`, `vr`, `data`, `placeholder`). Minimal style variants.

---

## Style variants

### `element.placeholder`

<a id="entry-element-placeholder"></a>

Placeholder

Reserve layout space while concealing an element.

Sets visibility to hidden, preserving its layout box.

Use when the surrounding layout must remain stable; conditional rendering or display hiding serves a different purpose.

Placeholder visibility — hides the element by default (sets `visibility: hidden`). Useful for representers that should not be visible. No args.

```javascript jaml-playground
export default [
    {
        type: 'element-divider',
        styles: ['element.placeholder']
    }
];
```

### `element.header`

<a id="entry-element-header"></a>

Title

Present an element as a document heading.

Adds header and level-specific classes consumed by the element document stylesheet.

This is visual presentation; it does not change the DOM tag into a semantic heading.

Positional order: `level`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `level` | `number` | `1` | Heading level |

Heading-style layout.

```javascript jaml-playground
export default [
    {
        type: 'element',
        value: 'Section title',
        styles: ['element.header(level:2)']
    }
];
```

### `element.para`

<a id="entry-element-para"></a>

Paragraph

Present a document paragraph within JAML.

Adds the para and indent-specific classes for document styling.

Supply content separately; this style does not parse text into document structure.

Positional order: `indent`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `indent` | `number` | `0` | Indent |

Paragraph text layout.

```javascript jaml-playground
export default [
    {
        type: 'element',
        value: 'Paragraph copy with an indent.',
        styles: ['element.para(indent:1)']
    }
];
```

### `element.quote`

<a id="entry-element-quote"></a>

Quote

Present a document quote within JAML.

Adds the quote and indent-specific classes for document styling.

Supply content separately; this style does not parse text into document structure.

Positional order: `indent`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `indent` | `number` | `0` | Indent |

Blockquote style.

```javascript jaml-playground
export default [
    {
        type: 'element',
        value: 'A quoted sentence.',
        styles: ['element.quote(indent:1)']
    }
];
```

### `element.list`

<a id="entry-element-list"></a>

List

Present a list item owned by the Markdown renderer.

Adds indentation/list classes and an optional order marker. With todo enabled, prepends a native checkbox switch initialized from checked and forwards host clicks through clickWith.

Reserved for Markdown rendering; do not select this style for ordinary JAML lists or todo controls. Application collections use list/item roles and data-driven native children. This style does not parse Markdown or maintain application task data or persistence.

Positional order: `indent` → `order` → `todo` → `checked`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `indent` | `number` | `0` | Indent |
| `order` | `number` | Not supplied | Ordered |
| `todo` | `boolean` | `false` | To-do |
| `checked` | `boolean` | `false` | Completed |

Reserved for Markdown-rendered list items. Ordinary JAML collections use `stylize: "list"` on their owner and `stylize: "item"` on their native children; use `buildFor` for data-driven repetition. Supply document bullets, numbering and task lists as Markdown.

### `element.image`

<a id="entry-element-image"></a>

Image

Insert an image into an element.

Creates an img from src and alt, appends it to the host and removes that image when the style is removed.

Use alt for the image meaning and size the surrounding element through normal styles.

Positional order: `src` → `alt`.

| Argument | Type | Contract |
| --- | --- | --- |
| `src` | `string` | URL |
| `alt` | `string` | Alternative text |

Image display — renders an `<img>` element inside the element.

```javascript jaml-playground
export default [
    {
        type: 'element',
        styles: ['element.image(src:https://via.placeholder.com/200;alt:Placeholder image)']
    }
];
```

---

## Usage

Element (`EndiveElement`) is a generic container used for representers (`divider`, `hr`, `vr`, `data`, `placeholder`). Minimal style variants.

## `element.grid`

<a id="entry-element-grid"></a>

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

## `element.text`

<a id="entry-element-text"></a>

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

## `element.color`

<a id="entry-element-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `element.inline`

<a id="entry-element-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `element.icon.text`

<a id="entry-element-icon-text"></a>

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

## `element.text.mono`

<a id="entry-element-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family.

## `element.color.accent`

<a id="entry-element-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `element.capslot.layout`

<a id="entry-element-capslot-layout"></a>

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

## `element.background.tint`

<a id="entry-element-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `element.iconslot.layout`

<a id="entry-element-iconslot-layout"></a>

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

## `element.extraslot.layout`

<a id="entry-element-extraslot-layout"></a>

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

## `element.labelslot.layout`

<a id="entry-element-labelslot-layout"></a>

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

## `element.text.size.l`

<a id="entry-element-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `element.text.size.m`

<a id="entry-element-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `element.text.size.s`

<a id="entry-element-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `element.text.size.xl`

<a id="entry-element-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `element.text.size.xs`

<a id="entry-element-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `element.text.size.3xl`

<a id="entry-element-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `element.text.size.4xl`

<a id="entry-element-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `element.text.size.xxl`

<a id="entry-element-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `element.text.size.xxs`

<a id="entry-element-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.
