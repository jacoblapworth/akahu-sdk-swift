import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames'
import XUIIcon from '../../icon/XUIIcon';
import tablePathData from '@xero/xui-icon/icons/table';

export default class EmptyState extends PureComponent {
	render = () => {

		const className = cn(
			'xui-u-flex',
			'xui-u-flex-horizontallycentered',
			'xui-u-flex-verticallycentered',
			'xui-u-flex-vertical',
			'xui-textcolor-muted',
		);

		return (
			<div className={className}>
				<XUIIcon
					path={tablePathData}
					size="large"
				/>
				<div>{this.props.children}</div>
			</div>
		);
	};
}

EmptyState.propTypes = {
	children: PropTypes.string,
};
