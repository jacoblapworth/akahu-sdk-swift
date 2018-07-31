const storiesWithVariationsKindName = 'Instances/XUISwitch';

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Default',
		isDisabled: false
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Checked and reversed',
		isChecked: true,
		isDisabled: false,
		isReversed: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Disabled with Hidden Label',
		isDisabled: true,
		isLabelHidden: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Checked and Disabled',
		isChecked: true,
		isDisabled: true
	},
];

module.exports = {
	storiesWithVariationsKindName,
	variations
}
