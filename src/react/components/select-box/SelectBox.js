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
import { ns } from '../helpers/xuiClassNamespace';

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
	selectId = this.props.id || uuidv4();

	isDropDownOpen = () => !!this.ddt && this.ddt.isDropDownOpen()

	onLabelClick = () => {
		this.trigger.focus();
	}

	render() {
		const selectBox = this;
		const {
			dropDownClasses,
			containerClasses,
			isTextTruncated,
			buttonVariant,
			buttonClasses,
			defaultLayout,
			inputGroupClasses,
			labelClassName,
			islabelHidden,
			buttonContent,
			qaHook,
			isDisabled,
			onSelect,
			restrictFocus,
			children,
			labelText,
			onDropdownHide,
			closeAfterSelection,
			isOpen,
			forceDesktop,
			matchTriggerWidth,
		} = this.props;

		const buttonClassNames = cn(
			isTextTruncated && buttonVariant && `${ns}-text-truncated`,
			!buttonVariant && `${ns}-select--button`,
			buttonClasses,
		);
		const inputGroupClassNames = cn(
			defaultLayout && `${ns}-select-layout`,
			inputGroupClasses,
		);
		const labelClasses = cn(
			`${ns}-text-label`,
			labelClassName,
			defaultLayout && `${ns}-fieldlabel-layout`,
			islabelHidden && `${ns}-u-hidden-visually`,
		);
		const caretClasses = (!buttonVariant && `${ns}-select--caret`) || undefined;
		const content = !buttonVariant ? (
			<span className={`${ns}-select--content`}>
				{buttonContent}
			</span>
		) : buttonContent;
		const trigger = (
			<XUIButton
				className={buttonClassNames}
				type="button"
				ref={c => selectBox.trigger = c}
				variant={buttonVariant}
				qaHook={setQaHook(qaHook, qaHooks.button)}
				isDisabled={isDisabled}
			>
				{content}
				<XUIButtonCaret
					className={caretClasses}
					title="Toggle List"
					qaHook={setQaHook(qaHook, qaHooks.buttonIcon)}
				/>
			</XUIButton>
		);

		const dropdown = (
			<DropDown
				className={dropDownClasses}
				onSelect={onSelect}
				qaHook={setQaHook(qaHook, qaHooks.dropdown)}
				restrictFocus={restrictFocus}
				id={selectBox.selectId}
			>
				<Picklist>
					{children}
				</Picklist>
			</DropDown>
		);

		return (
			<div data-automationid={qaHook} className={containerClasses}>
				<label
					className={labelClasses}
					htmlFor={selectBox.selectId}
					onClick={selectBox.onLabelClick}
					data-automationid={setQaHook(qaHook, qaHooks.label)}
					role="presentation"
				>
					{labelText}
				</label>
				<div className={inputGroupClassNames} data-automationid={setQaHook(qaHook, qaHooks.inputGroup)}>
					{
						(React.Children.count(children) === 0)
							? trigger
							: (
								<DropDownToggled
									ref={c => selectBox.ddt = c}
									trigger={trigger}
									dropdown={dropdown}
									onClose={onDropdownHide}
									closeOnSelect={closeAfterSelection}
									isHidden={!isOpen}
									forceDesktop={forceDesktop}
									matchTriggerWidth={matchTriggerWidth}
									qaHook={setQaHook(qaHook, qaHooks.dropdownToggled)}
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
	children: PropTypes.node,
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

	/**
	 * Optionally toggles the text truncation - can only be set to false when using the button
	 * variant
	 */
	isTextTruncated: PropTypes.bool,

	/** Force the desktop experience, even if the viewport is narrow enough for mobile */
	forceDesktop: PropTypes.bool,

	/**
	 * Setting to false will allow the dropdown's width to be set independent of the trigger width.
	 * Note: Setting this to true will override any size prop on DropDown.  XUI design has also decided
	 * to keep a minimum width on the dropdown, so dropdown may not match the width of narrow triggers.
	 */
	matchTriggerWidth: PropTypes.bool,

	/** Whether focus should be restricted to the dropdown while it's open. */
	restrictFocus: PropTypes.bool,

	/** ID to apply to the dropdown. Used primarily to associate a label with it's matched content.
	 * If none is provided it's automatically generated. */
	id: PropTypes.string,
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
