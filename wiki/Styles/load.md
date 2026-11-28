# load

<!-- Generated from native authoring; do not edit. -->

[中文](load.zh.md)

## `load.prompts`

<a id="entry-load-prompts"></a>

Rotating loading captions

Tell the user what work they are waiting for.

Shows the first prompt immediately, then loops in array order every 1.5 seconds. A single prompt stays visible. An empty list uses the normal caption. An explicit caption takes priority and clearing it restarts the loop at the first prompt.

Apply to a native Jam-UI element with a loading state from an initial URL request or `setLoading(progress?)`.

Settlement, unmount, and removal of the last prompt style stop its timer. Changing the caption preserves the current progress indicator.

Call `Styles.load.prompts(['Preparing the terrain map…', 'Getting the elevation view ready…'])`. It uses a spinner by default and can be combined with `load.progress` on the same element. See [writing loading captions](../JAML/purpose-and-composition.md#write-captions-for-the-current-load).

Positional order: `prompts`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `prompts` | `array` | `[]` | Ordered array of plain-text captions in the UI's language. Name the work in each caption so it makes sense at any point in the wait.<br>Shorthand |

## `load.spinner`

<a id="entry-load-spinner"></a>

Loading spinner

Show a compact busy indicator over the element doing the work.

Shows a spinner with room for a caption and an explicit percentage. On a button, input, select, datepicker, timepicker or label with less than 6rem available in its loading layer, shows only the spinner or the known percentage. Rotation pauses under reduced motion.

Apply to a native Jam-UI element with a loading state from an initial URL request or `setLoading(progress?)`.

The element owns its loading state. The layer is removed when the element becomes idle, unmounts, or loses its loading style.

Choose one presentation per host. Its transparent layer keeps the themed surface and decoration visible. Content keeps its layout while hidden. A busy button keeps its accessible name and activation behavior. Add `load.prompts` for rotating captions or `setLoadingText(text)` when the operation reports a real stage.

## `load.progress`

<a id="entry-load-progress"></a>

Loading progress bar

Show the progress of work on the element doing it.

Shows a percentage for known progress or an indeterminate band for unknown progress. On a button, input, select, datepicker, timepicker or label with less than 6rem available in its loading layer, shows only the known percentage or the indeterminate indicator. Honors reduced motion.

Apply to a native Jam-UI element with a loading state from an initial URL request or `setLoading(progress?)`.

The element owns its loading state. The layer is removed when the element becomes idle, unmounts, or loses its loading style.

Choose one presentation per host. Its transparent layer keeps the themed surface and decoration visible. Content keeps its layout while hidden. A busy button keeps its accessible name and activation behavior. Add `load.prompts` for rotating captions or `setLoadingText(text)` when the operation reports a real stage.
