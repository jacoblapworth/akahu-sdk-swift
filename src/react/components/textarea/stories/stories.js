// Libs
import React from 'react';

// Components we need to test with
import XUITextArea from '../XUITextArea';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { variations, storiesWithVariationsKindName } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);

storiesWithKnobs.add('Playground', () => {

	const fixedHeight = boolean('Fixed height', true);
	const fixedRows = fixedHeight ? number('rows', 2) : null;

	const minRows = !fixedHeight ? number('minRows', 2) : null;
	const maxRows = !fixedHeight ? number('maxRows', 5) : null;

	const maxCharacterSwitch = boolean('Has max characters', false);
	const maxCharacters = maxCharacterSwitch ? number('maxCharacters', 240) : null;

	const hasLabel = boolean('has label', false);
	const label = hasLabel ? (
		<label
			htmlFor="textarea-playground"
			className="xui-text-label xui-fieldlabel-layout"
		>
			{text('Label value', 'Playground label')}
		</label>
	) : null;

	return (
		<XUITextArea
			maxCharacters={maxCharacters}
			rows={fixedRows}
			minRows={minRows}
			maxRows={maxRows}
			defaultValue='Default input value'
			readOnly={boolean('read only', false)}
			manualResize={boolean('manual resize', false)}
			isInvalid={boolean('is invalid', false)}
			textareaId="textarea-playground"
			isBorderless={boolean('borderless input', false)}
			hintMessage={text('hint message', 'This is a hint message... Useful!')}
			isDisabled={boolean('is disabled', false)}
			validationMessage={text('validation message', 'This is a validation message')}>
			{label}
		</XUITextArea>
	);

});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		delete variationMinusStoryDetails.storyKind;
		delete variationMinusStoryDetails.storyTitle;

		const label = variation.label ? (
			<label
				htmlFor="textarea-variation"
				className="xui-text-label xui-fieldlabel-layout"
			>
				{variation.label}
			</label>
		) : null;

		return (
			<XUITextArea id="textarea-variation" {...variationMinusStoryDetails}>
				{label}
			</XUITextArea>
		)
	});
});
