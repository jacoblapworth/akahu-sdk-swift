const storiesWithVariationsKindName = 'Instances/XUIRadio';
const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Unchecked'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Checked',
		isChecked: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Disabled',
		isDisabled: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Checked and Disabled',
		isChecked: true,
		isDisabled: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Reversed',
		isReversed: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Hidden Label',
		isLabelHidden: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Inline Group',
		isSeries: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Radio Group',
		isGroup: true
	}
];

module.exports = {
	storiesWithVariationsKindName,
	variations
}
