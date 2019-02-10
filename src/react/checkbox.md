<div class="xui-margin-vertical">
	<a href="../section-building-blocks-controls-checkbox.html" isDocLink>Checkbox in the XUI Documentation</a>
</div>

Enhanced version of HTML checkbox. Use in place of `<input type="checkbox" />`.

`XUICheckbox` supports properties for use with forms like the HTML checkbox input, including `isRequired`, `name`, and `value`.

## Examples

### Uncontrolled

`XUICheckbox` can be used as an uncontrolled component by omitting `isChecked` and (optionally) providing a `isDefaultChecked` property.

``` jsx
<div>
	<XUICheckbox
		isDefaultChecked
		hintMessage="Hint text"
	>
		Default checked
	</XUICheckbox>
	<XUICheckbox>Unchecked by default</XUICheckbox>
	<XUICheckbox>Also unchecked</XUICheckbox>
</div>
```

### Controlled

Controlled `XUICheckbox`s' presentation are driven by the two props, `isChecked` and `isIndeterminate`. You can hook into the `onChange` event to update them when the user interacts with the checkbox.

```jsx
const { PureComponent } = require('react');
const options = ['Cat', 'Dog', 'Bird', 'Fish'];
const selectedStates = {
	ALL: 'ALL',
	INDETERMINATE: 'INDETERMINATE',
	NONE: 'NONE',
};

const values = object =>
	Object.keys(object).reduce((values, key) =>
		[
			...values,
			object[key],
		], []);

const getSelectedState = (selectedItems) => {
	const numberOfSelectedValues = values(selectedItems).filter(value => value).length;
	if (numberOfSelectedValues === 0) {
		return selectedStates.NONE;
	} else if (numberOfSelectedValues === options.length) {
		return selectedStates.ALL;
	}
	return selectedStates.INDETERMINATE;
}

class Example extends PureComponent {
	constructor() {
		this.state = {
			selectedItems: {},
			selectedState: selectedStates.NONE,
		};

		this.onChange = this.onChange.bind(this);
		this.toggleAll = this.toggleAll.bind(this);
	}

	onChange(e) {
		const value = e.target.value;
		this.setState(prevState => {
			const selectedItems = {
				...prevState.selectedItems,
				[value]: !prevState.selectedItems[value],
			};
			return {
				selectedItems,
				selectedState: getSelectedState(selectedItems),
			};
		});
	}

	toggleAll() {
		this.setState(prevState => {
			const newSelectedState = prevState.selectedState === selectedStates.ALL ? false : true;
			return {
				selectedItems: options.reduce((selectedItems, option) => ({
					...selectedItems,
					[option]: newSelectedState
				}), {}),
				selectedState: newSelectedState ? selectedStates.ALL : selectedStates.NONE,
			};
		});
	}

	render() {
		const { selectedItems, selectedState } = this.state;
		return (
			<div>
				Which animals do you like?
				<div>
					<XUICheckbox
						isIndeterminate={selectedState === selectedStates.INDETERMINATE}
						isChecked={selectedState === selectedStates.ALL}
						onChange={this.toggleAll}
					>
						All
					</XUICheckbox>
					{options.map(option => (
						<XUICheckbox
							key={option}
							value={option}
							isChecked={selectedItems[option]}
							onChange={this.onChange}
						>
							{option}
						</XUICheckbox>
					))}
				</div>
			</div>
		)
	}
}

<Example/>
```

### Disabled

```jsx
<div>
	<XUICheckbox isDisabled>Unchecked</XUICheckbox>
	<XUICheckbox isDisabled isDefaultChecked>Checked</XUICheckbox>
	<XUICheckbox isDisabled isChecked={false} isIndeterminate>Indeterminate</XUICheckbox>
</div>
```

### Reversed labels

Use the `isReversed` prop to have the label appear to the left of the checkbox element.

```jsx
<div>
	<XUICheckbox isReversed isChecked={false}>Unchecked</XUICheckbox>
	<XUICheckbox isReversed isChecked>Checked</XUICheckbox>
	<XUICheckbox isReversed isIndeterminate>Indeterminate</XUICheckbox>
</div>
```

It is also possible to use the `isLabelHidden` prop to visually hide the label, but we strongly recommend providing a label for accessibility purposes, even if it will be hidden.

### Custom Icons

`XUICheckbox` supports the use of a custom [`XUIIcon`](#icon) to style the presentation of the element.

`iconMain` is the icon object from `@xero/xui-icon` to render in place of a checkbox.

```jsx
const customIcon = require ('@xero/xui-icon/icons/star').default;
<div>
	<XUICheckbox isChecked iconMain={customIcon}>
		Favourite
	</XUICheckbox>
</div>
```
