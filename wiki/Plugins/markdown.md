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

- `commonmark` uses standard Markdown rules, including four-column indented code and context-aware indentation inside lists and quotes.
- `gfm` adds tables, task lists, strikethrough, and extended autolinks.
- `mandarin` adds badges, emoji, highlighting/subscript/superscript, footnotes, math, Mermaid, navigation, and explicit style/playground directives. Code preserves literal source and is read-only when rendered from Markdown.

A syntax profile selects grammar, not trust. The default trusted policy preserves raw HTML, evaluated Mandarin styles and native playground execution. Select the safe policy explicitly for application-supplied untrusted Markdown.

## Content policy and playground ownership

`contentPolicy: 'safe'` applies to both static string rendering and `stream()`. It escapes raw HTML, permits relative links and `http:`, `https:` and `mailto:` links, rejects other schemes, protocol-relative links and control-character/backslash destinations, and replaces images with their literal alt text without fetching them. It suppresses evaluated document styles, inline auto-replacements, interactive badges/footnote tooltips, and math/Mermaid enhancement. Ordinary formatting, lists, tables and literal code remain available. Options, pre-built component objects and callbacks are trusted application inputs; this policy does not sanitize arbitrary JAML objects.

Safe Markdown with no `playground` hook treats executable fences as literal code. With a hook, only explicit Mandarin fences whose second info token is `jaml-playground` or `jaml-playground-result` are eligible. The former retains the native editable source and result; the latter shows the result only. `jaml-result` is a result CSS class, not a fence alias. Quoted fences never invoke the hook. Tool output and quoted examples should use a separate safe renderer without a hook when execution is not intended.

The hook requires an actual matching closing delimiter in static and streamed input. Parser `closed` records that delimiter separately from `open`: EOF and `finish()` can end an unclosed block without setting `closed`. Thus interrupted source remains inert even after finalization. Trusted native rendering without a hook retains its existing EOF behavior. Eligible results still activate through normal visibility or explicit print preparation; completion does not force invisible blocks to run.

```typescript signature
type MarkdownPlaygroundRequest = {
  container: HTMLElement;
  source: string;
  language?: string;
  blockId: string;
  revision: number;
  mode: 'source' | 'result';
  context: unknown;
  signal: AbortSignal;
};
type MarkdownPlayground = {
  context?: unknown;
  render(request: MarkdownPlaygroundRequest):
    void | (() => void) | Promise<void | (() => void)>;
};
```

`context` is passed by identity. `blockId` and monotonically increasing `revision` identify work within this document/block, not a durable application/session identifier. Each invocation gets a fresh result container. An edit aborts the previous signal, runs its cleanup and removes its container before replacement; teardown does the same. If an async invocation returns cleanup after replacement/destruction, that cleanup still runs. The hook must observe cancellation for its own requests, subscriptions and external resources. Late writes to its old container cannot overwrite the new container. Render failures follow Markdown's existing error/readiness path.

The hook replaces the built-in executor. It is an ownership seam, not a sandbox or a state bridge. The application owns isolation, capability validation, named actions, state synchronization and persistence. Do not call same-page evaluation on untrusted source. The following integration requires an application-provided isolated renderer:

```javascript
const markdown = new jam.MandarinMarkdown({
  contentPolicy: 'safe',
  playground: {
    context: { conversationId, messageId },
    render: request => isolatedRenderer.mount(request)
  }
});
// Refuse an older runtime that does not implement this additive policy.
if (markdown.contentPolicy !== 'safe') { throw new Error('Safe Markdown runtime required'); }
const model = jaml(container, markdown.parse(source));
```

Destroy the owning model/session when removing the message. Source edits use the native playground's document broker; they do not automatically publish application actions or persist state.

### Playground presentation

The fence marker chooses the presentation when parsing a document: `jaml-playground` creates an editable source pane plus a result pane; `jaml-playground-result` creates only the result. The public `playground(code, indent?, hideCode?)` builder makes the same choice at construction: `hideCode: true` omits the editor. It is not a visibility toggle for an already-rendered block.

