# `Plugins.popup`

<!-- Generated from native authoring; do not edit. -->

[中文](popup.zh.md)

## `popup.more`

<a id="entry-popup-more"></a>

More actions for direct children

Attach a reusable trailing action menu to selected direct children of a native container.

Matches one target class, with an optional leading dot. Existing children and later child additions receive one native extra-slot button. The button uses display:none at rest, takes caption space on hover or focus, and remains displayed while open; non-hover or coarse input keeps it visible. Synchronous getcontent(target) runs at each opening and returns native JAML content or nodes. click2Hide delegates to the native dropdown default and event ordering; callbacks are not wrapped. By default the dropdown aligns with the trigger right edge, with cursor-based popup and arrow alignment disabled; native options can override this.

Use native direct children with an inline extra slot and a focusable target for keyboard discovery. Give menu actions accessible names and role=menuitem.

Owns only its injected buttons and one popup per application. Removal, container remount and unplug reconcile child lifetimes; replacement and pending opening cleanup cannot close a newer popup. Caller extra content and onchildadd callbacks remain intact.

Direct children only; class-only mutations are not observed. No async content contract or caption mask is supplied. Overlapping target classes should use a single plugin owner. Other options forward to PapayaPopup. Keep application identity, permissions and action logic in getcontent.

Positional order: `target` → `getcontent` → `triggerStyles` → `click2Hide` → `clickElsewhere2Hide`.

| Argument | Type | Contract |
| --- | --- | --- |
| `target` | `string` | One class name identifying eligible direct children. |
| `getcontent` | `function` | Synchronous callback receiving the current child and returning popup content on each opening. |
| `triggerStyles` | `array` |  |
| `click2Hide` | `boolean` | Forward native click dismissal; omission retains the dropdown default of false and existing callback ordering. |
| `clickElsewhere2Hide` | `boolean` | Forward native outside-click dismissal; omission retains true. |

## `popup.submenu`

<a id="entry-popup-submenu"></a>

Nested popup menu

Hover opens after 100 ms; leaving cancels pending opening. Click and ArrowRight/Enter/Space open immediately. On item exit a clipped safe triangle blocks underlying hover for at most 300 ms without timer renewal. Returning to the item or entering the submenu removes protection. Clicking the triangle closes that submenu branch and consumes the click. Expiry removes only protection. Position defaults right with top alignment and flips through native placement when space is limited. With click2Hide enabled, submenu action clicks close the entire ancestor popup chain after the callback; submenu-opening items keep ancestors open. Top alignment accounts for the first item inset.

Attach to content inside a PapayaPopup. Provide native menu items and use one submenu controller per menu. Submenu content may attach the same plugin for nesting.

Parent hide-start, destruction, item removal and unplug cancel owned work and close descendant popups. Escape/ArrowLeft closes the current submenu and restores item focus. Keyboard input clears triangle protection. Every opening creates a fresh popup. Normal dismissal plays collapse before destruction, including each ancestor and any already-closing branch. Pending presentations and forced teardown are destroyed immediately.

Positional order: `target` → `getcontent` → `triangleDebug`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `target` | `string` | Not supplied | Class name of submenu-opening items inside this menu container. Matching Jam buttons and menuitems show a native trailing chevron. |
| `getcontent` | `function` | Not supplied | Synchronous getcontent(item) returns native JAML content or nodes. |
| `triangleDebug` | `boolean` | `false` | Show the clipped pointer shield with var(--jam-color-primary-mask); false by default. |

Popup plugins attach tooltip, help, floating-tip, or more-action popups. Each variant owns its target discovery and interaction lifecycle while native popup infrastructure handles display and dismissal.

---

## `popup.tip`

<a id="entry-popup-tip"></a>

Show details on hover

Show delegated hover tips using the tip popup profile.

Reuses one owned popup for delegated hover targets. Default matching tests the event target; hoverClosest:true resolves the nearest match inside the host and ignores transitions within that same target. Sub-tip content may temporarily replace a showing main tip unless subTip:false is supplied; returning restores the main content. With dismissOn:'click', row activation cancels its pending tip or starts native hiding; focused rows remain dismissed until focus leaves and do not consume the next Escape.

Install on a containing element and annotate intended targets.

Repeated application does not duplicate listeners. content(target, popup) runs synchronously after native delay; onshow starts subscriptions after mounting/positioning. onhidestart stops async work while preserving exit visuals. oncontentretire disposes each created presentation once with reason replace, hide or destroy, including content canceled before onshow. Slot/sub-tip swaps do not retire it. Unplug removes listeners and destroys the popup through that same retirement path. Retained targets that become hidden, including through a hidden ancestor, cancel pending display or hide the visible tip through the same lifecycle.

