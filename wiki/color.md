# Color & Lumi System

JAM-UI has a built-in color system that automatically adapts between light and dark modes. All color values resolve through the accent color chain: a single **accent color** (`jam.accolor`) generates a full **color set** (`jam.colorSet`) using a **color scheme** (`jam.colorScheme`).

---

## Core concepts

### Accent color (`jam.accolor`)

The single base color that defines the entire UI palette. Every element's `color` property resolves through this. Set globally or per-element.

```javascript
jam.accolor; // → chroma.Color — current accent color
jam.accolor = 'red'; // set accent color globally
jam.accolor = '#3b82f6'; // hex
jam.accolor = 'hsl(210, 70%, 55%)'; // HSL
```

For a branded first render, set `jam.accolor` before rendering. Descendants inherit that global color profile, and `jam.colorSet` is regenerated from it; later `jam.accolor` assignments update the active profile as well. Omit an element's `color` when it should use the global accent because setting `color` creates an intentional local accent profile. Use `jam.ac()` for CSS/style expressions and `jam.colorSet` for derived palette values; never pass the uncalled `jam.ac` builder as an element color.

### Color set (`jam.colorSet`)

An array of colors generated from the accent color using the active color scheme. Used by charts, indicators, and multi-color elements.

```javascript
jam.colorSet; // → ColorSet (array of chroma.Color)
jam.colorSet[0]; // first derived color
jam.colorSet[2].css(); // CSS string
jam.colorSet[2].hex(); // hex string
```

### Color scheme (`jam.colorScheme`)

The algorithm that generates the color set from the accent color. 12 schemes available:

| Scheme               | Character                               |
| -------------------- | --------------------------------------- |
| `sequential`         | Smooth gradient of lightness/saturation |
| `monochromatic`      | Single hue, varied lightness            |
| `analogous`          | Adjacent hues on the color wheel        |
| `complementary`      | Opposite hues                           |
| `splitComplementary` | Base + two adjacent to complement       |
| `dopamine`           | High saturation, varied hues            |
| `neon`               | Bright, intense colors                  |
| `pastel`             | Soft, muted tones                       |
| `jewel`              | Rich, deep jewel tones                  |
| `morandi`            | Muted, greyish sophistication           |
| `cubehelix`          | Perceptually uniform spiral             |
| `shade`              | Monochrome lightness gradient           |

```javascript
jam.colorScheme = 'pastel'; // switch scheme
```

### Dark mode (`jam.darkMode`)

Auto-detected from system preference. Can be forced per-element or globally.

```javascript
jam.darkMode                   // → boolean — current mode (reads system preference)
jam.darkMode = true            // force dark mode globally
// Per-element via param:
const lightCard = { type: 'card', darkMode: false };
```

When an example intentionally forces a global mode, set `jam.darkMode` before rendering so the first render uses that color profile. Otherwise leave it unset to follow the active system or theme state. Assigning it later is supported, but changes the profile after the initial paint.

---

## The lumi system

Lumi is the **lightness adaptation layer** that makes the accent color readable in both light and dark modes. It works by shifting the **OKLCH lightness** of colors based on the active mode.

### How it works

Every color used in the UI is adjusted through **lumiO** (luminosity offset, "O" = opposite). In light mode, the offset is additive. In dark mode, the sign flips (opposite direction). This ensures colors stay readable against the background regardless of mode.

```
Light mode: lumiO(level) =   4.5%  + 2.0% × level   → higher level = lighter
Dark mode:  lumiO(level) = 106.5%  − 2.0% × level   → higher level = darker (opposite)
```

The offset scales with the `level` parameter — higher levels push further in the mode's direction:

```javascript
jam.lumiO(0); // base (light: 4.5% near-black, dark: 106.5% near-white)
jam.lumiO(46); // dark card surface in dark mode (~14.5%), light surface in light mode
jam.lumiO(5); // subtle offset from base
```

### Lumi functions

