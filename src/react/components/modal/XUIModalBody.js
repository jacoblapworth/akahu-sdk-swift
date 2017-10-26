import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default function XUIModalBody({ className, children }) {
	const classNames = cn(
		'xui-modal--body',
		className
	);

	return (
		<div className={classNames}>
			{children}
		</div>
	);
}

XUIModalBody.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

XUIModalBody.defaultProps = {
	defaultLayout: true,
};
