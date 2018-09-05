import { VictoryTheme } from 'victory';
import {
	CHART_FONT_SMALL,
	CHART_FONT_FAMILY,
	CHART_FONT_COLOR,
	X_AXIS_FONT_COLOR,
	GRID_COLOR,
	BAR_ODD_COLOR,
	BAR_EVEN_COLOR,
} from './constants';

const baseFontTheme = {
	fill: CHART_FONT_COLOR,
	fontFamily: CHART_FONT_FAMILY,
	fontSize: CHART_FONT_SMALL,
};

const xAxisFontTheme = {
	...baseFontTheme,
	fill: X_AXIS_FONT_COLOR,
};

const axisLineTheme = {
	fill: 'transparent',
	stroke: 'transparent',
	strokeWidth: 0,
};

const gridTheme = {
	fill: 'transparent',
	stroke: GRID_COLOR,
	strokeWidth: 1,
};

const baseChartTheme = { ...VictoryTheme.grayscale };

baseChartTheme.bar = {
	...baseChartTheme.bar,
	colorScale: [BAR_ODD_COLOR, BAR_EVEN_COLOR],
};

baseChartTheme.axis.style.axis = {
	...baseChartTheme.axis.style.axis,
	...axisLineTheme,
};

baseChartTheme.axis.style.axisLabel = {
	...baseChartTheme.axis.style.axisLabel,
	...xAxisFontTheme,
};

baseChartTheme.axis.style.grid = {
	...baseChartTheme.axis.style.grid,
	...gridTheme,
};

baseChartTheme.axis.style.tickLabels = {
	...baseChartTheme.axis.style.tickLabels,
	...baseFontTheme,
};

const barChartTheme = { ...baseChartTheme };

export { baseChartTheme as default, barChartTheme, baseFontTheme, axisLineTheme, xAxisFontTheme };
