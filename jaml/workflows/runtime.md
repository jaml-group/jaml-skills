# Setup and runtime operations

Use current MCP schemas and the package README supplied by the server as the operating contract. Resolve the installed package and skill from the current environment.

## Skill verification

At first MCP use in a conversation, follow the server's bundled-skill verification once and share the result between playground and copilot. `jaml-playground-mcp skill-info --json` locates the bundle.

The portable distribution records `distribution: "@jam/skills"`, its independent `version` and the compatible framework version. Legacy skills used the runtime version as their skill version. For legacy metadata, compare its old framework version with the bundled framework baseline first and retain a newer legacy copy. Otherwise migrate to the distribution scheme before comparing independent distribution versions; keep a newer copy from the same scheme and preserve installed `LEARNED.md`. Follow the server's reload instructions after installation. Recheck only in a new conversation or after a relevant package change.

## Live playground

1. Use serve mode and the browser owner documented by the server. Validate source, start/reuse the playground, submit with `setjaml` and confirm `browserSync`.
2. After user edits, read `getjaml` before replacing source. Use rendered action tools for UI interaction.
3. Inspect the rendered tree and JAM host locators. Verify nonzero geometry, relevant wrapping/overlap, reactive state, requested interactions and lifecycle.
4. Check diagnostics and account separately for harness/resource noise and scenario failures.

## Existing app

Use copilot mode for an already-served app. Call `open_page` then `wait_ready`; require `jamReady:true` and `agentReady:true` before interaction. Inspect from a body-scoped snapshot and use rendered JAM host locators. After source or route changes, await readiness again and verify intended state, geometry, behavior and diagnostics.

Static `validate_jaml` is read-only. Live browser execution follows the user's authorization; an ordinary explanation or static review does not start a browser.

Keep local development control services on loopback unless the user explicitly requests a reviewed remote setup. Browser access and executable JAML can affect the connected application; static validation is not a sandbox.
