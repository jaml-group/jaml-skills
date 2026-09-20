# Binders & Messaging

[toc]

A **binder** is a reactive subscription — whenever a referenced key in `vars` or a remote broker changes, the param is re-evaluated and re-applied. The **messenger** (broker) system connects models, components, and watchers into a shared reactive data bus.

---

## Brokers

**Key:** `broker` — **Type:** `string | IBroker`

Attach a named message broker to this model. Brokers are the message bus that creates shared state between models, components and watchers.

**How it works:** a broker is a named pub/sub channel identified by a string ID. Any model that specifies the same broker ID shares the same data store and receives each other's publications automatically. The ID is purely a string label — there is no registration step.

```javascript jaml-playground
export default [
    {
        type: 'container',
        broker: 'dashboard',
        vars: { activeTab: 'overview' },
        components: [
            {
                type: 'buttongroup-radio',
                cap: 'Tabs',
                valueKey: 'activeTab',
                data: [
                    { name: 'Overview', value: 'overview' },
                    { name: 'Detail', value: 'detail' }
                ]
            }
        ]
    },
    {
        type: 'container',
        broker: 'dashboard',
        styles: ['css(width:20rem;height:15rem;)'],
        childStyles: ['size.fullsize', 'layout.overflow(hidden)'],
        components: [
            {
                type: 'chart-pie',
                cap: 'Revenue by Category',
                styles: [, 'animation.entry.fromleft', 'animation.exit.toleft'],
                showIf: '{{activeTab}} === "overview"',
                data: [
                    ['Category', 'Revenue'],
                    ['Software', 4500],
                    ['Hardware', 2500],
                    ['Services', 1500]
                ]
            },
            {
                type: 'table',
                cap: 'Transaction Details',
                styles: ['table.stripy', 'animation.entry.fromright', 'animation.exit.toright'],
                showIf: '{{activeTab}} === "detail"',
                data: [
                    { date: '2024-03-01', client: 'Acme Corp', amount: '$1,200', status: 'Paid' },
                    { date: '2024-03-02', client: 'Global Tech', amount: '$850', status: 'Pending' },
                    { date: '2024-03-03', client: 'Starlight Inc', amount: '$2,100', status: 'Paid' },
                    { date: '2024-03-04', client: 'Nexus Ltd', amount: '$450', status: 'Overdue' }
                ]
            }
        ]
    }
];
```

**Built-in public brokers:**

| Broker ID | Type           | Description                                                                                                                     |
| --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `mango`   | In-memory      | Default in-page pub/sub. Fast, ephemeral. Most common.                                                                          |
| `milo`    | LocalStorage   | Persists across page refreshes. Shared across tabs via storage events.                                                          |
| `miso`    | SessionStorage | Persists for the browser session. Cleared when the tab closes.                                                                  |
| `mayo`    | PostMessage    | Cross-frame / cross-window messaging via `postMessage`.                                                                         |
| `page`    | Alias          | Resolves to the broker of the current route (`rambutan.currRoute.broker`). Useful for page-scoped state in a router-driven app. |

These are globally available without any setup:

```javascript jaml-playground
export default {
    type: 'input-color',
    value: jam.accolor,
    cap: 'Accent Color',
    valueKey: 'jam-accolor@milo'
};
```

```javascript jaml-playground
export default {
    type: 'wrapper',
    cap: 'Refresh the page to see the changes',
    broker: 'miso',
    // session-scoped state: survives page refreshes within the tab
    components: [
        { type: 'input', cap: 'User', value: '{{sessionUser.name}}', placeholder: 'Enter username' },
        { type: 'input', cap: 'Email', value: '{{sessionUser.email}}', placeholder: 'Enter email' }
    ]
};
```

**Scoped broker with `scopeBroker` and `@scope`:**

Set `scopeBroker: true` on a Model to create a broker scoped to that component subtree. Descendants use `@scope` to reference the nearest scoped ancestor's broker — useful for self-contained widgets that should not leak state to the global broker namespace.

