<div class="xui-margin-vertical">
	<a href="../section-building-blocks-controls-textinput.html" isDocLink>Text Input in the XUI Documentation</a>
</div>

## Examples

### Text Input

Most input use cases can be solved using `XUITextInput`'s base props. Additional attributes that aren't available as base props can be passed down to the `input` via `inputProps`.

We recommend being cautious when passing down a `type` to your input using `inputProps`. Currently some types don't work well for accessibility or internationalisation. For example, setting `type="number"` will not allow users to use `,` as a decimal separator, which is the correct decimal seporator in many regions.

```js
const cn = require('classnames');

<div>
	<XUITextInput
		fieldClassName="xui-margin-bottom"
		placeholder="A standard text input"
		label='input'
		isLabelHidden
	/>
	<XUITextInput
		fieldClassName="xui-margin-bottom"
		qaHook="test-ui"
		defaultValue="This one has a default value"
		label='input'
		isLabelHidden
	/>
	<XUITextInput
		fieldClassName="xui-margin-bottom"
		qaHook="test-ui"
		type="number"
		placeholder="A number input"
		label='input'
		isLabelHidden
	/>
	<XUITextInput
		qaHook="test-ui"
		inputProps={{ readOnly: true }}
		defaultValue="A read-only value"
		label='input'
		isLabelHidden
	/>
</div>
```

### Labels

Labels can be set on `XUITextInput` by passing a value to the `label` prop.

```jsx
<XUITextInput
	label="Label"
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
					label="An invalid input"
					validationMessage="Well it's not right"
					isInvalid={true}
					isFieldLayout
				/>
				<XUITextInput
					label="Input with a hint"
					placeholder="I always have a hint"
					hintMessage="Just a good old hint"
					isFieldLayout
				/>
				<XUITextInput
					label="Input that may have a hint"
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
		label='input'
		isLabelHidden
	/>
	<XUITextInput
		isFieldLayout
		isMultiline
		placeholder="This input will automatically grow without limit"
		minRows={3}
		label='input'
		isLabelHidden
	/>
	<XUITextInput
		isFieldLayout
		isMultiline
		placeholder="This input has a set number of rows"
		rows={3}
		label='input'
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
		label='input'
		isLabelHidden
	/>
	<XUITextInput
		isFieldLayout
		placeholder="Avatar"
		leftElement={
			<XUITextInputSideElement type="avatar">
				<XUIAvatar value="Avatar" size="small" />
			</XUITextInputSideElement>
		}
	/>
	<XUITextInput
		isFieldLayout
		placeholder="Pill"
		leftElement={
			<XUITextInputSideElement type="pill">
				<XUIPill
					value="Pill"
					avatarProps={{value: 'Pill'}}
					onDeleteClick={()=>{}}
				/>
			</XUITextInputSideElement>
		}
	/>
	<XUITextInput
		isFieldLayout
		placeholder="Linkedin"
		leftElement={
			<XUITextInputSideElement type="icon" backgroundColor="linkedin">
				<XUIIcon isBoxed icon={linkedinPath} />
			</XUITextInputSideElement>
		}
		label='input'
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
		label='input'
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
		label='input'
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
		label='input'
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
		label='input'
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
		label='input'
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
		label='input'
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
		label='input'
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
		label='input'
		isLabelHidden
	/>
	<XUITextInput
		isFieldLayout
		isMultiline
		placeholder="Top aligned right content"
		rightElement={
			<XUITextInputSideElement type="icon" alignment="top">
				<XUIButton variant="icon" size="small" aria-label="attach">
					<XUIIcon icon={attachPath} />
				</XUIButton>
			</XUITextInputSideElement>
		}
		label='input'
		isLabelHidden
	/>
	<XUITextInput
		isFieldLayout
		isMultiline
		placeholder="Center aligned right content"
		rightElement={
			<XUITextInputSideElement type="icon" alignment="center">
				<XUIButton variant="icon" size="small" aria-label="attach">
					<XUIIcon icon={attachPath} />
				</XUIButton>
			</XUITextInputSideElement>
		}
		label='input'
		isLabelHidden
	/>
	<XUITextInput
		isFieldLayout
		isMultiline
		placeholder="Bottom aligned right content"
		rightElement={
			<XUITextInputSideElement type="icon" alignment="bottom">
				<XUIButton variant="icon" size="small" aria-label="attach">
					<XUIIcon icon={attachPath} />
				</XUIButton>
			</XUITextInputSideElement>
		}
		label='input'
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
		label='input'
		isLabelHidden
	/>

</div>
```


