import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import invalid from '@xero/xui-icon/icons/invalid';
import cn from 'classnames';

import { tableVariantClassNames } from './private/constants';
import EditableTableColGroup from './private/EditableTableColGroup';
import EditableTableWrapper from './private/EditableTableWrapper';
import conditionallyRequiredValidator from '../helpers/conditionallyRequiredValidator';
import XUIIcon from '../icon/XUIIcon';
import { generateIdsFromControlId } from '../controlwrapper/helpers';
import combineRefs from '../helpers/combineRefs';

const XUIEditableTable = React.forwardRef(
  (
    {
      _variant = 'editable',
      ariaLabel,
      children,
      className,
      columnWidths = [],
      dndDragCancelledMessage,
      dndDragOutsideMessage,
      dndDragStartMessage,
      dndDragUpdateMessage,
      dndDropFailedMessage,
      dndDropMessage,
      dndInstructions = '',
      hasPinnedFirstColumn,
      hasPinnedLastColumn,
      hiddenColumns,
      id,
      isInvalid,
      maxWidth,
      minWidth,
      onReorderRow,
      qaHook,
      rowOptions,
      scrollContainerRef,
      style,
      tableClassName,
      validationMessage,
      ...spreadProps
    },
    ref,
  ) => {
    const tableRef = React.useRef();
    const combinedRef = combineRefs(ref, tableRef);

    const tableVariantClassName = tableVariantClassNames[_variant];
    // Ensures the table id is only generated once, but changes if the prop changes.
    const [calculatedId, setId] = useState(id || `${tableVariantClassName}-${nanoid(10)}`);

    const wrapperIds = generateIdsFromControlId(calculatedId);

    return (
      <>
        {hiddenColumns && hiddenColumns.length > 0 && (
          <style>
            {hiddenColumns.map(
              hiddenColumn =>
                `#${calculatedId} .xui-editabletablerow > *:nth-child(${
                  parseInt(hiddenColumn) + 1
                }) { display: none; }`,
            )}
          </style>
        )}
        <EditableTableWrapper
          className={className}
          columnWidths={columnWidths}
          dndDragCancelledMessage={dndDragCancelledMessage}
          dndDragOutsideMessage={dndDragOutsideMessage}
          dndDragStartMessage={dndDragStartMessage}
          dndDragUpdateMessage={dndDragUpdateMessage}
          dndDropFailedMessage={dndDropFailedMessage}
          dndDropMessage={dndDropMessage}
          dndInstructions={dndInstructions}
          hasPinnedFirstColumn={hasPinnedFirstColumn}
          hasPinnedLastColumn={hasPinnedLastColumn}
          isInvalid={isInvalid}
          maxWidth={maxWidth}
          minWidth={minWidth}
          onReorderRow={onReorderRow}
          rowOptions={rowOptions}
          scrollContainerRef={scrollContainerRef}
          tableClassName={tableVariantClassName}
          tableRef={tableRef}
          validationMessage={validationMessage}
        >
          <table
            {...spreadProps}
            aria-describedby={isInvalid && validationMessage ? wrapperIds.message : undefined}
            aria-invalid={isInvalid}
            aria-label={ariaLabel}
            className={cn(
              tableVariantClassName,
              hasPinnedFirstColumn && `${tableVariantClassName}-pinfirst`,
              hasPinnedLastColumn && `${tableVariantClassName}-pinlast`,
              tableClassName,
            )}
            data-automationid={qaHook}
            id={wrapperIds.control}
            ref={combinedRef}
            style={style}
          >
            <EditableTableColGroup columnWidths={columnWidths} />
            {children}
          </table>
        </EditableTableWrapper>
        {isInvalid && validationMessage && (
          <div className={`${tableVariantClassName}--validation`} id={wrapperIds.message}>
            <XUIIcon icon={invalid} />
            {validationMessage}
          </div>
        )}
      </>
    );
  },
);

