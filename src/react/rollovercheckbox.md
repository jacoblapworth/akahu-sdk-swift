A simple toggle that will display a provided component by default but change to a checkbox on rollover.

The underlying checkbox can be any of the available checkbox sizes. You can also use margins on the `rolloverComponent` to create a larger rollover target.

## Examples

### Standard with Avatar

```jsx harmony
import XUIRolloverCheckbox from './rollovercheckbox';
import XUIAvatar from './avatar';

<XUIRolloverCheckbox
	label='Rollover checkbox'
	isCheckboxHidden
	rolloverComponent={<XUIAvatar value="Donald Duck" />}
/>
```

### Image with xsmall checkbox and extra margins

```jsx harmony
import XUIRolloverCheckbox from './rollovercheckbox';

<XUIRolloverCheckbox
	label='Rollover checkbox'
	isCheckboxHidden
	checkboxSize='xsmall'
	rolloverComponent={<img className="xui-margin" src="https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/24.jpg" role="presentation" />}
/>
```

### Disabled

```jsx harmony
import XUIRolloverCheckbox from './rollovercheckbox';

<XUIRolloverCheckbox
	label='Rollover checkbox'
	isCheckboxHidden
	isDisabled
	rolloverComponent={<img src="https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/24.jpg" role="presentation"/>}
/>
```
