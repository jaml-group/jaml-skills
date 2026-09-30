# check

<!-- Generated from native authoring; do not edit. -->

[中文](check.zh.md)

Use an option host exposing checked items, valuechange and locator methods, such as radio, checkbox, buttongroup-radio or buttongroup-checkbox. Plain buttongroup has no selection mode; choose an explicit radio or checkbox subtype. The first checked item supplies the locator target.

Let the native option element own selection and bind its value to application state. Native checked presentation is already visible; add one check locator variant only when an alternative treatment is desired.

This is one visual marker, not a marker for every checked item. It does not implement tabs keyboard navigation, ARIA tab semantics or panel switching.

`Styles.check.*` optionally adds one visual locator for the first checked option reported by an option host. Native radio/button-group selection is already visible without these styles. Use `check.*` only for a different checked-state treatment. The native element owns selection; use an explicit radio/checkbox subtype when needed. On valuechange, the locator follows the first checked item and hides when no item is checked. Read the entry below for timing and selection prerequisites. For owner selection and a single-choice composition, see [Choose native capabilities](../choosing-native-capabilities.md#selection-and-hover).

---

## Common arguments

<a id="common-args-check-frame"></a>

Positional order: `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration` → `css`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `size` | `number` | Not supplied | Size |
| `width` | `numberOrString` | Runtime-determined (number) | Border width |
| `bias` | `number` | `0` | Border distance |
| `glow` | `number` | `false` | Glow |
| `radius` | `numberOrString` | Runtime-determined (number) | Border radius<br>auto: fit the element automatically; a numeric value specifies the radius in px. |
| `delay` | `number` | `200` | Delay |
| `breathe` | `boolean` | `false` | Breathing |
| `container` | `any` | Not supplied | Container |
| `clipTarget` | `any` | Not supplied | Clipping target |
| `easing` | `string` | `bouncing` | Animation easing |
| `duration` | `number` | `400` | Animation duration |
| `css` | `dictionaryOrString` | Not supplied | CSS |

## Variants

### `check.frame`

<a id="entry-check-frame"></a>

Frame

Use a frame around the current selected option when the option element already owns selection.

On valuechange, locate the first checked DOM item, or hide the existing locator when none is checked. A configured delay is used before the first locator is created; the style does not change the selected value.

Positional order: `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration` → `css`.

Common arguments: [check.frame](#common-args-check-frame).

Frame locator around the checked option.

```javascript jaml-playground
export default [
    {
        type: 'radio',
        cap: 'Select one',
        styles: ['check.frame(glow:4;duration:300;breathe:true)'],
        data: [
            { name: 'Option A', value: 'a' },
            { name: 'Option B', value: 'b' }
        ]
    },
    {
        type: 'radio',
        cap: 'Sharp frame',
        styles: ['check.frame(glow:0;radius:4;width:2)'],
        data: [
            { name: 'Option X', value: 'x' },
            { name: 'Option Y', value: 'y' }
        ]
    }
];
```

### `check.shade`

<a id="entry-check-shade"></a>

Shade

Use a shaded background behind the current selected option when the option element already owns selection.

On valuechange, locate the first checked DOM item, or hide the existing locator when none is checked. A configured delay is used before the first locator is created; the style does not change the selected value.

Positional order: `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration` → `css`.

Common arguments: [check.frame](#common-args-check-frame).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `width` | `numberOrString` | `auto` | Border width |
| `bias` | `number` | Runtime-determined (number) | Border distance |

Shaded background behind the checked option. Same args as `frame`, with `bias` default `'0.25rem'`.

```javascript jaml-playground
export default [
    {
        type: 'select',
        cap: 'Pick one',
        styles: ['check.shade(duration:200)'],
        data: [
            { name: 'Apple', value: 'a' },
            { name: 'Banana', value: 'b' },
            { name: 'Cherry', value: 'c' }
        ]
    }
];
```

### `check.underscore`

<a id="entry-check-underscore"></a>

Underline

Use an underline below the current selected option when the option element already owns selection.

On valuechange, locate the first checked DOM item, or hide the existing locator when none is checked. A configured delay is used before the first locator is created; the style does not change the selected value.

Let the native option element own selection; this is optional presentation. Prefer named arguments: check.underscore(width:3;glow:5). Positional order is size, width, bias, glow, radius, delay, breathe, container, clipTarget, easing, duration, css; width and glow are not the first two positions. Numeric dimensions use px; delay and duration use ms. Omitted arguments retain resolved runtime defaults.

Positional order: `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration` → `css`.

Common arguments: [check.frame](#common-args-check-frame).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `width` | `numberOrString` | Runtime-determined (number) | Underline thickness, not length. Supply a number in px or auto (checked target border width, at least 2 px). The default is 0.25 rem resolved to pixels at runtime; an opaque numeric defaultMetadata entry records a computed default, not a missing or required argument. |
| `glow` | `number` | `false` | Glow blur radius in px. Positive numbers enable glow; 0 disables it. The resolved default false also disables glow; it is a runtime default, not a requirement to pass a boolean. |

Optional underline below the checked option. Same args as `frame`, with `width` default `'0.25rem'`. This is a visual treatment, not a tab/panel or keyboard contract.

```javascript jaml-playground
export default [
    {
        type: 'radio',
        cap: 'Pick one',
        styles: ['check.underscore(duration:300;easing:ease-in-out)'],
        data: [
            { name: 'Tab 1', value: '1' },
            { name: 'Tab 2', value: '2' },
            { name: 'Tab 3', value: '3' }
        ]
    }
];
```

### `check.pipe`

<a id="entry-check-pipe"></a>

Pipe

Use a side bar beside the current selected option when the option element already owns selection.

On valuechange, locate the first checked DOM item, or hide the existing locator when none is checked. A configured delay is used before the first locator is created; the style does not change the selected value.

Positional order: `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration` → `css`.

Common arguments: [check.frame](#common-args-check-frame).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `bias` | `number` | Runtime-determined (number) | Border distance |

Side pipe indicator on the checked option. Same args as `frame`, with `width` default `'0.25rem'`, `bias` default `'0.25rem'`.

```javascript jaml-playground
export default [
    {
        type: 'radio',
        cap: 'Select item',
        styles: ['check.pipe(glow:3;duration:250)'],
        data: [
            { name: 'Item 1', value: '1' },
            { name: 'Item 2', value: '2' }
        ]
    }
];
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
