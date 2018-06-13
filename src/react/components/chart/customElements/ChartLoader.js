import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUILoader from '../../loader/XUILoader';
import {NAME_SPACE} from '../helpers/constants';

class ChartLoader extends Component {
	render = () => {
		const {height: chartHeight} = this.props;
		const chartClassName = cn(`${NAME_SPACE}-chart`, `${NAME_SPACE}-chart-is-loading`);

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

ChartLoader.propTypes = {
	height: PropTypes.number,
};
