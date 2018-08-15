import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIButton from '../button/XUIButton';
import { baseClass } from './private/constants';

export default function XUIToastAction({
	className,
	href,
	qaHook,
	children,
	...props
}) {
	return (
		<XUIButton
			{...props}
			isLink={!!href}
			href={href}
			variant="link"
			size="small"
			className={cn(className, `${baseClass}--action`)}
			qaHook={qaHook}
		>
			{children}
		</XUIButton>
	);
}

XUIToastAction.propTypes = {
	/** Adds optional class to wrapping component */
	className: PropTypes.string,
	/** Adds QA hook to wrapping component */
	qaHook: PropTypes.string,
	/** Facility to pass in custom children */
	children: PropTypes.node,
	/** Turns the button into a link and gives it the href you provide */
	href: PropTypes.string,
	/** Typically internal prop that, when used with the new XUIActions component,
	 * removes the extra `<ul>` wrapping element */
	usesActions: PropTypes.bool,
};
