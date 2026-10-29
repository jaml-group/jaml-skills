# MandarinMarkdown — Markdown-to-JAML Renderer

`MandarinMarkdown` (exposed globally as `jamd`) is a markdown parser and JAML document renderer. It converts markdown text into `ModelOption` structures that can be rendered using `Model.render()`. It supports headers, paragraphs, lists, tables, code blocks (with syntax highlighting), playgrounds (editable + preview), blockquotes, math (KaTeX), Mermaid diagrams, footnotes, checkboxes, inline formatting, and table-of-contents generation.

The generated document root uses the runtime renderer profile `stylize: 'markdown'`, which applies `.jam-markdown-style`. Callers do not need a `Styles.stylize.markdown` entry.

Complete documents and streamed fragments share one parser. It supports indented and fenced code, nested lists and quotes, reference links, and explicit syntax profiles. Compatibility tests include all CommonMark 0.31.2 examples and the pinned GFM extension examples.

## Global API: `jamd`

```typescript signature
jamd(container: string | HTMLElement, markdown: string, option?: Partial<MarkdownOption>): Model
jamd(container: string | HTMLElement, components: ComponentOption, option?: Partial<MarkdownOption>): Model
```

The global `jamd` function is an alias for `MandarinMarkdown.render()`.

## MarkdownOption

| Option          | Type                                  | Default      | Description                                                                                          |
| --------------- | ------------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------- |
| `margin`        | `string`                              | `undefined`  | Document margin. When `buildToc` is false, defaults to `'12.5%'`. When true, defaults to `'4.4rem'`. |
| `lineBefore`    | `string`                              | `'0.5em'`    | Margin-top for each block element.                                                                   |
| `lineAfter`     | `string`                              | `'0.5em'`    | Margin-bottom for each block element.                                                                |
| `lineHeight`    | `number`                              | `1.6`        | Line height for paragraph text (in `em`).                                                            |
| `firstLine`     | `string`                              | `''`         | Text indent for the first line of paragraphs.                                                        |
| `buildToc`      | `boolean`                             | `false`      | Enable table of contents, title bar, scroll progress bar, and "back to top" button.                  |
| `style`         | `Dictionary`                          | `{}`         | Additional CSS styles applied to the root container.                                                 |
| `styles`        | `StyleOption[]`                       | `[]`         | Additional `StyleOption` entries.                                                                    |
| `dialect`       | `'commonmark' \| 'gfm' \| 'mandarin'` | `'mandarin'` | Select CommonMark, GFM extensions, or GFM plus Mandarin extensions.                                  |
| `contentPolicy` | `'trusted' \| 'safe'`                 | `'trusted'`  | Restrict content originating in Markdown; see the policy contract below.                             |
| `playground`    | `MarkdownPlayground`                  | `undefined`  | Application-owned executor and context for eligible playground fences.                               |
| `eagerEditor`   | `boolean`                             | `false`      | Request code editors immediately, including offscreen code.                                          |
| `printMode`     | `boolean`                             | `false`      | Enable eager code-editor initialization for print-oriented documents.                                |

## Embedded documents in a parent scroll viewport

Use this composition when a transcript or feed owns vertical scrolling for all its Markdown fragments. The parent owns following, pause/resume and saved-position policy; each fragment grows naturally. Remove fixed/max-height caps and inner follow controllers from the fragment's wrappers. Keep document navigation disabled. Standalone documents that need their own viewport should retain the default layout.

There is currently no dedicated Markdown option for parent-owned scrolling. `style` targets the outer renderer container, so setting only its overflow does not change the inner document. The public `styles` extension can apply [scoped CSS](../Styles/common/css.md) to both. Register a reusable application style once, before rendering:

