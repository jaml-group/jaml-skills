# Reply demos

Choose a demo when its purpose, inputs and prerequisites fit. Replace the sample data with supplied facts and recalculate any summaries or derived labels. Charts require ECharts in the rendering runtime and an explicit nonzero height.

The host's advertised capabilities establish which examples are ready. Use the [reply guide](conversational-ui.md) for presentation, interaction and fallback rules.

## Independent metrics

<!-- reply-demo:metrics -->

Show a few supplied counts, percentages or values with units.

````text
```text jamll-content
{ type: 'indicator-number', icon: '📦', cap: 'Orders', value: 1284, styles: ['indicator.bigicon'] }
{ type: 'indicator-percent', icon: '🚚', cap: 'On time', value: 0.94, valueStates: { good: 'value>=0.9', watch: 'value>=0.7', late: 'value<0.7' }, styles: ['indicator.bigicon', 'color.stateMap(good:success;watch:warn;late:error)', 'value.color.primary'] }
{ type: 'indicator-number', icon: '↩️', cap: 'Returns', value: 37, unit: 'this week', valueStates: { good: 'value<20', watch: 'value<50', high: 'value>=50' }, styles: ['indicator.bigicon', 'color.stateMap(good:success;watch:warn;high:error)', 'value.color.primary', 'indicator.unit.color.accent'] }
```
````

## KPI cards

<!-- reply-demo:kpiCards -->

Show related headline metrics with a target, comparison or detail beneath each caption.

````text
```text jamll-content
{ type: 'wrapper', stylize: 'list', style: { width: '100%' }, styles: ['layout.autoalign', 'stylize.bento'], childStyles: ['params(stylize:item)', 'value.major()', 'cap.main(0.75)', 'value.color.primary', 'value.grouped', 'css(padding:l;gap:xs)'] }
    { type: 'indicator-number', icon: '📦', cap: 'Orders', value: 1284 }
        { type: 'hr', slot: 'layer', styles: ['indicator.sub(above)'] }
        { type: 'label', cap: '+8% vs last week', slot: 'layer', styles: ['indicator.sub(above)', 'cap.sub'] }
    { type: 'indicator-percent', icon: '🚚', cap: 'On time', value: 0.94 }
        { type: 'hr', slot: 'layer', styles: ['indicator.sub(above)'] }
        { type: 'label', cap: 'Target 90%', slot: 'layer', styles: ['indicator.sub(above)', 'cap.sub'] }
    { type: 'indicator-number', icon: '⭐', cap: 'Rating', value: 4.7, decimalPos: 1, unit: '/ 5' }
        { type: 'hr', slot: 'layer', styles: ['indicator.sub(above)'] }
        { type: 'label', cap: '312 reviews', slot: 'layer', styles: ['indicator.sub(above)', 'cap.sub'] }
```
````

## Hero metric

<!-- reply-demo:heroStat -->

Give one supplied metric visual priority and add a short explanatory detail.

````text
```text jamll-content
{ type: 'indicator-number', icon: '💧', cap: 'Water saved this month', value: 2480, unit: 'litres', styles: ['indicator.vertical', 'indicator.bigicon', 'value.major()', 'cap.main(0.75)', 'value.color.primary', 'value.grouped'] }
    { type: 'label', cap: 'About 16 full baths', slot: 'layer', styles: ['indicator.sub', 'cap.sub'] }
```
````

## Inline facts

<!-- reply-demo:inlineFacts -->

Show several short facts with different units in a compact vertical group.

````text
```text jamll-content
{ type: 'container', style: { width: '100%' }, styles: ['layout.flex(direction:column)', 'css(gap:xs)'], childStyles: ['indicator.inline', 'value.color.primary', 'css(width:18rem)'] }
    { type: 'indicator-number', icon: '🛣️', cap: 'Distance', value: 12.4, decimalPos: 1, unit: 'km' }
    { type: 'indicator-number', icon: '⏱️', cap: 'Moving time', value: 58, unit: 'min' }
    { type: 'indicator-number', icon: '⛰️', cap: 'Elevation gain', value: 214, unit: 'm' }
```
````