| Function                  | Returns               | Description                                                                                                                                                             |
| ------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `jam.lumiO(level, bias?)` | `string` (percentage) | General-purpose lightness offset ("O" = opposite — sign auto-flips per dark mode). Use for backgrounds, surfaces, borders, and most color values. Practical range: 1–50 |
| `jam.lumiL(level, bias?)` | `string` (percentage) | Level-based lightness shift ("L" = level). A separate profile for fine-grained control                                                                                  |
| `jam.lumiA(level)`        | `number`              | Alpha value for semi-transparent overlays                                                                                                                               |
| `jam.lumiText(level)`     | `string`              | Neutral gray at the given lumiO level. Convenience for `hsl(0, 0%, lumiO(level))`                                                                                       |
| `jam.inDarkMode(el?)`     | `boolean`             | Whether the element (or document body) is in dark mode                                                                                                                  |

### Why use lumiO instead of hardcoded colors?

```javascript
// ❌ Hardcoded — breaks in dark mode
{
    color: '#333333';
}

// ✅ lumiO — auto-adapts to light/dark mode
{
    background: jam.hsl(0, 0, jam.lumiO(48));
    color: jam.lumiText(1); // same as jam.hsl(0, 0, jam.lumiO(1))
}

// ✅ In a JavaScript-authored style string, interpolate the returned lightness component
`css(background:hsl(0,0%,${jam.lumiO(10)}))`;
```

> **Rule of thumb:** `lumiO` is the general-purpose lightness function for everything — "O" stands for "opposite" (its sign flips in dark mode).

When a fixed literal is genuinely intentional, prefer legacy comma-separated HSL/HSLA syntax such as `hsl(210, 70%, 55%)` or `hsla(210, 70%, 55%, 0.5)` over hex/RGB. When the color should adapt, compose `jam.hsl(...)` with `jam.lumiO(...)` or another adaptive helper instead of maintaining separate light and dark literals.

The CSS custom properties `--jam-lumi-o-*` and `--jam-lumi-l-*` are automatically injected by `applyLumi()` on every element.

---

## Color values (`ColorType`)

Any param typed `ColorType` accepts:

| Format          | Example                                                           | Notes                       |
| --------------- | ----------------------------------------------------------------- | --------------------------- |
| CSS named color | `'red'`, `'blue'`, `'tomato'`                                     | Any valid CSS color name    |
| Hex             | `'#3b82f6'`, `'#fff'`                                             | Short or long form          |
| RGB/RGBA        | `'rgb(59, 130, 246)'`                                             | —                           |
| HSL/HSLA        | `'hsl(217, 91%, 60%)'`                                            | Legacy Chromium-compatible  |
| CSS variable    | `'var(--jam-ac-color)'`                                           | Element-aware; use `jam.calcColor(el, value)` for imperative parsing |
| chroma.Color    | `chroma('red')`                                                   | JS only                     |
| `'random'`      | Random color                                                      | Useful for prototyping      |
| Semantic name   | `'info'`, `'success'`, `'warn'`, `'error'`, `'mute'`, `'disable'` | Predefined semantic colors  |

### Color resolution in styles

When styles are applied through an element's singular JAML `style`, `css(...)`, `Styles.props(...)`, scoped rules, or registered global styles, values receive property-aware token replacement. Property-aware system-token aliases resolve first; the following color patterns are the fallback for color-capable declarations. See [css / state-prefixed CSS](Styles/common/css.md#property-aware-token-values) for the property-to-token grammar.

