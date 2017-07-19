Enhanced version of HTML radio using SVGs. Use in place of `<input type="radio" />`.

The XUI Radio  supports properties for use with forms like the HTML radio input, including `isRequired`, `name`, and `value`.

<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-checkboxes-and-radios.html#checkboxes-and-radios-1">Radio in the XUI Documentation</a></span>
	</div>
</div>

## Examples

You can hook into the `onChange` event to update them when the user interacts with the radio.

```
	<div className="xui-u-flex xui-space-around">
		<XUIRadio isChecked={false}>Unchecked</XUIRadio>
		<XUIRadio isChecked>Checked</XUIRadio>
		<XUIRadio isDisabled isChecked={false}>Unchecked</XUIRadio>
		<XUIRadio isDisabled isChecked>Checked</XUIRadio>
	</div>
```

### Reversed labels

Use the `isReversed` prop to have the label appear to the left of the checkbox element.

```
<div className="xui-u-flex xui-space-around">
		<XUIRadio isReversed isChecked={false}>Unchecked</XUIRadio>
		<XUIRadio isReversed isChecked>Checked</XUIRadio>
		<XUIRadio isReversed isDisabled isChecked={false}>Unchecked</XUIRadio>
		<XUIRadio isReversed isDisabled isChecked>Checked</XUIRadio>
	</div>
```

### Custom Icons

Because the Radio component uses [`Icon`](#icon) to style the presentation of the element, you can overwrite the paths that the radio uses.

 `iconMainPath` is the path for the Radio outline; `iconCheckPath` is the indicator that the radio is selected.

```
const customMainIcon = require ('@xero/xui-icon/icons/star').default;
const customCheckIcon = require ('@xero/xui-icon/icons/suggestion').default;
<div className="xui-u-flex xui-justify-center">
	<XUIRadio name="customRadio" isChecked iconMainPath={customMainIcon}>
		Favourite
	</XUIRadio>
	<XUIRadio name="customRadio" iconCheckPath={customCheckIcon}>
		Favourite
	</XUIRadio>
</div>
```

### Radio Groups

Radios can be grouped together, which makes it easier to include them alongside inputs and other form elements.
When grouping radios together, you still need to add a `name` to each Radio so that only one can be selected at a time.

The touch target for Radios in a group is the entire "row" of the Radio Group.

```
const customCheckIcon = require ('@xero/xui-icon/icons/url').default;
<XUIRadioGroup>
	<XUIRadio name="radioGroup" isChecked iconCheckPath={customCheckIcon}>Wellington</XUIRadio>
	<XUIRadio name="radioGroup" iconCheckPath={customCheckIcon}>Canberra</XUIRadio>
	<XUIRadio name="radioGroup" iconCheckPath={customCheckIcon}>Washington D.C</XUIRadio>
	<XUIRadio name="radioGroup" isDisabled iconCheckPath={customCheckIcon}>Carthage</XUIRadio>
</XUIRadioGroup>
```
