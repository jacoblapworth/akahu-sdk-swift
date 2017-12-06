// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components we need to test with
import XUICheckbox from '../XUICheckbox';
import XUICheckboxGroup from '../XUICheckboxGroup';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { variations, storiesWithVariationsKindName } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);

class DetailedCheckbox extends Component {
	render() {
		return (
			<XUICheckbox {...this.props}>
				{this.props.label}
			</XUICheckbox>
		)
	}
}

DetailedCheckbox.propTypes = {
	label: PropTypes.string
}

storiesWithKnobs.add('Playground', () => (
	<DetailedCheckbox
		className={text('className', '')}
		labelClassName={text('className', '')}
		isLabelHidden={boolean('label hidden', false)}
		isChecked={boolean('checked', false)}
		isDisabled={boolean('disabled', false)}
		isIndeterminate={boolean('indeterminate', false)}
		isReversed={boolean('reversed', false)}
		value={text('value', '')}
		label={text('label', 'A Useful Label')}
	/>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		const { isGroup } = variationMinusStoryDetails;
		variationMinusStoryDetails.storyKind = undefined;
		variationMinusStoryDetails.storyTitle = undefined;
		
		if(isGroup){
			return (
				<XUICheckboxGroup>
					<DetailedCheckbox 
						isChecked={true}
						label="Kakapo"
					/>
					<DetailedCheckbox 
						label="Weka"
					/>
					<DetailedCheckbox 
						isDisabled={true}
						label="Kea"
					/>
					<DetailedCheckbox 
						label="Kiwi"
					/>

				</XUICheckboxGroup>
			);
		}

		return <DetailedCheckbox {...variationMinusStoryDetails} />
	});
});
