import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import uuidv4 from 'uuid/v4';
import DropDown from '../dropdown/DropDown';
import DropDownToggled from '../dropdown/DropDownToggled';
import XUIButton from '../button/XUIButton';
import XUIButtonCaret from '../button/XUIButtonCaret';
import Picklist from '../picklist/Picklist';
import qaHooks from './qaHooks';
import {ns} from "../helpers/xuiClassNamespace";

/**
 * If a qaHook is supplied in component props this helper provides a suffix for
 * sub-components
 *
 * @private
 * @param {String} propsQaHook The qaHook prop supplied to the component
 * @param {String} suffix      The suffix to add. This should be a constant from
 *                             the QA_HOOKS property of constants object.
 * @return {String | null}						 QA_HOOK + Suffix or null if qaHook is undefined
 */
function setQaHook(propsQaHook, suffix) {
	return propsQaHook ? `${propsQaHook}-${suffix}` : null;
}

export default class SelectBox extends Component {
	constructor(props) {
		super(props);
		const selectBox = this;

		selectBox.state = {
			ariaId: props.id || uuidv4()
		};

		selectBox.isDropDownOpen = selectBox.isDropDownOpen.bind(selectBox);
		selectBox.onLabelClick = selectBox.onLabelClick.bind(selectBox);
	}

	isDropDownOpen() {
		return !!this.ddt && this.ddt.isDropDownOpen();
	}

	onLabelClick() {
		this.trigger.focus();
	}

	render() {
		const selectBox = this;
		const { props } = selectBox;
		const containerClasses = props.containerClasses || '';
		const buttonClasses = cn(
			props.isTextTruncated && props.buttonVariant && `${ns}-text-truncated`,
			!props.buttonVariant && `${ns}-select--button`,
			props.buttonClasses
		);
		const inputGroupClasses = cn(
			props.defaultLayout && `${ns}-select-layout`,
			props.inputGroupClasses
		);
		const labelClasses = cn(
			`${ns}-text-label`,
			props.labelClassName,
			props.defaultLayout && `${ns}-fieldlabel-layout`,
			props.islabelHidden && `${ns}-u-hidden-visually`
		);
		const dropDownClasses = props.dropDownClasses;
		const caretClasses = !props.buttonVariant ? `${ns}-select--caret` : '';
		const content = !props.buttonVariant ? (
			<span className={`${ns}-select--content`}>
				{props.buttonContent}
			</span>
		) : props.buttonContent;
		const trigger = (
			<XUIButton
				className={buttonClasses}
				type="button"
				ref={c => selectBox.trigger = c}
				variant={props.buttonVariant}
				qaHook={setQaHook(props.qaHook, qaHooks.button)}
				isDisabled={props.isDisabled}
			>
				{content}
				<XUIButtonCaret className={caretClasses} title="Toggle List" qaHook={setQaHook(props.qaHook, qaHooks.buttonIcon)}/>
			</XUIButton>
		);

		const dropdown = (
			<DropDown
				className={dropDownClasses}
				onSelect={props.onSelect}
				qaHook={setQaHook(props.qaHook, qaHooks.dropdown)}
				restrictFocus={props.restrictFocus}
			>
				<Picklist>
					{props.children}
				</Picklist>
			</DropDown>
		);

		return (
			<div data-automationid={props.qaHook} className={containerClasses}>
				<label className={labelClasses}
					htmlFor={selectBox.state.ariaId}
					onClick={selectBox.onLabelClick}
					data-automationid={setQaHook(props.qaHook, qaHooks.label)}
					role="presentation"
				>
					{props.labelText}
				</label>
				<div className={inputGroupClasses} data-automationid={setQaHook(props.qaHook, qaHooks.inputGroup)}>
					{
						!props.children || (Array.isArray(props.children) && !props.children.length)
							? trigger
							: (
								<DropDownToggled
									ref={c => selectBox.ddt = c}
									trigger={trigger}
									dropdown={dropdown}
									id={selectBox.state.ariaId}
									onClose={props.onDropdownHide}
									closeOnSelect={props.closeAfterSelection}
									isHidden={!props.isOpen}
									forceDesktop={props.forceDesktop}
									matchTriggerWidth={props.matchTriggerWidth}
									qaHook={setQaHook(props.qaHook, qaHooks.dropdownToggled)}
									isBlock
								/>
							)
					}
				</div>
			</div>
		);
	}
}

SelectBox.propTypes = {
	/** Input Label */
	labelText: PropTypes.string.isRequired,

	/** Additional classes to be applied to the label */
	labelClassName: PropTypes.string,

	/** Input Label visibility */
	islabelHidden: PropTypes.bool,

	/** When a selection is made, close the dropdown */
	closeAfterSelection: PropTypes.bool,

	/** Additional classes to be applied to the button */
	buttonClasses: PropTypes.string,

	/** Additional classes to be applied to the container */
	containerClasses: PropTypes.string,

	/** Additional classes to be applied to the dropDown */
	dropDownClasses: PropTypes.string,

	/** Additional classes to be applied to the inputGroup */
	inputGroupClasses: PropTypes.string,

	/** Optional callback to be executed when dropdown closes */
	onDropdownHide: PropTypes.func,

	/** for adding automation ID to component as well as input and button sub-components */
	qaHook: PropTypes.string,

	/** Use XUI provided layout classes */
	defaultLayout: PropTypes.bool,

	/** Display text to be rendered on SelectBox button. */
	buttonContent: PropTypes.node.isRequired,

	/** Selection callback */
	onSelect: PropTypes.func,

	/** The XUI button variant to use as a trigger for the select box */
	buttonVariant: PropTypes.string,

	/** Whether the button trigger and functionality are disabled */
	isDisabled: PropTypes.bool,

	/** Whether or not the list should be forced open */
	isOpen: PropTypes.bool,

	/** Optionally toggles the text truncation - can only be set to false when using the button variant */
	isTextTruncated: PropTypes.bool,

	/** Force the desktop experience, even if the viewport is narrow enough for mobile */
	forceDesktop: PropTypes.bool,

	/**
	 * Setting to false will allow the dropdown's width to be set independent of the trigger width.
	 * Note: Setting this to true will override any size prop on DropDown.  XUI design has also decided to keep a minimum width on the dropdown, so dropdown may not match the width of narrow triggers.
	 */
	matchTriggerWidth: PropTypes.bool,

	/** Whether focus should be restricted to the dropdown while it's open. */
	restrictFocus: PropTypes.bool,

	/** Used primarily to associate a label with it's matched content. If none is provided it's automatically generated. */
	id: PropTypes.string
};

SelectBox.defaultProps = {
	islabelHidden: false,
	closeAfterSelection: true,
	defaultLayout: true,
	isOpen: false,
	isTextTruncated: true,
	forceDesktop: false,
	matchTriggerWidth: true,
	restrictFocus: true,
};
