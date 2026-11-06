# common.shadow

<!-- Generated from native authoring; do not edit. -->

[中文](shadow.zh.md)

`Styles.shadow.*` -- box shadow styling.

---

## Variants

### `shadow`

<a id="entry-shadow"></a>

Shadow

Set a box shadow on the selected target.

Writes box-shadow; nested text presets instead target text-shadow.

Use semantic shadow presets for a theme-following elevation; the shadow does not reserve layout space.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `shadow`.

| Argument | Type | Contract |
| --- | --- | --- |
| `shadow` | `string` | Shadow<br>Shorthand<br>`{"cssKey":"boxShadow"}` |

Applies a box-shadow to an element.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['shadow(0 0.25rem 0.5rem rgba(0,0,0,0.2))']
    }
];
```

### Token shadow presets

The preset paths resolve through the active theme's shadow tokens.

| Paths                                                                                                | CSS property  | Scale                             |
| ---------------------------------------------------------------------------------------------------- | ------------- | --------------------------------- |
| `shadow.xs`, `shadow.s`, `shadow.m`, `shadow.l`, `shadow.xl`                                         | `box-shadow`  | Neutral `xs` through `xl`         |
| `shadow.primary.xs`, `shadow.primary.s`, `shadow.primary.m`, `shadow.primary.l`, `shadow.primary.xl` | `box-shadow`  | Primary-colored `xs` through `xl` |
| `shadow.text.xs`, `shadow.text.s`, `shadow.text.m`                                                   | `text-shadow` | Neutral `xs` through `m`          |
| `shadow.text.primary.xs`, `shadow.text.primary.s`, `shadow.text.primary.m`                           | `text-shadow` | Primary-colored `xs` through `m`  |

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Theme shadow',
        styles: ['shadow.m']
    }
];
```

### `sphere`

<a id="entry-shadow-sphere"></a>

Spherical shadow

Add a rounded, dimensional impression using paired shadows.

Adds jam-shadow-sphere, whose stylesheet combines an inset and outer accent-derived box shadow.

The preset does not make the target circular or set its size; coordinate shape separately.

Applies a 3D sphere shadow preset.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['shadow.sphere', 'css(padding:1rem)'],
        components: [{ type: 'label', cap: 'Sphere shadow' }]
    }
];
```

## `shadow.l`

<a id="entry-shadow-l"></a>

Large

shadow.l and shadow.primary.l set box shadows.

## `shadow.m`

<a id="entry-shadow-m"></a>

Medium

shadow.m and shadow.primary.m set box shadows.

## `shadow.s`

<a id="entry-shadow-s"></a>

Small

shadow.s and shadow.primary.s set box shadows.

## `shadow.xl`

<a id="entry-shadow-xl"></a>

Extra large

shadow.xl and shadow.primary.xl set box shadows.

## `shadow.xs`

<a id="entry-shadow-xs"></a>

Extra small

shadow.xs and shadow.primary.xs set box shadows.

## `shadow.text.m`

<a id="entry-shadow-text-m"></a>

Medium

shadow.text.m and shadow.text.primary.m set text shadows.

## `shadow.text.s`

<a id="entry-shadow-text-s"></a>

Small

shadow.text.s and shadow.text.primary.s set text shadows.

## `shadow.text.xs`

<a id="entry-shadow-text-xs"></a>

Extra small

shadow.text.xs and shadow.text.primary.xs set text shadows.

## `shadow.primary.l`

<a id="entry-shadow-primary-l"></a>

Large

shadow.l and shadow.primary.l set box shadows.

## `shadow.primary.m`

<a id="entry-shadow-primary-m"></a>

Medium

shadow.m and shadow.primary.m set box shadows.

## `shadow.primary.s`

<a id="entry-shadow-primary-s"></a>

Small

shadow.s and shadow.primary.s set box shadows.

## `shadow.primary.xl`

<a id="entry-shadow-primary-xl"></a>

Extra large

shadow.xl and shadow.primary.xl set box shadows.

## `shadow.primary.xs`

<a id="entry-shadow-primary-xs"></a>

Extra small

shadow.xs and shadow.primary.xs set box shadows.

## `shadow.text.primary.m`

<a id="entry-shadow-text-primary-m"></a>

Medium

shadow.text.m and shadow.text.primary.m set text shadows.

## `shadow.text.primary.s`

<a id="entry-shadow-text-primary-s"></a>

Small

shadow.text.s and shadow.text.primary.s set text shadows.

## `shadow.text.primary.xs`

<a id="entry-shadow-text-primary-xs"></a>

Extra small

shadow.text.xs and shadow.text.primary.xs set text shadows.
