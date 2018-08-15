const positionOptions = [
	'top',
	'top-left',
	'top-center',
	'top-right',
	'right',
	'right-top',
	'right-center',
	'right-bottom',
	'bottom',
	'bottom-left',
	'bottom-center',
	'bottom-right',
	'left',
	'left-top',
	'left-center',
	'left-bottom',
];
const defaultAlignemnt = 'center';
const flipDirection = {
	top: 'bottom',
	bottom: 'top',
	left: 'right',
	right: 'left',
};
const verticals = ['top', 'bottom'];
const horizontals = ['left', 'right'];

module.exports = {
	positionOptions,
	defaultAlignemnt,
	flipDirection,
	verticals,
	horizontals,
};
