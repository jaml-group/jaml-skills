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

Legacy class marker without native wrapper styling. For an application collection, use `stylize: "list"` on its container or wrapper, `stylize: "item"` on each native peer, and an explicit layout. `buildFor` repeats data-driven items. Document bullets belong in Markdown; `element.list` is reserved for its renderer.

### `wrapper.orderedList`

<a id="entry-wrapper-orderedlist"></a>

Ordered list container

Apply the legacy wrapper ordered list marker.

Adds ordered-list.

No dedicated native selector was found for this marker. Use semantic wrapper roles and explicit group/layout styles for a verified result; the marker does not create list semantics or selection behavior.

Legacy class marker; it does not automatically number children. Use Markdown for a numbered document list. For an application collection, use list/item roles and keep ordering in its data. `element.list` is reserved for the Markdown renderer.

## `wrapper.grid`

<a id="entry-wrapper-grid"></a>

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

## `wrapper.text`

<a id="entry-wrapper-text"></a>

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

## `wrapper.color`

<a id="entry-wrapper-color"></a>

Notes: [`color`](common/color.md#entry-color).

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

The root text.mono extension instead uses the generic monospace family.

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

## `wrapper.text.size.l`

<a id="entry-wrapper-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `wrapper.text.size.m`

<a id="entry-wrapper-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `wrapper.text.size.s`

<a id="entry-wrapper-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `wrapper.text.size.xl`

<a id="entry-wrapper-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `wrapper.text.size.xs`

<a id="entry-wrapper-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `wrapper.text.size.3xl`

<a id="entry-wrapper-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `wrapper.text.size.4xl`

<a id="entry-wrapper-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `wrapper.text.size.xxl`

<a id="entry-wrapper-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `wrapper.text.size.xxs`

<a id="entry-wrapper-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.
