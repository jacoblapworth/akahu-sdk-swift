import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ns } from '../helpers/xuiClassNamespace';

import XUIControlWrapper from '../controlwrapper/XUIControlWrapper';
import generateIds, { getAriaAttributes } from '../helpers/ariaHelpers';
import useContainerQuery from '../helpers/useContainerQuery';
import defaultBreakpoints from '../helpers/breakpoints';

const baseClass = `${ns}-inputgroup`;

const XUIInputGroup = props => {
  const { observedElementRef, isWidthAboveBreakpoint } = useContainerQuery();
  const {
    ariaRole,
    children,
    fieldClassName,
    groupClassName,
    hintMessage,
    isBottomAligned,
    isFieldLayout,
    isInvalid,
    isLabelHidden,
    label,
    labelClassName,
    labelId,
    isLockedVertical,
    qaHook,
    validationMessage,
    columnWidths,
    swapAtBreakpoint,
  } = props;

  // Ensures the id is only generated once.
  const [uniqueIds] = useState(generateIds());
  const wrapperIds = labelId ? generateIds(labelId) : uniqueIds;

  const displayVertical =
    isLockedVertical || (swapAtBreakpoint && !isWidthAboveBreakpoint(swapAtBreakpoint));
  const groupClasses = cn(
    baseClass,
    displayVertical ? `${baseClass}-vertical` : `${baseClass}-horizontal`,
    isBottomAligned && `${baseClass}-is-bottomaligned`,
    isInvalid && `${baseClass}-is-invalid`,
    groupClassName,
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
        ref={observedElementRef}
        role={ariaRole}
        style={{
          gridTemplateColumns:
            !displayVertical &&
            (columnWidths ||
              (children &&
                `repeat(${children.length}, minmax(${Math.floor(100 / children.length)}%, 1fr))`)),
        }}
        {...getAriaAttributes(wrapperIds, props, { isGroup: true })}
      >
        {children}
      </div>
    </XUIControlWrapper>
  );
};

XUIInputGroup.propTypes = {
  /** Role to be applied for screen readers. Defaults to "group" */
  ariaRole: PropTypes.string,
  /** Child controls that comprise the group */
  children: PropTypes.node,
  /** Column widths, expressed a CSS grid-template-columns string */
  columnWidths: PropTypes.string,
  /** Classes to go on the outermost wrapping div that contains the label and the group */
  fieldClassName: PropTypes.string,
  /** Classes to go on the group element */
  groupClassName: PropTypes.string,
  /** Hint message to show under the group */
  hintMessage: PropTypes.string,
  /** Whether to align grouped items to the bottom, rather than the top. This is useful when labels across grouped inputs are varying line lengths, but NOT good when validation and hint messages may vary in line-lengths between inputs. */
  isBottomAligned: PropTypes.bool,
  /** Whether to use the field layout classes. Defaults to false. */
  isFieldLayout: PropTypes.bool,
  /** Whether the current input group is invalid, as a whole */
  isInvalid: PropTypes.bool,
  /** Whether to hide the label and apply it as an ARIA label instead. Defaults to visible */
  isLabelHidden: PropTypes.bool,
  /** Whether the group is permanently grouped as a column, rather than a row. Defaults to false. */
  isLockedVertical: PropTypes.bool,
  /** Label to show above the group, or for accessibility when the group label is hidden. Highly recommended */
  label: PropTypes.string,
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
  /** Validation message to show under the group if `isInvalid` is true */
  validationMessage: PropTypes.string,
};

XUIInputGroup.defaultProps = {
  ariaRole: 'group',
};

export { XUIInputGroup as default };
