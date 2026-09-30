# click

<!-- Generated from native authoring; do not edit. -->

[中文](click.zh.md)

`Styles.click.*` — click-triggered behaviors.

---

## Variants

### `click.toFront`

<a id="entry-click-tofront"></a>

Bring forward on click

Bring positioned peer content forward within its parent stacking context.

Raises the host immediately; after connected readiness, installs a mousedown listener that raises it again. Assigns inline z-index and sortable/top markers among descendant sortable peers under the parent.

Changes stacking order without moving or reparenting DOM nodes.

Provide suitable positioning and a shared stacking context, with framework z-index tokens available.

Teardown removes the mousedown listener and sortable markers, promotes a remaining sortable, and clears plugin data. A pending connected-readiness callback cannot reinstall an obsolete listener. Prior inline z-index values are not restored.

Use with positioned peer cards or windows; manage layout, parent changes and modal focus separately.

This is not a global-topmost or focus-trapping modal manager. Already-topmost nodes return early; arbitrary reparenting is not reconciled.

hosts: `HTMLElement`.

states: `mousedown`.

Developer examples require a matching Playground that serves these fixtures:

- `#/testground?jaml=intent-click-toFront`

Raises the host immediately and on `mousedown` within its parent stacking context. Removing the style detaches its listener and prevents pending connection readiness from reinstalling it; prior inline z-index values are not restored. No args.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Click to bring to front',
        styles: ['click.toFront']
    },
    {
        type: 'card',
        cap: 'Also comes to front',
        styles: ['click.toFront']
    }
];
```

### `click.able`

<a id="entry-click-able"></a>

Clickable button presentation

Give a custom host the framework clickable/button presentation while the application supplies interaction semantics.

Combines the clickable class with stylize=button; it installs no activation handler.

Theme-provided pointer, hover and active presentation follows the framework stylesheets.

Use a host with the intended interaction and accessibility contract; load the theme and framework styles.

Ordinary class and attribute plugins track and restore their presentation changes.

Prefer a native button when that is the intended control. For a custom host, supply activation, focus and semantic attributes explicitly.

Styling does not add keyboard activation, tabIndex, an accessible role, disabled behavior or a click callback.

hosts: `HTMLElement`.

states: `hover`, `active`.

Developer examples require a matching Playground that serves these fixtures:

- `#/testground?jaml=intent-click-able`

Makes the element appear clickable — adds `cursor: pointer` via `.jam-clickable` class and applies button stylize via the `stylize` attribute. No args.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Clickable label',
        styles: ['click.able']
    },
    {
        type: 'card',
        cap: 'Clickable card',
        styles: ['click.able']
    }
];
```

### `click.bouncing`

<a id="entry-click-bouncing"></a>

Hover and press bounce

Give a control hover and press bounce feedback.

Adds hover-bouncing and active-bouncing classes; visual behavior is supplied by the framework stylesheet.

Visual feedback does not install a click action.

Adds a bounce animation on click. Adds both `.jam-hover-bouncing` and `.jam-active-bouncing` classes. No args.

```javascript jaml-playground
export default [
    {
        type: 'button',
        cap: 'Bounce on click',
        styles: ['click.bouncing']
    },
    {
        type: 'card',
        cap: 'Bouncing card',
        styles: ['click.bouncing']
    }
];
```

---

## Usage

```javascript jaml-playground
export default {
    type: 'card',
    cap: 'Clickable',
    styles: ['click.able', 'click.toFront']
};
```
