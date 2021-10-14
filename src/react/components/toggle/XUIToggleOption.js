import React, { createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { baseClass, typeMap } from './private/constants';
import XUIControlWrapperInline from '../controlwrapper/XUIControlWrapperInline';
import generateIds, { getAriaAttributesInline } from '../helpers/ariaHelpers';
import labelRequiredWarning from '../helpers/labelRequiredWarning';

const XUIToggleOption = props => {
  const wrapperIds = generateIds(props.id);
  const {
    ariaLabel,
    children,
    className,
    qaHook,
    isChecked,
    isDefaultChecked,
    isDisabled,
    isRequired,
    name,
    onChange,
    type,
    value,
    id,
  } = props;
  const classes = cn(className, `${baseClass}--option`, isDisabled && `${baseClass}-is-disabled`);

  const labelRef = createRef();

  useEffect(() => {
    labelRequiredWarning(
      XUIToggleOption.name,
      ['includes a child with text', '`ariaLabel` provided'],
      [labelRef.current?.innerText, ariaLabel],
    );
  }, [labelRef, ariaLabel]);

  return (
    <XUIControlWrapperInline
      fieldClassName={classes}
      label={children}
      labelClassName={`${baseClass}--label`}
      labelRef={labelRef}
      qaHook={qaHook}
      rootClassName={`${baseClass}--optionwrapper`}
      wrapperIds={wrapperIds}
    >
      <input
        aria-label={ariaLabel}
        checked={isChecked}
        className={`${baseClass}--input`}
        data-automationid={qaHook && `${qaHook}--input`}
        defaultChecked={isDefaultChecked}
        disabled={isDisabled}
        id={id}
        name={name}
        onChange={onChange}
        required={isRequired}
        type={typeMap[type]}
        value={value}
        {...(!ariaLabel && getAriaAttributesInline(wrapperIds, props))}
      />
    </XUIControlWrapperInline>
  );
};

export default XUIToggleOption;

XUIToggleOption.propTypes = {
  /**
   * Accessibility label for the `<XUIToggleOption>`. This is required
   * if the component does not contain a child with text.
   * E.g. if the child is a `<XUIIcon>` without adjacent text.
   */
  ariaLabel: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  /** The input is selected */
  isChecked: PropTypes.bool,
  /** The input is selected initially, but not in a controlled manner */
  isDefaultChecked: PropTypes.bool,
  /** The input is disabled */
  isDisabled: PropTypes.bool,
  /** The input is required for form submission */
  isRequired: PropTypes.bool,
  /** The name to use as a reference for the value */
  name: PropTypes.string,
  /** onChange - The function to call when the control changes state */
  onChange: PropTypes.func.isRequired,
  qaHook: PropTypes.string,
  /** The type of the input */
  type: PropTypes.oneOf(Object.keys(typeMap)),
  /** The value to return on form submission */
  value: PropTypes.string,
};

XUIToggleOption.defaultProps = {
  type: typeMap.radio,
};
