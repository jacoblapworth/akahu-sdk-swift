import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { baseClass } from './constants';
import XUICheckbox from './XUICheckbox';
import XUICheckboxRangeSelector from './XUICheckboxRangeSelector';
import XUIControlGroup from '../controlgroup/XUIControlGroup';
import defaultBreakpoints from '../helpers/breakpoints';

/**
 * Presentational component that outputs the container necessary to implement
 * the grouped checkboxes pattern.
 *
 * @export
 * @param {Object} [props]
 * @returns
 */
const XUICheckboxGroup = props => {
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
    labelClassName,
    labelId,
    qaHook,
    swapAtBreakpoint,
    validationMessage,
  } = props;

  const childrenToRender = React.Children.map(children, child =>
    child.type === XUICheckbox
      ? React.cloneElement(child, {
          isGrouped: true,
        })
      : child,
  );

  return (
    <div className={fieldClassName}>
      <XUICheckboxRangeSelector>
        <XUIControlGroup
          fieldClassName={cn(className, `${baseClass}-group`)}
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
      </XUICheckboxRangeSelector>
    </div>
  );
};

export default XUICheckboxGroup;

XUICheckboxGroup.propTypes = {
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
  /** Whether to hide the label and apply it as an ARIA label instead. Defaults to visible. */
  isLabelHidden: PropTypes.bool,
  /** Whether the group is permanently grouped as a column, rather than a row. Defaults to true. */
  isLockedVertical: PropTypes.bool,
  /** Label to show above the checkbox group, or for accessibility when the checkbox group label is hidden. Highly recommended */
  label: PropTypes.node,
  /** Class names to add to the label text element */
  labelClassName: PropTypes.string,
  /** Provide a specific label ID which will be used as the "labelleby" aria property */
  labelId: PropTypes.string,
  /** String to be used as a data-automationid on the group and (with suffixes) on related elements */
  qaHook: PropTypes.string,
  /**
   * Defines the swap breakpoint (container width) between horizontal (single-row) group and vertical (single-column) group.
   * Supported breakpoints are `small` (600px), `medium` (800px), `large` (1000px), and `xlarge` (1200px).
   */
  swapAtBreakpoint: PropTypes.oneOf([...Object.keys(defaultBreakpoints)]),
  /** Validation message to show under the input if `isInvalid` is true */
  validationMessage: PropTypes.node,
};

XUICheckboxGroup.defaultProps = {
  isFieldLayout: false,
  isLockedVertical: true,
};
