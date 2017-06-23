xui-pill
=========
![](https://img.shields.io/badge/XUI-^10.16.0-blue.svg)
![](https://img.shields.io/badge/React-^15.5.4-blue.svg)

Pill styles from XUI are to signify that a selection has been made in context with multiple
other selected items. e.g. a select box allowing multiple selections would render each
selected result in a pill.

## Example
```js
import React from 'react';
import ReactDOM from 'react-dom';
import XUIPill from '@xero/xui/react/pill';

(function() {
	ReactDOM.render(
		<XUIPill
			value="Basic Pill"
			onDeleteClick={(pill) => console.log(`Delete pill with value "${pill.props.value}" was clicked`)}
			onClick={() => console.log(`Pill was clicked`)}
			avatarProps={avatarProps}
			isReadOnly={false}
		/>,
		document.getElementById('app')
	);
})();
```

## Prop Types

### InnerPill
`avatarProps`: (object, Optional) Props for the avatar to be displayed, must adhere to the XUIAvatar
component API described at https://github.dev.xero.com/UXE/xui-avatar. Version 6.0.0+. Not providing
props will omit the avatar entirely.

`href`: (string, Optional) This will make the value an `anchor` element instead of a `span` element
and adds the href as the link.

`onClick`: (func, Optional) Callback to fire when the main pill content is clicked.

`qaHook`: (string, Optional) Adds a data attribute hook for testing. The inner pill has the format `pillButton-${YOUR_STRING_GOES_HERE}`. The delete button has the format `deletePillButton-${YOUR_STRING_GOES_HERE}`. The wrapper pill div has the format `${YOUR_STRING_GOES_HERE}`.

`secondaryText`: (string, Optional) Adds a muted secondary text for the pill, appears before the main value.

`target`: (string, Optional) When an `href` is supplied, adds a target attribute, else is ignored.

`value`: (string, Optional) The text to display inside the pill.


### XUIPill
`avatarProps`: (object, Optional) Props for the avatar to be displayed, must adhere to the XUIAvatar component API described at https://github.dev.xero.com/UXE/xui-avatar. Version 6.0.0+. Not providing props will omit the avatar entirely.

`className`: (string, Optional) Apply classes to the outer Pill `div` element.

`deleteButtonLabel`: (string, Optional, Default='Delete') Specify an alternate label attribute for the delete button, defaults to 'Delete'.

`hasLayout`: (bool, Optional, Default=true) Remove the XUI layout class by specifiying false.

`href`: (string, Optional) This will make the value an `anchor` element instead of a `span` element and adds the href as the link.

`isInvalid`: (bool, Optional) When invalid, displays the text in a red colour.

`onClick`: (func, Optional, Default=() => {}) Callback to fire when the main pill content is clicked.

`onDeleteClick`: (func, Optional) Callback to fire when the delete pill button is clicked. When omitted, the delete button is also ommitted from the view.

`qaHook`: (string, Optional) Adds a data attribute hook for testing. The inner pill has the format `pillButton-${YOUR_STRING_GOES_HERE}`. The delete button has the format `deletePillButton-${YOUR_STRING_GOES_HERE}`. The wrapper pill div has the format `${YOUR_STRING_GOES_HERE}`.

`target`: (string, Optional) When an `href` is supplied, adds a target attribute, else is ignored.

`secondaryText`: (string, Optional) Adds a muted secondary text for the pill, appears before the main value.

`value`: (string, Optional) The text to display inside the pill.
