import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import XUITextInput from '../textInput/XUITextInput';

export default class XUIAutocompleterTextInput extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value
		};
		this.bindOnChange(props.throttleInterval);
	}

	componentDidMount() {
		this.calculatePlaceholderWidth();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.throttleInterval !== this.props.throttleInterval) {
			this.bindOnChange(this.props.throttleInterval);
		}
		if (prevProps.value !== this.props.value) {
			this.setState({
				value: this.props.value
			});
		}
		if (prevProps.placeholder !== this.props.placeholder) {
			this.calculatePlaceholderWidth();
		}
	}

	calculatePlaceholderWidth = () => {
		if (this.placeholder != null) {
			const placeholderWidth = getComputedStyle(this.placeholder).width;
			if (this.state.placeholderWidth !== placeholderWidth) {
				this.setState({
					placeholderWidth
				});
			}
		}
	}

	onChange = event => {
		const { onChange } = this.props;
		const newValue = event.target.value;
		if (onChange != null) {
			onChange(newValue);
		}
	}

	/**
	 * Bind an optionally throttled onSearch handler to the component instance.
	 *
	 * @private
	 * @param {number} interval
	 */
	bindOnChange = interval => {
		const throttled = interval
			? throttle(this.onChange, interval, { trailing: true })
			: this.onChange;
		this.throttledOnChange = event => {
			event.persist();
			this.setState({
				value: event.target.value
			});
			throttled(event);
		};
	}

	render() {
		const {
			containerClassName,
			inputClassName,
			placeholder,
			leftElement,
			rightElement,
			qaHook,
			onFocus,
			onKeyDown,
			inputRef,
			textInputComponentProps,
			inputProps,
			isDisabled,
			ariaAttributes,
		} = this.props;
		const {
			placeholderWidth,
			value,
		} = this.state;

		const augmentedInputProps = {
			...inputProps,
			style: {
				...inputProps.style,
				minWidth: placeholderWidth
			}
		};

		return (
			<div {...ariaAttributes}>
				<div
					ref={p => this.placeholder = p}
					className="xui-autocompleter-textinput--placeholder"
					aria-hidden
				>
					{placeholder}
				</div>
				<XUITextInput
					{...textInputComponentProps}
					{...{
						leftElement,
						rightElement,
						containerClassName,
						inputClassName,
						qaHook,
						inputRef,
						onFocus,
						placeholder,
						value,
						isDisabled,
						onKeyDown
					}}
					ref={tg => this.trigger = tg}
					onChange={this.throttledOnChange}
					inputProps={augmentedInputProps}
				/>
			</div>
		);
	}
}

XUIAutocompleterTextInput.propTypes = {
	qaHook: PropTypes.string,
	/** Gets passed through to the `containerClassName` prop on `XUITextInput` */
	containerClassName: PropTypes.string,
	/** Gets passed through to the `inputClassName` prop on `XUITextInput` */
	inputClassName: PropTypes.string,
	/** Placeholder value for  */
	placeholder: PropTypes.string,
	/** Left element to pass through to `XUITextInput` */
	leftElement: PropTypes.node,
	/** Right element to pass through to `XUITextInput` */
	rightElement: PropTypes.node,
	/** Function to call on change events */
	onChange: PropTypes.func,
	/** Function to call on focus events */
	onFocus: PropTypes.func,
	/** Function to call on key down events */
	onKeyDown: PropTypes.func,
	/** Text value of the input */
	value: PropTypes.string,
	/** Interval in `ms` to wait between `onChange` callbacks */
	throttleInterval: PropTypes.number,
	/** Whether the input is disabled */
	isDisabled: PropTypes.bool,
	/** Reference to add to the DOM input element */
	inputRef: PropTypes.func,
	/** Props to spread on the `XUITextInput component */
	textInputComponentProps: PropTypes.object,
	/** Props to spread on the input element */
	inputProps: PropTypes.object,
	ariaAttributes: PropTypes.object,
};

XUIAutocompleterTextInput.defaultProps = {
	throttleInterval: 200, //TODO: Remove throttle interval here, or in XUIAutocompleter
	inputProps: {
		style: {},
	},
	textInputComponentProps: {},
	ariaAttributes: {},
};
