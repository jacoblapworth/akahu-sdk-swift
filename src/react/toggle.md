<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-blobicon xui-blobicon-large xui-icon-color-blue">
		<use xlink:href="#xui-icon-bookmark" role="presentation"/>
	</svg>
	<a href="../section-building-blocks-controls-toggle.html">Toggle in the XUI Documentation</a>
</div>

`XUIToggle` is a control that can behave like a radio, or like a checkbox. It supports different layout patterns for a variety of use cases.

## Examples

### Checkboxes or Radios

Use the `type` prop on `XUIToggleOption`s to specify whether they should behave like checkboxes or like radios.

```jsx
const checkboxToggle = {
	name: 'toggle-checkbox',
	onChange: () => {},
	type: 'checkbox'
};

const radioToggle = {
	name: 'toggle-radio',
	onChange: () => {},
	type: 'radio'
};

<div>
	<div className="xui-margin-bottom">
		<XUIToggle layout="fullwidth" secondaryProps={{role: 'group', 'aria-label': 'checkbox toggle'}}>
			<XUIToggleOption { ...checkboxToggle }>Checkbox</XUIToggleOption>
			<XUIToggleOption { ...checkboxToggle }>Checkbox</XUIToggleOption>
			<XUIToggleOption { ...checkboxToggle }>Checkbox</XUIToggleOption>
			<XUIToggleOption { ...checkboxToggle }>Checkbox</XUIToggleOption>
		</XUIToggle>
	</div><div className="xui-margin-bottom">
		<XUIToggle layout="fullwidth" secondaryProps={{'aria-label': 'radio toggle'}}>
			<XUIToggleOption { ...radioToggle }>Radio</XUIToggleOption>
			<XUIToggleOption { ...radioToggle }>Radio</XUIToggleOption>
			<XUIToggleOption { ...radioToggle }>Radio</XUIToggleOption>
			<XUIToggleOption { ...radioToggle }>Radio</XUIToggleOption>
		</XUIToggle>
	</div>
</div>
```

### Inverted Color

To use a `XUIToggle` within an dark section, pass `"inverted"` to `XUIToggle`'s `color` prop.

```jsx
const checkboxToggle = {
	name: 'toggle-checkbox-inverted',
	onChange: () => {},
	type: 'checkbox'
};

<div className="xui-padding xui-color-white xui-background-grey-1">
		<XUIToggle layout="fullwidth" color="inverted" secondaryProps={{role: 'group', 'aria-label': 'checkbox toggle'}}>
			<XUIToggleOption { ...checkboxToggle }>Checkbox</XUIToggleOption>
			<XUIToggleOption { ...checkboxToggle }>Checkbox</XUIToggleOption>
			<XUIToggleOption { ...checkboxToggle } isDisabled isChecked>Disabled</XUIToggleOption>
			<XUIToggleOption { ...checkboxToggle } isDisabled>Disabled</XUIToggleOption>
		</XUIToggle>
</div>
```

### Variants

To make your toggles smaller (same size as small buttons), pass `"small"` to `XUIToggle`'s `variant` prop.

```jsx
const radioToggle = {
	name: 'toggle-radio-layout-size',
	onChange: () => {},
	type: 'radio'
};

const checkboxToggle = {
	name: 'toggle-checkbox-layout-size',
	onChange: () => {},
	type: 'checkbox'
};

<div>
	<XUIToggle className="xui-margin-bottom" variant="small" layout="fullwidth" secondaryProps={{'aria-label': 'radio toggle'}}>
		<XUIToggleOption { ...radioToggle }>Uno</XUIToggleOption>
		<XUIToggleOption { ...radioToggle }>Dos</XUIToggleOption>
		<XUIToggleOption { ...radioToggle }>Tres</XUIToggleOption>
		<XUIToggleOption { ...radioToggle }>Cuatro</XUIToggleOption>
	</XUIToggle>
</div>
```

### Other Supported Layouts

When using `XUIToggle` with text content, it's recommended to use the `form` layout.

You can also choose not to specify a layout, if the markup of your toggle content has more complicated requirements.

```jsx
const checkboxToggle = {
	name: 'toggle-checkbox',
	onChange: () => {},
	type: 'checkbox'
};

<form className="xui-form-layout">
	<div className="xui-field-layout">
		<XUITextInput type="url" placeholer="http://www.xero.com" labelText="Input" />
	</div>
	<div className="xui-field-layout">
		<label className="xui-text-label xui-fieldlabel-layout">Toggle</label>
		<XUIToggle layout="form" secondaryProps={{role: 'group', 'aria-label': 'checkbox toggle'}}>
			<XUIToggleOption { ...checkboxToggle }>Checkbox</XUIToggleOption>
			<XUIToggleOption { ...checkboxToggle }>Checkbox</XUIToggleOption>
			<XUIToggleOption { ...checkboxToggle }>Checkbox</XUIToggleOption>
		</XUIToggle>
	</div>
</form>

```
