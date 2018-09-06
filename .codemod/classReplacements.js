const sizeMap = {
	'xsmall': '2xsmall',
	'small': 'small',
	'standard': 'standard',
	'large': 'large',
	'xlarge': 'xlarge',
	'2xlarge': '2xlarge',
	'3xlarge': '2xlarge',
	'4xlarge': '3xlarge',
	'5xlarge': '4xlarge',
	'6xlarge': '5xlarge',
};
const sides = ['-left', '-right', '-horizontal', '-vertical', ''];
const types = ['margin', 'padding'];
const sizeReplacementClassMap = {};

types.forEach(type => {
	Object.keys(sizeMap).forEach(size => {
		sides.forEach(side => {
			const prefix = `xui-${type}${side}-`;
			sizeReplacementClassMap[`${prefix}${size}`] = `${prefix}${sizeMap[size]}`;
		})
	})
});

module.exports = {
	...sizeReplacementClassMap
};
