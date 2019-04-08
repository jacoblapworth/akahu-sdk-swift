const storiesWithVariationsKindName = 'Instances/XUIRadio';
const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Unchecked',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Checked',
		isDefaultChecked: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Disabled',
		isDisabled: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Checked and Disabled',
		isDefaultChecked: true,
		isDisabled: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'checked small',
		labelText: 'Checked Small Example',
		isDefaultChecked: true,
		size: 'small',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'checked xsmall',
		labelText: 'Checked XSmall Example',
		isDefaultChecked: true,
		size: 'xsmall',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Reversed',
		isReversed: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Hidden Label',
		isLabelHidden: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Inline Group',
		isSeries: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Radio Group',
		isGroup: true,
		groupProps: {
			label: 'Radio Group',
			hintMessage: 'I am a hint',
		},
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Radio Group Invalid',
		isGroup: true,
		groupProps: {
			label: 'Radio Group',
			hintMessage: 'hello',
			isInvalid: true,
			validationMessage: 'whoops',
		},
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'has a long label',
		labelText: 'You have no idea how choice our stuffed Tuis were aye. Every time I see those rip-off old man\'s beards it\'s like the sausage sizzle all over again aye, rack off. Anyway, James Cook is just Rhys Darby in disguise, to find the true meaning of life, one must start munting with the Edmonds Cook Book, mate.',
	},
];

[false, true].forEach(isInvalid => {
	[false, true].forEach(isLabelHidden => {
		[false, true].forEach(isReversed => {
			const isInvalidTitle = isInvalid ? 'with validation error' : 'with hint text';

			const isLabelHiddenTitle = isLabelHidden ? ' and hidden label' : '';

			const isReversedTitle = isReversed ? ' and reversed': '';

			variations.push({
				storyKind: storiesWithVariationsKindName,
				storyTitle: `${isInvalidTitle}${isLabelHiddenTitle}${isReversedTitle}`,
				isInvalid,
				isLabelHidden,
				isReversed,
				hintMessage: !isInvalid && 'Hint text',
				validationMessage: isInvalid && 'Validation message',
			})
		});
	});
});

module.exports = {
	storiesWithVariationsKindName,
	variations,
};
