# Debug

1. Establish the exact failing scenario, expected behavior, version and relevant state. Separate the user's implementation from harness, build and resource-loading problems.
2. Trace the responsible element, binding, style/plugin or theme contract through its owning reference and available implementation.
3. Reproduce with a focused JAML fixture when UI behavior matters. In Jam-UI source use the established `test/jamls/` fixture and testground route; in another app use its existing test location and runner.
4. Compare baseline and changed behavior before assigning a cause. Inspect mount/detach/destroy ownership, stale state, duplicated listeners and runtime readiness where relevant.
5. Fix the owning contract within the requested scope, then exercise the failing operation and relevant regression paths. Follow [runtime operations](runtime.md) for authorized browser work.

Done: the cause is supported by evidence, the correction addresses it, and verification distinguishes runtime proof from static checks. Report unresolved causes without recording speculation as a learned fact.
