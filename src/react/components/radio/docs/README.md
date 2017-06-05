xui-radio
==========
![](https://img.shields.io/badge/xui-^10.6.0-blue.svg)
![](https://img.shields.io/badge/react-^15.5.4-blue.svg)

React components to render xui styled radios `(xui 10.6.0 and above)` using xui icons `(xui-icon 4.1.0 and above)`.

### XUIRadio
* Renders a single radio
* Automatically inserts the icon blob into the DOM if not present
* **Requires** an `onChange` function to manage the state of the input

### XUIRadioGroup
* Renders a container for a group of related radios

## Example

The [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
method can be used with the spread operator to shallow merge shared and individual properties for `XUIRadio` components.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import XUIRadio, {XUIRadioGroup} from '@xero/xui/react/radio';
import star from '@xero/xui-icon/icons/star';

const shared = {
	iconMainPath: {star},
	isRequired: true,
	isReversed: true,
	name: 'stars',
	onChange: () => {alert('Hello, world!')}
};

(function() {
	ReactDOM.render(
		<div className="xui-panel xui-margin xui-padding">
			<XUIRadioGroup>
				<XUIRadio {...Object.assign({}, shared, {value: 'Celine Dion'})}>
					Celine Dion
				</XUIRadio>
				<XUIRadio {...Object.assign({}, shared, {value: 'Freddy Mercury'})}>
					Freddy Mercury
				</XUIRadio>
				<XUIRadio {...Object.assign({}, shared, {value: 'Engelbert Humperdinck'})}>
					Engelbert Humperdinck
				</XUIRadio>
			</XUIRadioGroup>
		</div>,
		document.getElementById('app')
	);
})();
```

## xui-radio prop types

### XUIRadio
`children`: (node, Optional)

`className`: (string, Optional)

`qaHook`: (string, Optional)

`iconCheckPath`: (string, Optional) - The icon path to use for the checkmark

`iconMainPath`: (string, Optional) - The icon path to use for the radio

`isChecked`: (bool, Optional) - The input is selected

`isDisabled`: (bool, Optional) - The input is disabled

`isRequired`: (bool, Optional) - The input is required for form submission

`isReversed`: (bool, Optional) - The label and control are displayed in reverse order

`labelClassName`: (string, Optional) - Additional class names on the span (pseudo-label) element

`name`: (string, Optional) - The name to use as a reference for the value

`onChange`: (func, Optional)  - The function to call when the control changes state

`value`: (string, Optional) - The value to return on form submission

`svgClassName`: (string, Optional) - Additional class names on the svg element

`tabIndex`: (number, Optional) - The tabindex property to place on the radio input


### XUIRadioGroup
`children`: (node, Optional)

`className`: (string, Optional)

`qaHook`: (string, Optional)
