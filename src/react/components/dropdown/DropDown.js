import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import cn from 'classnames';
import DropDownListBox from './DropDownListBox';
import DropDownPanel from './DropDownPanel';
import { lockScroll, unlockScroll } from '../helpers/lockScroll';

import './scss/_dropDown.scss';

/**
 * Since users can put forms, datepickers, whatever inside of their dropdowns, we don't
 * always want to handle a keyboard event using the standard keydown handlers.  Instead,
 * we'll make a couple of assumptions.
 *
 * - 	If the keydown event was triggered by something outside of the DropDownListBox, then
 * 		the onKeyDown method was manually called by something else, and we need to handle it.
 * - 	If the event's target was exactly the list box, then it's a standard select-box type
 * 		event and we should handle it.
 * -	Certain keycodes are special, and we should always handle them if we can
 *
 * @private
 * @param {KeyboardEvent} event
 * @param {DropDown} dropdown
 * @returns {Boolean}
 */
const shouldHandleKeyDown = (event, dropdown) => {
	return !dropdown.listBox.rootNode.contains(event.target)
				|| event.target === dropdown.listBox.rootNode
				|| event.keyCode === 38 // Up Arrow
				|| event.keyCode === 40 // Down Arrow
				|| event.keyCode === 27 // Escape
				|| event.keyCode === 9; // Tab
};

/**
 * Wrapper for all content which will go inside of a dropdown.  It ensures the correct
 * presentational components are used to output content, scrolling is managed properly,
 * and keyboard events are handled properly for the Picklist use case.  An instance of
 * this should be passed to the DropDownToggled's dropdown prop.
 *
 * @export
 * @class DropDown
 * @extends {PureComponent}
 */
export default class DropDown extends PureComponent {
	constructor(props) {
		super(props);

		const dropdown = this;
		const { isHidden, restrictFocus } = dropdown.props

		dropdown.dropdownId = props.id || uuidv4();
		dropdown.onKeyDown = dropdown.onKeyDown.bind(dropdown);
		dropdown.onHighlightChange = dropdown.onHighlightChange.bind(dropdown);
		dropdown.highlightItem = dropdown.highlightItem.bind(dropdown);
		dropdown.lockScroll = dropdown.lockScroll.bind(dropdown);
		dropdown.unlockScroll = dropdown.unlockScroll.bind(dropdown);
		dropdown._restrictFocus = dropdown._restrictFocus.bind(dropdown);

		if (!isHidden && restrictFocus) {
			window.addEventListener('focus', dropdown._restrictFocus, true);
		}
	}

	componentDidUpdate(prevProps) {
		const dropdown = this;
		const { isHidden, hasKeyboardEvents, restrictFocus } = dropdown.props;
		if (!isHidden) {
			if (hasKeyboardEvents) {
				dropdown.listBox.focus();
			}
			const id = dropdown.panel && dropdown.panel.getHighlightedId();
			if (id) {
				dropdown.listBox.scrollIdIntoView(id);
			}
		}
		if (isHidden !== prevProps.isHidden || restrictFocus !== prevProps.restrictFocus) {
			window.removeEventListener('focus', this._restrictFocus, true);
			if (!isHidden && restrictFocus) {
				window.addEventListener('focus', this._restrictFocus, true);
			}
		}
	}

	componentWillUnmount() {
		window.removeEventListener('focus', this._restrictFocus, true);
	}

	/**
	 * Keydown handler for the DropDown.  If `hasKeyboardEvents` is true, then this will
	 * automatically handle list navigation keyboard events because the root node will have
	 * focus.  However, if you want to keep the focus on the trigger by setting `hasKeyboardEvents`
	 * to false, you need to manually call this method if you want arrow key handlers to actuall
	 * navigate the list for users.  A heuristic is applied, so the only time you shouldn't call this
	 * on trigger keydown is when you know for a fact that you don't want a default action to happen
	 * (ex: Down arrow should not open the list).  It doesn't hurt to call this for keyboard events
	 * that the component doesn't actually do anything with.
	 *
	 * @public
	 * @param {KeyboardEvent} event
	 * @memberof DropDown
	 */
	onKeyDown(event) {
		const dropdown = this;
		if (shouldHandleKeyDown(event, dropdown)) {
			dropdown.panel && dropdown.panel.onKeyDown(event);
			if (typeof dropdown.props.onKeyDown === 'function') {
				dropdown.props.onKeyDown(event);
			}
		}
	}

	// TODO: This should be extracted into a separate consumable once we go monorepo
	/**
	 * @private
	 * @param {Object} event - A focus change event which is set to be listened to by the window
	 * Limits the focusable elements to those within the dropdown
	 **/
	_restrictFocus(event) {
		const dropdown = this;
		if (dropdown.listBox != null && dropdown.listBox.rootNode != null) {
			const rootNode = dropdown.listBox.rootNode;
			const targetIsWindow = event.target === window;
			if (targetIsWindow || !rootNode.contains(event.target)) {
				event.stopPropagation();
				rootNode.focus();
			}
		}
	}

