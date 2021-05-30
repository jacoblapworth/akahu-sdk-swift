import { nanoid } from 'nanoid';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Droppable as RBDDroppable } from 'react-beautiful-dnd';

import DroppableContext from './contexts/DroppableContext';

interface BaseProps {
  droppableId?: string;
}

type Props = BaseProps & Omit<React.ComponentProps<typeof RBDDroppable>, 'droppableId'>;

/**
 * Droppable is a wrapper around (and has the same API as) react-beautiful-dnd's
 * [Droppable](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md).
 *
 * Changes this wrapper makes:
 * - `droppableId` is automatically generated if it is not provided
 * - `snapshot.isDraggingOver` is made available via `DroppableContext`
 */
const Droppable: React.FunctionComponent<Props> = ({ children, droppableId, ...spreadProps }) => {
  const [generatedDroppableId] = React.useState(`xui-${nanoid(10)}`);

  return (
    <RBDDroppable droppableId={droppableId || generatedDroppableId} {...spreadProps}>
      {(provided, snapshot) => (
        <DroppableContext.Provider value={{ isDraggingOver: snapshot.isDraggingOver }}>
          {children(provided, snapshot)}
        </DroppableContext.Provider>
      )}
    </RBDDroppable>
  );
};

Droppable.propTypes = {
  children: PropTypes.func.isRequired,
  droppableId: PropTypes.string,
};

export default Droppable;
