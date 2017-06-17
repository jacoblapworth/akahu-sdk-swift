## What

Enhanced verison of HTML `<input type="checkbox" />` using SVGs.

## Why

Provide consistent look across browsers.

## Best Practice

### Do

* Use in place of `<input type="checkbox" />`

### Don't

* Go overboard with custom icons

```
const customIcon = require ('@xero/xui-icon/icons/star').default;
const rowClasses = 'xui-space-around xui-margin-bottom-small';
console.log(customIcon);

<div>
	<section>
		<h3>Standard Checkbox</h3>
		<div className={rowClasses}>
			<XUICheckbox>Uncontrolled</XUICheckbox>
			<XUICheckbox isChecked={false}>Unchecked</XUICheckbox>
			<XUICheckbox isChecked>Checked</XUICheckbox>
			<XUICheckbox isIndeterminate>Indeterminate</XUICheckbox>
		</div>
	</section>
	<section>
		<h3>Disabled</h3>
		<div>
			<XUICheckbox isDisabled>Unchecked</XUICheckbox>
			<XUICheckbox isDisabled isChecked>Checked</XUICheckbox>
			<XUICheckbox isDisabled isIndeterminate>Indeterminate</XUICheckbox>
		</div>
	</section>
	<section>
		<h3>Reversed Checkbox</h3>
		<div className={rowClasses}>
			<XUICheckbox isReversed>Uncontrolled</XUICheckbox>
			<XUICheckbox isReversed isChecked={false}>Unchecked</XUICheckbox>
			<XUICheckbox isReversed isChecked>Checked</XUICheckbox>
			<XUICheckbox isReversed isIndeterminate>Indeterminate</XUICheckbox>
		</div>
	</section>
	<section>
		<h3>Checkbox with custom icons</h3>
		<div className={rowClasses}>
			<XUICheckbox iconMainPath={customIcon}>
				Favourite
			</XUICheckbox>
		</div>
	</section>
	<section>
		<h3>Checkbox Group</h3>
		<XUICheckboxGroup>
			<XUICheckbox isReversed>Reversed</XUICheckbox>
			<XUICheckbox>Normal</XUICheckbox>
			<XUICheckbox iconMainPath={customIcon}>Custom Icon</XUICheckbox>
		</XUICheckboxGroup>
	</section>
	</div>
```
