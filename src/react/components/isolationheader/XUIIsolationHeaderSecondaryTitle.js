import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default class XUIIsolationHeaderSecondaryTitle extends PureComponent {
	render() {
		const {children, className, qaHook, title} = this.props;
		const classNames = cn(
			className,
			'xui-heading',
			'xui-text-deemphasis',
			'xui-margin-vertical-none',
			'xui-padding-right-small',
			'xui-text-truncated'
		);
		return (
			<h2 title={title} className={classNames} data-automationid={qaHook}>
				{children}
			</h2>
		);
	}
}

XUIIsolationHeaderSecondaryTitle.propTypes = {
	className: PropTypes.string,
	qaHook: PropTypes.string,
	children: PropTypes.node,

	/** The value of the title attribute */
	title: PropTypes.string
};
