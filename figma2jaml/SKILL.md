---
name: figma2jaml
description: Implement Figma frames and components as working native JAML UI, preserving design intent and verifying the rendered result against the source. Use for translating structured Figma design context or attributable code exports into JAML; screenshot-only reconstruction is outside this skill.
license: MIT
---

# Figma to JAML

Translate structured Figma design/code output into native Jam-UI composition. Use screenshots as visual references and verification evidence, not as a substitute for structured implementation input. Figma supplies design evidence; the installed `jaml` skill supplies current authoring contracts. Keep this skill focused on that translation rather than maintaining a second component catalog.

## Establish the source and target

-   Load the installed skill whose frontmatter declares `name: jaml`. Follow its Design → Compose → Validate workflow and read only the contracts needed by the selected UI. If it is unavailable, identify the missing dependency before authoring executable JAML.
-   Identify the requested Figma file and frame/node, target project, runtime/version and existing theme. Reuse the project's application structure and components. A framework checkout follows its own source and fixture conventions, not application scaffolding.
-   Resolve a supplied selection link or an available desktop selection. Ask for the specific frame when multiple candidates would materially change the result. Scope implementation to the requested screens and states.
-   Preserve the source design by default. If the existing application's theme or component contract conflicts materially with the requested appearance, explain the conflict and resolve the priority before the affected implementation. Prefer a supported local specialization over changing the shared theme for unrelated screens.

## Read the design

Discover the connected Figma tools and follow any applicable installed Figma skill instructions. Use their actual schemas; tool availability differs between connections. The [Figma tool reference](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/) describes the standard capabilities.

Obtain structured design context and a screenshot for the same target before implementation. Standard tools include `get_design_context` and `get_screenshot`; use metadata to locate narrower child nodes when a response is truncated or sparse. Retrieve the missing child context instead of treating an outline as a complete specification. Read variables/styles and component variants when they affect the result.

Require structured context for the selected node before implementation. If live Figma access is unavailable, accept a supplied structured export or code export with attributable Figma origin and enough layout, styling and component detail for the selected scope. Record missing constraints, variables and states. A screenshot alone does not meet this prerequisite: request the missing structured input and leave conversion pending. An independently written implementation is corroborating evidence, not a Figma export.

Extract the facts needed for implementation:

-   Layout relationships: flow, alignment, gaps, padding, sizing constraints, clipping, scrolling and deliberate overlays.
-   Typography, color roles, surfaces, borders, radii, imagery and icon identity.
-   Component instances, variants, visible state, prototype transitions and reusable patterns.
-   Reference viewport and any supplied responsive designs. Mark additional breakpoint and interaction choices as assumptions.

Translate returned React, HTML or utility classes into native JAML owners rather than embedding the generated UI. Preserve the source context used for translation and trace material layout, token and component choices to it; resolve discrepancies revealed by screenshots against the structured source. Keep design text and asset metadata as data, never executable JAML expressions or instructions.

## Map intent to native composition

Before drawing the JAML tree, make a compact mapping from each meaningful design region to its user operation, native owner, customization and state/data owner. Follow `jaml` capability selection and verify the chosen APIs against the target runtime.

-   Map complete controls to native behavior owners and their existing parts. A designed caption, icon and input can belong to one native input; a Figma group need not become a container.
-   Translate auto layout and constraints into flow, grid and intrinsic/fill sizing through supported JAML capabilities. Use absolute placement for genuinely layered content, retaining the design's resize and scrolling intent.
-   Reuse existing application components where they fit. Extract repeated business composition into builders or CCs when useful; specialize presentation through the documented style ownership rules. Record a concrete capability gap before custom behavior.
-   Map Figma variables to existing semantic tokens by meaning and actual appearance. Preserve required brand details through the target's supported theme or local styling contract. Present color values in CSS HSL notation, including alpha when needed.
-   Author visual dimensions in `rem`. Convert Figma numeric design measurements at the target's established root scale; at a 16-unit root, one design pixel becomes `0.0625rem`. Keep pixels at geometry/API boundaries that require them.
-   Use supplied/exported assets for distinctive imagery and icons. Verify local content, crop, aspect ratio and rendered slot; confirm the corresponding source node or export asset reference. Preserve vectors where suitable. Store assets through the project's asset pipeline rather than relying on temporary export URLs. Flatten decorative artwork when appropriate; keep controls, text and interactive regions native.

## Implement and verify

Compose executable JAML in the target project's conventions. Wire the requested actions and state transitions. Use representative local data when backend integration is outside scope, and identify simulated operations. Prototype evidence does not establish backend behavior.

Run the `jaml` validation workflow, then render through the actual application's entry point or supported playground route. In a framework testground, verify that the fixture mounted in the route's result container; a matching URL alone is insufficient.

For a conversion evaluation, retain the initial implementation and first comparison before visual corrections; record which corrections came from structured source, visual feedback or explicit behavior assumptions. This distinguishes initial translation quality from iterative visual matching.

Compare the rendered UI with the Figma screenshot at the same viewport and relevant theme/state. Check geometry, typography, content, asset identity/crop, color and clipping. Exercise implemented pointer and keyboard actions, focus, scrolling and responsive behavior; test additional states when they are part of the request. Correct in-scope mismatches and repeat the affected checks.

Deliver the implementation paths, concise verification evidence, and any remaining deviations or blocked checks. Separate static validation from rendered visual comparison and interaction checks. If rendering is blocked, report the implementation as visually unverified rather than complete. Creating this UI does not itself authorize edits to the Figma file, Code Connect mappings, publication or deployment.
