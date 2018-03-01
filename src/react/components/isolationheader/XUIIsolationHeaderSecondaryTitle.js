import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default class XUIIsolationHeaderSecondaryTitle extends PureComponent {
	render() {
		const {children, className, qaHook} = this.props;
		const classNames = cn(
			className,
			'xui-heading-medium',
			'xui-text-deemphasis',
			'xui-margin-vertical-none',
			'xui-padding-right-small',
			'xui-text-truncated'
		);
		return (
			<h3 className={classNames} data-automationid={qaHook}>
				{children}
			</h3>
		);
	}
}

XUIIsolationHeaderSecondaryTitle.propTypes = {
	className: PropTypes.string,
	qaHook: PropTypes.string,
	children: PropTypes.node
};
