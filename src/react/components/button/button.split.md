A split button group is used to present a primary action coupled with a dropdown trigger for secondary actions.
The `<XUISplitButtonGroup>` component will inherit the `isDisabled` and the `variant` props from the parent component down to the button children. Provide an `aria-label` for the `XUISecondaryButton` to ensure accessibility.

A `<XUISplitButtonGroup>` can only be completely disabled - you cannot disable only one part of the button

```jsx harmony
import XUIButton, { XUISplitButtonGroup, XUISecondaryButton } from '@xero/xui/react/button';

// try setting `isDisabled={true}`, or change the variant, and see how both buttons are disabled

<XUISplitButtonGroup variant="primary" isDisabled={false}>
  <XUIButton>Split Button</XUIButton>
  <XUISecondaryButton aria-label="More options" />
</XUISplitButtonGroup>;
```

When using a secondary button as the trigger of a dropdown, variants are not inherited. You might also need to adjust the height, if your button is multi-line.

```jsx harmony
import XUIButton, { XUISplitButtonGroup, XUISecondaryButton } from '@xero/xui/react/button';
import Picklist, { Pickitem } from '@xero/xui/react/picklist';
import XUIDropdown, { XUIDropdownToggled } from '@xero/xui/react/dropdown';

<XUISplitButtonGroup variant="primary" isDisabled={false}>
  <XUIButton>Dropdown Split Button</XUIButton>
  <XUIDropdownToggled
    trigger={<XUISecondaryButton key="split" variant="primary" aria-label="Other actions" />}
    dropdown={
      <XUIDropdown>
        <Picklist>
          <Pickitem id="aa" value="aa" key="aa">
            Option 1
          </Pickitem>
          <Pickitem id="bb" value="bb" key="bb">
            Option 2
          </Pickitem>
        </Picklist>
      </XUIDropdown>
    }
  />
</XUISplitButtonGroup>;
```
