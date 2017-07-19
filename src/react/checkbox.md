Enhanced version of HTML checkbox using SVGs. Use in place of `<input type="checkbox" />`.

The XUI Checkbox supports properties for use with forms like the HTML checkbox input, including `isRequired`, `name`, and `value`.

<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-checkboxes-and-radios.html#checkboxes-and-radios-1">Checkbox in the XUI Documentation</a></span>
	</div>
</div>

## Examples

Checkbox presentation is driven by the two props, `isChecked` and `isIndeterminate`.
You can hook into the `onChange` event to update them when the user interacts with the checkbox.

```
	<div className="xui-u-flex xui-space-around">
		<XUICheckbox isChecked={false}>Unchecked</XUICheckbox>
		<XUICheckbox isChecked>Checked</XUICheckbox>
		<XUICheckbox isIndeterminate>Indeterminate</XUICheckbox>
	</div>
```

### Disabled

```
<div className="xui-u-flex xui-space-around">
	<XUICheckbox isDisabled>Unchecked</XUICheckbox>
	<XUICheckbox isDisabled isChecked>Checked</XUICheckbox>
	<XUICheckbox isDisabled isIndeterminate>Indeterminate</XUICheckbox>
</div>
```

### Reversed labels

Use the `isReversed` prop to have the label appear to the left of the checkbox element.

```
<div className="xui-u-flex xui-space-around">
	<XUICheckbox isReversed isChecked={false}>Unchecked</XUICheckbox>
	<XUICheckbox isReversed isChecked>Checked</XUICheckbox>
	<XUICheckbox isReversed isIndeterminate>Indeterminate</XUICheckbox>
</div>
```

### Custom Icons

Because the Checkbox component uses [`Icon`](#icon) to style the presentation of the element, you can overwrite the paths that the checkbox uses.

 `iconMainPath` is the path for the checkbox outline; `iconCheckPath` is the checkmark itself, and `iconIndeterminatePath` is the indeterminate state.

```
const customIcon = require ('@xero/xui-icon/icons/star').default;
<div>
	<XUICheckbox isChecked iconMainPath={customIcon}>
		Favourite
	</XUICheckbox>
</div>
```

### Checkbox Groups

Checkboxes can be grouped together, which makes it easier to include them alongside inputs and other form elements.

The touch target for Checkboxes in a group is the entire "row" of the Checkbox Group.

```
<XUICheckboxGroup>
	<XUICheckbox>Check me out!</XUICheckbox>
</XUICheckboxGroup>
```

```
<XUICheckboxGroup>
	<XUICheckbox>Tūī</XUICheckbox>
	<XUICheckbox>Pīwakawaka</XUICheckbox>
	<XUICheckbox>Ruru</XUICheckbox>
	<XUICheckbox isDisabled>Moa</XUICheckbox>
</XUICheckboxGroup>
```
The Checkbox Group doesn't impact the checkboxes in any way, so you have the same flexibility with custom icons.

```
const customIcon = require ('@xero/xui-icon/icons/star').default;
<XUICheckboxGroup>
	<XUICheckbox isReversed iconMainPath={customIcon}>Cockatoo</XUICheckbox>
	<XUICheckbox isReversed iconMainPath={customIcon}>Galah</XUICheckbox>
	<XUICheckbox isReversed iconMainPath={customIcon}>Magpie</XUICheckbox>
</XUICheckboxGroup>
```
