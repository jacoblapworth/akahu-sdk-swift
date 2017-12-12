// Libs
import React from 'react';

// Components we need to test with
import XUIModal, { XUIModalBody } from '../../modal';
import DropDown, { DropDownToggled } from '../../dropdown';
import Picklist, { Pickitem } from '../../picklist';
import XUIButton, { XUIButtonCaret } from '../../button';

// Story book things
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import readme from './README.md';

const test = storiesOf('Compositions', module);
test.addDecorator(withReadme(readme));

const toggledItems = [
	'Apricot',
	'Banana',
	'Cherry',
	'Dragon Fruit',
	'Eggplant',
	'Fennel',
	'Grapefruit',
	'Honeydew',
	'Iceberg Lettuce',
	'Jackfruit',
	'Kiwifruit',
	'Lime',
	'Mango',
	'Nectarine',
	'Orange',
	'Pineapple',
	'Quince',
	'Rapberry',
	'Starfruit',
	'Tomato',
	'Uglifruit',
	'Valencia Orange',
	'Watermelon',
	'Xi gua',
	'Yellow quash',
	'Zucchini'].map((text, id) => (
		<Pickitem
			key={id}
			id={text}
			isSelected={false}>
			{text}
		</Pickitem>
	)
);

test.add('Dropdown in a modal', () => {

	const trigger = (
		<XUIButton>
			Trigger Button
			<XUIButtonCaret />
		</XUIButton>
	);
	const dropdown = (
		<DropDown>
			<Picklist>
				{toggledItems}
			</Picklist>
		</DropDown>
	);

	return (
		<XUIModal isOpen>
			<XUIModalBody>
				This is some Modal content.
				<DropDownToggled
					trigger={trigger}
					dropdown={dropdown}
				/>
			</XUIModalBody>
		</XUIModal>
	);
});
