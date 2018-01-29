const storiesWithVariationsKindName = 'Instances/XUIPicklist';

// Empty objects in the items array will build items with the default settings.
const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as Selected and Disabled States',
		lists: [{
			items: [
				{ isSelected: true },
				{ isDisabled: true },
				{
					isSelected: true,
					isDisabled: true
				}
			]
		}]
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as Truncating items',
		lists: [{
			items: [
				{
					shouldTruncate: true,
					value: 'The default behaviour of pickitem text is to wrap. To prevent wrapping, apply the following utility class.',
					isSelected: true
				},
				{ shouldTruncate: true },
				{ shouldTruncate: true }
			],
			className: 'xui-column-5-of-12'
		}]
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as Horizontal',
		lists: [{
			items: [
				{},
				{ isSelected: true },
				{}
			],
			isHorizontal: true
		}]
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as Stateful Picklist',
		lists: [{
			items: [
				{},
				{},
				{ isSelected: true },
				{},
			]
		}],
		componentType: 'StatefulPicklist'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as Nested (closed)',
		lists: [{
			items: [
				{},
				{ isSelected: true }
			]
		},
		{
			items: [
				{ isSelected: true },
				{},
				{ isDisabled: true },
			]
		}],
		componentType: 'NestedPicklist'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as Nested (open)',
		isOpen: true,
		lists: [{
			items: [
				{},
				{ isSelected: true }
			]
		},
		{
			items: [
				{ isSelected: true
				},
				{},
				{ isDisabled: true },
			]
		}],
		componentType: 'NestedPicklist'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with wrapping in narrow list',
		isOpen: true,
		componentType: 'StatefulPicklist',
		className: 'xui-dropdown-medium',
		lists: [{
			items: [
				{ isMultiselect: true },
				{ isMultiselect: true },
				{ isMultiselect: true },
				{ isMultiselect: true },
			]
		}],
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with truncation in narrow list',
		isOpen: true,
		componentType: 'StatefulPicklist',
		className: 'xui-dropdown-medium',
		lists: [{
			items: [
				{ shouldTruncate: true, isMultiselect: true },
				{ shouldTruncate: true, isMultiselect: true },
				{ shouldTruncate: true, isMultiselect: true },
				{ shouldTruncate: true, isMultiselect: true },
			]
		}],
	}
];

module.exports = {
	storiesWithVariationsKindName,
	variations
}
