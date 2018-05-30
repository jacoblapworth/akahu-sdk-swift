## Bar Charts...

#### Examples

```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');

class Demo extends React.Component {

	constructor() {
		super();
		this.handleBarClick = this.handleBarClick.bind(this);
		this.state = { bars: [
			{ x: "Apple", y: [2] },
			{ x: "Potato", y: [2, 1] },
			{ x: "Carrot", y: [1, 3] },
		] };
	}

	handleBarClick(event, bar) {
		const { barIndex } = bar;
		const { bars } = this.state
		const currentBar = bars[barIndex];

		this.setState({ bars: [
			...bars.slice(0, barIndex),
			{ ...currentBar, isBarActive: !currentBar.isBarActive },
			...bars.slice(barIndex + 1),
		] });
	}

	render() {
		return (
			<XUIBarChart
				id="barClick"
				title="Clickable Bar"
				description="Click a bar to toggle the active state"
				isStacked
				bars={this.state.bars}
				onBarClick={this.handleBarClick}
				activeColor={"#51DAAF"}
			/>
		);
	}
}

<Demo />
```

```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');

class Demo extends React.Component {

	constructor() {
		super();
		this.handleBarClick = this.handleBarClick.bind(this);
		this.state = { bars: [
			{ x: "Apple", y: [2] },
			{ x: "Potato", y: [2, 1] },
			{ x: "Carrot", y: [1, 3] },
		] };
	}

	handleBarClick(event, bar) {
		const { barIndex, stackIndex } = bar;
		const { bars } = this.state
		const currentBar = bars[barIndex];
		const { activeStacks = [] } = currentBar;
		const activeIndex = activeStacks.indexOf(stackIndex);
		const isActive = activeIndex >= 0;

		this.setState({ bars: [
			...bars.slice(0, barIndex),
			{ ...currentBar, activeStacks: isActive
				? [...activeStacks.slice(0, activeIndex), ...activeStacks.slice(activeIndex + 1)]
				: [...activeStacks, stackIndex]
			},
			...bars.slice(barIndex + 1),
		] });
	}

	render() {
		return (
			<XUIBarChart
				id="barClick"
				title="Clickable Stack"
				description="Click a stack to toggle the active state"
				isStacked
				bars={this.state.bars}
				onBarClick={this.handleBarClick}
				activeColor={"#51DAAF"}
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
	{ x: "Apple", y: [2] },
	{ x: "Potato", y: [2, 1] },
	{ x: "Carrot", y: [1, 3] },
];
class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				id="barTooltip"
				title="Bar Tooltip"
				description="Hover over a bar to reveal relevant information"
				isStacked
				bars={data}
				createToolTipContent={bar => <strong>{bar.x}</strong>}
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
	{ x: "Apple", y: [2] },
	{ x: "Potato", y: [2, 1] },
	{ x: "Carrot", y: [1, 3] },
];
class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				id="stackTooltip"
				title="Stack Tooltip"
				description="Hover over a stack to reveal relevant information"
				isStacked
				bars={data}
				createToolTipContent={bar => (
					<div>
						<div><strong>{bar.x}</strong></div>
						<div><strong>{bar.stackIndex + 1 && `Stack #${bar.stackIndex + 1}`}</strong></div>
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
	{ x: "Apple", y: [2] },
	{ x: "Potato", y: [2, 1] },
	{ x: "Carrot", y: [1, 3] },
	{ x: "Banana", y: [4] },
	{ x: "Berry", y: [1, 2] },
	{ x: "Orange", y: [3, 1] },
	{ x: "Beetroot", y: [2, 3] },
	{ x: "Pumpkin", y: [1, 1, 1, 1] },
	{ x: "Lettuce", y: [2, 1] },
];
class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				id="stackColors"
				title="Stack Colors"
				description="Customise the colors on a per stack level"
				isStacked
				bars={data}
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
	{ x: "Apple", y: [2] },
	{ x: "Potato", y: [2, 1] },
	{ x: "Carrot", y: [1, 3] },
];
class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				id="maximumBars"
				title="Maximum Bars"
				description="Control the maximum amount of bars per panel"
				isStacked
				bars={data}
				maxVisibleItems={3}
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
	{ x: "Layla Abernathy", y: [1, 1, 2, 1] },
	{ x: "Dr. Jennifer Bosco", y: [2, 1] },
	{ x: "Lilian Willms DVM", y: [1, 3] },
	{ x: "Heloise Stanton", y: [4] },
	{ x: "Janet Mayert DVM", y: [2, 2] },
	{ x: "Rollin McCullough", y: [3, 1] },
	{ x: "Laury Kris", y: [2, 3] },
	{ x: "Jose Schmitt IV", y: [2, 1, 1, 1] },
	{ x: "Isom Tremblay", y: [1, 4] },
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

		this.setState({ bars: [
			...bars,
			{ ...bar, x }
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
		return (
			<div>
				<XUIButtonGroup>
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
				</XUIButtonGroup>
				<div>{this.state.bars.length}</div>
				<XUIBarChart
					id="barAdd"
					title="Change Bar Quantity"
					description="Click the buttons above to add / subtract bars"
					isStacked
					bars={this.state.bars}
					onBarClick={this.handleBarClick}
					barColor={['lightblue', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightsalmon']}
					activeColor={"#51DAAF"}
					maxVisibleItems={0}
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
	{ x: "Apple", y: [2] },
	{ x: "Potato", y: [2, 1] },
	{ x: "Carrot", y: [1, 3] },
	{ x: "Banana", y: [4] },
	{ x: "Berry", y: [1, 2] },
	{ x: "Orange", y: [3, 1] },
	{ x: "Beetroot", y: [2, 3] },
	{ x: "Pumpkin", y: [1, 1, 1, 1] },
	{ x: "Lettuce", y: [2, 1] },
];

class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				id="nativeScroll"
				title="Native Scroll"
				description="Scroll bars horizontally to reveal additional content"
				isStacked
				bars={data}
				maxVisibleItems={5}
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
	{ x: "Apple", y: [2] },
	{ x: "Potato", y: [2, 1] },
	{ x: "Carrot", y: [1, 3] },
	{ x: "Banana", y: [4] },
	{ x: "Berry", y: [1, 2] },
	{ x: "Orange", y: [3, 1] },
	{ x: "Beetroot", y: [2, 3] },
	{ x: "Pumpkin", y: [1, 1, 1, 1] },
	{ x: "Lettuce", y: [2, 1] },
];

class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				id="pagination"
				title="Pagination Scroll"
				description={`Click the pagination buttons to reveal "next" and "previous" panels`}
				isStacked
				hasPagination
				bars={data}
				maxVisibleItems={5}
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
	{ x: "Apple", y: [2] },
	{ x: "Potato", y: [2, 1] },
	{ x: "Carrot", y: [1, 3] },
	{ x: "Banana", y: [4] },
	{ x: "Berry", y: [1, 2] },
	{ x: "Orange", y: [3, 1] },
	{ x: "Beetroot", y: [2, 3] },
	{ x: "Pumpkin", y: [1, 1, 1, 1] },
	{ x: "Lettuce", y: [2, 1] },
];

class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				id="customPagination"
				title="Custom Pagination Message"
				description="Create a custom message based on the current and total page values"
				isStacked
				hasPagination
				createPaginationMessage={(current, total) => `Page ${current} of ${total}`}
				bars={data}
				maxVisibleItems={5}
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
	{ x: "Apple", y: [2] },
	{ x: "Potato", y: [2, 1] },
	{ x: "Carrot", y: [1, 3] },
];

class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				id="maxYValue"
				title="Maximum Y-Axis Value"
				description="Sets a maximum threshold that can be exceeded if a stack requires it"
				isStacked
				bars={data}
				maxYValue={6}
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
	{ x: "Apple", y: [2] },
	{ x: "Potato", y: [2, 1] },
	{ x: "Carrot", y: [1, 3] },
];

class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				id="customYAxis"
				title="Custom Y-Axis Labels"
				description="Format labels to enhance the graph axis information"
				isStacked
				bars={data}
				formatYAxisLabel={(value) => `${Math.round(value * 100)}k`}
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
	{ x: "Apple", y: [] },
	{ x: "Potato", y: [] },
	{ x: "Carrot", y: [] },
];

