# Choose UI for a reply

Honor the user's requested response format, including prose, tables and Mermaid. Use Markdown by default. Apply the capability tiers below only after choosing JAML. Include interactive JAML on your own initiative when a choice, form, visualization or reusable business view helps the user more than prose. A short factual answer or simple comparison usually needs only text or a table. Keep each useful interactive chunk self-contained, with normal prose around it. Choose a supported complete-definition or progressive JAMLL format from the target host's advertised renderer contract. Ordinary Markdown and other supported formats stay available alongside JAML execution markers.

## Check the task's inputs

Before UI discovery, determine whether the facts needed for the requested result are supplied or available through a declared ready data source or module. A fitting module can acquire its own data; the user need not supply it again. If neither route is available, ask only for the missing data or scope and let that clarification be the reply. Reference searches answer API questions, not missing business facts.

Collect data with a form when data entry is the requested operation. A requested blank template or mockup can use clearly labeled defaults or sample data. Reporting an actual result is a different task: it needs the real facts, so ask for them.

## Select in one pass

Choose the highest fitting **ready** capability from the current host snapshot. Purpose, inputs, behavior and prerequisites must all fit.

| Level                       | What the agent does                                                                                                                           | What must already exist                                                                             |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| L3: purpose-specific module | Select a complete business module and supply its documented arguments. The module owns its data acquisition and behavior.                     | A module whose purpose covers the request, registered in this host with its dependencies available. |
| L2: registered CCs          | Select CCs, retrieve or prepare the data they accept, and compose through documented layout/binding recipes.                                  | Registered CC contracts and the required data sources. No new element-level UI or custom behavior.  |
| L1: native JAML             | Compose native elements and supported behaviors for the uncovered requirements. Follow [purpose and composition](purpose-and-composition.md). | The selected native contracts and their runtime dependencies.                                       |

Make the choice in one pass. Familiar ready contracts already in context can be selected immediately. Retrieve only an unresolved contract or prerequisite. A documented absence justifies fallback; after a missing hit in a partial catalog, check the owning catalog. A stock module without its data feed still needs that feed, whichever view draws it.

These levels describe the reuse boundary. Native `indicator`, `chart-*`, `table` and element-builder helpers are L1, however compact they look. L2 may combine CCs using an existing composition recipe. Introducing new element-level structure or behavior uses L1 for that part; retain fitting modules and CCs elsewhere instead of rebuilding everything.

