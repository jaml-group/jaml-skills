# common.filter

<!-- Generated from native authoring; do not edit. -->

[中文](filter.zh.md)

`Styles.filter.*` — CSS filter property.

---

## Variants

### `filter`

<a id="entry-filter"></a>

Filter

Apply visual filters to the target or its backdrop.

Sets filter and backdrop-filter independently.

Backdrop filtering needs visible content behind the target and a background that lets the effect show.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `filter` → `backdrop`.

| Argument | Type | Contract |
| --- | --- | --- |
| `filter` | `string` | Filter<br>Shorthand<br>`{"cssKey":"filter"}` |
| `backdrop` | `string` | Backdrop filter<br>Shorthand<br>`{"cssKey":"backdropFilter"}` |

Applies CSS filter and backdrop-filter effects. Accepts raw CSS filter function strings.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Blurred',
        styles: ['filter(filter:blur(2px) grayscale(0.5))']
    }
];
```

## `filter.lens`

<a id="entry-filter-lens"></a>

Lens distortion

Give a wrapper and its contents a concave bend.

Captures the live wrapper in a canvas. The center compresses vertically, the sides keep their height, and extra background paint fills the top and bottom.

Use an in-flow wrapper with explicit inline CSS dimensions or one that fills a sized parent. The effect requires HTML-in-Canvas, WebGL 2, canvas geometry updates, and state-preserving DOM moves.

The canvas follows the dimensions set in the wrapper's inline styles. Hiding the wrapper with `showIf` removes the canvas from layout until reveal. Moving a connected wrapper releases the old renderer and creates one in the destination. Unmount and style removal release the renderer and its WebGL context.

Place any HUD or other content that should bend inside the wrapper.

The wrapper renders normally when capture is unavailable, the scale is invalid, the context is lost, or forced colors is active. Moving content can repaint the entire surface. Pointer coordinates are planar and may drift from painted pixels near the top and bottom.

Positional order: `centerScale`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `centerScale` | `number` | `0.94` | Vertical scale at the center. Use a finite number greater than 0 and at most 1. The default is 0.94. At 1 the wrapper renders flat. |
