<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-buttons.html#buttons">Button in the XUI Documentation</a></span>
	</div>
</div>

## Examples

Whatever you put between the start and end tags of the button will appear as the content of the button.
You can give it a click handler to perform actions when the button is triggered, either by clicking on it, or by pressing `space` or `enter` when it has focus.

```
	function handleClick() { alert('You clicked the button!'); }
	<XUIButton onClick={handleClick}>Click this button</XUIButton>
```

### Variants

Different styles of button are provided for by passing different `variants`.

```
	<div>
		<div>
			<XUIButton className="xui-margin-right" variant="standard">Standard</XUIButton>
			<XUIButton className="xui-margin-right" variant="primary">Primary</XUIButton>
			<XUIButton className="xui-margin-right" variant="create">Create</XUIButton>
			<XUIButton className="xui-margin-right" variant="negative">Negative</XUIButton>
		</div>
		<div className="xui-padding-xsmall">
			<XUIButton className="xui-margin-right" variant="borderless-standard">Borderless Standard</XUIButton>
			<XUIButton className="xui-margin-right" variant="borderless-primary">Borderless Primary</XUIButton>
			<XUIButton className="xui-margin-right" variant="borderless-create">Borderless Create</XUIButton>
			<XUIButton className="xui-margin-right" variant="borderless-negative">Borderless Negative</XUIButton>
			<XUIButton className="xui-margin-right" variant="borderless-muted">Borderless Muted</XUIButton>
		</div>
		<div className="xui-padding-xsmall xui-background-grey-1">
			<XUIButton className="xui-margin-right" variant="borderless-inverted">Borderless Inverted</XUIButton>
		</div>
	</div>
```

Icon buttons (for things like overflow dropdown menus, close buttons, etc.) are supported by the `icon`, `icon-inverted`, `icon-large` and `icon-inverted-large` variants.

If you add the `xui-button-icon-large` class to the button, it will be given a larger touch target.
As this uses flexbox, ensure you add `xui-u-flex-inherit` to the Icon for Firefox compatibility.

```
	const XUIIcon = require('./components/icon/XUIIcon').default;
	const icon = require('@xero/xui-icon/icons/overflow').default;
	<div>

		<XUIButton variant="icon">
			<XUIIcon path={icon} />
		</XUIButton>

		<XUIButton variant="icon" className="xui-button-icon-large">
			<XUIIcon path={icon} className="xui-u-flex-inherit" />
		</XUIButton>

	</div>
```

### Size

The `size` prop allows you to modify the default button size. You can make buttons smaller, or span the width of their container.

```
<XUIButton size='small'>Smaller button</XUIButton>
```

There are two options for "full-width" buttons. `full-width-mobile` only creates a full-width button at mobile breakpoints.

```
	<div>
		<div className="xui-margin-bottom">

			<XUIButton variant="primary" size='full-width'>
				Big button
			</XUIButton>

		</div>
		<div>

			<XUIButton variant="create" size='full-width-mobile'>
				Mobile button
			</XUIButton>

		</div>
	</div>
```

### Disabled / Loading States

You can programatically disable a button (which prevents interaction, including preventing it gaining focus) by setting the `isDisabled` prop to `true`.

```
<div>
	<XUIButton className="xui-margin-right" isDisabled={true}>Standard Button</XUIButton>
	<XUIButton className="xui-margin-right" variant="create" isDisabled={true}>Variant Button</XUIButton>
	<XUIButton variant="borderless-standard" isDisabled={true}>Borderless Button</XUIButton>
</div>
```

The `isLoading` prop replaces the contents of the button with a loader, as well as disabling the button.

The supplied loader inherits the text color of the button component.

```
<XUIButton variant="primary" isLoading={true}>
	This text won't be displayed, because of the loader.
</XUIButton>
```


### Grouped buttons

Buttons can be grouped together (e.g. if their actions are all related) by using a `<XUIButtonGroup>`.
To disable an entire button group, you must add the `isDisabled` prop to each button in the group, not to the `<XUIButtonGroup>` itself.

```
	<XUIButtonGroup>
		<XUIButton>One</XUIButton>
		<XUIButton>Two</XUIButton>
		<XUIButton>Three</XUIButton>
	</XUIButtonGroup>

```

### Dropdown triggers

The trigger to open a [`<DropDownToggled>`](#dropdown) is often a Button. We provide a `<XUIButtonCaret />` component so you don't need to manually add a caret icon each time.

Check out the [Dropdown](#dropdown) examples to see Buttons being used as triggers.

```
	<XUIButton>
		Dropdown <XUIButtonCaret />
	</XUIButton>
```

But you can just as easily drop in other icons too.

```
	const XUIIcon = require('./components/icon/XUIIcon').default;
	const icon = require('@xero/xui-icon/icons/checkbox-check').default;
	<XUIButton>
		Checkbox <XUIIcon path={icon} className='xui-icon-inline' />
	</XUIButton>
```

### Split buttons

A split button is used where you have a primary action, but want to group it with a dropdown trigger for secondary actions.
The `<XUISplitButtonGroup>` component helps you out by propagating the `isDisabled` and the `variant` props from the parent component down to the button children.

A Split Button behaves differently to a Button Group in that it can only be disabled at the top level — you can't disable only part of the button.

```
// try setting `isDisabled={true}`, or change the variant, and see how both buttons are disabled

<XUISplitButtonGroup variant="primary" isDisabled={false} >
	<XUIButton>Split Button</XUIButton>
	<XUISplitButton />
</XUISplitButtonGroup>
```
