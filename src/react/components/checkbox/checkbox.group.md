Checkboxes can be grouped together, making it easier to include them alongside inputs and other form elements.

The touch target for Checkboxes in a group is the entire "row" of the Checkbox Group.

```jsx harmony
import XUICheckbox, { XUICheckboxGroup } from '@xero/xui/react/checkbox';

<XUICheckboxGroup hintMessage="Hint message">
  <XUICheckbox>Item 1</XUICheckbox>
  <XUICheckbox>Item 2</XUICheckbox>
  <XUICheckbox isDisabled>Item 3</XUICheckbox>
</XUICheckboxGroup>;
```

```jsx harmony
import XUICheckbox, { XUICheckboxGroup } from '@xero/xui/react/checkbox';

<XUICheckboxGroup isInvalid validationMessage="Validation message">
  <XUICheckbox>Tūī</XUICheckbox>
  <XUICheckbox>Pīwakawaka</XUICheckbox>
  <XUICheckbox>Ruru</XUICheckbox>
  <XUICheckbox>Moa</XUICheckbox>
</XUICheckboxGroup>;
```

The Checkbox Group doesn't impact the checkboxes in any way, so you have the same flexibility with custom icons.

```jsx harmony
import star from '@xero/xui-icon/icons/star';
import XUICheckbox, { XUICheckboxGroup } from '@xero/xui/react/checkbox';

<XUICheckboxGroup>
  <XUICheckbox isReversed iconMain={star}>
    Cockatoo
  </XUICheckbox>
  <XUICheckbox isReversed iconMain={star}>
    Galah
  </XUICheckbox>
  <XUICheckbox isReversed iconMain={star}>
    Magpie
  </XUICheckbox>
</XUICheckboxGroup>;
```
