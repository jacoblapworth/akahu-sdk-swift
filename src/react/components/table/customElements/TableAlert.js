import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { NAME_SPACE } from '../helpers/constants';
import { ns } from '../../helpers/xuiClassNamespace';

export default class TableAlert extends PureComponent {
	render = () => {
		const { children, qaHook } = this.props;
		return (
			<div
				className={cn(
					`${ns}-u-flex`,
					`${ns}-u-flex-align-center`,
					`${ns}-u-flex-justify-center`,
					`${NAME_SPACE}--alert`,
				)}
				data-automationid={qaHook}
			>
				{children}
			</div>
		);
	};
}

TableAlert.propTypes = {
	children: PropTypes.node,
	qaHook: PropTypes.string,
};
