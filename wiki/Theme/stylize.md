# Theme Stylize

JAML elements use the runtime `stylize` key to designate a presentation profile. Most author-facing profiles are semantic roles; framework renderers also use the specialized `markdown` and `json` profiles. Use `none` when an element must opt out of profile-class styling.

```json
{
    "type": "container",
    "stylize": "sidebar"
}
```

Runtime profiles are represented by a `jam-[stylize]-style` class and participate in external style lookup. `stylize: "none"` suppresses that profile class.

`stylize` expresses element identity, semantic context, or a framework-owned renderer profile. Native `variant` selects an alternate theme recipe for that same identity or context. Ad hoc visual treatments belong in `styles`, not new `stylize` names.

Assign a semantic role when an element has a stable responsibility in app structure, content composition, or interaction. A role may also establish the stable selector boundary through which themes refine that responsibility. Mechanical layout can retain the element's normal identity and use local layout styles.

The compact form `stylize: "list-legend"` is equivalent to `stylize: "list"` plus `variant: "legend"`. Both are valid authoring forms: use the compact form when the role and alternate recipe read clearly together, and use separate keys when the variant is computed or bound independently. At runtime, both forms emit `class="jam-list-style"` and `jam-variant="legend"`. A stylize role name itself therefore cannot contain `-`; the first hyphen starts the variant value.

For a placement-based visual reference, see [Stylize Wireframes](./stylize-wireframes.md).

## Runtime Contract

A role selects a semantic presentation profile. A hyphenated role also selects its variant through `jam-variant`. Registered theme selectors can match element types, roles and variants.

During connection, profile-class eligibility depends on the parent: direct children of the body, `container`, `card`, or `wrapper` can receive it; `button` and `tag` identities are eligible independently, and `item` is also supported directly beneath `map` and `calendar`. Use the normal JAML containers when composing role regions. A role is not a recursive instruction to rename its children.

The semantic vocabulary is broader than the current base layout coverage: for example, `section` is a valid role and selector hook without a dedicated base rule, while `group` currently supplies positioning rather than a complete layout. Choose a documented layout style where arrangement matters. Assigning `modal` or `tooltip` provides presentation identity; use the popup APIs for overlay behavior.

The ownership guidance below is the authoring contract. It does not promise that a role alone supplies every layout or spacing choice. The current base `.jam-field-style` also shares control padding; themes should place intentional region insets on their content owner and inspect inherited defaults when overriding them.

## Mental Model

There are three levels to keep separate:

```text
fallback identity  -> what the element is when no richer semantic role is provided
container context  -> where children live
child identity     -> what a child means inside that context
```

For example:

```text
section  -> cohesive content region inside a surface
group    -> related content or controls inside that region
form     -> one data-editing context
field    -> one labelled compound value inside the form
list     -> repeated peer collection
item     -> one collection peer or coordinate-owned child
```

Inherited/container stylize is context. Explicit child stylize is identity. Context should not overwrite a child's explicit identity.

## Recommended Values

Use a small semantic vocabulary first. Element types normally supply their framework-owned fallback profile; semantic roles describe the responsibility an element has in the composition.

```text
app, header, footer, sidebar, nav, main
panel, tooltip, modal, tile, section
toolbar, form, group, field, actions
list, item
title
```

Framework-owned fallback and renderer profiles include:

```text
element, container, wrapper, input, button, label, tag, card, popup, divider, none
markdown, json
```

## Large-Scale JAML Authoring

When suggesting or authoring JAML at app, surface, form, or list scale, assign runtime `stylize` roles to the structural nodes first. Let the active theme resolve spacing, surfaces, density, color, and state recipes from those roles.

The JAML tree should expose a stable responsibility at each role boundary:

| Scale | Root role | Common child roles |
|---|---|---|
| App shell | `app` | `header`, `sidebar`, `main`, `footer` |
| Dashboard main | `main` | direct `tile` children, with optional view-level `nav` or `toolbar` |
| Content surface | `tile`, `type: 'card'`, `panel` | `section`, `nav`, `toolbar` |
| Content region | `section` | `group`, `list`, `form`, or direct content |
| Form | `form` | `group`, `field`, direct inputs, `list`, `actions` |
| Repeated collection | `list` | direct `item` children |
| Coordinate-aware collection | `type: 'map'` | direct `item` children |
| Date-coordinate collection | `type: 'calendar'` | direct `item` children |

A normal application shell has one `app` and one `main`. Its primary `header`, `sidebar`, and `footer` each appear at most once at app-shell scope. In a dashboard `main`, tiles form a flat set of direct children. When a card is also a dashboard unit, one node can express both responsibilities with `type: 'card'` and `stylize: 'tile'`.

Keep parent-child role chains visible in the JAML tree:

```text
app > header > toolbar > button
app > sidebar > nav
app > main > tile > section > group
tile > section > list > item
panel > section > form > group > field
map > item
calendar > item
```

Themes can then target predictable contexts and automatically take effect when the active theme changes.

The Load Dispatch dashboard tile demonstrates the adopted content structure:

```javascript
const loadDispatch = {
    type: 'card',
    stylize: 'tile',
    components: [
        {
            type: 'wrapper-vertical',
            stylize: 'section',
            components: [
                {
                    type: 'wrapper',
                    stylize: 'group',
                    components: [
                        { type: 'select', cap: 'Plant' },
                        { type: 'button-fab', icon: '⚡' },
                        { type: 'select', cap: 'Mode' },
                        { type: 'indicator', value: '72.4', unit: 'MW' }
                    ]
                },
                {
                    type: 'wrapper',
                    stylize: 'list',
                    components: [
                        {
                            type: 'indicator',
                            stylize: 'item',
                            cap: 'Shedding plan',
                            value: '8.5',
                            unit: 'MW'
                        }
                    ]
                }
            ]
        }
    ]
};
```

## Fallback And Element Identity

These describe what an element is before richer page context is considered.

- `element`: generic fallback for elements without a more specific semantic role.
- `button`: command button identity.
- `input`: input/control identity.
- `label`: text/label identity.
- `title`: prominent title text for app, header, sidebar, panel, card, tile, or section contexts.
- `tag`: compact badge, chip, status, or tag identity. `badge`, `label-tag`, and tags children use this style identity.
- `card`: card component identity.
- `none`: explicit opt-out when an element must not receive a `jam-*-style` profile class.

Use these as base coverage. A theme should still look acceptable when page authors do not set custom `stylize` values.

Framework-owned fallback profiles such as `element`, `container`, `wrapper`, `input`, `button`, `tag`, `card`, `popup`, and `divider` are normally selected through the element `type`. When the same element carries a structural responsibility, set `stylize` to that semantic role. For example, `{ type: 'card', stylize: 'tile' }` is a card component that occupies one dashboard tile.

### Built-in fallback profiles

These elements select a built-in profile when the page does not provide one:

| Element | Fallback `stylize` |
|---|---|
| `datepicker`, `input`, `progress`, `select`, `timepicker` | `input` |
| `locator` | `none` |

An explicit author-supplied `stylize` remains the page/theme contract.

## Renderer Profiles

These profiles are assigned by framework renderers to their structured output roots:

- `markdown`: Markdown document output produced by `jamd` or `jaml.md()`. It applies `.jam-markdown-style`.
- `json`: recursive JSON visualization produced by `jaml.json()`. It applies `.jam-json-style`.

Call the renderer helper instead of applying these profiles to arbitrary content. The corresponding styles depend on the document or JSON component structure the helper creates.

## App Structure

These describe page and app layout structure.

- `app`: top-level application surface. A normal application has one `app` root.
- `header`: primary app-level top structure, present zero or one time in a normal shell.
- `footer`: primary app-level bottom structure, present zero or one time in a normal shell.
- `sidebar`: primary persistent side area, present zero or one time in a normal shell.
- `nav`: navigation list, tabs, menu, breadcrumb, route picker, or table-of-contents-like structure. It can live in `header`, `sidebar`, `panel`, `main`, or a local `tile`.
- `main`: primary semantic document/work area. A normal application has one `main`.

