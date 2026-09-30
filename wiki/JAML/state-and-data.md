# State and data composition

Use the native semantic owner, then decide who publishes state and who consumes it. Prefer listening consumers for shared application state. JAML is opinionated but permissive: direct event handlers, component-to-component calls, private fetches and shared data owners are all supported. Choose the simplest ownership model that fits the relationship.

## Selection and content

For tab-like navigation, start with `buttongroup-radio`. It owns mutually exclusive selection, the selected value and checked state, including native visible checked presentation. `check.*` is optional alternative presentation; an underline does not create selection or complete tabs behavior.

The preferred relationship is **selection owner → published value → listening content**. Generic buttons with click handlers that locate and change a panel can work, but rebuilding native exclusive selection adds unnecessary orchestration. This example publishes `page` through `valueKey`; containers consume it through `showIf`:

```javascript jaml-playground
export default {
    type: 'container',
    vars: { page: 'overview' },
    components: [
        {
            type: 'buttongroup-radio',
            valueKey: 'page',
            data: [
                { name: 'Overview', value: 'overview' },
                { name: 'Details', value: 'details' },
                { name: 'History', value: 'history' }
            ]
        },
        { type: 'container', showIf: "{{page === 'overview'}}", components: [{ type: 'label', cap: 'Overview content' }] },
        { type: 'container', showIf: "{{page === 'details'}}", components: [{ type: 'label', cap: 'Details content' }] },
        { type: 'container', showIf: "{{page === 'history'}}", components: [{ type: 'label', cap: 'History content' }] }
    ]
};
```

`showIf` hides retained content; it does not destroy the panel or suspend its work. Choose [visibility and construction](jaml-format.md#showif) according to the intended lifetime. This is a content switcher, not a complete accessible tabs implementation: verify tab/panel relationships, focus, keyboard navigation and activation separately. Do not invent a `switchable` element from the conceptual name. Add `styles: ['check.underscore']` to the group only when that visual design is wanted.

For direct actions, an `onclick` handler may call a documented method on a referenced element. Use the existing [ref and `model.ref` contract](jaml-format.md#ref); check the target's method and readiness. A one-off command need not become shared state. Conversely, another component's need to observe the current selection is a good reason to publish state instead of manually commanding it.

## Private runtime data

A renderer can react to request/options state, fetch its own data and redraw. Its parent need not fetch and distribute the result. The [URL suffix](jaml-format.md#param-suffixes--keysuffix) accepts a URL string or a request-options object: `dataUrl` writes the response into `data`, while `valueUrl` writes into `value`. The target must support that parameter and response shape. There is no universal request-signal parameter on every element.

This complete definition requires an application endpoint `/api/sales/chart` returning the chart's dataset format, such as `[['Period', 'Sales'], ['Jan', 120]]`, and the chart integration:

```javascript
export default {
    type: 'container',
    vars: { request: { region: 'US', period: 'month', version: 0 } },
    components: [
        {
            type: 'chart-line',
            styles: ['css(height:15rem;width:20rem)'],
            dataUrl: {
                url: '/api/sales/chart',
                params: { region: '{{request.region}}', period: '{{request.period}}' },
                version: '{{request.version}}'
            }
        },
        { type: 'button', cap: 'Refresh', onclick: 'this.model.vars.request.version++' }
    ]
};
```

### Refresh unchanged logical arguments

Equal request-option values need not trigger another fetch. Bind an application-owned changing marker, such as the `version` counter above, into the request-options object to make a refresh observable while keeping logical query parameters unchanged. A changing timestamp can serve the same purpose, but repeated timestamps in one millisecond are not distinct. `version` and `timestamp` are ordinary application fields, not reserved JAML refresh APIs. Keep the marker outside `params`/`data` when it should not go to the endpoint.

This pattern triggers the ordinary component URL request path, whose default override policy bypasses shared promises. If sharing is explicitly enabled, a changed marker can still reuse a retained promise: invalidating reactive options and forcing a new backend call are different operations. Preserve the intended cancellation, freshness and response-order policy when customizing requests.

## Shared data owner

When several consumers share one logical dataset, prefer the invisible `data` virtual component as its explicit owner:

**`data.valueUrl` → `data.value` → `valueKey: 'salesData'` → listening consumers**

`data` is a hidden input-capable representer, not a rendered data view. `valueUrl` fetches its value; value changes publish through `valueKey`. Do not substitute `dataUrl` on this producer: the shared payload is its `value`. Consumers that support option data, including tables and charts, can use `dataWatcher: 'salesData'`; other shapes use a bound projection into a supported parameter. A shared key does not make one response format suitable for every renderer.

The following application definition requires `/api/sales` to return records such as `[{ period: 'Jan', sales: 120 }]`. The table consumes the records; the chart derives a dataset without fetching again:

```javascript
export default {
    type: 'container',
    vars: { request: { region: 'US', version: 0 }, salesData: [] },
    components: [
        {
            type: 'data',
            valueKey: 'salesData',
            valueUrl: {
                url: '/api/sales',
                params: { region: '{{request.region}}' },
                version: '{{request.version}}'
            }
        },
        { type: 'table', dataWatcher: 'salesData' },
        {
            type: 'chart-line',
            styles: ['css(height:15rem;width:20rem)'],
            data: "{{[['Period', 'Sales'], ...salesData.map(row => [row.period, row.sales]) ]}}"
        },
        { type: 'button', cap: 'Refresh sales', onclick: 'this.model.vars.request.version++' }
    ]
};
```

Keep producer and consumers in the intended model/broker scope. For an explicitly named broker, use `valueKey: 'salesData@brokerName'` and `dataWatcher: 'salesData@brokerName'`; bound projections must resolve that same data scope. See [brokers](binder.md#brokers) and [watchers](binder.md#valuewatcher--statewatcher--datawatcher) for initialization and scope. Updating a value to an equal value need not emit another change. Loading, errors, refresh lifetime and empty states still need application decisions; a shared owner is not automatically a polling or status UI.

Independent table/chart fetching remains valid when their request ownership is independent. For one shared dataset, a dedicated owner makes ownership and consistency explicit; request caching does not establish that architecture.

## Request sharing and cache limits

The request engine supports **in-flight request-promise sharing with short post-completion retention**. It is not a 400 ms batching/debounce window, nor a guarantee for every JAML fetch:

-   When sharing is enabled, matching requests can reuse the pending promise. Pending work can remain shared for longer than 400 ms. The default retention is **400 ms after the originating request finishes**; errors remove the originating cache entry. Each caller applies its own response handling/transform.
-   Identity uses the URL with query parameters separated out, the response type (`auto` by default), and a hash of merged `data` and `params` (`params` wins duplicate keys). This is a hash-based identity, not full semantic equality: array order and fractional numeric distinctions are not reliably preserved by the hash.
-   HTTP method and headers are not part of that identity. Do not rely on it to isolate requests with different authorization or method semantics. This applies to the framework request engine, not arbitrary browser `fetch` calls.
-   A truthy `override` bypasses sharing. Ordinary nonpolling component `*Url` requests supply an override function by default to supersede their own earlier request; two such consumers are **not guaranteed to share a backend call**.
-   Explicit `override: false` permits sharing on that path but removes its default superseding cancellation. A refresh may reuse a retained response, and response-order handling must still fit the application. Do not add this option mechanically to every renderer.

Therefore, use a shared `data` owner for a shared logical dataset; treat conditional request sharing as an efficiency mechanism for compatible independent requests. Verify the installed runtime's request policy before relying on it for freshness or backend-call counts.
