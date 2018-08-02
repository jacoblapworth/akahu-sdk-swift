<div class="xui-margin-vertical">
	<a href="../section-building-blocks-controls-textinput.html" isDocLink>Text Input in the XUI Documentation</a>
</div>

## Examples

### Text Input

Most input use cases can be solved using `XUITextInput`'s base props. Additional attributes that aren't available as base props can be passed down to the `input` via `inputProps`.

```js
const cn = require('classnames');

<div>
	<XUITextInput
		fieldClassName="xui-margin-bottom"
		placeholder="A standard text input"
		labelText='input'
		isLabelHidden
	/>
	<XUITextInput
		fieldClassName="xui-margin-bottom"
		qaHook="test-ui"
		defaultValue="This one has a default value"
		labelText='input'
		isLabelHidden
	/>
	<XUITextInput
		fieldClassName="xui-margin-bottom"
		qaHook="test-ui"
		type="number"
		placeholder="A number input"
		labelText='input'
		isLabelHidden
	/>
	<XUITextInput
		qaHook="test-ui"
		inputProps={{ readOnly: true }}
		defaultValue= "A read only value"
		labelText='input'
		isLabelHidden
	/>
</div>
```

### Labels

Labels can be set on `XUITextInput` by passing a value to the `labelText` prop.

```jsx
<XUITextInput
	labelText="Label"
/>
```


### Validation

Validation messages and styling should be added to inputs using the `validationMessage` and `isInvalid` props. Additionally, hint messages can be passed to inputs using the `hintMessage` prop. It's best to set `isFieldLayout=true` on all inputs to ensure consistent spacing between fields.

```jsx
const  { PureComponent } = require ( 'react' );

class Example extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			text: ''
		};
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	onFocus() {
		this.setState({
			hasFocus: true
		})
	}

	onBlur() {
		this.setState({
			hasFocus: false
		})
	}

	render() {
		return (
			<div>
				<XUITextInput
					labelText="An invalid input"
					validationMessage="Well it's not right"
					isInvalid={true}
					isFieldLayout
				/>
				<XUITextInput
					labelText="Input with a hint"
					placeholder="I always have a hint"
					hintMessage="Just a good old hint"
					isFieldLayout
				/>
				<XUITextInput
					labelText="Input that may have a hint"
					onFocus={this.onFocus}
					onBlur={this.onBlur}
					placeholder="I have a hint when I'm focused"
					hintMessage={this.state.hasFocus && 'Just a good old hint' || ''}
					isFieldLayout
				/>
			</div>
		);
	}
}

<Example />
```

#### Multiline Input

`XUITextInput` can be made into a multiline textarea by setting `isMultiline` to `true`. Additionally, `minRows`, `maxRows`, and `rows` may be set to set the vertical height of the input.

```jsx
<div>
	<XUITextInput
		isFieldLayout
		isMultiline
		placeholder="This input will automatically grow up to 5 rows high"
		minRows={2}
		maxRows={5}
		labelText='input'
		isLabelHidden
	/>
	<XUITextInput
		isFieldLayout
		isMultiline
		placeholder="This input will automatically grow without limit"
		minRows={3}
		labelText='input'
		isLabelHidden
	/>
	<XUITextInput
		isFieldLayout
		isMultiline
		placeholder="This input has a set number of rows"
		rows={3}
		labelText='input'
		isLabelHidden
	/>
</div>
```

#### Side Elements

Content can be added to the side of a `XUITextInput` using the `leftElement` and `rightElement` props. It's recommended that you use the `XUITextInputSideElement` component to ensure the correct styling is applied.