## Surface Stylize Values

These describe content and auxiliary surfaces:

- `panel`: auxiliary work surface for a distinct task or context. It may be docked, slide-in, floating, movable, or resizable.
- `popup`, normally selected by `type: 'popup'`: interaction-positioned floating surface, such as a context menu, hint, small confirm, or transient progress surface.
- `tooltip`: compact informational or completion surface, separate from the richer popup element surface.
- `modal`: centered blocking overlay surface.
- `card`, normally selected by `type: 'card'`: portable content object with its own internal structure.
- `tile`: dashboard or bento grid unit. Tiles form a flat set of direct children in a dashboard `main`.

When a portable card also occupies a dashboard-grid position, use `type: 'card'` with `stylize: 'tile'`. A card placed inside a tile represents a distinct subordinate content object.

## Content Composition Values

These describe how content is organized within a surface:

- `section`: cohesive content region inside a `tile`, `card`, or `panel`. It may represent the surface's whole body or one of several regions, and may be named or unnamed.
- `group`: related, same-purpose content or controls. Its children may use different element types, and the group may be named or unnamed.

`section` establishes a content boundary that themes can treat consistently. `group` owns local arrangement, alignment, wrapping, and `gap` within that content. Prefer a flat composition; nested sections, groups, or lists represent a corresponding content or data hierarchy.

## Workload Stylize Values

These describe common content and interaction responsibilities:

- `toolbar`: dense command strip, especially for utility buttons in `header`, `panel`, `main`, or a local `tile`.
- `form`: one data-editing workflow or data model. It may contain direct inputs, groups, compound fields, supporting indicators or lists, and optional actions.
- `field`: one labelled compound logical value whose controls share label, help, error, validation, and value ownership.
- `actions`: command row/area, often containing buttons such as reset, clear, cancel, submit, confirm, or delete.
- `list`: repeated peer collection, typically generated with `buildFor`; static children are also valid.
- `item`: collection-peer or coordinate-owned child role. Under a `list` it identifies one repeated record; under a `map` or `calendar` it identifies a child positioned by the parent's coordinate system. The child may be a concrete element or a wrapper containing multiple elements.

`group`, `field`, and `actions` own arrangement and `gap`. A normal Jam-UI input already owns its cap, icon, helper/error presentation, and control buttons. Use `field` when multiple controls jointly represent one logical input value.

```json
{
    "type": "wrapper",
    "stylize": "field",
    "components": [
        { "type": "label", "cap": "Active window" },
        { "type": "timepicker", "cap": "Start" },
        { "type": "timepicker", "cap": "End" }
    ]
}
```

`actions` is the command group that acts on the form or current task:

```json
{
    "type": "wrapper",
    "stylize": "actions",
    "components": [
        { "type": "button", "cap": "Reset", "usage": "reset" },
        { "type": "button", "cap": "Cancel", "usage": "cancel" },
        { "type": "button", "cap": "Confirm" }
    ]
}
```

Assign `item` to each repeated list peer and every direct child positioned by its parent's coordinate system. List children represent repeated records; map and calendar children represent coordinate-owned labels, overlays, or marks. Parent context specializes the same item identity. A concrete element can carry the role directly; use a wrapper when one peer contains multiple elements.

```json
{
    "type": "container",
    "stylize": "list",
    "components": [
        {
            "type": "indicator",
            "stylize": "item",
            "cap": "Server A",
            "value": "Online"
        },
        {
            "type": "wrapper",
            "stylize": "item",
            "components": [
                { "type": "label", "cap": "Server B" },
                { "type": "button", "cap": "Open" }
            ]
        }
    ]
}
```

For coordinate-positioned children, keep the same role and provide the parent-specific coordinate on the child:

```json
{
    "type": "map",
    "components": [
        {
            "type": "indicator",
            "stylize": "item",
            "coord": "南京",
            "cap": "Nanjing"
        }
    ]
}
```

