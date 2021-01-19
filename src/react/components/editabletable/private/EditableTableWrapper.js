import PropTypes from 'prop-types';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';

import XUIEditableTableContext from '../contexts/XUIEditableTableContext';
import { wrapperName } from './constants';
import DragDropProvider from './DragAndDrop/DragDropProvider';
import Droppable from './DragAndDrop/Droppable';
import EditableTableOverflow from './EditableTableOverflow';
import { baseName as rowName } from '../XUIEditableTableRow';
import combineRefs from '../../helpers/combineRefs';

const EditableTableWrapper = ({
  children,
  className,
  columnWidths,
  dndDragCancelledMessage,
  dndDragOutsideMessage,
  dndDragStartMessage,
  dndDragUpdateMessage,
  dndDropFailedMessage,
  dndDropMessage,
  dndInstructions,
  hasPinnedFirstColumn,
  hasPinnedLastColumn,
  isInvalid,
  maxWidth,
  minWidth,
  onReorderRow,
  rowOptions,
  tableRef,
}) => {
  const scrollContainerRef = React.useRef();
  const tableWrapperRef = React.useRef();
  const [dndInstructionsId] = React.useState(uuidv4());

  const onDragEnd = result => {
    if (typeof result.source.index === 'number' && typeof result.destination?.index === 'number') {
      onReorderRow?.(result.source.index, result.destination.index);
    }

    setTimeout(() => {
      const destinationIndex =
        result.destination?.index !== undefined ? result.destination.index : result.source.index;
      tableRef.current.querySelectorAll(`.${rowName}--draghandle`)[destinationIndex].focus();
    });
  };

  const wrapperStyle =
    // If we omit this check, wrapperStyle is always a non-empty object, and passes extraneous (but harmless) props.
    // This is for tidiness purposes only.
    maxWidth || minWidth
      ? {
          maxWidth,
          minWidth,
        }
      : undefined;

  return (
    <DragDropProvider
      dragCancelledMessage={dndDragCancelledMessage}
      dragOutsideMessage={dndDragOutsideMessage}
      dragStartMessage={dndDragStartMessage}
      dragUpdateMessage={dndDragUpdateMessage}
      dropFailedMessage={dndDropFailedMessage}
      dropMessage={dndDropMessage}
      onDragEnd={onDragEnd}
    >
      <Droppable>
        {provided => (
          <XUIEditableTableContext.Provider
            value={{
              columnWidths,
              dragAndDrop: {
                dragHandleDescribedBy: dndInstructionsId,
                rowPlaceholder: provided.placeholder,
              },
              hasPinnedFirstColumn,
              hasPinnedLastColumn,
              rowOptions: { ...rowOptions },
              scrollContainerRef,
              tableRef,
              tableWrapperRef,
            }}
          >
            <EditableTableOverflow
              className={cn(className, wrapperName)}
              hasPinnedFirstColumn={hasPinnedFirstColumn}
              hasPinnedLastColumn={hasPinnedLastColumn}
              ref={combineRefs(provided.innerRef, tableWrapperRef)}
              style={wrapperStyle}
              {...provided.droppableProps}
            >
              <div className={cn(`${wrapperName}--scrollcontainer`)} ref={scrollContainerRef}>
                {children}
                <div className={`${wrapperName}--dndinstructions`} id={dndInstructionsId}>
                  {dndInstructions}
                </div>
              </div>
              <div
                className={cn(
                  `${wrapperName}--border`,
                  isInvalid && `${wrapperName}--border-is-invalid`,
                )}
              />
            </EditableTableOverflow>
          </XUIEditableTableContext.Provider>
        )}
      </Droppable>
    </DragDropProvider>
  );
};

EditableTableWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  columnWidths: PropTypes.arrayOf(PropTypes.string),
  dndDragCancelledMessage: PropTypes.func,
  dndDragOutsideMessage: PropTypes.func,
  dndDragStartMessage: PropTypes.func,
  dndDragUpdateMessage: PropTypes.func,
  dndDropFailedMessage: PropTypes.func,
  dndDropMessage: PropTypes.func,
  dndInstructions: PropTypes.string,
  hasPinnedFirstColumn: PropTypes.bool,
  hasPinnedLastColumn: PropTypes.bool,
  isInvalid: PropTypes.bool,
  maxWidth: PropTypes.string,
  minWidth: PropTypes.string,
  onReorderRow: PropTypes.func,
  rowOptions: PropTypes.shape({
    dragButtonAriaLabel: PropTypes.string,
    isDraggable: PropTypes.bool,
    isRemovable: PropTypes.bool,
    removeButtonAriaLabel: PropTypes.string,
  }),
  tableRef: PropTypes.object.isRequired,
  validationMessage: PropTypes.string,
};

export default EditableTableWrapper;
