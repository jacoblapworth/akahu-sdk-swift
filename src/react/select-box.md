<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="/section-forms.html#forms-9">Select Box in the XUI Documentation</a></span>
	</div>
</div>

Select Box is an opinionated component which wraps [DropDown](#dropdown) and [DropDownToggled](#dropdowntoggled). It's designed as a simple alternative to using an HTML `<select />`. If you need more fine grained control or other behaviour you should use the suite of [DropDown](#dropdown) components directly.

### Related Components

* [Dropdown](#dropdown)
* [Autocompleter](#autocompleter)

## Examples

### Single Select

In the following example, the `buttonContent` of the SelectBox is being set to value of the selected item in the example's state.

```
const { Component }= require('react');
const TextHelpers = require ('./components/select-box/TextHelpers').default;
const bank = require('@xero/xui-icon/icons/bank').default;

const banks = [
	'ANZ',
	'ASB',
	'Kiwi Bank',
	'Westpac',
];

class MiniApp extends Component {
	constructor (props, context) {
		super(props, context);

		this.state = {
			selectedBank: banks[2]
		};
		[
			this.onBankSelect,
		].forEach(fn => {
			this[fn.name] = fn.bind(this);
		});
	}

	onBankSelect(value) {
		this.setState({
			selectedBank: value
		});
	}



	render () {
		const MiniApp = this;

		return (
				<SelectBox
					ref={c => this.selectOne = c}
					name="selectOne"
					label="Select a Bank"
					buttonContent={
						<span>
							<XUIIcon inline path={bank} className="xui-margin-right-none"/>
							{TextHelpers.getText(MiniApp.state.selectedBank, 'Choose a Bank')}
						</span>
					}
					isTextTruncated={false}
				>
					{banks.map((opt, idx) => {
						return (
							<SelectBoxOption
								id={opt}
								key={idx + opt + 'userDefined Key'}
								isSelected={opt === MiniApp.state.selectedBank}
								value={opt}
								onSelect={MiniApp.onBankSelect}
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

### Multi Select

You can select multiple values by keeping track of an array, rather than a single value. Use the `showCheckboxes` prop to help indicate that multiple selections are supported.
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

### Button variants

The standard button variants available in the [Button](#button) component can be applied here through the `buttonVariant` prop.

```
const { Component }= require('react');
const TextHelpers = require ('./components/select-box/TextHelpers').default;
const bank = require('@xero/xui-icon/icons/bank').default;

const banks = [
	'ANZ',
	'ASB',
	'Kiwi Bank',
	'Westpac',
];

class MiniApp extends Component {
	constructor (props, context) {
		super(props, context);

		this.state = {
			selectedBank: banks[2]
		};
		[
			this.onBankSelect,
		].forEach(fn => {
			this[fn.name] = fn.bind(this);
		});
	}

	onBankSelect(value) {
		this.setState({
			selectedBank: value
		});
	}



	render () {
		const MiniApp = this;

		return (
				<SelectBox
					ref={c => this.selectOne = c}
					name="selectOne"
					label="Select a Bank"
					buttonContent={
						<span>
							<XUIIcon inline path={bank} className="xui-margin-right-none"/>
							{TextHelpers.getText(MiniApp.state.selectedBank, 'Choose a Bank')}
						</span>
					}
					isTextTruncated={false}
					buttonVariant="primary"
				>
					{banks.map((opt, idx) => {
						return (
							<SelectBoxOption
								id={opt}
								key={idx + opt + 'userDefined Key'}
								isSelected={opt === MiniApp.state.selectedBank}
								value={opt}
								onSelect={MiniApp.onBankSelect}
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