```javascript
Styles.registerPlugin('app.markdown-flow', {
    desc: 'Markdown flowing in its parent viewport',
    plugins: [
        Styles.css({ height: 'auto', overflow: 'visible' }),
        Styles.css({
            selector: '& > .jam-md-doc',
            height: 'auto',
            overflow: 'visible',
            scrollBehavior: 'auto'
        })
    ]
});

const markdownOptions = {
    contentPolicy: 'safe',
    buildToc: false,
    buildEof: false,
    keepScrollPosition: false,
    styles: ['app.markdown-flow']
};
```

Pass these options to either `MandarinMarkdown.render(target, source, markdownOptions)` or `MandarinMarkdown.stream(target, markdownOptions)`. The target must already be mounted in the application's parent viewport. Merge the style into existing option styles. Retain one stream per live fragment; finish it at completion and destroy it on teardown as described below. The application still owns the parent viewport's controller and its cleanup; this style creates no follow controller.

This is a generic style composition, **not a semantic Markdown scroll option**: `.jam-md-doc` is an internal renderer selector. Keep the override centralized and verify it when upgrading the runtime. Change only the outer container and its direct document child; do not set overflow on all descendants. Code, tables and editors retain their own horizontal scrolling. Setting only `overflowY: 'visible'` while leaving `overflowX: 'hidden'` is insufficient: that combination computes the vertical overflow to `auto`. The recipe sets both axes to `visible` on the document; it does not remove nested controls' own size or scroll policies.

Verify parent scroll growth during streaming, upward wheel over reasoning and answer content, paused reading during further growth, and document identity at completion. Also check wide code and tables in the target layout. An `overflowY: auto` computed value with equal client and scroll heights alone does not prove a wheel trap; inspect actual overflow and the input target when diagnosing intermittent behavior.

## Static Methods

| Method                                                    | Description                                                                                  |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `MandarinMarkdown.render(container, markdown, option?)`   | Parse markdown and render into the container.                                                |
| `MandarinMarkdown.render(container, components, option?)` | Render pre-built components into the container.                                              |
| `MandarinMarkdown.parse(markdown, option?)`               | Parse markdown into a `ModelOption` without rendering.                                       |
| `MandarinMarkdown.stream(container, option?)`             | Mount a document and return a `MarkdownStream` session.                                      |
| `MandarinMarkdown.prepareForPrint(container)`             | Publish queued fragments and await scoped editors and enhancements; returns `Promise<void>`. |

## Streaming

```ts
const reply = jam.MandarinMarkdown.stream('#answer', { buildToc: false });

for await (const fragment of decodedFragments) {
    reply.append(fragment);
}
await reply.finish();
```

Pass decoded strings. `append()` schedules a render batch; call `flush()` when the application needs to wait for the current content. Formatting remains provisional while syntax is incomplete. Later reference definitions can update earlier links. Completed blocks and unaffected inline elements retain their DOM; code inputs retain their editors and tables update existing rows.

| Member                     | Contract                                                                                                                                                       |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `append(fragment): this`   | Queue source and return the session. Rejects non-strings and appends after completion or destruction.                                                          |
| `flush(): Promise<void>`   | Publish accepted fragments and await current rendering/enhancement work. Does not finish the document. Current rendering failures reject.                      |
| `finish(): Promise<Model>` | Seal the source immediately, resolve final syntax, and await rendering. Repeated calls return the same completion promise.                                     |
| `destroy(): void`          | Cancel publication and destroy the owned model. Releases waiting flushes; an unfinished completion promise rejects. Destroying `model` also stops the session. |
| `source: string`           | Exact accepted source, including queued fragments; remains readable after destruction.                                                                         |
| `finished: boolean`        | Whether the session has been sealed and has not been destroyed. Rendering can still be pending; await `finish()` for readiness.                                |
| `model: Model`             | The session's mounted model.                                                                                                                                   |

Use `finish()` to retain an interrupted answer as a complete document; use `destroy()` when removing it. Final syntax is independent of fragment boundaries. Plain static rendering through `jamd()` continues to use the one-shot rendering path.

