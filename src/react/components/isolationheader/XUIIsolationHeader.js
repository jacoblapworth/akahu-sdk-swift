import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import cn from 'classnames';

export default class XUIIsolationHeader extends PureComponent {
	render() {
		const header = this;
		const {
			qaHook,
			className,
			isPositionFixed,
			children
		} = header.props;

		const classNames = cn(
			className,
			'xui-isolationheader',
			{
				'xui-u-position-fixed': isPositionFixed
			}
		);

		return (
			<div className={classNames} data-automationid={qaHook}>
				{children}
			</div>
		);
	}
}

XUIIsolationHeader.propTypes = {
	className: PropTypes.string,
	qaHook: PropTypes.string,

	/** Applies fixed positioning so the isolation mode header scrolls with the page */
	isPositionFixed: PropTypes.bool
};
