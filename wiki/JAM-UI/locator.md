# locator

**Class:** `LoganLocator` · **Type:** `"locator"` · **Extends:** `AbstractElement`

A visual locator/highlighter element that draws a frame, crosshair, or axis line around a target element. Used for tutorials, walkthroughs, focus indicators, and hover effects.

---

## JAML usage

The locator is typically used imperatively via the `logan` global singleton. It can also be created via JAML as `<jam-locator>`.

```javascript jaml-playground
export default {
  type: 'container',
  components: [
    {
      type: 'button',
      cap: 'Highlight Me',
      ref: 'targetBtn',
      onclick: function() {
        logan.show(this, { breathe: true })
      }
    }
  ]
}
```

---

## Params

Inherits all params from [AbstractElement](./JAM-UI.md).

| Param | Type | Default | Description |
|---|---|---|---|
| `type` | `'frame' \| 'axisx' \| 'axisy' \| 'crosshair'` | `'crosshair'` | Locator shape. Set during construction. `frame` = full border, `axisx` = horizontal band, `axisy` = vertical band, `crosshair` = corner brackets. |
| `size` | `number` | `48` | Locator corner/bracket size in px. |
| `width` | `number` | `3` | Border width in px. |
| `bias` | `number` | `0` | Offset distance from the target element in px. |
| `radius` | `number \| number[] \| 'auto'` | `'auto'` | Border radius. `'auto'` matches the target's border radius. Pass an array for per-corner: `[tl, tr, br, bl]`. |
| `glow` | `number` | `5` | Glow blur radius in px. Set to `0` to disable. |
| `easing` | `string` | `'ease'` | CSS easing for position/size transitions. Supports named easings: `'bouncing'`, `'smooth'`, `'crisp'`, etc. |
| `duration` | `number` | `200` | Transition duration in ms. |
| `color` | `ColorType` | — | Accent color. If not set, syncs with the target element's accent color. |
| `container` | `Element \| Function` | target's `offsetParent` | Container to append the locator into. |
| `clipTarget` | `HTMLElement \| Function` | container | Element to clip the locator against. |

---

## Instance methods

| Method | Description |
|---|---|
| `logan.show(target, option?)` | Show the locator around `target`. The `option` object accepts all LocatorOption fields except `type` (set type during construction). |
| `logan.hide()` | Hide with transition animation. |
| `logan.stay()` | Keep the locator visible (cancel auto-hide). |
| `logan.breathe()` | Start a breathing pulse animation cycle. |
| `logan.updatePosition(rect?, option?)` | Recalculate and update position. |
| `logan.updateWith(target, option?)` | Update target and style in one call (for manual positioning). |

---

## Examples

### Crosshair locator

Create a locator with crosshair shape by setting the type during construction:

```javascript jaml-playground
export default {
  type: 'container',
  components: [
    {
      type: 'button',
      cap: 'Show Crosshair',
      onclick: function() {
        const locator = new LoganLocator({
          id: 'my-crosshair',
          type: 'crosshair',
          glow: 8
        })
        locator.show(this)
      }
    }
  ]
}
```

### Frame with breathing pulse

The global `logan` singleton is pre-configured as a frame locator:

```javascript jaml-playground
export default {
  type: 'container',
  components: [
    {
      type: 'indicator',
      cap: 'Important Metric',
      value: 128450,
      ref: 'metric',
      styles: ['css(padding:1rem)']
    },
    {
      type: 'button',
      cap: 'Locate',
      onclick: function() {
        const target = this.model.ref.metric
        logan.show(target, {
          size: 24,
          width: 3,
          bias: 8,
          radius: 12,
          glow: 6,
          breathe: true,
          easing: 'bouncing',
          duration: 400
        })
      }
    }
  ]
}
```

### Axis line locator

```javascript jaml-playground
export default {
  type: 'container',
  components: [
    {
      type: 'wrapper',
      cap: 'Row to highlight',
      ref: 'row',
      styles: ['css(padding:1rem)'],
      components: [
        { type: 'indicator', cap: 'Item', value: 42 }
      ]
    },
    {
      type: 'button',
      cap: 'Show Axis',
      onclick: function() {
        const axisLocator = new LoganLocator({
          id: 'my-axis',
          type: 'axisx',
          width: 2,
          glow: 4
        })
        axisLocator.show(this.model.ref.row)
      }
    }
  ]
}
```

### Custom color

```javascript jaml-playground
export default {
  type: 'button',
  cap: 'Highlight',
  onclick: function() {
    logan.show(this, {
      color: 'gold',
      glow: 12,
      size: 32
    })
  }
}
```

---

## Notes

- `logan` is a global singleton created with `type: 'frame'`. For other locator shapes, create a new `LoganLocator` instance with the desired type.
- The locator auto-syncs its accent color to the target element unless `color` is explicitly set.
- For large targets (>=400px), CSS classes `wide` and `high` are added to scale the corner brackets proportionally.
- Use `logan.hide()` to dismiss; use `logan.stay()` to keep the locator permanently visible.