```javascript jaml-playground
export default {
    type: 'container',
    components: [
        {
            type: 'wrapper',
            cap: 'Widget A',
            scopeBroker: true,
            vars: { active: false },
            components: [
                { type: 'switch', cap: 'Active', valueKey: 'active' },
                {
                    type: 'indicator',
                    cap: 'Status',
                    // Resolves "active" from nearest scopeBroker ancestor
                    value: '{{active@scope}}'
                }
            ]
        },
        {
            type: 'wrapper',
            cap: 'Widget B',
            scopeBroker: true,
            vars: { active: true },
            components: [
                {
                    type: 'indicator',
                    cap: 'Status',
                    value: '{{active@scope}}' // reads from Widget B's own scoped broker
                }
            ]
        }
    ]
};
```

---

### `msgFormat`

**Type:** `{ msgKey: string, valueKeys?: string[] }`

On click, collect form data and publish it to a message key. Used for CTA buttons that broadcast form results without an HTTP request. `msgKey` supports the `key@broker` syntax to publish to a specific broker. If `valueKeys` is provided, only the specified keys will be collected and published.

```json
{
    "type": "button",
    "cap": "Confirm",
    "msgFormat": { "msgKey": "formResult", "valueKeys": ["name", "email"] }
}
```

This is equivalent to:

```javascript
cmpt.msgr.pub('formResult', { name: 'Alice', email: 'alice@example.com' });
```

---

## Watchers

### `watchers`

**Type:** `Watcher[] | { [key: string]: Function }`

Subscribe to reactive data key changes. The callback receives `(value, data)`. Inside a watcher callback, `this` refers to the **element**.

```javascript jaml-playground
export default {
    type: 'container',
    vars: { score: 50 },
    components: [{ type: 'input-number', cap: 'Score', value: '{{score}}', placeholder: 'Enter score' }],
    watchers: [
        {
            key: 'score',
            callback: function (value) {
                nutmeg.info(`Score changed to ${value}`, { id: 'score' });
            },
            debounce: 200
        }
    ]
};
```

**Object shorthand:**

```javascript jaml-playground
export default {
    type: 'container',
    vars: { score: 88, user: { name: 'Alice', role: 'student' } },
    components: [
        { type: 'input', cap: 'Name', value: '{{user.name}}', placeholder: 'Enter name' },
        { type: 'input-number', cap: 'Score', value: '{{score}}', placeholder: 'Enter score' }
    ],
    watchers: {
        score: function (value) {
            nutmeg.info(`Score: ${value}`, { id: 'score' });
        },
        'user.name': function (value) {
            nutmeg.info(`Name: ${value}`, { id: 'username' });
        }
    }
};
```

**Multi-key watcher** — fire a single callback when _any_ of the listed keys change:

```javascript jaml-playground
export default {
    type: 'container',
    vars: { width: 12, height: 12 },
    components: [
        { type: 'input-number', cap: 'Width', value: '{{width}}', unit: 'm', placeholder: 'Enter width' },
        { type: 'input-number', cap: 'Height', value: '{{height}}', unit: 'm', placeholder: 'Enter height' }
    ],
    watchers: [
        {
            keys: ['width', 'height'],
            callback: function (width, height) {
                // all watched values passed as positional arguments
                nutmeg.info(`Area: ${width * height} m²`, { id: 'area' });
            },
            debounce: 400
        }
    ]
};
```

**Cross-broker watcher with `@broker`** — watch a key from a named broker rather than the local one. Use `@scope` to target the nearest scoped ancestor:

```javascript
export default {
    type: 'container',
    broker: 'shared',
    watchers: [
        {
            key: 'selectedItem@shared', // watch "selectedItem" in broker "shared"
            callback: function (item) {
                this.getElement('detail').value = item?.label ?? '—';
            },
            init: true
        }
    ]
};
```

**Watcher fields:**

| Field      | Type                           | Description                                                                       |
| ---------- | ------------------------------ | --------------------------------------------------------------------------------- |
| `key`      | `string`                       | Reactive key to watch. Supports `key@broker` syntax                               |
| `keys`     | `string[]`                     | Watch multiple keys; callback receives values in same order                       |
| `callback` | `Function`                     | Called with `(value, data)` on change                                             |
| `init`     | `boolean \| 'sync' \| 'manual'` | Fire immediately if value already exists; `sync` for sync fire; `manual` skips initial fire but still subscribes |
| `once`     | `boolean`                      | Unsubscribe after first call                                                      |
| `debounce` | `number`                       | Debounce delay in ms                                                              |