The public `jam.MarkdownParser` is DOM-free: `new jam.MarkdownParser({ dialect })` exposes `append()`, `finish()`, and `document`; `jam.MarkdownParser.parse(source, option?)` parses a complete document. Results contain block/inline nodes and exact source. Treat returned nodes and reference maps as read-only. `parsedCharacters` and `parsedInlineCharacters` measure block and inline scanner input, not total processing work.

## Printing

```ts
await jam.MandarinMarkdown.prepareForPrint('#answer');
window.print();
```

Preparation initializes code editors within the supplied container and waits for current math/diagram work. It publishes queued stream fragments without finishing the stream. A missing container rejects. Calling it repeatedly retains editor identity and selection.

Ordinary browser Print also has a synchronous source fallback for deferred code editors. Browser print events cannot wait for asynchronous bundles: the fallback preserves all literal code while an editor loads, and `afterprint` removes it. Explicit preparation is the path to fully initialized editor output. `eagerEditor: true` or `printMode: true` requests early initialization but does not itself return a readiness promise.

## Syntax profiles and content ownership

-   `commonmark` uses standard Markdown rules, including four-column indented code and context-aware indentation inside lists and quotes.
-   `gfm` adds tables, task lists, strikethrough, and extended autolinks.
-   `mandarin` adds badges, emoji, highlighting/subscript/superscript, footnotes, math, Mermaid, navigation, and explicit style/playground directives. Code preserves literal source and is read-only when rendered from Markdown.

A syntax profile selects grammar, not trust. The default trusted policy preserves raw HTML, evaluated Mandarin styles and native playground execution. Select the safe policy explicitly for application-supplied untrusted Markdown.

## Content policy and playground ownership

`contentPolicy: 'safe'` applies to both static string rendering and `stream()`. It escapes raw HTML, permits relative links and `http:`, `https:` and `mailto:` links, rejects other schemes, protocol-relative links and control-character/backslash destinations, and replaces images with their literal alt text without fetching them. It suppresses evaluated document styles, inline auto-replacements, interactive badges/footnote tooltips, and math/Mermaid enhancement. Ordinary formatting, lists, tables and literal code remain available. Options, pre-built component objects and callbacks are trusted application inputs; this policy does not sanitize arbitrary JAML objects.

Safe Markdown with no `playground` hook treats executable fences as literal code. With a hook, only explicit Mandarin fences whose second info token is `jaml-playground`, `jaml-artifact` or `jaml-content` are eligible. Playground retains editable source and result; artifact is a distinct result panel; content is a lightweight block between paragraphs. `jaml-result` is a result CSS class, not a fence alias. Quoted fences never invoke the hook. Tool output and quoted examples should use a separate safe renderer without a hook when execution is not intended.

The hook requires an actual matching closing delimiter in static and streamed input. Parser `closed` records that delimiter separately from `open`: EOF and `finish()` can end an unclosed block without setting `closed`. Thus interrupted source remains inert even after finalization. Trusted native `jaml-playground` rendering without a hook retains its existing EOF behavior; new artifact/content fences always require an explicit closing delimiter. Eligible results still activate through normal visibility or explicit print preparation; completion does not force invisible blocks to run.

```typescript signature
type MarkdownPlaygroundRequest = {
    container: HTMLElement;
    mount<T extends ModelOption | ModelOption[]>(content: T): (T extends ModelOption[] ? IModel[] : IModel) | undefined;
    source: string;
    language?: string;
    blockId: string;
    revision: number;
    mode: 'source' | 'result';
    presentation: 'playground' | 'artifact' | 'content';
    context: unknown;
    signal: AbortSignal;
};
type MarkdownPlayground = {
    context?: unknown;
    render(request: MarkdownPlaygroundRequest): void | (() => void) | Promise<void | (() => void)>;
};
```

`context` is passed by identity. `blockId` and monotonically increasing `revision` identify work within this document/block, not a durable application/session identifier. `container` is the actual native result pane, shared across revisions. Authored JAML roots mount directly under it, without an intermediate revision wrapper.

