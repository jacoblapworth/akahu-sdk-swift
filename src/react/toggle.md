<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-toggle.html#toggle">Toggle in the XUI Documentation</a></span>
	</div>
</div>

Toggles are a control that can behave like a radio, or like a checkbox. They support different layout patterns for a variety of use cases.


## Examples

### Checkboxes or Radios

Use the `type` prop to specify whether the `ToggleOption`s should behave like checkboxes or like radios.

```
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
		<XUIToggle layout="fullwidth">
			<XUIToggleOption { ...checkboxToggle }>Checkbox</XUIToggleOption>
			<XUIToggleOption { ...checkboxToggle }>Checkbox</XUIToggleOption>
			<XUIToggleOption { ...checkboxToggle }>Checkbox</XUIToggleOption>
			<XUIToggleOption { ...checkboxToggle }>Checkbox</XUIToggleOption>
		</XUIToggle>
	</div><div>
		<XUIToggle layout="fullwidth">
			<XUIToggleOption { ...radioToggle }>Radio</XUIToggleOption>
			<XUIToggleOption { ...radioToggle }>Radio</XUIToggleOption>
			<XUIToggleOption { ...radioToggle }>Radio</XUIToggleOption>
			<XUIToggleOption { ...radioToggle }>Radio</XUIToggleOption>
		</XUIToggle>
	</div>
</div>
```

Toggles can also be used with icons:

```
const bold = require('@xero/xui-icon/icons/bold').default
const italic = require('@xero/xui-icon/icons/italic').default
const underline = require('@xero/xui-icon/icons/underline').default;

const iconToggle = {
	name: 'toggle-icon',
	onChange: () => {},
	type: 'checkbox'
};

<div>
	<div className="xui-margin-bottom">
		<XUIToggle>
			<XUIToggleOption { ...iconToggle } isChecked><XUIIcon path={bold} /></XUIToggleOption>
			<XUIToggleOption { ...iconToggle }><XUIIcon path={italic} /></XUIToggleOption>
			<XUIToggleOption { ...iconToggle }><XUIIcon path={underline} /></XUIToggleOption>
		</XUIToggle>
	</div>
</div>
```

### Inverted Color

To use a Toggle from within content that has the class `xui-text-inverted` providing inverted colors, use `color=inverted`.

```
const checkboxToggle = {
	name: 'toggle-checkbox',
	onChange: () => {},
	type: 'checkbox'
};

<div className="xui-padding xui-text-inverted">
		<XUIToggle layout="fullwidth" color="inverted">
			<XUIToggleOption { ...checkboxToggle }>Checkbox</XUIToggleOption>
			<XUIToggleOption { ...checkboxToggle }>Checkbox</XUIToggleOption>
			<XUIToggleOption { ...checkboxToggle } isDisabled isChecked>Disabled</XUIToggleOption>
			<XUIToggleOption { ...checkboxToggle } isDisabled>Disabled</XUIToggleOption>
		</XUIToggle>
</div>
```

### Other Supported Layouts

We recommend using the `form` layout when there is a toggle inside a form. This provides vertical padding, line height and full width styles. The `fullwidth` layout will allow children to fill the space made available to the Toggle. It's worth noting this layout will only provide full width styles and not the padding and line height settings as the `form` layout does.

You can also choose not to specify a layout, if the markup of your toggle content has more complicated requirements.

```
const checkboxToggle = {
	name: 'toggle-checkbox',
	onChange: () => {},
	type: 'checkbox'
};

<form className="xui-form-layout">
	<div className="xui-field-layout">
		<label className="xui-text-label xui-fieldlabel-layout">Input</label>
		<XUIInput inputAttributes={{ type: 'url', placeholder: 'http://www.xero.com' }} />
	</div>
	<div className="xui-field-layout">
		<label className="xui-text-label xui-fieldlabel-layout">Toggle</label>
		<XUIToggle layout="form">
			<XUIToggleOption { ...checkboxToggle }>Checkbox</XUIToggleOption>
			<XUIToggleOption { ...checkboxToggle }>Checkbox</XUIToggleOption>
			<XUIToggleOption { ...checkboxToggle }>Checkbox</XUIToggleOption>
		</XUIToggle>
	</div>
</form>

```
