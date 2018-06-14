## Bar Charts...

#### Examples

```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data = [
	{ id: 0, x: "Apple", y: [2] },
	{ id: 1, x: "Potato", y: [2, 1] },
	{ id: 2, x: "Carrot", y: [1, 3] },
];
class Demo extends React.Component {

	constructor() {
		super();
		this.handleBarClick = this.handleBarClick.bind(this);
		this.state = { activeBars: {} };
	}

	handleBarClick(event, {barId}) {
		const { activeBars } = this.state
		const activeState = activeBars[barId] || false;

		this.setState({ activeBars: {
			...activeBars,
			[barId]: !activeState
		} });
	}

	render() {
		return (
			<XUIBarChart
				chartId="barClick"
				chartTitle="Clickable Bar"
				chartDescription="Click a bar to toggle the active state"
				isStacked
				barsData={data}
				onBarClick={this.handleBarClick}
				activeBars={this.state.activeBars}
			/>
		);
	}
}

<Demo />
```

```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data = [
	{ id: 0, x: "Apple", y: [2] },
	{ id: 1, x: "Potato", y: [2, 1] },
	{ id: 2, x: "Carrot", y: [1, 3] },
];
class Demo extends React.Component {

	constructor() {
		super();
		this.handleBarClick = this.handleBarClick.bind(this);
		this.state = { activeBars: {} };
	}

	handleBarClick(event, { barId, stackIndex }) {
		const { activeBars } = this.state
		const activeBar = activeBars[barId] || [];
		const activeIndex = activeBar.indexOf(stackIndex);
		const isActive = activeIndex >= 0;

		this.setState({ activeBars: {
			...activeBars,
			[barId]: isActive
				? [...activeBar.slice(0, activeIndex), ...activeBar.slice(activeIndex + 1)]
				: [...activeBar, stackIndex]
		}});
	}

	render() {
		return (
			<XUIBarChart
				chartId="barClick"
				chartTitle="Clickable Stack"
				chartDescription="Click a stack to toggle the active state"
				isStacked
				barsData={data}
				onBarClick={this.handleBarClick}
				activeBars={this.state.activeBars}
			/>
		);
	}
}

<Demo />
```

```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data = [
	{ id: 0, x: "Apple", y: 2 },
	{ id: 1, x: "Potato", y: 3 },
	{ id: 2, x: "Carrot", y: 4 },
];
class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				chartId="barTooltip"
				chartTitle="Bar Tooltip"
				chartDescription="Hover over a bar to reveal relevant information"
				barsData={data}
				createBarToolTipMessage={({x}) => <strong>{x}</strong>}
			/>
		);
	}
}

<Demo />
```

```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data= [
	{ id: 0, x: "Apple", y: [2] },
	{ id: 1, x: "Potato", y: [2, 1] },
	{ id: 2, x: "Carrot", y: [1, 3] },
];
class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				chartId="stackTooltip"
				chartTitle="Stack Tooltip"
				chartDescription="Hover over a stack to reveal relevant information"
				isStacked
				barsData={data}
				createBarToolTipMessage={({x, stackIndex}) => (
					<div>
						<div><strong>{x}</strong></div>
						<div><strong>{stackIndex + 1 && `Stack #${stackIndex + 1}`}</strong></div>
					</div>
				)}
			/>
		);
	}
}

<Demo />
```

```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data = [
	{ id: 0, x: "Apple", y: [2] },
	{ id: 1, x: "Potato", y: [2, 1] },
	{ id: 2, x: "Carrot", y: [1, 3] },
	{ id: 3, x: "Banana", y: [4] },
	{ id: 4, x: "Berry", y: [1, 2] },
	{ id: 5, x: "Orange", y: [3, 1] },
	{ id: 6, x: "Beetroot", y: [2, 3] },
	{ id: 7, x: "Pumpkin", y: [1, 1, 1, 1] },
	{ id: 8, x: "Lettuce", y: [2, 1] },
];
class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				chartId="stackColors"
				chartTitle="Stack Colors"
				chartDescription="Customise the colors on a per stack level"
				isStacked
				barsData={data}
				barColor={['#F6534E', '#FA8100', '#B450C8', '#FF6496']}
			/>
		);
	}
}

