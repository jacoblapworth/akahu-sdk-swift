import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

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

XUIModalBody.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,

	/** If the modal will use the default XUI style layout */
	defaultLayout: PropTypes.bool
};

XUIModalBody.defaultProps = {
	defaultLayout: true,
};
