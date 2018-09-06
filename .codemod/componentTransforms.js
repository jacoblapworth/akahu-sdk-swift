const stringReplace = require('@xero/xuishift/transforms/stringReplace');

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
}
