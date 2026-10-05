# tree styles

<!-- Generated from native authoring; do not edit. -->

[中文](tree-style.zh.md)

`Styles.tree.*` styles the [tree element](../JAM-UI/tree.md). Trees use the table theme tokens and hide the table header by default.

## Variants

| Style | Description |
|---|---|
| `tree.stretchrow` | Stretch node rows |
| `tree.stripy` | Alternating node backgrounds |
| `tree.gridline` | Grid lines and outline |
| `tree.bento` | Spaced rounded rows |
| `tree.fixednodeheight` | Fixed-height node rows with virtual scrolling |
| `tree.hovermarker` | Hover outline |
| `tree.hoverhighlight` | Hover background |
| `tree.td.*` / `tree.tdslot.*` | Node-cell and body-slot styles |

These variants share arguments with their [table equivalents](./table-style.md); `fixednodeheight` corresponds to `table.fixedrowheight`.

```javascript jaml-playground
export default {
    type: 'tree-checkbox',
    styles: ['tree.stripy', 'tree.gridline', 'tree.fixednodeheight(height:2.5rem)'],
    data: [
        {
            id: 'plant',
            name: 'Plant',
            children: [
                { id: 'pump', name: 'Pump' },
                { id: 'valve', name: 'Valve' }
            ]
        }
    ]
};
```

## `tree.grid`

<a id="entry-tree-grid"></a>

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

## `tree.text`

<a id="entry-tree-text"></a>

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

## `tree.bento`

<a id="entry-tree-bento"></a>

Bento table

Separate table/tree cells with tile-like spacing.

Adds bento and writes margin and radius variables consumed by the native table styling.

The public argument is spelled borderRaidus in this version; preserve that spelling when calling it.

Positional order: `margin` → `borderRaidus`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `margin` | `numberOrString` | `var(--jam-space-xs)` | Margin<br>Unit: `rem` |
| `borderRaidus` | `numberOrString` | `var(--jam-border-radius-s)` | Corner radius<br>Unit: `rem` |

## `tree.color`

<a id="entry-tree-color"></a>

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

## `tree.lines`

<a id="entry-tree-lines"></a>

Positional order: `show`.

| Argument | Type | Default |
| --- | --- | --- |
| `show` | `boolean` | `true` |

## `tree.inline`

<a id="entry-tree-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `tree.stripy`

<a id="entry-tree-stripy"></a>

Zebra stripes

Apply alternating row surfaces to a table or tree.

Adds stripy and exposes independent odd/even cell background variables.

Positional order: `odd` → `even`.

| Argument | Type | Contract |
| --- | --- | --- |
| `odd` | `string` | Odd-row background |
| `even` | `string` | Even-row background |

## `tree.gridline`

<a id="entry-tree-gridline"></a>

Grid lines

Draw row/column borders around table or tree cells.

Applies gridline, neck treatment and separate inner/outer border variables through native table CSS.

Use bento for separated tiles or stripy for alternating row surfaces; this preset does not change the data model.

Positional order: `rowWidth` → `colWidth` → `color` → `outlineWidth` → `outlineColor` → `neck`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `rowWidth` | `numberOrString` | Not supplied | Row divider width<br>Unit: `px` |
| `colWidth` | `numberOrString` | Not supplied | Column<br>Unit: `px` |
| `color` | `string` | Not supplied | Color |
| `outlineWidth` | `numberOrString` | Not supplied | Outer frame<br>Unit: `px` |
| `outlineColor` | `string` | Not supplied | Outer frame color |
| `neck` | `string` | `small` | Connector neck<br>Options: `auto`, `small`, `none` |

## `tree.stretchrow`

<a id="entry-tree-stretchrow"></a>

Stretch rows

Stretch native table/tree rows within the body layout.

Adds stretch-row for the native table template’s row-sizing rule.

This is sizing, not fixed-height virtualization; choose fixedrowheight/fixednodeheight when virtualization is required.

## `tree.hovermarker`

<a id="entry-tree-hovermarker"></a>

Hover marker

Add a moving hover marker to a tree.

Tracks native cells and shows a horizontal axis, vertical axis or cell-frame locator; leaving clears the marker and hover coordinates.

Requires the native table/tree body and cell metadata.

Removal detaches hover listeners and removes the owned locator.

