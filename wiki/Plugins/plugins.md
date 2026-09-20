# JAML Plugins

Plugins attach behavior to an element through `plug(el)` and release their owned resources through `unplug(el)`. Public `Styles.*` recipes often compose plugins internally. The `styles` key resolves style entries through `Styles`; the `plugins` key resolves behavior entries through `Plugins`.

## Choose an entry point

| Need | Use first | Why / when to go deeper |
|---|---|---|
| Move or resize a card | [`interact.movable` / `interact.resizable`](../Styles/interact.md) in `styles` | Owns the drag setup; use [Damson](./dragndrop.md) directly for imperative control |
| Reorder children | [`interact.sortable`](./sortable.md) in `styles` | Owns ordering and teardown; movable alone does not reorder the collection |
| Pan/zoom a viewport | [`interact.panNZoom`](./pannzoom.md) in `styles` | Use the engine API when coordinating an external viewport |
| Hover depth or pointer-following treatment | [`hover.parallax`](./parallax.md), [`auto.moveAlong`](./move.md) | Select the style's documented args; an engine option is not automatically a style option |
| Limit visible scroll rows | [`interact.virtualScroll`](../Styles/interact.md#interactvirtualscroll) | Read the row sizing and scrolling contract before choosing a strategy |
| Tooltip or contextual help | [`popup.tip` / `popup.helper`](./popup.md) in `plugins` | Delegate within the containing region; check existing app-level installation before adding another |
| Observe child or visibility changes | [`observe.child` / `observe.intersection`](./observe.md) | Use when application logic needs observations rather than a visual treatment |
| Navigate route outlets | [`router` / `subRouter`](./router-plugins.md) | Router lifecycle owns route resources and nested outlets |
| Drag data between destinations | [`interact.draggable` / `interact.droppable`](./interact-plugins.md) in `plugins` | Distinct from moving the element's on-screen position |
| Build a reusable visual recipe | [`Styles.registerPlugin`](../Styles/styles.md#styles-methods) | Composes existing styles/plugins under a named style |
| Attach application behavior with explicit cleanup | `Plugins.registerPlugin` or an object with `plug` / `unplug` | Keep per-element state and clean up listeners, timers, and owned nodes |

## Lifecycle and ownership

AbstractElement plugs its configured plugins once during initial connection, before applying external and local styles. `addPlugin` plugs immediately; `removePlugin` unplugs; `destroy` unplugs configured plugins. A temporary DOM disconnection emits `unmount` and is not the same as destruction. Plain plugins that must pause and resume with attachment should subscribe to `mount` / `unmount` themselves and remove those listeners when unplugged.

Style-owned behavior follows its style's apply/revert lifecycle; some styles additionally use mount/unmount hooks. Read the owning style before mixing lifecycle mechanisms. Install an engine through one owner per target, especially when a style already creates and tears down that engine.

Static registry metadata is not exhaustive for every pass-through dictionary. Source-backed options for routers, drag engines, and arbitrary attributes can be valid even when an analyzer reports an unknown argument. Verify the implementation and runtime effect; do not invent arguments by analogy with another plugin.

---

## The `IPlugin` interface

```typescript
interface IPlugin {
  id:         string            // stable plugin-instance identity
  desc?:      string            // human-readable description
  comment?:   string            // additional notes
  args:       Dictionary        // configuration arguments
  path?:      string[]          // dot-path used for string lookup (e.g. ['popup', 'tip'])
  pluggerId?: string            // owning style identity when composed by a style

  plug(el: HTMLElement, args?: PluginArgs): any
  unplug(el: HTMLElement, args?: PluginArgs): any

  hasData(target: any): boolean
  getData(target: any, key?: string, fallback?: any): any
  removeData(target: any): any
}
```

`getData(target)` / `removeData(target)` let a plugin store private per-element state in the framework's per-target plugin-data store.

---

## The `plugins` param

Any element or JAML component accepts a `plugins` array. Entries are applied in order during initial element connection; see the lifecycle contract above.

### Plugin entry formats

| Format | Type | Description | Notes |
|---|---|---|---|
| String path | `string` | Dot-path to a plugin on the `Plugins` global | Leading `Plugins.` prefix can be omitted. No args |
| String path with args | `string` | Dot-path with semicolon-separated args | `"popup.tip(subTip:true;showDelay:200)"`. Literal arguments are parsed by the string parser |
| Plugin object literal | `object` | `{ plug, unplug }` | Inline anonymous plugin |
| Pre-built instance | `IPlugin` | A plugin instance | `Plugins.observe.child({})` |
| Factory call | `Function` | A plugin builder called with args | `Plugins.popup.tip({ subTip: true })` — JS only |

```json jaml-playground
{
  "type": "container",
  "plugins": [
    "popup.tip(subTip:true)",
    "observe.child"
  ]
}
```

```javascript jaml-playground
export default {
  type: 'container',
  plugins: [
    Plugins.popup.tip({ subTip: true }),
    Plugins.observe.child({}),
    {
      plug(el, args) { el.classList.add('custom-plugin') },
      unplug(el, args) { el.classList.remove('custom-plugin') }
    }
  ]
}
```

---

## Built-in plugins

All built-in plugins live on the global `Plugins` object, organized by namespace:

```
Plugins
  ├── popup          Tooltip, help, title, floating-tip popups
  ├── shortcut       Search and action shortcuts
  ├── event          Scroll progress tracking
  ├── interact       Drag-and-drop
  ├── observe        Mutation and intersection observers
  ├── composable     Dashboard grid composition
  ├── router         SPA routing
  ├── subRouter      Nested/passive route outlet
  └── global         User-extensible container
```

---

## `Plugins` namespace reference

Detailed documentation for each plugin namespace:

| Namespace | Variants | Doc |
|---|---|---|
| `popup.*` | `tip`, `floatingTip`, `title`, `helper` | [popup](./popup.md) |
| `shortcut.*` | `search` | [shortcut](./shortcut.md) |
| `event.*` | `scrollProgress` | [event](./event.md) |
| `interact.*` | `draggable`, `droppable` | [interact-plugins](./interact-plugins.md) |
| `observe.*` | `child`, `intersection` | [observe](./observe.md) |
| `composable.*` | `composable` | [composable-plugins](./composable-plugins.md) |
| `router` / `subRouter` | — | [router-plugins](./router-plugins.md) |

### `Plugins.registerPlugin(path, option)`

Register a plugin tree on the global `Plugins` object. `option` can contain a plugin param object (`desc`, `args`, `plug`, `unplug`) plus nested children.

```javascript
Plugins.registerPlugin('global.highlight', {
  desc: 'Highlight while plugged',
  args: { color: { type: 'string', default: 'hsl(45 100% 50%)' } },
  plug(el, args) {
    this.getData(el).background = el.style.background;
    el.style.background = args.color;
  },
  unplug(el) {
    el.style.background = this.getData(el).background;
    this.removeData(el);
  }
})
```

---

## Individual plugins

These are the underlying engines used by styles and global APIs. Documented for direct imperative use:

### Style-exposed plugins

| Plugin | Used by styles | Global | Doc |
|---|---|---|---|
| `PearPanNZoom` | `interact.panNZoom` | `pear.*` | [pannzoom](./pannzoom.md) |
| `DamsonDragNDrop` | `interact.movable`, `interact.resizable` | — | [dragndrop](./dragndrop.md) |
| `PineappleParallax` | `hover.parallax` | — | [parallax](./parallax.md) |
| `MelonMove` | `auto.moveAlong`, `hover.spotlight` | — | [move](./move.md) |
| `SantolSortable` | `interact.sortable` | — | [sortable](./sortable.md) |
| `SaigonScroll` | `interact.virtualScroll`, `table.*` | — | [scroll](./scroll.md) |
| `AvocadoAnimation` | Used across styles for easing | — | [animation](./animation.md) |

### Global singletons

| Plugin | Global | Doc |
|---|---|---|
| `LimeLog` | `lime.*` | [log](./log.md) |
| `RaspberryRequest` | `raspberry.*` | [request](./request.md) |
| `StrawberrySocket` | — | [socket](./socket.md) |
| `ImbuInterval` | — | [interval](./interval.md) |
| `LycheeLine` / `LycheeLineEditor` | `lychee.*` / — | [line](./line.md) |
| `MandarinMarkdown` | `jamd` | [markdown](./markdown.md) |
| `RambutanRouter` | `rambutan.*` | [router](./router.md) |
| `CurrantComposable` | — | [dashboard](./dashboard.md) |

---

## Plugin args string format

When using a string plugin path, arguments are passed in parentheses as semicolon-separated `key:value` pairs.

```
"pluginName(key:value;key2:value2)"
```

The string parser accepts literal numbers, booleans, strings, arrays, and objects. Plugin and style argument profiles supply shorthand selection, type conversion, defaults, and units. Callbacks receive resolved arguments; unknown dictionary keys are preserved for plugins with open options. Constructors without profiles retain their direct-argument behavior.

```json jaml-playground
{
  "type": "button",
  "cap": "Hover for a tip",
  "tip": "Plugin arguments",
  "plugins": [
    "popup.tip(subTip:true;showDelay:200)",
    "observe.intersection(showing:(el)=>el.style.opacity='1')"
  ]
}
```

---

## Authoring a custom plugin

### Plain object plugin

The simplest plugin is a plain object with `plug` and `unplug`.

```javascript
const myPlugin = {
  desc: 'Log mount/unmount',
  args: {},
  plug(el, args) {
    console.log('Plugin mounted on', el.tagName)
    this.getData(el).originalBg = el.style.background
    el.style.background = 'hsl(45 100% 50%)'
  },
  unplug(el, args) {
    el.style.background = this.getData(el).originalBg || ''
    this.removeData(el)
  }
}

// Use directly:
// { type: 'button', cap: 'Hover me', plugins: [myPlugin] }
```

### Reusable behavior

Use `Plugins.registerPlugin(path, option)` above for a named plugin, and call the resulting builder with arguments in JavaScript (`Plugins.global.highlight({ color: 'hsl(45 100% 50%)' })`). A string path can select the same registered behavior from JSON. A builder reference is not a pre-built plugin instance: call it before putting it in `plugins`.

For a visual recipe, prefer [style registration](../Styles/styles.md#styles-methods), which composes plugins and owns style argument defaults and apply/revert behavior. Keep cleanup symmetric: restore values you changed, remove event listeners, cancel timers/animations, and release per-target data.

---

## External plugins

External plugins are loaded lazily on first use from a separate JS bundle. The loader expects the plugin to be registered at `jam.External.namespace.name`.

This integration example requires an application-provided `jam-example-chart.js` that registers `jam.External.example.chart`. It is not a standalone playground demo.

```javascript
const external = new jam.ExternalPlugin({ chartLib: 'echarts' }, {
  success: () => nutmeg.success('External plugin loaded'),
  error: () => nutmeg.error('Failed to load plugin')
});
external.path = ['example', 'chart'];
export default { type: 'container', plugins: [external] };
```

When `ExternalPlugin` plugs in, it checks `jam.External.{path}` on the global scope. If not found, it fetches `jam-{path}.js` as a resource, then reads the `plug`/`unplug` functions from the loaded module.
