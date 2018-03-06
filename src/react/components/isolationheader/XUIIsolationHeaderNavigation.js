import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default class XUIIsolationHeaderNavigation extends PureComponent {
	render() {
		const {className, qaHook, children} = this.props;
		return (
			<div className={cn('xui-isolationheader--navigation', className)} data-automationid={qaHook}>{children}</div>
		);
	}
}

XUIIsolationHeaderNavigation.propTypes = {
	children: PropTypes.any,
	qaHook: PropTypes.string,
	className: PropTypes.string
};
