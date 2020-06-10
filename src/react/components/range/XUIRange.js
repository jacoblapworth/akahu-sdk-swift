import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIControlWrapper, { getAriaAttributes } from '../controlwrapper/XUIControlWrapper';
import { ns } from '../helpers/xuiClassNamespace';
import generateIds from '../controlwrapper/helpers';

const baseClass = `${ns}-rangeslider`;

const XUIRange = props => {
  const wrapperIds = generateIds();
  const {
    containerClasses,
    defaultValue,
    hintMessage,
    id,
    inputClasses,
    isDisabled,
    isInvalid,
    isLabelHidden,
    label,
    leftElement,
    max,
    min,
    name,
    onClick,
    onInput,
    qaHook,
    rightElement,
    size,
    step,
    validationMessage,
  } = props;

  return (
    <XUIControlWrapper
      hintMessage={hintMessage}
      isInvalid={isInvalid}
      isLabelHidden={isLabelHidden}
      label={label}
      qaHook={qaHook}
      validationMessage={validationMessage}
      wrapperIds={wrapperIds}
    >
      <div className={cn(`${baseClass}-container`, containerClasses)}>
        {leftElement}
        <input
          className={cn(
            `${baseClass}`,
            size && `${baseClass}-thumb-${size}`,
            isInvalid && `${baseClass}-is-invalid`,
            inputClasses,
          )}
          defaultValue={defaultValue}
          disabled={isDisabled}
          id={id}
          max={max}
          min={min}
          name={name}
          onClick={onClick}
          onInput={onInput}
          step={step}
          type="range"
          {...getAriaAttributes(wrapperIds, props)}
        />
        {rightElement}
      </div>
    </XUIControlWrapper>
  );
};

export default XUIRange;

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
  /** Hint message to be passed into the XUIControlWrapper */
  hintMessage: PropTypes.node,
  /** Id of Range Component */
  id: PropTypes.string,
  /** Sizing of the circle touch object */
  size: PropTypes.oneOf(['medium', 'small', 'xsmall']),
  /** The incremement of the XUIRange slider value */
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Default value of the XUIRange component */
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Minimum value of the XUIRange component */
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Maximum value of the XUIRange component */
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Define a function for the onClick event of the slider being clicked */
  onClick: PropTypes.func,
  /** Define a function for the onInput event of when the value of the slider is set/changed */
  onInput: PropTypes.func,
  /** Disables the XUIRange component */
  isDisabled: PropTypes.bool,
  /** The message to show in validation */
  validationMessage: PropTypes.node,
  /** Displays that the XUIRange component is invalid */
  isInvalid: PropTypes.bool,
  /** Additional classes to be applied to the container */
  containerClasses: PropTypes.string,
  /** Additional classes to be applied to the input */
  inputClasses: PropTypes.string,
};

XUIRange.defaultProps = {
  size: 'medium',
};
