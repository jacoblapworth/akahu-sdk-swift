xui-modal
==========
![](https://img.shields.io/badge/XUI-%5E10.0.0-blue.svg)
![](https://img.shields.io/badge/React-^15.5.4-blue.svg)

A React UI component that creates modals from the [XUI UI library](https://github.dev.xero.com/pages/UXE/xui/#10.24.1/section-modals.html)

The HTML that this provides is a modal inside an overlay. There is currently no way to get a
modal without this overlay. All children that live inside the modal (i.e `XUIModalHeader`,
`XUIModalBody`, `XUIModalFooter`) need to also be imported.

## Example
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import XUIModal, { XUIModalHeader, XUIModalBody, XUIModalFooter } from '@xero/xui/react/modal';

(function() {
	ReactDOM.render(
		<XUIModal size='small' onClose={() => console.log('close!'); }>
			<XUIModalHeader>
				<h3 className="xui-text-panelheading" id="modal-header">
					This test modal has text just long enough to wrap at certain sizes
				</h3>
			</XUIModalHeader>
			<XUIModalBody>
				<p id="modal-body">Content!</p>
			</XUIModalBody>
			<XUIModalFooter className="xui-actions xui-actions-layout">
				<button className="xui-button xui-button-standard xui-actions--secondary">
					Cancel
				</button>
				<button
					className="xui-button xui-button-main xui-actions--primary"
					id="main-modal-button"
				>
					Accept
				</button>
			</XUIModalFooter>
		</XUIModal>,
		document.getElementById('app')
	);
})();
```

## Prop Types

### XUIModal
`hideOnEsc`: (bool, Optional, Default=true) If the modal will be hidden when the user presses the Esc key

`hideOnOverlayClick`: (bool, Optional, Default=false) If the modal will be hidden when the user clicks the overlay

`onClose`: (func, Optional) Bind a function to fire when the modal requests to be hidden

`size`: (enum, Optional, Default='medium') The size of this modal. `small`, `medium`, `large`, or `fullscreen` Defaults to `medium`

`isHidden`: (bool, Optional, Default=true) Whether the modal is hidden

`isForm`: (bool, Optional, Default=false) Whether the modal wrapping element should be a `<form>` rather than a `<div>`. Allows the enter key to activate the submit button inside native form controls.

`keyListenerTarget`: (object, Optional, Default=window) The target that should listen to key presses. Defaults to the window

`maskClassName`: (string, Optional)  Optional custom classes for the mask

`closeClassName`: (string, Optional)  Optional custom classes for the close button

`restrictFocus`: (bool, Optional, Default=true) Restricts focus to elements within the modal while it is open

`ariaLabelledBy`: (string, Optional) ID for the element containing an appropriate label for screen readers

`ariaDescribedBy`: (string, Optional) ID for the element containing an appropriate description for screen readers

`isUsingPortal`: (bool, Optional, Default=true) Renders the modal to the bottom of the current document when true. Otherwise inline.

`children`: (node, Optional)

`defaultLayout`: (bool, Optional, Default=true)

`className`: (string, Optional)

`id`: (string, Optional)

`qaHook`: (Optional, Default='xui-modal')
