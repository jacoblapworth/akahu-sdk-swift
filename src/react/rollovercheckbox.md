A simple toggle that will display a provided component by default but change to a checkbox on rollover.

## Examples

### Standard with Avatar
```
const XUIAvatar = require('./components/avatar/XUIAvatar.js').default;

<XUIRolloverCheckbox
	labelText='Rollover checkbox'
	isCheckboxHidden={true}
	size='xlarge'
	rolloverComponent={<XUIAvatar value="Donald Duck" />}
/>
```

### Image
```
<XUIRolloverCheckbox
	labelText='Rollover checkbox'
	isCheckboxHidden={true}
	size='large'
	labelText='rollover 1'
	rolloverComponent={<img src="https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/24.jpg" role="presentation"
	/>}
/>
```

### Disabled
```
<XUIRolloverCheckbox
	labelText='Rollover checkbox'
	isCheckboxHidden={true}
	isDisabled={true}
	size='large'
	labelText='rollover 2'
	rolloverComponent={<img src="https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/24.jpg" role="presentation"/>}
/>
```
