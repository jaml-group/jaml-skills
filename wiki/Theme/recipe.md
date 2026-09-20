# Recipe

A recipe is a design-time address for a style target.

It lets Design, Engineering, tools, and agents refer to the same place in a theme without sharing CSS selectors or DOM details.

```text
Figma variables
-> recipe paths
-> import/export tooling
-> theme stylesheets
-> runtime CSS
```

Recipes are not runtime tokens, CSS variables, or a new styling engine. They compile away before runtime.

## Quick Example

```text
button.default.hover.backgroundColor
```

means:

-   find the target `button`
-   with the default type, meaning no `type` attribute
-   when state is `hover`
-   set `backgroundColor`

At import time this can compile to:

```scss
.jam-button-style:not([type]):hover {
    background-color: var(--jam-color-primary-film);
}
```

The recipe says where the value belongs. In design handoff, the value may point to runtime `sys`/minimal `cmpt` tokens or an authoring `ref` path that import tooling resolves before runtime.

## Path Shape

Recipe paths are dot-separated:

```text
node[.node-or-type-or-state*].cssProperty
node[.node-or-type-or-state*].compositeProperty.part
```

Each segment before the final CSS property or composite part is recognized from enumerable vocabulary:

-   `node`: a role, element, or element-child target, optionally with a predefined `-[trait]`
-   `type`: an element type value
-   `state`: a `CSSStates` key
-   `cssProperty`: the final camelCase CSS property
-   `compositeProperty.part`: an approved Figma-split property part, such as `gradient.color1` or `shadow.blur`

The importer decides what each segment means from enumerable vocabulary. If a segment could mean more than one thing in the current context, validation must fail instead of guessing.

Good:

```text
button.default.backgroundColor
button.backgroundColor
button-withacbg.backgroundColor
tile.table.td.lineHeight
tile.table-stripy.td-odd.backgroundColor
card.gradient.color1
card.shadow.blur
```

Avoid:

```text
button.default.background.color
button.bg
tile.table.tr:nth-child(odd).td.backgroundColor
button.withacbg.backgroundColor
```

Recipes are semantic paths, not CSS selectors.

## Nodes

A node is a target the importer can recognize. Nodes come from three vocabularies:

-   role nodes: including `app`, `main`, `sidebar`, `nav`, `panel`, `tile`, etc., translated to `.jam-[stylize]-style`
-   element nodes: element tag names without the leading `jam-`
-   element-child nodes: slots, parts, or predefined child classes inside an element

```text
tile
sidebar
nav
indicator
cap
icon
td
```

Nodes compile to the matching role or element selector:

```text
tile -> .jam-tile-style
sidebar -> .jam-sidebar-style
indicator -> jam-indicator
```

Element nodes use the tag name without the leading `jam-` in the recipe:

```text
indicator -> jam-indicator
table -> jam-table
```

When a role and element share the same name, the role node wins. These names currently include `button`, `card`, `wrapper`, and `container`. For example, `button` compiles to `.jam-button-style`, not `jam-button`.

Element-child nodes are resolved in the context of their parent element. For example, an indicator `cap` slot compiles to `[slot='cap']`:

```text
tile.indicator.cap.fontWeight
```

compiles as:

```scss
.jam-tile-style > jam-indicator > [slot='cap'] {
    font-weight: [resolved token];
}
```

A node may include a predefined trait with `-[trait]`.

```text
button-withacbg
indicator-withacshade
wrapper-withdivider
table-stripy
table-gridline
td-odd
td-even
```

Traits cannot be path segments by themselves:

```text
button.withacbg.backgroundColor
```

Use the role or element plus the trait:

```text
button-withacbg.backgroundColor
tile.table-stripy.td-odd.backgroundColor
```

Those compile as:

```scss
.jam-button-style.jam-with-acbg {
    background-color: [resolved token];
}

.jam-tile-style > jam-table.jam-stripy > .jam-td[pos*='odd'] {
    background-color: [resolved token];
}
```

Traits are shared design/build vocabulary. They are not arbitrary strings.

Keep traits small and intentional. If a path starts growing like this, the model probably needs a clearer node, type, state, or stylesheet rule:

```text
button-withacbg-compact-interactive-bordered.backgroundColor
```

A path without a type or state applies broadly to that node:

```text
button.backgroundColor
```

compiles as:

```scss
.jam-button-style {
    background-color: [resolved token];
}
```

That means it affects default, typed, and traited buttons unless a more specific recipe overrides it.

## Types

A type segment targets an element's `type` attribute.

```text
button.ghost.backgroundColor
```

compiles as:

```scss
.jam-button-style[type='ghost'] {
    background-color: [resolved token];
}
```

The special type `default` means "no `type` attribute":

```text
button.default.backgroundColor
```

