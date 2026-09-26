# Upstream candidates

Use this assessment when an application, playground fixture, builder, design tool or demo exposes a meaningful reusable addition. Scope follows the work: a demo inside the Jam-UI repository still consumes the framework. Already-authorized framework implementation follows its owning architecture and tests without a second promotion approval.

## Assess the gap

- **General usefulness:** identify recurring needs across consumers. Separate business-specific behavior from reusable capability; one successful demo alone does not establish a core feature.
- **Actual gap:** check the installed runtime/version and the relevant native elements, public styles/plugins and supported extensions. Reuse an existing capability that fits. Distinguish an overlooked feature, a compatibility limitation and a missing capability; label unverified assumptions.
- **Right home:** consider a native element, style/plugin, builder/CC, usage/suffix, utility, theme recipe or optional shared extension. Choose by ownership and public contract, not by implementation size.
- **Readiness:** assess state and lifecycle ownership, cleanup, roles/tokens, compatibility, and verification. State what is demonstrated and what still needs work. Keep project changes and theme-definition changes separately scoped.

Choose a recommendation for each meaningful candidate:

| Recommendation | Fits when |
|---|---|
| Keep app-local | The behavior is business-specific or its reusable contract is not yet clear |
| Share as an extension | The capability is reusable but specialized or still evolving |
| Promote into Jam-UI | The capability is broadly useful, stable and consistent with the framework, with evidence supporting that assessment |

## Propose without blocking local work

For a useful promotion candidate, briefly explain the benefit, evidence and proposed destination, then ask whether the user wants promotion. A possible question is: “Should this stay local for now, or should I ask the framework owner to evaluate promotion?” Reuse explicit approval already present in the task instead of asking again.

While an answer is pending, continue the authorized local implementation using existing capabilities and justified local extensions. Silence leaves promotion pending; it does not authorize framework changes. A design-only or review-only task still returns a plan or report without implementation.

After explicit promotion approval, coordinate the scoped proposal with the existing domain owner. If no owner is found, use the project's coordination owner, such as a task master. When task coordination is unavailable, give the user a scoped handoff rather than assuming another task exists. Distinguish approval to evaluate from approval to implement, and keep changes within that scope. Recommending a shared extension does not itself authorize publishing or installing it.

## Retain the decision

Include an **Upstream candidates** section in substantial design and refactor reports, including dry runs. Record discoveries during implementation in the existing design/refactor report or final handoff. Keep one concise note per candidate:

- Capability and recurring use case.
- Alternatives checked, runtime/version evidence and the remaining gap.
- Recommended outcome and owning abstraction.
- Readiness evidence and unresolved lifecycle, theme, compatibility or verification questions.
- Approval status and next step, including what remains local pending a later refactor.

Recommendation and approval status are separate: a strong candidate can still be pending. “None identified” is valid after assessment; do not invent candidates or create a separate report for routine edits without a meaningful discovery.