| Pattern                              | Regex                           | Resolves to                                          | Note                                              |
| ------------------------------------ | ------------------------------- | ---------------------------------------------------- | ------------------------------------------------- |
| `ac` / `acN` / `ac[N]`              | `^ac(\[?[0-9]\]?)?$`            | `buildColorVar(index)` → `hsl(var(--jam-ac-h), ...)` | Accent color or color-set index                   |
| `onac` / `onacN` / `onac[N]`        | `^onac(\[?[0-9]\]?)?$`          | `buildAcLumiTextVar(index)` → accent-adapted text    | Text readable on the corresponding accent        |
| `lumitextN` / `lumitext(N)`          | `^lumitext\(?[0-9]+\)?$`        | `lumiText(N)` → `hsl(0, 0%, lumiO(N))`               | Complete neutral color, not a lightness component |
| `colortext` / `colortextN` / `colortext[N]` | `^colortext(\[?[0-9]\]?)?$` | `buildColorTextVar(index)` → color-set text          | Text color from the corresponding color-set entry |
| CSS named color                      | `^[a-zA-Z]+$` (valid chroma)    | `getAdjustedColor(el, value).css()`                  | Auto-adjusted to accent                           |
| Semantic name                        | e.g. `success`, `warn`, `error` | `getAdjustedColor(el, value).css()`                  | Adjusted via ColorSet semantic mapping            |
| Custom color                         | key in `customColors`           | `getAdjustedColor(el, value).css()`                  | Adjusted via `registerCustomColors()`             |

The canonical style-string names are lowercase; matching is case-insensitive for compatibility. Indexed `ac`, `onac`, and `colortext` forms accept `N` from 0 to 9. `lumitext(N)` replaced the old `lumiO(N)` shorthand because the resolved value is a complete color; use `jam.lumiO(N)` only in JavaScript when a reusable lightness component is required.

**Which CSS properties get color fallback:** Color resolution runs on any property containing `color` in its normalized name, plus shorthand properties where the value may contain a color: `background`, physical and logical border sides, `outline`, `text-decoration`, `column-rule`, `list-style`, `shadow`, `box-shadow`, and `text-shadow`.

```json jaml-playground
{
    "type": "button",
    "cap": "Styled",
    "styles": ["css(background:ac;color:onac;border:1px solid ac[1])"]
}
```

---

## Color utility functions

### `jam.color(value)`

Parse any `ColorType` into a `chroma.Color`.

```javascript
jam.color('red'); // → chroma.Color
jam.color('#3b82f6'); // → chroma.Color
jam.color('random'); // → random chroma.Color
```

### `jam.getColor(value)`

Alias for `jam.color()`. Parses a color value.

### `jam.calcColor(el, value)`

Resolve an element-scoped CSS color expression and parse it into a `chroma.Color`. `calcColor()` runs one `jam.parseCSSVariable()` pass; `var()` or `calc()` expressions introduced by a custom-property substitution are not expanded recursively. For a known acyclic chain, resolve it with a bounded, cycle-guarded series of `parseCSSVariable()` calls before passing the result to `calcColor()`.

### `jam.adjustColor(color, adjustments)`

Adjust a color's properties.

```javascript
jam.adjustColor('red', { h: 30, s: 1.2, l: 0.9, a: 0.5 });
```

### `jam.randomColor(option?)`

Generate a random color with constraints.

```javascript
jam.randomColor(); // completely random
jam.randomColor({ temp: 'warm' }); // warm colors only
jam.randomColor({ temp: 'cool' }); // cool colors only
jam.randomColor({ seq: true, bias: 35 }); // sequential (avoids similar consecutive)
```

### `jam.isChromaColor(value)`

Check if a value is a `chroma.Color` instance.

### `jam.hsl(h, s, l, a?)`

Build a legacy Chromium-compatible CSS `hsl()` or `hsla()` string from numeric values, using comma-separated channels and percentage saturation/lightness.

```javascript
jam.hsl(0, 0, 95); // → 'hsl(0, 0%, 95%)'
jam.hsl(220, 1, 0.5, 0.8); // → 'hsla(220, 100%, 50%, 0.8)'
```

### `jam.getAccentColor(el?)`

Get the accent color as a `chroma.Color` for an element (default: `document.body`).

### `jam.getColorName(color)`

Get the CSS named color string from a color value.

### `jam.buildColorSet(baseColor, scheme?, darkMode?)`

Build a `ColorSet` array from a base color and scheme.

```javascript
jam.buildColorSet(jam.color('green'), 'monochromatic');
```

### `jam.scale(colors, count)`

