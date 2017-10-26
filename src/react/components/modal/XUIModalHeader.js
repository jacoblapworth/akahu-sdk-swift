import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default function XUIModalHeader({ className, children, defaultLayout }) {
	const classNames = cn(
		'xui-modal--header',
		'xui-modal--heading',
		{ 'xui-padding-left-large': defaultLayout },
		className
	);
	return (
		<header className={classNames}>
			{children}
		</header>
	);
}

XUIModalHeader.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,

	/** If the modal will use the default XUI style layout */
	defaultLayout: PropTypes.bool
};

XUIModalHeader.defaultProps = {
	defaultLayout: true,
};
