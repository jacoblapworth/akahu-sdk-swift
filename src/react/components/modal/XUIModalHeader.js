import React from 'react';
import cn from 'classnames';
import { propTypes, defaultProps } from './private/props';

export default function XUIModalHeader({ className, children, defaultLayout }) {
	const classNames = cn(
		'xui-modal--header',
		{ 'xui-padding-left-large': defaultLayout },
		className
	);
	return (
		<div className={classNames}>
			{children}
		</div>
	);
}

XUIModalHeader.propTypes = propTypes;
XUIModalHeader.defaultProps = defaultProps;
