import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import XUIModal from '../XUIModal';
import XUIModalBody from '../XUIModalBody';
import XUIModalFooter from '../XUIModalFooter';
import XUIModalHeader from '../XUIModalHeader';
import XUIButton from '../../button/XUIButton';

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
					<XUIModalBody qaHook="modal-normalexample--body">
						Normal modal
					</XUIModalBody>
				</XUIModal>
				<XUIModal isHidden={!this.state.header} onClose={() => this.setState({ header: false })}>
					<XUIModalHeader qaHook="modal-headerexample--header"><h3>Header</h3></XUIModalHeader>
					<XUIModalBody qaHook="modal-headerexample--body">
						Modal with Header
					</XUIModalBody>
				</XUIModal>
				<XUIModal isHidden={!this.state.footer} onClose={() => this.setState({ footer: false })}>
					<XUIModalBody qaHook="modal-ooterexample--body">
						Normal modal
					</XUIModalBody>
					<XUIModalFooter qaHook="modal-footerexample--footer">Footer</XUIModalFooter>
				</XUIModal>
				<XUIModal isHidden={!this.state.both} onClose={() => this.setState({ both: false })}>
					<XUIModalHeader qaHook="modal-bothexample--header"><h3>Header</h3></XUIModalHeader>
					<XUIModalBody qaHook="modal-bothexample--body">
						Normal modal
					</XUIModalBody>
					<XUIModalFooter className="xui-actions xui-actions-layout xui-padding-large" qaHook="modal-bothexample--footer">
						<XUIButton variant="negative" onClick={() => this.setState({ both: false }) }>
							Cancel
						</XUIButton>
					</XUIModalFooter>
				</XUIModal>
			</div>
		);
	}
}

ReactDOM.render(
	<Example />,
	document.getElementById('app')
);
