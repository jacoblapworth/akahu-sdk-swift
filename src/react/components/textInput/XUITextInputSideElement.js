import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const alignmentClasses = {
	top: 'xui-u-flex-align-start',
	center: 'xui-u-flex-align-center',
	bottom: 'xui-u-flex-align-end'
};

const typeClasses = {
	text: 'xui-textinput--side-element-text',
	icon: 'xui-textinput--side-element-icon',
	button: 'xui-textinput--side-element-button',
	avatar: 'xui-textinput--side-element-avatar',
};

export default class XUITextInputSideElement extends PureComponent {
	render() {
		const {
			backgroundColor,
			className,
			qaHook,
			children,
			alignment,
			type,
		} = this.props;

		const sideElementClassName = 'xui-textinput--side-element';

		const classes = cn(
			sideElementClassName,
			className,
			alignmentClasses[alignment],
			typeClasses[type],
			{
				[`${sideElementClassName}-${backgroundColor}`]: backgroundColor,
				[`${sideElementClassName}-has-background`]: backgroundColor,
			}
		);

		return (
			<div className={classes} data-automationid={qaHook}>
				{children}
			</div>
		)
	}
}

XUITextInputSideElement.propTypes = {
	children: PropTypes.node,
	qaHook: PropTypes.string,
	/** Classes to apply to the container element */
	className: PropTypes.string,
	/** The background colour for the side element - should only be used with icons where appropriate */
	backgroundColor: PropTypes.string,
	/** Vertical alignment of the content */
	alignment: PropTypes.oneOf(['top', 'center', 'bottom']),
	/** Type of the contents being used */
	type: PropTypes.oneOf(['text', 'icon', 'button', 'avatar']),
};

XUITextInputSideElement.defaultProps = {
	alignment: 'top',
	type: 'icon',
};
