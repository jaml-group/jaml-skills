# layer.glare

`Styles.layer.glare.*` — light glare and reflection layer effects.

---

## Variants

### `glare.spot`
Spotlight glare effect. A bright spot that follows the mouse cursor position.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `size` | `number \| string` | Glare size in px | Calculated from element diagonal if not set |
| `position` | `string` | Glare position | Options: `'top'`, `'bottom'`. Default: `'top'` |
| `glareDepth` | `number` | Depth factor for 3D parallax | Default: `40` |

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Spot glare",
        "styles": ["layer.glare.spot(position:top;glareDepth:30)", "css(padding:2rem)"]
    },
    {
        "type": "card",
        "cap": "Bottom spot",
        "styles": ["layer.glare.spot(position:bottom;glareDepth:50)", "css(padding:2rem)"]
    }
]
```

### `glare.reflect`
Linear or radial reflection effect.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `type` | `string` | Reflection type | Options: `'linear'`, `'radial'`. Default: `'linear'` |
| `size` | `number \| string` | Reflection size | Calculated from element diagonal if not set |
| `position` | `string` | Reflection position | Options: `'top'`, `'bottom'`. Default: `'top'` |
| `glareDepth` | `number` | Depth factor | Default: `5` |

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Reflect",
        "styles": ["layer.glare.reflect(type:linear;position:top)", "css(padding:2rem)"]
    },
    {
        "type": "card",
        "cap": "Radial reflect",
        "styles": ["layer.glare.reflect(type:radial;position:bottom)", "css(padding:2rem)"]
    }
]
```

### `glare.gloss`
Gloss/sheen effect. Uses a comet spinner internally to create a sweeping gloss highlight.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `size` | `number \| string` | Gloss size | Calculated from element diagonal if not set |
| `position` | `string` | Gloss position | Options: `'top'`, `'bottom'`. Default: `'top'` |
| `glareDepth` | `number` | Depth factor | Default: `0` |

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Glossy",
        "styles": ["layer.glare.gloss(position:top;glareDepth:30)", "css(padding:2rem)"]
    }
]
```

### `glare.metal`
Metallic glare with configurable streak count.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `count` | `number` | Number of metallic streaks | Default: `0` (auto-calculated) |
| `size` | `number \| string` | Glare size | Calculated from element diagonal if not set |
| `position` | `string` | Glare position | Options: `'top'`, `'bottom'`. Default: `'top'` |
| `glareDepth` | `number` | Depth factor | Default: `0` |

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Metal",
        "styles": ["layer.glare.metal(count:6;position:top)", "css(padding:2rem)"]
    },
    {
        "type": "card",
        "cap": "Brushed metal",
        "styles": ["layer.glare.metal(count:12;position:bottom)", "css(padding:2rem)"]
    }
]
```

### `glare.light`
Tube light effect. A bright elongated light glow.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `size` | `number \| string` | Light size | Calculated from element diagonal if not set |
| `position` | `string` | Light position | Options: `'top'`, `'bottom'`. Default: `'top'` |
| `glareDepth` | `number` | Depth factor | Default: `96` |

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Light tube",
        "styles": ["layer.glare.light(position:top;glareDepth:80)", "css(padding:2rem)"]
    }
]
```
