// Libs
import React, { PureComponent } from 'react';

// Components we need to test with
import XUISwitch from '../XUISwitch';
import XUISwitchGroup from '../XUISwitchGroup';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';
import NOOP from '../../helpers/noop';

import { variations, storiesWithVariationsKindName } from './variations';

class Example extends PureComponent {
	render () {
		return (
			<XUISwitch
				{...this.props}
			/>
		);
	}
}

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (
	<Example
		isDisabled={boolean('isDisabled', false)}
		isLabelHidden={boolean('label hidden', false)}
		isReversed={boolean('reversed', false)}
		isInvalid={boolean('invalid', false)}
		validationMessage={text('validationMessage', '')}
		hintMessage={text('hintMessage', '')}
	>
		{text('label text', 'Sample switch label')}
	</Example>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		const { isGroup, groupProps } = variation;
		variationMinusStoryDetails.storyKind = undefined;
		variationMinusStoryDetails.storyTitle = undefined;
		variationMinusStoryDetails.onChange = NOOP;
		if (isGroup) {
			return (
				<XUISwitchGroup {...groupProps}>
					<XUISwitch onChange={NOOP} isReversed isChecked>One option you might try</XUISwitch>
					<XUISwitch onChange={NOOP} isReversed isDisabled>Another that is not an option</XUISwitch>
					<XUISwitch onChange={NOOP} isReversed>Third option</XUISwitch>
					<XUISwitch onChange={NOOP} isReversed isChecked>Yet another switch option</XUISwitch>
				</XUISwitchGroup>
			);
		}

		return <XUISwitch {...variationMinusStoryDetails}>Sample switch label</XUISwitch>
	});
});
