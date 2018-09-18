// Libs
import React from 'react';

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

storiesWithKnobs.add('Playground', () => (
	<XUICheckbox
		isLabelHidden={boolean('label hidden', false)}
		isDisabled={boolean('disabled', false)}
		isIndeterminate={boolean('indeterminate', false)}
		isReversed={boolean('reversed', false)}
		value={text('value', '')}
		isInvalid={boolean('invalid', false)}
		validationMessage={text('validationMessage', '')}
		hintMessage={text('hintMessage', '')}
	>{text('label text', 'Test checkbox')}</XUICheckbox>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const { isGroup, groupProps } = variation;
		const labelText = typeof variation.labelText === 'string' ? variation.labelText : "Test radio";

		// Remove story-specific properties
		const checkboxProps = { ...variation, storyKind: undefined, storyTitle: undefined, isGroup: undefined, labelText: undefined };

		if(isGroup){
			return (
				<XUICheckboxGroup {...groupProps}>
					<XUICheckbox isDefaultChecked={true}>
						Kakapo
					</XUICheckbox>
					<XUICheckbox>
						Weka
					</XUICheckbox>
					<XUICheckbox isDisabled={true}>
						Kea
					</XUICheckbox>
					<XUICheckbox>
						Kiwi
					</XUICheckbox>
				</XUICheckboxGroup>
			);
		}

		return (
			<XUICheckbox	{...checkboxProps}>{labelText}</XUICheckbox>
		)
	});
});