Without hoverClosest, nested descendants do not inherit ancestor hover matching. A factory that never runs has no content to retire. Lifecycle callbacks have a null receiver and frozen detail snapshots; referenced DOM objects remain live. Promise content factories are unsupported. Sub-tips need an already showing main popup. hoverClosest does not add keyboard help or change focus behavior. dismissOn:'click' does not change row activation, generic click-dropdown policy or focus matching.

Positional order: `tipAttr` → `subTip` → `subTipAttr` → `selector` → `content` → `showDelay` → `hideDelay` → `type` → `onshow` → `dynamic` → `position` → `bias` → `snapTo` → `autoFlip` → `focus` → `onhidestart` → `oncontentretire` → `hoverClosest` → `dismissOn`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `tipAttr` | `string` | `jam-tip` | Attribute name to read tooltip content from. |
| `subTip` | `boolean` | Not supplied | Enable sub-tip replacement while the main popup is showing. Omitted or true enables it; false disables it. |
| `subTipAttr` | `string` | `jam-sub-tip` | Attribute name for sub-tip content. |
| `selector` | `string` | Not supplied | Selector for elements that show tips. |
| `content` | `functionOrString` | Not supplied | Static content or synchronous content(target, popup) returning supported slot content after native show delay. Promise returns are unsupported. |
| `showDelay` | `number` | Not supplied | Delay in milliseconds before showing. |
| `hideDelay` | `number` | Not supplied | Delay in milliseconds before hiding. |
| `type` | `string` | Not supplied | Popup profile type. |
| `onshow` | `function` | Not supplied | Receives a frozen { target, content, container, popup } snapshot after mounting and native positioning readiness. Start async subscriptions here; use detail, not this (null receiver). |
| `dynamic` | `boolean` | Not supplied | Keep content/position dynamic. |
| `position` | `string` | Not supplied | Popup position. |
| `bias` | `numberOrString` | Not supplied | Popup position bias. |
| `snapTo` | `string` | Not supplied | Snap target.<br>Options: `cursor`, `target` |
| `autoFlip` | `boolean` | Not supplied | Allow automatic position flipping. |
| `focus` | `boolean` | `false` |  |
| `onhidestart` | `function` | Not supplied | Receives the presentation snapshot when hiding begins. Stop subscriptions and invalidate async writes while retaining visual content for exit. Null receiver. |
| `oncontentretire` | `function` | Not supplied | Receives the presentation snapshot plus reason replace, hide or destroy exactly once. Dispose created content here, including results canceled before onshow. Null receiver. |
| `hoverClosest` | `boolean` | `false` | False by default. True resolves the nearest selector match within the plugin host; movement among its descendants preserves the delay, while nested matching targets stay distinct. Focus behavior is unchanged. |
| `dismissOn` | `string` | Not supplied | Optional click dismissal. 'click' captures activation on the nearest matching row inside the host and hides only its pending, visible or focused tip through native exit. Omission preserves existing behavior; the click still reaches the row action.<br>Options: `click` |

Shows a tooltip on hover over `jam-tip` targets (configurable via `tipAttr` or `selector`). By default, pointer matching tests the event target directly. Set `hoverClosest:true` to use the nearest selector match inside the plugin host: moving among one row’s labels and icons preserves the pending delay and visible presentation, while nested matching rows remain distinct targets. This option does not change focus matching or keyboard behavior.

Sub-tip replacement is enabled when `subTip` is omitted or true; `subTip:false` disables it. A `jam-sub-tip` target temporarily replaces an already showing main tip; returning restores its original content. Sub-tip swaps and direct slot updates do not retire the logical presentation.

```javascript jaml-playground
export default {
    type: 'container',
    plugins: ['popup.tip(subTip:true;showDelay:200)'],
    components: [
        {
            type: 'checkbox',
            cap: 'Admin',
            tip: 'Grants full system access.',
            data: [
                { name: 'read', value: 1, tip: 'View content' },
                { name: 'write', value: 2, tip: 'Edit content' },
                { name: 'delete', value: 3, tip: 'Remove content' }
            ]
        }
    ]
};
```

### Activation and hidden targets

Set `dismissOn:'click'` to dismiss the matching tooltip when its row is activated. Omission preserves existing behavior. Capture-phase delegation resolves the nearest selector match inside the host and cancels only that row’s pending, visible or focused presentation before the row’s activation callback runs; it does not cancel the click. Pending content whose factory has not run stays uncreated. A visible tip uses native hiding and keeps its content through exit. With `focus:true`, the activated row stays dismissed until focus leaves: descendant hover does not immediately reopen it, and the tooltip does not consume the next Escape.

