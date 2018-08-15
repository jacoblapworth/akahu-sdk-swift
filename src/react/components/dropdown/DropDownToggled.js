import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import verge from 'verge';
import uuidv4 from 'uuid/v4';
import PositioningInline from '../positioning/PositioningInline';
import Positioning from '../positioning/Positioning';
import {
	isNarrowViewport,
	addEventListeners,
	removeEventListeners,
	throttleToFrame,
} from './private/helpers';
import compose from '../helpers/compose';
import { baseClass, dropdownPositionOptions } from './private/constants';

import { lockScroll, unlockScroll, isScrollLocked } from '../helpers/lockScroll';
/* eslint-disable */

/**
 * If the given DOM node isn't on screen, scroll it into view.
 *
 * @private
 * @param {HTMLElement} node
 */
function scrollIntoViewIfNecessary(node) {
	if (!verge.inViewport(node)) {
		node.scrollIntoView();
	}
}

/**
 * Attempt to set focus onto the trigger either via native DOM APIs or
 * React component APIs (when available).
 *
 * @private
 * @param {React.Component} virtualTrigger
 * @param {HTMLElement} triggerDOM
 */
function focusTrigger(virtualTrigger, triggerDOM) {
	// if there is a focus API, use it, else set focus to the given trigger
	if (virtualTrigger && typeof virtualTrigger.focus === 'function') {
		virtualTrigger.focus();
	} else if (triggerDOM != null && typeof triggerDOM.focus === 'function') {
		triggerDOM.focus();
	}
}

/**
 * Predicate function to determine whether or not the dropdown should animate open
 * and closed based on state/props.
 *
 * @private
 * @param {DropDownToggled} ddt
 * @returns {Boolean}
 */
function shouldAnimate(ddt) {
	return !ddt.props.forceDesktop && ddt.state.isNarrowViewport;
}

/**
 * Scroll locking is only useful in a narrow set of circumstances.  Determine if we should
 * do that right now.
 *
 * @private
 * @param {DropDownToggled} ddt
 * @returns {Boolean}
 */
function shouldLockScroll(ddt) {
	return !ddt.props.disableScrollLocking
		&& !ddt.props.forceDesktop
		&& !isScrollLocked()
		&& ddt.state.isNarrowViewport;
}

/**
 * HOC to wrap the passed in Dropdown & TriggerComponent elements. Adds functionality
 * to toggle the list open/closed based on click of the TriggerComponent.
 *
 * @export
 * @class DropDownToggled
 * @extends {PureComponent}
 */
