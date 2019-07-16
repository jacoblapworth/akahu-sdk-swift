import cn from 'classnames';
import { createArray } from '../../progressindicator/helpers/utilities';
import { forceValuePositive, createChartPadding } from '../helpers/utilities';
import { NAME_SPACE, BAR_MIN_WIDTH, BAR_MAX_WIDTH, CHART_BREAKPOINT } from '../helpers/constants';
import { createYAxisLabelFormatThunk, createYAxisTickValues } from '../helpers/yaxis';
import AvatarLabel from '../customElements/AvatarLabel';
import StandardLabel from '../customElements/StandardLabel';
import AbbreviationLabel from '../customElements/AbbreviationLabel';

const testIsCurrentStackNegative = stack => stack < 0;
const testIsCurrentStackPositive = stack => !testIsCurrentStackNegative(stack);
const testStackData = (stacks, query) => Boolean(stacks.filter(query).length);
const testIsAnyStackNegative = stacks => testStackData(stacks, testIsCurrentStackNegative);
const testIsAnyStackPositive = stacks => testStackData(stacks, testIsCurrentStackPositive);
const findMaxChartStackQuantity = barsData => barsData
	.reduce((acc, { y }) => Math.max(acc, y.length), 0);
const addStackItems = (acc, stack) => acc + stack;
const forceAddStackItems = (acc, stack) => addStackItems(acc, forceValuePositive(stack));

const createBarStats = ({
	barsData, xAxisVisibleItems, viewportWidth, hasPaginationRaw,
}) => {
	const barsTotal = barsData.length;
	const limitWithLowerThreshold = baseWidth => Math.max(baseWidth, BAR_MIN_WIDTH);
	const limitWithUpperAndLowerThreshold = baseWidth => (baseWidth > BAR_MAX_WIDTH
		? BAR_MAX_WIDTH
		: limitWithLowerThreshold(baseWidth));
	const isConstrainedWidth = Boolean(xAxisVisibleItems);

	// What is an "initial" rough estimate of how many bars are going to fit on a
	// single panel.
	const sanitisedWidth = isConstrainedWidth
		// When requesting a "custom" distribution scenario we don't know exactly what
		// the width is going to be just yet so lets take the raw division for now but
		// still making sure that we do not let the width get too small (e.g if the
		// user requested to fit 1000 items on a panel).
		? limitWithLowerThreshold(viewportWidth / xAxisVisibleItems)
		// In a "standard" scenario we limit the bar widths against the static upper
		// and lower thresholds.
		: limitWithUpperAndLowerThreshold(viewportWidth / barsTotal);

	// Now that we have a rough idea of the quantity / width of the bars on a panel
	// we need to make sure all of the dedicated panel content area is filled up.
	//    . - - - - - - .
	//    |    _     ///|
	//    |  _|o|  _ ///| <--- Wasted space that needs to be
	//    | |+|o|_|o|///|      distributed among visible bars.
	//    | |+|o|+|o|///|
	//    ° - - - - - - °
	const wholeBarsPerPanel = Math.floor(viewportWidth / sanitisedWidth);
	const hasMultiplePanels = barsTotal > wholeBarsPerPanel;
	const totalBarsPerPanel = hasPaginationRaw || !hasMultiplePanels
		? Math.min(wholeBarsPerPanel, barsTotal)
		// When there is an overflow with the native scrolling UI we need to make sure
		// to show "half" of the next panels bar as an aesthetic way to convey hidden
		// content to the user.
		: wholeBarsPerPanel + 0.5;
	const barViewports = Math.ceil(barsTotal / totalBarsPerPanel);
	const barWidth = hasMultiplePanels || isConstrainedWidth
		? viewportWidth / totalBarsPerPanel
		: sanitisedWidth;
	const barsWidth = barWidth * barsTotal;

	const barMaxValue = (
		barsData
			.map(({ y }) => y.filter(testIsCurrentStackPositive).reduce(addStackItems, 0))
			.reduce((acc, stacks) => Math.max(acc, stacks), 0)
	);
	const barMinValue = (
		barsData
			.map(({ y }) => y.filter(testIsCurrentStackNegative).reduce(addStackItems, 0))
			.reduce((acc, stacks) => Math.min(acc, stacks), 0)
	);

	return {
		barsWidth, barWidth, barMaxValue, barMinValue, barViewports,
	};
};

const createBarColorStacks = ({ barsData, custom, base }) => {
	const maxStacks = barsData.reduce((acc, { y }) => Math.max(acc, y.length), 0);

	return (
		createArray(maxStacks)
			.map((_, index) => (custom && custom[index]) || base[index % 2])
	);
};

