import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {baseClass} from './constants';

export default function XUIRadioGroup ({ children, className, qaHook }) {
	const classes = cn(className, `${baseClass}-group`);
	return (
		<div className={classes} data-automationid={qaHook}>
			{children}
		</div>
	);
}

XUIRadioGroup.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string
};
