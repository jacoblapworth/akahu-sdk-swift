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
					isDisabled: true,
				},
			],
		}],
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as Truncating items',
		lists: [{
			items: [
				{
					shouldTruncate: true,
					value: 'The default behaviour of pickitem text is to wrap. To prevent wrapping, apply the following utility class.',
					isSelected: true,
				},
				{ shouldTruncate: true },
				{ shouldTruncate: true },
			],
			className: 'xui-column-5-of-12',
		}],
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as Horizontal',
		lists: [{
			items: [
				{},
				{ isSelected: true },
				{},
			],
			isHorizontal: true,
		}],
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with Multiselect',
		lists: [{
			items: [
				{
					isSelected: true,
					isMultiselect: true,
				},
				{ isMultiselect: true },
				{
					isDisabled: true,
					isMultiselect: true,
				},
			],
		}],
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
			],
		}],
		componentType: 'StatefulPicklist',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as Nested (closed)',
		lists: [{
			items: [
				{},
				{ isSelected: true },
			],
		},
		{
			items: [
				{
					isSelected: true,
					isMultiselect: true,
				},
				{ isMultiselect: true },
				{
					isDisabled: true,
					isMultiselect: true,
				},
			],
		}],
		componentType: 'NestedPicklist',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as Nested (open)',
		isOpen: true,
		lists: [{
			items: [
				{},
				{ isSelected: true },
			],
		},
		{
			items: [
				{
					isSelected: true,
					isMultiselect: true,
				},
				{ isMultiselect: true },
				{
					isDisabled: true,
					isMultiselect: true,
				},
			],
		}],
		componentType: 'NestedPicklist',
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
			],
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
			],
		}],
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with headings',
		componentType: 'markupOnly',
		markup: '<ul class="xui-picklist xui-picklist-layout" role="tree" aria-labelledby="recent"><li id="recent" class="xui-margin-vertical-xsmall xui-padding-horizontal-large xui-text-minor xui-text-truncated">Recent</li><li class="xui-pickitem" role="treeitem"><button type="button" class="xui-pickitem--body"><span class="xui-pickitem--text xui-text-truncated">302 — Entertainment</span></button></li><li class="xui-pickitem" role="treeitem"><button type="button" class="xui-pickitem--body"><span class="xui-pickitem--text xui-text-truncated">440 — Overseas Travel</span></button></li><li class="xui-pickitem" role="treeitem"><button type="button" class="xui-pickitem--body"><span class="xui-pickitem--text xui-text-truncated">301 — Office Supplies</span></button></li></ul',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with secondary copy',
		componentType: 'markupOnly',
		markup: '<ul class="xui-picklist xui-picklist-layout" role="tree"><li class="xui-pickitem" role="treeitem" tabindex="-1" ><button type="button" class="xui-pickitem--body"><span class="xui-pickitem--text xui-text-truncated"><span>Status</span><span class="xui-text-secondary xui-margin-left-small">Draft, Sent</span></span></button></li><li class="xui-pickitem" role="treeitem" tabindex="-1" ><button type="button" class="xui-pickitem--body"><span class="xui-pickitem--text xui-text-truncated"><span>Date range</span><span class="xui-text-secondary xui-margin-left-small">1 Apr 2016 — 31 Mar 2017</span></span></button></li><li class="xui-pickitem" role="treeitem" tabindex="-1" ><button type="button" class="xui-pickitem--body"><span class="xui-pickitem--text xui-text-truncated"><span>Created by</span><span class="xui-text-secondary xui-margin-left-small">Kirk Holloway +2 others</span></span></button></li></ul>',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with pinned values',
		componentType: 'markupOnly',
		markup: '<ul class="xui-picklist xui-picklist-layout" role="tree"><li class="xui-pickitem" role="treeitem" tabindex="-1" ><button type="button" class="xui-pickitem--body"><span class="xui-pickitem--text xui-u-flex-inherit"><span class="xui-u-flex-1 xui-text-truncated">Draft</span><span class="xui-text-secondary xui-padding-left-small">18</span></span></button></li><li class="xui-pickitem" role="treeitem" tabindex="-1" ><button type="button" class="xui-pickitem--body"><span class="xui-pickitem--text xui-u-flex-inherit"><span class="xui-u-flex-1 xui-text-truncated">Sent</span><span class="xui-text-secondary xui-padding-left-small">3</span></span></button></li><li class="xui-pickitem" role="treeitem" tabindex="-1" ><button type="button" class="xui-pickitem--body"><span class="xui-pickitem--text xui-u-flex-inherit"><span class="xui-u-flex-1 xui-text-truncated">Paid</span><span class="xui-text-secondary xui-padding-left-small">42</span></span></button></li></ul>',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with avatars',
		componentType: 'markupOnly',
		markup: '<ul class="xui-picklist xui-picklist-layout" role="tree"><li class="xui-pickitem" role="treeitem"><button type="button" class="xui-pickitem--body"><abbr class="xui-avatar xui-avatar-small xui-avatar-color-8 xui-margin-right">JM</abbr><span class="xui-pickitem--text xui-text-truncated">James Magness</span></button></li><li class="xui-pickitem" role="treeitem"><button type="button" class="xui-pickitem--body"><abbr class="xui-avatar xui-avatar-small xui-avatar-color-5 xui-margin-right">KH</abbr><span class="xui-pickitem--text xui-text-truncated">Kirk Holloway</span></button></li><li class="xui-pickitem" role="treeitem"><button type="button" class="xui-pickitem--body"><abbr class="xui-avatar xui-avatar-small xui-avatar-color-2 xui-margin-right">FP</abbr><span class="xui-pickitem--text xui-text-truncated">Fay Pickering</span></button></li></ul',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with an icon',
		componentType: 'XUIIcon',
	},
];

module.exports = {
	storiesWithVariationsKindName,
	variations,
};
