# Setup and runtime operations

Use current MCP schemas and the package README supplied by the server as the operating contract. Resolve the installed package and skill from the current environment.

## Skill verification

At first MCP use in a conversation, run `jaml-playground-mcp skill-info --json` and compare the installed skill's `version.json` → `framework.version` with the reported `framework.version`. Share this check between playground and copilot; recheck only in a new conversation or after a relevant package change. New MCP releases retain framework-baseline metadata and install the skill separately; older releases also report a bundled path. The result is an expected baseline, not a scan of the installed skill or a live latest-version query.

Matching nonempty framework baselines pass. Independent skill release versions such as `0.1.0-dev.0` are informational: a different or missing skill release version must not trigger an update when `framework.version` matches. Keep that installed skill unchanged.

Differing or missing framework baselines are compatibility questions. Report both values for review; do not infer compatibility from a newer skill release or framework version. Legacy metadata without `framework.version` also needs review; neither the independent `version` nor the distribution identifies a replacement baseline. Resolve the compatibility question before choosing an update.

When authorized setup requires an absent skill, install from the public source:

```sh
npx skills add jaml-group/jaml-skills --skill jaml
```

MCP releases with `install-skill` expose the same installer as `jaml-playground-mcp install-skill`. Choose the agent and project/global scope explicitly; for example, `--agent codex --global` installs for Codex across projects. Omit `--global` for project scope. Installation does not configure the MCP server.

Before updating, preserve local edits and installed `LEARNED.md`; the external installer does not merge them. Keep repository symlinks and update their owning checkout through its own workflow instead of overwriting them. After installation, restore preserved corrections where applicable and reread `framework.version` and compare it with the expected framework baseline. Report the result and reload the skill through the client, requesting a restart/reload only if needed. A successful installer exit alone does not prove compatibility. MCP startup and tool calls do not install or update skills automatically.

## Live playground

1. Use serve mode and the browser owner documented by the server. Validate source, start/reuse the playground, submit with `setjaml` and confirm `browserSync`.
2. After user edits, read `getjaml` before replacing source. Use rendered action tools for UI interaction.
3. Inspect the rendered tree and JAM host locators. Verify nonzero geometry, relevant wrapping/overlap, reactive state, requested interactions and lifecycle.
4. Check diagnostics and account separately for harness/resource noise and scenario failures.

## Existing app

Use copilot mode for an already-served app. Call `open_page` then `wait_ready`; require `jamReady:true` and `agentReady:true` before interaction. Inspect from a body-scoped snapshot and use rendered JAM host locators. After source or route changes, await readiness again and verify intended state, geometry, behavior and diagnostics.

Static `validate_jaml` is read-only. Live browser execution follows the user's authorization; an ordinary explanation or static review does not start a browser.

Keep local development control services on loopback unless the user explicitly requests a reviewed remote setup. Browser access and executable JAML can affect the connected application; static validation is not a sandbox.
