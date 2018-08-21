import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUILoader from '../loader/XUILoader';
import { VariantClassNames, SizeClassNames, ButtonTypes } from './private/constants';
import { ns } from '../helpers/xuiClassNamespace';
import noop from '../helpers/noop';

/**
 * Returns true if the button is a borderless variant
 *
 * @private
 * @param {string} variant - The button variant
 * @return {boolean} True if is a borderless button
 */
const isBorderlessVariant = variant => variant.indexOf('borderless') > -1;

/**
 * Returns true if the button is an icon variant
 *
 * @private
 * @param {string} variant - The button variant
 * @return {boolean} True if is an icon button
 */
const isIconVariant = variant => variant.indexOf('icon') > -1;

/**
 * Returns a class name for the button depending on the button variant string given. Will return
 * undefined if no matching variant is given.
 *
 * @private
 * @param {string} variant - The button variant
 * @return {string} The variant specific class name
 */
const getVariantClass = variant => (
	VariantClassNames[variant] !== undefined
		? VariantClassNames[variant]
		: `${ns}-button-standard`
);

/* eslint-disable no-script-url */
/**
 * Replaces any href of `#` or undefined with `javascript:void(0)`. Else returns the passed href.
 *
 * @private
 * @param {string} href - A given link's href
 * @return {string} The href that will be assigned to a link
 */
const getHref = href => ((!href || href === '#') ? 'javascript:void(0)' : href);
/* eslint-enable no-script-url */

/**
 * KeyPress handler which will dispatch a click event when the space bar is pressed.
 *
 * @private
 * @param {KeyboardEvent} event
 * @param {Object} props
 */
function handleSpacebarAsClick(event, { isDisabled, isLoading }) {
	if (isDisabled || isLoading) {
		let shouldClick;
		if (event.key) {
			shouldClick = event.key === ' ' || event.key === 'Spacebar';
		} else {
			shouldClick = (event.keyCode || event.which) === 32;
		}

		if (shouldClick) {
			// Clicking the space bar causes scrolling by default.  No bueno for a button.
			event.preventDefault();

			// A native event needs to be dispatched to ensure that all
			// browsers will follow the link.
			// Generate a click event with the latest API, if possible.
			// Use document.createEvent for IE 11.
			let clickEvent;
			if (typeof window.Event === 'function') {
				clickEvent = new MouseEvent('click', {
					bubbles: true,
					cancelable: true,
					view: window,
					detail: 0,
					screenX: 0,
					screenY: 0,
					clientX: 0,
					clientY: 0,
					ctrlKey: false,
					altKey: false,
					shiftKey: false,
					metaKey: false,
					button: 0,
					relatedTarget: null,
				});
			} else {
				clickEvent = document.createEvent('MouseEvents');
				// If you're seeing a line through initMouseEvent because WebStorm, read the comment
				// above the if statement
				clickEvent.initMouseEvent(
					'click', true, true, window,
					0, 0, 0, 0, 0,
					false, false, false, false, 0, null,
				);
			}
			event.target.dispatchEvent(clickEvent);
		}
	}
}

/**
 * Attempt to focus the root DOM node of the given component, if the DOM node exists
 *
 * @private
 * @param {XUIButton} button
 */
const focusRootNode = button => button.rootNode != null && button.rootNode.focus();

export default class XUIButton extends React.Component {
	focus() {
		focusRootNode(this);
		// Apparently there are times when calling focus won't actually do it.  I think
		// React's getting in the way, but I'm not sure yet....
		if (this.rootNode !== document.activeElement) {
			setTimeout(focusRootNode, 0, this);
		}
	}

	hasFocus() {
		return this.rootNode == null ? false : this.rootNode.contains(document.activeElement);
	}

