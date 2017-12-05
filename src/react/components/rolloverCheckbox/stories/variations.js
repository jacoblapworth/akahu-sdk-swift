const NOOP = require('../../helpers/noop');

const storiesWithVariationsKindName = 'Instances/RolloverCheckbox';

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
        storyTitle: 'with checkbox hidden',
        isCheckboxHidden: true
    },
    {
		storyKind: storiesWithVariationsKindName,
        storyTitle: 'with checkbox visible',
        isCheckboxHidden: false
    },
    {
		storyKind: storiesWithVariationsKindName,
        storyTitle: 'with checkbox visible and checked',
        isCheckboxHidden: false,
        isChecked: true
    },
    {
		storyKind: storiesWithVariationsKindName,
        storyTitle: 'checkbox visible and disabled',
        isCheckboxHidden: false,
        isDisabled: true
    },
    {
		storyKind: storiesWithVariationsKindName,
        storyTitle: 'checkbox visible, disabled and checked',
        isCheckboxHidden: false,
        isChecked: true,
        isDisabled: true
    },

];

module.exports = {
	storiesWithVariationsKindName,
	variations,
	NOOP
}