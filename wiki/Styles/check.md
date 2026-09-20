# check

`Styles.check.*` — visual indicators shown on the currently checked/selected option. Used with option-based elements (`radio`, `checkbox`, `select`, `table`). Each variant shows a locator around the checked option's DOM element when `valuechange` fires. If `delay` is set and no locator exists yet, waits before showing.

---

## Variants

### `check.frame`
Frame locator around the checked option.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `size` | `number` | Locator corner size | Unit: `px` |
| `width` | `number \| string` | Border width | Default: `'0.25rem'` |
| `bias` | `number` | Offset from the option edge | Default: `0`, unit: `px` |
| `glow` | `number \| false` | Glow blur radius. Set to `false` to fully disable | Default: `false` |
| `radius` | `number \| string` | Border radius. `'auto'` matches the option's radius | Default: `'0.25rem'` |
| `delay` | `number` | Delay before showing | Default: `200`, unit: `ms` |
| `breathe` | `boolean` | Enable breathing pulse animation | Default: `false` |
| `easing` | `string` | CSS easing function | Default: `'bouncing'` |
| `duration` | `number` | Transition duration | Default: `400`, unit: `ms` |
| `css` | `dictionary \| string` | Additional CSS properties applied directly to the checked option DOM element | — |

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
Underline below the checked option. Same args as `frame`, with `width` default `'0.25rem'`.

```json jaml-playground
[
    {
        "type": "radio",
        "cap": "Pick a tab",
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
}
```

---

## Combos

Multiple check styles (shade, underscore, pipe) with icons in a single component tree:

```javascript jaml-playground
export default jaml.wrapper(
  { styles: ['wrapper.vertical', 'group.gridline', 'layout.alignlabel'], optionsStyles: ['options.hidebox'] },
  [
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
  ]
);
```
