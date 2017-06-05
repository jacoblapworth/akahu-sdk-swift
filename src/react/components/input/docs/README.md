xui-input
==========
![](https://img.shields.io/badge/XUI-^10.17.1-blue.svg)
![](https://img.shields.io/badge/React-^15.5.4-blue.svg)

## Example
```js
import React from 'react';
import ReactDOM from 'react-dom';
import XUIInput from '@xero/xui/react/input';
import socialTwitterIconPath from '@xero/xui-icon/icons/social-twitter';

(function() {
	ReactDOM.render(
		<XUIInput
			inputAttributes={{ onChange: onChange, placeholder: '@username' }}
			iconAttributes={{ path: socialTwitterIconPath, color: 'white', wrapperColor: 'twitter' }}
		/>,
		document.getElementById('app')
	);
})();
```

## Prop Types

### XUIInput
`clearButtonProps`: (object, Optional) Object containing button element related properties.

`hasClearButton`: (bool, Optional) Determines if the input has a clear button or not.

`inputAttributes`: (object, Optional) Object containing any additional properties and their values to the Input element.
Includes defaultValue event handler callbacks i.e. onChange, onSelect, onClick, onKeyDown etc.

`inputRef`: (func, Optional) Function to add a reference to the Input element


### XUIStatelessInput
`button`: (element, Optional) Object containing button element placed after input in dom

`className`: (string, Optional) Class to apply to the input element

`containerClassName`: (string, Optional) Class to apply to the container element

`iconAttributes`: (shape, Optional) Object containing icon element related properties

`inputAttributes`: (object, Optional, Default={
    type : 'text',
    disabled: false,
    readOnly: false
}) Object containing any additional properties and their values to the Input element.
Includes event handler callbacks i.e. onChange, onSelect, onClick, onKeyDown etc.

`inputRef`: (func, Optional) Function to add a reference to the Input element

`qaHook`: (string, Optional) Value of the automationId attribute

`validationMessage`: (string, Optional) Validation message to show

`hintMessage`: (string, Optional) Explanatory message to show

`isInvalid`: (bool, Optional, Default=false) Whether the input should be show as invalid
