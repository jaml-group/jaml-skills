# vanilla

**Type:** `"vanilla"` or `"vanilla-<tag>"` · **Element:** ordinary HTML

Use this representer when the browser element itself is the intended content, such as an image preview. `vanilla` creates a `<div>`; `vanilla-img` creates an `<img>`. It does not turn the element into a Jam-UI label or input. Prefer the native framework control when you need its selection, keyboard or value behavior.

JAML component ownership still supplies model bindings, `attrs`, styles, visibility and lifecycle. Use `attrs` for HTML attributes such as `src` and `alt`. Do not assume framework slots such as `cap` exist on an ordinary `<img>`. Authored `html` uses trusted HTML parsing; it is unnecessary for this recipe and is not an external-content sanitizer.

## Image preview

Keep the preview URL in runtime model data. Bind `src` through `attrs`, provide meaningful alternative text, and use `showIf` to control visibility. This example starts hidden and uses an embedded sample image so it can run without an external service:

```javascript jaml-playground
export default {
    type: 'container',
    vars: { attachmentPreview: null },
    components: [
        {
            type: 'button',
            cap: 'Show preview',
            onclick() {
                this.model.vars.attachmentPreview = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="96" height="64" viewBox="0 0 96 64"><rect width="96" height="64" rx="8" fill="hsl(210 70% 90%)"/><circle cx="72" cy="18" r="8" fill="hsl(40 90% 55%)"/><path d="M8 56 34 20 54 44 68 30 88 56Z" fill="hsl(210 60% 40%)"/></svg>');
            }
        },
        {
            type: 'button',
            cap: 'Hide preview',
            onclick() {
                this.model.vars.attachmentPreview = null;
            }
        },
        {
            type: 'vanilla-img',
            attrs: {
                src: jaml.var('attachmentPreview', source => source || null),
                alt: 'Attachment preview'
            },
            showIf: '!!{{attachmentPreview}}',
            styles: ['css(display:block;width:4rem;max-width:100%;max-height:12rem;object-fit:contain)']
        }
    ]
};
```

In the current binding path, an attribute binder returning `null` or `undefined` skips that write. On initial render this avoids adding an empty `src`; after a URL was assigned, clearing the model hides the image through `showIf` but retains the previous `src` attribute. If the application must remove it, explicitly remove the attribute through the owned element. Visibility changes do not revoke object URLs, cancel requests or dispose the element. The application owns URL selection, load/error handling and `URL.revokeObjectURL` for object URLs it creates.

For an external preview, write the chosen URL through runtime model data rather than interpolating it into authored JAML or HTML. See [runtime data](../JAML/binder.md#runtime-data-and-authored-definitions) and [visibility](../JAML/jaml-format.md#showif). For captioned text or icons use a [label](label.md#caption-content-and-visibility); an image-only label caption without an icon is considered empty.
