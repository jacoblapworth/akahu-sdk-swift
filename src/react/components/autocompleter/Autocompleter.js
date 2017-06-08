/* global Map */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import AutocompleterInput from './AutocompleterInput';
import Picklist from '../picklist/Picklist';
import XUILoader from '../loader/XUILoader';
import DropDown from '../dropdown/DropDown';
import DropDownToggled from '../dropdown/DropDownToggled';
import { dropdownSizeClasses } from './private/helpers';

import './Autocompleter.scss';

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
				instance.openDropDown();
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
	}

	componentWillUnmount() {
		HandlersMap.delete(this);
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

	render() {
		const completer = this;
		const props = completer.props;
		let inputQaHook = null;
		let listQaHook = null;
		let containerQaHook = null;
		if (props.qaHook) {
			inputQaHook = `${props.qaHook}-input`;
			listQaHook = `${props.qaHook}-list`;
			containerQaHook = `${props.qaHook}-container`;
		}
		const handlers = getHandlers(completer);
		const trigger = (
			<AutocompleterInput
				refFn={c => completer.input = c}
				value={props.searchValue}
				placeholder={props.placeholder}
				maxLength={props.maxLength}
				onSearch={props.onSearch}
				onKeyDown={handlers.onInputKeyDown}
				className={props.inputClassName}
				throttleInterval={props.searchThrottleInterval}
				qaHook={inputQaHook}
				onFocus={props.openOnFocus ? handlers.onInputFocus : null}
			/>
		);
		const dropdownClasses = cn({
			'xui-u-fullwidth': !props.dropdownSize },
			'ac-dropdown',
			props.dropdownClassName,
			{[dropdownSizeClasses[props.dropdownSize]]: props.dropdownSize}
		);
		const dropdown = (
			<DropDown
				ref={c => completer.dropdown = c}
				ignoreKeyboardEvents={[32]} /* Space doesn't select in an autocompleter */
				id={props.id}
				onSelect={props.onOptionSelect}
				hasKeyboardEvents={false}
				className={dropdownClasses}
				qaHook={listQaHook}
			>
				{props.loading ? <Picklist><XUILoader /></Picklist> : props.children}
			</DropDown>
		);
		const classNames = cn('xui-input', 'ac-wrapper', 'xui-u-flex', props.className, {
			'ac-wrapper--focus': completer.state.focused
		});
		const dropdownToggledClasses = cn({ 'xui-u-fullwidth': !props.dropdownSize }, 'ac-toggled-wrapper');
		return (
			<div
				ref={c => completer.rootNode = c}
				className={classNames}
				onFocus={handlers.onFocus}
				onBlur={handlers.onBlur}
				data-automationid={containerQaHook}
			>
				{props.pills}
				<DropDownToggled
					ref={c => completer.ddt = c}
					trigger={trigger}
					dropdown={dropdown}
					onOpen={props.onOpen}
					onClose={props.onClose}
					closeOnSelect={props.closeOnSelect}
					className={dropdownToggledClasses}
				/>
			</div>
		);
	}
}

Autocompleter.propTypes = {

	/** @property {Function} [onOptionSelect] Callback to handle when an option has been selected from the dropdown */
	onOptionSelect: PropTypes.func,

	/** @property {Boolean} [loading] When set to true a loader will be displayed instead of the picklist items.
	 * State for this should be managed externally and it's defaulted to false.
	 */
	loading: PropTypes.bool,

	/** @property {String} [id] ID to be added to the dropdown element of the completer */
	id: PropTypes.string,

	/** @property {String} Value that should be inside the input. */
	searchValue: PropTypes.string,

	/** @property {String} [className] CSS class(es) to go on the wrapping DOM node */
	className: PropTypes.string,

	/** @property {String} [dropdownClassName] CSS class(es) to go on the dropdown list */
	dropdownClassName: PropTypes.string,

	/** @property {String} [inputClassName] CSS class(es) to go on the input */
	inputClassName: PropTypes.string,

	/** @property {String} [placeholder] Placeholder for the input */
	placeholder: PropTypes.string,

	/** @property {number} [maxLength] Max length of the input */
	maxLength: PropTypes.number,

	/** @property {Pill|Pill[]} [pills] A set of pills to show above the input.  Useful for showing what was selected in a multi-select */
	pills: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),

	/** @property {function} [onOpen] Callback for when the list opens */
	onOpen: PropTypes.func,

	/** @property {function} [onOpen] Callback for when the list closes */
	onClose: PropTypes.func,

	/** @property {function} [onSearch] Callback for when the user types into the search box */
	onSearch: PropTypes.func,

	/** @property {number} [searchThrottleInterval=0] If you want to throttle the input's onChange handler, put the throttle interval here */
	searchThrottleInterval: PropTypes.number,

	/** @property {String} [dropdownSize] maps to the 'size' property of the dropdown component.
	 * More can be found here: https://github.dev.xero.com/ReactLabs/dropdown/blob/master/README.md
	 */
	dropdownSize: PropTypes.string,

	/** @property {Boolean} [closeOnSelect] maps to the `closeOnSelect` property of the DropDownToggled component. */
	closeOnSelect: PropTypes.bool,

	/** @property {Boolean} [openOnFocus] false by default, when set to true the dropdown will automatically open when the input is given focus. */
	openOnFocus: PropTypes.bool,

	qaHook: PropTypes.string,
	children: PropTypes.node
};

Autocompleter.defaultProps = {
	loading: false,
	searchThrottleInterval: 0,
	openOnFocus: false
};