export default class DropDownToggled extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			isHidden: props.isHidden,
			activeDescendant: null,
			isNarrowViewport: isNarrowViewport(),
			isOpening: false,
			isClosing: false,
		};
	}

	dropdownId = this.props.dropdown && this.props.dropdown.props.id || uuidv4();

	/**
	 * Attaches the event listeners based on state.
	 * Listeners attached on keydown and mousedown to control the open/close keyboard shortcuts of the list.
	 */
	componentDidMount() {
		if (!this.state.isHidden) {
			addEventListeners(this);
			this.forceUpdate();
		}

		this.onResize = debounce(this.onResize, 250);
		this.onScroll = throttleToFrame(this.repositionDropDown);
	}

	/**
	 * Remove the event listeners attached in componentDidMount.
	 */
	componentWillUnmount() {
		removeEventListeners(this);
	}

	/**
	 * Call onOpen and onClosed callbacks based on hidden state.
	 * We're doing this here as we should call these after they've actually
	 * rendered open or closed, not just with the state change.
	 *
	 * @param {Object} prevProps
	 * @param {Object} prevState
	 */
	componentDidUpdate(prevProps, prevState) {
		const ddt = this;
		const { props, state } = ddt;
		const { onCloseAnimationEnd } = props;

		// If an animation state has just changed, we need to fire the passed animation
		// end callback
		if (!state.isClosing && prevState.isClosing && onCloseAnimationEnd != null) {
			onCloseAnimationEnd();
		}

		if (!props.disableScrollLocking) {
			if ((state.isHidden || state.isClosing) && state.shouldUnlockScroll) {
				unlockScroll();
			}
			if (!state.isHidden) {
				if (state.shouldUnlockScroll && !state.isNarrowViewport) {
					if (prevState.isNarrowViewport) {
						unlockScroll();
					}
					scrollIntoViewIfNecessary(this.wrapper.firstChild);
				}
				// Checking for the wrapper confirms that component is fully mounted
				if (shouldLockScroll(ddt) && this.wrapper) {
					this.setState({
						shouldUnlockScroll: lockScroll(),
					});
				}
			}
		}

		// It's possible for this prop to change while the dropdown remains open.  Make sure
		// to handle that.
		if (!state.isHidden && props.repositionOnScroll !== prevProps.repositionOnScroll) {
			if (props.repositionOnScroll) {
				window.addEventListener('scroll', ddt.onScroll);
			} else {
				window.removeEventListener('scroll', ddt.onScroll);
			}
		}

		if (state.isHidden !== prevState.isHidden) {
			// Just closed
			if (state.isHidden) {
				const { firstChild: trigger } = ddt.wrapper;
				focusTrigger(ddt.trigger, trigger);

				// Remove window event listeners for performance gains.
				removeEventListeners(ddt);

				// If we didn't animate close, we need to call the close animation callback
				// for API consistency between the two.  After all, the animation here is
				// just "hide".
				if (!shouldAnimate(ddt) && onCloseAnimationEnd != null) {
					onCloseAnimationEnd();
				}

				// onClose callback
				if (props.onClose != null) {
					props.onClose();
				}
			} else {
				// onOpen callback
				if (props.onOpen != null) {
					props.onOpen();
				}
				// Add window event listeners to make sure things still look good on browser resize
				addEventListeners(ddt);

				// If we are animating, add the animation class, after checking that the component is mounted
				if (shouldAnimate(ddt) && this.wrapper) {
					ddt.setState(() => ({
						isOpening: true,
					}));
				}
			}
		}
	}

	/**
	 * Show the dropdown.
	 *
	 * @public
	 */
	openDropDown = () => {
		this.setState(() => ({
			isHidden: false,
			isOpening: false,
			isNarrowViewport: isNarrowViewport(),
		}));
	};

	/**
	 * Hide the dropdown
	 *
	 * @public
	 */
	closeDropDown = () => {
		this.setState(() => ({
			isHidden: !shouldAnimate(this),
			isClosing: shouldAnimate(this),
		}));
	};

	/**
	 * Determine if the dropdown is currently open.
	 *
	 * @public
	 * @returns {Boolean}
	 */
	isDropDownOpen = () => !this.state.isHidden;

	/**
	 * A convenience method to toggle the visibility of the dropdown.
	 *
	 * @public
	 */
	toggle = () => {
		this.state.isHidden ? this.openDropDown() : this.closeDropDown();
	};

	/**
	 * If user clicks on the trigger, we may want to open and/or toggle the dropdown.
	 *
	 * @private
	 * @memberof DropDownToggled
	 */
	triggerClickHandler = () => {
		switch (this.props.triggerClickAction) {
		case 'toggle':
			this.toggle();
			break;
		case 'open':
			this.openDropDown();
			break;
		}
	};

	/**
	 * Will close the dropdown if the esc key is pressed within the dropdown.
	 *
	 * @param {KeyboardEvent} event key down event object
	 */
	onDropDownKeyDown = event => {
		if (!this.state.isHidden && (event.keyCode === 27 || event.keyCode === 9)) {
			if (event.keyCode !== 9 || this.props.closeOnTab) {
				this.closeDropDown();
			}
		}
	};

	/**
	 * Will open the list if the down arrow is pressed on keydown.
	 *
	 * @param {KeyboardEvent} event key down event object
	 */
	onTriggerKeyDown = event => {
		if (event.keyCode === 40 && this.state.isHidden) {
			event.preventDefault();
			this.openDropDown();
		} else if (!this.state.isHidden && (event.keyCode === 9 || event.keyCode === 27)) {
			// If the user doesn't want to close when the tab key is hit, don't
			if (event.keyCode !== 9 || this.props.closeOnTab) {
				this.closeDropDown();
			}
		}
	};

	/**
	 * Fires when the window triggers a mouse down event
	 *
	 * @param {MouseEvent} event
	 */
	onMouseDown = event => {
		const ddt = this;
		const { firstChild: trigger } = ddt.wrapper;
		const dropdown = ddt.dropdown && document.getElementById(this.dropdownId);

		/*
		Summary of below checks:
		 - state has marked the portal and dropdown as not hidden
		 - AND the dropdown has rendered and we can match the click target to the dropdown
		 - AND trigger has also rendered and can match with target
		 - OR if the click target is the mask
		*/
		if (
			!ddt.state.isHidden
			&& ((dropdown == null || !dropdown.contains(event.target))
			&& (trigger == null || !trigger.contains(event.target))
			|| event.target.classList.contains(`${baseClass}--mask`))
		) {
			ddt.closeDropDown();
		}
	};

	/**
	 * Sets the activeDescendant state to be the id of the item selected so this can be set in
	 * the corresponding trigger attribute.
	 *
	 * @param {UIEvent} event
	 * @param {ReactElement} item
	 */
	onSelect = (event, item) => {
		this.setState({
			activeDescendant: item.props.id,
		});

		if (this.props.closeOnSelect) {
			this.closeDropDown();
		}
	};

	/**
	 * Ensures that the activeDescendant aria attribute changes on the trigger when the highlighted element changes.
	 *
	 * @param {ReactElement} item
	 */
	onHighlightChange = item => {
		this.setState({
			activeDescendant: item.props.id,
		});
	};

	/**
	 * Will fire when the animation is complete on the dropdown so we can tell the portal
	 * to remove itself from the DOM.
	 */
	onCloseAnimationEnd = () => {
		this.setState(() => ({
			isClosing: false,
			isHidden: true,
		}));
	};

	/**
	 * When the opening animation finishes, we need to remove the class that causes it
	 * to prevent a change in the child DOM nodes from causing another animation.
	 *
	 * @memberof DropDownToggled
	 */
	onOpenAnimationEnd = () => {
		this.setState(() => ({
			isOpening: false,
		}));

		// Tell the dropdown to ensure that an element is highlighted, if appropriate
		this.dropdown.highlightInitial();
		if (this.props.onOpenAnimationEnd != null) {
			this.props.onOpenAnimationEnd();
		}
	};

	/**
	 * When the browser resizes in desktop mode, we need to do a couple of things to
	 * ensure that the dropdown still looks correct:
	 * 1. Scroll the trigger back into view if we need to.
	 * 2. Check to see if we're in a mobile context.
	 * 3. Reposition the dropdown.  Could be fullscreen if resized to mobile.
	 *
	 * @memberof DropDownToggled
	 */
	onResize = () => {
		this.setState(state => {
			const isNarrow = isNarrowViewport();
			if (!isNarrow || (isNarrow && !state.isNarrowViewport)) {
				scrollIntoViewIfNecessary(this.wrapper.firstChild);
				this.repositionDropDown();
			}
			return { isNarrowViewport: isNarrow };
		});
	};

	/**
	 * Force the dropdown to reposition itself relative to the current position of the trigger.
	 *
	 * @public
	 * @memberof DropDownToggled
	 */
	repositionDropDown = () => {
		if (this.positioning != null) {
			if (this.props.restrictToViewPort) {
				this.positioning.calculateMaxHeight();
			}
			this.positioning.positionComponent();
		}
	};

	render() {
		const ddt = this;
		const {
			className, trigger, dropdown, restrictToViewPort, forceDesktop, qaHook, maxHeight, preferredPosition, ariaPopupType, ariaRole, isLegacyDisplay, ...otherProps
		} = ddt.props;
		const { isOpening, isClosing, isHidden } = ddt.state;

		const clonedTrigger = React.cloneElement(trigger, {
			'ref': compose(trigger.ref, c => ddt.trigger = c),
			'onClick': compose(trigger.props.onClick, ddt.triggerClickHandler),
			'onKeyDown': compose(trigger.props.onKeyDown, ddt.onTriggerKeyDown),
			'aria-activedescendant': ddt.state.activeDescendant,
			'aria-haspopup': ariaPopupType,
			'aria-controls': this.dropdownId,
		});

		const clonedDropdown = React.cloneElement(dropdown, {
			isHidden,
			id: this.dropdownId,
			forceDesktop,
			animateOpen: isOpening,
			animateClosed: isClosing,
			ref: compose(dropdown.ref, c => ddt.dropdown = c),
			onSelect: compose(dropdown.props.onSelect, ddt.onSelect),
			onHighlightChange: compose(dropdown.props.onHighlightChange, ddt.onHighlightChange),
			onCloseAnimationEnd: compose(dropdown.onCloseAnimationEnd, ddt.onCloseAnimationEnd),
			onOpenAnimationEnd: compose(dropdown.onOpenAnimationEnd, ddt.onOpenAnimationEnd),
			onKeyDown: compose(dropdown.props.onKeyDown, ddt.onDropDownKeyDown),
			className: dropdown.props.className,
		});

		const commonPositioningProps = {
			maxHeight,
			isVisible: !isHidden,
			shouldRestrictMaxHeight: restrictToViewPort,
			isNotResponsive: forceDesktop,
			onVisible: shouldAnimate(this) ? null : this.onOpenAnimationEnd,
			ref: c => this.positioning = c,
			parentRef: ddt.wrapper,
			isTriggerWidthMatched: ddt.props.matchTriggerWidth,
		};

		const positionedDropdown = isLegacyDisplay || this.state.isNarrowViewport ? (
			<Positioning
				{...commonPositioningProps}
				qaHook={qaHook && `${qaHook}--positioning`}
			>
				{clonedDropdown}
			</Positioning>
		) : (
			<PositioningInline
				{...otherProps}
				{...commonPositioningProps}
				qaHook={qaHook && `${qaHook}--positioning-inline`}
				preferredPosition={preferredPosition}
				maxWidth={-1}
				useDropdownPositioning
			>
				{clonedDropdown}
			</PositioningInline>
		);

		const wrapperAria = {
			'role': ariaRole || 'presentation',
			'aria-expanded': ariaRole && !isHidden || undefined,
			'aria-owns': this.dropdownId,
		};

		return (
			<div
				{...wrapperAria}
				ref={c => ddt.wrapper = c}
				className={className}
				data-ref="toggled-wrapper"
				data-automationid={qaHook}
			>
				{clonedTrigger}
				{positionedDropdown}
			</div>
		);
	}
}

