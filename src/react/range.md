<div class="xui-margin-vertical">
	<a href="../section-building-blocks-controls-range.html" isDocLink>XUIRange in the XUI Documentation</a>
</div>

XUI provides a custom range slider for consistency across platforms and visual alignment with other form elements.


## Examples

### Simple case with an onInput Console Logger
XUIRange components can be passed functions for the `onInput`.
```
	const logValue = (event) => {console.log('value:', event.target.value)};
	<XUIRange label='Range Label' max='80' defaultValue='30' onInput= {logValue} />

```

### Using Avatars & SVGs
Left and right elements can be given any object however it is recommended to use `XUIAvatar` or `XUIIcon`.
```
	const { default: plus } = require('@xero/xui-icon/icons/plus');
	<XUIRange
	leftElement = {<XUIAvatar className="xui-margin-small" imageUrl={"https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/48.jpg"}/>}
	rightElement = {<XUIIcon className="xui-margin-small" icon = {plus} />}
  label='Avatars & SVGs Range Label' />
```

### Invalid & Disabled
Invalid and/or disabled states are useful for conveying how the Range component can be used.
```
	<XUIRange isInvalid validationMessage="invalid" isDisabled label='Invalid & Disabled Range Label' />
```
