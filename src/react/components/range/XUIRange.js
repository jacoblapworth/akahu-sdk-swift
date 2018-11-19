import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIControlWrapper, { getAriaAttributes } from '../controlwrapper/XUIControlWrapper';
import { ns } from '../helpers/xuiClassNamespace';
import generateIds from '../controlwrapper/helpers';

import '../../../sass/7-components/_forms.range.scss';

const baseClass = `${ns}-rangeslider`;


export default class XUIRange extends PureComponent {
	wrapperIds = generateIds();
	render() {
		const {
			hintMessage,
			qaHook,
			onClick,
			onInput,
			leftElement,
			rightElement,
			name,
			isLabelHidden,
			label,
			id,
			step,
			size,
			defaultValue,
			min,
			max,
			isDisabled,
			validationMessage,
			isInvalid,
			containerClasses,
			inputClasses,
		} = this.props;

		return (
			<XUIControlWrapper
				wrapperIds={this.wrapperIds}
				isLabelHidden={isLabelHidden}
				label={label}
				validationMessage={validationMessage}
				hintMessage={hintMessage}
				qaHook={qaHook}
				isInvalid={isInvalid}
			>
				<div className={cn(`${baseClass}-container`, containerClasses)} >
					{leftElement}
					<input
						name={name}
						onClick={onClick}
						onInput={onInput}
						id={id}
						className={cn(
							`${baseClass}`,
							size && `${baseClass}-thumb-${size}`,
							isInvalid && `${baseClass}-is-invalid`,
							inputClasses,
						)}
						step={step}
						type="range"
						defaultValue={defaultValue}
						min={min}
						max={max}
						disabled={isDisabled}
						{...getAriaAttributes(this.wrapperIds, this.props)}
					/>
					{rightElement}
				</div>
			</XUIControlWrapper>
		);
	}
}

XUIRange.propTypes = {
	qaHook: PropTypes.string,
	/** Element on the left of the XUIRange component */
	leftElement: PropTypes.node,
	/** Element on the right of the XUIRange component */
	rightElement: PropTypes.node,
	/** Boolean to hide/show Input label */
	isLabelHidden: PropTypes.node,
	/** Input label */
	label: PropTypes.node,
	/** Name to be consumed by form objects etc */
	name: PropTypes.string,
	/** Hint string to be passed into the XUIControlWrapper */
	hintMessage: PropTypes.string,
	/** Id of Range Component */
	id: PropTypes.string,
	/** Sizing of the circle touch object */
	size: PropTypes.oneOf(['default', 'small', 'xsmall']),
	/** The incremement of the XUIRange slider value */
	step: PropTypes.number,
	/** Default value of the XUIRange component */
	defaultValue: PropTypes.string,
	/** Minimum value of the XUIRange component */
	min: PropTypes.number,
	/** Maximum value of the XUIRange component */
	max: PropTypes.number,
	/** Define a function for the onClick event of the slider being clicked */
	onClick: PropTypes.func,
	/** Define a function for the onInput event of when the value of the slider is set/changed */
	onInput: PropTypes.func,
	/** Disables the XUIRange component */
	isDisabled: PropTypes.bool,
	/** The message to show in validation */
	validationMessage: PropTypes.string,
	/** Displays that the XUIRange component is invalid */
	isInvalid: PropTypes.bool,
	/** Additional classes to be applied to the container */
	containerClasses: PropTypes.string,
	/** Additional classes to be applied to the input */
	inputClasses: PropTypes.string,
};