Interpolate a list of `ColorType` values in LCH space and return a normalized `ColorSet` of `count` colors.

```javascript
const ramp = jam.scale(['#2563eb', '#22c55e'], 5);
ramp.toCSS();
```

## Color Tuning

Color tuning applies relative OKLCH transforms to the colors supplied by the caller. It never rebuilds an unrelated absolute palette.

### `jam.tuneColor(color, chromaFactor, lightnessPull?, chromaFloor?)`

Return a tuned `chroma.Color`.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `color` | `chroma.Color` | Original color | Its OKLCH hue is preserved when defined |
| `chromaFactor` | `number` | Multiplier for OKLCH chroma | Result is clamped to `0`–`0.4` |
| `lightnessPull` | `number` | Pull lightness toward white (`> 0`) or black (`< 0`) | Default: `0` |
| `chromaFloor` | `number` | Minimum chroma after multiplication | Default: `0` |

```javascript
const tuned = jam.tuneColor(jam.getColor('#4f46e5'), 1.5, 0.05, 0.08);
```

### Tuner Presets

`ColorTuner` and `jam.colorTuners` expose six named callbacks:

| Preset | Intent |
|---|---|
| `none` | Preserve the original color |
| `dopamine` | Increase chroma with a slight lightness lift |
| `neon` | Push chroma and lightness more strongly |
| `pastel` | Reduce chroma and pull toward white |
| `jewel` | Increase chroma and pull toward black |
| `morandi` | Strongly mute chroma with a lightness lift |

### `jam.tuneColorSet(colors, tuner)` / `jam.tuneColorSet(colors, chromaFactor, lightnessPull?)`

Normalize `ColorType[]` input with `ColorSet.from(...)`, tune each resulting `chroma.Color`, and return a new `ColorSet`.

```javascript
const source = ['#ef4444', '#3b82f6', '#22c55e'];
const pastel = jam.tuneColorSet(source, 'pastel');

const custom = jam.tuneColorSet(source, (color) =>
    jam.tuneColor(color, 1.2, -0.04)
);
```

The callback receives each normalized `chroma.Color`. Input arrays and existing `ColorSet` instances are not mutated.

### `jam.registerCustomColors(colorMap)`

Register custom named colors. Accepts a dictionary of `name: color-string`.

```javascript
jam.registerCustomColors({ '1000kv': '#0000ff', '800kv': '#8800ff' });
// Now usable anywhere: { color: '1000kv' }
```

### `jam.modifyColor(color, option)`

Modify a color and return a `chroma.Color` object (unlike `adjustColor` which returns a CSS string).

### `jam.isDarkColor(color)`

Check if a color is dark.

### `jam.isSameColor(c1, c2)`

Compare two colors with tolerance for equality.

### `jam.toRGB(color)` / `jam.toHSL(color)` / `jam.toHex(color)`

Convert a color string to structured formats.

```javascript
jam.toHex('red'); // → '#ff0000'
jam.toRGB('blue'); // → { r: 0, g: 0, b: 255 }
```

### `jam.toGradientObject(type, arg, ...colorStops)`

Build a linear or radial ECharts gradient object. For `'linear'`, `arg` is a degree value and follows the direction rules below. For `'radial'`, `arg` is a CSS radial descriptor; a trailing `at <x> <y>` sets the normalized center and otherwise defaults to `0.5, 0.5`. Radial gradients use `r: 1`.

```javascript
jam.toGradientObject('linear', -45, '#4f46e5', '#22d3ee');
jam.toGradientObject('radial', 'ellipse at 25% 75%', '#ffffff', '#4f46e5');
```

### `jam.toEchartsGradient(deg, ...colorStops)`

Compatibility helper for `jam.toGradientObject('linear', deg, ...colorStops)`.

```typescript
type EchartsGradientColorStop = ColorType | [ColorType, number | string];
```

