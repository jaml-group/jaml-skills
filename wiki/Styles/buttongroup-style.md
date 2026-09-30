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

Grid

Configure grid-related arguments for the path-selected target.

Maps templateColumns, templateRows, autoColumns, autoRows and templateAreas to their CSS grid properties; gap stays gap, and area uses gridArea unless the owning path overrides its CSS key.

Set display:grid on the grid container separately, for example with css(display:grid). Use grid.area for explicit row/column placement of its items.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

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

Font family

Configure typography on the path-selected target.

Maps font, size, weight, style, decoration, spacing, shadow, alignment, wrapping, line height, selection, indentation, caret, and foreground fields; icon paths use their own font and shadow keys.

Choose text for typography and layout or align for box alignment; target the slotted content when the wrapper should retain its geometry.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

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

Color

Set foreground color for the target selected by the path.

Forwards color and optional channel arguments through the path-dependent styling method.

Use semantic color presets for theme-following foreground roles; color.accent at the root has a separate color-profile contract.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

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

Font family

Configure typography on the path-selected target.

Maps font, size, weight, style, decoration, spacing, shadow, alignment, wrapping, line height, selection, indentation, caret, and foreground fields; icon paths use their own font and shadow keys.

Choose text for typography and layout or align for box alignment; target the slotted content when the wrapper should retain its geometry.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

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

The root text.mono extension instead uses the generic monospace family. These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `buttongroup.color.accent`

<a id="entry-buttongroup-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `buttongroup.capslot.layout`

<a id="entry-buttongroup-capslot-layout"></a>

Layout

Adjust layout properties without switching to a specialized layout preset.

Sets display, position, order, overflow, gap, stacking, box sizing, transform, and transition when provided.

Use layout.grid or layout.flex for their specialized layout contracts; coordinate transform and overflow with motion or scroll owners.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

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

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `buttongroup.buttonslot.text`

<a id="entry-buttongroup-buttonslot-text"></a>

Font family

Configure typography on the path-selected target.

Maps font, size, weight, style, decoration, spacing, shadow, alignment, wrapping, line height, selection, indentation, caret, and foreground fields; icon paths use their own font and shadow keys.

Choose text for typography and layout or align for box alignment; target the slotted content when the wrapper should retain its geometry.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

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

Layout

Adjust layout properties without switching to a specialized layout preset.

Sets display, position, order, overflow, gap, stacking, box sizing, transform, and transition when provided.

Use layout.grid or layout.flex for their specialized layout contracts; coordinate transform and overflow with motion or scroll owners.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

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

Color

Set foreground color for the target selected by the path.

Forwards color and optional channel arguments through the path-dependent styling method.

Use semantic color presets for theme-following foreground roles; color.accent at the root has a separate color-profile contract.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

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

Layout

Adjust layout properties without switching to a specialized layout preset.

Sets display, position, order, overflow, gap, stacking, box sizing, transform, and transition when provided.

Use layout.grid or layout.flex for their specialized layout contracts; coordinate transform and overflow with motion or scroll owners.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

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

Layout

Adjust layout properties without switching to a specialized layout preset.

Sets display, position, order, overflow, gap, stacking, box sizing, transform, and transition when provided.

Use layout.grid or layout.flex for their specialized layout contracts; coordinate transform and overflow with motion or scroll owners.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

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

Layout

Adjust layout properties without switching to a specialized layout preset.

Sets display, position, order, overflow, gap, stacking, box sizing, transform, and transition when provided.

Use layout.grid or layout.flex for their specialized layout contracts; coordinate transform and overflow with motion or scroll owners.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

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

gap.l, margin.l, and padding.l use the l space token; text.size.l uses the l typography size token; border.l sets only border width; shadow.l and shadow.primary.l set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `buttongroup.text.size.m`

<a id="entry-buttongroup-text-size-m"></a>

Medium

gap.m, margin.m, and padding.m use the m space token; text.size.m uses the m typography size token; border.m sets only border width; shadow.m and shadow.primary.m set box shadows; shadow.text.m and shadow.text.primary.m set text shadows; border.default sets a solid surface-default border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `buttongroup.text.size.s`

<a id="entry-buttongroup-text-size-s"></a>

Small