---

### `valueWatcher` / `stateWatcher` / `dataWatcher`

**Type:** `string`

Shorthand watchers that automatically set the element's `value`, `state`, or `data` when a key changes. Supports the `key@broker` syntax.

```json
{
    "type": "progress",
    "cap": "Loading",
    "valueWatcher": "loadProgress"
}
```

```json
{
    "type": "select",
    "cap": "Options",
    "dataWatcher": "optionList"
}
```

---

## Binder syntax

Any string value in a JAML object that contains `{{key}}` is automatically evaluated as a reactive binder — whenever a referenced key changes, the param is re-evaluated and re-applied. This applies to all element params and control keys that accept binder values (e.g. `showIf`, `buildIf`).

---

### Variable binder: `'{{key}}'`

The simplest form. Resolves to the value of `key` in `vars`. Supports top-level keys, dot-paths, and numeric array indices.

```javascript jaml-playground
export default {
    type: 'container',
    vars: { user: { name: 'John', theme: 'red', scores: [95, 80, 72] } },
    components: [
        { type: 'input', cap: 'Name', value: '{{user.name}}', placeholder: 'Enter name' }, // dot-path
        { type: 'input-color', value: '{{user.theme}}' }, // top-level key
        { type: 'indicator', cap: 'Top Score', value: '{{user.scores.0}}' } // array index
    ]
};
```

When the binder targets the `value` param it creates a **two-way binding**: the element publishes back to the same key when its value changes, and incoming key changes update the element. This only applies to a single variable binder — placeholder and expression binders do not create two-way binding.

```javascript jaml-playground
export default {
    type: 'container',
    vars: { name: '' },
    components: [
        { type: 'input', cap: 'Name', value: '{{name}}', placeholder: 'Enter name' }, // two-way
        { type: 'indicator', cap: 'Preview', value: '{{name}}' } // one-way display
    ]
};
```

> **Conflict:** `value: '{{key}}'` and `valueKey: 'key'` must not be used together on the same element. Both wire the element to the messenger but through different paths and will interfere. Pick one.

---

### Placeholder binder

A string where the `{{key}}` placeholders form a valid JavaScript expression (operators, comparisons, method calls). Expressions run as JavaScript and must be authored by trusted application code. Reacts whenever any referenced key changes.

> If the string contains literal text around `{{}}` (e.g. `'Hello {{name}}'`), it can't be a valid expression — that falls through to the [string template fallback](#string-template-fallback-not-recommended).

```javascript jaml-playground
export default {
    type: 'container',
    vars: { score: 75, maxScore: 100 },
    components: [
        { type: 'input-number', cap: 'Score', value: '{{score}}' },
        { type: 'input-number', cap: 'Max', value: '{{maxScore}}' },
        {
            type: 'indicator',
            cap: 'Grade',
            // Derived from the current score and maximum
            value: '{{score}} / {{maxScore}}'
        }
    ]
};
```

This is the most common binder form — it handles comparisons, method calls, concatenation, and fallbacks:

```javascript
buildIf: '{{showMode}} === 3'                    // comparison
cap: '{{node.branches}}.length + "branches"'         // method call + concatenation
value: '{{branch.condition}} || "condition not set"'      // logical OR fallback
cap: '{{node.nodeType}}.toUpperCase()'            // method chain
```

Each `{{key}}` acts as a JS variable in the expression body, not a string replacement. `'{{a}} + {{b}}'` evaluates numerically as `a + b`, not as string concatenation.

