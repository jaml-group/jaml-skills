# auto

<!-- Generated from native authoring; do not edit. -->

[中文](auto.zh.md)

`Styles.auto.*` — automatic behaviors triggered on mount or data change.

---

## Variants

### `auto.badge`

<a id="entry-auto-badge"></a>

Badge

Turn bracketed caption/value text into inline badges.

Scans existing text nodes and replaces matching bracket expressions with jam-badge markup; dir controls the vertical class.

Use stable content whose parent markup can be rewritten.

The transformation rewrites parent innerHTML once, can replace existing child nodes, and provides no inverse transformation or mutation observer.

Positional order: `sep` → `dir`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `sep` | `string` | `:` | Separator |
| `dir` | `string` | `horizontal` | Direction |

Auto-replaces `[cap:value]` text patterns in the element's text content with inline `<jam-badge>` elements. The text before `sep` becomes the `cap` slot and the text after it becomes the `value` slot. Walks the DOM tree and replaces matching text nodes.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: '[status:active] [priority:high]',
        styles: ['auto.badge']
    },
    {
        type: 'label',
        cap: '[status:active] [priority:high]',
        styles: ["auto.badge(sep:':';dir:vertical)"]
    }
];
```

### `auto.adjustFont`

<a id="entry-auto-adjustfont"></a>

Automatically adjust font size

Fit text to the available target dimensions.

Runs immediately and on configured host events through an animation-frame throttle; an optional descendant selector chooses the text target.

Requires measurable text and a resolved line height other than normal.

Set the target size and line height before applying the style; choose triggers for content changes as well as resize when necessary.

This measures text layout, not arbitrary rich child geometry. Teardown removes listeners and the marker class but does not restore the previous inline font size.

Positional order: `min` → `max` → `target` → `triggers` → `bias` → `heightAdjust`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `min` | `number` | `10` | Minimum size<br>Measured in px. |
| `max` | `numberOrString` | Not supplied | Maximum size<br>Measured in px. |
| `target` | `string` | Not supplied | Target selector |
| `triggers` | `array` | `["resize"]` | Triggers |
| `bias` | `dictionary` | Not supplied | Offset |
| `heightAdjust` | `number` | Not supplied | Height adjustment<br>Proportion of the font size used to compensate for bottom overflow caused by line height and font design when text is vertically bottom-aligned. |

Auto-scales font size so text fits within the container without overflow. Listens to resize events (and custom triggers) and adjusts incrementally.

Height adjustment compensates for line-height and font vertical alignment.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'This text will auto-scale to fit inside the container',
        styles: ['auto.adjustFont(min:8;max:32)', 'css(width:15rem;overflow:hidden)']
    }
];
```

### `auto.focus`

<a id="entry-auto-focus"></a>

Automatic focus

Focus an element after mount and return focus to a previous auto-focus element when it unmounts.

Schedules focus after repaint; an optional regular expression locates the selection range in the value.

The host must be focusable. Selection additionally requires a string-like value and an agent supporting setSelectionRange.

Mount installs focus and unmount listeners; style teardown removes those listeners.

This owns focus movement, so avoid competing autofocus controllers.

Positional order: `selection`.

| Argument | Type | Contract |
| --- | --- | --- |
| `selection` | `regexp` | Selection<br>A regular expression. |

Auto-focuses the element on mount. Manages a focus stack — when this element unmounts, focus returns to the previous element in the stack. If `selection` is provided, selects the matching portion of the value.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Focused on mount',
        value: 'Select this word please',
        styles: ['auto.focus(selection:/this/)']
    },
    {
        type: 'input',
        cap: 'Focused, no selection',
        styles: ['auto.focus']
    }
];
```

### `auto.moveAlong`

<a id="entry-auto-movealong"></a>

Follow movement

Keep an element moving with a target element position.

After mount and a delay, periodically measures the target centroid and updates a translation through MelonMove; it reuses an existing move helper when present.

The target selector must resolve after the delay; selectors beginning with a colon are resolved relative to the host.

Unmount, style teardown or host destruction clears the active interval, movement class and variables, owned checkpoint, and any move helper created by this style. A later mount starts a new setup while the style remains installed.

Reserve transform and movement ownership for this style or deliberately coordinate with other movement plugins.

Delayed setup and pending movement completions check that their application is still current; obsolete completions do not update the host. This invalidates continuations rather than cancelling arbitrary promises. Existing move helpers are reused and are not removed by this style.

Positional order: `target` → `delay` → `throttle` → `frontZIndex` → `backZIndex`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `target` | `string` | Not supplied | Target selector<br>Shorthand |
| `delay` | `number` | `100` | Delay |
| `throttle` | `number` | `25` | Throttle |
| `frontZIndex` | `numberOrString` | `1000` | Front z-index |
| `backZIndex` | `numberOrString` | `auto` | Back z-index |

`auto.moveAlong` and `auto.scrollAlong` clean their active setup on unmount, style teardown or host destruction and can set up again on remount. Delayed setup ignores obsolete applications. Movement also guards pending move completions; scroll synchronization cancels its owned frame and timeout and removes only its own temporary marker. These guards do not cancel arbitrary promises.

Makes the element follow another element's screen position. Uses `MelonMove` for smooth animation. Toggles `jam-at-front` class when passing certain angles for z-index management.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['css(position:relative)'],
        components: [
            { type: 'label', cap: 'Reference', id: 'ref' },
            {
                type: 'label',
                cap: 'Following',
                styles: ['auto.moveAlong(target:#ref)']
            }
        ]
    }
];
```

