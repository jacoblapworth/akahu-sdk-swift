import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import listIconPath from '@xero/xui-icon/icons/list';
import XUIIcon from '../../icon/XUIIcon';
import {ns} from "../../helpers/xuiClassNamespace";

export default class XUIAccordionItemEmptyState extends PureComponent {
	render() {
		const { children, qaHook } = this.props;

		return (
			<div
				data-automationid={qaHook}
				className={`${ns}-accordion-new--emptystate`}>
				<XUIIcon size="large" path={listIconPath} />
				<div>{children}</div>
			</div>
		);
	}
}

XUIAccordionItemEmptyState.propTypes = {
	qaHook: PropTypes.string,
	children: PropTypes.node,
};

XUIAccordionItemEmptyState.defaultProps = {
	children: 'Nothing available to show',
};
