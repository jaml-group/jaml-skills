# layer.watermark

<!-- Generated from native authoring; do not edit. -->

[中文](watermark.zh.md)

`Styles.layer.watermark.*` — watermark and icon overlay layer effects.

---

## Variants

### `watermark`

<a id="entry-layer-watermark"></a>

Watermark

Add a faint text watermark behind host content.

Creates a watermark layer and an absolutely positioned text span, using the common text style settings and optional span style overrides.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Use text or a text callback for a decorative signature. Use layer.watermark.icon to derive a mark from the host icon slot.

The watermark is a faint decorative child, not tamper protection. Its callback supplies content during creation; it is not an automatic subscription to changing application data.

Positional order: `font` → `size` → `weight` → `style` → `decoration` → `spacing` → `shadow` → `align` → `whitespace` → `lineheight` → `userselect` → `indent` → `caretColor` → `color` → `text`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `font` | `string` | Not supplied | Font family<br>`{"cssKey":"fontFamily"}` |
| `size` | `string` | Not supplied | Size<br>`{"cssKey":"fontSize"}` |
| `weight` | `string` | Not supplied | Font weight<br>Options: `normal` — Normal, `bold` — Bold<br>`{"cssKey":"fontWeight"}` |
| `style` | `dictionary` | Not supplied | Style |
| `decoration` | `string` | Not supplied | Decoration<br>Options: `none` — None, `underline` — Underline<br>`{"cssKey":"textDecoration"}` |
| `spacing` | `string` | Not supplied | Gap<br>`{"cssKey":"letterSpacing"}` |
| `shadow` | `string` | Not supplied | Shadow<br>`{"cssKey":"textShadow"}` |
| `align` | `string` | Not supplied | Alignment<br>Options: `left` — Left aligned, `center` — Center, `right` — Right aligned<br>`{"cssKey":"textAlign"}` |
| `whitespace` | `string` | Not supplied | Whitespace<br>Options: `normal` — Normal, `nowrap` — No wrapping, `pre` — Preserve whitespace<br>`{"cssKey":"whiteSpace"}` |
| `lineheight` | `string` | Not supplied | Line height<br>Options: `normal` — Normal, `1` — Compact, `1.5` — Loose<br>`{"cssKey":"lineHeight"}` |
| `userselect` | `string` | Not supplied | User selection<br>Options: `auto` — Automatic, `none` — None<br>`{"cssKey":"userSelect"}` |
| `indent` | `string` | Not supplied | Indent<br>`{"cssKey":"textIndent"}` |
| `caretColor` | `string` | Not supplied | Caret color<br>`{"cssKey":"caretColor"}` |
| `color` | `string` | `hsl(var(--jam-ac-h), calc(var(--jam-ac-s) * 0.15), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 5))` | Text color<br>`{"cssKey":"color"}` |
| `text` | `functionOrString` | `watermark` | Text<br>Shorthand |

Text watermark overlay. Renders translucent text over the element.

Use the `style` dictionary for CSS on the watermark text span, for example `{ opacity: 0.2 }` in JavaScript.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.watermark(text:CONFIDENTIAL;size:1.5rem;weight:bold)'],
        components: [{ type: 'label', cap: 'Confidential document' }]
    },
    {
        type: 'card',
        styles: ['layer.watermark(text:DRAFT;color:hsl(0 75% 45%);size:2rem)'],
        components: [{ type: 'label', cap: 'Draft version' }]
    }
];
```

### `watermark.icon`

<a id="entry-layer-watermark-icon"></a>

Icon watermark

Echo the host icon as a large faint watermark.

Reads the first assigned icon-slot element on icon-slot changes, then creates an emoji or font-icon mark. Gradient, size and positioning settings control its appearance.

Use a framework host exposing an icon slot and connected readiness. The host needs an assigned icon for this layer to display a mark.

The icon-slot callback replaces the previous generated icon when a new source icon is available; layer teardown removes the child decoration.

Choose this for an icon-derived decoration and layer.watermark for caller-supplied text. Keep the host icon as the source of icon identity.

This is not a free-standing icon selector. Emoji use a grayscale/invert treatment; font-icon rendering depends on the framework icon font styles.

Positional order: `style` → `bottom` → `right` → `invert` → `gradient` → `size`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `style` | `string` | `fas` | Font Awesome style class for a non-emoji icon watermark: far, fad, fas or fal. Emoji watermarks use their text instead.<br>Options: `far`, `fad`, `fas`, `fal` |
| `bottom` | `numberOrString` | Not supplied | Bottom |
| `right` | `numberOrString` | Not supplied | Right side |
| `invert` | `boolean` | Not supplied | Invert emoji |
| `gradient` | `booleanOrString` | Not supplied | Gradient |
| `size` | `string` | `6em` | Dimensions |

Icon/emoji watermark with gradient and inversion options. Copies the host element's `icon` slot into a decorative layer; set the host `icon` param to an icon name or emoji.

```javascript jaml-playground
export default [
    {
        type: 'card',
        icon: '🔒',
        styles: ['layer.watermark.icon(size:4em;bottom:1rem;right:1rem)'],
        components: [{ type: 'label', cap: 'Secure content' }]
    },
    {
        type: 'card',
        icon: '⭐',
        styles: ['layer.watermark.icon(gradient:true;size:5em)'],
        components: [{ type: 'label', cap: 'Featured' }]
    }
];
```
