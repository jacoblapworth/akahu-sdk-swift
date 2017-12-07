import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import clear from '@xero/xui-icon/icons/clear';
import XUIIcon from '../icon/XUIIcon';
import XUIStatelessInput from './XUIStatelessInput';
import XUIButton from '../button/XUIButton';
import { compose } from '../helpers/compose';

const onInputChange = (statefulInput) => {
	if (statefulInput.inputNode.value === '' && statefulInput.state.showClearButton) {
		statefulInput.setState({showClearButton: false});
	}

	if (statefulInput.inputNode.value !== '' && !statefulInput.state.showClearButton) {
		statefulInput.setState({showClearButton: true});
	}
};

const onClearInputClick = (statefulInput) => {
	const { inputAttributes } = statefulInput.props;
	statefulInput.inputNode.value = '';
	statefulInput.inputNode.focus();

	if (inputAttributes && typeof inputAttributes.onChange === 'function') {
		statefulInput.props.inputAttributes.onChange({target: statefulInput.inputNode});
	}

	onInputChange(statefulInput);
};

export default class XUIInput extends Component {
	constructor(props) {
		super(props);
		const statefulInput = this;
		const {inputAttributes} = props;

		statefulInput.state = {
			showClearButton: inputAttributes && !!inputAttributes.defaultValue
		};
	}

	/**
	 * Focus the input node if we can.
	 *
	 * @public
	 * @memberof XUIInput
	 */
	focus() {
		if (this.inputNode) {
			this.inputNode.focus();
		}
	}

	render() {
		const statefulInput = this;
		const {
			clearButtonProps,
			hasClearButton,
			inputAttributes,
			inputRef,
			isBorderless,
			qaHook,
			...other
		} = statefulInput.props;

		const clearButtonIconWrapperClassName = hasClearButton && cn(
			'xui-input--iconwrapper',
			'xui-input--iconwrapper-right',
			{'xui-u-hidden': !statefulInput.state.showClearButton}
		);

		const clearButton = (hasClearButton) ?
			<div className={clearButtonIconWrapperClassName}>
				<XUIButton
					isDisabled={false}
					onClick={() => { onClearInputClick(statefulInput) }}
					variant="icon"
					qaHook={qaHook && `${qaHook}--close`}
					{...clearButtonProps}
				>
					<XUIIcon path={clear} />
				</XUIButton>
			</div> : null;

		return (
			<XUIStatelessInput
				inputAttributes={{...inputAttributes, onKeyUp: compose(inputAttributes && inputAttributes.onKeyUp, () => { onInputChange(statefulInput) })}}
				inputRef={compose(inputRef, n => statefulInput.inputNode = n)}
				button={clearButton}
				isBorderless={isBorderless}
				qaHook={qaHook}
				{...other}
			/>
		);
	}
}

XUIInput.propTypes = {
	qaHook: PropTypes.string,
	/** Object containing button element related properties. */
	clearButtonProps: PropTypes.object,
	/** Determines if the input has a clear button or not. Should not be used if consuming application is managing input value manually */
	hasClearButton: function(props, propName, componentName) {
		if (props[propName] && typeof props[propName] !== 'boolean'){
			return new Error(
				`Value of \`${propName}\` supplied to \`${componentName}\` is not a boolean`
			);
		}

		if (props[propName] && props.inputAttributes && props.inputAttributes.value){
			return new Error(
				`Do not supply \`inputAttributes.value\` to \`${componentName}\` when using \`hasClearButton\`. Use \`defaultValue\` instead`
			);
		}
	},
	/** Object containing any additional properties and their values to the Input element.
	 * Includes defaultValue event handler callbacks i.e. onChange, onSelect, onClick, onKeyDown etc. */
	inputAttributes: PropTypes.object,
	/** Whether text area has a border. */
	isBorderless: PropTypes.bool,
	/** Function to add a reference to the Input element */
	inputRef: PropTypes.func,
};