<Demo />
```


```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data= [
	{ id: 0, x: "Apple", y: [2] },
	{ id: 1, x: "Potato", y: [2, 1] },
	{ id: 2, x: "Carrot", y: [1, 3] },
];
class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				chartId="maximumBars"
				chartTitle="Maximum Bars"
				chartDescription="Control the maximum amount of bars per panel"
				isStacked
				barsData={data}
				xAxisVisibleItems={3}
			/>
		);
	}
}

<Demo />
```

```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const XUIButton = require('./components/button/XUIButton').default;
const XUIButtonGroup = require('./components/button/XUIButtonGroup').default;
const XUIIcon = require('./components/icon/XUIIcon').default;
const addIcon = require('@xero/xui-icon/icons/addition').default;
const subtractionIcon = require('@xero/xui-icon/icons/subtraction').default;

const data = [
	{ id: 0, x: "Layla Abernathy", y: [1, 1, 2, 1] },
	{ id: 1, x: "Dr. Jennifer Bosco", y: [2, 1] },
	{ id: 2, x: "Lilian Willms DVM", y: [1, 3] },
	{ id: 3, x: "Heloise Stanton", y: [4] },
	{ id: 4, x: "Janet Mayert DVM", y: [2, 2] },
	{ id: 5, x: "Rollin McCullough", y: [3, 1] },
	{ id: 6, x: "Laury Kris", y: [2, 3] },
	{ id: 7, x: "Jose Schmitt IV", y: [2, 1, 1, 1] },
	{ id: 8, x: "Isom Tremblay", y: [1, 4] },
];

class Demo extends React.Component {

	constructor() {
		super();
		this.handleBarAdd = this.handleBarAdd.bind(this);
		this.handleBarSubtract = this.handleBarSubtract.bind(this);
		this.state = { bars: data.slice(0, 3) };
	}

	handleBarAdd() {
		const { bars } = this.state;
		const total = bars.length;
		const index = total % data.length;
		const version = Math.floor(total / data.length);
		const bar = data[index];
		const x = version ? `${bar.x} (${version})` : bar.x;
		const id = bars.length;

		this.setState({ bars: [
			...bars,
			{ ...bar, id, x }
		] });
	}

	handleBarSubtract() {
		const { bars } = this.state;
		const { length }  = bars;
		if (length > 1) {
			this.setState({ bars: bars.slice(0, length - 1) });
		}
	}

	render() {
		const bars = this.state.bars;
		const total = bars.length;
		return (
			<div>
				<XUIButton
					variant="icon"
					onClick={this.handleBarSubtract}>
					<XUIIcon path={subtractionIcon} />
				</XUIButton>
				<XUIButton
					variant="icon"
					onClick={this.handleBarAdd}>
					<XUIIcon path={addIcon} />
				</XUIButton>
				<XUIBarChart
					chartId="barAdd"
					chartTitle={`Showing ${total} bar${total === 1 ? '' : 's'}`}
					chartDescription="Click the buttons above to add / subtract bars"
					isStacked
					barsData={bars}
				/>
			</div>
		);
	}
}

<Demo />
```

```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data = [
	{ id: 0, x: "Apple", y: [2] },
	{ id: 1, x: "Potato", y: [2, 1] },
	{ id: 2, x: "Carrot", y: [1, 3] },
	{ id: 3, x: "Banana", y: [4] },
	{ id: 4, x: "Berry", y: [1, 2] },
	{ id: 5, x: "Orange", y: [3, 1] },
	{ id: 6, x: "Beetroot", y: [2, 3] },
	{ id: 7, x: "Pumpkin", y: [1, 1, 1, 1] },
	{ id: 8, x: "Lettuce", y: [2, 1] },
];

class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				chartId="nativeScroll"
				chartTitle="Native Scroll"
				chartDescription="Scroll bars horizontally to reveal additional content"
				isStacked
				barsData={data}
				xAxisVisibleItems={5}
			/>
		);
	}
}

<Demo />
```


```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data = [
	{ id: 0, x: "Apple", y: [2] },
	{ id: 1, x: "Potato", y: [2, 1] },
	{ id: 2, x: "Carrot", y: [1, 3] },
	{ id: 3, x: "Banana", y: [4] },
	{ id: 4, x: "Berry", y: [1, 2] },
	{ id: 5, x: "Orange", y: [3, 1] },
	{ id: 6, x: "Beetroot", y: [2, 3] },
	{ id: 7, x: "Pumpkin", y: [1, 1, 1, 1] },
	{ id: 8, x: "Lettuce", y: [2, 1] },
];

