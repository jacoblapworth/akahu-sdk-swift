import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIIcon from '../../icon/XUIIcon';
import {CHART_HEIGHT, NAME_SPACE} from '../helpers/constants';

const chartPathData = 'M20,20.5h2v1H8v-1h2v-7c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1v7h2v-11c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1V20.5z';

class ChartEmpty extends Component {
	render = () => {
		const {emptyStateComponent, emptyMessage = 'There is no data to display', height: chartHeight = CHART_HEIGHT} = this.props;
		const emptyHeight = chartHeight * 0.75;
		const chartClassName = cn(`${NAME_SPACE}-chart`, `${NAME_SPACE}-chart-is-empty`);

		return (
			<div
				className={chartClassName}
				style={{minHeight: `${emptyHeight}px`}}>

				{emptyStateComponent || (
					<div className={`${NAME_SPACE}-chart--empty`}>
						<XUIIcon path={chartPathData}/>
						<div>{emptyMessage}</div>
					</div>
				)}

			</div>
		);
	};
}

export default ChartEmpty;