- A plain `ColorType` is normalized with `jam.getColor(color).css()` and receives an automatically calculated offset.
- A tuple supplies `[color, offset]`. Numeric strings are parsed as numbers; percentages such as `'35%'` are converted to decimals with `jam.toNumber(offset, true)`.
- Missing or invalid offsets are distributed evenly between the nearest explicit offsets. A leading run starts at `0`, a trailing run ends at `1`, and a list with no explicit offsets is spread evenly from `0` to `1`.
- Explicit offsets are preserved as supplied. They are not clamped or reordered, so ECharts offsets should normally stay within `0`–`1` and in ascending order.
- With one supplied stop, that color stays first and a transparent neutral `hsla(0, 0%, lumiO(50), 0)` stop is appended at the end. A plain first stop resolves to offset `0`; an explicit first offset is preserved.

```javascript
const gradient = jam.toEchartsGradient(
    -45,
    ['#4f46e5', '10%'],
    '#22d3ee',
    ['#f8fafc', 0.8],
    '#0f172a'
);

gradient.colorStops.map(({ offset }) => offset);
// → [0.1, 0.45, 0.8, 1]

jam.toEchartsGradient(90, '#4f46e5');
// → first color at 0, transparent lumiO(50) neutral at 1
```

Degrees are normalized into the range `[0, 360)`; negative and over-rotation values wrap around. ECharts uses a downward-positive Y axis, so the direction increases clockwise: `0°` runs left-to-right, `90°` top-to-bottom, `180°` right-to-left, and `270°` bottom-to-top. Other angles use a sine/cosine direction vector clipped to the first boundary of ECharts' normalized unit square, with coordinates rounded to 12 decimal places. The returned object always has `type: 'linear'` and `global: false`.

### `jam.applyAccentColor(el, color)` / `jam.applyColorProfile(el, color, scheme?)`

Apply an accent color or full color profile to an element's subtree.

### `jam.applyDarkMode(el, value)` / `jam.unapplyDarkMode(el)`

Apply or revert dark mode to an element subtree.

```javascript
jam.applyDarkMode(myCard, true); // force dark mode
jam.unapplyDarkMode(myCard); // revert to auto
```

---

## Accent color helpers

### `jam.ac` — accent color CSS builder

`jam.ac` is an indexed Proxy that builds CSS `var()` / `hsl()` strings for the accent color and its color set. It is NOT a `chroma.Color` — use `jam.accolor` for that.

Each index `jam.ac[n]` returns a builder function for color set index `n`:

```javascript
jam.ac(); // → 'var(--jam-ac-color)'
jam.ac[0](); // → 'var(--jam-ac-color-01)' — first color-set entry
jam.ac[0](1, 1, '85%'); // → 'hsl(...)' — accent color at 85% lightness
jam.ac[2](1, 0.5, jam.lumiO(44)); // → color set[2], half saturation, lumi-adjusted
jam.ac[3](1, 1, 0.8, 0.5); // → set[3], 80% lightness, 50% alpha
```

### Theme token color builders

Theme modules use the token-aware equivalents exported by `@jam/jam-ui`: `acToken`, `colorTextToken`, `acLumiOPart`, `hslToken`, `lumiOPart`, and `surfaceToken`. They keep the same accent/color-set adaptation as `jam.ac`, while also retaining a `.build()` function for resolving a token against an active theme or swatch.

```javascript
import { acLumiOPart as acLumiO, acToken as ac, colorTextToken as colorText, hslToken as hsl, lumiOPart as lumiO, surfaceToken as surface } from '@jam/jam-ui';

const primary = ac();
const secondary = ac[1]();
const foreground = colorText[0]();
const onPrimary = hsl(0, 0, acLumiO(1));
const neutralSurface = surface(46);
```

`surfaceToken(level, bias?, alpha?)` creates a low-chroma, accent-aware surface using the `lumiO` scale. Use these builders in `sys.color`; use `jam.ac` for runtime style expressions. The semantic families, state names, and generated CSS variables are documented in [Theme Color](Theme/color.md).

### `onac` — style-string shorthand

