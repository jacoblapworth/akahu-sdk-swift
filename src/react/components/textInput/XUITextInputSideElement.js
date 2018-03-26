import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {ns} from "../helpers/xuiClassNamespace";
import {baseClass} from "./private/constants";

const alignmentClasses = {
	top: `${ns}-u-flex-align-start`,
	center: `${ns}-u-flex-align-center`,
	bottom: `${ns}-u-flex-align-end`
};

const typeClasses = {
	text: `${baseClass}--side-element-text`,
	icon: `${baseClass}--side-element-icon`,
	button: `${baseClass}--side-element-button`,
	avatar: `${baseClass}--side-element-avatar`,
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

		const sideElementClassName = `${baseClass}--side-element`;

		const classes = cn(
			sideElementClassName,
			className,
			alignmentClasses[alignment],
			typeClasses[type],
			backgroundColor && `${sideElementClassName}-${backgroundColor}`,
			backgroundColor && `${sideElementClassName}-has-background`
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
