xui-button
==========
![](https://img.shields.io/badge/XUI-^10.0.0-blue.svg)
![](https://img.shields.io/badge/React-^15.5.4-blue.svg)

A React UI component that creates buttons from the [XUI UI library](https://github.dev.xero.com/pages/UXE/xui/#10.18.0/section-buttons.html). This includes single buttons and grouped buttons.

### Example
```js
import React from 'react';
import ReactDOM from 'react-dom';
import XUIButton, { XUIButtonGroup, XUIButtonCaret } from '@xero/xui/react/button';

function handleClick(event) {
	console.log(event.target);
}

(function() {
	ReactDOM.render(
		<div>
			<XUIButton
				isDisabled
				onClick={handleClick}
				variant='create'
				size='full-width'
			>
				Can't Click me
			</XUIButton>

			<XUIButton
				onClick={handleClick}
				variant='create'
				size='full-width'
			>
				Click me
			</XUIButton>
		</div>,
		document.getElementById('app')
	);
})();
```

## xui-button prop types

### XUIButton

### XUIButtonCaret
`className`: (string, Optional)


### XUIButtonGroup
`children`: (node, Optional)

`className`: (string, Optional)


### XUISecondaryButton

### XUISplitButtonGroup
`children`: (node, Optional)

`className`: (string, Optional)

`qaHook`: (string, Optional)

`isDisabled`: (custom, Optional, Default=ButtonDefaultProps.isDisabled)

`variant`: (custom, Optional, Default=ButtonDefaultProps.variant)

### Migrating from bower v2 Buttons

1. The `isSplit` prop (and all associated secondary button props) of the button component has been removed.  There's a new `XUISecondaryButton` component for that.
2. If you want to output a link (aka `<a>` tag), you should no longer use the `type` prop.  Set the `isLink` prop to true instead.
3. The `buttonType` prop has been renamed to `type` (more intuitive) and the default has changed from `submit` to `button`.  Most people were manually setting `button` or just didn't have the button inside of a form, so it was changed.
