# container style variants

**Element:** `jam-container` · **Type:** `container`

Container inherits layout and grid basics — `display`, `position`, `gap`, `gridTemplateColumns`, `gridTemplateRows`, `gridAutoColumns`, `gridAutoRows`, `gridTemplateAreas`, `gridArea`.

---

## Style variants

### `container.innershadow`
Inner shadow border effect — adds an inset box-shadow and border to the container. No args.

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["container.innershadow"],
        "components": [
            { "type": "label", "cap": "Inner shadow container" }
        ]
    }
]
```

### `container.childcount`
Tracks child count automatically — sets a `child-count` attribute on the element and adds a `jam-empty` class when there are no children. No args.

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["container.childcount"],
        "components": [
            { "type": "label", "cap": "Item 1" },
            { "type": "label", "cap": "Item 2" }
        ]
    },
    {
        "type": "container",
        "styles": ["container.childcount"],
        "components": []
    }
]
```

---

## Usage

```javascript jaml-playground
export default {
  type: 'container',
  styles: ['container.innershadow', 'container.childcount'],
  components: [
    { type: 'label', cap: 'Item 1' },
    { type: 'label', cap: 'Item 2' }
  ]
}
```
