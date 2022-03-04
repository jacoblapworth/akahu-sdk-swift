A split button group is used to present a primary action coupled with a dropdown trigger for secondary actions.
The `<XUISplitButtonGroup>` component will inherit the `isDisabled` and the `variant` props from the parent component down to the button children. Provide an `aria-label` for the `XUISecondaryButton` to ensure accessibility.

A `<XUISplitButtonGroup>` can only be completely disabled - you cannot disable only one part of the button

```jsx harmony
import XUIButton, { XUISecondaryButton, XUISplitButtonGroup } from '@xero/xui/react/button';
import XUIDropdown, { XUIDropdownToggled } from '@xero/xui/react/dropdown';
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';

// try setting `isDisabled={true}`, or change the variant, and see how both buttons are disabled

<XUISplitButtonGroup variant="main">
  <XUIButton>Save</XUIButton>
  <XUIDropdownToggled
    dropdown={
      <XUIDropdown hasFixedWidth size="small">
        <XUIPicklist>
          <XUIPickitem id="save-and-send-1">Save and send</XUIPickitem>
          <XUIPickitem id="save-and-print-2">Save and print</XUIPickitem>
        </XUIPicklist>
      </XUIDropdown>
    }
    trigger={<XUISecondaryButton aria-label="Save options" variant="main" />}
  />
</XUISplitButtonGroup>;
```

When using a secondary button as the trigger of a dropdown, variants are not inherited. You might also need to adjust the height, if your button is multi-line.

```jsx harmony
import XUIButton, { XUISecondaryButton, XUISplitButtonGroup } from '@xero/xui/react/button';
import XUIDropdown, { XUIDropdownToggled } from '@xero/xui/react/dropdown';
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';

<XUISplitButtonGroup variant="standard">
  <XUIButton>Save</XUIButton>
  <XUIDropdownToggled
    dropdown={
      <XUIDropdown hasFixedWidth size="small">
        <XUIPicklist>
          <XUIPickitem id="save-and-send-2">Save and send</XUIPickitem>
          <XUIPickitem id="save-and-print-2">Save and print</XUIPickitem>
        </XUIPicklist>
      </XUIDropdown>
    }
    trigger={<XUISecondaryButton aria-label="Save options" variant="standard" />}
  />
</XUISplitButtonGroup>;
```
