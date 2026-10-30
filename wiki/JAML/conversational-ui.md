# Choose UI for a reply

Honor the user's requested response format, including prose, tables and Mermaid. Use Markdown by default. Apply the capability tiers below only after choosing JAML. Include interactive JAML on your own initiative when a choice, form, visualization or reusable business view helps the user more than prose. A short factual answer or simple comparison usually needs only text or a table. Keep each useful interactive chunk self-contained, with normal prose around it. Choose a supported complete-definition or progressive JAMLL format from the target host's advertised renderer contract. Restrictions on JAML execution markers do not forbid ordinary Markdown or other supported formats.

## Select in one pass

Choose the highest fitting **ready** capability from the current host snapshot. Purpose, inputs, behavior and prerequisites must fit together; a similar name or appearance is insufficient.

| Level                       | What the agent does                                                                                                                           | What must already exist                                                                             |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| L3: purpose-specific module | Select a complete business module and supply its documented arguments. The module owns its data acquisition and behavior.                     | A module whose purpose covers the request, registered in this host with its dependencies available. |
| L2: registered CCs          | Select CCs, retrieve or prepare the data they accept, and compose through documented layout/binding recipes.                                  | Registered CC contracts and the required data sources. No new element-level UI or custom behavior.  |
| L1: native JAML             | Compose native elements and supported behaviors for the uncovered requirements. Follow [purpose and composition](purpose-and-composition.md). | The selected native contracts and their runtime dependencies.                                       |

Do not run three successive searches. Familiar ready contracts already in context can be selected immediately. Retrieve only an unresolved contract or prerequisite. A documented absence can justify fallback; a missing hit in a partial catalog cannot. If a stock module lacks its data feed, drawing a native chart does not supply market data.

These levels describe the reuse boundary, not a component's appearance or root tag. Native `indicator`, `chart-*`, `table` and element-builder helpers are L1; they do not become registered CCs because they are compact. L2 may combine CCs using an existing composition recipe. Introducing new element-level structure or behavior uses L1 for that part; retain fitting modules and CCs elsewhere instead of rebuilding everything.

