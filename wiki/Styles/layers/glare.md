# layer.glare

`Styles.layer.glare.*` — light glare and reflection layer effects.

---

## Variants

### `glare.spot`

Spotlight glare effect. A bright spot that follows the mouse cursor position.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.glare.spot`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.glare.reflect`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.glare.gloss`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.glare.metal`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.glare.light`.

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Light tube",
        "styles": ["layer.glare.light(position:top;glareDepth:80)", "css(padding:2rem)"]
    }
]
```
