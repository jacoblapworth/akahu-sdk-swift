// Calculate and return height based on regular 16:9 viewport sizes
// Given an arbitrary width value
const sixteenByNine = num => num / 16 * 9;

/**
 * Common viewport sizes are determined based off XUI's current viewport breakpoints
 * Smaller than the smallest breakpoint (smallest common device size)
 * Half way between xsmall and small
 * Half way between small and medium
 * Half way between medium and large
 * Half way between large and xlarge
 * 20px larger than xlarge
 */

const commonViewports = [
	{
		label: 'smaller than xsmall breakpoint',
		width: 320,
		height: 500,
	},
	{
		label: 'between xsmall and small breakpoints',
		width: 500,
		height: 800,
	},
	{
		label: 'between small and medium breakpoints',
		width: 700,
		height: 1000,
	},
	{
		label: 'between medium and large breakpoints',
		width: 900,
		height: sixteenByNine(900),
	},
	{
		label: 'between large and xlarge breakpoints',
		width: 1100,
		height: sixteenByNine(1100),
	},
	{
		label: 'between xlarge and 2xlarge breakpoints',
		width: 1400,
		height: sixteenByNine(1400),
	},
	{
		label: 'bigger than 2xlarge breakpoint',
		width: 1620,
		height: sixteenByNine(1620),
	},
];

export default commonViewports;
