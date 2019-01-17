const storiesWithVariationsKindName = 'Instances/SelectBox';
const listHelpers = require('../../helpers/list');

const buildCustomItems = () => {
	const customItems = listHelpers.AddIdPropsToTextList(listHelpers.ShortListShortItems);

	customItems[0].props.isHighlighted = true;
	customItems[1].props.isDisabled = true;
	customItems[2].props.isSelected = true;
	customItems[4].props.isDisabled = true;
	customItems[4].props.isSelected = true;
	customItems[5].props.isSelected = true;

	return customItems;
};

const buildCheckboxItems = () => {
	const checkboxItems = buildCustomItems();
	return checkboxItems.map(item => {
		item.props.showCheckboxes = true;
		return item;
	});
};

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is default',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with hidden label and button variant',
		isLabelHidden: true,
		buttonVariant: 'create',
		size: 'standard',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is disabled',
		isDisabled: true,
		isOpen: false,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with no default layout',
		defaultLayout: false,
		isOpen: false,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with a hint message',
		isOpen: false,
		hintMessage: 'Please make a selection',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'invalid with an error message',
		isOpen: false,
		isInvalid: true,
		hintMessage: 'Try me',
		validationMessage: 'No good!',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'without matching trigger width',
		matchTriggerWidth: false,
		listItemSize: 'xsmall',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with truncation and no icon',
		buttonContent: 'Choose a classic book',
		isTextTruncated: true,
		containerClasses: 'xui-column-9-of-12',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with option variations',
		buttonContent: 'Books',
		items: buildCustomItems(),
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with checkboxes and option variations',
		buttonContent: 'Books',
		closeAfterSelection: false,
		items: buildCheckboxItems(),
		listItemSize: 'small',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as full-width with standard size',
		fullWidth: 'always',
		size: 'standard',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as full-width with small size',
		fullWidth: 'always',
		size: 'small',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as standard size',
		size: 'standard',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as small size',
		size: 'small',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as xsmall size',
		size: 'xsmall',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as full-width with small size and variant',
		buttonVariant: 'primary',
		fullWidth: 'always',
		size: 'small',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as small size with variant',
		buttonVariant: 'primary',
		size: 'small',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as standard size with xsmall size list items',
		listItemSize: 'xsmall',
		size: 'standard',
	},
];


module.exports = {
	storiesWithVariationsKindName,
	variations,
};