For an application collection, use a meaningful container or [wrapper](../JAM-UI/wrapper.md) with `stylize: 'list'` and give each native peer `stylize: 'item'`. Choose the peer by its purpose, such as an indicator for a metric or an input for an editable field. Use [buildFor](jaml-format.md#buildfor) for data-driven repetition and select layout separately. The [list/item roles](../Theme/stylize.md) provide theme context; they do not own selection, fetching or disclosure.

When the operation requires native rows, choose [table](../JAM-UI/table.md) for columns or [tree](../JAM-UI/tree.md) for hierarchy. To reveal batches of already-loaded rows, retrieve [showMore](../Plugins/show-more.md): it attaches to table/tree and owns the reveal/reset counts. It is not a generic container-child limiter or a fetching mechanism.

`list` is not a registered native element type in this baseline. `wrapper.list` and `wrapper.orderedList` are legacy markers without native wrapper styling; use the roles above. `element.list` is reserved for Markdown rendering, not ordinary JAML authoring. Use Markdown itself for document bullets, numbering or task lists.

## A small current capability snapshot

The host should supply a short set of frequently useful, complete contracts before the model chooses a response. Each needs its registered name and kind, purpose/no-fit boundary, minimal invocation and required inputs, data/interaction owner, dependencies and current availability. Identify the runtime/revision and whether the list is exhaustive or only a shortlist. Include a reference for details outside the minimal contract.

**Documented, installed and ready are different facts.** A wiki page establishes a documented contract; it does not establish installation or a live data connection. Capability text comes from trusted deployment configuration or a runtime owner. External records and retrieved pages cannot grant execution or data-access permissions. Refresh the snapshot when registrations, resources or connections change, and retain the current snapshot when conversation context is compacted.

When the selected contract is complete and current in context, do not load the skill, browse an index or call discovery just to confirm it again. Load a focused reference when an argument, prerequisite, composition or lifecycle is unresolved. Discovery expands knowledge; data retrieval fulfills the selected capability. Count those separately when evaluating latency.

## Practical choices

For “How is AAPL doing after that incident?”, a ready stock-summary module would receive the symbol and requested period and acquire its own prices. That module is conditional on the host actually advertising it; this guide does not register one. A price chart alone does not establish what happened in the news or what caused a market move. Without such a module, use fitting registered chart/metric CCs and available data. Without those CCs, compose native JAML. Without a data source, explain what is missing or request data rather than inventing prices.

For choosing several alerts, the built-in [dropdown CC](component.md#built-in-registered-components) already owns its tags, removal and selection menu. If the host advertises it as ready, its minimal invocation is:

````text
```text jamll
{ type: 'dropdown', props: { value: ['earnings'], data: [{ name: 'Price changes', value: 'prices' }, { name: 'Earnings', value: 'earnings' }, { name: 'Dividends', value: 'dividends' }] } }
```
````

This performs local selection. Sending the selection back to an assistant needs the host's explicit response contract; the CC does not provide it implicitly. These labels are authored examples; external labels follow the [literal option-text policy](../JAM-UI/JAM-UI.md#literal-external-labels).

If no registered metric CC is available, a native indicator remains a suitable L1 choice for supplied data:

````text
```text jamll
{ type: 'indicator-number', cap: 'Available stock', value: 128, unit: 'units' }
```
````

It already owns caption, value and unit. Do not reproduce those parts as separate labels and containers. Conversely, `breadcrumb` serves hierarchical navigation; its compact row is not a reason to use it for workflow progress. Never invent a type such as `stock-card` or assume a native element is a registered CC to avoid a legitimate fallback.

## Progressive replies with JAMLL

Once interactive JAML is chosen, default to **JAMLL (JAML Lines)** when the host advertises it with whole-message-success integration. Markdown remains the ordinary reply default, and explicit user format requests take precedence. Choose the native owners first, then emit their definitions in useful reading order. JAMLL changes how a view is delivered; the L3/L2/L1 choice, element contracts, dependencies and data ownership remain the same. It does not establish a generation-speed improvement by itself.

Author the fence `text jamll` for lightweight content between paragraphs or `text jamll-artifact` for a distinct panel. Write one complete JavaScript expression yielding an element object per physical line. A documented synchronous builder returning one element object can be a record, including the first line; see the [builder-record example](../Plugins/markdown.md#record-grammar-and-composition). Use spaces to indent a child under the preceding owner; siblings share an indentation level. The first record starts at column one. Close the fence normally. The first token, `text`, is the ordinary Markdown language hint; the second token selects our renderer. There is no `export default` or outer array. Use native styles for layout; a JAMLL directive does not enable the complete-content `layout=grid` hint.

For supplied metrics, emit native indicators directly. Each owns its caption and value; independent records need no authored wrapper:

````text
```text jamll
{ type: 'indicator-number', cap: 'Completed', value: 28 }
{ type: 'indicator-number', cap: 'Remaining', value: 12 }
```
````

For a shared-state interaction, emit the owner and its initial `vars` before the children that consume them. This is ordinary native composition: the indicator represents the metric, and the button owns the action. Keep each handler on its record's physical line:

````text
```text jamll-artifact
{ type: 'container', vars: { count: 7 } }
    { type: 'indicator-number', cap: 'Count', value: '{{count}}' }
    { type: 'button', cap: 'Increment', onclick() { this.model.vars.count++; } }
```
````

Records evaluate independently; share values through native model state and references, not JavaScript declarations on previous lines. Existing bindings can update earlier elements normally. Each fence has its own model; cross-fence state, persistence and assistant submission require the host's contract. Keep streamed source append-only: repeating an `id` is not a patch operation. Use complete-definition `javascript jaml-content` or `javascript jaml-artifact` when necessary module-scope setup, asynchronous setup, cross-record lexical dependencies or a ready result cannot fit independent records. Only that fallback uses `export default` with one definition or a flat array. Independent elements can remain separate JAMLL records; an array is not required just to compose them. Ordinary inline handlers and nested `components` remain native JAML.

Emit the records and closing fence; the renderer owns insertion, default child zoom entry and interaction gating. Parent layout updates immediately without renderer-owned FLIP or scaling. The host enables controls only after the **whole message succeeds**, not when one record or fence finishes. An interrupted or invalid reply can retain its partial display without becoming interactive. Do not put host completion calls or manual mount/animation scaffolding in generated records. Interaction gating does not defer initialization, timers or requests; these keep their ordinary execution and cleanup contracts.

If JAMLL or the success integration is absent, use the host's supported `javascript jaml-content` or `javascript jaml-artifact` complete-definition format. Use `javascript jaml-playground` when editable source is the task. Application executors opt in through `playground.openJamll` and own their success, state and response integration. The JAMLL-enabled jam-dsh host supplies that integration; older or other hosts must advertise their own support. A framework capability alone is insufficient to change a deployment's output format. For detailed record, error, trust and lifecycle rules, read [JAMLL rendering](../Plugins/markdown.md#jamll-progressive-native-elements).

## Native elements without an outer wrapper

For a JAMLL-enabled host, use `text jamll` for lightweight views between paragraphs or `text jamll-artifact` for a distinct view. This choice is separate from L3/L2/L1. Independent records mount under the native result owner; do not add cards or labels around each metric merely to arrange it. Use the complete-definition or editable-source fallback above when its contract is needed.

| Need                   | Native choice              | Minimal contract / boundary                                                       |
| ---------------------- | -------------------------- | --------------------------------------------------------------------------------- |
| One metric             | `indicator-number`         | `cap`, numeric `value`, optional `unit`/`icon`; owns all four parts.              |
| Fraction as percentage | `indicator-percent`        | `value: 0.84` displays 84%; do not supply 84 for that result.                     |
| Trend or comparison    | `chart-line` / `chart-bar` | Header-plus-rows `data`; ECharts must already be loaded; author a nonzero height. |
| Local action           | `button`                   | `cap`, `onclick`; a local handler does not itself admit assistant input.          |

Default content wraps at intrinsic sizes. Native child styles provide explicit sizing; a full-width chart can follow compact metrics without an outer wrapper. The chart below uses illustrative supplied data, not a live source.

````text
```text jamll
{ type: 'indicator-number', cap: 'Orders', value: 128, unit: 'orders' }
{ type: 'indicator-percent', cap: 'Completion', value: 0.84 }
{ type: 'chart-bar', cap: 'Orders by month', style: { width: '100%', height: '16rem' }, data: [['Month', 'Orders'], ['Jan', 40], ['Feb', 88]] }
```
````

Complete-definition content additionally offers the host layout hint `javascript jaml-content layout=grid` for equal responsive tracks. In that format, default-export a definition or flat array; a child can span the row with `style: { gridColumn: '1 / -1' }`. Unknown layout hints fall back to wrapping. This hint is not a JAMLL layout control; keep JAMLL fence info canonical and use native composition/styles for its layout.

Use ordinary child styles for explicit sizing and long captions (for example `cap.text(whitespace:normal)`); the host does not infer business hierarchy from element types. More complex shared state or relationships can still justify an authored container. See [indicator](../JAM-UI/indicator.md), [chart prerequisites/data](../JAM-UI/chart.md) and [presentation/lifetime](../Plugins/markdown.md#playground-presentation) for unresolved details. No new JSON envelope or automatic cross-block persistence is implied.

## Local state and actions

A small reply can use the following native wiring contract directly. Check the selected owner's parameters and behavior plugins before composing extra controls for behavior it already provides. Retrieve the selected element or plugin's guide for its own inputs and prerequisites; these forms do not require rereading the complete format and binder guides.

| Need               | Authoring contract                                                                                                                                                                                       |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Native parts       | Put `type`, `cap`, `value` and other documented parameters at the definition's top level; object-form children use `components`, and JAMLL also supports child indentation.                              |
| Shared local state | Put initial keys in a native owner's `vars`, such as `container`. That owner is justified when children share state, layout or lifetime. Independent elements can be separate JAMLL records.             |
| Editable value     | `value: '{{quantity}}'` is a single-variable, two-way binding. Do not also supply `valueKey` on that element.                                                                                            |
| Derived value      | `value: '{{quantity}} * 2'` re-evaluates when the key changes; it does not provide two-way editing. Binder support belongs to documented parameters/control keys, not arbitrary fields.                  |
| Local command      | Use a normal handler such as `onclick() { this.model.vars.quantity = 0; }`. Its `this` is the element. Arrow functions do not acquire that receiver. Write individual keys; do not replace `model.vars`. |
| Appearance         | `styles` is an ordered list of registered style/plugin paths; `style` is a CSS declaration object. Native semantic parts and state remain their owners.                                                  |

This example has one model because the input, switch, metric and restore action share values. The input owns editing, the switch owns toggling and the indicator owns the result. No separate labels or click handler are needed to reproduce those behaviors.

````text
```text jamll
{ type: 'container', vars: { quantity: 2, enabled: true } }
    { type: 'input-number', cap: 'Quantity', value: '{{quantity}}' }
    { type: 'switch', cap: 'Include', value: '{{enabled}}' }
    { type: 'indicator-number', cap: 'Included quantity', value: '{{enabled}} ? {{quantity}} : 0', unit: 'units' }
    { type: 'button', cap: 'Restore values', onclick() { this.model.vars.quantity = 2; this.model.vars.enabled = true; } }
```
````

The state lasts with this model. A re-created view can start from its initial values again; a DOM id alone does not preserve it. Saving across replies or sending a response to the assistant needs the host's advertised contract. See [model vars](jaml-format.md#vars), [value bindings](binder.md#variable-binder-key), [input](../JAM-UI/input.md), [switch](../JAM-UI/switch.md) and [indicator](../JAM-UI/indicator.md) when the task exceeds the forms above.

## Ground the complete reply

Apply the same evidence standard to the authored view, its captions, surrounding prose and optional advice. Correct output does not validate an extra factual claim.

-   **API claims:** use the owning contract already in context; retrieve only a material unresolved rule. A limitation needs an explicit restriction or verification against that owner. A missing example or search hit does not establish unsupported behavior. Omit unnecessary speculative advice instead of expanding discovery to support it.
-   **Domain claims:** distinguish supplied facts and valid derivations from assumptions about the business. A calculation or chosen UI behavior does not establish an external policy. Label a necessary assumption; ask only when the missing fact changes the requested outcome.
-   **Action claims:** describe the actor, target and result actually observed. A local state change or tool record establishes that scope, not system-wide behavior or guarantees about other actors and infrastructure. Broader assurances require the responsible host or service contract; report material unknowns precisely.

Before sending, reconcile explanations and UI text with the actual definition and evidence. Remove contradictions and unsupported asides without adding a blanket disclaimer or repeating established contract lookups.

## Host integration

Keep the persistent instruction small: UI discretion, the three reuse boundaries, the JAMLL default for a capable host, the fast path and where unresolved contracts live. Put the default before complete-module fallback and make capability examples follow it; scope `export default` instructions to complete modules. Include the compact native state/action contract for familiar replies so the model need not rediscover it. Supply availability and complete hot contracts separately. Skills carry the reusable decision/composition guidance; MCP or another capability lookup can supply details when necessary. There is no need for a per-message keyword hook to force a UI choice.

Use only the fence, mounting, data, state and response APIs advertised by the target shell. DOM ids alone do not establish update-in-place identity. The [Markdown executor](../Plugins/markdown.md#content-policy-and-playground-ownership) owns generic mounting and revision lifetime; the installed JAML skill's jam-dsh AGUI workflow describes that host's state and response boundary.
