# Theme Styling Anatomy

Theme stylesheets restyle native elements through the hooks on this page. Each hook is framework-owned: a host tag, a role class, an attribute, a state class, a slot, a shadow part, or a component custom property. Read [Stylesheets](./stylesheets.md) for the selector boundary and [Tokens](./tokens.md#cmpt) for the component token values these hooks consume.

## Reaching Inside An Element

Every native `jam-*` element renders its own structure in an open shadow root. A theme stylesheet reaches that structure in three ways:

| Hook                    | Selector form                    | Reaches                                                                    |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------------- |
| Host                    | `jam-input`, `.jam-button-style` | The element box itself, its attributes and its state classes               |
| Slotted light-DOM child | `jam-card > [slot='cap']`        | Content the author or the element places into a named slot                 |
| Shadow part             | `jam-input::part(agent)`         | One named node inside the shadow root                                      |
| Inherited variable      | `jam-input { --jam-input-…: … }` | Values the element's internal stylesheet reads, through normal inheritance |

Part names follow two fixed rules:

-   Every slot exposes the part `<slot name>slot`: `labelslot`, `iconslot`, `capslot`, `valueslot`, `unitslot`, `extraslot`, and so on. An unnamed default slot uses its class name, such as `bodyslot` on `jam-card`.
-   The native control inside an element (`<input>`, `<textarea>`, `<select>`, `<progress>`) exposes the part `agent`.

Most elements share the label template `labelslot > iconslot + capslot`. Nodes that expose no part, such as the calendar's previous/next arrows, are outside the theme contract; leave them to the element's own recipe.

## Role Classes

`stylize` produces the role class `.jam-<stylize>-style` and `variant` produces `[jam-variant='…']`. The role class is applied when the element sits directly under `body`, `jam-container`, `jam-card` or `jam-wrapper`; when its role is `button` or `tag`; or when it is an `item` placed by a calendar or map. An element nested inside other markup keeps its tag and attributes as hooks.

Elements carry a default role when the author sets none:

| Element                                                     | Default role class   |
| ----------------------------------------------------------- | -------------------- |
| `jam-button`                                                | `.jam-button-style`  |
| `jam-badge`, `jam-label[type='tag']`                        | `.jam-tag-style`     |
| `jam-input`, `jam-select`, `jam-progress`, `jam-datepicker` | `.jam-input-style`   |
| `jam-card`                                                  | `.jam-card-style`    |
| `jam-notify`                                                | `.jam-tooltip-style` |
| `jam-element` with a `divider-*` type                       | `.jam-divider-style` |
| `jam-popup`                                                 | `.jam-popup-style`   |
| Other elements                                              | `.jam-element-style` |

## Shared State Hooks

| Hook                                 | Meaning                                                            |
| ------------------------------------ | ------------------------------------------------------------------ |
| `[disabled]`                         | Disabled element; the framework already fades it                   |
| `[readonly]`                         | Read-only input                                                    |
| `[type='…']`                         | Element subtype when it differs from the element type              |
| `[state='…']`                        | Element-specific state value                                       |
| `.jam-checked`, `.jam-indeterminate` | Checked and mixed selection on buttons, switches and options       |
| `.jam-active`                        | Pressed button, also set from the keyboard                         |
| `.jam-hover`                         | Hover state set by the runtime, alongside `:hover`                 |
| `.jam-required`                      | Required input                                                     |
| `.jam-with-icon`, `.jam-icon-only`   | Icon presence                                                      |
| `:focus-visible`                     | Keyboard focus; inputs draw their focus outline on `::part(agent)` |

Elements also inherit `--jam-cap-opacity`, `--jam-value-opacity`, `--jam-icon-font-size` and `--jam-icon-text-shadow` (the `icon.textShadow` token) from their host, which tune caption, value and icon presentation without reaching into slots.

## Elements

### Application shell

`jaml.application`, `jaml.page` and `jaml.sidebar` build their regions from [shell roles](./stylize.md#app-structure). A theme reaches them through these selectors:

| Region                       | Selectors                                                                                                      |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Application canvas           | `.jam-app-style`                                                                                               |
| App header                   | `.jam-app-style > .jam-header-style`, and `.jam-app-style > .jam-frame-style > .jam-header-style` with a frame |
| Shell grouping and work area | `.jam-frame-style`, `.jam-main-style`, `.jam-footer-style`                                                     |
| Sidebar                      | `.jam-sidebar-style`; `[jam-variant]` selects its alternate palette                                            |
| Sidebar header and footer    | `.jam-sidebar-style > .jam-header-style`, `> .jam-footer-style`, and the same inside `> .jam-section-style`    |
| Titles                       | `.jam-title-style`, for example `.jam-sidebar-style > .jam-header-style > .jam-title-style`                    |
| Navigation                   | `.jam-nav-style > .jam-button-style`; the current destination carries `.jam-checked`                           |
| Compact rail                 | `.jam-layout-sidebar-rail`, with its buttons as direct children                                                |
| Account or footer item       | `.jam-sidebar-style .jam-footer-style > .jam-item-style`                                                       |

A title bar on a captioned surface (a `jam-card`, or a `jam-wrapper` with `cap`, whether used as a tile, panel or modal) is its header: `::part(labelslot)` paints the bar, for example `.jam-modal-style::part(labelslot)`, and `> [slot='cap']` styles its text. Header gloss belongs on these region selectors as a `background-image` over a `background-color` token.

Title-bar geometry depends on the element:

-   The surface owns its padding, so a bar that runs edge to edge offsets that padding with negative margins on `::part(labelslot)`. Padding differs by role, so set it in the theme and reuse the same value, for example a theme-local `--my-inset` used for both `padding` and `margin: calc(-1 * var(--my-inset)) calc(-1 * var(--my-inset)) 0` and stretches with `align-self: stretch`.
-   A `jam-wrapper` lays `labelslot` out as a flex item sized to its content; a captioned wrapper carries `.jam-with-cap`. A captioned `jam-card` carries no such class; select cards by role or tag, and `jam-card.jam-headless` for a card without a header. Give the part `align-self: stretch` or a full width for a bar.
-   A `jam-indicator` renders `labelslot` as `display: contents`, so the bar goes on its slotted caption or on a layer:
    -   **Caption bar.** When the caption spans the top row (for example with `indicator.useArea`), paint `jam-indicator.jam-tile-style > [slot='cap']` as the bar with the same negative-margin recipe; the bar follows the caption's height.
    -   **Height-controlled band.** For layouts whose caption does not span the tile, add a band layer from the theme `styles` map, behind the content on an isolated host: `css(position:relative;isolation:isolate)` plus `layer.css(zIndex:-1;position:absolute;inset:0 0 auto 0;height:…;backgroundColor:…;backgroundImage:…)`. Without `zIndex:-1` the band paints over the caption.

When a theme paints a region with an accent fill itself, rather than through `with.accent`, it also owns the foreground inside: set `color: var(--jam-color-on-primary)` on the region and set `--jam-button-color` on buttons in it (hover and pressed foregrounds follow it), because ghost and blended buttons and labels keep their own foreground. Applying `with.accent` instead gives the region `.jam-bg-accent`, whose buttons already switch to on-accent foregrounds.

### Button — `jam-button`

-   Subtypes: `[type='cta']`, `[type='fab']`, `[type='outline']`, `[type='ghost']`, `[type='link']`; the default button has no `type` attribute.
-   `cta` and `fab` also carry `.jam-bg-accent`; `fab` carries `.jam-round`; `cta` carries `.jam-cta`.
-   States: `:hover`, `.jam-hover`, `:active`, `.jam-active`, `:focus-visible`, `.jam-checked`, `[disabled]`.
-   Parts: `iconslot`, `capslot`.
-   The host paints the whole button: `border` (width `--jam-border-width-xs`, color `--jam-button-border-color`), `box-shadow: var(--jam-button-box-shadow)`, `padding: var(--jam-button-padding)`, `color: var(--jam-button-color)`, `background-color: var(--jam-button-background-color)` and, layered over that color, `background-image: var(--jam-overlay-background-image)`.
-   Hover and `.jam-hover` swap `background-color` to `--jam-button-hover-background-color` and `color` to `--jam-button-hover-color`. Press and `.jam-active` swap the image to `--jam-overlay-active-background-image`, the color to `--jam-button-active-background-color` and the shadow to `--jam-shadow-xs`. Accent buttons (`.jam-bg-accent`) use the `--jam-overlay-primary-*` images instead.
-   Subtypes change the state paint: `outline` hovers with the accent's readable text color, a `currentColor` border and a translucent accent fill (alpha 0.1, pressed 0.2); `ghost` hovers with a faint neutral fill; `link` has no border, background or shadow.
-   `[disabled]` sets `color: fg.faint`, the `carved` text shadow and no box shadow with `!important`, and uses `fg.muted` on accent parents. Restyle disabled text on its slots, for example `.jam-button-style[disabled] > [slot='cap']`.
-   Set the foreground through `cmpt.button.color`; hover and pressed foregrounds follow it unless `button.hover.color` / `button.active.color` are set. Accent, tinted and extra-slot contexts keep their own foregrounds. A gloss is a gradient in the `overlay` tokens; an inner glow or bevel is an inset `box-shadow` in a recipe.

### Button group — `jam-buttongroup`

-   Each option is a light-DOM `jam-button.jam-button-style`; style options as buttons.
-   Group subtypes: `radio`, `checkbox`, `none`, `ghost`, `outline`, `ghostradio`, `ghostcheckbox`, `outlineradio`, `outlinecheckbox`.
-   Selected options carry `.jam-checked` and consume `--jam-checked-*`.
-   Ghost groups (`[type='ghost' | 'ghostradio' | 'ghostcheckbox']`) set their own tinted `--jam-checked-*` values on `jam-buttongroup[type^='ghost'] .jam-button-style`. Override them at that selector or a more specific one, such as `.jam-sidebar-style jam-buttongroup[type^='ghost'] .jam-button-style.jam-checked` for selected sidebar navigation.

### Tabs

-   Retained tabs from [`jaml.tabs`](../JAML/tabs.md) render light-DOM classes: `.jam-tabs-host` contains `.jam-tabs-list` (the strip of `.jam-tabs-tab` buttons, each with a `.jam-tabs-close` in its extra slot when closable) and `.jam-tabs-panels` (each `.jam-tabs-panel`; inactive panels are `[hidden]`).
-   `.jam-tabs-tab` is a ghost button (`.jam-button-style[type='ghost']`). The selected tab carries `[aria-selected='true']` and `.jam-checked`.
-   A tab-like value selector without panels is a `buttongroup-radio`; style its options as checked buttons.
-   `.jam-tabs-tab.jam-checked` is a narrowly scoped checked recipe: style the selected tab there without restyling every checked ghost button.

### Switch, checkbox and radio — `jam-switch`

-   Subtypes: `slider` (default), `checkbox`, `radio`, `button`, `ghost`, `outline`. Button-like subtypes carry `.jam-button-style`.
-   Checkbox and radio render a light-DOM `.box` containing `.check`; select them as `jam-switch[type='checkbox'] > .box`.
-   The slider renders a light-DOM `input[type='range'][slot='slider']`.
-   States: `.jam-checked`, `.jam-indeterminate`, `[disabled]`.
-   Button-like subtypes read `--jam-checked-*`.
-   The checkbox and radio `.box` draws a `--jam-input-border-width` border in `--jam-color-fg-faint` over `--jam-input-background-color`. Set its border color, radii and mark color through the `checkbox` and `radio` tokens (`cmpt.radio.borderRadius: '50%'` gives round radio boxes; the dot follows). For other treatments, restyle `jam-switch[type='checkbox'] > .box` through its local properties `--border-width`, `--transform`, `--opacity`, `--transition`, and on checkboxes `--mask-image` (the check mark shape). The checkbox mark is drawn by `.box .check::before`; the radio dot is `.box .check`.

`checkbox` and `radio` are not separate elements: an options group renders each choice as `jam-switch[type='checkbox' | 'radio']`.

### Options — `jam-options`

-   Types: `radio`, `checkbox`, `none`.
-   Each choice is a light-DOM `.jam-option` (a `jam-switch`, or a `jam-label` for `none`). Hidden choices carry `.jam-hide`.
-   Parts: `labelslot`, `optionslot`.

### Input — `jam-input`

-   A plain text input has no `type` attribute. Other subtypes set `[type='search' | 'number' | 'password' | 'color' | 'range' | 'file' | 'textarea' | 'code' | 'compose']`.
-   Parts: `labelslot`, `iconslot`, `capslot`, `agent` (the native control), `unitslot` for numbers.
-   The field's border, background, radius and focus outline are painted on `::part(agent)`, not on the host: `border-style: solid` with `--jam-input-border-width`, `--jam-input-border-color`, `--jam-input-border-radius`, and `background-color: var(--jam-input-background-color)`, which hover and focus change to `--jam-input-hover-background-color`. Keyboard focus draws an outline from `--jam-input-focus-outline-width` and `--jam-input-focus-outline-color`.
-   Restyle the field through those values, or with `jam-input::part(agent)` rules for treatments such as an inset bevel. Caret and selection come from `--jam-caret-color` and `--jam-selection-*`. A `file` input renders as a button.

### Select and date picker — `jam-select`, `jam-datepicker`

-   Parts: `labelslot`, `iconslot`, `capslot`, `agent` (native `<select>` or `<input type='date'>`).
-   `jam-select.jam-selected` marks a chosen value; `[type='checkbox']` makes it multiple.

### Tags and badge — `jam-tags`, `jam-badge`

-   Each tag is a light-DOM `jam-label.jam-option` with the tag role. Remove buttons are `.jam-close-btn`.
-   Tags host parts: `labelslot`, `tagslot`.
-   `jam-badge` parts: `iconslot`, `capslot`, `valueslot`. Badges and tags use the button border, radius and shadow values. The badge caption is a filled cell: `primary.default` background with `on.primary` text, both resolved from the badge's own `color`, under the `overlay` image.

### Label and indicator — `jam-label`, `jam-indicator`

-   Label parts: `iconslot`, `capslot`; `[type='outline']` and `[type='tag']` select alternate recipes.
-   Indicator parts: `labelslot`, `iconslot`, `capslot`, `valueslot`, `unitslot`. Slotted children are reachable as `> [slot='icon' | 'cap' | 'value' | 'unit']`.
-   An indicator unit's opacity is `var(--jam-value-opacity) × 0.69`; indicators set `--jam-value-opacity: 0.85`, so a unit renders at about 0.59 opacity. Raise `--jam-value-opacity` on the indicator, or set the unit's opacity directly, when units must meet text contrast.

### Card — `jam-card`

-   Parts: `labelslot`, `iconslot`, `capslot`, `bodyslot`. A card header is `::part(labelslot)`; its text is `> [slot='cap']`.
-   The `tile` role styles captions with `.jam-tile-style > [slot='cap']` (`fg`-like lumi color, `fontSize.l`, semibold, tight line height). That class selector outranks `jam-card > [slot='cap']`; restyle tile captions with `.jam-tile-style > [slot='cap']`, and add `:not(jam-indicator)` when indicator tiles should keep their own caption recipe.
-   `.jam-headless` marks a card without a header.

### Popup, tooltip, modal and notification

-   `jam-popup` parts: `rectslot` (the surface) and `arrowslot`. The light-DOM `[slot='rect']` surface paints `--jam-overlay-background-image` over the tooltip values, and `.arrow` reads them too: `--jam-tooltip-background-color`, `--jam-tooltip-border-color`, `--jam-tooltip-border-width`, `--jam-tooltip-border-radius`, `--jam-tooltip-padding`, `--jam-tooltip-box-shadow`.
-   A showing popup carries `.jam-showing`; its placement side is `[jam-popon*='top' | 'bottom' | 'left' | 'right']`.
-   A modal is presentation, not an element. Every modal root carries `.jam-modal`; a root authored with `stylize: 'modal'` also carries the `.jam-modal-style` role, which reads `--jam-modal-background-image`. Style the role for dialog surfaces and `.jam-modal` for anything every modal shares.
-   `jam-notify` carries the tooltip role, `[type='banner' | 'card']` and `[level='info' | 'success' | 'warn' | 'error' | 'debug' | 'hurray']`; parts `labelslot`, `iconslot`, `capslot`, `contentslot`, `timeslot`. Its background comes from a layer (the host carries `.jam-with-layer-background`). Each notification carries its level's color as its own color profile, so accent-relative tokens inside it (`primary.*`, `tint.*`, `fg.primary`) resolve to that status color.

### Table and tree — `jam-table`, `jam-tree`

-   Header cells: light-DOM `.jam-th` in `slot='thead'`. Body cells: `.jam-td`.
-   Parts: `labelslot`, `theadslot`, `tneckslot`, `tbodyslot`, `tfootslot`.
-   Row hover marks cells with `.jam-hovering`; sortable headers carry `.jam-sortable`.
-   Row numbers: `.jam-row-decor .rownum`.
-   Values: every `--jam-table-*` token, including the header foreground `--jam-table-thead-color`.
-   `jam-tree` shares the table cells; tree rows carry `[role='treeitem']`.

### List and steps — `jam-list`, `jam-steps`

-   List rows: `> [role='listitem']`.
-   Steps: each step carries `[jam-step-status='wait' | 'process' | 'finish' | 'skipped' | 'warning' | 'error']` and the current step `[aria-current='step']`; markers are `.jam-step-marker`. Size hooks: `--jam-step-marker-size`, `--jam-step-rail-width`, `--jam-step-rail-gap`.

### Progress — `jam-progress`

-   Parts: `labelslot`, `iconslot`, `capslot`, `agent` (native `<progress>`). Radius follows `--jam-input-border-radius`.

### Divider

-   A divider is `jam-element` with a `divider-*` type, exposed as `[jam-divider]` plus `[jam-horizontal]` or `[jam-vertical]`.
-   Values: `--jam-divider-color`, `--jam-divider-width`, `--jam-divider-opacity`, `--jam-divider-radius` (tokens, applied inside divider groups) and `--jam-divider-length` (set per divider style).

### Scrollbars

Set scrollbar values through `cmpt.scrollBar` (see [Tokens](./tokens.md#cmpt)); they apply on the page and inside every element.

-   Browsers that support standard `scrollbar-color` use only the colors: `scrollbar-color: <thumbColor> <trackColor>` with `scrollbar-width: auto`. In Jam-UI 2.0.0 and later the thumb uses `thumbColor`; earlier runtimes used `thumbColorHover` here.
-   `width`, rounded ends and the thumb hover color apply only in browsers without `scrollbar-color`, through `::-webkit-scrollbar`.
-   Bevels and arrow buttons are a browser limitation: standard CSS only colors scrollbars, and the non-standard `::-webkit-scrollbar` styling is ignored wherever `scrollbar-color` is set, which the framework does on the page and inside every element. Express the scrollbar identity through thumb and track colors.

## Style Plugin Classes

Built-in style plugins add these classes. Retune them in the theme stylesheet rather than recreating them:

| Class                                                                                | Added by                                                                   |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| `.jam-bg-accent`, `.jam-bg-tint`, `.jam-bg-elevated`                                 | `with.accent`, `with.tint`, `with.elevation`; also `cta` and `fab` buttons |
| `.jam-on-accent`, `.jam-on-light`, `.jam-on-dark`                                    | `on.*`                                                                     |
| `.jam-hover-withbg`, `.jam-hover-dynamicbg`                                          | `hover.withbg`, `hover.dynamicbg`                                          |
| `.jam-cap-main`, `.jam-cap-sub`                                                      | `cap.main`, `cap.sub`                                                      |
| `.jam-value-major`, `.jam-value-main`, `.jam-value-sub`, `.jam-value-minor`          | `value.*`                                                                  |
| `.jam-bento-group`, `.jam-gridline-group`, `.jam-stripy-group`, `.jam-divider-group` | `group.*`                                                                  |
| `.jam-blended`, `.jam-pill`, `.jam-round`, `.jam-vertical`                           | `button.*`                                                                 |
| `.jam-vertical`, `.jam-inline`, `.jam-tilted`, `.jam-stripy` on `jam-buttongroup`    | `buttongroup.*`                                                            |
| `.jam-layout-sidebar-rail`                                                           | The application sidebar rail                                               |

## Where Component Values Apply

Component values are custom properties, so where they are declared decides what they reach:

-   A value whose component has its own emission selector (`button`, `table`, `checked`, and the child-group roots) is declared on that selector.
-   Other values that contain a color or shadow are declared on every `.jam-lumi` and `.jam-colorprofile` node, so they follow nested color and mode contexts.
-   Remaining values are declared on `body`.

Because color values are redeclared on nested color contexts, set them through the theme's `cmpt` tokens. A plain `body { --jam-input-border-color: … }` rule in the theme stylesheet is overridden inside those contexts. An element that has its own `color` carries `.jam-colorprofile` and receives these declarations directly, so a rule on its tag alone (`jam-input { … }`) loses to them; use a selector with at least class specificity, such as `.jam-input-style`, or the `cmpt` token.
