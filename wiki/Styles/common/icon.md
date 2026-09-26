# common.icon

`Styles.icon.*` -- icon customization using Font Awesome, emoji, or other icon sets.

---

## Variants

### `icon.solid`

Customizes the icon appearance on an element with an icon slot.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style icon.solid`.

`icon` is a style namespace; select a rendering style such as `icon.solid` or `icon.emoji`.

```json jaml-playground
[
    {
        "type": "label",
        "icon": "star",
        "cap": "Starred",
        "styles": ["icon.solid(size:1.5rem;color:gold)"]
    }
]
```

### `emoji`

Renders the icon as an emoji character. Same args as `icon.solid`.

### `light`

Thin icon style using Font Awesome Light (fal). Same args as `icon.solid` but `strokeWidth` defaults to `0px`.

### `regular`

Regular icon style using Font Awesome Regular (far). Same args as `icon.solid` but `strokeWidth` defaults to `0px`.

### `duotone`

Dual-tone icon style using Font Awesome Duotone (fad). Same args as `icon.solid`, plus:

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style icon.duotone`.

### `solid`

Solid icon style using Font Awesome Solid (fas). Same args as `icon.solid`.

### `brand`

Brand icon style using Font Awesome Brand (fab). Same args as `icon.solid`.

### `chars`

Renders icon text as plain characters instead of converting it to a Font Awesome class. Same args as `icon.solid`.

### `withbg`

Icon with a background behind it.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style icon.withbg`.

### `withborder`

Icon with a border around it.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style icon.withborder`.

### `bar`

Creates a shaped icon bar by inserting a `span.jam-icon-bar` into the icon slot.

### `dot`

Creates a shaped icon dot by inserting a `span.jam-icon-dot` into the icon slot.

### `square`

Creates a shaped square icon by inserting a `span.jam-icon-square` into the icon slot. The square is `0.875em` on each side and uses the theme's extra-small border radius. No args.

### `arrow`

Creates a shaped arrow icon. Numeric input value changes point it down for negative values and up otherwise. Other elements use their `state` to choose a direction.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style icon.arrow`.
