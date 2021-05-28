import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIRadio from './XUIRadio';
import XUIControlGroup from '../controlgroup/XUIControlGroup';
import { baseClass } from './constants';

const XUIRadioGroup = props => {
  const {
    children,
    className,
    fieldClassName,
    hintMessage,
    isFieldLayout,
    isInvalid,
    isLabelHidden,
    label,
    labelId,
    labelClassName,
    qaHook,
    validationMessage,
  } = props;

  const groupClasses = cn(
    className,
    `${baseClass}-group`,
    isInvalid && `${baseClass}-group-is-invalid`,
  );

  const childrenToRender = React.Children.map(children, child =>
    child.type === XUIRadio
      ? React.cloneElement(child, {
          isGrouped: true,
        })
      : child,
  );

  return (
    <XUIControlGroup
      groupClassName={groupClasses}
      role="radiogroup"
      {...{
        fieldClassName,
        qaHook,
        label,
        labelId,
        isInvalid,
        isLockedVertical: true,
        validationMessage,
        hintMessage,
        isFieldLayout,
        labelClassName,
        isLabelHidden,
      }}
    >
      {childrenToRender}
    </XUIControlGroup>
  );
};

export default XUIRadioGroup;

XUIRadioGroup.propTypes = {
  children: PropTypes.node,
  /** Class names to be added to bordered grouping element */
  className: PropTypes.string,
  /** Class names to be added to the field wrapper element */
  fieldClassName: PropTypes.string,
  /** Hint message to show under the input */
  hintMessage: PropTypes.string,
  /** Whether to use the field layout classes. Defaults to true. */
  isFieldLayout: PropTypes.bool,
  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,
  /** Whether to hide the label and apply it as an ARIA label instead. Defaults to visible */
  isLabelHidden: PropTypes.bool,
  /** Class names to add to the label text element */
  /** Label to show above the radio group, or for accessibility when the radio group label is hidden. Highly recommended */
  label: PropTypes.node,
  labelClassName: PropTypes.string,
  /** Provide a specific label ID which will be used as the "labelleby" aria property */
  labelId: PropTypes.string,
  qaHook: PropTypes.string,
  /** Validation message to show under the input if `isInvalid` is true */
  validationMessage: PropTypes.string,
};

XUIRadioGroup.defaultProps = {
  isFieldLayout: false,
};
