import React from 'react';
import cn from 'classnames';
import XUILoader from '../loader/XUILoader';
import { ButtonDefaultProps, ButtonPropTypes } from './private/propTypes';
import { SizeClassNames, VariantClassNames } from './private/constants';

/**
 * Returns a class name for the button depending on the button variant string given. Will return
 * undefined if no matching variant is given.
 *
 * @private
 * @param {string} variant - The button variant
 * @return {string} The variant specific class name
 */
const getVariantClass = variant => {
	return VariantClassNames.hasOwnProperty(variant) ? VariantClassNames[variant] : 'xui-button-standard';
};

/**
 * Replaces any href of `#` or undefined with `javascript:void(0)`. Else returns the passed href.
 *
 * @private
 * @param {string} href - A given link's href
 * @return {string} The href that will be assigned to a link
 */
const getHref = href => (!href || href === '#') ? 'javascript:void(0)' : href;

/**
 * KeyPress handler which will dispatch a click event when the space bar is pressed.
 *
 * @private
 * @param {KeyboardEvent} event
 * @param {Object} props
 */
function handleSpacebarAsClick(event, props) {
	if (props.isDisabled || props.isLoading) {
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
					relatedTarget: null
				});
			} else {
				clickEvent = document.createEvent('MouseEvents');
				// If you're seeing a line through initMouseEvent because WebStorm, read the comment above the if statement
				clickEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			}
			event.target.dispatchEvent(clickEvent);
		}
	}
}

/**
 * Links styled as buttons require a specific set of attributes to ensure proper functionality and accessibility.
 * This function ensures that those props will be added to the element.
 *
 * @private
 * @param {Object} props
 * @param {Object} elementProps
 */
const setupLinkProps = (props, elementProps) => {
	// If this is just a plain link styled to be a button, the button role is not needed.  However, if this is a link
	// which is styled to look AND function like a button, then we'll need the role.
	if (!props.href || props.onClick) {
		elementProps.role = 'button';
	}
	elementProps.onKeyPress = function(e) {
		handleSpacebarAsClick(e, props);
	};
	elementProps.href = getHref(props.href);
	elementProps.target = props.target;
	elementProps.rel = props.rel;

	if (props.isExternalLink) {
		elementProps.rel = (elementProps.rel ? elementProps.rel + ' ' : '') + 'external noopener noreferrer'
	}

	if (props.isDisabled || props.isLoading) {
		elementProps['aria-disabled'] = true;
	}
};

export default class XUIButton extends React.Component {
	focus() {
		this.rootNode && this.rootNode.focus();
	}

	hasFocus() {
		return !!this.rootNode && this.rootNode.contains(document.activeElement);
	}

	render () {
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
			...spreadProps
		} = xuiButton.props;
		const ElementType = isLink ? 'a' : 'button';
		const variantClass = getVariantClass(variant);
		const buttonDisabled = isDisabled || isLoading;
		const buttonChildren = isLoading ? <XUILoader size="small" defaultLayout={false} className="xui-button--loader" /> : children;

		const buttonClassNames = cn('xui-button', className, variantClass, SizeClassNames[size], {
			'xui-button-is-disabled': isDisabled,
			'xui-button-grouped': isGrouped
		});

		const clickHandler = function() {
			if (isLink && buttonDisabled) {
				event.preventDefault();
			} else if (onClick) {
				onClick.call(xuiButton, ...arguments);
			}
		};

		// Standard props for all element types
		const elementProps = {
			...spreadProps,
			onClick: clickHandler,
			onKeyDown: buttonDisabled ? null : onKeyDown,
			disabled: buttonDisabled,
			className: buttonClassNames,
			tabIndex: buttonDisabled ? -1 : tabIndex
		};

		// Element type specific props
		if (isLink) {
			setupLinkProps({ href, onClick, isExternalLink, target, rel, isDisabled, isLoading }, elementProps);
		} else {
			elementProps.type = type;
		}

		return (
			<ElementType ref={n => xuiButton.rootNode = n} {...elementProps} data-automationid={qaHook}>
				{buttonChildren}
			</ElementType>
		);
	}
}

XUIButton.propTypes = ButtonPropTypes;
XUIButton.defaultProps = ButtonDefaultProps;
