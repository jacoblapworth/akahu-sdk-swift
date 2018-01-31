// Libs
import React from 'react';

// Components we need to test with
import DropDownToggled from '../DropDownToggled';
import DropDown from '../DropDown';
import NestedDropDown from '../NestedDropDown';
import DropDownPanel from '../DropDownPanel';
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
import { LongListLongItems, AddIdPropsToTextList } from '../../helpers/list';
import { maxWidthDropdownSizes} from '../private/constants';

function createItems(items, suffix) {
	if (Array.isArray(items)) {
		return items.map(i => createItems(i));
	}
	items.props.id += suffix ? suffix : '';
	return (
		<Pickitem
			{...items.props}
			value={items.props.id}
			key={items.props.id}
		>
			{items.text}
		</Pickitem>
	);
}

const toggledItems = AddIdPropsToTextList(LongListLongItems);

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

const datePickerDate = new Date('Dec 02 2017 00:00:00 GMT+1300');
const datepicker = (
	<XUIDatePicker onSelectDate={NOOP} isCompact={true} displayedMonth={datePickerDate}/>
);
const plaintext = (
	<p>Some content that appears in a dropdown panel would go here.</p>
);
const nested = (
	<NestedDropDown currentPanel="customDate" isHidden={false}>
		<DropDownPanel panelId="samplePicklist">
			{picklist}
		</DropDownPanel>
		<DropDownPanel panelId="customDate"
					header={(
						<DropDownHeader
							title="Example Title"
							onBackButtonClick={NOOP}
							secondaryButtonContent="Cancel"
							onSecondaryButtonClick={NOOP}
						/>
					)}>
			{datepicker}
		</DropDownPanel>
	</NestedDropDown>
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
	} else if (ddSettings.children === 'nested') {
		// Nested DropDowns do not get wrapped in a DropDown component.
		return nested;
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
		const { ddSettings } = variationMinusStoryDetails;
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
