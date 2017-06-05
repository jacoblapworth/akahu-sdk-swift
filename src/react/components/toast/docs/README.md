xui-toast
=========
![](https://img.shields.io/badge/XUI-^10.0.0-blue.svg)
![](https://img.shields.io/badge/React-^15.5.4-blue.svg)

A Layout only React UI component designed to mimic the XUI Toast behaviour.

For style reference, please refer to [XUI Documentation](https://github.dev.xero.com/pages/UXE/xui/#10.24.1/section-toast.html)

## Implementation

#### Placement
It is recommended that you use the `XUIToastWrapper` for placement. All toasts contained within `XUIToastWrapper` will be held in the bottom-left corner of the screen, and will stack correctly in both their standard and mobile-responsive formats.

#### Limitations

See issue https://github.dev.xero.com/UXE/xui-toast/issues/26 for the outstanding work to provide consistent behaviour when using toasts.

## Example
```js
import React from 'react';
import ReactDOM from 'react-dom';
import XUIToast, { XUIToastAction, XUIToastActions, XUIToastMessage, XUIToastWrapper } from '@xero/xui/react/toast';
import XeroIntl from 'XeroIntl';

const myFunction = () => {
  console.log('close clicked');
};

class MyApp = {
	render () {
		const myActionString = XeroIntl.translate('An Action');
		const myMessageString = XeroIntl.translate('A Message');

		return (
			<XUIToastWrapper
				<XUIToast
					isHidden={false}
					sentiment="positive"
					onCloseClick={myFunction}
				> // You can have one

					<XUIToastMessage> // You can have many
						{myMessageString}
					</XUIToastMessage>

					<XUIToastActions> // You can have one
						<XUIToastAction onClick={onToastClick}>  // You can have many
							{myActionString}
						</XUIToastAction>
					</XUIToastActions>

				</XUIToast>
			</XUIToastWrapper>
		);
	}
}
```

## xui-toast prop types

### XUIToast
`className`: (string, Optional)

`qaHook`: (string, Optional)

`children`: (node, Optional)

`isHidden`: (bool, Optional, Default=false) Hides the component when set to true

`sentiment`: (enum, Optional) The sentiment of the toast (positive or negative)

`onCloseClick`: (func, Optional) When defined, displays the close button

`onMouseOver`: (func, Optional) Handles the event for when the mouse hovers over the toast

`onMouseLeave`: (func, Optional) Handles the event for when the mouse moves out of the toast

`defaultLayout`: (bool, Optional, Default=true) Applies default layout class to the component

`role`: (string, Optional) Applies a role attribute to the toast element. This will override any component-determined value.


### XUIToastAction
`className`: (string, Optional)

`href`: (string, Optional)

`children`: (node, Optional)


### XUIToastActions
`className`: (string, Optional)

`children`: (node, Optional)


### XUIToastMessage
`className`: (string, Optional)

`children`: (node, Optional)


### XUIToastWrapper
`className`: (string, Optional)

`qaHook`: (string, Optional)

`children`: (node, Optional)
