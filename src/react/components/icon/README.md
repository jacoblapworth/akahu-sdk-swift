xui-icon
==========
![](https://img.shields.io/badge/XUI-^10.0.0-blue.svg)
![](https://img.shields.io/badge/React-^15.5.4-blue.svg)

A React UI component that creates icons from the [XUI UI library](https://github.dev.xero.com/pages/UXE/xui/#10.24.1/section-icons.html).

### Example
```js
import menu from '@xero/xui-icon/icons/menu';
import XUIIcon from '@xero/xui/react/icon';

(function() {
	ReactDOM.render(
		<XUIIcon path={ menu } />,
		document.getElementById('app')
	);
})();
```

## Prop Types
`path`: (string, required) The path to use in the SVG

`className`: (string, optional) Additional classes to be applied to the icon

`size`: (string, optional, default='standard') Adds a size modifier to the icon

`title`: (string, optional) Title to be read by screen readers

`desc`: (string, optional) Description to be read by screen readers

`role`: (string, optional, default='presentation') Role to be applied to the SVG for screen readers

`rotation`: (number, optional, default=0) Adds a rotation modifier to the icon. Accepted values are 0 (default), 90, 180, 270

`color`: (string, optional) Adds a color modifier to the icon

`inline`: (boolean, optional, default=false) Whether the inline class modifier should be added

`viewBox`: (string, optional, default='0 0 30 30')
