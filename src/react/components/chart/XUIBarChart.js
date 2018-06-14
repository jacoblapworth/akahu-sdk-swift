import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CHART_HEIGHT} from './helpers/constants';
import ChartScaffold from './customElements/ChartScaffold';
import ChartLoader from './customElements/ChartLoader';
import ChartEmpty from './customElements/ChartEmpty';

/*

TODO:

+ XUI icon new table version

+ Next / Previous button titles

+ QA Hooks

+ Remove inline styles

+ Group wrapper components

Design:
-------


*/

class XUIBarChart extends Component {

	render = () => {
		const {props} = this;
		const {barsData = [], isLoading} = props;
		const isEmpty = !barsData.length;

		switch (true) {
			case isLoading: return <ChartLoader {...props} />;
			case isEmpty: return <ChartEmpty {...props} />;
			default: return <ChartScaffold {...props} />;
		}
	};
}

export default XUIBarChart;

XUIBarChart.propTypes = {

	/** Unique identifier for the chart. */
	chartId: PropTypes.string.isRequired,

	/** Chart title for presentation and / or accessibility purposes. */
	chartTitle: PropTypes.string.isRequired,

	/** Hide title visually (still represented in HTML for accessibility). */
	isChartTitleHidden: PropTypes.bool,

	/** Chart description for enhanced accessibility. */
	chartDescription: PropTypes.string,

	/** Specify the charts height in pixels */
	chartHeight: PropTypes.number,

	/** Identify if the bar made out of multiple smaller stacked bars. */
	isStacked: PropTypes.bool,

	/** A text of representation of the bar or each bar stack. */
	keyLabel: PropTypes.oneOfType([
		/** Single label for standard bar. */
		PropTypes.string,
		/** Multiple labels for stacked bar. */
    PropTypes.arrayOf(PropTypes.string),
	]),

	/** Key title inside the dropdown container. */
	keyTitle: PropTypes.string,

	/** Bar data consisting of an x-axis label and y-axis value(s). */
	barsData: PropTypes.arrayOf(PropTypes.shape({

		/** Unique identifier for an individual bar. */
		id: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
		]),

		/** X-axis label (in the correct format for the "xAxisType") */
		x: PropTypes.string,

		/** Y-axis value(s) */
		y: PropTypes.oneOfType([
			/** Single value for standard bar. */
			PropTypes.number,
			/** Multiple values for stacked bar. */
			PropTypes.arrayOf(PropTypes.number),
		]),

	})),

	/** Customise the default bar color with a style that can be injected into a "fill" property e.g #000 */
	barColor: PropTypes.oneOfType([
		/** Single style for standard bar. */
		PropTypes.string,
		/** Multiple styles for stacked bar. */
		PropTypes.arrayOf(PropTypes.string),
	]),

	/** Handler for when a bar "click" interaction occurs. */
	onBarClick: PropTypes.func,

	/** Identifies active bars or individual bar stacks. */
	activeBars: PropTypes.object,

	/** Function to create a customised message for when a bar "hover" interaction occurs. */
	createBarToolTipMessage: PropTypes.func,

	/** Specify the charys x-axis label format. */
	xAxisType: PropTypes.oneOf(['abbreviation', 'avatar', 'standard']),

	/** The maximum numbers of bars to distribute in the x-axis */
	xAxisVisibleItems: PropTypes.number,

	/** The maximum number to place at the top of the y-axis */
	yAxisMaxValue: PropTypes.number,

	/** Function to create a custom representation of the y-axis labels. */
	createYAxisLabelFormat: PropTypes.func,

	/** Override the native responsive scrolling behaviour for clickable pagination buttons. */
	hasPagination: PropTypes.bool,

	/** Function to create a custom pagination message based on the charts "current" and "total" pagination "panels". */
	createPaginationMessage: PropTypes.func,

	/** Customise the default pagination message. */
	emptyMessage: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
	]),

	/** Override the default pagination component. */
	emptyStateComponent: PropTypes.element,

	/** Show the charts "loading" state. */
	isLoading: PropTypes.bool,

};

XUIBarChart.defaultProps = {
	chartHeight: CHART_HEIGHT,
	keyTitle: 'Graph key',
	emptyMessage: 'There is no data to display',
	xAxisType: 'standard',
	yAxisMaxValue: 0,
};
