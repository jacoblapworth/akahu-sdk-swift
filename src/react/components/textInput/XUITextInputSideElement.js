import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';
import { sideElementBaseClass } from './private/constants';

const alignmentClasses = {
	top: `${ns}-u-flex-align-start`,
	center: `${ns}-u-flex-align-center`,
	bottom: `${ns}-u-flex-align-end`,
};

const typeClasses = {
	text: `${sideElementBaseClass}-text`,
	icon: `${sideElementBaseClass}-icon`,
	button: `${sideElementBaseClass}-button`,
	avatar: `${sideElementBaseClass}-avatar`,
	pill: `${sideElementBaseClass}-pill`,
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

		const classes = cn(
			sideElementBaseClass,
			className,
			alignmentClasses[alignment],
			typeClasses[type],
			backgroundColor && `${sideElementBaseClass}-${backgroundColor}`,
			backgroundColor && `${sideElementBaseClass}-has-background`,
		);

		return (
			<div className={classes} data-automationid={qaHook}>
				{children}
			</div>
		);
	}
}

XUITextInputSideElement.propTypes = {
	children: PropTypes.node,
	qaHook: PropTypes.string,
	/** Classes to apply to the container element */
	className: PropTypes.string,
	/** The background colour for the side element - should only be used with
	 * icons where appropriate */
	backgroundColor: PropTypes.string,
	/** Vertical alignment of the content */
	alignment: PropTypes.oneOf(['top', 'center', 'bottom']),
	/** Type of the contents being used */
	type: PropTypes.oneOf(Object.keys(typeClasses)),
};

XUITextInputSideElement.defaultProps = {
	alignment: 'top',
	type: 'icon',
};
