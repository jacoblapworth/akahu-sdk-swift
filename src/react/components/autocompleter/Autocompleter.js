/* global Map */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import AutocompleterInput from './AutocompleterInput';
import Picklist from '../picklist/Picklist';
import XUILoader from '../loader/XUILoader';
import DropDown from '../dropdown/DropDown';
import DropDownToggled from '../dropdown/DropDownToggled';

/**
 * Autocompleter instance => event handlers/callbacks map
 *
 * @private
 * @type {Map.<Autocompleter, Object>}
 */
const HandlersMap = new Map();

/**
 * Create private event handlers and callbacks for the associated instance, then cache them.  Retrieve from cache on
 * subsequent calls.
 *
 * @private
 * @param {Autocompleter} instance
 * @returns {Object}
 */
function getHandlers(instance) {
	let handlers = HandlersMap.get(instance);
	if (!handlers) {
		handlers = {
			onInputKeyDown: event => {
				if (instance.ddt.isDropDownOpen()) {
					instance.dropdown.onKeyDown(event);
				}
			},
			onInputFocus: () => {
				if (!instance.state.focused) {
					instance.openDropDown();
				}
			},
			onFocus: () => {
				instance.setState({
					focused: true
				});
			},
			onBlur: () => {
				setTimeout(() => {
					if (instance.rootNode && !instance.rootNode.contains(document.activeElement)) {
						instance.setState({
							focused: false
						});
					}
				}, 333);
			}
		};
		HandlersMap.set(instance, handlers);
	}
	return handlers;
}

export default class Autocompleter extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			focused: false
		};
		this.focusInput = this.focusInput.bind(this);
		this.scrollInputIntoView = this.scrollInputIntoView.bind(this);
	}

	componentWillUnmount() {
		HandlersMap.delete(this);
		window.removeEventListener('resize', this.scrollInputIntoView);
	}

	componentWillMount() {
		if (this.props.disableWrapPills) {
			window.addEventListener('resize', this.scrollInputIntoView);
		}
	}

	componentDidMount() {
		this.scrollInputIntoView();
	}

	componentDidUpdate(prevProps) {
		const completer = this;
		if (completer.props.pills > prevProps.pills) {
			completer.scrollInputIntoView();
		}
		if (!completer.props.disableWrapPills && prevProps.disableWrapPills) {
			window.addEventListener('resize', this.scrollInputIntoView);
		}
	}

	scrollInputIntoView() {
		this.trigger.scrollLeft = this.trigger.scrollWidth;
	}

	/**
	 * @public
	 * Set the state as not hidden in order to toggle the list open.
	 */
	openDropDown() {
		this.ddt.openDropDown();
	}

	/**
	 * @public
	 * Set the state as hidden in order to toggle the list closed.
	 */
	closeDropDown() {
		this.ddt.closeDropDown();
	}

	/**
	 * @public
	 * Manually highlight an item in the list for selection.
	 */
	highlightItem(item) {
		this.dropdown.highlightItem(item);
	}

	/**
	 * @public
	 * Focuses the text input
	 */
	focusInput() {
		this.input.inputNode.focus();
	}

	render() {
		const completer = this;
		const props = completer.props;
		const state = completer.state;
		let inputQaHook = null;
		let listQaHook = null;
		let containerQaHook = null;
		if (props.qaHook) {
			inputQaHook = `${props.qaHook}-input`;
			listQaHook = `${props.qaHook}-list`;
			containerQaHook = `${props.qaHook}-container`;
		}

		const handlers = getHandlers(completer);
		const triggerClasses = cn(
			'xui-input',
			'xui-autocompleter--trigger',
			{
				'xui-autocompleter--trigger-is-disabled': props.isDisabled,
				'xui-autocompleter--trigger-pillwrap': !props.disableWrapPills
			},
			props.triggerClassName
		);
		const inputClasses = cn(
			props.inputClassName,
			'xui-autocompleter--input'
		);
		const trigger = (
			<div
				className={triggerClasses}
				id="trigger"
				ref={tg => this.trigger=tg}
				onFocus={this.focusInput}
			>
				{props.pills}
				<AutocompleterInput
					refFn={c => completer.input = c}
					value={props.searchValue}
					placeholder={props.placeholder}
					maxLength={props.maxLength}
					onSearch={props.onSearch}
					onKeyDown={handlers.onInputKeyDown}
					className={inputClasses}
					throttleInterval={props.searchThrottleInterval}
					qaHook={inputQaHook}
					onFocus={props.openOnFocus ? handlers.onInputFocus : null}
					id={props.inputId}
				/>
			</div>
		);

		const dropdown = (
			<DropDown
				ref={c => completer.dropdown = c}
				ignoreKeyboardEvents={[32,37,39]} /* Space doesn't select in an autocompleter; left and right arrow keys should move cursor in the input */
				id={props.id}
				onSelect={props.onOptionSelect}
				hasKeyboardEvents={false}
				className={props.dropdownClassName}
				qaHook={listQaHook}
				restrictFocus={false}
				size={props.dropdownSize}
				fixedWidth={props.dropdownFixedWidth}
			>
				{props.loading ? <Picklist><XUILoader /></Picklist> : props.children}
			</DropDown>
		);

		const classNames = cn(
			props.className,
			{
				'xui-autocompleter--trigger-focus': state.focused
			}
		);

		return (
			<div
				ref={c => completer.rootNode = c}
				className={classNames}
				onFocus={handlers.onFocus}
				onBlur={handlers.onBlur}
				data-automationid={containerQaHook}
			>
				<DropDownToggled
					ref={c => completer.ddt = c}
					trigger={trigger}
					dropdown={dropdown}
					onOpen={props.onOpen}
					onClose={props.onClose}
					closeOnSelect={props.closeOnSelect}
					triggerClickAction="none"
					forceDesktop={props.forceDesktop}
					matchTriggerWidth={props.matchTriggerWidth && !props.dropdownSize}
				/>
			</div>
		);
	}
}

