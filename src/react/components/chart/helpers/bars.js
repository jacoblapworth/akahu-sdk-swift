const createBarStats = ({ bars, maxVisibleItems, contentWidth, hasPagination }) => {
	const minWidth = 34;
	const maxWidth = 200;
	const barsTotal = bars.length;
	const limitWithLowerThreshold = baseWidth => Math.max(baseWidth, minWidth);
	const limitWithUpperAndLowerThreshold = baseWidth => baseWidth > maxWidth
		? maxWidth
		: limitWithLowerThreshold(baseWidth)
	const isConstrainedWidth = Boolean(maxVisibleItems);

	// What is an "initial" rough estimate of how many bars are going to fit on a
	// single panel.
	const sanitisedWidth = isConstrainedWidth
		// When requesting a "custom" distribution scenario we don't know exactly what
		// the width is going to be just yet so lets take the raw division for now but
		// still making sure that we do not let the width get too small (e.g if the
		// user requested to fit 1000 items on a panel).
		? limitWithLowerThreshold(contentWidth / maxVisibleItems)
		// In a "standard" scenario we limit the bar widths against the static upper
		// and lower thresholds.
		: limitWithUpperAndLowerThreshold(contentWidth / barsTotal)

	// Now that we have a rough idea of the quantity / width of the bars on a panel
	// we need to make sure all of the dedicated panel content area is filled up.
	//    . - - - - - - .
	//    |    _     ///|
	//    |  _|o|  _ ///| <--- Wasted space that needs to be
	//    | |+|o|_|o|///|      distributed among visible bars.
	//    | |+|o|+|o|///|
	//    ° - - - - - - °
	const wholeBarsPerPanel = Math.floor(contentWidth / sanitisedWidth);
	const hasMultiplePanels = barsTotal > wholeBarsPerPanel;
	const totalBarsPerPanel = hasPagination || !hasMultiplePanels
		? Math.min(wholeBarsPerPanel, barsTotal)
		// When there is an overflow with the native scrolling UI we need to make sure
		// to show "half" of the next panels bar as an aesthetic way to convey hidden
		// content to the user.
		: wholeBarsPerPanel + 0.5;
	const panelsTotal = Math.ceil(barsTotal / totalBarsPerPanel);
	const barWidth = hasMultiplePanels || isConstrainedWidth
		? contentWidth / totalBarsPerPanel
		: sanitisedWidth;
	const barsWidth = barWidth * barsTotal;

	return { barsWidth, barWidth, panelsTotal };
};

// const createAlternateStackColor = ({stackColors, stackIndex}) => {
// 	const barColor = stackColors;
// 	const colorIndex = stackIndex % 2;

// 	return barColor[colorIndex];
// };

const createBarColorList = ({bars, custom, base }) => {
	const maxStacks = bars.reduce((acc, { y }) => Math.max(acc, y.length), 0);

	return (
		new Array(maxStacks)
			.fill(0)
			.map((_, index) => custom && custom[index] || base[index % 2])
	);

};

export { createBarStats as default, createBarColorList};