```jsx
const linkedinPath = require ('@xero/xui-icon/icons/social-linkedin').default;
const facebookPath = require ('@xero/xui-icon/icons/social-facebook').default;
const searchPath = require ('@xero/xui-icon/icons/search').default;
const attachPath = require ('@xero/xui-icon/icons/attach').default;
const XUIIcon = require ( './icon.js' ).default;
const XUIButton = require ( './button.js' ).default;
<div>
	<XUITextInput
		isFieldLayout
		placeholder="Search"
		leftElement={
			<XUITextInputSideElement type="icon">
				<XUIIcon isBoxed icon={searchPath} />
			</XUITextInputSideElement>
		}
		labelText='input'
		isLabelHidden
	/>
	<XUITextInput
		isFieldLayout
		placeholder="Linkedin"
		leftElement={
			<XUITextInputSideElement type="icon" backgroundColor="linkedin">
				<XUIIcon isBoxed icon={linkedinPath} />
			</XUITextInputSideElement>
		}
		labelText='input'
		isLabelHidden
	/>
	<XUITextInput
		isFieldLayout
		placeholder="Facebook"
		leftElement={
			<XUITextInputSideElement type="icon" backgroundColor="facebook">
				<XUIIcon isBoxed icon={facebookPath} />
			</XUITextInputSideElement>
		}
		labelText='input'
		isLabelHidden
	/>
	<XUITextInput
		isFieldLayout
		placeholder="Facebook Right"
		rightElement={
			<XUITextInputSideElement type="icon" backgroundColor="facebook">
				<XUIIcon isBoxed icon={facebookPath} />
			</XUITextInputSideElement>
		}
		labelText='input'
		isLabelHidden
	/>
	<XUITextInput
		isFieldLayout
		placeholder="Placeholder text"
		leftElement={
			<XUITextInputSideElement type="text">
				Text here:
			</XUITextInputSideElement>
		}
		labelText='input'
		isLabelHidden
	/>
	<XUITextInput
		isFieldLayout
		placeholder="Placeholder text"
		leftElement={
			<XUITextInputSideElement type="button">
				<XUIButton variant="primary" size="small">
					Left Button
				</XUIButton>
			</XUITextInputSideElement>
		}
		labelText='input'
		isLabelHidden
	/>
	<XUITextInput
		isFieldLayout
		placeholder="Placeholder text"
		rightElement={
			<XUITextInputSideElement type="button">
				<XUIButton variant="primary" size="small">
					Submit
				</XUIButton>
			</XUITextInputSideElement>
		}
		labelText='input'
		isLabelHidden
	/>
	<XUITextInput
		isFieldLayout
		isMultiline
		placeholder="Top aligned right content"
		rightElement={
			<XUITextInputSideElement type="button" alignment="top">
				<XUIButton variant="primary" size="small">
					Submit
				</XUIButton>
			</XUITextInputSideElement>
		}
		labelText='input'
		isLabelHidden
	/>
	<XUITextInput
		isFieldLayout
		isMultiline
		placeholder="Center aligned right content"
		rightElement={
			<XUITextInputSideElement type="button" alignment="center">
				<XUIButton variant="primary" size="small">
					Submit
				</XUIButton>
			</XUITextInputSideElement>
		}
		labelText='input'
		isLabelHidden
	/>
	<XUITextInput
		isFieldLayout
		isMultiline
		placeholder="Bottom aligned right content"
		rightElement={
			<XUITextInputSideElement type="button" alignment="bottom">
				<XUIButton variant="primary" size="small">
					Submit
				</XUIButton>
			</XUITextInputSideElement>
		}
		labelText='input'
		isLabelHidden
	/>
	<XUITextInput
		isFieldLayout
		isMultiline
		placeholder="Top aligned right content"
		rightElement={
			<XUITextInputSideElement type="icon" alignment="top">
				<XUIButton variant="icon" aria-label="attach">
					<XUIIcon isBoxed icon={attachPath} />
				</XUIButton>
			</XUITextInputSideElement>
		}
		labelText='input'
		isLabelHidden
	/>
	<XUITextInput
		isFieldLayout
		isMultiline
		placeholder="Center aligned right content"
		rightElement={
			<XUITextInputSideElement type="icon" alignment="center">
				<XUIButton variant="icon" aria-label="attach">
					<XUIIcon isBoxed icon={attachPath} />
				</XUIButton>
			</XUITextInputSideElement>
		}
		labelText='input'
		isLabelHidden
	/>
	<XUITextInput
		isFieldLayout
		isMultiline
		placeholder="Bottom aligned right content"
		rightElement={
			<XUITextInputSideElement type="icon" alignment="bottom">
				<XUIButton variant="icon" aria-label="attach">
					<XUIIcon isBoxed icon={attachPath} />
				</XUIButton>
			</XUITextInputSideElement>
		}
		labelText='input'
		isLabelHidden
	/>
	<XUITextInput
		isFieldLayout
		isMultiline
		placeholder="Bottom aligned top-aligned content with background"
		leftElement={
			<XUITextInputSideElement type="icon" alignment="top" backgroundColor="facebook">
				<XUIIcon isBoxed icon={facebookPath} />
			</XUITextInputSideElement>
		}
		labelText='input'
		isLabelHidden
	/>

</div>
```

