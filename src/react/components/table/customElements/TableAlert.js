import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NAME_SPACE } from '../helpers/constants';
import {ns} from "../../helpers/xuiClassNamespace";

export default class TableAlert extends PureComponent {
	render = () => {

		const { children, qaHook } = this.props;
		return (
			<div
				className={`${ns}-u-flex ${ns}-u-flex-verticallycentered ${ns}-u-flex-horizontallycentered ${NAME_SPACE}--alert`}
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
