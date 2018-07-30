import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import XUIIcon from '../../icon/XUIIcon';
import tablePathData from '@xero/xui-icon/icons/table';
import {ns} from "../../helpers/xuiClassNamespace";

export default class EmptyState extends PureComponent {
	render = () => {

		return (
			<div className={`${ns}-u-flex ${ns}-u-flex-justify-center ${ns}-u-flex-align-center ${ns}-u-flex-column ${ns}-textcolor-muted`}>
				<XUIIcon icon={tablePathData} size="large" isBoxed />
				<div>{this.props.children}</div>
			</div>
		);
	};
}

EmptyState.propTypes = {
	children: PropTypes.string,
};
