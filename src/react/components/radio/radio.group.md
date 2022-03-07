Radios can be grouped together, which makes it easier to include them alongside inputs and other form elements.
When grouping radios together, you still need to add a `name` to each Radio so that only one can be selected at a time.

The touch target for Radios in a group is the entire "row" of the Radio Group.

```jsx harmony
import XUIRadio, { XUIRadioGroup } from '@xero/xui/react/radio';

<XUIRadioGroup label="How did you pay?" hintMessage="Company money is non-reimbursable">
  <XUIRadio name="paymentMethod">Company money</XUIRadio>
  <XUIRadio name="paymentMethod">Personal money</XUIRadio>
</XUIRadioGroup>;
```