	render() {
		const xuiButton = this;
		const {
			type,
			variant,
			onClick,
			isDisabled,
			isLoading,
			children,
			className,
			onKeyDown,
			tabIndex,
			size,
			isGrouped,
			qaHook,
			isExternalLink,
			href,
			target,
			rel,
			isLink,
			isInverted,
			retainLayout,
			minLoaderWidth,
			...spreadProps
		} = xuiButton.props;
		const ElementType = isLink ? 'a' : 'button';
		const variantClass = getVariantClass(variant);
		const buttonDisabled = isDisabled || isLoading;
		let buttonChildren = children;

		const loader = (
			<XUILoader
				key={retainLayout && isLoading ? 'button-loader' : null}
				retainLayout={retainLayout}
				size="small"
				defaultLayout={false}
				className={`${ns}-button--loader`}
			/>
		);

		if (retainLayout && isLoading) {
			buttonChildren = [
				<div className={`${ns}-u-hidden-content`} key="button-children">{children}</div>,
				loader,
			];
		} else if (isLoading) {
			buttonChildren = loader;
		}

		const buttonClassNames = cn(
			`${ns}-button`,
			className,
			variantClass,
			SizeClassNames[size],
			isDisabled && `${ns}-button-is-disabled`,
			isGrouped && `${ns}-button-grouped`,
			(isInverted && !isIconVariant(variantClass)) &&
				(isBorderlessVariant(variantClass)
					? `${ns}-button-borderless-inverted`
					: `${ns}-button-inverted`
				),
			minLoaderWidth && `${ns}-button-min-loader-width`,
		);

		const clickHandler = (isLink && buttonDisabled)
			? event => event.preventDefault()
			: onClick || noop;

		const elementSpecificTypeProps = isLink ? {
			'onKeyPress': e => {
				handleSpacebarAsClick(e, { isDisabled, isLoading });
			},
			'href': getHref(href),
			'target': target,
			'rel': isExternalLink
				? cn(rel, 'external noopener noreferrer')
				: rel,
			'aria-disabled': isDisabled || isLoading || undefined,

			/** If this is just a plain link styled to be a button, the button role is not needed.
			 * However, if this is a link which is styled to look AND function like a button,
			 * then we'll need the role.
			 * */
			'role': !href || onClick ? 'button' : undefined,
		} : {
			type,
		};

		// Standard props for all element types
		const elementProps = {
			...spreadProps,
			onClick: clickHandler,
			onKeyDown: buttonDisabled ? null : onKeyDown,
			disabled: buttonDisabled,
			className: buttonClassNames,
			tabIndex: buttonDisabled ? -1 : tabIndex,
			...elementSpecificTypeProps,
		};

		return (
			<ElementType ref={n => xuiButton.rootNode = n} {...elementProps} data-automationid={qaHook}>
				{buttonChildren}
			</ElementType>
		);
	}
}

XUIButton.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	qaHook: PropTypes.string,

	/** Determines if the button is disabled or not. */
	isDisabled: PropTypes.bool,

	/** If true, sets appropriate `rel` values to prevent new page from having access to
	 * `window.opener`. Should be used for links pointing at external sites. */
	isExternalLink: PropTypes.bool,

	/** If true, shows a loader inside the button and also disables the button to prevent
	 * clicking. Can be used in conjunction with isDisabled (which also provides a disabled class)  */
	isLoading: PropTypes.bool,

	/** If this button is part of a parent button group */
	isGrouped: PropTypes.bool,

	/** A keydown event handler for the button */
	onKeyDown: PropTypes.func,

	/** Bind a function to fire when the button is clicked */
	onClick: PropTypes.func,

	/** Determines the styling variation to apply: `standard`, `primary`, `create`, `negative`, `link`,
	 * 'borderless-standard', 'borderless-primary', 'borderless-create', 'borderless-negative',
	 * 'borderless-negative', 'icon', 'icon-large', 'icon-inverted', 'icon-inverted-large' or
	 * `unstyled`. */
	variant: PropTypes.oneOf(Object.keys(VariantClassNames)),

	/** Modifier for the size of the button. `small`, `full-width`, or `full-width-layout`. */
	size: PropTypes.oneOf(Object.keys(SizeClassNames)),

	/** Whether or not to render this button using an <a> tag */
	isLink: PropTypes.bool,

	/** The type attribute of this button. `submit`, `button`, or `reset`. */
	type: PropTypes.oneOf(Object.keys(ButtonTypes).map(type => ButtonTypes[type])),

	/** The `href` attribute to use on the anchor element (ignored unless `isLink` is `true`) */
	href: PropTypes.string,

	/** The `rel` attribute to use on the anchor element (ignored unless `isLink` is `true`) */
	rel: PropTypes.string,

	/** The HTML tabIndex attribute value */
	tabIndex: PropTypes.number,

	/** The `target` attribute to use on the anchor element (ignored unless `isLink` is `true`) */
	target: PropTypes.string,

	/** The `title` attribute */
	title: PropTypes.string,

	/** Applies inverted styling */
	isInverted: PropTypes.bool,

	/** When used with `isLoading` this allows the button to retain children width */
	retainLayout: PropTypes.bool,

	/** Use this to specify a min width on the button, when you want to swap to loading states */
	minLoaderWidth: PropTypes.bool,
};

XUIButton.defaultProps = {
	tabIndex: 0,
	type: ButtonTypes.button,
	variant: 'standard',
	isLink: false,
	isDisabled: false,
	isExternalLink: false,
	isGrouped: false,
	isLoading: false,
	retainLayout: true,
};
