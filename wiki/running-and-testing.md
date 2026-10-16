# Run and test JAML

Choose the runtime before writing a page. The agent skill teaches authoring and includes Wiki references; the Jam-UI runtime executes the application. Installing the skill does not install that runtime or configure an MCP server.

## Choose a starting point

| Starting point                 | Setup owner                                            | Next step                                                                                                                     |
| ------------------------------ | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| An existing JAML application   | The application's README and selected runtime          | Run its documented build/server command, then test the affected route. Use MCP copilot when available.                        |
| A packaged JAML Playground MCP | The installed package's README and current MCP schemas | Configure serve mode, check compatibility, then start/reuse the playground. No framework source checkout is needed.           |
| A Jam-UI framework checkout    | That checkout's README, **Build & Test** section       | Provision the reviewed `@jam/skills` source link, build/start the development server, and use its real Playground/testground. |
| This Wiki/skill repository     | The jaml-skills README, **Check and package** section  | Check and package the skill; use a separate compatible runtime to verify examples.                                            |

A standalone JAML object needs no compilation. Its host application may still need a build for JavaScript modules, dependencies and assets. Run commands in the repository that owns those outputs.

## Link the Wiki when building the framework

A framework source build requires `node_modules/@jam/skills` to be an npm link to the selected jaml-skills checkout. Register the documentation checkout with `npm link`, then run `npm link @jam/skills --no-save` from the framework checkout after previewing the dependency changes. Follow the framework README for dependency installation, the link resolver, an existing-tree repair and exact build commands.

Confirm the resolved path is the intended checkout, its `wiki/index.md` and `compatibility.json` exist, and its framework baseline is the one selected for the build. Repeat this check after switching Node/npm or reinstalling dependencies. Preserve existing work and unrelated package links during repair. A skill-folder link does not satisfy this build dependency.

The consumer copies the linked Wiki into its output during the build. Editing a Wiki page needs the next consumer build, not a skill archive rebuild. Shipped Playground/MCP artifacts contain their Wiki assets and do not need your local link. This is why a current source page and a stale served page can differ.

## Run with a packaged MCP

Use the installed package README to configure `jaml-playground-mcp` in the client's MCP settings. Default/serve mode owns a playground; `copilot` mode connects to an already-running application. Installing the agent skill does not register either server. Keep local development control services on loopback unless remote access is explicitly required and reviewed.

Before first MCP use in a conversation, read the installed `jaml` skill and run the read-only CLI command:

```sh
jaml-playground-mcp skill-info --json
```

Compare the reported `framework.version` with the installed skill's `version.json` → `framework.version`. Matching nonempty baselines pass. Independent skill release versions are informational. Differing or missing baselines require compatibility review; installing the newest skill is not evidence of a match. Preserve installed local corrections before any authorized update.

For a playground:

1. Use the current tool schemas to start or reuse the playground and its documented browser owner.
2. If it contains user work, read `getjaml` before changing it. Submit a complete example with `setjaml` and follow the server's render contract.
3. Verify the new rendered state. A successful `browserSync` confirms command pickup, not render completion.

For an existing application, use copilot's `open_page` and `wait_ready`. Require `jamReady:true` and `agentReady:true`, and inspect any returned `error` before interacting. Verify the affected page again after source or route changes.

A timeout does not cancel a queued browser mutation. Read the current state before resubmitting. Use a fresh body/selector/JID scope when checking a change; an old cached matching locator is not evidence that the new render completed.

## Verify the result

For a first smoke test, use the complete [Local activity example](building-ui.md#a-small-composable-slice). It composes a native card, metric indicator, status and action. In the Wiki viewer, run its playground fence; in an editor or MCP playground, submit the complete exported object. A framework checkout also provides the real testground route documented in its README.

Check the observable sequence:

1. **Mount:** the card is visible with nonzero dimensions; the metric starts at **0** and the status at **Ready**. In framework testground, verify the fixture beneath `#result`; the route URL alone is insufficient.
2. **Interact:** click **Record a press** and observe **1 / Recorded**. Focus the button and activate it by keyboard; the count increases again.
3. **Inspect:** check a screenshot, relevant wrapping/overlap, console errors and failed resource requests. Read the failed response when a module has the wrong content type.
4. **Reset:** reload the scenario and confirm **0 / Ready**. This example owns local state; persistence is not expected.

For the actual feature, exercise its meaningful behavior: validation and submission for a form, the decision and dismissal paths for a confirmation, data refresh for a metric, or remount/cleanup for an owned subscription. Use the element's native caption, icon, value, unit and named slots before adding new structure. See [Think in JAML](JAML/purpose-and-composition.md) and [Choose native capabilities](choosing-native-capabilities.md).

Separate the evidence in your report: static parsing/registry validation, resource/packaging checks, and live interaction checks establish different things. Record the runtime tested, route/scenario, expected and observed result, and any remaining failure. A successful build does not prove that a page renders or an interaction works.

## If the page does not load

-   **Source build fails:** check the required Node version and Wiki link first, then the first build error. A development watcher can keep listening after a bundle failed.
-   **Module request returns HTML:** verify the requested URL, response body/type, selected server and emitted file. A missing module or stale build may be hidden by an HTML fallback; a MIME error alone does not identify which dependency is missing.
-   **Wiki differs from source:** verify the linked checkout and the build serving that port, then rebuild the consumer assets. Installing the agent skill does not refresh a running Wiki.
-   **MCP reports ready but the example is absent:** inspect errors and current DOM/state; verify the new render rather than treating command acknowledgment as completion.
-   **Static validation passes but UI fails:** inspect geometry, resource loading and native ownership/lifecycle. Fix the observed failure rather than weakening validation or adding unrelated framework overrides.
