# xui-textarea
![](https://img.shields.io/badge/XUI-^10.17.1-blue.svg)
![](https://img.shields.io/badge/React-^15.5.4-blue.svg)

A React text area which provides basic XUI styling, autosizing (within a min/max number of rows), and a counter which shows characters remaining (if maximum number of characters is set).

## Auto-resize

This component provides an auto-resizing capability. This behaviour is enabled whenever `minRows` and/or `maxRows` is set to a value other than 0. To disable this behaviour, either exclude these props or set them to 0.

If `minRows` or `maxRows` is not set, the css property for `min-height` or `max-height` will be used in their place. Otherwise `min-height` and `max-height` will be overriden.


## Example
These examples show the two main ways of using this component, with a minimum & maximum number of rows, and with a set number of rows.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import XUIInput from '@xero/xui/react/textarea';

(function() {
	ReactDOM.render(
		<div>
			<XUITextArea
				minRows={2}
				maxRows={5}
				maxCharacters={2000}
			>
				<label className="xui-text-label xui-fieldlabel-layout">This textarea auto-resizes</label>
			</XUITextArea>
			<XUITextArea
				rows={3}
				defaultValue="Potatoes"
			>
				<label className="xui-text-label xui-fieldlabel-layout">This textarea has a fixed height</label>
			</XUITextArea>
			<XUITextArea
				rows={3}
				isDisabled
				defaultValue="This textarea has no label and is disabled"
			/>
		</div>,
		document.getElementById('app')
	);
})();

```

## xui-textarea prop types

### XUITextArea
`qaHook`: (Optional, Default='xui-textarea')

`rows`: (Optional, Default=3)

`minRows`: (Optional, Number)

`maxRows`: (Optional, Number)

`maxCharacters`: (Optiona, Number)

`isDisabled`: (Optional, Boolean, Default=false)

`defaultLayout`: (Optional, Default=true)
