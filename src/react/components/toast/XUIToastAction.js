import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIButton from '../button/XUIButton';
import { baseClass } from './private/constants';
import { ns } from "../helpers/xuiClassNamespace";

const ContainerElement = ({children, qaHook, ...props}) => (
	<li
		{...props}
		className={`${baseClass}--action`}
		data-automationid={qaHook}>

		{children}

	</li>
);

export default function XUIToastAction({
	className,
	href,
	qaHook,
	usesActions,
	children,
	...props
}) {

	const isLink = !!href;
	const buttonQaHook = qaHook && `${qaHook}-button`;

	const customToastButton = (
		<XUIButton
			{...props}
			isLink={isLink}
			href={href}
			variant="link"
			size="small"
			className={className}
			qaHook={buttonQaHook}>

			{children}

		</XUIButton>
	);

	if (usesActions) {
		return customToastButton;
	} else {
		return (
			<ContainerElement qaHook={qaHook} {...props}>
				{customToastButton}
			</ContainerElement>
		)
	}

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
	/** Typically internal prop that, when used with the new XUIActions component, removes the extra `<ul>` wrapping element */
	usesActions: PropTypes.bool
};
