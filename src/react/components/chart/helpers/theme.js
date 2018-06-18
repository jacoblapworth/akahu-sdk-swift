import {VictoryTheme} from 'victory';
import {LABEL_FONT_SMALL} from './constants';

const baseFontTheme = {
	fill: '#657483',
	fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
	fontSize: LABEL_FONT_SMALL
};

const axisLineTheme = {
	fill: 'transparent',
	stroke: 'transparent',
	strokeWidth: 0
};

const gridTheme = {
	fill: 'transparent',
	stroke: '#EBEDEF',
	strokeWidth: 1
};

const baseChartTheme = {...VictoryTheme.grayscale};

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

baseChartTheme.bar = {
	...baseChartTheme.bar,
	colorScale: ['#32465A', '#67BBEB'],
};

const barChartTheme = {...baseChartTheme};

export {baseChartTheme as default, barChartTheme, baseFontTheme, axisLineTheme};
