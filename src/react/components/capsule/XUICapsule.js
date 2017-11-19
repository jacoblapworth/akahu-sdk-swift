import React from 'react'
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIButton from '../button/XUIButton';

export default function XUICapsule({
	className,
	href,
	target,
	children,
	isLink,
	onClick,
	isValid,
	onFocus,
	onBlur,
}) {
	const isInteractive = (href != null || typeof onClick === 'function');

	return (
		<XUIButton
			className={cn(className,
				`xui-capsule`,
				{
					'xui-capsule-interactive' : isInteractive,
					'xui-capsule-invalid' : !isValid,
				}
			)}
			href={href}
			isLink={isLink}
			target={target}
			variant="unstyled"
			onFocus={onFocus}
			onBlur={onBlur}
			onClick={onClick}
		>
			{children}
		</XUIButton>
	);
}

XUICapsule.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	/** The `href` attribute to use of the anchor element */
	href: PropTypes.string,
	/** The target attribute specifies where to open the linked document */
	target: PropTypes.string,
	/** Whether or not to render this button using an <a> tag */
	isLink: PropTypes.bool,
	/** Whether the element is valid (does not contain invalid formula, etc) */
	isValid: PropTypes.bool,
	/** Bind a function to fire when the button is clicked */
	onClick: PropTypes.func,
	/** Bind a function to fire when the focus moves off the element */
	onFocus: PropTypes.func,
	/** Bind a function to fire when the focus moves onto the element */
	onBlur: PropTypes.func,
}

XUICapsule.defaultProps = {
	isValid: true,
	isLink: true
};