```json
{
    "type": "calendar",
    "showDate": "2024-03-01",
    "components": [
        {
            "type": "indicator",
            "stylize": "item",
            "coord": "2024-03-15",
            "cap": "Maintenance"
        }
    ]
}
```

## Stylize Coverage

Role names describe stable page structure, content composition, or interaction responsibility. Native `variant`, theme stylesheets, and style plugins express alternate visual recipes for those roles.

Theme authors should support both:

- semantic `stylize` values for page structure and contextual recipes
- element-type fallbacks for common elements when a page does not set custom `stylize`

For example, a theme can define a general button recipe and also a sidebar-specific button recipe:

```text
button
sidebar > button
```

Use `stylize` when the element carries a semantic context. Otherwise, let its element-type fallback provide the base appearance.

## Parent-Child Context

Use parent-child context when a child changes because of where it lives:

```text
sidebar > button
toolbar > button
panel > section
section > group
form > field
modal > actions
main > tile
map > item
calendar > item
```

This can be described by a design-time recipe path when the design or importer needs an address for validation, import/export, or tooling:

```text
app.sidebar.nav.button.hover.icon.color
panel.section.form.field.focus.borderColor
modal.actions.button.default.backgroundColor
```

Those paths compile into full stylesheet CSS with selectors and values resolved to `sys`, minimal `cmpt`, literals derived from authoring `ref`, or literal recipe mechanics before runtime. They are not runtime tokens, and authoring `ref` does not survive as a runtime custom-property layer.

Traits map to known class-backed element behavior and are declared as `-[trait]` on a node, such as `button-withacbg.backgroundColor`. Larger visual treatment decisions belong in the stylesheet selected by role context.

## Common Choices

Use this when deciding between nearby values:

| Need | Use |
|---|---|
| Whole application shell | `app` |
| Primary document/work area | `main` |
| Navigation region | `nav` |
| Auxiliary work surface for a distinct task or context | `panel` |
| Anchored transient surface | `type: "popup"` |
| Compact tooltip/completion surface | `tooltip` |
| Blocking centered overlay | `modal` |
| Cohesive content region inside a tile, card, or panel | `section` |
| Related, same-purpose content or controls | `group` |
| One data-editing workflow or model | `form` |
| One labelled compound logical value | `field` |
| Form/dialog button row | `actions` |
| Repeated peer collection | `list` |
| Collection peer or coordinate-positioned child | `item` |
| Dashboard/bento grid unit | `tile` |
| App, section, panel, card, or tile title | `title` |
| Compact badge/chip/status | matching badge, tag, or tags element type |
| Portable content object | `type: "card"` |
| Rendered Markdown document root | `markdown` (assigned by `jamd` / `jaml.md()`) |
| Rendered JSON tree root | `json` (assigned by `jaml.json()`) |

`main` owns the application's primary work area. `section` owns a cohesive content region within a tile, card, or panel.

## Runtime Stylize, Variant, And Style Plugins

Runtime `stylize` and `Styles.group.*` describe complementary parts of composition.

- Runtime `stylize: "sidebar"` names an element's presentation role.
- Runtime `stylize: "group"` identifies related, same-purpose content or controls.
- Runtime `stylize: "markdown"` and `stylize: "json"` identify framework-rendered content roots.
- Runtime `stylize: "item"` identifies a peer child whose list, map, or calendar parent supplies its context.
- Native `variant: "legend"` keeps the `list` role and selects an alternate recipe exposed through `jam-variant="legend"`; `stylize: "list-legend"` is its compact equivalent.
- `Styles.group.bento`, `gridline`, `stripy`, and `divider` select child arrangement and presentation.

The `group` role and a `Styles.group.*` plugin can be used together: the role exposes responsibility, while the plugin selects an arrangement. Theme authors use variant selectors for alternate styles of the same role. A descriptive variant remains a role refinement. Group plugins may be selected directly by a page author or attached to role/variant selectors through the framework or theme `styles` map.