const createActiveBars = (activeBarsRaw, barsData) => (
	Object
		.keys(activeBarsRaw)
		// Does the ID reference exist in the barData array?
		.filter(key => barsData.filter(({ id }) => `${id}` === key).length)
		// Is the ID reference relating to an "active" state e.g NOT "false" or "[]".
		.filter(key => {
			const state = activeBarsRaw[key];
			return Array.isArray(state) ? state.length : Boolean(state);
		})
		// Turn back into an "active" stack ONLY object (only arrays, no booleans).
		.reduce((acc, key) => {
			const stateRaw = activeBarsRaw[key];
			const state = Array.isArray(stateRaw)
				? stateRaw
				: createArray(barsData[key].y.length).map((_, index) => index);

			return { ...acc, [key]: state };
		}, {})
);

const createStackTop = ({
	barZeroBase, barStacks, ratio, stackIndex,
}) => {
	const stackTop = barStacks[stackIndex];
	const combineStacksAsPixels = (acc, stack) => acc + (stack * ratio);
	const offset = testIsCurrentStackNegative(stackTop)

		// + Stacks are initially positioned with the "top" aligned to the "zero"
		//   baseline.

		// + We then take into consideration the previously positioned stacks in the
		//   sequence thus far and offset based on their accumulated offset (either
		//   positive / negative).
		? barStacks
			.slice(0, stackIndex)
			.filter(testIsCurrentStackNegative)
			.reduce(combineStacksAsPixels, 0)

		// NOTE: "positive" stacks (above the "zero" axis) need to take their own size
		// into consideration when determining the offset as stacks start in the
		// negative quadrant (see diagram below).
		//
		//   BEFORE:                                   AFTER:
		//  --------                                  -------
		//  Stack with a value of "+1"                Stack is reorientated into the
		//  starts with its top flush to               "positive" axis by taking its own
		//  the "zero" axis.                          size into consideration.
		//
		//   1 -  -  -  -  -  -  -                     1 -. -  -  - .-  -  -
		//                                                | / / / / |
		//   0 -. -  -  - .-  -  -                     0 -° -  -  - °-  -  -
		//      | / / / / |
		//  -1 -° -  -  - °-  -  -                    -1 -  -  -  -  -  -  -
		: barStacks
			.slice(0, stackIndex + 1)
			.filter(testIsCurrentStackPositive)
			.reduce(combineStacksAsPixels, 0);

	return barZeroBase - offset;
};

// We can encounter the scenario where the disparity between bars total values
// are so large (10 vs 100000000000000) that bars that have data appear to be
// empty. In that regard the minimum value a bar with data can have is 1px
// (to keep the semblance of a visible bar).
const createStackHeight = heightRaw => {
	const height = forceValuePositive(heightRaw);

	return height ? Math.max(height, 1) : 0;
};

// Because we augment the supplied data to act like a stacked bar (even if its a
// plain version) we need to sanitise the data back to its original intention
// when creating callback params for the user.
const createInteractionParams = (isBarStacked, paramsStacked) => {
	switch (true) {
	case isBarStacked: return paramsStacked;
	default: {
		// eslint-disable-next-line no-unused-vars
		const { stackIndex, y, ...paramsPlain } = paramsStacked;
		return { ...paramsPlain, y: y[0] };
	}
	}
};

