import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default function XUIModalBody({ className, children, qaHook }) {
	const classNames = cn(
		'xui-modal--body',
		className
	);

	return (
		<div className={classNames} data-automationid={qaHook}>
			{children}
		</div>
	);
}

XUIModalBody.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string
};

XUIModalBody.defaultProps = {
	defaultLayout: true,
};
