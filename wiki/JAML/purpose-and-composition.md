# Think in JAML: purpose and composition

JAML describes what a piece of UI is for. Start with the business purpose and data it represents, then select an element or module that owns that purpose. Its native parts, state and behavior are already a composition you can specialize.

An `input` owns editing a value, including its caption, icon and control; a number input can also own a unit. An `indicator` owns representing a metric, including icon, caption, value and unit. A metric presented as a tile can still be one indicator. A container owns a genuine relationship such as grouping independent operations or arranging modules; it need not reconstruct the parts of each child.

## Decide what the object means

Apply this reasoning to pages, builders, CCs and framework-provided UI. Before writing a JAML definition, describe each unit in one sentence: “edit the warning threshold,” “show completed orders,” or “choose the reporting period.” Then reason in this order:

1. **Purpose and data.** Identify the value, record or operation, its owner and the relevant states.
2. **Interaction and presentation.** Choose how and where the user acts, the attention required, feedback and return path. Apply the [context-preserving choice](#choose-interaction-and-presentation) before selecting a surface or helper.
3. **Operation owner, then parts.** First check whether a native builder, CC or behavior owner already composes the operation. Then read the participating elements' parameters, inherited behavior and slots. Reuse the caption, icon, value, unit and control they already own.
4. **Specialization.** Apply supported roles, ordered styles/plugins and bindings. Extend through named slots or layers when the addition fits the selected [owner's contract](#choose-the-owner-before-the-slot).
5. **Composition.** Arrange independent purposes together. Extract a CC or builder when a recurring business module has a clear input, behavior and lifecycle contract.

| Requirement                                  | Starting composition                                                            | Reasoning                                                                                                                          |
| -------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Edit a folder path                           | One `input` with `cap` and `placeholder`, inside the operation's dialog content | The field owns its parts; the application owns submission and the presentation owner supplies the required dismissal/focus policy. |
| Edit a percentage                            | One `input-number` with `cap`, `icon` and `unit`                                | These parts describe one editable value.                                                                                           |
| Show a metric with a period and status       | An `indicator` with native parts and explicitly slotted additions               | Extra context enriches the metric without changing its purpose.                                                                    |
| Choose a period that affects several modules | A selection owner publishes state; each module consumes it                      | The selector does not need to know the receivers.                                                                                  |
| Show one dataset in several ways             | A `data` owner publishes the dataset; consumers bind or project it              | Fetching and refresh have one logical owner.                                                                                       |

This is a selection method, not a ban on containers, labels, events or custom components. Keep a composition when its responsibilities justify it. Consult [native capability choices](../choosing-native-capabilities.md) when ownership is unclear; knowing how to write a container does not establish that a container is the right owner.

## Choose the owner before the slot

An element's purpose comes from its supported parts and behavior. Putting a filename in a `label` makes it display a filename; it does not give the label a file-preview contract. Renaming the caption to “File controls” does not supply that contract either. Several controls can concern the same record while owning different operations.

Ask what the addition does for the host before choosing its slot. A reporting period or status can qualify an indicator's metric. Decrement/increment buttons can extend a value input when they operate that same value through its supported contract. A slot supplies a place for content; it does not by itself establish state ownership, keyboard behavior, layout or cleanup. Read the selected owner and extension contracts for those responsibilities.

For a file preview toolbar, a filename label displays text, metadata describes the file, a zoom input edits scale, presets select scale and Download performs an action. Group those responsibilities in a suitable toolbar/container or a module that explicitly composes them. One shared file record does not make the filename label their owner.

This is a conceptual ownership sketch, not a runnable definition or a new toolbar API:

```text
preview toolbar / meaningful group
  filename label
  file information
  zoom input, with its value display and supported +/- additions
  zoom presets, using the same scale owner
  Download action
```

Reuse an input's native caption/icon/control/unit instead of rebuilding them as siblings. Retain an indicator's appropriate layer annotations. Keep grouping where it composes distinct responsibilities. Fewer containers and more slots are not objectives; neither is adding a container around every control.

A reusable file-summary or preview CC can own a broader purpose through an explicit props/data, action and lifecycle contract. Its internal root type alone neither proves nor disproves that contract. Likewise, a label may have supported additions; assess what they do rather than forbidding children or interactive slots. The review question is whether each responsibility has a fitting owner, including the custom composition that joins them.

## Choose interaction and presentation

Choose the experience before choosing its API. Identify the trigger, the affected object, the state change and where attention already is. Count the extra looking, pointer travel, navigation and repeated decisions needed to finish and return. Choose the smallest interaction that serves the goal while retaining understandable feedback and keyboard access.

| User need                              | Preferred starting point                                                             | Decision to establish                                                                                             |
| -------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| Routine reversible command             | Act directly and show nearby feedback; offer Undo where restoration is supported     | Recovery must restore the actual affected state.                                                                  |
| Edit one local value                   | Inline editing when space permits; otherwise an anchored popup beside the object     | Keep the subject visible, preserve the draft and return focus appropriately.                                      |
| Confirm a local consequence            | A brief confirmation near the triggering control                                     | Establish that confirmation is warranted; name the action and consequence.                                        |
| Decision requiring undivided attention | A modal dialog with a deliberate interruption and dismissal policy                   | Explain why continuing elsewhere is inappropriate; verify focus containment, background interaction and recovery. |
| Sustained supporting work              | A panel or drawer when it preserves useful context and supplies enough working space | Assess task scope, duration, available space and return path; verify the chosen runtime's capabilities.           |

Confirmation is a decision, a popup is an anchored presentation, and modality determines whether surrounding interaction remains available. A drawer's placement alone does not determine its modality or what content it may contain. Select each from the task; a large surface or an API name does not justify blocking the rest of the application. When a viewport or unavailable anchor requires another presentation, retain the subject's identity and a clear return path.

Keep progress and recoverable errors near the operation. A routine success usually needs a changed value or brief feedback; it does not need another decision. An important operation warrants explicit consequences and proportionate feedback, with modality justified separately. Check the selected owner's actual lifetime and focus contract rather than inferring them from appearance.

## Choose the whole operation before its parts

A correct native field can still sit inside a needlessly reconstructed operation. For “rename a conversation,” first choose inline editing or a popup beside the conversation. When the chosen editor uses Save/Cancel, evaluate the editable [`jaml.yesNoDialog`](../utils.md#jamlyesnodialogprompt-onyes-onno-styles-options) definition before assembling a header, input, divider and action row. Its prompt accepts native JAML content, including an input, while it supplies confirmation actions and keyboard decisions. A `card` can own a title or surface when needed; choosing it does not resolve the decision owner.

### Rename beside the conversation

The user has already located the conversation. A centred modal requires them to find the edit elsewhere and then return to the original row. For this brief local task, an inline field or a compact anchored editor keeps the name, action and result together. Save commits the new name; it is not an additional “Are you sure?” question.

| Moment            | Intended behavior                                                                                                                                                                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Open              | Capture the conversation identity and current name. Anchor a popup to the stable row/control, rather than a menu item that disappears on selection. Focus the edit field when owned content is ready.                                                                 |
| Edit              | Use one native input with its caption and validation. Enter submits, Escape cancels, and visible Save/Cancel controls remain available.                                                                                                                               |
| Save              | Validate, then use one pending gate for pointer and keyboard submission. Show nearby progress and define whether dismissal is allowed during the request.                                                                                                             |
| Failure           | While the editor is current, keep its draft, error and retry path together. After the user leaves, retain recovery state without automatically reopening the editor or moving focus back.                                                                             |
| Success or cancel | Success updates the captured conversation; cancel discards the unsubmitted draft. Close only the matching editor instance and restore focus to its still-valid origin when appropriate. Guard late results and focus work after replacement, row removal or disposal. |

This is the interaction contract to implement and verify, not a claim that one helper supplies every step. For the popup variant, construct a reactive model from the editable definition, then give its built element to [`jam.popup`](../utils.md#jampopuptarget-content-option-type), or use an existing adapter that performs those steps. Read [shared popup content, focus and dismissal](../JAM-UI/popup.md#helper-content-focus-and-dismissal-timing): passing a definition directly does not construct a reactive Model, `onafterrender` is not a popup-visible readiness signal, and a later presentation can replace the shared popup. Anchor placement and return focus need keyboard and viewport checks.

Compare [helper inputs, model ownership and dismissal](../utils.md#dialog-and-popup-ownership) before wiring callbacks. In particular, a popup accepts the explicitly owned model's built element; `renderModal` accepts the JAML definition and creates its model. Distinguish the definition from its presentation lifetime:

-   For a brief local confirmation, [`jam.popupYesNo`](../utils.md#jampopupyesnotarget-prompt-onyes-onno-option) presents the decision near its target and requests dismissal before invoking the callback. It does not await asynchronous saving.
-   For an immediate decision whose interruption is justified, [`jam.modalYesNo`](../utils.md#jammodalyesnocontainer-prompt-onyes-onno-styles-option) presents the confirmation, starts dismissal before invoking the chosen callback, and settles once. It does not wait for a returned promise. Reuse the consuming runtime's [modal focus/background owner](../utils.md#modal-focus-and-background), with an adapter only for a verified gap.
-   For “save, stay open on failure, close after success,” use the editable definition with the selected popup or modal presentation owner. The application owns validation, a pending gate shared by pointer and keyboard submission, failure feedback, current-dialog identity and the cancellation policy. The presentation owner retains focus, cleanup and any required background-blocking policy. A callback that starts an asynchronous save does not change the managed helper's dismissal timing.
-   For a multi-step editor, use the owners for its steps, editing and progress. An unmodified Enter-to-confirm handler may conflict with multiline editing or step navigation. A custom composition is justified by those requirements; the same appearance does not make it a Yes/No operation.

This popup integration fragment assumes an initialized runtime, a product rule requiring a nonempty name, and application-supplied `submitRename(model)` and `cancelRename(model)`, with those validation, pending and lifetime checks. It builds the content; it does not mount or save anything by itself.

```javascript
const renameDialog = jaml.yesNoDialog({ type: 'input', cap: 'Name', valueKey: 'draft', rules: { required: true } }, submitRename, cancelRename, ['layout.autoalign'], { yesCap: 'Save', noCap: 'Cancel' });
const model = new jam.Model(renameDialog);
model.vars.draft = currentName;
const renameContent = model.build();
```

Conversation names are runtime data; the per-key vars write above preserves binder-looking text. See the [literal-data boundary](binder.md#runtime-data-and-authored-definitions). After registering the owned readiness and cleanup handlers, the presentation adapter can call `jam.popup(anchor, renameContent)` with the stable anchor. It retains this model and disposes it with `model.destroy()` when its owned presentation ends, including replacement or owner disposal. A delayed result must not close another popup or restore focus to a different conversation.

The input owns the editable name and caption. The builder owns the decision content. The application supplies the business action and failure feedback, and the host owns presentation. Keep those boundaries when adapting an existing presentation helper; rebuilding focus management or adding a second action row would duplicate responsibilities.

## Own asynchronous operations

An editor's presentation and its business request have separate lifetimes. Capture the affected record and request identity before submitting; keep the request owner alive until its outcome is reconciled, even if its popup, row or panel disappears. An editor generation guards view updates and focus. It does not cancel a server operation or undo a committed change.

Specify these transitions before writing the handlers:

| Transition                                    | Ownership and behavior                                                                                                                                                                                                       |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ready → submitting                            | Validate the product's actual rules. Acquire one pending gate shared by pointer and keyboard actions before sending; bind the request to the captured record.                                                                |
| Submitting → failure                          | Release the pending gate so a deliberate retry can run. Preserve the draft and error in the current editor; after departure, retain a discoverable recovery action without automatically reopening or stealing focus.        |
| Submitting → success                          | Reconcile the affected record. Only the matching current presentation may close, change its draft/baseline or return focus.                                                                                                  |
| Cancel, replacement or disposal while pending | Either prevent dismissal through all supported paths, or detach the presentation and retain the operation owner. State which policy applies. Closing a view or aborting local transport does not prove the server cancelled. |
| Response lost or outcome uncertain            | Reconcile with the backend before treating the operation as failed or retrying a possibly committed action; use an idempotency contract only when the endpoint supplies one.                                                 |

Keep a pending gate distinct from permanent settlement. A failed attempt must become retryable; a completed decision or retired operation must reject duplicates. Visible disabled state is feedback, while the shared handler gate enforces the rule. Use the selected helper's actual cancellation/readiness contract: for popup focus, match both the owned target and content in [`showing`](../JAM-UI/popup.md#helper-content-focus-and-dismissal-timing), then check visibility, connection and focus eligibility.

### Archive with a real Undo

Archive can remain a direct row action when the backend supports restoring the document and its prior placement. The notification presents the recovery action; it does not own archiving, restoration or the deadline. Follow the [archive/Undo transitions](../JAM-UI/notify.md#archive-and-undo) from request through acknowledgement, restoration, failure and expiry. An optimistic row change does not by itself make Undo eligible.

### Confirm an irreversible shared change

For deleting several shared rules, capture their identities and the consequences the user reviewed, including affected queued work. The server must check that confirmed scope and its revision or equivalent precondition **atomically with the destructive operation**. A client reread before submit still leaves a race. If the endpoint cannot enforce that condition, report the missing backend contract instead of claiming the confirmation protects against concurrent changes.

A conflict keeps the decision available, refreshes the identities and consequences, and requires renewed explicit confirmation. Preserve the request owner when a pending presentation is dismissed; reconcile an accepted server result even when its old view is no longer current. Choose modality from the attention required, and use the [editable decision definition](../utils.md#dialog-and-popup-ownership) when failure must leave the decision open.

For sustained editors, keep the draft's bound record separate from the record currently inspected elsewhere. Keeping an unsaved draft need not force workspace selection back. A late save may update its captured record, but may change the visible editor's baseline only when that editor still owns the same draft/request.

## One input is already a composition

This complete example edits a percentage. The element owns the caption, icon, control, unit and validation rules. `label.atTop` changes the arrangement of those existing parts.

```javascript jaml-playground
export default {
    type: 'input-number',
    cap: 'Capacity warning',
    icon: '⚠️',
    value: 80,
    unit: '%',
    rules: { required: true, min: 1, max: 100 },
    styles: ['label.atTop', 'css(width:20rem;max-width:100%)']
};
```

There is no separate caption label or unit label to synchronize. For an operation such as “Add workspace,” first evaluate the [operation owner](#choose-the-whole-operation-before-its-parts), then supply one native path input. Group independent responsibilities where needed and preserve the submission/presentation boundary; a container with dialog-like styling does not implement it.

See [input](../JAM-UI/input.md) for the number-mode unit and validation contracts. Validation messages are popup feedback, triggered on blur by default. Contextual help uses `help` with [`popup.helper`](../Plugins/popup.md#popuphelper); it is not an implicit inline helper or error row.

## One document reuses button and card parts

“Open this document” is an operation on one record. A native button owns its icon, caption and activation. Opening it reveals a card that owns the document header and body; `extra` holds a Save copy action, and `interact.closable` supplies the native close control. Selecting `button` and then assembling a separate icon label and filename tree would leave those native parts unused.

This complete example uses an authored text document. Its modal illustrates document/slot composition; select the surface using [interaction and presentation](#choose-interaction-and-presentation) rather than treating it as the default for every preview. Hover over its button for Save copy, or open it and use the same action in the card header. Both paths download the displayed text. The hover shortcut is a convenience; the opened card retains a visible action reachable without hovering.

```javascript jaml-playground
const report = {
    name: 'Quarterly notes.txt',
    icon: '📄',
    text: 'Quarterly notes\n\nRevenue grew 12%.\nThe next review is scheduled for Monday.'
};
const saveCopy = () => jam.downloadAsFile(report.name, report.text);

function openDocument() {
    jam.renderModal(document.body, {
        type: 'card',
        cap: document.createTextNode(report.name),
        icon: report.icon,
        styles: ['interact.closable', 'css(position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);width:30rem;max-width:calc(100vw - 2rem))'],
        components: [
            { type: 'button-ghost', cap: 'Save copy', icon: '↓', slot: 'extra', onclick: saveCopy },
            { type: 'label', cap: document.createTextNode(report.text), styles: ['css(white-space:pre-wrap)'] }
        ]
    });
}

export default {
    type: 'button-ghost',
    class: 'document-open',
    cap: document.createTextNode(report.name),
    icon: report.icon,
    onclick: openDocument,
    plugins: [
        Plugins.shortcut({
            selector: '.document-open',
            optionsGetter: () => [{ name: 'Save copy', icon: '↓', onclick: saveCopy }]
        })
    ]
};
```

The button's native caption slot contains the filename, and its icon slot contains the document icon. The card's unslotted label intentionally enters its body; the action explicitly enters `extra`. Use [literal slot text](../JAM-UI/JAM-UI.md#slot-content-and-literal-text) for external names/content and [runtime data writes](binder.md#runtime-data-and-authored-definitions) when loading external records. Verify the documented runtime requirements for literal Text nodes.

For another presentation of the same record, keep its data and action contract and change the native parts/styles or action placement. A compact list can use [hover shortcuts](../Plugins/shortcut.md#entry-shortcut); a tile can expose visible actions; a preview can place them in the [card header's extra slot](../JAM-UI/card.md#slots). Choose those placements deliberately for the requested interaction and keyboard/touch access. Additional metadata can use a supported slot/layer when it fits the host's contract, with an explicit arrangement. A label can present non-activating document text; a broader file summary or control group needs its own composition contract. Apply [owner-before-slot reasoning](#choose-the-owner-before-the-slot) when adding controls, even when they concern the same document.

[`interact.closable`](../Styles/interact.md#entry-interact-closable) removes the closable host by default. Supply its callback when closing must update state or request confirmation. [`jam.renderModal`](../utils.md#jamrendermodalcontainer-option-config) owns modal mounting/dismissal; the example supplies placement explicitly. This example mounts at document scope, so its modal remains until dismissed even if the opener is removed. A page or CC should use its owned host or remove its opened modal when that owner ends. Cleanup belongs to unmount, since native close and curtain/Escape dismissal are separate paths. Verify the consuming runtime's [modal focus and background contract](../utils.md#modal-focus-and-background); its scope and older-bundle limits still apply.

## One metric can have several presentations

The following indicators represent the same kind of business fact. Their shared `childStyles` recipe supplies presentation and a period annotation; each indicator supplies its own metric data. The inline variant changes how the native parts are arranged.

```javascript jaml-playground
export default {
    type: 'wrapper',
    stylize: 'list',
    styles: ['layout.flex(align:top-left;wrap:wrap;gap:1rem)'],
    childStyles: ['params(stylize:tile)', 'css(width:20rem;max-width:100%;padding:l;gap:s)', 'value.major()', 'cap.main(0.75)', Styles.addChild(() => jame({ type: 'label', cap: 'Last 30 days', slot: 'layer', styles: ['cap.sub(0.75)'] })), 'rule(selector:jam-label;gridRow:3;gridColumn:var(--jam-cap-col) / -1)'],
    components: [
        { type: 'indicator-number', cap: 'Completed orders', icon: '📦', value: 128, unit: 'orders' },
        { type: 'indicator-number', cap: 'Completed orders', icon: '📦', value: 128, unit: 'orders', styles: ['indicator.inline'] }
    ]
};
```

The indicator already owns a grid. The added label participates in it through an explicit `layer` slot and a local placement rule; `--jam-cap-col` follows the native caption column. `layer` names an additional content slot—it does not automatically mean an absolute overlay or background. Give an addition an explicit slot: an unslotted child would enter the indicator's value slot.

`Styles.addChild` attaches and removes the annotation with the recipe. The factory creates fresh content for each use. For reactive business content, declare a child in JAML `components` with `slot: 'layer'` and bind it normally; the `jame()` element factory does not establish JAML model bindings. Extend the local recipe to place other representers, such as tags, in the required grid cells. Check the chosen layout variant when adding placement rules.

The composition vocabulary includes the element type, its parameters and slots, semantic roles, ordered styles/plugins and bindings. Styles can arrange parts, add content and attach behavior. Reuse a style for repeated presentation; use a CC or builder for a repeated business composition. See [indicator](../JAM-UI/indicator.md), [indicator styles](../Styles/indicator-style.md) and [style ownership](../Styles/styles.md#style-ownership-and-composition).

## Compose independent business modules

A CC can package one business purpose with a data contract. The page then supplies data and connects state rather than reconstructing the module's internals. This makes independently authored modules practical to tile together, including modules selected or composed by agents.

Here, one CC consumes a metric record and a selected period. Its internal prop names are independent of the caller's variable names. Two instances receive different records and listen to the same published period.

```javascript jaml-playground
jaml.register('periodMetric', {
    type: 'indicator-number',
    props: { metricRecord: null, selectedPeriod: 'month' },
    cap: '{{metricRecord.caption}}',
    icon: '{{metricRecord.icon}}',
    value: '{{metricRecord.values[selectedPeriod]}}',
    unit: '{{metricRecord.unit}}',
    styles: ['indicator.vertical', 'value.major()', 'css(padding:l;min-width:12rem)']
});

export default {
    type: 'container',
    styles: ['layout.flex(direction:column;gap:1rem)'],
    vars: {
        reportPeriod: 'month',
        revenue: { caption: 'Revenue', icon: '💰', unit: 'USD', values: { week: 12000, month: 48000 } },
        orders: { caption: 'Completed orders', icon: '📦', unit: 'orders', values: { week: 120, month: 480 } }
    },
    components: [
        {
            type: 'buttongroup-radio',
            valueKey: 'reportPeriod',
            data: [
                { name: 'Week', value: 'week' },
                { name: 'Month', value: 'month' }
            ]
        },
        {
            type: 'wrapper',
            stylize: 'list',
            styles: ['layout.flex(wrap:wrap;gap:1rem)'],
            components: [
                { type: 'periodMetric', props: { metricRecord: '{{revenue}}', selectedPeriod: '{{reportPeriod}}' } },
                { type: 'periodMetric', props: { metricRecord: '{{orders}}', selectedPeriod: '{{reportPeriod}}' } }
            ]
        }
    ]
};
```

The group owns selection and visibly marks its checked item without an extra `check.*` style. It publishes `reportPeriod`; the metrics consume their `selectedPeriod` prop. Neither metric refers to its sibling, and the selector does not locate or command either metric. A third consumer can join by binding to the published value. This is inversion of control through state relationships.

The container arranges the selector and the collection; the wrapper arranges independent modules. Those are meaningful responsibilities. The metrics retain their own caption, icon, value and unit instead of having the page assemble those parts for them. See [CC props and aliases](component.md#props-as-reactive-aliases) for writable records and instance ownership; nested edits have additional sharing requirements.

## Align data ownership with the business purpose

Focused backend endpoints often expose the same business unit the UI represents. Let the rendering module declare the data it needs and the projection it displays. Keep request options, refresh and lifetime with the appropriate owner; do not add a page-level fetch-and-redistribute controller by default. Check the endpoint's actual payload shape—an atomic endpoint does not guarantee a direct match to every element.

**“Who renders retrieves” describes ownership of a module's data requirement.** A private renderer can fetch its own data. When several consumers need one shared logical dataset, prefer a virtual `data` component that retrieves it and publishes a key. The consumers render that shared value independently.

This runnable example retrieves a small embedded JSON dataset through a data URL, so it needs no backend. The `data` component publishes the retrieved records; a table and count indicator consume the same dataset in different forms.

```javascript jaml-playground
const shipmentUrl =
    'data:application/json,' +
    encodeURIComponent(
        JSON.stringify([
            { order: 'A-101', destination: 'Osaka' },
            { order: 'A-102', destination: 'Taipei' }
        ])
    );

export default {
    type: 'container',
    styles: ['layout.flex(direction:column;gap:1rem)'],
    vars: { shipments: [] },
    components: [
        { type: 'data', valueUrl: shipmentUrl, valueKey: 'shipments' },
        { type: 'indicator-number', cap: 'Shipments in batch', value: jaml.var('shipments', (rows) => rows.length), unit: 'orders' },
        { type: 'table', dataWatcher: 'shipments' }
    ]
};
```

For a remote array, replace the data URL with the endpoint's request configuration. Read [private requests and shared data](state-and-data.md#private-runtime-data) for complete endpoint prerequisites, refresh and projection examples. `dataWatcher` is for option-capable consumers and normalizes to an array; subscribe to the dataset and derive an indicator's value explicitly as above. The transform listens to replacement of the complete array, not only to a nested path.

Request deduplication is an underlying efficiency mechanism. Its conditional promise sharing and short retention window do not decide who owns a shared dataset, and ordinary URL bindings do not universally opt into sharing. Keep the [request-sharing limits](state-and-data.md#request-sharing-and-cache-limits) with the request policy. Direct event-driven control, private fetchers and shared owners remain supported choices.

## Review the reasoning as well as the syntax

Use this pass before drawing a new component tree and again when reviewing the implementation:

1. **Name the operation and preservation requirements.** Establish what the user does or learns, the data/state owner and the relevant pending, failure, keyboard, focus and cleanup behavior. Check [interaction and presentation](#choose-interaction-and-presentation): the location, attention demanded and return path must fit the task before comparing APIs.
2. **Compare complete native candidates.** Check the fitting builder, CC or behavior owner as well as its element parts. Read the contract before accepting or rejecting it. Record the selected owner and the concrete gap, if any, that remains custom.
3. **Trace composition through helpers.** Inspect the JAML definitions returned by app builders/CCs and shared modal, field, settings-row or notification helpers. A short call site may conceal the same repeated container/label construction. Rendered DOM can locate a concern, but native internal nodes do not establish unnecessary authored structure.
4. **Check both duplicated parts and overloaded hosts.** For each wrapper, label and slot addition, identify its responsibility and compare it with the selected [owner's contract](#choose-the-owner-before-the-slot). Reuse parts that already belong to an input or indicator; retain independent prose, grouping, layout and integration boundaries. Also check whether unrelated responsibilities were placed under a presenter merely because they share a record or reduce the wrapper count.
5. **Check the resulting behavior.** Compare the delivered interaction, presentation and owners with the initial choice. Walk from the real trigger through completion and return; account for unnecessary travel, blocking and repeated confirmations. Exercise the promised states, actual controls and host lifecycle, including [pending, retry, departure and concurrent changes](#own-asynchronous-operations); test another presentation or independent instance when reuse is claimed. Report the inspected scope and any unverified behavior.

These are review candidates, not automatic findings:

| Authored pattern                                   | Compare with                                                     | Reason to retain custom composition                                                 |
| -------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Caption label beside a generic input wrapper       | Native input `cap`, `icon`, control and supported unit           | Independent explanatory content or a distinct group of fields                       |
| Several labels representing one number             | Indicator parts, slots/layers and indicator styles               | A separate document or independently actionable content                             |
| Repeated prompt, divider and Cancel/Confirm row    | Editable confirmation builder and the fitting presentation owner | A step/editor contract incompatible with the default decision behavior              |
| Text-only notification wrapped in custom content   | Plain notification API                                           | Actual interactive or structured content, with its documented tradeoffs             |
| Buttons plus manual selection state/handlers       | Native selection group and its state contract                    | Independent commands or a coordinated interaction the group does not implement      |
| Wrapper added solely for appearance                | The owner's roles, styles/plugins and supported slots            | Real layout, scrolling, lifetime or external-host boundary                          |
| Filename label hosting metadata, zoom and download | A meaningful group or module composing the participating owners  | An explicit module contract that owns the complete operation, not its caption alone |

A useful finding names the location, purpose, existing owner, native candidate, covered contract, remaining gap and preservation checks. Do not infer a defect from nesting depth, tokenized CSS or a native element name alone. A justified container is a correct choice; a syntactically valid tree can still duplicate native parts or overload a presenter with responsibilities its contract does not own.
