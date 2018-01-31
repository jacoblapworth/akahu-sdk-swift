const storiesWithVariationsKindName = 'Instances/XUISwitch';

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Default',
		isChecked: false,
		isDisabled: false
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Checked',
		isChecked: true,
		isDisabled: false
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Disabled',
		isChecked: false,
		isDisabled: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Checked and Disabled',
		isChecked: true,
		isDisabled: true
	}
];

module.exports = {
	storiesWithVariationsKindName,
	variations
}
