# CurrantComposable — Dashboard Grid Composability

`CurrantComposable` provides drag-and-drop grid composability for dashboard-style layouts. It manages a CSS Grid-based canvas where cards can be moved, resized, closed, and added dynamically. The grid layout configuration is persisted to localStorage.

## Constructor

```typescript signature
new CurrantComposable(oldConfig?, config?, closedCard?, cvsRect?, cellSize?, multiple?, center?)
```

All constructor parameters are optional and can be set later via properties.

| Parameter     | Type                    | Default     | Description                                         |
|---------------|-------------------------|-------------|-----------------------------------------------------|
| `oldConfig`   | `any`                   | `undefined` | Snapshot of the original config (used for reset).   |
| `config`      | `any`                   | `undefined` | Current layout configuration.                       |
| `closedCard`  | `CardInfo[]`            | `[]`        | Cards that have been closed (restorable).           |
| `cvsRect`     | `any`                   | `undefined` | Layout canvas bounding rect.                        |
| `cellSize`    | `number[]`              | `[]`        | Calculated cell dimensions `[width, height]`.       |
| `multiple`    | `number`                | `2`         | Card size multiplier for grid placement.            |
| `center`      | `HTMLElement \| null`   | `null`      | Center reference element (for centering new cards). |

## Properties

| Property                    | Type                   | Description                                              |
|-----------------------------|------------------------|----------------------------------------------------------|
| `config`                    | `any`                  | Current layout configuration object.                     |
| `oldConfig`                 | `any`                  | Original config snapshot (for reset).                    |
| `closedCard`                | `CardInfo[]`           | Accumulator for closed cards.                            |
| `cvsRect`                   | `any`                  | Layout canvas bounding rect (auto-calculated).           |
| `gridSize`                  | `number[]`             | Grid dimensions `[rows, cols]` (default `[24, 12]`).    |
| `cellSize`                  | `number[]`             | Cell pixel dimensions `[width, height]` (auto-calculated).|
| `multiple`                  | `number`               | Card size scale factor (default `2`).                    |
| `center`                    | `HTMLElement \| null`  | Element used as visual center for new card placement.    |

## Storage Keys

| Constant                      | Value                       | Description                                    |
|-------------------------------|-----------------------------|------------------------------------------------|
| `CurrantComposable.confStorageName` | `'jam-layout-config'` | localStorage key for layout configuration.     |
| `CurrantComposable.propsStorageName` | `'jam-layout-props-config'` | localStorage key for component property config. |

## Methods

| Method                               | Description                                                             |
|--------------------------------------|-------------------------------------------------------------------------|
| `buildLayoutCanvas(pageInfo)`        | Create the grid canvas overlay for a page. The container must be `#jam-layout-container`. |
| `clearLayoutCanvas()`                | Remove the grid canvas and moving shadow elements.                      |
| `makePageEditable()`                 | Enable editing (drag, resize, close) for all cards on the current page. Builds the layout canvas first. |
| `removePageEditable()`               | Disable editing for all cards on the current page and remove the layout canvas. |
| `makeComponentEditable(page, card)`  | Enable drag, resize, and close for a single card within a page.         |
| `makeUnComponentEditable(card)`      | Disable drag, resize, and close for a single card.                      |
| `putNewCardInCanvas(resource)`       | Add a new card to the canvas — accepts a `.mjs` resource URL or a component option object. |
| `sortCardsImmutable(pageInfos)`      | *(static)* Return a new sorted copy of the config with cards ordered by grid position (row-first, then column). |
| `findPageByPath(pageInfos, path)`    | *(static)* Recursively find a page configuration by its path.           |
| `findRegistryComponentById(id)`      | *(static)* Look up a component from the props config stored in localStorage. |
| `getLayoutCanvas()`                  | Get the current layout canvas element (or `null`).                      |
| `getMovingShadow()`                  | Get the current moving shadow element (or `null`).                      |
| `isLayoutCanvasBuilt()`              | Check whether the layout canvas and moving shadow have been built.       |
| `reset()`                            | Reset all state (closedCard, cvsRect, config, cellSize, multiple, center, layout canvas). |
| `resetConfig()`                      | Restore config to the original `oldConfig` snapshot.                    |
| `getCenter()`                        | Get the center reference element.                                       |
| `setCenter(center)`                  | Set the center reference element.                                       |
| `showCenter()`                       | Show the center element (animate into view).                            |
| `hideCenter()`                       | Hide the center element (animate out of view).                          |

