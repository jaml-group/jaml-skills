---
name: jaml-knowledge
description: Build and maintain source-grounded skill resources for choosing and composing JAML registry capabilities, including plugins, styles, CCs, usages, suffixes and builders. Use when creating or correcting reusable design knowledge, selection guidance or composition resources from framework or package evidence.
license: MIT
---

# JAML knowledge

Turn verified implementation and usage knowledge into compact resources that help agents choose and compose capabilities. Work across registry families while preserving each family's actual contract. The output may combine an intent index, focused selection guidance, composition recipes and pointers to generated API facts; a runtime API catalog alone does not explain a design choice.

## Caller and scope

Callers such as documentation-maintenance or composition skills resolve the declared skill name `jaml-knowledge` from their installed skill catalog and read its actual `SKILL.md`. An explicitly located authoritative `jaml-skills` checkout may supply `jaml-knowledge/SKILL.md` instead. Resolve this skill's resources relative to that file; never assume a sibling checkout or user directory. If unavailable, report the missing dependency and continue independent work without silently copying this methodology into a caller.

Carry the caller's target repository/package, requested knowledge change, consumer, evidence baseline and allowed actions into this workflow. A docs-only assignment changes authorized knowledge resources; it does not authorize runtime changes, new metadata schemas, registry migration or publication. The caller retains its incremental-update, generator, verification and baseline duties.

Reason broadly within the authorized maintenance scope so consumers can retrieve narrowly. Keep Choose (selection), Compose (exact usable contracts), Explain (mechanisms/rationale) and Maintain (source evidence/corrections) as logical views of existing owners. A focused consumer view must retain critical prerequisites, state ownership, persistence, cleanup and uncertainty; it must not force normal composition through this maintenance workflow.

## Build and maintain knowledge

1. **Find owners and consumers.** Inspect the target's registries, exports/registrations, definitions, usage sites and supported discovery tools. Identify affected capabilities, their package/version identities, current knowledge owners and consumer entry points. Include discovered registry extensions without assuming the framework catalog covers them. Read [registry contracts](references/registry-contracts.md) for the families in scope.

2. **Establish the decision evidence.** Inspect actual implementation, representative uses and relevant tests. Capture the intent served, when to use or avoid it, prerequisites, behavior, appearance, composition and alternatives, lifecycle/cleanup and caveats where relevant. Explain a supported combination and a plausible no-fit case. Check inputs and effective variant constraints where supported. Distinguish verified restrictions, observed defaults/sample data, intrinsic domain semantics and unknowns; a sample's size or shape is not an eligibility limit. Optional business overlays may add vocabulary and recipes but must preserve the underlying capability's restrictions.

3. **Update the authoritative owner.** Where source metadata ownership is implemented, write authorized facts into the actual definitions using their supported schema, then reuse existing extractors/exporters/generators. Where it is absent, update the explicit curated owner and record the coverage gap; preserve that ownership until migration is authorized. These knowledge dimensions are investigation prompts, not a mandatory schema or permission to add fields. Keep one authoritative fact and link its projections. Use literal prose by default; only explicit `@tr(...)` requests localization through the existing shared parser/i18n contract. Preserve expressions until consumer locale resolution, and verify support in the target version. Do not fabricate catalogs or a second translator.

4. **Shape resources around decisions.** Reuse the existing consumer skill's entry points. Put compact intent-to-capability pointers near the task that needs them; disclose family/entry details and cross-registry composition recipes on demand. Retain stable identity, prerequisites, alternatives and uncertainty alongside the decision they affect. Link generated API facts instead of repeating their tables. Keep shared instructions in English; localized capability prose uses the existing i18n path. A new resource needs a reachable pointer and a distinct decision to support; avoid one skill per registry entry. Ordinary composition consumes these resources without triggering a whole-library enrichment pass.

5. **Verify and evolve.** Run the target's authorized, trusted extraction/generation mechanism and relevant resource/distribution checks; never import arbitrary external application or dependency modules just to discover facts. Compare resulting knowledge with its source and test a representative choice/composition plus rejection or fallback. Label static inspection separately from runtime evidence. Update stale owners and incoming pointers together, keep unresolved claims explicit, and retain consequential implementation evidence in the private maintenance owner. Public resources contain reusable contracts and methodology, not private source, local paths or experiment records. For a requested comparative experiment, read [evaluation](references/evaluation.md); benchmarking is not required for every edit.

Return the changed owners/resources and their discovery paths, source/runtime baseline, verification level, gaps and remaining owner actions. Completion means the intended consumer can find accurate selection/composition guidance and resolve its required resources; a generated file alone is insufficient.

## Research basis

[WebDesignIter: Co-Evolving Design Knowledge for Repository-Level Front-End Code Generation](https://arxiv.org/html/2607.10621v1) motivates maintaining design knowledge alongside source and feeding verification back into planning. This workflow adapts that idea to JAML resources; it neither reproduces the paper's system nor establishes its benchmark gains or token savings here.
