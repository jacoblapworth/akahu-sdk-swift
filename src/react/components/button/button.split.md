A split button group is used to present a primary action coupled with a dropdown trigger for secondary actions.
The `<XUISplitButtonGroup>` component will inherit the `isDisabled` and the `variant` props from the parent component down to the button children. Provide an `aria-label` for the `XUISecondaryButton` to ensure accessibility.

A `<XUISplitButtonGroup>` can only be completely disabled - you cannot disable only one part of the button

```jsx harmony
import XUIButton, { XUISplitButtonGroup, XUISecondaryButton } from '@xero/xui/react/button';
import Picklist, { Pickitem } from '@xero/xui/react/picklist';
import DropDown, { DropDownToggled } from '@xero/xui/react/dropdown';

// try setting `isDisabled={true}`, or change the variant, and see how both buttons are disabled

<XUISplitButtonGroup variant="primary">
  <XUIButton>Split action</XUIButton>
  <DropDownToggled
    trigger={<XUISecondaryButton variant="primary" key="split" aria-label="Other actions" />}
    dropdown={
      <DropDown fixedWidth size="small">
        <Picklist>
          <Pickitem id="aa" value="aa" key="aa">
            Option 1
          </Pickitem>
          <Pickitem id="bb" value="bb" key="bb">
            Option 2
          </Pickitem>
        </Picklist>
      </DropDown>
    }
  />
</XUISplitButtonGroup>;
```

When using a secondary button as the trigger of a dropdown, variants are not inherited. You might also need to adjust the height, if your button is multi-line.

```jsx harmony
import XUIButton, { XUISplitButtonGroup, XUISecondaryButton } from '@xero/xui/react/button';
import Picklist, { Pickitem } from '@xero/xui/react/picklist';
import DropDown, { DropDownToggled } from '@xero/xui/react/dropdown';

<XUISplitButtonGroup variant="standard">
  <XUIButton>Split action</XUIButton>
  <DropDownToggled
    trigger={<XUISecondaryButton variant="standard" key="split" aria-label="Other actions" />}
    dropdown={
      <DropDown fixedWidth size="small">
        <Picklist>
          <Pickitem id="aa" value="aa" key="aa">
            Option 1
          </Pickitem>
          <Pickitem id="bb" value="bb" key="bb">
            Option 2
          </Pickitem>
        </Picklist>
      </DropDown>
    }
  />
</XUISplitButtonGroup>;
```