#### Input Groups
```js
const XUIIcon = require('./icon.js').default;
const facebook = require ('@xero/xui-icon/icons/social-facebook').default;
const cn = require('classnames');
<div>
	<div className="xui-fieldlayout">
		<div className='xui-textinputgroup'>
			<XUITextInput
				fieldClassName="xui-column-4-of-12"
				leftElement={
					<XUITextInputSideElement type="text">
						To:
					</XUITextInputSideElement>
				}
				isFieldLayout={true}
				placeholder='placeholder'
				isInvalid
				validationMessage='invalid input'
				labelText='input'
				isLabelHidden
			/>
			<XUITextInput
				fieldClassName="xui-column-4-of-12"
				leftElement={
					<XUITextInputSideElement type="text">
						From:
					</XUITextInputSideElement>
				}
				placeholder='placeholder'
				hintMessage='hint hint hint'
				labelText='input'
				isLabelHidden
			/>
			<XUITextInput
				fieldClassName="xui-column-4-of-12"
				leftElement={
					<XUITextInputSideElement type="icon" backgroundColor="facebook">
						<XUIIcon isBoxed icon={facebook} />
					</XUITextInputSideElement>
				}
				placeholder='placeholder'
				labelText='input'
				isLabelHidden
			/>
		</div>
	</div>

	<div className="xui-verticaltextinputgroup">
		<XUITextInput
			leftElement={
				<XUITextInputSideElement type="text">
					To:
				</XUITextInputSideElement>
			}
			placeholder='placeholder'
			isInvalid
			labelText='input'
			isLabelHidden
		/>
		<XUITextInput
			leftElement={
				<XUITextInputSideElement type="text">
					From:
				</XUITextInputSideElement>
			}
			placeholder='placeholder'
			labelText='input'
			isLabelHidden
		/>
		<XUITextInput
			leftElement={
				<XUITextInputSideElement type="icon" backgroundColor="facebook">
					<XUIIcon isBoxed icon={facebook} />
				</XUITextInputSideElement>
			}
			placeholder='placeholder'
			labelText='input'
			isLabelHidden
		/>
	</div>
</div>
```

#### Borderless Variants
```js
const cn = require('classnames');

<div style={{
		padding: '10px',
		backgroundColor: '#f5f6f7'
	}}>
	<XUITextInput
		leftElement={
			<XUITextInputSideElement type="text">
				Transparent Borderless:
			</XUITextInputSideElement>
		}
		isFieldLayout={true}
		isBorderlessTransparent={true}
		placeholder='placeholder'
		labelText='input'
		isLabelHidden
	/>
	<XUITextInput
		leftElement={
			<XUITextInputSideElement type="text">
				Solid Borderless:
			</XUITextInputSideElement>
		}
		isBorderlessSolid={true}
		placeholder='placeholder'
		labelText='input'
		isLabelHidden
	/>
</div>
```
#### Inverted Borderless Variant
```js
const search = require ('@xero/xui-icon/icons/search').default;
const cn = require('classnames');
const XUIIcon = require('./icon.js').default;

	<div style={{
		backgroundColor: '#32465a',
		padding: '10px',
	}}>
		<XUITextInput
			leftElement={
				<XUITextInputSideElement type="text">
					Inverted Borderless Solid:
				</XUITextInputSideElement>
			}
			isFieldLayout={true}
			isBorderlessSolid={true}
			isInverted={true}
			placeholder='placeholder'
			labelText='input'
			isLabelHidden
		/>
		<XUITextInput
			leftElement={
				<XUITextInputSideElement type="icon">
					<XUIIcon isBoxed icon={search} />
				</XUITextInputSideElement>
			}
			isBorderlessTransparent={true}
			isInverted={true}
			placeholder='inverted borderless transparent'
			labelText='input'
			isLabelHidden
		/>
	</div>
```

#### Stateful Clear Button
```js
const { PureComponent } = require ( 'react' );
const clear = require ('@xero/xui-icon/icons/clear').default;
const search = require ('@xero/xui-icon/icons/search').default;
const XUIIcon = require('./icon.js').default;
const XUIButton = require ( './button.js' ).default;
const NOOP = () => {};

class Example extends PureComponent {
	constructor(){
		super();

		this.onChange = this.onChange.bind(this);
		this.onClearButtonClick = this.onClearButtonClick.bind(this);

		this.state = {
			value: 'Clear me away'
		}
	}

	onChange(e) {
		this.setState({
			value: e.target.value
		});
	}

	onClearButtonClick() {
		this.setState({
			value: ''
		})
	}

	render(){
		const { value } = this.state;

		const button = (
			<XUIButton
				onClick={this.onClearButtonClick}
				variant="icon"
				aria-label="clear"
			>
				<XUIIcon isBoxed icon={clear} />
			</XUIButton>
		);

		return(
			<XUITextInput
				leftElement={
					<XUITextInputSideElement type="icon">
						<XUIIcon isBoxed icon={search} />
					</XUITextInputSideElement>}
				rightElement={button}
				onChange={this.onChange}
				placeholder='This is a search box'
				value={value}
				labelText='input'
				isLabelHidden
			/>)
	}
}

<Example />

```
