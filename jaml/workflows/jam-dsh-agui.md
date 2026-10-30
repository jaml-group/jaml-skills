# Interactive JAML in jam-dsh

Load this guide when generating an interactive assistant view for the **jam-dsh host**, or explaining its local state and response boundary. `agui` is supplied by that host; ordinary Jam-UI applications and stock playgrounds do not provide it.

## JAMLL availability

The JAMLL-enabled jam-dsh host advertises progressive rendering, whole-message-success gating and the same reviewed response boundary as complete-definition views. Once interactive JAML is chosen, default to `text jamll` for content between paragraphs or `text jamll-artifact` for a distinct panel. Honor explicit format requests and use Markdown when it is sufficient. Follow the installed host's capability declaration; an older deployment without JAMLL uses its supported complete-definition formats. See [JAMLL records and fallback](../references/JAML/conversational-ui.md#progressive-replies-with-jamll).

## Author the view

1. Apply [reply selection](../references/JAML/conversational-ui.md): use Markdown when sufficient, otherwise choose a fitting ready module, registered CC or native JAML in one pass. Complete current contracts supplied by the host need no discovery call. Retrieve only unresolved inputs, prerequisites or behavior. For L1 composition, choose the native semantic owner before its style/theme presentation; use [literal option labels](../references/JAM-UI/JAM-UI.md#literal-external-labels) for external choices.
2. Emit a `text jamll` or `text jamll-artifact` fence with one complete element record per physical line, spaces for children and an explicit closing delimiter. Keep each record's handlers on that same physical line. Presentation is independent of capability tier; see [wrapper-free native composition](../references/JAML/conversational-ui.md#native-elements-without-an-outer-wrapper). Necessary module-scope setup, asynchronous setup or a result that cannot fit an independent record can use `javascript jaml-content` or `javascript jaml-artifact`. Only complete-definition fences use `export default` with one definition or a flat array, not a top-level function. Use `javascript jaml-playground` when the user requests editable source. Keep source at or below 160,000 UTF-8 bytes.
3. Use the supplied Studio runtime globals `jam`, `jaml`, `Styles` and `Plugins`; compose with the installed native capabilities. The host supplies the runtime/theme and mounting lifecycle. Current jam-dsh mounts directly in the native result container and shares the page runtime and DOM. This is executable page code, not an iframe or security sandbox. Do not add network requests, external scripts or imports unless the deployment explicitly permits them. Keep local interactions in the view; use the bounded `agui` proposal API for the trusted outer response flow.
4. Keep authored defaults in `vars`, then seed saved `agui.state` through [runtime model-data writes](../references/JAML/binder.md#runtime-data-and-authored-definitions); saved strings must not become authored expressions. Update local model values through normal [bindings](../references/JAML/binder.md), and call `agui.setState` when the state worth retaining changes. Propose a response through an explicit generated control. Describe that action as preparing a response for review.
5. Verify the rendered view, local editing and intended proposal. For JAMLL, verify that controls and programmatic proposals remain gated until the whole assistant message succeeds and all its blocks are valid and closed. The trusted outer **Send response** control admits a proposal only after review. Check the actual embedded result width, a narrow viewport, content growth/shrinkage and remounting; the surrounding chat width is not the available form width. A stock playground can validate native composition but cannot establish the jam-dsh response boundary.

JAMLL records render progressively with native insertion and motion; the host owns completion signaling. Closing a fence alone does not enable controls. Interrupted live replies may retain a gated prefix; failed historical JAMLL stays literal. Complete-definition views render when their explicitly closed native block activates, with no extra Run gate. Quoted examples stay literal. Source-editor/result layout belongs to native Markdown; source edits create a new preview revision. See the generic [JAMLL executor contract](../references/Plugins/markdown.md#application-executor-opt-in) when implementing another host.

## Chart runtime prerequisite

Native [chart elements](../references/JAM-UI/chart.md#runtime-prerequisite) require `globalThis.echarts` in the runtime that mounts them. Current jam-dsh loads its packaged ECharts bundle in the shared page before mounting native results. Other hosts must advertise their own chart readiness; documentation or a chart working in a stock playground is not evidence for that host.

Use native `chart-*` definitions with bounded, nonzero dimensions and supplied data. Do not inject a CDN loader, import an unprovided package or fetch data to repair an unavailable chart runtime. Report that prerequisite to the host owner. Verify the actual instance and intended dataset, theme changes, resize and revision disposal; retained theme/size updates should not reset local state.

## Narrow embedded forms

Assign [native roles](../references/Theme/stylize.md#workload-stylize-values) by responsibility: `form` for the editing context and `actions` for its commands. Reserve `field` for multiple controls sharing one compound logical value; ordinary native inputs already own their labels and helper/error presentation. A role selects theme presentation; choose its layout separately. Use a vertical single-column composition at narrow widths rather than assuming a full application viewport or adding a nested app shell.

Use public `container.layout(display:grid)` and `container.grid(templateColumns:minmax(0,1fr))` on the form root for a single shrinkable column. For normal native input/select/choice labels, [label.atTop](../references/Styles/label-style.md#entry-label-attop) places the label above the control. For choice lists, [options.vertical](../references/Styles/options-style.md#entry-options-vertical) changes the native flow. For long captions, add `label.cap.text(whitespace:normal)`; for long choices, combine vertical flow with `options.option.text(whitespace:normal)`. These documented targets retain the native input and selection owner. Verify wrapping and horizontal overflow on the actual controls; stacking alone can leave long choices scrolling internally. A short single-choice list can remain native options; a longer list may fit a native select. Keep actions usable after text wraps and the result height changes.

Choose the fence mode when authoring a new view. The removed `jaml-playground-result` marker remains literal in saved messages and is rejected for response admission; no automatic source migration occurs. Preserve saved source, block coordinates and exact-source hashes when only changing its presentation. Native Markdown owns source/result presentation and available-width adaptation; see [playground presentation](../references/Plugins/markdown.md#playground-presentation). Verify long content and access to its final action in the installed renderer rather than assuming the surrounding chat width is available. Rewriting its fence marker can shift later block identities, and targeting renderer-internal wrappers is not a public presentation API.

## State and response contract

| API                            | Meaning                                                                                                                                                                                   |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `agui.state`                   | A cloned snapshot of this view's current state, initially saved state or `null`. Mutating the returned object does not update stored state.                                               |
| `agui.setState(value)`         | Replaces the local state with a cloned JSON value and asks the outer host to retain it. It does not merge objects or update JAML bindings; update model variables separately when needed. |
| `agui.submit(action, payload)` | Proposes JSON for the host's review UI. It neither sends conversational input itself nor returns an admission Promise. Only the trusted outer **Send response** action admits user input. |

Use action names matching `/^[a-z][a-z0-9_-]{0,63}$/`. State and payload must be bounded JSON: null, strings, booleans, finite numbers, arrays and plain objects; no functions or other executable values. Each serialized state/payload is limited to 32,000 UTF-8 bytes, nesting depth 12, arrays of at most 2,048 entries and objects of at most 256 keys. Keys `__proto__`, `constructor` and `prototype` are rejected. The outer host ignores invalid state/proposals; do not depend on a synchronous validation exception or successful submission result from these methods.

Optional browser persistence belongs to the host and is keyed by session, completed saved-message sequence, native block ID and exact-source hash. State updates before message completion remain local to the current view and are not automatically flushed at completion. Storage availability, source changes and a new block/message can prevent restoration; essential conversation state must travel through an admitted response.

Local source edits may preview and propose a response. Server admission rejects a source hash that differs from the saved original assistant fence. Return to the saved source to submit its response; editing preview source does not rewrite the saved message. Never describe an edited preview as authorized host input.

## Example: workspace name

This native input and button composition adapts the jam-dsh host fixture, restoring saved names through a runtime model-data write. The captioned CTA uses native button accessibility. Changing the input replaces local state; **Continue** prepares the proposal, and the outer host exposes **Send response** for review and admission.

````text
```text jamll-artifact
{ type: 'container', stylize: 'form', vars: { name: 'Quiet workspace' }, onafterrender({ element }) { const saved = agui.state; if (typeof saved?.name === 'string') { element.model.vars.name = saved.name; } }, styles: ['container.layout(display:grid)', 'container.grid(templateColumns:minmax(0,1fr))'] }
    { type: 'input', cap: 'Workspace name', styles: ['label.atTop', 'label.cap.text(whitespace:normal)'], value: '{{name}}', onchange() { agui.setState({ name: this.value }); } }
    { type: 'button-cta', cap: 'Continue', onclick() { agui.submit('continue', { name: this.model.vars.name }); } }
```
````

When the user requests editable source, express the same tree as one definition with `components` and `export default` in a `javascript jaml-playground` fence. Keep labels/captions authored and incoming names in literal data sinks; see [content trust](../references/index.md#trust-and-application-data).

## Recorded diff presentation

For host-provided unified-diff text, follow the [native read-only diff contract](../references/JAM-UI/input.md#read-only-unified-diff) and verify that both runtime and editor bundles include it. Use trusted authored defaults, assign external text through `model.vars` afterward, and let the host retain original bytes, enforce size/binary limits and authorize patch actions. The viewer supplies highlighting and selection/copy; it does not compute or apply patches.
