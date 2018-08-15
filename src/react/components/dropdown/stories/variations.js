const privateConsts = require('../private/constants');
const NOOP = require('../../helpers/noop');

const storiesWithVariationsKindName = 'Instances/Dropdown';

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as default',
		ddSettings: {}
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as Matched to Trigger Width',
		ddSettings: {},
		matchTriggerWidth: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with Header and Footer',
		ddSettings: {
			headerAndFooter: true
		},
		closeOnTab: false,
		closeOnSelect: false
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with a DatePicker',
		ddSettings: {
			children: 'datepicker'
		},
		restrictToViewPort: false,
		closeOnTab: false
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with Text Content',
		ddSettings: {
			children: 'plaintext'
		}
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with NestedDropDown',
		ddSettings: {
			children: 'nested'
		},
		closeOnTab: false,
		closeOnSelect: false
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'side by side',
		ddSettings: {
			children: 'side-by-side'
		}
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with positioning test',
		ddSettings: {
			children: 'positioning-test'
		}
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with maxHeight',
		ddSettings: {},
		maxHeight: 200
	}
];

Object.keys(privateConsts.fixedWidthDropdownSizes).forEach(size => {
	variations.push({
		storyKind: storiesWithVariationsKindName,
		storyTitle: `as Fixed-Width ${size}`,
		ddSettings: {
			fixedWidth: true,
			size: size
		}
	});
});

module.exports = {
	storiesWithVariationsKindName,
	variations,
	NOOP
}
