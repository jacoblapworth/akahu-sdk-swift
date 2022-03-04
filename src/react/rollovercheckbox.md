A simple toggle that will display a provided component by default but change to a checkbox on rollover.

The underlying checkbox can be any of the available checkbox sizes. You can also use margins on the `rolloverComponent` to create a larger rollover target.

## Examples

### Standard with Avatar

```jsx harmony
import XUIAvatar from '@xero/xui/react/avatar';
import XUIRolloverCheckbox from '@xero/xui/react/rollovercheckbox';

<XUIRolloverCheckbox
  isCheckboxHidden
  label="Select contact"
  rolloverComponent={<XUIAvatar value="John Smith" />}
/>;
```
