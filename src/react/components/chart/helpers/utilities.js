export const forceValuePositive = value => Math.sqrt(value * value) || 0;

export const testIsCloseEnough = (next, previous, threshold = 2) => (
	next > previous - threshold && next < previous + threshold
);

// https://formidable.com/open-source/victory/docs/common-props/#padding
export const createChartPadding = ({xAxisHeight, yAxisWidth}) => ({
	// Allow room for y-axis text to be entered on the axis line but not bleed
	// over the viewbox.
	top: 10,
	// Gap between x-axis line + label height + bottom (with room for scroll bars).
	bottom: 20 + xAxisHeight + 20,
	// Gap between y-axis line + label width.
	left: yAxisWidth + 20,
	// A gap threshold to safegaurd against overflow.
	right: 2
});

export const pause = (shouldUpdate, items, callback) => {
	const min = items.length || 1 * 10;
	const max = 1000;
	setTimeout(callback, shouldUpdate() && Math.min(min, max));
}