```javascript jaml-playground
export default {
    type: 'wrapper-vertical',
    cap: 'Student Assessment',
    vars: { score: 75, maxScore: 100, passThreshold: 0.6 },
    components: [
        { type: 'input-number', cap: 'Points Earned', value: '{{score}}', placeholder: 'Enter score', rules: { min: 0, max: '{{maxScore}}' } },
        { type: 'input-number', cap: 'Total Possible', value: '{{maxScore}}', placeholder: 'Enter max' },
        { type: 'input-range', cap: 'Pass Threshold', value: '{{passThreshold}}', min: 0, max: 1, step: 0.01 },
        {
            type: 'indicator',
            cap: 'Final Grade',
            formatter: 'v=>v.toFixed(2)',
            value: '{{score}} / {{maxScore}}', // evaluates to: score / maxScore
            unit: 'points',
            state: '{{score}} / {{maxScore}} >= {{passThreshold}} ? "success" : "danger"',
            states: {
                success: { icon: '🎉', color: 'green' },
                danger: { icon: '🚫', color: 'red' }
            }
        }
    ]
};
```

Each `{{key}}` acts as a JS variable in the expression body, not a string replacement. `'{{a}} + {{b}}'` evaluates numerically as `a + b`, not as string concatenation.

---

### Expression binder: `'{{ expression }}'`

Wrap an entire JavaScript expression inside a **single** `{{` … `}}` pair that covers the whole string. The parser scans the expression for top-level `vars` keys and subscribes to them automatically.

```javascript jaml-playground
export default {
    type: 'wrapper-vertical',
    vars: { radius: 5 },
    components: [
        { type: 'input-number', cap: 'Radius', value: '{{radius}}', placeholder: 'Enter radius' },
        { type: 'indicator-number', cap: 'Area', value: '{{ Math.PI * radius * radius }}' },
        { type: 'indicator', cap: 'Larger?', value: '{{ radius > 10 ? "Yes" : "No" }}' }
    ]
};
```

```javascript jaml-playground
export default {
    type: 'container',
    vars: { items: 'abcdefg'.split(''), selected: 1 },
    components: [
        { type: 'input-number', cap: 'Selected Index', min: 0, max: '{{items.length - 1}}', value: '{{selected}}', placeholder: 'Enter index (0, 1, 2)' },
        {
            type: 'indicator',
            // "items" and "selected" are both top-level keys — detected automatically
            value: '{{ items[selected] }}'
        }
    ]
};
```

**Constraints:**

- Only **top-level** keys in `vars` are detected as reactive dependencies. Dot-paths inside the expression (e.g. `foo.bar`) are not individually tracked — `foo` is subscribed and you access `.bar` inside the expression.
- Identifier names inside the expression that collide with a top-level key will be treated as that var's value. Avoid using variable names, object literals, or function names that match your top-level keys.

---

### `jaml.var()`: programmatic binder

`jaml.var()` is the JS-first binder builder. Use it when the reactive logic is too complex for a string expression, or when you need a strongly-typed, refactor-friendly alternative to the string forms.

```typescript signature
// Signatures
jaml.var(key: string)                    // single-key binding, same as '{{key}}'
jaml.var(key1, key2, ..., fn: Function)  // key(s) with transform
```

**Single key** — identical in behaviour to `'{{key}}'`, including two-way binding on `value`:

```javascript jaml-playground
export default {
    type: 'container',
    vars: { isReadOnly: false, theme: { accent: 'blue' } },
    components: [
        { type: 'switch', cap: 'Read Only', valueKey: 'isReadOnly' },
        { type: 'input-color', cap: 'Accent Color', value: '{{theme.accent}}' },
        {
            type: 'button',
            cap: 'Random',
            styles: ['auto.colored'],
            disabled: jaml.var('isReadOnly'), // same as '{{isReadOnly}}'
            color: jaml.var('theme.accent'),
            onclick() {
                this.vars.theme.accent = jam.color('random');
            }
        }
    ]
};
```

**Key(s) with a transform** — pass one or more key strings as leading arguments, then a callback as the final argument. The callback receives the current values of those keys in order and its return value is applied as the param. Reacts whenever any of the subscribed keys changes.

