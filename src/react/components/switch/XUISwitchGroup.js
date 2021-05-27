import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ns } from '../helpers/xuiClassNamespace';
import XUIControlWrapper from '../controlwrapper/XUIControlWrapper';
import generateIds, { getAriaAttributes } from '../helpers/ariaHelpers';

const baseClass = `${ns}-switch`;

/**
 * Presentational component that outputs the container necessary to implement
 * the grouped switches pattern.
 *
 * @export
 * @param {Object} [props]
 * @returns
 */
const XUISwitchGroup = props => {
  const {
    className,
    children,
    fieldClassName,
    hintMessage,
    isFieldLayout,
    isInvalid,
    isLabelHidden,
    label,
    labelClassName,
    labelId,
    qaHook,
    validationMessage,
  } = props;

  const wrapperIds = generateIds(labelId);

  const groupClasses = cn(
    className,
    `${baseClass}-group`,
    isInvalid && `${baseClass}-group-is-invalid`,
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
        {...getAriaAttributes(wrapperIds, props, { isGroup: true })}
      >
        {children}
      </div>
    </XUIControlWrapper>
  );
};

export default XUISwitchGroup;

XUISwitchGroup.propTypes = {
  children: PropTypes.node,
  /** Class names to be added to bordered grouping element */
  className: PropTypes.string,
  /** Class names to be added to the field wrapper element */
  fieldClassName: PropTypes.string,
  /** Hint message to show under the input */
  hintMessage: PropTypes.node,
  /** Whether to use the field layout classes. Defaults to false. */
  isFieldLayout: PropTypes.bool,
  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,
  /** Whether to hide the label and apply it as an ARIA label instead. Defaults to visible */
  isLabelHidden: PropTypes.bool,
  /** Label to show above the switch group, or for accessibility when the switch group label is hidden. Highly recommended */
  label: PropTypes.node,
  /** Class names to add to the label text element */
  labelClassName: PropTypes.string,
  /** Provide a specific label ID which will be used as the "labelleby" aria property */
  labelId: PropTypes.string,
  qaHook: PropTypes.string,
  /** Validation message to show under the input if `isInvalid` is true */
  validationMessage: PropTypes.node,
};

XUISwitchGroup.defaultProps = {
  isFieldLayout: false,
};
