<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue">
		<use xlink:href="#xui-icon-bookmark" role="presentation"/>
	</svg>
	<a href="../section-building-blocks-forms-radios.html">Radio in the XUI Documentation</a>
</div>

Enhanced version of HTML radio using SVGs. Use in place of `<input type="radio" />`.

The `XUIRadio` supports properties for use with forms like the HTML radio input, including `isRequired`, `name`, and `value`.

`XUIRadio` can be used as a controlled component by providing the `isChecked` property. Alternatively, it can be used as an uncontrolled component by omitting `isChecked` and (optionally) providing a `defaultValue` property.

## Examples

You can hook into the `onChange` event to update them when the user interacts with the radio.

```
	<div>
		<XUIRadio isChecked={false}>Unchecked</XUIRadio>
		<XUIRadio isChecked>Checked</XUIRadio>
		<XUIRadio isDisabled isChecked={false}>Unchecked</XUIRadio>
		<XUIRadio isDisabled isChecked>Checked</XUIRadio>
	</div>
```

### Reversed labels

Use the `isReversed` prop to have the label appear to the left of the checkbox element.

```
<div>
		<XUIRadio isReversed isChecked={false}>Unchecked</XUIRadio>
		<XUIRadio isReversed isChecked>Checked</XUIRadio>
		<XUIRadio isReversed isDisabled isChecked={false}>Unchecked</XUIRadio>
		<XUIRadio isReversed isDisabled isChecked>Checked</XUIRadio>
	</div>
```

### Custom Icons

`XUIRadio` supports the use of a custom [`XUIIcon`](#icon) to style the presentation of the element.

`iconMainPath` is the path for the Radio outline; `iconCheckPath` is the indicator that the radio is selected.

```
const customMainIcon = require ('@xero/xui-icon/icons/star').default;
const customCheckIcon = require ('@xero/xui-icon/icons/suggestion').default;
<div>
	<XUIRadio name="customRadio" iconMainPath={customMainIcon}>
		Favourite
	</XUIRadio>
</div>
```
