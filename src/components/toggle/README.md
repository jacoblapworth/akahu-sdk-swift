# xui-toggle

![](https://img.shields.io/badge/xui-^10.6.0-blue.svg)
![](https://img.shields.io/badge/react-^15.1.0-blue.svg)

React components to render xui styled toggles `(xui 10.6.0 and above)` using `radio` or `checkbox` inputs. Toggles may contain any combination of text, images or [SVG icons](https://github.dev.xero.com/UXE/xui-icon).

### XUIToggleOption
* Renders a single toggle option
* **Requires** an `onChange` function to manage the state of the input

### XUIToggle
* Renders a container for a group of toggle options
* Provides `standard` and `inverted` colors
* Provides `fullwidth` and `icon` layouts


## Installation

```sh
bower install --save git@github.dev.xero.com:UXE/xui-toggle.git
```

## Example

The [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
method can be used with the spread operator to shallow merge shared and individual properties for `XUIToggleOption` components.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import XUIToggle, {XUIToggleOption} from 'xui-toggle';

const shared = {
	name: 'toggle-checkbox',
	onChange: () => {alert('Hello, World!')},
	type: 'checkbox'
};

(function() {
	ReactDOM.render(
		<div>
			<div className="xui-text-panelheading xui-margin-bottom">Checkbox toggle (inverted, fullwidth)</div>
			<div className="xui-panel xui-margin xui-padding xui-text-inverted">
				<XUIToggle color="inverted" layout="fullwidth">
					<XUIToggleOption {...Object.assign({}, shared, {isChecked: true})}>
						Checkbox<br/>Checkbox<br/>Checkbox<br/>
					</XUIToggleOption>
					<XUIToggleOption {...shared}>
						Pajamas
					</XUIToggleOption>
					<XUIToggleOption {...Object.assign({}, shared, {isDisabled: true})}>
						<svg className="xui-icon">
							<use xlinkHref="#xui-icon-desktop" role="presentation"></use>
						</svg>
						Disabled
					</XUIToggleOption>
					<XUIToggleOption {...Object.assign({}, shared, {isChecked: true, isDisabled: true})}>
						<svg className="xui-icon">
							<use xlinkHref="#xui-icon-desktop" role="presentation"></use>
						</svg>
						Checked and disabled
					</XUIToggleOption>
				</XUIToggle>
			</div>
		</div>,
		document.getElementById('app')
	);
})();
```

## xui-toggle prop types

### XUIToggle
`children`: (node, Optional) 

`className`: (string, Optional) 

`qaHook`: (string, Optional) 

`color`: (enum, Optional, Default='standard') - The color of the toggle

`layout`: (enum, Optional) - The layout of the toggle


### XUIToggleOption
`children`: (node, Optional) 

`className`: (string, Optional) 

`qaHook`: (string, Optional) 

`isChecked`: (bool, Optional) - The input is selected

`isDisabled`: (bool, Optional) - The input is disabled

`isRequired`: (bool, Optional) - The input is required for form submission

`name`: (string, Optional) - The name to use as a reference for the value

`onChange`: (func, Required)  - The function to call when the control changes state

`type`: (enum, Optional, Default='radio') - The type of the input

`value`: (string, Optional) - The value to return on form submission


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