`onac` is a convenience shorthand usable inside style strings (e.g. `css(color:onac)`). It is NOT a `jam.*` JS API — `replaceTokenValue()` delegates it to the color fallback, which calls `buildAcLumiTextVar()` to produce an accent-adapted text color.

The equivalent JS API is `jam.acLumiText(level)` or `jam.getAcLumiText(color, level)`.

```javascript jaml-playground
export default {
    type: 'button',
    cap: 'Adaptive contrast',
    styles: ['css(background:ac;color:onac)']
}
```

The equivalent JavaScript value is `jam.acLumiText(1)` (or `jam.getAcLumiText(color, 1)`).

### `jam.acLumiO(level)` / `jam.acLumiO[n](level)`

Returns a CSS `calc(...)` lightness component whose direction follows the active accent, or color-set entry `n`. Use it as the lightness argument inside `jam.hsl(...)`. It adapts lightness orientation only; it does not supply the accent hue or saturation. There is no `acLumiO(N)` style-string shorthand.

```javascript
jam.hsl(0, 0, jam.acLumiO(1)); // neutral foreground oriented against the active accent
jam.hsl(0, 0, jam.acLumiO[2](1)); // oriented against color-set entry 2
```

### `jam.lumiText(level)`

Neutral gray at the given `lumiO` level — convenience for `hsl(0, 0%, lumiO(level))`. Does NOT accept a color; for color-aware text readability, use `jam.getAcLumiText(color, level)` or `jam.acLumiText(level)`.

```javascript
jam.lumiText(1); // near-white in dark mode, near-black in light mode
jam.lumiText(46); // dark gray in dark mode, light gray in light mode
// Equivalent to: jam.hsl(0, 0, jam.lumiO(level))
```

### `jam.acLumiText` / `jam.getAcLumiText` / `jam.getAcLumiO`

Neutral text colors at a given lumi step whose lightness orientation follows the active accent or supplied color. Like `lumiText(level)`, the result has no accent hue or saturation; the difference is how its lightness direction is chosen.

-   **`jam.acLumiText(level)`** — accent text at step `level`. Indexed version: `jam.acLumiText[n](level)` for color-set index `n`.
-   **`jam.getAcLumiText(color, level)`** — lumi-adapted text for any color at step `level`.
-   **`jam.getAcLumiO(color, level)`** — the underlying lumiO value adjusted for whether `color` is dark or light. Used internally by `getAcLumiText`.

```javascript
jam.acLumiText(5); // accent text at lumi step 5
jam.getAcLumiText(someColor, 3); // lumi-adapted text for any color at step 3
jam.getAcLumiO('#16213e', 1); // lumiO(1) adjusted for dark/light of given color
```

### `jam.lumiO` / `jam.lumiL` / `jam.lumiA`

**`jam.lumiO(level, bias?)`** — "O" = opposite. The general-purpose lightness function. Its sign auto-flips per dark mode so the same level value works in both themes without manual adjustment. Use it for backgrounds, surfaces, borders, and any color that needs to adapt to the current mode.

The optional `bias` string is appended to the calc expression for fine-tuning — e.g. `'+10%'` adds 10% to the result, `'* 1.2'` scales by 1.2.

```javascript
jam.lumiO(1); // base offset (light: +4.5%, dark: 106.5%)
jam.lumiO(46, '+10%'); // high level → dark in dark mode, light in light mode — good for card/surface backgrounds, with '+10%' bias

// Real-world usage in JAML:
style: 'background:' + jam.hsl(222, 0.48, jam.lumiO(46)); // dark card bg in dark mode
style: 'border-color:' + jam.hsl(218, 0.67, jam.lumiO(30)); // subtle border
```

**`jam.lumiL(level, bias?)`** — "L" = level. A separate lightness profile with different base/dev values from lumiO. Unlike lumiO, its values do NOT auto-flip sign in dark mode — the base starts at a different offset per mode but the deviation moves in the same direction. Use when you need a lightness scale independent of lumiO's opposite-mode behavior.

The optional `bias` string works the same as lumiO's bias.

