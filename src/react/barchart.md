## Bar Charts...

#### Example
```
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
const {XUIBarChart} = require('./barchart');
const XUIButton = require('./components/button/XUIButton').default;
const XUIButtonGroup = require('./components/button/XUIButtonGroup').default;
const XUIIcon = require('./components/icon/XUIIcon').default;
const addIcon = require('@xero/xui-icon/icons/addition').default;
const subtractionIcon = require('@xero/xui-icon/icons/subtraction').default;

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
				<XUIBarChart
					id="barAdd"
					title="Change Bar Quantity"
					description="Click the buttons above to add / subtract bars"
					isStacked
					bars={this.state.bars}
					onBarClick={this.handleBarClick}
					barColors={['lightblue', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightsalmon']}
					activeColor={"hotpink"}
				/>
			</div>
		);
	}
}

<Demo />
```
