XUI Switch ![](https://img.shields.io/badge/xui-^9.7.0-blue.svg) [![build status](https://teamcity.dev.xero.com/app/rest/builds/buildType:(id:XeroJS_SharedReactComponents_UxeXuiSwitch)/statusIcon)](https://teamcity.dev.xero.com/viewType.html?buildTypeId=XeroJS_ReactLabsXuiSwitch)

A React UI component designed to mimic the XUI Switch behaviour.

## Installation

```bash
$ bower install --save git@github.dev.xero.com:ReactLabs/xui-switch.git
```

### XUI Switch Properties
`disabled` : (Boolean, Optional) Sets the switch to enabled or disabled

`checked` : (Boolean, Optional) Sets the switch to be checked or unchecked (on or off)

`onChange` : (Function, Required) Bind a function to fire when the Switch state changes

`value` : (String, Optional) Optional value for the input

`name` : (String, Optional) Optional name for the input

### Example
```js
import { XUISwitch } from 'xui-switch';

<XUISwitch
	disabled={false}
	checked={true}
	onChange={handleSwitch()}
	value='someValue'
	name='someName'></XUISwitch>
```
