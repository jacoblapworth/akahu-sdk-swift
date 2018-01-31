// Libs
import React from 'react';

// Components we need to test with
import XUIModal, { XUIModalBody } from '../../modal';
import DropDown, { DropDownToggled } from '../../dropdown';
import Picklist, { Pickitem } from '../../picklist';
import XUIButton, { XUIButtonCaret } from '../../button';
import XUIInput from '../../input';

// Story book things
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import readme from './README.md';

import lists from '../../components/helpers/list';
import { storyNames, compositionKind } from '../tests';

const test = storiesOf(compositionKind, module);
test.addDecorator(withReadme(readme));

const buildDropdownPicklist = (items) => {
	const pickItems = items.map((text, id) => (
		<Pickitem
			key={id}
			id={text}
			isSelected={false}>
			{text}
		</Pickitem>
		)
	);
	return (
		<DropDown>
			<Picklist>
				{pickItems}
			</Picklist>
		</DropDown>
	);
};

const buildTrigger = (text) => {
	return (
		<XUIButton>
			{text}
		<XUIButtonCaret />
	</XUIButton>
	);
};

test.add(storyNames.multiDropDowns, () => {

	return (
		<div>
			<XUIInput className='xui-margin-bottom'/>
			<XUIModal isOpen>
				<XUIModalBody>
					This is some Modal content.
				<XUIInput />
					<DropDownToggled
						trigger={buildTrigger('Short Trigger')}
						dropdown={buildDropdownPicklist(lists.ShortListShortItems)}
						isHidden={false}
					/>
					This is some Modal content.
					<XUIInput />
					<DropDownToggled
						trigger={buildTrigger('Medium Dropdown Trigger')}
						dropdown={buildDropdownPicklist(lists.MedListMedItems)}
					/>
					<XUIInput />
				</XUIModalBody>
			</XUIModal>
			<XUIInput />
		</div>
	);
});
