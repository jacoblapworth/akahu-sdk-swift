import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import throttle from 'lodash.throttle';
import Picklist from '../picklist/Picklist';
import XUILoader from '../loader/XUILoader';
import DropDown from '../dropdown/DropDown';
import DropDownToggled from '../dropdown/DropDownToggled';
import XUITextInput from '../textInput/XUITextInput';
import {ns} from '../helpers/xuiClassNamespace';

/*
 * Keyboard bindings to ignore. Space doesn't select in an autocompleter; left and right arrow keys should move cursor in the input
 * @private
 * @type {Array}
 */
const ignoreKeyboardEvents = [32,37,39];

export default class XUIAutocompleter extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			focused: false,
			value: props.searchValue
		};
		this.bindOnChange(props.searchThrottleInterval);
	}

	componentDidMount() {
		this.calculatePlaceholderWidth();
	}

	componentDidUpdate(prevProps) {
		const {
			pills,
			disableWrapPills,
			searchThrottleInterval,
			searchValue,
			placeholder,
		} = this.props;
		if (prevProps.searchThrottleInterval !== searchThrottleInterval) {
			this.bindOnChange(searchThrottleInterval);
		}
		if (prevProps.searchValue !== searchValue) {
			this.setState({
				value: searchValue
			});
		}
		if (prevProps.placeholder !== placeholder) {
			this.calculatePlaceholderWidth();
		}
		const morePillsExist = React.Children.count(pills) > React.Children.count(prevProps.pills);
		if (morePillsExist && disableWrapPills) {
			this.noWrapPillContainer.scrollLeft = this.noWrapPillContainer.scrollWidth;
		}
	}

	/**
	 * Bind an optionally throttled onSearch handler to the component instance.
	 *
	 * @private
	 * @param {number} interval
	 */
	bindOnChange = interval => {
		const { onSearch } = this.props;
		if (onSearch) {
			const throttled = interval
				? throttle(onSearch, interval, { trailing: true })
				: onSearch;
			this.throttledOnChange = event => {
				event.persist();
				this.setState({
					value: event.target.value
				});
				throttled(event.target.value);
			};
		} else {
			this.throttledOnChange = undefined;
		}
	};

	calculatePlaceholderWidth = () => {
		if (this.placeholder != null) {
			const placeholderWidth = getComputedStyle(this.placeholder).width;
			const inputStyle = getComputedStyle(this.inputNode);
			const inputWidth = `${
				parseFloat(inputStyle.paddingLeft)
				+ parseFloat(inputStyle.paddingRight)
				+ parseFloat(placeholderWidth)
			}px`;
			if (this.state.inputWidth !== inputWidth) {
				this.setState({
					inputWidth
				});
			}
		}
	};

	/**
	 * @public
	 * Set the state as not hidden in order to toggle the list open.
	 */
	openDropDown = () => {
		this.ddt.openDropDown();
	};

	/**
	 * @public
	 * Set the state as hidden in order to toggle the list closed.
	 */
	closeDropDown = () => {
		this.ddt.closeDropDown();
	};

	/**
	 * @public
	 * Manually highlight an item in the list for selection.
	 */
	highlightItem = item => {
		this.dropdown.highlightItem(item);
	};

	/**
	 * @public
	 * Focuses the text input
	 */
	focusInput = () => {
		this.inputNode.focus();
	};

	/**
	* @public
	* If a onHighlightChange prop is passed to the completer, it's called passing in the highlighted item.
	*
	* @param {item} Object
	*/
	onHighlightChange = item => {
		this.props.onHighlightChange && this.props.onHighlightChange(item);
	};

	onInputKeyDown = event => {
		const {
			onBackspacePill,
			pills,
		} = this.props;
		if (this.ddt.isDropDownOpen()) {
			this.dropdown.onKeyDown(event);
		}

		if (
			event.key === 'Backspace' &&
			this.inputNode.value === "" &&
			onBackspacePill &&
			pills &&
			(pills.length > 0 || React.isValidElement(pills))
		) {
			onBackspacePill();
		}
	};

	onInputFocus = () => {
		if (!this.state.focused) {
			this.openDropDown();
		}
	};

	onFocus = () => {
		this.focusInput();
		this.setState({
			focused: true
		});
	};

	onBlur = () => {
		setTimeout(() => {
			if (this.rootNode && !this.rootNode.contains(document.activeElement)) {
				this.setState({
					focused: false
				});
			}
		}, 333);
	};

	renderPills = () => {
		const {
			disableWrapPills,
			pills
		} = this.props;
		return disableWrapPills ? (
			<div
				className={`${ns}-autocompleter--pills-nopillwrap`}
				ref={nwpc => this.noWrapPillContainer = nwpc}
			>
				{pills}
			</div>
		) : pills;
	}

	render() {
		const completer = this;
		const props = completer.props;
		const state = completer.state;
		let inputQaHook = null;
		let listQaHook = null;
		let containerQaHook = null;
		let dropdownQaHook = null;
		if (props.qaHook) {
			inputQaHook = `${props.qaHook}`; //TODO: Investigate whether we should add --input here in 14
			listQaHook = `${props.qaHook}--list`;
			containerQaHook = `${props.qaHook}--container`;
			dropdownQaHook = `${props.qaHook}--dropdown`;
		}
		const hasPills = props.pills != null && (props.pills.length > 0 || React.isValidElement(props.pills));
		const textInputLeftElement = hasPills ? this.renderPills() : props.leftElement;

		const containerClassNames = cn(
			props.inputContainerClassName,
			{
				[`${ns}-autocompleter--trigger-pillwrap`]: hasPills && !props.disableWrapPills,
			});

		const inputClassNames = cn(
			props.inputClassName,
			`${ns}-autocompleter--textinput`,
			{[`${ns}-padding-left-small`]: hasPills}
		);

		const trigger = (
			<div
				ref={tg => this.trigger = tg}
				onFocus={props.openOnFocus ? this.onInputFocus : null}
				className={props.triggerClassName}
			>
				<div
					ref={p => this.placeholder = p}
					className={`${ns}-autocompleter--textinputplaceholder`}
					aria-hidden
				>
					{props.placeholder}
				</div>
				<XUITextInput
					leftElement={textInputLeftElement}
					rightElement={props.rightElement}
					containerClassName={containerClassNames}
					inputClassName={inputClassNames}
					inputRef={i => this.inputNode = i}
					placeholder={props.placeholder}
					value={state.value || ''}
					onChange={this.throttledOnChange}
					onKeyDown={this.onInputKeyDown}
					qaHook={inputQaHook}
					isDisabled={props.isDisabled}
					labelText={props.inputLabelText}
					isLabelHidden={props.isInputLabelHidden}
					inputProps={{
						...props.inputProps,
						'maxLength': props.maxLength,
						'id': props.inputId,
						'role': "textbox",
						'aria-multiline': false,
						'aria-autocomplete': "list",
						'style': {
							flexBasis: state.inputWidth
						}
					}}
				/>
			</div>
		);

		const dropdown = (
			<DropDown
				ref={c => completer.dropdown = c}
				ignoreKeyboardEvents={ignoreKeyboardEvents}
				id={props.dropdownId}
				onSelect={props.onOptionSelect}
				hasKeyboardEvents={false}
				className={props.dropdownClassName}
				qaHook={listQaHook}
				restrictFocus={false}
				size={props.dropdownSize}
				fixedWidth={props.dropdownFixedWidth}
				footer={props.footer}
				onHighlightChange={completer.onHighlightChange}
			>
				{props.loading ? <Picklist><XUILoader /></Picklist> : props.children}
			</DropDown>
		);

		const classNames = cn(
			props.className,
			state.focused && `${ns}-autocompleter--trigger-focus`
		);

		return (
			<div
				ref={c => completer.rootNode = c}
				className={classNames}
				onFocus={this.onFocus}
				onBlur={this.onBlur}
				data-automationid={containerQaHook}
				id={props.id}
			>
				<DropDownToggled
					ref={c => completer.ddt = c}
					trigger={trigger}
					dropdown={dropdown}
					onOpen={props.onOpen}
					onClose={props.onClose}
					closeOnTab={props.closeOnTab}
					closeOnSelect={props.closeOnSelect}
					triggerClickAction="none"
					forceDesktop={props.forceDesktop}
					matchTriggerWidth={props.matchTriggerWidth && !props.dropdownSize}
					qaHook={dropdownQaHook}
					isBlock
					ariaRole="combobox"
				/>
			</div>
		);
	}
}