compiles as:

```scss
.jam-button-style:not([type]) {
    background-color: [resolved token];
}
```

Only write `default` when the design intentionally targets the default type. If the path should affect every type, omit the type segment:

```text
button.backgroundColor
```

Known type values are enumerable by element. Examples:

```text
button.default
button.ghost
button.fab
button.outline
buttongroup.ghostradio
buttongroup.outlinecheckbox
option.radio
option.checkbox
input.number
input.code
input.color
input.range
```

## States

A state segment targets a supported `CSSStates` key.

```text
button.default.hover.backgroundColor
```

compiles as:

```scss
.jam-button-style:not([type]):hover {
    background-color: [resolved token];
}
```

Supported states:

```text
before
after
hover
active
focus
disabled
indeterminate
checked
```

Do not document or import unsupported states such as `selected`, `open`, or `loading`.

## Properties

Normal recipe paths end with a CSS property in camelCase:

```text
backgroundColor
lineHeight
borderRadius
gridTemplateColumns
```

Do not split or rename CSS properties:

```text
background.color
bg
radius
```

### Figma-Split Composite Properties

Figma cannot represent some CSS shorthand values as a single variable. For those values, recipes use fixed composite parts instead of arbitrary nested property names.

Gradient parts:

```text
gradient.type
gradient.color1
gradient.color2
```

`gradient.type` accepts `linear` or `radial`. If no type is provided, import treats it as `linear`.

Shadow parts:

```text
shadow.x
shadow.y
shadow.blur
shadow.spread
shadow.inset
```

`shadow.inset` is boolean-like. `true` means inset; omitted or false means normal outer shadow.

Text shadow parts:

```text
textShadow.x
textShadow.y
textShadow.blur
```

These are the only approved split property groups. They exist for Figma import/export only. The importer must recompose them into real generated CSS before runtime.

Generated CSS chooses the real declaration target, such as `background-image` for `gradient`, `box-shadow` for `shadow`, and `text-shadow` for `textShadow`.

## Value References

A recipe path usually maps to a runtime token reference or an authoring reference path. Fixed enum or boolean parts, such as `gradient.type` and `shadow.inset`, may use their structured value directly. Shadow `x`/`y`/`blur` parts use absolute `ref.shadow` geometry; text-shadow parts use `relX`/`relY`/`relBlur`. Recipe-only `shadow.spread` remains valid import data even though the normalized authoring ref has no spread scale. The generated stylesheet owns the final shorthand composition and resolves every `ref` path before runtime.

```json
{
    "button.default.backgroundColor": "sys.color.surface.default",
    "button.default.hover.backgroundColor": "sys.color.primary.film",
    "button-withacbg.backgroundColor": "sys.color.primary.default",
    "card.gradient.type": "linear",
    "card.gradient.color1": "sys.color.surface.default",
    "card.gradient.color2": "sys.color.elevated.default",
    "card.shadow.x": "ref.shadow.x[5]",
    "card.shadow.y": "ref.shadow.y[5]",
    "card.shadow.blur": "ref.shadow.blur[0]",
    "card.shadow.spread": "0rem",
    "card.shadow.inset": false,
    "label.textShadow.x": "ref.shadow.relX[0]",
    "label.textShadow.y": "ref.shadow.relY[1]",
    "label.textShadow.blur": "ref.shadow.relBlur[2]"
}
```

Use runtime token references for reusable decisions:

```text
sys.color.primary.film
sys.space.m
cmpt.input.borderRadius
```

Use authoring reference paths for stable source primitives:

```text
ref.border.radius[4]
ref.shadow.blur[0]
```

Import tooling must replace those `ref` paths with their resolved values or generated declarations; they never become runtime `Tokens.ref` entries or `--jam-ref-*` properties.

Design handoff should not use raw CSS literals as ordinary recipe values. Keep one-off mechanics in generated stylesheet CSS, and do not turn every imported recipe value into `cmpt` or `--jam-recipe-*`. Fixed structural parts such as `linear`, `radial`, `true`, or `false` may remain direct values. `shadow.spread` may use a direct import value such as `0rem`; the other shadow and text-shadow geometry parts should use normalized `ref.shadow` primitives when one fits.

## Figma Handoff

Figma may organize variables however the design team prefers, but export must resolve each design value to one canonical recipe path.

Designers can read a recipe like a folder tree. This is only a teaching view; the real recipe path remains dot-separated.

```text
button.default.hover.backgroundColor
```

can be read as:

```text
button/
  backgroundColor
  default/
    hover/
      backgroundColor
  fab/
    backgroundColor
    hover/
      backgroundColor
  outline/
    backgroundColor
    hover/
      backgroundColor
```

`default` is an explicit type target. It means the element has no `type` attribute.

