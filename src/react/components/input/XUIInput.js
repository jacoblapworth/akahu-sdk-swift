import React, { Component } from 'react';
import PropTypes from 'proptypes';
import cn from 'classnames';
import clear from '@xero/xui-icon/icons/clear';
import XUIIcon from '../icon/XUIIcon';
import XUIStatelessInput from './XUIStatelessInput';
import XUIButton from '../button/XUIButton';
import { compose } from './private/utilities'

const onInputChange = (statefulInput) => {
	const { inputAttributes } = statefulInput.props;

	if (statefulInput.inputNode.value === '' && statefulInput.state.showClearButton) {
		statefulInput.setState({showClearButton: false});
	}

	if (statefulInput.inputNode.value !== '' && !statefulInput.state.showClearButton) {
		statefulInput.setState({showClearButton: true});
	}

	if (inputAttributes && inputAttributes.onChange && typeof inputAttributes.onChange === 'function') {
		statefulInput.props.inputAttributes.onChange();
	}
};

const onClearInputClick = (statefulInput) => {
	statefulInput.inputNode.value = '';
	statefulInput.inputNode.focus();
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

	render() {
		const statefulInput = this;
		const {
			clearButtonProps,
			hasClearButton,
			inputAttributes,
			inputRef,
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
				{...other}
			/>
		);
	}
}

XUIInput.propTypes = {
	/** @property {Object} [clearButtonProps] Object containing button element related properties. */
	clearButtonProps: PropTypes.object,
	/** @property {boolean} [hasClearButton] Determines if the input has a clear button or not. */
	hasClearButton: PropTypes.bool,
	/** @property {Object} [inputAttributes] Object containing any additional properties and their values to the Input element.
	 * Includes defaultValue event handler callbacks i.e. onChange, onSelect, onClick, onKeyDown etc. */
	inputAttributes: PropTypes.object,
	/** @property {Function} [inputRef] Function to add a reference to the Input element */
	inputRef: PropTypes.func
};
