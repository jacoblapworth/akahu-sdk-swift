import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import cn from 'classnames';
import ChartScaffold from './customElements/ChartScaffold';
import ChartLoader from './customElements/ChartLoader';
import ChartEmpty from './customElements/ChartEmpty';

class XUIBarChart extends Component {

	render = () => {
		const { props, state } = this;
		const { bars = [], isLoading } = props;
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
