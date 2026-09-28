# check

`Styles.check.*` optionally adds one visual locator for the first checked option reported by an option host. Native radio/button-group selection is already visible without these styles. Use `check.*` only for a different checked-state treatment. The native element owns selection; use an explicit radio/checkbox subtype when needed. On valuechange, the locator follows the first checked item and hides when no item is checked. Read the generated profile for timing and selection prerequisites. For owner selection and a single-choice composition, see [Choose native capabilities](../choosing-native-capabilities.md#selection-and-hover).

---

## Variants

### `check.frame`

Frame locator around the checked option.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style check.frame`.

```json jaml-playground
[
    {
        "type": "radio",
        "cap": "Select one",
        "styles": ["check.frame(glow:4;duration:300;breathe:true)"],
        "data": [
            { "name": "Option A", "value": "a" },
            { "name": "Option B", "value": "b" }
        ]
    },
    {
        "type": "radio",
        "cap": "Sharp frame",
        "styles": ["check.frame(glow:0;radius:4;width:2)"],
        "data": [
            { "name": "Option X", "value": "x" },
            { "name": "Option Y", "value": "y" }
        ]
    }
]
```

### `check.shade`

Shaded background behind the checked option. Same args as `frame`, with `bias` default `'0.25rem'`.

```json jaml-playground
[
    {
        "type": "select",
        "cap": "Pick one",
        "styles": ["check.shade(duration:200)"],
        "data": [
            { "name": "Apple", "value": "a" },
            { "name": "Banana", "value": "b" },
            { "name": "Cherry", "value": "c" }
        ]
    }
]
```

### `check.underscore`

Optional underline below the checked option. Same args as `frame`, with `width` default `'0.25rem'`. This is a visual treatment, not a tab/panel or keyboard contract.

```json jaml-playground
[
    {
        "type": "radio",
        "cap": "Pick one",
        "styles": ["check.underscore(duration:300;easing:ease-in-out)"],
        "data": [
            { "name": "Tab 1", "value": "1" },
            { "name": "Tab 2", "value": "2" },
            { "name": "Tab 3", "value": "3" }
        ]
    }
]
```

### `check.pipe`

Side pipe indicator on the checked option. Same args as `frame`, with `width` default `'0.25rem'`, `bias` default `'0.25rem'`.

```json jaml-playground
[
    {
        "type": "radio",
        "cap": "Select item",
        "styles": ["check.pipe(glow:3;duration:250)"],
        "data": [
            { "name": "Item 1", "value": "1" },
            { "name": "Item 2", "value": "2" }
        ]
    }
]
```

---

## Usage

```javascript jaml-playground
export default {
    type: 'radio',
    cap: 'Select one',
    styles: ['check.frame(glow:4;duration:300)'],
    data: [
        { name: 'Option A', value: 'a' },
        { name: 'Option B', value: 'b' }
    ]
};
```

---

## Combos

Multiple check styles (shade, underscore, pipe) with icons in a single component tree:

```javascript jaml-playground
export default jaml.wrapper({ styles: ['wrapper.vertical', 'group.gridline', 'layout.alignlabel'], optionsStyles: ['options.hidebox'] }, [
    jaml.radio('Themes', {
        styles: ['check.shade'],
        data: [
            { name: 'Light', icon: '☀️' },
            { name: 'Dark', icon: '🌙' },
            { name: 'System', icon: '💻' }
        ]
    }),
    jaml.radio('Tab', {
        styles: ['check.underscore'],
        data: [
            { name: 'Overview', icon: '🏠' },
            { name: 'Activity', icon: '📈' },
            { name: 'Settings', icon: '⚙️' }
        ]
    }),
    jaml.radio('Priority', {
        styles: ['check.pipe', 'options.vertical'],
        data: [
            { name: 'Low', icon: '🟢' },
            { name: 'Medium', icon: '🟡' },
            { name: 'High', icon: '🔴' }
        ]
    })
]);
```
