import React from 'react';
import XUIAccordion from '../XUIAccordion';
import XUIAccordionItem from '../XUIAccordionItem';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';
import { variations, storiesWithVariationsKindName } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);

storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => <XUIAccordion ListItem={() => <p className="xui-panel xui-padding">Hello 👋</p>} />);

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(fn => <div style={{ maxWidth: '940px', margin: '100px auto'  }}>{fn()}</div>)

variations.forEach(variation => {
	const { storyTitle, storyKind, createItem, ...props } = variation; // eslint-disable-line no-unused-vars
	const Comparison = (
		<XUIAccordion
			{...props}
			createItem={(props => {
				const {children, ...item} = createItem(props);
				return <XUIAccordionItem {...item}>{children}</XUIAccordionItem>;
			})}
		/>
	);

	storiesWithVariations.add(storyTitle, () => Comparison);
});
