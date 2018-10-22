// Libs
import React from 'react';

// Components we need to test with
import XUIComposition2 from '../XUIComposition2';
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
import overflow from '@xero/xui-icon/icons/overflow';

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const overflowButton = <XUIButton className="xui-button-icon-large" variant="icon" aria-label="More options"><XUIIcon icon={overflow}/></XUIButton>;
const avatar = <XUIAvatar value="Tim Redmond" />;
const actionButton = <XUIActions secondaryAction={<XUIButton size="small">Action</XUIButton>}/>;
const positiveTag = <XUITag className="xui-margin-left-small" variant="positive">Paid</XUITag>;
const negativeTag = <XUITag className="xui-margin-left-small" variant="negative">Overdue</XUITag>;

// import { storiesWithVariationsKindName, variations } from './variations';
// import { variantClassNames, sizeClassNames, buttonTypes } from '../private/constants';

const storiesWithKnobs = storiesOf('XUIComposition2', module);
// storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => {

	if (boolean('Show example content', false, '1')) {
		return (
			<XUIComposition2
				className="xui-margin"
				nav={
					<XUIPicklist>
						<XUIPickItem id="1">Navigation item 1</XUIPickItem>
						<XUIPickItem id="2">Navigation item 2</XUIPickItem>
						<XUIPickItem id="3">Navigation item 3</XUIPickItem>
					</XUIPicklist>
				}
				summary={
					<XUIPanel
						className="xui-panel xui-u-flex xui-u-flex-column xui-padding"
						style={{'minWidth': '250px', display: 'flex'}}
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
				}
				main={
					<XUIPanel
						className="xui-panel xui-u-flex xui-u-flex-column xui-padding"
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
					}
			/>
		)
	}
	return (
		<div>
			<button onClick={() => window.localStorage.setItem('open', true)}>Hello</button>
			<XUIComposition2
				className='xui-padding'
				nav={<div style={{background: '#50DCAA', 'minWidth': '250px', height: '100px'}}></div>}
				summary={<div style={{background: '#FA8200', 'minWidth': '250px', height: '100px'}}></div>}
				main={<div style={{background: '#0078C8', height: '100px'}}></div>}
				>
				</XUIComposition2>
		</div>
	)
});

// const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
// storiesWithVariations.addDecorator(centered);

// variations.forEach(variation => {
// 	storiesWithVariations.add(variation.storyTitle, () => {
// 		const variationMinusStoryDetails = { ...variation };
// 		const value = variationMinusStoryDetails.value || buttonContents[variationMinusStoryDetails.contentsKey];
// 		const componentType = variationMinusStoryDetails.componentType;
// 		delete variationMinusStoryDetails.storyKind;
// 		delete variationMinusStoryDetails.storyTitle;
// 		delete variationMinusStoryDetails.componentType;
// 		delete variationMinusStoryDetails.contentsKey;
// 		variationMinusStoryDetails.value = undefined;

// 		if (componentType === 'XUIButtonGroup') {
// 			return <XUIButtonGroup {...variationMinusStoryDetails}>{value}</XUIButtonGroup>;
// 		} else if (componentType === 'XUISplitButtonGroup') {
// 			return <ButtonWrapper><XUISplitButtonGroup {...variationMinusStoryDetails}>{value}</XUISplitButtonGroup></ButtonWrapper>;
// 		} else {
// 			return <XUIButton {...variationMinusStoryDetails}>{value}</XUIButton>;
// 		}
// 	});
// });
