# common.icon

<!-- Generated from native authoring; do not edit. -->

[中文](icon.zh.md)

`Styles.icon.*` -- icon customization using Font Awesome, emoji, or other icon sets.

---

## Common arguments

<a id="common-args-icon-solid"></a>

Positional order: `color` → `strokeWidth` → `strokeColor` → `size`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `color` | `string` | `hsl(var(--jam-ac-h), var(--jam-ac-s), calc(var(--jam-ac-l) + 10%))` | Color<br>Shorthand |
| `strokeWidth` | `string` | `0.0625rem` | Stroke |
| `strokeColor` | `string` | `hsl(0, 0%, calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 20))` | Stroke color |
| `size` | `string` | Not supplied | Size |

## Variants

### `icon.solid`

<a id="entry-icon-solid"></a>

Solid

Render an icon using the solid treatment.

On iconslotchange and initial application, replaces a single-text icon node with an i element carrying the requested font/shape classes and style variables; restores saved text when removed.

Requires a native icon slot with simple text content. Font-based variants require the corresponding icon font/assets.

Existing complex icon markup is left untouched; the style does not download missing icon assets.

Positional order: `color` → `strokeWidth` → `strokeColor` → `size`.

Common arguments: [icon.solid](#common-args-icon-solid).

Customizes the icon appearance on an element with an icon slot.

`icon` is a style namespace; select a rendering style such as `icon.solid` or `icon.emoji`.

```javascript jaml-playground
export default [
    {
        type: 'label',
        icon: 'star',
        cap: 'Starred',
        styles: ['icon.solid(size:1.5rem;color:gold)']
    }
];
```

### `emoji`

<a id="entry-icon-emoji"></a>

Emoji

Render an icon using the emoji treatment.

On iconslotchange and initial application, replaces a single-text icon node with an i element carrying the requested font/shape classes and style variables; restores saved text when removed.

Requires a native icon slot with simple text content. Font-based variants require the corresponding icon font/assets.

Existing complex icon markup is left untouched; the style does not download missing icon assets.

Positional order: `color` → `strokeWidth` → `strokeColor` → `size`.

Common arguments: [icon.solid](#common-args-icon-solid).

Renders the icon as an emoji character. Same args as `icon.solid`.

### `light`

<a id="entry-icon-light"></a>

Light

Render an icon using the light treatment.

On iconslotchange and initial application, replaces a single-text icon node with an i element carrying the requested font/shape classes and style variables; restores saved text when removed.

Requires a native icon slot with simple text content. Font-based variants require the corresponding icon font/assets.

Existing complex icon markup is left untouched; the style does not download missing icon assets.

Positional order: `color` → `strokeWidth` → `strokeColor` → `size`.

Common arguments: [icon.solid](#common-args-icon-solid).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `strokeWidth` | `string` | `0px` | Stroke |

Thin icon style using Font Awesome Light (fal). Same args as `icon.solid` but `strokeWidth` defaults to `0px`.

### `regular`

<a id="entry-icon-regular"></a>

Regular

Render an icon using the regular treatment.

On iconslotchange and initial application, replaces a single-text icon node with an i element carrying the requested font/shape classes and style variables; restores saved text when removed.

Requires a native icon slot with simple text content. Font-based variants require the corresponding icon font/assets.

Existing complex icon markup is left untouched; the style does not download missing icon assets.

Positional order: `color` → `strokeWidth` → `strokeColor` → `size`.

Common arguments: [icon.solid](#common-args-icon-solid).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `strokeWidth` | `string` | `0px` | Stroke |

Regular icon style using Font Awesome Regular (far). Same args as `icon.solid` but `strokeWidth` defaults to `0px`.

### `duotone`

<a id="entry-icon-duotone"></a>

Duotone

Render an icon using the duotone treatment.

On iconslotchange and initial application, replaces a single-text icon node with an i element carrying the requested font/shape classes and style variables; restores saved text when removed.

Requires a native icon slot with simple text content. Font-based variants require the corresponding icon font/assets.

Existing complex icon markup is left untouched; the style does not download missing icon assets.

Positional order: `color` → `strokeWidth` → `strokeColor` → `size` → `color2`.

Common arguments: [icon.solid](#common-args-icon-solid).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `color2` | `string` | `hsl(0, 0%, calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 44))` | Secondary color |

Dual-tone icon style using Font Awesome Duotone (fad). Same args as `icon.solid`, plus:

### `solid`

Solid icon style using Font Awesome Solid (fas). Same args as `icon.solid`.

### `brand`

<a id="entry-icon-brand"></a>

Brand

Render an icon using the brand treatment.

On iconslotchange and initial application, replaces a single-text icon node with an i element carrying the requested font/shape classes and style variables; restores saved text when removed.

Requires a native icon slot with simple text content. Font-based variants require the corresponding icon font/assets.

Existing complex icon markup is left untouched; the style does not download missing icon assets.

Positional order: `color` → `strokeWidth` → `strokeColor` → `size`.

Common arguments: [icon.solid](#common-args-icon-solid).

Brand icon style using Font Awesome Brand (fab). Same args as `icon.solid`.

### `chars`

<a id="entry-icon-chars"></a>

Character

Render an icon using the chars treatment.

On iconslotchange and initial application, replaces a single-text icon node with an i element carrying the requested font/shape classes and style variables; restores saved text when removed.

Requires a native icon slot with simple text content. Font-based variants require the corresponding icon font/assets.

Existing complex icon markup is left untouched; the style does not download missing icon assets.

Positional order: `color` → `strokeWidth` → `strokeColor` → `size`.

Common arguments: [icon.solid](#common-args-icon-solid).

Renders icon text as plain characters instead of converting it to a Font Awesome class. Same args as `icon.solid`.

### `withbg`

<a id="entry-icon-withbg"></a>

With background

Add a background to an existing rendered icon.

Finds the first i element in the icon slot and applies background variables plus its decoration class; removes those additions on unplug.

Compose after an icon renderer that creates the i element; this style does not create the icon itself.

Positional order: `radius` → `bg`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `radius` | `string` | `0.55em` | Corner radius |
| `bg` | `string` | `radial-gradient(hsla(0,0%,100%,0.33), hsla(0,0%,0%,0.15)) 50% 100% / 300% 200% hsl(var(--jam-ac-h), var(--jam-ac-s), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 38))` | Background color |

Icon with a background behind it.

### `withborder`

<a id="entry-icon-withborder"></a>

With border

Add a border to an existing rendered icon.

Finds the first i element in the icon slot and applies border variables plus its decoration class; removes those additions on unplug.

Compose after an icon renderer that creates the i element; this style does not create the icon itself.

Positional order: `radius` → `borderWidth` → `borderColor`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `radius` | `string` | `1em` | Corner radius |
| `borderWidth` | `string` | `0.125rem` | Border width |
| `borderColor` | `string` | `currentColor` | Border color |

Icon with a border around it.

### `bar`

<a id="entry-icon-bar"></a>

Bar

Use a simple bar shape in the icon slot.

Adds a shaped-icon host class and appends a span with the bar icon class into slot icon.

Use when a geometric marker is sufficient; supply semantic text through the host caption or accessible label.

Creates a shaped icon bar by inserting a `span.jam-icon-bar` into the icon slot.

### `dot`

<a id="entry-icon-dot"></a>

Dot

Use a simple dot shape in the icon slot.

Adds a shaped-icon host class and appends a span with the dot icon class into slot icon.

Use when a geometric marker is sufficient; supply semantic text through the host caption or accessible label.

Creates a shaped icon dot by inserting a `span.jam-icon-dot` into the icon slot.

### `square`

<a id="entry-icon-square"></a>

Square

Use a simple square shape in the icon slot.

Adds a shaped-icon host class and appends a span with the square icon class into slot icon.

Use when a geometric marker is sufficient; supply semantic text through the host caption or accessible label.

Creates a shaped square icon by inserting a `span.jam-icon-square` into the icon slot. The square is `0.875em` on each side and uses the theme's extra-small border radius. No args.

### `arrow`

<a id="entry-icon-arrow"></a>

Arrow

Show a compact directional icon driven by value or state.

Appends a shaped arrow. Numeric input values choose up/down on valuechange; other hosts use stateDirections on statechange.

autoDirection is declared but does not select the branch: host type does. The callback event name is not saved for cleanup, so repeated style replacement may retain listeners.

Positional order: `direction` → `autoDirection` → `stateDirections`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `direction` | `string` | `up` | Direction |
| `autoDirection` | `string` | `value` | Automatic direction<br>Options: `value`, `state` |
| `stateDirections` | `dictionary` | `{"expanded":"down","default":"right"}` | Direction by state |

Creates a shaped arrow icon. Numeric input value changes point it down for negative values and up otherwise. Other elements use their `state` to choose a direction.



## `icon.text`

<a id="entry-icon-text"></a>

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

## `icon.color`

<a id="entry-icon-color"></a>

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

## `icon.inline`

<a id="entry-icon-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `icon.text.mono`

<a id="entry-icon-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family. These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `icon.color.accent`

<a id="entry-icon-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `icon.background.tint`

<a id="entry-icon-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `icon.text.size.l`

<a id="entry-icon-text-size-l"></a>

Large

gap.l, margin.l, and padding.l use the l space token; text.size.l uses the l typography size token; border.l sets only border width; shadow.l and shadow.primary.l set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `icon.text.size.m`

<a id="entry-icon-text-size-m"></a>

Medium

gap.m, margin.m, and padding.m use the m space token; text.size.m uses the m typography size token; border.m sets only border width; shadow.m and shadow.primary.m set box shadows; shadow.text.m and shadow.text.primary.m set text shadows; border.default sets a solid surface-default border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `icon.text.size.s`

<a id="entry-icon-text-size-s"></a>

Small

gap.s, margin.s, and padding.s use the s space token; text.size.s uses the s typography size token; border.s sets only border width; shadow.s and shadow.primary.s set box shadows; shadow.text.s and shadow.text.primary.s set text shadows; border.faint and border.muted set solid outline-role borders with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `icon.text.size.xl`

<a id="entry-icon-text-size-xl"></a>

Extra large

gap.xl, margin.xl, and padding.xl use the xl space token; text.size.xl uses the xl typography size token; border.xl sets only border width; shadow.xl and shadow.primary.xl set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `icon.text.size.xs`

<a id="entry-icon-text-size-xs"></a>

Extra small

gap.xs, margin.xs, and padding.xs use the xs space token; text.size.xs uses the xs typography size token; border.xs sets only border width; shadow.xs and shadow.primary.xs set box shadows; shadow.text.xs and shadow.text.primary.xs set text shadows; border.subtle sets a solid outline-subtle border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `icon.text.size.3xl`

<a id="entry-icon-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `icon.text.size.4xl`

<a id="entry-icon-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `icon.text.size.xxl`

<a id="entry-icon-text-size-xxl"></a>

Extra extra large

gap.xxl, margin.xxl, and padding.xxl use the xxl space token; text.size.xxl uses the xxl typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `icon.text.size.xxs`

<a id="entry-icon-text-size-xxs"></a>

Extra extra small

gap.xxs, margin.xxs, and padding.xxs use the xxs space token; text.size.xxs uses the xxs typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.
