import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIRadio from './XUIRadio';
import XUIControlGroup from '../controlgroup/XUIControlGroup';
import defaultBreakpoints from '../helpers/breakpoints';
import { baseClass } from './constants';

const XUIRadioGroup = props => {
  const {
    children,
    className,
    columnWidths,
    fieldClassName,
    hintMessage,
    isFieldLayout,
    isInvalid,
    isLabelHidden,
    isLockedVertical,
    label,
    labelId,
    labelClassName,
    qaHook,
    swapAtBreakpoint,
    validationMessage,
  } = props;

  const childrenToRender = React.Children.map(children, child =>
    child.type === XUIRadio
      ? React.cloneElement(child, {
          isGrouped: true,
        })
      : child,
  );

  return (
    <div className={fieldClassName}>
      <XUIControlGroup
        fieldClassName={cn(className, `${baseClass}-group`)}
        role="radiogroup"
        {...{
          columnWidths,
          qaHook,
          label,
          labelId,
          isInvalid,
          isLockedVertical,
          validationMessage,
          hintMessage,
          isFieldLayout,
          labelClassName,
          isLabelHidden,
          swapAtBreakpoint,
        }}
      >
        {childrenToRender}
      </XUIControlGroup>
    </div>
  );
};

export default XUIRadioGroup;

XUIRadioGroup.propTypes = {
  children: PropTypes.node,
  /** Class names to be added to bordered grouping element */
  className: PropTypes.string,
  /** Column widths, expressed a CSS grid-template-columns string */
  columnWidths: PropTypes.string,
  /** Class names to be added to the field wrapper element */
  fieldClassName: PropTypes.string,
  /** Hint message to show under the input */
  hintMessage: PropTypes.node,
  /** Whether to use the field layout classes. Defaults to true. */
  isFieldLayout: PropTypes.bool,
  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,
  /** Whether to hide the label and apply it as an ARIA label instead. Defaults to visible */
  isLabelHidden: PropTypes.bool,
  /** Whether the group is permanently grouped as a column, rather than a row. Defaults to true. */
  isLockedVertical: PropTypes.bool,
  /** Class names to add to the label text element */
  /** Label to show above the radio group, or for accessibility when the radio group label is hidden. Highly recommended */
  label: PropTypes.node,
  labelClassName: PropTypes.string,
  /** Provide a specific label ID which will be used as the "labelleby" aria property */
  labelId: PropTypes.string,
  qaHook: PropTypes.string,
  /**
   * Defines the swap breakpoint (container width) between horizontal (single-row) group and vertical (single-column) group.
   * Supported breakpoints are `small` (600px), `medium` (800px), `large` (1000px), and `xlarge` (1200px).
   */
  swapAtBreakpoint: PropTypes.oneOf([...Object.keys(defaultBreakpoints)]),
  /** Validation message to show under the input if `isInvalid` is true */
  validationMessage: PropTypes.node,
};

XUIRadioGroup.defaultProps = {
  isFieldLayout: false,
  isLockedVertical: true,
};
