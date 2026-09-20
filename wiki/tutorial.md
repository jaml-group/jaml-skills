# Getting Started with JAML®

**JAML** (JSON Assembly Markup Language) lets you describe a complete UI as a plain JSON object or JavaScript object. At runtime the JAML parser walks the object, creates JAM-UI web components, wires up reactive data, and renders everything to the DOM.

---

## JAML at a glance

Read a JAML object as a UI tree: each object creates one element, and `components` contains its children.

| Piece | Example | What it does |
|---|---|---|
| Element type | `"type": "button"` | Chooses which JAM-UI element to create |
| Element params | `"cap": "Save"`, `"data": [...]`, `"stylize": "panel"` | Configure that element directly |
| Child tree | `"components": [...]` | Nests elements in render order |
| Local state | `"vars": { "count": 0 }` and `"{{count}}"` | Makes values reactive |
| Runtime control | `buildFor`, `showIf`, `watchers`, `timers` | Loops, conditionals, reactions, and scheduled work |
| Behavior layers | `on`, `styles`, `plugins` | Events, reusable styles, and mount/unmount behavior |

For app, panel, form, or list scale JAML, give structural nodes semantic `stylize` roles such as `app`, `header`, `main`, `panel`, `form`, `field`, `actions`, `list`, and `item`. Then the active theme can style the structure automatically, while `styles` and `plugins` stay focused on explicit treatments and behavior.

---

## 1. Hello World

The minimum JAML object needs only a `type`. Every other key is either a JAML control key or an element param written directly at the top level.

```json jaml-playground
{
    "type": "button",
    "icon": "👋",
    "cap": "Hello JAML.",
    "onclick": "this.shake()"
}
```

`icon` and `cap` are params of the `button` element — they represent the button icon and label text respectively.

---

## 2. Nesting with `components`

Use the `components` array to nest children inside a parent element.

```json jaml-playground
{
    "type": "container",
    "components": [
        { "type": "input", "cap": "Name", "placeholder": "Enter your name" },
        { "type": "input-number", "cap": "Age", "defaultValue": 18, "step": 1, "min": 0, "max": 100 },
        { "type": "button-cta", "cap": "Submit" }
    ]
}
```

Children are rendered in array order inside the parent element.

> **Tip:** Use a composite type such as `"button-cta"` whenever an element needs a specialization.

---

## 3. Collecting form data with `valueKey`

Mark any input with a `valueKey`. The `msgFormat` JAML key on the button collects and broadcasts all marked values when clicked.

```json jaml-playground
{
    "type": "container",
    "components": [
        {
            "type": "input",
            "cap": "Username",
            "valueKey": "username"
        },
        {
            "type": "select",
            "cap": "Role",
            "data": [
                { "name": "Admin", "value": "admin" },
                { "name": "User", "value": "user" }
            ],
            "defaultValue": "user",
            "valueKey": "role"
        },
        {
            "type": "button-cta",
            "cap": "Save",
            "msgFormat": { "msgKey": "formResult" }
        }
    ]
}
```

For imperative access, use `this.model.getFormData()` inside an element `onclick` hook — `this.model` always refers to the root Model from inside any element callback:

```json jaml-playground
{
    "type": "container",
    "components": [
        { "type": "input", "cap": "Username", "valueKey": "username" },
        { "type": "input-number", "cap": "Age", "valueKey": "age" },
        {
            "type": "button-cta",
            "cap": "Save",
            "onclick": "nutmeg.success(this.model.getFormData())"
        }
    ]
}
```

---

## 4. Reactive data with `vars` and `{{binder}}`

Declare `vars` on the root object. Use `"{{key}}"` syntax anywhere to bind a value reactively. Updating `model.vars.key` re-renders all bound elements automatically.

```json jaml-playground
{
    "type": "wrapper",
    "vars": { "count": 0 },
    "components": [
        {
            "type": "button",
            "icon": "⬇",
            "onclick": "this.model.vars.count--"
        },
        {
            "type": "indicator",
            "cap": "Counter",
            "value": "{{count}}"
        },
        {
            "type": "button",
            "icon": "⬆",
            "onclick": "this.model.vars.count++"
        },
        {
            "type": "button",
            "cap": "Reset",
            "onclick": "this.model.vars.count = 0"
        }
    ]
}
```

