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
import { PureComponent } from 'react';
import XUIModal, { XUIModalHeader, XUIModalBody } from '@xero/xui/react/modal';
import XUIButton from '@xero/xui/react/button';
import XUITextInput, { XUITextInputSideElement } from '@xero/xui/react/textinput';

const exampleURL = 'https://go.xero.com/blahblahblahexamplelinkhere';

class Example extends PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      showModal: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.selectAndCopy = this.selectAndCopy.bind(this);
  }

  showModal() {
    this.setState({ showModal: true });
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  selectAndCopy() {
    this.input && this.input.select();
    document.execCommand('copy');
  }

  render() {
    return (
      <div>
        <XUIButton onClick={this.showModal}>Read-only modal</XUIButton>
        <XUIModal isOpen={this.state.showModal} onClose={this.hideModal} closeButtonLabel="Close">
          <XUIModalHeader qaHook="example-modal--header">Get link</XUIModalHeader>
          <XUIModalBody qaHook="example-modal--body" className="xui-padding">
            <div className="xui-padding-bottom">Anyone with this link can view this invoice.</div>
            <XUITextInput
              fieldClassName="xui-padding-bottom"
              value={exampleURL}
              inputProps={{
                readOnly: true,
                id: 'copyUrlExampleInput'
              }}
              inputRef={i => (this.input = i)}
              label="Invoice link"
              rightElement={
                <XUITextInputSideElement type="button">
                  <XUIButton onClick={this.selectAndCopy} variant="main" size="small">
                    Copy
                  </XUIButton>
                </XUITextInputSideElement>
              }
            />
          </XUIModalBody>
        </XUIModal>
      </div>
    );
  }
}

<Example />;
```

### Confirmation modal

Modals are often used for user confirmation. A footer for adding actions can be added using `XUIModalFooter`. It's also recommended to use the [actions layout](../section-components-controls-button.html#components-controls-button-15) to display buttons as this provides standard padding and responsive behaviour.

```jsx harmony
import { PureComponent } from 'react';
import XUIModal, { XUIModalHeader, XUIModalBody, XUIModalFooter } from '@xero/xui/react/modal';
import XUIButton from '@xero/xui/react/button';

class Example extends PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      showModal: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  toggleModal() {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <XUIButton onClick={this.toggleModal}>Confirmation modal</XUIButton>
        <XUIModal isOpen={this.state.showModal} onClose={this.hideModal} closeButtonLabel="Close">
          <XUIModalHeader qaHook="example-modal--header">Delete John Smith</XUIModalHeader>
          <XUIModalBody qaHook="example-modal--body">This cannot be undone</XUIModalBody>
          <XUIModalFooter
            className="xui-actions xui-actions-layout xui-padding-large"
            qaHook="example-modal--header"
          >
            <XUIButton
              variant="negative"
              className="xui-actions--primary"
              onClick={this.toggleModal}
            >
              Delete
            </XUIButton>
            <XUIButton className="xui-actions--secondary" onClick={this.toggleModal}>
              Cancel
            </XUIButton>
          </XUIModalFooter>
        </XUIModal>
      </div>
    );
  }
}

<Example />;
```

### Modal with user input

Modals can be used as a step for users to fill in required fields before opening a new page.

```jsx harmony
import { PureComponent } from 'react';
import XUITextInput from '@xero/xui/react/textinput';
import XUIModal, { XUIModalHeader, XUIModalBody, XUIModalFooter } from '@xero/xui/react/modal';
import XUIButton from '@xero/xui/react/button';

class Example extends PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      showModal: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  toggleModal() {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <XUIButton onClick={this.toggleModal}>Modal with a form</XUIButton>
        <XUIModal isOpen={this.state.showModal} onClose={this.hideModal} closeButtonLabel="Close">
          <XUIModalHeader>New project</XUIModalHeader>
          <XUIModalBody>
            <XUITextInput placeholder="Give it a title" />
          </XUIModalBody>
          <XUIModalFooter className="xui-actions xui-actions-layout xui-padding-large">
            <XUIButton variant="main" className="xui-actions--primary" onClick={this.toggleModal}>
              Create project
            </XUIButton>
          </XUIModalFooter>
        </XUIModal>
      </div>
    );
  }
}

<Example />;
```

### Headerless Modal

Modals can also be used without a header element to head the page with other content such as splash images.

```jsx harmony
import { PureComponent } from 'react';
import XUIModal, { XUIModalBody, XUIModalFooter } from '@xero/xui/react/modal';
import XUIButton from '@xero/xui/react/button';

class Example extends PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      showModal: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  toggleModal() {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <XUIButton onClick={this.toggleModal}>Modal without a header</XUIButton>
        <XUIModal
          isOpen={this.state.showModal}
          onClose={this.hideModal}
          size="large"
          closeButtonLabel="Close"
        >
          <XUIModalBody>
            <div className="xui-u-flex xui-u-flex-column xui-u-flex-align-center">
              <img
                src="https://edge.xero.com/illustration/scene/scientists-whiteboard-01/scientists-whiteboard-01.svg"
                style={{ maxWidth: '100%', maxHeight: '10em' }}
              />
              <h2>Welcome to Projects</h2>
              <div className="xui-padding-2xlarge">
                <p className="xui-padding-bottom">
                  {' '}
                  At the moment, only you can use Projects for this Xero organisation.
                </p>
                <p>
                  To invite others to use Projects, select them from the user list and click the
                  Projects user check box.
                </p>
              </div>
            </div>
          </XUIModalBody>
          <XUIModalFooter className="xui-u-flex xui-u-flex-justify-center">
            <XUIButton className="xui-margin-right" variant="borderless-main">
              Just for me now
            </XUIButton>
            <XUIButton variant="main" onClick={this.toggleModal}>
              Add Projects users
            </XUIButton>
          </XUIModalFooter>
        </XUIModal>
      </div>
    );
  }
}

<Example />;
```