### `auto.scrollAlong`

<a id="entry-auto-scrollalong"></a>

Follow scrolling

Make a scrollable target follow another element’s relative scroll position.

After delayed mount, listens to the source scroll event and copies scroll percentages to the host or scrollTarget; a marker avoids reciprocal feedback.

Both selectors must resolve and the destination must have scrollable extent.

Unmount, style teardown or host destruction removes the source scroll listener, cancels the owned animation frame and timeout, and removes the scrolling marker only when this setup added it. Delayed setup checks its application identity; a later mount can start a fresh setup.

Synchronization copies percentages, not pixels. It does not perform an initial copy before a source scroll event. Obsolete delayed setup and queued callbacks cannot update a removed or replaced application; the underlying delay promise is not cancelled.

Positional order: `target` → `scrollTarget` → `delay`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `target` | `string` | Not supplied | Target selector<br>Shorthand |
| `scrollTarget` | `string` | Not supplied | Scroll target selector |
| `delay` | `number` | `100` | Delay |

Synchronizes the scroll position of two elements. When the target scrolls, the scroll target mirrors its scroll percentage.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['css(display:flex;gap:1rem)'],
        components: [
            {
                type: 'container',
                id: 'source-scroll',
                styles: ['css(height:10rem;overflow-y:auto)', 'css(width:50%)'],
                components: [{ type: 'label', cap: 'Scroll here\n\nLine 1\nLine 2\nLine 3\nLine 4\nLine 5' }]
            },
            {
                type: 'container',
                styles: ['auto.scrollAlong(target:#source-scroll)', 'css(height:10rem;overflow-y:auto)', 'css(width:50%)'],
                components: [{ type: 'label', cap: 'Mirrored scroll\n\nLine A\nLine B\nLine C\nLine D\nLine E' }]
            }
        ]
    }
];
```

### `auto.hideIf.empty`

<a id="entry-auto-hideif-empty"></a>

Hide when empty

Hide an option-based host when its data is empty.

Evaluates on initial connection and optionchange, toggling jam-hide from the host data.

Use a host with the option data and optionchange contract.

This tests data emptiness, not rendered child count. Removing the event listener does not restore the previous hide class.

Auto-hides the element when its `data` is empty or null. Listens to `optionchange` events. For option-based elements (`AbstractOptionElement`). No args.

```javascript jaml-playground
export default [
    {
        type: 'select',
        cap: 'Items',
        styles: ['auto.hideIf.empty'],
        data: []
    }
];
```

### `auto.hideIf.valueIs0`

<a id="entry-auto-hideif-valueis0"></a>

Hide when the value is 0

Hide an input-like host when its value is absent or the number zero.

Evaluates on initial connection and valuechange, toggling jam-hide for null, undefined, or numeric 0.

Use a host exposing value and valuechange.

The string "0" does not match numeric zero. Removing the event listener does not restore the previous hide class.

Auto-hides the element when its `value` is `0` or `null`. Listens to `valuechange` events. For input elements (`AbstractInputElement`). No args.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Enter 0 to hide',
        styles: ['auto.hideIf.valueIs0']
    }
];
```

### `auto.keepScrollPosition`

<a id="entry-auto-keepscrollposition"></a>

Preserve scroll position

Restore a stable scroll position when returning to mounted content.

Stores pixel offsets under the host id on route change or unload; restoration can wait for a delay callback and asks viewport controllers to prepare the required extent.

The host needs a stable id; an optional selector resolves the scroll target.

Unmount and removal cancel pending restoration and remove listeners; user scrolling or navigation input cancels the pending restore.

Use with supported lazy or virtual viewport controllers so deep offsets can be prepared before restoration.

Positional order: `selector` → `delay`.

| Argument | Type | Contract |
| --- | --- | --- |
| `selector` | `string` | Target selector |
| `delay` | `function` | Delay |

Persists and restores the scroll position of an element across page loads using `miso` (sessionStorage).

> **Note:** The element must have an `id` attribute for the storage key.

```javascript jaml-playground
export default [
    {
        type: 'container',
        id: 'scrollable-list',
        styles: ['auto.keepScrollPosition', 'css(height:20rem;overflow-y:auto)'],
        components: [{ type: 'label', cap: 'Scroll position remembered' }]
    }
];
```

### `auto.colored`

<a id="entry-auto-colored"></a>

Automatic coloring

Use the host color profile for its icon and internal agent foreground.

Adds jam-auto-colored; the stylesheet targets compatible icons and the exposed agent part under jam-colorprofile.

The host needs a color profile and the corresponding icon or agent structure.

It does not choose a color profile or recolor every descendant.

Auto-applies accent color tint to the element. **Requires a `color` param** on the element — without it, nothing visible happens.

The element's `color` parameter supplies the tint source.

```javascript jaml-playground
export default [
    {
        type: 'button',
        cap: 'Tinted',
        color: 'blue',
        styles: ['auto.colored']
    },
    {
        type: 'card',
        cap: 'Colored card',
        styles: ['auto.colored']
    }
];
```

---

## Usage

```javascript jaml-playground
export default {
    type: 'select',
    cap: 'Items',
    styles: ['auto.hideIf.empty'],
    data: []
};
```
