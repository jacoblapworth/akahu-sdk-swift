import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import ChartScaffold from './customElements/ChartScaffold';
import ChartLoader from './customElements/ChartLoader';
import ChartEmpty from './customElements/ChartEmpty';

/*

TODO:

+ Custom namespace
	+ JS
	+ CSS

+ Remane all params to be consistent
	+ API props
	+ generic global params
	+ props for internal components

+ Theme
  + Merge CHART_HEIGHT / ACTIVE_COLOR etc into theme

+ Prettify
  + White space
  + Padding inside brackets

+ Labels
	+ An API that can differientate the different labels
	+ Avatar
	+ Plain
	  + Set up text wrapping for largest variant
	+ Reduce ? <-- ['M', 'Mon', 'Monday'] abbreviation

+ Edge Cases
  + Large numbers / heavy DP

Design:
-------
+ Active color
+ Can hide title

*/

class XUIBarChart extends Component {

	render = () => {
		const {props, state} = this;
		const {bars = [], isLoading} = props;
		const isEmpty = !bars.length;

		switch (true) {
			case isLoading: return <ChartLoader {...props} />;
			case isEmpty: return <ChartEmpty {...props} />;
			default: return <ChartScaffold {...props} />;
		}
	};
}

export default XUIBarChart;

XUIBarChart.propTypes = {};
