# Reply

Load this when `SKILL.md` leaves a module, format or native choice unresolved for UI inside a conversational reply. The linked sections own the details, so read only the one the reply needs.

1. **Choose the representation.** Honor the requested format and use Markdown when it is sufficient. See [Choose UI for a reply](../references/JAML/conversational-ui.md).
2. **Check the inputs.** Confirm the facts are supplied or available from a declared ready source, and otherwise ask for what is missing. See [task inputs](../references/JAML/conversational-ui.md#check-the-tasks-inputs).
3. **Select once.** Take the highest fitting ready capability: module, then registered CC, then native JAML. See [selection](../references/JAML/conversational-ui.md#select-in-one-pass). For a metric, chart or local action, use the [native choices](../references/JAML/conversational-ui.md#native-elements-without-an-outer-wrapper). For another open native choice, read its [chooser](../references/choosing-native-capabilities.md) topic.
4. **Read what remains.** Read only the selected capability's unresolved inputs, prerequisites or lifecycle.
5. **Emit.** Follow [JAMLL records and format fallback](../references/JAML/conversational-ui.md#progressive-replies-with-jamll) and [local state and actions](../references/JAML/conversational-ui.md#local-state-and-actions). When the host advertises the `agui` API, also follow [AGUI](agui.md).
6. **Finish.** Run the final check in `SKILL.md`. Use [static validation](../references/validation.md) when a mechanical question remains.
