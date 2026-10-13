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

Positional order: `target` → `getcontent` → `click2Hide` → `clickElsewhere2Hide`.

| Argument | Type | Contract |
| --- | --- | --- |
| `target` | `string` | One class name identifying eligible direct children. |
| `getcontent` | `function` | Synchronous callback receiving the current child and returning popup content on each opening. |
| `click2Hide` | `boolean` | Forward native click dismissal; omission retains the dropdown default of false and existing callback ordering. |
| `clickElsewhere2Hide` | `boolean` | Forward native outside-click dismissal; omission retains true. |

## `popup.submenu`

<a id="entry-popup-submenu"></a>

Nested popup menu

Hover opens after 100 ms; leaving cancels pending opening. Click and ArrowRight/Enter/Space open immediately. On item exit a clipped safe triangle blocks underlying hover for at most 300 ms without timer renewal. Returning to the item or entering the submenu removes protection. Clicking the triangle closes that submenu branch and consumes the click. Expiry removes only protection. Position defaults right with top alignment; native placement options can override it. With click2Hide enabled, submenu action clicks close the entire ancestor popup chain after the callback; submenu-opening items keep ancestors open. Top alignment accounts for the first item inset.

Attach to content inside a PapayaPopup. Provide native menu items and use one submenu controller per menu. Submenu content may attach the same plugin for nesting.

Parent hide-start, destruction, item removal and unplug cancel owned work and close descendant popups. Escape/ArrowLeft closes the current submenu and restores item focus. Keyboard input clears triangle protection. Every opening creates a fresh popup. Normal dismissal plays collapse before destruction, including each ancestor and any already-closing branch. Pending presentations and forced teardown are destroyed immediately.

Positional order: `target` → `getcontent` → `triangleDebug`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `target` | `string` | Not supplied | Class name of submenu-opening items inside this menu container. |
| `getcontent` | `function` | Not supplied | Synchronous getcontent(item) returns native JAML content or nodes. |
| `triangleDebug` | `boolean` | `false` | Show the clipped pointer shield with var(--jam-color-primary-mask); false by default. |

Popup plugins attach tooltip, help, floating-tip, or more-action popups. Each variant owns its target discovery and interaction lifecycle while native popup infrastructure handles display and dismissal.

---

## `popup.tip`

<a id="entry-popup-tip"></a>

Show details on hover

Show delegated hover tips using the tip popup profile.

Watches mouseover targets matching selector or the tip attribute, reads supplied/attribute content and reuses one owned popup. Sub-tip content may replace a showing main tip unless subTip:false is supplied; returning to the main target restores its original content.

Install on a containing element and annotate intended targets.

Repeated application to the same host does not duplicate its delegation listener. Unplug removes that listener and destroys the owned popup, including pending display.

Matching tests the event target directly, not its closest matching ancestor. Sub-tip replacement requires a main popup that is already showing. Provide focus-accessible help separately where needed.

Positional order: `tipAttr` → `subTip` → `subTipAttr` → `selector` → `content` → `showDelay` → `hideDelay` → `type` → `onshow` → `dynamic` → `position` → `bias` → `snapTo` → `autoFlip` → `focus`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `tipAttr` | `string` | `jam-tip` | Attribute name to read tooltip content from. |
| `subTip` | `boolean` | Not supplied | Enable sub-tip replacement while the main popup is showing. Omitted or true enables it; false disables it. |
| `subTipAttr` | `string` | `jam-sub-tip` | Attribute name for sub-tip content. |
| `selector` | `string` | Not supplied | Selector for elements that show tips. |
| `content` | `functionOrString` | Not supplied | Static or computed tooltip content. |
| `showDelay` | `number` | Not supplied | Delay in milliseconds before showing. |
| `hideDelay` | `number` | Not supplied | Delay in milliseconds before hiding. |
| `type` | `string` | Not supplied | Popup profile type. |
| `onshow` | `function` | Not supplied | Callback when the popup shows. |
| `dynamic` | `boolean` | Not supplied | Keep content/position dynamic. |
| `position` | `string` | Not supplied | Popup position. |
| `bias` | `numberOrString` | Not supplied | Popup position bias. |
| `snapTo` | `string` | Not supplied | Snap target.<br>Options: `cursor`, `target` |
| `autoFlip` | `boolean` | Not supplied | Allow automatic position flipping. |
| `focus` | `boolean` | `false` |  |

Shows a tooltip popup on hover when the cursor enters an element with a `jam-tip` attribute (configurable via `tipAttr`). Sub-tip replacement is enabled when `subTip` is omitted or true; `subTip:false` disables it. A sub-tip target with a `jam-sub-tip` attribute updates an already showing main popup without closing it. Returning to the main target restores its original content. Matching tests the event target itself, so a nested label or icon does not inherit a matching ancestor’s tip automatically.

The show callback receives the event detail.

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

---

## `popup.floatingTip`

<a id="entry-popup-floatingtip"></a>

Floating tooltip

Show delegated hover tips using the floatingTip popup profile.

Watches mouseover targets matching selector or the tip attribute, reads supplied/attribute content and reuses one owned popup. Sub-tip content may replace a showing main tip unless subTip:false is supplied; returning to the main target restores its original content.

Install on a containing element and annotate intended targets.

Repeated application to the same host does not duplicate its delegation listener. Unplug removes that listener and destroys the owned popup, including pending display.

Matching tests the event target directly, not its closest matching ancestor. Sub-tip replacement requires a main popup that is already showing. Provide focus-accessible help separately where needed.

Positional order: `tipAttr` → `subTip` → `subTipAttr` → `selector` → `content` → `showDelay` → `hideDelay` → `type` → `onshow` → `dynamic` → `position` → `bias` → `snapTo` → `autoFlip` → `focus`.

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

Leaving or unmounting the active target restores its suppressed title. Unplug also restores the active title, removes listeners and destroys the owned popup, cancelling pending display. Reapplying the same instance does not duplicate listeners; separate hosts retain separate state.

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
