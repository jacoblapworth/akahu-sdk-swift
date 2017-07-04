Select Box is an opinionated component which wraps [DropDown](#dropdown) and [DropDownToggled](#dropdowntoggled). It's designed as a simple alternative to using an HTML `<select />`. If you need more fine grained control or other behaviour you should use the suite of [DropDown](#dropdown) components directly.

### XUI Docs

<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="/section-forms.html#forms-9">Select Box</a></span>
	</div>
</div>

### Related Components

* [Dropdown](#dropdown)
* [Autocompleter](#autocompleter)

```
const { Component }= require('react');
const TextHelpers = require ('./components/select-box/TextHelpers').default;

const bikes = ['Santa Cruz', 'Transition', 'Lapierre', 'Surly', 'Kona', ];

class MiniApp extends Component {
	constructor (props, context) {
		super(props, context);

		this.state = {
			selectedBike: bikes[2]
		};
		[
			this.onBikeSelect,
		].forEach(fn => {
			this[fn.name] = fn.bind(this);
		});
	}

	onBikeSelect(value) {
		this.setState({
			selectedBike: value
		});
	}



	render () {
		const MiniApp = this;

		return (
				<SelectBox
					containerClasses="xui-fieldlabel-layout"
					ref={c => this.selectOne = c}
					name="selectOne"
					label="Select a Bike"
					buttonContent={TextHelpers.getText(MiniApp.state.selectedBike, 'Choose a Bike')}
					isTextTruncated={false}
				>
					{bikes.map((opt, idx) => {
						return (
							<SelectBoxOption
								id={opt}
								key={idx + opt + 'userDefined Key'}
								isSelected={opt === MiniApp.state.selectedBike}
								value={opt}
								onSelect={MiniApp.onBikeSelect}
							>
								{opt}
							</SelectBoxOption>
						);
					})}
				</SelectBox>


		);
	}
}

	<MiniApp />
```



```
const { Component }= require('react');
const TextHelpers = require ('./components/select-box/TextHelpers').default;

const boats = ['Waka', 'Pontoon', 'Sailboat', 'Schooner', 'Dingy'];

class MiniApp extends Component {
	constructor() {
		this.state = {
			selectedBoats: []
		};
		this.onBoatSelect = this.onBoatSelect.bind(this);
	}
	onBoatSelect(value) {
		if (this.state.selectedBoats.indexOf(value) > -1) {
			this.setState({
				selectedBoats: this.state.selectedBoats.filter(boat => boat !== value)
			});
		} else {
			this.setState({
				selectedBoats: [...this.state.selectedBoats, value]
			});
		}
	}

	render() {
		const MiniApp = this;
		return (
			<SelectBox
				containerClasses="xui-fieldlabel-layout"
				ref={c => this.multiSelect = c}
				name="multiSelect"
				buttonContent={TextHelpers.getText(MiniApp.state.selectedBoats, 'Choose a few boats')}
				label="Select Several Boats"
				closeAfterSelection={false}
				onSelect={MiniApp.onBoatSelect}
			>
				{boats.map((opt, idx) => {
					return (
						<SelectBoxOption
							id={opt}
							key={idx + opt + 'userDefined Key'}
							showCheckboxes={true}
							isSelected={MiniApp.state.selectedBoats.indexOf(opt) >= 0}
							value={opt}
						>
							{opt}
						</SelectBoxOption>
					);
				})}
			</SelectBox>
		);
	}
}

<MiniApp/>
```
