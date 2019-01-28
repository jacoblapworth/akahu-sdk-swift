const invert = require('@xero/xuishift/transforms/invert');
const stringReplace = require('@xero/xuishift/transforms/stringReplace');

const labelTextToLabel = {
	name: 'labelText',
	newName: 'label',
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
				{
					name: 'fullWidth',
					valueTransform: (node, j, path) => {
						const buttonVariantIsSet = path.value.openingElement.attributes.some(
							attribute =>
								attribute.name !== null &&
								attribute.name.name === 'buttonVariant'
						);

						if (buttonVariantIsSet) {
							return j.literal('never');
						}

						return node && node.value;
					}
				}
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
			props: [labelTextToLabel, {
				name: 'size',
				valueTransform: stringReplace({
					'standard': 'medium',
				}),
			}],
		}
	],
	'@xero/xui/react/toggle': [
		{
			isDefault: true,
			props: [
				labelTextToLabel,
				{
					name: 'variant',
					newName: 'size',
				}
			],
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
	'@xero/xui/react/button': [
		{
			isDefault: true,
			props: [
				{
					name: 'fullWidth',
					valueTransform: (node, j, path) => {
						const sizeAttribute = path.value.openingElement.attributes.find(
							attribute => attribute.name && attribute.name.name === 'size'
						);

						const size = sizeAttribute && sizeAttribute.value && sizeAttribute.value.value;

						if (size === 'full-width') {
							return j.literal('always');
						}

						if (size === 'full-width-mobile') {
							return j.literal('small-down');
						}

						return node && node.value;
					}
				},
				{
					name: 'size',
					valueTransform: (node, j, path) => {
						const sizeAttribute = path.value.openingElement.attributes.find(
							attribute => attribute.name && attribute.name.name === 'size'
						);

						const size = sizeAttribute && sizeAttribute.value && sizeAttribute.value.value;

						if (size === 'full-width' || size === 'full-width-mobile') {
							return;
						}

						return node && node.value;
					},
				},
			]
		}
	],
	'@xero/xui/react/structural': [
		{
			name: 'XUIColumn',
			props: [
				{
					name: 'gridColumnsMedium',
					newName: 'gridColumnsSmallUp'
				},
				{
					name: 'gridColumnsWide',
					newName: 'gridColumnsLargeUp'
				},
			],
		}
	],
}
