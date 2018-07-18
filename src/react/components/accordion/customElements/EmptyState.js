import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import XUIIcon from '../../icon/XUIIcon';
import {ns} from "../../helpers/xuiClassNamespace";

export default class XUIAccordionItemEmptyState extends PureComponent {
	render() {
		const { children, qaHook, emptyIconPath } = this.props;

		return (
			<div
				data-automationid={qaHook}
				className={`${ns}-accordion-new--emptystate`}>
				<XUIIcon size="large" path={emptyIconPath} />
				<div>{children}</div>
			</div>
		);
	}
}

XUIAccordionItemEmptyState.propTypes = {
	qaHook: PropTypes.string,
	emptyIconPath: PropTypes.string,
	children: PropTypes.node,
};
