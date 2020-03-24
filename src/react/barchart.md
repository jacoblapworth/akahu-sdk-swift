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
import 'array.prototype.find';
import { XUIBarChart } from './barchart';

const data = [
  { id: 0, x: 'Apple', y: 1 },
  { id: 1, x: 'Potato', y: 2 },
  { id: 2, x: 'Carrot', y: 3 }
];
class Demo extends React.Component {
  constructor(...args) {
    super(...args);
    this.handleBarClick = this.handleBarClick.bind(this);
    this.state = { activeBars: {} };
  }
  handleBarClick(event, { id }) {
    const { activeBars } = this.state;
    const activeState = activeBars[id] || false;
    this.setState({
      activeBars: {
        ...activeBars,
        [id]: !activeState
      }
    });
  }
  render() {
    return (
      <XUIBarChart
        chartId="chartPlainBar"
        chartTitle="Plain Bar Implementation"
        chartDescription="An implementation showing props that are specific to plain bars"
        chartHeight={300}
        barsData={data}
        onBarClick={this.handleBarClick}
        activeBars={this.state.activeBars}
        createBarToolTipMessage={({ y }) => `${y} Item${Math.sqrt(y * y) === 1 ? '' : 's'}`}
        keyLabel="Healthy food"
        barColor="#FF6496"
        barColorActive="rgba(0,0,0,0.5)"
        keyTitle="Graph key"
        emptyMessage="There is no data to display"
        paginationNextTitle="Next page"
        paginationPreviousTitle="Previous page"
      />
    );
  }
}
<Demo />;
```

```jsx harmony
import 'array.prototype.find';
import { XUIBarChart } from './barchart';

const keyLabel = ['Organic', 'GMO'];
const data = [
  { id: 0, x: 'Apple', y: [1] },
  { id: 1, x: 'Potato', y: [1, 1] },
  { id: 2, x: 'Carrot', y: [2, 1] }
];
class Demo extends React.Component {
  constructor(...args) {
    super(...args);
    this.handleBarClick = this.handleBarClick.bind(this);
    this.state = { activeBars: {} };
  }
  handleBarClick(event, { id, stackIndex }) {
    const { activeBars } = this.state;
    const activeBar = activeBars[id] || [];
    const activeIndex = activeBar.indexOf(stackIndex);
    const isActive = activeIndex >= 0;
    this.setState({
      activeBars: {
        ...activeBars,
        [id]: isActive
          ? [...activeBar.slice(0, activeIndex), ...activeBar.slice(activeIndex + 1)]
          : [...activeBar, stackIndex]
      }
    });
  }
  render() {
    return (
      <XUIBarChart
        chartId="chartStackedBar"
        chartTitle="Stacked Bar Implementation"
        chartDescription="An implementation showing props that are specific to stacked bars"
        chartHeight={300}
        isBarStacked
        barsData={data}
        onBarClick={this.handleBarClick}
        activeBars={this.state.activeBars}
        createBarToolTipMessage={({ y, stackIndex }) => {
          const value = y[stackIndex];
          return `${value} ${keyLabel[stackIndex]} Item${
            Math.sqrt(value * value) === 1 ? '' : 's'
          }`;
        }}
        keyLabel={keyLabel}
        barColor={['#5A5AE6', '#50DCAA']}
        barColorActive="rgba(0,0,0,0.5)"
        keyTitle="Graph key"
        emptyMessage="There is no data to display"
        paginationNextTitle="Next page"
        paginationPreviousTitle="Previous page"
      />
    );
  }
}
<Demo />;
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
import 'array.prototype.find';
import { XUIBarChart } from './barchart';

const wrapperStyles = {
  display: 'inline-block',
  verticalAlign: 'top',
  minWidth: '300px',
  padding: '0 50px',
  width: '50%'
};
class Demo extends React.Component {
  render() {
    return (
      <div>
        <div style={wrapperStyles}>
          <XUIBarChart
            chartId="chartAvatarLabel"
            chartTitle="Avatar Label"
            chartDescription="The x-axis avatar label variant"
            chartHeight={200}
            xAxisType="avatar"
            barsData={[
              { id: 0, x: 'Layla Abernathy', y: 1 },
              { id: 1, x: 'Heloise Stanton', y: 2 },
              { id: 2, x: 'Rollin McCullough', y: 3 }
            ]}
            keyTitle="Graph key"
            emptyMessage="There is no data to display"
            paginationNextTitle="Next page"
            paginationPreviousTitle="Previous page"
          />
        </div>
        <div style={wrapperStyles}>
          <XUIBarChart
            chartId="chartAvatarLabel"
            chartTitle="Avatar Label"
            chartDescription="The x-axis avatar label variant"
            chartHeight={200}
            xAxisType="avatar"
            barsData={[
              {
                id: 0,
                x: 'Layla Abernathy',
                y: 1,
                avatarUrl: 'https://xui.xero.com/static/xpert-avatar.png'
              },
              { id: 1, x: 'Heloise Stanton', y: 2, avatarUrl: 'https://placekitten.com/100/100' },
              { id: 2, x: 'Rollin McCullough', y: 3, avatarUrl: 'https://placekitten.com/200/200' }
            ]}
            keyTitle="Graph key"
            emptyMessage="There is no data to display"
            paginationNextTitle="Next page"
            paginationPreviousTitle="Previous page"
          />
        </div>
        <div style={wrapperStyles}>
          <XUIBarChart
            chartId="chartAbbreviationLabel"
            chartTitle="Abbreviation Label"
            chartDescription="The x-axis abbreviation label variant"
            chartHeight={200}
            xAxisType="abbreviation"
            barsData={[
              { id: 0, x: 'M | Mon | Monday | Monday 21 May', y: 1 },
              { id: 1, x: 'T | Tue | Tuesday | Tuesday 22 May', y: 2 },
              { id: 2, x: 'W | Wed | Wednesday | Wednesday 23 May', y: 3 }
            ]}
            keyTitle="Graph key"
            emptyMessage="There is no data to display"
            paginationNextTitle="Next page"
            paginationPreviousTitle="Previous page"
          />
        </div>
      </div>
    );
  }
}
<Demo />;
```

### Y-Axis

The y-axis **tick** values are derived from the `y` key value pair in the `barsData` structure. The final visual representation is a result of _"internal"_ systems that attempt to round the ticks to whole numbers and keep a physical space between them.

The y-axis customisation options are:

- `createYAxisLabelFormat`: A function that returns an augmentation of the _"raw"_ `y` value

- `yAxisDefaultTopValue`: A custom _"max"_ value to appear at the top of the axis. **Note:**

  - This custom value is still sanitised by our _"internal"_ display system and therefore may be changed slightly.
  - A greater `y` value will supersede this prop.

```jsx harmony
import 'array.prototype.find';
import { XUIBarChart } from './barchart';

