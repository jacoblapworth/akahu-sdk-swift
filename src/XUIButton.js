import React, {PropTypes} from 'react';
import Classes from 'xui-css-classes';
import cn from 'classnames';
import XUIIcon from 'xui-icon';
import XUILoader from 'xui-loader';

// general helpers
const keys = Object.keys;
const values = x => keys(x).map(k => x[k]);

const ButtonClasses = Classes.Button;

/**
 * String constants
 *
 * @private
 * @type {Object}
 */
const CONSTANTS = {
	TYPES: {
		BUTTON: 'button',
		LINK: 'link'
	},
	ELEMENT_TYPES: {
		BUTTON: 'button',
		LINK: 'a'
	},
	BUTTON_TYPES: {
		SUBMIT: 'submit',
		BUTTON: 'button',
		RESET: 'reset'
	},
	VARIANTS: {
		'primary': ButtonClasses.MAIN,
		'create': ButtonClasses.CREATE,
		'link': ButtonClasses.LINK,
		'negative': ButtonClasses.NEGATIVE,
		'standard': ButtonClasses.STANDARD,
		'unstyled': ''
	},
	SIZES: {
		'small': ButtonClasses.SMALL,
		'full-width': Classes.Utility.FULL_WIDTH,
		'full-width-mobile': ButtonClasses.FULL_WIDTH
	}
};

const propTypes = {

	className: PropTypes.string,
	children: PropTypes.node,
	qaHook: PropTypes.string,

	/** @property {boolean} [isDisabled] Determines if the button is disabled or not. */
	isDisabled: PropTypes.bool,

	/** @property {string} [isExternalLink] If true, sets appropriate `rel` values to prevent new page from having access to `window.opener`. Should be used for links pointing at external sites. **/
	isExternalLink: PropTypes.bool,

	/** @property {boolean} [isLoading] If true, shows a loader inside the button and also disables the button to prevent clicking. Can be used in conjunction with isDisabled (which also provides a disabled class)  */
	isLoading: PropTypes.bool,

	/** @property {boolean} [isGrouped] If this button is part of a parent button group */
	isGrouped: PropTypes.bool,

	/** @property {function} onClick Bind a function to fire when the button is clicked */
	onClick: function (props) {
		if (props.type === 'button' && !(typeof props.onClick === 'function')) {
			throw new Error('Non-link buttons require an onClick function.');
		}
	},

	/** @property {function} [onSecondaryClick] Bind a function to fire when the second button in a split button is clicked */
	onSecondaryClick: function (props) {
		if (props.split && !(typeof props.onSecondaryClick === 'function')) {
			throw new Error('Split buttons require a secondary click handler');
		}
	},

	/** @property {string} [variant='standard'] Determines what the purpose of this button is. `standard`, `primary`, `create`, `negative`, `link` or `unstyled`. */
	variant: PropTypes.oneOf(keys(CONSTANTS.VARIANTS)),

	/** @property {string} [size='default'] Modifier for the size of the button. `small`, `full-width`, or `full-width-layout`. */
	size: PropTypes.oneOf(keys(CONSTANTS.SIZES)),

	/** @property {string} [type='button'] The HTML type of this button. `button`, or `link`. Defaults to `button` */
	type: PropTypes.oneOf(values(CONSTANTS.TYPES)),

	/** @property {string} [buttonType='submit'] The type attribute of this button. `submit`, `button`, or `reset`. Defaults to `submit` */
	buttonType: PropTypes.oneOf(values(CONSTANTS.BUTTON_TYPES)),

	/** @property {string} [href] The `href` attribute to use on the anchor element (ignored unless `type` is `link`) */
	href: function (props) {
		if (props.type === CONSTANTS.LINK && !props.onClick && !props.href) {
			throw new Error('Link buttons without an onClick handler require an href.');
		}
	},

	/** @property {string} [rel] The `rel` attribute to use on the anchor element (ignored unless `type` is `link`) */
	rel: PropTypes.string,

	/** @property {number} [tabIndex=0] The HTML tabIndex property to put on the component */
	tabIndex: PropTypes.number,

	/** @property {string} [target] The `target` attribute to use on the anchor element (ignored unless `type` is `link`) */
	target: PropTypes.string,

	/** @property {string} [title] The `title` attribute for this button */
	title: PropTypes.string,

	/** @property {boolean} [split] Changes the button to a split button. Use `onSecondaryClick` with this to create dropdown experiences */
	split: PropTypes.bool
};

/**
 * Default property values for this component.
 *
 * @public
 */
