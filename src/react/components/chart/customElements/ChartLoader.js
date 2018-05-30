import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import cn from 'classnames';
import XUILoader from '../../loader/XUILoader';

class ChartLoader extends Component {

	render = () => {

		const chartClassName = cn('xui-chart', `xui-chart-is-loading`);

		return (
			<div className={chartClassName}>
				<XUILoader label={ 'Loading' } />
			</div>
		);
	};
}

export default ChartLoader;
