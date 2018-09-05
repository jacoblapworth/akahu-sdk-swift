import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIIcon from '../../icon/XUIIcon';
import { NAME_SPACE } from '../helpers/constants';

const chartIcon = {
	width: 30,
	height: 30,
	// TODO: Replace with xui-icon equivalent
	path: 'M20,20.5h2v1H8v-1h2v-7c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1v7h2v-11c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1V20.5z', // eslint-disable-line max-len
};

class ChartEmpty extends PureComponent {
	render = () => {
		const {
			qaHook, emptyStateComponent, emptyMessage, chartHeight,
		} = this.props;
		const emptyHeight = chartHeight * 0.75;
		const chartClassName = cn(`${NAME_SPACE}-chart`, `${NAME_SPACE}-chart-is-empty`);

		return (
			<div
				data-automationid={qaHook && `${qaHook}--empty`}
				className={chartClassName}
				style={{ minHeight: `${emptyHeight}px` }}
			>

				{emptyStateComponent || (
					<div className={`${NAME_SPACE}-chart--empty`}>
						<XUIIcon
							icon={chartIcon}
							size="large"
						/>
						<div>{emptyMessage}</div>
					</div>
				)}

			</div>
		);
	};
}

export default ChartEmpty;

ChartEmpty.propTypes = {
	qaHook: PropTypes.string,
	emptyStateComponent: PropTypes.element,
	emptyMessage: PropTypes.string,
	chartHeight: PropTypes.number,
};
