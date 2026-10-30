# `jam.*` Utility API

The `jam` global is the main runtime namespace. It merges all exports from JAML, Elements, Plugins, Styles, Constants, Types, and Spoon (utensils). This doc covers the most commonly used imperative APIs.

---

## Runtime readiness

### `jam.themeReady`

In the updated development runtime, `jam.themeReady` exists synchronously after loading Jam-UI. Initialization starts at `DOMContentLoaded` while the document is loading, or in the next microtask when it is already interactive/complete. The stable promise preserves initialization rejection. It resolves after Jam-UI initializes built-in tokens, restores saved theme state, discovers themes, and applies the initial theme. Rambutan route rendering waits for it automatically before invoking render hooks.

Older bundles may assign the promise only at `DOMContentLoaded`. Verify that it exists before treating `await jam.themeReady` as a readiness barrier: awaiting `undefined` does not wait for initialization. Early global dark-mode writes in the updated runtime wait for the body color profile and coalesce to the latest request. Wait for it before assigning `colors`/`colorScheme` palettes. This barrier does not establish component rendering, geometry or font readiness.

### Theme assets for classic-script embedding

On runtimes supporting `jam-theme-assets-path`, set this attribute on the classic runtime script before it executes. Its trimmed, nonempty value becomes `jam.Theme.assetsPath` before automatic initialization starts. Missing or blank values leave the existing path unchanged. The directory must serve `themes.json` and its referenced theme modules and shared chunks. Relative paths resolve against the document base URL; use an absolute URL when embedding under an application-specific asset route.

For a dynamically loaded classic runtime:

```javascript
const script = document.createElement('script');
script.src = new URL('jam-ui.js', assetBaseURL).href;
script.setAttribute('jam-theme-assets-path', new URL('themes', assetBaseURL).href);
script.onload = async () => {
    await jam.themeReady;
    // Render the application with its existing mount owner.
};
document.head.append(script);
```

The same attribute works on a parser-loaded classic `<script>` tag. Automatic initialization may begin before a dynamic script's `load` callback, so assigning `Theme.assetsPath` in that callback is too late for initial discovery. The property remains configurable before initialization. Changing the attribute after evaluation does not restart discovery. This hook does not configure ES-module imports or repeated runtime loading; it retains the existing `jam.themeReady` promise and initialization timing.

### `jam.defaultStyleOverrides`

Assign a selector-to-style dictionary to extend or replace entries in the framework default style map. Set it before themes are discovered or constructed; each `Theme` snapshots the combined defaults in its constructor.

```javascript
jam.defaultStyleOverrides = {
    'tile > section': ['group.gridline'],
    'map-standard': {
        'item-external': ['text.muted']
    }
};
```

---

## Rendering

### `jam.render(container, option)` / `jaml(container, option)`

Render a JAML object into a DOM container. Synchronously returns a `Model` instance for one definition. Adding `await` does not make this a readiness promise: [render completion](./JAML/binder.md#binding-lifecycle), option loading, visible geometry and animation settlement are different conditions. For external initial data, see [constructing a model before runtime vars writes and rendering](./JAML/binder.md#runtime-data-and-authored-definitions).

```javascript
const model = jam.render('#app', {
    type: 'container',
    vars: { title: 'Hello' },
    components: [{ type: 'indicator', cap: '{{title}}' }]
});
// model.vars.title = 'Updated' — reactive
```

`container` accepts: element ID string, CSS selector, or `HTMLElement`.

### `jamd(container, markdown, option?)`

Render Markdown as a styled document with TOC, section navigation, and code toolbars.
The generated document root uses the runtime renderer profile `stylize: 'markdown'`.

```javascript
jamd(
    '#docs',
    `
# Getting Started

Install and write your first JAML:

\`\`\`javascript
jaml('#app', { type: 'button', cap: 'Hello' })
\`\`\`
`
);
```

### `jam.renderFromString(container, str, option?)`

Auto-detect language (JSON, JavaScript, Markdown, Mermaid, HTML) and render accordingly.

For JavaScript, a default-exported object containing `jaml` plus at least one CC Definition marker (`showType`, `desc`, `size`, or `variants`) is registered temporarily and rendered through the CC variant preview. Recognition is content-first; `.cc.mjs` is the explicit filename convention used by the language tooling, not a runtime requirement.

```javascript
jam.renderFromString('#app', '{"type":"button","cap":"Hello"}');
jam.renderFromString('#app', 'export default { type: "button", cap: "Hi" }');
jam.renderFromString('#app', '# Hello World');
```

### `jam.renderJSON(container, data)`

Auto-visualize any JS object as a JAML component tree. Arrays become tables or tags, objects become nested wrappers.
The generated root uses the runtime renderer profile `stylize: 'json'`.

```javascript
jam.renderJSON('#app', { name: 'Alice', scores: [88, 91, 76] });
```

### `jam.parseJSONAsJAML(data)`

Convert a JS object to a `ComponentOption` without rendering.
The returned root uses `stylize: 'json'`.

```javascript
const option = jam.parseJSONAsJAML(myData);
```

### Dialog and popup ownership

Choose the [interaction and presentation](JAML/purpose-and-composition.md#choose-interaction-and-presentation), then compare the exact construction and lifetime contracts. A definition, a reactive `Model` and its built element are different inputs.

| API                                                                         | Input and result                                                              | Reactive data owner                                                                                                                  | Decision and dismissal                                                                                                          |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `jaml.yesNoDialog(prompt, onYes?, onNo?, styles?, options?, jamlOverride?)` | Prompt content → editable JAML definition                                     | Supplied by the later rendering path                                                                                                 | Calls the selected callback; neither mounts nor closes a presentation and has no once-only settlement guard.                    |
| `jam.popup(target, content, option?, type?)`                                | Supported content, including a JAML definition or built element → `undefined` | A definition is built as component content. For reactive vars, the caller constructs a `Model`, seeds it and passes `model.build()`. | Uses the shared popup owner; the caller owns its content model and response/lifetime policy.                                    |
| `jam.popupYesNo(target, prompt, onYes, onNo, option?)`                      | Prompt content → `undefined`                                                  | Builds component content, without a reactive `Model`                                                                                 | Requests popup dismissal before either callback; does not await a promise or add the modal helper's once-only settlement guard. |
| `jam.renderModal(container, option, config?)`                               | JAML definition or array of definitions → `Model` or matching `Model[]`       | Creates and renders the model(s)                                                                                                     | Owns modal mounting and configured dismissal; application callbacks own asynchronous completion and operation state.            |
| `jam.modalYesNo(container, prompt, onYes, onNo, styles?, option?)`          | Prompt content → `undefined`                                                  | Creates the modal's model internally                                                                                                 | Settles the decision once and initiates dismissal before its callback; does not await a promise.                                |

Decision callbacks receive the containing root component/model: a reactive `Model` through a model/modal path, and a component root in the direct popup helper path. A nested `yesNoDialog` receives the enclosing root, not a separate dialog model. A callback parameter named `model` does not establish reactive vars.

For a reactive popup, use the [explicit Model/build recipe](JAML/purpose-and-composition.md#rename-beside-the-conversation). For a modal, pass the **definition** to `renderModal` and seed runtime values on its returned model; do not pass a `Model` instance or `model.build()` to that argument. Neither a callback returning a promise nor a disabled-looking button changes a helper's lifetime. Apply the [asynchronous operation contract](JAML/purpose-and-composition.md#own-asynchronous-operations) to pending, failure, cancellation and late results.

### `jam.renderModal(container, option, config?)`

Render a JAML object as a modal dialog. The caller's host/layout and content styles determine placement and sizing; this helper does not center the content. A native `card` with `cap` already supplies its header. Select [interaction and presentation](JAML/purpose-and-composition.md#choose-interaction-and-presentation) first; a local edit can stay inline or beside its trigger. For a Yes/No decision, prefer the [confirmation helpers](choosing-native-capabilities.md#confirmations-and-editing-dialogs) and their managed ownership where appropriate.

Accepts `click2Close` (boolean, default `true`) or a config object with `click2Close`, `onclose`, `curtainCSS`, `blur`, `dimmer`, `curtainMode`, `presentation` and `drawerBreakpoint`. `click2Close` selects Escape/curtain dismissal at opening; mutating the original config later does not update the open modal. It does not gate an editable builder's Save/Cancel callbacks. Put a pending gate in those callbacks and choose a compatible dismissal policy when opening.

`curtainMode: 'active'` is the default: one reused curtain blocks lower sibling modals while leaving the top modal interactive. `'shared'` keeps sibling modals above the shared curtain. The first modal selects the container’s mode until the last modal is removed. Curtain effect strengths also remain those of the first curtain; later opens do not accumulate darkness or replace its effects.

While physical modals remain, the supplied container prevents user scrolling; its previous overflow styling resumes after the last modal unmounts, including exit animation. Other ancestors are not locked, programmatic scrolling remains possible, and modal content owns its own scroll region. Scroll locking is separate from the [modal focus and background contract](#modal-focus-and-background). See [curtain effects](#jamshowcurtainel-option) and [confirmation ownership](#jammodalyesnocontainer-prompt-onyes-onno-styles-option). These stacking/effect contracts require the updated development runtime; verify the consuming bundle.

```javascript
const model = jam.renderModal(
    '#app',
    {
        type: 'card',
        cap: 'Confirm',
        components: [
            { type: 'label', cap: 'Are you sure?' },
            { type: 'button-cta', cap: 'OK', onclick: 'jam.closeTopModal()' }
        ]
    },
    { click2Close: true, onclose: (m) => nutmeg.info('Closed') }
);
```

#### Close a specific modal after its exit animation

When an asynchronous operation finishes, close only the modal instance that owns it. Retire that operation's callbacks/subscriptions immediately, then call `jam.removeAnimatedly(element.parentNode, element)` for the captured model element. This uses its native exit animation and removes it afterward; native unmount then destroys the model. Do not call `model.destroy()` or remove the surrounding host first, and do not use `closeTopModal()` when a newer modal could be on top. Keep the application's once-only close and current-instance guards.

Use the definition's `onunmount` hook for application cleanup that must run after removal, including Escape/curtain dismissal. On current runtimes, a scalar `on: { unmount: callback }` on a definition passed to `renderModal` is not preserved when the helper adds its own unmount handlers; prefer `onunmount`. The config's `onclose` is a dismissal callback, not a universal programmatic-removal hook. If final cleanup removes an owned surrounding host or restores application focus, defer that part with `queueMicrotask` so native unmount cleanup finishes first, and check that no replacement owns the host or focus.

The following integration fragment assumes `model` is the captured result of `renderModal` and `retireOperation` is the application's idempotent state/subscription cleanup:

```javascript
function closeOwnedModal() {
    retireOperation();
    const element = model.element;
    if (element?.parentNode) {
        jam.removeAnimatedly(element.parentNode, element);
    }
}
```

#### Modal focus and background

Development bundles with native modal accessibility manage initial focus, keyboard containment, host-scoped background inertness and conditional return to the opener. The active modal and its owned native popup chains form the focus region; shared-curtain mode also keeps live sibling modal cards reachable. Inertness preserves prior sibling state within the supplied modal host; this is not a whole-page guarantee for an arbitrary host.

Return focus is attempted after unmount only when the captured opener remains connected and is eligible under any remaining modal. For an unhandled, non-composing Escape reaching the modal listener, owned popups dismiss before the modal. The `yesNoDialog` builder can handle Escape earlier, prevent the event and invoke No; its decision path therefore takes precedence over that popup fallback. Verify the intended sequence when composing them. The application supplies the accessible name and verifies the intended keyboard/assistive-technology flow.

Earlier bundles lack this integration. Verify the consuming runtime and preserve its native ownership; an existing adapter fills only a demonstrated gap. A popup or the `yesNoDialog` definition alone does not acquire modal behavior.

### Adaptive modal presentation

`jam.configureModalPresentation({ presentation: 'auto', drawerBreakpoint: 48 })` sets defaults for subsequent modal calls. `presentation` is `'auto' | 'dialog' | 'drawer'`; `drawerBreakpoint` is a finite nonnegative rem value. Defaults are `'auto'` and `48`.

`jam.renderModal` accepts those options per call. Auto mode uses a bottom drawer when the supplied host width is at or below the breakpoint, otherwise a dialog. Host-width and root-rem changes preserve the mounted model. Forced drawer presentation uses the bottom edge. Existing modals retain their resolved options when global defaults change.

Presentation does not replace modal lifetime, curtain, dismissal callbacks or focus/background ownership. Unlike a retained [`jaml.drawer`](JAML/drawer-and-previewer.md#retained-drawers), closing a modal tears it down. The sixth argument of `jam.modalYesNo(container, prompt, onYes, onNo, styles?, options?)` also accepts `presentation` and `drawerBreakpoint`, alongside `dimmer` and `blur`. For file content, mount a [`jaml.previewer` definition](JAML/drawer-and-previewer.md#file-preview-definitions) through `renderModal`.

### `jam.closeTopModal()`

Close the topmost modal popup.

### `jam.popupYesNo(target, prompt, onYes, onNo, option?)`

Show a Yes/No confirmation popup beside its target when the operation warrants a decision. Both decision callbacks request popup dismissal before invoking the supplied callback; the helper does not wait for an asynchronous save. For an editor that remains open on failure, use the editable definition and an owned popup lifetime as in [Rename](JAML/purpose-and-composition.md#rename-beside-the-conversation). The fifth argument is a popup options object; this helper returns `undefined`. Callbacks receive the dialog root component; this helper does not construct a reactive `Model` or guard decision settlement once. Keep repeated business actions behind the application's operation gate. Hiding the popup by clicking outside is not a No callback; release owned resources through the presentation's replacement, dismissal and disposal paths too. It uses the [shared popup owner](JAM-UI/popup.md#helper-content-focus-and-dismissal-timing); do not retain its return value as a popup handle.

```javascript
jam.popupYesNo(
    someElement,
    'Delete this item?',
    () => nutmeg.warn('Deleted'),
    () => nutmeg.info('Cancelled')
);
```

---

## Notifications

### `jam.notify(content, option?)`

Show a notification. Returns the `NutmegNotify` instance. For a plain outcome, pass the message directly; a recognized JAML content object selects custom mode with different level defaults. See [choosing notification content](JAM-UI/notify.md#choose-the-notification-content) for plain versus interactive content, literal external text, stable IDs and lifetime ownership.

```javascript
jam.notify('File saved', { level: 'success', duration: 3000 });
jam.notify('Upload failed', { level: 'error', type: 'card', pinnable: true });
```

### `nutmeg.*` — level shortcuts

```javascript
nutmeg.info('Processing...');
nutmeg.success('Done!');
nutmeg.warn('Session expiring');
nutmeg.error('Connection lost');
nutmeg.hurray('Level up!');

