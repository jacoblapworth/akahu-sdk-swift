import React, { Component } from 'react';
import PropTypes from "prop-types";
import cn from 'classnames';

/**
 * Accepts one or more functions and curries a function that will call each passed function with the arguments passed
 * to the curried function.
 *
 * @private
 * @param {Function} fns
 * @returns {Function}
 */
function compose(...fns) {
	return function () {
		fns.forEach(fn => {
			if (typeof fn === 'function') {
				fn.apply(this, arguments);
			}
		});
	}
}


/**
 * @private
 * Calculates the min and max heights for the textarea based off `minRows` and `maxRows`. Will default to the CSS value if neither these or `rows` is provided
 * @returns {Object} Object contianing minHeight, maxHeight and verticalBorderWidth properties
 */
const calculateMinMaxHeights = (textComponent) => {
	const textArea = textComponent.textArea;

	const {
		minRows,
		maxRows
	} = textComponent.props;

	const textAreaStyle = window.getComputedStyle(textArea);
	const verticalPadding = parseFloat(textAreaStyle.getPropertyValue('padding-bottom')) + parseFloat(textAreaStyle.getPropertyValue('padding-top'));
	const verticalBorderWidth = parseFloat(textAreaStyle.getPropertyValue('border-bottom-width')) + parseFloat(textAreaStyle.getPropertyValue('border-top-width'));
	const cssMinHeight = parseFloat(textAreaStyle.getPropertyValue('min-height'));
	const cssMaxHeight = parseFloat(textAreaStyle.getPropertyValue('max-height'));

	// Temporarily empty the textarea value in order to measure the lineheight of a single line
	const value = textArea.value;
	textArea.value = '';
	textArea.style.height = 'auto';
	textArea.style.minHeight = 0;
	const singleLineHeight = textArea.scrollHeight - verticalPadding;
	textArea.value = value;

	const minHeight = minRows? minRows * singleLineHeight + verticalPadding + verticalBorderWidth : cssMinHeight;
	const maxHeight = maxRows? maxRows * singleLineHeight + verticalPadding + verticalBorderWidth : cssMaxHeight;

	textComponent.setState({
		sizeData: {
			minHeight,
			maxHeight,
			verticalBorderWidth
		}
	});

	textArea.style.minHeight = minHeight + 'px';
	textArea.style.maxHeight = maxHeight + 'px';

	return {
		minHeight,
		maxHeight,
		verticalBorderWidth
	};
};


const resize = (textComponent, sizeData) => {
	const textArea = textComponent.textArea;

	textArea.style.height = 'auto';
	let height = textArea.scrollHeight + sizeData.verticalBorderWidth;
	height = sizeData.minHeight? Math.max(height, sizeData.minHeight) : height;
	height = sizeData.maxHeight? Math.min(height, sizeData.maxHeight) : height;
	textArea.style.height = height + 'px';

	textComponent.setState({height: height}, function() {
		textArea.scrollTop = textArea.scrollHeight;
	});
};


const changeHandler = function() {
	const textComponent = this;

	const {
		onChange,
		minRows,
		maxRows,
		maxCharacters
	} = textComponent.props;

	if (onChange) {
		onChange.apply(textComponent, arguments);
	}

	if ((minRows || maxRows) && !textComponent.state.manuallyResized) {
		resize(textComponent, textComponent.state.sizeData);
	}

	if (maxCharacters) {
		updateCounter(textComponent);
	}
};


const detectResize = function() {
	const textComponent = this;
	const textArea = textComponent.textArea;

	if (!textComponent.state.manuallyResized && textArea.style.height !== textComponent.state.height + 'px') {
		textComponent.setState({
			manuallyResized: true
		});
	}
};


const updateCounter = (textComponent) => {
	const charactersLeft = textComponent.props.maxCharacters - calculateAstralLength(textComponent.textArea.value);

	textComponent.setState({
		charactersLeft: charactersLeft,
		characterCountError: charactersLeft < 0
	});
};


