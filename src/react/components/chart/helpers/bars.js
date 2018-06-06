import cn from 'classnames';
import { createChartPadding } from '../helpers';
import { CHART_HEIGHT } from '../helpers/constants';
import { createFormatYAxisLabel, createYAxisTickValues } from '../helpers/yaxis';

const findMaxTotalBarStacks = ({ y }) => y.reduce((acc, value) => acc + value, 0);

const createBarStats = ({ barsData, maxVisibleItems, contentWidth, hasPagination }) => {
	const minWidth = 34;
	const maxWidth = 200;
	const barsTotal = barsData.length;
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

	const barMaxValue = (
		barsData
			.map(findMaxTotalBarStacks)
			.reduce((acc, value) => Math.max(acc, value), 0)
	);

	return { barsWidth, barWidth, barMaxValue, panelsTotal };
};

const createBarColorStacks = ({barsData, custom, base }) => {
	const maxStacks = barsData.reduce((acc, { y }) => Math.max(acc, y.length), 0);

	return (
		new Array(maxStacks)
			.fill(0)
			.map((_, index) => custom && custom[index] || base[index % 2])
	);

};

const enrichParams = (state, props, chartTheme) => {

	const {
		id,
		title,
		description,
		keyLabel: keyLabelRaw,
		bars: barsDataRaw,
		barColor: barColorRaw,
		isStacked,
		hasPagination,
		onBarClick,
		activeColor: activeColorRaw,
		createToolTipContent,
		maxVisibleItems,
		maxYValue: customMaxYValue = 0,
		formatYAxisLabel: formatYAxisLabelRaw,
		createPaginationMessage,
		height: chartHeight = CHART_HEIGHT
	} = props;

	const {
		chartWidth,
		yAxisWidth,
		xAxisHeight,
		toolTipPosition,
		toolTipData,
		currentPage: currentPageRaw
	} = state;

	// We support both "plain" and "stacked" bar styles. The difference is that
	// stacks require arrays of data and plain a single value. Rather than create
	// two duplicate components we augment the plain data to mimic a stacked
	// scenario that has only a single stack.
	const barsData = isStacked ? barsDataRaw : barsDataRaw.map(bar => ({ ...bar, y: [bar.y] }));
	const keyLabel = keyLabelRaw && (isStacked ? keyLabelRaw : [keyLabelRaw]);
	const barColor = barColorRaw && (isStacked ? barColorRaw : [barColorRaw]);

	// Colors...
	const colorActive = activeColorRaw || 'hotpink';
	const colorStacks = createBarColorStacks({ barsData, custom: barColor, base: chartTheme.bar.colorScale});

	// Tooltip...
	const [toolTipX, toolTipY] = toolTipPosition;
	const hasToolTip = Boolean(createToolTipContent && toolTipX && toolTipY);

	// Chart...
	const isChartNarrow = chartWidth <= 520;
	const chartPadding = createChartPadding({ xAxisHeight, yAxisWidth });
	const { top: chartTop, right: chartRight, bottom: chartBottom, left: chartLeft } = chartPadding;
	const chartClassName = cn('xui-chart', {
		[`xui-chart-has-pagination`]: hasPagination,
		[`xui-chart-has-multiline-header`]: hasPagination && createPaginationMessage && isChartNarrow
	});

	// Content...
	const contentWidth = chartWidth - chartLeft - chartRight;

	// Bars...
	const { barsWidth, barWidth, barMaxValue, panelsTotal } = createBarStats({ barsData, maxVisibleItems, contentWidth, hasPagination });
	// If the user resizes the UI we can get into a situation where the current
	// pagination reference exceeds the available panels.
	const currentPage = Math.min(currentPageRaw, panelsTotal);

	// Y-Axis...
	const maxYDomain = Math.max(customMaxYValue, barMaxValue);
	const yAxisHeight = chartHeight - chartTop - chartBottom;
	const formatYAxisLabel = formatYAxisLabelRaw || createFormatYAxisLabel(maxYDomain);
	const yAxisTickValues = createYAxisTickValues({ maxYDomain, yAxisHeight });

	return {

		chartTheme,

		id,
		title,
		description,
		keyLabelRaw,
		barsDataRaw,
		barColorRaw,
		isStacked,
		hasPagination,
		onBarClick,
		activeColorRaw,
		createToolTipContent,
		maxVisibleItems,
		customMaxYValue,
		formatYAxisLabelRaw,
		createPaginationMessage,
		chartHeight,

		chartWidth,
		yAxisWidth,
		xAxisHeight,
		toolTipPosition,
		toolTipData,
		currentPageRaw,

		barsData,
		keyLabel,
		barColor,
		colorActive,
		colorStacks,
		toolTipX,
		toolTipY,
		hasToolTip,
		isChartNarrow,
		chartPadding,
		chartTop,
		chartRight,
		chartBottom,
		chartLeft,
		chartClassName,
		contentWidth,
		barsWidth,
		barWidth,
		barMaxValue,
		panelsTotal,
		currentPage,
		maxYDomain,
		yAxisHeight,
		formatYAxisLabel,
		yAxisTickValues,
	};

	// return {
	// 	id,
	// 	title,
	// 	description,
	// 	isChartNarrow,
	// 	colorActive,
	// 	colorStacks,
	// 	hasToolTip,
	// 	contentWidth,
	// 	barsWidth,
	// 	barWidth,
	// 	barsData,
	// 	panelsTotal,
	// 	barMaxValue,
	// 	maxYDomain,
	// 	yAxisHeight,
	// 	formatYAxisLabel,
	// 	yAxisTickValues,
	// 	chartClassName,
	// 	currentPage,
	// 	onBarClick,
	// 	keyLabel,
	// 	chartPadding,
	// 	chartTop,
	// 	chartRight,
	// 	chartBottom,
	// 	chartLeft,
	// 	chartTheme,
	// 	chartHeight,
	// 	createToolTipContent,
	// 	toolTipData,
	// 	toolTipX,
	// 	toolTipY,
	// 	hasPagination,
	// 	createPaginationMessage,
	// };

};

export { createBarStats as default, createBarColorStacks, enrichParams, findMaxTotalBarStacks};
