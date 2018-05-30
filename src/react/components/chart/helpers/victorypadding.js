const createVictoryPadding = ({xAxisHeight, yAxisWidth}) => ({
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

export default createVictoryPadding;
