import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIAutocompleterTextInput from './XUIAutocompleterTextInput';
import DropDown from '../dropdown/DropDown';
import DropDownToggled from '../dropdown/DropDownToggled';
import searchPath from '@xero/xui-icon/icons/search'
import XUITextInputSideElement from '../textInput/XUITextInputSideElement';
import XUIIcon from '../icon/XUIIcon';
import {ns} from "../helpers/xuiClassNamespace";

import { intervalRunner, isVisible } from './private/helpers';

export default class XUIAutocompleterSecondarySearch extends PureComponent {
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
	 * Focus the XUIAutocompleterInput input element, if visible.
	 *
	 * @public
	 */
	focusInput() {
		const inputDOM = this.input;
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
			listQaHook = `${props.qaHook}--list`;
			containerQaHook = `${props.qaHook}--container`;
		}
		const dropdownClasses = cn(
			props.dropdownSize ? '' : `${ns}-u-fullwidth`,
			props.dropdownClassName,
		);
		const searchItem = (
			<div className={`${ns}-dropdown--header-container`}>
					<XUIAutocompleterTextInput
						value={props.searchValue}
						leftElement={
							<XUITextInputSideElement>
								<XUIIcon path={searchPath} />
							</XUITextInputSideElement>
						}
						placeholder={props.placeholder}
						throttleInterval={props.searchThrottleInterval}
						onChange={props.onSearch}
						inputRef={c => completer.input = c}
						textInputComponentProps={{
							isBorderlessSolid: true
						}}
						inputProps={{
							id: props.inputId
						}}
					/>
			</div>
		);
		const dropdownToggledClasses = props.dropdownSize ? '' : `${ns}-u-fullwidth`;
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
				header={searchItem}
				footer={props.footer}
				restrictFocus={props.restrictFocus}
			>
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

XUIAutocompleterSecondarySearch.propTypes = {
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

	/** ID to be applied to the XUIAutocompleterInput component. */
	inputId: PropTypes.string,

	/** Force the desktop user experience, even if the viewport is narrow enough for mobile. */
	forceDesktop: PropTypes.bool,

	/** If a size is set, this will force the dropdown to that size instead of setting it as a max width. */
	dropdownFixedWidth: PropTypes.bool,

	/** Whether focus should be restricted to the dropdown while it's open. */
	restrictFocus: PropTypes.bool,

	/**
	 * Setting to true will allow the dropdown's width to be set dependent of the trigger width.
	 * Note: Setting this to true will override any size prop on DropDown. XUI design has also decided
	 * to keep a minimum width on the dropdown, so dropdown may not match the width of narrow triggers.
	 */
	matchTriggerWidth: PropTypes.bool,

	/** A Footer element can be added. */
	footer: PropTypes.element,

	qaHook: PropTypes.string,
	children: PropTypes.node,
};

XUIAutocompleterSecondarySearch.defaultProps = {
	loading: false,
	searchThrottleInterval: 0,
	openOnFocus: false,
	inputId: 'secondary_search_input',
	restrictFocus: true,
};
