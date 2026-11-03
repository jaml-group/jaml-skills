# Static validation

The shared JAML language validator is an optional mechanical check. Use it when syntax, element/argument contracts or bindings are uncertain; a familiar reply using complete current contracts needs no routine tool call. Explicitly requested validation and required project checks still apply. It parses authored source without executing it or starting a browser. JSON, JavaScript modules and explicit JAMLL records use the same element, binding, style/plugin and argument diagnostics.

Choose the response and establish its required business inputs first. A validation result cannot decide whether UI is useful or supply missing facts. Keep [task inputs](JAML/conversational-ui.md#check-the-tasks-inputs) separate from API discovery, and retrieve only the contract needed to interpret a diagnostic or resolve an unanswered question.

## Select the format

With the `validate_jaml` MCP tool, send the raw source and its format:

```json
{
    "format": "jamll",
    "source": "{ type: 'container', vars: { count: 3 } }\n  { type: 'indicator', cap: 'Count', value: '{{count}}' }"
}
```

A `.jamll` filename also selects JAMLL. A record is one complete expression on one physical line; indentation supplies children, while inline `components` retain their order before indented additions. Do not include Markdown fences or `export default` in JAMLL input. Without an explicit format, brace-leading source is treated as JSON, otherwise as JavaScript; JAMLL is never inferred from this ambiguous prefix.

## Run without MCP

The `jaml` skill includes `scripts/validate.mjs`, a thin Node launcher. Resolve this path from the installed skill directory. It finds an installed `@jam/jaml-language-core` or the language core bundled with `@jam/jaml-playground-mcp`, in the current project or alongside the skill. It does not download packages or contain a second validator. Use a compatible installation that exposes the structured `validate` command; absence or an older command is a tool/setup limitation, not a clean validation result.

```sh
node /path/to/installed/jaml/scripts/validate.mjs reply.jamll
node /path/to/installed/jaml/scripts/validate.mjs - --format jamll --strict
```

The second command reads source from stdin. With language-core installed, `jaml-lsp validate` accepts the same arguments. `--max-diagnostics N` bounds returned diagnostics (default 200, maximum 500). Input is limited to 8 MiB. The one-shot command prints JSON and exits 0 for recognized source without errors, 1 for errors or unrecognized source; command/setup failure is nonzero. Warnings and unchecked expressions can still accompany exit 0.

For repeated checks, keep one `validate --jsonl` process open. Each stdin line is a JSON request with `source`, optional `format`, `fileName`, `strict` and `maxDiagnostics`; each stdout line is its result or an `error` object for an invalid request. JSON-escape newlines inside `source`. This mode shares the language metadata between requests while refreshing project configuration and registrations. Separate one-shot processes pay startup costs again.

## Interpret results

-   `recognized` distinguishes JAML from unrecognized input. Unrecognized is not passed.
-   `valid` means recognized with no static **errors**. Read `counts`, `diagnostics`, `configError` and `truncated`; warnings need a decision too.
-   Diagnostics have codes, severity and zero-based source ranges. A reported unknown type can be a runtime registration missing from the project context; establish its actual contract rather than inventing a replacement.
-   `coverage.unchecked` identifies JAMLL expressions or shapes whose full contract cannot be inspected, including dynamic records and builder output. Known parts can still receive diagnostics. An empty list does not prove runtime correctness; it is not an exhaustive audit of JavaScript behavior.

Fix a concrete supported diagnostic and recheck the changed source. Retrieve the owning reference only for a missing fact or an apparent analyzer limitation. Static checks cannot prove that a chosen capability fits the user's intent, that callbacks/lifecycle work, that assets exist, that chart text fits, or that data and prose are true. Builders may have supported static override checks while their arguments and returned definitions remain partly unchecked. Runtime and visual claims still need their own evidence.
