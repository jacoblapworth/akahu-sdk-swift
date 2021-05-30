import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import dragIcon from '@xero/xui-icon/icons/drag';
import trashIcon from '@xero/xui-icon/icons/trash';

import Draggable from './private/DragAndDrop/Draggable';
import XUIEditableTableCellIconButton from './XUIEditableTableCellIconButton';
import XUIEditableTableContext from './contexts/XUIEditableTableContext';
import XUIEditableTableClassContext from './contexts/XUIEditableTableClassContext';
import XUIEditableTableHeadContext from './contexts/XUIEditableTableHeadContext';
import EditableTableHeadRow from './private/EditableTableHeadRow';

const XUIEditableTableRow = ({
  children,
  className,
  disableRowControls,
  index,
  onRemove,
  qaHook,
  style,
  ...spreadProps
}) => {
  const {
    dragAndDrop: { dragHandleDescribedBy },
    rowOptions: { dragButtonAriaLabel, isDraggable, isRemovable, removeButtonAriaLabel },
  } = React.useContext(XUIEditableTableContext);
  const tableClassName = React.useContext(XUIEditableTableClassContext);
  const baseName = `${tableClassName}row`;

  const isHeaderRow = React.useContext(XUIEditableTableHeadContext);

  if (isHeaderRow) {
    return (
      <EditableTableHeadRow
        className={cn(baseName, className)}
        qaHook={qaHook}
        style={style}
        {...spreadProps}
      >
        {children}
      </EditableTableHeadRow>
    );
  }

  const isDragDisabled = disableRowControls;

  return (
    <Draggable
      disableInteractiveElementBlocking
      index={index}
      isDragDisabled={isDragDisabled}
      useDraggable={isDraggable}
    >
      {(provided, snapshot) => (
        <tr
          className={cn(
            baseName,
            className,
            snapshot?.isDragging && !snapshot?.isDropAnimating && `${baseName}-dragging`,
            snapshot?.isDropAnimating && `${baseName}-dropping`,
          )}
          data-automationid={qaHook}
          ref={provided?.innerRef}
          {...spreadProps}
          {...provided?.draggableProps}
          style={{
            ...style,
            ...provided?.draggableProps?.style,
          }}
        >
          {isDraggable && (
            <XUIEditableTableCellIconButton
              {...provided?.dragHandleProps}
              aria-describedby={dragHandleDescribedBy}
              ariaLabel={dragButtonAriaLabel}
              cellProps={{
                qaHook: qaHook && `${qaHook}--cell-drag`,
              }}
              className={`${baseName}--draghandle`}
              iconReference={dragIcon}
              isDisabled={isDragDisabled}
              onMouseDown={event => event.currentTarget.focus()}
              qaHook={qaHook && `${qaHook}--button-drag`}
            />
          )}
          {children}
          {isRemovable && (
            <XUIEditableTableCellIconButton
              ariaLabel={removeButtonAriaLabel}
              iconReference={trashIcon}
              isDisabled={disableRowControls}
              onClick={onRemove}
              qaHook={qaHook && `${qaHook}--button-remove`}
            />
          )}
        </tr>
      )}
    </Draggable>
  );
};

XUIEditableTableRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Whether to disable controls in the row, including drag and remove icons
   */
  disableRowControls: PropTypes.bool,
  /**
   * The index of the row in the list. This will typically be the `index`
   * provided by `Array.prototype.map`.
   *
   * ⚠️ *Required for draggable rows*
   */
  index: PropTypes.number,
  onRemove: PropTypes.func,
  qaHook: PropTypes.string,
  style: PropTypes.object,
};

export default XUIEditableTableRow;
