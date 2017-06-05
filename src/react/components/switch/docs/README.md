xui-switch
===========
![](https://img.shields.io/badge/XUI-%5E9.7.0%20%7C%7C%20%5E10.0.0-blue.svg)
![](https://img.shields.io/badge/React-^15.5.4-blue.svg)


A React UI component designed to mimic the XUI Switch behaviour.

## Example
```js
import XUISwitch from '@xero/xui/react/switch';

const handleSwitch = () => console.log('switch clicked');

(function() {
	ReactDOM.render(
		<XUISwitch
			checked
			onChange={handleSwitch}
			value='someValue'
			name='someName'
		/>,
		document.getElementById('app')
	);
})();

```

## xui-switch prop types

### XUISwitch
`onChange`: (func, Required)  Fires parent onChange handler

`checked`: (bool, Optional) Determines whether the switch is checked or unchecked

`disabled`: (bool, Optional) Determines whether the switch is enabled or disabled

`name`: (string, Optional) Name attribute for the input

`value`: (string, Optional) Value attribute for the input
