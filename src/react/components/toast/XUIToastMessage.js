import React from 'react';
import PropTypes from 'proptypes';
import cn from 'classnames';

export default function XUIToastMessage({ className, children }) {
	const classNames = cn(className, 'xui-toast--message');

	return (
		<p className={classNames}>
			{children}
		</p>
	);
}

XUIToastMessage.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node
};
