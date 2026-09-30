# wrapper

<!-- Generated from native authoring; do not edit. -->

[中文](wrapper-style.zh.md)

`Styles.wrapper.*` -- generic container elements that compose layouts with children.

Wrapper inherits all container layout/grid basics plus `container.innershadow` and `container.childcount`.

---

## Variants

### `wrapper.vertical`

<a id="entry-wrapper-vertical"></a>

Vertical layout

Stack wrapper content vertically.

Adds vertical, switching the native wrapper flex direction to column.

Use layout.flex or a grid for more detailed placement constraints.

Arranges children in a vertical column layout instead of the default horizontal flow.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['wrapper.vertical'],
        components: [
            { type: 'label', cap: 'Item 1' },
            { type: 'label', cap: 'Item 2' },
            { type: 'label', cap: 'Item 3' }
        ]
    }
];
```

### `wrapper.wraplabel`

<a id="entry-wrapper-wraplabel"></a>

Label wrapper

Frame a wrapper group around its caption.

Adds wrap-label; group-role wrapper CSS draws the outline and uses the wrapper background behind caption/icon content.

Requires a group-styled wrapper with caption content.

Wraps children with a label that sits at the top or around the wrapper boundary.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        cap: 'Settings',
        styles: ['wrapper.wraplabel'],
        components: [
            { type: 'switch', cap: 'Enable notifications' },
            { type: 'switch', cap: 'Dark mode' }
        ]
    }
];
```

### `wrapper.dividelabel`

<a id="entry-wrapper-dividelabel"></a>

Labeled divider

Separate a wrapper caption from its content with a rule.

Adds divide-label; group-role wrapper CSS draws separator lines below the caption and positions the extra slot.

Requires a wrapper with group styling and caption content.

