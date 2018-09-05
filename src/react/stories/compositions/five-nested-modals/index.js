// Libs
import React, { Component } from 'react';

// Components we need to test with
import XUIModal, { XUIModalBody, XUIModalHeader } from '../../../modal';
import XUIButton from '../../../button';

import { nonBackstopStoryNames, compositionKind } from '../tests';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

/* eslint-disable react/prop-types, no-console */
class Example extends Component {
	state = { showModal: false };

	render() {
		return (
			<div>
				<XUIButton onClick={() => this.setState({ showModal: true })}>{this.props.textLabel} modal</XUIButton>
				<XUIModal {...this.props.settings} isOpen={this.state.showModal} onClose={() => this.setState({ showModal: false })}>
					<XUIModalHeader>{this.props.textLabel} modal</XUIModalHeader>
					<XUIModalBody className="xui-padding">
						<div className="xui-padding-bottom">
							This is the {this.props.textLabel} layer modal
							{this.props.children}
						</div>
					</XUIModalBody>
				</XUIModal>
			</div>
		);
	}
}
<Example />
/* eslint-enable react/prop-types, no-console */

const test = storiesOf(compositionKind, module);
test.addDecorator(withKnobs);


test.add(nonBackstopStoryNames.fiveNestedModals, () => {
	const body = document.querySelector('body.xui-container');
	if (body && body.style) { body.style.height = "200%"; }
	const isUsingPortal = boolean('isUsingPortal', true);
	return (
		<Example settings={{size: "default", isUsingPortal: isUsingPortal}} textLabel="first">
			<Example settings={{size: "xlarge", isUsingPortal: isUsingPortal}} textLabel="second">
				<Example settings={{size: "large", isUsingPortal: isUsingPortal}} textLabel="third">
					<Example settings={{size: "medium", isUsingPortal: isUsingPortal}} textLabel="fourth">
						<Example settings={{size: "small", isUsingPortal: isUsingPortal}} textLabel="fifth" />
					</Example>
				</Example>
				<div style={{height: "1000px"}}></div>
			</Example>
		</Example>
	);
});