//TODO: Rename `pills` to `leftElement` for XUI 14.
XUIAutocompleter.propTypes = {
	/** Callback to handle when an option has been selected from the dropdown */
	onOptionSelect: PropTypes.func,

	/** Callback to handle when a pill has been backspaced */
	onBackspacePill: PropTypes.func,

	/** When set to true a loader will be displayed instead of the picklist items.
	 * State for this should be managed externally and it's defaulted to false.
	 */
	loading: PropTypes.bool,

	/** ID to be added to the root node of the completer */
	id: PropTypes.string,

	/** ID to be added to the dropdown element of the completer */
	dropdownId: PropTypes.string,

	/** Value that should be inside the input. */
	searchValue: PropTypes.string,

	/** CSS class(es) to go on the wrapping DOM node */
	className: PropTypes.string,

	/** CSS class(es) to go on the dropdown list */
	dropdownClassName: PropTypes.string,

	/** CSS class(es) to go on the input */
	inputClassName: PropTypes.string,

	/** CSS class(es) to go on the input container component */
	inputContainerClassName: PropTypes.string,

	/** Label to show above the input */
	inputLabelText: PropTypes.string,

	/** Should label be applied as an aria-label, rather than being visibly displayed. */
	isInputLabelHidden: PropTypes.bool,

	/** Attributes to set on the native input element */
	inputProps: PropTypes.object,

	/** CSS class(es) to go on the trigger element which contains the input and pills */
	triggerClassName: PropTypes.string,

	/** Placeholder for the input */
	placeholder: PropTypes.string,

	/** Max length of the input */
	maxLength: PropTypes.number,

	/** A set of pills to show next to input. Useful for showing what was selected in a multi-select. Can also be used similarly to `XUITextInput`'s `leftElement`. */
	pills: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),

	/** Right element to render within the `XUITextInput` component */
	rightElement: PropTypes.node,

	/** Left element to render within the `XUITextInput` component. Should not be used together with the `pills` prop */
	leftElement: PropTypes.node,

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

	/** Maps to the `closeOnTab` property of the DropDownToggled component. Set to false, if you've supplied a footer element with any links or interaction. */
	closeOnTab: PropTypes.bool,

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

	/** A footer element can be added. */
	footer: PropTypes.element,

	/** Callback for when the highlighted item changes. */
	onHighlightChange: PropTypes.func,

	qaHook: PropTypes.string,
	children: PropTypes.node
};

XUIAutocompleter.defaultProps = {
	loading: false,
	searchThrottleInterval: 0,
	openOnFocus: false,
	closeOnTab: true,
	forceDesktop: true,
	dropdownFixedWidth: false,
	matchTriggerWidth: true,
	disableWrapPills: false
};
