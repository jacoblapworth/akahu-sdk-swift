import React from 'react';
import Component from 'xui-base-component';
import cn from 'classNames';

const propTypes = {
	/**
	 * @property {boolean} [isDisabled=false] Determines if the button is disabled or not. Set to false by default
	 */
	isDisabled: React.PropTypes.bool,

	/**
	 * @property {boolean} [isGrouped=false] If this button is part of a parent button group
	 */
	isGrouped: React.PropTypes.bool,

	/**
	 * @property {function} onClick Bind a function to fire when the button is clicked
	 */
	onClick: React.PropTypes.func.isRequired,

	/**
	 * @property {string} [isDisabled='default'] variant Determines what the purpose of this button is. `primary`, or `create`. If nothing is provided then it is a default button
	 */
	variant: React.PropTypes.string,

	/**
	 * @property {string} [size='default'] size Modifier for the size of the button. `small`, or `full-width`. Else ignored
	 */
	size: React.PropTypes.string,

	/**
	 * @property {string} [type='button'] type The HTML type of this button. `button`, or `link`. Defaults to `button`
	 */
	type: React.PropTypes.oneOf(['button', 'link']),

	/**
	 * @property {string} className Any extra modifier classes you want on the button
	 */
	className: React.PropTypes.string,

	/**
	 * @property {string} href If this button is type `link` then this will be the hyperlink reference. Else ignored
	 */
	href: React.PropTypes.string,

	/**
	 * @property {string} qaHook An optional data attribute for QA automation hooks
	 */
	qaHook: React.PropTypes.string,

	/**
	 * @property {string} target The `target` attribute for the button if the type is `link`. Else ignored
	 */
	target: React.PropTypes.string,

/**
 * @property {string} title The `title` attribute for this button
 */
	title: React.PropTypes.string
};

/**
 * @public
 *
 * Default property values for this component
 */
const defaultProps = {
	isGrouped: false,
	isDisabled: false,
	type: 'button'
};

/**
 * @private
 *
 * XUI CSS classes for internal reference
 */
const CSS_CLASSES = {
	DEFAULT: 'xui-button',
	DISABLED: 'xui-button-is-disabled',
	PRIMARY: 'xui-button-main',
	CREATE: 'xui-button-create',
	SMALL: 'xui-button-small',
	FULL_WIDTH: 'xui-u-fullwidth',
	GROUP: 'xui-button-grouped'
};

/**
 * Returns a classname for the button depending on the button variant string given. Will return
 * undefined if no matching variant is given.
 *
 * @private
 * @param {String} variant - The button variant
 * @return {String} The variant specific classname
 */
function getVariantClass(variant) {
	switch(variant) {
		case 'primary':
			return CSS_CLASSES.PRIMARY;
		case 'create':
			return CSS_CLASSES.CREATE;
	}
}

/**
 * Returns a classname for the button depending on it's disabled state
 *
 * @private
 * @param {Boolean} isDisabled - Whether or not the button is disabled
 * @return {String} The disabled state specific classname
 */
function getDisabledClass(isDisabled) {
	return isDisabled ? CSS_CLASSES.DISABLED : null;
}

/**
 * Returns a classname for the button depending on the button sizing string given. Will return
 * undefined if no matching size is given.
 *
 * @private
 * @param {String} size - The button size
 * @return {String} The size specific classname
 */
function getSizeClass(size) {
	switch(size) {
		case 'small':
			return CSS_CLASSES.SMALL;
		case 'full-width':
			return CSS_CLASSES.FULL_WIDTH;
	}
}

/**
 * Returns a classname for the button depending on if it has been set to belong to a group
 *
 * @private
 * @param {Boolean} isGrouped - Whether or not the button belongs to a group
 * @return {String} The grouped state specific classname
 */
function getGroupClass(isGrouped) {
	return isGrouped ? CSS_CLASSES.GROUP : null;
}

/**
 * Replaces any href of `#` with `javascript:void(0)`. Else returns the passed href.
 *
 * @private
 * @param {String} href - A given link's href
 * @return {String} The href that will be assigned to a link
 */
function getHref(href) {
	return href === '#' ? 'javascript:void(0)' : href;
}

export default class XUIButton extends Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {

		const button = this;
		const props = this.props;
		const ElementType = props.type === 'link' ? 'a' : 'button';
		const isLink = props.type === 'link';
		const href = isLink ? getHref(props.href) : null;
		const target = isLink ? props.target : null;

		const classNames = cn(
				CSS_CLASSES.DEFAULT,
				props.className,
				getVariantClass(props.variant),
				getDisabledClass(props.isDisabled),
				getSizeClass(props.size),
				getGroupClass(props.isGrouped)
		);

		// If the type is a link, only call the click event if the link isn't disabled
		const clickHandler = isLink ? function(e) {
			if(!props.disabled && props.onClick) {
				props.onClick.call(button, arguments);
			}
		} : props.onClick;

		return (
			<ElementType
				href={href}
				target={target}
				title={props.title}
				onClick={clickHandler}
				disabled={props.isDisabled}
				className={classNames}>
					{props.children}
			</ElementType>
		);
	}
}

XUIButton.propTypes = propTypes;
XUIButton.defaultProps = defaultProps;