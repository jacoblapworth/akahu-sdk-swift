xui-switch
===========

[![build status](https://teamcity.dev.xero.com/app/rest/builds/buildType:(id:XeroJS_SharedReactComponents_UxeXuiSwitch)/statusIcon)](https://teamcity.dev.xero.com/viewType.html?buildTypeId=XeroJS_SharedReactComponents_UxeXuiSwitch)
![](https://img.shields.io/badge/XUI-%5E9.7.0%20%7C%7C%20%5E10.0.0-blue.svg)
![](https://img.shields.io/badge/React-^0.14.2 || ^15.0.0-blue.svg)


A React UI component designed to mimic the XUI Switch behaviour.

## Installation

```bash
$ bower install --save git@github.dev.xero.com:UXE/xui-switch.git
```

## Example
```js
import XUISwitch from 'xui-switch';

<XUISwitch
	disabled={false}
	checked={true}
	onChange={handleSwitch()}
	value='someValue'
	name='someName'>
</XUISwitch>
```

## xui-switch prop types

### XUISwitch
`onChange`: (func, Required)  Fires parent onChange handler

`checked`: (bool, Optional) Determines whether the switch is checked or unchecked

`disabled`: (bool, Optional) Determines whether the switch is enabled or disabled

`name`: (string, Optional) Name attribute for the input

`value`: (string, Optional) Value attribute for the input


## Testing

### Running the Unit Tests
`$ npm run test`
This simply runs the Unit Tests found in the `__tests__` directory. Reports the results in the command line using the spec reporter.

### Running the UI Tests
`$ npm run test-ui`
This script generates a html page at `test/ui/index.html` so you can view the component as well as running the unit tests.


**This README has been automatically generated. Please mark any changes in the docs folder.**

