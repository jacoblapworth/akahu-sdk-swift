<div class="xui-margin-vertical">
	<a href="../section-building-blocks-controls-button.html" isDocLink>Button in the XUI Documentation</a>
</div>

## Examples

Whatever you put between the start and end tags of `XUIButton` will appear as the contents.

You can give `XUIButton` a click handler to perform actions when the button is triggered, either by clicking on it, or by pressing `space` or `enter` when it has focus.

```
	function handleClick() { alert('You clicked the button!'); }
	<XUIButton onClick={handleClick}>Click this button</XUIButton>
```

### Variants

Different styles of button are available by passing different values to the `variant` prop.

```
	const ExampleContainer = require('./docs/ExampleContainer').default;
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
		<ExampleContainer className="xui-padding-xsmall" isInverted>
			<XUIButton className="xui-margin-right" variant="borderless-inverted">Borderless Inverted</XUIButton>
		</ExampleContainer>
	</div>
```

Icon buttons are supported by the `icon`, `icon-inverted`, `icon-large` and `icon-inverted-large` variants.

When placing `XUIIcon` alone in a button, ensure accessibility by adding a `title` prop on the `XUIIcon`, or a `title` and `aria-label` on the button itself.

If you add the `xui-button-icon-large` class to the button, it will be given a larger touch target.

```jsx
	const XUIIcon = require('./components/icon/XUIIcon').default;
	const icon = require('@xero/xui-icon/icons/overflow').default;
	<div>

		<XUIButton variant="icon">
			<XUIIcon icon={icon} title="Dots menu" />
		</XUIButton>

		<XUIButton variant="icon" className="xui-button-icon-large">
			<XUIIcon icon={icon} title="Dots menu" size="large" />
		</XUIButton>

		<ExampleContainer className="xui-padding-xsmall" isInverted>
			<XUIButton variant="icon-inverted">
				<XUIIcon icon={icon} title="Dots menu" />
			</XUIButton>

			<XUIButton variant="icon-inverted" className="xui-button-icon-large">
				<XUIIcon icon={icon} title="Dots menu" size="large" />
			</XUIButton>
		</ExampleContainer>

	</div>
```

### Size

The `size` prop allows you to modify the default button size. You can make buttons smaller, or span the width of their container.

```
<XUIButton size='small'>Smaller button</XUIButton>
```

There are two options for "full-width" buttons. `full-width-mobile` only creates a full-width button at mobile breakpoints. `full-width` will be a full-width button at any breakpoint.

```
	<div>
		<div className="xui-margin-bottom">

			<XUIButton variant="primary" size='full-width'>
				Full-width Button
			</XUIButton>

		</div>
		<div>

			<XUIButton variant="create" size='full-width-mobile'>
				Mobile Full-width Button
			</XUIButton>

		</div>
	</div>
```

### Disabled / Loading States

You can programatically disable a button by setting the `isDisabled` prop to `true`. This will prevent interaction, including preventing it gaining focus.

```
<div>
	<XUIButton className="xui-margin-right" isDisabled={true}>Standard Button</XUIButton>
	<XUIButton className="xui-margin-right" variant="create" isDisabled={true}>Variant Button</XUIButton>
	<XUIButton variant="borderless-standard" isDisabled={true}>Borderless Button</XUIButton>
</div>
```

The `isLoading` prop replaces the contents of the button with a loader, as well as disabling the button.

The `retainLayout` prop modifies the internals to keep the original button size, but shows a loader instead of the content

The `minLoaderWidth` prop modifies the button by applying a 75px min width on it. Useful for short content buttons.

The supplied loader inherits the text color of the button component.

```
<div>
	<span className="xui-margin-right">
		<XUIButton variant="primary" isLoading>
			This text won't be displayed, because of the loader.
		</XUIButton>
	</span>
	<span className="xui-margin-right">
		<XUIButton variant="primary" isLoading minLoaderWidth>
			No
		</XUIButton>
	</span>
	<span className="xui-margin-right">
		<XUIButton variant="primary" minLoaderWidth>
			No
		</XUIButton>
	</span>
	<XUIButton variant="primary" isLoading retainLayout={false}>
		This text won't be displayed, because of the loader.
	</XUIButton>
</div>
```
