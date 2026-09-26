# layer.scroller

`Styles.layer.scroller.*` — auto-scrolling background layer effects.

---

## Variants

### `scroller`

Auto-scrolling background. Two background copies (primary and secondary) cycle to create a seamless scroll effect.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.scroller`.

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["layer.scroller(direction:up;scroll:true;duration:12000;color:var(--jam-ac-color);opacity:0.08)", "css(position:relative;width:20rem;height:20rem)"],
        "components": [{ "type": "label", "cap": "Scrolling up" }]
    },
    {
        "type": "wrapper",
        "styles": ["layer.scroller(direction:left;scroll:true;duration:8000;color:hsla(0,0%,100%,0.05))", "css(position:relative;width:20rem;height:20rem)"],
        "components": [{ "type": "label", "cap": "Scrolling left" }]
    }
]
```

### `scroller.text`

Scrolling text content. Splits text characters and scrolls them across the background.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.scroller.text`.

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["layer.scroller.text(content:JAM UI;scroll:true;direction:up;duration:auto;opacity:0.1)", "css(position:relative;width:20rem;height:20rem;padding:1rem;font-size:2rem)"],
        "components": [{ "type": "label", "cap": "Scrolling text" }]
    }
]
```

### `scroller.particles`

Scrolling particle system. Configurable particles that animate across the background.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.scroller.particles`.

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["layer.scroller.particles(scroll:true;direction:up;duration:10000;countRange:[10,20];sizeRange:[4,12];shape:circle;alphaRange:[0.2,0.6])", "css(position:relative;width:20rem;height:20rem)"],
        "components": [{ "type": "label", "cap": "Particle scroll" }]
    }
]
```

### `scroller.bubbles`

Scrolling bubble particles. A preset particle system with bubble-shaped particles drifting upward.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.scroller.bubbles`.

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["layer.scroller.bubbles(scroll:true;duration:16000)", "css(position:relative;width:20rem;height:20rem)"],
        "components": [{ "type": "label", "cap": "Bubbles" }]
    }
]
```

### `scroller.stripy`

Scrolling stripy (striped) background. Alternating colored stripes that scroll seamlessly.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.scroller.stripy`.

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["layer.scroller.stripy(scroll:true;direction:right;duration:8000;deg:45;width:3rem)", "css(position:relative;width:20rem;height:20rem)"],
        "components": [{ "type": "label", "cap": "Stripy scroll" }]
    }
]
```

### `scroller.grid`

Scrolling grid background. A repeating grid pattern that scrolls.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.scroller.grid`.

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["layer.scroller.grid(scroll:true;direction:down;duration:12000;gap:2rem)", "css(position:relative;width:20rem;height:20rem)"],
        "components": [{ "type": "label", "cap": "Grid scroll" }]
    }
]
```
