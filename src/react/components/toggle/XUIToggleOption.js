import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { baseClass } from './private/constants';
import XUIControlWrapperInline, {
  getAriaAttributes,
} from '../controlwrapper/XUIControlWrapperInline';
import generateIds from '../controlwrapper/helpers';

/** @private typeMap - Map types to attributes */
const typeMap = {
  radio: 'radio',
  checkbox: 'checkbox',
};

export default function XUIToggleOption(props) {
  const wrapperIds = generateIds(props.id);
  const {
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
  const classes = cn(className, `${baseClass}-option`, isDisabled && `${baseClass}-is-disabled`);

  return (
    <XUIControlWrapperInline
      fieldClassName={classes}
      label={children}
      labelClassName={`${baseClass}--label`}
      qaHook={qaHook}
      rootClassName={`${baseClass}-optionwrapper`}
      wrapperIds={wrapperIds}
    >
      <input
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
        {...getAriaAttributes(wrapperIds, props)}
      />
    </XUIControlWrapperInline>
  );
}

XUIToggleOption.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
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
  /** The type of the input */
  type: PropTypes.oneOf(Object.keys(typeMap)),
  /** The value to return on form submission */
  value: PropTypes.string,
  id: PropTypes.string,
};

XUIToggleOption.defaultProps = {
  type: typeMap.radio,
};
