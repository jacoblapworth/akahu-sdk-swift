// Calculate and return height based on regular 16:9 viewport sizes
// Given an arbitrary width value
const sixteenByNine = (num) => num / 16 * 9;

/**
 * Common viewport sizes are determined based off XUI's current viewport breakpoints
 * 20px smaller than the smallest breakpoint
 * Half way between small and medium
 * Half way between medium and large
 * Half way between large and xlarge
 * 20px larger than xlarge
 */

const commonViewports = [
	{
		label: 'smaller than smallest breakpoint',
		width: 580,
		height: sixteenByNine(580)
	},
	{
		label: 'between small and medium breakpoints',
		width: 700,
		height: sixteenByNine(700)
	},
	{
		label: 'between medium and large breakpoints',
		width: 900,
		height: sixteenByNine(900)
	},
	{
		label: 'between large and xlarge breakpoints',
		width: 1100,
		height: sixteenByNine(1100)
	},
	{
		label: 'bigger than xlarge breakpoint',
		width: 1220,
		height: sixteenByNine(1220)
	}
];

export default commonViewports;
