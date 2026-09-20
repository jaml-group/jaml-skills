# layer.combo

`Styles.layer.combo.*` — composite layer effects combining multiple spinners or masked backgrounds.

---

## Variants

### `combo.spinner.roulette`
Roulette-style spinner combining frets, comet, and orbit spinners.

Combines `spinner.frets` (reversed, mid:80), `spinner.comet` (mid:80, normal direction), and `spinner.orbit` (single sphere, mid:80).

| Arg | Type | Description | Notes |
|---|---|---|---|
| Inherits from `spinner.frets` | — | Fret width, gap, colors, background | `fretWidth` default: `1.5`, `fretGap` default: `10.5` |
| Inherits from `spinner.comet` | — | Comet length, colors, blur, round head/tail | `cometBlur` default: `'1px'` |
| `spin` | `boolean \| string` | Overall spin direction | Options: `false`, `'normal'`, `'reverse'` |
| `duration` | `number` | Animation duration in ms | Default: `10000` |

```json jaml-playground
[
    {
        "type": "indicator",
        "cap": "Roulette",
        "styles": ["layer.combo.spinner.roulette(duration:4000)", "css(position:relative;width:10rem;height:10rem)"]
    }
]
```

### `combo.spinner.radar`
Radar-style spinner combining comet and multiple frets layers.

Creates a radar sweep with concentric rings. Uses `spinner.comet` for the sweep line and multiple `spinner.frets` for concentric circles.

| Arg | Type | Description | Notes |
|---|---|---|---|
| Inherits from `spinner.comet` | — | Comet length, colors, blur | Overrides: `roundHead: false`, `outer: 92`, `inner: 0` |

```json jaml-playground
[
    {
        "type": "indicator",
        "cap": "Radar",
        "styles": ["layer.combo.spinner.radar(duration:3000)", "css(position:relative;width:10rem;height:10rem)"]
    }
]
```

### `combo.spinner.reddit`
Multi-layered Reddit-style spinner.

Combines two pairs of frets + orbit layers at different radii and a central background dot.

| Arg | Type | Description | Notes |
|---|---|---|---|
| Inherits from `spinner.comet` | — | Base args for the layered spinners | — |

```json jaml-playground
[
    {
        "type": "indicator",
        "cap": "Reddit",
        "styles": ["layer.combo.spinner.reddit(duration:5000)", "css(position:relative;width:10rem;height:10rem)"]
    }
]
```

### `combo.masked`
Masked background layer. Wraps `layerBackgrounds()` with mask support.

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["layer.combo.masked(color:var(--jam-ac-color);opacity:0.15)"],
        "components": [{ "type": "label", "cap": "Masked bg" }]
    }
]
```

### `combo.masked.stripy`
Stripy background with a gradient mask. The stripes are masked by a linear gradient for a fade effect.

| Arg | Type | Description | Notes |
|---|---|---|---|
| Inherits from `background.stripy` | — | Stripe angle, color, width, gap | Overrides: `color`, `width: '0.5rem'` |

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["layer.combo.masked.stripy(deg:45)"],
        "components": [{ "type": "label", "cap": "Masked stripy" }]
    }
]
```
