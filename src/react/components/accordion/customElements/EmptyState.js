import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import listIconPath from '@xero/xui-icon/icons/list';
import XUIIcon from '../../icon/XUIIcon';
import {ns} from "../../helpers/xuiClassNamespace";

export default class EmptyState extends PureComponent {
	render() {
		const { children, qaHook } = this.props;

		return (
			<div
				data-automationid={qaHook}
				className={`${ns}-textcolor-muted ${ns}-accordionitem-new--emptystate`}>
				<XUIIcon
					size="large"
					path={listIconPath}
				/>
				<div>{children}</div>
			</div>
		);
	}
}

EmptyState.propTypes = {
	qaHook: PropTypes.string,
	children: PropTypes.node,
};

EmptyState.defaultProps = {
	children: 'Nothing available to show',
};
