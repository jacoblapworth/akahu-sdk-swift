import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIControlWrapper from '../controlwrapper/XUIControlWrapper';
import { ns } from '../helpers/xuiClassNamespace';
import generateIds, { getAriaAttributes } from '../helpers/ariaHelpers';
import labelRequiredWarning from '../helpers/labelRequiredWarning';

const baseClass = `${ns}-rangeslider`;

const XUIRange = props => {
  const wrapperIds = generateIds();
  const {
    containerClassName,
    defaultValue,
    hintMessage,
    id,
    inputClassName,
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

  const labelRef = React.createRef();

  useEffect(() => {
    labelRequiredWarning(
      XUIRange.name,
      ['includes a label with text'],
      [labelRef.current?.innerText && !isLabelHidden, typeof label?.[0] === 'string'],
    );
  }, [isLabelHidden, label, labelRef]);

  return (
    <XUIControlWrapper
      hintMessage={hintMessage}
      isInvalid={isInvalid}
      isLabelHidden={isLabelHidden}
      label={label}
      labelRef={labelRef}
      qaHook={qaHook}
      validationMessage={validationMessage}
      wrapperIds={wrapperIds}
    >
      <div className={cn(`${baseClass}-container`, containerClassName)}>
        {leftElement}
        <input
          className={cn(
            `${baseClass}`,
            size && `${baseClass}-thumb-${size}`,
            isInvalid && `${baseClass}-is-invalid`,
            inputClassName,
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
  /** Additional classes to be applied to the container */
  containerClassName: PropTypes.string,
  /** Default value of the XUIRange component */
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Hint message to be passed into the XUIControlWrapper */
  hintMessage: PropTypes.node,
  /** Id of Range Component */
  id: PropTypes.string,
  /** Additional classes to be applied to the input */
  inputClassName: PropTypes.string,
  /** Disables the XUIRange component */
  isDisabled: PropTypes.bool,
  /** Displays that the XUIRange component is invalid */
  isInvalid: PropTypes.bool,
  /** Boolean to hide/show Input label */
  isLabelHidden: PropTypes.bool,
  /** Input label */
  label: PropTypes.node,
  /** Element on the left of the XUIRange component */
  leftElement: PropTypes.node,
  /** Maximum value of the XUIRange component */
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Minimum value of the XUIRange component */
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Name to be consumed by form objects etc */
  name: PropTypes.string,
  /** Define a function for the onClick event of the slider being clicked */
  onClick: PropTypes.func,
  /** Define a function for the onInput event of when the value of the slider is set/changed */
  onInput: PropTypes.func,
  qaHook: PropTypes.string,
  /** Element on the right of the XUIRange component */
  rightElement: PropTypes.node,
  /** Sizing of the circle touch object */
  size: PropTypes.oneOf(['medium', 'small', 'xsmall']),
  /** The incremement of the XUIRange slider value */
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** The message to show in validation */
  validationMessage: PropTypes.node,
};

XUIRange.defaultProps = {
  size: 'medium',
};
