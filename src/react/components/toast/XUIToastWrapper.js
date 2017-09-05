import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Portal from 'react-portal';

export default function XUIToastWrapper({ className, qaHook, children }) {
	const classNames = cn(className, 'xui-toastwrapper');

	return (
		<Portal isOpened={children != null && children.length > 0}>
			<div data-automationid={qaHook} className={cn(classNames, 'xui-container')}>
				{children}
			</div>
		</Portal>
	);
}

XUIToastWrapper.propTypes = {
	className: PropTypes.string,
	qaHook: PropTypes.string,
	children: PropTypes.node
};
