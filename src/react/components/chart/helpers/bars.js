import React from 'react';
import cn from 'classnames';
import {createChartPadding} from '../helpers';
import {createArray} from '../../progressindicator/helpers/utilities';
import {CHART_HEIGHT, BAR_MIN_WIDTH, BAR_MAX_WIDTH} from '../helpers/constants';
import {createYAxisLabelFormatThunk, createYAxisTickValues} from '../helpers/yaxis';
import AvatarLabel from '../customElements/AvatarLabel';
import StandardLabel from '../customElements/StandardLabel';
import AbbreviationLabel from '../customElements/AbbreviationLabel';

const findMaxTotalBarStacks = ({y}) => y.reduce((acc, value) => acc + value, 0);

const createBarStats = ({barsData, maxVisibleItems, viewportWidth, hasPaginationRaw}) => {
	const barsTotal = barsData.length;
	const limitWithLowerThreshold = baseWidth => Math.max(baseWidth, BAR_MIN_WIDTH);
	const limitWithUpperAndLowerThreshold = baseWidth => baseWidth > BAR_MAX_WIDTH
		? BAR_MAX_WIDTH
		: limitWithLowerThreshold(baseWidth)
	const isConstrainedWidth = Boolean(maxVisibleItems);

	// What is an "initial" rough estimate of how many bars are going to fit on a
	// single panel.
	const sanitisedWidth = isConstrainedWidth
		// When requesting a "custom" distribution scenario we don't know exactly what
		// the width is going to be just yet so lets take the raw division for now but
		// still making sure that we do not let the width get too small (e.g if the
		// user requested to fit 1000 items on a panel).
		? limitWithLowerThreshold(viewportWidth / maxVisibleItems)
		// In a "standard" scenario we limit the bar widths against the static upper
		// and lower thresholds.
		: limitWithUpperAndLowerThreshold(viewportWidth / barsTotal)

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
			.map(findMaxTotalBarStacks)
			.reduce((acc, value) => Math.max(acc, value), 0)
	);

	return {barsWidth, barWidth, barMaxValue, barViewports};
};

const createBarColorStacks = ({barsData, custom, base }) => {
	const maxStacks = barsData.reduce((acc, {y}) => Math.max(acc, y.length), 0);

	return (
		createArray(maxStacks)
			.map((_, index) => custom && custom[index] || base[index % 2])
	);
};

const enrichParams = (state, props, chartTheme) => {
	const {
		id: chartId,
		title: chartTitle,
		isTitleHidden,
		description: chartDescription,
		keyLabel: keyLabelRaw,
		bars: barsDataRaw,
		barColor: barColorRaw,
		isStacked,
		hasPagination: hasPaginationRaw,
		onBarClick,
		activeColor: activeColorRaw,
		createBarToolTipMessage,
		maxVisibleItems,
		maxYValue: customMaxYValue = 0,
		createYAxisLabelFormat: createYAxisLabelFormatRaw,
		xAxisType = 'standard',
		createPaginationMessage,
		height: chartHeight = CHART_HEIGHT
	} = props;

	const {
		chartWidth,
		yAxisWidth,
		xAxisHeight,
		toolTipPosition,
		toolTipMessage,
		panelCurrent: panelCurrentRaw
	} = state;

	// We support both "plain" and "stacked" bar styles. The difference is that
	// stacks require arrays of data and plain a single value. Rather than create
	// two duplicate components we augment the plain data to mimic a stacked
	// scenario that has only a single stack.
	const barsData = (
		isStacked
			? barsDataRaw.map(bar => ({...bar, y: bar.y || [0]}))
			: barsDataRaw.map(bar => ({...bar, y: [bar.y || 0]}))
	);
	console.log(chartTitle, barsData);
	const keyLabel = keyLabelRaw && (isStacked ? keyLabelRaw : [keyLabelRaw]);
	const barColor = barColorRaw && (isStacked ? barColorRaw : [barColorRaw]);

	// Colors...
	const colorActive = activeColorRaw || 'hotpink';
	const colorStacks = createBarColorStacks({barsData, custom: barColor, base: chartTheme.bar.colorScale});

	// Tooltip...
	const hasToolTip = Boolean(toolTipMessage);

	// Key...
	const hasKey = keyLabel && keyLabel.length;

	// Chart...
	const hasChartTitle = !isTitleHidden && chartTitle;
	const hasChartHeader = hasChartTitle || hasKey || hasPagination;
	const isChartNarrow = chartWidth <= 520;
	const chartPadding = createChartPadding({xAxisHeight, yAxisWidth});
	const {top: chartTop, right: chartRight, bottom: chartBottom, left: chartLeft} = chartPadding;

	// Bars...
	const viewportWidth = chartWidth - chartLeft - chartRight;
	const {
		barsWidth,
		barWidth,
		barMaxValue,
		barViewports,
	} = createBarStats({barsData, maxVisibleItems, viewportWidth, hasPaginationRaw});

	// Panels...
	const panelsTotal = barViewports;
	const panelWidth = viewportWidth;
	// If the user resizes the UI we can get into a situation where the current
	// pagination reference exceeds the available panels.
	const panelCurrent = Math.min(panelCurrentRaw, panelsTotal);

	// Pagination...
	const hasPagination = hasPaginationRaw && panelsTotal > 1;

	// Y-Axis...
	const yAxisMaxValue = Math.max(customMaxYValue, barMaxValue);
	const yAxisHeight = chartHeight - chartTop - chartBottom;
	const createYAxisLabelFormat = createYAxisLabelFormatRaw || createYAxisLabelFormatThunk(yAxisMaxValue);
	const yAxisTickValues = createYAxisTickValues({yAxisMaxValue, yAxisHeight});

	// X-Axis...
	const xAxisTickValues = barsData.map(({x}) => x);
	const xAxisLabelOptions = {
		abbreviation: AbbreviationLabel,
		avatar: AvatarLabel,
		standard: StandardLabel,
	};
	const XAxisLabel = xAxisLabelOptions[xAxisType];

	const chartClassName = cn('xui-chart', {
		[`xui-chart-has-pagination`]: hasPagination,
		[`xui-chart-has-multiline-header`]: hasPagination && createPaginationMessage && isChartNarrow
	});

	return {
		// Chart...
		chartId, hasChartHeader, chartTitle, hasChartTitle, chartDescription,
		chartClassName, chartTheme, chartHeight, chartWidth,
		chartPadding, chartTop, chartBottom, chartLeft,

		// Panels...
		panelWidth, panelCurrent, panelsTotal,

		// Bars...
		barsData, barsWidth, barWidth, onBarClick,

		// Pagination...
		hasPagination, createPaginationMessage,

		// Tooltip...
		toolTipMessage, toolTipPosition, hasToolTip, createBarToolTipMessage,

		// Colors...
		colorActive, colorStacks,

		// Y-Axis...
		yAxisMaxValue, yAxisHeight, yAxisTickValues, createYAxisLabelFormat,

		// X-Axis...
		xAxisTickValues, XAxisLabel,

		// Key...
		hasKey, keyLabel,
	};
};

export {createBarStats as default, createBarColorStacks, enrichParams, findMaxTotalBarStacks};
