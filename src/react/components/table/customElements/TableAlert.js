import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames'
import { NAME_SPACE } from '../helpers/constants';

export default class TableAlert extends PureComponent {
	render = () => {

		const { children, qaHook } = this.props;
		const className = cn(
			'xui-u-flex',
			'xui-u-flex-verticallycentered',
			'xui-u-flex-horizontallycentered',
			`${NAME_SPACE}--alert`,
		)

		return (
			<div
				className={className}
				data-automationid={qaHook}>
				{children}
			</div>
		);
	};
}

TableAlert.propTypes = {
	children: PropTypes.node,
	qaHook: PropTypes.string,
};





