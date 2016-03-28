import React, {PropTypes} from 'react';
import Component from 'xui-base-component';
import cn from 'classnames';

import XUIClasses from 'xui-css-classes';
const ButtonClasses = XUIClasses.Button;

/**
 * String constants
 *
 * @private
 * @type {Object}
 */
const CONSTANTS = {
	BUTTON: 'button',
	LINK: 'link',
	A: 'a',
	TYPE_SUBMIT: 'submit'
};

const propTypes = {
	/** @property {boolean} [isDisabled=false] Determines if the button is disabled or not. Set to false by default */
	isDisabled: PropTypes.bool,

	/** @property {boolean} [isGrouped=false] If this button is part of a parent button group */
	isGrouped: PropTypes.bool,

	/** @property {function} onClick Bind a function to fire when the button is clicked */
	onClick: function (props) {
		if (props.type === 'button' && !(typeof props.onClick === 'function')) {
			throw new Error('Non-link buttons require an onClick function.');
		}
	},

	/** @property {string} [isDisabled='default'] variant Determines what the purpose of this button is. `primary`, or `create`. If nothing is provided then it is a default button */
	variant: PropTypes.string,

	/** @property {string} [size='default'] size Modifier for the size of the button. `small`, or `full-width`. Else ignored */
	size: PropTypes.string,

	/** @property {string} [type='button'] type The HTML type of this button. `button`, or `link`. Defaults to `button` */
	type: PropTypes.oneOf([CONSTANTS.BUTTON, CONSTANTS.LINK]),

	/** @property {string} [buttonType='submit'] type The type attribute of this button. `submit`, `button`, or `reset`. Defaults to `submit` */
	buttonType: PropTypes.oneOf(['submit', 'button', 'reset']),

	/** @property {string} [className] Any extra modifier classes you want on the button */
	className: PropTypes.string,

	/** @property {string} [href] If this button is type `link` then this will be the hyperlink reference. Else ignored */
	href: function (props) {
		if (props.type === CONSTANTS.LINK && !props.onClick && !props.href) {
			throw new Error('Link buttons without an onClick handler require an href.');
		}
	},

	/** @property {number} [tabIndex=0] - The HTML tabIndex property to put on the component */
	tabIndex: PropTypes.number,

	/** @property {string} [target] The `target` attribute for the button if the type is `link`. Ignored otherwise */
	target: PropTypes.string,

	/** @property {string} [title] The `title` attribute for this button */
	title: PropTypes.string
};

/**
 * Default property values for this component.
 *
 * @public
 */
const defaultProps = {
	buttonType: CONSTANTS.TYPE_SUBMIT,
	isGrouped: false,
	isDisabled: false,
	tabIndex: 0,
	type: 'button'
};

/**
 * Returns a class name for the button depending on the button variant string given. Will return
 * undefined if no matching variant is given.
 *
 * @private
 * @param {string} variant - The button variant
 * @return {string} The variant specific classname
 */
function getVariantClass(variant) {
	switch (variant) {
		case 'primary':
			return ButtonClasses.MAIN;
		case 'create':
			return ButtonClasses.CREATE;
	}
}

/**
 * Returns a classname for the button depending on it's disabled state
 *
 * @private
 * @param {boolean} isDisabled - Whether or not the button is disabled
 * @return {string} The disabled state specific classname
 */
function getDisabledClass(isDisabled) {
	return isDisabled ? ButtonClasses.IS_DISABLED : null;
}

/**
 * Returns a class name for the button depending on the button sizing string given. Will return
 * undefined if no matching size is given.
 *
 * @private
 * @param {string} size - The button size
 * @return {string} The size specific class name
 */
function getSizeClass(size) {
	switch (size) {
		case 'small':
			return ButtonClasses.SMALL;
		case 'full-width':
			return XUIClasses.Utility.FULL_WIDTH;
	}
}

/**
 * Returns a class name for the button depending on if it has been set to belong to a group
 *
 * @private
 * @param {boolean} isGrouped - Whether or not the button belongs to a group
 * @return {string} The grouped state specific class name
 */
function getGroupClass(isGrouped) {
	return isGrouped ? ButtonClasses.GROUPED : null;
}

/**
 * Replaces any href of `#` or undefined with `javascript:void(0)`. Else returns the passed href.
 *
 * @private
 * @param {string} href - A given link's href
 * @return {string} The href that will be assigned to a link
 */
function getHref(href) {
	return (!href || href === '#') ? 'javascript:void(0)' : href;
}

/**
 * KeyPress handler which will dispatch a click event when the space bar is pressed.
 *
 * @private
 * @param {KeyboardEvent} event
 */
function handleSpacebarAsClick(event) {
	const button = this;
	if (!button.props.isDisabled) {
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
				clickEvent.initMouseEvent('click', true, true, 'window', 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			}
			event.target.dispatchEvent(clickEvent);
		}
	}
}

export default class XUIButton extends Component {
	render() {
		const button = this;
		const props = button.props;
		const isLink = props.type === CONSTANTS.LINK;
		const ElementType = isLink ? CONSTANTS.A : CONSTANTS.BUTTON;

		const classNames = cn(
				ButtonClasses.BASE,
				props.className,
				getVariantClass(props.variant),
				getDisabledClass(props.isDisabled),
				getSizeClass(props.size),
				getGroupClass(props.isGrouped)
		);

		// Only call the click event if the element isn't disabled.
		const clickHandler = function (event) {
			if (isLink && props.isDisabled) {
				event.preventDefault();
			} else {
				if (props.onClick) {
					props.onClick.apply(button, arguments);
				}
			}
		};

		// Standard props for all element types
		const elementProps = {
			title: props.title,
			onClick: clickHandler,
			disabled: props.isDisabled,
			className: classNames,
			tabIndex: props.isDisabled ? -1 : props.tabIndex
		};

		// Element type specific props
		if (isLink) {
			elementProps.role = 'button';
			elementProps.onKeyPress = handleSpacebarAsClick.bind(button);
			elementProps.href = getHref(props.href);
			elementProps.target = props.target;
			if (props.isDisabled) {
				elementProps['aria-disabled'] = true;
			}
		} else {
			elementProps.type = props.buttonType;
		}

		return (
			<ElementType {...elementProps}>
				{props.children}
			</ElementType>
		);
	}
}

XUIButton.propTypes = propTypes;
XUIButton.defaultProps = defaultProps;
