// Libs
import React, { Fragment } from 'react';

// Components we need to test with
import XUICompositionSplitHeader from '../XUICompositionSplitHeader';
import XUICompositionSplit from '../XUICompositionSplit';
import XUICompositionDetailHeader from '../XUICompositionDetailHeader';
import XUICompositionDetail from '../XUICompositionDetail';
import XUICompositionDetailSummaryHeader from '../XUICompositionDetailSummaryHeader';
import XUICompositionDetailSummary from '../XUICompositionDetailSummary';
import XUICompositionMasterDetailSummaryHeader from '../XUICompositionMasterDetailSummaryHeader';
import XUICompositionMasterDetailSummary from '../XUICompositionMasterDetailSummary';
import XUICompositionMasterDetailHeader from '../XUICompositionMasterDetailHeader';
import XUICompositionMasterDetail from '../XUICompositionMasterDetail';

import XUIGridAreaMasterPanelDropdown, { XUIGridAreaMasterPanelDropdownEventLabel } from '../XUIGridAreaMasterPanelDropdown';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';

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

const realMaster = (
	<XUIGridAreaMasterPanelDropdown>
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
	</XUIGridAreaMasterPanelDropdown>
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

const realDetail = (
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

const realPrimary = (
	<XUIPanel
		className="xui-u-flex xui-u-flex-column xui-padding"
	>
		<img src="http://i.imgur.com/kg0CFnu.jpg" alt="" style={{maxWidth: '100%'}} />
	</XUIPanel>
);

const realAreas = {
	master: realMaster,
	summary: realSummary,
	detail: realDetail,
	header: realHeader,
	primary: realPrimary,
	secondary: realDetail,
}

const blockAreas = {
	master: (<div style={{background: '#50DCAA', 'minWidth': '250px', height: '100px', width: '100%'}}></div>),
	summary: (<div style={{background: '#FA8200', 'minWidth': '250px', height: '100px', width: '100%'}}></div>),
	detail: (<div style={{background: '#0078C8', height: '100px' }}></div>),
	header: (<div style={{background: '#B446C8', height: '60px'}}></div>),
	primary: (<div style={{background: '#ff6496', height: '100px'}}></div>),
	secondary: (<div style={{background: '#0078C8', height: '100px'}}></div>),
};

const fireEvent = () => {
	window.dispatchEvent(new CustomEvent(XUIGridAreaMasterPanelDropdownEventLabel, {
		bubbles: true,
	}))
}

const storiesWithKnobs = storiesOf('Compositions', module);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Master detail summary', () => {
	const Tag = boolean('Include content header', false, '1') ? XUICompositionMasterDetailSummaryHeader : XUICompositionMasterDetailSummary;
	const settings = {
		isReal: boolean('Show example content', false, '1'),
		isInfinite: boolean('Expand width infinitely', false, '1'),
		retainWidth: select('Retain a width', {
			None: '',
			Medium: 'medium',
			Small: 'small'
		}, '', '1')
	}
	const areas = settings.isReal ? realAreas : blockAreas;

	if (settings.isReal) {
		return (
			<Fragment>
				<button onClick={() => fireEvent()}>Hello</button>
				<Tag
					{...settings}
					{...areas}
				/>
			</Fragment>
		)
	}
	return (
		<div className="xui-margin">
			<Tag
				{...settings}
				{...areas}
			/>
		</div>
	)
});

storiesWithKnobs.add('Master detail', () => {
	const Tag = boolean('Include content header', false, '1') ? XUICompositionMasterDetailHeader : XUICompositionMasterDetail;
	const settings = {
		isReal: boolean('Show example content', false, '1'),
		isInfinite: boolean('Expand width infinitely', false, '1'),
		retainWidth: select('Retain a width', {
			None: '',
			Small: 'small'
		}, '', '1')
	}
	const areas = settings.isReal ? realAreas : blockAreas;

	if (settings.isReal) {
		return (
			<Fragment>
			<button onClick={() => fireEvent()}>Hello</button>
				<Tag
					{...settings}
					{...areas}
				/>
			</Fragment>
		)
	}
	return (
		<div className="xui-margin">
			<Tag
				{...settings}
				{...areas}
			/>
		</div>
	)
});

storiesWithKnobs.add('Detail summary', () => {
	const Tag = boolean('Include content header', false, '1') ? XUICompositionDetailSummaryHeader : XUICompositionDetailSummary;
	const settings = {
		isReal: boolean('Show example content', false, '1'),
		isInfinite: boolean('Expand width infinitely', false, '1'),
		retainWidth: select('Retain a width', {
			None: '',
			Small: 'small'
		}, '', '1')
	}
	const areas = settings.isReal ? realAreas : blockAreas;

	return (
		<div className="xui-margin">
			<Tag
				{...settings}
				{...areas}
			/>
		</div>
	)
});

storiesWithKnobs.add('Detail', () => {
	const Tag = boolean('Include content header', false, '1') ? XUICompositionDetailHeader : XUICompositionDetail;
	const settings = {
		isReal: boolean('Show example content', false, '1'),
		isInfinite: boolean('Expand width infinitely', false, '1'),
	}
	const areas = settings.isReal ? realAreas : blockAreas;

	return (
		<div className="xui-margin">
			<Tag
				{...settings}
				{...areas}
			/>
		</div>
	)
});


storiesWithKnobs.add('Split', () => {
	const Tag = boolean('Include content header', false, '1') ? XUICompositionSplitHeader : XUICompositionSplit;
	const settings = {
		isReal: boolean('Show example content', false, '1'),
		isInfinite: boolean('Expand width infinitely', false, '1'),
		retainWidth: select('Retain a width', {
			None: '',
			Small: 'small'
		}, '', '1')
	}
	const areas = settings.isReal ? realAreas : blockAreas;

	return (
		<div className="xui-margin">
			<Tag
				{...settings}
				{...areas}
			/>
		</div>
	)
});
