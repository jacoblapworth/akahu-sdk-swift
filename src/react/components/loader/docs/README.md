xui-loader
==========
![](https://img.shields.io/badge/XUI-%5E9.7.0%20%7C%7C%20%5E10.19.0-blue.svg)
![](https://img.shields.io/badge/React-^15.5.4-blue.svg)

A React UI component that creates a loading animation from the [XUI UI library](https://github.dev.xero.com/pages/UXE/xui/#10.24.1/section-loaders.html).

## Example
```js
import XUILoader from '@xero/xui/react/loader';

(function() {
	ReactDOM.render(
		<XUILoader className='optional-class' label="Loading more data"/>,
		document.getElementById('app')
	);
})();
```

## xui-loader prop types

### XUILoader
`className`: (string, Optional) Add additional classes to the loader wrapping div

`qaHook`: (string, Optional) Adds data-automationid attribute with qaHook contents to the loader wrapping div

`label`: (string, Optional) adds aria-label to the loader wrapping div

`defaultLayout`: (bool, Optional, Default=true) Defaults to `true`. Sets the default layout class on the loader wrapping div

`size`: (enum, Optional, Default='standard') Sets the size of the loader to be, small, standard (no class added), and large
