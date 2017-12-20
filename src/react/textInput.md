<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue">
		<use xlink:href="#xui-icon-bookmark" role="presentation"/>
	</svg>
	<a href="../section-building-blocks-forms-inputs.html">Text Input in the XUI Documentation</a>
</div>

## Examples

### Text Input

```js
const linkedin = require ('@xero/xui-icon/icons/social-linkedin').default;
const facebook = require ('@xero/xui-icon/icons/social-facebook').default;
const search = require ('@xero/xui-icon/icons/search').default;
const XUIIcon = require ( './icon.js' ).default;
const XUIButton = require ( './button.js' ).default;
const XUITextInputIcon = require('./components/textInput/XUITextInputIcon.js').default;
const cn = require('classnames');

<div>
	<XUITextInput
		qaHook="test-ui"
		defaultValue= 'This one has a default value'
		isFieldLayout={true}
	/>
	<XUITextInput
		qaHook="test-ui"
		type='number'
		placeholder='Number'
		isFieldLayout={true}
	/>
	<XUITextInput
		qaHook="test-ui"
		inputProps={{ readOnly: true }}
		defaultValue= 'A read only value'
		isFieldLayout={true}
	/>
	<XUITextInput
		leftElement={props => <XUITextInputIcon {...props} path={facebook} color='white' wrapperColor='facebook' />}
		isFieldLayout={true}
		placeholder='Facebook'
	/>
	<XUITextInput
		leftElement={props => <XUITextInputIcon {...props} path={linkedin} color='white' wrapperColor='linkedin' />}
		isFieldLayout={true}
		placeholder='Linkedin left'
	/>
	<XUITextInput
		rightElement={props => <XUITextInputIcon {...props} path={linkedin} color='white' wrapperColor='linkedin' />}
		isFieldLayout={true}
		placeholder='Linkedin right'
	/>
	<XUITextInput
		hintMessage='heres a hint'
		leftElement={props => <XUITextInputIcon {...props} path={search} />}
		isFieldLayout={true}
		placeholder='This is a search box'
	/>
	<XUITextInput
		isInvalid={true}
		validationMessage='not valid'
		isFieldLayout={true}
		placeholder='This is an invalid search box'
	/>
	<XUITextInput
		leftElement={props => <span {...props} className={cn("xui-textcolor-muted xui-padding-horizontal", props.className)}>To:</span>}
		isFieldLayout={true}
	/>
	<XUITextInput
		rightElement={props => <span {...props} className={cn("xui-textcolor-muted xui-padding-horizontal", props.className)}>: A less practicle label but demonstrates length, on the right</span>}
		isFieldLayout={true}
		placeholder='placeholder'
	/>
	<XUITextInput
		isFieldLayout={true}
		placeholder='placeholder'
		type="image"
	/>
	<XUITextInput
		rightElement={props => <span>
			<XUIButton {...props} size='small' variant='primary' className='xui-margin-left xui-margin-right-xsmall' >I just look 👍 </XUIButton>
			</span>}
		placeholder='placeholder'
	/>
</div>
```

Borderless Variants
```js
const cn = require('classnames');

<div style={{
		padding: '10px',
		backgroundColor: '#f5f6f7'
	}}>
	<XUITextInput
		leftElement={props => <span {...props} className={cn("xui-textcolor-muted xui-padding-horizontal", props.className)}>Transparent Borderless:</span>}
		isFieldLayout={true}
		isBorderlessTransparent={true}
		placeholder='placeholder'
	/>
	<XUITextInput
		leftElement={props => <span {...props} className={cn("xui-textcolor-muted xui-padding-horizontal", props.className)}>Solid Borderless:</span>}
		isBorderlessSolid={true}
		placeholder='placeholder'
	/>
</div>
```
Inverted Borderless Variant
```js
const search = require ('@xero/xui-icon/icons/search').default;
const XUITextInputIcon = require('./components/textInput/XUITextInputIcon.js').default;
const cn = require('classnames');

	<div style={{
		backgroundColor: '#32465a',
		padding: '10px',
	}}>
		<XUITextInput
			leftElement={props => <span {...props} className={cn("xui-padding-horizontal", props.className)}>Inverted Borderless Solid:</span>}
			isFieldLayout={true}
			isBorderlessSolid={true}
			isInverted={true}
			placeholder='placeholder'
		/>
		<XUITextInput
			leftElement={props => <XUITextInputIcon {...props} path={search} />}
			isBorderlessTransparent={true}
			isInverted={true}
			placeholder='inverted borderless transparent'
		/>
	</div>
```

Stateful Clear Button Example
```js
const { PureComponent } = require ( 'react' );
const clear = require ('@xero/xui-icon/icons/clear').default;
const search = require ('@xero/xui-icon/icons/search').default;
const XUIButton = require ( './button.js' ).default;
const XUITextInputIcon = require('./components/textInput/XUITextInputIcon.js').default;
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

		const button = props => value ? <XUIButton
						onClick={this.onClearButtonClick}
						variant="icon"
						{...props}
					>
					<XUIIcon path={clear} />
				</XUIButton> : null

		return(
			<XUITextInput
				leftElement={props => <XUITextInputIcon {...props} path={search} />}
				rightElement={button}
				onChange={this.onChange}
				placeholder='This is a search box'
				value={value}
			/>)
	}
}

<Example />

```
