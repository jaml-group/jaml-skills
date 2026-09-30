# Choose native capabilities

For an ambiguous intent, choose the relevant topic below, compare its candidates and no-fit conditions, then retrieve exact contracts. Known capabilities go straight to their contracts. Appearance does not establish state ownership. This guide supplies selection context; the linked family guides and curated owners supply current contracts.

Read the relevant section below, then follow its owning guide. Use the [style index](Styles/index.md) and [plugin index](Plugins/index.md) to locate a known capability directly. Keep shared family context, argument tables and linked prerequisites with the selected entry; expand the guide when its examples or explanations matter.

## Selection and hover

| Need                                    | Start with                                                                       | Read next                                                                         |
| --------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| A visibly selected value                | Native `radio`, `buttongroup-radio`, or the appropriate checkbox subtype         | [Option ownership](JAM-UI/options.md), [button groups](JAM-UI/button-group.md)    |
| An alternative checked-state treatment  | `style check.frame`, `check.shade`, `check.underscore`, `check.pipe`             | [Check styles and examples](Styles/check.md)                                      |
| Temporary highlight of the hovered item | `style hover.frame`, `hover.shade`, `hover.crosshair`                            | [Hover styles and shared-locator caveats](Styles/hover.md)                        |
| Brackets that stay around one host      | `style layer.crosshair`                                                          | [Host decoration](Styles/layers/crosshair.md)                                     |
| Decorative pointer motion               | `style layer.follower.spotlight`, `layer.follower.edge`, `layer.follower.shadow` | [Follower examples](Styles/layers/follower.md) and their activation prerequisites |

Keep selection state with the native option owner. Plain `buttongroup-radio` owns the selected value and checked state, and already presents checked state visually. Use a `check.*` style only when a different checked-state treatment is desired; do not recreate selection using decorative containers. Plain `buttongroup` does not become radio through an underline, a default value or a theme. For a complete tabs interaction, separately establish keyboard navigation, tab/panel semantics and panel switching; an underline is only its visual treatment.

```javascript jaml-playground
export default {
    type: 'buttongroup-radio',
    cap: 'View',
    defaultValue: 'overview',
    data: [
        { name: 'Overview', value: 'overview' },
        { name: 'Details', value: 'details' }
    ]
};
```

