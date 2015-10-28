XUI Tabs
========

A React UI component designed to mimick the XUI Switch behavour.

## Installation

```bash
$ bower install --save git@github.dev.xero.com:FutureRobot/xui-switch.git
```

## Horizontal Tabs

### XUIHorizontalTabItem Properties
`isEnabled` : (Boolean, Optional) Sets the switch to enabled or disabled

`onChange` : (Function, Required) Bind a function to fire when the Switch state changes

### Example
```js
import { XUISwitch } from 'xui-switch';

<XUISwitch
	isEnabled={true}
	handleChange={handleSwitch()}></XUISwitch>
```
