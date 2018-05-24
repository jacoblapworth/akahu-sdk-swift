<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue">
		<use xlink:href="#xui-icon-bookmark" role="presentation"/>
	</svg>
	<a href="../section-building-blocks-controls-radio.html">Radio in the XUI Documentation</a>
</div>

Enhanced version of the native radio element. Use in place of `<input type="radio" />`.

The `XUIRadio` supports properties for use with forms like the HTML radio input, including `isRequired`, `name`, and `value`.

## Examples


### Uncontrolled

You can use as an uncontrolled component by not setting `isChecked` on any of the radio buttons, and optionally providing an `isDefaultChecked` property on one.

```
<div>
		<XUIRadio name="test" isDefaultChecked>Default option</XUIRadio>
		<XUIRadio name="test">Another option</XUIRadio>
		<XUIRadio name="test">And another</XUIRadio>
		<XUIRadio name="test" isDisabled>Disabled option</XUIRadio>
</div>
```

### Controlled

You can create controlled inputs by setting `isChecked` on radio items and using `onChange` to update the selected item.

```jsx
const { PureComponent } = require('react');
const options = ['Cat', 'Dog', 'Bird', 'Fish'];

class Example extends PureComponent {
	constructor() {
		this.state = {
			selectedItem: null,
		};

		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({
			selectedItem: e.target.value,
		});
	}

	render() {
		const { selectedItem } = this.state;
		return (
			<div>
				{selectedItem == null
					? 'What\'s your favourite pet?'
					: `Your favourite: ${selectedItem}`
				}
				<div>
					{options.map(option => (
						<XUIRadio key={option} value={option} isChecked={selectedItem === option} onChange={this.onChange}>
							{option}
						</XUIRadio>
					))}
				</div>
			</div>
		)
	}
}

<Example/>
```

### Reversed labels

Use the `isReversed` prop to have the label appear to the left of the checkbox element.

```
<div>
		<XUIRadio isReversed name="reversedRadios">An option</XUIRadio>
		<XUIRadio isReversed name="reversedRadios">Another option</XUIRadio>
		<XUIRadio isReversed name="reversedRadios" isDisabled>Disabled option</XUIRadio>
		<XUIRadio isReversed name="reversedRadios" isDisabled isDefaultChecked>Default and disabled</XUIRadio>
	</div>
```

It is also possible to use the `isLabelHidden` prop to visually hide the label, but we strongly recommend providing a label for accessibility purposes, even if it will be hidden.

### Custom Icons

`XUIRadio` supports the use of a custom [`XUIIcon`](#icon) to style the presentation of the element.

`iconMainPath` is the path for the Radio outline; `iconCheckPath` is the indicator that the radio is selected.

```
const customMainIcon = require ('@xero/xui-icon/icons/star').default;
const customCheckIcon = require ('@xero/xui-icon/icons/suggestion').default;
<div>
	<XUIRadio name="customRadio" iconMainPath={customMainIcon}>
		Favourite
	</XUIRadio>
</div>
```