```javascript jaml-playground
export default {
    type: 'container',
    vars: { score: 75, maxScore: 100 },
    components: [
        { type: 'input-number', cap: 'Score', value: '{{score}}', placeholder: 'Enter score' },
        { type: 'input-number', cap: 'Max Score', value: '{{maxScore}}', placeholder: 'Enter max score' },
        {
            type: 'indicator',
            cap: 'Percentage',
            value: jaml.var('score', 'maxScore', (score, maxScore) => {
                if (maxScore === 0) {
                    return 'N/A';
                }
                return ((score / maxScore) * 100).toFixed(1) + '%';
            })
        }
    ]
};
```

Use this form whenever the transform requires branching, helper calls, or anything that cannot be expressed cleanly as a single expression string.

---

### Cross-Broker binding

**Cross-broker binding with `@`:**

Append `@broker` inside any binder string to subscribe to a key on a different broker instead of the local one.

```javascript jaml-playground
export default [
    {
        type: 'container',
        broker: 'shared',
        vars: { count: 0 },
        components: [{ type: 'input-number', cap: 'Shared Count', value: '{{count}}', placeholder: 'Enter count' }]
    },
    {
        type: 'container',
        components: [
            {
                type: 'indicator',
                cap: 'Shared Counter',
                value: '{{count@shared}}' // reads "count" from broker "shared"
            }
        ]
    }
];
```

Multi-key binders (expression binders, expression binders, and `jaml.var()`) can mix keys from **different brokers** in a single expression. Each `key@broker` pair subscribes to its own broker independently — the binder re-evaluates whenever any of them changes.

```javascript jaml-playground
export default [
    {
        type: 'container',
        broker: 'shared',
        vars: { role: 'user' },
        components: [{ type: 'input', cap: 'Role (shared)', value: '{{role}}', placeholder: 'Enter role' }]
    },
    {
        type: 'container',
        broker: 'milo',
        components: [{ type: 'input', cap: 'Plan (milo)', value: '{{plan}}', placeholder: 'Enter plan' }]
    },
    {
        type: 'container',
        components: [
            {
                type: 'indicator',
                cap: 'Access',
                // multi-placeholder: re-evaluates when "role" on "shared" OR "plan" on "milo" changes
                value: '{{role@shared}} + " / " + ({{plan@milo}} || "free")'
            }
        ]
    }
];
```

```javascript jaml-playground
export default [
    {
        type: 'container',
        broker: 'shared',
        vars: { online: false },
        components: [{ type: 'switch', cap: 'Online (shared)', valueKey: 'online' }]
    },
    {
        type: 'container',
        broker: 'milo',
        vars: { activated: false },
        components: [{ type: 'switch', cap: 'Activated (milo)', valueKey: 'activated' }]
    },
    {
        type: 'container',
        components: [
            {
                type: 'indicator',
                cap: 'Status',
                // jaml.var() — same multi-broker semantics
                value: jaml.var('online@shared', 'activated@milo', (online, activated) => {
                    return online && activated ? 'active' : 'inactive';
                })
            }
        ]
    }
];
```

Keys without an `@` suffix always subscribe to the local broker. Use `@scope` to target the nearest ancestor with `scopeBroker: true`. Local and cross-broker keys can be freely mixed in one binder.

---

### Compound binder object (recursive binding)

A plain object value can act as a **compound binder** — each leaf value can itself be any binder form. When _any_ bound key in the object changes, the entire object is re-evaluated and re-applied as a whole. This is designed for params that accept structured objects: `attrs`, `style` (the inline CSS object, not the `styles` array), `rules`, `states` and URL request objects.

```javascript jaml-playground
export default {
    type: 'container',
    vars: { user: { role: 'admin', status: 'active' }, theme: { bg: 'lightblue', fg: 'darkblue' } },
    components: [
        { type: 'input', cap: 'Role', value: '{{user.role}}', placeholder: 'Enter role' },
        { type: 'input', cap: 'Status', value: '{{user.status}}', placeholder: 'Enter status' },
        { type: 'input-color', cap: 'Background', value: '{{theme.bg}}' },
        { type: 'input-color', cap: 'Foreground', value: '{{theme.fg}}' },
        {
            type: 'label',
            cap: 'Inspect my DOM attributes and inline styles',
            attrs: {
                'data-role': '{{user.role}}',
                'data-status': '{{user.status}}'
            },
            style: {
                background: '{{theme.bg}}',
                color: '{{theme.fg}}'
            }
        }
    ]
};
```

