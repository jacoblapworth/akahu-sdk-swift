import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  Draggable as RBDDraggable,
  DraggableProvided,
  DraggableRubric,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import { Portal } from 'react-portal';
import { v4 as uuid } from 'uuid';

import XUIEditableTableContext from '../../contexts/XUIEditableTableContext';
import { xuiControlSizeStandard } from '../constants';
import DragDropDraggingContext from './contexts/DragDropDraggingContext';
import DroppableContext from './contexts/DroppableContext';
import addOffsetToTransform from './helpers/addOffsetToTransform';

interface BaseProps {
  children(
    provided?: Omit<DraggableProvided, 'draggableProps'> & {
      draggableProps: Partial<
        Omit<DraggableProvided['draggableProps'], 'style'> & {
          style: React.CSSProperties;
        }
      >;
    },
    snapshot?: DraggableStateSnapshot,
    rubric?: DraggableRubric,
  ): React.ReactElement<HTMLElement>;
  draggableId?: string;
  index?: number;
  useDraggable?: boolean;
}

type Props = BaseProps &
  Omit<React.ComponentProps<typeof RBDDraggable>, 'children' | 'draggableId' | 'index'>;

/**
 * Draggable is a wrapper around (and has the same API as) react-beautiful-dnd's
 * [Draggable](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/draggable.md).
 *
 * General changes this wrapper makes:
 * - `draggableId` is automatically generated if it is not provided
 *
 * Table-oriented changes this wrapper makes:
 * - Modify the preview to look like the draggable will go back to its origin when it is dragged
 *   outside of the droppable.
 * - The draggable's transform is modified to account for the table's border-spacing
 * - While being dragged the draggable is wrapped in a `table` element that keeps track of column
 *   widths
 */
const Draggable: React.FunctionComponent<Props> = ({
  children,
  draggableId,
  index,
  useDraggable,
  ...spreadProps
}) => {
  const [generatedDraggableId] = React.useState(uuid());

  const { draggedRowHeight, draggedRowIndex } = React.useContext(DragDropDraggingContext);
  const { isDraggingOver } = React.useContext(DroppableContext);
  const { columnWidths, rowOptions, tableRef } = React.useContext(XUIEditableTableContext);

  if (!useDraggable || typeof index !== 'number') {
    return children();
  }

  return (
    <RBDDraggable draggableId={draggableId || generatedDraggableId} index={index} {...spreadProps}>
      {(provided, snapshot, rubric) => {
        /**
         * Table-oriented change 1/3
         *
         * Modify the preview to look like the draggable will go back to its origin when it is
         * dragged outside of the droppable.
         */
        const makeRoomForDraggable =
          !isDraggingOver && typeof draggedRowIndex === 'number' && draggedRowIndex < index;

        const providedTransform =
          provided.draggableProps.style?.transform ||
          (makeRoomForDraggable && `translate(0px, ${draggedRowHeight}px)`) ||
          'translate(0px, 0px)';

        /**
         * Table-oriented change 2/3
         *
         * Modify the draggable's transform to account for the table's border-spacing.
         */
        const transform = addOffsetToTransform(providedTransform, snapshot.isDragging);

        if (!snapshot.isDragging) {
          return children(
            {
              ...provided,
              draggableProps: {
                ...provided.draggableProps,
                style: {
                  ...provided.draggableProps.style,
                  pointerEvents: isDraggingOver ? 'none' : undefined,
                  transform,
                },
              },
            },
            snapshot,
            rubric,
          );
        }

        /**
         * Table-oriented change 3/3
         *
         * Wrap the draggable in a `table` element that keeps track of column widths.
         */
        const columns = Array.from(tableRef?.current?.querySelector('tr')?.children || []) as Array<
          HTMLElement
        >;
        const calculatedColumnWidths = columns
          .filter(
            (_, columnIndex) =>
              !(
                (rowOptions.isSortable && columnIndex === 0) ||
                (rowOptions.isRemovable && columnIndex === columns.length - 1)
              ),
          )
          .map(cell => `${cell.offsetWidth}px`);

        const columnWidthsToUse = calculatedColumnWidths?.length
          ? calculatedColumnWidths
          : columnWidths;

        return (
          <Portal>
            <table
              {...provided.draggableProps}
              style={{
                ...provided.draggableProps.style,
                transform,
                // Copy the styling of XUIEditableTable
                background: 'white',
                borderSpacing: '1px',
                borderCollapse: 'separate',
                tableLayout: 'fixed',
              }}
            >
              {!!columnWidthsToUse?.length && (
                <colgroup>
                  {rowOptions.isSortable && <col style={{ width: xuiControlSizeStandard }} />}
                  {columnWidthsToUse.map((width, i) => (
                    <col key={String(i)} style={{ width }} />
                  ))}
                  {rowOptions.isRemovable && <col style={{ width: xuiControlSizeStandard }} />}
                </colgroup>
              )}
              <tbody>
                {children(
                  {
                    ...provided,
                    draggableProps: {
                      style: {
                        transition: provided.draggableProps.style?.transition,
                      },
                    },
                  },
                  snapshot,
                  rubric,
                )}
              </tbody>
            </table>
          </Portal>
        );
      }}
    </RBDDraggable>
  );
};

Draggable.propTypes = {
  children: PropTypes.func.isRequired,
  draggableId: PropTypes.string,
  index: PropTypes.number,
  useDraggable: PropTypes.bool,
};

export default Draggable;
