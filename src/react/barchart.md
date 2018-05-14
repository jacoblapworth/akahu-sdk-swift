## Bar Charts...

#### Example
```
const {XUIBarChart} = require('./barchart');

 <XUIBarChart
	title="Fruits and Vegetables"
	description="A graph about Fruits and Vegetables"
	isStacked
	bars={[
		{
			x: "Apple",
			y: [1, 1, 2, 1],
			onBarClick: () => console.log('onBarClick'),
			isBarActive: true
		},
		{
			x: "Potato",
			y: [1, 2],
			onStackClick: () => console.log('onStackClick'),
			activeStacks: [1]
		},
	]}
	barColors={['lightblue', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightsalmon']}
	activeColor={"skyblue"}
	toolTipComponent={bar =>
		console.log(bar) || (
			<div
				style={{
					padding: "5px 10px",
					background: "darkgray",
					// position: "absolute"
					width: "100px"
				}}
			>
				<div>{bar.x}</div>
				<div style={{ whiteSpace: "nowrap" }}>
					{bar.stackIndex + 1 && `Stack ${bar.stackIndex + 1}`}
				</div>
			</div>
		)
	}
/>
```