	onHighlightChange(item) {
		const dropdown = this;
		if (typeof item !== 'undefined') {
			dropdown.listBox.scrollIdIntoView(item.props.id);
		}
		dropdown.props.onHighlightChange && dropdown.props.onHighlightChange(item);
	}

	/**
	 * Highlight a specific React element in the DropDown list.
	 *
	 * @public
	 * @param {Component} item
	 * @param {UIEvent} event
	 * @memberof DropDown
	 */
	highlightItem(item, event) {
		this.panel.highlightItem(item, event);
	}

	/**
	 * Used to highlight an item immediately after a dropdown opens.
	 *
	 * @public
	 * @memberof DropDownPanel
	 */
	highlightInitial() {
		if (this.panel != null) {
			this.panel.highlightInitial();
			const highlightedId = this.panel.getHighlightedId();
			if (highlightedId != null) {
				this.listBox.scrollIdIntoView(highlightedId);
			}
		}
	}

	unlockScroll() {
		unlockScroll();
	}

	lockScroll() {
		lockScroll()
	}

	render() {
		const dropdown = this;
		const {
			size,
			footer,
			className,
			isHidden,
			children,
			qaHook,
			onSelect,
			ignoreKeyboardEvents,
			style,
			header,
			fixedWidth,
			onCloseAnimationEnd,
			onOpenAnimationEnd,
			animateClosed,
			animateOpen,
			forceDesktop,
		} = dropdown.props;

		const dropdownClasses = cn(className, {
			'xui-dropdown-fullheight': header
		});

		return (
			<DropDownListBox
				ref={c => dropdown.listBox = c}
				id={dropdown.dropdownId}
				isHidden={isHidden}
				footer={footer}
				header={header}
				className={dropdownClasses}
				size={size}
				fixedWidth={fixedWidth}
				qaHook={qaHook}
				onKeyDown={dropdown.onKeyDown}
				style={style}
				animateClosed={animateClosed}
				animateOpen={animateOpen}
				onCloseAnimationEnd={onCloseAnimationEnd}
				onOpenAnimationEnd={onOpenAnimationEnd}
				forceDesktop={forceDesktop}
			>
				<DropDownPanel
					ref={dp => dropdown.panel = dp}
					onSelect={onSelect}
					ignoreKeyboardEvents={ignoreKeyboardEvents}
					onHighlightChange={dropdown.onHighlightChange}
				>
					{children}
				</DropDownPanel>
			</DropDownListBox>
		);
	}
}

DropDown.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,

	/** Inline styles to apply to this component's root node. */
	style: PropTypes.object,

	/** Whether or not this component is hidden. */
	isHidden: PropTypes.bool,

	/** Applies the correct XUI class based on the chose size. Default will fits to children's width. */
	size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),

	/** An array of keydown keycodes to be ignored from dropdown behaviour. */
	ignoreKeyboardEvents: PropTypes.array,

	/** DOM ID of the list */
	id: PropTypes.string,

	/** The header element. */
	header: PropTypes.element,

	/** Items to be added to the menu's footer. */
	footer: PropTypes.element,

	/** A generalised callback when an item has been selected. */
	onSelect: PropTypes.func,

	/** Whether or not the dropdown should take focus and handle keyboard events automatically */
	hasKeyboardEvents: PropTypes.bool,

	/** Callback for adding additional onKeyPress funcitonality */
	onKeyDown: PropTypes.func,

	/** Whether focus should be restricted to the dropdown while it's open. */
	restrictFocus: PropTypes.bool,

	/** Callback for when the highlighted item in the dropdown changes. */
	onHighlightChange: PropTypes.func,

	/** Will cause the dropdown to animate when closing. */
	animateClosed: PropTypes.bool,

	/** Will cause the dropdown to animate when opening. */
	animateOpen: PropTypes.bool,

	/** Callback for when the animation that closes the dropdown ends. */
	onCloseAnimationEnd: PropTypes.func,

	/** Callback for when animation has ended on open. */
	onOpenAnimationEnd: PropTypes.func,

	/** Whether the fixed width class variant should be used for the size prop */
	fixedWidth: PropTypes.bool,

	/** Force the desktop UI, even if the viewport is narrow enough for mobile. */
	forceDesktop: PropTypes.bool,
};

DropDown.defaultProps = {
	ignoreKeyboardEvents: [],
	isHidden: false,
	hasKeyboardEvents: true,
	restrictFocus: true,
	fixedWidth: false,
	forceDesktop: false,
};
