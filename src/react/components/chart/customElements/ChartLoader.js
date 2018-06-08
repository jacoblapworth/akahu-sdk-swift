import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import cn from 'classnames';
import XUILoader from '../../loader/XUILoader';
import {CHART_HEIGHT} from '../helpers/constants';

class ChartLoader extends Component {
	render = () => {
		const {height: chartHeight = CHART_HEIGHT} = this.props;
		const chartClassName = cn('xui-chart', `xui-chart-is-loading`);

		return (
			<div
				className={chartClassName}
				style={{height: `${chartHeight}px`}}>
				<XUILoader label={ 'Loading' } />
			</div>
		);
	};
}

export default ChartLoader;
