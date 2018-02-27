import React, {PureComponent} from 'react';
import cn from 'classnames';
import PropTypes from "prop-types";

export default class XUIIsolationHeaderActions extends PureComponent {
	render() {
		const {className, qaHook, children} = this.props;
		return (
			<div className={cn('xui-isolationheader--actions', className)} data-automationid={qaHook}>{children}</div>
		);
	}
}

XUIIsolationHeaderActions.propTypes = {
	children: PropTypes.any,
	qaHook: PropTypes.string,
	className: PropTypes.string
};
