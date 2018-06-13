const invert = require('@xero/xuishift/transforms/invert');
module.exports = {
	'@xero/xui/react/icon': [
		{
			isDefault: true,
			props: [
				{
					name: 'isInline',
					newName: 'isBoxed',
					valueTransform: invert
				}
			]
		}
	]
};
