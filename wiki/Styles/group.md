# group

`Styles.group.*` — content presentation and layout presets.

---

## Variants

### `group.bento`

Bento-grid layout. Adds `.jam-bento-group` and styles its children from the active theme's `bento` component tokens. Explicit args override those values for one group.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style group.bento`.

The 1.4.0 runtime wrote `--jam-bento-broder-radius` for the radius override, while the native recipe consumed `--jam-bento-border-radius`; account for that compatibility difference when maintaining older themes.

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style group.gridline`.

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style group.stripy`.

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style group.divider`.

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
}
```