```javascript
jam.lumiL(1); // light: ~25.5%, dark: ~-10.5%
jam.lumiL(5, '+10%'); // further offset, with '+10%' bias
```

**`jam.lumiA(level)`** — Alpha values for semi-transparent overlays that adapt to mode.

```javascript
jam.lumiA(1); // base alpha (light: 0.01, dark: 0.26)
jam.lumiA(5); // more opaque
```

### `jam.inDarkMode(el?)`

Check if an element (or document body) is in dark mode.

```javascript
jam.inDarkMode(); // → boolean — global
jam.inDarkMode(myElement); // → boolean — per-element
```

### `jam.lumiText(level)`

Neutral gray at the given `lumiO` level. Same as above — listed here for grouping with the other lumi functions.

### `jam.colorSetVars`

CSS custom property names for each color in the set. Useful for referencing colors in stylesheet rules.

```javascript
jam.colorSetVars; // → ['var(--jam-ac-color-01)', 'var(--jam-ac-color-02)', ...]
```

### Semantic colors

Predefined named colors that auto-adapt to the accent theme:

```
'primary', 'secondary', 'tertiary', 'quaternary',
'success', 'pass', 'fail', 'danger', 'warn', 'info',
'cta', 'normal', 'error', 'warning', 'mute', 'disable'
```

```json jaml-playground
{
    "type": "button",
    "cap": "Success",
    "color": "success"
}
```

---

## ColorProfile configuration

`ColorProfile` controls how the accent color generates the color set. Configure globally before rendering.

| Property                          | Type          | Default      | Description                               |
| --------------------------------- | ------------- | ------------ | ----------------------------------------- |
| `ColorProfile.count`              | `number`      | `10`         | Number of colors in the color set         |
| `ColorProfile.defaultColorScheme` | `ColorScheme` | `sequential` | Default scheme for new profiles           |
| `ColorProfile.acFix`              | `number`      | `0.18`       | Lightness fix factor for the accent color |
| `ColorProfile.setFix`             | `number`      | `0.09`       | Lightness fix factor for the color set    |

When a generated color is fixed for dark mode, JAM-UI applies the lightness correction and then slightly desaturates the result. Light-mode correction changes only lightness.

```javascript
ColorProfile.count = 6; // smaller color set
ColorProfile.defaultColorScheme = 'pastel'; // default to pastel
```

---

## ColorSet API

`jam.colorSet` is a `ColorSet` instance — an `Array<chroma.Color>` with extra methods.

### Instance methods

| Method                                             | Description                                                                                   |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `colorSet.toCSS()`                                 | Return array of CSS color strings                                                             |
| `colorSet.tune(tuner)`                             | Apply a named preset or callback and return a new normalized `ColorSet`                       |
| `colorSet.tune(chromaFactor, lightnessPull?, chromaFloor?)` | Apply a relative OKLCH transform and return a new `ColorSet`                         |
| `colorSet.toneDown(darkMode, lumi?, chroma?)`      | Mute all colors toward a target lightness and chroma. Returns a new `ColorSet`                |
| `colorSet.level(key, target, threshold?, factor?)` | Normalize a color property (e.g. `'oklch.l'`) toward a target value. Returns a new `ColorSet` |

### Instance properties

| Property                     | Type      | Description                                                                        |
| ---------------------------- | --------- | ---------------------------------------------------------------------------------- |
| `colorSet.averageChroma`     | `number`  | Mean chroma across all colors                                                      |
| `colorSet.averageLuminance`  | `number`  | Mean OKLCH lightness                                                               |
| `colorSet.luminanceVariance` | `number`  | Variance of OKLCH lightness                                                        |
| `colorSet.monotune`          | `boolean` | True if all colors have near-identical hue (variance < 10°)                        |
| `colorSet.on`                | `Proxy`   | Generates readable text colors for semantic colors, e.g. `jam.colorSet.on.success` |

### `colorSet.getVariance(key, target?)`

Get mean, variance, and standard deviation for any color property.

```javascript
const [mean, variance, stdDev] = jam.colorSet.getVariance('oklch.l');
```