Use `request.mount(definition)` after asynchronous source preparation. It accepts a native JAML model definition or an array, returns the corresponding model or model array, and automatically owns their destruction. It returns `undefined` if the revision has retired, including retirement triggered synchronously by mounting. Multiple calls in one revision are allowed, such as adding response controls only when needed. Calling a returned model's `destroy()` early is supported; final cleanup tolerates that. The hook still returns `void` or a cleanup function, optionally through a promise; model arrays are returned by `mount`, not by the hook itself.

An edit or teardown aborts the previous signal and destroys its mounted models immediately, even if the hook's promise is still pending. A cleanup function returned after retirement still runs. Use that function for subscriptions and other resources not owned by `mount`. Cleanup must release only its own resources: never clear or remove the shared result container. Render failures follow Markdown's existing error/readiness path and retire the failed revision's owned mounts.

This direct-mount contract requires a runtime with `request.mount`. It replaces the older per-revision result wrapper. Existing hooks that use `container` directly must be reviewed: cached raw DOM references cannot prevent late writes into a newer revision. Check `signal.aborted` after asynchronous work, prefer `mount` for native JAML, and keep arbitrary DOM mutations and their cleanup within the active revision. The hook must cancel its own requests, subscriptions and external resources; the signal cannot cancel arbitrary JavaScript for it.

For a trusted, already-prepared definition, the integration shape is:

```javascript
async function renderPreparedView(request) {
    const definition = await loadTrustedDefinition(request.source);
    if (request.signal.aborted) return;
    const models = request.mount(definition);
    if (!models) return; // Retired during mounting.
    // The framework owns these models; return cleanup only for other resources.
}
```

`loadTrustedDefinition` is application-provided. `mount` executes native JAML; it does not make an untrusted definition safe.

The hook replaces the built-in executor. It is an ownership seam, not a sandbox or a state bridge. The application owns isolation, capability validation, named actions, state synchronization and persistence. Do not call same-page evaluation on untrusted source. The following integration requires an application-provided isolated renderer:

```javascript
const markdown = new jam.MandarinMarkdown({
    contentPolicy: 'safe',
    playground: {
        context: { conversationId, messageId },
        render: (request) => isolatedRenderer.mount(request)
    }
});
// Refuse an older runtime that does not implement this additive policy.
if (markdown.contentPolicy !== 'safe') {
    throw new Error('Safe Markdown runtime required');
}
const model = jaml(container, markdown.parse(source));
```

Destroy the owning model/session when removing the message. Source edits use the native playground's document broker; they do not automatically publish application actions or persist state.

### Playground presentation

Choose presentation independently of whether the content uses a purpose module, registered CC or native elements:

| Second fence token | Presentation                                                                                   | Choose when                                                                   |
| ------------------ | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `jaml-content`     | Intrinsically sized, left-aligned wrapping block between paragraphs, without panel decoration. | A few controls, metrics or a small chart belong naturally in the explanation. |
| `jaml-artifact`    | A distinct self-contained result panel.                                                        | The view should read as a separate interactive artifact.                      |
| `jaml-playground`  | Editable source plus result, with available-width pane reflow.                                 | Source inspection or editing is useful.                                       |

Default-export one JAML definition or a flat array; no authored outer container is required merely for layout. The native result owner still owns mounting, lazy activation and revision cleanup. Content is a block between paragraphs, not an inline insertion inside sentence text. Each element retains its own styles and semantic parts. Charts require ECharts in the mounting runtime and an explicit nonzero height.

For content only, the optional third info token `layout=grid` selects equal responsive tracks with a 12rem minimum capped at the available width. Omission, `layout=wrap`, and unknown values use intrinsic wrapping. Other presentations ignore this layout hint. Grid keeps source order; a child can span the full row with `style: { gridColumn: '1 / -1' }`. Explicit child widths remain authoritative within the host's maximum width. Use a full-row span instead of an unconditional numeric span that might create extra columns on a narrow surface. See the [compact native selection and panel example](../JAML/conversational-ui.md#native-elements-without-an-outer-wrapper).

