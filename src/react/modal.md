### XUI Docs

<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
	<span><a href="../section-modals.html#modals">Modal</a></span>
</div>

```
const  { PureComponent } = require ( 'react' );

class Example extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			normal: false,
			header: false,
			footer: false,
			both: false
		};
	}

	render() {
		return (
			<div className="xui-page-width-standard">
				<p><XUIButton onClick={() => this.setState({ normal: true })}>Plain Modal</XUIButton></p>
				<p><XUIButton onClick={() => this.setState({ header: true })}>Modal with Header</XUIButton></p>
				<p><XUIButton onClick={() => this.setState({ footer: true })}>Modal with Footer</XUIButton></p>
				<p><XUIButton onClick={() => this.setState({ both: true })}>Modal with Both</XUIButton></p>
				<XUIModal isHidden={!this.state.normal} onClose={() => this.setState({ normal: false })}>
					<XUIModalBody>
						Normal modal
					</XUIModalBody>
				</XUIModal>
				<XUIModal isHidden={!this.state.header} onClose={() => this.setState({ header: false })}>
					<XUIModalHeader><h3>Header</h3></XUIModalHeader>
					<XUIModalBody>
						Modal with Header
					</XUIModalBody>
				</XUIModal>
				<XUIModal isHidden={!this.state.footer} onClose={() => this.setState({ footer: false })}>
					<XUIModalBody>
						Normal modal
					</XUIModalBody>
					<XUIModalFooter>Footer</XUIModalFooter>
				</XUIModal>
				<XUIModal isHidden={!this.state.both} onClose={() => this.setState({ both: false })}>
					<XUIModalHeader><h3>Header</h3></XUIModalHeader>
					<XUIModalBody>
						Normal modal
					</XUIModalBody>
					<XUIModalFooter className="xui-actions xui-actions-layout xui-padding-large">
						<XUIButton variant="negative" onClick={() => this.setState({ both: false }) }>
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
