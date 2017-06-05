import React from 'react';
import PropTypes from 'proptypes';
import cn from 'classnames';

export default function XUIToastActions({ className, children }) {
	const classNames = cn(className, 'xui-toast--actions');

	return (
		<ul className={classNames}>
			{children}
		</ul>
	);
}

XUIToastActions.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node
};
