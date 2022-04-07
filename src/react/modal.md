<div class="xui-margin-vertical">
	<a href="../section-components-collectinginput-modals.html" isDocLink>Modals in the XUI Documentation</a>
</div>

`XUIModal` provides a container for custom content, along with a background mask. They should primarily be used for prompting user actions, such as confirming a change, providing additional information, or copying some text.

The modal manages its own open/closed state as well as scroll-locking, handling focus, and ARIA attributes for assistive technology. As such, it's best to show and hide the modal using its `isOpen` prop, rather than conditionally generating the component, particularly if you have multiple layers of modals.

A `closeButtonLabel` is required for accessibility purposes.

## Examples

### Read-only modal

`XUIModal` should contain a `XUIModalHeader` to display a header, and have a callback to close the modal passed in to `XUIModal` via the `onClose` prop. By default this will enable closing via the `esc` key and by the close button which will be rendered on the right side of the header.

```jsx harmony
import { useRef, useState } from 'react';
import XUIButton from '@xero/xui/react/button';
import XUIModal, { XUIModalBody, XUIModalHeader } from '@xero/xui/react/modal';
import XUITextInput, { XUITextInputSideElement } from '@xero/xui/react/textinput';

const url = 'https://in.xero.com/Xp44RIzoD8KGPaDicoLYvRsUOCCbc';

const ModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const input = useRef();

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const selectAndCopy = () => {
    input && input.current.select();
    document.execCommand('copy');
  };

  return (
    <div>
      <XUIButton onClick={showModal}>Open invoice link</XUIButton>
      <XUIModal isOpen={isOpen} onClose={hideModal} closeButtonLabel="Close">
        <XUIModalHeader>Copy link</XUIModalHeader>
        <XUIModalBody>
          <div className="xui-padding-bottom">
            Anyone with this link will be able to view the invoice
          </div>
          <XUITextInput
            fieldClassName="xui-padding-bottom"
            inputProps={{
              readOnly: true
            }}
            inputRef={input}
            label="Invoice link"
            rightElement={
              <XUITextInputSideElement type="button">
                <XUIButton onClick={selectAndCopy} size="small" variant="main">
                  Copy
                </XUIButton>
              </XUITextInputSideElement>
            }
            value={url}
          />
        </XUIModalBody>
      </XUIModal>
    </div>
  );
};

<ModalExample />;
```

### Confirmation modal

Modals are often used for user confirmation. A footer for adding actions can be added using `XUIModalFooter`. It's also recommended to use the [actions layout](../section-components-controls-button.html#components-controls-button-15) to display buttons as this provides standard padding and responsive behaviour.

```jsx harmony
import { useState } from 'react';
import XUIActions from '@xero/xui/react/actions';
import XUIButton from '@xero/xui/react/button';
import XUIModal, { XUIModalBody, XUIModalFooter, XUIModalHeader } from '@xero/xui/react/modal';

const ModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <XUIButton onClick={toggleModal}>Delete contact</XUIButton>
      <XUIModal closeButtonLabel="Close" isOpen={isOpen} onClose={hideModal}>
        <XUIModalHeader>Delete contact</XUIModalHeader>
        <XUIModalBody>
          Deleting this contact means you will no longer have access to their data
        </XUIModalBody>
        <XUIModalFooter>
          <XUIActions
            primaryAction={
              <XUIButton onClick={toggleModal} variant="negative">
                Delete forever
              </XUIButton>
            }
          />
        </XUIModalFooter>
      </XUIModal>
    </div>
  );
};

<ModalExample />;
```

### Modal with user input

Modals can be used as a step for users to fill in required fields before opening a new page.

```jsx harmony
import { useState } from 'react';
import XUIActions from '@xero/xui/react/actions';
import XUIButton from '@xero/xui/react/button';
import XUIModal, { XUIModalBody, XUIModalFooter, XUIModalHeader } from '@xero/xui/react/modal';
import XUITextInput from '@xero/xui/react/textinput';

const ModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <XUIButton onClick={toggleModal}>Copy template</XUIButton>
      <XUIModal closeButtonLabel="Close" isOpen={isOpen} onClose={hideModal}>
        <XUIModalHeader>Copy template</XUIModalHeader>
        <XUIModalBody>
          <XUITextInput isFieldLayout label="Name" />
          <XUITextInput isFieldLayout label="Description" />
        </XUIModalBody>
        <XUIModalFooter>
          <XUIActions
            primaryAction={
              <XUIButton onClick={toggleModal} variant="main">
                Copy
              </XUIButton>
            }
            secondaryAction={<XUIButton onClick={hideModal}>Cancel</XUIButton>}
          />
        </XUIModalFooter>
      </XUIModal>
    </div>
  );
};

<ModalExample />;
```
