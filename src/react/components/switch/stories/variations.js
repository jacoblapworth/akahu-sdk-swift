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
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with hint text',
		hintMessage: 'Whether or not to select',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'invalid with message',
		validationMessage: 'This option must be enabled to proceed',
		isInvalid: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is grouped and reversed',
		isGroup: true,
		groupProps: {
			label: 'Group of switches',
			hintMessage: 'This is a hint message',
		}
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
		}
	}
];

module.exports = {
	storiesWithVariationsKindName,
	variations
}
