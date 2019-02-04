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

// Custom Components
import CustomContentBlock from './content-block';
import CustomHeader from './header';
import CustomSummary from './summary';
import CustomForm from './form';
import XUIButton from '../../button/XUIButton';

const fireEvent = () => {
	window.dispatchEvent(new CustomEvent(XUIGridAreaMasterPanelDropdownEventLabel, {
		bubbles: true,
	}))
}

const realHeader = <CustomHeader />;

const realMaster = (
	<XUIGridAreaMasterPanelDropdown>
		<XUIPicklist>
			{[1,2,3,4].map(item => (
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

const realSummary = <CustomSummary />;
const realDetail = (showMediumDownButton) => <CustomContentBlock showMediumDownButton={showMediumDownButton}/>;

const realPrimary = (
	<XUIPanel
		className="xui-u-flex xui-u-flex-align-center xui-u-flex-justify-center xui-padding-5xlarge"
	>
		<XUIButton>Upload an image</XUIButton>
	</XUIPanel>
);

const realAreas = {
	master: realMaster,
	summary: realSummary,
	detail: realDetail(),
	header: realHeader,
	primary: realPrimary,
	secondary: realDetail,
}

const blockAreas = {
	master: (<div style={{background: '#50DCAA', height: '100px', width: '250px'}}></div>),
	summary: (<div style={{background: '#FA8200', height: '100px', width: '100%'}}></div>),
	detail: (<div style={{background: '#0078C8', height: '100px' }}></div>),
	header: (<div style={{background: '#B446C8', height: '60px'}}></div>),
	primary: (<div style={{background: '#ff6496', height: '100px'}}></div>),
	secondary: (<div style={{background: '#0078C8', height: '100px'}}></div>),
};

const storiesWithKnobs = storiesOf('Compositions', module);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Master detail summary', () => {
	const Tag = boolean('Include content header', false, '1') ? XUICompositionMasterDetailSummaryHeader : XUICompositionMasterDetailSummary;
	const settings = {
		isReal: boolean('Show example content', false, '1'),
		hasGridGap: boolean('Apply a gap between grid areas', true, '1'),
		hasAutoSpaceAround: boolean('Apply context-dependent space between the grid and the viewport', true, '1'),
		hasAutoColumnWidths: boolean('Apply standard widths to columns', true, '1'),
		isInfinite: boolean('Expand width infinitely', false, '1'),
		retainWidth: select('Retain a width', {
			None: '',
			Medium: 'medium',
			Small: 'small'
		}, '', '1')
	}
	const areas = settings.isReal ? realAreas : blockAreas;

	if (settings.isReal) {
		const areas2 = {...areas};
		areas2.detail = realDetail(true);
		return (
			<Fragment>
				<Tag
					{...settings}
					{...areas2}
				/>
			</Fragment>
		)
	}
	return (
		<Tag
			{...settings}
			{...areas}
		/>
	)
});

storiesWithKnobs.add('Master detail', () => {
	const Tag = boolean('Include content header', false, '1') ? XUICompositionMasterDetailHeader : XUICompositionMasterDetail;
	const settings = {
		isReal: boolean('Show example content', false, '1'),
		hasGridGap: boolean('Apply a gap between grid areas', true, '1'),
		hasAutoSpaceAround: boolean('Apply context-dependent space between the grid and the viewport', true, '1'),
		hasAutoColumnWidths: boolean('Apply standard widths to columns', false, '1'),
		isInfinite: boolean('Expand width infinitely', false, '1'),
		retainWidth: select('Retain a width', {
			None: '',
			Small: 'small'
		}, '', '1')
	}
	const areas = settings.isReal ? realAreas : blockAreas;

	if (settings.isReal) {
		const areas2 = {...areas};
		areas2.detail = realDetail(true);
		return (
			<Fragment>
				<Tag
					{...settings}
					{...areas2}
				/>
			</Fragment>
		)
	}
	return (
		<Tag
			{...settings}
			{...areas}
		/>
	)
});

storiesWithKnobs.add('Detail summary', () => {
	const Tag = boolean('Include content header', false, '1') ? XUICompositionDetailSummaryHeader : XUICompositionDetailSummary;
	const settings = {
		isReal: boolean('Show example content', false, '1'),
		hasGridGap: boolean('Apply a gap between grid areas', true, '1'),
		hasAutoSpaceAround: boolean('Apply context-dependent space between the grid and the viewport', true, '1'),
		hasAutoColumnWidths: boolean('Apply standard widths to columns', true, '1'),
		isInfinite: boolean('Expand width infinitely', false, '1'),
		retainWidth: select('Retain a width', {
			None: '',
			Small: 'small'
		}, '', '1')
	}
	const areas = settings.isReal ? realAreas : blockAreas;

	return (
		<Tag
			{...settings}
			{...areas}
		/>
	)
});

storiesWithKnobs.add('Detail', () => {
	const Tag = boolean('Include content header', false, '1') ? XUICompositionDetailHeader : XUICompositionDetail;
	const settings = {
		isReal: boolean('Show example content', false, '1'),
		hasGridGap: boolean('Apply a gap between grid areas', true, '1'),
		hasAutoSpaceAround: boolean('Apply context-dependent space between the grid and the viewport', true, '1'),
		isInfinite: boolean('Expand width infinitely', false, '1'),
	}
	const areas = settings.isReal ? realAreas : blockAreas;

	return (
		<Tag
			{...settings}
			{...areas}
		/>
	)
});


storiesWithKnobs.add('Split', () => {
	const Tag = boolean('Include content header', false, '1') ? XUICompositionSplitHeader : XUICompositionSplit;
	const settings = {
		isReal: boolean('Show example content', false, '1'),
		hasGridGap: boolean('Apply a gap between grid areas', true, '1'),
		hasAutoSpaceAround: boolean('Apply context-dependent space between the grid and the viewport', true, '1'),
		isInfinite: boolean('Expand width infinitely', false, '1'),
		retainWidth: select('Retain a width', {
			None: '',
			Small: 'small'
		}, '', '1'),
	}
	const areas = settings.isReal ? {
		header: realHeader(),
		primary: realPrimary,
		secondary: <CustomForm />
	} : blockAreas;

	return (
		<Tag
			{...settings}
			{...areas}
		/>
	)
});
