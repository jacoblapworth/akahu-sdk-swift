import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIRadio from './XUIRadio';
import XUIControlWrapper, { getAriaAttributes } from '../controlwrapper/XUIControlWrapper';
import generateIds from '../controlwrapper/helpers';
import { baseClass } from './constants';

const XUIRadioGroup = props => {
  const wrapperIds = generateIds(props.labelId);
  const {
    children,
    className,
    fieldClassName,
    hintMessage,
    isFieldLayout,
    isInvalid,
    isLabelHidden,
    label,
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
    <XUIControlWrapper
      fieldClassName={fieldClassName}
      isGroup
      wrapperIds={wrapperIds}
      {...{
        qaHook,
        label,
        isInvalid,
        validationMessage,
        hintMessage,
        isFieldLayout,
        labelClassName,
        isLabelHidden,
      }}
    >
      <div
        className={groupClasses}
        data-automationid={qaHook}
        role="radiogroup"
        {...getAriaAttributes(wrapperIds, props, { isGroup: true })}
      >
        {childrenToRender}
      </div>
    </XUIControlWrapper>
  );
};

export default XUIRadioGroup;

XUIRadioGroup.propTypes = {
  children: PropTypes.node,
  /** Class names to be added to bordered grouping element */
  className: PropTypes.string,
  qaHook: PropTypes.string,
  /** Label to show above the radio group, or for accessibility when the radio group label is hidden. Highly recommended */
  label: PropTypes.node,
  /** Whether to hide the label and apply it as an ARIA label instead. Defaults to visible */
  isLabelHidden: PropTypes.bool,
  /** Whether to use the field layout classes. Defaults to true. */
  isFieldLayout: PropTypes.bool,
  /** Class names to add to the label text element */
  labelClassName: PropTypes.string,
  /** Provide a specific label ID which will be used as the "labelleby" aria property */
  labelId: PropTypes.string,
  /** Class names to be added to the field wrapper element */
  fieldClassName: PropTypes.string,
  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,
  /** Validation message to show under the input if `isInvalid` is true */
  validationMessage: PropTypes.string,
  /** Hint message to show under the input */
  hintMessage: PropTypes.string,
};

XUIRadioGroup.defaultProps = {
  isFieldLayout: false,
};