The public builder accepts `playground(code, indent?, presentation?, lang?, blockId?, layout?)`. `presentation` is `false` (default, editable playground), `true` or `'artifact'` (artifact), or `'content'`; `layout` is `'wrap'` (default) or `'grid'` and applies only to content. Boolean builder calls remain supported. The executor keeps `mode: 'source' | 'result'` and also receives the explicit `presentation`. Presentation/layout does not create a new executor, persistence mechanism or capability tier.

`jaml-playground-result` is removed, not an alias. Existing saved occurrences remain literal code and cannot invoke the executor; hosts using the new contract must also reject them for response admission. Do not silently rewrite saved source: fence edits can shift later block offsets and invalidate durable source proof. A user-requested migration must address those identities separately.

The renderer has no saved-source Show-source toggle. Editable previews retain their height cap; verify long controls remain reachable in the installed host. The executor may size its supplied result container and descendants but does not own the sibling editor. Existing state, cancellation, print and trust contracts apply to all three presentations.

## Instance Builder Methods

These methods build `ComponentOption` objects for use inside a document.

| Method                                                               | Signature                                                                                                                                                           | Description                                                                                    |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `doc(components)`                                                    | `(components: ComponentOption[]) => ComponentOption`                                                                                                                | Wrap components in a document container.                                                       |
| `header(header, level?)`                                             | `(header: string, level?: number) => ComponentOption`                                                                                                               | Create a header (<h1>-<h6>). Custom IDs via `{#id}` syntax. Subtitles via `(subtitle)` syntax. |
| `quote(quotes, indent?)`                                             | `(quotes: string \| ComponentOption[], indent?: number) => ComponentOption`                                                                                         | Create a blockquote container.                                                                 |
| `code(code, indent?, lang?)`                                         | `(code: string, indent?: number, lang?: string) => ComponentOption`                                                                                                 | Create a syntax-highlighted code block. Supports `'math'` (KaTeX) and `'mermaid'`.             |
| `playground(code, indent?, presentation?, lang?, blockId?, layout?)` | `(code: string, indent?: number, presentation?: boolean \| 'artifact' \| 'content', lang?: string, blockId?: string, layout?: 'wrap' \| 'grid') => ComponentOption` | Create an editable playground, artifact panel or lightweight content block.                    |
| `para(content, indent?)`                                             | `(content: string, indent?: number) => ComponentOption`                                                                                                             | Create a paragraph.                                                                            |
| `img(src, alt?, indent?)`                                            | `(src: string, alt?: string, indent?: number) => ComponentOption`                                                                                                   | Create an image.                                                                               |
| `hr(indent?)`                                                        | `(indent?: number) => ComponentOption`                                                                                                                              | Create a horizontal rule.                                                                      |
| `newline(height?, eof?)`                                             | `(height?: string, eof?: boolean) => ComponentOption`                                                                                                               | Create an empty spacer line.                                                                   |
| `list(rows, indent?)`                                                | `(rows: string[], indent?: number) => ComponentOption[]`                                                                                                            | Create ordered/unordered/todo list items.                                                      |
| `table(rows, indent?)`                                               | `(rows: any[][], indent?: number) => ComponentOption`                                                                                                               | Create a table with optional striping and hover highlight.                                     |
| `vanilla(content)`                                                   | `(content: string) => ComponentOption[]`                                                                                                                            | Insert raw HTML content.                                                                       |
| `footnote(key, content)`                                             | `(key: string, content: string) => void`                                                                                                                            | Register a footnote definition.                                                                |
| `eof()`                                                              | `() => ComponentOption`                                                                                                                                             | Create the end-of-document spacer.                                                             |
| `btt()`                                                              | `() => ComponentOption \| undefined`                                                                                                                                | Create a "back to top" button (if `buildToc`).                                                 |
| `titleBar()`                                                         | `() => ComponentOption \| undefined`                                                                                                                                | Create a sticky title bar (if `buildToc`).                                                     |
| `navigator()`                                                        | `() => ComponentOption \| undefined`                                                                                                                                | Create the table-of-contents navigator (if `buildToc`).                                        |
| `parseString(value)`                                                 | `(value: string) => string`                                                                                                                                         | Parse inline markdown formatting into HTML.                                                    |
| `escapeHtml(text)`                                                   | `(text: string) => string`                                                                                                                                          | Escape HTML special characters.                                                                |
| `unescapeMd(value)`                                                  | `(value: string) => string`                                                                                                                                         | Unescape escaped markdown characters.                                                          |

