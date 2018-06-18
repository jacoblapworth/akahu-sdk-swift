const storiesWithVariationsKindName = 'Instances/XUIToggle';

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Unstyled',
		secondaryProps: {
			"aria-label": "test-label"
		},
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
		secondaryProps: {
			"aria-label": "test-label"
		},
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
		secondaryProps: {
			"aria-label": "test-label"
		},
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
		secondaryProps: {
			"aria-label": "test-label"
		},
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
		secondaryProps: {
			"aria-label": "test-label"
		},
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
		secondaryProps: {
			"aria-label": "test-label"
		},
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
		secondaryProps: {
			"aria-label": "test-label",
			"role": "group"
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