```javascript jaml-playground
export default jaml.wrapper(
    { styles: [Styles.layout.autoalign] },
    [
        jaml.indicator('Orbit Spinner', {
            styles: [
                'css(position:relative;width:100%;height:10rem;border-radius:1rem)',
                'css(backgroundColor:{{bg}})',
                Styles.layer.spinner.orbit({
                    spin: '{{spin}}',
                    css: { aspectRatio: '1 / 1', width: 'auto', zIndex: 1 },
                    sphereColor: '{{fg}}',
                    duration: '{{duration}}',
                    sphereCount: '{{count}}'
                })
            ]
        }),
        jaml.input.number('Orbit Count', '{{count}}', { min: 0, unit: 'orbit(s)' }),
        jaml.input.number('Spin Duration', '{{duration}}', { min: 0, step: 500, unit: 'ms' }),
        jaml.switch('Spin Animation', '{{spin}}'),
        jaml.input.color('Sphere Color', '{{fg}}'),
        jaml.input.color('Background Color', '{{bg}}')
    ],
    {
        vars: {
            fg: jam.colorSet[2].css(),
            bg: jam.ac[3](1, 0.5, jam.lumiO(44)),
            duration: 2000,
            spin: true,
            count: 3
        }
    }
);
```

---

### String template fallback (not recommended)

If a string mixes literal text with `{{key}}` placeholders — e.g. `'abc{{foo}}def'` — the parser cannot evaluate it as a plain JS expression and falls back to resolving it as a template literal: `` '`abc${{{foo}}}def`' ``.

```javascript jaml-playground
export default {
    type: 'container',
    vars: { name: 'John' },
    components: [
        { type: 'input', cap: 'Name', value: '{{name}}', placeholder: 'Enter name' },
        {
            type: 'indicator',
            value: 'Hello {{name}}!'
            // resolved as: `Hello ${name}!`  →  "Hello John!"
        }
    ]
};
```

This works, but it is easy to write by accident and the fallback behaviour can be surprising. Prefer an explicit placeholder or expression binder instead.

---

### `jaml.pre()` — preserve a value from binding

If a string value legitimately contains `{{` and `}}` characters and must **not** be treated as a binder, wrap it with `jaml.pre()`. The parser skips binder detection for preserved values and passes them through as-is.

```typescript signature
jaml.pre(value: any): () => value
```

```javascript jaml-playground
export default {
    type: 'container',
    vars: { name: 'Alice', score: 100 },
    components: [
        { type: 'input', cap: 'Name', value: '{{name}}', placeholder: 'Enter name' },
        { type: 'input-number', cap: 'Score', value: '{{score}}', placeholder: 'Enter score' },
        // Without jaml.pre, this would be parsed as a binder for key "name"
        { type: 'indicator', cap: 'Binder', value: jaml.pre('{{name}}') },
        // Useful when passing a raw template string to a custom renderer
        { type: 'code', cap: 'Template string', value: jaml.pre('Hello {{name}}, your score is {{score}}'), lineWrapping: true }
    ]
};
```

`jaml.pre()` works with any value type — objects, arrays, numbers — not just strings. Any value wrapped in it is preserved verbatim and never inspected for binder syntax.

---

### `noBinder`

**Type:** `boolean`

Disable binder evaluation (`{{key}}`) for this component and its descendants. All strings containing `{{` and `}}` will be treated as literal text.

```javascript jaml-playground
export default {
    type: 'container',
    noBinder: true,
    components: [
        {
            type: 'code',
            // This is NOT evaluated as a binder; the brackets render literally.
            value: 'function hello() {\n  return "{{greeting}}";\n}'
        }
    ]
};
```

---

## Constraints & behavior notes

### Two-way binding is single-variable only

Two-way binding on the `value` param only activates for a **single** variable binder (`'{{key}}'`). Placeholder binders, expression binders, and `jaml.var()` with a transform function are **one-way** — the element displays the computed value but does not publish back on change.

