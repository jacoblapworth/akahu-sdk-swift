import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { pickitemClassName, itemBodyClassName, itemTextClassName } from '../private/constants';

/**
 * INTERNAL USE ONLY
 *
 * This presentation component is used internally in the XUI library to display the
 * contents of a Pickitem, when not multiselect.
 *
 * @param {Object} props
 */
const PickitemBody = ({
	onClick,
	onKeyDown,
	shouldTruncate,
	onMouseOver,
	href,
	children,
	target,
	qaHook,
	tabIndex,
	primaryElement,
	secondaryElement,
	pinnedElement,
	leftElement,
	rightElement,
}) => {
	const rel = target ? 'noopener noreferrer' : null;
	const childProps = {
		className: itemBodyClassName,
		onClick,
		onKeyDown,
		onMouseOver,
		rel,
		tabIndex,
	};

	const textClassName = cn(
		itemTextClassName,
		shouldTruncate && `${pickitemClassName}-text-truncated`,
	);

	const Tag = href ? 'a' : 'button';
	const elementSettings = href ? { ...{ href, target } } : { type: 'button' };

	return (
		<Tag {...elementSettings} data-automationid={qaHook} {...childProps}>
			{leftElement}
			<span className={textClassName}>
				{primaryElement}
				{children}
				{secondaryElement}
			</span>
			{pinnedElement}
			{rightElement}
		</Tag>
	);
};

PickitemBody.propTypes = {
	children: PropTypes.node,
	href: PropTypes.string,
	checkboxClassName: PropTypes.string,
	onClick: PropTypes.func,
	onKeyDown: PropTypes.func,
	onMouseOver: PropTypes.func,
	target: PropTypes.string,
	shouldTruncate: PropTypes.bool,
	qaHook: PropTypes.string,
	tabIndex: PropTypes.string,
	/** Standard text */
	primaryElement: PropTypes.node,
	/** Less important text to appear beside primary. */
	secondaryElement: PropTypes.node,
	/** Less important text to appear pinned at the right. */
	pinnedElement: PropTypes.node,
	/** Content to be added to the left of the pickitem. */
	leftElement: PropTypes.node,
	/** Content to be added to the right of the pickitem. */
	rightElement: PropTypes.node,
};

export default PickitemBody;
