const classMap = {
	'xui-verticalinputgroup': 'xui-verticaltextinputgroup',
	'xui-dropdown--force-desktop': 'xui-dropdown-force-desktop',
	'xui-pageheading--breadcrumbs': 'xui-breadcrumbs',
	'xui-pickitem--split': 'xui-pickitem-split',
	'xui-pickitem--multiselect': 'xui-pickitem-multiselect',
	'xui-pill-is-deleteable': 'xui-pill-is-deletable'
};

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
const sides = ['-left', '-right', '-top', '-bottom', '-horizontal', '-vertical', ''];
const types = ['margin', 'padding'];

types.forEach(type => {
	Object.keys(sizeMap).forEach(size => {
		sides.forEach(side => {
			const prefix = `xui-${type}${side}-`;
			classMap[`${prefix}${size}`] = `${prefix}${sizeMap[size]}`;
		})
	})
});

module.exports = classMap;
