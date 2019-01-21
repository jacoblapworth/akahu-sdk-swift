import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

const baseClass = `${ns}-overview`;

export default class XUIOverviewBlock extends PureComponent {
	render() {
		const {
			qaHook,
			children,
			className,
			hasLayout,
			...spreadProps
		} = this.props;
		const classes = cn(baseClass, className, hasLayout && `${baseClass}-layout`);

		return (
			<div {...spreadProps} className={classes} data-automationid={qaHook}>
				{children}
			</div>
		);
	}
}

XUIOverviewBlock.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,
	/**
	 * Applies default layout styling.
	 */
	hasLayout: PropTypes.bool,
};

XUIOverviewBlock.defaultProps = {
	hasLayout: true,
};
