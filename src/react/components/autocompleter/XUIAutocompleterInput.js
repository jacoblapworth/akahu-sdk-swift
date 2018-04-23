//TODO: Remove this component in XUI 14. Hopefully no one's using it, but it should remain until the next major
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import throttle from 'lodash.throttle';
import XUIInput from '../input/XUIInput';
import {ns} from "../helpers/xuiClassNamespace";

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
 * @param {XUIAutocompleterInput} acInput
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

export default class XUIAutocompleterInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value
		};
		bindOnChange(this, props.throttleInterval);
	}

	componentWillReceiveProps(nextProps) {
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
			value: this.state.value || '', // Default to an empty string so the 'value' attr renders, displaying placeholder.
			onKeyPress: props.onKeyPress,
			onKeyDown: props.onKeyDown,
			onFocus: props.onFocus,
			id: props.id
		};
		const classNames = cn(
			props.defaultStyling ? `${ns}-input-borderless ${ns}-autocompleter--input` : '',
			props.className
		);
		const containerClassNames = cn(
			props.defaultStyling ? `${ns}-autocompleter--inputwrapper` : '',
			props.containerClassNames
		);

		// When the placeholder text runs out of space it doesn't dictate the size of the input, causing it to be hidden.
		// By using another element for the placeholder text we can wrap when the placeholder text runs out of space.
		const placeholderElement = !props.iconAttributes ? (
			<span
				className={cn(
					`${ns}-autocompleter--placeholder`,
					state.value ? `${ns}-autocompleter--placeholder-hidden` : ''
				)}
			>
				{props.placeholder}
			</span>
		) : null;

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

XUIAutocompleterInput.propTypes = {
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

XUIAutocompleterInput.defaultProps = {
	throttleInterval: 0,
	ariaAttributes: {},
	defaultStyling: true
};
