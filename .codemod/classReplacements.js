const classMap = {
	'xui-verticalinputgroup': 'xui-verticaltextinputgroup',
	'xui-dropdown--force-desktop': 'xui-dropdown-force-desktop',
	'xui-pageheading--breadcrumbs': 'xui-breadcrumbs',
	'xui-pickitem--split': 'xui-pickitem-split',
	'xui-pickitem--multiselect': 'xui-pickitem-multiselect',
	'xui-pill-is-deleteable': 'xui-pill-is-deletable',
	'xui-select--button': 'xui-button-standard xui-button-fullwidth xui-select--button xui-select--button-no-variant'
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

const dropdownClasses = [
	'xui-dropdown',
	'xui-dropdown-fixed',
];

const dropdownSizeMap = {
	'medium': 'small',
	'large': 'medium',
	'xlarge': 'large'
};

dropdownClasses.forEach(dropdownClass => {
	Object.keys(dropdownSizeMap).forEach(size => {
		classMap[`${dropdownClass}${size}`] = `${dropdownClass}${dropdownSizeMap[size]}`
	})
});


for (i = 1, max = 12; i <= max; i += 1) {
	classMap[`xui-column-${i}-of-12-medium`] = `xui-column-${i}-of-12-small-up`;
	classMap[`xui-column-${i}-of-12-wide`] = `xui-column-${i}-of-12-large-up`;
}

const utilsToResize = [
	'flex-align-start',
	'flex-align-end',
	'flex-align-stretch',
	'flex-align-center',
	'flex-row',
	'flex-column',
	'flex-justify-space-between',
	'flex-justify-space-around',
	'flex-justify-start',
	'flex-justify-end',
	'flex-justify-center',
	'hidden',
];
const breakpointMap = {
	narrow: 'small-down',
	medium: 'small-up',
	wide: 'large-up'
};

utilsToResize.forEach(util => {
	Object.keys(breakpointMap).forEach(bp => {
		const prefix = `xui-u-${util}-`;
		classMap[`${prefix}${bp}`] = `${prefix}${breakpointMap[bp]}`;
	})
});

module.exports = classMap;
