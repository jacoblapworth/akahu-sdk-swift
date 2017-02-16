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