class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				chartId="pagination"
				chartTitle="Pagination Scroll"
				chartDescription={`Click the pagination buttons to reveal "next" and "previous" panels`}
				isStacked
				hasPagination
				barsData={data}
				xAxisVisibleItems={5}
			/>
		);
	}
}

<Demo />
```


```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data = [
	{ id: 0, x: "Apple", y: [2] },
	{ id: 1, x: "Potato", y: [2, 1] },
	{ id: 2, x: "Carrot", y: [1, 3] },
	{ id: 3, x: "Banana", y: [4] },
	{ id: 4, x: "Berry", y: [1, 2] },
	{ id: 5, x: "Orange", y: [3, 1] },
	{ id: 6, x: "Beetroot", y: [2, 3] },
	{ id: 7, x: "Pumpkin", y: [1, 1, 1, 1] },
	{ id: 8, x: "Lettuce", y: [2, 1] },
];

class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				chartId="customPagination"
				chartTitle="Custom Pagination Message"
				chartDescription="Create a custom message based on the current and total page values"
				isStacked
				hasPagination
				createPaginationMessage={(current, total) => `Page ${current} of ${total}`}
				barsData={data}
				xAxisVisibleItems={5}
			/>
		);
	}
}

<Demo />
```


```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data = [
	{ id: 0, x: "Apple", y: [2] },
	{ id: 1, x: "Potato", y: [2, 1] },
	{ id: 2, x: "Carrot", y: [1, 3] },
];

class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				chartId="maxYValue"
				chartTitle="Maximum Y-Axis Value"
				chartDescription="Sets a maximum threshold that can be exceeded if a stack requires it"
				isStacked
				barsData={data}
				yAxisMaxValue={20}
			/>
		);
	}
}

<Demo />
```

```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data = [
	{ id: 0, x: "Apple", y: [2] },
	{ id: 1, x: "Potato", y: [2, 1] },
	{ id: 2, x: "Carrot", y: [1, 3] },
];

class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				chartId="customYAxis"
				chartTitle="Custom Y-Axis Labels"
				chartDescription="Format labels to enhance the graph axis information"
				isStacked
				barsData={data}
				createYAxisLabelFormat={(value) => `${Math.round(value * 100)}k`}
			/>
		);
	}
}

<Demo />
```


```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data = [
	{ id: 0, x: "Apple", y: [] },
	{ id: 1, x: "Potato", y: [] },
	{ id: 2, x: "Carrot", y: [] },
];

class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				chartId="emptyStackData"
				chartTitle="Empty Stack Data"
				chartDescription="Show chart even when no stack data is supplied"
				isStacked
				barsData={data}
			/>
		);
	}
}

<Demo />
```


```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data = [
	{ id: 0, x: "Apple", y: 0 },
	{ id: 1, x: "Potato", y: 0 },
	{ id: 2, x: "Carrot", y: 0 },
];

class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				chartId="emptyBarData"
				chartTitle="Empty Bar Data"
				chartDescription="Show chart even when no bar data is supplied"
				barsData={data}
			/>
		);
	}
}

<Demo />
```


```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data = [];

class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				chartId="emptyBarData"
				chartTitle="Empty Bar Data"
				chartDescription="Show empty state when no bar data is supplied"
				isStacked
				barsData={data}
			/>
		);
	}
}

<Demo />
```


```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data = [];

class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				chartId="emptyCustomData"
				chartTitle="Empty Custom Data"
				chartDescription="Replace the default empty component with a custom version"
				emptyStateComponent={<p>On No! Zero Data</p>}
				isStacked
				barsData={data}
			/>
		);
	}
}

<Demo />
```


```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data = [
	{ id: 0, x: "Apple", y: [] },
	{ id: 1, x: "Potato", y: [] },
	{ id: 2, x: "Carrot", y: [] },
];

class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				chartId="loadingState"
				chartTitle="Loading State"
				chartDescription="Show loading state via user stipulation"
				isLoading
				isStacked
				barsData={data}
			/>
		);
	}
}

