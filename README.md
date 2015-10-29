XUI Switch
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
	handleChange={handleSwitch()}
	value='someValue'
	name='someName'></XUISwitch>
```
