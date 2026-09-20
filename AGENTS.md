# JAML skills

This repository owns the public `jaml` authoring skill and wiki.

- Author API contracts once in `wiki/`; decision workflows belong to `jaml/workflows/`.
- Keep installed resources self-contained. Resolve references relative to the skill and preserve the application-versus-framework distinction.
- Public content contains usage contracts, examples and compatibility versions. Keep proprietary implementation, internal source locations, revision identifiers, maintenance evidence and project/task records in their private owner.
- Verify API claims against an explicitly identified runtime or authorized source. Keep private evidence outside this repository; publish only the resulting usage contract.
- Preserve separate project and theme refactoring workflows.
- Run resource and packaging checks after changing resources. Generated `dist/` content is not an editing target.
- Commit, push, publish and global installation require task authorization.
