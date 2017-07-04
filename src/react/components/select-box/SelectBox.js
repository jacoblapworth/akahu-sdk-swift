import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import uuidv4 from 'uuid/v4';
import caret from '@xero/xui-icon/icons/caret';
import DropDown from '../dropdown/DropDown';
import DropDownToggled from '../dropdown/DropDownToggled';
import XUIButton from '../button/XUIButton';
import XUIIcon from '../icon/XUIIcon';
import Picklist from '../picklist/Picklist';
import qaHooks from './qaHooks';

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
			ariaId: uuidv4()
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
		const containerClasses = cn({
			[props.containerClasses]: !!props.containerClasses
		});
		const buttonClasses = cn({
			'xui-text-truncated': props.isTextTruncated,
			'xui-select--button-is-selected': selectBox.isDropDownOpen(),
			[props.buttonClasses]: !!props.buttonClasses
		});
		const inputGroupClasses = cn({
			'xui-select-layout': !!props.defaultLayout,
			[props.inputGroupClasses]: !!props.inputGroupClasses
		});
		const labelClasses = cn({
			'xui-fieldlabel-layout': !!props.defaultLayout,
			'xui-u-hidden-visually': props.labelHidden,
			[props.labelClasses]: !!props.labelClasses
		});
		const dropDownClasses = props.dropDownClasses;

		const trigger = (
			<XUIButton
				className={buttonClasses}
				type="button"
				ref={c => selectBox.trigger = c}
				variant={props.buttonVariant}
				qaHook={setQaHook(props.qaHook, qaHooks.button)}
			>
				{props.buttonContent}
				<XUIIcon className="xui-button--caret" path={caret} title="Toggle List" />
			</XUIButton>
		);

		const dropdown = (
			<DropDown
				className={dropDownClasses}
				onSelect={props.onSelect}
				qaHook={setQaHook(props.qaHook, qaHooks.dropdown)}
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
				>
					{props.label}
				</label>
				<div className={inputGroupClasses}>
					{
						!props.children || (Array.isArray(props.children) && !props.children.length)
							?
							trigger
							:
							<DropDownToggled
								ref={c => selectBox.ddt = c}
								trigger={trigger}
								dropdown={dropdown}
								id={selectBox.state.ariaId}
								onClose={props.onDropdownHide}
								closeOnSelect={props.closeAfterSelection}
								hidden={!props.isOpen}
								forceDesktop={props.forceDesktop}
							/>
					}
				</div>
			</div>
		);
	}
}

SelectBox.propTypes = {
	/** @property {String} Input Label */
	label: PropTypes.string.isRequired,

	/** @property {String} [labelClasses] Additional classes to be applied to the label */
	labelClasses: PropTypes.string,

	/** @property {Boolean} [labelHidden=false] Input Label visibility */
	labelHidden: PropTypes.bool,

	/** @property {Boolean} [closeAfterSelection=true] When a selection is made, close the dropdown */
	closeAfterSelection: PropTypes.bool,

	/** @property {String} [buttonClasses] Additional classes to be applied to the button */
	buttonClasses: PropTypes.string,

	/** @property {String} [containerClasses] Additional classes to be applied to the container */
	containerClasses: PropTypes.string,

	/** @property {String} [dropDownClasses] Additional classes to be applied to the dropDown */
	dropDownClasses: PropTypes.string,

	/** @property {String} [inputGroupClasses] Additional classes to be applied to the inputGroup */
	inputGroupClasses: PropTypes.string,

	/** @property {Function} [onDropdownHide] Optional callback to be executed when dropdown closes */
	onDropdownHide: PropTypes.func,

	/** @property {string} [qaHook] for adding automation ID to component as well as input and button sub-components */
	qaHook: PropTypes.string,

	/** @property {boolean} [defaultLayout=true] Use XUI provided layout classes */
	defaultLayout: PropTypes.bool,

	/** @property {String} Display text to be rendered on SelectBox button. */
	buttonContent: PropTypes.string.isRequired,

	/** @property {Function} Selection callback */
	onSelect: PropTypes.func,

	/** @property {string} [buttonVariant] The XUI button variant to use as a trigger for the select box */
	buttonVariant: PropTypes.string,

	/** @property {boolean} [isOpen=false] Whether or not the list should be forced open */
	isOpen: PropTypes.bool,

	/** @property {boolean} [isTextTruncated=true] Optionally toggles the text truncation */
	isTextTruncated: PropTypes.bool,

	forceDesktop: PropTypes.bool,
};

SelectBox.defaultProps = {
	labelHidden: false,
	closeAfterSelection: true,
	defaultLayout: true,
	isOpen: false,
	isTextTruncated: true,
	forceDesktop: false,
};
