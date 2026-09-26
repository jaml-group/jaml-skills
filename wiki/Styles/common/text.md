# common.text

`Styles.text.*` -- font and text styling.

---

## Variants

### `text`

Applies font and text CSS properties to an element.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style text`.

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Hello",
        "styles": ["text(size:1.5rem;weight:bold;color:var(--jam-ac-color))"]
    }
]
```

### `number`

Number-specific font styling (DINPro, bold, 1.025em).

### `time`

Monospace time display styling (monospace, bold, 1.1em, tighter letter spacing).

### `digit`

Uses lining, tabular numerals so digits share a stable width. No args.

### `ui`

Uses the active theme's `--jam-typography-font-family-ui` font family. No args.

### `mono`

At the root, `text.mono` sets the CSS generic `monospace` font family.

### Contextual text presets

Nested common-text namespaces such as `cap.text` and `value.text` expose token-backed presets. Their `.mono` path uses `--jam-typography-font-family-mono`, and `.size.xxs`, `.size.xs`, `.size.s`, `.size.m`, `.size.l`, `.size.xl`, `.size.xxl`, `.size.3xl`, and `.size.4xl` use the matching `--jam-typography-font-size-*` token.

The root API is intentionally different: `text.size` is the single-value atom, not a preset namespace. Use `text.size(value:xs)` or `text(size:xs)` at the root; `text.size.xs` is only available under a contextual common-text namespace such as `cap.text.size.xs`.

### Individual property atoms

Each `text` arg is also available as a standalone style. For example:

-   `text.font(value:monospace)` -- sets font family
-   `text.size(value:1.5rem)` or `text.size(value:xs)` -- sets font size
-   `text.weight(value:bold)` -- sets font weight
-   `text.style(value:italic)` -- sets font style
-   `text.decoration(value:underline)` -- sets text decoration
-   `text.spacing(value:0.1em)` -- sets letter spacing
-   `text.shadow(value:1px 1px 2px black)` -- sets text shadow
-   `text.align(value:center)` -- sets text alignment
-   `text.whitespace(value:nowrap)` -- sets white-space handling
-   `text.lineheight(value:1.5)` -- sets line height
-   `text.userselect(value:none)` -- sets user select
-   `text.indent(value:2em)` -- sets text indent
-   `text.caretColor(value:red)` -- sets caret color
-   `text.color(value:red)` -- sets text color

Each atom variant accepts a single `value` argument.