const data = [
  { id: 0, x: 'Apple', y: 1 },
  { id: 1, x: 'Potato', y: 2 },
  { id: 2, x: 'Carrot', y: 3 }
];
class Demo extends React.Component {
  render() {
    return (
      <XUIBarChart
        chartId="chartYAxisCustomisation"
        chartTitle="Y-Axis Customisation"
        chartDescription="An example of different y-axis customisations"
        chartHeight={300}
        yAxisDefaultTopValue={20}
        createYAxisLabelFormat={value => `${Math.round(value * 100)}k`}
        barsData={data}
        keyTitle="Graph key"
        emptyMessage="There is no data to display"
        paginationNextTitle="Next page"
        paginationPreviousTitle="Previous page"
      />
    );
  }
}
<Demo />;
```

### Height

The `height` of the chart can be controlled with the `chartHeight` prop.

**Note:** The `width` of the chart will **always** expand to fill it's container and is **not** controlled via a prop.

### States

The chart can change its state to reflect its supplied props.

#### Loading

Display the **loading** state using the prop `isLoading`. You must also provide a `loadingAriaLabel` for accessibility purposes.

#### Empty

If there is no `barsData`, an **empty** state is shown. You must choose one of the following options:

- `emptyMessage`: Set the message to be used with the bar chart icon.
- `emptyStateComponent`: Override the entire empty state component with your own.

```jsx harmony
import 'array.prototype.find';
import { XUIBarChart } from './barchart';

const data = [
  { id: 0, x: 'Apple', y: 1 },
  { id: 1, x: 'Potato', y: 2 },
  { id: 2, x: 'Carrot', y: 3 }
];
const wrapperStyles = {
  display: 'inline-block',
  verticalAlign: 'top',
  minWidth: '300px',
  padding: '0 50px',
  width: '50%'
};
class Demo extends React.Component {
  render() {
    return (
      <div>
        <div style={wrapperStyles}>
          <XUIBarChart
            chartId="chartLoading"
            chartTitle="Loading State"
            chartDescription="A depiction of the chart loading state"
            chartHeight={200}
            barsData={data}
            isLoading
            keyTitle="Graph key"
            emptyMessage="There is no data to display"
            paginationNextTitle="Next page"
            paginationPreviousTitle="Previous page"
            loadingAriaLabel="Loading"
          />
        </div>
        <div style={wrapperStyles}>
          <XUIBarChart
            chartId="chartEmpty"
            chartTitle="Empty State"
            chartDescription="A depiction of the chart empty state"
            chartHeight={200}
            keyTitle="Graph key"
            emptyMessage="There is no data to display"
            paginationNextTitle="Next page"
            paginationPreviousTitle="Previous page"
            // emptyStateComponent={(
            //   <div className="xui-text-align-center">
            //     <h3 className="xui-heading-xlarge">Sorry 🙁</h3>
            //     <p className="xui-heading-small">There is no data to display!</p>
            //   </div>
            // )}
          />
        </div>
      </div>
    );
  }
}
<Demo />;
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
import 'array.prototype.find';
import { XUIBarChart } from './barchart';

const data = [
  { id: 0, x: 'Apple', y: 1 },
  { id: 1, x: 'Potato', y: 2 },
  { id: 2, x: 'Carrot', y: 3 },
  { id: 3, x: 'Banana', y: 4 },
  { id: 4, x: 'Berry', y: 2 },
  { id: 5, x: 'Orange', y: 1 },
  { id: 6, x: 'Beetroot', y: 4 },
  { id: 7, x: 'Pumpkin', y: 2 },
  { id: 8, x: 'Lettuce', y: 3 }
];

class Demo extends React.Component {
  render() {
    return (
      <XUIBarChart
        chartId="chartOverflow"
        chartTitle="Overflow"
        chartDescription="An example of the chart overflow system"
        chartHeight={300}
        barsData={data}
        xAxisVisibleItems={5}
        keyTitle="Bar Chart key"
        keyLabel="Healthy food"
        hasPagination
        createPaginationMessage={(current, total) => `Page ${current} of ${total}`}
        paginationLabel="Chart Pagination"
        paginationNextTitle="Next set of data"
        paginationPreviousTitle="Previous set of data"
        emptyMessage="There is no data to display"
      />
    );
  }
}
<Demo />;
```