```javascript
// Two-way: element reads AND writes back to "name"
value: '{{name}}'

// One-way: element displays the result but never publishes back
value: '{{ firstName + " " + lastName }}'
```

### Expression binders only detect top-level keys

Inside an expression binder `'{{ expression }}'`, the parser scans for identifier names and checks them against top-level `vars` keys. Dot-paths like `user.name` are treated as `user` (the top-level key) with a `.name` property access — only `user` is subscribed. Changing a nested property without replacing the parent object reference may not trigger re-evaluation.

```javascript
vars: { user: { name: 'Alice' } }

// Subscribes to "user" (the object reference).
// Changing user.name directly may not trigger a re-eval.
value: '{{ user.name.toUpperCase() }}'

// To reliably watch nested changes, reference the exact key directly:
value: '{{user.name}}'
```

### `init: 'sync'` skips replay from persistent brokers

When a watcher has `init: 'sync'` and the key exists at subscription time, the callback fires immediately. After that first fire, any subsequent `State.initial` events (e.g. from `milo` replaying stored data on page load) are **skipped**. This prevents double-firing when using persistent brokers. Use `init: true` (the default) if you want the watcher to react to every value including replayed initial state.

### `valueKey` with `@scope` searches the DOM

When `valueKey` uses `@scope`, the system walks up the DOM tree to find the nearest ancestor element with a `scopeBroker: true` model. It looks for the `[broker]` attribute on elements that have a `.model` property. This is different from the binder `@scope` syntax which resolves through the component tree — `valueKey@scope` resolves through the **rendered DOM**.

### Compound binder re-evaluates atomically

When any leaf key in a compound binder object changes, the **entire** top-level object is rebuilt with fresh values. This means all sibling leaf values are recalculated together, not just the one that changed. For expensive computations, consider splitting into separate binders.

### Template literal binders

Template literals with embedded expressions work inside binders. Use backtick syntax `` `{{ ... }}` `` for string interpolation with expressions:

```javascript
// Embed a reactive value inside a template literal
value: '{{ `User ${user.name} has score ${score}` }}'

// Works with expressions too
cap: '{{ `Total: $${(price * quantity).toFixed(2)}` }}'
```

### Fallback / default value expressions

Use `||` or ternary operators for fallback values when a key might be undefined:

```javascript
// Fallback to another key
cap: '{{name || fallbackName}}'

// Fallback to a literal
value: '{{count || 0}}'

// Ternary
state: '{{score > 50 ? "pass" : "fail"}}'
```

### Array index access

Brackets `[n]` and dot notation `.n` both work for array index access:

```javascript
// Dot notation (numeric index)
value: '{{items.0}}'        // first element

// Bracket notation
value: '{{items[2]}}'       // third element

// Works inside expressions too
cap: '{{ items[selected] }}'
```

### Binders inside `vars`

A `vars` value can itself be a binder string referencing another key. This creates a reactive alias:

```javascript jaml-playground
export default {
  type: 'container',
  vars: {
    primary: '{{theme.accent}}',    // aliases theme.accent
    theme: { accent: 'blue' }
  },
  components: [
    { type: 'input-color', cap: 'Accent', value: '{{theme.accent}}' },
    { type: 'indicator', cap: 'Primary', value: '{{primary}}' }
  ]
}
```

> **Note:** Be careful with circular references — a key referencing itself causes an infinite loop.

---

## `this` context in watchers and brokers

Inside **watcher callbacks**, `this` refers to the **element** (same as element hooks). For other lifecycle hooks the context varies — see [JAML Format Reference](./jaml-format.md#this-context-reference) for the full table.

Easy access of the element's properties:

| Reference    | Points to    | Notes                                          |
| ------------ | ------------ | ---------------------------------------------- |
| `this.cmpt`  | Component    | The component that built this element          |
| `this.model` | Root Model   | Always the root `Model` instance               |
| `this.ref`   | Ref map      | Shortcut to component's `ref` map              |
| `this.vars`  | Vars proxy   | Shortcut to `this.model.vars`                  |
| `this.props` | Props object | The static `props` constants of this component |
| `this.shared`| Shared proxy | Upward-looking proxy for nearest `share: true` ancestor |