## Metric with change

<!-- reply-demo:statCard -->

Show one headline figure and a supplied change from a comparison period.

````text
```text jamll-content
{ type: 'container', styles: ['stylize.bento'] }
    { type: 'indicator-number', cap: 'Monthly revenue', value: 48200, unit: 'USD', styles: ['css(padding:l)', 'indicator.vertical', 'indicator.lefted', 'value.major()', 'cap.main(0.75)', 'value.color.primary', 'value.grouped'] }
        { type: 'label', cap: '+12% vs last month', color: 'success', slot: 'layer', styles: ['indicator.sub', 'cap.sub(1)', 'color.primary'] }
```
````

## Metric with categories

<!-- reply-demo:tagCard -->

Show one count with a short set of related category labels.

````text
```text jamll-content
{ type: 'container', styles: ['stylize.bento'] }
    { type: 'indicator-number', cap: 'Open tickets', value: 23, styles: ['css(padding:l)', 'indicator.vertical', 'indicator.lefted', 'value.major()', 'cap.main(0.75)', 'value.color.primary'] }
        { type: 'label', cap: 'Most reported', slot: 'layer', styles: ['indicator.sub', 'cap.sub'] }
        { type: 'tags', data: ['Billing', 'Login', 'Export'], showCount: false, slot: 'layer', styles: ['indicator.sub', 'tags.chip'] }
```
````

## Local calculator

<!-- reply-demo:calculator -->

Let the user edit a few numeric inputs and see a local calculation immediately. Keep the total in the default text color for contrast.

````text
```text jamll-content
{ type: 'container', vars: { packs: 4, price: 7.5 }, styles: ['layout.autoalign', 'group.bento'] }
    { type: 'input-number', cap: 'Packs', value: '{{packs}}' }
    { type: 'input-number', cap: 'Price', decimalPos: 2, value: '{{price}}' }
    { type: 'indicator-number', cap: 'Total', decimalPos: 2, unit: 'credits', placeholder: '—', value: '{{packs == null || price == null ? null : packs * price}}', styles: ['value.major()'] }
```
````

## Typed-column table

<!-- reply-demo:table -->

Compare records across fields with meaningful numeric cells, sorting and category filtering.

````text
```text jamll-content
{ type: 'table', cap: 'Delivery by region', style: { width: '100%' }, styles: ['table.stripy', 'table.gridline', 'table.stretchrow', 'table.thead.accent', 'table.hovermarker(style:arrow)'], data: [{ region: 'North', tier: 1, orders: 482, onTime: 0.97 }, { region: 'Central', tier: 1, orders: 391, onTime: 0.88 }, { region: 'South', tier: 2, orders: 256, onTime: 0.64 }, { region: 'Coastal', tier: 2, orders: 155, onTime: 0.92 }], dataDef: [{ key: 'region', cap: 'Region', sort: 'ascend' }, { key: 'tier', cap: 'Tier', align: 'center', filterable: true, menu: { 1: 'Priority', 2: 'Standard' } }, { key: 'orders', cap: 'Orders', type: 'indicator-number', unit: 'orders', styles: ['indicator.capslot.hide', 'indicator.unit.color.accent'] }, { key: 'onTime', cap: 'On time', type: 'progress', width: '8rem', valueStates: { good: 'value>=0.9', watch: 'value>=0.7', late: 'value<0.7' }, styles: ['color.stateMap(good:success;watch:warn;late:error)'] }] }
```
````

## Multi-series trend

<!-- reply-demo:trend -->

Compare two or more measured series over the same time periods.

````text
```text jamll-content
{ type: 'chart-line', cap: 'Visits by channel', style: { width: '100%', height: '16rem' }, styles: ['echarts.legend', 'echarts.line.symbol(show:true)'], data: [['Month', 'Search', 'Direct'], ['Jan', 120, 80], ['Feb', 132, 90], ['Mar', 158, 96], ['Apr', 171, 104]] }
    { type: 'label', cap: 'Jan–Apr: Search rose from 120 to 171, Direct from 80 to 104', slot: 'layer', styles: ['cap.sub(0.5)'] }
```
````

