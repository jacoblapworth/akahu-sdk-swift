<div class="xui-margin-vertical">
	<a href="../section-components-displayingdata-barchart.html" isDocLink>Bar charts in the XUI Documentation</a>
</div>

## Bar Charts

### Bars

The bar chart comes in two variants **plain** and **stacked**. The differentiator is primarily their data structure where **plain** bars use a single `number` and **stacked** bars hold their data in an `array`.

This **plain** _vs_ **stacked** data structure is also represented differently in the props `keyLabel`, `barColor`, `activeBars`, `onBarClick`, and `createBarToolTipMessage` _(see the component examples below)_.

#### Colors

The **bar** or **bar stacks** can be customised with the `barColor` prop.

#### Active

A **bar** or **bar stack** can be targeted with an **active** state using the `activeBars` prop.

**Tip:** You can target a bars entire set of stacks by passing in `true` rather than targeting each individual stack.

```jsx harmony
import { useState } from 'react';
import XUIBarChart from '@xero/xui/react/barchart';

const data = [
  { id: 0, x: '2021', y: 10 },
  { id: 1, x: '2020', y: 20 },
  { id: 2, x: '2019', y: 5 },
  { id: 3, x: '2018', y: 10 },
  { id: 4, x: '2017', y: 20 },
  { id: 5, x: '2016', y: 5 }
];

const BarChartExample = () => {
  const [activeBars, setActiveBars] = useState({});

  const handleBarClick = (event, { id }) => {
    const activeState = activeBars[id] || false;
    setActiveBars({ ...activeBars, [id]: !activeState });
  };

  return (
    <XUIBarChart
      activeBars={activeBars}
      barColor="#80C19E"
      barColorActive="rgba(0,0,0,0.5)"
      barsData={data}
      chartDescription="Bar chart showing yearly income from the past six years. 2021: $10000, 2020: $20000, 2019: $5000, 2018: $10000, 2017: $20000, 2016: $5000."
      chartHeight={300}
      chartId="incomeChart"
      chartTitle="Yearly income (in thousands of U.S. dollars)"
      createBarToolTipMessage={bar => `${Math.round(bar.y)}k`}
      isXAxisToolTipHidden
      keyLabel="Yearly income"
      keyTitle="Income graph key"
      onBarClick={handleBarClick}
    />
  );
};

<BarChartExample />;
```

```jsx harmony
import { useState } from 'react';
import XUIBarChart from '@xero/xui/react/barchart';

const data = [
  { id: 0, x: '2021', y: [3, 7] },
  { id: 1, x: '2020', y: [7, 13] },
  { id: 2, x: '2019', y: [2, 3] },
  { id: 3, x: '2018', y: [3, 7] },
  { id: 4, x: '2017', y: [7, 13] },
  { id: 5, x: '2016', y: [2, 3] }
];

const keyLabel = ['Restaurant', 'Bar'];

const BarChartExample = () => {
  const [activeBars, setActiveBars] = useState({});

  const handleBarClick = (event, { id, stackIndex }) => {
    const activeBar = activeBars[id] || [];
    const activeIndex = activeBar.indexOf(stackIndex);
    const isActive = activeIndex >= 0;

    setActiveBars({
      ...activeBars,
      [id]: isActive
        ? [...activeBar.slice(0, activeIndex), ...activeBar.slice(activeIndex + 1)]
        : [...activeBar, stackIndex]
    });
  };

  return (
    <XUIBarChart
      activeBars={activeBars}
      barColor={['#80C19E', '#EE99A3']}
      barColorActive="rgba(0,0,0,0.5)"
      barsData={data}
      chartDescription="Bar chart showing yearly income from the past six years. 2021: $10000, 2020: $20000, 2019: $5000, 2018: $10000, 2017: $20000, 2016: $5000."
      chartHeight={300}
      chartId="incomeChart"
      chartTitle="Yearly income (in thousands of U.S. dollars)"
      createBarToolTipMessage={bar => `${Math.round(bar.y[bar.stackIndex])}k`}
      isBarStacked
      isXAxisToolTipHidden
      keyLabel={keyLabel}
      keyTitle="Income graph key'"
      onBarClick={handleBarClick}
    />
  );
};

<BarChartExample />;
```

### Tooltips

Tooltips are _on_ for all chart elements by default. Specifying which tooltip(s) to hide can be done via the `isXAxisToolTipHidden` and `isBarToolTipHidden` props.

The **bar** tooltip can be customised using the prop `createBarToolTipMessage`. This is a function that is supplied arguments relevant to the **bar** or **stack**.

### X-Axis Labels

Specify the type of x-axis label using the prop `xAxisType`. Label content is derived from the `x` key value pair in the `barsData` structure.

#### Standard Label

`xAxisType="standard"` The default label option that truncates text as the label `width` decreases.

