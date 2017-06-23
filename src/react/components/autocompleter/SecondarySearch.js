import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import AutocompleterInput from './AutocompleterInput';
import Picklist from '../picklist/Picklist';
import DropDown from '../dropdown/DropDown';
import DropDownToggled from '../dropdown/DropDownToggled';

import { intervalRunner, isVisible, dropdownSizeClasses } from './private/helpers';

import './Autocompleter.scss';

export default class SearchableDropdown extends PureComponent {
	constructor(props) {
		super(props);
		this.openDropDown = this.openDropDown.bind(this);
		this.closeDropDown = this.closeDropDown.bind(this);
		this.onOpen = this.onOpen.bind(this);
		this.highlightItem = this.highlightItem.bind(this);
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
	 * Focuses the autocompleter input before calling props.onOpen
	 */
	onOpen() {
		this.focusInput();
		this.props.onOpen && this.props.onOpen();
	}

	/**
	 * @public
	 * Focus the AutocompleterInput <input> element if visible
	 */
	focusInput() {
		const inputDOM = this.input.inputNode;
		const isInputRendered = () => isVisible(inputDOM);
		const setter = () => {
			inputDOM.focus();
		};
		intervalRunner(isInputRendered, setter);
	}

	render() {
		const completer = this;
		const props = completer.props;

		let listQaHook = null;
		let containerQaHook = null;
		if (props.qaHook) {
			listQaHook = `${props.qaHook}-list`;
			containerQaHook = `${props.qaHook}-container`;
		}
		const classNames = cn('ac-wrapper', 'xui-u-flex', props.className);
		const dropdownClasses = cn(
			{ 'xui-u-fullwidth': !props.dropdownSize },
			props.dropdownClassName,
			{[dropdownSizeClasses[props.dropdownSize]]: props.dropdownSize}
		);
		const searchItem = (
			<Picklist className="xui-padding-none">
				<li className="xui-margin-horizontal xui-margin-vertical-small" >
					<AutocompleterInput
						id={props.inputId}
						value={props.searchValue}
						iconAttributes={{ icon: 'search' }}
						placeholder={props.placeholder}
						className="xui-input-borderless"
						searchThrottleInterval={props.searchThrottleInterval}
						onSearch={props.onSearch}
						refFn={c => completer.input = c}
						containerClassNames="ac-search-wrapper"
						/>
				</li>
			</Picklist>
		);
		const dropdownToggledClasses = cn({ 'xui-u-fullwidth': !props.dropdownSize });
		const dropdown = (
			<DropDown
				ref={d => completer.dropdown = d}
				ignoreKeyboardEvents={[32]} /* Space doesn't select in an autocompleter */
				hasKeyboardEvents={false}
				onSelect={props.onOptionSelect}
				id={props.id}
				className={dropdownClasses}
				qaHook={listQaHook}
			>
			{searchItem}
			{props.children}
		</DropDown>);

		return (
			<div
				ref={c => completer.rootNode = c}
				className={classNames}
				data-automationid={containerQaHook}
			>
				<DropDownToggled
				ref={c => completer.ddt = c}
				trigger={props.trigger}
				dropdown={dropdown}
				onOpen={completer.onOpen}
				onClose={props.onClose}
				closeOnSelect={props.closeOnSelect}
				className={dropdownToggledClasses}
				/>
			</div>
		);
	}
}

SearchableDropdown.propTypes = {

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

	/** @property {Element} Will be passed directly down to the DropDownToggled component as the main trigger. */
	trigger: PropTypes.element.isRequired,

	/** @property {String} [inputId] Id to be applied to the AutocompleterInput component. */
	inputId: PropTypes.string,

	qaHook: PropTypes.string,
	children: PropTypes.node
};

SearchableDropdown.defaultProps = {
	loading: false,
	searchThrottleInterval: 0,
	openOnFocus: false,
	inputId: 'secondary_search_input'
};
