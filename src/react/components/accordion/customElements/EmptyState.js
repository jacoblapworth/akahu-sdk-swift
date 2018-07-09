import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import listIconPath from '@xero/xui-icon/icons/list';
import XUIIcon from '../../icon/XUIIcon';
import {ns} from "../../helpers/xuiClassNamespace";

export default class XUIAccordionItemEmptyState extends PureComponent {
	render() {
		const { children, iconPath, qaHook } = this.props;

		return (
			<div data-automationid={qaHook} className={`${ns}-textcolor-muted ${ns}-accordionitem-new--emptystate`}>
				<XUIIcon size="large" path={iconPath} />
				<div>{children}</div>
			</div>
		);
	}
}

XUIAccordionItemEmptyState.propTypes = {
	qaHook: PropTypes.string,
	children: PropTypes.node,
	// Path of an icon, consumed by XUIIcon
	iconPath: PropTypes.string,
};

XUIAccordionItemEmptyState.defaultProps = {
	children: 'Nothing available to show',
	iconPath: listIconPath,
};
