// Libs
import React, { PureComponent } from 'react';

// Components we need to test with
import XUIModal, { modalSizes } from '../XUIModal';
import XUIModalBody from '../XUIModalBody';
import XUIModalFooter from '../XUIModalFooter';
import XUIModalHeader from '../XUIModalHeader';
import XUIButton from '../../button/XUIButton';
//import XUIButtonCaret from '../../button/XUIButtonCaret';
//import DropDown from '../../dropdown/DropDown';
//import DropDownToggled from '../../dropdown/DropDownToggled';
//import Picklist from '../../picklist/Picklist';
//import Pickitem from '../../picklist/Pickitem';

// Story book things
import { storiesOf } from '@storybook/react';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';

// Readme's for documentation
import MODALBODY from '../modal.body.md';
import HEADERFOOTER from '../modal.headerfooter.md';

const isolatedInstance = storiesOf('Instances', module);
isolatedInstance.addDecorator(withKnobs);
isolatedInstance.addDecorator(withReadme(`
${MODALBODY}

${HEADERFOOTER}
`));

isolatedInstance.add('XUIModal', () => {

	const headerEnabled = boolean('Show Header', true);
	const header = headerEnabled ? (
		<XUIModalHeader>Header</XUIModalHeader>
	) : null;

	const footerEnabled = boolean('Show Footer', true);
	const footer = footerEnabled ? (
		<XUIModalFooter>Footer!</XUIModalFooter>
	) : null;

	return (
		<XUIModal
			isOpen={boolean('Is open', true)}
			size={select('Size', Object.keys(modalSizes))}
			isForm={boolean('Main content is a form', false)}>
			{header}
			<XUIModalBody>
				Plain modal
			</XUIModalBody>
			{footer}
		</XUIModal>
	)
});

const stories = storiesOf('Usages of/XUIModal', module);
stories.addDecorator(withKnobs);

// const isSelected = (item, selectedIds) => item.props.id === selectedIds || (!!selectedIds && selectedIds[item.props.id]);

// function createItems(items, selectedId) {
// 	if (Array.isArray(items)) {
// 		return items.map(i => createItems(i, selectedId));
// 	}
// 	return React.createElement(Pickitem, {
// 		...items.props,
// 		value: items.props.id,
// 		key: items.props.id,
// 		isSelected: isSelected(items, selectedId),
// 	}, items.text);
// }

// class DropdownInModal extends PureComponent {

// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			selectedId: null
// 		};

// 		this.onSelect = this.onSelect.bind(this);
// 	}

// 	onSelect(value) {
// 		this.setState({
// 			selectedId: value,
// 		});
// 	}

// 	render() {
// 		const {
// 			isHidden
// 		} = this.props;

// 		const toggledItems = [
// 			'Apricot',
// 			'Banana',
// 			'Cherry',
// 			'Dragon Fruit',
// 			'Eggplant',
// 			'Fennel',
// 			'Grapefruit',
// 			'Honeydew',
// 			'Iceberg Lettuce',
// 			'Jackfruit',
// 			'Kiwifruit',
// 			'Lime',
// 			'Mango',
// 			'Nectarine',
// 			'Orange',
// 			'Pineapple',
// 			'Quince',
// 			'Rapberry',
// 			'Starfruit',
// 			'Tomato',
// 			'Uglifruit',
// 			'Valencia Orange',
// 			'Watermelon',
// 			'Xi gua',
// 			'Yellow quash',
// 			'Zucchini'].map((text, id) => {
// 				return { props: { id }, text };
// 			});

// 		const trigger = (
// 			<XUIButton>
// 				{this.state.selectedId ? toggledItems[this.state.selectedId].text : 'Trigger Button'}
// 				<XUIButtonCaret />
// 			</XUIButton>
// 		);
// 		const dropdown = (
// 			<DropDown onSelect={this.onSelect}>
// 				<Picklist>
// 					{createItems(toggledItems, this.state.selectedId)}
// 				</Picklist>
// 			</DropDown>
// 		);

// 		return (
// 			<div className="xui-page-width-standard">
// 				<XUIModal isHidden={isHidden}>
// 					<XUIModalHeader>
// 						<h3>Header</h3>
// 					</XUIModalHeader>
// 					<XUIModalBody>
// 						<DropDownToggled
// 							className="exampleClass"
// 							onOpen={() => console.log('user wants to open the dropdown')}
// 							trigger={trigger}
// 							dropdown={dropdown}
// 						/>
// 					</XUIModalBody>
// 					<XUIModalFooter className="xui-actions xui-actions-layout xui-padding-large">
// 						<XUIButton variant="negative">
// 							Cancel
// 						</XUIButton>
// 					</XUIModalFooter>
// 				</XUIModal>
// 			</div>
// 		)
// 	}
// }

class ModalOnAPage extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};
	}

	toggleModalVisibility = () => {
		this.setState(prevState => ({
			isOpen: !prevState.isOpen
		}));
	}

	render() {
		const {
			isOpen
		} = this.state;

		return (
		<div className="xui-page-width-standard">
			<div className="xui-panel xui-padding xui-margin-vertical">
				<h1 className="xui-heading-large">This is not an empty panel here</h1>
				<p>I might be useful information about something useful</p>
				<XUIButton onClick={this.toggleModalVisibility}>Show Modal</XUIButton>
				<XUIModal
					hideOnOverlayClick
					isOpen={isOpen}
					onClose={this.toggleModalVisibility}>
					<XUIModalHeader>
						I am a modal content
					</XUIModalHeader>
					<XUIModalBody>
						Plain modal
					</XUIModalBody>
					<XUIModalFooter className="xui-actions xui-actions-layout xui-padding-large">
						<XUIButton variant="primary"
							className="xui-actions--primary"
							onClick={this.toggleModalVisibility}
						>
							Do something wild
						</XUIButton>
					</XUIModalFooter>
				</XUIModal>
			</div>
		</div>
		)
	}
}

stories.add('Modal on a page', () => {
	return (
		<ModalOnAPage />
	)
});
