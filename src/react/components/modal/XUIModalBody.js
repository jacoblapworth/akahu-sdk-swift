import React from 'react';
import cn from 'classnames';
import { propTypes, defaultProps } from './private/props';

export default function XUIModalBody({ className, children, defaultLayout }) {
	const classNames = cn(
		'xui-modal--body',
		className,
		{ 'xui-padding-horizontal-large': defaultLayout }
	);

	return (
		<div className={classNames}>
			{children}
		</div>
	);
}

XUIModalBody.propTypes = propTypes;
XUIModalBody.defaultProps = defaultProps;
