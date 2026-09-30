# stylize

<!-- Generated from native authoring; do not edit. -->

[中文](stylize.zh.md)

## `stylize.bento`

<a id="entry-stylize-bento"></a>

Bento blocks

Give grouped children separate tile surfaces.

Adds the bento-group class and forwards padding, border, background and shadow variables to the group stylesheet.

Combine with a native grid or flex layout; this style supplies surfaces rather than data or navigation.

The current borderRadius assignment uses a misspelled variable; verify that override before depending on it.

Positional order: `padding` → `borderStyle` → `borderColor` → `borderRadius` → `backgroundColor` → `backgroundImage` → `boxShadow`.

| Argument | Type | Contract |
| --- | --- | --- |
| `padding` | `numberOrString` | Padding<br>Unit: `rem` |
| `borderStyle` | `string` | Border style<br>Options: `solid`, `dashed`, `dotted` |
| `borderColor` | `string` | Border color |
| `borderRadius` | `numberOrString` | Border radius<br>Unit: `rem` |
| `backgroundColor` | `string` | Background color |
| `backgroundImage` | `string` | Background image |
| `boxShadow` | `string` | Shadow |

## `stylize.oddeven`

<a id="entry-stylize-oddeven"></a>

Alternating odd and even items

Alternate surfaces across a rendered group.

Applies odd/even background variables and recomputes render-position markers on resize.

Use table.stripy for table cells; this preset decorates grouped children.

Positional order: `padding` → `borderRadius` → `odd` → `even`.

| Argument | Type | Contract |
| --- | --- | --- |
| `padding` | `numberOrString` | Padding<br>Unit: `rem` |
| `borderRadius` | `numberOrString` | Border radius<br>Unit: `rem` |
| `odd` | `string` | Odd |
| `even` | `string` | Even |

## `stylize.gridline`

<a id="entry-stylize-gridline"></a>

Grid lines

Draw a connected grid around grouped children.

Applies gridline variables and recomputes render-position markers on resize for inner and outer borders.

Requires laid-out child boxes; choose grid/flex placement separately.

Positional order: `padding` → `width` → `style` → `rowStyle` → `rowWidth` → `colWidth` → `colStyle` → `color` → `radius` → `backgroundColor` → `outerWidth` → `outerColor` → `outerRadius` → `outerStyle`.

| Argument | Type | Contract |
| --- | --- | --- |
| `padding` | `numberOrString` | Padding<br>Unit: `rem` |
| `width` | `numberOrString` | Width<br>Unit: `px` |
| `style` | `string` | Style<br>Options: `solid`, `dashed`, `dotted` |
| `rowStyle` | `string` | Row style<br>Options: `solid`, `dashed`, `dotted` |
| `rowWidth` | `numberOrString` | Row divider width<br>Unit: `px` |
| `colWidth` | `numberOrString` | Column<br>Unit: `px` |
| `colStyle` | `string` | Column style<br>Options: `solid`, `dashed`, `dotted` |
| `color` | `string` | Color |
| `radius` | `numberOrString` | Corner radius<br>Unit: `rem` |
| `backgroundColor` | `string` | Background color |
| `outerWidth` | `numberOrString` | Outer frame<br>Unit: `px` |
| `outerColor` | `string` | Outer frame color |
| `outerRadius` | `numberOrString` | Outer frame radius<br>Unit: `rem` |
| `outerStyle` | `string` | Outer frame style<br>Options: `solid`, `dashed`, `dotted` |

## `stylize.minimalism`

<a id="entry-stylize-minimalism"></a>

Divider

Separate direct group content with native dividers.

Maintains divider elements before eligible direct children, synchronizing additions/removals and direction changes. Layer and divider children are excluded.

Shared per-host ownership keeps one divider set; the last owner disconnects observation and destroys owned dividers.

Use group.gridline for drawn cell borders; divider creates actual child elements.

Positional order: `padding` → `direction` → `length` → `width` → `color` → `opacity`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `padding` | `numberOrString` | Not supplied | Padding<br>Unit: `rem` |
| `direction` | `string` | `horizontal` | Direction<br>Shorthand<br>Options: `horizontal`, `vertical` |
| `length` | `numberOrString` | Not supplied | Size |
| `width` | `numberOrString` | Not supplied | Width |
| `color` | `string` | Not supplied | Color |
| `opacity` | `number` | Not supplied | Opacity |
