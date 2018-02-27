import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import cn from 'classnames';

export default class XUIIsolationHeaderTitle extends PureComponent {
	render() {
		const {children, className, qaHook} = this.props;
		const classNames = cn(
			className,
			'xui-heading',
			'xui-margin-right-small',
			'xui-margin-vertical-none',
			'xui-text-truncated'
		);
		return (
			<h2 className={classNames} data-automationid={qaHook}>
				{children}
			</h2>
		);
	}
}

XUIIsolationHeaderTitle.propTypes = {
	className: PropTypes.string,
	qaHook: PropTypes.string,
	children: PropTypes.node
};
