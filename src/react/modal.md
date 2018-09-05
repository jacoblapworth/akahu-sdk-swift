<div class="xui-margin-vertical">
	<a href="../section-compounds-collectinginput-modals.html" isDocLink>Modals in the XUI Documentation</a>
</div>

`XUIModal` provides a container for custom content, along with a background mask. They should primarily be used for prompting user actions, such as confirming a change, providing additional information, or copying some text.

## Examples

### Read-only modal

`XUIModal` should contain a `XUIModalHeader` to display a header, and have a callback to close the modal passed in to `XUIModal` via the `onClose` prop. By default this will enable closing via the `esc` key and by the close button which will be rendered on the right side of the header.

```jsx
const  { PureComponent } = require ( 'react' );
const exampleURL = 'https://go.xero.com/blahblahblahexamplelinkhere';

class Example extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			showModal: false
		};
	}

	render() {
		return (
			<div>
				<XUIButton onClick={() => this.setState({ showModal: true })}>Read-only modal</XUIButton>
				<XUIModal isOpen={this.state.showModal} onClose={() => this.setState({ showModal: false })}>
					<XUIModalHeader qaHook="example-modal--header">Get link</XUIModalHeader>
					<XUIModalBody qaHook="example-modal--body" className="xui-padding">
						<div className="xui-padding-bottom">
							Anyone with this link can view this invoice.
						</div>
						<XUITextInput
							fieldClassName="xui-padding-bottom"
							value={exampleURL}
							inputProps={{
								readOnly: true,
								id: "copyUrlExampleInput"
							}}
							inputRef={i => this.input = i}
							rightElement={
								<XUITextInputSideElement type="button">
									<XUIButton
										onClick={() => {
											this.input.select();
											document.execCommand('copy')
										}}
										variant="primary"
										size="small"
									>
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

<Example />
```

### Confirmation modal

Modals are often used for user confirmation. A footer for adding actions can be added using `XUIModalFooter`. It's also recommended to use the [actions layout](../section-building-blocks-controls-button.html#building-blocks-controls-button-12) to display buttons as this provides standard padding and responsive behaviour.

```
const  { PureComponent } = require ( 'react' );

class Example extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			showModal: false
		};
		this.toggleModal = this.toggleModal.bind(this);
	}

	toggleModal() {
		this.setState(prevState => ({
			showModal: !prevState.showModal
		}));
	}

	render() {
		return (
			<div>
				<XUIButton onClick={this.toggleModal}>Confirmation modal</XUIButton>
				<XUIModal isOpen={this.state.showModal} onClose={() => this.setState({ showModal: false })}>
					<XUIModalHeader qaHook="example-modal--header">Delete John Smith</XUIModalHeader>
					<XUIModalBody qaHook="example-modal--body">
						This cannot be undone
					</XUIModalBody>
					<XUIModalFooter className="xui-actions xui-actions-layout xui-padding-large" qaHook="example-modal--header">
						<XUIButton
							variant="negative"
							className="xui-actions--primary"
							onClick={this.toggleModal}
						>
							Delete
						</XUIButton>
						<XUIButton
							className="xui-actions--secondary"
							onClick={this.toggleModal}
						>
							Cancel
						</XUIButton>
					</XUIModalFooter>
				</XUIModal>
			</div>
		);
	}
}

<Example />
```

### Modal with user input

Modals can be used as a step for users to fill in required fields before opening a new page.

```jsx
const  { PureComponent } = require ( 'react' );

class Example extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			showModal: false
		};
		this.toggleModal = this.toggleModal.bind(this);
	}

	toggleModal() {
		this.setState(prevState => ({
			showModal: !prevState.showModal
		}));
	}

	render() {
		return (
			<div>
				<XUIButton onClick={this.toggleModal}>Modal with a form</XUIButton>
				<XUIModal isOpen={this.state.showModal} onClose={() => this.setState({ showModal: false })}>
					<XUIModalHeader>New project</XUIModalHeader>
					<XUIModalBody>
						<XUITextInput
							placeholder="Give it a title"
						/>
					</XUIModalBody>
					<XUIModalFooter className="xui-actions xui-actions-layout xui-padding-large">
						<XUIButton variant="primary"
							className="xui-actions--primary"
							onClick={this.toggleModal}
						>
							Create project
						</XUIButton>
					</XUIModalFooter>
				</XUIModal>
			</div>
		);
	}
}

<Example />
```

### Headerless Modal

Modals can also be used without a header element to head the page with other content such as splash images.

```
const  { PureComponent } = require ( 'react' );

class Example extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			showModal: false
		};
		this.toggleModal = this.toggleModal.bind(this);
	}

	toggleModal() {
		this.setState(prevState => ({
			showModal: !prevState.showModal
		}));
	}

	render() {
		return (
			<div>
				<XUIButton onClick={this.toggleModal}>Modal without a header</XUIButton>
				<XUIModal isOpen={this.state.showModal} onClose={() => this.setState({ showModal: false })} size="large">
					<XUIModalBody>
						<div className="xui-u-flex xui-u-flex-column xui-u-flex-align-center">
							<img src="https://s3-ap-southeast-2.amazonaws.com/uxe-internal/spaceship_for_react_modal_demo.png" style={{maxWidth:'100%'}}/>
							<h2>Welcome to Projects</h2>
							<div className="xui-padding-2xlarge">
								<p className="xui-padding-bottom"> At the moment, only you can use Projects for this Xero organisation.</p>
								<p>To invite others to use Projects, select them from the user list and click the Projects user check box.</p>
							</div>
						</div>
					</XUIModalBody>
					<XUIModalFooter className="xui-u-flex xui-u-flex-justify-center">
						<XUIButton
							className="xui-margin-right"
							variant="borderless-primary"
						>
							Just for me now
						</XUIButton>
						<XUIButton
							variant="primary"
							onClick={this.toggleModal}
						>
							Add Projects users
						</XUIButton>
					</XUIModalFooter>
				</XUIModal>
			</div>
		);
	}
}

<Example />
```
