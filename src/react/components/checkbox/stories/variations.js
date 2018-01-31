const starIcon = require ('@xero/xui-icon/icons/star').default;

const storiesWithVariationsKindName = 'Instances/XUICheckbox';

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'Default',
		label: 'Just a regular checkbox'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with no label',
		label: 'No Label Example',
		isLabelHidden: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'checked',
		label: 'Checked Example',
		isChecked: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'disabled',
		label: 'Disabled Example',
		isDisabled: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'checked and disabled',
		label: 'Checked and Disabled Example',
		isChecked: true,
		isDisabled: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'indeterminate',
		label: 'Indeterminate Example',
		isIndeterminate: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'indeterminate and disabled',
		label: 'Indeterminate and Disabled Example',
		isIndeterminate: true,
		isDisabled: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'reversed label',
		label: 'Reversed Example',
		isReversed: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with an icon',
		label: 'Icon Example',
		iconMainPath: starIcon
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'grouped',
		label: 'Grouped Example',
		isGroup: true
	}
];

module.exports = {
	storiesWithVariationsKindName,
	variations
}
