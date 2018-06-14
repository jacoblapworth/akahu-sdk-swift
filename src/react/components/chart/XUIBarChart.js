import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CHART_HEIGHT} from './helpers/constants';
import ChartScaffold from './customElements/ChartScaffold';
import ChartLoader from './customElements/ChartLoader';
import ChartEmpty from './customElements/ChartEmpty';

/*

TODO:

+ Custom namespace
	+ JS
	+ CSS

+ Remane all params to be consistent
	+ bars = barData
	+ maxVisibleItems = maxXItems
	+ createYAxisLabelFormat = createYLabel
	+ title = chartTitle
	+ description = chartDescription
	+ height = chartHeight

+ XUI icon new table version

+ Next / Previous button titles

+ Isolate active bars / stacks

+ QA Hooks

+ Remove inline styles

Design:
-------


*/

class XUIBarChart extends Component {

	render = () => {
		const {props} = this;
		const {bars = [], isLoading} = props;
		const isEmpty = !bars.length;

		console.log(props.title);

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
	id: PropTypes.string.isRequired,

	/** Chart title for presentation and / or accessibility purposes. */
	title: PropTypes.string.isRequired,

	/** Hide title visually (still represented in HTML for accessibility). */
	isTitleHidden: PropTypes.bool,

	/** Chart description for enhanced accessibility. */
	description: PropTypes.string,

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
	bars: PropTypes.arrayOf(PropTypes.shape({

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

	/** xxxxxxxxxxx */
	activeBars: PropTypes.object,

	/** Function to create a customised message for when a bar "hover" interaction occurs. */
	createBarToolTipMessage: PropTypes.func,

	/** The maximum numbers of bars to distribute in the x-axis */
	maxVisibleItems: PropTypes.number,

	/** The maximum number to place at the top of the y-axis */
	maxYValue: PropTypes.number,

	/** Function to create a custom representation of the y-axis labels. */
	createYAxisLabelFormat: PropTypes.func,

	/** Specify the charys x-axis label format. */
	xAxisType: PropTypes.oneOf(['abbreviation', 'avatar', 'standard']),

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

	/** Specify the charts height in pixels */
	height: PropTypes.number,

	/** Show the charts "loading" state. */
	isLoading: PropTypes.bool,

};

XUIBarChart.defaultProps = {
	height: CHART_HEIGHT,
	keyTitle: 'Graph key',
	emptyMessage: 'There is no data to display',
	xAxisType: 'standard',
	maxYValue: 0,
};
