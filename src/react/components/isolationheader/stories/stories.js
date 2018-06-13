// Libs
import React from 'react';

// Components we need to test with
import XUIIsolationHeader from '../XUIIsolationHeader';
import XUIIsolationHeaderNavigation from '../XUIIsolationHeaderNavigation';
import XUIIsolationHeaderActions from '../XUIIsolationHeaderActions';
import XUIIsolationHeaderTitle from '../XUIIsolationHeaderTitle';
import XUIIsolationHeaderSecondaryTitle from '../XUIIsolationHeaderSecondaryTitle';
import XUIButton from '../../button/XUIButton';
import XUIIcon from '../../icon/XUIIcon';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUITag from '../../tag/XUITag';
import iconData from '@xero/xui-icon/lib/private/iconData';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { variations, storiesWithVariationsKindName } from './variations';

const swappedIconData = {};
Object.keys(iconData).forEach(groupKey => {
	Object.keys(iconData[groupKey]).forEach(iconKey => {
		swappedIconData[iconData[groupKey][iconKey]] = iconKey;
	});
});

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);

/* eslint-disable react/prop-types */
function getComponent({isPositionFixed, title, secondaryTitle, navigationIconPath, actionIconPath, hasTag, hasAvatar, hasActionsPrimaryButton, hasActionsSecondaryButton}) {
	return (
		<div style={{width: '600px'}}>
			<XUIIsolationHeader isPositionFixed={isPositionFixed}>
				<XUIIsolationHeaderNavigation>
					{navigationIconPath && <XUIButton variant="icon-large" aria-label="navigate"><XUIIcon icon={navigationIconPath} isBoxed /></XUIButton>}
					{hasAvatar && <XUIAvatar className="xui-margin-right-small" value="ABC" />}
					{title && <XUIIsolationHeaderTitle>{title}</XUIIsolationHeaderTitle> }
					{secondaryTitle && <XUIIsolationHeaderSecondaryTitle>{secondaryTitle}</XUIIsolationHeaderSecondaryTitle> }
					{hasTag && <XUITag variant="positive">Tag</XUITag>}
				</XUIIsolationHeaderNavigation>
				<XUIIsolationHeaderActions>
					{hasActionsSecondaryButton && <XUIButton size="small" variant="standard">Secondary</XUIButton>}
					{hasActionsPrimaryButton && <XUIButton size="small" className="xui-margin-left-small" variant="primary">Primary</XUIButton>}
					{actionIconPath && <XUIButton variant="icon-large" aria-label="action"><XUIIcon icon={actionIconPath} isBoxed /></XUIButton>}
				</XUIIsolationHeaderActions>
			</XUIIsolationHeader>
		</div>
	);
}
/* eslint-enable react/prop-types */

storiesWithKnobs.add('Playground', () => {
	return getComponent({
		title: text('Title', ''),
		secondaryTitle: text('Secondary title', ''),
		isPositionFixed: boolean('Is position fixed', false),
		navigationIconPath: select('Navigation icon', swappedIconData, iconData.navigation.cross),
		actionIconPath: select('Action icon', swappedIconData, iconData.navigation.overflow),
		hasActionsPrimaryButton: boolean('Has primary action button', false),
		hasActionsSecondaryButton: boolean('Has secondary action button', false),
		hasTag: boolean('Has tag', false),
		hasAvatar: boolean('Has avatar', false)
	});
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		delete variationMinusStoryDetails.storyKind;
		delete variationMinusStoryDetails.storyTitle;

		return getComponent(variationMinusStoryDetails);
	});
});
