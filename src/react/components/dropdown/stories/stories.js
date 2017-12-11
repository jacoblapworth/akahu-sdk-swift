// Libs
import React from 'react';

// Components we need to test with
import DropDownToggled from '../DropDownToggled';
import DropDown from '../DropDown';
import DropDownHeader from '../DropDownHeader';
import DropDownFooter from '../DropDownFooter';
import XUIButton from '../../button/XUIButton';
import XUIButtonCaret from '../../button/XUIButtonCaret';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';
import XUIDatePicker from '../../datepicker/XUIDatePicker';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { storiesWithVariationsKindName, variations, NOOP } from './variations';
import { maxWidthDropdownSizes, /* fixedWidthDropdownSizes */ } from '../private/constants';

function createItems(items) {
	if (Array.isArray(items)) {
		return items.map(i => createItems(i));
	}
	return React.createElement(Pickitem, {
		...items.props,
		value: items.props.id,
		key: items.props.id,
	}, items.text);
}

const toggledItems = ['To Kill a Mockingbird', '1984', 'The Count of Monte Cristo', 'The Lord of the Rings (The Lord of the Rings, #1-3)', 'Twenty Thousand Leagues Under the Sea', 'Aesop\'s Fables', 'The Fall of the House of Usher and Other Tales', 'The Scarlet Pimpernel', 'The Kite Runner', 'The Call of the Wild, White Fang and Other Stories'].map( (text,id) => {
	return { props: { id }, text };
});

const trigger = (
	<XUIButton>Open for goodies<XUIButtonCaret /></XUIButton>
);
const header = (
	<DropDownHeader
		title='Dropdown header'
		onPrimaryButtonClick={NOOP}
		onSecondaryButtonClick={NOOP} />
);
const footer = (
	<DropDownFooter title='Dropdown footer'>This is a dropdown footer.</DropDownFooter>
);
const picklist = (
	<Picklist>{createItems(toggledItems)}</Picklist>
);
const datepicker = (
	<XUIDatePicker onSelectDate={NOOP} isCompact={true} />
);
const plaintext = (
	<p>Some content that appears in a dropdown panel would go here.</p>
);

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => {
	const forceDesktop = boolean('forceDesktop', false);
	const showHeader = boolean('show header?', false);
	const showFooter = boolean('show footer?', false);


	return (
		<DropDownToggled
			trigger={trigger}
			dropdown={
				<DropDown
					size={select('dropdown size', Object.keys(maxWidthDropdownSizes), 'xlarge')}
					restrictFocus={boolean('restrictFocus', false)}
					animateClosed={boolean('animateClosed', false)}
					animateOpen={boolean('animateOpen', false)}
					fixedWidth={boolean('fixedWidth', false)}
					forceDesktop={forceDesktop}
					header={showHeader ? header : undefined}
					footer={showFooter ? footer : undefined}
				>
					{picklist}
				</DropDown>
			}
			closeOnSelect={boolean('closeOnSelect', true)}
			closeOnTab={boolean('closeOnTab', true)}
			matchTriggerWidth={boolean('matchTriggerWidth', false)}
			isHidden={boolean('is dropdown initially hidden', true)}
			restrictToViewPort={boolean('restrictToViewPort', true)}
			forceDesktop={forceDesktop}
			disableScrollLocking={boolean('disableScrollLocking', false)}
			repositionOnScroll={boolean('repositionOnScroll', false)}
		/>
	);
});

function buildDropDown(ddSettings) {
	let children = [];
	if (!ddSettings.children) {
		children = picklist;
	} else if (ddSettings.children === 'datepicker') {
		children = datepicker;
	} else if (ddSettings.children === 'plaintext') {
		children = plaintext;
	}

	if (ddSettings.headerAndFooter) {
		ddSettings.header = header;
		ddSettings.footer = footer;
		delete ddSettings.headerAndFooter;
	}

	return (
		<DropDown {...ddSettings}>{children}</DropDown>
	);
}

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		const ddSettings = variationMinusStoryDetails.ddSettings;
		delete variationMinusStoryDetails.storyKind;
		delete variationMinusStoryDetails.storyTitle;
		delete variationMinusStoryDetails.ddSettings;

		return (
			<DropDownToggled
				{...variationMinusStoryDetails}
				trigger={trigger}
				isHidden={false}
				dropdown={buildDropDown(ddSettings)}
			/>
		);
	});
});
