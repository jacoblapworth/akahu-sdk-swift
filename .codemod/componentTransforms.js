const invert = require('@xero/xuishift/transforms/invert');
const stringReplace = require('@xero/xuishift/transforms/stringReplace');
const remove = () => () => undefined;

const XUIStatelessInputPropTransforms = [
	{
		name: 'button',
		newName: 'button_REPLACE_WITH_rightElement',
	},
	{
		name: 'className',
		newName: 'inputClassName',
	},
	{
		name: 'iconAttributes',
		newName: 'iconAttributes_REPLACE_WITH_leftElement',
	},
	{
		name: 'inputAttributes',
		newName: 'inputProps',
	},
	{
		name: 'clearButtonProps',
		newName: 'clearButtonProps_REPLACE_WITH_rightElement',
	},
	{
		name: 'hasClearButton',
		newName: 'hasClearButton_REPLACE_WITH_rightElement',
	},
	{
		name: 'isBorderless',
		newName: 'isBorderlessTransparent',
	}
];

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
				},
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
					newName: 'islabelHidden'
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
			name: 'XUIAutocompleterSecondarySearch',
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
			name: 'XUIRadioGroup',
			props: [
				{
					name: 'groupLabel',
					newName: 'labelText'
				},
			]
		},
		{
			isDefault: true,
			props: [
				{
					name: 'mainIconPath',
					newName: 'mainIcon'
				},
			]
		}
	],
	'@xero/xui/react/checkbox': [
		{
			name: 'XUICheckboxGroup',
			props: [
				{
					name: 'groupLabel',
					newName: 'labelText'
				}
			]
		},
		{
			isDefault: true,
			props: [
				{
					name: 'mainIconPath',
					newName: 'mainIcon'
				},
			]
		}
	],
	'@xero/xui/react/toggle': [
		{
			isDefault: true,
			props: [
				{
					name: 'layout',
					valueTransform: stringReplace({'form': 'fullwidth'}),
				}
			]
		}
	],
	'@xero/xui/react/input': [
		{
			isDefault: true,
			newName: 'XUITextInput',
			props: XUIStatelessInputPropTransforms,
		},
		{
			name: 'XUIStatelessInput',
			newName: 'XUITextInput',
			props: XUIStatelessInputPropTransforms,
		},
	],
	'@xero/xui/react/textarea': [
		{
			isDefault: true,
			newName: 'XUITextInput',
			props: [
				{
					name: 'propThatDidntExistBefore',
					newName: 'isMultiline',
					valueTransform: invert(),
				},
				{
					name: 'isResizable',
					newName: remove(),
				},
				{
					name: 'readOnly',
					newName: 'readOnly_MOVE_TO_inputProps',
				},
				{
					name: 'maxCharacters',
					newName: remove(),
				},
				{
					name: 'defaultLayout',
					newName: remove(),
				},
				{
					name: 'textareaId',
					newName: 'textareaID_MOVE_TO_inputProps',
				},
				{
					name: 'textareaRef',
					newName: 'inputRef',
				},
				{
					name: 'className',
					newName: 'inputClassName',
				},
				{
					name: 'isBorderless',
					newName: 'isBorderlessTransparent',
				},
				{
					name: 'children',
					newName: 'labelText',
				},
				{
					name: 'style',
					newName: 'style_MOVE_TO_inputProps',
				}
			]
		}
	]
};
