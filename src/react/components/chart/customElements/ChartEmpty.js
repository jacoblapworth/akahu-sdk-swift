import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIButton from '../../button/XUIButton';

class ChartEmpty extends Component {

	render = () => {
		// const {} = this.props;
		const chartClassName = cn('xui-chart', `xui-chart-is-empty`, 'xui-text-align-center');

		return (
			<div className={chartClassName}>
				<h3 className="xui-heading">There is no performance data to display</h3>
				<p className="xui-heading-xsmall">This graph can be populated by you or your staff entering time</p>
				<XUIButton className="xui-margin-2xlarge" size='small'>Add a time entry</XUIButton>
			</div>
		);
	};
}

export default ChartEmpty;
