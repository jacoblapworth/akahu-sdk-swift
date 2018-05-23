import { VictoryTheme } from 'victory';

const baseFontTheme = {
	fill: 'gray',
	fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
	fontSize: 11
};

const axisLineTheme = {
	fill: 'transparent',
	stroke: 'transparent',
	strokeWidth: 0
};

const gridTheme = {
	fill: 'transparent',
	stroke: 'gray',
	strokeWidth: 1
};

const baseChartTheme = { ...VictoryTheme.grayscale };

baseChartTheme.axis.style.axis = {
	...baseChartTheme.axis.style.axis,
	...axisLineTheme
};

baseChartTheme.axis.style.axisLabels = {
	...baseChartTheme.axis.style.axisLabels,
	...baseFontTheme,
};

baseChartTheme.axis.style.grid = {
	...baseChartTheme.axis.style.grid,
	...gridTheme
};

baseChartTheme.axis.style.tickLabels = {
	...baseChartTheme.axis.style.tickLabels,
	...baseFontTheme,
};

const barChartTheme = { ...baseChartTheme };

export { baseChartTheme as default, barChartTheme, baseFontTheme, axisLineTheme };
