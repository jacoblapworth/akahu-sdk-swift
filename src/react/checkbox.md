<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue">
		<use xlink:href="#xui-icon-bookmark" role="presentation"/>
	</svg>
	<a href="../section-building-blocks-forms-checkboxes.html">Checkbox in the XUI Documentation</a>
</div>

Enhanced version of HTML checkbox. Use in place of `<input type="checkbox" />`.

`XUICheckbox` supports properties for use with forms like the HTML checkbox input, including `isRequired`, `name`, and `value`.

`XUICheckbox` can be used as a controlled component by providing the `isChecked` property.
It can be used as an uncontrolled component by omitting `isChecked` and (optionally) providing a `defaultValue` property.

## Examples

`XUICheckbox`'s presentation is driven by the two props, `isChecked` and `isIndeterminate`. You can hook into the `onChange` event to update them when the user interacts with the checkbox.

```
	<div>
		<XUICheckbox isChecked={false}>Unchecked</XUICheckbox>
		<XUICheckbox isChecked>Checked</XUICheckbox>
		<XUICheckbox isIndeterminate>Indeterminate</XUICheckbox>
	</div>
```

### Disabled

```
<div>
	<XUICheckbox isDisabled>Unchecked</XUICheckbox>
	<XUICheckbox isDisabled isChecked>Checked</XUICheckbox>
	<XUICheckbox isDisabled isIndeterminate>Indeterminate</XUICheckbox>
</div>
```

### Reversed labels

Use the `isReversed` prop to have the label appear to the left of the checkbox element.

```
<div>
	<XUICheckbox isReversed isChecked={false}>Unchecked</XUICheckbox>
	<XUICheckbox isReversed isChecked>Checked</XUICheckbox>
	<XUICheckbox isReversed isIndeterminate>Indeterminate</XUICheckbox>
</div>
```

### Custom Icons

`XUICheckbox` supports the use of a custom [`XUIIcon`](#icon) to style the presentation of the element.

 `iconMainPath` is the path for the checkbox outline; `iconCheckPath` is the checkmark itself, and `iconIndeterminatePath` is the indeterminate state.

```
const customIcon = require ('@xero/xui-icon/icons/star').default;
<div>
	<XUICheckbox isChecked iconMainPath={customIcon}>
		Favourite
	</XUICheckbox>
</div>
```
