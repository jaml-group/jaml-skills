# input style variants

<!-- Generated from native authoring; do not edit. -->

[中文](input-style.zh.md)

**Element:** `jam-input` · **Type:** `element`

---

## Slots

| Slot    | Type    | Description                                 |
| ------- | ------- | ------------------------------------------- |
| `icon`  | slotted | Icon content                                |
| `cap`   | slotted | Label text                                  |
| `agent` | agent   | The native `<input>` / `<textarea>` element |

---

## Style variants

### `input.ghost`

<a id="entry-input-ghost"></a>

Ghost input

Compose a text input or textarea on an application-owned surface.

Makes the native input background transparent in normal, hover, focus, disabled and read-only states; removes its resting border width and shadow. Preserves the native focus outline, label, padding, radius, editing and row behavior. No arguments.

Use input or input-textarea with styles: ['input.ghost'] in the updated development runtime. Omit cap and icon when the composition needs no label.

This is a style, not a textarea subtype: input-textarea-ghost does not select the native textarea. For a shared composer focus outline, style the enclosing container with :focus-within and suppress the inner outline only on that input. File, color and external editor surfaces are not covered.

```javascript jaml-playground
export default {
    type: 'input-textarea',
    placeholder: 'Message',
    rows: 'auto',
    minRows: 1,
    maxRows: 8,
    styles: ['input.ghost']
};
```

### `input.showColorName`

<a id="entry-input-showcolorname"></a>

Show color name

Show the interpreted color name on a color input.

On initial application and valuechange, creates/updates a layer label using the uppercase Chroma color name and a readable foreground color.

Supply a valid color value.

This is a color label, not a palette registry or semantic color mapping.

Shows a color name overlay on color picker inputs — displays the human-readable color name above the input value. No args.

```javascript jaml-playground
export default [
    {
        type: 'input-color',
        value: '#ff6600',
        styles: ['input.showColorName']
    }
];
```

### `input.chocolate`

<a id="entry-input-chocolate"></a>

Chocolate

Give a color input the chocolate presentation.

Adds chocolate; the input template applies this treatment to the color input type.

Use a native color input.

