# click

`Styles.click.*` — click-triggered behaviors.

---

## Variants

### `click.toFront`
Brings the element to the front (highest z-index) on click via `clickToFront`. No args.

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Click to bring to front",
        "styles": ["click.toFront"]
    },
    {
        "type": "card",
        "cap": "Also comes to front",
        "styles": ["click.toFront"]
    }
]
```

### `click.able`
Makes the element appear clickable — adds `cursor: pointer` via `.jam-clickable` class and applies button stylize via the `stylize` attribute. No args.

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Clickable label",
        "styles": ["click.able"]
    },
    {
        "type": "card",
        "cap": "Clickable card",
        "styles": ["click.able"]
    }
]
```

### `click.bouncing`
Adds a bounce animation on click. Adds both `.jam-hover-bouncing` and `.jam-active-bouncing` classes. No args.

```json jaml-playground
[
    {
        "type": "button",
        "cap": "Bounce on click",
        "styles": ["click.bouncing"]
    },
    {
        "type": "card",
        "cap": "Bouncing card",
        "styles": ["click.bouncing"]
    }
]
```

---

## Usage

```javascript jaml-playground
export default {
  type: 'card',
  cap: 'Clickable',
  styles: ['click.able', 'click.toFront']
}
```
