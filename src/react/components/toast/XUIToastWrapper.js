import React from 'react';
import PropTypes from 'proptypes';
import cn from 'classnames';

export default function XUIToastWrapper({ className, qaHook, children }) {
	const classNames = cn(className, 'xui-toast-wrapper');

	return (
		<div data-automationid={qaHook} className={classNames}>
			{children}
		</div>
	);
}

XUIToastWrapper.propTypes = {
	className: PropTypes.string,
	qaHook: PropTypes.string,
	children: PropTypes.node
};
