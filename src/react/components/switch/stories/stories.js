// Libs
import React, { PureComponent } from 'react';

// Components we need to test with
import XUISwitch from '../XUISwitch';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';
import NOOP from '../../helpers/noop';

import { variations, storiesWithVariationsKindName } from './variations';

class Example extends PureComponent {
	state = { isChecked: false }
	render () {
		return (
			<XUISwitch
				isChecked={this.state.isChecked}
				onChange={() => this.setState(prevState => ({ isChecked: !prevState.isChecked }))}
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
	>
		{text('label text', 'Sample switch label')}
	</Example>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		variationMinusStoryDetails.storyKind = undefined;
		variationMinusStoryDetails.storyTitle = undefined;
		variationMinusStoryDetails.onChange = NOOP;

		return <XUISwitch {...variationMinusStoryDetails}>Sample switch label</XUISwitch>
	});
});
