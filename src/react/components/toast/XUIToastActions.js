import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default function XUIToastActions({ className, children, qaHook }) {
	const classNames = cn(className, 'xui-toast--actions');
	const newChildren = React.Children.count(children) > 2 ? children.slice(0, 2) : children;

	return (
		<ul className={classNames} data-automationId={qaHook}>
			{newChildren}
		</ul>
	);
}

XUIToastActions.propTypes = {
	className: PropTypes.string,
	qaHook: PropTypes.string,
	/** Custom vaildator to error if more than once toast action is supplied */
	children: (props, propName) => {
		if (React.Children.count(props.children) > 2) {
			return new Error(`${propName} needs to be a maximum length of two actions`);
		}
	}
};