// Custom color notifications
nutmeg.gold('Special event!');
nutmeg.coral('Custom highlight');
```

### `NutmegNotify.config(option)`

Configure global notification defaults.

```javascript
NutmegNotify.config({
    position: 'right', // 'left' | 'center' | 'right'
    defaultDuration: 4000,
    defaultType: 'card' // 'banner' | 'card'
});
```

> **Shorthand:** `nutmeg.config(option)` is equivalent to `NutmegNotify.config(option)` — configure globally via the proxy.

### `NutmegNotify.clear()`

Remove all active notifications.

---

## Popups & Modals

### `jam.popup(target, content, option?, type?)`

Show a popup anchored to an element or mouse event. The optional 4th `type` parameter accepts a `PopupType` key (e.g. `'dropDown'`, `'tip'`, `'contextMenu'`) to use a predefined profile.

Definitions are built as component content. For reactive model data, pass the explicitly constructed model's built element and retain its cleanup owner; see [popup content and focus](JAM-UI/popup.md#helper-content-focus-and-dismissal-timing) and the [Rename example](JAML/purpose-and-composition.md#rename-beside-the-conversation).

```javascript
jam.popup(buttonElement, 'Click me for details');
jam.popup(mouseEvent, 'Tooltip text', { showDelay: 200 });
jam.popup(target, content, {}, 'dropDown'); // dropdown-styled popup
```

### `jam.closePopup(delay?)`

Close the current popup.

```javascript
jam.closePopup(); // immediate
jam.closePopup(200); // after 200ms
```

### `jam.dropDown(target, content, option?)`

Show a dropdown popup. Convenience wrapper around `jam.popup(target, content, option, 'dropDown')`.

```javascript
jam.dropDown(this, this.ref.menu, { position: 'bottom' });
```

### `jam.closeDropDown()`

Alias for `jam.closePopup()`. Closes the currently open dropdown.

### Contextual action buttons

Use native buttons inside `jam.dropDown` for commands such as Pin and Archive. A radio group represents a selection, so it is not the default owner for side-effect commands. `jam.popup` and `jam.dropDown` return no popup handle; `jam.closeDropDown()` closes the shared current popup.

```javascript jaml-playground
function actions() {
    return {
        type: 'container',
        styles: ['layout.flex(direction:column)'],
        components: ['Pin', 'Archive'].map((action) => ({
            type: 'button-ghost',
            cap: action,
            styles: ['align(left-middle)', 'cap.text(align:left)'],
            onclick() {
                console.log(action);
                jam.closeDropDown();
            }
        }))
    };
}
export default {
    type: 'button-ghost',
    icon: '⋯',
    styles: ['icon.chars'],
    attrs: { 'aria-label': 'Chat actions' },
    onclick() {
        jam.dropDown(this, actions(), { position: 'bottom', align: 'right' });
    },
    oncontextmenu(event) {
        event.preventDefault();
        jam.popup(event, actions(), {}, 'contextMenu');
    }
};
```

Keep an ordinary click/keyboard entry point even when right-click is supported. The helper does not prevent the browser context menu itself; the application handler does so. Native popup profiles own positioning and outside-click dismissal. This primitive example does not implement a complete accessible menu: the application still owns initial focus, Escape/restore behavior, expanded state and any menu-specific keyboard semantics. Do not add menu roles without those interactions. Keep callbacks scoped to the selected record and recheck action eligibility when activated; close the owned popup when the view becomes invalid.

For this helper path, a top-level `onafterrender` callback inside the popup content definition is not a visible-readiness hook: content is built directly rather than rendered through that Model hook. Use the popup's owned `showing` event and verify focus eligibility; cancel deferred focus when ownership ends. The `hiding` event follows exit completion, while `papaya.showing` becomes false earlier. See [popup content, focus and dismissal timing](JAM-UI/popup.md#helper-content-focus-and-dismissal-timing) before implementing initial focus or expanded-state synchronization.

<a id="jamlyesnodialogprompt-onyes-onno-styles-options"></a>

### `jaml.yesNoDialog(prompt, onYes?, onNo?, styles?, options?, jamlOverride?)`

Build a complete editable confirmation-dialog JAML definition. Choose [interaction and presentation](JAML/purpose-and-composition.md#choose-interaction-and-presentation) separately; this builder does not imply a modal surface. This helper creates the definition without mounting it; use your existing popup or modal owner to present it. `jam.yesNoDialog` remains an alias of the same function with the same argument order.

The prompt can be text, an existing DOM element, a JAML definition, or an array of JAML definitions. Yes/No callbacks receive the containing root component/model; nesting the definition does not create another root. Reactive model data requires a model-owning rendering path, as in the [Rename integration](JAML/purpose-and-composition.md#rename-beside-the-conversation). The optional fifth argument accepts `yesCap`, `noCap` and `actions`; omitted or nullish captions use the existing Confirm and Cancel translations. Caption values retain the normal JAML cap contract, including translation strings, bindings, and explicit empty text. Existing callers using four arguments retain their defaults. On runtimes supporting [final JAML overrides](JAML/component.md#final-jaml-overrides), the sixth argument customizes the returned dialog root while preserving its prompt, actions and keyboard handler. Put editable content in `prompt`, action captions in the fifth argument, and root IDs/styles/caller hooks in the sixth. This is distinct from the presentation-options argument of `jam.modalYesNo`.

On development runtimes supporting `options.actions`, pass `actions: {}` for a compact, equal-width action region aligned to the end. Use `actions: { variant: 'stacked' }` for full-width vertically stacked actions with the CTA first visually. Cancel stays first in DOM order; the presentation owner still chooses initial focus, and should deliberately focus Cancel for a destructive decision. The action region accepts the shared [JAML override](JAML/component.md#final-jaml-overrides) contract for styles, attributes and hooks, but cannot replace or append its generated `components`. The sixth argument continues to customize the whole dialog, not the action region. Omit `actions` to retain the earlier direct prompt/divider/Cancel/CTA sibling structure. Verify the consuming bundle before using this opt-in.

The builder selects the shared [`actions` compact variant](Theme/stylize.md#compact-actions); it adds no private action-layout CSS. Use that role directly outside dialogs, and use this option instead of regrouping returned builder children. Plain `variant: 'stacked'` selects the full-width stacked role. Stacked takes precedence, so `variant: 'compact stacked'` also stays full-width; compact sizing applies only to non-stacked groups. Keep prompt/form layout separate: `layout.autoalign` can give the prompt its full width while the action region stays compact. Destructive button coloring uses the existing semantic `danger` color; color does not choose initial focus or change decision callbacks.

```javascript
const dialog = jaml.yesNoDialog(
    'Apply these changes?',
    (model) => applyChanges(model),
    () => cancelChanges(),
    [],
    { yesCap: 'Apply', noCap: 'Keep editing', actions: {} },
    { id: 'apply-changes', attrs: { 'aria-label': 'Apply changes' } }
);
```

Focused native buttons retain their own Enter action. Enter elsewhere confirms; Escape cancels; prevented or composing key events do not decide. The builder does not close its host, trap focus, or settle callbacks once: those remain responsibilities of the popup/modal presentation owner. Use [`jam.modalYesNo`](#jammodalyesnocontainer-prompt-onyes-onno-styles-option) when you need its managed modal lifetime instead of an editable definition.

### `jam.modalYesNo(container, prompt, onYes, onNo, styles?, option?)`

Show a confirmation modal with Yes/No buttons. The optional sixth argument configures the boolean-or-number [`dimmer` and `blur` effects](#jamshowcurtainel-option); the fifth argument remains a styles array. For a dimmed background without blur, use `jam.modalYesNo(container, prompt, onYes, onNo, [], { dimmer: true, blur: false })`. Omitted effects retain the existing curtain defaults. Direct button or builder-keyboard decisions initiate dismissal before invoking the chosen callback. Curtain/body-Escape dismissal invokes No through the modal's dismissal callback after unmount. Both paths share the once-only decision guard; neither awaits a returned promise. These presentation options cannot replace its dismissal callback. When a failed asynchronous save must leave the dialog open, use the editable `jaml.yesNoDialog` definition with application-owned submission and a presentation lifetime suited to the task; see the [editable operation recipe](JAML/purpose-and-composition.md#choose-the-whole-operation-before-its-parts). Focused native Cancel and Confirm buttons keep their own Enter action. The dialog ignores prevented/composing key events; Enter elsewhere in the dialog confirms. Focus and background interaction follow the consuming runtime's [modal owner](#modal-focus-and-background).

```javascript
jam.modalYesNo(
    '#app',
    'Are you sure you want to delete this item?',
    () => nutmeg.success('Deleted'),
    () => nutmeg.info('Cancelled')
);
```

### `jam.closeTopModal()`

Close the topmost modal.

### `jam.showCurtain(el, option?)`

Show a blur/dimmer overlay on an element. Returns the new curtain element; if one already exists or the target is missing, returns `undefined`. Repeated calls retain the existing curtain’s effects.

`blur` and `dimmer` accept booleans or numbers. `blur: true` selects a 10-pixel radius; a numeric blur is a nonnegative radius in pixels because this API consumes geometry, not a CSS length string. `dimmer: true` selects `hsl(0 0% 0% / 0.2)`; a numeric dimmer is opacity clamped to 0–1. Both effects can compose. Negative blur clamps to zero and nonfinite numeric effects are disabled. `css` overrides the computed curtain declarations; modals use `curtainCSS` for the same purpose.

Omitting both selects blur. Disabling only blur selects the default dimmer; disabling only dimmer selects default blur. Set both to `false` (or `0`) for a clear curtain. Removing it releases those choices. `resetCurtain` changes content and click handling, not effect strengths.

```javascript
const curtain = jam.showCurtain('#app', {
    blur: true,
    onclick: () => jam.removeCurtain('#app')
});
```

### `jam.removeCurtain(el)`

Remove the curtain overlay.

---

## Locating & Highlighting

### `jam.locate(el, option?)`

Scroll to and highlight an element with a locator frame.

```javascript
jam.locate('#email-field'); // scroll + highlight
jam.locate('#email-field', { color: 'red', width: 4 }); // custom locator
```

---

## Browser agent (`jam.agent`)

`AgentUtil` exposes a transport-neutral browser inspection and interaction API. JAM-UI creates `jam.agent` when the library loads; browser tooling can call it directly without depending on the playground bridge.

### Setup and exports

| Export                               | Type                                | Description                                                                   |
| ------------------------------------ | ----------------------------------- | ----------------------------------------------------------------------------- |
| `jam.agent`                          | `JamAgentApi`                       | Default agent instance.                                                       |
| `jam.DEFAULT_AGENT_STYLE_PROPERTIES` | `string[]`                          | Computed-style properties captured by default in snapshots and style queries. |
| `jam.createAgentUtil(options?)`      | `(AgentUtilOptions) => JamAgentApi` | Create an independent instance.                                               |
| `jam.installAgentUtil(options?)`     | `(AgentUtilOptions) => JamAgentApi` | Create an instance, assign it to `jam.agent`, and return it.                  |

The corresponding TypeScript exports are `AgentLocator`, `AgentSnapshotOptions`, `AgentUtilOptions`, and `JamAgentApi`. `AgentUtilOptions` currently accepts only `defaultStyleProperties`.

```javascript
const compactAgent = jam.createAgentUtil({
    defaultStyleProperties: ['display', 'width', 'height', 'color']
});

