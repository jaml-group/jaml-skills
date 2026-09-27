# click

`Styles.click.*` — click-triggered behaviors.

---

## Variants

### `click.toFront`

Raises the host immediately and on `mousedown` within its parent stacking context. Removing the style detaches its listener and prevents pending connection readiness from reinstalling it; prior inline z-index values are not restored. No args.

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
