import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import cn from 'classnames';
import {ns} from "../helpers/xuiClassNamespace";

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
			`${ns}-isolationheader`,
			isPositionFixed && `${ns}-u-position-fixed`
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