// Replace the global instance when every integration should use this profile.
jam.installAgentUtil({
    defaultStyleProperties: ['display', 'visibility', 'width', 'height']
});
```

### Locators and snapshot scope

An `AgentLocator` can use these fields:

| Field          | Match                                                                                                     |
| -------------- | --------------------------------------------------------------------------------------------------------- |
| `jid` / `jam`  | Direct lookup by the element's `[jam="..."]` attribute. This lookup takes priority over the other fields. |
| `jno`          | Numeric JAM element number.                                                                               |
| `id`           | Exact DOM `id`.                                                                                           |
| `cap`          | Exact element `cap` value.                                                                                |
| `type`         | JAM tag name without the `jam-` prefix.                                                                   |
| `text`         | Exact trimmed `innerText`/`textContent`.                                                                  |
| `textIncludes` | Substring of `innerText`/`textContent`.                                                                   |

`AgentSnapshotOptions` supports `selector`, `scope`, `maxDepth`, and `rootLocator`. By default the agent inspects `#result, #result-card`, which is the playground render scope. Use `selector` for a specific application root or `scope: 'body'` for the full page. `maxDepth` limits serialized children, while `rootLocator` filters the roots returned by `getAgentSnapshot()`.

A serialized JAM node includes its identity, type/subtype, cap, text, rounded rect, computed styles, and applicable state such as `value`, `data`, `checked`, `disabled`, `readOnly`, and `checkType`.

### Inspection and action methods

| Method                          | Purpose                                                                                                                                          | Main payload fields                                                                                         |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `getAgentSnapshot(options?)`    | Return the current page snapshot synchronously.                                                                                                  | `selector`, `scope`, `maxDepth`, `rootLocator`                                                              |
| `runElementSnapshot(payload)`   | Return a request-correlated snapshot result.                                                                                                     | `requestId`, `options`                                                                                      |
| `runElementQuery(payload)`      | Find every matching JAM element and serialize each match.                                                                                        | `requestId`, `locator`, `options`                                                                           |
| `runElementStyles(payload)`     | Read selected computed styles for one JAM element.                                                                                               | `requestId`, `locator`, `properties`, `options`                                                             |
| `runElementProperties(payload)` | Read property paths and, optionally, members or a snapshot.                                                                                      | `requestId`, `target` or `locator`, `property`/`properties`, `includeMembers`, `includeSnapshot`, `options` |
| `runElementMethod(payload)`     | Call a method path on a DOM/JAM element.                                                                                                         | `requestId`, `target` or `locator`, `method`/`path`, `args`, `settleMs`, `includeSnapshot`, `options`       |
| `runRuntimeMethod(payload)`     | Call a method path on `jam` or another `window` namespace.                                                                                       | `requestId`, `namespace`, `method`/`path`, `args`, `settleMs`, `options`                                    |
| `runAgentAction(payload)`       | Run `click`, `set_value`, or `set_data` on one JAM element.                                                                                      | `actionId`, `locator`, `action`, `value`/`data`, `settleMs`, `options`                                      |
| `runAgentBatchAction(payload)`  | Run an ordered `actions` array and return one result per action.                                                                                 | `actionId`, `actions`, `settleMs`, `options`                                                                |
| `runElementRects(payload)`      | Read precise rects for one or more DOM/JAM targets; optionally include JAM snapshots.                                                            | `target`/`targets`, `snapshot`/`includeSnapshot`, `maxDepth`, `settleMs`, `options`                         |
| `runPointerMove(payload)`       | Dispatch `mousemove` at explicit page coordinates or relative to a target's top-left corner. A target without `position` defaults to its center. | `target`, `x`/`y`, `position`, `settleMs`, `options`                                                        |
| `runBrowserCommand(payload)`    | Dispatch `pointer_move`, `element_rects`, `element_properties`, `element_method`, or `runtime_method`.                                           | `requestId`, `command`, plus the selected command's fields                                                  |

`set_value` dispatches both `input` and `change`; `set_data` dispatches `change`. Action and method calls wait `50ms` by default before returning, while rect queries default to no delay.

Element targets can be a CSS selector string, `{ selector }`, `{ locator, options? }`, or a bare `AgentLocator`. Method arguments also support `{ $target: ... }`, `{ $locator: ... }`, and `{ $selector: ... }`; the agent resolves those wrappers to live DOM elements before invocation. Dot-separated property and method paths reject `__proto__`, `prototype`, and `constructor` segments.

```javascript
const options = { selector: '#app', maxDepth: 2 };
const snapshot = jam.agent.getAgentSnapshot(options);

const query = await jam.agent.runElementQuery({
    requestId: 'find-save',
    locator: { type: 'button', cap: 'Save' },
    options
});

const action = await jam.agent.runAgentAction({
    actionId: 'click-save',
    action: 'click',
    locator: { type: 'button', cap: 'Save' },
    options
});
```

### Direct helpers

The instance also exposes the lower-level helpers used by the request methods:

| Helper                                                                                 | Description                                                                                               |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `getRenderedJamElements(options?)`                                                     | Collect JAM elements in the selected scope.                                                               |
| `findAgentElements(locator?, options?)` / `findAgentElement(locator, options?)`        | Find every match or the first match. An empty locator returns all elements only in the plural form.       |
| `matchesAgentElement(el, locator?)`                                                    | Test the non-`jid` locator fields against an element.                                                     |
| `findDomTarget(target, options?)` / `findElementAccessTarget(payload)`                 | Resolve selector and locator target forms.                                                                |
| `getAgentStyles(el, properties?)`                                                      | Read computed styles, falling back to `window.getComputedStyle()`.                                        |
| `getRect(el)` / `getPreciseRect(el)`                                                   | Return rounded `{x, y, width, height}` or full-precision edge/size geometry.                              |
| `toAgentNode(el, elements?, options?, depth?)`                                         | Serialize one JAM element and its JAM children.                                                           |
| `describeDomTarget(el)`                                                                | Return a compact DOM/JAM identity summary.                                                                |
| `getElementMembers(el)`                                                                | List inherited and own property/method names.                                                             |
| `safeValue(value, seen?)` / `safeResultValue(value)`                                   | Convert browser values into serializable data; the latter preserves `undefined` as `{type: 'undefined'}`. |
| `getJamParent(el)` / `isJamElement(el)` / `isInputElement(el)` / `isOptionElement(el)` | JAM hierarchy and type predicates.                                                                        |
| `getSnapshotSelector(options?)`                                                        | Resolve `selector`, `scope: 'body'`, or the default playground selector.                                  |
| `getPathParts(path)` / `getPathValue(target, path)` / `getPathContext(target, path)`   | Parse and resolve safe property paths.                                                                    |
| `getRuntimePathContext(path, namespace?)`                                              | Resolve a callable path from `jam` or another `window` namespace.                                         |
| `getPropertyPaths(payload)`                                                            | Normalize `property` plus `properties` into one list.                                                     |
| `getRuntimeArg(value, options?)` / `getRuntimeArgs(args?, options?)`                   | Resolve special DOM-target argument wrappers.                                                             |
| `applyAgentAction(el, payload)`                                                        | Execute one supported action without the request/result wrapper.                                          |
| `dispatchMouseEvent(target, type, x, y)`                                               | Dispatch a composed mouse event, with a legacy event fallback.                                            |