DropDownToggled.propTypes = {
	className: PropTypes.string,
	qaHook: PropTypes.string,

	/** Whether the dropdown is hidden on initial render */
	isHidden: PropTypes.bool,

	/** Callback that gets triggered when the dropdown begins opening */
	onOpen: PropTypes.func,

	/** Callback that gets triggered when the dropdown has finished closing */
	onClose: PropTypes.func,

	/** Element used to trigger the dropdown opening/closing (typically a button) */
	trigger: PropTypes.element.isRequired,

	/** The dropdown that will be rendered when triggered */
	dropdown: PropTypes.element.isRequired,

	/** Whether or not the dropdown should be automatically hidden when the user selects something */
	closeOnSelect: PropTypes.bool,

	/** Whether or not the dropdown should be automatically hidden when the user hits the tab key.  Good to turn this off if you've got a date picker, nested dropd down, form, or other complex component inside of a dropdown. */
	closeOnTab: PropTypes.bool,

	/** Whether or not we should set a maxHeight on the dropdown to restrict it to the window */
	restrictToViewPort: PropTypes.bool,

	/** Whether scroll locking behaviour should be disabled on mobile */
	disableScrollLocking: PropTypes.bool,

	/** Function to be called once the closing animation has finished */
	onCloseAnimationEnd: PropTypes.func,

	/** Callback for when animation has ended on open. */
	onOpenAnimationEnd: PropTypes.func,

	/** What action to take when the user clicks the trigger.  Default is to toggle the dropdown open/close.  Can just open ('open') or do nothing ('none'). */
	triggerClickAction: PropTypes.oneOf(['none', 'toggle', 'open']),

	/** Force the desktop UI, even if the viewport is narrow enough for mobile. */
	forceDesktop: PropTypes.bool,

	/** Use the "legacy" (portaled) display. Currently defaults to "true." */
	isLegacyDisplay: PropTypes.bool,

	/** Repositioning on scroll is usually just annoying.  However, if you have a fixed position trigger, it's essential to make sure that the dropdown stays next to the trigger. */
	repositionOnScroll: PropTypes.bool,

	/**
	 * Setting to true will for the dropdown to be as wide as the trigger.
	 * Note: Setting this to true will override any size prop on DropDown.  XUI design has also decided to keep a minimum width on the dropdown, so dropdown may not match the width of narrow triggers.
	 */
	matchTriggerWidth: PropTypes.bool,

	/**
	 * Setting a number here will force the maximum height of the dropdown to be the number provided (in pixels) if the viewport is too big.
	 * When the viewport is smaller than this number, it still shrinks, but never grows beyond that number.
	 */
	maxHeight: PropTypes.number,

	/**
	 * This setting is only for non-legacy display. Whether to allow the dropdown to take the full width of the wrapper (as SelectBox) or wrap with an inline block. Defaults to false.
	 */
	isBlock: PropTypes.bool,
	/**
	 * This setting is only for non-legacy display. Preferred position to display the dropdown, relative to the trigger. Defaults to bottom-left.
	 */
	preferredPosition: PropTypes.oneOf(dropdownPositionOptions),
	/**
	 * This setting is only for non-legacy display. Space between trigger and dropdown, in pixels. Defaults to 6.
	 */
	triggerDropdownGap: PropTypes.number,
	/**
	 * The "aria-haspopup" value. NOT just a boolean. Defaults to 'listbox' https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup
	 */
	ariaPopupType: PropTypes.oneOf(['listbox', 'menu', 'tree', 'grid', 'dialog', false]),
	/**
	 * Aria role for dropdown wrapper
	 */
	ariaRole: PropTypes.string,
};

DropDownToggled.defaultProps = {
	isHidden: true,
	closeOnSelect: true,
	closeOnTab: true,
	restrictToViewPort: true,
	disableScrollLocking: false,
	triggerClickAction: 'toggle',
	forceDesktop: false,
	repositionOnScroll: false,
	matchTriggerWidth: false,
	preferredPosition: 'bottom-left',
	triggerDropdownGap: 6,
	isLegacyDisplay: true,
	isBlock: false,
	ariaPopupType: 'listbox',
};
