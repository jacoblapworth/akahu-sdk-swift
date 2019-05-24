const storiesWithVariationsKindName = 'Instances/XUISwitch';

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Default',
		isDisabled: false,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Checked and reversed',
		isChecked: true,
		isDisabled: false,
		isReversed: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Disabled with Hidden Label',
		isDisabled: true,
		isLabelHidden: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Checked and Disabled',
		isChecked: true,
		isDisabled: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is grouped and reversed',
		isGroup: true,
		groupProps: {
			label: 'Group of switches',
			hintMessage: 'This is a hint message',
		},
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is grouped and invalid',
		isGroup: true,
		groupProps: {
			label: 'Group of switches',
			hintMessage: 'hello',
			isInvalid: true,
			validationMessage: 'whoops',
		},
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
}