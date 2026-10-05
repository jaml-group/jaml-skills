# Interactive JAML in jam-dsh

Load this guide when generating an interactive assistant view for the **jam-dsh host**, or explaining its local state and response boundary. `agui` is supplied by that host; ordinary Jam-UI applications and stock playgrounds do not provide it.

## Author the view

1. Choose the native element that owns the interaction, then its documented style/behavior and Studio theme role. Read the [element catalog](../references/JAM-UI/JAM-UI.md), the selected element page, [style selection](../references/Styles/styles.md) and [plugin ownership](../references/Plugins/plugins.md#choose-an-entry-point). Prefer native input/choice/button behavior; use [literal option labels](../references/JAM-UI/JAM-UI.md#literal-external-labels) for external choices.
2. For an actual conversational form, choice or interactive result, default to a complete, explicitly closed `javascript jaml-playground-result` fence. Use `javascript jaml-playground` when the user requests source inspection or editing; it reserves space for the native source editor beside the result. Its source must default-export a JAML definition. Keep functions inside handlers/builders in that definition; a top-level default-exported function is not an accepted host entry point. Keep source at or below 160,000 UTF-8 bytes.
3. Use the supplied Studio runtime globals `jam`, `jaml`, `Styles` and `Plugins`; compose with the installed native capabilities. The host supplies the runtime/theme and mounting lifecycle. The opaque frame has no parent DOM, authenticated host transport or host credentials; the host allows its packaged runtime/theme assets while arbitrary network requests and imported packages are unavailable. The iframe does not provide a separate process or CPU budget. Keep interactions inside the view and submit bounded JSON through `agui`.
4. Keep authored defaults in `vars`, then seed saved `agui.state` through [runtime model-data writes](../references/JAML/binder.md#runtime-data-and-authored-definitions); saved strings must not become authored expressions. Update local model values through normal [bindings](../references/JAML/binder.md), and call `agui.setState` when the state worth retaining changes. Propose a response through an explicit generated control. Describe that action as preparing a response for review.
5. Verify a complete fence renders, editing stays local, the proposal contains the intended data, and the trusted outer **Send response** control admits it only after review. Check the actual embedded result width, a narrow viewport, content growth/shrinkage and remounting; the surrounding chat width is not the available form width. A stock playground can validate native composition but cannot establish the jam-dsh response boundary.

A completed fence renders automatically when its native lazy block activates; initial generated views have no extra Run gate. Streaming without a matching closing delimiter and quoted example blocks stay inert. Source-editor/result layout belongs to native Markdown; source edits create a new preview revision. See the generic [Markdown executor contract](../references/Plugins/markdown.md#content-policy-and-playground-ownership) when implementing another host.

## Narrow embedded forms

Assign [native roles](../references/Theme/stylize.md#workload-stylize-values) by responsibility: `form` for the editing context and `actions` for its commands. Reserve `field` for multiple controls sharing one compound logical value; ordinary native inputs already own their labels and helper/error presentation. A role selects theme presentation; choose its layout separately. Use a vertical single-column composition at narrow widths rather than assuming a full application viewport or adding a nested app shell.

Use public `container.layout(display:grid)` and `container.grid(templateColumns:minmax(0,1fr))` on the form root for a single shrinkable column. For normal native input/select/choice labels, [label.atTop](../references/Styles/label-style.md#entry-label-attop) places the label above the control. For choice lists, [options.vertical](../references/Styles/options-style.md#entry-options-vertical) changes the native flow. For long captions, add `label.cap.text(whitespace:normal)`; for long choices, combine vertical flow with `options.option.text(whitespace:normal)`. These documented targets retain the native input and selection owner. Verify wrapping and horizontal overflow on the actual controls; stacking alone can leave long choices scrolling internally. A short single-choice list can remain native options; a longer list may fit a native select. Keep actions usable after text wraps and the result height changes.

Choose the fence mode when authoring a new view. Preserve saved source, block coordinates and exact-source hashes when only changing its presentation. The current native Markdown executor has no result-first/Show-source display option or responsive two-pane stacking option; see [playground presentation](../references/Plugins/markdown.md#playground-presentation). Editable previews also cap result height, so horizontal fit alone does not establish that a long form remains fully reachable. Treat a saved editable block that needs those controls as a renderer capability gap. Rewriting its fence marker can shift later block identities, and targeting renderer-internal wrappers is not a public presentation API.

## State and response contract

| API                            | Meaning                                                                                                                                                                                   |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `agui.state`                   | A cloned snapshot of this view's current state, initially saved state or `null`. Mutating the returned object does not update stored state.                                               |
| `agui.setState(value)`         | Replaces the local state with a cloned JSON value and asks the outer host to retain it. It does not merge objects or update JAML bindings; update model variables separately when needed. |
| `agui.submit(action, payload)` | Proposes JSON for the host's review UI. It neither sends conversational input itself nor returns an admission Promise. Only the trusted outer **Send response** action admits user input. |

Use action names matching `/^[a-z][a-z0-9_-]{0,63}$/`. State and payload must be bounded JSON: null, strings, booleans, finite numbers, arrays and plain objects; no functions or other executable values. Each serialized state/payload is limited to 32,000 UTF-8 bytes, nesting depth 12, arrays of at most 2,048 entries and objects of at most 256 keys. Keys `__proto__`, `constructor` and `prototype` are rejected. The outer host ignores invalid state/proposals; do not depend on a synchronous validation exception or successful submission result from these methods.

Optional browser persistence belongs to the host and is keyed by session, completed saved-message sequence, native block ID and exact-source hash. State updates before message completion remain local to the current frame and are not automatically flushed at completion. Storage availability, source changes and a new block/message can prevent restoration; essential conversation state must travel through an admitted response.

Local source edits may preview and propose a response. Server admission rejects a source hash that differs from the saved original assistant fence. Return to the saved source to submit its response; editing preview source does not rewrite the saved message. Never describe an edited preview as authorized host input.

## Example: workspace name

This native input and button composition adapts the jam-dsh host fixture, restoring saved names through a runtime model-data write. The captioned CTA uses native button accessibility. Changing the input replaces local state; **Continue** prepares the proposal, and the outer host exposes **Send response** for review and admission.

```javascript jaml-playground-result
const savedState = agui.state;
export default {
  type: "container",
  stylize: "form",
  vars: { name: "Quiet workspace" },
  onafterrender({ element }) {
    if (typeof savedState?.name === "string") {
      element.model.vars.name = savedState.name;
    }
  },
  styles: [
    "container.layout(display:grid)",
    "container.grid(templateColumns:minmax(0,1fr))",
  ],
  components: [
    {
      type: "input",
      cap: "Workspace name",
      styles: ["label.atTop", "label.cap.text(whitespace:normal)"],
      value: "{{name}}",
      onchange() {
        this.model.vars.name = this.value;
        agui.setState({ name: this.value });
      },
    },
    {
      type: "button-cta",
      cap: "Continue",
      onclick() {
        agui.submit("continue", { name: this.model.vars.name });
      },
    },
  ],
};
```

Use the same definition with the `javascript jaml-playground` fence when the user should see and edit its source. Keep labels/captions authored and incoming names in literal data sinks; see [content trust](../references/index.md#trust-and-application-data).

## Recorded diff presentation

For host-provided unified-diff text, follow the [native read-only diff contract](../references/JAM-UI/input.md#read-only-unified-diff) and verify that both runtime and editor bundles include it. Use trusted authored defaults, assign external text through `model.vars` afterward, and let the host retain original bytes, enforce size/binary limits and authorize patch actions. The viewer supplies highlighting and selection/copy; it does not compute or apply patches.