---

## DOM utilities

### `jam.findElement(arg)`

Find a DOM element. Accepts ID string, CSS selector, or `HTMLElement` (passed through).

```javascript
const el = jam.findElement('#my-button');
const option = jam.findElement('.jam-option');
const body = jam.findElement(document.body); // pass-through
```

### `jam.applyStyle(el, styles)`

Apply inline CSS styles.

```javascript
jam.applyStyle(el, { color: 'red', fontSize: '1.2rem' });
jam.applyStyle(el, 'display:none;opacity:0.5');
```

### `jam.findScrollableParent(el)`

Find the nearest scrollable ancestor.

### `jam.bindKey(el, key, callback, event?)` / `jam.unbindKey(el, key?, event?)`

Bind or remove a global key combination for one element. Combinations use `+`, such as `ctrl+k`; comma-separated keys register multiple combinations.

### `jam.bindKeySequence(el, sequence, callback)` / `jam.unbindKeySequence(el, sequence?)`

Bind or remove a character sequence such as `'edit'`. Progress resets when focus leaves `document.body`; omitting `sequence` removes every sequence owned by the element.

### Checked-state and group helpers

Prefer an existing [option element](./JAM-UI/options.md) with `data`, or its documented custom-child usages, when it owns the selection. Use these `jam.*` helpers for controls whose application code owns grouping. They return option objects or checked state; they do not assign an enclosing option element's value or your model state for you.

> **Development compatibility:** `updateCheckedState`, `updateSiblingsCheckedState`, switch-aware `toggleCheck`, and the switch click behavior used below require the updated runtime. Older 1.6.0 bundles can lack these functions or have different group semantics. Verify the consuming runtime; matching package version text alone does not establish support for these development changes.

Membership uses an explicit `HTMLElement[]` or `NodeListOf<HTMLElement>` when provided. Otherwise, group helpers query document-wide `[group="..."]` members using the target's `group` attribute; `checkAll` uses the controller's `check-all` attribute. Keep group names unique per group instance, or pass a scoped list. Include the target in the list when it should appear in the returned selection. These helpers read each member's `element.option`; declare it through [`props.option`](./JAML/jaml-format.md#props) with a non-conflicting element member. Missing option data is not synthesized or filtered out.

| API                                                                    | Result and behavior                                                                                                                                                                                                                                                                             |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `jam.updateCheckedState(el, checked?, indeterminate?)`                 | Returns the new checked boolean. Omitting `checked` toggles `jam-checked`; an explicit boolean sets it. Updates `jam-indeterminate` and a JAM element's state when `autoState` is enabled. This is the low-level visual/state operation; it does not update a switch's boolean value.           |
| `jam.toggleCheck(el, checked?, indeterminate?)`                        | Returns the new checked boolean. For `JAM-SWITCH`, delegates to `toggle(checked)` and carries the indeterminate flag so value and checked state stay synchronized. For other elements, uses `updateCheckedState`.                                                                               |
| `jam.check(target, type = 'checkbox', siblings?)`                      | Changes the target first, then reconciles siblings and returns all selected option objects. Checkbox mode toggles; radio mode selects an ordinary element but toggles a switch, allowing cancellation.                                                                                          |
| `jam.updateSiblingsCheckedState(target, type = 'checkbox', siblings?)` | Reads the target's **already updated** checked class without toggling it. In radio mode, a checked target clears checked siblings; an unchecked target does not force a selection. Returns all checked members' option objects. With no list or group, membership defaults to the target alone. |
| `jam.checkAll(target, siblings?)`                                      | Toggles the check-all controller, applies its new state to every member, and returns the selected option objects. If no explicit list is supplied, resolves members from the controller's `check-all` attribute.                                                                                |
| `jam.toggleAll(target, siblings?)`                                     | Inverts each member individually and returns the resulting selected option objects. This is inversion, not “select every member.” Resolves members from the target's `group` when no explicit list is supplied.                                                                                 |
| `jam.getOptions(groupOrSiblings, checkedOnly = false)`                 | Reads option objects from a group-name string or an explicit array/NodeList. With `true`, includes only members with `jam-checked`. Does not change state.                                                                                                                                      |
| `jam.getDomsByGroup(group, checkedOnly = false)`                       | Returns an `HTMLElement[]` for the document-wide group, optionally restricted to checked members. Does not change state.                                                                                                                                                                        |

For checkbox reconciliation, `updateSiblingsCheckedState` also updates the matching `[check-all="..."]` controller: all members selected means checked, a nonempty partial selection means indeterminate, and none means unchecked. `check` inherits this behavior; `toggleAll` also updates the aggregate. The explicit list controls which members count, while the check-all controller is still located by the group attribute.

#### Cancelable switch group

This complete example targets the updated runtime described above. Clicking **Fixed**, then **Ignore**, then **Ignore** again produces `fixed`, `ignore`, then `null`. For repeated instances, give each group its own name or derive a scoped list from the instance owner.

```javascript jaml-playground
export default {
    type: 'container',
    vars: {
        disposition: null,
        choices: [
            { value: 'fixed', name: 'Fixed' },
            { value: 'ignore', name: 'Ignore' }
        ]
    },
    components: [
        {
            type: 'switch-button',
            buildFor: 'choice in choices',
            key: 'value',
            cap: '{{choice.name}}',
            autoState: true,
            attrs: { group: 'wiki-review-disposition' },
            props: { option: '{{choice}}' },
            onclick(event) {
                event.preventDefault();
                jam.toggleCheck(this);
                const _siblings = this.parentElement.querySelectorAll('jam-switch[group="wiki-review-disposition"]');
                const _selected = jam.updateSiblingsCheckedState(this, 'radio', _siblings);
                this.vars.disposition = _selected[0]?.value ?? null;
            }
        },
        {
            type: 'indicator',
            cap: 'Disposition',
            value: "{{disposition || 'None'}}"
        }
    ]
};
```

The declared click hook runs before the switch's built-in click handler. `preventDefault()` suppresses that handler's toggle; `toggleCheck` performs the single intended update, then `updateSiblingsCheckedState(..., 'radio', ...)` reconciles the already updated target. Using `check` after this toggle would toggle the switch again. Do not combine this click owner with `usage: 'option'` on the same control.

A switch's `onvaluechange` hook runs before its checked class is synchronized. Clearing a sibling can also fire that sibling's value-change callbacks. The example keeps group reconciliation in the click hook, so these notifications do not recursively run the group operation. If your application also changes these controls from bindings, shortcuts or other programmatic paths, route those changes through an equally explicit state/group owner; this click recipe does not observe every external value write.

### `jam.basicallyStable(el)`

Combines the readiness checks for the element and its current descendants. Each options-element wait races its first `optionReady` against a timeout; a container contributes its `isStable` promise. The options timeout does not bound every container wait and can expire before options finish loading.

Resolution does not guarantee final geometry, visibility, fonts/images, later children or animation completion. Await the specific control/resource signal needed by the operation, then check the geometry or interaction you depend on. This helper is not a universal readiness barrier.

```javascript
await jam.basicallyStable(myElement);
// Limited waits have settled; verify the specific readiness/geometry you need.
```

