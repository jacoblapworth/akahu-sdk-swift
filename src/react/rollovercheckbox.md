A simple toggle that will display a provided component by default but change to a checkbox on rollover.

## Examples

### Standard with Avatar
```
const XUIAvatar = require('./components/avatar/XUIAvatar.js').default;

<XUIRolloverCheckbox isCheckboxHidden={true} size='xlarge' rolloverComponent={<XUIAvatar value="Donald Duck" />}/>
```

### Image
```
<XUIRolloverCheckbox isCheckboxHidden={true} size='large' rolloverComponent={<img src="https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/24.jpg" role="presentation"/>}/>
```

### Disabled
```
<XUIRolloverCheckbox isCheckboxHidden={true} isDisabled={true} size='large' rolloverComponent={<img src="https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/24.jpg" role="presentation"/>}/>
```
