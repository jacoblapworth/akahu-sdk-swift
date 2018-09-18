const storiesWithVariationsKindName = 'Instances/XUIRadio';
const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Unchecked'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Checked',
		isDefaultChecked: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Disabled',
		isDisabled: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Checked and Disabled',
		isDefaultChecked: true,
		isDisabled: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Reversed',
		isReversed: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with hint text',
		labelText: 'Radio with a hint',
		hintMessage: 'You must pick at least one to proceed',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'invalid with message',
		labelText: 'Invalid with validation message',
		validationMessage: 'Please select an option to proceed',
		isInvalid: true,
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
		isGroup: true,
		groupProps: {
			labelText: 'Radio Group',
			hintMessage: 'I am a hint',
		}
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Radio Group Invalid',
		isGroup: true,
		groupProps: {
			labelText: 'Radio Group',
			hintMessage: 'hello',
			isInvalid: true,
			validationMessage: 'whoops',
		}
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'has a long label',
		labelText: 'You have no idea how choice our stuffed Tuis were aye. Every time I see those rip-off old man\'s beards it\'s like the sausage sizzle all over again aye, rack off. Anyway, James Cook is just Rhys Darby in disguise, to find the true meaning of life, one must start munting with the Edmonds Cook Book, mate.'
	}
];

module.exports = {
	storiesWithVariationsKindName,
	variations
};