## Config Format

### PageInfo

```ts
type PageInfo = {
  path: string;       // Page route path
  name: string;       // Page display name
  size: number[];     // Grid dimensions [rows, cols]
  icon?: string;      // Page icon
  gap?: number;       // Grid gap in rem units
  group?: string;     // Group for route organisation
  switchable?: boolean; // Whether route is switchable
  multiple?: number;  // Card size multiplier (default 2)
  pages?: PageInfo[]; // Child pages (recursive)
  cards?: CardInfo[]; // Cards on this page
};
```

### CardInfo

```ts
type CardInfo = {
  id: string;         // Card element ID
  resource: any;      // Resource path (string) or component config (object)
  coord: number[];    // Grid position: [colStart, rowStart, colSpan, rowSpan]
};
```

Generated route content uses `stylize: 'main'`. A card resource defaults to `stylize: 'tile'` only when that resource does not already declare a `stylize` value.

## Examples

### Basic setup

```ts
const composable = new CurrantComposable();

// Page configuration
const pageConfig = {
  path: '/dashboard',
  name: 'Dashboard',
  size: [24, 12],
  gap: 1,
  multiple: 2,
  cards: [
    {
      id: 'chart-card',
      resource: { type: 'container', components: [/* ... */] },
      coord: [1, 1, 12, 6] // colStart, rowStart, colSpan, rowSpan
    },
    {
      id: 'stats-card',
      resource: { type: 'container', components: [/* ... */] },
      coord: [13, 1, 12, 6]
    }
  ]
};

composable.config = pageConfig;
```

### Making a page editable

```ts
// Enable drag-and-drop editing for the current route's page
composable.makePageEditable();

// Cards become draggable, resizable, and closable
// A grid overlay appears with snap-to-grid behaviour
```

### Removing edit mode

```ts
composable.removePageEditable();
// Grid overlay removed, cards return to static display
```

### Adding a new card from a module resource

```ts
await composable.putNewCardInCanvas('/modules/widgets/weather-widget.mjs');
// The card is loaded, rendered at the center of the canvas, and made editable
```

### Adding a new card from a component option

```ts
const cardConfig = {
  type: 'container',
  id: 'custom-card',
  size: [3, 2], // width_multiple, height_multiple
  components: [
    { type: 'text', value: 'Hello World' }
  ]
};

await composable.putNewCardInCanvas(cardConfig);
```

### Sorting cards by grid position

```ts
const sorted = CurrantComposable.sortCardsImmutable(pageInfos);
// Cards within each page are sorted row-first, then column
```

### Finding a page by path

```ts
const page = CurrantComposable.findPageByPath(composable.config, '/dashboard/settings');
// Recursively searches the config tree and returns the matching PageInfo
```

### Resetting to original configuration

```ts
composable.oldConfig = cloneDeep(composable.config);
// ... make edits ...
composable.resetConfig(); // Restore to oldConfig
```

### Full lifecycle example

```ts
const currant = new CurrantComposable();

// Load config from localStorage
currant.config = JSON.parse(localStorage.getItem('jam-layout-config') || '[]');

// Find the current page and make it editable
const page = CurrantComposable.findPageByPath(currant.config, rambutan.currPath);
currant.buildLayoutCanvas(page);
currant.makePageEditable();

// On route change, save and switch
rambutan.beforeSwitch = () => {
  // Save will be called on the next page navigation
  currant.removePageEditable();
  const nextPage = CurrantComposable.findPageByPath(currant.config, rambutan.currPath);
  currant.buildLayoutCanvas(nextPage);
  currant.makePageEditable(nextPage);
};
```
