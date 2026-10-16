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
            onclick: function () {
                logan.show(this, { breathe: true });
            },
            onunmount() {
                logan.hide();
            }
        }
    ]
};
```

---

## Params

Inherits all params from [AbstractElement](./JAM-UI.md). Choose `type` during construction. Supply presentation options to each `show(target, options)` call: omitted geometry and style options use the show defaults below, rather than retaining constructor values. An existing breathing animation has a separate lifetime; see the reuse note below. Numeric geometry is in pixels at this API boundary; use `jam.rem()` to convert authored rem sizes.

| Param        | Type                                           | Default                 | Description                                                                                                                                       |
| ------------ | ---------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`       | `'frame' \| 'axisx' \| 'axisy' \| 'crosshair'` | `'crosshair'`           | Locator shape. Set during construction. `frame` = full border, `axisx` = horizontal band, `axisy` = vertical band, `crosshair` = corner brackets. |
| `size`       | `number`                                       | `0` (automatic)         | Locator corner/bracket size in pixels; `0` derives it from the target.                                                                            |
| `width`      | `number \| 'auto'`                             | `3`                     | Border width in pixels. `'auto'` uses the target border width with a minimum of `2`.                                                              |
| `bias`       | `number`                                       | `2`                     | Offset distance from the target element in pixels.                                                                                                |
| `radius`     | `number \| number[] \| 'auto'`                 | `'auto'`                | Border radius. `'auto'` matches the target's border radius. Pass an array for per-corner: `[top-left, top-right, bottom-left, bottom-right]`.     |
| `glow`       | `number`                                       | `5`                     | Glow blur radius in px. Set to `0` to disable.                                                                                                    |
| `easing`     | `string`                                       | `'ease'`                | CSS easing for position/size transitions. Supports named easings: `'bouncing'`, `'smooth'`, `'crisp'`, etc.                                       |
| `duration`   | `number`                                       | `120`                   | Transition duration in ms.                                                                                                                        |
| `delay`      | `number`                                       | `0`                     | Delay before showing, in ms.                                                                                                                      |
| `breathe`    | `boolean`                                      | `false`                 | Start a repeating breathing animation. Stop it with `hide()` or `stay()`.                                                                         |
| `color`      | `ColorType`                                    | —                       | Accent color. If not set, syncs with the target element's accent color.                                                                           |
| `container`  | `Element \| Function`                          | target's `offsetParent` | Container to append the locator into.                                                                                                             |
| `clipTarget` | `HTMLElement \| Function`                      | container               | Element to clip the locator against.                                                                                                              |

---

## Instance methods

| Method                                 | Description                                                                                                                          |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `logan.show(target, option?)`          | Show the locator around `target`. The `option` object accepts all LocatorOption fields except `type` (set type during construction). |
| `logan.hide()`                         | Hide with transition animation.                                                                                                      |
| `logan.stay()`                         | Keep the locator visible and stop pending delay/breathing timers.                                                                    |
| `logan.breathe()`                      | Start a breathing pulse animation cycle.                                                                                             |
| `logan.updatePosition(rect?, option?)` | Recalculate and update position.                                                                                                     |
| `logan.updateWith(target, option?)`    | Update target and style in one call (for manual positioning).                                                                        |

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
            onmount() {
                this.walkthroughLocator = new jam.LoganLocator({ type: 'crosshair' });
            },
            onclick() {
                this.walkthroughLocator.show(this, { glow: jam.rem(0.5) });
            },
            onunmount() {
                this.walkthroughLocator.hide();
                this.walkthroughLocator.destroy();
            }
        }
    ]
};
```

### Frame with breathing pulse

The global `logan` singleton is pre-configured as a frame locator:

```javascript jaml-playground
export default {
    type: 'container',
    onunmount() {
        logan.hide();
    },
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
            onclick: function () {
                const target = this.model.ref.metric;
                logan.show(target, {
                    size: jam.rem(1.5),
                    width: jam.rem(0.1875),
                    bias: jam.rem(0.5),
                    radius: jam.rem(0.75),
                    glow: jam.rem(0.375),
                    breathe: true,
                    easing: 'bouncing',
                    duration: 400
                });
            }
        }
    ]
};
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
            components: [{ type: 'indicator', cap: 'Item', value: 42 }]
        },
        {
            type: 'button',
            cap: 'Show Axis',
            onmount() {
                this.axisLocator = new jam.LoganLocator({ type: 'axisx' });
            },
            onclick() {
                this.axisLocator.show(this.model.ref.row, { width: jam.rem(0.125), glow: jam.rem(0.25) });
            },
            onunmount() {
                this.axisLocator.hide();
                this.axisLocator.destroy();
            }
        }
    ]
};
```

### Custom color

```javascript jaml-playground
export default {
    type: 'button',
    cap: 'Highlight',
    onunmount() {
        logan.hide();
    },
    onclick: function () {
        logan.show(this, {
            color: 'hsl(51 100% 50%)',
            glow: jam.rem(0.75),
            size: jam.rem(2)
        });
    }
};
```

---

## Notes

-   `logan` is a global singleton created with `type: 'frame'`. For other locator shapes, create a new `LoganLocator` instance with the desired type.
-   The locator auto-syncs its accent color to the target element unless `color` is explicitly set.
-   For large targets (>=400px), CSS classes `wide` and `high` are added to scale the corner brackets proportionally.
-   When reusing a breathing locator without breathing, call `stay()` or `hide()` first. Passing `breathe: false`, or omitting it on the next `show()`, does not stop the existing breathing timer.
-   `show()` does not schedule automatic dismissal. Use `hide()` when the target or owning view is released. For a custom instance, call `hide()` to stop its timers, then `destroy()` to release it. Reuse one instance per owner instead of creating one per click.
-   `logan` is shared: an owner that shows it may hide it during its own cleanup, but should not destroy the global singleton.
