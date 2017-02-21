# xui-textarea

[![build status](https://teamcity.dev.xero.com/app/rest/builds/buildType:(id:XeroJS_SharedReactComponents_UxeXuiTextarea)/statusIcon)](https://teamcity.dev.xero.com/viewType.html?buildTypeId=XeroJS_SharedReactComponents_UxeXuiTextarea)
![](https://img.shields.io/badge/XUI-^10.17.1-blue.svg)
![](https://img.shields.io/badge/React-^15.3.1-blue.svg)

A React text area which provides basic XUI styling, autosizing (within a min/max number of rows), and a counter which shows characters remaining (if maximum number of characters is set).

## Auto-resize

This component provides an auto-resizing capability. This behaviour is enabled whenever `minRows` and/or `maxRows` is set to a value other than 0. To disable this behaviour, either exclude these props or set them to 0.

If `minRows` or `maxRows` is not set, the css property for `min-height` or `max-height` will be used in their place. Otherwise `min-height` and `max-height` will be overriden.

## Installation

```sh
bower install --save git@github.dev.xero.com:UXE/xui-textarea.git
```

## Example
These examples show the two main ways of using this component, with a minimum & maximum number of rows, and with a set number of rows.

```jsx
import XUIInput from 'xui-textarea';

<XUITextArea
	minRows={2}
	maxRows={5}
	maxCharacters={2000}>
	<label className="xui-text-label xui-fieldlabel-layout">This textarea auto-resizes</label>
</XUITextArea>
<XUITextArea
	rows={3}
	defaultValue="Potatoes">
	<label className="xui-text-label xui-fieldlabel-layout">This textarea has a fixed height</label>
</XUITextArea>
<XUITextArea
	rows={3}
	isDisabled={true}
	defaultValue="This textarea has no label and is disabled">
</XUITextArea>
```

## xui-textarea prop types

### XUITextArea
`qaHook`: (Optional, Default='xui-textarea') 

`rows`: (Optional, Default=3) 

`defaultLayout`: (Optional, Default=true) 


## Testing

### Running the Unit Tests
`$ npm run test`
This simply runs the Unit Tests found in the `__tests__` directory. Reports the results in the command line using the spec reporter.

### Running the UI Tests
`$ npm run test-ui`
This script generates a html page at `test/ui/index.html` so you can view the component as well as running the unit tests.

### Generating a code coverage report
`$ npm run test-coverage`
Generates a coverage report in `build/coverage/PhantomJS/index.html`.


**This README has been automatically generated. Please mark any changes in the docs folder.**

