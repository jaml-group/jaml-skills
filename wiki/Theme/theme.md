# Theme

A JAML theme combines semantic roles, token values, and stylesheet recipes. Page authors describe what each region does; the theme selects its appearance using role, variant, parent context, and state.

```text
element type + stylize + variant + parent context + state
    -> native/theme recipe -> token values -> rendered appearance

authoring ref -> registered sys / cmpt / chart
    -> active Tokens and CSS variables; chart values cook per element
```

## For Theme Authors

This page routes theme concerns to their owning references. Open only the pages the task needs:

| Question | Owning reference |
|---|---|
| Which role describes this region? How does a variant work? | [Stylize](./stylize.md) |
| Where do roles sit on a page? | [Stylize Wireframes](./stylize-wireframes.md) |
| Is this an authoring primitive, system token, component token, or chart recipe? | [Tokens](./tokens.md) |
| How do values adapt to mode, accent, and background? | [Theme Color](./color.md), [Color System](../color.md) |
| How do JavaScript style selectors differ from SCSS? | [Stylesheets](./stylesheets.md) |
| How should design import/export address a visual declaration? | [Recipe](./recipe.md) |
| How is a theme packaged and registered? | [Structure](./structure.md) |
| How do I implement and review a complete theme? | [Authoring](./authoring.md) |

## Docs

The table above is the theme topic map. The [JAML reference map](../index.md) covers elements, bindings, styles, and plugins outside theme authoring.

## Theme-Adaptive JAML

Choose a semantic role, then add the public style that owns any deliberate local treatment. This panel uses native token-backed recipes:

```json jaml-playground
{
    "type": "container",
    "stylize": "panel",
    "styles": ["border(radius:m)", "border.subtle", "border.s", "color.default", "with.elevation", "shadow.s"],
    "components": [{ "type": "label", "cap": "Theme-aware panel" }]
}
```

Read [role and plugin composition](./stylize.md#runtime-stylize-variant-and-style-plugins) before choosing a visual treatment. [Token consumption](./tokens.md#consuming-tokens) covers JavaScript, JAML CSS, and SCSS. [Adaptive color APIs](../color.md) own color construction and foreground contrast rules.

When combining a semantic border and a width preset, put the semantic border first because it supplies a default width. `with.elevation` selects the surface treatment; `shadow.*` adds depth.

## Theme Style Variants

Both `stylize: "list-legend"` and `stylize: "list", variant: "legend"` select the same role variant. See [Stylize](./stylize.md) for the runtime contract and [Variant Selectors](./stylesheets.md#variant-selectors) for theme recipes. The theme must supply that alternate recipe for it to have a distinct appearance.

## Layers

[Tokens](./tokens.md) owns the layer model and registration contract. `ref` is authoring data; `sys` and minimal `cmpt` supply runtime values; `chart` is cooked for the chart element. [Recipe paths](./recipe.md) are design-time addresses compiled into stylesheet declarations.

## Current Model

A theme owns its folder and imports shared authoring foundations only where needed. See [Structure](./structure.md) for module and swatch composition and [mode overrides](./tokens.md#mode-specific-overrides) for light/dark values.

## Design Spec Adoption Policy

Use external design systems, Figma inventories, and component tables as vocabulary and coverage checks. Translate their useful semantic concepts into the owning JAML layer. They do not replace JAML role semantics or require a parallel runtime token tree. Import/export grammar belongs to [Recipe](./recipe.md).

## Stylize And Recipes

[Stylize](./stylize.md) owns role meaning, nearby choices, and parent-child responsibility. [Stylesheets](./stylesheets.md) owns selector policy, contextual colors, states, and optical recipes. Keep those definitions in their owning pages when adding an alternate theme.

## Prime Rules

Follow the [four governing authoring rules](./authoring.md#four-governing-rules), then use the [theme checklist](./authoring.md#theme-complete-checklist). A design contract and a currently implemented base recipe are separate evidence; [runtime role coverage](./stylize.md#runtime-contract) identifies that boundary.

## Decision Rule

Use the [token ownership table](./tokens.md) to place a value and the [stylesheet boundary](./stylesheets.md#static-css-vs-runtime-style-plugins) to place behavior. Keep application state in JAML and its model.

Changing the accent or color set in the theme panel clears the swatch selection marker. Selecting a swatch again reapplies its choices. See [system theme integration](../color.md#system-theme-and-saved-choices) for persistence and the System accent choice.