Retained targets that become hidden, including through a hidden ancestor, cancel pending tooltip display or dismiss the visible tooltip through native hiding. This also applies to the floating-tip and title profiles. It does not impose a visibility requirement on ordinary imperative click-dropdown presentations.

### Content lifecycle

`content(target, popup)` is synchronous and returns supported popup slot content. Native delay and target eligibility checks run first; a Promise is not a supported return. The popup keeps ownership of delay, positioning and exit animation.

- `onshow(detail)` runs after content is mounted and native positioning is ready. Start asynchronous subscriptions here.
- `onhidestart(detail)` runs when hiding begins. Stop subscriptions and invalidate pending writes, but retain the visual content for the exit animation.
- `oncontentretire(detail)` releases the logical content exactly once on committed replacement, completed hiding, or destruction. Unsubscribe defensively and dispose owned resources here, even if `onshow` never ran.

The first two callbacks receive a frozen `{ target, content, container, popup }` snapshot; retirement adds `reason: 'replace' | 'hide' | 'destroy'`. The snapshot identifies that presentation, rather than later mutable popup fields; referenced DOM objects remain live. Callbacks use a null receiver: read `detail`, not `this`.

If the factory never runs, there is no created content to retire. If its result is canceled before mounting or showing, it still receives retirement. Merely queueing a replacement does not retire the visible content; canceled exits cannot retire a successor. A temporary sub-tip or `setContent`/`reapplyContent` slot change is not a new logical content lifetime.

This JavaScript integration fragment accepts a caller-owned `EventTarget` named `updates`. The caller can publish text with `updates.dispatchEvent(new CustomEvent('change', { detail: 'Updated text' }))`. The returned plugin goes in a containing element’s `plugins` array; `.row` identifies its tooltip targets. DOM nodes and event subscriptions use standard browser APIs.

```javascript
function liveTip(updates) {
    const _owners = new WeakMap();
    const _stop = (content) => _owners.get(content)?.abort();
    return Plugins.popup.tip({
        selector: '.row',
        hoverClosest: true,
        subTip: false,
        content(target) {
            const _content = document.createElement('span');
            _content.textContent = target.textContent;
            _owners.set(_content, new AbortController());
            return _content;
        },
        onshow({ content }) {
            updates.addEventListener('change', (event) => {
                content.textContent = String(event.detail);
            }, { signal: _owners.get(content).signal });
        },
        onhidestart({ content }) {
            _stop(content);
        },
        oncontentretire({ content }) {
            _stop(content);
            _owners.delete(content);
            content.remove();
        }
    });
}
```

---

## `popup.floatingTip`

<a id="entry-popup-floatingtip"></a>

Floating tooltip

Show delegated hover tips using the floatingTip popup profile.

Reuses one owned popup for delegated hover targets. Default matching tests the event target; hoverClosest:true resolves the nearest match inside the host and ignores transitions within that same target. Sub-tip content may temporarily replace a showing main tip unless subTip:false is supplied; returning restores the main content. With dismissOn:'click', row activation cancels its pending tip or starts native hiding; focused rows remain dismissed until focus leaves and do not consume the next Escape.

Install on a containing element and annotate intended targets.

Repeated application does not duplicate listeners. content(target, popup) runs synchronously after native delay; onshow starts subscriptions after mounting/positioning. onhidestart stops async work while preserving exit visuals. oncontentretire disposes each created presentation once with reason replace, hide or destroy, including content canceled before onshow. Slot/sub-tip swaps do not retire it. Unplug removes listeners and destroys the popup through that same retirement path. Retained targets that become hidden, including through a hidden ancestor, cancel pending display or hide the visible tip through the same lifecycle.

Without hoverClosest, nested descendants do not inherit ancestor hover matching. A factory that never runs has no content to retire. Lifecycle callbacks have a null receiver and frozen detail snapshots; referenced DOM objects remain live. Promise content factories are unsupported. Sub-tips need an already showing main popup. hoverClosest does not add keyboard help or change focus behavior. dismissOn:'click' does not change row activation, generic click-dropdown policy or focus matching.

Positional order: `tipAttr` → `subTip` → `subTipAttr` → `selector` → `content` → `showDelay` → `hideDelay` → `type` → `onshow` → `dynamic` → `position` → `bias` → `snapTo` → `autoFlip` → `focus` → `onhidestart` → `oncontentretire` → `hoverClosest` → `dismissOn`.

