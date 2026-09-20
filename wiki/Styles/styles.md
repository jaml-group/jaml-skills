# JAML Styles

The style system in JAM-UI is a plugin-based declarative styling layer. Styles are applied as an ordered array — the order matters, and styles can be reverted or toggled.

Styles are resolved against the global `Styles` object using dot-path strings. A style is a named, revertable set of plugins that mutate the DOM: setting CSS properties, inserting stylesheet rules, adding classes, creating layers, or running arbitrary logic.

## Choose a styling entry point

| Intent | Entry point |
|---|---|
| Name a region's semantic responsibility | [`stylize`](../Theme/stylize.md) |
| Select a theme's alternate recipe | [`variant`](../Theme/stylesheets.md#variant-selectors) |
| Set a few local CSS declarations | Singular `style` or [`css(...)`](./common/css.md) |
| Add a reusable treatment or interaction | A documented entry in `styles`, such as `with.tint`, `group.bento`, or `interact.sortable` |
| Style descendants or theme role contexts | `descStyles` or the theme `styles` map |
| Attach behavior through `Plugins` | [Plugin selection](../Plugins/plugins.md#choose-an-entry-point) |

Styles can own behavior, listeners, and layers as well as CSS. Use the public style that owns the feature before constructing its internal engine. Arguments and cleanup belong to that style's detail page. For theme-dependent values, follow [token consumption](../Theme/tokens.md#consuming-tokens).

---

## The `style` param

**Type:** `string | Dictionary`

The singular `style` param applies native inline CSS directly to the element. It accepts either a CSS declaration string or a dictionary with camel-cased property names, and supported bare values receive [property-aware token replacement](./common/css.md#property-aware-token-values). It does not resolve JAML style paths or participate in the revertable `StyleStack`; use the plural `styles` param for those.

```javascript jaml-playground
export default {
  type: 'wrapper',
  components: [
    {
      type: 'label',
      cap: 'CSS string',
      style: 'font-size:1.5rem;font-weight:700'
    },
    {
      type: 'label',
      cap: 'CSS dictionary',
      style: {
        fontSize: '1.25rem',
        fontWeight: 600
      }
    }
  ]
}
```

Because `style` writes inline declarations, a scoped state rule such as `hover(...)` cannot override the same property. When the base value needs a state override, put it in the `styles` array with `css(method:rule;...)`; see [State overrides and `method:rule`](./common/css.md#state-overrides-and-methodrule).

---

## The `styles` param

Every JAM-UI element and JAML component accepts a `styles` array. Each entry is a `StyleOption`. JSON uses string paths; JavaScript can also use style builder references or results, functions, `IStyle` values, and anonymous style descriptors. Native CSS dictionaries belong in singular `style`, not `styles`.

```json jaml-playground
{
  "type": "button",
  "cap": "Styled",
  "styles": [
    "hover.brighter",
    "animation.entry.frombottom(delay:100;duration:300)"
  ]
}
```

---

## `StyleOption` formats

Each entry in the `styles` array can be written in any of these forms. Use string paths in JSON; JavaScript additionally supports factory calls, builder references, functions, `IStyle` values, and object literals for custom one-off styles.

| Format | Type | Description | Notes |
|---|---|---|---|
| String path | `string` | Dot-path to a style on the `Styles` global | Leading `Styles.` prefix can be omitted. No args |
| String path with args | `string` | Dot-path with semicolon-separated args in parentheses | `"path.to.style(key:val;key2:val2)"`. Args auto-cast to declared types |
| Literal object string | `string` | Dot-path with a JS object literal as args | `"path.to.style({key:\"val\"})"`. Parsed at runtime |
| `IStyle` object | `IStyle` | A pre-built `Style` instance | Returned by `Styles.path.to.style(args)` |
| Factory call | `Function` | A style builder called with args | `Styles.hover.brighter({ b: 1.05 })` — JS only |
| Builder reference | `Function` | A style builder passed directly (no call) | `Styles.hover.brighter` — when no args needed, JS only |
| Plain function | `Function` | `(el) => void` | Called with the element during apply |
| Object literal | `object` | `{ desc, plugins }` | JS only. Inline anonymous style descriptor; not a CSS declaration dictionary |

The `{ desc, plugins }` form describes an anonymous plugin-backed style for the `StyleStack`. It is not a native CSS dictionary such as `{ fontSize: '1.5rem' }`; put that dictionary in singular `style`.

```javascript jaml-playground
export default {
  type: 'button',
  styles: [
    'hover.brighter',                                      // string path
    Styles.animation.entry.frombottom({ delay: 100 }),    // factory call
    { desc: 'Custom', plugins: [Styles.css({ letterSpacing: '0.05em' })] } // object literal
  ]
}
```

---

## String style format

```
"namespace.name"
"namespace.name(key:value;key2:value2)"
```

Arguments are semicolon-separated key-value pairs inside parentheses. Types are inferred automatically.

```json jaml-playground
{
  "type": "label",
  "cap": "Animated label",
  "styles": [
    "size.fullwidth",
    "layout.overflow(animaDelay:400)",
    "animation.entry.frombottom(delay:seq(25,100);easing:bouncing;distance:5rem;duration:400)"
  ]
}
```

Arguments are semicolon-separated key-value pairs inside parentheses. Types are inferred automatically from the style's registered arg profiles. Values are cast: numbers, booleans, arrays `[a,b,c]`, and nested objects are all supported.

> **`delay` and `duration` helpers:** `seq(per, offset)` and `random(min, max)` provide staggered and randomized timing. See [Animation](./animation.md#delay-and-duration-helpers) for full details, along with the easing names table.

---

## CSS styles

### `css` — inline CSS (always available)

Apply arbitrary CSS properties directly to the element. Accepts a semicolon-separated CSS string or a key-value dictionary. **This is the universal fallback** — if no pre-built style variant does what you need, `css()` always works. Works on any element (all extend `HTMLElement`).

```json jaml-playground
{
  "type": "button",
  "cap": "Custom CSS",
  "styles": ["css(padding:1rem 2rem;border-radius:12px;font-weight:bold)"]
}
```

```javascript jaml-playground
export default {
  type: 'wrapper',
  styles: [
    Styles.css({
      padding: '1.5rem',
      backgroundColor: 'hsl(0 0% 96%)',
      borderRadius: '0.5rem'
    })
  ]
}
```

### State-prefixed CSS

Each is a standalone function (not nested under `css`). They accept arbitrary CSS key-value pairs and apply only when the element matches the corresponding state.

| Function | Type | Description | Notes |
|---|---|---|---|
| `css(key:val;...)` | `string` | Always applied | Base element styling |
| `hover(key:val;...)` | `string` | Applied on `:hover` | — |
| `active(key:val;...)` | `string` | Applied on `:active` | — |
| `focus(key:val;...)` | `string` | Applied on `:focus` | — |
| `disabled(key:val;...)` | `string` | Applied when `:disabled` or `[disabled]` | — |
| `checked(key:val;...)` | `string` | Applied when `:checked` or `[checked]` | — |
| `indeterminate(key:val;...)` | `string` | Applied when `:indeterminate` | — |
| `before(key:val;...)` | `string` | Applied to `::before` pseudo-element | — |
| `after(key:val;...)` | `string` | Applied to `::after` pseudo-element | — |

Plain `css(...)` writes inline declarations too. If a state variant sets the same property, use `method:rule` on the base style so both declarations are scoped rules and the state selector can win.

```json jaml-playground
{
  "type": "button",
  "cap": "Interactive",
  "styles": [
    "css(method:rule;background:hsl(0 0% 93%);transition:all 0.2s)",
    "hover(background:hsl(0 0% 87%);transform:scale(1.02))",
    "active(background:hsl(0 0% 80%);transform:scale(0.98))"
  ]
}
```

### `Styles.stylesheet` — inject CSS rules

For cases where `css()` inline styles aren't enough, `Styles.stylesheet` injects `<style>` rules into the document. Supports pseudo-elements, `@keyframes`, media queries, and complex selectors that inline CSS can't express.

```javascript jaml-playground
export default {
  type: 'button',
  cap: 'Animated',
  styles: [
    Styles.stylesheet({
      '&::after': { content: '" →"', transition: 'opacity 0.3s' },
      '&:hover::after': { opacity: 1 }
    })
  ]
}
```

Use `css()` for simple inline properties. Use `Styles.stylesheet` when you need `::before`/`::after`, animations, or nested selectors. For media queries, use compiled CSS text with concrete selectors inside the at-rule: dictionary conversion flattens nested selectors, and scoping does not rewrite a nested `&` inside an at-rule. Keep properties that must change at a breakpoint in stylesheet rules rather than overriding them with inline `css()` declarations.

---

## Common styles

Common styles are CSS-property wrappers accessible under their namespace on the `Styles` object. Categories include layout, size, flex/grid, spacing (margin/padding/gap), visual (background/border/text/shadow/filter), slot targeting, and utilities (hide/show/clazz/attrs/sync).

See the individual docs for full args and examples:

| Category | Doc |
|---|---|
| Layout | [common/layout](./common/layout.md) |
| Size | [common/size](./common/size.md) |
| Flex | [common/flex](./common/flex.md) |
| Grid | [common/grid](./common/grid.md) |
| Align | [common/align](./common/align.md) |
| Margin | [common/margin](./common/margin.md) |
| Padding | [common/padding](./common/padding.md) |
| Gap | [common/gap](./common/gap.md) |
| Background | [common/background](./common/background.md) |
| Border | [common/border](./common/border.md) |
| Text | [common/text](./common/text.md) |
| Shadow | [common/shadow](./common/shadow.md) |
| Color | [common/color](./common/color.md) |
| Filter | [common/filter](./common/filter.md) |
| Hide / Show | [common/hide](./common/hide.md) |
| Icon | [common/icon](./common/icon.md) |
| Mask | [common/mask](./common/mask.md) |
| Outline | [common/outline](./common/outline.md) |
| Agent | [common/agent](./common/agent.md) |
| Clazz | [common/clazz](./common/clazz.md) |
| Trait | [common/trait](./common/trait.md) |
| Cap | [common/cap](./common/cap.md) |
| Value | [common/value](./common/value.md) |
| Attrs | [common/attrs](./common/attrs.md) |

---

## Interaction styles

Interaction styles add behavior on hover, click, check, or mount. See the individual docs for full args and examples:

| Category | Doc | Description |
|---|---|---|
| `hover.*` | [hover](./hover.md) | Frame, shade, crosshair, parallax, brighter, spotlight, etc. |
| `check.*` | [check](./check.md) | Checked-state visual indicators (frame, shade, underscore, pipe) |
| `interact.*` | [interact](./interact.md) | Movable, resizable, closable, zoomable, panNZoom, etc. |
| `click.*` | [click](./click.md) | toFront, able, bouncing |
| `auto.*` | [auto](./auto.md) | adjustFont, focus, badge, moveAlong, hideIf, etc. |

---

## Animation & Layer Styles

Brief overviews with links to detailed docs.

### Animation

Entry and exit animations with configurable easing, delay, and distance — plus FLIP child animations and the full easing names table. See [Animation](./animation.md).

### Layer styles

DOM nodes inserted into the shadow root's `<slot name="layer">` — rendered below the element's content as backgrounds, decorations, or visual effects. See the [layer overview](./layers/layer.md) for architecture, rules, and the full 16-layer reference.

> **Host positioning:** Layers are absolute-positioned — the host must have `position: relative` (or `absolute`). **Order:** sizing/padding first, layer last. **Spinner/scroller sizing:** circular effects need a square target with equal `width`/`height`.

### Group

Child-group presentation presets such as bento, gridline, alternating rows, and dividers. See [group](./group.md).

### Theme & ECharts

Theme styles (`theme.light`, `theme.dark`) and full ECharts chart/component styling. See [echarts](./echarts.md).

### Element-specific styles

Each element has its own style variants (e.g. `button.cta`, `indicator.tweening`, `table.stripy`). See the [element-style docs](#element-specific-styles) in the reference below.
## Scoped style params

Beyond the `styles` array (which targets the element itself), JAML provides scoped params whose selectors are resolved relative to an element. Most target its subtree; dictionary `descStyles` can also target the owning element with `:scope`. All are resolved at mount time and scoped to the component's unique selector so they don't leak.

| Param | Type | Description | Notes |
|---|---|---|---|
| `childStyles` | `StyleOption[] \| { [selector]: StyleOption[] }` | Styles applied to direct children | Array form targets `:scope > *`. Dict form: keys are child selectors |
| `descStyles` | `StyleOption[] \| { [selector]: StyleOption[] }` | Scoped styles for descendants or the owning element | Array form targets `*`. Dict form: plain selectors target descendants; `:scope` targets the owner |
| `optionStyles` | `StyleOption[]` | Styles applied to option children | Targets `:scope > .jam-option` |
| `[name]Styles` | `StyleOption[]` | Custom selector derived from the key name | e.g. `buttonStyles` targets `button`, `.fooStyles` targets `.foo` |
| `globalStyles` | `{ [selector]: StyleOption[] }` | Styles registered globally | No element scope — applies to every matching element in the document |
| `stateStyles` | `{ [state]: StyleOption[] }` | Styles applied when element is in that state | Merged into `states` |

```javascript jaml-playground
export default {
  type: 'container',
  descStyles: {
    'wrapper': ['layout.alignlabel'],
    'table,tags,input': ['animation.entry.frombottom(delay:seq(50,100))']
  }
}
```

**Selector patterns for `descStyles`:** Dictionary keys support CSS-like selectors targeting JAML element types, attributes, and pseudo-elements. They pass through `Styles.refineSelector()`, so a key such as `list-legend > item` resolves to the role/variant selector `.jam-list-style[jam-variant="legend"] > .jam-item-style` relative to the owning element. Plain selectors target descendants of the element that owns `descStyles`; prefix the selector with `:scope` to target the owning element itself.

This shorthand belongs to the `descStyles` dictionary and theme `index.mjs` `styles` object. Raw CSS/SCSS does not run `refineSelector()` and must use the literal runtime selector.

```javascript jaml-playground
export default {
  type: 'container',
  state: 'active',
  descStyles: {
    // :scope — targets this container host
    ':scope[state=active]': ['color.primary'],
    // Bare element name — targets all wrappers
    'wrapper': ['layout.alignlabel'],
    // Element type selector — targets jam-input inside .branch-item
    '.branch-item jam-input': ['agent.css(borderRadius:0.4rem)'],
    // Attribute selector — specific input subtype
    '.branch-item jam-input[type=textarea]': ['agent.css(minHeight:4rem)'],
    // Pseudo-element
    '.branch::after': ['css(content:"";display:block;width:100%;height:1px)'],
    // Class selector
    '.port.in': ['css(backgroundColor:green)'],
    // Compound selector
    'table,tags,input': ['animation.entry.frombottom(delay:seq(50,100))']
  }
}
```

> **Performance tip:** `childStyles`, `descStyles`, and `[name]Styles` use CSS rules injected into a scoped stylesheet — they're more performant than inline `css()` on each element. Prefer these for bulk child styling, especially with animation delays (`seq()`).

---

### Slot styling

Target named slots on an element using dot-path notation. Works with any style function:

```json jaml-playground
{
  "type": "button",
  "cap": "Styled",
  "icon": "★",
  "styles": [
    "icon.css(size:1.5rem;color:gold)",
    "cap.css(font-weight:bold)",
    "cap.hover(text-decoration:underline)"
  ]
}
```

Common slot paths: `icon.css(...)`, `cap.css(...)`, `cap.text(...)`, `label.css(...)`, `extra.css(...)`, `value.css(...)`, `agent.css(...)`. Any slot name on the element works.

---

## `Styles.*` methods

Direct style builder functions available on the `Styles` global. These are the building blocks used by all pre-built styles — use them directly for one-off custom styling.

### Inline style methods

| Method | Description | Notes |
|---|---|---|
| `Styles.css({...})` | Set inline CSS properties | Accepts a JS object. String form: `"css(key:val;...)"` |
| `Styles.props({...})` | Set inline CSS properties | Uses the same property-aware token and color resolution as `css()` |
| `Styles.vars({...})` | Set CSS custom properties | Keys auto-prefixed with `--jam-*` based on the style path |
| `Styles.attrs({...})` | Set HTML attributes | `{ 'data-testid': 'foo' }` |
| `Styles.clazz(name)` | Add a raw class | Adds `jam-{name}` unless the name already starts with `jam-` |
| `Styles.with(type)` | Add a positive trait class | Adds `jam-with-{type}` |
| `Styles.no(type)` | Add a negative trait class | Adds `jam-no-{type}` |
| `Styles.on(type)` | Add a surface-context trait class | Adds `jam-on-{type}` |
| `Styles.rule({...})` | Inject a CSS rule into the element's scoped stylesheet | Supports full CSS selectors, pseudo-elements |
| `Styles.stylesheet(css)` | Inject a `<style>` block | For `@keyframes`, media queries, complex selectors. JS only |

See [common.trait](./common/trait.md) for element-scoped `*.is(...)` and the built-in `with.*` and `on.*` treatments.

### ECharts methods

| Method | Description | Notes |
|---|---|---|
| `Styles.eopts({...})` | Pass raw ECharts option objects | Merged into chart options before `setOption()` |
| `Styles.eseries([...])` | Pass series-level ECharts options | Shorthand wrapping `option.series` |
| `Styles.efuncs(fn)` | Run a function before `setOption()` | Receives `(chart, args)`. Installs one stable callback and removes it from chart config on unplug; a normal function receives the plugin as `this` |

### Custom style methods

| Method | Description | Notes |
|---|---|---|
| `Styles.func(plugFn, unplugFn?)` | Run arbitrary code on plug/unplug | The most flexible escape hatch |
| `Styles.resize(fn)` | Run code after stable mount and on element resize | Receives `(el, args, event?)`; the initial call has no event, resize events supply it, and the listener is removed on unplug |
| `Styles.child(el)` | Append a child element | Created on plug, removed on unplug |
| `Styles.params({...})` | Set element params via styles | Calls `setParams()` on plug |
| `Styles.opts({...})` | Pass options to a parent plugin | Used internally by ECharts and layer builders |
| `Styles.expando({...})` | Define expando properties on the element | Read-only properties accessible as `el.key` |
| `Styles.addChild(node)` | Append a DOM node | Alias for `child` |

### Registration & global styles

| Method | Description | Notes |
|---|---|---|
| `Styles.global` | User-extensible global style container | `Styles.global.myStyle = ...` |
| `Styles.register(name, styles, selector?)` | Register a global style | Applies to all matching elements in the document |
| `Styles.unregister(selector)` | Remove a registered global style | — |
| `Styles.registerPlugin(path, option)` | Register a custom style plugin | Makes it available via string path |
| `Styles.refineSelector(sel, parent?)` | Refine a JavaScript selector key | Used by theme `styles` and scoped selector dictionaries; does not transform raw CSS/SCSS |

Global registration honors a style plugin's `selector` argument or content key. For example, `css(selector:& > .item;color:primary)` scopes the generated rule relative to the selector registered by `Styles.register(...)`; `selector` controls routing and is not emitted as a CSS declaration.

**Custom style plugin example:**

```javascript
Styles.registerPlugin('my.title', {
  desc: 'Title style',
  args: { fontSize: { desc: 'Font size', type: 'string', default: '1.8rem' } },
  plugins: [
    Styles.css({ display: 'flex', alignItems: 'center', gap: '0.5rem' }),
    (args) => Styles.label.cap.css({ fontSize: args.fontSize, fontWeight: 'bold' })
  ]
})

// Now usable via string path:
// { type: 'label', cap: 'Title', styles: ['my.title(fontSize:2rem)'] }
```

### Template & builder

| Method | Description | Notes |
|---|---|---|
| `Styles.style(option)` | Build a `Style` from a `StyleParam` | Low-level factory. Prefer `Styles.registerPlugin()` for reusable public style paths |
| `Styles.builder` | Gradient builder utilities | `GradientBuilder` module (stripy, grid, chess, bubbles, comet) |

```json jaml-playground
{
  "type": "wrapper",
  "childStyles": ["size.fullsize", "layout.overflow(hidden)"]
}
```

---

## `IStyle` interface

```typescript
interface IStyle {
  desc:     string
  comment?: string
  plugins:  AbstractPlugin[]
  path?:    string[]

  mergeWith(style: IStyle): this
  applyTo(target: any, revertable?: boolean | string): Dictionary
  revert(target: any): void
}
```

---

## Authoring a custom style

### Plain object style

```javascript
const myStyle = {
  desc: 'My glow effect',
  plugins: [myGlowPlugin],
  applyTo(el) { this.plugins.forEach(p => p.plug(el)) },
  revert(el)  { this.plugins.forEach(p => p.unplug(el)) },
  mergeWith(other) { return { ...this, plugins: [...this.plugins, ...other.plugins] } }
}

// { type: 'button', styles: [myStyle] }
```

### Using `style()` builder

```javascript
import { style } from 'jam-ui'

const myGlow = style({
  desc: 'Golden glow',
  args: { intensity: { desc: 'Glow intensity', type: 'number', default: 5 } },
  plugins: [
    func((el, args) => {
      el.style.boxShadow = `0 0 ${args.intensity * 2}px gold`
    }, (el) => {
      el.style.boxShadow = ''
    })
  ]
})

// Register globally
Styles.global.myGlow = myGlow

// Use: { type: 'button', styles: ['global.myGlow(intensity:10)'] }
```

---

## `StyleStack`

`StyleStack` is the internal structure that tracks active styles on an element. You can access it via `element.styleStack` for advanced use:

```javascript
// Apply a revertable style group
el.applyStylesSync('highlight', ['hover.brighter', 'border(width:2px;color:gold)'])

// Revert it later
el.revertStyles('highlight')

// Toggle it
el.toggleStyles('highlight', ['hover.brighter'])
```

---

## Style reference

Detailed documentation for every style category:

### Root styles

| Category | Doc | Description |
|---|---|---|
| `hover.*` | [hover](./hover.md) | Hover-triggered visual effects |
| `interact.*` | [interact](./interact.md) | Drag, resize, close, zoom behaviors |
| `auto.*` | [auto](./auto.md) | Automatic behaviors on mount/data change |
| `group.*` | [group](./group.md) | Child-group presentation presets |
| `click.*` | [click](./click.md) | Click-triggered behaviors |
| `check.*` | [check](./check.md) | Checked-state visual indicators |
| `sync.*` | [sync](./sync.md) | Dimension synchronization |
| `animation.*` | [animation](./animation.md) | Entry, exit, and FLIP animations |

### Layer styles

| Category | Doc | Description |
|---|---|---|
| `layer.spinner.*` | [layers/spinner](./layers/spinner.md) | Animated spinner/loader effects |
| `layer.scroller.*` | [layers/scroller](./layers/scroller.md) | Auto-scrolling background effects |
| `layer.canvas.*` | [layers/canvas](./layers/canvas.md) | Canvas particle effects |
| `layer.follower.*` | [layers/follower](./layers/follower.md) | Cursor-following decorative effects |
| Loading indicators | [layers/loader](./layers/loader.md) | Public spinner layers and loading-state ownership |
| `layer.glare.*` | [layers/glare](./layers/glare.md) | Light glare and reflections |
| `layer.watermark.*` | [layers/watermark](./layers/watermark.md) | Watermark and icon overlays |
| `layer.ribbon.*` | [layers/ribbon](./layers/ribbon.md) | Corner ribbon decorations |
| `layer.combo.*` | [layers/combo](./layers/combo.md) | Composite spinner/masked combos |
| `layer.chart` | [layers/chart](./layers/chart.md) | ECharts integration layer |
| `layer.background` | [layers/background](./layers/background.md) | Background layer |
| `layer.border` | [layers/border](./layers/border.md) | Border layer |
| `layer.css` | [layers/css](./layers/css.md) | Arbitrary CSS layer |
| `layer.crosshair` | [layers/crosshair](./layers/crosshair.md) | Mouse-following crosshair |
| `layer.overlay` | [layers/overlay](./layers/overlay.md) | Semi-transparent overlay |

### ECharts styles

| Category | Doc | Description |
|---|---|---|
| `echarts.*` | [echarts](./echarts.md) | ECharts chart and component styles |

### Common atomic styles

| Category | Doc | Description |
|---|---|---|
| `background.*` | [common/background](./common/background.md) | Semantic colored/surface backgrounds and extended effects |
| `css.*` | [common/css](./common/css.md) | Arbitrary CSS, state prefixes, and property-aware token values |
| `text.*` | [common/text](./common/text.md) | Font and text styling |
| `size.*` | [common/size](./common/size.md) | Element sizing |
| `layout.*` | [common/layout](./common/layout.md) | CSS layout properties |
| `border.*` | [common/border](./common/border.md) | Border, border-radius, and semantic width styling |
| `shadow.*` | [common/shadow](./common/shadow.md) | Box-shadow and text-shadow presets |
| `color.*` | [common/color](./common/color.md) | Foreground, `on.*` contrast presets, and HSL color adjustments |
| `flex.*` | [common/flex](./common/flex.md) | Flexbox container |
| `grid.*` | [common/grid](./common/grid.md) | CSS grid |
| `align.*` | [common/align](./common/align.md) | Flexbox alignment |
| `margin.*` | [common/margin](./common/margin.md) | Margin |
| `padding.*` | [common/padding](./common/padding.md) | Padding |
| `gap.*` | [common/gap](./common/gap.md) | Row and column gap |
| `filter.*` | [common/filter](./common/filter.md) | CSS filter |
| `hide` / `show` | [common/hide](./common/hide.md) | Visibility toggle |
| `icon.*` | [common/icon](./common/icon.md) | Icon customization |
| `mask.*` | [common/mask](./common/mask.md) | CSS mask |
| `outline.*` | [common/outline](./common/outline.md) | Outline |
| `agent.*` | [common/agent](./common/agent.md) | Internal agent element styling |
| `clazz` | [common/clazz](./common/clazz.md) | Raw CSS class helper |
| `is` / `with` / `no` / `on` | [common/trait](./common/trait.md) | Semantic trait class helpers |
| `cap.*` | [common/cap](./common/cap.md) | Caption-slot and caption-role helpers |
| `value.*` | [common/value](./common/value.md) | Value-slot and input value helpers |
| `attrs` | [common/attrs](./common/attrs.md) | HTML attribute setting |

### Element-specific styles

| Element | Doc |
|---|---|
| `badge.*` | [badge-style](./badge-style.md) |
| `button.*` | [button-style](./button-style.md) |
| `buttongroup.*` | [buttongroup-style](./buttongroup-style.md) |
| `calendar.*` | [calendar-style](./calendar-style.md) |
| `card.*` | [card-style](./card-style.md) |
| `chart.*` | [chart-style](./chart-style.md) |
| `container.*` | [container-style](./container-style.md) |
| `datepicker.*` | [datepicker-style](./datepicker-style.md) |
| `element.*` | [element-style](./element-style.md) |
| `indicator.*` | [indicator-style](./indicator-style.md) |
| `input.*` | [input-style](./input-style.md) |
| `label.*` | [label-style](./label-style.md) |
| `locator.*` | [locator-style](./locator-style.md) |
| `map.*` | [map-style](./map-style.md) |
| `notify.*` | [notify-style](./notify-style.md) |
| `options.*` | [options-style](./options-style.md) |
| `popup.*` | [popup-style](./popup-style.md) |
| `progress.*` | [progress-style](./progress-style.md) |
| `select.*` | [select-style](./select-style.md) |
| `shortcuts.*` | [shortcuts-style](./shortcuts-style.md) |
| `switch.*` | [switch-style](./switch-style.md) |
| `table.*` | [table-style](./table-style.md) |
| `tags.*` | [tags-style](./tags-style.md) |
| `timepicker.*` | [timepicker-style](./timepicker-style.md) |
| `wrapper.*` | [wrapper-style](./wrapper-style.md) |