### Sizes

Inputs also have `small` and `xsmall` variants. To use these size variants with side elements, you just need to make sure the input contents have a smaller size variant added.

Note that only avatars and text side elements have `2xsmall` size variants, so are the only side element options available for the `xsmall` text inputs.

```jsx
const XUIIcon = require ( './icon.js' ).default;
const closePath = require ('@xero/xui-icon/icons/cross').default;

<div>
	<XUITextInput
		fieldClassName="xui-margin-bottom"
		placeholder="Medium size"
		leftElement={
			<XUITextInputSideElement type="avatar">
					<XUIAvatar value="bob" size="small" />
				</XUITextInputSideElement>
		}
		rightElement={
			<XUITextInputSideElement type="icon">
					<XUIButton size="small" variant="icon">
						<XUIIcon icon={closePath}/>
					</XUIButton>
				</XUITextInputSideElement>
		}
	/>
	<XUITextInput
		fieldClassName="xui-margin-bottom"
		placeholder="Small size"
		size="small"
		leftElement={
			<XUITextInputSideElement type="avatar">
					<XUIAvatar value="bob" size="xsmall" />
				</XUITextInputSideElement>
		}
		rightElement={
			<XUITextInputSideElement type="icon">
					<XUIButton size="xsmall" variant="icon">
						<XUIIcon icon={closePath}/>
					</XUIButton>
				</XUITextInputSideElement>
		}
	/>
	<XUITextInput
		fieldClassName="xui-margin-bottom"
		placeholder="Extra small size"
		size="xsmall"
		leftElement={
			<XUITextInputSideElement type="avatar">
					<XUIAvatar value="bob" size="2xsmall" />
				</XUITextInputSideElement>
		}
	/>
	<XUITextInput
		fieldClassName="xui-margin-bottom"
		placeholder="Medium size"
		leftElement={
			<XUITextInputSideElement type="pill">
				<XUIPill avatarProps={{value:'Pill'}} value="Pill" onDeleteClick={()=>{}} />
			</XUITextInputSideElement>
		}
		rightElement={
			<XUITextInputSideElement type="button">
				<XUIButton size="small" variant="standard">Label</XUIButton>
			</XUITextInputSideElement>
		}
	/>
	<XUITextInput
		fieldClassName="xui-margin-bottom"
		placeholder="Small size"
		size="small"
		leftElement={
			<XUITextInputSideElement type="pill">
				<XUIPill avatarProps={{value:'Pill'}} value="Pill" onDeleteClick={()=>{}} />
			</XUITextInputSideElement>
		}
	/>
</div>
```

#### Input Groups
```js
const XUIIcon = require('./icon.js').default;
const facebook = require ('@xero/xui-icon/icons/social-facebook').default;
const cn = require('classnames');
<div>
	<div className="xui-field-layout">
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
				label='input'
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
				label='input'
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
				label='input'
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
			label='input'
			isLabelHidden
		/>
		<XUITextInput
			leftElement={
				<XUITextInputSideElement type="text">
					From:
				</XUITextInputSideElement>
			}
			placeholder='placeholder'
			label='input'
			isLabelHidden
		/>
		<XUITextInput
			leftElement={
				<XUITextInputSideElement type="icon" backgroundColor="facebook">
					<XUIIcon isBoxed icon={facebook} />
				</XUITextInputSideElement>
			}
			placeholder='placeholder'
			label='input'
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
		label='input'
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
		label='input'
		isLabelHidden
	/>
</div>
```
#### Inverted Borderless Variant
```js
const search = require ('@xero/xui-icon/icons/search').default;
const cn = require('classnames');
const XUIIcon = require('./icon.js').default;
const ExampleContainer = require('./docs/ExampleContainer').default;

	<ExampleContainer className="xui-padding-xsmall" isInverted>
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
			label='input'
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
			label='input'
			isLabelHidden
		/>
	</ExampleContainer>
```

#### Stateful Clear Button
```js
const { PureComponent } = require ( 'react' );
const clear = require ('@xero/xui-icon/icons/clear').default;
const search = require ('@xero/xui-icon/icons/search').default;
const XUIIcon = require('./icon.js').default;
const XUIButton = require ( './button.js' ).default;

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
				<XUIIcon icon={clear} />
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
				label='input'
				isLabelHidden
			/>)
	}
}

<Example />

```
