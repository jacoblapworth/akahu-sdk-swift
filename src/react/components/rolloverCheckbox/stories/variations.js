const storiesWithVariationsKindName = 'Instances/XUIRolloverCheckbox';

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with checkbox hidden',
		isCheckboxHidden: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with checkbox visible',
		isCheckboxHidden: false,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with checkbox visible and checked',
		isCheckboxHidden: false,
		isChecked: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'checkbox visible and disabled',
		isCheckboxHidden: false,
		isDisabled: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'checkbox visible, disabled and checked',
		isCheckboxHidden: false,
		isChecked: true,
		isDisabled: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with larger alternate rollover content',
		isCheckboxHidden: true,
		altRollover: 'big',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with smaller alternate rollover content',
		isCheckboxHidden: true,
		altRollover: 'small',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with small rollover content and xsmall checkbox',
		isCheckboxHidden: true,
		altRollover: 'small',
		checkboxSize: 'xsmall',
	},
];

module.exports = {
	storiesWithVariationsKindName,
	variations,
}
