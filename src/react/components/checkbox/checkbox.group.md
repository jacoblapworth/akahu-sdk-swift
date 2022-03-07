Checkboxes can be grouped together, making it easier to include them alongside inputs and other form elements.

The touch target for Checkboxes in a group is the entire "row" of the Checkbox Group.

```jsx harmony
import XUICheckbox, { XUICheckboxGroup } from '@xero/xui/react/checkbox';

<XUICheckboxGroup
  hintMessage="Select which items should be included on the quote"
  label="Confirm items to quote"
>
  <XUICheckbox>Tasks</XUICheckbox>
  <XUICheckbox>Annual Financial Statements Preparation</XUICheckbox>
  <XUICheckbox isDisabled>Tax Return Preparation</XUICheckbox>
</XUICheckboxGroup>;
```

```jsx harmony
import XUICheckbox, { XUICheckboxGroup } from '@xero/xui/react/checkbox';

<XUICheckboxGroup
  isInvalid
  label="Confirm items to quote"
  validationMessage="Select 1 or more items"
>
  <XUICheckbox>Tasks</XUICheckbox>
  <XUICheckbox>Annual Financial Statements Preparation</XUICheckbox>
  <XUICheckbox>Tax Return Preparation</XUICheckbox>
</XUICheckboxGroup>;
```

The Checkbox Group doesn't impact the checkboxes in any way, so you have the same flexibility with custom icons.

```jsx harmony
import star from '@xero/xui-icon/icons/star';
import XUICheckbox, { XUICheckboxGroup } from '@xero/xui/react/checkbox';

<XUICheckboxGroup label="Reports">
  <XUICheckbox iconMain={star}>Balance sheet</XUICheckbox>
  <XUICheckbox iconMain={star}>Profit and loss</XUICheckbox>
  <XUICheckbox iconMain={star}>Account transactions</XUICheckbox>
</XUICheckboxGroup>;
```
