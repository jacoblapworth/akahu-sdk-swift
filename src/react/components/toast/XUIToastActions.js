import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { baseClass } from './private/constants';
import XUIActions from '../structural/XUIActions';

export default function XUIToastActions({
	className,
	children,
	qaHook,
	primaryAction,
	secondaryAction,
}) {
	const numberOfChildren = React.Children.count(children);
	const limitedChildren = numberOfChildren > 2 ? children.slice(0, 2) : children;
	const classNames = cn(className, `${baseClass}--actions`);

	return (
		<XUIActions
			hasLayout={false}
			className={classNames}
			primaryAction={primaryAction}
			secondaryAction={secondaryAction}
			qaHook={qaHook}
		>

			{limitedChildren}

		</XUIActions>
	);
}

XUIToastActions.propTypes = {
	/** Adds optional class to wrapping component */
	className: PropTypes.string,
	/** Adds QA hook to wrapping component */
	qaHook: PropTypes.string,
	/** Pass in a XUIToastAction as a primary action  */
	primaryAction: PropTypes.node,
	/** Pass in a XUIToastAction as a secondary action */
	secondaryAction: PropTypes.node,
	/** Old API. Accepts anything but typically only XUIToastAction components are used.
	 * Cannot accept more than two components */
	children: (props, propName) =>
		((React.Children.count(props.children) > 2)
			? new Error(`${propName} needs to be a maximum length of two actions`)
			: null),
};
