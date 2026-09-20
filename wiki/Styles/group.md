# group

`Styles.group.*` — content presentation and layout presets.

---

## Variants

### `group.bento`
Bento-grid layout. Adds `.jam-bento-group` and styles its children from the active theme's `bento` component tokens. Explicit args override those values for one group.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `padding` | `number \| string` | Child padding | Numbers use `rem`; defaults to `Tokens.cmpt.bento.padding` |
| `borderStyle` | `string` | Child border style | Options: `solid`, `dashed`, `dotted`; defaults to `Tokens.cmpt.bento.borderStyle` |
| `borderColor` | `string` | Child border color | Defaults to `Tokens.cmpt.bento.borderColor` |
| `borderRadius` | `number \| string` | Child border radius override | Numbers use `rem`; the 1.4.0 runtime writes `--jam-bento-broder-radius`, while the native recipe consumes the theme's `--jam-bento-border-radius` |
| `backgroundColor` | `string` | Child background color | Defaults to `Tokens.cmpt.bento.backgroundColor` |
| `backgroundImage` | `string` | Child background image | Defaults to `Tokens.cmpt.bento.backgroundImage` |
| `boxShadow` | `string` | Child box shadow | Defaults to `Tokens.cmpt.bento.boxShadow` |

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["group.bento"],
        "components": [
            { "type": "card", "cap": "Card 1" },
            { "type": "card", "cap": "Card 2" },
            { "type": "card", "cap": "Card 3" }
        ]
    }
]
```

### `group.gridline`
Grid line separators between children. Adds `.jam-gridline-group` and recalculates child positions on resize. Explicit args override the active theme's `gridline` component tokens for one group.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `padding` | `number \| string` | Child padding | Numbers use `rem`; defaults to `Tokens.cmpt.gridline.padding` |
| `width` | `number \| string` | Shared row and column line width | Numbers use `px`; defaults to `Tokens.cmpt.gridline.width` |
| `style` | `string` | Shared row and column line style | Options: `solid`, `dashed`, `dotted`; defaults to `Tokens.cmpt.gridline.style` |
| `rowWidth` | `number \| string` | Horizontal line width | Numbers use `px`; falls back to `width` |
| `rowStyle` | `string` | Horizontal line style | Options: `solid`, `dashed`, `dotted`; falls back to `style` |
| `colWidth` | `number \| string` | Vertical line width | Numbers use `px`; falls back to `width` |
| `colStyle` | `string` | Vertical line style | Options: `solid`, `dashed`, `dotted`; falls back to `style` |
| `color` | `string` | Shared inner and outer line color | Defaults to `Tokens.cmpt.gridline.color` |
| `radius` | `number \| string` | Child border radius | Numbers use `rem`; defaults to `Tokens.cmpt.gridline.radius` |
| `backgroundColor` | `string` | Child background color | Defaults to `Tokens.cmpt.gridline.backgroundColor` |
| `outerWidth` | `number \| string` | Outer border width | Numbers use `px`; falls back to `width` |
| `outerColor` | `string` | Outer border color | Falls back to `color` |
| `outerRadius` | `number \| string` | Outer border radius | Numbers use `rem`; defaults to `Tokens.cmpt.gridline.outerRadius` |
| `outerStyle` | `string` | Outer border style | Options: `solid`, `dashed`, `dotted`; falls back to `style` |

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["group.gridline(color:var(--jam-color-primary-subtle);width:2)"],
        "components": [
            { "type": "label", "cap": "Item A" },
            { "type": "label", "cap": "Item B" },
            { "type": "label", "cap": "Item C" }
        ]
    },
    {
        "type": "container",
        "styles": ["group.gridline"],
        "components": [
            { "type": "label", "cap": "Default color" },
            { "type": "label", "cap": "Item 2" }
        ]
    }
]
```

### `group.stripy`
Alternating odd/even child styling. Adds `.jam-stripy-group` and recalculates odd/even positions on resize. Explicit args override the active theme's `stripy` component tokens for one group.

The native recipe starts with zero gap, but the value is not forced with `!important`, so a caller-applied gap can override it.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `padding` | `number \| string` | Child padding | Numbers use `rem`; defaults to `Tokens.cmpt.stripy.padding` |
| `borderRadius` | `number \| string` | Radius applied to the outer children | Numbers use `rem`; defaults to `Tokens.cmpt.stripy.borderRadius` |
| `odd` | `string` | Odd-child background color | Defaults to `Tokens.cmpt.stripy.odd.backgroundColor` |
| `even` | `string` | Even-child background color | Defaults to `Tokens.cmpt.stripy.even.backgroundColor` |

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["group.stripy"],
        "components": [
            { "type": "label", "cap": "Row 1 (odd)" },
            { "type": "label", "cap": "Row 2 (even)" },
            { "type": "label", "cap": "Row 3 (odd)" },
            { "type": "label", "cap": "Row 4 (even)" }
        ]
    }
]
```

### `group.divider`
Inserts visible divider elements between existing children and keeps them synchronized as children are added or removed. Adds `.jam-divider-group`. Explicit visual args override the active theme's `divider` component tokens for one group.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `padding` | `number \| string` | Child padding | Numbers use `rem`; defaults to `Tokens.cmpt.divider.padding` |
| `direction` | `string` | Divider orientation | Default: `horizontal`; options: `horizontal`, `vertical`; shorthand |
| `length` | `number \| string` | Divider length | Native fallback: `60%` vertically or `calc(100% - var(--jam-space-s))` horizontally |
| `width` | `number \| string` | Divider stroke width | Defaults to `Tokens.cmpt.divider.width` |
| `color` | `string` | Divider color | Defaults to `Tokens.cmpt.divider.color` |
| `opacity` | `number` | Divider opacity | Defaults to `Tokens.cmpt.divider.opacity` |

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["flex(direction:row;gap:0.75rem)", "group.divider(vertical)"],
        "components": [
            { "type": "label", "cap": "Clean design" },
            { "type": "button", "cap": "Submit" }
        ]
    }
]
```

`group.divider` replaces both the removed `group.divided` name and the removed `flex.seperator` variant.

## Built-in tile profiles

Jam-UI attaches group styles to two numbered tile/list profiles. Set the tile's native `variant` param to `1` for striping or `2` for dividers. Themes may replace either exact selector with another group style; see [Theme Stylesheets](../Theme/stylesheets.md#variant-selectors).

## Migration from `Styles.stylize`

`Styles.stylize.*` remains as a deprecated compatibility namespace. New code should use these mappings:

| Deprecated | Replacement |
|---|---|
| `stylize.bento` | `group.bento` |
| `stylize.gridline` | `group.gridline` |
| `stylize.oddeven` | `group.stripy` |
| `stylize.minimalism` | `group.divider` |

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
}
```