Shows a label with a visual divider line separating it from the content.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        cap: 'Account',
        styles: ['wrapper.dividelabel'],
        components: [
            { type: 'label', cap: 'Profile settings' },
            { type: 'label', cap: 'Security' }
        ]
    }
];
```

### `wrapper.buttonwrapper`

<a id="entry-wrapper-buttonwrapper"></a>

Button wrapper

Apply the legacy wrapper button grouping marker.

Adds buttonwrapper.

No dedicated native selector was found for this marker. Use semantic wrapper roles and explicit group/layout styles for a verified result; the marker does not create list semantics or selection behavior.

Legacy class marker without a dedicated native layout rule in this baseline. For an action bar, use an `actions` role wrapper and an explicit flex layout; handlers own the commands.

### `wrapper.pill`

<a id="entry-wrapper-pill"></a>

Pill-shaped button group

Apply the legacy wrapper pill grouping marker.

Adds pill-container; pill also requests render-position markers on resize.

No dedicated native selector was found for this marker. Use semantic wrapper roles and explicit group/layout styles for a verified result; the marker does not create list semantics or selection behavior.

Adds a legacy class and recalculates child render-position markers on resize. It does not implement selection or guarantee a pill appearance. Use a native radio button group for a single-selection segmented control, then choose its presentation.

### `wrapper.list`

<a id="entry-wrapper-list"></a>

List container

Apply the legacy wrapper list marker.

Adds list.

No dedicated native selector was found for this marker. Use semantic wrapper roles and explicit group/layout styles for a verified result; the marker does not create list semantics or selection behavior.

Legacy class marker; it does not create list semantics or bullet markers in this baseline. Use the list role for a semantic region and `element.list` for native document-item presentation.

### `wrapper.orderedList`

<a id="entry-wrapper-orderedlist"></a>

Ordered list container

Apply the legacy wrapper ordered list marker.

Adds ordered-list.

No dedicated native selector was found for this marker. Use semantic wrapper roles and explicit group/layout styles for a verified result; the marker does not create list semantics or selection behavior.

Legacy class marker; it does not automatically number children. Compose native `element.list` items with explicit order values when document numbering is required.

## `wrapper.grid`

<a id="entry-wrapper-grid"></a>

Grid

Configure grid-related arguments for the path-selected target.

Maps templateColumns, templateRows, autoColumns, autoRows and templateAreas to their CSS grid properties; gap stays gap, and area uses gridArea unless the owning path overrides its CSS key.

Set display:grid on the grid container separately, for example with css(display:grid). Use grid.area for explicit row/column placement of its items.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

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

## `wrapper.text`

<a id="entry-wrapper-text"></a>

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

## `wrapper.color`

<a id="entry-wrapper-color"></a>

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

## `wrapper.inline`

<a id="entry-wrapper-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `wrapper.layout`

<a id="entry-wrapper-layout"></a>

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
| `gap` | `numberOrString` | Gap<br>`{"cssKey":"gap"}` |
| `zIndex` | `number` | Layer order<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | Box sizing<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | Transform<br>`{"cssKey":"transform"}` |
| `transition` | `string` | Transition<br>`{"cssKey":"transition"}` |

## `wrapper.childcount`

<a id="entry-wrapper-childcount"></a>

Child count

Expose child-count state for container decoration.

On childchange, counts all direct element children, writes child-count and toggles jam-empty.

The count includes decorative/slotted children; it is not the number of application records and is not initialized by a separate mount callback.

## `wrapper.innershadow`

<a id="entry-wrapper-innershadow"></a>

Inner shadow

Give a container or wrapper an inset surface.

Applies an accent-derived border, a token border radius and an inset shadow.

## `wrapper.text.mono`

<a id="entry-wrapper-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family. These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `wrapper.color.accent`

<a id="entry-wrapper-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `wrapper.background.tint`

<a id="entry-wrapper-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `wrapper.text.size.l`

<a id="entry-wrapper-text-size-l"></a>

Large

gap.l, margin.l, and padding.l use the l space token; text.size.l uses the l typography size token; border.l sets only border width; shadow.l and shadow.primary.l set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `wrapper.text.size.m`

<a id="entry-wrapper-text-size-m"></a>

Medium

gap.m, margin.m, and padding.m use the m space token; text.size.m uses the m typography size token; border.m sets only border width; shadow.m and shadow.primary.m set box shadows; shadow.text.m and shadow.text.primary.m set text shadows; border.default sets a solid surface-default border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `wrapper.text.size.s`

<a id="entry-wrapper-text-size-s"></a>

Small

gap.s, margin.s, and padding.s use the s space token; text.size.s uses the s typography size token; border.s sets only border width; shadow.s and shadow.primary.s set box shadows; shadow.text.s and shadow.text.primary.s set text shadows; border.faint and border.muted set solid outline-role borders with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `wrapper.text.size.xl`

<a id="entry-wrapper-text-size-xl"></a>

Extra large

gap.xl, margin.xl, and padding.xl use the xl space token; text.size.xl uses the xl typography size token; border.xl sets only border width; shadow.xl and shadow.primary.xl set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `wrapper.text.size.xs`

<a id="entry-wrapper-text-size-xs"></a>

Extra small

gap.xs, margin.xs, and padding.xs use the xs space token; text.size.xs uses the xs typography size token; border.xs sets only border width; shadow.xs and shadow.primary.xs set box shadows; shadow.text.xs and shadow.text.primary.xs set text shadows; border.subtle sets a solid outline-subtle border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `wrapper.text.size.3xl`

<a id="entry-wrapper-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `wrapper.text.size.4xl`

<a id="entry-wrapper-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `wrapper.text.size.xxl`

<a id="entry-wrapper-text-size-xxl"></a>

Extra extra large

gap.xxl, margin.xxl, and padding.xxl use the xxl space token; text.size.xxl uses the xxl typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `wrapper.text.size.xxs`

<a id="entry-wrapper-text-size-xxs"></a>

Extra extra small

gap.xxs, margin.xxs, and padding.xxs use the xxs space token; text.size.xxs uses the xxs typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.
