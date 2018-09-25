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
import XUIControlWrapper, { getAriaAttributes } from '../controlwrapper/XUIControlWrapper';
import generateIds from '../controlwrapper/helpers';

import '../../../sass/7-components/_forms.selects.scss';

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

const selectBaseClass = `${ns}-select`;

export default class SelectBox extends Component {
	selectId = this.props.id || uuidv4();
	wrapperIds = generateIds();

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
			isLabelHidden,
			buttonContent,
			qaHook,
			isDisabled,
			onSelect,
			restrictFocus,
			children,
			label,
			onDropdownHide,
			closeAfterSelection,
			isOpen,
			forceDesktop,
			matchTriggerWidth,
			isInvalid,
			validationMessage,
			hintMessage,
			isFieldLayout,
		} = this.props;

		const buttonClassNames = cn(
			isTextTruncated && buttonVariant && `${selectBaseClass}--button-truncated`,
			!buttonVariant && `${selectBaseClass}--button`,
			buttonClasses,
		);
		const inputGroupClassNames = cn(
			defaultLayout && `${selectBaseClass}-layout`,
			inputGroupClasses,
			isInvalid && `${selectBaseClass}-is-invalid`,
		);

		const caretClasses = (!buttonVariant && `${selectBaseClass}--caret`) || undefined;
		const content = !buttonVariant ? (
			<span className={`${selectBaseClass}--content`}>
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
				// These aria attributes currently go nowhere
				ariaAttributes={getAriaAttributes(this.wrapperIds.control, this.props)}
			>
				<Picklist>
					{children}
				</Picklist>
			</DropDown>
		);

		return (
			<div data-automationid={qaHook} className={containerClasses}>
				<XUIControlWrapper
					qaHook={setQaHook(qaHook, qaHooks.label)}
					isFieldLayout={isFieldLayout}
					wrapperIds={this.wrapperIds}
					{...{
						isLabelHidden,
						label,
						isInvalid,
						validationMessage,
						hintMessage,
						labelClassName,
					}}
				>
					<div
						className={inputGroupClassNames}
						data-automationid={setQaHook(qaHook, qaHooks.inputGroup)}
					>
						{
							!children || (Array.isArray(children) && !children.length)
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
				</XUIControlWrapper>
			</div>
		);
	}
}

SelectBox.propTypes = {
	children: PropTypes.node,
	/** Input Label */
	label: PropTypes.node.isRequired,

	/** Additional classes to be applied to the label */
	labelClassName: PropTypes.string,

	/** Input Label visibility */
	isLabelHidden: PropTypes.bool,

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

	/** Whether the current input value is invalid */
	isInvalid: PropTypes.bool,
	/** Validation message to show under the input if `isInvalid` is true */
	validationMessage: PropTypes.string,
	/** Hint message to show under the input */
	hintMessage: PropTypes.string,
	/** Whether to use the field layout classes  */
	isFieldLayout: PropTypes.bool,
};

SelectBox.defaultProps = {
	closeAfterSelection: true,
	defaultLayout: true,
	isOpen: false,
	isTextTruncated: true,
	forceDesktop: false,
	matchTriggerWidth: true,
	restrictFocus: true,
};
