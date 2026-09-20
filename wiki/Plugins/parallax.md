# PineappleParallax

PineappleParallax computes mouse-driven tilt or translation and depth offsets for a host and its descendants. For JAML, use [`hover.parallax`](../Styles/hover.md#hoverparallax): that style waits for connection and owns attaching/removing the engine's listeners.

## Style usage

```json jaml-playground
{
  "type": "card",
  "cap": "Move the pointer across the card",
  "styles": ["css(width:20rem;height:10rem)", "hover.parallax(intensity:5)"],
  "components": [{ "type": "label", "cap": "Depth follows the content tree" }]
}
```

The [style argument table](../Styles/hover.md#hoverparallax) owns the public JAML configuration. `pan:true` selects translation. The engine derives perspective from host dimensions and depth from descendants; it does not require a manually styled perspective parent.

## Direct engine use

Use direct access when application code owns the target's setup and teardown. Import from the package or access the class through `jam.PineappleParallax` in the browser runtime:

```javascript
const target = document.getElementById('card');
jam.PineappleParallax.makeHoverEffect(target, { intensity: 5, inward: false });
// When this application-owned behavior is no longer needed:
jam.PineappleParallax.removeHoverEffect(target);
```

`makeHoverEffect(el, option?)` constructs the engine, initializes the host, and attaches `mousemove` / `mouseleave` listeners. It returns no instance. The constructor accepts only an option dictionary; constructing an instance by itself does not initialize a target.

The engine accepts `intensity` (default 3), `inward` (default true), `pan` (default false), and optional `startAngles`. The public style has its own defaults, including `inward:false`. Read the style contract when configuring a style rather than inheriting engine defaults implicitly.

`makePerspectEffect(el, coord, usingDegs?)` is an instance method that updates an initialized target from coordinates or angles. It is not a static setup helper. For normal authoring, prefer the hover style or `makeHoverEffect`.

## How it works and cleanup limits

The parallax plugin uses `pp-*` attributes and CSS custom properties, and updates `--jam-transform`. Rotation uses `--pp-rotate-x/y`; pan uses `--pp-translate-x/y`. Descendant offsets use `--pp-bias-x/y`. Mouse leave resets to the configured attributes unless `startAngles` was provided.

`removeHoverEffect` removes the two mouse listeners. It does not restore all inline styles, attributes, or descendant transforms. Do not assume it restores a previously authored transform. If an application needs reversible arbitrary transform ownership, inspect and preserve that state explicitly before using the engine. Avoid installing the engine a second time on a target already owned by `hover.parallax`.
