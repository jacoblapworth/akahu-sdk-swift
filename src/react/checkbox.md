Enhanced version of HTML checkbox using SVGs. Use in place of `<input type="checkbox" />`.

### XUI Docs

<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-checkboxes-and-radios.html#checkboxes-and-radios-1">Checkboxes and Radios</a></span>
	</div>
</div>

Standard Checkbox
```
	<div>
		<XUICheckbox>Uncontrolled</XUICheckbox>
		<XUICheckbox isChecked={false}>Unchecked</XUICheckbox>
		<XUICheckbox isChecked>Checked</XUICheckbox>
		<XUICheckbox isIndeterminate>Indeterminate</XUICheckbox>
	</div>
```
Disabled
```
<div>
	<XUICheckbox isDisabled>Unchecked</XUICheckbox>
	<XUICheckbox isDisabled isChecked>Checked</XUICheckbox>
	<XUICheckbox isDisabled isIndeterminate>Indeterminate</XUICheckbox>
</div>
```

Reversed Checkbox
```
<div>
	<XUICheckbox isReversed>Uncontrolled</XUICheckbox>
	<XUICheckbox isReversed isChecked={false}>Unchecked</XUICheckbox>
	<XUICheckbox isReversed isChecked>Checked</XUICheckbox>
	<XUICheckbox isReversed isIndeterminate>Indeterminate</XUICheckbox>
</div>
```

Custom icon
```
const customIcon = require ('@xero/xui-icon/icons/star').default;
<div>
	<XUICheckbox iconMainPath={customIcon}>
		Favourite
	</XUICheckbox>
</div>
```

Checkbox Group
```
const customIcon = require ('@xero/xui-icon/icons/star').default;
<XUICheckboxGroup>
	<XUICheckbox>Standard</XUICheckbox>
	<XUICheckbox isDisabled>Disabled</XUICheckbox>
	<XUICheckbox isReversed>Reversed</XUICheckbox>
	<XUICheckbox iconMainPath={customIcon}>Custom icon</XUICheckbox>
</XUICheckboxGroup>
```
