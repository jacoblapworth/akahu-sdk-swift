xui-checkbox
============
![](https://img.shields.io/badge/xui-^10.6.0-blue.svg)
![](https://img.shields.io/badge/react-^0.14.0 || ^15.0.0-blue.svg)

React components to render xui styled checkboxes `(xui 10.6.0 and above)` using xui
icons `(xui-icon 4.1.0 and above)`.

### XUICheckbox
* Renders a single checkbox
* Automatically inserts the icon blob into the DOM if not present

### XUICheckboxGroup
* Renders a container for a group of related checkboxes

## Example

The [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
method can be used with the spread operator to shallow merge shared and individual properties for `XUICheckbox` components.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import star from 'xui-icon/icons/star';
import XUICheckbox, {XUICheckboxGroup} from 'xui-checkbox';

const shared = {
	iconMain: star,
	isRequired: true,
	isReversed: true,
	name: 'stars',
	onChange: () => {alert('Hello, world!')}
};

(function() {
	ReactDOM.render(
		<div className="xui-panel xui-margin xui-padding">
			<XUICheckboxGroup>
				<XUICheckbox {...Object.assign({}, shared, {value: 'Celine Dion'})}>
					Celine Dion
				</XUICheckbox>
				<XUICheckbox {...Object.assign({}, shared, {value: 'Freddy Mercury'})}>
					Freddy Mercury
				</XUICheckbox>
				<XUICheckbox {...Object.assign({}, shared, {value: 'Engelbert Humperdinck'})}>
					Engelbert Humperdinck
				</XUICheckbox>
			</XUICheckboxGroup>
		</div>,
		document.getElementById('app')
	);
})();
```

## xui-checkbox prop types

### XUICheckbox
`children`: (node, Optional)

`className`: (string, Optional)

`qaHook`: (string, Optional)

`iconCheckPath`: (string, Optional) - The icon path to use for the checkmark

`iconIndeterminatePath`: (string, Optional) - The icon path to use for the indeterminate mark

`iconMainPath`: (string, Optional) - The icon path to use for the checkbox

`isChecked`: (bool, Optional) - The input is selected

`isDisabled`: (bool, Optional) - The input is disabled

`isIndeterminate`: (bool, Optional) - The input is indeterminate

`isRequired`: (bool, Optional) - The input is required for form submission

`isReversed`: (bool, Optional) - The label and control are displayed in reverse order

`labelClassName`: (string, Optional) - Additional class names on the span (pseudo-label) element

`isLabelHidden`: (bool, Optional, Default=false) - Prevents the label element from being rendered to the page

`name`: (string, Optional) - The name to use as a reference for the value

`onChange`: (func, Optional)  - The function to call when the control changes state

`value`: (string, Optional) - The value to return on form submission

`svgClassName`: (string, Optional) - Additional class names on the svg element

`tabIndex`: (number, Optional) - The tab-index property to place on the checkbox


### XUICheckboxGroup
`children`: (node, Optional)

`className`: (string, Optional)

`qaHook`: (string, Optional)
