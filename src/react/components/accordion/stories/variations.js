import React from 'react';

const storyKind = 'Instances/XUIAccordion';
const variations = [
	{
		storyKind,
		storyTitle: 'basic',
		data: [{ id: 1, name: 'John Smith' }],
		ListItem: props => <p className="xui-panel xui-padding">Hello {props.name} 👋</p>,
	}
];

module.exports = {
	storiesWithVariationsKindName: storyKind,
	variations,
};
