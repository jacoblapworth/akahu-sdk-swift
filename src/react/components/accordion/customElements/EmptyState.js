import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import XUIIcon from '../../icon/XUIIcon';
import { ns } from '../../helpers/xuiClassNamespace';

export default class XUIAccordionItemEmptyState extends PureComponent {
	render() {
		const { children, qaHook, emptyIcon } = this.props;

		return (
			<div
				data-automationid={qaHook}
				className={`${ns}-accordion--emptystate`}
			>
				<XUIIcon size="large" icon={emptyIcon} isBoxed />
				<div>{children}</div>
			</div>
		);
	}
}

XUIAccordionItemEmptyState.propTypes = {
	qaHook: PropTypes.string,
	emptyIcon: PropTypes.object,
	children: PropTypes.node,
};
