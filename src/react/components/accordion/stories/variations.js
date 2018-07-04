import React from 'react';
import XUIAccordionItem from '../XUIAccordionItem';
import XUIAccordionItemTrigger from '../XUIAccordionItemTrigger';

const storyKind = 'Instances/XUIAccordion';
const variations = [
	{
		storyKind,
		storyTitle: 'basic accordion',
		data: [
			{ id: 1, name: 'John Smith' },
			{ id: 2, name: 'Barry Allen' },
			{ id: 3, name: 'Ernest Hemmingway' }
		],
		ListItem: props => {
			const trigger = (
				<XUIAccordionItemTrigger
					primaryHeading={props.item.name}
					isOpen={props.isOpen}
					onClick={props.onClick}
				/>
			);

			return (
				<XUIAccordionItem
					isOpen={props.isOpen}
					trigger={trigger}
				/>
			)
		},
	}
];

module.exports = {
	storiesWithVariationsKindName: storyKind,
	variations,
};
