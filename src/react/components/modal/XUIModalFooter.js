import React from 'react';
import cn from 'classnames';
import { propTypes, defaultProps } from './private/props';

export default function XUIModalFooter({ className, children, defaultLayout }) {
	const classNames = cn(
		'xui-modal--footer',
		className,
		{ ['xui-padding-large'] : defaultLayout }
	);

	return (
		<div className={classNames}>
			{children}
		</div>
	);
}

XUIModalFooter.propTypes = propTypes;
XUIModalFooter.defaultProps = defaultProps;
