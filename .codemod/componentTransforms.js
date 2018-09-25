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
}
