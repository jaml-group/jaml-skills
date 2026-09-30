# group

<!-- Generated from native authoring; do not edit. -->

[中文](group.zh.md)

`Styles.group.*` — content presentation and layout presets.

---

## Variants

### `group.bento`

<a id="entry-group-bento"></a>

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

Bento-grid layout. Adds `.jam-bento-group` and styles its children from the active theme's `bento` component tokens. Explicit args override those values for one group.

The 1.4.0 runtime wrote `--jam-bento-broder-radius` for the radius override, while the native recipe consumed `--jam-bento-border-radius`; account for that compatibility difference when maintaining older themes.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['group.bento'],
        components: [
            { type: 'card', cap: 'Card 1' },
            { type: 'card', cap: 'Card 2' },
            { type: 'card', cap: 'Card 3' }
        ]
    }
];
```

### `group.gridline`

<a id="entry-group-gridline"></a>

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

Grid line separators between children. Adds `.jam-gridline-group` and recalculates child positions on resize. Explicit args override the active theme's `gridline` component tokens for one group.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['group.gridline(color:var(--jam-color-primary-subtle);width:2)'],
        components: [
            { type: 'label', cap: 'Item A' },
            { type: 'label', cap: 'Item B' },
            { type: 'label', cap: 'Item C' }
        ]
    },
    {
        type: 'container',
        styles: ['group.gridline'],
        components: [
            { type: 'label', cap: 'Default color' },
            { type: 'label', cap: 'Item 2' }
        ]
    }
];
```

### `group.stripy`

<a id="entry-group-stripy"></a>

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

Alternating odd/even child styling. Adds `.jam-stripy-group` and recalculates odd/even positions on resize. Explicit args override the active theme's `stripy` component tokens for one group.

The native recipe starts with zero gap, but the value is not forced with `!important`, so a caller-applied gap can override it.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['group.stripy'],
        components: [
            { type: 'label', cap: 'Row 1 (odd)' },
            { type: 'label', cap: 'Row 2 (even)' },
            { type: 'label', cap: 'Row 3 (odd)' },
            { type: 'label', cap: 'Row 4 (even)' }
        ]
    }
];
```

### `group.divider`

<a id="entry-group-divider"></a>

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

Inserts visible divider elements between existing children and keeps them synchronized as children are added or removed. Adds `.jam-divider-group`. Explicit visual args override the active theme's `divider` component tokens for one group.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['flex(direction:row;gap:0.75rem)', 'group.divider(vertical)'],
        components: [
            { type: 'label', cap: 'Clean design' },
            { type: 'button', cap: 'Submit' }
        ]
    }
];
```

`group.divider` replaces both the removed `group.divided` name and the removed `flex.seperator` variant.

## Built-in tile profiles

Jam-UI attaches group styles to two numbered tile/list profiles. Set the tile's native `variant` param to `1` for striping or `2` for dividers. Themes may replace either exact selector with another group style; see [Theme Stylesheets](../Theme/stylesheets.md#variant-selectors).

## Migration from `Styles.stylize`

`Styles.stylize.*` remains as a deprecated compatibility namespace. New code should use these mappings:

| Deprecated           | Replacement      |
| -------------------- | ---------------- |
| `stylize.bento`      | `group.bento`    |
| `stylize.gridline`   | `group.gridline` |
| `stylize.oddeven`    | `group.stripy`   |
| `stylize.minimalism` | `group.divider`  |

Markdown and JSON are no longer style plugins. Their renderers set the runtime profiles `stylize: 'markdown'` and `stylize: 'json'`; see [Theme Stylize](../Theme/stylize.md#renderer-profiles).

---

## Usage

```javascript jaml-playground
export default {
    type: 'container',
    styles: ['group.bento'],
    components: [
        { type: 'card', cap: 'Card 1' },
        { type: 'card', cap: 'Card 2' }
    ]
};
```
