const storiesWithVariationsKindName = 'Instances/XUIToggle';

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Unstyled',
		labelText: 'text-label',
		isLabelHidden: true,
		options: [
			{
				name: 'tg2',
				value: 'toggle1'
			},
			{
				name: 'tg2',
				value: 'toggle2'
			},
			{
				name: 'tg2',
				value: 'toggle3'
			}
		]
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Toggle Options',
		labelText: 'text-label',
		labelId: 'testme',
		layout: 'fullwidth',
		options: [
			{
				name: 'tg3',
				value: 'toggle1'
			},
			{
				isChecked: true,
				name: 'tg3',
				value: 'toggle2'
			},
			{
				isDisabled: true,
				name: 'tg3',
				value: 'toggle3'
			}
		]
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Inverted Options',
		labelText: 'text-label',
		isLabelHidden: true,
		layout: 'fullwidth',
		color: 'inverted',
		options: [
			{
				name: 'tg4',
				value: 'toggle1'
			},
			{
				isChecked: true,
				name: 'tg4',
				value: 'toggle2'
			},
			{
				isDisabled: true,
				name: 'tg4',
				value: 'toggle3'
			}
		]
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Checked / Disabled',
		labelText: 'text-label',
		isLabelHidden: true,
		layout: 'fullwidth',
		options: [
			{
				name: 'tg5',
				value: 'toggle1'
			},
			{
				isChecked: true,
				isDisabled: true,
				name: 'tg5',
				value: 'toggle2'
			}
		]
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Inverted Checked / Disabled',
		labelText: 'text-label',
		isLabelHidden: true,
		layout: 'fullwidth',
		color: 'inverted',
		options: [
			{
				name: 'tg6',
				value: 'toggle1'
			},
			{
				isChecked: true,
				isDisabled: true,
				name: 'tg6',
				value: 'toggle2'
			}
		]
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Small Variant',
		labelText: 'text-label',
		isLabelHidden: true,
		layout: 'fullwidth',
		variant: 'small',
		options: [
			{
				name: 'tg7',
				value: 'toggle1'
			},
			{
				name: 'tg7',
				value: 'toggle2'
			},
			{
				isChecked: true,
				name: 'tg7',
				value: 'toggle3'
			}
		]
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Checkboxes',
		labelText: 'text-label',
		isLabelHidden: true,
		secondaryProps: {
			role: 'group'
		},
		layout: 'fullwidth',
		options: [
			{
				name: 'tg8',
				value: 'toggle1',
				type: 'checkbox'
			},
			{
				name: 'tg8',
				value: 'toggle2',
				type: 'checkbox'
			},
			{
				name: 'tg8',
				value: 'toggle3',
				type: 'checkbox'
			}
		]
	}
];

module.exports = {
	storiesWithVariationsKindName,
	variations
}
