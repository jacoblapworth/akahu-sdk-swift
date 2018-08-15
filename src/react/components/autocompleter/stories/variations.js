const NOOP = require('../../helpers/noop');

const storiesWithVariationsKindName = 'Instances/XUIAutocompleter';

const dropdownSizes = ['small', 'medium', 'large', 'xlarge'];

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'looks like an input',
		openDrawer: false,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with placeholders',
		placeholder: 'I am a placeholder',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'shows loading when passed loading prop and dropdown is open',
		openDrawer: true,
		isLoading: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'when open shows drawer',
		openDrawer: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'shows a pill when an item is selected',
		selectedPeople: 0,
	},
	...dropdownSizes.map(dropdownSize => ({
		storyKind: storiesWithVariationsKindName,
		storyTitle: `shows a ${dropdownSize} dropdown`,
		openDrawer: true,
		dropdownSize,
	})),
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is disabled',
		isDisabled: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'no drawer footer',
		openDrawer: true,
		noDrawerFooter: true,
	},
];

module.exports = {
	variations,
	NOOP,
	storiesWithVariationsKindName,
	dropdownSizes,
};
