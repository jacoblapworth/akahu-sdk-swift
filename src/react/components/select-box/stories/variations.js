const storiesWithVariationsKindName = 'Instances/SelectBox';

const customItems = [
	{
		text: 'Kosovo',
		props: {
			id: 1,
			isHighlighted: true
		}
	},
	{
		text: 'Kuwait',
		props: {
			id: 2,
			isDisabled: true,
		}
	},
	{
		text: 'Kyrgyz Republic (Kyrgyzstan)',
		props: {
			id: 3,
			truncatedText: true,
			isSelected: true
		}
	},
	{
		text: 'Laos',
		props: {
			id: 4
		}
	},
	{
		text: 'Latvia',
		props: {
			id: 5,
			isDisabled: true,
			isSelected: true
		}
	},
	{
		text: 'Lebanon',
		props: {
			id: 6,
			isSelected: true
		}
	}
];

const buildCheckboxItems = function() {
	let checkboxItems = [];
	customItems.forEach(item => {
		const newItem = {...item};
		newItem.props = {...item.props};
		newItem.props.showCheckboxes = true;
		newItem.props.id = 'a' + newItem.props.id;
		checkboxItems.push(newItem);
	});
	return checkboxItems;
};

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is default'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with hidden label and button variant',
		labelHidden: true,
		buttonVariant: 'create'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with no default layout',
		defaultLayout: false,
		isOpen: false
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'without matching trigger width',
		matchTriggerWidth: false
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with truncation and no icon',
		buttonContent: 'Choose a classic book',
		isTextTruncated: true,
		containerClasses: 'xui-column-9-of-12'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with option variations',
		buttonContent: 'Countries',
		items: customItems
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with checkboxes and option variations',
		buttonContent: 'Countries',
		items: buildCheckboxItems()
	}
];


module.exports = {
	storiesWithVariationsKindName,
	variations
}
