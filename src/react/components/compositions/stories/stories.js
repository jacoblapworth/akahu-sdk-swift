// Libs
import React, { Fragment } from 'react';

// Components we need to test with
import XUIBothWithHeader from '../XUIComposition1';
import XUIBothNoHeader from '../XUIComposition2';
import XUISummaryWithHeader from '../XUIComposition3';
import XUISummaryNoHeader from '../XUIComposition4';
import XUISimpleWithHeader from '../XUIComposition5';
import XUISimpleNoHeader from '../XUIComposition6';
import XUISplitWithHeader from '../XUIComposition7';
import XUISplitNoHeader from '../XUIComposition8';
import XUINavWithHeader from '../XUIComposition9';
import XUINavNoHeader from '../XUIComposition10';

import XUIGridAreaNavPanelDropdown, { XUIGridAreaNavPanelDropdownEventLabel } from '../XUIGridAreaNavPanelDropdown';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, number, select } from '@storybook/addon-knobs';

import XUIPanel from '../../structural/XUIPanel';
import XUIPicklist from '../../picklist/Picklist';
import XUIPickItem from '../../picklist/Pickitem';
import XUIAvatar from '../../avatar/XUIAvatar';

import XUIContentBlock from '../../structural/XUIContentBlock';
import XUIContentBlockItem from '../../structural/XUIContentBlockItem';
import XUIActions from '../../structural/XUIActions';
import XUIButton from '../../button/XUIButton';
import XUITag from '../../tag/XUITag';
import XUIIcon from '../../icon/XUIIcon';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';
import XUIPageHeader from '../../structural/XUIPageHeader';
import overflow from '@xero/xui-icon/icons/overflow';

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const overflowButton = <XUIButton className="xui-button-icon-large" variant="icon" aria-label="More options"><XUIIcon icon={overflow}/></XUIButton>;
const avatar = <XUIAvatar value="Tim Redmond" />;
const actionButton = <XUIActions secondaryAction={<XUIButton size="small">Action</XUIButton>}/>;
const positiveTag = <XUITag className="xui-margin-left-small" variant="positive">Paid</XUITag>;
const negativeTag = <XUITag className="xui-margin-left-small" variant="negative">Overdue</XUITag>;

const builtTabs = (
	<Picklist>
		<Pickitem ariaRole='menuitem' id="one">See all</Pickitem>
		<Pickitem ariaRole='menuitem' id="two" isSelected>Edit</Pickitem>
		<Pickitem ariaRole='menuitem' id="three" >Add</Pickitem>
	</Picklist>
);

const realHeader = (
	<XUIPanel
		className="xui-u-flex xui-padding xui-u-fullwidth"
		>
		<XUIPageHeader title="Stuff on this page" tabs={builtTabs}></XUIPageHeader>
	</XUIPanel>
);

const realNav = (
	<XUIGridAreaNavPanelDropdown>
		<XUIPicklist>
			{[1,2,3].map(item => (
				<XUIPickItem
					id={item}
					onClick={() => fireEvent()}
					key={item}
					>
					{`Navigation item ${item}`}
				</XUIPickItem>
			))}
		</XUIPicklist>
	</XUIGridAreaNavPanelDropdown>
);

const realSummary = (
	<XUIPanel
		className="xui-u-flex xui-u-flex-column xui-padding"
		style={{'minWidth': '250px'}}
		>
		<div className="xui-u-flex xui-u-flex-justify-center">
			<XUIAvatar
				value="xero"
				size="large"
				imageUrl="https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/48.jpg"
				className="xui-u-flex-1"
				/>
		</div>
		<div className="xui-u-flex xui-u-flex-justify-center">
			<h2>Keri Henare</h2>
		</div>
	</XUIPanel>
);

const realMain = (
	<XUIPanel
		className="xui-u-flex xui-u-flex-column xui-padding"
		>
		<h3>A list of things</h3>
		<XUIContentBlock className="xui-panel">
			{[1,2,3,4].map(item => (
				<XUIContentBlockItem
					key={item}
					primaryHeading={`Primary ${item}`}
					secondaryHeading={`Secondary ${item}`}
					overflow={overflowButton}
					leftContent={avatar}
					pinnedValue={`${getRandomInt(0, 10)}.${getRandomInt(0, 9)}${getRandomInt(0, 9)}`}
					action={actionButton}
					tag={getRandomInt(0, 1) === 0 ? negativeTag : positiveTag}/>
			))}
		</XUIContentBlock>
	</XUIPanel>
);

