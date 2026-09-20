# shortcuts

**Class:** `SafouShortcuts` · **Extends:** `PapayaPopup`

`SafouShortcuts` renders a `BlackberryButtonGroup` overlay that appears on hover above a JAM-UI element. It is **not** a JAML type you write directly. Instead, attach it via the declarative `shortcuts` param (available on every element from `AbstractElement`), or create a `SafouShortcuts` instance and show it manually.

| Trigger | Show delay | Arrow | Animation |
|---|---|---|---|
| `hover` | `200ms` | None | `fade-in 100ms` / `fade-out 100ms` |

The `hover.brighter` style is applied by default to the button group. The element uses `removeOnHiding: false`, so the button group persists between hover events. `buttons` (`BlackberryButtonGroup`) is created lazily on first `show()`.

---

## Declarative usage — `shortcuts` param

Every JAM-UI element has a `shortcuts` param (from `AbstractElement`). Setting it attaches a `SafouShortcuts` popup:

```javascript jaml-playground
export default {
  type: 'table',
  cap: 'Users',
  data: [],
  shortcuts: [
    { name: 'Edit',   icon: 'pencil', onclick: (e) => openEditModal(e) },
    { name: 'Delete', icon: 'trash',  onclick: (e) => confirmDelete(e) },
    { name: 'Copy',   icon: 'copy',   onclick: (e) => copyRow(e)       }
  ]
}
```

The `shortcuts` value is an array of `ElementOption` objects:

```json jaml-playground
{
  "type": "card",
  "cap": "Profile Card",
  "shortcuts": [
    { "name": "View Profile", "icon": "user" },
    { "name": "Send Message", "icon": "mail" }
  ]
}
```

---

## `ElementOption` fields for shortcuts

| Field | Type | Description |
|---|---|---|
| `name` | `string` | Button label |
| `icon` | `string` | Button icon |
| `onclick` | `Function` | Click handler (receives the click event) |
| `color` | `ColorType` | Button accent color |
| `styles` | `StyleOption[]` | Inline styles for the button |
| `tip` | `string` | Tooltip text |
| `hide` | `boolean` | Hide this shortcut button |

---

## Instance API

`SafouShortcuts` extends `PapayaPopup` with the following additions.

### `shortcuts.options`

The array of `ElementOption` objects that populate the button group.

```javascript
const sc = new SafouShortcuts()
sc.options = [
  { name: 'Edit',   icon: 'pencil', onclick: () => console.log('edit') },
  { name: 'Delete', icon: 'trash',  onclick: () => console.log('delete') }
]
```

### `shortcuts.optionsGetter(target)`

Override this method to return dynamic options based on the hovered `target` element. Called each time the shortcuts popup is shown.

```javascript
const sc = new SafouShortcuts()

sc.optionsGetter = function(target) {
  const rowData = target.getData()
  return [
    {
      name: rowData.editable ? 'Edit' : 'View',
      icon: rowData.editable ? 'pencil' : 'eye',
      onclick: () => open(rowData.id)
    },
    {
      name: 'Delete',
      icon: 'trash',
      hide: !rowData.deletable,
      onclick: () => confirmDelete(rowData.id)
    }
  ]
}
```

### `shortcuts.show(target)`

Manually show the shortcuts overlay anchored to `target`.

```javascript
const sc = new SafouShortcuts()
sc.options = [{ name: 'Save', icon: 'check' }]

const el = document.querySelector('#my-element')
sc.show(el)
```

---

## Examples

### Table row shortcuts with dynamic context

```javascript jaml-playground
export default {
  type: 'table',
  cap: 'Orders',
  data: [
    { id: 1, status: 'pending',  total: 49.99 },
    { id: 2, status: 'shipped',  total: 89.99 },
    { id: 3, status: 'delivered', total: 29.99 }
  ],
  shortcuts: [
    { name: 'View Details',  icon: 'eye' },
    { name: 'Cancel Order',  icon: 'x',   hide: true },
    { name: 'Track Package', icon: 'truck' }
  ]
}
```

### Card-level shortcuts

```json jaml-playground
{
  "type": "card",
  "cap": "Project Alpha",
  "icon": "folder",
  "shortcuts": [
    { "name": "Open",   "icon": "folder-open" },
    { "name": "Share",  "icon": "share" },
    { "name": "Delete", "icon": "trash", "color": "red" }
  ]
}
```

### Programmatic SafouShortcuts with getter

```javascript
function makeRowShortcuts(tableEl) {
  const sc = new SafouShortcuts()

  sc.optionsGetter = (target) => {
    const pKey = target.getAttribute('jam-pkey')
    return [
      { name: `Edit Row ${pKey}`,  icon: 'pencil' },
      { name: `Delete Row ${pKey}`, icon: 'trash' }
    ]
  }

  tableEl.addEventListener('mouseenter', (e) => sc.show(e))
  return sc
}
```

---

## Notes

- The `shortcuts` param serializes options as a base64-encoded JSON attribute (`jam-shortcuts`) on the target element.
- `SafouShortcuts` is permanently attached (`removeOnHiding: false`), so the button group is cached between hover events rather than recreated.
- The shortcuts popup is exclusive — only one shortcuts overlay is shown at a time.