> Inside an element hook (`onclick`, `onvaluechange`, etc.) `this` is the **element**. Use `this.model` to reach the root Model, or `this.cmpt` to reach the component that built this element.
> You can also use `this.vars.key` or `this.model.key` to access the reactive variable directly.

---

## 5. Looping with `buildFor`

Use `buildFor` to render a component for each item in an array from `vars`.

```json jaml-playground
{
    "type": "container",
    "vars": {
        "users": [
            { "name": "Alice", "role": "Admin" },
            { "name": "Bob", "role": "User" }
        ]
    },
    "components": [
        {
            "buildFor": "user in users",
            "type": "badge",
            "color": "random",
            "cap": "{{user.name}}",
            "content": "{{user.role}}"
        }
    ]
}
```

`buildFor` accepts the string `"(item, idx, key) in dataKey"`. Use `props` to inject local aliases.

---

## 6. Watchers — reacting to data changes

Use `watchers` to run a callback whenever a reactive key changes. Inside a watcher callback, `this` refers to the **element**.

```json jaml-playground
{
    "type": "container",
    "components": [
        {
            "type": "input-number",
            "cap": "Score (0–100)",
            "min": 0,
            "max": 100,
            "unit": "%",
            "defaultValue": 60,
            "valueKey": "score"
        },
        {
            "type": "indicator",
            "cap": "Grade",
            "watchers": {
                "score": "(value) => { this.value = value >= 90 ? 'A' : value >= 80 ? 'B' : value >= 70 ? 'C' : value >= 60 ? 'D' : 'F'; }"
            }
        }
    ]
}
```

Shorthand: `valueWatcher`, `stateWatcher`, `dataWatcher` automatically wire a key to an element's `value`, `state`, or `data`.

---

## 7. Styles — the `styles` array

`styles` is an array of style descriptors applied to the element in order. Each entry can be a string path, a function, or a style object.

```json jaml-playground
{
    "type": "button-ghost",
    "cap": "Styled Button",
    "styles": [ "css(padding:xs l)", "hover(color:ac)", "active(backgroundColor:ac;color:onac)"]
}
```

String styles support arguments in parentheses: `"styleName(key:value;key2:value2)"`. Built-in styles are accessible via the global `Styles` object. You can also use the `css` style to apply inline CSS, or use `hover`, `active`, `before`, `after` to apply styles to specific states.

---

## 8. Plugins — the `plugins` array

`plugins` is an array of plugin descriptors applied in order when the element mounts.

```json jaml-playground
{
    "type": "container",
    "plugins": ["popup.tip(subTip:true)"],
    "components": [
        {
            "type": "checkbox",
            "cap": "Admin",
            "tip": "Grants full system access.",
            "autoTip": true,
            "data": [
                { "name": "read", "value": 1 },
                { "name": "write", "value": 2 },
                { "name": "delete", "value": 3 }
            ]
        }
    ]
}
```

Built-in plugins are namespaced under `Plugins.*`. See [JAML Plugins](./Plugins/plugins.md) for the full list.

---

## 9. Events with `on`

Use the `on` object to attach multiple event listeners at once.

```json jaml-playground
{
    "type": "input",
    "cap": "Search",
    "on": {
        "valuechange": "nutmeg.info('value changed: ' + (this.value || 'empty'), { id: 'search' });",
        "mount": "nutmeg.orange('mounted, id:' + this.id, { id: 'search' });"
    }
}
```

Individual hooks like `onclick`, `onvaluechange`, `onmount` can also be written directly as top-level keys.

---

## 10. JavaScript objects (not just JSON)

JAML is not limited to JSON. Any JavaScript object is valid — functions, class instances, computed values are all supported.

```javascript jaml-playground
export default {
    type: 'container',
    vars: { now: Date.now() },
    components: [
        {
            type: 'indicator',
            cap: 'Time',
            value: '{{now}}',
            formatter: (v) => new Date(v).toLocaleTimeString()
        },
        {
            type: 'button',
            cap: 'Refresh',
            onclick() {
                this.model.now = Date.now();
            }
        }
    ]
};
```

---

## What's next

| Topic             | Link                                 |
| ----------------- | ------------------------------------ |
| All JAML keys     | [JAML Format](./JAML/jaml-format.md) |
| Component API     | [Component](./JAML/component.md)     |
| Plugins reference | [Plugins](./Plugins/plugins.md)      |
| Styles reference  | [Styles](./Styles/styles.md)         |
| All elements      | [JAM-UI](./JAM-UI/JAM-UI.md)         |
