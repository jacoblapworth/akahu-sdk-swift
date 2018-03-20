import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const baseClass = "xui-actions";

export default class XUIActions extends PureComponent {
	render() {
		const {
			className,
			children,
			hasLayout,
			isLinear,
			primaryAction,
			secondaryAction,
			...otherProps
		} = this.props;
		const classes = cn(baseClass, className,
			{
				"xui-actions-layout": hasLayout,
				"xui-actions-linear": isLinear
			}
		);

		const clonedPrimary = primaryAction && React.cloneElement(primaryAction, {
			className: `${baseClass}--primary`
		});

		const clonedSecondary = secondaryAction && React.cloneElement(secondaryAction, {
			className: `${baseClass}--secondary`
		});

		return (
			<div className={classes} {...otherProps}>
				{children}
				{clonedPrimary}
				{clonedSecondary}
			</div>
		)
	}
}

XUIActions.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	/**
	 * Applies standard layout settings. Defaults to true
	 */
	hasLayout: PropTypes.bool,
	/**
	 * Splits buttons to left and right for a linear flow. Can be combined with hasLayout
	 */
	isLinear: PropTypes.bool,
	/**
	 * XUIButton to style as primary. Alternately, pass in all the children
	 */
	primaryAction: PropTypes.element,
	/**
	 * XUIButton to style as secondary
	 */
	secondaryAction: PropTypes.element
};

XUIActions.defaultProps = {
	hasLayout: true
};
