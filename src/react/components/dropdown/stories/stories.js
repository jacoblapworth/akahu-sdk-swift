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
import XUIIcon from '../../icon/XUIIcon';
import XUITextInput from '../../textInput/XUITextInput';
import info from '@xero/xui-icon/icons/info';
import plusIcon from '@xero/xui-icon/icons/plus';


// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { storiesWithVariationsKindName, variations, NOOP } from './variations';
import { ShortListShortItems, LongListLongItems, AddIdPropsToTextList } from '../../helpers/list';
import { maxWidthDropdownSizes, dropdownPositionOptions } from '../private/constants';

function createItems(items, suffix) {
	if (Array.isArray(items)) {
		return items.map(i => createItems(i, suffix));
	}
	items.props.id += (suffix || '');
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
const toggledShort = AddIdPropsToTextList(ShortListShortItems);

const trigger = (
	<XUIButton>Open for goodies<XUIButtonCaret /></XUIButton>
);
const header = (
	<DropDownHeader
		title="Dropdown header"
		onPrimaryButtonClick={NOOP}
		onSecondaryButtonClick={NOOP}
	/>
);
const footer = (
	<DropDownFooter
		title="Dropdown footer"
		pickItems={[
			<Pickitem id="aa" value="aa" key="aa">
				<XUIIcon
					icon={plusIcon}
					isBoxed
					className="xui-margin-right-xsmall"
				/>
				Item 1
			</Pickitem>,
			<Pickitem id="bb" value="bb" key="bb">
				<XUIIcon
					icon={plusIcon}
					isBoxed
					className="xui-margin-right-xsmall"
				/>
				Item 2
			</Pickitem>,
		]}
	/>
);
const picklist = (
	<Picklist>{createItems(toggledItems)}</Picklist>
);

const datePickerDate = new Date('Dec 02 2017 00:00:00 GMT+1300');
const datepicker = (
	<XUIDatePicker onSelectDate={NOOP} isCompact displayedMonth={datePickerDate} />
);
const plaintext = (
	<p>Some content that appears in a dropdown panel would go here.</p>
);
const nested = (
	<NestedDropDown currentPanel="customDate" isHidden={false}>
		<DropDownPanel panelId="samplePicklist">
			{picklist}
		</DropDownPanel>
		<DropDownPanel
			panelId="customDate"
			header={(
				<DropDownHeader
					title="Example Title"
					onBackButtonClick={NOOP}
					secondaryButtonContent="Cancel"
					onSecondaryButtonClick={NOOP}
				/>
			)}
		>
			{datepicker}
		</DropDownPanel>
	</NestedDropDown>
);

const sideBySide = (
	<div className="xui-panel xui-row-flex xui-padding-large">
		<DropDownToggled
			trigger={trigger}
			className="xui-margin-right-large"
			preferredPosition="bottom-right"
			isHidden={false}
			isLegacyDisplay={false}
			dropdown={
				<DropDown size="large" restrictFocus={false} fixedWidth>
					<Picklist>{createItems(toggledItems, 'one')}</Picklist>
				</DropDown>
			}
		/>
		<DropDownToggled
			trigger={<XUIButton>Open for even more goodies<XUIButtonCaret /></XUIButton>}
			isHidden={false}
			dropdown={
				<DropDown size="large" restrictFocus={false}>
					<Picklist>{createItems(toggledItems, 'two')}</Picklist>
				</DropDown>
			}
		/>
	</div>
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
					size={select('dropdown size', Object.keys(maxWidthDropdownSizes), 'large')}
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
			preferredPosition={select('preferred position', dropdownPositionOptions, 'bottom-left')}
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

const createTriggerInput = props => (
	<XUITextInput
		placeholder="Placeholder text"
		label="Input label"
		isLabelHidden
		{...props}
	/>
);

const createTriggerButton = () => <XUIButton fullWidth="always">A button</XUIButton>;

const createTriggerLink = () =>
	<a href="javascript:void(0);">A link</a> // eslint-disable-line jsx-a11y/anchor-is-valid
;

const createTriggerIcon = () => <XUIButton variant="icon" aria-label="Info"><XUIIcon icon={info} isBoxed /></XUIButton>;

const getPositioningTest = () => {
	const props = {
		preferredPosition: 'bottom-left',
		isHidden: false,
	};
	const ddProps = {
		isHidden: true,
		restrictFocus: false,
		size: 'small',
	};

	return (
		<div style={{
			width: '100%',
			height: '100%',
			position: 'absolute',
			top: 0,
			left: 0,
		}}
		>
			<div style={{
				alignItems: 'flex-start',
				display: 'inline-flex',
				height: '50%',
				justifyContent: 'space-between',
				width: '100%',
			}}
			>
				<DropDownToggled
					trigger={createTriggerInput()}
					dropdown={
						<DropDown {...ddProps}>
							<Picklist>{createItems(toggledShort, 'a')}</Picklist>
						</DropDown>
					}
					{...props}
				/>
				<DropDownToggled
					trigger={createTriggerButton()}
					dropdown={
						<DropDown {...ddProps}>
							<Picklist>{createItems(toggledShort, 'b')}</Picklist>
						</DropDown>
					}
					{...props}
				/>
				<DropDownToggled
					trigger={createTriggerInput()}
					dropdown={
						<DropDown {...ddProps}>
							<Picklist>{createItems(toggledShort, 'c')}</Picklist>
						</DropDown>
					}
					{...props}
				/>
			</div>
			<div style={{
				alignItems: 'flex-end',
				display: 'inline-flex',
				height: '50%',
				justifyContent: 'space-between',
				justifyItems: 'flex-end',
				width: '100%',
			}}
			>
				<DropDownToggled
					trigger={createTriggerButton()}
					dropdown={
						<DropDown {...ddProps}>
							<Picklist>{createItems(toggledShort, 'g')}</Picklist>
						</DropDown>
					}
					{...props}
				/>
				<DropDownToggled
					trigger={createTriggerIcon()}
					dropdown={
						<DropDown {...ddProps}>
							<Picklist>{createItems(toggledShort, 'h')}</Picklist>
						</DropDown>
					}
					isBlock
					{...props}
				/>
				<DropDownToggled
					trigger={createTriggerLink()}
					dropdown={
						<DropDown {...ddProps}>
							<Picklist>{createItems(toggledShort, 'i')}</Picklist>
						</DropDown>
					}
					{...props}
				/>
			</div>
		</div>
	);
};

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		const { ddSettings } = variationMinusStoryDetails;
		delete variationMinusStoryDetails.storyKind;
		delete variationMinusStoryDetails.storyTitle;
		delete variationMinusStoryDetails.ddSettings;

		if (ddSettings.children === 'side-by-side') {
			return sideBySide;
		} else if (ddSettings.children === 'positioning-test') {
			return getPositioningTest();
		}
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
