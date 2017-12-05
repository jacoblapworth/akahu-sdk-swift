const storiesWithVariationsKindName = 'Instances/XUISwitch';

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Default',
		checked: false,
		disabled: false
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Checked',
		checked: true,
		disabled: false
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Disabled',
		checked: false,
		disabled: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Checked and Disabled',
		checked: true,
		disabled: true
	}
];

module.exports = {
	storiesWithVariationsKindName,
	variations
}
