# common.trait

Element-scoped `*.is.*` plus `Styles.with.*`, `Styles.no(...)`, and `Styles.on.*` — semantic class helpers used by the runtime style and theme systems.

Traits are named visual or structural roles. Use them when the class is part of a shared styling vocabulary, not as a one-off selector. For arbitrary class names and custom descendant rules, use [common.clazz](./clazz.md).

---

## Variants

### `is`

Adds an identity trait. Use it under an element or slot style namespace. `is(type)` composes the supplied type with the parent style path, e.g. `button.is(action)` adds `jam-action-button`.

Element-scoped preset path:

| Path | Class |
|---|---|
| `label.is.subgrid` | `jam-subgrid` |

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Grid item",
        "styles": ["label.is.subgrid"]
    }
]
```

### `with`

Adds a positive treatment trait. Generic `with(type)` adds `jam-with-{type}`; preset paths use the framework treatment names.

| Path | Class |
|---|---|
| `with.accent` | `jam-bg-accent` |
| `with.tint` | `jam-bg-tint` |
| `with.elevation` | `jam-bg-elevated` |

```json jaml-playground
[
    {
        "type": "badge",
        "cap": "Live",
        "content": "Online",
        "styles": ["with.accent"]
    }
]
```

### `no`

Adds a negative trait as `jam-no-{type}`. It is available both as `Styles.no(type)` and through common element and slot style namespaces, for example `button.no(icon)` or `cap.no(wrap)`.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `type` | `string` | Trait name | Shorthand |

```json jaml-playground
[
    {
        "type": "button",
        "cap": "Text only",
        "styles": ["button.no(icon)"]
    }
]
```

### `on`

Declares the surface context an element is rendered on. Generic `on(type)` adds `jam-on-{type}`; preset paths configure the framework's foreground color profile for common contexts.

| Path | Class |
|---|---|
| `on.accent` | `jam-on-accent` |
| `on.light` | `jam-on-light` |
| `on.dark` | `jam-on-dark` |

| Arg | Type | Description | Notes |
|---|---|---|---|
| `type` | `string` | Surface context name | Shorthand for `on(type)` |

```json jaml-playground
[
    {
        "type": "card",
        "cap": "On primary",
        "styles": [
            "background(color:var(--jam-color-primary-default))",
            "on.accent"
        ]
    }
]
```

---

## Theme recipe traits

Runtime trait helpers produce `jam-*` classes. Theme recipe traits use the same vocabulary, but recipe paths declare traits on a node with `-[trait]`, such as `button-withacbg.backgroundColor`. See [Theme Recipe](../../Theme/recipe.md#nodes) for the import/export grammar.