XUIEditableTable.propTypes = {
  /**
   * @ignore
   * Internal use only, used to recognize it's an editable or read-only table
   */
  _variant: PropTypes.oneOf(['editable', 'readonly']),

  /**
   * A non-visible description of the table for accessibility purposes. Particularly useful
   * for scrollable tables, to help screenreaders understand the scrollable element.
   */
  ariaLabel: PropTypes.string,

  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * Array of columns widths to be applied in order. Can be explicit widths, percentages, "auto", or empty strings to skip styling a column and fall back to default behaviour. If values are not supplied, columns will default to equal widths, filling the available space.
   */
  columnWidths: PropTypes.arrayOf(PropTypes.string),

  /**
   * A function used to determine the message read by screen readers when the user cancels dragging.
   *
   * Recommended English return value:
   * <br />
   * *Movement cancelled. The item has returned to its starting position of ${startPosition}.*
   */
  dndDragCancelledMessage(props, propName, componentName) {
    return conditionallyRequiredValidator(
      props,
      propName,
      componentName,
      props.rowOptions?.isDraggable,
      'rowOptions.isDraggable',
      'function',
    );
  },

  /**
   * A function used to determine the message read by screen readers when the user drags a row
   * outside of the table.
   *
   * Recommended English return value:
   * <br />
   * *You are currently not dragging over a droppable area.*
   */
  dndDragOutsideMessage(props, propName, componentName) {
    return conditionallyRequiredValidator(
      props,
      propName,
      componentName,
      props.rowOptions?.isDraggable,
      'rowOptions.isDraggable',
      'function',
    );
  },

  /**
   * A function used to determine the message read by screen readers when the user starts dragging a
   * row.
   *
   * Recommended English return value:
   * <br />
   * *You have lifted an item in position ${startPosition}.*
   */
  dndDragStartMessage(props, propName, componentName) {
    return conditionallyRequiredValidator(
      props,
      propName,
      componentName,
      props.rowOptions?.isDraggable,
      'rowOptions.isDraggable',
      'function',
    );
  },

  /**
   * A function used to determine the message read by screen readers when the user drags a row to a
   * new position.
   *
   * Recommended English return value:
   * <br />
   * *You have moved the item from position ${startPosition} to position ${endPosition}.*
   */
  dndDragUpdateMessage(props, propName, componentName) {
    return conditionallyRequiredValidator(
      props,
      propName,
      componentName,
      props.rowOptions?.isDraggable,
      'rowOptions.isDraggable',
      'function',
    );
  },

  /**
   * A function used to determine the message read by screen readers when the user drops a row
   * outside of the table.
   *
   * Recommended English return value:
   * <br />
   * *The item has been dropped while not over a droppable area. The item has returned to its
   * position of ${startPosition}.*
   */
  dndDropFailedMessage(props, propName, componentName) {
    return conditionallyRequiredValidator(
      props,
      propName,
      componentName,
      props.rowOptions?.isDraggable,
      'rowOptions.isDraggable',
      'function',
    );
  },

  /**
   * A function used to determine the message read by screen readers when the user drops a row in a
   * new position.
   *
   * Recommended English return value:
   * <br />
   * *You have dropped the item. It has moved from position ${startPosition} to ${endPosition}.*
   */
  dndDropMessage(props, propName, componentName) {
    return conditionallyRequiredValidator(
      props,
      propName,
      componentName,
      props.rowOptions?.isDraggable,
      'rowOptions.isDraggable',
      'function',
    );
  },

  /**
   * The message to be read by screen readers when the user focuses on the drag handle.
   *
   * Recommended English value:
   * <br />
   * *Press Space bar or Enter to start a drag. When dragging you can use the arrow keys to move the item around and escape to cancel. Ensure your screen reader is in focus mode or to use your pass through key.*
   */
  dndInstructions(props, propName, componentName) {
    return conditionallyRequiredValidator(
      props,
      propName,
      componentName,
      props.rowOptions?.isDraggable,
      'rowOptions.isDraggable',
      'string',
    );
  },

  hasPinnedFirstColumn: PropTypes.bool,
  hasPinnedLastColumn: PropTypes.bool,

  /**
   * Array of column _indexes_ to be hidden. Zero-based. Hidden elements remain in the DOM.
   * Convenient and performant for when the available columns and their order will not be changing.
   * For more dynamic tables, consider an alternate approach.
   */
  hiddenColumns: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

  /**
   * Optional id to be applied to the table. If one is not provided, a unique one will be generated.
   */
  id: PropTypes.string,

  /**
   * Used to style the table as invalid.
   */
  isInvalid: PropTypes.bool,

  maxWidth: PropTypes.string,
  minWidth: PropTypes.string,

  /**
   * The `onReorderRow` callback must result in the synchronous reordering of rows in the source
   * data, such as through `setState()`.
   *
   * To enable this, `onReorderRow` gets called with 2 parameters: `startIndex` and
   * `destinationIndex`.
   *
   * @param {number} startIndex The index the row was picked up from.
   * @param {number} destinationIndex The index the row was dropped into.
   */
  onReorderRow(props, propName, componentName) {
    return conditionallyRequiredValidator(
      props,
      propName,
      componentName,
      props.rowOptions?.isDraggable,
      'rowOptions.isDraggable',
      'function',
    );
  },

  qaHook: PropTypes.string,

  rowOptions: PropTypes.shape({
    /**
     * Adds an aria-label to the drag button.
     * <br />
     * Recommended English value: *Drag handle*
     */
    dragButtonAriaLabel(props, propName, componentName) {
      return conditionallyRequiredValidator(
        props,
        propName,
        componentName,
        props.isDraggable,
        'rowOptions.isDraggable',
        'string',
      );
    },
    isDraggable: PropTypes.bool,
    isRemovable: PropTypes.bool,
    removeButtonAriaLabel(props, propName, componentName) {
      return conditionallyRequiredValidator(
        props,
        propName,
        componentName,
        props.isRemovable,
        'rowOptions.isRemovable',
        'string',
      );
    },
  }),

  scrollContainerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),

  style: PropTypes.object,

  /**
   * Custom class(es) to add to the table element.
   */
  tableClassName: PropTypes.string,

  /**
   * Validation message to show under the table if `isInvalid` is true.
   */
  validationMessage: PropTypes.node,
};

export default XUIEditableTable;