## Single-series trend

<!-- reply-demo:singleTrend -->

Show change over time for one measured series.

````text
```text jamll-content
{ type: 'chart-line', cap: 'Revenue', style: { width: '100%', height: '16rem' }, styles: ['echarts.line.gradientBg', 'echarts.line.symbol(show:true)'], data: [['Month', 'Revenue'], ['Jan', 42], ['Feb', 48], ['Mar', 45], ['Apr', 57]] }
    { type: 'label', cap: 'Jan–Apr: up from 42 to 57, with a dip in March', slot: 'layer', styles: ['cap.sub(0.5)'] }
```
````

## Stacked bars

<!-- reply-demo:stacked -->

Compare totals and their additive parts across categories.

````text
```text jamll-content
{ type: 'chart-bar', cap: 'Output by source', style: { width: '100%', height: '16rem' }, styles: ['echarts.legend', 'echarts.bar(stack:output;maxWidth:28)'], data: [['Quarter', 'Solar', 'Wind'], ['Q1', 30, 44], ['Q2', 52, 38], ['Q3', 61, 29], ['Q4', 34, 47]] }
    { type: 'label', cap: 'Solar peaks in Q3 at 61; wind in Q4 at 47', slot: 'layer', styles: ['cap.sub(0.5)'] }
```
````

## Category leader

<!-- reply-demo:leader -->

Highlight the highest value among a few directly comparable categories.

````text
```text jamll-content
{ type: 'chart-bar', cap: 'Sales by store', style: { width: '100%', height: '16rem' }, styles: ['echarts.bar(maxWidth:28)', 'echarts.bar.maxHightLight', 'echarts.bar.label(show:true;position:top)'], data: [['Store', 'Sales'], ['Elm', 42], ['Oak', 68], ['Pine', 51], ['Ash', 37]] }
    { type: 'label', cap: 'Oak leads with 68, 17 ahead of Pine', slot: 'layer', styles: ['cap.sub(0.5)'] }
```
````

## Ranked bars

<!-- reply-demo:ranked -->

Show ordered comparisons with category labels and clarify which direction is better. This horizontal bar preset draws the first category row at the bottom. List values from largest to smallest to show the smallest at the top. Keep the right grid margin so the value labels fit in narrow replies.

````text
```text jamll-content
{ type: 'chart-bar', cap: 'Page load time', style: { width: '100%', height: '16rem' }, styles: ['echarts.bar(maxWidth:20)', 'echarts.bar.flipXY', 'echarts.grid(right:3.5rem)', 'echarts.bar.label(show:true;position:right)'], data: [['Page', 'Load time'], ['Checkout', 1380], ['Search', 1140], ['Product', 960], ['Home', 820]] }
    { type: 'label', cap: 'Load time in ms, smaller is better', slot: 'layer', styles: ['cap.sub(0.85)'] }
```
````

## Share of a whole

<!-- reply-demo:ring -->

Show a few shares of a meaningful whole and label the precise percentages beside the chart.

````text
```text jamll-content
{ type: 'chart-pie', cap: 'Traffic share', style: { width: '100%', height: '16rem' }, styles: ['echarts.tooltip(trigger:item)', 'echarts.pie.ring', 'echarts.pie.position(innerR:45%;outerR:70%;cX:35%)'], data: [['Source', 'Share'], ['Search', 46], ['Direct', 31], ['Referral', 23]] }
    { type: 'container', slot: 'layer', styles: ['layout.flex(direction:column)', 'css(gap:xs;position:absolute;right:15%;top:50%;transform:translateY(-50%))'], childStyles: ['indicator.inline', 'value.color.primary', 'css(width:9rem)'] }
        { type: 'indicator-percent', icon: '●', cap: 'Search', value: 0.46, styles: ['indicator.icon.text(color:ac0)'] }
        { type: 'indicator-percent', icon: '●', cap: 'Direct', value: 0.31, styles: ['indicator.icon.text(color:ac1)'] }
        { type: 'indicator-percent', icon: '●', cap: 'Referral', value: 0.23, styles: ['indicator.icon.text(color:ac2)'] }
    { type: 'label', cap: 'Search brings almost half of all visits', slot: 'layer', styles: ['cap.sub(0.5)'] }
```
````

