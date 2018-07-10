import React from 'react';
import XUIAccordionItem from '../XUIAccordionItem';
import XUIAccordionItemTrigger from '../XUIAccordionItemTrigger';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUIButton from '../../button/XUIButton';
import XUIContentBlock from '../../structural/XUIContentBlock';
import XUIContentBlockItem from '../../structural/XUIContentBlockItem';

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
	},
	{
		storyKind,
		storyTitle: 'more complex accordion',
		data: [
			{ id: 1, primaryHeading: 'John Smith', secondaryHeading: '0 projects', pinnedValue: '0:00' },
			{ id: 2, primaryHeading: 'Barry Allen', secondaryHeading: '0 projects', pinnedValue: '0:00' },
			{ id: 3, primaryHeading: 'Ernest Hemmingway', secondaryHeading: '0 projects', pinnedValue: '0:00' }
		],
		ListItem: props => {
			const { isOpen, item, onClick } = props;

			return (
				<XUIAccordionItem
					isOpen={isOpen}
					trigger={
						<XUIAccordionItemTrigger
							{...item}
							leftContent={<XUIAvatar value={item.primaryHeading} className="xui-margin-right" />}
							isOpen={isOpen}
							onClick={onClick}
							action={<XUIButton size="small">See more</XUIButton>}
						/>
					}
				/>
			)
		},
	},
	{
		storyKind,
		storyTitle: 'accordion with populated accordion item content',
		data: [
			{
				id: 1,
				userName: 'John Smith',
				childItems: [
					{
						contactName: 'Peggy Olsen',
						projectName: 'Heinz',
						minutes: '00:20',
						percentage: '66',
					},
					{
						contactName: 'Pete Campbell',
						projectName: 'American Aviation',
						minutes: '15:30',
						percentage: '75',
					}
				]
			},
			{
				id: 2,
				userName: 'Barry Allen',
				childItems: [
					{
						contactName: 'Don Draper',
						projectName: 'Mad men',
						minutes: '1500:00',
						percentage: '100',
					}
				]
			},
			{
				id: 3,
				userName: 'Ernest Hemmingway',
				childItems: []
			}
		],
		ListItem: props => {
			const { isOpen, item, onClick } = props;

			const content = Boolean(item.childItems.length) && (
				<XUIContentBlock>
					{item.childItems.map(item => (
						<XUIContentBlockItem
							primaryHeading={`${item.contactName} - ${item.projectName}`}
							secondaryHeading={`${item.minutes} chargeable (${item.percentage}%)`}
							leftContent={<XUIAvatar size="medium" value={item.contactName} variant="business" />}
							pinnedValue={item.minutes}
						/>
					))}
				</XUIContentBlock>
			);

			return (
				<XUIAccordionItem
					isOpen={isOpen}
					trigger={
						<XUIAccordionItemTrigger
							primaryHeading={item.userName}
							secondaryHeading={`${item.childItems.length} project${item.childItems.length === 1 ? '' : 's'}`}
							leftContent={<XUIAvatar value={item.userName} className="xui-margin-right" />}
							isOpen={isOpen}
							onClick={onClick}
							action={<XUIButton size="small">See more</XUIButton>}
						/>
					}
				>
					{content}
				</XUIAccordionItem>
			)
		},
	}
];

module.exports = {
	storiesWithVariationsKindName: storyKind,
	variations,
};
