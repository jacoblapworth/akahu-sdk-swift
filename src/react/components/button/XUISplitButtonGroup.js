import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import XUIButtonGroup from './XUIButtonGroup';
import { VariantClassNames } from './private/constants';

export default function XUISplitButtonGroup({
	children,
	className,
	isDisabled,
	variant,
	qaHook,
}) {
	const cloneProps = { isDisabled, variant };
	return (
		<XUIButtonGroup className={className} data-automationid={qaHook}>
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

	/** Determines what the purpose of this button is. `standard`, `primary`, `create`,
	 * `negative`, `link` or `unstyled`. */
	variant: PropTypes.oneOf(Object.keys(VariantClassNames)),
};

XUISplitButtonGroup.defaultProps = {
	variant: 'standard',
};
