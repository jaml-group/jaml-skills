# calendar

**Class:** `CarambolaCalendar` · **Type:** `"calendar"` · **Extends:** `AbstractOptionElement`

An interactive calendar with day, month, and year view switching. Supports custom cell content, date marks and indicators, and child element positioning through JAML `coord`, which emits the `jam-coord` attribute. Day cells identify weekends and the current date automatically.

---

## JAML usage

```json jaml-playground
{
    "type": "calendar",
    "cap": "Schedule",
    "defaultValue": "()=>Date.now()",
    "valueKey": "selectedDate"
}
```

---

## Params

Inherits all params from [AbstractOptionElement](./JAM-UI.md#section-3--abstractoptionelement).

| Param          | Type                                   | Default      | Description                                                                                     |
| -------------- | -------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------- |
| `value`        | `string \| Date \| number`             | —            | Selected date. Accepts date strings, timestamps, or `Date` objects.                             |
| `defaultValue` | `string \| Date \| number \| Function` | —            | Pre-selected date. Pass `"()=>Date.now()"` for today.                                           |
| `showDate`     | `string \| number \| Date`             | current date | The date controlling which month/year/decade is displayed. Setting this navigates the calendar. |
| `showType`     | `number`                               | `0`          | View mode: `0` = day view, `1` = month view, `2` = year view.                                   |
| `changeType`   | `boolean`                              | `true`       | Allow clicking the title header to cycle day → month → year views.                              |
| `ondatachange` | `(data) => void`                       | —            | Fired when the visible date range changes. Receives `{ date, start, end }` (all timestamps).    |

---

## View types

| View       | `showType`    | Columns | Title shows              |
| ---------- | ------------- | ------- | ------------------------ |
| Day view   | `0` (default) | 7       | Localized month and year |
| Month view | `1`           | 3       | Current year             |
| Year view  | `2`           | 4       | Decade range             |

---

## Slots

| Slot             | Description                                                                                                             |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `label`          | Standard label area (icon, cap, extra) via `Templates.label`.                                                           |
| `ctitle`         | Title/header text in the controller row (auto-populated).                                                               |
| `current`        | Center button showing the current period label (auto-populated). Click resets to today.                                 |
| `weekday`        | Weekday header cells. Pre-populated with day names from `weekConst`.                                                    |
| `date` (binder)  | Date cell grid. Auto-populated by options rendering.                                                                    |
| `mark` (default) | Mark/indicator overlay content. Use `coord` and the redraw handler below to position children onto matching date cells. |

Coordinate-positioned calendar children use `stylize: 'item'`. The `calendar > item` parent context identifies date-owned labels, indicators, and marks without introducing a separate calendar-only role.

---

## Events

| Event    | Description                                                           |
| -------- | --------------------------------------------------------------------- |
| `redraw` | Fired after the calendar grid is rebuilt (view change or navigation). |

---

## Instance methods

| Method                      | Description                                                                                         |
| --------------------------- | --------------------------------------------------------------------------------------------------- |
| `calendar.calculatePos(el)` | Position a child `HTMLElement` onto the calendar grid from its `jam-coord` attribute (date string). |

---

## Localization

Weekday names, month/year titles, and navigation labels follow the active JAML locale. `CarambolaCalendar.weekConst` is a read-only, locale-derived array; assigning to it is unsupported. See [i18n](../Plugins/i18n.md) for locale configuration.

---

## Examples

### Basic date selection

```javascript jaml-playground
export default {
    type: 'calendar',
    cap: 'Select Date',
    defaultValue: new Date(),
    valueKey: 'selectedDate',
    onvaluechange: function (date) {
        nutmeg.info(`Selected: ${new Date(date).toLocaleDateString()}`);
    }
};
```

### Calendar with event marks

The calendar owns its date-cell `data` and rebuilds it during initialization and navigation. Add event content as children with `coord`; do not replace `data` with an event list. Recalculate existing marks after `redraw`: initial child creation can precede the date grid, and navigation does not automatically reposition existing marks. Hide marks when their date is outside the visible day grid.

```javascript jaml-playground
export default {
    type: 'calendar',
    cap: 'Events',
    styles: ['css(width:35rem;max-width:100%;height:28rem)'],
    showDate: '2024-03-01',
    on: {
        redraw() {
            for (const mark of this.querySelectorAll(':scope > [jam-coord]')) {
                mark.style.removeProperty('grid-row-start');
                mark.style.removeProperty('grid-column-start');
                this.calculatePos(mark);
                mark.style.display = this.showType !== 0 || !mark.style.gridRowStart ? 'none' : '';
            }
        }
    },
    components: [
        { type: 'label', stylize: 'item', coord: '2024-03-15', cap: 'Meeting', styles: ['css(align-self:end;justify-self:center;font-size:0.75rem;margin-bottom:0.25rem)'] },
        { type: 'label', stylize: 'item', coord: '2024-03-20', cap: 'Deadline', styles: ['css(align-self:end;justify-self:center;font-size:0.75rem;margin-bottom:0.25rem)'] },
        { type: 'label', stylize: 'item', coord: '2024-03-25', cap: 'Holiday', styles: ['css(align-self:end;justify-self:center;font-size:0.75rem;margin-bottom:0.25rem)'] }
    ],
    valueKey: 'eventDate'
};
```

### Coordinate-positioned items

Use the same redraw handler above when adding indicators instead of text labels:

```json
{
    "type": "calendar",
    "cap": "Maintenance Schedule",
    "showDate": "2024-03-01",
    "components": [
        {
            "type": "indicator",
            "stylize": "item",
            "coord": "2024-03-15",
            "cap": "Inspection"
        },
        {
            "type": "label",
            "stylize": "item",
            "coord": "2024-03-20",
            "cap": "Release"
        }
    ]
}
```

### Programmatic navigation with buttons

```javascript jaml-playground
export default {
    type: 'calendar',
    cap: 'Navigable',
    ref: 'cal',
    showDate: new Date('2024-06-15'),
    components: [
        {
            type: 'wrapper',
            styles: ['wrapper.buttonwrapper'],
            components: [
                {
                    type: 'button',
                    cap: 'Today',
                    onclick: function () {
                        this.model.ref.cal.showDate = new Date();
                    }
                },
                {
                    type: 'button',
                    cap: 'Next Month',
                    onclick: function () {
                        const d = this.model.ref.cal.showDate;
                        this.model.ref.cal.showDate = new Date(d.getFullYear(), d.getMonth() + 1, 1);
                    }
                }
            ]
        }
    ]
};
```

### View-only calendar (disable type switching)

```json jaml-playground
{
    "type": "calendar",
    "changeType": false,
    "valueKey": "date"
}
```

---

## Notes

-   Calendar cells have the `jam-calendar-cell` class and position hints (`left`, `right`, `top`, `bottom`).
-   Weekend cells get the `weekend` CSS class. Prev/next month cells get `prev`/`next` classes.
-   Use `stylize: 'item'` with `coord` on children in the `mark` slot to identify and pin them to specific dates.
