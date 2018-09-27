import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import tablePathData from '@xero/xui-icon/icons/table';
import cn from 'classnames';
import XUIIcon from '../../icon/XUIIcon';
import { ns } from '../../helpers/xuiClassNamespace';

export default class EmptyState extends PureComponent {
	render() {
		const {
			defaultLayout,
			className,
			children
		} = this.props;

		return (
			<div className={cn(
				defaultLayout && `${ns}-table--default-emptystate`,
				className
			)}>
				<XUIIcon icon={tablePathData} size="large" isBoxed />
				<div>{children}</div>
			</div>
		);
	}
}

EmptyState.propTypes = {
	children: PropTypes.string,
	defaultLayout: PropTypes.bool,
	className: PropTypes.string
};

EmptyState.defaultProps = {
	defaultLayout: true
};
