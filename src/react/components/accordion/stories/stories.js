import React from 'react';
import XUIAccordion from '../XUIAccordion';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';
import { variations, storiesWithVariationsKindName } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);

storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => <XUIAccordion ListItem={() => <p className="xui-panel xui-padding">Hello 👋</p>} />);

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	const { storyTitle, storyKind, ...props } = variation; // eslint-disable-line no-unused-vars
	const Comparison = <XUIAccordion {...props} />;

	storiesWithVariations.add(storyTitle, () => Comparison);
});