For tab-like navigation, start with plain `buttongroup-radio`; `check.underscore` is an optional visual treatment. Prefer publishing the selected value and letting content consume it through [state bindings and visibility](JAML/state-and-data.md#selection-and-content). Direct event-driven control remains supported. For multiple selection, preserve the checkbox owner's feedback: the generated check contract describes a single locator, not one marker for every selected item.

## Decorative activity and actual progress

For an ornamental ring, arc, orbit, repeated object or particle effect, inspect `style layer.spinner.background`, `.frets`, `.comet`, `.orbit`, `.object` or `.particles`. [Spinner styles](Styles/layers/spinner.md) describe variant behavior, sizing, animation prerequisites and composition examples.

Decide whether the requirement is decoration, unknown-duration activity or measured progress before choosing the visual. Use the [progress element](JAM-UI/progress.md) when a progress value is part of the contract. Let application state control whether busy decoration is present and provide meaningful status text. A spinner neither detects pending work nor prevents interaction. Standalone spinner rotation requires `spin`; composite roulette, radar and reddit presets rotate when it is omitted. `spin:false` stops their rotation, while independent animation effects keep their own controls.

## Move, resize, reorder or transfer data

| Operation                  | Capability                                                | Composition owner                                              |
| -------------------------- | --------------------------------------------------------- | -------------------------------------------------------------- |
| Reposition a host          | `style interact.movable`                                  | Host geometry, containment and persistence                     |
| Resize a host              | `style interact.resizable`                                | Size constraints and application state                         |
| Reorder peer children      | `style interact.sortable`                                 | Container items and a `change` handler that updates data order |
| Transfer browser drag data | `plugin interact.draggable` + `plugin interact.droppable` | Payload producer, acceptance policy and receiving handler      |

Read [interaction styles](Styles/interact.md) and [drag/drop plugins](Plugins/interact-plugins.md) for examples. Do not install two competing gesture owners on the same drag handle. Consult the interaction guide's forwarding caveat for movable/resizable rather than inventing a closed argument list. Native data transfer is not free positioning, and a rendered reordering is not durable model persistence. Preserve an alternate accessible operation when the product requires one.

For drop filtering, read `interact.droppable` in the [drag/drop guide](Plugins/interact-plugins.md): its `accept` input is a browser event, while `dataHandler` receives decoded data. Keep payload validation and backend authorization/persistence with their owners. A known server-side requirement is a structural no-fit for a visual plugin, not a reason to search unrelated families.

## Container layout and child placement

| Decision                                      | Inspect these styles                |
| --------------------------------------------- | ----------------------------------- |
| Content-led page or bounded application shell | `layout.page`, `layout.application` |
| Explicit rows and columns                     | `layout.grid`                       |
| Repeated tracks driven by count or sizing     | `layout.autogrid`                   |
| Row/column flow and alignment                 | `layout.flex`                       |
| Starting grid lines and spans for a child     | `layout.gridpos`, `layout.gridsize` |
| Existing button-group overflow fallback       | `layout.navigator`                  |
| Local clipping/scroll policy                  | `layout.overflow`                   |

Read [layout contracts and examples](Styles/common/layout.md) before combining these layers. Put container geometry on the container and grid placement on its children. Repeated tiles can use autogrid; numeric repeat is a fixed count, not a responsive promise. For explicit placement, pair a grid parent with gridpos/gridsize children.

Keep the shell's regions and scroll ownership with its [layout-owned roles](Theme/stylize.md#layout-owned-stylize-profiles). The navigator helper requires an existing button group; the `buttongroup.tilted` appearance style is not an overflow implementation. If the verified owners do not meet the required interaction, retain the gap and choose an appropriate [extension](JAML/component.md) instead of assuming a style name supplies it.

## Inputs, actions and metric presentation

| Intent                     | Candidate                                                                            | Decision to preserve                                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| Invoke an action           | Native button; `style button.pill`, `button.round`, `button.blended`                 | Button styles supply presentation; the handler owns the action. Use the native button type for type-specific variants. |
| Clear or reset an input    | `style interact.clearable`, `interact.resettable`                                    | Requires the host's clear/reset contract; the style does not define draft state or defaults.                           |
| Fit multiline text         | `style input.autoRows`                                                               | Requires a textarea agent. Use the existing code-input integration for an editor.                                      |
| Display a metric hierarchy | `style value.major`, `value.main`, `value.sub`, `value.minor`; `cap.main`, `cap.sub` | Typography uses theme tokens; value formatting and updates stay with the native element/model.                         |
| Animate a number           | `style indicator.tweening`, `indicator.tweening.dial`                                | Read formatter, update and cleanup caveats before choosing for frequently changing values.                             |
| Display time               | `style indicator.clock`, `indicator.datetime`                                        | Supply the correct value/type and an update source; a clock display does not create a timer.                           |
| Show icons                 | `style icon.solid`, `icon.regular`, `icon.emoji`, `icon.arrow`                       | Check slot shape, font assets and whether state/value changes actually drive the chosen variant.                       |

Read [inputs](JAM-UI/input.md), [indicator styles](Styles/indicator-style.md), [icon styles](Styles/common/icon.md) and [interaction styles](Styles/interact.md) for the relevant composition. Keep an element's slots distinct from the wrappers that distribute them: a caption, caption slot and internal input agent are different styling targets. A familiar style name is not proof that it implements an action or has a current stylesheet consumer; read the selected guide's behavior and caveats before adopting legacy markers.

## Popups, notifications and observers

| Need                          | Capability                              | Ownership boundary                                                                                   |
| ----------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Delegated hover explanation   | `plugin popup.tip`, `popup.floatingTip` | Annotated target/content and popup lifetime; inspect target-matching behavior.                       |
| Help beside a native caption  | `plugin popup.helper`                   | Choose caption activation or a separate focusable help label.                                        |
| Notification emphasis         | `style notify.bigicon`                  | Presentation only; delivery, lifetime and dismissal belong to the notification owner.                |
| React to direct-child changes | `plugin observe.child`                  | Observe mutations; do not duplicate component construction ownership.                                |
| React to child visibility     | `plugin observe.intersection`           | Visibility callbacks; custom adding/removing hooks must manage observation themselves.               |
| Contextual web-search actions | `plugin shortcut.search`                | Hover popup actions, not keyboard-shortcut registration; inspect its provider and query limitations. |

See [popup composition](Plugins/popup.md), [observers](Plugins/observe.md), [notifications](Styles/notify-style.md) and [shortcuts](Plugins/shortcut.md). Prefer a native popup's lifecycle over independently managed floating DOM. Use `popup.title` to replace existing native titles, or `popup.tip` for explicit tip content; read their target-matching and restoration contracts. Keep required help reachable through the product's keyboard/focus flow.

## Scrolling, deferred rendering and tables

| Content model                                 | Choose                                               | Why                                                                                           |
| --------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Variable-height vertical component content    | `style layout.lazyload`                              | Progressively builds content and retains visited component state.                             |
| Regular component grid with fixed row height  | `style grid.virtualScroll`                           | Owns grid row allocation and visible/buffered cells.                                          |
| Native table/tree rows with fixed height      | `style table.fixedrowheight`, `tree.fixednodeheight` | Uses the element's row provider and body viewport.                                            |
| Custom fixed-height row providers             | `style interact.virtualScroll`                       | Requires explicit row providers, positioning and scroll extent; inspect its lifecycle limits. |
| Publish scrolling progress or current section | `plugin event.scrollProgress`                        | Publishes through the messenger; it does not render a progress view.                          |
| Show progress in a native table               | `style table.showscrollprogress`                     | Composes a native progress bar with the body scroll owner.                                    |

Choose the content model before the visual treatment. Component child-rendering styles require a component-owned container and one rendering owner per container. Use a bounded viewport, verify the actual scroll target, and preserve identity/state across updates. Deferred rendering does not itself fetch data. Do not combine two virtualization strategies on one container or use fixed-height row math for arbitrary variable-height layouts.

See [layout](Styles/common/layout.md), [grid](Styles/common/grid.md), [scrolling](Plugins/scroll.md), [table styles](Styles/table-style.md) and [tree styles](Styles/tree-style.md). Compose native `table.stripy`, `table.gridline`, `table.bento`, `table.hoverhighlight` or `table.hovermarker` after choosing the row owner. Hover markers do not select rows. Header presets `table.thead.accent`, `.tint` and `.elevated` consume semantic colors; custom headers belong to `table.thead`. `table.showpageinfo` is a reserved no-op, so compose page status from actual pagination state.

## Runtime and shared data

A renderer may own a reactive `dataUrl` request. When a table and chart share one logical dataset, prefer a hidden `data` owner with `valueUrl` and `valueKey`; compatible consumers use `dataWatcher` or a bound projection. Keep the producer and consumers in the intended broker scope. See [runtime requests](JAML/state-and-data.md#private-runtime-data) and [shared data](JAML/state-and-data.md#shared-data-owner).

Independent fetchers remain supported. Request-promise sharing is conditional, and ordinary component URL requests bypass it by default; it does not replace shared ownership. Read [request sharing](JAML/state-and-data.md#request-sharing-and-cache-limits) only when request duplication or refresh matters.

## Charts and data transformations

Start with the native [chart element and chart styles](Styles/chart-style.md), then inspect the [ECharts family](Styles/echarts.md) and exact `style echarts` paths. Separate three decisions:

1. **Data and chart type:** use the native chart type and its data contract. `echarts.bar`, `echarts.line`, `echarts.pie` and `echarts.Radar` are different series families, not interchangeable decorations.
2. **Option composition:** axis, legend, title, grid, tooltip, label and visual-map helpers write to particular option owners. Query the full path, including case, before sharing a helper across series.
3. **Transformations and specialized recipes:** presets such as `echarts.bar.stackBar`, `echarts.pie.doubleCircle` or map layers may rewrite data/series or require specific shapes. Inspect their exact prerequisites and caveats; an attractive example is not a general-purpose chart contract.

Provide a measurable host and the required chart integration. A nested text shadow, item shadow and chart-level function can share a short name while targeting different structures. Legacy helper wiring and option-key limits are documented; when a helper does not fit, use a supported option composition or a bounded extension instead of guessing new arguments. Verify the chosen composition with realistic empty, changing and out-of-range data, and both theme modes when relevant.

## Decoration and motion

Choose [layer](Styles/layers/layer.md) families by what they render: [backgrounds](Styles/layers/background.md), [borders](Styles/layers/border.md), [canvas](Styles/layers/canvas.md), [chart overlays](Styles/layers/chart.md), [ribbons](Styles/layers/ribbon.md), [watermarks](Styles/layers/watermark.md), [glare](Styles/layers/glare.md) or [scrollers](Styles/layers/scroller.md). Query the exact `style layer.*` identity before combining them.

A layer style generally creates its own decorative child. Configure one layer's related properties through that layer's arguments/CSS; a second layer style does not automatically modify the first. Background fills, full borders and width-only border presets need different setup. A `combo.masked` name does not establish that every variant creates an automatic mask. Inspect activation prerequisites for movement, pointer following and scrolling rather than inferring animation from appearance.

Use [animation styles](Styles/animation.md) for framework entry/exit behavior or supplied keyframes, and inspect their mount/unmount ownership. Entry, exit, pointer effects and value animations have different triggers. Preserve meaningful state/progress outside decorative layers, and verify the product's reduced-motion behavior separately.

## Theme, tokens and common styling targets

Use [theme roles](Theme/stylize.md) and [tokens](Theme/tokens.md) before local cosmetic overrides. The layout owns its shell regions, including `stylize: 'frame'` and the `jam-frame-style` class where supported; theme recipes own their appearance. A style plugin is not another role declaration key.

For theme settings, follow [theme-panel composition and readiness](JAML/component.md#theme-panel-composition-and-readiness). For styling placement, use the [style ownership decision](Styles/styles.md#style-ownership-and-composition). For shared semantic meaning, inspect native foreground/background/border role presets and [color mapping](Styles/common/color.md). Use `color.stateMap` for discrete state accents and `color.valueMap` for a numeric scale only when those mappings fit the domain. A day/night switch style changes its appearance; the application must still connect its value to the theme controller. Business palettes belong in the existing color registry, not a new set of ad hoc theme tokens.

For plain CSS, use [css()](Styles/common/css.md) with `styles`, `childStyles` or `descStyles` according to the target. Query a full generated style path: host, slotted content, slot wrapper and agent variables have different consumers, and a suffix such as `m` can denote spacing, type size, border width or shadow in different families. Use a registered style for a repeated complex presentation contract. Keep explicit geometry with the layout and avoid modifying theme-owned shell structure to achieve a cosmetic result.

## Application services and extensions

Use `plugin i18n` to load the required dictionaries through the existing localization system; retain `@tr` expressions and locale configuration. Use `plugin router`/`subRouter` for navigation ownership, checking parent/child lifetime and state retention in [routing](Plugins/router-plugins.md). `plugin composable.composable` serves a configuration-driven dashboard with shared routing state; it is not a small local grid decorator.

When a native capability is insufficient, retain the exact missing contract and choose a [registered style/plugin, builder, component/CC, usage or suffix](JAML/component.md) that owns it. Follow the skill's upstream-candidate assessment for reusable additions. A successful syntax check establishes neither a good capability choice nor runtime correctness; validate the intended operation, its failure path and teardown.
