# common.trait

<!-- Generated from native authoring; do not edit. -->

[中文](trait.zh.md)

Element-scoped `*.is.*` plus `Styles.with.*`, `Styles.no(...)`, and `Styles.on.*` — semantic class helpers used by the runtime style and theme systems.

Traits are named visual or structural roles. Use them when the class is part of a shared styling vocabulary, not as a one-off selector. For arbitrary class names and custom descendant rules, use [common.clazz](./clazz.md).

---

## Variants

### `is`

<a id="entry-is"></a>

Apply a type class

Apply a named framework trait for the target selected by the path.

Builds a trait class by appending the path segment immediately before is to the type argument. Nested paths therefore produce a target-specific class.

A matching stylesheet must implement the resulting class.

The root is path has no preceding segment and currently produces a jam-{type}-undefined class. Use clazz for an explicit class name when no target-specific suffix is intended. A matching stylesheet must implement the resulting class; this does not create component behavior.

Positional order: `type`.

| Argument | Type | Contract |
| --- | --- | --- |
| `type` | `string` | Type<br>Shorthand |

Adds an identity trait. Use it under an element or slot style namespace. `is(type)` composes the supplied type with the parent style path, e.g. `button.is(action)` adds `jam-action-button`.

Element-scoped preset path:

| Path               | Class         |
| ------------------ | ------------- |
| `label.is.subgrid` | `jam-subgrid` |

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Grid item',
        styles: ['label.is.subgrid']
    }
];
```

### `with`

<a id="entry-with"></a>

Apply a with-* class

Apply the named with trait to the selected target.

Builds a jam-with- class from the type argument.

The target stylesheet must implement that specific trait.

Arbitrary names do not create behavior; use a dedicated preset when its concrete appearance or lifecycle matters.

Positional order: `type`.

| Argument | Type | Contract |
| --- | --- | --- |
| `type` | `string` | Type<br>Shorthand |

Adds a positive treatment trait. Generic `with(type)` adds `jam-with-{type}`; preset paths use the framework treatment names.

| Path             | Class             |
| ---------------- | ----------------- |
| `with.accent`    | `jam-bg-accent`   |
| `with.tint`      | `jam-bg-tint`     |
| `with.elevation` | `jam-bg-elevated` |

```javascript jaml-playground
export default [
    {
        type: 'badge',
        cap: 'Live',
        content: 'Online',
        styles: ['with.accent']
    }
];
```

### `no`

<a id="entry-no"></a>

Apply a no-* class

Apply the named no trait to the selected target.

Builds a jam-no- class from the type argument.

The target stylesheet must implement that specific trait.

Arbitrary names do not create behavior; use a dedicated preset when its concrete appearance or lifecycle matters.

Positional order: `type`.

| Argument | Type | Contract |
| --- | --- | --- |
| `type` | `string` | Type<br>Shorthand |

Adds a negative trait as `jam-no-{type}`. It is available both as `Styles.no(type)` and through common element and slot style namespaces, for example `button.no(icon)` or `cap.no(wrap)`.

```javascript jaml-playground
export default [
    {
        type: 'button',
        cap: 'Text only',
        styles: ['button.no(icon)']
    }
];
```

### `on`

<a id="entry-on"></a>

Apply an on-* class

Apply the named on trait to the selected target.

Builds a jam-on- class from the type argument.

The target stylesheet must implement that specific trait.

Arbitrary names do not create behavior; use a dedicated preset when its concrete appearance or lifecycle matters.

Positional order: `type`.

| Argument | Type | Contract |
| --- | --- | --- |
| `type` | `string` | Type<br>Shorthand |

Declares the surface context an element is rendered on. Generic `on(type)` adds `jam-on-{type}`; preset paths configure the framework's foreground color profile for common contexts.

| Path        | Class           |
| ----------- | --------------- |
| `on.accent` | `jam-on-accent` |
| `on.light`  | `jam-on-light`  |
| `on.dark`   | `jam-on-dark`   |

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'On primary',
        styles: ['background(color:var(--jam-color-primary-default))', 'on.accent']
    }
];
```

---

## Theme recipe traits

Runtime trait helpers produce `jam-*` classes. Theme recipe traits use the same vocabulary, but recipe paths declare traits on a node with `-[trait]`, such as `button-withacbg.backgroundColor`. See [Theme Recipe](../../Theme/recipe.md#nodes) for the import/export grammar.

## `is.subgrid`

<a id="entry-is-subgrid"></a>

Subgrid

Mark a child as a participant in the framework subgrid layout.

Adds jam-subgrid; the layout-subgrid stylesheet gives it grid display and a column span using the configured subgrid column count.

Use under a layout.subgrid owner that supplies the column count.

The marker alone does not establish the parent grid or supply the column count.
