# locator

`Styles.locator.*` -- visual locator elements used to highlight or frame other elements.

---

## Variants

### `locator.crosshair`
Crosshair corner-bracket style used to highlight target elements. Commonly applied via `logan.show()` or `element.locate()`.

```json jaml-playground
[
    {
        "type": "button",
        "cap": "Highlight",
        "onclick": "function() { logan.show(this, { type: 'frame', styles: ['locator.crosshair'] }) }"
    }
]
```
