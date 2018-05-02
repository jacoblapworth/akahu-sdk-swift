import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {baseClass} from './constants';

export default function XUIRadioGroup ({ children, className, qaHook, groupLabel }) {
	const classes = cn(className, `${baseClass}-group`);
	return (
		<div className={classes} data-automationid={qaHook} role="radiogroup" aria-label={groupLabel}>
			{children}
		</div>
	);
}

XUIRadioGroup.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,
	/** Label the radio group for accessibility. Highly recommended */
	groupLabel: PropTypes.string
};