For a first options render, the narrower [`optionReady`](./JAM-UI/JAM-UI.md#optionready) contract remains available; it does not promise that all later data updates or animations have finished.

---

## Storage

In the current development runtime, storage areas are resolved once when the runtime loads. If accessing an area or its initial read throws (for example in an opaque `sandbox="allow-scripts"` iframe), or the area is absent, Jam-UI uses a separate in-memory area for that realm. Reloading/replacing the frame loses it. Available native storage keeps its original identity and behavior. Jam-UI does not replace browser globals, synthesize storage events or create cross-frame persistence/bridging. Session-ID creation uses the same resolved session area.

This fallback covers initial absence/unreadability. Native write/quota errors and access revoked after initialization retain their existing error behavior. It does not relax CSP or change serialization: the existing deserializer evaluates serialized expressions, and `getFromStorage` returns the raw stored string when deserialization fails, including when CSP blocks evaluation. A storage fallback is not an application action/state bridge.

`STORAGE_TYPE.SESSION_ONLY`, `LOCAL_ONLY` and `BOTH` select the area. Saves default to local; reads default to session-first `BOTH`. Use `jam.STORAGE_TYPE` constants rather than strings such as `'session'`.

### `jam.save2Storage(key, value, type?)`

Save data to localStorage (default) or sessionStorage.

```javascript
jam.save2Storage('user-preferences', prefs);
jam.save2Storage('session-data', data, jam.STORAGE_TYPE.SESSION_ONLY);
```

### `jam.getFromStorage(key, defaultValue?, storageType?)`

Read data from storage.

```javascript
const prefs = jam.getFromStorage('user-preferences', {});
```

---

## File utilities

### `jam.downloadAsFile(name, content)`

Trigger a file download in the browser.

```javascript
jam.downloadAsFile('data.json', JSON.stringify(myData));
jam.downloadAsFile('export.csv', csvString);
```

### `jam.addResource(url)`

Dynamically load a JS/CSS module. Returns a promise.

```javascript
const module = await jam.addResource('/assets/my-component.mjs');
```

For CSS, this loads a stylesheet link and caches its promise. Await `jam.addResource('/assets/fontawesome/css/all.min.css')` after packaging the matching font assets. The individual loader rejects failed resources; `jam.addResources` catches individual failures. Font readiness and glyph availability require a separate application check. See [font-icon composition](JAM-UI/button.md#sidebar-icons-and-left-aligned-captions).

---

## Type & value helpers

### `jam.toEval(str, context?)`

Evaluate a trusted JavaScript expression. The optional context supplies named values and `this`; it is not a sandbox. Never pass external input as an expression. Evaluation can throw, and a Content Security Policy that blocks dynamic evaluation can prevent it. Use `JSON.parse()` for external JSON data.

```javascript
const fn = jam.toEval('(a, b) => a + b');
fn(1, 2); // → 3

jam.toEval('this.value * 2', { value: 5 }); // → 10
```

### `jam.serialize(value)`

Convert a supported value into a JavaScript expression string, or use its serializable representation. This is not a lossless object-graph format: cycles produce non-restorable markers, undefined array entries can be omitted, and prototypes or shared identity are not preserved. Optional `encodeURI` and `base64` encode the result; they do not make it safe to evaluate.

### `jam.deserialize(str)`

Decode the requested `encodeURI`/`base64` layers and evaluate the resulting trusted JavaScript expression. This is not a JSON parser or sandbox. Invalid expressions, cycle markers and blocked evaluation throw; arbitrary values are not guaranteed to round-trip. Use `JSON.parse()` for external JSON.

### `jam.random(start?, end?)`

Return `start + Math.round(Math.random() * (end - start))`, with `start = 0` and `end = start + 100`. For integer endpoints, results are integers and both endpoints are possible. A single argument sets the start, not the maximum. Rounded sampling is not uniform across the endpoints.

```javascript
jam.random(); // integer from 0 through 100
jam.random(100); // integer from 100 through 200
jam.random(10, 20); // integer from 10 through 20
```

### `jam.isJamElement(el)`

Check if an element is a JAM-UI custom element.

### `jam.isComponentOption(value)`

Check if a value is a valid JAML component option.

### `jam.camelCase(str)` / `jam.kebabCase(str)` / `jam.flatCase(str)`

String case conversion utilities.

---

## Runtime config

| Property           | Type      | Description               |
| ------------------ | --------- | ------------------------- |
| `jam.version`      | `string`  | Library version           |
| `jam.sessionId`    | `string`  | Unique session identifier |
| `jam.debugMode`    | `boolean` | Enable verbose logging    |
| `jam.logLevel`     | `Level`   | Log level threshold       |
| `jam.defaultTheme` | `string`  | Default theme name        |

`jam.Theme.assetsPath` controls the directory used by initial theme discovery and defaults to `assets/themes`. Set it before automatic initialization begins; for classic scripts, use the [pre-load theme asset attribute](#theme-assets-for-classic-script-embedding). `jam.Theme.reload()` reloads the current page by default and may be overridden by hosts such as an IDE webview that owns its reload lifecycle.

---

## Logging (`lime.*`)

`lime.*` writes developer-console diagnostics. When feedback must be visible to the user, use `nutmeg.info`, `nutmeg.success`, `nutmeg.warn`, or `nutmeg.error` instead.

```javascript
lime.log('General log');
lime.info('Information');
lime.warn('Warning');
lime.error('Error message');
lime.debug('Debug detail');
lime.prompt('Development-only log (debug mode required)');

// Color-named console logging
lime.red('Error in red');
lime.green('Success in green');
```

---

---

## Additional utilities

### DOM creation & traversal

| Method                                   | Description                                                                 |
| ---------------------------------------- | --------------------------------------------------------------------------- |
| `jam.dom(tagName, children?, attrs?)`    | Create a DOM element with children and attributes. Alias: `jam.buildDom`.   |
| `jam.appendChild(parent, children)`      | Append one or multiple children to a parent, with optional index/prepend.   |
| `jam.el(selector)`                       | Shorthand for `jam.findElement` — accepts ID, CSS selector, or HTMLElement. |
| `jam.findChild(el, selector)`            | Find the first direct child matching selector.                              |
| `jam.findParent(el, selector?)`          | Find the nearest ancestor matching selector (or just parentElement).        |
| `jam.closest(el, selector)`              | Find the closest ancestor matching selector via `el.closest()`.             |
| `jam.findScrollableParent(el)`           | Find nearest scrollable ancestor.                                           |
| `jam.addClass(el, className)`            | Add class(es) to element. Prefix with `-` to remove instead.                |
| `jam.removeClass(el, className)`         | Remove class(es) from element. Accepts string or RegExp.                    |
| `jam.hasClass(el, className)`            | Check if element has a class (string or RegExp).                            |
| `jam.toggleClass(el, className, force?)` | Toggle a class on element.                                                  |
| `jam.removeAllChildren(el)`              | Remove all child nodes from element.                                        |
| `jam.removeChild(parent, child?)`        | Remove child by reference, selector, or clear all children.                 |
| `jam.html(htmlString)`                   | Parse HTML string into Node(s).                                             |

### DOM queries & geometry

| Method                                                        | Description                                                                                                           |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `jam.getIdentity(el)`                                         | Get a readable tag#id.class string for an element.                                                                    |
| `jam.diagonal(el)`                                            | Calculate the diagonal length of an element (sqrt(w² + h²)).                                                          |
| `jam.area(el)`                                                | Calculate pixel area of an element.                                                                                   |
| `jam.basicallyStable(el)`                                     | Combine current descendant readiness checks with a timeout on each options wait; see [limits](#jambasicallystableel). |
| `jam.getCentroid(el)`                                         | Get `{x, y}` center point of an element's bounding rect.                                                              |
| `jam.isOverflow(el, bias?)`                                   | Check if element content overflows its bounds.                                                                        |
| `jam.ellipsify(text, clazzes?)`                               | Return HTML string with text truncated by ellipsis in the middle.                                                     |
| `jam.checkVisibility(el)`                                     | Check if element is actually visible (not hidden/display:none).                                                       |
| `jam.isHidden(el)`                                            | Check if element has `.jam-hide` class.                                                                               |
| `jam.setHide(el, value)`                                      | Toggle visibility — uses `.hide()/.show()` for Jam elements, `.jam-hide` class otherwise.                             |
| `jam.holdSpace(el, option?)` / `jam.unholdSpace(el, option?)` | Hold/release element dimensions to prevent layout shift.                                                              |
| `jam.keepSize(el, type?)` / `jam.releaseSize(el, type?)`      | Keep/release element size by setting CSS custom properties.                                                           |
| `jam.syncSize(el, option?)`                                   | Sync element size to CSS custom properties for later use.                                                             |

### Styling & FLIP animation

| Method                                                           | Description                                                                                                                                                    |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `jam.applyStyle(el, styles)`                                     | Apply inline CSS styles (object or string).                                                                                                                    |
| `jam.getStyle(el, prop)`                                         | Get computed style value for a property.                                                                                                                       |
| `jam.parseCSSVariable(el, value)`                                | Resolve one traversal of element-scoped `var()` / `calc()` expressions. Use a bounded, cycle-guarded repeat when a substitution introduces another expression. |
| `jam.switchStyle(el, style1, style2, force)`                     | Apply `style1` when `force` is true, otherwise apply `style2`.                                                                                                 |
| `jam.removeStyle(el, ...keys)`                                   | Remove inline style properties.                                                                                                                                |
| `jam.hasStyle(el, key)`                                          | Check if element has an inline style for a key.                                                                                                                |
| `jam.getAppliedStyles(el)`                                       | Return applied declarative style paths from the element's style expando.                                                                                       |
| `jam.styleApplied(el, path)`                                     | Check whether an applied declarative style path starts with `path`.                                                                                            |
| `jam.styleFlip(el, style, options?)`                             | FLIP animation — record first layout, apply style, animate to new layout. Alias: `jam.applyStyleAnimatedly`.                                                   |
| `jam.flip(target, style?)`                                       | Initiate a FLIP measurement (call `.play()` later).                                                                                                            |
| `jam.positionFlip(action, elements, options?)`                   | Run an action, then FLIP-animate all elements back to original positions.                                                                                      |
| `jam.applyTransform(el, transform, method?, varName?, prepend?)` | Apply CSS transform, compositing with existing transforms.                                                                                                     |
| `jam.compositeTransform(oldValue, newValue, method?, prepend?)`  | Merge two transform strings (add/replace/accumulate).                                                                                                          |
| `jam.convert2Px(value, el?)`                                     | Convert any CSS unit to pixels.                                                                                                                                |
| `jam.convert2Rem(value)`                                         | Convert px value to rem number.                                                                                                                                |
| `jam.rem(n)`                                                     | Convert `n` rem to pixel value.                                                                                                                                |
| `jam.convert2Pct(value, denominator?)`                           | Convert value to a percentage number.                                                                                                                          |
| `jam.getRootFontSize()`                                          | Get computed root font-size in pixels.                                                                                                                         |

### Number utilities

| Method                                 | Description                                                                                                     |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `jam.random(start?, end?)`             | Rounded random offset from start. Defaults: start=0, end=start+100; integer endpoints yield inclusive integers. |
| `jam.randomValue(start?, end?)`        | Alias for `jam.random` — random integer in range.                                                               |
| `jam.randomIn(...args)`                | Pick a random argument from the list.                                                                           |
| `jam.toNumber(value, parsePct?)`       | Extract number from any value (string, CSS unit, percent).                                                      |
| `jam.isNumber(value)`                  | Strict type check — is value a valid number (not NaN, not leading-zero string).                                 |
| `jam.clamp(value, min, max)`           | Clamp a number to the inclusive `min`–`max` range.                                                              |
| `jam.round(number, decimalPlace?)`     | Round a number to the specified decimal places.                                                                 |
| `jam.toInteger(value)`                 | Round to integer.                                                                                               |
| `jam.toFixed(number, decimalPlace?)`   | Round and return fixed-point string.                                                                            |
| `jam.toPercent(value, decimalPlace?)`  | Convert to percentage string (e.g., 0.5 → `"50.00%"`).                                                          |
| `jam.seq(end)` / `jam.seq(start, end)` | Generate an array of sequential integers.                                                                       |

### Date & time utilities

| Method                                                                                                | Description                                                                                                                                                            |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `jam.parseDate(value)` / `jam.parseTime(value)`                                                       | Parse dates, timestamps, compact `yyyyMMdd` strings, and time-like strings into `Date`.                                                                                |
| `jam.toDate(value)`                                                                                   | Convert `Date`, timestamp, or string input to `Date`.                                                                                                                  |
| `jam.formatTime(value, pattern)` / `jam.formatDate(value, pattern)`                                   | Format date/time values with tokens such as `yyyy`, `yy`, `MMM`, `MM`, `M`, `dd`, `d`, `HH`, `H`, `hh`, `h`, `a`, `mm`, `m`, `ss`, `s`, `SSS`, `w`, `W`, and `星期几`. |
| `jam.truncToDay(date)` / `jam.truncToWeek(date)` / `jam.truncToMonth(date)` / `jam.truncToYear(date)` | Return a new `Date` truncated to that boundary.                                                                                                                        |
| `jam.getRelativeTimeStr(time, format?)`                                                               | Format today/yesterday/recent dates with a relative Chinese label.                                                                                                     |

`hh` / `h` format padded / unpadded 12-hour time; `a` emits `am` or `pm`. For example, `jam.formatTime(date, 'hh:mm a')` renders `09:05 am`. Existing uppercase `HH` / `H` retain 24-hour behavior. These tokens require the updated development runtime.

`jam.formatDuration(milliseconds)` formats a finite nonnegative elapsed interval in whole days, hours, minutes and seconds, such as `1m 6s` or `1d 1h 1m 1s`. Subsecond intervals return `0s`; invalid or negative values return an empty string. Validate missing/invalid timestamps before subtraction. The application chooses duration endpoints, labels, date/day/year policies and tooltip wording.

### String utilities

| Method                                                                          | Description                                                                             |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `jam.extract(str, pattern)`                                                     | Extract text from string using regex. Returns capture group 1 if present, else match 0. |
| `jam.titleCase(str)`                                                            | Convert string to Title Case.                                                           |
| `jam.camelCase(str)` / `jam.kebabCase(str)` / `jam.flatCase(str)`               | String case conversions (already documented above).                                     |
| `jam.pascalCase(str)` / `jam.snakeCase(str)` / `jam.camelSnakeCase(str)`        | Additional case conversions.                                                            |
| `jam.format(str, values)`                                                       | Template string with `{key}` placeholders, filled from a dictionary or positional args. |
| `jam.splitString(str, ...args)`                                                 | Split string by indices, separator, or emoji-aware characters.                          |
| `jam.squeeze(str, char?)`                                                       | Collapse consecutive occurrences of a character.                                        |
| `jam.isHTMLString(str)` / `jam.isJSONString(str)` / `jam.isMarkdownString(str)` | Language detection helpers.                                                             |
| `jam.guessLanguage(str, fallback?)`                                             | Guess `HTML`, `JSON`, `JavaScript`, `Mermaid`, or the provided fallback.                |
| `jam.randomString(length, option?)`                                             | Generate random pronounceable string with configurable character sets.                  |
| `jam.strip(text, ...replaced?)`                                                 | Trim and strip surrounding characters.                                                  |
| `jam.randomEmoji(type?)`                                                        | Pick a random emoji (optionally from a category).                                       |

### Object & array utilities

| Method                                              | Description                                                                                                          |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `jam.cloneDeep(value)`                              | Clone through built-in handling or a registered constructor handler; see the registration and import boundary below. |
| `jam.registerCloner(Constructor, handler)`          | Register or replace an exact-constructor clone handler.                                                              |
| `jam.clone(source, deep?)`                          | Shallow or deep clone.                                                                                               |
| `jam.nullOrUndefined(value)`                        | Check if value is null or undefined.                                                                                 |
| `jam.notNullOrUndefined(value)`                     | Inverse check.                                                                                                       |
| `jam.isEmpty(value)`                                | Check if value is null, undefined, empty array, empty object, or empty string.                                       |
| `jam.isValid(value)`                                | Not null, not undefined, and not NaN.                                                                                |
| `jam.isSame(a, b)`                                  | Deep equality comparison (recursive, handles Date, RegExp, arrays).                                                  |
| `jam.isDictionary(o)`                               | Check if value is a plain object (not array, not wrapper).                                                           |
| `jam.isArrayLike(o)`                                | Check if object is array-like (numeric keys).                                                                        |
| `jam.isPrimitive(value)`                            | Check for primitive type.                                                                                            |
| `jam.findIndex(array, item, compare?)`              | Find index of an item with deep equality.                                                                            |
| `jam.indexOf(array, item)`                          | Alias for `jam.findIndex` with default deep comparison.                                                              |
| `jam.removeFirstFromArray(array, target, inplace?)` | Remove first matching element from array.                                                                            |
| `jam.removeAllFromArray(array, target, inplace?)`   | Remove all matching elements from array.                                                                             |
| `jam.dedupArray(array, compare?, inplace?)`         | Remove duplicate values from array.                                                                                  |
| `jam.mergeArrays(target, source, compare?)`         | Merge two arrays without duplicates.                                                                                 |
| `jam.diffArray(target, source)`                     | Get added and removed elements between two arrays.                                                                   |
| `jam.flattenArray(arr)`                             | Flatten nested arrays to any depth.                                                                                  |
| `jam.groupBy(array, keyFn)`                         | Group array elements by a key function.                                                                              |
| `jam.merge(target, source, option?)`                | Deep merge objects with join mode control.                                                                           |
| `jam.assign(target, source, option?)`               | Assign properties from source to target (with join control).                                                         |
| `jam.omit(o, ...keys)` / `jam.pick(o, ...keys)`     | Return a new object excluding/including specific keys.                                                               |
| `jam.getByPath(obj, path, fallback?)`               | Access nested property by dot-separated path string.                                                                 |
| `jam.setByPath(obj, path, value)`                   | Set nested property, creating intermediate objects/arrays as needed.                                                 |
| `jam.findDescriptor(target, property)`              | Find an own or inherited property descriptor.                                                                        |
| `jam.flattenObject(o, flattenArray?, parent?)`      | Flatten nested object to dot-separated keys.                                                                         |
| `jam.unFlattenObject(o)`                            | Revert a flattened object back to nested form.                                                                       |
| `jam.prune(o)`                                      | Remove keys with `undefined` values from an object.                                                                  |
| `jam.proxy(target, overrides)`                      | Create a Proxy with property overrides.                                                                              |

#### Clone registration and imports

`jam.registerCloner(Constructor, handler)` replaces the handler for that exact `value.constructor`; a different subclass constructor needs its own registration. `handler(value)` returns the finished clone and owns any cloning and reference handling inside it. Registration participates in the existing cloneable-value path; it does not broaden which values `cloneDeep` treats as cloneable.

The standard Jam runtime and its color entrypoints (`ColorSet`, `ColorProfile` and color utilities) register Chroma color cloning automatically, preserving the color and alpha in an independent color instance. A low-level `cloneDeep` import used with a separately imported `chroma-js` constructor must load the Jam color integration or explicitly register that constructor. The clone utility does not consult the `jam` global to obtain its handler.

The registration API is part of the development runtime; verify availability in the installed version before using it.

### Type utilities

| Method                                     | Description                                                                                      |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `jam.toArray(value, separator?, type?)`    | Convert string to array (split by separator), or wrap single value in array.                     |
| `jam.toBoolean(value)`                     | Coerce value to boolean.                                                                         |
| `jam.toFunction(value, context?, ...args)` | Convert string or value into a Function.                                                         |
| `jam.toEval(str, context?)`                | Evaluate trusted JavaScript; no sandbox or error suppression. See the evaluation contract above. |
| `jam.toDictionary(value)`                  | Convert entries array or string to a dictionary.                                                 |
| `jam.toString(value)`                      | Convert any value to string.                                                                     |
| `jam.toLiteral(value, replacer?)`          | Serialize any value to a JavaScript literal expression string.                                   |
| `jam.castTo(value, type)`                  | Cast value to a target type.                                                                     |

### Runtime & async

| Method                                                                                                        | Description                                                                                               |
| ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `jam.Runtime.env`                                                                                             | Runtime environment info: `os`, `browser`, `build`, `mode`, `laterThan()`, `earlierThan()`.               |
| `jam.Constants`                                                                                               | Internal constants: `a2Z0`, `jamlogo`, `jamuilogo`, `State` enum, and more.                               |
| `jam.asyncCall(fn, context?, ...args)`                                                                        | Invoke immediately in Runtime.syncMode; otherwise schedule a microtask. Does not await returned promises. |
| `jam.riskCall(fn, context?, ...args)`                                                                         | Catch and log synchronous invocation errors; returned promise rejections are not caught.                  |
| `jam.safeCall(fn, context?, ...args)`                                                                         | Call function if it's a function (does not catch errors).                                                 |
| `jam.beforeNextRepaint(callback?)`                                                                            | Schedule callback before next repaint (rAF).                                                              |
| `jam.afterNextRepaint(callback?)`                                                                             | Schedule callback after next repaint (double rAF).                                                        |
| `jam.sleep(ms)`                                                                                               | Async sleep (Promise-based timeout).                                                                      |
| `jam.until(fn, interval?, retryCount?, check?)`                                                               | Poll a function until it returns a truthy value.                                                          |
| `jam.windowLoaded`                                                                                            | Promise that resolves when `window.load` fires.                                                           |
| `jam.getSessionId()`                                                                                          | Get or generate a unique session ID.                                                                      |
| `jam.isBrowser()` / `jam.isNode()` / `jam.isElectron()` / `jam.isMac()` / `jam.isSafari()` / `jam.isChrome()` | Environment detection helpers.                                                                            |
| `jam.makeThrottle(fn, delay, finish?, context?)`                                                              | Create a throttled function wrapper.                                                                      |
| `jam.rafThrottle(fn, context?, withLock?)`                                                                    | Create a rAF-throttled function wrapper.                                                                  |
| `jam.makeDebounce(fn, delay, context?)`                                                                       | Create a debounced function wrapper.                                                                      |
| `jam.bindInterval(el, callback, interval, fixedRate?, alignToInterval?)`                                      | Start an interval tied to element lifecycle (auto-cleared on unmount).                                    |

### Easing

| Method                                                               | Description                                                                                                                                      |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `jam.easeProgress(progress, iteration, easing?, direction?, scale?)` | Calculate eased progress value. Easing: string name, cubic-bezier array, or function. Directions: normal, reverse, alternate, alternate-reverse. |
| `jam.getEasingCSS(easing)`                                           | Resolve easing name to `cubic-bezier(...)` string.                                                                                               |

### File & network utilities

| Method                                                             | Description                                                            |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `jam.ajaxCall(url, onsuccess?, onerror?)` / `jam.ajaxCall(option)` | Make an AJAX request via `raspberry.request()`.                        |
| `jam.downloadAsFile(filename, content)`                            | Trigger a browser file download.                                       |
| `jam.makeFileDroppable(el, handler, prompt?, accept?)`             | Make an element a file drop zone.                                      |
| `jam.attachFiles(handler, multiple?)`                              | Open a file picker dialog.                                             |
| `jam.viewFileInWindow(fileInfo, option?)`                          | Open a FileInfo object in a new browser window.                        |
| `jam.buildFileInfo(file)`                                          | Read a File object into a `FileInfo` struct (text or base64 data URL). |
| `jam.addResource(url, attributes?)`                                | Dynamically load a JS/CSS module. Returns a promise.                   |

### Copy & storage

| Method                                                 | Description                                                               |
| ------------------------------------------------------ | ------------------------------------------------------------------------- |
| `jam.copyText(text)` / `jam.copy2Clipboard(text)`      | Copy text to clipboard.                                                   |
| `jam.save2Storage(key, value, storageType?)`           | Save to localStorage (default) or sessionStorage.                         |
| `jam.getFromStorage(key, defaultValue?, storageType?)` | Read from storage (auto-deserializes).                                    |
| `jam.removeFromStorage(key)`                           | Remove key from storage.                                                  |
| `jam.serialize(value, options?)`                       | Serialize a supported value as an expression; round-trip limits apply.    |
| `jam.deserialize(str, options?)`                       | Evaluate a trusted serialized expression; can throw and is not a sandbox. |

### Web utilities

| Method                             | Description                                                                |
| ---------------------------------- | -------------------------------------------------------------------------- |
| `jam.parseParams(url)`             | Parse URL query or hash parameters into a dictionary.                      |
| `jam.getUrlParams()`               | Get current URL parameters as an `EasyGet` object (hash params preferred). |
| `jam.mergeParam2Url(url, params)`  | Merge parameters into a URL, preserving existing params.                   |
| `jam.removeParamFromUrl(url, key)` | Remove a parameter from a URL.                                             |
| `jam.popNewWindow(url, option?)`   | Open a new browser window with specified features.                         |

### Miscellaneous utilities

| Method                                     | Description                                                        |
| ------------------------------------------ | ------------------------------------------------------------------ |
| `jam.genUUID()` / `jam.genGUID()`          | Generate a random UUID or GUID string.                             |
| `jam.hashCode(value)`                      | Compute a consistent hash code for any value.                      |
| `jam.autoReplace(value)`                   | Replace `JAML` and `JAM-UI` tokens with styled logo HTML.          |
| `jam.getNextOption(arr, curr)`             | Get next element in array cycling from current.                    |
| `jam.pipe(...fns)` / `jam.compose(...fns)` | Function composition helpers.                                      |
| `jam.parseVars(str, context?)`             | Parse template string with variables from context (uses `toEval`). |
| `jam.normalizeSelector(selector)`          | Clean a string to a valid CSS class/ID name.                       |

## Example: common patterns

```javascript jaml-playground
export default {
    type: 'container',
    components: [
        {
            type: 'button',
            cap: 'Show notification',
            onclick() {
                nutmeg.success('Hello from JAML!', { duration: 2000 });
            }
        },
        {
            type: 'button',
            cap: 'Confirm action',
            onclick() {
                jam.modalYesNo(
                    this,
                    'Delete this item?',
                    () => nutmeg.warn('Deleted'),
                    () => nutmeg.info('Cancelled')
                );
            }
        },
        {
            type: 'button',
            cap: 'Download',
            onclick() {
                jam.downloadAsFile('export.json', JSON.stringify({ status: 'ok' }));
            }
        }
    ]
};
```

## Style restoration and host theme integration

| API                                           | Description                                                                                                                                                                                              |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `jam.replaceStyle(el, style, { important? })` | Apply temporary inline styles and return a backup. Preserves affected shorthand families and priorities; restore with `jam.applyStyle(el, backup)`. `important: true` forces the temporary declarations. |
| `jam.playFlips(flips, animationOption?)`      | Play a batch of captured `Flip` objects, retargeting active layout animations together. `jam.flipAnimate()` uses this batch path.                                                                        |
| `jam.SystemTheme.getDarkMode()`               | Read the host's system dark-mode preference.                                                                                                                                                             |
| `jam.SystemTheme.getAccentColor()`            | Read the host's system accent as a Chroma color.                                                                                                                                                         |
| `jam.refreshSystemAccentColor()`              | Reapply the system color when the current saved accent choice is `system`.                                                                                                                               |

See [system theme integration](./color.md#system-theme-and-saved-choices).

## Owned external subscriptions and follow scrolling

`jam.mount(mountCallback, unmountCallback)` returns a plugin builder; returning a function from `mountCallback` is not its cleanup contract. Pair acquisition/release using plugin-local element data and follow the [mount and shared-owner lifetime](Styles/styles.md#mount-and-shared-application-lifetime). Seed external state explicitly when a subscription does not replay it. Keep each setup's identity with its callbacks: a synchronous subscription callback may unmount the owner before `subscribe` returns, so immediately release a late returned disposer and ignore callbacks from obsolete setups.

`jam.followScrollToBottom(scrollElement, options?)` returns `{ following, reserveBottom(space?), update(), pause(), resume(), notifyScrollIntent(intent), destroy() }` in the updated development runtime. The one-argument form remains manually updated: call `update()` after content growth and `destroy()` on teardown. Without an active or remaining bottom reserve, content mutation tracking only recognizes browser clamps and does not schedule scroll writes. An existing reserve is also maintained on content mutations; other layout changes still require manual updates unless `content` observation is enabled. `update()` also recognizes a bottom clamp observed by caller-owned resize handling before later growth; pending reader intent takes priority. The supplied-content form schedules updates automatically. Optional `{ content: HTMLElement, onChange(following, controller), chain: false }` observes both the viewport and a stable uncapped descendant. It also observes content tree/text mutations to recognize browser bottom clamping during layout shrink before later content regrowth and delayed scroll delivery. This prevents those layout changes from falsely pausing following; genuine upward input still pauses. For completed history, pause the controller before disclosure; the plugin form can initialize this policy in `connect` before its first scheduled update. Upward input or text selection pauses; `resume()` explicitly rejoins latest. User downward scrolling to bottom also rejoins during its active scroll gesture. A later programmatic move does not imply reader consent. Hidden viewports receive no writes; reveal preserves following/paused state.

Registered nested follow owners isolate input even when short by default. Opt-in `chain: true` allows vertical wheel at top/up, bottom/down or over nonoverflowing content to reach the enclosing owner. Native overscroll must allow that movement; the helper does not change its host CSS. Ordinary scroll boxes pass matching boundary wheel unless their overscroll policy blocks it. Scrolling within an overflowing box and selection within a nested owner remain locally owned. Already canceled, zoom and horizontal wheel input is ignored. This wheel acceptance does not qualify touch chaining.

Unsolicited upward movement pauses following and cancels queued work even before delayed external intent arrives. Explicit `resume()` corrects queued motion only during bounded settlement: bottom must stay quiet across a rendering opportunity; `scrollend` alone is not completion. A no-op resume creates no continuing correction grant. New upward intent, hidden/disconnected state or disposal retires that settlement. Normal content growth still follows, but its writes and events reporting owned positions do not extend the preceding gesture's correction permission. Motion arriving after settlement is treated as new reading movement. This settlement also terminates on hosts without `scrollend`.

For trusted external input, such as an application-owned iframe bridge, `notifyScrollIntent('up')` pauses and cancels pending work. `notifyScrollIntent('down')` may resume only at actual bottom, immediately or within the existing scheduled rendering opportunity; it never pulls a paused reader from the middle. Permission expires after that opportunity even if no scroll occurs. Delayed movement needs another signal or explicit `resume()`. Repeated signals renew the opportunity. Optional `notifyScrollIntent('end')` cancels intent permission without changing follow state; a wheel-end event is not required. Native gestures retain their separate `scrollend` lifetime. The app owns source/channel validation, final canceled-input filtering and bridge teardown; no remote document access or child-selected absolute scroll positions are needed.

For declarative ownership use [Plugins.followScroll](Plugins/follow-scroll.md). It connects a controller per mount, observes sizes, and releases resources on unmount. It temporarily applies vertical overscroll `contain` by default or `auto` with `chain: true`, restoring the prior inline policy on cleanup unless another owner changed it. CSS auto also permits native touch chaining, which needs separate target-device qualification. App owns Latest button wording, cap size and collapse policy. Use only one follow owner per viewport; do not combine it with another position writer or saved-position restoration on that viewport. This helper does not virtualize messages, fetch history, or preserve row anchors. Older bundles may lack `reserveBottom()`, `resume()`, observation options, `chain` or `notifyScrollIntent`; check the actual consuming runtime.

`jam.makeFileDroppable(target, onDrop, prompt?, accept?, beginRead?)` keeps its ordinary per-drop delivery by default. The optional `beginRead(files)` receives a raw `File[]` snapshot before asynchronous reads. Returning exactly `false` vetoes those reads. Returning a predicate retains the existing delivery-only check: a false predicate result suppresses obsolete delivery after reading and does not cancel reads. Use the predicate to capture a consumer-owned generation when replacement semantics are needed. Native `input-file` exposes this boundary through its documented `onfileselect` hook.

`jam.renderModal` routes Escape/curtain dismissal to the top modal's own `onclose` callback and respects `click2Close`. Canceled/composing Escape and ordinary typing do not dismiss. Programmatic `closeTopModal()` does not invoke this dismissal callback. `modalYesNo` settles its yes/no decision once and closes its own modal during exit animation. See the runtime-qualified [modal focus and background contract](#modal-focus-and-background).

### Reserving space for streaming content

In a reserve-capable runtime, `controller.reserveBottom(space = 12)` reserves a consumable tail for incoming content and returns an idempotent release function. `space` is a positive finite number in **rem**, not a CSS string; invalid values throw. Reuse the viewport's existing controller. Nothing reserves space until the host calls this method, and it does not resume a paused reader.

-   A visible, following viewport acquires a lease. Calls while paused, hidden, printing or destroyed return a no-op release without acquiring one.
-   Growing content consumes the reserved tail without continuously pushing its bottom farther away. When exhausted while still following, it refills one chunk using the largest active lease size. Overlapping leases share the same reserve rather than adding their sizes together.
-   Call the returned release when that streaming block ends. It stops that lease's future refills and **keeps the remaining space** for subsequent content to consume; it does not collapse the tail at fence closure. After the final lease is released and its remainder consumed, the reserve disappears.
-   Pausing cancels movement and prevents refills; incoming content can still consume the remainder. The existing follower eases added scroll range; reduced motion follows immediately. Printing temporarily hides the reserve. `destroy()` removes it and invalidates all leases; old leases do not transfer to a replacement controller.

The reserve is a non-component trailing node inside the follower's `options.content`, or inside the viewport when `content` is omitted. That host must use ordinary start-aligned vertical flow, without transforms, reversed/distributed layout or inter-child gap. Leave the reserve last and outside the component list. With lazy retained content, choose a stable host **inside the existing retained extent**, after its tail spacer; putting the reserve after the lazy host as a sibling does not satisfy this contract. The reserve preserves caller padding and minimum sizing. It does not replace the separate viewport reservation used for explicit row navigation.

For native JAMLL streaming, bridge [Markdown's `onJamllStream` hook](Plugins/markdown.md#streaming-space-and-scroll-ownership) to this method. Markdown owns release at block closure, finish or disposal; the application owns the current viewport controller, reader-intent policy and teardown. The streamer does not install this bridge automatically.

### Preparing deferred scroll destinations

`await jam.prepareScrollTop(target, top, signal)` prepares component viewport content before an application's existing scroll owner writes its position. Use the corrected development runtime and call after the owning JAML model is mounted with a measurable scroll root.

-   A nonnegative finite `top` prepares enough of each registered viewport's loaded prefix for that offset, or stops at exhaustion.
-   `Infinity` prepares all currently supplied lazy rows. It does not fetch history; keep the supplied window bounded.
-   The required `AbortSignal` cancels obsolete work. The promise returns false on cancellation or owner disconnection, and invalid offsets reject. Starting another preparation on the same lazy owner supersedes its pending preparation.
-   The helper does not write `scrollTop`, persist position, resume following or resolve message IDs. After readiness, the application writes its saved finite offset or the current `scrollHeight` for a latest jump. Native viewport refresh then restores parked rows at that position.

```javascript
const controller = new AbortController();
const destination = savedTop ?? Infinity;
const ready = await jam.prepareScrollTop(scrollRoot, destination, controller.signal);
if (ready && !controller.signal.aborted && scrollRoot.isConnected) {
    scrollRoot.scrollTo({
        top: destination === Infinity ? scrollRoot.scrollHeight : destination,
        behavior: 'instant'
    });
}
// The owning task calls controller.abort() on conversation changes,
// teardown or user navigation that should cancel restoration.
```

Keep a request identity check as well when a reused connected root changes conversations. Hidden roots can wait until visible or aborted. This prepares framework row construction, not arbitrary Markdown streams, fonts, images or later layout growth. An immediate `measureScrollRow` is only a synchronous snapshot; constructing cold rich content can still change geometry afterward. It is not a hidden-element `scrollIntoView` or row-key lookup API. Coordinate later measurements through the application's single position owner. Do not add pixel-mode `auto.keepScrollPosition` as a second owner when the application already persists offsets; its delegated bookmark mode below keeps restoration with the application.

### Semantic navigation through arrival

Development runtimes providing `jam.navigateScrollPosition(scrollRoot, request, signal, behavior = 'auto')` also expose `store.navigate(request, signal, behavior)` through delegated bookmark storage. The request uses the semantic row or `edge: 'end'`, owner, offset and optional loading contract described below. `behavior` accepts `auto` or `instant`.

Use this operation for explicit minimap or Latest navigation. It owns preparation and movement together; do not perform an additional scroll write afterward. `auto` smooth-scrolls only when the destination and the whole travel interval are already mounted, measured and stable. Otherwise it builds the destination neighborhood and jumps, without building the intervening cold content. Positive row offsets include the preceding visible content in the mounted-route check. Reduced-motion preferences select instant movement. Geometry changes during movement can also select an instant arrival. If the semantic destination changes, including a newly appended Latest row, navigation prepares the new destination and jumps without repeating the history loader.

The promise returns `{ status, mode, top }`. Status is `reached`, `cancelled` or `unavailable`; mode is `smooth`, `instant` or `null` when no movement began. `top` is the actual final offset. Stationary frames away from the destination do not count as arrival. After initial preparation, a bounded stalled-movement watchdog reports unavailable; it does not limit application loading. Resume latest-follow intent only after `reached`; preserve application retry policy for unavailable destinations.

A newer navigation or preparation replaces the pending operation. Abort signals, store teardown, native owner detachment/disposal and print preparation cancel it. Wheel movement, touch, scrolling keys outside editable controls, scrollbar presses and pointer dragging cancel movement; hover alone does not. Keep one application intent owner and abort when changing conversations. The framework owns lazy geometry and anchor coordination, while the application owns history loading, data identity and bookmark contents. Existing `prepare` APIs remain available for immediate bookmark restoration. Check capability availability on the actual runtime before using this development API.

### Targeted lazy scroll preparation

The development runtime with `jam.prepareScrollPosition` adds semantic row/latest preparation without constructing the entire loaded prefix. Check that the helper (or delegated store's `prepare`) exists when consuming an older bundle. This is opt-in behavior for `Styles.layout.lazyload`, not a release-wide compatibility statement.

`await jam.prepareScrollPosition(scrollRoot, request, signal)` and delegated `store.prepare(request, signal)` share this contract:

-   For a saved row, supply `{ owner, row, offset, estimatedHeight }`. `owner` is the native lazy container element; `row` is its direct logical component or a synchronous predicate selecting one. A predicate receives raw components after pending row publication and logical reference/visibility work settle; use it when publishing a page or revealing folded work immediately before preparation. Once selected, native preparation retains that component identity. Virtual/data wrappers and redirected children are not eligible row targets. `offset` defaults to zero and measures the row's top from the scroll root's inner viewport top; negative values represent a partly clipped row.
-   For latest, supply `{ owner, edge: 'end', estimatedHeight }`. It prepares the current loaded end, without fetching a next page or resuming follow mode. Do not supply a row as well.
-   `estimatedHeight` is required, positive and finite in CSS pixels. Invalid height or non-finite offset rejects. Unbuilt rows reserve estimated space; visited rows retain DOM and local state. Width changes invalidate old height authority. Construction is bounded to the destination neighborhood; bookkeeping still scales with the number of supplied rows. Keep loaded history bounded.
-   When older pages must be supplied first, add optional `load: (signal: AbortSignal) => void | Promise<void>`. A supporting runtime installs the native construction hold before invoking this callback once. Publish pages and fold visibility inside it; pending logical publication can continue, but deferred row construction and target predicate selection wait until it completes. Then normal logical readiness and target-neighborhood preparation run. Finish the callback after data publication; awaiting held row DOM or Markdown readiness inside it would deadlock. The application owns fetch/paging limits and checks both the supplied signal and its current conversation/request identity before publishing.
-   A current loading error rejects preparation with that error. Abort, supersession, exact pixel preparation, print or removal cancels the preparation promptly with `undefined` and aborts the callback signal even if the callback never settles. Late callback completion/rejection cannot revive preparation; the application must still stop obsolete work and publication. A non-function `load` rejects. Use a verified loading-phase runtime: older helpers can exist while ignoring this new field.
-   The root and owner must be connected and measurable. The first supported layout has one active native lazy owner per root, with the root either that owner or an ancestor. Hidden sibling owners may coexist. Nested child viewports and multiple active owners return `undefined`; grid, horizontal, wrapping and arbitrary nested layouts are outside this contract.
-   A result is `{ top, provisional }`. The actual target row and visible neighborhood are prepared at the returned position, clamped to the scrollable extent. `provisional` is true while other active rows are unbuilt, parked or retain measurements from another width. It is not a promise that future fonts, images, streams or interactive content have settled. Estimated total extent means absolute offsets and the scrollbar may change as rows are visited.
-   Aborted, superseded, hidden/disconnected, missing, folded or removed targets return `undefined`. Pass the caller's required `AbortSignal`, abort on user navigation or conversation changes, and recheck application request identity after awaiting. A row with zero rendered height is ineligible. Neither helper writes the restoration position or interprets stored message IDs. Immediately write the returned `top` from the application's single scroll owner.

```javascript
const controller = new AbortController();
// Rows declare a static ref: 'transcript-row'. The predicate receives a raw component.
const row = (component) => !component.isVirtual && component.matchRef('transcript-row') && component.getVarData('row')?.id === saved.id;
const prepared = await jam.prepareScrollPosition(scrollRoot, { owner: lazyOwner, row, offset: saved.offset, estimatedHeight: 160 }, controller.signal);
if (prepared && !controller.signal.aborted && currentRequest === requestId) {
    scrollRoot.scrollTo({ top: prepared.top, behavior: 'instant' });
}
// The application owns controller.abort() on wheel/touch/scrolling keys,
// navigation, content replacement and teardown.
```

Cold `buildFor` rows with `showIf`/`buildIf` require the corrected logical-binding runtime; the presence of the preparation helper alone does not prove this correction is installed. Logical flags and bound refs resolve independently of row DOM. `getVarData('row')` evaluates the loop alias; raw `component.props.row` contains its declaration. Use a key map on the model that owns a shared collection when retaining keyed identity across nested loops. Bound refs can use an explicit expression such as `ref: "{{'row-' + row.id}}"`; mixed strings are not guaranteed literal interpolation. For cold paging, supply the loading callback before publishing pages. For already supplied rows, call preparation immediately after publishing visibility or page state and await its result. It waits on existing native publication, queued visibility/build callbacks, their current async results and deferred reveal; predicate lookup also waits for bound refs. It does not flush or re-evaluate bindings, and does not wait for unrelated element/user watchers or future content. A current unresolved control binding remains pending until completion, abort, supersession or removal; current binding failure ends preparation with `undefined`. Actual settled false/folded or zero-height rows remain ineligible. Keep predicates synchronous and free of mutations.

Ordinary lazy rendering remains prefix-based until targeted preparation is requested. After opting in, offscreen placeholders support sparse traversal, while visited components remain retained. Legacy `prepareScrollTop` and print preparation return that owner to exact prefix construction; this can construct previously skipped rows. `measureScrollRow` still requires exact all-loaded preparation and does not become a cheap sparse snapshot. In the corrected development runtime, native local anchoring preserves a measured row while neighboring rows are constructed or resized, accounting for observed user movement. Verify that correction in the consuming runtime before relying on it. Compensation anchors row tops, not a text position inside a growing row; estimated total height and scrollbar proportions can still change. Input combined with a shrinking-extent boundary clamp before either is observed separately can remain ambiguous. The application still owns later asynchronous admission, following, pagination and final semantic restoration; avoid applying a second correction for the same native layout change.

#### Release a retained scroll anchor

The updated development runtime provides `jam.releaseScrollAnchor(scrollRoot)`. Call it before publishing a manual expand/fold change when a preceding Latest or semantic preparation must stop retaining its destination. Cancel the application's pending restoration and pause its separate bottom follower first.

The helper synchronously clears retained native anchor snapshots and cancels pending native pixel/semantic preparation on that scroll root. It does not write the scroll position, change browser anchoring styles, resume or pause a follower, or restore a clicked row. Calls without a registered viewport owner are inert. Release invalidates in-flight preparation through the helper's completion check. Callers must check their own request identity after awaiting and before writing, including when the promise resolved before release.

This is a one-shot release. Ordinary lazy viewport anchoring remains enabled and can capture a current visible row on the next pass, including before delayed model publication. Later prepends and size changes retain their normal compensation. Folding can still clamp the browser to the shorter document extent. It is not a suspension lease or a promise that arbitrary future content changes never move the viewport.

#### Delegated bookmark storage

`Styles.auto.keepScrollPosition({ bookmark: { connect, capture } })` keeps storage under a stable host id while the application owns semantic position. Do not combine `bookmark` with pixel-mode `selector` or `delay`.

`connect(store, element)` receives `{ read(key), save(key, value), prepare(request, signal) }` and may return a disconnect function. `read` returns a JSON snapshot or `undefined`; `save` returns success and uses a nonempty application key within the host's storage namespace. `capture(element)` returns `{ key, value }` on route change, unload and disposal, or `undefined` to preserve an earlier bookmark. Ordinary scroll does not save. Save explicitly before switching semantic identity when needed. Storage/capture failures preserve the previous value.

The delegated handle's `prepare` uses its host as the scroll root, cancels its preceding request, and aborts on unmount/disposal. Stale handles cannot read, save or prepare. The application supplies user-input cancellation, loaded-row identity resolution, visibility and paging, and writes the returned top; the storage plugin does not add a second restoration writer. Plain pixel mode retains its automatic input cancellation and offset writing. Pair late content growth with the existing follow helper only when application follow intent remains active.
