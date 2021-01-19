A simple toggle that will display a provided component by default but change to a checkbox on rollover.

The underlying checkbox can be any of the available checkbox sizes. You can also use margins on the `rolloverComponent` to create a larger rollover target.

## Examples

### Standard with Avatar

```jsx harmony
import XUIRolloverCheckbox from '@xero/xui/react/rollovercheckbox';
import XUIAvatar from '@xero/xui/react/avatar';

<XUIRolloverCheckbox
  label="Rollover checkbox"
  isCheckboxHidden
  rolloverComponent={<XUIAvatar value="Donald Duck" />}
/>;
```

### Image with xsmall checkbox and extra margins

```jsx harmony
import XUIRolloverCheckbox from '@xero/xui/react/rollovercheckbox';

<XUIRolloverCheckbox
  label="Rollover checkbox"
  isCheckboxHidden
  checkboxSize="xsmall"
  rolloverComponent={
    <img
      style={{ width: '24px', height: '24px' }}
      className="xui-margin"
      src="https://i.picsum.photos/id/875/100/100.jpg?hmac=f_Pri81ET_AveaagT58xJNaG1s3j3GCI7tvgJbjeZzk"
      role="presentation"
    />
  }
/>;
```

### Disabled

```jsx harmony
import XUIRolloverCheckbox from '@xero/xui/react/rollovercheckbox';

<XUIRolloverCheckbox
  label="Rollover checkbox"
  isCheckboxHidden
  isDisabled
  rolloverComponent={
    <img
      style={{ width: '24px', height: 'auto' }}
      src="https://i.picsum.photos/id/1033/100/100.jpg?hmac=tomT-dDv5vivqHh5P2NCXMYcsD8G3D4-hAqxbdQ7O2c"
      role="presentation"
    />
  }
/>;
```
