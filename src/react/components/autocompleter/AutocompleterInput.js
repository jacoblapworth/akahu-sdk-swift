import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import throttle from 'lodash.throttle';
import XUIInput from '../input/XUIInput';

/**
 * This will act as the onChange handler for the input.  Since it needs to be throttled and bound, I kept is as a
 * separate function here instead of attaching it to the class prototype.
 *
 * @private
 * @param {Event} event
 */
function onChange(event) {
	const { props } = this;
	const newValue = event.target.value;
	if (props.onSearch) {
		props.onSearch(newValue, event);
	}
}

/**
 * Bind an optionally throttled onSearch handler to the component instance.
 *
 * @private
 * @param {AutocompleterInput} acInput
 * @param {number} interval
 */
function bindOnChange (acInput, interval) {
	const bound = onChange.bind(acInput);
	const throttled = interval ? throttle(bound, interval, { trailing: true }) : bound;
	acInput.onChange = function (event) {
		event.persist();
		acInput.setState({
			value: event.target.value
		});
		throttled(event);
	};
}

export default class AutocompleterInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value
		};
		bindOnChange(this, props.throttleInterval);
	}

	componentWillUpdate(nextProps) {
		if (this.props.throttleInterval !== nextProps.throttleInterval) {
			bindOnChange(this, nextProps.throttleInterval);
		}
		if (nextProps.value !== this.props.value) {
			this.setState({
				value: nextProps.value
			});
		}
	}

	render() {
		const {
			props,
			onChange,
			state
		} = this;
		const inputProps = {
			...props.ariaAttributes,
			type: 'search',
			placeholder: props.placeholder,
			maxLength: props.maxLength,
			value: this.state.value,
			onKeyPress: props.onKeyPress,
			onKeyDown: props.onKeyDown,
			onFocus: props.onFocus,
			id: props.id
		};
		const classNames = cn(
			{
				'xui-input-borderless': props.defaultStyling,
				'xui-autocompleter--input': props.defaultStyling
			},
			props.className
		);
		const containerClassNames = cn(
			{'xui-autocompleter--inputwrapper': props.defaultStyling},
			props.containerClassNames
		);

		// When the placeholder text runs out of space it doesn't dictate the size of the input, causing it to be hidden.
		// By using another element for the placeholder text we can wrap when the placeholder text runs out of space.
		const placeholderElement = !props.iconAttributes && !state.value ? <span className="xui-autocompleter--placeholder">{props.placeholder}</span> : null;

		return (
			<XUIInput
				ref={props.refFn}
				className={classNames}
				containerClassName={containerClassNames}
				inputAttributes={inputProps}
				onChange={onChange}
				qaHook={props.qaHook}
				iconAttributes={props.iconAttributes}
				button={placeholderElement}
			/>
		);
	}
}

AutocompleterInput.propTypes = {
	className: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	maxLength: PropTypes.number,
	onSearch: PropTypes.func,
	onKeyPress: PropTypes.func,
	onKeyDown: PropTypes.func,
	throttleInterval: PropTypes.number,
	refFn: PropTypes.func,
	ariaAttributes: PropTypes.object,
	qaHook: PropTypes.string,
	onFocus: PropTypes.func,
	id: PropTypes.string,
	iconAttributes: PropTypes.object,
	containerClassNames: PropTypes.string,
	defaultStyling: PropTypes.bool
};

AutocompleterInput.defaultProps = {
	throttleInterval: 0,
	ariaAttributes: {},
	defaultStyling: true
};