const realMedia = (
	<XUIPanel
		className="xui-u-flex xui-u-flex-column xui-padding"
	>
		<img src="http://i.imgur.com/kg0CFnu.jpg" alt="" style={{maxWidth: '100%'}} />
	</XUIPanel>
);

const realAreas = {
	nav: realNav,
	summary: realSummary,
	main: realMain,
	header: realHeader,
	media: realMedia,
}

const blockAreas = {
	nav: (<div style={{background: '#50DCAA', 'minWidth': '250px', height: '100px', width: '100%'}}></div>),
	summary: (<div style={{background: '#FA8200', 'minWidth': '250px', height: '100px', width: '100%'}}></div>),
	main: (<div style={{background: '#0078C8', height: '100px', 'minWidth': '250px', width: '100%'}}></div>),
	header: (<div style={{background: '#B446C8', height: '60px'}}></div>),
	media: (<div style={{background: '#ff6496', height: '100px'}}></div>),
};

const fireEvent = () => {
	window.dispatchEvent(new CustomEvent(XUIGridAreaNavPanelDropdownEventLabel, {
		bubbles: true,
	}))
}

const storiesWithKnobs = storiesOf('XUIComposition2', module);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Summary + Nav', () => {
	const Tag = boolean('Include content header', false, '1') ? XUIBothWithHeader : XUIBothNoHeader;
	const settings = {
		isReal: boolean('Show example content', false, '1'),
		isInfinite: boolean('Expand width infinitely', false, '1'),
	}
	const areas = settings.isReal ? realAreas : blockAreas;

	if (settings.isReal) {
		return (
			<Fragment>
			<button onClick={() => fireEvent()}>Hello</button>
				<Tag
					className="xui-margin"
					{...settings}
					{...areas}
				/>
			</Fragment>
		)
	}
	return (
		<Tag
			className='xui-padding'
			{...settings}
			{...areas}
		/>
	)
});

storiesWithKnobs.add('Nav Composition', () => {
	const Tag = boolean('Include content header', false, '1') ? XUINavWithHeader : XUINavNoHeader;
	const settings = {
		isReal: boolean('Show example content', false, '1'),
		isInfinite: boolean('Expand width infinitely', false, '1'),
	}
	const areas = settings.isReal ? realAreas : blockAreas;

	if (settings.isReal) {
		return (
			<Fragment>
			<button onClick={() => fireEvent()}>Hello</button>
				<Tag
					className="xui-margin"
					{...settings}
					{...areas}
				/>
			</Fragment>
		)
	}
	return (
		<Tag
			className='xui-padding'
			{...settings}
			{...areas}
		/>
	)
});

storiesWithKnobs.add('Summary Composition', () => {
	const Tag = boolean('Include content header', false, '1') ? XUISummaryWithHeader : XUISummaryNoHeader;
	const settings = {
		isReal: boolean('Show example content', false, '1'),
		isInfinite: boolean('Expand width infinitely', false, '1'),
	}
	const areas = settings.isReal ? realAreas : blockAreas;

	return (
		<Tag
			className="xui-margin"
			{...settings}
			{...areas}
		/>
	)
});

storiesWithKnobs.add('Single Composition', () => {
	const Tag = boolean('Include content header', false, '1') ? XUISimpleWithHeader : XUISimpleNoHeader;
	const settings = {
		isReal: boolean('Show example content', false, '1'),
		isInfinite: boolean('Expand width infinitely', false, '1'),
	}
	const areas = settings.isReal ? realAreas : blockAreas;

	return (
		<Tag
			className="xui-margin"
			{...settings}
			{...areas}
		/>
	)
});

storiesWithKnobs.add('Split Composition', () => {
	const Tag = boolean('Include content header', false, '1') ? XUISplitWithHeader : XUISplitNoHeader;
	const settings = {
		isReal: boolean('Show example content', false, '1'),
		isInfinite: boolean('Expand width infinitely', false, '1'),
	}
	const areas = settings.isReal ? realAreas : blockAreas;

	return (
		<Tag
			className="xui-margin"
			{...settings}
			{...areas}
		/>
	)
});
