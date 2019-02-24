// Libs
import React from 'react';

// Components we need to test with
import XUIButton from '../XUIButton';
import XUIButtonCaret from '../XUIButtonCaret';
import XUIButtonGroup from '../XUIButtonGroup';
import XUISplitButton from '../XUISecondaryButton';
import XUISplitButtonGroup from '../XUISplitButtonGroup';
import XUIIcon from '../../icon/XUIIcon';
import DropDown from '../../dropdown/DropDown';
import DropDownToggled from '../../dropdown/DropDownToggled';
import view from '@xero/xui-icon/icons/view';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, number, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { storiesWithVariationsKindName, variations } from './variations';
import { variantClassNames, sizeClassNames, buttonTypes, widthClassNames } from '../private/constants';

const dropdownWithTrigger = (
	<DropDownToggled
		trigger={<XUISplitButton key="split" variant="primary" aria-label="Other actions" />}
		dropdown={<DropDown><p className="xui-padding-small">hello</p></DropDown>}
	/>
);

const buttonContents = {
	withCaret: ['Caret button', <XUIButtonCaret key="caret"/>],
	asGroup: [<XUIButton key="one">One</XUIButton>, <XUIButton key="two">Two</XUIButton>],
	asSplitGroup: [<XUIButton key="main">Main</XUIButton>, <XUISplitButton key="split" aria-label="Other actions" />],
	asSplitGroupMulti: [<XUIButton key="main">This is a bunch of multi line text to make sure the icon displays correctly</XUIButton>, <XUISplitButton key="split" aria-label="Other actions" />],
	asSplitGroupDropdown: [<XUIButton key="main">Main</XUIButton>, dropdownWithTrigger],
	icon: <XUIIcon icon={view} title="Preview" />
};

const ButtonWrapper = ({children}) => {
	return <div style={{ maxWidth: "150px" }}>{children}</div>;
}

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (
	<XUIButton
		className={text('className', '')}
		qaHook={text('qaHook', '')}
		isDisabled={boolean('isDisabled', false)}
		isExternalLink={boolean('isExternalLink', false)}
		isLoading={boolean('isLoading', false)}
		isGrouped={boolean('isGrouped', false)}
		variant={select('variant', Object.keys(variantClassNames), 'standard')}
		size={select('size', Object.keys(sizeClassNames))}
		fullWidth={select('fullWidth', Object.keys(widthClassNames), 'always')}
		isLink={boolean('isLink', false)}
		type={select('type', Object.keys(buttonTypes).map(type => buttonTypes[type]), 'button')}
		href={text('href', '')}
		rel={text('rel', '')}
		tabIndex={number('tabIndex', 0)}
		target={text('target', '')}
		title={text('title', '')}
		isInverted={boolean('isInverted', false)}
		retainLayout={boolean('retainLayout', true)}
		minLoaderWidth={boolean('minLoaderWidth', false)}
	>Test button</XUIButton>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		const value = variationMinusStoryDetails.value || buttonContents[variationMinusStoryDetails.contentsKey];
		const componentType = variationMinusStoryDetails.componentType;
		delete variationMinusStoryDetails.storyKind;
		delete variationMinusStoryDetails.storyTitle;
		delete variationMinusStoryDetails.componentType;
		delete variationMinusStoryDetails.contentsKey;
		variationMinusStoryDetails.value = undefined;

		if (componentType === 'XUIButtonGroup') {
			return <XUIButtonGroup {...variationMinusStoryDetails}>{value}</XUIButtonGroup>;
		} else if (componentType === 'XUISplitButtonGroup') {
			return <ButtonWrapper><XUISplitButtonGroup {...variationMinusStoryDetails}>{value}</XUISplitButtonGroup></ButtonWrapper>;
		} else {
			return <XUIButton {...variationMinusStoryDetails}>{value}</XUIButton>;
		}
	});
});
