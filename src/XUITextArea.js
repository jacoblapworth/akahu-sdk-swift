import React from 'react';
import Component from 'xui-base-component';
import cn from 'classnames';
import CSSClasses from 'xui-css-classes';

/**
 * @public
 *
 * Property types for this component
 */
const propTypes = {
	/** @property {Boolean} [isDisabled] Whether the input should be isDisabled */
	isDisabled: React.PropTypes.bool,

	/** @property {Number} [rows=3] The number of lines the input should display without scrolling */
	rows: React.PropTypes.number,

	/** @property {Number} [minRows] The minimum number of rows for the text area to make space for */
	minRows: React.PropTypes.number,

	/** @property {Number} [maxRows] The maximum number of rows for the text area to expand to */
	maxRows: React.PropTypes.number,

	/** @property {Boolean} [manualResize] Whether or not the user should be able to manually resize the field */
	manualResize: React.PropTypes.bool,

	/** @property {Function} [onChange] Function to execute when the input's value has been changed */
	onChange: React.PropTypes.func,

	/** @property {Boolean} [readOnly] Whether the text input should be read-only */
	readOnly: React.PropTypes.bool,

	/** @property {String} [defaultValue] The initial value of the input */
	defaultValue: React.PropTypes.string,

	/** @property {Number} [maxCharacters] The maximum number of characters for the text area, if given a value, a character counter and validation will be added **/
	maxCharacters: React.PropTypes.number,

	/** @property {Boolean} [error] Whether the text area should have error state styling **/
	error: React.PropTypes.bool,

	/** @property {Boolean} [defaultLayout=true] Whether default field layout should be applied to the container **/
	defaultLayout: React.PropTypes.bool,

	/** @property {String} [fieldClassName] Additional class(es) to add to the wrapping div **/
	fieldClassName: React.PropTypes.string,

	/** @property {String} [id] ID to be set for the textarea **/
	textareaId: React.PropTypes.string,


	/** @property {String} [className] Additional class(es) to be added to the textarea itself **/
	className: React.PropTypes.string,
	qaHook: React.PropTypes.string,
	children: React.PropTypes.node

};

/**
 * @public
 *
 * Default property values for this component
 */
const defaultProps = {
	qaHook: 'xui-textarea',
	rows: 3,
	defaultLayout: true
};

/**
 * @private
 * Calculates the min and max heights for the textarea based off `minRows` and `maxRows`. Will default to the CSS value if neither these or `rows` is provided
 * @returns {Object} Object contianing minHeight, maxHeight and verticalBorderWidth properties
 */
const calculateMinMaxHeights = (textComponent) => {
	const textArea = textComponent._textArea;
	const { minRows, maxRows } = textComponent.props;
	const textAreaStyle = window.getComputedStyle(textArea);
	const verticalPadding = parseFloat(textAreaStyle.getPropertyValue('padding-bottom')) + parseFloat(textAreaStyle.getPropertyValue('padding-top'));
	const verticalBorderWidth = parseFloat(textAreaStyle.getPropertyValue('border-bottom-width')) + parseFloat(textAreaStyle.getPropertyValue('border-top-width'));
	const cssMinHeight = parseFloat(textAreaStyle.getPropertyValue('min-height'));
	const cssMaxHeight = parseFloat(textAreaStyle.getPropertyValue('max-height'));

	//textarea should have no content to ensure measuring lineheight of a single line
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
	return {minHeight, maxHeight, verticalBorderWidth};
};

const resize = (textComponent, sizeData) => {
	const textArea = textComponent._textArea;

	textArea.style.height = 'auto';
	let height = textArea.scrollHeight + sizeData.verticalBorderWidth;
	height = sizeData.minHeight? Math.max(height, sizeData.minHeight) : height;
	height = sizeData.maxHeight? Math.min(height, sizeData.maxHeight) : height;
	textArea.style.height = height + 'px';
	textComponent.setState({height: height}, function() {
		textArea.scrollTop = textArea.scrollHeight;
	});
};

const changeHandler = function(e) {
	const textComponent = this;
	const { onChange, minRows, maxRows, maxCharacters } = textComponent.props;
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
	const textArea = textComponent._textArea;
	if (!textComponent.state.manuallyResized && textArea.style.height !== textComponent.state.height + 'px') {
		textComponent.setState({manuallyResized: true});
	}
};

const updateCounter = (textComponent) => {
	const charactersLeft = textComponent.props.maxCharacters - calculateAstralLength(textComponent._textArea.value);
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
		const { minRows, maxRows, maxCharacters } = textComponent.props;
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
		const { className, fieldClassName, rows, minRows, children, maxCharacters, maxRows, defaultLayout, error, manualResize, isDisabled, textareaId, qaHook, ...other } = textComponent.props;
		const classNameFormated = cn(
				CSSClasses.Form.Input.BASE,
				{ [CSSClasses.Form.Input.IS_INVALID] : textComponent.state.characterCountError || error },
				manualResize ? CSSClasses.Utility.Resize.VERTICAL : CSSClasses.Utility.Resize.NONE,
				className
			);
		const fieldClasses = cn(
				{ [CSSClasses.Form.FIELD_LAYOUT] : defaultLayout },
				fieldClassName
			);
		const labelClasses = cn(
				{ [CSSClasses.Form.FIELDLABEL_LAYOUT] : defaultLayout },
				CSSClasses.Utility.Flex.BASE
			);

		const textArea = (
			<textarea {...other}
				ref={c => textComponent._textArea = c }
				rows={minRows || maxRows? 1 : rows}
				className={classNameFormated}
				onChange={textComponent._changeHandler}
				onMouseUp={textComponent._detectResize}
				disabled={isDisabled}
				id={textareaId}
				data-automationid={`${qaHook}-textarea`} />
		);

		const counter = maxCharacters? <span ref={c => textComponent._counter = c } className={CSSClasses.Typography.Text.SECONDARY} data-automationid={`${qaHook}-counter`}>{textComponent.state.charactersLeft}</span> : null;

		return (
			<div className={fieldClasses}>
				<div className={labelClasses}>
					<div className={cn(CSSClasses.Utility.Flex.COL, CSSClasses.Utility.Flex.GROW)}>
						{children}
					</div>
					<div className={cn(CSSClasses.Utility.Flex.COL, CSSClasses.Margin.AUTO_LEFT, CSSClasses.Margin.AUTO_TOP)}>
						{counter}
					</div>
				</div>
				{textArea}
			</div>
		);
	}
}

XUITextArea.PropTypes = propTypes;
XUITextArea.defaultProps = defaultProps;