A visual hover marker does not select rows or persist a current cell.

Positional order: `type` → `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `type` | `string` | `row` | Marker type<br>Options: `row`, `column`, `td` |
| `size` | `number` | Not supplied | Inherited crosshair size in pixels; zero derives a size from target geometry. Tree hover markers use row/column arrows or a cell frame, whose native styles do not consume this corner-size setting. |
| `width` | `numberOrString` | `auto` | Cell-frame outline width. auto reads the target border width with a minimum of 2 pixels. Row and column arrow markers do not use this width setting. |
| `bias` | `number` | `0` | Locator edge offset in pixels relative to the target bounds. |
| `glow` | `number` | `0` | Locator glow blur radius in pixels. A value greater than zero enables the glow; zero disables it. |
| `radius` | `numberOrString` | `auto` | Locator corner radius; auto reads the target corner radii. |
| `delay` | `number` | `0` | Delay in milliseconds before updating the hover marker; a subsequent show cancels the pending delayed update. |
| `breathe` | `boolean` | `false` | Starts the inherited locator breathing timer when the marker updates. Its native breathing animation is implemented only for crosshair locators, so it does not animate this style’s row/column arrows or cell frame. |
| `container` | `any` | Not supplied | Requested locator container. This marker initializes its own table wrapper, which takes precedence over this argument. |
| `clipTarget` | `any` | Not supplied | Optional clipping target used when the locator has no built-in clipping target. Row and cell markers use the table body. |
| `easing` | `string` | Not supplied | Timing function used for locator movement and geometry transitions. |
| `duration` | `number` | Not supplied | Duration in milliseconds of locator movement and geometry transitions. |

## `tree.hoverhighlight`

<a id="entry-tree-hoverhighlight"></a>

Hover highlighting

Highlight the row under the pointer, optionally including its column.

Tracks native cell metadata into hoveringRow/hoveringCol and sets hover/active color variables; leaving the host clears the tracked position.

Use native table/tree cells carrying their row/column metadata.

This is hover feedback, not row selection or keyboard navigation.

Positional order: `color` → `active` → `overlay` → `column`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `color` | `string` | `hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 0.15), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 5), 0.025)` | Color<br>Shorthand |
| `active` | `string` | Not supplied | Active color |
| `overlay` | `boolean` | `true` | Overlay |
| `column` | `boolean` | `false` | Highlight the column too |

## `tree.fixednodeheight`

<a id="entry-tree-fixednodeheight"></a>

Fixed node height

Virtualize fixed-height tree rows.

Uses the native tree row provider and body scroll slot with SaigonScroll; reserves row height and can animate mounted cells. Expanded detail rows disable the fixed virtual path.

Requires a bounded body viewport and stable configured row height.

Use a supported animation name string or false; the current animation callback calls string methods on a truthy value. Variable-height details do not use the same fixed-row virtualization path.

Positional order: `scrollTarget` → `height` → `throttle` → `padding` → `getChildrenByRow` → `getRowNum` → `animation` → `easing` → `duration` → `tileduration` → `tilerandom` → `defaultDirection`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `scrollTarget` | `string` | Not supplied | Scroll target |
| `height` | `numberOrString` | `2.5` | Line height<br>Unit: `rem`<br>Shorthand |
| `throttle` | `number` | Not supplied | Throttle |
| `padding` | `number` | Not supplied | Overscan rows |
| `getChildrenByRow` | `function` | Not supplied | Get children for a row |
| `getRowNum` | `function` | Not supplied | Get row count |
| `animation` | `booleanOrString` | `fade-in-` | Animation |
| `easing` | `string` | `ease` | Easing<br>Options: `linear`, `ease`, `easeIn`, `easeOut`, `easeInOut`, `boing`, `urging`, `bouncing`, `decelerate`, `accelerate`, `smooth`, `sine`, `sineIn`, `sineOut`, `sineInOut`, `crisp`, `overshoot`, `runup`, `quartOut`, `velvet`, `gear`, `plateau` |
| `duration` | `number` | `400` | Animation duration<br>Unit: `ms` |
| `tileduration` | `number` | `0` | Tile animation duration |
| `tilerandom` | `boolean` | `false` | Randomize tiles |
| `defaultDirection` | `string` | `up` | Default direction<br>Options: `up`, `down`, `right`, `left` |

## `tree.td.text`

<a id="entry-tree-td-text"></a>

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

## `tree.td.color`

<a id="entry-tree-td-color"></a>

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

## `tree.icon.text`

<a id="entry-tree-icon-text"></a>

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

## `tree.td.inline`

<a id="entry-tree-td-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `tree.text.mono`

<a id="entry-tree-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family. These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `tree.tdslot.text`

<a id="entry-tree-tdslot-text"></a>

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

## `tree.color.accent`

<a id="entry-tree-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `tree.tdslot.color`

<a id="entry-tree-tdslot-color"></a>

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

## `tree.tdslot.inline`

<a id="entry-tree-tdslot-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `tree.tdslot.layout`

<a id="entry-tree-tdslot-layout"></a>

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

## `tree.capslot.layout`

<a id="entry-tree-capslot-layout"></a>

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

## `tree.background.tint`

<a id="entry-tree-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `tree.iconslot.layout`

<a id="entry-tree-iconslot-layout"></a>

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

## `tree.extraslot.layout`

<a id="entry-tree-extraslot-layout"></a>

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

## `tree.labelslot.layout`

<a id="entry-tree-labelslot-layout"></a>

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

## `tree.text.size.l`

<a id="entry-tree-text-size-l"></a>

Large

gap.l, margin.l, and padding.l use the l space token; text.size.l uses the l typography size token; border.l sets only border width; shadow.l and shadow.primary.l set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `tree.text.size.m`

<a id="entry-tree-text-size-m"></a>

Medium

gap.m, margin.m, and padding.m use the m space token; text.size.m uses the m typography size token; border.m sets only border width; shadow.m and shadow.primary.m set box shadows; shadow.text.m and shadow.text.primary.m set text shadows; border.default sets a solid surface-default border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `tree.text.size.s`

<a id="entry-tree-text-size-s"></a>

Small

gap.s, margin.s, and padding.s use the s space token; text.size.s uses the s typography size token; border.s sets only border width; shadow.s and shadow.primary.s set box shadows; shadow.text.s and shadow.text.primary.s set text shadows; border.faint and border.muted set solid outline-role borders with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `tree.td.text.mono`

<a id="entry-tree-td-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family. These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `tree.text.size.xl`

<a id="entry-tree-text-size-xl"></a>

Extra large

gap.xl, margin.xl, and padding.xl use the xl space token; text.size.xl uses the xl typography size token; border.xl sets only border width; shadow.xl and shadow.primary.xl set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `tree.text.size.xs`

<a id="entry-tree-text-size-xs"></a>

Extra small

gap.xs, margin.xs, and padding.xs use the xs space token; text.size.xs uses the xs typography size token; border.xs sets only border width; shadow.xs and shadow.primary.xs set box shadows; shadow.text.xs and shadow.text.primary.xs set text shadows; border.subtle sets a solid outline-subtle border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `tree.text.size.3xl`

<a id="entry-tree-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `tree.text.size.4xl`

<a id="entry-tree-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `tree.text.size.xxl`

<a id="entry-tree-text-size-xxl"></a>

Extra extra large

gap.xxl, margin.xxl, and padding.xxl use the xxl space token; text.size.xxl uses the xxl typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `tree.text.size.xxs`

<a id="entry-tree-text-size-xxs"></a>

Extra extra small

gap.xxs, margin.xxs, and padding.xxs use the xxs space token; text.size.xxs uses the xxs typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `tree.td.color.accent`

<a id="entry-tree-td-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `tree.tdslot.text.mono`

<a id="entry-tree-tdslot-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family. These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `tree.td.background.tint`

<a id="entry-tree-td-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `tree.tdslot.color.accent`

<a id="entry-tree-tdslot-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `tree.tdslot.background.tint`

<a id="entry-tree-tdslot-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `tree.td.text.size.l`

<a id="entry-tree-td-text-size-l"></a>

Large

gap.l, margin.l, and padding.l use the l space token; text.size.l uses the l typography size token; border.l sets only border width; shadow.l and shadow.primary.l set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `tree.td.text.size.m`

<a id="entry-tree-td-text-size-m"></a>

Medium

gap.m, margin.m, and padding.m use the m space token; text.size.m uses the m typography size token; border.m sets only border width; shadow.m and shadow.primary.m set box shadows; shadow.text.m and shadow.text.primary.m set text shadows; border.default sets a solid surface-default border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `tree.td.text.size.s`

<a id="entry-tree-td-text-size-s"></a>

Small

gap.s, margin.s, and padding.s use the s space token; text.size.s uses the s typography size token; border.s sets only border width; shadow.s and shadow.primary.s set box shadows; shadow.text.s and shadow.text.primary.s set text shadows; border.faint and border.muted set solid outline-role borders with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `tree.td.text.size.xl`

<a id="entry-tree-td-text-size-xl"></a>

Extra large

gap.xl, margin.xl, and padding.xl use the xl space token; text.size.xl uses the xl typography size token; border.xl sets only border width; shadow.xl and shadow.primary.xl set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `tree.td.text.size.xs`

<a id="entry-tree-td-text-size-xs"></a>

Extra small

gap.xs, margin.xs, and padding.xs use the xs space token; text.size.xs uses the xs typography size token; border.xs sets only border width; shadow.xs and shadow.primary.xs set box shadows; shadow.text.xs and shadow.text.primary.xs set text shadows; border.subtle sets a solid outline-subtle border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `tree.td.text.size.3xl`

<a id="entry-tree-td-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `tree.td.text.size.4xl`

<a id="entry-tree-td-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `tree.td.text.size.xxl`

<a id="entry-tree-td-text-size-xxl"></a>

Extra extra large

gap.xxl, margin.xxl, and padding.xxl use the xxl space token; text.size.xxl uses the xxl typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `tree.td.text.size.xxs`

<a id="entry-tree-td-text-size-xxs"></a>

Extra extra small

gap.xxs, margin.xxs, and padding.xxs use the xxs space token; text.size.xxs uses the xxs typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `tree.tdslot.text.size.l`

<a id="entry-tree-tdslot-text-size-l"></a>

Large

gap.l, margin.l, and padding.l use the l space token; text.size.l uses the l typography size token; border.l sets only border width; shadow.l and shadow.primary.l set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `tree.tdslot.text.size.m`

<a id="entry-tree-tdslot-text-size-m"></a>

Medium

gap.m, margin.m, and padding.m use the m space token; text.size.m uses the m typography size token; border.m sets only border width; shadow.m and shadow.primary.m set box shadows; shadow.text.m and shadow.text.primary.m set text shadows; border.default sets a solid surface-default border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `tree.tdslot.text.size.s`

<a id="entry-tree-tdslot-text-size-s"></a>

Small

gap.s, margin.s, and padding.s use the s space token; text.size.s uses the s typography size token; border.s sets only border width; shadow.s and shadow.primary.s set box shadows; shadow.text.s and shadow.text.primary.s set text shadows; border.faint and border.muted set solid outline-role borders with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `tree.tdslot.text.size.xl`

<a id="entry-tree-tdslot-text-size-xl"></a>

Extra large

gap.xl, margin.xl, and padding.xl use the xl space token; text.size.xl uses the xl typography size token; border.xl sets only border width; shadow.xl and shadow.primary.xl set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `tree.tdslot.text.size.xs`

<a id="entry-tree-tdslot-text-size-xs"></a>

Extra small

gap.xs, margin.xs, and padding.xs use the xs space token; text.size.xs uses the xs typography size token; border.xs sets only border width; shadow.xs and shadow.primary.xs set box shadows; shadow.text.xs and shadow.text.primary.xs set text shadows; border.subtle sets a solid outline-subtle border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `tree.tdslot.text.size.3xl`

<a id="entry-tree-tdslot-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `tree.tdslot.text.size.4xl`

<a id="entry-tree-tdslot-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `tree.tdslot.text.size.xxl`

<a id="entry-tree-tdslot-text-size-xxl"></a>

Extra extra large

gap.xxl, margin.xxl, and padding.xxl use the xxl space token; text.size.xxl uses the xxl typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `tree.tdslot.text.size.xxs`

<a id="entry-tree-tdslot-text-size-xxs"></a>

Extra extra small

gap.xxs, margin.xxs, and padding.xxs use the xxs space token; text.size.xxs uses the xxs typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.