const enrichParams = (state, props, chartTheme) => {
	const {
		qaHook,
		chartId,
		chartTitle,
		isChartTitleHidden,
		chartDescription,
		chartHeight,
		keyLabel: keyLabelRaw,
		keyTitle,
		barsData: barsDataRaw,
		barColor: barColorRaw,
		barColorActive,
		activeBars: activeBarsRaw,
		isBarStacked,
		onBarClick,
		createBarToolTipMessage: createBarToolTipMessageRaw,
		isBarToolTipHidden,
		isXAxisToolTipHidden,
		xAxisVisibleItems,
		yAxisDefaultTopValue,
		createYAxisLabelFormat: createYAxisLabelFormatRaw,
		xAxisType,
		hasPagination: hasPaginationRaw,
		createPaginationMessage,
		paginationLabel,
		paginationNextTitle,
		paginationPreviousTitle,
		avatarImageUrl,
	} = props;

	const {
		chartWidth,
		yAxisWidth,
		xAxisHeight,
		toolTipPosition,
		toolTipMessage,
		panelCurrent: panelCurrentRaw,
	} = state;

	// We support both "plain" and "stacked" bar styles. The difference is that
	// stacks require arrays of data and plain a single value. Rather than create
	// two duplicate components we augment the plain data to mimic a stacked
	// scenario that has only a single stack.
	const keyLabel = keyLabelRaw && (isBarStacked ? keyLabelRaw : [keyLabelRaw]);
	const barColor = barColorRaw && (isBarStacked ? barColorRaw : [barColorRaw]);
	const barsData = (
		isBarStacked
			? barsDataRaw.map(bar => ({ ...bar, y: bar.y || [0] }))
			: barsDataRaw.map(bar => ({ ...bar, y: [bar.y || 0] }))
	);

	// Key...
	const hasKey = keyLabel && keyLabel
		.filter(key => key).length === findMaxChartStackQuantity(barsData);

	// Chart...
	const isChartNarrow = chartWidth <= CHART_BREAKPOINT;
	const chartPadding = createChartPadding({ xAxisHeight, yAxisWidth });
	const {
		top: chartTop, right: chartRight, bottom: chartBottom, left: chartLeft,
	} = chartPadding;

	// Bars...
	const barColorStacks = createBarColorStacks({
		barsData,
		custom: barColor,
		base: chartTheme.bar.colorScale,
	});
	const activeBars = activeBarsRaw ? createActiveBars(activeBarsRaw, barsData) : {};
	// Round viewport down so that we do not accidentally trigger the horizontal
	// overflow shadows.
	const viewportWidth = Math.floor(chartWidth - chartLeft - chartRight);
	const {
		barsWidth, barWidth, barMaxValue, barMinValue, barViewports,
	} = createBarStats({
		barsData, xAxisVisibleItems, viewportWidth, hasPaginationRaw,
	});

	// Panels...
	const panelsTotal = barViewports;
	const panelWidth = viewportWidth;
	// If the user resizes the UI we can get into a situation where the current
	// pagination reference exceeds the available panels.
	const panelCurrent = Math.min(panelCurrentRaw, panelsTotal);

	// Pagination...
	const hasPagination = hasPaginationRaw && panelsTotal > 1;

	// Y-Axis...
	const yAxisHeight = chartHeight - chartTop - chartBottom;
	const yAxisTickValues = createYAxisTickValues({
		yAxisHeight,
		minValue: barMinValue,
		// Find the largest value between the largest bar, the supplied y-axis value etc.
		maxValue: Math.max(yAxisDefaultTopValue, barMaxValue),
	});
	const createYAxisLabelFormat = createYAxisLabelFormatRaw
		|| createYAxisLabelFormatThunk(yAxisTickValues);

	// X-Axis...
	const xAxisTickValues = barsData.map(({ x }) => x);
	const xAxisLabelOptions = {
		abbreviation: AbbreviationLabel,
		avatar: AvatarLabel,
		standard: StandardLabel,
	};
	const XAxisLabel = xAxisLabelOptions[xAxisType];

	// Tooltip...
	const hasToolTip = Boolean(toolTipMessage);
	const createBarToolTipMessage = createBarToolTipMessageRaw
		|| (({ y, stackIndex }) => createYAxisLabelFormat(isBarStacked ? y[stackIndex] : y));

	const hasChartTitle = !isChartTitleHidden && chartTitle;
	const hasChartHeader = Boolean(hasChartTitle || hasKey || hasPagination);
	const hasMutlilineHeader = hasPagination && createPaginationMessage && isChartNarrow;
	const chartClassName = cn(`${NAME_SPACE}-chart`, {
		[`${NAME_SPACE}-chart-has-pagination`]: hasPagination,
		[`${NAME_SPACE}-chart-has-multiline-header`]: hasMutlilineHeader,
	});

	return {
		qaHook,

		// Path to an image to be used with avatar label.
		avatarImageUrl,

		// Chart...
		chartId,
		isBarStacked,
		hasChartHeader,
		chartTitle,
		hasChartTitle,
		chartDescription,
		chartClassName,
		chartTheme,
		chartHeight,
		chartWidth,
		chartPadding,
		chartTop,
		chartBottom,
		chartLeft,

		// Panels...
		panelWidth,
		panelCurrent,
		panelsTotal,

		// Bars...
		barsData,
		barsWidth,
		barWidth,
		onBarClick,
		activeBars,
		barColorActive,
		barColorStacks,

		// Pagination...
		hasPagination,
		createPaginationMessage,
		paginationLabel,
		paginationNextTitle,
		paginationPreviousTitle,

		// Tooltip...
		hasToolTip,
		isBarToolTipHidden,
		isXAxisToolTipHidden,
		toolTipMessage,
		toolTipPosition,
		createBarToolTipMessage,

		// Y-Axis...
		yAxisHeight,
		yAxisTickValues,
		createYAxisLabelFormat,

		// X-Axis...
		xAxisTickValues,
		XAxisLabel,

		// Key...
		hasKey,
		keyTitle,
		keyLabel,
	};
};

export {
	createBarStats as default,
	createBarColorStacks,
	enrichParams,
	createStackTop,
	createStackHeight,
	createInteractionParams,
	testIsAnyStackNegative,
	testIsAnyStackPositive,
	testIsCurrentStackPositive,
	addStackItems,
	forceAddStackItems,
};
