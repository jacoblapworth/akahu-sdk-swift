import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import cn from 'classnames';
import DropDownLayout from './DropDownLayout';
import DropDownPanel from './DropDownPanel';
import { lockScroll, unlockScroll } from '../helpers/lockScroll';

import './scss/_dropDown.scss';

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

		const { isHidden, restrictFocus } = this.props

		this.dropdownId = props.id || uuidv4();
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onHighlightChange = this.onHighlightChange.bind(this);
		this.highlightItem = this.highlightItem.bind(this);
		this.lockScroll = this.lockScroll.bind(this);
		this.unlockScroll = this.unlockScroll.bind(this);
		this._restrictFocus = this._restrictFocus.bind(this);

		if (!isHidden && restrictFocus) {
			window.addEventListener('focus', this._restrictFocus, true);
		}
	}

	componentDidUpdate(prevProps) {
		const dropdown = this;
		const { isHidden, hasKeyboardEvents, restrictFocus } = dropdown.props;
		if (!isHidden) {
			if (hasKeyboardEvents && !dropdown.panel.hasFocus()) {
				dropdown.panel.focus();
			}
			const id = dropdown.panel && dropdown.panel.getHighlightedId();
			if (id) {
				dropdown.panel.scrollIdIntoView(id);
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
	 * Keydown handler for the DropDown.  If `hasKeyboardEvents` is true, then this component will
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
		if (this.panel != null) {
			this.panel.onKeyDown(event);
		}
	}

	keyDownHandler = event => {
		if (typeof this.props.onKeyDown === 'function') {
			this.props.onKeyDown(event);
		}
	}

	// TODO: This should be extracted into a separate consumable when we figure out how to do tab key management
	/**
	 * @private
	 * @param {Object} event - A focus change event which is set to be listened to by the window
	 * Limits the focusable elements to those within the dropdown
	 **/
	_restrictFocus(event) {
		const dropdown = this;
		if (dropdown.panel != null && dropdown.panel.rootNode != null) {
			const rootNode = dropdown.panel.rootNode;
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
			dropdown.panel.scrollIdIntoView(item.props.id);
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
				this.panel.scrollIdIntoView(highlightedId);
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
			forceStatefulPicklist,
		} = this.props;

		const dropdownClasses = cn(className, {
			'xui-dropdown-fullheight': header
		});

		return (
			<DropDownLayout
				animateClosed={animateClosed}
				animateOpen={animateOpen}
				className={dropdownClasses}
				fixedWidth={fixedWidth}
				forceDesktop={forceDesktop}
				id={this.dropdownId}
				isHidden={isHidden}
				onCloseAnimationEnd={onCloseAnimationEnd}
				onOpenAnimationEnd={onOpenAnimationEnd}
				size={size}
				style={style}
			>
				<DropDownPanel
					footer={footer}
					forceStatefulPicklist={forceStatefulPicklist}
					header={header}
					ignoreKeyboardEvents={ignoreKeyboardEvents}
					onHighlightChange={this.onHighlightChange}
					onKeyDown={this.keyDownHandler}
					onSelect={onSelect}
					qaHook={qaHook}
					ref={c => this.panel = c}
					style={{
						maxHeight: style && style.maxHeight
					}}
				>
					{children}
				</DropDownPanel>
			</DropDownLayout>
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

	/** Force wrapping Panel childrens in a StatefulPicklist  */
	forceStatefulPicklist: PropTypes.bool
};

DropDown.defaultProps = {
	fixedWidth: false,
	forceDesktop: false,
	forceStatefulPicklist: false,
	hasKeyboardEvents: true,
	ignoreKeyboardEvents: [],
	isHidden: false,
	restrictFocus: true,
};