## Ordered instructions

<!-- reply-demo:ordered -->

Use `steps` for instructions whose sequence matters. Omit `status` on every record to show numbered how-to steps.

````text
```text jamll-content
{ type: 'steps', cap: 'Reset the router', data: [{ id: 'unplug', name: 'Unplug the router for 30 seconds' }, { id: 'plug', name: 'Plug it back in and wait for the light to turn steady' }, { id: 'connect', name: 'Reconnect your device to the network' }] }
```
````

## Checklist

<!-- reply-demo:checklist -->

Let the user mark supplied tasks complete within the view.

````text
```text jamll-content
{ type: 'list-todo', cap: 'Launch checklist', styles: ['options.disc'], data: [{ id: 'copy', name: 'Final copy approved', finish: true }, { id: 'qa', name: 'QA pass on mobile', finish: true }, { id: 'notes', name: 'Release notes published' }, { id: 'announce', name: 'Announcement scheduled' }] }
```
````

## Progress steps

<!-- reply-demo:progress -->

Show the stages of a process in order. Use `status` for the native visual state and standard caption, `name` for exact stage wording or a blocker detail, and `current` for the active stage.

````text
```text jamll-content
{ type: 'steps', cap: 'Order 4821', current: 'address', data: [{ id: 'placed', name: 'Placed', status: 'finish' }, { id: 'packed', name: 'Packed', status: 'finish' }, { id: 'address', name: 'Address verification', status: 'process' }, { id: 'dispatch', name: 'Dispatch — blocked until the address is confirmed', status: 'warning' }, { id: 'delivery', name: 'Delivery — waiting for dispatch', status: 'wait' }] }
```
````

## Mixed dashboard

<!-- reply-demo:panel -->

Combine related metrics, a trend and record detail into one compact view.

````text
```text jamll-content
{ type: 'container', style: { width: '100%' }, styles: ['layout.autoalign', 'group.bento'], childStyles: ['props(minHeight:8rem;padding:0.75rem)'] }
    { type: 'indicator-number', icon: '📦', cap: 'Orders', value: 1284, styles: ['indicator.trailingIcon', 'indicator.vertical', 'indicator.lefted', 'value.major()', 'cap.main(0.75)', 'value.color.primary', 'value.grouped'] }
        { type: 'label', cap: 'Four weeks to date', slot: 'layer', styles: ['indicator.sub', 'cap.sub'] }
    { type: 'indicator-percent', icon: '🚚', cap: 'On time', value: 0.94, valueStates: { good: 'value>=0.9', watch: 'value>=0.7', late: 'value<0.7' }, styles: ['indicator.trailingIcon', 'indicator.vertical', 'indicator.lefted', 'value.major()', 'cap.main(0.75)', 'color.stateMap(good:success;watch:warn;late:error)', 'value.color.primary'] }
        { type: 'label', cap: 'Target 90%', slot: 'layer', styles: ['indicator.sub', 'cap.sub'] }
    { type: 'chart-line', cap: 'Orders by week', style: { width: '100%', height: '14rem' }, styles: ['echarts.line.gradientBg'], data: [['Week', 'Orders'], ['W1', 280], ['W2', 312], ['W3', 305], ['W4', 387]] }
        { type: 'label', cap: 'W1–W4: up from 280 to 387', slot: 'layer', styles: ['cap.sub(0.5)'] }
    { type: 'table', cap: 'Regions', styles: ['table.stripy', 'table.stretchrow'], data: [{ region: 'North', orders: 482 }, { region: 'South', orders: 256 }], dataDef: [{ key: 'region', cap: 'Region' }, { key: 'orders', cap: 'Orders', type: 'indicator-number', styles: ['indicator.capslot.hide'] }] }
```
````
