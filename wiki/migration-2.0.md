# Migrating to JAML 2.0

JAML 2.0 expands native layout, previewing, streaming, reactive lifecycle and authoring support. Rebuild the runtime and use matching language-server, MCP and editor-extension artifacts; a development branch name does not identify a compatible bundle.

-   Classified framework events now use local subscriptions. Replace native listeners and ancestor capture for notifications such as `pannzoom`, lifecycle and named-slot changes with JAML handlers, `.on`/`.off` or `jam.bindEvent`/`jam.unbindEvent` on the emitting element. Native browser events retain their behavior; see [event subscriptions](JAM-UI/JAM-UI.md#framework-event-subscriptions).
-   Runtime style/plugin descriptors no longer own authoring prose. Use the catalog/inspection bridge instead of reading `.desc` directly from runtime builders.
-   Framework-owned custom DOM attributes use the `jam-` prefix. Review integrations that query older internal markers; prefer public properties/events over implementation markers. Caller-authored attributes and third-party contracts remain separate.
-   Workspace registry discovery respects gitignore by default. Configure `respectGitignore` explicitly when intentional discovery includes ignored files; `registryExclude` remains additive.
-   Modal presentation defaults to adaptive dialog/bottom-drawer selection based on host width. Set `presentation: 'dialog'` when an integration requires dialog presentation. Retained drawers and modal drawers have different close lifetimes; see [presentation](utils.md#adaptive-modal-presentation).
-   Undeclared style/plugin arguments are accepted by default; explicit `allowUnknown: false` still opts out. Declared-field validation and unknown-capability diagnostics remain active.

## Custom component removal overrides

Loop reconciliation now calls `removeComponent` with its supported numeric index overload rather than passing the child object. Custom overrides must retain the supported number, string and component arguments, including normal per-child destruction and refresh behavior. Numeric removal targets the exact current slot; externally mutated child arrays containing duplicate or deeply equal entries no longer imply first-equal-object removal. Ordinary object/reference removal keeps its existing behavior. This change does not add transaction isolation for reentrant list mutations.

## Integration limits

Grid resizing requires supported explicit tracks and placements, horizontal LTR layout and bounded row height; unsupported or ambiguous layouts do not become interactively resizable. See [grid](Styles/common/grid.md).

A preview resource's lifetime belongs to its preview session. Use changed revisions or explicit invalidation for changed/revoked content. For reactive computed object resources, materialize the descriptor in data and use a string-path alias; computed object props from `jaml.var` can reach descendants as raw binders. See [previewing](JAML/drawer-and-previewer.md#file-preview-definitions).

Scroll preparation and navigation retain their cancellation and owner boundaries. Application history loading, selection authority and user-intent cancellation are not transferred to geometry helpers. See [utilities](utils.md).
