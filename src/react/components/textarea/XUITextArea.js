import '../helpers/xuiGlobalChecks';
import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import cn from 'classnames';
import autosize from 'autosize';
import {ns} from "../helpers/xuiClassNamespace";

const baseClass = `${ns}-textinput`;

import { compose } from '../helpers/compose';
import { calculateAstralLength, calculateMaxHeight } from './helpers';

export default class XUITextArea extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			height: 0,
			manuallyResized: false,
			charactersLeft: props.maxCharacters,
		};
	}

	componentDidMount() {
		const {
			minRows,
			maxRows,
			maxCharacters
		} = this.props;

		if (minRows || maxRows) {
			this.setState({
				maxHeight: calculateMaxHeight({
					textArea: this.textArea,
					maxRows,
				})
			});
			autosize(this.textArea);
		}

		if (maxCharacters != null) {
			this.updateCounter();
		}
	}

	componentDidUpdate() {
		if (!this.state.manuallyResized) {
			const evt = document.createEvent('Event');
			evt.initEvent('autosize:update', true, false);
			this.textArea.dispatchEvent(evt);
		}
	}

	componentWillUnmount() {
		autosize.destroy(this.textArea);
	}

	updateCounter = () => {
		this.setState(() => {
			const currentValue = this.textArea != null ? this.textArea.value : '';
			const charactersLeft = this.props.maxCharacters - calculateAstralLength(currentValue);
			return {
				charactersLeft,
			};
		});
	};

	detectResize = () => {
		const textArea = this.textArea;
		const {
			manuallyResized,
			height,
		} = this.state;

		if (!manuallyResized && textArea.style.height !== `${height}px`) {
			this.setState({
				manuallyResized: true
			});
		}
	};

	render() {
		const {
			className,
			fieldClassName,
			rows,
			minRows,
			children,
			maxCharacters,
			defaultLayout,
			isInvalid,
			validationMessage,
			hintMessage,
			isResizable,
			isDisabled,
			isBorderless,
			textareaId,
			qaHook,
			textareaRef,
			leftElement,
			rightElement,
			onChange,
			style,
			// This prevents maxRows from ending up in `other`
			maxRows, // eslint-disable-line
			...other
		} = this.props;
		const {
			charactersLeft,
			maxHeight,
		} = this.state;

		const baseClasses = cn(
			baseClass,
			(charactersLeft < 0 || isInvalid) && `${baseClass}-is-invalid`,
			isBorderless && `${baseClass}-borderless`,
			isDisabled && `${baseClass}-is-disabled`
		);

		const textareaClasses = cn(
			`${baseClass}--input`,
			className,
			leftElement && `${baseClass}-has-left-element`,
			rightElement && `${baseClass}-has-right-element`,
			isResizable ? `${ns}-u-resize-vertical` : `${ns}-u-resize-none`
		);

		const fieldClasses = cn(
			fieldClassName,
			defaultLayout && `${ns}-field-layout`
		);

		const labelClasses = cn(
			`${ns}-u-flex`,
			defaultLayout && `${ns}-fieldlabel-layout`
		);

		const textArea = (
			<textarea
				{...other}
				ref={ compose(textareaRef, c => this.textArea = c) }
				rows={minRows || rows}
				className={textareaClasses}
				onChange={maxCharacters != null ? compose(this.updateCounter, onChange) : onChange}
				onMouseUp={this.detectResize}
				disabled={isDisabled}
				id={textareaId}
				data-automationid={`${qaHook}-textarea`}
				style={{
					...style,
					maxHeight,
				}}
			/>
		);

		const message = (validationMessage || hintMessage) && (
			<div className={cn(
				`${ns}-validation`,
				`${ns}-validation-layout`,
				(isInvalid && validationMessage) && `${ns}-validation-is-invalid`
			)}>
				{(isInvalid && validationMessage) ? validationMessage : hintMessage}
			</div>
		);

		const counter = typeof maxCharacters === 'number' ? (
			<span
				ref={c => this._counter = c}
				className={cn(
					`${ns}-text-secondary`,
					(charactersLeft < 0) && `${ns}-textcolor-negative`
				)}
				data-automationid={qaHook && `${qaHook}-counter`}>
				{charactersLeft}
			</span>
		) : null;

		const label = children != null || counter != null ? (
			<div className={labelClasses}>
				{children != null && (
					<div className={`${ns}-u-flex-horizontal ${ns}-u-flex-grow`}>
						{children}
					</div>
				)}
				{counter != null && (
					<div className={`${ns}-u-flex-horizontal ${ns}-margin-left-auto ${ns}-margin-top-auto`}>
						{counter}
					</div>
				)}
			</div>
		) : null;

		return (
			<div className={fieldClasses}>
				{label}
				<div className={baseClasses}>
					{leftElement}
					{textArea}
					{rightElement}
				</div>
				{message}
			</div>
		);
	}
}

XUITextArea.defaultProps = {
	qaHook: 'xui-textarea', // TODO remove in XUI 14
	rows: 3,
	defaultLayout: true,
	style: {},
};

XUITextArea.propTypes = {
	/** Whether the input should be isDisabled. */
	isDisabled: PropTypes.bool,
	/** The number of lines the input should display without scrolling. */
	rows: PropTypes.number,
	/** The minimum number of rows for the text area to make space for. */
	minRows: PropTypes.number,
	/** The maximum number of rows for the text area to expand to. */
	maxRows: PropTypes.number,
	/** Whether or not the user should be able to manually resize the field. */
	isResizable: PropTypes.bool,
	/** Function to execute when the input's value has been changed. */
	onChange: PropTypes.func,
	/** Whether the text input should be read-only. */
	readOnly: PropTypes.bool,
	/** The initial value of the input. */
	defaultValue: PropTypes.string,
	/** The maximum number of characters for the text area, if given a value, a character counter and validation will be added. */
	maxCharacters: PropTypes.number,
	/** Whether the text area should have isInvalid state styling. */
	isInvalid: PropTypes.bool,
	/** Validation message to show */
	validationMessage: PropTypes.node,
	/** Explanatory message to show */
	hintMessage: PropTypes.node,
	/** Whether default field layout should be applied to the container. */
	defaultLayout: PropTypes.bool,
	/** Additional classes to add to the wrapping div. */
	fieldClassName: PropTypes.string,
	/** ID to be set for the textarea. */
	textareaId: PropTypes.string,
	/** Function to add a reference to the textarea element. */
	textareaRef: PropTypes.func,
	/** Additional classes to be added to the textarea itself. */
	className: PropTypes.string,
	/** Whether text area has a border. */
	isBorderless: PropTypes.bool,
	/** QaHook for testing. */
	qaHook: PropTypes.string,
	/** Optional children to be rendered within the component (i.e. a label). */
	children: PropTypes.node,
	/** Element to be rendered to the left of the textarea */
	leftElement: PropTypes.node,
	/** Element to be rendered to the right of the textarea */
	rightElement: PropTypes.node,
	/** Style object to apply to the textarea. The maxHeight value will be overridden if `maxRows` is provided */
	style: PropTypes.object,
};