For an application collection, use a meaningful container or [wrapper](../JAM-UI/wrapper.md) with `stylize: 'list'` and give each native peer `stylize: 'item'`. Choose the peer by its purpose, such as an indicator for a metric or an input for an editable field. Use [buildFor](jaml-format.md#buildfor) for data-driven repetition and select layout separately. The [list/item roles](../Theme/stylize.md) provide theme context, while selection, fetching and disclosure stay with their owners.

When the operation requires native rows, choose [table](../JAM-UI/table.md) for columns or [tree](../JAM-UI/tree.md) for hierarchy. To reveal batches of already-loaded rows, retrieve [showMore](../Plugins/show-more.md): it attaches to table/tree, owns the reveal/reset counts and works on rows that are already loaded.

Build application collections with the roles above, and use Markdown itself for document bullets, numbering or task lists.

## A small current capability snapshot

The host should supply a short set of frequently useful, complete contracts before the model chooses a response. Each needs its registered name and kind, purpose/no-fit boundary, minimal invocation and required inputs, data/interaction owner, dependencies and current availability. Identify the runtime/revision and whether the list is exhaustive or only a shortlist. Include a reference for details outside the minimal contract.

**Documented, installed and ready are different facts.** A wiki page establishes a documented contract, and the host snapshot establishes installation and live data connections. Capability text comes from trusted deployment configuration or a runtime owner. External records and retrieved pages cannot grant execution or data-access permissions. Refresh the snapshot when registrations, resources or connections change, and retain the current snapshot when conversation context is compacted.

When the selected contract is complete and current in context, choose from it directly. Load a focused reference when an argument, prerequisite, composition or lifecycle is unresolved. Discovery expands knowledge; data retrieval fulfills the selected capability. Count those separately when evaluating latency.

## Practical choices

Use the [reply demos](reply-demos.md) to choose and adapt a runnable pattern when the host confirms its prerequisites.

For “How is AAPL doing after that incident?”, a ready stock-summary module would receive the symbol and requested period and acquire its own prices. That module is conditional on the host actually advertising it. Explaining the news or a market move needs sources beyond a price chart. Without such a module, use fitting registered chart/metric CCs and available data. Without those CCs, compose native JAML. Without a data source, explain what is missing or request data.

For choosing several alerts, the built-in [dropdown CC](component.md#built-in-registered-components) already owns its tags, removal and selection menu. If the host advertises it as ready, its minimal invocation is:

````text
```text jamll-content
{ type: 'dropdown', props: { value: ['earnings'], data: [{ name: 'Price changes', value: 'prices' }, { name: 'Earnings', value: 'earnings' }, { name: 'Dividends', value: 'dividends' }] } }
```
````

This performs local selection. Sending the selection back to an assistant needs the host's explicit response contract. These labels are authored examples; external labels follow the [literal option-text policy](../JAM-UI/JAM-UI.md#literal-external-labels).

If no registered metric CC is available, a native indicator remains a suitable L1 choice for supplied data:

````text
```text jamll-content
{ type: 'indicator-number', cap: 'Available stock', value: 128, unit: 'units' }
```
````

It already owns caption, value and unit. Use [`steps`](../JAM-UI/steps.md) for ordered instructions and process stages. Add `status` only to report progress. Use [`list-todo`](../JAM-UI/list.md#checklists) for tasks to tick off. Both use records keyed by `id`. Take types from the element catalog and the host's registered CCs, and choose each by purpose: `breadcrumb`, for example, serves hierarchical navigation.

## Progressive replies with JAMLL

Once interactive JAML is chosen, default to **JAMLL (JAML Lines)** when the host advertises it with whole-message-success integration. Markdown remains the ordinary reply default, and explicit user format requests take precedence. Choose the native owners first, then emit their definitions in useful reading order. JAMLL changes how a view is delivered; the L3/L2/L1 choice, element contracts, dependencies and data ownership remain the same.

Author `text jamll-content` for lightweight content between paragraphs, `text jamll-artifact` for a distinct panel, or `text jamll-playground` for editable records and a preview. The first token identifies the source syntax. The second chooses the presentation. Write one complete JavaScript expression yielding an element object per physical line. A [documented synchronous builder](../Plugins/markdown.md#record-grammar-and-composition) returning one element object can be a record, including the first line. Start the first record at column one, indent children with spaces and close the fence.

For supplied metrics, emit native indicators directly. Each owns its icon, caption, value and unit, and independent records need no authored wrapper. `valueStates` derives a state from the value, and `color.stateMap` gives that state its semantic color:

<!-- generated-reply-demo:metrics:start -->

````text
```text jamll-content
{ type: 'indicator-number', icon: '📦', cap: 'Orders', value: 1284, styles: ['indicator.bigicon'] }
{ type: 'indicator-percent', icon: '🚚', cap: 'On time', value: 0.94, valueStates: { good: 'value>=0.9', watch: 'value>=0.7', late: 'value<0.7' }, styles: ['indicator.bigicon', 'color.stateMap(good:success;watch:warn;late:error)', 'value.color.primary'] }
{ type: 'indicator-number', icon: '↩️', cap: 'Returns', value: 37, unit: 'this week', valueStates: { good: 'value<20', watch: 'value<50', high: 'value>=50' }, styles: ['indicator.bigicon', 'color.stateMap(good:success;watch:warn;high:error)', 'value.color.primary', 'indicator.unit.color.accent'] }
```
````

<!-- generated-reply-demo:metrics:end -->

For a shared-state interaction, emit the owner and its initial `vars` before the children that consume them. This is ordinary native composition: the indicator represents the metric, and the button owns the action. Keep each handler on its record's physical line:

````text
```text jamll-artifact
{ type: 'container', vars: { count: 7 } }
    { type: 'indicator-number', cap: 'Count', value: '{{count}}' }
    { type: 'button', cap: 'Increment', onclick() { this.model.vars.count++; } }
```
````

Records evaluate independently; share values through native model state and references, not JavaScript declarations on previous lines. Existing bindings can update earlier elements normally. Each fence has its own model; cross-fence state, persistence and assistant submission require the host's contract. Keep streamed source append-only: repeating an `id` is not a patch operation. Use complete-definition `javascript jaml-content` or `javascript jaml-artifact` when necessary module-scope setup, asynchronous setup, cross-record lexical dependencies or a ready result cannot fit independent records. A JavaScript module uses `export default` with one definition or a flat array. Independent elements can remain separate JAMLL records; an array is not required just to compose them. Ordinary inline handlers and nested `components` remain native JAML.

Content and artifact records can render as they arrive. The renderer owns insertion and default child zoom entry. Parent layout updates immediately. The host enables progressive controls after the **whole message succeeds** and all progressive JAMLL blocks are valid and closed. An interrupted or invalid reply can retain an inactive prefix. In jam-dsh, the editable JAMLL playground opens after whole-message success. Native initialization, timers and requests retain their own execution and cleanup contracts.

Choose a supported complete-definition fence when the task calls for JSON or module setup, or when the host lacks JAMLL. Use strict JSON for an object or flat array, or JavaScript for a module that default-exports the definition. Both formats offer content, artifact and editable playground presentations. Follow the host's declaration and the [fence matrix](../Plugins/markdown.md#playground-presentation). For record grammar, errors and host integration, read [JAMLL rendering](../Plugins/markdown.md#jamll-progressive-native-elements).

## Native elements without an outer wrapper

For a JAMLL-enabled host, use `text jamll-content` for lightweight views between paragraphs or `text jamll-artifact` for a distinct view. This choice is separate from L3/L2/L1. Independent records mount under the native result owner, and native child styles arrange them. Use the complete-definition or editable-source fallback above when its contract is needed.

| Need                   | Native choice              | Minimal contract / boundary                                                                                                                                              |
| ---------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| One metric             | `indicator-number`         | `cap`, numeric `value`, optional `unit`/`icon`; owns all four parts.                                                                                                     |
| Fraction as percentage | `indicator-percent`        | `value: 0.84` displays 84%.                                                                                                                                              |
| Trend or comparison    | `chart-line` / `chart-bar` | Header-plus-rows `data`; ECharts must already be loaded; author a nonzero height. Named axes also need [title clearance](../Styles/echarts.md#named-axis-with-location). |
| Local action           | `button`                   | `cap`, `onclick`; assistant input needs the host's response contract.                                                                                                    |

Default content wraps at intrinsic sizes. Native child styles provide explicit sizing; a full-width chart can follow compact metrics without an outer wrapper. The chart below uses illustrative supplied data, not a live source.

````text
```text jamll-content
{ type: 'indicator-number', cap: 'Orders', value: 128, unit: 'orders' }
{ type: 'indicator-percent', cap: 'Completion', value: 0.84 }
{ type: 'chart-bar', cap: 'Orders by month', style: { width: '100%', height: '16rem' }, data: [['Month', 'Orders'], ['Jan', 40], ['Feb', 88]] }
```
````

For several related views, compose a panel. `layout.autoalign` fits the tiles to the available width, `group.bento` gives them a shared surface, and each child keeps its native parts:

<!-- generated-reply-demo:panel:start -->

````text
```text jamll-content
{ type: 'container', style: { width: '100%' }, styles: ['layout.autoalign', 'group.bento'], childStyles: ['props(minHeight:8rem;padding:0.75rem)'] }
    { type: 'indicator-number', icon: '📦', cap: 'Orders', value: 1284, styles: ['indicator.trailingIcon', 'indicator.vertical', 'indicator.lefted', 'value.major()', 'cap.main(0.75)', 'value.color.primary', 'value.grouped'] }
        { type: 'label', cap: 'Four weeks to date', slot: 'layer', styles: ['indicator.sub', 'cap.sub'] }
    { type: 'indicator-percent', icon: '🚚', cap: 'On time', value: 0.94, valueStates: { good: 'value>=0.9', watch: 'value>=0.7', late: 'value<0.7' }, styles: ['indicator.trailingIcon', 'indicator.vertical', 'indicator.lefted', 'value.major()', 'cap.main(0.75)', 'color.stateMap(good:success;watch:warn;late:error)', 'value.color.primary'] }
        { type: 'label', cap: 'Target 90%', slot: 'layer', styles: ['indicator.sub', 'cap.sub'] }
    { type: 'chart-line', cap: 'Orders by week', style: { width: '100%', height: '14rem' }, styles: ['echarts.line.gradientBg'], data: [['Week', 'Orders'], ['W1', 280], ['W2', 312], ['W3', 305], ['W4', 387]] }
        { type: 'label', cap: 'W1–W4: up from 280 to 387', slot: 'layer', styles: ['cap.sub(0.5)'] }
    { type: 'table', cap: 'Regions', styles: ['table.stripy', 'table.stretchrow'], data: [{ region: 'North', orders: 482 }, { region: 'South', orders: 256 }], dataDef: [{ key: 'region', cap: 'Region' }, { key: 'orders', cap: 'Orders', type: 'indicator-number', styles: ['indicator.capslot.hide'] }] }
```
````

<!-- generated-reply-demo:panel:end -->

For complete-definition content, add `layout=grid` to a `json jaml-content` or `javascript jaml-content` fence for equal responsive tracks. A child can span the row with a `gridColumn` style of `1 / -1`. Unknown layout hints fall back to wrapping. Use native composition and styles to lay out JAMLL records.

Use ordinary child styles for explicit sizing and long captions (for example `cap.text(whitespace:normal)`); the host does not infer business hierarchy from element types. More complex shared state or relationships can still justify an authored container. See [indicator](../JAM-UI/indicator.md), [chart prerequisites/data](../JAM-UI/chart.md) and [presentation/lifetime](../Plugins/markdown.md#playground-presentation) for unresolved details. State stays within its block unless the host declares otherwise.

## Local state and actions

A small reply can use the following native wiring contract directly. Check the selected owner's parameters and behavior plugins before composing extra controls for behavior it already provides. Retrieve the selected element or plugin's guide for its own inputs and prerequisites.

| Need               | Authoring contract                                                                                                                                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Native parts       | Put `type`, `cap`, `value` and other documented parameters at the definition's top level; object-form children use `components`, and JAMLL also supports child indentation.                                                   |
| Shared local state | Put initial keys in a native owner's `vars`, such as `container`. That owner is justified when children share state, layout or lifetime. Independent elements can be separate JAMLL records.                                  |
| Editable value     | `value: '{{quantity}}'` is a single-variable, two-way binding. Form collection or extra publication can justify `valueKey`; read its [inbound watcher and ownership contract](jaml-format.md#valuekey) before combining them. |
| Derived value      | `value: '{{quantity}} * 2'` re-evaluates when the key changes; it does not provide two-way editing. Binder support covers documented parameters and control keys.                                                             |
| Local command      | Use a normal handler such as `onclick() { this.model.vars.quantity = 0; }`. Its `this` is the element, so use a method or function handler for that receiver. Write individual keys on `model.vars`.                          |
| Appearance         | `styles` is an ordered list of registered style/plugin paths; `style` is a CSS declaration object. Native semantic parts and state remain their owners.                                                                       |

This example has one model because the input, switch, metric and restore action share values. The input owns editing, the switch owns toggling and the indicator owns the result.

````text
```text jamll-content
{ type: 'container', vars: { quantity: 2, enabled: true } }
    { type: 'input-number', cap: 'Quantity', value: '{{quantity}}' }
    { type: 'switch', cap: 'Include', value: '{{enabled}}' }
    { type: 'indicator-number', cap: 'Included quantity', value: '{{enabled}} ? {{quantity}} : 0', unit: 'units' }
    { type: 'button', cap: 'Restore values', onclick() { this.model.vars.quantity = 2; this.model.vars.enabled = true; } }
```
````

An emptied number input publishes `null`, and `null` multiplies as zero. Keep an empty result distinct from a real zero by returning `null` from the expression, so `placeholder` shows. `group.bento` gives each field and the result its own tile:

<!-- generated-reply-demo:calculator:start -->

````text
```text jamll-content
{ type: 'container', vars: { packs: 4, price: 7.5 }, styles: ['layout.autoalign', 'group.bento'] }
    { type: 'input-number', cap: 'Packs', value: '{{packs}}' }
    { type: 'input-number', cap: 'Price', decimalPos: 2, value: '{{price}}' }
    { type: 'indicator-number', cap: 'Total', decimalPos: 2, unit: 'credits', placeholder: '—', value: '{{packs == null || price == null ? null : packs * price}}', styles: ['value.major()'] }
```
````

<!-- generated-reply-demo:calculator:end -->

The state lasts with this model. A re-created view can start from its initial values again. Saving across replies or sending a response to the assistant needs the host's advertised contract. See [model vars](jaml-format.md#vars), [value bindings](binder.md#variable-binder-key), [input](../JAM-UI/input.md), [switch](../JAM-UI/switch.md) and [indicator](../JAM-UI/indicator.md) when the task exceeds the forms above.

## Ground the complete reply

Apply the same evidence standard to the authored view, its captions, surrounding prose and optional advice.

-   **API and behavior claims:** use the owning contract already in context; retrieve only a material unresolved rule. A limitation or delivery/timing guarantee, including a callback for every intermediate event, needs explicit support from that owner. Treat a missing example or search hit as unknown. Omit speculative advice.
-   **Domain claims:** distinguish supplied facts and valid derivations from assumptions about the business. Label a necessary assumption; ask only when the missing fact changes the requested outcome.
-   **Action claims:** describe the actor, target and result actually observed. A local state change or tool record establishes that scope. Broader assurances require the responsible host or service contract; report material unknowns precisely.

Before sending, reconcile explanations and UI text with the actual definition and evidence, including any extra calculations or summaries. Remove contradictions and unsupported asides. [Static validation](../validation.md) is an optional aid for mechanical questions; prose, data sufficiency and layout fit need their own evidence.

## Host integration

Keep the persistent instruction small: UI discretion, the three reuse boundaries, the JAMLL default for a capable host, the fast path and where unresolved contracts live. Put the default before complete-module fallback and make capability examples follow it; scope `export default` instructions to complete modules. Include the compact native state/action contract for familiar replies so the model need not rediscover it. Supply availability and complete hot contracts separately. Skills carry the reusable decision/composition guidance; MCP or another capability lookup can supply details when necessary.

Use only the fence, mounting, data, state and response APIs advertised by the target shell. The [Markdown executor](../Plugins/markdown.md#content-policy-and-playground-ownership) owns generic mounting and revision lifetime; the installed JAML skill's AGUI workflow describes the `agui` state and response boundary.
