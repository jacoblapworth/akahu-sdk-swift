XUI Switch ![](https://img.shields.io/badge/xui-9.7.0-blue.svg) [![build status](https://teamcity.dev.xero.com/app/rest/builds/buildType:(id:XeroJS_ReactLabsXuiSwitch)/statusIcon)](https://teamcity.dev.xero.com/viewType.html?buildTypeId=XeroJS_ReactLabsXuiSwitch)
========

A React UI component designed to mimic the XUI Switch behaviour.

## Installation

```bash
$ bower install --save git@github.dev.xero.com:FutureRobot/xui-switch.git
```

### XUI Switch Properties
`isEnabled` : (Boolean, Optional) Sets the switch to enabled or disabled

`onChange` : (Function, Required) Bind a function to fire when the Switch state changes

`value` : (String, Optional) Optional value for the input

`name` : (String, Optional) Optional name for the input

### Example
```js
import { XUISwitch } from 'xui-switch';

<XUISwitch
	isEnabled={true}
	onChange={handleSwitch()}
	value='someValue'
	name='someName'></XUISwitch>
```
