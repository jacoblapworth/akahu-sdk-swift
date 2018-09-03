const invert = require('@xero/xuishift/transforms/invert');
module.exports = {
	'@xero/xui/react/icon': [
		{
			isDefault: true,
			props: [
				{
					name: 'isInline',
					newName: 'isBoxed',
					valueTransform: invert(true),
				},
				{
					name: 'path',
					newName: 'icon'
				}
			],
		}
	],
	'@xero/xui/react/select-box': [
		{
			isDefault: true,
			props: [
				{
					name: 'label',
					newName: 'labelText'
				},
				{
					name: 'labelClasses',
					newName: 'labelClassName'
				},
				{
					name: 'labelHidden',
					newName: 'isLabelHidden'
				},
				{
					name: 'ariaId',
					newName: 'id'
				},
			]
		}
	],
	'@xero/xui/react/loader': [
		{
			isDefault: true,
			props: [
				{
					name: 'label',
					newName: 'ariaLabel'
				}
			]
		}
	],
	'@xero/xui/react/switch': [
		{
			isDefault: true,
			props: [
				{
					name: 'labelText',
					newName: 'children'
				}
			]
		}
	],
	'@xero/xui/react/autocompleter': [
		{
			isDefault: 'XUIAutocompleterSecondarySearch',
			props: [
				{
					name: 'isinputLabelHidden',
					newName: 'isInputLabelHidden'
				}
			]
		}
	],
	'@xero/xui/react/radio': [
		{
			isDefault: 'XUIRadioGroup',
			props: [
				{
					name: 'groupLabel',
					newName: 'labelText'
				}
			]
		}
	],
	'@xero/xui/react/checkbox': [
		{
			isDefault: 'XUICheckboxGroup',
			props: [
				{
					name: 'groupLabel',
					newName: 'labelText'
				}
			]
		}
	],
	'@xero/xui/react/toggle': [
		{
			isDefault: true,
			props: [
				{
					name: 'layout',
					valueTransform: (node, j) => {
						if (node != null && node.value != null && node.value.value === 'form') {
							return j.literal('fullwidth');
						}
					}
				}
			]
		}
	]
};
