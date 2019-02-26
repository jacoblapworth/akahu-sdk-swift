import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import XUIButtonGroup from './XUIButtonGroup';
import { sizeClassNames, variantClassNames } from './private/constants';

export default function XUISplitButtonGroup({
	children,
	className,
	isDisabled,
	size,
	variant,
	qaHook,
}) {
	const cloneProps = { isDisabled, variant };
	return (
		<XUIButtonGroup className={className} data-automationid={qaHook} size={size}>
			{Children.map(children, child => cloneElement(child, cloneProps))}
		</XUIButtonGroup>
	);
}

XUISplitButtonGroup.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,

	/** Determines if the button is disabled or not. */
	isDisabled: PropTypes.bool,

	/**
	 * Modifier for the size of the split button. `medium`, `small`, or `xsmall`.
	*/
	size: PropTypes.oneOf(Object.keys(sizeClassNames)),

	/** Determines what the purpose of this button is. `standard`, `primary`, `create`,
	 * `negative`, `link` or `unstyled`. */
	variant: PropTypes.oneOf(Object.keys(variantClassNames)),
};

XUISplitButtonGroup.defaultProps = {
	variant: 'standard',
};
