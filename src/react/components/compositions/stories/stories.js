// Libs
import React, { Fragment } from 'react';

// Components we need to test with
import XUIComposition2 from '../XUIComposition2';
import XUISummaryWithHeader from '../XUIComposition3';
import XUISummaryNoHeader from '../XUIComposition4';
import XUISimpleWithHeader from '../XUIComposition5';
import XUISimpleNoHeader from '../XUIComposition6';
import XUIComposition4WithHeader from '../XUIComposition1';

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
	<XUIPicklist>
		<XUIPickItem id="1">Navigation item 1</XUIPickItem>
		<XUIPickItem id="2">Navigation item 2</XUIPickItem>
		<XUIPickItem id="3">Navigation item 3</XUIPickItem>
	</XUIPicklist>
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

const realAreas = {
	nav: realNav,
	summary: realSummary,
	main: realMain,
	header: realHeader
}

const blockNav = (<div style={{background: '#50DCAA', 'minWidth': '250px', height: '100px'}}></div>);
const blockSummary = (<div style={{background: '#FA8200', 'minWidth': '250px', height: '100px'}}></div>);
const blockMain = (<div style={{background: '#0078C8', height: '100px'}}></div>);
const blockHeader = (<div style={{background: '#B446C8', height: '60px'}}></div>)

const blockAreas = {
	nav: blockNav,
	summary: blockSummary,
	main: blockMain,
	header: blockHeader,
};

const storiesWithKnobs = storiesOf('XUIComposition2', module);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Summary + Nav, no header', () => {

	if (boolean('Show example content', false, '1')) {
		return (
			<XUIComposition2
				className="xui-margin"
				nav={realNav}
				summary={realSummary}
				main={realMain}
			/>
		)
	}
	return (
		<Fragment>
			<button onClick={() => window.localStorage.setItem('open', true)}>Hello</button>
			<XUIComposition2
				className='xui-padding'
				nav={blockNav}
				summary={blockSummary}
				main={blockMain}
			/>
		</Fragment>
	)
});

storiesWithKnobs.add('Summary Composition', () => {
	const isReal = boolean('Show example content', false, '1');
	const areas = isReal ? realAreas : blockAreas;

	const isInfinite = boolean('Expand width infinitely', false, '1');
	const Tag = boolean('Include content header', false, '1') ? XUISummaryWithHeader : XUISummaryNoHeader;
	return (
		<Tag
			className="xui-margin"
			isInfinite={isInfinite}
			{...areas}
		/>
	)
});

storiesWithKnobs.add('Single Composition', () => {
	const isReal = boolean('Show example content', false, '1');
	const areas = isReal ? realAreas : blockAreas;

	const isInfinite = boolean('Expand width infinitely', false, '1');
	const Tag = boolean('Include content header', false, '1') ? XUISimpleWithHeader : XUISimpleNoHeader;
	return (
		<Tag
			className="xui-margin"
			isInfinite={isInfinite}
			{...areas}
		/>
	)
});