### `ColorSet.from(iterable)`

Create a `ColorSet` from any iterable or array-like collection of `ColorType` values. Every entry is normalized to a `chroma.Color`.

```javascript
const colors = ColorSet.from(['red', '#2563eb', chroma('gold')]);
```

---

## How the lumi system works (deep dive)

Lumi uses **two profiles** — one for light mode, one for dark. Each profile has 4 config values that follow a `base + dev * level` formula:

```
light mode:
  lumiO(level) =   4.5% + 2.0% × level   ← base + dev, both flip in dark mode
  lumiL(level) =  24.0% + 1.5% × level   ← separate profile, does NOT flip like lumiO
  lumiA(level) =   0.01 + 0.01 × level   ← alpha for overlays

dark mode:
  lumiO(level) = 106.5% − 2.0% × level   ← base/dev flip sign — opposite direction
  lumiL(level) = -12.0% + 1.5% × level   ← base shifts, dev stays same direction
  lumiA(level) =   0.26 + 0.01 × level   ← alpha for overlays
```

These values are injected as CSS custom properties on every element that calls `applyLumi()`. `--jam-lumi-o-base` and `--jam-lumi-o-dev` contain the active mode's values. Both mode profiles are also available at the same time through `--jam-lumi-o-base-lt`, `--jam-lumi-o-dev-lt`, `--jam-lumi-o-base-dk`, and `--jam-lumi-o-dev-dk`. All JAM-UI elements auto-apply lumi on connection.

> **Key insight:** `lumiO` = "opposite" — **low levels are the most opposite.** `lumiO(1)` yields near-white in dark mode and near-black in light mode. As level increases, you move away from the opposite toward the mode's natural background: high levels (40–50) produce dark colors in dark mode and light colors in light mode. Always use values in the **1–50** range.
>
> **Foreground vs background:** For readable text on a surface, use contrasting `lumiO` levels — a small level for the foreground (e.g. `lumiO(1)`) against a large level for the background (e.g. `lumiO(46)`). The auto-flip ensures both adapt correctly in either mode.
>
> **`lumiL`** is a separate profile whose base values differ per mode but whose deviation direction does NOT flip — unlike `lumiO` where both base and deviation flip sign. It exists for cases that need a different lightness scale than `lumiO`.

---

## Putting it together

```javascript jaml-playground
export default {
    type: 'wrapper-vertical',
    components: [
        {
            type: 'button-cta',
            cap: 'Accent colored',
            // Uses accent color — auto-adapts to dark mode
            color: jam.accolor
        },
        {
            type: 'tags',
            cap: 'Color set swatch',
            template: { type: 'input-color', value: '{value}' },
            // Each indicator uses a different color from the set
            data: jam.colorSet.toCSS()
        },
        {
            type: 'input-color',
            cap: 'Change accent',
            value: jam.accolor,
            onvaluechange: function (v) {
                jam.accolor = v; // updates entire UI palette
            }
        }
    ]
};
```

## System theme and saved choices

`jam.setAccentColor('system')` stores the symbolic system choice and resolves its color when the theme starts. The theme panel offers System, Random, and Theme color buttons. Changing accent color or color set clears the selected swatch marker; selecting the swatch again reapplies its accent color, color set, and dark-mode defaults.

`jam.SystemTheme.getDarkMode()` and `jam.SystemTheme.getAccentColor()` are the host integration methods. `jam.getSystemDarkMode()` and `jam.getSystemAccentColor()` delegate to them. The accent method returns a Chroma color. Electron reads the preload bridge's `getSystemTheme()` snapshot. Browsers use `prefers-color-scheme` and CSS `AccentColor`, falling back to an adjusted `Highlight`; that fallback may differ from the OS accent.

An embedding host may override the two methods, then call `jam.setDarkMode('auto')` when its automatic mode changes and `jam.refreshSystemAccentColor()` on accent changes. The latter updates only an active system accent choice. The JAML IDE preview follows IDE theme changes through these methods. Explicit preview theme choices remain effective.
