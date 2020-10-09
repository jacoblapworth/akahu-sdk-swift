import * as PropTypes from 'prop-types';
import * as React from 'react';
import { DragDropContext as RBDDragDropContext } from 'react-beautiful-dnd';

import { borderSpacing } from '../constants';
import DragDropDraggingContext from './contexts/DragDropDraggingContext';

interface BaseProps {
  dragCancelledMessage?: (startPosition: number) => string;
  dragOutsideMessage?: (startPosition: number) => string;
  dragStartMessage?: (startPosition: number) => string;
  dragUpdateMessage?: (startPosition: number, endPosition: number) => string;
  dropFailedMessage?: (startPosition: number) => string;
  dropMessage?: (startPosition: number, endPosition: number) => string;
}

type Props = BaseProps & React.ComponentProps<typeof RBDDragDropContext>;

/**
 * `DragDropProvider` is a wrapper around (and has the same API as) react-beautiful-dnd's
 * [DragDropContext](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/drag-drop-context.md).
 *
 * Changes this wrapper makes:
 * - The currently dragged row's `index` and `height` are made available via
 *   `DragDropDraggingContext`
 * - Screen reader announcements exposed via additional props
 */
const DragDropProvider: React.FunctionComponent<Props> = ({
  children,
  dragCancelledMessage,
  dragOutsideMessage,
  dragStartMessage,
  dragUpdateMessage,
  dropFailedMessage,
  dropMessage,
  onDragEnd,
  onDragStart,
  onDragUpdate,
  ...spreadProps
}) => {
  const [draggedRowIndex, setDraggedRowIndex] = React.useState<number>();
  const [draggedRowHeight, setDraggedRowHeight] = React.useState<number>();

  return (
    <RBDDragDropContext
      onDragEnd={(result, provided) => {
        onDragEnd(result, provided);

        setDraggedRowIndex(undefined);
        setDraggedRowHeight(undefined);

        const startPosition = result.source.index + 1;

        if (result.reason === 'CANCEL' && dragCancelledMessage) {
          provided.announce(dragCancelledMessage(startPosition));
          return;
        }

        if (result.destination && dropMessage) {
          const endPosition = result.destination.index + 1;

          provided.announce(dropMessage(startPosition, endPosition));
          return;
        }

        if (dropFailedMessage) {
          provided.announce(dropFailedMessage(startPosition));
        }
      }}
      onDragStart={(start, provided) => {
        onDragStart?.(start, provided);

        setDraggedRowIndex(start.source.index);

        const draggable = document.querySelector(`[data-rbd-draggable-id="${start.draggableId}"]`);
        if (!draggable) {
          // PR: is this ok?
          throw new Error(`Could not find draggable with id: ${start.draggableId}.`);
        }
        const draggableHeight = draggable.clientHeight - borderSpacing * 2;
        setDraggedRowHeight(draggableHeight);

        if (dragStartMessage) {
          const startPosition = start.source.index + 1;
          provided.announce(dragStartMessage(startPosition));
        }
      }}
      onDragUpdate={(update, provided) => {
        onDragUpdate?.(update, provided);

        const startPosition = update.source.index + 1;

        if (!update.destination && dragOutsideMessage) {
          provided.announce(dragOutsideMessage(startPosition));
          return;
        }

        if (dragUpdateMessage) {
          const endPosition = (update.destination?.index || 0) + 1;
          provided.announce(dragUpdateMessage(startPosition, endPosition));
        }
      }}
      {...spreadProps}
    >
      <DragDropDraggingContext.Provider value={{ draggedRowHeight, draggedRowIndex }}>
        {children}
      </DragDropDraggingContext.Provider>
    </RBDDragDropContext>
  );
};

DragDropProvider.propTypes = {
  children: PropTypes.node,
  dragCancelledMessage: PropTypes.func,
  dragOutsideMessage: PropTypes.func,
  dragStartMessage: PropTypes.func,
  dragUpdateMessage: PropTypes.func,
  dropFailedMessage: PropTypes.func,
  dropMessage: PropTypes.func,
  onDragEnd: PropTypes.func.isRequired,
  onDragStart: PropTypes.func,
  onDragUpdate: PropTypes.func,
};

export default DragDropProvider;