Autocompleter.propTypes = {
	/** Callback to handle when an option has been selected from the dropdown */
	onOptionSelect: PropTypes.func,

	/** When set to true a loader will be displayed instead of the picklist items.
	 * State for this should be managed externally and it's defaulted to false.
	 */
	loading: PropTypes.bool,

	/** ID to be added to the dropdown element of the completer */
	id: PropTypes.string,

	/** Value that should be inside the input. */
	searchValue: PropTypes.string,

	/** CSS class(es) to go on the wrapping DOM node */
	className: PropTypes.string,

	/** CSS class(es) to go on the dropdown list */
	dropdownClassName: PropTypes.string,

	/** CSS class(es) to go on the input */
	inputClassName: PropTypes.string,

	/** CSS class(es) to go on the trigger element which contains the input and pills */
	triggerClassName: PropTypes.string,

	/** Placeholder for the input */
	placeholder: PropTypes.string,

	/** Max length of the input */
	maxLength: PropTypes.number,

	/** A set of pills to show above the input.  Useful for showing what was selected in a multi-select */
	pills: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),

	/** Callback for when the list opens */
	onOpen: PropTypes.func,

	/** Callback for when the list closes */
	onClose: PropTypes.func,

	/** Callback for when the user types into the search box */
	onSearch: PropTypes.func,

	/** If you want to throttle the input's onChange handler, put the throttle interval here */
	searchThrottleInterval: PropTypes.number,

	/** Maps to the 'size' property of the dropdown component. */
	dropdownSize: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),

	/** Maps to the `closeOnSelect` property of the DropDownToggled component. */
	closeOnSelect: PropTypes.bool,

	/** When set to true the dropdown will automatically open when the input is given focus. */
	openOnFocus: PropTypes.bool,

	/** Force the desktop user experience, even if the viewport is narrow enough for mobile. */
	forceDesktop: PropTypes.bool,

	/** If a size is set, this will force the dropdown to that size instead of setting it as a max width. */
	dropdownFixedWidth: PropTypes.bool,

	/**
	 * Setting to false will allow the dropdown's width to be set independent of the trigger width.
	 * Note: Setting this to true will override any size prop on DropDown.  XUI design has also decided
	 * to keep a minimum width on the dropdown, so dropdown may not match the width of narrow triggers.
	 */
	matchTriggerWidth: PropTypes.bool,

	/** Whether the pills should wrap instead of scroll on overflow */
	disableWrapPills: PropTypes.bool,

	/** Whether to render as disabled */
	isDisabled: PropTypes.bool,

	/** ID to apply to the input element. Useful for labels. */
	inputId: PropTypes.string,

	qaHook: PropTypes.string,
	children: PropTypes.node
};

Autocompleter.defaultProps = {
	loading: false,
	searchThrottleInterval: 0,
	openOnFocus: false,
	forceDesktop: false,
	dropdownFixedWidth: false,
	matchTriggerWidth: true,
	disableWrapPills: false
};
