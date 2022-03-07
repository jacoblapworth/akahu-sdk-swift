Switches can be grouped together, making it easier to include them alongside inputs and other form elements.

The touch target for Switches in a group is the entire "row" of the Switch Group.

```jsx harmony
import XUISwitch, { XUISwitchGroup } from '@xero/xui/react/switch';

<XUISwitchGroup
  hintMessage="Permissions can also be set from the settings tab"
  label="Access permissions"
>
  <XUISwitch isDefaultChecked>Invoicing</XUISwitch>
  <XUISwitch>Projects</XUISwitch>
  <XUISwitch isDisabled>Reports</XUISwitch>
</XUISwitchGroup>;
```

```jsx harmony
import XUISwitch, { XUISwitchGroup } from '@xero/xui/react/switch';

<XUISwitchGroup
  isInvalid
  label="Access permissions"
  validationMessage="Select at least one permission"
>
  <XUISwitch isReversed>Invoicing</XUISwitch>
  <XUISwitch isReversed>Projects</XUISwitch>
  <XUISwitch isReversed isDisabled>
    Reports
  </XUISwitch>
</XUISwitchGroup>;
```
