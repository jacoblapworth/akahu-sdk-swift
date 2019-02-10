Checkboxes can be grouped together, making it easier to include them alongside inputs and other form elements.

The touch target for Checkboxes in a group is the entire "row" of the Checkbox Group.

```jsx
<XUICheckboxGroup
	hintMessage="Grouped checkboxes can have hints"
>
	<XUICheckbox>Check me out!</XUICheckbox>
</XUICheckboxGroup>
```

```jsx
<XUICheckboxGroup
	isInvalid
	validationMessage="Grouped checkboxes can have validation"
>
	<XUICheckbox>Tūī</XUICheckbox>
	<XUICheckbox>Pīwakawaka</XUICheckbox>
	<XUICheckbox>Ruru</XUICheckbox>
	<XUICheckbox isDisabled>Moa</XUICheckbox>
</XUICheckboxGroup>
```
The Checkbox Group doesn't impact the checkboxes in any way, so you have the same flexibility with custom icons.

```jsx
const customIcon = require ('@xero/xui-icon/icons/star').default;
<XUICheckboxGroup>
	<XUICheckbox isReversed iconMain={customIcon}>Cockatoo</XUICheckbox>
	<XUICheckbox isReversed iconMain={customIcon}>Galah</XUICheckbox>
	<XUICheckbox isReversed iconMain={customIcon}>Magpie</XUICheckbox>
</XUICheckboxGroup>
```
