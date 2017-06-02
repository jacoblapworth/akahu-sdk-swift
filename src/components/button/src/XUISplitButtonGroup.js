import React, { Children, cloneElement } from 'react';
import PropTypes from "prop-types";
import XUIButtonGroup from './XUIButtonGroup';
import { ButtonDefaultProps, ButtonPropTypes } from './private/propTypes';

export default function XUISplitButtonGroup({ children, className, isDisabled, variant, qaHook }) {
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
	isDisabled: ButtonPropTypes.isDisabled,
	variant: ButtonPropTypes.variant
};

XUISplitButtonGroup.defaultProps = {
	isDisabled: ButtonDefaultProps.isDisabled,
	variant: ButtonDefaultProps.variant
};
