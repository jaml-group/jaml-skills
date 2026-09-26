# layer.combo

`Styles.layer.combo.*` — composite layer effects combining multiple spinners or masked backgrounds.

---

## Variants

### `combo.spinner.roulette`

Roulette-style spinner combining frets, comet, and orbit spinners.

Combines `spinner.frets` (reversed, mid:80), `spinner.comet` (mid:80, normal direction), and `spinner.orbit` (single sphere, mid:80).

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.combo.spinner.roulette`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.combo.spinner.radar`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.combo.spinner.reddit`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.combo.masked.stripy`.

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["layer.combo.masked.stripy(deg:45)"],
        "components": [{ "type": "label", "cap": "Masked stripy" }]
    }
]
```