gap.s, margin.s, and padding.s use the s space token; text.size.s uses the s typography size token; border.s sets only border width; shadow.s and shadow.primary.s set box shadows; shadow.text.s and shadow.text.primary.s set text shadows; border.faint and border.muted set solid outline-role borders with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `buttongroup.text.size.xl`

<a id="entry-buttongroup-text-size-xl"></a>

Extra large

gap.xl, margin.xl, and padding.xl use the xl space token; text.size.xl uses the xl typography size token; border.xl sets only border width; shadow.xl and shadow.primary.xl set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `buttongroup.text.size.xs`

<a id="entry-buttongroup-text-size-xs"></a>

Extra small

gap.xs, margin.xs, and padding.xs use the xs space token; text.size.xs uses the xs typography size token; border.xs sets only border width; shadow.xs and shadow.primary.xs set box shadows; shadow.text.xs and shadow.text.primary.xs set text shadows; border.subtle sets a solid outline-subtle border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `buttongroup.text.size.3xl`

<a id="entry-buttongroup-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `buttongroup.text.size.4xl`

<a id="entry-buttongroup-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `buttongroup.text.size.xxl`

<a id="entry-buttongroup-text-size-xxl"></a>

Extra extra large

gap.xxl, margin.xxl, and padding.xxl use the xxl space token; text.size.xxl uses the xxl typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `buttongroup.text.size.xxs`

<a id="entry-buttongroup-text-size-xxs"></a>

Extra extra small

gap.xxs, margin.xxs, and padding.xxs use the xxs space token; text.size.xxs uses the xxs typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `buttongroup.buttonslot.text.mono`

<a id="entry-buttongroup-buttonslot-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family. These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

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

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `buttongroup.buttonslot.text.size.l`

<a id="entry-buttongroup-buttonslot-text-size-l"></a>

Large

gap.l, margin.l, and padding.l use the l space token; text.size.l uses the l typography size token; border.l sets only border width; shadow.l and shadow.primary.l set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `buttongroup.buttonslot.text.size.m`

<a id="entry-buttongroup-buttonslot-text-size-m"></a>

Medium

gap.m, margin.m, and padding.m use the m space token; text.size.m uses the m typography size token; border.m sets only border width; shadow.m and shadow.primary.m set box shadows; shadow.text.m and shadow.text.primary.m set text shadows; border.default sets a solid surface-default border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `buttongroup.buttonslot.text.size.s`

<a id="entry-buttongroup-buttonslot-text-size-s"></a>

Small

gap.s, margin.s, and padding.s use the s space token; text.size.s uses the s typography size token; border.s sets only border width; shadow.s and shadow.primary.s set box shadows; shadow.text.s and shadow.text.primary.s set text shadows; border.faint and border.muted set solid outline-role borders with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `buttongroup.buttonslot.text.size.xl`

<a id="entry-buttongroup-buttonslot-text-size-xl"></a>

Extra large

gap.xl, margin.xl, and padding.xl use the xl space token; text.size.xl uses the xl typography size token; border.xl sets only border width; shadow.xl and shadow.primary.xl set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `buttongroup.buttonslot.text.size.xs`

<a id="entry-buttongroup-buttonslot-text-size-xs"></a>

Extra small

gap.xs, margin.xs, and padding.xs use the xs space token; text.size.xs uses the xs typography size token; border.xs sets only border width; shadow.xs and shadow.primary.xs set box shadows; shadow.text.xs and shadow.text.primary.xs set text shadows; border.subtle sets a solid outline-subtle border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `buttongroup.buttonslot.text.size.3xl`

<a id="entry-buttongroup-buttonslot-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `buttongroup.buttonslot.text.size.4xl`

<a id="entry-buttongroup-buttonslot-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `buttongroup.buttonslot.text.size.xxl`

<a id="entry-buttongroup-buttonslot-text-size-xxl"></a>

Extra extra large

gap.xxl, margin.xxl, and padding.xxl use the xxl space token; text.size.xxl uses the xxl typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `buttongroup.buttonslot.text.size.xxs`

<a id="entry-buttongroup-buttonslot-text-size-xxs"></a>

Extra extra small

gap.xxs, margin.xxs, and padding.xxs use the xxs space token; text.size.xxs uses the xxs typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.
