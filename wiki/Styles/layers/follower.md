# layer.follower

`Styles.layer.follower.*` — cursor-following decorative layer elements. Uses `MelonMove` for smooth trailing motion. Each variant adds a `<div class="outer"><div class="inner"></div></div>` to the layer slot.

---

## Common args

All follower variants share these base args:

| Arg | Type | Description | Notes |
|---|---|---|---|
| `zIndex` | `number` | Stacking order | Default: `0` |
| `contain` | `boolean` | Constrain movement within the host | Default: `false` |
| `offset` | `number \| string` | Offset from the host edge | Unit: `rem`. Default: `0` |
| `size` | `number \| string` | Inner element size | Unit: `rem`. Default: `20` |
| `duration` | `number \| string` | CSS transition duration | Unit: `ms`. Default: random 300–600 |
| `reverse` | `boolean` | Reverse the follow direction | Default: `false` |
| `speed` | `number` | Follow speed multiplier | Default: `1` |
| `follow` | `boolean` | Enable cursor following | Default: `false` |
| `position` | `string` | Origin position | Default: `'top-left'` |

---

## Variants

### `follower.spotlight`

A spotlight/glow effect that follows the cursor inside the host.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `opacity` | `number` | Spotlight opacity | Default: `0.25` |
| `duration` | `number \| string` | Transition duration | Default: `0` |

```json jaml-playground
[
    {
        "type": "wrapper",
        "cap": "Spotlight",
        "styles": ["layer.follower.spotlight(follow:true;size:30)", "css(position:relative;width:10rem;height:10rem)"]
    }
]
```

### `follower.edge`

A glowing edge/rim effect that follows the cursor. The inner element fills a percentage of the host.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `size` | `number \| string` | Inner element size | Default: `'50%'` |
| `width` | `number \| string` | Glow edge width | Unit: `rem`. Default: `0.25` |
| `radius` | `number \| string` | Border radius | Unit: `rem`. Default: `0.25` |

```json jaml-playground
[
    {
        "type": "wrapper",
        "cap": "Golden Edge",
        "styles": ["layer.follower.edge(follow:true)", "css(position:relative;width:10rem;height:10rem)"]
    }
]
```

### `follower.shadow`

A cursor-reactive shadow that shifts opposite to the cursor direction.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `zIndex` | `number` | Stacking order | Default: `-1` (behind content) |
| `reverse` | `boolean` | Reverse direction | Default: `true` |
| `speed` | `number` | Follow speed | Default: `0.05` (slow) |
| `color` | `string` | Shadow color | Default: `hsla(0, 0%, 0%, 0.2)` |
| `offsetX` | `number \| string` | Horizontal shadow offset | Unit: `rem`. Default: `0` |
| `offsetY` | `number \| string` | Vertical shadow offset | Unit: `rem`. Default: `0.5` |
| `blur` | `number \| string` | Shadow blur radius | Unit: `px`. Default: `2` |

```json jaml-playground
[
    {
        "type": "wrapper",
        "cap": "Shadow",
        "styles": ["layer.follower.shadow(follow:true)", "css(position:relative;width:10rem;height:10rem)"]
    }
]
```
