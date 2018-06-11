import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import cn from 'classnames';
import {CHART_HEIGHT} from '../helpers/constants';

class ChartEmpty extends Component {
	render = () => {
		const {emptyStateComponent, emptyMessage = 'There is no data to display', height: chartHeight = CHART_HEIGHT} = this.props;
		const emptyHeight = chartHeight * 0.75;
		const chartClassName = cn('xui-chart', `xui-chart-is-empty`, 'xui-text-align-center');

		return (
			<div
				className={chartClassName}
				style={{minHeight: `${emptyHeight}px`}}>

				{emptyStateComponent || (
					<div className="xui-chart--empty">
						<svg
							className="xui-icon xui-icon-large"
							viewBox="0 0 30 30">
							<path d="M20,20.5h2v1H8v-1h2v-7c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1v7h2v-11c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1V20.5z"/>
						</svg>
						<div>{emptyMessage}</div>
					</div>
				)}

			</div>
		);
	};
}

export default ChartEmpty;