#### Avatar Label

`xAxisType="avatar"` Emulates the `<XUIAvatar />` format with a corresponding text tag.

#### Abbreviation Label

`xAxisType="abbreviation"` Takes a pipe `|` delimited string of up to four labels of ascending detail (_less detail_ --> _more detail_). As the label `width` changes an appropriate option is selected.

#### Label Maximum

The amount of labels per panel can be controlled via the prop `xAxisVisibleItems`.

**Note:** This is a desired value, if we feel that that bars are not fitting to their panel area effectively the layout will be altered to better suit the user.

```jsx harmony
import XUIBarChart from '@xero/xui/react/barchart';

const wrapperStyles = {
  display: 'inline-block',
  verticalAlign: 'top',
  minWidth: '300px',
  padding: '0 50px',
  width: '50%'
};

const data = [
  { id: 0, x: 'Layla Abernathy', y: [15, 1] },
  { id: 1, x: 'Heloise Stanton', y: [32, 0] },
  { id: 2, x: 'Rollin McCullough', y: [26, 2] }
];

const createBarToolTip = bar => {
  const timeType = bar.stackIndex === 0 ? 'chargeable' : 'non-chargeable';
  return `${Math.round((bar.y[bar.stackIndex] / (bar.y[0] + bar.y[1])) * 100)}% ${timeType}`;
};

<div>
  <div style={wrapperStyles}>
    <XUIBarChart
      barColor={['rgb(64, 71, 86)', 'rgb(166, 170, 177)']}
      barsData={data}
      chartId="staffTimeOverviewChart"
      chartTitle="Staff time overview (11 - 17 Apr 2022)"
      chartDescription="Bar chart showing chargeable and non-chargeable staff time from 11-17 April 2022."
      chartHeight={200}
      createBarToolTipMessage={bar => createBarToolTip(bar)}
      isBarStacked
      keyLabel={['Chargeable time', 'Non-chargeable time']}
      keyTitle="Chart key"
      xAxisType="avatar"
    />
  </div>
  <div style={wrapperStyles}>
    <XUIBarChart
      barsData={[
        { id: 0, x: 'M | Mon | Monday | Monday 21 May', y: 2350 },
        { id: 1, x: 'T | Tue | Tuesday | Tuesday 22 May', y: 1430 },
        { id: 2, x: 'W | Wed | Wednesday | Wednesday 23 May', y: 4321 }
      ]}
      chartDescription="Bar chart showing daily income. Monday 21 May: $2350, Tuesday 22 May: $1430, Wednesday 23 May: $4321."
      chartHeight={200}
      chartId="dailyIncome"
      chartTitle="Daily income"
      createBarToolTipMessage={bar => `$${bar.y}`}
      keyLabel="Daily income"
      keyTitle="Chart key"
      xAxisType="abbreviation"
    />
  </div>
</div>;
```

### Y-Axis

The y-axis **tick** values are derived from the `y` key value pair in the `barsData` structure. The final visual representation is a result of _"internal"_ systems that attempt to round the ticks to whole numbers and keep a physical space between them.

The y-axis customisation options are:

- `createYAxisLabelFormat`: A function that returns an augmentation of the _"raw"_ `y` value

- `yAxisDefaultTopValue`: A custom _"max"_ value to appear at the top of the axis. **Note:**

  - This custom value is still sanitised by our _"internal"_ display system and therefore may be changed slightly.
  - A greater `y` value will supersede this prop.

```jsx harmony
import XUIBarChart from '@xero/xui/react/barchart';

const data = [
  { id: 0, x: '2021', y: 10 },
  { id: 1, x: '2020', y: 20 },
  { id: 2, x: '2019', y: 5 },
  { id: 3, x: '2018', y: 10 },
  { id: 4, x: '2017', y: 20 },
  { id: 5, x: '2016', y: 5 }
];

<XUIBarChart
  barsData={data}
  chartDescription="Bar chart showing yearly income from the past six years. 2021: $10000, 2020: $20000, 2019: $5000, 2018: $10000, 2017: $20000, 2016: $5000."
  chartHeight={300}
  chartId="incomeChart"
  chartTitle="Yearly income (in thousands of U.S. dollars)"
  createYAxisLabelFormat={value => `${Math.round(value)}k`}
  keyLabel="Yearly income"
  keyTitle="Income graph key"
  yAxisDefaultTopValue={20}
/>;
```

### Height

The `height` of the chart can be controlled with the `chartHeight` prop.

**Note:** The `width` of the chart will **always** expand to fill it's container and is **not** controlled via a prop.

### States

The chart can change its state to reflect its supplied props.

#### Loading

Display the **loading** state using the prop `isLoading`. You must also provide a `loadingAriaLabel` for accessibility purposes.

