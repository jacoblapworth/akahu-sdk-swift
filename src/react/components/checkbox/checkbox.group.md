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