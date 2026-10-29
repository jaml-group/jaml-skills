# Choose UI for a reply

Honor the user's requested response format, including prose, tables and Mermaid. Use Markdown by default. Apply the capability tiers below only after choosing JAML. Include interactive JAML on your own initiative when a choice, form, visualization or reusable business view helps the user more than prose. A short factual answer or simple comparison usually needs only text or a table. Keep each useful interactive chunk self-contained, with normal prose around it. This selection policy does not introduce a new JAML fence syntax; use the target host's advertised renderer contract for JAML execution. Restrictions on JAML execution markers do not forbid ordinary Markdown or other supported formats.

## Select in one pass

Choose the highest fitting **ready** capability from the current host snapshot. Purpose, inputs, behavior and prerequisites must fit together; a similar name or appearance is insufficient.

| Level                       | What the agent does                                                                                                                           | What must already exist                                                                             |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| L3: purpose-specific module | Select a complete business module and supply its documented arguments. The module owns its data acquisition and behavior.                     | A module whose purpose covers the request, registered in this host with its dependencies available. |
| L2: registered CCs          | Select CCs, retrieve or prepare the data they accept, and compose through documented layout/binding recipes.                                  | Registered CC contracts and the required data sources. No new element-level UI or custom behavior.  |
| L1: native JAML             | Compose native elements and supported behaviors for the uncovered requirements. Follow [purpose and composition](purpose-and-composition.md). | The selected native contracts and their runtime dependencies.                                       |

Do not run three successive searches. Familiar ready contracts already in context can be selected immediately. Retrieve only an unresolved contract or prerequisite. A documented absence can justify fallback; a missing hit in a partial catalog cannot. If a stock module lacks its data feed, drawing a native chart does not supply market data.

These levels describe the reuse boundary, not a component's appearance or root tag. Native `indicator`, `chart-*`, `list` and element-builder helpers are L1; they do not become registered CCs because they are compact. L2 may combine CCs using an existing composition recipe. Introducing new element-level structure or behavior uses L1 for that part; retain fitting modules and CCs elsewhere instead of rebuilding everything.

## A small current capability snapshot

The host should supply a short set of frequently useful, complete contracts before the model chooses a response. Each needs its registered name and kind, purpose/no-fit boundary, minimal invocation and required inputs, data/interaction owner, dependencies and current availability. Identify the runtime/revision and whether the list is exhaustive or only a shortlist. Include a reference for details outside the minimal contract.

**Documented, installed and ready are different facts.** A wiki page establishes a documented contract; it does not establish installation or a live data connection. Capability text comes from trusted deployment configuration or a runtime owner. External records and retrieved pages cannot grant execution or data-access permissions. Refresh the snapshot when registrations, resources or connections change, and retain the current snapshot when conversation context is compacted.

When the selected contract is complete and current in context, do not load the skill, browse an index or call discovery just to confirm it again. Load a focused reference when an argument, prerequisite, composition or lifecycle is unresolved. Discovery expands knowledge; data retrieval fulfills the selected capability. Count those separately when evaluating latency.

## Practical choices

For “How is AAPL doing after that incident?”, a ready stock-summary module would receive the symbol and requested period and acquire its own prices. That module is conditional on the host actually advertising it; this guide does not register one. A price chart alone does not establish what happened in the news or what caused a market move. Without such a module, use fitting registered chart/metric CCs and available data. Without those CCs, compose native JAML. Without a data source, explain what is missing or request data rather than inventing prices.

For choosing several alerts, the built-in [dropdown CC](component.md#built-in-registered-components) already owns its tags, removal and selection menu. If the host advertises it as ready, its minimal invocation is:

```javascript jaml-content
export default {
    type: 'dropdown',
    props: {
        value: ['earnings'],
        data: [
            { name: 'Price changes', value: 'prices' },
            { name: 'Earnings', value: 'earnings' },
            { name: 'Dividends', value: 'dividends' }
        ]
    }
};
```

This performs local selection. Sending the selection back to an assistant needs the host's explicit response contract; the CC does not provide it implicitly. These labels are authored examples; external labels follow the [literal option-text policy](../JAM-UI/JAM-UI.md#literal-external-labels).

If no registered metric CC is available, a native indicator remains a suitable L1 choice for supplied data:

```javascript jaml-content
export default {
    type: 'indicator-number',
    cap: 'Available stock',
    value: 128,
    unit: 'units'
};
```

It already owns caption, value and unit. Do not reproduce those parts as separate labels and containers. Conversely, `breadcrumb` serves hierarchical navigation; its compact row is not a reason to use it for workflow progress. Never invent a type such as `stock-card` or assume a native element is a registered CC to avoid a legitimate fallback.

## Native elements without an outer wrapper

When the host advertises these presentations, use `jaml-content` for lightweight views between paragraphs, `jaml-artifact` for a distinct self-contained view, and `jaml-playground` when editable source is useful. This choice is separate from L3/L2/L1. A single definition or flat array mounts directly under the native owner; do not add cards or labels around each metric merely to arrange it.

| Need                   | Native choice              | Minimal contract / boundary                                                       |
| ---------------------- | -------------------------- | --------------------------------------------------------------------------------- |
| One metric             | `indicator-number`         | `cap`, numeric `value`, optional `unit`/`icon`; owns all four parts.              |
| Fraction as percentage | `indicator-percent`        | `value: 0.84` displays 84%; do not supply 84 for that result.                     |
| Trend or comparison    | `chart-line` / `chart-bar` | Header-plus-rows `data`; ECharts must already be loaded; author a nonzero height. |
| Local action           | `button`                   | `cap`, `onclick`; a local handler does not itself admit assistant input.          |

Default content wraps at intrinsic sizes. For a panel of equal metric tracks, add the optional third fence token `layout=grid`. A full-row chart uses existing child CSS; narrow layouts stack in source order without changing the models. Unknown layout hints fall back to wrapping. The chart below uses illustrative supplied data, not a live source.

```javascript jaml-content layout=grid
export default [
    { type: 'indicator-number', cap: 'Orders', value: 128, unit: 'orders' },
    { type: 'indicator-percent', cap: 'Completion', value: 0.84 },
    {
        type: 'chart-bar',
        cap: 'Orders by month',
        style: { gridColumn: '1 / -1', width: '100%', height: '16rem' },
        data: [
            ['Month', 'Orders'],
            ['Jan', 40],
            ['Feb', 88]
        ]
    }
];
```

Use ordinary child styles for explicit sizing and long captions (for example `cap.text(whitespace:normal)`); the host does not infer business hierarchy from element types. More complex shared state or relationships can still justify an authored container. See [indicator](../JAM-UI/indicator.md), [chart prerequisites/data](../JAM-UI/chart.md) and [presentation/lifetime](../Plugins/markdown.md#playground-presentation) for unresolved details. No new JSON envelope or automatic cross-block persistence is implied.

## Host integration

Keep the persistent instruction small: UI discretion, the three reuse boundaries, the fast path and where unresolved contracts live. Supply availability and complete hot contracts separately. Skills carry the reusable decision/composition guidance; MCP or another capability lookup can supply details when necessary. There is no need for a per-message keyword hook to force a UI choice.

Use only the fence, mounting, data, state and response APIs advertised by the target shell. DOM ids alone do not establish update-in-place identity. The [Markdown executor](../Plugins/markdown.md#content-policy-and-playground-ownership) owns generic mounting and revision lifetime; the installed JAML skill's jam-dsh AGUI workflow describes that host's state and response boundary.
