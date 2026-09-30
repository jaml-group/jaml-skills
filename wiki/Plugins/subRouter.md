# subRouter

<!-- Generated from native authoring; do not edit. -->

[中文](subRouter.zh.md)

## `subRouter`

<a id="entry-subrouter"></a>

Nested element router

Attach a router beneath the nearest parent router, falling back to the global router.

Uses type to select the implementation, forwards remaining constructor arguments except routes, and registers supplied routes on the child router.

Links the child to its parent and initializes it passively; unplug clears its route link, destroys it and refreshes parent route watchers.

Arguments are forwarded to `jam.AbstractRouter`. Undeclared fields have no inferred types, defaults or completion; an empty argument table does not reject arguments.
