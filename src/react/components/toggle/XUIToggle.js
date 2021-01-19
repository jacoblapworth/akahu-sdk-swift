import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { colorMap, layoutMap, sizeMap, baseClass } from './private/constants';
import '../helpers/xuiGlobalChecks';
import XUIControlWrapper, { getAriaAttributes } from '../controlwrapper/XUIControlWrapper';
import generateIds from '../controlwrapper/helpers';

const XUIToggle = props => {
  const wrapperIds = generateIds(props.labelId);

  const toggleIsCheckbox = () => {
    const { children } = props;
    const isCheckbox = child => child && child.props.type === 'checkbox';
    return children != null && React.Children.map(children, isCheckbox).some(Boolean);
  };

  const {
    children,
    className,
    color,
    fieldClassName,
    hintMessage,
    isFieldLayout,
    isInvalid,
    isLabelHidden,
    label,
    labelClassName,
    layout,
    qaHook,
    secondaryProps,
    size,
    validationMessage,
  } = props;
  const classes = cn(
    className,
    baseClass,
    isInvalid && `${baseClass}-is-invalid`,
    colorMap[color],
    layoutMap[layout],
    sizeMap[size],
  );

  const ariaRole =
    (secondaryProps && secondaryProps.role) || toggleIsCheckbox() ? 'group' : 'radiogroup';

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
        {...secondaryProps}
        className={classes}
        data-automationid={qaHook}
        role={ariaRole}
        {...getAriaAttributes(wrapperIds, props, { isGroup: true })}
      >
        {children}
      </div>
    </XUIControlWrapper>
  );
};

export default XUIToggle;

XUIToggle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /** The color of the toggle */
  color: PropTypes.oneOf(Object.keys(colorMap)),
  /** Class names to be added to the field wrapper element */
  fieldClassName: PropTypes.string,
  /** Hint message to show under the input */
  hintMessage: PropTypes.node,
  /** Whether to use the field layout classes */
  isFieldLayout: PropTypes.bool,
  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,
  /** Should label be applied as an aria-label, rather than being visibly displayed. */
  isLabelHidden: PropTypes.bool,
  /** Label to show above the toggle */
  label: PropTypes.node,
  /** Class names to add to the label */
  labelClassName: PropTypes.string,
  /** Provide a specific label ID which will be used as the "labelleby" aria property */
  labelId: PropTypes.string,
  /** The layout of the toggle */
  layout: PropTypes.oneOf(Object.keys(layoutMap)),
  qaHook: PropTypes.string,
  /** Additional props to pass to the toggle element */
  secondaryProps: PropTypes.object,
  /** The size of the toggle */
  size: PropTypes.oneOf(Object.keys(sizeMap)),
  /** Validation message to show under the input if `isInvalid` is true */
  validationMessage: PropTypes.node,
};

XUIToggle.defaultProps = {
  color: 'standard',
  isFieldLayout: false,
  size: 'medium',
};
