<div class="xui-margin-vertical">
	<a href="../section-building-blocks-controls-select.html" isDocLink>Select Box in the XUI Documentation</a>
</div>

`SelectBox` is an opinionated component which wraps [`DropDown`](#dropdown) and [`DropDownToggled`](#dropdowntoggled). It's designed as a simple alternative to using an HTML `<select />`. If you need more fine-grained control or other behaviour you should use the suite of [`DropDown`](#dropdown) components directly.

### Related Components

* [`Dropdown`](#dropdown)
* [`Autocompleter`](#autocompleter)

## Examples

### Single Select

In the following example, the `buttonContent` of `SelectBox` is being set to value of the selected item in the example's state.

```jsx
const { Component } = require('react');
const XUIIcon = require('./components/icon/XUIIcon').default;
const TextHelpers = require ('./components/select-box/TextHelpers').default;
const bank = require('@xero/xui-icon/icons/bank').default;

const banks = [
	'ANZ',
	'ASB',
	'Kiwi Bank',
	'Westpac',
];

class SelectBoxExample extends Component {
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
		this.selectOne = React.createRef();
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
					ref={this.selectOne}
					name="selectOne"
					label="Select a Bank"
					buttonContent={
						<span className="xui-u-flex">
							<XUIIcon icon={bank} className="xui-margin-right-xsmall"/>
							{TextHelpers.getText(MiniApp.state.selectedBank, 'Choose a Bank')}
						</span>
					}
					isTextTruncated={false}
				>
					{banks.map((opt, idx) => {
						return (
							<SelectBoxOption
								id={opt}
								isSelected={opt === MiniApp.state.selectedBank}
								key={idx + opt + 'userDefined Key'}
								onSelect={MiniApp.onBankSelect}
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

<SelectBoxExample />
```

### Multi Select

You can select multiple values by keeping track of an array, rather than a single value. Use the `showCheckboxes` prop to help indicate that multiple selections are supported.

```jsx
const { Component } = require('react');
const TextHelpers = require ('./components/select-box/TextHelpers').default;

const boats = ['Waka', 'Pontoon', 'Sailboat', 'Schooner', 'Dingy'];

class MiniApp extends Component {
	constructor() {
		this.state = {
			selectedBoats: []
		};
		this.onBoatSelect = this.onBoatSelect.bind(this);
		this.isMultiSelect = React.createRef();
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
				buttonContent={TextHelpers.getText(MiniApp.state.selectedBoats, 'Choose a few boats')}
				closeAfterSelection={false}
				label="Select Several Boats"
				name="isMultiselect"
				onSelect={MiniApp.onBoatSelect}
				ref={this.isMultiselect}
				isInvalid={!MiniApp.state.selectedBoats.length}
				validationMessage="Please select at least one boat"
			>
				{boats.map((opt, idx) => {
					return (
						<SelectBoxOption
							id={opt}
							isSelected={MiniApp.state.selectedBoats.indexOf(opt) >= 0}
							key={idx + opt + 'userDefined Key'}
							showCheckboxes={true}
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

### Sizes

The `size` prop allows you to change the default `SelectBox` size.

If `SelectBoxOption` is not given a `size` property, it will inherit the `size` of the `SelectBox`.

```jsx
const { Component } = require('react');
const XUIIcon = require('./components/icon/XUIIcon').default;
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

		this.selectOne = React.createRef();
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
					buttonContent={
						<span className="xui-u-flex">
							<XUIIcon icon={bank} className="xui-margin-right-xsmall"/>
							{TextHelpers.getText(MiniApp.state.selectedBank, 'Choose a Bank')}
						</span>
					}
					isTextTruncated={false}
					label="Select a Bank"
					name="selectOne"
					ref={this.selectOne}
					size="small"
				>
					{banks.map((opt, idx) => {
						return (
							<SelectBoxOption
								id={opt}
								isSelected={opt === MiniApp.state.selectedBank}
								key={idx + opt + 'userDefined Key'}
								onSelect={MiniApp.onBankSelect}
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

<MiniApp />
```

### Button variants

The standard button variants available in [`XUIButton`](#button) can be applied here through the `buttonVariant` prop. We recommend setting the `fullWidth` prop to `never` to prevent the SelectBox being full width with button variants.

```jsx
const { Component } = require('react');
const XUIIcon = require('./components/icon/XUIIcon').default;
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

		this.selectOne = React.createRef();
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
					buttonContent={
						<span className="xui-u-flex">
							<XUIIcon icon={bank} className="xui-margin-right-xsmall"/>
							{TextHelpers.getText(MiniApp.state.selectedBank, 'Choose a Bank')}
						</span>
					}
					buttonVariant="primary"
					isTextTruncated={false}
					label="Select a Bank"
					name="selectOne"
					ref={this.selectOne}
					fullWidth="never"
					hintMessage="Selecting your bank helps us set up your bank feed"
				>
					{banks.map((opt, idx) => {
						return (
							<SelectBoxOption
								id={opt}
								isSelected={opt === MiniApp.state.selectedBank}
								key={idx + opt + 'userDefined Key'}
								onSelect={MiniApp.onBankSelect}
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

<MiniApp />
```
