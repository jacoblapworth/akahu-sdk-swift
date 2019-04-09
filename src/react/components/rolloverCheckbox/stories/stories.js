// Libs
import React from 'react';

// Components we need to test with
import XUIRolloverCheckbox from '../rolloverCheckbox';
import XUIAvatar from '../../avatar/XUIAvatar';
// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { variations, storiesWithVariationsKindName } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => {
	const sizedAvatar = (
		<XUIAvatar
			value="abc"
			size={select('size of the rollover target', ['xlarge', 'large', 'medium', 'small', 'xsmall', '2xsmall'], 'medium')}
		/>
	);
	return (<XUIRolloverCheckbox
		isCheckboxHidden={boolean('checkbox hidden', true)}
		isDisabled={boolean('disabled', false)}
		rolloverComponent={sizedAvatar}
		label="Rollover checkbox"
		checkboxSize={select('size of the checkbox', ['medium', 'small', 'xsmall'], 'medium')}
	/>);
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		variationMinusStoryDetails.storyKind = undefined;
		variationMinusStoryDetails.storyTitle = undefined;
		variationMinusStoryDetails.label = "Rollover checkbox";

		if (variationMinusStoryDetails.altRollover === 'big') {
			delete variationMinusStoryDetails.altRollover;
			variationMinusStoryDetails.rolloverComponent = <div style={{ width: '40px', height: '70px', backgroundColor: 'blue'}} />;
		} else if (variationMinusStoryDetails.altRollover === 'small') {
			delete variationMinusStoryDetails.altRollover;
			variationMinusStoryDetails.rolloverComponent = <XUIAvatar value="abc" size="2xsmall" />;
		} else {
			variationMinusStoryDetails.rolloverComponent = <XUIAvatar value="abc" />;
		}

		return <XUIRolloverCheckbox {...variationMinusStoryDetails} />
	});
});