class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				id="emptyStackData"
				title="Empty Stack Data"
				description="Show chart even when no stack data is supplied"
				isStacked
				bars={data}
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
				id="emptyBarData"
				title="Empty Bar Data"
				description="Show empty state when no bar data is supplied"
				isStacked
				bars={data}
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
	{ x: "Apple", y: [] },
	{ x: "Potato", y: [] },
	{ x: "Carrot", y: [] },
];

class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				id="loadingState"
				title="Loading State"
				description="Show loading state via user stipulation"
				isLoading
				isStacked
				bars={data}
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
	{ x: "Apple", y: [2] },
	{ x: "Potato", y: [2, 1] },
	{ x: "Carrot", y: [1, 3] },
];
class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				id="chartKey"
				title="Chart Key"
				description="xxxxxxxxx"
				isStacked
				bars={data}
				keyLabel={['Xxxx', 'Yyyyy', 'Zzzzzzz']}
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
	{ x: "Apple", y: [2] },
	{ x: "Potato", y: [2, 1] },
	{ x: "Carrot", y: [1, 3] },
];
class Demo extends React.Component {

	render() {
		return (
			<div style={{ width: '200px' }}>
				<XUIBarChart
					id="chartSize"
					title="Chart Size"
					description="Customise the chart size"
					isStacked
					bars={data}
					height={200}
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
	{ x: "Apple", y: 2 },
	{ x: "Potato", y: 3 },
	{ x: "Carrot", y: 4 },
];
class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				id="barPlain"
				title="Plain Bars"
				description="Plain bar chart with no stacks"
				bars={data}
				barColor="#F6534E"
				keyLabel="Xxxxxx"
			/>
		);
	}
}

<Demo />
```

