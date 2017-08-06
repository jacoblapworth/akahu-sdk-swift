import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default function XUIModalFooter({ className, children, defaultLayout }) {
	const classNames = cn(
		'xui-modal--footer',
		className,
		{ ['xui-padding-large'] : defaultLayout }
	);

	return (
		<footer className={classNames}>
			{children}
		</footer>
	);
}

XUIModalFooter.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,

	/** If the modal will use the default XUI style layout */
	defaultLayout: PropTypes.bool
};

XUIModalFooter.defaultProps = {
	defaultLayout: true,
};