```jsx harmony
import XUIBarChart from '@xero/xui/react/barchart';

const data = [
  { id: 0, x: '2021', y: 10 },
  { id: 1, x: '2020', y: 20 },
  { id: 2, x: '2019', y: 5 },
  { id: 3, x: '2018', y: 10 },
  { id: 4, x: '2017', y: 20 },
  { id: 5, x: '2016', y: 5 }
];

<XUIBarChart
  barsData={data}
  chartDescription="Bar chart showing yearly income from the past six years. 2021: $10000, 2020: $20000, 2019: $5000, 2018: $10000, 2017: $20000, 2016: $5000."
  chartHeight={200}
  chartId="incomeChart"
  chartTitle="Yearly income (in thousands of U.S. dollars)"
  isLoading
  loadingAriaLabel="Loading"
  keyLabel="Yearly income"
  keyTitle="Income graph key"
/>;
```

#### Empty

If there is no `barsData`, an **empty** state is shown. You must choose one of the following options:

- `emptyMessage`: Set the message to be used with the bar chart icon.
- `emptyStateComponent`: Override the entire empty state component with your own.

```jsx harmony
import XUIBarChart from '@xero/xui/react/barchart';
import XUIIcon from '@xero/xui/react/icon';
import chart from '@xero/xui-icon/icons/chart';

const wrapperStyles = {
  display: 'inline-block',
  minWidth: '300px',
  padding: '0 50px',
  width: '50%'
};

<div>
  <div style={wrapperStyles}>
    <XUIBarChart
      chartDescription="Bar chart showing yearly income from the past six years. 2021: $10000, 2020: $20000, 2019: $5000, 2018: $10000, 2017: $20000, 2016: $5000."
      chartHeight={200}
      chartId="incomeChart-emptyMessage"
      chartTitle="Yearly income (in thousands of U.S. dollars)"
      emptyMessage="There is no data to display"
      keyLabel="Yearly income"
      keyTitle="Income graph key"
    />
  </div>
  <div style={wrapperStyles}>
    <XUIBarChart
      chartDescription="Bar chart showing yearly income from the past six years. 2021: $10000, 2020: $20000, 2019: $5000, 2018: $10000, 2017: $20000, 2016: $5000."
      chartHeight={200}
      chartId="incomeChart-emptyStateComponent"
      chartTitle="Yearly income (in thousands of U.S. dollars)"
      emptyStateComponent={
        <div className="xui-chart--empty">
          <XUIIcon icon={chart} />
          <p>No income data found</p>
        </div>
      }
      keyLabel="Yearly income"
      keyTitle="Income graph key"
    />
  </div>
</div>;
```

### Title / Description

Add a chart **title** (`<title />`) and **description** (`<desc />`) with the `chartTitle` and `chartDescription` props.

The chart **title** is shown visually by default but you can choose to hide it _(and have it persist on the `<svg />` `title` tag **only**)_ with the `isChartTitleHidden` prop .

#### Overflow

By default the chart will try and fit in as many bar instances as it can into a visible panel. If there are too many instances to portray in a single panel we responsively overflow the bars.

There are two types of overflow to choose from:

#### Scroll

The default which uses a horizontal scrolling panel to reveal hidden content.

#### Pagination

Activated via the prop `hasPagination`. The hidden content is revealed via the **next** and **previous** buttons.

- `paginationNextLabel` / `paginationPreviousLabel`: The **next** and **previous** button `title`s _(required for accessibility)_.
- `createPaginationMessage`: Create a custom message based on the charts _current_ and _total_ panels.

### Key

Render the chart **key** providing a `keyLabel` prop referencing the **bar** or **bar stack** label(s). You must provide a `keyTitle` to set the title of the dropdown panel.

```jsx harmony
import XUIBarChart from '@xero/xui/react/barchart';

const data = [
  { id: 0, x: '2021', y: 10 },
  { id: 1, x: '2020', y: 20 },
  { id: 2, x: '2019', y: 5 },
  { id: 3, x: '2018', y: 10 },
  { id: 4, x: '2017', y: 20 },
  { id: 5, x: '2016', y: 5 }
];

<XUIBarChart
  barsData={data}
  chartDescription="Bar chart showing yearly income from the past six years. 2021: $10000, 2020: $20000, 2019: $5000, 2018: $10000, 2017: $20000, 2016: $5000."
  chartHeight={300}
  chartId="incomeChart-pagination"
  chartTitle="Yearly income (in thousands of U.S. dollars)"
  createPaginationMessage={(current, total) => `Page ${current} of ${total}`}
  hasPagination
  keyLabel="Yearly income"
  keyTitle="Income graph key"
  paginationLabel="Pagination"
  paginationNextTitle="Next page"
  paginationPreviousTitle="Previous page"
  xAxisVisibleItems={4}
/>;
```