const defaultProps = {
	buttonType: CONSTANTS.BUTTON_TYPES.SUBMIT,
	tabIndex: 0,
	type: CONSTANTS.ELEMENT_TYPES.BUTTON,
	variant: 'standard'
};

/**
 * Returns a class name for the button depending on the button variant string given. Will return
 * undefined if no matching variant is given.
 *
 * @private
 * @param {string} variant - The button variant
 * @return {string} The variant specific classname
 */
const getVariantClass = variant => {
	const variants = CONSTANTS.VARIANTS;
	return variants.hasOwnProperty(variant) ? variants[variant] : ButtonClasses.STANDARD;
};

/**
 * Returns a classname for the button depending on it's disabled state
 *
 * @private
 * @param {boolean} isDisabled - Whether or not the button is disabled
 * @return {string} The disabled state specific classname
 */
const getDisabledClass = isDisabled => isDisabled ? ButtonClasses.IS_DISABLED : null;

/**
 * Returns a class name for the button depending on the button sizing string given. Will return
 * undefined if no matching size is given.
 *
 * @private
 * @param {string} size - The button size
 * @return {string} The size specific class name
 */
const getSizeClass = size => CONSTANTS.SIZES[size];

/**
 * Returns a class name for the button depending on if it has been set to belong to a group
 *
 * @private
 * @param {boolean} isGrouped - Whether or not the button belongs to a group
 * @return {string} The grouped state specific class name
 */
const getGroupClass = isGrouped => isGrouped ? ButtonClasses.GROUPED : null;

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
				clickEvent.initMouseEvent('click', true, true, 'window', 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			}
			event.target.dispatchEvent(clickEvent);
		}
	}
}

const setupLinkProps = (props, elementProps) => {
	elementProps.role = 'button';
	elementProps.onKeyPress = function(e) {
		handleSpacebarAsClick(e, props);
	};
	elementProps.href = getHref(props.href);
	elementProps.target = props.target;
	elementProps.rel = props.rel;

	if(props.isExternalLink) {
		elementProps.rel = (elementProps.rel ? elementProps.rel + ' ' : '') + 'external noopener noreferrer'
	}

	if (props.isDisabled || props.isLoading) {
		elementProps['aria-disabled'] = true;
	}
};

export default class XUIButton extends React.Component {
	render () {
		const _this = this;
		const props = _this.props;
		const isLink = props.type === CONSTANTS.TYPES.LINK;
		const ElementType = isLink ? CONSTANTS.ELEMENT_TYPES.LINK : CONSTANTS.ELEMENT_TYPES.BUTTON;
		const variantClass = getVariantClass(props.variant);
		const isSplit = props.split && props.onSecondaryClick;
		const isDisabled = props.isDisabled || props.isLoading;
		const children = props.isLoading ? <XUILoader size="small" defaultLayout={false} className={ButtonClasses.LOADER} /> : props.children;

		const classNames = cn(
			ButtonClasses.BASE,
			props.className,
			variantClass,
			getDisabledClass(props.isDisabled),
			getSizeClass(props.size),
			getGroupClass(props.isGrouped)
		);

		const clickHandler = function() {
			if (isLink && isDisabled) {
				event.preventDefault();
			} else if (!isLink || isLink && props.onClick){
				props.onClick.call(_this, ...arguments);
			}
		};

		const secondaryClickHandler = function() {
			if (isLink && isDisabled) {
				event.preventDefault();
			} else {
				props.onSecondaryClick.call(_this, ...arguments);
			}
		};

		// Standard props for all element types
		const elementProps = {
			title: props.title,
			onClick: clickHandler,
			disabled: isDisabled,
			className: classNames,
			tabIndex: isDisabled ? -1 : props.tabIndex
		};

		// Element type specific props
		if (isLink) {
			setupLinkProps(props, elementProps);
		} else {
			elementProps.type = props.buttonType;
		}

		if (isSplit) {
			elementProps.className = `${elementProps.className} ${ButtonClasses.GROUPED}`;
		}

		let Button = (
			<ElementType {...elementProps} data-automationid={props.qaHook}>
				{children}
			</ElementType>
		);

		if (isSplit) {

			Button = (
				<div className={ButtonClasses.GROUPED}>
					{Button}
					<ElementType className={cn(elementProps.className, ButtonClasses.SPLIT)} onClick={secondaryClickHandler}>
						<XUIIcon icon="caret" className={ButtonClasses.CARET}/>
					</ElementType>
				</div>
			);
		}

		return Button;
	}
}

XUIButton.propTypes = propTypes;
XUIButton.defaultProps = defaultProps;
