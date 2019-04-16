import NOOP from'../../helpers/noop';
import { fixedWidthDropdownSizes } from '../../dropdown/private/constants';

const storiesWithVariationsKindName = 'Instances/XUIAutocompleter';


const inputSizes = ['small', 'medium'];

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'SecondarySearch',
		storyType: 'XUIAutocompleterSecondarySearch',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'looks like an input',
		openDrawer: false,
		isInputLabelHidden: false,
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
		selectedPeople: 1,
	},
	...inputSizes.map(inputSize => ({
		inputSize,
		selectedPeople: 1,
		storyKind: storiesWithVariationsKindName,
		storyTitle: `shows a ${inputSize} input`,
	})),
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'shows a small picklist',
		openDrawer: true,
		picklistSize: 'small'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'shows an xsmall picklist',
		openDrawer: true,
		picklistSize: 'xsmall'
	},
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
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with wrapping pills',
		selectedPeople: 6,
		placeholder: 'Placeholder text'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with non-wrapping pills',
		selectedPeople: 6,
		disableWrapPills: true,
		placeholder: 'Placeholder text'
	}
];

Object.keys(fixedWidthDropdownSizes).map(dropdownSize =>
	variations.push({
		storyKind: storiesWithVariationsKindName,
		storyTitle: `shows a ${dropdownSize} dropdown`,
		openDrawer: true,
		dropdownSize,
	})
);

module.exports = {
	variations,
	NOOP,
	storiesWithVariationsKindName,
	fixedWidthDropdownSizes,
};