## Inline Formatting

Within paragraphs and inline text, `parseString` supports:

| Syntax                  | Output                        |
| ----------------------- | ----------------------------- |
| `**bold**`              | `<strong>bold</strong>`       |
| `*italic*` / `_italic_` | `<em>italic</em>`             |
| `~~strike~~`            | `<del>strike</del>`           |
| `==highlight==`         | `<mark>highlight</mark>`      |
| `` `code` ``            | `<code>code</code>`           |
| `~subscript~`           | `<sub>subscript</sub>`        |
| `^superscript^`         | `<sup>superscript</sup>`      |
| `[link](url)`           | `<a href="url">link</a>`      |
| `![alt](src)`           | `<img src="src" alt="alt" />` |
| `[x]` / `[ ]`           | Disabled checkbox             |
| `[^key]`                | Footnote reference            |
| `【badge】`             | `<jam-badge>`                 |
| `:emoji_name:`          | Emoji character               |
| `$$math$$`              | KaTeX inline math             |
| `$math$`                | KaTeX inline math             |

## Examples

### Basic markdown rendering

```ts
jamd(
    '#app',
    `
# Hello World

This is a **paragraph** with *formatting*.

- Item 1
- Item 2
- Item 3
`
);
```

### Table of contents

```ts
jamd('#doc', markdownContent, {
    buildToc: true,
    lineBefore: '0.8em',
    lineHeight: 1.7
});
```

### Code block with playground

In the Mandarin dialect, the explicit `jaml-playground` modifier enables an editable playground with live preview. `jaml-artifact` creates a distinct result panel; `jaml-content` creates a lightweight between-paragraph result. Artifact/content require explicit closure. Unrecognized presentation markers remain code.

    ```javascript jaml-playground
    jaml('#preview', { type: 'text', value: 'Hello' });
    ```

### Programmatic document building

```ts
const md = new MandarinMarkdown({ buildToc: true, lineHeight: 1.8 });

const doc = md.doc([
    md.header('API Documentation', 1),
    md.para('This document describes the public API surface.'),
    md.header('Authentication', 2),
    md.para('All requests require a valid API key passed in the Authorization header.'),
    md.code(`curl -H "Authorization: Bearer <token>" https://api.example.com/v1/users`, 0, 'bash'),
    md.header('Endpoints', 2),
    md.table([
        ['Method', 'Path', 'Description'],
        ['GET', '/users', 'List all users'],
        ['POST', '/users', 'Create a user'],
        ['DELETE', '/users/:id', 'Delete a user']
    ])
]);

Model.render('#app', doc);
```

### Inline markdown in data

```ts
const md = new MandarinMarkdown();
const html = md.parseString('Visit the **docs** at [example.com](https://example.com) for :rocket: fast setup.');
// => 'Visit the <strong>docs</strong> at <a href="https://example.com">example.com</a> for 🚀 fast setup.'
```

### Footnotes

```ts
const md = new MandarinMarkdown();
md.footnote('src', 'See the official documentation at https://docs.example.com');

const rendered = md.parseString('This is a statement with a footnote[^src].');
```

### Math and diagrams

```ts
md.code('E = mc^2', 0, 'math');
md.code('graph TD; A-->B;', 0, 'mermaid');
```
