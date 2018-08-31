const React = require('react');
const XUIAvatar = require('../../avatar/XUIAvatar').default;
const XUIButton = require('../../button/XUIButton').default;
const XUIContentBlock = require('../../structural/XUIContentBlock').default;
const XUIContentBlockItem = require('../../structural/XUIContentBlockItem').default;

const storyKind = 'Instances/XUIAccordion';
const variations = [
	{
		storyKind,
		storyTitle: 'basic accordion',
		items: [
			{ id: 1, name: 'John Smith' },
			{ id: 2, name: 'Barry Allen' },
			{ id: 3, name: 'Ernest Hemmingway' },
		],
		createItem: ({ id, name }) => ({
			id,
			primaryHeading: name,
		}),
	},
	{
		storyKind,
		storyTitle: 'accordion tab composition',
		items: [
			{ id: 1, name: 'John Smith', projects: '0 projects', minutes: '0:00' },
			{ id: 2, name: 'Barry Allen', projects: '0 projects', minutes: '0:00' },
			{ id: 3, name: 'Ernest Hemmingway', projects: '0 projects', minutes: '0:00' },
		],
		createItem: ({ id, name, projects, minutes }) => ({
			id,
			primaryHeading: name,
			secondaryHeading: projects,
			pinnedValue: <span className="xui-margin-right-small">{minutes}</span>,
			leftContent: <XUIAvatar value={name} className="xui-margin-right" />,
			action: <XUIButton size="small">See more</XUIButton>,
		}),
	},
	{
		storyKind,
		storyTitle: 'with child content',
		items: [
			{
				id: 1,
				name: 'John Smith',
				contacts: [
					{
						contact: 'Peggy Olsen',
						project: 'Heinz',
						minutes: '00:20',
						percentage: '66',
					},
					{
						contact: 'Pete Campbell',
						project: 'American Aviation',
						minutes: '15:30',
						percentage: '75',
					},
				],
			},
			{
				id: 2,
				name: 'Barry Allen',
				contacts: [
					{
						contact: 'Don Draper',
						project: 'Mad men',
						minutes: '1500:00',
						percentage: '100',
					},
				],
			},
			{
				id: 3,
				name: 'Ernest Hemmingway',
				contacts: [],
			},
		],
		createItem: ({ id, name, contacts }) => {
			const totalContacts = contacts.length;
			return {
				id,
				primaryHeading: name,
				secondaryHeading: `${totalContacts} project${totalContacts === 1 ? '' : 's'}`,
				leftContent: <XUIAvatar value={name} className="xui-margin-right" />,
				action: <XUIButton size="small">See more</XUIButton>,
				children: Boolean(totalContacts) && (
					<XUIContentBlock>
						{contacts.map(({ contact, project, minutes, percentage }, key) => (
							<XUIContentBlockItem
								key={key}
								primaryHeading={`${contact} - ${project}`}
								secondaryHeading={`${minutes} chargeable (${percentage}%)`}
								leftContent={<XUIAvatar size="medium" value={contact} variant="business" />}
								pinnedValue={minutes}
								href="#"
							/>
						))}
					</XUIContentBlock>
				),
			};
		},
	},
];

module.exports = {
	storiesWithVariationsKindName: storyKind,
	variations,
};