/**
 * @private
 * Calculates length of a string in a way that accounts for 'astral' characters (characters outside of regular character set, namely emojis)
 * @returns {Number} a more accurate string length than String.prototype.length offers
 */
const calculateAstralLength = (string) => {
	return [...string].length;
};


export default class XUITextArea extends Component {

	constructor(props) {
		super(props);
		const textComponent = this;

		textComponent.state = {
			characterCountError: false,
			height: 0,
			manuallyResized: false
		};

		textComponent._changeHandler = changeHandler.bind(textComponent);
		textComponent._detectResize = detectResize.bind(textComponent);
	}

	componentDidMount() {
		const textComponent = this;

		const {
			minRows,
			maxRows,
			maxCharacters
		} = textComponent.props;

		if (minRows || maxRows) {
			resize(textComponent, calculateMinMaxHeights(textComponent));
		}

		if (maxCharacters) {
			updateCounter(textComponent);
		}
	}

	componentWillReceiveProps(nextProps) {
		const textComponent = this;

		if (textComponent.props.minRows !== nextProps.minRows || textComponent.props.maxRows !== nextProps.maxRows) {
			resize(textComponent, calculateMinMaxHeights(textComponent));
		}
	}

	render() {
		const textComponent = this;

		const {
			className,
			fieldClassName,
			rows,
			minRows,
			children,
			maxCharacters,
			maxRows,
			defaultLayout,
			isInvalid,
			validationMessage,
			hintMessage,
			manualResize,
			isDisabled,
			textareaId,
			qaHook,
			textareaRef,
			...other
		} = textComponent.props;

		const inputClass = 'xui-input';

		const textareaClasses = cn(
				inputClass,
				className,
				{
					[`${inputClass}-is-invalid`] : textComponent.state.characterCountError || isInvalid
				},
				manualResize ? 'xui-u-resize-vertical' : 'xui-u-resize-none'
			);

		const fieldClass = 'xui-field';

		const fieldClasses = cn(
				fieldClassName,
				{ [`${fieldClass}-layout`] : defaultLayout }
			);

		const labelClasses = cn(
				'xui-u-flex',
				{ [`${fieldClass}label-layout`] : defaultLayout }
			);

		const textArea = (
			<textarea
				{...other}
				ref={ compose(textareaRef, c => textComponent.textArea = c) }
				rows={minRows || maxRows? 1 : rows}
				className={textareaClasses}
				onChange={textComponent._changeHandler}
				onMouseUp={textComponent._detectResize}
				disabled={isDisabled}
				id={textareaId}
				data-automationid={`${qaHook}-textarea`}
			/>
		);

		const message = (validationMessage || hintMessage) && (
			<div className={cn(
				'xui-validation',
				'xui-validation-layout',
				{ 'xui-validation-is-invalid': isInvalid && validationMessage }
			)}>{(isInvalid && validationMessage) ? validationMessage : hintMessage}</div>
		);

		const counter = maxCharacters ? (
			<span
				ref={c => textComponent._counter = c}
				className='xui-text-secondary'
				data-automationid={`${qaHook}-counter`}>
				{textComponent.state.charactersLeft}
			</span>
		) : null;

		return (
			<div className={fieldClasses}>
				<div className={labelClasses}>
					<div className='xui-u-flex-col xui-u-flex-grow' >
						{children}
					</div>
					<div className='xui-u-flex-col xui-margin-auto-left xui-margin-auto-top' >
						{counter}
					</div>
				</div>
				{textArea}
				{message}
			</div>
		);
	}
}

XUITextArea.defaultProps = {
	qaHook: 'xui-textarea',
	rows: 3,
	defaultLayout: true
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
	manualResize: PropTypes.bool,
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
	validationMessage: PropTypes.string,
	/** Explanatory message to show */
	hintMessage: PropTypes.string,
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
	/** QaHook for testing. */
	qaHook: PropTypes.string,
	/** Optional children to be rendered within the component (i.e. a label). */
	children: PropTypes.node
};