Common arguments: [popup.tip](#entry-popup-tip).

A floating tooltip variant that follows the cursor. No arrow. Type defaults to `PopupType.floatingTip`. Accepts all the same args as `popup.tip`.

```javascript jaml-playground
export default {
    type: 'container',
    plugins: [Plugins.popup.floatingTip({ showDelay: 100 })],
    components: [
        {
            type: 'indicator',
            cap: 'Hover me',
            value: 42,
            tip: 'This tip follows your cursor'
        }
    ]
};
```

---

## `popup.title`

<a id="entry-popup-title"></a>

Replace title with a hover tooltip

Replace native title tooltips with a framework hover popup.

Captures mouseenter on titled targets, temporarily clears the native title and shows its text in an owned popup. Moving to another titled target restores the previous target first.

Leaving or unmounting the active target restores its suppressed title. Unplug also restores the active title, removes listeners and destroys the owned popup, cancelling pending display. Reapplying the same instance does not duplicate listeners; separate hosts retain separate state. A retained title target becoming hidden, including through an ancestor, cancels pending display or hides the visible popup through native dismissal.

A newer nonempty title or removed title attribute is preserved during restoration. An external assignment of the same empty title is indistinguishable from the plugin suppression. Hover tooltips do not supply keyboard or focus help by themselves.

Positional order: `showDelay`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `showDelay` | `number` | `2000` | Delay in milliseconds before showing. |

Replaces a target’s native `title` tooltip with a framework popup. It temporarily suppresses the title and restores it on leave, target unmount, target switch or plugin removal. A newer nonempty title or a removed title attribute is preserved. An external assignment of the same empty title cannot be distinguished from the plugin’s suppression.

Removing the plugin detaches its listeners and destroys its popup, including pending display. Repeated application does not duplicate listeners. Use `popup.tip` for explicit tip content and provide keyboard/focus-accessible help when the product requires it.

```javascript jaml-playground
export default {
    type: 'container',
    plugins: ['popup.title(showDelay:200)'],
    components: [
        {
            type: 'button',
            cap: 'Save',
            attrs: { title: 'Save all changes to the server (Ctrl+S)' }
        }
    ]
};
```

---

## `popup.helper`

<a id="entry-popup-helper"></a>

Help content

Expose help text attached to native captions.

The cap trigger decorates/clicks a help caption. The label trigger creates focusable question-mark labels, shows help on hover/focus, and tracks caption/help changes.

Use native elements with cap slots and help content.

Unplug removes listeners, helper labels and the popup.

Choose trigger label when users need a separate keyboard-focusable help affordance.

Positional order: `trigger` → `showDelay` → `hideDelay` → `position` → `bias` → `autoFlip` → `container`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `trigger` | `string` | `cap` | Caption click or question-mark label hover.<br>Options: `cap`, `label` |
| `showDelay` | `number` | Not supplied | Delay in milliseconds before showing. |
| `hideDelay` | `number` | Not supplied | Delay in milliseconds before hiding. |
| `position` | `string` | Not supplied | Popup position. |
| `bias` | `numberOrString` | `-10` | Popup position bias. |
| `autoFlip` | `boolean` | Not supplied | Allow automatic position flipping. |
| `container` | `functionOrString` | Not supplied | Popup container resolver. |

Shows help content on click. Listens for clicks on `[jam-help] > [slot="cap"]` elements and displays the `jam-help` attribute content in a popup. Accepts additional `PapayaPopup` configuration args.

```javascript jaml-playground
export default {
    type: 'input',
    cap: 'API Key',
    help: 'Your API key can be found in the dashboard under Settings → API Keys. Keep it secret!',
    plugins: ['popup.helper']
};
```

---

## Dynamic tooltip

A tooltip that updates its content on `mousemove`, snaps to cursor, and stays at a fixed position:

```javascript jaml-playground
export default {
    type: 'container',
    styles: ['size.fullsize', 'background.grid(gap:3rem;width:0.1rem)'],
    tip: 'move cursor',
    onmousemove(e) {
        document.getElementById('jam-popup-tip')?.setContent(
            jame({
                type: 'indicator',
                value: `X: ${e.pageX}, Y: ${e.pageY}`,
                style: { whiteSpace: 'nowrap' }
            })
        );
    },
    plugins: [
        Plugins.popup.tip({
            dynamic: true,
            position: 'bottom-right',
            bias: jam.rem(1),
            snapTo: 'cursor',
            autoFlip: false
        })
    ]
};
```
