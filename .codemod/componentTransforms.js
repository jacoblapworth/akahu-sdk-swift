const invert = require('@xero/xuishift/transforms/invert');
const stringReplace = require('@xero/xuishift/transforms/stringReplace');

const labelTextToLabel = {
		name: 'labelText',
		newName: 'label'
	};

module.exports = {
	'@xero/xui/react/pill': [
		{
			isDefault: true,
			props: [
				{
					name: 'size',
					valueTransform: stringReplace({}, 'small'),
				},
				{
					name: 'isMaxContentWidth',
					newName: 'isLimitedWidth',
					valueTransform: invert(true),
				}
			]
		}
	],
	'@xero/xui/react/tag': [
		{
			isDefault: true,
			props: [
				{
					name: 'size',
					valueTransform: stringReplace({}, 'small'),
				}
			]
		}
	],
	'@xero/xui/react/select-box': [
		{
			isDefault: true,
			props: [
				{
					name: 'islabelHidden',
					newName: 'isLabelHidden'
				},
				labelTextToLabel,
			]
		}
	],
	'@xero/xui/react/autocompleter': [
		{
			isDefault: true,
			props: [
				{
					name: 'inputLabelText',
					newName: 'inputLabel'
				},
			]
		}
	],
	'@xero/xui/react/autocompleter': [
		{
			isDefault: true,
			props: [
				{
					name: 'searchThrottleInterval',
					newName: 'searchDebounceTimeout'
				}
			]
		},
		{
			name: 'XUIAutocompleterSecondarySearch',
			props: [
				{
					name: 'inputLabelText',
					newName: 'inputLabel'
				},
			]
		}
	],
	'@xero/xui/react/checkbox': [
		{
			name: 'XUICheckboxGroup',
			props: [labelTextToLabel],
		}
	],
	'@xero/xui/react/radio': [
		{
			name: 'XUIRadioGroup',
			props: [labelTextToLabel],
		}
	],
	'@xero/xui/react/rollovercheckbox': [
		{
			isDefault: true,
			props: [labelTextToLabel],
		}
	],
	'@xero/xui/react/textinput': [
		{
			isDefault: true,
			props: [labelTextToLabel],
		}
	],
	'@xero/xui/react/toggle': [
		{
			isDefault: true,
			props: [labelTextToLabel],
		}
	],
	'@xero/xui/react/structural': [
		{
			name: 'XUIContentBlockItem',
			props: [
				{
					name: 'tag',
					newName: 'tags'
				},
				{
					name: 'secondaryHeading',
					newName: 'description'
				},
			]
		}
	],
	'@xero/xui/react/loader': [
		{
			isDefault: true,
			props: [
				{
					name: 'size',
					valueTransform: stringReplace({
						'small': 'xsmall',
						'standard': 'small',
						'large': 'standard',
					}, 'small'),
				}
			]
		}
	],
}
