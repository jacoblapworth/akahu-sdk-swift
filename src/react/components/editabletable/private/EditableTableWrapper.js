import PropTypes from 'prop-types';
import React from 'react';
import { nanoid } from 'nanoid';
import cn from 'classnames';

import { tableVariantClassNames } from './constants';
import XUIEditableTableContext from '../contexts/XUIEditableTableContext';
import XUIEditableTableClassContext from '../contexts/XUIEditableTableClassContext';
import DragDropProvider from './DragAndDrop/DragDropProvider';
import Droppable from './DragAndDrop/Droppable';
import EditableTableOverflow from './EditableTableOverflow';
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
  scrollContainerRef: providedScrollContainerRef,
  tableClassName = tableVariantClassNames.editable,
  tableRef,
}) => {
  const scrollContainerRef = React.useRef();
  const combinedScrollContainerRef = combineRefs(scrollContainerRef, providedScrollContainerRef);
  const tableWrapperRef = React.useRef();
  const [dndInstructionsId] = React.useState(`xui-${nanoid(10)}`);
  const wrapperName = `${tableClassName}wrapper`;
  const rowName = `${tableClassName}row`;

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
            <XUIEditableTableClassContext.Provider value={tableClassName}>
              <EditableTableOverflow
                className={cn(className, wrapperName)}
                hasPinnedFirstColumn={hasPinnedFirstColumn}
                hasPinnedLastColumn={hasPinnedLastColumn}
                ref={combineRefs(provided.innerRef, tableWrapperRef)}
                style={wrapperStyle}
                {...provided.droppableProps}
              >
                <div
                  className={cn(`${wrapperName}--scrollcontainer`)}
                  ref={combinedScrollContainerRef}
                >
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
            </XUIEditableTableClassContext.Provider>
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
  scrollContainerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  tableClassName: PropTypes.string,
  tableRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  validationMessage: PropTypes.string,
};

export default EditableTableWrapper;
