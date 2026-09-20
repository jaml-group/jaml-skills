# JAML reference map

Start here when writing, explaining, or diagnosing JAML. These documents are shared by people, the documentation viewer, and the `jaml` skill. Each contract has an owning page; topic indexes point to it.

## What the layers do

| Concept | What it owns | Read when |
|---|---|---|
| JAML component | A declarative tree, model, bindings, conditions, and lifecycle | [JAML Format](./JAML/jaml-format.md) for structure; [Binders](./JAML/binder.md) for state; [Component API](./JAML/component.md) for JavaScript builders |
| Element `type` | The concrete control, inherited parameters, slots, and events | [Element catalog](./JAM-UI/JAM-UI.md), then the selected element page |
| `stylize` and `variant` | Semantic presentation responsibility and an alternate theme recipe | [Roles](./Theme/stylize.md), including nearby role choices and parent context |
| Singular `style` | Local CSS declarations, with supported token shorthands | [CSS](./Styles/common/css.md) |
| Plural `styles` | Ordered, removable styles and the behavior they attach | [Styles](./Styles/styles.md) and the selected style page |
| `plugins` | Explicit behavior attached through the `Plugins` registry | [Plugin selection and lifecycle](./Plugins/plugins.md) |
| Theme tokens | Values consumed by native and theme recipes | [Tokens](./Theme/tokens.md) for authoring, runtime paths, and modes |
| Theme stylesheet | Selectors, layout, states, and visual recipes | [Theme](./Theme/theme.md), then [Stylesheets](./Theme/stylesheets.md) |
| `jam.*` APIs | Imperative rendering, utilities, and runtime operations | [Utilities](./utils.md); [Color System](./color.md) for color functions |

## Choose the owner before the API

1. Select the element that owns the behavior and check its inheritance. An input's `value` contract does not make `value` a parameter of every element.
2. Give structural regions their [semantic roles](./Theme/stylize.md#common-choices). Use the active theme's `variant` only for a supported alternate recipe.
3. Use a public style when it already owns the requested appearance or interaction. For example, moving a card uses `interact.movable`; sorting children uses `interact.sortable`. See the [plugin decision table](./Plugins/plugins.md#choose-an-entry-point).
4. Use token-backed styles for theme decisions. [Tokens](./Theme/tokens.md#consuming-tokens) explains which paths work in JavaScript, JAML CSS, and SCSS.
5. Add an explicit plugin or imperative engine only when its lifecycle or application API is needed. Read its owning page before combining it with a style that installs the same behavior.

## Agent workflow

For a new page, read [Tutorial](./tutorial.md), JAML Format, and only the element/style/plugin pages the task needs. For theme work, start at [Theme](./Theme/theme.md). For a correction, follow the owning reference back to its implementation rather than copying a similar example.

Verify examples in layers:

- **Static syntax:** JSON/JavaScript must parse. A `jaml-playground` or `jaml-result` fence is a complete example; API signatures and partial dictionaries use ordinary fences.
- **Static semantics:** use the current source registry to check types, inherited parameters, style paths, and arguments. Dynamic builders and open argument dictionaries can exceed static metadata; investigate a diagnostic before accepting or rejecting the code.
- **Runtime:** check rendered structure and nonzero geometry, exercise the important interaction, then inspect resulting state and diagnostics. A static pass does not prove visibility, resource loading, or lifecycle behavior.

## Trust and application data

JAML definitions, handlers, binding expressions and external plugin modules are trusted application code. Keep user-provided values in data/model fields; never concatenate them into executable definitions, expressions or module locations. Markdown dialect selection is not sanitization: raw HTML and executable playground directives need an application-owned content policy. See [Markdown](Plugins/markdown.md).

## Maintaining this corpus

Update the owning contract first. Related pages should link to it and keep only the examples needed for their own task. Search for repeated claims and obsolete API names after a correction. Report behavior against the installed runtime version; distinguish static validation from live evidence.