Chocolate-style input — a distinct visual theme for input fields. No args.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Name',
        value: 'John Doe',
        styles: ['input.chocolate']
    }
];
```

### `input.code`

<a id="entry-input-code"></a>

Code editor

Configure the external code-editor integration for an input.

The native code input and explicit input.code formatting styles share one editor. Formatting defaults to off; the active style supplies Prettier options when formatting is enabled.

Use type: 'input-code' (or its 'code' alias) and make jam-input-code.js available through the host resource setup. Set lang and autoFormat: true when formatted value updates are desired.

The style does not bundle editor resources. Applying it to a plain input is not a substitute for selecting the native code input type.

Positional order: `semi` → `singleQuote` → `trailingComma` → `printWidth`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `semi` | `boolean` | `true` | Semicolons |
| `singleQuote` | `boolean` | `true` | Single quotes |
| `trailingComma` | `string` | `none` | Trailing commas |
| `printWidth` | `number` | `999` | Print width |

Use `type: 'input-code'` for an editable code value; `input.code(...)` configures its editor. Load the `jam-input-code.js` bundle through the host resource setup. Choose `lang` and set `autoFormat: true` to format value updates; formatting defaults to off. The native code input and explicit formatting style share one editor.

```javascript jaml-playground
export default [
    {
        type: 'input-code',
        lang: 'JavaScript',
        autoFormat: true,
        value: "const greeting = 'hello world'",
        styles: ['input.code(semi:false;singleQuote:true;trailingComma:none;printWidth:80)']
    },
    {
        type: 'input-code',
        lang: 'JavaScript',
        autoFormat: true,
        value: 'let x = 1; let y = 2;',
        styles: ['input.code(semi:true;singleQuote:false)']
    }
];
```

### `input.code.withPadding`

<a id="entry-input-code-withpadding"></a>

Code editor padding

Adjust padding around an integrated code input.

Adds with-padding and sets the code-padding variable.

Compose with the installed code-input integration; this does not install an editor.

Positional order: `padding`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `padding` | `string` | `0.25rem` | Padding |

Code editor with inner padding — adds padding inside the code editor area.

```javascript jaml-playground
export default [
    {
        type: 'input-code',
        value: 'const x = 42;',
        styles: ['input.code.withPadding(padding:0.5rem)']
    },
    {
        type: 'input-code',
        value: 'const y = 7;',
        styles: ['input.code.withPadding']
    }
];
```

### `input.autoRows`

<a id="entry-input-autorows"></a>

Automatic row count

Grow a textarea to fit its current text within row limits.

After value readiness, measures text rows on valuechange and resize and clamps the native textarea rows between minRows and maxRows.

Requires an input whose agent is an HTMLTextAreaElement; other input agents are ignored.

Positional order: `minRows` → `maxRows`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `minRows` | `number` | `1` | Minimum rows |
| `maxRows` | `number` | `10` | Maximum rows |

Auto-resize textarea rows — dynamically adjusts the number of rows to fit the content.

```javascript jaml-playground
export default [
    {
        type: 'input-textarea',
        value: 'Line one\nLine two\nLine three',
        styles: ['input.autoRows(minRows:2;maxRows:8)']
    },
    {
        type: 'input-textarea',
        value: 'Single line',
        styles: ['input.autoRows']
    }
];
```

---

## Usage

```javascript jaml-playground
export default {
    type: 'input-code',
    lang: 'JavaScript',
    autoFormat: true,
    value: 'const options = { enabled: true, name: "Sample" };',
    styles: ['input.code(semi:false;singleQuote:true;trailingComma:all)']
};
```

## `input.grid`

<a id="entry-input-grid"></a>

Notes: [`grid`](common/grid.md#entry-grid).

Positional order: `templateColumns` → `templateRows` → `autoColumns` → `autoRows` → `templateAreas` → `gap` → `area`.

| Argument | Type | Contract |
| --- | --- | --- |
| `templateColumns` | `string` | Column template |
| `templateRows` | `string` | Row template |
| `autoColumns` | `string` | Automatic columns |
| `autoRows` | `string` | Automatic rows |
| `templateAreas` | `string` | Template areas |
| `gap` | `string` | Gap |
| `area` | `string` | Grid area<br>`{"cssKey":"gridArea"}` |

## `input.text`

<a id="entry-input-text"></a>

Notes: [`text`](common/text.md#entry-text).

Positional order: `font` → `size` → `weight` → `style` → `decoration` → `spacing` → `shadow` → `align` → `whitespace` → `lineheight` → `userselect` → `indent` → `caretColor` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `font` | `string` | Font family<br>`{"cssKey":"fontFamily"}` |
| `size` | `string` | Size<br>`{"cssKey":"fontSize"}` |
| `weight` | `string` | Font weight<br>Options: `normal` — Normal, `bold` — Bold<br>`{"cssKey":"fontWeight"}` |
| `style` | `string` | Style<br>Options: `normal` — Normal, `italic` — Italic<br>`{"cssKey":"fontStyle"}` |
| `decoration` | `string` | Decoration<br>Options: `none` — None, `underline` — Underline<br>`{"cssKey":"textDecoration"}` |
| `spacing` | `string` | Gap<br>`{"cssKey":"letterSpacing"}` |
| `shadow` | `string` | Shadow<br>`{"cssKey":"textShadow"}` |
| `align` | `string` | Alignment<br>Options: `left` — Left aligned, `center` — Center, `right` — Right aligned<br>`{"cssKey":"textAlign"}` |
| `whitespace` | `string` | Whitespace<br>Options: `normal` — Normal, `nowrap` — No wrapping, `pre` — Preserve whitespace<br>`{"cssKey":"whiteSpace"}` |
| `lineheight` | `string` | Line height<br>Options: `normal` — Normal, `1` — Compact, `1.5` — Loose<br>`{"cssKey":"lineHeight"}` |
| `userselect` | `string` | User selection<br>Options: `auto` — Automatic, `none` — None<br>`{"cssKey":"userSelect"}` |
| `indent` | `string` | Indent<br>`{"cssKey":"textIndent"}` |
| `caretColor` | `string` | Caret color<br>`{"cssKey":"caretColor"}` |
| `color` | `string` | Text color<br>`{"cssKey":"color"}` |

## `input.color`

<a id="entry-input-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `input.inline`

<a id="entry-input-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `input.icon.text`

<a id="entry-input-icon-text"></a>

Notes: [`text`](common/text.md#entry-text).

Positional order: `font` → `size` → `weight` → `style` → `decoration` → `spacing` → `shadow` → `align` → `whitespace` → `lineheight` → `userselect` → `indent` → `caretColor` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `font` | `string` | Font family |
| `size` | `string` | Size<br>`{"cssKey":"fontSize"}` |
| `weight` | `string` | Font weight<br>Options: `normal` — Normal, `bold` — Bold<br>`{"cssKey":"fontWeight"}` |
| `style` | `string` | Style<br>Options: `normal` — Normal, `italic` — Italic<br>`{"cssKey":"fontStyle"}` |
| `decoration` | `string` | Decoration<br>Options: `none` — None, `underline` — Underline<br>`{"cssKey":"textDecoration"}` |
| `spacing` | `string` | Gap<br>`{"cssKey":"letterSpacing"}` |
| `shadow` | `string` | Shadow |
| `align` | `string` | Alignment<br>Options: `left` — Left aligned, `center` — Center, `right` — Right aligned<br>`{"cssKey":"textAlign"}` |
| `whitespace` | `string` | Whitespace<br>Options: `normal` — Normal, `nowrap` — No wrapping, `pre` — Preserve whitespace<br>`{"cssKey":"whiteSpace"}` |
| `lineheight` | `string` | Line height<br>Options: `normal` — Normal, `1` — Compact, `1.5` — Loose<br>`{"cssKey":"lineHeight"}` |
| `userselect` | `string` | User selection<br>Options: `auto` — Automatic, `none` — None<br>`{"cssKey":"userSelect"}` |
| `indent` | `string` | Indent<br>`{"cssKey":"textIndent"}` |
| `caretColor` | `string` | Caret color<br>`{"cssKey":"caretColor"}` |
| `color` | `string` | Text color |

## `input.text.mono`

<a id="entry-input-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family.

## `input.unit.text`

<a id="entry-input-unit-text"></a>

Notes: [`text`](common/text.md#entry-text).

Positional order: `font` → `size` → `weight` → `style` → `decoration` → `spacing` → `shadow` → `align` → `whitespace` → `lineheight` → `userselect` → `indent` → `caretColor` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `font` | `string` | Font family<br>`{"cssKey":"fontFamily"}` |
| `size` | `string` | Size<br>`{"cssKey":"fontSize"}` |
| `weight` | `string` | Font weight<br>Options: `normal` — Normal, `bold` — Bold<br>`{"cssKey":"fontWeight"}` |
| `style` | `string` | Style<br>Options: `normal` — Normal, `italic` — Italic<br>`{"cssKey":"fontStyle"}` |
| `decoration` | `string` | Decoration<br>Options: `none` — None, `underline` — Underline<br>`{"cssKey":"textDecoration"}` |
| `spacing` | `string` | Gap<br>`{"cssKey":"letterSpacing"}` |
| `shadow` | `string` | Shadow<br>`{"cssKey":"textShadow"}` |
| `align` | `string` | Alignment<br>Options: `left` — Left aligned, `center` — Center, `right` — Right aligned<br>`{"cssKey":"textAlign"}` |
| `whitespace` | `string` | Whitespace<br>Options: `normal` — Normal, `nowrap` — No wrapping, `pre` — Preserve whitespace<br>`{"cssKey":"whiteSpace"}` |
| `lineheight` | `string` | Line height<br>Options: `normal` — Normal, `1` — Compact, `1.5` — Loose<br>`{"cssKey":"lineHeight"}` |
| `userselect` | `string` | User selection<br>Options: `auto` — Automatic, `none` — None<br>`{"cssKey":"userSelect"}` |
| `indent` | `string` | Indent<br>`{"cssKey":"textIndent"}` |
| `caretColor` | `string` | Caret color<br>`{"cssKey":"caretColor"}` |
| `color` | `string` | Text color<br>`{"cssKey":"color"}` |

## `input.unit.color`

<a id="entry-input-unit-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `input.unit.inline`

<a id="entry-input-unit-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `input.color.accent`

<a id="entry-input-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `input.unitslot.text`

<a id="entry-input-unitslot-text"></a>

Notes: [`text`](common/text.md#entry-text).

Positional order: `font` → `size` → `weight` → `style` → `decoration` → `spacing` → `shadow` → `align` → `whitespace` → `lineheight` → `userselect` → `indent` → `caretColor` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `font` | `string` | Font family<br>`{"cssKey":"fontFamily"}` |
| `size` | `string` | Size<br>`{"cssKey":"fontSize"}` |
| `weight` | `string` | Font weight<br>Options: `normal` — Normal, `bold` — Bold<br>`{"cssKey":"fontWeight"}` |
| `style` | `string` | Style<br>Options: `normal` — Normal, `italic` — Italic<br>`{"cssKey":"fontStyle"}` |
| `decoration` | `string` | Decoration<br>Options: `none` — None, `underline` — Underline<br>`{"cssKey":"textDecoration"}` |
| `spacing` | `string` | Gap<br>`{"cssKey":"letterSpacing"}` |
| `shadow` | `string` | Shadow<br>`{"cssKey":"textShadow"}` |
| `align` | `string` | Alignment<br>Options: `left` — Left aligned, `center` — Center, `right` — Right aligned<br>`{"cssKey":"textAlign"}` |
| `whitespace` | `string` | Whitespace<br>Options: `normal` — Normal, `nowrap` — No wrapping, `pre` — Preserve whitespace<br>`{"cssKey":"whiteSpace"}` |
| `lineheight` | `string` | Line height<br>Options: `normal` — Normal, `1` — Compact, `1.5` — Loose<br>`{"cssKey":"lineHeight"}` |
| `userselect` | `string` | User selection<br>Options: `auto` — Automatic, `none` — None<br>`{"cssKey":"userSelect"}` |
| `indent` | `string` | Indent<br>`{"cssKey":"textIndent"}` |
| `caretColor` | `string` | Caret color<br>`{"cssKey":"caretColor"}` |
| `color` | `string` | Text color<br>`{"cssKey":"color"}` |

## `input.capslot.layout`

<a id="entry-input-capslot-layout"></a>

Notes: [`layout`](common/layout.md#entry-layout).

Positional order: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| Argument | Type | Contract |
| --- | --- | --- |
| `display` | `string` | Display mode<br>`{"cssKey":"display"}` |
| `position` | `string` | Position<br>`{"cssKey":"position"}` |
| `order` | `number` | Order<br>`{"cssKey":"order"}` |
| `overflow` | `string` | Overflow<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | Gap |
| `zIndex` | `number` | Layer order<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | Box sizing<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | Transform<br>`{"cssKey":"transform"}` |
| `transition` | `string` | Transition<br>`{"cssKey":"transition"}` |

## `input.unitslot.color`

<a id="entry-input-unitslot-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `input.background.tint`

<a id="entry-input-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `input.iconslot.layout`

<a id="entry-input-iconslot-layout"></a>

Notes: [`layout`](common/layout.md#entry-layout).

Positional order: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| Argument | Type | Contract |
| --- | --- | --- |
| `display` | `string` | Display mode<br>`{"cssKey":"display"}` |
| `position` | `string` | Position<br>`{"cssKey":"position"}` |
| `order` | `number` | Order<br>`{"cssKey":"order"}` |
| `overflow` | `string` | Overflow<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | Gap |
| `zIndex` | `number` | Layer order<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | Box sizing<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | Transform<br>`{"cssKey":"transform"}` |
| `transition` | `string` | Transition<br>`{"cssKey":"transition"}` |

## `input.unitslot.inline`

<a id="entry-input-unitslot-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `input.unitslot.layout`

<a id="entry-input-unitslot-layout"></a>

Notes: [`layout`](common/layout.md#entry-layout).

Positional order: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| Argument | Type | Contract |
| --- | --- | --- |
| `display` | `string` | Display mode<br>`{"cssKey":"display"}` |
| `position` | `string` | Position<br>`{"cssKey":"position"}` |
| `order` | `number` | Order<br>`{"cssKey":"order"}` |
| `overflow` | `string` | Overflow<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | Gap |
| `zIndex` | `number` | Layer order<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | Box sizing<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | Transform<br>`{"cssKey":"transform"}` |
| `transition` | `string` | Transition<br>`{"cssKey":"transition"}` |

## `input.extraslot.layout`

<a id="entry-input-extraslot-layout"></a>

Notes: [`layout`](common/layout.md#entry-layout).

Positional order: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| Argument | Type | Contract |
| --- | --- | --- |
| `display` | `string` | Display mode<br>`{"cssKey":"display"}` |
| `position` | `string` | Position<br>`{"cssKey":"position"}` |
| `order` | `number` | Order<br>`{"cssKey":"order"}` |
| `overflow` | `string` | Overflow<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | Gap |
| `zIndex` | `number` | Layer order<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | Box sizing<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | Transform<br>`{"cssKey":"transform"}` |
| `transition` | `string` | Transition<br>`{"cssKey":"transition"}` |

## `input.labelslot.layout`

<a id="entry-input-labelslot-layout"></a>

Notes: [`layout`](common/layout.md#entry-layout).

Positional order: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| Argument | Type | Contract |
| --- | --- | --- |
| `display` | `string` | Display mode<br>`{"cssKey":"display"}` |
| `position` | `string` | Position<br>`{"cssKey":"position"}` |
| `order` | `number` | Order<br>`{"cssKey":"order"}` |
| `overflow` | `string` | Overflow<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | Gap |
| `zIndex` | `number` | Layer order<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | Box sizing<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | Transform<br>`{"cssKey":"transform"}` |
| `transition` | `string` | Transition<br>`{"cssKey":"transition"}` |

## `input.text.size.l`

<a id="entry-input-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `input.text.size.m`

<a id="entry-input-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `input.text.size.s`

<a id="entry-input-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `input.text.size.xl`

<a id="entry-input-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `input.text.size.xs`

<a id="entry-input-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `input.text.size.3xl`

<a id="entry-input-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `input.text.size.4xl`

<a id="entry-input-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `input.text.size.xxl`

<a id="entry-input-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `input.text.size.xxs`

<a id="entry-input-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `input.unit.color.accent`

<a id="entry-input-unit-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `input.unit.background.tint`

<a id="entry-input-unit-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `input.unitslot.color.accent`

<a id="entry-input-unitslot-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `input.unitslot.background.tint`

<a id="entry-input-unitslot-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `input.unit.text.size.l`

<a id="entry-input-unit-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `input.unit.text.size.m`

<a id="entry-input-unit-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `input.unit.text.size.s`

<a id="entry-input-unit-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `input.unit.text.size.xl`

<a id="entry-input-unit-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `input.unit.text.size.xs`

<a id="entry-input-unit-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `input.unit.text.size.3xl`

<a id="entry-input-unit-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `input.unit.text.size.4xl`

<a id="entry-input-unit-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `input.unit.text.size.xxl`

<a id="entry-input-unit-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `input.unit.text.size.xxs`

<a id="entry-input-unit-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `input.unitslot.text.size.l`

<a id="entry-input-unitslot-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `input.unitslot.text.size.m`

<a id="entry-input-unitslot-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `input.unitslot.text.size.s`

<a id="entry-input-unitslot-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `input.unitslot.text.size.xl`

<a id="entry-input-unitslot-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `input.unitslot.text.size.xs`

<a id="entry-input-unitslot-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `input.unitslot.text.size.3xl`

<a id="entry-input-unitslot-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `input.unitslot.text.size.4xl`

<a id="entry-input-unitslot-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `input.unitslot.text.size.xxl`

<a id="entry-input-unitslot-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `input.unitslot.text.size.xxs`

<a id="entry-input-unitslot-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.
