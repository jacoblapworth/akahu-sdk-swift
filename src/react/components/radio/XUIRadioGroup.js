import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default function XUIRadioGroup ({ children, className, qaHook }) {
	const classes = cn(className, 'xui-styledradio-group');
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
