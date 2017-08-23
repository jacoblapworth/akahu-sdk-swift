<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-forms.html#forms-4">Input in the XUI Documentation</a></span>
	</div>
</div>

Input is an enhanced HTML `<input />` field. It supports icons and validation styling.

## Examples

### Input Attributes

HTML input properties can be passed in via the `inputAttributes` prop.

```
<div>
	<XUIInput
		qaHook="test-ui"
		inputAttributes={{ defaultValue: 'This one has a default value' }}
		containerClassName="xui-margin-small"
	/>
	<XUIInput
		inputAttributes={{ placeholder: 'Number', type: 'number' }}
		containerClassName="xui-margin-small"
	/>
	<XUIInput
		inputAttributes={{
			placeholder: "Now it's empty",
			defaultValue: 'This one also has a default value and is readonly',
			readOnly: true
		}}
		containerClassName="xui-margin-small"
	/>
	<XUIInput
		inputAttributes={{ type: 'url', placeholder: 'http://www.xero.com', required: true }}
		containerClassName="xui-margin-small"
	/>
	<XUIInput
		qaHook="test-ui2"
		containerClassName="xui-margin-small"
	/>
</div>
```
### Change Events

Input change events can be subscribed to by passing a callback to `onChange`.

```
const  { PureComponent } = require ( 'react' );

class Example extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			text: ''
		};
		this.updateText = this.updateText.bind(this);
	}

	updateText(event) {
		this.setState({
			text: event.target.value
		});
	}

	render() {
		return (
			<div>
				<p className="xui-text-label">
					{`The input contains: ${this.state.text}`}
				</p>
				<XUIInput
					onChange={this.updateText}
					inputAttributes={{
						placeholder: 'Text typed here will go up there ☝️'
					}}
				/>
			</div>
		);
	}
}

<Example />
```
### Validation

Validation messages and styling should be added to inputs using the `validationMessage` and `isInvalid` props. Additionally, hint messages can be passed to inputs using the `hintMessage` prop.

```
<div>
	<XUIInput
		onChange={this.updateText}
		inputAttributes={{
			defaultValue: 'A very invalid message'
		}}
		validationMessage="Well it's not right"
		isInvalid={true}
	/>
	<XUIInput
		onChange={this.updateText}
		inputAttributes={{
			defaultValue: 'Not much here'
		}}
		hintMessage="Just a good old hint"
	/>
</div>
```
### Icons

Icons can be added to inputs using the `iconAttributes` prop. `iconAttributes` is an object, which can contain `path`, `position` ('left' or 'right'), and `wrapperColor` ('twitter', 'facebook', or 'linkedin').

```
const linkedin = require ('@xero/xui-icon/icons/social-linkedin').default;
const facebook = require ('@xero/xui-icon/icons/social-facebook').default;
const twitter = require ('@xero/xui-icon/icons/social-twitter').default;
const search = require ('@xero/xui-icon/icons/search').default;

<div>
	<XUIInput
		iconAttributes={{ path: search, position: 'left' }}
		inputAttributes={{ placeholder: 'This is a search box', type: 'search' }}
		containerClassName="xui-margin-small"
	/>
	<XUIInput
		iconAttributes={{ path: linkedin, position: 'right', color: 'white', wrapperColor: 'linkedin' }}
		inputAttributes={{ placeholder: 'LinkedIn' }}
		containerClassName="xui-margin-small"
	/>
	<XUIInput
		iconAttributes={{ path: facebook, position: 'right', color: 'white', wrapperColor: 'facebook' }}
		inputAttributes={{ placeholder: 'Facebook' }}
		containerClassName="xui-margin-small"
	/>
	<XUIInput
		iconAttributes={{ path: twitter, color: 'white', wrapperColor: 'twitter', position: 'left' }}
		inputAttributes={{ placeholder: 'Twitter' }}
		containerClassName="xui-margin-small"
	/>
</div>
```
### Clear button

For some inputs, such as search bars, you may want to add a clear button so users can easily remove the typed in text. Passing in the `hasClearButton` prop will add a clear button which appears when the input isn't empty, and will clear the field when clicked.

When using the `hasClearButton` functionality, the consuming application should not be managing the input value manually. When the clear button is clicked, it will trigger an `onChange` event with the property `target: statefulInput.inputNode`. 

```
const search = require ('@xero/xui-icon/icons/search').default;


<XUIInput
	inputAttributes={{defaultValue: "Clear me away"}}
	iconAttributes={{ path: search, position: 'left'}}
	hasClearButton
/>
```
