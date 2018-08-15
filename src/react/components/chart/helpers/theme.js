import { VictoryTheme } from 'victory';
import {
	CHART_FONT_SMALL,
	CHART_FONT_FAMILY,
	CHART_FONT_COLOR,
	GRID_COLOR,
	BAR_ODD_COLOR,
	BAR_EVEN_COLOR,
} from './constants';

const baseFontTheme = {
	fill: CHART_FONT_COLOR,
	fontFamily: CHART_FONT_FAMILY,
	fontSize: CHART_FONT_SMALL,
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

baseChartTheme.axis.style.axis = {
	...baseChartTheme.axis.style.axis,
	...axisLineTheme,
};

baseChartTheme.axis.style.axisLabels = {
	...baseChartTheme.axis.style.axisLabels,
	...baseFontTheme,
};

baseChartTheme.axis.style.grid = {
	...baseChartTheme.axis.style.grid,
	...gridTheme,
};

baseChartTheme.axis.style.tickLabels = {
	...baseChartTheme.axis.style.tickLabels,
	...baseFontTheme,
};

baseChartTheme.bar = {
	...baseChartTheme.bar,
	colorScale: [BAR_ODD_COLOR, BAR_EVEN_COLOR],
};

const barChartTheme = { ...baseChartTheme };

export { baseChartTheme as default, barChartTheme, baseFontTheme, axisLineTheme };