<Demo />
```


```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data = [
	{ id: 0, x: "Apple", y: [2] },
	{ id: 1, x: "Potato", y: [2, 1] },
	{ id: 2, x: "Carrot", y: [1, 3] },
];
class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				chartId="chartKey"
				chartTitle="Chart Key"
				chartDescription={`Click the "information" icon to reveal the key`}
				isStacked
				barsData={data}
				keyLabel={['Import', 'Export']}
				keyTitle="Chart Key"
			/>
		);
	}
}

<Demo />
```


```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data = [
	{ id: 0, x: "Apple", y: [2] },
	{ id: 1, x: "Potato", y: [2, 1] },
	{ id: 2, x: "Carrot", y: [1, 3] },
];
class Demo extends React.Component {

	render() {
		return (
			<div style={{ width: '200px' }}>
				<XUIBarChart
					chartId="chartSize"
					chartTitle="Chart Size"
					chartDescription="Customise the chart size"
					isStacked
					barsData={data}
					chartHeight={200}
				/>
			</div>
		);
	}
}

<Demo />
```


```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data = [
	{ id: 0, x: "Apple", y: 2 },
	{ id: 1, x: "Potato", y: 3 },
	{ id: 2, x: "Carrot", y: 4 },
];
class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				chartId="barPlain"
				chartTitle="Plain Bars"
				chartDescription="Plain bar chart with no stacks"
				barsData={data}
				barColor="#F6534E"
				keyLabel="Import"
			/>
		);
	}
}

<Demo />
```


```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data = [
	{ id: 0, x: "Apple", y: 2 },
	{ id: 1, x: "Potato", y: 3 },
	{ id: 2, x: "Carrot", y: 4 },
	{ id: 3, x: "Banana", y: 4 },
	{ id: 4, x: "Berry", y: 3 },
	{ id: 5, x: "Orange", y: 4 },
	{ id: 6, x: "Beetroot", y: 5 },
	{ id: 7, x: "Pumpkin", y: 4 },
	{ id: 8, x: "Lettuce", y: 3 },
];
class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				chartId="headerStress"
				chartTitle="Header Stress Test Ensuring Large Amounts of Content is Handled Correctly at Different Screen Sizes"
				chartDescription="Responsively handle large quantities of content in the header area"
				barsData={data}
				xAxisVisibleItems={5}
				keyLabel="Import"
				hasPagination
				createPaginationMessage={(current, total) => `Page ${current} of ${total}`}
			/>
		);
	}
}

<Demo />
```


```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data = [
	{ id: 0, x: "Apple", y: 2 },
	{ id: 1, x: "Potato", y: 3 },
	{ id: 2, x: "Carrot", y: 4 },
];
class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				chartId="hideTitle"
				chartTitle="Hidden Title"
				isChartTitleHidden
				chartDescription="Hide title yet still use it for accessibility purposes"
				barsData={data}
			/>
		);
	}
}

<Demo />
```


```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data = [
	{ id: 0, x: "Apple", y: 2 },
	{ id: 1, x: "Potato", y: 3 },
	{ id: 2, x: "Carrot", y: 4 },
];
class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				chartId="avatarLabel"
				chartTitle="Avatar Label"
				chartDescription="A responsive Avatar / Tag label combination"
				barsData={data}
				xAxisType="avatar"
			/>
		);
	}
}

<Demo />
```


```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data = [
	{ id: 0, x: "M | Mon | Monday | Monday 21 May", y: 2 },
	{ id: 1, x: "T | Tue | Tuesday | Tuesday 22 May", y: 3 },
	{ id: 2, x: "W | Wed | Wednesday | Wednesday 23 May", y: 4 },
];
class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				chartId="abbreviationLabel"
				chartTitle="Abbreviation Label"
				chartDescription="A responsive label system showing various levels of information"
				barsData={data}
				xAxisType="abbreviation"
			/>
		);
	}
}

<Demo />
```

```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');
const data = [
	{ id: 0, x: "Apple", y: 0 },
	{ id: 1, x: "Potato", y: 10 },
	{ id: 2, x: "Carrot", y: 100000000000000 },
];
class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				chartId="dataDisparity"
				chartTitle="Data Disparity"
				chartDescription="Keeping small data sets visible when accompanied by data with great disparity"
				barsData={data}
			/>
		);
	}
}

<Demo />
```
