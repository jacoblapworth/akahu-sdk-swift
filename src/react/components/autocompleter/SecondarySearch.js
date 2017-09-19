import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import AutocompleterInput from './AutocompleterInput';
import Picklist from '../picklist/Picklist';
import DropDown from '../dropdown/DropDown';
import DropDownToggled from '../dropdown/DropDownToggled';
import search from '@xero/xui-icon/icons/search'

import { intervalRunner, isVisible } from './private/helpers';

export default class SecondarySearch extends PureComponent {
	constructor(props) {
		super(props);
		this.openDropDown = this.openDropDown.bind(this);
		this.closeDropDown = this.closeDropDown.bind(this);
		this.onOpen = this.onOpen.bind(this);
		this.highlightItem = this.highlightItem.bind(this);
	}

	/**
	 * Set the state as not hidden in order to toggle the list open.
	 *
	 * @public
	 */
	openDropDown() {
		this.ddt.openDropDown();
	}

	/**
	 * Set the state as hidden in order to toggle the list closed.
	 *
	 * @public
	 */
	closeDropDown() {
		this.ddt.closeDropDown();
	}

	/**
	 * Manually highlight an item in the list for selection.
	 *
	 * @public
	 */
	highlightItem(item) {
		this.dropdown.highlightItem(item);
	}

	/**
	 * Focuses the autocompleter input before calling props.onOpen
	 *
	 * @public
	 */
	onOpen() {
		this.focusInput();
		this.props.onOpen && this.props.onOpen();
	}

	/**
	 * Focus the AutocompleterInput input element, if visible.
	 *
	 * @public
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
		const dropdownClasses = cn(
			{ 'xui-u-fullwidth': !props.dropdownSize },
			props.dropdownClassName,
		);
		const searchItem = (
			<Picklist className="xui-padding-none">
				<li className="xui-margin-horizontal xui-margin-vertical-small" >
					<AutocompleterInput
						defaultStyling={false}
						className="xui-input xui-input-borderless xui-input-borderless-solid"
						id={props.inputId}
						value={props.searchValue}
						iconAttributes={{
							path: search,
							position: 'left'
						}}
						placeholder={props.placeholder}
						searchThrottleInterval={props.searchThrottleInterval}
						onSearch={props.onSearch}
						refFn={c => completer.input = c}
					/>
				</li>
			</Picklist>
		);
		const dropdownToggledClasses = cn({ 'xui-u-fullwidth': !props.dropdownSize });
		const dropdown = (
			<DropDown
				ref={d => completer.dropdown = d}
				ignoreKeyboardEvents={[32,37,39]} /* Space doesn't select in an autocompleter; left and right arrow keys should move cursor in the input */
				hasKeyboardEvents={false}
				onSelect={props.onOptionSelect}
				id={props.id}
				className={dropdownClasses}
				qaHook={listQaHook}
				size={props.dropdownSize}
				fixedWidth={props.dropdownFixedWidth}
			>
			{searchItem}
			{props.children}
		</DropDown>);

		return (
			<div
				ref={c => completer.rootNode = c}
				className={props.className}
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
					matchTriggerWidth={props.matchTriggerWidth}
				/>
			</div>
		);
	}
}

SecondarySearch.propTypes = {
	/** Callback to handle when an option has been selected from the dropdown */
	onOptionSelect: PropTypes.func,

	/**
	 * When set to true a loader will be displayed instead of the picklist items.
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

	/** Placeholder for the input */
	placeholder: PropTypes.string,

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

	/** Will be passed directly down to the DropDownToggled component as the main trigger. */
	trigger: PropTypes.element.isRequired,

	/** ID to be applied to the AutocompleterInput component. */
	inputId: PropTypes.string,

	/** Force the desktop user experience, even if the viewport is narrow enough for mobile. */
	forceDesktop: PropTypes.bool,

	/** If a size is set, this will force the dropdown to that size instead of setting it as a max width. */
	dropdownFixedWidth: PropTypes.bool,

	/**
	 * Setting to true will allow the dropdown's width to be set dependent of the trigger width.
	 * Note: Setting this to true will override any size prop on DropDown. XUI design has also decided  
	 * to keep a minimum width on the dropdown, so dropdown may not match the width of narrow triggers.
	 */
	matchTriggerWidth: PropTypes.bool,

	qaHook: PropTypes.string,
	children: PropTypes.node,
};

SecondarySearch.defaultProps = {
	loading: false,
	searchThrottleInterval: 0,
	openOnFocus: false,
	inputId: 'secondary_search_input'
};