This difference matters:

| Recipe                           | Meaning                                                                              | Import target                       |
| -------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------- |
| `button.backgroundColor`         | all buttons, including default, `fab`, `cta`, `outline`, and any other typed buttons | `.jam-button-style`                 |
| `button.default.backgroundColor` | default buttons only, meaning buttons with no `type`                                 | `.jam-button-style:not([type])`     |
| `button.fab.backgroundColor`     | `fab` buttons only                                                                   | `.jam-button-style[type='fab']`     |
| `button.outline.backgroundColor` | `outline` buttons only                                                               | `.jam-button-style[type='outline']` |

| Recipe                                 | Value                        | Notes                                |
| -------------------------------------- | ---------------------------- | ------------------------------------ |
| `button.default.backgroundColor`       | `sys.color.surface.default`  | Default button background            |
| `button.default.hover.backgroundColor` | `sys.color.primary.film`     | Default button hover background      |
| `button.backgroundColor`               | `sys.color.surface.default`  | All button backgrounds               |
| `button-withacbg.backgroundColor`      | `sys.color.primary.default`  | Button with accent background helper |
| `card.gradient.color1`                 | `sys.color.surface.default`  | First gradient color                 |
| `card.gradient.color2`                 | `sys.color.elevated.default` | Second gradient color                |
| `card.shadow.blur`                     | `ref.shadow.blur[0]`         | Shadow blur part                     |

This lets Engineering import values without interpreting screenshots or Figma grouping.

## Import/Export Tooling

Import/export tooling knows selector details. Designers and runtime do not.

Before compiling a recipe, the importer must resolve each segment against enumerable vocabulary:

-   roles and elements
-   element-child targets, such as slots, parts, and predefined child classes
-   element `type` values
-   `CSSStates`
-   nodes with predefined `-[trait]`
-   CSS properties
-   approved composite property parts for `gradient`, `shadow`, and `textShadow`

The importer should use explicit recognizers for these categories. Do not infer meaning from string shape when the vocabulary can identify the segment.

Runtime receives only the generated stylesheet.

### Fixed Selector Rules

Broad node:

```text
button.backgroundColor -> .jam-button-style
```

Default type:

```text
button.default.backgroundColor -> .jam-button-style:not([type])
```

Named type:

```text
button.ghost.backgroundColor -> .jam-button-style[type='ghost']
input.range.backgroundColor -> jam-input[type='range']
```

State:

```text
button.default.hover.backgroundColor -> .jam-button-style:not([type]):hover
```

Class-backed trait:

```text
button-withacbg -> .jam-button-style.jam-with-acbg
button-withacshade -> .jam-button-style.jam-with-acshade
button-noicon.cap -> .jam-button-style.jam-no-icon > [slot='cap']
```

Compact `with` / `no` trait names add a dash after the prefix:

```text
withbg -> .jam-with-bg
withacshade -> .jam-with-acshade
nobg -> .jam-no-bg
noicon -> .jam-no-icon
```

Position traits use attributes:

```text
td-left -> .jam-td[pos*=left]
td-odd -> .jam-td[pos*=odd]
td-even -> .jam-td[pos*=even]
```

These are importer/exporter rules only. Recipe authors should not need to memorize selector output.

## Validation Rules

Fail loudly for:

-   unknown roles, elements, slots, parts, traits, states, types, or properties
-   trait-only path segments, such as `button.withacbg.backgroundColor`
-   ambiguous segments that could be read as more than one category
-   unsupported value references
-   unknown composite property parts
-   duplicate paths
-   ambiguous trait ordering
-   paths that cannot compile to a real selector and declaration

Recipe override behavior must be deterministic. Broader paths resolve before more specific paths:

```text
button.backgroundColor
button.default.backgroundColor
button.default.hover.backgroundColor
```

## Naming Stability

Recipe names become shared language. Renaming a node, type, state, or trait can affect Figma variables, recipe files, import/export mappings, generated stylesheets, docs, and agents.

Treat renames as migrations. Keep aliases or migration maps when needed.

## Belongs Elsewhere

Use recipes only for design/build handoff addresses.

Use `stylize` for runtime semantic roles:

```json
{
    "type": "container",
    "stylize": "sidebar"
}
```

Use `sys` for theme/swatch decisions, authoring-only `ref` for stable primitives, and minimal `cmpt` for reused component values. Resolve `ref` before runtime registration.

Use theme stylesheets for selector logic, layout, visual recipes, slots, parts, and CSS mechanics.

## Success Criteria

Recipes are working if:

-   designers and engineers can discuss theme targets using the same path.
-   imports and exports do not require guessing visual intent.
-   agents can make deterministic theme edits by looking up paths.
-   runtime stays free of recipe parsing and recipe variables.