The current renderer has no document option to make saved editable fences initially result-only with a Show-source control, and no native responsive stacking option for its two-pane layout. Editable previews also cap the result height; verify that every control remains reachable in a long form. The executor receives a result container and the selected `mode`. It may size that supplied container and its own children, including a full-width mount for an embedded view; account for its box sizing and containing pane. That hook does not own the sibling editor or choose the document layout. Keep the original Markdown unchanged when preserving source-offset block identities and application admission hashes. Select a result-only fence for newly authored conversational UI; request a focused renderer capability when existing editable content needs presentation controls.

## Instance Builder Methods

These methods build `ComponentOption` objects for use inside a document.

| Method                                 | Signature                                                                   | Description                                                                                    |
| -------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `doc(components)`                      | `(components: ComponentOption[]) => ComponentOption`                        | Wrap components in a document container.                                                       |
| `header(header, level?)`               | `(header: string, level?: number) => ComponentOption`                       | Create a header (<h1>-<h6>). Custom IDs via `{#id}` syntax. Subtitles via `(subtitle)` syntax. |
| `quote(quotes, indent?)`               | `(quotes: string \| ComponentOption[], indent?: number) => ComponentOption` | Create a blockquote container.                                                                 |
| `code(code, indent?, lang?)`           | `(code: string, indent?: number, lang?: string) => ComponentOption`         | Create a syntax-highlighted code block. Supports `'math'` (KaTeX) and `'mermaid'`.             |
| `playground(code, indent?, hideCode?)` | `(code: string, indent?: number, hideCode?: boolean) => ComponentOption`    | Create source plus preview, or only the result when `hideCode` is true.                        |
| `para(content, indent?)`               | `(content: string, indent?: number) => ComponentOption`                     | Create a paragraph.                                                                            |
| `img(src, alt?, indent?)`              | `(src: string, alt?: string, indent?: number) => ComponentOption`           | Create an image.                                                                               |
| `hr(indent?)`                          | `(indent?: number) => ComponentOption`                                      | Create a horizontal rule.                                                                      |
| `newline(height?, eof?)`               | `(height?: string, eof?: boolean) => ComponentOption`                       | Create an empty spacer line.                                                                   |
| `list(rows, indent?)`                  | `(rows: string[], indent?: number) => ComponentOption[]`                    | Create ordered/unordered/todo list items.                                                      |
| `table(rows, indent?)`                 | `(rows: any[][], indent?: number) => ComponentOption`                       | Create a table with optional striping and hover highlight.                                     |
| `vanilla(content)`                     | `(content: string) => ComponentOption[]`                                    | Insert raw HTML content.                                                                       |
| `footnote(key, content)`               | `(key: string, content: string) => void`                                    | Register a footnote definition.                                                                |
| `eof()`                                | `() => ComponentOption`                                                     | Create the end-of-document spacer.                                                             |
| `btt()`                                | `() => ComponentOption \| undefined`                                        | Create a "back to top" button (if `buildToc`).                                                 |
| `titleBar()`                           | `() => ComponentOption \| undefined`                                        | Create a sticky title bar (if `buildToc`).                                                     |
| `navigator()`                          | `() => ComponentOption \| undefined`                                        | Create the table-of-contents navigator (if `buildToc`).                                        |
| `parseString(value)`                   | `(value: string) => string`                                                 | Parse inline markdown formatting into HTML.                                                    |
| `escapeHtml(text)`                     | `(text: string) => string`                                                  | Escape HTML special characters.                                                                |
| `unescapeMd(value)`                    | `(value: string) => string`                                                 | Unescape escaped markdown characters.                                                          |

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
jamd('#app', `
# Hello World

This is a **paragraph** with *formatting*.

- Item 1
- Item 2
- Item 3
`);
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

In the Mandarin dialect, the explicit `jaml-playground` modifier enables an editable playground with live preview. `jaml-playground-result` hides the source editor. These modifiers activate only when the block is complete; other fence metadata leaves it as code.

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
const html = md.parseString(
  'Visit the **docs** at [example.com](https://example.com) for :rocket: fast setup.'
);
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
