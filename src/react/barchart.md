## Bar Charts...

#### Example
```
require('array.prototype.find').shim();
const {XUIBarChart} = require('./barchart');

class Demo extends React.Component {

	constructor() {
		super();
		this.handleBarClick = this.handleBarClick.bind(this);
		this.state = { bars: [
			{ x: "Apple", y: [1, 1, 2, 1] },
			{ x: "Potato", y: [2, 1] },
			{ x: "Carrot Soup", y: [1, 3] },
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
				title="Clickable Bars"
				description="Click a bar to toggle the active state"
				isStacked
				bars={this.state.bars}
				onBarClick={this.handleBarClick}
				barColors={['lightblue', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightsalmon']}
				activeColor={"hotpink"}
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

class Demo extends React.Component {

	constructor() {
		super();
		this.handleBarClick = this.handleBarClick.bind(this);
		this.state = { bars: [
			{ x: "Apple", y: [1, 1, 2, 1] },
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
				title="Clickable Stacks"
				description="Click a stack to toggle the active state"
				isStacked
				bars={this.state.bars}
				onBarClick={this.handleBarClick}
				barColors={['lightblue', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightsalmon']}
				activeColor={"hotpink"}
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
					barColors={['lightblue', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightsalmon']}
					activeColor={"hotpink"}
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
		{ x: "Apple", y: [1, 1, 2, 1] },
		{ x: "Potato", y: [2, 1] },
		{ x: "Carrot", y: [1, 3] },
		{ x: "Banana", y: [4] },
		{ x: "Berry", y: [2, 2] },
		{ x: "Orange", y: [3, 1] },
		{ x: "Beetroot", y: [2, 3] },
		{ x: "Pumpkin", y: [2, 1, 1, 1] },
		{ x: "Lettuce", y: [1, 4] },
		{ x: "Apple (1)", y: [1, 1, 2, 1] },
		{ x: "Potato (1)", y: [2, 1] },
		{ x: "Carrot (1)", y: [1, 3] },
		{ x: "Banana (1)", y: [4] },
		{ x: "Berry (1)", y: [2, 2] },
		{ x: "Orange (1)", y: [3, 1] },
		{ x: "Beetroot (1)", y: [2, 3] },
		{ x: "Pumpkin (1)", y: [2, 1, 1, 1] },
		{ x: "Lettuce (1)", y: [1, 4] },
		{ x: "Apple (2)", y: [1, 1, 2, 1] },
		{ x: "Potato (2)", y: [2, 1] },
		{ x: "Carrot (2)", y: [1, 3] },
		{ x: "Banana (2)", y: [4] },
		{ x: "Berry (2)", y: [2, 2] },
		{ x: "Orange (2)", y: [3, 1] },
		{ x: "Beetroot (2)", y: [2, 3] },
		{ x: "Pumpkin (2)", y: [2, 1, 1, 1] },
		{ x: "Lettuce (2)", y: [1, 4] },
		{ x: "Apple (3)", y: [1, 1, 2, 1] },
		{ x: "Potato (3)", y: [2, 1] },
		{ x: "Carrot (3)", y: [1, 3] },
		{ x: "Banana (3)", y: [4] },
		{ x: "Berry (3)", y: [2, 2] },
		{ x: "Orange (3)", y: [3, 1] },
		{ x: "Beetroot (3)", y: [2, 3] },
		{ x: "Pumpkin (3)", y: [2, 1, 1, 1] },
		{ x: "Lettuce (3)", y: [1, 4] },
	];

class Demo extends React.Component {

	render() {
		return (
			<XUIBarChart
				id="barPagination"
				title="Pagination scroll"
				description={`Click the pagination buttons to reveal "next" and "previous" panels`}
				isStacked
				hasPagination
				bars={data}
				barColors={['lightblue', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightsalmon']}
				activeColor={"hotpink"}
			/>
		);
	}
}

<Demo />
```
