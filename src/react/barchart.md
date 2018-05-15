## Bar Charts...

#### Example
```
const {XUIBarChart} = require('./barchart');
const XUITooltip = require('./tooltip').default;

 <XUIBarChart
	title="Fruits and Vegetables"
	description="A graph about Fruits and Vegetables"
	isStacked
	bars={[
		{
			x: "Apple",
			y: [1, 1, 2, 1],
			onBarClick: () => console.log('onBarClick'),
			// isBarActive: true
		},
		{
			x: "Potato",
			y: [1, 2],
			onStackClick: () => console.log('onStackClick'),
			// activeStacks: [1]
		},
	]}
	barColors={['lightblue', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightsalmon']}
	activeColor={"skyblue"}
	createToolTipContent={bar => (
		<div>
			<div><strong>{bar.x}</strong></div>
			<div>Super long text that is to test wrapping</div>
			<div style={{ whiteSpace: "nowrap" }}>
				<strong>{bar.stackIndex + 1 && `Stack #${bar.stackIndex + 1}`}</strong>
			</div>
		</div>
	)}
/>
```
