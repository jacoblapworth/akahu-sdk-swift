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

+ Prettify
  + White space
  + Padding inside brackets

+ XUI icon new table version

+ Next / Previous button titles

Design:
-------


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
