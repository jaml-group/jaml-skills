# Think in JAML: purpose and composition

JAML describes what a piece of UI is for. Start with the business purpose and data it represents, then select an element or module that owns that purpose. Its native parts, state and behavior are already a composition you can specialize.

An `input` owns editing a value, including its caption, icon and control; a number input can also own a unit. An `indicator` owns representing a metric, including icon, caption, value and unit. A metric presented as a tile can still be one indicator. A container owns a genuine relationship such as grouping independent operations or arranging modules; it need not reconstruct the parts of each child.

## Decide what the object means

Before writing a tree, describe each unit in one sentence: “edit the warning threshold,” “show completed orders,” or “choose the reporting period.” Then reason in this order:

1. **Purpose and data.** Identify the value, record or operation, its owner and the relevant states.
2. **Native owner and parts.** Read the fitting element's parameters, inherited behavior and slots. Reuse the caption, icon, value, unit and control it already owns.
3. **Specialization.** Apply supported roles, ordered styles/plugins and bindings. Extend through named slots or layers when the same purpose needs more representation.
4. **Composition.** Arrange independent purposes together. Extract a CC or builder when a recurring business module has a clear input, behavior and lifecycle contract.

| Requirement                                  | Starting composition                                                            | Reasoning                                                                                   |
| -------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Edit a folder path                           | One `input` with `cap` and `placeholder`, inside the operation's dialog content | The field owns its label and edit control; the dialog owns dismissal, focus and submission. |
| Edit a percentage                            | One `input-number` with `cap`, `icon` and `unit`                                | These parts describe one editable value.                                                    |
| Show a metric with a period and status       | An `indicator` with native parts and explicitly slotted additions               | Extra context enriches the metric without changing its purpose.                             |
| Choose a period that affects several modules | A selection owner publishes state; each module consumes it                      | The selector does not need to know the receivers.                                           |
| Show one dataset in several ways             | A `data` owner publishes the dataset; consumers bind or project it              | Fetching and refresh have one logical owner.                                                |

This is a selection method, not a ban on containers, labels, events or custom components. Keep a composition when its responsibilities justify it. Consult [native capability choices](../choosing-native-capabilities.md) when ownership is unclear; knowing how to write a container does not establish that a container is the right owner.

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

There is no separate caption label or unit label to synchronize. For an operation such as “Add workspace,” the same reasoning gives a dialog title, one native path input and the operation's actions. Group those independent responsibilities where needed. Choose the actual modal/focus and submission contracts separately; a container with dialog-like styling does not implement them.

See [input](../JAM-UI/input.md) for the number-mode unit and validation contracts. Validation messages are popup feedback, triggered on blur by default. Contextual help uses `help` with [`popup.helper`](../Plugins/popup.md#popuphelper); it is not an implicit inline helper or error row.

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

For each substantial unit, explain its purpose, the native owner and parts it reuses, the data/state relationship, and why any added structure is needed. Exercise a different presentation, another independent instance or another consumer when that is the claimed reuse contract. Verify interactions and geometry in the actual host.

A valid JAML tree is only the syntax check. A composition thinks in JAML when its structure follows the purposes and relationships of the application, and uses the language's existing composition mechanisms to express them.
