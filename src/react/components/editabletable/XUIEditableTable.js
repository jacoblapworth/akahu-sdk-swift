import React from 'react';
import PropTypes from 'prop-types';
import invalid from '@xero/xui-icon/icons/invalid';

import { tableName } from './private/constants';
import EditableTableColGroup from './private/EditableTableColGroup';
import EditableTableWrapper from './private/EditableTableWrapper';
import conditionallyRequiredValidator from '../helpers/conditionallyRequiredValidator';
import XUIIcon from '../icon/XUIIcon';
import generateIds from '../controlwrapper/helpers';

const XUIEditableTable = ({
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
  isInvalid,
  maxWidth,
  minWidth,
  onReorderRow,
  qaHook,
  rowOptions,
  style,
  validationMessage,
  ...spreadProps
}) => {
  const tableRef = React.useRef();

  const wrapperIds = generateIds(spreadProps.id);

  return (
    <React.Fragment>
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
        isInvalid={isInvalid}
        maxWidth={maxWidth}
        minWidth={minWidth}
        onReorderRow={onReorderRow}
        rowOptions={rowOptions}
        tableRef={tableRef}
        validationMessage={validationMessage}
      >
        <table
          {...spreadProps}
          aria-describedby={isInvalid && validationMessage ? wrapperIds.message : undefined}
          aria-invalid={isInvalid}
          aria-label={ariaLabel}
          className={tableName}
          data-automationid={qaHook}
          ref={tableRef}
        >
          <EditableTableColGroup columnWidths={columnWidths} />
          {children}
        </table>
      </EditableTableWrapper>
      {isInvalid && validationMessage && (
        <div className={`${tableName}--validation`} id={wrapperIds.message}>
          <XUIIcon icon={invalid} />
          {validationMessage}
        </div>
      )}
    </React.Fragment>
  );
};

XUIEditableTable.propTypes = {
  /**
   * A non-visible description of the table for accessibility purposes. Particularly useful
   * for scrollable tables, to help screenreaders understand the scrollable element.
   */
  ariaLabel: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  className: PropTypes.string,
  qaHook: PropTypes.string,
  rowOptions: PropTypes.shape({
    isDraggable: PropTypes.bool,
    isRemovable: PropTypes.bool,
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
  columnWidths: PropTypes.arrayOf(PropTypes.string),
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
   * *Press space bar to start a drag. When dragging you can use the arrow keys to move the item around and escape to cancel. Ensure your screen reader is in focus mode or forms mode.*
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

  style: PropTypes.object,
  /**
   * Validation message to show under the table if `isInvalid` is true.
   */
  validationMessage: PropTypes.string,
};

export default XUIEditableTable;
